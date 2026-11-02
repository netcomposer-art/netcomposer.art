/* NC Synth ab4c8ae041cc
   Generated at build time. The cache name matches this build.
   A newer worker precaches itself in the background and activates on the
   next launch. It does not call skipWaiting or clients.claim, and the page
   never asks the player to reload.
   The app shell is stale-while-revalidate. Requests that leave the app
   (live APIs, gathering sounds, sampler notes, sharing, map tiles) are
   network-only and are never written into the cache. */
const VERSION = "ab4c8ae041cc";
const CACHE = 'nc-synth-' + VERSION;
const SHELL = ["./apple-touch-icon.png","./assets/createLucideIcon-BXhmbZYw.js","./assets/deferred-CmN_Hhso.css","./assets/hacks-worklet-source-BW0ywDUV.js","./assets/ibm-plex-mono-latin-400-Dm_PoFIZ.woff2","./assets/ibm-plex-mono-latin-500-C_OblDzq.woff2","./assets/index-CMnWeUWl.js","./assets/index-DFFt2rls.css","./assets/inter-latin-300-BVlfKGgI.woff2","./assets/inter-latin-400-C38fXH4l.woff2","./assets/inter-latin-500-Cerq10X2.woff2","./assets/inter-latin-600-LgqL8muc.woff2","./assets/inter-latin-700-Drs_5D37.woff2","./assets/not-found-DnDpAz2F.js","./assets/origin-migration-browser-DTai1apI.js","./assets/save-dialog-CWlY7w7c.js","./favicon.svg","./icon-192.png","./icon-512.png","./icon-maskable-192.png","./icon-maskable-512.png","./index.html","./manifest.webmanifest","./robots.txt"];

function offlineText(url) {
  const host = url.hostname;
  const path = url.pathname.toLowerCase();
  if (host === 'nc-perform-api.psemme.workers.dev' || path.includes('/sampler') || /\/notes(\/|$)/.test(path))
    return 'Offline. Sampler notes need a connection.';
  if (path.includes('gather')) return 'Offline. Gathering sounds needs a connection.';
  if (path.includes('share')) return 'Offline. Sharing needs a connection.';
  if (path.includes('/api/openai') || path.includes('/meaning'))
    return 'Offline. Analysis needs a connection.';
  if (host.endsWith('openstreetmap.org') || host.endsWith('tile.openstreetmap.org'))
    return 'Offline. The map needs a connection.';
  if (path.includes('/api/')) return 'Offline. Situation needs a connection.';
  return 'Offline. This needs a connection.';
}

function plain(text) {
  return new Response(text, {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function reachesOut(url) {
  if (url.origin !== self.location.origin) return true;
  if (url.hostname === 'nc-perform-api.psemme.workers.dev') return true;
  const path = url.pathname;
  if (path.includes('/api/')) return true;
  if (/\/(share|sharing|gather|gathering|sampler)(\/|$)/i.test(path)) return true;
  return false;
}

function indexUrl() {
  return new URL('./index.html', self.location).href;
}

const shellUrls = new Set(SHELL.map((rel) => new URL(rel, self.location).href));

function storable(url, response) {
  if (!response || !response.ok) return false;
  const type = (response.headers.get('content-type') || '').toLowerCase();
  const path = url.pathname;
  const isDocument = path === '/' || path.endsWith('/') || path.endsWith('.html');
  if (type.includes('text/html') && !isDocument) return false;
  return true;
}

async function put(cache, key, response) {
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.delete('content-range');
  headers.delete('set-cookie');
  const body = await response.clone().arrayBuffer();
  await cache.put(key, new Response(body, { status: 200, headers }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    await caches.delete(CACHE);
    const cache = await caches.open(CACHE);
    await Promise.all(SHELL.map(async (rel) => {
      const url = new URL(rel, self.location).href;
      const response = await fetch(url, { cache: 'reload' });
      if (!response.ok) throw new Error('Precache failed for ' + url);
      await put(cache, url, response);
    }));
    const index = await cache.match(indexUrl());
    if (index) await cache.put(new URL('./', self.location).href, index.clone());
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // netcomposer.art shares one origin between /synth/, /rhythm/, /bass/ and the site's own
    // caches (Create's nc-clips). Delete only this worker's own older caches: nc-synth-<12 hex>.
    await Promise.all(keys.filter((key) => /^nc-synth-[0-9a-f]{12}$/.test(key) && key !== CACHE).map((key) => caches.delete(key)));
  })());
});

function respondShell(event, cacheKey) {
  const cachePromise = caches.open(CACHE);
  const cachedPromise = cachePromise.then((cache) => cache.match(cacheKey));
  const updatePromise = fetch(event.request).then(async (response) => {
    try {
      const keyUrl = new URL(cacheKey);
      if (storable(keyUrl, response)) {
        const cache = await cachePromise;
        await put(cache, cacheKey, response);
      }
    } catch { /* Keep the copy already in the cache. */ }
    return response;
  }).catch(() => null);
  event.waitUntil(updatePromise.then(() => undefined));
  event.respondWith((async () => {
    const cached = await cachedPromise;
    if (cached) return cached;
    const fresh = await updatePromise;
    if (fresh) return fresh;
    const index = await (await cachePromise).match(indexUrl());
    if (event.request.mode === 'navigate' && index) return index;
    return plain('Offline.');
  })());
}

async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch {
    // A failed connection has no HTTP status. Say so in one sentence
    // instead of surfacing a raw network exception. An actual HTTP error
    // from the server is returned unchanged.
    return plain(offlineText(new URL(request.url)));
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  let url;
  try { url = new URL(request.url); } catch { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (request.method !== 'GET' || reachesOut(url)) {
    event.respondWith(networkOnly(request));
    return;
  }
  const cacheKey = request.mode === 'navigate' ? indexUrl() : url.href;
  if (request.mode === 'navigate' || shellUrls.has(url.href)) {
    respondShell(event, cacheKey);
    return;
  }
  event.respondWith(networkOnly(request));
});
