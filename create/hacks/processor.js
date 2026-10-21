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
    var opt = options && options.processorOptions;
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
    var chain = this.chain;
    if (msg.op === 'chain') ncChainSet(chain, msg.widgets, !!msg.hold);
    else if (msg.op === 'add') ncChainAdd(chain, msg.widget);
    else if (msg.op === 'order') ncChainOrder(chain, msg.ids || [], !!msg.immediate);
    else if (msg.op === 'patch') ncChainPatch(chain, msg.id, msg.params, msg.bypass, !!msg.immediate);
    else if (msg.op === 'clear') ncChainClear(chain);
    else if (msg.op === 'scope') { this.grOn = !!msg.on; this.grMin = 1; this.grN = 0; }
    if (msg.ack) this.port.postMessage({ ack: msg.ack });
  }
  process(inputs, outputs) {
    var t0 = ncNow();
    var input = inputs[0] || [];
    var output = outputs[0] || [];
    var inL = input[0] || null;
    var inR = input[1] || inL;
    var outL = output[0];
    var outR = output[1] || outL;
    if (!outL) return true;
    ncRender(this.chain, inL, inR, outL, outR);
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
