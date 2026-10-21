// Plan math for the take timeline. Bars move, edges trim, nothing stretches.
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { console: console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/timeline-edit.js'), 'utf8'), sandbox);
const E = sandbox.NCTimelineEdit;

function chord(pos, symbol, at, len, gain) {
  return {
    pos: pos,
    chord: symbol,
    clip_id: 'c' + pos,
    at_s: at,
    len_s: len,
    gain_db: gain,
    fade_in_ms: 12,
    fade_out_ms: 12
  };
}

// C 0–2 (cap 4), Am 2–4 (cap 2.5), F 4–7 (cap 5). Take is 7s.
const base = [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 2, -1.5), chord(2, 'F', 4, 3, 0)];
const caps = [4, 2.5, 5];

const problems = [];
function check(cond, msg) {
  if (!cond) problems.push(msg);
}
function endOf(e) {
  return +(e.at_s + e.len_s).toFixed(3);
}
function sameVoice(a, b) {
  return a.pos === b.pos && a.chord === b.chord && a.clip_id === b.clip_id && a.gain_db === b.gain_db
    && a.fade_in_ms === 12 && a.fade_out_ms === 12 && a.offset_s == null && a.in_s == null;
}

let r = E.move(base, 1, 3.2, caps);
check(r.entries[1].at_s === 3.2 && r.entries[1].len_s === 2, 'moving a bar keeps its length, got ' + r.entries[1].at_s + '/' + r.entries[1].len_s);
check(endOf(r.entries[1]) === 5.2, 'a moved bar takes its end with it');
check(r.entries[0].at_s === 0 && r.entries[2].at_s === 4 && r.total_s === 7, 'other chords and the take stay');
check(sameVoice(r.entries[1], base[1]), 'move keeps the clip, gain and fades, and adds no in-offset');
check(base[1].at_s === 2 && base[1].len_s === 2, 'the source plan is not mutated');

r = E.move(base, 1, 6, caps);
check(r.entries[1].at_s === 4 && r.entries[1].len_s === 2, 'a start cannot pass the next chord, got ' + r.entries[1].at_s);

r = E.move(base, 1, 0, caps);
check(r.entries[1].at_s === 0 && r.entries[1].len_s === 2, 'a chord may start with the previous one');
check(endOf(r.entries[1]) === 2 && r.entries[0].len_s === 2, 'equal starts may overlap');

r = E.move(base, 0, -2, caps);
check(r.entries[0].at_s === 0 && r.entries[0].len_s === 2, 'a bar clamps at 0');

r = E.move(base, 2, 1, caps);
check(r.entries[2].at_s === 2 && r.total_s === 5, 'a bar cannot start before the previous chord, got ' + r.entries[2].at_s + ' total ' + r.total_s);

r = E.move(base, 2, 5, caps);
check(r.entries[2].at_s === 5 && r.entries[2].len_s === 3 && r.total_s === 8, 'moving the last chord later extends the take, got ' + r.total_s);

r = E.move(base, 2, 4.1236, caps);
check(r.entries[2].at_s === 4.124, 'starts round to milliseconds, got ' + r.entries[2].at_s);

r = E.trimEnd(base, 0, 3.5, caps);
check(r.entries[0].at_s === 0 && r.entries[0].len_s === 3.5, 'the end edge changes the length');
check(r.entries[1].at_s === 2, 'a longer chord may ring over the next one');
check(r.entries[0].fade_out_ms === 12 && r.entries[0].fade_in_ms === 12, 'the short fades stay on an end trim');

r = E.trimEnd(base, 0, 9, caps);
check(r.entries[0].len_s === 4 && r.entries[0].at_s === 0, 'the end edge stops at the clip length, got ' + r.entries[0].len_s);

r = E.trimEnd(base, 0, 0.01, caps);
check(r.entries[0].len_s === E.MIN_LEN_S && r.entries[0].at_s === 0, 'the end edge keeps a short body for the fades');

r = E.trimEnd(base, 2, 10, caps);
check(r.entries[2].len_s === 5 && r.entries[2].at_s === 4 && r.total_s === 9, 'extending the last end grows the take up to the clip, got ' + r.entries[2].len_s + ' total ' + r.total_s);

r = E.trimEnd(base, 0, 10);
check(r.entries[0].len_s === 2, 'without a known clip length the bar does not grow');

const tiny = [chord(0, 'C', 0, 0.02, 0)];
r = E.trimEnd(tiny, 0, 0.001, [0.02]);
check(r.entries[0].len_s === 0.02, 'a clip shorter than the fade floor is not stretched');
r = E.trimEnd(tiny, 0, 1, [0.02]);
check(r.entries[0].len_s === 0.02, 'a short clip still cannot grow past itself');

r = E.trimStart(base, 0, 1, caps);
check(r.entries[0].at_s === 1 && r.entries[0].len_s === 1 && endOf(r.entries[0]) === 2, 'the start edge moves the start and keeps the end');
check(r.entries[0].offset_s == null && r.entries[0].in_s == null && r.entries[0].fade_in_ms === 12, 'the start edge does not skip into the clip');
check(sameVoice(r.entries[0], base[0]), 'start trim keeps gain, fades and clip id');

r = E.trimStart(base, 0, -1, caps);
check(r.entries[0].at_s === 0 && r.entries[0].len_s === 2, 'the start edge clamps at 0');

r = E.trimStart(base, 1, 0, caps);
check(r.entries[1].at_s === 1.5 && r.entries[1].len_s === 2.5 && endOf(r.entries[1]) === 4, 'the start edge cannot reveal more than the clip, got ' + r.entries[1].at_s + '/' + r.entries[1].len_s);

