// The editable chord strip on /create/, in headless Chrome, with a stubbed
// Gather of five chords (G13 twice). Real pointer drags through CDP.
//
// Regression (Petrus, 2026-10-21): working a lower bar must never change
// the bar above it. Every chord has its own lane and its own id, so two G13s
// stay two chords, and an edit moves only the bar under the pointer.
//
// (harness copied from timeline-strip.mjs) Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (global
// WebSocket; on Node 20 run with --experimental-websocket).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://nc-perform-api.psemme.workers.dev';
const G = 'g-stripstripst';
const SYMS = ['Dm9', 'G13', 'Cadd9', 'G13', 'Am9'];
const LENS = [6.2, 5.1, 8.0, 7.5, 8.0];
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
// Petrus's take (2026-10-21): ten chords, the first three 4 s note stacks
// already at their whole length, short bars stepping down.
const TEN = { syms: ['Dm9', 'G13', 'Cadd9', 'G13', 'Am9', 'Fmaj7', 'E7', 'Bm7b5', 'C6', 'A7'], lens: [4, 4, 4, 7.5, 8, 6, 6, 6, 6, 6] };
let cur = { syms: SYMS, lens: LENS };
const soundsFor = (c) => c.syms.map((s, i) => ({
  id: 'c' + i, clip_id: 'c' + i, pos: i, chord: i, symbol: s, title: s + ' test clip', supplier: i < 2 ? 'the University of Iowa' : 'Musicmatter',
  license: i < 2 ? 'PD' : 'CC-BY-SA-4.0', preview_url: `${API}/api/jobs/${G}/audio/c${i}`, url: `${API}/api/jobs/${G}/audio/c${i}`,
  start_s: 0, end_s: c.lens[i], duration_s: c.lens[i], gain_db: -3, loudness_lufs: -17
}));

const chrome = chromeBin();
if (!chrome) { console.log('timeline strip skipped (no Chrome; set CHROME)'); process.exit(0); }
if (typeof WebSocket === 'undefined') { console.log('timeline strip skipped (Node 22, or node --experimental-websocket)'); process.exit(0); }

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
const dbgPort = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required',
  '--remote-debugging-address=127.0.0.1', `--remote-debugging-port=${dbgPort}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-strip-'))}`,
  '--window-size=1100,1400', 'about:blank'], { stdio: 'ignore' });

const problems = [];
function check(cond, msg) { if (!cond) problems.push(msg); }
let ws, seq = 0;
const pending = new Map();
function send(method, params = {}) {
  const id = ++seq;
  return new Promise((ok, no) => { pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
}
let touch = false;
async function run(clock, spec, view) {
  cur = spec || { syms: SYMS, lens: LENS };
  view = view || { width: 1100, mobile: false };
  touch = !!view.mobile;
  const sounds = soundsFor(cur);
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
      return json({ id: G, gather_id: G, state: 'done', claim_token: 'x', sounds, found_sounds: sounds, clock });
    }
    const m = u.pathname.match(/\/audio\/c(\d)$/);
    if (m) return send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [...cors, { name: 'content-type', value: 'audio/wav' }], body: wav(cur.lens[+m[1]]).toString('base64') });
    return json({}, u.pathname === '/api/warm' ? 200 : 404);
  });
  await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: API + '/*' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.mobile ? 844 : 1400, deviceScaleFactor: view.mobile ? 3 : 1, mobile: !!view.mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: !!view.mobile, maxTouchPoints: view.mobile ? 5 : 1 });
  // A fixed seed, so the take is the same every run.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: 'var g=crypto.getRandomValues.bind(crypto);crypto.getRandomValues=function(a){if(a instanceof Uint32Array&&a.length===1){a[0]=424242;return a;}return g(a);};' });
  await send('Page.navigate', { url: `http://127.0.0.1:${httpPort}/create/` });
  const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
  const until = async (expression, ms = 15000) => {
    for (let t = 0; t < ms; t += 100) { if (await ev(expression)) return true; await sleep(100); }
    return false;
  };
  await until("!!(document.body && window.NC && document.getElementById('comp'))");
  await ev(`(() => { var c = document.getElementById('comp'); c.value = ${JSON.stringify(cur.syms.join(' '))}; c.dispatchEvent(new Event('input', {bubbles: true})); })()`);
  await until("(() => { var b = document.getElementById('gatherBtn'); return b && !b.hidden && !b.disabled; })()");
  await ev("document.getElementById('gatherBtn').click()");
  await until("(() => { var b = document.getElementById('performBtn'); return b && !b.hidden && !b.disabled && document.querySelectorAll('#gather-list li').length >= ${cur.syms.length}; })()");
  await ev("document.getElementById('performBtn').click()");
  const ready = await until(`document.querySelectorAll('#src-lanes .src-span[data-edit]').length === ${cur.syms.length}`);
  await ev("(() => { var a = document.getElementById('perform-audio'); if (a) a.pause(); var t = document.getElementById('src-time'); if (t) t.scrollIntoView({block: 'center'}); })()");
  await sleep(150);
  return { ev, ready };
}

