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

// Same pitches pickVoicing writes for Cm, then Fm, then Gm (create/chords.json).
const cello = {
  instrument: 'cello pizzicato',
  notes: { 65: { lufs: -12 }, 55: { lufs: -18 }, 63: { lufs: -18 }, 58: { lufs: -18 }, 62: { lufs: -18 }, 48: { lufs: -18 }, 51: { lufs: -18 }, 43: { lufs: -18 }, 46: { lufs: -18 }, 50: { lufs: -18 } }
};
const FM_SENTENCE = 'Cello pizzicato has no C4 or G#3, so Fm plays F4 only.';
const CM_SENTENCE = 'Cello pizzicato has no C4, so Cm plays G3 and D#4.';
const fm = S.plan(cello, [{ symbol: 'Fm', written: [56, 60, 65], start: 0, hold: 2.5, origin: 'chord' }], 0.015, 0.12);
check(fm.messages[0] === FM_SENTENCE, 'missing-note sentence, got ' + JSON.stringify(fm.messages));
check(fm.notes.length === 1 && fm.notes[0].midi === 65, 'Fm keeps only F4, got ' + JSON.stringify(fm.notes));
check(fm.hints.length === 0, 'a catalog chord has no typeable pitch to suggest');
const cm = S.plan(cello, [{ symbol: 'Cm', written: [55, 60, 63], start: 0, hold: 2.5, origin: 'chord' }], 0.015, 0.12);
check(cm.messages[0] === CM_SENTENCE, 'Cm sentence, got ' + JSON.stringify(cm.messages));
check(cm.notes.map((n) => n.midi).join() === '55,63', 'Cm keeps G3 and D#4, got ' + JSON.stringify(cm.notes));
const typed = S.plan(cello, [{ symbol: 'n G#3', written: [56], start: 0, hold: 1, origin: 'notes' }], 0, 0.12);
check(typed.messages[0] === 'Cello pizzicato has no G#3, so n G#3 plays nothing.', 'a typed pitch is named, got ' + typed.messages[0]);
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

