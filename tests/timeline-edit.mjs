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

// One record per chord instance (Petrus, 2026-10-21: a lower bar merged with
// the one above). Ids are positions, so G13 twice is two chords.
const five = [chord(0, 'Dm9', 0, 6, 0), chord(1, 'G13', 7, 5, 0), chord(2, 'Cadd9', 16, 8, 0), chord(3, 'G13', 28, 7.5, 0), chord(4, 'Am9', 44, 8, 0)];
five[3].clip_id = five[1].clip_id; // even a shared clip id must not tie them together
const fiveCaps = [6.2, 5.1, 8, 7.5, 8];
const ids = E.chords(five).map((c) => c.id);
check(ids.join() === 'chord-0,chord-1,chord-2,chord-3,chord-4', 'one id per chord instance, got ' + ids);
check(E.indexOf(five, 'chord-3') === 3 && E.indexOf(five, 'G13') === -1 && E.indexOf(five, 'chord-9') === -1, 'ids resolve by position only, never by symbol');
function others(next, prev, index, msg) {
  for (let i = 0; i < prev.length; i++) if (i !== index) check(next[i] === prev[i], msg + ': chord ' + (i + 1) + ' changed');
}
for (const mode of ['move', 'start', 'end']) {
  for (const t of [-100, 0, 7, 16, 20, 27.9, 30, 200]) {
    r = E.edit(five, 'chord-3', mode, t, { caps: fiveCaps, base: 52 });
    others(r.entries, five, 3, mode + ' of the lower G13 to ' + t);
    check(r.index === 3 && r.id === 'chord-3', 'the edit names the chord it changed');
    check(r.entries[3].at_s >= five[2].at_s && r.entries[3].at_s <= five[4].at_s, 'the lower bar stays between its neighbors (harmonic order)');
    check(r.entries[3].len_s <= fiveCaps[3], 'the lower bar never passes its clip length');
    check(r.entries[3].offset_s == null && r.entries[3].in_s == null, 'no in-offset');
  }
}
check(five[3].at_s === 28 && five[2].at_s === 16 && five[1].at_s === 7, 'edits never mutate the plan');
r = E.edit(five, 'chord-3', 'move', 0, { caps: fiveCaps, base: 52 });
check(r.entries[3].at_s === 16 && r.entries[2] === five[2], 'dragging the lower bar up to the upper start stops there and leaves the upper bar as it was');
r = E.edit(five, 'chord-3', 'end', 30, { caps: fiveCaps, base: 52 });
check(r.entries[3].len_s === 2 && r.entries[1] === five[1], 'trimming the second G13 leaves the first G13');
r = E.edit(five, 'chord-1', 'end', 9, { caps: fiveCaps, base: 52 });
check(r.entries[1].len_s === 2 && r.entries[3] === five[3], 'trimming the first G13 leaves the second G13');
let chain = five;
for (const [id, mode, t] of [['chord-1', 'move', 8], ['chord-3', 'end', 31], ['chord-1', 'end', 100], ['chord-3', 'start', 29]]) chain = E.edit(chain, id, mode, t, { caps: fiveCaps, base: 52 }).entries;
check(chain[1].at_s === 8 && chain[1].len_s === 5.1, 'first G13 after its own edits, got ' + chain[1].at_s + '/' + chain[1].len_s);
check(chain[3].at_s === 29 && chain[3].len_s === 2, 'second G13 after its own edits, got ' + chain[3].at_s + '/' + chain[3].len_s);
check(chain[0] === five[0] && chain[2] === five[2] && chain[4] === five[4], 'the untouched chords are the same objects');
r = E.edit(five, 'chord-1', 'end', 100, { caps: fiveCaps, base: 52 });
check(r.entries[1].len_s === 5.1, 'the end clamps at the clip length, got ' + r.entries[1].len_s);
r = E.edit(five, 'chord-1', 'start', 0, { caps: fiveCaps, base: 52 });
check(r.entries[1].at_s === 6.9 && r.entries[1].len_s === 5.1, 'the start clamps where the clip runs out, got ' + r.entries[1].at_s);
r = E.edit(five, 'chord-0', 'end', 1, { caps: fiveCaps, base: 52 });
check(r.total_s === 52, 'an edit early in the take keeps the gathered length, got ' + r.total_s);
r = E.edit(five, 'chord-4', 'move', 50, { caps: fiveCaps, base: 52 });
check(r.total_s === 58, 'a chord moved past the end still grows the take, got ' + r.total_s);
r = E.edit(five, 'chord-7', 'move', 1, { caps: fiveCaps });
check(r.index === -1 && r.entries.every((e, i) => e === five[i]), 'an unknown id changes nothing');
// Written lock through the same entry point.
const fiveWritten = [7, 9, 12, 16, 8];
const fiveClock = [chord(0, 'Dm9', 0, 6, 0), chord(1, 'G13', 7, 5, 0), chord(2, 'Cadd9', 16, 8, 0), chord(3, 'G13', 28, 7.5, 0), chord(4, 'Am9', 44, 8, 0)];
r = E.edit(fiveClock, 'chord-3', 'move', 20, { caps: fiveCaps, written: fiveWritten, base: 52 });
check(r.writtenBlock === true && r.entries[3].at_s === 28 && r.total_s === 52, 'a written lower bar does not move');
r = E.edit(fiveClock, 'chord-3', 'start', 30, { caps: fiveCaps, written: fiveWritten, base: 52 });
check(r.writtenBlock === true && r.entries[3].at_s === 28, 'a written start edge stays');
r = E.edit(fiveClock, 'chord-3', 'end', 31, { caps: fiveCaps, written: fiveWritten, base: 52 });
check(r.writtenBlock !== true && r.entries[3].len_s === 3 && r.total_s === 52, 'a written end may shorten');
others(r.entries, fiveClock, 3, 'shortening a written chord');
check(saveAccepts(r, fiveWritten) === '', 'a shortened written chord would fail Save: ' + saveAccepts(r, fiveWritten));
r = E.edit(fiveClock, 'chord-3', 'end', 60, { caps: fiveCaps, written: fiveWritten, base: 52 });
check(r.writtenBlock === true && r.entries[3].len_s === 7.5, 'a written end cannot pass the clip or the written length');
r = E.edit(fiveClock, 'chord-1', 'end', 14, { caps: fiveCaps, written: fiveWritten, base: 52 });
check(r.writtenBlock !== true && r.entries[1].len_s === 5.1, 'the clip stops it before the written length: no note');

