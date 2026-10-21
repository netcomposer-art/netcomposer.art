// NetComposer /create/ Live: a stack of hacks on a finished Performance, not on the Composition preview.
// The page player is the only play control. Its output is the Web Audio source. Signal flows
// top to bottom through one AudioWorklet (low-pass, delay, plate, then a fixed limiter).
// Record keeps the processed sound as a WAV plus a dial log.
// Graph: player -> input -> hack stack -> limiter (-1 dBFS) -> speakers and the WAV tap.
(function () {
'use strict';
var $ = function (id) { return document.getElementById(id); };
var TAIL_S = 3, LEAD_S = 0.05, MAX_TAKE_S = 600, MAX_LOG_BYTES = 5e6, LOG_VERSION = '0.3';
var DIALS = {cutoff: 'lcut', delay_timing: 'ltime', feedback: 'lfb', wet: 'lmix'};
var AC = null, G = null, live = false, gen = 0, T0 = 0, timers = [], sources = [], SRC = null, EL = null, armFollow = false;
var PERF = null;    // the Performance in the dials: {id, buffer, sha, audioUrl, audioFile, record, bpm, tempoSource, creditName}
var openGen = 0;
var REC = null;     // a take in progress: {log, frames, chunks, firstT, stopping}
var TAKE = null;    // the finished take: {blob, log, url}
var LOG = null;     // an uploaded dial log: {log, name}
var FOLLOW = false, OVERRIDE = {}, PENDING = null;

// ---------- dial semantics ----------
function cutoffHz(v) { return v <= 0 ? null : Math.round(20000 * Math.pow(150 / 20000, v / 100)); }   // 0 = fully open (no filtering), 100 = 150 Hz
function beatS() { return 60 / ((PERF && PERF.bpm) || 60); }   // one quarter note of this Performance
function delayS() { var el = $('ltime'); return Math.min(4.9, (el ? +el.value : 0.75) * beatS()); }
function fmtHz(h) { return h === null ? 'open' : h >= 1000 ? (h / 1000).toFixed(h >= 10000 ? 0 : 1) + ' kHz' : h + ' Hz'; }
function readouts() {
  if (window.NCStack) { NCStack.setQuarter(beatS()); NCStack.readouts(); return; }
  $('lcutv').textContent = fmtHz(cutoffHz(+$('lcut').value));
  $('ltimev').textContent = Math.round(delayS() * 1000) + ' ms';
  $('lfbv').textContent = $('lfb').value + '%';
  $('lmixv').textContent = $('lmix').value + '% wet';
}
function settings() {
  if (!$('lcut') || !$('ltime') || !$('lfb') || !$('lmix')) {
    return {cutoff: 0, cutoff_hz: null, delay_timing: '1/8 dotted', delay_beats: 0.75, delay_s: +delayS().toFixed(4), feedback: 0.35, wet: 0, loop: $('lloop') ? $('lloop').checked : true};
  }
  var o = $('ltime').options[$('ltime').selectedIndex];
  return {cutoff: +$('lcut').value, cutoff_hz: cutoffHz(+$('lcut').value), delay_timing: o.textContent, delay_beats: +o.value, delay_s: +delayS().toFixed(4),
          feedback: +$('lfb').value / 100, wet: +$('lmix').value / 100, loop: $('lloop').checked};
}
// Neutral is the original render: filter open, delay silent, plate silent. Timing and feedback stay parked at 1/8 dotted and 35% until wet is raised. A bypassed hack, and the order of neutral hacks, do not change the sound. Loop does not either.
function adjusted() {
  var list = chain(), i, w, p, beats, fb;
  for (i = 0; i < list.length; i++) {
    w = list[i];
    if (!w || w.type === 'limiter' || w.bypass) continue;
    p = w.params || {};
    if (w.id === 'delay-1') {
      beats = p.delay_beats == null ? 0.75 : p.delay_beats;
      fb = p.feedback == null ? 0.35 : p.feedback;
      if ((p.wet || 0) !== 0 || Math.abs(beats - 0.75) > 1e-9 || Math.round(fb * 100) !== 35) return true;
    } else if (w.type === 'lowpass') {
      if ((p.cutoff || 0) !== 0) return true;
    } else if (w.type === 'delay') {
      if ((p.wet || 0) !== 0) return true;
    } else if (w.type === 'plate') {
      if ((p.mix || 0) !== 0) return true;
    }
  }
  return false;
}
function dialEvent(d) {
  var S = settings(), ev = {dial: d};
  if (d === 'cutoff') { ev.value = S.cutoff; ev.hz = S.cutoff_hz; } else if (d === 'delay_timing') { ev.value = S.delay_timing; ev.beats = S.delay_beats; ev.s = S.delay_s; } else ev.value = S[d];
  return ev;
}
function setTiming(beats) {   // nearest note value
  var o = $('ltime').options, best = 0;
  for (var i = 1; i < o.length; i++) if (Math.abs(+o[i].value - beats) < Math.abs(+o[best].value - beats)) best = i;
  $('ltime').selectedIndex = best;
}
function setDial(d, v) {   // v as logged: cutoff 0..100, feedback/wet 0..1, delay_timing in beats
  if (!$(DIALS[d])) return;
  if (d === 'cutoff') $('lcut').value = Math.round(v);
  else if (d === 'feedback') $('lfb').value = Math.round(v * 100);
  else if (d === 'wet') $('lmix').value = Math.round(v * 100);
  else if (d === 'delay_timing') setTiming(v);
}

// ---------- the audio graph ----------
function showCpu(c) {
  var el = $('lcpu');
  if (!el || el.hidden || !c || !(c.budget > 0)) return;
  el.textContent = 'CPU ' + c.avg.toFixed(2) + ' / ' + c.budget.toFixed(2) + ' ms · max ' + c.max.toFixed(2);
}
function movableOf(list) {
  return (list || []).filter(function (w) { return w && !w.fixed && w.type !== 'limiter'; });
}
function replaceAudio() {
  if (!G || !G.api) return Promise.resolve();
  var list = chain();
  var mov = movableOf(list);
  G.known = {};
  mov.forEach(function (w) { G.known[w.id] = 1; });
  G.orderKey = mov.map(function (w) { return w.id; }).join('|');
  return G.api.send({op: 'chain', widgets: list});
}
function syncAudio(snap) {
  if (!G || !G.api) return Promise.resolve();
  var mov = movableOf(chain());
  var ids = mov.map(function (w) { return w.id; });
  var known = G.known || {};
  var seq = Promise.resolve();
  mov.forEach(function (w) {
    if (!known[w.id]) {
      seq = seq.then(function () { return G.api.send({op: 'add', widget: w}); });
      known[w.id] = 1;
    } else {
      seq = seq.then(function () { return G.api.send({op: 'patch', id: w.id, params: w.params, bypass: !!w.bypass, immediate: !!snap}); });
    }
  });
  Object.keys(known).forEach(function (id) { if (ids.indexOf(id) < 0) delete known[id]; });
  G.known = known;
  var key = ids.join('|');
  if (key !== G.orderKey || snap) {
    G.orderKey = key;
    seq = seq.then(function () { return G.api.send({op: 'order', ids: ids, immediate: !!snap}); });
  }
  return seq;
}
function graph() {
  if (G) return G;
  var Ctx = window.AudioContext || window.webkitAudioContext;
  try { AC = new Ctx({sampleRate: 48000}); } catch (e) { AC = new Ctx(); }
  G = {input: AC.createGain(), sink: AC.createGain(), hack: null, api: null, ready: null, known: {}, orderKey: ''};
  G.meter = AC.createAnalyser(); G.meter.fftSize = 2048; G.meter.smoothingTimeConstant = 0.3;
  G.sink.gain.value = 0; G.sink.connect(AC.destination);
  G.ready = NCHacks.attach(AC).then(function (api) {
    G.api = api; G.hack = api.node; G.master = api.node;
    api.onCpu = showCpu;
    G.hack.connect(AC.destination); G.hack.connect(G.meter);
    if (window.NCScope) {
      api.onGr = NCScope.gr;
      NCScope.attach({
        analyser: function () { return G && G.meter; },
        playing: playing,
        gain: function (on) { if (G && G.api) G.api.send({op: 'scope', on: !!on}); }
      });
    }
    return replaceAudio();
  }).then(function () {
    G.input.connect(G.hack);
    return G;
  }).catch(function () {
    var dry = AC.createGain(); dry.gain.value = 0.8; G.master = dry;
    G.input.connect(dry); dry.connect(AC.destination); dry.connect(G.meter);
    status('These hacks need a browser that can run an audio worklet.');
    return G;
  });
  return G;
}
function player() { return $('perform-audio'); }
// Something is going through the stack: the player, or clips the page placed itself.
function playing() {
  if (!AC || AC.state !== 'running') return false;
  return live || (clipNodes.length > 0 && AC.currentTime < clipEnd);
}
function scopeWake() { if (window.NCScope) NCScope.wake(); }
function prime() {
  graph();
  if (AC.state === 'suspended') AC.resume();
  return AC;
}
function wirePlayer(a) {
  if (a._ncLive) return;
  a._ncLive = true;
  a.setAttribute('playsinline', '');
  a.playsInline = true;
  a.addEventListener('pointerdown', function () { if (AC && AC.state === 'suspended') AC.resume(); });
  a.addEventListener('play', function () {
    if (AC && AC.state === 'suspended') AC.resume();
    live = true; apply(true);
    scopeWake();
    T0 = AC.currentTime - (a.currentTime || 0);
    if (window.NC && NC.stop) NC.stop();
    if (armFollow) { armFollow = false; scheduleMoves(); }
    buttons();
  });
  a.addEventListener('pause', function () { live = false; buttons(); });
  a.addEventListener('ended', function () {
    live = false;
    if (REC && !a.loop) finish('The Performance ended; the take is ready.');
    else buttons();
  });
  a.addEventListener('error', function () { retryAudio(a); });
  a.addEventListener('loadedmetadata', function () { audioSettled(a); });
}
function cleanAudioUrl(a) {
  var raw = (PERF && PERF.audioUrl) || (a && a.getAttribute('src')) || '';
  return String(raw).replace(/([?&])_=\d+/, '').replace(/[?&]$/, '');
}
function audioSettled(a) {
  if (!a) return;
  if (a._ncTimer) { clearTimeout(a._ncTimer); a._ncTimer = null; }
  a._ncTryAt = 0;
  a._ncDelay = 1000;
  if (a === player() && PERF && a.getAttribute('src')) $('live').hidden = false;
}
function retryAudio(a) {
  if (!a || !a.getAttribute('src') || a !== player() || !PERF) return;
  if (!a._ncTryAt) a._ncTryAt = Date.now();
  if (Date.now() - a._ncTryAt >= 60000) {
    $('live').hidden = true;
    var msg = 'This Performance came back, but its audio did not load into the player.';
    status(msg);
    if (window.NCPerform && NCPerform.audioMiss) NCPerform.audioMiss(msg);
    return;
  }
  var delay = a._ncDelay || 1000;
  a._ncDelay = Math.min(delay * 2, 8000);
  var gen = openGen;
  var waitMs = Math.min(delay, Math.max(0, 60000 - (Date.now() - a._ncTryAt)));
  if (a._ncTimer) clearTimeout(a._ncTimer);
  a._ncTimer = setTimeout(function () {
    a._ncTimer = null;
    if (gen !== openGen || a !== player() || !PERF) return;
    var url = cleanAudioUrl(a);
    var bust = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_=' + Date.now();
    $('live').hidden = false;
    a.removeAttribute('src');
    try { a.load(); } catch (e) {}
    a.src = bust;
    try { a.load(); } catch (e) {}
  }, waitMs);
}
// One MediaElementSource per element. A new Performance gets a new element so the
// new src is actually in the graph (Safari will not retarget the old node).
function connectElement(a) {
  if (EL) { try { EL.disconnect(); } catch (e) {} EL = null; }
  EL = AC.createMediaElementSource(a);
  EL.connect(G.input);
  wirePlayer(a);
  return a;
}
function silence(a) {
  if (!a) return;
  try { a.pause(); } catch (e) {}
  a.removeAttribute('src');
  try { a.load(); } catch (e) {}
}
function freshDelay() {
  if (G && G.api) G.api.send({op: 'clear'});
}
function mount(url) {
  graph();
  var a = player();
  var next = url || '';
  var changed = !sameUrl(a.getAttribute('src') || '', next);
  if (EL && EL.mediaElement === a && !changed) {
    a.loop = $('lloop').checked;
    return a;
  }
  if (EL) {
    var neu = document.createElement('audio');
    neu.id = 'perform-audio';
    neu.controls = true;
    neu.setAttribute('playsinline', '');
    neu.playsInline = true;
    neu.preload = 'metadata';
    neu.crossOrigin = 'anonymous';
    neu.loop = $('lloop').checked;
    if (next) neu.src = next;
    a.replaceWith(neu);
    silence(a);
    freshDelay();
    connectElement(neu);
    try { neu.load(); } catch (e) {}
    return neu;
  }
  a.crossOrigin = 'anonymous';
  a.loop = $('lloop').checked;
  if (next) a.src = next;
  connectElement(a);
  try { a.load(); } catch (e) {}
  return a;
}
function route() {
  graph();
  var a = player();
  if (!EL || EL.mediaElement !== a) mount(a.getAttribute('src') || '');
  return EL;
}
function playPlayer(fromStart) {
  route();
  var a = player();
  a.loop = $('lloop').checked;
  AC.resume();
  if (!a.paused) a.pause();
  if (fromStart) { try { a.currentTime = 0; } catch (e) {} }
  var p = a.play();
  if (p && p.catch) p.catch(function () { armFollow = false; status('Press play on the player.'); });
}
function pausePlayer() {
  var a = player();
  if (a && !a.paused) a.pause();
  live = false;
}
function level() {
  if (!G || !G.meter) return 0;
  var buf = new Float32Array(G.meter.fftSize), i, s = 0;
  G.meter.getFloatTimeDomainData(buf);
  for (i = 0; i < buf.length; i++) s += buf[i] * buf[i];
  return Math.sqrt(s / buf.length);
}
function bands() {
  if (!G || !G.meter || !AC) return null;
  var bins = G.meter.frequencyBinCount, arr = new Uint8Array(bins), hzPer = AC.sampleRate / G.meter.fftSize;
  G.meter.getByteFrequencyData(arr);
  var low = 0, ln = 0, high = 0, hn = 0, i, hz;
  for (i = 0; i < bins; i++) {
    hz = i * hzPer;
    if (hz < 300) { low += arr[i]; ln++; }
    else if (hz > 4000 && hz < 12000) { high += arr[i]; hn++; }
  }
  return {low: ln ? low / ln : 0, high: hn ? high / hn : 0};
}
function apply(now) {
  if (!G || !G.api) return;
  syncAudio(!!now);
}
// The chain is the stack, top to bottom, limiter last. Reordering keeps each hack's state.
function chain() {
  if (window.NCStack) { NCStack.setQuarter(beatS()); return NCStack.chain(); }
  var S = settings();
  return [
    { id: 'lowpass-1', type: 'lowpass', version: 1, bypass: false, params: { cutoff: S.cutoff, cutoff_hz: S.cutoff_hz, q: 0.7071067811865476 } },
    { id: 'delay-1', type: 'delay', version: 1, bypass: false, params: { delay_beats: S.delay_beats, delay_s: S.delay_s, feedback: S.feedback, wet: S.wet } }
  ];
}
function applyChain(list) {
  if (window.NCStack) NCStack.applyChain(list || []);
  readouts();
  if (G && G.api) replaceAudio();
}
function tailFor(list) {
  var tail = 0.0515;
  (list || []).forEach(function (w) {
    if (!w || w.bypass || w.fixed || w.type === 'limiter') return;
    var p = w.params || {}, t = 0;
    if (w.type === 'delay' && (p.wet || 0) > 0.001) t = Math.min(3, Math.max(0.2, (p.delay_s || 0) * 4));
    if (w.type === 'plate' && (p.mix || 0) > 0.001) t = Math.min(6, 0.4 + (p.decay || 0) * 5);
    if (t > tail) tail = t;
  });
  return tail;
}
var clipNodes = [], clipPlays = 0, clipEnd = 0;
function stopClips() {
  clipEnd = 0;
  clipNodes.forEach(function (n) {
    try { n.src.onended = null; n.src.stop(); } catch (e) {}
    try { n.src.disconnect(); } catch (e2) {}
    try { n.gain.disconnect(); } catch (e3) {}
  });
  clipNodes = [];
}
function atRate(ctx, buf) {
  var rate = ctx.sampleRate;
  if (!buf || buf.sampleRate === rate) return buf;
  var frames = Math.max(1, Math.round(buf.duration * rate));
  var out = ctx.createBuffer(buf.numberOfChannels, frames, rate);
  var ratio = buf.sampleRate / rate, ch, src, dst, i, x, i0, i1, f;
  for (ch = 0; ch < buf.numberOfChannels; ch++) {
    src = buf.getChannelData(ch); dst = out.getChannelData(ch);
    for (i = 0; i < frames; i++) {
      x = i * ratio; i0 = Math.floor(x); f = x - i0; i1 = i0 + 1;
      if (i0 < 0) i0 = 0;
      if (i0 >= src.length) i0 = src.length - 1;
      if (i1 >= src.length) i1 = src.length - 1;
      dst[i] = src[i0] * (1 - f) + src[i1] * f;
    }
  }
  return out;
}
function placeClip(ctx, dest, entry, when, offset) {
  var buf = atRate(ctx, entry.buffer);
  if (!buf) return null;
  var origin = entry.origin > 0 ? entry.origin : 0;
  var room = Math.max(0, buf.duration - origin);
  var slot = Math.min(entry.len, room);
  var end = entry.at + slot;
  if (end <= offset + 0.001) return null;
  var skip = Math.max(0, offset - entry.at);
  var playLen = slot - skip;
  if (!(playLen > 0.001)) return null;
  var src = ctx.createBufferSource(), g = ctx.createGain();
  var lin = Math.pow(10, (entry.gainDb || 0) / 20);
  var fin = Math.min(entry.fadeIn || 0.012, playLen / 2);
  var fout = Math.min(entry.fadeOut || 0.012, playLen / 2);
  var t0 = when + Math.max(0, entry.at - offset);
  var stopAt = t0 + playLen;
  src.buffer = buf;
  src.playbackRate.value = 1;
  if (skip > fin) g.gain.setValueAtTime(lin, t0);
  else {
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(lin, t0 + Math.max(0.001, fin - skip));
  }
  g.gain.setValueAtTime(lin, Math.max(t0 + 0.002, stopAt - fout));
  g.gain.linearRampToValueAtTime(0, stopAt);
  src.connect(g); g.connect(dest);
  src.start(t0, origin + skip, playLen);
  return { src: src, gain: g, end: stopAt };
}
function scheduleClips(spec) {
  graph();
  var run = function () {
    if (AC.state === 'suspended') AC.resume();
    stopClips();
    clipPlays++;
    var when = AC.currentTime + 0.03;
    var offset = spec.offset || 0;
    (spec.entries || []).forEach(function (entry) {
      var node = placeClip(AC, G.input, entry, when, offset);
      if (node) { clipNodes.push(node); if (node.end > clipEnd) clipEnd = node.end; }
    });
    syncAudio(true);
    scopeWake();
  };
  if (G.hack) run();
  else G.ready.then(run);
}
function renderBuffers(spec) {
  graph();
  var list = spec.chain || chain();
  return G.ready.then(function () {
    var rate = 48000;
    var tail = tailFor(list);
    var musical = spec.total || 0;
    if (musical + tail > 180) tail = Math.max(0, 180 - musical);
    var total = musical + tail;
    var off = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, Math.max(1, Math.ceil(total * rate)), rate);
    var bus = off.createGain();
    (spec.entries || []).forEach(function (entry) { placeClip(off, bus, entry, 0, 0); });
    return NCHacks.attach(off, {widgets: list, immediate: true}).then(function (api) {
      bus.connect(api.node);
      api.node.connect(off.destination);
      return off.startRendering();
    });
  }).then(function (rendered) {
    return { blob: pcmWav(rendered), total_s: +(rendered.length / rendered.sampleRate).toFixed(3) };
  });
}
// ---------- the WAV tap: 16-bit stereo PCM straight from the master bus ----------
var TAP_SRC = "registerProcessor('nc-tap',class extends AudioWorkletProcessor{constructor(){super();this.on=false;this.b=new Int16Array(8192);this.n=0;this.t=0;" +
  "this.port.onmessage=e=>{if(e.data==='start'){this.on=true;this.n=0}else if(e.data==='stop'){this.flush();this.on=false;this.port.postMessage({done:true})}}}" +
  "flush(){if(this.n){var o=this.b.slice(0,this.n*2);this.port.postMessage({t:this.t,b:o},[o.buffer]);this.n=0}}" +
  "process(i){if(!this.on)return true;var c=i[0],L=c&&c[0],R=c&&(c[1]||c[0]),N=L?L.length:128;if(!this.n)this.t=currentTime;" +
  "for(var k=0;k<N;k++){var l=L?L[k]:0,r=R?R[k]:0;l=l>1?1:l<-1?-1:l;r=r>1?1:r<-1?-1:r;this.b[2*this.n]=l*32767;this.b[2*this.n+1]=r*32767;this.n++;if(this.n===4096)this.flush()}return true}})";
var TAP = null;
function tap() {   // -> Promise of {start(onData), stop(onDone)}
  if (TAP) return TAP;
  graph();
  TAP = G.ready.then(function () { return tapNode(); });
  return TAP;
}
function tapNode() {
  if (AC.audioWorklet && window.AudioWorkletNode) {
    return AC.audioWorklet.addModule(URL.createObjectURL(new Blob([TAP_SRC], {type: 'application/javascript'}))).then(function () {
      var n = new AudioWorkletNode(AC, 'nc-tap', {numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2], channelCount: 2, channelCountMode: 'explicit'}), on = null, done = null;
      G.master.connect(n); n.connect(G.sink);
      n.port.onmessage = function (e) { if (e.data.done) { if (done) done(); } else if (on) on(e.data.t, e.data.b); };
      return {start: function (f) { on = f; n.port.postMessage('start'); }, stop: function (f) { done = function () { on = null; done = null; f(); }; n.port.postMessage('stop'); }};
    });
  }
  return Promise.resolve().then(function () {
    var n = AC.createScriptProcessor(4096, 2, 2), on = null; G.master.connect(n); n.connect(G.sink);
    n.onaudioprocess = function (e) {
      if (!on) return; var L = e.inputBuffer.getChannelData(0), R = e.inputBuffer.numberOfChannels > 1 ? e.inputBuffer.getChannelData(1) : L, b = new Int16Array(L.length * 2);
      for (var k = 0; k < L.length; k++) { b[2 * k] = Math.max(-1, Math.min(1, L[k])) * 32767; b[2 * k + 1] = Math.max(-1, Math.min(1, R[k])) * 32767; }
      on(e.playbackTime, b);
    };
    return {start: function (f) { on = f; }, stop: function (f) { on = null; f(); }};
  });
}
function wav(chunks, frames, rate) {
  var h = new DataView(new ArrayBuffer(44)), s = function (o, t) { for (var i = 0; i < 4; i++) h.setUint8(o + i, t.charCodeAt(i)); };
  s(0, 'RIFF'); h.setUint32(4, 36 + frames * 4, true); s(8, 'WAVE'); s(12, 'fmt '); h.setUint32(16, 16, true); h.setUint16(20, 1, true); h.setUint16(22, 2, true);
  h.setUint32(24, rate, true); h.setUint32(28, rate * 4, true); h.setUint16(32, 4, true); h.setUint16(34, 16, true); s(36, 'data'); h.setUint32(40, frames * 4, true);
  return new Blob([h].concat(chunks), {type: 'audio/wav'});
}

