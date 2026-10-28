// 404.html on one origin, as GitHub Pages serves it (the root 404.html, status 404, for any path with no file).
//   PLAYWRIGHT_MODULE=<path to playwright-core/index.mjs or "playwright"> node tests/404.e2e.mjs
// Checks:
// - a bad page route under /synth/ loads ASTRID in place (same URL, status 404, no redirect, no extra
//   history entry, one fetch of /synth/) and ASTRID shows its own Not found page;
// - bad page routes under /rhythm/ and /bass/ (no router in those apps yet) get the plain page with a
//   link to the app, and no app;
// - a missing asset in each app (.js .css .wasm .json .png, assets/, icons/, sw, manifest) is a real 404 with
//   no app shell, and a module import of a missing .js fails instead of running anything;
// - an unknown path outside the apps gets the plain page; if the app shell can't be fetched, so does
//   /synth/<bad>, with no loop;
// - existing pages are served unchanged (200, same bytes as the files).
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const port = 5726;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [join(site, "tools/serve-local.mjs"), String(port)], {
  stdio: "ignore",
});
const notFoundHtml = readFileSync(join(site, "404.html"), "utf8");
const ok = (m) => console.log(`ok - ${m}`);
const appScripts = () =>
  [...document.querySelectorAll("script[src],link[rel=modulepreload],link[rel=stylesheet]")]
    .map((e) => e.getAttribute("src") ?? e.getAttribute("href"))
    .filter((u) => /^\/(synth|rhythm|bass)\//.test(u));
let browser;
try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`${origin}/`)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const fresh = async () => {
    const ctx = await browser.newContext();
    await ctx.route("https://synth.netcomposer.art/**", (r) => r.abort()); // keep the synth's API off production
    return ctx;
  };

  // Existing pages: unchanged.
  for (const [path, file] of [
    ["/", "index.html"],
    ["/synth/", "synth/index.html"],
    ["/rhythm/", "rhythm/index.html"],
    ["/bass/", "bass/index.html"],
    ["/create/", "create/index.html"],
    ["/nc.css", "nc.css"],
  ]) {
    const r = await fetch(origin + path);
    assert.equal(r.status, 200, path);
    assert.equal(await r.text(), readFileSync(join(site, file), "utf8"), `${path} body`);
  }
  ok("existing pages: 200, same bytes as their files");

  // Missing assets: status 404, the plain page's bytes (Pages can only send HTML), never an app shell.
  const assets = [
    "/synth/assets/nope.js", "/synth/assets/nope.css", "/synth/nope.wasm", "/synth/data/nope.json",
    "/synth/icons/nope.png", "/synth/sw-old.js", "/synth/manifest", "/synth/favicon", "/synth/assets/chunk",
    "/rhythm/assets/nope.js", "/rhythm/nope.css", "/rhythm/manifest.json",
    "/bass/assets/nope.js", "/bass/icons/nope.png", "/bass/nope.wasm", "/bass/sw",
    "/nope.js", "/assets/nope.css",
  ];
  for (const path of assets) {
    const r = await fetch(origin + path);
    assert.equal(r.status, 404, `${path} status`);
    assert.equal(await r.text(), notFoundHtml, `${path} body is the plain 404.html`);
  }
  {
    const ctx = await fresh();
    const page = await ctx.newPage();
    for (const path of ["/synth/assets/nope.js", "/synth/nope.wasm", "/rhythm/assets/nope.css", "/bass/icons/nope.png", "/synth/manifest"]) {
      const shells = [];
      const onReq = (r) => { if (new URL(r.url()).pathname.match(/^\/(synth|rhythm|bass)\/$/)) shells.push(r.url()); };
      page.on("request", onReq);
      const res = await page.goto(origin + path);
      assert.equal(res.status(), 404, `${path} status`);
      await page.waitForTimeout(300);
      page.off("request", onReq);
      assert.deepEqual(shells, [], `${path}: no app shell fetched`);
      assert.deepEqual(await page.evaluate(appScripts), [], `${path}: no app scripts`);
      assert.equal(await page.locator("h1").textContent(), "Not found", path);
      assert.equal(await page.evaluate(() => window.__nc404.fileLike), true, `${path} is file-like`);
    }
    // A module that imports a missing chunk fails (HTML is not JavaScript); nothing runs.
    await page.goto(`${origin}/`);
    for (const path of ["/synth/assets/nope.js", "/rhythm/assets/nope.js", "/bass/assets/nope.js"]) {
      const err = await page.evaluate((u) => import(u).then(() => null, (e) => String(e)), path);
      assert.ok(err, `${path}: import must fail`);
    }
    await ctx.close();
  }
  ok(`missing assets (${assets.length}): status 404, no app shell, imports fail`);

  // /synth/<bad page>: ASTRID in place, its own Not found.
  for (const path of ["/synth/nope", "/synth/presets/nope/deeper", "/synth/Nope?x=1#y"]) {
    const ctx = await fresh();
    const page = await ctx.newPage();
    const errors = [];
    const docs = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => { if (r.isNavigationRequest() || new URL(r.url()).pathname === "/synth/") docs.push(new URL(r.url()).pathname); });
    await page.goto(`${origin}/`);
    const before = await page.evaluate(() => history.length);
    const res = await page.goto(origin + path);
    assert.equal(res.status(), 404, `${path} status`);
    await page.getByText("This address is not part of ASTRID").waitFor({ timeout: 15000 });
    assert.equal(page.url(), origin + path, `${path}: URL unchanged`);
    assert.equal(await page.evaluate(() => history.length), before + 1, `${path}: one history entry`);
    assert.ok((await page.evaluate(appScripts)).some((u) => u.startsWith("/synth/assets/")), `${path}: ASTRID's scripts`);
    await page.waitForTimeout(1000);
    assert.deepEqual(docs, ["/", new URL(origin + path).pathname, "/synth/"], `${path}: no redirect, one shell fetch`);
    assert.deepEqual(errors, [], `${path}: page errors`);
    // Back returns to the page before, and the in-app link opens the synth.
    await page.goBack();
    assert.equal(page.url(), `${origin}/`);
    await ctx.close();
  }
  ok("/synth/<bad>: status 404, ASTRID's Not found in place, URL and history clean, no errors");

  // /rhythm/<bad>, /bass/<bad>, /<bad>: the plain page.
  for (const [path, text, href] of [
    ["/rhythm/nope", "Open PETRA Rhythm", "/rhythm/"],
    ["/bass/nope/deeper", "Open OLIVE Bass", "/bass/"],
    ["/nope", "netcomposer.art", "/"],
    ["/create/nope", "netcomposer.art", "/"],
    ["/synthesizer", "netcomposer.art", "/"],
  ]) {
    const ctx = await fresh();
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(origin + path);
    assert.equal(res.status(), 404, `${path} status`);
    await page.waitForTimeout(300);
    assert.equal(await page.locator("h1").textContent(), "Not found", path);
    assert.equal(await page.locator("#home").textContent(), text, path);
    assert.equal(await page.locator("#home").getAttribute("href"), href, path);
    assert.deepEqual(await page.evaluate(appScripts), [], `${path}: no app`);
    assert.equal(page.url(), origin + path, `${path}: URL unchanged`);
    assert.deepEqual(errors, [], `${path}: page errors`);
    // No green: the accent is Prussian blue.
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--nc-ui-color-accent").trim()), "#003153");
    await ctx.close();
  }
  ok("/rhythm/<bad>, /bass/<bad> and unknown paths: the plain 404 with the right link");

  // If the shell can't be fetched (or isn't ASTRID), /synth/<bad> falls back to the plain page; no loop.
  for (const fulfil of [
    { status: 404, contentType: "text/html", body: notFoundHtml },
    { status: 200, contentType: "text/html", body: "<p>not the app</p>" },
  ]) {
    const ctx = await fresh();
    let shellFetches = 0;
    await ctx.route(`${origin}/synth/`, (r) => { shellFetches++; return r.fulfill(fulfil); });
    const page = await ctx.newPage();
    await page.goto(`${origin}/synth/nope`);
    await page.locator("#home").filter({ hasText: "Open ASTRID" }).waitFor();
    await page.waitForTimeout(500);
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).visibility), "visible");
    assert.equal(shellFetches, 1, "one shell fetch, no loop");
    await ctx.close();
  }
  ok("/synth/<bad> without a usable shell: plain 404, one fetch, no loop");
} finally {
  await browser?.close();
  server.kill();
}
