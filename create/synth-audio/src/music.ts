import { NOTE_NAMES, type SynthSettings } from "./types";
import type { SituationSource } from "@workspace/api-client-react";

export const SCALES: Record<string, number[]> = {
  Major: [0,2,4,5,7,9,11], "Natural Minor": [0,2,3,5,7,8,10],
  "Harmonic Minor": [0,2,3,5,7,8,11], "Melodic Minor": [0,2,3,5,7,9,11],
  Dorian: [0,2,3,5,7,9,10], Phrygian: [0,1,3,5,7,8,10],
  Lydian: [0,2,4,6,7,9,11], Mixolydian: [0,2,4,5,7,9,10],
  Locrian: [0,1,3,5,6,8,10], "Major Pentatonic": [0,2,4,7,9],
  "Minor Pentatonic": [0,3,5,7,10], Blues: [0,3,5,6,7,10],
  Chromatic: [0,1,2,3,4,5,6,7,8,9,10,11],
};
interface ChordDefinition { root: number; suffix: string; intervals: number[] }
const chord = (root: number, suffix: string, intervals: number[]): ChordDefinition => ({ root, suffix, intervals });
const maj7 = [0,4,7,11], min7 = [0,3,7,10], dom7 = [0,4,7,10], halfDim = [0,3,6,10];
/** Deterministic practical voicings, at most five notes. Modal is Dorian. */
export const CHORD_COLLECTIONS: Record<string, ChordDefinition[]> = {
  "Diatonic Major": [chord(0,"maj7",maj7),chord(2,"m7",min7),chord(4,"m7",min7),
    chord(5,"maj7",maj7),chord(7,"7",dom7),chord(9,"m7",min7),chord(11,"m7b5",halfDim)],
  "Diatonic Minor": [chord(0,"m7",min7),chord(2,"m7b5",halfDim),chord(3,"maj7",maj7),
    chord(5,"m7",min7),chord(7,"m7",min7),chord(8,"maj7",maj7),chord(10,"7",dom7)],
  Jazz: [chord(0,"maj9",[0,4,7,11,14]),chord(9,"m7",min7),chord(2,"m9",[0,3,7,10,14]),
    chord(7,"13",[0,4,10,14,21]),chord(4,"m7",min7),chord(9,"7",dom7),chord(2,"m7",min7),chord(7,"7",dom7)],
  Modal: [chord(0,"m7",min7),chord(5,"7",dom7),chord(10,"maj7",maj7),chord(0,"m9",[0,3,7,10,14])],
  Ambient: [chord(0,"add9",[0,7,14,16]),chord(0,"sus2",[0,7,14]),chord(5,"maj7",[0,7,11,16]),
    chord(9,"m7",[0,7,10,15]),chord(7,"sus4",[0,7,17]),chord(5,"add9",[0,7,14,16])],
  Chromatic: [chord(0,"",[0,4,7]),chord(1,"m",[0,3,7]),chord(3,"aug",[0,4,8]),
    chord(6,"dim",[0,3,6]),chord(8,"sus4",[0,5,7]),chord(10,"sus2",[0,2,7])],
};
export const midiName = (midi: number) => `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
export function scaleNotes(key: number, scale: string, octave: number, range: number) {
  const offsets = SCALES[scale] ?? SCALES.Major;
  const root = (Math.min(7, Math.max(1, octave)) + 1) * 12 + key;
  return Array.from({ length: Math.min(3, Math.max(1, range)) }, (_, o) =>
    offsets.map(n => root + o * 12 + n)).flat().filter(n => n >= 0 && n <= 127);
}
export function collectionChords(key: number, collection: string, octave = 3) {
  return (CHORD_COLLECTIONS[collection] ?? CHORD_COLLECTIONS["Diatonic Major"]).map(c => ({
    name: `${NOTE_NAMES[(key + c.root) % 12]}${c.suffix}`,
    notes: c.intervals.map(i => (octave + 1) * 12 + key + c.root + i).filter(n => n >= 0 && n <= 127),
  }));
}
export function positionIndex(value: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.floor(((Math.max(-1, Math.min(1, value)) + 1) / 2) * count)));
}
export function movementIndex(index: number, delta: number, count: number, deadband = .02, threshold = .1, maxStep = 4) {
  const steps = Math.abs(delta) <= deadband ? 0 : Math.min(maxStep, 1 + Math.floor((Math.abs(delta) - deadband) / Math.max(.001, threshold)));
  return Math.max(0, Math.min(count - 1, index + Math.sign(delta) * steps));
}
export interface MusicalSelection { notes: number[]; label: string; held: boolean }
export class MusicInterpreter {
  private signature = "";
  private index = 0;
  private previous: number | null = null;
  private last: MusicalSelection | null = null;
  private nextChordTime = 0;
  private eventIndex = 0;
  reset() { this.signature = ""; this.previous = null; this.last = null; this.nextChordTime = 0; this.eventIndex = 0; }
  select(s: SynthSettings, source: SituationSource | undefined, time: number, gridDuration: number, isEvent = false): MusicalSelection | null {
    const signature = [s.mode,s.situationSource,s.note,s.scale,s.collection,s.octave,s.octaveRange,s.interpretation,s.eventOutput].join("|");
    if (signature !== this.signature) {
      this.reset(); this.signature = signature;
      const count = s.mode === "progression" ? collectionChords(s.note,s.collection,s.octave).length : scaleNotes(s.note,s.scale,s.octave,s.octaveRange).length;
      this.index = Math.floor(count / 2);
    }
    if (s.mode === "progression" && time + .00001 < this.nextChordTime) return null;
    const chordMode = s.mode === "progression" || (s.mode === "event" && s.eventOutput === "chord");
    const list = chordMode ? collectionChords(s.note,s.collection,s.octave)
      : scaleNotes(s.note,s.scale,s.octave,s.octaveRange).map(n => ({ name: midiName(n), notes: [n] }));
    if (!list.length) return null;
    if (s.mode === "event") {
      if (!isEvent || !source || source.status !== "live") return null;
      const selection = list[this.eventIndex++ % list.length];
      return { notes: selection.notes, label: selection.name, held: false };
    }
    const value = source?.conditionedValue;
    const valid = source?.status === "live" && value !== null && value !== undefined && Number.isFinite(value);
    if (valid) {
      if (s.interpretation === "position") this.index = positionIndex(value, list.length);
      else if (this.previous !== null) this.index = movementIndex(this.index, value - this.previous, list.length, s.deadband, s.stepThreshold, s.maxStep);
      this.previous = value;
      const selection = list[this.index];
      this.last = { notes: selection.notes, label: selection.name, held: false };
    }
    if (!this.last) return null; // Never invent a first selection before a real measurement.
    if (s.mode === "progression") {
      const requested = s.chordDuration * 60 / s.tempo;
      this.nextChordTime = time + Math.ceil((requested - .000001) / gridDuration) * gridDuration;
    }
    return { ...this.last, held: !valid };
  }
}
