// Re-gather one sound on /create/, in headless Chrome, with a stubbed Performer.
// Peter (2026-10-21): "enable the user to click an icon on any individual
// gathered sound and 're-gather it'": a new recording for that one chord,
// every other sound kept, and the take (Arrangement, Live, Save) uses it.
//
// (harness copied from rewind.mjs) Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (global
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
const asked = [], fetched = [], jobs = {}, fresh = {}, lens = {}, HOLD = { on: false }, FAIL = { on: false };
const NEWLEN = 3.25;
let current = [], OFF = false;
const RUN = { n: 0 };
async function run(clock, spec, view, perform) {
  cur = spec || { syms: SYMS, lens: LENS };
  view = view || { width: 1100, mobile: false };
  touch = !!view.mobile;
  const sounds = soundsFor(cur);
  RUN.n++;
  current = sounds; asked.length = 0; fetched.length = 0; HOLD.on = false; FAIL.on = false;
  for (const k of Object.keys(jobs)) delete jobs[k];
  for (const k of Object.keys(fresh)) delete fresh[k];
  for (const k of Object.keys(lens)) delete lens[k];
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
    if (u.pathname === '/api/config') return json({ turnstile_required: false, max_words: 4000, max_length_s: 180, perform_enabled: true, browser_assembly: true, regather: !OFF });
    if (u.pathname === '/api/gather') {
      const body = JSON.parse(request.postData || '{}');
      if (body.probe) return json({}, 403);
      if (body.regather_gather_id) {
        asked.push(body);
        const id = 'g-again' + String(RUN.n * 100 + asked.length).padStart(5, '0');
        jobs[id] = { from: body.regather_gather_id, chord: body.regather_chord, polls: 0 };
        return json({ id, state: 'queued', claim_token: 'claim-' + asked.length });
      }
      return json({ id: G, gather_id: G, state: 'done', claim_token: 'x', sounds, found_sounds: sounds, clock });
    }
    const jm = u.pathname.match(/^\/api\/jobs\/(g-again\d+)$/);
    if (jm && jobs[jm[1]]) {
      const job = jobs[jm[1]];
      job.polls++;
      if (HOLD.on || job.polls < 2) return json({ id: jm[1], kind: 'gather', state: 'running', stage_line: 'Finding another recording…' });
      if (FAIL.on) return json({ id: jm[1], kind: 'gather', state: 'rejected', error: 'No other recording of ' + cur.syms[job.chord] + ' was found. The old one stays.' });
      // The new collection: the same chords, every url under the new id, one new recording.
      fresh[job.chord] = (fresh[job.chord] || 0) + 1;
      const rows = current.map((s, i) => ({ ...s, preview_url: `${API}/api/jobs/${jm[1]}/audio/c${i}`, url: `${API}/api/jobs/${jm[1]}/audio/c${i}` }));
      const n = fresh[job.chord];
      rows[job.chord] = { ...rows[job.chord], title: cur.syms[job.chord] + ' other take ' + n, supplier: 'Wikimedia Commons', license: 'CC-BY-4.0', duration_s: NEWLEN, end_s: NEWLEN };
      lens[jm[1]] = cur.lens.map((l, i) => (i === job.chord ? NEWLEN : (lens[job.from] || cur.lens)[i]));
      current = rows;
      return json({ id: jm[1], kind: 'gather', state: 'done', gather_id: jm[1], sounds: rows, found_sounds: rows, clock: null, regather: { from: job.from, chord: job.chord } });
    }
    const m = u.pathname.match(/\/jobs\/(g-[0-9a-z]+)\/audio\/c(\d)$/);
    if (m) {
      fetched.push(m[1] + '/c' + m[2]);
      return send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [...cors, { name: 'content-type', value: 'audio/wav' }], body: wav((lens[m[1]] || cur.lens)[+m[2]]).toString('base64') });
    }
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
  if (!perform) return { ev, until, ready: true };
  await ev("document.getElementById('performBtn').click()");
  const ready = await until(`document.querySelectorAll('#src-lanes .src-span[data-edit]').length === ${cur.syms.length}`);
  await ev("(() => { var a = document.getElementById('perform-audio'); if (a) a.pause(); var t = document.getElementById('src-time'); if (t) t.scrollIntoView({block: 'center'}); })()");
  await sleep(150);
  return { ev, until, ready };
}