// ---------- the Performance in the dials ----------
function sha256(buf) {
  if (!window.crypto || !crypto.subtle) return Promise.resolve(null);
  return crypto.subtle.digest('SHA-256', buf.slice(0)).then(function (d) {
    return Array.from(new Uint8Array(d)).map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }, function () { return null; });
}
function decode(buf) {
  graph();
  return new Promise(function (ok, no) { AC.decodeAudioData(buf.slice(0), ok, function () { no(new Error('decode')); }); });
}
function fileOf(url) { var p = String(url || '').split('?')[0].split('/').pop(); return p || 'audio'; }
function candidates(desc) {
  if (desc.only) return desc.only.filter(Boolean);
  var api = window.NCPerform && NCPerform.api, id = desc.id;
  var flac = desc.flac || (id && api ? api + '/api/jobs/' + encodeURIComponent(id) + '/files/performance.flac' : null);
  var mp3 = desc.mp3 || (id && api ? api + '/api/jobs/' + encodeURIComponent(id) + '/files/preview.mp3' : null);
  return [flac, mp3].filter(Boolean);
}
function loadOne(url) {
  return fetch(url).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.arrayBuffer();
  }).then(function (raw) {
    return sha256(raw).then(function (sha) {
      return decode(raw).then(function (buffer) { return {raw: raw, sha: sha, buffer: buffer, url: url, file: fileOf(url)}; });
    });
  });
}
function loadAudio(desc) {
  var urls = candidates(desc), i = 0;
  function next(err) {
    if (i >= urls.length) return Promise.reject(err || new Error('no audio'));
    var url = urls[i++];
    return loadOne(url).catch(next);
  }
  return next();
}
function creditFrom(rec) {
  if (!rec) return 'hosted Perform';
  if (typeof rec.attribution === 'string' && rec.attribution.trim()) return rec.attribution.trim().slice(0, 300);
  var p = rec.performance;
  if (p && typeof p.title === 'string' && p.title.trim()) return p.title.trim().slice(0, 200);
  return 'hosted Perform';
}
function tempoFrom(rec) {
  var n = rec && (typeof rec.bpm === 'number' ? rec.bpm : rec.performance && typeof rec.performance.bpm === 'number' ? rec.performance.bpm : null);
  return n && n > 0 && n < 400 ? n : null;
}
function noteRecord(url) {
  if (!url) return;
  fetch(url).then(function (r) { return r.ok ? r.json() : null; }).then(function (rec) {
    if (!rec || !PERF || PERF.record !== url) return;
    PERF.creditName = creditFrom(rec);
    var bpm = tempoFrom(rec);
    if (bpm) { PERF.bpm = bpm; PERF.tempoSource = 'record'; readouts(); if (G) apply(false); }
    if (TAKE && TAKE.log && TAKE.log.performance && TAKE.log.performance.id === PERF.id) stamp(TAKE.log);
    if (REC && REC.log && REC.log.performance && REC.log.performance.id === PERF.id) stamp(REC.log);
    label();
  }).catch(function () {});
}
function label() {
  if (!PERF) { $('lsrc').textContent = ''; return; }
  var sha = PERF.sha ? PERF.sha.slice(0, 8) : 'no sha yet';
  $('lsrc').textContent = 'Performance ' + PERF.id + ' · ' + (PERF.audioFile || 'audio') + ' · ' + sha;
}
var inflight = null;
function sameUrl(a, b) {
  try { return new URL(a, location.href).href === new URL(b, location.href).href; } catch (e) { return a === b; }
}
function chosenUrl(desc) {
  if (desc.only && desc.only.filter(Boolean).length) return desc.only.filter(Boolean)[0];
  if (desc.mp3) return desc.mp3;
  var a = player();
  if (a.getAttribute('src')) return a.getAttribute('src');
  var urls = candidates(desc);
  return urls.length ? urls[urls.length - 1] : '';
}
function rememberSha(url, id) {
  fetch(url).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.arrayBuffer();
  }).then(sha256).then(function (sha) {
    if (!sha || !PERF || PERF.id !== id || PERF.audioUrl !== url) return;
    PERF.sha = sha; label();
    if (TAKE && TAKE.log && TAKE.log.performance && TAKE.log.performance.id === id) stamp(TAKE.log);
    if (REC && REC.log && REC.log.performance && REC.log.performance.id === id) stamp(REC.log);
  }).catch(function () {});
}
function open(desc) {
  if (!desc || !desc.id) return Promise.resolve(false);
  var id = String(desc.id);
  var url = chosenUrl(desc);
  if (PERF && PERF.id === id && !desc.force && player().getAttribute('src') && EL && EL.mediaElement === player()) { $('live').hidden = false; label(); buttons(); return Promise.resolve(true); }
  if (!url) {
    $('live').hidden = true;
    var missing = 'This Performance came back, but its audio did not load into the player.';
    status(missing);
    if (window.NCPerform && NCPerform.audioMiss) NCPerform.audioMiss(missing);
    return Promise.resolve(false);
  }
  var my = ++openGen;
  stopAudio(); clearTake(); LOG = null; $('llog').hidden = true; $('lconflict').hidden = true;
  resetDials();
  PERF = {id: id, buffer: null, sha: desc.sha || null, audioUrl: url, audioFile: fileOf(url),
    record: desc.record || null, bpm: 60, tempoSource: '60 BPM', creditName: 'hosted Perform'};
  mount(url);
  var a = player();
  a.loop = $('lloop').checked;
  if (my !== openGen) return Promise.resolve(false);
  $('live').hidden = false;
  if (a.error) retryAudio(a);
  label(); noteRecord(PERF.record); rememberSha(url, id); buttons();
  status('');
  return Promise.resolve(true);
}
function hide() {
  openGen++; inflight = null; takeGen++;
  if (REC) { var R = REC; REC = null; R.stopping = true; if (R.T) R.T.stop(function () {}); }
  stopAudio(); clearTake(); LOG = null; PENDING = null; PERF = null;
  $('llog').hidden = true; $('lconflict').hidden = true; $('live').hidden = true;
  resetDials(); buttons();
}
function resetDials() {
  if (window.NCStack) NCStack.reset();
  else if ($('lcut') && $('ltime')) { $('lcut').value = 0; $('ltime').value = '0.75'; $('lfb').value = 35; $('lmix').value = 0; }
  $('lloop').checked = true;
  var a = player(); if (a) a.loop = true;
  readouts();
  if (G && G.api) replaceAudio();
}

