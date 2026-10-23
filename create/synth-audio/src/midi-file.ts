/** Local Standard MIDI File reader. No uploads, devices, or network required. */
export interface MidiNote { midi: number; velocity: number; channel: number; time: number; duration: number }
export interface MidiFile { name: string; notes: MidiNote[]; duration: number; tracks: number }
export const MAX_MIDI_BYTES = 5 * 1024 * 1024;
type Event = { tick: number; order: number; type: 'on' | 'off' | 'pedal' | 'allOff' | 'tempo'; channel: number; a: number; b: number };

export function parseMidiFile(buffer: ArrayBuffer, name = 'MIDI file'): MidiFile {
  if (buffer.byteLength > MAX_MIDI_BYTES) throw new Error('MIDI files must be 5 MB or smaller.');
  const bytes = new Uint8Array(buffer), view = new DataView(buffer);
  let p = 0, limit = bytes.length, order = 0, eventCount = 0;
  const need = (count: number) => {
    if (p + count > limit) throw new Error('Invalid MIDI file: truncated data.');
  };
  const u8 = () => { need(1); return bytes[p++]; };
  const u16 = () => { need(2); const value = view.getUint16(p); p += 2; return value; };
  const u32 = () => { need(4); const value = view.getUint32(p); p += 4; return value; };
  const tag = () => String.fromCharCode(u8(), u8(), u8(), u8());
  const variable = () => {
    let value = 0;
    for (let i = 0; i < 4; i++) {
      const b = u8(); value = value * 128 + (b & 127);
      if (!(b & 128)) return value;
    }
    throw new Error('Invalid MIDI file: oversized event length.');
  };
  if (tag() !== 'MThd') throw new Error('Choose a Standard MIDI file (.mid or .midi).');
  const headerSize = u32();
  if (headerSize < 6) throw new Error('Invalid MIDI header.');
  need(headerSize);
  const headerEnd = p + headerSize, format = u16(), tracks = u16(), division = u16();
  if (format > 1) throw new Error('MIDI format 2 is not supported. Export as format 0 or 1.');
  if (!tracks || tracks > 256 || (format === 0 && tracks !== 1)) throw new Error('Invalid MIDI track count.');
  if (!division || division & 0x8000) throw new Error('SMPTE MIDI timing is not supported. Export with beat-based (PPQ) timing.');
  p = headerEnd;
  const events: Event[] = [];
  let lastTick = 0, foundTracks = 0;
  while (foundTracks < tracks) {
    limit = bytes.length;
    const type = tag(), length = u32();
    need(length);
    const end = p + length;
    if (type !== 'MTrk') { p = end; continue; }
    foundTracks++;
    limit = end;
    let tick = 0, running = 0;
    while (p < end) {
      if (++eventCount > 250000) throw new Error('This MIDI file has too many events (maximum 250,000).');
      tick += variable();
      lastTick = Math.max(lastTick, tick);
      let status = u8();
      if (status < 128) {
        if (!running) throw new Error('Invalid MIDI running status.');
        p--; status = running;
      }
      if (status === 0xff) {
        running = 0;
        const meta = u8(), size = variable();
        need(size);
        if (meta === 0x51) {
          if (size !== 3) throw new Error('Invalid MIDI tempo event.');
          const tempo = bytes[p] * 65536 + bytes[p + 1] * 256 + bytes[p + 2];
          if (!tempo) throw new Error('Invalid MIDI tempo.');
          events.push({ tick, order: order++, type: 'tempo', channel: 0, a: tempo, b: 0 });
        }
        p += size;
        if (meta === 0x2f) { p = end; break; }
        continue;
      }
      if (status === 0xf0 || status === 0xf7) {
        running = 0;
        const size = variable(); need(size); p += size; continue;
      }
      if (status >= 0xf0) throw new Error('Unsupported system event in MIDI file.');
      running = status;
      const command = status >> 4, channel = status & 15;
      const a = u8(), b = command === 0xc || command === 0xd ? 0 : u8();
      if (a > 127 || b > 127) throw new Error('Invalid MIDI event data.');
      let eventType: Event['type'] | undefined;
      if (command === 9) eventType = b ? 'on' : 'off';
      if (command === 8) eventType = 'off';
      if (command === 0xb && a === 64) eventType = 'pedal';
      if (command === 0xb && (a === 120 || a === 123)) eventType = 'allOff';
      if (eventType) events.push({ tick, order: order++, type: eventType, channel, a, b });
    }
    p = end;
  }
  events.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const notes: MidiNote[] = [], held = new Map<number, MidiNote[]>(), sustained: MidiNote[][] = Array.from({ length: 16 }, () => []);
  const pedal = new Array<boolean>(16).fill(false);
  let previousTick = 0, seconds = 0, tempo = 500000;
  const finish = (note: MidiNote, time: number) => { note.duration = Math.max(.01, time - note.time); };
  for (const event of events) {
    seconds += (event.tick - previousTick) * tempo / (division * 1000000);
    previousTick = event.tick;
    if (seconds > 14400) throw new Error('MIDI files longer than four hours are not supported.');
    if (event.type === 'tempo') { tempo = event.a; continue; }
    const key = event.channel * 128 + event.a;
    if (event.type === 'on') {
      if (notes.length >= 50000) throw new Error('This MIDI file has too many notes (maximum 50,000).');
      const note = { midi: event.a, channel: event.channel, velocity: event.b / 127, time: seconds, duration: 0 };
      notes.push(note);
      const queue = held.get(key) ?? [];
      queue.push(note); held.set(key, queue);
    } else if (event.type === 'off') {
      const queue = held.get(key), note = queue?.shift();
      if (queue && !queue.length) held.delete(key);
      if (note) {
        if (pedal[event.channel]) sustained[event.channel].push(note);
        else finish(note, seconds);
      }
    } else if (event.type === 'pedal') {
      pedal[event.channel] = event.b >= 64;
      if (!pedal[event.channel]) {
        for (const note of sustained[event.channel]) finish(note, seconds);
        sustained[event.channel] = [];
      }
    } else {
      for (const [id, queue] of held) if (Math.floor(id / 128) === event.channel) {
        for (const note of queue) finish(note, seconds);
        held.delete(id);
      }
      for (const note of sustained[event.channel]) finish(note, seconds);
      sustained[event.channel] = [];
      pedal[event.channel] = false;
    }
  }
  seconds += (lastTick - previousTick) * tempo / (division * 1000000);
  if (seconds > 14400) throw new Error('MIDI files longer than four hours are not supported.');
  if (!notes.length) throw new Error('This MIDI file contains no playable notes.');
  for (const queue of held.values()) for (const note of queue) finish(note, seconds);
  for (const queue of sustained) for (const note of queue) finish(note, seconds);
  const duration = notes.reduce((end, note) => Math.max(end, note.time + note.duration), Math.max(.02, seconds));
  return { name, notes, duration, tracks };
}
