/* NC Synth on /create/
 * Copyright (c) 2026 Peter Semmelhack
 *
 * The sound is Peter's NC Synth engine, vendored under MIT in synth-audio/
 * (see synth-audio/LICENSE and synth-audio/SOURCE.md). This file does not
 * reimplement oscillators, the filter, or the ADSR. It reads a notes line,
 * applies the page's default patch, and calls NCSynthEngine.renderNotes,
 * which schedules createVoice on an OfflineAudioContext.
 *
 * A hosted render (nc-performer, Python) matches the engine, not a second DSP:
 *   same note list (midi, velocity 0..1, start seconds, gate length seconds)
 *   settings after mergeSettings (settings.ts). The page patch below is the
 *   base when the line names no patch: saw, sine sub octave -1 level 0.35,
 *   low-pass cutoff 1400 Q 0.7, attack 0.018, decay 0.26, sustain 52,
 *   release 0.4, level 80, master 76, tempo 96.
 *   Hz = 440 * 2 ** ((midi + oscillatorOctave*12 + subOctave*12 + tuning - 69) / 12)
 *   detune is cents. Square is the engine's 129-bin Fourier pulse (oscillator.ts).
 *   Mix: sub = subLevel when subEnabled else 0; main = 1/(1+sub); subGain = sub/(1+sub).
 *   Biquad frequency = cutoff, Q = resonance. Linear ADSR as engine envelopeAt.
 *   Level = velocity * (level/100). Bus gain 0.085, compressor threshold -6,
 *   knee 6, ratio 12, attack 0.003, release 0.12, then master/100.
 *   Noise: 2 s loop, mulberry32(seed) * 2 - 1. 48000 Hz stereo.
 *   Wavetable is not selected; that patch plays its plain waveform.
 *   FM index fmDepth is 0–10. 0 is no FM, and 0 is the page default: the
 *   line is the oscillator until a notes or arp statement writes `fm <depth>`
 *   (for example `n C5 fm 3`). `fm t2 3` and `fm "words" 3` name a modulator
 *   source; they are not a depth on the notes line. A gathered clip is
 *   the modulator only: gain into the carrier frequency is fmDepth * 100 Hz
 *   per full-scale sample. The clip is not pitch-shifted and is not mixed
 *   into the synth output. An `arp` statement uses chord-library.js, a port
 *   of chords.ts from psemmelhack/NetComposer-Synth branch replit-changes,
 *   with the arp orders, Walk, and Euclidean from that repo's main (288e9c2).
 *   The step counter starts again at each chord, so Walk and Euclidean
 *   start their pattern again on each chord too.
 *   An optional envelope follower (absolute value,
 *   then a 30 Hz low-pass) can add to cutoff and loudness; the page leaves
 *   that off.
 *   Seeded RNG (mulberry32): a = (a + 0x6D2B79F5) >>> 0;
 *     t = imul(a ^ (a >>> 15), a | 1);
 *     t ^= t + imul(t ^ (t >>> 7), t | 61);
 *     out = ((t ^ (t >>> 14)) >>> 0) / 4294967296.
 * Output audio is CC BY-SA 4.0. This code stays MIT.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function (root) {
  'use strict';
  var CREDIT = 'NC Synth (Peter Semmelhack)';
  var PC = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11};
  var FILTERS = {lowpass: 'low-pass', highpass: 'high-pass', bandpass: 'band-pass'};
  // Musical page patch. Peter's engine default is tempo 120, sub off, cutoff 2000.
  // Tempo stays 96 so a quarter note is longer than half a second.
  var PATCH = {
    mode: 'single', note: 0, octave: 3, chord: 'Minor 7th', tempo: 96, interval: 4, gate: 100,
    arp: 'off', arpOctaves: 1, octaveRange: 2, waveform: 'saw', tuning: 0,
    oscillatorMode: 'vco', oscillatorOctave: 0, detune: 0, pulseWidth: 0.5,
    wavetable: 'basic', position: 0, warp: 0, unison: 1, spread: 0,
    subEnabled: true, subWaveform: 'sine', subOctave: -1, subLevel: 0.35,
    filter: 'lowpass', cutoff: 1400, resonance: 0.7,
    attack: 0.018, decay: 0.26, sustain: 52, release: 0.4, level: 80,
    master: 76, lfo1: 0.5, lfo2: 0.25, manual: 0,
    scale: 'Dorian', collection: 'Diatonic Major', situationSource: '',
    interpretation: 'position', deadband: 0.02, stepThreshold: 0.10, maxStep: 4,
    chordDuration: 4, eventOutput: 'note', minEventInterval: 1,
    vcoMods: [{source: 'none', destination: 'pitch', amount: 0}, {source: 'none', destination: 'pitch', amount: 0}],
    vcfMods: [{source: 'none', destination: 'cutoff', amount: 0}, {source: 'none', destination: 'resonance', amount: 0}],
    vcaMods: [{source: 'none', destination: 'level', amount: 0}, {source: 'none', destination: 'sustain', amount: 0}],
    fmDepth: 0
  };

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function imul(a, b) { return Math.imul(a, b); }
  function mulberry32(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = imul(t ^ (t >>> 15), t | 1);
      t ^= t + imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function midiOf(name) {
    var m = /^([A-Ga-g])(#|b)?(-?\d+)$/.exec(name || '');
    if (!m) return null;
    var pc = PC[m[1].toUpperCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    var n = (+m[3] + 1) * 12 + pc;
    return n >= 0 && n <= 127 ? n : null;
  }
  // The same pitch `notes C5` uses. No octave keeps the catalog root, C at 60.
  function midiAt(pc, octave) {
    pc = ((+pc % 12) + 12) % 12;
    if (octave == null || octave === '') return 60 + pc;
    var n = (+octave + 1) * 12 + pc;
    return n >= 0 && n <= 127 ? n : 60 + pc;
  }
  function chordRoot(symbol, octave) {
    var m = /^([A-G])(#|b)?/.exec(symbol || '');
    var pc = 0;
    if (m) pc = PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    return midiAt(pc, octave);
  }
  function spell(name) {
    var m = /^([A-Ga-g])(#|b)?(-?\d+)$/.exec(name || '');
    return m ? m[1].toUpperCase() + (m[2] || '') + m[3] : '';
  }

  // Same choices and clamps as synth-audio/src/settings.ts. The base is the
  // page patch, so an empty line still gets the musical default. Cutoff,
  // attack, and tempo are not clamped here; the voice path clamps the ones it plays.
  function mergeSettings(raw) {
    var out = clone(PATCH);
    if (raw && typeof raw === 'object') {
      Object.keys(PATCH).forEach(function (k) {
        var v = raw[k], d = PATCH[k];
        if (v === undefined || v === null) return;
        if (Array.isArray(d)) {
          if (Array.isArray(v) && v.length === d.length) {
            out[k] = v.map(function (slot, i) {
              return Object.assign({}, d[i], (slot && typeof slot === 'object') ? slot : {});
            });
          }
        } else if (typeof v === typeof d && (typeof v !== 'number' || isFinite(v))) out[k] = v;
      });
    }
    function choice(key, list) { if (list.indexOf(out[key]) < 0) out[key] = PATCH[key]; }
    function number(key, lo, hi, integer) {
      out[key] = clamp(integer ? Math.round(out[key]) : out[key], lo, hi);
    }
    choice('oscillatorMode', ['vco', 'wavetable']);
    choice('waveform', ['saw', 'noise', 'sine', 'triangle', 'square']);
    choice('filter', ['lowpass', 'highpass', 'bandpass']);
    choice('wavetable', ['basic', 'harmonic', 'formant', 'metallic', 'vocal', 'digital']);
    choice('unison', [1, 2, 4]);
    choice('subWaveform', ['sine', 'triangle', 'square']);
    choice('subOctave', [-1, -2]);
    number('oscillatorOctave', -2, 2, true);
    number('detune', -100, 100);
    number('pulseWidth', 0.05, 0.95);
    ['position', 'warp', 'spread', 'subLevel'].forEach(function (key) { number(key, 0, 1); });
    number('fmDepth', 0, 10);
    return out;
  }

  // The chords use NCLanguage.parse().bpm. Reuse that result, including
  // q90, tempo 90, tempo=90, quarter notes = 90, and a BPM word winning
  // over an earlier form. This file still reads "90 BPM" and "quarter = 90"
  // when the parser is not loaded.
  function bpmOf(text) {
    var lang = root.NCLanguage;
    if (lang && typeof lang.parse === 'function') {
      try {
        var parsed = lang.parse(text || '', {});
        return parsed && parsed.bpm > 0 ? parsed.bpm : 0;
      } catch (e) {}
    }
    var m = /(\d+(?:\.\d+)?)\s*BPM\b/i.exec(text || '') || /quarter(?:\s+note)?\s*[=≈]\s*(\d+(?:\.\d+)?)/i.exec(text || '');
    return m && +m[1] > 0 ? +m[1] : 0;
  }
  // `fm 3` and `fm3` on the notes statement set the depth. `fm t2 3` and
  // `fm "words" 3` name a source, so a non-number after fm is left in place.
  function fmDepthOf(rest) {
    var depth = null;
    var cleaned = String(rest || '').replace(/(^|[\s,);])fm\s*(\d+(?:\.\d+)?)(?=$|[\s,);])/gi, function (_, lead, num) {
      if (depth == null) depth = clamp(+num, 0, 10);
      return lead;
    });
    return { rest: cleaned, fmDepth: depth };
  }
  function beatsPerBar(text) {
    var m = /\b(\d+)\s*\/\s*(2|4|8)\b/.exec(text || '');
    if (!m) return 4;
    return barBeats(m[1] + '/' + m[2]);
  }
  var ORDER_WORDS = {
    up: 'up', down: 'down', 'up-down': 'up and down', 'down-up': 'down and up',
    'up-down-repeat': 'up and down, repeating the ends',
    'outside-in': 'outside in', 'inside-out': 'inside out',
    pendulum: 'pendulum', random: 'random', 'as-played': 'as played',
    off: 'the chord together', 'blossom-up': 'blossom up', 'blossom-down': 'blossom down',
    'low-and-up': 'low pedal, others up', 'low-and-down': 'low pedal, others down',
    'hi-and-up': 'high pedal, others up', 'hi-and-down': 'high pedal, others down',
    walk: 'walk'
  };
  function orderWords(arp) {
    if (arp.order === 'euclidean') {
      var e = arp.euclid || (root.NCChords && NCChords.euclidOf ? NCChords.euclidOf(null) : { hits: 5, steps: 8, rotate: 0 });
      return 'euclidean ' + e.hits + ' of ' + e.steps + (e.rotate ? ', turned ' + e.rotate : '');
    }
    return ORDER_WORDS[arp.order] || arp.order || 'up';
  }
  var RATE_WORDS = {
    '4ths': 'quarter notes', '8ths': 'eighth notes', '16ths': 'sixteenth notes', '32nds': 'thirty-second notes',
    '4t': 'quarter-note triplets', '8t': 'eighth-note triplets', '16t': 'sixteenth-note triplets', '32t': 'thirty-second-note triplets'
  };
  function trimNum(n) {
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return String(+n.toFixed(3)).replace(/0+$/, '').replace(/\.$/, '');
  }
  function arpWords(arp) {
    if (!arp) return '';
    var oct = arp.octaves || 1;
    var bits = [
      arp.chord || 'the chord line',
      orderWords(arp),
      RATE_WORDS[arp.rate] || arp.rate || 'sixteenth notes',
      oct === 1 ? '1 octave' : oct + ' octaves',
      arp.spread || 'compact'
    ];
    if (arp.inversion > 0) bits.push('inversion ' + arp.inversion);
    if (arp.bars != null) bits.push(trimNum(arp.bars) + (arp.bars === 1 ? ' bar' : ' bars'));
    else if (arp.beats != null) bits.push(trimNum(arp.beats) + (arp.beats === 1 ? ' beat' : ' beats'));
    if (arp.fmDepth > 0) bits.push('FM depth ' + (Math.round(arp.fmDepth * 100) / 100));
    return bits.join(', ');
  }
  function spellMidi(midi) {
    var names = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    var pc = ((midi % 12) + 12) % 12;
    return names[pc] + (Math.floor(midi / 12) - 1);
  }
  function barBeats(meter) {
    if (root.NCLanguage && NCLanguage.beatsInBar) return NCLanguage.beatsInBar(meter);
    var m = /^(\d+)\/(2|4|8)$/.exec(meter || '');
    return m ? +m[1] * (4 / +m[2]) : 4;
  }
  function parsedOf(text) {
    var lang = root.NCLanguage;
    if (!lang || typeof lang.parse !== 'function') return null;
    var known = root.NCChords && root.NCChords.compositionKnown;
    try { return lang.parse(text || '', { known: function (q) { return !!(known && known(q)); } }); }
    catch (e) { return null; }
  }
  // Notes / n, and an arp statement. Pitches follow notes or n, with an
  // optional (beats) or (bars|). @name on that statement is a written
  // instrument, so the synth stays out. `fm <depth>` is FM, not a pitch.
  // The arp is the first `arp` statement. With a chord it plays that chord;
  // with none it follows the composition's chord line.
  function readLine(text) {
    var parsed = parsedOf(text);
    var bpm = parsed ? (parsed.bpm > 0 ? parsed.bpm : 0) : bpmOf(text);
    var bar = parsed && parsed.meter ? barBeats(parsed.meter) : beatsPerBar(text);
    var found = null;
    var srcNotes = String(text || '');
    var spans = parsed && parsed.trackSpans ? parsed.trackSpans : [];
    function covered(idx) {
      var s;
      for (s = 0; s < spans.length; s++) {
        if (idx >= spans[s].start && idx < spans[s].end) return true;
      }
      return false;
    }
    var from = 0;
    while (from <= srcNotes.length && !found) {
      var rel = srcNotes.slice(from).search(/[\n;]/);
      var stmt = rel < 0 ? srcNotes.slice(from) : srcNotes.slice(from, from + rel);
      var abs = from;
      from = rel < 0 ? srcNotes.length + 1 : from + rel + 1;
      if (!stmt || covered(abs)) continue;
      var km = /(?:^|\s)(?:notes|n)\s+(.+)$/i.exec(stmt);
      if (!km || covered(abs + km.index)) continue;
      var taken = fmDepthOf(km[1]);
      var rest = taken.rest, re = /([A-Ga-g])(#|b)?(-?\d+)(?:\((\d+(?:\.\d+)?)(\|)?\))?/g, tok, notes = [];
      while ((tok = re.exec(rest))) {
        var beats = tok[4] ? +tok[4] : 1;
        if (!(beats > 0)) beats = 1;
        if (tok[5]) beats *= bar;
        var name = spell(tok[1] + (tok[2] || '') + tok[3]);
        if (midiOf(name) == null) continue;
        notes.push({pitch: name, beats: beats});
      }
      if (!notes.length) continue;
      var inst = /@([A-Za-z][\w-]*)/.exec(stmt);
      var instName = inst ? inst[1].toLowerCase() : '';
      if (instName === 'synth') instName = '';
      found = {
        notes: notes,
        instrument: instName,
        bpm: bpm,
        fmDepth: taken.fmDepth,
        notesLabel: notes.map(function (n) { return n.pitch; }).join(' '),
        label: notes.map(function (n) { return n.pitch; }).join(' ')
      };
    }
    var arp = parsed && parsed.arp && parsed.arp.length ? parsed.arp[0] : null;
    if (!found && !arp) return null;
    if (!found) {
      found = { notes: [], instrument: '', bpm: bpm, fmDepth: null, notesLabel: '', label: '' };
    }
    found.meter = parsed && parsed.meter ? parsed.meter : '4/4';
    found.harmony = parsed && parsed.played ? parsed.played : [];
    found.unmapped = parsed && parsed.unmapped ? parsed.unmapped.slice() : [];
    if (arp) {
      found.arp = arp;
      found.arpInstrument = arp.instrument || '';
      found.arpWords = arpWords(arp);
      var playArp = !arp.instrument;
      if (playArp && arp.fmDepth != null) found.fmDepth = arp.fmDepth;
      if (playArp) found.label = found.notesLabel ? (found.notesLabel + ' · ' + found.arpWords) : found.arpWords;
    } else {
      found.arp = null;
      found.arpInstrument = '';
      found.arpWords = '';
    }
    return found;
  }
  function scheduleArp(line, bpm, seed, out) {
    var lib = root.NCChords;
    var arp = line.arp;
    if (!lib || !arp || arp.instrument) return;
    var beat = 60 / bpm;
    var step = arp.step > 0 ? arp.step : 0.25;
    var qpb = barBeats(line.meter);
    var rng = arp.order === 'random' ? mulberry32(seed == null ? 1 : seed) : null;
    var euclid = arp.order === 'euclidean' && lib.euclidOf ? lib.euclidOf(arp.euclid) : null;
    function windowBeats(beats, bars) {
      if (beats != null) return beats;
      if (bars != null) return bars * qpb;
      return qpb;
    }
    function play(id, rootMidi, bass, startBeat, total) {
      if (!id || !(total > 0)) return;
      var pool;
      try { pool = lib.arpeggioPool(lib.voicedChord(rootMidi, id, arp.inversion, arp.spread, bass), arp.octaves); }
      catch (e) { return; }
      if (!pool.length) return;
      // Off is the chord itself (no octave span) on every step, as in ASTRID.
      var chord = null;
      if (arp.order === 'off') {
        try { chord = lib.voicedChord(rootMidi, id, arp.inversion, arp.spread, bass); }
        catch (e) { return; }
      }
      var seq = arp.order === 'random' || chord ? null : lib.arpeggioSequence(pool, arp.order);
      if (seq && !seq.length) return;
      var left = total, at = startBeat, i = 0;
      while (left > 1e-8 && i < 20000) {
        var take = Math.min(step, left);
        var picked = [];
        if (chord) picked = chord;
        else if (!seq) picked = [pool[Math.floor(rng() * pool.length)]];
        else if (lib.arpIndex && (arp.order === 'walk' || euclid)) {
          var k = lib.arpIndex(arp.order, seq.length, i, euclid);
          if (k != null) picked = [seq[k]];
        } else picked = [seq[i % seq.length]];
        picked.forEach(function (midi) {
          out.push({
            pitch: spellMidi(midi), midi: midi, velocity: 0.82,
            start: at * beat, length: Math.max(0.02, take * beat)
          });
        });
        at += take;
        left -= take;
        i++;
      }
    }
    if (arp.chord) {
      var rootMidi = arp.rootPc == null ? 60 : midiAt(arp.rootPc, arp.rootOctave);
      play(arp.chordId, rootMidi, arp.bass, 0, windowBeats(arp.beats, arp.bars));
      return;
    }
    var cursor = 0;
    (line.harmony || []).forEach(function (ev) {
      var beats = ev.beats;
      if (ev.bars != null) beats = ev.bars * qpb;
      if (beats == null) beats = ev.kind === 'rest' ? 0 : qpb;
      if (!(beats > 0)) return;
      if (ev.kind === 'chord') {
        var id = lib.idForSymbol(ev.symbol);
        play(id, chordRoot(ev.symbol, ev.octave), ev.bass, cursor, beats);
      }
      cursor += beats;
    });
  }
  function scheduleChordEvents(played, bpm, meter) {
    var lib = root.NCChords;
    if (!lib || !lib.voicedChord) return [];
    var beat = 60 / (bpm > 0 ? bpm : 96), qpb = barBeats(meter), t = 0, out = [];
    (played || []).forEach(function (ev) {
      var beats = ev.beats;
      if (ev.bars != null) beats = ev.bars * qpb;
      if (beats == null) beats = ev.kind === 'rest' ? 0 : qpb;
      if (!(beats > 0)) return;
      if (ev.kind === 'chord') {
        var id = lib.idForSymbol ? lib.idForSymbol(ev.symbol) : null;
        var rootMidi = chordRoot(ev.symbol, ev.octave);
        var midis = [];
        try { midis = id ? lib.voicedChord(rootMidi, id, 0, 'compact', ev.bass) : []; }
        catch (e) { midis = []; }
        var len = Math.max(0.02, beats * beat);
        midis.forEach(function (midi) {
          out.push({ pitch: spellMidi(midi), midi: midi, velocity: 0.64, start: t, length: len });
        });
      }
      t += beats * beat;
    });
    return out;
  }
  // One voice for one explicit track. Notes and an arp on different tracks
  // do not share FM. `@synth` chords use the catalog voicing, held for the
  // written length. `@name` other than synth keeps that voice out.
  function voiceOf(track, parsed, index) {
    if (!track) return null;
    parsed = parsed || {};
    var bpm = parsed.bpm > 0 ? parsed.bpm : 96;
    var meter = parsed.meter || '4/4';
    var bar = barBeats(meter);
    var fm = track.fmDepth;
    var seed = ((parsed.seed == null ? 1 : parsed.seed) + (index || 0)) >>> 0;
    var events = [], label = track.label || '';
    if (track.kind === 'notes') {
      var got = { notes: [], fmDepth: null, instrument: '' };
      String(track.source || '').split(/[\n;]+/).forEach(function (stmt) {
        var km = /(?:^|\s)(?:notes|n)\s+(.+)$/i.exec(stmt);
        var body = km ? km[1] : '';
        if (!km) {
          var bits = String(stmt || '').trim().split(/\s+/).filter(Boolean);
          var pitchLine = bits.length && bits.some(function (p) {
            return /^[A-Ga-g][#b]?(-1|[0-9])(?:\(\d+(?:\.\d+)?\|?\))?$/.test(p);
          }) && bits.every(function (p) {
            return /^@[A-Za-z][\w-]*$/.test(p) || /^[A-Ga-g][#b]?(-1|[0-9])(?:\(\d+(?:\.\d+)?\|?\))?$/.test(p) || /^fm$/i.test(p) || /^fm\d+(?:\.\d+)?$/i.test(p) || /^\d+(?:\.\d+)?$/.test(p);
          });
          if (!pitchLine) return;
          body = bits.join(' ');
        }
        var taken = fmDepthOf(body);
        if (taken.fmDepth != null) got.fmDepth = taken.fmDepth;
        var inst = /@([A-Za-z][\w-]*)/.exec(stmt);
        if (inst) got.instrument = inst[1].toLowerCase();
        var rest = taken.rest, re = /([A-Ga-g])(#|b)?(-?\d+)(?:\((\d+(?:\.\d+)?)(\|)?\))?/g, tok;
        while ((tok = re.exec(rest))) {
          var beats = tok[4] ? +tok[4] : 1;
          if (!(beats > 0)) beats = 1;
          if (tok[5]) beats *= bar;
          var name = spell(tok[1] + (tok[2] || '') + tok[3]);
          if (midiOf(name) == null) continue;
          got.notes.push({ pitch: name, beats: beats });
        }
      });
      if (got.instrument && got.instrument !== 'synth') return null;
      if (fm == null) fm = got.fmDepth;
      var beat = 60 / bpm, t = 0;
      got.notes.forEach(function (n) {
        var len = Math.max(0.02, n.beats * beat);
        events.push({ pitch: n.pitch, midi: midiOf(n.pitch), velocity: 0.82, start: t, length: len });
        t += len;
      });
      label = (track.label ? track.label + ' ' : '') + got.notes.map(function (n) { return n.pitch; }).join(' ');
    } else if (track.kind === 'arp' && track.arp) {
      if (track.arp.instrument && track.arp.instrument !== 'synth') return null;
      var arp = track.arp.instrument === 'synth' ? Object.assign({}, track.arp, { instrument: '' }) : track.arp;
      var harmony = track.harmony && track.harmony.length ? track.harmony : (parsed.played || []);
      events = scheduleLine({ notes: [], arp: arp, bpm: bpm, meter: meter, harmony: harmony }, fm == null ? null : { fmDepth: fm }, seed);
      label = (track.label ? track.label + ' ' : '') + (arpWords(arp) || 'arp');
    } else if (track.kind === 'chords' && track.instrument === 'synth') {
      events = scheduleChordEvents(track.played, bpm, meter);
      label = (track.label ? track.label + ' ' : '') + '@synth';
    } else return null;
    if (!events.length) return null;
    return { events: events, notes: events, fmDepth: fm, bpm: bpm, meter: meter, label: label, instrument: '', seed: seed, arp: null };
  }
  function chordVoice(parsed, index) {
    if (!parsed || !parsed.synth) return null;
    return voiceOf({ kind: 'chords', instrument: 'synth', played: parsed.played || [], label: '', n: 0 }, parsed, index || 0);
  }
  function scheduleLine(line, settings, seed) {
    if (!line || (!line.notes && !line.arp)) return [];
    var s = mergeSettings(settings);
    var bpm = line.bpm || s.tempo || 96;
    var beat = 60 / bpm, t = 0, out = [];
    (line.notes || []).forEach(function (n) {
      var len = Math.max(0.02, n.beats * beat);
      out.push({pitch: n.pitch, midi: midiOf(n.pitch), velocity: n.velocity == null ? 0.82 : clamp(+n.velocity, 0, 1), start: t, length: len});
      t += len;
    });
    if (line.arp) scheduleArp(line, bpm, seed, out);
    return out;
  }

  function renderNotes(notes, settings, seed) {
    var engine = root.NCSynthEngine;
    if (!engine || typeof engine.renderNotes !== 'function') {
      return Promise.reject(new Error('NC Synth engine is not loaded'));
    }
    return engine.renderNotes(notes, mergeSettings(settings), seed >>> 0);
  }

  function describe(settings, seed) {
    var s = mergeSettings(settings);
    var wave = s.waveform;
    var sub = s.subEnabled && s.subLevel > 0 ? s.subWaveform + ' sub ' + s.subOctave : 'no sub';
    var depth = Math.round(s.fmDepth * 100) / 100;
    var bits = [wave, sub, (FILTERS[s.filter] || s.filter) + ' ' + Math.round(s.cutoff) + ' Hz'];
    if (depth > 0) bits.push('FM depth ' + depth);
    bits.push('seed ' + ((seed >>> 0) || 0), 'code MIT');
    if (s.oscillatorMode === 'wavetable') bits.push('wavetable left out');
    return bits.join(', ');
  }
  function wavBlob(buffer) {
    var channels = buffer.numberOfChannels, rate = buffer.sampleRate, n = buffer.length;
    var dataLen = n * channels * 2, ab = new ArrayBuffer(44 + dataLen), v = new DataView(ab), k;
    function str(at, s) { for (k = 0; k < s.length; k++) v.setUint8(at + k, s.charCodeAt(k)); }
    str(0, 'RIFF'); v.setUint32(4, 36 + dataLen, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, channels, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * channels * 2, true);
    v.setUint16(32, channels * 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, dataLen, true);
    var chans = [], c, i, x, o = 44;
    for (c = 0; c < channels; c++) chans.push(buffer.getChannelData(c));
    for (i = 0; i < n; i++) {
      for (c = 0; c < channels; c++) {
        x = chans[c][i];
        if (x > 1) x = 1; else if (x < -1) x = -1;
        v.setInt16(o, x < 0 ? x * 0x8000 : x * 0x7FFF, true);
        o += 2;
      }
    }
    return new Blob([ab], {type: 'audio/wav'});
  }

  root.NCSynth = {
    CREDIT: CREDIT,
    CODE_LICENSE: 'MIT',
    OUTPUT_LICENSE: 'CC-BY-SA-4.0',
    mergeSettings: mergeSettings,
    readLine: readLine,
    scheduleLine: scheduleLine,
    scheduleChordEvents: scheduleChordEvents,
    voiceOf: voiceOf,
    chordVoice: chordVoice,
    arpWords: arpWords,
    renderNotes: renderNotes,
    describe: describe,
    wavBlob: wavBlob,
    midiOf: midiOf,
    chordRoot: chordRoot,
    mulberry32: mulberry32
  };
})(typeof window !== 'undefined' ? window : globalThis);
