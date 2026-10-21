// The editable chord strip on /create/, in headless Chrome, with a stubbed
// Gather of five chords (G13 twice). Real pointer drags through CDP.
//
// Regression (Petrus, 2026-10-21): working a lower bar must never change
// the bar above it. Every chord has its own lane and its own id, so two G13s
// stay two chords, and an edit moves only the bar under the pointer.
//
// Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (global
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
const plan = (ev) => ev("Array.from(document.querySelectorAll('#plan-src li')).map(function (li) { return [li.querySelector('.g-chord').textContent, +li.dataset.at, +li.dataset.len]; })");
const bars = (ev) => ev("Array.from(document.querySelectorAll('#src-lanes .src-span')).map(function (e) { var r = e.getBoundingClientRect(); return {id: e.getAttribute('data-chord'), lane: e.closest('.src-lane').getAttribute('data-chord'), x: r.left, w: r.width, y: r.top + r.height / 2, left: e.style.left, width: e.style.width}; })");
async function mouse(type, x, y) { await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 }); }
async function touchDrag(x, y, dx, dy) {
  const pt = (px, py) => [{ x: px, y: py, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(x, y) });
  for (let k = 1; k <= 8; k++) await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(x + dx * k / 8, y + dy * k / 8) });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(150);
}
async function drag(x, y, dx, dy = 0) {
  if (touch) return touchDrag(x, y, dx, dy);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none', buttons: 0 });
  await mouse('mousePressed', x, y);
  for (let k = 1; k <= 8; k++) await mouse('mouseMoved', x + dx * k / 8, y + dy * k / 8);
  await mouse('mouseReleased', x + dx, y + dy);
  await sleep(120);
}
const hitAt = (ev, x, y) => ev(`(() => { var e = document.elementFromPoint(${x}, ${y}); var b = e && e.closest('.src-span'); return b ? b.getAttribute('data-chord') + ':' + (e.getAttribute('data-grip') || 'move') : ''; })()`);

