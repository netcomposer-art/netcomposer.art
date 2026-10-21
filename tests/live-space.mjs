// Space on /create/ Live, in headless Chrome: Space plays and stops the Performance from anywhere once Live is up,
// resumes from the playhead, leaves typing alone (text input, textarea, select, contenteditable), never presses the
// focused hack button, checkbox or slider, ignores key repeat and modifiers, and never scrolls the page.
// Needs Chrome (CHROME=… or google-chrome on PATH) and Node 22 (or node --experimental-websocket).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}
const chrome = chromeBin();
if (!chrome) { console.log('space page test skipped (no Chrome; set CHROME)'); process.exit(0); }
if (typeof WebSocket === 'undefined') { console.log('space page test skipped (Node 22, or node --experimental-websocket)'); process.exit(0); }
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2' };
function toneWav(sec) {
  const rate = 8000, n = rate * sec, buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22); buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(800 * Math.sin(2 * Math.PI * 220 * i / rate)), 44 + i * 2);
  return buf;
}
const tone = toneWav(12);
const server = createServer(async (req, res) => {
  if (req.url.startsWith('/__tone.wav')) {   // with Range, so the player can seek
    const m = /bytes=(\d+)-(\d*)/.exec(req.headers.range || '');
    const h = { 'content-type': 'audio/wav', 'accept-ranges': 'bytes', 'access-control-allow-origin': '*' };
    if (!m) { res.writeHead(200, { ...h, 'content-length': tone.length }); res.end(tone); return; }
    const a = +m[1], b = m[2] ? Math.min(+m[2], tone.length - 1) : tone.length - 1;
    res.writeHead(206, { ...h, 'content-length': b - a + 1, 'content-range': `bytes ${a}-${b}/${tone.length}` }); res.end(tone.subarray(a, b + 1)); return;
  }
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try { const body = await readFile(join(root, path)); res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' }); res.end(body); }
  catch (e) { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const dbgPort = 9800 + Math.floor(Math.random() * 150);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', '--remote-debugging-address=127.0.0.1',
  `--remote-debugging-port=${dbgPort}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-space-'))}`, 'about:blank'], { stdio: 'ignore' });
let target = null;
for (let i = 0; i < 100 && !target; i++) { try { target = await (await fetch(`http://127.0.0.1:${dbgPort}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); } }
const ws = new WebSocket(target.webSocketDebuggerUrl);
let seq = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {}); } });
await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } else console.log('ok  ', m); };
const key = async (type, extra = {}) => send('Input.dispatchKeyEvent', { type, key: ' ', code: 'Space', windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32, ...extra });
const space = async (extra = {}) => { await key('keyDown', { text: extra.modifiers ? undefined : ' ', ...extra }); await key('keyUp', extra); await sleep(250); };
const paused = () => ev("document.getElementById('perform-audio').paused");
const scrollY = () => ev('Math.round(window.scrollY)');
const focus = (sel) => ev(`(() => { const el = ${sel}; el.focus(); return document.activeElement === el; })()`);
try {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 900, height: 500, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/create/` });
  for (let i = 0; i < 100; i++) { if (await ev('!!(window.NCStack && window.NCLive && document.getElementById("live"))')) break; await sleep(100); }
  ok((await ev("document.getElementById('perform-audio').getAttribute('aria-keyshortcuts')")) === 'Space' && /Space/.test(await ev("document.getElementById('perform-audio').title")), 'the player says Space in its title and aria-keyshortcuts');
  // No take yet: Space is the browser's again.
  await ev('document.activeElement && document.activeElement.blur && document.activeElement.blur(); window.scrollTo(0, 0); true');
  await space();
  ok(await paused(), 'with no take loaded, Space does nothing to the player');
  // Load a take.
  await ev(`(() => { document.getElementById('perform-out').hidden = false; const u = location.origin + '/__tone.wav'; return NCLive.open({ id: 'space-test', only: [u], mp3: u, force: true }); })()`);
  for (let i = 0; i < 100; i++) { if (await ev("document.getElementById('perform-audio').readyState >= 1 && !document.getElementById('live').hidden")) break; await sleep(100); }
  ok(await ev("!document.getElementById('live').hidden && document.getElementById('perform-audio').readyState >= 1"), 'Live is up with a take loaded');
  ok((await ev("document.getElementById('perform-audio').getAttribute('aria-keyshortcuts')")) === 'Space', 'the mounted player keeps aria-keyshortcuts="Space"');
  await ev("document.getElementById('live').scrollIntoView(); window.scrollBy(0, 40); true");
  let y0 = await scrollY();
  ok(y0 > 0, `page scrolled to ${y0}px for the scroll checks`);
  // Nothing focused: Space plays, Space stops.
  await ev('document.activeElement && document.activeElement.blur && document.activeElement.blur(); true');
  await ev("window.scrollTo(0, window.scrollY); document.getElementById('perform-audio').play().then(() => new Promise(r => setTimeout(r, 300))).then(() => { document.getElementById('perform-audio').pause(); return new Promise(r => setTimeout(r, 300)); }).then(() => true)");
  // (that first play settles the layout, so the scroll checks below measure Space alone)
  y0 = await scrollY();
  await space();
  ok(!(await paused()), 'Space plays the take without clicking into Live first');
  await sleep(300);
  await space();
  ok(await paused(), 'Space again stops it');
  const y1 = await scrollY();
  ok(y1 === y0, `Space does not scroll the page (${y0} -> ${y1})`);
  // Playhead: resumes from where the player is.
  await ev("document.getElementById('perform-audio').currentTime = 5; true");
  await sleep(200);
  await space();
  const t = await ev("document.getElementById('perform-audio').currentTime");
  ok(!(await paused()) && t >= 4.9, `Space resumes from the playhead (${t.toFixed(2)} s, set to 5 s)`);
  // Key repeat does nothing.
  await key('keyDown', { text: ' ', autoRepeat: true }); await key('keyDown', { text: ' ', autoRepeat: true }); await sleep(250);
  ok(!(await paused()), 'held Space (key repeat) does not flip play/stop');
  await key('keyUp'); await space();
  ok(await paused(), 'stopped again');
  // Modifiers are left alone.
  await space({ modifiers: 8 });
  ok(await paused(), 'Shift+Space is ignored');
  // Focused controls: Space plays/stops instead of pressing them.
  const art = "document.querySelector('article.hack:not([data-fixed])')";
  const n0 = await ev('NCStack.count()');
  const chain0 = await ev('JSON.stringify(NCStack.chain())');
  ok(await focus(`${art}.querySelector('.hack-bypass')`), 'focus a hack speaker button');
  const pressed0 = await ev(`${art}.querySelector('.hack-bypass').getAttribute('aria-pressed')`);
  await space();
  ok(!(await paused()), 'Space on a focused speaker button plays');
  ok((await ev(`${art}.querySelector('.hack-bypass').getAttribute('aria-pressed')`)) === pressed0, 'the speaker button was not pressed');
  await focus(`${art}.querySelector('.hack-die')`);
  await space();
  ok(await paused(), 'Space on a focused die button stops');
  await focus(`${art}.querySelector('.hack-remove')`);
  await space();
  ok(!(await paused()), 'Space on a focused × button plays');
  ok((await ev('NCStack.count()')) === n0 && (await ev('JSON.stringify(NCStack.chain())')) === chain0, 'no hack was removed, bypassed or randomized');
  await focus("document.getElementById('lloop')");
  const loop0 = await ev("document.getElementById('lloop').checked");
  await space();
  ok(await paused() && (await ev("document.getElementById('lloop').checked")) === loop0, 'Space on the focused Loop checkbox stops and leaves Loop alone');
  const slider = `${art}.querySelector('input[type=range]')`;
  await focus(slider);
  const v0 = await ev(`${slider}.value`);
  await space();
  ok(!(await paused()) && (await ev(`${slider}.value`)) === v0, 'Space on a focused slider plays and leaves the slider alone');
  await ev(`${slider}.blur(); true`); await space();
  ok(await paused(), 'stopped');
  ok((await scrollY()) === y0, 'none of that scrolled the page');
  // Typing keeps Space.
  await ev("document.getElementById('piece-more').open = true; true");
  ok(await focus("document.getElementById('title')"), 'focus the Title text field');
  await ev("document.getElementById('title').value = 'a'; true");
  await space();
  ok(await paused(), 'Space in a text field does not play');
  ok((await ev("document.getElementById('title').value")) === 'a ', 'and it types a space');
  await ev("(() => { const t = document.createElement('textarea'); t.id = 'space-ta'; document.getElementById('live').appendChild(t); const d = document.createElement('div'); d.id = 'space-ce'; d.contentEditable = 'true'; d.textContent = 'x'; document.getElementById('live').appendChild(d); return true; })()");
  await focus("document.getElementById('space-ta')");
  await space();
  ok(await paused() && (await ev("document.getElementById('space-ta').value")) === ' ', 'Space in a textarea types, does not play');
  await focus("document.getElementById('space-ce')");
  await space();
  ok(await paused(), 'Space in a contenteditable does not play');
  await ev("document.getElementById('space-ta').remove(); document.getElementById('space-ce').remove(); true");
  await focus("document.getElementById('hack-type')");
  await space();
  ok(await paused(), 'Space on the Add a hack dropdown does not play');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  // Live gone: Space is the browser's again.
  await ev('NCLive.hide(); document.activeElement && document.activeElement.blur && document.activeElement.blur(); true');
  const prevented = await ev("(() => { const e = new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true, cancelable: true }); document.body.dispatchEvent(e); return e.defaultPrevented; })()");
  ok(!prevented, 'once Live is hidden, Space is left to the browser');
} catch (e) { fails++; console.log('FAIL', e.message); }
ws.close(); proc.kill(); server.close();
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all Space checks pass');
