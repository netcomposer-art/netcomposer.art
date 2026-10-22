// Reset (Peter, 2026-10-22): "Needs to be a Clear or Reset button that
// returns everything to core state."
//
// The page goes back to a first visit: the bare /create/ address (a
// ?tester= pass, if one is in the address, stays) and a fresh load, after the
// draft keys this page keeps in sessionStorage are removed. A fresh load is
// the one way every part (Play, Gather, the take, Live and its hacks, undo)
// is surely back to how it starts. Nothing is sent to the Performer: saved
// Performances, Gathers on the server and the limits are untouched. The
// tester pass in localStorage and the clip byte cache stay.
//
// It asks first only when there is something to lose.
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }
  var startInst = null, startHacks = null;

  function filled(id) {
    var el = $(id);
    return !!(el && String(el.value || '').trim());
  }
  function shown(id) {
    var el = $(id);
    return !!(el && !el.hidden);
  }
  function draftKeys() {
    var out = [], i, k;
    try {
      for (i = 0; i < sessionStorage.length; i++) {
        k = sessionStorage.key(i);
        if (k === 'nc-perform-job' || (k && k.indexOf('nc-claim:') === 0)) out.push(k);
      }
    } catch (e) {}
    return out;
  }
  // The Live hacks as they stand: order, bypass and every dial.
  function hacks() {
    return Array.prototype.map.call(document.querySelectorAll('#live article.hack'), function (a) {
      var dials = Array.prototype.map.call(a.querySelectorAll('input, select'), function (i) { return i.type === 'checkbox' ? String(i.checked) : i.value; });
      return (a.getAttribute('data-id') || '') + (a.hasAttribute('data-bypass') ? '!' : '') + '=' + dials.join(',');
    }).join('|');
  }
  // Anything a person made on this page that a reset would throw away.
  function dirty() {
    if (filled('comp') || filled('perf') || filled('title') || filled('by')) return true;
    if (/[#&]c=/.test(location.hash)) return true;
    var inst = $('inst');
    if (inst && startInst != null && inst.value !== startInst) return true;
    var list = $('gather-list');
    if (list && list.children.length) return true;
    if (shown('gather-stop') || shown('perform-stop') || shown('perform-out') || shown('ltake') || shown('undo')) return true;
    if (startHacks != null && hacks() !== startHacks) return true;
    return draftKeys().length > 0;
  }
  // The bare page, keeping only a tester pass that is still in the address.
  function bareUrl() {
    var url = location.pathname, params;
    try { params = new URLSearchParams(location.search); } catch (e) { params = null; }
    if (params && params.has('tester')) url += '?tester=' + encodeURIComponent(params.get('tester') || '');
    return url;
  }
  function reset() {
    window.NC_RESETTING = true; // app.js: no last #c= write on the way out
    draftKeys().forEach(function (k) { try { sessionStorage.removeItem(k); } catch (e) {} });
    Array.prototype.forEach.call(document.querySelectorAll('audio'), function (a) { try { a.pause(); } catch (e) {} });
    try { if (window.NC && NC.stop) NC.stop(); } catch (e2) {}
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e3) {}
    window.scrollTo(0, 0);
    // A new navigation, not a reload: the browser does not refill the fields.
    location.replace(bareUrl());
  }
  function ask(show) {
    var box = $('reset-confirm'), btn = $('reset');
    if (!box) return;
    box.hidden = !show;
    if (btn) btn.setAttribute('aria-expanded', show ? 'true' : 'false');
    if (show) { var go = $('reset-go'); if (go) go.focus(); }
  }
  function bind() {
    var btn = $('reset');
    if (!btn || btn._ncBound) return;
    btn._ncBound = true;
    btn.addEventListener('click', function () {
      if (dirty()) ask(true);
      else { ask(false); reset(); }
    });
    var go = $('reset-go'), no = $('reset-cancel'), box = $('reset-confirm');
    if (go) go.addEventListener('click', function () { ask(false); reset(); });
    if (no) no.addEventListener('click', function () { ask(false); btn.focus(); });
    if (box) box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { ask(false); btn.focus(); } });
  }
  bind();
  // The instrument the page picks and the hacks it starts with are not
  // something to lose.
  var wait = setInterval(function () {
    if (!document.body || !document.body.getAttribute('data-ready')) return;
    clearInterval(wait);
    var inst = $('inst');
    startInst = inst ? inst.value : null;
    startHacks = hacks();
  }, 100);
  window.NCReset = { dirty: dirty, reset: reset, bareUrl: bareUrl, draftKeys: draftKeys };
})();
