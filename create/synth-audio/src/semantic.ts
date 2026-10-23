/** Provider-independent semantic controls. No network or React dependencies. */
export const DIMENSIONS = ['intimacy', 'energy', 'tension', 'ambiguity', 'movement'] as const;
export type Dimension = typeof DIMENSIONS[number];
export type SemanticValues = Record<Dimension, number>;
export interface SemanticSegment { id: string; text: string; values: SemanticValues }
export interface SemanticAnalysis {
  schemaVersion: 1; id: string; language: string; segments: SemanticSegment[];
  sourceText: string; model: string; analyzedAt: string; kind: 'ai' | 'fixture';
  configuration: Record<string, string | number>;
}
export const DESTINATIONS = [
  { id: 'cutoff', label: 'VCF · Cutoff', unit: 'Hz' },
  { id: 'resonance', label: 'VCF · Resonance', unit: 'Q' },
  { id: 'amplitude', label: 'VCA · Amplitude', unit: '%' },
  { id: 'attack', label: 'VCA · Attack', unit: 's' },
  { id: 'release', label: 'VCA · Release', unit: 's' },
  { id: 'pitch', label: 'VCO · Pitch', unit: 'st' },
  { id: 'detune', label: 'VCO · Detune', unit: 'ct' },
  { id: 'duration', label: 'Note · Duration', unit: '×' },
  { id: 'register', label: 'Note · Register', unit: 'st' },
  { id: 'position', label: 'Wavetable · Position', unit: '%' },
  { id: 'warp', label: 'Wavetable · Warp', unit: '%' },
  { id: 'spread', label: 'Wavetable · Spread', unit: '%' },
  { id: 'subLevel', label: 'Sub · Level', unit: '%' },
  { id: 'pulseWidth', label: 'VCO · Pulse Width', unit: '%' },
] as const;
export type SemanticDestination = typeof DESTINATIONS[number]['id'];
export interface SemanticRoute {
  id: string; source: Dimension; destination: SemanticDestination;
  depth: number; inverted: boolean; enabled: boolean;
}
export interface SemanticConfig {
  enabled: boolean; analysis: SemanticAnalysis | null;
  overrides: Partial<SemanticValues>; routes: SemanticRoute[];
  timeline: { interpolation: 'step' | 'smooth'; beatsPerSegment: number; loop: boolean };
}
export const neutralValues = (): SemanticValues => ({ intimacy: .5, energy: .5, tension: .5, ambiguity: .5, movement: .5 });
export const defaultSemanticConfig = (): SemanticConfig => ({
  enabled: false, analysis: null, overrides: {}, routes: [],
  timeline: { interpolation: 'step', beatsPerSegment: 4, loop: true },
});
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));
export function contribution(config: SemanticConfig, values: SemanticValues, destination: SemanticDestination) {
  if (!config.enabled) return 0;
  return config.routes.reduce((sum, route) => sum + (route.enabled && route.destination === destination
    ? (clamp(values[route.source], 0, 1) - .5) * 2 * clamp(route.depth, 0, 1) * (route.inverted ? -1 : 1) : 0), 0);
}
/** All routes sum once in destination-specific units, then clamp; never mutate bases. */
export function semanticEffective(base: number, destination: SemanticDestination, amount: number, maxFrequency = 20000) {
  switch (destination) {
    case 'cutoff': return clamp(base * 2 ** (amount * 6), 20, maxFrequency);
    case 'resonance': return clamp(base + amount * 12, .1, 20);
    case 'amplitude': return clamp(base * 2 ** (amount * 2), 0, 1);
    case 'attack': return clamp(base * 2 ** (amount * 4), .001, 5);
    case 'release': return clamp(base * 2 ** (amount * 4), .001, 10);
    case 'pitch': return clamp(base + amount * 12, -48, 48);
    case 'detune': return clamp(base + amount * 100, -200, 200);
    case 'duration': return clamp(base * 2 ** (amount * 2), .125, 4);
    case 'register': return clamp(base + Math.round(amount * 2) * 12, -24, 24);
    case 'position': case 'warp': case 'spread': case 'subLevel': return clamp(base + amount, 0, 1);
    case 'pulseWidth': return clamp(base + amount * .45, .05, .95);
  }
}
export class SemanticController {
  config = defaultSemanticConfig();
  private beat = 0;
  private lastTime: number | null = null;
  private wasPlaying = false;
  setConfig(config: SemanticConfig) {
    if (config.analysis?.id !== this.config.analysis?.id) this.beat = 0;
    this.config = structuredClone(config);
  }
  scrub(position: number) { this.beat = clamp(position, 0, Math.max(0, (this.config.analysis?.segments.length ?? 1) - .000001)) * this.config.timeline.beatsPerSegment; }
  sample(time: number, playing: boolean, tempo: number) {
    if (playing && this.wasPlaying && this.lastTime !== null) this.beat += Math.max(0, time - this.lastTime) * tempo / 60;
    this.lastTime = time; this.wasPlaying = playing;
    const { analysis, timeline, overrides } = this.config;
    const n = analysis?.segments.length ?? 0;
    const absolute = this.beat / clamp(timeline.beatsPerSegment, .25, 64);
    const position = n ? timeline.loop ? absolute % n : Math.min(absolute, n - 1) : 0;
    const index = Math.floor(position), fraction = position - index;
    const a = analysis?.segments[index]?.values ?? neutralValues();
    const b = analysis?.segments[timeline.loop ? (index + 1) % Math.max(1, n) : Math.min(index + 1, n - 1)]?.values ?? a;
    const blend = timeline.interpolation === 'smooth' ? fraction * fraction * (3 - 2 * fraction) : 0;
    const values = Object.fromEntries(DIMENSIONS.map(k => [k, clamp(overrides[k] ?? (a[k] + (b[k] - a[k]) * blend), 0, 1)])) as SemanticValues;
    return { position, index, values, segment: analysis?.segments[index] ?? null, count: n };
  }
}
export const MOCK_ANALYSIS: SemanticAnalysis = {
  schemaVersion: 1, id: 'development-three-segment-fixture', language: 'en',
  sourceText: 'The rain began softly. The storm grew stronger. The clouds finally parted.',
  model: 'development-fixture', analyzedAt: '2026-10-22T00:00:00.000Z', kind: 'fixture', configuration: { purpose: 'modulation verification only' },
  segments: [
    { id: 'segment-1', text: 'The rain began softly.', values: { intimacy: .3, energy: .2, tension: .1, ambiguity: .2, movement: .3 } },
    { id: 'segment-2', text: 'The storm grew stronger.', values: { intimacy: .4, energy: .8, tension: .9, ambiguity: .4, movement: .8 } },
    { id: 'segment-3', text: 'The clouds finally parted.', values: { intimacy: .7, energy: .3, tension: .2, ambiguity: .1, movement: .6 } },
  ],
};
export function semanticPreset(name: string): SemanticRoute[] {
  const entries: [Dimension, SemanticDestination, number][] = name === 'Semantic Timbre'
    ? [['tension', 'cutoff', .35], ['ambiguity', 'detune', .15], ['energy', 'amplitude', .25]]
    : name === 'Semantic Rhythm' ? [['movement', 'duration', .35], ['tension', 'resonance', .2]]
    : name === 'Semantic Expression' ? [['intimacy', 'attack', .3], ['energy', 'cutoff', .25], ['movement', 'register', .2]] : [];
  return entries.map(([source, destination, depth]) => ({ id: crypto.randomUUID(), source, destination, depth, inverted: false, enabled: true }));
}
