/* ASTRID's own service worker, retired. netcomposer.art/sw.js (scope /) serves /synth/ now, offline included.
   An old registration of this file deletes its caches (nc-synth-<12 hex> only; the site shares the origin)
   and unregisters itself. No fetch handler: it never answers a request. */
async function dropCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => /^nc-synth-[0-9a-f]{12}$/.test(key)).map((key) => caches.delete(key)));
}
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(dropCaches().catch(() => undefined));
});
// Unregister once active, not inside install's waitUntil: the unregister job waits for the install job to end.
self.addEventListener('activate', (event) => {
  event.waitUntil(dropCaches().catch(() => undefined).then(() => {
    self.registration.unregister().catch(() => undefined);
  }));
});
