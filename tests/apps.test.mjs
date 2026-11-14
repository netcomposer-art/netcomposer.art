// node --test tests/apps.test.mjs
// Every instrument folder this site publishes (synth/, rhythm/, bass/) is a clean build for its
// own path, and tools/apps.mjs catches the mistakes that would break it on Pages.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { APPS, UI_FILES, checkAppFolder } from "../tools/apps.mjs";
import { OFFLINE_DIRS, SNIPPET, SNIPPET_PAGES, updateOffline, withSnippet } from "../tools/offline.mjs";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (dir, top = dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p, top) : [relative(top, p)];
  });

for (const key of Object.keys(APPS)) {
  test(`${key}/ is a clean build for /${key}/ (or not published yet)`, (t) => {
    const dir = join(site, key);
    if (!existsSync(dir)) return t.skip(`${key}/ not added yet`);
    const files = walk(dir);
    assert.deepEqual(checkAppFolder(files, key, (f) => readFileSync(join(dir, f), "utf8")), []);
  });
}

test("checkAppFolder catches wrong base, source maps, dirty builds and missing files", () => {
  const ok = {
    "index.html": '<script src="/bass/assets/a.js"></script><link href="https://x.y/z">',
    "BUILD.txt": `commit: ${"a".repeat(40)}\nbase: /bass/\n`,
  };
  const read = (files) => (f) => files[f];
  assert.deepEqual(checkAppFolder(Object.keys(ok), "bass", read(ok)), []);
  const bad = {
    "index.html": '<script src="/assets/a.js"></script>',
    "BUILD.txt": `commit: ${"a".repeat(40)} (with uncommitted changes)\nbase: /\n`,
    "assets/a.js.map": "",
  };
  const problems = checkAppFolder(Object.keys(bad), "bass", read(bad)).join("\n");
  for (const p of ["outside /bass/", "source map", "uncommitted", "base is not /bass/"])
    assert.match(problems, new RegExp(p));
  assert.deepEqual(checkAppFolder([], "synth", read({})), ["no index.html", "no BUILD.txt"]);
});

test("an app may link the one live nc-ui at /nc-ui/ and nothing else outside its path", () => {
  const files = {
    "index.html": '<link rel="stylesheet" href="/nc-ui/nc-ui.css" data-nc-ui-live><link href="/nc-ui/other.css">',
    "BUILD.txt": `commit: ${"a".repeat(40)}\nbase: /bass/\n`,
  };
  assert.deepEqual(checkAppFolder(Object.keys(files), "bass", (f) => files[f]), ["index.html points outside /bass/: /nc-ui/other.css"]);
});

test("nc-ui/ is published with every file the apps link, and says which commit", (t) => {
  const dir = join(site, "nc-ui");
  if (!existsSync(dir)) return t.skip("nc-ui/ not added yet");
  for (const f of UI_FILES) assert.ok(existsSync(join(dir, f)), `nc-ui/${f}`);
  const build = readFileSync(join(dir, "BUILD.txt"), "utf8");
  assert.match(build, /^commit: [0-9a-f]{40}$/m);
  assert.match(build, /^base: \/nc-ui\/$/m);
  const css = readFileSync(join(dir, "nc-ui.css"), "utf8");
  assert.match(css, /--nc-ui-accent:/);
  assert.doesNotMatch(css, /@layer/, "the live sheet stays unlayered so it beats every app's bundled fallback");
});

test("the site root and /create/ don't claim the instruments' paths", () => {
  // A stray synth.html would shadow /synth/ etc. (The root's one service worker, sw.js, is the offline Studio's.)
  for (const key of Object.keys(APPS)) assert.equal(existsSync(join(site, `${key}.html`)), false);
});

test("offline: sw.js and the pages' registration are what tools/offline.mjs writes for these builds", () => {
  const { manifest, stale } = updateOffline({ check: true });
  assert.deepEqual(stale, [], "run node tools/offline.mjs");
  // Every file of every app the Studio frames, and nc-ui, each with its sha256; not the retired workers.
  for (const dir of OFFLINE_DIRS) {
    if (!existsSync(join(site, dir))) continue;
    for (const f of walk(join(site, dir))) {
      const path = `/${dir}/${f}`;
      if (f.endsWith("sw.js")) assert.equal(manifest.files[path], undefined, `${path} is not saved`);
      else assert.ok(manifest.files[path], `${path} is saved for offline`);
    }
  }
  // ARIA's 2010 recording (its offline fallback), the worklets and the fonts are in.
  const paths = Object.keys(manifest.files);
  assert.ok(paths.some((p) => /^\/aria\/.*2010.*\.mseed$/.test(p)), "ARIA's 2010 recording");
  assert.ok(paths.some((p) => /\.woff2$/.test(p)), "fonts");
  assert.ok(paths.some((p) => /processor|worklet/.test(p)), "worklets");
  assert.ok(manifest.bytes < 20 * 1048576, `under 20 MB (${(manifest.bytes / 1048576).toFixed(2)} MB)`);
  // Each instrument page registers it once; the Studio registers it from its own code.
  for (const key of SNIPPET_PAGES) {
    const html = readFileSync(join(site, key, "index.html"), "utf8");
    assert.equal(html.split("data-nc-offline").length - 1, 1, `${key}/index.html registers /sw.js once`);
    assert.ok(html.includes(SNIPPET));
  }
});

test("offline: ASTRID's and Bass's own workers are retired (no fetch handler, they unregister)", () => {
  for (const key of ["synth", "bass"]) {
    const file = join(site, key, "sw.js");
    if (!existsSync(file)) continue;
    const src = readFileSync(file, "utf8");
    assert.match(src, /unregister\(\)/, `${key}/sw.js unregisters`);
    assert.doesNotMatch(src, /addEventListener\(["']fetch["']/, `${key}/sw.js answers no request`);
  }
});

test("offline: withSnippet puts the registration in once, however often it runs", () => {
  const once = withSnippet("<html><head><title>x</title></head><body></body></html>");
  assert.equal(withSnippet(once), once);
  assert.equal(once.split("data-nc-offline").length - 1, 1);
  assert.match(once, /<\/script><\/head>/);
});

test("sitemap.xml and llms.txt list every instrument path", () => {
  const sitemap = readFileSync(join(site, "sitemap.xml"), "utf8");
  const llms = readFileSync(join(site, "llms.txt"), "utf8");
  // Every <url> is closed, so the sitemap stays valid XML.
  assert.equal(sitemap.match(/<url>/g).length, sitemap.match(/<\/url>/g).length, "unclosed <url>");
  for (const key of Object.keys(APPS)) {
    const url = `https://netcomposer.art/${key}/`;
    assert.match(sitemap, new RegExp(`<url><loc>${url}</loc></url>`), `sitemap lacks ${url}`);
    assert.ok(llms.includes(`](${url})`), `llms.txt lacks ${url}`);
  }
});
