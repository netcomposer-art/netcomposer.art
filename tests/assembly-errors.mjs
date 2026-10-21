// When a clip does not load, Perform names the chord and the reason.
//
// Built on the gather-again harness. One gather (a mix with two note stacks).
// Each case breaks one clip: an HTTP 404, a network or CORS failure, a
// decode failure. The page line names the chord (1-based) and symbol; the
// console gets the gather id, clip url and status. Fixing the clip lets the
// next Perform play.
// (Adapted from the gather-again test.)
//
// Clip ids are the chord position (c0, c1, …). A note stack is several files
// (c0n0, c0n1, …) mixed into that same clip id. Two gathers therefore share
// ids. Perform has to play the second gather's assembled clips, including
// the stacked ones, and Save has to send that gather_id and claim_token.
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://nc-perform-api.psemme.workers.dev';
const G1 = 'g-celloaaaaaa';
const G2 = 'g-mixbbbbbbbb';
const CLAIM1 = 'claim-cello';
const CLAIM2 = 'claim-mix';
const SYMS = ['Cm7', 'Dm7b5', 'G7', 'Cm9', 'Gm9'];

const MIX = [
  { title: 'piano Cm7 from 3 native-pitch notes', supplier: 'the University of Iowa', license: 'Public domain', parts: 3 },
  { title: 'Fat Synth Dm7b5', supplier: 'Musicmatter', license: 'CC BY-SA 4.0', parts: 1 },
  { title: 'guitar G7 from 4 native-pitch notes', supplier: 'the University of Iowa', license: 'Public domain', parts: 4 },
  { title: 'Choir Cm9', supplier: 'Musicmatter', license: 'CC BY-SA 4.0', parts: 1 },
  { title: 'Choir Gm9', supplier: 'Musicmatter', license: 'CC BY-SA 4.0', parts: 1 }
];

function partIds(index, n) {
  const ids = [];
  for (let i = 0; i < n; i++) ids.push('c' + index + 'n' + i);
  return ids;
}
function tagFor(gid, index, parts) {
  const id = 'c' + index;
  if (parts > 1) return 'stack:' + gid + ':' + id + ':' + partIds(index, parts).join('+');
  return 'file:' + gid + ':' + id;
}
function soundRow(gid, index, spec) {
  const id = 'c' + index;
  const parts = partIds(index, spec.parts);
  return {
    id: id,
    clip_id: id,
    chord: index,
    pos: index,
    symbol: SYMS[index],
    title: spec.title,
    supplier: spec.supplier,
    license: spec.license,
    preview_url: API + '/api/jobs/' + gid + '/audio/' + id,
    duration_s: 3,
    start_s: 0,
    gain_db: -3,
    sids: parts
  };
}
function celloRow(index) {
  return soundRow(G1, index, { title: 'Cello ' + SYMS[index], supplier: 'Musicmatter', license: 'CC BY-SA 4.0', parts: 1 });
}

const audioBody = new Map();
[0, 1, 2, 3, 4].forEach(function (i) {
  audioBody.set(API + '/api/jobs/' + G1 + '/audio/c' + i, tagFor(G1, i, 1));
  const spec = MIX[i];
  audioBody.set(API + '/api/jobs/' + G2 + '/audio/c' + i, tagFor(G2, i, spec.parts));
  partIds(i, spec.parts).forEach(function (pid) {
    audioBody.set(API + '/api/jobs/' + G2 + '/audio/' + pid, 'part:' + G2 + ':' + pid);
    audioBody.set(API + '/api/jobs/' + G1 + '/audio/' + pid, 'part:' + G1 + ':' + pid);
  });
});

const jobs = {};
function arm(gid, claim, rows) {
  jobs[gid] = {
    claim: claim,
    progress: {
      id: gid,
      gather_id: gid,
      state: 'gathering',
      found_sounds: rows.map(function (row) {
        return {
          chord: row.chord,
          id: row.id,
          title: row.title,
          supplier: row.supplier,
          license: row.license,
          symbol: row.symbol,
          preview_url: row.preview_url
        };
      })
    },
    done: {
      id: gid,
      gather_id: gid,
      state: 'done',
      claim_token: claim,
      clock: null,
      sounds: rows,
      found_sounds: rows
    }
  };
}
arm(G1, CLAIM1, SYMS.map(function (_s, i) { return celloRow(i); }));
arm(G2, CLAIM2, MIX.map(function (spec, i) { return soundRow(G2, i, spec); }));

