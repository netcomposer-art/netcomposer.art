// Live FM Save gate. A microphone, or any link whose licence cannot be read,
// leaves Save off. CC0, CC BY, CC BY-SA and public domain turn it on.
// Run: node tests/fm-live.mjs
import { createServer } from 'node:http';
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
const CC = 'https://commons.wikimedia.org/wiki/File:Uuriter_-_02_-_Magnetic_Fields.ogg';
const API = 'https://nc-perform-api.psemme.workers.dev';

const sb = { Math, JSON, Promise, console, URL, encodeURIComponent, decodeURIComponent };
sb.window = sb;
sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/fm-source.js'), 'utf8'), sb);
const L = sb.NCFmSource;

function fakeFetch(map) {
  return (url) => {
    const key = Object.keys(map).find((k) => String(url).indexOf(k) >= 0);
    if (!key) return Promise.reject(new Error('no ' + url));
    const hit = map[key];
    const status = hit.status || 200;
    return Promise.resolve({
      ok: status < 400,
      text: () => Promise.resolve(typeof hit.body === 'string' ? hit.body : JSON.stringify(hit.body))
    });
  };
}

const ytCc = L.explain('youtube', { status: { license: 'creativeCommon' }, snippet: { title: 'Bunny', channelTitle: 'Blender' } });
check(ytCc.ok && ytCc.license === 'CC-BY-3.0' && ytCc.title === 'Bunny' && ytCc.author === 'Blender', 'YouTube creativeCommon is CC BY 3.0, got ' + JSON.stringify(ytCc));
const ytNo = L.explain('youtube', '<html>"license":"youtube"</html>', 'Standard', 'Someone');
check(!ytNo.ok && /not CC0/.test(ytNo.reason), 'a standard YouTube licence stays closed, got ' + JSON.stringify(ytNo));
const ytHtml = L.explain('youtube', 'playerResponse creativeCommon videoDetails', 'Fields', 'Uuriter');
check(ytHtml.ok && ytHtml.license === 'CC-BY-3.0' && ytHtml.title === 'Fields', 'a watch-page creativeCommon read counts, got ' + JSON.stringify(ytHtml));
check(!L.explain('youtube', '<html>no licence here</html>').ok, 'a YouTube page with no licence field does not pass');

const by = L.explain('archive', { metadata: { licenseurl: 'https://creativecommons.org/licenses/by/4.0/', title: 'Night', creator: 'Ada' } });
check(by.ok && by.license === 'CC-BY-4.0' && by.title === 'Night' && by.author === 'Ada' && by.licenseName === 'CC BY 4.0', 'Internet Archive CC BY passes, got ' + JSON.stringify(by));
const nc = L.explain('archive', { metadata: { licenseurl: 'https://creativecommons.org/licenses/by-nc/4.0/', title: 'Night' } });
check(!nc.ok && /not CC0/.test(nc.reason), 'CC BY-NC stays closed, got ' + JSON.stringify(nc));
check(!L.explain('archive', { metadata: { title: 'Night' } }).ok, 'Archive metadata with no licenseurl does not pass');
const nd = L.explain('archive', { metadata: { licenseurl: 'https://creativecommons.org/licenses/by-nd/4.0/' } });
check(!nd.ok, 'CC BY-ND stays closed');
const sampling = L.explain('archive', { metadata: { licenseurl: 'https://creativecommons.org/licenses/sampling+/1.0/' } });
check(!sampling.ok, 'Sampling+ stays closed');

const commons = L.explain('wikimedia', { query: { pages: { '1': { title: 'File:Uuriter_-_02_-_Magnetic_Fields.ogg', imageinfo: [{ extmetadata: { LicenseShortName: { value: 'CC BY 4.0' }, Artist: { value: '<a href="https://commons.wikimedia.org/">Uuriter</a>' }, ObjectName: { value: 'Magnetic Fields' } } }] } } } });
check(commons.ok && commons.license === 'CC-BY-4.0' && commons.author === 'Uuriter' && commons.title === 'Magnetic Fields' && commons.licenseName === 'CC BY 4.0', 'Wikimedia CC BY 4.0 passes, got ' + JSON.stringify(commons));
check(!L.explain('wikimedia', { query: { pages: { '1': { imageinfo: [{ extmetadata: { LicenseShortName: { value: 'CC BY-NC-SA 4.0' } } }] } } } }).ok, 'Wikimedia NC stays closed');
check(L.explain('wikimedia', { query: { pages: { '1': { imageinfo: [{ extmetadata: { LicenseShortName: { value: 'CC0 1.0' }, Artist: { value: 'Pat' } } }] } } } }).license === 'CC0-1.0', 'Wikimedia CC0 passes');
check(L.explain('wikimedia', { query: { pages: { '1': { imageinfo: [{ extmetadata: { LicenseShortName: { value: 'Public domain' } } }] } } } }).license === 'PD', 'Wikimedia public domain passes');

