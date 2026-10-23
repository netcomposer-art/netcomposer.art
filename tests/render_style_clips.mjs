// Offline NC Synth clips for a style line, plus a screenshot of the starter.
// node tests/render_style_clips.mjs
// Writes WAVs and a PNG under /opt/cursor/artifacts. Chrome is required.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = '/opt/cursor/artifacts';
const clips = [
  { file: 'hopkins-like-sd1.wav', text: 'sd 1\nstyle hopkins-like', kind: 'chords', seed: 1 },
  { file: 'hopkins-like-sd2.wav', text: 'sd 2\nstyle hopkins-like', kind: 'chords', seed: 2 },
  { file: 'hopkins-like-sd1-arp.wav', text: 'sd 1\nstyle hopkins-like\narp up 16ths', kind: 'arp', seed: 1 }
];

function trimWav(path, maxSec) {
  const buf = readFileSync(path);
  if (buf.toString('ascii', 0, 4) !== 'RIFF') return;
  const channels = buf.readUInt16LE(22);
  const rate = buf.readUInt32LE(24);
  let at = 12;
  while (at + 8 <= buf.length) {
    const id = buf.toString('ascii', at, at + 4);
    const size = buf.readUInt32LE(at + 4);
    if (id === 'data') {
      const maxBytes = Math.floor(maxSec * rate) * channels * 2;
      if (size <= maxBytes) return;
      const next = Buffer.alloc(at + 8 + maxBytes);
      buf.copy(next, 0, 0, at + 8);
      buf.copy(next, at + 8, at + 8, at + 8 + maxBytes);
      next.writeUInt32LE(maxBytes, at + 4);
      next.writeUInt32LE(next.length - 8, 4);
      writeFileSync(path, next);
      return;
    }
    at += 8 + size + (size % 2);
  }
}

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}

const chrome = chromeBin();
if (!chrome) {
  console.error('Chrome is required');
  process.exit(1);
}
await mkdir(outDir, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'POST' && url.pathname.startsWith('/save/')) {
    const name = url.pathname.slice('/save/'.length).replace(/[^A-Za-z0-9._-]/g, '');
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    await writeFile(join(outDir, name), Buffer.concat(chunks));
    res.writeHead(200); res.end('ok');
    return;
  }
  if (url.pathname === '/t') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<!doctype html><script src="/create/chord-library.js"></script><script src="/create/language.js"></script><script src="/create/nc-synth.js"></script><script src="/create/synth-audio/dist/index.js"></script>');
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
const dbg = 9600 + Math.floor(Math.random() * 200);
const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', `--remote-debugging-port=${dbg}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-style-'))}`, '--window-size=1280,1100', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const problems = [];
try {
  let target;
  for (let i = 0; i < 80 && !target; i++) {
    try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); }
  }
  if (!target) throw new Error('chrome did not open');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let seq = 0; const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {}); }
  });
  await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
  const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
  const ev = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails).slice(0, 800));
    return result.result.value;
  };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/t` });
  for (let i = 0; i < 50 && !(await ev('typeof NCSynth !== "undefined" && typeof NCLanguage !== "undefined" && typeof NCChords !== "undefined"')); i++) await sleep(50);
  const style = JSON.parse(await readFile(join(root, 'styles/hopkins-like.json'), 'utf8'));
  await ev('NCLanguage.registerStyle(' + JSON.stringify(style) + ')');
  for (const clip of clips) {
    const info = await ev(`(async () => {
      var text = ${JSON.stringify(clip.text)};
      var parsed = NCLanguage.parse(text, { known: function (q) { return NCChords.compositionKnown(q); } });
      var bpm = parsed.bpm, beat = 60 / bpm, t = 0, notes = [];
      var PC = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
      function pcOf(sym) {
        var m = /^([A-G])(#|b)?/.exec(sym || '');
        if (!m) return 0;
        return (PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + 12) % 12;
      }
      if (${JSON.stringify(clip.kind)} === 'arp') {
        var line = NCSynth.readLine(text);
        notes = NCSynth.scheduleLine(line, null, ${clip.seed});
        t = notes.length ? notes[notes.length - 1].start + notes[notes.length - 1].length : 0;
      } else {
        parsed.played.forEach(function (ev) {
          var beats = ev.beats;
          if (ev.bars != null) beats = ev.bars * 4;
          if (!(beats > 0)) return;
          if (ev.kind !== 'chord') { t += beats * beat; return; }
          var id = NCChords.idForSymbol(ev.symbol);
          var voiced = NCChords.voicedChord(60 + pcOf(ev.symbol), id, 0, 'compact', ev.bass);
          var dur = Math.max(0.05, beats * beat * 0.94);
          voiced.forEach(function (midi) { notes.push({ midi: midi, velocity: 0.56, start: t, length: dur }); });
          t += beats * beat;
        });
      }
      var buf = await NCSynth.renderNotes(notes, null, ${clip.seed});
      var d = buf.getChannelData(0), peak = 0, sum = 0, i, x;
      for (i = 0; i < d.length; i++) { x = d[i]; if (x < 0) x = -x; if (x > peak) peak = x; sum += d[i] * d[i]; }
      var blob = NCSynth.wavBlob(buf);
      var saved = await fetch('/save/${clip.file}', { method: 'POST', body: blob });
      return { ok: saved.ok, dur: buf.duration, peak: peak, rms: Math.sqrt(sum / d.length), notes: notes.length, iread: parsed.iread.split('\\n')[0] };
    })()`);
    trimWav(join(outDir, clip.file), 60);
    console.log(clip.file, JSON.stringify(info));
    // The engine's release hangs past the last note. The line itself stays
    // inside 60 seconds; a few hundred milliseconds of tail is that release.
    if (!info || !info.ok || !(info.peak > 0.02) || info.dur < 20 || info.dur > 61) problems.push(clip.file + ' ' + JSON.stringify(info));
  }
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
  for (let i = 0; i < 80 && (await ev("document.body && document.body.getAttribute('data-ready')")) !== '1'; i++) await sleep(100);
  const shown = await ev(`(() => {
    var s = document.getElementById('starter');
    var opt = Array.prototype.find.call(s.options, function (o) { return /Hopkins-like/.test(o.textContent); });
    if (!opt) return { error: 'no starter' };
    s.value = opt.value; s.onchange();
    return {
      value: document.getElementById('comp').value,
      iread: document.getElementById('iread').textContent,
      hidden: document.getElementById('iread').hidden,
      chords: document.querySelectorAll('#prog .ch').length,
      play: document.getElementById('play').disabled
    };
  })()`);
  console.log('starter', JSON.stringify(shown));
  if (!shown || shown.error || shown.hidden || !(shown.chords > 0) || shown.play || !/style hopkins-like →/.test(shown.iread || '') || !/arp up 16ths/.test(shown.iread || '')) {
    problems.push('starter ' + JSON.stringify(shown));
  }
  await ev("document.getElementById('write').scrollIntoView({block:'start'})");
  await sleep(80);
  const box = await ev("(() => { var a = document.getElementById('write').getBoundingClientRect(); return {x:0, y: Math.max(0, a.top + scrollY - 8), width: 1280, height: Math.ceil(a.height + 24)}; })()");
  const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1 }, captureBeyondViewport: true });
  await writeFile(join(outDir, 'hopkins-like-starter.png'), Buffer.from(img.data, 'base64'));
  ws.close();
} finally {
  proc.kill();
  server.close();
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('style clips ok');
