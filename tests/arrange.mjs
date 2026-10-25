// Arrangement under Play. One lane per track. Bars move and trim.
// Written lengths only shorten. Nothing is stretched. Edits stay on the page.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createServer } from 'node:http';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
function check(cond, msg) { if (!cond) problems.push(msg); }

const sandbox = { console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(root, 'create/timeline-edit.js'), 'utf8'), sandbox);
vm.runInContext(readFileSync(join(root, 'create/arrange.js'), 'utf8'), sandbox);
const A = sandbox.NCArrange;

function chord(symbol, slot, sketch, gap) {
  return { symbol: symbol, slot: slot, sketchDur: sketch, gapBefore: gap || 0 };
}
function ends(entries) { return entries.map((e) => [e.at_s, e.len_s]); }

const sketch = A.layoutChords([chord('Em7', null, 2.5), chord('A', null, 2.5), chord('Em7', null, 2.5)]);
check(ends(sketch.entries).join(';') === '0,2.5;2.5,2.5;5,2.5' && sketch.base === 7.5, 'sketch bars sit back to back, got ' + ends(sketch.entries).join(';') + ' base ' + sketch.base);
check(sketch.entries.every((e) => e.written === 0 && e.cap === 2.5), 'an unwritten bar is not on the written clock');

let r = A.commit(sketch.entries, 2, 'move', 6.2, sketch.base, [2.5, 2.5, 2.5]);
check(r.entries[2].at_s === 6.2 && r.entries[2].len_s === 2.5 && r.entries[0].at_s === 0 && r.entries[1].at_s === 2.5, 'moving the last bar keeps its length and the others, got ' + ends(r.entries));
check(r.total_s === 8.7, 'the scale grows with the last bar, got ' + r.total_s);
check(sketch.entries[2].at_s === 5, 'commit does not mutate the source');

r = A.commit(sketch.entries, 2, 'move', 1, sketch.base, [2.5, 2.5, 2.5]);
check(r.entries[2].at_s === 2.5, 'a bar cannot start before the previous one, got ' + r.entries[2].at_s);

r = A.commit(sketch.entries, 0, 'end', 1.2, sketch.base, [2.5, 2.5, 2.5]);
check(r.entries[0].at_s === 0 && r.entries[0].len_s === 1.2 && r.clipBlock !== true, 'the end edge shortens, got ' + r.entries[0].len_s);

r = A.commit(sketch.entries, 0, 'end', 9, sketch.base, [2.5, 2.5, 2.5]);
check(r.clipBlock === true && r.entries[0].len_s === 2.5 && r.clip_s === 2.5, 'past the recording the bar stops and says so, got ' + r.entries[0].len_s);

const written = A.layoutChords([chord('Em7', 2, 2.5), chord('A', 2, 2.5)]);
check(written.entries.every((e) => e.written === 2) && written.base === 4, 'written slots are the clock');
r = A.commit(written.entries, 0, 'move', 1, written.base, [2, 2]);
check(r.writtenBlock === true && r.entries[0].at_s === 0 && r.entries[0].len_s === 2, 'a written bar does not move');
r = A.commit(written.entries, 1, 'end', 2.4, written.base, [2, 2]);
check(r.writtenBlock !== true && r.entries[1].at_s === 2 && r.entries[1].len_s === 0.4, 'a written bar can be shortened, got ' + r.entries[1].len_s);
r = A.commit(written.entries, 1, 'end', 12, written.base, [2, 2]);
check(r.writtenBlock === true && r.entries[1].len_s === 2, 'a written bar cannot be lengthened');

const mixed = A.layoutChords([chord('Em7', 2, 2.5), chord('A', null, 2.5)]);
r = A.commit(mixed.entries, 0, 'move', 1, mixed.base, [2, 2.5]);
check(r.writtenBlock === true && r.entries[0].at_s === 0, 'one written bar stays put beside a sketch bar');
r = A.commit(mixed.entries, 1, 'move', 3.1, mixed.base, [2, 2.5]);
check(r.writtenBlock !== true && r.entries[1].at_s === 3.1 && r.entries[1].len_s === 2.5, 'the sketch bar beside it still moves, got ' + ends(r.entries));
check(typeof A.addLane === 'function', 'another lane can be registered');

