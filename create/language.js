// The Composition language, first slice (Peter, 2026-10-22). Deterministic only:
// tempo, chords, durations, groups, loops, rests, comments, seeds, the
// starting hack values for Live, an arp statement, and a notes line for the
// NC Synth. One reading, shared with nc-performer through tests/language-vectors.json.
// Words this file does not recognise, and anything in quotes, stay words for
// the AI. Nothing here calls a model. An arp chord is not gathered: the synth
// plays it, unless the statement names @instrument.
//
// A duration belongs to its own chord. A chord with none plays its whole
// recording when gathered; Play sketches it as one bar. loop(n) and xn repeat
// a group with the same recordings. A hack sets Live's starting chain for the
// whole piece. A filter ramp glides across the whole piece. Any other ramp
// keeps the start value. With no written tempo, Play and
// a written duration use 96 BPM (the NC Synth page default). A time signature
// (`3/4`, `6/8`, and the other n/2, n/4, n/8 marks) sets the bar in quarter
// notes. 6/8 counts as 3 beats in a bar, not 6. With none written, the bar is
// 4/4. `(n|)` is n of those bars. `(n)` is n beats, so `(3)` is one bar of 6/8.
//
// `t1:`, `t2:`, … name a track. The label is a word `t` plus a number from 1,
// then a colon, on the same line. Several labels may share a line. The label
// owns the tokens after it until the next label or the end of the statement.
// The same number again appends. `T1` and `t1` are one track. A gap in the
// numbers stays a gap. A line with no label is read exactly as before.
// `@synth` plays that track's chords on the built-in synth, and they are not
// gathered. Another `@name` is an instrument, same as on a notes line.
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
  var SKETCH_BPM = 96;
  var HINT_Q = ['', 'm', '6', '7', 'maj7', 'm7', '9', 'maj9', 'm9', '11', 'm11', '13', 'maj13', 'm13', 'dim', 'dim7', 'aug', 'sus2', 'sus4', 'add9', 'm6', 'm7b5', '7b9', '7#9', '7b5', '7sus4', '9sus4', 'maj7#11', 'maj7#5', '6-9', 'm6-9', 'm-add9', 'm-maj7', '7alt', '7#11', '7b13', 'min', 'mi', 'maj', 'M7', 'sus', '9sus', '7sus', '2'];

  function uncomment(text) {
    return String(text || '').replace(/"(?:[^"\\]|\\.)*"/g, ' ').replace(/(?:^|\n|\s)#[^\n]*/g, ' ');
  }
  function trimNum(n) {
    if (!(n > 0) && n !== 0) return '';
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return String(+n.toFixed(3)).replace(/0+$/, '').replace(/\.$/, '');
  }
  function trimHack(n) {
    if (typeof n === 'number' && n < 0) return '-' + trimNum(-n);
    return trimNum(n);
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
  // Beats in one bar. A beat is a quarter note, so 6/8 is 3 and 2/2 is 4.
  function beatsInBar(meter) {
    var m = /^(\d+)\/(2|4|8)$/.exec(meter || '');
    return m ? +m[1] * (4 / +m[2]) : 4;
  }
  function qpbOf(meter) { return beatsInBar(meter); }
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
    if (abbr === 'cp') {
      var db = value > 0 ? -value : value;
      return { threshold_db: clamp(db, -60, 0) };
    }
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

  // The header fields write these statements. The text stays the source of truth.
  function spaces(n) { var a = ''; while (a.length < n) a += ' '; return a; }
  function maskComposition(text) {
    return String(text || '')
      .replace(/"(?:[^"\\]|\\.)*"/g, function (m) { return spaces(m.length); })
      .replace(/(^|\n|\s)#[^\n]*/g, function (m, lead) { return lead + spaces(m.length - lead.length); })
      .replace(/\b(?:at|from)\s+bar\s+\d+\b[^.\n]{0,40}?\d+(?:\.\d+)?\s*BPM\b|\bbar\s+\d+\s*:\s*\d+(?:\.\d+)?\s*BPM\b/gi, function (m) { return spaces(m.length); });
  }
  function tempoSpan(text) {
    var blank = maskComposition(text);
    var bpm = /(\d+(?:\.\d+)?)\s*BPM\b/i.exec(blank);
    if (bpm) return { start: bpm.index, end: bpm.index + bpm[0].length };
    var cands = [];
    function push(re, word) {
      var m = re.exec(blank);
      if (!m) return;
      var at = m[0].toLowerCase().indexOf(word);
      cands.push({ start: m.index + (at < 0 ? 0 : at), end: m.index + m[0].length });
    }
    push(/(?:^|[\s;,.(])tempo\s*\d+(?:\.\d+)?/i, 'tempo');
    push(/(?:^|[\s;,.(])q\s*\d+(?:\.\d+)?/i, 'q');
    push(/quarter(?:\s*note)?\s*[=≈]\s*\d+(?:\.\d+)?/i, 'quarter');
    cands.sort(function (a, b) { return a.start - b.start; });
    return cands.length ? cands[0] : null;
  }
  function meterSpans(text) {
    var blank = maskComposition(text), spans = [], i = 0, n = blank.length;
    function brk(c, start) {
      if (' \n\t\r,;[]|"·.!:=≈–—→←×{}~*•'.indexOf(c) >= 0) return true;
      if (c === '#' && start) return true;
      return false;
    }
    while (i < n) {
      var c = blank[i];
      if (brk(c, true) || c === ':') { i++; continue; }
      var start = i, word = '';
      while (i < n && !brk(blank[i], false)) {
        if (blank[i] === '(') {
          word += blank[i++];
          while (i < n && blank[i] !== ')') word += blank[i++];
          if (i < n && blank[i] === ')') word += blank[i++];
          continue;
        }
        word += blank[i++];
      }
      if (/^\d+\/(?:2|4|8)$/.test(word)) spans.push({ start: start, end: i });
    }
    return spans;
  }
  function cutSpan(text, start, end) {
    var before = text.slice(0, start), after = text.slice(end);
    if (/^\s*$/.test(before)) return after.replace(/^[ \t]*\n?/, '');
    if (/^\s*$/.test(after)) return before.replace(/[ \t]*\n?$/, '');
    if (/[ \t]$/.test(before) && /^[ \t]/.test(after)) return before.replace(/[ \t]$/, '') + after;
    if (/\n$/.test(before) && /^\n/.test(after)) return before.replace(/\n$/, '') + after;
    return before + after;
  }
  function insertFront(text, statement) {
    if (!text || /^\s*$/.test(text)) return statement;
    if (/^\s/.test(text)) {
      var rest = text.replace(/^\s+/, '');
      return rest ? statement + ' ' + rest : statement;
    }
    return statement + ' ' + text;
  }
  // Writing the default takes that statement back out.
  function setTempo(text, bpm) {
    text = String(text || '');
    var n = +bpm, span = tempoSpan(text);
    if (!(n > 0) || Math.abs(n - SKETCH_BPM) < 1e-9) return span ? cutSpan(text, span.start, span.end) : text;
    var stmt = trimNum(n) + ' BPM';
    if (!span) return insertFront(text, stmt);
    return text.slice(0, span.start) + stmt + text.slice(span.end);
  }
  function setMeter(text, meter) {
    text = String(text || '');
    if (!/^\d+\/(?:2|4|8)$/.test(meter)) return text;
    var spans = meterSpans(text), i;
    if (meter === '4/4') {
      for (i = spans.length - 1; i >= 0; i--) text = cutSpan(text, spans[i].start, spans[i].end);
      return text;
    }
    if (!spans.length) {
      var tempo = tempoSpan(text);
      if (tempo && /^\s*$/.test(text.slice(0, tempo.start))) {
        var after = text.slice(tempo.end);
        if (/^\s*$/.test(after)) return text.slice(0, tempo.end) + ' ' + meter;
        if (/^\n/.test(after)) return text.slice(0, tempo.end) + ' ' + meter + after;
        if (/^\s/.test(after)) return text.slice(0, tempo.end) + ' ' + meter + after;
        return text.slice(0, tempo.end) + ' ' + meter + ' ' + after;
      }
      return insertFront(text, meter);
    }
    var last = spans[spans.length - 1];
    return text.slice(0, last.start) + meter + text.slice(last.end);
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

  function edits(a, b) {
    var i, j, prev = [], row, cost;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      row = [i];
      for (j = 1; j <= b.length; j++) {
        cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = row;
    }
    return prev[b.length];
  }
  function knownQual(q, known) {
    if (known(q)) return q;
    if (Object.prototype.hasOwnProperty.call(ALIAS, q) && known(ALIAS[q])) return ALIAS[q];
    return null;
  }
  // A near miss such as Cmaj13b points at Cmaj13. A pitch such as C5 points at a notes line.
  function suggestSymbol(token, known) {
    var pitch = pitchEcho(token);
    if (pitch) return { pitch: pitch };
    var m = /^([A-Ga-g])(#|b)?([\s\S]*)$/.exec(token || '');
    if (!m) return null;
    var root = m[1].toUpperCase() + (m[2] || ''), q = m[3] || '';
    var best = null, bestD = 3, i, can, d;
    for (i = 0; i < HINT_Q.length; i++) {
      can = knownQual(HINT_Q[i], known);
      if (can == null) continue;
      d = edits(String(q).toLowerCase(), HINT_Q[i].toLowerCase());
      if (d < bestD) { bestD = d; best = pretty(SPELL[pcOf(root)] + can); }
    }
    if (!(bestD > 0 && bestD <= 2)) return null;
    return { symbol: best };
  }
  function parse(text, opts) {
    opts = opts || {};
    var known = opts.known || function () { return false; };
    var src = String(text || '');
    var tokens = tokenize(src);
    var i = 0, syntax = [], words = [], notes = [], played = [], hacks = [];
    var seen = {}, flags = { paren: false, rest: false, loop: false, lower: false, quoteChord: false };
    var meter = '4/4', meterWritten = false, seed = null, tempos = [], seeds = [], nextRec = 0, quoted = false;
    var arps = [], unmapped = [];
    var tracks = [], trackByN = {}, sink = null, trackSpans = [], pieceInstrument = '';
    var errors = [], lengthNotes = [], otherNotes = [], aiNotes = [];
    function say(list, s) { if (s && !seen[s]) { seen[s] = 1; list.push(s); } }
    function note(s) { say(otherNotes, s); }
    function err(s) { say(errors, s); }
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
    // `t12:` is a track. `t0`, `t`, and a colon on a later line are not.
    function labelNumber(idx) {
      var a = tokens[idx], b = tokens[idx + 1];
      if (!a || !b || a.type !== 'word' || b.type !== 'word' || b.text !== ':') return 0;
      var m = /^t(\d+)$/i.exec(a.text);
      if (!m || !(+m[1] >= 1)) return 0;
      var aEnd = a.end != null ? a.end : tokenPos(a) + 1;
      var colonAt = b.end != null ? b.end - 1 : -1;
      if (!(colonAt >= aEnd)) return 0;
      if (/[\n;]/.test(src.slice(aEnd, colonAt))) return 0;
      return +m[1];
    }
    function blockedTrack(idx) {
      if (labelNumber(idx)) return true;
      return !!(sink && tokens[idx] && tokenPos(tokens[idx]) >= sink.limit);
    }
    function closeSpan() {
      if (!sink || sink.spanAt == null) return;
      var end = sink.limit;
      if (i < tokens.length) {
        var at = tokenPos(tokens[i]);
        if (at < end) end = at;
      }
      if (end < sink.spanAt) end = sink.spanAt;
      trackSpans.push({ start: sink.spanAt, end: end });
      var chunk = src.slice(sink.contentAt, end).trim();
      if (chunk) sink.sources.push(chunk);
      sink.spanAt = null;
    }
    function openTrack(n, limit, spanAt, contentAt) {
      closeSpan();
      var tr = trackByN[n];
      if (!tr) {
        tr = { n: n, label: 'T' + n, played: [], syntax: [], arps: [], instrument: '', sources: [] };
        trackByN[n] = tr;
        tracks.push(tr);
      }
      sink = tr;
      sink.limit = limit;
      sink.spanAt = spanAt;
      sink.contentAt = contentAt;
    }
    function musPlayed() { return sink ? sink.played : played; }
    function musSyntax() { return sink ? sink.syntax : syntax; }
    function musArps() { return sink ? sink.arps : arps; }
    function setInstrument(name) {
      if (!name) return;
      if (sink) sink.instrument = name;
      else pieceInstrument = name;
    }

    function stamp(ev) {
      var copy = {
        kind: ev.kind, symbol: ev.symbol, bass: ev.bass == null ? null : ev.bass,
        beats: ev.beats, bars: ev.bars, openDur: !!ev.openDur, recording: ev.recording
      };
      musPlayed().push(copy);
      return copy;
    }
    function assign(ev) {
      if (ev.kind === 'chord' && ev.recording == null) ev.recording = nextRec++;
      return ev;
    }

    function tryChord(inGroup) {
      var t = tokens[i];
      if (!t || t.type !== 'word') return null;
      var text = t.text, gluedName = '';
      var glued = /^(.*)@([A-Za-z][\w-]*)$/.exec(text);
      if (glued && glued[1]) { text = glued[1]; gluedName = glued[2].toLowerCase(); }
      var c = chordOf(text, inGroup, known);
      if (!c) return null;
      if (c.guard) {
        err('`' + c.guard + '` is a word, not ' + c.guard.toUpperCase() + ' major. Write `' + c.guard.toUpperCase() + '` in its place for the chord.');
        return null;
      }
      if (c.unknown) {
        var hint = suggestSymbol(t.text, known);
        if (hint && hint.pitch) err('`' + hint.pitch.replace(/\(.*/, '') + '` is a pitch, not a chord. Write `notes ' + hint.pitch + '` on its own line.');
        else if (hint && hint.symbol) err(c.unknown + ' is not a chord. Did you mean `' + hint.symbol + '`?');
        else err(c.unknown + ' is not a chord. Write `Cm7` or `Fmaj9` in its place.');
        return null;
      }
      if (c.bareA && /^ [a-z]/.test(src.slice(t.end, t.end + 2))) return null;
      i++;
      if (c.paren) flags.paren = true;
      if (c.lower) flags.lower = true;
      if (gluedName) setInstrument(gluedName);
      return c;
    }
    function tryAt() {
      var t = tokens[i];
      if (!t || t.type !== 'word') return false;
      var m = /^@([A-Za-z][\w-]*)$/.exec(t.text);
      if (!m) return false;
      setInstrument(m[1].toLowerCase());
      i++;
      return true;
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
      var glued = /^(lowpass|highpass|bandpass|reverb|delay|drive|width|comp|eq|lp|hp|bp|dl|rv|dr|cp|wd)(-?\d+(?:\.\d+)?)(?:->(-?\d+(?:\.\d+)?))?$/i.exec(t.text);
      if (glued) { name = glued[1]; value = +glued[2]; ramp = glued[3] != null ? +glued[3] : null; eat = 1; }
      else if (HACK_WORD.test(t.text)) {
        var n = tokens[i + 1];
        var val = n && n.type === 'word' && /^(-?\d+(?:\.\d+)?)(?:->(-?\d+(?:\.\d+)?))?$/.exec(n.text);
        if (!val) return false;
        name = t.text; value = +val[1]; ramp = val[2] != null ? +val[2] : null; eat = 2;
      } else return false;
      var abbrPeek = HACK[name.toLowerCase()];
      if ((value < 0 || (ramp != null && ramp < 0)) && abbrPeek !== 'cp') return false;
      i += eat;
      var abbr = HACK[name.toLowerCase()];
      var prev = null;
      hacks.forEach(function (h) { if (h.abbr === abbr) prev = h; });
      if (prev && prev.value !== value) note('`' + abbr + trimHack(value) + '` was written twice. Keep `' + abbr + trimHack(value) + '` and delete the earlier one.');
      var row = { abbr: abbr, type: HACK_TYPE[abbr], value: value, ramp: ramp, params: hackParams(abbr, value) };
      if (prev) {
        prev.value = value; prev.ramp = ramp; prev.params = row.params;
        var si, shown = null;
        for (si = syntax.length - 1; si >= 0; si--) {
          if (syntax[si].kind === 'hack' && syntax[si].text.indexOf(abbr) === 0) { shown = syntax[si]; break; }
        }
        if (shown) shown.text = abbr + trimHack(value);
      } else {
        hacks.push(row);
        syntax.push({ kind: 'hack', text: abbr + trimHack(value) });
      }
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
      else if (seed !== n) note('Another seed was written. Keep the first, and delete the later `sd ' + n + '`.');
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
      meterWritten = true;
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
        err('A repeat needs a whole number after the group. Write `x4` or `loop(4)`.');
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
        if (open) err('Each chord before `|` needs a length. Add `(4)` or `(1|)` before `|`.');
        else if (Math.abs(beats - qpb) > 1e-6) err('The beats before `|` add up to ' + trimNum(beats) + ', not ' + trimNum(qpb) + '. Change the lengths before `|` so they add up to ' + trimNum(qpb) + ', or delete the `|`.');
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
      var near = suggestSymbol(sym, known);
      var fix = near && near.symbol ? near.symbol : 'C7';
      note('`' + sym + '` is not in the synth library, so an arp cannot play it. Write `' + fix + '` in its place on the arp line.');
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
        if (blockedTrack(i)) break;
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
      if (spec.instrument) setInstrument(spec.instrument);
      musArps().push(spec);
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
      while (j < tokens.length && inside(tokens[j]) && !blocked(tokens[j]) && !blockedTrack(j)) {
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
      while (j < tokens.length && inside(tokens[j]) && !blocked(tokens[j]) && !blockedTrack(j)) {
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
      if (parts.length) {
        var notesText = 'notes ' + parts.join(' ');
        musSyntax().push({ kind: 'notes', text: notesText });
        var named = /@([A-Za-z][\w-]*)/.exec(notesText);
        if (named) setInstrument(named[1].toLowerCase());
      }
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
      if (tryAt()) return true;
      if (tryHack()) return true;
      if (tryTempo()) return true;
      if (trySeed()) return true;
      if (tryMeter()) return true;
      if (tryLength()) return true;
      var rest = tryRest();
      if (rest) { assign(rest); stamp(rest); musSyntax().push({ kind: 'rest', text: renderRest(rest) }); return true; }
      if (tryArp()) return true;
      if (tryNotes()) return true;
      if (tryNotesFm()) return true;
      var ch = tryChord(false);
      if (ch) { assign(ch); stamp(ch); musSyntax().push({ kind: 'chord', text: renderChord(ch) }); return true; }
      var times = tryLoop();
      if (times) { err('A repeat needs chords to wrap. Wrap them in `[ ]x4` to repeat.'); flags.loop = true; return true; }
      return false;
    }
    function parseGroup() {
      i++;
      if (isLegacy()) { parseLegacy(); return; }
      var items = [];
      while (i < tokens.length && tokens[i].type !== 'groupEnd') {
        if (blockedTrack(i)) break;
        var t = tokens[i];
        if (t.type === 'groupStart') { err('Nested groups are not read. Keep one pair of `[ ]` around the chords.'); i++; continue; }
        if (t.type === 'bar') { items.push({ kind: 'bar' }); i++; continue; }
        if (t.type === 'quote') { takeQuote(); continue; }
        if (tryHack()) {
          var hx = syntax.length ? syntax[syntax.length - 1] : null;
          var token = hx && hx.kind === 'hack' ? hx.text : 'lp500';
          note('Hacks are for the whole piece. Move `' + token + '` outside the brackets, at the start.');
          continue;
        }
        if (tryAt()) continue;
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
      musSyntax().push({
        kind: 'group', text: renderItems(items, times), times: times,
        slots: items.filter(function (it) { return it.kind !== 'bar'; }).length
      });
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
      musSyntax().push({ kind: 'chord', text: renderChord(chord) });
    }
    function takeQuote() {
      var t = tokens[i++];
      quoted = true;
      addWord('"' + t.text + '"');
      if (!t.closed) err('A quote was not closed. Add `"` at the end.');
      var quotedSym = quotedChord(t.text);
      if (quotedSym) err('A chord inside quotes stays words. Delete the quotes around `' + quotedSym + '` to play it.');
      if (quotedSym) flags.quoteChord = true;
    }
    function quotedChord(q) {
      var inner = tokenize(q), k, c;
      for (k = 0; k < inner.length; k++) {
        if (inner[k].type !== 'word') continue;
        c = chordOf(inner[k].text, false, known);
        if (c && !c.guard && !c.unknown && !c.lower && !c.bareA) return pretty(c.symbol);
      }
      return '';
    }

    while (i < tokens.length) {
      if (sink && tokenPos(tokens[i]) >= sink.limit) { closeSpan(); sink = null; }
      if (labelNumber(i)) {
        var lab = labelNumber(i);
        var limit = statementEnd(tokenPos(tokens[i]));
        var spanAt = tokenPos(tokens[i]);
        var contentAt = tokens[i + 1] && tokens[i + 1].end != null ? tokens[i + 1].end : spanAt;
        openTrack(lab, limit, spanAt, contentAt);
        i += 2;
        continue;
      }
      var t = tokens[i];
      if (t.type === 'quote') { takeQuote(); continue; }
      if (t.type === 'groupStart') { parseGroup(); continue; }
      if (t.type === 'groupEnd' || t.type === 'bar') { i++; continue; }
      if (atStatement()) continue;
      if (t.type === 'word') { addWord(t.text); i++; continue; }
      i++;
    }
    closeSpan();

    var ot = openingTempo(src);
    var bpm = ot ? ot.bpm : (tempos.length ? tempos[0] : null);
    if (tempos.length > 1) {
      var differ = tempos.some(function (n) { return n !== bpm; });
      if (differ) note('Another tempo was written. Keep `' + trimNum(bpm) + ' BPM` at the start and delete the other.');
    }
    var tempoItem = null;
    syntax.forEach(function (s) { if (s.kind === 'tempo' && !tempoItem) tempoItem = s; });
    if (bpm != null) {
      if (tempoItem) tempoItem.text = 'q' + trimNum(bpm);
      else syntax.unshift({ kind: 'tempo', text: 'q' + trimNum(bpm) });
    }
    var qpb = qpbOf(meter);
    var bpmUse = bpm > 0 ? bpm : SKETCH_BPM;
    function stampSeconds(list) {
      list.forEach(function (ev) {
        var beats = ev.beats;
        if (ev.bars != null) beats = ev.bars * qpb;
        ev.seconds = beats != null ? round3(beats * 60 / bpmUse) : null;
      });
    }
    stampSeconds(played);
    tracks.forEach(function (tr) { stampSeconds(tr.played); });
    var chords = played.filter(function (e) { return e.kind === 'chord'; });
    var clock = (flags.paren || flags.rest || flags.loop || flags.lower || flags.quoteChord) ? 'language' : 'legacy';
    CHANGE.lastIndex = 0;
    if (clock === 'language' && CHANGE.test(uncomment(src))) note('A later tempo is not read yet. Keep `' + trimNum(bpm > 0 ? bpm : SKETCH_BPM) + ' BPM` at the start and delete the later one.');
    function scanUnmapped(list, pool) {
      list.forEach(function (a) {
        if (!a || a.chord) return;
        (pool || []).forEach(function (ev) {
          if (ev.kind !== 'chord') return;
          var id = root.NCChords && root.NCChords.idForSymbol ? root.NCChords.idForSymbol(ev.symbol) : null;
          if (!id) {
            var label = pretty(ev.symbol);
            if (ev.bass != null) label += '/' + SPELL[ev.bass];
            markUnmapped(label);
          }
        });
      });
    }
    scanUnmapped(arps, played);
    function notesBeatsOf(text) {
      var total = 0, re = /([A-Ga-g])(#|b)?(-?\d+)(?:\((\d+(?:\.\d+)?)(\|)?\))?/g, tok;
      while ((tok = re.exec(text || ''))) {
        var nbeats = tok[4] ? +tok[4] : 1;
        if (!(nbeats > 0)) nbeats = 1;
        if (tok[5]) nbeats *= qpb;
        total += nbeats;
      }
      return total;
    }
    function fmOfText(text) {
      var m = /\bfm\s+(\d+(?:\.\d+)?)/i.exec(text || '');
      if (!m) return null;
      var n = +m[1];
      return n < 0 ? 0 : n > 10 ? 10 : n;
    }
    function harmonyFor(tr) {
      var local = tr.played.filter(function (e) { return e.kind === 'chord' || e.kind === 'rest'; });
      if (local.some(function (e) { return e.kind === 'chord'; })) return local;
      if (played.some(function (e) { return e.kind === 'chord'; })) return played;
      var ti, other;
      for (ti = 0; ti < tracks.length; ti++) {
        if (tracks[ti] === tr) continue;
        other = tracks[ti].played.filter(function (e) { return e.kind === 'chord'; });
        if (other.length) return tracks[ti].played;
      }
      return local;
    }
    var resolved = [];
    tracks.forEach(function (tr) {
      var hasNotes = tr.syntax.some(function (s) { return s.kind === 'notes'; });
      var hasArp = tr.arps.length > 0;
      var hasChords = tr.played.some(function (e) { return e.kind === 'chord'; });
      var kind = hasNotes ? 'notes' : hasArp ? 'arp' : hasChords ? 'chords' : '';
      if (!kind) return;
      var kept = tr.syntax.filter(function (s) {
        if (kind === 'notes') return s.kind === 'notes';
        if (kind === 'arp') return s.kind === 'arp';
        return s.kind === 'chord' || s.kind === 'rest' || s.kind === 'group';
      });
      var arp = kind === 'arp' ? tr.arps[0] : null;
      var text = kept.map(function (s) { return s.text; }).join(' ');
      var beats = 0;
      if (kind === 'notes') beats = notesBeatsOf(text);
      else if (kind === 'arp') {
        if (arp.bars != null) beats = arp.bars * qpb;
        else if (arp.beats != null) beats = arp.beats;
        else {
          harmonyFor(tr).forEach(function (ev) { beats += eventBeats(ev); });
          if (!(beats > 0)) beats = qpb;
        }
      } else tr.played.forEach(function (ev) { beats += eventBeats(ev); });
      var fm = kind === 'arp' && arp && arp.fmDepth != null ? arp.fmDepth : fmOfText(text);
      if (kind === 'arp') scanUnmapped([arp], harmonyFor(tr));
      resolved.push({
        n: tr.n, label: tr.label, kind: kind, instrument: tr.instrument || '',
        played: kind === 'chords' ? tr.played : [],
        harmony: harmonyFor(tr),
        syntax: kept, arp: arp, source: tr.sources.join('\n'),
        beats: beats, fmDepth: fm
      });
    });
    if (words.length) say(aiNotes, 'Words are left for the AI. Quote them `"like this"` to keep them words.');

    var gather = [], gathered = {};
    if (pieceInstrument !== 'synth') {
      chords.forEach(function (c) {
        if (gathered[c.recording]) return;
        gathered[c.recording] = 1;
        gather.push(c.symbol);
      });
    }
    resolved.forEach(function (tr) {
      if (tr.kind !== 'chords' || tr.instrument === 'synth') return;
      var seen = {};
      tr.played.forEach(function (c) {
        if (c.kind !== 'chord' || c.recording == null || seen[c.recording]) return;
        seen[c.recording] = 1;
        gather.push(c.symbol);
      });
    });
    var echo = pieceEcho();
    if (echo && echo.loose.length) say(lengthNotes, lengthNote(echo.loose));
    else if (echo && echo.open.length) say(lengthNotes, openNote(echo.open));
    notes = errors.concat(otherNotes, lengthNotes).slice(0, 2).concat(aiNotes);
    var line = echo && echo.line ? echo.line : joinSyntax(syntax);
    if (!resolved.length && pieceInstrument === 'synth' && line) line += ' · @synth';
    var iread = line;
    if (words.length) iread += (iread ? '\n' : '') + words.join(' ');
    notes.forEach(function (s) { iread += (iread ? '\n' : '') + s; });
    return {
      bpm: bpm, meter: meter, meterWritten: meterWritten, seed: seed, clock: clock, hacks: hacks,
      played: played, gather: gather, words: words, notes: notes, quoted: quoted,
      iread: iread, arp: arps, unmapped: unmapped, syntax: syntax,
      tracks: resolved, trackSpans: trackSpans, synth: pieceInstrument === 'synth'
    };
    function nameList(list) {
      if (list.length === 1) return list[0];
      if (list.length === 2) return list[0] + ' and ' + list[1];
      return list.slice(0, -1).join(', ') + ', and ' + list[list.length - 1];
    }
    function codeList(list, suffix) {
      return list.slice(0, 4).map(function (n) { return '`' + n + suffix + '`'; }).join(' or ');
    }
    function lengthNote(list) {
      var who = list.length > 4 ? 'These chords' : nameList(list);
      var verb = list.length === 1 ? 'has' : 'have';
      var each = list.length === 1 ? 'it' : 'each';
      var sample = list.slice(0, 4);
      var barBeats = trimNum(qpb);
      return who + ' ' + verb + ' no length, so Play sketches ' + each + ' as 1 bar and Gather uses the whole recording. Write ' + codeList(sample, '(' + barBeats + ')') + ' for ' + barBeats + ' beats or ' + codeList(sample, '(2|)') + ' for 2 bars.';
    }
    function openNote(list) {
      var n = list[0];
      var barBeats = trimNum(qpb);
      return '`' + n + '(?)` plays the whole recording when gathered. Play sketches 1 bar. Write `' + n + '(' + barBeats + ')` for ' + barBeats + ' beats or `' + n + '(1|)` for 1 bar in its place.';
    }
    function secText(beats) {
      var s = beats * 60 / bpmUse, shown = Math.round(s * 10) / 10;
      var approx = Math.abs(s - shown) > 1e-6;
      var num = Math.abs(shown - Math.round(shown)) < 1e-9 ? String(Math.round(shown)) : String(shown);
      return (approx ? '~' : '') + num + ' s';
    }
    function eventName(ev) {
      if (!ev || ev.kind === 'rest') return 'rest';
      var s = pretty(ev.symbol);
      if (ev.bass != null) s += '/' + SPELL[ev.bass];
      return s;
    }
    function eventLen(ev) {
      if (!ev || ev.openDur || (ev.beats == null && ev.bars == null)) return '1 bar*';
      if (ev.bars != null) return trimNum(ev.bars) + (ev.bars === 1 ? ' bar' : ' bars');
      return trimNum(ev.beats) + (Math.abs(ev.beats - 1) < 1e-9 ? ' beat' : ' beats');
    }
    function eventBeats(ev) {
      if (!ev) return qpb;
      if (ev.bars != null) return ev.bars * qpb;
      if (ev.beats != null) return ev.beats;
      return qpb;
    }
    function isLoose(ev) { return !!(ev && ev.kind === 'chord' && !ev.openDur && ev.beats == null && ev.bars == null); }
    function isOpen(ev) { return !!(ev && ev.kind === 'chord' && ev.openDur); }
    function remember(list, ev) {
      if (!ev || ev.kind !== 'chord') return;
      var n = eventName(ev);
      if (list.indexOf(n) < 0) list.push(n);
    }
    function groupMeta(s) {
      var times = s.times > 0 ? s.times : 1, slots = s.slots > 0 ? s.slots : 0;
      if (!(s.slots > 0)) {
        var m = /^\[([\s\S]*)\](?:x(\d+))?$/.exec(s.text || '');
        if (m) {
          slots = m[1].trim() ? m[1].trim().split(/\s+/).filter(function (t) { return t !== '|'; }).length : 0;
          if (m[2]) times = +m[2];
        }
      }
      return { times: times, slots: slots };
    }
    function hackEcho(s) {
      var h = null, k;
      for (k = 0; k < hacks.length; k++) if (s.text.indexOf(hacks[k].abbr) === 0) h = hacks[k];
      if (h && h.ramp != null) return h.abbr + trimHack(h.value) + '→' + trimHack(h.ramp) + ' in Live';
      return s.text;
    }
    // What will play: tempo, each chord's length once, a loop as ×N, then the total.
    // A star is a length the writer did not write. Play sketches one bar; Gather uses the recording.
    function musicalEcho(evs, items) {
      if (!evs) evs = played;
      if (!items) items = syntax;
      var pi = 0, parts = [], total = 0, loose = [], open = [], music = false;
      function take(n) {
        var out = [];
        while (out.length < n && pi < evs.length) out.push(evs[pi++]);
        return out;
      }
      items.forEach(function (s) {
        if (s.kind === 'chord' || s.kind === 'rest') {
          var ev = take(1)[0];
          if (!ev) return;
          music = true;
          parts.push(eventName(ev) + ' ' + eventLen(ev));
          total += eventBeats(ev);
          if (isLoose(ev)) remember(loose, ev);
          if (isOpen(ev)) remember(open, ev);
        } else if (s.kind === 'group') {
          var meta = groupMeta(s);
          var evs = take(meta.slots * meta.times);
          var once = evs.slice(0, meta.slots);
          if (!once.length) return;
          music = true;
          once.forEach(function (ev) {
            total += eventBeats(ev) * meta.times;
            if (isLoose(ev)) remember(loose, ev);
            if (isOpen(ev)) remember(open, ev);
          });
          var g = '[' + once.map(function (ev) { return eventName(ev) + ' ' + eventLen(ev); }).join(', ') + ']';
          if (meta.times > 1) g += ' ×' + meta.times;
          parts.push(g);
        }
      });
      if (!music) return { line: '', music: false, loose: loose, open: open, parts: parts, total: total };
      var extra = [];
      items.forEach(function (s) {
        if (s.kind === 'hack') extra.push(hackEcho(s));
        else if (s.kind === 'arp' || s.kind === 'notes' || s.kind === 'seed' || s.kind === 'style' || s.kind === 'key') extra.push(s.text);
        else if (s.kind === 'meter') extra.push(s.text);
      });
      var beats = trimNum(total) + (Math.abs(total - 1) < 1e-9 ? ' beat' : ' beats');
      var line = trimNum(bpmUse) + ' BPM · ' + parts.join(' · ') + ' · ' + beats + ' · ' + secText(total);
      if (extra.length) line += ' · ' + extra.join(' · ');
      return { line: line, music: true, loose: loose, open: open, parts: parts, total: total };
    }
    // Unlabelled music keeps musicalEcho's line. Tracks are named on that same line
    // and the beat total is the longer part, because the tracks start together.
    function pieceEcho() {
      var base = musicalEcho(played, syntax);
      if (!resolved.length) return base;
      var loose = base.loose.slice(), open = base.open.slice();
      var phrases = base.music ? base.parts.slice() : [];
      var maxBeats = base.music ? base.total : 0;
      resolved.forEach(function (tr) {
        if (tr.kind === 'chords') {
          var te = musicalEcho(tr.played, tr.syntax);
          te.loose.forEach(function (n) { if (loose.indexOf(n) < 0) loose.push(n); });
          te.open.forEach(function (n) { if (open.indexOf(n) < 0) open.push(n); });
          if (te.parts.length) {
            var phrase = tr.label + ' ' + te.parts.join(', ');
            if (tr.instrument === 'synth') phrase += ' @synth';
            else if (tr.instrument) phrase += ' @' + tr.instrument;
            phrases.push(phrase);
          }
          if (te.total > maxBeats) maxBeats = te.total;
          tr.beats = te.total;
        } else if (tr.syntax.length) {
          phrases.push(tr.label + ' ' + tr.syntax.map(function (s) { return s.text; }).join(', '));
          if (tr.beats > maxBeats) maxBeats = tr.beats;
        }
      });
      if (base.music && pieceInstrument === 'synth' && phrases.length) phrases[0] += ' @synth';
      if (!phrases.length) return base;
      var extras = [];
      syntax.forEach(function (s) {
        if (s.kind === 'hack') extras.push(hackEcho(s));
        else if (s.kind === 'arp' || s.kind === 'notes' || s.kind === 'seed' || s.kind === 'style' || s.kind === 'key' || s.kind === 'meter') extras.push(s.text);
      });
      var beatsWord = trimNum(maxBeats) + (Math.abs(maxBeats - 1) < 1e-9 ? ' beat' : ' beats');
      var built = trimNum(bpmUse) + ' BPM · ' + phrases.join(' · ') + ' · ' + beatsWord + ' · ' + secText(maxBeats);
      if (extras.length) built += ' · ' + extras.join(' · ');
      return { line: built, music: true, loose: loose, open: open, total: maxBeats };
    }
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
    sketchBpm: SKETCH_BPM,
    beatsInBar: beatsInBar,
    setTempo: setTempo,
    setMeter: setMeter
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
