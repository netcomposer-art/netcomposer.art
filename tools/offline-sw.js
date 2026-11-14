// netcomposer.art's one service worker, scope / (tools/offline.mjs writes /sw.js: this file with the build's
// manifest in front). Once a visit has saved a site build, the Studio and every instrument it frames open with no
// connection: after the tab closes, the browser restarts, on a plane.
//
// One cache per site build, "nc-site-<version>" (the version is a hash of every file's sha256). Install saves every
// file the manifest lists, each checked against its sha256, so a cache only ever holds one build: a file that
// changed on the server mid-download (a deploy in between) fails the install, and a failed or half-done install
// never touches the build already saved (the old worker keeps serving it; the next try reuses what was checked).
//
// Requests:
// - pages (index.html), BUILD.txt and other files without a hash in their name (manifests, nc-ui, icons, ARIA's
//   recording): the network first, revalidated past the HTTP cache; the saved copy when the network fails or takes
//   over 3 s. Nothing from the network is written into a saved build.
// - a frame the Studio loads by its build (?b=<commit>, nc-studio #100) whose build is saved: the saved page, so the
//   BUILD.txt the Studio read and the frame it gets always match.
// - a page served from a saved build keeps to that build (its BUILD.txt reads and files), so a slow network never
//   mixes two builds in one Studio.
// - hashed files (assets/<name>-<hash>.js, .css, worklets, fonts, wasm): the saved copy first; never stale.
// - everything else (other origins: the musicmatter Library, the Sample Picker on this computer, EarthScope;
//   /plugins/; pages outside the apps): not answered here, so the network as always, and never saved.
//
// A new build: the browser finds a new /sw.js; it saves the new build in the background, then takes over
// (skipWaiting, clients.claim) and tells the pages, which offer "Update ready · Reload" when they run an older one.
// Chrome may hold a saved build back while the old worker is busy; the page offers the update then too, and its
// Reload asks the waiting worker to take over first ("nc-offline:skip-waiting").
// The previous build stays while another tab may still run it, and goes at the next page load with one tab open.
/* global MANIFEST */
const M = MANIFEST;
const PREFIX = "nc-site-";
const CACHE = PREFIX + M.version;
const META = "/__nc-offline/manifest.json";
const WAIT_MS = 3000;
const SHA = "x-nc-sha256";
// The retired workers' caches (ASTRID /synth/, OLIVE /bass/): their files are reused when they match, then dropped.
const LEGACY = [/^nc-synth-[0-9a-f]{12}$/, /^olive-bass-/];
const DIRS = Object.keys(M.apps);
const HASHED = /\/assets\/[^/]+-[\w-]{8,}\.[a-z0-9]+$/i;

/** clientId → the saved build (cache name) a page or frame was served from. In memory: a page's first seconds. */
const pins = new Map();

function dirOf(path) {
  return DIRS.find((d) => path.startsWith(d)) ?? null;
}

/** The path a request reads, as the manifest names it: /studio/ and /studio are /studio/index.html. */
function keyOf(url) {
  let path = url.pathname;
  if (DIRS.includes(`${path}/`)) path += "/";
  if (path.endsWith("/")) path += "index.html";
  return path;
}

function kindOf(path) {
  const listed = M.files[path];
  if (listed) return listed[2];
  if (path.endsWith("/index.html")) return "page";
  return HASHED.test(path) ? "immutable" : "fresh";
}

function plain(text, status = 503) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

function timeout(ms) {
  return new Promise((done) => setTimeout(() => done(null), ms));
}

