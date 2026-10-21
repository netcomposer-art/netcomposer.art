// The randomizer: every draw inside its musical range, seeded draws repeat, the count stays 2..6 under the cap,
// and every value is one the take_state v2 validator takes (finite numbers or short strings). Run: node tests/hacks-random.mjs
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sb = { Math, Uint32Array, Date }; sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/hacks/random.js'), 'utf8'), sb);
const R = sb.NCRandom;
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };

// Slider-unit bounds that match the RANGES text (converted through each dial map).
const lp = (v) => 20000 * Math.pow(150 / 20000, v / 100), hp = (v) => 20 * Math.pow(100, v / 100), bp = (v) => 100 * Math.pow(80, v / 100);
const bq = (v) => 0.4 * Math.pow(20, v / 100), hq = (v) => 0.7071 * Math.pow(8 / 0.7071, v / 100), eqq = (v) => 0.3 * Math.pow(20, v / 100);
const eqhz = (v) => 200 * Math.pow(25, v / 100), ratio = (v) => Math.pow(20, v / 100);
const within = (x, lo, hi, tol = 0.04) => x >= lo * (1 - tol) && x <= hi * (1 + tol);
const CHECK = {
  lowpass: (d) => d.cutoff >= 1 && within(lp(d.cutoff), 300, 12000),
  highpass: (d) => d.cutoff >= 1 && within(hp(d.cutoff), 20, 600) && within(hq(d.q), 0.7071, 1.6),
  bandpass: (d) => within(bp(d.centre_hz), 200, 4000) && within(bq(d.q), 0.4, 1.2) && d.mix >= 30 && d.mix <= 80,
  delay: (d) => ['0.5', '0.75', '1', '1.5'].includes(d.delay_beats) && d.feedback >= 10 && d.feedback <= 60 && d.wet >= 10 && d.wet <= 45,
  plate: (d) => d.predelay >= 0 && d.predelay <= 60 && d.size >= 20 && d.size <= 80 && d.decay >= 30 && d.decay <= 80 && d.damping >= 0 && d.damping <= 60 && d.mix >= 10 && d.mix <= 50,
  eq: (d) => [d.low_db, d.mid_db, d.high_db].every((x) => x >= -9 && x <= 9) && within(eqhz(d.mid_hz), 250, 4000) && within(eqq(d.mid_q), 0.6, 2),
  drive: (d) => d.drive_db >= 2 && d.drive_db <= 12 && d.output_db <= -1 && d.output_db >= -3 && d.mix >= 50 && d.mix <= 100,
  compressor: (d) => d.threshold_db >= -30 && d.threshold_db <= -12 && within(ratio(d.ratio), 1.5, 4) && d.attack_ms >= 5 && d.attack_ms <= 30 && d.release_ms >= 80 && d.release_ms <= 400 && d.makeup_db >= 0 && d.makeup_db <= 6,
  width: (d) => d.width >= 60 && d.width <= 160 && d.balance >= -10 && d.balance <= 10
};
const seen = {};
let bad = [];
for (let seed = 1; seed <= 4000; seed++) {
  const r = R.rng(seed);
  for (const t of R.TYPES) {
    const d = R.params(t, r);
    if (!CHECK[t](d)) bad.push([t, seed, d]);
    for (const v of Object.values(d)) if (!(typeof v === 'string' ? v.length <= 64 : Number.isFinite(v))) bad.push([t, seed, 'not finite', d]);
    seen[t] = (seen[t] || 0) + 1;
  }
}
ok(bad.length === 0, `36,000 draws (4000 per type) stay inside their musical ranges${bad.length ? ': ' + JSON.stringify(bad.slice(0, 3)) : ''}`);
// Integer dials stay on the slider's step.
{
  const r = R.rng(7);
  let off = 0;
  for (let i = 0; i < 2000; i++) for (const t of R.TYPES) for (const [k, v] of Object.entries(R.params(t, r))) if (k !== 'delay_beats' && !Number.isInteger(v)) off++;
  ok(off === 0, 'every slider value is a whole step');
}
// Determinism.
{
  const a = JSON.stringify(R.stack(R.rng(42))), b = JSON.stringify(R.stack(R.rng(42))), c = JSON.stringify(R.stack(R.rng(43)));
  ok(a === b, 'the same seed gives the same stack');
  ok(a !== c, 'a different seed gives a different stack');
}
// Count, cap, variety.
{
  const counts = {}, types = {};
  for (let s = 1; s <= 3000; s++) {
    const st = R.stack(R.rng(s));
    counts[st.length] = (counts[st.length] || 0) + 1;
    st.forEach((h) => { types[h.type] = (types[h.type] || 0) + 1; });
  }
  ok(Object.keys(counts).map(Number).every((n) => n >= 2 && n <= 6) && [2, 3, 4, 5, 6].every((n) => counts[n] > 300), `stack sizes 2..6, all reached: ${JSON.stringify(counts)}`);
  ok(R.TYPES.every((t) => types[t] > 600), 'every type in Add a hack turns up');
  ok(R.stack(R.rng(1), 3, 2, 6).length <= 3, 'a smaller cap is respected');
  let dup = 0; for (let s = 1; s <= 500; s++) { const st = R.stack(R.rng(s)); if (new Set(st.map((h) => h.type)).size < st.length) dup++; }
  ok(dup > 0, `duplicates happen (${dup} of 500 stacks)`);
}
// Level safety: the gains that raise level are capped.
{
  let maxMk = 0, maxNet = -99;
  for (let s = 1; s <= 4000; s++) {
    const r = R.rng(s);
    const c = R.params('compressor', r); maxMk = Math.max(maxMk, c.makeup_db);
    const d = R.params('drive', r); maxNet = Math.max(maxNet, d.output_db);
  }
  ok(maxMk <= 6 && maxNet <= -1, `makeup at most ${maxMk} dB, drive output trim at most ${maxNet} dB`);
}
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all randomizer checks pass');
