// Chord recordings from musicmatter's published index (https://musicmatter.art/netcomposer.json).
// Lookup key: instrument + root (pitch class) + quality. New instruments show up when the index
// names them (an instrument field, or sounds/<instrument>/<file>); this file does not list them.
// No pitch-shift and no time-stretch: a file is used only for its own root and quality.
// The full chord set (fullchords/) stays the piano fallback and is not an instrument here.
(function () {
  'use strict';
  var INDEX = 'https://musicmatter.art/netcomposer.json';
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
  var ROOT_TOK = ['csharp', 'dsharp', 'fsharp', 'gsharp', 'asharp', 'db', 'eb', 'gb', 'ab', 'bb', 'c', 'd', 'e', 'f', 'g', 'a', 'b'];
  function parseFile(url) {
    var base = String(url || '').split('?')[0].split('/').pop().replace(/\.flac$/i, '');
    var m = /^(.*)-(\d+)$/.exec(base);
    if (!m) return null;
    var stem = m[1], take = +m[2], i;
    for (i = 0; i < ROOT_TOK.length; i++) {
      if (stem.indexOf(ROOT_TOK[i]) !== 0) continue;
      var rest = stem.slice(ROOT_TOK[i].length), g = null, q = null, k;
      var known = ['arp-updown', 'bounce'];
      for (k = 0; k < known.length; k++) {
        var suf = '-' + known[k];
        if (rest.length > suf.length && rest.slice(-suf.length) === suf) { q = rest.slice(0, -suf.length); g = known[k]; break; }
      }
      if (g === null) {
        var cut = rest.lastIndexOf('-');
        if (cut <= 0) continue;
        q = rest.slice(0, cut); g = rest.slice(cut + 1);
      }
      if (!q || !g) continue;
      return {pc: pcOf(ROOT_TOK[i]), quality: normQual(q), gesture: g, take: take};
    }
    return null;
  }
  function rank(g) { return g === 'bounce' ? 0 : /arp/i.test(g) ? 2 : 1; }
  function instrumentOf(off, file) {
    var inst = off.instrument || off.instrument_id;
    if (inst && typeof inst === 'object') return {id: String(inst.id || inst.name || 'musicmatter'), name: String(inst.name || inst.id || 'musicmatter')};
    if (typeof inst === 'string' && inst.trim()) return {id: inst.trim(), name: inst.trim()};
    var parts = String(off.audio || '').split('?')[0].replace(/^https?:\/\/[^/]+\//, '').split('/');
    if (parts[0] === 'sounds' && parts.length >= 3 && !parseFile(parts[1])) return {id: parts[1], name: parts[1]};
    return {id: 'musicmatter', name: 'musicmatter.art'};
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
  function ingest(data) {
    var instruments = {}, credit = {
      name: (data.creator && data.creator.name) || 'Petrus',
      link: (data.creator && data.creator.link) || 'https://musicmatter.art/',
      license: data.default_license || 'CC-BY-SA-4.0'
    };
    (data.offerings || []).forEach(function (off) {
      if (!off || !off.audio) return;
      var path = String(off.audio).split('?')[0];
      var described = explicit(off) || ((/\/fullchords\//.test(path) && !(off.instrument || off.chord || off.root)) ? null : parseFile(path));
      if (!described) return;
      if (/\/fullchords\//.test(path) && !(off.instrument || off.chord || off.root)) return;
      var inst = instrumentOf(off, described);
      var bag = instruments[inst.id] || (instruments[inst.id] = {id: inst.id, name: inst.name, groups: {}});
      var key = described.pc + '|' + described.quality;
      var g = bag.groups[key] || (bag.groups[key] = {});
      (g[described.gesture] = g[described.gesture] || []).push({url: off.audio, manifest: off.manifest || null, gesture: described.gesture, take: described.take});
    });
    Object.keys(instruments).forEach(function (id) {
      var chords = {};
      Object.keys(instruments[id].groups).forEach(function (key) {
        var byG = instruments[id].groups[key], names = Object.keys(byG).sort(function (a, b) { return rank(a) - rank(b); });
        chords[key] = byG[names[0]].slice().sort(function (a, b) { return a.take - b.take; });
      });
      instruments[id].chords = chords;
      delete instruments[id].groups;
    });
    var ids = Object.keys(instruments);
    var def = instruments.musicmatter ? 'musicmatter' : ids.slice().sort(function (a, b) {
      return Object.keys(instruments[b].chords).length - Object.keys(instruments[a].chords).length;
    })[0] || null;
    return {credit: credit, instruments: instruments, defaultId: def};
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
  function pick(list, credit) {
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
      var man = hit.man || {}, who = man.creator || {};
      return {url: hit.c.url, manifest: hit.c.manifest, gesture: hit.c.gesture, take: hit.c.take,
        inversion: man.register && man.register.inversion || null, rootNote: man.register && man.register.root || null,
        creator: who.name || credit.name, link: who.link || credit.link, license: man.license || credit.license};
    });
  }
  function resolve(symbol, bass) {
    return loadIndex().then(function (cat) {
      var s = splitSym(symbol);
      if (!s || !cat.defaultId) return null;
      if (bass !== null && bass !== undefined && bass !== s.pc) return null;
      var inst = cat.instruments[cat.defaultId];
      var list = inst && inst.chords[s.pc + '|' + s.quality];
      if (!list || !list.length) return null;
      var ck = cat.defaultId + '|' + s.pc + '|' + s.quality;
      if (!choice[ck]) choice[ck] = pick(list, cat.credit);
      return choice[ck].then(function (hit) { hit.instrument = inst.id; hit.instrumentName = inst.name; return hit; });
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
  function pianoUrl(cat, path) { return cat.audio_base + path + '.flac'; }
  function one(ac, chord, pianoCat) {
    var symbol = chord.symbol;
    return resolve(symbol, chord.bass).then(function (hit) {
      if (!hit) return piano(ac, chord, pianoCat, 'missing');
      return decode(ac, hit.url).then(function (buffer) {
        return {buffer: buffer, kind: 'recording', symbol: symbol, bass: chord.bass, url: hit.url, creator: hit.creator, link: hit.link, license: hit.license, instrument: hit.instrument, inversion: hit.inversion};
      }, function () { return piano(ac, chord, pianoCat, 'failed'); });
    }, function () { return piano(ac, chord, pianoCat, 'index'); });
  }
  function piano(ac, chord, pianoCat, why) {
    var url = pianoUrl(pianoCat, chord.path);
    return decode(ac, url).then(function (buffer) {
      return {buffer: buffer, kind: 'piano', why: why, symbol: chord.symbol, bass: chord.bass, url: url, creator: 'Peter Semmelhack', link: 'https://fullchords.musicmatter.art/', license: 'CC-BY-SA-4.0'};
    }, function () {
      return {buffer: null, kind: 'sine', why: why, symbol: chord.symbol, bass: chord.bass};
    });
  }
  function prepare(ac, chords, pianoCat) {
    return Promise.all(chords.map(function (c) { return one(ac, c, pianoCat); }));
  }
  function instruments(cat) {
    return Object.keys(cat.instruments).map(function (id) {
      var inst = cat.instruments[id];
      return {id: id, name: inst.name, chords: Object.keys(inst.chords).length, default: id === cat.defaultId};
    });
  }
  window.MM = {loadIndex: loadIndex, ingest: ingest, parseFile: parseFile, splitSym: splitSym, resolve: resolve, prepare: prepare, instruments: instruments, indexUrl: INDEX};
})();