// The whole recording (Petrus, 2026-10-21: the top three would not get
// longer). A chord already at its clip's natural length says so.
const stacks = [chord(0, 'Dm9', 0, 4, 0), chord(1, 'G13', 9, 4, 0), chord(2, 'Cadd9', 20, 4, 0), chord(3, 'G13', 28, 3, 0)];
const stackCaps = [4, 4, 4, 7.5];
r = E.edit(stacks, 'chord-1', 'end', 15, { caps: stackCaps, base: 40 });
check(r.clipBlock === true && r.clip_s === 4 && r.entries[1].len_s === 4, 'pulling a full-length chord longer is the clip note, got ' + JSON.stringify([r.clipBlock, r.entries[1].len_s]));
r = E.edit(stacks, 'chord-1', 'end', 11, { caps: stackCaps, base: 40 });
check(r.clipBlock !== true && r.entries[1].len_s === 2, 'a full-length chord still shortens');
r = E.edit(stacks, 'chord-1', 'start', 6, { caps: stackCaps, base: 40 });
check(r.clipBlock === true && r.entries[1].at_s === 9, 'the start edge of a full-length chord cannot reveal more, and says so');
r = E.edit(stacks, 'chord-1', 'start', 10, { caps: stackCaps, base: 40 });
check(r.clipBlock !== true && r.entries[1].at_s === 10 && r.entries[1].len_s === 3, 'the start edge still shortens a full-length chord');
r = E.edit(stacks, 'chord-1', 'move', 12, { caps: stackCaps, base: 40 });
check(r.clipBlock !== true && r.entries[1].at_s === 12, 'a full-length chord still moves');
r = E.edit(stacks, 'chord-3', 'end', 40, { caps: stackCaps, base: 40 });
check(r.clipBlock === true && r.entries[3].len_s === 7.5, 'a chord with room grows to its clip, then says so');
r = E.edit(stacks, 'chord-3', 'end', 33, { caps: stackCaps, base: 40 });
check(r.clipBlock !== true && r.entries[3].len_s === 5, 'growing inside the clip is quiet');
r = E.edit([chord(0, 'Dm9', 0, 2, 0)].concat(stacks.slice(1)), 'chord-0', 'start', -3, { caps: stackCaps, base: 40 });
check(r.clipBlock !== true && r.entries[0].at_s === 0, 'time 0, not the clip, stops the first start: no clip note');
r = E.edit(stacks, 'chord-1', 'end', 60, { caps: stackCaps, written: [9, 11, 8, 12], base: 40 });
check(r.writtenBlock === true && r.clipBlock !== true, 'past a written length, the written note wins');

