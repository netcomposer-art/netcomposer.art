// The Composition language, first slice. tests/language-vectors.json is the
// contract nc-performer should adopt. This file also checks that the old
// chord finder and the old assembly clock still agree where the slice says
// they must. The page half needs Chrome; the rest always runs.
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, readdirSync } from 'fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };

const chords = JSON.parse(readFileSync(join(root, 'create/chords.json'), 'utf8'));
const QUALS = {};
Object.keys(chords.chords).forEach((k) => { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });
const known = (q) => q in QUALS;

function load(file, box) {
  vm.runInContext(readFileSync(join(root, file), 'utf8'), box);
}
const sb = {}; sb.globalThis = sb; sb.Map = Map; sb.Set = Set; vm.createContext(sb);
load('create/chord-library.js', sb);
load('create/language.js', sb);
const L = sb.NCLanguage;
for (const name of readdirSync(join(root, 'styles'))) {
  if (!name.endsWith('.json')) continue;
  const style = JSON.parse(readFileSync(join(root, 'styles', name), 'utf8'));
  check(style.schema === 'nc-style/1' && L.registerStyle(style), 'register ' + name);
  check(!style.title && !style.artist && !style.audio, name + ' ships patterns only');
  check(!/\.(?:wav|mp3|flac|aiff|aif|ogg|m4a)\b/i.test(JSON.stringify(style)), name + ' has no audio filename');
}
function project(text) {
  const p = L.parse(text, { known });
  return {
    bpm: p.bpm, clock: p.clock, seed: p.seed, meter: p.meter,
    gather: p.gather,
    played: p.played.map((e) => ({
      kind: e.kind, symbol: e.symbol || null, bass: e.bass == null ? null : e.bass,
      beats: e.beats, bars: e.bars, seconds: e.seconds, recording: e.recording == null ? null : e.recording
    })),
    hacks: p.hacks.map((h) => ({ abbr: h.abbr, type: h.type, value: h.value, ramp: h.ramp })),
    words: p.words, notes: p.notes, iread: p.iread,
    arp: (p.arp || []).map((a) => ({
      chord: a.chord, chordId: a.chordId, order: a.order, rate: a.rate,
      octaves: a.octaves, spread: a.spread, inversion: a.inversion,
      fmDepth: a.fmDepth, beats: a.beats, bars: a.bars, instrument: a.instrument || ''
    })),
    unmapped: p.unmapped || []
  };
}
const rows = JSON.parse(readFileSync(join(root, 'tests/language-vectors.json'), 'utf8'));
rows.forEach((row) => {
  const got = project(row.text);
  ['bpm', 'clock', 'seed', 'meter', 'gather', 'played', 'hacks', 'words', 'notes', 'iread'].forEach((k) => {
    if (JSON.stringify(got[k]) !== JSON.stringify(row[k])) problems.push(row.name + ' ' + k + '\n  got ' + JSON.stringify(got[k]));
  });
  ['arp', 'unmapped'].forEach((k) => {
    if (k in row && JSON.stringify(got[k]) !== JSON.stringify(row[k])) problems.push(row.name + ' ' + k + '\n  got ' + JSON.stringify(got[k]));
  });
  if (row.place) {
    const placed = L.place(L.parse(row.text, { known }).played, row.place_caps);
    if (JSON.stringify(placed) !== JSON.stringify(row.place)) problems.push(row.name + ' place ' + JSON.stringify(placed));
  }
});
const peter = rows.find((r) => r.name === 'peter-line');
check(peter && peter.gather.join(',') === 'Cm,Fm9,Gm7' && peter.played.length === 12, 'peter line');
check(peter && peter.played[0].seconds === 2.667 && peter.played[1].seconds === null && peter.played[0].recording === peter.played[3].recording, 'peter durations and loop');
check(peter && peter.hacks[0] && peter.hacks[0].value === 500 && peter.hacks[0].ramp === 200, 'peter hack keeps the start');
check(peter && peter.iread.startsWith('q90; [Cm(4) Fm9 Gm7]x4; lp500\n'), 'peter I read');
check(L.lpDial(500) === 75, '500 Hz is lowpass dial 75');
check(L.parse('fm', { known }).gather[0] === 'Fm', 'fm is still F minor');
check(L.parse('fm9', { known }).gather[0] === 'Fm9', 'fm9 stays Fm9');
check(L.parse('n C5(2) Eb5 G5 fm 3', { known }).gather.indexOf('Fm') < 0, 'fm 3 on a notes line is not the chord Fm');
check(L.parse('fm t2 3', { known }).gather[0] === 'Fm', 'fm t2 is left for the later modulator form');
const notesLine = L.parse('n C5(2) Eb5 G5 Bb4', { known });
check(notesLine.gather.length === 0 && notesLine.words.length === 0 && notesLine.iread === 'notes C5(2) Eb5 G5 Bb4' && notesLine.notes.length === 0, 'a notes line is echoed and its pitches are not chords, got ' + notesLine.iread);
check(L.parse('notes C4 Eb4 G4(2)', { known }).iread === 'notes C4 Eb4 G4(2)', 'the notes keyword is the same line, got ' + L.parse('notes C4 Eb4 G4(2)', { known }).iread);
check(L.parse('notes create melody', { known }).words.join(' ') === 'notes create melody' && L.parse('notes create melody', { known }).iread.indexOf('is not a chord') < 0, 'notes without a pitch stays words');
const notesEdge = L.parse('n C5(2) Eb5 G5 Bb4\nC5', { known });
check(notesEdge.iread.indexOf('notes C5(2) Eb5 G5 Bb4') >= 0 && notesEdge.iread.indexOf('C5 is not a chord.') >= 0 && notesEdge.iread.split('is not a chord').length === 2, 'a pitch on the next line is still not a chord, got ' + notesEdge.iread);
const arpPitches = L.parse('arp Cm9 pendulum 16ths C5 Eb5 G5', { known });
check(arpPitches.arp[0].chord === 'Cm9' && arpPitches.arp[0].order === 'pendulum' && arpPitches.iread === 'arp Cm9 pendulum 16ths C5 Eb5 G5' && arpPitches.notes.length === 0, 'pitches on an arp line are not failed chords, got ' + arpPitches.iread);
check(L.parse('C5', { known }).iread.indexOf('C5 is not a chord.') >= 0 && L.parse('steady', { known }).iread.indexOf('Words are left for the AI.') >= 0, 'a real non-chord is still reported');
const arpLine = L.parse('90 BPM; arp Cm9 pendulum 16ths 2oct wide inv1 (2|)', { known });
check(arpLine.gather.length === 0 && arpLine.clock === 'legacy' && arpLine.arp[0].chordId === 'minor-9' && arpLine.arp[0].bars === 2, 'an arp chord is not gathered and its bar length does not change the clock, got ' + JSON.stringify(arpLine.arp));
check(arpLine.iread.indexOf('arp Cm9 pendulum 16ths 2oct wide inv1 (2|)') >= 0, 'I read keeps the arp statement, got ' + arpLine.iread);
check(L.parse('arp cm9', { known }).arp[0].chord === 'Cm9', 'a lowercase arp root is read');
const arpDefaults = L.parse('[Cm Fm9 Gm7]x4; arp', { known });
check(arpDefaults.gather.join(',') === 'Cm,Fm9,Gm7' && arpDefaults.played.length === 12 && arpDefaults.arp[0].order === 'up' && arpDefaults.arp[0].rate === '16ths' && arpDefaults.arp[0].octaves === 1 && arpDefaults.arp[0].spread === 'compact' && arpDefaults.arp[0].inversion === 0 && !arpDefaults.arp[0].chord, 'arp with no chord follows the line and keeps the defaults');
check(L.parse('arp Cm9 fm 3', { known }).gather.indexOf('Fm') < 0 && L.parse('arp Cm9 fm 3', { known }).arp[0].fmDepth === 3, 'fm 3 on an arp is a depth, not F minor');
check(L.parse('arp fm9', { known }).arp[0].chord === 'Fm9' && L.parse('arp fm9', { known }).arp[0].fmDepth == null, 'arp fm9 is the chord');
check(L.parse('arp Cm9 @flute', { known }).arp[0].instrument === 'flute' && L.parse('arp Cm9 @flute', { known }).gather.length === 0, '@flute on an arp is an instrument and not a gathered chord');
check(L.parse('arp C7#11 (1|)', { known }).unmapped.join(',') === 'C7#11' && L.parse('arp C7b13', { known }).unmapped.join(',') === 'C7b13', '7#11 and 7b13 stay unmapped');
check(L.parse('arp Cmaj7#5', { known }).arp[0].chordId === 'augmented-major-7', 'maj7#5 uses the augmented major 7 intervals');
check(L.parse('arp C quartal-3', { known }).arp[0].chordId === 'quartal-3' && L.parse('arp up/down', { known }).arp[0].order === 'up-down', 'a library id and the up/down alias are read');
check(L.parse('arp Cm max', { known }).iread.indexOf('maximum') >= 0, 'max is the maximum spread');
['seed 4182', 'seed4182', 'sd4182', 'sd 4182'].forEach((t) => {
  check(L.parse(t + ' C', { known }).seed === 4182, 'seed form ' + t);
});
const styleA = L.parse('sd 1\nstyle hopkins-like', { known });
const styleB = L.parse('sd 1\nstyle hopkins-like', { known });
check(styleA.iread === styleB.iread && JSON.stringify(styleA.played) === JSON.stringify(styleB.played), 'a style line repeats for one seed');
check(L.parse('sd 2\nstyle hopkins-like', { known }).iread !== styleA.iread, 'sd 2 draws a different line');
check(L.parse('style hopkins-like', { known }).seed == null && L.parse('style hopkins-like', { known }).iread.indexOf('The style uses seed 1.') >= 0, 'a missing seed stays null and is named');
check(L.parse('sd 1\nstyle nope', { known }).iread.indexOf('nope is not a style.') >= 0 && L.parse('sd 1\nstyle nope', { known }).gather.length === 0, 'an unknown style is a message');
const styleArp = L.parse('sd 1\nstyle hopkins-like\narp up 16ths fm 3', { known });
check(styleArp.gather.length > 0 && styleArp.arp[0] && !styleArp.arp[0].chord && styleArp.arp[0].order === 'up' && styleArp.arp[0].rate === '16ths' && styleArp.arp[0].fmDepth === 3 && styleArp.gather.indexOf('Fm') < 0, 'a bare arp follows the style chords and fm 3 is a depth');
const styleNotes = L.parse('sd 1\nstyle hopkins-like\nn C5(2) Eb5 fm 3', { known });
check(styleNotes.gather.indexOf('Fm') < 0 && styleNotes.iread.indexOf('notes C5(2) Eb5 fm 3') >= 0, 'fm 3 on the notes line stays a depth beside a style');
const styleBeats = styleA.played.reduce((sum, ev) => sum + (ev.beats || 0), 0);
check(styleA.bpm > 0 && styleBeats * 60 / styleA.bpm >= 20 && styleBeats * 60 / styleA.bpm <= 60 + 1e-6, 'an unlengthened style line is 20 to 60 seconds');

