// NetComposer /create/ Live: play the Composition in a loop and ride two hacks by hand, a low-pass filter and a delay.
// Record keeps the wet take as a WAV file and a time-coded log of every dial move. Upload a dial log to restore and replay a take's moves.
// Everything runs in this page (Web Audio). Nothing is uploaded anywhere.
// Graph: chord strikes -> input -> low-pass -> dry --------------------------> master -> speakers
//                                          \-> delay <-> feedback; delay -> wet -/      \-> tap (WAV recorder)
(function () {
'use strict';
var $ = function (id) { return document.getElementById(id); };
var PREVIEW_TEMPO = 2, TAIL_S = 3, LEAD_S = 0.15, MAX_TAKE_S = 600, MAX_LOG_BYTES = 5e6, LOG_VERSION = '0.2';
var DIALS = {cutoff: 'lcut', delay_timing: 'ltime', feedback: 'lfb', wet: 'lmix'};
var AC = null, G = null, live = false, gen = 0, T0 = 0, nextAt = 0, pass = 0, timers = [], sources = [];
var REC = null;     // a take in progress: {log, frames, chunks, firstT, stopping}
var TAKE = null;    // the finished take: {blob, log, url}
var LOG = null;     // an uploaded dial log: {log, name}
var FOLLOW = false, OVERRIDE = {}, PENDING = null;

// ---------- dial semantics ----------
function cutoffHz(v) { return v <= 0 ? null : Math.round(20000 * Math.pow(150 / 20000, v / 100)); }   // 0 = fully open (no filtering), 100 = 150 Hz
function bpm() { var m = /(\d+(?:\.\d+)?)\s*BPM/i.exec($('comp').value + ' ' + $('perf').value); return m ? +m[1] : 60; }
function beatS() { return 60 / (bpm() * PREVIEW_TEMPO * (+$('spd').value || 1)); }   // one quarter note at the preview tempo
function delayS() { return Math.min(4.9, +$('ltime').value * beatS()); }
function fmtHz(h) { return h === null ? 'open' : h >= 1000 ? (h / 1000).toFixed(h >= 10000 ? 0 : 1) + ' kHz' : h + ' Hz'; }
function readouts() {
  $('lcutv').textContent = fmtHz(cutoffHz(+$('lcut').value));
  $('ltimev').textContent = Math.round(delayS() * 1000) + ' ms';
  $('lfbv').textContent = $('lfb').value + '%';
  $('lmixv').textContent = $('lmix').value + '% wet';
}
function settings() {
  var o = $('ltime').options[$('ltime').selectedIndex];
  return {cutoff: +$('lcut').value, cutoff_hz: cutoffHz(+$('lcut').value), delay_timing: o.textContent, delay_beats: +o.value, delay_s: +delayS().toFixed(4),
          feedback: +$('lfb').value / 100, wet: +$('lmix').value / 100, loop: $('lloop').checked};
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
  if (d === 'cutoff') $('lcut').value = Math.round(v);
  else if (d === 'feedback') $('lfb').value = Math.round(v * 100);
  else if (d === 'wet') $('lmix').value = Math.round(v * 100);
  else if (d === 'delay_timing') setTiming(v);
}

// ---------- the audio graph ----------
function graph() {
  if (G) return G;
  AC = new (window.AudioContext || window.webkitAudioContext)();
  G = {input: AC.createGain(), lp: AC.createBiquadFilter(), dry: AC.createGain(), delay: AC.createDelay(5), fb: AC.createGain(), wet: AC.createGain(), master: AC.createGain(), sink: AC.createGain()};
  G.lp.type = 'lowpass'; G.lp.Q.value = 0.707; G.master.gain.value = 0.8; G.sink.gain.value = 0;
  G.input.connect(G.lp); G.lp.connect(G.dry); G.dry.connect(G.master);
  G.lp.connect(G.delay); G.delay.connect(G.fb); G.fb.connect(G.delay); G.delay.connect(G.wet); G.wet.connect(G.master);
  G.master.connect(AC.destination); G.sink.connect(AC.destination);
  apply(true); return G;
}
function apply(now) {
  if (!G) return; var t = AC.currentTime, k = now ? 0.001 : 0.02, S = settings();
  G.lp.frequency.setTargetAtTime(S.cutoff_hz === null ? AC.sampleRate / 2 : S.cutoff_hz, t, k);
  G.delay.delayTime.setTargetAtTime(S.delay_s, t, now ? 0.001 : 0.08);
  G.fb.gain.setTargetAtTime(S.feedback, t, k);
  G.dry.gain.setTargetAtTime(Math.cos(S.wet * Math.PI / 2), t, k); G.wet.gain.setTargetAtTime(Math.sin(S.wet * Math.PI / 2), t, k);   // equal-power wet/dry
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
  if (AC.audioWorklet && window.AudioWorkletNode) {
    TAP = AC.audioWorklet.addModule(URL.createObjectURL(new Blob([TAP_SRC], {type: 'application/javascript'}))).then(function () {
      var n = new AudioWorkletNode(AC, 'nc-tap', {numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2], channelCount: 2, channelCountMode: 'explicit'}), on = null, done = null;
      G.master.connect(n); n.connect(G.sink);
      n.port.onmessage = function (e) { if (e.data.done) { if (done) done(); } else if (on) on(e.data.t, e.data.b); };
      return {start: function (f) { on = f; n.port.postMessage('start'); }, stop: function (f) { done = function () { on = null; done = null; f(); }; n.port.postMessage('stop'); }};
    });
  } else {   // older browsers
    TAP = Promise.resolve().then(function () {
      var n = AC.createScriptProcessor(4096, 2, 2), on = null; G.master.connect(n); n.connect(G.sink);
      n.onaudioprocess = function (e) {
        if (!on) return; var L = e.inputBuffer.getChannelData(0), R = e.inputBuffer.numberOfChannels > 1 ? e.inputBuffer.getChannelData(1) : L, b = new Int16Array(L.length * 2);
        for (var k = 0; k < L.length; k++) { b[2 * k] = Math.max(-1, Math.min(1, L[k])) * 32767; b[2 * k + 1] = Math.max(-1, Math.min(1, R[k])) * 32767; }
        on(e.playbackTime, b);
      };
      return {start: function (f) { on = f; }, stop: function (f) { on = null; f(); }};
    });
  }
  return TAP;
}
function wav(chunks, frames, rate) {
  var h = new DataView(new ArrayBuffer(44)), s = function (o, t) { for (var i = 0; i < 4; i++) h.setUint8(o + i, t.charCodeAt(i)); };
  s(0, 'RIFF'); h.setUint32(4, 36 + frames * 4, true); s(8, 'WAVE'); s(12, 'fmt '); h.setUint32(16, 16, true); h.setUint16(20, 1, true); h.setUint16(22, 2, true);
  h.setUint32(24, rate, true); h.setUint32(28, rate * 4, true); h.setUint16(32, 4, true); h.setUint16(34, 16, true); s(36, 'data'); h.setUint32(40, frames * 4, true);
  return new Blob([h].concat(chunks), {type: 'audio/wav'});
}

// ---------- play, loop ----------
function schedulePass(my) {
  if (my !== gen) return;
  var tl = NC.timeline(); if (!tl) { stop('No chord symbols to play.'); return; }   // read every pass, so edits above land on the next loop
  var speed = PREVIEW_TEMPO * (+$('spd').value || 1), chords = tl.chords, start = nextAt, len = tl.L / speed, n = ++pass;
  NC.audition(AC, chords).then(function (clips) {
    if (my !== gen) return;
    if (n === 1) NC.showSources(clips);
    if (REC && n === 1) { var cr = NC.creditsFor(clips); REC.log.credits = cr.credits; REC.log.license = cr.license; REC.log.sounds = cr.files; }
    chords.forEach(function (c, i) {
      var t = start + c.t / speed, d = c.dur / speed, buf = clips[i].buffer;
      if (!buf) c.voicing.forEach(function (m) {
        var o = AC.createOscillator(), gn = AC.createGain(); o.type = 'sine'; o.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
        gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(0.12 / c.voicing.length * 2, t + 0.4); gn.gain.setTargetAtTime(0, t + d - 0.6, 0.4);
        o.connect(gn); gn.connect(G.input); o.start(t); o.stop(t + d + 2); sources.push(o);
      });
      if (buf) [0, d / 2].forEach(function (off, k) {
        if (off && d < 1) return;
        var s = AC.createBufferSource(), g = AC.createGain(); s.buffer = buf;
        g.gain.setValueAtTime(k ? 0.45 : 0.8, t + off); g.gain.setTargetAtTime(0, t + Math.min(d + 1.5, off + buf.duration) - 0.8, 0.35);
        s.connect(g); g.connect(G.input); s.start(Math.max(AC.currentTime, t + off)); sources.push(s);
      });
      later(t, function () { document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); }); var e = $('ch' + i); if (e) e.classList.add('on'); });
    });
    later(start, function () { if (n > 1) { logEvent({event: 'pass', n: n}); if (REC) status('Recording, pass ' + n + '. Press Stop when you are done.'); } });
    nextAt = start + len;
    later(nextAt - 1.0, function () {
      if ($('lloop').checked) schedulePass(my);
      else later(nextAt, function () { REC ? finish('The Composition ended; the take is ready.') : stop('Played through once. Turn Loop on to keep going.'); });
    });
    if (n === 1) status(REC ? 'Recording' + (FOLLOW ? ' the replay' : '') + '. Press Stop when you are done.' : FOLLOW ? 'Replaying the logged moves. Touch a dial to take it over.' :
      'Playing' + ($('lloop').checked ? ' in a loop' : '') + '. Ride the dials; press Record when you are ready.');
  }).catch(function (e) { stop('Could not load the chords (' + (e && e.message || e) + ').'); });
}
function later(at, f) { var my = gen; timers.push(setTimeout(function () { if (my === gen) f(); }, Math.max(0, (at - AC.currentTime) * 1000))); }   // at: AudioContext time
function start(follow) {
  stopAudio(); graph(); AC.resume(); NC.stop();
  FOLLOW = !!(follow && LOG); OVERRIDE = {};
  if (FOLLOW) restoreInitial();
  gen++; live = true; pass = 0; T0 = AC.currentTime + LEAD_S; nextAt = T0; apply(true);
  if (FOLLOW) scheduleMoves();
  $('lplay').textContent = 'Stop'; $('lreplay').textContent = FOLLOW ? 'Stop' : '▶ Replay moves';
  status('Loading chord recordings…'); schedulePass(gen); buttons();
}
function stopAudio() {
  gen++; live = false; timers.forEach(clearTimeout); timers = [];
  sources.forEach(function (s) { try { s.stop(); } catch (e) {} }); sources = [];
  document.querySelectorAll('.ch.on').forEach(function (e) { e.classList.remove('on'); });
  $('lplay').textContent = 'Play'; $('lreplay').textContent = '▶ Replay moves'; FOLLOW = false;
}
function stop(msg) { if (REC) { finish(msg); return; } stopAudio(); buttons(); if (msg) status(msg); }

