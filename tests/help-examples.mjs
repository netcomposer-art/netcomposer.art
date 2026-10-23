// Every copy-paste example on /create/help/ must parse with create/language.js.
// A clean parse may still carry a tempo, length, or "left for the AI" note.
// It must not carry an error: an unknown chord, a bad repeat, a broken quote.
import { readFileSync } from 'fs';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (c, m) => { if (!c) problems.push(m); };

const chords = JSON.parse(readFileSync(join(root, 'create/chords.json'), 'utf8'));
const QUALS = {};
Object.keys(chords.chords).forEach((k) => { QUALS[k.replace(/^[A-G](#|b)?/, '')] = 1; });
const known = (q) => q in QUALS;
const sb = {}; sb.globalThis = sb; sb.Map = Map; sb.Set = Set; vm.createContext(sb);
vm.runInContext(readFileSync(join(root, 'create/chord-library.js'), 'utf8'), sb);
vm.runInContext(readFileSync(join(root, 'create/language.js'), 'utf8'), sb);
const L = sb.NCLanguage;

const html = readFileSync(join(root, 'create/help/index.html'), 'utf8');
const visible = html.replace(/<section\b[^>]*\bhidden\b[^>]*>[\s\S]*?<\/section>/g, '');
const blocks = [...visible.matchAll(/<pre class="ex">([\s\S]*?)<\/pre>\s*<p class="hear">([\s\S]*?)<\/p>/g)];
const pres = [...visible.matchAll(/<pre class="ex">/g)];
check(pres.length === blocks.length && blocks.length > 20, 'every example needs one hear line, got ' + blocks.length + ' of ' + pres.length);

const ERROR = /is not a chord|is a pitch, not a chord|is a word, not|A repeat needs|Nested groups|Each chord before|The beats before|quote was not closed|inside quotes|was written twice|Another seed|Hacks are for the whole piece|not in the synth library|Another tempo|later tempo is not read/;
blocks.forEach((m, i) => {
  const text = m[1].replace(/\s+$/g, '').replace(/^\n/, '');
  const hear = m[2].replace(/\s+/g, ' ').trim();
  check(hear.length > 0 && !/[\r\n]/.test(m[2].trim()), 'hear line ' + (i + 1) + ' is not one line');
  let parsed;
  try { parsed = L.parse(text, { known }); }
  catch (e) { problems.push('example threw: ' + JSON.stringify(text) + ' ' + e.message); return; }
  const bad = (parsed.notes || []).filter((n) => ERROR.test(n));
  check(bad.length === 0, 'example did not parse cleanly: ' + JSON.stringify(text) + ' ' + JSON.stringify(bad));
  if (parsed.words.length) check(/\b(AI|words)\b/i.test(hear), 'example left words the hear line does not mention: ' + JSON.stringify(text));
  (parsed.notes || []).forEach((n) => check(/`[^`]+`/.test(n), 'note missing code: ' + n));
});

const style = /<section id="style"[\s\S]*?<\/section>/.exec(html);
check(style && /\bhidden\b/.test(style[0].slice(0, 40)) && !/<pre class="ex">/.test(style[0]), 'style stays a hidden placeholder with no example');
['first', 'chords', 'durations', 'tempo', 'time', 'groups', 'notes', 'fm', 'arp', 'words', 'instrument', 'hacks', 'iread', 'play', 'also', 'style'].forEach((id) => {
  check(html.indexOf('id="' + id + '"') >= 0, 'missing section ' + id);
});
const create = readFileSync(join(root, 'create/index.html'), 'utf8');
check(/aria-label="How to write a composition"/.test(create) && /href="\/create\/help\/"/.test(create), 'the Composition field links to the help page');
const app = readFileSync(join(root, 'create/app.js'), 'utf8');
['#tempo', '#durations', '#chords', '#groups', '#notes', '#words', '#hacks', '#arp', '#also'].forEach((hash) => {
  check(app.indexOf("'/create/help/#' + anchor") >= 0 && html.indexOf('id="' + hash.slice(1) + '"') >= 0, 'help anchor ' + hash);
});

if (problems.length) {
  console.error(problems.slice(0, 40).join('\n'));
  process.exit(1);
}
console.log('help examples ok (' + blocks.length + ')');