await mkdir('/opt/cursor/artifacts', { recursive: true });
console.log('guitar mix ' + seconds.toFixed(3) + ' s (stand-in clip left as it is)');

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
.nc-seg button[aria-pressed="true"]::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#003153}
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
      let view = { w: 1280, h: 900 };
      const size = async (w, h) => {
        view = { w, h };
        await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
      };
      const pngSize = (buf) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });
      // A viewport taller than the page keeps scroll at 0, so the element box
      // and the screenshot clip are the same rectangle. That captures the whole
      // panel instead of the slice that was on screen.
      const boxOf = async (sel) => ev(`(() => {
        const e = document.querySelector(${JSON.stringify(sel)});
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { x: r.left, y: r.top, width: r.width, height: r.height, scrollY: window.scrollY };
      })()`);
      const shoot = async (sel, file, minH) => {
        await ev('window.scrollTo(0, 0)');
        let box = await boxOf(sel);
        if (box && box.y + box.height + 24 > view.h) {
          await size(view.w, Math.ceil(box.y + box.height + 24));
          await ev('window.scrollTo(0, 0)');
          box = await boxOf(sel);
        }
        check(box && box.scrollY === 0 && box.width > 40 && box.height > (minH || 40), 'nothing to shoot for ' + sel + ' ' + JSON.stringify(box));
        if (!box) return null;
        const clip = {
          x: Math.max(0, Math.floor(box.x)),
          y: Math.max(0, Math.floor(box.y)),
          width: Math.ceil(box.width),
          height: Math.ceil(box.height),
          scale: 1
        };
        const png = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
        const buf = Buffer.from(png.data, 'base64');
        const dim = pngSize(buf);
        check(Math.abs(dim.w - clip.width) <= 2 && Math.abs(dim.h - clip.height) <= 2, file + ' is ' + dim.w + 'x' + dim.h + ', panel is ' + clip.width + 'x' + clip.height);
        const path = '/opt/cursor/artifacts/' + file;
        await writeFile(path, buf);
        shots[file] = path;
        return box;
      };

      await size(1280, 2400);
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
          const labels = [...document.querySelectorAll('#sampler .nc-module > .nc-label')].map(e => e.textContent.replace(/\\s+/g, ' ').trim());
          const ring = document.getElementById('sampler-ring-range');
          const fade = document.getElementById('sampler-fade-range');
          const times = document.querySelector('#prog .times');
          return {
            hidden: box.hidden,
            loaded: box.getAttribute('data-loaded'),
            labels,
            modules: document.querySelectorAll('#sampler .nc-module').length,
            color: label.color,
            transform: label.textTransform,
            track: label.letterSpacing,
            bgs: [...document.querySelectorAll('#sampler .nc-module')].map(e => getComputedStyle(e).backgroundColor),
            accent: getComputedStyle(box).getPropertyValue('--nc-acc').trim(),
            font: mono.fontFamily,
            ringFont: getComputedStyle(document.getElementById('sampler-ring')).fontFamily,
            ring: document.getElementById('sampler-ring').textContent,
            fade: document.getElementById('sampler-fade').textContent,
            strum: document.getElementById('sampler-strum-read').textContent,
            ringOff: ring.disabled, fadeOff: fade.disabled,
            credit: document.getElementById('sampler-credit').textContent,
            license: !!document.getElementById('sampler-license'),
            missingKeys: document.querySelectorAll('#sampler .nc-key[data-on="0"]').length,
            used: document.querySelectorAll('#sampler .nc-key[data-use="1"]').length,
            keys: document.querySelectorAll('#sampler .nc-key').length,
            pad: mod.padding,
            iread: document.getElementById('iread').textContent,
            chips: document.querySelectorAll('#prog .ch').length,
            times: times ? times.textContent : '',
            groups: document.querySelectorAll('#prog .grp').length,
            tempo: document.getElementById('tempo').value,
            meter: document.getElementById('meter').value
          };
        })()`);
        if (guitar && guitar.loaded && !String(guitar.loaded).startsWith('0/')) break;
        await sleep(50);
      }
      check(guitar && guitar.hidden === false, 'the panel is visible with the flag, got ' + JSON.stringify(guitar && guitar.hidden));
      const shades = ['rgb(243, 243, 240)', 'rgb(238, 238, 235)', 'rgb(233, 233, 230)', 'rgb(228, 228, 225)', 'rgb(223, 223, 220)'];
      check(guitar && guitar.labels.join(' | ') === '01 Instrument | 02 Notes | 03 Ring | 04 Level | 05 Strum', 'module index and names, got ' + JSON.stringify(guitar && guitar.labels));
      check(guitar && guitar.modules === 5, 'five shaded modules, got ' + (guitar && guitar.modules));
      check(guitar && !guitar.labels.some((t) => /pitch|speed|stretch|rate|license/i.test(t)), 'no pitch, speed, or license heading, got ' + JSON.stringify(guitar && guitar.labels));
      check(guitar && guitar.color === 'rgb(124, 133, 128)' && guitar.bgs && guitar.bgs.join() === shades.join(), 'label ink and module shades, got ' + JSON.stringify(guitar && { color: guitar.color, bgs: guitar.bgs }));
      check(guitar && guitar.accent === '#003153', 'accent, got ' + (guitar && guitar.accent));
      check(guitar && /ibm plex mono/i.test(guitar.font) && /ibm plex mono/i.test(guitar.ringFont) && guitar.transform === 'uppercase', 'mono index and ring readout, got ' + JSON.stringify(guitar && { font: guitar.font, ringFont: guitar.ringFont, transform: guitar.transform }));
      check(guitar && guitar.ring === '8 s' && guitar.fade === '120 ms' && guitar.ringOff && guitar.fadeOff, 'ring cap and fade are fixed, got ' + JSON.stringify(guitar && { ring: guitar.ring, fade: guitar.fade }));
      check(guitar && guitar.strum === '18 ms', 'guitar strum default, got ' + (guitar && guitar.strum));
      check(guitar && guitar.credit === 'NC fixture, https://netcomposer.art/create/, CC-BY-SA-4.0' && guitar.license === false, 'one credit line, got ' + JSON.stringify(guitar && { credit: guitar.credit, license: guitar.license }));
      check(guitar && guitar.missingKeys === 0 && guitar.used > 0 && guitar.keys > 20, 'guitar highlights the chord and dims nothing, got ' + JSON.stringify(guitar && { used: guitar.used, missingKeys: guitar.missingKeys, keys: guitar.keys }));
      check(guitar && guitar.pad === '28px 32px', 'desktop module padding, got ' + (guitar && guitar.pad));
      check(guitar && guitar.tempo === '96' && guitar.meter === '4/4', 'tempo and time signature header, got ' + JSON.stringify(guitar && { tempo: guitar.tempo, meter: guitar.meter }));
      check(guitar && guitar.groups === 1 && guitar.chips === 2 && guitar.times === '×4', 'Play shows [Em7 A] once, got ' + JSON.stringify(guitar && { groups: guitar.groups, chips: guitar.chips, times: guitar.times }));
      check(guitar && guitar.iread.indexOf('96 BPM') >= 0 && guitar.iread.indexOf('×4') >= 0 && guitar.iread.indexOf('q96') < 0, 'I read is the current line, got ' + (guitar && guitar.iread));

      await ev(`(() => {
        document.getElementById('comp').value = '96 BPM\\n[Cm Fm Gm]x2';
        document.getElementById('comp').dispatchEvent(new Event('input'));
        document.getElementById('inst').value = 'cello-pizzicato';
        document.getElementById('inst').dispatchEvent(new Event('change'));
      })()`);
      let celloPage = null;
      for (let i = 0; i < 40; i++) {
        celloPage = await ev(`(() => {
          const tl = NC.timeline();
          const voicing = {};
          (tl && tl.chords || []).forEach((c) => { if (!voicing[c.symbol]) voicing[c.symbol] = c.voicing.join(','); });
          const key = (name) => document.querySelector('#sampler .nc-key[title="' + name + '"]');
          const times = document.querySelector('#prog .times');
          return {
            iread: document.getElementById('iread').textContent,
            strum: document.getElementById('sampler-strum-read').textContent,
            gaps: document.querySelectorAll('#sampler .nc-key[data-on="0"]').length,
            used: document.querySelectorAll('#sampler .nc-key[data-use="1"]').length,
            f4: key('F4') ? key('F4').getAttribute('data-use') : '',
            c4: key('C4') ? key('C4').getAttribute('data-on') : '',
            gs: key('G#3') ? key('G#3').getAttribute('data-on') : '',
            voicing,
            chips: document.querySelectorAll('#prog .ch').length,
            times: times ? times.textContent : '',
            groups: document.querySelectorAll('#prog .grp').length
          };
        })()`);
        if (celloPage && celloPage.f4 === '1' && celloPage.iread && celloPage.iread.indexOf('synth') >= 0) break;
        await sleep(40);
      }
      check(celloPage && celloPage.voicing && celloPage.voicing.Fm === '56,60,65' && celloPage.voicing.Cm === '55,60,63', 'the page voices from the catalog, got ' + JSON.stringify(celloPage && celloPage.voicing));
      check(celloPage && celloPage.iread.indexOf('synth') >= 0 && celloPage.iread.indexOf(FM_SENTENCE) < 0, 'I read names the synth, not the hidden instrument, got ' + (celloPage && celloPage.iread));
      check(celloPage && celloPage.iread.indexOf('96 BPM') >= 0 && celloPage.iread.indexOf('×2') >= 0 && celloPage.iread.indexOf('q96') < 0, 'I read keeps the current line, got ' + (celloPage && celloPage.iread));
      check(celloPage && celloPage.groups === 1 && celloPage.chips === 3 && celloPage.times === '×2', 'Play shows [Cm Fm Gm] once, got ' + JSON.stringify(celloPage && { groups: celloPage.groups, chips: celloPage.chips, times: celloPage.times }));
      check(celloPage && celloPage.strum === '15 ms' && celloPage.gaps >= 2 && celloPage.f4 === '1' && celloPage.c4 === '0' && celloPage.gs === '0', 'cello dims the missing pitches and accents F4, got ' + JSON.stringify(celloPage));
      const samplerDesktop = await shoot('#sampler', 'sampler-cello-desktop.png', 700);
      const pageBox = await ev(`(() => {
        let bottom = 0;
        document.querySelectorAll('body *').forEach((e) => {
          const r = e.getBoundingClientRect();
          if (r.bottom > bottom) bottom = r.bottom;
        });
        return { width: document.documentElement.clientWidth, height: Math.ceil(bottom + window.scrollY) };
      })()`);
      if (pageBox && pageBox.height + 8 > view.h) await size(view.w, Math.ceil(pageBox.height + 8));
      await ev('window.scrollTo(0, 0)');
      const pageClip = { x: 0, y: 0, width: Math.ceil(pageBox.width), height: Math.ceil(pageBox.height), scale: 1 };
      const pagePng = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: pageClip });
      const pageBuf = Buffer.from(pagePng.data, 'base64');
      const pagePath = '/opt/cursor/artifacts/create-sampler-page.png';
      await writeFile(pagePath, pageBuf);
      shots['create-sampler-page.png'] = pagePath;
      const pageDim = pngSize(pageBuf);
      check(pageDim.h > (samplerDesktop ? samplerDesktop.height : 700), 'full page is taller than the panel, got ' + pageDim.h);

      await size(390, 2400);
      await sleep(50);
      const phone = await ev(`(() => {
        const mods = [...document.querySelectorAll('#sampler .nc-module')];
        const a = mods[0].getBoundingClientRect(), b = mods[1].getBoundingClientRect();
        return { pad: getComputedStyle(mods[0]).padding, stack: b.top >= a.bottom - 1, width: Math.round(a.width), same: Math.round(a.width) === Math.round(b.width), modules: mods.length };
      })()`);
      check(phone && phone.pad === '24px' && phone.stack && phone.same && phone.width > 300 && phone.width < 420 && phone.modules === 5, 'phone stacks full width at 24px, got ' + JSON.stringify(phone));
      const samplerPhone = await shoot('#sampler', 'sampler-cello-phone.png', 700);
      check(samplerPhone && Math.round(samplerPhone.width) === 390, 'phone panel is 390 px wide, got ' + (samplerPhone && samplerPhone.width));

      const desktopWidth = samplerDesktop ? Math.round(samplerDesktop.width) : 736;
      await size(1280, 1600);
      await send('Page.navigate', { url: `http://127.0.0.1:${port}/synth-ref` });
      await sleep(200);
      await ev(`document.getElementById('synth').style.width = ${desktopWidth} + 'px'`);
      const synthDesktop = await shoot('#synth', 'synth-panel-desktop.png', 400);
      check(synthDesktop && Math.abs(Math.round(synthDesktop.width) - desktopWidth) <= 1, 'synth and sampler desktop panels share a width, got ' + (synthDesktop && synthDesktop.width));
      await size(390, 1400);
      await sleep(50);
      await ev(`document.getElementById('synth').style.width = '390px'`);
      const synthPhone = await shoot('#synth', 'synth-panel-phone.png', 400);
      check(synthPhone && Math.round(synthPhone.width) === 390, 'synth phone panel is 390 px wide, got ' + (synthPhone && synthPhone.width));

      await size(1280, 1600);
      await goto('/create/?sampler=1&notes=/create/sampler-fixtures/');
      for (let i = 0; i < 80; i++) {
        if (await ev('document.getElementById("sampler") && document.getElementById("sampler").getAttribute("data-sampler-ready") === "1"')) break;
        await sleep(50);
      }
      await ev(`(() => {
        document.getElementById('comp').value = '96 BPM\\n[Em7 A]x4';
        document.getElementById('comp').dispatchEvent(new Event('input'));
        document.getElementById('inst').value = 'guitar';
        document.getElementById('inst').dispatchEvent(new Event('change'));
      })()`);
      await sleep(100);
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
          document.getElementById('comp').value = '96 BPM\\nt1: n E4 @guitar';
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

  if (!problems.length && shots['sampler-cello-desktop.png'] && shots['synth-panel-desktop.png']) {
    const py = `
from PIL import Image, ImageDraw, ImageFont
def pair(a, b, out):
    left, right = Image.open(a).convert('RGB'), Image.open(b).convert('RGB')
    if abs(left.width - right.width) > 2:
        raise SystemExit('panels differ in width: %s %s vs %s %s' % (a, left.size, b, right.size))
    gap, cap = 28, 32
    w = left.width + right.width + gap
    h = max(left.height, right.height) + cap
    im = Image.new('RGB', (w, h), (255, 255, 255))
    d = ImageDraw.Draw(im)
    d.text((8, 8), 'Synth', fill=(32, 37, 35))
    d.text((left.width + gap, 8), 'Sampler', fill=(32, 37, 35))
    im.paste(left, (0, cap))
    im.paste(right, (left.width + gap, cap))
    im.save(out)
    print(out, im.size, 'left', left.size, 'right', right.size)
pair(${JSON.stringify(shots['synth-panel-desktop.png'])}, ${JSON.stringify(shots['sampler-cello-desktop.png'])}, '/opt/cursor/artifacts/sampler-vs-synth-desktop.png')
pair(${JSON.stringify(shots['synth-panel-phone.png'])}, ${JSON.stringify(shots['sampler-cello-phone.png'])}, '/opt/cursor/artifacts/sampler-vs-synth-phone.png')
`;
    execFileSync('python3', ['-c', py], { stdio: 'inherit' });
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('sampler ok');
