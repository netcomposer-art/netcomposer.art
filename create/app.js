// NetComposer /create/: write a Composition, hear a sketch, download, share. Static; no server.
// The Play preview runs at double the Composition's tempo (still two strikes per chord); the rendered Performance keeps its real length.
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
// the timeline, the same rule as `nc interpret --stub`
function timeline() {
  var comp = $('comp').value, words = comp + ' ' + $('perf').value;
  var found = findChords(comp); if (!found.length) found = findChords(words);
  if (!found.length) return null;
  var L = lengthOf(words), B = bars(words), n = found.length;
  var reps = (B && B.n === n) ? 1 : Math.max(1, Math.round(L / (n * 9))), seq = [];
  for (var r = 0; r < reps; r++) seq = seq.concat(found);
  var dur = L / seq.length, prev = null, out = [];
  seq.forEach(function (c, i) { var v = pickVoicing(c.sym, prev, c.bass); prev = v[1]; out.push({t: +(i * dur).toFixed(3), dur: +dur.toFixed(3), symbol: c.sym, path: v[0], voicing: v[1]}); });
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
    s.title = c.voicing.map(nn).join(' ') + ' · ' + c.path; s.textContent = c.symbol; el.appendChild(s); el.appendChild(document.createTextNode(' '));
  });
  $('progmeta').textContent = tl.chords.length + ' chords · ' + Math.round(tl.L / PREVIEW_TEMPO) + ' s · ' + (tl.chords[0].dur / PREVIEW_TEMPO).toFixed(1) + ' s each, 2 strikes · voicings from the full chord set';
}

// ---------- play (WebAudio) ----------
var AC = null, BUF = {}, playing = [], timers = [];
function stop() {
  playing.forEach(function (n) { try { n.stop(); } catch (e) {} }); playing = [];
  timers.forEach(clearTimeout); timers = [];
  document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
  $('play').textContent = 'Play';
}
function load(path) {
  if (BUF[path]) return BUF[path];
  BUF[path] = fetch(CAT.audio_base + path + '.flac', {mode: 'cors'}).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer();
  }).then(function (a) { return AC.decodeAudioData(a); });
  return BUF[path];
}
function sine(v, t0, d, out) {
  v.forEach(function (m) {
    var o = AC.createOscillator(), g = AC.createGain(); o.type = 'sine'; o.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.12 / v.length * 2, t0 + 0.4); g.gain.setTargetAtTime(0, t0 + d - 0.6, 0.4);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + d + 2); playing.push(o);
  });
}
function play() {
  if (playing.length || timers.length) { stop(); return; }
  var tl = timeline(); if (!tl) return;
  AC = AC || new (window.AudioContext || window.webkitAudioContext)(); AC.resume();
  var speed = +$('spd').value * PREVIEW_TEMPO, chords = tl.chords.slice(0, 64);
  $('play').textContent = 'Stop'; status('Loading ' + new Set(chords.map(function (c) { return c.path; })).size + ' recorded chords from fullchords.musicmatter.art…');
  var master = AC.createGain(); master.gain.value = 0.8; master.connect(AC.destination);
  Promise.all(chords.map(function (c) { return load(c.path); })).then(function (bufs) {
    status('Playing the recorded chords (CC BY-SA 4.0, Peter Semmelhack). A sketch of the harmony only: a Performance is rendered with the kit.');
    go(chords, speed, master, function (c, i, t0, d) {
      [0, d / 2].forEach(function (off, k) {
        if (off && d < 1) return;
        var s = AC.createBufferSource(), g = AC.createGain(); s.buffer = bufs[i];
        g.gain.setValueAtTime(k ? 0.45 : 0.8, t0 + off); g.gain.setTargetAtTime(0, t0 + Math.min(d + 1.5, off + bufs[i].duration) - 0.8, 0.35);
        s.connect(g); g.connect(master); s.start(t0 + off); playing.push(s);
      });
    });
  }).catch(function (e) {
    BUF = {};
    status('Could not load the recorded chords (' + (e && e.message || e) + '). Playing plain sine tones of the same voicings instead.', true);
    go(chords, speed, master, function (c, i, t0, d) { sine(c.voicing, t0, d, master); });
  });
}
function go(chords, speed, out, fn) {
  var t0 = AC.currentTime + 0.15, base = chords[0].t;
  chords.forEach(function (c, i) {
    var t = t0 + (c.t - base) / speed, d = c.dur / speed; fn(c, i, t, d);
    timers.push(setTimeout(function () {
      document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
      var e = $('ch' + i); if (e) e.classList.add('on');
    }, (t - AC.currentTime) * 1000));
  });
  var last = chords[chords.length - 1];
  timers.push(setTimeout(function () { timers = []; playing = []; stop(); }, ((last.t - base + last.dur) / speed + 3) * 1000));
}
function status(t, warn) { var s = $('status'); s.textContent = t; s.className = warn ? 'm warn' : 'm'; }

