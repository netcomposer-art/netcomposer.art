// The Gather status line is repeated in the Perform row, in the slot where
// "Gather first." is (Petrus, 2026-10-21), so someone who scrolls on to
// Perform still sees it. Both lines must say the same thing at every step,
// and both Stops must work. The slot shows "Gather first." again when no
// Gather is running and nothing is gathered.
//
// Each line also shows a percentage and a thin bar while gathering (Petrus,
// 2026-10-21): found of total chords, never backwards, 100 only at done.
// When the service sends its finer progress (progress, progress_stage,
// progress_done, progress_total), that number is shown instead.
//
// Headless Chrome, a stubbed Gather whose progress the test steps by hand.
// Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (global
// WebSocket; on Node 20 run with --experimental-websocket).
// SHOTS=/some/dir saves mid-gather and done screenshots there (desktop and phone).
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

async function open(view = { width: 1100 }, prep = '') {
  // Chrome can take a moment to open its debugging port under load.
  let target;
  for (let i = 0; ; i++) {
    try { target = await (await fetch(`http://127.0.0.1:${dbgPort}/json/new?about:blank`, { method: 'PUT' })).json(); break; }
    catch (e) { if (i >= 50) throw e; await sleep(200); }
  }
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
  await send('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.mobile ? 844 : 1400, deviceScaleFactor: view.mobile ? 2 : 1, mobile: !!view.mobile });
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
  if (prep) await ev(prep);
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
    inRow: !!end.closest('#perform-row'),
    oldGone: !document.querySelector('#gather > #gather-line-end, #gather-box + #gather-line-end'),
    wait: vis(document.getElementById('perform-wait')) ? document.getElementById('perform-wait').textContent : '',
    btn: (function () { var r = document.getElementById('performBtn').getBoundingClientRect(); return Math.round(r.left) + ',' + Math.round(r.top - document.getElementById('perform-h').getBoundingClientRect().top); })(),
    rowFits: (function () { var row = document.getElementById('perform-row').getBoundingClientRect(); return !vis(end) || end.getBoundingClientRect().right <= row.right + 1; })(),
    items: document.querySelectorAll('#gather-list li').length,
    pct: vis(document.getElementById('gather-pct')) ? document.getElementById('gather-pct').textContent : '',
    pctEnd: vis(document.getElementById('gather-pct-end')) ? document.getElementById('gather-pct-end').textContent : '',
    bar: vis(document.getElementById('gather-bar')) ? document.getElementById('gather-fill').style.width : '',
    barEnd: vis(document.getElementById('gather-bar-end')) ? document.getElementById('gather-fill-end').style.width : '',
    barH: vis(document.getElementById('gather-bar')) ? document.querySelector('#gather-bar .gtrack').getBoundingClientRect().height : 0,
    now: document.getElementById('gather-bar').getAttribute('aria-valuenow'),
    role: document.getElementById('gather-bar').getAttribute('role'),
    under: vis(document.getElementById('gather-bar')) ? document.getElementById('gather-bar').getBoundingClientRect().top >= document.getElementById('gather-status').getBoundingClientRect().bottom - 1 : false,
    roles: document.querySelectorAll('[role=progressbar]').length,
    endHidden: document.getElementById('gather-bar-end').getAttribute('aria-hidden') === 'true' && document.getElementById('gather-pct-end').getAttribute('aria-hidden') === 'true'
  };
})()`);
function same(s, tag) {
  check(s.top === s.end, tag + ': the two lines differ: "' + s.top + '" vs "' + s.end + '"');
  check(s.topCls === s.endCls, tag + ': the two lines differ in style: ' + s.topCls + ' vs ' + s.endCls);
  check(s.topStop === s.endStop, tag + ': one Stop shows and the other does not');
  check(s.topDis === s.endDis, tag + ': one Stop is disabled and the other is not');
  check(s.pct === s.pctEnd && s.bar === s.barEnd, tag + ': the two percentages differ: ' + s.pct + '/' + s.bar + ' vs ' + s.pctEnd + '/' + s.barEnd);
}
const pctOf = (k) => Math.min(99, Math.floor(100 * k / SYMS.length)) + '%';
// From the Gather heading down to the Perform row.
async function shoot(ev, name, view, extra = 30) {
  if (!process.env.SHOTS) return;
  mkdirSync(process.env.SHOTS, { recursive: true });
  await ev("window.scrollTo(0, document.getElementById('gather').getBoundingClientRect().top + scrollY - 20)");
  await sleep(350);
  const r = await ev("(() => { var a = document.getElementById('gather').getBoundingClientRect(), b = document.getElementById('perform-row').getBoundingClientRect(); return {y: a.top + scrollY - 20, h: b.bottom - a.top + " + extra + "}; })()");
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: r.y, width: view.width, height: r.h, scale: 1 } });
  writeFileSync(join(process.env.SHOTS, name), Buffer.from(shot.data, 'base64'));
}

try {
  await sleep(600);
  // 1. Gather to the end, checking at every step.
  let { ev, until } = await open();
  let s = await lines(ev);
  check(!s.endShown && s.wait === 'Gather first.', 'before Gather the Perform slot says Gather first., got ' + JSON.stringify([s.endShown, s.wait]));
  check(s.inRow && s.oldGone, 'the copy lives in the Perform row, not under the list');
  const idleBtn = s.btn;
  await shoot(ev, 'gather-perform-idle-desktop.png', { width: 1100 });
  await ev("document.getElementById('gatherBtn').click()");
  await until("!!window.__es");
  s = await lines(ev);
  check(s.pct === '0%' && s.now === '0', 'at the start the total is known: 0%, got ' + s.pct + ' / ' + s.now);
  check(s.role === 'progressbar' && s.roles === 1 && s.endHidden, 'one progressbar (top), the bottom copy aria-hidden');
  let last = 0;
  const seen = [];
  for (let k = 1; k <= SYMS.length; k++) {
    await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', percent: 40, found_sounds: ROWS.slice(0, k) })})`);
    await sleep(120);
    s = await lines(ev);
    same(s, 'progress ' + k);
    check(s.endShown && s.inRow && s.wait === '', 'progress ' + k + ': the Perform slot shows the status instead of Gather first.');
    check(s.btn === idleBtn, 'progress ' + k + ': the Perform button moved: ' + idleBtn + ' -> ' + s.btn);
    check(s.rowFits, 'progress ' + k + ': the status runs past the Perform row');
    check(s.topStop && s.endStop, 'progress ' + k + ': both Stops show while gathering');
    check(s.top === 'Gathering…', 'progress ' + k + ': top says Gathering…, got ' + s.top);
    check(s.pct === pctOf(k) && s.bar === pctOf(k) && s.now === String(parseInt(pctOf(k))), 'progress ' + k + ': want ' + pctOf(k) + ', got ' + s.pct + ' bar ' + s.bar + ' aria ' + s.now);
    check(Math.abs(s.barH - 2) < 0.6, 'progress ' + k + ': the bar is 2 px, got ' + s.barH);
    check(s.under, 'progress ' + k + ': the bar sits under the status text');
    check(parseInt(s.pct) >= last, 'progress ' + k + ': went backwards ' + last + ' -> ' + s.pct);
    check(parseInt(s.pct) < 100, 'progress ' + k + ': 100% before done');
    last = parseInt(s.pct); seen.push(s.pct);
    if (k === 5) {
      await shoot(ev, 'gather-perform-mid-desktop.png', { width: 1100 });
      // A late message with fewer rows must not pull it back.
      await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', found_sounds: ROWS.slice(0, 2) })})`);
      await sleep(120);
      s = await lines(ev);
      check(s.pct === pctOf(5), 'an older progress message pulled the % back to ' + s.pct);
    }
  }
  // All found, still copying: 99, not 100.
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', stage_line: 'Copying the recordings…', found_sounds: ROWS })})`);
  await sleep(120);
  s = await lines(ev);
  same(s, 'copying');
  check(s.pct === '99%', 'while copying it holds at 99%, got ' + s.pct);
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'done', claim_token: 'claim-x', clock: null, sounds: ROWS, found_sounds: ROWS })})`);
  await until("document.getElementById('gather-status').textContent === 'Gathered.'");
  await sleep(200);
  s = await lines(ev);
  same(s, 'done');
  check(!s.endShown && s.wait === '', 'done: the Perform slot is as it is after a Gather (no Gather first., no status)');
  check(!s.topStop && !s.endStop, 'done: both Stops hide');
  check(s.pct === '' && s.bar === '' && s.now === '100', 'done: Gathered. with no % or bar, aria 100; got ' + s.pct + ' / ' + s.bar + ' / ' + s.now);
  await shoot(ev, 'gather-perform-done-desktop.png', { width: 1100 });
  console.log('  steps: ' + seen.join(' ') + ' 99% (copying) Gathered.');
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
  check(!s.endShown && s.wait === 'Gather first.', 'after Stop with nothing gathered the Perform slot says Gather first. again');
  check(s.pct === '' && s.bar === '', 'after Stop the % and bar hide');
  ws.close();

  // 3. Phone.
  const phone = { width: 390, mobile: true };
  ({ ev, until } = await open(phone));
  s = await lines(ev);
  const phoneBtn = s.btn;
  await shoot(ev, 'gather-perform-idle-phone.png', phone);
  await ev("document.getElementById('gatherBtn').click()");
  await until("!!window.__es");
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', found_sounds: ROWS.slice(0, 5) })})`);
  await sleep(150);
  s = await lines(ev);
  same(s, 'phone');
  check(s.pct === pctOf(5), 'phone: want ' + pctOf(5) + ', got ' + s.pct);
  check(await ev('document.documentElement.scrollWidth <= document.documentElement.clientWidth'), 'phone: the bar never widens the page');
  check(s.btn === phoneBtn && s.rowFits, 'phone: the Perform button stays put and the status fits the row: ' + phoneBtn + ' -> ' + s.btn);
  await shoot(ev, 'gather-perform-mid-phone.png', phone);
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'done', claim_token: 'claim-x', clock: null, sounds: ROWS, found_sounds: ROWS })})`);
  await until("document.getElementById('gather-status').textContent === 'Gathered.'");
  await shoot(ev, 'gather-perform-done-phone.png', phone);
  ws.close();

  // 4. Total unknown: no number, no bar, no fake progress.
  ({ ev, until } = await open({ width: 1100 }, "NC.findChords = function () { return []; }; var tl0 = NC.timeline; NC.timeline = function () { var t = tl0(); return t ? Object.assign({}, t, {chords: []}) : t; };"));
  await ev("document.getElementById('gatherBtn').click()");
  await until("!!window.__es");
  await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', percent: 40, found_sounds: ROWS.slice(0, 3) })})`);
  await sleep(150);
  s = await lines(ev);
  check(s.pct === s.pctEnd && s.bar === s.barEnd, 'unknown total: the two lines differ');
  check(s.top === 'Gathering…' && s.pct === '' && s.bar === '', 'unknown total: Gathering… with no %, got ' + s.top + ' ' + s.pct + ' ' + s.bar);
  ws.close();

  // 5. The service's finer progress, desktop and phone: its number, not the chord steps.
  for (const view of [{ width: 1100 }, { width: 390, mobile: true }]) {
    const tag = view.mobile ? 'phone' : 'desktop';
    ({ ev, until } = await open(view));
    await ev("document.getElementById('gatherBtn').click()");
    await until("!!window.__es");
    const steps = [
      { progress: 3, progress_stage: 'searching', progress_done: 1, progress_total: 8, found: 0, want: '3%' },
      { progress: 15, progress_stage: 'picking', progress_done: 0, progress_total: 8, found: 0, want: '15%' },
      { progress: 21, progress_stage: 'picking', progress_done: 2, progress_total: 8, found: 2, want: '21%' },
      { progress: 40, progress_stage: 'downloading', progress_done: 0, progress_total: 11, found: 8, want: '40%' },
      { progress: 47, progress_stage: 'downloading', progress_done: 3, progress_total: 11, found: 8, want: '47%', shot: true },
      { progress: 44, progress_stage: 'downloading', progress_done: 2, progress_total: 11, found: 8, want: '47%' },
      { progress: 73, progress_stage: 'copying', progress_done: 1, progress_total: 8, found: 8, want: '73%' },
      { progress: 85, progress_stage: 'saving', progress_done: 0, progress_total: 11, found: 8, want: '85%' },
      { progress: 96, progress_stage: 'saving', progress_done: 9, progress_total: 11, found: 8, want: '96%' },
      { progress: 99, progress_stage: 'saving', progress_done: 11, progress_total: 11, found: 8, want: '99%' },
      { progress: 100, progress_stage: 'saving', progress_done: 11, progress_total: 11, found: 8, want: '99%' },
    ];
    let prev = -1;
    const shown = [];
    for (const st of steps) {
      const { found, want, shot, ...fine } = st;
      await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'gathering', percent: 40, found_sounds: ROWS.slice(0, found), ...fine })})`);
      await sleep(120);
      s = await lines(ev);
      same(s, tag + ' fine ' + fine.progress);
      check(s.pct === want && s.bar === want, tag + ': service progress ' + fine.progress + ' should show ' + want + ', got ' + s.pct + ' / ' + s.bar);
      check(parseInt(s.pct) >= prev, tag + ': went backwards at ' + fine.progress);
      check(s.now === String(parseInt(want)), tag + ': aria-valuenow ' + s.now + ' for ' + want);
      prev = parseInt(s.pct);
      shown.push(s.pct);
      if (shot) await shoot(ev, 'gather-fine-mid-' + tag + '.png', view);
    }
    await ev(`window.__push(${JSON.stringify({ id: G, gather_id: G, state: 'done', claim_token: 'claim-x', clock: null, sounds: ROWS, found_sounds: ROWS, progress: 100, progress_stage: 'done' })})`);
    await until("document.getElementById('gather-status').textContent === 'Gathered.'");
    await sleep(200);
    s = await lines(ev);
    same(s, tag + ' fine done');
    check(s.pct === '' && s.now === '100', tag + ': done shows Gathered. with aria 100');
    await shoot(ev, 'gather-fine-done-' + tag + '.png', view);
    if (!view.mobile) console.log('  service steps: ' + shown.join(' ') + ' Gathered.');
    ws.close();
  }
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('gather status end ok');