const fetches = [];
const idbGets = [];
const cacheGets = [];
const liveLog = [];
const scheduled = [];
const rendered = [];
const keeps = [];
const idbRows = new Map();
const cacheRows = new Map();
let gatherPosts = 0;

function textToBuffer(text) {
  const bytes = new TextEncoder().encode(text);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}
function bufferToText(buf) {
  return new TextDecoder().decode(buf);
}
function respond(status, data, type) {
  const isBuf = data instanceof ArrayBuffer;
  return {
    ok: status >= 200 && status < 300,
    status: status,
    headers: { get: function (name) { return String(name).toLowerCase() === 'content-type' ? (type || 'application/json') : null; } },
    text: function () { return Promise.resolve(isBuf ? bufferToText(data) : JSON.stringify(data)); },
    json: function () { return Promise.resolve(data); },
    arrayBuffer: function () { return Promise.resolve(isBuf ? data : textToBuffer(JSON.stringify(data))); },
    body: { cancel: function () {} }
  };
}

const els = {};
function make(tag) {
  const el = {
    tag: tag || 'div',
    id: '',
    hidden: false,
    disabled: false,
    className: '',
    value: '',
    checked: false,
    open: false,
    href: '',
    target: '',
    rel: '',
    title: '',
    paused: true,
    currentTime: 0,
    preload: '',
    crossOrigin: '',
    loop: false,
    controls: false,
    children: [],
    style: {},
    dataset: {},
    _text: '',
    _src: '',
    _l: {},
    classList: { add: function () {}, remove: function () {}, contains: function () { return false; } },
    appendChild: function (child) { this.children.push(child); return child; },
    removeChild: function () {},
    focus: function () {},
    scrollIntoView: function () {},
    load: function () {},
    play: function () {
      this.paused = false;
      (this._l.play || []).forEach(function (fn) { fn(); });
      return Promise.resolve();
    },
    pause: function () {
      this.paused = true;
      (this._l.pause || []).forEach(function (fn) { fn(); });
    },
    addEventListener: function (type, fn) { (this._l[type] = this._l[type] || []).push(fn); },
    removeEventListener: function () {},
    setAttribute: function (name, value) { if (name === 'src') this._src = String(value); },
    removeAttribute: function (name) { if (name === 'src') this._src = ''; },
    getAttribute: function (name) { return name === 'src' ? (this._src || null) : null; },
    querySelectorAll: function () { return []; },
    closest: function () { return this; }
  };
  Object.defineProperty(el, 'textContent', {
    get: function () {
      if (this.children.length) return this.children.map(function (c) { return c.textContent || ''; }).join('');
      return this._text || '';
    },
    set: function (v) { this._text = String(v); this.children.length = 0; }
  });
  Object.defineProperty(el, 'src', {
    get: function () { return this._src || ''; },
    set: function (v) { this._src = String(v || ''); }
  });
  return el;
}
function byId(id) {
  if (!els[id]) {
    els[id] = make(id === 'perform-audio' || id === 'ltakeaudio' ? 'audio' : 'div');
    els[id].id = id;
  }
  return els[id];
}
['comp', 'perf', 'perform-status', 'perform-out', 'perform-audio', 'gather-list', 'gatherBtn', 'performBtn', 'gather-again', 'perform-public', 'perform-keep', 'plan-src', 'plan-seed', 'src-lanes', 'src-time', 'src-now', 'live', 'perform-title', 'perform-sources', 'perform-mp3', 'perform-flac', 'perform-record', 'perform-bar', 'perform-kept', 'perform-keep-note', 'perform-meta', 'perform-claim', 'perform-turnstile', 'perform-stop', 'perform-trim', 'foot-src', 'foot-tester', 'perform-record-view', 'perform-json', 'perform-json-pre', 'gather-box'].forEach(byId);
byId('comp').value = 'Surprise in C minor\nCm7 Dm7b5 G7 Cm9 Gm9';
byId('perf').value = 'A mixed collection after the cellos.';
byId('perform-out').hidden = true;

