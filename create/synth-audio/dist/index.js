/* NC Synth audio engine. Copyright (c) 2026 Peter Semmelhack. MIT. Vendored from NetComposer-Synth; see ../SOURCE.md. */
var NCSynthEngine = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // create/synth-audio/src/index.ts
  var index_exports = {};
  __export(index_exports, {
    DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
    SynthEngine: () => SynthEngine,
    mergeSettings: () => mergeSettings,
    mulberry32: () => mulberry32,
    renderNotes: () => renderNotes
  });

  // create/synth-audio/src/types.ts
  var NOTE_NAMES = ["C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B"];
  var CHORDS = {
    Major: [0, 4, 7],
    Minor: [0, 3, 7],
    Diminished: [0, 3, 6],
    Augmented: [0, 4, 8],
    "Major 7th": [0, 4, 7, 11],
    "Minor 7th": [0, 3, 7, 10],
    "Dominant 7th": [0, 4, 7, 10],
    Sus2: [0, 2, 7],
    Sus4: [0, 5, 7]
  };
  var DEFAULT_SETTINGS = {
    mode: "single",
    note: 0,
    octave: 3,
    chord: "Minor 7th",
    tempo: 120,
    interval: 4,
    gate: 75,
    arp: "off",
    arpOctaves: 1,
    octaveRange: 2,
    waveform: "saw",
    tuning: 0,
    filter: "lowpass",
    cutoff: 2e3,
    oscillatorMode: "vco",
    oscillatorOctave: 0,
    detune: 0,
    pulseWidth: 0.5,
    wavetable: "basic",
    position: 0,
    warp: 0,
    unison: 1,
    spread: 0,
    subEnabled: false,
    subWaveform: "sine",
    subOctave: -1,
    subLevel: 0,
    resonance: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 70,
    release: 0.5,
    level: 70,
    master: 65,
    lfo1: 0.5,
    lfo2: 0.25,
    manual: 0,
    scale: "Dorian",
    collection: "Diatonic Major",
    situationSource: "",
    interpretation: "position",
    deadband: 0.02,
    stepThreshold: 0.1,
    maxStep: 4,
    chordDuration: 4,
    eventOutput: "note",
    minEventInterval: 1,
    vcoMods: [{ source: "none", destination: "pitch", amount: 0 }, { source: "none", destination: "pitch", amount: 0 }],
    vcfMods: [{ source: "none", destination: "cutoff", amount: 0 }, { source: "none", destination: "resonance", amount: 0 }],
    vcaMods: [{ source: "none", destination: "level", amount: 0 }, { source: "none", destination: "sustain", amount: 0 }]
  };

  // create/synth-audio/src/notes.ts
  function generateNotes(s, step, random = Math.random) {
    const root = Math.min(127, Math.max(0, (s.octave + 1) * 12 + s.note));
    if (s.mode === "single") return [root];
    if (s.mode === "random") {
      const lower = Math.min(127, (s.octave + 1) * 12);
      const upper = Math.min(127, lower + s.octaveRange * 12 - 1);
      return [lower + Math.floor(random() * (upper - lower + 1))];
    }
    const offsets = CHORDS[s.chord] ?? CHORDS.Major;
    const chord2 = offsets.map((n) => Math.min(127, root + n));
    if (s.arp === "off") return chord2;
    const octaves = Math.min(4, Math.max(1, Math.round(s.arpOctaves)));
    const notes = [...new Set(Array.from({ length: octaves }, (_, octave) => offsets.map((n) => root + n + octave * 12)).flat().filter((n) => n <= 127))].sort((a, b) => a - b);
    const last = notes.length - 1;
    let index = step % notes.length;
    if (s.arp === "random") index = Math.floor(random() * notes.length);
    else if (s.arp === "down") index = last - index;
    else if ((s.arp === "up-down" || s.arp === "down-up") && last > 0) {
      const position = step % (last * 2);
      index = position <= last ? position : last * 2 - position;
      if (s.arp === "down-up") index = last - index;
    }
    return [notes[index]];
  }

  // create/synth-audio/src/signals.ts
  var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  var SignalRegistry = class {
    constructor() {
      __publicField(this, "sources", /* @__PURE__ */ new Map());
    }
    register(source) {
      this.sources.set(source.id, source);
    }
    unregister(id) {
      this.sources.delete(id);
    }
    sample(id, time) {
      return this.sources.get(id)?.sample(time) ?? {
        id,
        displayName: "None",
        currentValue: 0,
        normalizedValue: 0,
        timestamp: time,
        sourceType: "none"
      };
    }
    all(time) {
      return [...this.sources.values()].map((source) => source.sample(time));
    }
  };
  var LfoSource = class {
    constructor(id, displayName, shape, rate) {
      __publicField(this, "id", id);
      __publicField(this, "displayName", displayName);
      __publicField(this, "shape", shape);
      __publicField(this, "rate", rate);
      __publicField(this, "sourceType", "internal");
      __publicField(this, "phase", 0);
      __publicField(this, "lastTime", 0);
    }
    sample(time) {
      this.phase = (this.phase + Math.max(0, time - this.lastTime) * this.rate) % 1;
      this.lastTime = time;
      const value = this.shape === "sine" ? Math.sin(this.phase * Math.PI * 2) : 1 - 4 * Math.abs(this.phase - 0.5);
      return { id: this.id, displayName: this.displayName, currentValue: value, normalizedValue: value, timestamp: time, sourceType: this.sourceType };
    }
  };
  var SmoothedSource = class {
    constructor(id, displayName, sourceType, smoothing = 0.06) {
      __publicField(this, "id", id);
      __publicField(this, "displayName", displayName);
      __publicField(this, "sourceType", sourceType);
      __publicField(this, "smoothing", smoothing);
      __publicField(this, "value", 0);
      __publicField(this, "target", 0);
      __publicField(this, "lastTime", 0);
      __publicField(this, "updatedAt", 0);
    }
    push(value, timestamp) {
      this.target = clamp(value, -1, 1);
      this.updatedAt = timestamp;
    }
    sample(time) {
      const dt = Math.max(0, time - this.lastTime);
      this.value += (this.target - this.value) * (1 - Math.exp(-dt / Math.max(1e-3, this.smoothing)));
      this.lastTime = time;
      return { id: this.id, displayName: this.displayName, currentValue: this.target, normalizedValue: this.value, timestamp: this.updatedAt, sourceType: this.sourceType };
    }
  };

  // create/synth-audio/src/music.ts
  var SCALES = {
    Major: [0, 2, 4, 5, 7, 9, 11],
    "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
    "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
    "Melodic Minor": [0, 2, 3, 5, 7, 9, 11],
    Dorian: [0, 2, 3, 5, 7, 9, 10],
    Phrygian: [0, 1, 3, 5, 7, 8, 10],
    Lydian: [0, 2, 4, 6, 7, 9, 11],
    Mixolydian: [0, 2, 4, 5, 7, 9, 10],
    Locrian: [0, 1, 3, 5, 6, 8, 10],
    "Major Pentatonic": [0, 2, 4, 7, 9],
    "Minor Pentatonic": [0, 3, 5, 7, 10],
    Blues: [0, 3, 5, 6, 7, 10],
    Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  };
  var chord = (root, suffix, intervals) => ({ root, suffix, intervals });
  var maj7 = [0, 4, 7, 11];
  var min7 = [0, 3, 7, 10];
  var dom7 = [0, 4, 7, 10];
  var halfDim = [0, 3, 6, 10];
  var CHORD_COLLECTIONS = {
    "Diatonic Major": [
      chord(0, "maj7", maj7),
      chord(2, "m7", min7),
      chord(4, "m7", min7),
      chord(5, "maj7", maj7),
      chord(7, "7", dom7),
      chord(9, "m7", min7),
      chord(11, "m7b5", halfDim)
    ],
    "Diatonic Minor": [
      chord(0, "m7", min7),
      chord(2, "m7b5", halfDim),
      chord(3, "maj7", maj7),
      chord(5, "m7", min7),
      chord(7, "m7", min7),
      chord(8, "maj7", maj7),
      chord(10, "7", dom7)
    ],
    Jazz: [
      chord(0, "maj9", [0, 4, 7, 11, 14]),
      chord(9, "m7", min7),
      chord(2, "m9", [0, 3, 7, 10, 14]),
      chord(7, "13", [0, 4, 10, 14, 21]),
      chord(4, "m7", min7),
      chord(9, "7", dom7),
      chord(2, "m7", min7),
      chord(7, "7", dom7)
    ],
    Modal: [chord(0, "m7", min7), chord(5, "7", dom7), chord(10, "maj7", maj7), chord(0, "m9", [0, 3, 7, 10, 14])],
    Ambient: [
      chord(0, "add9", [0, 7, 14, 16]),
      chord(0, "sus2", [0, 7, 14]),
      chord(5, "maj7", [0, 7, 11, 16]),
      chord(9, "m7", [0, 7, 10, 15]),
      chord(7, "sus4", [0, 7, 17]),
      chord(5, "add9", [0, 7, 14, 16])
    ],
    Chromatic: [
      chord(0, "", [0, 4, 7]),
      chord(1, "m", [0, 3, 7]),
      chord(3, "aug", [0, 4, 8]),
      chord(6, "dim", [0, 3, 6]),
      chord(8, "sus4", [0, 5, 7]),
      chord(10, "sus2", [0, 2, 7])
    ]
  };
  var midiName = (midi) => `${NOTE_NAMES[(midi % 12 + 12) % 12]}${Math.floor(midi / 12) - 1}`;
  function scaleNotes(key, scale, octave, range) {
    const offsets = SCALES[scale] ?? SCALES.Major;
    const root = (Math.min(7, Math.max(1, octave)) + 1) * 12 + key;
    return Array.from({ length: Math.min(3, Math.max(1, range)) }, (_, o) => offsets.map((n) => root + o * 12 + n)).flat().filter((n) => n >= 0 && n <= 127);
  }
  function collectionChords(key, collection, octave = 3) {
    return (CHORD_COLLECTIONS[collection] ?? CHORD_COLLECTIONS["Diatonic Major"]).map((c) => ({
      name: `${NOTE_NAMES[(key + c.root) % 12]}${c.suffix}`,
      notes: c.intervals.map((i) => (octave + 1) * 12 + key + c.root + i).filter((n) => n >= 0 && n <= 127)
    }));
  }
  function positionIndex(value, count) {
    return Math.max(0, Math.min(count - 1, Math.floor((Math.max(-1, Math.min(1, value)) + 1) / 2 * count)));
  }
  function movementIndex(index, delta, count, deadband = 0.02, threshold = 0.1, maxStep = 4) {
    const steps = Math.abs(delta) <= deadband ? 0 : Math.min(maxStep, 1 + Math.floor((Math.abs(delta) - deadband) / Math.max(1e-3, threshold)));
    return Math.max(0, Math.min(count - 1, index + Math.sign(delta) * steps));
  }
  var MusicInterpreter = class {
    constructor() {
      __publicField(this, "signature", "");
      __publicField(this, "index", 0);
      __publicField(this, "previous", null);
      __publicField(this, "last", null);
      __publicField(this, "nextChordTime", 0);
      __publicField(this, "eventIndex", 0);
    }
    reset() {
      this.signature = "";
      this.previous = null;
      this.last = null;
      this.nextChordTime = 0;
      this.eventIndex = 0;
    }
    select(s, source, time, gridDuration, isEvent = false) {
      const signature = [s.mode, s.situationSource, s.note, s.scale, s.collection, s.octave, s.octaveRange, s.interpretation, s.eventOutput].join("|");
      if (signature !== this.signature) {
        this.reset();
        this.signature = signature;
        const count = s.mode === "progression" ? collectionChords(s.note, s.collection, s.octave).length : scaleNotes(s.note, s.scale, s.octave, s.octaveRange).length;
        this.index = Math.floor(count / 2);
      }
      if (s.mode === "progression" && time + 1e-5 < this.nextChordTime) return null;
      const chordMode = s.mode === "progression" || s.mode === "event" && s.eventOutput === "chord";
      const list = chordMode ? collectionChords(s.note, s.collection, s.octave) : scaleNotes(s.note, s.scale, s.octave, s.octaveRange).map((n) => ({ name: midiName(n), notes: [n] }));
      if (!list.length) return null;
      if (s.mode === "event") {
        if (!isEvent || !source || source.status !== "live") return null;
        const selection = list[this.eventIndex++ % list.length];
        return { notes: selection.notes, label: selection.name, held: false };
      }
      const value = source?.conditionedValue;
      const valid = source?.status === "live" && value !== null && value !== void 0 && Number.isFinite(value);
      if (valid) {
        if (s.interpretation === "position") this.index = positionIndex(value, list.length);
        else if (this.previous !== null) this.index = movementIndex(this.index, value - this.previous, list.length, s.deadband, s.stepThreshold, s.maxStep);
        this.previous = value;
        const selection = list[this.index];
        this.last = { notes: selection.notes, label: selection.name, held: false };
      }
      if (!this.last) return null;
      if (s.mode === "progression") {
        const requested = s.chordDuration * 60 / s.tempo;
        this.nextChordTime = time + Math.ceil((requested - 1e-6) / gridDuration) * gridDuration;
      }
      return { ...this.last, held: !valid };
    }
  };

  // create/synth-audio/src/event-queue.ts
  var MusicalEventQueue = class {
    constructor() {
      __publicField(this, "queue", []);
      __publicField(this, "seen", /* @__PURE__ */ new Set());
      __publicField(this, "lastAccepted", -Infinity);
      __publicField(this, "dropped", 0);
    }
    push(event, audioTime, minimumSeconds) {
      if (this.seen.has(event.id)) return "duplicate";
      this.seen.add(event.id);
      if (this.seen.size > 2048) this.seen.delete(this.seen.values().next().value);
      if (this.queue.length >= 32) {
        this.dropped++;
        return "queue full \u2014 newest event dropped";
      }
      if (audioTime - this.lastAccepted < minimumSeconds) {
        this.dropped++;
        return "minimum event interval";
      }
      this.lastAccepted = audioTime;
      this.queue.push({ event, audioTime });
      return null;
    }
    take(boundary) {
      if (!this.queue.length || this.queue[0].audioTime > boundary) return null;
      return this.queue.shift().event;
    }
    clear() {
      this.queue = [];
      this.lastAccepted = -Infinity;
    }
    get pending() {
      return this.queue.length;
    }
  };

  // create/synth-audio/src/semantic.ts
  var DIMENSIONS = ["intimacy", "energy", "tension", "ambiguity", "movement"];
  var neutralValues = () => ({ intimacy: 0.5, energy: 0.5, tension: 0.5, ambiguity: 0.5, movement: 0.5 });
  var defaultSemanticConfig = () => ({
    enabled: false,
    analysis: null,
    overrides: {},
    routes: [],
    timeline: { interpolation: "step", beatsPerSegment: 4, loop: true }
  });
  var clamp2 = (n, lo, hi) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));
  function contribution(config, values, destination) {
    if (!config.enabled) return 0;
    return config.routes.reduce((sum, route) => sum + (route.enabled && route.destination === destination ? (clamp2(values[route.source], 0, 1) - 0.5) * 2 * clamp2(route.depth, 0, 1) * (route.inverted ? -1 : 1) : 0), 0);
  }
  function semanticEffective(base, destination, amount, maxFrequency = 2e4) {
    switch (destination) {
      case "cutoff":
        return clamp2(base * 2 ** (amount * 6), 20, maxFrequency);
      case "resonance":
        return clamp2(base + amount * 12, 0.1, 20);
      case "amplitude":
        return clamp2(base * 2 ** (amount * 2), 0, 1);
      case "attack":
        return clamp2(base * 2 ** (amount * 4), 1e-3, 5);
      case "release":
        return clamp2(base * 2 ** (amount * 4), 1e-3, 10);
      case "pitch":
        return clamp2(base + amount * 12, -48, 48);
      case "detune":
        return clamp2(base + amount * 100, -200, 200);
      case "duration":
        return clamp2(base * 2 ** (amount * 2), 0.125, 4);
      case "register":
        return clamp2(base + Math.round(amount * 2) * 12, -24, 24);
      case "position":
      case "warp":
      case "spread":
      case "subLevel":
        return clamp2(base + amount, 0, 1);
      case "pulseWidth":
        return clamp2(base + amount * 0.45, 0.05, 0.95);
    }
  }
  var SemanticController = class {
    constructor() {
      __publicField(this, "config", defaultSemanticConfig());
      __publicField(this, "beat", 0);
      __publicField(this, "lastTime", null);
      __publicField(this, "wasPlaying", false);
    }
    setConfig(config) {
      if (config.analysis?.id !== this.config.analysis?.id) this.beat = 0;
      this.config = structuredClone(config);
    }
    scrub(position) {
      this.beat = clamp2(position, 0, Math.max(0, (this.config.analysis?.segments.length ?? 1) - 1e-6)) * this.config.timeline.beatsPerSegment;
    }
    sample(time, playing, tempo) {
      if (playing && this.wasPlaying && this.lastTime !== null) this.beat += Math.max(0, time - this.lastTime) * tempo / 60;
      this.lastTime = time;
      this.wasPlaying = playing;
      const { analysis, timeline, overrides } = this.config;
      const n = analysis?.segments.length ?? 0;
      const absolute = this.beat / clamp2(timeline.beatsPerSegment, 0.25, 64);
      const position = n ? timeline.loop ? absolute % n : Math.min(absolute, n - 1) : 0;
      const index = Math.floor(position), fraction = position - index;
      const a = analysis?.segments[index]?.values ?? neutralValues();
      const b = analysis?.segments[timeline.loop ? (index + 1) % Math.max(1, n) : Math.min(index + 1, n - 1)]?.values ?? a;
      const blend = timeline.interpolation === "smooth" ? fraction * fraction * (3 - 2 * fraction) : 0;
      const values = Object.fromEntries(DIMENSIONS.map((k) => [k, clamp2(overrides[k] ?? a[k] + (b[k] - a[k]) * blend, 0, 1)]));
      return { position, index, values, segment: analysis?.segments[index] ?? null, count: n };
    }
  };

  // create/synth-audio/src/shims/netcomposer-banks.ts
  var bankWorkerSource = "self.postMessage([])";

  // create/synth-audio/src/wavetable-dsp.ts
  var SIZE = 1024;
  var FRAMES = 5;
  var WARPS = 9;
  var LEVELS = 8;
  var TAU = Math.PI * 2;
  var banks = /* @__PURE__ */ new Map();
  function installBanks(entries) {
    for (const [id, bank] of entries) banks.set(id, bank);
  }
  var clamp3 = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
  function fft(real, imag, inverse) {
    const n = real.length;
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) {
        [real[i], real[j]] = [real[j], real[i]];
        [imag[i], imag[j]] = [imag[j], imag[i]];
      }
    }
    for (let len = 2; len <= n; len *= 2) {
      const angle = (inverse ? 1 : -1) * TAU / len, wr = Math.cos(angle), wi = Math.sin(angle);
      for (let i = 0; i < n; i += len) {
        let r = 1, im = 0;
        for (let j = 0; j < len / 2; j++) {
          const a = i + j, b = a + len / 2;
          const br = real[b] * r - imag[b] * im, bi = real[b] * im + imag[b] * r;
          real[b] = real[a] - br;
          imag[b] = imag[a] - bi;
          real[a] += br;
          imag[a] += bi;
          const next = r * wr - im * wi;
          im = r * wi + im * wr;
          r = next;
        }
      }
    }
    if (inverse) for (let i = 0; i < n; i++) {
      real[i] /= n;
      imag[i] /= n;
    }
  }
  function coefficient(bank, frame, harmonic) {
    const t = frame / (FRAMES - 1), h = harmonic;
    switch (bank) {
      case "basic": {
        const sine = h === 1 ? 1 : 0, triangle = h % 2 ? (-1) ** ((h - 1) / 2) / h ** 2 : 0;
        const square = h % 2 ? 1 / h : 0, saw = (h % 2 ? 1 : -1) / h;
        return [sine, triangle, square, saw, h % 2 ? 1 / h : 0.65 / h][frame];
      }
      case "harmonic":
        return Math.exp(-(((h - (1 + t * 18)) / (1.5 + 4 * t)) ** 2)) / Math.sqrt(h) + (h === 1 ? 0.35 : 0);
      case "formant":
        return (0.15 + 2 * Math.exp(-(((h - (3 + t * 14)) / 2) ** 2))) / h;
      case "metallic":
        return (h === 1 ? 0.35 : 0) + (Math.sin(h * (1.2 + t * 2)) > 0.1 ? 1 : -0.4) / Math.sqrt(h);
      case "vocal":
        return (Math.exp(-(((h - (2 + t * 4)) / 1.2) ** 2)) + 0.7 * Math.exp(-(((h - (10 - t * 3)) / 1.7) ** 2)) + 0.05) / Math.sqrt(h);
      case "digital":
        return (h === 1 ? 0.4 : 0) + (Math.cos(h * (1 + t * 2.4)) > 0.3 ? (h % 2 ? 1 : -1) / Math.sqrt(h) : 0);
      default:
        return h === 1 ? 1 : 0;
    }
  }
  function getBank(id) {
    const cached = banks.get(id);
    if (cached) return cached;
    const bank = [];
    for (let frame = 0; frame < FRAMES; frame++) {
      const variants = [];
      for (let warp = 0; warp < WARPS; warp++) {
        const real = new Float64Array(SIZE), imag = new Float64Array(SIZE);
        let peak = 0;
        for (let i = 0; i < SIZE; i++) {
          const phase = i / SIZE + warp / (WARPS - 1) * 0.12 * Math.sin(TAU * i / SIZE);
          let value = 0;
          for (let h = 1; h <= 32; h++) value += coefficient(id, frame, h) * Math.sin(TAU * phase * h);
          real[i] = value;
          peak = Math.max(peak, Math.abs(value));
        }
        for (let i = 0; i < SIZE; i++) real[i] /= Math.max(1, peak) * 1.15;
        fft(real, imag, false);
        const mips = [];
        for (let level = 0; level < LEVELS; level++) {
          const r = real.slice(), im = imag.slice(), limit = 2 ** level;
          r[0] = im[0] = 0;
          for (let h = limit + 1; h < SIZE - limit; h++) r[h] = im[h] = 0;
          fft(r, im, true);
          const output = Float32Array.from(r);
          const max = Math.max(...output.map(Math.abs));
          if (max > 1) for (let i = 0; i < SIZE; i++) output[i] /= max;
          mips.push(output);
        }
        variants.push(mips);
      }
      bank.push(variants);
    }
    banks.set(id, bank);
    return bank;
  }
  function cycle(table, phase) {
    const p = (phase - Math.floor(phase)) * SIZE, index = Math.floor(p), fraction = p - index;
    return table[index] + (table[(index + 1) % SIZE] - table[index]) * fraction;
  }
  function mip(bank, frame, warp, phase, level) {
    const lo = Math.floor(level), hi = Math.min(LEVELS - 1, lo + 1), blend = level - lo;
    return cycle(bank[frame][warp][lo], phase) * (1 - blend) + cycle(bank[frame][warp][hi], phase) * blend;
  }
  function tableSample(bank, phase, position, warp, level = LEVELS - 1) {
    const p = clamp3(position) * (FRAMES - 1), a = Math.floor(p), b = Math.min(FRAMES - 1, a + 1), t = p - a;
    const w = clamp3(warp) * (WARPS - 1), x = Math.floor(w), y = Math.min(WARPS - 1, x + 1), u = w - x;
    const first = mip(bank, a, x, phase, level) * (1 - u) + mip(bank, a, y, phase, level) * u;
    const last = mip(bank, b, x, phase, level) * (1 - u) + mip(bank, b, y, phase, level) * u;
    return first * (1 - t) + last * t;
  }
  var unisonCents = (index, count, spread) => count === 1 ? 0 : (index / (count - 1) * 2 - 1) * clamp3(spread) * 35;
  var WavetableDSP = class {
    constructor(id, unison, position = 0, warp = 0, spread = 0) {
      __publicField(this, "unison", unison);
      __publicField(this, "phases", new Float64Array(4));
      __publicField(this, "position");
      __publicField(this, "warp");
      __publicField(this, "spread");
      __publicField(this, "bank");
      this.bank = getBank(id);
      this.position = position;
      this.warp = warp;
      this.spread = spread;
    }
    render(output, sampleRate, frequency2, detune, position, warp, spread) {
      const smooth = 1 - Math.exp(-1 / (0.012 * sampleRate));
      for (let sample = 0; sample < output.length; sample++) {
        this.position += (clamp3(position) - this.position) * smooth;
        this.warp += (clamp3(warp) - this.warp) * smooth;
        this.spread += (clamp3(spread) - this.spread) * smooth;
        let value = 0;
        for (let voice = 0; voice < this.unison; voice++) {
          const hz = clamp3(frequency2 * 2 ** ((detune + unisonCents(voice, this.unison, this.spread)) / 1200), 1, sampleRate * 0.45);
          const level = clamp3(Math.log2(sampleRate * 0.45 / hz) - 1, 0, LEVELS - 1);
          value += tableSample(this.bank, this.phases[voice], this.position, this.warp, level) / this.unison;
          this.phases[voice] = (this.phases[voice] + hz / sampleRate) % 1;
        }
        output[sample] = value;
      }
    }
  };

  // create/synth-audio/src/wavetable-source.ts
  var WAVETABLE_BUFFER_SIZE = 1024;
  var CONTROL_NAMES = ["frequency", "detune", "position", "warp", "spread"];
  function createWavetableSource(context, options) {
    if (!context.createScriptProcessor) throw new Error("Buffered wavetable audio is not supported in this browser. Native VCO remains available.");
    const dsp = new WavetableDSP(options.table, options.unison, options.position, options.warp, options.spread);
    const node = context.createScriptProcessor(WAVETABLE_BUFFER_SIZE, 6, 1);
    const merger = context.createChannelMerger(6);
    node.channelInterpretation = "discrete";
    merger.channelInterpretation = "discrete";
    const controls = CONTROL_NAMES.map((name, index) => {
      const source = context.createConstantSource();
      source.offset.value = options[name];
      source.connect(merger, 0, index);
      source.start(0);
      return source;
    });
    merger.connect(node);
    const parameters = new Map(CONTROL_NAMES.map((name, i) => [name, controls[i].offset]));
    let end = options.end, disposed = false;
    let ended;
    const drain = 3 * WAVETABLE_BUFFER_SIZE / context.sampleRate;
    const stop = (time) => {
      end = time;
      for (const control of controls) {
        try {
          control.stop(Math.max(context.currentTime, time + drain));
        } catch {
        }
      }
    };
    controls[0].onended = () => {
      if (!disposed) ended?.();
    };
    node.onaudioprocess = (event) => {
      const output = event.outputBuffer.getChannelData(0);
      output.fill(0);
      if (disposed) return;
      const rate = context.sampleRate;
      for (let offset = 0; offset < output.length; offset += 128) {
        const blockTime = event.playbackTime + offset / rate, length = Math.min(128, output.length - offset);
        if (blockTime + length / rate <= options.start || blockTime >= end) continue;
        const first = Math.max(0, Math.ceil((options.start - blockTime) * rate));
        const last = Math.min(length, Math.ceil((end - blockTime) * rate));
        if (last <= first) continue;
        const inputIndex = offset + first;
        const read = (channel) => event.inputBuffer.getChannelData(channel)[inputIndex];
        dsp.render(
          output.subarray(offset + first, offset + last),
          rate,
          read(0),
          read(1),
          read(2),
          read(3),
          read(4)
        );
      }
    };
    stop(end);
    return {
      node,
      frequency: controls[0].offset,
      detune: controls[1].offset,
      parameters,
      components: options.unison,
      stop,
      onended: (callback) => {
        ended = callback;
      },
      dispose: () => {
        if (disposed) return;
        disposed = true;
        ended = void 0;
        node.onaudioprocess = null;
        controls[0].onended = null;
        for (const control of controls) {
          try {
            control.stop();
          } catch {
          }
          control.disconnect();
        }
        merger.disconnect();
        node.disconnect();
      }
    };
  }

  // create/synth-audio/src/oscillator.ts
  var ready = /* @__PURE__ */ new WeakMap();
  async function prepareWavetable(context) {
    let promise = ready.get(context);
    if (!promise) {
      const workerURL = URL.createObjectURL(new Blob([bankWorkerSource], { type: "text/javascript" }));
      let worker;
      let timeout;
      promise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => reject(new Error("Wavetable bank generation exceeded 15 seconds. Retry Play or select VCO.")), 15e3);
        worker = new Worker(workerURL);
        worker.onmessage = (event) => {
          try {
            installBanks(event.data);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        worker.onerror = (event) => reject(new Error(`Wavetable bank generation failed: ${event.message}`));
        worker.onmessageerror = () => reject(new Error("Wavetable bank data could not be received."));
      }).finally(() => {
        clearTimeout(timeout);
        worker?.terminate();
        URL.revokeObjectURL(workerURL);
      });
      ready.set(context, promise);
      void promise.catch(() => ready.delete(context));
    }
    return promise;
  }
  var pulseCache = /* @__PURE__ */ new WeakMap();
  function pulseWave(context, width) {
    const key = Math.round(Math.max(0.05, Math.min(0.95, width)) * 100);
    let cache = pulseCache.get(context);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      pulseCache.set(context, cache);
    }
    let wave = cache.get(key);
    if (!wave) {
      const real = new Float32Array(129), imag = new Float32Array(129), duty = key / 100;
      for (let h = 1; h < real.length; h++) {
        real[h] = 2 * Math.sin(2 * Math.PI * h * duty) / (Math.PI * h);
        imag[h] = 2 * (1 - Math.cos(2 * Math.PI * h * duty)) / (Math.PI * h);
      }
      wave = context.createPeriodicWave(real, imag);
      cache.set(key, wave);
    }
    return wave;
  }
  function createOscillatorUnit(context, options) {
    const p = options;
    if (p.kind === "wavetable") {
      return createWavetableSource(context, p);
    }
    const node = p.kind === "noise" ? context.createBufferSource() : context.createOscillator();
    if (node instanceof OscillatorNode) {
      if (p.kind === "square") node.setPeriodicWave(pulseWave(context, p.pulseWidth));
      else node.type = p.kind === "saw" ? "sawtooth" : p.kind;
      node.frequency.value = p.frequency;
      node.detune.value = p.detune;
    } else {
      node.buffer = p.noise;
      node.loop = true;
    }
    node.start(p.start);
    node.stop(Math.max(p.start + 0.015, p.end));
    return {
      node,
      frequency: node instanceof OscillatorNode ? node.frequency : null,
      detune: node instanceof OscillatorNode ? node.detune : null,
      components: 1,
      stop: (time) => {
        try {
          node.stop(time);
        } catch {
        }
      },
      onended: (callback) => {
        node.onended = callback;
      },
      dispose: () => node.disconnect()
    };
  }

  // create/synth-audio/src/midi-playback.ts
  var MidiPlayback = class {
    constructor(file, loop = false) {
      __publicField(this, "file", file);
      __publicField(this, "loop", loop);
      __publicField(this, "index", 0);
      __publicField(this, "cycle", 0);
      __publicField(this, "origin", 0);
      __publicField(this, "lastCycle", Infinity);
    }
    start(time) {
      this.index = 0;
      this.cycle = 0;
      this.origin = time;
      this.lastCycle = this.loop ? Infinity : 0;
    }
    setLoop(loop, now) {
      this.loop = loop;
      this.lastCycle = loop ? Infinity : Math.max(0, Math.floor((now - this.origin) / this.file.duration));
      if (!loop && this.cycle > this.lastCycle) {
        this.cycle = this.lastCycle + 1;
        this.index = 0;
      }
      return this.origin + (this.lastCycle + 1) * this.file.duration;
    }
    position(now) {
      const elapsed = Math.max(0, now - this.origin);
      return this.loop ? elapsed % this.file.duration : Math.min(elapsed - Math.min(this.lastCycle, Math.floor(elapsed / this.file.duration)) * this.file.duration, this.file.duration);
    }
    ended(now) {
      return !this.loop && now >= this.origin + (this.lastCycle + 1) * this.file.duration;
    }
    schedule(now, horizon, emit) {
      const current = Math.max(0, Math.floor((now - this.origin) / this.file.duration));
      if (current > this.cycle) {
        this.cycle = current;
        this.index = 0;
      }
      while (this.cycle <= this.lastCycle) {
        const note = this.file.notes[this.index];
        const time = this.origin + this.cycle * this.file.duration + note.time;
        if (time >= horizon) return;
        if (time >= now - 0.03) emit(note, Math.max(now, time));
        if (++this.index === this.file.notes.length) {
          this.index = 0;
          this.cycle++;
        }
      }
    }
  };

  // create/synth-audio/src/engine.ts
  var FM_HZ_PER_INDEX = 100;
  var midiName2 = (midi) => `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
  var frequency = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
  var copySettings = (s) => ({
    ...s,
    vcoMods: s.vcoMods.map((m) => ({ ...m })),
    vcfMods: s.vcfMods.map((m) => ({ ...m })),
    vcaMods: s.vcaMods.map((m) => ({ ...m }))
  });
  var SynthEngine = class {
    constructor(settings) {
      __publicField(this, "settings");
      __publicField(this, "context", null);
      // Live Play keeps Math.random. Offline render and the page's Live toggle pass a seeded RNG into open().
      __publicField(this, "noiseRandom", Math.random);
      // When set, the master chain feeds this node instead of context.destination
      // (the page routes it into Live's hack chain).
      __publicField(this, "outputNode", null);
      __publicField(this, "bus", null);
      __publicField(this, "master", null);
      __publicField(this, "analyser", null);
      __publicField(this, "noise", null);
      __publicField(this, "voices", []);
      __publicField(this, "timer", null);
      __publicField(this, "playing", false);
      __publicField(this, "nextTime", 0);
      __publicField(this, "step", 0);
      __publicField(this, "serial", 0);
      __publicField(this, "triggers", []);
      __publicField(this, "currentNotes", "\u2014");
      __publicField(this, "currentSerial", 0);
      __publicField(this, "disposed", false);
      __publicField(this, "wavetableReady", false);
      __publicField(this, "midi", null);
      __publicField(this, "midiStoppedPosition", 0);
      __publicField(this, "transportRequest", 0);
      __publicField(this, "signals", new SignalRegistry());
      __publicField(this, "lfo1", new LfoSource("lfo1", "LFO 1", "sine", 0.5));
      __publicField(this, "lfo2", new LfoSource("lfo2", "LFO 2", "triangle", 0.25));
      __publicField(this, "manual", new SmoothedSource("manual", "Manual", "internal", 0.04));
      __publicField(this, "situationSources", /* @__PURE__ */ new Map());
      __publicField(this, "interpreter", new MusicInterpreter());
      __publicField(this, "eventQueue", new MusicalEventQueue());
      __publicField(this, "decisionListener", null);
      __publicField(this, "semantic", new SemanticController());
      this.settings = copySettings(settings);
      this.signals.register(this.lfo1);
      this.signals.register(this.lfo2);
      this.signals.register(this.manual);
      this.update(settings);
    }
    setSemanticConfig(config) {
      this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
      this.semantic.setConfig(config);
      if (this.context) this.applyControls();
    }
    scrubSemantic(position) {
      this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
      this.semantic.scrub(position);
      if (this.context) this.applyControls();
    }
    semanticAmount(destination) {
      return contribution(this.semantic.config, this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo).values, destination);
    }
    getSemanticStatus() {
      const state = this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings.tempo);
      const s = this.settings;
      const bases = {
        cutoff: s.cutoff,
        resonance: s.resonance,
        amplitude: s.level / 100,
        attack: s.attack,
        release: s.release,
        pitch: s.tuning,
        detune: s.detune,
        duration: 1,
        register: 0,
        position: s.position,
        warp: s.warp,
        spread: s.spread,
        subLevel: s.subLevel,
        pulseWidth: s.pulseWidth
      };
      const effective = Object.fromEntries(Object.entries(bases).map(([key, base]) => [key, semanticEffective(base, key, contribution(this.semantic.config, state.values, key), Math.min(2e4, (this.context?.sampleRate ?? 48e3) * 0.45))]));
      const actual = this.voices.filter((v) => !v.cleaned && v.start <= (this.context?.currentTime ?? 0) && v.end > (this.context?.currentTime ?? 0)).map((v) => ({
        cutoff: v.filter.frequency.value,
        resonance: v.filter.Q.value,
        amplitude: v.level.gain.value,
        frequencies: v.sources.filter((s2) => s2.role === "main" && !s2.fading && s2.unit.frequency).map((s2) => s2.unit.frequency.value),
        detune: v.sources.filter((s2) => s2.role === "main" && !s2.fading && s2.unit.detune).map((s2) => s2.unit.detune.value),
        oscillator: v.sources.filter((s2) => !s2.fading).map((s2) => ({
          role: s2.role,
          kind: s2.kind,
          components: s2.unit.components,
          frequency: s2.unit.frequency?.value,
          gain: s2.gain.gain.value,
          parameters: Object.fromEntries(["position", "warp", "spread"].map((k) => [k, s2.unit.parameters?.get(k)?.value]))
        })),
        attack: v.env.attack,
        release: v.env.release,
        gateSeconds: v.gate - v.start
      }));
      return { ...state, enabled: this.semantic.config.enabled, bases, effective, actual, audioTime: this.context?.currentTime ?? 0 };
    }
    setDecisionListener(listener) {
      this.decisionListener = listener;
    }
    setSituationSources(sources) {
      const ids = new Set(sources.map((s) => s.id));
      for (const id of this.situationSources.keys()) if (!ids.has(id)) this.signals.unregister(id);
      this.situationSources = new Map(sources.map((s) => [s.id, structuredClone(s)]));
      const selected = this.situationSources.get(this.settings.situationSource);
      if (this.settings.mode === "event" && selected?.status !== "live") this.eventQueue.clear();
      for (const s of sources) {
        if (s.kind !== "continuous") continue;
        this.signals.register({
          id: s.id,
          displayName: s.name,
          sourceType: "situational",
          sample: () => {
            const current = this.situationSources.get(s.id);
            return {
              id: current.id,
              displayName: current.name,
              sourceType: "situational",
              currentValue: current.rawValue ?? 0,
              normalizedValue: current.conditionedValue ?? 0,
              timestamp: current.measurementTimestamp ? Date.parse(current.measurementTimestamp) / 1e3 : 0
            };
          }
        });
      }
    }
    enqueueSituationEvent(event) {
      const source = this.situationSources.get(event.sourceId);
      if (this.midi || !this.playing || this.settings.mode !== "event" || event.sourceId !== this.settings.situationSource || source?.status !== "live" || source.kind !== "event" || event.type === "vehicle_replaced") return;
      const time = this.context.currentTime;
      const reason = this.eventQueue.push(event, time, this.settings.minEventInterval);
      if (reason && reason !== "duplicate") this.provenance([], "Dropped event", source, time, event, reason);
    }
    clearSituationEvents() {
      this.eventQueue.clear();
    }
    getEventQueueStatus() {
      return { pending: this.eventQueue.pending, dropped: this.eventQueue.dropped };
    }
    setMidiFile(file, loop = false) {
      this.panic();
      this.midi = file ? new MidiPlayback(file, loop) : null;
      this.midiStoppedPosition = 0;
    }
    setMidiLoop(loop) {
      if (!this.midi) return;
      const now = this.context?.currentTime ?? 0;
      const end = this.midi.setLoop(loop, now);
      if (!loop && this.playing) {
        for (const voice of this.voices) if (voice.start >= end) this.retire(voice, now, 3e-3);
        this.triggers = this.triggers.filter((trigger) => trigger.time < end);
      }
    }
    getMidiStatus() {
      return this.midi ? {
        name: this.midi.file.name,
        duration: this.midi.file.duration,
        loop: this.midi.loop,
        position: this.playing ? this.midi.position(this.context?.currentTime ?? 0) : this.midiStoppedPosition
      } : null;
    }
    update(settings) {
      this.semantic.sample(this.context?.currentTime ?? 0, this.playing, this.settings?.tempo ?? settings.tempo);
      if (this.settings && (settings.situationSource !== this.settings.situationSource || settings.mode !== this.settings.mode)) {
        this.eventQueue.clear();
        this.interpreter.reset();
      }
      this.settings = copySettings(settings);
      const time = this.context?.currentTime ?? 0;
      this.lfo1.sample(time);
      this.lfo2.sample(time);
      this.lfo1.rate = clamp(settings.lfo1, 0.01, 20);
      this.lfo2.rate = clamp(settings.lfo2, 0.01, 20);
      this.manual.push(settings.manual, time);
      if (this.playing && settings.oscillatorMode === "wavetable" && !this.wavetableReady) {
        this.stop();
        throw new Error("Wavetable DSP is not ready. Press Play to initialize it, or select VCO to continue with native audio.");
      }
      if (this.context) this.applyControls();
    }
    /** Inject a context, the noise RNG, and an optional output node. Live Play still calls initialize() with none of these. */
    async open(context, random = Math.random, destination) {
      this.noiseRandom = random;
      if (destination) this.outputNode = destination;
      await this.initialize(context);
    }
    async initialize(given) {
      if (this.disposed) throw new Error("This audio engine has been closed.");
      if (!this.context) {
        let context2 = given;
        if (!context2) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) throw new Error("Web Audio is not supported in this browser.");
          context2 = new AudioContextClass({ latencyHint: "interactive" });
        }
        this.context = context2;
        this.bus = context2.createGain();
        this.bus.gain.value = 0.085;
        const limiter = context2.createDynamicsCompressor();
        limiter.threshold.value = -6;
        limiter.knee.value = 6;
        limiter.ratio.value = 12;
        limiter.attack.value = 3e-3;
        limiter.release.value = 0.12;
        this.master = context2.createGain();
        this.master.gain.value = clamp(this.settings.master / 100, 0, 1);
        this.analyser = context2.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.7;
        this.bus.connect(limiter).connect(this.master).connect(this.analyser).connect(this.outputNode || context2.destination);
        this.noise = context2.createBuffer(1, context2.sampleRate * 2, context2.sampleRate);
        const data = this.noise.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = this.noiseRandom() * 2 - 1;
      }
      if (this.context instanceof OfflineAudioContext || this.outputNode) return;
      if (this.context.state === "suspended") await this.context.resume();
      if (this.context.state !== "running") throw new Error("Audio could not start. Press Play again to enable audio.");
      const context = this.context;
      const loading = prepareWavetable(context).then(() => {
        if (!this.disposed && this.context === context) this.wavetableReady = true;
      });
      if (this.settings.oscillatorMode === "vco") {
        void loading.catch(() => {
        });
        return;
      }
      let timeout;
      try {
        await Promise.race([loading, new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error("Wavetable banks did not load within 15 seconds. Press Play to retry.")), 15e3);
        })]);
      } finally {
        clearTimeout(timeout);
      }
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
      this.nextTime = this.context.currentTime + 8e-3;
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
      this.currentNotes = "\u2014";
      for (const voice of this.voices) {
        if (voice.start > now) this.retire(voice, now, 3e-3);
        else this.retire(voice, now, voice.env.release);
      }
      if (this.voices.some((v) => !v.cleaned)) this.timer = setInterval(() => this.tick(), 20);
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
      this.currentNotes = "\u2014";
      const now = this.context?.currentTime ?? 0;
      for (const voice of this.voices) {
        voice.envelope.gain.cancelScheduledValues(now);
        voice.envelope.gain.setValueAtTime(0, now);
        for (const source of voice.sources) source.unit.stop(now);
        this.cleanup(voice);
      }
      this.voices = [];
      if (this.analyser && this.master && this.context) {
        this.analyser.disconnect();
        this.master.disconnect();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 2048;
        this.master.connect(this.analyser).connect(this.outputNode || this.context.destination);
      }
    }
    dispose() {
      this.panic();
      this.disposed = true;
      void this.context?.close();
      this.context = null;
    }
    getAnalyser() {
      return this.analyser;
    }
    getSignals() {
      return this.signals.all(this.context?.currentTime ?? 0);
    }
    getStatus() {
      const now = this.context?.currentTime ?? 0;
      while (this.triggers.length && this.triggers[0].time <= now) {
        const trigger = this.triggers.shift();
        this.currentNotes = trigger.notes;
        this.currentSerial = trigger.serial;
      }
      return {
        playing: this.playing,
        notes: this.currentNotes,
        trigger: this.currentSerial,
        voices: this.voices.filter((v) => !v.cleaned && v.start <= now && v.end > now).length,
        audioState: this.context?.state ?? "idle"
      };
    }
    tick() {
      if (!this.context) return;
      const now = this.context.currentTime;
      for (const voice of this.voices) if (voice.end + 0.03 < now) this.cleanup(voice);
      this.voices = this.voices.filter((v) => !v.cleaned);
      this.applyControls();
      if (this.playing && this.context.state === "running") {
        if (this.midi) {
          if (this.midi.ended(now)) {
            this.stop();
            return;
          }
          this.midi.schedule(now, now + 0.1, (note, time) => {
            this.createVoice(note.midi, time, note.duration, note.velocity);
            this.triggers.push({ time, notes: midiName2(note.midi), serial: ++this.serial });
          });
          if (this.triggers.length > 64) this.triggers.splice(0, this.triggers.length - 64);
          return;
        }
        if (this.nextTime < now - 0.1) this.nextTime = now + 8e-3;
        while (this.nextTime < now + 0.1) {
          const duration = 60 / clamp(this.settings.tempo, 20, 240) * (4 / this.settings.interval);
          this.schedule(this.nextTime, duration);
          this.nextTime += duration;
        }
      } else if (!this.playing && !this.voices.length && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
    notes() {
      return generateNotes(this.settings, this.step);
    }
    schedule(time, duration) {
      const s = this.settings;
      const situational = ["melody", "progression", "event"].includes(s.mode);
      let notes, label;
      let source;
      let event = null;
      let held = false;
      if (situational) {
        source = this.situationSources.get(s.situationSource);
        if (s.mode === "event") {
          event = this.eventQueue.take(time);
          if (!event) {
            this.step++;
            return;
          }
        }
        const selection = this.interpreter.select(s, source, time, duration, Boolean(event));
        if (!selection) {
          this.step++;
          return;
        }
        notes = selection.notes;
        label = selection.label;
        held = selection.held;
      } else {
        notes = this.notes();
        label = notes.map(midiName2).join(" \xB7 ");
      }
      this.step++;
      const gateDuration = (s.mode === "progression" ? s.chordDuration * 60 / s.tempo : duration * clamp(s.gate / 100, 0.1, 1)) * semanticEffective(1, "duration", this.semanticAmount("duration"));
      const register = semanticEffective(0, "register", this.semanticAmount("register"));
      if (register) {
        notes = notes.map((midi) => clamp(midi + register, 0, 127));
        label = `${label} \u2192 ${notes.map(midiName2).join(" \xB7 ")}`;
      }
      for (const midi of notes) this.createVoice(midi, time, gateDuration);
      this.triggers.push({ time, notes: label, serial: ++this.serial });
      if (source) this.provenance(notes, label, source, time, event ?? void 0, void 0, held);
      if (this.triggers.length > 64) this.triggers.splice(0, this.triggers.length - 64);
    }
    provenance(notes, label, source, time, event, dropReason, held = false) {
      const s = this.settings, now = this.context?.currentTime ?? time;
      const decision = {
        id: crypto.randomUUID(),
        sourceId: source.id,
        musicalTimestamp: new Date(Date.now() + (time - now) * 1e3).toISOString(),
        audioTime: time,
        label,
        notes,
        rawValue: source.rawValue,
        normalizedValue: source.normalizedValue,
        conditionedValue: source.conditionedValue,
        measurementTimestamp: source.measurementTimestamp,
        interpretation: dropReason ? "dropped" : held ? "hold last selection" : s.mode === "event" ? "cyclic" : s.interpretation,
        key: NOTE_NAMES[s.note],
        collection: s.mode === "progression" || s.mode === "event" && s.eventOutput === "chord" ? s.collection : s.scale,
        tempo: s.tempo,
        grid: s.interval,
        sourceConfiguration: structuredClone(source.configuration),
        normalizationConfiguration: structuredClone(source.normalization),
        ...event ? { eventId: event.id, eventType: event.type, eventTimestamp: event.timestamp, eventMetadata: event.metadata } : {},
        ...dropReason ? { dropReason } : {}
      };
      this.decisionListener?.(decision);
    }
    modulation(slots, values, destination) {
      return slots.reduce((sum, slot) => sum + (slot.destination === destination ? (values.get(slot.source) ?? 0) * slot.amount / 100 : 0), 0);
    }
    controlValues() {
      return new Map(this.getSignals().map((s) => [s.id, clamp(s.normalizedValue, -1, 1)]));
    }
    env(values) {
      const s = this.settings;
      const m = (destination) => this.modulation(s.vcaMods, values, destination);
      return {
        attack: semanticEffective(clamp(s.attack * Math.pow(2, m("attack") * 5), 1e-3, 5), "attack", this.semanticAmount("attack")),
        decay: clamp(s.decay * Math.pow(2, m("decay") * 5), 1e-3, 5),
        sustain: clamp(s.sustain / 100 + m("sustain"), 0, 1),
        release: semanticEffective(clamp(s.release * Math.pow(2, m("release") * 5), 1e-3, 10), "release", this.semanticAmount("release"))
      };
    }
    /** One written note on the existing voice path. Live patterns still use schedule(). */
    scheduleNote(midi, time, duration, velocity = 1, modulator) {
      this.createVoice(midi, time, duration, velocity, modulator);
    }
    /** Buffer sources currently feeding a carrier. Panic and stop clear this. */
    activeModulators() {
      let n = 0;
      for (const voice of this.voices) if (!voice.cleaned) n += voice.modSources.length;
      return n;
    }
    createVoice(midi, start, duration, velocity = 1, modulator) {
      const context = this.context;
      this.voices = this.voices.filter((v) => !v.cleaned);
      const active = this.voices.filter((v) => !v.cleaned && v.end > context.currentTime);
      if (active.length >= this.voiceLimit()) this.retire(active.find((v) => !v.released) ?? active[0], context.currentTime, 5e-3);
      if (!(context instanceof OfflineAudioContext) && this.voices.length >= 36) this.cleanup(this.voices[0]);
      const values = this.controlValues();
      const env = this.env(values);
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();
      const level = context.createGain();
      filter.connect(envelope).connect(level).connect(this.bus);
      const voice = {
        midi,
        velocity,
        start,
        gate: start + duration,
        end: start + duration + env.release + 0.01,
        env,
        filter,
        envelope,
        level,
        sources: [],
        modSources: [],
        modNodes: [],
        released: false,
        cleaned: false
      };
      this.voices.push(voice);
      this.setVoiceControls(voice, values);
      const g = envelope.gain;
      g.setValueAtTime(0, start);
      if (duration >= env.attack) g.linearRampToValueAtTime(1, start + env.attack);
      if (duration >= env.attack + env.decay) g.linearRampToValueAtTime(env.sustain, start + env.attack + env.decay);
      const gateLevel = this.envelopeAt(voice, voice.gate);
      g.linearRampToValueAtTime(gateLevel, voice.gate);
      g.linearRampToValueAtTime(0, voice.gate + env.release);
      this.addSource(voice, "main", start, values, false);
      if (this.subAmount() > 0) this.addSource(voice, "sub", start, values, false);
      this.attachModulator(voice, modulator);
    }
    /** Audio-rate FM into the main oscillator only. The clip is not a carrier and is not heard on its own. */
    attachModulator(voice, mod) {
      if (!mod || !mod.buffer || !this.context) return;
      if (this.settings.oscillatorMode === "wavetable") return;
      const depth = Math.max(0, Math.min(10, +mod.depth || 0));
      const followCut = Math.max(0, +mod.followCutoff || 0);
      const followLvl = Math.max(0, +mod.followLevel || 0);
      if (!(depth > 0) && !(followCut > 0) && !(followLvl > 0)) return;
      const main = voice.sources.find((s) => s.role === "main");
      const freq = main?.unit.frequency;
      if (!freq) return;
      const offset = Math.max(0, +mod.offset || 0);
      const remain = mod.buffer.duration - offset;
      if (!(remain > 1e-3)) return;
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
      const play = Math.min(Math.max(1e-3, voice.end - voice.start), remain);
      try {
        src.start(voice.start, offset, play);
      } catch {
      }
      voice.modSources.push(src);
    }
    /** Full-wave rectify, then a slow low-pass. Same clip as the FM input. */
    envelopeFollower(source) {
      const context = this.context;
      const shaper = context.createWaveShaper();
      const curve = new Float32Array(256);
      for (let i = 0; i < curve.length; i++) curve[i] = Math.abs(i / (curve.length - 1) * 2 - 1);
      shaper.curve = curve;
      shaper.oversample = "none";
      const low = context.createBiquadFilter();
      low.type = "lowpass";
      low.frequency.value = 30;
      low.Q.value = 0.707;
      source.connect(shaper);
      shaper.connect(low);
      return { out: low, nodes: [shaper, low] };
    }
    stopModulators(voice) {
      for (const node of voice.modNodes) {
        try {
          node.disconnect();
        } catch {
        }
      }
      const when = this.context?.currentTime ?? 0;
      for (const src of voice.modSources) {
        try {
          src.disconnect();
        } catch {
        }
        try {
          src.stop(when);
        } catch {
        }
      }
      voice.modSources = [];
      voice.modNodes = [];
    }
    envelopeAt(voice, time) {
      const t = Math.max(0, time - voice.start);
      const { attack, decay, sustain, release } = voice.env;
      const held = (elapsed) => elapsed < attack ? elapsed / attack : elapsed < attack + decay ? 1 - (1 - sustain) * (elapsed - attack) / decay : sustain;
      if (time <= voice.gate) return held(t);
      return held(voice.gate - voice.start) * clamp(1 - (time - voice.gate) / release, 0, 1);
    }
    subAmount() {
      return this.settings.subEnabled ? semanticEffective(this.settings.subLevel, "subLevel", this.semanticAmount("subLevel")) : 0;
    }
    voiceLimit() {
      if (this.context instanceof OfflineAudioContext) return Number.POSITIVE_INFINITY;
      const wavetable = this.settings.oscillatorMode === "wavetable";
      const components = (wavetable ? this.settings.unison : 1) + (this.subAmount() > 0 ? 1 : 0);
      return Math.min(wavetable ? 12 : 32, Math.floor((wavetable ? 32 : 64) / components));
    }
    sourceKind(role) {
      return role === "sub" ? this.settings.subWaveform : this.settings.oscillatorMode === "wavetable" ? "wavetable" : this.settings.waveform;
    }
    sourceKey(role) {
      const kind = this.sourceKind(role), s = this.settings;
      return `${role}:${kind}:${kind === "wavetable" ? `${s.wavetable}:${s.unison}` : kind === "square" && role === "main" ? Math.round(semanticEffective(s.pulseWidth, "pulseWidth", this.semanticAmount("pulseWidth")) * 100) : ""}`;
    }
    voiceFrequency(voice, values, role) {
      const s = this.settings, pitch = this.modulation(s.vcoMods, values, "pitch") * 12;
      return clamp(frequency(voice.midi + s.oscillatorOctave * 12 + (role === "sub" ? s.subOctave * 12 : 0) + semanticEffective(s.tuning + pitch, "pitch", this.semanticAmount("pitch"))), 1, this.context.sampleRate * 0.45);
    }
    sourceLevel(role) {
      const sub = this.subAmount();
      return (role === "sub" ? sub : 1) / (1 + sub);
    }
    addSource(voice, role, time, values, fade) {
      const context = this.context;
      const s = this.settings, kind = this.sourceKind(role);
      const unit = createOscillatorUnit(context, {
        kind,
        table: s.wavetable,
        unison: s.unison,
        frequency: this.voiceFrequency(voice, values, role),
        detune: semanticEffective(s.detune, "detune", this.semanticAmount("detune")),
        pulseWidth: role === "sub" ? 0.5 : semanticEffective(s.pulseWidth, "pulseWidth", this.semanticAmount("pulseWidth")),
        position: semanticEffective(s.position, "position", this.semanticAmount("position")),
        warp: semanticEffective(s.warp, "warp", this.semanticAmount("warp")),
        spread: semanticEffective(s.spread, "spread", this.semanticAmount("spread")),
        start: time,
        end: voice.end,
        noise: this.noise
      });
      const gain = context.createGain();
      gain.gain.setValueAtTime(fade ? 0 : this.sourceLevel(role), time);
      if (fade) gain.gain.linearRampToValueAtTime(this.sourceLevel(role), time + 0.012);
      unit.node.connect(gain).connect(voice.filter);
      const sound = { unit, gain, kind, role, key: this.sourceKey(role), fading: false };
      voice.sources.push(sound);
      unit.onended(() => {
        unit.dispose();
        gain.disconnect();
        voice.sources = voice.sources.filter((source) => source !== sound);
      });
    }
    applyControls() {
      if (!this.context) return;
      const now = this.context.currentTime;
      this.master?.gain.setTargetAtTime(clamp(this.settings.master / 100, 0, 1), now, 0.015);
      if (this.settings.oscillatorMode === "wavetable" && !this.wavetableReady) return;
      const values = this.controlValues();
      const active = this.voices.filter((v) => !v.cleaned && !v.released);
      for (const voice of active.slice(0, Math.max(0, active.length - this.voiceLimit()))) this.retire(voice, now, 5e-3);
      for (const voice of this.voices) {
        if (voice.cleaned) continue;
        this.setVoiceControls(voice, values);
        if (!voice.released && voice.end > now + 0.02) {
          for (const role of ["main", "sub"]) {
            const live = voice.sources.find((s) => s.role === role && !s.fading);
            const needed = role === "main" || this.subAmount() > 0;
            if (live && (!needed || live.key !== this.sourceKey(role))) {
              const when = Math.max(now, voice.start);
              live.fading = true;
              live.gain.gain.cancelScheduledValues(when);
              live.gain.gain.setTargetAtTime(0, when, 3e-3);
              live.unit.stop(when + 0.018);
            }
            if (needed && (!live || live.fading)) this.addSource(voice, role, Math.max(now, voice.start), values, true);
          }
        }
      }
    }
    setVoiceControls(voice, values) {
      const context = this.context;
      const now = context.currentTime;
      const s = this.settings;
      for (const source of voice.sources) {
        if (source.fading) continue;
        source.unit.frequency?.setTargetAtTime(this.voiceFrequency(voice, values, source.role), now, 0.012);
        source.unit.detune?.setTargetAtTime(semanticEffective(s.detune, "detune", this.semanticAmount("detune")), now, 0.012);
        for (const destination of ["position", "warp", "spread"]) {
          source.unit.parameters?.get(destination)?.setTargetAtTime(semanticEffective(s[destination], destination, this.semanticAmount(destination)), now, 0.012);
        }
        source.gain.gain.setTargetAtTime(this.sourceLevel(source.role), Math.max(now, voice.start + 0.012), 0.012);
      }
      voice.filter.type = s.filter;
      const cutoff = semanticEffective(s.cutoff, "cutoff", this.modulation(s.vcfMods, values, "cutoff") + this.semanticAmount("cutoff"), Math.min(2e4, context.sampleRate * 0.45));
      voice.filter.frequency.setTargetAtTime(cutoff, now, 0.015);
      voice.filter.Q.setTargetAtTime(semanticEffective(s.resonance + this.modulation(s.vcfMods, values, "resonance") * 20, "resonance", this.semanticAmount("resonance")), now, 0.015);
      voice.level.gain.setTargetAtTime(voice.velocity * semanticEffective(clamp(s.level / 100 + this.modulation(s.vcaMods, values, "level"), 0, 1), "amplitude", this.semanticAmount("amplitude")), now, 0.012);
    }
    retire(voice, now, release) {
      if (voice.cleaned) return;
      const time = Math.max(now, 0);
      const gain = voice.envelope.gain;
      const value = voice.start > now ? 0 : this.envelopeAt(voice, now);
      gain.cancelScheduledValues(time);
      gain.setValueAtTime(value, time);
      gain.linearRampToValueAtTime(0, time + release);
      voice.gate = now;
      voice.end = Math.min(voice.end, time + release + 5e-3);
      voice.released = true;
      this.stopModulators(voice);
      for (const source of voice.sources) {
        source.unit.stop(voice.end);
      }
    }
    cleanup(voice) {
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
  };

  // create/synth-audio/src/settings.ts
  function mergeSettings(raw) {
    if (!raw || typeof raw !== "object") return structuredClone(DEFAULT_SETTINGS);
    const r = raw;
    const out = structuredClone(DEFAULT_SETTINGS);
    for (const k of Object.keys(DEFAULT_SETTINGS)) {
      const v = r[k], d = DEFAULT_SETTINGS[k];
      if (v === void 0 || v === null) continue;
      if (Array.isArray(d)) {
        if (Array.isArray(v) && v.length === d.length)
          out[k] = v.map((slot, i) => ({ ...d[i], ...typeof slot === "object" && slot ? slot : {} }));
      } else if (typeof v === typeof d && (typeof v !== "number" || Number.isFinite(v)))
        out[k] = v;
    }
    const number = (key, min, max, integer = false) => {
      const value = out[key];
      out[key] = Math.max(min, Math.min(max, integer ? Math.round(value) : value));
    };
    const choice = (key, choices) => {
      if (!choices.includes(out[key]))
        out[key] = DEFAULT_SETTINGS[key];
    };
    choice("oscillatorMode", ["vco", "wavetable"]);
    choice("waveform", ["saw", "noise", "sine", "triangle", "square"]);
    choice("filter", ["lowpass", "highpass", "bandpass"]);
    choice("wavetable", ["basic", "harmonic", "formant", "metallic", "vocal", "digital"]);
    choice("unison", [1, 2, 4]);
    choice("subWaveform", ["sine", "triangle", "square"]);
    choice("subOctave", [-1, -2]);
    number("oscillatorOctave", -2, 2, true);
    number("detune", -100, 100);
    number("pulseWidth", 0.05, 0.95);
    for (const key of ["position", "warp", "spread", "subLevel"]) number(key, 0, 1);
    return out;
  }

  // create/synth-audio/src/offline.ts
  var RATE = 48e3;
  var PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function mulberry32(seed) {
    let a = seed >>> 0 || 1;
    return function() {
      a = a + 1831565813 >>> 0;
      let t = Math.imul(a ^ a >>> 15, a | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function midiOf(name) {
    const m = /^([A-Ga-g])(#|b)?(-?\d+)$/.exec(name || "");
    if (!m) return null;
    const pc = PC[m[1].toUpperCase()] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    const n = (+m[3] + 1) * 12 + pc;
    return n >= 0 && n <= 127 ? n : null;
  }
  function clamp4(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }
  function fmDepthOf(settings) {
    const raw = settings && typeof settings === "object" ? settings.fmDepth : void 0;
    if (raw == null || !Number.isFinite(+raw)) return 0;
    return clamp4(+raw, 0, 10);
  }
  async function renderNotes(notes, settings, seed) {
    const s = mergeSettings(settings);
    if (s.oscillatorMode === "wavetable") s.oscillatorMode = "vco";
    const depth = fmDepthOf(settings);
    const list = [];
    for (const n of notes || []) {
      if (!n) continue;
      const midi = typeof n.midi === "number" ? n.midi : midiOf(n.pitch || n.note || "");
      if (midi == null || !Number.isFinite(n.start) || !(n.length > 0)) continue;
      list.push({
        midi: clamp4(Math.round(midi), 0, 127),
        velocity: n.velocity == null ? 0.82 : clamp4(+n.velocity, 0, 1),
        start: Math.max(0, +n.start),
        length: +n.length,
        modulator: n.modulator && n.modulator.buffer ? n.modulator : null
      });
    }
    const tail = (Number.isFinite(s.release) ? Math.max(0, s.release) : 0.5) + 0.05;
    let end = 0.05;
    for (const n of list) end = Math.max(end, n.start + n.length + tail);
    const context = new OfflineAudioContext(2, Math.max(1, Math.ceil(end * RATE)), RATE);
    const engine = new SynthEngine(s);
    await engine.open(context, mulberry32(seed));
    for (const n of list) {
      const mod = n.modulator;
      const followCut = mod ? Math.max(0, +mod.followCutoff || 0) : 0;
      const followLvl = mod ? Math.max(0, +mod.followLevel || 0) : 0;
      engine.scheduleNote(n.midi, n.start, n.length, n.velocity, mod && (depth > 0 || followCut > 0 || followLvl > 0) ? {
        buffer: mod.buffer,
        offset: mod.offset || 0,
        depth,
        followCutoff: followCut,
        followLevel: followLvl
      } : null);
    }
    return context.startRendering();
  }
  return __toCommonJS(index_exports);
})();
