// Frequency response of the EQ (both voicings), high-pass and band-pass, plus neutral, bypass, NaN and CPU.
// Built the way engine.js ships the worklet. Run: node tests/hacks-filters.mjs
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { performance } from 'perf_hooks';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sb = { Math, Float32Array }; sb.window = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sb);
const lib = sb.NCHacksLib;
const pins = /var pins = '([^']*)\\n';/.exec(readFileSync(join(root, 'create/hacks/engine.js'), 'utf8'))[1];
const W = new Function(pins + '\n' + lib.fns.map((f) => f.toString()).join('\n') +
  '\nreturn {create: ncChainCreate, set: ncChainSet, render: ncRender, widget: ncWidgetCreate, apply: ncWidgetApply, step: ncWidgetStep};')();
const SR = 48000;
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };

// Gain in dB at hz: a sine through one hack, dials moved after creation so smoothing has to settle.
function gainAt(type, params, hz) {
  const st = W.widget(type, SR);
  W.apply(st, {}, true, false);
  W.apply(st, params, false, false);
  const n = SR, t = [0, 0];
  let pi = 0, po = 0;
  for (let i = 0; i < n; i++) {
    const x = 0.1 * Math.sin(2 * Math.PI * hz * i / SR);
    W.step(st, x, x, t);
    if (i >= n / 2) { pi += x * x; po += t[0] * t[0]; }
  }
  return 10 * Math.log10(po / pi);
}
const near = (v, want, tol) => Math.abs(v - want) <= tol;
const F = [100, 1000, 8000];
const row = (type, p) => F.map((f) => gainAt(type, p, f));
const fmt = (r) => F.map((f, i) => `${f} Hz ${r[i] >= 0 ? '+' : ''}${r[i].toFixed(1)}`).join(', ');