// ---------- play the Performance through the dials ----------
function later(at, f) { var my = gen; timers.push(setTimeout(function () { if (my === gen) f(); }, Math.max(0, (at - AC.currentTime) * 1000))); }   // at: AudioContext time
function haltSources(when) {
  sources.forEach(function (s) { try { s.onended = null; s.stop(when || 0); } catch (e) {} });
  sources = []; SRC = null;
  pausePlayer();
}
function start(follow) {
  if (!PERF || !player().getAttribute('src')) { status('A Performance has to load before these dials can play.'); return; }
  stopAudio(); route(); AC.resume(); if (window.NC && NC.stop) NC.stop();
  FOLLOW = !!(follow && LOG); OVERRIDE = {};
  if (FOLLOW) restoreInitial();
  gen++; armFollow = FOLLOW; apply(true); playPlayer(true);
  $('lreplay').textContent = FOLLOW ? 'Stop' : '▶ Replay moves';
  status(FOLLOW ? 'Replaying the dial log on this Performance.' : 'Playing this Performance through the dials.');
  buttons();
}
function stopAudio() {
  gen++; armFollow = false; live = false; timers.forEach(clearTimeout); timers = []; haltSources();
  $('lreplay').textContent = '▶ Replay moves'; FOLLOW = false;
}
function stop(msg) { if (REC) { finish(msg); return; } stopAudio(); buttons(); if (msg) status(msg); }

