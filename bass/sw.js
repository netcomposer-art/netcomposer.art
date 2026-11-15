// OLIVE Bass's own service worker, retired. netcomposer.art/sw.js (scope /) serves /bass/ now, offline
// included: one cache per site build for the Studio and every instrument (netcomposer.art tools/offline.mjs).
// A worker at /bass/ would take precedence over it for /bass/ (a nested scope wins) and keep its own copy.
// This file stays at /bass/sw.js only for browsers that registered the old worker: their next update check
// fetches it, and it deletes the old "olive-bass-*" caches (never another app's: the site shares the origin)
// and unregisters itself once active. No fetch handler: it never answers a request. Nothing registers it.
const PREFIX = "olive-bass-";

async function dropCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k.startsWith(PREFIX)).map((k) => caches.delete(k)));
}

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(dropCaches().catch(() => undefined));
});
// Unregister once active, not inside install's waitUntil: the unregister job waits for the install job to end.
self.addEventListener("activate", (e) => {
  e.waitUntil(
    dropCaches()
      .catch(() => undefined)
      .then(() => {
        self.registration.unregister().catch(() => undefined);
      }),
  );
});
