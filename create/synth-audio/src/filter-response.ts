import type { SynthSettings } from './types';

/** Web Audio biquad magnitude, including its dB-Q convention for LP/HP. */
export function filterMagnitude(type: SynthSettings['filter'], cutoff: number, resonance: number,
  frequency: number, sampleRate = 48000): number {
  const w = 2 * Math.PI * Math.max(1, Math.min(cutoff, sampleRate * .45)) / sampleRate;
  const q = type === 'bandpass' ? Math.max(.0001, resonance) : Math.pow(10, resonance / 20);
  const c = Math.cos(w), alpha = Math.sin(w) / (2 * q);
  const [b0, b1, b2] = type === 'lowpass'
    ? [(1 - c) / 2, 1 - c, (1 - c) / 2]
    : type === 'highpass' ? [(1 + c) / 2, -(1 + c), (1 + c) / 2]
      : [alpha, 0, -alpha];
  const a0 = 1 + alpha, a1 = -2 * c, a2 = 1 - alpha;
  const f = 2 * Math.PI * Math.min(frequency, sampleRate * .49999) / sampleRate;
  const real = (x0: number, x1: number, x2: number) => x0 + x1 * Math.cos(f) + x2 * Math.cos(2 * f);
  const imag = (x1: number, x2: number) => -x1 * Math.sin(f) - x2 * Math.sin(2 * f);
  return Math.hypot(real(b0, b1, b2), imag(b1, b2)) /
    Math.max(1e-15, Math.hypot(real(a0, a1, a2), imag(a1, a2)));
}