// ---------- replay: drive the dials from an uploaded log, in time with the music ----------
function restoreInitial() {
  var I = LOG.log.initial;
  ['cutoff', 'delay_timing', 'feedback', 'wet'].forEach(function (d) { if (I[d === 'delay_timing' ? 'delay_beats' : d] !== undefined) setDial(d, I[d === 'delay_timing' ? 'delay_beats' : d]); });
  if (typeof I.loop === 'boolean') { $('lloop').checked = I.loop; player().loop = I.loop; }
  readouts(); apply(true);
}
function scheduleMoves() {
  LOG.log.events.forEach(function (ev) {
    later(T0 + ev.t, function () {
      if (ev.dial) {
        if (OVERRIDE[ev.dial]) return;
        setDial(ev.dial, ev.dial === 'delay_timing' ? ev.beats : ev.value); readouts(); apply(false); flash(ev.dial); logEvent(dialEvent(ev.dial));
      } else if (ev.event === 'loop') { $('lloop').checked = ev.value; player().loop = ev.value; logEvent({event: 'loop', value: ev.value}); }
      else if (ev.event === 'stop') { if (REC) finish('Replay finished; the take is ready.'); else stop('Replay finished. The dials stay where the log left them.'); }
    });
  });
}
function flash(d) { var e = $(DIALS[d]).closest('.dial'); e.classList.add('auto'); clearTimeout(e._t); e._t = setTimeout(function () { e.classList.remove('auto'); }, 250); }

