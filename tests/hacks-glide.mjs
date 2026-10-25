// The lp500->200 glide, offline. Play stays dry. A delay arrow does not move.
// Also writes the before/after MP3s used in the step 7 pull request.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { console, Math, Float32Array };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/hacks/dsp.js'), 'utf8'), sandbox);
const lib = sandbox.NCHacksLib;
const engineSrc = readFileSync(join(root, 'create/hacks/engine.js'), 'utf8');
const pins = /var pins = '([^']*)\\n';/.exec(engineSrc)[1];
const W = new Function(pins + '\n' + lib.fns.map((fn) => fn.toString()).join('\n') +
  '\nreturn {ncChainCreate: ncChainCreate, ncChainSet: ncChainSet, ncRender: ncRender, ncChainPatch: ncChainPatch};')();

const SR = 48000, Q = 128, PIECE = 6;
let fails = 0;
function ok(cond, msg) { if (!cond) { fails++; console.log('FAIL', msg); } else console.log('ok  ', msg); }
function chord(seconds) {
  const n = Math.round(seconds * SR), l = new Float32Array(n), r = new Float32Array(n);
  const freqs = [220, 277.18, 329.63, 440];
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = 0; k < freqs.length; k++) s += Math.sin(2 * Math.PI * freqs[k] * i / SR);
    s *= 0.3 / freqs.length;
    l[i] = s;
    r[i] = s * 0.92;
  }
  return [l, r];
}
function render(chain, inL, inR) {
  const n = inL.length, oL = new Float32Array(n), oR = new Float32Array(n);
  for (let i = 0; i < n; i += Q) {
    const m = Math.min(Q, n - i);
    W.ncRender(chain, inL.subarray(i, i + m), inR.subarray(i, i + m), oL.subarray(i, i + m), oR.subarray(i, i + m));
  }
  return [oL, oR];
}
function same(a, b) {
  for (let c = 0; c < 2; c++) for (let i = 0; i < a[c].length; i++) if (a[c][i] !== b[c][i]) return false;
  return true;
}
function hf(buf, from, to) {
  let y = 0, e = 0, n = 0;
  const a = Math.exp(-2 * Math.PI * 800 / SR);
  for (let i = from; i < to; i++) {
    y += (buf[i] - y) * (1 - a);
    const h = buf[i] - y;
    e += h * h;
    n++;
  }
  return e / n;
}
const LIM = { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: { ceiling_db: -1, lookahead_s: 0.0015 } };
function chainOf(low, auto, step) {
  const c = W.ncChainCreate(SR);
  const widgets = [
    low,
    { id: 'delay-1', type: 'delay', bypass: false, params: { delay_s: 0.75, feedback: 0.35, wet: 0 } },
    { id: 'plate-1', type: 'plate', bypass: false, params: { predelay: 0, size: 0.5, decay: 0.5, damping: 0, mix: 0 } },
    LIM
  ];
  if (auto) widgets[0] = Object.assign({}, widgets[0], { auto: auto });
  W.ncChainSet(c, widgets, true);
  c.pos = 0;
  c.step = step || 0;
  return c;
}
const lp = { id: 'lowpass-1', type: 'lowpass', bypass: false, params: { cutoff: 75, cutoff_hz: 500, q: 0.7071067811865476 } };
const glideAuto = { param: 'cutoff_hz', from: 500, to: 200, over: 'piece' };
const [inL, inR] = chord(PIECE);
const parked = render(chainOf(lp, null, 0), inL, inR);
const glided = render(chainOf(lp, glideAuto, 1 / (PIECE * SR)), inL, inR);
ok(!same(parked, glided), 'lp500->200 does not match a filter parked at 500 Hz');
const win = Math.round(0.5 * SR);
const parkStart = hf(parked[0], 0, win);
const parkEnd = hf(parked[0], parked[0].length - win, parked[0].length);
const glideStart = hf(glided[0], 0, win);
const glideEnd = hf(glided[0], glided[0].length - win, glided[0].length);
ok(parkEnd / parkStart > 0.85 && parkEnd / parkStart < 1.15, 'a parked 500 Hz filter stays even (' + (parkEnd / parkStart).toFixed(3) + ')');
ok(glideEnd < glideStart * 0.55, 'the glide is darker at the end (' + (glideEnd / glideStart).toFixed(3) + ')');
ok(Math.abs(glideStart - parkStart) / parkStart < 0.15, 'the glide starts at the same brightness as 500 Hz');

