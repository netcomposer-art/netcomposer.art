// NetComposer /create/: write a Composition, hear a sketch, download, share. Static; no server.
// The Play preview runs at double the Composition's tempo (still two strikes per chord). The length under the chords is the written clock: tempo, meter and chord lengths. The rendered Performance keeps that clock, plus the Performer's tail.
// Surprise me, Undo and Play all work in place; the work in progress is kept in the URL hash.
(function () {
'use strict';
var PREVIEW_TEMPO = 2;
var $ = function (id) { return document.getElementById(id); };
var CAT = null, STARTERS = JSON.parse($('starters').textContent);
var PC = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11};
var SPELL = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
var ALIAS = {'maj': '', 'M': '', 'min': 'm', '-': 'm', 'mi': 'm', 'Δ7': 'maj7', 'Δ': 'maj7', 'M7': 'maj7', 'ma7': 'maj7', 'M9': 'maj9', 'ø7': 'm7b5', 'ø': 'm7b5',
  '°7': 'dim7', 'o7': 'dim7', '°': 'dim', 'o': 'dim', '+': 'aug', '#5': 'aug', 'mMaj7': 'm-maj7', 'mmaj7': 'm-maj7', 'm(maj7)': 'm-maj7', 'madd9': 'm-add9', 'm(add9)': 'm-add9',
  '6/9': '6-9', '69': '6-9', 'm6/9': 'm6-9', 'm69': 'm6-9', 'sus': 'sus4', '7sus': '7sus4', '9sus': '9sus4', 'add2': 'add9', '2': 'sus2', '7+5': 'maj7#5'};
var QUALS = {};
var TOKEN = /(^|[^A-Za-z#])([A-G](?:#|b)?)((?:maj|min|mi|m|M|dim|aug|sus|add|alt|ø|°|Δ|o|\+|-|[0-9]|#|b|\(|\)|\/(?=9))*)(\/[A-G](?:#|b)?)?(?![A-Za-z])/g;
function pcOf(n) { return (PC[n[0]] + (n[1] === '#' ? 1 : n[1] === 'b' ? -1 : 0) + 12) % 12; }
function spell(root, q) {
  if (!(q in QUALS) && (q in ALIAS)) q = ALIAS[q];
  if (!(q in QUALS)) return null;
  return SPELL[pcOf(root)] + q;
}
function findChords(text) {
  var out = [], m; TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    var q = m[3].replace(/[()]+$/, ''), after = text.slice(TOKEN.lastIndex, TOKEN.lastIndex + 2);
    if (m[2] === 'A' && !m[3] && !m[4] && /^ [a-z]/.test(after)) continue;  // the article "A"
    var s = spell(m[2], q);
    if (s) out.push({sym: s, bass: m[4] ? pcOf(m[4].slice(1)) : null});
  }
  return out;
}
function pickVoicing(sym, prev, bass) {
  var all = CAT.chords[sym] || []; if (!all.length) return null;
  var vs = all.filter(function (v) { return Math.min.apply(null, v[1]) >= 40 && Math.max.apply(null, v[1]) <= 84; });
  if (!vs.length) vs = all;
  if (bass !== null && bass !== undefined) { var b = vs.filter(function (v) { return Math.min.apply(null, v[1]) % 12 === bass; }); if (b.length) vs = b; }
  function near(a, list) { return Math.min.apply(null, list.map(function (x) { return Math.abs(a - x); })); }
  function cost(v) {
    var n = v[1], c = Math.abs(n.reduce(function (a, b) { return a + b; }, 0) / n.length - 60) * 0.5;
    if (prev) c += n.reduce(function (a, x) { return a + near(x, prev); }, 0) / n.length + prev.reduce(function (a, x) { return a + near(x, n); }, 0) / prev.length;
    return c;
  }
  var best = vs[0], bc = cost(vs[0]);
  vs.forEach(function (v) { var c = cost(v); if (c < bc) { bc = c; best = v; } });
  return best;
}
function bars(text) {
  var b = /(\d+)\s*bars?/i.exec(text), t = /(\d+(?:\.\d+)?)\s*BPM/i.exec(text), ts = /\b(\d)\/4\b/.exec(text);
  return b && t ? {n: +b[1], s: (ts ? +ts[1] : 4) * 60 / +t[1]} : null;
}
function lengthOf(text) {
  var B = bars(text); if (B) return B.n * B.s;
  var m = /(\d+(?:\.\d+)?)\s*-?\s*(?:minutes?|mins?|m)\b(?:\s*(\d+)\s*(?:seconds?|secs?|s)\b)?/i.exec(text);
  if (m) return Math.max(20, Math.min(600, +m[1] * 60 + (+(m[2] || 0))));
  m = /(\d+(?:\.\d+)?)\s*(?:seconds?|secs?|s)\b/i.exec(text);
  return m ? Math.max(20, Math.min(600, +m[1])) : 120;
}
// Written clock, the same brackets the hosted parser reads: [1 bar C], [2 beats A].
function quartersPerBar(text) {
  var m = /\b(\d+)\s*\/\s*(2|4|8)\b/.exec(text || '');
  return m ? +m[1] * (4 / +m[2]) : 4;
}
function tempoChanges(text) {
  var re = /\b(?:at|from)\s+bar\s+(\d+)\b[^.\n]{0,40}?(\d+(?:\.\d+)?)\s*BPM\b|\bbar\s+(\d+)\s*:\s*(\d+(?:\.\d+)?)\s*BPM\b/gi, found = {}, m;
  while ((m = re.exec(text || ''))) {
    var bar = m[1] ? +m[1] : +m[3], bpm = m[1] ? +m[2] : +m[4];
    if (bar >= 1 && bpm > 0) found[bar] = bpm;
  }
  return Object.keys(found).map(function (k) { return [+k, found[k]]; }).sort(function (a, b) { return a[0] - b[0]; });
}
function openingBpm(text, changes) {
  var blank = (text || '').replace(/\b(?:at|from)\s+bar\s+\d+\b[^.\n]{0,40}?\d+(?:\.\d+)?\s*BPM\b|\bbar\s+\d+\s*:\s*\d+(?:\.\d+)?\s*BPM\b/gi, ' ');
  var m = /(\d+(?:\.\d+)?)\s*BPM\b/i.exec(blank) || /quarter(?:\s+note)?\s*[=≈]\s*(\d+(?:\.\d+)?)/i.exec(blank);
  if (m) return +m[1];
  for (var i = 0; i < changes.length; i++) if (changes[i][0] <= 1) return changes[i][1];
  return null;
}
function bracketLengths(text, chords) {
  var re = /\[\s*(\d+(?:\.\d+)?)\s*(bars?|beats?)\s+([^\]]+?)\]/gi, symbols = [], specs = [], m;
  while ((m = re.exec(text || ''))) {
    var hit = findChords(m[3]);
    if (!hit.length) continue;
    symbols.push(hit[0].sym);
    specs.push([+m[1], /^bar/i.test(m[2]) ? 'bar' : 'beat']);
  }
  if (!specs.length || symbols.length !== chords.length) return null;
  for (var i = 0; i < symbols.length; i++) if (symbols[i] !== chords[i].sym) return null;
  return specs;
}
function secondsFor(startBar, amount, unit, qpb, opening, changes) {
  var quarters = unit === 'bar' ? amount * qpb : amount;
  var pos = (startBar - 1) * qpb, end = pos + quarters;
  function bpmAt(q) {
    var bar = q / qpb + 1, bpm = opening, i;
    for (i = 0; i < changes.length; i++) if (changes[i][0] <= bar + 1e-6) bpm = changes[i][1];
    return bpm;
  }
  var points = [pos];
  changes.forEach(function (ch) {
    var boundary = (ch[0] - 1) * qpb;
    if (pos + 1e-9 < boundary && boundary < end - 1e-9) points.push(boundary);
  });
  points.push(end);
  var total = 0, i;
  for (i = 0; i < points.length - 1; i++) total += (points[i + 1] - points[i]) * (60 / bpmAt(points[i]));
  return total;
}
function writtenDurations(text, chords) {
  if (!chords || !chords.length) return null;
  var all = tempoChanges(text), changes = all.filter(function (c) { return c[0] > 1; });
  var opening = openingBpm(text, all), specs = bracketLengths(text, chords), i;
  if (!specs && changes.length && /one chord per bar/i.test(text || '')) specs = chords.map(function () { return [1, 'bar']; });
  if (!specs || !(opening > 0)) return null;
  var qpb = quartersPerBar(text) || 4, exact = [], start = 1;
  for (i = 0; i < specs.length; i++) {
    if (!(specs[i][0] > 0)) return null;
    exact.push(secondsFor(start, specs[i][0], specs[i][1], qpb, opening, changes));
    start += specs[i][1] === 'bar' ? specs[i][0] : specs[i][0] / qpb;
  }
  if (exact.some(function (v) { return !(v > 0); })) return null;
  var rounded = exact.map(function (v) { return +v.toFixed(3); });
  var target = +exact.reduce(function (a, b) { return a + b; }, 0).toFixed(3);
  var sum = rounded.reduce(function (a, b) { return a + b; }, 0);
  rounded[rounded.length - 1] = +(rounded[rounded.length - 1] + (target - sum)).toFixed(3);
  return rounded;
}
// the timeline, the same rule as `nc interpret --stub`
function timeline() {
  var comp = $('comp').value, words = comp + ' ' + $('perf').value, fromComp = true;
  var found = findChords(comp);
  if (!found.length) { found = findChords(words); fromComp = false; }
  if (!found.length) return null;
  var written = writtenDurations(fromComp ? comp : words, found);
  var seq, durs, L;
  if (written) {
    seq = found; durs = written; L = written.reduce(function (a, b) { return a + b; }, 0);
  } else {
    L = lengthOf(words);
    var B = bars(words), n = found.length, reps = (B && B.n === n) ? 1 : Math.max(1, Math.round(L / (n * 9)));
    seq = [];
    for (var r = 0; r < reps; r++) seq = seq.concat(found);
    var dur = L / seq.length;
    durs = seq.map(function () { return dur; });
  }
  var prev = null, out = [], t = 0;
  seq.forEach(function (c, i) {
    var v = pickVoicing(c.sym, prev, c.bass); prev = v[1];
    var d = durs[i];
    out.push({t: +t.toFixed(3), dur: +d.toFixed(3), symbol: c.sym, bass: c.bass, path: v[0], voicing: v[1]});
    t += d;
  });
  return {L: L, chords: out, unique: found.map(function (c) { return c.sym; })};
}
var NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
function nn(m) { return NAMES[m % 12] + (Math.floor(m / 12) - 1); }
function slug(s) { return (s || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'untitled'; }

// ---------- render the progression list ----------
function refresh() {
  var tl = CAT && timeline(), el = $('prog');
  if (!CAT) { el.textContent = 'Loading the chord set…'; return; }
  if (!tl) { $('progmeta').textContent = ''; el.textContent = 'No chord symbols found yet. Write them like Cm, Am7, F#dim7, Bb7sus4, G/B.'; $('play').disabled = true; return; }
  $('play').disabled = false;
  el.innerHTML = '';
  tl.chords.forEach(function (c, i) {
    var s = document.createElement('span'); s.className = 'ch'; s.id = 'ch' + i;
    s.title = c.voicing.map(nn).join(' ') + ' · ' + c.path; s.textContent = prettySym(c.symbol); el.appendChild(s); el.appendChild(document.createTextNode(' '));
  });
  $('progmeta').textContent = previewLen(tl.L);
}

// ---------- play (WebAudio) ----------
// Edits, Undo, Apply and the speed slider restart the preview at the chord it was on, with the new chords.
var AC = null, playing = [], timers = [], gen = 0, active = false, cur = 0, restartT = null, SCHED = [];
function stop() {
  gen++; active = false; clearTimeout(restartT);
  playing.forEach(function (n) { try { n.stop(); } catch (e) {} }); playing = [];
  timers.forEach(clearTimeout); timers = [];
  document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
  $('play').textContent = 'Play';
}
function chordLabel(c) {
  var s = prettySym(c.symbol), m = /^([A-G](?:#|b)?)/.exec(c.symbol);
  if (!m || c.bass === null || c.bass === undefined) return s;
  var pc = {c: 0, 'c#': 1, db: 1, d: 2, 'd#': 3, eb: 3, e: 4, f: 5, 'f#': 6, gb: 6, g: 7, 'g#': 8, ab: 8, a: 9, 'a#': 10, bb: 10, b: 11}[m[1].toLowerCase()];
  return pc === c.bass ? s : s + '/' + SPELL[c.bass];
}
function listed(names) { return names.length <= 4 ? names.join(', ') : names.slice(0, 3).join(', ') + ', and ' + (names.length - 3) + ' more'; }
function instrumentName() {
  var e = $('inst');
  if (!e || e.selectedIndex < 0 || !e.options.length) return 'Piano';
  return e.options[e.selectedIndex].textContent;
}
function creditSentence() {
  return instrumentName() + ' from musicmatter.art (Petrus, CC BY-SA 4.0).';
}
function previewLen(sec) {
  var s = Math.max(0, Math.round(sec));
  if (s < 60) return s + ' s';
  var m = Math.floor(s / 60), r = s % 60;
  return r ? m + ' min ' + r + ' s' : m + ' min';
}
function showCredit() {
  var s = $('status');
  s.className = 'm';
  s.textContent = '';
}
function fillInstruments(list) {
  var sel = $('inst'), prev = sel.value;
  sel.innerHTML = '';
  list.forEach(function (inst) {
    var o = document.createElement('option');
    o.value = inst.id;
    o.textContent = inst.name;
    if ((prev && inst.id === prev) || (!prev && inst.default)) o.selected = true;
    sel.appendChild(o);
  });
  showCredit();
}
function sourceNote(items) {
  var alt = [], piano = [], sine = [], seen = {};
  items.forEach(function (it) {
    var name = chordLabel(it);
    var slot = it.fallback === 'alt' ? alt : (it.fallback === 'piano' ? piano : (it.kind === 'sine' || it.fallback === 'sine' ? sine : null));
    var key = (slot === alt ? 'a' : slot === piano ? 'p' : 's') + name;
    if (!slot || seen[key]) return;
    seen[key] = 1;
    slot.push(name);
  });
  var bits = [];
  if (alt.length) bits.push('Another voicing for ' + listed(alt) + '.');
  if (piano.length) bits.push('Piano for ' + listed(piano) + '.');
  if (sine.length) bits.push('Simple tone for ' + listed(sine) + '.');
  return bits.join(' ');
}
function showSources(items) {
  var el = $('sinenote'), note = sourceNote(items);
  el.hidden = !note; el.textContent = note || '';
}
function creditsFor(items) {
  var files = [], seen = {}, sine = [], sseen = {};
  items.forEach(function (it) {
    if (it.kind === 'sine') {
      var name = chordLabel(it);
      if (!sseen[name]) { sseen[name] = 1; sine.push(name); }
      return;
    }
    if (!it.url || seen[it.url]) return;
    seen[it.url] = 1;
    var row = {symbol: chordLabel(it), library: it.instrumentName || it.library, url: it.url, creator: it.creator || 'Petrus', license: it.license || 'CC-BY-SA-4.0'};
    if (it.instrumentName || it.instrument) row.instrument = it.instrumentName || it.instrument;
    files.push(row);
  });
  var heard = {}, who = [];
  files.forEach(function (f) { if (f.instrument && !heard[f.instrument]) { heard[f.instrument] = 1; who.push(f.instrument + ' from musicmatter.art (Petrus, CC BY-SA 4.0).'); } });
  var credits = files.length ? [{name: 'Petrus', link: 'https://musicmatter.art/', license: 'CC-BY-SA-4.0', role: 'chord recordings', line: who.join(' ')}] : [];
  return {license: 'CC BY-SA 4.0', credits: credits, files: files, sine: sine};
}
function sine(v, t0, d, out) {
  v.forEach(function (m) {
    var o = AC.createOscillator(), g = AC.createGain(); o.type = 'sine'; o.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.12 / v.length * 2, t0 + 0.4); g.gain.setTargetAtTime(0, t0 + d - 0.6, 0.4);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + d + 2); playing.push(o);
  });
}
function toggle() { if (active) stop(); else start(0); }
function start(from) {
  var heard = $('perform-audio');
  if (heard && !heard.paused) heard.pause();
  stop();
  var tl = timeline(); if (!tl) return;
  AC = AC || new (window.AudioContext || window.webkitAudioContext)(); AC.resume();
  from = (from || 0) % tl.chords.length;
  var speed = +$('spd').value * PREVIEW_TEMPO, chords = tl.chords.slice(from, from + 64), my = gen; active = true; SCHED = [];
  $('play').textContent = 'Stop'; $('sinenote').hidden = true; status('Loading chord recordings…');
  var master = AC.createGain(); master.gain.value = 0.8; master.connect(AC.destination);
  window.MM.prepare(AC, chords, CAT, $('inst').value || 'piano').then(function (clips) {
    if (my !== gen) return;
    showSources(clips);
    showCredit();
    go(chords, from, speed, master, function (c, i, t0, d) {
      var clip = clips[i];
      if (!clip.buffer) { sine(c.voicing, t0, d, master); SCHED.push({i: from + i, symbol: c.symbol, strike: 1, at: t0, d: d, src: 'sine'}); return; }
      [0, d / 2].forEach(function (off, k) {
        if (off && d < 1) return;
        var s = AC.createBufferSource(), g = AC.createGain(); s.buffer = clip.buffer;
        g.gain.setValueAtTime(k ? 0.45 : 0.8, t0 + off); g.gain.setTargetAtTime(0, t0 + Math.min(d + 1.5, off + clip.buffer.duration) - 0.8, 0.35);
        s.connect(g); g.connect(master); s.start(t0 + off); playing.push(s);
        SCHED.push({i: from + i, symbol: c.symbol, path: c.path, strike: k + 1, at: t0 + off, d: d, src: clip.kind, url: clip.url || null});
      });
    });
  }).catch(function (e) {
    if (my !== gen) return;
    status('Could not start playback. Try again in a moment.', true);
    stop();
  });
}
function go(chords, from, speed, out, fn) {
  var t0 = AC.currentTime + 0.15, base = chords[0].t;
  chords.forEach(function (c, i) {
    var t = t0 + (c.t - base) / speed, d = c.dur / speed; fn(c, i, t, d);
    timers.push(setTimeout(function () {
      cur = from + i;
      document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
      var e = $('ch' + (from + i)); if (e) e.classList.add('on');
    }, (t - AC.currentTime) * 1000));
  });
  var last = chords[chords.length - 1];
  timers.push(setTimeout(function () { stop(); cur = 0; }, ((last.t - base + last.dur) / speed + 3) * 1000));
}
function restartSoon() { if (!active) return; clearTimeout(restartT); var at = cur; restartT = setTimeout(function () { if (active) start(at); }, 700); }
function status(t, warn) { var s = $('status'); s.textContent = t; s.className = warn ? 'm warn' : 'm'; }

// ---------- composition.md, sketch (plan.json) ----------
function state() { return {t: $('title').value.trim() || 'Untitled', by: $('by').value.trim() || 'anonymous', c: $('comp').value.trim(), p: $('perf').value.trim()}; }
function toMd(S) {
  var d = new Date().toISOString().slice(0, 10);
  return '# ' + S.t + '\n\n**Composer of this Composition:** ' + S.by + ' · **License out:** CC BY-SA 4.0\n' +
    '**Allowed transforms:** trim, gain, fade, filter, reverb, delay (no pitch-shift, no time-stretch)\n\n' +
    '## Composition\n\n' + S.c + '\n\n## Performance\n\n' + S.p + '\n\n## Material rules\n\n' +
    '- Inputs: CC0, CC BY, CC BY-SA or public domain only.\n- Neither pitch-shifting nor time-stretching is allowed. Transposing MIDI is fine.\n- Output license: CC BY-SA 4.0.\n\n' +
    '## Credits\n\n- **Composition:** ' + S.by + ' (' + d + '). CC BY-SA 4.0.\n' +
    '- **Chord recordings:** ' + creditSentence() + '\n\n*Written on https://netcomposer.art/create/*\n';
}
function toPlan(S) {
  var tl = timeline(); if (!tl) return null;
  var words = S.c + ' ' + S.p, soft = /ambient|soft|calm|slow|gentle|dark|no harsh|warm/i.test(words), sources = {}, keys = [], pad = [];
  tl.chords.forEach(function (c, i) {
    var id = 'mm-' + c.path.split('/')[1];
    sources[id] = {kind: 'supplier', manifest: CAT.manifest_base + c.path + '.nc.json', pitched: false};
    keys.push({t: +(c.t + 0.3).toFixed(3), source: id, offset_s: 0, dur_s: 4.3, fade_in_s: 0.02, fade_out_s: 2, gain: 0.8, role: 'chord strike (full chord set)'});
    keys.push({t: +(c.t + c.dur / 2 + 0.3).toFixed(3), source: id, offset_s: 0, dur_s: 4.3, fade_in_s: 0.02, fade_out_s: 2, gain: 0.45, role: 'chord restrike (full chord set)'});
    // Same hold as the kit stub: overlapped unaltered copies. No stretch_to_s.
    var startAt = i ? Math.max(0, +(c.t - 1.5).toFixed(3)) : 0, end = startAt + c.dur + 4, t = startAt;
    while (t < end - 0.5) {
      pad.push({t: +t.toFixed(3), source: id, offset_s: 0, dur_s: +Math.min(4, +(end - t).toFixed(3)).toFixed(3), fade_in_s: 0.35, fade_out_s: 0.45, gain: 0.55, role: 'chord pad (unaltered copies, overlapped)'});
      t += 3.2;
    }
  });
  return {nc_plan_version: '0.1', id: slug(S.t), title: S.t + ' (sketch)',
    composition: {title: S.t, composer: S.by, file: 'composition.md', words_verbatim: {composition: S.c, performance: S.p}},
    interpreter: {kind: 'stub', at: new Date().toISOString(), note: 'Sketch from netcomposer.art/create/: chord symbols found in the words, each voiced from the full chord set by voice leading, chord strikes plus a pad of overlapped unaltered copies. No pitch-shift and no time-stretch. Edit it, or let an agent or `nc interpret` write a fuller plan.'},
    seed: (SEED && SEED.c === S.c) ? SEED.seed : 1, length_s: +tl.L.toFixed(3), tail_s: 4, pulse_bpm: 60, pitch_tolerance_cents: 15,
    sections: [{id: 'A', start_s: 0, end_s: +tl.L.toFixed(3), harmony: tl.unique.join(' ')}],
    chords: tl.chords.map(function (c) { return {t: c.t, dur: c.dur, symbol: c.symbol, voicing: c.voicing, section: 'A'}; }),
    sources: sources, banks: {},
    layers: [{id: 'pad', type: 'clips', bus: 'pad', role: 'chord pad from overlapped unaltered copies', events: pad}, {id: 'keys', type: 'clips', bus: 'keys', role: 'chord strikes', events: keys}],
    master: {buses: {pad: {filters: [{type: 'lp', hz: soft ? 2500 : 6000, order: 2}], lufs: -21, pan: 0.05}, keys: {filters: [{type: 'lp', hz: soft ? 3000 : 8000, order: 2}], lufs: -23, pan: -0.08}},
      reverb: {engine: 'dragonfly', send_lu: soft ? 5.3 : 1.7, params: {decay_s: soft ? 6.2 : 2.8}}, hp_hz: 30, high_shelf: {hz: 9000, db: soft ? -4.4 : -0.9}, loudness: {lufs: -17, tp: -1.5}},
    notes: ['Sketch from netcomposer.art/create/: no melody line and no triplets were read from the words; add a "notes" layer by hand or use an interpreter.',
      'Play instrument: ' + creditSentence()].concat(
      (SEED && SEED.c === S.c) ? ['Progression from Surprise me: ' + SEED.key + ' ' + SEED.mode + ', seed ' + SEED.seed + ' (also the render seed).'] : [])};
}
function download(name, text, type) {
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type: type}));
  a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
