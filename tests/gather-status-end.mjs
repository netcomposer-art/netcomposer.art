// The Gather status line is repeated under the gathered list (Petrus,
// 2026-10-21), so someone who scrolls on to Perform still sees it. Both
// lines must say the same thing at every step, and both Stops must work.
//
// Headless Chrome, a stubbed Gather whose progress the test steps by hand.
// Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (global
// WebSocket; on Node 20 run with --experimental-websocket).
// SHOTS=/some/dir saves a mid-gather screenshot there.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://nc-perform-api.psemme.workers.dev';
const G = 'g-statusstatus';
const SYMS = ['Dm9', 'G13', 'Cadd9', 'Fmaj7', 'Am9', 'E7', 'Bm7b5', 'C6'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}
function wav(seconds) {
  const rate = 8000, n = Math.round(seconds * rate), b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(3000 * Math.sin(i / 9)), 44 + i * 2);
  return b;
}
const row = (s, i) => ({
  id: 'c' + i, clip_id: 'c' + i, pos: i, chord: i, symbol: s, title: s + ' test clip', supplier: i % 2 ? 'Musicmatter' : 'the University of Iowa',
  license: i % 2 ? 'CC-BY-SA-4.0' : 'PD', preview_url: `${API}/api/jobs/${G}/audio/c${i}`, url: `${API}/api/jobs/${G}/audio/c${i}`,
  start_s: 0, end_s: 4, duration_s: 4, gain_db: -3, loudness_lufs: -17
});
const ROWS = SYMS.map(row);

const chrome = chromeBin();
if (!chrome) { console.log('gather status skipped (no Chrome; set CHROME)'); process.exit(0); }
if (typeof WebSocket === 'undefined') { console.log('gather status skipped (Node 22, or node --experimental-websocket)'); process.exit(0); }

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch (e) { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const httpPort = server.address().port;
const dbgPort = 9800 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
  '--remote-debugging-address=127.0.0.1', `--remote-debugging-port=${dbgPort}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-gstatus-'))}`,
  '--window-size=1100,1400', 'about:blank'], { stdio: 'ignore' });

const problems = [];
function check(cond, msg) { if (!cond) problems.push(msg); }
let ws, seq = 0, cancels = 0;
const pending = new Map();
function send(method, params = {}) {
  const id = ++seq;
  return new Promise((ok, no) => { pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
}
// The page's EventSource is a stub the test drives: window.__push(obj).
const fakeES = `window.EventSource = function (url) { var s = this; s.url = url; s.readyState = 1; window.__es = s; };
window.EventSource.prototype.close = function () { this.readyState = 2; };
window.__push = function (o) { var s = window.__es; if (s && s.readyState !== 2 && s.onmessage) s.onmessage({data: JSON.stringify(o)}); };`;

async function open() {
  const target = await (await fetch(`http://127.0.0.1:${dbgPort}/json/new?about:blank`, { method: 'PUT' })).json();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  ws.addEventListener('message', async (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { ok, no } = pending.get(msg.id); pending.delete(msg.id);
      if (msg.error) no(new Error(JSON.stringify(msg.error))); else ok(msg.result || {});
      return;
    }
    if (msg.method !== 'Fetch.requestPaused') return;
    const { requestId, request } = msg.params;
    const u = new URL(request.url);
    const cors = [{ name: 'access-control-allow-origin', value: '*' }, { name: 'access-control-allow-headers', value: '*' }, { name: 'access-control-allow-methods', value: '*' }];
    const json = (obj, code = 200) => send('Fetch.fulfillRequest', { requestId, responseCode: code, responseHeaders: [...cors, { name: 'content-type', value: 'application/json' }], body: Buffer.from(JSON.stringify(obj)).toString('base64') });
    if (request.method === 'OPTIONS') return send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: cors });
    if (u.pathname === '/api/config') return json({ turnstile_required: false, max_words: 4000, max_length_s: 180, perform_enabled: true, browser_assembly: true });
    if (u.pathname === '/api/gather') {
      const body = JSON.parse(request.postData || '{}');
      if (body.probe) return json({}, 403);
      return json({ id: G, gather_id: G, claim_token: 'claim-x', state: 'queued', status: 'queued', pending: true, sounds: [], poll: '/api/jobs/' + G }, 202);
    }
    if (/\/cancel$/.test(u.pathname)) { cancels++; return json({ ok: true }); }
    if (/\/audio\/c\d$/.test(u.pathname)) return send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [...cors, { name: 'content-type', value: 'audio/wav' }], body: wav(4).toString('base64') });
    return json({}, u.pathname === '/api/warm' ? 200 : 404);
  });
  await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: API + '/*' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1400, deviceScaleFactor: 1, mobile: false });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: fakeES });
  await send('Page.navigate', { url: `http://127.0.0.1:${httpPort}/create/` });
  const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
  const until = async (expression, ms = 15000) => {
    for (let t = 0; t < ms; t += 100) { if (await ev(expression)) return true; await sleep(100); }
    return false;
  };
  await until("!!(document.body && window.NC && document.getElementById('comp'))");
  await ev(`(() => { var c = document.getElementById('comp'); c.value = ${JSON.stringify(SYMS.join(' '))}; c.dispatchEvent(new Event('input', {bubbles: true})); })()`);
  await until("(() => { var b = document.getElementById('gatherBtn'); return b && !b.hidden && !b.disabled; })()");
  return { ev, until };
}
// Both lines as the eye sees them.
const lines = (ev) => ev(`(() => {
  var vis = function (e) { return !!e && !e.hidden && e.getClientRects().length > 0 && getComputedStyle(e).display !== 'none'; };
  var top = document.getElementById('gather-line'), end = document.getElementById('gather-line-end');
  var ts = document.getElementById('gather-stop'), es = document.getElementById('gather-stop-end');
  var box = document.getElementById('gather-box');
  return {
    top: document.getElementById('gather-status').textContent, end: document.getElementById('gather-status-end').textContent,
    topCls: document.getElementById('gather-status').className, endCls: document.getElementById('gather-status-end').className,
    endShown: vis(end), topStop: vis(ts), endStop: vis(es), topDis: ts.disabled, endDis: es.disabled,
    below: vis(end) && vis(box) ? end.getBoundingClientRect().top >= box.getBoundingClientRect().bottom - 1 : null,
    items: document.querySelectorAll('#gather-list li').length
  };
})()`);
function same(s, tag) {
  check(s.top === s.end, tag + ': the two lines differ: "' + s.top + '" vs "' + s.end + '"');
  check(s.topCls === s.endCls, tag + ': the two lines differ in style: ' + s.topCls + ' vs ' + s.endCls);
  check(s.topStop === s.endStop, tag + ': one Stop shows and the other does not');
  check(s.topDis === s.endDis, tag + ': one Stop is disabled and the other is not');
}