// Back to the beginning: the icon left of the take's player.
const SHOTS = process.env.SHOTS || '';
try {
  await sleep(600);
  for (const view of [{ width: 1100 }, { width: 390, mobile: true }]) {
    const tag = view.mobile ? 'phone' : 'desktop';
    const { ev, ready } = await run(null, null, view);
    check(ready, tag + ': the take did not appear');
    const geo = await ev(`(() => {
      var b = document.getElementById('perform-rewind'), a = document.getElementById('perform-audio');
      var br = b.getBoundingClientRect(), ar = a.getBoundingClientRect(), svg = b.querySelector('svg');
      return { label: b.getAttribute('aria-label'), title: b.title, w: br.width, h: br.height, bx: br.right, ax: ar.left, ar: ar.right,
        bc: br.top + br.height / 2, ac: ar.top + ar.height / 2, aw: ar.width, svg: !!svg, wide: document.documentElement.scrollWidth > document.documentElement.clientWidth };
    })()`);
    check(geo.label === 'Back to the beginning' && geo.title === 'Back to the beginning', tag + ': label and title');
    check(geo.svg && Math.abs(geo.w - 32) < 1 && Math.abs(geo.h - 32) < 1, tag + ': a 32 px icon, got ' + geo.w + 'x' + geo.h);
    check(geo.bx <= geo.ax + 0.5, tag + ': the icon sits left of the player');
    check(Math.abs(geo.bc - geo.ac) <= 1.5, tag + ': the icon is centred on the player, ' + geo.bc + ' vs ' + geo.ac);
    check(geo.aw > 200 && !geo.wide, tag + ': the player keeps its width and the page does not widen, ' + geo.aw);
    // Paused: back to 0 and still paused.
    await ev("(() => { var a = document.getElementById('perform-audio'); a.pause(); a.currentTime = 9; })()");
    await sleep(250);
    await ev("document.getElementById('perform-rewind').click()");
    await sleep(250);
    let st = await ev("(() => { var a = document.getElementById('perform-audio'); return { t: a.currentTime, paused: a.paused }; })()");
    check(st.t < 0.05 && st.paused, tag + ': paused rewind goes to 0 and stays paused, got ' + JSON.stringify(st));
    // Playing: back to 0 and keeps playing.
    await ev("(() => { var a = document.getElementById('perform-audio'); a.currentTime = 12; return a.play(); })()");
    await sleep(500);
    if (SHOTS) {
      await ev("document.getElementById('perform-title').scrollIntoView({block: 'start'})");
      await sleep(150);
      const r = await ev("(() => { var t = document.getElementById('perform-title').getBoundingClientRect(), a = document.querySelector('#perform-out .player-row').getBoundingClientRect(); return {x: 0, y: t.top + scrollY - 12, width: innerWidth, height: a.bottom - t.top + 24}; })()");
      const shot = await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: view.mobile ? 2 : 1 }, captureBeyondViewport: true });
      (await import('node:fs')).writeFileSync(SHOTS + '/' + tag + '.png', Buffer.from(shot.data, 'base64'));
    }
    await ev("document.getElementById('perform-rewind').click()");
    await sleep(300);
    st = await ev("(() => { var a = document.getElementById('perform-audio'); return { t: a.currentTime, paused: a.paused }; })()");
    check(st.t < 0.8 && !st.paused, tag + ': playing rewind restarts from 0 and keeps playing, got ' + JSON.stringify(st));
    await ev("document.getElementById('perform-audio').pause()");

    // The Live take's player gets the same icon. A take is stood in with a WAV
    // blob here; recording one is not what this test is about.
    const live = await ev(`(async () => {
      var n = 8000 * 20, b = new ArrayBuffer(44 + n * 2), v = new DataView(b), i;
      function w(o, s) { for (i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
      w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
      v.setUint32(24, 8000, true); v.setUint32(28, 16000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
      for (i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.round(2000 * Math.sin(i / 7)), true);
      var a = document.getElementById('ltakeaudio');
      var box = document.getElementById('ltake');
      for (var d = box.parentElement; d; d = d.parentElement) if (d.tagName === 'DETAILS') d.open = true;
      box.hidden = false;
      a.src = URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
      await new Promise(function (ok) { if (a.readyState >= 1) ok(); else a.addEventListener('loadedmetadata', ok, { once: true }); });
      box.scrollIntoView({ block: 'center' });
      var r = document.getElementById('ltake-rewind'), br = r.getBoundingClientRect(), ar = a.getBoundingClientRect();
      return { label: r.getAttribute('aria-label'), title: r.title, w: br.width, h: br.height, bx: br.right, ax: ar.left, bc: br.top + br.height / 2, ac: ar.top + ar.height / 2, aw: ar.width,
        wide: document.documentElement.scrollWidth > document.documentElement.clientWidth };
    })()`);
    check(live.label === 'Back to the beginning' && live.title === 'Back to the beginning', tag + ' live: label and title');
    check(Math.abs(live.w - 32) < 1 && Math.abs(live.h - 32) < 1, tag + ' live: a 32 px icon, got ' + live.w + 'x' + live.h);
    check(live.bx <= live.ax + 0.5 && Math.abs(live.bc - live.ac) <= 1.5, tag + ' live: left of the player and centred on it');
    check(live.aw > 200 && !live.wide, tag + ' live: the player keeps its width and the page does not widen, ' + live.aw);
    await ev("(() => { var a = document.getElementById('ltakeaudio'); a.pause(); a.currentTime = 9; })()");
    await sleep(200);
    await ev("document.getElementById('ltake-rewind').click()");
    await sleep(200);
    st = await ev("(() => { var a = document.getElementById('ltakeaudio'); return { t: a.currentTime, paused: a.paused, perf: document.getElementById('perform-audio').currentTime }; })()");
    check(st.t < 0.05 && st.paused, tag + ' live: paused rewind goes to 0 and stays paused, got ' + JSON.stringify(st));
    await ev("(() => { var a = document.getElementById('ltakeaudio'); a.currentTime = 12; return a.play(); })()");
    await sleep(500);
    if (SHOTS) {
      await ev("(() => { var a = document.querySelector('#ltake .player-row'); window.scrollTo(0, scrollY + a.getBoundingClientRect().top - 200); })()");
      await sleep(200);
      const r = await ev("(() => { var a = document.querySelector('#ltake .player-row').getBoundingClientRect(); return {x: 0, y: a.top + scrollY - 24, width: innerWidth, height: a.height + 48}; })()");
      const shot = await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: view.mobile ? 2 : 1 }, captureBeyondViewport: true });
      (await import('node:fs')).writeFileSync(SHOTS + '/live-' + tag + '.png', Buffer.from(shot.data, 'base64'));
    }
    await ev("document.getElementById('ltake-rewind').click()");
    await sleep(300);
    st = await ev("(() => { var a = document.getElementById('ltakeaudio'); return { t: a.currentTime, paused: a.paused }; })()");
    check(st.t < 0.8 && !st.paused, tag + ' live: playing rewind restarts from 0 and keeps playing, got ' + JSON.stringify(st));
    // Space on the focused icon is the page's play/stop, not a rewind.
    await ev("(() => { var a = document.getElementById('ltakeaudio'); a.pause(); a.currentTime = 6; document.getElementById('ltake-rewind').focus(); })()");
    await sleep(150);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32, text: ' ' });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
    await sleep(250);
    st = await ev("(() => ({ t: document.getElementById('ltakeaudio').currentTime }))()");
    check(st.t > 5.5, tag + ' live: Space on the icon does not rewind, got ' + JSON.stringify(st));
    await ev("(() => { document.getElementById('perform-audio').pause(); document.getElementById('ltakeaudio').pause(); })()");
    ws.close();
  }
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('rewind ok');
