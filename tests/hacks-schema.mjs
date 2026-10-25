// Schema 2 and 3. The chain the Live page builds must validate, and a ninth
// track must not. Run: node tests/hacks-schema.mjs
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const ok = (c, m) => { if (!c) { problems.push(m); console.log('FAIL', m); } else console.log('ok  ', m); };

const box = { console, Math, JSON, Object, Array };
box.window = box;
box.globalThis = box;
box.module = { exports: {} };
vm.createContext(box);
vm.runInContext(readFileSync(join(root, 'create/hacks/validate.js'), 'utf8'), box);
const V = box.NCChainValidate;
ok(V && V === box.module.exports, 'validator is NCChainValidate and module.exports');

function el(tag, attrs, children) {
  const node = {
    tagName: tag,
    attrs: Object.assign({}, attrs),
    children: children || [],
    value: attrs && attrs.value != null ? String(attrs.value) : '',
    textContent: (attrs && attrs.text) || '',
    options: [],
    selectedIndex: 0
  };
  node.getAttribute = (k) => (k in node.attrs && node.attrs[k] != null ? String(node.attrs[k]) : null);
  node.hasAttribute = (k) => Object.prototype.hasOwnProperty.call(node.attrs, k);
  node.querySelectorAll = (sel) => {
    const out = [];
    const walk = (n) => {
      if (match(n, sel)) out.push(n);
      n.children.forEach(walk);
    };
    node.children.forEach(walk);
    return out;
  };
  node.querySelector = (sel) => node.querySelectorAll(sel)[0] || null;
  return node;
}
function match(n, sel) {
  if (sel === 'article.hack') {
    return n.tagName === 'article' && String(n.attrs.class || '').split(/\s+/).indexOf('hack') >= 0;
  }
  const m = /^\[data-param="([^"]+)"\]$/.exec(sel);
  return !!(m && n.attrs['data-param'] === m[1]);
}
function input(param, value) {
  return el('input', { 'data-param': param, value: value });
}
function select(param, value, text) {
  const node = el('select', { 'data-param': param });
  node.options = [{ value: String(value), textContent: text }];
  node.selectedIndex = 0;
  return node;
}
const stack = el('div', { id: 'hack-stack' }, [
  el('article', { class: 'hack', id: 'hack-lp', 'data-id': 'lowpass-1', 'data-type': 'lowpass', 'data-primary': '1' }, [
    input('cutoff', '0')
  ]),
  el('article', { class: 'hack', id: 'hack-delay', 'data-id': 'delay-1', 'data-type': 'delay', 'data-primary': '1' }, [
    select('delay_beats', '0.75', '1/8 dotted'),
    input('feedback', '35'),
    input('wet', '0')
  ]),
  el('article', { class: 'hack', id: 'hack-plate', 'data-id': 'plate-1', 'data-type': 'plate', 'data-primary': '1' }, [
    input('predelay', '0'),
    input('size', '50'),
    input('decay', '50'),
    input('damping', '0'),
    input('mix', '0')
  ]),
  el('article', { class: 'hack hack-fixed', id: 'hack-limiter', 'data-id': 'limiter', 'data-type': 'limiter', 'data-fixed': '1' }, [])
]);
const ids = { 'hack-stack': stack };
box.document = { getElementById: (id) => ids[id] || null };
box.NCHacks = { Q: 0.7071067811865476 };
vm.runInContext(readFileSync(join(root, 'create/hacks/stack.js'), 'utf8'), box);
const chain = box.NCStack.chain();
ok(chain.length === 4 && chain[3].type === 'limiter' && chain[3].fixed === true, 'NCStack.chain() is three hacks and the limiter');
const wrapped = { schema: 2, chain: chain };
const got = V.check(wrapped);
ok(got.ok, 'NCStack.chain() validates as schema 2' + (got.ok ? '' : ': ' + got.error));
ok(got.ok && got.value.chain[0].params.cutoff_hz === null, 'open low-pass keeps a null cutoff');
ok(got.ok && !got.value.chain.some((h) => h.auto), 'schema 2 chain has no glide');

function hack(type, n, params, extra) {
  return Object.assign({
    id: type + '-' + n, type: type, version: 1, bypass: false, params: params || {}
  }, extra || {});
}
const limiter = { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: { ceiling_db: -1, lookahead_s: 0.0015 } };
const glide = { param: 'cutoff_hz', from: 500, to: 200, over: 'piece' };

const emptyTracks = V.check({ schema: 3, master: { chain: [hack('lowpass', 1), limiter] }, tracks: { t1: { chain: [] } } });
ok(emptyTracks.ok && emptyTracks.value.tracks.t1.chain.length === 0, 'an empty track chain is valid');

const withGlide = V.check({
  schema: 3,
  master: { chain: [Object.assign(hack('lowpass', 1, { cutoff: 75, cutoff_hz: 500 }), { auto: glide }), limiter] },
  tracks: {}
});
ok(withGlide.ok && withGlide.value.master.chain[0].auto.to === 200, 'schema 3 keeps a whole-piece glide');

const nine = { schema: 3, master: { chain: [limiter] }, tracks: {} };
for (let i = 1; i <= 9; i++) nine.tracks['t' + i] = { chain: [] };
const tooMany = V.check(nine);
ok(!tooMany.ok && /8 tracks/.test(tooMany.error), 'a ninth track is refused: ' + (tooMany.error || ''));

const noLim = V.check({ schema: 2, chain: [hack('lowpass', 1)] });
ok(!noLim.ok && /limiter/.test(noLim.error), 'a master chain without the limiter fails');

const autoOn2 = V.check({ schema: 2, chain: [Object.assign(hack('lowpass', 1), { auto: glide }), limiter] });
ok(!autoOn2.ok && /schema 3/.test(autoOn2.error), 'schema 2 refuses a glide');

const trackLim = V.check({ schema: 3, master: { chain: [limiter] }, tracks: { t2: { chain: [limiter] } } });
ok(!trackLim.ok && /no limiter/.test(trackLim.error), 'a track chain refuses the limiter');

const parked = V.check({
  schema: 3,
  master: { chain: [Object.assign(hack('delay', 1, { wet: 0 }), { auto: { param: 'wet', from: 0, to: 1, over: 'piece' } }), limiter] }
});
ok(!parked.ok && /cutoff_hz or centre_hz/.test(parked.error), 'only a filter frequency glides');

const bar = V.check({
  schema: 3,
  master: { chain: [Object.assign(hack('lowpass', 1), { auto: { param: 'cutoff_hz', from: 500, to: 200, over: 'bar' } }), limiter] }
});
ok(!bar.ok && /whole piece/.test(bar.error), 'a glide covers the whole piece');

const zero = V.check({
  schema: 3,
  master: { chain: [Object.assign(hack('bandpass', 1), { auto: { param: 'centre_hz', from: 0, to: 800, over: 'piece' } }), limiter] }
});
ok(!zero.ok && /above 0/.test(zero.error), 'a glide needs frequencies above 0');

const html = readFileSync(join(root, 'create/index.html'), 'utf8');
ok(html.indexOf('hacks/validate.js') > html.indexOf('hacks/engine.js'), 'the page loads the validator after the engine');
const schema = JSON.parse(readFileSync(join(root, 'create/hacks/chain.schema.json'), 'utf8'));
ok(schema.$defs.schema3.properties.schema.const === 3 && schema.$defs.schema2.properties.schema.const === 2, 'the schema file names schema 2 and schema 3');

if (problems.length) {
  console.error(problems.length + ' failed');
  process.exit(1);
}
console.log('schema ok');
