// Chord recordings from the live musicmatter index (https://musicmatter.art/netcomposer.json).
// Lookup key: instrument + root (pitch class) + quality. The picker lists instrument_name.
// Play uses that instrument's default voicing (gesture bounce). A missing chord uses an alt
// voicing of the same instrument, then the piano recording, then a simple tone.
// A written slash bass uses an alt voicing whose bass matches; otherwise piano, then a tone.
// Files are the published recordings on audio.musicmatter.art. No pitch-shift and no time-stretch.
(function () {
  'use strict';
  var INDEX = 'https://musicmatter.art/netcomposer.json';
  var AUDIO = 'https://audio.musicmatter.art/fullchords/';
  var INST_DIR = {syntharp: 1, jacobschoir: 1, fatsynth: 1};
  var ORDER = {piano: 0, syntharp: 1, jacobschoir: 2, fatsynth: 3};
  var PC = {c: 0, 'c#': 1, csharp: 1, db: 1, d: 2, 'd#': 3, dsharp: 3, eb: 3, e: 4, f: 5, 'f#': 6, fsharp: 6, gb: 6,
    g: 7, 'g#': 8, gsharp: 8, ab: 8, a: 9, 'a#': 10, asharp: 10, bb: 10, b: 11};
  var QUAL_ALIAS = {maj: '', major: '', min: 'm', minor: 'm'};
  var indexP = null, choice = {}, rawCache = {}, decCache = typeof WeakMap === 'function' ? new WeakMap() : null, decFallback = [];

  function pcOf(name) {
    var k = String(name || '').trim().toLowerCase().replace(/♯/g, '#').replace(/♭/g, 'b');
    return (k in PC) ? PC[k] : null;
  }
  function normQual(q) {
    q = String(q == null ? '' : q).trim();
    return (q in QUAL_ALIAS) ? QUAL_ALIAS[q] : q;
  }
  function splitSym(sym) {
    var m = /^([A-G](?:#|b)?)(.*)$/.exec(sym || '');
    if (!m) return null;
    var pc = pcOf(m[1]);
    if (pc === null) return null;
    return {pc: pc, quality: m[2]};
  }
  function suffixOf(url) {
    var p = String(url || '').split('?')[0].split('/fullchords/')[1];
    if (!p) return null;
    var parts = p.split('/');
    if (INST_DIR[parts[0]]) parts = parts.slice(1);
    return parts.join('/');
  }
  function chordPath(url) {
    var suf = suffixOf(url);
    return suf ? suf.replace(/\.flac$/i, '') : null;
  }
  function explicit(off) {
    if (off.chord) {
      var s = splitSym(off.chord);
      if (!s) return null;
      return {pc: s.pc, quality: s.quality, gesture: off.gesture || 'bounce', take: +off.take || 0};
    }
    if (off.root == null || off.quality == null) return null;
    var pc = pcOf(off.root), q = normQual(off.quality);
    if (pc === null) return null;
    return {pc: pc, quality: q, gesture: off.gesture || 'bounce', take: +off.take || 0};
  }
  function instrumentOf(off) {
    var id = typeof off.instrument === 'string' ? off.instrument.trim() : '';
    if (!id) return null;
    var named = typeof off.instrument_name === 'string' && off.instrument_name.trim();
    return {id: id, name: named ? off.instrument_name.trim() : id};
  }
  function addTake(instruments, inst, described, off) {
    var bag = instruments[inst.id] || (instruments[inst.id] = {id: inst.id, name: inst.name, groups: {}});
    if (inst.name && bag.name !== inst.name) bag.name = inst.name;
    var key = described.pc + '|' + described.quality;
    var g = bag.groups[key] || (bag.groups[key] = {});
    (g[described.gesture] = g[described.gesture] || []).push({
      url: off.audio, manifest: off.manifest || null, gesture: described.gesture, take: described.take, path: chordPath(off.audio)
    });
  }
  function finish(instruments, credit) {
    Object.keys(instruments).forEach(function (id) {
      var chords = {}, alts = {};
      Object.keys(instruments[id].groups).forEach(function (key) {
        var byG = instruments[id].groups[key];
        var names = Object.keys(byG).filter(function (g) { return g !== 'alt'; });
        if (names.length) chords[key] = byG[names[0]].slice().sort(function (a, b) { return a.take - b.take; });
        if (byG.alt) alts[key] = byG.alt.slice().sort(function (a, b) { return a.take - b.take; });
      });
      instruments[id].chords = chords;
      instruments[id].alts = alts;
      delete instruments[id].groups;
    });
    return {credit: credit, instruments: instruments, defaultId: instruments.piano ? 'piano' : (Object.keys(instruments)[0] || null)};
  }
  function ingest(data) {
    var instruments = {}, meta = {}, credit = {
      name: (data.creator && data.creator.name) || 'Petrus',
      link: (data.creator && data.creator.link) || 'https://musicmatter.art/',
      license: data.default_license || 'CC-BY-SA-4.0'
    };
    (data.offerings || []).forEach(function (off) {
      if (!off || !off.audio || off.instrument !== 'syntharp') return;
      var described = explicit(off), suf = suffixOf(off.audio);
      if (described && suf && !meta[suf]) meta[suf] = described;
    });
    (data.offerings || []).forEach(function (off) {
      if (!off || !off.audio || off.audio.indexOf('/fullchords/') < 0) return;
      var inst = instrumentOf(off), described = explicit(off);
      if (!inst) {
        if (off.collection !== 'full-chord-set-v4') return;
        described = meta[suffixOf(off.audio)];
        if (!described) return;
        inst = {id: 'piano', name: 'Piano'};
      }
      if (!described) return;
      addTake(instruments, inst, described, off);
    });
    return finish(instruments, credit);
  }
  function loadIndex() {
    if (indexP) return indexP;
    indexP = fetch(INDEX, {mode: 'cors'}).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(ingest, function (e) { indexP = null; throw e; });
    return indexP;
  }
  function noteMidi(n) {
    var m = /^([A-G])(#|b)?(-?\d+)$/.exec(n || '');
    if (!m) return null;
    var pc = pcOf(m[1] + (m[2] || ''));
    if (pc === null) return null;
    return (+m[3] + 1) * 12 + pc;
  }
  function readManifest(url) {
    if (!url) return Promise.resolve(null);
    return fetch(url, {mode: 'cors'}).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }
  function hitOf(c, man, credit) {
    var who = (man && man.creator) || {};
    return {url: c.url, manifest: c.manifest, gesture: c.gesture, take: c.take, path: c.path,
      inversion: man && man.register && man.register.inversion || null, rootNote: man && man.register && man.register.root || null,
      creator: who.name || credit.name, link: who.link || credit.link, license: (man && man.license) || credit.license};
  }
  function pick(list, credit) {
    if (list.length === 1) return Promise.resolve(hitOf(list[0], null, credit));
    return Promise.all(list.map(function (c) { return readManifest(c.manifest); })).then(function (mans) {
      var roots = [];
      mans.forEach(function (man, i) {
        var reg = man && man.register;
        if (!reg || reg.inversion !== 'root') return;
        var midi = noteMidi(reg.root);
        roots.push({c: list[i], man: man, dist: midi === null ? 99 : Math.abs(midi - 60)});
      });
      var hit = roots.sort(function (a, b) { return a.dist - b.dist || a.c.take - b.c.take; })[0];
      if (!hit) hit = {c: list[0], man: mans[0] || null};
      return hitOf(hit.c, hit.man, credit);
    });
  }
  function bassOf(chordCat, symbol, path) {
    var rows = chordCat && chordCat.chords && chordCat.chords[symbol];
    if (!rows || !path) return null;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i][0] !== path) continue;
      var notes = rows[i][1];
      return notes && notes.length ? Math.min.apply(null, notes) % 12 : null;
    }
    return null;
  }
  function bestAlt(list) {
    var roots = list.filter(function (c) { return (c.path || '').indexOf('_root') >= 0 && (c.path || '').indexOf('inv') < 0; });
    var pool = roots.length ? roots : list;
    return pool.slice().sort(function (a, b) { return a.take - b.take; })[0];
  }
  function stamp(hit, inst, role) {
    hit.instrument = inst.id;
    hit.instrumentName = inst.name;
    hit.role = role;
    hit.fallback = role === 'alt' ? 'alt' : (role === 'piano' ? 'piano' : null);
    return hit;
  }
  function resolve(symbol, bass, instrumentId, opts) {
    opts = opts || {};
    return loadIndex().then(function (cat) {
      var s = splitSym(symbol);
      var id = instrumentId && cat.instruments[instrumentId] ? instrumentId : cat.defaultId;
      if (!s || !id) return null;
      var inst = cat.instruments[id], key = s.pc + '|' + s.quality, slash = bass !== null && bass !== undefined && bass !== s.pc;
      var alts = (inst.alts && inst.alts[key]) || [];
      if (slash || opts.altOnly) {
        if (slash && !opts.altOnly) {
          var matched = alts.filter(function (c) { return bassOf(opts.catalog, symbol, c.path) === bass; });
          if (!matched.length) return null;
          var exact = opts.path && matched.filter(function (c) { return c.path === opts.path; })[0];
          return stamp(Object.assign({}, exact || matched[0]), inst, 'alt');
        }
        if (!alts.length) return null;
        return stamp(Object.assign({}, bestAlt(alts)), inst, 'alt');
      }
      var list = inst.chords && inst.chords[key];
      if (list && list.length) {
        var ck = id + '|' + key;
        if (!choice[ck]) choice[ck] = pick(list, cat.credit);
        return choice[ck].then(function (hit) { return stamp(Object.assign({}, hit), inst, 'bounce'); });
      }
      if (!alts.length) return null;
      return stamp(Object.assign({}, bestAlt(alts)), inst, 'alt');
    });
  }
  function raw(url) {
    if (!rawCache[url]) {
      rawCache[url] = fetch(url, {mode: 'cors'}).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      }, function (e) { delete rawCache[url]; throw e; });
    }
    return rawCache[url];
  }
  function decoded(ac) {
    if (decCache) {
      var m = decCache.get(ac);
      if (!m) { m = {}; decCache.set(ac, m); }
      return m;
    }
    var i, slot = null;
    for (i = 0; i < decFallback.length; i++) if (decFallback[i].ac === ac) slot = decFallback[i];
    if (!slot) { slot = {ac: ac, map: {}}; decFallback.push(slot); }
    return slot.map;
  }
  function decode(ac, url) {
    var m = decoded(ac);
    if (!m[url]) {
      m[url] = raw(url).then(function (buf) {
        return new Promise(function (ok, no) { ac.decodeAudioData(buf.slice(0), ok, function () { delete m[url]; no(new Error('decode')); }); });
      }, function (e) { delete m[url]; throw e; });
    }
    return m[url];
  }
  function clipOf(buffer, chord, hit) {
    return {buffer: buffer, kind: hit.fallback === 'piano' ? 'piano' : 'instrument', library: hit.instrumentName || hit.instrument,
      symbol: chord.symbol, bass: chord.bass, url: hit.url, creator: hit.creator || 'Petrus', link: hit.link || 'https://musicmatter.art/',
      license: hit.license || 'CC-BY-SA-4.0', instrument: hit.instrument, instrumentName: hit.instrumentName,
      inversion: hit.inversion || null, fallback: hit.fallback || null, role: hit.role || null};
  }
  function sineClip(chord, why) {
    return {buffer: null, kind: 'sine', fallback: 'sine', why: why || 'missing', symbol: chord.symbol, bass: chord.bass};
  }
  function playHit(ac, chord, hit) {
    return decode(ac, hit.url).then(function (buffer) { return clipOf(buffer, chord, hit); });
  }
  function catalogPiano(ac, chord, why, asFallback) {
    if (!chord.path) return Promise.resolve(sineClip(chord, why));
    var url = AUDIO + chord.path + '.flac';
    return decode(ac, url).then(function (buffer) {
      return {buffer: buffer, kind: 'piano', library: 'Piano', fallback: asFallback ? 'piano' : null, why: why, symbol: chord.symbol, bass: chord.bass,
        url: url, creator: 'Petrus', link: 'https://musicmatter.art/', license: 'CC-BY-SA-4.0', instrument: 'piano', instrumentName: 'Piano'};
    }, function () { return sineClip(chord, why); });
  }
  function one(ac, chord, chordCat, instrumentId) {
    var id = instrumentId || 'piano';
    var opts = {catalog: chordCat, path: chord.path};
    function pianoThenTone(why) {
      if (id === 'piano') return catalogPiano(ac, chord, why, false);
      return resolve(chord.symbol, chord.bass, 'piano', opts).then(function (hit) {
        if (!hit) return catalogPiano(ac, chord, why, true);
        hit.fallback = 'piano';
        hit.role = 'piano';
        return playHit(ac, chord, hit).catch(function () { return catalogPiano(ac, chord, why, true); });
      }, function () { return catalogPiano(ac, chord, why, true); });
    }
    return resolve(chord.symbol, chord.bass, id, opts).then(function (hit) {
      if (!hit) return pianoThenTone('missing');
      return playHit(ac, chord, hit).catch(function () {
        if (hit.role !== 'bounce') return pianoThenTone('failed');
        return resolve(chord.symbol, chord.bass, id, {catalog: chordCat, path: chord.path, altOnly: true}).then(function (alt) {
          if (!alt) return pianoThenTone('failed');
          return playHit(ac, chord, alt).catch(function () { return pianoThenTone('failed'); });
        });
      });
    }, function () { return pianoThenTone('index'); });
  }
  function prepare(ac, chords, chordCat, instrumentId) {
    return Promise.all(chords.map(function (c) { return one(ac, c, chordCat, instrumentId); }));
  }
  function instruments(cat) {
    return Object.keys(cat.instruments).map(function (id) {
      var inst = cat.instruments[id];
      return {id: id, name: inst.name, chords: Object.keys(inst.chords).length, alts: Object.keys(inst.alts || {}).length, default: id === cat.defaultId};
    }).sort(function (a, b) {
      var ao = a.id in ORDER ? ORDER[a.id] : 50, bo = b.id in ORDER ? ORDER[b.id] : 50;
      return ao - bo || a.name.localeCompare(b.name);
    });
  }
  window.MM = {loadIndex: loadIndex, ingest: ingest, splitSym: splitSym, resolve: resolve, prepare: prepare, instruments: instruments, indexUrl: INDEX};
})();
