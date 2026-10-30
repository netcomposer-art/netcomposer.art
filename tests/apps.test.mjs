// node --test tests/apps.test.mjs
// Every instrument folder this site publishes (synth/, rhythm/, bass/) is a clean build for its
// own path, and tools/apps.mjs catches the mistakes that would break it on Pages.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { APPS, UI_FILES, checkAppFolder } from "../tools/apps.mjs";

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
  // A stray synth.html or a service worker at the root would shadow or control /synth/ etc.
  assert.equal(existsSync(join(site, "sw.js")), false, "no root service worker");
  for (const key of Object.keys(APPS)) assert.equal(existsSync(join(site, `${key}.html`)), false);
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
