// The Composition language, first slice. tests/language-vectors.json is the
// contract nc-performer should adopt. This file also checks that the old
// chord finder and the old assembly clock still agree where the slice says
// they must. The page half needs Chrome; the rest always runs.
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync } from 'fs';
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
    unmapped: p.unmapped || [],
    tracks: (p.tracks || []).map((t) => ({
      n: t.n, label: t.label, kind: t.kind, instrument: t.instrument || '',
      beats: t.beats, fmDepth: t.fmDepth == null ? null : t.fmDepth,
      played: (t.played || []).map((e) => ({
        kind: e.kind, symbol: e.symbol || null, beats: e.beats, bars: e.bars, seconds: e.seconds
      }))
    })),
    synth: !!p.synth
  };
}
const rows = JSON.parse(readFileSync(join(root, 'tests/language-vectors.json'), 'utf8'));
rows.forEach((row) => {
  const got = project(row.text);
  ['bpm', 'clock', 'seed', 'meter', 'gather', 'played', 'hacks', 'words', 'notes', 'iread'].forEach((k) => {
    if (JSON.stringify(got[k]) !== JSON.stringify(row[k])) problems.push(row.name + ' ' + k + '\n  got ' + JSON.stringify(got[k]));
  });
  ['arp', 'unmapped', 'tracks', 'synth'].forEach((k) => {
    if (k in row && JSON.stringify(got[k]) !== JSON.stringify(row[k])) problems.push(row.name + ' ' + k + '\n  got ' + JSON.stringify(got[k]));
  });
  if (row.place) {
    const placed = L.place(L.parse(row.text, { known }).played, row.place_caps);
    if (JSON.stringify(placed) !== JSON.stringify(row.place)) problems.push(row.name + ' place ' + JSON.stringify(placed));
  }
});
// Every I-read note template carries a typeable example in backticks.
const langSrc = readFileSync(join(root, 'create/language.js'), 'utf8');
function callArgs(name) {
  const out = [];
  const needle = name + '(';
  let i = 0;
  while ((i = langSrc.indexOf(needle, i)) !== -1) {
    const before = langSrc.slice(Math.max(0, i - 12), i);
    if (/function\s+$/.test(before)) { i += needle.length; continue; }
    let j = i + needle.length, depth = 1;
    while (j < langSrc.length && depth) {
      const c = langSrc[j];
      if (c === '(') depth++;
      else if (c === ')') depth--;
      j++;
    }
    out.push(langSrc.slice(i + needle.length, j - 1).trim());
    i = j;
  }
  return out;
}
function hasCode(expr) { return /`[^`]+`/.test(expr); }
['err', 'note', 'say'].forEach((name) => {
  callArgs(name).forEach((args) => {
    if (!/['"`]/.test(args)) return;
    check(hasCode(args), name + '() template has no code span: ' + args.slice(0, 220));
  });
});
['codeList', 'openNote'].forEach((name) => {
  const m = new RegExp('function ' + name + '\\([\\s\\S]*?\\n    \\}').exec(langSrc);
  check(m && hasCode(m[0]), name + ' template has no code span');
});
check(/function lengthNote[\s\S]*?codeList\(/.test(langSrc), 'length notes are built from code spans');
check(!/No tempo written/.test(langSrc), 'the default tempo is not an I-read note');
const probes = [
  'Cm', '[Cm(4) Fm9]x4', '90 BPM [Cm(4) Fm9(2|)]x4', 'Cmaj13b', 'Cm, let it breathe',
  'C5', 'a slow melody', 'x4', 'loop(2.5)', '[ [Cm] ]', '[Cm lp500]', 'Cm(?)',
  '"Cm', 'seed 1 seed 2 C', '90 BPM 80 BPM C', '90 BPM\nat bar 5 100 BPM\nC(4)',
  'lp500 lp200 C', 'arp C7#11', '[C(1) D(1) | E(2)]', '90 BPM'
];
probes.concat(rows.map((r) => r.text)).forEach((text) => {
  L.parse(text, { known }).notes.forEach((n) => {
    check(/`[^`]+`/.test(n), 'note missing a code example: ' + n);
  });
});
const cm = L.parse('Cm', { known });
check(cm.iread.indexOf('96 BPM · Cm 1 bar* · 4 beats · 2.5 s') === 0, 'Cm echo: ' + cm.iread);
check(!cm.notes.some((n) => /tempo/i.test(n)) && cm.notes.some((n) => n.indexOf('`Cm(4)`') >= 0 && n.indexOf('`Cm(2|)`') >= 0), 'Cm notes keep the length and drop the tempo: ' + JSON.stringify(cm.notes));
check(L.parse('3/4 Cm', { known }).iread.indexOf('96 BPM · Cm 1 bar* · 3 beats · ~1.9 s · 3/4') === 0, '3/4 sketch: ' + L.parse('3/4 Cm', { known }).iread);
check(L.beatsInBar('6/8') === 3 && L.beatsInBar('4/4') === 4 && L.beatsInBar('3/4') === 3 && L.beatsInBar('2/2') === 4 && L.beatsInBar('5/8') === 2.5 && L.beatsInBar('7/8') === 3.5 && L.beatsInBar('12/8') === 6, '6/8 is 3 beats and the other meters stay');
check(L.parse('6/8 Cm(1|)', { known }).played[0].bars === 1 && L.parse('6/8 Cm(1|)', { known }).played[0].seconds === 1.875 && L.parse('6/8 Cm(1|)', { known }).iread.indexOf('96 BPM · Cm 1 bar · 3 beats · ~1.9 s · 6/8') === 0, '6/8 bar is three beats');
check(L.parse('6/8 Cm(3)', { known }).played[0].seconds === 1.875 && L.parse('6/8 Cm(6)', { known }).played[0].seconds === 3.75, '(3) is one bar of 6/8 and (6) is two');
check(L.parse('5/8 Cm(1|)', { known }).played[0].seconds === 1.563 && L.parse('5/8 Cm(1|)', { known }).iread.indexOf('2.5 beats') >= 0, '5/8 stays 2.5 beats');
check(L.parse('7/8 Cm(1|)', { known }).played[0].seconds === 2.188 && L.parse('2/2 Cm(1|)', { known }).played[0].seconds === 2.5 && L.parse('3/8 Cm(1|)', { known }).played[0].seconds === 0.938 && L.parse('12/8 Cm(1|)', { known }).played[0].seconds === 3.75, '7/8, 2/2, 3/8 and 12/8 stay on the quarter-note bar');
check(L.parse('3/4 Cm(2|)', { known }).played[0].seconds === 3.75 && L.parse('90 BPM 3/4 [Cm(3) | Fm(3)]', { known }).notes.length === 0, 'a bar in 3/4 is 3 beats');
check(L.parse('3/4 [Cm(2) | Fm(3)]', { known }).notes.some((n) => n.indexOf('not 3') >= 0), 'a short bar in 3/4 is still an error');
check(L.parse('4/4 Cm', { known }).meterWritten === true && L.parse('Cm', { known }).meterWritten === false && L.parse('"3/4" Cm', { known }).meterWritten === false, 'a written 4/4 is not the quiet default');
check(L.setTempo('Cm', 90) === '90 BPM Cm' && L.setTempo('90 BPM Cm', 96) === 'Cm' && L.setTempo('tempo 90 Cm', 100) === '100 BPM Cm' && L.setTempo('q90\nCm', 80) === '80 BPM\nCm', 'tempo field writes 90 BPM and 96 takes it away');
check(L.setTempo('3/4 Cm', 90) === '90 BPM 3/4 Cm' && L.setMeter('Cm', '3/4') === '3/4 Cm' && L.setMeter('90 BPM Cm', '6/8') === '90 BPM 6/8 Cm' && L.setMeter('90 BPM 3/4 Cm', '4/4') === '90 BPM Cm', 'meter field writes 3/4 after the tempo and 4/4 takes it away');
check(L.setMeter('3/4 Cm 6/8', '4/4') === 'Cm' && L.setMeter('Cm 6/8', '5/4') === 'Cm 5/4', 'setting 4/4 removes every written time');
check(L.parse(L.setMeter(L.setTempo('Cm', 72), '6/8'), { known }).bpm === 72 && L.parse(L.setMeter(L.setTempo('Cm', 72), '6/8'), { known }).meter === '6/8', 'the written statements are what the fields show');
const looped = L.parse('[Cm(4) Fm9]x4', { known });
check(looped.iread.indexOf('96 BPM · [Cm 4 beats, Fm9 1 bar*] ×4 · 32 beats · 20 s') === 0, 'loop echo: ' + looped.iread);
check(looped.notes.some((n) => n.indexOf('Write `Fm9(4)` for 4 beats or `Fm9(2|)` for 2 bars.') >= 0), 'length note names the chord: ' + JSON.stringify(looped.notes));
const set = L.parse('90 BPM [Cm(4) Fm9(2|)]x4', { known });
check(set.notes.length === 0 && set.iread.indexOf('90 BPM · [Cm 4 beats, Fm9 2 bars] ×4 · 48 beats · 32 s') === 0, 'written loop has no notes: ' + set.iread);
const typo = L.parse('Cmaj13b', { known });
check(typo.notes.some((n) => n.indexOf('Did you mean `Cmaj13`?') >= 0), 'typo suggests Cmaj13: ' + JSON.stringify(typo.notes));
const mixed = L.parse('Cm, let it breathe', { known });
check(mixed.words.join(' ').indexOf('let') >= 0 && mixed.notes.some((n) => n.indexOf('Words are left for the AI.') === 0 && n.indexOf('`"like this"`') >= 0), 'AI marking keeps a code span: ' + JSON.stringify(mixed.notes));

const peter = rows.find((r) => r.name === 'peter-line');
check(peter && peter.gather.join(',') === 'Cm,Fm9,Gm7' && peter.played.length === 12, 'peter line');
check(peter && peter.played[0].seconds === 2.667 && peter.played[1].seconds === null && peter.played[0].recording === peter.played[3].recording, 'peter durations and loop');
check(peter && peter.hacks[0] && peter.hacks[0].value === 500 && peter.hacks[0].ramp === 200, 'peter hack keeps the start');
check(peter && peter.iread.indexOf('90 BPM') === 0 && peter.iread.indexOf('×4') > 0 && peter.iread.indexOf('lp500') > 0, 'peter I read: ' + (peter && peter.iread));
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
check(notesEdge.iread.indexOf('notes C5(2) Eb5 G5 Bb4') >= 0 && notesEdge.iread.indexOf('`C5` is a pitch, not a chord.') >= 0 && notesEdge.iread.split('is a pitch').length === 2, 'a pitch on the next line is still not a chord, got ' + notesEdge.iread);
const twoNotes = L.parse('t1: notes C4(2) fm 1\nt2: notes E4(2) fm 4', { known });
check(twoNotes.tracks.length === 2 && twoNotes.tracks[0].kind === 'notes' && twoNotes.tracks[1].kind === 'notes' && twoNotes.tracks[0].fmDepth === 1 && twoNotes.tracks[1].fmDepth === 4 && twoNotes.played.length === 0, 'two notes tracks keep separate FM depths');
check(L.parse('Tempo 90, T1 - [Cm(4) fm9, gm7]loop(4)', { known }).tracks.length === 0, 'T1 without a colon is not a track');
check(L.parse('Cm(4|) @synth', { known }).synth === true && L.parse('Cm(4|) @synth', { known }).gather.length === 0 && L.parse('Cm(4|) @synth', { known }).played.length === 1, '@synth on an unlabelled chord line is not gathered');
const arpTrack = L.parse('t1: Cm(4|) Fm(4|)\nt2: arp fm 3', { known });
check(arpTrack.tracks.length === 2 && arpTrack.tracks[1].kind === 'arp' && arpTrack.tracks[1].fmDepth === 3 && arpTrack.tracks[1].beats === 32, 'an arp track follows the other track and keeps its own FM, got ' + JSON.stringify(arpTrack.tracks.map((t) => [t.kind, t.fmDepth, t.beats])));

const arpPitches = L.parse('arp Cm9 pendulum 16ths C5 Eb5 G5', { known });
check(arpPitches.arp[0].chord === 'Cm9' && arpPitches.arp[0].order === 'pendulum' && arpPitches.iread === 'arp Cm9 pendulum 16ths C5 Eb5 G5' && arpPitches.notes.length === 0, 'pitches on an arp line are not failed chords, got ' + arpPitches.iread);
check(L.parse('C5', { known }).iread.indexOf('`C5` is a pitch, not a chord.') >= 0 && L.parse('steady', { known }).iread.indexOf('Words are left for the AI.') >= 0, 'a real non-chord is still reported');
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
starters.forEach((s) => same('starter ' + s.id, s.composition));
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
    check(await ev("(() => { var a = document.getElementById('comp-help'); return !!(a && a.getAttribute('aria-label') === 'How to write a composition' && a.getAttribute('href') === '/create/help/'); })()"), 'composition help link');
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
    check(shown && shown.hidden === false && shown.iread.indexOf('I read  90 BPM') === 0 && shown.iread.indexOf('×4') > 0, 'I read line: ' + (shown && shown.iread));
    check(shown && shown.iread.indexOf('in Live') >= 0 && shown.iread.indexOf('left for the AI') >= 0, 'I read notes: ' + (shown && shown.iread));
    check(shown && shown.chords === 3 && shown.found === 12 && shown.prog.indexOf('×4') >= 0, 'one group of three, played twelve times, got ' + JSON.stringify(shown));
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
    check(notesShown && notesShown.indexOf('I read  72 BPM') === 0 && notesShown.indexOf('notes C5(2) Eb5 G5 Bb4') > 0 && notesShown.indexOf('arp Cm9 pendulum 16ths C5 Eb5') > 0, 'page echoes notes and arp pitches: ' + notesShown);
    check(notesShown && notesShown.indexOf('C5 is a pitch, not a chord.') >= 0 && notesShown.split('is a pitch').length === 2 && notesShown.indexOf('notes C5') >= 0, 'page still reports a pitch that is not on a notes or arp line: ' + notesShown);
    async function shotPlay(name, width, height, mobile) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: !!mobile });
      await sleep(80);
      await ev("document.getElementById('write').scrollIntoView({block:'start'})");
      await sleep(40);
      const r = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); var b = document.getElementById('play-s').getBoundingClientRect(); var top = Math.max(0, a.top + scrollY - 8); var bot = b.bottom + scrollY + 12; return {x: 0, y: top, width: " + width + ", height: Math.ceil(bot - top)}; })()");
      const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.width, height: r.height, scale: 1 }, captureBeyondViewport: true });
      try { mkdirSync('/opt/cursor/artifacts', { recursive: true }); writeFileSync(join('/opt/cursor/artifacts', name), Buffer.from(img.data, 'base64')); } catch (e) {}
    }
    async function put(text) {
      return ev(`(() => {
        var el = document.getElementById('comp');
        el.value = ${JSON.stringify(text)};
        el.dispatchEvent(new Event('input', {bubbles: true}));
        var codes = Array.prototype.map.call(document.querySelectorAll('#iread code'), function (c) { return c.textContent; });
        var times = document.querySelector('#prog .times');
        var tempo = document.getElementById('tempo'), meter = document.getElementById('meter');
        return {
          chips: document.querySelectorAll('#prog .ch').length,
          times: times ? times.textContent : '',
          meta: document.getElementById('progmeta').textContent,
          iread: document.getElementById('iread').textContent,
          hidden: document.getElementById('iread').hidden,
          codes: codes,
          links: Array.prototype.map.call(document.querySelectorAll('#iread a.how'), function (a) { return a.getAttribute('href'); }),
          tempo: tempo.value, meter: meter.value,
          tempoDefault: tempo.classList.contains('deflt'),
          meterDefault: meter.classList.contains('deflt'),
          lens: Array.prototype.map.call(document.querySelectorAll('#prog .ch .len'), function (n) { return n.textContent; }),
          marks: document.querySelectorAll('#prog .beats .tick').length,
          barMarks: document.querySelectorAll('#prog .beats .tick.bar').length,
          grid: document.querySelectorAll('#arrange .arr-tick').length,
          gridBars: document.querySelectorAll('#arrange .arr-tick.bar').length,
          arrangeLen: (window.NCArrange && NCArrange.clip && NCArrange.clip('chords', 0) || {}).len || null
        };
      })()`);
    }
    const just = await put('Cm');
    check(just && just.chips === 1 && just.meta.indexOf('1 bar') >= 0 && just.meta.indexOf('4 beats') >= 0 && just.meta.indexOf('2.5 s') >= 0 && just.marks === 4 && just.barMarks === 1 && just.iread.indexOf('96 BPM') >= 0 && just.iread.indexOf('No tempo') < 0 && just.codes.indexOf('90 BPM') < 0 && just.codes.indexOf('Cm(4)') >= 0, 'Cm is one bar: ' + JSON.stringify(just));
    check(just && just.links.indexOf('/create/help/#durations') >= 0 && just.links.indexOf('/create/help/#tempo') < 0, 'Cm notes link to lengths, not a tempo reminder: ' + JSON.stringify(just && just.links));
    check(just && just.tempo === '96' && just.meter === '4/4' && just.tempoDefault === true && just.meterDefault === true, 'Cm leaves the header on the defaults: ' + JSON.stringify(just));
    await shotPlay('play-cm-desktop.png', 1280, 900, false);
    await shotPlay('play-cm-phone.png', 390, 844, true);
    const grp = await put('[Cm(4) Fm9]x4');
    check(grp && grp.chips === 2 && grp.times === '×4' && grp.meta.indexOf('32 beats') >= 0 && grp.meta.indexOf('8 bars') >= 0 && grp.meta.indexOf('20 s') >= 0 && grp.codes.indexOf('Fm9(4)') >= 0 && grp.codes.indexOf('Fm9(2|)') >= 0, 'loop group: ' + JSON.stringify(grp));
    await shotPlay('play-loop-desktop.png', 1280, 900, false);
    await shotPlay('play-loop-phone.png', 390, 844, true);
    const full = await put('90 BPM [Cm(4) Fm9(2|)]x4');
    check(full && full.chips === 2 && full.times === '×4' && full.meta.indexOf('48 beats') >= 0 && full.meta.indexOf('32 s') >= 0 && full.meta.indexOf('90 BPM') >= 0 && full.iread.indexOf('No tempo') < 0 && full.iread.indexOf('no length') < 0, 'written loop: ' + JSON.stringify(full));
    await shotPlay('play-written-desktop.png', 1280, 900, false);
    await shotPlay('play-written-phone.png', 390, 844, true);
    const bad = await put('Cmaj13b');
    check(bad && bad.chips === 0 && bad.codes.indexOf('Cmaj13') >= 0 && bad.iread.indexOf('Did you mean') >= 0 && bad.links.indexOf('/create/help/#chords') >= 0, 'typo: ' + JSON.stringify(bad));
    await shotPlay('play-typo-desktop.png', 1280, 900, false);
    await shotPlay('play-typo-phone.png', 390, 844, true);
    const words = await put('Cm, let it breathe');
    check(words && words.chips === 1 && words.iread.indexOf('let it breathe') >= 0 && words.iread.indexOf('Words are left for the AI') >= 0 && words.codes.indexOf('"like this"') >= 0 && words.links.indexOf('/create/help/#words') >= 0, 'words for the AI: ' + JSON.stringify(words));
    await shotPlay('play-words-desktop.png', 1280, 900, false);
    await shotPlay('play-words-phone.png', 390, 844, true);
    const blank = await put('');
    check(blank && blank.chips === 0 && blank.meta === '' && blank.hidden === true && blank.tempo === '96' && blank.meter === '4/4' && blank.tempoDefault && blank.meterDefault, 'empty field still shows 96 and 4/4: ' + JSON.stringify(blank));
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
    await ev('scrollTo(0,0)');
    await sleep(60);
    const hint = await ev(`(() => {
      var el = document.getElementById('syntax-hint');
      var lab = el.querySelector('.hint-label');
      var cs = getComputedStyle(lab);
      var page = document.documentElement;
      return {
        text: lab.textContent, first: el.firstChild === lab,
        size: cs.fontSize, track: cs.letterSpacing, transform: cs.textTransform,
        color: cs.color, weight: cs.fontWeight, display: cs.display,
        wide: page.scrollWidth > page.clientWidth + 1,
        field: document.getElementById('comp').value
      };
    })()`);
    check(hint && hint.field === '' && hint.text === 'Examples' && hint.first === true && hint.size === '11px' && hint.transform === 'uppercase' && hint.weight === '500' && hint.color === 'rgb(124, 133, 128)' && hint.display === 'inline' && hint.track !== 'normal' && hint.wide === false, 'empty field labels the hint as examples: ' + JSON.stringify(hint));
    const hintClip = await ev(`(() => {
      var a = document.querySelector('.comp-head').getBoundingClientRect();
      var b = document.getElementById('syntax-hint').getBoundingClientRect();
      var m = document.querySelector('main').getBoundingClientRect();
      return { x: Math.max(0, Math.floor(m.left + scrollX)), y: Math.max(0, Math.floor(a.top + scrollY - 10)), width: Math.ceil(m.width), height: Math.ceil(b.bottom - a.top + 18) };
    })()`);
    const hintImg = await send('Page.captureScreenshot', { format: 'png', clip: { x: hintClip.x, y: hintClip.y, width: hintClip.width, height: hintClip.height, scale: 1 }, captureBeyondViewport: true });
    try { mkdirSync('/opt/cursor/artifacts', { recursive: true }); writeFileSync(join('/opt/cursor/artifacts', 'examples-hint-phone.png'), Buffer.from(hintImg.data, 'base64')); } catch (e) {}
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await sleep(80);
    const clockBox = await ev(`(() => {
      var label = document.querySelector('.comp-head label').getBoundingClientRect();
      var clock = document.querySelector('.comp-clock').getBoundingClientRect();
      var labelText = document.querySelector('.comp-head label').textContent;
      return { label: labelText, clockW: clock.width, clockH: clock.height, right: clock.right >= label.right - 1, sameRow: Math.abs(clock.top - label.top) < 8, overlap: !(clock.left >= label.right - 1 || label.left >= clock.right - 1 || clock.top >= label.bottom || label.top >= clock.bottom) };
    })()`);
    check(clockBox && clockBox.label === 'Composition elements' && clockBox.clockW > 40 && clockBox.clockH > 8 && clockBox.sameRow && !clockBox.overlap, 'header clock sits beside the label: ' + JSON.stringify(clockBox));
    await shotPlay('play-empty-desktop.png', 1280, 900, false);
    await shotPlay('play-empty-phone.png', 390, 844, true);
    const waltz = await put('3/4 Cm');
    check(waltz && waltz.chips === 1 && waltz.meta.indexOf('3 beats') >= 0 && waltz.meta.indexOf('1 bar') >= 0 && waltz.marks === 3 && waltz.tempo === '96' && waltz.tempoDefault === true && waltz.meter === '3/4' && waltz.meterDefault === false && waltz.iread.indexOf('3/4') >= 0 && waltz.codes.indexOf('Cm(3)') >= 0, '3/4 is written and 96 stays the quiet default: ' + JSON.stringify(waltz));
    await shotPlay('play-34-desktop.png', 1280, 900, false);
    await shotPlay('play-34-phone.png', 390, 844, true);
    const six = await put('6/8 Cm(1|)');
    check(six && six.chips === 1 && six.lens[0] === '1 bar' && six.marks === 3 && six.barMarks === 1 && six.meta.indexOf('3 beats') >= 0 && six.meta.indexOf('1 bar') >= 0 && six.meta.indexOf('~1.9 s') >= 0 && six.iread.indexOf('96 BPM · Cm 1 bar · 3 beats · ~1.9 s · 6/8') >= 0, 'a bar of 6/8 is 3 beats on the timeline: ' + JSON.stringify(six));
    check(six && six.tempo === '96' && six.tempoDefault === true && six.meter === '6/8' && six.meterDefault === false && six.arrangeLen === 1.875 && six.grid === 3 && six.gridBars === 1, 'the header and the arrangement grid count 3 beats: ' + JSON.stringify(six && { tempo: six.tempo, meter: six.meter, len: six.arrangeLen, grid: six.grid, bars: six.gridBars }));
    const counted = await put('6/8 [Cm(2) G(1) | Am(3)]');
    check(counted && counted.lens.join(',') === '2 beats,1 beat,3 beats' && counted.marks === 6 && counted.barMarks === 1 && counted.meta.indexOf('6 beats') >= 0 && counted.meta.indexOf('2 bars') >= 0, '6/8 (n) counts and bar lines: ' + JSON.stringify(counted && { lens: counted.lens, marks: counted.marks, barMarks: counted.barMarks, meta: counted.meta }));
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1400, deviceScaleFactor: 1, mobile: false });
    await ev("document.getElementById('comp').value = '6/8 Cm(1|)'; document.getElementById('comp').dispatchEvent(new Event('input', {bubbles: true})); scrollTo(0,0);");
    await sleep(80);
    const sixBox = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); var b = document.getElementById('play-s').getBoundingClientRect(); return {y: Math.max(0, a.top + scrollY - 8), h: Math.ceil(b.bottom - a.top + 20), view: innerHeight}; })()");
    if (sixBox && sixBox.y + sixBox.h > sixBox.view) {
      await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: Math.ceil(sixBox.y + sixBox.h + 40), deviceScaleFactor: 1, mobile: false });
      await ev('scrollTo(0,0)');
      await sleep(40);
    }
    const sixClip = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); var b = document.getElementById('play-s').getBoundingClientRect(); return {x: 0, y: Math.max(0, a.top + scrollY - 8), width: 1280, height: Math.ceil(b.bottom - a.top + 20)}; })()");
    const sixImg = await send('Page.captureScreenshot', { format: 'png', clip: { x: sixClip.x, y: sixClip.y, width: sixClip.width, height: sixClip.height, scale: 1 }, captureBeyondViewport: true });
    try { mkdirSync('/opt/cursor/artifacts', { recursive: true }); writeFileSync(join('/opt/cursor/artifacts', 'six-eight-bar-desktop.png'), Buffer.from(sixImg.data, 'base64')); } catch (e) {}
    const edited = await ev(`(() => {
      var comp = document.getElementById('comp');
      comp.value = 'Cm';
      comp.dispatchEvent(new Event('input', { bubbles: true }));
      var tempo = document.getElementById('tempo');
      tempo.value = '90';
      tempo.dispatchEvent(new Event('blur'));
      var afterTempo = comp.value;
      var meter = document.getElementById('meter');
      meter.value = '3/4';
      meter.dispatchEvent(new Event('blur'));
      var afterMeter = comp.value;
      tempo.value = '96';
      tempo.dispatchEvent(new Event('blur'));
      var afterDefaultTempo = comp.value;
      meter.value = '4/4';
      meter.dispatchEvent(new Event('blur'));
      var afterDefaultMeter = comp.value;
      comp.value = 'tempo 72 Cm';
      comp.dispatchEvent(new Event('input', { bubbles: true }));
      var shown = tempo.value;
      tempo.value = '80';
      tempo.dispatchEvent(new Event('blur'));
      return { afterTempo: afterTempo, afterMeter: afterMeter, afterDefaultTempo: afterDefaultTempo, afterDefaultMeter: afterDefaultMeter, shown: shown, updated: comp.value, tempoClass: tempo.className, meterClass: meter.className };
    })()`);
    check(edited && edited.afterTempo === '90 BPM Cm' && edited.afterMeter === '90 BPM 3/4 Cm' && edited.afterDefaultTempo === '3/4 Cm' && edited.afterDefaultMeter === 'Cm', 'editing the fields writes and clears the statements: ' + JSON.stringify(edited));
    check(edited && edited.shown === '72' && edited.updated === '80 BPM Cm' && edited.tempoClass.indexOf('deflt') < 0 && edited.meterClass.indexOf('deflt') >= 0, 'a written tempo 72 shows in the field and an edit replaces it: ' + JSON.stringify(edited));
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
