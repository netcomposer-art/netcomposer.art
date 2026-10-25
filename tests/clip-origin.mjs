// The server can name a clip with the wrong host. A container started without
// NC_PUBLIC_BASE_URL writes http://localhost:8080/api/jobs/{gid}/audio/{id}.
// The page must rebuild every Performer path from API and never fetch another
// origin. This is the gather-again test with those localhost addresses.
//
// Gather again must not keep the previous collection's clips.
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
const BAD = 'http://localhost:8080';
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
    preview_url: BAD + '/api/jobs/' + gid + '/audio/' + id,
    url: BAD + '/api/jobs/' + gid + '/audio/' + id,
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
byId('comp').value = 'Surprise in C minor\nCm7 Dm7b5 Gdom7 Cm9 Gm9';
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
    return Promise.resolve({ duration: 3, _tag: bufferToText(raw) });
  },
  currentTime: 0,
  state: 'running',
  resume: function () { return Promise.resolve(); }
};

const sandbox = {
  console: console,
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
                put: function (row) { idbRows.set(row.clip_id, row); }
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
        }
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
    const gid = gatherPosts === 1 ? G1 : G2;
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
        reject(new Error(label + ' (status: ' + byId('perform-status').textContent + ', scheduled ' + scheduled.length + ')'));
      }
    }, 15);
  });
}
function tagsOf(spec) {
  return (spec.entries || []).map(function (entry) { return entry.buffer && entry.buffer._tag; });
}
function bareClipLookup(id) {
  return /^c\d+(n\d+)?$/.test(id);
}

const problems = [];
function check(cond, msg) {
  if (!cond) problems.push(msg);
}

await waitFor(function () { return byId('gather-status').textContent === 'Ready.'; }, 'boot');
byId('gatherBtn').onclick();
await waitFor(function () { return byId('gather-status').textContent === 'Gathered.'; }, 'first gather');
byId('performBtn').onclick();
await waitFor(function () { return scheduled.length === 1; }, 'first perform');
const celloTags = tagsOf(scheduled[0]);
check(celloTags.length === 5 && celloTags.every(function (tag, i) { return tag === tagFor(G1, i, 1); }), 'first Perform should play the cello clips, got ' + celloTags.join(','));

const stopsBefore = liveLog.filter(function (e) { return e.kind === 'stopClips' || e.kind === 'hide'; }).length;
const fetchesBeforeMix = fetches.length;
byId('gather-again').onclick();
await waitFor(function () { return byId('gather-status').textContent === 'Gathered.' && byId('gather-list').textContent.indexOf('piano Cm7') >= 0; }, 'second gather');
const list = byId('gather-list').textContent;
check(list.indexOf('Fat Synth Dm7b5') >= 0 && list.indexOf('guitar G7 from 4 native-pitch notes') >= 0, 'the list should show the mixed collection');
check(byId('perform-audio').getAttribute('src') == null, 'Gather again should drop the cello player');
check(byId('perform-out').hidden === true, 'Gather again should close the old take');
check(liveLog.filter(function (e) { return e.kind === 'stopClips' || e.kind === 'hide'; }).length > stopsBefore, 'Gather again should stop the Live clips and hide the old graph');

byId('performBtn').onclick();
await waitFor(function () { return scheduled.length === 2; }, 'perform the mixed gather');
const mixTags = tagsOf(scheduled[1]);
const wantMix = MIX.map(function (spec, i) { return tagFor(G2, i, spec.parts); });
check(JSON.stringify(mixTags) === JSON.stringify(wantMix), 'Perform should play the new gather, including note stacks, got ' + mixTags.join(','));
const mixFetches = fetches.slice(fetchesBeforeMix).map(function (f) { return f.url; }).filter(function (u) { return u.indexOf('/audio/') >= 0; });
check(mixFetches.some(function (u) { return u === API + '/api/jobs/' + G2 + '/audio/c0'; }), 'the Cm7 note stack should be fetched from the new gather: ' + mixFetches.join(','));
check(mixFetches.some(function (u) { return u === API + '/api/jobs/' + G2 + '/audio/c2'; }), 'the G7 note stack should be fetched from the new gather');
check(!mixFetches.some(function (u) { return u.indexOf(G1) >= 0 || /\/audio\/c\dn/.test(u); }), 'Perform should not fetch the cello gather or a single stack part: ' + mixFetches.join(','));
const mixOpen = liveLog.filter(function (e) { return e.kind === 'open'; }).pop();
check(mixOpen && String(mixOpen.id).indexOf(G2) === 0 && mixOpen.force, 'Live should open the new gather with force, got ' + JSON.stringify(mixOpen));

byId('performBtn').onclick();
await waitFor(function () { return scheduled.length === 3; }, 'perform again');
const againTags = tagsOf(scheduled[2]);
check(JSON.stringify(againTags) === JSON.stringify(wantMix), 'Perform again should stay on the new gather, got ' + againTags.join(','));
const againOpen = liveLog.filter(function (e) { return e.kind === 'open'; }).pop();
check(againOpen && String(againOpen.id).indexOf(G2) === 0 && againOpen.force && againOpen.id !== mixOpen.id, 'Perform again should rebuild Live on a new take of the same gather');

if (audios[0]) {
  const piano = byId('gather-list').children[0];
  const listen = piano && piano.children.filter(function (c) { return c.tag === 'button' || c.onclick; })[0];
  if (listen && listen.onclick) listen.onclick();
  check(audios[0].src === API + '/api/jobs/' + G2 + '/audio/c0', 'Listen on the new Cm7 stack should use the new gather, got ' + audios[0].src);
}

byId('perform-keep').onclick();
await waitFor(function () { return keeps.length === 1; }, 'save');
const saved = keeps[0];
const state = JSON.parse(String(saved.take_state));
check(saved.gather_id === G2, 'Save gather_id should be the new gather, got ' + saved.gather_id);
check(saved.claim_token === CLAIM2, 'Save claim_token should be the new gather, got ' + saved.claim_token);
check(state.plan && state.plan.gather_id === G2, 'take_state.gather_id should be the new gather, got ' + (state.plan && state.plan.gather_id));
const savedIds = (state.plan.entries || []).map(function (e) { return e.clip_id; });
check(JSON.stringify(savedIds) === JSON.stringify(['c0', 'c1', 'c2', 'c3', 'c4']), 'take_state should name the new gather\'s clip ids, got ' + savedIds.join(','));
check(JSON.stringify(tagsOf(rendered[0])) === JSON.stringify(wantMix), 'Save should render the new clips, got ' + tagsOf(rendered[0] || { entries: [] }).join(','));
check(!idbGets.some(bareClipLookup), 'IndexedDB must not be keyed by chord position: ' + idbGets.filter(bareClipLookup).join(','));
check(!cacheGets.some(function (path) { return /\/nc-clip\/c\d+(n\d+)?$/.test(path); }), 'Cache Storage must not be keyed by chord position: ' + cacheGets.join(','));
check(idbGets.indexOf(G2 + '/c0') >= 0, 'the new note stack should be stored as gather id plus clip id');

check(!fetches.some(function (f) { return f.url.indexOf(BAD) === 0 || (f.url.indexOf('/audio/') >= 0 && f.url.indexOf(API + '/') !== 0); }), 'no clip may be fetched from another origin: ' + fetches.filter(function (f) { return f.url.indexOf(API) !== 0; }).map(function (f) { return f.url; }).join(','));
check(!audios.some(function (a) { return String(a.src).indexOf(BAD) === 0; }), 'Listen must not play from localhost');
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('clips come from API even when the server names localhost');
