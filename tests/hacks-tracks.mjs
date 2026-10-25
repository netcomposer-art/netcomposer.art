// Eight track inputs in the one worklet. Empty chains stay dry, and input 0
// through an empty track chain then the master matches today's ncRender.
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { console, Math, Float32Array };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sandbox);
const lib = sandbox.NCHacksLib;
const engineSrc = readFileSync(join(root, 'create/hacks/engine.js'), 'utf8');
const pins = /var pins = '([^']*)\\n';/.exec(engineSrc)[1];
const W = new Function(pins + '\n' + lib.fns.map((fn) => fn.toString()).join('\n') +
  '\nreturn {ncChainCreate: ncChainCreate, ncChainSet: ncChainSet, ncRender: ncRender, ncMixRender: ncMixRender, ncTrackRender: ncTrackRender, ncTrackSlot: ncTrackSlot};')();

const SR = 48000, Q = 128;
let fails = 0;
function ok(cond, msg) { if (!cond) { fails++; console.log('FAIL', msg); } else console.log('ok  ', msg); }
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
function run(fn, chain, inL, inR) {
  const n = inL.length, oL = new Float32Array(n), oR = new Float32Array(n);
  for (let i = 0; i < n; i += Q) {
    const m = Math.min(Q, n - i);
    fn(chain, inL.subarray(i, i + m), inR.subarray(i, i + m), oL.subarray(i, i + m), oR.subarray(i, i + m));
  }
  return [oL, oR];
}
function same(a, b) {
  for (let c = 0; c < 2; c++) for (let i = 0; i < a[c].length; i++) if (a[c][i] !== b[c][i]) return false;
  return true;
}
const LIM = { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: { ceiling_db: -1, lookahead_s: 0.0015 } };
const widgets = [
  { id: 'lowpass-1', type: 'lowpass', bypass: false, params: { cutoff: 0, cutoff_hz: null, q: 0.7071067811865476 } },
  { id: 'delay-1', type: 'delay', bypass: false, params: { delay_s: 0.75, feedback: 0.35, wet: 0 } },
  { id: 'plate-1', type: 'plate', bypass: false, params: { predelay: 0, size: 0.5, decay: 0.5, damping: 0, mix: 0 } },
  LIM
];
function master() {
  const c = W.ncChainCreate(SR);
  W.ncChainSet(c, JSON.parse(JSON.stringify(widgets)), true);
  return c;
}
function emptyTracks() {
  const list = [];
  for (let i = 0; i < 8; i++) list.push(W.ncChainCreate(SR));
  return list;
}
function mix(tracks, chain, inputs, n) {
  const oL = new Float32Array(n), oR = new Float32Array(n);
  for (let i = 0; i < n; i += Q) {
    const m = Math.min(Q, n - i);
    const block = [];
    inputs.forEach((pair, idx) => {
      if (!pair) return;
      block[idx] = [pair[0].subarray(i, i + m), pair[1].subarray(i, i + m)];
    });
    W.ncMixRender(tracks, chain, block, oL.subarray(i, i + m), oR.subarray(i, i + m));
  }
  return [oL, oR];
}

ok(W.ncTrackSlot(undefined) === -1 && W.ncTrackSlot(null) === -1, 'a message with no track hits the master');
ok(W.ncTrackSlot(0) === 0 && W.ncTrackSlot(7) === 7, 'tracks 0 through 7 are accepted');
ok(W.ncTrackSlot(8) === -2 && W.ncTrackSlot(9) === -2 && W.ncTrackSlot(-1) === -2, 'track 8 and beyond are ignored');

const [inL, inR] = signal(1);
const direct = run((c, a, b, x, y) => W.ncRender(c, a, b, x, y), master(), inL, inR);
const via = mix(emptyTracks(), master(), [[inL, inR]], inL.length);
ok(same(direct, via), 'input 0 through an empty track chain matches the master, sample for sample');

const quiet = new Float32Array(Q);
const quietR = new Float32Array(Q);
for (let i = 0; i < Q; i++) { quiet[i] = 0.5; quietR[i] = -0.25; }
const tr = W.ncChainCreate(SR);
const tL = new Float32Array(Q), tR = new Float32Array(Q);
W.ncTrackRender(tr, quiet, quietR, tL, tR);
let dry = true;
for (let i = 0; i < Q; i++) if (tL[i] !== 0.5 || tR[i] !== -0.25) dry = false;
ok(dry, 'an empty track chain copies the samples: no 0.8, no limiter');

const dryIn = [];
dryIn[8] = [inL, inR];
const dryMaster = mix(emptyTracks(), master(), dryIn, inL.length);
ok(same(direct, dryMaster), 'input 8, dry into the master, matches rendering that signal on the master');

const filtered = emptyTracks();
W.ncChainSet(filtered[0], [{ id: 'lowpass-1', type: 'lowpass', bypass: false, params: { cutoff: 80, cutoff_hz: 400, q: 0.7071067811865476 } }], true);
const darker = mix(filtered, master(), [[inL, inR]], inL.length);
ok(!same(direct, darker), 'a low-pass on track 0 changes the sound');

const withSilence = mix(emptyTracks(), master(), [[inL, inR], [new Float32Array(inL.length), new Float32Array(inR.length)]], inL.length);
ok(same(direct, withSilence), 'silence on the next track input does not change the mix');

const live = readFileSync(join(root, 'create/live.js'), 'utf8');
const processor = readFileSync(join(root, 'create/hacks/processor.js'), 'utf8');
ok(/numberOfInputs:\s*9/.test(engineSrc), 'the worklet has nine inputs');
ok(!/latencyHint/.test(engineSrc + live), 'latencyHint stays unset');
ok(/dry\.gain\.value = 0\.8/.test(live), 'the worklet fallback is still a dry 0.8');
ok(/ncMixRender\(this\.tracks/.test(processor) && /ncTrackSlot\(msg\.track\)/.test(processor), 'the processor mixes eight tracks and ignores the rest');
ok(/this\.tracks\.push\(ncChainCreate/.test(processor), 'track chains are created empty');
function srcHash(name) {
  const fn = lib.fns.find((f) => f.name === name);
  return createHash('sha256').update(fn.toString()).digest('hex');
}
ok(srcHash('ncRender') === '6bb48861975fe430db98098861777ba4e0a883fc486a0eba561bd36be315575d', 'ncRender source matches this build');
ok(srcHash('ncLowpassStep') === '563ae6e03a1e3550a3b969455b74c78dec4bffdaba080ceff79cf389e2659ede', 'low-pass source matches this build');
ok(srcHash('ncChainSet') === '5087ee39181eeb7668dd526244f23aa05a50d1f111c86bcf90556517eb9b7ca8', 'chain loading source matches this build');

if (fails) {
  console.error(fails + ' failed');
  process.exit(1);
}
console.log('tracks ok');
