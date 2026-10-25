// One AudioWorklet for the whole hack stack. DSP functions are prepended by engine.js.
function ncNow() {
  if (typeof performance !== 'undefined' && performance.now) return performance.now();
  try {
    if (typeof Temporal !== 'undefined' && Temporal.Now) return Number(Temporal.Now.instant().epochNanoseconds / 1000n) / 1000;
  } catch (err) {}
  return 0;
}
class NCHackProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.chain = ncChainCreate(sampleRate);
    this.tracks = [];
    var t;
    for (t = 0; t < 8; t++) this.tracks.push(ncChainCreate(sampleRate));
    var opt = options && options.processorOptions;
    this.piece = opt && +opt.piece > 0 ? +opt.piece : 0;
    if (opt && opt.widgets) ncChainSet(this.chain, opt.widgets, opt.immediate !== false);
    this.warm = 8;
    this.cpuN = 0;
    this.cpuSum = 0;
    this.cpuMax = 0;
    this.clock = ncNow() > 0;
    // Limiter gain for the scope: off until the page asks, then the lowest gain every 8 blocks.
    this.grOn = false;
    this.grMin = 1;
    this.grN = 0;
    var self = this;
    this.port.onmessage = function (e) { self.onMsg(e.data || {}); };
    this.port.postMessage({ ready: 1, sr: sampleRate, clock: this.clock });
  }
  onMsg(msg) {
    if (msg.op === 'clock') {
      var pos = +msg.pos;
      var step = +msg.step;
      if (!(pos > 0)) pos = 0;
      if (pos > 1) pos = 1;
      if (!(step > 0) || step !== step) step = 0;
      this.chain.pos = pos;
      this.chain.step = step;
      var ti;
      for (ti = 0; ti < this.tracks.length; ti++) {
        this.tracks[ti].pos = pos;
        this.tracks[ti].step = step;
      }
      if (msg.ack) this.port.postMessage({ ack: msg.ack });
      return;
    }
    var slot = ncTrackSlot(msg.track);
    if (slot === -2) {
      if (msg.ack) this.port.postMessage({ ack: msg.ack });
      return;
    }
    var chain = slot >= 0 ? this.tracks[slot] : this.chain;
    if (msg.op === 'chain') ncChainSet(chain, msg.widgets, !!msg.hold);
    else if (msg.op === 'add') ncChainAdd(chain, msg.widget);
    else if (msg.op === 'order') ncChainOrder(chain, msg.ids || [], !!msg.immediate);
    else if (msg.op === 'patch') ncChainPatch(chain, msg.id, msg.params, msg.bypass, !!msg.immediate, msg.auto);
    else if (msg.op === 'clear') ncChainClear(chain);
    else if (msg.op === 'scope') { this.grOn = !!msg.on; this.grMin = 1; this.grN = 0; }
    if (msg.ack) this.port.postMessage({ ack: msg.ack });
  }
  process(inputs, outputs) {
    var t0 = ncNow();
    var output = outputs[0] || [];
    var outL = output[0];
    var outR = output[1] || outL;
    if (!outL) return true;
    if (this.piece > 0) {
      var u = currentTime / this.piece;
      if (!(u > 0)) u = 0;
      if (u > 1) u = 1;
      var stepU = u >= 1 ? 0 : 1 / (this.piece * sampleRate);
      this.chain.pos = u;
      this.chain.step = stepU;
      var ti;
      for (ti = 0; ti < this.tracks.length; ti++) {
        this.tracks[ti].pos = u;
        this.tracks[ti].step = stepU;
      }
    }
    ncMixRender(this.tracks, this.chain, inputs, outL, outR);
    if (this.grOn) {
      var lim = this.chain.lim;
      if (lim.lo < this.grMin) this.grMin = lim.lo;
      lim.lo = 1;
      if (++this.grN >= 8) {
        this.port.postMessage({ gr: this.grMin });
        this.grMin = 1;
        this.grN = 0;
      }
    }
    if (!this.clock) return true;
    var dt = ncNow() - t0;
    if (this.warm > 0) { this.warm--; return true; }
    this.cpuSum += dt;
    if (dt > this.cpuMax) this.cpuMax = dt;
    this.cpuN++;
    if (this.cpuN >= 32) {
      var budget = (outL.length / sampleRate) * 1000;
      this.port.postMessage({
        cpu: {
          avg: this.cpuSum / this.cpuN,
          max: this.cpuMax,
          budget: budget,
          sr: sampleRate,
          n: this.cpuN,
          block: outL.length
        }
      });
      this.cpuSum = 0;
      this.cpuMax = 0;
      this.cpuN = 0;
    }
    return true;
  }
}
registerProcessor('nc-hack-stack', NCHackProcessor);
