// Synth preset bank, performance-preset parser, and browser imports.
import { readFileSync } from 'fs';
import vm from 'node:vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const mem = {};
const sb = {
  localStorage: {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null),
    setItem: (k, v) => { mem[k] = String(v); },
    removeItem: (k) => { delete mem[k]; }
  }
};
sb.globalThis = sb;
sb.Map = Map;
sb.Set = Set;
sb.Promise = Promise;
sb.JSON = JSON;
sb.Object = Object;
sb.Number = Number;
sb.String = String;
vm.createContext(sb);
function load(file) { vm.runInContext(readFileSync(join(root, file), 'utf8'), sb); }
load('create/nc-synth.js');
load('create/synth-presets.js');
const P = sb.NCSynthPresets;
const bank = JSON.parse(readFileSync(join(root, 'create/synth-presets.json'), 'utf8'));
P.loadBank(bank);

check(bank.length === 3 && bank[0].version === 1 && bank[0].name === 'Example Bright' && bank[0].settings.waveform === 'saw', 'the shipped bank is three labelled examples');
check(P.rows().map((r) => r.n + ':' + r.name).join(' ') === '1:Example Bright 2:Example Dark 3:Example Sine', 'built-in numbers follow the file, got ' + P.rows().map((r) => r.n + ':' + r.name).join(' '));

const byNum = P.resolve('1');
const byName = P.resolve('  example   BRIGHT ');
check(byNum && byNum.found && byNum.n === 1 && byNum.name === 'Example Bright' && byNum.by === 'number', 'preset 1 resolves by number');
check(byName && byName.found && byName.n === 1 && byName.name === 'Example Bright' && byName.by === 'name', 'a name ignores capitals and extra spaces');
check(P.resolve('99') && P.resolve('99').found === false, 'an unknown number is not found');
check(P.resolve('No Such') && P.resolve('No Such').found === false && P.resolve('No Such').label === 'No Such', 'an unknown name is not found');

const wrapped = P.parsePerformancePreset({ id: 'astral', name: 'Astral Neon', version: 1, settings: { waveform: 'square', cutoff: 800, fmDepth: 2 } });
check(wrapped.ok && wrapped.preset.version === 1 && wrapped.preset.name === 'Astral Neon', 'a performance preset parses');
const badVersion = P.parsePerformancePreset({ name: 'Later', version: 2, settings: { waveform: 'saw' } });
check(!badVersion.ok && /version must be 1/.test(badVersion.error), 'version 2 is refused, got ' + badVersion.error);
const bare = P.parsePerformancePreset({ waveform: 'sine', cutoff: 400, attack: 0.2 });
check(bare.ok && bare.preset.name === 'Imported' && bare.named === false, 'a configuration with no name is one preset');
const nope = P.parsePerformancePreset({ hello: 'world' });
check(!nope.ok, 'a random object is not a preset');

const merged = P.patch(P.resolve('2'));
check(merged && merged.waveform === 'triangle' && merged.cutoff === 280 && merged.tempo === 96 && merged.mode === 'single', 'patch keeps the page tempo and mode, got ' + JSON.stringify(merged && { wave: merged.waveform, cut: merged.cutoff, tempo: merged.tempo, mode: merged.mode }));
const clamped = P.patch({ found: true, n: 1 });
check(clamped && clamped.waveform === 'saw' && clamped.subLevel === 0.12, 'preset 1 is the bright example');

const imported = P.importText(JSON.stringify([
  { id: 'astral', name: 'Astral Neon', version: 1, settings: { waveform: 'square', cutoff: 800 } },
  { waveform: 'noise', cutoff: 600 }
]));
check(imported.ok && imported.added.map((r) => r.n + ':' + r.name).join(' ') === '4:Astral Neon 5:Imported', 'imports continue the numbers, got ' + JSON.stringify(imported));
check(P.resolve('Astral Neon').n === 4 && P.resolve('4').name === 'Astral Neon', 'number and name agree on an import');
check(P.resolve('1').name === 'Example Bright', 'a built-in number stays the bank');
const shadow = P.importText(JSON.stringify({ id: 'shadow', name: 'Example Bright', version: 1, settings: { waveform: 'noise', cutoff: 100 } }));
check(shadow.ok && shadow.added[0].n === 6, 'an import with a bank name is a new number, got ' + JSON.stringify(shadow));
check(P.resolve('Example Bright').n === 6 && P.resolve('Example Bright').by === 'name', 'a name uses the import before the bank, got ' + JSON.stringify(P.resolve('Example Bright')));
check(P.resolve('1').n === 1 && P.resolve('1').name === 'Example Bright', 'preset 1 is still the built-in');
const again = P.importText(JSON.stringify({ id: 'astral', name: 'astral neon', version: 1, settings: { waveform: 'triangle', cutoff: 500 } }));
check(again.ok && again.updated[0] && again.updated[0].n === 4 && P.resolve('4') && P.patch(P.resolve('4')).waveform === 'triangle', 'importing the same name replaces that import, got ' + JSON.stringify(again));
check(mem['nc.synthPresets'] && mem['nc.synthPresets'].toLowerCase().indexOf('astral neon') >= 0, 'imports are stored under nc.synthPresets');
const skipped = P.importText(JSON.stringify([{ name: 'Good', version: 1, settings: { waveform: 'sine' } }, { name: 'Bad', version: 3, settings: { waveform: 'saw' } }]));
check(skipped.ok && skipped.added[0].name === 'Good' && skipped.errors.length === 1, 'a valid entry is kept when another version is skipped, got ' + JSON.stringify(skipped));

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('synth presets ok');
