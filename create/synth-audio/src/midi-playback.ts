import type { MidiFile, MidiNote } from './midi-file';

/** Audio-clock cursor, shared with the engine's existing lookahead timer. */
export class MidiPlayback {
  private index = 0;
  private cycle = 0;
  private origin = 0;
  private lastCycle = Infinity;
  constructor(readonly file: MidiFile, public loop = false) {}
  start(time: number) {
    this.index = 0; this.cycle = 0; this.origin = time;
    this.lastCycle = this.loop ? Infinity : 0;
  }
  setLoop(loop: boolean, now: number) {
    this.loop = loop;
    this.lastCycle = loop ? Infinity : Math.max(0, Math.floor((now - this.origin) / this.file.duration));
    if (!loop && this.cycle > this.lastCycle) {
      this.cycle = this.lastCycle + 1; this.index = 0;
    }
    return this.origin + (this.lastCycle + 1) * this.file.duration;
  }
  position(now: number) {
    const elapsed = Math.max(0, now - this.origin);
    return this.loop ? elapsed % this.file.duration : Math.min(elapsed - Math.min(this.lastCycle, Math.floor(elapsed / this.file.duration)) * this.file.duration, this.file.duration);
  }
  ended(now: number) { return !this.loop && now >= this.origin + (this.lastCycle + 1) * this.file.duration; }
  schedule(now: number, horizon: number, emit: (note: MidiNote, time: number) => void) {
    // Skip elapsed loops after a background-tab stall; never burst old notes.
    const current = Math.max(0, Math.floor((now - this.origin) / this.file.duration));
    if (current > this.cycle) { this.cycle = current; this.index = 0; }
    while (this.cycle <= this.lastCycle) {
      const note = this.file.notes[this.index];
      const time = this.origin + this.cycle * this.file.duration + note.time;
      if (time >= horizon) return;
      if (time >= now - .03) emit(note, Math.max(now, time));
      if (++this.index === this.file.notes.length) {
        this.index = 0; this.cycle++;
      }
    }
  }
}
