// The Live hack stack: order is the signal path, top to bottom.
// The limiter stays last. It is not one of the ten movable hacks.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var hooks = { onDial: null, onChange: null };
  var quarter = 1;
  // What people see. The type ids stay as saved (plate is shown as Reverb).
  var LABELS = { lowpass: 'Low-pass filter', highpass: 'High-pass filter', bandpass: 'Band-pass filter', delay: 'Delay', plate: 'Reverb', eq: 'EQ', drive: 'Drive', compressor: 'Compressor', width: 'Width' };
  // EQ v2: shelves at 150 Hz and 6 kHz, ±18 dB, bell Q 0.3..6 on a log dial (40 = Q 1.0).
  var EQ_LOW_HZ = 150, EQ_HIGH_HZ = 6000;
  function eqQ(v) { return +(0.3 * Math.pow(20, v / 100)).toFixed(2); }
  function eqQDial(q) { return Math.round(100 * Math.log(q / 0.3) / Math.log(20)); }
  // High-pass: 0 = off, 1..100 = 20 Hz..2 kHz. Resonance 0..100 = Q 0.71..8.
  function hpHz(v) { return v <= 0 ? null : Math.round(20 * Math.pow(100, v / 100)); }
  function hpDial(hz) { return Math.max(1, Math.round(100 * Math.log(hz / 20) / Math.log(100))); }
  function hpQ(v) { return +(0.7071 * Math.pow(8 / 0.7071, v / 100)).toFixed(3); }
  function hpQDial(q) { return Math.round(100 * Math.log(q / 0.7071) / Math.log(8 / 0.7071)); }
  // Band-pass: centre 100 Hz..8 kHz (53 = about 1 kHz). Q 0.4 (about 3 octaves wide) .. 8 (narrow).
  function bpHz(v) { return Math.round(100 * Math.pow(80, v / 100)); }
  function bpDial(hz) { return Math.round(100 * Math.log(hz / 100) / Math.log(80)); }
  function bpQ(v) { return +(0.4 * Math.pow(20, v / 100)).toFixed(2); }
  function bpQDial(q) { return Math.round(100 * Math.log(q / 0.4) / Math.log(20)); }
  // The first lowpass, delay and plate keep the page's original dial ids (lcut, ltime...). Every other hack gets ids from its own.
  var PRIMARY = { lowpass: 'hack-lp', delay: 'hack-delay', plate: 'hack-plate' };
  // EQ bell 200 Hz to 5 kHz on a log dial, 50 = 1 kHz. Compressor ratio 1:1 to 20:1 on a log dial.
  function midHz(v) { return Math.round(200 * Math.pow(25, v / 100)); }
  function midDial(hz) { return Math.round(100 * Math.log(hz / 200) / Math.log(25)); }
  function ratioOf(v) { return +Math.pow(20, v / 100).toFixed(2); }
  function ratioDial(r) { return Math.round(100 * Math.log(r) / Math.log(20)); }
  function fmtDb(v) { return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' dB'; }

  function stack() { return $('hack-stack'); }
  function arts() {
    var root = stack();
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll('article.hack'));
  }
  function movable() {
    return arts().filter(function (a) { return !a.hasAttribute('data-fixed'); });
  }
  function byId(id) {
    var list = arts(), i;
    for (i = 0; i < list.length; i++) if (list[i].getAttribute('data-id') === id) return list[i];
    return null;
  }
  function field(art, param) { return art.querySelector('[data-param="' + param + '"]'); }
  function outOf(art, param) { return art.querySelector('[data-out="' + param + '"]'); }

  function delayS(beats) { return Math.min(4.9, (+beats || 0) * quarter); }
  function fmtHz(h) {
    if (h == null) return 'open';
    return h >= 1000 ? (h / 1000).toFixed(h >= 10000 ? 0 : 1) + ' kHz' : h + ' Hz';
  }
  function cutoffHz(v) {
    return window.NCLive && NCLive.cutoffHz ? NCLive.cutoffHz(v) : (v <= 0 ? null : Math.round(20000 * Math.pow(150 / 20000, v / 100)));
  }
  function nearestTiming(sel, beats) {
    var o = sel.options, best = 0, i;
    for (i = 1; i < o.length; i++) if (Math.abs(+o[i].value - beats) < Math.abs(+o[best].value - beats)) best = i;
    sel.selectedIndex = best;
  }
  function paramsOf(art) {
    var type = art.getAttribute('data-type');
    if (type === 'lowpass') {
      var c = +field(art, 'cutoff').value;
      return { cutoff: c, cutoff_hz: cutoffHz(c), q: window.NCHacks ? NCHacks.Q : 0.7071067811865476 };
    }
    if (type === 'delay') {
      var sel = field(art, 'delay_beats');
      var opt = sel.options[sel.selectedIndex];
      var beats = +opt.value;
      return {
        delay_beats: beats,
        delay_timing: opt.textContent,
        delay_s: +delayS(beats).toFixed(4),
        feedback: +field(art, 'feedback').value / 100,
        wet: +field(art, 'wet').value / 100
      };
    }
    if (type === 'plate') {
      return {
        predelay: +field(art, 'predelay').value / 1000,
        size: +field(art, 'size').value / 100,
        decay: +field(art, 'decay').value / 100,
        damping: +field(art, 'damping').value / 100,
        mix: +field(art, 'mix').value / 100
      };
    }
    if (type === 'eq') {
      var eqp = {
        low_db: +field(art, 'low_db').value,
        mid_db: +field(art, 'mid_db').value,
        mid_hz: midHz(+field(art, 'mid_hz').value),
        high_db: +field(art, 'high_db').value
      };
      // A stack saved with the first EQ voicing keeps it (no low_hz/high_hz/mid_q, ±12 dB in the DSP).
      if (art.getAttribute('data-voicing') !== '1') {
        eqp.low_hz = EQ_LOW_HZ;
        eqp.high_hz = EQ_HIGH_HZ;
        eqp.mid_q = eqQ(+field(art, 'mid_q').value);
      }
      return eqp;
    }
    if (type === 'highpass') {
      var hc = +field(art, 'cutoff').value;
      return { cutoff: hc, cutoff_hz: hpHz(hc), q: hpQ(+field(art, 'q').value) };
    }
    if (type === 'bandpass') {
      return { centre_hz: bpHz(+field(art, 'centre_hz').value), q: bpQ(+field(art, 'q').value), mix: +field(art, 'mix').value / 100 };
    }
    if (type === 'drive') {
      return {
        drive_db: +field(art, 'drive_db').value,
        output_db: +field(art, 'output_db').value,
        mix: +field(art, 'mix').value / 100
      };
    }
    if (type === 'compressor') {
      return {
        threshold_db: +field(art, 'threshold_db').value,
        ratio: ratioOf(+field(art, 'ratio').value),
        attack_ms: +field(art, 'attack_ms').value,
        release_ms: +field(art, 'release_ms').value,
        makeup_db: +field(art, 'makeup_db').value
      };
    }
    if (type === 'width') {
      return {
        width: +field(art, 'width').value / 100,
        balance: +field(art, 'balance').value / 100
      };
    }
    return {};
  }
  function readouts() {
    arts().forEach(function (art) {
      if (art.hasAttribute('data-fixed')) return;
      var type = art.getAttribute('data-type');
      if (type === 'lowpass') {
        var o = outOf(art, 'cutoff');
        if (o) o.textContent = fmtHz(cutoffHz(+field(art, 'cutoff').value));
      } else if (type === 'delay') {
        var sel = field(art, 'delay_beats');
        var ms = outOf(art, 'delay_beats');
        if (ms) ms.textContent = Math.round(delayS(+sel.value) * 1000) + ' ms';
        var fb = outOf(art, 'feedback');
        if (fb) fb.textContent = field(art, 'feedback').value + '%';
        var wet = outOf(art, 'wet');
        if (wet) wet.textContent = field(art, 'wet').value + '% wet';
      } else if (type === 'plate') {
        var pre = outOf(art, 'predelay');
        if (pre) pre.textContent = field(art, 'predelay').value + ' ms';
        var size = outOf(art, 'size');
        if (size) size.textContent = (0.5 + (+field(art, 'size').value / 100)).toFixed(2) + '×';
        var dec = outOf(art, 'decay');
        if (dec) dec.textContent = field(art, 'decay').value + '%';
        var damp = outOf(art, 'damping');
        if (damp) damp.textContent = field(art, 'damping').value + '%';
        var mix = outOf(art, 'mix');
        if (mix) mix.textContent = field(art, 'mix').value + '% wet';
      } else if (type === 'eq') {
        ['low_db', 'mid_db', 'high_db'].forEach(function (k) {
          var o = outOf(art, k);
          if (o) o.textContent = fmtDb(+field(art, k).value);
        });
        var mh = outOf(art, 'mid_hz');
        if (mh) mh.textContent = fmtHz(midHz(+field(art, 'mid_hz').value));
        var mq = outOf(art, 'mid_q');
        if (mq) mq.textContent = 'Q ' + eqQ(+field(art, 'mid_q').value).toFixed(1);
      } else if (type === 'highpass') {
        var hco = outOf(art, 'cutoff');
        if (hco) { var hh = hpHz(+field(art, 'cutoff').value); hco.textContent = hh == null ? 'off' : fmtHz(hh); }
        var hq = outOf(art, 'q');
        if (hq) hq.textContent = 'Q ' + hpQ(+field(art, 'q').value).toFixed(1);
      } else if (type === 'bandpass') {
        var bc = outOf(art, 'centre_hz');
        if (bc) bc.textContent = fmtHz(bpHz(+field(art, 'centre_hz').value));
        var bq = outOf(art, 'q');
        if (bq) bq.textContent = 'Q ' + bpQ(+field(art, 'q').value).toFixed(1);
        var bm = outOf(art, 'mix');
        if (bm) bm.textContent = field(art, 'mix').value + '% wet';
      } else if (type === 'drive') {
        var dd = outOf(art, 'drive_db');
        if (dd) dd.textContent = +field(art, 'drive_db').value === 0 ? 'clean' : fmtDb(+field(art, 'drive_db').value);
        var od = outOf(art, 'output_db');
        if (od) od.textContent = fmtDb(+field(art, 'output_db').value);
        var dm = outOf(art, 'mix');
        if (dm) dm.textContent = field(art, 'mix').value + '% wet';
      } else if (type === 'compressor') {
        var th = outOf(art, 'threshold_db');
        if (th) th.textContent = fmtDb(+field(art, 'threshold_db').value);
        var ra = outOf(art, 'ratio');
        if (ra) ra.textContent = ratioOf(+field(art, 'ratio').value).toFixed(1) + ':1';
        var at = outOf(art, 'attack_ms');
        if (at) at.textContent = field(art, 'attack_ms').value + ' ms';
        var re = outOf(art, 'release_ms');
        if (re) re.textContent = field(art, 'release_ms').value + ' ms';
        var mk = outOf(art, 'makeup_db');
        if (mk) mk.textContent = fmtDb(+field(art, 'makeup_db').value);
      } else if (type === 'width') {
        var wd = outOf(art, 'width');
        if (wd) wd.textContent = field(art, 'width').value + '%';
        var bl = outOf(art, 'balance');
        if (bl) {
          var bv = +field(art, 'balance').value;
          bl.textContent = bv === 0 ? 'centre' : (bv < 0 ? 'L ' + (-bv) : 'R ' + bv);
        }
      }
    });
  }
  function chain() {
    var out = [];
    arts().forEach(function (art) {
      if (art.hasAttribute('data-fixed')) {
        out.push({
          id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true,
          params: { ceiling_db: -1, lookahead_s: 0.0015 }
        });
        return;
      }
      var t = art.getAttribute('data-type');
      out.push({
        id: art.getAttribute('data-id'),
        type: t,
        version: t === 'eq' && art.getAttribute('data-voicing') !== '1' ? 2 : 1,
        bypass: art.getAttribute('data-bypass') === '1',
        params: paramsOf(art)
      });
    });
    return out;
  }
  function cap() {
    var full = movable().length >= 10;
    var btn = $('hack-add-btn'), sel = $('hack-type'), note = $('hack-cap');
    if (btn) btn.disabled = full;
    if (sel) sel.disabled = full;
    if (note) note.hidden = !full;
  }
  function buttons() {
    var list = movable();
    list.forEach(function (art, i) {
      var up = art.querySelector('.hack-up');
      var down = art.querySelector('.hack-down');
      if (up) up.disabled = i === 0;
      if (down) down.disabled = i === list.length - 1;
    });
    cap();
  }
  function paintBypass(art) {
    var on = art.getAttribute('data-bypass') === '1';
    var btn = art.querySelector('.hack-bypass');
    if (!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    var slash = btn.querySelector('.hack-slash');
    if (slash) {
      if (on) slash.removeAttribute('hidden');
      else slash.setAttribute('hidden', '');
    }
  }
  function move(art, dir) {
    var list = movable();
    var i = list.indexOf(art);
    var j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    var root = stack();
    if (dir < 0) root.insertBefore(art, list[j]);
    else root.insertBefore(list[j], art);
    buttons();
    if (hooks.onChange) hooks.onChange();
  }
  function orderKey() {
    return movable().map(function (a) { return a.getAttribute('data-id'); }).join('|');
  }
  function clearMotion() {
    arts().forEach(function (n) {
      n.style.transition = '';
      n.style.transform = '';
    });
  }
  function bindDrag(root) {
    var drag = null;
    function finish(commit) {
      if (!drag) return;
      var art = drag.art, gap = drag.gap, start = drag.start, next = drag.startNext;
      if (drag.raf) cancelAnimationFrame(drag.raf);
      if (commit) gap.parentNode.insertBefore(art, gap);
      gap.remove();
      if (!commit && art.parentNode) art.parentNode.insertBefore(art, next);
      art.classList.remove('dragging');
      art.style.position = '';
      art.style.left = '';
      art.style.right = '';
      art.style.top = '';
      art.style.width = '';
      art.style.margin = '';
      clearMotion();
      document.documentElement.style.overflowAnchor = '';
      drag = null;
      buttons();
      if (commit && orderKey() !== start && hooks.onChange) hooks.onChange();
    }
    function place(clientY) {
      var list = movable().filter(function (a) { return a !== drag.art; });
      var y = clientY - root.getBoundingClientRect().top;
      var before = null, i;
      for (i = 0; i < list.length; i++) {
        if (y < list[i].offsetTop + list[i].offsetHeight / 2) { before = list[i]; break; }
      }
      var lim = $('hack-limiter');
      var anchor = before || lim;
      if (!anchor || drag.gap.nextElementSibling === anchor) return;
      var nodes = lim ? list.concat([lim]) : list;
      var prev = nodes.map(function (n) { return [n, n.getBoundingClientRect().top]; });
      root.insertBefore(drag.gap, anchor);
      prev.forEach(function (pair) {
        var dy = pair[1] - pair[0].getBoundingClientRect().top;
        if (!dy) return;
        pair[0].style.transition = 'none';
        pair[0].style.transform = 'translateY(' + dy + 'px)';
      });
      if (drag.raf) cancelAnimationFrame(drag.raf);
      drag.raf = requestAnimationFrame(function () {
        prev.forEach(function (pair) {
          pair[0].style.transition = '';
          pair[0].style.transform = '';
        });
      });
    }
    root.addEventListener('pointerdown', function (e) {
      if (drag) return;
      var grip = e.target && e.target.closest ? e.target.closest('.hack-grip') : null;
      if (!grip || !root.contains(grip)) return;
      if (e.button != null && e.button !== 0) return;
      var art = grip.closest('article.hack');
      if (!art || art.hasAttribute('data-fixed')) return;
      e.preventDefault();
      document.documentElement.style.overflowAnchor = 'none';
      var box = art.getBoundingClientRect();
      var rb = root.getBoundingClientRect();
      var gap = document.createElement('div');
      gap.className = 'hack-gap';
      gap.style.height = box.height + 'px';
      drag = {
        art: art, gap: gap, pointer: e.pointerId, start: orderKey(),
        startNext: art.nextSibling, offsetY: e.clientY - box.top, raf: 0
      };
      root.insertBefore(gap, art);
      art.classList.add('dragging');
      art.style.position = 'absolute';
      art.style.left = '0';
      art.style.right = '0';
      art.style.margin = '0';
      art.style.top = (box.top - rb.top) + 'px';
      try { grip.setPointerCapture(e.pointerId); } catch (err) {}
    }, { passive: false });
    root.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.pointer) return;
      e.preventDefault();
      var rb = root.getBoundingClientRect();
      var top = e.clientY - drag.offsetY - rb.top;
      var max = root.clientHeight - drag.art.offsetHeight;
      if (top < 0) top = 0;
      if (top > max) top = max;
      drag.art.style.top = top + 'px';
      place(e.clientY);
    }, { passive: false });
    root.addEventListener('pointerup', function (e) {
      if (!drag || e.pointerId !== drag.pointer) return;
      finish(true);
    });
    root.addEventListener('pointercancel', function (e) {
      if (!drag || e.pointerId !== drag.pointer) return;
      finish(false);
    });
  }
  var TRI_UP = '<svg viewBox="0 0 20 18" width="20" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M10 1.5 18.5 16.5H1.5Z"/></svg>';
  var TRI_DN = '<svg viewBox="0 0 20 18" width="20" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M10 16.5 1.5 1.5h17Z"/></svg>';
  // Speaker (bypass) icon. Credit: "speaker on" by masmooh, Noun Project
  // (https://thenounproject.com/browse/icons/term/speaker-on/), CC BY 3.0, in the /create/ footer (#foot-speaker).
  var SPEAKER = '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.4 12.2h5.4v7.6H3.4z"/><path d="M8.8 12.2 16 7.2v17.6L8.8 19.8z"/><path class="hack-wave" d="M19.4 11.2Q28.2 16 19.4 20.8"/><path class="hack-wave" d="M23.2 7.4Q36.2 16 23.2 24.6"/><path class="hack-slash" d="M3.2 27.4 30.2 4.6" hidden/></svg>';
  var CROSS = '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7.5 7.5 24.5 24.5M24.5 7.5 7.5 24.5"/></svg>';
  function moveButton(type, dir, id) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = (dir < 0 ? 'hack-up' : 'hack-down') + ' hack-move';
    btn.setAttribute('aria-label', 'Move ' + nameOf(type, id) + (dir < 0 ? ' up' : ' down'));
    btn.innerHTML = dir < 0 ? TRI_UP : TRI_DN;
    return btn;
  }
  function nameOf(type, id) {
    var m = /-(\d+)$/.exec(id || '');
    return LABELS[type] + (m && +m[1] > 1 ? ' ' + m[1] : '');
  }
  // ---------- dice: randomize one hack (with an A/B undo), or the whole stack ----------
  function icons() { return window.NCIcons || { die: '⚄', undo: '↶', redo: '↷' }; }
  // The undo slot sits left of the die and stays in the row when empty, so dice line up like the speakers.
  function addDice(tools, type, id) {
    if (tools.querySelector('.hack-die')) return;
    var name = nameOf(type, id);
    var un = document.createElement('button');
    un.type = 'button';
    un.className = 'hack-undo';
    un.setAttribute('data-ab', '');
    un.setAttribute('aria-label', 'Undo randomize ' + name);
    un.innerHTML = icons().undo;
    un.disabled = true;
    var die = document.createElement('button');
    die.type = 'button';
    die.className = 'hack-die';
    die.setAttribute('aria-label', 'Randomize ' + name);
    die.innerHTML = icons().die;
    var first = tools.firstChild;
    tools.insertBefore(un, first);
    tools.insertBefore(die, first);
  }
  var rngOverride = null;
  function draw() { return rngOverride || (window.NCRandom ? NCRandom.rng(NCRandom.freshSeed()) : Math.random); }
  function snapshot(art) {
    var out = {};
    Array.prototype.forEach.call(art.querySelectorAll('[data-param]'), function (el) { out[el.getAttribute('data-param')] = el.value; });
    return out;
  }
  // Sets dials as the slider holds them, then tells the audio once. The DSP smooths each move, so no clicks.
  function setDials(art, dials, quiet) {
    var changed = [];
    Object.keys(dials || {}).forEach(function (k) {
      var el = field(art, k);
      if (!el) return;
      var v = String(dials[k]);
      if (el.tagName === 'SELECT') {
        var i, o = el.options;
        for (i = 0; i < o.length; i++) if (o[i].value === v) { el.selectedIndex = i; break; }
      } else el.value = v;
      changed.push(el);
    });
    readouts();
    if (quiet) return;
    // The page's first filter and delay keep a dial log; tell it about each of their dials, like a hand move would.
    var told = false;
    if (art.hasAttribute('data-primary') && hooks.onDial) {
      changed.forEach(function (el) { var d = el.getAttribute('data-dial'); if (d) { hooks.onDial(d); told = true; } });
    }
    if (!told && hooks.onChange) hooks.onChange();
  }
  function paintAB(art) {
    var un = art.querySelector('.hack-undo');
    if (!un) return;
    var ab = art._ncAB;
    var name = art.querySelector('h3') ? art.querySelector('h3').textContent : '';
    if (!ab) {
      un.disabled = true;
      un.setAttribute('data-ab', '');
      un.innerHTML = icons().undo;
      un.setAttribute('aria-label', 'Undo randomize ' + name);
      return;
    }
    un.disabled = false;
    var onAfter = ab.showing === 'after';
    un.setAttribute('data-ab', onAfter ? 'undo' : 'redo');
    un.innerHTML = onAfter ? icons().undo : icons().redo;
    un.setAttribute('aria-label', (onAfter ? 'Undo randomize ' : 'Redo randomize ') + name);
  }
  function clearAB(art) {
    if (!art._ncAB) return;
    art._ncAB = null;
    paintAB(art);
  }
  function randomizeOne(art, r) {
    if (!window.NCRandom || !art || art.hasAttribute('data-fixed')) return;
    var dials = NCRandom.params(art.getAttribute('data-type'), r || draw());
    if (!dials) return;
    var before = snapshot(art);
    setDials(art, dials);
    art._ncAB = { before: before, after: snapshot(art), showing: 'after' };
    paintAB(art);
  }
  function toggleAB(art) {
    var ab = art._ncAB;
    if (!ab) return;
    ab.showing = ab.showing === 'after' ? 'before' : 'after';
    setDials(art, ab.showing === 'after' ? ab.after : ab.before);
    paintAB(art);
  }
  // Rough level check: a short harmonic probe through the drawn stack, offline, against the probe through the
  // limiter alone. A stack more than 4 dB off is drawn again (up to 10 tries, keeping the closest).
  var PROBE = null, PROBE_DRY = null, LEVEL_DB = 4, TRIES = 10;
  function probeBuffer(ctx) {
    var sr = 48000, n = Math.round(0.6 * sr), b = ctx.createBuffer(2, n, sr), c, i, k, t, h, d, s = 99;
    for (c = 0; c < 2; c++) {
      d = b.getChannelData(c);
      for (i = 0; i < n; i++) {
        t = i / sr; h = 0;
        for (k = 1; k <= 24; k++) h += Math.sin(6.283185307179586 * 110 * k * t + k * c) / k;
        s = (s * 1664525 + 1013904223) >>> 0;
        d[i] = 0.16 * Math.exp(-2.5 * t) * h + 0.02 * (s / 4294967296 - 0.5);
      }
    }
    return b;
  }
  function probeLevel(widgets) {
    var O = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!O || !window.NCHacks || !NCHacks.attach) return Promise.resolve(null);
    var sr = 48000, n = Math.round(0.6 * sr), off = new O(2, n, sr);
    if (!PROBE) PROBE = probeBuffer(off);
    var src = off.createBufferSource();
    src.buffer = PROBE;
    return NCHacks.attach(off, { widgets: widgets, immediate: true }).then(function (api) {
      src.connect(api.node); api.node.connect(off.destination); src.start();
      return off.startRendering();
    }).then(function (out) {
      var e = 0, c, i, d;
      for (c = 0; c < 2; c++) { d = out.getChannelData(c); for (i = 0; i < d.length; i++) e += d[i] * d[i]; }
      return 10 * Math.log10(e / (2 * n) + 1e-20);
    }).catch(function () { return null; });
  }
  var LIM = { id: 'limiter', type: 'limiter', version: 1, bypass: false, fixed: true, params: { ceiling_db: -1, lookahead_s: 0.0015 } };
  function widgetsOf(plan) {
    var count = {};
    return plan.map(function (item) {
      count[item.type] = (count[item.type] || 0) + 1;
      var id = item.type + '-' + count[item.type];
      var art = createArticle(item.type, id, false);
      setDials(art, item.dials, true);
      return { id: id, type: item.type, version: item.type === 'eq' ? 2 : 1, bypass: false, params: paramsOf(art) };
    }).concat([LIM]);
  }
  function levelOf(plan) {
    var dry = PROBE_DRY != null ? Promise.resolve(PROBE_DRY) : probeLevel([LIM]).then(function (v) { PROBE_DRY = v; return v; });
    return dry.then(function (d) {
      if (d == null) return null;
      return probeLevel(widgetsOf(plan)).then(function (w) { return w == null ? null : w - d; });
    });
  }
  function pickPlan(r) {
    var best = null, tries = 0;
    function next() {
      var plan = NCRandom.stack(r, 10, 2, 6);
      tries++;
      return levelOf(plan).then(function (db) {
        if (db == null) return { plan: plan, db: null, tries: tries };
        if (!best || Math.abs(db) < Math.abs(best.db)) best = { plan: plan, db: db, tries: tries };
        if (Math.abs(db) <= LEVEL_DB || tries >= TRIES) { best.tries = tries; return best; }
        return next();
      });
    }
    return next();
  }
  var lastPick = null;
  function randomizeAll(r) {
    if (!window.NCRandom) return Promise.resolve([]);
    r = r || draw();
    var die = $('live-die');
    if (die) die.disabled = true;
    return pickPlan(r).then(function (pick) {
      lastPick = { db: pick.db, tries: pick.tries };
      buildStack(pick.plan);
      if (die) die.disabled = false;
      return pick.plan;
    }, function (err) { if (die) die.disabled = false; throw err; });
  }
  function buildStack(plan) {
    movable().forEach(function (a) { a.remove(); });
    plan.forEach(function (item) {
      var art = add(item.type, true);
      if (art) setDials(art, item.dials, true);
    });
    buttons();
    readouts();
    if (hooks.onChange) hooks.onChange();
    return plan;
  }
  function confirmBox(show) {
    var box = $('live-confirm'), die = $('live-die');
    if (!box) return;
    box.hidden = !show;
    if (die) die.setAttribute('aria-expanded', show ? 'true' : 'false');
    if (show) { var b = $('live-replace'); if (b) b.focus(); }
  }
  function bindSection() {
    var die = $('live-die');
    if (!die || die._ncBound) return;
    die._ncBound = true;
    if (!die.innerHTML.trim()) die.innerHTML = icons().die;
    die.addEventListener('click', function () {
      if (movable().length > 0) confirmBox(true);
      else { confirmBox(false); randomizeAll(); }
    });
    var rep = $('live-replace'), can = $('live-cancel');
    if (rep) rep.addEventListener('click', function () { confirmBox(false); randomizeAll(); if (die) die.focus(); });
    if (can) can.addEventListener('click', function () { confirmBox(false); if (die) die.focus(); });
    var box = $('live-confirm');
    if (box) box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { confirmBox(false); if (die) die.focus(); } });
  }
  function bar(type, id, primary) {
    var row = document.createElement('div');
    row.className = 'hack-bar';
    var grip = document.createElement('span');
    grip.className = 'hack-grip';
    grip.setAttribute('aria-hidden', 'true');
    grip.textContent = '⋮⋮';
    var h = document.createElement('h3');
    h.textContent = nameOf(type, id);
    var nudge = document.createElement('span');
    nudge.className = 'hack-nudge';
    nudge.appendChild(moveButton(type, -1, id));
    nudge.appendChild(moveButton(type, 1, id));
    var tools = document.createElement('span');
    tools.className = 'hack-tools';
    addDice(tools, type, id);
    var by = document.createElement('button');
    by.type = 'button';
    by.className = 'hack-bypass';
    by.setAttribute('aria-pressed', 'false');
    by.setAttribute('aria-label', 'Bypass ' + nameOf(type, id));
    by.innerHTML = SPEAKER;
    tools.appendChild(by);
    var rm = document.createElement('button');
    rm.type = 'button';
    rm.className = 'hack-remove';
    rm.setAttribute('aria-label', 'Remove ' + nameOf(type, id));
    rm.innerHTML = CROSS;
    tools.appendChild(rm);
    row.appendChild(grip);
    row.appendChild(nudge);
    row.appendChild(h);
    row.appendChild(tools);
    return row;
  }
  function dial(label, input, output, param) {
    var row = document.createElement('div');
    row.className = 'dial';
    var lab = document.createElement('label');
    var id = input.id;
    lab.htmlFor = id;
    lab.textContent = label;
    output.setAttribute('data-out', param);
    row.appendChild(lab);
    row.appendChild(input);
    row.appendChild(output);
    return row;
  }
  function range(id, param, min, max, value, dialName) {
    var input = document.createElement('input');
    input.type = 'range';
    input.id = id;
    input.min = String(min);
    input.max = String(max);
    input.step = '1';
    input.value = String(value);
    input.setAttribute('data-param', param);
    if (dialName) input.setAttribute('data-dial', dialName);
    return input;
  }
  var NOTES = [['0.25', '1/16'], ['0.5', '1/8'], ['0.75', '1/8 dotted'], ['1', '1/4'], ['1.5', '1/4 dotted'], ['2', '1/2']];
  function timingSelect(id, beats) {
    var sel = document.createElement('select');
    sel.id = id;
    sel.setAttribute('data-param', 'delay_beats');
    sel.setAttribute('data-dial', 'delay_timing');
    var src = $('ltime');
    var i, o;
    if (src && src !== sel && src.options.length) {
      for (i = 0; i < src.options.length; i++) {
        o = document.createElement('option');
        o.value = src.options[i].value;
        o.textContent = src.options[i].textContent;
        sel.appendChild(o);
      }
    } else {
      for (i = 0; i < NOTES.length; i++) {
        o = document.createElement('option');
        o.value = NOTES[i][0];
        o.textContent = NOTES[i][1];
        sel.appendChild(o);
      }
    }
    nearestTiming(sel, beats == null ? 0.75 : beats);
    return sel;
  }
  function output(id, text) {
    var o = document.createElement('output');
    o.id = id;
    o.textContent = text || '';
    return o;
  }
  function fillDials(art, type, id, primary) {
    var p = primary ? '' : id + '-';
    if (type === 'lowpass') {
      var cutId = primary ? 'lcut' : p + 'cut';
      var cut = range(cutId, 'cutoff', 0, 100, 0, primary ? 'cutoff' : '');
      var cutv = output(primary ? 'lcutv' : p + 'cutv', 'open');
      if (primary) cutv.setAttribute('for', 'lcut');
      art.appendChild(dial('Cutoff', cut, cutv, 'cutoff'));
    } else if (type === 'delay') {
      var timeId = primary ? 'ltime' : p + 'time';
      var sel = timingSelect(timeId, 0.75);
      var timev = output(primary ? 'ltimev' : p + 'timev', '');
      art.appendChild(dial('Timing', sel, timev, 'delay_beats'));
      var fb = range(primary ? 'lfb' : p + 'fb', 'feedback', 0, 90, 35, primary ? 'feedback' : '');
      var fbv = output(primary ? 'lfbv' : p + 'fbv', '35%');
      art.appendChild(dial('Feedback', fb, fbv, 'feedback'));
      var wet = range(primary ? 'lmix' : p + 'mix', 'wet', 0, 100, 0, primary ? 'wet' : '');
      var wetv = output(primary ? 'lmixv' : p + 'mixv', '0% wet');
      art.appendChild(dial('Wet/dry', wet, wetv, 'wet'));
    } else if (type === 'plate') {
      var pre = range(primary ? 'ppre' : p + 'pre', 'predelay', 0, 200, 0, '');
      art.appendChild(dial('Pre-delay', pre, output(primary ? 'pprev' : p + 'prev', '0 ms'), 'predelay'));
      var size = range(primary ? 'psize' : p + 'size', 'size', 0, 100, 50, '');
      art.appendChild(dial('Size', size, output(primary ? 'psizev' : p + 'sizev', '1.00×'), 'size'));
      var dec = range(primary ? 'pdec' : p + 'dec', 'decay', 0, 100, 50, '');
      art.appendChild(dial('Decay', dec, output(primary ? 'pdecv' : p + 'decv', '50%'), 'decay'));
      var damp = range(primary ? 'pdamp' : p + 'damp', 'damping', 0, 100, 0, '');
      art.appendChild(dial('Damping', damp, output(primary ? 'pdampv' : p + 'dampv', '0%'), 'damping'));
      var mix = range(primary ? 'pmix' : p + 'mix', 'mix', 0, 100, 0, '');
      art.appendChild(dial('Mix', mix, output(primary ? 'pmixv' : p + 'mixv', '0% wet'), 'mix'));
    } else if (type === 'eq') {
      art.appendChild(dial('Low', range(p + 'low', 'low_db', -18, 18, 0, ''), output(p + 'lowv', '0 dB'), 'low_db'));
      art.appendChild(dial('Mid', range(p + 'mid', 'mid_db', -18, 18, 0, ''), output(p + 'midv', '0 dB'), 'mid_db'));
      art.appendChild(dial('Mid at', range(p + 'midhz', 'mid_hz', 0, 100, 50, ''), output(p + 'midhzv', '1.0 kHz'), 'mid_hz'));
      art.appendChild(dial('Mid Q', range(p + 'midq', 'mid_q', 0, 100, 40, ''), output(p + 'midqv', 'Q 1.0'), 'mid_q'));
      art.appendChild(dial('High', range(p + 'high', 'high_db', -18, 18, 0, ''), output(p + 'highv', '0 dB'), 'high_db'));
      var eqn = document.createElement('p');
      eqn.className = 'm hack-note';
      eqn.textContent = 'Low shelf 150 Hz, high shelf 6 kHz.';
      art.appendChild(eqn);
    } else if (type === 'highpass') {
      art.appendChild(dial('Cutoff', range(p + 'cut', 'cutoff', 0, 100, 0, ''), output(p + 'cutv', 'off'), 'cutoff'));
      art.appendChild(dial('Resonance', range(p + 'res', 'q', 0, 100, 0, ''), output(p + 'resv', 'Q 0.7'), 'q'));
    } else if (type === 'bandpass') {
      art.appendChild(dial('Centre', range(p + 'centre', 'centre_hz', 0, 100, 53, ''), output(p + 'centrev', '1.0 kHz'), 'centre_hz'));
      art.appendChild(dial('Q', range(p + 'q', 'q', 0, 100, 0, ''), output(p + 'qv', 'Q 0.4'), 'q'));
      art.appendChild(dial('Mix', range(p + 'mix', 'mix', 0, 100, 100, ''), output(p + 'mixv', '100% wet'), 'mix'));
    } else if (type === 'drive') {
      art.appendChild(dial('Drive', range(p + 'drive', 'drive_db', 0, 24, 0, ''), output(p + 'drivev', 'clean'), 'drive_db'));
      art.appendChild(dial('Output', range(p + 'out', 'output_db', -12, 12, 0, ''), output(p + 'outv', '0 dB'), 'output_db'));
      art.appendChild(dial('Mix', range(p + 'mix', 'mix', 0, 100, 100, ''), output(p + 'mixv', '100% wet'), 'mix'));
    } else if (type === 'compressor') {
      art.appendChild(dial('Threshold', range(p + 'thr', 'threshold_db', -60, 0, 0, ''), output(p + 'thrv', '0 dB'), 'threshold_db'));
      art.appendChild(dial('Ratio', range(p + 'ratio', 'ratio', 0, 100, 0, ''), output(p + 'ratiov', '1.0:1'), 'ratio'));
      art.appendChild(dial('Attack', range(p + 'att', 'attack_ms', 1, 100, 10, ''), output(p + 'attv', '10 ms'), 'attack_ms'));
      art.appendChild(dial('Release', range(p + 'rel', 'release_ms', 10, 1000, 150, ''), output(p + 'relv', '150 ms'), 'release_ms'));
      art.appendChild(dial('Makeup', range(p + 'mk', 'makeup_db', 0, 24, 0, ''), output(p + 'mkv', '0 dB'), 'makeup_db'));
    } else if (type === 'width') {
      art.appendChild(dial('Width', range(p + 'width', 'width', 0, 200, 100, ''), output(p + 'widthv', '100%'), 'width'));
      art.appendChild(dial('Balance', range(p + 'bal', 'balance', -100, 100, 0, ''), output(p + 'balv', 'centre'), 'balance'));
      var note = document.createElement('p');
      note.className = 'm hack-note';
      note.textContent = 'A mono sound has no sides, so width leaves it as it is.';
      art.appendChild(note);
    }
  }
  function createArticle(type, id, primary) {
    var art = document.createElement('article');
    art.className = 'hack';
    art.id = primary && PRIMARY[type] ? PRIMARY[type] : 'hack-' + id;
    art.setAttribute('data-id', id);
    art.setAttribute('data-type', type);
    if (primary) art.setAttribute('data-primary', '1');
    art.appendChild(bar(type, id, primary));
    fillDials(art, type, id, primary);
    return art;
  }
  function setParams(art, p) {
    p = p || {};
    clearAB(art);
    var type = art.getAttribute('data-type');
    if (type === 'lowpass' && p.cutoff != null) field(art, 'cutoff').value = String(Math.round(+p.cutoff));
    if (type === 'delay') {
      if (p.delay_beats != null) nearestTiming(field(art, 'delay_beats'), +p.delay_beats);
      if (p.feedback != null) field(art, 'feedback').value = String(Math.round(+p.feedback * 100));
      if (p.wet != null) field(art, 'wet').value = String(Math.round(+p.wet * 100));
    }
    if (type === 'plate') {
      if (p.predelay != null) field(art, 'predelay').value = String(Math.round(+p.predelay * 1000));
      if (p.size != null) field(art, 'size').value = String(Math.round(+p.size * 100));
      if (p.decay != null) field(art, 'decay').value = String(Math.round(+p.decay * 100));
      if (p.damping != null) field(art, 'damping').value = String(Math.round(+p.damping * 100));
      if (p.mix != null) field(art, 'mix').value = String(Math.round(+p.mix * 100));
    }
    if (type === 'eq') {
      ['low_db', 'mid_db', 'high_db'].forEach(function (k) { if (p[k] != null) field(art, k).value = String(Math.round(+p[k])); });
      if (p.mid_hz != null) field(art, 'mid_hz').value = String(midDial(+p.mid_hz));
      if (p.mid_q != null) field(art, 'mid_q').value = String(eqQDial(+p.mid_q));
      if (p.low_hz == null && p.high_hz == null && p.mid_q == null && (p.low_db != null || p.mid_db != null || p.high_db != null)) art.setAttribute('data-voicing', '1');
      else art.removeAttribute('data-voicing');
    }
    if (type === 'highpass') {
      if (p.cutoff != null) field(art, 'cutoff').value = String(Math.round(+p.cutoff));
      else if (p.cutoff_hz != null) field(art, 'cutoff').value = String(hpDial(+p.cutoff_hz));
      if (p.q != null) field(art, 'q').value = String(hpQDial(+p.q));
    }
    if (type === 'bandpass') {
      if (p.centre_hz != null) field(art, 'centre_hz').value = String(bpDial(+p.centre_hz));
      if (p.q != null) field(art, 'q').value = String(bpQDial(+p.q));
      if (p.mix != null) field(art, 'mix').value = String(Math.round(+p.mix * 100));
    }
    if (type === 'drive') {
      if (p.drive_db != null) field(art, 'drive_db').value = String(Math.round(+p.drive_db));
      if (p.output_db != null) field(art, 'output_db').value = String(Math.round(+p.output_db));
      if (p.mix != null) field(art, 'mix').value = String(Math.round(+p.mix * 100));
    }
    if (type === 'compressor') {
      ['threshold_db', 'attack_ms', 'release_ms', 'makeup_db'].forEach(function (k) { if (p[k] != null) field(art, k).value = String(Math.round(+p[k])); });
      if (p.ratio != null) field(art, 'ratio').value = String(ratioDial(+p.ratio));
    }
    if (type === 'width') {
      if (p.width != null) field(art, 'width').value = String(Math.round(+p.width * 100));
      if (p.balance != null) field(art, 'balance').value = String(Math.round(+p.balance * 100));
    }
  }
  // Any number of the same hack can sit in the stack (two delays is fine). Each gets its own id: delay-1, delay-2...
  function nextId(type) {
    var n = 1;
    arts().forEach(function (a) {
      if (a.getAttribute('data-type') !== type) return;
      var m = /-(\d+)$/.exec(a.getAttribute('data-id') || '');
      if (m && +m[1] >= n) n = +m[1] + 1;
    });
    return type + '-' + n;
  }
  function defaults() {
    return [
      { id: 'lowpass-1', type: 'lowpass', bypass: false, params: { cutoff: 0, cutoff_hz: null, q: 0.7071067811865476 } },
      { id: 'delay-1', type: 'delay', bypass: false, params: { delay_beats: 0.75, delay_s: 0.75, feedback: 0.35, wet: 0 } },
      { id: 'plate-1', type: 'plate', bypass: false, params: { predelay: 0, size: 0.5, decay: 0.5, damping: 0, mix: 0 } }
    ];
  }
  function applyList(list) {
    var root = stack();
    var lim = $('hack-limiter');
    var seen = {}, all = {};
    (list || []).forEach(function (w) { if (w && w.id) all[w.id] = 1; });
    var mov = (list || []).filter(function (w) { return w && w.type !== 'limiter' && !w.fixed && LABELS[w.type] != null; }).slice(0, 10).map(function (w) {
      // A saved stack with two hacks under one id still loads both: the second gets the next free id.
      if (!w.id || seen[w.id]) {
        var n = 1;
        while (seen[w.type + '-' + n] || all[w.type + '-' + n]) n++;
        w = Object.assign({}, w, { id: w.type + '-' + n });
      }
      seen[w.id] = 1;
      return w;
    });
    var keep = {};
    mov.forEach(function (w) { keep[w.id] = 1; });
    movable().forEach(function (art) {
      if (!keep[art.getAttribute('data-id')]) art.remove();
    });
    mov.forEach(function (w) {
      var art = byId(w.id);
      var primary = !!PRIMARY[w.type] && w.id === w.type + '-1';
      if (!art) {
        art = createArticle(w.type, w.id, primary);
        root.insertBefore(art, lim);
      }
      setParams(art, w.params);
      if (w.bypass) art.setAttribute('data-bypass', '1');
      else art.removeAttribute('data-bypass');
      paintBypass(art);
    });
    mov.forEach(function (w) {
      var art = byId(w.id);
      if (art && lim) root.insertBefore(art, lim);
    });
    buttons();
    readouts();
  }
  // The Composition's hacks are Live's starting chain for the whole piece.
  // A person can still move a dial; the next keystroke does not put it back
  // unless the written value itself changed. reset() returns to that start.
  var composed = {}, startList = [];
  function firstArt(type) {
    var list = arts(), i;
    for (i = 0; i < list.length; i++) {
      if (list[i].getAttribute('data-type') === type && !list[i].hasAttribute('data-fixed')) return list[i];
    }
    return null;
  }
  function restoreDial(type, art) {
    if (type === 'lowpass' || type === 'highpass') setParams(art, { cutoff: 0 });
    else if (type === 'delay') setParams(art, { wet: 0 });
    else if (type === 'plate') setParams(art, { mix: 0 });
    else art.remove();
  }
  function applyStart(list) {
    var want = {}, order = [];
    (list || []).forEach(function (h) {
      if (!h || !h.type || LABELS[h.type] == null) return;
      if (!want[h.type]) order.push(h.type);
      want[h.type] = h;
    });
    var sig = JSON.stringify(order.map(function (t) { return [t, want[t].value]; }));
    if (sig === applyStart.sig) return;
    if (!order.length && !Object.keys(composed).length) { applyStart.sig = sig; startList = []; return; }
    applyStart.sig = sig;
    startList = order.map(function (t) { return want[t]; });
    Object.keys(composed).forEach(function (type) {
      if (want[type]) return;
      var rec = composed[type], art = byId(rec.id);
      delete composed[type];
      if (!art) return;
      if (rec.added) art.remove();
      else restoreDial(type, art);
    });
    order.forEach(function (type) {
      var h = want[type], art = firstArt(type), added = false;
      if (!art) {
        art = add(type, true);
        if (!art) return;
        added = true;
        art.setAttribute('data-from-composition', '1');
      }
      setParams(art, h.params || {});
      var prev = composed[type];
      composed[type] = { id: art.getAttribute('data-id'), added: prev ? prev.added : added };
    });
    buttons();
    readouts();
    if (hooks.onChange) hooks.onChange();
  }
  function reset() {
    var again = startList.slice();
    startList = [];
    composed = {};
    applyStart.sig = '';
    applyList(defaults());
    if (again.length) applyStart(again);
  }
  function add(type, quiet) {
    if (movable().length >= 10) { cap(); return null; }
    if (LABELS[type] == null) return null;
    var id = nextId(type);
    var primary = !!PRIMARY[type] && id === type + '-1' && !document.getElementById(PRIMARY[type]);
    var art = createArticle(type, id, primary);
    var lim = $('hack-limiter');
    stack().insertBefore(art, lim);
    if (quiet) return art;
    buttons();
    readouts();
    if (hooks.onChange) hooks.onChange();
    return art;
  }
  function onEdit(e) {
    var art = e.target.closest && e.target.closest('article.hack');
    if (!art || art.hasAttribute('data-fixed')) return;
    // A hand on a dial ends the before/after of the last randomize.
    clearAB(art);
    readouts();
    var dial = e.target.getAttribute('data-dial');
    if (art.hasAttribute('data-primary') && dial && hooks.onDial) hooks.onDial(dial);
    else if (hooks.onChange) hooks.onChange();
  }
  function bind() {
    var root = stack();
    if (!root || root._ncBound) return;
    root._ncBound = true;
    root.addEventListener('input', onEdit);
    root.addEventListener('change', onEdit);
    root.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('button') : null;
      if (!t) return;
      var art = t.closest('article.hack');
      if (!art || art.hasAttribute('data-fixed')) return;
      if (t.classList.contains('hack-die')) randomizeOne(art);
      else if (t.classList.contains('hack-undo')) toggleAB(art);
      else if (t.classList.contains('hack-up')) move(art, -1);
      else if (t.classList.contains('hack-down')) move(art, 1);
      else if (t.classList.contains('hack-bypass')) {
        if (art.getAttribute('data-bypass') === '1') art.removeAttribute('data-bypass');
        else art.setAttribute('data-bypass', '1');
        paintBypass(art);
        if (hooks.onChange) hooks.onChange();
      } else if (t.classList.contains('hack-remove')) {
        // The row goes now. The worklet fades through silence on the new order, the same fade as a reorder, then drops the hack.
        art.remove();
        buttons();
        if (hooks.onChange) hooks.onChange();
      }
    });
    bindDrag(root);
    var btn = $('hack-add-btn');
    if (btn) btn.addEventListener('click', function () {
      var sel = $('hack-type');
      add(sel ? sel.value : 'lowpass');
    });
    buttons();
  }
  function devCpu() {
    try {
      if (localStorage.getItem('nc_tester') || localStorage.getItem('nc_dev')) return true;
    } catch (e) {}
    return /[?&]cpu=1(?:&|$)/.test(location.search);
  }
  window.NCStack = {
    install: function (h) {
      hooks.onDial = h && h.onDial;
      hooks.onChange = h && h.onChange;
      bind();
      // The page's first three hacks are in the HTML: give them dice too.
      arts().forEach(function (art) {
        if (art.hasAttribute('data-fixed')) return;
        var tools = art.querySelector('.hack-tools');
        if (tools) addDice(tools, art.getAttribute('data-type'), art.getAttribute('data-id'));
      });
      bindSection();
      var cpu = $('lcpu');
      if (cpu && devCpu()) cpu.hidden = false;
      readouts();
      buttons();
    },
    setQuarter: function (s) { if (s > 0) quarter = s; },
    readouts: readouts,
    chain: chain,
    reset: reset,
    applyChain: applyList,
    applyStart: applyStart,
    count: function () { return movable().length; },
    // For tests and the console: a seeded randomize, and the before/after state of one hack.
    seed: function (n) { rngOverride = n == null || !window.NCRandom ? null : NCRandom.rng(n); },
    randomizeAll: function (seed) { return randomizeAll(seed == null ? null : NCRandom.rng(seed)); },
    lastLevel: function () { return lastPick; },
    randomize: function (id, seed) { randomizeOne(byId(id), seed == null ? null : NCRandom.rng(seed)); },
    toggle: function (id) { toggleAB(byId(id)); },
    ab: function (id) { var a = byId(id); return a && a._ncAB ? { showing: a._ncAB.showing, before: a._ncAB.before, after: a._ncAB.after } : null; },
    dials: function (id) { var a = byId(id); return a ? snapshot(a) : null; },
    devCpu: devCpu
  };
})();
