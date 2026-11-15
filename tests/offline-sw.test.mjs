// node --test tests/offline-sw.test.mjs
// The site's service worker (tools/offline-sw.js, written to /sw.js by tools/offline.mjs) in a VM, with a fake
// CacheStorage and network: what it answers and what it leaves to the network, a save that must match every
// sha256, and a frame loaded by its build served from the saved build that has it.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";
import vm from "node:vm";
import { workerSource } from "../tools/offline.mjs";

const ORIGIN = "https://netcomposer.art";
const sha = (text) => createHash("sha256").update(text).digest("hex");

function build(tag) {
  const bodies = {
    "/studio/index.html": `<html>studio ${tag}</html>`,
    "/studio/BUILD.txt": `commit: ${tag.repeat(40).slice(0, 40)}\n`,
    "/studio/assets/index-AbCdEfGh.js": "console.log('studio')",
    "/synth/index.html": `<html>synth ${tag}</html>`,
    "/synth/BUILD.txt": `commit: ${("5" + tag).repeat(20).slice(0, 40)}\n`,
    "/nc-ui/nc-ui.css": ":root{}",
  };
  const kinds = { "index.html": "page", "BUILD.txt": "build" };
  const files = Object.fromEntries(
    Object.entries(bodies).map(([p, b]) => [
      p,
      [sha(b), b.length, kinds[p.split("/").pop()] ?? (/assets\//.test(p) ? "immutable" : "fresh")],
    ]),
  );
  const apps = {
    "/studio/": bodies["/studio/BUILD.txt"].slice(8, 20),
    "/synth/": bodies["/synth/BUILD.txt"].slice(8, 20),
    "/nc-ui/": "a47537f8e770",
  };
  return { bodies, manifest: { version: sha(tag).slice(0, 12), built: tag, bytes: 1, apps, files } };
}

function fakeCaches() {
  const store = new Map();
  const keyOf = (req, ignoreSearch) => {
    const u = new URL(typeof req === "string" ? req : req.url, ORIGIN);
    if (ignoreSearch) u.search = "";
    return u.href;
  };
  const open = async (name) => {
    if (!store.has(name)) store.set(name, new Map());
    const c = store.get(name);
    return {
      put: async (req, res) => void c.set(keyOf(req), res.clone()),
      match: async (req, o = {}) => {
        const want = keyOf(req, o.ignoreSearch);
        for (const [k, v] of c) if ((o.ignoreSearch ? keyOf(k, true) : k) === want) return v.clone();
        return undefined;
      },
      delete: async (req) => c.delete(keyOf(req)),
      keys: async () => [...c.keys()],
    };
  };
  return {
    store,
    api: { open, keys: async () => [...store.keys()], delete: async (n) => store.delete(n) },
  };
}

function load(manifest, { caches, network }) {
  const listeners = {};
  const self = {
    location: new URL(`${ORIGIN}/sw.js`),
    addEventListener: (t, fn) => void (listeners[t] = fn),
    skipWaiting: async () => {},
    clients: { matchAll: async () => [], claim: async () => {} },
  };
  vm.runInNewContext(workerSource(manifest), {
    self,
    caches: caches.api,
    fetch: network,
    crypto: globalThis.crypto,
    Response,
    Request,
    Headers,
    URL,
    setTimeout,
    clearTimeout,
    console,
  });
  return listeners;
}

/** Runs a lifecycle event; resolves with what waitUntil was given. */
async function lifecycle(listeners, type) {
  let done = Promise.resolve();
  listeners[type]({ waitUntil: (p) => void (done = p) });
  return done;
}

/** Dispatches a fetch; resolves with the Response, or null when the worker leaves it to the network. */
async function request(listeners, url, { mode = "cors", method = "GET", destination = "", clientId = "" } = {}) {
  let answer = null;
  listeners.fetch({
    request: { url: new URL(url, ORIGIN).href, method, mode, destination },
    clientId,
    resultingClientId: mode === "navigate" ? "new-client" : "",
    respondWith: (p) => void (answer = p),
    waitUntil: () => {},
  });
  return answer ? await answer : null;
}

function server(bodies, calls = []) {
  return async (req) => {
    const url = new URL(typeof req === "string" ? req : req.url, ORIGIN);
    calls.push(url.pathname + url.search);
    const body = bodies[url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname];
    if (body === undefined) return new Response("not found", { status: 404 });
    return new Response(body, { headers: { "content-type": "text/plain" } });
  };
}
const offline = async () => {
  throw new TypeError("Failed to fetch");
};

test("leaves the network alone for other origins, /plugins/, pages outside the apps, and anything not a GET", async () => {
  const { manifest } = build("a");
  const l = load(manifest, { caches: fakeCaches(), network: offline });
  for (const url of [
    "https://musicmatter.art/library/library.json",
    "http://127.0.0.1:5199/kit",
    "/plugins/registry.json",
    "/audio/x.wav",
    "/create/",
    "/",
  ])
    assert.equal(await request(l, url), null, `${url} is not answered (never saved)`);
  assert.equal(await request(l, "/studio/", { method: "POST" }), null);
});

test("a save checks every file's sha256: one wrong file and the build is not saved; all right and it is", async () => {
  const { bodies, manifest } = build("a");
  const caches = fakeCaches();
  const wrong = { ...bodies, "/synth/index.html": "<html>a newer deploy</html>" };
  await assert.rejects(lifecycle(load(manifest, { caches, network: server(wrong) }), "install"), /not the file/);
  const name = `nc-site-${manifest.version}`;
  const meta = await (await caches.api.open(name)).match("/__nc-offline/manifest.json");
  assert.equal(meta, undefined, "not marked saved");
  const calls = [];
  await lifecycle(load(manifest, { caches, network: server(bodies, calls) }), "install");
  assert.ok(await (await caches.api.open(name)).match("/__nc-offline/manifest.json"), "saved");
  assert.deepEqual(calls.map((c) => c.split("?")[0]), ["/synth/index.html"], "the retry fetched only what was missing");
  assert.ok(calls.every((c) => c.includes("?nc-sw=")), "past any stale copy on the way");
});

test("offline: a frame by its build gets the saved page; BUILD.txt and hashed files come from the saved build", async () => {
  const { bodies, manifest } = build("a");
  const caches = fakeCaches();
  await lifecycle(load(manifest, { caches, network: server(bodies) }), "install");
  const calls = [];
  const l = load(manifest, {
    caches,
    network: async (req) => {
      calls.push(String(req.url ?? req));
      throw new TypeError("offline");
    },
  });
  const frame = await request(l, `/synth/?instance=1&b=${manifest.apps["/synth/"]}`, {
    mode: "navigate",
    destination: "iframe",
  });
  assert.equal(await frame.text(), bodies["/synth/index.html"]);
  assert.deepEqual(calls, [], "a frame by its saved build never waits for the network");
  assert.equal(await (await request(l, "/synth/BUILD.txt")).text(), bodies["/synth/BUILD.txt"]);
  assert.equal(await (await request(l, "/studio/assets/index-AbCdEfGh.js")).text(), bodies["/studio/assets/index-AbCdEfGh.js"]);
  const page = await request(l, "/studio/", { mode: "navigate", destination: "document" });
  assert.equal(await page.text(), bodies["/studio/index.html"]);
});

test("online: pages and BUILD.txt are the network's (a deploy is never served stale); hashed files the saved copy", async () => {
  const a = build("a");
  const b = build("b");
  const caches = fakeCaches();
  await lifecycle(load(a.manifest, { caches, network: server(a.bodies) }), "install");
  const calls = [];
  const l = load(a.manifest, { caches, network: server(b.bodies, calls) });
  assert.equal(await (await request(l, "/studio/", { mode: "navigate", destination: "document" })).text(), b.bodies["/studio/index.html"]);
  assert.equal(await (await request(l, "/synth/BUILD.txt")).text(), b.bodies["/synth/BUILD.txt"]);
  // A frame by B's build (not saved) goes to the network.
  const frame = await request(l, `/synth/?b=${b.manifest.apps["/synth/"]}`, { mode: "navigate", destination: "iframe" });
  assert.equal(await frame.text(), b.bodies["/synth/index.html"]);
  calls.length = 0;
  await request(l, "/studio/assets/index-AbCdEfGh.js");
  assert.deepEqual(calls, [], "hashed: the saved copy, no network");
});

test("a server error online falls back to the saved page; a 404 is the network's", async () => {
  const { bodies, manifest } = build("a");
  const caches = fakeCaches();
  await lifecycle(load(manifest, { caches, network: server(bodies) }), "install");
  const l = load(manifest, { caches, network: async () => new Response("bad gateway", { status: 502 }) });
  const page = await request(l, "/studio/", { mode: "navigate", destination: "document" });
  assert.equal(await page.text(), bodies["/studio/index.html"]);
  const l404 = load(manifest, { caches, network: server({}) });
  assert.equal((await request(l404, "/synth/missing.png")).status, 404);
});

test("a page served from a saved build keeps to it: its BUILD.txt reads never mix in a newer build", async () => {
  const a = build("a");
  const b = build("b");
  const caches = fakeCaches();
  await lifecycle(load(a.manifest, { caches, network: server(a.bodies) }), "install");
  // The network is slow for the page (over 3 s), then fast with deploy B.
  let slow = true;
  const net = server(b.bodies);
  const l = load(a.manifest, {
    caches,
    network: (req) => (slow ? new Promise((r) => setTimeout(() => r(net(req)), 3500)) : net(req)),
  });
  const page = await request(l, "/studio/", { mode: "navigate", destination: "document" });
  assert.equal(await page.text(), a.bodies["/studio/index.html"], "the saved page after 3 s");
  slow = false;
  const read = await request(l, "/synth/BUILD.txt", { clientId: "new-client" });
  assert.equal(await read.text(), a.bodies["/synth/BUILD.txt"], "that page's BUILD.txt is A's, not the network's B");
});
