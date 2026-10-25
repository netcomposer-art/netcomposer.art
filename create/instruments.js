/* Sampler names for /create/.
 *
 * events.js and sampler.js both read this list. @piano, @guitar, @cello,
 * @bass, @vibes, and @strings play the sampler on a notes track or an arp
 * track. On Play they also play a chord's voicing. Keep and Perform keep
 * @piano, @guitar, and @cello chord tracks as the recordings Gather fetches.
 * @bass, @vibes, and @strings play a chord track in both, and Gather skips
 * that track. Bass is B1–A#4. Vibes are C2–G#6. Strings are G3–C#7. Play
 * with no name stays the built-in synth.
 */
(function (root) {
  'use strict';
  var ROWS = [
    {slug: 'guitar', name: 'Guitar', spread: 0.018, names: ['guitar']},
    {slug: 'cello-pizzicato', name: 'Cello pizzicato', spread: 0.015, names: ['cello', 'cello-pizzicato']},
    {slug: 'piano', name: 'Piano', spread: 0.008, names: ['piano']},
    {slug: 'bass', name: 'Bass', spread: 0.012, names: ['bass'], chords: true},
    {slug: 'vibes', name: 'Vibes', spread: 0.006, names: ['vibes'], chords: true},
    {slug: 'strings', name: 'Strings', spread: 0.010, names: ['strings'], chords: true}
  ];

  function row(name) {
    var key = String(name || '').toLowerCase();
    for (var i = 0; i < ROWS.length; i++) {
      if (ROWS[i].names.indexOf(key) >= 0) return ROWS[i];
    }
    return null;
  }
  function slug(name) {
    var found = row(name);
    return found ? found.slug : '';
  }
  function playsChords(name) {
    var found = row(name);
    return !!(found && found.chords);
  }

  root.NCInstruments = {rows: ROWS, row: row, slug: slug, playsChords: playsChords};
})(typeof globalThis !== 'undefined' ? globalThis : this);
