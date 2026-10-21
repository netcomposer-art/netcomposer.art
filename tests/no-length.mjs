// Surprise me and the blank page state no length (Petrus, 2026-10-21), and a
// Composition with no stated length gets no target: each chord plays its whole
// recording, back to back. Needs Chrome and Node 22 (or --experimental-websocket)
// for the page half; the clock half always runs.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const LENGTH = /\d+(?:\.\d+)?\s*(?:seconds?|secs?|s|minutes?|mins?|min|m)\b|\b\d+\s*bars?\b|\bBPM\b/i;

// Clock half.
const sb = {}; sb.globalThis = sb; vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/assembly.js'), 'utf8'), sb);
const A = sb.NCAssembly;
check(A.statedSeconds('Cmaj7, Am9, Fmaj7, G13. Unhurried.') === null, 'no stated length reads as none');
check(A.statedSeconds('2 min. C Am F G') === 120, '"2 min." is still read');
check(A.statedSeconds('4/4 · 80 BPM · 12 bars') === 36, 'bars and BPM still read');
check(A.takeSeconds('C Am F G') === 120, 'takeSeconds keeps its old default for other callers');
const open = [0, 1, 2, 3].map(() => ({ t: 0, dur: Infinity }));
const placed = A.placeChords(open, [4.4, 2.1, 6.0, 3.3], {});
check(JSON.stringify(placed.entries.map((e) => [e.at_s, e.len_s])) === JSON.stringify([[0, 4.4], [4.4, 2.1], [6.5, 6], [12.5, 3.3]]), 'open clock plays whole clips back to back, got ' + JSON.stringify(placed.entries));
check(placed.total_s === 15.8, 'open clock ends with the last clip, got ' + placed.total_s);
const gap = A.placeChords(open, [4.4, 2.1, 6.0, 3.3], { gap: true });
check(gap.entries.every((e) => isFinite(e.at_s) && isFinite(e.len_s)) && gap.total_s === 15.8, 'gap words with no length stay finite');

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}
const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  console.log('no-length page half skipped (Chrome and Node 22, or --experimental-websocket)');
} else {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2' };
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    try { const body = await readFile(join(root, path)); res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' }); res.end(body); }
    catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port, dbg = 9800 + Math.floor(Math.random() * 150);
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-len-'))}`, '--window-size=1100,1200', 'about:blank'], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  try {
    let target;
    for (let i = 0; i < 80 && !target; i++) { try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); } }
    const ws = new WebSocket(target.webSocketDebuggerUrl); let seq = 0; const pending = new Map();
    ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {}); } });
    await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
    const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
    const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
    await send('Page.enable'); await send('Runtime.enable');
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
    for (let i = 0; i < 150 && !(await ev("document.body && document.body.getAttribute('data-ready') === '1'")); i++) await sleep(100);
    const rows = await ev(`(() => { var out = []; for (var s = 1; s <= 400; s++) { var P = NC.makeSurprise(s * 2654435761 >>> 0); if (P) out.push([P.composition, P.mood, NCAssembly.statedSeconds(P.composition + '\\n' + P.mood)]); } return out; })()`);
    check(rows.length > 300, 'Surprise made ' + rows.length + ' of 400');
    rows.forEach((r) => { if (LENGTH.test(r[0]) || LENGTH.test(r[1]) || r[2] !== null) problems.push('Surprise states a length: ' + r[0] + ' | ' + r[1]); });
    // The button itself.
    await ev("document.getElementById('surprise').click()");
    await sleep(150);
    const shown = await ev("({ c: document.getElementById('comp').value, p: document.getElementById('perf').value, status: (document.getElementById('status') || {}).textContent || '', title: document.getElementById('surprise').title })");
    check(shown.c && !LENGTH.test(shown.c) && !LENGTH.test(shown.p), 'the Surprise button states a length: ' + JSON.stringify(shown));
    check(!/length/i.test(shown.title), 'the Surprise tooltip promises a length');
    const sel = await ev("(() => { var s = document.getElementById('starter'); s.value = 'blank'; s.onchange(); return { c: document.getElementById('comp').value, p: document.getElementById('perf').value, ph: document.getElementById('comp').placeholder }; })()");
    check(sel.c === '' && sel.p === '' && !LENGTH.test(sel.ph), 'the blank page states a length: ' + JSON.stringify(sel));
    if (process.env.SHOTS) {
      mkdirSync(process.env.SHOTS, { recursive: true });
      for (const [name, js] of [['surprise', "(() => { var s = 7; var P = NC.makeSurprise(s); NC.fill({t: 'Surprise in ' + P.key + ' ' + P.mode, by: '', c: P.composition, p: P.mood, sd: P.seed}); })()"], ['blank', "(() => { var s = document.getElementById('starter'); s.value = 'blank'; s.onchange(); })()"]]) {
        await ev(js); await sleep(200);
        await ev("document.getElementById('write').scrollIntoView({block: 'start'})"); await sleep(100);
        const r = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); return {x: 0, y: a.top + scrollY - 10, width: 1100, height: a.height + 20}; })()");
        const shot = await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: 1 }, captureBeyondViewport: true });
        writeFileSync(join(process.env.SHOTS, name + '.png'), Buffer.from(shot.data, 'base64'));
      }
    }
    ws.close();
  } finally { proc.kill(); server.close(); }
}
if (problems.length) { console.error(problems.slice(0, 20).join('\n')); process.exit(1); }
console.log('no length ok');