// ---------- upload ----------
function parseMd(txt) {
  var sec = function (name) { var m = new RegExp('^##\\s+' + name + '[^\\n]*\\n([\\s\\S]*?)(?=^##\\s|$(?![\\s\\S]))', 'mi').exec(txt); return m ? m[1].trim() : null; };
  var title = (/^#\s+(.+)$/m.exec(txt) || [0, ''])[1].trim(), by = (/\*\*Composer[^*]*:\*\*\s*([^·\n]+)/.exec(txt) || [0, ''])[1].trim();
  var c = sec('Composition'), p = sec('Performance'), anchors = sec('Chord anchors');
  if (c === null && anchors && !/^\s*>/m.test(txt)) {  // the published bar-by-bar layout (e.g. BWV 846)
    var cells = [], pairs = [];
    anchors.split('\n').forEach(function (r) { r = r.trim(); if (r[0] === '|') r.replace(/^\||\|$/g, '').split('|').forEach(function (x) { cells.push(x.trim()); }); });
    for (var k = 0; k + 1 < cells.length; k += 2) if (/^\d+$/.test(cells[k]) && cells[k + 1]) pairs.push([+cells[k], cells[k + 1].replace(/\s*\(.*?\)/g, '').trim()]);
    pairs.sort(function (a, b) { return a[0] - b[0]; });
    var meta = txt.split('\n').filter(function (l) { return /^\*\*(Meter|Tempo)/.test(l); }).map(function (l) { return l.replace(/\*\*/g, ''); }).join(' ');
    c = (meta ? meta + '. One chord per bar: ' : 'One chord per bar: ') + pairs.map(function (x) { return x[1]; }).join(' | ');
    p = p || sec('Prose') || '';
  }
  if (c === null) {
    var w = sec("Composer's words") || txt.split('\n').filter(function (l) { return !/^#\s|^\*\*(Composer|Allowed|License)|^\*Written on/.test(l); }).join('\n'), q = w.split('\n').filter(function (l) { return /^\s*>/.test(l); }).map(function (l) { return l.replace(/^\s*>\s?/, '').trim(); }).join(' ');
    w = q || w; var parts = w.split(/\bPerformance\s*[-:\u2013\u2014]/);
    c = parts[0].replace(/^\s*Composition\s*[-:\u2013\u2014]\s*/, '').trim(); p = p || (parts[1] || '').trim();
  }
  return {t: title, by: by, c: c, p: p || ''};
}
function fill(S) {
  var was = active, at = cur;
  $('title').value = S.t || ''; $('by').value = S.by || ''; $('comp').value = S.c || ''; $('perf').value = S.p || '';
  SEED = S.sd ? surpriseInfo(S.sd, S.c) : null;
  stop(); refresh(); adoptNotes($('perf').value);
  if (was) start(at);
}
// ---------- share ----------
function b64e(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function b64d(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
// The work in progress lives in the page address (#c=…): written as you edit, read on load. No storage, no server.
function raw() { var S = {t: $('title').value, by: $('by').value, c: $('comp').value, p: $('perf').value}; if (SEED && SEED.c === S.c) S.sd = SEED.seed; return S; }
var persistT = null;
function persist() { clearTimeout(persistT); persistT = null; history.replaceState(null, '', location.href.split('#')[0] + '#c=' + b64e(JSON.stringify(raw()))); }
function persistSoon() { clearTimeout(persistT); persistT = setTimeout(persist, 400); }
function shareUrl() { persist(); return location.href; }
function matchStarter(S) {
  for (var i = 0; i < STARTERS.length; i++) {
    var s = STARTERS[i];
    if ((s.title || '') === (S.t || '') && (s.composer || '') === (S.by || '') && (s.composition || '') === (S.c || '') && (s.performance || '') === (S.p || '')) return String(i);
  }
  return '';
}
var shownStarter = '';
function rememberStarter(v) { shownStarter = v || ''; var pick = $('starter'); if (pick) pick.value = shownStarter; }
function fromHash() {
  var m = /[#&]c=([A-Za-z0-9_-]+)/.exec(location.hash); if (!m) return false;
  try { var S = JSON.parse(b64d(m[1])); fill(S); rememberStarter(matchStarter(S)); return true; } catch (e) { status('That share link could not be read.', true); return false; }
}
// ---------- undo ----------
// The top Undo button is only for Surprise me. Starters and opened files still
// land on the stack (so a later Surprise can step back through them) but they
// do not reveal the button. It hides again once every Surprise is undone.
var UNDO = [], STARTER_UNDO = [], SURPRISE_UNDO = [], surpriseDepth = 0;
function syncUndoBtn() {
  var show = surpriseDepth > 0;
  $('undo').hidden = !show;
  $('undo').disabled = !show;
}
function pushUndo(fromSurprise) {
  var S = raw(), top = UNDO[UNDO.length - 1];
  if (!top || JSON.stringify(top) !== JSON.stringify(S)) {
    UNDO.push(S); STARTER_UNDO.push(shownStarter); SURPRISE_UNDO.push(!!fromSurprise);
    if (fromSurprise) surpriseDepth++;
  }
  if (UNDO.length > 30) {
    UNDO.shift(); STARTER_UNDO.shift();
    if (SURPRISE_UNDO.shift()) surpriseDepth = Math.max(0, surpriseDepth - 1);
  }
  syncUndoBtn();
}
function undo() {
  var S = UNDO.pop(); if (!S) return;
  var choice = STARTER_UNDO.length ? STARTER_UNDO.pop() : '';
  if (SURPRISE_UNDO.length && SURPRISE_UNDO.pop()) surpriseDepth = Math.max(0, surpriseDepth - 1);
  fill(S); persist(); rememberStarter(choice);
  syncUndoBtn(); status('Back to your previous version.');
}
// ---------- read a composition.md into the fields (Open a file). No on-page markdown editor. ----------
function fromText(txt) {
  var S = parseMd(txt), now = raw(), md = /^#{1,2}\s+\S/m.test(txt) || /^\s*>/m.test(txt);
  if (!/^#\s+\S/m.test(txt)) S.t = now.t;
  if (!/\*\*Composer[^*]*:\*\*/.test(txt)) S.by = now.by;
  if (!md && !S.p) S.p = now.p;          // a bare chord list or plain prose: it is the Composition; keep the rest
  if (S.by === 'anonymous') S.by = '';   // toMd writes these for empty fields
  if (S.t === 'Untitled') S.t = '';
  return S;
}
// ---------- performance notes: saved text is what Perform uses ----------
var notesSaved = '', notesBefore = '', notesPast = [], notesTimer = null, notesFlash = null;
function growNotes() {
  var el = $('perf');
  el.style.height = 'auto';
  var max = Math.round(window.innerHeight * 0.7);
  var h = Math.max(el.scrollHeight, el.offsetHeight);
  el.style.height = Math.min(h, max) + 'px';
}
function syncNotes() {
  var dirty = $('perf').value !== notesSaved;
  $('notes-save').disabled = !dirty;
  $('notes-undo').disabled = !notesPast.length;
  $('notes-cancel').disabled = !dirty;
}
function adoptNotes(text) {
  notesSaved = text; notesBefore = text; notesPast = [];
  if (notesTimer) { clearTimeout(notesTimer); notesTimer = null; }
  if (notesFlash) { clearTimeout(notesFlash); notesFlash = null; }
  $('notes-save').textContent = 'Save';
  $('notes-status').textContent = '';
  growNotes(); syncNotes();
}
function noteBurst() {
  var cur = $('perf').value;
  if (cur === notesBefore) return;
  if (!notesTimer) {
    if (!notesPast.length || notesPast[notesPast.length - 1] !== notesBefore) notesPast.push(notesBefore);
    if (notesPast.length > 40) notesPast.shift();
  }
  if (notesTimer) clearTimeout(notesTimer);
  notesTimer = setTimeout(function () { notesTimer = null; }, 450);
  notesBefore = cur;
  if ($('notes-save').textContent === 'Saved') $('notes-save').textContent = 'Save';
  $('notes-status').textContent = '';
  growNotes(); syncNotes();
}
function saveNotes() {
  if ($('perf').value === notesSaved) { syncNotes(); return; }
  if (notesTimer) { clearTimeout(notesTimer); notesTimer = null; }
  notesSaved = $('perf').value; notesBefore = notesSaved; notesPast = [];
  persist();
  $('notes-save').textContent = 'Saved';
  $('notes-save').disabled = true;
  $('notes-status').textContent = 'Saved';
  syncNotes();
  if (notesFlash) clearTimeout(notesFlash);
  notesFlash = setTimeout(function () {
    if ($('notes-save').textContent === 'Saved') $('notes-save').textContent = 'Save';
    notesFlash = null; syncNotes();
  }, 1600);
}
function undoNotes() {
  if (!notesPast.length) return;
  if (notesTimer) { clearTimeout(notesTimer); notesTimer = null; }
  var prev = notesPast.pop();
  $('perf').value = prev; notesBefore = prev;
  if ($('notes-save').textContent === 'Saved') $('notes-save').textContent = 'Save';
  $('notes-status').textContent = '';
  growNotes(); refresh(); persistSoon(); syncNotes();
  $('perf').focus();
}
function cancelNotes() {
  if ($('perf').value === notesSaved) { syncNotes(); return; }
  if (notesTimer) { clearTimeout(notesTimer); notesTimer = null; }
  $('perf').value = notesSaved; notesBefore = notesSaved; notesPast = [];
  if ($('notes-save').textContent === 'Saved') $('notes-save').textContent = 'Save';
  $('notes-status').textContent = '';
  growNotes(); refresh(); persist(); syncNotes();
  $('perf').focus();
}
function commitNotes() {
  var el = $('perf'), trimmed = el.value.trim();
  if (el.value !== trimmed) el.value = trimmed;
  if (trimmed !== notesSaved) saveNotes();
  else adoptNotes(trimmed);
}
// ---------- Surprise me: a progression from a small grammar, not always the same length ----------
// Keys per mode are the tonics whose diatonic chords spell cleanly with the chord set's roots (C Db D Eb E F F# G Ab A Bb B).
// Tokens are scale degrees: [semitones above the tonic, qualities from the full chord set, most likely first].
// next[a][b] is the weight of moving from a to b: functional motion (ii-V-I, vi-IV-I-V), deceptive cadences,
// borrowed chords (iv, bVI, bVII, bIII), secondary dominants and chromatic mediants. The last chord leads back to chord 1.
var GRAMMAR = {
  major: {w: 3, keys: [0, 2, 3, 5, 7, 8, 10], tonic: 'I', tok: {
      I: [0, ['maj7', 'add9', '6-9', 'maj9', '6', '']], ii: [2, ['m7', 'm9', 'm11']], iii: [4, ['m7', 'm9']], IV: [5, ['maj7', 'add9', 'maj9', '6-9', 'maj7#11', '']],
      V: [7, ['9', '7', '13', '9sus4', '7sus4', '']], vi: [9, ['m7', 'm9', 'm11', '']], iv: [5, ['m6', 'm7', 'm-add9', 'm']], bVI: [8, ['maj7', 'add9', 'maj9']],
      bVII: [10, ['9', '13', 'add9', '']], bIII: [3, ['maj7', 'add9', '6-9']], I7: [0, ['7', '9']], VI7: [9, ['7', '7b9', '13']], III7: [4, ['7', '7b9', '7#9']], II7: [2, ['9', '7', '13']]},
    next: {I: {IV: 3, vi: 3, ii: 2, iii: 1, V: 1.5, bVII: 0.8, bVI: 0.7, bIII: 0.5, I7: 0.6, VI7: 0.6, III7: 0.5},
      ii: {V: 5, bVII: 0.7, iii: 0.4}, iii: {vi: 3, IV: 2, ii: 0.6, VI7: 0.5}, IV: {V: 3, I: 2, ii: 1, iv: 1.5, vi: 0.8, bVII: 1, iii: 0.4},
      V: {I: 4, vi: 2.5, bVI: 1, IV: 0.6}, vi: {IV: 3, ii: 3, V: 1.5, iii: 0.5, II7: 0.8}, iv: {I: 3, V: 1.2, bVII: 1.5, bVI: 0.7},
      bVI: {bVII: 3, V: 1, IV: 0.8, I: 1.2}, bVII: {I: 3, IV: 1.5, bVI: 0.5}, bIII: {bVI: 1.5, IV: 1, bVII: 1, ii: 0.5},
      I7: {IV: 5}, VI7: {ii: 5}, III7: {vi: 5}, II7: {V: 4}},
    mood: ['Bright and open; let each chord ring into the next.', 'Warm and unhurried, gentle strikes, a little air between chords.', 'Clear morning light. Soft attacks, long tails.', 'Bright and quick, then a wide open last chord.', 'Playful. A little push on the strong chords.', 'Spare. Leave air, then let it bloom.']},
  minor: {w: 2.5, keys: [9, 11, 0, 2, 4, 5, 7], tonic: 'i', tok: {
      i: [0, ['m9', 'm7', 'm-add9', 'm11', 'm']], ii0: [2, ['m7b5']], bIII: [3, ['maj7', 'add9', '6-9', 'maj9']], iv: [5, ['m9', 'm7', 'm11', 'm']], v: [7, ['m7', 'm9']],
      V: [7, ['7b9', '7', '7#9', '7b13', '7alt']], bVI: [8, ['maj7', 'add9', 'maj9', 'maj7#11']], bVII: [10, ['', '9', 'add9', '13', '9sus4']], bII: [1, ['maj7']]},
    next: {i: {iv: 3, bVI: 3, bVII: 2.5, bIII: 1.5, ii0: 1, v: 1, V: 0.8}, ii0: {V: 5}, bIII: {bVI: 2, iv: 2, bVII: 1.5, ii0: 0.5},
      iv: {bVII: 2.5, V: 2, i: 1.5, bVI: 0.8, v: 1, ii0: 0.5, bII: 0.4}, v: {bVI: 2, iv: 1.5, i: 1.5}, V: {i: 4, bVI: 2},
      bVI: {bVII: 3, V: 1.5, iv: 1, bIII: 1, i: 1, ii0: 0.7, bII: 0.4}, bVII: {i: 2.5, bIII: 2, bVI: 1, iv: 0.5}, bII: {V: 3, i: 0.5}},
    mood: ['Dark and patient. Soft attacks, long tails.', 'Night rain. Low and warm, nothing bright.', 'Slow and serious; let the minor ninths breathe.', 'Close and tense, with a long release at the end.', 'Dry and serious. Short attacks.', 'A cold room, one warm chord in the middle.']},
  dorian: {w: 1.5, keys: [2, 4, 5, 7, 9, 10, 0], tonic: 'i', tok: {
      i: [0, ['m9', 'm11', 'm7', 'm6-9', 'm6']], ii: [2, ['m7', 'm9', 'm11']], bIII: [3, ['maj7', 'add9', '6-9']], IV: [5, ['9', '13', '7', '']], v: [7, ['m7', 'm9', 'm11']], bVII: [10, ['add9', '6-9', '', 'maj7']]},
    next: {i: {IV: 4, bVII: 2.5, ii: 1.5, bIII: 1.5, v: 1.2}, IV: {i: 3, bVII: 1.5, v: 1, ii: 0.8}, bVII: {i: 2, IV: 2, bIII: 1, v: 0.6},
      ii: {bIII: 1.5, i: 1, v: 1, IV: 1}, bIII: {IV: 2, bVII: 1.5, ii: 0.8}, v: {bVII: 1.5, i: 1.5, IV: 1, bIII: 1}},
    mood: ['Cool and floating, a little night air.', 'Easy groove, soft and round; let the major IV glow.', 'Smoky and slow. Gentle strikes.', 'A walking pulse, nothing glossy.', 'Modal and open, the major IV as the light.', 'Restless, then it settles.']},
  lydian: {w: 1.5, keys: [5, 7, 8, 10, 0, 1, 3], tonic: 'I', tok: {
      I: [0, ['maj7#11', 'maj9', 'maj7', '6-9', 'maj13', 'add9']], II: [2, ['', 'add9', '6']], iii: [4, ['m7']], V: [7, ['maj7', 'add9', 'maj9', '']], vi: [9, ['m7', 'm9']], vii: [11, ['m7', 'm']], bVI: [8, ['maj7', 'add9']]},
    next: {I: {II: 4, V: 1.5, vi: 1.5, vii: 1, iii: 1, bVI: 0.5}, II: {I: 3, V: 1, vi: 1, iii: 1.2, vii: 1}, V: {I: 2, II: 1.5, vi: 1.5},
      vi: {II: 2, V: 1.5, vii: 1, I: 0.8}, iii: {II: 1.5, vi: 1.5, V: 1}, vii: {I: 1.5, vi: 1, II: 1}, bVI: {I: 1.5, V: 0.8}},
    mood: ['Bright and weightless; let the #11 shimmer.', 'Wide open sky. Slow, clear, a little wonder.', 'Floating, unhurried; let the high notes ring.', 'Glassy and strange. Let the #11 stay.', 'High and clear, almost weightless.', 'A slow lift, brighter than it starts.']},
  mixolydian: {w: 1.5, keys: [7, 9, 10, 0, 2, 3, 5], tonic: 'I', tok: {
      I: [0, ['add9', '6-9', '', '13', '9']], ii: [2, ['m7', 'm9']], IV: [5, ['', 'maj7', 'add9', '6-9', '6']], v: [7, ['m7', 'm9', 'm11']], vi: [9, ['m7', 'm9']], bVII: [10, ['', 'add9', '6-9', 'maj7', '6']]},
    next: {I: {bVII: 4, IV: 2.5, v: 1.5, vi: 0.8, ii: 0.8}, bVII: {IV: 3, I: 2.5, v: 0.8, vi: 0.5}, IV: {I: 3, bVII: 1.5, v: 1.2, ii: 0.5},
      v: {IV: 2, bVII: 1.5, vi: 1, I: 1}, vi: {IV: 2, v: 1, bVII: 1, ii: 1}, ii: {v: 1.5, IV: 1, bVII: 1}},
    mood: ['Easy and sunlit, a slow sway.', 'Open road at dusk. Warm, unhurried.', 'Relaxed and bright; let the flat seven hang.', 'A stomp, then it loosens.', 'Folk and wide. The flat seven stays.', 'Sunny, a little dusty.']}
};
var QW = [5, 4, 3, 2, 1.5, 1];
var PRETTY = {'6-9': '6/9', 'm6-9': 'm6/9', 'm-add9': 'madd9'};
function prettySym(x) { var m = /^([A-G][#b]?)(.*)$/.exec(x); return m ? m[1] + (PRETTY[m[2]] || m[2]) : x; }
function rng(seed) {   // mulberry32
  var a = seed >>> 0;
  return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function wpick(r, items) { var tot = 0, i; for (i = 0; i < items.length; i++) tot += items[i][1]; var x = r() * tot; for (i = 0; i < items.length; i++) { x -= items[i][1]; if (x < 0) return items[i][0]; } return items[items.length - 1][0]; }
var SHAPES = [
  ['30 seconds.', 'Once, close together.'],
  ['45 seconds.', 'One pass.'],
  ['1 min.', 'Unhurried.'],
  ['1 min 20 s.', 'Let the last chord hang.'],
  ['90 seconds.', 'Two breaths.'],
  ['2 min.', 'Room to ring.'],
  ['2 min 30 s.', 'Long and wide.'],
  ['3 min.', 'A long take.'],
  ['4 min.', 'Slow, and longer than it looks.']
];
function progression(seed) {
  var r = rng(seed), modes = Object.keys(GRAMMAR), mode = wpick(r, modes.map(function (m) { return [m, GRAMMAR[m].w]; })), G = GRAMMAR[mode], key = G.keys[Math.floor(r() * G.keys.length)];
  var count = wpick(r, [[4, 2], [5, 2.2], [6, 2.4], [8, 2.6], [10, 1.5], [12, 1.1]]);
  var shape = SHAPES[Math.floor(r() * SHAPES.length)], seq = null, built = false;
  for (var tries = 0; tries < 500; tries++) {
    seq = [G.tonic];
    for (var i = 1; i < count - 1; i++) {
      var nx = G.next[seq[i - 1]] || {}, opts = [];
      Object.keys(nx).forEach(function (k) {
        var w = nx[k], n = seq.filter(function (x) { return x === k; }).length;
        if (n >= 2) w *= 0.05;
        if (i === Math.floor(count / 2) && k === G.tonic) w *= 2.2;
        if (i >= 3 && k === seq[i - 2] && seq[i - 1] === seq[i - 3]) w *= 0.05;
        opts.push([k, w]);
      });
      if (!opts.length) { seq = null; break; }
      seq.push(wpick(r, opts));
    }
    if (!seq || seq.length !== count - 1) continue;
    var last = [], prev = seq[seq.length - 1], nxL = G.next[prev] || {};
    Object.keys(nxL).forEach(function (k) {
      var back = (G.next[k] || {})[G.tonic] || 0;
      if (k !== G.tonic && back > 0 && seq.filter(function (x) { return x === k; }).length < 2 && !(seq.length >= 3 && k === seq[seq.length - 2] && seq[seq.length - 1] === seq[seq.length - 3])) last.push([k, nxL[k] * back * back]);
    });
    if (!last.length) continue;
    seq.push(wpick(r, last));
    var most = Math.max.apply(null, seq.map(function (x) { return seq.filter(function (y) { return y === x; }).length; }));
    var need = Math.min(count <= 5 ? 3 : 4, count - 1);
    if (new Set(seq).size >= need && most <= Math.max(2, Math.ceil(count / 3))) { built = true; break; }
  }
  if (!built) return null;
  var stick = 0.35 + r() * 0.45, memo = {}, syms = seq.map(function (tk) {
    var d = G.tok[tk], q = (memo[tk] && r() < stick) ? memo[tk] : wpick(r, d[1].map(function (x, j) { return [x, QW[j] || 1]; }));
    memo[tk] = memo[tk] || q; return SPELL[(key + d[0]) % 12] + q;
  });
  return {seed: seed >>> 0, key: SPELL[key], mode: mode, degrees: seq, chords: syms, pretty: syms.map(prettySym),
    shape: shape[0], tail: shape[1], mood: G.mood[Math.floor(r() * G.mood.length)]};
}
// every symbol must read back through the page's own lookup and have a recorded voicing; otherwise try the next seed
function makeSurprise(seed) {
  for (var k = 0; k < 80; k++, seed = (seed + 0x9E3779B9) >>> 0) {
    var P = progression(seed); if (!P) continue;
    var c = P.shape + ' ' + P.pretty.join(', ') + '. ' + P.tail, f = findChords(c);
    if (f.length === P.chords.length && f.every(function (x, i) { return x.sym === P.chords[i] && pickVoicing(x.sym, null, x.bass); })) { P.composition = c; return P; }
  }
  return null;
}
var SEED = null;
function surpriseInfo(seed, c) { var P = makeSurprise(seed); return P && P.composition === c ? {seed: P.seed, c: c, key: P.key, mode: P.mode} : null; }
function surprise() {
  if (!CAT) return;
  var P = makeSurprise(crypto.getRandomValues(new Uint32Array(1))[0] >>> 0); if (!P) return;
  pushUndo(true);
  fill({t: 'Surprise in ' + P.key + ' ' + P.mode, by: '', c: P.composition, p: P.mood, sd: P.seed});
  rememberStarter('');
  persist(); $('shareurl').hidden = true;
  status('Surprise: ' + P.key + ' ' + P.mode + ', ' + P.chords.length + ' chords, ' + P.shape.replace(/\.$/, '') + '. Again for another; Undo goes back.');
}

// ---------- perform (a hosted render drops in here later: performBtn -> render -> #perform-audio + #perform-record) ----------
var PERFORM = {available: false};
function performStatus(t, warn) { var s = $('perform-status'); s.textContent = t; s.className = warn ? 'm warn' : 'm'; }
function showPerformance(audioUrl, recordUrl) { var a = $('perform-audio'); a.crossOrigin = 'anonymous'; a.src = audioUrl; $('perform-record').href = recordUrl; $('perform-out').hidden = false; }

// ---------- wire up ----------
var sel = $('starter');
(function () { var o = document.createElement('option'); o.value = 'blank'; o.textContent = 'Start from scratch (blank page)'; sel.appendChild(o); })();
STARTERS.forEach(function (s, i) { var o = document.createElement('option'); o.value = i; o.textContent = s.name; sel.appendChild(o); });
sel.onchange = function () { if (sel.value === '') return;
  var choice = sel.value;
  pushUndo();
  if (choice === 'blank') { fill({t: '', by: '', c: '', p: ''}); rememberStarter('blank'); persist(); $('shareurl').hidden = true; status('Blank page. Write your Composition and how it should be performed; chord symbols you type show up under Play.'); $('title').focus(); return; }
  var s = STARTERS[+choice]; fill({t: s.title, by: s.composer, c: s.composition, p: s.performance}); rememberStarter(choice); persist(); };
['comp', 'perf'].forEach(function (id) { $(id).addEventListener('input', function () {
  if (id === 'perf') noteBurst();
  refresh(); persistSoon(); if (!timeline()) stop(); else restartSoon();
}); });
['title', 'by'].forEach(function (id) { $(id).addEventListener('input', persistSoon); });
$('play').onclick = toggle;
$('surprise').onclick = surprise;
$('undo').onclick = undo;
$('notes-save').onclick = saveNotes;
$('notes-undo').onclick = undoNotes;
$('notes-cancel').onclick = cancelNotes;
$('perf').addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); saveNotes(); }
  else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z') && !e.shiftKey) { e.preventDefault(); undoNotes(); }
  else if (e.key === 'Escape' && $('perf').value !== notesSaved) { e.preventDefault(); cancelNotes(); }
});
$('spd').oninput = function () { $('spdv').textContent = (+$('spd').value).toFixed(1) + '×'; restartSoon(); };
if ($('perf-box') && $('perf-box').tagName === 'DETAILS') $('perf-box').addEventListener('toggle', function () { if ($('perf-box').open) growNotes(); });
$('inst').addEventListener('change', function () { $('sinenote').hidden = true; showCredit(); if (active) restartSoon(); });
window.MM.loadIndex().then(function (cat) { fillInstruments(window.MM.instruments(cat)); }).catch(function () {
  $('inst').disabled = true;
  $('instnote').textContent = 'The instrument list did not load. Play uses piano when the file is there, then a simple tone.';
});
$('dlmd').onclick = function () { var S = state(); download(slug(S.t) + '.composition.md', toMd(S), 'text/markdown'); };
$('dlplan').onclick = function () { var S = state(), p = toPlan(S); if (!p) { status('Write some chord symbols first.', true); return; } download(slug(S.t) + '.plan.json', JSON.stringify(p, null, 1) + '\n', 'application/json'); };
$('up').onchange = function (e) {
  var f = e.target.files[0]; if (!f) return;
  f.text().then(function (t) { pushUndo(); fill(parseMd(t)); rememberStarter(''); persist(); status('Loaded ' + f.name + '.'); });
};
$('share').onclick = function () {
  var u = shareUrl(); $('shareurl').value = u; $('shareurl').hidden = false; $('shareurl').select();
  if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { status('Link copied. The composition travels in the link itself; nothing is stored anywhere.'); }, function () {});
};
window.addEventListener('resize', growNotes);
window.addEventListener('hashchange', fromHash);
window.addEventListener('pagehide', function () { if (persistT) persist(); });
window.NC = {timeline: timeline, toPlan: toPlan, toMd: toMd, parseMd: parseMd, state: state, raw: raw, fill: fill, findChords: findChords, pickVoicing: pickVoicing, shareUrl: shareUrl,
  fromText: fromText, makeSurprise: makeSurprise, progression: progression, start: start, stop: stop, undo: undo, sched: function () { return SCHED.slice(); },
  catalog: function () { return CAT; }, audition: function (ac, chords) { return window.MM.prepare(ac, chords, CAT, $('inst').value || 'piano'); }, showSources: showSources, creditsFor: creditsFor, chordLabel: chordLabel, instrument: function () { return $('inst').value || 'piano'; }, creditSentence: creditSentence,
  PREVIEW_TEMPO: PREVIEW_TEMPO, perform: PERFORM, showPerformance: showPerformance, performStatus: performStatus, pushUndo: pushUndo, persist: persist, commitNotes: commitNotes, growNotes: growNotes};
fetch('chords.json').then(function (r) { return r.json(); }).then(function (c) {
  CAT = c; Object.keys(c.chords).forEach(function (k) { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });
  if (!fromHash()) { var s = STARTERS[0]; fill({t: s.title, by: s.composer, c: s.composition, p: s.performance}); }
  refresh(); document.body.setAttribute('data-ready', '1');
}).catch(function () { $('prog').textContent = 'Could not load the chord list. Reload the page and try again.'; });
})();