// The finder the page used before this slice. Starters and published
// Compositions must list the same chords, including bass.
const TOKEN = /(^|[^A-Za-z#])([A-G](?:#|b)?)((?:maj|min|mi|m|M|dim|aug|sus|add|alt|ø|°|Δ|o|\+|-|[0-9]|#|b|\(|\)|\/(?=9))*)(\/[A-G](?:#|b)?)?(?![A-Za-z])/g;
const ALIAS = {'maj': '', 'M': '', 'min': 'm', '-': 'm', 'mi': 'm', 'Δ7': 'maj7', 'Δ': 'maj7', 'M7': 'maj7', 'ma7': 'maj7', 'M9': 'maj9', 'ø7': 'm7b5', 'ø': 'm7b5', '°7': 'dim7', 'o7': 'dim7', '°': 'dim', 'o': 'dim', '+': 'aug', '#5': 'aug', 'mMaj7': 'm-maj7', 'mmaj7': 'm-maj7', 'm(maj7)': 'm-maj7', 'madd9': 'm-add9', 'm(add9)': 'm-add9', '6/9': '6-9', '69': '6-9', 'm6/9': 'm6-9', 'm69': 'm6-9', 'sus': 'sus4', '7sus': '7sus4', '9sus': '9sus4', 'add2': 'add9', '2': 'sus2', '7+5': 'maj7#5'};
const PC = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11};
const SPELL = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
function pcOf(n) { return (PC[n[0]] + (n[1] === '#' ? 1 : n[1] === 'b' ? -1 : 0) + 12) % 12; }
function legacy(text) {
  const out = []; let m; TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    let q = m[3].replace(/[()]+$/, '');
    const after = text.slice(TOKEN.lastIndex, TOKEN.lastIndex + 2);
    if (m[2] === 'A' && !m[3] && !m[4] && /^ [a-z]/.test(after)) continue;
    if (!(q in QUALS) && (q in ALIAS)) q = ALIAS[q];
    if (!(q in QUALS)) continue;
    out.push(SPELL[pcOf(m[2])] + q + (m[4] ? '/' + m[4].slice(1) : ''));
  }
  return out;
}
function syms(text) {
  return L.parse(text, { known }).played.filter((e) => e.kind === 'chord').map((e) => e.symbol + (e.bass != null ? '/' + SPELL[e.bass] : ''));
}
function same(name, text) {
  const a = legacy(text), b = syms(text);
  if (JSON.stringify(a) !== JSON.stringify(b)) problems.push(name + ' chords differ ' + a.length + ' vs ' + b.length);
}
const html = readFileSync(join(root, 'create/index.html'), 'utf8');
const starters = JSON.parse(html.split('<script type="application/json" id="starters">')[1].split('</script>')[0]);
starters.forEach((s) => {
  if (/\bstyle\s+[A-Za-z]/.test(s.composition)) {
    const p = L.parse(s.composition, { known });
    check(p.gather.length > 0 && p.iread.indexOf('style ' + s.id + ' →') >= 0, 'style starter ' + s.id + ' yields chords, got ' + p.iread);
    return;
  }
  same('starter ' + s.id, s.composition);
});
['blues-a.md', 'canon-d.md', 'bwv846-harmony-only.md', 'bwv847-harmony-only.md', 'bwv853-harmony-only.md', 'bwv862-harmony-only.md'].forEach((f) => {
  const t = readFileSync(join(root, 'composition', f), 'utf8');
  const m = /^## Composition[^\n]*\n([\s\S]*?)(?=^##\s)/m.exec(t);
  if (!m) problems.push(f + ' has no Composition section');
  else same(f, m[1]);
});
const amb = readFileSync(join(root, 'composition/ambient-cm.md'), 'utf8');
const quote = amb.split('\n').filter((l) => /^\s*>/.test(l)).map((l) => l.replace(/^\s*>\s?/, '')).join(' ');
same('ambient blockquote', quote);
same('en dash', 'C–F–G');
check(JSON.stringify(legacy('A slow melody')) === '[]' && JSON.stringify(syms('A slow melody')) === '[]', 'article A');

