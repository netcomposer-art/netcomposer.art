// A live FM source may be saved only when a public read shows CC0, CC BY,
// CC BY-SA or public domain. Nothing here asks the performer to vouch for it.
(function (root) {
  'use strict';

  function allowed(id) {
    var raw = String(id || '').trim();
    if (!raw) return false;
    var u = raw.toUpperCase();
    if (u.indexOf('NC') >= 0 || u.indexOf('ND') >= 0 || u.indexOf('SAMPLING') >= 0) return false;
    if (u === 'PD' || u === 'PDM' || u === 'PDM-1.0' || u.indexOf('PUBLIC DOMAIN') === 0) return true;
    var c = u.replace(/[\s.-]/g, '');
    if (c.indexOf('CC0') === 0) return true;
    return /^CCBY(SA)?\d/.test(c);
  }

  function label(id) {
    var map = {
      'CC0-1.0': 'CC0 1.0', 'CC-BY-3.0': 'CC BY 3.0', 'CC-BY-4.0': 'CC BY 4.0',
      'CC-BY-SA-3.0': 'CC BY-SA 3.0', 'CC-BY-SA-4.0': 'CC BY-SA 4.0',
      'PDM-1.0': 'Public domain', 'PD': 'Public domain'
    };
    return map[id] || id || '';
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return ''; }
  }

  function kindOf(url) {
    var h = hostOf(url);
    if (!h) return '';
    if (h === 'youtu.be' || h === 'youtube.com' || h === 'm.youtube.com' || h === 'music.youtube.com' || h === 'youtube-nocookie.com') return 'youtube';
    if (h === 'archive.org' || h.slice(-12) === '.archive.org') return 'archive';
    if (h === 'commons.wikimedia.org' || h === 'wikimedia.org' || h.slice(-14) === '.wikimedia.org') return 'wikimedia';
    if (h === 'freesound.org') return 'freesound';
    return '';
  }

  function youtubeId(url) {
    var u;
    try { u = new URL(url); } catch (e) { return ''; }
    var h = u.hostname.replace(/^www\./, '').toLowerCase();
    if (h === 'youtu.be') return u.pathname.split('/').filter(Boolean)[0] || '';
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    var parts = u.pathname.split('/').filter(Boolean);
    var i = parts.indexOf('embed');
    if (i < 0) i = parts.indexOf('shorts');
    if (i < 0) i = parts.indexOf('live');
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return '';
  }

  function archiveId(url) {
    var u;
    try { u = new URL(url); } catch (e) { return ''; }
    var parts = u.pathname.split('/').filter(Boolean);
    if (!parts.length) return '';
    if (parts[0] === 'details' || parts[0] === 'download' || parts[0] === 'embed') return decodeURIComponent(parts[1] || '');
    return '';
  }

  function commonsTitle(url) {
    var u;
    try { u = new URL(url); } catch (e) { return ''; }
    var path = u.pathname;
    var mark = '/wiki/';
    var at = path.indexOf(mark);
    if (at < 0) return '';
    var title = decodeURIComponent(path.slice(at + mark.length));
    if (title.indexOf('File:') !== 0 && title.indexOf('Image:') !== 0) return '';
    return title;
  }

  function freesoundId(url) {
    var m = String(url || '').match(/\/sounds\/(\d+)/) || String(url || '').match(/\/s\/(\d+)/);
    return m ? m[1] : '';
  }

  function fromCcUrl(u) {
    var m = /creativecommons\.org\/(?:licenses\/([a-z0-9-]+)\/(\d\.\d)|publicdomain\/(zero|mark)\/1\.0)/i.exec(String(u || ''));
    if (!m) return '';
    if (m[3] === 'zero') return 'CC0-1.0';
    if (m[3] === 'mark') return 'PDM-1.0';
    var kind = m[1].toLowerCase();
    if (kind === 'by') return 'CC-BY-' + m[2];
    if (kind === 'by-sa') return 'CC-BY-SA-' + m[2];
    return 'CC-' + kind.toUpperCase() + '-' + m[2];
  }

  function plain(s) {
    return String(s || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
  }

  function no(reason) { return { ok: false, reason: reason }; }
  function yes(license, title, author) {
    return { ok: true, reason: '', license: license, licenseName: label(license), title: title || '', author: author || '' };
  }

  function decide(license, title, author) {
    if (!license) return no('Could not read a license from that link.');
    if (!allowed(license)) return no('That license is not CC0, CC BY, CC BY-SA or public domain.');
    return yes(license, title, author);
  }

  // YouTube Data API status.license, or the same word in a watch-page read.
  function explainYouTube(body, title, author) {
    var lic = '';
    if (body && typeof body === 'object') {
      lic = body.status && body.status.license || body.license || '';
      title = title || (body.snippet && body.snippet.title) || '';
      author = author || (body.snippet && (body.snippet.channelTitle || body.snippet.author)) || '';
    } else {
      var text = String(body || '');
      if (/creativeCommon/.test(text)) lic = 'creativeCommon';
      else if (/"license"\s*:\s*"youtube"/.test(text)) lic = 'youtube';
    }
    if (lic === 'creativeCommon') return yes('CC-BY-3.0', title, author);
    if (lic === 'youtube') return no('That license is not CC0, CC BY, CC BY-SA or public domain.');
    if (lic) return no('That license is not CC0, CC BY, CC BY-SA or public domain.');
    return no('Could not read a license from that link.');
  }

  // "CC BY 4.0", a CC URL, or a public-domain line, as one id the record can store.
  function canonLicense(short) {
    var s = String(short || '').trim();
    if (!s) return '';
    if (/public domain/i.test(s)) return 'PD';
    if (/^cc\s*0/i.test(s) || /^cc0/i.test(s)) return 'CC0-1.0';
    var from = fromCcUrl(s);
    if (from) return from;
    var m = /^CC[\s-]*BY([\s-]*SA)?[\s-]*(\d(?:\.\d)?)?$/i.exec(s);
    if (!m || !m[2]) return s;
    var ver = m[2].indexOf('.') < 0 ? m[2] + '.0' : m[2];
    return (m[1] ? 'CC-BY-SA-' : 'CC-BY-') + ver;
  }

  function explainArchive(body) {
    var meta = body && (body.metadata || body) || {};
    var url = meta.licenseurl || '';
    if (Array.isArray(url)) url = url[0] || '';
    var title = meta.title;
    if (Array.isArray(title)) title = title[0];
    var author = meta.creator || meta.artist;
    if (Array.isArray(author)) author = author[0];
    if (!url) return no('Could not read a license from that link.');
    return decide(canonLicense(url), plain(title), plain(author));
  }

  function explainCommons(body) {
    var pages = body && body.query && body.query.pages || {};
    var page = null, k;
    for (k in pages) if (Object.prototype.hasOwnProperty.call(pages, k)) page = pages[k];
    var info = page && page.imageinfo && page.imageinfo[0];
    var meta = info && info.extmetadata || {};
    var short = (meta.LicenseShortName && meta.LicenseShortName.value) || '';
    var artist = plain(meta.Artist && meta.Artist.value);
    var title = plain((meta.ObjectName && meta.ObjectName.value) || (page && page.title) || '');
    title = title.replace(/^File:/, '');
    if (!short) return no('Could not read a license from that link.');
    return decide(canonLicense(short), title, artist);
  }

  function explainFreesound(html) {
    var text = String(html || '');
    var found = {}, m, re = /creativecommons\.org\/(?:licenses\/[a-z0-9-]+\/\d\.\d|publicdomain\/(?:zero|mark)\/1\.0)/ig;
    while ((m = re.exec(text))) {
      var id = fromCcUrl(m[0]);
      if (id) found[id] = true;
    }
    var ids = Object.keys(found);
    if (ids.length !== 1) return no('Could not read a license from that link.');
    var title = (text.match(/og:audio:title" content="([^"]*)"/) || [])[1] || '';
    var author = (text.match(/og:audio:artist" content="([^"]*)"/) || [])[1] || '';
    return decide(ids[0], plain(title), plain(author));
  }

  function explain(kind, body, title, author) {
    if (kind === 'youtube') return explainYouTube(body, title, author);
    if (kind === 'archive') return explainArchive(body);
    if (kind === 'wikimedia') return explainCommons(body);
    if (kind === 'freesound') return explainFreesound(body);
    return no('Could not check that link.');
  }

  function check(url, fetchImpl) {
    var fetchFn = fetchImpl || fetch;
    var raw = String(url || '').trim();
    if (!raw) return Promise.resolve(no('Add the source link.'));
    var kind = kindOf(raw);
    if (!kind) return Promise.resolve(no('Could not check that link.'));
    function textOf(res) {
      if (!res || !res.ok) return Promise.reject(new Error('status'));
      return res.text();
    }
    function jsonOf(res) {
      return textOf(res).then(function (t) { return JSON.parse(t); });
    }
    if (kind === 'youtube') {
      var id = youtubeId(raw);
      if (!id) return Promise.resolve(no('Could not check that link.'));
      var watch = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
      var names = fetchFn('https://www.youtube.com/oembed?url=' + encodeURIComponent(watch) + '&format=json').then(jsonOf, function () { return {}; }).catch(function () { return {}; });
      return names.then(function (meta) {
        return fetchFn(watch).then(textOf).then(function (html) {
          return explainYouTube(html, meta && meta.title, meta && meta.author_name);
        });
      }).catch(function () { return no('Could not read a license from that link.'); });
    }
    if (kind === 'archive') {
      var ident = archiveId(raw);
      if (!ident) return Promise.resolve(no('Could not check that link.'));
      return fetchFn('https://archive.org/metadata/' + encodeURIComponent(ident)).then(jsonOf).then(explainArchive).catch(function () { return no('Could not read a license from that link.'); });
    }
    if (kind === 'wikimedia') {
      var title = commonsTitle(raw);
      if (!title) return Promise.resolve(no('Could not check that link.'));
      var api = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=extmetadata&format=json&origin=*';
      return fetchFn(api).then(jsonOf).then(explainCommons).catch(function () { return no('Could not read a license from that link.'); });
    }
    var sid = freesoundId(raw);
    if (!sid) return Promise.resolve(no('Could not check that link.'));
    return fetchFn('https://freesound.org/s/' + sid + '/').then(textOf).then(explainFreesound).catch(function () { return no('Could not read a license from that link.'); });
  }

  root.NCFmSource = {
    allowed: allowed,
    label: label,
    kindOf: kindOf,
    explain: explain,
    check: check
  };
})(typeof window !== 'undefined' ? window : globalThis);
