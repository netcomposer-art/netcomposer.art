// The Studio offline (tools/offline.mjs, tools/offline-sw.js): Chromium against a copy of this site on one origin,
// served as GitHub Pages serves it (max-age=600), going offline with context.setOffline.
//
//   PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tests/offline.e2e.mjs [port, default 5790]
//
// 1. Cold visit online, "Offline ready", the page closed; offline, a new page: every instrument in, Play, the master
//    meter moves; the frames are the saved build's (their ?b= matches the saved BUILD.txt); the line says offline.
// 2. Deploy A, visit, offline, reload on A; online with deploy B: B saves in the background, "Update ready · Reload";
//    the next load is all B (the Studio and every frame), and offline after it too; A's cache is gone. Never A and B
//    in one Studio.
// 3. A save that fails (a 500 on a first visit; a file that changes mid-update) bricks nothing: online works, the
//    saved build (if any) still opens offline, and the next try finishes.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { OFFLINE_DIRS, updateOffline } from "../tools/offline.mjs";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2] ?? process.env.PORT ?? 5790);
const origin = `http://127.0.0.1:${port}`;
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const ok = (m) => console.log(`ok - ${m}`);
const shots = process.env.OFFLINE_SHOTS ?? "";
/** The Studio with its footer in view (the offline line), as a 1440 × 1000 window shows it. */
async function shoot(page, name) {
  await page.locator(".studio-foot").scrollIntoViewIfNeeded();
  await page.screenshot({ path: join(shots, name) });
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

// The served copy, and what goes wrong on purpose for the worker's own downloads (?nc-sw=): path -> "500" | "changed"
// (other bytes than the manifest says: a deploy in between, or a stale CDN copy). The page itself gets the file.
const state = { root: "", broken: new Map(), down: false };
const server = createServer((req, res) => {
  // Offline for everything: some Playwright versions leave a service worker's own fetches online under setOffline.
  if (state.down) return req.socket.destroy();
  const url = new URL(req.url ?? "/", "http://x");
  const path = decodeURIComponent(url.pathname);
  const mode = url.searchParams.has("nc-sw") ? state.broken.get(path) : undefined;
  if (mode === "500") return res.writeHead(500).end("broken on purpose");
  let file = normalize(join(state.root, path));
  if (!file.startsWith(state.root)) return res.writeHead(403).end();
  if (existsSync(file) && !extname(file) && !path.endsWith("/"))
    return res.writeHead(301, { location: `${path}/` }).end();
  if (path.endsWith("/")) file = join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end("not found");
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] ?? "application/octet-stream",
    "cache-control": "max-age=600",
  });
  if (mode === "changed") return res.end(Buffer.concat([readFileSync(file), Buffer.from("\n/* changed */\n")]));
  res.end(readFileSync(file));
});
await new Promise((done) => server.listen(port, "127.0.0.1", done));

/** A copy of what the Studio needs (the offline folders, sw.js, 404.html), as deploy A. */
function copySite() {
  const root = mkdtempSync(join(tmpdir(), "nc-offline-"));
  for (const d of OFFLINE_DIRS) cpSync(join(site, d), join(root, d), { recursive: true });
  for (const f of ["sw.js", "404.html", "index.html"]) cpSync(join(site, f), join(root, f));
  return root;
}

/** Deploy `tag` over a copy: every page marked, every BUILD.txt a new commit, sw.js rewritten for it. */
function deploy(root, tag) {
  for (const d of OFFLINE_DIRS) {
    const page = join(root, d, "index.html");
    if (existsSync(page)) {
      const html = readFileSync(page, "utf8").replace(/<meta name="nc-e2e-build"[^>]*>/, "");
      writeFileSync(page, html.replace("<head>", `<head><meta name="nc-e2e-build" content="${tag}">`));
    }
    const build = join(root, d, "BUILD.txt");
    const commit = createHash("sha1").update(`${tag} ${d}`).digest("hex");
    writeFileSync(build, readFileSync(build, "utf8").replace(/^commit: [0-9a-f]+/m, `commit: ${commit}`));
  }
  return updateOffline({ root }).manifest;
}

/** No connection: the context offline, and the server answering nothing. */
async function offline(ctx, on) {
  state.down = on;
  await ctx.setOffline(on);
}

