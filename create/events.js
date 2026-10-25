/* Note events for /create/.
 *
 * A track's data is this list, not a rendered buffer. Play schedules it on a
 * live AudioContext, a little ahead of the clock. Keep and Perform render the
 * same list offline, with the same seed, so a random arp does not change.
 *
 * The document is plain data. A later .mid export, piano roll, or Web MIDI
 * output can read it without knowing about the synth graph:
 *   one MIDI track per entry, channel = track.channel (0–15, written order)
 *   note on at `beat` quarters, off `beats` later, velocity = round(velocity * 127)
 *   track.params is the voice (FM depth and the patch). A control-change map
 *   can send fmDepth; this file does not send MIDI.
 * Audio clips stay recordings. They have no pitch, so a MIDI file would skip
 * them or write a marker.
 */
(function (root) {
  'use strict';
  var LEAD = 0.05;
  var HORIZON = 0.12;
  var TICK = 25;
  var current = null;

  function beatOf(bpm) { return 60 / (bpm > 0 ? bpm : 96); }
  function samplerOn() {
    return !!(root.NCSampler && NCSampler.active && NCSampler.active());
  }
  function samplerSlug() {
    if (root.NCSampler && NCSampler.slug) return NCSampler.slug() || '';
    return '';
  }
  function librarySlug(name) {
    if (root.NCInstruments && NCInstruments.slug) return NCInstruments.slug(name) || '';
    return '';
  }
  function playsChords(name) {
    return !!(root.NCInstruments && NCInstruments.playsChords && NCInstruments.playsChords(name));
  }
  function copyNote(ev) {
    return {
      type: 'note',
      pitch: ev.pitch || '',
      midi: ev.midi,
      velocity: ev.velocity == null ? 0.82 : ev.velocity,
      start: ev.start,
      length: ev.length,
      written: ev.start,
      writtenLength: ev.length
    };
  }
  function stamp(ev, beat, slot) {
    ev.slot = slot;
    ev.written = ev.start;
    ev.writtenLength = ev.length;
    ev.beat = beat > 0 ? ev.written / beat : 0;
    ev.beats = beat > 0 ? ev.writtenLength / beat : 0;
    ev.fmDepth = ev.fmDepth == null ? 0 : ev.fmDepth;
    return ev;
  }
  function voiceParams(fm) {
    var s = root.NCSynth && NCSynth.mergeSettings ? NCSynth.mergeSettings(fm == null ? null : { fmDepth: fm }) : { fmDepth: fm || 0 };
    return {
      fmDepth: s.fmDepth || 0,
      waveform: s.waveform,
      cutoff: s.cutoff,
      resonance: s.resonance,
      attack: s.attack,
      decay: s.decay,
      sustain: s.sustain,
      release: s.release,
      level: s.level
    };
  }
  // Notes and arp tracks can play the sampler. @synth stays the synth.
  // A name in NCInstruments is the sampler even when the hidden sampler
  // switch is off. @bass and @strings do that on a chord track too.
  // Bass is B1–A#4. Strings are G3–C#7.
  // Any other @name keeps the synth out.
  function roleOf(tr) {
    if (!tr) return '';
    if (tr.kind === 'chords') {
      if (tr.instrument === 'synth') return 'synth';
      if (playsChords(tr.instrument)) return 'sampler';
      return 'audio';
    }
    if (tr.kind !== 'notes' && tr.kind !== 'arp') return '';
    if (tr.instrument === 'synth') return 'synth';
    var named = librarySlug(tr.instrument);
    if (named) return 'sampler';
    if (tr.instrument) return '';
    if (samplerOn()) return 'sampler';
    return 'synth';
  }
  function bare(tr) {
    var copy = {
      kind: tr.kind, instrument: tr.instrument === 'synth' ? 'synth' : '',
      played: tr.played, arp: tr.arp, source: tr.source, harmony: tr.harmony,
      fmDepth: tr.fmDepth, label: tr.label, n: tr.n
    };
    if (copy.arp && copy.arp.instrument && (copy.arp.instrument === 'synth' || librarySlug(copy.arp.instrument))) {
      copy.arp = Object.assign({}, copy.arp, { instrument: '' });
    }
    return copy;
  }
  function groupSlots(events, beat, fm) {
    var slot = -1, last = null;
    events.forEach(function (ev) {
      if (last == null || Math.abs(ev.start - last) > 1e-4) { slot++; last = ev.start; }
      ev.type = 'note';
      ev.fmDepth = fm || 0;
      stamp(ev, beat, slot);
    });
    return events;
  }
  function samplerEvents(events, slug, beat) {
    var man = null;
    if (root.NCSampler && NCSampler.manifest) man = NCSampler.manifest(slug);
    var skipped = [], messages = [];
    if (!man || !root.NCSampler || !NCSampler.plan) {
      return { events: [], skipped: skipped, messages: messages };
    }
    var incoming = events.map(function (ev, i) {
      return { symbol: ev.pitch || 'note', written: [ev.midi], start: ev.written, hold: ev.writtenLength, origin: 'notes', index: i };
    });
    var planned = NCSampler.plan(man, incoming, 0, 0.12);
    var out = [];
    planned.notes.forEach(function (n) {
      var hold = Math.max(0.02, n.keep - (n.fade || 0));
      var gain = n.gain == null ? 1 : n.gain;
      out.push(stamp({
        type: 'note',
        pitch: NCSampler.noteName ? NCSampler.noteName(n.midi) : '',
        midi: n.midi,
        velocity: Math.max(0, Math.min(1, gain)),
        gain: gain,
        fade: n.fade || 0,
        start: n.start,
        length: hold,
        fmDepth: 0
      }, beat, n.index == null ? out.length : n.index));
    });
    incoming.forEach(function (ev) {
      var picked = NCSampler.selectWritten(ev.written, man.notes || {});
      (picked.missing || []).forEach(function (midi) {
        skipped.push({ midi: midi, pitch: NCSampler.noteName(midi), slot: ev.index });
      });
    });
    return { events: out, skipped: skipped, messages: planned.messages || [] };
  }
  function audioEvents(played, beat, bar) {
    var t = 0, slot = 0, out = [];
    (played || []).forEach(function (ev) {
      if (ev.kind === 'rest') {
        if (ev.seconds > 0) t += ev.seconds;
        return;
      }
      if (ev.kind !== 'chord') return;
      var len = ev.seconds > 0 ? ev.seconds : bar;
      out.push(stamp({
        type: 'clip',
        symbol: ev.symbol || '',
        recording: ev.recording == null ? null : ev.recording,
        start: t,
        length: len,
        velocity: 0,
        midi: null,
        pitch: ''
      }, beat, slot));
      slot++;
      t += len;
    });
    return out;
  }
  function pushVoice(doc, id, n, label, role, instrument, seed, params, events, extra) {
    var track = {
      id: id,
      n: n,
      label: label,
      voice: role,
      channel: doc.tracks.length,
      program: null,
      instrument: instrument || '',
      seed: seed >>> 0,
      params: params,
      region: !!(extra && extra.region),
      writtenAt: 0,
      span: 0,
      clipId: (role === 'sampler' ? 'nc-sampler-' : 'nc-synth-') + id,
      events: events,
      skipped: (extra && extra.skipped) || [],
      messages: (extra && extra.messages) || []
    };
    var end = 0;
    events.forEach(function (ev) {
      var at = (ev.written || 0) + (ev.writtenLength || 0);
      if (at > end) end = at;
    });
    track.span = end;
    doc.tracks.push(track);
    return track;
  }
  function build(parsed) {
    parsed = parsed || {};
    var bpm = parsed.bpm > 0 ? parsed.bpm : 96;
    var meter = parsed.meter || '4/4';
    var beat = beatOf(bpm);
    var qpb = root.NCLanguage && NCLanguage.beatsInBar ? NCLanguage.beatsInBar(meter) : 4;
    var doc = { v: 1, bpm: bpm, meter: meter, beat: beat, tracks: [] };
    var chosen = samplerSlug();
    if (!parsed.synth && (parsed.played || []).some(function (e) { return e.kind === 'chord'; })) {
      pushVoice(doc, 'chords', null, 'Chords', 'audio', '', (parsed.seed == null ? 1 : parsed.seed), voiceParams(0), audioEvents(parsed.played, beat, qpb * beat), null);
    }
    (parsed.tracks || []).forEach(function (tr, i) {
      var role = roleOf(tr);
      if (!role) return;
      if (role === 'audio') {
        pushVoice(doc, 't' + tr.n, tr.n, tr.label || ('T' + tr.n), 'audio', tr.instrument || '', (parsed.seed || 1) + i, voiceParams(0), audioEvents(tr.played, beat, qpb * beat), null);
        return;
      }
      var src = bare(tr);
      if (role === 'sampler') src.source = String(src.source || '').replace(/@[A-Za-z][\w-]*/g, '');
      // voiceOf expands a chord track only when the instrument is synth.
      // The slug below stays the sampler name from the written line.
      if (role === 'sampler' && tr.kind === 'chords') src.instrument = 'synth';
      var voice = root.NCSynth && NCSynth.voiceOf ? NCSynth.voiceOf(src, parsed, i) : null;
      if (!voice || !voice.events || !voice.events.length) return;
      var fm = voice.fmDepth == null ? 0 : voice.fmDepth;
      var notes = groupSlots(voice.events.map(copyNote), beat, fm);
      var slug = librarySlug(tr.instrument) || (role === 'sampler' ? chosen : '');
      var extra = null;
      if (role === 'sampler') {
        extra = samplerEvents(notes, slug, beat);
        notes = extra.events;
        if (!notes.length) {
          pushVoice(doc, 't' + tr.n, tr.n, tr.label || ('T' + tr.n), 'sampler', slug, voice.seed, voiceParams(0), [], extra);
          return;
        }
      }
      pushVoice(doc, 't' + tr.n, tr.n, tr.label || ('T' + tr.n), role, slug, voice.seed, voiceParams(role === 'synth' ? fm : 0), notes, Object.assign({ region: tr.kind === 'arp' }, extra));
    });
    if (parsed.synth && root.NCSynth && NCSynth.chordVoice) {
      var cv = NCSynth.chordVoice(parsed, (parsed.tracks || []).length);
      if (cv && cv.events && cv.events.length) {
        var notesC = groupSlots(cv.events.map(copyNote), beat, cv.fmDepth || 0);
        pushVoice(doc, 'chords', null, 'Chords', 'synth', '', cv.seed, voiceParams(cv.fmDepth || 0), notesC, null);
      }
    }
    return doc;
  }
  function follow(doc) {
    if (!doc) return doc;
    var arrange = root.NCArrange;
    doc.tracks.forEach(function (tr) {
      if (tr.region) {
        var clip = arrange && arrange.clip ? arrange.clip(tr.id, 0) : null;
        var shift = clip ? clip.at - (tr.writtenAt || 0) : 0;
        var end = clip ? clip.at + clip.len : Infinity;
        tr.events.forEach(function (ev) {
          var at = (ev.written || 0) + shift;
          var len = ev.writtenLength || 0;
          if (at >= end - 1e-4) len = 0;
          else if (at + len > end) len = Math.max(0, end - at);
          ev.start = at;
          ev.length = len;
        });
        return;
      }
      var seen = {};
      tr.events.forEach(function (ev) {
        var clip = arrange && arrange.clip && ev.slot != null ? arrange.clip(tr.id, ev.slot) : null;
        if (!clip) {
          if (ev.slot != null && seen[ev.slot]) {
            ev.start = seen[ev.slot].start;
            ev.length = seen[ev.slot].length;
            return;
          }
          ev.start = ev.written;
          ev.length = ev.writtenLength;
          return;
        }
        if (ev.slot != null && seen[ev.slot]) {
          ev.start = seen[ev.slot].start;
          ev.length = seen[ev.slot].length;
          return;
        }
        ev.start = clip.at;
        ev.length = Math.max(0, clip.len);
        if (ev.slot != null) seen[ev.slot] = { start: ev.start, length: ev.length };
      });
    });
    return doc;
  }
  function prime(engine, events, origin, depth) {
    (events || []).forEach(function (ev) {
      if (!ev || ev.type === 'clip' || !(ev.length > 0) || !(ev.midi >= 0)) return;
      var mod = ev.modulator && ev.modulator.buffer ? ev.modulator : null;
      engine.scheduleNote(
        ev.midi,
        origin + ev.start,
        ev.length,
        ev.velocity == null ? 0.82 : ev.velocity,
        mod && depth > 0 ? { buffer: mod.buffer, offset: mod.offset || 0, depth: depth } : null
      );
    });
  }
  function scheduleSamplerNote(ctx, dest, ev, origin, buffer, output) {
    if (!buffer || !(ev.length > 0)) return null;
    var keep = ev.length + (ev.fade || 0);
    var dur = Math.min(buffer.duration, keep);
    if (!(dur > 0.001)) return null;
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    var g = ctx.createGain();
    var t = origin + ev.start;
    var gain = (ev.gain == null ? 1 : ev.gain) * (output == null ? 0.8 : output);
    g.gain.setValueAtTime(gain, t);
    if (ev.fade > 0 && buffer.duration + 1e-4 >= keep) {
      var fade = Math.min(ev.fade, dur);
      if (fade > 1 / 48000 && dur - fade > 0) {
        g.gain.setValueAtTime(gain, t + (dur - fade));
        g.gain.linearRampToValueAtTime(0, t + dur);
      }
    }
    src.connect(g);
    g.connect(dest);
    src.start(t, 0, dur);
    return { src: src, gain: g, end: ev.start + dur };
  }
  function scheduleClip(ctx, dest, ev, origin, buffer) {
    if (!buffer || !(ev.length > 0)) return null;
    var play = Math.min(ev.length, buffer.duration);
    if (!(play > 0)) return null;
    var src = ctx.createBufferSource();
    var g = ctx.createGain();
    var t = origin + ev.start;
    src.buffer = buffer;
    g.gain.setValueAtTime(0.8, t);
    g.gain.setTargetAtTime(0, t + Math.max(0.02, play - 0.04), 0.015);
    src.connect(g);
    g.connect(dest);
    src.start(t, 0, play);
    return { src: src, gain: g, end: ev.start + ev.length };
  }
  function renderSynth(track) {
    var Eng = root.NCSynthEngine && NCSynthEngine.SynthEngine;
    if (!Eng || !root.NCSynth) return Promise.reject(new Error('NC Synth engine is not loaded'));
    var settings = NCSynth.mergeSettings({ fmDepth: track.params && track.params.fmDepth || 0 });
    var tail = (settings.release > 0 ? settings.release : 0.4) + 0.05;
    var end = 0.05;
    (track.events || []).forEach(function (ev) {
      var at = (ev.start || 0) + (ev.length || 0) + tail;
      if (at > end) end = at;
    });
    var ctx = new (root.OfflineAudioContext || OfflineAudioContext)(2, Math.max(1, Math.ceil(end * 48000)), 48000);
    var engine = new Eng(settings);
    var random = NCSynth.mulberry32(track.seed >>> 0);
    var node = ctx.createGain();
    node.gain.value = 0.8;
    node.connect(ctx.destination);
    return engine.open(ctx, random, node).then(function () {
      prime(engine, track.events, 0, settings.fmDepth || 0);
      return ctx.startRendering();
    });
  }
  function renderSampler(track, buffers, output) {
    var end = 0.1;
    (track.events || []).forEach(function (ev) {
      var at = (ev.start || 0) + (ev.length || 0) + (ev.fade || 0);
      if (at > end) end = at;
    });
    var Ctx = root.OfflineAudioContext || (typeof OfflineAudioContext !== 'undefined' ? OfflineAudioContext : null);
    if (!Ctx) return Promise.reject(new Error('Offline audio is not available'));
    var ctx = new Ctx(2, Math.max(1, Math.ceil((end + 0.05) * 48000)), 48000);
    var master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    (track.events || []).forEach(function (ev) {
      var buffer = buffers && buffers[ev.midi];
      scheduleSamplerNote(ctx, master, ev, 0, buffer, output);
    });
    return ctx.startRendering();
  }
  function renderVoice(track, extras) {
    extras = extras || {};
    if (!track) return Promise.resolve(null);
    if (track.voice === 'sampler') return renderSampler(track, extras.buffers || {}, extras.output);
    if (track.voice === 'synth') return renderSynth(track);
    return Promise.resolve(null);
  }
  function play(doc, ctx, dest, opts) {
    opts = opts || {};
    follow(doc);
    current = doc;
    var live = opts.live || function () { return true; };
    var lead = opts.lead == null ? LEAD : opts.lead;
    var origin = ctx.currentTime + lead;
    var engines = [];
    var sources = [];
    var timers = [];
    var scheduled = {};
    var stopped = false;
    var output = opts.output;
    function stop() {
      if (stopped) return;
      stopped = true;
      timers.splice(0).forEach(function (t) { clearTimeout(t); });
      sources.splice(0).forEach(function (s) { try { s.stop(); } catch (e) {} });
      engines.forEach(function (row) { try { row.engine.panic(); } catch (e) {} });
      if (current === doc) current = null;
    }
    function due(tr, ev, i) {
      var key = tr.id + ':' + i;
      if (scheduled[key] || !(ev.length > 0)) {
        if (!(ev.length > 0)) scheduled[key] = 1;
        return false;
      }
      var when = origin + ev.start;
      if (when > ctx.currentTime + HORIZON) return false;
      if (when < ctx.currentTime - 0.03) { scheduled[key] = 1; return false; }
      scheduled[key] = 1;
      return true;
    }
    function tick() {
      if (stopped || !live()) { stop(); return; }
      follow(doc);
      doc.tracks.forEach(function (tr) {
        if (tr.voice === 'synth') {
          var row = null, k;
          for (k = 0; k < engines.length; k++) if (engines[k].id === tr.id) row = engines[k];
          if (!row) return;
          var batch = [];
          tr.events.forEach(function (ev, i) { if (due(tr, ev, i)) batch.push(ev); });
          if (batch.length) prime(row.engine, batch, origin, tr.params && tr.params.fmDepth || 0);
          return;
        }
        if (tr.voice === 'sampler') {
          tr.events.forEach(function (ev, i) {
            if (!due(tr, ev, i)) return;
            var buffer = opts.buffers && opts.buffers[tr.instrument + ':' + ev.midi];
            var node = scheduleSamplerNote(ctx, dest, ev, origin, buffer, output);
            if (node) sources.push(node.src);
          });
          return;
        }
        if (tr.voice === 'audio') {
          tr.events.forEach(function (ev, i) {
            if (!due(tr, ev, i)) return;
            var buffer = opts.clips && opts.clips[tr.id + ':' + ev.slot];
            if (!buffer && opts.missingClip) opts.missingClip(tr, ev, origin + ev.start);
            else {
              var node = scheduleClip(ctx, dest, ev, origin, buffer);
              if (node) sources.push(node.src);
            }
          });
        }
      });
      timers.push(setTimeout(tick, TICK));
    }
    var opening = [];
    var Eng = root.NCSynthEngine && NCSynthEngine.SynthEngine;
    doc.tracks.forEach(function (tr) {
      if (tr.voice !== 'synth' || !Eng || !tr.events.length) return;
      var settings = NCSynth.mergeSettings({ fmDepth: tr.params && tr.params.fmDepth || 0 });
      var engine = new Eng(settings);
      var node = ctx.createGain();
      node.gain.value = 0.8;
      node.connect(dest);
      opening.push(engine.open(ctx, NCSynth.mulberry32(tr.seed >>> 0), node).then(function () {
        engines.push({ id: tr.id, engine: engine });
      }));
    });
    var handle = { stop: stop, when: origin, end: 0, ready: null };
    var ready = opening.length ? Promise.all(opening) : Promise.resolve();
    handle.ready = ready.then(function () {
      if (stopped || !live()) return handle;
      var now = ctx.currentTime;
      if (origin < now + 0.02) origin = now + 0.02;
      handle.when = origin;
      tick();
      return handle;
    });
    var end = lead;
    doc.tracks.forEach(function (tr) {
      var tail = tr.voice === 'synth' && tr.params ? (tr.params.release || 0.4) : 0.05;
      tr.events.forEach(function (ev) {
        var at = (ev.written || 0) + (ev.writtenLength || 0) + tail;
        if (at > end) end = at;
      });
    });
    handle.end = end;
    return handle;
  }

  root.NCEvents = {
    build: build,
    follow: follow,
    play: play,
    prime: prime,
    renderVoice: renderVoice,
    renderSampler: renderSampler,
    current: function () { return current; },
    LEAD: LEAD
  };
})(typeof window !== 'undefined' ? window : globalThis);
