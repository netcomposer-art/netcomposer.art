// Every stored fingerprint on the site is recomputed here and must match.
// Composition pins are the sha256 of the file's bytes. record_hash is the
// sha256 of the record in canonical JSON (sorted keys, no whitespace,
// non-ASCII kept), without record_hash and signature, the same bytes as
// json.dumps(r, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
// in Python (record/index.html). Numbers keep Python's spelling: an integer
// stays as written, a float is printed the way Python's repr prints it.
import { readFileSync, readdirSync, statSync } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const read = (p) => readFileSync(join(root, p), 'utf8');

// A JSON reader that remembers whether each number was an integer or a float.
class Num { constructor(text) { this.text = text; } }
function parse(text) {
  let i = 0;
  const ws = () => { while (/\s/.test(text[i])) i++; };
  function value() {
    ws();
    const c = text[i];
    if (c === '{') {
      i++; const o = Object.create(null); ws();
      if (text[i] === '}') { i++; return o; }
      for (;;) { ws(); const k = str(); ws(); i++; o[k] = value(); ws(); if (text[i++] === '}') return o; }
    }
    if (c === '[') {
      i++; const a = []; ws();
      if (text[i] === ']') { i++; return a; }
      for (;;) { a.push(value()); ws(); if (text[i++] === ']') return a; }
    }
    if (c === '"') return str();
    const m = /^-?\d+(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i, i + 64));
    if (m) { i += m[0].length; return new Num(m[0]); }
    for (const [w, v] of [['true', true], ['false', false], ['null', null]]) if (text.startsWith(w, i)) { i += w.length; return v; }
    throw new Error('bad JSON at ' + i);
  }
  function str() {
    const start = i; i++;
    while (text[i] !== '"') i += text[i] === '\\' ? 2 : 1;
    i++;
    return JSON.parse(text.slice(start, i));
  }
  const v = value(); ws();
  if (i !== text.length) throw new Error('trailing JSON at ' + i);
  return v;
}
function pyFloat(x) {
  if (Number.isInteger(x) && Math.abs(x) < 1e16) return x.toFixed(1);
  const [digits, exp] = x.toExponential().split('e');
  const e = +exp;
  if (e < -4 || e >= 16) return digits + 'e' + (e < 0 ? '-' : '+') + String(Math.abs(e)).padStart(2, '0');
  return String(x);
}
function canon(v) {
  if (v instanceof Num) return /[.eE]/.test(v.text) ? pyFloat(Number(v.text)) : BigInt(v.text).toString();
  if (v === null || typeof v === 'boolean') return String(v);
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  const keys = Object.keys(v).sort((a, b) => {
    const A = [...a].map((ch) => ch.codePointAt(0)), B = [...b].map((ch) => ch.codePointAt(0));
    for (let k = 0; k < Math.min(A.length, B.length); k++) if (A[k] !== B[k]) return A[k] - B[k];
    return A.length - B.length;
  });
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
}
export function recordHash(text) {
  const r = parse(text);
  delete r.record_hash; delete r.signature;
  return sha(Buffer.from(canon(r), 'utf8'));
}

// The Python spelling of floats, checked on the awkward cases.
for (const [x, want] of [[1.5, '1.5'], [125, '125.0'], [0.0001, '0.0001'], [0.00001, '1e-05'], [1e16, '1e+16'], [123456789.125, '123456789.125'], [-0.5, '-0.5']])
  check(pyFloat(x) === want, `float ${x} prints ${pyFloat(x)}, want ${want}`);

