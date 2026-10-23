import { getBank, TABLES } from './wavetable-dsp';

// Expensive trigonometry/FFTs belong off the real-time audio thread.
const entries = TABLES.map(table => [table.id, getBank(table.id)] as const);
const buffers = entries.flatMap(([, bank]) => bank.flat(2).map(cycle => cycle.buffer));
self.postMessage(entries, { transfer: buffers });