const fsHtml = '<meta property="og:audio:title" content="Dialog"><meta property="og:audio:artist" content="tekgnosis"><a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>';
const fsOk = L.explain('freesound', fsHtml);
check(fsOk.ok && fsOk.license === 'CC0-1.0' && fsOk.title === 'Dialog' && fsOk.author === 'tekgnosis', 'one Freesound CC0 link passes, got ' + JSON.stringify(fsOk));
check(!L.explain('freesound', 'https://creativecommons.org/licenses/by-nc/4.0/').ok, 'a Freesound NC link stays closed');
check(!L.explain('freesound', 'https://creativecommons.org/licenses/by/4.0/ https://creativecommons.org/licenses/by-sa/4.0/').ok, 'two Freesound licences are not a reading');
check(L.explain('other', {}).reason === 'Could not check that link.', 'an unknown host is not a guess');

const empty = await L.check('', fakeFetch({}));
check(empty.reason === 'Add the source link.', 'an empty link asks for the link, got ' + JSON.stringify(empty));
const unknown = await L.check('https://example.com/stream', fakeFetch({}));
check(unknown.reason === 'Could not check that link.', 'example.com cannot be checked, got ' + JSON.stringify(unknown));
const ytRead = await L.check('https://www.youtube.com/watch?v=aqz-KE-bpKQ', fakeFetch({
  oembed: { status: 404, body: '' },
  'watch?v=': { body: '{"title":"Bunny"} creativeCommon' }
}));
check(ytRead.ok && ytRead.license === 'CC-BY-3.0', 'a public creativeCommon read passes even when oEmbed has no licence, got ' + JSON.stringify(ytRead));
const ytStandard = await L.check('https://youtu.be/aaaaaaaaaaa', fakeFetch({
  oembed: { body: { title: 'Ad', author_name: 'Channel' } },
  'watch?v=': { body: '"license":"youtube"' }
}));
check(!ytStandard.ok && /not CC0/.test(ytStandard.reason) && ytStandard.reason.indexOf('trust') < 0, 'a read YouTube standard licence stays closed, got ' + JSON.stringify(ytStandard));
const missed = await L.check('https://www.youtube.com/watch?v=aqz-KE-bpKQ', fakeFetch({ oembed: { body: {} } }));
check(missed.reason === 'Could not read a license from that link.', 'a YouTube page that cannot be read stays closed, got ' + JSON.stringify(missed));
const arch = await L.check('https://archive.org/details/opensource_audio', fakeFetch({
  '/metadata/': { body: { metadata: { licenseurl: 'https://creativecommons.org/licenses/by-sa/3.0/', title: ['Open'], creator: 'Sam' } } }
}));
check(arch.ok && arch.license === 'CC-BY-SA-3.0' && arch.author === 'Sam', 'an Archive metadata read passes CC BY-SA, got ' + JSON.stringify(arch));
const wiki = await L.check(CC, fakeFetch({
  'commons.wikimedia.org/w/api.php': { body: { query: { pages: { '9': { title: 'File:Uuriter_-_02_-_Magnetic_Fields.ogg', imageinfo: [{ extmetadata: { LicenseShortName: { value: 'CC BY 4.0' }, Artist: { value: 'Uuriter' }, ObjectName: { value: 'Magnetic Fields' } } }] } } } } }
}));
check(wiki.ok && wiki.license === 'CC-BY-4.0' && wiki.title === 'Magnetic Fields', 'a Commons API read passes, got ' + JSON.stringify(wiki));
const sound = await L.check('https://freesound.org/people/tekgnosis/sounds/320854/', fakeFetch({
  'freesound.org/s/320854': { body: fsHtml }
}));
check(sound.ok && sound.license === 'CC0-1.0', 'a Freesound page read passes, got ' + JSON.stringify(sound));
const blind = await L.check('https://archive.org/details/missing-item', fakeFetch({ '/metadata/': { status: 500, body: '' } }));
check(blind.reason === 'Could not read a license from that link.', 'a failed metadata read stays closed, got ' + JSON.stringify(blind));

