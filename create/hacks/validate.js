// Checks a hack-chain document. Schema 2 is the flat master chain Save posts
// today. Schema 3 adds master, up to eight track chains, and a whole-piece
// glide. This file does not run audio.
(function (root) {
  'use strict';
  var TYPES = { lowpass: 1, highpass: 1, bandpass: 1, delay: 1, plate: 1, eq: 1, drive: 1, compressor: 1, width: 1, limiter: 1 };
  var NAME = /^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;
  var TRACK = /^t([1-8])$/;
  var MOVABLE = 10;

  function bad(msg) { throw new Error(msg); }
  function finite(n) { return typeof n === 'number' && n === n && n !== Infinity && n !== -Infinity; }

  function paramsOf(params) {
    if (params == null) params = {};
    if (typeof params !== 'object' || Array.isArray(params)) bad('Hack params must be a flat object.');
    var keys = Object.keys(params);
    if (keys.length > 32) bad('Hack params are too large.');
    var out = {};
    keys.forEach(function (key) {
      if (!NAME.test(key)) bad('Hack params must be a flat object.');
      var value = params[key];
      if (value == null) { out[key] = null; return; }
      if (typeof value === 'boolean') bad('Hack params must be finite numbers, short strings, or null.');
      if (typeof value === 'number') {
        if (!finite(value)) bad('Hack params must be finite numbers, short strings, or null.');
        out[key] = value;
        return;
      }
      if (typeof value === 'string' && value.length <= 64) { out[key] = value; return; }
      bad('Hack params must be finite numbers, short strings, or null.');
    });
    if (JSON.stringify(out).length > 2048) bad('Hack params are too large.');
    return out;
  }
  function glideOf(auto) {
    if (auto == null) return null;
    if (typeof auto !== 'object' || Array.isArray(auto)) bad('A glide is an object.');
    if (auto.param !== 'cutoff_hz' && auto.param !== 'centre_hz') bad('A glide moves cutoff_hz or centre_hz.');
    if (!finite(auto.from) || !finite(auto.to) || !(auto.from > 0) || !(auto.to > 0)) bad('A glide needs two frequencies above 0.');
    if (auto.over !== 'piece') bad('A glide covers the whole piece.');
    return { param: auto.param, from: auto.from, to: auto.to, over: 'piece' };
  }
  function hackOf(item, last, allowAuto) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) bad('Each hack is an object.');
    if (!TYPES[item.type]) bad('Unknown hack type.');
    if (item.fixed !== true && item.fixed !== false && item.fixed != null) bad('fixed must be true or false.');
    var fixed = item.fixed === true;
    if (last) {
      if (item.type !== 'limiter' || !fixed) bad('The limiter stays last.');
    } else if (item.type === 'limiter' || fixed) bad('The limiter stays last.');
    if (typeof item.id !== 'string' || !NAME.test(item.id)) bad('Each hack needs a short id.');
    if (typeof item.version !== 'number' || item.version !== (item.version | 0)) bad('Each hack version must be an integer.');
    if (item.bypass !== true && item.bypass !== false) bad('Each hack bypass must be true or false.');
    var kept = {
      id: item.id,
      type: item.type,
      version: item.version,
      bypass: item.bypass,
      params: paramsOf(item.params)
    };
    if (fixed) kept.fixed = true;
    if (item.auto != null) {
      if (!allowAuto) bad('A glide belongs on schema 3.');
      kept.auto = glideOf(item.auto);
    }
    return kept;
  }
  function masterChain(chain, allowAuto) {
    if (!Array.isArray(chain) || !chain.length) bad('The limiter stays last.');
    if (chain.length > MOVABLE + 1) bad('A hack stack has at most 10 hacks, plus the limiter.');
    return chain.map(function (item, index) { return hackOf(item, index === chain.length - 1, allowAuto); });
  }
  function trackChain(chain) {
    if (chain == null) chain = [];
    if (!Array.isArray(chain)) bad('A track chain is a list.');
    if (chain.length > MOVABLE) bad('A hack stack has at most 10 hacks, plus the limiter.');
    return chain.map(function (item) {
      if (item && (item.type === 'limiter' || item.fixed === true)) bad('A track chain has no limiter.');
      return hackOf(item, false, true);
    });
  }
  function schema3(doc) {
    var master = doc.master;
    if (!master || typeof master !== 'object' || Array.isArray(master)) bad('processing.master is the master chain.');
    var tracksIn = doc.tracks == null ? {} : doc.tracks;
    if (typeof tracksIn !== 'object' || Array.isArray(tracksIn)) bad('processing.tracks must be an object.');
    var keys = Object.keys(tracksIn);
    if (keys.length > 8) bad('Only 8 tracks can have their own hacks.');
    var tracks = {};
    keys.forEach(function (key) {
      if (!TRACK.test(key)) bad('Only 8 tracks can have their own hacks.');
      var node = tracksIn[key];
      if (!node || typeof node !== 'object' || Array.isArray(node)) bad('A track chain is an object.');
      tracks[key] = { chain: trackChain(node.chain) };
    });
    return { schema: 3, master: { chain: masterChain(master.chain, true) }, tracks: tracks };
  }
  function normalize(doc) {
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) bad('processing must be a JSON object.');
    var schema = doc.schema;
    if (schema !== 2 && schema !== 3) bad('processing.schema must be 2 or 3.');
    if (schema === 3) return schema3(doc);
    return { schema: 2, chain: masterChain(doc.chain, false) };
  }
  function check(doc) {
    try {
      return { ok: true, value: normalize(doc) };
    } catch (err) {
      return { ok: false, error: err && err.message ? err.message : 'invalid hack chain' };
    }
  }

  var api = { check: check, MAX_TRACKS: 8, MAX_HACKS: MOVABLE };
  root.NCChainValidate = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