const audios = [];
function AudioEl() {
  const a = make('audio');
  audios.push(a);
  return a;
}

const ctx = {
  decodeAudioData: function (raw) {
    const tag = bufferToText(raw);
    if (tag.indexOf('bad:') === 0) return Promise.reject(new Error('EncodingError: Unable to decode audio data'));
    return Promise.resolve({ duration: 3, _tag: tag });
  },
  currentTime: 0,
  state: 'running',
  resume: function () { return Promise.resolve(); }
};

const errors = [];
const failures = {};
const sandbox = {
  console: { log: console.log, warn: function () {}, info: function () {}, error: function () { errors.push(Array.prototype.slice.call(arguments)); } },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  queueMicrotask: queueMicrotask,
  Promise: Promise,
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  Math: Math,
  Date: Date,
  JSON: JSON,
  Error: Error,
  RegExp: RegExp,
  ArrayBuffer: ArrayBuffer,
  Uint8Array: Uint8Array,
  Uint32Array: Uint32Array,
  DataView: DataView,
  TextEncoder: TextEncoder,
  TextDecoder: TextDecoder,
  Blob: Blob,
  FormData: FormData,
  URL: URL,
  URLSearchParams: URLSearchParams,
  Headers: Headers,
  Response: Response,
  AbortController: AbortController,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  isFinite: isFinite,
  isNaN: isNaN,
  crypto: globalThis.crypto,
  Audio: AudioEl,
  location: { origin: 'https://netcomposer.art', search: '', pathname: '/create/', hash: '', href: 'https://netcomposer.art/create/' },
  history: { replaceState: function () {} },
  navigator: {},
  sessionStorage: storeMem(),
  localStorage: storeMem(),
  indexedDB: fakeIdb(),
  caches: fakeCaches(),
  document: {
    body: byId('body'),
    head: byId('head'),
    documentElement: byId('html'),
    getElementById: byId,
    createElement: function (tag) { return make(tag); },
    createTextNode: function (text) { const n = make('text'); n.textContent = text; return n; },
    querySelectorAll: function () { return []; }
  }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.self = sandbox;
byId('body').getAttribute = function (name) { return name === 'data-ready' ? '1' : null; };

function storeMem() {
  const m = new Map();
  return {
    getItem: function (k) { return m.has(k) ? m.get(k) : null; },
    setItem: function (k, v) { m.set(k, String(v)); },
    removeItem: function (k) { m.delete(k); }
  };
}
function fakeIdb() {
  return {
    open: function () {
      const req = {};
      setTimeout(function () {
        req.result = {
          objectStoreNames: { contains: function () { return true; } },
          transaction: function () {
            const tx = {};
            tx.objectStore = function () {
              return {
                get: function (id) {
                  const r = {};
                  setTimeout(function () {
                    idbGets.push(String(id));
                    r.result = idbRows.get(id);
                    if (r.onsuccess) r.onsuccess();
                  }, 0);
                  return r;
                },
                put: function (row) { idbRows.set(row.clip_id, row); },
                delete: function (id) { idbRows.delete(id); }
              };
            };
            setTimeout(function () { if (tx.oncomplete) tx.oncomplete(); }, 0);
            return tx;
          }
        };
        if (req.onsuccess) req.onsuccess();
      }, 0);
      return req;
    }
  };
}
function fakeCaches() {
  return {
    open: function () {
      return Promise.resolve({
        match: function (path) {
          cacheGets.push(String(path));
          const hit = cacheRows.get(String(path));
          if (!hit) return Promise.resolve(undefined);
          return Promise.resolve({ arrayBuffer: function () { return Promise.resolve(hit); } });
        },
        put: function (path, res) {
          return res.arrayBuffer().then(function (buf) { cacheRows.set(String(path), buf); });
        },
        delete: function (path) { return Promise.resolve(cacheRows.delete(String(path))); }
      });
    }
  };
}

sandbox.NC = {
  commitNotes: function () {},
  stop: function () {},
  state: function () {
    return { t: 'Surprise in C minor', by: 'Petrus', c: byId('comp').value, p: byId('perf').value };
  },
  timeline: function () { return { chords: SYMS.map(function (symbol) { return { symbol: symbol }; }) }; },
  findChords: function () { return SYMS.map(function (sym) { return { sym: sym }; }); }
};
sandbox.NCLive = {
  prime: function () { return ctx; },
  open: function (desc) {
    liveLog.push({ kind: 'open', id: desc && desc.id, force: !!(desc && desc.force), url: desc && (desc.mp3 || (desc.only && desc.only[0]) || '') });
    const audio = byId('perform-audio');
    if (desc && desc.mp3) audio.src = desc.mp3;
    return Promise.resolve(true);
  },
  hide: function () { liveLog.push({ kind: 'hide' }); },
  stopClips: function () { liveLog.push({ kind: 'stopClips' }); },
  scheduleClips: function (spec) { scheduled.push(spec); },
  renderBuffers: function (spec) {
    rendered.push(spec);
    return Promise.resolve({ blob: new Blob(['take']), total_s: spec.total });
  },
  chain: function () { return [{ type: 'lowpass', params: { cutoff: 0 } }]; }
};
sandbox.EventSource = function (url) {
  this.url = url;
  this.readyState = 0;
  const id = String(url).split('/api/jobs/')[1].split('/')[0];
  const job = jobs[id];
  const self = this;
  setTimeout(function () {
    if (self.readyState === 2 || !self.onmessage || !job) return;
    self.onmessage({ data: JSON.stringify(job.progress) });
  }, 0);
  setTimeout(function () {
    if (self.readyState === 2 || !self.onmessage || !job) return;
    self.onmessage({ data: JSON.stringify(job.done) });
  }, 30);
};
sandbox.EventSource.prototype.close = function () { this.readyState = 2; };

sandbox.fetch = function (url, opts) {
  const u = String(url);
  const method = (opts && opts.method) || 'GET';
  fetches.push({ url: u, method: method });
  if (u === API + '/api/config') {
    return Promise.resolve(respond(200, { perform_enabled: true, browser_assembly: true }));
  }
  if (u === API + '/api/gather' && method === 'POST') {
    const body = JSON.parse(String(opts.body || '{}'));
    if (body.probe) return Promise.resolve(respond(200, { ok: true }));
    gatherPosts++;
    const gid = G2;
    const job = jobs[gid];
    return Promise.resolve(respond(202, {
      gather_id: gid,
      id: gid,
      claim_token: job.claim,
      state: 'queued',
      status: 'queued',
      pending: true,
      sounds: [],
      poll: '/api/jobs/' + gid
    }));
  }
  if (u === API + '/api/keep-take' && method === 'POST') {
    const fields = {};
    opts.body.forEach(function (value, key) { fields[key] = value; });
    keeps.push(fields);
    return Promise.resolve(respond(200, { status: 'done', page_url: 'https://netcomposer.art/records/saved' }));
  }
  if (failures[u] === 'network') return Promise.reject(new TypeError('Failed to fetch'));
  if (typeof failures[u] === 'number') return Promise.resolve(respond(failures[u], { error: 'not found' }));
  if (audioBody.has(u)) return Promise.resolve(respond(200, textToBuffer(audioBody.get(u)), 'audio/wav'));
  return Promise.resolve(respond(404, { error: 'not found' }));
};

let blobN = 0;
sandbox.URL.createObjectURL = function () { blobN += 1; return 'blob:take-' + blobN; };
sandbox.URL.revokeObjectURL = function () {};

vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/assembly.js'), 'utf8'), sandbox);
vm.runInContext(readFileSync(join(root, 'create/perform.js'), 'utf8'), sandbox);

function waitFor(pred, label) {
  const start = Date.now();
  return new Promise(function (resolve, reject) {
    const timer = setInterval(function () {
      let ok = false;
      try { ok = pred(); } catch (err) { clearInterval(timer); reject(err); return; }
      if (ok) { clearInterval(timer); resolve(); }
      else if (Date.now() - start > 5000) {
        clearInterval(timer);
        reject(new Error(label + ' (status: ' + byId('perform-status').textContent + ')'));
      }
    }, 15);
  });
}
const problems = [];
function check(cond, msg) { if (!cond) problems.push(msg); }
const clipUrl = function (i) { return API + '/api/jobs/' + G2 + '/audio/c' + i; };
const status = function () { return byId('perform-status').textContent; };

const gatherStatus = function () { return byId('gather-status').textContent; };
await waitFor(function () { return gatherStatus() === 'Ready.'; }, 'boot');
// A clip that loaded once stays in memory, so each case breaks clips that never loaded.
failures[clipUrl(0)] = 404;
failures[clipUrl(1)] = 404;
byId('gatherBtn').onclick();
await waitFor(function () { return gatherStatus() === 'Gathered.'; }, 'gather');

async function performExpect(want, label) {
  errors.length = 0;
  const before = scheduled.length;
  byId('performBtn').onclick();
  await waitFor(function () { return status() === want || scheduled.length > before; }, label);
  check(status() === want, label + ': page line should be "' + want + '", got "' + status() + '"');
  check(byId('perform-status').className === 'm warn', label + ': the line should use the warning style, got ' + byId('perform-status').className);
  return errors.slice();
}
function detail(errs, i) {
  const hit = errs.find(function (args) { return args[1] && Array.isArray(args[1].clips); });
  return hit ? { gather: hit[1].gather_id, clip: hit[1].clips.find(function (c) { return c.chord === i + 1; }) } : null;
}

// 1. Two clips answer HTTP 404: the first is named, the other counted.
let errs = await performExpect('Could not load chord 1 (Cm7): HTTP 404. 1 more did not load. Try Gather again.', 'two 404s');
let d = detail(errs, 0);
check(d && d.gather === G2, '404: console should name the gather id, got ' + JSON.stringify(d));
check(d && d.clip && d.clip.url === clipUrl(0) && d.clip.status === 404 && d.clip.reason === 'http' && d.clip.symbol === 'Cm7' && d.clip.clip_id === 'c0', '404: console should carry url, status, symbol and clip id, got ' + JSON.stringify(d));
check(detail(errs, 1) && detail(errs, 1).clip && detail(errs, 1).clip.status === 404, '404: console should list the second clip too');

// 2. Network or CORS failure (fetch rejects).
delete failures[clipUrl(0)];
failures[clipUrl(1)] = 'network';
errs = await performExpect('Could not load chord 2 (Dm7b5): network or CORS error. Try Gather again.', 'network');
d = detail(errs, 1);
check(d && d.clip && d.clip.reason === 'network' && d.clip.url === clipUrl(1) && /Failed to fetch/.test(d.clip.cause), 'network: console should carry the cause, got ' + JSON.stringify(d));

// 3. The bytes arrive but do not decode.
delete failures[clipUrl(1)];
audioBody.set(clipUrl(1), 'bad:not audio');
errs = await performExpect('Could not load chord 2 (Dm7b5): could not decode. Try Gather again.', 'decode');
d = detail(errs, 1);
check(d && d.clip && d.clip.reason === 'decode' && d.clip.text === 'could not decode' && d.clip.status === 0, 'decode: console should say decode, got ' + JSON.stringify(d));
check(!idbRows.has(G2 + '/c1'), 'decode: bytes that did not decode must leave IndexedDB');
check(!cacheRows.has('https://netcomposer.art/nc-clip/' + encodeURIComponent(G2 + '/c1')), 'decode: bytes that did not decode must leave Cache Storage');

// 4. Once the clip is good, Perform plays and the line clears.
audioBody.set(clipUrl(1), tagFor(G2, 1, 1));
const before = scheduled.length;
byId('performBtn').onclick();
await waitFor(function () { return scheduled.length > before; }, 'recovered perform');
check(status() === '', 'after recovery the page line should clear, got "' + status() + '"');
const tags = (scheduled[scheduled.length - 1].entries || []).map(function (e) { return e.buffer && e.buffer._tag; });
check(tags[1] === tagFor(G2, 1, 1), 'the recovered clip should be the fixed bytes, got ' + tags[1]);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('assembly errors name the chord and the reason');
