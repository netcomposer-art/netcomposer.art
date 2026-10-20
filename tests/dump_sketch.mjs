// Print the Sketch that /create/ would download, as JSON, for the kit render test.
import { writeFileSync } from 'node:fs';

const [port, url, out] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = list.find((t) => t.type === 'page');
if (!page) throw new Error('no chrome page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (!msg.id || !pending.has(msg.id)) return;
  const { ok, no } = pending.get(msg.id);
  pending.delete(msg.id);
  if (msg.error) no(new Error(JSON.stringify(msg.error)));
  else ok(msg.result || {});
});
await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
function send(method, params = {}) {
  const id = ++seq;
  return new Promise((ok, no) => {
    pending.set(id, { ok, no });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url });
let plan = null;
for (let i = 0; i < 50; i++) {
  const r = await send('Runtime.evaluate', {
    expression: `(() => {
      if (!document.body || document.body.getAttribute('data-ready') !== '1' || !window.NC) return null;
      NC.fill({t: 'Sketch proof', by: 'Test', c: '20 seconds. Cm, F.', p: 'Soft.'});
      var p = NC.toPlan(NC.state());
      if (!p) return {error: 'no plan'};
      return p;
    })()`,
    returnByValue: true
  });
  if (r.result && r.result.value) { plan = r.result.value; break; }
  await sleep(200);
}
ws.close();
if (!plan || plan.error) {
  process.stderr.write((plan && plan.error) || 'page did not become ready\n');
  process.exit(1);
}
const text = JSON.stringify(plan);
if (out) writeFileSync(out, text);
else process.stdout.write(text);
