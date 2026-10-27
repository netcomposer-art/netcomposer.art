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
check(bank[0].number === 1 && bank[1].number === 2 && bank[2].number === 3, 'the shipped bank carries numbers 1, 2, and 3');
check(P.rows().map((r) => r.n + ':' + r.name).join(' ') === '1:Example Bright 2:Example Dark 3:Example Sine', 'built-in numbers are the preset numbers, got ' + P.rows().map((r) => r.n + ':' + r.name).join(' '));

const byNum = P.resolve('1');
const byName = P.resolve('  example   BRIGHT ');
check(byNum && byNum.found && byNum.n === 1 && byNum.name === 'Example Bright' && byNum.by === 'number', 'preset 1 resolves by number');
check(byName && byName.found && byName.n === 1 && byName.name === 'Example Bright' && byName.by === 'name', 'a name ignores capitals and extra spaces');
check(P.resolve('example-bright').n === 1 && P.resolve('Example-Bright').name === 'Example Bright', 'a hyphen and a space are the same name');
check(P.resolve('99') && P.resolve('99').found === false, 'an unknown number is not found');
check(P.resolve('No Such') && P.resolve('No Such').found === false && P.resolve('No Such').label === 'No Such', 'an unknown name is not found');

const wrapped = P.parsePerformancePreset({ id: 'astral', name: 'Astral Neon', version: 1, settings: { waveform: 'square', cutoff: 800, fmDepth: 2 } });
check(wrapped.ok && wrapped.preset.version === 1 && wrapped.preset.name === 'Astral Neon', 'a performance preset parses');
const badVersion = P.parsePerformancePreset({ name: 'Later', version: 2, settings: { waveform: 'saw' } });
check(!badVersion.ok && /version must be 1/.test(badVersion.error), 'version 2 is refused, got ' + badVersion.error);
const bare = P.parsePerformancePreset({ waveform: 'sine', cutoff: 400, attack: 0.2 });
check(bare.ok && bare.preset.name === '' && bare.named === false && bare.preset.number == null, 'a configuration with no name is one preset');
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

const slugs = P.importText(JSON.stringify([
  { id: 'velvet-comet', name: 'velvet-comet', version: 1, settings: { waveform: 'square', cutoff: 1800 } },
  { id: 'night-spark', name: 'night-spark', version: 1, settings: { waveform: 'sine', cutoff: 900 } },
  { id: 'clear-night-spark', name: 'clear-night-spark', version: 1, settings: { waveform: 'triangle', cutoff: 400 } }
]));
check(slugs.ok && slugs.added.map((r) => r.name).join(' ') === 'velvet-comet night-spark clear-night-spark', 'hyphenated names import, got ' + JSON.stringify(slugs));
['velvet-comet', 'Velvet Comet', 'VELVET-COMET', 'velvet comet', 'velvet–comet', 'velvet\u2212comet'].forEach((ref) => {
  const hit = P.resolve(ref);
  check(hit && hit.found && hit.name === 'velvet-comet' && hit.by === 'name', ref + ' resolves to velvet-comet, got ' + JSON.stringify(hit));
});
['night-spark', 'Night Spark', 'NIGHT-SPARK'].forEach((ref) => {
  const hit = P.resolve(ref);
  check(hit && hit.found && hit.name === 'night-spark', ref + ' resolves to night-spark, got ' + JSON.stringify(hit));
});
['clear-night-spark', 'Clear Night Spark', 'clear night spark', 'CLEAR-NIGHT-SPARK'].forEach((ref) => {
  const hit = P.resolve(ref);
  check(hit && hit.found && hit.name === 'clear-night-spark', ref + ' resolves to clear-night-spark, got ' + JSON.stringify(hit));
});
const loose = P.importText(JSON.stringify({ id: 'velvet-comet', name: 'Velvet Comet', version: 1, settings: { waveform: 'saw', cutoff: 300 } }));
check(loose.ok && loose.updated[0] && loose.updated[0].name === 'Velvet Comet' && P.resolve('velvet-comet').n === loose.updated[0].n && P.patch(P.resolve('velvet comet')).cutoff === 300, 'Velvet Comet replaces velvet-comet, got ' + JSON.stringify(loose));
check(P.resolve('---').found === false, 'a hyphen on its own is not a preset');

