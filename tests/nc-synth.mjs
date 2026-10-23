// NC Synth offline render: a written notes line is non-silent, and the same
// notes, settings and seed render the same buffer. Line reading runs in Node.
// The buffer needs Chrome (OfflineAudioContext). Run: node tests/nc-synth.mjs
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

const sb = { Math, JSON, Float32Array, WeakMap, Promise, Blob, DataView, ArrayBuffer, Uint8Array, console };
sb.window = sb;
sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/nc-synth.js'), 'utf8'), sb);
const S = sb.NCSynth;

const line = S.readLine('n F4 Ab4 C5 Bb4');
check(line && !line.instrument && line.notes.length === 4, 'n F4 Ab4 C5 Bb4 is four pitches and no instrument, got ' + JSON.stringify(line));
check(line && line.label === 'F4 Ab4 C5 Bb4', 'label keeps the written pitches');
check(S.midiOf('F4') === 65 && S.midiOf('Ab4') === 68 && S.midiOf('C5') === 72 && S.midiOf('Bb4') === 70, 'pitches land on the right MIDI notes');
const timed = S.scheduleLine(line, null);
check(timed.length === 4 && timed[0].start === 0 && timed[1].start > 0.5 && timed[3].length > 0.4, 'quarters sit back to back at the default tempo, got ' + JSON.stringify(timed));
const held = S.readLine('notes C4 Eb4 G4(2)');
check(held && held.notes[2].beats === 2 && held.notes[0].beats === 1, '(2) is two beats on that note only');
const flute = S.readLine('n F4 Ab4 C5 Bb4 @flute');
check(flute && flute.instrument === 'flute', '@flute on the notes line is a written instrument');
const vibe = S.readLine('t3: @vibraphone n F4 Ab4 C5');
check(vibe && vibe.instrument === 'vibraphone', '@vibraphone on the notes line is a written instrument');
check(S.readLine('Cm Fm9 Gm7') === null, 'a chord line is not a notes line');
const bad = S.mergeSettings({ cutoff: 999999, waveform: 'nope', subLevel: 2, attack: -4 });
check(bad.waveform === 'saw' && bad.subLevel === 1, 'mergeSettings rejects a bad wave and clamps sub level, got ' + JSON.stringify(bad && { waveform: bad.waveform, subLevel: bad.subLevel }));
check(bad.cutoff === 999999 && bad.attack === -4, 'cutoff and attack pass through; the voice path clamps them');
check(bad.subEnabled === true && bad.filter === 'lowpass' && bad.tempo === 96, 'the page patch keeps the sub, the low-pass, and tempo 96');
check(S.mergeSettings(null).fmDepth === 3, 'FM depth defaults to 3');
check(S.mergeSettings({ fmDepth: 12 }).fmDepth === 10 && S.mergeSettings({ fmDepth: -1 }).fmDepth === 0, 'FM depth stays inside 0–10, and 0 is allowed');
const noiseA = S.mulberry32(4182), noiseB = S.mulberry32(4182), noiseC = S.mulberry32(7);
const seqA = [noiseA(), noiseA(), noiseA()], seqB = [noiseB(), noiseB(), noiseB()];
check(seqA.join() === seqB.join() && seqA.join() !== [noiseC(), noiseC(), noiseC()].join(), 'the seeded RNG repeats for one seed');

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}

