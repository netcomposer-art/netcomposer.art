// Stand-in tones for the sampler page. These are not the Iowa recordings.
// The manifest shape is nc-sampler/1 so the page can load them from
// /create/sampler-fixtures/ when ?notes= points here.
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'create/sampler-fixtures');
const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SR = 48000;
const DUR = 4;

function noteName(midi) {
  return NAMES[midi % 12] + (Math.floor(midi / 12) - 1);
}
function tone(midi) {
  const freq = 440 * 2 ** ((midi - 69) / 12);
  const n = Math.round(DUR * SR);
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-1.6 * t);
    const s = (Math.sin(2 * Math.PI * freq * t) * 0.55 + Math.sin(4 * Math.PI * freq * t) * 0.12) * env;
    out[i * 2] = s;
    out[i * 2 + 1] = s * 0.97;
  }
  return out;
}
function wavBytes(samples) {
  const dataLen = samples.length * 2;
  const buf = Buffer.alloc(44 + dataLen);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataLen, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataLen, 40);
  for (let i = 0; i < samples.length; i++) {
    let x = samples[i];
    if (x > 1) x = 1;
    else if (x < -1) x = -1;
    buf.writeInt16LE(x < 0 ? Math.round(x * 0x8000) : Math.round(x * 0x7FFF), 44 + i * 2);
  }
  return buf;
}
function ffmpeg(wav, opus) {
  return new Promise((ok, no) => {
    const p = spawn('ffmpeg', ['-y', '-v', 'error', '-i', wav, '-c:a', 'libopus', '-b:a', '24k', '-ar', '48000', '-ac', '2', opus], { stdio: 'inherit' });
    p.on('exit', (code) => code === 0 ? ok() : no(new Error('ffmpeg ' + code)));
  });
}
function lufsFor(midi, slug) {
  if (slug === 'guitar' && midi === 52) return null;
  if (slug === 'guitar' && midi === 64) return -12;
  if (slug === 'guitar' && midi === 57) return -28;
  if (slug === 'cello-pizzicato' && midi === 43) return -28;
  if (slug === 'cello-pizzicato' && midi === 65) return -12;
  if (slug === 'piano' && midi === 60) return -12;
  return -18;
}
function manifest(spec, midis) {
  const notes = {};
  const gaps = [];
  for (let m = spec.lo; m <= spec.hi; m++) {
    if (!midis.includes(m)) {
      gaps.push({ midi: m, name: noteName(m), status: 'absent', reason: 'not in this fixture' });
      continue;
    }
    notes[String(m)] = {
      midi: m, name: noteName(m),
      file: 'notes/' + spec.slug + '/' + m + '.opus',
      master: 'notes/' + spec.slug + '/' + m + '.flac',
      cents: 0, dur_s: DUR, lufs: lufsFor(m, spec.slug), peak_db: -6, sr: SR, channels: 2,
      source: { url: 'https://netcomposer.art/create/', t0: 0, t1: DUR, license: 'CC0' }
    };
  }
  return {
    format: 'nc-sampler/1', kind: 'notes', id: 'fixture-' + spec.slug,
    instrument: spec.instrument, slug: spec.slug, sustain: spec.sustain,
    velocity: ['mf'], range: { lo: spec.lo, hi: spec.hi },
    credit: 'NC fixture', license_in: 'CC0', license_out: 'CC-BY-SA-4.0',
    page: 'https://netcomposer.art/create/', author: 'NC fixture',
    playback: {
      pitch_shift: false, time_stretch: false, octave_substitution: false, missing: 'omit',
      ring_cap_s: 8.0, slice_fade_s: 0.08, chord_change_fade_s: 0.12
    },
    notes, gaps
  };
}

const specs = [
  { slug: 'guitar', instrument: 'guitar', sustain: 'plucked', lo: 52, hi: 76, skip: [] },
  { slug: 'cello-pizzicato', instrument: 'cello pizzicato', sustain: 'plucked', lo: 43, hi: 67, skip: [56, 60] },
  { slug: 'piano', instrument: 'piano', sustain: 'rings', lo: 48, hi: 72, skip: [] }
];

const jobs = [];
for (const spec of specs) {
  const dir = join(out, spec.slug);
  await mkdir(dir, { recursive: true });
  const midis = [];
  for (let m = spec.lo; m <= spec.hi; m++) if (!spec.skip.includes(m)) midis.push(m);
  await writeFile(join(dir, 'manifest.json'), JSON.stringify(manifest(spec, midis), null, 1) + '\n');
  for (const midi of midis) jobs.push({ spec, midi, dir });
}

const tmp = join(tmpdir(), 'nc-sampler-tones');
await mkdir(tmp, { recursive: true });
let cursor = 0;
async function worker() {
  for (;;) {
    const job = jobs[cursor++];
    if (!job) return;
    const wav = join(tmp, job.spec.slug + '-' + job.midi + '.wav');
    const opus = join(job.dir, job.midi + '.opus');
    await writeFile(wav, wavBytes(tone(job.midi)));
    await ffmpeg(wav, opus);
    await rm(wav, { force: true });
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log('wrote ' + jobs.length + ' notes under ' + out);