// Re-gather one chord (Peter, 2026-10-21): other bars keep their edits.
{
  const ends = (es) => es.map((e) => [e.at_s, e.len_s]);
  // Edited take: C shortened to 1.5 (gap before Am), Am 2–4, F 4–7.
  const edited = [chord(0, 'C', 0, 1.5, -3), chord(1, 'Am', 2, 2, -1.5), chord(2, 'F', 4, 3, 0)];
  // Rebuilt with a new Am of 3.25 s: back to back from scratch.
  const fresh = { entries: [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 3.25, -6), chord(2, 'F', 5.25, 3, 0)], total_s: 8.25 };
  let g = E.regather(edited, fresh, 1, false);
  check(JSON.stringify(ends(g.entries)) === JSON.stringify([[0, 1.5], [2, 3.25], [5.25, 3]]) && g.total_s === 8.25, 'a longer new Am: C keeps its edit, F moves with it, got ' + JSON.stringify(ends(g.entries)));
  check(g.entries[0] === edited[0] && g.entries[1].gain_db === -6 && g.entries[2].gain_db === 0, 'the other bars keep their own voice');
  const short = { entries: [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 1, -6), chord(2, 'F', 3, 3, 0)], total_s: 6 };
  g = E.regather(edited, short, 1, false);
  check(JSON.stringify(ends(g.entries)) === JSON.stringify([[0, 1.5], [2, 1], [3, 3]]) && g.total_s === 6, 'a shorter new Am closes up behind it, got ' + JSON.stringify(ends(g.entries)));
  // An overlap the edits made stays an overlap.
  const overlap = [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 2, -1.5), chord(2, 'F', 3.5, 3, 0)];
  g = E.regather(overlap, fresh, 1, false);
  check(g.entries[2].at_s === 4.75, 'an edited overlap keeps its spacing, got ' + g.entries[2].at_s);
  // A clock's starts stay put; the bar is its fresh length.
  const clocked = { entries: [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 1.5, -6), chord(2, 'F', 4, 3, 0)], total_s: 7 };
  g = E.regather([chord(0, 'C', 0, 1, -3), chord(1, 'Am', 2.5, 1.5, -1.5), chord(2, 'F', 4, 2, 0)], clocked, 1, true);
  check(JSON.stringify(ends(g.entries)) === JSON.stringify([[0, 1], [2, 1.5], [4, 2]]) && g.total_s === 7, 'fixed starts: only the bar resets, got ' + JSON.stringify(ends(g.entries)));
  // The last bar, and a mismatch.
  g = E.regather(edited, { entries: [chord(0, 'C', 0, 2, -3), chord(1, 'Am', 2, 2, -1.5), chord(2, 'F', 4, 1, -2)], total_s: 5 }, 2, false);
  check(g.entries[2].len_s === 1 && g.total_s === 5 && g.entries[0].len_s === 1.5, 'the last bar resets alone');
  check(E.regather(edited, { entries: fresh.entries.slice(0, 2) }, 1, false) === null, 'a different chord count is not merged');
  // Past 180 s it refuses, and the page rebuilds.
  const long = [chord(0, 'C', 0, 100, 0), chord(1, 'Am', 100, 75, 0), chord(2, 'F', 175, 4, 0)];
  check(E.regather(long, { entries: [chord(0, 'C', 0, 100, 0), chord(1, 'Am', 100, 79, 0), chord(2, 'F', 179, 4, 0)], total_s: 183 }, 1, false) === null, 'no room past 180 s: null');
}

// Playhead math.
check(E.timeAt(100, 100, 500, 60) === 0 && E.timeAt(600, 100, 500, 60) === 60 && E.timeAt(350, 100, 500, 60) === 30, 'timeAt maps the track to the take');
check(E.timeAt(20, 100, 500, 60) === 0 && E.timeAt(900, 100, 500, 60) === 60, 'timeAt clamps to the take');
check(E.timeAt(300, 100, 0, 60) === 0 && E.timeAt(300, 100, 500, 0) === 0, 'timeAt with no track or no take is 0');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('timeline edit ok');
