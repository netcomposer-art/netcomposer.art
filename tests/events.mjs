// Event tracks: the note list is the track, Play schedules it, Keep renders it.
import { readFileSync } from 'fs';
import vm from 'node:vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };
const chords = JSON.parse(readFileSync(join(root, 'create/chords.json'), 'utf8'));
const QUALS = {};
Object.keys(chords.chords).forEach((k) => { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });

function load(file, box) {
  vm.runInContext(readFileSync(join(root, file), 'utf8'), box);
}
const sb = {
  OfflineAudioContext: function () { throw new Error('no offline in this check'); }
};
sb.globalThis = sb;
sb.window = sb;
sb.Map = Map;
sb.Set = Set;
sb.Math = Math;
sb.JSON = JSON;
sb.Object = Object;
sb.Array = Array;
sb.Number = Number;
sb.String = String;
sb.Promise = Promise;
sb.Error = Error;
vm.createContext(sb);
load('create/chord-library.js', sb);
load('create/language.js', sb);
load('create/nc-synth.js', sb);
load('create/events.js', sb);
const L = sb.NCLanguage;
const E = sb.NCEvents;
const known = (q) => q in QUALS;
function docOf(text) {
  return E.build(L.parse(text, { known }));
}

const same = docOf('t1: Cm(4|) t2: Em(4|)');
check(same.tracks.length === 2 && same.tracks[0].voice === 'audio' && same.tracks[1].voice === 'audio', 'two chord tracks are audio, got ' + JSON.stringify(same.tracks.map((t) => t.voice)));
check(same.tracks[0].label === 'T1' && same.tracks[1].channel === 1, 'channels follow written order, got ' + same.tracks.map((t) => t.channel + t.label).join(' '));
check(same.tracks[0].events[0].type === 'clip' && same.tracks[0].events[0].symbol === 'Cm' && same.tracks[0].events[0].midi == null, 'a recording is a clip event, got ' + JSON.stringify(same.tracks[0].events[0]));

const synth = docOf('t1: Cm(4|) Fm(4|) @synth\nt2: notes C5(4|) G5(4|) fm 2');
check(synth.tracks.length === 2 && synth.tracks.every((t) => t.voice === 'synth'), 'synth-only tracks are synth voices, got ' + JSON.stringify(synth.tracks.map((t) => t.voice)));
const t1 = synth.tracks[0], t2 = synth.tracks[1];
check(t1.events.length >= 3 && t1.events.every((e) => e.type === 'note' && e.midi >= 0 && e.velocity > 0 && e.length > 0), 'T1 expanded to chord notes, got ' + t1.events.length);
check(t1.events[0].start === 0 && t1.events.some((e) => e.start > 1), 'T1 chords are two groups');
check(t1.params.fmDepth === 0 && t2.params.fmDepth === 2 && t2.events[0].fmDepth === 2, 'FM depth is on the voice and the note, got ' + JSON.stringify({ a: t1.params.fmDepth, b: t2.params.fmDepth, n: t2.events[0].fmDepth }));
check(t2.events.length === 2 && t2.events[0].pitch === 'C5' && t2.events[1].pitch === 'G5', 'T2 is two notes, got ' + t2.events.map((e) => e.pitch).join(' '));
check(t2.events[0].beat === 0 && Math.abs(t2.events[0].beats - 16) < 1e-6, 'a note carries quarters, got ' + JSON.stringify(t2.events[0]));
check(t1.seed !== t2.seed, 'each voice has its own seed');
const again = docOf('t1: Cm(4|) Fm(4|) @synth\nt2: notes C5(4|) G5(4|) fm 2');
check(JSON.stringify(again.tracks.map((t) => t.events)) === JSON.stringify(synth.tracks.map((t) => t.events)), 'the same writing builds the same events');

const arp = docOf('t1: Cm(4|) Fm(4|)\nt2: arp random 8ths');
const arp2 = docOf('t1: Cm(4|) Fm(4|)\nt2: arp random 8ths');
check(arp.tracks[1].voice === 'synth' && arp.tracks[1].region && arp.tracks[1].events.length > 4, 'an arp track expands to notes, got ' + (arp.tracks[1] && arp.tracks[1].events.length));
check(arp.tracks[1].events.map((e) => e.midi).join() === arp2.tracks[1].events.map((e) => e.midi).join(), 'the same seed expands the arp the same way');

const plain = docOf('Cm(4|) Fm(4|)');
check(plain.tracks.length === 1 && plain.tracks[0].id === 'chords' && plain.tracks[0].voice === 'audio', 'an unlabelled chord line stays one audio track, got ' + JSON.stringify(plain.tracks));

