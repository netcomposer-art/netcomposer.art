// The Live hack stack: order is the signal path, top to bottom.
// The limiter stays last. It is not one of the ten movable hacks.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var hooks = { onDial: null, onChange: null };
  var quarter = 1;
  var LABELS = { lowpass: 'Low-pass filter', delay: 'Delay', plate: 'Plate' };

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
      out.push({
        id: art.getAttribute('data-id'),
        type: art.getAttribute('data-type'),
        version: 1,
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
    var waves = btn.querySelectorAll('.hack-wave');
    var slash = btn.querySelector('.hack-slash');
    var i;
    for (i = 0; i < waves.length; i++) {
      if (on) waves[i].setAttribute('hidden', '');
      else waves[i].removeAttribute('hidden');
    }
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
  var TRI_UP = '<svg viewBox="0.3 0.3 15.4 13.4" width="15" height="12" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M8 1.2 14.7 12.5H1.3Z"/></svg>';
  var TRI_DN = '<svg viewBox="0.3 0.3 15.4 13.4" width="15" height="12" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M8 12.8 1.3 1.5h13.4Z"/></svg>';
  var SPEAKER = '<svg viewBox="0.4 1.5 17.4 12.9" width="20" height="15" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"><path d="M1.2 5.8h2.4L8.4 2.5v11L3.6 10.2H1.2z"/><path class="hack-wave" d="M10.5 5.5a3.2 3.2 0 0 0 0 5"/><path class="hack-wave" d="M13.4 3.1a6 6 0 0 0 0 9.8"/><path class="hack-slash" d="M1.7 13.1 16.6 2.5" hidden/></svg>';
  var CROSS = '<svg viewBox="0.5 0.5 11 11" width="13" height="13" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round"><path d="M1.5 1.5l9 9M10.5 1.5 1.5 10.5"/></svg>';
  function moveButton(type, dir) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = (dir < 0 ? 'hack-up' : 'hack-down') + ' hack-move';
    btn.setAttribute('aria-label', 'Move ' + LABELS[type] + (dir < 0 ? ' up' : ' down'));
    btn.innerHTML = dir < 0 ? TRI_UP : TRI_DN;
    return btn;
  }
  function bar(type, id, primary) {
    var row = document.createElement('div');
    row.className = 'hack-bar';
    var grip = document.createElement('span');
    grip.className = 'hack-grip';
    grip.setAttribute('aria-hidden', 'true');
    grip.textContent = '⋮⋮';
    var h = document.createElement('h3');
    h.textContent = LABELS[type];
    var nudge = document.createElement('span');
    nudge.className = 'hack-nudge';
    nudge.appendChild(moveButton(type, -1));
    nudge.appendChild(moveButton(type, 1));
    var tools = document.createElement('span');
    tools.className = 'hack-tools';
    if (!primary) {
      var rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'hack-remove';
      rm.setAttribute('aria-label', 'Remove ' + LABELS[type]);
      rm.innerHTML = CROSS;
      tools.appendChild(rm);
    }
    var by = document.createElement('button');
    by.type = 'button';
    by.className = 'hack-bypass';
    by.setAttribute('aria-pressed', 'false');
    by.setAttribute('aria-label', 'Bypass ' + LABELS[type]);
    by.innerHTML = SPEAKER;
    tools.appendChild(by);
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
    }
  }
  function createArticle(type, id, primary) {
    var art = document.createElement('article');
    art.className = 'hack';
    art.id = primary ? (type === 'lowpass' ? 'hack-lp' : type === 'delay' ? 'hack-delay' : 'hack-plate') : 'hack-' + id;
    art.setAttribute('data-id', id);
    art.setAttribute('data-type', type);
    if (primary) art.setAttribute('data-primary', '1');
    art.appendChild(bar(type, id, primary));
    fillDials(art, type, id, primary);
    return art;
  }
  function setParams(art, p) {
    p = p || {};
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
  }
  function nextId(type) {
    var n = 1;
    arts().forEach(function (a) {
      if (a.getAttribute('data-type') !== type) return;
      var m = /(\d+)$/.exec(a.getAttribute('data-id') || '');
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
    var mov = (list || []).filter(function (w) { return w && w.type !== 'limiter' && !w.fixed; }).slice(0, 10);
    var keep = {};
    mov.forEach(function (w) { keep[w.id] = 1; });
    movable().forEach(function (art) {
      if (!keep[art.getAttribute('data-id')]) art.remove();
    });
    mov.forEach(function (w) {
      var art = byId(w.id);
      var primary = w.id === 'lowpass-1' || w.id === 'delay-1' || w.id === 'plate-1';
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
  function reset() {
    applyList(defaults());
  }
  function add(type) {
    if (movable().length >= 10) { cap(); return; }
    if (LABELS[type] == null) return;
    var id = nextId(type);
    var primary = !byId(type + '-1') && id === type + '-1';
    var art = createArticle(type, id, primary);
    var lim = $('hack-limiter');
    stack().insertBefore(art, lim);
    buttons();
    readouts();
    if (hooks.onChange) hooks.onChange();
  }
  function onEdit(e) {
    var art = e.target.closest && e.target.closest('article.hack');
    if (!art || art.hasAttribute('data-fixed')) return;
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
      if (t.classList.contains('hack-up')) move(art, -1);
      else if (t.classList.contains('hack-down')) move(art, 1);
      else if (t.classList.contains('hack-bypass')) {
        if (art.getAttribute('data-bypass') === '1') art.removeAttribute('data-bypass');
        else art.setAttribute('data-bypass', '1');
        paintBypass(art);
        if (hooks.onChange) hooks.onChange();
      } else if (t.classList.contains('hack-remove')) {
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
    count: function () { return movable().length; },
    devCpu: devCpu
  };
})();
