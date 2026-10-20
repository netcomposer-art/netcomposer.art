// Assembly plan v1. Organic durations are the same rule as ncperf.take.chord_slots.
// The reference rows live in ncperf/data/assembly-vectors.json (nc-performer ffd68ce).
(function (root) {
  'use strict';
  var N = 624, M = 397;

  function u32(n) { return n >>> 0; }

  function PyRandom(seed) {
    var mt = new Uint32Array(N), index = N;

    function initGen(s) {
      var mti;
      mt[0] = u32(s);
      for (mti = 1; mti < N; mti++) {
        mt[mti] = u32(Math.imul(1812433253, mt[mti - 1] ^ (mt[mti - 1] >>> 30)) + mti);
      }
      index = N;
    }
    function initByArray(key) {
      var i = 1, j = 0, k, n = key.length;
      initGen(19650218);
      for (k = N > n ? N : n; k; k--) {
        mt[i] = u32((mt[i] ^ u32(Math.imul(mt[i - 1] ^ (mt[i - 1] >>> 30), 1664525))) + key[j] + j);
        i++; j++;
        if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
        if (j >= n) j = 0;
      }
      for (k = N - 1; k; k--) {
        mt[i] = u32((mt[i] ^ u32(Math.imul(mt[i - 1] ^ (mt[i - 1] >>> 30), 1566083941))) - i);
        i++;
        if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
      }
      mt[0] = 0x80000000;
    }
    function seedInt(n) {
      n = Math.floor(Math.abs(+n)) || 0;
      if (!n) { initByArray([0]); return; }
      var bits = Math.floor(Math.log2(n)) + 1;
      var words = Math.floor((bits - 1) / 32) + 1, key = [], x = n, w;
      for (w = 0; w < words; w++) {
        key.push(u32(x % 4294967296));
        x = Math.floor(x / 4294967296);
      }
      initByArray(key);
    }
    function twist() {
      var y, i;
      for (i = 0; i < N - M; i++) {
        y = (mt[i] & 0x80000000) | (mt[i + 1] & 0x7fffffff);
        mt[i] = mt[i + M] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0);
      }
      for (; i < N - 1; i++) {
        y = (mt[i] & 0x80000000) | (mt[i + 1] & 0x7fffffff);
        mt[i] = mt[i + (M - N)] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0);
      }
      y = (mt[N - 1] & 0x80000000) | (mt[0] & 0x7fffffff);
      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0);
      index = 0;
    }
    function nextU32() {
      if (index >= N) twist();
      var y = mt[index++];
      y = u32(y ^ (y >>> 11));
      y = u32(y ^ ((y << 7) & 0x9d2c5680));
      y = u32(y ^ ((y << 15) & 0xefc60000));
      y = u32(y ^ (y >>> 18));
      return y;
    }
    seedInt(seed);
    return {
      random: function () {
        var a = nextU32() >>> 5, b = nextU32() >>> 6;
        return (a * 67108864 + b) * (1 / 9007199254740992);
      },
      uniform: function (a, b) { return a + (b - a) * this.random(); },
      randbelow: function (n) {
        var k = Math.floor(Math.log2(n)) + 1, r = nextU32() >>> (32 - k);
        while (r >= n) r = nextU32() >>> (32 - k);
        return r;
      },
      choice: function (seq) { return seq[this.randbelow(seq.length)]; },
      randrange: function (stop) { return this.randbelow(stop); }
    };
  }

  function pyRound(value, digits) {
    var p = Math.pow(10, digits), x = value * p, sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var base = Math.floor(x), frac = x - base, out;
    if (Math.abs(frac - 0.5) < 1e-8) out = (base % 2 === 0) ? base : base + 1;
    else out = Math.round(x);
    return sign * out / p;
  }

  function durationCv(durs) {
    if (!durs || durs.length < 2) return 0;
    var mean = 0, i, v = 0;
    for (i = 0; i < durs.length; i++) mean += +durs[i];
    mean /= durs.length;
    if (!(mean > 0)) return 0;
    for (i = 0; i < durs.length; i++) v += (+durs[i] - mean) * (+durs[i] - mean);
    return pyRound(Math.sqrt(v / durs.length) / mean, 3);
  }

  function looksAlternating(durs) {
    if (!durs || durs.length < 4) return false;
    function tight(group) {
      var mid = 0, i, lo = group[0], hi = group[0];
      for (i = 0; i < group.length; i++) {
        mid += group[i];
        if (group[i] < lo) lo = group[i];
        if (group[i] > hi) hi = group[i];
      }
      mid /= group.length;
      return mid > 0 && (hi - lo) / mid < 0.12;
    }
    var evens = [], odds = [], i, se = 0, so = 0, all = 0;
    for (i = 0; i < durs.length; i++) {
      all += durs[i];
      if (i % 2) { odds.push(durs[i]); so += durs[i]; }
      else { evens.push(durs[i]); se += durs[i]; }
    }
    if (!tight(evens) || !tight(odds)) return false;
    return Math.abs(se / evens.length - so / odds.length) > 0.2 * (all / durs.length);
  }

  function freeWeights(n, rng) {
    if (n <= 1) return [1];
    var weights = [], i = 0, previous = '', kinds = ['rush', 'hold', 'unwind', 'swell', 'plain'];
    var bag = [0.4, 0.58, 0.77, 1.05, 1.38, 1.72, 2.15, 2.55];
    while (i < n) {
      var left = n - i, kind, span, j, start, mid, holdAt, choices = [];
      if (left === 1) { weights.push(rng.uniform(0.55, 1.9)); break; }
      for (j = 0; j < kinds.length; j++) if (kinds[j] !== previous) choices.push(kinds[j]);
      if (!choices.length) choices = kinds;
      kind = rng.choice(choices);
      previous = kind;
      span = Math.min(left, rng.choice([2, 3, 3, 4, 5].slice(0, left)));
      if (kind === 'hold') {
        holdAt = rng.randrange(span);
        for (j = 0; j < span; j++) weights.push(j === holdAt ? rng.uniform(1.85, 2.7) : rng.uniform(0.36, 0.72));
      } else if (kind === 'rush') {
        start = rng.uniform(1.25, 1.8);
        for (j = 0; j < span; j++) weights.push(start * Math.pow(0.74, j) * rng.uniform(0.9, 1.08));
      } else if (kind === 'unwind') {
        start = rng.uniform(0.4, 0.68);
        for (j = 0; j < span; j++) weights.push(start * Math.pow(1.34, j) * rng.uniform(0.92, 1.08));
      } else if (kind === 'swell') {
        mid = Math.floor(span / 2);
        for (j = 0; j < span; j++) weights.push(j === mid ? rng.uniform(1.45, 2.15) : rng.uniform(0.48, 0.86));
      } else {
        for (j = 0; j < span; j++) weights.push(rng.choice(bag) * rng.uniform(0.88, 1.12));
      }
      i += span;
    }
    weights = weights.slice(0, n);
    if (looksAlternating(weights) || durationCv(weights) < 0.22) {
      weights[rng.randrange(n)] *= rng.uniform(1.7, 2.4);
      weights[rng.randrange(n)] *= rng.uniform(0.35, 0.6);
    }
    return weights;
  }

  function unstick(durs, total, rng) {
    if (durs.length < 2 || !(total > 0)) return durs;
    var out = durs.map(function (d) { return Math.max(0.2, +d); });
    var i = rng.randrange(out.length);
    var j = (i + 1 + rng.randrange(out.length - 1)) % out.length;
    var sum = 0, k, scale, head;
    out[i] *= rng.uniform(1.65, 2.3);
    out[j] *= rng.uniform(0.38, 0.62);
    for (k = 0; k < out.length; k++) sum += out[k];
    scale = total / sum;
    for (k = 0; k < out.length; k++) out[k] *= scale;
    sum = 0;
    for (k = 0; k < out.length; k++) sum += out[k];
    out[out.length - 1] += total - sum;
    if (out[out.length - 1] < 0.4 && out.length > 1) {
      out[out.length - 1] = 0.4;
      head = 0;
      for (k = 0; k < out.length - 1; k++) head += out[k];
      head = head || 1;
      scale = (total - 0.4) / head;
      for (k = 0; k < out.length - 1; k++) out[k] *= scale;
    }
    return out.map(function (w) { return pyRound(Math.max(0.1, w), 3); });
  }

  function fitLengths(weights, total) {
    var n = weights.length, i, mean, lo, hi, rawSum, raw, out, spare, room, share, guard;
    if (!n) return [];
    if (n === 1) return [pyRound(total, 3)];
    mean = total / n;
    lo = Math.min(mean * 0.92, Math.max(1.25, mean * 0.28));
    hi = Math.max(mean * 1.08, Math.min(total * 0.58, mean * 2.85));
    if (n * lo > total) lo = total / n * 0.9;
    if (n * hi < total) hi = total / n * 1.05;
    rawSum = 0;
    for (i = 0; i < n; i++) rawSum += weights[i];
    rawSum = rawSum || 1;
    raw = weights.map(function (w) { return (w / rawSum) * total; });
    out = raw.map(function (w) { return Math.min(hi, Math.max(lo, w)); });
    for (guard = 0; guard < 8; guard++) {
      spare = total;
      for (i = 0; i < n; i++) spare -= out[i];
      if (Math.abs(spare) < 0.02) break;
      room = [];
      for (i = 0; i < n; i++) {
        if (spare > 0 && out[i] < hi - 0.01) room.push(i);
        if (spare <= 0 && out[i] > lo + 0.01) room.push(i);
      }
      if (!room.length) break;
      share = spare / room.length;
      for (i = 0; i < room.length; i++) out[room[i]] = Math.min(hi, Math.max(lo, out[room[i]] + share));
    }
    spare = total;
    for (i = 0; i < n; i++) spare -= out[i];
    out[n - 1] = Math.max(0.4, out[n - 1] + spare);
    return out.map(function (w) { return pyRound(w, 3); });
  }

  function pulseLengths(n, total, broaden) {
    var durs, k, factors, head, weight, scale, sum, j, headDur;
    if (n <= 0) return [];
    if (broaden <= 0 || n < 3) {
      durs = [];
      for (j = 0; j < n; j++) durs.push(total / n);
    } else {
      k = Math.min(broaden, n - 1);
      factors = [];
      for (j = 0; j < k; j++) factors.push(1.12 + 0.16 * j);
      head = n - k;
      weight = [];
      for (j = 0; j < head; j++) weight.push(1);
      weight = weight.concat(factors);
      sum = 0;
      for (j = 0; j < weight.length; j++) sum += weight[j];
      scale = total / sum;
      durs = weight.map(function (w) { return w * scale; });
      headDur = durs[0];
      for (j = 0; j < head; j++) durs[j] = headDur;
      sum = 0;
      for (j = 0; j < durs.length; j++) sum += durs[j];
      durs[durs.length - 1] += total - sum;
    }
    return durs.map(function (d) { return pyRound(d, 3); });
  }

  function chordSlots(sections, seed, pulse, broaden) {
    var slots = [], t = 0, last = sections.length - 1, si, section, count, seconds, rng, durs, sum, pass, dur;
    broaden = broaden || 0;
    for (si = 0; si < sections.length; si++) {
      section = sections[si];
      count = section.count != null ? section.count : section[0];
      seconds = section.seconds != null ? section.seconds : section[1];
      if (!(count > 0) || !(seconds > 0)) continue;
      rng = PyRandom((seed | 0) + 211 + si * 29);
      if (pulse) durs = pulseLengths(count, seconds, si === last ? broaden : 0);
      else {
        durs = fitLengths(freeWeights(count, rng), seconds);
        for (pass = 0; pass < 3; pass++) {
          if (durs.length < 2 || !(looksAlternating(durs) || durationCv(durs) < 0.22)) break;
          durs = unstick(durs, seconds, rng);
        }
      }
      if (durs.length) {
        sum = 0;
        for (pass = 0; pass < durs.length; pass++) sum += durs[pass];
        durs[durs.length - 1] = pyRound(durs[durs.length - 1] + (seconds - sum), 3);
      }
      for (pass = 0; pass < durs.length; pass++) {
        dur = durs[pass];
        slots.push({ t: pyRound(t, 3), dur: pyRound(dur, 3) });
        t = pyRound(t + dur, 3);
      }
    }
    return slots;
  }

  function slotsFromDurations(durs) {
    var slots = [], t = 0, i, dur;
    for (i = 0; i < durs.length; i++) {
      dur = +durs[i];
      slots.push({ t: pyRound(t, 3), dur: pyRound(dur, 3) });
      t = pyRound(t + dur, 3);
    }
    return slots;
  }

  var PULSE = /steady pulse|keep it even|\bsteady\b|\buniform\b|every downbeat|one chord per bar|even changes|\d+(?:\.\d+)?\s*(?:s|sec|seconds)\s+per\s+(?:chord|bar)|(?:each|every)\s+bar\s+(?:is\s+|lasts\s+)?\d/i;
  var BROADEN = /broadening over the last\s+(\w+|\d+)\s+bars/i;
  var BAR_WORDS = { two: 2, three: 3, four: 4, five: 5 };

  function statedPulse(words) { return PULSE.test(words || ''); }
  function broadenBars(words) {
    var text = words || '', match = text.match(BROADEN), raw;
    if (match) {
      raw = match[1].toLowerCase();
      if (/^\d+$/.test(raw)) return +raw;
      return BAR_WORDS[raw] || 3;
    }
    if (/last bar\b.{0,40}\b(held|ring)/i.test(text)) return 1;
    return 0;
  }
  function takeSeconds(text) {
    text = text || '';
    var bars = text.match(/(\d+)\s*bars?/i);
    var bpm = text.match(/(\d+(?:\.\d+)?)\s*BPM/i);
    var meter = text.match(/\b(\d)\/4\b/);
    var mins, secs;
    if (bars && bpm) return (+bars[1]) * ((meter ? +meter[1] : 4) * 60 / +bpm[1]);
    mins = text.match(/(\d+(?:\.\d+)?)\s*-?\s*(?:minutes?|mins?|m)\b(?:\s*(\d+)\s*(?:seconds?|secs?|s)\b)?/i);
    if (mins) return Math.max(20, Math.min(600, +mins[1] * 60 + +(mins[2] || 0)));
    secs = text.match(/(\d+(?:\.\d+)?)\s*(?:seconds?|secs?|s)\b/i);
    return secs ? Math.max(20, Math.min(600, +secs[1])) : 120;
  }

  root.NCAssembly = {
    chordSlots: chordSlots,
    durationCv: durationCv,
    looksAlternating: looksAlternating,
    slotsFromDurations: slotsFromDurations,
    statedPulse: statedPulse,
    broadenBars: broadenBars,
    takeSeconds: takeSeconds,
    pyRandom: PyRandom
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
