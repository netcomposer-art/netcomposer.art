# Performance record: Cm into Am and F, with a slow C–F–G line (ambient): take 2, open-commons palette

**Performance** `perf_ambient-cm-02` · performed 2026-10-18T08:09:09-07:00 (PDT, UTC−7) · 124.0 s · Algorithmic Performer · seed 1018  
**Status:** preview only · record **UNSIGNED** (open decision #33) · record hash `4c31a567d0e20d7c…` · audio -17.0 LUFS, true peak -2.5 dBTP

## The Composition (Peter, verbatim)

> Composition - 2 mins - half Cm, Cm7, Cm9. Second half Cm7, Am, F.
> Performance - ambient vibe, no harsh tones, randomly alt between Cm chord structure in first half, build to second half and follow Cm, Am, F pattern. Don't rush it. Over the top of it all play a slow C, F, G pattern. Include an occasional triplet

[Composition file](../composition/ambient-cm.md) · [audio, MP3](../audio/ambient-cm-perf02.mp3) · [audio, FLAC](../audio/ambient-cm-perf02.flac) · [raw JSON](ambient-cm-perf02.json)

## Credits

- “Cm into Am and F, with a slow C–F–G line (ambient)”, NetComposer Performance perf_ambient-cm-02, composed by Peter. Performed by the NetComposer Algorithmic Performer (Astrid) with: University of Iowa Musical Instrument Samples (piano, cello, violin; Electronic Music Studios, Lawrence Fritts); Fender Rhodes Mark II notes by tim.kahn (CC BY 4.0); harp by sgossner (CC0); plucked guitar by Skamos66 (CC0); Bowl Bell C5 by bassimat (CC0); ocean waves by el_boss (CC0), all on Freesound; and two chord sounds by Peter from musicmatter.art (CC BY-SA 4.0). Licensed CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/

## How it was played

- **First half:** 0-60 s. Six chords, type drawn at random from {Cm, Cm7, Cm9} (no immediate repeat, all three heard, last not Cm7, not perf01's sequence). Voicings drawn without reuse from a new pool built note by note from measured single notes (none of perf01's voicings).
- **Build:** 38-62 s: pad/keys/drone +6 dB, low-pass opens (pad 1.2->3.2 kHz, keys 1.8->4.2 kHz), re-strikes 1 -> 2 (40 s) -> 4 (50 s), both Rhodes and piano strike, singing-bowl-like C5 bells at 45, 52.5, 58 s, waves swell +2.5 dB.
- **Second half:** 60-120 s: Cm7, Am, F, then Cm, Am, F. Iowa piano strikes (Rhodes added on alternate chords), cello under each chord, final F rings.
- **Line:** C5, F5, G5, one note about every 5 s (+-0.35 s seeded jitter) in 20 s cycles from 5 s. Timbre per cycle: piano, violin, piano+harp, violin, piano+violin, violin+harp. Quarter-note triplets (C-F-G in 2 beats) in the rest slot of cycles 2, 3, 4: 1:00 (guitar), 1:20 (piano), 1:40 (guitar).
- **musicmatter.art:** 4 faint strikes (2 sounds) in the first half; about 0.3% of pre-reverb energy
- **Pitch:** Every pitched sound chosen by NC measurement (pYIN / FFT peak), not by label. Accepted within about +-15 cents; Iowa cello notes up to +15 c (G3).

## Chord by chord

| Time | Section | Chord | Voicing | Keys | Cello |
|---|---|---|---|---|---|
| 0:00 | A | Cm7 | D#3 G3 A#3 C4 D#4 | rhodes | C2 A#3 |
| 0:10 | A | Cm9 | C3 G3 A#3 D4 D#4 | rhodes | C2 A#3 |
| 0:20 | A | Cm | D#3 C4 G4 | rhodes | C2 G3 |
| 0:30 | A | Cm7 | C3 A#3 D#4 | rhodes | C2 A#3 |
| 0:40 | A (build) | Cm9 | D#3 A#3 D4 G4 | rhodes + piano | C2 A#3 |
| 0:50 | A (build) | Cm | C3 G3 C4 D#4 | rhodes + piano | C2 G3 |
| 1:00 | B | Cm7 | C3 G3 A#3 D#4 | piano | C2 A#3 |
| 1:10 | B | Am | A2 E3 A3 C4 E4 | piano + rhodes | E2 |
| 1:20 | B | F | F2 F3 A3 C4 | piano | F3 |
| 1:30 | B | Cm | C3 G3 C4 D#4 | piano + rhodes | C2 G3 |
| 1:40 | B | Am | E3 A3 C4 E4 | piano | E2 |
| 1:50 | B | F | F3 A3 C4 C5 | piano + rhodes | F3 |

## Sounds

46 sounds, 7 contributors, 269 events. No pitch-shifting.

| # | Sound | Author | License | Uses | Role | Measured pitch | sha256 |
|---|---|---|---|---|---|---|---|
| 1 | [C_S Rhodes Mark II D#2.aif](https://freesound.org/people/tim.kahn/sounds/65721/) | tim.kahn | CC BY 4.0 | 4 | rhodes strike | D#3 +4.7 c | `4628bc084794` |
| 2 | [C_S Rhodes Mark II G2.aif](https://freesound.org/people/tim.kahn/sounds/65730/) | tim.kahn | CC BY 4.0 | 8 | rhodes strike | G3 +4.7 c | `88b2beb95f7a` |
| 3 | [C_S Rhodes Mark II A#2.aif](https://freesound.org/people/tim.kahn/sounds/65714/) | tim.kahn | CC BY 4.0 | 5 | rhodes strike | A#3 -3.3 c | `3694992422be` |
| 4 | [C_S Rhodes Mark II C3.aif](https://freesound.org/people/tim.kahn/sounds/65720/) | tim.kahn | CC BY 4.0 | 12 | rhodes strike | C4 -3.3 c | `87fb7780806e` |
| 5 | [C_S Rhodes Mark II D#3.aif](https://freesound.org/people/tim.kahn/sounds/65722/) | tim.kahn | CC BY 4.0 | 9 | rhodes strike | D#4 +6.7 c | `d73fb56a036e` |
| 6 | [Piano.pp.Eb3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | piano strike, stretched pad | – | `f9a7030f5e6d` |
| 7 | [Piano.pp.G3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 13 | piano strike, stretched pad | – | `0c7e525105fb` |
| 8 | [Piano.pp.Bb3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 9 | piano strike, stretched pad | – | `097e6fe88ba6` |
| 9 | [Piano.pp.C4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 22 | piano strike, stretched pad | C4 +7 c | `94540df460e6` |
| 10 | [Piano.pp.Eb4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 14 | piano strike, stretched pad | D#4 +10 c | `6aac55d41b3d` |
| 11 | [Cello.arco.pp.sulC.C2B2.stereo.aif (note 1 of the run, 36)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 8 | cello | C2 +3 c | `4827099978f4` |
| 12 | [Cello.arco.pp.sulC.C3C4.stereo.aif (note 10 of the run, 58)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | cello | A#3 +9 c | `71d9ceaf937b` |
| 13 | [C_S Rhodes Mark II C2.aif](https://freesound.org/people/tim.kahn/sounds/65719/) | tim.kahn | CC BY 4.0 | 8 | rhodes strike | C3 +6.7 c | `6507f87075f2` |
| 14 | [C_S Rhodes Mark II D3.aif](https://freesound.org/people/tim.kahn/sounds/65724/) | tim.kahn | CC BY 4.0 | 3 | rhodes strike | D4 +6.7 c | `f84604bb08e6` |
| 15 | [Piano.pp.C3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 22 | piano drone, piano strike, stretched pad | C3 +3 c | `dedfacca6a9c` |
| 16 | [Piano.pp.D4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | piano strike, stretched pad | – | `e84dc5003c03` |
| 17 | [Piano.pp.G4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | piano strike, stretched pad | – | `b791b4ee8866` |
| 18 | [Cello.arco.pp.sulC.C3C4.stereo.aif (note 7 of the run, 55)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | cello | G3 +15 c | `71d9ceaf937b` |
| 19 | [Piano.pp.A2.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | piano strike, stretched pad | – | `aa7af8abfa5f` |
| 20 | [Piano.pp.E3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 6 | piano strike, stretched pad | – | `0ffda603c585` |
| 21 | [Piano.pp.A3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 12 | piano strike, stretched pad | – | `f303ec812c5e` |
| 22 | [Piano.pp.E4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 6 | piano strike, stretched pad | E4 +9 c | `3dfb2e26042b` |
| 23 | [C_S Rhodes Mark II E2.aif](https://freesound.org/people/tim.kahn/sounds/65725/) | tim.kahn | CC BY 4.0 | 2 | rhodes strike | E3 +0.7 c | `f19a4d7a7491` |
| 24 | [C_S Rhodes Mark II A2.aif](https://freesound.org/people/tim.kahn/sounds/65715/) | tim.kahn | CC BY 4.0 | 4 | rhodes strike | A3 +4.7 c | `dd229c1dfd81` |
| 25 | [C_S Rhodes Mark II E3aif.aif](https://freesound.org/people/tim.kahn/sounds/65726/) | tim.kahn | CC BY 4.0 | 2 | rhodes strike | E4 +6.7 c | `ff55c1b5245b` |
| 26 | [Cello.arco.pp.sulC.C2B2.stereo.aif (note 5 of the run, 40)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | cello | E2 +3 c | `4827099978f4` |
| 27 | [Piano.pp.F2.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 6 | piano drone, piano strike, stretched pad | – | `d4796cf0bded` |
| 28 | [Piano.pp.F3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 9 | piano drone, piano strike, stretched pad | – | `6d3d07a58ca4` |
| 29 | [Cello.arco.pp.sulC.C3C4.stereo.aif (note 5 of the run, 53)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | cello | F3 +1 c | `71d9ceaf937b` |
| 30 | [Piano.pp.C5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 7 | line, piano strike, stretched pad | C5 +7 c | `7971a111ee9c` |
| 31 | [C_S Rhodes Mark II F2.aif](https://freesound.org/people/tim.kahn/sounds/65728/) | tim.kahn | CC BY 4.0 | 2 | rhodes strike | F3 +6.7 c | `2f1367a1f8f6` |
| 32 | [Piano.pp.C2.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 9 | piano drone | – | `7ff5b7bd53e7` |
| 33 | [Evening Ocean Waves along the Pacific Coast](https://freesound.org/people/el_boss/sounds/587164/) | el_boss | CC0 1.0 | 1 | field recording bed | – | `36ec2bd6cac7` |
| 34 | [Bowl Bell — C5](https://freesound.org/people/bassimat/sounds/857877/) | bassimat | CC0 1.0 | 4 | bell accent | C5 -0.3 c | `30a4ab885289` |
| 35 | [C minor 7th chord, shell R-7-3 (full chord set v4)](https://musicmatter.art/sounds/fullchords-v4/C/00b_main-voicings_Cm7_shell_R-7-3.nc.json) | Peter | CC BY-SA 4.0 | 2 | musicmatter chord, faint | – | `f5f40f1c9a94` |
| 36 | [C minor 9th chord, inv3 (full chord set v4)](https://musicmatter.art/sounds/fullchords-v4/C/02_ninths_Cm9_inv3.nc.json) | Peter | CC BY-SA 4.0 | 2 | musicmatter chord, faint | – | `9a057f34c633` |
| 37 | [Piano.pp.F5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | line | F5 +9 c | `e0cc155431b1` |
| 38 | [Piano.pp.G5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | line | G5 +13 c | `59d112635fd4` |
| 39 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 1 of the run, 72)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | line | C5 +11 c | `28aa3d8e66fe` |
| 40 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 6 of the run, 77)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | line | F5 -9 c | `28aa3d8e66fe` |
| 41 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 8 of the run, 79)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | line | G5 +3 c | `28aa3d8e66fe` |
| 42 | [Harp - C5 (KSHarp_C5_mf.wav)](https://freesound.org/people/sgossner/sounds/373563/) | sgossner | CC0 1.0 | 2 | line | C5 -9.3 c | `00555f7e76d9` |
| 43 | [Harp - F#5 (KSHarp_G5_mf.wav)](https://freesound.org/people/sgossner/sounds/373573/) | sgossner | CC0 1.0 | 2 | line | G5 -5.3 c | `d16de8e85c82` |
| 44 | [C5.wav](https://freesound.org/people/Skamos66/sounds/399493/) | Skamos66 | CC0 1.0 | 2 | line | C5 +0.7 c | `5eaa42b248af` |
| 45 | [F5.wav](https://freesound.org/people/Skamos66/sounds/399505/) | Skamos66 | CC0 1.0 | 2 | line | F5 +0.7 c | `22527ad60d42` |
| 46 | [G5.wav](https://freesound.org/people/Skamos66/sounds/399476/) | Skamos66 | CC0 1.0 | 2 | line | G5 +0.7 c | `a18cc2bf6f4c` |

## Hacks

- 1. **time_stretch**: engine ffmpeg rubberband; options transients=smooth:window=long:phase=independent, pitch=1; ratios {'pad (piano)': 3.7333, 'drone (piano)': 4.0, 'cello': 'about 2.1-2.4 (per note)'}
- 2. **gain**: type decay flatten (300 ms RMS follower, max +20 dB); applies_to ['pad', 'drone']
- 3. **fade**: type equal-power swells and rolled strikes (0-90 ms seeded roll per chord); pad_in_s 3.0; pad_out_s 4.5; violin_in_s 0.25
- 4. **lowpass/highpass**: automation dark->bright crossfade 40-60 s, back toward dark over the last 15 s; pad_hz [1200, 3200]; keys_hz [1800, 4200]; musicmatter_hz [1500, 3000]; drone 50 Hz HP, 280 Hz LP (4th order); bed 120 Hz HP, 2.6 kHz LP; bell 750 Hz LP (8th order total); line 180 Hz HP, 5.5 kHz LP
- 5. **delay**: on line; time_s 0.75; feedback 0.3; taps 5; ping_pong True; mix 0.5
- 6. **lufs_match**: targets_lufs {'drone': -28.0, 'pad': -22.0, 'keys': -22.0, 'line': -22.0, 'bed': -29.0, 'bell': -31.0, 'mm': -31.0}; pan {'drone': 0.0, 'pad': -0.08, 'keys': 0.1, 'line': 0.15, 'bed': 0.0, 'bell': -0.2, 'mm': -0.15}; build_gain_db pad/keys/drone -6 -> 0 over 38-62 s; bed 0 -> +2.5 (60 s) -> 0 (100 s) -> -3
- 7. **reverb**: type synthetic hall, generated in the script; rt60_s 5.5; predelay_ms 40; seed 1018; wet 0.38
- 8. **highpass**: cutoff_hz 30
- 9. **lowpass**: type gentle 9 kHz blend (40%)
- 10. **tail**: rule music ends 120 s, 4 s fade, file 124 s
- 11. **loudness**: method ffmpeg loudnorm two-pass, linear; target_lufs -17; ceiling_dbtp -1.5

## Known compromises

- Freesound sounds are HQ previews (lossy); originals need OAuth, not set up. Iowa MIS files are the lossless originals.
- Iowa cello pp intonation varies by note; only notes measured within about +15 c were used (C2 +3, E2 +3, F3 +1, G3 +15, Bb3 +9). The G3 is audibly a touch sharp against the piano.
- The pad and drone are x3.7 / x4 time-stretches of piano notes, so they carry phase-vocoder smear (bowed-piano texture), as in take 1.
- Dropped after measurement: Jovica "Chrunched Church Organ Drone Pad" (off-key partials near F#2/G2 under C3), Jovica Melodrone "Invisible Choir" (did not measure as its labelled pitch), Jovica "MegaDrone PadScape" (every file sounds a semitone above its label, -15 to -30 c), bassimat Bowl Bell C3 (strong partial between F4 and F#4), Iowa vibraphone (motor tremolo defeated the pitch check), Iowa viola (run could not be segmented reliably). None of these are in the audio.
- The violin F5 has a weak fundamental and strong 3rd partial (C7), so it reads brighter than its C5/G5; its gain is raised 3.5 dB and the line is low-passed at 5.5 kHz.
- Iowa MIS terms are "freely available ... used for any projects, without restrictions", not a formal CC0/PD dedication; treated as public-domain equivalent, credited anyway.

## Outputs

- nc_ambient_cm_perf02.flac: FLAC 24-bit/48 kHz stereo, 15,103,122 bytes, -17.0 LUFS, -2.5 dBTP, sha256 `9a3c04831beecf66ba0dd87ae03e57609f90fec379af9f1991bb6ebf22c9c370`
- nc_ambient_cm_perf02_preview.mp3: MP3 320 kbps, 48 kHz (preview), 4,962,284 bytes, -17.0 LUFS, -2.5 dBTP, sha256 `83ae98b139df590c001405058b019965127fb39f9a954d2505562914f9b86105`

## Amendment

2026-10-18T11:23:17-07:00: Contributor display name changed from 'Petrus' to 'Peter' (Peter Semmelhack) for netcomposer.art, at his request. No audio, input, setting or other field changed. Previous record hash `499545e43ea74efa…`, new `4c31a567d0e20d7c…`.

License: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/