// ---------- replay: drive the dials from an uploaded log, in time with the music ----------
function restoreInitial() {
  var I = LOG.log.initial;
  ['cutoff', 'delay_timing', 'feedback', 'wet'].forEach(function (d) { if (I[d === 'delay_timing' ? 'delay_beats' : d] !== undefined) setDial(d, I[d === 'delay_timing' ? 'delay_beats' : d]); });
  if (typeof I.loop === 'boolean') $('lloop').checked = I.loop;
  readouts(); apply(true);
}
function scheduleMoves() {
  LOG.log.events.forEach(function (ev) {
    later(T0 + ev.t, function () {
      if (ev.dial) {
        if (OVERRIDE[ev.dial]) return;
        setDial(ev.dial, ev.dial === 'delay_timing' ? ev.beats : ev.value); readouts(); apply(false); flash(ev.dial); logEvent(dialEvent(ev.dial));
      } else if (ev.event === 'loop') { $('lloop').checked = ev.value; logEvent({event: 'loop', value: ev.value}); }
      else if (ev.event === 'stop') { if (REC) finish('Replay finished; the take is ready.'); else stop('Replay finished. The dials stay where the log left them.'); }
    });
  });
}
function flash(d) { var e = $(DIALS[d]).closest('.dial'); e.classList.add('auto'); clearTimeout(e._t); e._t = setTimeout(function () { e.classList.remove('auto'); }, 250); }

