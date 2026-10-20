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
  function clearTake() {
    take = null;
    takeHeard = false;
    clearStrip();
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
    if (j.state !== 'done' && j.state !== 'failed' && j.state !== 'rejected') showStory(j);
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
    if ($('perform-keep').textContent.indexOf('Kept') === 0) { note.hidden = true; return; }
    note.hidden = false;
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
  function keepFail(msg) {
    keeping = false;
    $('perform-keep').textContent = 'Keep';
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + jobId);
    var clean = soften(msg);
    var line = clean || 'Could not keep this Performance. Try again in a moment.';
    if (clean && !/try again/i.test(clean)) line = clean + ' Try again in a moment.';
    showKept(line, true);
    keepNote();
  }
  function showDone(j) {
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
    var audio = $('perform-audio');
    audio.crossOrigin = 'anonymous';
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
    if (window.NCLive) NCLive.open({id: id, flac: flac, mp3: mp3, record: rec});
    $('perform-keep').disabled = !sessionStorage.getItem('nc-claim:' + id);
    status('Done. CC BY-SA 4.0. Pitch was not shifted.');
    $('perform-meta').textContent = 'Unlisted audio is kept 90 days unless you press Keep. Listed audio waits a day, then joins the feed.';
    fetch(rec).then(function (r) { return r.text().then(function (t) { return { ok: r.ok, t: t }; }); }).then(function (x) {
      if (gen !== viewGen) return;
      if (!x.ok) { recordMiss(); return; }
      try { showRecord(JSON.parse(x.t), id); } catch (e) { recordMiss(); }
    }).catch(function () { if (gen === viewGen) recordMiss(); });
    fetch(API + '/api/jobs/' + id + '/files/meta.json').then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
      if (gen !== viewGen || !m || !m.keep) return;
      applyKept(m);
    }).catch(function () {});
  }
  function fail(msg) {
    viewGen++;
    idle();
    clearTake();
    $('perform-turnstile').hidden = true;
    $('perform-bar').hidden = true;
    $('perform-out').hidden = true;
    $('live').hidden = true;
    clearRecord();
    if (window.NCLive) NCLive.hide();
    $('performBtn').textContent = jobId ? 'Perform again' : 'Perform';
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
  function post(S, tok) {
    return fetch(API + '/api/perform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: S.t, composer: S.by, composition: S.c, performance: S.p,
        instrument: instrumentHint() || undefined,
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
      takeSeed(x.j);
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
    if (NC.commitNotes) NC.commitNotes();
    var S = NC.state();
    if (!S.c) { status('Write a Composition first.', true); return; }
    var max = (cfg && cfg.max_words) || 4000, words = S.c + '\n' + S.p;
    if (words.length > max) { status('Those words are ' + words.length + ' characters. The limit is ' + max + '.', true); return; }
    viewGen++;
    clearTake();
    busy = true;
    dropKeptFiles();
    if (window.NCLive && NCLive.prime) NCLive.prime();
    $('performBtn').disabled = true;
    $('performBtn').textContent = 'Performing…';
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
      status('Ready.');
      resume();
    }).catch(function () {
      $('performBtn').disabled = true;
      status('Perform did not answer. The service may be down. Try again in a moment.', true);
    });
  }
  $('performBtn').onclick = go;
  $('perform-edit').onclick = function (e) {
    e.preventDefault();
    var box = $('perf'), fold = $('perf-box');
    if (fold && typeof fold.open === 'boolean') fold.open = true;
    (fold || box).scrollIntoView({behavior: 'smooth', block: 'center'});
    box.focus();
  };
  $('perform-keep').onclick = function () {
    if (keeping || $('perform-keep').textContent.indexOf('Kept') === 0) return;
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
    heard.addEventListener('play', function () { takeHeard = true; if (window.NC && NC.stop) NC.stop(); followTake(); });
    ['timeupdate', 'seeked', 'pause', 'ended'].forEach(function (ev) { heard.addEventListener(ev, followTake); });
  }
  function instrumentHint() {
    if (!window.NC || !NC.instrument) return '';
    var text = String(NC.instrument() || '').trim();
    return /^[A-Za-z0-9][A-Za-z0-9 ._-]{0,39}$/.test(text) ? text : '';
  }
  window.NCPerform = { api: API, messageFor: messageFor, go: go, post: post, showDone: showDone, fail: fail, audioMiss: audioMiss, showRecord: showRecord, foundLines: foundLines, showStory: showStory, seed: function () { return serverSeed; }, instrumentHint: instrumentHint };
  var booted = false;
  var wait = setInterval(function () {
    if (!document.body.getAttribute('data-ready') || booted) return;
    booted = true; clearInterval(wait); boot();
  }, 100);
})();
