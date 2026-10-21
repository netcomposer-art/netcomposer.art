// The dice on /create/ Live, in headless Chrome: the confirm only when the stack has hacks, a seeded section
// randomize, a per-hack A/B undo that restores exact dials, a hand move that ends it, the cap, labels and icon sizes.
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
if (!chrome) { console.log('dice page test skipped (no Chrome; set CHROME)'); process.exit(0); }
if (typeof WebSocket === 'undefined') { console.log('dice page test skipped (Node 22, or node --experimental-websocket)'); process.exit(0); }
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try { const body = await readFile(join(root, path)); res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' }); res.end(body); }
  catch (e) { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const dbgPort = 9800 + Math.floor(Math.random() * 150);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--remote-debugging-address=127.0.0.1',
  `--remote-debugging-port=${dbgPort}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-dice-'))}`, 'about:blank'], { stdio: 'ignore' });
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
try {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/create/` });
  for (let i = 0; i < 100; i++) { if (await ev('!!(window.NCStack && window.NCRandom && document.getElementById("live-die"))')) break; await sleep(100); }
  await ev("document.getElementById('perform-out').hidden = false; document.getElementById('live').hidden = false; true");
  const box = () => ev("!document.getElementById('live-confirm').hidden");
  const settle = async () => { for (let i = 0; i < 200; i++) { if (await ev("!document.getElementById('live-die').disabled")) return; await sleep(25); } };
  // Not empty: the section die asks first, and Cancel leaves the stack alone.
  const start = await ev('NCStack.chain().map(w => w.id).join(",")');
  await ev("document.getElementById('live-die').click()");
  ok(await box(), 'with hacks in the stack, the section die asks before replacing');
  await ev("document.getElementById('live-cancel').click()");
  ok(!(await box()) && (await ev('NCStack.chain().map(w => w.id).join(",")')) === start, 'Cancel keeps the stack as it was');
  // Replace with a seeded randomize.
  await ev('NCStack.seed(42)');
  await ev("document.getElementById('live-die').click()");
  await ev("document.getElementById('live-replace').click()");
  await settle();
  const a = await ev('JSON.stringify(NCStack.chain())');
  const n = await ev('NCStack.count()');
  ok(n >= 2 && n <= 6, `Replace builds a random stack of ${n} hacks`);
  ok(await ev("(() => { const c = NCStack.chain(); return c[c.length - 1].type === 'limiter' && c.filter(w => w.type === 'limiter').length === 1; })()"), 'the limiter stays last and alone');
  // Same seed, same stack.
  await ev('NCStack.seed(42)');
  await ev("NCStack.applyChain([]); document.getElementById('live-die').click()");
  ok(!(await box()), 'an empty stack randomizes without asking');
  await settle();
  ok((await ev('JSON.stringify(NCStack.chain())')) === a, 'the same seed builds the same stack, params and all');
  await ev('NCStack.seed(null)');
  // Per-hack A/B.
  const id = await ev('NCStack.chain()[0].id');
  const before = await ev(`JSON.stringify(NCStack.dials('${id}'))`);
  const beforeP = await ev('JSON.stringify(NCStack.chain()[0].params)');
  await ev(`NCStack.randomize('${id}', 7)`);
  const after = await ev(`JSON.stringify(NCStack.dials('${id}'))`);
  const afterP = await ev('JSON.stringify(NCStack.chain()[0].params)');
  const art = `document.querySelector('article.hack[data-id="${id}"]')`;
  ok(after !== before && (await ev(`!${art}.querySelector('.hack-undo').disabled`)), 'the hack die changes the dials and shows undo');
  ok((await ev(`${art}.querySelector('.hack-undo').getAttribute('aria-label')`)).startsWith('Undo randomize '), 'undo is labelled "Undo randomize …"');
  await ev(`${art}.querySelector('.hack-undo').click()`);
  ok((await ev(`JSON.stringify(NCStack.dials('${id}'))`)) === before && (await ev('JSON.stringify(NCStack.chain()[0].params)')) === beforeP, 'undo restores the exact dials and params from before');
  ok((await ev(`${art}.querySelector('.hack-undo').getAttribute('data-ab')`)) === 'redo', 'undo turns into redo');
  await ev(`${art}.querySelector('.hack-undo').click()`);
  ok((await ev(`JSON.stringify(NCStack.dials('${id}'))`)) === after && (await ev('JSON.stringify(NCStack.chain()[0].params)')) === afterP, 'redo brings the random dials back exactly');
  // Randomize again keeps the newest before.
  await ev(`NCStack.randomize('${id}', 8)`);
  await ev(`${art}.querySelector('.hack-undo').click()`);
  ok((await ev(`JSON.stringify(NCStack.dials('${id}'))`)) === after, 'randomizing again: undo goes back to the newest before');
  // A hand on a dial ends it.
  await ev(`NCStack.randomize('${id}', 9)`);
  await ev(`(() => { const el = ${art}.querySelector('input[type=range]'); el.value = String(+el.min); el.dispatchEvent(new Event('input', {bubbles: true})); })()`);
  ok(await ev(`${art}.querySelector('.hack-undo').disabled && NCStack.ab('${id}') === null`), 'moving a slider by hand clears the undo');
  // Cap: a full stack still randomizes to 2..6, and never over 10.
  await ev("(() => { NCStack.applyChain([]); for (let i = 0; i < 12; i++) { document.getElementById('hack-type').value = 'delay'; document.getElementById('hack-add-btn').click(); } })()");
  ok((await ev('NCStack.count()')) === 10, 'Add still stops at 10');
  let maxN = 0;
  const lv = [];
  for (let s = 1; s <= 40; s++) { maxN = Math.max(maxN, await ev(`NCStack.randomizeAll(${s}).then(() => NCStack.count())`)); lv.push(await ev('NCStack.lastLevel()')); }
  ok(maxN <= 6, `40 section randomizes, largest stack ${maxN}`);
  const dbs = lv.map((x) => x.db).sort((x, y) => x - y), inside = dbs.filter((d) => Math.abs(d) <= 4).length;
  ok(inside >= 36 && Math.abs(dbs[0]) < 9 && Math.abs(dbs[dbs.length - 1]) < 9, `level check: ${inside}/40 stacks within ±4 dB of dry (range ${dbs[0].toFixed(1)} to ${dbs[dbs.length - 1].toFixed(1)} dB, mean tries ${(lv.reduce((a, x) => a + x.tries, 0) / 40).toFixed(1)})`);
  // Labels, order and sizes.
  ok((await ev("document.getElementById('live-die').getAttribute('aria-label')")) === 'Randomize all hacks', 'the section die is labelled "Randomize all hacks"');
  ok(await ev("[...document.querySelectorAll('article.hack:not([data-fixed])')].every(a => a.querySelector('.hack-die').getAttribute('aria-label') === 'Randomize ' + a.querySelector('h3').textContent)"), 'every hack die is labelled "Randomize <name>"');
  ok(await ev("[...document.querySelectorAll('article.hack:not([data-fixed]) .hack-tools')].every(t => [...t.children].map(c => c.className.split(' ')[0]).join(',') === 'hack-undo,hack-die,hack-bypass,hack-remove')"), 'header order: undo slot, die, speaker, ×');
  ok(await ev("!document.querySelector('#hack-limiter .hack-die')"), 'the limiter has no die');
  const sizes = await ev("(() => { const r = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.width), Math.round(b.height)].join('x'); }; const a = document.querySelector('article.hack:not([data-fixed])'); return [r(a.querySelector('.hack-die svg')), r(a.querySelector('.hack-bypass svg')), r(a.querySelector('.hack-remove svg')), r(document.querySelector('#live-die svg'))]; })()");
  ok(sizes.every((x) => x === sizes[1]), `die, speaker, ×, section die render the same size: ${sizes.join(', ')}`);
  ok(await ev("(() => { const xs = [...document.querySelectorAll('article.hack:not([data-fixed]) .hack-die')].map(d => Math.round(d.getBoundingClientRect().left)); return xs.every(x => x === xs[0]); })()"), 'the dice line up in one column');
  ok(await ev("(() => { const f = document.getElementById('foot-die'); const a = f && f.querySelector('a'); return !!a && a.href === 'https://thenounproject.com/browse/icons/term/die/' && /Hamed Mirhashemi/.test(f.textContent) && /CC BY 3\\.0/.test(f.textContent); })()"), 'the footer credits the die (Hamed Mirhashemi, Noun Project, CC BY 3.0)');
  ok(await ev("(() => { const f = document.getElementById('foot-speaker'); const a = f && f.querySelector('a'); return !!a && a.href === 'https://thenounproject.com/browse/icons/term/speaker-on/' && a.target === '_blank' && /masmooh/.test(f.textContent) && /CC BY 3\\.0/.test(f.textContent); })()"), 'the footer credits the speaker (masmooh, Noun Project, CC BY 3.0)');
} catch (e) { fails++; console.log('FAIL', e.message); }
ws.close(); proc.kill(); server.close();
if (fails) { console.log(fails + ' failed'); process.exit(1); }
console.log('all dice page checks pass');
