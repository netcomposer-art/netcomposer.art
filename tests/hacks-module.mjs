// NCHacksLib can be required. The worklet still receives the same function
// sources engine.js stringifies, and engine.js itself is not the module.
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Step 2 locked the pre-track blob. Step 6 added the track helpers and nine
// inputs. Step 7 added the glide. The lock is the blob this branch ships.
const BLOB = 'fd45aa04f6c72c0ca44daf6c8c70abeb2428fccc40c0fcfbbf0a8dbbbee1cf38';
const problems = [];
const ok = (c, m) => { if (!c) { problems.push(m); console.log('FAIL', m); } else console.log('ok  ', m); };

const sandbox = { console, Math, Float32Array, module: { exports: {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sandbox);
const lib = sandbox.NCHacksLib;
ok(lib && sandbox.module.exports === lib, 'module.exports is NCHacksLib');
ok(typeof lib.render === 'function' && lib.fns.indexOf(lib.render) >= 0, 'the export still lists ncRender');

const engineSrc = readFileSync(join(root, 'create/hacks/engine.js'), 'utf8');
const pins = /var pins = '([^']*)\\n';/.exec(engineSrc)[1];
ok(pins.indexOf('MASTER=0.8') >= 0 && pins.indexOf('CEILING=0.8912509381337456') >= 0, 'engine.js still pins the same constants');
ok(!/module\.exports/.test(engineSrc), 'engine.js does not grow a module export');
ok(/numberOfInputs:\s*9/.test(engineSrc), 'the worklet has eight track inputs and the dry master bus');
const blob = pins + '\n' + lib.fns.map((fn) => fn.toString()).join('\n');
const hash = createHash('sha256').update(blob).digest('hex');
ok(hash === BLOB, 'stringified hack functions match the locked worklet (' + hash + ')');
ok(!lib.fns.some((fn) => fn.toString().indexOf('module.exports') >= 0), 'the export line is outside the worklet');

if (problems.length) {
  console.error(problems.length + ' failed');
  process.exit(1);
}
console.log('module ok');
