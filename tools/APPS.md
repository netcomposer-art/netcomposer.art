# The instruments on netcomposer.art

netcomposer.art serves ASTRID at `/synth/`, PETRA Rhythm at `/rhythm/`, OLIVE Bass at `/bass/` and NetComposer Studio at `/studio/`, next to Create at `/create/`. The Studio loads the instruments in same-origin iframes and plays them on one AudioContext. Everything sits on one origin so NC Sync (BroadcastChannel, same-origin only) reaches every app. The plan is `hosting/one-domain-proposal.md`, approved 2026-10-27.

| Path | Source repo (private) | Built by | Service worker |
|---|---|---|---|
| `/synth/` | psemmelhack/NetComposer-Synth | `node artifacts/netcomposer-synth/build-site.mjs` | `/synth/sw.js`, scope `/synth/`, caches `nc-synth-<hash>` only |
| `/rhythm/` | psemmelhack/ASTRID-Rhythm | `node scripts/build-site.mjs` | none |
| `/bass/` | psemmelhack/ASTRID-Bass | `node scripts/build-site.mjs` | `/bass/sw.js`, scope `/bass/`, caches `olive-bass-*` only |
| `/studio/` | netcomposer-art/nc-studio | `node scripts/build-site.mjs` | none |

ASTRID calls no API since Situation and the Meaning filter were taken out (NetComposer-Synth #64; the code is on its `situation-archive` branch). The API server on Replit at `https://synth.netcomposer.art/api` is no longer used by `/synth/`. Once the Replit redirect (NetComposer-Synth PR #49) is published, synth.netcomposer.art redirects every other path to `https://netcomposer.art/synth/`; until then it still serves the old app.

## How a build gets here
Builds are committed to this repo. GitHub Pages deploys `main` as it is, with no build step and no secrets.

1. Merge the app's hosting PR in its own repo.
2. In a clone of that repo, check out the commit to ship (normally its `main`) and install node_modules.
3. Run `node tools/pull-app.mjs <synth|rhythm|bass|studio> --from <clone>`. It runs the app's `build:site`, checks the output, and replaces `<app>/` here. The checks are:
   - `index.html` and `BUILD.txt` exist;
   - the build is from the clone's HEAD with no uncommitted changes;
   - every asset sits under `/<app>/`;
   - there are no source maps.
4. Run `node --test tests/apps.test.mjs`.
5. Optionally run `node tools/serve-local.mjs` (port 5720) and open the apps on one origin.
6. Commit `<app>/` in a PR. Merging to `main` publishes it.

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