r = E.trimStart(base, 0, 3, caps);
check(r.entries[0].at_s === 1.95 && endOf(r.entries[0]) === 2, 'the start edge keeps a short body, got ' + r.entries[0].at_s);

const late = [chord(0, 'C', 0, 1, 0), chord(1, 'G', 178, 1, 0)];
r = E.move(late, 1, 179.8, [4, 4]);
check(r.entries[1].at_s === 179 && endOf(r.entries[1]) === 180 && r.total_s === 180, 'a moved chord stops at 180s, got ' + r.entries[1].at_s + ' total ' + r.total_s);
r = E.trimEnd(late, 1, 200, [4, 4]);
check(endOf(r.entries[1]) === 180 && r.entries[1].len_s === 2 && r.total_s === 180, 'an end trim stops at 180s, got ' + r.entries[1].len_s);

r = E.move([], 0, 1, []);
check(r.entries.length === 0 && r.total_s === 0, 'an empty plan stays empty');

// Written clock: [2, 2, 3] matches the base plan. The take stays 7s.
const written = [2, 2, 3];
// The checks Save runs for a written clock (ncperf/assembly.py validate).
function saveAccepts(plan, durations) {
  var tol = 0.02, sum = 0, last = -1, i, at, len, slot;
  if (!(plan.total_s > 0) || plan.total_s > 180) return 'total';
  for (i = 0; i < durations.length; i++) sum += durations[i];
  if (Math.abs(plan.total_s - sum) > tol) return 'total is not the written sum';
  for (i = 0; i < plan.entries.length; i++) {
    at = plan.entries[i].at_s;
    len = plan.entries[i].len_s;
    slot = +durations.slice(0, i).reduce(function (a, b) { return a + b; }, 0);
    if (at < -0.001 || at + 1e-9 < last) return 'order';
    if (Math.abs(at - slot) > tol) return 'start moved';
    if (!(len > 0) || len > durations[i] + tol) return 'longer than written';
    if (at + len > plan.total_s + tol) return 'past the take';
    last = at;
  }
  return '';
}

r = E.move(base, 1, 3.2, caps, written);
check(r.writtenBlock === true && r.entries[1].at_s === 2 && r.entries[1].len_s === 2, 'a written bar does not move, got ' + r.entries[1].at_s);
check(r.total_s === 7, 'a blocked move keeps the written take, got ' + r.total_s);
check(base[1].at_s === 2, 'a blocked move does not mutate the plan');

r = E.move(base, 2, 9, caps, written);
check(r.writtenBlock === true && r.entries[2].at_s === 4 && r.total_s === 7, 'a written bar cannot extend the take');

r = E.trimStart(base, 0, 1, caps, written);
check(r.writtenBlock === true && r.entries[0].at_s === 0 && r.entries[0].len_s === 2, 'a written start edge stays put');
check(r.entries[0].offset_s == null, 'a written start still has no in-offset');

r = E.trimEnd(base, 1, 3, caps, written);
check(r.writtenBlock !== true && r.entries[1].at_s === 2 && r.entries[1].len_s === 1, 'a written end may shorten, got ' + r.entries[1].len_s);
check(r.total_s === 7 && r.entries[2].at_s === 4, 'shortening keeps the written take and the other chords');
check(saveAccepts(r, written) === '', 'a shortened written chord would fail Save: ' + saveAccepts(r, written));

r = E.trimEnd(base, 2, 6, caps, written);
check(r.writtenBlock !== true && r.entries[2].len_s === 2 && r.entries[2].at_s === 4 && r.total_s === 7, 'shortening the last chord keeps the written take, got ' + r.entries[2].len_s + ' total ' + r.total_s);
check(saveAccepts(r, written) === '', 'a shortened last chord would fail Save: ' + saveAccepts(r, written));

const shortened = E.trimEnd(base, 0, 1.2, caps, written);
r = E.trimEnd(shortened.entries, 0, 1.6, caps, written);
check(r.writtenBlock !== true && r.entries[0].len_s === 1.6 && r.entries[0].at_s === 0, 'a shortened chord can be restored up to its written length, got ' + r.entries[0].len_s);

r = E.trimEnd(base, 0, 3.5, caps, written);
check(r.writtenBlock === true && r.entries[0].len_s === 2 && r.entries[0].at_s === 0 && r.total_s === 7, 'a written end cannot pass its duration, got ' + r.entries[0].len_s);

r = E.trimEnd(base, 2, 12, caps, written);
check(r.writtenBlock === true && r.entries[2].len_s === 3 && r.total_s === 7, 'lengthening the last chord cannot extend the take, got ' + r.total_s);

r = E.trimEnd(base, 1, 5, caps, [2, 4, 3]);
check(r.entries[1].len_s === 2.5 && r.entries[1].at_s === 2, 'the clip still caps a written chord, got ' + r.entries[1].len_s);
check(r.writtenBlock !== true && r.total_s === 9, 'stopping at the clip, still inside the written length, is not the clock note');

r = E.move(base, 1, 3, caps, [2]);
check(r.writtenBlock !== true && r.entries[1].at_s === 3 && r.entries[1].len_s === 2, 'a clock that does not match the chords leaves the bar free');

r = E.move(base, 2, 5, caps);
check(r.writtenBlock !== true && r.entries[2].at_s === 5 && r.total_s === 8, 'an organic take can still move and grow');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('timeline edit ok');
