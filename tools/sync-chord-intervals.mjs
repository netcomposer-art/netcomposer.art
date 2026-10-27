// Keep Create's chord intervals the same as ASTRID's.
//
// The source of truth is lib/synth-audio/src/chords.ts in
// psemmelhack/NetComposer-Synth (ASTRID). That repo is private, so the site
// never fetches it. A copy of every id's intervals lives at
// create/chord-intervals.json; create/chord-library.js carries the same
// intervals in its group() rows.
//
//   node tools/sync-chord-intervals.mjs <path to ASTRID chords.ts>
//       parse chords.ts into create/chord-intervals.json, then rewrite the rows
//   node tools/sync-chord-intervals.mjs
//       rewrite create/chord-library.js rows from create/chord-intervals.json
//   node tools/sync-chord-intervals.mjs --check
//       exit 1 when the rows and create/chord-intervals.json differ
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = join(root, 'create/chord-intervals.json');
const libPath = join(root, 'create/chord-library.js');
const ROW = /\['([^']+)',\s*'([^']*)',\s*(\[[0-9,\s]+\]),\s*'([^']*)'\]/g;

const args = process.argv.slice(2);
const check = args.includes('--check');
const from = args.find((a) => a !== '--check');

function rows(src) {
  const out = {};
  for (const m of src.matchAll(ROW)) out[m[1]] = JSON.parse(m[3]);
  return out;
}
// Chord rows sit before the arp-patterns block.
const chordPart = (src) => { const i = src.indexOf('BEGIN arp-patterns'); return i > 0 ? src.slice(0, i) : src; };

if (from) {
  const intervals = rows(readFileSync(from, 'utf8'));
  if (Object.keys(intervals).length < 40) throw new Error('could not read chord rows from ' + from);
  writeFileSync(jsonPath, JSON.stringify({ format: 'netcomposer.chord-intervals', source: from, intervals }, null, 2) + '\n');
}

const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
if (data.format !== 'netcomposer.chord-intervals') throw new Error('not a chord-intervals.json: ' + data.format);
const want = data.intervals;
const lib = readFileSync(libPath, 'utf8');
const head = chordPart(lib);
const have = rows(head);
const drift = [];
for (const id of Object.keys(want)) {
  if (!(id in have)) drift.push(id + ': missing in create/chord-library.js');
  else if (JSON.stringify(have[id]) !== JSON.stringify(want[id])) drift.push(id + ': ' + JSON.stringify(have[id]) + ' should be ' + JSON.stringify(want[id]));
}
for (const id of Object.keys(have)) if (!(id in want)) drift.push(id + ': not in create/chord-intervals.json');

if (check) {
  if (drift.length) {
    console.error('create/chord-library.js is out of sync with create/chord-intervals.json. Run node tools/sync-chord-intervals.mjs\n' + drift.join('\n'));
    process.exit(1);
  }
  console.log('chord intervals in sync (' + Object.keys(want).length + ')');
} else if (!drift.length) {
  console.log('chord intervals already in sync (' + Object.keys(want).length + ')');
} else {
  const next = head.replace(ROW, (all, id, name, arr, sym) =>
    id in want ? "['" + id + "', '" + name + "', [" + want[id].join(', ') + "], '" + sym + "']" : all) + lib.slice(head.length);
  writeFileSync(libPath, next);
  console.log('rewrote ' + drift.length + ' chord row(s) in create/chord-library.js');
}
