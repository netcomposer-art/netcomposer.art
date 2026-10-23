// Sampler: written pitches only, no rate change, and the synth-shaped panel.
// node tests/sampler.mjs
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };

const sb = { Math, JSON, console, Float32Array, Array, Object, isFinite, URL, URLSearchParams };
sb.window = sb;
sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/sampler.js'), 'utf8'), sb);
const S = sb.NCSampler;

const octave = S.selectWritten([64], { 52: {}, 76: {} });
check(octave.play.length === 0 && octave.missing.length === 1 && octave.missing[0] === 64, 'an octave away is not a substitute, got ' + JSON.stringify(octave));
const both = S.selectWritten([64, 67, 99], { 64: 1, 67: 1 });
check(both.play.join() === '64,67' && both.missing.join() === '99', 'present pitches stay in order, got ' + JSON.stringify(both));

const cello = {
  instrument: 'cello pizzicato',
  notes: { 53: { lufs: -18 }, 48: { lufs: -18 }, 51: { lufs: -18 }, 55: { lufs: -18 }, 43: { lufs: -18 }, 46: { lufs: -18 }, 50: { lufs: -18 } }
};
const fm = S.plan(cello, [{ symbol: 'Fm', written: [53, 56, 60], start: 0, hold: 2.5, origin: 'chord' }], 0.015, 0.12);
check(fm.messages[0] === 'cello pizzicato has no G#3 and C4; Fm plays F3', 'missing-note sentence, got ' + JSON.stringify(fm.messages));
check(fm.notes.length === 1 && fm.notes[0].midi === 53, 'Fm keeps only F3, got ' + JSON.stringify(fm.notes));
check(fm.hints.length === 0, 'a catalog chord has no typeable pitch to suggest');
const typed = S.plan(cello, [{ symbol: 'n G#3', written: [56], start: 0, hold: 1, origin: 'notes' }], 0, 0.12);
check(typed.messages[0] === 'cello pizzicato has no G#3; n G#3 plays without them', 'a typed pitch is named, got ' + typed.messages[0]);
check(typed.hints[0] === 'Write n G3.', 'the hint is the nearest note the instrument has, got ' + typed.hints[0]);

const gains = S.levelGains({ 1: { lufs: -20 }, 2: { lufs: -14 }, 3: { lufs: -30 }, 4: { lufs: null } });
check(Math.abs(gains[1] - 1) < 1e-9, 'the median note stays at unity, got ' + gains[1]);
check(Math.abs(gains[2] - Math.pow(10, -3 / 20)) < 1e-9, 'a hot note is cut at -3 dB, got ' + gains[2]);
check(Math.abs(gains[3] - Math.pow(10, 3 / 20)) < 1e-9, 'a quiet note is lifted at +3 dB, got ' + gains[3]);
check(gains[4] === 1, 'a note without a loudness stays at unity');
check(S.creditLine('NC fixture', 'https://netcomposer.art/create/', 'CC-BY-SA-4.0') === 'NC fixture, https://netcomposer.art/create/, CC-BY-SA-4.0', 'one credit line');
check(S.noteName(56) === 'G#3' && S.noteName(60) === 'C4' && S.noteName(53) === 'F3', 'sharp names');
const src = readFileSync(join(root, 'create/sampler.js'), 'utf8');
check(!src.includes('playbackRate'), 'the sampler never names the rate control');

function decodeOpus(path) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', '48000', '-'], { maxBuffer: 32 * 1024 * 1024 });
  const copy = new Float32Array(raw.byteLength / 4);
  Buffer.from(copy.buffer).set(raw);
  return copy;
}
const guitarManifest = JSON.parse(readFileSync(join(root, 'create/sampler-fixtures/guitar/manifest.json'), 'utf8'));
const checkGuitar = S.guitarCheck();
const pcm = {};
for (const midi of [64, 67, 71, 74, 57, 61]) pcm[midi] = decodeOpus(join(root, 'create/sampler-fixtures/guitar', midi + '.opus'));
const mixed = S.mix(guitarManifest, checkGuitar.events, pcm, { spread: checkGuitar.spread, fade: 0.12 });
check(mixed.messages.length === 0, 'the guitar check pitches all exist, got ' + JSON.stringify(mixed.messages));
check(Math.abs(mixed.peak - Math.pow(10, -1 / 20)) < 1e-4, 'the listen mix peaks at -1 dB, got ' + mixed.peak);
check(mixed.left.length === mixed.right.length && mixed.rate === 48000, 'stereo 48 kHz');
const seconds = mixed.left.length / mixed.rate;
check(seconds > 19 && seconds < 22, 'eight chords of 4 beats at 96 BPM, got ' + seconds);
let energy = 0;
for (let i = 0; i < mixed.left.length; i += 48) energy += mixed.left[i] * mixed.left[i];
check(energy > 1, 'the guitar clip is not silent, energy ' + energy);

