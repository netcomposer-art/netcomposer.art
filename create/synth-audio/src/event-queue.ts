import type { SituationEvent } from "@workspace/api-client-react";
export class MusicalEventQueue {
  private queue: { event: SituationEvent; audioTime: number }[] = [];
  private seen = new Set<string>();
  private lastAccepted = -Infinity;
  dropped = 0;
  push(event: SituationEvent, audioTime: number, minimumSeconds: number): string | null {
    if (this.seen.has(event.id)) return "duplicate";
    this.seen.add(event.id);
    if (this.seen.size > 2048) this.seen.delete(this.seen.values().next().value!);
    if (this.queue.length >= 32) { this.dropped++; return "queue full — newest event dropped"; }
    if (audioTime - this.lastAccepted < minimumSeconds) { this.dropped++; return "minimum event interval"; }
    this.lastAccepted = audioTime;
    this.queue.push({ event, audioTime }); return null;
  }
  take(boundary: number) {
    if (!this.queue.length || this.queue[0].audioTime > boundary) return null;
    return this.queue.shift()!.event;
  }
  clear() { this.queue = []; this.lastAccepted = -Infinity; }
  get pending() { return this.queue.length; }
}
