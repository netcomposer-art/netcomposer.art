#!/usr/bin/env python3
"""Turn a genre aggregate profile into an nc-style/1 file.

The profile is statistical: tempos, keys, roman numerals, n-grams, loops.
This script keeps those weights and drops anything that is not a pattern.
Song titles, artist names, filenames and audio never go in the style.

Usage (from the repo root):

  python3 tools/profile-to-style.py profile.json -o styles/hopkins-like.json

The name comes from the profile's "name" field. Re-run the same command
after a future genre session and commit the new style file.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

SCHEMA = "nc-style/1"
AUDIO_EXT = re.compile(r"\.(?:wav|mp3|flac|aiff|aif|ogg|m4a)\b", re.I)
MOVE = re.compile(
    r"^([+-]?\d+)\s+semitones(?:\s+\(mode change\))?$", re.I
)
NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
# Keys that must never be copied through, even if a later profile adds them.
BANNED_KEYS = {
    "title", "titles", "artist", "artists", "album", "albums",
    "audio", "audios", "filename", "filenames", "file", "files",
    "path", "paths", "url", "urls", "isrc", "credits", "credit",
}


def die(msg: str) -> None:
    sys.exit("profile-to-style: " + msg)


def load(path: Path) -> dict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        die(f"could not read {path}: {exc}")
    if not isinstance(data, dict):
        die("profile must be a JSON object")
    return data


def walk_banned(obj, where: str) -> None:
    if isinstance(obj, dict):
        for key, value in obj.items():
            if str(key).lower() in BANNED_KEYS:
                die(f"refusing {where}: field {key!r} is not a pattern")
            walk_banned(value, where + "." + str(key))
    elif isinstance(obj, list):
        for i, value in enumerate(obj):
            walk_banned(value, f"{where}[{i}]")
    elif isinstance(obj, str) and AUDIO_EXT.search(obj):
        die(f"refusing {where}: audio filename in a profile string")


def num(value, where: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        die(f"{where} must be a number")
    return float(value)


def whole(value, where: str):
    n = num(value, where)
    if n.is_integer():
        return int(n)
    return n


def weight_list(raw, where: str) -> list:
    if not isinstance(raw, dict) or not raw:
        die(f"{where} must be a non-empty object of weights")
    out = []
    for key, value in raw.items():
        w = whole(value, f"{where}.{key}")
        if w < 0:
            die(f"{where}.{key} weight is negative")
        if w == 0:
            continue
        out.append((str(key), w))
    if not out:
        die(f"{where} has no positive weights")
    return out


def roman_tokens(text: str, where: str) -> list:
    parts = str(text).split()
    if not parts:
        die(f"{where} is an empty roman numeral")
    return parts


def convert(profile: dict) -> dict:
    walk_banned(profile, "profile")
    name = str(profile.get("name") or "").strip().lower()
    if not NAME.match(name):
        die("profile name must be lowercase words separated by hyphens")

    tempo = profile.get("tempo") or {}
    p25 = num(tempo.get("p25"), "tempo.p25")
    p75 = num(tempo.get("p75"), "tempo.p75")
    if p75 < p25:
        die("tempo.p75 is below tempo.p25")
    sample_lo = int(round(p25))
    sample_hi = int(round(p75))
    if sample_hi < sample_lo:
        sample_hi = sample_lo

    meters = []
    for value, weight in weight_list(profile.get("time_signatures"), "time_signatures"):
        if not re.match(r"^\d+/(?:2|4|8)$", value):
            die(f"time signature {value!r} is not N/2, N/4 or N/8")
        meters.append({"value": value, "weight": weight})

    keys = []
    for label, weight in weight_list(profile.get("keys"), "keys"):
        m = re.match(r"^([A-G](?:#|b)?)\s+(major|minor)$", label)
        if not m:
            die(f"key {label!r} is not 'Ab major' or 'Eb minor'")
        keys.append({"tonic": m.group(1), "mode": m.group(2), "weight": weight})

    modes = []
    for mode, weight in weight_list(profile.get("modes"), "modes"):
        if mode not in ("major", "minor"):
            die(f"mode {mode!r} is not major or minor")
        modes.append({"mode": mode, "weight": weight})

    moves = []
    raw_moves = profile.get("modulation_moves") or {}
    if not isinstance(raw_moves, dict):
        die("modulation_moves must be an object")
    for label, weight in raw_moves.items():
        m = MOVE.match(str(label).strip())
        if not m:
            die(f"modulation move {label!r} was not understood")
        w = whole(weight, f"modulation_moves.{label}")
        if w <= 0:
            continue
        moves.append({
            "semitones": int(m.group(1)),
            "mode_change": "mode change" in str(label).lower(),
            "weight": w,
        })
    if not moves:
        die("modulation_moves has no positive weights")

    chords = []
    raw_chords = profile.get("chord_vocabulary")
    if not isinstance(raw_chords, list) or not raw_chords:
        die("chord_vocabulary must be a non-empty list")
    for i, row in enumerate(raw_chords):
        if not isinstance(row, dict) or "roman" not in row:
            die(f"chord_vocabulary[{i}] needs a roman numeral")
        tokens = roman_tokens(row["roman"], f"chord_vocabulary[{i}]")
        if len(tokens) != 1:
            die(f"chord_vocabulary[{i}] should be one roman numeral")
        w = whole(row.get("time_share"), f"chord_vocabulary[{i}].time_share")
        if w < 0:
            die(f"chord_vocabulary[{i}] weight is negative")
        if w == 0:
            continue
        chords.append({"roman": tokens[0], "weight": w})
    if not chords:
        die("chord_vocabulary has no positive weights")

    transitions = []
    for n in (2, 3, 4):
        rows = profile.get(f"progressions_{n}") or []
        if not isinstance(rows, list):
            die(f"progressions_{n} must be a list")
        for i, row in enumerate(rows):
            if not isinstance(row, dict) or "roman" not in row:
                die(f"progressions_{n}[{i}] needs a roman numeral")
            tokens = roman_tokens(row["roman"], f"progressions_{n}[{i}]")
            if len(tokens) != n:
                die(f"progressions_{n}[{i}] has {len(tokens)} numerals, not {n}")
            w = whole(row.get("count", 0), f"progressions_{n}[{i}].count")
            if w <= 0:
                continue
            transitions.append({"roman": tokens, "weight": w})
    if not transitions:
        die("no progression n-grams")

    loops = []
    seen = {}
    raw_loops = profile.get("main_loops") or []
    if not isinstance(raw_loops, list) or not raw_loops:
        die("main_loops must be a non-empty list")
    for i, row in enumerate(raw_loops):
        if not isinstance(row, dict) or "loop" not in row:
            die(f"main_loops[{i}] needs a loop")
        tokens = roman_tokens(row["loop"], f"main_loops[{i}]")
        w = whole(row.get("coverage", 0), f"main_loops[{i}].coverage")
        if w <= 0:
            continue
        key = " ".join(tokens)
        if key in seen:
            summed = round(loops[seen[key]]["weight"] + w, 6)
            loops[seen[key]]["weight"] = int(summed) if float(summed).is_integer() else summed
        else:
            seen[key] = len(loops)
            loops.append({"roman": tokens, "weight": w})
    if not loops:
        die("main_loops has no positive coverage")

    rhythm = profile.get("harmonic_rhythm") or {}
    typical = (rhythm.get("typical") or {}) if isinstance(rhythm, dict) else {}
    class_map = {
        "1 chord per bar": 1,
        "2 chords per bar": 0.5,
        "2+ bars per chord": 2,
    }
    classes = []
    if not isinstance(typical, dict):
        die("harmonic_rhythm.typical must be an object")
    for label, bars in class_map.items():
        if label not in typical:
            continue
        w = whole(typical[label], f"harmonic_rhythm.typical.{label}")
        if w > 0:
            classes.append({"bars": bars, "weight": w})
    if not classes:
        classes.append({"bars": 1, "weight": 1})

    sections = profile.get("sections") or {}
    lengths = []
    common = sections.get("common_lengths") if isinstance(sections, dict) else None
    if not isinstance(common, dict) or not common:
        die("sections.common_lengths must be a non-empty object")
    for bars, weight in common.items():
        w = whole(weight, f"sections.common_lengths.{bars}")
        if w <= 0:
            continue
        try:
            n = int(bars)
        except (TypeError, ValueError):
            die(f"section length {bars!r} is not a whole number of bars")
        if n <= 0:
            die(f"section length {bars!r} is not positive")
        lengths.append({"bars": n, "weight": w})
    if not lengths:
        die("sections.common_lengths has no positive weights")

    forms = []
    for form, weight in weight_list(profile.get("forms"), "forms"):
        if not re.match(r"^[A-Z]+$", form):
            die(f"form {form!r} is not a run of section letters")
        forms.append({"form": form, "weight": weight})

    n_songs = profile.get("n_songs")
    if isinstance(n_songs, bool) or not isinstance(n_songs, int) or n_songs < 1:
        die("n_songs must be a positive integer")

    style = {
        "schema": SCHEMA,
        "name": name,
        "source": {
            "n": n_songs,
            "note": "Patterns only. No song titles, artists, or audio.",
        },
        "tempo": {
            "min": num(tempo.get("min"), "tempo.min"),
            "p25": p25,
            "median": num(tempo.get("median"), "tempo.median"),
            "p75": p75,
            "max": num(tempo.get("max"), "tempo.max"),
            "sample": [sample_lo, sample_hi],
            "flagged_half_double": int(num(tempo.get("flagged_half_double", 0), "tempo.flagged_half_double")),
        },
        "meter": meters,
        "keys": keys,
        "modes": modes,
        "modulation": {
            "share": num(profile.get("modulation_share"), "modulation_share"),
            "moves": moves,
        },
        "chords": chords,
        "diatonic_share": num(profile.get("diatonic_share_median"), "diatonic_share_median"),
        "seventh_share": num(profile.get("seventh_share_median"), "seventh_share_median"),
        "transitions": transitions,
        "loops": loops,
        "chord_length": {
            "median_beats": num(rhythm.get("median_chord_beats"), "harmonic_rhythm.median_chord_beats"),
            "p25_beats": num(rhythm.get("p25"), "harmonic_rhythm.p25"),
            "p75_beats": num(rhythm.get("p75"), "harmonic_rhythm.p75"),
            "classes": classes,
        },
        "phrase": {
            "bars_median": num(sections.get("bars_median"), "sections.bars_median"),
            "bars_p25": num(sections.get("bars_p25"), "sections.bars_p25"),
            "bars_p75": num(sections.get("bars_p75"), "sections.bars_p75"),
            "lengths": lengths,
        },
        "forms": forms,
    }
    walk_banned(style, "style")
    return style


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("profile", type=Path, help="aggregate profile JSON")
    parser.add_argument("-o", "--output", type=Path, required=True, help="style JSON to write")
    args = parser.parse_args()
    style = convert(load(args.profile))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(style, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {args.output} ({style['name']}, {style['schema']})")


if __name__ == "__main__":
    main()
