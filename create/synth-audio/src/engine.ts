import { NOTE_NAMES, type EngineStatus, type ModSlot, type SignalSnapshot, type SynthSettings } from './types';
import { generateNotes } from './notes';
import { clamp, LfoSource, SignalRegistry, SmoothedSource } from './signals';
import { MusicInterpreter } from './music';
import { MusicalEventQueue } from './event-queue';
import type { SituationSource, SituationEvent, MusicalDecision } from '@workspace/api-client-react';
import { SemanticController, contribution, semanticEffective, type SemanticConfig, type SemanticDestination } from './semantic';
import { createOscillatorUnit, prepareWavetable, type OscillatorUnit } from './oscillator';
import type { Waveform } from './types';
import type { MidiFile } from './midi-file';
import { MidiPlayback } from './midi-playback';

interface Envelope { attack: number; decay: number; sustain: number; release: number }
interface SoundSource {
  unit: OscillatorUnit; gain: GainNode; kind: Waveform | 'wavetable';
  role: 'main' | 'sub'; key: string; fading: boolean;
}
interface Voice {
  midi: number; velocity: number; start: number; gate: number; end: number; env: Envelope;
  filter: BiquadFilterNode; envelope: GainNode; level: GainNode;
  sources: SoundSource[]; released: boolean; cleaned: boolean;
  modSources: AudioBufferSourceNode[]; modNodes: AudioNode[];
  /** The live stream's depth gain is already connected to this voice. */
  liveFm?: boolean;
}
/** A gathered clip used as a modulator. It is never mixed into the audio output. */
export interface NoteModulator {
  buffer: AudioBuffer;
  offset?: number;
  /** FM index, 0–10. 0 means no FM. */
  depth: number;
  /** Envelope-follower addition to cutoff, in Hz. 0 leaves the cutoff alone. */
  followCutoff?: number;
  /** Envelope-follower addition to loudness. 0 leaves the level alone. */
  followLevel?: number;
}
// Peter's index is 0–10. A full-scale modulator sample shifts the carrier by
// index × 100 Hz, so 0 is silent FM, 3 is moderate, and 10 is heavy.
const FM_HZ_PER_INDEX = 100;
interface Trigger { time: number; notes: string; serial: number }
const midiName = (midi: number) => `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
const frequency = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
const copySettings = (s: SynthSettings): SynthSettings => ({
  ...s, vcoMods: s.vcoMods.map(m => ({ ...m })), vcfMods: s.vcfMods.map(m => ({ ...m })), vcaMods: s.vcaMods.map(m => ({ ...m })),
});

/**
 * Audio-clock lookahead transport. Every voice owns its source, filter and ADSR.
 * Sources are bounded, retired after their release, and disconnected explicitly.
 */
export class SynthEngine {
  private settings: SynthSettings;
  private context: BaseAudioContext | null = null;
  // Live Play keeps Math.random. Offline render and the page's Live toggle pass a seeded RNG into open().
  private noiseRandom: () => number = Math.random;
  // When set, the master chain feeds this node instead of context.destination
  // (the page routes it into Live's hack chain).
  private outputNode: AudioNode | null = null;
  private bus: GainNode | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private noise: AudioBuffer | null = null;
  private voices: Voice[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private playing = false;
  private nextTime = 0;
  private step = 0;
  private serial = 0;
  private triggers: Trigger[] = [];
  private currentNotes = '—';
  private currentSerial = 0;
  private disposed = false;
  private wavetableReady = false;
  private midi: MidiPlayback | null = null;
  private midiStoppedPosition = 0;
  private transportRequest = 0;
  readonly signals = new SignalRegistry();
  private lfo1 = new LfoSource('lfo1', 'LFO 1', 'sine', 0.5);
  private lfo2 = new LfoSource('lfo2', 'LFO 2', 'triangle', 0.25);
  private manual = new SmoothedSource('manual', 'Manual', 'internal', 0.04);
  private situationSources = new Map<string, SituationSource>();
  private interpreter = new MusicInterpreter();
  private eventQueue = new MusicalEventQueue();
  private decisionListener: ((decision: MusicalDecision) => void) | null = null;
  readonly semantic = new SemanticController();
  /** A microphone or shared tab. The gain feeds oscillator frequency only. */
  private liveFm: { src: MediaStreamAudioSourceNode; gain: GainNode; depth: number } | null = null;

  setSemanticConfig(config: SemanticConfig) {
    this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
    this.semantic.setConfig(config);
    if (this.context) this.applyControls();
  }
  scrubSemantic(position: number) {
    this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
    this.semantic.scrub(position);
    if (this.context) this.applyControls();
  }
  private semanticAmount(destination: SemanticDestination) {
    return contribution(this.semantic.config, this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo).values, destination);
  }
  getSemanticStatus() {
    const state = this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
    const s = this.settings;
    const bases = { cutoff: s.cutoff, resonance: s.resonance, amplitude: s.level / 100, attack: s.attack, release: s.release, pitch: s.tuning, detune: s.detune, duration: 1, register: 0,
      position: s.position, warp: s.warp, spread: s.spread, subLevel: s.subLevel, pulseWidth: s.pulseWidth };
    const effective = Object.fromEntries(Object.entries(bases).map(([key, base]) => [key, semanticEffective(base, key as SemanticDestination, contribution(this.semantic.config, state.values, key as SemanticDestination), Math.min(20000, (this.context?.sampleRate ?? 48000) * .45))]));
    const actual = this.voices.filter(v => !v.cleaned && v.start <= (this.context?.currentTime ?? 0) && v.end > (this.context?.currentTime ?? 0)).map(v => ({
      cutoff: v.filter.frequency.value, resonance: v.filter.Q.value, amplitude: v.level.gain.value,
      frequencies: v.sources.filter(s => s.role === 'main' && !s.fading && s.unit.frequency).map(s => s.unit.frequency!.value),
      detune: v.sources.filter(s => s.role === 'main' && !s.fading && s.unit.detune).map(s => s.unit.detune!.value),
      oscillator: v.sources.filter(s => !s.fading).map(s => ({
        role: s.role, kind: s.kind, components: s.unit.components, frequency: s.unit.frequency?.value,
        gain: s.gain.gain.value,
        parameters: Object.fromEntries(['position', 'warp', 'spread'].map(k => [k, s.unit.parameters?.get(k)?.value])),
      })),
      attack: v.env.attack, release: v.env.release, gateSeconds: v.gate - v.start,
    }));
    return { ...state, enabled: this.semantic.config.enabled, bases, effective, actual, audioTime: this.context?.currentTime ?? 0 };
  }

  setDecisionListener(listener: ((decision: MusicalDecision) => void) | null) { this.decisionListener = listener; }
  setSituationSources(sources: SituationSource[]) {
    const ids = new Set(sources.map(s => s.id));
    for (const id of this.situationSources.keys()) if (!ids.has(id)) this.signals.unregister(id);
    this.situationSources = new Map(sources.map(s => [s.id, structuredClone(s)]));
    const selected = this.situationSources.get(this.settings.situationSource);
    if (this.settings.mode === 'event' && selected?.status !== 'live') this.eventQueue.clear();
    for (const s of sources) {
      if (s.kind !== 'continuous') continue;
      this.signals.register({ id: s.id, displayName: s.name, sourceType: 'situational',
        sample: () => {
          const current = this.situationSources.get(s.id)!;
          return { id: current.id, displayName: current.name, sourceType: 'situational',
            currentValue: current.rawValue ?? 0, normalizedValue: current.conditionedValue ?? 0,
            timestamp: current.measurementTimestamp ? Date.parse(current.measurementTimestamp) / 1000 : 0 };
        } });
    }
  }
  enqueueSituationEvent(event: SituationEvent) {
    const source = this.situationSources.get(event.sourceId);
    if (this.midi || !this.playing || this.settings.mode !== 'event' || event.sourceId !== this.settings.situationSource ||
      source?.status !== 'live' || source.kind !== 'event' || event.type === 'vehicle_replaced') return;
    const time = this.context!.currentTime;
    const reason = this.eventQueue.push(event, time, this.settings.minEventInterval);
    if (reason && reason !== 'duplicate') this.provenance([], 'Dropped event', source, time, event, reason);
  }
  clearSituationEvents() { this.eventQueue.clear(); }
  getEventQueueStatus() { return { pending: this.eventQueue.pending, dropped: this.eventQueue.dropped }; }

  setMidiFile(file: MidiFile | null, loop = false) {
    this.panic();
    this.midi = file ? new MidiPlayback(file, loop) : null;
    this.midiStoppedPosition = 0;
  }
  setMidiLoop(loop: boolean) {
    if (!this.midi) return;
    const now = this.context?.currentTime ?? 0;
    const end = this.midi.setLoop(loop, now);
    if (!loop && this.playing) {
      // Cancel next-loop notes already in the lookahead window.
      for (const voice of this.voices) if (voice.start >= end) this.retire(voice, now, .003);
      this.triggers = this.triggers.filter(trigger => trigger.time < end);
    }
  }
  getMidiStatus() {
    return this.midi ? {
      name: this.midi.file.name, duration: this.midi.file.duration, loop: this.midi.loop,
      position: this.playing ? this.midi.position(this.context?.currentTime ?? 0) : this.midiStoppedPosition,
    } : null;
  }

  constructor(settings: SynthSettings) {
    this.settings = copySettings(settings);
    this.signals.register(this.lfo1);
    this.signals.register(this.lfo2);
    this.signals.register(this.manual);
    this.update(settings);
  }

  update(settings: SynthSettings) {
    this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings?.tempo ?? settings.tempo);
    if (this.settings && (settings.situationSource !== this.settings.situationSource || settings.mode !== this.settings.mode)) {
      this.eventQueue.clear(); this.interpreter.reset();
    }
    this.settings = copySettings(settings);
    const time = this.context?.currentTime ?? 0;
    this.lfo1.sample(time);
    this.lfo2.sample(time);
    this.lfo1.rate = clamp(settings.lfo1, 0.01, 20);
    this.lfo2.rate = clamp(settings.lfo2, 0.01, 20);
    this.manual.push(settings.manual, time);
    if (this.playing && settings.oscillatorMode === 'wavetable' && !this.wavetableReady) {
      this.stop();
      throw new Error('Wavetable DSP is not ready. Press Play to initialize it, or select VCO to continue with native audio.');
    }
    if (this.context) this.applyControls();
  }

  /** Inject a context, the noise RNG, and an optional output node. Live Play still calls initialize() with none of these. */
  async open(context: BaseAudioContext, random: () => number = Math.random, destination?: AudioNode | null) {
    this.noiseRandom = random;
    if (destination) this.outputNode = destination;
    await this.initialize(context);
  }

  private async initialize(given?: BaseAudioContext) {
    if (this.disposed) throw new Error('This audio engine has been closed.');
    if (!this.context) {
      let context = given;
      if (!context) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) throw new Error('Web Audio is not supported in this browser.');
        context = new AudioContextClass({ latencyHint: 'interactive' });
      }
      this.context = context;
      this.bus = context.createGain();
      // A fixed per-voice gain and a bounded voice pool leave headroom for chords.
      this.bus.gain.value = 0.085;
      const limiter = context.createDynamicsCompressor();
      limiter.threshold.value = -6;
      limiter.knee.value = 6;
      limiter.ratio.value = 12;
      limiter.attack.value = 0.003;
      limiter.release.value = 0.12;
      this.master = context.createGain();
      this.master.gain.value = clamp(this.settings.master / 100, 0, 1);
      this.analyser = context.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.7;
      this.bus.connect(limiter).connect(this.master).connect(this.analyser).connect(this.outputNode || context.destination);
      this.noise = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = this.noiseRandom() * 2 - 1;
    }
    // OfflineAudioContext stays suspended until startRendering, and currentTime
    // stays 0 while every note is scheduled. A context the page injected (Live)
    // is resumed by that page; waiting here would stall the note schedule.
    // The live resume and wavetable preload do not apply on either path.
    if (this.context instanceof OfflineAudioContext || this.outputNode) return;
    // Unlock synchronously from the Play gesture, BEFORE awaiting DSP loading.
    // Otherwise suspended-context policies can leave first Play waiting forever.
    if (this.context.state === 'suspended') await (this.context as AudioContext).resume();
    if (this.context.state !== 'running') throw new Error('Audio could not start. Press Play again to enable audio.');
    const context = this.context;
    const loading = prepareWavetable(context).then(() => {
      if (!this.disposed && this.context === context) this.wavetableReady = true;
    });
    // Optional background bank generation must never prevent the native instrument
    // from starting. Preload it without changing native VCO audio or timing.
    if (this.settings.oscillatorMode === 'vco') {
      void loading.catch(() => { /* A requested wavetable Play reports its load failure explicitly below. */ });
      return;
    }
    // No AudioWorklet registration or second context/transport is involved.
    let timeout: ReturnType<typeof setTimeout>;
    try {
      await Promise.race([loading, new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Wavetable banks did not load within 15 seconds. Press Play to retry.')), 15000);
      })]);
    } finally { clearTimeout(timeout!); }
  }

  async play() {
    const request = ++this.transportRequest;
    await this.initialize();
    if (this.disposed || request !== this.transportRequest) return;
    if (this.playing) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.playing = true;
    this.step = 0;
    this.interpreter.reset();
    this.eventQueue.clear();
    this.nextTime = this.context!.currentTime + 0.008;
    this.midiStoppedPosition = 0;
    this.midi?.start(this.nextTime);
    this.tick();
    this.timer = setInterval(() => this.tick(), 20);
  }

  stop() {
    ++this.transportRequest;
    if (this.midi && this.playing) this.midiStoppedPosition = this.midi.position(this.context?.currentTime ?? 0);
    this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
    this.eventQueue.clear();
    this.playing = false;
    this.semantic.sample(this.context?.currentTime ?? 0, false, this.settings.tempo);
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    const now = this.context?.currentTime ?? 0;
    this.triggers = [];
    this.currentNotes = '—';
    for (const voice of this.voices) {
      if (voice.start > now) this.retire(voice, now, 0.003);
      else this.retire(voice, now, voice.env.release);
    }
    // Continue cleanup/control work during release tails, without scheduling notes.
    if (this.voices.some(v => !v.cleaned)) this.timer = setInterval(() => this.tick(), 20);
  }

  panic() {
    ++this.transportRequest;
    this.midiStoppedPosition = 0;
    this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
    this.eventQueue.clear();
    this.playing = false;
    this.semantic.sample(this.context?.currentTime ?? 0, false, this.settings.tempo);
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.triggers = [];
    this.currentNotes = '—';
    const now = this.context?.currentTime ?? 0;
    if (this.liveFm) { try { this.liveFm.gain.disconnect(); } catch { /* already clear */ } }
    for (const voice of this.voices) {
      voice.envelope.gain.cancelScheduledValues(now);
      voice.envelope.gain.setValueAtTime(0, now);
      for (const source of voice.sources) source.unit.stop(now);
      this.cleanup(voice);
    }
    this.voices = [];
    if (this.analyser && this.master && this.context) {
      // Flush the analysis window immediately as well as silencing the graph.
      this.analyser.disconnect();
      this.master.disconnect();
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 2048;
      this.master.connect(this.analyser).connect(this.outputNode || this.context.destination);
    }
  }

  dispose() {
    this.clearLiveModulator();
    this.panic();
    this.disposed = true;
    void this.context?.close();
    this.context = null;
  }

  getAnalyser() { return this.analyser; }
  getSignals(): SignalSnapshot[] { return this.signals.all(this.context?.currentTime ?? 0); }
  getStatus(): EngineStatus {
    const now = this.context?.currentTime ?? 0;
    while (this.triggers.length && this.triggers[0].time <= now) {
      const trigger = this.triggers.shift()!;
      this.currentNotes = trigger.notes;
      this.currentSerial = trigger.serial;
    }
    return {
      playing: this.playing, notes: this.currentNotes, trigger: this.currentSerial,
      voices: this.voices.filter(v => !v.cleaned && v.start <= now && v.end > now).length,
      audioState: this.context?.state ?? 'idle',
    };
  }

  private tick() {
    if (!this.context) return;
    const now = this.context.currentTime;
    for (const voice of this.voices) if (voice.end + 0.03 < now) this.cleanup(voice);
    this.voices = this.voices.filter(v => !v.cleaned);
    this.applyControls();
    if (this.playing && this.context.state === 'running') {
      if (this.midi) {
        if (this.midi.ended(now)) { this.stop(); return; }
        this.midi.schedule(now, now + .10, (note, time) => {
          this.createVoice(note.midi, time, note.duration, note.velocity);
          this.triggers.push({ time, notes: midiName(note.midi), serial: ++this.serial });
        });
        if (this.triggers.length > 64) this.triggers.splice(0, this.triggers.length - 64);
        return;
      }
      // After a throttled background tab, skip missed notes instead of a burst.
      if (this.nextTime < now - 0.1) this.nextTime = now + 0.008;
      while (this.nextTime < now + 0.10) {
        const duration = (60 / clamp(this.settings.tempo, 20, 240)) * (4 / this.settings.interval);
        this.schedule(this.nextTime, duration);
        this.nextTime += duration;
      }
    } else if (!this.playing && !this.voices.length && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private notes(): number[] {
    return generateNotes(this.settings, this.step);
  }

  private schedule(time: number, duration: number) {
    const s = this.settings;
    const situational = ['melody', 'progression', 'event'].includes(s.mode);
    let notes: number[], label: string;
    let source: SituationSource | undefined;
    let event: SituationEvent | null = null;
    let held = false;
    if (situational) {
      source = this.situationSources.get(s.situationSource);
      if (s.mode === 'event') {
        event = this.eventQueue.take(time);
        if (!event) { this.step++; return; }
      }
      const selection = this.interpreter.select(s, source, time, duration, Boolean(event));
      if (!selection) { this.step++; return; }
      notes = selection.notes; label = selection.label; held = selection.held;
    } else {
      notes = this.notes(); label = notes.map(midiName).join(' · ');
    }
    this.step++;
    const gateDuration = (s.mode === 'progression' ? s.chordDuration * 60 / s.tempo : duration * clamp(s.gate / 100, 0.1, 1))
      * semanticEffective(1, 'duration', this.semanticAmount('duration'));
    const register = semanticEffective(0, 'register', this.semanticAmount('register'));
    if (register) { notes = notes.map(midi => clamp(midi + register, 0, 127)); label = `${label} → ${notes.map(midiName).join(' · ')}`; }
    for (const midi of notes) this.createVoice(midi, time, gateDuration);
    this.triggers.push({ time, notes: label, serial: ++this.serial });
    if (source) this.provenance(notes, label, source, time, event ?? undefined, undefined, held);
    // Bound unconsumed UI events in a hidden tab.
    if (this.triggers.length > 64) this.triggers.splice(0, this.triggers.length - 64);
  }

  private provenance(notes: number[], label: string, source: SituationSource, time: number, event?: SituationEvent, dropReason?: string, held = false) {
    const s = this.settings, now = this.context?.currentTime ?? time;
    const decision: MusicalDecision = {
      id: crypto.randomUUID(), sourceId: source.id,
      musicalTimestamp: new Date(Date.now() + (time - now) * 1000).toISOString(), audioTime: time,
      label, notes, rawValue: source.rawValue, normalizedValue: source.normalizedValue, conditionedValue: source.conditionedValue,
      measurementTimestamp: source.measurementTimestamp, interpretation: dropReason ? 'dropped' : held ? 'hold last selection' : s.mode === 'event' ? 'cyclic' : s.interpretation,
      key: NOTE_NAMES[s.note], collection: s.mode === 'progression' || (s.mode === 'event' && s.eventOutput === 'chord') ? s.collection : s.scale,
      tempo: s.tempo, grid: s.interval, sourceConfiguration: structuredClone(source.configuration),
      normalizationConfiguration: structuredClone(source.normalization),
      ...(event ? { eventId: event.id, eventType: event.type, eventTimestamp: event.timestamp, eventMetadata: event.metadata } : {}),
      ...(dropReason ? { dropReason } : {}),
    };
    this.decisionListener?.(decision);
  }

  private modulation(slots: ModSlot[], values: Map<string, number>, destination: string) {
    return slots.reduce((sum, slot) => sum + (slot.destination === destination ? (values.get(slot.source) ?? 0) * slot.amount / 100 : 0), 0);
  }
  private controlValues() {
    return new Map(this.getSignals().map(s => [s.id, clamp(s.normalizedValue, -1, 1)]));
  }
  private env(values: Map<string, number>): Envelope {
    const s = this.settings;
    const m = (destination: string) => this.modulation(s.vcaMods, values, destination);
    return {
      attack: semanticEffective(clamp(s.attack * Math.pow(2, m('attack') * 5), 0.001, 5), 'attack', this.semanticAmount('attack')),
      decay: clamp(s.decay * Math.pow(2, m('decay') * 5), 0.001, 5),
      sustain: clamp(s.sustain / 100 + m('sustain'), 0, 1),
      release: semanticEffective(clamp(s.release * Math.pow(2, m('release') * 5), 0.001, 10), 'release', this.semanticAmount('release')),
    };
  }

  /** One written note on the existing voice path. Live patterns still use schedule(). */
  scheduleNote(midi: number, time: number, duration: number, velocity = 1, modulator?: NoteModulator | null) {
    this.createVoice(midi, time, duration, velocity, modulator);
  }

  /** Buffer sources currently feeding a carrier. Panic and stop clear this. */
  activeModulators() {
    let n = 0;
    for (const voice of this.voices) if (!voice.cleaned) n += voice.modSources.length;
    return n;
  }

  private createVoice(midi: number, start: number, duration: number, velocity = 1, modulator?: NoteModulator | null) {
    const context = this.context!;
    this.voices = this.voices.filter(v => !v.cleaned);
    const active = this.voices.filter(v => !v.cleaned && v.end > context.currentTime);
    // Native voices retain 32 notes / 64 components. Buffered DSP has a stricter
    // main-thread budget; unison and sub count against it.
    // against that budget. Tiny, bounded stealing/source-crossfade tails remain.
    if (active.length >= this.voiceLimit()) this.retire(active.find(v => !v.released) ?? active[0], context.currentTime, 0.005);
    // While currentTime is 0, every future note looks active. Do not drop them.
    if (!(context instanceof OfflineAudioContext) && this.voices.length >= 36) this.cleanup(this.voices[0]);
    const values = this.controlValues();
    const env = this.env(values);
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    const level = context.createGain();
    filter.connect(envelope).connect(level).connect(this.bus!);
    const voice: Voice = { midi, velocity, start, gate: start + duration, end: start + duration + env.release + 0.01,
      env, filter, envelope, level, sources: [], modSources: [], modNodes: [], released: false, cleaned: false };
    this.voices.push(voice);
    this.setVoiceControls(voice, values);
    const g = envelope.gain;
    g.setValueAtTime(0, start);
    // Gate closure during attack or decay releases from the correct amplitude.
    if (duration >= env.attack) g.linearRampToValueAtTime(1, start + env.attack);
    if (duration >= env.attack + env.decay) g.linearRampToValueAtTime(env.sustain, start + env.attack + env.decay);
    const gateLevel = this.envelopeAt(voice, voice.gate);
    g.linearRampToValueAtTime(gateLevel, voice.gate);
    g.linearRampToValueAtTime(0, voice.gate + env.release);
    this.addSource(voice, 'main', start, values, false);
    if (this.subAmount() > 0) this.addSource(voice, 'sub', start, values, false);
    // A live stream replaces the clip. Both would FM the same frequency.
    if (this.liveFm && this.liveFm.depth > 0) this.connectLive(voice);
    else this.attachModulator(voice, modulator);
  }

  /**
   * Microphone or a shared tab. MediaStreamSource into a depth gain, then into
   * each carrier frequency. Nothing here reaches the output. Depth 0 connects nothing.
   * The page stops the tracks; this only disconnects the nodes.
   */
  setLiveModulator(stream: MediaStream | null, depth = 0) {
    this.clearLiveModulator();
    if (!stream || !this.context || this.context instanceof OfflineAudioContext) return;
    const d = Math.max(0, Math.min(10, +depth || 0));
    const src = this.context.createMediaStreamSource(stream);
    const gain = this.context.createGain();
    gain.gain.value = d * FM_HZ_PER_INDEX;
    src.connect(gain);
    this.liveFm = { src, gain, depth: d };
    for (const voice of this.voices) this.connectLive(voice);
  }

  clearLiveModulator() {
    if (!this.liveFm) return;
    try { this.liveFm.src.disconnect(); } catch { /* already */ }
    try { this.liveFm.gain.disconnect(); } catch { /* already */ }
    this.liveFm = null;
    for (const voice of this.voices) voice.liveFm = false;
  }

  /** Frequency params currently fed by the live stream. */
  liveModulatorTargets() {
    if (!this.liveFm || !(this.liveFm.depth > 0)) return 0;
    let n = 0;
    for (const voice of this.voices) if (!voice.cleaned && voice.liveFm) n++;
    return n;
  }

  private connectLive(voice: Voice) {
    if (!this.liveFm || !(this.liveFm.depth > 0) || voice.cleaned || voice.liveFm) return;
    if (this.settings.oscillatorMode === 'wavetable') return;
    const freq = voice.sources.find(s => s.role === 'main')?.unit.frequency;
    if (!freq) return;
    try { this.liveFm.gain.connect(freq); voice.liveFm = true; } catch { /* context closed */ }
  }

  /** Audio-rate FM into the main oscillator only. The clip is not a carrier and is not heard on its own. */
  private attachModulator(voice: Voice, mod?: NoteModulator | null) {
    if (!mod || !mod.buffer || !this.context) return;
    if (this.settings.oscillatorMode === 'wavetable') return;
    const depth = Math.max(0, Math.min(10, +mod.depth || 0));
    const followCut = Math.max(0, +mod.followCutoff || 0);
    const followLvl = Math.max(0, +mod.followLevel || 0);
    if (!(depth > 0) && !(followCut > 0) && !(followLvl > 0)) return;
    const main = voice.sources.find(s => s.role === 'main');
    const freq = main?.unit.frequency;
    if (!freq) return;
    const offset = Math.max(0, +mod.offset || 0);
    const remain = mod.buffer.duration - offset;
    if (!(remain > 0.001)) return;
    const src = this.context.createBufferSource();
    src.buffer = mod.buffer;
    src.loop = false;
    if (depth > 0) {
      const gain = this.context.createGain();
      gain.gain.value = depth * FM_HZ_PER_INDEX;
      src.connect(gain);
      gain.connect(freq);
      voice.modNodes.push(gain);
    }
    if (followCut > 0 || followLvl > 0) {
      const env = this.envelopeFollower(src);
      voice.modNodes.push(...env.nodes);
      if (followCut > 0) {
        const gain = this.context.createGain();
        gain.gain.value = followCut;
        env.out.connect(gain);
        gain.connect(voice.filter.frequency);
        voice.modNodes.push(gain);
      }
      if (followLvl > 0) {
        const gain = this.context.createGain();
        gain.gain.value = followLvl;
        env.out.connect(gain);
        gain.connect(voice.level.gain);
        voice.modNodes.push(gain);
      }
    }
    const play = Math.min(Math.max(0.001, voice.end - voice.start), remain);
    try { src.start(voice.start, offset, play); } catch { /* context already closed */ }
    voice.modSources.push(src);
  }

  /** Full-wave rectify, then a slow low-pass. Same clip as the FM input. */
  private envelopeFollower(source: AudioNode) {
    const context = this.context!;
    const shaper = context.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < curve.length; i++) curve[i] = Math.abs((i / (curve.length - 1)) * 2 - 1);
    shaper.curve = curve;
    shaper.oversample = 'none';
    const low = context.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.value = 30;
    low.Q.value = 0.707;
    source.connect(shaper);
    shaper.connect(low);
    return { out: low as AudioNode, nodes: [shaper, low] as AudioNode[] };
  }

  private stopModulators(voice: Voice) {
    for (const node of voice.modNodes) { try { node.disconnect(); } catch { /* already gone */ } }
    const when = this.context?.currentTime ?? 0;
    for (const src of voice.modSources) {
      try { src.disconnect(); } catch { /* already gone */ }
      try { src.stop(when); } catch { /* not started yet, or already stopped */ }
    }
    voice.modSources = [];
    voice.modNodes = [];
  }

  private envelopeAt(voice: Voice, time: number): number {
    const t = Math.max(0, time - voice.start);
    const { attack, decay, sustain, release } = voice.env;
    const held = (elapsed: number) => elapsed < attack ? elapsed / attack
      : elapsed < attack + decay ? 1 - (1 - sustain) * (elapsed - attack) / decay : sustain;
    if (time <= voice.gate) return held(t);
    return held(voice.gate - voice.start) * clamp(1 - (time - voice.gate) / release, 0, 1);
  }

  private subAmount() {
    return this.settings.subEnabled ? semanticEffective(this.settings.subLevel, 'subLevel', this.semanticAmount('subLevel')) : 0;
  }
  private voiceLimit() {
    if (this.context instanceof OfflineAudioContext) return Number.POSITIVE_INFINITY;
    const wavetable = this.settings.oscillatorMode === 'wavetable';
    const components = (wavetable ? this.settings.unison : 1) + (this.subAmount() > 0 ? 1 : 0);
    return Math.min(wavetable ? 12 : 32, Math.floor((wavetable ? 32 : 64) / components));
  }
  private sourceKind(role: 'main' | 'sub'): Waveform | 'wavetable' {
    return role === 'sub' ? this.settings.subWaveform : this.settings.oscillatorMode === 'wavetable' ? 'wavetable' : this.settings.waveform;
  }
  private sourceKey(role: 'main' | 'sub') {
    const kind = this.sourceKind(role), s = this.settings;
    return `${role}:${kind}:${kind === 'wavetable' ? `${s.wavetable}:${s.unison}` : kind === 'square' && role === 'main'
      ? Math.round(semanticEffective(s.pulseWidth, 'pulseWidth', this.semanticAmount('pulseWidth')) * 100) : ''}`;
  }
  private voiceFrequency(voice: Voice, values: Map<string, number>, role: 'main' | 'sub') {
    const s = this.settings, pitch = this.modulation(s.vcoMods, values, 'pitch') * 12;
    return clamp(frequency(voice.midi + s.oscillatorOctave * 12 + (role === 'sub' ? s.subOctave * 12 : 0)
      + semanticEffective(s.tuning + pitch, 'pitch', this.semanticAmount('pitch'))), 1, this.context!.sampleRate * .45);
  }
  private sourceLevel(role: 'main' | 'sub') {
    const sub = this.subAmount();
    return (role === 'sub' ? sub : 1) / (1 + sub);
  }
  private addSource(voice: Voice, role: 'main' | 'sub', time: number, values: Map<string, number>, fade: boolean) {
    const context = this.context!;
    const s = this.settings, kind = this.sourceKind(role);
    const unit = createOscillatorUnit(context, {
      kind, table: s.wavetable, unison: s.unison, frequency: this.voiceFrequency(voice, values, role),
      detune: semanticEffective(s.detune, 'detune', this.semanticAmount('detune')),
      pulseWidth: role === 'sub' ? .5 : semanticEffective(s.pulseWidth, 'pulseWidth', this.semanticAmount('pulseWidth')),
      position: semanticEffective(s.position, 'position', this.semanticAmount('position')),
      warp: semanticEffective(s.warp, 'warp', this.semanticAmount('warp')),
      spread: semanticEffective(s.spread, 'spread', this.semanticAmount('spread')),
      start: time, end: voice.end, noise: this.noise,
    });
    const gain = context.createGain();
    gain.gain.setValueAtTime(fade ? 0 : this.sourceLevel(role), time);
    if (fade) gain.gain.linearRampToValueAtTime(this.sourceLevel(role), time + 0.012);
    unit.node.connect(gain).connect(voice.filter);
    const sound: SoundSource = { unit, gain, kind, role, key: this.sourceKey(role), fading: false };
    voice.sources.push(sound);
    unit.onended(() => {
      unit.dispose();
      gain.disconnect();
      voice.sources = voice.sources.filter(source => source !== sound);
    });
  }

  private applyControls() {
    if (!this.context) return;
    const now = this.context.currentTime;
    this.master?.gain.setTargetAtTime(clamp(this.settings.master / 100, 0, 1), now, 0.015);
    if (this.settings.oscillatorMode === 'wavetable' && !this.wavetableReady) return;
    const values = this.controlValues();
    const active = this.voices.filter(v => !v.cleaned && !v.released);
    for (const voice of active.slice(0, Math.max(0, active.length - this.voiceLimit()))) this.retire(voice, now, .005);
    for (const voice of this.voices) {
      if (voice.cleaned) continue;
      this.setVoiceControls(voice, values);
      if (!voice.released && voice.end > now + 0.02) {
        for (const role of ['main', 'sub'] as const) {
          const live = voice.sources.find(s => s.role === role && !s.fading);
          const needed = role === 'main' || this.subAmount() > 0;
          if (live && (!needed || live.key !== this.sourceKey(role))) {
            const when = Math.max(now, voice.start);
            live.fading = true;
            live.gain.gain.cancelScheduledValues(when);
            live.gain.gain.setTargetAtTime(0, when, 0.003);
            live.unit.stop(when + .018);
          }
          if (needed && (!live || live.fading)) this.addSource(voice, role, Math.max(now, voice.start), values, true);
        }
      }
    }
  }

  private setVoiceControls(voice: Voice, values: Map<string, number>) {
    const context = this.context!;
    const now = context.currentTime;
    const s = this.settings;
    for (const source of voice.sources) {
      if (source.fading) continue;
      source.unit.frequency?.setTargetAtTime(this.voiceFrequency(voice, values, source.role), now, .012);
      source.unit.detune?.setTargetAtTime(semanticEffective(s.detune, 'detune', this.semanticAmount('detune')), now, .012);
      for (const destination of ['position', 'warp', 'spread'] as const) {
        source.unit.parameters?.get(destination)?.setTargetAtTime(semanticEffective(s[destination], destination, this.semanticAmount(destination)), now, .012);
      }
      // Do not cancel a new source's crossfade during its first 12 ms.
      source.gain.gain.setTargetAtTime(this.sourceLevel(source.role), Math.max(now, voice.start + .012), .012);
    }
    voice.filter.type = s.filter;
    const cutoff = semanticEffective(s.cutoff, 'cutoff', this.modulation(s.vcfMods, values, 'cutoff') + this.semanticAmount('cutoff'), Math.min(20000, context.sampleRate * .45));
    voice.filter.frequency.setTargetAtTime(cutoff, now, 0.015);
    voice.filter.Q.setTargetAtTime(semanticEffective(s.resonance + this.modulation(s.vcfMods, values, 'resonance') * 20, 'resonance', this.semanticAmount('resonance')), now, 0.015);
    voice.level.gain.setTargetAtTime(voice.velocity * semanticEffective(clamp(s.level / 100 + this.modulation(s.vcaMods, values, 'level'), 0, 1), 'amplitude', this.semanticAmount('amplitude')), now, 0.012);
  }

  private retire(voice: Voice, now: number, release: number) {
    if (voice.cleaned) return;
    const time = Math.max(now, 0);
    const gain = voice.envelope.gain;
    const value = voice.start > now ? 0 : this.envelopeAt(voice, now);
    gain.cancelScheduledValues(time);
    gain.setValueAtTime(value, time);
    gain.linearRampToValueAtTime(0, time + release);
    voice.gate = now;
    voice.end = Math.min(voice.end, time + release + 0.005);
    voice.released = true;
    this.stopModulators(voice);
    for (const source of voice.sources) {
      source.unit.stop(voice.end);
    }
  }

  private cleanup(voice: Voice) {
    if (voice.cleaned) return;
    voice.cleaned = true;
    this.stopModulators(voice);
    for (const source of voice.sources) {
      source.unit.stop(this.context?.currentTime ?? 0);
      source.unit.dispose();
      source.gain.disconnect();
    }
    voice.filter.disconnect();
    voice.envelope.disconnect();
    voice.level.disconnect();
  }
}
