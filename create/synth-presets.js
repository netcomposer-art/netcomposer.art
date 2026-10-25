/* Synth presets for /create/.
 *
 * The shipped bank is create/synth-presets.json. Numbers follow that file,
 * then presets imported in this browser. A name looks at imports first.
 *
 * An NC Synth performance preset is {id, name, version: 1, settings}.
 * settings is a SynthSettings object. The vendored synth-audio snapshot
 * validates those fields in mergeSettings (settings.ts, and the page copy in
 * nc-synth.js). This file is the performance-preset parser: version must be
 * 1, and the settings object is the one mergeSettings accepts. A Save from
 * the NC Synth app may instead be that settings object on its own, or a list
 * of either form.
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

  function norm(s) {
    return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function looksLikeSettings(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
    if (typeof o.waveform === 'string' || typeof o.oscillatorMode === 'string') return true;
    if (typeof o.cutoff === 'number') return true;
    if (Array.isArray(o.vcoMods) || Array.isArray(o.vcfMods) || Array.isArray(o.vcaMods)) return true;
    if (typeof o.filter === 'string' && (typeof o.attack === 'number' || typeof o.release === 'number')) return true;
    return false;
  }
  // {id, name, version: 1, settings}, or a bare configuration (the settings
  // object the NC Synth Save button writes).
  function parsePerformancePreset(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { ok: false, error: 'A preset is one object, or a list of them.' };
    }
    if (raw.settings && typeof raw.settings === 'object' && !Array.isArray(raw.settings)) {
      if (raw.version != null && Number(raw.version) !== 1) return { ok: false, error: 'Preset version must be 1.' };
      var name = typeof raw.name === 'string' ? raw.name.replace(/\s+/g, ' ').trim() : '';
      if (!name) return { ok: false, error: 'A preset needs a name.' };
      if (root.NCSynth && NCSynth.mergeSettings) NCSynth.mergeSettings(raw.settings);
      return {
        ok: true,
        preset: {
          id: raw.id == null ? '' : String(raw.id),
          name: name,
          version: 1,
          settings: raw.settings
        }
      };
    }
    if (looksLikeSettings(raw)) {
      if (root.NCSynth && NCSynth.mergeSettings) NCSynth.mergeSettings(raw);
      var named = typeof raw.name === 'string' ? raw.name.replace(/\s+/g, ' ').trim() : '';
      return {
        ok: true,
        named: !!named,
        preset: {
          id: raw.id == null ? '' : String(raw.id),
          name: named || 'Imported',
          version: 1,
          settings: raw
        }
      };
    }
    return { ok: false, error: 'That JSON is not an NC Synth preset or configuration.' };
  }
  function loadBank(data) {
    var items = [];
    if (Array.isArray(data)) items = data;
    else if (data && Array.isArray(data.presets)) items = data.presets;
    else if (data) items = [data];
    bank = [];
    items.forEach(function (item) {
      var parsed = parsePerformancePreset(item);
      if (parsed.ok) bank.push(parsed.preset);
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
    return imports;
  }
  function writeStore(list) {
    imports = list;
    if (!root.localStorage) return;
    root.localStorage.setItem(KEY, JSON.stringify(list));
  }
  function rows() {
    var out = [];
    bank.forEach(function (p, i) {
      out.push({ n: i + 1, name: p.name, id: p.id || '', settings: p.settings, source: 'bank' });
    });
    readStore().forEach(function (p, i) {
      out.push({ n: bank.length + i + 1, name: p.name, id: p.id || '', settings: p.settings, source: 'import' });
    });
    return out;
  }
  function resolve(ref) {
    var text = String(ref || '').replace(/\s+/g, ' ').trim();
    if (!text) return null;
    var list = rows();
    if (/^\d+$/.test(text)) {
      var n = +text;
      var byNum = null;
      list.forEach(function (row) { if (row.n === n) byNum = row; });
      if (!byNum) return { ref: text, label: text, found: false, n: null, name: '', by: 'number' };
      return { ref: text, label: text, found: true, n: byNum.n, name: byNum.name, id: byNum.id, by: 'number' };
    }
    var key = norm(text);
    var hit = null;
    list.forEach(function (row) {
      if (hit || row.source !== 'import') return;
      if (norm(row.name) === key) hit = row;
    });
    if (!hit) list.forEach(function (row) {
      if (hit || row.source !== 'bank') return;
      if (norm(row.name) === key) hit = row;
    });
    if (!hit) return { ref: text, label: text, found: false, n: null, name: '', by: 'name' };
    return { ref: text, label: text, found: true, n: hit.n, name: hit.name, id: hit.id, by: 'name' };
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
  function importText(text) {
    var data;
    try { data = JSON.parse(text); }
    catch (e) { return { ok: false, error: 'That file is not JSON.' }; }
    var items = [];
    if (Array.isArray(data)) items = data;
    else if (data && Array.isArray(data.presets)) items = data.presets;
    else items = [data];
    var store = readStore().slice();
    var added = [], updated = [], errors = [];
    items.forEach(function (item) {
      var parsed = parsePerformancePreset(item);
      if (!parsed.ok) { errors.push(parsed.error); return; }
      var preset = parsed.preset;
      var explicit = parsed.named !== false;
      if (!explicit) preset.name = uniqueImported('Imported', store);
      var key = norm(preset.name);
      var idx = -1, i;
      if (explicit) {
        for (i = 0; i < store.length; i++) if (norm(store[i].name) === key) idx = i;
      }
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
        return { name: hit ? hit.name : name, n: hit ? hit.n : null };
      });
    }
    return { ok: true, added: numbered(added), updated: numbered(updated), errors: errors };
  }
  function message(result) {
    if (!result || !result.ok) return (result && result.error) || 'That file is not an NC Synth preset or configuration.';
    var parts = [];
    (result.added || []).forEach(function (row) {
      parts.push(row.name + ' as preset ' + row.n);
    });
    (result.updated || []).forEach(function (row) {
      parts.push(row.name + ', still preset ' + row.n);
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
        showNote(message(importText(text)));
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
