import { DEFAULT_SETTINGS, type SynthSettings } from './types';
/** Additive migration of stored V1/V2/V3 patches. New oscillator fields are
 * independently validated; malformed new fields never discard older settings. */
export function mergeSettings(raw: unknown): SynthSettings {
  if (!raw || typeof raw !== 'object') return structuredClone(DEFAULT_SETTINGS);
  const r = raw as Partial<SynthSettings>;
  const out = structuredClone(DEFAULT_SETTINGS);
  for (const k of Object.keys(DEFAULT_SETTINGS) as (keyof SynthSettings)[]) {
    const v = r[k], d = DEFAULT_SETTINGS[k];
    if (v === undefined || v === null) continue;
    if (Array.isArray(d)) {
      if (Array.isArray(v) && v.length === d.length)
        (out as unknown as Record<string, unknown>)[k] = v.map((slot, i) => ({ ...d[i], ...(typeof slot === 'object' && slot ? slot : {}) }));
    } else if (typeof v === typeof d && (typeof v !== 'number' || Number.isFinite(v)))
      (out as unknown as Record<string, unknown>)[k] = v;
  }
  const number = (key: keyof SynthSettings, min: number, max: number, integer = false) => {
    const value = out[key] as number;
    (out as unknown as Record<string, unknown>)[key] = Math.max(min, Math.min(max, integer ? Math.round(value) : value));
  };
  const choice = (key: keyof SynthSettings, choices: readonly (string | number)[]) => {
    if (!choices.includes(out[key] as string | number))
      (out as unknown as Record<string, unknown>)[key] = DEFAULT_SETTINGS[key];
  };
  choice('oscillatorMode', ['vco', 'wavetable']);
  choice('waveform', ['saw', 'noise', 'sine', 'triangle', 'square']);
  choice('filter', ['lowpass', 'highpass', 'bandpass']);
  choice('wavetable', ['basic', 'harmonic', 'formant', 'metallic', 'vocal', 'digital']);
  choice('unison', [1, 2, 4]); choice('subWaveform', ['sine', 'triangle', 'square']); choice('subOctave', [-1, -2]);
  number('oscillatorOctave', -2, 2, true); number('detune', -100, 100); number('pulseWidth', .05, .95);
  for (const key of ['position', 'warp', 'spread', 'subLevel'] as const) number(key, 0, 1);
  return out;
}
