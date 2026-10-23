import { bankWorkerSource } from 'virtual:netcomposer-banks';
import type { TableId, Waveform } from './types';
import { installBanks, type Bank } from './wavetable-dsp';
import { createWavetableSource } from './wavetable-source';
export interface OscillatorOptions {
  kind: Waveform | 'wavetable'; table: TableId; unison: 1 | 2 | 4;
  frequency: number; detune: number; pulseWidth: number;
  position: number; warp: number; spread: number;
  start: number; end: number; noise: AudioBuffer | null;
}
export interface OscillatorUnit {
  node: AudioNode; frequency: AudioParam | null; detune: AudioParam | null;
  parameters?: AudioParamMap; components: number;
  stop(time: number): void; onended(callback: () => void): void; dispose(): void;
}
const ready = new WeakMap<BaseAudioContext, Promise<void>>();
export async function prepareWavetable(context: BaseAudioContext) {
  let promise = ready.get(context);
  if (!promise) {
    const workerURL = URL.createObjectURL(new Blob([bankWorkerSource], { type: 'text/javascript' }));
    let worker: Worker | undefined;
    let timeout: ReturnType<typeof setTimeout>;
    promise = new Promise<void>((resolve, reject) => {
      timeout = setTimeout(() => reject(new Error('Wavetable bank generation exceeded 15 seconds. Retry Play or select VCO.')), 15000);
      worker = new Worker(workerURL);
      worker.onmessage = event => {
        try { installBanks(event.data as [string, Bank][]); resolve(); } catch (error) { reject(error); }
      };
      worker.onerror = event => reject(new Error(`Wavetable bank generation failed: ${event.message}`));
      worker.onmessageerror = () => reject(new Error('Wavetable bank data could not be received.'));
    }).finally(() => {
      clearTimeout(timeout!);
      worker?.terminate();
      URL.revokeObjectURL(workerURL);
    });
    ready.set(context, promise);
    void promise.catch(() => ready.delete(context));
  }
  return promise;
}
const pulseCache = new WeakMap<BaseAudioContext, Map<number, PeriodicWave>>();
/** Fourier pulse with zero DC; browser PeriodicWave provides pitch-dependent
 * band limiting. Quantized 1% duty steps are source-crossfaded by the engine. */
export function pulseWave(context: BaseAudioContext, width: number) {
  const key = Math.round(Math.max(.05, Math.min(.95, width)) * 100);
  let cache = pulseCache.get(context);
  if (!cache) { cache = new Map(); pulseCache.set(context, cache); }
  let wave = cache.get(key);
  if (!wave) {
    const real = new Float32Array(129), imag = new Float32Array(129), duty = key / 100;
    for (let h = 1; h < real.length; h++) {
      real[h] = 2 * Math.sin(2 * Math.PI * h * duty) / (Math.PI * h);
      imag[h] = 2 * (1 - Math.cos(2 * Math.PI * h * duty)) / (Math.PI * h);
    }
    wave = context.createPeriodicWave(real, imag);
    cache.set(key, wave);
  }
  return wave;
}
export function createOscillatorUnit(context: BaseAudioContext, options: OscillatorOptions): OscillatorUnit {
  const p = options;
  if (p.kind === 'wavetable') {
    return createWavetableSource(context, p);
  }
  const node = p.kind === 'noise' ? context.createBufferSource() : context.createOscillator();
  if (node instanceof OscillatorNode) {
    if (p.kind === 'square') node.setPeriodicWave(pulseWave(context, p.pulseWidth));
    else node.type = p.kind === 'saw' ? 'sawtooth' : p.kind as OscillatorType;
    node.frequency.value = p.frequency; node.detune.value = p.detune;
  } else { node.buffer = p.noise; node.loop = true; }
  node.start(p.start); node.stop(Math.max(p.start + .015, p.end));
  return {
    node, frequency: node instanceof OscillatorNode ? node.frequency : null,
    detune: node instanceof OscillatorNode ? node.detune : null, components: 1,
    stop: time => { try { node.stop(time); } catch { /* already ended */ } },
    onended: callback => { node.onended = callback; }, dispose: () => node.disconnect(),
  };
}