const SHOTS = process.env.SHOTS || '';
const fs = await import('node:fs');
async function shot(ev, name, mobile) {
  if (!SHOTS) return;
  await ev("document.getElementById('gather-list').scrollIntoView({block: 'start'})");
  await sleep(200);
  const r = await ev("(() => { var l = document.getElementById('gather-list').getBoundingClientRect(); return {x: 0, y: l.top + scrollY - 16, width: innerWidth, height: Math.min(l.height + 32, 1200)}; })()");
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: mobile ? 2 : 1 }, captureBeyondViewport: true });
  fs.writeFileSync(SHOTS + '/' + name + '.png', Buffer.from(s.data, 'base64'));
}
const rows = `[...document.querySelectorAll('#gather-list li')].map(function (li) {
  var b = li.querySelector('.g-again'), n = li.querySelector('.g-note');
  return { title: (li.querySelector('.g-title') || {}).textContent || '', meta: (li.querySelector('.g-meta') || {}).textContent || '',
    icon: !!b, disabled: b ? b.disabled : null, busy: li.classList.contains('g-busy'), ariaBusy: b ? b.getAttribute('aria-busy') : null,
    note: n ? n.textContent : '' };
})`;
const planLines = "[...document.querySelectorAll('#plan-src li')].map(function (li) { return li.textContent; })";
try {
  await sleep(600);
  // An older Performer (no cfg.regather) would start a whole new Gather: no icon.
  OFF = true;
  {
    const { ev } = await run(null, null, { width: 1100 });
    await sleep(300);
    const r = await ev(rows);
    check(r.length === 5 && r.every((x) => !x.icon), 'no cfg.regather: no icon, got ' + JSON.stringify(r.map((x) => x.icon)));
    ws.close();
  }
  OFF = false;
  for (const view of [{ width: 1100 }, { width: 390, mobile: true }]) {
    const tag = view.mobile ? 'phone' : 'desktop';
    const { ev, until } = await run(null, null, view);
    await until("document.querySelectorAll('#gather-list .g-again').length === 5");
    const geo = await ev(`[...document.querySelectorAll('#gather-list .g-again')].map(function (b) {
      var r = b.getBoundingClientRect(), t = b.parentElement.querySelector('.g-title').getBoundingClientRect(), svg = b.querySelector('svg');
      return { label: b.getAttribute('aria-label'), title: b.title, w: r.width, h: r.height, svg: !!svg && svg.getAttribute('stroke-width') === '1.5',
        left: r.right <= t.left + 0.5, wide: document.documentElement.scrollWidth > document.documentElement.clientWidth };
    })`);
    check(geo.length === 5, tag + ': an icon on every gathered row');
    for (const g of geo) {
      check(g.label === 'Re-gather this sound' && g.title === 'Re-gather this sound', tag + ': label and title, got ' + g.label + ' / ' + g.title);
      check(g.svg && Math.abs(g.w - 32) < 1 && Math.abs(g.h - 32) < 1, tag + ': a 32 px line icon, got ' + g.w + 'x' + g.h);
      check(g.left && !g.wide, tag + ': the icon sits before the title and the page does not widen');
    }
    await sleep(800); // let the first clips decode, so carried buffers are used
    const before = await ev(rows);
    if (!view.mobile) await shot(ev, 'desktop-idle', false); else await shot(ev, 'phone-idle', true);

    // 1. Busy: only that row; every icon waits; nothing else changes.
    HOLD.on = true;
    fetched.length = 0;
    await ev("document.querySelectorAll('#gather-list .g-again')[1].click()");
    await until(`(${rows})[1].busy`, 4000);
    let r = await ev(rows);
    check(r[1].busy && r[1].ariaBusy === 'true' && /Finding another recording/.test(r[1].meta), tag + ': row 2 shows it is busy, got ' + JSON.stringify(r[1]));
    check(r.every((x, i) => x.disabled && (i === 1 || (!x.busy && x.title === before[i].title))), tag + ': other rows wait and stay as they were');
    check(asked.length === 1 && asked[0].regather_gather_id === G && asked[0].regather_chord === 1 && asked[0].claim_token === 'x', tag + ': the request names the Gather, the chord and its key, got ' + JSON.stringify(asked[0]));
    await shot(ev, tag + '-busy', !!view.mobile);
    HOLD.on = false;
    await until(`!(${rows})[1].busy && (${rows}).every(function (x) { return !x.disabled; })`, 8000);
    r = await ev(rows);
    check(r[1].title === 'G13 other take 1' && /Wikimedia Commons/.test(r[1].meta) && /CC BY 4\.0|CC-BY-4\.0/.test(r[1].meta), tag + ': row 2 is the new recording with its credit, got ' + JSON.stringify(r[1]));
    check(r.every((x, i) => i === 1 || (x.title === before[i].title && x.meta === before[i].meta)), tag + ': every other sound is exactly as it was');
    await until(`window.performance && true`, 10);
    await sleep(500);
    const first = 'g-again' + String(RUN.n * 100 + 1).padStart(5, '0');
    check(fetched.filter((f) => f.startsWith(first + '/')).every((f) => f === first + '/c1') && fetched.includes(first + '/c1'), tag + ': only the new clip is fetched, got ' + JSON.stringify(fetched));

    // 2. The take uses the new sound.
    await ev("document.getElementById('performBtn').click()");
    const ready = await until("document.querySelectorAll('#plan-src li').length === 5");
    check(ready, tag + ': the take appeared');
    let plan = await ev(planLines);
    check(/G13 other take 1/.test(plan[1]) && plan.every((p, i) => i === 1 || p.includes(before[i].title)), tag + ': the Arrangement lists the new sound, got ' + JSON.stringify(plan));
    const seed = await ev("(document.getElementById('plan-seed') || {}).textContent");

    // 3. Re-gather with a take on screen: rebuilt with the same seed.
    await ev("document.querySelectorAll('#gather-list .g-again')[3].click()");
    await until(`(${rows})[3].title === 'G13 other take 1' && (${rows}).every(function (x) { return !x.disabled; })`, 8000);
    await until(`(${planLines}).length === 5 && /G13 other take 1/.test((${planLines})[3])`, 8000);
    plan = await ev(planLines);
    check(/G13 other take 1/.test(plan[3]) && /G13 other take 1/.test(plan[1]) && plan[0].includes(before[0].title), tag + ': the take is rebuilt with the new sound, got ' + JSON.stringify(plan));
    check((await ev("(document.getElementById('plan-seed') || {}).textContent")) === seed, tag + ': the same seed');
    check(asked[1] && asked[1].regather_gather_id === first && asked[1].claim_token === 'claim-1', tag + ': the second re-gather starts from the first, with its key, got ' + JSON.stringify(asked[1]));
    const keep = await ev("!document.getElementById('perform-keep').disabled");
    check(keep, tag + ': Save stays available');

    // 4. Nothing else to find: a plain sentence, and the old sound stays.
    const mid = await ev(rows);
    FAIL.on = true;
    await ev("document.querySelectorAll('#gather-list .g-again')[0].click()");
    await until(`(${rows})[0].note !== ''`, 8000);
    r = await ev(rows);
    check(r[0].note === 'No other recording of Dm9 was found. The old one stays.' && r[0].title === mid[0].title, tag + ': the error is shown and the old sound kept, got ' + JSON.stringify(r[0]));
    check(r.every((x) => !x.disabled), tag + ': the icons work again');
    plan = await ev(planLines);
    check(plan[0].includes(mid[0].title), tag + ': the take keeps the old sound');
    if (!view.mobile) await shot(ev, 'desktop-error', false);
    FAIL.on = false;
    ws.close();
  }
} finally {
  proc.kill();
  server.close();
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('regather ok');
