# Vendored NC Synth engine

Peter Semmelhack's NC Synth audio engine, MIT. The package this is meant to match is `@workspace/synth-audio` (`lib/synth-audio`) on [NetComposer-Synth pull request 1](https://github.com/psemmelhack/NetComposer-Synth/pull/1), branch `cursor/synth-audio-package-23f4`.

## Source commit

The files were copied from the source snapshot attached to the site task (`nc-synth-src.tar.gz`), directory `artifacts/netcomposer-synth/src/audio/`. That archive has no `.git` directory and no commit SHA. The private repository is not readable from this checkout, so the commit these bytes came from is **not recorded**. Until that SHA is known, the hashes below are the identity of the snapshot.

Upstream target, not a commit: `psemmelhack/NetComposer-Synth` PR 1, `cursor/synth-audio-package-23f4`.

## What was copied

Verbatim (sha256):

| file | sha256 |
| --- | --- |
| event-queue.ts | `f39200a55d9ce516faced28876b46f1f15a297a5bb25a9c2c14778690d8c97ac` |
| filter-response.ts | `35436363201ef3076516998335c22cabc8e05d6f0f54bd4a107e8752d3a8f3c6` |
| midi-file.ts | `5a42083f8edd44b489fbfbea4ac5cc0f4bb656581b03a0a5c9b139fda6b52e77` |
| midi-playback.ts | `f9411999ad6cd8e88e9322709fc55e7afb3e5cdf68875450495d06aef40a1515` |
| music.ts | `a49e748e7d9e86e680b31a5ecdc2133cc97883404d592e28c32c9a6409175aec` |
| notes.ts | `3961b74efe90d19baddbbada47f44a8a063e93f6911f19820290ddb5bef104d8` |
| oscillator.ts | `d8f5c17597c5f4d675575381ab828b92591523db2316a5f4c0f43d57452692ee` |
| semantic.ts | `513922a6a148187c395ffa8f2b321f4db5c2985aef40397658e369ccdb1bd60d` |
| settings.ts | `d44456d961ccc14cccd31bf402562b2c87437d7735b3e2d04e59fa86fec021be` |
| signals.ts | `5b23abe2758bf3f37733d54c03477ad21ad23401f6391715975d433441c182d7` |
| types.ts | `be013b0bbe7060d35e32d4b6fbcadcca4eee6cac90f7814a803328444853073f` |
| wavetable-dsp.ts | `0ec10d4a83d57e8629a94c0d78eef3668a58a3395ef2723aa728234a204c14de` |
| wavetable-source.ts | `fa09d3437670537bd4574fc727d6dd57d12464fec333e899a59b9ad7c3780286` |
| wavetable.worker.ts | `85777fd9c1da39b0d88a8d758f9f90a8032a5a2b46256e78db49e7d67ca6b372` |
| worklet-source.d.ts | `45741bd895a2c645bb76a72bc3d0baba1ac53b62943524fec7a0e27f9ca04f5c` |

`engine.ts` snapshot sha256, before the offline edits: `91584160639c1d6fcab440b1c344532c5d623922ad3515880526af0c04539af8`.

`engine.ts` after the offline, Live-output, and FM-modulator edits: `8b21696eb1ee69bd5ac96f3a96d03f5935288da06853b843381d6081df8614b8`.

Rebuild the browser bundle from the repo root:

```
npx --yes esbuild create/synth-audio/src/index.ts \
  --bundle --format=iife --global-name=NCSynthEngine \
  --platform=browser --target=es2020 \
  --alias:virtual:netcomposer-banks=$PWD/create/synth-audio/src/shims/netcomposer-banks.ts \
  --outfile=create/synth-audio/dist/index.js
```

Not copied: React, the app shell, the Meaning Filter service, the Situation Engine service, the API server, OpenAI, Postgres, and the `*.test.ts` / `*-verification.ts` files.

`semantic.ts`, `music.ts`, `event-queue.ts`, and `midi-playback.ts` stay because `engine.ts` constructs them. Semantic modulation ships disabled. Situation and MIDI types are erased at build time. Wavetable code stays in the tree because `oscillator.ts` imports it. Offline render and the Live path do not select it. `src/shims/netcomposer-banks.ts` replaces the Vite virtual module `virtual:netcomposer-banks`. The stand-in worker posts an empty bank list (`self.postMessage([])`) so a preload resolves instead of hanging. Wavetable playback stays unused.

## Edits in engine.ts

Deltas, so a written line can drive `createVoice` on `OfflineAudioContext`, and Live can route those same voices into the hack chain:

1. `open(context, random, destination?)` injects a `BaseAudioContext` and an optional output node. Live Play still constructs `AudioContext` with neither. When `destination` is set, the bus connects to that node instead of `context.destination`. `panic()` reconnects the analyser to the same node, so silencing Live voices does not send audio around the hack chain.
2. The 2 s noise buffer uses `noiseRandom`, which defaults to `Math.random`. Offline render and the Live engine pass mulberry32.
3. On `OfflineAudioContext`, or when an output node was injected, `initialize` returns after the graph exists. It does not `resume()` or preload wavetable banks. `OfflineAudioContext` stays suspended until `startRendering()`. A page-owned Live context is resumed by that page; waiting here would stall the note schedule.
4. `voiceLimit()` is unlimited on `OfflineAudioContext`, and the 36-voice cleanup is skipped. `currentTime` is 0 while notes are scheduled, so the live pool would retire every note.
5. `scheduleNote(midi, time, duration, velocity, modulator?)` calls `createVoice`. When `modulator.depth` is above 0 and the voice is a plain oscillator, the gathered clip is a modulator only: a buffer source feeds a gain of `depth × 100` Hz into the main oscillator's `frequency` AudioParam. The carrier's written pitch stays the parameter's offset. The clip is not mixed to the output and is not a carrier. Depth is Peter's index, 0–10, and 0 connects nothing. The same source can drive an envelope follower (absolute value, then a 30 Hz low-pass) into cutoff and loudness when those amounts are set. Wavetable voices skip this path. `panic()`, retire, and cleanup disconnect those sources so a stop leaves no hanging modulator.

Do not call `dispose()` on an engine that shares Live's `AudioContext`. `dispose()` closes the context.

`src/offline.ts` is the file shaped for `lib/synth-audio/src/offline.ts`. It schedules the note list, then `startRendering()`. It does not rebuild oscillators, the filter, or the ADSR.

`dist/index.js` is an esbuild IIFE (`NCSynthEngine`) of `src/index.ts`, committed so `/create/` needs no build step.