function wavBytes(left, right, rate) {
  const n = left.length;
  const dataLen = n * 4;
  const buf = Buffer.alloc(44 + dataLen);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataLen, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(rate, 24);
  buf.writeUInt32LE(rate * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataLen, 40);
  for (let i = 0; i < n; i++) {
    for (const ch of [left, right]) {
      let x = ch[i];
      if (x > 1) x = 1;
      else if (x < -1) x = -1;
      buf.writeInt16LE(x < 0 ? Math.round(x * 0x8000) : Math.round(x * 0x7FFF), 44 + (i * 2 + (ch === right ? 1 : 0)) * 2);
    }
  }
  return buf;
}
await mkdir('/opt/cursor/artifacts', { recursive: true });
const clipPath = '/opt/cursor/artifacts/guitar-em7-a-x4.wav';
await writeFile(clipPath, wavBytes(mixed.left, mixed.right, mixed.rate));
console.log('clip ' + seconds.toFixed(3) + ' s ' + clipPath);

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}

const SYNTH = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/nc.css">
<style>
body{margin:0;background:#F5F5F2}
.nc{background:#F5F5F2;color:#202523;font-family:Inter,sans-serif}
.nc-module{background:var(--nc-bg);padding:24px}
.nc-module[data-module="01"]{--nc-bg:#F3F3F0;background:#F3F3F0}
.nc-module[data-module="02"]{--nc-bg:#EEEEEB;background:#EEEEEB}
.nc-module[data-module="03"]{--nc-bg:#E9E9E6;background:#E9E9E6}
.nc-module[data-module="04"]{--nc-bg:#E4E4E1;background:#E4E4E1}
@media(min-width:1024px){.nc-module{padding:28px 32px}}
.nc-mono{font-family:var(--nc-mono);font-variant-numeric:tabular-nums}
.nc-label{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#7C8580;font-weight:500;margin:0 0 14px}
.nc-label .nc-mono{margin-right:.7em}
.nc-ctl{margin:0 0 14px}
.nc-ctl:last-child{margin-bottom:0}
.nc-ctl:hover .nc-label{color:#202523}
.nc-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:0 0 4px}
.nc-read{font-size:12px;color:#202523}
.nc-select{appearance:none;-webkit-appearance:none;background:transparent;border:0;border-bottom:1px solid #D9DEDA;padding:4px 18px 4px 0;font-size:13px;color:#202523;width:100%;border-radius:0;
  background-image:linear-gradient(45deg,transparent 50%,#7C8580 50%),linear-gradient(135deg,#7C8580 50%,transparent 50%);
  background-position:calc(100% - 7px) 55%,calc(100% - 3px) 55%;background-size:4px 4px;background-repeat:no-repeat}
.nc-range{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:transparent}
.nc-range::-webkit-slider-runnable-track{height:1px;background:#D9DEDA}
.nc-range::-moz-range-track{height:1px;background:#D9DEDA}
.nc-range::-webkit-slider-thumb{-webkit-appearance:none;width:11px;height:11px;border-radius:50%;background:#202523;margin-top:-5px}
.nc-range::-moz-range-thumb{width:11px;height:11px;border:0;border-radius:50%;background:#202523}
.nc-seg{display:flex;border-bottom:1px solid #D9DEDA}
.nc-seg button{flex:1;padding:6px 0;font-size:12px;color:#7C8580;background:transparent;border:0;position:relative}
.nc-seg button[aria-pressed="true"]{color:#202523}
.nc-seg button[aria-pressed="true"]::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#426C61}
</style></head><body>
<div class="nc" id="synth">
<section class="nc-module" data-module="01"><p class="nc-label"><span class="nc-mono">01</span>Osc</p>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Wave</span></div>
<select class="nc-select" aria-label="Wave"><option>Saw</option><option>Square</option><option>Sine</option></select></div>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Tune</span><span class="nc-mono nc-read">0 ct</span></div>
<input class="nc-range" type="range" min="-100" max="100" value="0"></div></section>
<section class="nc-module" data-module="02"><p class="nc-label"><span class="nc-mono">02</span>Filter</p>
<div class="nc-seg" role="group" aria-label="Filter"><button type="button" aria-pressed="true">Low</button><button type="button" aria-pressed="false">High</button><button type="button" aria-pressed="false">Band</button></div>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Cutoff</span><span class="nc-mono nc-read">1400 Hz</span></div>
<input class="nc-range" type="range" min="0" max="100" value="42"></div></section>
<section class="nc-module" data-module="03"><p class="nc-label"><span class="nc-mono">03</span>Env</p>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Attack</span><span class="nc-mono nc-read">18 ms</span></div>
<input class="nc-range" type="range" value="18" min="0" max="100"></div>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Release</span><span class="nc-mono nc-read">400 ms</span></div>
<input class="nc-range" type="range" value="40" min="0" max="100"></div></section>
<section class="nc-module" data-module="04"><p class="nc-label"><span class="nc-mono">04</span>Level</p>
<div class="nc-ctl"><div class="nc-row"><span class="nc-label">Master</span><span class="nc-mono nc-read">76</span></div>
<input class="nc-range" type="range" min="0" max="100" value="76"></div></section>
</div></body></html>`;

const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  problems.push('Chrome is required for the sampler page');
} else if (!problems.length) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.opus': 'audio/ogg' };
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname === '/synth-ref') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(SYNTH);
      return;
    }
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith('/')) path += 'index.html';
    try {
      const body = await readFile(join(root, path));
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const dbg = 9700 + Math.floor(Math.random() * 200);
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-sampler-'))}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const shots = {};
  try {
    let target;
    for (let i = 0; i < 80 && !target; i++) {
      try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); }
    }
    check(target && target.webSocketDebuggerUrl, 'Chrome did not open a page');
    if (target && target.webSocketDebuggerUrl) {
      const ws = new WebSocket(target.webSocketDebuggerUrl);
      let seq = 0;
      const pending = new Map();
      const errors = [];
      ws.addEventListener('message', (ev) => {
        const m = JSON.parse(ev.data);
        if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails && (m.params.exceptionDetails.text || m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description) || 'exception');
        if (m.id && pending.has(m.id)) {
          const p = pending.get(m.id);
          pending.delete(m.id);
          m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {});
        }
      });
      await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
      const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
      const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
      await send('Page.enable');
      await send('Runtime.enable');
      const goto = async (path) => {
        await send('Page.navigate', { url: `http://127.0.0.1:${port}${path}` });
        for (let i = 0; i < 80; i++) {
          const ready = await ev('document.body && document.body.getAttribute("data-ready") === "1"');
          if (ready) return;
          await sleep(50);
        }
        check(false, 'page did not become ready: ' + path);
      };
      const size = async (w, h) => { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 }); };
      const clipOf = async (sel) => ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({block:'start'}); const r = e.getBoundingClientRect(); return {x: r.x, y: r.y, width: r.width, height: r.height}; })()`);
      const shoot = async (sel, file) => {
        const box = await clipOf(sel);
        check(box && box.width > 40 && box.height > 40, 'nothing to shoot for ' + sel + ' ' + JSON.stringify(box));
        if (!box) return;
        const height = Math.min(4000, Math.ceil(box.height + 8));
        if (height > 860) await size(Math.ceil(box.width + box.x + 8), height + Math.ceil(box.y));
        const again = await clipOf(sel);
        const png = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: again.x, y: again.y, width: again.width, height: again.height, scale: 1 } });
        const path = '/opt/cursor/artifacts/' + file;
        await writeFile(path, Buffer.from(png.data, 'base64'));
        shots[file] = path;
      };

      await size(1280, 900);
      await goto('/create/');
      const off = await ev(`(() => {
        const box = document.getElementById('sampler');
        const names = [...document.getElementById('inst').options].map(o => o.textContent);
        return { hidden: !box || box.hidden, names: names, flag: document.body.getAttribute('data-sampler') };
      })()`);
      check(off && off.hidden && off.flag === '0' && !off.names.includes('Guitar') && !off.names.includes('Cello pizzicato'), 'the sampler stays hidden, got ' + JSON.stringify(off));

      await goto('/create/?sampler=1&notes=/create/sampler-fixtures/');
      for (let i = 0; i < 80; i++) {
        const ready = await ev('document.getElementById("sampler") && document.getElementById("sampler").getAttribute("data-sampler-ready") === "1"');
        if (ready) break;
        await sleep(50);
      }
      await ev(`(() => {
        document.getElementById('comp').value = '96 BPM\\n[Em7 A]x4';
        document.getElementById('comp').dispatchEvent(new Event('input'));
        document.getElementById('inst').value = 'guitar';
        document.getElementById('inst').dispatchEvent(new Event('change'));
      })()`);
      let guitar = null;
      for (let i = 0; i < 80; i++) {
        guitar = await ev(`(() => {
          const box = document.getElementById('sampler');
          const label = getComputedStyle(document.querySelector('#sampler .nc-label'));
          const mod = getComputedStyle(document.querySelector('#sampler .nc-module'));
          const mono = getComputedStyle(document.querySelector('#sampler .nc-label .nc-mono'));
          const labels = [...document.querySelectorAll('#sampler .nc-label')].map(e => e.textContent.replace(/\\s+/g, ' ').trim());
          const ring = document.getElementById('sampler-ring-range');
          const fade = document.getElementById('sampler-fade-range');
          return {
            hidden: box.hidden,
            loaded: box.getAttribute('data-loaded'),
            labels,
            color: label.color,
            transform: label.textTransform,
            track: label.letterSpacing,
            bg: mod.backgroundColor,
            rule: mod.borderBottomColor,
            accent: getComputedStyle(box).getPropertyValue('--nc-acc').trim(),
            font: mono.fontFamily,
            ring: document.getElementById('sampler-ring').textContent,
            fade: document.getElementById('sampler-fade').textContent,
            strum: document.getElementById('sampler-strum-read').textContent,
            ringOff: ring.disabled, fadeOff: fade.disabled,
            miss: document.getElementById('sampler-miss').textContent,
            credit: document.getElementById('sampler-credit').textContent,
            license: document.getElementById('sampler-license').textContent,
            missingKeys: document.querySelectorAll('#sampler .nc-key[data-on="0"]').length,
            keys: document.querySelectorAll('#sampler .nc-key').length,
            pad: mod.padding
          };
        })()`);
        if (guitar && guitar.loaded && !String(guitar.loaded).startsWith('0/')) break;
        await sleep(50);
      }
      check(guitar && guitar.hidden === false, 'the panel is visible with the flag, got ' + JSON.stringify(guitar && guitar.hidden));
      check(guitar && guitar.labels[0] === '01 Instrument' && guitar.labels.includes('02 Notes') && guitar.labels.includes('03 Ring') && guitar.labels.includes('04 Level') && guitar.labels.includes('05 Strum'), 'module index and names, got ' + JSON.stringify(guitar && guitar.labels));
      check(guitar && !guitar.labels.some((t) => /pitch|speed|stretch|rate/i.test(t)), 'no pitch or speed control, got ' + JSON.stringify(guitar && guitar.labels));
      check(guitar && guitar.color === 'rgb(124, 133, 128)' && guitar.bg === 'rgb(255, 255, 255)' && guitar.rule === 'rgb(217, 222, 218)', 'ink, white, divider, got ' + JSON.stringify(guitar && { color: guitar.color, bg: guitar.bg, rule: guitar.rule }));
      check(guitar && guitar.accent === '#426C61', 'accent, got ' + (guitar && guitar.accent));
      check(guitar && /ibm plex mono/i.test(guitar.font) && guitar.transform === 'uppercase', 'mono index and tracked label, got ' + JSON.stringify(guitar && { font: guitar.font, transform: guitar.transform, track: guitar.track }));
      check(guitar && guitar.ring === '8 s' && guitar.fade === '120 ms' && guitar.ringOff && guitar.fadeOff, 'ring cap and fade are fixed, got ' + JSON.stringify(guitar && { ring: guitar.ring, fade: guitar.fade }));
      check(guitar && guitar.strum === '18 ms', 'guitar strum default, got ' + (guitar && guitar.strum));
      check(guitar && guitar.credit === 'NC fixture, https://netcomposer.art/create/, CC-BY-SA-4.0' && guitar.license === 'CC-BY-SA-4.0', 'credit and license, got ' + JSON.stringify(guitar && { credit: guitar.credit, license: guitar.license }));
      check(guitar && guitar.miss === '' && guitar.missingKeys === 0 && guitar.keys > 20, 'guitar shows every pitch in its range, got ' + JSON.stringify(guitar && { miss: guitar.miss, missingKeys: guitar.missingKeys, keys: guitar.keys }));
      check(guitar && guitar.pad === '28px 32px', 'desktop module padding, got ' + (guitar && guitar.pad));
      await shoot('#sampler', 'sampler-guitar-desktop.png');
      await ev(`document.getElementById('gatherBtn').click()`);
      let gathered = null;
      for (let i = 0; i < 80; i++) {
        gathered = await ev(`(() => {
          const title = document.querySelector('#gather-list .g-title');
          return {
            status: document.getElementById('gather-status').textContent,
            hidden: document.getElementById('gatherBtn').hidden,
            rows: document.querySelectorAll('#gather-list li').length,
            title: title ? title.textContent : ''
          };
        })()`);
        if (gathered && /Gathered|has no|did not load/.test(gathered.status)) break;
        await sleep(50);
      }
      check(gathered && gathered.status === 'Gathered.' && gathered.rows === 1 && /NC fixture/.test(gathered.title), 'gather loads the sampler notes, got ' + JSON.stringify(gathered));

      await ev(`(() => {
        document.getElementById('comp').value = '96 BPM\\n[Cm Fm Gm]x2';
        document.getElementById('comp').dispatchEvent(new Event('input'));
        document.getElementById('inst').value = 'cello-pizzicato';
        document.getElementById('inst').dispatchEvent(new Event('change'));
      })()`);
      let celloPage = null;
      for (let i = 0; i < 40; i++) {
        celloPage = await ev(`(() => ({
          miss: document.getElementById('sampler-miss').textContent,
          iread: document.getElementById('iread').textContent,
          strum: document.getElementById('sampler-strum-read').textContent,
          gaps: document.querySelectorAll('#sampler .nc-key[data-on="0"]').length
        }))()`);
        if (celloPage && /cello pizzicato has no/.test(celloPage.miss)) break;
        await sleep(40);
      }
      check(celloPage && celloPage.miss.indexOf('cello pizzicato has no G#3 and C4; Fm plays F4') >= 0, 'the page names the missing cello notes, got ' + JSON.stringify(celloPage));
      check(celloPage && celloPage.iread.indexOf('cello pizzicato has no G#3 and C4; Fm plays F4') >= 0, 'I read carries the same sentence, got ' + (celloPage && celloPage.iread));
      check(celloPage && celloPage.strum === '15 ms' && celloPage.gaps >= 2, 'cello strum and dimmed missing keys, got ' + JSON.stringify(celloPage));
      await shoot('#sampler', 'sampler-cello-desktop.png');

      await size(390, 844);
      await sleep(50);
      const phone = await ev(`(() => {
        const mods = [...document.querySelectorAll('#sampler .nc-module')];
        const a = mods[0].getBoundingClientRect(), b = mods[1].getBoundingClientRect();
        return { pad: getComputedStyle(mods[0]).padding, stack: b.top >= a.bottom - 1, width: Math.round(a.width), same: Math.round(a.width) === Math.round(b.width) };
      })()`);
      check(phone && phone.pad === '24px' && phone.stack && phone.same && phone.width > 300 && phone.width < 420, 'phone stacks full width at 24px, got ' + JSON.stringify(phone));
      await shoot('#sampler', 'sampler-cello-phone.png');

      await size(1100, 1200);
      await send('Page.navigate', { url: `http://127.0.0.1:${port}/synth-ref` });
      await sleep(200);
      await shoot('#synth', 'synth-panel-desktop.png');
      await size(390, 900);
      await sleep(50);
      await shoot('#synth', 'synth-panel-phone.png');

      const ratePage = await (async () => {
        await size(1280, 900);
        await goto('/create/?sampler=1&notes=/create/sampler-fixtures/');
        for (let i = 0; i < 80; i++) {
          if (await ev('document.getElementById("sampler") && document.getElementById("sampler").getAttribute("data-sampler-ready") === "1"')) break;
          await sleep(50);
        }
        await ev(`(() => {
          const orig = AudioContext.prototype.createBufferSource;
          window.__rateWrites = [];
          window.__rates = [];
          function wrap(s) {
            const p = s.playbackRate;
            window.__rates.push(p.value);
            const proto = Object.getPrototypeOf(p);
            const desc = Object.getOwnPropertyDescriptor(proto, 'value') || Object.getOwnPropertyDescriptor(p, 'value');
            if (desc && desc.set && desc.get) {
              Object.defineProperty(p, 'value', { configurable: true, get() { return desc.get.call(p); }, set(v) { window.__rateWrites.push(v); desc.set.call(p, v); } });
            }
            ['setValueAtTime', 'linearRampToValueAtTime', 'exponentialRampToValueAtTime', 'setTargetAtTime', 'setValueCurveAtTime'].forEach((name) => {
              const fn = p[name];
              if (typeof fn !== 'function') return;
              p[name] = function (v) { window.__rateWrites.push(['call', name, v]); return fn.apply(p, arguments); };
            });
            return s;
          }
          AudioContext.prototype.createBufferSource = function () { return wrap(orig.apply(this, arguments)); };
          if (window.OfflineAudioContext) {
            const o = OfflineAudioContext.prototype.createBufferSource;
            OfflineAudioContext.prototype.createBufferSource = function () { return wrap(o.apply(this, arguments)); };
          }
          document.getElementById('comp').value = '96 BPM\\nn E4';
          document.getElementById('comp').dispatchEvent(new Event('input'));
          document.getElementById('inst').value = 'guitar';
          document.getElementById('inst').dispatchEvent(new Event('change'));
        })()`);
        await sleep(200);
        await ev(`document.getElementById('play').click()`);
        let rates = null;
        for (let i = 0; i < 80; i++) {
          rates = await ev(`({ writes: window.__rateWrites || [], rates: window.__rates || [], status: document.getElementById('status').textContent })`);
          if (rates && rates.rates && rates.rates.length) break;
          await sleep(50);
        }
        return rates;
      })();
      check(ratePage && ratePage.rates && ratePage.rates.length > 0 && ratePage.rates.every((v) => v === 1), 'every note source stays at unity, got ' + JSON.stringify(ratePage));
      check(ratePage && Array.isArray(ratePage.writes) && ratePage.writes.length === 0, 'nothing writes a different rate, got ' + JSON.stringify(ratePage && ratePage.writes));
      if (errors.length) check(false, 'page exception: ' + errors.slice(0, 3).join(' | '));
      ws.close();
    }
  } finally {
    proc.kill('SIGKILL');
    server.close();
  }

  if (!problems.length && shots['sampler-guitar-desktop.png'] && shots['synth-panel-desktop.png']) {
    const py = `
from PIL import Image, ImageDraw
import os
def pair(a, b, out, aw, bw):
    left, right = Image.open(a).convert('RGB'), Image.open(b).convert('RGB')
    gap, cap = 28, 36
    w = left.width + right.width + gap
    h = max(left.height, right.height) + cap
    im = Image.new('RGB', (w, h), (255, 255, 255))
    d = ImageDraw.Draw(im)
    d.text((8, 10), aw, fill=(32, 37, 35))
    d.text((left.width + gap, 10), bw, fill=(32, 37, 35))
    im.paste(left, (0, cap))
    im.paste(right, (left.width + gap, cap))
    im.save(out)
pair(${JSON.stringify(shots['synth-panel-desktop.png'])}, ${JSON.stringify(shots['sampler-guitar-desktop.png'])}, '/opt/cursor/artifacts/sampler-vs-synth-desktop.png', 'Synth panel', 'Sampler panel')
pair(${JSON.stringify(shots['synth-panel-phone.png'])}, ${JSON.stringify(shots['sampler-cello-phone.png'])}, '/opt/cursor/artifacts/sampler-vs-synth-phone.png', 'Synth panel', 'Sampler panel')
print('paired')
`;
    execFileSync('python3', ['-c', py], { stdio: 'inherit' });
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('sampler ok');