sb.NCArrange = {
  clip: function (id, i) {
    if (id === 't2' && i === 0) return { at: 1.25, len: 0.5 };
    return null;
  }
};
const moved = E.follow(docOf('t1: Cm(4|) @synth\nt2: notes C5(4|) G5(4|)'));
const n0 = moved.tracks[1].events[0];
check(n0.start === 1.25 && n0.length === 0.5 && n0.written === 0, 'an arrangement drag updates the event and keeps the written time, got ' + JSON.stringify(n0));
check(moved.tracks[1].events[1].start === moved.tracks[1].events[1].written, 'a bar that was not dragged keeps its written start');

sb.NCSampler = {
  active: function () { return true; },
  slug: function () { return 'piano'; },
  manifest: function () { return { notes: { 64: {} }, slug: 'piano', instrument: 'Piano' }; },
  plan: function (man, events) {
    var notes = [];
    (events || []).forEach(function (ev) {
      (ev.written || []).forEach(function (midi) {
        if (man.notes[midi]) notes.push({ midi: midi, start: ev.start, keep: ev.hold + 0.12, gain: 1, fade: 0.12, index: ev.index, origin: ev.origin });
      });
    });
    return { notes: notes, messages: [] };
  },
  selectWritten: function (written, available) {
    var play = [], missing = [];
    (written || []).forEach(function (m) { (available[m] ? play : missing).push(m); });
    return { play: play, missing: missing };
  },
  noteName: function (m) { return 'm' + m; }
};
const withSampler = docOf('t1: Cm(2|) Fm(2|)\nt2: notes E4(2) @synth\nt3: notes C4(2)');
check(withSampler.tracks.map((t) => t.id + ':' + t.voice).join(' ') === 't1:audio t2:synth t3:sampler', '@synth stays a synth voice while the sampler plays the other notes track, got ' + withSampler.tracks.map((t) => t.id + ':' + t.voice).join(' '));
check(withSampler.tracks[2].events.length === 0 || withSampler.tracks[2].skipped.length || withSampler.tracks[2].events[0].midi, 'the sampler track is event data');
const named = docOf('t1: notes C5(4|) @guitar');
check(named.tracks[0] && named.tracks[0].voice === 'sampler' && named.tracks[0].instrument === 'guitar', '@guitar is a sampler track, got ' + JSON.stringify(named.tracks[0] && { voice: named.tracks[0].voice, instrument: named.tracks[0].instrument }));

function playOf(text) {
  return E.build(L.parse(text, { known }), { play: true });
}
const plainPlay = playOf('Cm11');
check(plainPlay.tracks.length === 1 && plainPlay.tracks[0].id === 'chords' && plainPlay.tracks[0].voice === 'synth' && plainPlay.tracks[0].events.length >= 3 && plainPlay.tracks[0].events.every((e) => e.type === 'note' && e.midi >= 0), 'Play sounds a plain chord on the synth, got ' + JSON.stringify(plainPlay.tracks.map((t) => t.voice)));
const pianoPlay = playOf('Cm11 @piano');
check(pianoPlay.tracks.length === 1 && pianoPlay.tracks[0].voice === 'sampler' && pianoPlay.tracks[0].instrument === 'piano', 'Play sounds Cm11 @piano on the piano sampler, got ' + JSON.stringify(pianoPlay.tracks[0] && { voice: pianoPlay.tracks[0].voice, instrument: pianoPlay.tracks[0].instrument, n: pianoPlay.tracks[0].events.length }));
const flutePlay = playOf('t1: notes C4(4|) @flute');
check(flutePlay.tracks.length === 1 && flutePlay.tracks[0].voice === 'synth' && flutePlay.tracks[0].events[0] && flutePlay.tracks[0].events[0].pitch === 'C4', '@flute labels the line and Play uses the synth, got ' + JSON.stringify(flutePlay.tracks[0] && { voice: flutePlay.tracks[0].voice, pitch: flutePlay.tracks[0].events[0] && flutePlay.tracks[0].events[0].pitch }));
const duo = playOf('t1: Cm11(4)\nt2: notes G3(4) @cello');
check(duo.tracks.length === 2 && duo.tracks[0].voice === 'synth' && duo.tracks[1].voice === 'sampler' && duo.tracks[1].instrument === 'cello-pizzicato', 'a synth chord track and a cello notes track, got ' + duo.tracks.map((t) => t.voice + ':' + t.instrument).join(' '));
check(docOf('Cm11').tracks[0].voice === 'audio', 'Keep still treats a plain chord as a recording');
check(docOf('t1: notes C4(4|) @flute').tracks.length === 0, 'Keep still leaves a labelling name off the synth');

const keys = ['v', 'bpm', 'meter', 'beat', 'tracks'];
check(keys.every((k) => k in synth) && synth.tracks[0].events[0].velocity <= 1, 'the document is the portable shape');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('events ok');
