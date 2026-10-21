// Chords play back to back unless the Composition writes the clock or asks for a gap.
import { readFileSync, readdirSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = {};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/assembly.js'), 'utf8'), sandbox);
const A = sandbox.NCAssembly;
const problems = [];
const near = (a, b) => Math.abs(a - b) < 0.0015;

// Organic: twelve chords over the 120 s default, clips of about 3 s.
const slots = A.chordSlots([{ count: 12, seconds: 120 }], 5, false, 0);
const caps = [3.1, 4.0, 2.2, 2.9, 3.6, 1.0, 4.4, 2.5, 3.3, 3.0, 2.8, 4.0];
const free = A.placeChords(slots, caps, {});
let t = 0;
free.entries.forEach(function (e, i) {
  if (!near(e.at_s, t)) problems.push('organic chord ' + (i + 1) + ' starts at ' + e.at_s + ', not ' + t);
  if (e.len_s > caps[i] + 0.001) problems.push('organic chord ' + (i + 1) + ' is longer than its recording');
  if (e.len_s > slots[i].dur + 0.001) problems.push('organic chord ' + (i + 1) + ' is longer than its slot');
  t = +(e.at_s + e.len_s).toFixed(3);
});
if (!near(free.total_s, t)) problems.push('organic total ' + free.total_s + ' is not the last end ' + t);

// A slot shorter than its clip still cuts the clip at the slot, and the next chord follows on.
const short = A.placeChords([{ t: 0, dur: 1.5 }, { t: 1.5, dur: 9 }, { t: 10.5, dur: 9 }], [4, 4, 4], {});
if (JSON.stringify(short.entries.map(e => [e.at_s, e.len_s])) !== JSON.stringify([[0, 1.5], [1.5, 4], [5.5, 4]])) problems.push('short slot ' + JSON.stringify(short.entries));
if (!near(short.total_s, 9.5)) problems.push('short slot total ' + short.total_s);

// Written clock: the Composition's starts stay, even when a clip runs out first.
const written = A.slotsFromDurations([3, 3, 6]);
const w = A.placeChords(written, [2.5, 4, 4], { written: true });
if (JSON.stringify(w.entries.map(e => [e.at_s, e.len_s])) !== JSON.stringify([[0, 2.5], [3, 3], [6, 4]])) problems.push('written ' + JSON.stringify(w.entries));
if (!near(w.total_s, 12)) problems.push('written total ' + w.total_s);

// An explicit gap keeps the slot starts.
const g = A.placeChords(slots, caps, { gap: true });
g.entries.forEach(function (e, i) { if (!near(e.at_s, slots[i].t)) problems.push('gap chord ' + (i + 1)); });

// Only words that ask for a gap count.
['Leave a rest between chords.', 'a pause between the chords', 'silence between each chord', 'air between changes', 'space between the bars']
  .forEach(function (s) { if (!A.explicitGap(s)) problems.push('gap words missed: ' + s); });
['C Am F G', 'ambient vibe, no harsh tones', 'Room between the changes.', 'let it breathe', 'open space', 'the rest of the piece', 'a breath of air']
  .forEach(function (s) { if (A.explicitGap(s)) problems.push('gap words false hit: ' + s); });
// The shipped Compositions ask for no gap.
readdirSync(join(root, 'composition')).filter(f => f.endsWith('.md')).forEach(function (f) {
  if (A.explicitGap(readFileSync(join(root, 'composition', f), 'utf8'))) problems.push('composition/' + f + ' reads as a gap');
});

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('back to back ok');
