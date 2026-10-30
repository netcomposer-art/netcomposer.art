// Loads every published instrument on one origin, as GitHub Pages serves them.
//   PLAYWRIGHT_MODULE=<path to playwright-core/index.mjs or "playwright"> node tests/one-origin.e2e.mjs
// Checks:
// - each app's page and assets come from its own path;
// - the service workers are scoped to /synth/ and /bass/ and leave the others' caches alone
//   (including Create's nc-clips);
// - a BroadcastChannel message (NC Sync's transport) from one app's page reaches the others.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { APPS, UI_BASE } from "../tools/apps.mjs";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const port = 5721;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [join(site, "tools/serve-local.mjs"), String(port)], {
  stdio: "ignore",
});
const apps = ["synth", "rhythm", "bass", "studio"].filter((a) => existsSync(join(site, a, "index.html")));
// The Studio loads the instruments in iframes from their own paths (tools/apps.mjs alsoLoads).
// Every app may also read the one live nc-ui at /nc-ui/ (tools/pull-ui.mjs).
const allowed = (app) => [`/${app}/`, UI_BASE, ...(APPS[app].alsoLoads ?? [])];
const ok = (m) => console.log(`ok - ${m}`);
let browser;
try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`${origin}/`)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const ctx = await browser.newContext();
  // The synth's API (and its one-time copy from the old address) live on synth.netcomposer.art.
  // Keep this test off production: those requests fail here, which the synth handles as offline.
  const external = [];
  await ctx.route("https://synth.netcomposer.art/**", (route) => {
    external.push(new URL(route.request().url()).pathname);
    return route.abort();
  });
  // Create's clip cache and a foreign cache exist before any app loads.
  const seed = await ctx.newPage();
  await seed.goto(`${origin}/create/`);
  await seed.evaluate(async () => {
    for (const n of ["nc-clips", "someone-else"])
      await (await caches.open(n)).put("/x", new Response("keep"));
  });
  const pages = {};
  for (const app of apps) {
    const page = await ctx.newPage();
    const errors = [];
    const outside = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      const u = new URL(r.url());
      if (u.origin === origin && !allowed(app).some((p) => u.pathname.startsWith(p))) outside.push(u.pathname);
    });
    await page.goto(`${origin}/${app}/`);
    await page.waitForLoadState("load");
    await page.waitForTimeout(2500); // live streams never go idle; give the app time to settle
    assert.deepEqual(errors, [], `${app}: page errors`);
    assert.deepEqual(outside, [], `${app}: requests outside ${allowed(app).join(", ")}`);
    pages[app] = page;
    ok(`/${app}/ loads, every request under ${allowed(app).join(", ")}, no errors`);
  }
  if (apps.includes("synth")) {
    // ASTRID no longer has Situation or the Meaning filter (NetComposer-Synth #64): it calls no API.
    assert.deepEqual(external.filter((p) => p.startsWith("/api/")), [], "synth calls no API");
    ok(`synth calls no API (${external.length} other requests to synth.netcomposer.art: the one-time sound copy)`);
  }
  const regs = await seed.evaluate(async () =>
    (await navigator.serviceWorker.getRegistrations()).map((r) => new URL(r.scope).pathname).sort(),
  );
  for (const s of regs) assert.ok(["/synth/", "/bass/"].includes(s), `unexpected SW scope ${s}`);
  ok(`service worker scopes: ${regs.join(", ") || "(none yet)"}`);
  await seed.waitForTimeout(1500); // let activate clean up
  const names = await seed.evaluate(() => caches.keys());
  for (const n of ["nc-clips", "someone-else"]) assert.ok(names.includes(n), `${n} survived`);
  for (const n of names)
    assert.ok(/^(nc-clips|someone-else|nc-synth-[0-9a-f]{12}|olive-bass-.*)$/.test(n), `cache ${n}`);
  ok(`caches after all apps loaded: ${names.join(", ")}`);
  if (apps.length > 1) {
    const [first, ...others] = apps;
    const got = others.map((a) =>
      pages[a].evaluate(
        () =>
          new Promise((res) => {
            const ch = new BroadcastChannel("nc-one-origin-test");
            ch.onmessage = (e) => res(e.data);
          }),
      ),
    );
    await new Promise((r) => setTimeout(r, 200));
    await pages[first].evaluate(() => new BroadcastChannel("nc-one-origin-test").postMessage("tick"));
    assert.deepEqual(await Promise.all(got), others.map(() => "tick"));
    ok(`BroadcastChannel from /${first}/ reaches ${others.map((a) => `/${a}/`).join(", ")}`);
  }
  console.log(`\nall checks passed (${apps.join(", ")})`);
} finally {
  await browser?.close();
  server.kill();
}