// ---------- record: the wet take (WAV) + a dial log ----------
function freshLog(follow) {
  return {
    nc_live_log_version: LOG_VERSION, kind: 'netcomposer live take (dial log)', started_at: new Date().toISOString(),
    t_unit: 's, from the start of the Performance audio',
    performance: {id: PERF.id, record_url: PERF.record, audio_url: PERF.audioUrl, audio_sha256: PERF.sha, audio_file: PERF.audioFile},
    credits: [{role: 'performance', name: PERF.creditName, link: PERF.record, license: 'CC-BY-SA-4.0', record_id: PERF.id, audio_sha256: PERF.sha}],
    playback: {bpm: PERF.bpm, tempo_source: PERF.tempoSource, quarter_s: +beatS().toFixed(4), pitch_shift: false, time_stretch: false, source: 'page player, then the hack stack'},
    graph: 'player -> hacks, top to bottom -> limiter (-1 dBFS) -> out',
    hacks: {lowpass: {type: 'biquad lowpass, Q 0.707', cutoff_map: '0 = open; v in 1..100 -> 20000 * (150/20000)^(v/100) Hz'}, delay: {timing_unit: 'quarter note of this Performance (60 BPM until the record names a tempo)', feedback_max: 0.9, mix: 'equal-power'}, plate: {kind: 'Dattorro plate, JAES 1997', predelay_s: '0..0.2', size: '0.5 is the paper size', mix: 'equal-power, default silent'}, limiter: {fixed: true, ceiling_db: -1, lookahead_s: 0.0015}},
    performer: 'human', based_on: follow ? {file: LOG.name, started_at: LOG.log.started_at || null} : null,
    initial: settings(), events: [], audio: null, license: 'CC BY-SA 4.0'};
}
function stamp(log) {
  if (!log || !PERF) return log;
  log.performance.audio_sha256 = PERF.sha; log.performance.record_url = PERF.record;
  log.playback.bpm = PERF.bpm; log.playback.tempo_source = PERF.tempoSource; log.playback.quarter_s = +beatS().toFixed(4);
  if (log.credits && log.credits[0]) { log.credits[0].name = PERF.creditName; log.credits[0].link = PERF.record; log.credits[0].audio_sha256 = PERF.sha; }
  return log;
}
function record() {
  if (REC) { finish('Stopped. The take is ready.'); return; }
  if (!PERF || !player().getAttribute('src')) { status('A Performance has to load before a take can be recorded.'); return; }
  graph(); AC.resume();
  $('lrec').disabled = true; status('Getting the recorder ready…');
  tap().then(function (T) {
    var follow = FOLLOW; clearTake(); start(follow);   // t = 0 is the start of this Performance's audio
    REC = {T: T, chunks: [], frames: 0, firstT: null, log: freshLog(follow)};
    var R = REC;
    T.start(function (t, b) { if (REC !== R) return; if (R.firstT === null) R.firstT = t; R.chunks.push(b); R.frames += b.length / 2; });
    later(T0 + MAX_TAKE_S, function () { finish('Ten minutes is the limit for one take; it is ready.'); });
    $('lrec').textContent = '■ Stop'; $('lrec').classList.add('on'); status('Recording this Performance.'); buttons();
  }).catch(function () { buttons(); status('This browser cannot record here. Try again in a moment.'); });
}
function now() { return +(Math.max(0, AC.currentTime - T0)).toFixed(3); }
function logEvent(ev) {
  if (!REC || REC.stopping) return; ev = Object.assign({t: now()}, ev);
  var E = REC.log.events, last = E[E.length - 1];
  if (last && ev.dial && last.dial === ev.dial && ev.t - last.t < 0.04) E[E.length - 1] = ev; else E.push(ev);   // coalesce a drag to ~25 events/s per dial
}
var takeGen = 0;
function finish(msg) {
  if (!REC || REC.stopping) return; var R = REC, my = ++takeGen; R.stopping = true;
  var end = now(); stamp(R.log); R.log.events.push({t: end, event: 'stop'});
  gen++; timers.forEach(clearTimeout); timers = []; haltSources(AC.currentTime + 0.05);
  status('Letting the delay ring out…');
  setTimeout(function () {
    R.T.stop(function () {
      if (my !== takeGen) return;
      var rate = AC.sampleRate, blob = wav(R.chunks, R.frames, rate), dur = R.frames / rate;
      stamp(R.log);
      R.log.audio = {file: 'take.wav', mime: 'audio/wav', encoding: 'PCM 16-bit stereo', bytes: blob.size, sample_rate: rate,
                     starts_at_t: R.firstT === null ? -LEAD_S : +(R.firstT - T0).toFixed(4), music_ends_at_t: end, tail_s: TAIL_S, duration_s: +dur.toFixed(3)};
      TAKE = {blob: blob, log: R.log, url: URL.createObjectURL(blob)}; REC = null;
      $('ltakeaudio').src = TAKE.url; $('ltake').hidden = false;
      $('ltakemeta').textContent = 'Take · ' + Math.round(dur) + ' s · ' + R.log.events.filter(function (e) { return e.dial; }).length + ' dial moves · WAV · CC BY-SA 4.0';
      stopAudio(); buttons(); status(msg || 'The take is ready: listen, Download, or Clear.');
    });
  }, TAIL_S * 1000);
  $('lrec').textContent = '● Record'; $('lrec').classList.remove('on'); buttons();
}
function cancel() {
  if (!REC) return; var R = REC; takeGen++; REC = null; R.chunks = []; R.T.stop(function () {});
  stopAudio(); $('lrec').textContent = '● Record'; $('lrec').classList.remove('on'); buttons(); status('Take cancelled. Nothing was kept.');
}
function clearTake() { if (TAKE) URL.revokeObjectURL(TAKE.url); TAKE = null; $('ltake').hidden = true; $('ltakeaudio').removeAttribute('src'); buttons(); }
function slug() { return String(PERF && PERF.id || 'take').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'take'; }
function save(name, blob) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
function download() {
  if (!TAKE) return; var base = slug();
  TAKE.log.audio.file = base + '.live.wav';
  save(base + '.live.wav', TAKE.blob);
  setTimeout(function () { save(base + '.live.dials.json', new Blob([JSON.stringify(TAKE.log, null, 1) + '\n'], {type: 'application/json'})); }, 300);
  status('Downloaded the WAV and its dial log. The log names this Performance.');
}

