# nc-style/1

A style file is weights a Composition can sample. It is patterns only: tempos,
keys, roman numerals, counts. It never holds a song title, an artist, a
filename or audio.

`tools/profile-to-style.py` builds one from a genre aggregate profile:

```
python3 tools/profile-to-style.py profile.json -o styles/hopkins-like.json
```

Run that from the repo root after a genre session, then commit the style file.
The script refuses profile fields that are not patterns (titles, artists,
filenames, audio). Hopkins-like was built from a 39-song aggregate that had
already been stripped of those.

## File

`schema` is `nc-style/1`. `name` is the id used by `style <name>` (lowercase,
hyphens allowed). Every list below is sampled with `weight`. Order is part of
the file: a tie goes to the earlier row.

| Field | What the weight is | What `style` samples |
| --- | --- | --- |
| `tempo.sample` | inclusive integer BPM range, `round(p25)` … `round(p75)` | one integer tempo, uniform |
| `tempo.min`, `p25`, `median`, `p75`, `max`, `flagged_half_double` | the aggregate, kept for reference | not sampled (`flagged_half_double` is how many source tempos were octave-flagged; the sample range stays the interquartile) |
| `meter[]` | song counts for `N/2`, `N/4`, `N/8` | one meter |
| `keys[]` | song counts; `tonic` plus `major` or `minor` | one key, tonic and mode together |
| `modes[]` | song counts | not sampled; a key already carries its mode |
| `modulation.share` | fraction of source pieces that modulate, 0–1 | one coin, drawn only when the generated line has at least 4 chords |
| `modulation.moves[]` | move counts; `semitones` (may be negative or 0) and `mode_change` | one move, if the coin says yes |
| `chords[]` | time share of one roman numeral | the first chord of a markov line, and the backoff when no n-gram matches |
| `diatonic_share` | median fraction of diatonic chords | not sampled; the vocabulary and the n-grams already include the chromatic chords |
| `seventh_share` | median fraction of chords with a seventh | one coin per markov chord |
| `transitions[]` | n-gram counts (2, then 3, then 4), each `roman` list matching that length | the next chord of a markov line |
| `loops[]` | coverage of a roman loop; duplicate loops are summed | one loop, when the loop coin says yes |
| `chord_length.classes[]` | `bars` is 1 (one chord per bar), 0.5 (two per bar) or 2 (two bars per chord) | one class per generated chord, turned into beats |
| `chord_length.median_beats`, `p25_beats`, `p75_beats` | the aggregate | not sampled |
| `phrase.lengths[]` | how often a section of that many bars occurred | the bar count of an unlengthened line |
| `phrase.bars_median`, `bars_p25`, `bars_p75` | the aggregate | not sampled |
| `forms[]` | song counts for letter forms such as `AB` | not sampled by the statement; a performer can |

## What `style <name>` samples

The statement is read in `create/language.js`. It fills only what the writer
left out. A written tempo, meter, key, chord, length, note, arp or `fm`
depth always wins. The same text and the same `sd N` always produce the same
line.

The RNG is mulberry32, the same function as Surprise me on `/create/`:

```
a = seed >>> 0
a = (a + 0x6D2B79F5) >>> 0
t = imul(a ^ (a >>> 15), a | 1)          // imul is 32-bit
t ^= t + imul(t ^ (t >>> 7), t | 61)
out = ((t ^ (t >>> 14)) >>> 0) / 4294967296
```

`sd 0` stays seed 0. A missing seed samples with seed 1 and the I-read line
says so. The returned `seed` stays null until the writer writes one.

`wpick` sums the weights, draws `out * total`, and walks the rows in file
order. The last row catches a rounding remainder.

Draws, in this order. A draw in parentheses is skipped, not replaced.

1. Meter. Used only when the writer wrote no time signature.
2. Tempo, one integer inside `tempo.sample`. Used only when the writer wrote no tempo.
3. Key. Used only when the writer wrote no chord and no `key` statement.
4. (Only when the writer wrote no chord.) Phrase length, one bar count. Used only when the writer wrote no length. A written length is `N bars`, `N seconds` or `N minutes` (the first one). Seconds and minutes become beats at the tempo from step 2, and anything over 180 seconds is cut to 180, the Save cap.
5. (Only when generating chords.) Loop coin: a loop when `out < 0.5`, otherwise the transition table.
6. (Only on a loop.) One loop.
7. Chords until the target number of beats is filled. Each chord draws its numeral first, then a length class. Beats are `bars` times the quarters in a bar (`4/4` is 4, `3/4` is 3). A class longer than what remains is shortened to the remainder; a remainder under half a beat is absorbed into that chord.
   - Loop: the next numeral in the loop, cycling, with its suffix left as written.
   - Markov: the first chord is drawn from `chords`. Each later chord uses the longest matching n-gram whose prefix is the bare numerals so far (4, then 3, then 2), or `chords` when none match. History stores the bare numeral, before a seventh is added. A bare markov numeral then draws the seventh coin (`out < seventh_share`).
8. (Only when the line has at least 4 chords.) Modulation coin, `out < modulation.share`.
9. (Only when that coin says yes.) One move. Chords from the midpoint onward (`floor(count / 2)`) are transposed by `semitones`. `mode_change` also flips the quality (see below).

Roman numerals become chord symbols in the chosen key. Accidentals `#` and `b`
shift the degree. Upper case is a major triad, lower case a minor triad.
`maj7` stays major 7. A plain `7` is dominant 7 on an upper-case numeral and
minor 7 on a lower-case one. `6` is a sixth (`6` or `m6`), not a figured-bass
inversion. `ø` and `ø7` are half-diminished (`m7b5`). `°` is diminished, `°7`
diminished 7. A seventh coin on a bare numeral adds `maj7` for degrees 0, 3, 5,
8 and 9 (I, bIII, IV, bVI, VI) and `7` otherwise; a lower-case numeral adds `7`,
which is played as minor 7.

A mode-change flip, applied after the symbol exists: major triad and minor triad swap, `maj7` swaps with `m7`, `6` swaps with `m6`, and a dominant `7` becomes `m7`. `m7b5`, `dim` and `dim7` stay put.

When the writer did not state a length, the line is then kept between 20 and
60 seconds. Longer than 60: chords are dropped from the end, and the last
chord is shortened so the line still ends on a positive beat count. Shorter
than 20: the phrase repeats, same recordings, at most 16 times, and not past
60 seconds. A written length skips that window. A written tempo does not
change the draws, but it does change how many seconds those beats last, so a
faster tempo can keep a chord that a slower tempo cut to stay under 60 seconds.

The key's mode is the name from the file (or from `key`). It is the tonic's
mode in the I-read line, and the mode a modulation flip starts from. Each
roman numeral still chooses its own quality, so a major numeral in a minor
key is still a major chord, and the chord symbols are printed.

The I-read line shows every choice, for example
`style hopkins-like → q72 Ab major, then -5 to Eb major; Ab(4) Eb(4) …`.
A written tempo or key is not repeated after the arrow. `4/4` is left off,
as elsewhere. An unknown name does not throw: the line says
`that-name is not a style.` The first style wins.