try {
  await sleep(600);
  // Organic take.
  let { ev, ready } = await run(null);
  check(ready, 'the editable strip did not appear');
  let b0 = await bars(ev), p0 = await plan(ev);
  check(b0.length === 5 && new Set(b0.map((b) => b.id)).size === 5, 'every chord has its own id, got ' + b0.map((b) => b.id));
  check(b0.every((b) => b.id === b.lane), 'one bar per lane, keyed by the chord id');
  check(p0[1][0] === 'G13' && p0[3][0] === 'G13', 'the stub has G13 twice');
  // Hit areas: the gap between two lanes belongs to exactly one of them.
  const gapY = (b0[2].y + b0[3].y) / 2;
  const above = await hitAt(ev, b0[2].x + b0[2].w / 2, gapY - 2), below = await hitAt(ev, b0[3].x + b0[3].w / 2, gapY + 2);
  check(above === '' || above.startsWith('chord-2'), 'just above the lane line belongs to the upper chord, got ' + above);
  check(below === '' || below.startsWith('chord-3'), 'just below the lane line belongs to the lower chord, got ' + below);
  check((await hitAt(ev, b0[3].x + b0[3].w / 2, b0[3].y - 10)) === 'chord-3:move', 'the lower bar is easy to grab a little above its line');
  check((await hitAt(ev, b0[3].x - 5, b0[3].y)) === 'chord-3:start', 'the start grip sits just left of the bar');
  check((await hitAt(ev, b0[3].x + b0[3].w + 5, b0[3].y)) === 'chord-3:end', 'the end grip sits just right of the bar');

  // Click the lower G13: nothing changes.
  await drag(b0[3].x + b0[3].w / 2, b0[3].y, 0);
  check(JSON.stringify(await plan(ev)) === JSON.stringify(p0), 'a click on a bar changes nothing');
  // Drag the lower G13 left, grabbed near the top of its lane (toward the bar above).
  await drag(b0[3].x + b0[3].w / 2, b0[3].y - 10, -60, -14);
  let p1 = await plan(ev), b1 = await bars(ev);
  check(p1[3][1] < p0[3][1] && p1[3][2] === p0[3][2], 'the lower G13 moved and kept its length');
  for (const i of [0, 1, 2, 4]) check(JSON.stringify(p1[i]) === JSON.stringify(p0[i]), 'chord ' + (i + 1) + ' did not change when the lower G13 moved');
  for (const i of [0, 1, 2, 4]) check(b1[i].left === b0[i].left && b1[i].width === b0[i].width, 'bar ' + (i + 1) + ' did not move on screen');
  check(Math.abs((b1[3].x - b0[3].x) + 60) <= 1.5, 'the bar follows the pointer, moved ' + (b1[3].x - b0[3].x));
  // Drag it far up-left: it stops at the chord above's start (harmonic order) and stays its own chord.
  await drag(b1[3].x + b1[3].w / 2, b1[3].y, -400, -30);
  let p2 = await plan(ev);
  check(p2[3][1] === p0[2][1] && JSON.stringify(p2[2]) === JSON.stringify(p0[2]), 'the lower bar stops at the upper start and leaves the upper bar alone');
  // The first G13 is independent of the second.
  const g1 = (await bars(ev))[1];
  await drag(g1.x + g1.w + 5, g1.y, -20);
  let p3 = await plan(ev);
  check(p3[1][2] < p0[1][2] && p3[1][1] === p0[1][1], 'the first G13 end trims');
  check(JSON.stringify(p3[3]) === JSON.stringify(p2[3]), 'trimming the first G13 leaves the second G13 alone');
  // End clamps at the natural clip length.
  await drag(g1.x + (await bars(ev))[1].w + 5, g1.y, 300);
  let p4 = await plan(ev);
  check(p4[1][2] === LENS[1], 'the end edge stops at the clip length, got ' + p4[1][2]);
  // Start edge cannot reveal more than the clip.
  const am = (await bars(ev))[4];
  await drag(am.x - 5, am.y, -200);
  let p5 = await plan(ev);
  check(p5[4][2] <= LENS[4] && +(p5[4][1] + p5[4][2]).toFixed(3) === +(p4[4][1] + p4[4][2]).toFixed(3), 'the start edge keeps the end and never passes the clip length');
  ws.close();

  // Written clock: shorten only, with the note.
  const clock = { written: true, durations_s: [4, 4, 6, 6, 6], slots: [{ t: 0, dur: 4 }, { t: 4, dur: 4 }, { t: 8, dur: 6 }, { t: 14, dur: 6 }, { t: 20, dur: 6 }] };
  ({ ev, ready } = await run(clock));
  check(ready, 'the written strip did not appear');
  b0 = await bars(ev); p0 = await plan(ev);
  await drag(b0[3].x + b0[3].w / 2, b0[3].y, -60);
  check(JSON.stringify(await plan(ev)) === JSON.stringify(p0), 'a written bar does not move');
  check(await ev("!document.getElementById('src-lock').hidden"), 'a blocked move shows the note');
  await drag(b0[3].x + b0[3].w + 5, b0[3].y, -40);
  let w1 = await plan(ev);
  check(w1[3][2] < 6 && w1[3][1] === 14, 'a written end may shorten');
  for (const i of [0, 1, 2, 4]) check(JSON.stringify(w1[i]) === JSON.stringify(p0[i]), 'shortening chord 4 leaves chord ' + (i + 1));
  await drag(b0[3].x + (await bars(ev))[3].w + 5, b0[3].y, 300);
  check((await plan(ev))[3][2] === 6, 'a written end stops at its written length');
  ws.close();
  // Petrus's take: every lane's bar and both edges can be grabbed, at a
  // desktop width and on a phone, and each one answers.
  for (const view of (process.env.ONLY === 'playhead' ? [] : [{ width: 1000 }, { width: 1300 }, { width: 390, mobile: true }])) {
    const tag = view.mobile ? 'phone' : view.width + ' px';
    if (process.env.DEBUG) console.log('view', tag);
    ({ ev, ready } = await run(null, TEN, view));
    check(ready, tag + ': the ten-chord strip did not appear');
    const tb = await bars(ev);
    for (let i = 0; i < tb.length; i++) {
      const b = tb[i], id = 'chord-' + i, grip = view.mobile ? 11 : 6;
      // The phone has to scroll each lane into view.
      await ev(`document.querySelector('[data-chord="${id}"].src-span').scrollIntoView({block: 'center'})`);
      await sleep(30);
      const bb = (await bars(ev))[i];
      check((await hitAt(ev, bb.x + bb.w / 2, bb.y)) === id + ':move', tag + ': lane ' + (i + 1) + ' body is grabbable, got ' + (await hitAt(ev, bb.x + bb.w / 2, bb.y)));
      check((await hitAt(ev, bb.x - grip, bb.y)) === id + ':start', tag + ': lane ' + (i + 1) + ' start edge is grabbable, got ' + (await hitAt(ev, bb.x - grip, bb.y)));
      check((await hitAt(ev, bb.x + bb.w + grip, bb.y)) === id + ':end', tag + ': lane ' + (i + 1) + ' end edge is grabbable, got ' + (await hitAt(ev, bb.x + bb.w + grip, bb.y)));
      if (process.env.DEBUG) console.log(' lane', i, problems.length);
      const p0 = (await plan(ev))[i];
      await drag(bb.x + bb.w + grip, bb.y, -Math.max(6, bb.w / 3));
      const p1 = (await plan(ev))[i];
      check(p1[2] < p0[2] && p1[1] === p0[1], tag + ': lane ' + (i + 1) + ' end shortens, got ' + p0 + ' -> ' + p1);
      const b2 = (await bars(ev))[i];
      await drag(b2.x - grip, b2.y, Math.max(3, b2.w / 4));
      const p2 = (await plan(ev))[i];
      check(p2[1] > p1[1] && +(p2[1] + p2[2]).toFixed(2) === +(p1[1] + p1[2]).toFixed(2), tag + ': lane ' + (i + 1) + ' start trims, got ' + p1 + ' -> ' + p2);
      const b3 = (await bars(ev))[i];
      await drag(b3.x + b3.w / 2, b3.y, 8);
      const p3 = (await plan(ev))[i];
      check(p3[1] > p2[1] && p3[2] === p2[2], tag + ': lane ' + (i + 1) + ' moves, got ' + p2 + ' -> ' + p3);
    }
    // The top three are whole 4 s recordings: lengthening says why it stops.
    ({ ev, ready } = await run(null, TEN, view));
    const top = (await bars(ev))[1];
    await drag(top.x + top.w + (view.mobile ? 11 : 6), top.y, 60);
    check((await plan(ev))[1][2] === 4, tag + ': a whole recording does not get longer');
    check(await ev("(() => { var e = document.getElementById('src-lock'); return !e.hidden && /whole recording \\(4\\.0 s\\)/.test(e.textContent); })()"), tag + ': the clip note shows');
    ws.close();
  }

  // The playhead: its own row above lane 1, never over a bar.
  if (process.env.DEBUG) console.log('playhead');
  ({ ev, ready } = await run(null, TEN, { width: 1100 }));
  const geo = await ev(`(() => {
    var r = document.querySelector('.src-ruler'), k = document.querySelector('.src-knob'), l = document.querySelector('.src-lane'), h = document.getElementById('arrangement-h');
    var rr = r.getBoundingClientRect(), lr = l.getBoundingClientRect(), kr = k.getBoundingClientRect();
    return {count: document.querySelectorAll('.src-ruler').length, heads: document.querySelectorAll('#arrangement-h').length, rTop: rr.top, rBottom: rr.bottom, rLeft: rr.left, rWidth: rr.width, lTop: lr.top, kx: kr.left + kr.width / 2, ky: kr.top + kr.height / 2, headAbove: !h || h.getBoundingClientRect().bottom <= rr.top + 0.5};
  })()`);
  check(geo.count === 1 && geo.heads === 1, 'one ruler and one Arrangement heading');
  check(geo.rBottom <= geo.lTop + 0.5 && geo.headAbove, 'the ruler sits between the heading and lane 1');
  const tr = await ev("(() => { var t = document.querySelector('.src-track').getBoundingClientRect(); return {x: t.left, w: t.width}; })()");
  check(Math.abs(geo.kx - tr.x) <= 1.5, 'the dot starts at 0 on the track, got ' + geo.kx + ' vs ' + tr.x);
  const tb1 = (await bars(ev))[0];
  check((await hitAt(ev, tb1.x + tb1.w / 2, tb1.y)) === 'chord-0:move', 'lane 1 keeps its bar under the playhead row');
  const dur = await ev("(() => { var a = document.getElementById('perform-audio'); return a.duration; })()");
  // Click the ruler at 40 %: seeks while stopped.
  await drag(tr.x + tr.w * 0.4, geo.ky, 0);
  let at = await ev("document.getElementById('perform-audio').currentTime");
  check(Math.abs(at - dur * 0.4) < dur * 0.02, 'a ruler click seeks, got ' + at + ' of ' + dur);
  check(await ev("document.getElementById('perform-audio').paused"), 'seeking while stopped stays stopped');
  // Drag the dot back to 10 %.
  const k1 = await ev("(() => { var k = document.querySelector('.src-knob').getBoundingClientRect(); return {x: k.left + k.width / 2, y: k.top + k.height / 2}; })()");
  check(Math.abs(k1.x - (tr.x + tr.w * 0.4)) <= 2, 'the dot moved to the seek');
  await drag(k1.x, k1.y, -tr.w * 0.3);
  at = await ev("document.getElementById('perform-audio').currentTime");
  check(Math.abs(at - dur * 0.1) < dur * 0.02, 'dragging the dot scrubs, got ' + at);
  const line = await ev("(() => { var l = document.querySelector('.src-playline').getBoundingClientRect(); return {x: l.left + l.width / 2, top: l.top, bottom: l.bottom, pe: getComputedStyle(document.querySelector('.src-playline')).pointerEvents}; })()");
  check(Math.abs(line.x - (tr.x + tr.w * 0.1)) <= 2 && line.pe === 'none', 'the line follows the dot and takes no pointer');
  // The line over a bar never steals it.
  const bAt = (await bars(ev))[2];
  await drag(bAt.x + bAt.w / 2, geo.ky, 0);
  const b2 = (await bars(ev))[2];
  check((await hitAt(ev, b2.x + b2.w / 2, b2.y)) === 'chord-2:move', 'a bar under the line is still the bar');
  // Seek while playing: it keeps playing from there.
  await ev("document.getElementById('perform-audio').play()");
  await sleep(300);
  await drag(tr.x + tr.w * 0.7, geo.ky, 0);
  await sleep(250);
  at = await ev("document.getElementById('perform-audio').currentTime");
  check(at >= dur * 0.69 && at < dur * 0.8 && !(await ev("document.getElementById('perform-audio').paused")), 'seeking while playing continues from there, got ' + at);
  await sleep(400);
  const kPlay = await ev("(() => { var k = document.querySelector('.src-knob').getBoundingClientRect(); return k.left + k.width / 2; })()");
  check(kPlay > tr.x + tr.w * 0.7, 'the dot follows playback');
  await ev("document.getElementById('perform-audio').pause()");
  ws.close();
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('timeline strip ok');