// ---------- composition.md, plan stub ----------
function state() { return {t: $('title').value.trim() || 'Untitled', by: $('by').value.trim() || 'anonymous', c: $('comp').value.trim(), p: $('perf').value.trim()}; }
function toMd(S) {
  var d = new Date().toISOString().slice(0, 10);
  return '# ' + S.t + '\n\n**Composer of this Composition:** ' + S.by + ' · **License out:** CC BY-SA 4.0\n' +
    '**Allowed transforms:** trim, gain, fade, filter, reverb, delay, time_stretch (no pitch-shift)\n\n' +
    '## Composition\n\n' + S.c + '\n\n## Performance\n\n' + S.p + '\n\n## Material rules\n\n' +
    '- Inputs: CC0, CC BY, CC BY-SA or public domain only.\n- No pitch-shifting. Time-stretch is fine.\n- Output license: CC BY-SA 4.0.\n\n' +
    '## Credits\n\n- **Composition:** ' + S.by + ' (' + d + '). CC BY-SA 4.0.\n\n*Written on https://netcomposer.art/create/*\n';
}
function toPlan(S) {
  var tl = timeline(); if (!tl) return null;
  var words = S.c + ' ' + S.p, soft = /ambient|soft|calm|slow|gentle|dark|no harsh|warm/i.test(words), sources = {}, keys = [], pad = [];
  tl.chords.forEach(function (c, i) {
    var id = 'mm-' + c.path.split('/')[1];
    sources[id] = {kind: 'supplier', manifest: CAT.manifest_base + c.path + '.nc.json', pitched: false};
    keys.push({t: +(c.t + 0.3).toFixed(3), source: id, offset_s: 0, dur_s: 4.3, fade_in_s: 0.02, fade_out_s: 2, gain: 0.8, role: 'chord strike (full chord set)'});
    keys.push({t: +(c.t + c.dur / 2 + 0.3).toFixed(3), source: id, offset_s: 0, dur_s: 4.3, fade_in_s: 0.02, fade_out_s: 2, gain: 0.45, role: 'chord restrike (full chord set)'});
    pad.push({t: i ? Math.max(0, +(c.t - 1.5).toFixed(3)) : 0, source: id, offset_s: 0, src_window_s: [0.05, 3.6], stretch_to_s: +(c.dur + 4).toFixed(3), fade_in_s: i ? 3 : 4.5, fade_out_s: 4, gain: 0.6, role: 'stretched chord pad (time-stretch, no pitch-shift)'});
  });
  return {nc_plan_version: '0.1', id: slug(S.t), title: S.t + ' (stub performance)',
    composition: {title: S.t, composer: S.by, file: 'composition.md', words_verbatim: {composition: S.c, performance: S.p}},
    interpreter: {kind: 'stub', at: new Date().toISOString(), note: 'Plan stub from netcomposer.art/create/: chord symbols found in the words, each voiced from the full chord set by voice leading, chord strikes plus a time-stretched pad. Edit it, or let an agent or `nc interpret` write a fuller plan.'},
    seed: 1, length_s: +tl.L.toFixed(3), tail_s: 4, pulse_bpm: 60, pitch_tolerance_cents: 15,
    sections: [{id: 'A', start_s: 0, end_s: +tl.L.toFixed(3), harmony: tl.unique.join(' ')}],
    chords: tl.chords.map(function (c) { return {t: c.t, dur: c.dur, symbol: c.symbol, voicing: c.voicing, section: 'A'}; }),
    sources: sources, banks: {},
    layers: [{id: 'pad', type: 'clips', bus: 'pad', role: 'stretched chord pad', events: pad}, {id: 'keys', type: 'clips', bus: 'keys', role: 'chord strikes', events: keys}],
    master: {buses: {pad: {filters: [{type: 'lp', hz: soft ? 2500 : 6000, order: 2}], lufs: -21, pan: 0.05}, keys: {filters: [{type: 'lp', hz: soft ? 3000 : 8000, order: 2}], lufs: -23, pan: -0.08}},
      reverb: {engine: 'dragonfly', send_lu: soft ? 5.3 : 1.7, params: {decay_s: soft ? 6.2 : 2.8}}, hp_hz: 30, high_shelf: {hz: 9000, db: soft ? -4.4 : -0.9}, loudness: {lufs: -17, tp: -1.5}},
    notes: ['Stub plan from netcomposer.art/create/: no melody line and no triplets were read from the words; add a "notes" layer by hand or use an interpreter.']};
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
    var w = sec("Composer's words") || txt, q = w.split('\n').filter(function (l) { return /^\s*>/.test(l); }).map(function (l) { return l.replace(/^\s*>\s?/, '').trim(); }).join(' ');
    w = q || w; var parts = w.split(/\bPerformance\s*[-:\u2013\u2014]/);
    c = parts[0].replace(/^\s*Composition\s*[-:\u2013\u2014]\s*/, '').trim(); p = p || (parts[1] || '').trim();
  }
  return {t: title, by: by, c: c, p: p || ''};
}
function fill(S) { $('title').value = S.t || ''; $('by').value = S.by || ''; $('comp').value = S.c || ''; $('perf').value = S.p || ''; stop(); refresh(); }
// ---------- share ----------
function b64e(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function b64d(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
function shareUrl() { return location.href.split('#')[0] + '#c=' + b64e(JSON.stringify(state())); }
function fromHash() {
  var m = /[#&]c=([A-Za-z0-9_-]+)/.exec(location.hash); if (!m) return false;
  try { var S = JSON.parse(b64d(m[1])); fill(S); return true; } catch (e) { status('That share link could not be read.', true); return false; }
}

// ---------- wire up ----------
var sel = $('starter');
(function () { var o = document.createElement('option'); o.value = 'blank'; o.textContent = 'Start from scratch (blank page)'; sel.appendChild(o); })();
STARTERS.forEach(function (s, i) { var o = document.createElement('option'); o.value = i; o.textContent = s.name; sel.appendChild(o); });
sel.onchange = function () { if (sel.value === '') return;
  if (sel.value === 'blank') { fill({t: '', by: '', c: '', p: ''}); sel.value = ''; history.replaceState(null, '', location.href.split('#')[0]); $('shareurl').hidden = true; status('Blank page. Write your Composition and how it should be performed; chord symbols you type show up under Play.'); $('title').focus(); return; }
  var s = STARTERS[+sel.value]; fill({t: s.title, by: s.composer, c: s.composition, p: s.performance}); sel.value = ''; };
['comp', 'perf'].forEach(function (id) { $(id).addEventListener('input', function () { stop(); refresh(); }); });
$('play').onclick = play;
$('spd').oninput = function () { $('spdv').textContent = (+$('spd').value).toFixed(1) + '×'; };
$('dlmd').onclick = function () { var S = state(); download(slug(S.t) + '.composition.md', toMd(S), 'text/markdown'); };
$('dlplan').onclick = function () { var S = state(), p = toPlan(S); if (!p) { status('Write some chord symbols first.', true); return; } download(slug(S.t) + '.plan.json', JSON.stringify(p, null, 1) + '\n', 'application/json'); };
$('up').onchange = function (e) {
  var f = e.target.files[0]; if (!f) return;
  f.text().then(function (t) { fill(parseMd(t)); status('Loaded ' + f.name + '.'); });
};
$('share').onclick = function () {
  var u = shareUrl(); history.replaceState(null, '', u); $('shareurl').value = u; $('shareurl').hidden = false; $('shareurl').select();
  if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { status('Link copied. The composition travels in the link itself; nothing is stored anywhere.'); }, function () {});
};
window.addEventListener('hashchange', fromHash);
window.NC = {timeline: timeline, toPlan: toPlan, toMd: toMd, parseMd: parseMd, state: state, fill: fill, findChords: findChords, shareUrl: shareUrl};
fetch('chords.json').then(function (r) { return r.json(); }).then(function (c) {
  CAT = c; Object.keys(c.chords).forEach(function (k) { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });
  if (!fromHash()) { var s = STARTERS[0]; fill({t: s.title, by: s.composer, c: s.composition, p: s.performance}); }
  refresh(); document.body.setAttribute('data-ready', '1');
}).catch(function (e) { $('prog').textContent = 'Could not load the chord list (' + e.message + ').'; });
})();
