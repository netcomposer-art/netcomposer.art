// Reset on /create/, in headless Chrome, with a stubbed Performer.
// Peter (2026-10-22): "Needs to be a Clear or Reset button that returns
// everything to core state." After Reset the page must be a first visit:
// compared field by field with one. It asks only when there is something to
// lose, keeps the tester pass, and sends nothing that changes the Performer.
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
let cur = { syms: SYMS, lens: LENS };
const soundsFor = (c) => c.syms.map((s, i) => ({
  id: 'c' + i, clip_id: 'c' + i, pos: i, chord: i, symbol: s, title: s + ' test clip', supplier: i < 2 ? 'the University of Iowa' : 'Musicmatter',
  license: i < 2 ? 'PD' : 'CC-BY-SA-4.0', preview_url: `${API}/api/jobs/${G}/audio/c${i}`, url: `${API}/api/jobs/${G}/audio/c${i}`,
  start_s: 0, end_s: c.lens[i], duration_s: c.lens[i], gain_db: -3, loudness_lufs: -17
}));

const chrome = chromeBin();
if (!chrome) { console.log('reset skipped (no Chrome; set CHROME)'); process.exit(0); }
if (typeof WebSocket === 'undefined') { console.log('reset skipped (Node 22, or node --experimental-websocket)'); process.exit(0); }

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
const PAGE = `http://127.0.0.1:${httpPort}/create/`;
const dbgPort = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required',
  '--remote-debugging-address=127.0.0.1', `--remote-debugging-port=${dbgPort}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-reset-'))}`,
  '--window-size=1100,1400', 'about:blank'], { stdio: 'ignore' });

