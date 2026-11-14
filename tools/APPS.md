# The instruments on netcomposer.art

netcomposer.art serves ASTRID at `/synth/`, PETRA Rhythm at `/rhythm/`, OLIVE Bass at `/bass/` and NetComposer Studio at `/studio/`, next to Create at `/create/`. The Studio loads the instruments in same-origin iframes and plays them on one AudioContext. Everything sits on one origin so NC Sync (BroadcastChannel, same-origin only) reaches every app. The plan is `hosting/one-domain-proposal.md`, approved 2026-10-27.

| Path | Source repo (private) | Built by |
|---|---|---|
| `/synth/` | psemmelhack/NetComposer-Synth | `node artifacts/netcomposer-synth/build-site.mjs` |
| `/rhythm/` | psemmelhack/ASTRID-Rhythm | `node scripts/build-site.mjs` |
| `/bass/` | psemmelhack/ASTRID-Bass | `node scripts/build-site.mjs` |
| `/studio/` | netcomposer-art/nc-studio | `node scripts/build-site.mjs` |

One service worker serves them all: `/sw.js`, scope `/` (below, "Offline"). `/synth/sw.js` and `/bass/sw.js` are the
retired workers of ASTRID and Bass: they only delete their old caches and unregister an old registration.

ASTRID calls no API since Situation and the Meaning filter were taken out (NetComposer-Synth #64; the code is on its `situation-archive` branch). The API server on Replit at `https://synth.netcomposer.art/api` is no longer used by `/synth/`. Once the Replit redirect (NetComposer-Synth PR #49) is published, synth.netcomposer.art redirects every other path to `https://netcomposer.art/synth/`; until then it still serves the old app.

## Offline: the one service worker at /sw.js

Once someone has visited the Studio (or any instrument) online, the Studio and every instrument it frames open with no
connection. `node tools/offline.mjs` writes `/sw.js` from `tools/offline-sw.js` with this site build's manifest: every
file of every app in `APPS` (the Studio included) and of `/nc-ui/`, each with its sha256 and size (about 7.3 MB), and
each app's commit from its `BUILD.txt`. It also puts a one-line registration at the end of each instrument page's
`<head>` (the Studio registers the worker from its own code, nc-studio `src/offline.ts`). `pull-app.mjs` and
`pull-ui.mjs` run it after every copy, and `tests/apps.test.mjs` fails when `sw.js` or a page is stale.

- One cache per site build, `nc-site-<version>`. A build is saved whole and checked file by file against the manifest;
  a failed or half-done save never touches the build already saved, and the next try reuses what was checked.
- Pages, `BUILD.txt` and other unhashed files (nc-ui, manifests, icons, ARIA's recording): network first (past the
  HTTP cache), the saved copy when the network fails, answers 5xx or takes over 3 s. Hashed files: the saved copy.
- A Studio frame loaded by its build (`?b=<commit>`) whose build is saved gets that saved page; a page served from a
  saved build keeps to it. So offline, the BUILD.txt values the Studio reads always match the frames it gets.
- Not saved, not answered: other origins (the musicmatter Library, the Sample Picker, EarthScope), `/plugins/` (the
  registry), pages outside the apps.
- A new deploy is a new `/sw.js`: the browser saves the new build in the background, the worker takes over, and an
  open Studio on the old build shows "Update ready · Reload". The old build's cache goes once no page runs it.

Tests: `node --test tests/offline-sw.test.mjs` (the worker in a VM) and `tests/offline.e2e.mjs` (Chromium: a cold
visit then offline; deploy A then B; a failed save).

## The one live nc-ui at /nc-ui/

`/nc-ui/` is the NetComposer design language (netcomposer-art/nc-ui): tokens and the module kit. Every instrument links `/nc-ui/nc-ui.css` (the Studio and ASTRID link `/nc-ui/tokens.css`), so a change published here reaches every module on its next load, with no app rebuild. Each app carries a fallback that loads only if `/nc-ui/` fails. Publish with `node tools/pull-ui.mjs --from <nc-ui clone at the commit to ship>`; `nc-ui/BUILD.txt` names the commit.

## How a build gets here
Builds are committed to this repo. GitHub Pages deploys `main` as it is, with no build step and no secrets.

1. Merge the app's hosting PR in its own repo.
2. In a clone of that repo, check out the commit to ship (normally its `main`) and install node_modules.
3. Run `node tools/pull-app.mjs <synth|rhythm|bass|studio> --from <clone>`. It runs the app's `build:site`, checks the output, and replaces `<app>/` here. The checks are:
   - `index.html` and `BUILD.txt` exist;
   - the build is from the clone's HEAD with no uncommitted changes;
   - every asset sits under `/<app>/`;
   - there are no source maps.
4. Run `node --test tests/apps.test.mjs` (it also checks `sw.js`, which step 3 rewrote).
5. Optionally run `node tools/serve-local.mjs` (port 5720) and open the apps on one origin.
6. Commit `<app>/` and `sw.js` in a PR. Merging to `main` publishes it.

`<app>/BUILD.txt` always says which repo and commit is live.

### Later: deploy builds as an Actions artifact (follow-up, not set up)
Each full set of builds adds about 2.2 MB to this repo's history, which is fine for v1 (decided 2026-10-27). A later step is to switch Pages to "GitHub Actions" as its source and deploy an artifact built by a workflow (`actions/upload-pages-artifact` then `actions/deploy-pages`), so built files stop landing in the repo. That means changing the Pages source setting, which only Peter does, plus the read-only token described above. Neither exists yet.

### Automating it later (not set up)
A workflow could build on a schedule or on dispatch. The app repos are private, so it would need a repository secret:
- a fine-grained personal access token with **read-only Contents** access to the three app repos and nothing else;
- for example `APPS_READ_TOKEN`, used only by `actions/checkout` of those repos.

The workflow would push builds to a branch and open a PR, never straight to `main`. No secret exists today, and none is needed for the manual flow above.

## Settings only Peter changes
- **Settings → Pages → Enforce HTTPS:** turn it on (decided 2026-10-27). It's a repo setting, not a file.
- The custom domain stays `netcomposer.art` (`CNAME`).