// ---------- record: the wet take (WAV) + a dial log ----------
function record() {
  if (REC) { finish('Stopped. The take is ready.'); return; }
  graph(); AC.resume();
  $('lrec').disabled = true; status('Getting the recorder ready…');
  tap().then(function (T) {
    var follow = FOLLOW; clearTake(); start(follow);   // a take always starts from the first chord, so t = 0 is the start of the Composition
    var S = NC.state();
    REC = {T: T, chunks: [], frames: 0, firstT: null, log: {
      nc_live_log_version: LOG_VERSION, kind: 'netcomposer live take (dial log)', started_at: new Date().toISOString(), t_unit: 's, from the first chord of pass 1',
      composition: {title: S.t, composer: S.by, words: {composition: S.c, performance: S.p}, chords: (NC.timeline() || {unique: []}).unique, share_url: NC.shareUrl()},
      playback: {preview_tempo: PREVIEW_TEMPO, speed: +$('spd').value, bpm: bpm(), quarter_s: +beatS().toFixed(4), strikes_per_chord: 2, pitch_shift: false, time_stretch: false, source: 'musicmatter.art chord recordings (Petrus, CC BY-SA 4.0); piano from the full chord set where that chord has no recording'},
      graph: 'chord strikes -> low-pass -> (dry + delay with feedback, equal-power wet/dry) -> out',
      hacks: {lowpass: {type: 'biquad lowpass, Q 0.707', cutoff_map: '0 = open; v in 1..100 -> 20000 * (150/20000)^(v/100) Hz'}, delay: {timing_unit: 'quarter note at the preview tempo', feedback_max: 0.9, mix: 'equal-power'}},
      performer: 'human', based_on: follow ? {file: LOG.name, started_at: LOG.log.started_at || null} : null,
      initial: settings(), events: [], audio: null, license: 'CC BY-SA 4.0'}};
    var R = REC;
    T.start(function (t, b) { if (REC !== R) return; if (R.firstT === null) R.firstT = t; R.chunks.push(b); R.frames += b.length / 2; });
    later(T0 + MAX_TAKE_S, function () { finish('Ten minutes is the limit for one take; it is ready.'); });
    $('lrec').textContent = '■ Stop'; $('lrec').classList.add('on'); buttons();
  }).catch(function (e) { buttons(); status('This browser cannot record here (' + (e && e.message || e) + ').'); });
}
function now() { return +(Math.max(0, AC.currentTime - T0)).toFixed(3); }
function logEvent(ev) {
  if (!REC || REC.stopping) return; ev = Object.assign({t: now()}, ev);
  var E = REC.log.events, last = E[E.length - 1];
  if (last && ev.dial && last.dial === ev.dial && ev.t - last.t < 0.04) E[E.length - 1] = ev; else E.push(ev);   // coalesce a drag to ~25 events/s per dial
}
function finish(msg) {
  if (!REC || REC.stopping) return; var R = REC; R.stopping = true;
  var end = now(); R.log.events.push({t: end, event: 'stop'});
  gen++; timers.forEach(clearTimeout); timers = []; sources.forEach(function (s) { try { s.stop(AC.currentTime + 0.05); } catch (e) {} }); sources = [];
  status('Letting the delay ring out…');
  setTimeout(function () {
    R.T.stop(function () {
      var rate = AC.sampleRate, blob = wav(R.chunks, R.frames, rate), dur = R.frames / rate;
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
  if (!REC) return; var R = REC; REC = null; R.chunks = []; R.T.stop(function () {});
  stopAudio(); $('lrec').textContent = '● Record'; $('lrec').classList.remove('on'); buttons(); status('Take cancelled. Nothing was kept.');
}
function clearTake() { if (TAKE) URL.revokeObjectURL(TAKE.url); TAKE = null; $('ltake').hidden = true; $('ltakeaudio').removeAttribute('src'); buttons(); }
function slug() { return (NC.state().t || 'take').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'take'; }
function save(name, blob) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
function download() {
  if (!TAKE) return; var base = slug();
  TAKE.log.audio.file = base + '.live.wav';
  save(base + '.live.wav', TAKE.blob);
  setTimeout(function () { save(base + '.live.dials.json', new Blob([JSON.stringify(TAKE.log, null, 1) + '\n'], {type: 'application/json'})); }, 300);
  status('Downloaded the take (WAV) and its dial log. Upload the dial log later to replay the moves.');
}

// ---------- upload a dial log: check it, restore, offer replay ----------
function num(x, lo, hi) { return typeof x === 'number' && isFinite(x) && x >= lo && x <= hi; }
function validate(o) {   // -> {log, dropped, notes}; throws a plain-words message
  if (!o || typeof o !== 'object' || Array.isArray(o)) throw 'it is not a dial log (expected a JSON object)';
  if (typeof o.nc_live_log_version !== 'string') throw 'it has no nc_live_log_version, so it is not a Live dial log';
  if (!Array.isArray(o.events)) throw 'it has no events list';
  var I = o.initial && typeof o.initial === 'object' ? o.initial : {}, init = {}, notes = [], dropped = 0, ev = [];
  if (num(I.cutoff, 0, 100)) init.cutoff = I.cutoff;
  if (num(I.delay_beats, 0.0625, 8)) init.delay_beats = I.delay_beats;
  if (num(I.feedback, 0, 0.9)) init.feedback = I.feedback;
  if (num(I.wet, 0, 1)) init.wet = I.wet;
  if (typeof I.loop === 'boolean') init.loop = I.loop;
  if (!/^0\./.test(o.nc_live_log_version)) notes.push('version ' + o.nc_live_log_version + ' is newer than this page');
  o.events.slice(0, 200000).forEach(function (e) {
    if (!e || !num(e.t, 0, 7200)) { dropped++; return; }
    if (e.dial === 'cutoff' && num(e.value, 0, 100)) ev.push({t: e.t, dial: 'cutoff', value: e.value});
    else if ((e.dial === 'feedback' && num(e.value, 0, 0.9)) || (e.dial === 'wet' && num(e.value, 0, 1))) ev.push({t: e.t, dial: e.dial, value: e.value});
    else if (e.dial === 'delay_timing' && num(e.beats, 0.0625, 8)) ev.push({t: e.t, dial: 'delay_timing', beats: e.beats});
    else if (e.event === 'loop' && typeof e.value === 'boolean') ev.push({t: e.t, event: 'loop', value: e.value});
    else if (e.event === 'stop') ev.push({t: e.t, event: 'stop'});
    else if (e.event !== 'pass') dropped++;
  });
  if (o.events.length > 200000) { dropped += o.events.length - 200000; }
  ev.sort(function (a, b) { return a.t - b.t; });
  var stops = ev.filter(function (e) { return e.event === 'stop'; }); if (stops.length > 1) ev = ev.filter(function (e) { return e.event !== 'stop' || e === stops[0]; }).filter(function (e) { return e.t <= stops[0].t; });
  var c = o.composition && o.composition.words && typeof o.composition.words.composition === 'string' ? o.composition : null;
  var comp = c ? {t: String(c.title || '').slice(0, 300), by: String(c.composer || '').slice(0, 300), c: c.words.composition.slice(0, 20000), p: String(c.words.performance || '').slice(0, 20000)} : null;
  var sp = o.playback && num(o.playback.speed, 1, 4) ? o.playback.speed : null;
  if (!ev.some(function (e) { return e.dial; })) notes.push('it has no dial moves, only starting positions');
  return {log: {initial: init, events: ev, composition: comp, speed: sp, started_at: typeof o.started_at === 'string' ? o.started_at : null}, dropped: dropped, notes: notes};
}
function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
function upload(f) {
  if (!f) return;
  if (f.size > MAX_LOG_BYTES) { status('That file is too big for a dial log (over 5 MB).'); return; }
  f.text().then(function (txt) {
    var V; try { V = validate(JSON.parse(txt)); } catch (e) { status('Could not use ' + f.name + ': ' + (e instanceof SyntaxError ? 'it is not valid JSON' : e) + '.'); return; }
    var L = {log: V.log, name: f.name, dropped: V.dropped, notes: V.notes}, S = NC.state(), C = V.log.composition;
    if (C && (norm(C.c) !== norm(S.c) || norm(C.p) !== norm(S.p))) {
      PENDING = L; $('lconflictmsg').textContent = 'This dial log was made with a different Composition (' + (C.t || 'untitled') + '). Load its Composition, or keep yours and use only the moves?';
      $('lconflict').hidden = false; $('lusetheirs').focus(); status('Your call: which Composition?'); return;
    }
    useLog(L, C ? 'same' : 'none');
  });
}
function useLog(L, mode) {   // mode: 'same' (page already has its Composition), 'theirs' (load it), 'mine' (keep the page's, moves only), 'none' (log has no Composition)
  stop(); PENDING = null; $('lconflict').hidden = true;
  if (mode === 'theirs') { var C = L.log.composition; NC.pushUndo(); NC.fill({t: C.t, by: C.by, c: C.c, p: C.p}); NC.persist(); }
  if (L.log.speed && mode !== 'mine' && +$('spd').value !== L.log.speed) { $('spd').value = L.log.speed; $('spd').dispatchEvent(new Event('input')); NC.stop(); }
  LOG = L; restoreInitial();
  var moves = L.log.events.filter(function (e) { return e.dial; }).length, end = L.log.events.filter(function (e) { return e.event === 'stop'; })[0];
  var how = {same: 'same Composition as yours', theirs: 'its Composition is loaded (Undo goes back)', mine: 'moves only, on your Composition', none: 'no Composition in the log; playing yours'}[mode];
  $('llog').hidden = false;
  $('llogmeta').textContent = L.name + ' · ' + moves + ' dial moves' + (end ? ' over ' + Math.round(end.t) + ' s' : '') + ' · ' + how +
    (L.dropped ? ' · ' + L.dropped + ' unreadable entries skipped' : '') + (L.notes.length ? ' · ' + L.notes.join('; ') : '');
  buttons(); status('Dial log loaded: the dials are at its starting positions. Press Replay moves to hear it.');
}
function forget() { if (FOLLOW) stop(); LOG = null; $('llog').hidden = true; $('lup').value = ''; buttons(); status('Dial log put away. The dials are yours.'); }

// ---------- wire up ----------
function status(t) { $('lstatus').textContent = t; }
function buttons() {
  var ready = !!(window.NC && NC.catalog && NC.catalog()), has = ready && !!NC.timeline();
  $('lplay').disabled = !has || !!REC; $('lrec').disabled = !has || !!(REC && REC.stopping);
  $('lcancel').disabled = !REC || REC.stopping; $('lclear').disabled = !TAKE || !!REC; $('ldl').disabled = !TAKE || !!REC;
  $('lreplay').disabled = !has || !LOG || !!REC; $('lup').disabled = !!REC; $('lforget').disabled = !!REC;
}
$('lplay').onclick = function () { if (live) stop('Stopped.'); else start(false); };
$('lreplay').onclick = function () { if (live && FOLLOW) stop('Stopped.'); else start(true); };
$('lrec').onclick = record; $('lcancel').onclick = cancel; $('lclear').onclick = function () { clearTake(); status('Take cleared.'); }; $('ldl').onclick = download;
$('lup').onchange = function () { upload(this.files[0]); };
$('lusetheirs').onclick = function () { if (PENDING) useLog(PENDING, 'theirs'); };
$('lkeepmine').onclick = function () { if (PENDING) useLog(PENDING, 'mine'); };
$('lconfcancel').onclick = function () { PENDING = null; $('lconflict').hidden = true; $('lup').value = ''; status('Nothing loaded.'); };
$('lforget').onclick = forget;
Object.keys(DIALS).forEach(function (d) {
  $(DIALS[d]).addEventListener('input', function () {
    if (FOLLOW && !OVERRIDE[d]) { OVERRIDE[d] = true; status('You took over ' + d.replace('_', ' ') + '; the log keeps the other dials.'); }
    readouts(); apply(false); logEvent(dialEvent(d));
  });
});
$('lloop').addEventListener('change', function () { logEvent({event: 'loop', value: $('lloop').checked}); });
$('spd').addEventListener('input', function () { readouts(); apply(false); });
$('play').addEventListener('click', function () { if (live) stop('The preview took over.'); });
['comp', 'perf'].forEach(function (id) { $(id).addEventListener('input', function () { readouts(); buttons(); }); });
readouts();
var w = setInterval(function () { if (document.body.getAttribute('data-ready')) { clearInterval(w); buttons(); } }, 100);
window.NCLive = {settings: settings, cutoffHz: cutoffHz, validate: validate, take: function () { return TAKE && {bytes: TAKE.blob.size, log: TAKE.log}; }, recording: function () { return !!REC; },
  log: function () { return LOG && {name: LOG.name, events: LOG.log.events.length, initial: LOG.log.initial}; }, following: function () { return FOLLOW; }, clock: function () { return AC && live ? AC.currentTime - T0 : null; }, overrides: function () { return Object.assign({}, OVERRIDE); }};
})();
