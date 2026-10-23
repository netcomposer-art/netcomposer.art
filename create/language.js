// The Composition language, first slice (Peter, 2026-10-22). Deterministic only:
// tempo, chords, durations, groups, loops, rests, comments, seeds, and the
// starting hack values for Live. One reading, shared with nc-performer through
// tests/language-vectors.json. Words this file does not recognise, and anything
// in quotes, stay words for the AI. Nothing here calls a model.
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

  function parse(text, opts) {
    opts = opts || {};
    var known = opts.known || function () { return false; };
    var src = String(text || '');
    var tokens = tokenize(src);
    var i = 0, syntax = [], words = [], notes = [], played = [], hacks = [];
    var seen = {}, flags = { paren: false, rest: false, loop: false, lower: false, quoteChord: false };
    var meter = '4/4', seed = null, tempos = [], seeds = [], nextRec = 0, quoted = false;
    function note(s) { if (s && !seen[s]) { seen[s] = 1; notes.push(s); } }
    function addWord(w) { if (w) words.push(w); }

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
      syntax.push({ kind: 'length', text: label });
      return true;
    }
    function tryMeter() {
      var t = tokens[i];
      if (!t || t.type !== 'word' || !/^\d+\/(?:2|4|8)$/.test(t.text)) return false;
      meter = t.text;
      i++;
      if (meter !== '4/4') syntax.push({ kind: 'meter', text: meter });
      return true;
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
      if (tryMeter()) return true;
      if (tryLength()) return true;
      var rest = tryRest();
      if (rest) { assign(rest); stamp(rest); syntax.push({ kind: 'rest', text: renderRest(rest) }); return true; }
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
      else syntax.unshift({ kind: 'tempo', text: 'q' + trimNum(bpm) });
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
    var clock = (flags.paren || flags.rest || flags.loop || flags.lower || flags.quoteChord) ? 'language' : 'legacy';
    CHANGE.lastIndex = 0;
    if (clock === 'language' && CHANGE.test(uncomment(src))) note('A later tempo is not read yet. The opening tempo is kept.');
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
      iread: iread
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
    pretty: pretty
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
