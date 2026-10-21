// Hosted Perform. The API base is the one value to change when this moves to a custom domain.
(function () {
  'use strict';
  var API = 'https://nc-perform-api.psemme.workers.dev';
  function $(id) { return document.getElementById(id); }
  function testerToken() {
    try { return localStorage.getItem('nc_tester') || ''; } catch (e) { return ''; }
  }
  function paintTester() {
    var el = $('foot-tester');
    if (!el) return;
    var on = !!testerToken();
    el.hidden = !on;
    el.textContent = on ? 'tester' : '';
  }
  // ?tester=<token> is a hidden pass. Store it, then drop it from the address
  // so a copied link or the back button does not carry it. ?tester=off clears it.
  (function takeTester() {
    var params;
    try { params = new URLSearchParams(location.search); } catch (e) { paintTester(); return; }
    if (!params.has('tester')) { paintTester(); return; }
    var value = String(params.get('tester') || '').replace(/[\r\n]/g, '').trim();
    try {
      if (!value || value === 'off') localStorage.removeItem('nc_tester');
      else localStorage.setItem('nc_tester', value);
    } catch (e) {}
    params.delete('tester');
    var q = params.toString();
    try { history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash); } catch (e2) {}
    paintTester();
  })();
  function apiHeaders() {
    var h = { 'Content-Type': 'application/json' };
    var pass = testerToken();
    if (pass) h['X-NC-Tester'] = pass;
    return h;
  }
  function localClock(d) {
    if (!d || isNaN(d.getTime())) return '';
    var h = d.getHours(), m = d.getMinutes(), ap = h < 12 ? 'AM' : 'PM';
    h = h % 12;
    if (!h) h = 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
  }
  function limitWhen(j) {
    if (!j || typeof j !== 'object') return null;
    var iso = j.retry_at || j.retry_after_at || '';
    if (!iso && typeof j.retry_after === 'string') iso = j.retry_after;
    if (!iso && typeof j.retry_after_s === 'string' && isNaN(Number(j.retry_after_s))) iso = j.retry_after_s;
    if (iso) {
      var parsed = Date.parse(iso);
      if (!isNaN(parsed)) return new Date(parsed);
    }
    var sec = null;
    if (typeof j.retry_after_s === 'number') sec = j.retry_after_s;
    else if (typeof j.retry_after_s === 'string' && j.retry_after_s.trim() !== '' && !isNaN(Number(j.retry_after_s))) sec = Number(j.retry_after_s);
    else if (typeof j.retry_after === 'number') sec = j.retry_after;
    if (sec == null || !isFinite(sec) || sec < 0) {
      if (j.error && typeof j.error === 'object') return limitWhen(j.error);
      return null;
    }
    return new Date(Date.now() + sec * 1000);
  }
  function limitMessage(j) {
    var when = limitWhen(j);
    var clock = when ? localClock(when) : '';
    return clock ? 'Daily limit reached. Try again after ' + clock + '.' : '';
  }
  var cfg = null, widget = null, token = null, jobId = null, es = null, pollT = null, busy = false, running = false, alive = 0, stopping = false, cancelOk = true;
  var gatherOn = false, gatherId = '', gatherClaim = '', gatherJobId = '', gatherSounds = null, gatherClock = null, phase = '', gatherGen = 0, gatherAbort = null;
  var gatherNames = [], gatherLive = [], playerJob = '', assembleTimer = null, warmAsked = false, warmSent = false;
  var clipBuffers = {}, clipJobs = {}, decodeCtx = null, localPlan = null, localUrl = '', asmGen = 0;
  var preview = new Audio(), previewBtn = null;
  preview.preload = 'none';
  preview.addEventListener('ended', function () { stopPreview(); });

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
    var limited = limitMessage(j);
    if (limited) return limited;
    var raw = soften(j && j.error);
    if (code === 429) return raw || 'Too many Performs from this network (3 every 10 minutes, 10 a day). Try again in a few minutes.';
    if (code === 503) return 'Perform is resting or busy. Try again in a moment.';
    if (!code || code >= 500) return 'Perform did not answer. The service may be down. Try again in a moment.';
    if (code === 403 && j && j.code === 'turnstile') {
      var errors = Array.isArray(j.turnstile_errors) && j.turnstile_errors.length ? j.turnstile_errors.join(', ') : 'no siteverify code';
      var host = typeof j.hostname === 'string' && j.hostname ? ' (' + j.hostname + ')' : '';
      return (raw || 'The bot check failed. Reload the page and try again.') + ' [' + errors + ']' + host;
    }
    return raw || 'Perform did not start. Try again in a moment.';
  }
  function read(r) {
    return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { return { error: '' }; } });
  }
  function idle() {
    busy = false;
    $('perform-public').disabled = false;
    syncActions();
  }
  function syncActions() {
    var gBtn = $('gatherBtn'), pBtn = $('performBtn'), again = $('gather-again'), box = $('gather-box');
    var on = !!(cfg && cfg.perform_enabled);
    var chords = !!(window.NC && NC.timeline && NC.timeline());
    var can = on && chords;
    var has = !!(gatherSounds && gatherSounds.length);
    if (gBtn) {
      gBtn.hidden = !gatherOn || has || phase === 'perform';
      gBtn.disabled = !can || busy || phase === 'gather';
      gBtn.textContent = phase === 'gather' ? 'Gathering…' : 'Gather';
    }
    if (again) {
      again.hidden = !gatherOn || !has;
      again.disabled = !can || busy;
      again.textContent = phase === 'gather' ? 'Gathering…' : 'Gather again';
    }
    if (box) box.hidden = !(has || (phase === 'gather' && gatherLive.length));
    pBtn.hidden = gatherOn && !has && phase !== 'perform';
    pBtn.disabled = !can || busy || (gatherOn && !has && phase !== 'perform');
    if (phase === 'perform' && busy && !playerJob) pBtn.textContent = (gatherOn && gatherId) ? 'Assembling…' : 'Performing…';
    else if (phase === 'perform' && busy) pBtn.textContent = 'Perform';
    else pBtn.textContent = (jobId || localPlan) ? 'Perform again' : 'Perform';
  }
  function stopWatch() {
    if (pollT) { clearTimeout(pollT); pollT = null; }
    if (es) { var cur = es; es = null; cur.close(); }
  }
  var serverSeed = null, take = null, takeHeard = false;
  function asOrigin(v) {
    if (v == null || v === '') return '';
    if (typeof v === 'string') return v.trim();
    if (typeof v === 'object') return String(v.name || v.title || v.id || '').trim();
    return '';
  }
  function takeSeed(j) {
    if (!j || !Object.prototype.hasOwnProperty.call(j, 'seed') || j.seed == null || j.seed === '') return;
    serverSeed = j.seed;
  }
  function trimText(v) {
    if (v == null || v === false || v === '') return '';
    if (typeof v === 'string') return v.trim();
    if (typeof v === 'object') return String(v.note || v.message || '').trim();
    return '';
  }
  function showTrim(text) {
    var el = $('perform-trim');
    if (!el) return;
    if (!text) { el.hidden = true; el.textContent = ''; return; }
    el.hidden = false;
    el.textContent = text;
  }
  function foundLines(j) {
    var bags = [];
    function takeBag(v) {
      if (Array.isArray(v)) bags = bags.concat(v);
      else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { bags.push(v[k] && typeof v[k] === 'object' ? Object.assign({key: v[k].key || k}, v[k]) : {title: v[k], key: k}); });
    }
    ['found', 'sounds', 'sources', 'found_sounds'].forEach(function (k) { if (j && Object.prototype.hasOwnProperty.call(j, k)) takeBag(j[k]); });
    var out = [], seen = {};
    bags.forEach(function (item) {
      var title = '', origin = '';
      if (typeof item === 'string') title = item.trim();
      else if (item && typeof item === 'object') {
        title = String(item.title || item.name || item.sound || '').trim();
        origin = asOrigin(item.source || item.supplier || item.origin || item.from);
      }
      if (!title && !origin) return;
      var line = title && origin ? title + ', from ' + origin + '.' : (title || ('From ' + origin + '.'));
      if (seen[line]) return;
      seen[line] = 1;
      out.push(line);
    });
    if (out.length > 6) {
      var extra = out.length - 6;
      out = out.slice(0, 6);
      out.push('And ' + extra + ' more.');
    }
    return out;
  }
  function showStory(j) {
    takeSeed(j);
    var note = trimText(j && j.trimmed);
    if (note) showTrim(note);
    var s = $('perform-status');
    s.className = 'm story';
    s.textContent = '';
    var head = (j && (j.stage_line || j.stage || j.state)) || 'Working…';
    if (j && j.position && String(head).indexOf(String(j.position)) < 0) head += ' · position ' + j.position;
    s.appendChild(node('span', 'story-line', head));
    foundLines(j).forEach(function (line) { s.appendChild(node('span', 'story-line', line)); });
  }
  function sourceCredit(s) {
    var sup = s && s.supplier;
    if (!sup || typeof sup !== 'object') return null;
    var name = String(sup.display_name || sup.name || '').trim();
    var href = String(sup.primary_link || sup.url || sup.link || '').trim();
    if (!/^https?:\/\//i.test(href)) href = '';
    if (!name && !href) return null;
    return {name: name || href, href: href, key: sup.registry_id != null && sup.registry_id !== '' ? 'id:' + sup.registry_id : (href || name).toLowerCase()};
  }
  function footSources(sounds) {
    var el = $('foot-src');
    if (!el) return;
    el.textContent = '';
    var seen = {}, items = [];
    (Array.isArray(sounds) ? sounds : []).forEach(function (s) {
      var c = sourceCredit(s);
      if (!c || seen[c.key]) return;
      seen[c.key] = 1;
      items.push(c);
    });
    if (!items.length) { el.textContent = 'sounds from openly licensed sources'; return; }
    items.forEach(function (c, i) {
      if (i) el.appendChild(document.createTextNode(', '));
      if (!c.href) { el.appendChild(document.createTextNode(c.name)); return; }
      var a = document.createElement('a');
      a.href = c.href;
      a.textContent = c.name;
      el.appendChild(a);
    });
  }
  function clearStrip() {
    var bar = $('src-time'), lanes = $('src-lanes'), now = $('src-now');
    if (bar) bar.hidden = true;
    if (lanes) lanes.textContent = '';
    if (now) now.textContent = '';
  }
  function clearPlanView() {
    var list = $('plan-src'), seed = $('plan-seed');
    if (list) { list.textContent = ''; list.hidden = true; }
    if (seed) { seed.textContent = ''; seed.hidden = true; }
  }
  function clearTake() {
    take = null;
    takeHeard = false;
    clearStrip();
    clearPlanView();
    showTrim('');
    footSources([]);
  }
  function armTake(rec) {
    take = null;
    clearStrip();
    if (!rec || typeof rec !== 'object') return;
    var p = rec.performance || {};
    var timeline = Array.isArray(p.timeline) ? p.timeline : [];
    var sounds = Array.isArray(rec.sounds_used) ? rec.sounds_used : [];
    var spans = [];
    sounds.forEach(function (s) {
      (Array.isArray(s.spans) ? s.spans : []).forEach(function (sp) {
        if (!sp || typeof sp.at_s !== 'number' || typeof sp.len_s !== 'number' || !(sp.len_s > 0)) return;
        spans.push({at: sp.at_s, len: sp.len_s, title: String(s.title || s.key || sp.key || '').trim(), origin: asOrigin(s.source) || asOrigin(s.supplier), key: String(s.key || sp.key || '')});
      });
    });
    if (!timeline.length && !spans.length) return;
    var dur = typeof p.duration_s === 'number' ? p.duration_s : 0;
    timeline.forEach(function (c) { if (c && typeof c.end_s === 'number' && c.end_s > dur) dur = c.end_s; });
    spans.forEach(function (sp) { if (sp.at + sp.len > dur) dur = sp.at + sp.len; });
    if (!(dur > 0)) return;
    var keys = {}, list = [];
    spans.forEach(function (sp) { if (sp.key && !keys[sp.key]) { keys[sp.key] = 1; list.push(sp.key); } });
    var byOrigin = list.length > 8;
    var groups = {}, order = [];
    spans.forEach(function (sp) {
      var id = byOrigin ? (sp.origin || sp.title || sp.key || 'sound') : (sp.key || sp.title || sp.origin || 'sound');
      if (!groups[id]) { groups[id] = {label: byOrigin ? (sp.origin || sp.title || sp.key) : (sp.title || sp.origin || sp.key), spans: []}; order.push(id); }
      groups[id].spans.push(sp);
    });
    take = {timeline: timeline, groups: groups, order: order, duration: dur};
    var lanes = $('src-lanes');
    if (!lanes || !order.length) return;
    $('src-time').hidden = false;
    order.forEach(function (id) {
      var g = groups[id], lane = node('div', 'src-lane'), track = node('div', 'src-track');
      lane.title = g.label;
      lane.setAttribute('aria-label', g.label);
      lane.addEventListener('click', function () { var now = $('src-now'); if (now) now.textContent = g.label; });
      g.spans.forEach(function (sp) {
        var mark = node('div', 'src-span');
        mark.style.left = (100 * sp.at / dur) + '%';
        mark.style.width = Math.max(0.4, 100 * sp.len / dur) + '%';
        track.appendChild(mark);
      });
      var head = node('div', 'src-head');
      head.style.left = '0%';
      track.appendChild(head);
      g.head = head;
      lane.appendChild(track);
      lanes.appendChild(lane);
    });
  }
  function soundsAt(t) {
    if (!take) return '';
    var best = '', bestAt = -1, i;
    take.order.forEach(function (id) {
      var g = take.groups[id];
      for (i = 0; i < g.spans.length; i++) {
        var sp = g.spans[i];
        if (t >= sp.at && t < sp.at + sp.len && sp.at >= bestAt && g.label) { bestAt = sp.at; best = g.label; }
      }
    });
    return best;
  }
  function followTake() {
    if (!take || !takeHeard) return;
    var audio = $('perform-audio');
    if (!audio) return;
    var t = audio.currentTime || 0;
    var now = $('src-now');
    if (now) now.textContent = soundsAt(t);
    var idx = -1, i, c;
    for (i = 0; i < take.timeline.length; i++) {
      c = take.timeline[i];
      if (!c || typeof c.start_s !== 'number' || typeof c.end_s !== 'number') continue;
      if (t >= c.start_s && t < c.end_s) { idx = typeof c.chord_index === 'number' ? c.chord_index : i; break; }
    }
    document.querySelectorAll('#prog .ch.on').forEach(function (e) { e.classList.remove('on'); });
    if (idx >= 0) { var tile = $('ch' + idx); if (tile) tile.classList.add('on'); }
    var left = Math.max(0, Math.min(100, 100 * t / take.duration));
    take.order.forEach(function (id) { if (take.groups[id].head) take.groups[id].head.style.left = left + '%'; });
  }
  function onJob(j) {
    if (!j) return;
    takeSeed(j);
    if (j.state === 'done') { stopWatch(); showDone(j); return; }
    if (j.state === 'failed' || j.state === 'rejected') { stopWatch(); fail(limitMessage(j) || soften(j.error) || 'That Performance did not finish. Try again in a moment.'); return; }
    if (j.state === 'cancelled' || j.state === 'canceled' || j.state === 'stopped') { stopWatch(); stopped(); return; }
    if (fromCollection()) {
      if (previewSignaled(j) || (j.files && j.files.mp3)) armPlayer(j);
      else if (!playerJob) { status('Assembling…'); showStop(); }
      $('perform-bar').hidden = true;
      return;
    }
    showStory(j);
    var bar = $('perform-bar');
    bar.hidden = false; bar.value = j.percent || 0;
    showStop();
  }
  function ended(state) {
    return state === 'done' || state === 'failed' || state === 'rejected' || state === 'cancelled' || state === 'canceled' || state === 'stopped';
  }
  function poll(id, handler) {
    var mine = alive;
    var on = handler || onJob;
    fetch(API + '/api/jobs/' + id).then(function (r) { return read(r).then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); }).then(function (x) {
      if (mine !== alive) return;
      if (!x || !x.ok || !x.j || !x.j.state) {
        if (phase === 'gather') gatherFail(gatherNote(x && !x.ok ? '[status ' + x.status + ']' : '[result unreadable]', x));
        else fail('Perform did not answer. The service may be down. Try again in a moment.');
        return;
      }
      on(x.j);
      if (!ended(x.j.state) && mine === alive) pollT = setTimeout(function () { if (mine === alive) poll(id, on); }, 2000);
    }).catch(function (err) {
      if (mine !== alive) return;
      if (phase === 'gather') gatherFail(gatherNote('[network]', err));
      else fail('Perform did not answer. The service may be down. Try again in a moment.');
    });
  }
  function watch(id, handler) {
    stopWatch();
    var mine = alive;
    var on = handler || onJob;
    if (!window.EventSource) { poll(id, on); return; }
    es = new EventSource(API + '/api/jobs/' + id + '/events');
    es.onmessage = function (ev) {
      if (mine !== alive) return;
      try { on(JSON.parse(ev.data)); } catch (e) {}
    };
    es.onerror = function () { if (mine !== alive) return; if (es && es.readyState === 2) { stopWatch(); poll(id, on); } };
  }
  function showStop() {
    var btn = $('perform-stop');
    if (!btn) return;
    if (!cancelOk) { btn.hidden = true; return; }
    if (phase === 'gather') { btn.hidden = false; if (!stopping) btn.disabled = false; return; }
    if (!running || !jobId) { btn.hidden = true; return; }
    btn.hidden = false;
    if (!stopping) btn.disabled = false;
  }
  function hideStop() {
    var btn = $('perform-stop');
    if (!btn) return;
    btn.hidden = true;
    btn.disabled = false;
  }
  var recordText = '', recordName = 'performance.record.json', keeping = false, viewGen = 0, keptBlobs = [];
  function node(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== '') n.textContent = text;
    return n;
  }
  function extLink(href, text) {
    if (!/^https?:\/\//i.test(String(href || ''))) return node('span', '', text || '');
    var a = document.createElement('a');
    a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = text || href;
    return a;
  }
  function recRow(label, value) {
    if (value == null || value === '') return null;
    var row = node('div', 'rec-row');
    row.appendChild(node('div', 'rec-k', label));
    var cell = node('div');
    if (value && value.nodeType) cell.appendChild(value);
    else cell.appendChild(node('span', '', String(value)));
    row.appendChild(cell);
    return row;
  }
  function put(parent, child) { if (child) parent.appendChild(child); }
  function licenseLabel(id) {
    var map = {
      'CC0-1.0': 'CC0 1.0', 'CC-BY-3.0': 'CC BY 3.0', 'CC-BY-4.0': 'CC BY 4.0',
      'CC-BY-SA-3.0': 'CC BY-SA 3.0', 'CC-BY-SA-4.0': 'CC BY-SA 4.0',
      'PDM-1.0': 'Public domain', 'PD': 'Public domain', 'PD-equivalent': 'Public domain'
    };
    return map[id] || id || '';
  }
  function licenseOf(L) {
    if (!L) return null;
    if (typeof L === 'string') return L.trim() ? { name: L.trim(), href: '' } : null;
    var href = /^https?:\/\//i.test(L.uri || '') ? L.uri : (/^https?:\/\//i.test(L.url || '') ? L.url : '');
    var name = L.name || licenseLabel(L.id || '');
    if (!name && !href) return null;
    return { name: name || href, href: href };
  }
  function licenseNode(L) {
    var lic = licenseOf(L);
    if (!lic) return null;
    return lic.href ? extLink(lic.href, lic.name) : node('span', '', lic.name);
  }
  function whenText(p, rec) {
    var utc = p.performed_at || '', local = p.performed_at_local || '', created = rec.created_at || '';
    var bits = [];
    if (local) bits.push(local);
    if (utc) bits.push(/Z$/i.test(utc) ? utc + ' UTC' : utc);
    if (!bits.length && created) bits.push(created);
    var stamp = utc || (!local && created) || '';
    if (stamp && !local) {
      var d = new Date(stamp);
      if (!isNaN(d.getTime())) bits.unshift(d.toLocaleString());
    }
    return bits.join(' · ');
  }
  function performerText(p) {
    var it = p.interpreter || {}, who = p.performer || {}, parts = [];
    if (who.name) parts.push(String(who.name));
    if (it.label) parts.push(String(it.label));
    if (it.model && parts.join(' ').indexOf(String(it.model)) < 0) parts.push(String(it.model));
    if (!it.label && !it.model && it.kind) parts.push(String(it.kind));
    return parts.filter(Boolean).join(' · ');
  }
  function soundItem(s) {
    if (!s || typeof s !== 'object') return null;
    var li = node('li');
    var title = s.title || s.key || '';
    var page = typeof s.source_url === 'string' ? s.source_url : '';
    var audio = s.audio_used && typeof s.audio_used.url === 'string' ? s.audio_used.url : '';
    if (title) li.appendChild(/^https?:\/\//i.test(page) ? extLink(page, title) : node('span', '', title));
    else if (/^https?:\/\//i.test(page)) li.appendChild(extLink(page, page));
    if (audio && audio !== page && /^https?:\/\//i.test(audio)) {
      if (li.childNodes.length) li.appendChild(document.createTextNode(' · '));
      li.appendChild(extLink(audio, 'audio'));
    }
    if (s.author) li.appendChild(document.createTextNode((li.childNodes.length ? ' · ' : '') + s.author));
    var lic = licenseNode(s.license);
    if (lic) {
      if (li.childNodes.length) li.appendChild(document.createTextNode(' · '));
      li.appendChild(lic);
    }
    if (s.credit_line && !title) li.appendChild(node('span', '', (li.childNodes.length ? ' · ' : '') + s.credit_line));
    var roles = Array.isArray(s.roles) ? s.roles.filter(Boolean).join(', ') : '';
    if (roles) li.appendChild(document.createTextNode(' · ' + roles));
    return li.childNodes.length ? li : null;
  }
  function clearRecord() {
    recordText = '';
    $('perform-record-view').hidden = true;
    $('perform-record-view').textContent = '';
    $('perform-json').hidden = true;
    $('perform-json').open = false;
    $('perform-json-pre').textContent = '';
  }
  function recordMiss() {
    clearRecord();
    $('perform-record-view').hidden = false;
    $('perform-record-view').appendChild(node('p', 'm', 'The signed record did not load. Try again in a moment.'));
    $('perform-sources').open = true;
  }
  function showRecord(rec, id) {
    var view = $('perform-record-view');
    view.textContent = '';
    view.hidden = false;
    if (!rec || typeof rec !== 'object') { recordMiss(); return; }
    var p = rec.performance || {};
    var cref = p.composition_ref || {};
    var words = cref.words_verbatim || {};
    var composer = cref.composer;
    var composerName = composer && typeof composer === 'object' ? (composer.display_name || '') : (typeof composer === 'string' ? composer : '');
    put(view, recRow('Title', p.title || ''));
    put(view, recRow('Composer', composerName));
    put(view, recRow('When', whenText(p, rec)));
    if (words.composition || cref.composition) {
      var comp = node('blockquote');
      comp.textContent = words.composition || cref.composition;
      put(view, recRow('Composition', comp));
    }
    put(view, recRow('Performer', performerText(p)));
    if (words.performance) {
      var notes = node('blockquote');
      notes.textContent = words.performance;
      put(view, recRow('Performance notes', notes));
    }
    var sounds = Array.isArray(rec.sounds_used) ? rec.sounds_used : [];
    var items = sounds.map(soundItem).filter(Boolean);
    if (items.length) {
      view.appendChild(node('h3', '', 'Sounds'));
      var ul = node('ul');
      items.forEach(function (li) { ul.appendChild(li); });
      view.appendChild(ul);
    }
    var outLic = licenseNode(p.license_out);
    put(view, recRow('Output license', outLic));
    put(view, recRow('Job', id || ''));
    var rh = rec.record_hash || {};
    if (rh.value) {
      var code = node('code', '', rh.value);
      put(view, recRow('Record hash', code));
    }
    var sig = rec.signature || {};
    var sigBits = [sig.status, sig.algorithm, sig.key_id, sig.signed_by].filter(function (x) { return x; });
    if (sigBits.length || sig.value) {
      var box = node('div');
      if (sigBits.length) box.appendChild(node('div', '', sigBits.join(' · ')));
      if (sig.value) box.appendChild(node('code', '', String(sig.value)));
      put(view, recRow('Signature', box));
    }
    if (rh.over || id) {
      var note = node('p', 'm');
      if (rh.over) note.appendChild(node('span', '', rh.over + (id ? ' ' : '')));
      if (id) note.appendChild(extLink(API + '/api/verify/' + encodeURIComponent(id), 'Check this record'));
      note.appendChild(node('span', '', '.'));
      view.appendChild(note);
    }
    view.appendChild(node('p', 'm', 'Peter Semmelhack'));
    footSources(sounds);
    armTake(rec);
    if (p.title) $('perform-title').textContent = p.title;
    recordText = JSON.stringify(rec, null, 1) + '\n';
    recordName = (id || 'performance') + '.record.json';
    $('perform-json-pre').textContent = recordText;
    $('perform-json').hidden = false;
    $('perform-json').open = false;
    var signed = sig.status === 'SIGNED';
    var base = 'Unlisted audio is kept 90 days unless you press Keep. Listed audio waits a day, then joins the feed.';
    $('perform-meta').textContent = (signed ? 'Signed record. ' : (sig.status ? 'Record. ' : '')) + base;
  }
  function keepNote() {
    var note = $('perform-keep-note');
    var label = $('perform-keep').textContent;
    if (label.indexOf('Kept') === 0 || label.indexOf('Saved') === 0) { note.hidden = true; return; }
    note.hidden = false;
    if (localPlan && browserAssembly()) {
      note.textContent = $('perform-public').checked
        ? 'Listing it makes this public after a day. Save stores the sound you hear.'
        : 'Save stores the sound you hear. It stays unlisted.';
      return;
    }
    note.textContent = $('perform-public').checked
      ? 'Listing it makes this public after a day, and keeps the audio. Keep itself does not list it.'
      : 'Keep holds the audio past 90 days. It stays unlisted.';
  }
  function dialText(d) {
    if (!d) return '';
    var cut = d.cutoff_hz == null ? 'open' : (d.cutoff_hz >= 1000 ? (d.cutoff_hz / 1000).toFixed(d.cutoff_hz >= 10000 ? 0 : 1) + ' kHz' : d.cutoff_hz + ' Hz');
    return 'Dials: cutoff ' + cut + ', delay ' + (d.delay_timing || '') + ', feedback ' + Math.round((d.feedback || 0) * 100) + '%, mix ' + Math.round((d.wet || 0) * 100) + '% wet.';
  }
  function keptLine(j) {
    var id = j.id || jobId;
    var page = API + '/records/' + id;
    var parts = [j.processed ? 'Kept the dialed sound on the Performer.' : 'Kept on the Performer.'];
    if (j.keep && Object.prototype.hasOwnProperty.call(j, 'audio_expires_at') && j.audio_expires_at == null) parts.push('The audio no longer expires.');
    if (j.visibility === 'public') parts.push('It is public.');
    else if (j.visibility === 'unlisted') parts.push('It stays unlisted.');
    return { text: parts.join(' '), href: page, id: id };
  }
  function showKept(j, warn, local) {
    var box = $('perform-kept');
    box.textContent = '';
    box.className = warn ? 'm warn' : 'm';
    box.hidden = false;
    if (warn || !j) { box.textContent = j || ''; return; }
    var line = keptLine(j);
    box.appendChild(node('span', '', line.text + ' '));
    if (j.dials || (local && local.dials)) box.appendChild(node('div', '', dialText(j.dials || local.dials)));
    if (local && local.note) box.appendChild(node('div', '', local.note));
    if (local && local.wav) {
      var wavA = document.createElement('a');
      wavA.href = local.wav;
      wavA.download = local.wavName;
      wavA.textContent = 'Dialed sound (WAV)';
      box.appendChild(wavA);
      if (local.jsonUrl) {
        box.appendChild(node('span', '', ' · '));
        var jsonA = document.createElement('a');
        jsonA.href = local.jsonUrl;
        jsonA.download = local.jsonName;
        jsonA.textContent = 'Dial settings';
        box.appendChild(jsonA);
      }
    }
    if (local && local.wav) box.appendChild(document.createElement('br'));
    var a = extLink(line.href, line.href);
    box.appendChild(a);
    box.appendChild(node('span', '', ' '));
    var copy = node('button', '', 'Copy link');
    copy.type = 'button';
    copy.onclick = function () {
      var done = function () { copy.textContent = 'Copied'; setTimeout(function () { copy.textContent = 'Copy link'; }, 1200); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(line.href).then(done, done);
      else done();
    };
    box.appendChild(copy);
  }
  function applyKept(j, local) {
    keeping = false;
    $('perform-keep').textContent = 'Kept ✓';
    $('perform-keep').disabled = true;
    $('perform-keep-note').hidden = true;
    showKept(j, false, local);
  }
  function dropKeptFiles() {
    keptBlobs.forEach(function (u) { URL.revokeObjectURL(u); });
    keptBlobs = [];
  }
  function localKept(out) {
    var wavUrl = URL.createObjectURL(out.blob);
    var jsonUrl = URL.createObjectURL(new Blob([JSON.stringify({dials: out.dials, audio_sha256: out.sha256}, null, 1) + '\n'], {type: 'application/json'}));
    keptBlobs.push(wavUrl, jsonUrl);
    var id = jobId || 'performance';
    return {
      dials: out.dials, wav: wavUrl, wavName: id + '.live.wav', jsonUrl: jsonUrl, jsonName: id + '.live.dials.json',
      note: 'The Performer kept the original audio. It does not store a dialed file yet, so this WAV is the sound you hear.'
    };
  }
  function postProcessed(out) {
    var tokenNow = sessionStorage.getItem('nc-claim:' + jobId);
    var fd = new FormData();
    fd.append('claim_token', tokenNow);
    fd.append('dials', JSON.stringify(out.dials));
    fd.append('audio', out.blob, (jobId || 'performance') + '.live.wav');
    return fetch(API + '/api/jobs/' + jobId + '/keep', {method: 'POST', body: fd}).then(function (r) {
      return read(r).then(function (j) { return {ok: r.ok, j: j}; });
    }, function () { return {ok: false, j: {}}; });
  }
  function keepFail(msg, plain) {
    keeping = false;
    var local = !!(localPlan && browserAssembly());
    $('perform-keep').textContent = local ? 'Save' : 'Keep';
    $('perform-keep').disabled = !(localPlan && gatherClaim) && !sessionStorage.getItem('nc-claim:' + jobId);
    if (local) {
      var quiet = $('perform-status');
      quiet.className = 'm';
      quiet.textContent = '';
    }
    var clean = plain ? String(msg || '').replace(/\s+/g, ' ').trim() : soften(msg);
    var line = clean || (local ? 'Could not save this Performance. Try again in a moment.' : 'Could not keep this Performance. Try again in a moment.');
    if (!plain && clean && !/try again/i.test(clean)) line = clean + ' Try again in a moment.';
    showKept(line, true);
    keepNote();
  }
  var LANDING_MS = 60000;
  function retryFetch(url, gen) {
    var started = Date.now(), delay = 1000;
    function later(then) {
      if (gen !== viewGen) return Promise.resolve(null);
      var left = LANDING_MS - (Date.now() - started);
      if (left <= 0) return Promise.resolve(null);
      var waitMs = Math.min(delay, left);
      delay = Math.min(delay * 2, 8000);
      return new Promise(function (resolve) { setTimeout(resolve, waitMs); }).then(then);
    }
    function once() {
      if (gen !== viewGen) return Promise.resolve(null);
      var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      var kill = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 15000) : null;
      return fetch(url, {cache: 'no-store', signal: ctrl ? ctrl.signal : undefined}).then(function (r) {
        if (kill) clearTimeout(kill);
        if (gen !== viewGen) return null;
        if (r.ok) return r;
        return later(once);
      }, function () {
        if (kill) clearTimeout(kill);
        if (gen !== viewGen) return null;
        return later(once);
      });
    }
    return once();
  }
  function showDone(j) {
    if (fromCollection() || playerJob) { showAssembly(j); return; }
    alive++;
    running = false;
    phase = (gatherOn && gatherSounds && gatherSounds.length) ? 'collection' : '';
    hideStop();
    var gen = ++viewGen;
    takeSeed(j);
    if (j && Object.prototype.hasOwnProperty.call(j, 'trimmed')) showTrim(trimText(j.trimmed));
    dropKeptFiles();
    if (j.id) jobId = j.id;
    idle();
    keeping = false;
    var id = j.id || jobId, f = j.files || {};
    var mp3 = f.mp3 || (API + '/api/jobs/' + id + '/files/preview.mp3');
    var flac = f.flac || (API + '/api/jobs/' + id + '/files/performance.flac');
    var rec = f.record || (API + '/records/' + id + '.json');
    var page = f.page || (API + '/records/' + id);
    var metaUrl = API + '/api/jobs/' + id + '/files/meta.json';
    var audio = $('perform-audio');
    audio.crossOrigin = 'anonymous';
    audio.removeAttribute('src');
    try { audio.load(); } catch (e) {}
    takeHeard = false;
    $('perform-title').textContent = (window.NC && NC.state && NC.state().t) || 'Performance';
    $('perform-sources').open = false;
    $('perform-mp3').href = mp3;
    $('perform-flac').href = flac;
    $('perform-record').href = page;
    $('perform-record').target = '_blank';
    $('perform-record').rel = 'noopener';
    $('perform-out').hidden = false;
    $('perform-bar').hidden = true;
    $('perform-bar').value = 100;
    $('perform-keep').textContent = 'Keep';
    $('perform-kept').hidden = true;
    keepNote();
    clearRecord();
    clearStrip();
    if (window.NCLive) NCLive.hide();
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + id);
    var landing = 'The files are still landing.';
    status(landing);
    $('perform-meta').textContent = 'Unlisted audio is kept 90 days unless you press Keep. Listed audio waits a day, then joins the feed.';
    retryFetch(mp3, gen).then(function (r) {
      if (gen !== viewGen) return;
      if (!r) { audioMiss(); return; }
      if (r.body && r.body.cancel) { try { r.body.cancel(); } catch (e) {} }
      if (window.NCLive) NCLive.open({id: id, flac: flac, mp3: mp3, record: rec});
      status('Done. CC BY-SA 4.0. Pitch was not shifted.');
    });
    retryFetch(rec, gen).then(function (r) {
      if (gen !== viewGen) return null;
      if (!r) { recordMiss(); return null; }
      return r.text();
    }).then(function (t) {
      if (gen !== viewGen || t == null) return;
      try { showRecord(JSON.parse(t), id); } catch (e) { recordMiss(); }
    }).catch(function () { if (gen === viewGen) recordMiss(); });
    retryFetch(metaUrl, gen).then(function (r) {
      if (gen !== viewGen || !r) return null;
      return r.json();
    }).then(function (m) {
      if (gen !== viewGen || !m || !m.keep) return;
      applyKept(m);
    }).catch(function () {});
  }
  function showAssembly(j) {
    alive++;
    running = false;
    phase = (gatherSounds && gatherSounds.length) ? 'collection' : '';
    hideStop();
    stopAssembleProbe();
    var gen = ++viewGen;
    takeSeed(j);
    if (j && Object.prototype.hasOwnProperty.call(j, 'trimmed')) showTrim(trimText(j.trimmed));
    dropKeptFiles();
    if (j && j.id) jobId = j.id;
    idle();
    keeping = false;
    var u = fileUrls(j);
    var already = playerJob === u.id && !$('perform-out').hidden;
    if (!already) {
      clearRecord();
      clearStrip();
      if (window.NCLive) NCLive.hide();
      armPlayer(j);
    } else {
      $('perform-mp3').href = u.mp3;
      $('perform-flac').href = u.flac;
      $('perform-record').href = u.page;
    }
    $('perform-bar').hidden = true;
    $('perform-bar').value = 100;
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + u.id);
    retryFetch(u.rec, gen).then(function (r) {
      if (gen !== viewGen) return null;
      if (!r) { recordMiss(); return null; }
      return r.text();
    }).then(function (t) {
      if (gen !== viewGen || t == null) return;
      try { showRecord(JSON.parse(t), u.id); } catch (e) { recordMiss(); }
      if (gen !== viewGen) return;
      var meta = $('perform-meta');
      if (meta) meta.textContent = 'Unlisted audio is kept 90 days unless you press Keep. Listed audio waits a day, then joins the feed.';
    }).catch(function () { if (gen === viewGen) recordMiss(); });
    retryFetch(u.meta, gen).then(function (r) {
      if (gen !== viewGen || !r) return null;
      return r.json();
    }).then(function (m) {
      if (gen !== viewGen || !m || !m.keep) return;
      applyKept(m);
    }).catch(function () {});
  }
  function fail(msg) {
    alive++;
    running = false;
    stopping = false;
    hideStop();
    stopAssembleProbe();
    playerJob = '';
    viewGen++;
    phase = (gatherOn && gatherSounds && gatherSounds.length) ? 'collection' : '';
    idle();
    clearTake();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    $('perform-out').hidden = true;
    $('live').hidden = true;
    clearRecord();
    if (window.NCLive) NCLive.hide();
    status(soften(msg) || 'That Performance did not finish. Try again in a moment.', true);
  }
  function audioMiss(msg) {
    $('live').hidden = true;
    status(msg || 'This Performance came back, but its audio did not load into the player.', true);
  }
  function claim(id, value) {
    sessionStorage.setItem('nc-claim:' + id, value);
    var el = $('perform-claim');
    el.hidden = false;
    el.textContent = 'Keep key, shown once: ' + value + ' — this tab remembers it.';
  }
  // Assembly plan v1 (nc-performer ffd68ce). Probe: POST /api/gather {probe:true}.
  // 404 or a network failure means gather is absent, so Perform stays one-shot.
  //
  // found_sounds rows are {chord, id, title, supplier, license, preview_url, symbol}.
  // chord is the 0-based position. The clip is GET /api/jobs/{gather_id}/audio/{id}.
  // A finished gather includes sounds, claim_token, and clock (null means organic).
  // preview_ready plus files.mp3 opens the server-path player before the record.
  // The first focus of Composition sends GET /api/warm.
  //
  // When /api/config advertises browser_assembly, or assembly "browser", Perform
  // plays the cached clips here. clock.slots is the grid when clock.written is set.
  // Otherwise NCAssembly.chordSlots places one section of the gathered chords.
  // len_s is at most the clip's duration_s. Fades are 12 ms. gain_db is copied.
  // Save posts multipart /api/keep-take: gather_id, claim_token, take_state, audio,
  // title?, listed?, turnstile_token. take_state is {nc_take_version:'2', plan, processing}.
  // processing.schema is 2. processing.chain is [{id, type, version, bypass, params}], limiter last.
  // 200 done shows the page. 202 queued is polled. 400 rejected is shown as sent.
  function fromCollection() { return !!(gatherOn && gatherId); }
  function num(v) {
    if (typeof v === 'number' && isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '' && !isNaN(+v)) return +v;
    return null;
  }
  function soundOf(s, gid) {
    s = s || {};
    var supplier = s.supplier, credit = s.credit || '';
    if (supplier && typeof supplier === 'object') {
      credit = credit || supplier.credit || '';
      supplier = supplier.display_name || supplier.name || supplier.title || '';
    }
    var license = s.license;
    if (license && typeof license === 'object') license = license.name || licenseLabel(license.id || '') || '';
    var pos = num(s.pos);
    var chord = num(s.chord != null ? s.chord : s.chord_position);
    var index = num(s.chord_index);
    var slot = pos != null && pos >= 0 ? pos : (chord != null && chord >= 0 ? chord : (index != null && index >= 0 ? index : -1));
    var loud = s.loudness;
    var lufs = num(s.loudness_lufs != null ? s.loudness_lufs : (s.lufs != null ? s.lufs : (loud && typeof loud === 'object' ? (loud.lufs != null ? loud.lufs : loud.integrated) : loud)));
    var id = String(s.clip_id || s.id || s.key || '').trim();
    var audio = absoluteApi(s.preview_url || s.url || s.preview || '');
    if (!audio && id) audio = jobAudio(id, gid);
    return {
      slot: slot,
      symbol: String(s.symbol || s.chord_symbol || '').trim(),
      title: String(s.title || s.name || '').trim(),
      supplier: String(supplier || ''),
      license: String(license || ''),
      url: audio,
      cache: audio,
      clip_id: id,
      lufs: lufs,
      gain_db: num(s.gain_db),
      duration_s: num(s.duration_s),
      start_s: num(s.start_s) || 0,
      credit: String(credit || '')
    };
  }
  function absoluteApi(url) {
    url = String(url || '').trim();
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (url.charAt(0) === '/') return API + url;
    return '';
  }
  function jobAudio(id, gid) {
    gid = gid || gatherId || gatherJobId;
    if (!gid || !id) return '';
    return API + '/api/jobs/' + encodeURIComponent(gid) + '/audio/' + encodeURIComponent(id);
  }
  function foundList(j) {
    if (!j || j.found_sounds == null) return [];
    var v = j.found_sounds;
    if (Array.isArray(v)) return v;
    if (typeof v !== 'object') return [];
    return Object.keys(v).map(function (k) {
      var item = v[k], chord = num(k);
      if (item && typeof item === 'object') return chord != null && item.chord == null && item.chord_index == null ? Object.assign({ chord: chord }, item) : item;
      return { title: item, chord: chord };
    });
  }
  var GATHER = {
    probeBody: function () { return { probe: true }; },
    request: function (S, tok, excludeId) {
      var body = { composition: S.c, prompt: S.p || '' };
      if (tok) body.turnstile_token = tok;
      if (excludeId) {
        body.exclude_gather_id = excludeId;
        var claim = '';
        try { claim = sessionStorage.getItem('nc-claim:' + excludeId) || ''; } catch (e) {}
        if (!claim) claim = gatherClaim || '';
        if (claim) body.claim_token = claim;
      }
      return body;
    },
    performExtras: function (body, id, claim, prompt) {
      body.gather_id = id;
      body.claim_token = claim || '';
      body.prompt = prompt || '';
    },
    collection: function (raw) {
      if (!raw || typeof raw !== 'object') return null;
      var sounds = Array.isArray(raw.sounds) ? raw.sounds : (raw.result && Array.isArray(raw.result.sounds) ? raw.result.sounds : null);
      if (!sounds) { var found = foundList(raw); if (found.length) sounds = found; }
      if (!sounds || !sounds.length) return null;
      var id = raw.gather_id || raw.id || '';
      if (!id) return null;
      return {
        id: String(id),
        claim: raw.claim_token || '',
        clock: raw.clock === undefined ? null : raw.clock,
        sounds: sounds.map(function (row) { return soundOf(row, String(id)); }).sort(function (a, b) {
          if (a.slot < 0 && b.slot < 0) return 0;
          if (a.slot < 0) return 1;
          if (b.slot < 0) return -1;
          return a.slot - b.slot;
        })
      };
    }
  };
  function fileUrls(j) {
    var id = (j && j.id) || jobId || '';
    var f = (j && j.files) || {};
    var mp3 = f.mp3 || '';
    if (!mp3 && j && j.preview_ready && id) mp3 = API + '/api/jobs/' + encodeURIComponent(id) + '/files/preview.mp3';
    return {
      id: id,
      mp3: mp3,
      flac: f.flac || (id ? API + '/api/jobs/' + encodeURIComponent(id) + '/files/performance.flac' : ''),
      rec: f.record || (id ? API + '/records/' + encodeURIComponent(id) + '.json' : ''),
      page: f.page || (id ? API + '/records/' + encodeURIComponent(id) : ''),
      meta: id ? API + '/api/jobs/' + encodeURIComponent(id) + '/files/meta.json' : ''
    };
  }
  function previewSignaled(j) {
    if (!j) return false;
    if (j.preview_ready === true) return true;
    return !!(j.files && j.files.mp3);
  }
  function stopAssembleProbe() {
    if (assembleTimer) { clearTimeout(assembleTimer); assembleTimer = null; }
  }
  function armPlayer(j) {
    var u = fileUrls(j);
    if (!u.id || !u.mp3) return;
    if (playerJob === u.id && !$('perform-out').hidden) {
      syncActions();
      return;
    }
    playerJob = u.id;
    stopAssembleProbe();
    var audio = $('perform-audio');
    audio.crossOrigin = 'anonymous';
    $('perform-title').textContent = (window.NC && NC.state && NC.state().t) || 'Performance';
    $('perform-sources').open = false;
    $('perform-mp3').href = u.mp3;
    $('perform-flac').href = u.flac;
    $('perform-record').href = u.page;
    $('perform-record').target = '_blank';
    $('perform-record').rel = 'noopener';
    $('perform-out').hidden = false;
    $('perform-bar').hidden = true;
    $('perform-keep').textContent = 'Keep';
    $('perform-kept').hidden = true;
    keepNote();
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + u.id);
    $('perform-meta').textContent = 'The record is still arriving.';
    hideStop();
    var s = $('perform-status');
    s.className = 'm';
    s.textContent = '';
    try { audio.src = u.mp3; } catch (e) {}
    if (window.NCLive) { try { NCLive.open({ id: u.id, flac: u.flac, mp3: u.mp3, record: u.rec }); } catch (e2) {} }
    syncActions();
  }
  function probePreview(gen) {
    if (gen !== viewGen || playerJob || !jobId || phase !== 'perform' || !fromCollection()) return;
    var url = API + '/api/jobs/' + encodeURIComponent(jobId) + '/files/preview.mp3';
    fetch(url, { method: 'GET', headers: { Range: 'bytes=0-0' }, cache: 'no-store' }).then(function (r) {
      if (r.body && r.body.cancel) { try { r.body.cancel(); } catch (e) {} }
      if (gen !== viewGen || playerJob) return;
      if (r.ok || r.status === 206) armPlayer({ id: jobId, preview_ready: true, files: { mp3: url } });
      else assembleTimer = setTimeout(function () { probePreview(gen); }, 700);
    }, function () {
      if (gen === viewGen && !playerJob) assembleTimer = setTimeout(function () { probePreview(gen); }, 700);
    });
  }
  function prewarm() {
    warmAsked = true;
    if (warmSent) return;
    warmSent = true;
    fetch(API + '/api/warm', { method: 'GET', cache: 'no-store' }).then(function (r) {
      if (r.body && r.body.cancel) { try { r.body.cancel(); } catch (e) {} }
    }).catch(function () {});
  }
  function browserAssembly() {
    return !!(cfg && (cfg.browser_assembly === true || cfg.assembly === 'browser'));
  }
  var clipDbPromise = null;
  function clipDb() {
    if (clipDbPromise) return clipDbPromise;
    clipDbPromise = new Promise(function (ok, no) {
      if (!window.indexedDB) { no(new Error('idb')); return; }
      var req = indexedDB.open('nc-clips', 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('clips')) db.createObjectStore('clips', { keyPath: 'clip_id' });
      };
      req.onsuccess = function () { ok(req.result); };
      req.onerror = function () { no(req.error || new Error('idb')); };
    });
    clipDbPromise.catch(function () { clipDbPromise = null; });
    return clipDbPromise;
  }
  function idbGet(id) {
    return clipDb().then(function (db) {
      return new Promise(function (ok) {
        try {
          var tx = db.transaction('clips', 'readonly');
          var req = tx.objectStore('clips').get(id);
          req.onsuccess = function () { ok(req.result || null); };
          req.onerror = function () { ok(null); };
        } catch (e) { ok(null); }
      });
    }).catch(function () { return null; });
  }
  function idbPut(row) {
    return clipDb().then(function (db) {
      return new Promise(function (ok) {
        try {
          var tx = db.transaction('clips', 'readwrite');
          tx.objectStore('clips').put(row);
          tx.oncomplete = function () { ok(true); };
          tx.onerror = function () { ok(false); };
        } catch (e) { ok(false); }
      });
    }).catch(function () { return false; });
  }
  function clipPath(id) { return location.origin + '/nc-clip/' + encodeURIComponent(id); }
  function cacheGet(id) {
    if (!window.caches) return Promise.resolve(null);
    return caches.open('nc-clips').then(function (cache) {
      return cache.match(clipPath(id));
    }).then(function (res) {
      return res ? res.arrayBuffer() : null;
    }).catch(function () { return null; });
  }
  function cachePut(id, bytes, type) {
    if (!window.caches) return Promise.resolve(false);
    return caches.open('nc-clips').then(function (cache) {
      return cache.put(clipPath(id), new Response(bytes.slice(0), { headers: { 'Content-Type': type || 'audio/wav' } }));
    }).then(function () { return true; }).catch(function () { return false; });
  }
  function asBuffer(bytes) {
    if (!bytes) return null;
    if (bytes instanceof ArrayBuffer) return bytes;
    if (bytes.buffer) return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    return null;
  }
  function rememberBytes(id, bytes, type) {
    var raw = asBuffer(bytes);
    if (!id || !raw) return Promise.resolve();
    var kind = type || 'audio/wav';
    return Promise.all([idbPut({ clip_id: id, bytes: raw.slice(0), type: kind }), cachePut(id, raw, kind)]);
  }
  function audioCtx() {
    if (window.NCLive && NCLive.prime) {
      try { return NCLive.prime(); } catch (e) {}
    }
    if (!decodeCtx) decodeCtx = new (window.AudioContext || window.webkitAudioContext)();
    return decodeCtx;
  }
  function decodeBytes(raw) {
    var copy = raw.slice(0);
    return audioCtx().decodeAudioData(copy);
  }
  function clipKey(s) { return (s && (s.clip_id || s.cache || s.url)) || ''; }
  function loadClip(s) {
    var key = clipKey(s), url = s && (s.cache || s.url), id = s && s.clip_id;
    if (!key || !url) return Promise.resolve(null);
    if (clipBuffers[key]) return Promise.resolve(clipBuffers[key]);
    if (clipJobs[key]) return clipJobs[key];
    clipJobs[key] = Promise.resolve().then(function () {
      return id ? idbGet(id) : null;
    }).then(function (row) {
      var stored = row && asBuffer(row.bytes);
      if (stored) return { bytes: stored, type: row.type || '' };
      if (!id) return null;
      return cacheGet(id).then(function (cached) {
        if (!cached) return null;
        rememberBytes(id, cached, 'audio/wav');
        return { bytes: cached, type: '' };
      });
    }).then(function (hit) {
      if (hit && hit.bytes) return hit;
      return fetch(url, { mode: 'cors' }).then(function (r) {
        if (!r.ok) throw new Error('clip');
        var type = (r.headers.get('Content-Type') || 'audio/wav').split(';')[0];
        return r.arrayBuffer().then(function (raw) {
          var keep = id ? rememberBytes(id, raw, type) : Promise.resolve();
          return keep.then(function () { return { bytes: raw, type: type }; });
        });
      });
    }).then(function (pack) {
      return decodeBytes(pack.bytes).then(function (buf) {
        clipBuffers[key] = buf;
        return buf;
      });
    }).catch(function () {
      delete clipJobs[key];
      return null;
    });
    return clipJobs[key];
  }
  function preloadClips(sounds) {
    if (!browserAssembly()) return;
    (sounds || []).forEach(function (s) { if (s && (s.cache || s.url)) loadClip(s); });
  }
  function pieceWords() {
    var comp = ($('comp') && $('comp').value) || '';
    var perf = ($('perf') && $('perf').value) || '';
    return comp + '\n' + perf;
  }
  function planSlots(n, seed) {
    var clock = gatherClock, slots, asm = window.NCAssembly;
    if (clock && clock.written && clock.slots && clock.slots.length === n) {
      return clock.slots.map(function (s) { return { t: +(+s.t).toFixed(3), dur: +(+s.dur).toFixed(3) }; });
    }
    if (!asm) return [];
    var words = pieceWords();
    var seconds = asm.takeSeconds(words);
    var pulse = asm.statedPulse(words);
    return asm.chordSlots([{ count: n, seconds: seconds }], seed, pulse, pulse ? asm.broadenBars(words) : 0);
  }
  function gainFor(s) {
    if (s && s.gain_db != null && isFinite(s.gain_db)) return +(+s.gain_db).toFixed(2);
    if (s && s.lufs != null && isFinite(s.lufs)) return +(-20 - s.lufs).toFixed(2);
    return 0;
  }
  function drawSeed() {
    var a = new Uint32Array(1);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
    else a[0] = (Math.random() * 0x100000000) >>> 0;
    return a[0] || 1;
  }
  function buildPlan(seed, bufs) {
    var sounds = gatherSounds || [], n = sounds.length, slots = planSlots(n, seed), entries = [], i, slot, len, cap, end = 0;
    for (i = 0; i < n; i++) {
      slot = slots[i] || { t: end, dur: 1.25 };
      len = +(+slot.dur).toFixed(3);
      cap = sounds[i].duration_s;
      if (!(cap > 0) && bufs && bufs[i]) cap = Math.max(0, bufs[i].duration - (sounds[i].start_s || 0));
      if (cap > 0 && len > cap + 0.001) len = Math.floor(cap * 1000) / 1000;
      if (!(len > 0)) len = Math.min(slot.dur, 0.1);
      entries.push({
        pos: i,
        chord: sounds[i].symbol || gatherNames[i] || '',
        clip_id: sounds[i].clip_id || ('c' + i),
        at_s: +(+slot.t).toFixed(3),
        len_s: +len.toFixed(3),
        gain_db: gainFor(sounds[i]),
        fade_in_ms: 12,
        fade_out_ms: 12
      });
      end = +(+slot.t + +slot.dur).toFixed(3);
    }
    return { nc_assembly_version: '1', gather_id: gatherId, seed: seed, entries: entries, total_s: end };
  }
  function silenceWav(seconds) {
    var rate = 8000, n = Math.max(1, Math.round((seconds || 0) * rate)), dataLen = n * 2;
    var ab = new ArrayBuffer(44 + dataLen), v = new DataView(ab), k;
    function str(at, s) { for (k = 0; k < s.length; k++) v.setUint8(at + k, s.charCodeAt(k)); }
    str(0, 'RIFF'); v.setUint32(4, 36 + dataLen, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, dataLen, true);
    return new Blob([ab], { type: 'audio/wav' });
  }
  function clipEntries(plan) {
    return (plan.entries || []).map(function (e, i) {
      var sound = gatherSounds[i];
      return {
        buffer: sound && clipBuffers[clipKey(sound)],
        at: e.at_s,
        len: e.len_s,
        origin: sound && sound.start_s > 0 ? sound.start_s : 0,
        gainDb: e.gain_db || 0,
        fadeIn: (e.fade_in_ms != null ? e.fade_in_ms : 12) / 1000,
        fadeOut: (e.fade_out_ms != null ? e.fade_out_ms : 12) / 1000
      };
    });
  }
  function driveClips() {
    if (!localPlan || !window.NCLive || !NCLive.scheduleClips) return;
    var audio = $('perform-audio');
    if (!audio || audio.paused) return;
    NCLive.scheduleClips({ entries: clipEntries(localPlan), offset: audio.currentTime || 0 });
  }
  function watchPlayer(audio) {
    if (!audio || audio._ncWatch) return;
    audio._ncWatch = true;
    audio.addEventListener('play', function () {
      stopPreview();
      takeHeard = true;
      if (window.NC && NC.stop) NC.stop();
      followTake();
      driveClips();
    });
    audio.addEventListener('seeked', function () {
      followTake();
      if (!audio.paused) driveClips();
    });
    audio.addEventListener('pause', function () {
      followTake();
      if (localPlan && window.NCLive && NCLive.stopClips) NCLive.stopClips();
    });
    audio.addEventListener('ended', function () {
      followTake();
      if (localPlan && window.NCLive && NCLive.stopClips) NCLive.stopClips();
    });
    audio.addEventListener('timeupdate', followTake);
  }
  function planAsRecord(plan) {
    return {
      performance: {
        duration_s: plan.total_s,
        timeline: plan.entries.map(function (e, i) {
          return { chord_index: i, start_s: e.at_s, end_s: +(e.at_s + e.len_s).toFixed(3), symbol: e.chord };
        })
      },
      sounds_used: plan.entries.map(function (e, i) {
        var s = gatherSounds[i] || {};
        return { key: e.clip_id, title: (s.title || e.chord || 'Sound'), source: s.supplier || '', spans: [{ at_s: e.at_s, len_s: e.len_s, key: e.clip_id }] };
      })
    };
  }
  function paintPlan(plan) {
    var list = $('plan-src'), seedEl = $('plan-seed');
    if (!list) return;
    list.textContent = '';
    list.hidden = false;
    plan.entries.forEach(function (e, i) {
      var s = gatherSounds[i] || {};
      var li = document.createElement('li');
      var chord = document.createElement('span');
      chord.className = 'g-chord';
      chord.textContent = e.chord || '';
      var line = document.createElement('span');
      line.textContent = [s.title || 'Sound', s.supplier, licenseLabel(s.license) || s.license].filter(Boolean).join(' · ');
      var when = document.createElement('span');
      when.className = 'm';
      when.textContent = ' ' + e.at_s.toFixed(1) + 's';
      li.dataset.at = String(e.at_s);
      li.dataset.len = String(e.len_s);
      li.appendChild(chord);
      li.appendChild(line);
      li.appendChild(when);
      list.appendChild(li);
    });
    if (seedEl) { seedEl.hidden = false; seedEl.textContent = 'Seed ' + plan.seed; }
  }
  function revealTake(plan) {
    var blob = silenceWav(plan.total_s);
    if (localUrl) { try { URL.revokeObjectURL(localUrl); } catch (e) {} }
    localUrl = URL.createObjectURL(blob);
    localPlan = plan;
    playerJob = gatherId + '-' + plan.seed;
    $('perform-title').textContent = (window.NC && NC.state && NC.state().t) || 'Performance';
    $('perform-sources').open = false;
    $('perform-mp3').removeAttribute('href');
    $('perform-flac').removeAttribute('href');
    $('perform-record').href = '#';
    $('perform-out').hidden = false;
    $('perform-bar').hidden = true;
    $('perform-keep').textContent = 'Save';
    $('perform-keep').disabled = !gatherClaim;
    $('perform-kept').hidden = true;
    keeping = false;
    keepNote();
    $('perform-meta').textContent = 'In this browser until you Save.';
    hideStop();
    var s = $('perform-status');
    s.className = 'm';
    s.textContent = '';
    armTake(planAsRecord(plan));
    paintPlan(plan);
    if (window.NCLive && NCLive.stopClips) NCLive.stopClips();
    if (window.NCLive && NCLive.prime) NCLive.prime();
    if (window.NCLive) {
      try { NCLive.open({ id: playerJob, only: [localUrl], mp3: localUrl, force: true }); } catch (e2) {}
    }
    var audio = $('perform-audio');
    watchPlayer(audio);
    if (audio && !audio.getAttribute('src')) { try { audio.src = localUrl; } catch (e3) {} }
    var play = audio && audio.play && audio.play();
    if (play && play.catch) play.catch(function () {});
    syncActions();
  }
  function playAssembly() {
    var gen = ++asmGen;
    stopPreview();
    busy = true;
    syncActions();
    if (window.NCLive && NCLive.prime) NCLive.prime();
    var seed = drawSeed();
    return Promise.all((gatherSounds || []).map(loadClip)).then(function (bufs) {
      if (gen !== asmGen) return;
      if (!bufs.length || bufs.some(function (b) { return !b; })) throw new Error('clip');
      phase = (gatherSounds && gatherSounds.length) ? 'collection' : '';
      revealTake(buildPlan(seed, bufs));
      idle();
    }).catch(function () {
      if (gen !== asmGen) return;
      phase = (gatherSounds && gatherSounds.length) ? 'collection' : '';
      idle();
      status('Could not assemble that take. Try again in a moment.', true);
    });
  }
  function showSaved(j) {
    keeping = false;
    j = j || {};
    var href = j.page_url || j.page || j.record_url || j.url || j.share || '';
    if (!href && typeof j.record === 'string') href = j.record;
    if (!href && j.id) href = API + '/records/' + encodeURIComponent(j.id);
    $('perform-keep').textContent = 'Saved';
    $('perform-keep').disabled = true;
    $('perform-keep-note').hidden = true;
    $('perform-meta').textContent = 'Saved on the Performer.';
    var s = $('perform-status');
    s.className = 'm';
    s.textContent = '';
    var box = $('perform-kept');
    box.textContent = '';
    box.className = 'm';
    box.hidden = false;
    box.appendChild(node('span', '', 'Saved. '));
    if (href) {
      box.appendChild(extLink(href, href));
      $('perform-record').href = href;
      $('perform-record').target = '_blank';
      $('perform-record').rel = 'noopener';
    }
    if (j.record && typeof j.record === 'object') { try { showRecord(j.record, j.id || ''); } catch (e) {} }
  }
  var SAVE_CAP = 40 * 1024 * 1024, STATE_CAP = 64 * 1024;
  function processingOf(list) {
    var chain = [];
    (list || []).forEach(function (node) {
      if (!node || !node.type) return;
      var item = {
        id: node.id || node.type,
        type: String(node.type),
        version: node.version || 1,
        bypass: !!node.bypass,
        params: node.params || {}
      };
      if (node.fixed) item.fixed = true;
      chain.push(item);
    });
    return { schema: 2, chain: chain };
  }
  function takeBody(plan, chain) {
    return {
      nc_take_version: '2',
      plan: {
        nc_assembly_version: '1',
        gather_id: plan.gather_id,
        seed: plan.seed,
        entries: plan.entries,
        total_s: plan.total_s
      },
      processing: processingOf(chain)
    };
  }
  function rejectionText(j) {
    j = j || {};
    if (j.errors && j.errors.length) return j.errors.join(' ');
    return j.error || '';
  }
  function pollSaved(j) {
    var url = (j && j.poll) || '';
    if (url && url.charAt(0) === '/') url = API + url;
    if (!url && j && j.id) url = API + '/api/jobs/' + encodeURIComponent(j.id);
    var tries = 0;
    function once() {
      if (!url) { keepFail('Could not save this Performance. Try again in a moment.'); return; }
      tries++;
      fetch(url, { cache: 'no-store' }).then(function (r) {
        return read(r).then(function (body) { return { ok: r.ok, body: body }; });
      }, function () { return { ok: false, body: {} }; }).then(function (x) {
        var b = (x && x.body) || {}, state = b.status || b.state;
        if (state === 'done') { showSaved(b); return; }
        if (state === 'rejected' || state === 'failed' || state === 'cancelled') {
          keepFail(rejectionText(b) || 'Could not save this Performance.', true);
          return;
        }
        if (tries > 40) { keepFail('Could not save this Performance. Try again in a moment.'); return; }
        setTimeout(once, 700);
      });
    }
    once();
  }
  function saveLocal() {
    if (keeping || !localPlan || !window.NCLive || !NCLive.renderBuffers) return;
    keeping = true;
    $('perform-keep').disabled = true;
    $('perform-keep').textContent = 'Saving…';
    $('perform-kept').hidden = true;
    var s = $('perform-status');
    s.className = 'm';
    s.textContent = 'Saving…';
    askToken().then(function (tok) {
      s.className = 'm';
      s.textContent = 'Saving…';
      var chain = NCLive.chain ? NCLive.chain() : [];
      return NCLive.renderBuffers({ entries: clipEntries(localPlan), total: localPlan.total_s, chain: chain }).then(function (out) {
        var blob = out && out.blob ? out.blob : out;
        var rendered = out && out.total_s ? +(+out.total_s).toFixed(3) : localPlan.total_s;
        var musical = +(+localPlan.total_s).toFixed(3);
        var total = Math.abs(rendered - musical) > 0.5 ? Math.min(180, rendered) : musical;
        if (!blob || blob.size > SAVE_CAP) {
          keepFail('That take is over 40 MB, so it was not sent. Try again with a shorter one.');
          return null;
        }
        var plan = {
          nc_assembly_version: '1',
          gather_id: localPlan.gather_id,
          seed: localPlan.seed,
          entries: localPlan.entries,
          total_s: +(+total).toFixed(3)
        };
        var state = takeBody(plan, chain);
        var json = JSON.stringify(state);
        if (json.length > STATE_CAP) {
          keepFail('That take state is over 64 KB, so it was not sent.');
          return null;
        }
        var fd = new FormData();
        fd.append('gather_id', gatherId || '');
        fd.append('claim_token', gatherClaim || '');
        fd.append('take_state', json);
        fd.append('audio', blob, 'take.wav');
        fd.append('listed', $('perform-public').checked ? 'true' : 'false');
        var title = window.NC && NC.state ? NC.state().t : '';
        if (title) fd.append('title', title);
        if (tok) fd.append('turnstile_token', tok);
        var headers = {};
        var pass = testerToken();
        if (pass) headers['X-NC-Tester'] = pass;
        return fetch(API + '/api/keep-take', { method: 'POST', headers: headers, body: fd }).then(function (r) {
          return read(r).then(function (body) { return { status: r.status, ok: r.ok, j: body }; });
        }, function () { return { status: 0, ok: false, j: {} }; });
      });
    }).then(function (x) {
      if (!x) return;
      if (x.status === 400 || (x.j && x.j.code === 'rejected')) { keepFail(rejectionText(x.j), true); return; }
      if (x.status === 202 || (x.j && x.j.status === 'queued')) { pollSaved(x.j); return; }
      if (x.ok && x.j && (x.j.status === 'done' || x.j.state === 'done' || x.j.page_url || x.j.record_url)) { showSaved(x.j); return; }
      keepFail(rejectionText(x.j), !!(x.j && x.j.error));
    }).catch(function () { keepFail(''); });
  }
  function stopPreview() {
    try { preview.pause(); } catch (e) {}
    try { preview.removeAttribute('src'); preview.load(); } catch (e2) {}
    if (previewBtn) { previewBtn.textContent = 'Listen'; previewBtn = null; }
  }
  function paintGather(sounds, keep) {
    var list = $('gather-list');
    if (!list) return;
    var playing = '';
    if (keep && preview.getAttribute('src')) playing = preview.getAttribute('src');
    else stopPreview();
    list.textContent = '';
    if (!keep) previewBtn = null;
    var still = null;
    (sounds || []).forEach(function (s) {
      var li = document.createElement('li');
      if (s.symbol) {
        var chord = document.createElement('span');
        chord.className = 'g-chord';
        chord.textContent = s.symbol;
        li.appendChild(chord);
      }
      if (s.pending) {
        li.className = 'pending';
        var wait = document.createElement('span');
        wait.className = 'g-wait';
        wait.textContent = '—';
        li.appendChild(wait);
        if (s.symbol) li.setAttribute('aria-label', s.symbol + ', still gathering');
        list.appendChild(li);
        return;
      }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Listen';
      if (!s.url) btn.disabled = true;
      btn.onclick = function () { togglePreview(btn, s.url); };
      if (playing && s.url && playing === s.url) { btn.textContent = 'End'; still = btn; }
      var title = document.createElement('span');
      title.className = 'g-title';
      title.textContent = s.title || 'Sound';
      var who = s.supplier || s.credit || '';
      if (s.supplier && s.credit) li.title = s.credit;
      var meta = document.createElement('span');
      meta.className = 'm g-meta';
      meta.textContent = [who, licenseLabel(s.license) || s.license].filter(Boolean).join(' · ');
      li.appendChild(btn);
      li.appendChild(title);
      li.appendChild(meta);
      list.appendChild(li);
    });
    previewBtn = still;
    if (playing && !still) stopPreview();
  }
  function chordNames() {
    var tl = window.NC && NC.timeline && NC.timeline();
    if (!tl || !tl.chords) return [];
    return tl.chords.map(function (c) { return c.symbol || ''; });
  }
  function compositionChords() {
    var text = $('comp') && $('comp').value;
    if (window.NC && NC.findChords && text) {
      var found = NC.findChords(text);
      if (found && found.length) return found.map(function (c) { return c.sym; });
    }
    return chordNames();
  }
  function openGatherList() {
    gatherNames = compositionChords();
    gatherLive = gatherNames.map(function () { return null; });
    paintLive();
  }
  function paintLive() {
    paintGather(gatherLive.map(function (s, i) {
      if (s) return s;
      return { pending: true, symbol: gatherNames[i] || '' };
    }), true);
  }
  function mergeFound(j) {
    var items = foundList(j);
    if (!items.length || phase !== 'gather') return;
    if (!gatherLive.length) openGatherList();
    items.forEach(function (raw) {
      var s = soundOf(raw);
      if (!s.title && !s.url) return;
      var slot = s.slot, i;
      if (slot < 0) {
        for (i = 0; i < gatherLive.length; i++) if (!gatherLive[i]) { slot = i; break; }
        if (slot < 0) slot = gatherLive.length;
      }
      while (gatherLive.length <= slot) { gatherLive.push(null); gatherNames.push(''); }
      if (s.symbol) gatherNames[slot] = s.symbol;
      else s.symbol = gatherNames[slot] || '';
      gatherLive[slot] = s;
    });
    paintLive();
    preloadClips(gatherLive.filter(Boolean));
  }
  function restoreGather() {
    gatherLive = [];
    if (gatherSounds && gatherSounds.length) paintGather(gatherSounds);
    else {
      var list = $('gather-list');
      if (list) list.textContent = '';
    }
  }
  function togglePreview(btn, url) {
    if (!url) return;
    if (previewBtn === btn) { stopPreview(); return; }
    stopPreview();
    if (window.NC && NC.stop) NC.stop();
    var heard = $('perform-audio');
    if (heard && !heard.paused) { try { heard.pause(); } catch (e) {} }
    previewBtn = btn;
    btn.textContent = 'End';
    preview.src = url;
    var play = preview.play();
    if (play && play.catch) play.catch(function () { if (previewBtn === btn) stopPreview(); });
  }
  function wordsOk() {
    if (!window.NC) return null;
    if (NC.commitNotes) NC.commitNotes();
    var S = NC.state();
    if (!S.c) { status('Write a Composition first.', true); return null; }
    var max = (cfg && cfg.max_words) || 4000, words = S.c + '\n' + S.p;
    if (words.length > max) { status('Those words are ' + words.length + ' characters. The limit is ' + max + '.', true); return null; }
    return S;
  }
  function gatherMessage(code, j) {
    var limited = limitMessage(j);
    if (limited) return limited;
    var raw = soften(j && (typeof j.error === 'string' ? j.error : ''));
    if (code === 429) return raw || 'Too many requests from this network. Try again in a few minutes.';
    if (code === 503) return 'Perform is resting or busy. Try again in a moment.';
    if (code === 403 && j && j.code === 'turnstile') {
      var errors = Array.isArray(j.turnstile_errors) && j.turnstile_errors.length ? j.turnstile_errors.join(', ') : 'no siteverify code';
      var host = typeof j.hostname === 'string' && j.hostname ? ' (' + j.hostname + ')' : '';
      return (raw || 'The bot check failed. Reload the page and try again.') + ' [' + errors + ']' + host;
    }
    try { console.warn('Gather [status ' + (code || 0) + ']', j); } catch (e) {}
    return raw || soften(j && typeof j.reason === 'string' ? j.reason : '') || ('[status ' + (code || 0) + ']');
  }
  function gatherNote(tag, payload) {
    try { console.warn('Gather ' + tag, payload); } catch (e) {}
    var src = payload;
    if (payload && payload.j && typeof payload.j === 'object') src = payload.j;
    else if (payload && payload.body && typeof payload.body === 'object') src = payload.body;
    var reason = '';
    if (src && typeof src.error === 'string') reason = src.error;
    else if (src && typeof src.reason === 'string') reason = src.reason;
    reason = soften(reason);
    return reason || tag;
  }
  function gatherFail(msg) {
    alive++;
    stopWatch();
    gatherJobId = '';
    running = false;
    stopping = false;
    hideStop();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    phase = (gatherSounds && gatherSounds.length) ? 'collection' : '';
    restoreGather();
    idle();
    status(soften(msg) || '[job failed]', true);
  }
  function gatherStopped() {
    alive++;
    stopWatch();
    gatherJobId = '';
    running = false;
    stopping = false;
    hideStop();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    phase = (gatherSounds && gatherSounds.length) ? 'collection' : '';
    restoreGather();
    idle();
    status('Stopped.');
  }
  function acceptGather(raw) {
    if (phase !== 'gather' || stopping) return false;
    var col = GATHER.collection(raw);
    if (!col) return false;
    gatherId = col.id;
    gatherClock = col.clock;
    if (col.claim) gatherClaim = col.claim;
    if (gatherClaim) { try { sessionStorage.setItem('nc-claim:' + gatherId, gatherClaim); } catch (e) {} }
    gatherSounds = col.sounds.map(function (s, i) {
      var slot = s.slot >= 0 ? s.slot : i;
      if (!s.symbol && gatherNames[slot]) s.symbol = gatherNames[slot];
      return s;
    });
    gatherLive = [];
    gatherJobId = '';
    phase = 'collection';
    running = false;
    stopping = false;
    hideStop();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    paintGather(gatherSounds);
    preloadClips(gatherSounds);
    idle();
    status('Gathered.');
    return true;
  }
  function onGatherJob(j) {
    if (!j || phase !== 'gather' || stopping) return;
    if (j.state === 'done') {
      stopWatch();
      if (acceptGather(j)) return;
      var id = j.gather_id || j.id || gatherJobId;
      if (!id) { gatherFail(gatherNote('[result unreadable]', j)); return; }
      fetch(API + '/api/gather/' + encodeURIComponent(id)).then(function (r) {
        if (phase !== 'gather' || stopping) return null;
        return read(r).then(function (body) { return { ok: r.ok, status: r.status, body: body }; });
      }).then(function (x) {
        if (!x || phase !== 'gather' || stopping) return;
        if (!x.ok) { gatherFail(gatherNote('[status ' + x.status + ']', x.body)); return; }
        if (!acceptGather(x.body)) gatherFail(gatherNote('[result unreadable]', x.body));
      }).catch(function (err) {
        if (phase === 'gather' && !stopping) gatherFail(gatherNote('[network]', err));
      });
      return;
    }
    if (j.state === 'failed' || j.state === 'rejected') { stopWatch(); gatherFail(limitMessage(j) || gatherNote('[job failed]', j)); return; }
    if (j.state === 'cancelled' || j.state === 'canceled' || j.state === 'stopped') { stopWatch(); stopped(); return; }
    mergeFound(j);
    status('Gathering…');
    $('perform-bar').hidden = true;
    showStop();
  }
  function postGather(S, tok, excludeId, mine) {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    gatherAbort = ctrl;
    return fetch(API + '/api/gather', {
      method: 'POST',
      headers: apiHeaders(),
      body: JSON.stringify(GATHER.request(S, tok, excludeId)),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (gatherAbort === ctrl) gatherAbort = null;
      if (mine !== gatherGen || phase !== 'gather') return;
      if (r.status === 404) {
        gatherOn = false;
        phase = 'perform';
        syncActions();
        return post(S, tok);
      }
      return read(r).then(function (j) {
        if (mine !== gatherGen || phase !== 'gather') return;
        token = null;
        if (!r.ok) { gatherFail(gatherMessage(r.status, j)); return; }
        if (acceptGather(j)) return;
        if (j && j.id && j.state) {
          gatherJobId = j.id;
          if (j.claim_token) {
            gatherClaim = j.claim_token;
            try { sessionStorage.setItem('nc-claim:' + j.id, j.claim_token); } catch (e) {}
          }
          watch(j.id, onGatherJob);
          onGatherJob(j);
          return;
        }
        gatherFail(gatherNote('[result unreadable]', j));
      });
    }, function (err) {
      if (gatherAbort === ctrl) gatherAbort = null;
      if (mine !== gatherGen || phase !== 'gather') return;
      if (err && err.name === 'AbortError') return;
      gatherFail(gatherNote('[network]', err));
    });
  }
  function gather(again) {
    if (busy || !gatherOn || !window.NC) return;
    if (!(NC.timeline && NC.timeline())) return;
    var S = wordsOk();
    if (!S) return;
    stopPreview();
    var exclude = again ? gatherId : '';
    alive++;
    phase = 'gather';
    busy = true;
    gatherJobId = '';
    stopping = false;
    hideStop();
    $('perform-bar').hidden = true;
    openGatherList();
    var mine = ++gatherGen;
    syncActions();
    showStop();
    status('Gathering…');
    $('perform-public').disabled = true;
    askToken().then(function (tok) {
      if (mine !== gatherGen) return;
      status('Gathering…');
      return postGather(S, tok, exclude, mine);
    }).catch(function (e) {
      if (mine !== gatherGen) return;
      gatherFail(e && e.message ? e.message : gatherNote('[network]', e));
      if (e && e.message) { try { console.warn('Gather [network]', e); } catch (err) {} }
    });
  }
  function cancelGather() {
    if (stopping || phase !== 'gather') return;
    stopping = true;
    var btn = $('perform-stop');
    if (btn) btn.disabled = true;
    gatherGen++;
    alive++;
    if (gatherAbort) { try { gatherAbort.abort(); } catch (e) {} gatherAbort = null; }
    stopWatch();
    var id = gatherJobId;
    var tokenNow = id && (sessionStorage.getItem('nc-claim:' + id) || gatherClaim);
    if (!id || !tokenNow) { gatherStopped(); return; }
    fetch(API + '/api/jobs/' + encodeURIComponent(id) + '/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim_token: tokenNow })
    }).then(function (r) {
      if (r.status === 404) cancelOk = false;
      gatherStopped();
    }, function () { gatherStopped(); });
  }
  function post(S, tok) {
    // The Play instrument picker is only the chord preview. Do not send it.
    // The ensemble comes from the performance prompt, or the server picks one.
    var body = {
      title: S.t, composer: S.by, composition: S.c, performance: S.p,
      visibility: $('perform-public').checked ? 'public' : 'unlisted',
      turnstile_token: tok || undefined,
      perform_again: !!jobId
    };
    if (gatherOn && gatherId) GATHER.performExtras(body, gatherId, gatherClaim, S.p);
    return fetch(API + '/api/perform', {
      method: 'POST',
      headers: apiHeaders(),
      body: JSON.stringify(body)
    }).then(function (r) { return read(r).then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); }, function () {
      return { ok: false, status: 0, j: {} };
    }).then(function (x) {
      token = null;
      if (widget != null && window.turnstile) { try { window.turnstile.reset(widget); } catch (e) {} }
      if (!x.ok) { fail(messageFor(x.status, x.j)); return; }
      takeSeed(x.j);
      jobId = x.j.id;
      sessionStorage.setItem('nc-perform-job', jobId);
      if (x.j.claim_token) claim(jobId, x.j.claim_token);
      $('perform-turnstile').hidden = true;
      $('perform-out').hidden = true;
      if (window.NCLive) NCLive.hide();
      playerJob = '';
      running = true;
      if (fromCollection()) {
        $('perform-bar').hidden = true;
        status('Assembling…');
      } else {
        $('perform-bar').hidden = false;
        $('perform-bar').value = 0;
        status(x.j.position ? 'Queued · position ' + x.j.position : 'Queued…');
      }
      showStop();
      watch(jobId);
      if (fromCollection()) probePreview(viewGen);
    });
  }
  // Cancel shape, until the Performer publishes another: POST /api/jobs/<id>/cancel { claim_token }.
  // A 404 means this API has no cancel yet, so Stop hides and the job keeps going.
  function stopped() {
    if (phase === 'gather') { gatherStopped(); return; }
    alive++;
    running = false;
    stopping = false;
    hideStop();
    stopAssembleProbe();
    playerJob = '';
    viewGen++;
    phase = (gatherOn && gatherSounds && gatherSounds.length) ? 'collection' : '';
    idle();
    clearTake();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    $('perform-out').hidden = true;
    $('live').hidden = true;
    clearRecord();
    if (window.NCLive) NCLive.hide();
    try { sessionStorage.removeItem('nc-perform-job'); } catch (e) {}
    status('Stopped.');
  }
  function cancelJob() {
    if (phase === 'gather') { cancelGather(); return; }
    if (stopping || !running || !jobId) return;
    var tokenNow = sessionStorage.getItem('nc-claim:' + jobId);
    if (!tokenNow) {
      status('This tab does not have the keep key for this Performance.', true);
      showStop();
      return;
    }
    stopping = true;
    $('perform-stop').disabled = true;
    fetch(API + '/api/jobs/' + encodeURIComponent(jobId) + '/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim_token: tokenNow })
    }).then(function (r) {
      if (r.status === 404) {
        cancelOk = false;
        stopping = false;
        hideStop();
        return null;
      }
      return read(r).then(function (j) {
        stopping = false;
        if (!r.ok) {
          showStop();
          status(soften(j && j.error) || 'Could not stop. Try again in a moment.', true);
          return;
        }
        stopped();
      });
    }, function () {
      stopping = false;
      showStop();
      status('Could not stop. Try again in a moment.', true);
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
  var tokenWait = null, askGen = 0;
  function askToken() {
    if (!cfg || !cfg.turnstile_required) return Promise.resolve('');
    // Each Gather and each Save spends the token. Do not reuse one. reset()
    // after Gather can return without a callback, so render a new widget.
    token = null;
    var gen = ++askGen;
    var box = $('perform-turnstile');
    box.hidden = false;
    if (!(phase === 'gather' && gatherSounds && gatherSounds.length)) status('One check, then it starts.');
    return loadTurnstile().then(function () {
      return new Promise(function (ok, no) {
        if (gen !== askGen) return;
        if (widget != null) {
          try { window.turnstile.remove(widget); } catch (e) {}
          widget = null;
        }
        box.textContent = '';
        tokenWait = { ok: ok, no: no, gen: gen };
        widget = window.turnstile.render(box, {
          sitekey: cfg.turnstile_sitekey,
          callback: function (t) {
            if (gen !== askGen) return;
            token = t;
            var wait = tokenWait;
            tokenWait = null;
            if (wait && wait.gen === gen) wait.ok(t);
          },
          'error-callback': function () {
            if (gen !== askGen) return;
            var wait = tokenWait;
            tokenWait = null;
            if (wait && wait.gen === gen) wait.no(new Error('The bot check did not load. This address may need to be added to the NC Perform widget.'));
          },
          'expired-callback': function () { if (gen === askGen) token = null; }
        });
      });
    });
  }
  function go() {
    if (busy || !window.NC) return;
    if (!(NC.timeline && NC.timeline())) return;
    if (gatherOn && !gatherId) return;
    var S = wordsOk();
    if (!S) return;
    stopPreview();
    if (browserAssembly() && gatherSounds && gatherSounds.length) { playAssembly(); return; }
    alive++;
    running = false;
    hideStop();
    viewGen++;
    clearTake();
    phase = 'perform';
    busy = true;
    playerJob = '';
    stopAssembleProbe();
    dropKeptFiles();
    if (window.NCLive && NCLive.prime) NCLive.prime();
    if (fromCollection()) {
      status('Assembling…');
      $('perform-bar').hidden = true;
    }
    syncActions();
    if (jobId) {
      $('perform-out').hidden = true;
      $('perform-bar').hidden = true;
      if (window.NCLive) NCLive.hide();
    }
    $('perform-public').disabled = true;
    keeping = false;
    $('perform-keep').textContent = 'Keep';
    $('perform-keep').disabled = true;
    $('perform-kept').hidden = true;
    clearRecord();
    keepNote();
    $('perform-claim').hidden = true;
    askToken().then(function (tok) { return post(S, tok); }).catch(function (e) {
      fail(e && e.message ? e.message : 'Perform did not answer. The service may be down. Try again in a moment.');
    });
  }
  function withClaim(path, body, done) {
    var tokenNow = sessionStorage.getItem('nc-claim:' + jobId);
    if (!jobId || !tokenNow) {
      done({ ok: false, j: { error: 'This tab does not have the keep key for this Performance.' } });
      return;
    }
    fetch(API + '/api/jobs/' + jobId + '/' + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ claim_token: tokenNow }, body))
    }).then(function (r) { return read(r).then(function (j) { return { ok: r.ok, j: j }; }); }).then(done).catch(function () {
      done({ ok: false, j: {} });
    });
  }
  function dropStaleJob() {
    try { sessionStorage.removeItem('nc-perform-job'); } catch (e) {}
    jobId = null;
    var out = $('perform-out');
    if (out) out.hidden = true;
  }
  function resume() {
    var id = sessionStorage.getItem('nc-perform-job');
    if (!id) return;
    jobId = id;
    fetch(API + '/api/jobs/' + id, { cache: 'no-store' }).then(function (r) {
      if (r.status === 404) { dropStaleJob(); return null; }
      return r.ok ? r.json() : null;
    }).then(function (j) {
      if (!j || busy) return;
      if (j.state === 'done') {
        var file = (j.files && j.files.mp3) || (API + '/api/jobs/' + (j.id || id) + '/files/preview.mp3');
        return fetch(file, { method: 'GET', cache: 'no-store', headers: { Range: 'bytes=0-0' } }).then(function (r) {
          if (r.body && r.body.cancel) { try { r.body.cancel(); } catch (e) {} }
          if (busy) return;
          if (r.status === 404) { dropStaleJob(); return; }
          showDone(j);
        }, function () { if (!busy) showDone(j); });
      }
      if (j.state === 'failed' || j.state === 'rejected') fail(j.error || j.state);
      else { busy = true; running = true; phase = 'perform'; $('perform-public').disabled = true; syncActions(); onJob(j); watch(id); }
    }).catch(function () {});
  }
  function probeGather() {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    return fetch(API + '/api/gather', {
      method: 'POST',
      headers: apiHeaders(),
      body: JSON.stringify(GATHER.probeBody()),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (r.body && r.body.cancel) { try { r.body.cancel(); } catch (e) {} }
      // A probe has no token, so Turnstile answers 403. Only 404 means Gather is absent.
      gatherOn = r.status !== 404;
    }, function () { gatherOn = false; });
  }
  function boot() {
    fetch(API + '/api/config').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (c) {
      cfg = c;
      if (warmAsked) prewarm();
      if (!c.perform_enabled) {
        gatherOn = false;
        syncActions();
        status('Perform is resting until tomorrow.', true);
        return;
      }
      return probeGather().then(function () {
        syncActions();
        if ($('perform-out').hidden) status('Ready.');
        resume();
      });
    }).catch(function () {
      gatherOn = false;
      syncActions();
      status('Perform did not answer. The service may be down. Try again in a moment.', true);
    });
  }
  var compField = $('comp');
  if (compField) compField.addEventListener('focus', prewarm);
  $('performBtn').onclick = go;
  if ($('gatherBtn')) $('gatherBtn').onclick = function () { gather(false); };
  if ($('gather-again')) $('gather-again').onclick = function () { gather(true); };
  if ($('perform-stop')) $('perform-stop').onclick = cancelJob;
  $('perform-edit').onclick = function (e) {
    e.preventDefault();
    var box = $('perf'), fold = $('perf-box');
    if (fold && typeof fold.open === 'boolean') fold.open = true;
    (fold || box).scrollIntoView({behavior: 'smooth', block: 'center'});
    box.focus();
  };
  $('perform-keep').onclick = function () {
    var label = $('perform-keep').textContent;
    if (keeping || label.indexOf('Kept') === 0 || label.indexOf('Saved') === 0) return;
    if (localPlan && browserAssembly()) { saveLocal(); return; }
    if (!jobId || !sessionStorage.getItem('nc-claim:' + jobId)) {
      keepFail('This tab does not have the keep key for this Performance.');
      return;
    }
    var moved = !!(window.NCLive && NCLive.adjusted && NCLive.adjusted());
    keeping = true;
    $('perform-keep').disabled = true;
    $('perform-kept').hidden = true;
    if (!moved) {
      $('perform-keep').textContent = 'Keeping…';
      withClaim('keep', {}, function (x) {
        if (!x.ok || !x.j || !x.j.keep) { keepFail(x.j && x.j.error); return; }
        applyKept(x.j);
      });
      return;
    }
    $('perform-keep').textContent = 'Rendering…';
    NCLive.render().then(function (out) {
      $('perform-keep').textContent = 'Keeping…';
      return postProcessed(out).then(function (x) {
        if (x.ok && x.j && x.j.processed) {
          if (!x.j.dials) x.j.dials = out.dials;
          applyKept(x.j);
          return;
        }
        withClaim('keep', {dials: out.dials}, function (y) {
          if (!y.ok || !y.j || !y.j.keep) { keepFail(y.j && y.j.error); return; }
          applyKept(y.j, localKept(out));
        });
      });
    }).catch(function () {
      keepFail('Could not render the dialed sound. Try again in a moment.');
    });
  };
  $('perform-json-copy').onclick = function () {
    var t = $('perform-json-pre').textContent, btn = $('perform-json-copy');
    var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { done(); });
    else done();
  };
  $('perform-json-dl').onclick = function () {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([$('perform-json-pre').textContent], {type: 'application/json'}));
    a.download = recordName; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  $('perform-public').addEventListener('change', function () {
    keepNote();
    if (!jobId || busy) return;
    var vis = $('perform-public').checked ? 'public' : 'unlisted';
    withClaim('visibility', { visibility: vis }, function (x) {
      if (!x.ok) { status(soften(x.j && x.j.error) || 'Could not change who can find it. Try again in a moment.', true); return; }
      status(vis === 'public' ? 'It will be listed after a day, and the audio is kept.' : 'Unlisted. Only someone with the link can play it.');
      if (x.j && x.j.keep) applyKept(x.j); else keepNote();
    });
  });
  var heard = $('perform-audio');
  if (heard) {
    heard.addEventListener('play', function () { stopPreview(); takeHeard = true; if (window.NC && NC.stop) NC.stop(); followTake(); });
    ['timeupdate', 'seeked', 'pause', 'ended'].forEach(function (ev) { heard.addEventListener(ev, followTake); });
  }
  var playBtn = $('play');
  if (playBtn) playBtn.addEventListener('click', stopPreview);
  window.NCPerform = { api: API, messageFor: messageFor, go: go, post: post, showDone: showDone, fail: fail, audioMiss: audioMiss, showRecord: showRecord, foundLines: foundLines, showStory: showStory, seed: function () { return serverSeed; }, sync: syncActions };
  var booted = false;
  var wait = setInterval(function () {
    if (!document.body.getAttribute('data-ready') || booted) return;
    booted = true; clearInterval(wait); boot();
  }, 100);
})();