async function hex(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function siteCaches() {
  return (await caches.keys()).filter((k) => k.startsWith(PREFIX));
}

const metas = new Map();
/** A saved build's manifest, or null while it is incomplete (META is written last). */
async function metaOf(name) {
  if (metas.has(name)) return metas.get(name);
  const res = await (await caches.open(name)).match(META);
  const meta = res ? await res.json() : null;
  if (meta) metas.set(name, meta);
  return meta;
}

let builds = null;
/** The saved builds, this worker's first, then the newest (remembered for a second: every request asks). */
async function savedBuilds() {
  if (!builds || Date.now() - builds.at > 1000) builds = { at: Date.now(), list: listBuilds() };
  return builds.list;
}

async function listBuilds() {
  const out = [];
  for (const name of await siteCaches()) {
    const meta = await metaOf(name);
    if (meta) out.push({ name, meta });
  }
  return out.sort((a, b) =>
    a.name === CACHE ? -1 : b.name === CACHE ? 1 : String(b.meta.built).localeCompare(String(a.meta.built)),
  );
}

async function fromBuild(name, path) {
  return (await caches.open(name)).match(path, { ignoreSearch: true });
}

// ---- install: save the build -------------------------------------------------------------------------------

/** A checked copy of `path` already on this machine: this build's partial cache, an older build, a retired cache. */
async function reuse(path, sha, own) {
  const hit = await own.match(path);
  if (hit && hit.headers.get(SHA) === sha) return "kept";
  for (const name of await caches.keys()) {
    if (name === CACHE) continue;
    const legacy = LEGACY.some((re) => re.test(name));
    if (!legacy && !name.startsWith(PREFIX)) continue;
    const old = await (await caches.open(name)).match(new URL(path, self.location.origin).href, {
      ignoreSearch: true,
    });
    if (!old) continue;
    if (!legacy && old.headers.get(SHA) === sha) return old;
    if (legacy && old.ok) {
      const body = await old.clone().arrayBuffer();
      if ((await hex(body)) === sha) return stored(body, old.headers.get("content-type"), sha);
    }
  }
  return null;
}

function stored(body, type, sha) {
  return new Response(body, {
    status: 200,
    headers: { "content-type": type || "application/octet-stream", [SHA]: sha },
  });
}

async function download(path, sha) {
  // The query sets this copy apart from any older one in an HTTP cache or CDN on the way.
  const res = await fetch(`${path}?nc-sw=${sha.slice(0, 12)}`, { cache: "no-store", credentials: "same-origin" });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  const body = await res.arrayBuffer();
  if ((await hex(body)) !== sha) throw new Error(`${path}: not the file this build lists (a deploy in between?)`);
  return stored(body, res.headers.get("content-type"), sha);
}

/** Runs `work` over every item, `size` at a time; every item is tried (so a retry has less to fetch), then the first
 * error, if any, is thrown. */
async function pool(items, size, work) {
  let next = 0;
  let failed = null;
  const run = async () => {
    while (next < items.length) {
      const item = items[next++];
      try {
        await work(item);
      } catch (e) {
        failed ??= e;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, run));
  if (failed) throw failed;
}

async function save() {
  const own = await caches.open(CACHE);
  await own.delete(META); // not complete until every file is in
  await pool(Object.entries(M.files), 4, async ([path, [sha]]) => {
    const got = await reuse(path, sha, own);
    if (got === "kept") return;
    await own.put(path, got ?? (await download(path, sha)));
  });
  await own.put(META, new Response(JSON.stringify(M), { headers: { "content-type": "application/json" } }));
  builds = null;
}

self.addEventListener("install", (event) => {
  event.waitUntil(save().then(() => self.skipWaiting()));
});

// ---- activate: take over, tidy up --------------------------------------------------------------------------

async function topPages() {
  const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  return all.filter((c) => c.frameType === "top-level");
}

const KEPT = "/__nc-offline/kept";

async function dropBuild(name) {
  metas.delete(name);
  await caches.delete(name);
  builds = null;
}

/**
 * When this build takes over: every other build's cache goes (the retired workers' too), except the newest saved one
 * while a page is open, since that page may still run it (its frames, its "Update ready · Reload"). The kept one is
 * noted in this build's cache, and goes at the next page load with at most one page open (the one being loaded).
 * Only the worker taking over drops builds, so a worker never deletes a newer build that is still being saved.
 */
async function takeOver() {
  const pages = (await topPages()).length;
  const keep = pages > 0 ? ((await savedBuilds()).find((b) => b.name !== CACHE)?.name ?? null) : null;
  for (const name of await siteCaches()) if (name !== CACHE && name !== keep) await dropBuild(name);
  for (const name of await caches.keys()) if (LEGACY.some((re) => re.test(name))) await caches.delete(name);
  const own = await caches.open(CACHE);
  if (keep) await own.put(KEPT, new Response(keep));
  else await own.delete(KEPT);
}

/** A page loads: the build kept at the take-over goes once no other page is open. */
async function dropKept() {
  const own = await caches.open(CACHE);
  const kept = await own.match(KEPT);
  if (!kept || (await topPages()).length > 1) return;
  await dropBuild(await kept.text());
  await own.delete(KEPT);
}

async function tell(message) {
  for (const c of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) c.postMessage(message);
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await takeOver();
      await self.clients.claim();
      await tell({ type: "nc-offline:activated", version: M.version });
    })(),
  );
});

