// Arp(n) on Create. The pattern list is ASTRID's arp-patterns.json
// (psemmelhack/NetComposer-Synth, lib/synth-audio/arp-patterns.json),
// copied to create/arp-patterns.json. The numbers are permanent: Arp(5) is
// Random forever. These checks pin every num/id pair, keep the copy inside
// chord-library.js the same as the file, and lock the note orders, Walk, and
// Euclidean to values ASTRID main (288e9c2) gives for the same input.
import { readFileSync } from 'fs';
import vm from 'vm';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const PINNED = [
  [0, 'off'], [1, 'up'], [2, 'down'], [3, 'up-down'], [4, 'up-down-repeat'], [5, 'random'],
  [6, 'as-played'], [7, 'outside-in'], [8, 'inside-out'], [9, 'pendulum'], [10, 'blossom-up'],
  [11, 'blossom-down'], [12, 'low-and-up'], [13, 'low-and-down'], [14, 'hi-and-up'],
  [15, 'hi-and-down'], [16, 'walk'], [17, 'euclidean'], [18, 'down-up']
];
const file = JSON.parse(readFileSync(join(root, 'create/arp-patterns.json'), 'utf8'));
check(file.format === 'netcomposer.arp-patterns' && file.version === 1, 'arp-patterns.json format and version');
const pairs = file.patterns.map((p) => [p.num, p.id]);
// A new pattern may be added at the end with the next number. Nothing pinned may move.
check(same(pairs.slice(0, PINNED.length), PINNED), 'num/id pairs moved: ' + JSON.stringify(pairs));
pairs.forEach((p, k) => check(p[0] === k, 'numbers run 0, 1, 2 with no gap: ' + JSON.stringify(p)));
check(new Set(file.patterns.map((p) => p.id)).size === file.patterns.length, 'ids are unique');

try { execFileSync(process.execPath, [join(root, 'tools/sync-arp-patterns.mjs'), '--check'], { stdio: 'pipe' }); }
catch (e) { problems.push(String(e.stderr || e.message).trim()); }

const chords = JSON.parse(readFileSync(join(root, 'create/chords.json'), 'utf8'));
const QUALS = {};
Object.keys(chords.chords).forEach((k) => { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });
const known = (q) => q in QUALS;
const sb = { Math, JSON, Map, Set, Number, console };
sb.globalThis = sb;
vm.createContext(sb);
['create/chord-library.js', 'create/language.js', 'create/nc-synth.js'].forEach((f) => vm.runInContext(readFileSync(join(root, f), 'utf8'), sb));
const C = sb.NCChords, L = sb.NCLanguage, S = sb.NCSynth;
check(same(C.ARP_REGISTRY, file), 'chord-library.js block equals create/arp-patterns.json');
check(same(C.ARP_ORDERS.map((o) => o.value), PINNED.map((p) => p[1])), 'ARP_ORDERS follow the numbers');

// resolveArpId, the same answers as ASTRID's.
const resolve = {
  5: 'random', '5': 'random', ' 10 ': 'blossom-up', '17': 'euclidean', 0: 'off', 18: 'down-up',
  'Blossom Up': 'blossom-up', 'blossom_up': 'blossom-up', 'BLOSSOM-UP': 'blossom-up', 'Low&Up': 'low-and-up',
  'low & up': 'low-and-up', 'Hi&Down': 'hi-and-down', 'high and up': 'hi-and-up', 'Down/Up (legacy)': 'down-up',
  'Up/Down': 'up-down', 'Up/Down Repeat': 'up-down-repeat', drunk: 'walk', euclid: 'euclidean', chord: 'off',
  none: 'off', order: 'as-played', 'thumb-up': 'low-and-up', 'Pinky Down': 'hi-and-down', 'As Played': 'as-played',
  'Off — chord': 'off', inside_out: 'inside-out'
};
Object.keys(resolve).forEach((k) => check(C.resolveArpId(k) === resolve[k], 'resolveArpId ' + JSON.stringify(k) + ' = ' + C.resolveArpId(k)));
check(C.resolveArpId(5) === 'random' && C.resolveArpId(1.5) === null && C.resolveArpId(99) === null && C.resolveArpId(-1) === null, 'numbers');
check(C.resolveArpId('zzz') === null && C.resolveArpId('') === null && C.resolveArpId('19') === null && C.resolveArpId(null) === null, 'unknown is null');
check(C.arpNum('random') === 5 && C.arpNum('euclidean') === 17, 'arpNum');

