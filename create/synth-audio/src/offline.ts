/**
 * lib/synth-audio/src/offline.ts
 *
 * Render a written note list on OfflineAudioContext. Every note is scheduled
 * up front through SynthEngine.scheduleNote, which calls the existing
 * createVoice path (oscillator, filter, ADSR, sub, bus, compressor, master).
 * This file does not reimplement that DSP.
 *
 * Wavetable playback uses a deprecated ScriptProcessor and is not selected
 * here. A wavetable patch falls back to its plain waveform.
 */
import { SynthEngine } from './engine';
import { mergeSettings } from './settings';
import type { SynthSettings } from './types';

export interface OfflineNote {
  midi?: number;
  pitch?: string;
  note?: string;
  velocity?: number;
  start: number;
  length: number;
}

const RATE = 48000;
const PC: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** Same mulberry32 as the site. Seed 0 starts at 1 so a missing seed still repeats. */
export function mulberry32(seed: number) {
  let a = (seed >>> 0) || 1;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function midiOf(name: string): number | null {
  const m = /^([A-Ga-g])(#|b)?(-?\d+)$/.exec(name || '');
  if (!m) return null;
  const pc = PC[m[1].toUpperCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  const n = (+m[3] + 1) * 12 + pc;
  return n >= 0 && n <= 127 ? n : null;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export async function renderNotes(
  notes: OfflineNote[] | null | undefined,
  settings: Partial<SynthSettings> | SynthSettings | null | undefined,
  seed: number,
): Promise<AudioBuffer> {
  const s = mergeSettings(settings);
  if (s.oscillatorMode === 'wavetable') s.oscillatorMode = 'vco';
  const list: { midi: number; velocity: number; start: number; length: number }[] = [];
  for (const n of notes || []) {
    if (!n) continue;
    const midi = typeof n.midi === 'number' ? n.midi : midiOf(n.pitch || n.note || '');
    if (midi == null || !Number.isFinite(n.start) || !(n.length > 0)) continue;
    list.push({
      midi: clamp(Math.round(midi), 0, 127),
      velocity: n.velocity == null ? 0.82 : clamp(+n.velocity, 0, 1),
      start: Math.max(0, +n.start),
      length: +n.length,
    });
  }
  const tail = (Number.isFinite(s.release) ? Math.max(0, s.release) : 0.5) + 0.05;
  let end = 0.05;
  for (const n of list) end = Math.max(end, n.start + n.length + tail);
  const context = new OfflineAudioContext(2, Math.max(1, Math.ceil(end * RATE)), RATE);
  const engine = new SynthEngine(s);
  await engine.open(context, mulberry32(seed));
  for (const n of list) engine.scheduleNote(n.midi, n.start, n.length, n.velocity);
  return context.startRendering();
}