// ---------- upload a dial log: check it, restore, offer replay ----------
function num(x, lo, hi) { return typeof x === 'number' && isFinite(x) && x >= lo && x <= hi; }
function clip(x, n) { return typeof x === 'string' ? x.slice(0, n) : null; }
function validate(o) {   // -> {log, dropped, notes}; throws a plain-words message
  if (!o || typeof o !== 'object' || Array.isArray(o)) throw 'it is not a dial log (expected a JSON object)';
  if (o.nc_live_log_version === '0.2' || o.nc_live_log_version === '0.1' || (o.composition && !o.performance)) throw 'it rides a Composition sketch. Live now rides a finished Performance, so this log cannot play here';
  if (typeof o.nc_live_log_version !== 'string') throw 'it has no nc_live_log_version, so it is not a Live dial log';
  if (!o.performance || typeof o.performance !== 'object' || o.performance.id == null || String(o.performance.id).trim() === '') throw 'it does not name a Performance';
  if (!Array.isArray(o.events)) throw 'it has no events list';
  var I = o.initial && typeof o.initial === 'object' ? o.initial : {}, init = {}, notes = [], dropped = 0, ev = [];
  if (num(I.cutoff, 0, 100)) init.cutoff = I.cutoff;
  if (num(I.delay_beats, 0.0625, 8)) init.delay_beats = I.delay_beats;
  if (num(I.feedback, 0, 0.9)) init.feedback = I.feedback;
  if (num(I.wet, 0, 1)) init.wet = I.wet;
  if (typeof I.loop === 'boolean') init.loop = I.loop;
  if (o.nc_live_log_version !== LOG_VERSION) notes.push('version ' + o.nc_live_log_version + ' is not ' + LOG_VERSION);
  var sha = typeof o.performance.audio_sha256 === 'string' && /^[0-9a-f]{64}$/i.test(o.performance.audio_sha256) ? o.performance.audio_sha256.toLowerCase() : null;
  if (!sha) notes.push('no audio sha, so a match cannot be checked');
  var perf = {id: String(o.performance.id).slice(0, 200), record_url: clip(o.performance.record_url, 2000), audio_url: clip(o.performance.audio_url, 2000), audio_sha256: sha, audio_file: clip(o.performance.audio_file, 300)};
  o.events.slice(0, 200000).forEach(function (e) {
    if (!e || !num(e.t, 0, 7200)) { dropped++; return; }
    if (e.dial === 'cutoff' && num(e.value, 0, 100)) ev.push({t: e.t, dial: 'cutoff', value: e.value});
    else if ((e.dial === 'feedback' && num(e.value, 0, 0.9)) || (e.dial === 'wet' && num(e.value, 0, 1))) ev.push({t: e.t, dial: e.dial, value: e.value});
    else if (e.dial === 'delay_timing' && num(e.beats, 0.0625, 8)) ev.push({t: e.t, dial: 'delay_timing', beats: e.beats});
    else if (e.event === 'loop' && typeof e.value === 'boolean') ev.push({t: e.t, event: 'loop', value: e.value});
    else if (e.event === 'stop') ev.push({t: e.t, event: 'stop'});
    else dropped++;
  });
  if (o.events.length > 200000) { dropped += o.events.length - 200000; }
  ev.sort(function (a, b) { return a.t - b.t; });
  var stops = ev.filter(function (e) { return e.event === 'stop'; }); if (stops.length > 1) ev = ev.filter(function (e) { return e.event !== 'stop' || e === stops[0]; }).filter(function (e) { return e.t <= stops[0].t; });
  if (!ev.some(function (e) { return e.dial; })) notes.push('it has no dial moves, only starting positions');
  return {log: {initial: init, events: ev, performance: perf, started_at: typeof o.started_at === 'string' ? o.started_at : null}, dropped: dropped, notes: notes};
}
function shaMatches(P) { return !P.audio_sha256 || !PERF || !PERF.sha || P.audio_sha256 === PERF.sha; }
function upload(f) {
  if (!f) return;
  if (f.size > MAX_LOG_BYTES) { status('That file is too big for a dial log (over 5 MB).'); return; }
  f.text().then(function (txt) {
    var V; try { V = validate(JSON.parse(txt)); } catch (e) { status('Could not use ' + f.name + ': ' + (e instanceof SyntaxError ? 'it is not valid JSON' : e) + '.'); return; }
    var L = {log: V.log, name: f.name, dropped: V.dropped, notes: V.notes}, P = V.log.performance;
    if (PERF && PERF.id === P.id) {
      if (!shaMatches(P)) { status('This dial log names this Performance, but the audio does not match, so the moves were not applied.'); return; }
      useLog(L); return;
    }
    PENDING = L;
    $('lconflictmsg').textContent = 'This dial log rides Performance ' + P.id + '. Load that Performance?';
    $('lconflict').hidden = false; $('lloadperf').focus(); status('Your call: load that Performance?');
  });
}
function loadPending() {
  if (!PENDING) return;
  var L = PENDING, P = L.log.performance; PENDING = null; $('lconflict').hidden = true;
  if (!P.audio_url && !P.id) { status('That Performance is no longer reachable, so this dial log cannot play.'); return; }
  status('Loading that Performance…');
  open({id: P.id, only: P.audio_url ? [P.audio_url] : null, record: P.record_url, sha: P.audio_sha256, force: true}).then(function (ok) {
    if (!ok || !PERF || PERF.id !== P.id) { status('That Performance is no longer reachable, so this dial log cannot play.'); return; }
    if (P.audio_sha256 && PERF.sha && P.audio_sha256 !== PERF.sha) { status('That Performance loaded, but its audio does not match this dial log, so the moves were not applied.'); return; }
    useLog(L);
  });
}
function useLog(L) {
  stop(); PENDING = null; $('lconflict').hidden = true;
  LOG = L; restoreInitial();
  var moves = L.log.events.filter(function (e) { return e.dial; }).length, end = L.log.events.filter(function (e) { return e.event === 'stop'; })[0];
  $('llog').hidden = false;
  $('llogmeta').textContent = L.name + ' · ' + moves + ' dial moves' + (end ? ' over ' + Math.round(end.t) + ' s' : '') + ' · Performance ' + L.log.performance.id +
    (L.dropped ? ' · ' + L.dropped + ' unreadable entries skipped' : '') + (L.notes.length ? ' · ' + L.notes.join('; ') : '');
  buttons(); status('Dial log loaded. The dials are at its starting positions. Press Replay moves.');
}
function forget() { if (FOLLOW) stop(); LOG = null; $('llog').hidden = true; $('lup').value = ''; buttons(); status('Dial log put away. The dials are yours.'); }

