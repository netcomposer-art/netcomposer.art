// OLIVE Bass service worker. It is served from /bass/sw.js with scope /bass/, sharing the
// netcomposer.art origin with ASTRID (/synth/), Rhythm (/rhythm/) and Create (/create/).
// Rules: every cache Bass creates is named "olive-bass-*", activate deletes only stale
// "olive-bass-*" caches (never another app's), and fetch only handles same-origin GETs
// inside the scope.
// Shell and the lazy UI chunks (slot menu, step sheet): precached on install, so a first open
// works offline. Hashed build output (assets/, a content hash in every name):
// cache-first. Everything else in scope (the page, manifest.webmanifest, icons/): network-first,
// with the cached copy only when offline. Those URLs never change name, so serving them cache-first
// pinned returning visitors to old icons and theme colours (olive-bass-v2) until a cache bump.
// Only a good same-origin response (ok and type "basic") is ever cached. A 404/500 or an opaque
// response passes through to the page uncached and never replaces the good copy already cached.
const PREFIX = "olive-bass-";
const CACHE = `${PREFIX}v3`;
const SCOPE = new URL("./", self.location.href).pathname;
const HASHED = `${SCOPE}assets/`;
// Filled in by the build (vite.config.ts, swPrecache) with the hashed lazy UI chunks.
const LAZY_UI = ["./assets/slot-menu-BG20F2vr.js","./assets/step-sheet-HkCTm5Em.js"];

/** Caches to delete on activate: ours (by prefix) but not the current one. */
function staleCaches(keys) {
  return keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE);
}

function cacheable(r) {
  return !!r && r.ok === true && r.type === "basic";
}

function inScope(url) {
  return url.origin === self.location.origin && url.pathname.startsWith(SCOPE);
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(["./", "./manifest.webmanifest", "./icons/icon-192.png", ...LAZY_UI])),
  );
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(staleCaches(keys).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});
/** Network-first: a good response refreshes the cache; an error passes through; offline, the cache. */
function networkFirst(e, req, key) {
  return fetch(req).then(
    (r) => {
      if (cacheable(r)) {
        const copy = r.clone();
        e.waitUntil(caches.open(CACHE).then((c) => c.put(key, copy)));
      }
      return r;
    },
    () => caches.match(key, { cacheName: CACHE }),
  );
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || !inScope(url)) return;
  if (req.mode === "navigate") {
    e.respondWith(networkFirst(e, req, "./"));
    return;
  }
  if (!url.pathname.startsWith(HASHED)) {
    e.respondWith(networkFirst(e, req, req));
    return;
  }
  e.respondWith(
    caches.match(req, { cacheName: CACHE }).then(
      (hit) =>
        hit ||
        fetch(req).then((r) => {
          if (cacheable(r)) {
            const copy = r.clone();
            e.waitUntil(caches.open(CACHE).then((c) => c.put(req, copy)));
          }
          return r;
        }),
    ),
  );
});
