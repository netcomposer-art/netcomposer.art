/* Chord library, voicing, and arpeggio order for /create/.
 * Copyright (c) 2026 Peter Semmelhack
 *
 * Port of chords.ts from psemmelhack/NetComposer-Synth, branch
 * replit-changes (the Expanded Chord Library), together with the voicing
 * rule in that repo's chord-performance brief. IDs, aliases, intervals,
 * fitVoicing, chordVoicing, arpeggioPool, and arpeggioSequence are copied
 * (arpeggioSequence, arpIndex, Walk, and Euclidean from ASTRID main 288e9c2)
 * so Create and the synth play the same notes. A slash bass is the only
 * step that brief does not define: the library voicing is built on the
 * written root, then the bass pitch class is placed an octave under the
 * lowest note when it is not the root. Non-slash chords skip that step.
 *
 * Composition qualities 7#11 and 7b13 have no library definition.
 * maj7#5 uses the same intervals as augmented-major-7 (0, 4, 8, 11) and
 * maps to that id. The library's own symbol for it is aug(maj7).
 *
 * The engine and this port are MIT. Output audio is CC BY-SA 4.0.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function (root) {
  'use strict';
  var CHORD_CATEGORIES = ['Essential', 'Seventh', 'Extended', 'Altered', 'Experimental'];
  function group(category, rows) {
    return rows.map(function (row) {
      return { id: row[0], name: row[1], intervals: row[2], category: category, symbol: row[3] };
    });
  }
  // Intervals are literal offsets. Shared intervals keep distinct ids.
  var CHORD_LIBRARY = [].concat(
    group('Essential', [
      ['major', 'Major', [0, 4, 7], ''], ['minor', 'Minor', [0, 3, 7], 'm'],
      ['diminished', 'Diminished', [0, 3, 6], 'dim'], ['augmented', 'Augmented', [0, 4, 8], 'aug'],
      ['sus2', 'Sus2', [0, 2, 7], 'sus2'], ['sus4', 'Sus4', [0, 5, 7], 'sus4'],
      ['power', 'Power Chord', [0, 7, 12], '5'], ['major-6', 'Major 6', [0, 4, 7, 9], '6'], ['minor-6', 'Minor 6', [0, 3, 7, 9], 'm6']
    ]),
    group('Seventh', [
      ['major-7', 'Major 7', [0, 4, 7, 11], 'maj7'], ['minor-7', 'Minor 7', [0, 3, 7, 10], 'm7'],
      ['dominant-7', 'Dominant 7', [0, 4, 7, 10], '7'], ['minor-major-7', 'Minor-Major 7', [0, 3, 7, 11], 'm(maj7)'],
      ['half-diminished-7', 'Half-Diminished 7', [0, 3, 6, 10], 'm7b5'], ['diminished-7', 'Diminished 7', [0, 3, 6, 9], 'dim7'],
      ['augmented-major-7', 'Augmented Major 7', [0, 4, 8, 11], 'aug(maj7)'], ['augmented-7', 'Augmented 7', [0, 4, 8, 10], 'aug7'],
      ['7sus4', '7sus4', [0, 5, 7, 10], '7sus4']
    ]),
    group('Extended', [
      ['add9', 'Add9', [0, 2, 4, 7], 'add9'], ['minor-add9', 'Minor Add9', [0, 2, 3, 7], 'm(add9)'],
      ['major-9', 'Major 9', [0, 2, 4, 7, 11], 'maj9'], ['minor-9', 'Minor 9', [0, 2, 3, 7, 10], 'm9'],
      ['dominant-9', 'Dominant 9', [0, 2, 4, 7, 10], '9'], ['6-9', '6/9', [0, 2, 4, 7, 9], '6/9'],
      ['minor-6-9', 'Minor 6/9', [0, 2, 3, 7, 9], 'm6/9'], ['major-7-sharp11', 'Major 7#11', [0, 4, 6, 7, 11], 'maj7#11'],
      ['minor-11', 'Minor 11', [0, 2, 3, 5, 7, 10], 'm11'], ['dominant-11', 'Dominant 11', [0, 2, 4, 5, 7, 10], '11'],
      ['9sus4', '9sus4', [0, 2, 5, 7, 10], '9sus4'], ['major-13', 'Major 13', [0, 2, 4, 7, 9, 11], 'maj13'],
      ['minor-13', 'Minor 13', [0, 2, 3, 5, 7, 9, 10], 'm13'], ['dominant-13', 'Dominant 13', [0, 2, 4, 7, 9, 10], '13']
    ]),
    group('Altered', [
      ['7b9', '7b9', [0, 1, 4, 7, 10], '7b9'], ['7-sharp9', '7#9', [0, 3, 4, 7, 10], '7#9'],
      ['7b5', '7b5', [0, 4, 6, 10], '7b5'], ['7-sharp5', '7#5', [0, 4, 8, 10], '7#5'],
      ['7b9-sharp5', '7b9#5', [0, 1, 4, 8, 10], '7b9#5'], ['7-sharp9-b5', '7#9b5', [0, 3, 4, 6, 10], '7#9b5'],
      ['7alt', '7alt', [0, 1, 3, 4, 6, 8, 10], '7alt'], ['major-7b5', 'Major 7b5', [0, 4, 6, 11], 'maj7b5'],
      ['minor-7b9', 'Minor 7b9', [0, 1, 3, 7, 10], 'm7b9']
    ]),
    group('Experimental', [
      ['quartal-3', 'Quartal 3', [0, 5, 10], ' Quartal 3'], ['quartal-4', 'Quartal 4', [0, 5, 10, 15], ' Quartal 4'],
      ['quartal-5', 'Quartal 5', [0, 5, 10, 15, 20], ' Quartal 5'], ['quintal-3', 'Quintal 3', [0, 7, 14], ' Quintal 3'],
      ['quintal-4', 'Quintal 4', [0, 7, 14, 21], ' Quintal 4'], ['chromatic-cluster', 'Chromatic Cluster', [0, 1, 2], ' Chromatic Cluster'],
      ['whole-tone-cluster', 'Whole-Tone Cluster', [0, 2, 4, 6], ' Whole-Tone Cluster'],
      ['minor-second-cluster', 'Minor-Second Cluster', [0, 1, 5, 7], ' Minor-Second Cluster'],
      ['major-second-stack', 'Major-Second Stack', [0, 2, 4, 7, 9], ' Major-Second Stack'],
      ['lydian-stack', 'Lydian Stack', [0, 2, 4, 6, 7, 11], ' Lydian Stack'],
      ['major-pentatonic', 'Major Pentatonic', [0, 2, 4, 7, 9], ' Major Pentatonic'],
      ['minor-pentatonic', 'Minor Pentatonic', [0, 3, 5, 7, 10], ' Minor Pentatonic'],
      ['in-sen', 'In-sen', [0, 1, 5, 7, 10], ' In-sen'], ['whole-tone', 'Whole-Tone Collection', [0, 2, 4, 6, 8, 10], ' Whole-Tone']
    ])
  );
  var byId = new Map(CHORD_LIBRARY.map(function (chord) { return [chord.id, chord]; }));
  var legacy = {
    Major: 'major', Minor: 'minor', Diminished: 'diminished', Augmented: 'augmented', Sus2: 'sus2', Sus4: 'sus4',
    'Major 7th': 'major-7', 'Minor 7th': 'minor-7', 'Dominant 7th': 'dominant-7'
  };
  function normalize(name) { return String(name || '').trim().toLowerCase().replace(/[\s_-]+/g, ''); }
  // Unknown names fall back to major, matching resolveChordId in chords.ts.
  function resolveChordId(value) {
    if (typeof value !== 'string') return 'major';
    if (byId.has(value)) return value;
    if (legacy[value]) return legacy[value];
    var normalized = normalize(value);
    var legacyHit = null;
    Object.keys(legacy).forEach(function (name) {
      if (!legacyHit && normalize(name) === normalized) legacyHit = legacy[name];
    });
    if (legacyHit) return legacyHit;
    var found = null;
    CHORD_LIBRARY.forEach(function (c) {
      if (!found && (normalize(c.name) === normalized || normalize(c.id) === normalized)) found = c.id;
    });
    return found || 'major';
  }
  function getChord(value) { return byId.get(resolveChordId(value)); }
  function integer(n, min, max) {
    return Math.max(min, Math.min(max, Math.round(isFinite(n) ? n : min)));
  }
  function fitVoicing(notes) {
    if (!notes.length) return [];
    var low = Math.min.apply(null, notes), high = Math.max.apply(null, notes);
    var lower = Math.ceil(-low / 12), upper = Math.floor((127 - high) / 12);
    if (lower > upper) throw new RangeError('Voicing spans more than the supported MIDI range.');
    var shift = Math.max(lower, Math.min(upper, 0)) * 12;
    return notes.map(function (n) { return n + shift; });
  }
  function chordVoicing(root, chord, inversion, spread) {
    if (inversion == null) inversion = 0;
    if (spread == null) spread = 'compact';
    var definition = getChord(chord);
    var notes = definition.intervals.map(function (n) { return integer(root, 0, 127) + n; });
    var count = integer(inversion, 0, notes.length - 1), i;
    for (i = 0; i < count; i++) {
      var low = notes.shift(), highest = notes[notes.length - 1];
      notes.push(low + Math.ceil((highest - low + 1) / 12) * 12);
    }
    var extentMap = { compact: 0, wide: 1, wider: 2, maximum: 4 };
    var extent = Object.prototype.hasOwnProperty.call(extentMap, spread) ? extentMap[spread] : 0;
    return fitVoicing(notes.map(function (n, idx) {
      return n + 12 * Math.floor(idx * extent / Math.max(1, notes.length - 1));
    }));
  }
  function arpeggioPool(voicing, octaves) {
    var reps = integer(octaves == null ? 1 : octaves, 1, 4);
    var flat = [];
    var octave, i;
    for (octave = 0; octave < reps; octave++) {
      for (i = 0; i < voicing.length; i++) flat.push(voicing[i] + octave * 12);
    }
    var seen = new Set();
    var out = [];
    flat.forEach(function (n) {
      if (n < 0 || n > 127 || seen.has(n)) return;
      seen.add(n);
      out.push(n);
    });
    return out;
  }
  function arpeggioSequence(pool, order) {
    var notes = Array.from(new Set(pool)).sort(function (a, b) { return a - b; });
    var n = notes.length;
    if (n < 2) return notes;
    var bounce = notes.concat(notes.slice(1, -1).reverse());
    if (order === 'down') return notes.reverse();
    if (order === 'up-down') return bounce;
    if (order === 'down-up') return bounce.map(function (note) { return notes[n - 1 - notes.indexOf(note)]; });
    if (order === 'up-down-repeat') return notes.concat(notes.slice().reverse());
    if (order === 'as-played') return Array.from(new Set(pool));
    if (order === 'outside-in') {
      var result = [], low = 0, high = n - 1;
      for (; low <= high; low++, high--) {
        result.push(notes[low]);
        if (low !== high) result.push(notes[high]);
      }
      return result;
    }
    if (order === 'inside-out') {
      return notes.map(function (note, i) { return { note: note, i: i }; }).sort(function (a, b) {
        return Math.abs(a.i - (n - 1) / 2) - Math.abs(b.i - (n - 1) / 2) || a.i - b.i;
      }).map(function (x) { return x.note; });
    }
    if (order === 'pendulum') {
      var middle = Math.floor((n - 1) / 2);
      return bounce.slice(middle).concat(bounce.slice(0, middle));
    }
    if (order === 'blossom-up' || order === 'blossom-down') {
      // From the centre (lower middle for an even count), spiral out: +1, -1, +2, -2 (Down: -1, +1).
      var centre = Math.floor((n - 1) / 2), sign = order === 'blossom-up' ? 1 : -1, grown = [notes[centre]];
      for (var d = 1; grown.length < n; d++) {
        [centre + sign * d, centre - sign * d].forEach(function (k) { if (k >= 0 && k < n) grown.push(notes[k]); });
      }
      return grown;
    }
    if (order === 'low-and-up' || order === 'low-and-down' || order === 'hi-and-up' || order === 'hi-and-down') {
      // A pedal note (lowest or highest) alternating with the others, pedal first.
      var lowPedal = order.indexOf('low') === 0, pedal = lowPedal ? notes[0] : notes[n - 1];
      var others = lowPedal ? notes.slice(1) : notes.slice(0, -1);
      if (/down$/.test(order)) others.reverse();
      var out = [];
      others.forEach(function (note) { out.push(pedal, note); });
      return out;
    }
    // Walk and Euclidean step through the Up order; arpIndex picks the step.
    return notes;
  }
  // The arp pattern list is ASTRID's lib/synth-audio/arp-patterns.json, copied
  // to create/arp-patterns.json. Each pattern has a permanent number, so a line
  // can say Arp(5). tests/arp-patterns.mjs pins the numbers and checks this
  // block against that file.
  // BEGIN arp-patterns.json (tools/sync-arp-patterns.mjs writes this block; do not edit it by hand)
  var ARP_REGISTRY = {
    "format": "netcomposer.arp-patterns",
    "version": 1,
    "note": "Stable IDs and numbers (num, Off = 0; Arp(5) in NC): never renamed, renumbered or reused. New patterns are only added, with the next free number. Legacy IDs stay valid.",
    "patterns": [
      {
        "id": "off",
        "num": 0,
        "name": "Off — chord",
        "description": "No arp: the chord plays together"
      },
      {
        "id": "up",
        "num": 1,
        "name": "Up",
        "description": "Low to high, then again"
      },
      {
        "id": "down",
        "num": 2,
        "name": "Down",
        "description": "High to low, then again"
      },
      {
        "id": "up-down",
        "num": 3,
        "name": "Up/Down",
        "description": "Up then down, ends not repeated"
      },
      {
        "id": "up-down-repeat",
        "num": 4,
        "name": "Up/Down Repeat",
        "description": "Up then down, ends repeated"
      },
      {
        "id": "random",
        "num": 5,
        "name": "Random",
        "description": "Any note each step"
      },
      {
        "id": "as-played",
        "num": 6,
        "name": "As Played",
        "description": "The order the keys were pressed"
      },
      {
        "id": "outside-in",
        "num": 7,
        "name": "Outside-In",
        "description": "Lowest, highest, then inward"
      },
      {
        "id": "inside-out",
        "num": 8,
        "name": "Inside-Out",
        "description": "From the middle outward, lower first"
      },
      {
        "id": "pendulum",
        "num": 9,
        "name": "Pendulum",
        "description": "From the lower middle, swing between the ends"
      },
      {
        "id": "blossom-up",
        "num": 10,
        "name": "Blossom Up",
        "description": "From center, spiral up"
      },
      {
        "id": "blossom-down",
        "num": 11,
        "name": "Blossom Down",
        "description": "From center, spiral down"
      },
      {
        "id": "low-and-up",
        "num": 12,
        "name": "Low&Up",
        "description": "Low pedal, others ascending"
      },
      {
        "id": "low-and-down",
        "num": 13,
        "name": "Low&Down",
        "description": "Low pedal, others descending"
      },
      {
        "id": "hi-and-up",
        "num": 14,
        "name": "Hi&Up",
        "description": "High pedal, others ascending"
      },
      {
        "id": "hi-and-down",
        "num": 15,
        "name": "Hi&Down",
        "description": "High pedal, others descending"
      },
      {
        "id": "walk",
        "num": 16,
        "name": "Walk",
        "description": "Next 50%, repeat 25%, back 25%"
      },
      {
        "id": "euclidean",
        "num": 17,
        "name": "Euclidean",
        "description": "Hits spread evenly over Steps, rests between"
      },
      {
        "id": "down-up",
        "num": 18,
        "name": "Down/Up (legacy)",
        "description": "Down then up, ends not repeated",
        "legacy": true
      }
    ],
    "aliases": {
      "none": "off",
      "chord": "off",
      "updown": "up-down",
      "up-and-down": "up-down",
      "downup": "down-up",
      "down-and-up": "down-up",
      "down-up-legacy": "down-up",
      "off-chord": "off",
      "rand": "random",
      "played": "as-played",
      "order": "as-played",
      "converge": "outside-in",
      "diverge": "inside-out",
      "thumb-up": "low-and-up",
      "thumb-down": "low-and-down",
      "pinky-up": "hi-and-up",
      "pinky-down": "hi-and-down",
      "high-and-up": "hi-and-up",
      "high-and-down": "hi-and-down",
      "euclid": "euclidean",
      "drunk": "walk"
    },
    "euclidean": {
      "hits": "arpHits",
      "steps": "arpSteps",
      "rotate": "arpRotate"
    },
    "euclideanDefaults": {
      "hits": 5,
      "steps": 8,
      "rotate": 0
    },
    "euclideanMaxSteps": 16
  };
  // END arp-patterns.json
  var ARP_PATTERNS = ARP_REGISTRY.patterns;
  var ARP_ALIASES = ARP_REGISTRY.aliases;
  var ARP_IDS = new Set(ARP_PATTERNS.map(function (p) { return p.id; }));
  var ARP_BY_NUM = new Map(ARP_PATTERNS.map(function (p) { return [p.num, p.id]; }));
  var ARP_ORDERS = ARP_PATTERNS.map(function (p) { return { value: p.id, label: p.name }; });
  function arpNum(id) {
    var found = ARP_PATTERNS.filter(function (p) { return p.id === id; })[0];
    return found ? found.num : 0;
  }
  function arpKey(raw) {
    return raw.trim().toLowerCase().replace(/\(legacy\)/g, '').replace(/&/g, '-and-').replace(/[\s_/]+/g, '-')
      .replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }
  // Same order as ASTRID's resolveArpId: a number, an id, a loose spelling of
  // an id, an alias, then a display name. null when none match.
  function resolveArpId(raw) {
    if (typeof raw === 'number') return Number.isInteger(raw) && ARP_BY_NUM.has(raw) ? ARP_BY_NUM.get(raw) : null;
    if (typeof raw !== 'string') return null;
    if (/^\s*\d+\s*$/.test(raw)) { var num = Number(raw); return ARP_BY_NUM.has(num) ? ARP_BY_NUM.get(num) : null; }
    if (ARP_IDS.has(raw)) return raw;
    var key = arpKey(raw);
    if (ARP_IDS.has(key)) return key;
    if (Object.prototype.hasOwnProperty.call(ARP_ALIASES, key)) return ARP_ALIASES[key];
    var want = raw.trim().toLowerCase();
    var byName = ARP_PATTERNS.filter(function (p) { return p.name.toLowerCase().replace(/\s*\(legacy\)/, '') === want; })[0];
    return byName ? byName.id : null;
  }
  // A bare word on an arp line is a pattern only when it spells an id
  // (blossom-up, Blossom_Up, Low&Up). Aliases such as chord or order stay
  // words there; Arp(...) takes them.
  function arpIdOfWord(word) {
    if (typeof word !== 'string' || /^\s*\d+\s*$/.test(word)) return null;
    var key = arpKey(word);
    return ARP_IDS.has(key) && key !== 'off' ? key : null;
  }

  // Euclidean: Hits spread as evenly as possible over Steps, turned by Rotate.
  var EUCLID_MAX_STEPS = ARP_REGISTRY.euclideanMaxSteps;
  var DEFAULT_EUCLID = ARP_REGISTRY.euclideanDefaults;
  function euclidOf(raw) {
    function whole(v, d) { return typeof v === 'number' && isFinite(v) ? Math.round(v) : d; }
    raw = raw || {};
    var steps = Math.max(1, Math.min(EUCLID_MAX_STEPS, whole(raw.steps, DEFAULT_EUCLID.steps)));
    return {
      hits: Math.max(0, Math.min(steps, whole(raw.hits, DEFAULT_EUCLID.hits))),
      steps: steps,
      rotate: ((whole(raw.rotate, DEFAULT_EUCLID.rotate) % steps) + steps) % steps
    };
  }
  // Step j hits when (j * hits) mod steps < hits. 5 of 8 is x.x.xx.x
  function euclidHit(e, step) {
    var j = ((Math.floor(step) + e.rotate) % e.steps + e.steps) % e.steps;
    return (j * e.hits) % e.steps < e.hits;
  }
  function euclidPattern(e) {
    var s = '', k;
    for (k = 0; k < e.steps; k++) s += euclidHit(e, k) ? 'x' : '.';
    return s;
  }
  function hitsBefore(e, step) {
    var count = Math.floor(step / e.steps) * e.hits, k;
    for (k = step - (step % e.steps); k < step; k++) if (euclidHit(e, k)) count++;
    return count;
  }
  // Walk: a fixed-seed coin per step, the same coin as ASTRID, so a line
  // walks the same way every time: next 50%, repeat 25%, back 25%, wrapping.
  var WALK_SEED = 0x5eed2026;
  function walkCoin(step) {
    var h = (Math.imul(step ^ WALK_SEED, 0x9e3779b1) ^ 0x85ebca6b) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
    h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  var walkMemo = new Map();
  function walkIndex(n, step) {
    if (n < 2) return 0;
    var target = Math.max(0, Math.floor(step));
    var memo = walkMemo.get(n);
    if (!memo || memo.step > target) memo = { step: 0, pos: 0 };
    var k = memo.step, pos = memo.pos;
    for (; k < target; k++) {
      var r = walkCoin(k + 1);
      pos = (pos + (r < 0.5 ? 1 : r < 0.75 ? 0 : n - 1)) % n;
    }
    walkMemo.set(n, { step: k, pos: pos });
    return pos;
  }
  // Which entry of an arpeggioSequence plays at step. null is a rest
  // (a Euclidean off-step). random is a function that returns 0..1.
  function arpIndex(order, n, step, euclid, random) {
    if (n < 1) return null;
    function wrap(k) { return ((Math.floor(k) % n) + n) % n; }
    if (order === 'random') return Math.min(n - 1, Math.max(0, Math.floor((random || Math.random)() * n)));
    if (order === 'walk') return walkIndex(n, step);
    if (order === 'euclidean') {
      var e = euclidOf(euclid);
      var k = Math.max(0, Math.floor(step));
      return euclidHit(e, k) ? wrap(hitsBefore(e, k)) : null;
    }
    return wrap(step);
  }

  // Composition quality (after the language aliases) → library id.
  // null is a real Composition chord with no library definition.
  var COMPOSITION = {
    '': 'major', '6': 'major-6', '6-9': '6-9', '7': 'dominant-7', 'pow': 'power',
    '7#11': null, '7#9': '7-sharp9', '7alt': '7alt', '7b13': null,
    '7b5': '7b5', '7b9': '7b9', '7sus4': '7sus4', '9': 'dominant-9',
    '9sus4': '9sus4', '13': 'dominant-13', 'add9': 'add9', 'aug': 'augmented',
    'dim': 'diminished', 'dim7': 'diminished-7', 'm': 'minor', 'm-add9': 'minor-add9',
    'm-maj7': 'minor-major-7', 'm11': 'minor-11', 'm13': 'minor-13', 'm6': 'minor-6',
    'm6-9': 'minor-6-9', 'm7': 'minor-7', 'm7b5': 'half-diminished-7', 'm9': 'minor-9',
    'maj13': 'major-13', 'maj7': 'major-7', 'maj7#11': 'major-7-sharp11',
    'maj7#5': 'augmented-major-7', 'maj9': 'major-9', 'sus2': 'sus2', 'sus4': 'sus4'
  };
  var bySymbol = new Map();
  CHORD_LIBRARY.forEach(function (c) {
    var sym = String(c.symbol || '').trim();
    if (sym && !bySymbol.has(sym)) bySymbol.set(sym, c.id);
  });
  function compositionKnown(q) { return Object.prototype.hasOwnProperty.call(COMPOSITION, q); }
  function idForName(value) {
    if (typeof value !== 'string' || !value) return null;
    if (byId.has(value)) return value;
    var norm = normalize(value), found = null;
    CHORD_LIBRARY.forEach(function (c) {
      if (!found && (normalize(c.id) === norm || normalize(c.name) === norm)) found = c.id;
    });
    return found;
  }
  // No fallback to major. An unknown quality stays unmapped.
  function idForQuality(q) {
    if (compositionKnown(q)) return COMPOSITION[q];
    if (bySymbol.has(q)) return bySymbol.get(q);
    if (byId.has(q)) return q;
    return idForName(q);
  }
  function idForSymbol(symbol) {
    var m = /^([A-G])(#|b)?([\s\S]*)$/.exec(symbol || '');
    if (!m) return null;
    var q = m[3] || '';
    var slash = q.indexOf('/');
    if (slash >= 0) q = q.slice(0, slash);
    return idForQuality(q);
  }
  // Slash bass only. bassPc is a pitch class. The root's own bass is already
  // the bottom of an uninverted voicing, so it is left alone.
  function voicedChord(root, chord, inversion, spread, bassPc) {
    var notes = chordVoicing(root, chord, inversion, spread);
    if (bassPc == null || !isFinite(+bassPc)) return notes;
    var bpc = ((+bassPc % 12) + 12) % 12;
    var rpc = ((root % 12) + 12) % 12;
    if (bpc === rpc) return notes;
    var low = Math.min.apply(null, notes);
    var delta = ((low % 12) - bpc + 12) % 12;
    var bass = low - (delta === 0 ? 12 : delta);
    return fitVoicing(notes.concat([bass]));
  }
  var UNMAPPED_QUALITIES = Object.keys(COMPOSITION).filter(function (q) { return COMPOSITION[q] == null; }).sort();

  root.NCChords = {
    CHORD_CATEGORIES: CHORD_CATEGORIES,
    CHORD_LIBRARY: CHORD_LIBRARY,
    ARP_ORDERS: ARP_ORDERS,
    ARP_PATTERNS: ARP_PATTERNS,
    ARP_ALIASES: ARP_ALIASES,
    ARP_REGISTRY: ARP_REGISTRY,
    EUCLID_MAX_STEPS: EUCLID_MAX_STEPS,
    DEFAULT_EUCLID: DEFAULT_EUCLID,
    resolveArpId: resolveArpId,
    arpIdOfWord: arpIdOfWord,
    arpNum: arpNum,
    euclidOf: euclidOf,
    euclidHit: euclidHit,
    euclidPattern: euclidPattern,
    walkIndex: walkIndex,
    arpIndex: arpIndex,
    UNMAPPED_QUALITIES: UNMAPPED_QUALITIES,
    resolveChordId: resolveChordId,
    getChord: getChord,
    fitVoicing: fitVoicing,
    chordVoicing: chordVoicing,
    arpeggioPool: arpeggioPool,
    arpeggioSequence: arpeggioSequence,
    compositionKnown: compositionKnown,
    idForQuality: idForQuality,
    idForName: idForName,
    idForSymbol: idForSymbol,
    voicedChord: voicedChord
  };
})(typeof window !== 'undefined' ? window : globalThis);