// ---------- Keep: the same chain, offline, so the file matches the dials ----------
function pcmWav(buffer) {
  var rate = buffer.sampleRate, n = buffer.length, L = buffer.getChannelData(0);
  var R = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : L, chunks = [], step = 4096, i, k, len, b, l, r;
  for (i = 0; i < n; i += step) {
    len = Math.min(step, n - i);
    b = new Int16Array(len * 2);
    for (k = 0; k < len; k++) {
      l = L[i + k]; r = R[i + k];
      l = l > 1 ? 1 : l < -1 ? -1 : l; r = r > 1 ? 1 : r < -1 ? -1 : r;
      b[2 * k] = l * 32767; b[2 * k + 1] = r * 32767;
    }
    chunks.push(b);
  }
  return wav(chunks, n, rate);
}
function render() {
  if (!PERF || !PERF.audioUrl) return Promise.reject(new Error('no audio'));
  var S = settings();
  graph();
  var list = chain();
  return G.ready.then(function () {
    return fetch(PERF.audioUrl);
  }).then(function (res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.arrayBuffer();
  }).then(function (raw) {
    return decode(raw);
  }).then(function (buffer) {
    var rate = buffer.sampleRate;
    var tail = Math.max(tailFor(list), Math.min(8, Math.max(1.5, (S.delay_s || 0) * 8)));
    var length = Math.ceil((buffer.duration + tail) * rate);
    var off = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, length, rate);
    var src = off.createBufferSource();
    src.buffer = buffer;
    return NCHacks.attach(off, {widgets: list, immediate: true}).then(function (api) {
      src.connect(api.node);
      api.node.connect(off.destination);
      src.start(0);
      return off.startRendering();
    });
  }).then(function (rendered) {
    var blob = pcmWav(rendered);
    return blob.arrayBuffer().then(function (raw) {
      return sha256(raw).then(function (sha) { return {blob: blob, dials: S, chain: list, sha256: sha}; });
    });
  });
}