const problems = [];
let checks = 0;
function check(cond, msg) { checks++; if (!cond) problems.push(msg); }
let ws, seq = 0;
const pending = new Map();
function send(method, params = {}) {
  const id = ++seq;
  return new Promise((ok, no) => { pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
}
// Every call the page makes to the Performer, in order.
const calls = [];
const HOLD = { on: false };
const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const until = async (expression, ms = 15000) => {
  for (let t = 0; t < ms; t += 100) { try { if (await ev(expression)) return true; } catch (e) {} await sleep(100); }
  return false;
};
async function open(view, url) {
  view = view || { width: 1100 };
  const sounds = soundsFor(cur);
  calls.length = 0; HOLD.on = false;
  const target = await (await fetch(`http://127.0.0.1:${dbgPort}/json/new?about:blank`, { method: 'PUT' })).json();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  ws.addEventListener('message', async (e) => {
    const msg = JSON.parse(e.data);
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
    calls.push(request.method + ' ' + u.pathname + (/"probe"\s*:\s*true/.test(request.postData || '') ? ' probe' : ''));
    if (u.pathname === '/api/config') return json({ turnstile_required: false, max_words: 4000, max_length_s: 180, perform_enabled: true, browser_assembly: true, regather: true });
    if (u.pathname === '/api/gather') {
      const body = JSON.parse(request.postData || '{}');
      if (body.probe) return json({}, 403);
      if (HOLD.on) return json({ id: 'g-runrunrunrun', state: 'queued', claim_token: 'held' });
      return json({ id: G, gather_id: G, state: 'done', claim_token: 'x', sounds, found_sounds: sounds, clock: null });
    }
    if (u.pathname === '/api/jobs/g-runrunrunrun') return json({ id: 'g-runrunrunrun', kind: 'gather', state: 'running', stage_line: 'Looking for Dm9…' });
    const m = u.pathname.match(/\/jobs\/(g-[0-9a-z]+)\/audio\/c(\d)$/);
    if (m) return send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [...cors, { name: 'content-type', value: 'audio/wav' }], body: wav(cur.lens[+m[2]]).toString('base64') });
    return json({}, u.pathname === '/api/warm' ? 200 : 404);
  });
  await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: API + '/*' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.mobile ? 844 : 1400, deviceScaleFactor: view.mobile ? 3 : 1, mobile: !!view.mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: !!view.mobile, maxTouchPoints: view.mobile ? 5 : 1 });
  await send('Page.navigate', { url: url || PAGE });
  await until("!!(document.body && document.body.getAttribute('data-ready') && window.NCReset && window.NCPerform)");
  await until("/Gather first|Perform is awake|Gather/.test(document.getElementById('perform-wait').textContent) && !document.getElementById('gatherBtn').hidden || document.getElementById('gather-status').textContent !== 'Checking whether Perform is awake…'", 6000);
  await sleep(400);
}
// What a person can see and what the page keeps, to compare with a first visit.
const SNAP = `(() => {
  var $ = function (id) { return document.getElementById(id); };
  var vis = function (id) { var e = $(id); return e ? !e.hidden : null; };
  var txt = function (id) { var e = $(id); return e ? e.textContent : null; };
  var keys = function (s) { var o = []; for (var i = 0; i < s.length; i++) o.push(s.key(i)); return o.sort(); };
  return {
    comp: $('comp').value, perf: $('perf').value, title: $('title').value, by: $('by').value, starter: $('starter').value, inst: $('inst').value,
    hash: location.hash, search: location.search, path: location.pathname,
    prog: txt('prog'), progmeta: txt('progmeta'), status: txt('status'), play: txt('play'), playOff: $('play').disabled,
    undo: vis('undo'), gatherBtn: vis('gatherBtn'), gatherOff: $('gatherBtn').disabled, gstatus: txt('gather-status'), gstop: vis('gather-stop'),
    gbox: vis('gather-box'), rows: document.querySelectorAll('#gather-list li').length, again: vis('gather-again'),
    wait: txt('perform-wait'), waitShown: vis('perform-wait'), performOff: $('performBtn').disabled, out: vis('perform-out'), live: vis('live'), ltake: vis('ltake'),
    hacks: [...document.querySelectorAll('#live article.hack')].map(function (a) { return (a.hasAttribute('data-fixed') ? 'fixed:' : '') + (a.getAttribute('data-type') || ''); }),
    hacksig: [...document.querySelectorAll('#live article.hack')].map(function (a) { return a.getAttribute('data-id') + (a.hasAttribute('data-bypass') ? '!' : '') + '=' + [...a.querySelectorAll('input, select')].map(function (i) { return i.value; }).join(','); }).join('|'),
    confirm: vis('reset-confirm'), session: keys(sessionStorage), local: keys(localStorage), tester: localStorage.getItem('nc_tester'), scroll: Math.round(scrollY)
  };
})()`;
const SHOTS = process.env.SHOTS || '';
const fs = await import('node:fs');
async function shot(name, mobile, h) {
  if (!SHOTS) return;
  await ev('scrollTo(0, 0)');
  await sleep(200);
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: mobile ? 390 : 1100, height: h || (mobile ? 360 : 330), scale: mobile ? 2 : 1 } });
  fs.writeFileSync(SHOTS + '/' + name + '.png', Buffer.from(s.data, 'base64'));
}
// Click Reset (and Reset again in the box, if it asks); wait for the fresh page.
async function doReset(confirm) {
  await ev('window.__old = 1');
  const n = calls.length;
  await ev("document.getElementById('reset').click()");
  if (confirm) {
    check(await until("!document.getElementById('reset-confirm').hidden", 2000), 'the confirm opens');
    await ev("document.getElementById('reset-go').click()");
  }
  const fresh = await until("!window.__old && document.body && document.body.getAttribute('data-ready') && !!window.NCReset", 8000);
  await sleep(900);
  return { fresh, n, after: calls.slice(n) };
}
// A fresh load reads the config, wakes the Performer and asks whether the bot check is needed (a probe that starts nothing). Nothing else.
const allowed = (c) => /^(GET \/api\/(config|warm)|POST \/api\/gather probe)$/.test(c);
const differ = (a, b) => Object.keys(a).filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map((k) => k + ': ' + JSON.stringify(b[k]) + ' (fresh ' + JSON.stringify(a[k]) + ')');
try {
  await sleep(600);
  for (const view of [{ width: 1100 }, { width: 390, mobile: true }]) {
    const tag = view.mobile ? 'phone' : 'desktop';
    // A first visit, with a tester pass and keys that are not Reset's.
    await open(view, PAGE + '?tester=t0k3n');
    await ev("localStorage.setItem('other-app', '1'); sessionStorage.setItem('other-tab', '1')");
    await ev("(() => { var c = document.createElement('div'); c.id = '__spacer'; c.style.height = '0'; document.body.appendChild(c); })()");
    const first = await ev(SNAP);
    check(first.tester === 't0k3n' && first.search === '', tag + ': the tester pass is stored and leaves the address');
    check(JSON.stringify(first.hacks) === '["lowpass","delay","plate","fixed:limiter"]', tag + ': a first visit has the three neutral hacks and the fixed limiter, got ' + JSON.stringify(first.hacks));
    check(!(await ev('NCReset.dirty()')), tag + ': a first visit has nothing to lose');

    // Placement: top right, on the title's line, quiet, inside the page.
    const geo = await ev(`(() => {
      var b = document.getElementById('reset'), h = document.querySelector('h1'), r = b.getBoundingClientRect(), t = h.getBoundingClientRect(), cs = getComputedStyle(b);
      return { label: b.getAttribute('aria-label'), text: b.textContent, font: cs.fontFamily, border: cs.borderTopWidth, bg: cs.backgroundColor,
        right: r.right, main: document.querySelector('main').getBoundingClientRect().right - parseFloat(getComputedStyle(document.querySelector('main')).paddingRight),
        sameLine: r.top < t.bottom && r.bottom > t.top, after: r.left > t.right, h: r.height, w: r.width,
        wide: document.documentElement.scrollWidth > document.documentElement.clientWidth, h1: Math.round(t.top), next: Math.round(document.getElementById('write-h').getBoundingClientRect().top) };
    })()`);
    check(geo.label === 'Reset everything' && geo.text === 'Reset', tag + ': label "Reset everything", text "Reset", got ' + geo.label + ' / ' + geo.text);
    check(/Inter/.test(geo.font) && geo.border === '0px' && /rgba\(0, 0, 0, 0\)|transparent/.test(geo.bg), tag + ': a quiet text button, got ' + JSON.stringify(geo));
    check(geo.sameLine && geo.after && Math.abs(geo.right - geo.main) < 1.5 && !geo.wide, tag + ': top right, opposite the title, inside the page, got ' + JSON.stringify(geo));
    check(geo.h >= 24 && geo.w >= 40, tag + ': big enough to tap, got ' + geo.w + 'x' + geo.h);
    await shot(tag, !!view.mobile);

    // 1. Nothing to lose: no question, the page just starts over.
    let r = await doReset(false);
    check(r.fresh, tag + ': nothing to lose resets without asking');
    let now = await ev(SNAP);
    check(differ(first, now).length === 0, tag + ': a reset of a fresh page is a fresh page: ' + differ(first, now).join('; '));
    check(r.after.every(allowed), tag + ': no calls to change anything on the Performer, got ' + JSON.stringify(r.after));

    // 2. Everything filled in: Composition, instrument, Gather, a take, Live hacks.
    await ev(`(() => { var c = document.getElementById('comp'); c.value = ${JSON.stringify(SYMS.join(' '))}; c.dispatchEvent(new Event('input', {bubbles: true}));
      var t = document.getElementById('title'); t.value = 'Mine'; t.dispatchEvent(new Event('input', {bubbles: true})); })()`);
    await until("(() => { var b = document.getElementById('gatherBtn'); return b && !b.hidden && !b.disabled; })()");
    await ev("(() => { var s = document.getElementById('inst'); if (s.options.length > 1) { s.selectedIndex = (s.selectedIndex + 1) % s.options.length; s.dispatchEvent(new Event('change', {bubbles: true})); } })()");
    await ev("document.getElementById('gatherBtn').click()");
    await until("(() => { var b = document.getElementById('performBtn'); return b && !b.disabled && document.querySelectorAll('#gather-list li').length >= 5; })()");
    await ev("document.getElementById('performBtn').click()");
    check(await until("!document.getElementById('perform-out').hidden && !document.getElementById('live').hidden", 12000), tag + ': a take is on the page');
    await ev("(() => { var a = document.getElementById('perform-audio'); if (a) a.pause(); })()");
    await ev("document.getElementById('live-die').click()");
    await ev("(() => { var b = document.getElementById('live-replace'); if (b && !document.getElementById('live-confirm').hidden) b.click(); })()");
    await sleep(500);
    await ev("scrollTo(0, document.body.scrollHeight)");
    const full = await ev(SNAP);
    check(full.rows === 5 && full.out && full.hacksig !== first.hacksig && /#c=/.test(full.hash) && full.session.some((k) => /^nc-claim:/.test(k)), tag + ': the page has work on it, got ' + JSON.stringify(full));
    check(await ev('NCReset.dirty()'), tag + ': there is something to lose');

    // 2a. It asks; Cancel and Escape keep everything.
    await ev("scrollTo(0, 0)");
    await ev("document.getElementById('reset').click()");
    await until("!document.getElementById('reset-confirm').hidden", 2000);
    const box = await ev(`(() => { var b = document.getElementById('reset-confirm'); return { q: document.getElementById('reset-confirm-q').textContent,
      focus: document.activeElement && document.activeElement.id, expanded: document.getElementById('reset').getAttribute('aria-expanded'),
      wide: document.documentElement.scrollWidth > document.documentElement.clientWidth }; })()`);
    check(/^Reset everything\?/.test(box.q) && /Saved Performances stay/.test(box.q) && box.focus === 'reset-go' && box.expanded === 'true' && !box.wide, tag + ': the question, focus on Reset, got ' + JSON.stringify(box));
    await shot(tag + '-confirm', !!view.mobile, view.mobile ? 520 : 400);
    await ev("document.getElementById('reset-cancel').click()");
    await sleep(200);
    now = await ev(SNAP);
    check(!now.confirm && now.comp === full.comp && now.rows === 5 && now.out && now.hacksig === full.hacksig && now.hash === full.hash, tag + ': Cancel keeps everything');
    check(await ev("document.activeElement && document.activeElement.id === 'reset'"), tag + ': focus goes back to Reset');
    await ev("document.getElementById('reset').click()");
    await until("!document.getElementById('reset-confirm').hidden", 2000);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sleep(200);
    check((await ev(SNAP)).confirm === false && (await ev("document.querySelectorAll('#gather-list li').length")) === 5, tag + ': Escape closes the question and keeps everything');

    // 2b. Reset: exactly a first visit; tester and other keys stay; no server calls.
    await ev("scrollTo(0, 600)");
    r = await doReset(true);
    check(r.fresh, tag + ': the page starts over after Reset');
    now = await ev(SNAP);
    check(differ(first, now).length === 0, tag + ': after Reset the page is a first visit: ' + differ(first, now).join('; '));
    check(now.tester === 't0k3n' && now.local.includes('other-app') && now.session.includes('other-tab'), tag + ': tester pass and unrelated keys stay');
    check(!now.session.some((k) => k === 'nc-perform-job' || /^nc-claim:/.test(k)), tag + ': draft keys are gone, got ' + JSON.stringify(now.session));
    check(now.scroll === 0, tag + ': back at the top, got ' + now.scroll);
    check(r.after.every(allowed), tag + ': no calls to change anything on the Performer, got ' + JSON.stringify(r.after));

    // 3. A Gather still running: it asks, stops it on the page, nothing sent.
    await ev(`(() => { var c = document.getElementById('comp'); c.value = ${JSON.stringify(SYMS.join(' '))}; c.dispatchEvent(new Event('input', {bubbles: true})); })()`);
    await until("(() => { var b = document.getElementById('gatherBtn'); return b && !b.hidden && !b.disabled; })()");
    HOLD.on = true;
    await ev("document.getElementById('gatherBtn').click()");
    check(await until("!document.getElementById('gather-stop').hidden", 4000), tag + ': a Gather is running');
    await sleep(500);
    r = await doReset(true);
    HOLD.on = false;
    now = await ev(SNAP);
    check(r.fresh && differ(first, now).length === 0, tag + ': a running Gather is gone after Reset: ' + differ(first, now).join('; '));
    await sleep(1500);
    const late = calls.slice(r.n);
    check(late.every(allowed) && !late.some((c) => /g-runrunrunrun|cancel/.test(c)), tag + ': the old Gather is neither polled nor cancelled, got ' + JSON.stringify(late));

    // 4. A tester pass still in the address (or set while open) is kept.
    await ev("history.replaceState(null, '', location.pathname + '?tester=abc&x=1#c=zzz')");
    check((await ev('NCReset.bareUrl()')) === '/create/?tester=abc', tag + ': the address keeps only ?tester=');
    await ev("history.replaceState(null, '', location.pathname + '?x=1#c=zzz')");
    check((await ev('NCReset.bareUrl()')) === '/create/', tag + ': otherwise the bare page');
    ws.close();
  }
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('reset ok (' + checks + ' checks)');