const delay = { id: 'delay-1', type: 'delay', version: 1, bypass: false, params: { delay_s: 0.25, feedback: 0.4, wet: 0.5 } };
function delayChain(auto) {
  const c = W.ncChainCreate(SR);
  const w = Object.assign({}, delay);
  if (auto) w.auto = auto;
  W.ncChainSet(c, [w, LIM], true);
  c.pos = 0;
  c.step = 1 / (PIECE * SR);
  return c;
}
const dPark = render(delayChain(null), inL, inR);
const dArrow = render(delayChain({ param: 'wet', from: 0, to: 1, over: 'piece' }), inL, inR);
ok(same(dPark, dArrow), 'a delay arrow stays on its start value');

const cleared = chainOf(lp, glideAuto, 1 / (PIECE * SR));
W.ncChainPatch(cleared, 'lowpass-1', lp.params, false, true, null);
const afterHand = render(cleared, inL, inR);
const held = chainOf(lp, null, 0);
const heldOut = render(held, inL, inR);
ok(same(afterHand, heldOut), 'clearing the glide leaves the dial where it was written');

const app = readFileSync(join(root, 'create/app.js'), 'utf8');
const live = readFileSync(join(root, 'create/live.js'), 'utf8');
const processor = readFileSync(join(root, 'create/hacks/processor.js'), 'utf8');
const help = readFileSync(join(root, 'create/help/index.html'), 'utf8');
ok(!/NCHacks\.attach/.test(app), 'Play does not run the hack worklet');
ok(/op: 'clock'/.test(live) && /piece: buffer\.duration/.test(live) && /piece: musical/.test(live), 'Live posts a clock and offline Save gets the piece length');
ok(/msg\.op === 'clock'/.test(processor) && /this\.piece/.test(processor), 'the worklet follows the clock and the offline piece');
ok(!/latencyHint/.test(live + engineSrc), 'latencyHint stays unset');
ok(/evenly in pitch/.test(help) && /cp18/.test(help) && /cp-18/.test(help), 'the help names the glide and both compressor spellings');

const perform = readFileSync(join(root, 'create/perform.js'), 'utf8');
const processingOf = new Function(readFileSync(join(root, 'create/perform.js'), 'utf8').match(/function processingOf\(list\) \{[\s\S]*?\n  \}/)[0] + '\nreturn processingOf;')();
const plain = processingOf([Object.assign({}, lp, { version: 1 }), LIM]);
const moved = processingOf([Object.assign({}, lp, { version: 1, auto: glideAuto }), LIM]);
ok(plain.schema === 2 && plain.chain.length === 2, 'Save stays on schema 2 when nothing glides');
ok(moved.schema === 3 && moved.master.chain[0].auto.to === 200 && moved.tracks && !moved.master.chain[0].chain, 'Save posts schema 3 when a glide is present');