const alone = {}; alone.globalThis = alone; vm.createContext(alone);
load('create/assembly.js', alone);
check(alone.NCAssembly.takeSeconds('C Am F G') === 120, 'assembly alone keeps the 120s default');
check(alone.NCAssembly.statedSeconds('tempo 90, 32 bars') === null, 'assembly alone does not know tempo yet');
const both = {}; both.globalThis = both; vm.createContext(both);
load('create/language.js', both);
load('create/assembly.js', both);
const A = both.NCAssembly;
check(A.statedSeconds('32 bars, tempo 90') === A.statedSeconds('32 bars, 90 BPM'), 'tempo 90 states the same length as 90 BPM');
check(A.statedSeconds('32 bars q90') === A.statedSeconds('32 bars, 90 BPM'), 'q90 states the same length');
check(A.statedSeconds('tempo 90 C Am') === null, 'tempo alone is not a length');
check(A.statedSeconds('"32 bars 90 BPM" C') === null, 'a quoted length is not a length');
check(A.statedPulse('steady break beat') === true, 'steady is still a pulse word');
check(A.statedPulse('# steady\nlet it breathe') === false, 'a comment is not a pulse');

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}
const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  console.log('language page half skipped (Chrome and Node 22, or --experimental-websocket)');
} else {
  const PETER = 'Tempo 90, T1 - [Cm(4) fm9, gm7]loop(4), LP 500->200: T2 - steady break beat, T3 - notes, create melody, dorian.';
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2' };
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    try { const body = await readFile(join(root, path)); res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' }); res.end(body); }
    catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port, dbg = 9900 + Math.floor(Math.random() * 150);
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-lang-'))}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  try {
    let target;
    for (let i = 0; i < 80 && !target; i++) { try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); } }
    const ws = new WebSocket(target.webSocketDebuggerUrl); let seq = 0; const pending = new Map();
    ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {}); } });
    await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
    const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
    const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
    await send('Page.enable'); await send('Runtime.enable');
    async function shot(name, width, height, mobile) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: !!mobile });
      await sleep(80);
      await ev("document.getElementById('write').scrollIntoView({block:'start'})");
      await sleep(40);
      const r = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); return {x: 0, y: Math.max(0, a.top + scrollY - 8), width: " + width + ", height: Math.ceil(a.height + 16)}; })()");
      const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.width, height: r.height, scale: 1 }, captureBeyondViewport: true });
      try {
        mkdirSync('/opt/cursor/artifacts', { recursive: true });
        writeFileSync(join('/opt/cursor/artifacts', name), Buffer.from(img.data, 'base64'));
      } catch (e) {}
    }
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
    for (let i = 0; i < 150 && !(await ev("document.body && document.body.getAttribute('data-ready') === '1'")); i++) await sleep(100);
    check(await ev("document.body.getAttribute('data-ready') === '1'"), 'page did not become ready');
    const shown = await ev(`(() => {
      var el = document.getElementById('comp');
      el.value = ${JSON.stringify(PETER)};
      el.dispatchEvent(new Event('input', {bubbles: true}));
      var iread = document.getElementById('iread');
      var prog = document.getElementById('prog').textContent;
      return {
        iread: iread.textContent, hidden: iread.hidden,
        chords: document.querySelectorAll('#prog .ch').length,
        prog: prog, lcut: document.getElementById('lcut').value,
        found: NC.findChords(el.value).length
      };
    })()`);
    check(shown && shown.hidden === false && shown.iread.indexOf('I read  q90; [Cm(4) Fm9 Gm7]x4; lp500') === 0, 'I read line: ' + (shown && shown.iread));
    check(shown && shown.iread.indexOf('->200 is a ramp') >= 0 && shown.iread.indexOf('left for the AI') >= 0, 'I read notes');
    check(shown && shown.chords === 12 && shown.found === 12, 'twelve chords, got ' + JSON.stringify(shown));
    check(shown && shown.prog.indexOf('Cm') >= 0 && shown.prog.indexOf('Fm9') >= 0 && shown.prog.indexOf('Gm7') >= 0, 'progression shows the chords');
    check(shown && shown.lcut === '75', 'lowpass dial ' + (shown && shown.lcut));
    await shot('create-peter-desktop.png', 1280, 900, false);
    await shot('create-peter-phone.png', 390, 844, true);
    const seed = await ev(`(() => {
      NC.reuseSeed(4182);
      var via = document.getElementById('comp').value.indexOf('sd 4182') >= 0 && document.getElementById('iread').textContent.indexOf('sd4182') >= 0;
      var btn = document.getElementById('plan-seed');
      btn.hidden = false; btn.textContent = 'Seed 99';
      btn.click();
      return { via: via, value: document.getElementById('comp').value, iread: document.getElementById('iread').textContent };
    })()`);
    check(seed && seed.via, 'reuseSeed writes sd 4182');
    check(seed && /sd 99\b/.test(seed.value) && seed.iread.indexOf('sd99') >= 0, 'clicking Seed writes sd 99: ' + (seed && seed.value));
    const old = await ev(`(() => {
      var s = document.getElementById('starter'); s.value = '2'; s.onchange();
      var n = document.querySelectorAll('#prog .ch').length;
      var clock = NC.read().clock;
      s.value = 'blank'; s.onchange();
      return { n: n, clock: clock, empty: document.getElementById('comp').value, ireadHidden: document.getElementById('iread').hidden, lcut: document.getElementById('lcut').value };
    })()`);
    check(old && old.n === 12 && old.clock === 'legacy', 'blues starter stays a legacy clock of 12, got ' + JSON.stringify(old));
    check(old && old.empty === '' && old.ireadHidden === true && old.lcut === '0', 'blank page clears the reading and the hack');
    const notesShown = await ev(`(() => {
      var el = document.getElementById('comp');
      el.value = "72 BPM\\n[Cm Fm9 Gm7]\\nn C5(2) Eb5 G5 Bb4\\nnotes C4 Eb4 G4(2)\\narp Cm9 pendulum 16ths C5 Eb5\\nC5";
      el.dispatchEvent(new Event('input', {bubbles: true}));
      return document.getElementById('iread').textContent;
    })()`);
    check(notesShown && notesShown.indexOf('I read  q72; [Cm Fm9 Gm7]; notes C5(2) Eb5 G5 Bb4; notes C4 Eb4 G4(2); arp Cm9 pendulum 16ths C5 Eb5') === 0, 'page echoes notes and arp pitches: ' + notesShown);
    check(notesShown && notesShown.indexOf('C5 is not a chord.') >= 0 && notesShown.split('is not a chord').length === 2, 'page still reports a pitch that is not on a notes or arp line: ' + notesShown);
    const surprise = await ev(`(() => { var bad = []; for (var s = 1; s <= 40; s++) { var P = NC.makeSurprise(s * 2654435761 >>> 0); if (!P) { bad.push('none'); continue; } var f = NC.findChords(P.composition); if (f.length !== P.chords.length || f.some(function (c, i) { return c.sym !== P.chords[i]; })) bad.push(P.composition); } return bad; })()`);
    check(surprise && surprise.length === 0, 'Surprise chords changed: ' + JSON.stringify(surprise && surprise.slice(0, 3)));
    check(await ev("NCAssembly.statedSeconds('32 bars, tempo 90') === NCAssembly.statedSeconds('32 bars 90 BPM')"), 'page length agrees');
    ws.close();
  } finally { proc.kill(); server.close(); }
}

if (problems.length) {
  console.error(problems.slice(0, 30).join('\n'));
  process.exit(1);
}
console.log('language ok (' + rows.length + ' vectors)');