let liveCommons = null;
try {
  liveCommons = await Promise.race([
    L.check(CC, fetch),
    new Promise((resolve) => setTimeout(() => resolve({ ok: false, reason: 'timeout' }), 15000))
  ]);
} catch (e) { liveCommons = { ok: false, reason: String(e) }; }
check(liveCommons && liveCommons.ok && liveCommons.license === 'CC-BY-4.0' && /Uuriter/.test(liveCommons.author || ''), 'the live Commons file is CC BY 4.0 by Uuriter, got ' + JSON.stringify(liveCommons));

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}

const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  problems.push('Chrome is required for the Live FM Save gate');
} else {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path === '/engine') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end('<!doctype html><script src="/create/synth-audio/dist/index.js"></script><script src="/create/nc-synth.js"></script>');
      return;
    }
    if (path.endsWith('/')) path += 'index.html';
    try {
      const body = readFileSync(join(root, path));
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const dbg = 9800 + Math.floor(Math.random() * 200);
  const proc = spawn(chrome, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--autoplay-policy=no-user-gesture-required',
    '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream',
    `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-fm-live-'))}`,
    '--window-size=1280,900', 'about:blank'
  ], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let ws;
  try {
    let target;
    for (let i = 0; i < 80 && !target; i++) {
      try { target = await (await fetch(`http://127.0.0.1:${dbg}/json/new?about:blank`, { method: 'PUT' })).json(); } catch (e) { await sleep(100); }
    }
    ws = new WebSocket(target.webSocketDebuggerUrl);
    let seq = 0;
    const pending = new Map();
    const kept = [];
    ws.addEventListener('message', async (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? p.no(new Error(JSON.stringify(msg.error))) : p.ok(msg.result || {});
        return;
      }
      if (msg.method !== 'Fetch.requestPaused') return;
      const { requestId, request } = msg.params;
      const u = new URL(request.url);
      const cors = [
        { name: 'access-control-allow-origin', value: '*' },
        { name: 'access-control-allow-headers', value: '*' },
        { name: 'access-control-allow-methods', value: '*' }
      ];
      const json = (obj, code = 200) => send('Fetch.fulfillRequest', {
        requestId, responseCode: code,
        responseHeaders: [...cors, { name: 'content-type', value: 'application/json' }],
        body: Buffer.from(JSON.stringify(obj)).toString('base64')
      });
      if (request.method === 'OPTIONS') return send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: cors });
      if (u.pathname === '/api/config') return json({ turnstile_required: false, max_words: 4000, max_length_s: 180, perform_enabled: true, browser_assembly: true });
      if (u.pathname === '/api/gather') return json({}, 404);
      if (u.pathname === '/api/keep-take') {
        let post = request.postData || '';
        if (!post) {
          try { post = (await send('Fetch.getRequestPostData', { requestId })).postData || ''; } catch (e) { post = ''; }
        }
        kept.push(post);
        return json({ error: 'stopped in the test' }, 400);
      }
      if (u.hostname === 'commons.wikimedia.org') {
        const title = u.searchParams.get('titles') || '';
        const ncFile = title.indexOf('NC_') >= 0;
        const short = ncFile ? 'CC BY-NC 4.0' : 'CC BY 4.0';
        return json({ query: { pages: { '1': { title: title, imageinfo: [{ extmetadata: { LicenseShortName: { value: short }, Artist: { value: 'Uuriter' }, ObjectName: { value: ncFile ? 'NC example' : 'Magnetic Fields' } } }] } } } });
      }
      return json({}, u.pathname === '/api/warm' ? 200 : 404);
    });
    const send = (method, params = {}) => new Promise((ok, no) => {
      const id = ++seq;
      pending.set(id, { ok, no });
      ws.send(JSON.stringify({ id, method, params }));
    });
    await new Promise((ok, no) => { ws.addEventListener('open', ok); ws.addEventListener('error', no); });
    const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/engine` });
    for (let i = 0; i < 50 && !(await ev('typeof NCSynthEngine !== "undefined" && typeof NCSynth !== "undefined"')); i++) await sleep(50);
    const graph = await ev(`(async () => {
      var ctx = new AudioContext({ sampleRate: 48000 });
      if (ctx.state !== 'running') await ctx.resume();
      var osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 880;
      var media = ctx.createMediaStreamDestination();
      osc.connect(media);
      osc.start();
      var out = ctx.createGain();
      var heard = ctx.createAnalyser();
      heard.fftSize = 2048;
      out.connect(heard);
      var probe = ctx.createMediaStreamSource(media.stream);
      var probeAn = ctx.createAnalyser();
      probeAn.fftSize = 2048;
      var mute = ctx.createGain();
      mute.gain.value = 0;
      probe.connect(probeAn);
      probe.connect(mute);
      mute.connect(ctx.destination);
      var engine = new NCSynthEngine.SynthEngine(NCSynthEngine.mergeSettings(null));
      await engine.open(ctx, NCSynth.mulberry32(4182), out);
      engine.setLiveModulator(media.stream, 3);
      engine.scheduleNote(60, ctx.currentTime + 0.05, 0.5, 0.9, { buffer: ctx.createBuffer(1, 4800, 48000), offset: 0, depth: 10 });
      await new Promise(function (r) { setTimeout(r, 400); });
      function peak(an) {
        var bins = new Float32Array(an.frequencyBinCount);
        an.getFloatFrequencyData(bins);
        var best = 1, i;
        for (i = 2; i < bins.length; i++) if (bins[i] > bins[best]) best = i;
        return { hz: Math.round(best * ctx.sampleRate / an.fftSize), db: bins[best] };
      }
      var voice = peak(heard), mod = peak(probeAn);
      var targets = engine.liveModulatorTargets();
      var track = media.stream.getAudioTracks()[0].readyState;
      engine.clearLiveModulator();
      var afterClear = media.stream.getAudioTracks()[0].readyState;
      var targetsAfter = engine.liveModulatorTargets();
      engine.setLiveModulator(media.stream, 0);
      var silent = engine.liveModulatorTargets();
      engine.clearLiveModulator();
      media.stream.getTracks().forEach(function (t) { t.stop(); });
      try { ctx.close(); } catch (e) {}
      return { voice: voice, mod: mod, targets: targets, track: track, afterClear: afterClear, targetsAfter: targetsAfter, silent: silent };
    })()`);
    check(graph && graph.targets === 1, 'the live stream feeds the sounding carrier, got ' + JSON.stringify(graph));
    check(graph && graph.track === 'live' && graph.afterClear === 'live' && graph.targetsAfter === 0, 'disconnecting the modulator leaves the mic track running, got ' + JSON.stringify(graph));
    check(graph && graph.silent === 0, 'depth 0 does not connect the stream, got ' + JSON.stringify(graph));
    check(graph && graph.mod && graph.mod.hz > 800 && graph.mod.hz < 960, 'the stream is not pitch-shifted, got ' + JSON.stringify(graph && graph.mod));
    check(graph && graph.voice && graph.voice.db > -90 && graph.voice.hz > 200 && graph.voice.hz < 400, 'the output is the synth, not the stream, got ' + JSON.stringify(graph && graph.voice));

    await send('Fetch.enable', { patterns: [{ urlPattern: API + '/*' }, { urlPattern: 'https://commons.wikimedia.org/*' }] });
    await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
    for (let i = 0; i < 150 && !(await ev("document.body && document.body.getAttribute('data-ready') === '1' && window.NCPerform && window.NCFmSource")); i++) await sleep(100);
    const ready = await ev("!!(document.body && document.body.getAttribute('data-ready') === '1' && window.NCLive && window.NCFmSource)");
    check(ready, 'the Create page loaded the live FM gate');
    const gate = await ev(`(async () => {
      function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
      var tracks = [];
      var devices = navigator.mediaDevices;
      var real = devices.getUserMedia.bind(devices);
      devices.getUserMedia = function (c) {
        return real(c).then(function (s) { s.getTracks().forEach(function (t) { tracks.push(t); }); return s; });
      };
      var comp = document.getElementById('comp');
      comp.value = 'n F4 Ab4 C5 Bb4';
      comp.dispatchEvent(new Event('input', { bubbles: true }));
      var gather = document.getElementById('gatherBtn');
      for (var i = 0; i < 40 && (!gather || gather.disabled || gather.hidden); i++) { await wait(50); gather = document.getElementById('gatherBtn'); }
      gather.click();
      for (i = 0; i < 80 && (document.getElementById('gather-list').textContent || '').indexOf('NC Synth') < 0; i++) await wait(50);
      document.getElementById('performBtn').click();
      var audio = document.getElementById('perform-audio');
      for (i = 0; i < 100 && (document.getElementById('perform-out').hidden || !(audio.duration > 0)); i++) await wait(50);
      var box = document.getElementById('live-synth-on');
      if (!box.checked) box.click();
      var fm = document.getElementById('live-fm');
      for (i = 0; i < 30 && fm.hidden; i++) await wait(30);
      if (audio.paused) { var play = audio.play(); if (play && play.catch) play.catch(function () {}); }
      var sel = document.getElementById('live-fm-src');
      sel.value = 'mic';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      for (i = 0; i < 40 && tracks.length === 0; i++) await wait(50);
      await wait(80);
      var keep = document.getElementById('perform-keep');
      var note = document.getElementById('perform-keep-note').textContent;
      var beside = document.getElementById('live-fm-note').textContent;
      var mic = { disabled: keep.disabled, label: keep.textContent, note: note, beside: beside, choice: sel.value, live: tracks[0] && tracks[0].readyState, gate: NCLive.liveFmGate() };
      document.getElementById('perform-rewind').click();
      await wait(60);
      var rewound = { choice: sel.value, ended: tracks[0] && tracks[0].readyState, disabled: keep.disabled, note: document.getElementById('perform-keep-note').textContent };
      sel.value = 'mic';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      for (i = 0; i < 40 && tracks.length < 2; i++) await wait(50);
      var link = document.getElementById('live-fm-link');
      link.value = ${JSON.stringify(CC)};
      link.dispatchEvent(new Event('input', { bubbles: true }));
      for (i = 0; i < 40 && (keep.disabled || !NCLive.liveFmCredit()); i++) await wait(50);
      var credit = NCLive.liveFmCredit();
      var rec = NCLive.liveFmRecord();
      var view = (document.getElementById('perform-record-view').textContent || '').replace(/\\s+/g, ' ');
      var open = { disabled: keep.disabled, label: keep.textContent, note: document.getElementById('perform-keep-note').textContent, beside: document.getElementById('live-fm-note').textContent, credit: credit, rec: rec, view: view, choice: sel.value };
      audio.pause();
      await wait(40);
      var stopped = { choice: sel.value, ended: tracks[1] && tracks[1].readyState, disabled: keep.disabled };
      link.value = '';
      link.dispatchEvent(new Event('input', { bubbles: true }));
      await wait(40);
      var cleared = { disabled: keep.disabled, note: document.getElementById('perform-keep-note').textContent, beside: document.getElementById('live-fm-note').textContent };
      link.value = 'https://commons.wikimedia.org/wiki/File:NC_example.ogg';
      link.dispatchEvent(new Event('input', { bubbles: true }));
      for (i = 0; i < 40 && document.getElementById('live-fm-note').textContent.indexOf('not CC0') < 0; i++) await wait(50);
      var closed = { disabled: keep.disabled, note: document.getElementById('perform-keep-note').textContent };
      link.value = 'https://example.com/radio';
      link.dispatchEvent(new Event('input', { bubbles: true }));
      for (i = 0; i < 20 && document.getElementById('live-fm-note').textContent.indexOf('Could not check') < 0; i++) await wait(40);
      var foreign = { disabled: keep.disabled, note: document.getElementById('perform-keep-note').textContent };
      link.value = ${JSON.stringify(CC)};
      link.dispatchEvent(new Event('input', { bubbles: true }));
      for (i = 0; i < 40 && keep.disabled; i++) await wait(50);
      keep.click();
      for (i = 0; i < 80 && keep.textContent.indexOf('Saving') >= 0; i++) await wait(100);
      return { mic: mic, rewound: rewound, open: open, stopped: stopped, cleared: cleared, closed: closed, foreign: foreign, afterSave: { disabled: keep.disabled, label: keep.textContent, note: document.getElementById('perform-keep-note').textContent } };
    })()`);
    check(gate && gate.mic && gate.mic.disabled && gate.mic.label === 'Save' && gate.mic.note === 'A microphone needs a CC or public-domain link.' && gate.mic.beside === gate.mic.note && gate.mic.choice === 'mic' && gate.mic.live === 'live', 'a microphone with no link leaves Save off, got ' + JSON.stringify(gate && gate.mic));
    check(gate && gate.rewound && gate.rewound.choice === '' && gate.rewound.ended === 'ended' && gate.rewound.disabled && /microphone needs/.test(gate.rewound.note), 'rewind stops the mic and Save stays off, got ' + JSON.stringify(gate && gate.rewound));
    check(gate && gate.open && gate.open.disabled === false && gate.open.credit && gate.open.credit.license === 'CC-BY-4.0' && gate.open.credit.title === 'Magnetic Fields' && gate.open.credit.author === 'Uuriter', 'a checked CC BY link enables Save, got ' + JSON.stringify(gate && gate.open && { disabled: gate.open.disabled, credit: gate.open.credit, note: gate.open.note }));
    check(gate && gate.open && gate.open.beside === '' && /Save stores the sound/.test(gate.open.note), 'the warning goes away once the licence checks, got ' + JSON.stringify(gate && gate.open && gate.open.note));
    check(gate && gate.open && gate.open.rec && gate.open.rec.depth === 3 && gate.open.rec.url === CC && gate.open.rec.spans && gate.open.rec.spans.length >= 1, 'the record names the link, the depth and a span, got ' + JSON.stringify(gate && gate.open && gate.open.rec));
    check(gate && gate.open && /Magnetic Fields/.test(gate.open.view) && /Uuriter/.test(gate.open.view) && /CC BY 4\.0/.test(gate.open.view) && /FM depth/.test(gate.open.view) && /FM span/.test(gate.open.view) && gate.open.view.indexOf(CC) >= 0, 'the on-page record names the stream, got ' + JSON.stringify(gate && gate.open && gate.open.view));
    check(gate && gate.stopped && gate.stopped.ended === 'ended' && gate.stopped.choice === '' && gate.stopped.disabled === false, 'a clean stop drops the tracks and leaves a credited Save on, got ' + JSON.stringify(gate && gate.stopped));
    check(gate && gate.cleared && gate.cleared.disabled && /microphone needs/.test(gate.cleared.note), 'clearing the link closes Save again, got ' + JSON.stringify(gate && gate.cleared));
    check(gate && gate.closed && gate.closed.disabled && /not CC0/.test(gate.closed.note), 'a CC BY-NC link stays closed, got ' + JSON.stringify(gate && gate.closed));
    check(gate && gate.foreign && gate.foreign.disabled && gate.foreign.note === 'Could not check that link.', 'an unreadable host stays closed, got ' + JSON.stringify(gate && gate.foreign));
    check(gate && gate.afterSave && gate.afterSave.disabled === false && gate.afterSave.label === 'Save', 'a refused save leaves the credited button usable, got ' + JSON.stringify(gate && gate.afterSave));
    const posted = kept.join('\n');
    check(posted.indexOf('fm_live') >= 0 && posted.indexOf(CC) >= 0 && posted.indexOf('CC-BY-4.0') >= 0 && posted.indexOf('Magnetic Fields') >= 0 && posted.indexOf('Uuriter') >= 0 && posted.indexOf('RIFF') >= 0, 'Save posts the credit and the rendered take, not a promise in place of the file, got ' + (posted ? posted.slice(0, 240) : 'empty'));
    check(posted.indexOf('trust') < 0, 'the save body has no vouching flag');
  } finally {
    try { if (ws) ws.close(); } catch (e) {}
    try { proc.kill(); } catch (e) {}
    server.close();
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('fm-live ok');
