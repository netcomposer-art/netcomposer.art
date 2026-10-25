/* NC sampler on /create/. Hidden unless ?sampler=1 or localStorage nc.sampler=1.
 *
 * Plays the written notes of an nc-sampler/1 manifest. The file rate stays
 * where the recording left it. A pitch the instrument does not have is left
 * out and named. Another octave is not played in its place. Notes ring up to
 * 8 seconds and fade across 120 ms when the chord changes. Each note is nudged
 * toward the instrument's median loudness, at most 3 dB either way.
 *
 * The panel uses the NC Synth instrument face: a shaded block per module,
 * mono index, tracked label, range, select, and mono readout. No pitch or
 * speed control. A missing pitch stays dimmed on the keyboard; a pitch the
 * current writing uses is marked in the accent.
 */
(function (root) {
  'use strict';
  var NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  var BLACK = {1: 1, 3: 1, 6: 1, 8: 1, 10: 1};
  var RING_S = 8;
  var FADE_S = 0.12;
  var API_NOTES = 'https://nc-perform-api.psemme.workers.dev/api/notes/';
  var LIBRARY = [
    {slug: 'guitar', name: 'Guitar', spread: 0.018},
    {slug: 'cello-pizzicato', name: 'Cello pizzicato', spread: 0.015},
    {slug: 'piano', name: 'Piano', spread: 0.008}
  ];
  var configured = '';
  var manifests = {};
  var cache = {};
  var manifestsDone = false;
  var booted = false;
  var lastLines = '';
  var chordUse = {};
  var sources = [];
  var timers = [];
  var sac = null;
  var savedCopy = {};
  var prefetchToken = 0;

  function noteName(midi) {
    midi = +midi;
    var pc = ((midi % 12) + 12) % 12;
    return NAMES[pc] + (Math.floor(midi / 12) - 1);
  }
  function joinNames(midis, conj) {
    var names = [];
    (midis || []).forEach(function (m) { names.push(noteName(m)); });
    conj = conj || 'and';
    if (names.length <= 1) return names[0] || '';
    if (names.length === 2) return names[0] + ' ' + conj + ' ' + names[1];
    return names.slice(0, -1).join(', ') + ', ' + conj + ' ' + names[names.length - 1];
  }
  function titleName(who) {
    who = who || 'Instrument';
    return who.charAt(0).toUpperCase() + who.slice(1);
  }
  function selectWritten(written, available) {
    var have = {};
    if (Array.isArray(available)) available.forEach(function (m) { have[+m] = 1; });
    else Object.keys(available || {}).forEach(function (k) { have[+k] = 1; });
    var play = [], missing = [];
    (written || []).forEach(function (midi) {
      midi = +midi;
      if (have[midi]) play.push(midi);
      else missing.push(midi);
    });
    return {play: play, missing: missing};
  }
  function plainMissing(instrument, chord, missing, played) {
    if (!missing || !missing.length) return '';
    var who = titleName(instrument);
    var miss = joinNames(missing.slice().sort(function (a, b) { return b - a; }), 'or');
    var lead = who + ' has no ' + miss + ', so ' + chord + ' plays ';
    if (played && played.length === 1) return lead + noteName(played[0]) + ' only.';
    if (played && played.length) return lead + joinNames(played) + '.';
    return lead + 'nothing.';
  }
  function median(values) {
    var a = values.slice().sort(function (x, y) { return x - y; });
    var n = a.length, mid = Math.floor(n / 2);
    if (!n) return 0;
    return n % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  }
  function levelGains(notes) {
    var values = [], gains = {};
    Object.keys(notes || {}).forEach(function (k) {
      var note = notes[k];
      if (note && note.lufs != null && isFinite(+note.lufs)) values.push(+note.lufs);
    });
    var mid = values.length ? median(values) : 0;
    Object.keys(notes || {}).forEach(function (k) {
      var note = notes[k] || {};
      if (note.lufs == null || !isFinite(+note.lufs)) { gains[+k] = 1; return; }
      var db = mid - (+note.lufs);
      if (db > 3) db = 3;
      if (db < -3) db = -3;
      gains[+k] = Math.pow(10, db / 20);
    });
    return gains;
  }
  function creditLine(author, page, license) {
    return (author || '') + ', ' + (page || '') + ', ' + (license || '');
  }
  function syntaxHint(origin, missing, have) {
    if (origin !== 'notes' || !missing || !missing.length) return '';
    var keys = [];
    Object.keys(have).forEach(function (k) { if (have[k]) keys.push(+k); });
    if (!keys.length) return '';
    var target = +missing[0], best = keys[0], bestD = Math.abs(keys[0] - target);
    keys.forEach(function (m) {
      var d = Math.abs(m - target);
      if (d < bestD) { bestD = d; best = m; }
    });
    return 'Write n ' + noteName(best) + '.';
  }
  function haveMap(notes) {
    var have = {};
    Object.keys(notes || {}).forEach(function (k) { have[+k] = 1; });
    return have;
  }
  function plan(manifest, events, spread, fadeS) {
    manifest = manifest || {};
    if (fadeS == null) fadeS = FADE_S;
    spread = spread || 0;
    var notes = manifest.notes || {};
    var gains = levelGains(notes);
    var have = haveMap(notes);
    var out = [], messages = [], hints = [], seen = {};
    var row = libraryRow(manifest.slug);
    var who = (row && row.name) || manifest.instrument || manifest.slug || 'instrument';
    (events || []).forEach(function (ev) {
      var picked = selectWritten(ev.written, have);
      var sentence = plainMissing(who, ev.symbol, picked.missing, picked.play);
      if (sentence && !seen[sentence]) { seen[sentence] = 1; messages.push(sentence); }
      var hint = syntaxHint(ev.origin, picked.missing, have);
      if (hint && hints.indexOf(hint) < 0) hints.push(hint);
      var useSpread = ev.origin === 'chord' ? spread : 0;
      picked.play.forEach(function (midi, i) {
        var keep = ev.hold - i * useSpread + fadeS;
        if (!(keep > 8 / 48000)) return;
        out.push({
          midi: midi, start: ev.start + i * useSpread, keep: keep,
          gain: gains[midi] == null ? 1 : gains[midi], fade: fadeS,
          symbol: ev.symbol, index: ev.index, origin: ev.origin
        });
      });
    });
    return {notes: out, messages: messages, hints: hints};
  }
  function mix(manifest, events, pcm, opts) {
    opts = opts || {};
    var sr = 48000;
    var planned = plan(manifest, events, opts.spread || 0, opts.fade == null ? FADE_S : opts.fade);
    var end = 0, cursor = 0;
    (events || []).forEach(function (ev) { var e = ev.start + ev.hold; if (e > cursor) cursor = e; });
    planned.notes.forEach(function (n) { var e = n.start + n.keep; if (e > end) end = e; });
    var total = Math.ceil((Math.max(end, cursor) + 0.2) * sr) + 8;
    var L = new Float32Array(total), R = new Float32Array(total);
    planned.notes.forEach(function (n) {
      var audio = pcm[n.midi];
      if (!audio) return;
      var keepN = Math.round(n.keep * sr);
      if (keepN <= 8) return;
      var frames = Math.floor(audio.length / 2);
      var nFrames = Math.min(frames, keepN);
      var fade = nFrames === keepN && n.fade > 0;
      var fadeN = fade ? Math.min(nFrames, Math.round(n.fade * sr)) : 0;
      var at = Math.round(n.start * sr);
      var k, env, i, g;
      for (k = 0; k < nFrames; k++) {
        env = 1;
        if (fadeN > 1 && k >= nFrames - fadeN) env = 1 - (k - (nFrames - fadeN)) / (fadeN - 1);
        i = at + k;
        if (i < 0 || i >= total) continue;
        g = n.gain * env;
        L[i] += audio[k * 2] * g;
        R[i] += audio[k * 2 + 1] * g;
      }
    });
    var peak = 0, i, a, b;
    for (i = 0; i < total; i++) {
      a = L[i] < 0 ? -L[i] : L[i];
      b = R[i] < 0 ? -R[i] : R[i];
      if (a > peak) peak = a;
      if (b > peak) peak = b;
    }
    var norm = peak > 0 ? Math.pow(10, -1 / 20) / peak : 1;
    var nz = 0;
    for (i = 0; i < total; i++) {
      L[i] *= norm; R[i] *= norm;
      a = L[i] < 0 ? -L[i] : L[i];
      b = R[i] < 0 ? -R[i] : R[i];
      if (a > 1e-5 || b > 1e-5) nz = i + 1;
    }
    var cut = Math.max(Math.round((cursor + 0.2) * sr), nz);
    if (cut > total) cut = total;
    return {
      left: L.slice(0, cut), right: R.slice(0, cut), rate: sr,
      messages: planned.messages, hints: planned.hints,
      peak: peak > 0 ? Math.pow(10, -1 / 20) : 0
    };
  }

  function guitarCheck() {
    var beat = 60 / 96, pair = [['Em7', [64, 67, 71, 74]], ['A', [57, 61, 64]]], out = [], i;
    for (i = 0; i < 4; i++) {
      pair.forEach(function (p, k) {
        out.push({symbol: p[0], written: p[1].slice(), start: (i * 2 + k) * 4 * beat, hold: 4 * beat, origin: 'chord'});
      });
    }
    return {bpm: 96, spread: 0.018, line: '[Em7 A]x4', events: out};
  }

  function $(id) { return document.getElementById(id); }
  function flag() {
    try {
      var q = new URLSearchParams(location.search).get('sampler');
      if (q === '1' || q === 'true') { localStorage.setItem('nc.sampler', '1'); return true; }
      if (q === '0' || q === 'off') { localStorage.removeItem('nc.sampler'); return false; }
      return localStorage.getItem('nc.sampler') === '1';
    } catch (e) { return false; }
  }
  function withSlash(href) { return /\/$/.test(href) ? href : href + '/'; }
  function base() {
    if (configured) return withSlash(configured);
    try {
      var q = new URLSearchParams(location.search).get('notes');
      if (q) return withSlash(new URL(q, location.href).href);
    } catch (e) {}
    return API_NOTES;
  }
  function noteUrl(slug, midi) { return base() + slug + '/' + midi + '.opus'; }
  function manifestUrl(slug) { return base() + slug + '/manifest.json'; }
  function compText() { var el = $('comp'); return el ? el.value || '' : ''; }
  function selectedOption() {
    var sel = $('inst');
    if (!sel || sel.selectedIndex < 0) return null;
    return sel.options[sel.selectedIndex] || null;
  }
  function selectedSlug() {
    var opt = selectedOption();
    if (!opt || opt.dataset.sampler !== '1') return '';
    return opt.dataset.slug || opt.value || '';
  }
  function active() { return flag() && !!manifests[selectedSlug()]; }
  function libraryRow(slug) {
    for (var i = 0; i < LIBRARY.length; i++) if (LIBRARY[i].slug === slug) return LIBRARY[i];
    return null;
  }
  function defaultSpreadMs(slug) {
    var row = libraryRow(slug || selectedSlug());
    return row ? Math.round(row.spread * 1000) : 0;
  }
  function strumSeconds() {
    var el = $('sampler-strum');
    var ms = el ? +el.value : defaultSpreadMs();
    if (!(ms >= 0)) ms = defaultSpreadMs();
    return ms / 1000;
  }
  function outputGain() {
    var el = $('sampler-level');
    var v = el ? +el.value : 80;
    if (!(v >= 0)) v = 80;
    return v / 100;
  }
  function speedOf() {
    var el = $('spd');
    var v = el ? +el.value : 1;
    return v > 0 ? v : 1;
  }
  function lineBundle(text, bpm) {
    var events = [], arpLabel = '';
    if (!root.NCSynth || !root.NCSynth.readLine) return {events: events, arpLabel: ''};
    var line = root.NCSynth.readLine(text || '');
    if (!line) return {events: events, arpLabel: ''};
    var beat = 60 / (bpm || line.bpm || 96);
    if (line.notes && line.notes.length && !line.instrument) {
      var t = 0;
      line.notes.forEach(function (n) {
        var midi = root.NCSynth.midiOf(n.pitch);
        var hold = Math.max(0.02, n.beats * beat);
        if (midi != null) events.push({symbol: 'n ' + n.pitch, written: [midi], start: t, hold: hold, origin: 'notes'});
        t += hold;
      });
    }
    if (line.arp && !line.arpInstrument) {
      arpLabel = root.NCSynth.arpWords(line.arp);
      var scheduled = root.NCSynth.scheduleLine({
        notes: [], arp: line.arp, bpm: bpm || line.bpm, meter: line.meter, harmony: line.harmony
      }, null, 1);
      (scheduled || []).forEach(function (n) {
        if (n.midi == null) return;
        events.push({symbol: line.arp.chord || 'arp', written: [n.midi], start: n.start, hold: n.length, origin: 'arp'});
      });
    }
    return {events: events, arpLabel: arpLabel};
  }
  function hasSamplerLine() {
    var bundle = lineBundle(compText(), 0);
    return bundle.events.length > 0;
  }
  function pieceEvents(from, speed) {
    var text = compText();
    var parsed = root.NC && root.NC.read ? root.NC.read() : null;
    var tl = null;
    try { tl = root.NC && root.NC.timeline ? root.NC.timeline() : null; } catch (e) { tl = null; }
    var bpm = parsed && parsed.bpm > 0 ? parsed.bpm : 96;
    var events = [];
    var baseT = 0;
    from = from || 0;
    speed = speed > 0 ? speed : 1;
    if (tl && tl.chords && tl.chords.length) {
      if (from > tl.chords.length - 1) from = 0;
      baseT = tl.chords[from] && tl.chords[from].t ? tl.chords[from].t : 0;
      tl.chords.forEach(function (c, i) {
        if (i < from) return;
        var hold = c.slot != null ? c.slot : c.dur;
        if (!(hold > 0)) hold = 1;
        events.push({
          symbol: c.symbol, written: (c.voicing || []).slice(),
          start: ((c.t || 0) - baseT) / speed, hold: hold / speed,
          origin: 'chord', index: i
        });
      });
    }
    lineBundle(text, bpm).events.forEach(function (ev) {
      if (ev.start < baseT - 1e-6) return;
      events.push({
        symbol: ev.symbol, written: ev.written.slice(),
        start: (ev.start - baseT) / speed, hold: ev.hold / speed,
        origin: ev.origin
      });
    });
    return events;
  }
  function linesFor(parsed, tl) {
    chordUse = {};
    if (!active()) { lastLines = ''; return ''; }
    var man = manifests[selectedSlug()];
    var events = [];
    if (tl && tl.chords) {
      tl.chords.forEach(function (c, i) {
        (c.voicing || []).forEach(function (m) { chordUse[+m] = 1; });
        events.push({symbol: c.symbol, written: (c.voicing || []).slice(), start: 0, hold: 1, origin: 'chord', index: i});
      });
    }
    var bpm = parsed && parsed.bpm > 0 ? parsed.bpm : 96;
    lineBundle(compText(), bpm).events.forEach(function (ev) { events.push(ev); });
    var planned = plan(man, events, 0, FADE_S);
    lastLines = planned.messages.concat(planned.hints).join('\n');
    var keys = $('sampler-keys');
    if (keys && man) drawKeys(keys, man);
    return lastLines;
  }
  function canPlay() {
    if (!active()) return false;
    try { if (root.NC && root.NC.timeline && root.NC.timeline()) return true; } catch (e) {}
    return hasSamplerLine();
  }
  function neededMidis() {
    if (!active()) return [];
    var planned = plan(manifests[selectedSlug()], pieceEvents(0, 1), strumSeconds(), FADE_S);
    var seen = {}, list = [];
    planned.notes.forEach(function (n) { if (!seen[n.midi]) { seen[n.midi] = 1; list.push(n.midi); } });
    return list;
  }
  function audioCtx() {
    if (root.NC && NC.audio) {
      try {
        var shared = NC.audio();
        if (shared) { sac = shared; return sac; }
      } catch (e) {}
    }
    if (sac && sac.state !== 'closed') return sac;
    var AC = root.AudioContext || root.webkitAudioContext;
    try { sac = new AC({ latencyHint: 'interactive' }); }
    catch (e2) { sac = new AC(); }
    return sac;
  }
  function loadNotes(slug, midis, progress, ctx) {
    ctx = ctx || audioCtx();
    var pending = [], done = 0;
    midis.forEach(function (m) {
      var hit = cache[slug + ':' + m];
      if (hit && hit.buffer && hit.ctx === ctx) done++;
      else pending.push(m);
    });
    if (progress) progress(done, midis.length);
    return Promise.all(pending.map(function (midi) {
      var key = slug + ':' + midi;
      var hit = cache[key];
      var bytesP = hit && hit.bytes ? Promise.resolve(hit.bytes) : fetch(noteUrl(slug, midi)).then(function (r) {
        if (!r.ok) throw new Error(noteName(midi) + ' did not load.');
        return r.arrayBuffer();
      });
      return bytesP.then(function (bytes) {
        return ctx.decodeAudioData(bytes.slice(0)).then(function (buffer) {
          cache[key] = { bytes: bytes, buffer: buffer, ctx: ctx };
          done++;
          if (progress) progress(done, midis.length);
        });
      });
    })).then(function () {
      var out = {};
      midis.forEach(function (m) { out[m] = cache[slug + ':' + m]; });
      return out;
    });
  }
  function halt() {
    timers.splice(0).forEach(function (t) { clearTimeout(t); });
    sources.splice(0).forEach(function (s) { try { s.stop(); } catch (e) {} });
  }
  function schedule(ctx, dest, planned, buffers, output, lead, record, origin) {
    var master = ctx.createGain();
    master.gain.value = output == null ? 0.8 : output;
    master.connect(dest);
    var t0 = origin != null ? origin : ctx.currentTime + (lead || 0);
    var end = 0, seen = {};
    planned.notes.forEach(function (n) {
      var buffer = buffers[n.midi];
      if (!buffer) return;
      var keep = n.keep;
      var dur = Math.min(buffer.duration, keep);
      if (!(dur > 0.001)) return;
      var src = ctx.createBufferSource();
      src.buffer = buffer;
      var g = ctx.createGain();
      var t = t0 + n.start;
      g.gain.setValueAtTime(n.gain, t);
      if (n.fade > 0 && buffer.duration + 1e-4 >= keep) {
        var fade = Math.min(n.fade, dur);
        if (fade > 1 / 48000 && dur - fade > 0) {
          g.gain.setValueAtTime(n.gain, t + (dur - fade));
          g.gain.linearRampToValueAtTime(0, t + dur);
        }
      }
      src.connect(g);
      g.connect(master);
      src.start(t, 0, dur);
      if (record !== false) sources.push(src);
      if (n.start + dur > end) end = n.start + dur;
      if (record !== false && n.origin === 'chord' && n.index != null && !seen[n.index]) {
        seen[n.index] = 1;
        var at = n.start;
        timers.push(setTimeout(function () {
          document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
          var chip = $('ch' + n.index);
          if (chip) chip.classList.add('on');
        }, Math.max(0, (t - ctx.currentTime) * 1000)));
      }
    });
    return end;
  }
  function play(opts) {
    opts = opts || {};
    halt();
    var live = opts.live || function () { return true; };
    var slug = selectedSlug();
    var man = manifests[slug];
    if (!man) {
      if (opts.status) opts.status('No note manifest.', true);
      if (opts.done) opts.done();
      return;
    }
    var speed = speedOf();
    var from = opts.from || 0;
    var events = pieceEvents(from, speed);
    if (root.NCArrange && NCArrange.clip) {
      var origin = 0;
      var first = NCArrange.clip('chords', from);
      if (first) origin = first.at;
      var noteTrack = NCArrange.clip('sampler', 0) ? 'sampler' : (NCArrange.clip('synth', 0) ? 'synth' : '');
      var noteI = 0;
      events = events.map(function (ev) {
        if (ev.origin === 'chord' && ev.index != null) {
          var placed = NCArrange.clip('chords', ev.index);
          if (!placed) return ev;
          return Object.assign({}, ev, { start: Math.max(0, (placed.at - origin) / speed), hold: placed.len / speed });
        }
        if (from === 0 && ev.origin === 'notes' && noteTrack) {
          var note = NCArrange.clip(noteTrack, noteI++);
          if (!note) return ev;
          return Object.assign({}, ev, { start: Math.max(0, note.at / speed), hold: note.len / speed });
        }
        return ev;
      });
    }
    var planned = plan(man, events, strumSeconds(), FADE_S);
    var midis = [], seen = {};
    planned.notes.forEach(function (n) { if (!seen[n.midi]) { seen[n.midi] = 1; midis.push(n.midi); } });
    if (!midis.length) {
      var empty = planned.messages.concat(planned.hints).join(' ') || 'This instrument has none of those notes.';
      if (opts.status) opts.status(empty, true);
      if (opts.done) opts.done();
      return;
    }
    loadNotes(slug, midis, function (loaded, total) {
      if (!live()) return;
      if (opts.status) opts.status('Loading notes… ' + loaded + ' / ' + total);
      paintLoaded(midis);
    }).then(function (bag) {
      if (!live()) return;
      var ctx = audioCtx();
      if (ctx.resume) ctx.resume();
      var buffers = {};
      midis.forEach(function (m) { buffers[m] = bag[m].buffer; });
      var notes = planned.notes.slice().sort(function (a, b) { return a.start - b.start || a.midi - b.midi; });
      var t0 = ctx.currentTime + 0.05;
      var next = 0;
      function pump() {
        if (!live()) return;
        var until = ctx.currentTime + 0.12 - t0;
        var due = [];
        while (next < notes.length && notes[next].start <= until + 1e-6) due.push(notes[next++]);
        if (due.length) schedule(ctx, ctx.destination, { notes: due }, buffers, outputGain(), 0, true, t0);
        if (next < notes.length && live()) timers.push(setTimeout(pump, 25));
      }
      pump();
      var end = 0;
      notes.forEach(function (n) { var e = n.start + n.keep; if (e > end) end = e; });
      if (root.NCArrange && NCArrange.armPlay) NCArrange.armPlay(ctx, t0, origin, speed, end);
      var msg = planned.messages.concat(planned.hints).join(' ');
      if (opts.status) opts.status(msg);
      paintLoaded(midis);
      timers.push(setTimeout(function () { if (live() && opts.done) opts.done(); }, (end + 0.05 + 0.35) * 1000));
    }).catch(function (err) {
      if (!live()) return;
      if (opts.status) opts.status(err && err.message ? err.message : 'The notes did not load.', true);
      if (opts.done) opts.done();
    });
  }
  function collect(opts) {
    opts = opts || {};
    var slug = selectedSlug();
    var man = manifests[slug];
    if (!man) return Promise.reject(new Error('No note manifest.'));
    var events = pieceEvents(0, 1);
    var planned = plan(man, events, strumSeconds(), FADE_S);
    var midis = [], seen = {};
    planned.notes.forEach(function (n) { if (!seen[n.midi]) { seen[n.midi] = 1; midis.push(n.midi); } });
    if (!midis.length) {
      return Promise.reject(new Error(planned.messages.join(' ') || 'This instrument has none of those notes.'));
    }
    return loadNotes(slug, midis, opts.progress).then(function (bag) {
      var end = 0.1;
      planned.notes.forEach(function (n) { var e = n.start + n.keep; if (e > end) end = e; });
      var sr = 48000;
      var off = new OfflineAudioContext(2, Math.ceil((end + 0.05) * sr), sr);
      var buffers = {};
      midis.forEach(function (m) { buffers[m] = bag[m].buffer; });
      schedule(off, off.destination, planned, buffers, outputGain(), 0, false);
      return off.startRendering().then(function (buffer) {
        var bytes = 0;
        midis.forEach(function (m) { bytes += bag[m].bytes.byteLength; });
        var blob = root.NCSynth && root.NCSynth.wavBlob ? root.NCSynth.wavBlob(buffer) : null;
        var url = '';
        try { if (blob) url = URL.createObjectURL(blob); } catch (e) {}
        var line = credit();
        return {
          messages: planned.messages.concat(planned.hints),
          sound: {
            kind: 'nc-sampler', local: true, slot: -1,
            symbol: man.instrument || slug,
            title: line,
            supplier: man.author || '',
            license: man.license_out || 'CC-BY-SA-4.0',
            url: url, buffer: buffer,
            gather_id: 'nc-sampler', clip_id: 'nc-sampler:' + slug,
            duration_s: buffer.duration, start_s: 0, gain_db: 0,
            credit: line,
            detail: midis.length + ' notes · ' + sizeText(bytes)
          }
        };
      });
    });
  }
  function sizeText(n) {
    if (!(n > 0)) return '0 B';
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }
  function signedDb(n) {
    if (Math.abs(n) < 0.05) return '0.0';
    var v = (Math.round(n * 10) / 10).toFixed(1);
    return (n > 0 ? '+' : '') + v;
  }
  function normText(man) {
    if (!man) return '±3 dB toward the median';
    var gains = levelGains(man.notes || {}), ds = [];
    Object.keys(gains).forEach(function (k) { ds.push(20 * Math.log10(gains[k] || 1)); });
    if (!ds.length) return '±3 dB toward the median';
    var lo = Math.min.apply(null, ds), hi = Math.max.apply(null, ds);
    return signedDb(lo) + ' to ' + signedDb(hi) + ' dB, max ±3';
  }
  function credit() {
    var man = manifests[selectedSlug()];
    if (!man) return '';
    return creditLine(man.author, man.page, man.license_out);
  }
  function rangeOf(man) {
    var keys = Object.keys(man.notes || {}).map(function (k) { return +k; });
    var lo = man.range && man.range.lo != null ? man.range.lo : Math.min.apply(null, keys);
    var hi = man.range && man.range.hi != null ? man.range.hi : Math.max.apply(null, keys);
    return {lo: lo, hi: hi};
  }
  function drawKeys(host, man) {
    host.textContent = '';
    if (!man || !man.notes) return;
    var range = rangeOf(man), have = haveMap(man.notes), whites = [], m;
    for (m = range.lo; m <= range.hi; m++) if (!BLACK[m % 12]) whites.push(m);
    if (!whites.length) return;
    var w = 100 / whites.length, index = {};
    whites.forEach(function (midi, i) {
      index[midi] = i;
      var key = document.createElement('span');
      key.className = 'nc-key white';
      key.style.left = (i * w) + '%';
      key.style.width = w + '%';
      key.setAttribute('data-on', have[midi] ? '1' : '0');
      if (have[midi] && chordUse[midi]) key.setAttribute('data-use', '1');
      key.title = noteName(midi);
      host.appendChild(key);
    });
    for (m = range.lo; m <= range.hi; m++) {
      if (!BLACK[m % 12]) continue;
      var prev = m - 1;
      while (prev >= range.lo && !Object.prototype.hasOwnProperty.call(index, prev)) prev--;
      if (!Object.prototype.hasOwnProperty.call(index, prev)) continue;
      var key = document.createElement('span');
      key.className = 'nc-key black';
      var width = w * 0.62;
      key.style.width = width + '%';
      key.style.left = ((index[prev] + 1) * w - width / 2) + '%';
      key.setAttribute('data-on', have[m] ? '1' : '0');
      if (have[m] && chordUse[m]) key.setAttribute('data-use', '1');
      key.title = noteName(m);
      host.appendChild(key);
    }
  }
  function paintLoaded(midis) {
    var el = $('sampler-loaded');
    if (!el) return;
    var slug = selectedSlug(), n = 0, bytes = 0;
    (midis || []).forEach(function (m) {
      var hit = cache[slug + ':' + m];
      if (!hit) return;
      n++;
      bytes += hit.bytes.byteLength;
    });
    var need = (midis || []).length;
    if (!need) { el.textContent = '0 notes'; return; }
    el.textContent = n < need ? (n + ' / ' + need + ' loaded · ' + sizeText(bytes)) : (n + ' loaded · ' + sizeText(bytes));
    var box = $('sampler');
    if (box) box.setAttribute('data-loaded', n + '/' + need);
  }
  function schedulePrefetch() {
    if (!active()) return;
    var slug = selectedSlug();
    var midis;
    try { midis = neededMidis(); } catch (e) { return; }
    if (root.NCEvents && NCEvents.build && root.NC && NC.read) {
      try {
        NCEvents.build(NC.read()).tracks.forEach(function (tr) {
          if (tr.voice !== 'sampler' || (tr.instrument && tr.instrument !== slug)) return;
          tr.events.forEach(function (ev) {
            if (ev.midi != null && midis.indexOf(ev.midi) < 0) midis.push(ev.midi);
          });
        });
      } catch (e2) {}
    }
    paintLoaded(midis);
    var token = ++prefetchToken;
    if (!midis.length) return;
    loadNotes(slug, midis, function () {
      if (token !== prefetchToken) return;
      paintLoaded(midis);
    }).catch(function () {});
  }
  function rememberCopy() {
    var note = $('instnote'), lead = $('gather-lead');
    if (note && savedCopy.note == null) savedCopy.note = note.textContent;
    if (lead && savedCopy.lead == null) savedCopy.lead = lead.textContent;
  }
  function paint() {
    var box = $('sampler');
    if (!box) return;
    rememberCopy();
    var on = flag();
    box.hidden = !on;
    if (document.body) document.body.setAttribute('data-sampler', on ? '1' : '0');
    var slug = selectedSlug();
    var man = manifests[slug] || null;
    var strum = $('sampler-strum');
    if (strum && !strum.dataset.user) {
      strum.value = String(defaultSpreadMs(slug));
      strum.disabled = !man;
    }
    var level = $('sampler-level');
    if (level) level.disabled = !man;
    var sel = $('sampler-inst'), page = $('inst');
    if (sel && page && sel.value !== page.value) sel.value = page.value;
    var creditEl = $('sampler-credit');
    if (man) {
      if (creditEl) creditEl.textContent = credit();
    } else if (page && page.selectedIndex >= 0) {
      var name = page.options[page.selectedIndex].textContent;
      if (creditEl) creditEl.textContent = name ? name + ' from musicmatter.art (Petrus, CC BY-SA 4.0).' : '';
    }
    var keys = $('sampler-keys');
    if (keys) drawKeys(keys, man);
    var norm = $('sampler-norm');
    if (norm) norm.textContent = man ? normText(man) : '±3 dB toward the median';
    var arp = $('sampler-arp');
    if (arp) {
      var bundle = lineBundle(compText(), 0);
      arp.textContent = bundle.arpLabel || '—';
    }
    var ring = $('sampler-ring'), fade = $('sampler-fade'), out = $('sampler-out');
    if (ring) ring.textContent = RING_S + ' s';
    if (fade) fade.textContent = Math.round(FADE_S * 1000) + ' ms';
    if (out && level) out.textContent = level.value;
    var strumRead = $('sampler-strum-read');
    if (strumRead && strum) strumRead.textContent = man ? (strum.value + ' ms') : '—';
    var note = $('instnote'), lead = $('gather-lead');
    if (note && savedCopy.note != null) note.textContent = man ? 'A note this instrument does not have is left out.' : savedCopy.note;
    if (lead && savedCopy.lead != null) lead.textContent = man ? "Load this instrument's notes." : savedCopy.lead;
    if (man) schedulePrefetch();
    else {
      var loaded = $('sampler-loaded');
      if (loaded) loaded.textContent = (on && manifestsDone) ? 'No note manifest.' : '';
      var boxEmpty = $('sampler');
      if (boxEmpty) boxEmpty.removeAttribute('data-loaded');
    }
  }
  function addOption(slug, name) {
    var page = $('inst');
    if (!page) return;
    var existing = null, i;
    for (i = 0; i < page.options.length; i++) if (page.options[i].value === slug) existing = page.options[i];
    if (!existing) {
      existing = document.createElement('option');
      existing.value = slug;
      existing.textContent = name;
      page.appendChild(existing);
    }
    existing.dataset.sampler = '1';
    existing.dataset.slug = slug;
  }
  function mirrorSelect() {
    var page = $('inst'), sel = $('sampler-inst');
    if (!page || !sel) return;
    var prev = page.value;
    sel.textContent = '';
    Array.prototype.forEach.call(page.options, function (o) {
      var n = document.createElement('option');
      n.value = o.value;
      n.textContent = o.textContent;
      sel.appendChild(n);
    });
    sel.value = prev;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function rangeInput(id, min, max, step, value, disabled) {
    var input = document.createElement('input');
    input.type = 'range';
    input.className = 'nc-range';
    input.id = id;
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);
    if (disabled) input.disabled = true;
    return input;
  }
  function control(label, input, readId) {
    var box = el('div', 'nc-ctl');
    var row = el('div', 'nc-row');
    row.appendChild(el('span', 'nc-label', label));
    var read = el('span', 'nc-mono nc-read', '');
    read.id = readId;
    row.appendChild(read);
    box.appendChild(row);
    if (input) box.appendChild(input);
    return box;
  }
  function buildPanel() {
    var box = $('sampler');
    if (!box || box.dataset.built === '1') return;
    box.dataset.built = '1';
    function module(index, title) {
      var section = el('section', 'nc-module');
      section.setAttribute('data-module', index);
      var heading = el('p', 'nc-label');
      heading.appendChild(el('span', 'nc-mono', index));
      heading.appendChild(document.createTextNode(' ' + title));
      section.appendChild(heading);
      return section;
    }
    var inst = module('01', 'Instrument');
    var sel = document.createElement('select');
    sel.id = 'sampler-inst';
    sel.className = 'nc-select';
    sel.setAttribute('aria-label', 'Instrument');
    inst.appendChild(sel);
    var creditEl = el('p', 'nc-mono nc-credit');
    creditEl.id = 'sampler-credit';
    inst.appendChild(creditEl);
    var notes = module('02', 'Notes');
    var keys = el('div', 'nc-keys');
    keys.id = 'sampler-keys';
    notes.appendChild(keys);
    var loaded = el('p', 'nc-mono nc-read');
    loaded.id = 'sampler-loaded';
    notes.appendChild(loaded);
    var ring = module('03', 'Ring');
    ring.appendChild(control('Ring cap', rangeInput('sampler-ring-range', 0, 8, 0.1, 8, true), 'sampler-ring'));
    ring.appendChild(control('Chord change', rangeInput('sampler-fade-range', 0, 200, 1, 120, true), 'sampler-fade'));
    var level = module('04', 'Level');
    level.appendChild(control('Output', rangeInput('sampler-level', 0, 100, 1, 80, false), 'sampler-out'));
    level.appendChild(control('Level match', null, 'sampler-norm'));
    var strum = module('05', 'Strum');
    strum.appendChild(control('Strum', rangeInput('sampler-strum', 0, 40, 1, 18, false), 'sampler-strum-read'));
    strum.appendChild(control('Arp', null, 'sampler-arp'));
    [inst, notes, ring, level, strum].forEach(function (section) { box.appendChild(section); });
    sel.addEventListener('change', function () {
      var page = $('inst');
      if (page && page.value !== sel.value) {
        page.value = sel.value;
        page.dispatchEvent(new Event('change'));
      }
      var knob = $('sampler-strum');
      if (knob) delete knob.dataset.user;
      paint();
    });
    var page = $('inst');
    if (page) page.addEventListener('change', function () {
      var knob = $('sampler-strum');
      if (knob) delete knob.dataset.user;
      if (sel.value !== page.value) sel.value = page.value;
      paint();
      if (root.NCPerform && root.NCPerform.sync) root.NCPerform.sync();
    });
    var comp = $('comp');
    if (comp) comp.addEventListener('input', function () { paint(); });
    var knob = $('sampler-strum');
    if (knob) knob.addEventListener('input', function () { knob.dataset.user = '1'; paint(); });
    var levelInput = $('sampler-level');
    if (levelInput) levelInput.addEventListener('input', paint);
  }
  function settle() {
    if (!manifestsDone || !flag()) return;
    try {
      if (document.body && document.body.getAttribute('data-ready') === '1' && root.NC && root.NC.timeline) root.NC.timeline();
    } catch (e) {}
    paint();
    if (root.NCPerform && root.NCPerform.sync) root.NCPerform.sync();
  }
  function boot() {
    if (!document.body) return;
    buildPanel();
    if (!flag()) {
      var box = $('sampler');
      if (box) box.hidden = true;
      document.body.setAttribute('data-sampler', '0');
      return;
    }
    document.body.setAttribute('data-sampler', '1');
    var boxOn = $('sampler');
    if (boxOn) boxOn.hidden = false;
    mirrorSelect();
    paint();
    if (booted) { applyOptions(); settle(); return; }
    booted = true;
    if (window.MutationObserver && document.body) {
      new MutationObserver(settle).observe(document.body, {attributes: true, attributeFilter: ['data-ready']});
    }
    Promise.all(LIBRARY.map(function (row) {
      return fetch(manifestUrl(row.slug)).then(function (r) {
        if (!r.ok) return null;
        return r.json();
      }).then(function (man) {
        if (!man || man.format !== 'nc-sampler/1' || !man.notes) return;
        manifests[row.slug] = man;
        addOption(row.slug, row.name);
      }).catch(function () {});
    })).then(function () {
      manifestsDone = true;
      var box = $('sampler');
      if (box) box.setAttribute('data-sampler-ready', '1');
      applyOptions();
      settle();
    });
  }
  function applyOptions() {
    LIBRARY.forEach(function (row) {
      if (manifests[row.slug]) addOption(row.slug, row.name);
    });
    mirrorSelect();
  }

  root.NCSampler = {
    noteName: noteName, joinNames: joinNames, selectWritten: selectWritten, plainMissing: plainMissing,
    levelGains: levelGains, creditLine: creditLine, syntaxHint: syntaxHint, plan: plan, mix: mix,
    guitarCheck: guitarCheck, noteUrl: noteUrl, manifestUrl: manifestUrl,
    flag: flag, active: active, canPlay: canPlay, linesFor: linesFor, credit: credit,
    play: play, halt: halt, collect: collect, boot: boot, paint: paint,
    slug: function () { return selectedSlug(); },
    manifest: function (slug) { return manifests[slug || selectedSlug()] || null; },
    prepare: function (ctx, slug, midis) { return loadNotes(slug || selectedSlug(), midis || [], null, ctx || audioCtx()); },
    output: outputGain,
    strum: strumSeconds,
    configure: function (opts) { if (opts && opts.base) configured = opts.base; },
    base: base
  };
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(typeof window !== 'undefined' ? window : globalThis);
