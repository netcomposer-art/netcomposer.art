// Keep Create's arp pattern list the same as ASTRID's.
//
// The source of truth is lib/synth-audio/arp-patterns.json in
// psemmelhack/NetComposer-Synth (ASTRID). That repo is private, so the site
// never fetches it. A copy lives at create/arp-patterns.json, and
// create/chord-library.js carries the same JSON between two marker lines.
//
//   node tools/sync-arp-patterns.mjs <path to ASTRID arp-patterns.json>
//       copy ASTRID's file to create/arp-patterns.json, then rewrite the block
//   node tools/sync-arp-patterns.mjs
//       rewrite the block from create/arp-patterns.json
//   node tools/sync-arp-patterns.mjs --check
//       exit 1 when the block and create/arp-patterns.json differ
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = join(root, 'create/arp-patterns.json');
const libPath = join(root, 'create/chord-library.js');
const BEGIN = '  // BEGIN arp-patterns.json (tools/sync-arp-patterns.mjs writes this block; do not edit it by hand)';
const END = '  // END arp-patterns.json';

const args = process.argv.slice(2);
const check = args.includes('--check');
const from = args.find((a) => a !== '--check');
if (from) writeFileSync(jsonPath, readFileSync(from, 'utf8'));

const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
if (data.format !== 'netcomposer.arp-patterns') throw new Error('not an arp-patterns.json: ' + data.format);
const block = BEGIN + '\n  var ARP_REGISTRY = ' + JSON.stringify(data, null, 2).replace(/\n/g, '\n  ') + ';\n' + END;

const lib = readFileSync(libPath, 'utf8');
const a = lib.indexOf(BEGIN), b = lib.indexOf(END);
if (a < 0 || b < a) throw new Error('marker lines not found in create/chord-library.js');
const next = lib.slice(0, a) + block + lib.slice(b + END.length);
if (check) {
  if (next !== lib) { console.error('create/chord-library.js is out of sync with create/arp-patterns.json. Run node tools/sync-arp-patterns.mjs'); process.exit(1); }
  console.log('arp patterns in sync (' + data.patterns.length + ')');
} else {
  writeFileSync(libPath, next);
  console.log('wrote ' + data.patterns.length + ' arp patterns into create/chord-library.js');
}