const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  problems.push('Chrome is required to render the NC Synth line');
} else {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path === '/t') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end('<!doctype html><script src="/create/synth-audio/dist/index.js"></script><script src="/create/nc-synth.js"></script>');
      return;
    }
    if (path.endsWith('/')) path += 'index.html';
    try {
      const body = await readFile(join(root, path));
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port, dbg = 9700 + Math.floor(Math.random() * 200);
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-synth-'))}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  try {
    let target;
    for (let i = 0; i < 80 && !target; i++) {
      try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); }
    }
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let seq = 0; const pending = new Map();
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.no(new Error(JSON.stringify(m.error))) : p.ok(m.result || {}); }
    });
    await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
    const send = (method, params = {}) => new Promise((ok, no) => { const id = ++seq; pending.set(id, { ok, no }); ws.send(JSON.stringify({ id, method, params })); });
    const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
    await send('Page.enable'); await send('Runtime.enable');
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/t` });
    for (let i = 0; i < 50 && !(await ev('typeof NCSynth !== "undefined"')); i++) await sleep(50);
    const render = (seed, wave) => ev(`(async () => {
      var line = NCSynth.readLine('n F4 Ab4 C5 Bb4');
      var settings = NCSynth.mergeSettings(${wave ? "{ waveform: 'noise', subEnabled: false }" : 'null'});
      var notes = NCSynth.scheduleLine(line, settings);
      var buf = await NCSynth.renderNotes(notes, settings, ${seed});
      var d = buf.getChannelData(0);
      var peak = 0, sum = 0, h = 2166136261, i, x;
      for (i = 0; i < d.length; i++) {
        x = d[i];
        if (x < 0) x = -x;
        if (x > peak) peak = x;
        sum += d[i] * d[i];
        h = Math.imul(h ^ (d[i] * 1000000 | 0), 16777619) >>> 0;
      }
      return { peak: peak, rms: Math.sqrt(sum / d.length), frames: d.length, rate: buf.sampleRate, channels: buf.numberOfChannels, hash: h >>> 0, dur: buf.duration };
    })()`);
    const a = await render(4182, false);
    const b = await render(4182, false);
    check(a && a.peak > 0.02 && a.rms > 0.005, 'the line is not silent, got ' + JSON.stringify(a));
    check(a && b && a.hash === b.hash && a.frames === b.frames && a.peak === b.peak, 'seed 4182 renders twice the same, got ' + JSON.stringify(a) + ' vs ' + JSON.stringify(b));
    check(a && a.rate === 48000 && a.channels === 2 && a.dur > 2 && a.dur < 6, '48 kHz stereo, a short line, got ' + JSON.stringify(a));
    const n1 = await render(1, true);
    const n2 = await render(2, true);
    const n1b = await render(1, true);
    check(n1 && n1b && n1.hash === n1b.hash, 'noise seed 1 repeats');
    check(n1 && n2 && n1.hash !== n2.hash, 'two noise seeds differ');
    const wav = await ev(`(async () => {
      var line = NCSynth.readLine('n F4 Ab4 C5 Bb4');
      var settings = NCSynth.mergeSettings(null);
      var buf = await NCSynth.renderNotes(NCSynth.scheduleLine(line, settings), settings, 4182);
      var blob = NCSynth.wavBlob(buf);
      var bytes = new Uint8Array(await blob.arrayBuffer());
      var s = '';
      for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      return btoa(s);
    })()`);
    check(typeof wav === 'string' && wav.length > 1000, 'wav bytes came back');
    if (typeof wav === 'string') {
      const bytes = Buffer.from(wav, 'base64');
      check(bytes.slice(0, 4).toString() === 'RIFF', 'wav starts with RIFF');
      await mkdir('/opt/cursor/artifacts', { recursive: true });
      await writeFile('/opt/cursor/artifacts/nc_synth_line.wav', bytes);
    }

    const fm = await ev(`(async () => {
      function hashBuf(buf) {
        var d = buf.getChannelData(0), h = 2166136261, i;
        for (i = 0; i < d.length; i++) h = Math.imul(h ^ (d[i] * 1000000 | 0), 16777619) >>> 0;
        return h >>> 0;
      }
      function hashBytes(bytes) {
        var h = 2166136261, i;
        for (i = 0; i < bytes.length; i++) h = Math.imul(h ^ bytes[i], 16777619) >>> 0;
        return h >>> 0;
      }
      async function playClip(buffer) {
        var ctx = new OfflineAudioContext(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
        var src = ctx.createBufferSource();
        src.buffer = buffer;
        src.connect(ctx.destination);
        src.start(0);
        return ctx.startRendering();
      }
      function spectrum(buf) {
        var ch = buf.getChannelData(0), rate = buf.sampleRate, N = 1024;
        var i0 = Math.floor(0.35 * rate), re = new Float64Array(N), im = new Float64Array(N), k, n, w, mag = new Float64Array(N / 2), sum = 0;
        for (n = 0; n < N; n++) {
          w = 0.5 - 0.5 * Math.cos(2 * Math.PI * n / (N - 1));
          re[n] = (ch[i0 + n] || 0) * w;
        }
        for (k = 0; k < N / 2; k++) {
          var rr = 0, ii = 0;
          for (n = 0; n < N; n++) {
            var ang = -2 * Math.PI * k * n / N;
            rr += re[n] * Math.cos(ang);
            ii += re[n] * Math.sin(ang);
          }
          mag[k] = Math.sqrt(rr * rr + ii * ii);
          sum += mag[k];
        }
        return { mag: mag, sum: sum };
      }
      var hold = new OfflineAudioContext(1, 48000 * 3, 48000);
      var mod = hold.createBuffer(1, 48000 * 3, 48000);
      var md = mod.getChannelData(0), i, t;
      for (i = 0; i < md.length; i++) {
        t = i / 48000;
        md[i] = 0.45 * Math.sin(2 * Math.PI * 98 * t) + 0.35 * Math.sin(2 * Math.PI * 147 * t) + 0.25 * Math.sin(2 * Math.PI * 220 * t);
      }
      var snap = new Float32Array(md);
      var clipBefore = hashBytes(new Uint8Array(await NCSynth.wavBlob(await playClip(mod)).arrayBuffer()));
      var line = NCSynth.readLine('n F4 Ab4 C5 Bb4');
      var base = NCSynth.mergeSettings(null);
      var notes = NCSynth.scheduleLine(line, base);
      function withMod(depth, follow) {
        var settings = NCSynth.mergeSettings(Object.assign({}, base, { fmDepth: depth }));
        var list = notes.map(function (n) {
          return { midi: n.midi, velocity: n.velocity, start: n.start, length: n.length, modulator: { buffer: mod, offset: n.start, followLevel: follow || 0 } };
        });
        return NCSynth.renderNotes(list, settings, 4182);
      }
      var dry = await NCSynth.renderNotes(notes, base, 4182);
      var zero = await withMod(0, 0);
      var mid = await withMod(3, 0);
      var heavy = await withMod(10, 0);
      var followed = await withMod(3, 0.8);
      var same = snap.length === md.length;
      for (i = 0; same && i < snap.length; i++) if (snap[i] !== md[i]) same = false;
      var clipAfter = hashBytes(new Uint8Array(await NCSynth.wavBlob(await playClip(mod)).arrayBuffer()));
      var specDry = spectrum(dry), specHeavy = spectrum(heavy), diff = 0, k;
      for (k = 0; k < specDry.mag.length; k++) diff += Math.abs(specDry.mag[k] - specHeavy.mag[k]);
      var rel = specDry.sum > 0 ? diff / specDry.sum : 0;
      var gap = Math.round(0.35 * 48000);
      var frames = dry.length + mid.length + heavy.length + gap * 2;
      var mix = new OfflineAudioContext(2, frames, 48000);
      function place(buf, when) {
        var src = mix.createBufferSource();
        src.buffer = buf;
        src.connect(mix.destination);
        src.start(when);
      }
      place(dry, 0);
      place(mid, dry.duration + 0.35);
      place(heavy, dry.duration + 0.35 + mid.duration + 0.35);
      var compare = await mix.startRendering();
      var blob = NCSynth.wavBlob(compare);
      var bytes = new Uint8Array(await blob.arrayBuffer());
      var s = '';
      for (i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      var off = new OfflineAudioContext(2, 48000, 48000);
      var eng = new NCSynthEngine.SynthEngine(NCSynthEngine.mergeSettings(base));
      await eng.open(off, NCSynth.mulberry32(4182));
      eng.scheduleNote(65, 0.05, 0.4, 0.8, { buffer: mod, offset: 0, depth: 3 });
      var armed = eng.activeModulators();
      eng.panic();
      var stopped = eng.activeModulators();
      var wavetable = -1;
      try {
        var wt = new NCSynthEngine.SynthEngine(NCSynthEngine.mergeSettings(Object.assign({}, base, { oscillatorMode: 'wavetable' })));
        var off2 = new OfflineAudioContext(2, 4800, 48000);
        await wt.open(off2, NCSynth.mulberry32(1));
        wt.scheduleNote(65, 0.05, 0.2, 0.8, { buffer: mod, offset: 0, depth: 10 });
        wavetable = wt.activeModulators();
      } catch (e) { wavetable = 0; }
      return {
        dry: hashBuf(dry), zero: hashBuf(zero), mid: hashBuf(mid), heavy: hashBuf(heavy),
        follow: hashBuf(followed), same: same, clipBefore: clipBefore, clipAfter: clipAfter,
        rel: rel, armed: armed, stopped: stopped, wavetable: wt.activeModulators(),
        wav: btoa(s)
      };
    })()`);
    check(fm && fm.dry === fm.zero, 'depth 0 matches no FM, so the clip is not mixed into the synth, got ' + JSON.stringify(fm && { dry: fm.dry, zero: fm.zero }));
    check(fm && fm.mid !== fm.dry && fm.heavy !== fm.dry && fm.heavy !== fm.mid, 'moderate and heavy FM change the render, got ' + JSON.stringify(fm && { dry: fm.dry, mid: fm.mid, heavy: fm.heavy }));
    check(fm && fm.rel > 0.05, 'heavy FM changes the spectrum, got ' + JSON.stringify(fm && fm.rel));
    check(fm && fm.same === true && fm.clipBefore === fm.clipAfter, 'the gathered clip output stays byte-identical, got ' + JSON.stringify(fm && { same: fm.same, clipBefore: fm.clipBefore, clipAfter: fm.clipAfter }));
    check(fm && fm.follow !== fm.mid, 'the envelope follower changes loudness when asked, got ' + JSON.stringify(fm && { follow: fm.follow, mid: fm.mid }));
    check(fm && fm.armed === 1 && fm.stopped === 0, 'panic stops the live modulator, got ' + JSON.stringify(fm && { armed: fm.armed, stopped: fm.stopped }));
    check(fm && fm.wavetable === 0, 'wavetable does not take the FM path, got ' + JSON.stringify(fm && fm.wavetable));
    if (fm && typeof fm.wav === 'string') {
      const compare = Buffer.from(fm.wav, 'base64');
      check(compare.slice(0, 4).toString() === 'RIFF', 'FM comparison wav starts with RIFF');
      await mkdir('/opt/cursor/artifacts', { recursive: true });
      await writeFile('/opt/cursor/artifacts/nc_synth_fm_compare.wav', compare);
      console.log('fm spectrum distance (heavy vs none): ' + (fm.rel * 100).toFixed(1) + '%');
    }

    await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
    for (let i = 0; i < 150 && !(await ev("document.body && document.body.getAttribute('data-ready') === '1' && window.NCPerform")); i++) await sleep(100);
    const skipped = await ev(`(function () {
      var comp = document.getElementById('comp');
      comp.value = 'n F4 Ab4 @flute';
      comp.dispatchEvent(new Event('input', { bubbles: true }));
      var btn = document.getElementById('gatherBtn');
      return { hidden: !btn || btn.hidden, disabled: !btn || btn.disabled };
    })()`);
    check(skipped && (skipped.hidden || skipped.disabled), '@flute does not offer the synth gather, got ' + JSON.stringify(skipped));
    const row = await ev(`(async () => {
      var comp = document.getElementById('comp');
      comp.value = 'n F4 Ab4 C5 Bb4';
      comp.dispatchEvent(new Event('input', { bubbles: true }));
      var btn = document.getElementById('gatherBtn');
      if (!btn || btn.disabled || btn.hidden) return { enabled: !!(btn && !btn.disabled && !btn.hidden), text: btn && btn.textContent };
      btn.click();
      for (var i = 0; i < 80; i++) {
        var list = document.getElementById('gather-list');
        var t = list ? list.textContent : '';
        if (t.indexOf('NC Synth') >= 0) return { text: t.replace(/\\s+/g, ' ').trim(), box: !document.getElementById('gather-box').hidden };
        await new Promise(function (r) { setTimeout(r, 50); });
      }
      return { text: (document.getElementById('gather-list') || {}).textContent || '', status: (document.getElementById('gather-status') || {}).textContent || '' };
    })()`);
    check(row && row.text && row.text.indexOf('NC Synth (Peter Semmelhack)') >= 0, 'gathered list names the synth, got ' + JSON.stringify(row));
    check(row && row.text.indexOf('FM depth 3') >= 0, 'the row records the FM depth, got ' + JSON.stringify(row));
    check(row && row.text.indexOf('CC BY-SA 4.0') >= 0 && row.text.indexOf('code MIT') >= 0 && row.text.indexOf('seed ') >= 0, 'the row shows the license, the code license and the seed, got ' + JSON.stringify(row));
    check(row && row.text.indexOf('F4 Ab4 C5 Bb4') >= 0, 'the row shows the notes, got ' + JSON.stringify(row));
    const take = await ev(`(async () => {
      document.getElementById('performBtn').click();
      var audio = document.getElementById('perform-audio');
      for (var i = 0; i < 80 && (document.getElementById('perform-out').hidden || !(audio.duration > 0)); i++) await new Promise(function (r) { setTimeout(r, 50); });
      var plan = (document.getElementById('plan-src').textContent || '').replace(/\\s+/g, ' ').trim();
      var rec = ((document.getElementById('perform-record-view') || {}).textContent || '').replace(/\\s+/g, ' ').trim();
      return { plan: plan, seed: (document.getElementById('plan-seed') || {}).textContent || '', live: document.getElementById('live').hidden, dur: audio && audio.duration, status: (document.getElementById('perform-status') || {}).textContent || '', rec: rec };
    })()`);
    check(take && take.plan.indexOf('NC Synth (Peter Semmelhack)') >= 0 && take.plan.indexOf('code MIT') >= 0, 'the take lists the synth, got ' + JSON.stringify(take));
    check(take && take.rec && take.rec.indexOf('FM depth') >= 0 && take.rec.indexOf('3') >= 0, 'the record stores the FM depth, got ' + JSON.stringify(take && take.rec));
    check(take && take.dur > 2 && take.live === false && !take.status, 'Perform puts the buffer on the player, got ' + JSON.stringify(take));

    const live = await ev(`(async () => {
      function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
      async function until(pred, ms) {
        var t = Date.now(), last = null;
        while (Date.now() - t < ms) {
          last = NCLive.synthStatus();
          if (pred(last)) return last;
          await wait(30);
        }
        return last;
      }
      var row = document.getElementById('live-synth');
      var box = document.getElementById('live-synth-on');
      var audio = document.getElementById('perform-audio');
      if (audio.paused) { var p = audio.play(); if (p && p.catch) p.catch(function () {}); }
      var off = await until(function (s) { return s && s.bufferSources >= 1 && s.voices === 0 && !s.enabled; }, 1500);
      var armed = !!(row && !row.hidden && box && !box.checked && off && off.armed);
      box.click();
      var on = await until(function (s) { return s && s.enabled && s.bufferSources === 0 && s.voices === 1 && s.notes && s.notes.length === 4; }, 1500);
      var align = null;
      if (on && on.align && on.notes && on.notes[0]) {
        var expect = on.align.when + Math.max(0, on.notes[0].take - on.align.offset);
        align = Math.abs(on.notes[0].at - expect);
      }
      var c1 = { ac: on && on.ac, media: on && on.media };
      await wait(1200);
      var c2 = NCLive.synthStatus();
      var clock = (c1.ac != null && c2.ac != null) ? (c2.ac - c1.ac) - (c2.media - c1.media) : null;
      audio.pause();
      var stopped = await until(function (s) { return s && s.voices === 0 && s.bufferSources === 0 && (!s.notes || !s.notes.length); }, 800);
      if (!box.checked) box.click();
      else box.dispatchEvent(new Event('change', { bubbles: true }));
      var again = audio.play(); if (again && again.catch) again.catch(function () {});
      await until(function (s) { return s && s.voices === 1; }, 1000);
      await wait(350);
      document.getElementById('perform-rewind').click();
      var rewound = await until(function (s) { return s && s.enabled && s.bufferSources === 0 && s.voices === 1 && s.media < 0.25; }, 1200);
      audio.pause();
      var after = await until(function (s) { return s && s.voices === 0 && s.bufferSources === 0; }, 800);
      audio = document.getElementById('perform-audio');
      box = document.getElementById('live-synth-on');
      box.click();
      await wait(40);
      var played = 'no';
      try { await audio.play(); played = 'yes'; } catch (e) { played = String(e); }
      var rendered = await until(function (s) { return s && !s.enabled && s.bufferSources >= 1 && s.voices === 0; }, 2000);
      audio.pause();
      return { armed: armed, align: align, clock: clock, on: on && { voices: on.voices, buffers: on.bufferSources, notes: on.notes && on.notes.length, enabled: on.enabled, acState: on.acState }, stopped: stopped && { voices: stopped.voices, buffers: stopped.bufferSources, notes: stopped.notes && stopped.notes.length }, rewound: rewound && { voices: rewound.voices, buffers: rewound.bufferSources, media: rewound.media, enabled: rewound.enabled }, after: after && { voices: after.voices, buffers: after.bufferSources }, rendered: rendered && { voices: rendered.voices, buffers: rendered.bufferSources, enabled: rendered.enabled, played: played, paused: audio.paused, t: audio.currentTime, dur: audio.duration, plays: NCLive.clipPlays(), spec: rendered.specBuffers, synthEntries: rendered.specSynth } };
    })()`);
    check(live && live.armed, 'the Live row offers the synth toggle, off, got ' + JSON.stringify(live));
    check(live && live.on && live.on.buffers === 0 && live.on.voices === 1 && live.on.notes === 4, 'live plays one engine voice and not the buffer, got ' + JSON.stringify(live && live.on));
    check(live && live.align != null && live.align < 0.001, 'the live note is scheduled on the same clock as the rendered clip, got ' + JSON.stringify(live && live.align));
    check(live && live.stopped && live.stopped.voices === 0 && live.stopped.buffers === 0, 'pause stops the live voice, got ' + JSON.stringify(live && live.stopped));
    check(live && live.rewound && live.rewound.buffers === 0 && live.rewound.voices === 1, 'rewind restarts a single live voice, got ' + JSON.stringify(live && live.rewound));
    check(live && live.after && live.after.voices === 0 && live.after.buffers === 0, 'stop after rewind leaves no voice and no buffer, got ' + JSON.stringify(live && live.after));
    check(live && live.rendered && live.rendered.buffers >= 1 && live.rendered.voices === 0 && live.rendered.enabled === false, 'turning live off returns to the rendered buffer, got ' + JSON.stringify(live && live.rendered));
    if (live && live.clock != null) console.log('live clock drift over 1.2s: ' + (live.clock * 1000).toFixed(2) + ' ms');

    const drift = await ev(`(async () => {
      function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
      var line = NCSynth.readLine('n F4');
      var settings = NCSynth.mergeSettings(null);
      var notes = NCSynth.scheduleLine(line, settings);
      var seed = 4182;
      var ref = await Promise.race([
        NCSynth.renderNotes(notes, settings, seed),
        wait(4000).then(function () { return null; })
      ]);
      if (!ref) return { error: 'render timeout' };
      var refCh = ref.getChannelData(0), refOn = -1, i, x;
      for (i = 0; i < refCh.length; i++) { x = refCh[i]; if (x < 0) x = -x; if (x > 0.008) { refOn = i / ref.sampleRate; break; } }
      var ctx = new AudioContext({ sampleRate: 48000 });
      var state = await Promise.race([
        (ctx.state === 'running' ? Promise.resolve('running') : ctx.resume().then(function () { return ctx.state; })),
        wait(1000).then(function () { return 'timeout'; })
      ]);
      if (state !== 'running') { try { ctx.close(); } catch (e) {} return { refOn: refOn, residual: null, state: state || ctx.state }; }
      var engine = new NCSynthEngine.SynthEngine(NCSynthEngine.mergeSettings(settings));
      var gain = ctx.createGain();
      var proc = ctx.createScriptProcessor(1024, 1, 1);
      var chunks = [];
      proc.onaudioprocess = function (e) { chunks.push({ t: e.playbackTime, d: Array.prototype.slice.call(e.inputBuffer.getChannelData(0)) }); };
      var opened = await Promise.race([
        engine.open(ctx, NCSynth.mulberry32(seed), gain).then(function () { return true; }),
        wait(2000).then(function () { return false; })
      ]);
      if (!opened) return { refOn: refOn, residual: null, state: ctx.state, error: 'open timeout' };
      gain.connect(proc); proc.connect(ctx.destination);
      var lead = 0.05;
      var t0 = ctx.currentTime + lead;
      notes.forEach(function (n) { engine.scheduleNote(n.midi, t0 + n.start, n.length, n.velocity); });
      await wait(450);
      try { engine.panic(); } catch (e) {}
      proc.onaudioprocess = null;
      try { proc.disconnect(); } catch (e2) {}
      var liveOn = null, k, s, c;
      for (i = 0; i < chunks.length && liveOn == null; i++) {
        c = chunks[i];
        for (k = 0; k < c.d.length; k++) { s = c.d[k]; if (s < 0) s = -s; if (s > 0.008) { liveOn = c.t + k / ctx.sampleRate; break; } }
      }
      var residual = liveOn == null || refOn < 0 ? null : (liveOn - t0) - refOn;
      return { refOn: refOn, liveOn: liveOn, t0: t0, residual: residual, chunks: chunks.length, state: ctx.state, firstT: chunks[0] ? chunks[0].t : null, rate: ctx.sampleRate };
    })()`);
    if (drift) console.log('onset residual (live minus rendered, lead removed): ' + (drift.residual == null ? 'n/a' : (drift.residual * 1000).toFixed(2) + ' ms') + ' ' + JSON.stringify(drift));
    check(!drift || drift.residual == null || Math.abs(drift.residual) < 0.08, 'live onset is not seconds away from the rendered note, got ' + JSON.stringify(drift));
    ws.close();
  } finally {
    proc.kill('SIGKILL');
    server.close();
  }
}

if (problems.length) {
  console.log(problems.join('\n'));
  process.exit(1);
}
console.log('nc-synth ok');
