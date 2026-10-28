// OLIVE Bass service worker. It is served from /bass/sw.js with scope /bass/, sharing the
// netcomposer.art origin with ASTRID (/synth/), Rhythm (/rhythm/) and Create (/create/).
// Rules: every cache Bass creates is named "olive-bass-*", activate deletes only stale
// "olive-bass-*" caches (never another app's), and fetch only handles same-origin GETs
// inside the scope.
// Shell: precached on install. HTML: network-first. Hashed assets: cache-first.
// Only a good same-origin response (ok and type "basic") is ever cached. A 404/500 or an opaque
// response passes through to the page uncached and never replaces the good copy already cached.
const PREFIX = "olive-bass-";
const CACHE = `${PREFIX}v2`;
const SCOPE = new URL("./", self.location.href).pathname;

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
      .then((c) => c.addAll(["./", "./manifest.webmanifest", "./icons/icon-192.png"])),
  );
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(staleCaches(keys).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || !inScope(new URL(req.url))) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (cacheable(r)) {
            const copy = r.clone();
            e.waitUntil(caches.open(CACHE).then((c) => c.put("./", copy)));
          }
          return r;
        })
        .catch(() => caches.match("./", { cacheName: CACHE })),
    );
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
