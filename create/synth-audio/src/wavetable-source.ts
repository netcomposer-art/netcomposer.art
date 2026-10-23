import { WavetableDSP } from './wavetable-dsp';
import type { OscillatorOptions, OscillatorUnit } from './oscillator';

/** Non-worklet backend for the original DSP. Web Audio control channels carry
 * genuine AudioParams (including automation) into a buffered ScriptProcessor.
 * Source ownership, note timing, VCF/VCA, and output remain with SynthEngine.
 * ScriptProcessor is deprecated: this deliberately trades worklet isolation for
 * broad compatibility; polyphony is limited and latency is documented. */
export const WAVETABLE_BUFFER_SIZE = 1024;
const CONTROL_NAMES = ['frequency', 'detune', 'position', 'warp', 'spread'] as const;

export function createWavetableSource(context: BaseAudioContext, options: OscillatorOptions): OscillatorUnit {
  if (!context.createScriptProcessor) throw new Error('Buffered wavetable audio is not supported in this browser. Native VCO remains available.');
  // Banks are prepared before this constructor; never generated in a callback.
  const dsp = new WavetableDSP(options.table, options.unison, options.position, options.warp, options.spread);
  const node = context.createScriptProcessor(WAVETABLE_BUFFER_SIZE, 6, 1);
  const merger = context.createChannelMerger(6);
  node.channelInterpretation = 'discrete';
  merger.channelInterpretation = 'discrete';
  const controls = CONTROL_NAMES.map((name, index) => {
    const source = context.createConstantSource();
    source.offset.value = options[name];
    source.connect(merger, 0, index);
    source.start(0);
    return source;
  });
  merger.connect(node);
  const parameters = new Map(CONTROL_NAMES.map((name, i) => [name, controls[i].offset]));
  let end = options.end, disposed = false;
  let ended: (() => void) | undefined;
  // Keep control inputs alive until the final buffered output has drained.
  const drain = 3 * WAVETABLE_BUFFER_SIZE / context.sampleRate;
  const stop = (time: number) => {
    end = time;
    for (const control of controls) {
      try { control.stop(Math.max(context.currentTime, time + drain)); } catch { /* already ended */ }
    }
  };
  controls[0].onended = () => { if (!disposed) ended?.(); };
  node.onaudioprocess = event => {
    const output = event.outputBuffer.getChannelData(0);
    output.fill(0);
    if (disposed) return;
    const rate = context.sampleRate;
    for (let offset = 0; offset < output.length; offset += 128) {
      const blockTime = event.playbackTime + offset / rate, length = Math.min(128, output.length - offset);
      if (blockTime + length / rate <= options.start || blockTime >= end) continue;
      const first = Math.max(0, Math.ceil((options.start - blockTime) * rate));
      const last = Math.min(length, Math.ceil((end - blockTime) * rate));
      if (last <= first) continue;
      const inputIndex = offset + first;
      // Match the previous 128-sample k-rate parameter behavior. AudioParam
      // automation arrives through native control inputs rather than UI state.
      const read = (channel: number) => event.inputBuffer.getChannelData(channel)[inputIndex];
      dsp.render(output.subarray(offset + first, offset + last), rate,
        read(0), read(1), read(2), read(3), read(4));
    }
  };
  stop(end);
  return {
    node, frequency: controls[0].offset, detune: controls[1].offset,
    parameters: parameters as unknown as AudioParamMap, components: options.unison,
    stop,
    onended: callback => { ended = callback; },
    dispose: () => {
      if (disposed) return;
      disposed = true; ended = undefined; node.onaudioprocess = null;
      controls[0].onended = null;
      for (const control of controls) {
        try { control.stop(); } catch { /* already ended */ }
        control.disconnect();
      }
      merger.disconnect(); node.disconnect();
    },
  };
}
