export type Mode = 'single' | 'chord' | 'random' | 'melody' | 'progression' | 'event';
export type SourceId = string;
export type Destination = 'pitch' | 'cutoff' | 'resonance' | 'attack' | 'decay' | 'sustain' | 'release' | 'level';
export interface ModSlot { source: SourceId; destination: Destination; amount: number }
export type Waveform = 'saw' | 'noise' | 'sine' | 'triangle' | 'square';
export type TableId = 'basic' | 'harmonic' | 'formant' | 'metallic' | 'vocal' | 'digital';
export interface SynthSettings {
  mode: Mode; note: number; octave: number; chord: string;
  tempo: number; interval: number; gate: number; arp: 'off' | 'up' | 'down' | 'up-down' | 'down-up' | 'random';
  arpOctaves: number;
  octaveRange: number; waveform: Waveform; tuning: number;
  oscillatorMode: 'vco' | 'wavetable'; oscillatorOctave: number; detune: number; pulseWidth: number;
  wavetable: TableId; position: number; warp: number; unison: 1 | 2 | 4; spread: number;
  subEnabled: boolean; subWaveform: 'sine' | 'triangle' | 'square'; subOctave: -1 | -2; subLevel: number;
  filter: 'lowpass' | 'highpass' | 'bandpass'; cutoff: number; resonance: number;
  attack: number; decay: number; sustain: number; release: number; level: number;
  master: number; lfo1: number; lfo2: number; manual: number;
  scale: string; collection: string; situationSource: string;
  interpretation: 'position' | 'movement'; deadband: number; stepThreshold: number; maxStep: number;
  chordDuration: number; eventOutput: 'note' | 'chord'; minEventInterval: number;
  vcoMods: ModSlot[]; vcfMods: ModSlot[]; vcaMods: ModSlot[];
}
export interface SignalSnapshot {
  id: string; displayName: string; currentValue: number; normalizedValue: number;
  timestamp: number; sourceType: string;
}
export interface SignalSource { id: string; displayName: string; sourceType: string; sample(time: number): SignalSnapshot }
export interface EngineStatus { playing: boolean; notes: string; trigger: number; voices: number; audioState: string }
export const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
export const CHORDS: Record<string, number[]> = {
  Major: [0,4,7], Minor: [0,3,7], Diminished: [0,3,6], Augmented: [0,4,8],
  'Major 7th': [0,4,7,11], 'Minor 7th': [0,3,7,10], 'Dominant 7th': [0,4,7,10],
  Sus2: [0,2,7], Sus4: [0,5,7],
};
export const DEFAULT_SETTINGS: SynthSettings = {
  mode:'single', note:0, octave:3, chord:'Minor 7th', tempo:120, interval:4, gate:75,
  arp:'off', arpOctaves:1, octaveRange:2, waveform:'saw', tuning:0, filter:'lowpass', cutoff:2000,
  oscillatorMode:'vco', oscillatorOctave:0, detune:0, pulseWidth:.5,
  wavetable:'basic', position:0, warp:0, unison:1, spread:0,
  subEnabled:false, subWaveform:'sine', subOctave:-1, subLevel:0,
  resonance:1, attack:0.01, decay:0.2, sustain:70, release:0.5, level:70,
  master:65, lfo1:0.5, lfo2:0.25, manual:0,
  scale:'Dorian', collection:'Diatonic Major', situationSource:'',
  interpretation:'position', deadband:0.02, stepThreshold:0.10, maxStep:4,
  chordDuration:4, eventOutput:'note', minEventInterval:1,
  vcoMods:[{source:'none',destination:'pitch',amount:0},{source:'none',destination:'pitch',amount:0}],
  vcfMods:[{source:'none',destination:'cutoff',amount:0},{source:'none',destination:'resonance',amount:0}],
  vcaMods:[{source:'none',destination:'level',amount:0},{source:'none',destination:'sustain',amount:0}],
};