// Compositions: every file under composition/ is listed, current or prior, with its sha256.
const walk = (dir) => readdirSync(join(root, dir)).flatMap((n) => statSync(join(root, dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]);
const compFiles = walk('composition').filter((p) => p.endsWith('.md'));
const fileSha = new Map(compFiles.map((p) => [p, sha(readFileSync(join(root, p)))]));
const site = JSON.parse(read('netcomposer.json'));
const local = (url) => url.replace(/^https:\/\/netcomposer\.art\//, '');
const listed = new Map();
for (const c of site.compositions) {
  for (const e of [c, ...(c.prior || [])]) {
    const p = local(e.text);
    listed.set(p, e.sha256);
    check(fileSha.has(p), `netcomposer.json lists ${p}, which is not in composition/`);
    if (fileSha.has(p)) check(fileSha.get(p) === e.sha256, `${p}: netcomposer.json says ${e.sha256.slice(0, 12)}, the file is ${fileSha.get(p).slice(0, 12)}`);
  }
}
for (const p of compFiles) check(listed.has(p), `${p} has no sha256 in netcomposer.json`);
const pinned = new Set(listed.values());

// Records: recompute record_hash; the pin names a listed Composition; every copy of the hash agrees.
const records = readdirSync(join(root, 'records')).filter((n) => n.endsWith('.json'));
const siteHash = new Map();
for (const c of site.compositions) for (const perf of c.performances || []) if (perf.record) siteHash.set(local(perf.record.json), perf.record.record_hash_sha256);
let count = 0;
for (const n of records) {
  const p = 'records/' + n, text = read(p), r = JSON.parse(text);
  if (r.record_type !== 'netcomposer.performance_record') continue;
  count++;
  const got = recordHash(text), stored = r.record_hash && r.record_hash.value;
  check(got === stored, `${p}: record_hash is ${String(stored).slice(0, 12)}, recomputed ${got.slice(0, 12)}`);
  const pin = r.performance && r.performance.composition_ref && r.performance.composition_ref.sha256;
  check(pinned.has(pin), `${p}: composition pin ${String(pin).slice(0, 12)} matches no Composition file`);
  check(siteHash.get(p) === stored, `${p}: netcomposer.json has ${String(siteHash.get(p)).slice(0, 12)}`);
  const base = p.replace(/\.json$/, '');
  for (const ext of ['.md', '.html']) {
    let page; try { page = read(base + ext); } catch (e) { continue; }
    // The status line shows the current hash; the last amendment's "new" is the current hash too.
    const shown = [...page.matchAll(/· record hash (?:<code>|`)([0-9a-f]{8,64})…/g)].map((m) => m[1]);
    check(shown.length === 1 && stored.startsWith(shown[0]), `${base + ext} shows record hash ${shown.join(', ')}`);
    const news = [...page.matchAll(/Previous record hash (?:<code>|`)([0-9a-f]{8,64})…(?:<\/code>|`), new (?:<code>|`)([0-9a-f]{8,64})…/g)];
    const amends = r.amendments || [];
    check(news.length === amends.length, `${base + ext} lists ${news.length} amendments, the record has ${amends.length}`);
    news.forEach((m, k) => check(amends[k] && amends[k].previous_record_hash.startsWith(m[1]), `${base + ext}: amendment ${k + 1} previous hash ${m[1]}`));
    if (news.length) check(stored.startsWith(news[news.length - 1][2]), `${base + ext}: the last amendment's new hash is not the current one`);
  }
  (r.amendments || []).forEach((a, k) => check(/^[0-9a-f]{64}$/.test(a.previous_record_hash) && a.previous_record_hash !== stored, `${p}: amendment ${k + 1} keeps a previous hash`));
}
check(count === siteHash.size && count > 0, `${count} records, netcomposer.json lists ${siteHash.size}`);

// The record format page quotes bwv846-walk: its pin and its hash.
const walkRec = JSON.parse(read('records/bwv846-walk.json'));
const fmt = read('record/index.html');
check(fmt.includes(`&quot;value&quot;: &quot;${walkRec.record_hash.value}&quot;`), 'record/index.html quotes the current bwv846-walk record_hash');
check(fmt.includes(`&quot;sha256&quot;: &quot;${walkRec.performance.composition_ref.sha256}&quot;`), 'record/index.html quotes the current bwv846-walk composition pin');

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`fingerprints ok: ${compFiles.length} compositions, ${count} records`);
