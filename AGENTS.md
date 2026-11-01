# AGENTS.md: netcomposer.art

For AI agents (and people) working in this repo. [tools/APPS.md](tools/APPS.md) has the publishing detail.

## What this is

The NetComposer site, https://netcomposer.art/: static files deployed by GitHub Pages from `main` with no build step.
Create, the Compositions and Performances (with their records), the Supplier registry, `llms.txt` and
`netcomposer.json` for agents, and the built instruments on one origin: `/synth/` (ASTRID), `/rhythm/` (PETRA),
`/bass/` (OLIVE), `/lucy/`, `/nyx/`, `/studio/`, plus the live design language at `/nc-ui/` and the listed insert
plugins at `/plugins/`.

## Commands

```sh
node --test tests/apps.test.mjs        # the built apps, sitemap and llms.txt (CI)
node tools/serve-local.mjs [port]      # serve the site on one origin (default 5720)
PLAYWRIGHT_MODULE=<playwright/index.mjs> node tests/one-origin.e2e.mjs   # CI: the apps on one origin
PLAYWRIGHT_MODULE=<playwright/index.mjs> node tests/404.e2e.mjs          # CI: 404.html
```

## Rules

- **Merging to `main` publishes.** Peter publishes the site: open a pull request, don't merge it.
- **Never edit a built app by hand** (`synth/`, `rhythm/`, `bass/`, `lucy/`, `nyx/`, `studio/`, `nc-ui/`). Build it in
  its own repo and pull it: `node tools/pull-app.mjs <app> --from <clone>` or `node tools/pull-ui.mjs --from <nc-ui
  clone>`. Each folder's `BUILD.txt` says which commit is live.
- **Plugins** (`plugins/`): `registry.json` lists reviewed plugins with sha256 per file; see
  [plugins/README.md](plugins/README.md). The files must be the ones that passed `nc-fx-check`.
- **Keep `llms.txt`, `netcomposer.json` and `sitemap.xml` in step** with what the site serves (`apps.test.mjs`
  checks the instrument paths).
- **Licences:** performance outputs are CC BY-SA 4.0; accepted inputs CC0, CC BY, CC BY-SA, public domain. No
  pitch-shifting or time-stretching of found sound.
- **Colours:** accents only from the instrument title colours (ASTRID #EB512E, PETRA #5AC4F7, OLIVE #9CA536,
  LUCY #9B30FF, NYX #FEAA02), through nc-ui tokens. Anything else: stop and ask Peter.
- **Copy:** short plain sentences. Peter's own words (Compositions, statements) are verbatim: never edit them.
- Commits and PRs need no attribution lines.

## Adding a plugin

Build it from [netcomposer-art/nc-plugin-template](https://github.com/netcomposer-art/nc-plugin-template) and the
[guide](https://github.com/netcomposer-art/nc-fx/blob/main/docs/plugins.md), then list it here with a pull request
(plugins/README.md).

## Where to ask

Issues on [netcomposer-art/netcomposer.art](https://github.com/netcomposer-art/netcomposer.art/issues) (also the
channel for Suppliers, Compositions and Performances). Peter Semmelhack decides.
