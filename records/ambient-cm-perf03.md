# Performance record: Cm into Am and F, with a slow C–F–G line (ambient): take 3, rolled piano and forest air

**Performance** `perf_ambient-cm-03` · performed 2026-10-18T11:18:20-07:00 (PDT, UTC−7) · 124.0 s · Algorithmic Performer · seed 2026  
**Status:** preview only · record **UNSIGNED** (open decision #33) · record hash `6c3ac089018ea076…` · audio -17.0 LUFS, true peak -2.4 dBTP

## The Composition (Peter, verbatim)

> Composition - 2 mins - half Cm, Cm7, Cm9. Second half Cm7, Am, F.
> Performance - ambient vibe, no harsh tones, randomly alt between Cm chord structure in first half, build to second half and follow Cm, Am, F pattern. Don't rush it. Over the top of it all play a slow C, F, G pattern. Include an occasional triplet

[Composition file](../composition/ambient-cm.md) · [audio, MP3](../audio/ambient-cm-perf03.mp3) · [audio, FLAC](../audio/ambient-cm-perf03.flac) · [raw JSON](ambient-cm-perf03.json)

## Credits

- “Cm into Am and F, with a slow C–F–G line (ambient)”, NetComposer Performance perf_ambient-cm-03, composed by Peter. Performed by the NetComposer Algorithmic Performer (Astrid) with: University of Iowa Musical Instrument Samples (piano, cello, violin, alto flute; Electronic Music Studios, Lawrence Fritts); Fender Rhodes Mark II notes by tim.kahn (CC BY 4.0); acoustic guitar notes by allan764 (CC BY 3.0); “pineforest 1-3bft winter” by klankbeeld (CC BY 4.0); harp by sgossner (CC0); guitar G5 by Skamos66 (CC0); soft rain on leaves by deleted_user_3544904 (CC0), all on Freesound; and two chord sounds by Peter from musicmatter.art (CC BY-SA 4.0). Licensed CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/

## How it was played

- **First half:** 0-60 s. Six chords, type drawn at random from {Cm, Cm7, Cm9} (no immediate repeat, all three heard, last not Cm7, not the take-1 or take-2 sequence). Voicings drawn without reuse from a new pool (none used in takes 1 or 2). Keys: slow upward Iowa piano rolls (150-450 ms per chord, seeded).
- **Build:** 38-62 s: pad/keys/drone +6 dB, low-pass opens (pad 1.1->3 kHz, keys 1.7->4 kHz), re-strikes 1 -> 1 (40 s, Rhodes joins) -> 2 (50 s); harp C5, G5, low piano C3, harp C5 plucks at 44.6, 49.6, 54.6, 58.3 s; the pine-forest wind crossfades to soft rain from 56 s.
- **Second half:** 60-120 s: Cm7, Am, F, then Cm, Am, F. Rhodes strikes on every chord, Iowa piano rolls added on alternate chords, one re-strike per chord, Iowa cello under each chord (Bb3 / E2 / F3), cello drone C2 (F3 under the F chords), final F rings.
- **Line:** C5, F5, G5, one note about every 5 s (+-0.4 s seeded jitter) in 20 s cycles from 7 s. Timbre per cycle: guitar, piano, guitar + alto flute (C only), violin, harp + piano, guitar + violin. Every line source is level-matched to the same 1.5 s RMS. Quarter-note triplets (C-F-G in 2 beats) in the rest slot of cycles 1, 3, 4: 0:22.1, 1:01.9, 1:22.1 (piano, harp + piano, piano).
- **musicmatter.art:** 2 faint strikes (2 sounds: Cm7 at 0:46, Am at 1:16); about 0.1% of pre-reverb energy
- **Pitch:** Every pitched sound chosen by NC measurement (pYIN / FFT peak), not by label. Accepted within about +-15 cents (Iowa cello G3 +15 is not used in this take; allan764 F5 +15 c is the outer edge).

## Chord by chord

| Time | Section | Chord | Voicing | Keys | Cello |
|---|---|---|---|---|---|
| 0:00 | A | Cm | D#3 G3 C4 G4 | piano | – |
| 0:10 | A | Cm9 | G3 D4 D#4 A#4 | piano | – |
| 0:20 | A | Cm7 | D#3 A#3 D#4 A#4 | piano | – |
| 0:30 | A | Cm9 | D#3 G3 A#3 D4 | piano | – |
| 0:40 | A (build) | Cm7 | C3 D#3 G3 A#3 | piano + rhodes | – |
| 0:50 | A (build) | Cm9 | C3 A#3 D4 D#4 | piano + rhodes | – |
| 1:00 | B | Cm7 | C3 A#3 D#4 G4 | rhodes | A#3 |
| 1:10 | B | Am | A2 A3 E4 C5 | rhodes + piano | E2 |
| 1:20 | B | F | F2 A3 C4 F4 | rhodes | F3 |
| 1:30 | B | Cm | G3 C4 D#4 C5 | rhodes + piano | A#3 |
| 1:40 | B | Am | A3 C4 E4 A4 | rhodes | E2 |
| 1:50 | B | F | F3 C4 F4 A4 | rhodes + piano | F3 |

## Sounds

46 sounds, 8 contributors, 214 events. No pitch-shifting.

| # | Sound | Author | License | Uses | Role | Measured pitch | sha256 |
|---|---|---|---|---|---|---|---|
| 1 | [Piano.pp.Eb3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | piano roll | D#3 +5 c | `f9a7030f5e6d` |
| 2 | [Piano.pp.G3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 7 | piano roll | G3 +7 c | `0c7e525105fb` |
| 3 | [Piano.pp.C4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | piano roll | C4 +7 c | `94540df460e6` |
| 4 | [Piano.pp.G4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | piano roll, stretched piano pad | G4 +7 c | `b791b4ee8866` |
| 5 | [C_S Rhodes Mark II D#2.aif](https://freesound.org/people/tim.kahn/sounds/65721/) | tim.kahn | CC BY 4.0 | 6 | rhodes strike, stretched Rhodes pad | D#3 +4.7 c | `4628bc084794` |
| 6 | [C_S Rhodes Mark II G2.aif](https://freesound.org/people/tim.kahn/sounds/65730/) | tim.kahn | CC BY 4.0 | 9 | rhodes strike, stretched Rhodes pad | G3 +4.7 c | `88b2beb95f7a` |
| 7 | [C_S Rhodes Mark II C3.aif](https://freesound.org/people/tim.kahn/sounds/65720/) | tim.kahn | CC BY 4.0 | 12 | rhodes strike, stretched Rhodes pad | C4 -3.3 c | `87fb7780806e` |
| 8 | [Piano.pp.D4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | piano roll | D4 +9 c | `e84dc5003c03` |
| 9 | [Piano.pp.Eb4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 7 | piano roll | D#4 +10 c | `6aac55d41b3d` |
| 10 | [Piano.pp.Bb4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 4 | piano roll, stretched piano pad | A#4 +7 c | `54f008f00816` |
| 11 | [C_S Rhodes Mark II D3.aif](https://freesound.org/people/tim.kahn/sounds/65724/) | tim.kahn | CC BY 4.0 | 6 | rhodes strike, stretched Rhodes pad | D4 +6.7 c | `f84604bb08e6` |
| 12 | [C_S Rhodes Mark II D#3.aif](https://freesound.org/people/tim.kahn/sounds/65722/) | tim.kahn | CC BY 4.0 | 12 | rhodes strike, stretched Rhodes pad | D#4 +6.7 c | `d73fb56a036e` |
| 13 | [Piano.pp.Bb3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 7 | piano roll | A#3 +5 c | `097e6fe88ba6` |
| 14 | [C_S Rhodes Mark II A#2.aif](https://freesound.org/people/tim.kahn/sounds/65714/) | tim.kahn | CC BY 4.0 | 12 | rhodes strike, stretched Rhodes pad | A#3 -3.3 c | `3694992422be` |
| 15 | [Piano.pp.C3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 7 | piano pluck, piano roll | C3 +3 c | `dedfacca6a9c` |
| 16 | [C_S Rhodes Mark II C2.aif](https://freesound.org/people/tim.kahn/sounds/65719/) | tim.kahn | CC BY 4.0 | 10 | rhodes strike, stretched Rhodes pad | C3 +6.7 c | `6507f87075f2` |
| 17 | [Cello.arco.pp.sulC.C3C4.stereo.aif (note 10 of the run, 58)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | cello | A#3 +9 c | `71d9ceaf937b` |
| 18 | [C_S Rhodes Mark II A2.aif](https://freesound.org/people/tim.kahn/sounds/65715/) | tim.kahn | CC BY 4.0 | 9 | rhodes strike, stretched Rhodes pad | A3 +4.7 c | `dd229c1dfd81` |
| 19 | [C_S Rhodes Mark II E3aif.aif](https://freesound.org/people/tim.kahn/sounds/65726/) | tim.kahn | CC BY 4.0 | 6 | rhodes strike, stretched Rhodes pad | E4 +6.7 c | `ff55c1b5245b` |
| 20 | [Piano.pp.A2.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | piano roll, stretched piano pad | A2 +5 c | `aa7af8abfa5f` |
| 21 | [Piano.pp.A3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | piano roll | A3 +7 c | `f303ec812c5e` |
| 22 | [Piano.pp.E4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | piano roll | E4 +9 c | `3dfb2e26042b` |
| 23 | [Piano.pp.C5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 11 | line, piano roll, stretched piano pad | C5 +7 c | `7971a111ee9c` |
| 24 | [Cello.arco.pp.sulC.C2B2.stereo.aif (note 5 of the run, 40)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | cello | E2 +3 c | `4827099978f4` |
| 25 | [Piano.pp.F2.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 1 | stretched piano pad | F2 +3 c | `d4796cf0bded` |
| 26 | [Piano.pp.F4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | piano roll, stretched piano pad | F4 +13 c | `5a5bf948aa37` |
| 27 | [Cello.arco.pp.sulC.C3C4.stereo.aif (note 5 of the run, 53)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | cello, cello drone | F3 +1 c | `71d9ceaf937b` |
| 28 | [Piano.pp.A4.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 3 | piano roll, stretched piano pad | A4 +11 c | `86d6230bfd83` |
| 29 | [C_S Rhodes Mark II F2.aif](https://freesound.org/people/tim.kahn/sounds/65728/) | tim.kahn | CC BY 4.0 | 2 | rhodes strike, stretched Rhodes pad | F3 +6.7 c | `2f1367a1f8f6` |
| 30 | [Piano.pp.F3.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 1 | piano roll | F3 +7 c | `6d3d07a58ca4` |
| 31 | [Cello.arco.pp.sulC.C2B2.stereo.aif (note 1 of the run, 36)](https://theremin.music.uiowa.edu/MIScello2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 9 | cello drone | C2 +3 c | `4827099978f4` |
| 32 | [pineforest 1-3bft winter 130102_00.flac](https://freesound.org/people/klankbeeld/sounds/173031/) | klankbeeld | CC BY 4.0 | 1 | field recording bed (A) | – | `227a518e1f9a` |
| 33 | [Ambience-Leaves-Wind-Soft-Rain-Apeldoorn-Netherlands-ccm41-ccm8.wav](https://freesound.org/people/deleted_user_3544904/sounds/398425/) | deleted_user_3544904 | CC0 1.0 | 1 | field recording bed (B) | – | `0f781cd54fd6` |
| 34 | [Harp - C5 (KSHarp_C5_mf.wav)](https://freesound.org/people/sgossner/sounds/373563/) | sgossner | CC0 1.0 | 4 | harp pluck, line | C5 -9.3 c | `00555f7e76d9` |
| 35 | [Harp - F#5 (KSHarp_G5_mf.wav)](https://freesound.org/people/sgossner/sounds/373573/) | sgossner | CC0 1.0 | 3 | harp pluck, line | G5 -5.3 c | `d16de8e85c82` |
| 36 | [C minor 7th chord, position 5, root 8va (full chord set v4)](https://musicmatter.art/sounds/fullchords-v4/C/00a_main_Cm7_5_root_8va.nc.json) | Peter | CC BY-SA 4.0 | 1 | musicmatter chord, faint | – | `a389975e0b97` |
| 37 | [A minor chord, position 6, inv2 8va (full chord set v4)](https://musicmatter.art/sounds/fullchords-v4/A/00a_main_Am_6_inv2_8va.nc.json) | Peter | CC BY-SA 4.0 | 1 | musicmatter chord, faint | – | `83d989b0139a` |
| 38 | [33-C5.flac](https://freesound.org/people/allan764/sounds/467667/) | allan764 | CC BY 3.0 | 3 | line | C5 +9 c | `68974b69098e` |
| 39 | [38-F5.flac](https://freesound.org/people/allan764/sounds/467684/) | allan764 | CC BY 3.0 | 3 | line | F5 +15 c | `3093f4e35d74` |
| 40 | [G5.wav](https://freesound.org/people/Skamos66/sounds/399476/) | Skamos66 | CC0 1.0 | 3 | line | G5 +0.7 c | `a18cc2bf6f4c` |
| 41 | [Piano.pp.F5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | line | F5 +9 c | `e0cc155431b1` |
| 42 | [Piano.pp.G5.aiff](https://theremin.music.uiowa.edu/MISpiano.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 5 | line | G5 +13 c | `59d112635fd4` |
| 43 | [AltoFlute.vib.ff.C5.stereo.aif](https://theremin.music.uiowa.edu/MIS-Pitches-2012/MISaltoflute2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 1 | line | C5 +1 c | `ab2bbed5437a` |
| 44 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 1 of the run, 72)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | line | C5 +11 c | `28aa3d8e66fe` |
| 45 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 6 of the run, 77)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | line | F5 -9 c | `28aa3d8e66fe` |
| 46 | [Violin.arco.pp.sulD.C5B5.stereo.aif (note 8 of the run, 79)](https://theremin.music.uiowa.edu/MISviolin2012.html) | University of Iowa Electronic Music Studios (Lawrence Fritts, director) | Public domain equivalent (UIowa MIS: no restrictions) | 2 | line | G5 +3 c | `28aa3d8e66fe` |

## Hacks

- 1. **time_stretch**: engine ffmpeg rubberband; options transients=smooth:window=long:phase=independent, pitch=1; ratios {'pad (Rhodes)': 2.3333, 'pad (piano fill)': 3.7333, 'cello': 'about 2-3 (per note)', 'drone (cello)': '15 s pieces, tiled every 11 s'}
- 2. **gain**: type decay flatten (300 ms RMS follower, max +20 dB); applies_to ['pad']
- 3. **gain**: type level match: every line source to the same 1.5 s RMS before its gain
- 4. **fade**: type equal-power swells; seeded upward piano rolls 150-450 ms; Rhodes strikes 0-50 ms; pad_in_s 3.0; pad_out_s 4.5; violin_in_s 0.25
- 5. **lowpass/highpass**: automation dark->bright crossfade 40-60 s, back toward dark over the last 15 s; pad_hz [1100, 3000]; keys_hz [1700, 4000]; musicmatter_hz [1500, 3000]; drone 45 Hz HP, 300 Hz LP (4th order); bed 150 Hz HP, 3 kHz LP; plucks 2.5 kHz LP; line 180 Hz HP, 5.2 kHz LP
- 6. **delay**: on line; time_s 1.0; feedback 0.32; taps 4; ping_pong True; mix 0.5
- 7. **lufs_match**: targets_lufs {'drone': -27.0, 'pad': -21.5, 'keys': -22.0, 'line': -22.0, 'bed': -30.0, 'pluck': -30.0, 'mm': -32.0}; pan {'drone': 0.0, 'pad': 0.06, 'keys': -0.1, 'line': 0.12, 'bed': 0.0, 'pluck': 0.22, 'mm': 0.15}; build_gain_db pad/keys/drone -6 -> 0 over 38-62 s; line -1.5 dB in the first half
- 8. **reverb**: type synthetic hall, generated in the script; rt60_s 6.0; predelay_ms 45; seed 2026; wet 0.4
- 9. **highpass**: cutoff_hz 30
- 10. **lowpass**: type gentle 9 kHz blend (40%)
- 11. **tail**: rule music ends 120 s, 4 s fade, file 124 s
- 12. **loudness**: method ffmpeg loudnorm two-pass, linear; target_lufs -17; ceiling_dbtp -1.5

## Known compromises

- Freesound sounds are HQ previews (lossy); originals need OAuth, not set up. The two field recordings (klankbeeld 173031, 398425) are long files, so only the first 6,000,001 bytes of each HQ preview were fetched with an HTTP Range request; the hashes cover exactly those bytes. Iowa MIS files are the lossless originals.
- The pad is a x2.3 time-stretch of Rhodes notes (Iowa piano fills Bb4/D3/D4/F4 etc. that the Rhodes set lacks, at about x3.7), and the drone is a stretched Iowa cello note, so both carry some phase-vocoder smear.
- allan764 G5 (467689) was rejected: its pitch track was unstable (+11 to +114 c across windows, FFT peak +6 to +9 c). The guitar G5 is Skamos66 399476 (CC0, +0.7 c), whose preview is only 1 s long, so guitar G notes are short plucks.
- sgossner 373573 is titled "Harp - F#5 (KSHarp_G5_mf.wav)"; it measures G5 -5 c and is used as G5.
- Dropped after measurement for this take: Iowa alto flute F5 (+33 c) and G5 (+35 c), Iowa flute non-vib (C5 +17 c with wide spread, G5 measured an octave low), Iowa Bb clarinet (unstable), Iowa piano Ab3 / G2 / D5 (no stable voiced frames in the pp file). Only the alto flute C5 (+1 c) is used, doubling the line C in cycle 3.
- Iowa MIS terms are "freely available ... used for any projects, without restrictions", not a formal CC0/PD dedication; treated as public-domain equivalent, credited anyway.

## Outputs

- nc_ambient_cm_perf03.flac: FLAC 24-bit/48 kHz stereo, 16,720,815 bytes, -17.0 LUFS, -2.4 dBTP, sha256 `b5ee81fc72694d93c3851fd54d5bdddb807c01d28aaf883bc8d10ac9ef73b66e`
- nc_ambient_cm_perf03_preview.mp3: MP3 320 kbps, 48 kHz (preview), 4,962,284 bytes, -17.0 LUFS, -2.4 dBTP, sha256 `0f1c66c003fc569245dc6dd732e806d464e9ee9e47db3b2a2fb813353b13bd04`

## Amendment

2026-10-18T11:23:17-07:00: Contributor display name changed from 'Petrus' to 'Peter' (Peter Semmelhack) for netcomposer.art, at his request. No audio, input, setting or other field changed. Previous record hash `98424febdbea24f6…`, new `6c3ac089018ea076…`.

License: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/