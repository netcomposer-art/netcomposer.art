// Locks the page's organic clock to ncperf/data/assembly-vectors.json (nc-performer ffd68ce).
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = {};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/assembly.js'), 'utf8'), sandbox);
const A = sandbox.NCAssembly;
const rows = JSON.parse(readFileSync(join(root, 'tests/assembly-vectors.json'), 'utf8'));
const problems = [];

rows.forEach(function (row) {
  if (row.rule === 'written') {
    const slots = A.slotsFromDurations(row.durations_s);
    if (JSON.stringify(slots) !== JSON.stringify(row.slots)) problems.push(row.name + ' slots');
    if (row.floor_applied !== false) problems.push(row.name + ' floor');
    return;
  }
  const slots = A.chordSlots(row.sections, row.seed, row.pulse, row.broaden);
  const durs = slots.map(function (s) { return s.dur; });
  if (JSON.stringify(slots) !== JSON.stringify(row.slots)) problems.push(row.name + ' slots');
  if (A.durationCv(durs) !== row.duration_cv) problems.push(row.name + ' cv');
  if (A.looksAlternating(durs) !== row.looks_alternating) problems.push(row.name + ' alternating');
});

if (A.takeSeconds('C Am F G') !== 120) problems.push('default length');
if (A.takeSeconds('20 seconds of C') !== 20) problems.push('seconds');
if (!A.statedPulse('one chord per bar') || A.statedPulse('let it breathe')) problems.push('pulse');
if (A.broadenBars('broadening over the last two bars') !== 2) problems.push('broaden');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('assembly vectors ok (' + rows.length + ')');
