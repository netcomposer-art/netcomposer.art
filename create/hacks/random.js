// Musical randomness for the hack stack. Every value is in slider units (what the dials hold), drawn from a
// range that sounds good and stays safe, never the whole dial. Gains that raise the level are capped so a
// random stack does not jump in loudness. Seeded, so a seed gives the same stack every time.
(function () {
  'use strict';
  function rng(seed) {   // mulberry32
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function freshSeed() {
    try { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0]; } catch (e) { return (Date.now() ^ (Math.random() * 4294967296)) >>> 0; }
  }
  var LN = Math.log;
  function uni(r, lo, hi) { return lo + (hi - lo) * r(); }
  function int(r, lo, hi) { return Math.floor(uni(r, lo, hi + 1 - 1e-9)); }
  function logu(r, lo, hi) { return Math.exp(uni(r, LN(lo), LN(hi))); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  // Dial maps, the same as stack.js.
  var dial = {
    lowpass: function (hz) { return Math.round(100 * LN(hz / 20000) / LN(150 / 20000)); },
    highpass: function (hz) { return Math.max(1, Math.round(100 * LN(hz / 20) / LN(100))); },
    bandpass: function (hz) { return Math.round(100 * LN(hz / 100) / LN(80)); },
    bandQ: function (q) { return Math.round(100 * LN(q / 0.4) / LN(20)); },
    hpQ: function (q) { return Math.round(100 * LN(q / 0.7071) / LN(8 / 0.7071)); },
    eqQ: function (q) { return Math.round(100 * LN(q / 0.3) / LN(20)); },
    eqHz: function (hz) { return Math.round(100 * LN(hz / 200) / LN(25)); },
    ratio: function (x) { return Math.round(100 * LN(x) / LN(20)); }
  };
  var TIMINGS = ['0.5', '0.75', '1', '1.5'];   // 1/8, 1/8 dotted, 1/4, 1/4 dotted
  // The documented ranges (see RANGES below), as samplers returning {data-param: slider value}.
  var DRAW = {
    lowpass: function (r) { return { cutoff: clamp(dial.lowpass(logu(r, 300, 12000)), 1, 100) }; },
    highpass: function (r) { return { cutoff: clamp(dial.highpass(logu(r, 20, 600)), 1, 100), q: clamp(dial.hpQ(uni(r, 0.71, 1.6)), 0, 100) }; },
    bandpass: function (r) {
      return { centre_hz: clamp(dial.bandpass(logu(r, 200, 4000)), 0, 100), q: clamp(dial.bandQ(logu(r, 0.4, 1.2)), 0, 100), mix: int(r, 30, 80) };
    },
    delay: function (r) { return { delay_beats: TIMINGS[int(r, 0, TIMINGS.length - 1)], feedback: int(r, 10, 60), wet: int(r, 10, 45) }; },
    plate: function (r) { return { predelay: int(r, 0, 60), size: int(r, 20, 80), decay: int(r, 30, 80), damping: int(r, 0, 60), mix: int(r, 10, 50) }; },
    eq: function (r) {
      return { low_db: int(r, -9, 9), mid_db: int(r, -9, 9), mid_hz: clamp(dial.eqHz(logu(r, 250, 4000)), 0, 100), mid_q: clamp(dial.eqQ(logu(r, 0.6, 2)), 0, 100), high_db: int(r, -9, 9) };
    },
    drive: function (r) {
      var d = int(r, 2, 12);
      // The drive is level-matched at -12 dBFS, so it only lifts quiet parts; trim 1-3 dB to keep the level put.
      return { drive_db: d, output_db: -clamp(Math.round(d / 4), 1, 3), mix: int(r, 50, 100) };
    },
    compressor: function (r) {
      var thr = int(r, -30, -12), ratio = logu(r, 1.5, 4);
      // Makeup is about a third of what the compressor takes off a full-scale peak, at most 6 dB.
      var mk = clamp(Math.round(-thr * (1 - 1 / ratio) / 3), 0, 6);
      return { threshold_db: thr, ratio: clamp(dial.ratio(ratio), 0, 100), attack_ms: int(r, 5, 30), release_ms: int(r, 80, 400), makeup_db: mk };
    },
    width: function (r) { return { width: int(r, 60, 160), balance: int(r, -10, 10) }; }
  };
  var TYPES = ['lowpass', 'highpass', 'bandpass', 'delay', 'plate', 'eq', 'drive', 'compressor', 'width'];
  function params(type, r) { return DRAW[type] ? DRAW[type](r) : null; }
  // A random stack: 2..6 hacks (never over the cap), any types, duplicates allowed, random order.
  function stack(r, cap, min, max) {
    cap = cap || 10; min = min || 2; max = max || 6;
    if (max > cap) max = cap;
    var n = int(r, min, max), out = [], i, t;
    for (i = 0; i < n; i++) {
      t = TYPES[int(r, 0, TYPES.length - 1)];
      out.push({ type: t, dials: params(t, r) });
    }
    return out;
  }
  var RANGES = {
    lowpass: 'cutoff 300 Hz–12 kHz (log)',
    highpass: 'cutoff 20–600 Hz (log), resonance Q 0.71–1.6',
    bandpass: 'centre 200 Hz–4 kHz (log), Q 0.4–1.2, mix 30–80%',
    delay: 'timing 1/8, 1/8 dotted, 1/4 or 1/4 dotted; feedback 10–60%; wet 10–45%',
    plate: 'pre-delay 0–60 ms, size 20–80, decay 30–80%, damping 0–60%, mix 10–50%',
    eq: 'low/mid/high ±9 dB, mid at 250 Hz–4 kHz, mid Q 0.6–2',
    drive: 'drive 2–12 dB, output −1 to −3 dB, mix 50–100%',
    compressor: 'threshold −30 to −12 dB, ratio 1.5–4:1, attack 5–30 ms, release 80–400 ms, makeup ≤ 6 dB (a third of the peak reduction)',
    width: 'width 60–160%, balance ±10'
  };
  var api = { rng: rng, freshSeed: freshSeed, params: params, stack: stack, TYPES: TYPES, RANGES: RANGES };
  if (typeof window !== 'undefined') window.NCRandom = api;
  if (typeof globalThis !== 'undefined') globalThis.NCRandom = api;
})();
