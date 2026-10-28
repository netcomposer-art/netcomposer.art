#!/usr/bin/env node
// Copies a built instrument into this site: synth/ (ASTRID), rhythm/ (Rhythm), bass/ (Bass).
//
//   node tools/pull-app.mjs <synth|rhythm|bass> --from <path to a clone of the app repo>
//        [--no-build]   copy the clone's existing build output instead of building
//
// The clone must be checked out at the commit to ship (normally its main after the hosting PR
// merged) with node_modules installed; it must have no uncommitted changes. The app's own
// build:site script builds it for /<app>/ and writes BUILD.txt (repo, commit, date, base).
// This script replaces <app>/ here with that output, after checking it (tools/apps.mjs).
// Nothing is pushed: commit the folder in a PR; merging to main publishes it on GitHub Pages.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { APPS, checkAppFolder } from "./apps.mjs";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [key, ...rest] = process.argv.slice(2);
const app = APPS[key];
const fromIdx = rest.indexOf("--from");
const from = fromIdx >= 0 ? resolve(rest[fromIdx + 1] ?? "") : "";
if (!app || !from) {
  console.error("usage: node tools/pull-app.mjs <synth|rhythm|bass> --from <clone> [--no-build]");
  process.exit(2);
}
const git = (...args) => execFileSync("git", args, { cwd: from, encoding: "utf8" }).trim();
if (git("status", "--porcelain", "--untracked-files=no")) {
  console.error(`${from} has uncommitted changes; check out the exact commit to ship.`);
  process.exit(1);
}
if (!rest.includes("--no-build")) {
  const [cmd, ...args] = app.build;
  execFileSync(cmd, args, { cwd: from, stdio: "inherit" });
}
const out = join(from, app.out);
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [relative(out, p)];
  });
if (!existsSync(out)) throw new Error(`no build output at ${out}`);
const files = walk(out);
const problems = checkAppFolder(files, key, (f) => readFileSync(join(out, f), "utf8"));
const head = git("rev-parse", "HEAD");
if (!readFileSync(join(out, "BUILD.txt"), "utf8").includes(`commit: ${head}`))
  problems.push(`BUILD.txt is not from the clone's HEAD ${head} (stale build? drop --no-build)`);
if (problems.length) {
  console.error(`not copying ${key}:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
const target = join(site, key);
rmSync(target, { recursive: true, force: true });
cpSync(out, target, { recursive: true });
console.log(`${app.name} ${head.slice(0, 7)} -> ${key}/ (${files.length} files)`);
