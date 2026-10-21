// The hack stack DSP: duplicates, bypass, bounds, and the CPU budget. Run: node tests/hacks-stack.mjs
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { performance } from 'perf_hooks';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { console, Math, Float32Array };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sandbox);
const lib = sandbox.NCHacksLib;
// Build the code the way engine.js ships it to the worklet: pinned constants, then each function's source.
// A hack that leans on a closure variable fails here, as it would in the browser.
const engineSrc = readFileSync(join(root, 'create/hacks/engine.js'), 'utf8');
const pins = /var pins = '([^']*)\\n';/.exec(engineSrc)[1];
// new Function, not a vm context: vm globals are slow and would spoil the CPU number.
const W = new Function(pins + '\n' + lib.fns.map((fn) => fn.toString()).join('\n') +
  '\nreturn {ncChainCreate: ncChainCreate, ncChainSet: ncChainSet, ncRender: ncRender, ncChainAdd: ncChainAdd};')();
const L = {
  CEILING: lib.CEILING,
  chainCreate: (sr) => W.ncChainCreate(sr),
  chainSet: (c, w, im) => W.ncChainSet(c, JSON.parse(JSON.stringify(w)), im),
  render: (c, a, b, x, y) => W.ncRender(c, a, b, x, y),
  add: (c, w) => W.ncChainAdd(c, w)
};
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
function run(chain, inL, inR) {
  const n = inL.length, oL = new Float32Array(n), oR = new Float32Array(n);
  for (let i = 0; i < n; i += Q) {
    const m = Math.min(Q, n - i);
    L.render(chain, inL.subarray(i, i + m), inR.subarray(i, i + m), oL.subarray(i, i + m), oR.subarray(i, i + m));
  }
  return [oL, oR];
}
function make(widgets) { const c = L.chainCreate(SR); L.chainSet(c, widgets, true); return c; }
function finiteAndBounded(out) {
  let bad = 0, peak = 0;
  for (const ch of out) for (const v of ch) { if (!Number.isFinite(v)) bad++; const a = Math.abs(v); if (a > peak) peak = a; }
  return { bad, peak };
}
function same(a, b) {
  for (let c = 0; c < 2; c++) for (let i = 0; i < a[c].length; i++) if (a[c][i] !== b[c][i]) return false;
  return true;
}
const LIM = { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: {} };
const delay = (id, p = {}) => ({ id, type: 'delay', version: 1, bypass: false, params: Object.assign({ delay_s: 0.25, feedback: 0.5, wet: 0.5 }, p) });
const [inL, inR] = signal(1.5);

// Two delays, each its own state.
{
  const two = make([delay('delay-1'), delay('delay-2', { delay_s: 0.4 }), LIM]);
  ok(two.order.join(',') === 'delay-1,delay-2', 'two delays both sit in the chain');
  ok(two.box['delay-1'] !== two.box['delay-2'], 'each delay has its own state');
  const out = run(two, inL, inR);
  const one = run(make([delay('delay-1'), LIM]), inL, inR);
  ok(!same(out, one), 'the second delay changes the sound');
  const f = finiteAndBounded(out);
  ok(f.bad === 0 && f.peak <= L.CEILING + 1e-6, `two delays: no NaN, peak ${f.peak.toFixed(4)} <= ceiling`);
}
// The same id twice runs once.
{
  const c = make([delay('delay-1'), delay('delay-1'), LIM]);
  ok(c.order.length === 1, 'a repeated id is not run twice');
}
// 'add' with an id that is fading out starts fresh.
{
  const c = make([delay('delay-1'), delay('delay-2'), LIM]);
  run(c, inL.subarray(0, 4800), inR.subarray(0, 4800));
  const old = c.box['delay-2'];
  L.add(c, { id: 'delay-2', type: 'delay', params: { wet: 0.5 } });
  ok(c.box['delay-2'] !== old, 're-adding delay-2 gives a fresh instance');
  let s = 0; for (const v of c.box['delay-2'].bufL) s += Math.abs(v);
  ok(s === 0, 'the fresh delay-2 has no old tail');
}
// Bypass equals dry: every hack bypassed sounds like an empty stack.
{
  const all = ['lowpass', 'delay', 'plate'].map((t, i) => ({ id: t + '-1', type: t, bypass: true, params: { cutoff: 80, wet: 1, mix: 1, feedback: 0.8, delay_s: 0.3 } }));
  const a = run(make(all.concat([LIM])), inL, inR);
  const b = run(make([LIM]), inL, inR);
  ok(same(a, b), 'bypassed hacks equal the dry stack, sample for sample');
}
// Ten hacks at the cap, with duplicates: no NaN, bounded, under the 2.667 ms quantum.
{
  const ten = [];
  for (let i = 0; i < 10; i++) {
    const t = ['lowpass', 'delay', 'plate'][i % 3];
    ten.push({ id: t + '-' + (i + 1), type: t, bypass: false, params: { cutoff: 40, cutoff_hz: 2000, delay_s: 0.2, feedback: 0.6, wet: 0.4, mix: 0.4, decay: 0.7, size: 0.5 } });
  }
  ten.push(delay('delay-99'));
  const c = make(ten.concat([LIM]));
  ok(c.order.length === 10, 'the cap stays at 10 movable hacks');
  const [bl, br] = signal(4, 7);
  const t0 = performance.now();
  const out = run(c, bl, br);
  const ms = (performance.now() - t0) / (bl.length / Q);
  const f = finiteAndBounded(out);
  ok(f.bad === 0 && f.peak <= L.CEILING + 1e-6, `ten hacks: no NaN, peak ${f.peak.toFixed(4)}`);
  ok(ms < 128 / SR * 1000, `ten hacks: ${ms.toFixed(3)} ms per 128-frame quantum (budget 2.667 ms)`);
}
// The limiter's lowest gain is tracked for the scope without touching the sound.
{
  const c = make([LIM]);
  const loud = new Float32Array(4800).fill(1.5);
  run(c, loud, loud);
  ok(c.lim.lo < 0.8, `limiter low-water mark ${c.lim.lo.toFixed(3)} shows gain reduction`);
}
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all hack stack checks pass');
