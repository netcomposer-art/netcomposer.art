/* Synth presets for /create/.
 *
 * The shipped bank is create/synth-presets.json. Each preset has its own
 * number. `@synth(44)` loads that number, not the 44th row. A name looks at
 * imports first.
 *
 * Two files are accepted. A saved configuration is named like
 * `44-velvet-comet.json` and is
 * {format: "netcomposer.synth", version: 1, number, name, settings}.
 * A performance preset is {id, number, name, version: 1, settings}.
 * `number` is a positive integer. `id` is the slug, not the number.
 * settings is a SynthSettings object. The vendored synth-audio snapshot
 * validates those fields in mergeSettings (settings.ts, and the page copy in
 * nc-synth.js). This file is the parser: version must be 1, and the settings
 * object is the one mergeSettings accepts. An older file may leave number
 * and name out. A single file then takes both from its filename, and a
 * missing number takes the next free one. A bare settings object, or a list
 * of presets, still imports.
 *
 * Play reads the patch. Gather and Perform do not.
 */
(function (root) {
  'use strict';
  var KEY = 'nc.synthPresets';
  var SOUND = [
    'waveform', 'tuning', 'oscillatorMode', 'oscillatorOctave', 'detune', 'pulseWidth',
    'wavetable', 'position', 'warp', 'unison', 'spread',
    'subEnabled', 'subWaveform', 'subOctave', 'subLevel',
    'filter', 'cutoff', 'resonance',
    'attack', 'decay', 'sustain', 'release', 'level', 'master',
    'lfo1', 'lfo2', 'manual',
    'vcoMods', 'vcfMods', 'vcaMods',
    'fmDepth'
  ];
  var bank = [];
  var imports = [];
  var readyResolve;
  var ready = new Promise(function (resolve) { readyResolve = resolve; });

  // Hyphens, spaces and case are the same name. A hyphen is not a minus
  // and not a break: velvet-comet, Velvet Comet and velvet comet match.
  function norm(s) {
    return String(s || '')
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
      .toLowerCase()
      .replace(/[-\s]+/g, ' ')
      .trim();
  }
  function looksLikeSettings(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
    if (typeof o.waveform === 'string' || typeof o.oscillatorMode === 'string') return true;
    if (typeof o.cutoff === 'number') return true;
    if (Array.isArray(o.vcoMods) || Array.isArray(o.vcfMods) || Array.isArray(o.vcaMods)) return true;
    if (typeof o.filter === 'string' && (typeof o.attack === 'number' || typeof o.release === 'number')) return true;
    return false;
  }
  // A positive integer. Strings, zero, negatives, and fractions are not.
  function wholeNumber(v) {
    if (typeof v === 'number' && isFinite(v) && v >= 1 && Math.floor(v) === v) return v;
    return null;
  }
  // Absent number falls through. A present number that is not a positive
  // integer is refused. `id` is never the number.
  function declaredNumber(raw) {
    if (!raw || !Object.prototype.hasOwnProperty.call(raw, 'number') || raw.number == null) {
      return { ok: true, number: null };
    }
    var n = wholeNumber(raw.number);
    if (n == null) return { ok: false, error: 'Preset number must be a positive integer.' };
    return { ok: true, number: n };
  }
  // `44-velvet-comet.json` → 44 and velvet-comet. `velvet-comet.json` → the
  // name only. The digits are a prefix, with a hyphen, underscore, space, or
  // dot after them. `44velvet.json` is a name, not a number.
  function fromFilename(filename) {
    var base = String(filename || '').split(/[/\\]/).pop().replace(/\.json$/i, '');
    if (!base) return { number: null, name: '' };
    var split = /^(\d+)[-_.\s]+([\s\S]+)$/.exec(base);
    var prefix = split ? wholeNumber(+split[1]) : null;
    if (split && prefix != null && /^\d+$/.test(split[1]) && split[2].trim()) {
      return { number: prefix, name: split[2].trim() };
    }
    if (/^\d+$/.test(base) && wholeNumber(+base) != null) return { number: wholeNumber(+base), name: '' };
    return { number: null, name: base.trim() };
  }
  function presetRecord(raw, name, settings, number) {
    return {
      id: raw.id == null ? '' : String(raw.id),
      number: number,
      name: name,
      version: 1,
      settings: settings,
      movedFrom: null,
      movedName: ''
    };
  }
  function cleanName(raw) {
    return typeof raw.name === 'string' ? raw.name.replace(/\s+/g, ' ').trim() : '';
  }
  // {format, version, number, name, settings}, {id, number, name, version,
  // settings}, or a bare configuration (the settings object alone).
  function parsePerformancePreset(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { ok: false, error: 'A preset is one object, or a list of them.' };
    }
    if (raw.format != null && raw.format !== 'netcomposer.synth') {
      return { ok: false, error: 'That file is not an NC Synth preset.' };
    }
    var declared = declaredNumber(raw);
    if (!declared.ok) return declared;
    if (raw.format === 'netcomposer.synth' && Number(raw.version) !== 1) {
      return { ok: false, error: 'Preset version must be 1.' };
    }
    var name = cleanName(raw);
    if (raw.settings && typeof raw.settings === 'object' && !Array.isArray(raw.settings)) {
      if (raw.version != null && Number(raw.version) !== 1) return { ok: false, error: 'Preset version must be 1.' };
      if (root.NCSynth && NCSynth.mergeSettings) NCSynth.mergeSettings(raw.settings);
      return { ok: true, named: !!name, preset: presetRecord(raw, name, raw.settings, declared.number) };
    }
    if (looksLikeSettings(raw)) {
      if (root.NCSynth && NCSynth.mergeSettings) NCSynth.mergeSettings(raw);
      return { ok: true, named: !!name, preset: presetRecord(raw, name, raw, declared.number) };
    }
    return { ok: false, error: 'That JSON is not an NC Synth preset or configuration.' };
  }
  function loadBank(data) {
    var items = [];
    if (Array.isArray(data)) items = data;
    else if (data && Array.isArray(data.presets)) items = data.presets;
    else if (data) items = [data];
    bank = [];
    var used = {};
    items.forEach(function (item) {
      var parsed = parsePerformancePreset(item);
      if (!parsed.ok) return;
      var preset = parsed.preset;
      if (preset.number == null || used[preset.number]) {
        var n = 1;
        while (used[n]) n++;
        preset.number = n;
      }
      used[preset.number] = 1;
      bank.push(preset);
    });
    return bank;
  }
  function readStore() {
    if (!root.localStorage) return imports;
    try {
      var raw = root.localStorage.getItem(KEY);
      if (!raw) { imports = []; return imports; }
      var data = JSON.parse(raw);
      imports = Array.isArray(data) ? data.filter(function (p) { return p && p.name && p.settings; }) : [];
    } catch (e) { imports = []; }
    ensureStoredNumbers(imports);
    return imports;
  }
  function writeStore(list) {
    imports = list;
    if (!root.localStorage) return;
    root.localStorage.setItem(KEY, JSON.stringify(list));
  }
  // A stored import with no number, or a number the bank already owns,
  // takes the next free number. The result is stable for the same bank.
  function ensureStoredNumbers(list) {
    var used = {};
    bank.forEach(function (p) {
      if (p.number != null) used[p.number] = p.name;
    });
    list.forEach(function (p) {
      if (p.number != null && !used[p.number]) used[p.number] = p.name;
    });
    list.forEach(function (p) {
      var asked = p.number;
      if (asked != null && used[asked] === p.name) return;
      if (asked != null && used[asked] && used[asked] !== p.name) {
        var moved = 1;
        while (used[moved]) moved++;
        p.movedFrom = asked;
        p.movedName = used[asked];
        p.number = moved;
        used[moved] = p.name;
        return;
      }
      var free = 1;
      while (used[free]) free++;
      p.number = free;
      p.movedFrom = null;
      p.movedName = '';
      used[free] = p.name;
    });
  }
  function rows() {
    var out = [];
    bank.forEach(function (p) {
      out.push({ n: p.number, name: p.name, id: p.id || '', settings: p.settings, source: 'bank', movedFrom: null, movedName: '' });
    });
    readStore().forEach(function (p) {
      out.push({
        n: p.number, name: p.name, id: p.id || '', settings: p.settings, source: 'import',
        movedFrom: p.movedFrom || null, movedName: p.movedName || ''
      });
    });
    return out;
  }
  function foundRow(row, text, by) {
    return {
      ref: text, label: text, found: true, n: row.n, name: row.name, id: row.id, by: by,
      movedFrom: row.movedFrom || null, movedName: row.movedName || ''
    };
  }
  function resolve(ref) {
    var text = String(ref || '').replace(/\s+/g, ' ').trim();
    if (!text) return null;
    var list = rows();
    if (/^\d+$/.test(text)) {
      var n = +text;
      var byNum = null;
      list.forEach(function (row) { if (row.n === n) byNum = row; });
      if (!byNum) return { ref: text, label: text, found: false, n: null, name: '', by: 'number', movedFrom: null, movedName: '' };
      return foundRow(byNum, text, 'number');
    }
    var key = norm(text);
    if (!key) return { ref: text, label: text, found: false, n: null, name: '', by: 'name', movedFrom: null, movedName: '' };
    var hit = null;
    list.forEach(function (row) {
      if (hit || row.source !== 'import') return;
      if (norm(row.name) === key) hit = row;
    });
    if (!hit) list.forEach(function (row) {
      if (hit || row.source !== 'bank') return;
      if (norm(row.name) === key) hit = row;
    });
    if (!hit) return { ref: text, label: text, found: false, n: null, name: '', by: 'name', movedFrom: null, movedName: '' };
    return foundRow(hit, text, 'name');
  }
  // The sound only. Notes, chord, tempo and the rest of the line stay with
  // the composition. mergeSettings fills anything the preset left out from
  // the page patch, and clamps the fields it knows.
  function patch(preset) {
    if (!preset || !preset.found) return null;
    var row = null;
    rows().forEach(function (item) { if (item.n === preset.n) row = item; });
    if (!row) return null;
    var picked = {};
    var src = row.settings || {};
    SOUND.forEach(function (key) {
      if (src[key] !== undefined && src[key] !== null) picked[key] = src[key];
    });
    if (root.NCSynth && NCSynth.mergeSettings) return NCSynth.mergeSettings(picked);
    return picked;
  }
  function uniqueImported(name, store) {
    var base = name || 'Imported';
    var used = {};
    store.forEach(function (p) { used[norm(p.name)] = 1; });
    if (!used[norm(base)]) return base;
    var n = 2, next = base + ' ' + n;
    while (used[norm(next)]) { n++; next = base + ' ' + n; }
    return next;
  }
  // The preset's own number, or the next free one. A shipped number and an
  // earlier import keep theirs. Replacing a preset that has no new number
  // keeps the number it already has.
  function placePreset(preset, store, idx) {
    var asked = preset.number;
    if (asked == null && idx >= 0 && store[idx] && store[idx].number != null) {
      preset.number = store[idx].number;
      preset.movedFrom = store[idx].movedFrom || null;
      preset.movedName = store[idx].movedName || '';
      return;
    }
    var used = {};
    bank.forEach(function (p) {
      if (p.number != null) used[p.number] = p.name;
    });
    store.forEach(function (p, i) {
      if (i === idx) return;
      if (p.number != null) used[p.number] = p.name;
    });
    if (asked != null && !used[asked]) {
      preset.number = asked;
      preset.movedFrom = null;
      preset.movedName = '';
      return;
    }
    var n = 1;
    while (used[n]) n++;
    preset.number = n;
    preset.movedFrom = asked != null ? asked : null;
    preset.movedName = asked != null && used[asked] ? used[asked] : '';
  }
  function importText(text, filename) {
    var data;
    try { data = JSON.parse(text); }
    catch (e) { return { ok: false, error: 'That file is not JSON.' }; }
    var items = [];
    if (Array.isArray(data)) items = data;
    else if (data && Array.isArray(data.presets)) items = data.presets;
    else items = [data];
    var fileBits = items.length === 1 ? fromFilename(filename) : { number: null, name: '' };
    var store = readStore().slice();
    var added = [], updated = [], errors = [];
    items.forEach(function (item) {
      var parsed = parsePerformancePreset(item);
      if (!parsed.ok) { errors.push(parsed.error); return; }
      var preset = parsed.preset;
      var explicit = parsed.named !== false;
      if (!explicit) {
        if (fileBits.name) {
          preset.name = fileBits.name;
          explicit = true;
        } else preset.name = uniqueImported('Imported', store);
      }
      if (preset.number == null && fileBits.number != null) preset.number = fileBits.number;
      var key = norm(preset.name);
      var idx = -1, i;
      if (explicit) {
        for (i = 0; i < store.length; i++) if (norm(store[i].name) === key) idx = i;
      }
      placePreset(preset, store, idx);
      if (idx >= 0) {
        store[idx] = preset;
        updated.push(preset.name);
      } else {
        store.push(preset);
        added.push(preset.name);
      }
    });
    if (!added.length && !updated.length) return { ok: false, error: errors[0] || 'That file had no presets.' };
    try { writeStore(store); }
    catch (e) { return { ok: false, error: 'Could not save the preset in this browser.' }; }
    function numbered(names) {
      return names.map(function (name) {
        var hit = null;
        rows().forEach(function (row) { if (norm(row.name) === norm(name) && row.source === 'import') hit = row; });
        return {
          name: hit ? hit.name : name,
          n: hit ? hit.n : null,
          movedFrom: hit ? hit.movedFrom : null,
          movedName: hit ? hit.movedName : ''
        };
      });
    }
    return { ok: true, added: numbered(added), updated: numbered(updated), errors: errors };
  }
  function listLabel(row) {
    return row.n + ' · ' + row.name;
  }
  function movedSentence(row) {
    if (!row || row.movedFrom == null || !row.movedName) return '';
    return row.movedFrom + ' is ' + row.movedName + ', so this one is ' + row.n;
  }
  function message(result) {
    if (!result || !result.ok) return (result && result.error) || 'That file is not an NC Synth preset or configuration.';
    var parts = [];
    (result.added || []).forEach(function (row) {
      var moved = movedSentence(row);
      parts.push(listLabel(row) + (moved ? '. ' + moved : ''));
    });
    (result.updated || []).forEach(function (row) {
      var moved = movedSentence(row);
      parts.push(listLabel(row) + ', still preset ' + row.n + (moved ? '. ' + moved : ''));
    });
    var line = parts.length === 1 ? 'Imported ' + parts[0] + '.' : 'Imported ' + parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] + '.';
    if (result.errors && result.errors.length) line += ' One entry was skipped.';
    return line;
  }
  function showNote(text) {
    var el = root.document && root.document.getElementById('preset-note');
    if (!el) return;
    if (!text) { el.textContent = ''; el.hidden = true; return; }
    el.hidden = false;
    el.textContent = text;
  }
  function bind() {
    var input = root.document && root.document.getElementById('preset-file');
    if (!input || input.getAttribute('data-bound')) return;
    input.setAttribute('data-bound', '1');
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      input.value = '';
      if (!file || !file.text) return;
      file.text().then(function (text) {
        showNote(message(importText(text, file.name)));
        var comp = root.document.getElementById('comp');
        if (comp) comp.dispatchEvent(new Event('input', { bubbles: true }));
      }).catch(function () { showNote('That file could not be read.'); });
    });
  }
  if (root.document && root.document.getElementById) {
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', bind);
    else bind();
  }
  if (root.document && root.fetch) {
    root.fetch('synth-presets.json').then(function (r) {
      if (!r.ok) throw new Error('missing');
      return r.json();
    }).then(function (data) {
      loadBank(data);
      readyResolve();
    }).catch(function () { readyResolve(); });
  } else readyResolve();

  root.NCSynthPresets = {
    KEY: KEY,
    ready: ready,
    parsePerformancePreset: parsePerformancePreset,
    loadBank: loadBank,
    resolve: resolve,
    patch: patch,
    importText: importText,
    message: message,
    rows: rows
  };
})(typeof window !== 'undefined' ? window : globalThis);
