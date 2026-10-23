// The arp chord library is a port of chords.ts from
// psemmelhack/NetComposer-Synth branch replit-changes. These checks lock
// the voicing, the pool, and the note orders to that file.
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const sb = { Math, JSON, Map, Set, console };
sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/chord-library.js'), 'utf8'), sb);
const C = sb.NCChords;

check(C.CHORD_LIBRARY.length === 55, '55 definitions, got ' + C.CHORD_LIBRARY.length);
const counts = {};
C.CHORD_LIBRARY.forEach((c) => { counts[c.category] = (counts[c.category] || 0) + 1; });
check(counts.Essential === 9 && counts.Seventh === 9 && counts.Extended === 14 && counts.Altered === 9 && counts.Experimental === 14, 'category counts ' + JSON.stringify(counts));

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check(same(C.chordVoicing(60, 'major-9', 0, 'compact'), [60, 62, 64, 67, 71]), 'C4 major 9 compact');
check(same(C.chordVoicing(60, 'major-9', 0, 'wide'), [60, 62, 64, 67, 83]), 'C4 major 9 wide');
check(same(C.chordVoicing(60, 'major-9', 0, 'wider'), [60, 62, 76, 79, 95]), 'C4 major 9 wider');
check(same(C.chordVoicing(60, 'major-9', 0, 'maximum'), [60, 74, 88, 103, 119]), 'C4 major 9 maximum');
check(same(C.chordVoicing(60, 'major', 1, 'compact'), [64, 67, 72]), 'C major first inversion');
check(same(C.chordVoicing(60, 'major', 2, 'compact'), [67, 72, 76]), 'C major second inversion');
check(same(C.chordVoicing(60, 'major', 5, 'compact'), C.chordVoicing(60, 'major', 2, 'compact')), 'inversion clamps to N-1');

const orders = {
  up: [0, 1, 2, 3, 4],
  down: [4, 3, 2, 1, 0],
  'up-down': [0, 1, 2, 3, 4, 3, 2, 1],
  'up-down-repeat': [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
  'outside-in': [0, 4, 1, 3, 2],
  'inside-out': [2, 1, 3, 0, 4],
  pendulum: [2, 3, 4, 3, 2, 1, 0, 1],
  'down-up': [4, 3, 2, 1, 0, 1, 2, 3]
};
Object.keys(orders).forEach((name) => {
  check(same(C.arpeggioSequence([0, 1, 2, 3, 4], name), orders[name]), name + ' sequence ' + C.arpeggioSequence([0, 1, 2, 3, 4], name));
});
check(same(C.arpeggioSequence([4, 0, 2, 0], 'as-played'), [4, 0, 2]), 'as-played keeps pool order and drops duplicate MIDI');
check(same(C.arpeggioSequence([0, 1, 2, 3, 4], 'random'), [0, 1, 2, 3, 4]), 'random is not a sorted-sequence order');
check(same(C.arpeggioPool([0, 7, 12], 2), [0, 7, 12, 19, 24]), 'octave repetitions drop duplicate MIDI values');
check(same(C.arpeggioPool([120, 127], 4), [120, 127]), 'repetitions above MIDI 127 are omitted');
check(same(C.fitVoicing([-12, 0]), [0, 12]), 'fitVoicing shifts the whole voicing by octaves');
let threw = false;
try { C.fitVoicing([0, 128]); } catch (e) { threw = e && e.name === 'RangeError'; }
check(threw, 'a voicing wider than MIDI throws');

check(C.resolveChordId('nope') === 'major' && C.resolveChordId('Major 7th') === 'major-7', 'resolveChordId keeps the legacy fallback');
check(C.idForQuality('nope') == null && C.idForQuality('7#11') == null && C.idForQuality('7b13') == null, 'unknown qualities are not silently major');
check(JSON.stringify(C.UNMAPPED_QUALITIES) === JSON.stringify(['7#11', '7b13']), 'unmapped composition qualities');
check(C.idForQuality('maj7#5') === 'augmented-major-7', 'maj7#5 maps to augmented-major-7');
check(same(C.getChord('augmented-major-7').intervals, [0, 4, 8, 11]), 'augmented major 7 intervals');
check(C.idForQuality('7#5') === '7-sharp5' && C.idForQuality('5') === 'power' && C.idForQuality('quartal-3') === 'quartal-3', 'library symbols that the composition set does not gather');
check(C.idForSymbol('Fm9') === 'minor-9' && C.idForSymbol('Bb') === 'major', 'symbols split into root and quality');

const slash = C.voicedChord(60, 'minor', 0, 'compact', 7);
const plain = C.chordVoicing(60, 'minor', 0, 'compact');
check(same(plain, [60, 63, 67]) && same(slash, [60, 63, 67, 55]), 'slash bass sits an octave under the voicing and a plain chord does not change');

const chords = JSON.parse(readFileSync(join(root, 'create/chords.json'), 'utf8'));
const quals = {};
Object.keys(chords.chords).forEach((k) => { quals[k.replace(/^[A-G](#|b)?/, '')] = 1; });
Object.keys(quals).forEach((q) => { if (!C.compositionKnown(q)) problems.push('composition quality missing from the library map: ' + q); });
check(Object.keys(quals).length === 35, '35 composition qualities');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('chord-library ok');
