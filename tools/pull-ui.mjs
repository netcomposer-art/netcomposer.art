#!/usr/bin/env node
// Publishes nc-ui (the NetComposer design language: tokens + module kit) at /nc-ui/ on this site.
//
//   node tools/pull-ui.mjs --from <path to a clone of netcomposer-art/nc-ui>
//
// Every instrument links /nc-ui/nc-ui.css (nc-ui's ncUiLive() Vite plugin), so this one folder is the single place
// the look of every module comes from: change a token or a control style in nc-ui, run this, merge, and Synth,
// Rhythm, Bass and the Studio all change on their next page load. No app rebuilds. Each app also bundles a copy in
// the `nc-ui-fallback` cascade layer, which only shows if /nc-ui/ is missing.
//
// The clone must be at the commit to ship with no uncommitted changes; its dist/ must be current (npm run check).
// Nothing is pushed: commit nc-ui/ in a PR; merging to main publishes it.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { UI_FILES } from "./apps.mjs";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const at = args.indexOf("--from");
const from = at >= 0 ? resolve(args[at + 1] ?? "") : "";
if (!from) {
  console.error("usage: node tools/pull-ui.mjs --from <nc-ui clone>");
  process.exit(2);
}
const git = (...a) => execFileSync("git", a, { cwd: from, encoding: "utf8" }).trim();
if (git("status", "--porcelain", "--untracked-files=no")) {
  console.error(`${from} has uncommitted changes; check out the exact commit to ship.`);
  process.exit(1);
}
execFileSync("npm", ["run", "check"], { cwd: from, stdio: "inherit" });
const missing = UI_FILES.filter((f) => !existsSync(join(from, "dist", f)));
if (missing.length) {
  console.error(`nc-ui dist is missing ${missing.join(", ")}`);
  process.exit(1);
}
const head = git("rev-parse", "HEAD");
const target = join(site, "nc-ui");
rmSync(target, { recursive: true, force: true });
mkdirSync(target);
for (const f of UI_FILES) copyFileSync(join(from, "dist", f), join(target, f));
const version = JSON.parse(execFileSync("node", ["-p", "JSON.stringify(require('./package.json').version)"], { cwd: from, encoding: "utf8" }));
writeFileSync(
  join(target, "BUILD.txt"),
  `repo: netcomposer-art/nc-ui\ncommit: ${head}\nbranch: ${git("rev-parse", "--abbrev-ref", "HEAD")}\nversion: ${version}\ndate: ${new Date().toISOString()}\nbase: /nc-ui/\n`,
);
console.log(`nc-ui ${version} ${head.slice(0, 7)} -> nc-ui/ (${UI_FILES.length} files)`);
