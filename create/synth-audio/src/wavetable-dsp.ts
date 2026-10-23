/**
 * Original NetComposer DSP. Five single-cycle frames per bank, nine baked
 * phase-distortion amounts, and eight Fourier-limited mip levels. No samples,
 * network requests, third-party DSP, or allocations in the sample loop.
 */
export const TABLES = [
  { id: 'basic', label: 'Basic Shapes' }, { id: 'harmonic', label: 'Harmonic Sweep' },
  { id: 'formant', label: 'Formant' }, { id: 'metallic', label: 'Metallic' },
  { id: 'vocal', label: 'Vocal' }, { id: 'digital', label: 'Digital' },
] as const;
export const SIZE = 1024;
const FRAMES = 5, WARPS = 9, LEVELS = 8, TAU = Math.PI * 2;
export type Bank = Float32Array[][][];
const banks = new Map<string, Bank>();
/** Install precomputed cycles; live audio never performs FFT/bank construction. */
export function installBanks(entries: [string, Bank][]) {
  for (const [id, bank] of entries) banks.set(id, bank);
}
const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

function fft(real: Float64Array, imag: Float64Array, inverse: boolean) {
  const n = real.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [real[i], real[j]] = [real[j], real[i]]; [imag[i], imag[j]] = [imag[j], imag[i]]; }
  }
  for (let len = 2; len <= n; len *= 2) {
    const angle = (inverse ? 1 : -1) * TAU / len, wr = Math.cos(angle), wi = Math.sin(angle);
    for (let i = 0; i < n; i += len) {
      let r = 1, im = 0;
      for (let j = 0; j < len / 2; j++) {
        const a = i + j, b = a + len / 2;
        const br = real[b] * r - imag[b] * im, bi = real[b] * im + imag[b] * r;
        real[b] = real[a] - br; imag[b] = imag[a] - bi;
        real[a] += br; imag[a] += bi;
        const next = r * wr - im * wi; im = r * wi + im * wr; r = next;
      }
    }
  }
  if (inverse) for (let i = 0; i < n; i++) { real[i] /= n; imag[i] /= n; }
}
function coefficient(bank: string, frame: number, harmonic: number) {
  const t = frame / (FRAMES - 1), h = harmonic;
  switch (bank) {
    case 'basic': {
      const sine = h === 1 ? 1 : 0, triangle = h % 2 ? (-1) ** ((h - 1) / 2) / h ** 2 : 0;
      const square = h % 2 ? 1 / h : 0, saw = (h % 2 ? 1 : -1) / h;
      return [sine, triangle, square, saw, h % 2 ? 1 / h : .65 / h][frame];
    }
    case 'harmonic': return Math.exp(-(((h - (1 + t * 18)) / (1.5 + 4 * t)) ** 2)) / Math.sqrt(h) + (h === 1 ? .35 : 0);
    case 'formant': return (.15 + 2 * Math.exp(-(((h - (3 + t * 14)) / 2) ** 2))) / h;
    case 'metallic': return (h === 1 ? .35 : 0) + (Math.sin(h * (1.2 + t * 2)) > .1 ? 1 : -.4) / Math.sqrt(h);
    case 'vocal': return (Math.exp(-(((h - (2 + t * 4)) / 1.2) ** 2)) + .7 * Math.exp(-(((h - (10 - t * 3)) / 1.7) ** 2)) + .05) / Math.sqrt(h);
    case 'digital': return (h === 1 ? .4 : 0) + (Math.cos(h * (1 + t * 2.4)) > .3 ? (h % 2 ? 1 : -1) / Math.sqrt(h) : 0);
    default: return h === 1 ? 1 : 0;
  }
}
export function getBank(id: string): Bank {
  const cached = banks.get(id);
  if (cached) return cached;
  const bank: Bank = [];
  for (let frame = 0; frame < FRAMES; frame++) {
    const variants: Float32Array[][] = [];
    for (let warp = 0; warp < WARPS; warp++) {
      const real = new Float64Array(SIZE), imag = new Float64Array(SIZE);
      let peak = 0;
      for (let i = 0; i < SIZE; i++) {
        const phase = i / SIZE + (warp / (WARPS - 1)) * .12 * Math.sin(TAU * i / SIZE);
        let value = 0;
        for (let h = 1; h <= 32; h++) value += coefficient(id, frame, h) * Math.sin(TAU * phase * h);
        real[i] = value; peak = Math.max(peak, Math.abs(value));
      }
      // Normalize before mip generation so levels share the same scale.
      for (let i = 0; i < SIZE; i++) real[i] /= Math.max(1, peak) * 1.15;
      fft(real, imag, false);
      const mips: Float32Array[] = [];
      for (let level = 0; level < LEVELS; level++) {
        const r = real.slice(), im = imag.slice(), limit = 2 ** level;
        r[0] = im[0] = 0; // no DC, including after warp
        for (let h = limit + 1; h < SIZE - limit; h++) r[h] = im[h] = 0;
        fft(r, im, true);
        const output = Float32Array.from(r);
        // Absolute-sum interpolation and gain staging assume bounded frames.
        const max = Math.max(...output.map(Math.abs));
        if (max > 1) for (let i = 0; i < SIZE; i++) output[i] /= max;
        mips.push(output);
      }
      variants.push(mips);
    }
    bank.push(variants);
  }
  banks.set(id, bank);
  return bank;
}
function cycle(table: Float32Array, phase: number) {
  const p = (phase - Math.floor(phase)) * SIZE, index = Math.floor(p), fraction = p - index;
  return table[index] + (table[(index + 1) % SIZE] - table[index]) * fraction;
}
function mip(bank: Bank, frame: number, warp: number, phase: number, level: number) {
  const lo = Math.floor(level), hi = Math.min(LEVELS - 1, lo + 1), blend = level - lo;
  return cycle(bank[frame][warp][lo], phase) * (1 - blend) + cycle(bank[frame][warp][hi], phase) * blend;
}
export function tableSample(bank: Bank, phase: number, position: number, warp: number, level = LEVELS - 1) {
  const p = clamp(position) * (FRAMES - 1), a = Math.floor(p), b = Math.min(FRAMES - 1, a + 1), t = p - a;
  const w = clamp(warp) * (WARPS - 1), x = Math.floor(w), y = Math.min(WARPS - 1, x + 1), u = w - x;
  const first = mip(bank, a, x, phase, level) * (1 - u) + mip(bank, a, y, phase, level) * u;
  const last = mip(bank, b, x, phase, level) * (1 - u) + mip(bank, b, y, phase, level) * u;
  return first * (1 - t) + last * t;
}
export function waveformPreview(id: string, position: number, warp: number, count = 160) {
  const bank = getBank(id);
  return Float32Array.from({ length: count }, (_, i) => tableSample(bank, i / count, position, warp));
}
export const unisonCents = (index: number, count: number, spread: number) => count === 1 ? 0 : ((index / (count - 1)) * 2 - 1) * clamp(spread) * 35;
export class WavetableDSP {
  private phases = new Float64Array(4);
  private position: number;
  private warp: number;
  private spread: number;
  private bank: Bank;
  constructor(id: string, readonly unison: 1 | 2 | 4, position = 0, warp = 0, spread = 0) {
    this.bank = getBank(id); this.position = position; this.warp = warp; this.spread = spread;
  }
  render(output: Float32Array, sampleRate: number, frequency: number, detune: number, position: number, warp: number, spread: number) {
    const smooth = 1 - Math.exp(-1 / (.012 * sampleRate));
    for (let sample = 0; sample < output.length; sample++) {
      this.position += (clamp(position) - this.position) * smooth;
      this.warp += (clamp(warp) - this.warp) * smooth;
      this.spread += (clamp(spread) - this.spread) * smooth;
      let value = 0;
      for (let voice = 0; voice < this.unison; voice++) {
        const hz = clamp(frequency * 2 ** ((detune + unisonCents(voice, this.unison, this.spread)) / 1200), 1, sampleRate * .45);
        // Both interpolated levels stay below Nyquist, with one octave of
        // harmonic taper instead of abrupt mip switches.
        const level = clamp(Math.log2(sampleRate * .45 / hz) - 1, 0, LEVELS - 1);
        value += tableSample(this.bank, this.phases[voice], this.position, this.warp, level) / this.unison;
        this.phases[voice] = (this.phases[voice] + hz / sampleRate) % 1;
      }
      output[sample] = value;
    }
  }
}
