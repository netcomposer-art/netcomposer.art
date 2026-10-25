// Neutral offline render of the default Live chain. One second, 48 kHz, the
// same noise-and-sines as tests/hacks-stack.mjs, immediate chain, 128-sample
// blocks. sha256 of float32 little-endian, left channel then right.
// A later step that changes this hash has changed the sound.
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCK = '8eb9596dfb09da47c232817fad41ee438ce1866866850ff109d95254de19653b';
const sandbox = { console, Math, Float32Array };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sandbox);
const lib = sandbox.NCHacksLib;
const engineSrc = readFileSync(join(root, 'create/hacks/engine.js'), 'utf8');
const pins = /var pins = '([^']*)\\n';/.exec(engineSrc)[1];
const W = new Function(pins + '\n' + lib.fns.map((fn) => fn.toString()).join('\n') +
  '\nreturn {ncChainCreate: ncChainCreate, ncChainSet: ncChainSet, ncRender: ncRender};')();

const SR = 48000, Q = 128;
function signal(seconds, seed = 1) {
  const n = Math.round(seconds * SR), l = new Float32Array(n), r = new Float32Array(n);
  let s = seed >>> 0;
  for (let i = 0; i < n; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const noise = (s / 4294967296 - 0.5) * 0.2;
    const env = (i % 12000) < 6000 ? 1 : 0.2;
    l[i] = env * (0.6 * Math.sin(2 * Math.PI * 220 * i / SR) + noise);
    r[i] = env * (0.6 * Math.sin(2 * Math.PI * 330 * i / SR) - noise);
  }
  return [l, r];
}
const widgets = [
  { id: 'lowpass-1', type: 'lowpass', bypass: false, params: { cutoff: 0, cutoff_hz: null, q: 0.7071067811865476 } },
  { id: 'delay-1', type: 'delay', bypass: false, params: { delay_beats: 0.75, delay_s: 0.75, feedback: 0.35, wet: 0 } },
  { id: 'plate-1', type: 'plate', bypass: false, params: { predelay: 0, size: 0.5, decay: 0.5, damping: 0, mix: 0 } },
  { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: { ceiling_db: -1, lookahead_s: 0.0015 } }
];
const [inL, inR] = signal(1);
const chain = W.ncChainCreate(SR);
W.ncChainSet(chain, widgets, true);
const oL = new Float32Array(inL.length), oR = new Float32Array(inR.length);
for (let i = 0; i < inL.length; i += Q) {
  const m = Math.min(Q, inL.length - i);
  W.ncRender(chain, inL.subarray(i, i + m), inR.subarray(i, i + m), oL.subarray(i, i + m), oR.subarray(i, i + m));
}
const buf = Buffer.alloc(oL.length * 8);
let peak = 0;
for (let i = 0; i < oL.length; i++) {
  buf.writeFloatLE(oL[i], i * 4);
  buf.writeFloatLE(oR[i], oL.length * 4 + i * 4);
  const a = Math.max(Math.abs(oL[i]), Math.abs(oR[i]));
  if (a > peak) peak = a;
}
const hash = createHash('sha256').update(buf).digest('hex');
if (hash !== LOCK) {
  console.error('FAIL render hash\n  got  ' + hash + '\n  want ' + LOCK + '\n  peak ' + peak);
  process.exit(1);
}
if (!(peak < 0.8912509381337456 + 1e-6)) {
  console.error('FAIL peak ' + peak);
  process.exit(1);
}
console.log('render hash ok ' + hash + ' peak ' + peak.toFixed(4));