const both = [{ id: 't1' }, { id: 't2' }];
check(A.mixAudible(both, 't1') === true && A.mixAudible(both, 't2') === true, 'both tracks sound when nothing is set');
check(A.mixAudible([{ id: 't1', mute: true }, { id: 't2' }], 't1') === false, 'mute silences that track');
check(A.mixAudible([{ id: 't1', mute: true }, { id: 't2' }], 't2') === true, 'a muted neighbour leaves the other track on');
check(A.mixAudible([{ id: 't1', solo: true }, { id: 't2' }], 't1') === true, 'solo plays that track');
check(A.mixAudible([{ id: 't1', solo: true }, { id: 't2' }], 't2') === false, 'solo silences every other track');
check(A.mixAudible([{ id: 't1', solo: true }, { id: 't2', solo: true }], 't1') === true && A.mixAudible([{ id: 't1', solo: true }, { id: 't2', solo: true }], 't2') === true, 'several tracks can be soloed at once');
check(A.mixAudible([{ id: 't1', solo: true, mute: true }, { id: 't2' }], 't1') === true, 'solo wins over mute');
check(A.mixAudible([{ id: 't1', solo: true }, { id: 't2', mute: true }], 't2') === false, 'a track that is not soloed stays out');

function chromeBin() {
  for (const name of [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (!name) continue;
    try { return execFileSync('which', [name], { encoding: 'utf8' }).trim() || name; } catch (e) {}
  }
  return '';
}

const chrome = chromeBin();
if (!chrome || typeof WebSocket === 'undefined') {
  problems.push('Chrome is required for the arrangement page');
} else if (!problems.length) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    try {
      const body = await readFile(join(root, path));
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch (e) { res.writeHead(404); res.end(); }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const port = server.address().port;
  const dbg = 9600 + Math.floor(Math.random() * 200);
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', `--remote-debugging-port=${dbg}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'nc-arrange-'))}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
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
      ws.addEventListener('message', (ev) => {
        const m = JSON.parse(ev.data);
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
      async function metrics(width, height, mobile) {
        await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: !!mobile });
        await send('Emulation.setTouchEmulationEnabled', { enabled: !!mobile, maxTouchPoints: mobile ? 5 : 1 });
      }
      async function shot(name, width) {
        await metrics(width, 1400, width < 500);
        await ev('scrollTo(0,0)');
        await sleep(60);
        const clipOf = `(() => { var a = document.getElementById('play-h'), b = document.getElementById('arrange'), m = document.querySelector('main'); var ar = a.getBoundingClientRect(), br = b.getBoundingClientRect(), mr = m.getBoundingClientRect(); return {x: Math.max(0, mr.left + scrollX), y: Math.max(0, ar.top + scrollY - 12), w: Math.ceil(mr.width), h: Math.ceil(br.bottom - ar.top + 8)}; })()`;
        let box = await ev(clipOf);
        const view = await ev('({w: innerWidth, h: innerHeight})');
        if (box.y + box.h > view.h) {
          await metrics(width, Math.ceil(box.y + box.h + 40), width < 500);
          await ev('scrollTo(0,0)');
          await sleep(40);
          box = await ev(clipOf);
        }
        const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }, captureBeyondViewport: true });
        mkdirSync('/opt/cursor/artifacts', { recursive: true });
        writeFileSync(join('/opt/cursor/artifacts', name), Buffer.from(img.data, 'base64'));
        return box;
      }
      const COMP = '[Em7 A]x4\nn C4 E4 G4';
      await metrics(1280, 1400, false);
      await send('Page.addScriptToEvaluateOnNewDocument', { source: 'window.addEventListener("error", function (e) { window.__err = (window.__err || "") + e.message + " @ " + e.filename + ":" + e.lineno + "\\n"; });' });
      await send('Page.navigate', { url: `http://127.0.0.1:${port}/create/` });
      for (let i = 0; i < 150 && !(await ev("document.body && document.body.getAttribute('data-ready') === '1' && window.NCArrange")); i++) await sleep(100);
      await ev(`(() => { var c = document.getElementById('comp'); c.value = ${JSON.stringify(COMP)}; c.dispatchEvent(new Event('input', {bubbles: true})); })()`);
      await sleep(80);
      const laid = await ev(`(() => {
        var box = document.getElementById('arrange');
        var chips = document.querySelectorAll('#prog .grp .ch').length;
        var times = (document.querySelector('#prog .times') || {}).textContent || '';
        var chords = document.querySelectorAll('#arrange [data-track="chords"] .src-span');
        var synth = document.querySelectorAll('#arrange [data-track="synth"] .src-span');
        var names = Array.from(document.querySelectorAll('#arrange .arr-name')).map(function (n) {
          var idx = n.querySelector('.nc-mono');
          var label = n.querySelector('.arr-label');
          return ((idx && idx.textContent) || '') + ' ' + ((label && label.textContent) || '');
        });
        var lanes = document.querySelectorAll('#arrange .arr-lane').length;
        var take = document.getElementById('src-time');
        var ruler = document.querySelector('#arrange .src-ruler');
        var line = document.querySelector('#arrange .src-playline');
        var dot = document.querySelector('#arrange .src-dot');
        var text = box ? box.innerText : '';
        return {
          hidden: !box || box.hidden, chips: chips, times: times, chordBars: chords.length, synthBars: synth.length,
          names: names, lanes: lanes, takeHidden: !take || take.hidden,
          ruler: !!ruler, line: line ? getComputedStyle(line).width : '', dot: !!dot,
          reverse: /reverse/i.test(text), oneLane: chords.length ? chords[0].parentNode === chords[chords.length - 1].parentNode : false
        };
      })()`);
      check(laid && laid.hidden === false, 'Arrangement is on the page');
      check(laid && laid.chips === 2 && laid.times === '×4', 'grouped Play stays the readout, got ' + JSON.stringify(laid && { chips: laid.chips, times: laid.times }));
      check(laid && laid.chordBars === 8 && laid.oneLane, 'eight chords share one lane, got ' + (laid && laid.chordBars));
      check(laid && laid.synthBars === 3 && laid.lanes === 2, 'the notes line is a second lane, got ' + JSON.stringify(laid && { synth: laid.synthBars, lanes: laid.lanes, names: laid.names }));
      check(laid && laid.names[0] === '01 Chords' && laid.names[1] === '02 Synth', 'lane names, got ' + (laid && laid.names));
      check(laid && laid.takeHidden, 'the gathered take strip stays hidden');
      check(laid && laid.ruler && laid.dot && laid.line === '2px', 'the playhead is a dot and a 2 px line, got ' + (laid && laid.line));
      check(laid && laid.reverse === false, 'there is no reverse control');

      const grips = await ev(`(() => {
        var bar = document.querySelector('#arrange [data-track="chords"] .src-span');
        bar.scrollIntoView({block: 'center'});
        var r = bar.getBoundingClientRect();
        var start = bar.querySelector('.src-grip.start').getBoundingClientRect();
        var end = bar.querySelector('.src-grip.end').getBoundingClientRect();
        function hit(x) {
          var e = document.elementFromPoint(x, r.top + Math.min(8, r.height / 2));
          return e ? (e.getAttribute('data-grip') || (e.closest('.src-span') ? 'move' : e.tagName)) : 'none';
        }
        return { w: r.width, startIn: start.left >= r.left - 1 && start.right <= r.right + 1, endIn: end.left >= r.left - 1 && end.right <= r.right + 1, hitStart: hit(r.left + 3), hitMid: hit(r.left + r.width / 2), hitEnd: hit(r.right - 3) };
      })()`);
      check(grips && grips.startIn && grips.endIn, 'grips sit inside the bar, got ' + JSON.stringify(grips));
      check(grips && grips.hitStart === 'start' && grips.hitEnd === 'end' && grips.hitMid === 'move', 'the middle moves and the edges trim, got ' + JSON.stringify(grips));

      await shot('arrangement_desktop_lanes.png', 1280);
      await shot('arrangement_phone_lanes.png', 390);
      await metrics(1280, 1400, false);
      await ev(`document.querySelector('#arrange [data-chord="chord-6"]').scrollIntoView({block:'center'})`);
      await sleep(40);

      async function place() {
        return ev(`(() => {
          function row(id) {
            return Array.from(document.querySelectorAll('#arrange [data-track="' + id + '"] .src-span')).map(function (e) {
              var i = +e.getAttribute('data-index');
              var c = NCArrange.clip(id, i);
              return { i: i, at: c.at, len: c.len, left: e.style.left };
            });
          }
          var plan = NC.toPlan(NC.state());
          return { chords: row('chords'), plan: plan.chords.map(function (c) { return c.t; }) };
        })()`);
      }
      const before = await place();
      const bar = await ev(`(() => { var e = document.querySelector('#arrange [data-chord="chord-6"]'); if (!e) return {missing: document.querySelectorAll('#arrange .src-span').length}; var r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width}; })()`);
      if (!bar || bar.x == null) throw new Error('no chord bar to drag: ' + JSON.stringify(bar));
      async function mouse(type, x, y) {
        await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 });
      }
      await mouse('mousePressed', bar.x, bar.y);
      await mouse('mouseReleased', bar.x, bar.y);
      const clicked = await place();
      check(JSON.stringify(clicked.chords) === JSON.stringify(before.chords), 'a click does not move a bar');

      await mouse('mouseMoved', bar.x, bar.y);
      await mouse('mousePressed', bar.x, bar.y);
      for (let k = 1; k <= 8; k++) await mouse('mouseMoved', bar.x + 50 * k / 8, bar.y);
      await mouse('mouseReleased', bar.x + 50, bar.y);
      await sleep(80);
      const moved = await place();
      check(moved.chords[6].at > before.chords[6].at + 0.2 && moved.chords[6].len === before.chords[6].len, 'dragging a bar moves it and keeps its length, got ' + JSON.stringify(moved.chords[6]) + ' from ' + JSON.stringify(before.chords[6]));
      check(moved.chords[5].at === before.chords[5].at && moved.chords[7].at === before.chords[7].at, 'the chords beside it stay, got ' + moved.chords.map((c) => c.at));
      check(JSON.stringify(moved.plan) === JSON.stringify(before.plan), 'the sketch plan ignores the move');

      const edge = await ev(`(() => { var e = document.querySelector('#arrange [data-chord="chord-6"] .src-grip.end'); var r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; })()`);
      const lenBefore = moved.chords[6].len;
      await mouse('mousePressed', edge.x, edge.y);
      for (let k = 1; k <= 8; k++) await mouse('mouseMoved', edge.x - 36 * k / 8, edge.y);
      await mouse('mouseReleased', edge.x - 36, edge.y);
      await sleep(80);
      const trimmed = await place();
      check(trimmed.chords[6].at === moved.chords[6].at && trimmed.chords[6].len < lenBefore - 0.15, 'dragging the end shortens the bar, got ' + trimmed.chords[6].len + ' from ' + lenBefore);

      const grow = await ev(`(() => { var e = document.querySelector('#arrange [data-chord="chord-0"] .src-grip.end'); var r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; })()`);
      const capLen = (await place()).chords[0].len;
      await mouse('mousePressed', grow.x, grow.y);
      for (let k = 1; k <= 8; k++) await mouse('mouseMoved', grow.x + 120 * k / 8, grow.y);
      await mouse('mouseReleased', grow.x + 120, grow.y);
      await sleep(80);
      const capped = await place();
      const note = await ev(`(() => { var e = document.getElementById('arrange-note'); return { hidden: e.hidden, text: e.textContent }; })()`);
      check(capped.chords[0].len === capLen, 'a bar does not grow past its recording, got ' + capped.chords[0].len);
      check(note && note.hidden === false && /whole recording/.test(note.text) && /Nothing is stretched/.test(note.text), 'the recording note shows, got ' + JSON.stringify(note));

      await ev(`document.querySelector('#arrange [data-chord="chord-1"]').focus()`);
      const keyBefore = (await place()).chords[1].at;
      await ev(`document.querySelector('#arrange [data-chord="chord-1"]').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}))`);
      const keyed = (await place()).chords[1].at;
      check(Math.abs(keyed - (keyBefore + 0.1)) < 0.02, 'ArrowRight moves a bar by a tenth, got ' + keyed + ' from ' + keyBefore);

      await metrics(390, 1600, true);
      await sleep(60);
      const phone = await ev(`(() => {
        var box = document.getElementById('arrange');
        var bars = document.querySelectorAll('#arrange [data-track="chords"] .src-span');
        var page = document.documentElement;
        return { w: innerWidth, bars: bars.length, hidden: box.hidden, wide: page.scrollWidth > page.clientWidth + 1, grip: getComputedStyle(box).getPropertyValue('--grip').trim() };
      })()`);
      check(phone && phone.w === 390 && phone.bars === 8 && phone.hidden === false && phone.wide === false, 'the arrangement fits a 390 px phone, got ' + JSON.stringify(phone));

      const touchBar = await ev(`(() => { var e = document.querySelector('#arrange [data-chord="chord-7"]'); e.scrollIntoView({block:'center'}); var r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; })()`);
      const touchBefore = (await place()).chords[7].at;
      const pt = (x, y) => [{ x, y, id: 1, radiusX: 8, radiusY: 8, force: 1 }];
      await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(touchBar.x, touchBar.y) });
      for (let k = 1; k <= 8; k++) await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(touchBar.x + 40 * k / 8, touchBar.y) });
      await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await sleep(120);
      const touchAfter = (await place()).chords[7].at;
      check(touchAfter > touchBefore + 0.15, 'a finger drag on the phone moves the bar, got ' + touchAfter + ' from ' + touchBefore + ' grip ' + (phone && phone.grip));

      await metrics(1100, 1400, false);
      await ev(`(() => { var c = document.getElementById('comp'); c.value = 'Em7(4) A(4)'; c.dispatchEvent(new Event('input', {bubbles: true})); })()`);
      await sleep(80);
      const locked = await ev(`(() => {
        var bars = document.querySelectorAll('#arrange [data-track="chords"] .src-span');
        var e = bars[0]; e.scrollIntoView({block:'center'});
        var r = e.getBoundingClientRect();
        return { n: bars.length, x: r.left + r.width / 2, y: r.top + r.height / 2, at: NCArrange.clip('chords', 0).at };
      })()`);
      check(locked && locked.n === 2, 'a written composition has one bar per chord, got ' + (locked && locked.n));
      await mouse('mousePressed', locked.x, locked.y);
      for (let k = 1; k <= 6; k++) await mouse('mouseMoved', locked.x + 40 * k / 6, locked.y);
      await mouse('mouseReleased', locked.x + 40, locked.y);
      await sleep(60);
      const lockAfter = await ev(`(() => { var e = document.getElementById('arrange-note'); return { at: NCArrange.clip('chords', 0).at, hidden: e.hidden, text: e.textContent }; })()`);
      check(lockAfter && lockAfter.at === locked.at, 'a written chord does not move, got ' + (lockAfter && lockAfter.at));
      check(lockAfter && lockAfter.hidden === false && /written in the Composition/.test(lockAfter.text), 'the written-length note shows, got ' + (lockAfter && lockAfter.text));

      await ev(`(() => { var c = document.getElementById('comp'); c.value = 't1: notes C4(2|) E4(2|) @synth\\nt2: notes G3(2|) B3(2|) @synth'; c.dispatchEvent(new Event('input', {bubbles:true})); })()`);
      await sleep(80);
      const mix = await ev(`(() => {
        var comp = document.getElementById('comp').value;
        var t1s = document.querySelector('#arrange [data-track="t1"] .arr-solo');
        var t1m = document.querySelector('#arrange [data-track="t1"] .arr-mute');
        var t2s = document.querySelector('#arrange [data-track="t2"] .arr-solo');
        var t2m = document.querySelector('#arrange [data-track="t2"] .arr-mute');
        if (!t1s || !t2m) return { missing: true, lanes: Array.from(document.querySelectorAll('#arrange .arr-lane')).map(function (n) { return n.getAttribute('data-track'); }) };
        function press(b) { b.click(); }
        var off = { t1: NCArrange.audible('t1'), t2: NCArrange.audible('t2'), s: t1s.getAttribute('aria-pressed'), m: t2m.getAttribute('aria-pressed') };
        press(t2m);
        var muted = { t1: NCArrange.audible('t1'), t2: NCArrange.audible('t2'), pressed: t2m.getAttribute('aria-pressed'), on: t2m.classList.contains('arr-on'), comp: document.getElementById('comp').value === comp };
        press(t1s);
        var soloMute = { t1: NCArrange.audible('t1'), t2: NCArrange.audible('t2') };
        press(t2s);
        var bothSolo = { t1: NCArrange.audible('t1'), t2: NCArrange.audible('t2'), t2solo: t2s.getAttribute('aria-pressed') };
        press(t1m);
        var soloWins = NCArrange.audible('t1') === true && t1m.getAttribute('aria-pressed') === 'true';
        NCArrange.clearMix();
        var cleared = NCArrange.audible('t1') && NCArrange.audible('t2') && t1s.getAttribute('aria-pressed') === 'false' && t2m.getAttribute('aria-pressed') === 'false' && !t2m.classList.contains('arr-on');
        return {
          labels: [t1s.getAttribute('aria-label'), t1m.getAttribute('aria-label'), t2s.getAttribute('aria-label'), t2m.getAttribute('aria-label')],
          off: off, muted: muted, soloMute: soloMute, bothSolo: bothSolo, soloWins: soloWins, cleared: cleared,
          reset: /clearMix/.test(String(NCReset.reset)),
          comp: document.getElementById('comp').value
        };
      })()`);
      check(mix && mix.missing !== true, 'each track has Solo and Mute, got ' + JSON.stringify(mix && mix.lanes));
      check(mix && mix.labels && mix.labels.join('|') === 'Solo t1|Mute t1|Solo t2|Mute t2', 'aria labels, got ' + (mix && mix.labels));
      check(mix && mix.off && mix.off.t1 === true && mix.off.t2 === true && mix.off.s === 'false' && mix.off.m === 'false', 'the toggles start off, got ' + JSON.stringify(mix && mix.off));
      check(mix && mix.muted && mix.muted.t2 === false && mix.muted.t1 === true && mix.muted.pressed === 'true' && mix.muted.on === true && mix.muted.comp === true, 'mute silences that track and leaves the Composition, got ' + JSON.stringify(mix && mix.muted));
      check(mix && mix.soloMute && mix.soloMute.t1 === true && mix.soloMute.t2 === false, 'one solo leaves the other track out, got ' + JSON.stringify(mix && mix.soloMute));
      check(mix && mix.bothSolo && mix.bothSolo.t1 === true && mix.bothSolo.t2 === true, 'two solos play together, got ' + JSON.stringify(mix && mix.bothSolo));
      check(mix && mix.soloWins === true, 'solo wins over mute on the same track');
      check(mix && mix.cleared === true && mix.reset === true, 'Reset clears solo and mute, got ' + JSON.stringify(mix && { cleared: mix.cleared, reset: mix.reset }));
      check(mix && mix.comp === 't1: notes C4(2|) E4(2|) @synth\nt2: notes G3(2|) B3(2|) @synth', 'the Composition text is unchanged, got ' + (mix && mix.comp));

      async function shotBox(name, width) {
        await metrics(width, 1400, width < 500);
        await ev('scrollTo(0,0)');
        await sleep(60);
        const clipOf = `(() => { var b = document.getElementById('arrange'); var r = b.getBoundingClientRect(); return {x: Math.max(0, r.left + scrollX), y: Math.max(0, r.top + scrollY), w: Math.ceil(r.width), h: Math.ceil(r.height), sy: scrollY}; })()`;
        let box = await ev(clipOf);
        const view = await ev('({w: innerWidth, h: innerHeight})');
        if (box.y + box.h > view.h - 8) {
          await metrics(width, Math.ceil(box.y + box.h + 32), width < 500);
          await ev('scrollTo(0,0)');
          await sleep(40);
          box = await ev(clipOf);
        }
        const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }, captureBeyondViewport: true });
        mkdirSync('/opt/cursor/artifacts', { recursive: true });
        writeFileSync(join('/opt/cursor/artifacts', name), Buffer.from(img.data, 'base64'));
        return box;
      }
      async function setMix(expr) {
        await ev(expr);
        await sleep(40);
      }
      await setMix(`NCArrange.clearMix()`);
      const offDesk = await shotBox('arrange-mix-off-desktop.png', 1280);
      const offPhone = await shotBox('arrange-mix-off-phone.png', 390);
      const hit = await ev(`(() => { var b = document.querySelector('#arrange [data-track="t1"] .arr-solo'); var r = b.getBoundingClientRect(); var page = document.documentElement; return {w: r.width, h: r.height, wide: page.scrollWidth > page.clientWidth + 1}; })()`);
      check(hit && hit.w >= 44 && hit.h >= 44 && hit.wide === false, 'the phone tap target is 44 px and the page stays within 390, got ' + JSON.stringify(hit));
      await metrics(1280, 1400, false);
      await setMix(`document.querySelector('#arrange [data-track="t2"] .arr-mute').click()`);
      await shotBox('arrange-mix-muted-desktop.png', 1280);
      await shotBox('arrange-mix-muted-phone.png', 390);
      await metrics(1280, 1400, false);
      await setMix(`(() => { NCArrange.clearMix(); document.querySelector('#arrange [data-track="t1"] .arr-solo').click(); })()`);
      await shotBox('arrange-mix-soloed-desktop.png', 1280);
      await shotBox('arrange-mix-soloed-phone.png', 390);
      check(offDesk && offDesk.h > 40 && offPhone && offPhone.h > 40 && offPhone.sy === 0, 'arrangement shots include the rows, got ' + JSON.stringify({ d: offDesk, p: offPhone }));
      await metrics(1280, 1400, false);
      await ev(`NCArrange.clearMix()`);

      const extra = await ev(`(() => {
        NCArrange.addLane(function () { return { id: 'extra', label: 'Pulse', entries: [{ at_s: 0, len_s: 1, cap: 1, written: 1, chord: 'tick' }], base: 1 }; });
        document.getElementById('comp').dispatchEvent(new Event('input', {bubbles: true}));
        return Array.from(document.querySelectorAll('#arrange .arr-label')).map(function (n) { return n.textContent; });
      })()`);
      check(extra && extra.some((name) => name === 'Pulse'), 'addLane puts another track on the page, got ' + extra);

      ws.close();
    }
  } finally {
    proc.kill('SIGKILL');
    server.close();
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('arrange ok');
