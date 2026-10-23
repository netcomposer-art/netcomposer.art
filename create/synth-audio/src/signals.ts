import type { SignalSnapshot, SignalSource } from './types';

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Acquisition lives here; synthesis only consumes normalized snapshots. */
export class SignalRegistry {
  private sources = new Map<string, SignalSource>();
  register(source: SignalSource) { this.sources.set(source.id, source); }
  unregister(id: string) { this.sources.delete(id); }
  sample(id: string, time: number): SignalSnapshot {
    return this.sources.get(id)?.sample(time) ?? {
      id, displayName: 'None', currentValue: 0, normalizedValue: 0, timestamp: time, sourceType: 'none',
    };
  }
  all(time: number) { return [...this.sources.values()].map(source => source.sample(time)); }
}

export class LfoSource implements SignalSource {
  sourceType = 'internal';
  private phase = 0;
  private lastTime = 0;
  constructor(public id: string, public displayName: string, private shape: 'sine' | 'triangle', public rate: number) {}
  sample(time: number): SignalSnapshot {
    this.phase = (this.phase + Math.max(0, time - this.lastTime) * this.rate) % 1;
    this.lastTime = time;
    const value = this.shape === 'sine' ? Math.sin(this.phase * Math.PI * 2) : 1 - 4 * Math.abs(this.phase - 0.5);
    return { id: this.id, displayName: this.displayName, currentValue: value, normalizedValue: value, timestamp: time, sourceType: this.sourceType };
  }
}

/** Slow, irregular future sources can push values without knowing about audio. */
export class SmoothedSource implements SignalSource {
  private value = 0;
  private target = 0;
  private lastTime = 0;
  private updatedAt = 0;
  constructor(public id: string, public displayName: string, public sourceType: string, public smoothing = 0.06) {}
  push(value: number, timestamp: number) {
    this.target = clamp(value, -1, 1);
    this.updatedAt = timestamp;
  }
  sample(time: number): SignalSnapshot {
    const dt = Math.max(0, time - this.lastTime);
    this.value += (this.target - this.value) * (1 - Math.exp(-dt / Math.max(0.001, this.smoothing)));
    this.lastTime = time;
    return { id: this.id, displayName: this.displayName, currentValue: this.target, normalizedValue: this.value, timestamp: this.updatedAt, sourceType: this.sourceType };
  }
}
