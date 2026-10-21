// Loads the shared hack worklet into a live or offline context.
(function () {
  'use strict';
  var blobUrl = null;
  var lastCpu = null;
  var processorUrl = new URL('processor.js', document.currentScript.src);

  function moduleUrl() {
    if (blobUrl) return Promise.resolve(blobUrl);
    var lib = window.NCHacksLib;
    if (!lib) return Promise.reject(new Error('hacks missing'));
    return fetch(processorUrl).then(function (r) {
      if (!r.ok) throw new Error('processor');
      return r.text();
    }).then(function (text) {
      var pins = 'var FS=29761,PI=3.141592653589793,HALFPI=1.5707963267948966,TWOPI=6.283185307179586,Q=0.7071067811865476,CEILING=0.8912509381337456,MASTER=0.8,BW=0.9995;\n';
      var src = pins + lib.fns.map(function (fn) { return fn.toString(); }).join('\n') + '\n' + text;
      blobUrl = URL.createObjectURL(new Blob([src], { type: 'application/javascript' }));
      return blobUrl;
    });
  }
  function attach(ctx, options) {
    if (!ctx.audioWorklet || !window.AudioWorkletNode) return Promise.reject(new Error('no worklet'));
    return moduleUrl().then(function (url) {
      return ctx.audioWorklet.addModule(url);
    }).then(function () {
      var node = new AudioWorkletNode(ctx, 'nc-hack-stack', {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
        channelCount: 2,
        channelCountMode: 'explicit',
        channelInterpretation: 'speakers',
        processorOptions: options || {}
      });
      var seq = 0;
      var wait = {};
      var tail = Promise.resolve();
      var onCpu = null;
      node.port.onmessage = function (e) {
        var d = e.data || {};
        if (d.ready) { try { window.__hackReady = d; } catch (err) {} }
        if (d.cpu) {
          lastCpu = d.cpu;
          try { window.__hackCpu = d.cpu; } catch (err) {}
          if (onCpu) onCpu(d.cpu);
        }
        if (d.ack && wait[d.ack]) { wait[d.ack](d); delete wait[d.ack]; }
      };
      function post(msg) {
        var id = ++seq;
        msg.ack = id;
        return new Promise(function (ok) {
          wait[id] = ok;
          node.port.postMessage(msg);
        });
      }
      function send(msg) {
        var run = tail.then(function () { return post(msg); });
        tail = run.then(function () {}, function () {});
        return run;
      }
      return {
        node: node,
        send: send,
        cpu: function () { return lastCpu; },
        set onCpu(fn) { onCpu = fn; }
      };
    });
  }
  window.NCHacks = {
    Q: window.NCHacksLib ? window.NCHacksLib.Q : 0.7071067811865476,
    CEILING: window.NCHacksLib ? window.NCHacksLib.CEILING : 0.8912509381337456,
    MAX: 10,
    cutoffHz: function (v) { return v <= 0 ? null : (window.NCHacksLib ? window.NCHacksLib.cutoffHz(v) : null); },
    attach: attach,
    cpu: function () { return lastCpu; }
  };
})();
