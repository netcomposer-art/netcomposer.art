// Hosted Perform. The API base is the one value to change when this moves to a custom domain.
(function () {
  'use strict';
  var API = 'https://nc-perform-api.psemme.workers.dev';
  function $(id) { return document.getElementById(id); }
  var cfg = null, widget = null, token = null, jobId = null, es = null, pollT = null, busy = false;

  function status(t, warn) {
    var clean = soften(t);
    if (!clean) clean = 'Perform did not answer. The service may be down. Try again in a moment.';
    var s = $('perform-status');
    s.textContent = clean;
    s.className = warn ? 'm warn' : 'm';
  }
  function soften(msg) {
    var t = String(msg || '').replace(/\s+/g, ' ').trim();
    if (!t || /^HTTP\b/i.test(t) || /\bHTTP Error\b/i.test(t) || /\bHTTP\s*[45]\d\d\b/i.test(t)) return '';
    return t;
  }
  function messageFor(code, j) {
    var raw = soften(j && j.error);
    if (code === 429) return raw || 'Too many Performs from this network (3 every 10 minutes, 10 a day). Try again in a few minutes.';
    if (code === 503) return 'Perform is resting or busy. Try again in a moment.';
    if (!code || code >= 500) return 'Perform did not answer. The service may be down. Try again in a moment.';
    return raw || 'Perform did not start. Try again in a moment.';
  }
  function read(r) {
    return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { return { error: '' }; } });
  }
  function idle() {
    busy = false;
    $('performBtn').disabled = !(cfg && cfg.perform_enabled);
    $('performBtn').textContent = jobId ? 'Perform again' : 'Perform';
    $('perform-public').disabled = false;
  }
  function stopWatch() {
    if (pollT) { clearTimeout(pollT); pollT = null; }
    if (es) { var cur = es; es = null; cur.close(); }
  }
  function onJob(j) {
    if (!j) return;
    var line = j.stage_line || j.stage || j.state || '';
    if (j.position) line += ' · position ' + j.position;
    if (j.state !== 'done' && j.state !== 'failed' && j.state !== 'rejected') status(line || 'Working…');
    var bar = $('perform-bar');
    bar.hidden = false; bar.value = j.percent || 0;
    if (j.state === 'done') { stopWatch(); showDone(j); }
    else if (j.state === 'failed' || j.state === 'rejected') { stopWatch(); fail(soften(j.error) || 'That Performance did not finish. Try again in a moment.'); }
  }
  function poll(id) {
    fetch(API + '/api/jobs/' + id).then(function (r) { return read(r).then(function (j) { return r.ok ? j : null; }); }).then(function (j) {
      if (!j || !j.state) { fail('Perform did not answer. The service may be down. Try again in a moment.'); return; }
      onJob(j);
      if (j.state !== 'done' && j.state !== 'failed' && j.state !== 'rejected') pollT = setTimeout(function () { poll(id); }, 2000);
    }).catch(function () { fail('Perform did not answer. The service may be down. Try again in a moment.'); });
  }
  function watch(id) {
    stopWatch();
    if (!window.EventSource) { poll(id); return; }
    es = new EventSource(API + '/api/jobs/' + id + '/events');
    es.onmessage = function (ev) { try { onJob(JSON.parse(ev.data)); } catch (e) {} };
    es.onerror = function () { if (es && es.readyState === 2) { stopWatch(); poll(id); } };
  }
  function showDone(j) {
    if (j.id) jobId = j.id;
    idle();
    var id = j.id || jobId, f = j.files || {};
    var mp3 = f.mp3 || (API + '/api/jobs/' + id + '/files/preview.mp3');
    var flac = f.flac || (API + '/api/jobs/' + id + '/files/performance.flac');
    var rec = f.record || (API + '/records/' + id + '.json');
    $('perform-audio').src = mp3;
    $('perform-mp3').href = mp3;
    $('perform-flac').href = flac;
    $('perform-record').href = rec;
    $('perform-out').hidden = false;
    $('perform-bar').value = 100;
    if (window.NCLive) NCLive.open({id: id, flac: flac, mp3: mp3, record: rec});
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + id);
    status('Done. CC BY-SA 4.0. Pitch was not shifted.');
    $('perform-meta').textContent = 'Unlisted audio is kept 90 days unless you press Keep. Listed audio waits a day, then joins the feed.';
    fetch(rec).then(function (r) { return r.ok ? r.json() : null; }).then(function (body) {
      if (!body) return;
      var signed = body.signature && body.signature.status === 'SIGNED';
      $('perform-meta').textContent = (signed ? 'Signed record. ' : 'Record. ') + $('perform-meta').textContent;
    }).catch(function () {});
  }
  function fail(msg) {
    idle();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    $('perform-out').hidden = true;
    if (window.NCLive) NCLive.hide();
    $('performBtn').textContent = jobId ? 'Perform again' : 'Perform';
    status(soften(msg) || 'That Performance did not finish. Try again in a moment.', true);
  }
  function claim(id, value) {
    sessionStorage.setItem('nc-claim:' + id, value);
    var el = $('perform-claim');
    el.hidden = false;
    el.textContent = 'Keep key, shown once: ' + value + ' — this tab remembers it.';
  }
  function post(S, tok) {
    return fetch(API + '/api/perform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: S.t, composer: S.by, composition: S.c, performance: S.p,
        visibility: $('perform-public').checked ? 'public' : 'unlisted',
        turnstile_token: tok || undefined,
        perform_again: !!jobId
      })
    }).then(function (r) { return read(r).then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); }, function () {
      return { ok: false, status: 0, j: {} };
    }).then(function (x) {
      token = null;
      if (widget != null && window.turnstile) { try { window.turnstile.reset(widget); } catch (e) {} }
      if (!x.ok) { fail(messageFor(x.status, x.j)); return; }
      jobId = x.j.id;
      sessionStorage.setItem('nc-perform-job', jobId);
      if (x.j.claim_token) claim(jobId, x.j.claim_token);
      $('perform-turnstile').hidden = true;
      $('perform-out').hidden = true;
      if (window.NCLive) NCLive.hide();
      $('perform-bar').hidden = false;
      $('perform-bar').value = 0;
      status(x.j.position ? 'Queued · position ' + x.j.position : 'Queued…');
      watch(jobId);
    });
  }
  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve();
    return new Promise(function (ok, no) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = function () { ok(); };
      s.onerror = function () { no(new Error('The bot check did not load.')); };
      document.head.appendChild(s);
    });
  }
  function askToken() {
    if (!cfg || !cfg.turnstile_required) return Promise.resolve('');
    if (token) return Promise.resolve(token);
    var box = $('perform-turnstile');
    box.hidden = false;
    status('One check, then it starts.');
    return loadTurnstile().then(function () {
      return new Promise(function (ok, no) {
        var opts = {
          sitekey: cfg.turnstile_sitekey,
          callback: function (t) { token = t; ok(t); },
          'error-callback': function () { no(new Error('The bot check did not load. This address may need to be added to the NC Perform widget.')); },
          'expired-callback': function () { token = null; }
        };
        if (widget == null) widget = window.turnstile.render(box, opts);
        else window.turnstile.reset(widget);
      });
    });
  }
  function go() {
    if (busy || !window.NC) return;
    var S = NC.state();
    if (!S.c) { status('Write a Composition first.', true); return; }
    var max = (cfg && cfg.max_words) || 4000, words = S.c + '\n' + S.p;
    if (words.length > max) { status('Those words are ' + words.length + ' characters. The limit is ' + max + '.', true); return; }
    busy = true;
    $('performBtn').disabled = true;
    $('performBtn').textContent = 'Performing…';
    if (jobId) {
      $('perform-out').hidden = true;
      $('perform-bar').hidden = true;
      if (window.NCLive) NCLive.hide();
    }
    $('perform-public').disabled = true;
    $('perform-keep').textContent = 'Keep';
    $('perform-keep').disabled = true;
    $('perform-claim').hidden = true;
    askToken().then(function (tok) { return post(S, tok); }).catch(function (e) {
      fail(e && e.message ? e.message : 'Perform did not answer. The service may be down. Try again in a moment.');
    });
  }
  function withClaim(path, body, done) {
    var tokenNow = sessionStorage.getItem('nc-claim:' + jobId);
    if (!jobId || !tokenNow) { status('This tab does not have the keep key for this Performance.', true); return; }
    fetch(API + '/api/jobs/' + jobId + '/' + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ claim_token: tokenNow }, body))
    }).then(function (r) { return read(r).then(function (j) { return { ok: r.ok, j: j }; }); }).then(done).catch(function () {
      status('Perform did not answer. The service may be down. Try again in a moment.', true);
    });
  }
  function resume() {
    var id = sessionStorage.getItem('nc-perform-job');
    if (!id) return;
    jobId = id;
    fetch(API + '/api/jobs/' + id).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j || busy) return;
      if (j.state === 'done') showDone(j);
      else if (j.state === 'failed' || j.state === 'rejected') fail(j.error || j.state);
      else { busy = true; $('performBtn').disabled = true; $('performBtn').textContent = 'Performing…'; $('perform-public').disabled = true; onJob(j); watch(id); }
    }).catch(function () {});
  }
  function boot() {
    fetch(API + '/api/config').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (c) {
      cfg = c;
      if (!c.perform_enabled) { $('performBtn').disabled = true; status('Perform is resting until tomorrow.', true); return; }
      $('performBtn').disabled = false;
      status('Up to 3 minutes. Three every 10 minutes, ten a day.');
      resume();
    }).catch(function () {
      $('performBtn').disabled = true;
      status('Perform did not answer. The service may be down. Try again in a moment.', true);
    });
  }
  $('performBtn').onclick = go;
  $('perform-edit').onclick = function (e) {
    e.preventDefault();
    var box = $('perf');
    $('perf-box').scrollIntoView({behavior: 'smooth', block: 'center'});
    box.focus();
  };
  $('perform-keep').onclick = function () {
    withClaim('keep', {}, function (x) {
      if (!x.ok) { status(x.j.error || 'Could not keep this audio.', true); return; }
      $('perform-keep').textContent = 'Kept';
      $('perform-keep').disabled = true;
      status('Audio kept.');
    });
  };
  $('perform-public').addEventListener('change', function () {
    if (!jobId || busy) return;
    var vis = $('perform-public').checked ? 'public' : 'unlisted';
    withClaim('visibility', { visibility: vis }, function (x) {
      if (!x.ok) { status(x.j.error || 'Could not change who can find it.', true); return; }
      status(vis === 'public' ? 'It will be listed after a day, and the audio is kept.' : 'Unlisted. Only someone with the link can play it.');
    });
  });
  window.NCPerform = { api: API, messageFor: messageFor, go: go, post: post, showDone: showDone, fail: fail };
  var booted = false;
  var wait = setInterval(function () {
    if (!document.body.getAttribute('data-ready') || booted) return;
    booted = true; clearInterval(wait); boot();
  }, 100);
})();
