// A narrow oscilloscope (56 px) in the limiter widget: the sound after the limiter, as it leaves for the speakers.
// It only draws while something plays and the page is visible. Otherwise it rests as a flat line.
// Faint bar along the top: how hard the limiter is pulling down right now (0 to 12 dB).
(function () {
  'use strict';
  // Bright green trace (#00e676); the ceiling guides and gain-reduction bar stay faint grey so the trace stands out.
  var INK = '#00e676', FAINT = '#c8c8c8', GUIDE = '#eee';
  var src = null, buf = null, raf = 0, running = false, gr = 1, grShown = 0;

  function canvas() { return document.getElementById('hack-scope'); }
  function fit(c) {
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(1, Math.round(c.clientWidth * dpr));
    var h = Math.max(1, Math.round(c.clientHeight * dpr));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    return dpr;
  }
  function frame(data) {
    var c = canvas();
    if (!c || !c.clientWidth) return;
    var dpr = fit(c);
    var g = c.getContext('2d');
    var w = c.width, h = c.height, mid = h / 2;
    g.clearRect(0, 0, w, h);
    // The −1 dBFS ceiling, faint.
    var ceil = 0.8912509381337456 * (mid - dpr);
    g.fillStyle = GUIDE;
    g.fillRect(0, Math.round(mid - ceil), w, dpr);
    g.fillRect(0, Math.round(mid + ceil), w, dpr);
    if (grShown > 0.05) {
      g.fillStyle = FAINT;
      g.fillRect(0, 0, Math.round(w * Math.min(1, grShown / 12)), Math.max(1, Math.round(2 * dpr)));
    }
    g.fillStyle = INK;
    if (!data) { g.fillRect(0, Math.round(mid - 0.5 * dpr), w, Math.max(1, Math.round(1.5 * dpr))); return; }
    // Start on a rising zero crossing so a steady tone holds still, then draw half the buffer.
    var n = data.length, half = n >> 1, start = 0, i;
    for (i = 1; i < half; i++) if (data[i - 1] < 0 && data[i] >= 0) { start = i; break; }
    var per = half / w, x, a, b, lo, hi, v, y0, y1;
    for (x = 0; x < w; x++) {
      a = start + Math.floor(x * per);
      b = start + Math.max(Math.floor((x + 1) * per), Math.floor(x * per) + 1);
      lo = 1; hi = -1;
      for (i = a; i < b && i < n; i++) { v = data[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
      if (hi < lo) continue;
      y0 = Math.round(mid - hi * (mid - dpr));
      y1 = Math.round(mid - lo * (mid - dpr));
      g.fillRect(x, y0 - Math.round(0.5 * dpr), 1, Math.max(Math.round(1.75 * dpr), y1 - y0 + Math.round(dpr)));
    }
  }
  function tick() {
    raf = 0;
    if (!src || document.hidden || !src.playing()) { stop(); return; }
    var an = src.analyser();
    if (!an) { stop(); return; }
    if (!buf || buf.length !== an.fftSize) buf = new Float32Array(an.fftSize);
    an.getFloatTimeDomainData(buf);
    var db = gr < 1 ? -20 * Math.log10(gr > 1e-6 ? gr : 1e-6) : 0;
    grShown = db > grShown ? db : grShown * 0.9;
    gr = 1;
    frame(buf);
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    grShown = 0;
    frame(null);
    if (running && src && src.gain) src.gain(false);
    running = false;
  }
  function wake() {
    if (!src || raf || document.hidden || !src.playing()) return;
    if (!running && src.gain) src.gain(true);
    running = true;
    raf = requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else wake(); });
  window.addEventListener('resize', function () { if (!raf) frame(null); });
  window.NCScope = {
    // s: {analyser(): AnalyserNode|null, playing(): bool, gain(on): void}
    attach: function (s) { src = s; frame(null); wake(); },
    wake: wake,
    stop: stop,
    gr: function (g) { if (g < gr) gr = g; },
    running: function () { return !!raf; }
  };
  if (document.readyState !== 'loading') frame(null);
  else document.addEventListener('DOMContentLoaded', function () { frame(null); });
})();
