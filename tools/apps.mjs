// The three instruments netcomposer.art serves next to /create/, and the Studio that plays them on one page (one
// origin, so NC Sync's BroadcastChannel reaches all of them and the Studio can load them in same-origin iframes).
// Shared by tools/pull-app.mjs, tools/serve-local.mjs and tests/apps.test.mjs.
export const APPS = {
  synth: {
    name: "ASTRID",
    repo: "psemmelhack/NetComposer-Synth",
    build: ["node", "artifacts/netcomposer-synth/build-site.mjs"],
    out: "artifacts/netcomposer-synth/dist/site",
  },
  rhythm: {
    name: "PETRA Rhythm",
    repo: "psemmelhack/ASTRID-Rhythm",
    build: ["node", "scripts/build-site.mjs"],
    out: "apps/rhythm/dist",
  },
  bass: {
    name: "OLIVE Bass",
    repo: "psemmelhack/ASTRID-Bass",
    build: ["node", "scripts/build-site.mjs"],
    out: "apps/bass/dist",
  },
  studio: {
    name: "NetComposer Studio",
    repo: "netcomposer-art/nc-studio",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
    // The Studio loads the instruments in iframes from their own paths.
    alsoLoads: ["/rhythm/", "/bass/", "/synth/", "/lucy/", "/nyx/", "/calliope/", "/aria/", "/looper/"],
  },
  lucy: {
    name: "LUCY Audio",
    repo: "netcomposer-art/lucy",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
  },
  nyx: {
    name: "NYX Sampler",
    repo: "netcomposer-art/nyx",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
  },
  // The Studio's note generator (no sound of its own): it plays the instruments over the Studio's notes bus.
  calliope: {
    name: "CALLIOPE Generator",
    repo: "netcomposer-art/calliope",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
  },
  // The Studio's Situation module (no sound of its own): a live seismometer as the Ground wavetable and Energy for the
  // instruments, over the Studio's situation bus (Peter, 2026-11-06).
  aria: {
    name: "ARIA Situation",
    repo: "netcomposer-art/aria",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
  },
  // The Studio's song looper (no sound of its own): records what's played on ASTRID and NYX in laps and plays it
  // back over the Studio's notes bus (Peter, 2026-11-10). Only when the player adds it.
  looper: {
    name: "LUPA Looper",
    repo: "netcomposer-art/looper",
    build: ["node", "scripts/build-site.mjs"],
    out: "dist",
  },
};

/** nc-ui, served once at /nc-ui/ and linked by every app (tools/pull-ui.mjs). */
export const UI_BASE = "/nc-ui/";
export const UI_FILES = ["nc-ui.css", "nc-ui.min.css", "tokens.css", "confirm.css", "tokens.resolved.json"];

/** Problems with a built app folder (empty list when it is fine to publish at /<key>/). */
export function checkAppFolder(files, key, readText) {
  const base = `/${key}/`;
  const problems = [];
  if (!files.includes("index.html")) problems.push("no index.html");
  if (!files.includes("BUILD.txt")) problems.push("no BUILD.txt");
  for (const f of files) {
    if (f.endsWith(".map")) problems.push(`source map ${f}`);
    if (f.split("/").some((part) => part.startsWith("_")))
      problems.push(`${f}: starts with "_" (fine with .nojekyll, but check it is meant to ship)`);
  }
  if (files.includes("BUILD.txt")) {
    const build = readText("BUILD.txt");
    if (!build.includes(`base: ${base}`)) problems.push(`BUILD.txt base is not ${base}`);
    if (/uncommitted/.test(build)) problems.push("built with uncommitted changes");
    if (!/^commit: [0-9a-f]{40}/m.test(build)) problems.push("BUILD.txt has no commit");
  }
  if (files.includes("index.html")) {
    const html = readText("index.html");
    for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
      const url = m[1];
      if (/^(?:[a-z]+:|\/\/|#|data:)/i.test(url)) continue;
      // The one shared stylesheet every app links (the live nc-ui) is the only allowed exception.
      if (url.startsWith(UI_BASE) && UI_FILES.includes(url.slice(UI_BASE.length))) continue;
      if (url.startsWith("/") && !url.startsWith(base))
        problems.push(`index.html points outside ${base}: ${url}`);
    }
  }
  return problems;
}