try {
  await sleep(600);
  // 1. Gather to the end, checking at every step.
  let { ev, until } = await open();
  let s = await lines(ev);
  check(!s.endShown, 'before Gather the bottom line stays hidden (no list yet)');
  await ev("document.getElementById('gatherBtn').click()");
  await until("!!window.__es");
  for (let k = 1; k <= 5; k++) {
    await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', found_sounds: ROWS.slice(0, k) })})`);
    await sleep(120);
    s = await lines(ev);
    same(s, 'progress ' + k);
    check(s.endShown && s.below, 'progress ' + k + ': the bottom line shows under the list');
    check(s.topStop && s.endStop, 'progress ' + k + ': both Stops show while gathering');
    check(/^Gathering/.test(s.top), 'progress ' + k + ': top says Gathering…, got ' + s.top);
  }
  if (process.env.SHOTS) {
    mkdirSync(process.env.SHOTS, { recursive: true });
    await ev("window.scrollTo(0, document.getElementById('gather').getBoundingClientRect().top + scrollY - 20)");
    await sleep(150);
    const r = await ev("(() => { var a = document.getElementById('gather').getBoundingClientRect(), b = document.getElementById('gather-line-end').getBoundingClientRect(); return {y: a.top + scrollY - 20, h: b.bottom - a.top + 50}; })()");
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: r.y, width: 1100, height: r.h, scale: 1 } });
    writeFileSync(join(process.env.SHOTS, 'gather-mid-both-indicators.png'), Buffer.from(shot.data, 'base64'));
  }
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'done', claim_token: 'claim-x', clock: null, sounds: ROWS, found_sounds: ROWS })})`);
  await until("document.getElementById('gather-status').textContent === 'Gathered.'");
  await sleep(200);
  s = await lines(ev);
  same(s, 'done');
  check(s.end === 'Gathered.' && s.endShown, 'done: the bottom line says Gathered. too');
  check(!s.topStop && !s.endStop, 'done: both Stops hide');
  if (process.env.SHOTS) {
    const r = await ev("(() => { var a = document.getElementById('gather').getBoundingClientRect(), b = document.getElementById('gather-line-end').getBoundingClientRect(); return {y: a.top + scrollY - 20, h: b.bottom - a.top + 90}; })()");
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: r.y, width: 1100, height: r.h, scale: 1 } });
    writeFileSync(join(process.env.SHOTS, 'gather-done-both-indicators.png'), Buffer.from(shot.data, 'base64'));
  }
  ws.close();

  // 2. The bottom Stop stops the Gather, exactly like the top one.
  ({ ev, until } = await open());
  await ev("document.getElementById('gatherBtn').click()");
  await until("!!window.__es");
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', found_sounds: ROWS.slice(0, 3) })})`);
  await sleep(120);
  s = await lines(ev);
  same(s, 'before bottom Stop');
  check(s.endStop, 'the bottom Stop shows mid-gather');
  const before = cancels;
  await ev("document.getElementById('gather-stop-end').click()");
  await until("document.getElementById('gather-status').textContent === 'Stopped.'");
  await sleep(150);
  s = await lines(ev);
  check(cancels === before + 1, 'the bottom Stop sends one cancel, sent ' + (cancels - before));
  same(s, 'after bottom Stop');
  check(s.top === 'Stopped.' && !s.topStop && !s.endStop, 'after Stop both lines say Stopped. and both Stops hide');
  check(s.endShown === (s.items > 0), 'after Stop the bottom line shows only with a list');
  ws.close();
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('gather status end ok');
