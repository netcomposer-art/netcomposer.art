// EQ, drive, compressor and width: neutral = dry, bypass = dry, no NaN, bounded, and the CPU budget.
// Built the way engine.js ships the worklet (pinned constants + function sources). Run: node tests/hacks-new.mjs
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
const SR = 48000, QN = 128;
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };

function sig(seconds, seed = 3, stereo = true) {
  const n = Math.round(seconds * SR), l = new Float32Array(n), r = new Float32Array(n);
  let s = seed >>> 0;
  for (let i = 0; i < n; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const nz = (s / 4294967296 - 0.5) * 0.3, env = (i % 9600) < 2400 ? 1 : 0.1;
    l[i] = env * (0.7 * Math.sin(2 * Math.PI * 110 * i / SR) + nz);
    r[i] = stereo ? env * (0.7 * Math.sin(2 * Math.PI * 165 * i / SR) - nz) : l[i];
  }
  return [l, r];
}
// One hack alone, no limiter, so neutral/bypass can be compared with the input exactly.
function solo(type, params, bypass, inL, inR) {
  const st = W.widget(type, SR); st.immediate = false;
  W.apply(st, params, true, !!bypass);
  const n = inL.length, oL = new Float32Array(n), oR = new Float32Array(n), t = [0, 0];
  for (let i = 0; i < n; i++) { W.step(st, inL[i], inR[i], t); oL[i] = t[0]; oR[i] = t[1]; }
  return [oL, oR];
}
const eqArr = (a, b) => a.every((v, i) => v === b[i]);
function stats(o) {
  let bad = 0, peak = 0;
  for (const ch of o) for (const v of ch) { if (!Number.isFinite(v)) bad++; peak = Math.max(peak, Math.abs(v)); }
  return { bad, peak };
}
const NEUTRAL = {
  eq: { low_db: 0, mid_db: 0, mid_hz: 1000, high_db: 0 },
  drive: { drive_db: 0, output_db: 0, mix: 1 },
  compressor: { threshold_db: 0, ratio: 1, attack_ms: 10, release_ms: 150, makeup_db: 0 },
  width: { width: 1, balance: 0 }
};
const HOT = {
  eq: { low_db: 12, mid_db: -12, mid_hz: 3000, high_db: 12 },
  drive: { drive_db: 24, output_db: 6, mix: 1 },
  compressor: { threshold_db: -40, ratio: 20, attack_ms: 1, release_ms: 10, makeup_db: 24 },
  width: { width: 2, balance: -0.5 }
};
const [L, R] = sig(1.0);
for (const t of Object.keys(NEUTRAL)) {
  const n = solo(t, NEUTRAL[t], false, L, R);
  ok(eqArr(n[0], L) && eqArr(n[1], R), `${t}: neutral defaults are the dry signal, sample for sample`);
  const b = solo(t, HOT[t], true, L, R);
  ok(eqArr(b[0], L) && eqArr(b[1], R), `${t}: bypass is the dry signal`);
  const h = solo(t, HOT[t], false, L, R);
  const s = stats(h);
  ok(s.bad === 0 && s.peak < 64, `${t}: extreme dials, no NaN, peak ${s.peak.toFixed(2)} before the limiter`);
  ok(!eqArr(h[0], L), `${t}: extreme dials change the sound`);
  // Garbage in: NaN params fall back, a full-scale square stays finite.
  const sq = new Float32Array(SR / 4).map((_, i) => (i % 100 < 50 ? 1 : -1));
  const g = solo(t, Object.fromEntries(Object.keys(HOT[t]).map((k) => [k, NaN])), false, sq, sq);
  ok(stats(g).bad === 0, `${t}: NaN dials are ignored, output stays finite`);
}
// Width on a mono source does nothing, at any width.
{
  const [ml, mr] = sig(0.5, 9, false);
  const w = solo('width', { width: 2, balance: 0 }, false, ml, mr);
  ok(w[0].every((v, i) => Math.abs(v - ml[i]) < 1e-7) && w[1].every((v, i) => Math.abs(v - mr[i]) < 1e-7), 'width: a mono source comes out unchanged at 200%');
  const z = solo('width', { width: 0 }, false, L, R);
  ok(z[0].every((v, i) => Math.abs(v - z[1][i]) < 1e-7), 'width: 0% folds stereo to mono');
}
// Drive keeps a -12 dBFS sine at about its level (gain-compensated).
{
  const n = SR / 2, x = new Float32Array(n).map((_, i) => 0.25 * Math.sin(2 * Math.PI * 440 * i / SR));
  const y = solo('drive', { drive_db: 18 }, false, x, x)[0];
  let px = 0, py = 0; for (let i = n / 2; i < n; i++) { px = Math.max(px, Math.abs(x[i])); py = Math.max(py, Math.abs(y[i])); }
  const db = 20 * Math.log10(py / px);
  ok(Math.abs(db) < 1.5, `drive: 18 dB of drive, a -12 dBFS sine moves ${db.toFixed(2)} dB`);
}
// Compressor: 20:1 at -20 dB pulls a loud steady tone down.
{
  const n = SR, x = new Float32Array(n).map((_, i) => 0.9 * Math.sin(2 * Math.PI * 220 * i / SR));
  const y = solo('compressor', { threshold_db: -20, ratio: 20, attack_ms: 5, release_ms: 100 }, false, x, x)[0];
  let py = 0; for (let i = n / 2; i < n; i++) py = Math.max(py, Math.abs(y[i]));
  const out = 20 * Math.log10(py);
  ok(out < -15 && out > -22, `compressor: -0.9 dBFS in, ${out.toFixed(1)} dBFS out at 20:1 / -20 dB`);
}
// EQ: +12 dB low shelf lifts 60 Hz by about 12 dB and leaves 8 kHz alone.
{
  const tone = (hz) => new Float32Array(SR).map((_, i) => 0.1 * Math.sin(2 * Math.PI * hz * i / SR));
  const gain = (hz) => { const x = tone(hz), y = solo('eq', { low_db: 12 }, false, x, x)[0]; let a = 0, b = 0; for (let i = SR / 2; i < SR; i++) { a = Math.max(a, Math.abs(x[i])); b = Math.max(b, Math.abs(y[i])); } return 20 * Math.log10(b / a); };
  const lo = gain(60), hi = gain(8000);
  ok(lo > 10.5 && lo < 12.5 && Math.abs(hi) < 0.5, `eq: low +12 dB gives ${lo.toFixed(2)} dB at 60 Hz, ${hi.toFixed(2)} dB at 8 kHz`);
}
// A full stack: ten hacks of the new kinds (duplicates included), everything moving, through the limiter.
{
  const types = ['eq', 'drive', 'compressor', 'width'];
  const ten = [];
  for (let i = 0; i < 10; i++) { const t = types[i % 4]; ten.push({ id: t + '-' + (i + 1), type: t, bypass: false, params: HOT[t] }); }
  ten.push({ id: 'limiter', type: 'limiter', fixed: true, params: {} });
  const c = W.create(SR); W.set(c, ten, false);
  ok(c.order.length === 10, 'ten new hacks load, duplicates and all');
  const [bl, br] = sig(4, 11);
  const oL = new Float32Array(bl.length), oR = new Float32Array(bl.length);
  const t0 = performance.now();
  for (let i = 0; i < bl.length; i += QN) W.render(c, bl.subarray(i, i + QN), br.subarray(i, i + QN), oL.subarray(i, i + QN), oR.subarray(i, i + QN));
  const ms = (performance.now() - t0) / (bl.length / QN);
  const s = stats([oL, oR]);
  ok(s.bad === 0 && s.peak <= lib.CEILING + 1e-6, `ten hacks through the limiter: no NaN, peak ${s.peak.toFixed(4)}`);
  ok(ms < 2.667, `ten new hacks: ${ms.toFixed(3)} ms per 128-frame quantum (budget 2.667 ms)`);
  // Mixed: the heaviest old hack (plate) with the new ones.
  const mix = ['plate', 'eq', 'drive', 'compressor', 'width', 'delay', 'plate', 'eq', 'compressor', 'lowpass'].map((t, i) => ({ id: t + '-' + (i + 1), type: t, bypass: false, params: Object.assign({ mix: 0.4, wet: 0.4, decay: 0.7, cutoff: 40, cutoff_hz: 2000 }, HOT[t] || {}) }));
  const c2 = W.create(SR); W.set(c2, mix, false);
  const t1 = performance.now();
  for (let i = 0; i < bl.length; i += QN) W.render(c2, bl.subarray(i, i + QN), br.subarray(i, i + QN), oL.subarray(i, i + QN), oR.subarray(i, i + QN));
  const ms2 = (performance.now() - t1) / (bl.length / QN);
  ok(stats([oL, oR]).bad === 0 && ms2 < 2.667, `mixed ten (two plates, delay, filter, new hacks): ${ms2.toFixed(3)} ms per quantum`);
}
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all new hack checks pass');