// Orders on five notes and four notes. ASTRID gives the same.
const five = [0, 1, 2, 3, 4], four = [0, 1, 2, 3];
const orders5 = {
  'blossom-up': [2, 3, 1, 4, 0], 'blossom-down': [2, 1, 3, 0, 4],
  'low-and-up': [0, 1, 0, 2, 0, 3, 0, 4], 'low-and-down': [0, 4, 0, 3, 0, 2, 0, 1],
  'hi-and-up': [4, 0, 4, 1, 4, 2, 4, 3], 'hi-and-down': [4, 3, 4, 2, 4, 1, 4, 0],
  walk: [0, 1, 2, 3, 4], euclidean: [0, 1, 2, 3, 4]
};
Object.keys(orders5).forEach((o) => check(same(C.arpeggioSequence(five, o), orders5[o]), o + ' on five ' + C.arpeggioSequence(five, o)));
check(same(C.arpeggioSequence(four, 'blossom-up'), [1, 2, 0, 3]) && same(C.arpeggioSequence(four, 'blossom-down'), [1, 0, 2, 3]), 'blossom on four starts at the lower middle');

// Walk: ASTRID's seeded steps, five notes.
const walk = [0, 1, 0, 4, 0, 0, 0, 1, 1, 0, 1, 2, 3, 3, 2, 3, 4, 3, 4, 0, 0, 4, 3, 2];
check(same(walk.map((_, s) => C.walkIndex(5, s)), walk), 'walk steps ' + walk.map((_, s) => C.walkIndex(5, s)));
check(C.walkIndex(5, 3) === 4, 'walk goes back to an earlier step');

// Euclidean.
check(C.euclidPattern(C.euclidOf(null)) === 'x.x.xx.x', '5 of 8');
check(C.euclidPattern(C.euclidOf({ hits: 3, steps: 8, rotate: 2 })) === '.x..x.x.', '3 of 8 turned 2');
check(same(C.euclidOf({ hits: 20, steps: 30, rotate: -1 }), { hits: 16, steps: 16, rotate: 15 }), 'clamp to 16 steps');
check(C.euclidPattern(C.euclidOf({ hits: 0, steps: 8 })) === '........', 'no hits is silence');
const eu = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) => C.arpIndex('euclidean', 3, s, C.euclidOf(null)));
check(same(eu, [0, null, 1, null, 2, 0, null, 1, 2]), 'euclidean advances on hits ' + JSON.stringify(eu));

