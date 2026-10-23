import { CHORDS, type SynthSettings } from './types.ts';

/** Direction reversals don't repeat either endpoint. Arp-off ignores octave span. */
export function generateNotes(s: SynthSettings, step: number, random = Math.random): number[] {
  const root = Math.min(127, Math.max(0, (s.octave + 1) * 12 + s.note));
  if (s.mode === 'single') return [root];
  if (s.mode === 'random') {
    const lower = Math.min(127, (s.octave + 1) * 12);
    const upper = Math.min(127, lower + s.octaveRange * 12 - 1);
    return [lower + Math.floor(random() * (upper - lower + 1))];
  }
  const offsets = CHORDS[s.chord] ?? CHORDS.Major;
  const chord = offsets.map(n => Math.min(127, root + n));
  if (s.arp === 'off') return chord;
  const octaves = Math.min(4, Math.max(1, Math.round(s.arpOctaves)));
  const notes = [...new Set(Array.from({ length: octaves }, (_, octave) =>
    offsets.map(n => root + n + octave * 12)).flat().filter(n => n <= 127))].sort((a, b) => a - b);
  const last = notes.length - 1;
  let index = step % notes.length;
  if (s.arp === 'random') index = Math.floor(random() * notes.length);
  else if (s.arp === 'down') index = last - index;
  else if ((s.arp === 'up-down' || s.arp === 'down-up') && last > 0) {
    const position = step % (last * 2);
    index = position <= last ? position : last * 2 - position;
    if (s.arp === 'down-up') index = last - index;
  }
  return [notes[index]];
}
