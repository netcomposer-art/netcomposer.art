// Timeline edits for an assembly plan. No time-stretch and no pitch-shift.
//
// Dragging a bar changes at_s and keeps len_s.
// Dragging the end edge changes len_s. It cannot pass the clip's natural
// length. The 12 ms fade-out already on the entry stays, so the trim does
// not click.
// Dragging the start edge moves at_s and keeps the end. Playback still
// begins at the clip's gathered in-point: there is no in-offset. The server
// always slices from that in-point, so an offset would play different audio
// on Save than it does here.
//
// A written clock (one duration per chord) keeps the Composition's rules.
// Starts stay put, the take stays the sum of those durations, and an end
// can only get shorter than its written duration. writtenBlock marks a
// gesture the clock refused.
(function (root) {
  'use strict';
  var MIN_LEN_S = 0.05;
  var MAX_TOTAL_S = 180;

  function secs(n) {
    return +(+n).toFixed(3);
  }
  function capFor(entries, caps, index) {
    var cap = caps && +caps[index];
    var len = +entries[index].len_s;
    if (!(cap > 0)) cap = len;
    cap = secs(cap);
    if (len > cap) cap = secs(len);
    return cap;
  }
  function minLen(cap) {
    if (!(cap > 0)) return MIN_LEN_S;
    return Math.min(MIN_LEN_S, cap);
  }
  function retotal(entries) {
    var m = 0, i, end;
    for (i = 0; i < entries.length; i++) {
      end = secs(+entries[i].at_s + +entries[i].len_s);
      if (end > m) m = end;
    }
    return m > 0 ? m : 0.001;
  }
  function copyTiming(entry, at, len) {
    var o = {}, k;
    for (k in entry) if (Object.prototype.hasOwnProperty.call(entry, k)) o[k] = entry[k];
    o.at_s = secs(at);
    o.len_s = secs(len);
    return o;
  }
  function replaced(entries, index, at, len) {
    var next = entries.slice();
    next[index] = copyTiming(entries[index], at, len);
    return { entries: next, total_s: retotal(next) };
  }
  function unchanged(entries) {
    return { entries: entries.slice(), total_s: retotal(entries) };
  }
  // A written clock is one positive duration per chord. Anything else leaves
  // the organic editor alone.
  function writtenOf(written, count) {
    if (!Array.isArray(written) || written.length !== count || !count) return null;
    var out = [], i, n;
    for (i = 0; i < count; i++) {
      n = +written[i];
      if (!(n > 0)) return null;
      out.push(n);
    }
    return out;
  }
  function writtenSum(durs) {
    var s = 0, i;
    for (i = 0; i < durs.length; i++) s += durs[i];
    s = secs(s);
    return s > 0 ? s : 0.001;
  }
  function locked(entries, durs) {
    return { entries: entries.slice(), total_s: writtenSum(durs), writtenBlock: true };
  }
  function neighbors(entries, index) {
    return {
      prev: index > 0 ? +entries[index - 1].at_s : 0,
      next: index + 1 < entries.length ? +entries[index + 1].at_s : Infinity
    };
  }

  // Move the whole bar. The recording's length stays. The start cannot pass
  // the previous or the next chord, so the harmony stays in order while the
  // tails may still overlap.
  function move(entries, index, at, caps, written) {
    if (!entries || !entries[index]) return { entries: entries || [], total_s: 0 };
    var clock = writtenOf(written, entries.length);
    if (clock) return locked(entries, clock);
    var len = +entries[index].len_s;
    var n = neighbors(entries, index);
    var minAt = Math.max(0, n.prev);
    var maxAt = Math.min(n.next, secs(MAX_TOTAL_S - len));
    if (!(maxAt >= minAt)) return unchanged(entries);
    at = Math.max(minAt, Math.min(maxAt, +at));
    return replaced(entries, index, at, len);
  }

  // Start edge. The end stays put. The clip still plays from its beginning,
  // so a later start is a shorter play and an earlier start can reveal more
  // of the recording, up to its natural length.
  function trimStart(entries, index, at, caps, written) {
    if (!entries || !entries[index]) return { entries: entries || [], total_s: 0 };
    var clock = writtenOf(written, entries.length);
    if (clock) return locked(entries, clock);
    var entry = entries[index];
    var end = secs(+entry.at_s + +entry.len_s);
    var cap = capFor(entries, caps, index);
    var floor = minLen(cap);
    var n = neighbors(entries, index);
    var minAt = Math.max(0, n.prev, secs(end - cap));
    var maxAt = Math.min(n.next, secs(end - floor));
    if (!(maxAt >= minAt)) return unchanged(entries);
    at = Math.max(minAt, Math.min(maxAt, +at));
    return replaced(entries, index, at, end - at);
  }

  // End edge. The start stays put. The length cannot pass the natural length
  // or 180 s, and it keeps enough of the clip for the short fades.
  function trimEnd(entries, index, end, caps, written) {
    if (!entries || !entries[index]) return { entries: entries || [], total_s: 0 };
    var at = +entries[index].at_s;
    var cap = capFor(entries, caps, index);
    var floor = minLen(cap);
    var minEnd = secs(at + floor);
    var maxEnd = Math.min(MAX_TOTAL_S, secs(at + cap));
    var clock = writtenOf(written, entries.length);
    var refused = false;
    if (clock) {
      var writtenEnd = secs(at + clock[index]);
      if (+end > writtenEnd + 1e-9) refused = true;
      if (writtenEnd < maxEnd) maxEnd = writtenEnd;
    }
    if (!(maxEnd >= minEnd)) {
      var held = unchanged(entries);
      if (clock) held.total_s = writtenSum(clock);
      if (refused) held.writtenBlock = true;
      return held;
    }
    end = Math.max(minEnd, Math.min(maxEnd, +end));
    var result = replaced(entries, index, at, end - at);
    if (clock) result.total_s = writtenSum(clock);
    if (refused) result.writtenBlock = true;
    return result;
  }

  root.NCTimelineEdit = {
    move: move,
    trimStart: trimStart,
    trimEnd: trimEnd,
    MIN_LEN_S: MIN_LEN_S,
    MAX_TOTAL_S: MAX_TOTAL_S
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