// Language: Arp(n) is the order on an arp line, and starts one on its own.
function arpOf(line) {
  const p = L.parse(line, { known });
  return { arp: p.arp[0], echo: (p.syntax.filter((s) => s.kind === 'arp')[0] || {}).text, notes: p.notes };
}
let r = arpOf('Arp(5) Cm9');
check(r.arp && r.arp.order === 'random' && r.arp.chord === 'Cm9' && r.echo === 'arp Cm9 random 16ths', 'Arp(5) Cm9 ' + JSON.stringify(r));
r = arpOf('arp Am7 Arp(10) 8ths');
check(r.arp.order === 'blossom-up' && r.arp.rate === '8ths', 'Arp(10) on an arp line');
r = arpOf('arp Cm9 Arp(blossom-up)');
check(r.arp.order === 'blossom-up', 'Arp(blossom-up)');
r = arpOf('Arp(Low&Up) Am7 2oct');
check(r.arp.order === 'low-and-up' && r.arp.octaves === 2, 'Arp(Low&Up)');
r = arpOf('arp Cm9 hi-and-down');
check(r.arp.order === 'hi-and-down', 'a bare id is an order on an arp line');
r = arpOf('Arp(17, 5, 8) Am7');
check(r.arp.order === 'euclidean' && same(r.arp.euclid, { hits: 5, steps: 8, rotate: 0 }) && r.echo === 'arp Am7 Arp(17, 5, 8, 0) 16ths', 'Arp(17, 5, 8) ' + JSON.stringify(r));
r = arpOf('Arp(17, 3, 8, 2) Am7');
check(same(r.arp.euclid, { hits: 3, steps: 8, rotate: 2 }) && r.notes.length === 0, 'Arp(17, 3, 8, 2)');
r = arpOf('Arp(euclid) Am7');
check(same(r.arp.euclid, { hits: 5, steps: 8, rotate: 0 }), 'Euclidean with no numbers is 5 of 8');
r = arpOf('Arp(zzz) Cm9');
check(r.arp.order === 'off' && /`Arp\(zzz\)` is not an arp pattern/.test(r.notes.join(' ')) && r.echo === 'arp Cm9 Arp(0) 16ths', 'unknown is off, with a note');
r = arpOf('Arp(99) Cm9');
check(r.arp.order === 'off', 'an unused number is off');
r = arpOf('Arp(5, 3) Cm');
check(r.arp.order === 'random' && /Only `Arp\(17/.test(r.notes.join(' ')), 'extra numbers on another pattern are noted');
r = arpOf('Arp(17, x, 8) Cm');
check(r.arp.euclid.hits === 5 && /not a whole number/.test(r.notes.join(' ')), 'a word for hits keeps the usual hits');
r = arpOf('Arp(16) Cm9@piano');
check(r.arp.order === 'walk' && r.arp.instrument === 'piano', 'Arp(16)@piano');
r = arpOf('arp Cm9 pendulum');
check(r.arp.order === 'pendulum' && r.echo === 'arp Cm9 pendulum 16ths', 'old words do not change');
r = arpOf('arp Cm9 chord');
check(r.arp.order === 'up', 'an alias is not a bare order word');

// The schedule: rests on Euclidean off-steps, the chord on Off.
function events(line) { return S.scheduleLine(S.readLine(line), null, 1); }
const e58 = events('Arp(17, 5, 8) Am7');
check(e58.length === 10, 'one bar of 16ths at 5 of 8 is 10 notes, got ' + e58.length);
const beat = 60 / 96, starts = e58.slice(0, 5).map((e) => Math.round(e.start / (beat / 4)));
check(same(starts, [0, 2, 4, 5, 7]), 'hits fall on x.x.xx.x ' + starts);
const off = events('Arp(0) Cm');
check(off.length === 16 * 3 && off[0].start === off[2].start, 'Off plays the whole chord on each step');
const w = events('Arp(16) Cm');
check(w.length === 16, 'walk plays every step');
const up = events('arp Cm up').map((e) => e.midi), one = events('Arp(1) Cm').map((e) => e.midi);
check(same(up, one) && up.length === 16, 'Arp(1) is up');
const rand = events('Arp(5) Cm').map((e) => e.midi), randWord = events('arp Cm random').map((e) => e.midi);
check(same(rand, randWord), 'Arp(5) is the same seeded random as the word random');
check(S.readLine('Arp(17, 3, 8, 2) Cm').arpWords.indexOf('euclidean 3 of 8, turned 2') >= 0, 'arp words name the rhythm');

// The help table is the same list, in number order.
const help = readFileSync(join(root, 'create/help/index.html'), 'utf8');
const rows = [...help.matchAll(/<tr><td>(\d+)<\/td><td>([^<]*)<\/td><td><code>([^<]*)<\/code><\/td><\/tr>/g)].map((m) => [+m[1], m[2].replace(/&amp;/g, '&'), m[3]]);
check(same(rows, file.patterns.map((p) => [p.num, p.name, p.id])), 'help table matches arp-patterns.json ' + JSON.stringify(rows));
check(/id="arp-numbers"/.test(help) && /Arp\(17, hits, steps, rotate\)/.test(help), 'help explains Arp(number) and Euclidean');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('arp patterns ok (' + file.patterns.length + ')');