const V2 = { low_hz: 150, high_hz: 6000, mid_q: 1, mid_hz: 1000 };
const cases = [
  ['EQ v2 low +18', 'eq', { ...V2, low_db: 18 }, (r) => r[0] > 14 && near(r[1], 0, 0.5) && near(r[2], 0, 0.2)],
  ['EQ v2 low -18', 'eq', { ...V2, low_db: -18 }, (r) => r[0] < -14 && near(r[1], 0, 0.5)],
  ['EQ v2 mid +18 @1k Q1', 'eq', { ...V2, mid_db: 18 }, (r) => near(r[1], 18, 0.3) && r[0] < 1.5 && r[2] < 1.5],
  ['EQ v2 mid -18 @1k Q1', 'eq', { ...V2, mid_db: -18 }, (r) => near(r[1], -18, 0.3)],
  ['EQ v2 high +18', 'eq', { ...V2, high_db: 18 }, (r) => r[2] > 8 && near(r[0], 0, 0.2) && near(r[1], 0, 0.5)],
  ['EQ v2 high -18', 'eq', { ...V2, high_db: -18 }, (r) => r[2] < -8],
  ['EQ v1 low +12 (old takes)', 'eq', { low_db: 12 }, (r) => near(r[0], 11.6, 0.3)],
  ['EQ v1 high +12 (old takes)', 'eq', { high_db: 12 }, (r) => near(r[2], 11.3, 0.3)],
  ['EQ v1 clamps at 12 dB', 'eq', { low_db: 18 }, (r) => near(r[0], 11.6, 0.3)],
  ['High-pass 200 Hz', 'highpass', { cutoff: 50, cutoff_hz: 200, q: 0.7071 }, (r) => r[0] < -7 && near(r[1], 0, 0.3) && near(r[2], 0, 0.1)],
  ['High-pass 2 kHz', 'highpass', { cutoff: 100, cutoff_hz: 2000, q: 0.7071 }, (r) => r[0] < -40 && r[1] < -11 && near(r[2], 0, 0.3)],
  ['Band-pass 1 kHz Q 0.4', 'bandpass', { centre_hz: 1000, q: 0.4, mix: 1 }, (r) => near(r[1], 0, 0.3) && r[0] < -5 && r[2] < -5],
  ['Band-pass 1 kHz Q 8', 'bandpass', { centre_hz: 1000, q: 8, mix: 1 }, (r) => near(r[1], 0, 0.3) && r[0] < -35 && r[2] < -35],
  ['Band-pass mix 0 is dry', 'bandpass', { centre_hz: 1000, q: 8, mix: 0 }, (r) => r.every((v) => near(v, 0, 0.01))]
];
for (const [name, type, p, test] of cases) {
  const r = row(type, p);
  ok(test(r), `${name}: ${fmt(r)}`);
}
// Resonance lifts the high-pass corner.
{
  const flat = gainAt('highpass', { cutoff_hz: 500, cutoff: 70, q: 0.7071 }, 500);
  const res = gainAt('highpass', { cutoff_hz: 500, cutoff: 70, q: 6 }, 500);
  ok(near(flat, -3, 0.3) && res > 14, `high-pass resonance at 500 Hz: Q 0.71 ${flat.toFixed(1)} dB, Q 6 +${res.toFixed(1)} dB`);
}
// Neutral and bypass are exact; NaN dials stay finite.
function solo(type, params, bypass, x) {
  const st = W.widget(type, SR); W.apply(st, params, true, !!bypass);
  const t = [0, 0], o = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) { W.step(st, x[i], -x[i], t); o[i] = t[0]; }
  return o;
}
let s = 5;
const noise = new Float32Array(SR / 2).map(() => { s = (s * 1664525 + 1013904223) >>> 0; return (s / 4294967296 - 0.5) * 0.5; });
const same = (a, b) => a.every((v, i) => v === b[i]);
ok(same(solo('eq', { ...V2, low_db: 0, mid_db: 0, high_db: 0 }, false, noise), noise), 'EQ v2 at 0 dB is the dry signal, sample for sample');
ok(same(solo('highpass', { cutoff: 0, cutoff_hz: null, q: 0.7071 }, false, noise), noise), 'high-pass at off is the dry signal, sample for sample');
for (const t of ['eq', 'highpass', 'bandpass']) {
  ok(same(solo(t, { low_db: 18, cutoff: 80, cutoff_hz: 900, centre_hz: 500, q: 6, mix: 1 }, true, noise), noise), `${t}: bypass is the dry signal`);
  const g = solo(t, { low_db: NaN, mid_q: NaN, cutoff: NaN, cutoff_hz: NaN, centre_hz: NaN, q: NaN, mix: NaN }, false, noise);
  ok(g.every(Number.isFinite), `${t}: NaN dials are ignored, output stays finite`);
}
// Ten filters (duplicates), dials sweeping every block, through the limiter: bounded and inside the CPU budget.
{
  const kinds = ['eq', 'highpass', 'bandpass'];
  const ten = [];
  for (let i = 0; i < 10; i++) {
    const t = kinds[i % 3];
    ten.push({ id: t + '-' + (i + 1), type: t, bypass: false, params: { ...V2, low_db: 18, high_db: 18, mid_db: -18, cutoff: 30, cutoff_hz: 80, centre_hz: 1200, q: 3, mix: 0.7 } });
  }
  ten.push({ id: 'limiter', type: 'limiter', fixed: true, params: {} });
  const c = W.create(SR); W.set(c, ten, false);
  ok(c.order.length === 10, 'ten filter hacks load, duplicates and all');
  const n = SR * 4, L = new Float32Array(n), R = new Float32Array(n);
  for (let i = 0; i < n; i++) { s = (s * 1664525 + 1013904223) >>> 0; L[i] = (s / 4294967296 - 0.5); R[i] = -L[i]; }
  const oL = new Float32Array(n), oR = new Float32Array(n);
  const t0 = performance.now();
  for (let i = 0, b = 0; i < n; i += 128, b++) {
    if (b % 8 === 0) { // a dial moving all the time: the slow path
      const st = c.box['eq-1']; W.apply(st, { mid_hz: 300 + (b % 64) * 50 }, false, false);
      W.apply(c.box['highpass-2'], { cutoff_hz: 50 + (b % 32) * 20, cutoff: 40 }, false, false);
      W.apply(c.box['bandpass-3'], { centre_hz: 400 + (b % 32) * 100 }, false, false);
    }
    W.render(c, L.subarray(i, i + 128), R.subarray(i, i + 128), oL.subarray(i, i + 128), oR.subarray(i, i + 128));
  }
  const ms = (performance.now() - t0) / (n / 128);
  let peak = 0, bad = 0;
  for (const ch of [oL, oR]) for (const v of ch) { if (!Number.isFinite(v)) bad++; peak = Math.max(peak, Math.abs(v)); }
  ok(bad === 0 && peak <= lib.CEILING + 1e-6, `ten filters through the limiter: no NaN, peak ${peak.toFixed(4)}`);
  ok(ms < 2.667, `ten filters, dials moving: ${ms.toFixed(3)} ms per 128-frame quantum (budget 2.667 ms)`);
}
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all filter checks pass');
