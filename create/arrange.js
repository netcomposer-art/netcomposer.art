/* Arrangement under Play.
 *
 * The grouped Play line stays the readout. This is the editable track layout:
 * one lane per track, chords first, and further lanes when a notes line is
 * present (Synth, or Sampler when that player is on). Lanes are a list, so
 * another track is another entry.
 *
 * The gestures are the ones the take strip already had. A body drag moves a
 * bar. Either edge trims it. Nothing is time-stretched or pitch-shifted, and
 * a bar never passes its recording. Written lengths can only be shortened.
 * Arrow keys use the same directions as the take strip: left and right move,
 * up and down change the end, Alt with left or right changes the start.
 * There is no reverse control in that strip.
 *
 * Edits stay in the page. Play hears them. Gather and Save do not, unless a
 * gathered take is edited on the take strip, which already posts them.
 */
(function (root) {
  'use strict';

  function secs(n) { return +(+n).toFixed(3); }
  function layoutChords(chords) {
    var entries = [], cursor = 0, i, c, written, nominal, at;
    chords = chords || [];
    for (i = 0; i < chords.length; i++) {
      c = chords[i] || {};
      written = c.slot > 0 ? secs(c.slot) : 0;
      nominal = written || (c.sketchDur > 0 ? secs(c.sketchDur) : (c.dur > 0 ? secs(c.dur) : 1));
      if (!(nominal > 0)) nominal = 1;
      at = secs(cursor + (c.gapBefore > 0 ? c.gapBefore : 0));
      entries.push({
        at_s: at, len_s: nominal, cap: nominal, written: written,
        chord: c.symbol || 'Chord', path: c.path || ''
      });
      cursor = secs(at + (written || nominal));
    }
    return { entries: entries, base: cursor > 0 ? cursor : 0.001 };
  }
  function commit(entries, index, mode, time, base, caps, written) {
    var E = root.NCTimelineEdit;
    if (!E || !entries || !entries[index]) return { entries: entries || [], total_s: base || 0, index: index };
    var entry = entries[index];
    var allWritten = entries.every(function (e) { return e.written > 0; });
    if (!allWritten && entry.written > 0 && (mode === 'move' || mode === 'start')) {
      return { entries: entries.slice(), total_s: base || 0, index: index, writtenBlock: true };
    }
    var clock = null;
    if (allWritten) clock = entries.map(function (e) { return e.written; });
    else if (entry.written > 0 && mode === 'end') clock = entries.map(function (e, i) {
      return i === index ? e.written : Math.max(e.len_s, e.cap || e.len_s, 0.05);
    });
    var result = E.edit(entries, E.idOf(index), mode, time, { caps: caps, written: clock, base: base });
    if (!allWritten && result.total_s != null) {
      var m = base > 0 ? base : 0, k, end;
      for (k = 0; k < result.entries.length; k++) {
        end = secs(+result.entries[k].at_s + +result.entries[k].len_s);
        if (end > m) m = end;
      }
      result.total_s = m > 0 ? m : 0.001;
    }
    result.index = index;
    return result;
  }

  if (typeof document === 'undefined') {
    root.NCArrange = { layoutChords: layoutChords, commit: commit, addLane: function () {} };
    return;
  }

  var laneFns = [];
  var state = { sig: '', tracks: [], duration: 0.001, head: null, drag: null, pending: 0, clock: null, grid: null, raf: 0 };
  var noteTimer = 0;
  var noteText = '';

  function $(id) { return document.getElementById(id); }
  function addLane(fn) { if (typeof fn === 'function') laneFns.push(fn); }
  function signature(chords) {
    return (chords || []).map(function (c) {
      return (c.symbol || '') + ':' + (c.slot > 0 ? c.slot : '*') + ':' + (c.gapBefore || 0);
    }).join('|');
  }
  function ownedByTake() {
    var old = $('src-time');
    return !!(old && !old.hidden && old.classList && old.classList.contains('editing'));
  }
  function node(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function durationOf(tracks) {
    var m = 0.001, i, k, e, end;
    for (i = 0; i < tracks.length; i++) {
      if (tracks[i].base > m) m = tracks[i].base;
      for (k = 0; k < tracks[i].entries.length; k++) {
        e = tracks[i].entries[k];
        end = +e.at_s + +e.len_s;
        if (end > m) m = end;
      }
    }
    return secs(m);
  }
  function gridClock(parsed) {
    var bpm = parsed && parsed.bpm > 0 ? parsed.bpm : 96;
    var meter = parsed && parsed.meter ? parsed.meter : '4/4';
    var qpb = 4, m;
    if (root.NCLanguage && NCLanguage.beatsInBar) qpb = NCLanguage.beatsInBar(meter);
    else if ((m = /^(\d+)\/(2|4|8)$/.exec(meter))) qpb = +m[1] * (4 / +m[2]);
    return { bpm: bpm, qpb: qpb };
  }
  function paintGrid(ruler, dur, clock) {
    var old = ruler.querySelectorAll('.arr-tick'), i;
    for (i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
    if (!clock || !(dur > 0) || !(clock.bpm > 0) || !(clock.qpb > 0)) return;
    var beat = 60 / clock.bpm;
    var limit = Math.min(96, Math.floor((dur + 1e-4) / beat));
    for (i = 1; i <= limit; i++) {
      var t = i * beat;
      if (t > dur + 1e-3) break;
      var tick = node('span', 'arr-tick' + (Math.abs(i / clock.qpb - Math.round(i / clock.qpb)) < 1e-6 ? ' bar' : ''));
      tick.setAttribute('aria-hidden', 'true');
      tick.style.left = 'calc(var(--pad) + (100% - 2 * var(--pad)) * ' + Math.min(1, t / dur) + ')';
      ruler.appendChild(tick);
    }
  }
  function chordLane(tr, parsed) {
    var out = [], gap = 0, bpm = parsed && parsed.bpm > 0 ? parsed.bpm : 96, qpb = 4;
    if (root.NCLanguage && NCLanguage.beatsInBar) qpb = NCLanguage.beatsInBar(parsed && parsed.meter);
    var sketch = qpb * 60 / bpm;
    (tr.played || []).forEach(function (ev) {
      if (ev.kind === 'rest') { if (ev.seconds > 0) gap += ev.seconds; return; }
      if (ev.kind !== 'chord') return;
      var slot = ev.seconds == null ? null : ev.seconds;
      out.push({ symbol: ev.symbol || 'Chord', slot: slot, gapBefore: gap, sketchDur: slot == null ? sketch : 0, dur: slot || sketch });
      gap = 0;
    });
    return out;
  }
  function laneFor(tr, parsed) {
    if (!tr) return null;
    var id = 't' + tr.n, bpm = parsed && parsed.bpm > 0 ? parsed.bpm : 96, beat = 60 / bpm;
    if (tr.kind === 'chords') {
      var chords = chordLane(tr, parsed);
      if (!chords.length) return null;
      var laid = layoutChords(chords);
      return { id: id, label: tr.label, entries: laid.entries, base: laid.base };
    }
    if (tr.kind === 'notes' && root.NCSynth && NCSynth.voiceOf) {
      var voice = NCSynth.voiceOf(tr, parsed, 0);
      if (!voice || !voice.events || !voice.events.length) return null;
      var entries = [], base = 0;
      voice.events.forEach(function (n) {
        var len = secs(Math.max(0.05, n.length));
        var at = secs(n.start);
        entries.push({ at_s: at, len_s: len, cap: len, written: len, chord: n.pitch || 'note' });
        if (at + len > base) base = at + len;
      });
      return { id: id, label: tr.label, entries: entries, base: base > 0 ? secs(base) : 0.001 };
    }
    if (tr.kind === 'arp') {
      var len = secs(Math.max(0.05, (tr.beats > 0 ? tr.beats : 4) * beat));
      var name = tr.arp && tr.arp.chord ? tr.arp.chord : 'arp';
      return { id: id, label: tr.label, entries: [{ at_s: 0, len_s: len, cap: len, written: len, chord: name }], base: len };
    }
    return null;
  }
  function noteLane(parsed) {
    if (!root.NCSynth || !NCSynth.readLine) return null;
    var text = $('comp') ? $('comp').value : '';
    var line = NCSynth.readLine(text || '');
    if (!line || !line.notes || !line.notes.length || line.instrument) return null;
    var sampler = !!(root.NCSampler && NCSampler.active && NCSampler.active());
    var bpm = line.bpm > 0 ? line.bpm : (parsed && parsed.bpm > 0 ? parsed.bpm : 96);
    var beat = 60 / bpm, t = 0, entries = [];
    line.notes.forEach(function (n) {
      var len = secs(Math.max(0.05, (n.beats > 0 ? n.beats : 1) * beat));
      entries.push({ at_s: t, len_s: len, cap: len, written: len, chord: n.pitch || 'note' });
      t = secs(t + len);
    });
    return { id: sampler ? 'sampler' : 'synth', label: sampler ? 'Sampler' : 'Synth', entries: entries, base: t > 0 ? t : 0.001 };
  }
  function build(tl, parsed) {
    var tracks = [], chords = tl && tl.chords ? tl.chords : [];
    if (chords.length) {
      var laid = layoutChords(chords);
      tracks.push({ id: 'chords', label: 'Chords', entries: laid.entries, base: laid.base });
    }
    var notes = noteLane(parsed);
    if (notes) tracks.push(notes);
    if (parsed && parsed.tracks) {
      parsed.tracks.forEach(function (tr) {
        var lane = laneFor(tr, parsed);
        if (lane && lane.entries && lane.entries.length) tracks.push(lane);
      });
    }
    laneFns.forEach(function (fn) {
      var extra = null;
      try { extra = fn(tl, parsed); } catch (e) { extra = null; }
      if (extra && extra.id && extra.entries && extra.entries.length) tracks.push(extra);
    });
    return tracks;
  }
  function applyEdits(tracks, prev) {
    var kept = {};
    (prev || []).forEach(function (tr) {
      kept[tr.id] = tr.entries.map(function (e) { return { at_s: e.at_s, len_s: e.len_s, cap: e.cap }; });
    });
    tracks.forEach(function (tr) {
      var old = kept[tr.id];
      if (!old || old.length !== tr.entries.length) return;
      tr.entries.forEach(function (e, i) {
        e.at_s = old[i].at_s;
        e.len_s = old[i].len_s;
        // A learned recording can be longer than the sketch bar. Keep that cap
        // so the next paint does not pull a lengthened bar back to one bar.
        if (old[i].cap > e.cap) e.cap = old[i].cap;
        if (e.written > 0 && e.cap > e.written) e.cap = e.written;
        if (e.cap > 0 && e.len_s > e.cap) e.len_s = e.cap;
      });
    });
    return tracks;
  }
  function trackById(id) {
    for (var i = 0; i < state.tracks.length; i++) if (state.tracks[i].id === id) return state.tracks[i];
    return null;
  }
  function placeMark(mark, entry) {
    var dur = state.duration;
    mark.style.left = (100 * entry.at_s / dur) + '%';
    mark.style.width = Math.max(0.4, 100 * entry.len_s / dur) + '%';
  }
  function labelBar(mark, entry, index) {
    var name = entry.chord || 'Clip';
    var end = secs(entry.at_s + entry.len_s);
    var range = name + ', ' + (+entry.at_s).toFixed(1) + 's to ' + end.toFixed(1) + 's';
    var written = entry.written > 0;
    mark.title = written
      ? range + '. The Composition wrote this length. Drag the end to shorten it.'
      : range + '. Drag to move. Drag either edge to change the start or the end.';
    mark.setAttribute('aria-label', written
      ? range + '. Up and down change the end, no further than the Composition wrote. The start stays.'
      : range + '. Left and right move it. Up and down change the end. Alt with left or right changes the start.');
    mark.setAttribute('data-index', String(index));
  }
  function showNote(clip_s) {
    var el = $('arrange-note');
    if (!el) return;
    if (!noteText) noteText = el.textContent;
    el.textContent = clip_s > 0
      ? 'That is the whole recording (' + (+clip_s).toFixed(1) + ' s). Nothing is stretched, so it can\'t get longer. You can shorten it or move it.'
      : noteText;
    el.hidden = false;
    if (noteTimer) clearTimeout(noteTimer);
    noteTimer = setTimeout(function () { noteTimer = 0; el.hidden = true; }, 4000);
  }
  function hideNote() {
    if (noteTimer) { clearTimeout(noteTimer); noteTimer = 0; }
    var el = $('arrange-note');
    if (el) el.hidden = true;
  }
  function indexAt(t) {
    var tr = trackById('chords');
    if (!tr || !tr.entries.length) return 0;
    var i, best = 0;
    for (i = 0; i < tr.entries.length; i++) {
      if (tr.entries[i].at_s <= t + 1e-6) best = i;
    }
    return best;
  }
  function nameAt(t) {
    var best = '', bestAt = -1, i, k, e;
    for (i = 0; i < state.tracks.length; i++) {
      for (k = 0; k < state.tracks[i].entries.length; k++) {
        e = state.tracks[i].entries[k];
        if (t >= e.at_s && t < e.at_s + e.len_s + 1e-6 && e.at_s >= bestAt) {
          bestAt = e.at_s;
          best = e.chord || '';
        }
      }
    }
    return best;
  }
  function ensureHead() {
    var lanes = $('arrange-lanes');
    var E = root.NCTimelineEdit;
    if (!lanes || !E || !E.playhead) return;
    if (state.head && state.head.ruler && state.head.ruler.isConnected) return;
    state.head = E.playhead({
      lanes: lanes,
      duration: function () { return state.duration; },
      seek: function (t) {
        state.pending = indexAt(t);
        var now = $('arrange-now');
        if (now) now.textContent = nameAt(t);
        var playing = $('play') && $('play').textContent === 'Stop';
        if (playing && root.NC && NC.start) NC.start(state.pending);
      },
      preview: function (t) {
        var now = $('arrange-now');
        if (now) now.textContent = nameAt(t);
      }
    });
  }
  function hideArrange() {
    var box = $('arrange'), lanes = $('arrange-lanes');
    if (box) box.hidden = true;
    if (lanes) lanes.textContent = '';
    var ruler = box && box.querySelector('.src-ruler');
    if (ruler && ruler.parentNode) ruler.parentNode.removeChild(ruler);
    state.head = null;
  }
  function render() {
    var box = $('arrange'), lanes = $('arrange-lanes');
    if (!box || !lanes) return;
    if (ownedByTake() || !state.tracks.length) {
      hideArrange();
      return;
    }
    box.hidden = false;
    box.classList.add('editing');
    lanes.textContent = '';
    state.tracks.forEach(function (tr, ti) {
      var lane = node('section', 'arr-lane');
      lane.setAttribute('data-track', tr.id);
      var name = node('p', 'arr-name');
      var idx = node('span', 'nc-mono');
      idx.textContent = (ti + 1 < 10 ? '0' : '') + (ti + 1);
      name.appendChild(idx);
      name.appendChild(document.createTextNode(' ' + tr.label));
      var track = node('div', 'src-track');
      tr.entries.forEach(function (entry, i) {
        var mark = node('div', 'src-span');
        mark.tabIndex = 0;
        mark.setAttribute('role', 'group');
        mark.setAttribute('data-edit', '1');
        mark.setAttribute('data-track', tr.id);
        mark.setAttribute('data-chord', (tr.id === 'chords' ? 'chord-' : tr.id + '-') + i);
        ['start', 'end'].forEach(function (side) {
          var grip = node('span', 'src-grip ' + side);
          grip.setAttribute('data-grip', side);
          grip.setAttribute('aria-hidden', 'true');
          mark.appendChild(grip);
        });
        placeMark(mark, entry);
        labelBar(mark, entry, i);
        wire(mark, track, tr, i);
        entry.mark = mark;
        track.appendChild(mark);
      });
      lane.appendChild(name);
      lane.appendChild(track);
      lanes.appendChild(lane);
    });
    state.head = null;
    ensureHead();
    if (state.head) {
      state.head.place(0);
      if (state.head.ruler) paintGrid(state.head.ruler, state.duration, state.grid);
    }
  }
  function reposition(tr, index) {
    var entry = tr.entries[index];
    if (entry && entry.mark) {
      placeMark(entry.mark, entry);
      labelBar(entry.mark, entry, index);
    }
  }
  function editAt(tr, index, mode, time) {
    var caps = tr.entries.map(function (e) { return e.cap > 0 ? e.cap : e.len_s; });
    var result = commit(tr.entries, index, mode, time, tr.base, caps, null);
    tr.entries = result.entries;
    if (result.entries[index] && tr.entries[index]) tr.entries[index].mark = result.entries[index].mark;
    // commit copies entries and drops the DOM mark. Put it back.
    var mark = null;
    var lanes = $('arrange-lanes');
    if (lanes) {
      var id = (tr.id === 'chords' ? 'chord-' : tr.id + '-') + index;
      mark = lanes.querySelector('.src-span[data-track="' + tr.id + '"][data-chord="' + id + '"]');
    }
    if (mark && tr.entries[index]) tr.entries[index].mark = mark;
    reposition(tr, index);
    if (result.writtenBlock) showNote(0);
    else if (result.clipBlock) showNote(result.clip_s || (tr.entries[index] && tr.entries[index].cap));
    var grown = result.total_s > state.duration + 1e-6;
    if (grown && !state.drag) {
      state.duration = result.total_s;
      render();
    }
    return result;
  }
  function onKey(ev, tr, index) {
    if (state.drag) return;
    var e = tr.entries[index];
    if (!e) return;
    var step = ev.shiftKey ? 0.5 : 0.1, mode = '', time = 0;
    if (ev.altKey && ev.key === 'ArrowLeft') { mode = 'start'; time = e.at_s - step; }
    else if (ev.altKey && ev.key === 'ArrowRight') { mode = 'start'; time = e.at_s + step; }
    else if (ev.key === 'ArrowLeft') { mode = 'move'; time = e.at_s - step; }
    else if (ev.key === 'ArrowRight') { mode = 'move'; time = e.at_s + step; }
    else if (ev.key === 'ArrowUp') { mode = 'end'; time = e.at_s + e.len_s + step; }
    else if (ev.key === 'ArrowDown') { mode = 'end'; time = e.at_s + e.len_s - step; }
    else return;
    ev.preventDefault();
    ev.stopPropagation();
    if (!ev.repeat) hideNote();
    editAt(tr, index, mode, time);
  }
  function wire(mark, track, tr, index) {
    function gripOf(ev) {
      var t = ev.target;
      var side = t && t.getAttribute ? t.getAttribute('data-grip') : '';
      return side === 'start' || side === 'end' ? side : 'move';
    }
    mark.addEventListener('pointerdown', function (ev) {
      if (ev.button != null && ev.button !== 0) return;
      if (state.drag) return;
      var entry = tr.entries[index];
      var box = track.getBoundingClientRect();
      if (!entry || !(box.width > 0)) return;
      ev.preventDefault();
      ev.stopPropagation();
      hideNote();
      if (mark.focus) mark.focus({ preventScroll: true });
      state.drag = {
        track: tr.id, index: index, pointerId: ev.pointerId, mark: mark, mode: gripOf(ev),
        x: ev.clientX, at: entry.at_s, end: secs(entry.at_s + entry.len_s),
        scale: state.duration, width: box.width, moved: false, noted: false
      };
      mark.classList.add(state.drag.mode === 'move' ? 'dragging' : 'trimming');
      if (mark.setPointerCapture) { try { mark.setPointerCapture(ev.pointerId); } catch (e) {} }
    });
    mark.addEventListener('pointermove', function (ev) {
      var drag = state.drag;
      if (!drag || drag.mark !== mark || ev.pointerId !== drag.pointerId) return;
      if (!drag.moved) {
        if (Math.abs(ev.clientX - drag.x) < 3) return;
        drag.moved = true;
      }
      ev.preventDefault();
      var dt = (ev.clientX - drag.x) / drag.width * drag.scale;
      var time = drag.mode === 'end' ? drag.end + dt : drag.at + dt;
      var result = editAt(tr, drag.index, drag.mode, time);
      if (result && (result.writtenBlock || result.clipBlock) && !drag.noted) {
        drag.noted = true;
        showNote(result.writtenBlock ? 0 : (result.clip_s || 0));
      }
    });
    function endPointer(ev) {
      var drag = state.drag;
      if (!drag || drag.mark !== mark) return;
      if (ev && ev.pointerId != null && ev.pointerId !== drag.pointerId) return;
      var moved = drag.moved;
      mark.classList.remove('dragging');
      mark.classList.remove('trimming');
      if (mark.releasePointerCapture && ev && ev.pointerId != null && mark.hasPointerCapture) {
        try { if (mark.hasPointerCapture(ev.pointerId)) mark.releasePointerCapture(ev.pointerId); } catch (e) {}
      }
      state.drag = null;
      if (!moved) return;
      var grown = false, i, k, e, end, m = 0.001;
      for (i = 0; i < state.tracks.length; i++) {
        if (state.tracks[i].base > m) m = state.tracks[i].base;
        for (k = 0; k < state.tracks[i].entries.length; k++) {
          e = state.tracks[i].entries[k];
          end = +e.at_s + +e.len_s;
          if (end > m) m = end;
        }
      }
      if (m > state.duration + 1e-6) { state.duration = secs(m); grown = true; }
      if (grown) render();
    }
    mark.addEventListener('pointerup', endPointer);
    mark.addEventListener('pointercancel', endPointer);
    mark.addEventListener('lostpointercapture', endPointer);
    mark.addEventListener('keydown', function (ev) { onKey(ev, tr, index); });
    mark.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
  }
  function paint() {
    if (state.drag) return;
    var box = $('arrange');
    if (!box) return;
    if (ownedByTake()) { hideArrange(); return; }
    var tl = null, parsed = null;
    try { parsed = root.NC && NC.read ? NC.read() : null; } catch (e) { parsed = null; }
    try { tl = root.NC && NC.timeline ? NC.timeline() : null; } catch (e2) { tl = null; }
    var comp = $('comp') ? $('comp').value : '';
    var sig = comp + '\n' + signature(tl && tl.chords);
    var prev = sig === state.sig ? state.tracks : [];
    if (sig !== state.sig) state.pending = 0;
    state.sig = sig;
    state.tracks = applyEdits(build(tl, parsed), prev);
    state.duration = durationOf(state.tracks);
    state.grid = gridClock(parsed);
    render();
  }
  function rows(chords, trackId) {
    var tr = trackById(trackId || 'chords');
    if (!tr || !chords || tr.entries.length < chords.length) return null;
    return chords.map(function (c, i) {
      var e = tr.entries[i];
      return e ? { at: e.at_s, len: e.len_s } : null;
    });
  }
  function learn(chords, clips, trackId) {
    var tr = trackById(trackId || 'chords');
    if (!tr || !clips) return;
    clips.forEach(function (clip, i) {
      var e = tr.entries[i];
      if (!e || !clip || !clip.buffer || !(clip.buffer.duration > 0)) return;
      var cap = secs(clip.buffer.duration);
      if (e.written > 0 && cap > e.written) cap = e.written;
      e.cap = cap;
      if (e.len_s > cap) e.len_s = cap;
    });
    if (!state.drag) render();
  }
  function clip(trackId, index) {
    var tr = trackById(trackId);
    if (!tr || !tr.entries[index]) return null;
    var e = tr.entries[index];
    return { at: e.at_s, len: e.len_s };
  }
  function tick() {
    state.raf = 0;
    var clock = state.clock;
    if (!clock || !state.head) return;
    var t = (clock.ctx.currentTime - clock.t0) * clock.speed + clock.origin;
    if (t < 0) t = 0;
    state.head.place(t);
    var now = $('arrange-now');
    if (now) now.textContent = nameAt(t);
    if (t < clock.dur) state.raf = requestAnimationFrame(tick);
  }
  function armPlay(ctx, t0, origin, speed, dur) {
    state.clock = { ctx: ctx, t0: t0, origin: origin || 0, speed: speed > 0 ? speed : 1, dur: dur > 0 ? dur : state.duration };
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(tick);
  }
  function disarm() {
    state.clock = null;
    if (state.raf) { cancelAnimationFrame(state.raf); state.raf = 0; }
  }
  function resumeFrom() { return state.pending || 0; }

  root.NCArrange = {
    layoutChords: layoutChords,
    commit: commit,
    addLane: addLane,
    paint: paint,
    rows: rows,
    learn: learn,
    clip: clip,
    armPlay: armPlay,
    disarm: disarm,
    resumeFrom: resumeFrom
  };
  var takeBox = $('src-time');
  if (takeBox && window.MutationObserver) {
    new MutationObserver(function () { if (!state.drag) paint(); }).observe(takeBox, { attributes: true, attributeFilter: ['hidden', 'class'] });
  }
  if (document.body && document.body.getAttribute('data-ready') === '1') paint();
})(typeof window !== 'undefined' ? window : globalThis);
