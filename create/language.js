// The Composition language, first slice (Peter, 2026-10-22). Deterministic only:
// tempo, chords, durations, groups, loops, rests, comments, seeds, the
// starting hack values for Live, an arp statement, a notes line for the
// NC Synth, and a style statement. One reading, shared with nc-performer
// through tests/language-vectors.json. `style <name>` fills only what the
// writer left out, from styles/*.json (nc-style/1). The draw order is
// styles/SCHEMA.md. A written tempo, meter, key, chord or length always wins.
// Words this file does not recognise, and anything in quotes, stay words for
// the AI. Nothing here calls a model. An arp chord is not gathered: the synth
// plays it, unless the statement names @instrument.
//
// A duration belongs to its own chord. A chord with none plays its whole
// recording. loop(n) and xn repeat a group with the same recordings. A hack
// sets Live's starting chain for the whole piece. A ramp keeps the start value.
(function (root) {
  'use strict';
  var PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var SPELL = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  var ALIAS = {
    'maj': '', 'M': '', 'min': 'm', '-': 'm', 'mi': 'm', 'Δ7': 'maj7', 'Δ': 'maj7', 'M7': 'maj7', 'ma7': 'maj7', 'M9': 'maj9',
    'ø7': 'm7b5', 'ø': 'm7b5', '°7': 'dim7', 'o7': 'dim7', '°': 'dim', 'o': 'dim', '+': 'aug', '#5': 'aug',
    'mMaj7': 'm-maj7', 'mmaj7': 'm-maj7', 'm(maj7)': 'm-maj7', 'madd9': 'm-add9', 'm(add9)': 'm-add9',
    '6/9': '6-9', '69': '6-9', 'm6/9': 'm6-9', 'm69': 'm6-9', 'sus': 'sus4', '7sus': '7sus4', '9sus': '9sus4',
    'add2': 'add9', '2': 'sus2', '7+5': 'maj7#5'
  };
  var PRETTY = { '6-9': '6/9', 'm6-9': 'm6/9', 'm-add9': 'madd9' };
  var QCHAR = /^(?:maj|min|mi|m|M|dim|aug|sus|add|alt|ø|°|Δ|o|\+|-|[0-9]|#|b|\(|\)|\/(?=9))/;
  var HACK = {
    lowpass: 'lp', lp: 'lp', highpass: 'hp', hp: 'hp', bandpass: 'bp', bp: 'bp', eq: 'eq',
    delay: 'dl', dl: 'dl', reverb: 'rv', rv: 'rv', drive: 'dr', dr: 'dr', comp: 'cp', cp: 'cp', width: 'wd', wd: 'wd'
  };
  var HACK_TYPE = { lp: 'lowpass', hp: 'highpass', bp: 'bandpass', eq: 'eq', dl: 'delay', rv: 'plate', dr: 'drive', cp: 'compressor', wd: 'width' };
  var HACK_WORD = /^(?:lowpass|highpass|bandpass|reverb|delay|drive|width|comp|eq|lp|hp|bp|dl|rv|dr|cp|wd)$/i;
  var CHANGE = /\b(?:at|from)\s+bar\s+\d+\b[^.\n]{0,40}?\d+(?:\.\d+)?\s*BPM\b|\bbar\s+\d+\s*:\s*\d+(?:\.\d+)?\s*BPM\b/gi;

  function uncomment(text) {
    return String(text || '').replace(/"(?:[^"\\]|\\.)*"/g, ' ').replace(/(?:^|\n|\s)#[^\n]*/g, ' ');
  }
  function trimNum(n) {
    if (!(n > 0) && n !== 0) return '';
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return String(+n.toFixed(3)).replace(/0+$/, '').replace(/\.$/, '');
  }
  function round3(n) { return +(+n).toFixed(3); }
  function pcOf(n) {
    var r = n[0].toUpperCase();
    return (PC[r] + (n[1] === '#' ? 1 : n[1] === 'b' ? -1 : 0) + 12) % 12;
  }
  function pretty(sym) {
    var m = /^([A-G](?:#|b)?)(.*)$/.exec(sym || '');
    return m ? m[1] + (PRETTY[m[2]] || m[2]) : (sym || '');
  }
  function qpbOf(meter) {
    var m = /^(\d+)\/(2|4|8)$/.exec(meter || '');
    return m ? +m[1] * (4 / +m[2]) : 4;
  }
  function lpDial(hz) {
    if (!(hz > 0) || hz >= 20000) return 0;
    var v = Math.round(100 * Math.log(hz / 20000) / Math.log(150 / 20000));
    if (v < 1) v = 1;
    if (v > 100) v = 100;
    return v;
  }
  function hpDial(hz) {
    if (!(hz > 20)) return 0;
    var v = Math.round(100 * Math.log(hz / 20) / Math.log(100));
    if (v < 1) v = 1;
    if (v > 100) v = 100;
    return v;
  }
  function clamp(n, lo, hi) { return n < lo ? lo : n > hi ? hi : n; }
  // The number on a hack, turned into the dial the page already has.
  // Filters are Hz. The others are one amount: wet, mix, drive, threshold, width, mid.
  function hackParams(abbr, value) {
    if (abbr === 'lp') return { cutoff: lpDial(value) };
    if (abbr === 'hp') return { cutoff: hpDial(value) };
    if (abbr === 'bp') return { centre_hz: clamp(value, 100, 8000) };
    if (abbr === 'dl') return { wet: clamp(value, 0, 100) / 100 };
    if (abbr === 'rv') return { mix: clamp(value, 0, 100) / 100 };
    if (abbr === 'dr') return { drive_db: clamp(value, 0, 24) };
    if (abbr === 'cp') return { threshold_db: clamp(value, -60, 0) };
    if (abbr === 'wd') return { width: clamp(value, 0, 200) / 100 };
    if (abbr === 'eq') return { mid_db: clamp(Math.round(value), -18, 18) };
    return {};
  }
  function openingTempo(text) {
    var blank = uncomment(String(text || '')).replace(CHANGE, ' ');
    var bpm = /(\d+(?:\.\d+)?)\s*BPM\b/i.exec(blank);
    var tempo = /(?:^|[\s;,.(])tempo\s*(\d+(?:\.\d+)?)/i.exec(blank);
    var q = /(?:^|[\s;,.(])q\s*(\d+(?:\.\d+)?)/i.exec(blank);
    var quarter = /quarter(?:\s*note)?\s*[=≈]\s*(\d+(?:\.\d+)?)/i.exec(blank);
    if (bpm) return { bpm: +bpm[1], source: 'bpm' };
    var cands = [];
    if (tempo) cands.push({ i: tempo.index, bpm: +tempo[1], source: 'tempo' });
    if (q) cands.push({ i: q.index, bpm: +q[1], source: 'q' });
    if (quarter) cands.push({ i: quarter.index, bpm: +quarter[1], source: 'quarter' });
    cands.sort(function (a, b) { return a.i - b.i; });
    return cands.length ? cands[0] : null;
  }

  function tokenize(text) {
    var src = String(text || ''), n = src.length, i = 0, out = [];
    function brk(c, start) {
      if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === ',' || c === ';' || c === '[' || c === ']' || c === '|' || c === '"' || c === '·' || c === '.' || c === '!' || c === ':' || c === '=' || c === '≈' || c === '–' || c === '—' || c === '→' || c === '←' || c === '×' || c === '{' || c === '}' || c === '~' || c === '*' || c === '•') return true;
      if (c === '#' && start) return true;
      return false;
    }
    while (i < n) {
      var c = src[i];
      if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === ',' || c === ';' || c === '·' || c === '.' || c === '!' || c === '=' || c === '≈' || c === '–' || c === '—' || c === '→' || c === '←' || c === '×' || c === '{' || c === '}' || c === '~' || c === '*' || c === '•') { i++; continue; }
      if (c === '#' && brk(c, true)) { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '"') {
        var q0 = i + 1, q = '';
        i++;
        while (i < n && src[i] !== '"') { q += src[i]; i++; }
        var closed = i < n && src[i] === '"';
        if (closed) i++;
        out.push({ type: 'quote', text: q, end: i, closed: closed });
        continue;
      }
      if (c === '[') { out.push({ type: 'groupStart', end: ++i }); continue; }
      if (c === ']') { out.push({ type: 'groupEnd', end: ++i }); continue; }
      if (c === '|') { out.push({ type: 'bar', end: ++i }); continue; }
      if (c === ':') { out.push({ type: 'word', text: ':', end: ++i }); continue; }
      var start = i, word = '';
      while (i < n && !brk(src[i], false)) {
        // (8|) is one duration. The bar stays inside the parentheses.
        if (src[i] === '(') {
          word += src[i++];
          while (i < n && src[i] !== ')') word += src[i++];
          if (i < n && src[i] === ')') word += src[i++];
          continue;
        }
        word += src[i++];
      }
      if (word) out.push({ type: 'word', text: word, end: i, at: start });
    }
    return out;
  }

  function chordOf(token, inGroup, known) {
    var m = /^([A-Ga-g])([#b]?)([\s\S]*)$/.exec(token);
    if (!m) return null;
    var rest = m[3], q = '', k = 0;
    while (k < rest.length) {
      if (rest[k] === '(' && /^(\d+(?:\.\d+)?\|?|\?)/.test(rest.slice(k + 1))) break;
      if (rest[k] === '/' && rest[k + 1] !== '9' && /^\/[A-Ga-g][#b]?/.test(rest.slice(k))) break;
      var qm = QCHAR.exec(rest.slice(k));
      if (!qm) break;
      q += qm[0];
      k += qm[0].length;
    }
    var dur = null, open = false, paren = false;
    function takeDur(from) {
      var d = /^\((\d+(?:\.\d+)?)(\|)?\)/.exec(rest.slice(from));
      var o = /^\(\?\)/.exec(rest.slice(from));
      if (d) return { len: d[0].length, dur: { n: +d[1], bars: !!d[2] } };
      if (o) return { len: o[0].length, open: true };
      return null;
    }
    var got = takeDur(k);
    if (got) { k += got.len; dur = got.dur || null; open = !!got.open; paren = true; }
    var bass = null;
    if (k < rest.length && rest[k] === '/' && rest[k + 1] !== '9') {
      var bm = /^\/([A-Ga-g][#b]?)/.exec(rest.slice(k));
      if (bm) {
        bass = bm[1];
        k += bm[0].length;
        if (!paren) {
          got = takeDur(k);
          if (got) { k += got.len; dur = got.dur || null; open = !!got.open; paren = true; }
        }
      }
    }
    if (k !== rest.length) return null;
    var letter = m[1];
    var bareLower = letter === letter.toLowerCase() && letter !== letter.toUpperCase() && !q && !dur && !open && !bass;
    if (bareLower && !inGroup) return { guard: letter };
    var qual = q;
    if (!known(qual) && (qual in ALIAS)) qual = ALIAS[qual];
    if (!known(qual)) return { unknown: (letter.toUpperCase() + (m[2] || '')) + q + (bass ? '/' + bass : '') };
    var root = letter.toUpperCase() + (m[2] || '');
    return {
      kind: 'chord',
      symbol: SPELL[pcOf(root)] + qual,
      bass: bass ? pcOf(bass) : null,
      beats: dur && !dur.bars ? dur.n : null,
      bars: dur && dur.bars ? dur.n : null,
      openDur: open,
      paren: paren,
      lower: letter === letter.toLowerCase() && letter !== letter.toUpperCase(),
      bareA: letter === 'A' && !qual && !bass && !dur && !open
    };
  }

  // A pitch is a note name plus an octave, optional (beats) or (bars|).
  // C5 is a note. Cm is not. Out-of-range octaves are not notes.
  function pitchEcho(text) {
    var m = /^([A-Ga-g])(#|b)?(-?\d+)(?:\((\d+(?:\.\d+)?)(\|)?\))?$/.exec(text || '');
    if (!m) return '';
    var midi = (+m[3] + 1) * 12 + PC[m[1].toUpperCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    if (!(midi >= 0 && midi <= 127)) return '';
    var echo = m[1].toUpperCase() + (m[2] || '') + m[3];
    if (m[4] != null) echo += '(' + trimNum(+m[4]) + (m[5] ? '|' : '') + ')';
    return echo;
  }
  function renderChord(ev) {
    var s = pretty(ev.symbol);
    if (ev.bass != null) s += '/' + SPELL[ev.bass];
    if (ev.openDur) s += '(?)';
    else if (ev.bars != null) s += '(' + trimNum(ev.bars) + '|)';
    else if (ev.beats != null) s += '(' + trimNum(ev.beats) + ')';
    return s;
  }
  function renderRest(ev) {
    if (ev.openDur) return '_(?)';
    if (ev.bars != null) return '_(' + trimNum(ev.bars) + '|)';
    return '_(' + trimNum(ev.beats || 0) + ')';
  }
  function joinSyntax(items) {
    var out = '', prev = '';
    items.forEach(function (it) {
      if (!it || !it.text) return;
      if (out) {
        var mus = it.kind === 'chord' || it.kind === 'rest' || it.kind === 'group';
        var was = prev === 'chord' || prev === 'rest' || prev === 'group';
        out += (mus && was) ? ' ' : '; ';
      }
      out += it.text;
      prev = it.kind;
    });
    return out;
  }

  var STYLES = {};
  function registerStyle(obj) {
    if (!obj || obj.schema !== 'nc-style/1' || !obj.name) return false;
    if (!obj.meter || !obj.tempo || !obj.keys || !obj.phrase || !obj.loops) return false;
    STYLES[String(obj.name).toLowerCase()] = obj;
    return true;
  }
  // mulberry32, the same function Surprise me uses. Seed 0 stays 0.
  function styleRng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function wpick(r, rows) {
    var tot = 0, i, x;
    for (i = 0; i < rows.length; i++) tot += +rows[i][1];
    if (!(tot > 0)) return rows.length ? rows[0][0] : null;
    x = r() * tot;
    for (i = 0; i < rows.length; i++) {
      x -= +rows[i][1];
      if (x < 0) return rows[i][0];
    }
    return rows[rows.length - 1][0];
  }
  function stylePairs(list, value, weight) {
    var out = [], i;
    for (i = 0; i < list.length; i++) out.push([value(list[i]), weight(list[i])]);
    return out;
  }
  var ROMAN = /^(#|b)?(VII|VI|V|IV|III|II|I|vii|vi|v|iv|iii|ii|i)(maj7|ø7|ø|°7|°|7|6)?$/;
  var DEGREE = { I: 0, II: 2, III: 4, IV: 5, V: 7, VI: 9, VII: 11 };
  var FLIP_Q = { '': 'm', m: '', maj7: 'm7', m7: 'maj7', '6': 'm6', m6: '6', '7': 'm7', m7b5: 'm7b5', dim: 'dim', dim7: 'dim7' };
  function parseRoman(token) {
    var m = ROMAN.exec(token || '');
    if (!m) return null;
    return { acc: m[1] || '', num: m[2], suf: m[3] || '' };
  }
  function bareRoman(token) {
    var p = parseRoman(token);
    return p ? p.acc + p.num : token;
  }
  function romanQuality(p) {
    var up = p.num === p.num.toUpperCase();
    if (p.suf === 'maj7') return 'maj7';
    if (p.suf === '7') return up ? '7' : 'm7';
    if (p.suf === '6') return up ? '6' : 'm6';
    if (p.suf === 'ø' || p.suf === 'ø7') return 'm7b5';
    if (p.suf === '°7') return 'dim7';
    if (p.suf === '°') return 'dim';
    return up ? '' : 'm';
  }
  function realizeRoman(token, tonicPc) {
    var p = parseRoman(token);
    if (!p || !Object.prototype.hasOwnProperty.call(DEGREE, p.num.toUpperCase())) return null;
    var deg = DEGREE[p.num.toUpperCase()];
    if (p.acc === 'b') deg -= 1;
    else if (p.acc === '#') deg += 1;
    return SPELL[(tonicPc + deg + 120) % 12] + romanQuality(p);
  }
  function decorateSeventh(token, r, share) {
    if (!(r() < share)) return token;
    var p = parseRoman(token);
    if (!p || p.suf) return token;
    if (p.num !== p.num.toUpperCase()) return token + '7';
    var deg = DEGREE[p.num];
    if (p.acc === 'b') deg -= 1;
    else if (p.acc === '#') deg += 1;
    deg = (deg + 12) % 12;
    if (deg === 0 || deg === 3 || deg === 5 || deg === 8 || deg === 9) return token + 'maj7';
    return token + '7';
  }
  function shiftSymbol(sym, semis, modeChange) {
    var m = /^([A-G])(#|b)?([\s\S]*)$/.exec(sym || '');
    if (!m) return sym;
    var pc = (PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + semis + 120) % 12;
    var q = m[3] || '';
    if (modeChange && Object.prototype.hasOwnProperty.call(FLIP_Q, q)) q = FLIP_Q[q];
    return SPELL[pc] + q;
  }
  function snapBeats(n) {
    var x = Math.round(n * 1000) / 1000;
    return x > 0 ? x : 0;
  }
  // One seeded draw. See styles/SCHEMA.md for the order. Chords are null
  // when the writer already wrote some.
  function drawStyle(style, seed, ctx) {
    var r = styleRng(seed);
    var meter = wpick(r, stylePairs(style.meter, function (m) { return m.value; }, function (m) { return m.weight; }));
    var lo = style.tempo.sample[0], hi = style.tempo.sample[1];
    var tempo = lo + Math.floor(r() * (hi - lo + 1));
    var key = wpick(r, stylePairs(style.keys, function (k) { return k; }, function (k) { return k.weight; }));
    var meterUse = ctx.meterWritten ? ctx.meter : meter;
    var tempoUse = ctx.tempoWritten ? ctx.bpm : tempo;
    var tonic = ctx.keyWritten ? ctx.keyWritten.tonic : key.tonic;
    var mode = ctx.keyWritten ? ctx.keyWritten.mode : key.mode;
    var out = {
      meter: meterUse, tempo: tempoUse, tonic: tonic, mode: mode,
      chords: null, times: 1, modulation: null, clamped: false
    };
    if (ctx.chordsWritten) return out;
    var phraseBars = wpick(r, stylePairs(style.phrase.lengths, function (p) { return p.bars; }, function (p) { return p.weight; }));
    var qpb = qpbOf(meterUse);
    var target;
    if (ctx.length && ctx.length.unit === 'bar') target = ctx.length.amount * qpb;
    else if (ctx.length && (ctx.length.unit === 'second' || ctx.length.unit === 'minute')) {
      var sec = ctx.length.unit === 'minute' ? ctx.length.amount * 60 : ctx.length.amount;
      if (sec > 180) { sec = 180; out.clamped = true; }
      target = sec * tempoUse / 60;
    } else target = phraseBars * qpb;
    if (!(target > 0)) target = qpb;
    var maxBeats = tempoUse > 0 ? 180 * tempoUse / 60 : target;
    if (target > maxBeats) { target = maxBeats; out.clamped = true; }
    var useLoop = r() < 0.5;
    var loop = null, loopAt = 0, history = [];
    if (useLoop) loop = wpick(r, stylePairs(style.loops, function (item) { return item.roman; }, function (item) { return item.weight; }));
    var classes = stylePairs(style.chord_length.classes, function (c) { return c.bars * qpb; }, function (c) { return c.weight; });
    var vocab = stylePairs(style.chords, function (c) { return c.roman; }, function (c) { return c.weight; });
    var tonicPc = pcOf(tonic);
    function nextGram(hist) {
      var n, i, g, ok, k, cands, prefix;
      for (n = 4; n >= 2; n--) {
        if (hist.length < n - 1) continue;
        prefix = hist.slice(-(n - 1));
        cands = [];
        for (i = 0; i < style.transitions.length; i++) {
          g = style.transitions[i];
          if (!g.roman || g.roman.length !== n) continue;
          ok = true;
          for (k = 0; k < n - 1; k++) if (g.roman[k] !== prefix[k]) ok = false;
          if (ok) cands.push([g.roman[n - 1], g.weight]);
        }
        if (cands.length) return wpick(r, cands);
      }
      return wpick(r, vocab);
    }
    function nextToken() {
      var bare, tok;
      if (loop) {
        tok = loop[loopAt % loop.length];
        loopAt++;
        return tok;
      }
      bare = history.length ? nextGram(history) : wpick(r, vocab);
      history.push(bareRoman(bare));
      return decorateSeventh(bare, r, +style.seventh_share || 0);
    }
    var chords = [], left = target, guard = 0, beats, roman, symbol;
    while (left > 0.05 && guard++ < 512) {
      roman = nextToken();
      beats = wpick(r, classes);
      if (beats > left) beats = left;
      else if (left - beats > 0 && left - beats < 0.5) beats = left;
      beats = snapBeats(beats);
      if (!(beats > 0)) break;
      symbol = realizeRoman(roman, tonicPc) || SPELL[tonicPc];
      chords.push({ kind: 'chord', symbol: symbol, bass: null, beats: beats, bars: null, openDur: false });
      left -= beats;
    }
    if (chords.length >= 4 && style.modulation && r() < +style.modulation.share) {
      var move = wpick(r, stylePairs(style.modulation.moves, function (m) { return m; }, function (m) { return m.weight; }));
      var mid = Math.floor(chords.length / 2), ci;
      var destPc = (tonicPc + move.semitones + 120) % 12;
      var destMode = move.mode_change ? (mode === 'minor' ? 'major' : 'minor') : mode;
      for (ci = mid; ci < chords.length; ci++) chords[ci].symbol = shiftSymbol(chords[ci].symbol, move.semitones, !!move.mode_change);
      var sign = move.semitones > 0 ? '+' + move.semitones : (move.semitones === 0 ? '+0' : String(move.semitones));
      out.modulation = { text: sign + (move.mode_change ? ' (mode change)' : '') + ' to ' + SPELL[destPc] + ' ' + destMode };
    }
    if (!ctx.length) {
      var beatsSum = 0, last, over;
      chords.forEach(function (c) { beatsSum += c.beats; });
      var cap = tempoUse;
      while (beatsSum > cap + 1e-6 && chords.length > 1) {
        last = chords[chords.length - 1];
        over = beatsSum - cap;
        if (last.beats - over >= 1) {
          last.beats = snapBeats(last.beats - over);
          break;
        }
        beatsSum -= last.beats;
        chords.pop();
      }
      if (chords.length === 1 && chords[0].beats > cap) chords[0].beats = snapBeats(Math.max(1, cap));
      beatsSum = 0;
      chords.forEach(function (c) { beatsSum += c.beats; });
      var heard = tempoUse > 0 ? beatsSum * 60 / tempoUse : 0;
      if (heard > 0 && heard < 20) {
        var times = Math.ceil(20 / heard);
        if (times > 16) times = 16;
        if (times * heard > 60 + 1e-6) times = Math.max(1, Math.floor(60 / heard));
        if (!(times >= 1)) times = 1;
        out.times = times;
      }
    }
    out.chords = chords;
    return out;
  }

  function parse(text, opts) {
    opts = opts || {};
    var known = opts.known || function () { return false; };
    var src = String(text || '');
    var tokens = tokenize(src);
    var i = 0, syntax = [], words = [], notes = [], played = [], hacks = [];
    var seen = {}, flags = { paren: false, rest: false, loop: false, lower: false, quoteChord: false };
    var meter = '4/4', seed = null, tempos = [], seeds = [], nextRec = 0, quoted = false;
    var arps = [], unmapped = [];
    var styleName = null, styleDisplay = '', styleAt = 0, styleItem = null, styleTempoInArrow = false;
    var meterWritten = false, keyWritten = null, lengthInfo = null;
    var flagsStyle = false;
    function note(s) { if (s && !seen[s]) { seen[s] = 1; notes.push(s); } }
    function addWord(w) { if (w) words.push(w); }
    // Semicolons and newlines end a statement. The tokenizer does not keep
    // them, so a notes or arp line uses the source position instead.
    function statementEnd(from) {
      var m = /[\n;]/.exec(src.slice(from));
      return m ? from + m.index : src.length;
    }
    function tokenPos(tok) {
      if (!tok) return src.length;
      if (tok.at != null) return tok.at;
      return tok.end != null ? tok.end - 1 : src.length;
    }

    function stamp(ev) {
      var copy = {
        kind: ev.kind, symbol: ev.symbol, bass: ev.bass == null ? null : ev.bass,
        beats: ev.beats, bars: ev.bars, openDur: !!ev.openDur, recording: ev.recording
      };
      played.push(copy);
      return copy;
    }
    function assign(ev) {
      if (ev.kind === 'chord' && ev.recording == null) ev.recording = nextRec++;
      return ev;
    }

    function tryChord(inGroup) {
      var t = tokens[i];
      if (!t || t.type !== 'word') return null;
      var c = chordOf(t.text, inGroup, known);
      if (!c) return null;
      if (c.guard) {
        note('"' + c.guard + '" is a word here, not ' + c.guard.toUpperCase() + ' major.');
        return null;
      }
      if (c.unknown) {
        note(c.unknown + ' is not a chord.');
        return null;
      }
      if (c.bareA && /^ [a-z]/.test(src.slice(t.end, t.end + 2))) return null;
      i++;
      if (c.paren) flags.paren = true;
      if (c.lower) flags.lower = true;
      return c;
    }
    function tryRest() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return null;
      var m = /^_\((\d+(?:\.\d+)?)(\|)?\)$/.exec(t.text);
      var o = /^_\(\?\)$/.exec(t.text);
      if (m || o) {
        i++;
        flags.rest = true;
        return { kind: 'rest', beats: m && !m[2] ? +m[1] : null, bars: m && m[2] ? +m[1] : null, openDur: !!o };
      }
      if (!/^rest$/i.test(t.text)) return null;
      var n = tokens[i + 1];
      if (!n || n.type !== 'word' || !/^\d+(?:\.\d+)?$/.test(n.text)) return null;
      var bars = false, eat = 2, u = tokens[i + 2];
      if (u && u.type === 'word' && /^(?:bars?|beats?)$/i.test(u.text)) { bars = /^bar/i.test(u.text); eat = 3; }
      i += eat;
      flags.rest = true;
      return { kind: 'rest', beats: bars ? null : +n.text, bars: bars ? +n.text : null, openDur: false };
    }
    function tryHack() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return false;
      var name = null, value = null, ramp = null, eat = 0;
      var glued = /^(lowpass|highpass|bandpass|reverb|delay|drive|width|comp|eq|lp|hp|bp|dl|rv|dr|cp|wd)(\d+(?:\.\d+)?)(?:->(\d+(?:\.\d+)?))?$/i.exec(t.text);
      if (glued) { name = glued[1]; value = +glued[2]; ramp = glued[3] != null ? +glued[3] : null; eat = 1; }
      else if (HACK_WORD.test(t.text)) {
        var n = tokens[i + 1];
        var val = n && n.type === 'word' && /^(\d+(?:\.\d+)?)(?:->(\d+(?:\.\d+)?))?$/.exec(n.text);
        if (!val) return false;
        name = t.text; value = +val[1]; ramp = val[2] != null ? +val[2] : null; eat = 2;
      } else return false;
      i += eat;
      var abbr = HACK[name.toLowerCase()];
      var prev = null;
      hacks.forEach(function (h) { if (h.abbr === abbr) prev = h; });
      if (prev && prev.value !== value) note(abbr + ' was written twice. The last value is the start.');
      var row = { abbr: abbr, type: HACK_TYPE[abbr], value: value, ramp: ramp, params: hackParams(abbr, value) };
      if (prev) {
        prev.value = value; prev.ramp = ramp; prev.params = row.params;
        var si, shown = null;
        for (si = syntax.length - 1; si >= 0; si--) {
          if (syntax[si].kind === 'hack' && syntax[si].text.indexOf(abbr) === 0) { shown = syntax[si]; break; }
        }
        if (shown) shown.text = abbr + trimNum(value);
      } else {
        hacks.push(row);
        syntax.push({ kind: 'hack', text: abbr + trimNum(value) });
      }
      if (ramp != null) note('->' + trimNum(ramp) + ' is a ramp. A person plays ramps in Live.');
      return true;
    }
    function rememberTempo(n) {
      tempos.push(n);
      if (tempos.length === 1) syntax.push({ kind: 'tempo', text: 'q' + trimNum(n) });
    }
    function tryTempo() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return false;
      var g = /^(tempo|q)(\d+(?:\.\d+)?)$/i.exec(t.text);
      if (g) { i++; rememberTempo(+g[2]); return true; }
      if (/^tempo$/i.test(t.text) && tokens[i + 1] && /^\d+(?:\.\d+)?$/.test(tokens[i + 1].text)) {
        rememberTempo(+tokens[i + 1].text); i += 2; return true;
      }
      if (/^q$/i.test(t.text) && tokens[i + 1] && /^\d+(?:\.\d+)?$/.test(tokens[i + 1].text)) {
        rememberTempo(+tokens[i + 1].text); i += 2; return true;
      }
      if (/^quarter$/i.test(t.text)) {
        var j = i + 1;
        if (tokens[j] && /^notes?$/i.test(tokens[j].text)) j++;
        if (tokens[j] && tokens[j].text === '=') j++;
        else if (tokens[j] && /^=(\d+(?:\.\d+)?)$/.test(tokens[j].text)) {
          rememberTempo(+tokens[j].text.slice(1)); i = j + 1; return true;
        }
        if (tokens[j] && /^\d+(?:\.\d+)?$/.test(tokens[j].text)) { rememberTempo(+tokens[j].text); i = j + 1; return true; }
      }
      var gluedBpm = /^(\d+(?:\.\d+)?)BPM$/i.exec(t.text);
      if (gluedBpm) { rememberTempo(+gluedBpm[1]); i++; return true; }
      if (/^\d+(?:\.\d+)?$/.test(t.text) && tokens[i + 1] && /^BPM$/i.test(tokens[i + 1].text)) {
        rememberTempo(+t.text); i += 2; return true;
      }
      return false;
    }
    function trySeed() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return false;
      var g = /^(?:seed|sd)(\d+)$/i.exec(t.text);
      var n = null, eat = 0;
      if (g) { n = +g[1]; eat = 1; }
      else if (/^(?:seed|sd)$/i.test(t.text) && tokens[i + 1] && /^\d+$/.test(tokens[i + 1].text)) { n = +tokens[i + 1].text; eat = 2; }
      else return false;
      i += eat;
      seeds.push(n);
      if (seed == null) { seed = n; syntax.push({ kind: 'seed', text: 'sd' + n }); }
      else if (seed !== n) note('Another seed was written. The first is kept.');
      return true;
    }
    function tryLength() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^\d+(?:\.\d+)?$/.test(t.text)) return false;
      var u = tokens[i + 1];
      if (!u || u.type !== 'word') return false;
      var label = null;
      if (/^bars?$/i.test(u.text)) label = trimNum(+t.text) + ' ' + (+t.text === 1 ? 'bar' : 'bars');
      else if (/^(?:minutes?|mins?|m)$/i.test(u.text)) label = trimNum(+t.text) + ' ' + (+t.text === 1 ? 'minute' : 'minutes');
      else if (/^(?:seconds?|secs?|s)$/i.test(u.text)) label = trimNum(+t.text) + ' ' + (+t.text === 1 ? 'second' : 'seconds');
      if (!label) return false;
      i += 2;
      var unit = /^bar/i.test(u.text) ? 'bar' : (/^(?:minutes?|mins?|m)$/i.test(u.text) ? 'minute' : 'second');
      if (!lengthInfo) lengthInfo = { amount: +t.text, unit: unit };
      syntax.push({ kind: 'length', text: label });
      return true;
    }
    function tryMeter() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^\d+\/(?:2|4|8)$/.test(t.text)) return false;
      meter = t.text;
      meterWritten = true;
      i++;
      if (meter !== '4/4') syntax.push({ kind: 'meter', text: meter });
      return true;
    }
    function tryKey() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^key$/i.test(t.text)) return false;
      var n = tokens[i + 1];
      if (!n || n.type !== 'word' || !/^([A-Ga-g])(#|b)?$/.test(n.text)) return false;
      var mode = 'major', eat = 2, modeTok = tokens[i + 2];
      if (modeTok && modeTok.type === 'word' && /^(?:major|minor|maj|min)$/i.test(modeTok.text)) {
        mode = /^min/i.test(modeTok.text) ? 'minor' : 'major';
        eat = 3;
      }
      i += eat;
      var tonic = SPELL[pcOf(n.text[0].toUpperCase() + (n.text[1] || ''))];
      if (!keyWritten) {
        keyWritten = { tonic: tonic, mode: mode };
        syntax.push({ kind: 'key', text: 'key ' + tonic + ' ' + mode });
      } else if (keyWritten.tonic !== tonic || keyWritten.mode !== mode) note('Another key was written. The first is kept.');
      return true;
    }
    function tryStyle() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return false;
      var name = null, eat = 0;
      var glued = /^style([A-Za-z][\w-]*)$/i.exec(t.text);
      if (glued) { name = glued[1]; eat = 1; }
      else if (/^style$/i.test(t.text) && tokens[i + 1] && tokens[i + 1].type === 'word' && /^[A-Za-z][\w-]*$/.test(tokens[i + 1].text)) {
        name = tokens[i + 1].text;
        eat = 2;
      } else return false;
      i += eat;
      if (!styleName) {
        styleName = name;
        styleDisplay = name;
        styleAt = played.length;
        styleItem = { kind: 'style', text: 'style ' + name };
        syntax.push(styleItem);
      } else if (styleName.toLowerCase() !== name.toLowerCase()) note('Another style was written. The first is kept.');
      return true;
    }
    function applyStyle() {
      if (!styleName) return;
      var spec = STYLES[styleName.toLowerCase()];
      if (!spec) { note(styleDisplay + ' is not a style.'); return; }
      flagsStyle = true;
      var useSeed = seed == null ? 1 : (seed >>> 0);
      if (seed == null) note('No seed was written. The style uses seed 1.');
      var wroteChord = false, pi;
      for (pi = 0; pi < played.length; pi++) if (played[pi].kind === 'chord') wroteChord = true;
      var otNow = openingTempo(src);
      var writerBpm = otNow && otNow.bpm > 0 ? otNow.bpm : (tempos.length && tempos[0] > 0 ? tempos[0] : null);
      var tempoWritten = writerBpm != null;
      var drawn = drawStyle(spec, useSeed, {
        meterWritten: meterWritten, meter: meter,
        tempoWritten: tempoWritten, bpm: writerBpm,
        keyWritten: keyWritten, chordsWritten: wroteChord, length: lengthInfo
      });
      if (!meterWritten && drawn.meter) meter = drawn.meter;
      if (!tempoWritten && drawn.tempo > 0) { tempos.push(drawn.tempo); styleTempoInArrow = true; }
      var head = [];
      if (styleTempoInArrow) head.push('q' + trimNum(drawn.tempo));
      if (!meterWritten && drawn.meter && drawn.meter !== '4/4') head.push(drawn.meter);
      if (!wroteChord) head.push(drawn.tonic + ' ' + drawn.mode);
      var text = 'style ' + (spec.name || styleDisplay);
      if (head.length || drawn.modulation) {
        text += ' → ' + head.join(' ');
        if (drawn.modulation) text += (head.length ? ', then ' : 'then ') + drawn.modulation.text;
      }
      if (styleItem) styleItem.text = text;
      if (drawn.clamped) note('The style stops at 180 seconds.');
      if (!drawn.chords || !drawn.chords.length) return;
      var after = played.splice(styleAt);
      var items = drawn.chords, si = syntax.indexOf(styleItem);
      if (si < 0) si = syntax.length - 1;
      flags.paren = true;
      if (drawn.times > 1) {
        flags.loop = true;
        expand(items, drawn.times);
        syntax.splice(si + 1, 0, { kind: 'group', text: renderItems(items, drawn.times) });
      } else {
        var made = [];
        items.forEach(function (ev) {
          assign(ev);
          stamp(ev);
          made.push({ kind: 'chord', text: renderChord(ev) });
        });
        syntax.splice.apply(syntax, [si + 1, 0].concat(made));
      }
      played.push.apply(played, after);
    }
    function tryLoop() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return 0;
      var m = /^loop\((\d+(?:\.\d+)?)\)?$/i.exec(t.text) || /^x\((\d+(?:\.\d+)?)\)?$/i.exec(t.text) || /^x(\d+(?:\.\d+)?)$/i.exec(t.text);
      var n = null, eat = 0;
      if (m) { n = +m[1]; eat = 1; }
      else if (/^loop$/i.test(t.text) && tokens[i + 1] && /^\(?(\d+(?:\.\d+)?)\)?$/.test(tokens[i + 1].text)) {
        n = +tokens[i + 1].text.replace(/[()]/g, ''); eat = 2;
      } else if (/^x$/i.test(t.text) && tokens[i + 1] && /^\d+(?:\.\d+)?$/.test(tokens[i + 1].text)) {
        n = +tokens[i + 1].text; eat = 2;
      } else return 0;
      if (!(n > 0) || Math.abs(n - Math.round(n)) > 1e-9) {
        i += eat;
        note('loop needs a whole number.');
        return 0;
      }
      i += eat;
      return Math.round(n);
    }
    function checkBars(items) {
      var qpb = qpbOf(meter), seg = [], bad = false;
      function flush() {
        if (!seg.length) return;
        var beats = 0, open = false, k;
        for (k = 0; k < seg.length; k++) {
          var it = seg[k];
          if (it.openDur || (it.beats == null && it.bars == null)) open = true;
          else beats += it.bars != null ? it.bars * qpb : it.beats;
        }
        if (open) note('A bar line needs a duration on each chord.');
        else if (Math.abs(beats - qpb) > 1e-6) note('The beats before | add up to ' + trimNum(beats) + ', not ' + trimNum(qpb) + '.');
        seg = [];
      }
      items.forEach(function (it) {
        if (it.kind === 'bar') { flush(); bad = true; }
        else seg.push(it);
      });
      if (bad) flush();
    }
    function expand(items, times) {
      var pass, k;
      for (pass = 0; pass < times; pass++) {
        for (k = 0; k < items.length; k++) {
          var it = items[k];
          if (it.kind === 'bar') continue;
          if (pass === 0) assign(it);
          stamp(it);
        }
      }
    }
    function renderItems(items, times) {
      var parts = [];
      items.forEach(function (it) {
        if (it.kind === 'bar') parts.push('|');
        else if (it.kind === 'rest') parts.push(renderRest(it));
        else if (it.kind === 'chord') parts.push(renderChord(it));
      });
      var s = '[' + parts.join(' ') + ']';
      if (times > 1) s += 'x' + times;
      return s;
    }
    function markUnmapped(sym) {
      if (!sym || unmapped.indexOf(sym) >= 0) return;
      unmapped.push(sym);
      note(sym + ' does not map to the synth chord library.');
    }
    function arpKnown(q) {
      if (known(q)) return true;
      var lib = root.NCChords;
      if (!lib) return false;
      if (lib.compositionKnown && lib.compositionKnown(q)) return true;
      return !!(lib.idForQuality && lib.idForQuality(q));
    }
    function qualityOf(symbol) {
      var m = /^([A-G])(#|b)?([\s\S]*)$/.exec(symbol || '');
      return m ? m[3] : '';
    }
    // `arp Cm9 pendulum 16ths 2oct wide inv1 (2|)`. The chord is optional.
    // Without one, the arp follows the chord line. A duration here does not
    // switch the clock. `@name` is an instrument, same as the notes line.
    function tryArp() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^arp$/i.test(t.text)) return false;
      i++;
      var arpEnd = statementEnd(t.end);
      var trailing = [];
      var spec = {
        chord: null, chordId: null, rootPc: null, bass: null, unmapped: false,
        order: 'up', rate: '16ths', step: 0.25, octaves: 1, spread: 'compact',
        inversion: 0, fmDepth: null, beats: null, bars: null, instrument: '',
        bareRoot: false
      };
      var set = {};
      var orders = {
        up: 'up', down: 'down', 'up-down': 'up-down', 'up/down': 'up-down',
        'up-down-repeat': 'up-down-repeat', 'up/down-repeat': 'up-down-repeat',
        'outside-in': 'outside-in', 'inside-out': 'inside-out', pendulum: 'pendulum',
        random: 'random', 'as-played': 'as-played', 'down-up': 'down-up', 'down/up': 'down-up'
      };
      var rates = {
        '4th': 1, '4ths': 1, quarter: 1, quarters: 1,
        '8th': 0.5, '8ths': 0.5, eighth: 0.5, eighths: 0.5,
        '16th': 0.25, '16ths': 0.25, sixteenth: 0.25, sixteenths: 0.25,
        '32nd': 0.125, '32nds': 0.125, 'thirty-second': 0.125, 'thirty-seconds': 0.125,
        '4t': 2 / 3, '8t': 1 / 3, '16t': 1 / 6, '32t': 1 / 12,
        '4th-triplet': 2 / 3, '8th-triplet': 1 / 3, '16th-triplet': 1 / 6, '32nd-triplet': 1 / 12,
        'quarter-triplet': 2 / 3, 'eighth-triplet': 1 / 3, 'sixteenth-triplet': 1 / 6
      };
      function nameRate(step) {
        var keys = [1, 0.5, 0.25, 0.125, 2 / 3, 1 / 3, 1 / 6, 1 / 12];
        var names = ['4ths', '8ths', '16ths', '32nds', '4t', '8t', '16t', '32t'];
        var k;
        for (k = 0; k < keys.length; k++) if (Math.abs(step - keys[k]) < 1e-6) return names[k];
        return '16ths';
      }
      var spreads = { compact: 'compact', wide: 'wide', wider: 'wider', max: 'maximum', maximum: 'maximum' };
      function claim(kind) {
        if (set[kind]) return false;
        set[kind] = 1;
        return true;
      }
      function takeDur(text) {
        var d = /^\((\d+(?:\.\d+)?)(\|)?\)$/.exec(text);
        if (!d || !claim('dur')) return false;
        if (d[2]) spec.bars = +d[1];
        else spec.beats = +d[1];
        return true;
      }
      function applyChord(c, display) {
        if (!claim('chord')) return false;
        var id = root.NCChords && root.NCChords.idForQuality ? root.NCChords.idForQuality(qualityOf(c.symbol)) : null;
        spec.rootPc = pcOf(c.symbol);
        spec.bass = c.bass == null ? null : c.bass;
        spec.bareRoot = qualityOf(c.symbol) === '' && !display;
        spec.chordId = display || id;
        if (display) spec.chordId = display;
        else spec.chordId = id;
        var label = display ? (c.symbol.replace(/[^A-G#b].*$/, '') + ' ' + display) : pretty(c.symbol);
        if (c.bass != null) label += '/' + SPELL[c.bass];
        spec.chord = label;
        spec.unmapped = !spec.chordId;
        if (!set.dur) {
          if (c.bars != null) { spec.bars = c.bars; set.dur = 1; }
          else if (c.beats != null) { spec.beats = c.beats; set.dur = 1; }
        }
        if (spec.unmapped) markUnmapped(spec.chord);
        return true;
      }
      while (i < tokens.length) {
        var w = tokens[i];
        if (!w || w.type !== 'word') break;
        var text = w.text, low = text.toLowerCase();
        var at = /^(.*)@([A-Za-z][\w-]*)$/.exec(text);
        if (at) {
          if (!spec.instrument) spec.instrument = at[2].toLowerCase();
          text = at[1];
          low = text.toLowerCase();
          if (!text) { i++; continue; }
        }
        if (orders[low]) {
          if (!claim('order')) break;
          spec.order = orders[low];
          i++;
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(rates, low)) {
          if (!claim('rate')) break;
          spec.step = rates[low];
          spec.rate = nameRate(spec.step);
          i++;
          continue;
        }
        var oct = /^(\d+)oct(?:aves?)?$/i.exec(text);
        if (oct) {
          if (!claim('oct')) break;
          spec.octaves = Math.max(1, Math.min(4, +oct[1] || 1));
          i++;
          continue;
        }
        if (/^(?:oct|octave|octaves)$/i.test(text) && tokens[i + 1] && /^\d+$/.test(tokens[i + 1].text)) {
          if (!claim('oct')) break;
          spec.octaves = Math.max(1, Math.min(4, +tokens[i + 1].text));
          i += 2;
          continue;
        }
        if (/^[1-4]$/.test(text) && tokens[i + 1] && /^(?:oct|octave|octaves)$/i.test(tokens[i + 1].text)) {
          if (!claim('oct')) break;
          spec.octaves = +text;
          i += 2;
          continue;
        }
        if (spreads[low]) {
          if (!claim('spread')) break;
          spec.spread = spreads[low];
          i++;
          continue;
        }
        var inv = /^inv(\d+)$/i.exec(text);
        if (inv) {
          if (!claim('inv')) break;
          spec.inversion = +inv[1];
          i++;
          continue;
        }
        if (/^inversion$/i.test(text) && tokens[i + 1] && /^\d+$/.test(tokens[i + 1].text)) {
          if (!claim('inv')) break;
          spec.inversion = +tokens[i + 1].text;
          i += 2;
          continue;
        }
        var nextNum = tokens[i + 1] && tokens[i + 1].type === 'word' && /^\d+(?:\.\d+)?$/.test(tokens[i + 1].text);
        // `fm 3` is a depth. `fm9` is the chord. A glued `fm3` is a depth only
        // when those letters are not themselves a chord.
        if (/^fm$/i.test(text) && nextNum) {
          if (!claim('fm')) break;
          var num = +tokens[i + 1].text;
          spec.fmDepth = num < 0 ? 0 : num > 10 ? 10 : num;
          i += 2;
          continue;
        }
        var gluedFm = /^fm(\d+(?:\.\d+)?)$/i.exec(text);
        if (gluedFm) {
          var asChord = chordOf(text, true, arpKnown);
          if (!(asChord && !asChord.guard && !asChord.unknown)) {
            if (!claim('fm')) break;
            var gnum = +gluedFm[1];
            spec.fmDepth = gnum < 0 ? 0 : gnum > 10 ? 10 : gnum;
            i++;
            continue;
          }
        }
        if (takeDur(text)) { i++; continue; }
        if (!set.chord) {
          var c = chordOf(text, true, arpKnown);
          if (c && !c.guard && !c.unknown) {
            applyChord(c, null);
            i++;
            continue;
          }
        } else if (spec.bareRoot && root.NCChords && root.NCChords.idForName) {
          var named = root.NCChords.idForName(text);
          if (named) {
            spec.chordId = named;
            spec.unmapped = false;
            var rootName = spec.chord.replace(/\/.*$/, '').replace(/\s.*$/, '');
            spec.chord = rootName + (spec.bass != null ? '/' + SPELL[spec.bass] : '') + ' ' + named;
            spec.bareRoot = false;
            i++;
            continue;
          }
        }
        // A pitch left on the arp statement is part of that line, not a
        // failed chord. `arp Cm9 C5` stays an arp. A pitch on the next
        // line is still reported.
        if (pitchEcho(text) && w.at != null && w.at < arpEnd) {
          trailing.push(pitchEcho(text));
          i++;
          continue;
        }
        break;
      }
      delete spec.bareRoot;
      arps.push(spec);
      var arpText = arpSyntax(spec);
      if (trailing.length) arpText += ' ' + trailing.join(' ');
      syntax.push({ kind: 'arp', text: arpText });
      return true;
      function arpSyntax(a) {
        var parts = ['arp'];
        if (a.chord) parts.push(a.chord);
        parts.push(a.order || 'up');
        parts.push(a.rate || '16ths');
        if (a.octaves && a.octaves !== 1) parts.push(a.octaves + 'oct');
        if (a.spread && a.spread !== 'compact') parts.push(a.spread);
        if (a.inversion) parts.push('inv' + a.inversion);
        if (a.fmDepth > 0) parts.push('fm ' + trimNum(a.fmDepth));
        if (a.bars != null) parts.push('(' + trimNum(a.bars) + '|)');
        else if (a.beats != null) parts.push('(' + trimNum(a.beats) + ')');
        if (a.instrument) parts.push('@' + a.instrument);
        return parts.join(' ');
      }
    }
    // `n C5(2) Eb5 G5 Bb4` and `notes C4 Eb4 G4(2)`. The statement runs to
    // the next semicolon or newline. One real pitch makes the whole
    // statement a notes line: those pitches are not chords, and `fm 3` is
    // a depth. `notes create melody` has no pitch, so it stays words.
    // A pitch after the statement is still reported.
    function tryNotes() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^(?:n|notes)$/i.test(t.text)) return false;
      var limit = statementEnd(t.end);
      function inside(tok) { return !!(tok && tokenPos(tok) < limit); }
      function blocked(tok) {
        return tok.type === 'groupStart' || tok.type === 'groupEnd' || tok.type === 'bar';
      }
      var j = i + 1, saw = false;
      while (j < tokens.length && inside(tokens[j]) && !blocked(tokens[j])) {
        var scan = tokens[j];
        if (scan.type === 'word' && /^arp$/i.test(scan.text)) break;
        if (scan.type === 'word') {
          var glued = /^(.*)@([A-Za-z][\w-]*)$/.exec(scan.text);
          if (pitchEcho(scan.text) || (glued && glued[1] && pitchEcho(glued[1]))) saw = true;
        }
        j++;
      }
      if (!saw) return false;
      var parts = [];
      j = i + 1;
      while (j < tokens.length && inside(tokens[j]) && !blocked(tokens[j])) {
        var tok = tokens[j];
        if (tok.type === 'word' && /^arp$/i.test(tok.text)) break;
        if (tok.type === 'quote') parts.push('"' + tok.text + '"');
        else if (tok.type === 'word') {
          var at = /^(.*)@([A-Za-z][\w-]*)$/.exec(tok.text);
          var body = tok.text, inst = '';
          if (at && (!at[1] || pitchEcho(at[1]))) { body = at[1]; inst = '@' + at[2].toLowerCase(); }
          if (body && pitchEcho(body)) parts.push(pitchEcho(body));
          else if (body && /^fm(\d+(?:\.\d+)?)$/i.test(body)) parts.push('fm ' + trimNum(+body.slice(2)));
          else if (body && /^fm$/i.test(body) && tokens[j + 1] && tokens[j + 1].type === 'word' && inside(tokens[j + 1]) && /^\d+(?:\.\d+)?$/.test(tokens[j + 1].text)) {
            parts.push('fm ' + trimNum(+tokens[j + 1].text));
            j++;
          } else if (body) parts.push(body);
          if (inst) parts.push(inst);
        }
        j++;
      }
      i = j;
      if (parts.length) syntax.push({ kind: 'notes', text: 'notes ' + parts.join(' ') });
      return true;
    }
    // `fm 3` is a depth on the notes line, not the chord F minor. `fm t2`
    // and `fm "words"` are a different form and stay untouched.
    function tryNotesFm() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^fm$/i.test(t.text)) return false;
      var n = tokens[i + 1];
      if (!n || n.type !== 'word' || !/^\d+(?:\.\d+)?$/.test(n.text)) return false;
      i += 2;
      return true;
    }
    function atStatement() {
      if (tryHack()) return true;
      if (tryTempo()) return true;
      if (trySeed()) return true;
      if (tryStyle()) return true;
      if (tryKey()) return true;
      if (tryMeter()) return true;
      if (tryLength()) return true;
      var rest = tryRest();
      if (rest) { assign(rest); stamp(rest); syntax.push({ kind: 'rest', text: renderRest(rest) }); return true; }
      if (tryArp()) return true;
      if (tryNotes()) return true;
      if (tryNotesFm()) return true;
      var ch = tryChord(false);
      if (ch) { assign(ch); stamp(ch); syntax.push({ kind: 'chord', text: renderChord(ch) }); return true; }
      var times = tryLoop();
      if (times) { note('loop needs a group.'); flags.loop = true; return true; }
      return false;
    }
    function parseGroup() {
      i++;
      if (isLegacy()) { parseLegacy(); return; }
      var items = [];
      while (i < tokens.length && tokens[i].type !== 'groupEnd') {
        var t = tokens[i];
        if (t.type === 'groupStart') { note('Nested groups are not read.'); i++; continue; }
        if (t.type === 'bar') { items.push({ kind: 'bar' }); i++; continue; }
        if (t.type === 'quote') { takeQuote(); continue; }
        if (tryHack()) { note('Hacks are for the whole piece.'); continue; }
        if (tryTempo() || trySeed() || tryMeter() || tryLength()) continue;
        var rest = tryRest();
        if (rest) { items.push(rest); continue; }
        if (tryArp()) continue;
        if (tryNotes()) continue;
        if (tryNotesFm()) continue;
        var ch = tryChord(true);
        if (ch) { items.push(ch); continue; }
        if (t.type === 'word') { addWord(t.text); i++; continue; }
        i++;
      }
      if (i < tokens.length && tokens[i].type === 'groupEnd') i++;
      var times = tryLoop();
      if (!(times > 0)) times = 1;
      if (times > 1) flags.loop = true;
      checkBars(items);
      expand(items, times);
      syntax.push({ kind: 'group', text: renderItems(items, times) });
    }
    function isLegacy() {
      var a = tokens[i], b = tokens[i + 1];
      return !!(a && a.type === 'word' && /^\d+(?:\.\d+)?$/.test(a.text) && b && b.type === 'word' && /^(?:bars?|beats?)$/i.test(b.text));
    }
    function parseLegacy() {
      var n = +tokens[i].text, bars = /^bar/i.test(tokens[i + 1].text);
      i += 2;
      var chord = null;
      while (i < tokens.length && tokens[i].type !== 'groupEnd') {
        if (tokens[i].type === 'quote') { takeQuote(); continue; }
        if (!chord) {
          var ch = tryChord(true);
          if (ch) { chord = ch; continue; }
        }
        if (tokens[i] && tokens[i].type === 'word') { addWord(tokens[i].text); i++; continue; }
        if (tokens[i] && tokens[i].type !== 'groupEnd') i++;
        else break;
      }
      if (i < tokens.length && tokens[i].type === 'groupEnd') i++;
      if (!chord) return;
      chord.beats = bars ? null : n;
      chord.bars = bars ? n : null;
      chord.paren = false;
      assign(chord);
      stamp(chord);
      syntax.push({ kind: 'chord', text: renderChord(chord) });
    }
    function takeQuote() {
      var t = tokens[i++];
      quoted = true;
      addWord('"' + t.text + '"');
      if (!t.closed) note('A quote was not closed.');
      note('Quoted words stay words.');
      if (quoteHasChord(t.text)) flags.quoteChord = true;
    }
    function quoteHasChord(q) {
      var inner = tokenize(q), k, c;
      for (k = 0; k < inner.length; k++) {
        if (inner[k].type !== 'word') continue;
        c = chordOf(inner[k].text, false, known);
        if (c && !c.guard && !c.unknown && !c.lower && !c.bareA) return true;
      }
      return false;
    }

    while (i < tokens.length) {
      var t = tokens[i];
      if (t.type === 'quote') { takeQuote(); continue; }
      if (t.type === 'groupStart') { parseGroup(); continue; }
      if (t.type === 'groupEnd' || t.type === 'bar') { i++; continue; }
      if (atStatement()) continue;
      if (t.type === 'word') { addWord(t.text); i++; continue; }
      i++;
    }

    applyStyle();
    var ot = openingTempo(src);
    var bpm = ot ? ot.bpm : (tempos.length ? tempos[0] : null);
    if (tempos.length > 1) {
      var differ = tempos.some(function (n) { return n !== bpm; });
      if (differ) note('Another tempo was written. ' + (ot && ot.source === 'bpm' ? 'The BPM is kept.' : 'The first tempo is kept.'));
    }
    var tempoItem = null;
    syntax.forEach(function (s) { if (s.kind === 'tempo' && !tempoItem) tempoItem = s; });
    if (bpm != null) {
      if (tempoItem) tempoItem.text = 'q' + trimNum(bpm);
      else if (!styleTempoInArrow) syntax.unshift({ kind: 'tempo', text: 'q' + trimNum(bpm) });
    }
    var qpb = qpbOf(meter);
    var needsTempo = false;
    played.forEach(function (ev) {
      var beats = ev.beats;
      if (ev.bars != null) beats = ev.bars * qpb;
      if (beats != null && !(bpm > 0)) { needsTempo = true; ev.seconds = null; }
      else ev.seconds = beats != null && bpm > 0 ? round3(beats * 60 / bpm) : null;
    });
    if (needsTempo) note('A duration needs a tempo.');
    var chords = played.filter(function (e) { return e.kind === 'chord'; });
    var timed = chords.filter(function (e) { return e.beats != null || e.bars != null; });
    var loose = chords.filter(function (e) { return e.beats == null && e.bars == null; });
    if (timed.length && loose.length) note('A duration stays on its own chord. The others play their whole recordings.');
    if (chords.some(function (e) { return e.openDur; })) note('An open duration plays the whole recording.');
    if (flags.loop) note('The loop uses the same recordings.');
    var clock = (flags.paren || flags.rest || flags.loop || flags.lower || flags.quoteChord || flagsStyle) ? 'language' : 'legacy';
    CHANGE.lastIndex = 0;
    if (clock === 'language' && CHANGE.test(uncomment(src))) note('A later tempo is not read yet. The opening tempo is kept.');
    arps.forEach(function (a) {
      if (a.chord) return;
      played.forEach(function (ev) {
        if (ev.kind !== 'chord') return;
        var id = root.NCChords && root.NCChords.idForSymbol ? root.NCChords.idForSymbol(ev.symbol) : null;
        if (!id) {
          var label = pretty(ev.symbol);
          if (ev.bass != null) label += '/' + SPELL[ev.bass];
          markUnmapped(label);
        }
      });
    });
    if (words.length) note('Words are left for the AI.');

    var gather = [], gathered = {};
    chords.forEach(function (c) {
      if (gathered[c.recording]) return;
      gathered[c.recording] = 1;
      gather.push(c.symbol);
    });
    var line = joinSyntax(syntax);
    var iread = line;
    if (words.length) iread += (iread ? '\n' : '') + words.join(' ');
    notes.forEach(function (s) { iread += (iread ? '\n' : '') + s; });
    return {
      bpm: bpm, meter: meter, seed: seed, clock: clock, hacks: hacks,
      played: played, gather: gather, words: words, notes: notes, quoted: quoted,
      iread: iread, arp: arps, unmapped: unmapped
    };
  }

  // caps align with chord events (rests skipped). A written duration keeps its
  // slot: the next event starts on time, and a longer recording is not stretched.
  // An open chord plays its whole cap, and the next event follows it.
  function place(played, caps) {
    var cursor = 0, n = 0, entries = [], i, ev, cap, slot, len;
    played = played || [];
    for (i = 0; i < played.length; i++) {
      ev = played[i];
      if (ev.kind === 'rest') {
        if (ev.seconds > 0) cursor = round3(cursor + ev.seconds);
        continue;
      }
      cap = caps && caps[n] > 0 ? caps[n] : 0;
      n++;
      slot = ev.seconds;
      len = slot == null ? cap : slot;
      if (!(len > 0)) len = cap > 0 ? cap : (slot == null ? 0 : Math.min(slot, 0.1));
      if (cap > 0 && len > cap + 0.001) len = Math.floor(cap * 1000) / 1000;
      if (!(len > 0)) len = 0.1;
      len = round3(len);
      entries.push({ at_s: round3(cursor), len_s: len, recording: ev.recording, symbol: ev.symbol || '' });
      cursor = round3(cursor + (slot == null ? len : slot));
    }
    return { entries: entries, total_s: round3(cursor) };
  }

  root.NCLanguage = {
    parse: parse,
    place: place,
    uncomment: uncomment,
    openingTempo: openingTempo,
    hackParams: hackParams,
    lpDial: lpDial,
    pretty: pretty,
    registerStyle: registerStyle
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