const browser = await chromium.launch({
  args: ["--autoplay-policy=no-user-gesture-required", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
});

async function studio(ctx, { width = 1440, height = 1000 } = {}) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width, height });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return { page, errors };
}

async function open(page) {
  await page.goto(`${origin}/studio/`);
  await page.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
  // Every instrument in: one channel each, Play enabled once all of them are.
  await page.waitForFunction(() => window.__studio.mixer.list().length === 5, null, { timeout: 30000 });
  await page.waitForSelector(".btn.play:not([disabled])", { timeout: 30000 });
}

async function offlineIs(page, s, timeout = 60000) {
  try {
    await page.waitForSelector(`html[data-studio-offline="${s}"]`, { timeout });
  } catch (e) {
    const seen = await page
      .evaluate(async () => {
        const r = await navigator.serviceWorker.getRegistration("/");
        return {
          line: document.documentElement.dataset.studioOffline ?? null,
          online: navigator.onLine,
          active: r?.active?.state ?? null,
          installing: r?.installing?.state ?? null,
          waiting: r?.waiting?.state ?? null,
          controller: !!navigator.serviceWorker.controller,
          caches: await caches.keys(),
        };
      })
      .catch((x) => String(x));
    throw new Error(`waiting for the line "${s}": ${JSON.stringify(seen)}\n${e.message}`);
  }
}

/** The build each frame and the Studio say they are (the e2e marker), and each frame's ?b=. */
const builds = (page) =>
  page.evaluate(() => {
    const tag = (d) => d.querySelector("meta[name='nc-e2e-build']")?.content ?? null;
    return {
      studio: tag(document),
      frames: [...window.__studio.frames.entries()].map(([id, f]) => ({
        id,
        tag: tag(f.contentDocument),
        b: new URL(f.src).searchParams.get("b"),
      })),
    };
  });