const saved = P.importText(JSON.stringify({
  format: 'netcomposer.synth', version: 1, number: 44, name: 'velvet-comet', settings: { waveform: 'square', cutoff: 1800 }
}), '44-velvet-comet.json');
check(saved.ok && saved.updated[0] && saved.updated[0].n === 44 && P.resolve('44').name === 'velvet-comet' && P.resolve('velvet-comet').n === 44, 'a netcomposer.synth file keeps number 44, got ' + JSON.stringify(saved));
check(P.message(saved) === 'Imported 44 · velvet-comet, still preset 44.', 'import lists the number and the name, got ' + P.message(saved));
const performance = P.parsePerformancePreset({ id: 'amber-glass', number: 48, name: 'amber-glass', version: 1, settings: { waveform: 'triangle', cutoff: 300 } });
check(performance.ok && performance.preset.id === 'amber-glass' && performance.preset.number === 48 && performance.preset.name === 'amber-glass', 'a performance preset keeps id and number');
const aged = P.importText(JSON.stringify({ format: 'netcomposer.synth', version: 1, settings: { waveform: 'sine', cutoff: 640 } }), '52-old-spark.json');
check(aged.ok && aged.added[0].n === 52 && aged.added[0].name === 'old-spark' && P.resolve('52').name === 'old-spark' && P.resolve('old spark').n === 52, 'an older file takes number and name from the filename, got ' + JSON.stringify(aged));
const namedOnly = P.importText(JSON.stringify({ format: 'netcomposer.synth', version: 1, name: 'kept-name', settings: { waveform: 'saw' } }), '61-ignored.json');
check(namedOnly.added[0].name === 'kept-name' && namedOnly.added[0].n === 61, 'a file name fills only a missing number, got ' + JSON.stringify(namedOnly));
const noPrefix = P.importText(JSON.stringify({ waveform: 'saw', cutoff: 100 }), 'plain-name.json');
check(noPrefix.added[0].name === 'plain-name' && noPrefix.added[0].n !== 44 && P.resolve(String(noPrefix.added[0].n)).name === 'plain-name', 'a filename with no number takes the next free one, got ' + JSON.stringify(noPrefix));
['0', '-2', '1.5', '"44"'].forEach((bad) => {
  const parsed = P.parsePerformancePreset(JSON.parse('{"format":"netcomposer.synth","version":1,"number":' + bad + ',"name":"bad","settings":{"waveform":"saw"}}'));
  check(!parsed.ok && /positive integer/.test(parsed.error), bad + ' is refused, got ' + JSON.stringify(parsed));
});
const idNumber = P.importText(JSON.stringify({ id: 99, name: 'id-is-not-a-number', version: 1, settings: { waveform: 'saw' } }));
check(idNumber.added[0].n !== 99 && P.resolve('99').found === false, 'a numeric id is not the preset number, got ' + JSON.stringify(idNumber));
const clashShip = P.importText(JSON.stringify({ id: 'not-bright', number: 1, name: 'not-bright', version: 1, settings: { waveform: 'noise', cutoff: 50 } }));
check(clashShip.added[0].n !== 1 && P.resolve('1').name === 'Example Bright' && P.resolve('not-bright').n === clashShip.added[0].n, 'a shipped number wins, got ' + JSON.stringify(clashShip));
check(P.message(clashShip).indexOf(clashShip.added[0].n + ' · not-bright') >= 0 && P.message(clashShip).indexOf('1 is Example Bright, so this one is ' + clashShip.added[0].n) >= 0, 'the import says the number moved, got ' + P.message(clashShip));
const clashImport = P.importText(JSON.stringify({ id: 'other-44', number: 44, name: 'other-44', version: 1, settings: { waveform: 'triangle' } }));
check(clashImport.added[0].n !== 44 && P.resolve('44').name === 'velvet-comet', 'an earlier import keeps 44, got ' + JSON.stringify(clashImport));
check(P.message(clashImport).indexOf('44 is velvet-comet, so this one is ' + clashImport.added[0].n) >= 0, 'the import names the preset that kept 44, got ' + P.message(clashImport));
const listed = P.importText(JSON.stringify([
  { id: 'list-a', name: 'list-a', version: 1, settings: { waveform: 'saw' } },
  { id: 'list-b', name: 'list-b', version: 1, settings: { waveform: 'sine' } }
]), '99-list.json');
check(listed.added.length === 2 && listed.added[0].n !== 99 && listed.added[1].n !== 99, 'a list does not take the filename number, got ' + JSON.stringify(listed));

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('synth presets ok');
