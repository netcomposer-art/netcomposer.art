// node --test tests/apps.test.mjs
// Every instrument folder this site publishes (synth/, rhythm/, bass/) is a clean build for its
// own path, and tools/apps.mjs catches the mistakes that would break it on Pages.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { APPS, checkAppFolder } from "../tools/apps.mjs";

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

test("the site root and /create/ don't claim the instruments' paths", () => {
  // A stray synth.html or a service worker at the root would shadow or control /synth/ etc.
  assert.equal(existsSync(join(site, "sw.js")), false, "no root service worker");
  for (const key of Object.keys(APPS)) assert.equal(existsSync(join(site, `${key}.html`)), false);
});