async function playAndMeter(page) {
  await page.click(".btn.play");
  await page.waitForFunction(() => window.__studio.transport.playing(), null, { timeout: 5000 });
  const got = await page.evaluate(
    () =>
      new Promise((done) => {
        const { mixer } = window.__studio;
        let peak = 0;
        let meter = 0;
        const t = setInterval(() => {
          peak = Math.max(peak, mixer.masterPeak());
          const el = document.querySelector("[data-nc-area='master'] .nc-meter-rms");
          const m = /scale(?:Y)?\(([\d.]+)/.exec(el?.style.transform ?? "");
          if (m) meter = Math.max(meter, Number(m[1]));
        }, 20);
        setTimeout(() => {
          clearInterval(t);
          done({ peak, meter });
        }, 4000);
      }),
  );
  await page.click(".btn.play");
  return got;
}

const commitsOf = (root) =>
  Object.fromEntries(
    OFFLINE_DIRS.map((d) => [
      `/${d}/`,
      /^commit: ([0-9a-f]+)/m.exec(readFileSync(join(root, d, "BUILD.txt"), "utf8"))[1].slice(0, 12),
    ]),
  );

function sameBuild(seen, commits, tag, what) {
  assert.equal(seen.studio, tag, `${what}: the Studio is ${tag}`);
  for (const f of seen.frames) {
    assert.equal(f.tag, tag, `${what}: ${f.id} is ${tag} (${JSON.stringify(seen)})`);
    const type = f.id.replace(/#.*$/, "");
    const dir = { "petra-rhythm": "/rhythm/", "olive-bass": "/bass/", "astrid-synth": "/synth/" }[type] ?? `/${type}/`;
    assert.equal(f.b, commits[dir], `${what}: ${f.id}'s ?b= is its saved BUILD.txt`);
  }
}

const roots = [];
try {
  // ---- 1. Cold visit, then a new page offline -----------------------------------------------------------------
  {
    const root = copySite();
    roots.push(root);
    const manifest = deploy(root, "A");
    state.root = root;
    state.down = false;
    const ctx = await browser.newContext();
    const { page, errors } = await studio(ctx);
    await open(page);
    await offlineIs(page, "ready");
    assert.equal((await page.textContent(".foot-offline")).trim(), "Offline ready");
    const saved = await page.evaluate(async () => {
      const keys = (await caches.keys()).filter((k) => k.startsWith("nc-site-"));
      const c = await caches.open(keys[0]);
      return { keys, n: (await c.keys()).length };
    });
    assert.deepEqual(saved.keys, [`nc-site-${manifest.version}`]);
    assert.equal(saved.n, Object.keys(manifest.files).length + 1, "every file, and the build's manifest");
    ok(`a cold visit saves the build (${saved.n - 1} files, ${(manifest.bytes / 1048576).toFixed(2)} MB): "Offline ready"`);
    if (shots) await shoot(page, "offline-ready-light.png");
    await page.close();

    await offline(ctx, true);
    const { page: off, errors: offErrors } = await studio(ctx);
    await open(off);
    sameBuild(await builds(off), commitsOf(root), "A", "offline");
    await offlineIs(off, "offline", 10000);
    assert.equal(
      (await off.textContent(".foot-offline")).trim(),
      "Offline — some features need the internet",
    );
    const heard = await playAndMeter(off);
    assert.ok(heard.peak > 0.01, `offline: the master sounds (peak ${heard.peak.toFixed(3)})`);
    assert.ok(heard.meter > 0, `offline: the master meter moves (${heard.meter})`);
    ok(
      `offline, a new page: every instrument in, Play, the master meter moves (peak ${heard.peak.toFixed(3)}); the frames' ?b= are the saved BUILD.txt`,
    );
    if (shots) await shoot(off, "offline-offline-light.png");
    // The phone: the line is in the ☰ menu.
    if (shots) {
      const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await offline(phone, false);
      const p = await phone.newPage();
      await open(p);
      await offlineIs(p, "ready");
      await p.click(".nc-page-menu-btn, [data-nc-page-menu], .scene > button[aria-haspopup]");
      await p.waitForSelector(".menu-offline:not([hidden])");
      assert.equal(await p.isVisible(".menu-offline"), true, "phone: in the ☰ menu");
      assert.equal(await p.isVisible(".foot-offline"), false, "phone: not at the foot");
      await p.screenshot({ path: join(shots, "offline-ready-phone.png") });
      await offline(phone, true);
      await p.reload();
      await p.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
      await offlineIs(p, "offline", 15000);
      await p.click(".nc-page-menu-btn, [data-nc-page-menu], .scene > button[aria-haspopup]");
      await p.waitForSelector(".menu-offline:not([hidden])");
      await p.screenshot({ path: join(shots, "offline-offline-phone.png") });
      await phone.close();
    }
    assert.deepEqual([...errors, ...offErrors], [], "no page errors");
    await ctx.close();
  }

  // ---- 2. A then B ----------------------------------------------------------------------------------------------
  {
    const root = copySite();
    roots.push(root);
    const a = deploy(root, "A");
    const aCommits = commitsOf(root);
    state.root = root;
    state.down = false;
    const ctx = await browser.newContext();
    const { page } = await studio(ctx);
    await open(page);
    await offlineIs(page, "ready");
    await offline(ctx, true);
    await page.reload();
    await page.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
    await page.waitForSelector(".btn.play:not([disabled])", { timeout: 30000 });
    sameBuild(await builds(page), aCommits, "A", "offline reload");
    ok("deploy A, visit, offline: a reload is A, every frame");

    const b = deploy(root, "B");
    const bCommits = commitsOf(root);
    assert.notEqual(a.version, b.version);
    await offline(ctx, false);
    // Back online, the Studio looks for a new build; B saves in the background while this page stays A.
    await offlineIs(page, "update", 60000);
    assert.match(await page.textContent(".foot-offline"), /^Update ready · Reload$/);
    sameBuild(await builds(page), aCommits, "A", "while B saves");
    ok('online with deploy B: B saved in the background, "Update ready · Reload"; the open page stays A');
    if (shots) await shoot(page, "offline-update-light.png");

    await Promise.all([page.waitForEvent("load"), page.click(".foot-offline .offline-reload")]);
    await page.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
    await page.waitForSelector(".btn.play:not([disabled])", { timeout: 30000 });
    sameBuild(await builds(page), bCommits, "B", "the next load");
    await offlineIs(page, "ready");
    const keys = await page.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith("nc-site-")));
    assert.deepEqual(keys, [`nc-site-${b.version}`], "A's cache is gone once B is saved and loaded");
    await offline(ctx, true);
    await page.reload();
    await page.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
    await page.waitForSelector(".btn.play:not([disabled])", { timeout: 30000 });
    sameBuild(await builds(page), bCommits, "B", "offline after the update");
    const heard = await playAndMeter(page);
    assert.ok(heard.peak > 0.01, `B offline sounds (${heard.peak})`);
    ok("Reload: the Studio and every frame are B, online and then offline; A's cache deleted; B plays offline");
    if (shots) {
      const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const p = await phone.newPage();
      deploy(root, "C");
      // A phone that has C saved and is then shown D: the update line in its ☰ menu.
      await offline(phone, false);
      await open(p);
      await offlineIs(p, "ready");
      await offline(phone, true);
      await p.reload();
      await p.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
      deploy(root, "D");
      await offline(phone, false);
      await offlineIs(p, "update", 60000);
      await p.click(".nc-page-menu-btn, [data-nc-page-menu], .scene > button[aria-haspopup]");
      await p.waitForSelector(".menu-offline:not([hidden])");
      await p.screenshot({ path: join(shots, "offline-update-phone.png") });
      await phone.close();
    }
    await ctx.close();
  }

  // ---- 3. A failed or partial save bricks nothing -----------------------------------------------------------------
  {
    const root = copySite();
    roots.push(root);
    const a = deploy(root, "A");
    const aCommits = commitsOf(root);
    state.root = root;
    state.down = false;
    // (a) The first save fails on one file: online the Studio works and says nothing; no worker takes over.
    const nyxScript = Object.keys(a.files).find((p) => /^\/nyx\/assets\/index-.*\.js$/.test(p));
    state.broken.set(nyxScript, "500");
    const ctx = await browser.newContext();
    const { page, errors } = await studio(ctx);
    await open(page);
    await page.waitForTimeout(10000);
    assert.ok([null, "none"].includes(await page.getAttribute("html", "data-studio-offline")), "no line while nothing is saved");
    assert.equal(await page.isVisible(".foot-offline"), false);
    const first = await page.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistration("/");
      return { active: !!r?.active, keys: await caches.keys() };
    });
    assert.equal(first.active, false, `no worker took over (${JSON.stringify(first)})`);
    const heard = await playAndMeter(page);
    assert.ok(heard.peak > 0.01, "it plays online");
    ok("a first save that fails on one file: the Studio plays online, no line, no worker in charge");
    // Fixed: the next load finishes the save, reusing the files already checked.
    state.broken.clear();
    await open(page);
    await offlineIs(page, "ready");
    ok("fixed, the next load finishes the save: Offline ready");

    // (b) An update with a file that changes mid-download: A stays saved and opens offline, all A.
    const b = deploy(root, "B");
    // A file B has to download (its page is new; unchanged files come from A's cache).
    assert.notEqual(a.files["/synth/index.html"][0], b.files["/synth/index.html"][0]);
    state.broken.set("/synth/index.html", "changed");
    await open(page); // online: the network's B, while B fails to save
    await page.waitForTimeout(10000);
    const mid = await page.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistration("/");
      return { keys: await caches.keys(), waiting: !!r?.waiting, installing: !!r?.installing };
    });
    assert.ok(mid.keys.includes(`nc-site-${a.version}`), `A still saved (${JSON.stringify(mid)})`);
    const line = await page.getAttribute("html", "data-studio-offline");
    assert.ok(
      [null, "none"].includes(line),
      `no update offered, no ready line for B (this page is B from the network; A is what is saved): ${line}`,
    );
    await offline(ctx, true);
    await page.reload();
    await page.waitForSelector("html[data-studio-ready]", { timeout: 30000 });
    await page.waitForSelector(".btn.play:not([disabled])", { timeout: 30000 });
    sameBuild(await builds(page), aCommits, "A", "offline after a failed update");
    const offHeard = await playAndMeter(page);
    assert.ok(offHeard.peak > 0.01, "A plays offline");
    ok("an update with a file changed mid-download: no update offered, A stays saved and plays offline, every frame A");
    state.broken.clear();
    await offline(ctx, false);
    await offlineIs(page, "update", 60000);
    ok("fixed: the update finishes on the next check (Update ready · Reload)");
    assert.deepEqual(errors, [], "no page errors");
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
  for (const r of roots) rmSync(r, { recursive: true, force: true });
}
