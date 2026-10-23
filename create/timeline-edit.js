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
//
// Every chord instance has its own id (chord-<position>). Positions never
// change, because Save needs the chords in harmonic order, so the id stays
// put for the whole take. Two chords with the same symbol (G13 twice) are
// two ids. An edit only ever replaces the one entry it names.
(function (root) {
  'use strict';
  var MIN_LEN_S = 0.05;
  var MAX_TOTAL_S = 180;
  // A pull this far past the recording's end counts as asking for more.
  var CLIP_EPS_S = 0.005;

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
  function retotal(entries, base) {
    var m = base > 0 ? secs(Math.min(MAX_TOTAL_S, base)) : 0, i, end;
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
  function replaced(entries, index, at, len, base) {
    var next = entries.slice();
    next[index] = copyTiming(entries[index], at, len);
    return { entries: next, total_s: retotal(next, base) };
  }
  function unchanged(entries, base) {
    return { entries: entries.slice(), total_s: retotal(entries, base) };
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
  function writtenSum(durs, entries) {
    var s = 0, i;
    for (i = 0; i < durs.length; i++) {
      if (entries && entries[i] && entries[i].parallel) continue;
      s += durs[i];
    }
    s = secs(s);
    return s > 0 ? s : 0.001;
  }
  function locked(entries, durs) {
    return { entries: entries.slice(), total_s: writtenSum(durs, entries), writtenBlock: true };
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
  function move(entries, index, at, caps, written, base) {
    if (!entries || !entries[index]) return { entries: entries || [], total_s: 0 };
    var clock = writtenOf(written, entries.length);
    if (clock) return locked(entries, clock);
    var len = +entries[index].len_s;
    var n = neighbors(entries, index);
    var minAt = Math.max(0, n.prev);
    var maxAt = Math.min(n.next, secs(MAX_TOTAL_S - len));
    if (!(maxAt >= minAt)) return unchanged(entries, base);
    at = Math.max(minAt, Math.min(maxAt, +at));
    return replaced(entries, index, at, len, base);
  }

  // Start edge. The end stays put. The clip still plays from its beginning,
  // so a later start is a shorter play and an earlier start can reveal more
  // of the recording, up to its natural length.
  function trimStart(entries, index, at, caps, written, base) {
    if (!entries || !entries[index]) return { entries: entries || [], total_s: 0 };
    var clock = writtenOf(written, entries.length);
    if (clock) return locked(entries, clock);
    var entry = entries[index];
    var end = secs(+entry.at_s + +entry.len_s);
    var cap = capFor(entries, caps, index);
    var floor = minLen(cap);
    var n = neighbors(entries, index);
    var clipAt = secs(end - cap);
    var minAt = Math.max(0, n.prev, clipAt);
    var maxAt = Math.min(n.next, secs(end - floor));
    // The recording, not the neighbors or 0, is what stopped this start.
    var whole = +at < clipAt - CLIP_EPS_S && clipAt >= Math.max(0, n.prev);
    var r = !(maxAt >= minAt) ? unchanged(entries, base) : replaced(entries, index, Math.max(minAt, Math.min(maxAt, +at)), end - Math.max(minAt, Math.min(maxAt, +at)), base);
    if (whole) { r.clipBlock = true; r.clip_s = cap; }
    return r;
  }

  // End edge. The start stays put. The length cannot pass the natural length
  // or 180 s, and it keeps enough of the clip for the short fades.
  function trimEnd(entries, index, end, caps, written, base) {
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
    // Past the whole recording (and not past a written length, whose note
    // wins): nothing is stretched, so the page says why the edge stopped.
    var whole = !refused && +end > secs(at + cap) + CLIP_EPS_S && secs(at + cap) <= MAX_TOTAL_S;
    var result;
    if (!(maxEnd >= minEnd)) result = unchanged(entries, base);
    else {
      end = Math.max(minEnd, Math.min(maxEnd, +end));
      result = replaced(entries, index, at, end - at, base);
    }
    if (clock) result.total_s = writtenSum(clock, entries);
    if (refused) result.writtenBlock = true;
    if (whole) { result.clipBlock = true; result.clip_s = cap; }
    return result;
  }

  // One record per chord instance. The id is the only key the strip uses.
  function idOf(index) {
    return 'chord-' + index;
  }
  function indexOf(entries, id) {
    var m = /^chord-(\d+)$/.exec(String(id == null ? '' : id));
    if (!m || !entries) return -1;
    var i = +m[1];
    return i < entries.length && entries[i] ? i : -1;
  }
  function chords(entries) {
    return (entries || []).map(function (e, i) {
      return { id: idOf(i), index: i, symbol: (e && e.chord) || '', clip_id: (e && e.clip_id) || '' };
    });
  }
  // One gesture step on one chord. opts: caps, written, base (the take length
  // as gathered; an organic take never gets shorter than that from an edit
  // elsewhere). Every other entry comes back as the very same object.
  function edit(entries, id, mode, time, opts) {
    opts = opts || {};
    var index = indexOf(entries, id);
    if (index < 0) return { entries: (entries || []).slice(), total_s: retotal(entries || [], opts.base), index: -1 };
    var fn = mode === 'start' ? trimStart : (mode === 'end' ? trimEnd : move);
    var r = fn(entries, index, time, opts.caps, opts.written, opts.base);
    r.index = index;
    r.id = idOf(index);
    return r;
  }

  // One chord gathered again (Peter, 2026-10-21). Every other bar keeps its
  // edits. The re-gathered bar takes its fresh length (fresh is the same take
  // rebuilt with the new recording, same seed). Starts fixed by a written
  // clock or a stated gap (keepStarts) stay put. Otherwise the bar keeps its
  // start and every later bar moves by the change at its end, so a
  // back-to-back take stays back to back and gaps the edits made stay too.
  // Returns null when the result would not fit (the page rebuilds instead).
  function regather(entries, fresh, index, keepStarts) {
    if (!entries || !fresh || !fresh.entries || entries.length !== fresh.entries.length || !entries[index]) return null;
    var f = fresh.entries[index], old = entries[index], next = entries.slice(), i;
    var at = keepStarts ? +f.at_s : +old.at_s;
    var len = Math.min(+f.len_s, secs(MAX_TOTAL_S - at));
    if (!(len >= MIN_LEN_S)) return null;
    var bar = copyTiming(f, at, len);
    next[index] = bar;
    if (!keepStarts) {
      var delta = secs((at + len) - (+old.at_s + +old.len_s));
      for (i = index + 1; i < next.length && delta !== 0; i++) {
        var e = next[i], to = secs(Math.max(0, +e.at_s + delta));
        // A later bar is never cut to fit: past 180 s the page rebuilds instead.
        if (to + +e.len_s > MAX_TOTAL_S + 1e-9) return null;
        next[i] = copyTiming(e, to, +e.len_s);
      }
      for (i = 1; i < next.length; i++) if (+next[i].at_s < +next[i - 1].at_s) return null;
    }
    var total = retotal(next, 0);
    if (keepStarts && +fresh.total_s > total) total = secs(+fresh.total_s);
    return { entries: next, total_s: total };
  }

    // ---------- the playhead ----------
  // The time under a pointer, clamped to the take.
  function timeAt(x, left, width, dur) {
    if (!(width > 0) || !(dur > 0)) return 0;
    var f = (+x - left) / width;
    if (!(f > 0)) f = 0;
    if (f > 1) f = 1;
    return secs(f * dur);
  }
  // A ruler row above the first lane, with a dot that shows where the take
  // is and can be dragged to seek. The line under the dot runs down through
  // the lanes but never takes a pointer, so bars keep every gesture.
  // opts: lanes (the #src-lanes element), duration() in seconds, seek(t),
  // preview(t) while scrubbing (optional).
  function playhead(opts) {
    var lanes = opts.lanes, doc = lanes.ownerDocument;
    var old = lanes.parentNode && lanes.parentNode.querySelector('.src-ruler');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var oldLine = lanes.querySelector('.src-playline');
    if (oldLine) lanes.removeChild(oldLine);
    var ruler = doc.createElement('div'), knob = doc.createElement('div'), dot = doc.createElement('span'), line = doc.createElement('div');
    ruler.className = 'src-ruler';
    knob.className = 'src-knob';
    dot.className = 'src-dot';
    line.className = 'src-playline';
    line.setAttribute('aria-hidden', 'true');
    ruler.tabIndex = 0;
    ruler.setAttribute('role', 'slider');
    ruler.setAttribute('aria-label', 'Play position');
    ruler.setAttribute('aria-valuemin', '0');
    knob.appendChild(dot);
    ruler.appendChild(knob);
    lanes.parentNode.insertBefore(ruler, lanes);
    lanes.appendChild(line);
    var now = 0, scrub = null;
    function dur() { var d = +opts.duration(); return d > 0 ? d : 0; }
    function box() {
      var track = lanes.querySelector('.src-track');
      var r = (track || ruler).getBoundingClientRect();
      return { left: r.left, width: r.width };
    }
    function place(t) {
      var d = dur();
      now = Math.max(0, Math.min(d, +t || 0));
      var f = d > 0 ? now / d : 0;
      ruler.style.setProperty('--f', String(f));
      lanes.style.setProperty('--f', String(f));
      ruler.setAttribute('aria-valuemax', String(+d.toFixed(1)));
      ruler.setAttribute('aria-valuenow', String(+now.toFixed(1)));
      ruler.setAttribute('aria-valuetext', now.toFixed(1) + ' s of ' + d.toFixed(1) + ' s');
    }
    function fromEvent(ev) {
      var b = box();
      return timeAt(ev.clientX, b.left, b.width, dur());
    }
    function finish(ev) {
      if (!scrub || (ev && ev.pointerId != null && ev.pointerId !== scrub.id)) return;
      var t = now;
      try { if (ruler.hasPointerCapture && ruler.hasPointerCapture(scrub.id)) ruler.releasePointerCapture(scrub.id); } catch (e) {}
      scrub = null;
      ruler.classList.remove('scrubbing');
      opts.seek(t);
    }
    ruler.addEventListener('pointerdown', function (ev) {
      if (ev.button != null && ev.button !== 0) return;
      if (scrub || !(dur() > 0)) return;
      ev.preventDefault();
      ev.stopPropagation();
      scrub = { id: ev.pointerId };
      ruler.classList.add('scrubbing');
      if (ruler.focus) ruler.focus({ preventScroll: true });
      try { ruler.setPointerCapture(ev.pointerId); } catch (e) {}
      place(fromEvent(ev));
      if (opts.preview) opts.preview(now);
    });
    ruler.addEventListener('pointermove', function (ev) {
      if (!scrub || ev.pointerId !== scrub.id) return;
      ev.preventDefault();
      place(fromEvent(ev));
      if (opts.preview) opts.preview(now);
    });
    ruler.addEventListener('pointerup', finish);
    ruler.addEventListener('pointercancel', finish);
    ruler.addEventListener('lostpointercapture', finish);
    ruler.addEventListener('keydown', function (ev) {
      var step = ev.shiftKey ? 5 : 1, t = null;
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') t = now - step;
      else if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') t = now + step;
      else if (ev.key === 'Home') t = 0;
      else if (ev.key === 'End') t = dur();
      if (t == null) return;
      ev.preventDefault();
      place(t);
      opts.seek(now);
    });
    place(0);
    return {
      place: function (t) { if (!scrub) place(t); },
      scrubbing: function () { return !!scrub; },
      ruler: ruler,
      line: line
    };
  }

  root.NCTimelineEdit = {
    timeAt: timeAt,
    playhead: playhead,
    edit: edit,
    regather: regather,
    chords: chords,
    idOf: idOf,
    indexOf: indexOf,
    move: move,
    trimStart: trimStart,
    trimEnd: trimEnd,
    MIN_LEN_S: MIN_LEN_S,
    MAX_TOTAL_S: MAX_TOTAL_S
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