// ---------- wire up ----------
function status(t) { $('lstatus').textContent = t; }
function buttons() {
  var has = !!(PERF && player().getAttribute('src'));
  $('lrec').disabled = !has || !!(REC && REC.stopping);
  $('lcancel').disabled = !REC || REC.stopping; $('lclear').disabled = !TAKE || !!REC; $('ldl').disabled = !TAKE || !!REC;
  $('lreplay').disabled = !has || !LOG || !!REC; $('lup').disabled = !!REC; $('lforget').disabled = !!REC;
}
$('lreplay').onclick = function () { if (live && FOLLOW) stop('Stopped.'); else start(true); };
$('lrec').onclick = record; $('lcancel').onclick = cancel; $('lclear').onclick = function () { clearTake(); status('Take cleared.'); }; $('ldl').onclick = download;
$('lup').onchange = function () { upload(this.files[0]); this.value = ''; };
$('lloadperf').onclick = function () { loadPending(); };
$('lconfcancel').onclick = function () { PENDING = null; $('lconflict').hidden = true; status('Nothing loaded.'); };
$('lforget').onclick = forget;
if (window.NCStack) NCStack.install({
  onDial: function (d) {
    if (AC && AC.state === 'suspended') AC.resume();
    if (FOLLOW && !OVERRIDE[d]) { OVERRIDE[d] = true; status('You took over ' + d.replace('_', ' ') + '; the log keeps the other dials.'); }
    readouts(); apply(false); logEvent(dialEvent(d));
  },
  onChange: function () {
    if (AC && AC.state === 'suspended') AC.resume();
    readouts(); apply(false);
  }
});
$('lloop').addEventListener('change', function () {
  player().loop = $('lloop').checked;
  logEvent({event: 'loop', value: $('lloop').checked});
});
$('play').addEventListener('click', function () { if (live || !player().paused) stop('The preview took over.'); });
readouts(); buttons();
window.NCLive = {settings: settings, cutoffHz: cutoffHz, validate: validate, open: open, hide: hide, level: level, bands: bands, prime: prime, render: render,
  adjusted: adjusted, chain: chain, applyChain: applyChain, scheduleClips: scheduleClips, stopClips: stopClips, renderBuffers: renderBuffers,
  cpu: function () { return window.__hackCpu || null; },
  playing: playing,
  ready: function () { graph(); return G.ready; },
  clipPlays: function () { return clipPlays; },
  performanceId: function () { return PERF && PERF.id; },
  player: function () { return player(); },
  take: function () { return TAKE && {bytes: TAKE.blob.size, log: TAKE.log}; }, recording: function () { return !!REC; },
  log: function () { return LOG && {name: LOG.name, events: LOG.log.events.length, initial: LOG.log.initial}; }, following: function () { return FOLLOW; }, clock: function () { return AC && live ? AC.currentTime - T0 : null; }, overrides: function () { return Object.assign({}, OVERRIDE); }};
})();