// ---- status for the pages ----------------------------------------------------------------------------------

/** A page runs `meta`'s build when its script is in it and each frame's build (?b=) is the one it saved. */
function runs(meta, script, apps) {
  if (script && !meta.files[script]) return false;
  return Object.entries(apps).every(([dir, b]) => !meta.apps[dir] || meta.apps[dir] === b);
}

/** Which saved build a page runs: this worker's ("current"), an older one ("older"), or neither ("unknown"). */
async function placeOf(script, apps) {
  if (!script && !Object.keys(apps).length) return "unknown";
  if (runs(M, script, apps)) return "current";
  for (const { name, meta } of await savedBuilds()) if (name !== CACHE && runs(meta, script, apps)) return "older";
  return "unknown";
}

self.addEventListener("message", (event) => {
  const data = event.data;
  // "Update ready · Reload" on a page: a saved build still waiting takes over now (nc-studio offline.ts).
  if (data?.type === "nc-offline:skip-waiting") {
    event.waitUntil(self.skipWaiting());
    return;
  }
  if (!data || data.type !== "nc-offline:status") return;
  const reply = event.ports?.[0] ?? event.source;
  event.waitUntil(
    (async () => {
      const ready = !!(await metaOf(CACHE));
      reply?.postMessage({
        type: "nc-offline:status",
        version: M.version,
        ready,
        bytes: M.bytes,
        files: Object.keys(M.files).length,
        page: await placeOf(data.script, data.builds && typeof data.builds === "object" ? data.builds : {}),
      });
    })(),
  );
});

// ---- fetch -------------------------------------------------------------------------------------------------

/**
 * The network, revalidated past the HTTP cache. `first` is null when it fails, answers with a server error, or takes
 * over WAIT_MS (then the saved copy); `late` is whatever it gives in the end.
 */
function network(request) {
  const late = fetch(request, { cache: "no-cache" }).catch(() => null);
  const usable = late.then((r) => (r && r.status < 500 ? r : null));
  return { first: Promise.race([usable, timeout(WAIT_MS)]), late };
}

function pin(event, name) {
  const id = event.resultingClientId || event.clientId;
  if (id) pins.set(id, name);
}

async function respondPage(event, path) {
  const url = new URL(event.request.url);
  const dir = dirOf(path);
  // A frame loaded by its build (?b=<commit>) whose build is saved: that page, never another build's.
  const b = url.searchParams.get("b");
  if (b && dir)
    for (const { name, meta } of await savedBuilds())
      if (meta.apps[dir] === b) {
        const hit = await fromBuild(name, path);
        if (hit) {
          pin(event, name);
          return hit;
        }
      }
  const pinned = pins.get(event.clientId);
  if (pinned && event.request.mode !== "navigate") {
    const hit = await fromBuild(pinned, path);
    if (hit) return hit;
  }
  const { first, late } = network(event.request);
  const fresh = await first;
  if (fresh) return fresh;
  for (const { name } of await savedBuilds()) {
    const hit = await fromBuild(name, path);
    if (hit) {
      pin(event, name);
      return hit;
    }
  }
  return (await late) ?? plain("Offline. This page isn't saved on this computer yet.");
}

async function respondFresh(event, path) {
  const pinned = pins.get(event.clientId);
  if (pinned) {
    const hit = await fromBuild(pinned, path);
    if (hit) return hit;
  }
  const { first, late } = network(event.request);
  const fresh = await first;
  if (fresh) return fresh;
  for (const { name } of await savedBuilds()) {
    const hit = await fromBuild(name, path);
    if (hit) return hit;
  }
  return (await late) ?? plain("Offline.");
}

async function respondImmutable(event, path) {
  const pinned = pins.get(event.clientId);
  const order = (await savedBuilds()).map((b) => b.name);
  if (pinned) order.unshift(pinned);
  for (const name of order) {
    const hit = await fromBuild(name, path);
    if (hit) return hit;
  }
  try {
    return await fetch(event.request);
  } catch {
    return plain("Offline.");
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const path = keyOf(url);
  if (!dirOf(path)) return;
  // Every other file of an app is in the build; anything not listed (a file a newer build dropped, a 404) the network.
  const kind = kindOf(path);
  if (kind === "page") {
    event.respondWith(respondPage(event, path));
    if (request.mode === "navigate" && request.destination === "document") event.waitUntil(dropKept());
  } else if (kind === "immutable") event.respondWith(respondImmutable(event, path));
  else event.respondWith(respondFresh(event, path));
});