function el(tag, attrs, children) {
  const node = {
    tagName: tag, attrs: Object.assign({}, attrs), children: children || [], parent: null,
    value: attrs && attrs.value != null ? String(attrs.value) : '',
    textContent: '', options: [], selectedIndex: 0, listeners: {}
  };
  node.getAttribute = (k) => (k in node.attrs && node.attrs[k] != null ? String(node.attrs[k]) : null);
  node.hasAttribute = (k) => Object.prototype.hasOwnProperty.call(node.attrs, k);
  node.setAttribute = (k, v) => { node.attrs[k] = v; };
  node.removeAttribute = (k) => { delete node.attrs[k]; };
  node.addEventListener = (type, fn) => { (node.listeners[type] = node.listeners[type] || []).push(fn); };
  node.querySelectorAll = (sel) => {
    const out = [];
    const walk = (n) => { if (match(n, sel)) out.push(n); n.children.forEach(walk); };
    node.children.forEach(walk);
    return out;
  };
  node.querySelector = (sel) => node.querySelectorAll(sel)[0] || null;
  node.closest = (sel) => { let n = node; while (n) { if (match(n, sel)) return n; n = n.parent; } return null; };
  (children || []).forEach((kid) => { kid.parent = node; });
  return node;
}
function match(n, sel) {
  if (sel === 'article.hack') return n.tagName === 'article' && String(n.attrs.class || '').split(/\s+/).indexOf('hack') >= 0;
  if (sel === '.hack-tools' || sel === '.hack-up' || sel === '.hack-down') return false;
  const m = /^\[data-param="([^"]+)"\]$/.exec(sel);
  return !!(m && n.attrs['data-param'] === m[1]);
}
const cutoff = el('input', { 'data-param': 'cutoff', 'data-dial': 'cutoff', value: '0' });
const stack = el('div', { id: 'hack-stack' }, [
  el('article', { class: 'hack', 'data-id': 'lowpass-1', 'data-type': 'lowpass', 'data-primary': '1' }, [cutoff]),
  el('article', { class: 'hack hack-fixed', 'data-id': 'limiter', 'data-type': 'limiter', 'data-fixed': '1' }, [])
]);
const page = { console, Math, JSON, Object, Array, parseInt, parseFloat };
page.window = page;
page.document = { getElementById: (id) => (id === 'hack-stack' ? stack : null) };
page.NCHacks = { Q: 0.7071067811865476 };
page.localStorage = { getItem: () => null };
page.location = { search: '' };
vm.createContext(page);
vm.runInContext(readFileSync(join(root, 'create/hacks/stack.js'), 'utf8'), page);
let dials = 0, changes = 0;
page.NCStack.install({ onDial: () => { dials++; }, onChange: () => { changes++; } });
page.NCStack.applyStart([{ type: 'lowpass', value: 500, ramp: 200, params: { cutoff: 75 } }]);
const started = page.NCStack.chain();
ok(started[0].auto && started[0].auto.from === 500 && started[0].auto.to === 200, 'the written arrow is on the chain');
const beforeFollow = changes;
page.NCStack.follow(1);
ok(changes === beforeFollow, 'following the glide does not count as a hand on the dial');
ok(cutoff.value !== '75', 'the cutoff dial moves to the end of the glide (' + cutoff.value + ')');
ok(page.NCStack.chain()[0].auto && page.NCStack.chain()[0].auto.from === 500, 'the moving dial still saves the whole glide');
stack.listeners.input.forEach((fn) => fn({ target: cutoff }));
ok(dials === 1 && !page.NCStack.chain()[0].auto, 'a hand on the cutoff dial cancels the glide');

function wav(path, left, right) {
  const n = left.length;
  const data = Buffer.alloc(44 + n * 4);
  data.write('RIFF', 0);
  data.writeUInt32LE(36 + n * 4, 4);
  data.write('WAVE', 8);
  data.write('fmt ', 12);
  data.writeUInt32LE(16, 16);
  data.writeUInt16LE(1, 20);
  data.writeUInt16LE(2, 22);
  data.writeUInt32LE(SR, 24);
  data.writeUInt32LE(SR * 4, 28);
  data.writeUInt16LE(4, 32);
  data.writeUInt16LE(16, 34);
  data.write('data', 36);
  data.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const a = Math.max(-1, Math.min(1, left[i]));
    const b = Math.max(-1, Math.min(1, right[i]));
    data.writeInt16LE(a < 0 ? Math.round(a * 32768) : Math.round(a * 32767), 44 + i * 4);
    data.writeInt16LE(b < 0 ? Math.round(b * 32768) : Math.round(b * 32767), 44 + i * 4 + 2);
  }
  writeFileSync(path, data);
}
let outDir = null;
try { mkdirSync('/opt/cursor/artifacts', { recursive: true }); outDir = '/opt/cursor/artifacts'; } catch (err) { outDir = null; }
if (outDir) {
  const parkedWav = join(outDir, 'lp500-parked.wav');
  const glideWav = join(outDir, 'lp500-glide.wav');
  wav(parkedWav, parked[0], parked[1]);
  wav(glideWav, glided[0], glided[1]);
  for (const [src, name] of [[parkedWav, 'lp500-parked.mp3'], [glideWav, 'lp500-glide.mp3']]) {
    const enc = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-c:a', 'libmp3lame', '-b:a', '192k', join(outDir, name)], { encoding: 'utf8' });
    ok(enc.status === 0, 'encoded ' + name + (enc.stderr ? ' ' + enc.stderr : ''));
  }
} else ok(true, 'no artifact directory here; the render checks still ran');

if (fails) {
  console.error(fails + ' failed');
  process.exit(1);
}
console.log('glide ok');
