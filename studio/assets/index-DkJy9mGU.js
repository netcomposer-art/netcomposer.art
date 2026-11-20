(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const fn=1e-9;function cm(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class cs{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return cm(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+fn&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+fn)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+fn){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-fn;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new cs({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+fn)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+fn)return n[a];return n[0]}}const dm=Object.freeze({beatsPerBar:4,beatUnit:4}),En=1e-9;function um(e){return Math.floor(e+En)}function cu(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-En)*t;return n&&r<=e+En?r+t:r}class pm{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new cs({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??dm}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-En&&(this.stopTime===null||t<this.stopTime-En)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-En?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=um(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return cu(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const du="nc-clock/snapshot",uu=1;function fm(e,t="local"){return{format:du,version:uu,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function hm(e,t){const n=mm(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const wt=e=>typeof e=="number"&&Number.isFinite(e),Fl=e=>e===null||wt(e);function mm(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==du&&n("format"),(!wt(t.version)||Math.floor(t.version)!==uu)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!wt(t.anchor.beat)||!wt(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&wt(a.beat)&&wt(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!wt(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!wt(t.meter.beatUnit))&&n("meter"),(!Fl(t.startTime)||!Fl(t.stopTime)||!wt(t.stoppedBeat))&&n("transport times"),t}class gm{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new pm(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){hm(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return fm(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const bm="nc-sync/1",ym=1,vm="nc-sync",wm="nc-sync-leader",xm=0,pu=.5,fu=.75;function km(e){return typeof e=="number"&&Number.isFinite(e)&&e>=pu&&e<=fu?e:null}const Ao=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Jn=e=>typeof e=="number"&&Number.isFinite(e),Ga=e=>typeof e=="string"&&e.length>0;function $m(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==ym||!Ga(t.type)||!Ga(t.from)||!Jn(t.term)||!Jn(t.seq)||!Jn(t.sentAt))return null;switch(t.type){case"hello":return Ga(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Jn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Jn(t.slot)?t:null;case"ping":case"pong":return Ga(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Em(e,t,n,a,r){return{proto:bm,from:t,term:n,seq:a,sentAt:r,...e}}function ze(){return(performance.timeOrigin+performance.now())/1e3}const So=.003,Am=3,Mo=.002+1e-6,Sm=.01,Pl=500;class Mm{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Sm:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=So&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<c.length;h++)p.push(c[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=So&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Pl)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=So)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Pl)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Am,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=Mo&&d++;d>o&&(r=l,o=d)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Mo&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Mo}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const Tm="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function Lm(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function hu(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,o=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&Lm())try{o=URL.createObjectURL(new Blob([Tm],{type:"text/javascript"})),r=new Worker(o),r.onmessage=u}catch{r=null,o&&URL.revokeObjectURL(o),o=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,o&&URL.revokeObjectURL(o),o=null}}}class Cm{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Ao,...t.capabilities},this.channelOption=t.channel??vm,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??cu(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(fu,Math.max(pu,t)):xm;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=km(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=$m(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ao,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ao},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(wm,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Em(t,this.id,this.term,++this.seq,this.o.now()))}}const Nm="modulepreload",Im=function(e){return"/studio/"+e},Rl={},Fm=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=Im(u),u in Rl)return;Rl[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Nm,c||(h.as="script"),h.crossOrigin="",h.href=u,d&&h.setAttribute("nonce",d),document.head.appendChild(h),c)return new Promise((b,m)=>{h.addEventListener("load",b),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Pm=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],fi=[.25,.5,.75,1,1.5,2],Rm=4.9,le={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0}},ot={fmt:"wet"},ve={fmt:"pct"},hn={fmt:"db"},Ka={fmt:"signedPct"},Qn={fmt:"num",suffix:" ms"},te={div:100};function z(e,t,n,a,r,o,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function Tt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var ca=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[z("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:le.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[z("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:le.hpHz,astrid:!0,zero:"off"}),z("q","Resonance",0,100,0,2,{fmt:"q",law:le.hpQ},{dsp:{law:le.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[z("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:le.bpHz,astrid:!0},{dsp:{law:le.bpHz}}),z("q","Q",0,100,0,2,{fmt:"q",law:le.bpQ},{dsp:{law:le.bpQ}}),z("mix","Mix",0,100,100,3,ot,{dsp:te,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[z("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Tt(Pm),overriddenBy:"beats_free",tempoSynced:!0}),z("feedback","Feedback",0,90,35,2,ve,{dsp:te,unit:"%"}),z("mix","Wet/dry",0,100,0,3,ot,{dsp:te,unit:"%",astridKey:"wet"}),z("tone","Tone",0,100,100,4,{fmt:"hz",law:le.delayTone,offAt:100},{dsp:{div:99},more:!0}),z("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),z("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Tt([[0,"Insert"],[1,"Send"]]),more:!0}),z("send","Send",0,100,100,7,ve,{dsp:te,unit:"%",more:!0}),z("mod_send","Accent → send",-100,100,0,8,Ka,{dsp:te,unit:"%",more:!0}),z("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[z("predelay","Pre-delay",0,200,0,1,Qn,{dsp:{div:1e3},unit:"ms"}),z("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:te,unit:"%"}),z("decay","Decay",0,100,50,3,ve,{dsp:te,unit:"%"}),z("damping","Damping",0,100,0,4,ve,{dsp:te,unit:"%"}),z("mix","Mix",0,100,0,5,ot,{dsp:te,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[z("size","Size",0,100,60,1,ve,{dsp:te,unit:"%"}),z("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),z("predelay","Pre-delay",0,250,20,3,Qn,{dsp:{div:1e3},unit:"ms"}),z("tone","Tone",0,100,60,4,{fmt:"hz",law:le.hallTone,astrid:!0},{dsp:{law:le.hallTone}}),z("mix","Mix",0,100,25,5,ot,{dsp:te,unit:"%"}),z("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),z("width","Width",0,100,100,7,ve,{dsp:te,unit:"%",more:!0}),z("motion","Motion",0,100,30,8,ve,{dsp:te,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[z("rate","Rate",0,100,35,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),z("depth","Depth",0,100,60,2,ve,{dsp:te,unit:"%"}),z("width","Width",0,100,80,3,ve,{dsp:te,unit:"%"}),z("mix","Mix",0,100,50,4,ot,{dsp:te,unit:"%"}),z("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:Tt([[3,"3"],[6,"6"]]),more:!0}),z("vibrato","Vibrato",0,100,20,6,ve,{dsp:te,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[z("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:Tt([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),z("swing","Swing",0,100,0,3,ve,{dsp:te,unit:"%"}),z("depth","Depth",0,100,90,4,ve,{dsp:te,unit:"%"}),z("mix","Mix",0,100,100,5,ot,{dsp:te,unit:"%"}),z("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:Tt([[8,"8"],[16,"16"]]),more:!0}),z("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Tt([[0,"Volume"],[1,"Filter"]]),more:!0}),z("smooth","Smooth",1,20,4,7,Qn,{unit:"ms",more:!0}),z("spread","Spread",0,100,0,8,ve,{dsp:te,unit:"%",more:!0}),z("res","Resonance",0,100,20,9,ve,{dsp:te,unit:"%",more:!0})]},{type:"flanger",label:"Flanger",dials:[z("rate","Rate",0,100,26,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),z("depth","Depth",0,100,70,2,ve,{dsp:te,unit:"%"}),z("feedback","Feedback",-90,90,50,3,Ka,{dsp:te,unit:"%"}),z("mix","Mix",0,100,50,4,ot,{dsp:te,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[z("rate","Rate",0,100,52,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),z("depth","Depth",0,100,50,2,ve,{dsp:te,unit:"%"}),z("spread","Spread",0,100,70,3,ve,{dsp:te,unit:"%"}),z("mix","Mix",0,100,40,4,ot,{dsp:te,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[z("rate","Rate",0,100,39,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),z("depth","Depth",0,100,70,2,ve,{dsp:te,unit:"%"}),z("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Tt([[4,"4"],[6,"6"],[8,"8"]])}),z("feedback","Feedback",0,90,30,4,ve,{dsp:te,unit:"%"}),z("mix","Mix",0,100,50,5,ot,{dsp:te,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[z("low_db","Low",-18,18,0,1,hn,{unit:"dB"}),z("mid_db","Mid",-18,18,0,2,hn,{unit:"dB"}),z("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:le.midHz,astrid:!0},{dsp:{law:le.midHz}}),z("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:le.eqQ},{dsp:{law:le.eqQ}}),z("high_db","High",-18,18,0,4,hn,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[z("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),z("output_db","Output",-12,12,0,2,hn,{unit:"dB"}),z("mix","Mix",0,100,100,3,ot,{dsp:te,unit:"%"}),z("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Tt([[0,"Smooth"],[1,"Acid"]]),more:!0}),z("tone","Tone",0,100,100,5,{fmt:"hz",law:le.driveTone,offAt:100},{dsp:{div:99},more:!0}),z("mod_drive","Accent → drive",-100,100,0,6,Ka,{dsp:te,unit:"%",more:!0}),z("mod_tone","Accent → tone",-100,100,0,7,Ka,{dsp:te,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[z("threshold_db","Threshold",-60,0,0,1,hn,{unit:"dB"}),z("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:le.ratio},{dsp:{law:le.ratio}}),z("attack_ms","Attack",1,100,10,3,Qn,{unit:"ms"}),z("release_ms","Release",10,1e3,150,4,Qn,{unit:"ms"}),z("makeup_db","Makeup",0,24,0,5,hn,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[z("width","Width",0,200,100,1,ve,{dsp:te,unit:"%"}),z("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:te})]}],Dm=ca.map(function(e){return e.type}),Om=ca.filter(function(e){return!e.hidden}).map(function(e){return e.type}),zm={reverb:"plate"},Fn={},mu=[],da=[];function Bm(e){Fn[e.type]||mu.push(e.type),Fn[e.type]=e;for(var t=0;t<da.length;t++)try{da[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function _m(){return mu.map(function(e){return Fn[e]})}function jm(e){return da.push(e),function(){var t=da.indexOf(e);t>=0&&da.splice(t,1)}}function gu(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function ds(e){var t=zm[e]||e;return Dm.indexOf(t)>=0||typeof t=="string"&&Fn[t]?t:null}function pe(e){for(var t=ds(e),n=0;n<ca.length;n++)if(ca[n].type===t)return ca[n];return t&&Fn[t]?Fn[t]:null}function qm(e,t){var n=pe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function xn(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function vr(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=xn(n.law,t);return a===null?0:a}function Dl(e,t){return Math.min(Rm,e*60/(t>0?t:120))}var Ol=function(e){return e>0?"+":e<0?"−":""};function Vm(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function bu(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Ol(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Ol(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=xn(a.law,t),r===null?a.zero||"open":a.astrid?Vm(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+xn(a.law,t).toFixed(1);case"ratio":return xn(a.law,t).toFixed(1)+":1";case"rate":return r=xn(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(Dl(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Dl(t,n)*1e3)+" ms"}return String(t)}var Hm=1,to=["drive","delay","plate"];function Um(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return bu(e,a,r)},t}var An=to.map(function(e){var t=pe(e),n={type:e,label:t.label,dials:t.dials.map(Um)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Gm={reverb:"plate"};function wr(e){var t=Gm[e]||e;return to.indexOf(t)>=0?t:null}function no(e){for(var t=wr(e),n=0;n<An.length;n++)if(An[n].type===t)return An[n];return null}function yu(e,t){var n=no(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Pn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Et(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Km(){return{v:Hm,chain:An.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Wm(e){return fi.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},fi[0])}function To(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ym(e){for(var t=Array.isArray(e)?e:To(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Km(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(To(l)){var d=wr(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var u=a.chain[to.indexOf(d)],c=To(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,no(d).dials.forEach(function(p){u.dials[p.key]=Et(p,c[p.key])}),Xm(d,u.dials,c)}}return{state:a,dropped:o}}function Xm(e,t,n){for(var a=no(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=Et(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],Pn(o,t)))}}function xr(e){return Ym(e).state}function Jm(e){return JSON.parse(JSON.stringify(e))}var Qm=24,hi={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function mi(e,t,n){if(t==="bypass")return n?0:1;var a=yu(e,t)||Zm(e,t);return a?vr(a,n):0}function Zm(e,t){var n=pe(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var eg={};An.forEach(function(e){e.dials.forEach(function(t){eg[e.type+"."+t.key]=t.format})});function Lo(e,t){var n=new Float64Array(Qm),a=xr(e);return a.chain.forEach(function(r){var o=hi[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=mi(r.type,s,r.dials[s])})}),n}var tg="__ncFxLoop",ng=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,zl=/[A-Za-z_$\u0080-\uffff]/,Co=/[A-Za-z0-9_$\u0080-\uffff]/;function ag(e){var t=[],n=0,a=e.length,r=[],o,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?ng.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function d(){for(var h=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,d();continue}if(o==="/"&&l()){n++;for(var c=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(c)o==="]"&&(c=!1);else if(o==="[")c=!0;else if(o==="/"){n++;break}n++}for(;n<a&&Co.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(zl.test(o)||o==="\\"){for(n++;n<a&&(Co.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&zl.test(e[n+1])){for(n+=2;n<a&&Co.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")r.push("{");else if(o==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function rg(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function og(e){for(var t=String(e),n=ag(t),a=[],r=tg+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=o+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=rg(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,h=d+1;h<u;h++){var b=n[h].t==="p"?n[h].v:"";b==="("||b==="["||b==="{"?p++:b===")"||b==="]"||b==="}"?p--:b===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(y,E){return y[0]-E[0]});for(var m="",v=0,f=0;f<a.length;f++)m+=t.slice(v,a[f][0])+a[f][1],v=a[f][0];return m+t.slice(v)}var No=1,Bl=15,vu=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,ig=/^[a-z][a-z0-9_]{0,31}$/,wu=/^\d+\.\d+\.\d+$/,xu=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,sg=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,_l=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],jl=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],kr={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function ua(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function mn(e){return typeof e=="number"&&isFinite(e)}function Jt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function ao(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!ua(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){_l.indexOf(l)<0&&a(l,"unknown field (allowed: "+_l.slice(1).join(", ")+")")}),n.ncPlugin!==No&&a("ncPlugin","must be "+No),(typeof n.id!="string"||!vu.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),Jt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!wu.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),Jt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!xu.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return Jt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!sg.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>Bl)a("params","at most "+Bl);else{var o={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!ua(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(h){jl.indexOf(h)<0&&a(u+"."+h,"unknown field (allowed: "+jl.join(", ")+")")}),typeof l.id!="string"||!ig.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(u+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,Jt(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return Jt(h,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!mn(l.minValue)||!mn(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(mn(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):mn(l.discreteStep)&&l.discreteStep>0?l.discreteStep:lg(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!mn(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(mn(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:No,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function lg(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function cg(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function ro(e){return"plugin:"+e}function dg(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,h){return{value:h,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:cg(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),o={type:ro(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function ku(e,t){var n=ao(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=pe(ro(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=dg(n.manifest,t);return Bm(r),r}async function $u(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function ug(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function ql(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var o=new Uint8Array(await r.arrayBuffer());if(n){var s=await $u(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var Wa=typeof WeakMap=="function"?new WeakMap:null;function Eu(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Au(e,t,n,a,r){var o=t.id+"@"+t.version,s=Wa&&Wa.get(e);!s&&Wa&&(s={},Wa.set(e,s));var l=s&&s[o];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await Pu(e,r);var h=URL.createObjectURL(new Blob([og(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[o]=c,c.catch(function(){delete s[o]})),await c,{stale:!1}}async function Su(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));ug(r);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await ql(r.href,o,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=ao(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=pe(ro(c.id));if(p&&p.plugin.version!==c.version)throw Eu(c,p.plugin.version);var h=new URL(c.dsp,r),b=await Au(e,c,function(){return ql(h.href,o,s.dsp,"DSP file")},h.href,a.moduleUrl),m=ku(c,{url:r.href,listed:a.listed===!0});return{entry:m,manifest:c,url:r.href,stale:b.stale}}var pg=256*1024;async function Vl(e,t,n){var a=n||{},r=t||{},o=r.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=ao(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>pg)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=pe(ro(l.id));if(u&&u.plugin.version!==l.version)throw Eu(l,u.plugin.version);var c=r.dsp,p=await Au(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=ku(l,{url:d,listed:!1});return{entry:h,manifest:l,url:d,stale:p.stale}}function fg(e){var t=[];if(!ua(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,o){var s="plugins["+o+"]",l=[];if(!ua(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!vu.test(r.id))&&l.push("id"),Jt(r.name,40)||l.push("name"),(typeof r.version!="string"||!wu.test(r.version))&&l.push("version"),Jt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!xu.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!ua(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function hg(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var o=fg(await r.json());return{registry:o.registry,url:a.href,errors:o.errors}}function mg(e,t,n,a){return Su(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function gg(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=o(),c=0,p=!1,h=s(function(){var b=o(),m=b-u,v=e.currentTime;if(u=b,e.state!=="running"||v!==d){d=v,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(m>4*r){c=0;return}c+=m,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:v}))},r);return{stop:function(){l(h)},stalled:function(){return p}}}var bg=["hard","pump","swell","blip","glide"],yg=["Hard","Pump","Swell","Blip","Glide"],Mu=16;function bt(e){for(var t=[],n=0;n<Mu;n++)t.push(e[n%e.length]);return t}var Rn=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:bt([100]),shapes:bt([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:bt([15,35,60,85,100,85,60,35]),shapes:bt([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:bt([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:bt([100,55,85,40,100,55,85,70]),shapes:bt([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:bt([100,85,70,60,50,40,30,20]),shapes:bt([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],vg="Ducker";function Tu(e){for(var t=String(e||"").toLowerCase(),n=0;n<Rn.length;n++){var a=Rn[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function Hl(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function Da(e){for(var t=Rn[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],o={levels:[],shapes:[]},s=0;s<Mu;s++)o.levels.push(Hl(a[s],0,100,t.levels[s])+0),o.shapes.push(Hl(r[s],0,bg.length-1,t.shapes[s])+0);return o}function wg(e){var t=Da(e),n=[],a,r,o;for(a=0;a<4;a++){for(o=0,r=3;r>=0;r--)o=o*101+t.levels[a*4+r];n.push([10+a,o])}for(a=0;a<2;a++){for(o=0,r=7;r>=0;r--)o=o*5+t.shapes[a*8+r];n.push([14+a,o])}return n}function xg(e){if(!e||!e.dials)return"Custom";for(var t=Da(e.pattern),n=0;n<Rn.length;n++){var a=Rn[n],r=!0,o;for(o in a.dials)e.dials[o]!==a.dials[o]&&(r=!1);var s=a.dials.steps;for(o=0;r&&o<s;o++)(t.levels[o]!==a.levels[o]||t.shapes[o]!==a.shapes[o])&&(r=!1);if(r)return a.name}return"Custom"}function Lu(e){var t=e&&e.steps===8?8:16;return e&&e.rate===12&&t>12?12:t}function kg(e,t,n){var a=e&&(e.rate===4||e.rate===8||e.rate===12)?e.rate:16,r=e&&e.steps===8?8:16,o=4/a,s=+t||0;if(a===12){var l=n>0?n:4;s-=Math.floor(s/l)*l}var d=.5+.25*(e&&typeof e.swing=="number"?e.swing:0)/100,u=s/o*.5,c=Math.floor(u),p=u-c,h=(c%16+16)%16,b=p<d?h*2:h*2+1;return b&r-1}function $g(e,t,n,a){for(var r=Da(t),o=e&&e.steps===8?8:16,s=Lu(e),l=(n%o+o)%o,d=l+1>=s?0:l+1,u=r.levels[l]/100,c=r.levels[d]/100,p=r.shapes[l],h=[],b=a>0?a:24,m=0;m<=b;m++){var v=m/b,f,y;switch(p){case 1:y=v*1.6667,y>1&&(y=1),f=u*y*(2-y);break;case 2:f=u*v*v;break;case 3:f=v<.12?u:u*Math.exp((.12-v)*18);break;case 4:y=v*v*(3-2*v),f=u+(c-u)*y;break;default:f=u}h.push(f)}return h}var Eg=2,$r=3,Ul=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Qt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Ag=/^local:[A-Za-z0-9._@-]{1,200}$/,Sg=/^\d+\.\d+\.\d+$/;function Mg(e,t){var n=Qt(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Sg.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Ag.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Cu(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Tg(e){var t={},n=0;if(Qt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function Lg(e){return e.plugin?e.plugin.idBase:e.type}function Nu(e,t){var n=pe(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,o=Lg(n);a[o+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=Cu(n)),n.pattern){var d=Tu(vg);Object.assign(l.dials,d.dials),l.pattern=d.pattern}return l}function Cg(e){var t=pe(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Ng(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Ig(e){return typeof e=="number"&&isFinite(e)?Wm(e):e}function Gl(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Ig(o)),a[r.key]=e.plugin?Et(r,o,r.step):Et(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Et(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],Pn(r,a)))}),a}function Fg(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=xn(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var Pg={rate:"rate_hz"};function Rg(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Pg[o.key]||o.key;r[o.key]=Fg(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Dg(e,t){var n=t>0?Math.floor(t):$r,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):Qt(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<o.length;u++){var c=o[u];if(Qt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=ds(c.type),h=p&&pe(p);if(!h&&!s&&gu(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var b=Mg(c.plugin,c.type),m=b.id.split(".").pop(),v=1;d.some(function(g){return g.id===m+"-"+v});)v++;var f=typeof c.id=="string"&&Ul.test(c.id)&&!d.some(function(g){return g.id===c.id})?c.id:m+"-"+v;d.push({id:f,type:c.type,bypass:c.bypass===!0,dials:Tg(c.dials),plugin:b});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var y;Qt(c.params)&&!Qt(c.dials)?y=Gl(h,Rg(h,c.params,r,c.id||p),l):y=Gl(h,Qt(c.dials)?c.dials:{},l);var E=Nu(p,d),k=typeof c.id=="string"&&Ul.test(c.id)&&!d.some(function(g){return g.id===c.id})?c.id:E.id,L=s?c.bypass!==!1:c.bypass===!0,x={id:s?E.id:k,type:p,bypass:L,dials:y};h.plugin&&(x.plugin=Cu(h)),h.pattern&&(x.pattern=Da(c.pattern)),d.push(x)}}return{state:{v:Eg,chain:d},dropped:a,notes:r}}function nn(e,t){return Dg(e,t).state}function Lt(e){var t=pe(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,vr(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(wg(e.pattern)))),n}function Og(e){var t=nn(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var o=pe(r.type);return o&&o.own?(n.push(r.id+": ASTRID has no "+o.label),!1):!0}).map(function(r,o){var s=pe(r.type),l={};return o>=$r&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&fi.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var zg=150,Bg=6e3,_g=18,Iu=6.283185307179586;function oo(e,t,n){return e<t?t:e>n?n:e}function jg(e,t,n,a,r){var o=Math.pow(10,n/40),s=Iu*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,h,b,m,v,f;if(e===0||e===2){v=d/2*Math.SQRT2,f=2*Math.sqrt(o)*v;var y=e===0?1:-1;u=o*(o+1-y*(o-1)*l+f),c=y*2*o*(o-1-y*(o+1)*l),p=o*(o+1-y*(o-1)*l-f),h=o+1+y*(o-1)*l+f,b=-y*2*(o-1+y*(o+1)*l),m=o+1+y*(o-1)*l-f}else v=d/(2*a),u=1+v*o,c=-2*l,p=1-v*o,h=1+v/o,b=-2*l,m=1-v/o;return[u/h,c/h,p/h,b/h,m/h]}function qg(e,t,n){var a=Iu*t/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*o+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var Kl={};function qt(e){return Kl[e]||(Kl[e]=qm("eq",e))}function vn(e,t){var n=qt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return oo(a,n.min,n.max)}function Fu(e){return[{id:"low",kind:0,hz:zg,db:vn(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:vr(qt("mid_hz"),vn(e,"mid_hz")),db:vn(e,"mid_db"),q:vr(qt("mid_q"),vn(e,"mid_q"))},{id:"high",kind:2,hz:Bg,db:vn(e,"high_db"),q:Math.SQRT1_2}]}function Vg(e,t,n){for(var a=Fu(e),r=n.length,o=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=jg(u.kind,u.hz,u.db,u.q,t),h=0;h<r;h++){var b=n[h]<l?n[h]:l*.9999;c[h]=qg(p,b,t),o[h]+=c[h]}s.push(c)}return{total:o,bands:s}}function Hg(e){var t=qt("mid_hz").dsp.law;return oo(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Ug(e){var t=qt("mid_q").dsp.law;return oo(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Er={low:"low_db",mid:"mid_db",high:"high_db"},Gg={low:"Low",mid:"Mid",high:"High"};function Kg(e,t,n){var a=[];function r(o,s){var l=qt(o),d=l.step||1;s=oo(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==vn(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Er[t]&&r(Er[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",Hg(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",Ug(n.q)),a}function Wg(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Er[e]?[Er[e]]:[];return t.map(function(n){return[n,qt(n).default]})}var Ya=typeof WeakMap=="function"?new WeakMap:null;function Yg(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Ya&&Ya.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Ya&&Ya.set(e,n)),n.handle}function Xg(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:qt(c).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},d=Fu(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Gg[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:_g,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return Vg(r,s,c)},spectrum:a.spectrum===!1?void 0:Yg(e)||void 0,onBand:function(c,p){u(Kg(r,c,p))},onReset:function(c){u(Wg(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Jg="nc-fx@1",Qg=600,Zg=256,eb=8,Zn=typeof WeakMap=="function"?new WeakMap:null;function Pu(e,t){var n=Zn&&Zn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Fm(async()=>{const{default:o}=await import("./worklet-source-DgIhZ4lI.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Zn&&(Zn.set(e,n),n.catch(function(){Zn.delete(e)})),n)}function Ct(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Ru(e,t,n,a){var r=Math.min(400,Math.max(20,Ct(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=Ct(t.preGain,1),u=Math.max(0,Ct(t.crossfade,.012)),c=Ct(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),b=e.createGain(),m=e.createGain(),v=null;t.modInput===!0&&(v=e.createGain(),v.channelCount=1,v.channelCountMode="explicit",v.channelInterpretation="discrete"),m.gain.value=0,p.connect(b),b.connect(h),m.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},y=n(r);f.post=function(g){f.node?f.node.port.postMessage(g):f.disposed||(o.length>=Zg&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push(g))};function E(g){var w=o.map(function(A){var T=Object.assign({},A);return T.when>g||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return o=[],w}f.emit=function(g){for(var w=0;w<f.listeners.length;w++)try{f.listeners[w](g)}catch(A){typeof console<"u"&&console.error(A)}},f.whenOf=function(g){return typeof g=="number"&&isFinite(g)&&g>0?g:0};var k=!1;f.tooFar=function(g){return typeof g=="number"&&g>e.currentTime+Qg?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(g-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var L=Pu(e,t.moduleUrl).then(function(){if(!f.disposed){var g=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},y);g.pending=E(e.currentTime),f.node=new AudioWorkletNode(e,Jg,{numberOfInputs:v?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:g}),f.node.port.onmessage=function(A){var T=A.data;if(T&&T.t==="lv"&&f.mUsers>0)f.lv=T.d,f.lvAt=Wl();else if(T&&T.t==="clk"&&T.d)f.clk={beat:T.d[0],frame:T.d[1],perFrame:T.d[2],locked:T.d[3]===1,bar:T.d[4]||4};else if(T&&T.t==="perr"&&f.onPluginError&&T.d)for(var D=0;D<(T.n|0);D++)f.onPluginError(T.d[2*D],T.d[2*D+1])},p.connect(f.node),v&&v.connect(f.node,0,1),f.node.connect(m);var w=e.currentTime;w<=0||u===0?(b.gain.value=0,m.gain.value=1):(b.gain.setValueAtTime(1,w),b.gain.linearRampToValueAtTime(0,w+u),m.gain.setValueAtTime(0,w),m.gain.linearRampToValueAtTime(1,w+u)),f.status="ready"}},function(g){f.status="unavailable",o=[],f.error=g});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&Wl()-f.lvAt<tb?f.lv:null};var x={};return f.meter=function(g,w){if(x[g])return x[g];var A=0,T={in:0,out:0},D={open:function(){return f.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,f.meterClose())},read:function(){var $=A>0?f.levels():null;return T.in=0,T.out=0,$&&w($,T),T}};return x[g]=D,D},f.core={input:p,output:h,modInput:v,ready:L,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(g,w){var A=Ct(g,NaN);!(A>0)||f.disposed||f.tooFar(w)||(f.bpm=Math.min(400,Math.max(20,A)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(w)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},setBeat:function(g,w){var A=Ct(g,NaN);A!==A||f.disposed||f.tooFar(w)||f.post({t:"beat",beat:A,when:f.whenOf(w)})},freeRun:function(g){f.disposed||f.tooFar(g)||f.post({t:"free",when:f.whenOf(g)})},setBar:function(g,w){var A=Math.round(Ct(g,NaN));!(A>=1&&A<=16)||f.disposed||f.tooFar(w)||f.post({t:"bar",beats:A,when:f.whenOf(w)})},beatAt:function(g){var w=f.clk;if(!w)return null;var A=typeof g=="number"&&isFinite(g)?g:e.currentTime;return{beat:w.beat+(A*e.sampleRate-w.frame)*w.perFrame,bpm:w.perFrame*60*e.sampleRate,locked:w.locked,beatsPerBar:w.bar}},clear:function(g){var w=g&&typeof g=="object"?g:{at:g};if(!(f.disposed||f.tooFar(w.at))){var A=Ct(w.fadeMs,0);f.post({t:"clear",when:f.whenOf(w.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(g){return f.listeners.push(g),function(){var w=f.listeners.indexOf(g);w>=0&&f.listeners.splice(w,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,b,m,h,v].forEach(function(g){try{g&&g.disconnect()}catch{}})}}},f}var tb=250;function Wl(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Du(e,t){t.in=e[0],t.out=e[1]}function Io(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Fo(e,t){var n=t||{};if(n.slots)return nb(e,n);var a=xr(n.state),r=Array.from(Lo(a)),o=Ru(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Lo(a)),when:0}]}),s=o.core;function l(d){return a.chain[to.indexOf(d)]}return s.setParam=function(d,u,c,p){var h=wr(d);if(!(!h||o.disposed||o.tooFar(p))){var b=l(h),m;if(u==="bypass")m=!!c;else{var v=yu(h,u);if(!v)return;m=Et(v,c,Pn(v,b.dials))}return u==="bypass"?b.bypass=m:b.dials[u]=m,o.post({t:"p",i:hi[h][u],v:mi(h,u,m),when:o.whenOf(p)}),o.emit({effect:h,key:u,value:m}),no(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(k){return k.key===u}))){var y=b.dials[f.key],E=Et(f,y,Pn(f,b.dials));E!==y&&(b.dials[f.key]=E,o.post({t:"p",i:hi[h][f.key],v:mi(h,f.key,E),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:E}))}}),m}},s.meter=function(){return o.meter("",Du)},s.getParam=function(d,u){var c=wr(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return Jm(a)},s.setState=function(d,u){o.disposed||o.tooFar(u&&u.at)||(a=xr(d),o.post({t:"load",program:Array.from(Lo(a)),when:o.whenOf(u&&u.at)}),o.emit({effect:null,key:null,value:null}))},s}function nb(e,t){var n=t.slots===!0?$r:Math.max(1,Math.min(eb,Math.floor(+t.slots)||$r)),a=nn(t.state,n),r=1,o={},s={};function l(g){return!gu(g.type)||pe(g.type)!==null}function d(g){var w=pe(g.type);return w&&w.plugin?w.plugin.engine:g.type}function u(g){return o[g.id]||(o[g.id]=r++),o[g.id]}function c(g){return g.filter(l).map(function(w){return{uid:u(w),type:d(w),program:Lt(w)}})}function p(){return a.chain.filter(l).map(function(g){return o[g.id]})}var h=c(a.chain),b=p(),m=Ru(e,t,function(){return{slots:n,chain:h,order:b}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),v=m.core;m.onPluginError=function(g,w){for(var A in o)o[A]===g&&(s[A]=w,m.emit({effect:A,key:"error",value:w}))};function f(g){var w;for(w=0;w<a.chain.length;w++)if(a.chain[w].id===g)return a.chain[w];var A=ds(g);if(A){for(w=0;w<a.chain.length;w++)if(a.chain[w].type===A)return a.chain[w]}return null}function y(g,w){var A=u(g);m.post({t:"add",uid:A,type:d(g),when:w}),Lt(g).forEach(function(T){m.post({t:"ps",uid:A,k:T[0],v:T[1],when:w,snap:!0})})}function E(g){m.post({t:"order",uids:p(),when:g})}function k(g,w){var A={};a.chain.forEach(function($){A[$.id]=$});var T=p().join();g.chain.forEach(function($){var S=A[$.id];if(!l($)){delete o[$.id];return}if(!S||S.type!==$.type||!o[$.id]){delete o[$.id],delete s[$.id],y($,w);return}var N={};Lt(S).forEach(function(P){N[P[0]]=P[1]}),Lt($).forEach(function(P){N[P[0]]!==P[1]&&m.post({t:"ps",uid:o[$.id],k:P[0],v:P[1],when:w})})});var D={};g.chain.forEach(function($){D[$.id]=!0}),Object.keys(o).forEach(function($){D[$]||delete o[$]}),Object.keys(s).forEach(function($){D[$]||delete s[$]}),a=g,p().join()!==T&&E(w)}var L=jm(function(g){if(!(m.disposed||!a.chain.some(function(A){return A.type===g}))){var w=JSON.parse(JSON.stringify(a));w.chain=w.chain.map(function(A){return A.type===g?nn({v:2,chain:[A]},1).chain[0]:A}),k(w,0),m.emit({effect:null,key:"plugin",value:g})}}),x=v.dispose;return v.dispose=function(){L(),x()},v.slots=n,v.meter=function(g){return g==null||g===""?m.meter("",Du):m.meter("#"+g,function(w,A){var T=f(g),D=T?o[T.id]:0,$=w[2];if(D){for(var S=3,N=0;N<$;N++,S+=3)if(w[S]===D){A.in=w[S+1],A.out=w[S+2];return}}})},v.setParam=function(g,w,A,T){var D=f(g);if(!(!D||m.disposed||m.tooFar(T))){var $=pe(D.type),S,N=null;if(!$)return w!=="bypass"?void 0:(D.bypass=!!A,m.emit({effect:D.id,key:w,value:D.bypass}),D.bypass);if(w==="bypass")S=!!A;else{for(var P=0;P<$.dials.length;P++)$.dials[P].key===w&&(N=$.dials[P]);if(!N)return;S=Et(N,A,Pn(N,D.dials))}var I={},V={};Lt(D).forEach(function(H){I[H[0]]=H[1]}),$.dials.forEach(function(H){H.stepWhen&&(V[H.key]=D.dials[H.key])}),w==="bypass"?D.bypass=S:D.dials[w]=S,$.dials.forEach(function(H){H.stepWhen&&(D.dials[H.key]=Et(H,D.dials[H.key],Pn(H,D.dials)))});var G=m.whenOf(T),q=o[D.id];return q&&Lt(D).forEach(function(H){(I[H[0]]!==H[1]||N&&H[0]===N.k)&&m.post({t:"ps",uid:q,k:H[0],v:H[1],when:G})}),m.emit({effect:D.id,key:w,value:S}),Object.keys(V).forEach(function(H){H!==w&&D.dials[H]!==V[H]&&m.emit({effect:D.id,key:H,value:D.dials[H]})}),S}},v.getParam=function(g,w){var A=f(g);if(A)return w==="bypass"?A.bypass:A.dials[w]},v.setPattern=function(g,w,A){var T=f(g);if(!(!T||!T.pattern||m.disposed||m.tooFar(A))){var D=w&&typeof w=="object"?w:{},$=Da({levels:Array.isArray(D.levels)?D.levels:T.pattern.levels,shapes:Array.isArray(D.shapes)?D.shapes:T.pattern.shapes}),S={};Lt(T).forEach(function(I){S[I[0]]=I[1]}),T.pattern=$;var N=o[T.id],P=m.whenOf(A);return N&&Lt(T).forEach(function(I){S[I[0]]!==I[1]&&m.post({t:"ps",uid:N,k:I[0],v:I[1],when:P})}),m.emit({effect:T.id,key:"pattern",value:JSON.parse(JSON.stringify($))}),JSON.parse(JSON.stringify($))}},v.getPattern=function(g){var w=f(g);return w&&w.pattern?JSON.parse(JSON.stringify(w.pattern)):void 0},v.setGatePattern=function(g,w,A){var T=f(g),D=Tu(w);return!T||!T.pattern||!D||m.disposed||m.tooFar(A)?!1:(Object.keys(D.dials).forEach(function($){v.setParam(T.id,$,D.dials[$],A)}),v.setPattern(T.id,D.pattern,A),!0)},v.getState=function(){return JSON.parse(JSON.stringify(a))},v.setState=function(g,w){m.disposed||m.tooFar(w&&w.at)||(k(nn(g,n),m.whenOf(w&&w.at)),m.emit({effect:null,key:null,value:null}))},v.addEffect=function(g,w){var A=w||{},T=Nu(g,a.chain);if(!(!T||a.chain.length>=n||m.disposed||m.tooFar(A.at))){if(A.dials){var D=nn({v:2,chain:[{id:T.id,type:T.type,dials:A.dials}]},1).chain[0];T.dials=D.dials}A.bypass===!0&&(T.bypass=!0);var $=a.chain.slice(),S=typeof A.index=="number"?Math.max(0,Math.min($.length,A.index)):$.length;return $.splice(S,0,T),k({v:2,chain:$},m.whenOf(A.at)),m.emit({effect:T.id,key:"chain",value:"add"}),T.id}},v.removeEffect=function(g,w){var A=f(g),T=w&&w.at;return!A||m.disposed||m.tooFar(T)?!1:(k({v:2,chain:a.chain.filter(function(D){return D!==A})},m.whenOf(T)),m.emit({effect:A.id,key:"chain",value:"remove"}),!0)},v.moveEffect=function(g,w,A){var T=f(g),D=A&&A.at;if(!T||m.disposed||m.tooFar(D))return!1;var $=Ng(a.chain,a.chain.indexOf(T),w);return $===a.chain?!1:(k({v:2,chain:$},m.whenOf(D)),m.emit({effect:T.id,key:"chain",value:"move"}),!0)},v.getChain=function(){return a.chain.map(function(g){var w={id:g.id,type:g.type,name:Cg(g),bypass:g.bypass};if(g.plugin){var A=s[g.id]||0,T=!l(g)||A===5;w.plugin={id:g.plugin.id,version:g.plugin.version,url:g.plugin.url,name:g.plugin.name,status:T?"missing":A?"failed":"ready"},A&&!T&&(w.plugin.error=kr[A]||kr[2])}return w})},v.toAstrid=function(){return Og(a)},v}function Yl(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Ou(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(f){return r.toContextTime(f)}:t&&t.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(f){if(!o){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var y=o(l.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var y=l&&typeof l.bpm=="number"?l.bpm:Yl(d,0);y>0&&e.setTempo(y);return}var E=Yl(d,f);E>0&&e.setTempo(E);for(var k=d&&(d.points||d.tempoPoints)||[],L=0;L<k.length;L++){var x=k[L];if(x.beat>f&&x.bpm>0){var g=c(x.beat);g!==void 0&&e.setTempo(x.bpm,g)}}}var h=typeof e.setBeat=="function";function b(){var f=l&&l.meter,y=f&&typeof f.beatsPerBar=="number"?f.beatsPerBar:0;h&&y>=1&&typeof e.setBar=="function"&&e.setBar(y)}function m(f){if(!(!o||typeof f!="number"||!isFinite(f))){var y=o(f);return typeof y=="number"&&isFinite(y)?y:void 0}}function v(){if(h){if(b(),!l||!l.running){e.freeRun();return}var f=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(f)&&e.setBeat(f,c(f))}}return p(),v(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?e.setTempo(f.bpm,c(f.atBeat)):f.kind==="snapshot"?(p(),v()):f.kind==="start"?(p(),h&&typeof f.beat=="number"&&isFinite(f.beat)&&(b(),e.setBeat(f.beat,m(f.at)))):f.kind==="stop"&&h&&e.freeRun(m(f.at)))})}const pa="/studio/assets/worklet-BuzpUTR0.js";var ab="nc-ui",rb={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},us={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ar={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ob={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Bt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ib={light:{color:rb.color,semantic:us,component:Ar,runtime:ob},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Sr=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],ia=e=>`--${ab}-${e}`,Mr="data-nc-theme",gi="nc-ui-theme-change",sb=Object.freeze(["system","light","dark"]),lb="netcomposer.studio.theme.v1",cb="(prefers-color-scheme: dark)",Vn=e=>e?.documentElement??null,zu=e=>e?.defaultView?.matchMedia?.(cb)??null,ps=e=>e==="light"||e==="dark"?e:"system";function db(e=globalThis.document){return ps(Vn(e)?.getAttribute(Mr))}function Aa(e=globalThis.document){let t=db(e);return t!=="system"?t:zu(e)?.matches?"dark":"light"}function fs(e,t=globalThis.document){let n=Vn(t);if(!n)return"light";let a=ps(e);a==="system"?n.removeAttribute(Mr):n.setAttribute(Mr,a);let r=Aa(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(gi,{detail:{choice:a,theme:r}})),r}var Tr="data-nc-skin",bi="data-nc-fill",ub="nc-ui-look-change",Lr=Sr,Dn=(Sr.find(e=>e.default)??Sr[0])?.id??"prussian",pb="netcomposer.studio.skin.v1",fb="netcomposer.studio.fill.v1",Sa=e=>Sr.some(t=>t.id===e)?e:Dn;function Bu(e=globalThis.document){return Sa(Vn(e)?.getAttribute(Tr))}function hb(e=globalThis.document){return Vn(e)?.hasAttribute(bi)??!1}function hs(e={},t=globalThis.document){let n=Vn(t);if(!n)return{skin:Dn,fill:!1};if("skin"in e){let o=Sa(e.skin);o===Dn?n.removeAttribute(Tr):n.setAttribute(Tr,o)}"fill"in e&&(e.fill?n.setAttribute(bi,""):n.removeAttribute(bi));let a={skin:Bu(t),fill:hb(t)},r=t.defaultView?.CustomEvent;return r&&t.dispatchEvent(new r(ub,{detail:a})),a}function ms(e,t=globalThis.document){let n=Vn(t);if(!n)return()=>{};let a=()=>`${Aa(t)} ${Bu(t)}`,r=a(),o=()=>{let u=a();u!==r&&(r=u,e(Aa(t)))},s=t.defaultView?.MutationObserver,l=s?new s(o):null;l?.observe(n,{attributes:!0,attributeFilter:[Mr,Tr]});let d=zu(t);return d?.addEventListener?.("change",o),t.addEventListener(gi,o),()=>{l?.disconnect(),d?.removeEventListener?.("change",o),t.removeEventListener(gi,o)}}var yi=us["label-on-fill-dark"],Xl=us["label-on-fill-light"],mb=Bt["label-min-contrast"],gb=/^#[0-9a-f]{6}$/i,bb=e=>typeof e=="string"&&gb.test(e),dr=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Jl(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${dr(r(0)*255)}${dr(r(8)*255)}${dr(r(4)*255)}`}function _u(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function Ql(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function vi(e,t){let[n,a]=[Ql(e),Ql(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var Cr=e=>vi(e,yi)>=vi(e,Xl)?yi:Xl;function ju(e,t,n,a=mb){let r=Jl(e,t,n),o=Cr(r)===yi?1:-1;for(let s=0;s<40&&vi(r,Cr(r))<a;s++)n+=o*.01,r=Jl(e,t,n);return r}function yb(e){let{h:t,s:n}=_u(e),a=ju(t,Math.min(n,Bt["surprise-on-max-saturation"]),Bt["surprise-on-lightness"]);return{fill:e,ink:Cr(e),on:a,onInk:Cr(a)}}var vb=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function wb(e,t=Math.random){let[n,a]=Bt["surprise-saturation"],[r,o]=Bt["surprise-lightness"],s=Bt["surprise-min-hue-gap"],l=bb(e)?_u(e).h:null,d=t()*360;return l!==null&&vb(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),ju(d,n+t()*(a-n),r+t()*(o-r))}function xb(e){if(!e)return null;let t=yb(e);return{[ia("surprise-fill")]:t.fill,[ia("surprise-ink")]:t.ink,[ia("surprise-on")]:t.on,[ia("surprise-on-ink")]:t.onInk}}var kb=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,$b=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Zl(e){let[t,n,a]=[1,3,5].map(l=>kb(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Eb([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>dr($b(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ab=Bt["velocity-range"],qu={min:Ar.rhythm["velocity-min"],max:Ar.rhythm["velocity-max"]},ec=Object.fromEntries(Object.entries(ib).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Sb(e,t=qu){let[n,a]=Ab,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??Ar.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Zl(t.min),d=Zl(t.max);return{velocity:r,t:o,fill:Eb(l.map((u,c)=>u+(d[c]-u)*o)),ink:s}}function tc(e,t=qu){return{[ia("velocity-fill")]:Sb(e,t).fill}}var Mb={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Tb={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Lb={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Cb={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},io={};for(let[e,t]of Object.entries(Tb))io[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Cb))io[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Lb))io[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Mb.renames.map(e=>[e.old,e.new]));function Vu(e){let t=io[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function de(e){return Vu(e).prop}function i(e){return`var(${de(e)})`}function Nb(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(de(t)));return Number.isFinite(n)?n:0}function Ae(e,t){let n=Vu(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Hu(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Ib(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Fb="[data-modulated], [data-modulated] *",Uu="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Po(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function nc(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Pb(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${de("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${de("divider")}: ${i(`module-div-stack-${a}`)};
      ${de("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${de("text-sub")}: ${i("module-sub-stack-1")};
      ${de("divider")}: ${i("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${i("surface-page")};
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("body-size")};
  font-weight: ${i("title-weight")};
  line-height: ${i("label-leading")};
}
/* Phones: a page never pans sideways. A guard only: whatever is wider than the screen is the bug, fixed where it is
   (an iPhone sizes a Studio frame to its content, so one wide element pans the whole Studio: Peter, 2026-11-01).
   clip, not hidden: no scroll container, so position: sticky still sticks. */
@media (max-width: 768px) {
  html, body { overflow-x: clip; }
}
button, input, select { font: inherit; color: inherit; }
.nc [hidden] { display: none !important; }
.nc-stack { display: flex; flex-direction: column; min-width: 0; }
/* ASTRID's page frame: side gutters, a header with a divider under it, then the modules, inset from the edges. */
.nc-page {
  min-width: 0;
  padding: ${i("page-pad-y")} ${i("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${i("page-action-gap")};
  min-width: 0;
  padding-bottom: ${i("page-head-gap")};
  border-bottom: ${i("hairline")} solid ${i("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${i("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${i("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${i("page-pad-x")} * -1);
  right: calc(${i("page-pad-x")} * -1);
  background: ${i("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${i("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${i("page-title-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${i("page-sub-gap")} 0 0; font-size: ${i("page-sub-size")}; color: ${i("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${i("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${i("control-gap")} ${i("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${i("control-gap")};
  color: ${i("text-sub")};
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-page-action:hover { color: ${i("text")}; border-bottom-color: ${i("text")}; }
.nc-page-action:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
/* Page menu (pageMenu, page-menu.js; Peter, 2026-11-01: "On mobile put the top menu choices in a hamburger"). Wider
   than a phone the panel is display: contents, so the actions lay out as before and the ☰ hides. On a phone the
   actions wait behind the ☰ at the header's right; open, they are a flat list under the header, over the page (no
   layout shift), each a full-width target-min row. What an app keeps outside the panel (Panic) stays in the header. */
.nc-page-menu { display: contents; }
.nc-page-menu-btn { display: none; }
@media (max-width: 768px) {
  .nc-page-menu:not([data-nc-open]) { display: none !important; }
  .nc-page-menu-btn {
    display: inline-grid;
    place-items: center;
    flex: none;
    min-width: ${i("target-min")};
    min-height: ${i("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${i("target-min")} - ${i("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${i("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${i("target-min")} / 2.75); height: calc(${i("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${i("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${i("control-gap")};
    background: ${i("surface-page")};
    color: ${i("text")};
    border-bottom: ${i("hairline")} solid ${i("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${i("page-pad-x")} * -1);
    right: calc(${i("page-pad-x")} * -1);
    padding-inline: ${i("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${i("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${i("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${i("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${i("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${i("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${i("page-pad-x-md")} * -1);
    right: calc(${i("page-pad-x-md")} * -1);
    padding-inline: ${i("page-pad-x-md")};
  }
}
.nc-module {
  background: ${i("module-bg-adjacent-1")};
  color: ${i("text")};
  padding: ${i("module-pad")};
  border: 0;
  border-bottom: ${i("hairline")} solid ${i("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${i("font-ui")};
  transition: none;
}
${[1,2,3,4].map(t).join(`
`)}
${[1,2,3,4].map(e).join(`
`)}
${[1,2,3,4].map(n).join(`
`)}
.nc-module-hd {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${i("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${i("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${i("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${i("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${i("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${i("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${i("title-size")};
  font-weight: ${i("title-weight")};
  letter-spacing: ${i("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${i("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${i("header-gap")}; flex: none; }
.nc-index {
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  color: ${i("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${i("control-gap")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("body-size")};
  line-height: ${i("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${i("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${i("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${i("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("control-gap")};
}
.nc-slim-lines {
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${i("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${i("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${i("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${i("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${i("readout-size")};
  color: ${i("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${i("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${i("name-width")} - ${i("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${i("name-width")} - ${i("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${i("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${i("module-gap")};
  row-gap: ${i("control-gap")};
  padding-bottom: ${i("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${i("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${i("control-gap")};
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  line-height: ${i("label-leading")};
  text-transform: uppercase;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  transition: none;
}
/* The chip stays small; an invisible 44 px box takes the touch. It stops at the slider's top edge (the row gap
   under the chip) and grows upward into the row spacing, so it never takes a drag meant for the slider. */
.nc-tap::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: calc(-1 * ${i("control-gap")});
  width: max(100%, ${i("target-min")});
  height: max(100%, ${i("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${i("text-sub")}; color: ${i("text")}; }
.nc-tap:active { background: ${i("text")}; border-color: ${i("text")}; color: ${i("surface-page")}; }
.nc-tap:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${i("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${i("module-pad")} * -1);
  margin-bottom: calc(${i("module-pad")} * -1);
  padding: ${i("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${i("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${i("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${i("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${i("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${i("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${i("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${i("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${i("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${i("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${i("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${i("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${i("hairline")};
  background: ${i("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${i("hairline")};
  background: ${i("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${i("hairline")};
  background: ${i("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${i("slider-thumb-size")};
  height: ${i("slider-thumb-size")};
  margin-top: calc(${i("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${i("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${i("slider-thumb-size")};
  height: ${i("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${i("slider-thumb")};
  transition: none;
}
${Fb} { transition: none; }
.nc-range:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${i("hairline")} solid ${i("text")};
  background: transparent;
  color: ${i("text")};
  min-height: ${i("target-min")};
  padding: ${i("button-pad-y")} 0;
  font-size: ${i("readout-size")};
  letter-spacing: ${i("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${i("transition-feedback")};
}
.nc-btn:hover { background: ${i("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${i("accent")};
  border-color: ${i("accent")};
  color: ${i("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${i("focus-width-strong")} solid ${i("focus-ring")};
  outline-offset: ${i("control-gap")};
}
.nc-btn:disabled { color: ${i("text-sub")}; border-color: ${i("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  color: ${i("text-sub")};
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${i("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${i("text")}; }
.nc-toggle:hover { border-bottom-color: ${i("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${i("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${i("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${i("rhythm.track-solo")};
  border-bottom-color: ${i("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${i("hairline")} solid ${i("divider")};
  margin-bottom: ${i("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${i("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-size: ${i("tab-size")};
  font-weight: ${i("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${i("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${i("label-size")}; padding-inline: ${i("control-gap")}; }
.nc-seg > button:hover { color: ${i("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${i("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${i("hairline")} * -1);
  height: ${i("tab-mark")};
  background: ${i("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: calc(${i("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${i("hairline")} solid ${i("divider")};
  border-radius: 0;
  color: ${i("text")};
  font-size: ${i("body-size")};
  padding: ${i("control-gap")} ${i("select-pad-end")} ${i("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${i("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${i("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${i("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${i("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${i("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${i("slot-size")};
  width: ${i("slot-size")};
  max-width: ${i("slot-size")};
  min-width: 0;
  height: ${i("slot-size")};
  -webkit-touch-callout: none;
  user-select: none;
}
.nc-snap {
  display: block;
  width: 100%;
  height: 100%;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("slot-font-size")};
  line-height: ${i("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${i("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${i("text-sub")};
  color: ${i("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${i("accent")};
  color: ${i("accent")};
  box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${i("accent")};
  outline: ${i("focus-width")} solid ${i("accent-faint")};
  outline-offset: ${i("hairline")};
  box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${i("accent")};
  background: ${i("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${i("control-gap")};
  right: ${i("control-gap")};
  width: ${i("control-gap")};
  height: ${i("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${i("sparkle-size")};
  width: ${i("sparkle-size")};
  height: ${i("sparkle-size")};
  margin-inline: ${i("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${i("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${i("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${i("target-min")};
  width: ${i("target-min")};
  min-height: ${i("target-min")};
  padding: 0;
  border: ${i("hairline")} solid ${i("divider")};
  background: ${i("surprise-fill")};
  color: ${i("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${i("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${i("target-min")} / 2); height: calc(${i("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${i("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-sparkle svg { width: ${i("sparkle-icon-size")}; height: ${i("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${i("text")}; }
.nc-sparkle:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  color: ${i("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${i("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${i("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${i("name-width")};
  width: ${i("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${i("beat-gap")} - ${i("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${i("row-inset")});
  padding-inline: ${i("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${i("accent-tint")};
  box-shadow: inset ${i("marker-width")} 0 0 ${i("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${i("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${i("text")};
  text-decoration: underline;
  text-decoration-color: ${i("accent")};
  text-decoration-thickness: ${i("hairline")};
  text-underline-offset: ${i("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${i("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${i("move-row-gap")}; margin-top: ${i("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${i("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${i("move-label-width")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${i("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${i("move-size")};
  height: ${i("move-size")};
  padding: 0;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${i("move-icon")}; height: ${i("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${i("text")}; border-color: ${i("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-moves-btn:disabled { color: ${i("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${i("target-min")}; height: ${i("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${i("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${i("text-sub")}; border-color: ${i("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${i("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${i("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${i("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${i("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${i("slider-pitch")};
  height: ${i("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text-sub")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${i("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${i("rhythm.track-mute")};
  border-color: ${i("rhythm.track-mute")};
  color: ${i("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${i("rhythm.track-solo")};
  border-color: ${i("rhythm.track-solo")};
  color: ${i("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${i("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${i("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* Readable grid: off = empty outline, on = solid. The fill is the step's velocity (velocity-fill, set per cell from
   velocityFill: 5% = rhythm.velocity-min, 100% = rhythm.velocity-max, the accent; step-cell-on when a cell has no
   velocity). Shade means velocity, so an accent is a mark instead: a paper bar inside the step's bottom edge (an inset
   shadow, no layout), clear on every fill of the ramp. No transition: the shade snaps when the velocity changes. */
.nc-step[aria-pressed="true"] {
  background: ${i("velocity-fill")};
  border-color: ${i("velocity-fill")};
  color: ${i("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${i("rhythm.accent-mark-size")}) 0 0 ${i("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${i("playhead-width")} solid ${i("rhythm.playhead")};
  outline-offset: ${i("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${i("rhythm.bar-accent")}; }
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${i("rhythm.step-mark-inset")};
  bottom: ${i("rhythm.step-mark-inset")};
  font-family: ${i("font-readout")};
  font-size: ${i("rhythm.step-mark-size")};
  font-weight: ${i("control-weight")};
  line-height: 1;
  color: ${i("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${i("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${i("rhythm.step-mark-inset")} + ${i("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${i("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${i("control-gap")};
  margin-inline: calc((${i("control-gap")} + ${i("rhythm.step-gap")}) / -2);
  min-height: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ew-resize;
  touch-action: none;
  transition: none;
}
/* The bar itself overhangs the step row (a lane-height grip) without changing the row's layout. */
.nc-len-handle::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${i("hairline")};
  height: ${i("target-min")};
  max-height: calc(${i("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${i("hairline")} solid ${i("text-sub")};
  background: ${i("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${i("text")}; border-color: ${i("text")}; }
.nc-len-handle:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${i("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${i("accent")}; }
.nc-pad[data-out="true"] { border-color: ${i("divider")}; border-style: dashed; background: transparent; color: ${i("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${i("focus-width")} * 2) 0 0 ${i("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${i("focus-width")} * 2) 0 0 ${i("text")}, inset 0 calc(-1 * ${i("rhythm.accent-mark-size")}) 0 0 ${i("rhythm.accent-mark")};
}
.nc-pads { display: none; }
.nc-pads-head { display: none; }
.nc-pads-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${i("module-gap")};
  margin-bottom: ${i("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${i("target-min")} / 3); height: calc(${i("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${i("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${i("text")}; border-color: ${i("text")}; color: ${i("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${i("target-min")};
  min-height: ${i("target-min")};
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: ${i("surface-page")};
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("title-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${i("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${i("text")}; border-color: ${i("text")}; color: ${i("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${i("control-gap")};
  color: ${i("text-sub")};
  font-weight: ${i("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${i("text")}; border-bottom-color: ${i("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${i("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${i("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${i("target-min")} * 1.25);
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${i("control-gap")} ${i("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${i("velocity-fill")};
  border-color: ${i("velocity-fill")};
  color: ${i("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${i("rhythm.accent-mark-size")}) 0 0 ${i("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${i("playhead-width")} solid ${i("rhythm.playhead")};
  outline-offset: ${i("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${i("divider")}; color: ${i("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${i("text-sub")}; border-color: ${i("text-sub")}; color: ${i("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-step:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${i("playhead-width")};
  outline-offset: ${i("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${i("module-pad")} * -1);
  padding: ${i("stack-card-pad-y")} ${i("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${i("module-gap")} 0;
  font-size: ${i("body-size")};
  font-weight: ${i("fx-name-weight")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* FX card header: the effect's name and its switch on one row of at least a target's height. When the switch is
   off the card dims by colour ([data-nc-dim]). "More" holds the rarely used rows (fx-blocks' <details>). */
.nc-ui-fx-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${i("module-gap")};
  margin-bottom: ${i("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${i("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${i("control-gap")}; left: ${i("control-gap")}; z-index: 1; }
/* The horizontal-fold toggle (foldToggle): a small solid triangle, about the ×'s size, in text-sub (ink on hover).
   ◀ while open, flipped to ▶ while folded; the flip takes motion-press, and reduced motion makes it instant. −/+
   (.nc-hide) stays the vertical hide: the triangle means fold sideways. */
.nc-fold-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${i("text")}; }
.nc-fold-toggle:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${i("control-gap")} * 1.5);
  height: calc(${i("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${i("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${i("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${i("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${i("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${i("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${i("control-gap")};
  border-bottom: ${i("hairline")} solid transparent;
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  line-height: ${i("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${i("text")}; border-bottom-color: ${i("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${i("body-size")};
  font-weight: ${i("fx-name-weight")};
  color: ${i("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${i("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${i("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${i("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${i("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${i("slot-gap")};
  height: ${i("level-steps-height")};
  padding: calc(${i("slot-gap")} * 2);
  background: ${i("eq-graph-bg")};
  border-radius: ${i("slot-radius")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${i("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${i("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${i("beat-gap")} - ${i("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${i("level-steps-bar")}; }
.nc-lsteps-env { fill: ${i("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${i("level-steps-curve")}; stroke-width: ${i("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${i("divider")}; stroke-width: ${i("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${i("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${i("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${i("playhead-width")} solid ${i("playhead")}; outline-offset: ${i("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${i("level-steps-free")}; outline-width: ${i("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${i("playhead-width")} * -1) 0 0 ${i("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${i("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${i("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${i("slot-gap")} * 2) * -1));
  padding: calc(${i("slot-gap")} / 2) calc(${i("slot-gap")} * 2);
  border-radius: ${i("slot-radius")};
  background: ${i("accent")};
  color: ${i("on-accent")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${i("slot-gap")};
  padding: ${i("slot-gap")} calc(${i("slot-gap")} * 2) 0;
  font-family: ${i("font-readout")};
  font-size: ${i("slot-font-size")};
  line-height: 1;
  color: ${i("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${i("hairline")} solid ${i("divider")}; margin-top: ${i("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${i("slot-gap")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${i("slot-gap")} 0 ${i("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${i("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${i("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${i("hairline")} * -1);
  height: ${i("tab-mark")};
  background: ${i("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${i("label-size")} * 1.8); height: calc(${i("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${i("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${i("slot-gap")};
  padding: calc(${i("slot-gap")} * 2);
  background: ${i("surface-page")};
  border-radius: ${i("slot-radius")};
  box-shadow: 0 0 0 ${i("hairline")} ${i("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${i("slot-gap")} * 2); font-family: ${i("font-readout")}; font-size: ${i("readout-size-small")}; color: ${i("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${i("slot-gap")} * 2); border-radius: ${i("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${i("on-accent")}; background: ${i("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${i("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${i("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${i("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${i("eq-graph-height")};
  background: ${i("eq-graph-bg")};
  border-radius: ${i("slot-radius")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${i("eq-curve")};
  position: absolute;
  width: ${i("eq-node-size")};
  height: ${i("eq-node-size")};
  margin: calc(${i("eq-node-size")} / -2) 0 0 calc(${i("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${i("hairline")} ${i("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${i("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${i("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${i("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${i("target-min")};
  height: ${i("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${i("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${i("hairline")} * 2) ${i("eq-graph-bg")}, 0 0 0 calc(${i("hairline")} * 2 + ${i("focus-width")}) ${i("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${i("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${i("hairline")} ${i("control-gap")};
  border-radius: ${i("slot-radius")};
  background: ${i("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
  color: ${i("text")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  line-height: ${i("label-leading")};
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.nc-eq-tip[hidden] { display: none; }
/* Maximize (controls.js setMax): four corner ticks, out to maximize and in to restore, after the switch. */
.nc-fx-max, .nc-fx-close {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${i("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-close { font-size: ${i("title-size")}; padding-inline: ${i("control-gap")}; }
/* Remove (onRemove): a quiet × at the header's end, after maximize, sized like the header's other marks; text-sub,
   ink on hover (the strip's × turns danger: here Undo follows, so it stays calm). Its hit area reaches past the glyph
   to the right and a little up and down, never left over maximize. Not on a folded card (as a minimized strip),
   nor beside the wide panel's own ×. */
.nc-fx-remove {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: 0 ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${i("control-gap")} * -1);
  right: calc(${i("control-gap")} * -1);
  height: max(100%, calc(${i("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${i("text")}; }
.nc-fx-remove:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${i("control-gap")} * 2.5); height: calc(${i("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${i("control-gap")} * 1.1);
  height: calc(${i("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${i("hairline")} * 1.5); border-top-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${i("hairline")} * 1.5); border-top-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${i("hairline")} * 1.5); border-bottom-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${i("hairline")} * 1.5); border-bottom-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${i("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${i("module-pad")} * 2);
  row-gap: ${i("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${i("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${i("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${i("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${i("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${i("hairline")} ${i("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${i("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${i("control-gap")};
  cursor: pointer;
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text-sub")};
}
.nc-ui-more > summary:hover { color: ${i("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${i("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${i("module-gap")};
  row-gap: ${i("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${i("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${i("text-sub")};
}
.nc-group-toggle:hover { color: ${i("text")}; }
.nc-group-toggle:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${i("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${i("module-pad")}; min-width: 0; }
.nc-group-body[hidden] { display: none; }
/* A phone-only group (collapse: "phone"): flat on tablets and desktops (no header; group and body are display:
   contents, so its controls are the section's own flex items, as before it was grouped); a group on phones, below,
   where data-nc-open (not the hidden attribute, which group.js leaves off it) hides its body while closed. */
.nc-group[data-nc-collapse="phone"], .nc-group[data-nc-collapse="phone"] > .nc-group-body { display: contents; }
.nc-group[data-nc-collapse="phone"] > .nc-group-toggle { display: none; }
/* On/off (ASTRID's ghost On / Off, Peter 2026-10): role="switch", the word alone, no track. Off is text-sub; on is
   text with an accent hairline under it; hover takes the word and the line to text. Both words share one grid cell,
   so the control never changes width when it flips. */
.nc-ui-switch {
  display: inline-flex;
  align-items: baseline;
  flex: none;
  margin: 0;
  padding: 0 0 ${i("control-gap")};
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${i("text")}; border-bottom-color: ${i("accent")}; }
.nc-ui-switch:hover { color: ${i("text")}; border-bottom-color: ${i("text")}; }
.nc-ui-switch:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
.nc-ui-switch-text { display: inline-grid; }
.nc-ui-switch-text > span { grid-area: 1 / 1; }
/* ON reads bold (Peter, 2026-11-01: "Hack OFF/ON. ON should be bold"). The word is always bold, shown or not, so the
   switch keeps one width whichever word shows. The fold column's on/off word follows. */
.nc-ui-switch [data-nc-on], .nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { font-weight: var(--nc-ui-font-weight-bold); }
.nc-ui-switch[aria-checked="true"] [data-nc-off], .nc-ui-switch[aria-checked="false"] [data-nc-on] { visibility: hidden; }
/* Touch (ASTRID's coarse-pointer rule): text controls are drawn small and an invisible pad grows each to target-min,
   centred on it. A select cannot carry a pad, so it grows itself. */
@media (pointer: coarse) {
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-group-toggle, .nc-page-action, .nc-step-tools .nc-fill, .nc-fill.nc-clear) { position: relative; }
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-group-toggle, .nc-page-action, .nc-step-tools .nc-fill, .nc-fill.nc-clear)::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${i("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${i("module-pad")} * -1);
  margin-bottom: calc(${i("module-pad")} * -1);
  padding: ${i("module-pad")};
  background: ${i("surface-page")};
  border-top: ${i("hairline")} solid ${i("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${i("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${i("title-size")};
  font-weight: ${i("title-weight")};
  letter-spacing: ${i("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  color: ${i("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${i("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${i("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${i("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${i("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${i("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${i("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${i("danger")}; }
.nc-knob {
  width: ${i("knob-size")};
  height: ${i("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${i("hairline")} solid ${i("divider")};
  background: ${i("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${i("control-gap")};
  width: ${i("hairline")};
  height: ${i("control-gap")};
  background: ${i("text")};
  transform-origin: center ${i("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${i("control-gap")} ${i("header-gap")};
  min-width: 0;
}
.nc-choice {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  padding: ${i("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${i("target-min")}; min-height: ${i("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${i("control-gap")}; margin-bottom: ${i("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${i("text")};
  border-bottom-color: ${i("accent")};
}
.nc-choice:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${i("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${i("target-min")} * 1.5);
  padding: ${i("control-gap")} ${i("control-gap")} ${i("control-gap")} calc(${i("control-gap")} * 2);
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${i("control-gap")};
  inset-inline-start: ${i("hairline")};
  width: ${i("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${i("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${i("text-sub")}; font-size: ${i("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${i("control-gap")};
  inset-inline-end: ${i("control-gap")};
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${i("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${i("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${i("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${i("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${i("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${i("control-gap")};
  border-color: ${i("divider")};
  background: ${i("divider")};
  color: ${i("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${i("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${i("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${i("accent")}; box-shadow: inset 0 0 0 ${i("hairline")} ${i("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${i("target-min")};
  padding: 0 ${i("control-gap")};
  border: ${i("hairline")} solid ${i("accent")};
  border-radius: ${i("slot-radius")};
  background: ${i("surface-page")};
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${i("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${i("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${i("control-gap")};
  min-width: ${i("name-width")};
  padding: ${i("control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("divider")};
  color: ${i("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${i("target-min")};
  border: 0;
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${i("target-min")};
  margin-block: calc((${i("slider-pitch")} - ${i("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${i("target-min")}; height: ${i("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${i("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${i("target-min")}); right: calc(${i("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${i("target-min")} - ${i("slider-pitch")}) / 2);
    width: auto;
    height: auto;
  }
}
.nc-slot-scrim {
  position: fixed;
  inset: 0;
  z-index: 2;
  background: transparent;
  touch-action: none;
}
.nc-menu-btn:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${i("target-min")};
  height: ${i("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${i("target-min-coarse")}; height: ${i("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${i("module-gap")};
  width: calc(${i("name-width")} * 6);
  max-width: calc(100vw - 2 * ${i("module-gap")});
  padding: ${i("module-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("divider")};
  color: ${i("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${i("focus-width")} solid ${i("text")};
  outline-offset: ${i("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${i("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${i("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${i("module-gap")};
  min-height: ${i("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${i("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${i("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${i("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${i("target-min")};
  min-height: ${i("target-min")};
  border: 0;
  background: none;
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("title-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${i("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${i("hairline")} 0 0;
}
/* nc-ui toast (createToast): ASTRID's small dark chip with an uppercase, letter-spaced action.
   Opacity only: in with motion-fade, out with motion-fade-out. Only the chip takes taps. */
.nc-ui-toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: ${i("toast-gap")};
  max-width: calc(100vw - 2 * ${i("toast-offset")});
  min-height: ${i("toast-target")};
  padding: 0 0 0 ${i("toast-pad-x")};
  border-radius: ${i("toast-radius")};
  background: ${i("toast-bg")};
  color: ${i("toast-text")};
  font-family: ${i("font-ui")};
  font-size: ${i("toast-font-size")};
  line-height: ${i("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${i("motion-fade")} ${i("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${i("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${i("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${i("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${i("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${i("motion-fade-out")} ${i("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${i("toast-pad-x")} / 2) calc(${i("toast-pad-x")} * 0.75);
  border-radius: ${i("toast-radius")};
  background: ${i("toast-bg")};
  color: ${i("toast-text")};
  font-family: ${i("font-ui")};
  font-size: ${i("toast-font-size")};
  font-weight: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-transform: none;
  text-align: left;
  white-space: normal;
  pointer-events: none;
}
.nc-ui-help[hidden] { display: none; }
/* A slider row's input reaches up over its label (the target-min hit band), so with a mouse most of the label was the
   slider's and its description never opened (found in LUCY). With a fine pointer a described label sits above the
   band; touch keeps the full band and has no hover. Nothing moves. */
@media (hover: hover) and (pointer: fine) {
  .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
}
.nc-ui-toast-message { overflow: hidden; text-overflow: ellipsis; }
.nc-ui-toast-action {
  min-width: ${i("toast-target")};
  min-height: ${i("toast-target")};
  padding: 0 ${i("toast-pad-x")};
  border: 0;
  background: none;
  color: ${i("toast-action")};
  font: inherit;
  font-weight: ${i("title-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${i("focus-width")} solid ${i("toast-action")};
  outline-offset: calc(-2 * ${i("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${i("hairline")};
  height: ${i("hairline")};
  overflow: hidden;
  clip-path: inset(50%);
  pointer-events: none;
  white-space: nowrap;
}
/* Console (the Studio's Mix): channel strips, the FX cards, then the master strip, on one row. The body bleeds to the
   module's sides and bottom so each area is a shade block: strips on the module, the FX cards one adjacent shade
   darker each, and the master darkest (stack-1), so the row reads as the signal path ending on the right. */
.nc-module-body[data-nc-layout="console"] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  grid-template-areas: "strips fx meters master";
  align-items: stretch;
  gap: 0;
  margin-inline: calc(${i("module-pad")} * -1);
  margin-bottom: calc(${i("module-pad")} * -1);
  border-top: ${i("hairline")} solid ${i("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${i("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${i("module-pad")} ${i("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${i("module-bg-stack-1")};
  ${de("text-sub")}: ${i("module-sub-stack-1")};
  ${de("divider")}: ${i("module-div-stack-1")};
  ${de("slider-track")}: ${i("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${i("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  border-inline-end: ${i("hairline")} solid ${i("module-div-stack-1")};
  background: ${i("module-bg-stack-1")};
  ${de("text-sub")}: ${i("module-sub-stack-1")};
  ${de("divider")}: ${i("module-div-stack-1")};
  ${de("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${de("text-sub")}: ${i("module-sub-stack-1")};
  ${de("divider")}: ${i("module-div-stack-1")};
  ${de("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${de("text-sub")}: inherit;
  ${de("divider")}: inherit;
  ${de("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${i("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${i("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${i("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${i("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${i("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${i("fx-card-width")}; }
  /* :has() counts its argument, so the folded card repeats it to win over the open cards' width. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-folded] {
    width: var(--nc-fx-fold-w);
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { display: none; }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-fold { display: flex; }
}
/* A maximized card in a console row takes three cards' width (the whole fx row), folded neighbours or not. */
@media (min-width: 769px) {
  /* Its neighbours (Peter, 2026-11-01: "don't wrap the other inserts below, minimize them horizontally") show as
     folded columns beside it for as long as it is maximized; a click on one restores the card (controls.js). Their
     own fold state is untouched. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]):has(> .nc-ui-fx-fold) {
    flex: none;
    width: var(--nc-fx-fold-w);
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]):has(> .nc-ui-fx-fold) > :not(.nc-ui-fx-fold, .nc-token-probe) { display: none; }
  /* !important: the fold button is [hidden] while its card is open, and .nc [hidden] is display: none !important. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]) > .nc-ui-fx-fold { display: flex !important; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"][data-nc-max="row"] {
    flex: none;
    width: calc(${i("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${i("fx-card-width")} * 3);
  }
}
/* An FX card never makes the console taller (Peter, 2026-11-01: "don't make the vertical version higher. Pin the
   graphic at the top and scroll the freq controls behind it"). From 1024 px, where the fx area shares the strips'
   row, the area takes the row's height (the strips, the master and the meters set it) and adds none of its own; a
   card taller than that keeps its header (and an EQ graph under it) pinned at its top while the rest of its controls
   scroll under them, with a soft shade at the foot while there is more below. Focus scrolls a control clear of the
   pinned part (--nc-fx-pin-h, controls.js). A maximized card's row is unchanged (it has its one-line dial row);
   tablets and phones, where the fx cards have their own row, are unchanged. */
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) {
    height: 0;
    min-height: 100%;
    grid-auto-rows: minmax(0, 1fr);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) {
    min-height: 0;
    /* The pinned header carries the top padding: a sticky box sticks inside the scroller's padding. */
    padding-top: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;
    scroll-padding-top: var(--nc-fx-pin-h, ${i("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${i("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${i("module-gap")} * 3), 100% ${i("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${i("module-pad")} * -1) calc(${i("module-gap")} * -1);
    padding: ${i("stack-card-pad-y")} ${i("module-pad")} calc(${i("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${i("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${i("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${i("module-pad")} 0 0 var(--nc-fx-card-bg);
  }
}
/* Pages (define-module.js, a section's pageSize; Peter, 2026-11-01: "don't push to a second row, create a second
   'page' ... Needs to be obvious though"). From 769 px a paged fx area shows one page of cards in its row, never a
   second row, under a slim bar: ‹ at its left end, "1 / 3" in the middle, › at its right end. The cards of the other
   pages stay laid out but unseen, at their own width and taking no room (a negative margin as wide as the card), so
   the row is as tall as the tallest card of any page and turning a page never changes the Mix's height. Phones (up
   to 768 px) stack every card as before: no bar. */
.nc-fx-pager { display: none; }
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding-top: ${i("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${i("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${i("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${i("fx-card-width")};
    margin-inline-end: calc(${i("fx-card-width")} * -1);
    visibility: hidden;
    pointer-events: none;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page][data-nc-folded] {
    width: var(--nc-fx-fold-w);
    margin-inline-end: calc(var(--nc-fx-fold-w) * -1);
    padding-inline: 0;
  }
  /* A maximized card takes its page (its page-mates as fold columns beside it): the other pages stay out of it. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx[data-nc-off-page] { display: none; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-fx-pager {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${i("module-gap")};
    height: ${i("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${i("target-min")};
  height: ${i("target-min")};
  margin: 0;
  padding: 0;
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${i("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${i("divider")}; border-color: ${i("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${i("control-gap")} * 2.5);
  height: calc(${i("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${i("hairline")} * 2) calc(${i("hairline")} * 2) 0 0;
  transform: translateX(calc(${i("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${i("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${i("text")};
  white-space: nowrap;
}
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up.
   Every row is a named area and every child is placed by name (never by auto-placement), so a row taken out (the
   sends, display: none) can't shift the rows after it, in any engine. Three columns: a control-gap gutter each side
   of the content; only M and S span the gutters, so on touch two target-min boxes fit side by side inside the strip
   (they overflowed it, and Safari drew S under the next strip; Peter, 2026-11-01). No negative margins. */
.nc-strip {
  /* The M/S row: the slider pitch; target-min on touch (the buttons' full boxes, so they never reach the pan row). */
  --nc-strip-ms-row: ${i("slider-pitch")};
  --nc-strip-knob-row: calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")});
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  grid-template-columns: ${i("control-gap")} minmax(0, 1fr) ${i("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
}
.nc-strip > .nc-strip-hd { grid-area: hd; }
.nc-strip > .nc-strip-hacks { grid-area: hacks; }
.nc-strip > .nc-strip-ms { grid-area: ms; }
.nc-strip > .nc-strip-sends { grid-area: sends; }
.nc-strip > .nc-strip-pan { grid-area: pan; }
.nc-strip > .nc-strip-body { grid-area: body; }
.nc-strip > .nc-strip-db, .nc-strip > .nc-strip-db-input { grid-area: db; }
@media (pointer: coarse) {
  .nc-strip { --nc-strip-ms-row: ${i("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${i("hairline")} solid ${i("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${i("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${i("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${i(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${de("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${de("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${i("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${i("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${i("control-gap")};
  min-width: calc(${i("strip-width")} * 2.5);
  padding: calc(${i("control-gap")} * 2) calc(${i("control-gap")} * 2.5);
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: ${i("surface-page")};
  color: ${i("text")};
  font-size: ${i("label-size")};
}
.nc-strip-menu-title { color: ${i("text-sub")}; font-weight: ${i("label-weight")}; letter-spacing: ${i("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${i("control-gap")}; margin-bottom: ${i("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${i("control-gap")} * 4.5);
  height: calc(${i("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${i("hairline")};
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${i("text-sub")};
  font: inherit;
  font-size: ${i("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${i("hairline")} * 2) solid ${i("text")}; outline-offset: ${i("hairline")}; color: ${i("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${i("control-gap")} * 3);
  margin: 0;
  padding: ${i("control-gap")} 0;
  border: 0;
  border-top: ${i("hairline")} solid ${i("divider")};
  background: transparent;
  color: ${i("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${i("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${i("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${i("target-min")} * 0.7); height: calc(${i("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${i("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${i("stack-card-pad-y")} ${i("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${i("stack-card-pad-y")} ${i("module-pad")}; }
.nc-strip[data-nc-master] { width: ${i("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${i("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${i("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${i("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${i("danger")}; }
.nc-strip-remove:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  color: ${i("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${i("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${i("control-gap")}; left: ${i("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${i("control-gap")};
  right: ${i("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${i("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${i("control-gap")} * 1.5);
  height: calc(${i("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${i("hairline")}, transparent calc(${i("hairline")} * 1.5)) 0 0 / calc(${i("control-gap")} * 0.75) calc(${i("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${i("control-gap")} * -1);
    top: calc(${i("control-gap")} * -1);
    width: calc(${i("target-min")} / 2);
    height: calc(${i("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${i("strip-fold-width")};
  align-content: start;
  grid-template-columns: 0 minmax(0, 1fr) 0;
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". body ." ". db .";
}
/* Trim (a strip's trim, or the master's trimRow): a knob row at the top, under the name, before the Inserts; every row
   still named. trimHidden (the host's phones) takes the row out, the knob kept unseen. Folded, the trim row joins the
   M and S area. */
.nc-strip > .nc-strip-trim { grid-area: trim; display: flex; justify-content: center; align-items: flex-start; }
.nc-strip:not([data-nc-trim]) > .nc-strip-trim, .nc-strip[data-nc-folded] > .nc-strip-trim { display: none; }
.nc-strip[data-nc-trim] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-trim] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-trim][data-nc-sends-hidden] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" "ms ms ms" ". body ." ". db .";
}
.nc-strip[data-nc-folded] > .nc-strip-hd { justify-content: center; }
/* The name stays in the row, unseen and zero wide, so the row keeps the open strips' height and the meters line up. */
.nc-strip[data-nc-folded] > .nc-strip-hd > .nc-strip-name { visibility: hidden; width: 0; flex: 0 0 0; }
.nc-strip[data-nc-folded] > .nc-strip-hd > .nc-strip-remove,
.nc-strip[data-nc-folded] > .nc-strip-hacks,
.nc-strip[data-nc-folded] > .nc-strip-sends,
.nc-strip[data-nc-folded] > .nc-strip-pan,
.nc-strip[data-nc-folded] > .nc-strip-db,
.nc-strip[data-nc-folded] > .nc-strip-db-input,
.nc-strip[data-nc-folded] .nc-strip-body > .nc-fader,
.nc-strip[data-nc-folded] .nc-strip-body > .nc-scale { display: none; }
.nc-strip[data-nc-folded] > .nc-strip-ms {
  grid-auto-flow: row;
  grid-template-rows: none;
  grid-auto-columns: ${i("slider-pitch")};
  grid-auto-rows: ${i("slider-pitch")};
  gap: ${i("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${i("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${i("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${i("control-gap")}; }
.nc-strip-fold { gap: ${i("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${i("label-size")}; font-weight: ${i("label-weight")}; letter-spacing: ${i("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${i("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${i("fader-cap-height")};
  height: ${i("control-gap")};
  background: linear-gradient(${i("divider")}, ${i("divider")}) center / 100% ${i("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${i("control-gap")}));
  width: ${i("control-gap")};
  height: ${i("control-gap")};
  border-radius: 50%;
  background: ${i("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${i("fader-cap-height")};
  height: ${i("control-gap")};
  background: var(--nc-strip-cap, ${i("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${i("slider-pitch")};
  grid-template-rows: ${i("slider-pitch")};
  column-gap: ${i("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${i("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${i("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${i("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${de("divider")}: ${i("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${i("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${i("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${i("hairline")} solid color-mix(in oklab, ${i("text-sub")} 50%, ${i("strip-divider")});
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("strip-hacks-text")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${i("text")}; border-color: ${i("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${i("fader-cap-master")};
  border-color: ${i("fader-cap-master")};
  color: ${i("surface-page")};
}
.nc-hacks:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${i("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${i("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${i("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${i("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${i("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-track")} calc(var(--knob-from, 135) * 1deg), ${i("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${i("label-size")};
  line-height: ${i("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${i("fader-cap-width")} auto auto;
  grid-template-rows: ${i("clip-size")} ${i("fader-height")};
  justify-content: center;
  column-gap: ${i("control-gap")};
  row-gap: ${i("control-gap")};
  padding-block: calc(${i("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${i("font-readout")};
  font-size: ${i("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${i("text-sub")};
}
.nc-scale-tick {
  position: absolute;
  right: 0;
  top: calc((1 - var(--tick-pos, 0)) * 100%);
  transform: translateY(-50%);
  line-height: 1;
  white-space: nowrap;
}
/* The console fader: a slot and a flat cap with a line across its centre. The cap follows the hand: no transition. */
.nc-fader {
  position: relative;
  width: ${i("fader-cap-width")};
  height: 100%;
  cursor: ns-resize;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  transition: none;
}
.nc-fader-track {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: ${i("rule-strong")};
  transform: translateX(-50%);
  background: ${i("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${i("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${i("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${i("hairline")};
  transform: translateY(-50%);
  background: ${i("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${i("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${i("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${i("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${i("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${i("clip-size")};
  padding: 0;
  border: 0;
  background: ${i("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${i("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${i("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-meter-bars { display: flex; gap: ${i("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${i("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${i("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${i("meter-peak")}; }
.nc-meter-rms { background: ${i("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${i("rule-strong")} solid ${i("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${i("hairline")}; height: ${i("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${i("fx-level-bar")}; overflow: hidden; background: ${i("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${i("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${i("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${i("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${i("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${i("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${i("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${i("divider")}; text-underline-offset: ${i("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${i("hairline")} solid ${i("accent")};
  border-radius: 0;
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${i("strip-width")};
  margin-inline-start: ${i("module-gap")};
  border: ${i("hairline")} dashed ${i("divider")};
  color: ${i("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${i("text")}; border-color: ${i("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${i("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${i("font-readout")}; font-size: ${i("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
}
/* The select covers the slot (fully transparent, not dimmed), so a click anywhere on it opens the list. */
.nc-strip-add-select {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  font-size: ${i("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-db:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
/* Phones and tablets: the strips scroll in their row with the master pinned at the right; the FX cards go under them
   (three across on tablets, stacked on phones). */
@media (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] {
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas: "strips meters master" "fx fx fx";
  }
}
@media (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-auto-flow: row; grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
/* Tablets (769-1023 px): the fx row is full width under the strips; with a card folded, the open ones share the rest. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx:not([data-nc-folded]) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
  }
  /* Paged: a third each, so a part-filled last page keeps the columns; with a card folded on the page the open
     ones share the rest. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged][data-nc-paged] > .nc-ui-fx:not([data-nc-folded], [data-nc-off-page]) {
    flex: 0 0 calc(100% / 3);
    width: auto;
    min-width: 0;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged][data-nc-paged]:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page])) > .nc-ui-fx:not([data-nc-folded], [data-nc-off-page]) {
    flex: 1 1 0;
  }
}
@media (max-width: 768px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: minmax(0, 1fr); }
  /* Phones: the strips and the master keep their row; the meters get their own row under it, above the FX. */
  .nc-module-body[data-nc-layout="console"] {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "strips master" "meters meters" "fx fx";
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
    border-inline-end: 0;
    border-top: ${i("hairline")} solid ${i("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${i("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${i("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${i("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${i("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${i("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${i("module-pad-x-desktop")};
    padding-bottom: ${i("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${i("stack-card-pad-y")} ${i("module-pad-x-desktop")} ${i("module-pad-y-desktop")};
  }
}
/* Pinned to its containing block's corner at zero size, so wherever it sits in a control (after a long label or
   note, in an unpositioned box) it can never reach past the page edge. It is empty and never shown; it only carries
   the accent and the UI font for token reads. */
.nc-token-probe {
  position: absolute;
  inset: 0 auto auto 0;
  width: 0;
  height: 0;
  overflow: hidden;
  background: ${i("accent")};
  font-family: ${i("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${i("page-pad-y-md")} ${i("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${i("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${i("page-pad-y-md")} * -1); left: calc(${i("page-pad-x-md")} * -1); right: calc(${i("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${i("header-gap")};
  padding-inline: ${i("module-pad")};
}
.nc-module[data-nc-compact][data-nc-slim] .nc-module-hd { display: contents !important; }
/* A full-width module's row is its own: minimized it keeps the whole width, not the slim side column. */
.nc-stack:has(> .nc-module[data-nc-compact]) { grid-template-columns: minmax(0, 1fr) !important; }
.nc-module[data-nc-compact][data-nc-slim] .nc-title { flex: none; }
.nc-module[data-nc-compact][data-nc-slim] .nc-slim {
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 0 !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start;
  text-align: left;
}
.nc-module[data-nc-compact][data-nc-slim] .nc-slim-lines {
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* Hosted (an instrument inside the Studio, html[data-nc-hosted]): the Studio already names it on its tab, so the
   title block and its band go; the header keeps only its controls (Master, Save, Load...) on one short row. */
html[data-nc-hosted] .nc-page { padding-top: ${i("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${i("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${i("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${i("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${i("target-min")}; }
  .nc-snap { font-size: ${i("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${i("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${i("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${i("page-pad-x-xl")} * -1); right: calc(${i("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${i("hairline")} solid ${i("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${i("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${i("target-min")};
  }
  .nc-snap { font-size: ${i("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${i("module-pad-y-desktop")} * -1);
    padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${i("module-pad-y-desktop")} * -1);
    padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${i("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${i("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${i("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    padding-inline: ${i("module-pad-x-desktop")};
  }
}
/* 1024-1279 px (item C): four open columns left the lead about 240 px (3.5 px step cells). With a lead and three
   open modules, the last two share the last column (stacked), so the lead is 53fr against 23.333fr and every lane
   stays on one row with 18 px+ cells; the outer columns keep their width. */
@media (min-width: 1024px) and (not (min-width: 1280px)) {
  /* Three open columns (Rhythm: Transport, Pattern, Filter) get the same 53fr lead. */
  .nc-stack[data-nc-layout="adjacent"] { --astrid-lead-fr: 53fr; }
  .nc-stack[data-nc-layout="adjacent"][data-nc-stack-last="true"] {
    grid-template-columns: minmax(0, 23.333fr) minmax(0, 53fr) minmax(0, 23.333fr);
  }
  .nc-stack[data-nc-stack-last="true"] > .nc-module { grid-row: 1 / span 2; }
  .nc-stack[data-nc-stack-last="true"] > .nc-module:nth-last-child(2) {
    grid-column: 3;
    grid-row: 1;
    border-inline-end: 0;
    border-bottom: ${i("hairline")} solid ${i("divider")};
  }
  .nc-stack[data-nc-stack-last="true"] > .nc-module:last-child { grid-column: 3; grid-row: 2; }
}
/* From 1280 px the lead (Rhythm's step grid) widens from ASTRID's 30fr to 48fr so its 16 cells are 18 px+ on one row. */
@media (min-width: 1280px) {
  .nc-stack[data-nc-layout="adjacent"] {
    --astrid-lead-fr: 48fr;
    --astrid-rest-fr: 21.333fr;
  }
}
@media (max-width: 768px) {
  /* Phones: rows are the overview and lane picker; the selected lane edits on 4x4 pads (one row = one beat). */
  .nc-row-dice { display: none; }
  .nc-pads-head {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: ${i("module-gap")};
    padding-block: ${i("control-gap")};
    background: ${i("surface-page")};
    border-bottom: ${i("hairline")} solid ${i("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${i("module-gap")};
    touch-action: pan-y;
  }
  .nc-steps { pointer-events: none; }
  .nc-steps .nc-hit { display: none; }
  .nc-row { cursor: pointer; }
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: ${i("slot-span")};
    height: ${i("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${i("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (max-width: 360px) {
  .nc-label, .nc-name, .nc-note, .nc-title { text-overflow: ellipsis; }
}
/* Phones in landscape (Peter, 2026-11-01: "these sections can be side by side in landscape mode"): a short, wide
   screen puts the modules side by side, as many columns as fit at two slim columns wide (two or three on a phone),
   each module at its own height, in reading order; the lead (a step grid) takes two columns and two rows. Tablets and
   desktops are unchanged. An instrument inside the Studio has a frame as tall as its page, so its own media never
   reads as landscape: the Studio sets html[data-nc-landscape] on the frame when the Studio's screen is (LANDSCAPE_PHONE). */
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${nc("")}
}
@media (max-width: 1023px) {
${nc("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Po("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Po("")}
}
@media (max-width: 1023px) {
${Po("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${i("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${i("fill-panel")};
  border-radius: ${i("fill-radius")};
  box-shadow: inset 0 0 0 ${i("fill-gutter")} ${i("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${i("fill-radius")} ${i("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${i("fill-cell")};
  border-color: ${i("fill-cell")};
  border-radius: ${i("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${i("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${i("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 9%, ${i("fill-panel")});
  border-radius: ${i("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 14%, ${i("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${i("fill-panel")}) 14%, ${i("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${i("fill-panel")}; }
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}var Ro=null,Rb="nc-ui-fallback";function Gu(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Ro&&Ro.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Rb} {
${Pb()}
}
`,e.head.append(t),Ro=t}var ea=null,Db=0,Ob=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Ku=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Ob,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Ku(document);function dt(e){return Wu(e).then(t=>!!t.ok)}function Wu({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:o="Cancel",danger:s=!1,root:l,returnFocus:d,signal:u},c){if(ea||u?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,h=Ku(p),b=l??p.body,m=p.defaultView??globalThis,v=`nc-ui-confirm-${++Db}`,f=(Y,ke,$e)=>{let et=p.createElement(Y);return et.className=`nc-ui-confirm${ke}`,$e!=null&&(et.textContent=$e),et},y=f("div","-layer");y.dataset.state="enter";let E=f("div","");E.setAttribute("role","alertdialog"),E.setAttribute("aria-modal","true"),E.setAttribute("aria-labelledby",`${v}-t`);let k=f("h2","-title",e);k.id=`${v}-t`;let L=f("p","-body",t);L.id=`${v}-b`;let x=n.map((Y,ke)=>{let $e=f("p","-body",Y?.text??Y);return $e.id=`${v}-b${ke}`,Y?.tone==="danger"&&($e.dataset.tone="danger"),$e});E.setAttribute("aria-describedby",[L,...x].map(Y=>Y.id).join(" "));let g=a&&f("button","-extra",a.label);g&&(g.type="button",g.dataset.ncConfirm="extra",g.addEventListener("click",()=>a.onAction?.()));let w=f("div","-actions"),A=(Y,ke)=>{let $e=f("button","-btn",Y);return $e.type="button",$e.dataset.ncConfirm=ke,$e.addEventListener("click",()=>ye(ke==="ok")),$e},T=A(o,"cancel"),D=A(r,"ok");s&&(D.dataset.danger="true"),w.append(T,D);let[$,S]=c?.(f,D)??[];E.append(k,L,...x,...$?[$]:[],...g?[g]:[],w);let N=[S,g,T,D].filter(Boolean);y.append(E);let P={layer:y};ea=P;let I=d??p.activeElement,V=[];for(let Y of b.children)Y.hasAttribute("inert")||(Y.setAttribute("inert",""),V.push(Y));let G=()=>{if(ea!==P)return;b.append(y),(S??T).focus({preventScroll:!0});let Y=m.requestAnimationFrame?.bind(m)??(ke=>setTimeout(ke,16));Y(()=>Y(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};h?h.then(G):G();let q=!1;y.addEventListener("pointerdown",Y=>{q=Y.target===y}),y.addEventListener("click",Y=>{Y.target===y&&q&&ye(!1),q=!1});let H=Y=>{if(Y.stopImmediatePropagation(),Y.key==="Escape")Y.preventDefault(),ye(!1);else if(Y.key==="Tab"){Y.preventDefault();let ke=N.filter(et=>!et.disabled),$e=ke.length;ke[(ke.indexOf(p.activeElement)+(Y.shiftKey?$e-1:1))%$e].focus()}else Y.key==="Enter"&&(Y.preventDefault(),p.activeElement===g?g.click():p.activeElement===T?ye(!1):D.disabled||ye(!0))},re=Y=>Y.stopImmediatePropagation();m.addEventListener("keydown",H,!0),m.addEventListener("keyup",re,!0);let be=()=>ye(!1);u?.addEventListener("abort",be);let se,Ce=new Promise(Y=>{se=Y});function ye(Y){if(ea!==P)return;ea=null,m.removeEventListener("keydown",H,!0),m.removeEventListener("keyup",re,!0),u?.removeEventListener("abort",be);for(let gt of V)gt.removeAttribute("inert");y.dataset.state="closing",I?.isConnected&&typeof I.focus=="function"&&I.focus({preventScroll:!0});let ke=m.getComputedStyle?.(y),$e=Math.max(0,...String(ke?.transitionDuration??"").split(",").map(gt=>Number.parseFloat(gt)*(gt.trim().endsWith("ms")?1:1e3)||0)),et=()=>y.remove();y.addEventListener("transitionend",gt=>gt.target===y&&et()),setTimeout(et,$e+50),se({ok:Y,value:S?.value.trim()})}return Ce}function zb(e){let t=e.field??{};return Wu(e,(n,a)=>{let r=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),o),[r,o]}).then(n=>n.ok?n.value:null)}function gs(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Yu=new WeakMap,ac=.25;function Bb(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=f=>Math.min(1,Math.max(0,f)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let y=u(f);y!==o&&(o=y,c(),l?.(y))},h=0,b=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let y=n.getBoundingClientRect();f.target!==r&&y.height>0&&p(1-(f.clientY-y.top)/y.height),h=f.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!b)return;let y=n.getBoundingClientRect().height||1,E=(h-f.clientY)/y*(f.shiftKey?ac:1);h=f.clientY,p(o+E)});let m=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",m),n.addEventListener("pointercancel",m),n.addEventListener("lostpointercapture",m),n.addEventListener("dblclick",f=>{f.preventDefault(),d?.()}),n.addEventListener("keydown",f=>{let y=f.shiftKey?s*ac:s,E={ArrowUp:o+y,ArrowRight:o+y,ArrowDown:o-y,ArrowLeft:o-y,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in E&&(f.preventDefault(),p(E[f.key]))});let v={el:n,get value(){return o},get dragging(){return b},set(f){b||(o=u(Number(f)||0),c())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(d=f.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),Yu.set(n,v),v}function _b(e){return Yu.get(e)}var Xu=new WeakMap,jb=.2,qb=1.5,Vb=.5;function Hb(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function rc(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Hb(a.getComputedStyle(e).getPropertyValue(de(t)),n)}function Ub(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let v=0;v<n;v++){let f=t.createElement("span");f.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let E=t.createElement("span");E.className="nc-meter-rms";let k=t.createElement("span");k.className="nc-meter-hold",f.append(y,E,k),o.append(f),s.push({peak:y,rms:E,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,h=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},b=(v,f,y,E)=>{let k=Math.round(E*1e3)/1e3;y[f]!==k&&(y[f]=k,v.style.transform=f==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};r.addEventListener("click",()=>{m.clear(),d?.()});let m={el:a,get clipped(){return u},update(v,f){c<0&&(c=rc(a,"motion-meter-fall",jb)),p<0&&(p=rc(a,"motion-meter-hold",qb));let y=Math.max(0,Math.min(.25,Number(f)||0)),E=c>0?Math.exp(-y/c):0;s.forEach((k,L)=>{let x=v[L]??v[0]??{peak:0,rms:0},g=Math.min(1,Math.max(0,Number(x.peak)||0)),w=Math.min(g,Math.max(0,Number(x.rms)||0));x.over&&m.clip(),k.level.peak=g>=k.level.peak?g:g+(k.level.peak-g)*E,k.level.rms=w>=k.level.rms?w:w+(k.level.rms-w)*E,k.holdAge+=y,g>=k.holdAt?(k.holdAt=g,k.holdAge=0):k.holdAge>p&&(k.holdAt=Math.max(g,k.holdAt-Vb*y)),b(k.peak,"peak",k.shown,k.level.peak),b(k.rms,"rms",k.shown,k.level.rms),b(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,h())},clear(){u=!1,h()},reset(){for(let v of s)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,b(v.peak,"peak",v.shown,0),b(v.rms,"rms",v.shown,0),b(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,h()},configure(v){v.onClear&&(d=v.onClear)}};return h(),m.reset(),Xu.set(a,m),m}function Ju(e){return e?Xu.get(e):void 0}var Gb=3,Kb=new Set(["freq","q","rate","time","log"]);function bs(e,t,n){return!e||!Kb.has(e)||!(n>t)?"linear":t>0?"log":"power"}function so(e,t,n){return bs(e,t,n)!=="linear"}function Nr(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=bs(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Qu(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=bs(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**Gb:r)}function Zu(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function ys(e,t,n,a){return Math.round(Nr(e,t,n,a)*1e3)}function wi(e,t,n,a,r){return Zu(Qu(e,t,n,Number(a)/1e3),t,n,r)}function Wb(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function ep(e,t,n,a,r,o=!1,s){let l=ys(e,t,n,a),d=Wb(l,r,o);if(d===null)return null;let u=wi(e,t,n,d,s),c=Math.sign(d-l),p=Zu(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=wi(e,t,n,d,s);return u}function oc(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function ic(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Yb(e,t,n,a=n/6){let r=e.some(c=>c===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+ic(t[h]),0),l=s>0?o/s:0,d=e.map(c=>c===null?0:Math.min(o,ic(c)*l));if(r){let c=d.reduce((h,b)=>h+b,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function Xb(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Nt(e){return Math.max(0,Math.min(1,e))}function tp(e,t){let{ctx:n,w:a,h:r}=Xb(e);if(!n)return;n.clearRect(0,0,a,r);let o=Ib(e);if(t.paint==="swatch"){let d=Ae(e,"accent"),u=Ae(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){Zb(n,a,r,t,e,o);return}if(t.paint==="filter"){let d=t.mode??"lp",u=Ae(e,Hu(d)),c=Ae(e,"divider"),p=Nt(t.cutoff??.5),h=.08+(1-Nt(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let b=0;b<=a;b++){let m=b/Math.max(1,a),v=0;d==="lp"?v=m<p?1:Math.max(0,1-(m-p)/h):d==="hp"?v=m>p?1:Math.max(0,1-(p-m)/h):v=Math.max(0,1-Math.abs(m-p)/h);let f=r*.78-v*r*.62;b===0?n.moveTo(b,f):n.lineTo(b,f)}n.strokeStyle=u,n.stroke(),n.fillStyle=Ae(e,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=Ae(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,h]=Yb([d,u],t.max??[1,4],a),b=2,m=r-1;n.beginPath(),n.moveTo(c,m),n.lineTo(p,b);let v=Math.max(1,Math.ceil(h-p));for(let f=1;f<=v;f++){let y=f/v;n.lineTo(p+(h-p)*y,m-(m-b)*Math.exp(-4.6*y)*(1-y*.01))}n.lineTo(h,m),n.lineTo(a,m),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=Ae(e,"accent"),h=Ae(e,"text-sub"),b=r/2;n.fillStyle=Ae(e,"accent-soft"),n.fillRect(Nt(u)*a,0,(Nt(c)-Nt(u))*a,r),n.strokeStyle=Ae(e,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(a,b),n.stroke();let m=Math.floor(d.length/2);for(let v=0;v<m;v++){let f=(v+.5)/m*a,y=Math.max(-1,Math.min(1,d[v*2]??0)),E=Math.max(-1,Math.min(1,d[v*2+1]??0)),k=(v+.5)/m;n.strokeStyle=k>=u&&k<=c?p:h,n.beginPath(),n.moveTo(f,b-E*(b-1)),n.lineTo(f,b-y*(b-1)+.5),n.stroke()}n.strokeStyle=p;for(let v of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(Nt(v)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Ae(e,"text"),n.fillRect(Math.round(Nt(t.position)*(a-1)),0,1,r)),m||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,b+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=Nt(t.level??0);n.fillStyle=Ae(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=Ae(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=Ae(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=Ae(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=Ae(e,"accent")}var fa=20,xi=2e4,Do=24,sc=-60;function Jb(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,b=1-l,m=2*Math.PI*a/r,v=(k,L,x)=>k+L*Math.cos(m)+x*Math.cos(2*m),f=(k,L)=>-(k*Math.sin(m)+L*Math.sin(2*m)),y=Math.hypot(v(d,u,c),f(u,c)),E=Math.hypot(v(p,h,b),f(h,b));return E>0?y/E:0}function Qb(e,t){return Math.log(Math.max(fa,Math.min(xi,e))/fa)/Math.log(xi/fa)*t}function lc(e,t,n){let a=Math.max(sc,Math.min(Do,e));return t+(Do-a)/(Do-sc)*(n-t)}function Zb(e,t,n,a,r,o){let s=a.mode??"lp",l=Ae(r,Hu(s)),d=Ae(r,"divider"),u=Ae(r,"text-sub"),c=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),b=a.q??Math.SQRT1_2,m=Math.round(lc(0,p,h))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,m),e.lineTo(t,m),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let f=fa*(xi/fa)**(v/Math.max(1,t)),y=a.open?1:Jb(s,a.hz,b,f,a.sampleRate),E=lc(20*Math.log10(Math.max(1e-5,y)),p,h);v===0?e.moveTo(v,E):e.lineTo(v,E)}if(e.strokeStyle=l,e.stroke(),!a.open){let v=Math.round(Qb(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,p),e.lineTo(v,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function it(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function ey(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var ln=20,Oa=2e4,vs=Math.log(Oa/ln),ki=32,ty=250,ny=-100,ay=1200,ry=4.5,cc=-6,Zt=-96,oy=48,dc=[100,1e3,1e4],iy=[6,12];function Sn(e,t){return Math.log(Math.max(ln,Math.min(Oa,e))/ln)/vs*t}function ur(e,t){return ln*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*vs)}function _t(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function $i(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var np=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function sy(e,t,n,a){let r=n?3:1,o=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??ln,Math.min(e.maxHz??Oa,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function ws(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function ly(e,t,n,a,r,o,s,l,d){let u=d?.25:1,c={},p=Math.max(1,o/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/ws(e))),e.moveHz){let h=t.hz*Math.exp(n*u/Math.max(1,r)*vs);c.hz=Math.max(e.minHz??ln,Math.min(e.maxHz??Oa,h))}return c}function cy(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),d=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var Le=new WeakMap;function dy(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let d of e.bands)a.append(uy(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!lp(n)||d.button>0)return;let u=sp(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),Le.set(n,{control:e,cache:null,spec:null,active:null}),rp(n,e),n}function ap(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function uy(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},o=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=o();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",It(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=o(),h=Le.get(e);if(!c||!p||!h?.box)return;let{w:b,h:m,pad:v}=h.box;c.onBand(p.id,ly(p,s.start,u.clientX-s.x,u.clientY-s.y,b,m,c.range??18,v,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&It(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=o();if(!c||!p)return;let h=sy(p,u.key,u.shiftKey,c.range??18);h&&(u.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),It(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=o();if(!c||!p?.moveQ)return;u.preventDefault();let h=u.timeStamp;(!d||h-d.t>400)&&(d={q:p.q,t:h});let b=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-b/240))),d.t=h,c.onBand(p.id,{q:d.q}),It(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>It(e,t.id)),a.addEventListener("focus",()=>It(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&It(e,null)}),a.addEventListener("blur",()=>{s||It(e,null)}),a}function It(e,t){let n=Le.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?On(e):xs(e)}function xs(e){let t=Le.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(m=>m.id===t.active):null;for(let m of e.querySelectorAll(".nc-eq-node"))m instanceof HTMLElement&&(a&&m.dataset.band===a.id?m.dataset.active="true":delete m.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,np(a.db)];a.kind==="peak"?r.push($i(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${$i(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(py(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,d=Sn(a.hz,o),u=_t(a.db*ws(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-c,d-c/2)),b=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(b)}px`}function py(e,t){return e.bands.indexOf(t)%3+1}function rp(e,t){let n=Le.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ks(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=ap(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${np(r.db)}, ${$i(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),On(e),yy(e)}function op(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function ip(e){return{curve:it(e,"eq-curve"),fill:it(e,"eq-fill"),quiet:it(e,"text-sub"),grid:it(e,"eq-grid"),zero:it(e,"divider"),label:it(e,"text-sub"),spectrum:it(e,"eq-spectrum"),bands:[it(e,"eq-band-1"),it(e,"eq-band-2"),it(e,"eq-band-3")]}}function fy(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function On(e){Le.has(e)&&ks(e);let t=Le.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=op(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:o,h:s,pad:l},t.colours=ip(e);let u=t.colours,c=fy(a,o);if(!t.cache||t.cache.key!==c){let L=Math.max(64,Math.ceil(o)+1),x=new Float64Array(L);for(let w=0;w<L;w++)x[w]=ur(w/(L-1)*o,o);let g=null;try{g=typeof a.response=="function"?a.response(x):null}catch{g=null}t.cache={key:c,freqs:x,total:g?.total??new Float64Array(L),bands:g?.bands??[]}}r.clearRect(0,0,o,s);let p=ey(e),h=a.on!==!1;hy(r,o,s,d,l,u,p);let{freqs:b,total:m,bands:v}=t.cache,f=Array.from(b,L=>Sn(L,o)),y=_t(0,s,d,l);v.forEach((L,x)=>{if(!L||!L.some(A=>Math.abs(A)>.05))return;let g=h?u.bands[x%3]:u.quiet,w=Array.from(L,A=>_t(A,s,d,l));r.save(),t.active&&a.bands[x]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=g,uc(r,f,w,y)),r.globalAlpha=h?.75:.4,r.strokeStyle=g,r.lineWidth=.75,Oo(r,f,w),r.restore()});let E=Array.from(m,L=>_t(L,s,d,l)),k=h?u.curve:u.quiet;r.save(),r.fillStyle=h?u.fill:u.quiet,r.globalAlpha=h?.2:.08,uc(r,f,E,y),r.restore(),r.save(),r.strokeStyle=h?u.fill:k,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,Oo(r,f,E)),r.globalAlpha=1,r.strokeStyle=k,r.lineWidth=1.25,Oo(r,f,E),r.restore(),my(e),xs(e)}function hy(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<ln||c>Oa)continue;let p=Math.round(Sn(c,t))+.5;e.globalAlpha=dc.includes(c)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of iy)if(!(d>a))for(let u of[1,-1]){let c=Math.round(_t(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(_t(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of dc){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=Sn(d,t)+3;e.fillText(u,p+c+2>t?Sn(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=_t(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function Ir(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function Oo(e,t,n){e.beginPath(),Ir(e,t,n),e.stroke()}function uc(e,t,n,a){e.beginPath(),Ir(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function sp(e){return e.closest("[data-nc-maxable]")}function lp(e){let t=sp(e);return!!t&&!t.hasAttribute("data-nc-max")}function ks(e){let t=lp(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=Le.get(e);n?.active&&(n.active=null,xs(e))}return t}function my(e){ks(e);let t=Le.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=ap(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Sn(s.hz,n).toFixed(1)}px`,l.style.top=`${_t(s.db*ws(s),a,o,r).toFixed(1)}px`)}}function gy(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=ur(u,t),h=ur(c,t),b=ur(d/(e-1)*t,t);o[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,h/r),l[d]=ry*Math.log2(b/1e3)}return{lo:o,hi:s,tilt:l}}function by(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function yy(e){let t=Le.get(e);if(t){if(!t.control.spectrum){dp(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=Le.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),Ei(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Ei(e)}}function Ei(e){let t=Le.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){cp(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ai(e),n.onVis||(n.onVis=()=>Ei(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Si(e,!1)}function Ai(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Si(e,t){let n=Le.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,zo(e,Ai(e))),ty):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,zo(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,zo(e,Ai(e))),ki))}function cp(e){let t=Le.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function dp(e){let t=Le.get(e)?.spec;if(!t)return;cp(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=Le.get(e);n&&(n.spec=null)}function zo(e,t){let n=Le.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){dp(e);return}if(!a.analyser)return;if(t-a.last<ki-4&&!a.idle){Si(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):ki/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=op(o);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...gy(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=oy*r,{lo:b,hi:m,tilt:v}=a.map;for(let y=0;y<u;y++){let E=by(a.buf,b[y],m[y]);E>p&&(p=E);let k=E+v[y],L=a.disp[y]-h;a.disp[y]=k>L?k:L}p>ny&&(a.loud=t);let f=t-a.loud>ay;s.clearRect(0,0,l,d),(!f||a.disp.some(y=>y>Zt))&&vy(s,l,d,a.disp,n.colours??ip(e)),a.idle=f&&!a.disp.some(y=>y>Zt),Si(e,a.idle)}function vy(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),d=u=>{let c=a[Math.max(0,Math.min(o-1,u))];return Number.isFinite(c)?c:Zt};for(let u=0;u<o;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(Zt,Math.min(cc,Number.isFinite(c)?c:Zt))-Zt)/(cc-Zt);s[u]=u/(o-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Ir(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Ir(e,s,l),e.stroke(),e.restore()}var Ze=new WeakMap,up=450,wy=6,xy=33,Bo=24,ky="http://www.w3.org/2000/svg";function $y(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Ey(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Ay(e,t,n,a,r){let o=e.slice();if(t===a)return o[a]=r,o;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let d=(l-t)/(a-t);o[l]=Math.round((n+(r-n)*d)*100)/100}return o}function Sy(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function en(e,t){let n=document.createElementNS(ky,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function pp(e){let t=en("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(en("path",{d:e})),t}function My(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,o,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Ze.set(n,d),Ly(n,a),Cy(n,s),fp(n,e),n}function nt(e){let t=Ze.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Ty(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function _o(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=Ty(e);return{i:Ey(t.clientX,a),level:$y(t.clientY-n.top,n.height)}}function Ly(e,t){let n=Ze.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let s=nt(e);if(!s||o.button>0||!s.steps.length)return;o.preventDefault(),Fr(e),t.setPointerCapture?.(o.pointerId);let l=_o(t,o),d=s.steps.map(u=>u.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,pc(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let u=n.drag;!u||u.moved||(u.long=!0,nt(e)?.onLevels(u.start.slice(),!0),jo(e,u.i))},up)}),t.addEventListener("pointermove",o=>{let s=n.drag;if(!s||s.id!==o.pointerId||s.long||!s.moved&&Math.hypot(o.clientX-s.x,o.clientY-s.y)<wy)return;s.moved=!0,a();let l=_o(t,o);pc(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),s.long||nt(e)?.onLevels(s.levels.slice(),!0),Mi(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,s.long||nt(e)?.onLevels(s.start.slice(),!0),Mi(e,-1))}),t.addEventListener("contextmenu",o=>{nt(e)?.onShape&&(o.preventDefault(),jo(e,_o(t,o).i))}),t.addEventListener("keydown",o=>{let s=nt(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),u=s.steps[d].level,c=p=>{let h=s.steps.map(b=>b.level);h[d]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(h,!0)};switch(o.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":c(u+(o.shiftKey?.01:.05));break;case"ArrowDown":c(u-(o.shiftKey?.01:.05));break;case"PageUp":c(u+.25);break;case"PageDown":c(u-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;jo(e,d);break;default:return}o.preventDefault(),Ti(e)}),t.addEventListener("focus",()=>Ti(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function pc(e,t,n,a,r,o){let s=Ze.get(e).drag;s&&(s.levels=Ay(s.levels,t,n,a,r),Mi(e,a,s.levels[a]),nt(e)?.onLevels(s.levels.slice(),o))}function Mi(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Ti(e){let t=Ze.get(e),n=e.querySelector(".nc-lsteps-plot"),a=nt(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",Sy(a,r))}function Cy(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Fr(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),Ze.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Fr(e)}}function jo(e,t){let n=nt(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let o=Ze.get(e);o.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let b of n.shapes??[]){let m=document.createElement("button");m.type="button",m.setAttribute("role","menuitemradio"),m.setAttribute("aria-checked",n.steps[t]?.shape===b.value?"true":"false"),b.icon&&m.append(pp(b.icon)),m.append(document.createTextNode(b.label)),m.addEventListener("click",()=>{nt(e)?.onShape?.(t,b.value),Fr(e,!0)}),a.append(m)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),u=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=u?u.left+u.width/2-d.left:0,h=Math.max(0,Math.min(d.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Fr(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Ze.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function Ny(e,t){let n=Ze.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let o=0;o<t;o++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(o),o%4===0&&o>0&&(s.dataset.beat="true");let l=en("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(en("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),en("path",{class:"nc-lsteps-env",d:""}),en("path",{class:"nc-lsteps-top",d:""}),en("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let d=document.createElement("span");o%4===0&&(d.textContent=String(o+1)),o%4===0&&o>0&&(d.dataset.beat="true"),r.append(d)}}}function fp(e,t){let n=Ze.get(e);if(!n)return;n.control=t;let a=t.steps.length;Ny(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((b,m)=>{let v=s[m];if(!v)return;let f=String((m%2?1-o:o)*2);v.style.setProperty("--nc-lsteps-grow",f),l[m]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&m>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=b.level<=0?"true":"false";let y=Math.max(0,Math.min(1,b.level)),E=v.querySelector(".nc-lsteps-level");E.setAttribute("y",String(100-y*100)),E.setAttribute("height",String(y*100));let k=t.curve?t.curve(m,Bo):null,L="M0 100",x="";for(let g=0;g<=Bo;g++){let w=k?Math.max(0,Math.min(1,k[g]??y)):y,A=g/Bo*100,T=100-w*100;L+=` L${A.toFixed(2)} ${T.toFixed(2)}`,x+=`${g?" L":"M"}${A.toFixed(2)} ${T.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${L} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",x)});let d=e.querySelector(".nc-lsteps-shapes"),u=(t.shapes??[]).map(b=>`${b.value}:${b.label}`).join();if(u!==n.shapeKey){n.shapeKey=u,d.textContent="";for(let b of t.shapes??[]){let m=document.createElement("button");m.type="button",m.className="nc-lsteps-shape",m.setAttribute("role","tab"),m.dataset.shape=String(b.value),b.icon&&m.append(pp(b.icon)),m.append(document.createTextNode(b.label)),m.addEventListener("click",()=>nt(e)?.onShapeAll?.(b.value)),d.append(m)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,h=t.steps.slice(0,c).every(b=>b.shape===p);for(let b of d.querySelectorAll(".nc-lsteps-shape")){let m=h&&b.dataset.shape===String(p);b.setAttribute("aria-selected",m?"true":"false"),b.tabIndex=m||!h&&b===d.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Ti(e),n.last=-2,Iy(e)}function Iy(e){let t=Ze.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&qo(e,null);return}let a=0,r=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){qo(e,null);return}o-a>=xy&&(a=o,qo(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function qo(e,t){let n=Ze.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=r?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var Fy=.8912509381337456,Li=32,Py=250,Ry=1200,Dy=.2,hp=1.5;function Oy(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function zy(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Pr=new WeakMap,fc=new WeakMap;function hc(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function By(e){let t=fc.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=Pr.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),ha(s))}kn(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)ha(r);kn(t)}),fc.set(e,t),t}var mp=e=>e.els.some(t=>t.isConnected);function _y(e){if(!e.loop.io)return mp(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ha(e){let t=!e.dead&&!!e.source&&_y(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=$s(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Ii(e))}function $s(e){return e.doc.defaultView?.performance?.now()??Date.now()}function kn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){gp(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=$s(e)),!e.raf&&!e.timer&&Ci(e,!1)}function Ci(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>mc(e,$s(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Py):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,mc(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Li)}function gp(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function mc(e,t){if(t-e.last<Li-4&&!e.idle&&e.last){Ci(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Li/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!mp(o)){(o.placed||e.frames-o.born>90)&&bp(o);continue}o.placed=!0,o.open&&(r=!0,jy(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){gp(e);return}e.idle=t-e.loud>Ry&&!a,Ci(e,e.idle)}function jy(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=hc(h,"motion-meter-fall",Dy),e.hold=hc(h,"motion-meter-hold",hp)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let h of e.els)h.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[o,l],p=!1;for(let h=0;h<2;h++){let b=Oy(c[h]);b>0&&(p=!0),e.disp[h]=b>=e.disp[h]?b:b+(e.disp[h]-b)*u,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=Fy&&(e.clipAt[h]=n);let m=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Ni(e,h,e.disp[h],m)}return p}function Ni(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function Ii(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ni(e,0,0,!1),Ni(e,1,0,!1)}function bp(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Pr.get(t)===e&&Pr.delete(t)}function qy(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=By(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:hp,rows:""};for(let s of n)Pr.set(s,o),r.io?.observe(s);if(r.recs.add(o),Ii(o),!r.io){let s=a.defaultView,l=()=>{ha(o),kn(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){ha(o),kn(r);return}o.open&&(o.open=!1,o.source?.close?.(),Ii(o)),o.source=l,ha(o),kn(r)}},destroy(){o.dead||bp(o),kn(r)}}}var yp={slop:8,longPressMs:500,pitchPx:16},Vy=class{constructor(t,n,a=yp){this.hit=t,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,n,a,r){if(this.phase!=="idle")return!1;let o=this.hit(n,a);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=n,this.y0=a,this.t0=r,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,n,a,r){if(t!==this.pointer)return;let o=n-this.x0,s=a-this.y0;if(this.phase==="pending"){if(this.tick(r),this.phase!=="pending"||Math.hypot(o,s)<this.config.slop)return;Math.abs(s)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-s/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(t,n,a,r){t===this.pointer&&(this.phase==="pending"&&this.move(t,n,a,r),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Hy(e,t,n,a=yp){let r=!1,o=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),h=[...e.querySelectorAll(t)],b=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(b>=0)return b;let m=-1,v=Number.POSITIVE_INFINITY;return h.forEach((f,y)=>{if(f.hidden)return;let E=f.getBoundingClientRect();if(c<E.top||c>E.bottom)return;let k=Math.abs(u-(E.left+E.width/2));k<v&&k<=E.width&&(m=y,v=k)}),m},l=new Vy(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var vp="netcomposer.groups.v1";function Es(){try{return globalThis.localStorage??null}catch{return null}}function wp(e=Es(),t=vp){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function Uy(e,t,n,a=vp){let r=wp(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function Gy(e,t=Es()){return wp(t).get(e.id)??e.open===!0}function Ky(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";Uy(Es(),e.id,u),Fi(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),xp(a,e),Fi(a,Gy(e)),kp(a,e),a}function Fi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function xp(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function kp(e,t){xp(e,t)&&Fi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Xa="application/x-nc-pad",gc="http://www.w3.org/2000/svg";function Wy(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Yy(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(Xy(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&pr(n)}),Ep(n,e),n}function Xy(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(gc,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(gc,"path");return d.append(u),a.append(r,o,s,l,d),Qy(e,a,t,n),o.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&$p(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Xa,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Xa)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Xa)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(Xa);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let m=Number(h);m!==t&&p.onMove?.(m,t,c.altKey);return}let b=c.dataTransfer?.files?.[0];b&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,b))}),a}function Jy(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Qy(e,t,n,a){let r=0,o=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;o=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=bc(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),o=bc(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Jy(e,n,a)})}function bc(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;pr(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),pr(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{pr(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?$p(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function $p(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),o.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function pr(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ep(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),d=o.querySelector(".nc-padgrid-pad-wave path"),u=o.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),d?.setAttribute("d",Wy(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let c=t.selected===r;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Oe(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function lo(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function yc(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Ma(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Zy=450,vc=8;function ut(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function e0(e){let t=Nb(e,"target-min");return t>0?t:44}function t0(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=e0(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,h=u-a,b=u+a;for(let m=0;m<t.length;m++){if(o===m)continue;let v=r[m];if(!v||v.width===0)continue;let f=v.left+v.width/2,y=v.top+v.height/2;Math.abs(y-u)<a*2&&(f>d?p=Math.min(p,(d+f)/2):f<d&&(c=Math.max(c,(d+f)/2))),Math.abs(f-d)<a*2&&(y>u?b=Math.min(b,(u+y)/2):y<u&&(h=Math.max(h,(u+y)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),b=Math.max(b,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,b-h)}px`,s.style.transform="none"}}function Ap(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function wc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function on(e,t){switch(e.type){case"slider":return n0(e,t);case"select":return r0(e,t);case"toggle":return o0(e,t);case"button":return i0(e,t);case"readout":return s0(e);case"label":return u0(e);case"note":return xc(e);case"knob":return h0(e,t);case"choice":return m0(e,t);case"slotRow":return g0(e,t);case"stepGrid":return w0(e,t);case"canvas":return E0(e);case"fx":return F0(e,t);case"eqGraph":return dy(e,t);case"levelSteps":return My(e,t);case"group":return Ky(e,t,on);case"strip":return A0(e,t);case"stripAdd":return L0(e,t);case"padGrid":return Yy(e,t);case"moves":return c0(e,t);default:return xc({id:"unknown",text:""})}}function at(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Tp(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Sp(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Ma(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),yc(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")yc(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&jt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&p0(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Ma(t.value))}else if(t.type==="choice")Lp(e,t);else if(t.type==="slotRow")Np(e,t);else if(t.type==="stepGrid")Ri(e,t);else if(t.type==="padGrid")Ep(e,t);else if(t.type==="moves")Mp(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&tp(n,t)}else if(t.type==="eqGraph")rp(e,t);else if(t.type==="levelSteps")fp(e,t);else if(t.type==="strip"){Rp(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${sn(n.id)}"]`);a instanceof Element&&at(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Fp(e,t);else if(t.type==="group"){kp(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${sn(n.id)}"]`);a instanceof Element&&at(a,n)}}else if(t.type==="fx"){Hp(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${sn(n.id)}"]`);a instanceof Element&&at(a,n)}}}}function n0(e,t){let n=lo(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=so(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Sp(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?wi(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=ep(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(ys(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(a0(e,a,t),s),n.append(Oe()),at(n,e),n}function Sp(e){return so(e.taper,e.min,e.max)?ys(e.taper,e.min,e.max,e.value):e.value}function a0(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ut());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function r0(e,t){let n=lo(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,Oe()),n}function o0(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Oe()),at(n,e),n}function i0(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(Oe()),at(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Ap(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Ip(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function s0(e){let t=lo(e.id,e.label);return t.append(Oe()),at(t,e),t}var l0=450;function c0(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(d0(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(o,s),n.append(r)}return Mp(n,e),n}function Mp(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${sn(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function d0(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function u0(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Oe()),t}function xc(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Oe()),t}function kc(e){if(typeof e.valueText=="string")return e.valueText;let t=Ma(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Tp(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function p0(e,t){let n=Nr(t.taper,t.min,t.max,t.value);Tp(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Nr(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",kc(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${kc(t)}`}function f0(e,t){if(so(e.taper,e.min,e.max))return ep(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function h0(e,t){let n=lo(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",u=>{o=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(so(c.taper,c.min,c.max)){let b=Nr(c.taper,c.min,c.max,s)-(u.clientY-o)/120;c.onChange(Qu(c.taper,c.min,c.max,b));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(u.clientY-o)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=f0(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Oe()),at(n,e),n}function m0(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(o.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(Oe()),Lp(n,e),n}function Lp(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function g0(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(c),b.textContent=p.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(b,ut()),b0(h,b,n,c,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Ap(),r.append(ut()),r.addEventListener("click",()=>{Ip(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,o,Oe()),Cp(n,t),Np(n,e),n}function $c(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;sa(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function b0(e,t,n,a,r){let o=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},b=y=>{let E=y.clientX-s,k=y.clientY-l;E*E+k*k>vc*vc&&(d=!0,h())},m=()=>{p&&(p=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",f))},v=y=>{let E=o!==0&&!d&&!u;h(),m(),E&&(c=!0,$c(n,a,r,y))},f=()=>{d=!0,h(),m()};e.addEventListener("pointerdown",y=>{y.button===0&&(m(),u=!1,d=!1,c=!1,s=y.clientX,l=y.clientY,h(),o=window.setTimeout(()=>{o=0,!d&&(u=!0,y0(n,t,a,r))},Zy),p=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(c||u||d){c=!1,u=!1,d=!1;return}$c(n,a,r,y)})}function Cp(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Ec("Save","store"),r=Ec("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),sa(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),sa(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),sa(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&sa(e)})}function Ec(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function y0(e,t,n,a){Cp(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function sa(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Np(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Ip(e){let t=e.dataset.ncLastFill||null,n=wb(t);e.dataset.ncLastFill=n;let a=xb(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function v0(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function w0(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=f=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=f,a.append(y),y},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let y of[o,s]){let E=y===f;y.setAttribute("aria-checked",E?"true":"false"),y.tabIndex=E?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let y=s.getAttribute("aria-checked")==="true"?o:s;l(y),y.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(v0(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.onClear?.()}),d.append(f)}n.append(d);for(let f of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let E=document.createElement("button");E.type="button",E.className="nc-name",E.textContent=f.label,E.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(E.dataset.ncLane=String((f.lane-1)%4+1));let k=!1,L=0;E.addEventListener("pointerdown",w=>{k=!1,!(w.pointerType==="mouse"||w.button!==0)&&(L=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(k=!0,A.onSelectRow?.(A.rows.findIndex(T=>T.id===f.id),!0))},l0))});for(let w of["pointerup","pointercancel","pointerleave"])E.addEventListener(w,()=>window.clearTimeout(L));E.addEventListener("contextmenu",w=>{k&&w.preventDefault()}),E.addEventListener("click",w=>{let A=t(n);if(A?.type!=="stepGrid")return;if(k){k=!1;return}let T=A.rows.findIndex($=>$.id===f.id),D=!!A.selectedRows&&(w.shiftKey||w.metaKey||w.ctrlKey);A.onSelectRow?.(T,D)}),E.addEventListener("keydown",w=>x0(n,E,w));let x=[];for(let w of["mute","solo"]){if(!(w==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=w,T.textContent=w==="mute"?"M":"S",T.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${f.label}`),A.append(T,ut()),A.addEventListener("click",()=>{let D=t(n);if(D?.type!=="stepGrid")return;let $=D.rows.findIndex(S=>S.id===f.id);(w==="mute"?D.onMute:D.onSolo)?.($)}),x.push(A)}let g=document.createElement("div");g.className="nc-steps";for(let w=0;w<f.steps.length;w++){let A=document.createElement("span");A.className="nc-step-wrap";let T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${f.id}:${w}`,T.setAttribute("aria-label",`${f.label} step ${w+1}`),A.append(T,ut()),A.addEventListener("click",D=>{let $=t(n);if($?.type!=="stepGrid")return;let S=$.rows.findIndex(P=>P.id===f.id),N=s.getAttribute("aria-checked")==="true";$.onToggle(S,w,D.shiftKey||N)}),g.append(A)}if(e.onLength&&g.append(k0(n,g,f,t)),y.append(...x,E,g),e.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=f.id,w.setAttribute("aria-label",`Re-roll ${f.label}`),w.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=wc(),w.append(ut()),w.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(T=>T.id===f.id))}),y.append(w)}y.addEventListener("click",w=>{if(w.target!==y)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(T=>T.id===f.id))}),Ac(n,g,".nc-step-wrap",t,s,()=>f.id),n.append(y)}let u=document.createElement("div");u.className="nc-pads-head";let c=(f,y,E)=>{let k=document.createElement("button");return k.type="button",k.className=f,k.textContent=y,E&&k.setAttribute("aria-label",E),k},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),b=document.createElement(e.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),e.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Ri(n,f))}));for(let[f,y]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let E=t(n);if(E?.type!=="stepGrid"||E.rows.length===0)return;let k=E.rows.length;E.onSelectRow?.(((Ja(E)+y)%k+k)%k)});if(u.append(p,b,h),e.onDice){let f=c("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=wc(),f.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid")return;let E=Ja(y);E>=0&&y.onDice?.(E)}),u.append(f)}if(e.transport){let f=c("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.transport?.onToggle()}),u.append(f)}n.append(u);let m=document.createElement("div");m.className="nc-pads",m.setAttribute("role","group");let v=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<v;f++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(f),y.textContent=String(f+1),y.addEventListener("click",E=>{let k=t(n);if(k?.type!=="stepGrid")return;let L=Ja(k);if(L<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(L,f+1);return}let x=s.getAttribute("aria-checked")==="true";k.onToggle(L,f,E.shiftKey||x)}),m.append(y)}return Ac(n,m,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[Ja(f)]?.id:void 0}),n.append(m),n.append(Oe()),Ri(n,e),n}function Ja(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Ac(e,t,n,a,r,o){let s="on",l=!0,d=-1,u=(c,p)=>{let h=c.rows[d]?.steps[p];!h||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!h[s]!==l&&c.onToggle(d,p,s==="accent"))};Hy(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(b=>b.id===o());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=o();d=p.rows.findIndex(m=>m.id===h);let b=p.rows[d]?.steps[c.pad];if(!b)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!b[s]}u(p,c.pad)}else if(c.kind==="long"){let h=o(),b=p.rows.findIndex(v=>v.id===h),m=t.querySelectorAll(n)[c.pad];b>=0&&m instanceof HTMLElement&&p.onLongPress?.(b,c.pad,m)}}})}function x0(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function k0(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(ut());let o=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(m=>m.id===n.id),h=c.rows[p];if(!h)return;let b=Math.max(1,Math.min(h.steps.length,u));b!==h.length&&c.onLength?.(p,b)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,b)=>{let m=h.getBoundingClientRect();m.width>0&&u>=m.left+m.width/2&&(p=b+1)}),p},l=u=>o(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(b=>b.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in h&&(u.preventDefault(),o(h[u.key]))}),r}var Vo=new WeakMap,Qa=new WeakMap;function $0(e){return e?(Qa.has(e)||(Qa.set(e,Aa(e)),ms(t=>{Qa.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Pi(n,Number(n.getAttribute("data-nc-velocity")))},e)),Qa.get(e)):"light"}function Pi(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:$0(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(Vo.has(e)&&Vo.get(e)===r)){if(Vo.set(e,r),n===null){for(let o of Object.keys(tc(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(tc(n,ec[a]??ec.light)))e.style.setProperty(o,s)}}function Sc(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Ri(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&o&&(d.setAttribute("aria-label",`Re-roll ${o.label}`),d.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?u.setAttribute("aria-label",h):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let c=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),b=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!b||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}${b?.markLabel?`, ${b.markLabel}`:""}`),Sc(p,b),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,Pi(p,b?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let b=0;b<c.steps.length;b++){let m=c.steps[b],v=e.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(v instanceof HTMLButtonElement))continue;let f=v.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===c.id?f.dataset.selected="true":delete f.dataset.selected;let L=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);L?f.dataset.picked="true":delete f.dataset.picked;let x=f.querySelector(".nc-name");x instanceof HTMLElement&&(x.setAttribute("aria-pressed",t.selectedRow===c.id||L?"true":"false"),x.textContent!==c.label&&(x.textContent=c.label,x.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?f.dataset.silent="true":delete f.dataset.silent;for(let g of f.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;g.setAttribute("aria-pressed",w?"true":"false")}}v.setAttribute("aria-pressed",m.on?"true":"false");let y=`${c.label} step ${b+1}${m.markLabel?`, ${m.markLabel}`:""}`;v.getAttribute("aria-label")!==y&&v.setAttribute("aria-label",y),Sc(v,m),m.accent?v.dataset.accent="true":delete v.dataset.accent,m.dim?v.dataset.dim="true":delete v.dataset.dim,b%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof m.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,m.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),Pi(v,m.velocity);let E=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;b===E?v.dataset.playhead="true":delete v.dataset.playhead;let k=!!t.onLength&&t.selectedRow===c.id;v.hidden=b>=c.length&&!k,b>=c.length&&k?v.dataset.out="true":delete v.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let b=document.activeElement===p;h.after(p),b&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function E0(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Oe()),t}function A0(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=Bp(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&(k.onFold?.(k.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let k=document.createElement("span");k.className="nc-strip-grip-dots",k.setAttribute("aria-hidden","true"),l.append(k),l.addEventListener("keydown",L=>{if(L.key!=="ArrowLeft"&&L.key!=="ArrowRight"||L.ctrlKey||L.metaKey||L.shiftKey)return;let x=t(n);x?.type==="strip"&&(L.preventDefault(),x.onMove?.(L.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Lc(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",k=>{k.pointerType==="touch"||k.pointerType==="pen"||k.target instanceof Element&&k.target.closest("input, .nc-strip-remove")||(k.preventDefault(),Lc(n,a,t,{x:k.clientX,y:k.clientY}))}),e.onRemove){let k=document.createElement("button");k.type="button",k.className="nc-strip-remove",k.dataset.ncStripRemove="",k.textContent="×",k.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onRemove?.(k)}),a.append(k)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let k=document.createElement("span");k.className="nc-hacks-wrap";let L=document.createElement("button");L.type="button",L.className="nc-hacks",L.dataset.ncHacks="",k.append(L,ut()),k.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onHacks?.()}),d.append(k)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let k=document.createElement("span");k.className="nc-hacks-wrap nc-sends-view-wrap";let L=document.createElement("button");L.type="button",L.className="nc-hacks nc-sends-view",L.dataset.ncSendsView="",k.append(L,ut()),k.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&x.onSendsView?.()}),u.append(k)}for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let L=document.createElement("span");L.className="nc-ms-wrap";let x=document.createElement("button");x.type="button",x.className="nc-ms",x.dataset.ncMs=k,x.textContent=k==="mute"?"M":"S",L.append(x,ut()),L.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(k==="mute"?g.onMute:g.onSolo)?.()}),u.append(L)}let c=document.createElement("div");c.className="nc-strip-sends";for(let k of e.sends??[])c.append(on({...k,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(on(As(e),t));let h=document.createElement("div");h.className="nc-strip-body";let b=document.createElement("span");b.className="nc-scale",b.setAttribute("aria-hidden","true");for(let k of e.ticks??[]){let L=document.createElement("span");L.className="nc-scale-tick",L.style.setProperty("--tick-pos",String(k.value)),L.textContent=k.label,b.append(L)}let m=Bb({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:k=>{let L=t(n);L?.type==="strip"&&L.onChange(k)},onReset:()=>{let k=t(n);k?.type==="strip"&&Tc(k)}}),v=Ub({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let k=t(n);k?.type==="strip"&&k.onClipClear?.()}});if(h.append(b,m.el,v.el),o){let k=document.createElement("button");k.type="button",k.className="nc-ui-fx-fold nc-strip-fold",k.dataset.ncStripFold="",k.setAttribute("aria-expanded","false");let L=document.createElement("span");L.className="nc-strip-fold-cap",L.setAttribute("aria-hidden","true");let x=document.createElement("span");x.className="nc-ui-fx-fold-name",x.dataset.ncStripFoldName="";let g=document.createElement("span");g.className="nc-strip-fold-pan",g.setAttribute("aria-hidden","true"),g.hidden=!e.pan,k.append(L,g,x),k.addEventListener("click",()=>{let w=t(n);if(w?.type!=="strip")return;w.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),h.prepend(k)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;f.addEventListener("click",k=>{let L=t(n);L?.type!=="strip"||!L.onTypeIn||(window.clearTimeout(y),k.detail===0?Mc(n,f,t):k.detail===1&&(y=window.setTimeout(()=>Mc(n,f,t),T0)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let k=t(n);k?.type==="strip"&&Tc(k)});let E=document.createElement("div");return E.className="nc-strip-trim",e.trim&&E.append(on(Ss(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,E,d,u,c,p,h,f,Oe()),Rp(n,e),n}function As(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??M0(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Ss(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??S0(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function S0(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function M0(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var T0=250;function Mc(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Ma(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function L0(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;Pp(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,Oe()),Fp(n,e),n}function Fp(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Pp(a))}function Pp(e){let t=e.options[0];t&&(t.selected=!0)}function Tc(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Rp(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?_b(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Ju(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let m=t.valueText??Ma(t.value);s.textContent!==m&&(s.textContent=m),s.setAttribute("aria-label",`${t.label} level ${m}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let m of e.querySelectorAll("[data-nc-ms]")){let v=m.getAttribute("data-nc-ms"),f=v==="mute"?t.mute===!0:t.solo===!0;m.setAttribute("aria-pressed",f?"true":"false"),m.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let m=t.hacksLabel??"Hacks";l.textContent!==m&&(l.textContent=m),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${m}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let m=t.sendsViewLabel??"Sends";d.textContent!==m&&(d.textContent=m),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${m}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),jt(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=Dp(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let m=e.querySelector(`.nc-strip-trim [data-nc-id="${sn(t.trim.id)}"]`);m&&at(m,Ss(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let m=e.querySelector(`.nc-strip-pan [data-nc-id="${sn(t.pan.id)}"]`);m&&at(m,As(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(_p(h,p,t.label),jt(h,t.foldHelp));let b=e.querySelector("[data-nc-strip-fold]");if(b instanceof HTMLElement){b.hidden=!p,b.setAttribute("aria-label",`Expand ${t.label}`);let m=b.querySelector("[data-nc-strip-fold-name]");m&&m.textContent!==t.label&&(m.textContent=t.label),jt(b,t.foldedHelp??t.foldHelp)}}function Dp(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Op?t:0}var Op=8,Za=null;function Lc(e,t,n,a){Za?.();let r=n(e);if(r?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=o.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=o.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=Dp(r),p=e.querySelector("[data-nc-strip-grip]")??t,h=(y=!1)=>{if(Za!==h)return;Za=null;let E=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",m,!0),o.removeEventListener("pointerdown",v,!0),s.removeEventListener("resize",f),(y||E)&&p?.isConnected&&p.focus?.({preventScroll:!0})},b=[0,...Array.from({length:Op},(y,E)=>E+1)].map(y=>{let E=o.createElement("button");return E.type="button",E.setAttribute("role","radio"),E.setAttribute("aria-checked",y===c?"true":"false"),E.setAttribute("tabindex",y===c?"0":"-1"),E.dataset.ncShadeChoice=String(y),y===0?(E.textContent="Auto",E.setAttribute("aria-label","Auto: alternate light and dark"),E.title="Auto: alternate light and dark"):(E.textContent=String(y),E.setAttribute("aria-label",`Shade ${y}`),E.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),E.addEventListener("click",()=>{let k=n(e);h(!0),k?.type==="strip"&&k.onShade?.(y===0?null:y)}),E});if(u.append(...b),u.addEventListener("keydown",y=>{let E=b.indexOf(o.activeElement);if(E<0)return;let k=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?k=(E+1)%b.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?k=(E-1+b.length)%b.length:y.key==="Home"?k=0:y.key==="End"&&(k=b.length-1),!(k<0)&&(y.preventDefault(),b[E].setAttribute("tabindex","-1"),b[k].setAttribute("tabindex","0"),b[k].focus())}),l.append(d,u),typeof r.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(k=>k.classList?.contains("nc-strip")&&!k.hasAttribute("data-nc-master")),E=y.indexOf(e);for(let[k,L,x]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let g=o.createElement("button");g.type="button",g.className="nc-strip-menu-item",g.dataset.ncStripMove=k<0?"left":"right";let w=o.createElement("span");w.textContent=L;let A=o.createElement("kbd");A.textContent=x,A.setAttribute("aria-hidden","true"),g.append(w,A),g.disabled=k<0?E<=0:E<0||E>=y.length-1,g.addEventListener("click",()=>{let T=n(e);h(!0),T?.type==="strip"&&T.onMove?.(k)}),l.append(g)}}o.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},E=l.offsetWidth,k=l.offsetHeight,L=s.innerWidth||o.documentElement.clientWidth||E,x=s.innerHeight||o.documentElement.clientHeight||k,g=a?a.x:y.right-E,w=a?a.y:y.bottom+4;g=Math.max(4,Math.min(g,L-E-4)),w+k>x-4&&(w=Math.max(4,(a?a.y:y.top)-k-4)),l.style.left=`${Math.round(g)}px`,l.style.top=`${Math.round(w)}px`})();let m=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),h(!0);else if(y.key==="Tab"&&l.contains(o.activeElement)){let E=[...l.querySelectorAll("button:not([disabled])")].filter(L=>L.getAttribute("tabindex")!=="-1"),k=(E.indexOf(o.activeElement)+(y.shiftKey?-1:1)+E.length)%E.length;y.preventDefault(),E[k]?.focus()}},v=y=>{l.contains(y.target)||h(!1)},f=()=>h(!1);return o.addEventListener("keydown",m,!0),o.addEventListener("pointerdown",v,!0),s.addEventListener("resize",f),Za=h,(b.find(y=>y.getAttribute("tabindex")==="0")??b[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}function Cc(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${sn(t)}"]`);return Ju(n?.querySelector(".nc-meter")??void 0)}var Di=typeof ResizeObserver=="function"?new ResizeObserver(C0):null;function C0(e){for(let t of e){if(!t.target.isConnected){Di.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&N0(n)}}function N0(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function I0(e){if(Di)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Di.observe(t)}function F0(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Rr(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(qp(n,"head")),e.on!==void 0){let d=gs({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(R0(n,t)),Rr(e)&&l.append(B0(n,t)),s&&l.append(_0(t)),n.append(l)}r&&n.prepend(D0(n,t)),o&&Vp(n,e);for(let l of e.controls)n.append(on(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(on(u,t));n.append(l)}return n.append(Oe()),Hp(n,e),I0(n),n}var P0=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function zp(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&P0(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function R0(e,t){let n=Bp();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),zp(e))}),n}function Bp(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function _p(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function D0(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(qp(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),zp(e)}}),n}var zn=new Set;function fr(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Rr=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),O0="(max-width: 768px)";function z0(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function B0(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(z0()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(jp(e,a,!zn.has(a.id)),n.focus())}),n}function _0(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function jp(e,t,n){n?zn.add(t.id):zn.delete(t.id),Ms(e,t)}function j0(e,t){t?.type==="fx"&&zn.has(t.id)&&jp(e,t,!1)}function q0(e){return e.ownerDocument.defaultView?.matchMedia?.(O0).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ms(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Rr(t)&&zn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Rr(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),fr(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&On(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",jt(n,t.maxHelp)),!a){e.dataset.ncMax&&Nc(e);return}if(!e.isConnected){let s=()=>e.isConnected&&zn.has(t.id)&&Ms(e,t);queueMicrotask(()=>{e.isConnected?s():fr(e.ownerDocument,s)});return}let r=q0(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&Nc(e),e.dataset.ncMax=r,r==="over"&&V0(e,t)),H0(e.ownerDocument),r==="over"&&Ts(e),fr(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&On(s)})}function Nc(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),fr(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&On(n)})}function V0(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Ts(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=cy(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Ic=new WeakSet;function H0(e){Ic.has(e)||(Ic.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Ts(t)}))}var Oi=new WeakMap;function qp(e,t){let n=zy(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Vp(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)jt(r,t.meterHelp);let a=Oi.get(e);a?a.set(t.meter):Oi.set(e,qy(n,t.meter))}function Hp(e,t){(t.meter||Oi.has(e))&&Vp(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(_p(o,r,t.title),jt(o,t.foldHelp)),Ms(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),jt(l,t.foldHelp)}}function jt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function sn(e){return e.replace(/["\\]/g,"\\$&")}function U0(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&tp(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&On(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Ts(n);t0(e)}var G0=Bt["toast-duration"];function K0({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function W0(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function Y0(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var Fc="data-nc-ui-toast-live";function X0(e,t){let n=t.querySelector(`[${Fc}]`);return n||(n=e.createElement("div"),n.setAttribute(Fc,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function $t({message:e,actionLabel:t,onAction:n,duration:a=G0,onClose:r,avoid:o=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=d.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let b="open",m=q=>q&&typeof q.getBoundingClientRect=="function"?q.getBoundingClientRect():null,v=m(c),f=v?.height||44,y=u.getComputedStyle?.(c),E=Number.parseFloat(y?.getPropertyValue(de("toast-offset")))||16,k=Number.parseFloat(y?.getPropertyValue(de("toast-anchor-gap")))||8,L=m(s),x=u.innerHeight??0,g=o.map(m).filter(Boolean),w=L&&L.bottom>0&&L.top<x?Y0(L,g,{width:v?.width||0,height:f},u.innerWidth??0,k,E):null;w&&w.top+f<=x?(c.setAttribute("data-placement","anchor"),c.style.top=`${w.top+(u.scrollY??0)}px`,c.style.left=`${w.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",W0(g,x,f,E));let A=u.requestAnimationFrame?.bind(u)??(q=>setTimeout(q,16));A(()=>A(()=>{b==="open"&&c.setAttribute("data-state","open")})),X0(d,l).textContent=K0({message:e,actionLabel:t});let T,D,$=new Promise(q=>{D=q}),S=q=>{clearTimeout(T),T=setTimeout(()=>G("timeout"),q)},N=a,P=Date.now(),I=()=>{b==="open"&&(clearTimeout(T),N=Math.max(0,N-(Date.now()-P)))},V=()=>{b==="open"&&(P=Date.now(),S(N))};c.addEventListener("pointerenter",I),c.addEventListener("pointerleave",V),c.addEventListener("focusin",I),c.addEventListener("focusout",V),h?.addEventListener("click",()=>{if(b==="open")try{n?.()}finally{G("action")}}),Number.isFinite(a)&&S(a);function G(q="close"){if(b!=="open")return;b="closing",clearTimeout(T),c.setAttribute("data-state","closing"),r?.(q);let H=u.getComputedStyle?.(c),re=H?Math.max(0,...String(H.transitionDuration||"").split(",").map(se=>Number.parseFloat(se)*(se.trim().endsWith("ms")?1:1e3)||0)):0,be=()=>{b!=="gone"&&(b="gone",c.remove(),D(q))};c.addEventListener("transitionend",be),setTimeout(be,re+50)}return{el:c,close:G,closed:$}}var Pc="data-nc-help";function J0(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var Ho=new WeakMap;function Q0(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Z0({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Ho.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=!1,d,u=null,c=!1,p=0,h=()=>{clearTimeout(s),c&&!l&&(p=Date.now()+1500),c=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},b=()=>{h(),clearTimeout(d),o=null,u=null,l=!1},m=(w,A)=>{clearTimeout(s),u=A;let T=Date.now()<p?Math.min(t,300):t;s=setTimeout(()=>{o===w&&w.isConnected&&!l&&y(w)&&(c=!0)},T)},v=w=>({x:Number(w.clientX)||0,y:Number(w.clientY)||0}),f=(w,A,T)=>!w||Math.hypot(w.x-A.x,w.y-A.y)>T,y=(w,A)=>{let T=A??w.getAttribute(Pc);if(!T)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=T,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let D=w.getBoundingClientRect(),$=J0(D,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,Q0(e));return r.style.top=`${$.top}px`,r.style.left=`${$.left}px`,r.dataset.side=$.side,r.style.visibility="",!0},E=w=>{if(l||w.pointerType==="touch")return;let A=w.target&&w.target.closest?w.target.closest(`[${Pc}]`):null;A!==o&&(b(),!(!A||w.buttons)&&(o=A,m(A,v(w))))},k=w=>{if(l||w.pointerType==="touch"||!o)return;if(w.buttons){h(),u=null;return}let A=v(w);c?f(u,A,8)&&(h(),m(o,A)):f(u,A,4)&&m(o,A)},L=w=>{!l&&!w.relatedTarget&&b()},x=w=>{(l||w.key==="Escape")&&b()};e.addEventListener("pointerover",E),e.addEventListener("pointermove",k,{passive:!0}),e.addEventListener("pointerout",L),e.addEventListener("pointerdown",b,!0),e.addEventListener("keydown",x),a.addEventListener("scroll",b,!0),a.addEventListener("blur",b);let g={hide:b,pin(w,A,{ms:T=0}={}){return b(),!w||!w.isConnected||!y(w,A)?!1:(l=!0,r.dataset.pinned="",T>0&&(d=setTimeout(b,T)),!0)},uninstall(){b(),e.removeEventListener("pointerover",E),e.removeEventListener("pointermove",k),e.removeEventListener("pointerout",L),e.removeEventListener("pointerdown",b,!0),e.removeEventListener("keydown",x),a.removeEventListener("scroll",b,!0),a.removeEventListener("blur",b),r?.remove(),r=null,Ho.delete(e)}};return Ho.set(e,g),g}var Up="(max-width: 768px)",ev='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',tv='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',nv=0;function av({panel:e,button:t,label:n="Menu",media:a=Up}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++nv}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=ev),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(tv)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:f}={}){if(!l())return;let y=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(f??y)&&s.focus?.({preventScroll:!0})}function c(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),u({focus:!0}))}function p(f){let y=f.target;y instanceof o.Node&&(e.contains(y)||s.contains(y))||u({focus:!1})}let h=()=>l()?u({focus:!0}):d(),b=f=>{let y=f.target,E=y instanceof o.Element?y.closest("button"):null;!E||!e.contains(E)||E.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",b);let m=o.matchMedia?.(a),v=()=>{m?.matches||u({focus:!1})};return m?.addEventListener?.("change",v),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",b),m?.removeEventListener?.("change",v)}}}var Ls="netcomposer.rhythm.hidden.v1",xt=new WeakMap;function Uo(){try{return globalThis.localStorage??null}catch{return null}}function Gp(e,t=Ls){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Rc(e,t,n,a=Ls){let r=Gp(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function Cs(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(As(r)),r.trim&&n.push(Ss(r)));return n}function Kp(e,t){if(!(!e||!t))return Cs(e).find(n=>n.id===t)}function rv(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Cs(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function ov(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Wp(e,t)}function Wp(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function iv(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=xt.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Kp(n,a)}function sv(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=rv(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${Oc(o.id)}"]`);s&&Wp(s,o);for(let l of o.controls){let d=e.querySelector(`[data-nc-id="${Oc(l.id)}"]`);d instanceof Element&&at(d,l)}s instanceof HTMLElement&&zi(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),ov(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let d of o.controls)l.append(on(d,iv));e.append(s),zi(s,o,n)}}function Yp(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var lv="(max-width: 768px)",Xp=new WeakMap;function Dc(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function cv(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=Dc("prev"),o=Dc("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let d=(u,c)=>{let p=Xp.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:b}=Yp(h,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,b),p.onPage?.(b),zi(e,{...p,page:b},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),o.addEventListener("click",()=>d(1,o)),e.prepend(a),a}function zi(e,t,n){Xp.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Yp(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(lv).matches===!0,d=e.closest(".nc-module");a.forEach((f,y)=>{let E=Math.floor(y/r)!==s;if(E?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,E&&!l){let k=d instanceof HTMLElement?xt.get(d):void 0;j0(f,Kp(k,f.dataset.ncId))}});let u=cv(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=u.querySelector("[data-nc-fx-page-count]"),b=`${s+1} / ${o}`;h.textContent!==b&&(h.textContent=b);let m=u.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${s+1} of ${o}`;m.textContent!==v&&(m.textContent=v)}function Oc(e){return e.replace(/["\\]/g,"\\$&")}function dv(e,t=Ls){Gu();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Gp(Uo(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=gs({labelledBy:o.id,onChange:E=>(xt.get(n)??e).onToggle?.(E)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(o,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let b=document.createElement("span");b.className="nc-slim-lines",h.append(b);let m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",n.append(m,r,p,h),n.setAttribute("aria-labelledby",o.id);let v=E=>{let k=xt.get(n)??e;n.dataset.ncOpen=E?"false":"true",p.hidden=E,h.hidden=!E,l.textContent=E?"+":"−",l.setAttribute("aria-expanded",E?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${E?"Show":"Hide"} ${k.title}`),l.title=E?"Show":"Hide",E?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let E=n.dataset.ncOpen==="true";Rc(Uo(),(xt.get(n)??e).id,E,t),v(E),Bi(n.parentElement)}),h.addEventListener("click",()=>{Rc(Uo(),(xt.get(n)??e).id,!1,t),v(!1),Bi(n.parentElement)});let f={pages:new Map,redraw:()=>y.redraw()},y={el:n,update(E){xt.set(n,E),E.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=E.title,c.textContent=E.status??"",E.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),b.textContent=E.summary??E.title,u.el.hidden=E.on===void 0,u.set(E.on===!0),E.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${E.title}`),sv(p,E,f),v(p.hidden),y.redraw()},redraw(){let E=xt.get(n);E&&U0(n,Cs(E))}};return xt.set(n,e),v(a),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(n),ms(()=>y.redraw(),n.ownerDocument),y}function uv(e,t,n="adjacent"){Gu(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Bi(e)}function Bi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Ns="netcomposer.studio.instances.v1",zc="netcomposer.studio.types-seen.v1",pv=["petra-rhythm","olive-bass"];function Jp(e,t){return t===1?e:`${e}#${t}`}function Is(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function fv(e,t){return t===1?e.name:`${e.name} ${t}`}function Hn(e,t,n){const a=fv(e,t),r=Qp(n,a);return{id:Jp(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const Fs=20;function Qp(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Fs).join("").trim()||t}function hv(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const o=a.find(s=>s.id===r.type);return o?Hn(o,r.n,n):r})}function Zp(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function mv(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return Hn(t,a)}function Ta(e){return e.filter(t=>t.available!==!1&&t.addOnly!==!0).map(t=>Hn(t,1))}function gv(e,t){if(!Array.isArray(e))return Ta(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:r?.id;if(typeof o!="string")continue;const s=Is(o),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===o)||n.push(Hn(l,s.n,r?.name))}return n.length>0||e.length===0?n:Ta(t)}function Ps(){try{return globalThis.localStorage??null}catch{return null}}function bv(e,t=Ps()){try{const n=t?.getItem(Ns);return n?gv(JSON.parse(n),e):Ta(e)}catch{return Ta(e)}}function yv(e,t,n=Ps()){let a=pv;try{const s=JSON.parse(n?.getItem(zc)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const o=[...e];for(const s of r.filter(l=>l.addOnly!==!0))o.some(l=>l.type===s.id)||o.push(Hn(s,1));try{n?.setItem(zc,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Un(o,n),o}function vv(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Un(e,t=Ps()){try{t?.setItem(Ns,JSON.stringify(vv(e)))}catch{}}function wv(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function xv(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const o=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(wv,()=>null);r=Promise.race([o,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function kv(e,t){const n=new Map;return(a,r)=>{const o=Is(a),s=o?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?o?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?Jp(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const $v=2e4,Ev=500,Av={waiting:"Waiting",loading:"Loading…",starting:"Starting audio…",ready:"Ready",failed:"Didn't load"},Sv=["ready","failed"];function Mv(e){const t=e.map(c=>({id:c.id,brand:c.brand,name:c.name,state:"waiting",loaded:!1,attached:!1,holds:0})),n=new Set;let a=!1,r=[];const o=new Map,s=c=>t.find(p=>p.id===c),l=c=>Sv.includes(c.state),d=()=>{if(!a&&t.every(l)){a=!0;const c=r;r=[];for(const p of c)p()}for(const c of t){if(!l(c))continue;const p=o.get(c.id);if(p){o.delete(c.id);for(const h of p)h()}}for(const c of[...n])try{c()}catch{}},u=c=>{if(a||l(c))return;const p=c.loaded&&c.attached&&c.holds===0?"ready":c.loaded||c.attached?"starting":c.state==="waiting"?"waiting":"loading";p!==c.state&&(c.state=p,d())};return{items:()=>t.map(c=>({id:c.id,brand:c.brand,name:c.name,state:c.state})),counts:()=>({done:t.filter(l).length,total:t.length}),settled:()=>a||t.every(l),whenSettled(){return a||t.every(l)?Promise.resolve():new Promise(c=>r.push(c))},whenDone(c){const p=s(c);return!p||a||l(p)?Promise.resolve():new Promise(h=>o.set(c,[...o.get(c)??[],h]))},requested(c){const p=s(c);!p||a||p.state!=="waiting"||(p.state="loading",d(),u(p))},loaded(c){const p=s(c);p&&(p.loaded=!0,u(p))},attached(c){const p=s(c);p&&(p.attached=!0,u(p))},hold(c){const p=s(c);if(!p||a)return()=>{};p.holds++,u(p);let h=!1;return()=>{h||(h=!0,p.holds--,u(p))}},fail(c){const p=s(c);!p||a||l(p)||(p.state="failed",d())},remove(c){const p=t.findIndex(b=>b.id===c);if(p<0||a)return;t.splice(p,1);const h=o.get(c);o.delete(c);for(const b of h??[])b();d()},onChange(c){return n.add(c),()=>n.delete(c)}}}function Tv(e,t){return e.includes(t)?[t,...e.filter(n=>n!==t)]:[...e]}async function Lv(e,t,n){for(let a=0;a<e.length;a++)a>0&&await n(),await t(e[a])}function Cv(e=Ev,t=globalThis){return new Promise(n=>{typeof t.requestIdleCallback=="function"?t.requestIdleCallback(()=>n(),{timeout:e}):t.setTimeout(n,0)})}function Nv(e,t){const n=new Set,a=new URL(t),r=/<(script|link)\b([^>]*)>/gi;for(const o of e.matchAll(r)){const s=(o[1]??"").toLowerCase(),l=o[2]??"",d=p=>new RegExp(`\\b${p}\\s*=\\s*("([^"]*)"|'([^']*)')`,"i").exec(l)?.slice(2).find(Boolean);let u;if(s==="script"&&/\btype\s*=\s*["']module["']/i.test(l)&&(u=d("src")),s==="link"){const p=(d("rel")??"").toLowerCase();(p==="modulepreload"||p==="stylesheet")&&(u=d("href"))}if(!u)continue;let c;try{c=new URL(u,a)}catch{continue}c.origin===a.origin&&n.add(c.href)}return[...n]}const hr="netcomposer.studio.pending-presets.v1",Iv=3e3,Fv=6e4;function Bc(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Pv(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Rv(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(hr)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))Bc(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(hr,JSON.stringify(s)):l.removeItem(hr)}catch{}},o=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=Iv){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await Pv(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))Bc(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),peek:()=>a(),dropPending(){const s=Object.keys(a());return r({}),s}}}function Dv(e,t,n=""){return n?`${e}@studio/${n}/${t}`:`${e}@studio/${t}`}const Ov=1,zv=1;function Bv(e,t=xe){if(!e||typeof e!="object")return null;const n=e;if(n.v!==zv||typeof n.type!="string")return null;const a=t.find(r=>r.id===n.type);return!a||a.available===!1||a.addOnly||a.sound===!1?null:a.id}const xe=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1},{id:"looper",name:"Looper",src:"/looper/",brand:"LUPA",identity:"instrument-looper",sound:!1,single:!0,noteTarget:!1,addOnly:!0},{id:"aria",name:"Situation",src:"/aria/",brand:"ARIA",identity:"instrument-aria",sound:!1,single:!0,noteTarget:!1}],Rs=[...xe];function _v(e,t,n={}){const a=n.instruments??xe;return{version:Ov,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:a.find(f=>f.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(f=>f.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id;n.attached?.(c);const p=n.presets,h=n.share?.host(c),b=n.picker?.host(c),m=n.notes?.host(c),v=n.situation?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:f=>Dv(f,c,n.generation?.()??""),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:()=>n.holdFirstPlay?.(c)??(()=>{})}:{},...p?{providePreset:f=>p.provide(c,f)}:{},...h?{audioReceivers:h.audioReceivers,sendAudio:h.sendAudio,onAudio:h.onAudio,reveal:h.reveal}:{},...b?{pickerTarget:b.pickerTarget}:{},...m?{notesIn:m.notesIn,notesSource:m.notesSource,notesTakeBack:m.notesTakeBack,notesOut:m.notesOut,onPlayed:m.onPlayed}:{},...n.keys?{studioKey:f=>n.keys?.press(c,f)===!0,claimKeys:(f,y)=>Array.isArray(f)?n.keys?.claim(c,f,y)??(()=>{}):()=>{}}:{},...n.playKeys?{playKeys:f=>Array.isArray(f)?n.playKeys?.declare(c,f)??(()=>{}):()=>{},onStudioTyping:f=>typeof f=="function"?n.playKeys?.onTyping(f)??(()=>{}):()=>{}}:{},...n.metronome?{metronome:jv(n.metronome,c)}:{},...n.readout?{readout:f=>n.readout?.set(c,f)}:{},...n.studioTransport?{studioTransport:n.studioTransport}:{},...n.chip?{chip:f=>n.chip?.(c,f&&typeof f=="object"?f:null)}:{},...v?{situationIn:v.situationIn,situationSource:v.situationSource,situationSources:v.situationSources,onSituationSources:v.onSituationSources}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:f=>typeof f=="function"?n.targets?.listen(f)??(()=>{}):()=>{}}:{},...n.show?{showInstance:f=>typeof f=="string"&&n.show?.(f)}:{},...n.add?{addInstrument:f=>{const y=Bv(f,a);return y===null?null:n.add?.(y)??null}}:{}}}}}function jv(e,t){return{prefs:()=>e.prefs(),set:n=>e.set(n&&typeof n=="object"?n:{}),want:n=>e.want(t,n===!0),active:()=>e.active(),onChange:n=>typeof n=="function"?e.onChange(n):()=>{}}}const _c=16,qv=30;function Vv(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,_c+1):[],a=t.until;if(n.length<1||n.length>_c||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-r>qv)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function Hv(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Uv(e,t){return t===null?e:`${t} · ${e}`}function Gv(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Kv(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const o=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[k,L]of s)c>=L.until&&s.delete(k);const[p,h]=[...s][0]??[],b=h?Hv(h,c):null;if(!p||!b){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const m=e.clearOf?.()??[],v=`${Gv(m.map(k=>k.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==v&&n.style.setProperty("--count-in-top",v);const f=e.labelOf(p);a.textContent!==f&&(a.textContent=f);const y=String(b.n);r.textContent!==y&&(r.textContent=y),n.toggleAttribute("data-accent",b.accent),n.setAttribute("aria-label",`${f} count-in ${y}`);const E=Uv(o,b.n);t.title!==E&&(t.title=E),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=Vv(p);h&&(s.set(c,h),u())},clear(c){s.delete(c)&&u()}}}}const Wv=1e4;function Yv(e=Wv,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const ef="netcomposer.studio.fx-fold.v1",Xv=["a","b","insert"],tf={a:!0,b:!0,insert:!1};function nf(e){try{const t=e?.getItem(ef);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const o of Xv)typeof a[o]=="boolean"&&(r[o]=a[o]);return r}catch{return{}}}function af(e){return{...tf,...nf(e)}}function rf(e,t,n){const a={...nf(e),[t]:n};try{e?.setItem(ef,JSON.stringify(a))}catch{}return{...tf,...a}}const of="netcomposer.studio.insert-fold.v1";function sf(e){try{const t=e?.getItem(of),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function lf(e,t,n){const a=[...sf(e)].filter(o=>o!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(of,JSON.stringify(r))}catch{}return new Set(r)}function Jv(e,t){return af(e).insert?(rf(e,"insert",!1),lf(e,t,!0)):sf(e)}function Se(){try{return globalThis.localStorage??null}catch{return null}}const Qv={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function cf(e,t){const n=t.fx[e],a=xr(n);for(const r of a.chain){const o=Qv[e][r.type];n===void 0&&o&&Object.assign(r.dials,o),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const df="drive-1",_i=3;function Zv(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return nn(e.masterFx,t);const n=e.insert.on?cf("insert",e).chain.find(a=>a.type==="drive"):void 0;return nn({v:2,chain:n?[{id:df,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function ew(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const tw={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function nw(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const er=e=>({channels:null,reason:e,message:tw[e]});function aw(e,t){const n=new Map,a=new Map;let r=1;const o=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=o(l);if(!c)return er("no-source");if(!(u>d))return er("empty");const p=r++;return new Promise(h=>{a.set(p,(b,m)=>h(b?{channels:b}:er(m??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&h(er("timeout"))},nw(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const h=m=>p?.port.postMessage(m);p?h({type:"record",id:c,from:d}):t.ready.then(()=>{p=o(l),h({type:"record",id:c,from:d})});let b=!1;return{stop(m){return b?Promise.resolve(null):(b=!0,new Promise(v=>{a.set(c,v),h({type:"record-end",id:c,to:m}),setTimeout(()=>{a.delete(c)&&v(null)},Math.max(0,(m-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){b=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function rw(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const o=Reflect.get(n,a,r);return typeof o=="function"?o.bind(n):o}})}const ee={"picker:off":"Connects the Sample Picker on this computer: it shows a NYX's pads here, and a tap there loads a sound onto one. Off: the Picker can't reach this Studio.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: it shows a NYX's pads here and loads sounds onto them (you choose which NYX there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer (on port 5177); the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker isn't connected yet. Press to connect (if Chrome asks to let this site reach this computer, choose Allow).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","motion:live":"Your phone's motion is live in ARIA 1. Tap to open it.","motion:paused":"Your phone's motion is paused in ARIA 1 while its page is hidden. Tap to open it.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:play-off":"Audio is off: press Play to start. Play starts every instrument on the Studio clock.","transport:play-loading":"Play is ready once every instrument is in. The line under the bar fills as they load.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","gate:steps":"Tap or drag up and down to draw each step's level. Hold a step (or right-click it) to give it its own shape. The ring is the step playing: dimmed while stopped.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit (right-click its tab, Minimize strip). It keeps playing at the same level; M and S still work, and Expand strip brings it back.","strip:folded":"A minimized channel: mute, solo and level meter, with its short name on the tab below. Right-click the tab and choose Expand strip to open it again; drag the tab's ⠿ to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument, right under its strip. Click to show it below; drag ⠿ to move tab and strip together (Alt+← / Alt+→ too); double-click to rename; right-click (touch and hold) for Shade, Minimize and Rename; × removes it.","strip:played-by":"Played by {who}. The dot fades a bar after its notes stop.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","offline:ready":"This Studio and its instruments are saved in this browser, so they open with no connection. The Library, Picker, live ARIA and plugins need the internet.","offline:offline":"No connection: the Studio runs from this browser's saved copy. The NYX Library and Picker, live ARIA (it plays its 2010 recording) and plugins wait for the internet.","offline:update":"A newer Studio is saved in this browser. Reload to use it; until then this page keeps the version it opened with.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},ow=[60,120,300],iw={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function uf(e){return Math.max(0,Math.min(e.written,e.size))}function Go(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function sw(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function lw(e,t,n){const a=uf(e);if(a<=0)return null;const r=e.written-a;let o;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;o=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const h=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(h-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;o=u}let s="exact";if(n&&n.barFrames>0){const u=Go(e.segments,o),c=sw(e.segments,o,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,h=o-Math.round(p),b=p===0?o:o+Math.round(n.barFrames-p);p===0?s="bar":h>=Math.max(r,c.start)&&"last"in t?(o=h,s="bar"):b<Math.min(e.written,c.end)&&(o=b,s="bar")}}const l=Go(e.segments,o)??0,d=(Go(e.segments,e.written-1)??l)+1;return{from:o,to:e.written,frame:l,endFrame:d,start:s}}function ji(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function cw(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,o=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${o}-${s}.wav`}const pf="audio/wav";function dw(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function uw(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function ff(e,t,n=24){const r=n/8,o=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+o,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,o,!0),new Uint8Array(s)}class pw{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(uw(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([ff(this.frames,n),...this.parts],{type:pf});this.finish({blob:a,name:dw(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const hf="netcomposer.studio.keeping.v1";function fw(e){try{return e?.getItem(hf)!=="off"}catch{return!0}}function hw(e,t){try{e?.setItem(hf,t?"on":"off")}catch{}}class mw{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=iw;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?lw(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(o=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return o(null);const l=s.plan.to-s.plan.from,d=new Blob([ff(l,s.rate,16),...s.parts],{type:pf});o({blob:d,name:cw(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const gw=new Set(["range","button","checkbox","radio","submit","reset","file","color","image"]);function mf(e){const t=e;if(!t||typeof t!="object")return!1;if(t.isContentEditable===!0)return!0;const n=t.tagName;return n==="TEXTAREA"?!0:n==="INPUT"&&!gw.has(String(t.type??"text").toLowerCase())}function bw(e,t=()=>!1){if(mf(e))return!0;const n=e;return!n||typeof n!="object"?!1:n.closest?.('dialog[open], [role="dialog"], [role="alertdialog"]')?!0:n.tagName==="SELECT"&&!t(e)}function yw(e){const t=new Map,n=new Map,a=(r,o)=>t.get(r)?.some(s=>s.has(o))===!0;return{declare(r,o){if(typeof r!="string"||!r||!Array.isArray(o))return()=>{};const s=new Set(o.filter(d=>typeof d=="string"&&d.length>0&&d.length<32)),l=t.get(r)??[];return l.push(s),t.set(r,l),()=>{const d=t.get(r);if(!d)return;const u=d.indexOf(s);u>=0&&d.splice(u,1),d.length||t.delete(r)}},down(r,o){if(!r||typeof r.code!="string"||r.ctrlKey||r.metaKey||r.isComposing||bw(r.target,o))return!1;const s=e.shown();if(!s||!a(s,r.code))return!1;const l=n.get(r.code);if(l!==void 0&&l!==s)return!0;let d=!1;try{d=e.deliver(s,"keydown",r)}catch{d=!1}return r.repeat||n.set(r.code,s),d},up(r){if(!r||typeof r.code!="string")return!1;const o=n.get(r.code);if(o===void 0)return!1;n.delete(r.code);try{e.deliver(o,"keyup",r)}catch{}return!0},releaseAll(){const r=[...n];n.clear();for(const[o,s]of r)try{e.deliver(s,"keyup",{code:o,key:""})}catch{}},drop(r){t.delete(r);for(const[o,s]of[...n])s===r&&n.delete(o)},codes:r=>[...new Set((t.get(r)??[]).flatMap(o=>[...o]))]}}function vw(e,t){const n=e.document,a=new WeakSet,r=yw({shown:t.shown,deliver(d,u,c){const p=t.frameDoc(d),h=p?.defaultView;if(!p||!h)return!1;const b=new h.KeyboardEvent(u,{code:c.code,key:c.key??"",shiftKey:c.shiftKey===!0,altKey:c.altKey===!0,repeat:c.repeat===!0,bubbles:!0,cancelable:!0});return!(p.body??p.documentElement).dispatchEvent(b)}});e.addEventListener("keydown",d=>{r.down(d,u=>a.has(u))&&(d.preventDefault(),d.stopImmediatePropagation())},!0),e.addEventListener("keyup",d=>r.up(d),!0),e.addEventListener("blur",()=>r.releaseAll()),n.addEventListener("visibilitychange",()=>{n.visibilityState==="hidden"&&r.releaseAll()}),n.addEventListener("pointerdown",d=>{const u=d.target;u?.tagName==="SELECT"&&a.add(u)},!0),n.addEventListener("keydown",d=>{if(d.code==="Tab"){const u=n.activeElement;u&&a.delete(u)}},!0);const o=new Set;let s=!1;const l=()=>{const d=mf(n.activeElement);if(d!==s){s=d;for(const u of[...o])try{u(s)}catch{}}};return n.addEventListener("focusin",l),n.addEventListener("focusout",d=>{const u=d.target;u?.tagName==="SELECT"&&a.delete(u),queueMicrotask(l)}),{route:r,onTyping(d){if(typeof d!="function")return()=>{};o.add(d);try{d(s)}catch{}return()=>o.delete(d)}}}const Dr={threshold:-3,knee:0,ratio:20,attack:.001,release:.1},ww=(()=>{const e=Dr.threshold,t=Dr.ratio;return-.6*e*(1-1/t)})();function xw(e){return Math.floor(.006*e)}const qi=1024,jc=qi+8192,kw=.25;function $w(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function Ew(e,t,n=OfflineAudioContext){const a=new n(1,jc,e),r=a.createBuffer(1,jc,e);r.getChannelData(0)[qi]=kw;const o=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return $w(l.getChannelData(0),qi)}function Aw(e,t=()=>Ew(e,n=>{const a=new DynamicsCompressorNode(n,Dr);return{input:a,output:a}})){let n=xw(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const Sw=65,Mw=60,Tw=50;function Lw(e,t,n){return t!=="ok"?!0:n?e>=Tw:e>=Mw}const Cw=90,Nw=5e3,mr=3,gr=1;function Iw(e,t){return e>=Cw||t>=mr?"over":t>0?"dropout":e>=Sw?"busy":"ok"}function Fw(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function Pw(e,t){return ee[`load:${t}`].replace("{pct}",String(Math.round(e)))}class Rw{pct=0;state="ok";shown=!1;underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,mr);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=Nw;)this.recent.shift();return this.recent.length>mr&&this.recent.splice(0,this.recent.length-mr),this.state=Iw(this.pct,this.recent.length),this.shown=Lw(this.pct,this.state,this.shown),this.state}}class Dw{constructor(t=gr){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function Wt(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,o]of Object.entries(n))a.setAttribute(r,o);return a}function Ow(e={}){const t=e.now??(()=>performance.now()),n=new Rw,a=Wt("span","load-fill"),r=Wt("span","load-pct"),o=Wt("span","load-word"),s=Wt("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(Wt("span","load-label"),Wt("span","load-bar",{"aria-hidden":"true"}),r,o),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=Wt("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let d=!1,u=0;const c={path:"none",pct:0,state:"ok",shown:!1,underruns:0,recent:0,readings:0,measured:!0,inject(k){d=k!==null,k&&h({pct:k.pct,underruns:k.underruns??(k.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const k=n.state;s.dataset.state=k,s.toggleAttribute("data-shown",n.shown),a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,o.textContent=Fw(k);const L=Pw(n.pct,k);s.setAttribute("aria-label",L),l.textContent=L,c.pct=n.pct,c.state=k,c.shown=n.shown,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=u,l.hidden||v()}function h(k){u++,n.read(k,t()),p()}function b(k){d||h(k)}window.setInterval(()=>{const k=n.state,L=n.shown;(n.tick(t())!==k||n.shown!==L)&&p()},500);let m=0;function v(){l.isConnected||document.body.append(l);const k=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const L=l.offsetWidth,x=8,g=Math.max(x,Math.min(k.left,window.innerWidth-L-x));l.style.top=`${Math.round(k.bottom+6)}px`,l.style.left=`${Math.round(g)}px`,l.dataset.side="below",l.style.visibility=""}function f(){l.hidden=!1,v()}function y(){window.clearTimeout(m),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",k=>{k.pointerType!=="touch"&&(window.clearTimeout(m),m=window.setTimeout(f,e.helpDelay??500))}),s.addEventListener("pointerleave",k=>{k.pointerType!=="touch"&&y()}),s.addEventListener("click",()=>l.hidden?f():y()),s.addEventListener("blur",y),document.addEventListener("pointerdown",k=>{s.contains(k.target)||y()}),document.addEventListener("keydown",k=>{k.key==="Escape"&&y()}),window.addEventListener("scroll",y,!0),p();let E=!1;return{el:s,start(k,L){if(E)return c.path;E=!0;const x=k.renderCapacity;if(x&&typeof x.start=="function"){const g=new Dw(gr);return x.addEventListener("update",w=>{const A=w,T=typeof A.timestamp=="number"?A.timestamp:k.currentTime-gr;b({pct:(A.averageLoad??0)*100,underruns:g.take(A.underrunRatio,T)})}),x.start({updateInterval:gr}),c.path="renderCapacity",c.path}if(L&&typeof AudioWorkletNode=="function")try{const w=Math.round((k.baseLatency??0)*k.sampleRate),A=new AudioWorkletNode(k,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:w}});return A.port.onmessage=T=>{T.data?.type==="load"&&(c.measured=T.data.measured,b({pct:T.data.load,underruns:T.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function zw(e,t){e.after(t.el)}const ta={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},Bw=256*1024,_w=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",tr=e=>e.webkitRelativePath||e.name;async function jw(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,b)=>tr(h).split("/").length-tr(b).split("/").length)[0];if(!a)throw new Error(ta.noManifest);const r=await a.text();let o;try{o=JSON.parse(r)}catch{throw new Error(ta.badJson)}const s=ao(o);if(!s.ok||!s.manifest)throw new Error(ta.bad(s.errors.join("; ")));const l=s.manifest,d=_w(tr(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>tr(h)===d)??t.find(h=>h!==a&&h.name===u&&!h.webkitRelativePath);if(!c)throw new Error(ta.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>Bw)throw new Error(ta.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function qw(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await $u(new TextEncoder().encode(e.dsp)),added:t}}const qc=e=>`local:${e}`,Or=e=>e.startsWith("local:"),gf=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function bf(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(gf),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Vw="netcomposer-studio-plugins",nr="plugins";function Hw(e=globalThis.indexedDB){const t=bf(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(Vw,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(nr)||s.result.createObjectStore(nr,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(nr,o),h=s(p.objectStore(nr));p.oncomplete=()=>u(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},r=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(gf)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return r(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const Vi=pb,Hi=fb,Uw={skin:Dn,fill:!1};function Gw(e){try{return{skin:Sa(e?.getItem(Vi)),fill:e?.getItem(Hi)==="1"}}catch{return{...Uw}}}function Kw(e,t){try{t.skin===Dn?e?.removeItem(Vi):e?.setItem(Vi,t.skin),t.fill?e?.setItem(Hi,"1"):e?.removeItem(Hi)}catch{}}function yf(e,t){try{const n=e.contentDocument;n?.documentElement&&hs(t,n)}catch{}}const Ww=e=>Lr.find(t=>t.id===e)?.name??e;function we(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a}function Vc(e,t){const n=Lr.find(r=>r.id===t)??Lr[0];if(!n)return;const a=n.swatch[Aa()];e.style.setProperty("--look-paper",a.paper),e.style.setProperty("--look-surf",a.surf),e.style.setProperty("--look-accent",a.accent)}function Yw(e,t,n={}){let a={...e};const r=we("div",{class:"look"}),o=we("span",{class:"look-dot","aria-hidden":"true"}),s=we("span",{class:"look-word"}),l=we("button",{type:"button",class:"ghost look-btn","aria-haspopup":"dialog","aria-expanded":"false",title:n.theme?"Theme, skin and panels":"Skin and panels"},o,s),d="look-panel";l.setAttribute("aria-controls",d);const u=Lr.map(x=>{const g=we("span",{class:"look-sw","aria-hidden":"true"},we("i",{class:"look-sw-paper"}),we("i",{class:"look-sw-surf"}),we("i",{class:"look-sw-accent"})),w=we("button",{type:"button",class:"look-chip",role:"radio","data-skin":x.id,title:x.about},g,we("span",{class:"look-chip-name"},x.name));return w.addEventListener("click",()=>v({...a,skin:x.id},w)),w}),c=we("div",{class:"look-chips",role:"radiogroup","aria-label":"Skin"},...u),p=["outlined","filled"].map(x=>{const g=we("button",{type:"button",class:"look-panel-choice",role:"radio","data-panels":x},x==="filled"?"Filled":"Outlined");return g.addEventListener("click",()=>v({...a,fill:x==="filled"},g)),g}),h=we("div",{class:"look-panels-choices",role:"radiogroup","aria-label":"Panels"},...p),b=we("div",{class:"look-pop",id:d,role:"dialog","aria-label":"Look"},...n.theme?[we("div",{class:"look-theme"},we("p",{class:"look-head"},"Theme"),n.theme)]:[],we("p",{class:"look-head"},"Skin"),c,we("div",{class:"look-panels"},we("p",{class:"look-head"},"Panels"),h),we("p",{class:"look-note"},"Instrument colours stay the same in every skin."));r.append(l,b);function m(){s.textContent="Look",l.setAttribute("aria-label",`Look: ${Ww(a.skin)} skin${a.fill?", filled panels":""}`),Vc(o,a.skin);for(const x of u){const g=x.dataset.skin===a.skin;x.setAttribute("aria-checked",g?"true":"false"),x.tabIndex=g?0:-1,Vc(x.querySelector(".look-sw"),x.dataset.skin??"")}for(const x of p){const g=x.dataset.panels==="filled"===a.fill;x.setAttribute("aria-checked",g?"true":"false"),x.tabIndex=g?0:-1}}function v(x,g){a={skin:Sa(x.skin),fill:x.fill},m(),t({...a}),g?.focus({preventScroll:!0})}const f=(x,g)=>w=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key))return;w.preventDefault();const A=x.findIndex($=>$.getAttribute("aria-checked")==="true"),T=w.key==="ArrowLeft"||w.key==="ArrowUp"?-1:1,D=(A+T+x.length)%x.length;v(g(D),x[D])};c.addEventListener("keydown",f(u,x=>({...a,skin:u[x]?.dataset.skin??Dn}))),h.addEventListener("keydown",f(p,x=>({...a,fill:p[x]?.dataset.panels==="filled"})));const y=()=>r.hasAttribute("data-open");function E(){y()||(r.setAttribute("data-open",""),l.setAttribute("aria-expanded","true"),u.find(x=>x.getAttribute("aria-checked")==="true")?.focus({preventScroll:!0}),document.addEventListener("pointerdown",L,!0))}function k(x=!1){y()&&(r.removeAttribute("data-open"),l.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",L,!0),x&&l.focus({preventScroll:!0}))}function L(x){r.contains(x.target)||k()}return l.addEventListener("click",()=>y()?k():E()),r.addEventListener("keydown",x=>{x.key==="Escape"&&y()&&(x.preventDefault(),x.stopPropagation(),k(!0))}),ms(()=>m()),m(),{el:r,get look(){return{...a}},set(x){a={skin:Sa(x.skin),fill:x.fill},m()},open:E,close:()=>k()}}const Hc="netcomposer.studio.metronome.v1",Ko={on:!0,volume:.5},Xw=.2,Wo=.03,Uc={accent:1600,beat:1e3};function Gc(e){try{const t=e?JSON.parse(e):{},n=typeof t.volume=="number"&&Number.isFinite(t.volume)?Math.min(1,Math.max(0,t.volume)):Ko.volume;return{on:typeof t.on=="boolean"?t.on:Ko.on,volume:n}}catch{return{...Ko}}}function Jw(e,t,n,a=Number.NEGATIVE_INFINITY){const r=[],o=Math.max(1,Math.round(n)),s=Math.max(Math.ceil(e-1e-9),Math.ceil(a-1e-9))+0;for(let l=s;l<t-1e-9;l++)r.push({beat:l,accent:(l%o+o)%o===0});return r}const Qw=(e,t)=>Math.min(1,Math.max(0,e))**2*(t?.9:.6);function Zw(e){const{ctx:t}=e,n=e.storage===void 0?e1():e.storage;let a=Gc(n?.getItem(Hc)??null);const r=new Set,o=new Set,s=t.createGain();s.connect(e.destination??t.destination);const l={scheduled:0};let d=Number.NEGATIVE_INFINITY,u=!1;const c=[],p=()=>a.on&&r.size>0,h=()=>{for(const y of[...o])try{y()}catch{}},b=()=>{const y=t.currentTime;for(const E of c.splice(0))try{E.gain.gain.cancelScheduledValues(y),E.gain.gain.setValueAtTime(0,y),E.osc.stop(y+.005)}catch{}},m=(y,E)=>{const k=t.createOscillator(),L=t.createGain();k.frequency.value=E?Uc.accent:Uc.beat;const x=Qw(a.volume,E);L.gain.setValueAtTime(0,y),L.gain.linearRampToValueAtTime(x,y+.001),L.gain.exponentialRampToValueAtTime(Math.max(x*.001,1e-5),y+Wo),k.connect(L).connect(s),k.start(y),k.stop(y+Wo+.005);const g={osc:k,gain:L,end:y+Wo+.005};c.push(g),k.onended=()=>{const w=c.indexOf(g);w>=0&&c.splice(w,1);try{L.disconnect()}catch{}},l.scheduled++},v=()=>{const y=e.transport();if(!y.running){u&&b(),u=!1,d=Number.NEGATIVE_INFINITY;return}if(u||(d=Number.NEGATIVE_INFINITY),u=!0,!p())return;const E=e.now(),k=y.beatAt(E),L=y.beatAt(E+Xw),x=Jw(Math.max(k,d+1),L,y.meter?.beatsPerBar??4);for(const g of x){const w=e.toContextTime(y.timeAt(g.beat));w<t.currentTime||(m(w,g.accent),d=g.beat)}},f=e.ticker(v);return f.start(),{prefs:()=>({...a}),set(y){const E=Gc(JSON.stringify({...a,...y}));if(E.on===a.on&&E.volume===a.volume)return;const k=p();a=E;try{n?.setItem(Hc,JSON.stringify(a))}catch{}k&&!p()&&b(),h()},want(y,E){if(typeof y!="string"||!y)return;const k=r.has(y);if(E===k)return;const L=p();E?r.add(y):r.delete(y),L&&!p()&&b(),h()},active:p,onChange(y){return o.add(y),()=>o.delete(y)},bus:s,stats:l,dispose(){f.dispose(),b(),s.disconnect(),o.clear()}}}function e1(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const St=-54,za=6,pt=-St/(za-St),t1=-6,Ui=(t1-St)/(za-St);function zr(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:St+t*(za-St)}function n1(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function a1(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function Pt(e){return n1(zr(e))}function r1(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function o1(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:Pt(n.position))}function Ds(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-St)/(za-St)))}function Kc(e){return Ds(a1(e))}const Wc=[0,-6,-12,-24,-48].map(e=>({value:Ds(e),label:e===0?"0":`−${-e}`})),i1=1;function s1(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function Yc(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<St?0:Ds(Math.min(za,n)):null}function l1(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const Os="netcomposer.studio.mix.v1",vf={position:Ui,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},wf=-12,xf=24,c1=.5;function kf(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(xf,Math.max(wf,e))*10)/10;return t===0?0:t}const d1=8;function u1(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=d1?e:0}function La(){return{v:1,channels:{},master:pt,returns:{a:{on:!0,level:pt},b:{on:!0,level:pt}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const ma=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,p1=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,Br=(e,t)=>typeof e=="boolean"?e:t,Rt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function f1(e){const t=Rt(e);return{position:ma(t.position,vf.position),mute:Br(t.mute,!1),solo:Br(t.solo,!1),sendA:Math.min(pt,ma(t.sendA,0)),sendB:Math.min(pt,ma(t.sendB,0)),pan:p1(t.pan),shade:u1(t.shade),trim:kf(t.trim)}}function $f(e){const t=La(),n=Rt(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(Rt(n.channels)))u.length>0&&u.length<=64&&(a[u]=f1(c));const r=Rt(n.returns),o=(u,c)=>{const p=Rt(u);return{on:Br(p.on,c.on),level:ma(p.level,c.level)}},s={},l=Rt(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(Rt(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:ma(n.master,t.master),returns:{a:o(r.a,t.returns.a),b:o(r.b,t.returns.b)},insert:{on:Br(Rt(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function Ef(){try{return globalThis.localStorage??null}catch{return null}}function h1(e=Ef()){try{const t=e?.getItem(Os);return t?$f(JSON.parse(t)):La()}catch{return La()}}function Af(e,t=Ef()){try{return t?.setItem(Os,JSON.stringify(e)),t!==null}catch{return!1}}const co=3;function m1(e,t=co){return Math.max(1,Math.ceil(e/t))}function Xc(e,t=co){return Math.max(0,Math.floor(e/t))}function g1(e,t,n,a=null,r=co){const o=m1(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Xc(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?Xc(d,r):Math.min(o,Math.max(0,e.page))}const b1=["M0 10 L0 1 L20 1 L20 10","M0 10 C3 10 6 1 12 1 L20 1","M0 10 C10 10 16 6 20 1 L20 10","M0 10 L0 1 L3 1 C5 1 6 9 11 10 L20 10","M0 8 C8 8 12 2 20 2"],ar="Custom";function Jc(e,t){const n={};for(const a of pe("gate")?.dials??[])n[a.key]=Number(e.getParam(t,a.key)??a.default);return n}function y1(e,t,n,a,r){const o=pe("gate"),s=g=>o?.dials.find(w=>w.key===g),l=t.getPattern(n)??{levels:Array(16).fill(100),shapes:Array(16).fill(0)},d=Jc(t,n),u=d.steps===8?8:16,c=Lu(d),p=g=>`hack-${e}-${n}-${g}`,h=xg({dials:d,pattern:l}),b=(g,w)=>{t.setParam(n,g,w),r.render()},m=(g,w)=>{const A=s(g);return A?.options?{type:"choice",id:p(g),label:A.label,caption:w,value:String(d[g]),options:A.options.map(T=>({value:String(T.value),label:T.label})),onChange:T=>b(g,Number(T))}:null},v=g=>{const w=s(g);return w?r.dial(w):null},f={type:"levelSteps",id:p("steps-strip"),label:`${h===ar?"Gate":h} steps`,steps:l.levels.slice(0,u).map((g,w)=>({level:g/100,shape:l.shapes[w]})),played:c,swing:.5+.25*(d.swing??0)/100,on:a,shapes:yg.map((g,w)=>({value:w,label:g,icon:b1[w]})),curve:(g,w)=>$g(d,l,g,w),onLevels:g=>{const w=l.levels.slice();g.forEach((A,T)=>{w[T]=Math.round(A*100)}),t.setPattern(n,{levels:w}),r.render()},onShape:(g,w)=>{const A=l.shapes.slice();A[g]=w,t.setPattern(n,{shapes:A}),r.render()},onShapeAll:g=>{t.setPattern(n,{shapes:Array(16).fill(g)}),r.render()},playhead:()=>{const g=t.beatAt(r.heardAt());return g?{step:kg(Jc(t,n),g.beat,g.beatsPerBar),locked:g.locked}:null},help:ee["gate:steps"]},E=[{type:"select",id:p("pattern"),label:"Pattern",value:h,options:[...Rn.map(g=>({value:g.name,label:g.name})),{value:ar,label:ar}],onChange:g=>{g!==ar&&(t.setGatePattern(n,g),r.render())}},f,m("rate","Rate"),v("swing"),v("depth"),v("mix")],k=d.mode===1,L=[m("steps","Steps"),m("mode","Mode"),v("smooth"),v("spread"),...k?[v("res")]:[]],x=g=>g!==null;return{controls:E.filter(x),more:L.filter(x)}}const Sf=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function v1(e,t){if(!Sf(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function w1(e,t,n){if(!Sf(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Qc="plugin-url",Yo="plugin-folder",Zc="plugin-files",Xo="kept:",Jo="forget:",Qo="listed:",x1="../plugins/registry.json",U={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function k1(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(kr))if(a===e)return t[Number(n)];return"Stopped."}function na(e){if(Or(e))return U.thisComputer;try{return new URL(e).host||e}catch{return e}}function $1(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function E1(e){const t=new URL(x1,e.base).href;let n=[];const a=new Set,r=new Map,o=[],s=new Set,l=()=>{for(const x of s)x()},d=x=>String(x?.message??x).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??bf();let p=[];const h=new Map,b=new Set,m=x=>{b.has(x)||(b.add(x),l())},v=e.frozen,f=async()=>{try{p=await c.list()}catch(x){console.warn(`Studio plugins: can't read this computer's plugins (${d(x)})`)}l()},y=f(),E=u?hg(t,{fetch:e.fetch}).then(x=>{n=x.registry.plugins;for(const w of x.errors)console.warn(`Studio plugins: registry ${w}`);l();const g=o.splice(0);g.length&&L.restore(g)}).catch(x=>{console.info(`Studio plugins: no listed plugins (${d(x)})`)}):Promise.resolve(),k=async(x,g)=>{a.add(x),r.delete(x),l();try{const{entry:w,stale:A}=await g();return w.plugin&&(A&&m(w.plugin.id),v?.clear(w.plugin.id)),w.type}catch(w){throw r.set(x,d(w)),w}finally{a.delete(x),l()}},L={listed:()=>n,loaded:()=>_m().filter(x=>!x.plugin.listed&&!Or(x.plugin.url)),remote:u,local:()=>p,stale:x=>b.has(x),frozen:x=>!!v?.has(x),async addPicked(x){const g=await qw(x);v?.clear(g.id);const w=pe(`plugin:${g.id}`);if(w){const T=w.plugin?.version===g.version&&h.get(g.id)===g.sha256;return await c.put(g),await f(),T||m(g.id),T?{type:w.type}:{reload:!0}}const A=await k(g.id,()=>Vl(e.ctx,{manifest:g.manifest,dsp:g.dsp,dspName:g.dspName},{moduleUrl:e.moduleUrl,url:qc(g.id)}));return h.set(g.id,g.sha256),await c.put(g),await f(),{type:A}},async loadKept(x){v?.clear(x);const g=pe(`plugin:${x}`),w=await c.get(x);if(g){const T=h.get(x);return w&&T&&T!==w.sha256&&m(x),g.type}if(!w)throw new Error(U.notKept);const A=await k(x,()=>Vl(e.ctx,{manifest:w.manifest,dsp:w.dsp,dspName:w.dspName},{moduleUrl:e.moduleUrl,url:qc(x)}));return h.set(x,w.sha256),A},async forget(x){await c.remove(x),await f()},listingFor(x){const g=n.find(A=>A.id===x.id);if(!g)return null;const w=new URL(g.manifest,t).href;return!x.url||x.url===w?g:null},loading:x=>a.has(x),async loadListed(x){v?.clear(x);const g=pe(`plugin:${x}`);if(g)return g.type;await E;const w=n.find(A=>A.id===x);if(!w)throw new Error(`${x} isn't listed`);return k(x,()=>mg(e.ctx,w,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(x){return k("url",()=>Su(e.ctx,x,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(x){for(const g of x)if(!(g.status!=="missing"||a.has(g.id)||pe(`plugin:${g.id}`))&&!v?.has(g.id)){if(Or(g.url)){y.then(()=>{p.some(w=>w.id===g.id)&&!a.has(g.id)&&!pe(`plugin:${g.id}`)&&L.loadKept(g.id).catch(()=>{})});continue}if(u){if(!n.length){o.some(w=>w.id===g.id)||o.push(g);continue}L.listingFor(g)&&L.loadListed(g.id).catch(()=>{})}}},onChange(x){return s.add(x),()=>s.delete(x)},problem:x=>r.get(x)??null,clearProblem(x){r.delete(x)&&l()}};return L}const Mf="netcomposer.studio.sends.v2";function A1(e){try{return e?.getItem(Mf)==="1"}catch{return!1}}function S1(e,t){try{e?.setItem(Mf,t?"1":"0")}catch{}}function M1(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function _r(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function T1(e){return _r(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function L1(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function ed(e,t){return e&&!t}function C1(e,t,n){return e&&_r(t).kind==="none"&&n.every(a=>a===0)}const Tf="netcomposer.studio.strip-fold.v1";function Lf(e){try{const t=e?.getItem(Tf),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Cf(e,t){try{e?.setItem(Tf,JSON.stringify([...t].sort()))}catch{}return t}function Nf(e,t,n){const a=new Set(Lf(e));return n?a.add(t):a.delete(t),Cf(e,a)}function N1(e,t){return Nf(e,t,!1)}function I1(e,t){const n=new Set(t),a=Lf(e),r=new Set([...a].filter(o=>n.has(o)));return r.size===a.size?a:Cf(e,r)}function F1(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(o=>o!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function P1(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function If(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const o=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;o<a&&(n=r,a=o)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function Gi(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const o={id:t,before:r};return F1(e,o).every((l,d)=>l===e[d])?null:o}const R1=-18,D1=-20,Ff=3,O1=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],td=[-20,-10,-7,-5,-3,0,1,2,3],z1=.3,B1=6.638/z1,_1=48;function j1(e){return e-R1}function Pf(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Ff)/20))):e>0?1:0}function q1(e){return e>0?Pf(j1(20*Math.log10(e))):0}function zs(e){return(Math.min(1,Math.max(0,e))*2-1)*_1}const nd={x:0,v:0};function V1(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=B1,o=e.x-t,s=e.v+r*o,l=Math.exp(-r*n),d=t+(o+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function H1(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Rf="netcomposer.studio.vu.v1";function U1(e){try{return e?.getItem(Rf)==="1"}catch{return!1}}function G1(e,t){try{e?.setItem(Rf,t?"1":"0")}catch{}}const Df="netcomposer.studio.vu-fold.v1";function K1(e){try{return e?.getItem(Df)==="1"}catch{return!1}}function W1(e,t){try{e?.setItem(Df,t?"1":"0")}catch{}}const Y1="http://www.w3.org/2000/svg",Ki=200,Zo=112,$n=Ki/2,ga=132,ad=100,X1=108,J1=105,Q1=116,Z1=103,ex=112,yt=(e,t)=>{const n=document.createElementNS(Y1,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},rd=e=>Math.round(e*100)/100;function ba(e,t){const n=zs(Pf(e))*Math.PI/180;return[rd($n+t*Math.sin(n)),rd(ga-t*Math.cos(n))]}function od(e,t,n){const[a,r]=ba(e,n),[o,s]=ba(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const tx=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function id(e){const t=yt("svg",{class:"vu-meter",viewBox:`0 0 ${Ki} ${Zo}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(yt("rect",{class:"vu-face",x:.5,y:.5,width:Ki-1,height:Zo-1,rx:4})),t.append(yt("path",{class:"vu-arc",d:od(D1,0,ad)})),t.append(yt("path",{class:"vu-zone",d:od(0,Ff,Z1)}));for(const o of O1){const[s,l]=ba(o,ad),[d,u]=ba(o,td.includes(o)?X1:J1);t.append(yt("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const o of td){const[s,l]=ba(o,Q1),d=yt("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(o)===20||o===3?tx(o):String(Math.abs(o)),t.append(d)}const n=yt("text",{class:"vu-legend",x:$n,y:92,"text-anchor":"middle"});n.textContent="VU";const a=yt("text",{class:"vu-side",x:10,y:Zo-10});a.textContent=e;const r=yt("line",{class:"vu-needle",x1:$n,y1:ga,x2:$n,y2:ga-ex,transform:`rotate(${zs(0)} ${$n} ${ga})`});return t.append(n,a,r),{svg:t,needle:r}}function nx(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",ee["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",ee["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",ee["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(y=>{const E=document.createElement("span");E.className="vu-bar",E.dataset.side=y;const k=document.createElement("span");return k.className="vu-bar-fill",E.append(k),l.append(E),k});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=id("L"),h=id("R");t.append(n,p.svg,h.svg,l);const b=matchMedia("(prefers-reduced-motion: reduce)"),m=[nd,nd],v=[Number.NaN,Number.NaN],f=[p.needle,h.needle];return{el:t,frame(y,E){let k=!1;for(const L of[0,1]){const x=y?q1(y[L]):0;m[L]=V1(m[L],x,E,b.matches),(!H1(m[L],x)||x>0)&&(k=!0);const g=Math.round(zs(m[L].x)*10)/10;g!==v[L]&&(v[L]=g,f[L].setAttribute("transform",`rotate(${g} ${$n} ${ga})`),d[L].style.transform=`scaleY(${Math.max(0,Math.min(1,m[L].x)).toFixed(3)})`,t.dataset[L===0?"vuL":"vuR"]=g.toFixed(1))}return k}}}const ax="netcomposer.studio.hidden.v1",rr=1/120,Ft="master",sd="Inserts",rx="(max-width: 768px)",Of=8,br=e=>r1(zr(e)),ld=e=>{const t=br(e);return t==="−∞"?"off":`${t} dB`};function ox(e,t){return An.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function ix(e,t,n){const a=n.bpm,r=M=>{const F=n.order(),O=F.indexOf(M);return O<0?F.length:O},o=(M,F,O,j)=>{const _=ox(O,j);if(!_||!F)return null;const ne=Number(F.getParam(O,j)??_.default),ie=`mix-${M}-${j}`;return _.options?{type:"select",id:ie,label:_.label,value:String(ne),options:_.options.map(B=>({value:String(B.value),label:B.label})),onChange:B=>{F.setParam(O,j,Number(B)),ce.render()}}:{type:"slider",id:ie,label:_.label,min:_.min,max:_.max,step:_.step??1,taper:oc(_),value:ne,valueText:_.format(ne,a()),onChange:B=>{F.setParam(O,j,B),ce.render()}}},s=(M,F,O,j)=>j.map(_=>o(M,F,O,_)).filter(_=>_!==null),l=matchMedia(rx);let d=null;const u=M=>{d=M,ce.render()},c=M=>u(d===M?null:M);l.addEventListener("change",()=>ce.render());const p=(M,F,O,j)=>{M.setParam(F,O,j),ce.render()},h=(M,F,O,j)=>Xg(F,O,{id:`hack-${M}-${O}-graph`,on:j,set:(_,ne)=>p(F,O,_,ne),help:{graph:ee["eq:graph"],low:ee["eq:low"],mid:ee["eq:mid"],high:ee["eq:high"]}}),b=(M,F,O,j)=>{const _=Number(F.getParam(O,j.key)??j.default),ne=`hack-${M}-${O}-${j.key}`,ie=B=>p(F,O,j.key,B);return j.options?{type:"select",id:ne,label:j.label,value:String(_),options:j.options.map(B=>({value:String(B.value),label:B.label})),onChange:B=>ie(Number(B))}:{type:"slider",id:ne,label:j.label,min:j.min,max:j.max,step:j.step??.001,taper:oc(j),value:_,valueText:bu(j,_,a()),onChange:ie}},m="",v={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let f=Jv(Se(),`${Ft}/${df}`);const y=M=>({folded:f.has(M),onFold:F=>{f=lf(Se(),M,F),ce.render()},foldHelp:ee["fx:fold"]}),E=n.plugins;E?.onChange(()=>ce.render());const k=new Map,L=M=>String(M?.message??M).replace(/^nc-fx plugins?: /,""),x=(M,F,O)=>{k.set(M,F),ce.render(),$t({message:O,duration:9e3,anchor:he.el.querySelector(`[data-nc-id='hack-${M}-add']`)})},g=(M,F)=>{const O=$t({message:F,duration:12e3,actionLabel:U.reloadAction,onAction:()=>location.reload(),anchor:he.el.querySelector(`[data-nc-id='hack-${M}-add']`)});O.el.dataset.pluginReload=M},w=M=>pe(M)?.label??M,A=M=>!!M&&M.startsWith("plugin:")&&!!E?.stale(M.slice(7)),T=async(M,F,O)=>{if(!E)return null;const j=O??await zb({title:U.urlTitle,body:U.urlBody,field:{label:U.urlField,placeholder:E.remote?U.urlPlaceholder:U.urlPlaceholderLocal,type:"url"},confirmLabel:U.urlNext,returnFocus:F??void 0});if(!j)return null;const _=$1(j,location.href,E.remote);if(!_)return x(M,U.badUrlShort,E.remote?U.badUrl:U.badUrlLocal),null;if(!await dt({title:U.warnTitle,body:U.warnBody(na(_)),confirmLabel:U.warnLoad,danger:!0,returnFocus:F??void 0}))return null;try{const ie=await E.loadUrl(_);return A(ie)&&g(M,U.reloadToHear(w(ie))),ie}catch(ie){return ie?.reload?(k.set(M,U.failedShort),ce.render(),g(M,L(ie))):x(M,U.failedShort,L(ie)),null}},D=M=>{const F=document.createElement("input");return F.type="file",F.hidden=!0,F.dataset.ncId="plugin-files",M?F.webkitdirectory=!0:(F.multiple=!0,F.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(F),new Promise(O=>{const j=_=>{F.remove(),O(_)};F.addEventListener("change",()=>j(F.files?.length?[...F.files]:null)),F.addEventListener("cancel",()=>j(null)),F.click()})},$=async(M,F,O)=>{if(!E)return null;const j=await D(O);if(!j)return null;let _;try{_=await jw(j)}catch(ie){return x(M,U.failedShort,L(ie)),null}if(!await dt({title:U.warnTitle,body:U.fileWarnBody(_.manifest.name,_.manifest.author),confirmLabel:U.warnLoad,danger:!0,returnFocus:F??void 0}))return null;try{const ie=await E.addPicked(_);return"reload"in ie?(g(M,U.reloadToUse(_.manifest.name,_.manifest.version)),null):ie.type}catch(ie){return x(M,U.failedShort,L(ie)),null}},S=async(M,F,O)=>{if(!E)return;const j=E.local().find(ne=>ne.id===F)?.name??F;await dt({title:U.forgetTitle(j),body:U.forgetBody,confirmLabel:U.forgetConfirm,danger:!0,returnFocus:O??void 0})&&(await E.forget(F),$t({message:U.forgotten(j),duration:5e3,anchor:he.el.querySelector(`[data-nc-id='hack-${M}-add']`)}))},N=async(M,F,O,j)=>{k.delete(M);let _=O;if(O===Yo||O===Zc)_=await $(M,j,O===Yo);else if(O.startsWith(Jo))await S(M,O.slice(Jo.length),j),_=null;else if(O.startsWith(Xo)&&E){ce.render();try{_=await E.loadKept(O.slice(Xo.length)),A(_)&&g(M,U.reloadToHear(w(_)))}catch(ne){x(M,U.failedShort,L(ne)),_=null}}else if(O===Qc)_=await T(M,j);else if(O.startsWith(Qo)&&E){ce.render();try{_=await E.loadListed(O.slice(Qo.length))}catch(ne){x(M,U.failedShort,L(ne)),_=null}}_&&F.addEffect(_,{dials:v[_]}),ce.render()},P=()=>E?[...E.listed().map(M=>({value:`${Qo}${M.id}`,label:M.name,group:"Plugins"})),...E.local().map(M=>({value:`${Xo}${M.id}`,label:U.kept(M.name),group:"Plugins"})),...E.loaded().map(M=>({value:M.type,label:`${M.label} (${na(M.plugin.url)})`,group:"Plugins"})),{value:Yo,label:U.folder,group:"Plugins"},{value:Zc,label:U.files,group:"Plugins"},{value:Qc,label:U.url,group:"Plugins"},...E.local().map(M=>({value:`${Jo}${M.id}`,label:U.forget(M.name),group:"Plugins"}))]:[];let I=null,V=null,G=null;const q=M=>t.masterFx===M||t.list().some(F=>F.fx===M),H=M=>requestAnimationFrame(()=>he.el.querySelector(M)?.focus()),re=(M,F,O,j,_,ne,ie)=>{const B=v1(O.getState(),j);if(!B||!O.removeEffect(j))return;const Ee=!!ie&&ie===document.activeElement;if(G?.close(),ce.render(),Ee){const Gt=O.getChain()[B.index];H(Gt?`[data-nc-id='hack-${M}-${Gt.id}'] [data-nc-fx-remove]`:`#hack-${M}-add-type`)}const Q=$t({message:`${_} removed from ${F}.`,actionLabel:"Undo",anchor:he.el.querySelector("[data-nc-area='fx']"),onAction:()=>be(M,O,B,ne),onClose:()=>{G===Q&&(G=null)}});Q.el.dataset.insertUndo=M,G=Q},be=(M,F,O,j)=>{if(!q(F))return;const _=w1(F.getState(),O,j);let ne=O.slot.id;if(_)F.setState(_);else{const{type:ie,dials:B,bypass:Ee,pattern:Q}=O.slot;ne=F.addEffect(ie,{index:O.index,dials:B,bypass:Ee}),ne&&Q&&F.setPattern(ne,Q)}ne&&(d=M,V=`hack-${M}-${ne}`,ce.render(),H(`[data-nc-id='hack-${M}-${ne}'] [data-nc-fx-remove]`))},se=(M,F,O,j)=>{const _=O.getChain(),ne=_.map((B,Ee)=>{const Q=pe(B.type),Gt=Q?.dials??[],Tl=fe=>re(M,F,O,B.id,B.name,j,fe),Ll=fe=>{O.moveEffect(B.id,fe),V=`hack-${M}-${B.id}`,ce.render()},Xn=[];Ee>0&&Xn.push({type:"button",id:`hack-${M}-${B.id}-left`,label:"Move left",on:!1,onPress:()=>Ll(Ee-1)}),Ee<_.length-1&&Xn.push({type:"button",id:`hack-${M}-${B.id}-right`,label:"Move right",on:!1,onPress:()=>Ll(Ee+1)}),Xn.push({type:"button",id:`hack-${M}-${B.id}-remove`,label:"Remove",ariaLabel:`Remove ${B.name} from ${F}`,on:!1,onPress:()=>Tl(document.getElementById(`hack-${M}-${B.id}-remove`))});const Cl={onRemove:fe=>Tl(fe),removeLabel:`Remove ${B.name}`},me=B.plugin,Ye=(fe,Kt,pn=!1)=>({type:"note",id:`hack-${M}-${B.id}-${fe}`,...pn?{tone:"danger"}:{},text:Kt});if(me&&me.status==="missing"){const fe=E?.listingFor(me)??null,Kt=Or(me.url),pn=Kt&&!!E?.local().some(Ua=>Ua.id===me.id),Nl=E?.loading(me.id)??!1,Il=Nl?[Ye("missing",U.loading)]:[Ye("missing",E?.frozen(me.id)?U.frozenShort:Kt&&!pn?U.notKept:me.url?U.missing:U.missingNoUrl,!0),Ye("through",U.through),Ye("kept",U.dialsKept),...me.url?[Ye("from",U.from(na(me.url)))]:[]];return E&&me.url&&!Nl&&Il.push({type:"button",id:`hack-${M}-${B.id}-load`,label:fe||pn?U.load:Kt?U.pickAgain:U.loadAsk,ariaLabel:fe||pn?`Load ${me.name}`:Kt?`Pick ${me.name}'s folder (asks first)`:`Load ${me.name} from ${na(me.url)} (asks first)`,on:!1,onPress:()=>{const Ua=document.getElementById(`hack-${M}-${B.id}-load`);fe?E.loadListed(me.id).catch(()=>ce.render()):pn?E.loadKept(me.id).catch(()=>ce.render()):Kt?$(M,Ua,!0).then(()=>ce.render()):T(M,Ua,me.url)}}),{type:"fx",id:`hack-${M}-${B.id}`,title:`${Ee+1} · ${B.name}`,...y(`${M}/${B.id}`),depth:Ee%4+1,controls:Il,more:Xn,...Cl}}const un=Q&&"plugin"in Q?Q.plugin:void 0,sm=un?[Ye("by",`By ${un.author}`),Ye("version",`${un.licence} · ${un.version}`),Ye("source",un.listed?"Listed":U.from(na(un.url)))]:[],lm=me?.status==="failed"?[Ye("failed",k1(me.error),!0),Ye("through",U.through),Ye("retry",U.retry)]:me&&E?.stale(me.id)?[Ye("newcode",U.newCode)]:[],Ha=B.type==="gate"?y1(M,O,B.id,!B.bypass,{dial:fe=>b(M,O,B.id,fe),render:()=>ce.render(),heardAt:()=>t.ctx.currentTime-(t.ctx.outputLatency||0)}):null;return{type:"fx",id:`hack-${M}-${B.id}`,title:`${Ee+1} · ${B.name}`,...y(`${M}/${B.id}`),depth:Ee%4+1,on:!B.bypass,meter:Io(O,B.id)??void 0,meterHelp:ee["fx:meter"],onToggle:fe=>{O.setParam(B.id,"bypass",!fe),ce.render()},controls:Ha?Ha.controls:[...lm,...B.type==="eq"?[h(M,O,B.id,!B.bypass)]:[],...Gt.filter(fe=>!fe.more).map(fe=>b(M,O,B.id,fe))],maxHelp:ee["fx:max"],...Cl,more:[...Ha?Ha.more:Gt.filter(fe=>fe.more).map(fe=>b(M,O,B.id,fe)),...sm,...Xn]}}),ie=_.length>=j;return ne.push({type:"fx",id:`hack-${M}-add`,title:`${F} · Inserts`,...y(`${M}/add`),depth:_.length%4+1,controls:[{type:"note",id:`hack-${M}-note`,...k.get(M)?{tone:"danger"}:{},text:k.get(M)??(E?.loading("url")||E?.listed().some(B=>E.loading(B.id))||E?.local().some(B=>E.loading(B.id))?U.loading:ie?`${_.length} of ${j}: the stack is full.`:_.length===0?"No effects yet.":`${_.length} of ${j}, first to last.`)},...ie?[]:[{type:"select",id:`hack-${M}-add-type`,label:"Add",value:m,options:[{value:m,label:"Effect…"},...Om.map(B=>({value:B,label:pe(B)?.label??B})),...P()],onChange:B=>{if(B===m)return;const Ee=document.getElementById(`hack-${M}-add-type`);Ee instanceof HTMLSelectElement&&(Ee.value=m),N(M,O,B,Ee)}}]]}),ne},Ce=M=>{const F=t.returns[M];return{type:"slider",id:`mix-${M}-return`,label:"Return",min:0,max:1,step:rr,value:F.level,valueText:ld(F.level),onChange:O=>t.setReturn(M,{level:O})}};let ye=A1(Se());const Y=()=>M1(globalThis.window,{portrait:Up,landscape:Uu}),ke=()=>{const M=T1({hacksShown:d,sendsShown:ye});d=M.hacksShown,M.sendsShown!==ye&&(ye=M.sendsShown,S1(Se(),ye)),ce.render()},$e=(M,F,O)=>{const j=P1(n.order(),M,F);if(!j)return;n.onReorder?.(j.id,j.before);const ne=he.el.querySelector(`${Dt}[data-nc-id="strip-${CSS.escape(M)}"]`)?.querySelector(O);ne&&document.activeElement!==ne&&ne.focus()};let et=I1(Se(),n.order());const gt=()=>C1(Y(),{hacksShown:d,sendsShown:ye},t.list().map(M=>M.strip.trim)),om=()=>[...t.list()].sort((M,F)=>r(M.id)-r(F.id)).map(M=>({type:"strip",id:`strip-${M.id}`,label:M.name,value:M.strip.position,valueText:br(M.strip.position),step:rr,defaultValue:Ui,resetText:`${br(Ui)} dB`,ticks:[...Wc],mute:M.strip.mute,solo:M.strip.solo,silent:M.silent,sendsHidden:ed(Y(),ye),onChange:F=>t.set(M.id,{position:F}),onTypeIn:F=>{const O=Yc(F);O!==null&&t.set(M.id,{position:O})},onRemove:F=>n.onRemove(M.id,F),folded:et.has(M.id),onFold:F=>{et=Nf(Se(),M.id,F),ce.render()},foldHelp:ee["strip:fold"],foldedHelp:ee["strip:folded"],onMove:F=>$e(M.id,F,"[data-nc-strip-grip]"),shade:M.strip.shade,onShade:F=>t.set(M.id,{shade:F??0}),...M.fx?{hacks:d===M.id,hacksLabel:sd,hacksEmpty:M.fx.getChain().length===0,onHacks:()=>c(M.id)}:{},trim:{id:`trim-${M.id}`,value:M.strip.trim,min:wf,max:xf,step:c1,defaultValue:0,ariaLabel:`${M.name} trim`,help:ee["strip:trim"],onChange:F=>t.set(M.id,{trim:kf(F)})},trimHidden:gt(),pan:{id:`pan-${M.id}`,value:M.strip.pan,ariaLabel:`${M.name} pan`,help:ee["strip:pan"],onChange:F=>t.set(M.id,{pan:Math.abs(F)<.005?0:F})},onMute:()=>t.set(M.id,{mute:!M.strip.mute}),onSolo:()=>t.set(M.id,{solo:!M.strip.solo}),sends:["A","B"].map(F=>{const O=F==="A"?"sendA":"sendB",j=M.strip[O];return{id:`send-${F.toLowerCase()}-${M.id}`,label:F,ariaLabel:`${M.name} send ${F}`,min:0,max:pt,step:rr*2,value:j,valueText:ld(j),defaultValue:0,onChange:_=>t.set(M.id,{[O]:_})}})})),im=()=>({type:"strip",id:`strip-${Ft}`,label:"Master",master:!0,sendsHidden:ed(Y(),ye),trimRow:!0,trimHidden:gt(),onSendsView:ke,sendsView:_r({hacksShown:d,sendsShown:ye}).kind==="sends",sendsViewEmpty:!L1(t.list().map(M=>M.strip)),sendsViewLabel:"Sends",sendsViewHelp:ee["sends:view"],...t.masterFx?{hacks:d===Ft,hacksLabel:sd,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(Ft)}:{},channels:2,value:t.masterPositionValue,valueText:br(t.masterPositionValue),step:rr,defaultValue:pt,resetText:"0.0 dB",ticks:[...Wc],onChange:M=>t.setMaster(M),onTypeIn:M=>{const F=Yc(M);F!==null&&t.setMaster(F)}});let wl=af(Se());const xl=M=>({folded:wl[M],foldSlim:!0,onFold:F=>{wl=rf(Se(),M,F),ce.render()},foldHelp:ee["fx:fold"]});let Wn=U1(Se()),dn=null,Yn=!0;const kl=M=>{Wn=M,Yn=!0,G1(Se(),M),ce.render()},$l=()=>{const M=t.returns.a,F=t.returns.b,O=d===Ft&&t.masterFx?{id:Ft,name:"Master",fx:t.masterFx}:(()=>{const Q=t.list().find(Gt=>Gt.id===d);return Q?.fx?{id:Q.id,name:Q.name,fx:Q.fx}:null})();O||(d=null);const j=t.masterFx?.getChain()??[],_=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:M.on,onToggle:Q=>t.setReturn("a",{on:Q}),meter:Io(M.fx)??void 0,meterHelp:ee["fx:meter-return"],...xl("a"),controls:[Ce("a"),...s("a",M.fx,"plate",["decay","size"])],more:s("a",M.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:F.on,onToggle:Q=>t.setReturn("b",{on:Q}),meter:Io(F.fx)??void 0,meterHelp:ee["fx:meter-return"],...xl("b"),controls:[Ce("b"),...s("b",F.fx,"delay",["delay_beats","feedback"])],more:s("b",F.fx,"delay",["tone","low_cut"])}],ne=O?[...se(O.id,O.name,O.fx,O.id===Ft?_i:Of)]:ye?_:[],ie=O?.id??"sends",B=ne.map(Q=>Q.id),Ee=g1(I,ie,B,V);return I={key:ie,ids:B,page:Ee},V=null,{id:"mix",title:"Mix",summary:`${t.list().map(Q=>Q.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${j.filter(Q=>!Q.bypass).map(Q=>Q.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...om(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(Q=>({value:Q.id,label:Q.available===!1?`${Q.name} (soon)`:Q.name,disabled:Q.available===!1})),onAdd:Q=>n.onAdd(Q)}]},{id:"fx",area:"fx",label:O?`${O.name} inserts`:"Send effects",pageSize:co,page:Ee,onPage:Q=>{I&&(I={...I,page:Q})},controls:ne},...Wn?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[im()]}]}},he=dv($l(),ax),El=()=>he.el.toggleAttribute("data-hacks-folded",_r({hacksShown:d,sendsShown:ye}).kind==="none"&&l.matches);El();const rt=document.createElement("button");rt.type="button",rt.className="nc-page-action vu-add",rt.dataset.vuAdd="",rt.textContent="+ Meters",rt.setAttribute("aria-label","Add VU meters"),rt.setAttribute("data-nc-help",ee["vu:add"]),rt.addEventListener("click",()=>{kl(!0),dn?.el.querySelector("[data-vu-remove]")?.focus()}),he.el.querySelector(".nc-module-end")?.prepend(rt);const Al=()=>he.el.toggleAttribute("data-sends-hidden",!ye);Al();const Sl=()=>{rt.hidden=Wn;const M=he.el.querySelector('[data-nc-section="meters"]');!Wn||!M||(dn??=nx({onRemove:()=>{kl(!1),rt.focus()},folded:K1(Se()),onFold:F=>{Yn=!0,W1(Se(),F)}}),dn.el.parentElement!==M&&M.append(dn.el))};Sl(),ux(he.el,n,$e),dx(he.el,t,n),dd(he.el),cd(he.el),uv(e,[he],"adjacent");const Ml=M=>({peak:Kc(M.peak),rms:Kc(M.rms),over:M.peak>=i1}),ce={module:he,get hacksShown(){return d},showHacks:u,render(){he.update($l()),El(),Sl(),Al(),dd(he.el),cd(he.el)},frame(M){if(he.el.dataset.ncOpen!=="true")return;for(const O of t.list())Cc(he.el,`strip-${O.id}`)?.update([Ml(O.levels())],M);const F=t.masterLevels();if(Cc(he.el,`strip-${Ft}`)?.update(F.map(Ml),M),dn&&Wn){const O=t.ctx.state==="running";O&&(Yn=!0),Yn&&(Yn=dn.frame(O?[F[0].rms,F[1].rms]:null,M))}}};return ce}const Dt=".nc-strip:not([data-nc-master])",yr=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,sx="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",lx=6,cx=400,or=12;function cd(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?ee["inserts:master"]:ee["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",ee["mix:sends"])}function dd(e){for(const t of e.querySelectorAll(`${Dt} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",ee["strip:name"]);for(const t of e.querySelectorAll(`${Dt} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function dx(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(Dt),s=yr(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(h=>h.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=Fs,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",ee["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=h=>{if(c)return;c=!0;const b=u.value;u.remove(),l.removeAttribute("data-renaming"),h&&b!==d&&n.onRename?.(s,b)};u.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",h=>h.stopPropagation())})}function ux(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},o=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(Dt)].map(c=>{const p=c.getBoundingClientRect();return{id:yr(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const h=c.strip.parentElement;if(h&&h.scrollWidth>h.clientWidth){const v=h.getBoundingClientRect();p<v.left+or*2?h.scrollLeft-=or:p>v.right-or*2&&(h.scrollLeft+=or)}const b=If(l(),p),m=b?Gi(t.order(),c.id,b):null;c.mark=m?b:null,r(),c.mark&&e.querySelector(`${Dt}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const h=p.closest(sx),b=h?.closest(Dt),m=yr(b??null);if(!h||!b||!m)return;const v={id:m,strip:b,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:h.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=v,v.touch&&!v.grip&&(v.timer=window.setTimeout(()=>{a===v&&!v.active&&s(v)},cx)),v.grip&&!v.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<lx)return;if(p.touch&&!p.grip)return o();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const h=p.active?p.mark:null,b=p.active;if(o(),!b)return;u();const m=h?Gi(t.order(),p.id,h):null;m&&t.onReorder?.(m.id,m.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&o()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&o()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,h=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!h||p.closest("input, [data-nc-strip-grip]"))return;const b=yr(h.closest(Dt));if(!b)return;c.preventDefault();const m=h.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":h.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(b,c.key==="ArrowLeft"?-1:1,m)})}const px=1e-5,fx=2e3,hx=500,ya={parked:!1,quietSince:null};function mx(e,t,n,a){if(t)return ya;if(e.parked)return e;if(!(n<px))return ya;const r=e.quietSince??a;return{parked:a-r>=fx,quietSince:r}}const ud=e=>10**(e/20),vt=.012,ei=1024,pd=32768;class gx{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:ya,b:ya};parkMeters;parkScratch=new Float32Array(pd);masterPosition=pt;channels=[];listeners=new Set;scratch=new Float32Array(ei);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:ei});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:Pt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,Dr),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const o=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:Pt(pt)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:pt}};this.returns={a:o("a"),b:o("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:pd});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),o=this.restore?.(t)??vf,s=new GainNode(this.ctx,{gain:ud(o.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:ei}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const h=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),b=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),m=new GainNode(this.ctx,{gain:1}),v=new GainNode(this.ctx,{gain:1}),f=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(h).connect(b),b.connect(m,0).connect(f,0,0),b.connect(v,1).connect(f,0,1),f.connect(this.bus),f.connect(u).connect(this.returns.a.bus),f.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:h,split:b,balL:m,balR:v,panner:f,meter:d,sendA:u,sendB:c,fx:p,strip:o},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(o=>o.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}channelOutDb(t){const n=this.channels.find(a=>a.id===t);return n?n.strip.trim+zr(n.strip.position)+zr(this.masterPosition)+ww:null}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(Pt(t),this.ctx.currentTime,vt),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,vt),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(Pt(a.level),r,vt)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>Pt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=ya,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=mx(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=o1(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,vt),a.trim.gain.setTargetAtTime(ud(a.strip.trim),n,vt),a.sendA.gain.setTargetAtTime(Pt(a.strip.sendA),n,vt),a.sendB.gain.setTargetAtTime(Pt(a.strip.sendB),n,vt);const[o,s]=l1(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,vt),a.balR.gain.setTargetAtTime(s,n,vt)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),s1(this.scratch)}emit(){for(const t of this.listeners)t()}}const bx=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],aa=(e,t)=>t.map(([n,a,r,o])=>({id:n,name:a,intervals:r,category:e,symbol:o})),zf=[...aa("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...aa("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...aa("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...aa("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...aa("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],Bf=new Map(zf.map(e=>[e.id,e])),ti={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function yx(e){if(typeof e!="string")return"major";if(Bf.has(e))return e;if(ti[e])return ti[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(ti).find(([a])=>t(a)===n)?.[1]??zf.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function Bs(e){return Bf.get(yx(e))}const Wi=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function _f(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const o=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+o)}function vx(e,t,n=0,a="compact"){const o=Bs(t).intervals.map(l=>Wi(e,0,127)+l);for(let l=0;l<Wi(n,0,o.length-1);l++){const d=o.shift(),u=o[o.length-1];o.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return _f(o.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,o.length-1))))}function wx(e,t=1){return[...new Set(Array.from({length:Wi(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function xx(e,t){const n=[...new Set(e)].sort((o,s)=>o-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(o=>n[a-1-n.indexOf(o)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const o=[];for(let s=0,l=a-1;s<=l;s++,l--)o.push(n[s]),s!==l&&o.push(n[l]);return o}case"inside-out":return n.map((o,s)=>({note:o,i:s})).sort((o,s)=>Math.abs(o.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||o.i-s.i).map(o=>o.note);case"pendulum":{const o=Math.floor((a-1)/2);return[...r.slice(o),...r.slice(0,o)]}case"blossom-up":case"blossom-down":{const o=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[o]];for(let d=1;l.length<a;d++)for(const u of[o+s*d,o-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const o=t.startsWith("low"),s=o?n[0]:n[a-1],l=o?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const kx=16,Yi={hits:5,steps:8,rotate:0};function jf(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(kx,t(e?.arpSteps,Yi.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,Yi.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function qf(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function $x(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)qf(e,a)&&n++;return n}const Ex=1592598566;function Ax(e){let t=(Math.imul(e^Ex,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const fd=new Map;function Sx(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=fd.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:o}=a;for(;r<n;r++){const s=Ax(r+1);o=(o+(s<.5?1:s<.75?0:e-1))%e}return fd.set(e,{step:r,pos:o}),o}function Mx(e,t,n,a=Yi,r=Math.random){if(t<1)return null;const o=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Sx(t,n);if(e==="euclidean"){const s=jf({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return qf(s,l)?o($x(s,l)):null}return o(n)}const _s=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(_s.map(e=>e.id));new Map(_s.map(e=>[e.num,e.id]));_s.map(e=>({value:e.id,label:e.name}));const Vf=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];Vf.map(e=>e.id);const hd=e=>Vf.find(t=>t.id===e)?.kind??"repeat",Tx=15,Lx=40,He=e=>[...e].sort((t,n)=>t-n);function Hf(e,t){const n=He(e);for(let a=0;a<t;a++){const r=n.shift(),o=n[n.length-1]??r;n.push(r+Math.ceil((o-r+1)/12)*12)}return n}const ir=e=>Hf(e,1);function Cx(e,t){const n=e[0];return n-((n-t)%12+12)%12}function Nx(e,t){const n=He(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return He([n[0],...n.slice(2),n[1]+12]);case 2:return He([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return He([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function Ix(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),o=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-o%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=o%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return o%r}}function Fx(e,t,n,a,r=Math.random){const o=He(t);if(!o.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:o,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Hf(o,Ix(e,o.length,n,r)),velocity:.9};case"alberti":return{notes:[[o[0],o[2]??o[o.length-1],o[1]??o[0],o[2]??o[o.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:o,velocity:s?1:.45}}case"drift":return{notes:Nx(o,n),velocity:.9};default:return null}}function Px(e,t,n,a,r=t){const o=He(t);if(!o.length)return[];const s=(d,u,c,p)=>d.map(h=>({step:h,len:u,notes:c,velocity:p})),l=Cx(o,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,ir(o),.75),...s([8],3,[l-12],1),...s([12],2,ir(o),.75)];case"charleston":return s([0,6],2,o,.9);case"skank":return s([4,12],1,ir(o),.9);case"house":return s([2,6,10,14],1,ir(o),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],h=[d,u];return[[0,p],[3,h],[5,p],[6,h],[8,[u,c]],[10,p],[13,h],[14,[u,l+12]]].map(([b,m])=>({step:b,len:1,notes:He(m),velocity:.85}))}case"push":return[...s([0],6,o,.9),...s([6],2,o,.9),{step:14,len:2,notes:He(r),velocity:.9,next:!0}];case"strum":{const d=[...o,o[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function Rx(e,t,n){const a=n==="down"?He(e):He(e).reverse(),r=Math.max(0,Math.min(Lx,t))/1e3;return a.map((o,s)=>({midi:o,offset:s*r}))}const md=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function Dx(e){const t=new Set(e.map(o=>(o%12+12)%12)),n=o=>t.has(o);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(o=>!n(o%12))}function Ox(e,t,n,a=Math.random){const r=Dx(n);if(!r.length||!e.length)return null;const o=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((o-(s+1))%12+12)%12;return l<=127?l:null}function Xi(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),o=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<o;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return _f(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function zx(e,t){const n=He(e),a=He(t);if(n.length===a.length)return n.reduce((o,s,l)=>o+Math.abs(s-a[l]),0);const r=(o,s)=>Math.min(...s.map(l=>Math.abs(l-o)));return n.reduce((o,s)=>o+r(s,a),0)+a.reduce((o,s)=>o+r(s,n),0)}function Bx(e,t,n,a,r,o="compact",s){const l=Xi(t,n,s??r,o);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((h,b)=>b);for(const h of p)for(const b of[-24,-12,0,12]){const m=Xi(t,n,h,o).map(y=>y+b);if(m[0]<a-7||m[0]>a+12||m[0]<0||m[m.length-1]>127)continue;const v=zx(m,e),f=Math.abs(m.reduce((y,E)=>y+E,0)/m.length-e.reduce((y,E)=>y+E,0)/e.length);(v<u-1e-9||Math.abs(v-u)<1e-9&&f<c-1e-9)&&(d=m,u=v,c=f)}return d}const _x={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},C=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),X="major",Ne="minor",J="dominant-7",oe="minor-7",Pe="major-7",ni="half-diminished-7",ai="diminished-7",Z=(e,t,n,a,r,o)=>({id:e,group:t,name:n,level:a,tonality:r,chords:o,short:_x[t]}),gd=e=>[C(0,J,"I7"),C(e==="IV7"?5:0,J,e),C(0,J,"I7"),C(0,J,"I7"),C(5,J,"IV7"),C(5,J,"IV7"),C(0,J,"I7"),C(0,J,"I7"),C(7,J,"V7"),C(5,J,"IV7"),C(0,J,"I7"),C(7,J,"V7")],Uf=[Z("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[C(0,X,"I"),C(7,X,"V"),C(9,Ne,"vi"),C(5,X,"IV")]),Z("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[C(9,Ne,"vi"),C(5,X,"IV"),C(0,X,"I"),C(7,X,"V")]),Z("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[C(0,X,"I"),C(9,Ne,"vi"),C(5,X,"IV"),C(7,X,"V")]),Z("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[C(0,X,"I"),C(10,X,"♭VII"),C(5,X,"IV",2)]),Z("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[C(0,X,"I",.5),C(7,X,"V",.5),C(9,Ne,"vi",.5),C(4,Ne,"iii",.5),C(5,X,"IV",.5),C(0,X,"I",.5),C(5,X,"IV",.5),C(7,X,"V",.5)]),Z("blues-12","Blues","12-bar",1,"blues",gd("I7")),Z("blues-12-quick","Blues","12-bar quick change",2,"blues",gd("IV7")),Z("blues-minor","Blues","Minor blues",2,"minor",[C(0,oe,"i7"),C(0,oe,"i7"),C(0,oe,"i7"),C(0,oe,"i7"),C(5,oe,"iv7"),C(5,oe,"iv7"),C(0,oe,"i7"),C(0,oe,"i7"),C(8,J,"♭VI7"),C(7,J,"V7"),C(0,oe,"i7"),C(7,J,"V7")]),Z("blues-jazz","Blues","Jazz blues",3,"blues",[C(0,J,"I7"),C(5,J,"IV7"),C(0,J,"I7"),C(7,oe,"v7",.5),C(0,J,"I7",.5),C(5,J,"IV7"),C(6,ai,"♯iv°7"),C(0,J,"I7"),C(9,J,"VI7"),C(2,oe,"ii7"),C(7,J,"V7"),C(0,J,"I7",.5),C(9,J,"VI7",.5),C(2,oe,"ii7",.5),C(7,J,"V7",.5)]),Z("jazz-2-5-1","Jazz","ii–V–I",1,"major",[C(2,oe,"ii7"),C(7,J,"V7"),C(0,Pe,"Imaj7",2)]),Z("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[C(2,ni,"iiø7"),C(7,"7b9","V7♭9"),C(0,"minor-6","i6",2)]),Z("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[C(0,Pe,"Imaj7",.5),C(9,oe,"vi7",.5),C(2,oe,"ii7",.5),C(7,J,"V7",.5)]),Z("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[C(4,oe,"iii7",.5),C(9,J,"VI7",.5),C(2,oe,"ii7",.5),C(7,J,"V7",.5)]),Z("jazz-autumn","Jazz","Autumn cycle",3,"minor",[C(5,oe,"iv7"),C(10,J,"♭VII7"),C(3,Pe,"♭IIImaj7"),C(8,Pe,"♭VImaj7"),C(2,ni,"iiø7"),C(7,"7b9","V7♭9"),C(0,oe,"i7",2)]),Z("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[C(0,Pe,"Imaj7",.5),C(3,J,"♭III7",.5),C(8,Pe,"♭VImaj7",.5),C(11,J,"VII7",.5),C(4,Pe,"IIImaj7"),C(10,oe,"♭vii7",.5),C(3,J,"♭III7",.5),C(8,Pe,"♭VImaj7",.5),C(11,J,"VII7",.5),C(4,Pe,"IIImaj7",.5),C(7,J,"V7",.5),C(0,Pe,"Imaj7"),C(6,oe,"♯iv7",.5),C(11,J,"VII7",.5)]),Z("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[C(0,oe,"i7"),C(5,J,"IV7")]),Z("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[C(5,Pe,"IVmaj7"),C(4,oe,"iii7"),C(2,oe,"ii7"),C(0,Pe,"Imaj7")]),Z("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[C(5,Pe,"IVmaj7"),C(4,J,"III7"),C(9,oe,"vi7"),C(7,oe,"v7",.5),C(0,J,"I7",.5)]),Z("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[C(2,"minor-9","ii9"),C(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),C(0,"major-9","Imaj9",2)]),Z("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[C(0,X,"I"),C(5,X,"IV",.5),C(6,ai,"♯iv°7",.5)]),Z("gospel-7-3-6","Gospel","7–3–6",3,"major",[C(11,ni,"viiø7"),C(4,J,"III7"),C(9,oe,"vi7",2)]),Z("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[C(0,X,"I",.5),C(0,J,"I7",.5),C(5,X,"IV",.5),C(6,ai,"♯iv°7",.5),C(0,X,"I/V",2,{inversion:2})]),Z("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[C(0,Ne,"i"),C(8,X,"VI"),C(3,X,"III"),C(10,X,"VII")]),Z("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[C(0,Ne,"i"),C(10,X,"VII"),C(8,X,"VI"),C(10,X,"VII")]),Z("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[C(0,oe,"i7"),C(5,oe,"iv7")]),Z("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[C(0,Ne,"i"),C(8,X,"VI"),C(10,X,"VII"),C(7,Ne,"v")]),Z("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[C(5,Ne,"iv"),C(0,Ne,"i")]),Z("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[C(0,X,"I"),C(8,X,"♭VI"),C(10,X,"♭VII"),C(0,X,"I")]),Z("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[C(0,X,"I"),C(4,X,"III")]),Z("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[C(0,X,"I"),C(2,X,"II")]),Z("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[C(0,Ne,"i"),C(10,X,"♭VII"),C(8,X,"♭VI"),C(7,X,"V")]),Z("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[C(0,Ne,"i"),C(5,Ne,"iv"),C(7,J,"V7",2)]),Z("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[C(0,Pe,"Imaj7",2),C(2,J,"II7",2),C(2,oe,"ii7"),C(7,J,"V7")]),Z("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[C(2,"minor-9","ii9"),C(7,"dominant-9","V9"),C(0,"major-9","Imaj9"),C(9,"minor-9","vi9")]),Z("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[C(5,Pe,"IVmaj7"),C(4,oe,"iii7"),C(9,oe,"vi7",2)]),Z("modal-dorian","Modal","Dorian i–IV",1,"dorian",[C(0,Ne,"i"),C(5,X,"IV")]),Z("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[C(0,X,"I"),C(10,X,"♭VII")]),Z("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[C(0,Ne,"i"),C(1,X,"♭II")])];Uf.map(e=>e.id);const jx=e=>Uf.find(t=>t.id===e)??null;function ri(e,t,n,a=0){const r=jx(e);if(!r)return null;const o=(n+1)*12+t;return r.chords.map((s,l)=>{const d=Bs(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:o+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${bx[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const qx=e=>e.reduce((t,n)=>t+n.bars,0),Vx=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function bd(e,t){const n=qx(e),a=(t%n+n)%n;let r=0;for(let o=0;o<e.length;o++){if(a<r+e[o].bars-1e-9)return{chord:e[o],index:o,position:a,total:n};r+=e[o].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const Hx=16,Ux=()=>Array.from({length:Hx},()=>null),Gx=["off","single","chord","random"],Kx=e=>Gx.includes(e),Wx={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:Ux(),chordPadMode:"pad"};function yd(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=vx(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const o=wx(r,e.arpOctaves),s=xx(o,e.arp),l=Mx(e.arp,s.length,t,jf(e),n);return l===null?[]:[s[l]]}function vd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Yx(e,t,{octave:n}={}){if(t==="chord")return e.map(o=>({...o,role:"chord"}));const a=new Map;for(const o of e)a.set(o.hit,[...a.get(o.hit)??[],o]);const r=[];for(const o of a.values()){const s=o[0],l=Math.max(...o.map(d=>d.velocity));if(t==="top"){const d=o.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function Xx(e,t){return t.direction&&t.strumMs>0&&e.length>1?Rx(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function Jx(e,t=0){return Xx(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const wd=(e,t,n)=>Math.min(n,Math.max(t,e)),Qx=1e-9;function Zx(e,t){return t>0?Math.ceil(e/t-Qx)*t:e}const xd=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class js{step=0;grid={origin:0,index:0,interval:16};comp=xd(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,o=n?Zx(t,r):t;this.grid={origin:o,index:0,interval:a},this.step=Math.max(0,Math.round(o/r));const s=this.beatsPerBar();return this.comp=xd(o,n?0:Math.floor(t/s+1e-9)*s),o}clone(t={}){const n=new js(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&hd(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},h=yd(p,this.step,this.random);return this.step++,h.length?this.hit(t,a,h,1,null,c,!1,"arp"):null}if(hd(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=Fx(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,md(this.beatInBar(t)),l,!0,"chord")}if(!Kx(n.mode))return this.step++,null;const r=yd(n,this.step,this.random);if(this.step++,!r.length)return null;const o=n.mode==="chord",s=o?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:wd(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:o?this.plainChordAt():null,root:s,role:o?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,o,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const h=Ox(c,s.rootPc,s.intervals,this.chordRandom);h!==null&&c.push(h)}const p=u.chordStyle==="strum"&&o?u.strum>0?u.strum:Tx:u.strum;return{beat:t,spanBeats:n,gate:wd(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:o,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=Bs(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=ri(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?bd(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const o=n.voiceLeading==="smooth"?Bx(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):Xi(t.root,t.intervals,a,n.arpSpread);return this.comp.last=o,this.comp.lastKey=r,o}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,o=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*o),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*o);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=h.last,this.comp.lastKey=h.key}}let c=Px(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<o-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),o=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(b=>l*r+b.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const h=this.chordAt(u.next?(l+1)*r:c);o.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??md(this.beatInBar(c)),h,!0,"chord"))}return o}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=ri(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=bd(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=ri(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const o=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/o-1e-9)*o;return this.comp.jump={at:l,origin:l-Vx(r,t)*o},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let o=0;o<4096;o++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(o=>o<t,n)):this.syncBars();const r=[];for(const o of a)r.push(...Jx(o,++this.serial));return r.sort((o,s)=>o.startBeat-s.startBeat)}}const Re=1,jr=1024,ek=48,Gf=128,kd=40,$d=64,Ji=8,Ed=16,qr=1024,Kf=16,qs=255,tk=["chord","root","top"],nk=["chord","root","top","arp","note"],sr=256,Ad=2,Sd=128,Wf=64,Qi=24,Md=4;function ak(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function oi(e,t,n,a,r={}){const o=new Map;return Yx(n,a,r).map(s=>{const l=o.get(s.hit)??0;return o.set(s.hit,l+1),{...s,id:ak(e,t,s.role,s.hit,l),source:e}})}const Ca=e=>typeof e=="object"&&e!==null,je=e=>typeof e=="string"&&e.length>0&&e.length<=Gf,Me=e=>typeof e=="number"&&Number.isFinite(e);function Td(e){return Ca(e)?je(e.id)?je(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!Me(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":Me(e.startBeat)?!Me(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!Me(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!Me(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!Me(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!nk.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!Yf(e.slice)?`slice must be a whole number 0–${qs}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const Yf=e=>Number.isInteger(e)&&e>=0&&e<=qs,rk=e=>Number.isInteger(e)&&e>=1&&e<=Kf;function Xf(e){return Ca(e)?je(e.id)?Me(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>Ed?`slot must be a whole number 1–${Ed}`:null:e.type==="chordPad"?e.pad!==null&&!rk(e.pad)?`pad must be a whole number 1–${Kf}, or null`:null:e.type==="take"?je(e.take)?!Me(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>sr?`lengthBeats must be above 0, at most ${sr}`:e.gain!==void 0&&(!Me(e.gain)||e.gain<0||e.gain>Ad)?`gain must be 0–${Ad}`:e.offsetBeats!==void 0&&(!Me(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=Sd&&e.peaks.every(t=>Me(t)&&t>=0&&t<=1))?`peaks must be at most ${Sd} values 0–1`:null:"bad take":e.type==="lap"?!Me(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>sr?`lengthBeats must be above 0, at most ${sr}`:null:e.type==="param"?typeof e.param!="string"||!ok.test(e.param)?`param must be 1–${Wf} letters, digits, '.', '-' or '_'`:Ld(e.value)?e.label!==void 0&&!Cd(e.label)?`label must be 1–${Qi} characters`:e.text!==void 0&&!Cd(e.text)?`text must be 1–${Qi} characters`:e.from!==void 0&&!Ld(e.from)?"from must be 0–1":e.glide!==void 0&&(!Me(e.glide)||e.glide<=0||e.glide>Md)?`glide must be above 0, at most ${Md} beats`:null:"value must be 0–1":"bad type":"bad beat":"bad id":"not an object"}const ok=new RegExp(`^[A-Za-z0-9._-]{1,${Wf}}$`),Ld=e=>Me(e)&&e>=0&&e<=1,Cd=e=>typeof e=="string"&&e.length>0&&e.length<=Qi;function ik(e){if(!Ca(e))return"not an object";if(e.type!=="note")return Xf(e);if(!je(e.id))return"bad id";if(!Me(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!Me(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!Yf(e.slice))return`slice must be a whole number 0–${qs}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>kd))return`name must be 1–${kd} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function Nd(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>jr)return`more than ${jr} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function sk(e){if(!Ca(e))return"not an object";if(e.v!==Re)return`version ${String(e.v)} is not ${Re}`;if(e.kind==="notes"){if(!je(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>jr)return`more than ${jr} events`;for(let t=0;t<e.events.length;t++){const n=Td(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!je(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>$d)return`more than ${$d} notes`;if(!Me(e.holdSec)||e.holdSec<=0||e.holdSec>Ji)return`holdSec must be above 0, at most ${Ji}`;for(let t=0;t<e.events.length;t++){const n=Td(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return je(e.source)?Nd(e.events,ik):"bad source";if(e.kind==="controls")return je(e.source)?Nd(e.events,Xf):"bad source";if(e.kind==="off")return je(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!Me(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!je(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>qr)return`more than ${qr} ids`;for(let t=0;t<e.ids.length;t++)if(!je(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!Ca(t)||!je(t.source)||typeof t.name!="string"||t.name.length>Gf)return"bad route";if(!tk.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=ek))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const Id=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),Jf=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:e.type==="param"?{type:"param",id:e.id,beat:e.beat,param:e.param,value:e.value,...e.label===void 0?{}:{label:e.label},...e.text===void 0?{}:{text:e.text},...e.from===void 0?{}:{from:e.from},...e.glide===void 0?{}:{glide:e.glide}}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},lk=e=>e.type!=="note"?Jf(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{}};function Fd(e){if(sk(e))return null;const t=e;return t.kind==="notes"?{v:Re,kind:"notes",source:t.source,events:t.events.map(Id)}:t.kind==="audition"?{v:Re,kind:"audition",source:t.source,events:t.events.map(Id),holdSec:t.holdSec}:t.kind==="played"?{v:Re,kind:"played",source:t.source,events:t.events.map(lk)}:t.kind==="controls"?{v:Re,kind:"controls",source:t.source,events:t.events.map(Jf)}:t.kind==="off"?{v:Re,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Re,kind:"release",source:t.source,ids:[...t.ids]}:{v:Re,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const ck=(e,t)=>({v:Re,kind:"notes",source:e,events:t}),lr=(e,t,n)=>({v:Re,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),dk=(e,t)=>({v:Re,kind:"release",source:e,ids:t}),uk=e=>({v:Re,kind:"routes",routes:e}),pk=(e,t,n)=>({v:Re,kind:"audition",source:e,events:t,holdSec:n}),Pd=(e,t)=>({v:Re,kind:"controls",source:e,events:t}),tt=1e-9,cr=new WeakMap;function fk(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,o={sent:{notes:0,off:0,routes:0,audition:0,controls:0,release:0},played:{events:0,refused:0},events:0,errors:0},s=new Set,l=()=>e.nowBeat?.()??null,d=new Set,u=()=>{for(const x of[...d])try{x()}catch{}},c=(x,g)=>!r.has(x)||t.get(g)?.targets.get(x)?.layer===!0,p=(x,g)=>{const w=n.get(x);if(!(!w||g.kind==="played")&&!(g.kind!=="routes"&&!c(x,g.source))){o.sent[g.kind]++,g.kind==="notes"&&(o.events+=g.events.length);try{w(g)}catch{o.errors++}try{e.onDeliver?.(x,g)}catch{}}},h=x=>{const g=[];for(const w of t.values()){const A=w.targets.get(x);A?.on&&c(x,w.handle.id)&&g.push({source:w.handle.id,name:w.handle.name,role:A.role,...A.octave===void 0?{}:{octave:A.octave},...A.transpose?{transpose:A.transpose}:{},...A.layer?{layer:!0}:{}})}return g},b=(x,g,w)=>{!x.targets.get(g)?.on||!w.length||p(g,Pd(x.handle.id,w.map(A=>({...A}))))},m=(x,g)=>{const w=l();return x.controls.filter(A=>(w===null||A.beat>=w-tt)&&(cr.get(A)??g)===g)},v=x=>p(x,uk(h(x))),f=(x,g,w)=>{const A=x.targets.get(g);if(!A?.on||!w.length)return;const T=Rd(oi(x.handle.id,x.run,w,A.role,{...A.octave===void 0?{}:{octave:A.octave}}),A.transpose??0);T.length&&p(g,ck(x.handle.id,T))},y=(x,g)=>{const w=[...x.current,...x.kept.filter(T=>T.startBeat<g-tt)];if(!w.length)return[];let A=w[0];for(const T of w)T.startBeat>A.startBeat+tt&&(A=T);return w.filter(T=>T.hit===A.hit&&Math.abs(T.startBeat-A.startBeat)<=tt)},E=(x,g)=>{const w=l(),A=D=>(cr.get(D)??g)===g;if(w===null)return x.kept.filter(A);const T=x.kept.filter(D=>D.startBeat>=w-tt);return(a.has(g)?[...y(x,w),...T]:T).filter(A)},k=x=>{const g=l();g!==null&&x.kept.length&&x.kept[0].startBeat<g-tt&&(x.current=y(x,g),x.kept=x.kept.filter(w=>w.startBeat>=g-tt)),g!==null&&x.controls.length&&(x.controls=x.controls.filter(w=>w.beat>=g-tt))};function L(x,g){const w=t.get(x);w&&w.handle.remove();const A={handle:void 0,run:1,kept:[],current:[],controls:[],targets:new Map,status:null,takeBack:null},T=()=>t.get(x)===A,D={id:x,name:g,send($,S){if(!T()||!$.length||S!==void 0&&(typeof S!="string"||!S))return;k(A);const N=$.map(P=>({...P}));if(S!==void 0)for(const P of N)cr.set(P,S);if(A.kept.push(...N),S!==void 0)A.targets.has(S)&&f(A,S,N);else for(const P of A.targets.keys())f(A,P,N)},sendControls($,S){if(!T()||!Array.isArray($)||!$.length||S!==void 0&&(typeof S!="string"||!S))return;const N=Fd(Pd(x,[...$]));if(!(!N||N.kind!=="controls")){if(k(A),S!==void 0)for(const P of N.events)cr.set(P,S);if(A.controls.push(...N.events),S!==void 0)A.targets.has(S)&&b(A,S,N.events);else for(const P of A.targets.keys())b(A,P,N.events)}},audition($,S){if(!T()||!$.length||!(S>0))return;const N=Math.min(S,Ji),P=$.map(G=>({...G})),I=()=>{if(T())for(const[G,q]of A.targets){if(!q.on||a.has(G))continue;const H=Rd(oi(x,0,P,q.role,{...q.octave===void 0?{}:{octave:q.octave}}),q.transpose??0);H.length&&p(G,pk(x,H,N))}};let V;try{V=e.startAudio?.()}catch{V=void 0}V?V.then(I,I):I()},restart(){T()&&(A.run++,A.kept=[],A.current=[],A.controls=[])},release($,S){if(!T()||!Array.isArray($)||!$.length||S!==void 0&&(typeof S!="string"||!S))return;const N=new Set($.map(P=>P.hit));A.kept=A.kept.filter(P=>!N.has(P.hit));for(const[P,I]of A.targets){if(!I.on||S!==void 0&&P!==S)continue;const V=oi(x,A.run,$,I.role,{...I.octave===void 0?{}:{octave:I.octave}});for(let G=0;G<V.length;G+=qr)p(P,dk(x,V.slice(G,G+qr).map(q=>q.id)))}},off($,S){if(T()){A.kept=S===void 0?[]:A.kept.filter(N=>N.startBeat<S-tt),(S===void 0||A.current.some(N=>N.startBeat>=S-tt))&&(A.current=[]),A.controls=S===void 0?[]:A.controls.filter(N=>N.beat<S-tt);for(const[N,P]of A.targets)P.on&&p(N,lr(x,$??"stop",S))}},setTarget($,S){if(!T()||typeof $!="string"||!$)return;const N=A.targets.get($),P=hk(S.transpose),I={role:S.role,on:S.on===!0,...S.octave===void 0?{}:{octave:S.octave},...P?{transpose:P}:{},...S.layer===!0?{layer:!0}:{}};A.targets.set($,I);const V=N!==void 0&&N.layer===!0!=(I.layer===!0),G=N&&(N.role!==I.role||N.octave!==I.octave||(N.transpose??0)!==(I.transpose??0))&&N.on;N?.on&&(!I.on||G)&&p($,lr(x,"off")),(!N||N.on!==I.on||G||V)&&v($),I.on&&(!N?.on||G)&&(f(A,$,E(A,$)),b(A,$,m(A,$))),(!N||N.on!==I.on)&&u()},removeTarget($){const S=A.targets.get($);!T()||!S||(A.targets.delete($),S.on&&(p($,lr(x,"removed")),v($)))},targets:()=>[...A.targets].map(([$,S])=>({target:$,...S})),remove(){if(!T())return;const $=[...A.targets].filter(([,S])=>S.on).map(([S])=>S);for(const S of $)p(S,lr(x,"removed"));t.delete(x);for(const S of $)v(S);u()},status($){if(!T())return;const S=$&&typeof $.now=="string"&&typeof $.next=="string"?{now:$.now.slice(0,32),next:$.next.slice(0,32)}:null;JSON.stringify(S)!==JSON.stringify(A.status)&&(A.status=S,u())},onTakeBack($){T()&&(A.takeBack=typeof $=="function"?$:null)}};return A.handle=D,t.set(x,A),D}return{source:L,sources:()=>[...t.values()].map(x=>x.handle),host:x=>({notesIn(g,w){if(typeof g!="function")return()=>{};const A=w?.takes==="pitch",T=w?.takes==="layer",D=!n.has(x)||a.has(x)!==A||r.has(x)!==T;n.set(x,g),A?a.add(x):a.delete(x),T?r.add(x):r.delete(x),D&&u(),v(x);for(const $ of t.values())$.targets.get(x)?.on&&(f($,x,E($,x)),b($,x,m($,x)));return()=>{n.get(x)===g&&(n.delete(x),a.delete(x),r.delete(x),u())}},notesSource:g=>L(x,String(g).slice(0,64)),notesTakeBack(g){const w=t.get(g);if(!w?.takeBack||!w.targets.has(x))return null;try{const A=w.takeBack(x);return A==null?null:structuredClone(A)}catch{return null}},notesOut(g){const w=g&&typeof g=="object"&&g.source===void 0?{...g,source:x}:g,A=Fd(w);if(!A||A.kind!=="played"||A.source!==x)return o.played.refused++,!1;if(!A.events.length)return!0;o.played.events+=A.events.length;for(const T of[...s])try{T(x,structuredClone(A.events))}catch{o.errors++}return!0},onPlayed(g){return typeof g!="function"?()=>{}:(s.add(g),()=>{s.delete(g)})}}),routesFor:h,listening:x=>n.has(x),takesPitch:x=>n.has(x)&&a.has(x),layerOnly:x=>n.has(x)&&r.has(x),drop(x){n.delete(x),a.delete(x),r.delete(x);for(const g of[...t.values()])g.handle.id===x?g.handle.remove():g.targets.delete(x);u()},statuses:()=>[...t.values()].filter(x=>x.status!==null).map(x=>({source:x.handle.id,name:x.handle.name,status:{...x.status}})),onChange(x){return d.add(x),()=>d.delete(x)},stats:()=>({sent:{...o.sent},played:{...o.played},events:o.events,errors:o.errors})}}function hk(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function Rd(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const mk=.5,gk=20;function bk(e,t,n={}){const a=n.aheadSec??mk,r=n.now??ze;let o={...Wx,...n.settings};const s=n.seed??1,l=()=>new js(()=>o,{random:vd(s),chordRandom:vd(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const f=t.transport;if(!d||!f.running)return;const y=d.window(f.beatAt(r()+a));y.length&&(u+=y.length,e.send(y))},h=(f,y)=>{d=l(),e.restart(),d.start(f,{join:y}),p()},b=t.onChange(f=>{if(!c){if(f.kind==="start")h(f.beat,!1);else if(f.kind==="stop")d=null,e.off("stop");else if(f.kind==="snapshot"){const y=t.transport;!y.running&&d?(d=null,e.off("stop")):y.running&&!d&&h(y.beatAt(Math.max(y.startTime??r(),r())),!0)}}}),m=(n.ticker??(f=>hu(f,{intervalMs:gk})))(p);m.start();const v=t.transport;return v.running&&h(v.beatAt(Math.max(v.startTime??r(),r())),!0),{source:e,set(f){o={...o,...f}},settings:()=>o,sent:()=>u,remove(){c||(c=!0,b(),m.dispose(),e.remove())}}}const yk={ready:"Offline ready",offline:"Offline — some features need the internet",update:"Update ready"};function vk(e,t,n=!1){return e?n?"update":t?t.page==="older"?"update":t.ready&&t.page==="current"?"ready":"none":"none":"offline"}function wk(e){if(!e||typeof e!="object")return null;const t=e;if(t.type!=="nc-offline:status"||typeof t.ready!="boolean")return null;const n=t.page==="current"||t.page==="older"?t.page:"unknown";return{ready:t.ready,page:n,bytes:typeof t.bytes=="number"?t.bytes:0}}const xk=2e3;function kk(e,t){const n={};for(const a of e){const r=new URL(a,t),o=r.searchParams.get("b");o&&(n[r.pathname]=o)}return n}async function $k(e,t,n={}){if(!e)return null;const a=new MessageChannel,r=new Promise(s=>{const l=setTimeout(()=>s(null),xk);a.port1.onmessage=d=>{clearTimeout(l),s(wk(d.data))}});e.postMessage({type:"nc-offline:status",script:t,builds:n},[a.port2]);const o=await r;return a.port1.close(),o}function Ek(e){const t=e.win??window,n=e.container??t.navigator.serviceWorker;if(!n)return()=>{};let a=!1,r=null,o="";const s=async()=>{if(a)return;const b=await $k(r?.active??null,e.script,e.builds?.()??{}),m=!!r?.active&&r.waiting?.state==="installed",v=vk(t.navigator.onLine,b,m),f=`${v} ${b?.page??""} ${b?.ready??""}`;f===o||a||(o=f,e.onChange(v,b))},l=()=>{t.navigator.onLine&&r?.update().catch(()=>{})},d=()=>{s(),l()},u=()=>void s(),c=b=>{b.data?.type==="nc-offline:activated"&&s()},p=()=>void s();t.addEventListener("online",d),t.addEventListener("offline",u),n.addEventListener("message",c),n.addEventListener("controllerchange",p);const h=t.setInterval(l,e.updateEveryMs??1800*1e3);return s(),n.register("/sw.js",{scope:"/",updateViaCache:"none"}).then(b=>{r=b;const m=v=>v?.addEventListener("statechange",()=>{(v.state==="installed"||v.state==="activated")&&s()});return m(b.installing),b.addEventListener("updatefound",()=>m(b.installing)),s()}).catch(()=>{}),()=>{a=!0,t.removeEventListener("online",d),t.removeEventListener("offline",u),n.removeEventListener("message",c),n.removeEventListener("controllerchange",p),t.clearInterval(h)}}async function Ak(e=window){const t=e.navigator.serviceWorker,a=(await t?.getRegistration("/").catch(()=>{}))?.waiting;if(t&&a){const r=new Promise(o=>{t.addEventListener("controllerchange",()=>o(),{once:!0}),e.setTimeout(o,3e3)});a.postMessage({type:"nc-offline:skip-waiting"}),await r}e.location.reload()}const uo="studio";function Sk(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,o=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l(uo),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&o(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(o),onChange:u=>d(n,u)}}const Mk=(e,t)=>`${e}\0${t}`;function Tk(){const e=new Map,t=(a,r)=>{for(const[o,s]of e)s.spans=s.spans.filter(l=>l.end+r>a),s.spans.length||e.delete(o)},n=(a,r,o)=>{let s=null;for(const l of a)l.start<=r&&(s===null||l.end>s)&&(s=l.end);return s===null?null:s+o};return{notes(a,r,o){const s=o.filter(u=>Number.isFinite(u.start)&&Number.isFinite(u.end)&&u.end>=u.start);if(!s.length)return;const l=Mk(a,r);let d=e.get(l);d||(d={source:a,target:r,spans:[]},e.set(l,d)),d.spans.push(...s.map(u=>({start:u.start,end:u.end}))),d.spans.sort((u,c)=>u.start-c.start)},cut(a,r,o){for(const[s,l]of e)l.source!==a||r!==void 0&&l.target!==r||(l.spans=l.spans.filter(d=>d.start<o).map(d=>d.end>o?{start:d.start,end:o}:d),l.spans.length||e.delete(s))},drop(a){for(const[r,o]of e)(o.source===a||o.target===a)&&e.delete(r)},lit(a,r){t(a,r);const o=new Map;for(const s of e.values()){const l=n(s.spans,a,r);if(l===null||a>=l)continue;const d=o.get(s.target)??[];d.includes(s.source)||d.push(s.source),o.set(s.target,d)}return o},next(a,r){let o=null;const s=l=>{l>a&&(o===null||l<o)&&(o=l)};for(const l of e.values()){for(const u of l.spans)u.start>a&&s(u.start);const d=n(l.spans,a,r);d!==null&&s(d)}return o},get busy(){return e.size>0}}}function Lk(e){return e.length<=1?e[0]??"":`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function Ck(e,t=4){return e>0?t*60/e:2}const Dd="netcomposer.studio.plugins.frozen.v1",Nk=2e3;function Ik(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==kr[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Fk(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function Pk(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(Dd)??"[]");return Array.isArray(r)?r.filter(o=>typeof o=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(Dd,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const o=n();o.includes(r)&&a(o.filter(s=>s!==r))}}}function Rk(e){let t=!1;const n=(e.watch??gg)(e.ctx,{stallMs:e.stallMs??Nk,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Dk=48;function Ok(e){return typeof e!="string"?null:e.replace(/\s+/g," ").trim().slice(0,Dk)||null}function zk(e){const n=(e.doc??document).createElement("div");n.className="studio-readout",n.hidden=!0,n.setAttribute("role","status"),n.setAttribute("aria-live","off");const a=new Map;let r=!1;const o=()=>[...a.values()].at(-1)??null,s=()=>{const d=o();if(!d||e.blocked?.()){n.hidden=!0,d?requestAnimationFrame(s):r=!1;return}n.hidden=!1;let u=0;for(const p of e.clearOf?.()??[])u=Math.max(u,p.getBoundingClientRect().bottom);const c=`${Math.round(u)}px`;n.style.getPropertyValue("--count-in-top")!==c&&n.style.setProperty("--count-in-top",c),n.textContent!==d&&(n.textContent=d),requestAnimationFrame(s)},l=()=>{r||(r=!0,requestAnimationFrame(s))};return{el:n,api:{set(d,u){if(typeof d!="string"||!d)return;const c=Ok(u);a.delete(d),c&&a.set(d,c),l()},current:o}}}const Bk="NetComposer Studio",At=[40,240],_k="nc-sync";function jk(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${_k}${n}`,locks:t?{request:(a,r,o)=>t.request(`${a}${n}`,r,o)}:null}}function qk(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Vk=.2,Od=.5;function Hk(e,t,n){const a=new gm({bpm:120,minBpm:At[0],maxBpm:At[1],timebase:"shared"}),r=new Cm({app:Bk,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:At},startLeadSeconds:Vk,...n?{startGate:()=>n(),gatedStartLeadSeconds:Od}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:r,async start(){o||(o=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:ze()});return}const u=++s,c=ze();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,ze())+Od,0),r.publishState()):a.play({at:ze()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:ze()})},setTempo:d=>a.setTempo({bpm:Uk(d)}),playing:()=>a.transport.isPlayingAt(ze()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=ze();return d.isPlayingAt(u)?Gk(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=ze();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function Uk(e){return Number.isFinite(e)?Math.min(At[1],Math.max(At[0],Math.round(e*10)/10)):120}function Gk(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Zi="netcomposer.scene",Qf=1,Vs="netcomposer.studio.tempo.v1",Hs="netcomposer.studio.scene-name.v1",Vr=120,Us="Untitled scene",Zf=2*1024*1024;function po(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(At[1],Math.max(At[0],Math.round(t*10)/10)):Vr}function Ht(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||Us}function Kk(e){return{format:Zi,v:Qf,name:Ht(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:po(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function Wk(e,t){if(e.length>Zf)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Zi)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=Is(c);if(!p||!t.includes(p.type)||o.has(c))continue;o.add(c);const h=u.name;s.push({id:c,type:p.type,name:Qp(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))o.has(u)&&(d[u]=c);return{ok:!0,scene:{format:Zi,v:Qf,name:Ht(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:po(l)},meter:[4,4],instances:s,mix:$f(a.mix??La()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}const Yk="nc-song-looper";function Gs(e){for(const[t,n]of Object.entries(e)){if(!n||typeof n!="object")continue;const a=n;if(a.format!==Yk||!a.data||typeof a.data!="object")continue;const r=a.data;if(typeof r.name=="string")return{id:t,name:r.name,passes:Array.isArray(r.passes)?r.passes.length:0}}return null}function zd(e){return`${JSON.stringify(e,null,2)}
`}const Xk=e=>new TextEncoder().encode(e).length;function Jk(e){const t=zd(e);if(Xk(t)<=Zf)return{scene:e,text:t,droppedSong:!1};const n=Gs(e.presets);if(!n)return{scene:e,text:t,droppedSong:!1};const a={...e.presets};delete a[n.id];const r={...e,presets:a};return{scene:r,text:zd(r),droppedSong:!0}}const Qk=(e,t,n)=>`${e} ${e===1?t:n}`;function Zk(e){const{name:t,missing:n,song:a}=e,r=a!==null&&(e.droppedSong===!0||a.passes>0),o=n.length?` (without ${n.join(", ")}: ${n.length===1?"it hasn't":"they haven't"} loaded yet)`:"";return r?e.droppedSong?`Saved${o}, without LUPA’s song: it’s too large for a Scene.`:`Saved${o}, with LUPA’s song (${Qk(a.passes,"pass","passes")}).`:`Saved “${t}”${o}`}function e$(e){const{kept:t,song:n}=e;return t.length?`Scene loaded; ${t.join(", ")} kept ${t.length===1?"its":"their"} own sound`:n&&n.passes>0?"Loaded, with LUPA’s song.":"Scene loaded"}function t$(e){return`${Ht(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function n$(e){try{const t=e?.getItem(Vs);return t?po(Number(t)):Vr}catch{return Vr}}function eh(e,t){try{t?.setItem(Vs,String(po(e)))}catch{}}function a$(e){try{return Ht(e?.getItem(Hs))}catch{return Us}}function th(e,t){try{t?.setItem(Hs,Ht(e))}catch{}}const es="netcomposer.studio.reset-pending.v1",Hr="nc-reset",r$=6e4,Ks="netcomposer.studio.reset-undo.v1",Ws="netcomposer.studio.legacy-copy.v1",fo="netcomposer.studio.generation.v1",o$=/^[a-z0-9]{1,16}$/,Bd="nyx.scene-samples",i$=3e4,s$=[Ns,Os,Vs,Hs,Ws,fo];function l$(e){return e.includes("@studio/")||s$.includes(e)}function nh(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&l$(a)&&t.push(a)}return t}const c$=/^[0-9a-f]{16,64}$/;function d$(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[o,s]of Object.entries(a))o==="sample"&&typeof s=="string"&&c$.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function u$(e,t){const n=new Set;for(const[o,s]of Object.entries(t))if(o.startsWith("nyx.state"))for(const l of d$(s))n.add(l);if(!n.size)return;let a=[];try{const o=JSON.parse(e.getItem(Bd)??"[]");Array.isArray(o)&&(a=o.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(o=>!n.has(o)),...n].slice(-2048);e.setItem(Bd,JSON.stringify(r))}function p$(e,t){for(const n of[e,t])try{const a=n?.getItem(Ks);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function ho(e,t){for(const n of[t,e])try{n?.removeItem(Ks)}catch{}}function f$(e,t,n=Date.now(),a=h$()){const r={};for(const l of nh(e)){const d=e.getItem(l);d!==null&&(r[l]=d)}const o=JSON.stringify({v:1,at:n,keys:r});try{u$(e,r)}catch{}for(const l of Object.keys(r))e.removeItem(l);try{t?.removeItem(hr)}catch{}ho(e,t);let s=!1;for(const l of[e,t])if(!(s||!l))try{l.setItem(Ks,o),s=!0}catch{}if(!s){for(const[l,d]of Object.entries(r))e.setItem(l,d);return!1}try{e.setItem(Ws,"off")}catch{}try{e.setItem(fo,a)}catch{}return!0}function h$(){let e="";for(;e.length<8;)e+=Math.random().toString(36).slice(2);return e.slice(0,8)}function Ys(e){try{const t=e?.getItem(fo)??"";return o$.test(t)?t:""}catch{return""}}function m$(e){const t=e.indexOf("@studio/");if(t<0)return null;const n=e.slice(t+8),a=n.indexOf("/");return a<0?"":n.slice(0,a)}function g$(e){const t=Ys(e),n=[];for(let a=0;a<e.length;a++){const r=e.key(a);if(r===null)continue;const o=m$(r);o!==null&&o!==t&&n.push(r)}for(const a of n)try{e.removeItem(a)}catch{}return n}function b$(e,t){const n=p$(e,t);if(!n)return!1;for(const a of nh(e))e.removeItem(a);ho(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function y$(e){try{return e?.getItem(Ws)==="off"}catch{return!1}}function Xs(){try{return globalThis.sessionStorage??null}catch{return null}}function v$(e,t,n,a=Math.random().toString(36).slice(2,10),r=Date.now()){const o=JSON.stringify({what:n,nonce:a,at:r});let s=!1;for(const l of[e,t])try{l?.setItem(es,o),l&&(s=!0)}catch{}return s?a:null}function w$(e,t,n){const a=new URL(e);return a.searchParams.set(Hr,`${t}.${n}`),a.hash="",a.toString()}function x$(e){const t=new URL(e);return t.searchParams.has(Hr)?(t.searchParams.delete(Hr),t.toString()):null}function k$(e,t,n,a=Date.now()){const r=new URLSearchParams(n).get(Hr);let o=null;for(const s of[e,t])try{const l=s?.getItem(es);if(s?.removeItem(es),!l||o)continue;const d=JSON.parse(l);if(d.what!=="reset"&&d.what!=="undo")continue;const u=r===`${d.what}.${d.nonce}`,c=typeof d.at=="number"&&a-d.at>=0&&a-d.at<r$;(u||r===null&&c)&&(o=d.what)}catch{}return o}function $$(e,t,n="",a=Date.now()){if(!e)return null;const r=k$(e,t,n,a);try{if(r==="reset")return f$(e,t,a)?"reset":"failed";if(r==="undo")return b$(e,t)?"undo":null;ho(e,t),g$(e)}catch{}return null}const ah="netcomposer.studio.picker.v1",_d="http://127.0.0.1:5177",E$=2,Mn=16,gn=64*1024*1024,A$=4e3,S$=1536*1024*1024,jd=[1e3,2e3,5e3,1e4],rh=new Set(["127.0.0.1","localhost","[::1]"]);function Js(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!rh.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Ur(e){try{const t=JSON.parse(e?.getItem(ah)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:Js(n.address)??_d,...n.ok===!0?{ok:!0}:{}}}catch{return{on:!1,address:_d}}}function Gr(e,t){try{e?.setItem(ah,JSON.stringify(t))}catch{}}async function M$(e,t,n){if(rh.has(t))return"granted";try{const a=await e?.query({name:"loopback-network"});if(!a)return"unknown";const r=()=>a.state==="granted"||a.state==="denied"||a.state==="prompt"?a.state:"unknown";return n&&a.addEventListener?.("change",()=>n(r())),r()}catch{return"unknown"}}function T$(e,t){return e.on?t==="granted"?"start":t==="denied"?"blocked":t==="unknown"&&e.ok?"start":"ask":"off"}function qd(e){return typeof e!="number"||Number.isNaN(e)?null:e===Number.NEGATIVE_INFINITY?-120:Math.round(Math.min(24,Math.max(-120,e))*10)/10}function L$(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Mn},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{},o=r.filled===!0;return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:o,fp:o&&typeof r.fp=="string"&&/^[0-9a-f]{64}$/.test(r.fp)?r.fp:"",sid:o&&typeof r.sid=="string"?r.sid.slice(0,160):"",wave:o&&typeof r.wave=="string"&&/^[0-9a-z]{0,96}$/.test(r.wave)?r.wave:"",used:r.used===!0,playing:o&&r.playing===!0}})}function Vd(e){let t=[];try{t=Array.isArray(e.can)?e.can:[]}catch{}const n={pad:"receivePad",undo:"undo",play:"play",remove:"remove",stop:"stop",instrument:"instrument"};return["pad","undo","play","remove","stop","instrument"].filter(a=>t.includes(a)&&typeof e[n[a]]=="function")}const bn=e=>({ok:!1,placed:[],left:[],message:e}),va=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Mn).slice(0,16):[];function Yt(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=va([a.from]),[o]=va([a.to]);return r&&o?[{from:r,to:o}]:[]}).slice(0,Mn),left:va(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}async function ii(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}const Hd=e=>typeof e=="string"&&/^[\w-]{1,40}$/.test(e);function C$(e){const t=e&&typeof e=="object"?e:{};if(!Hd(t.id)||typeof t.target!="string"||!t.target||t.target.length>64)return null;if(t.type==="pad"||t.type==="play"||t.type==="remove"){const[n]=va([t.pad]);return n?{type:t.type,id:t.id,target:t.target,pad:n}:null}if(t.type==="stop"){const n=t.pad===0?0:va([t.pad])[0]??-1;return n>=0?{type:"stop",id:t.id,target:t.target,pad:n}:null}return t.type==="instrument"?{type:"instrument",id:t.id,target:t.target}:t.type==="undo"&&Hd(t.of)?{type:"undo",id:t.id,target:t.target,of:t.of}:null}function N$(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function I$(e){const t=new Map,n=new Map,a=new Set,r=new Map,o=e.now??(()=>Date.now()),s=e.setTimeout??(($,S)=>setTimeout($,S)),l=$=>e.live?.($)??!0;let d="off",u="",c=0,p=null,h=!1,b="";const m=$=>{$!==d&&(d=$,e.onStatus?.($))},v=()=>[...t.entries()].filter(([$])=>l($)).map(([$,S])=>{const N=e.brandOf?.($),P=qd(S.masterDb?.()),I=qd(e.outDb?.($));return{id:$,name:(e.nameOf?.($)??$).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===$,seen:n.get($)??0,pads:L$(S),can:Vd(S),...P===null?{}:{master:P},...I===null?{}:{out:I}}}),f=$=>{const S=v();return b=JSON.stringify(S),JSON.stringify({v:E$,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:S,results:[...r.entries()].map(([N,P])=>({id:N,...P})),wait:$})},y=($,S)=>e.fetch(`${u}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:f($),cache:"no-store",...S?{signal:S}:{},targetAddressSpace:"loopback"}),E=async($,S)=>{if(!$.ok)throw new Error(`the picker said ${$.status}`);const N=await $.json();if(S!==c)return;if(m("on"),Array.isArray(N.ack))for(const I of N.ack)typeof I=="string"&&r.delete(I);const P=Array.isArray(N.commands)?N.commands:[];for(const I of P.slice(0,8)){const V=N$(I);V&&g(V,S);const G=V?null:C$(I);G&&T(G,S)}},k=async $=>{let S=0,N=!1;for(;$===c;){const P=new AbortController;p=P;try{await E(await y(N,P.signal),$),S=0,N=!0}catch{if($!==c)return;N=!1,m("away");const I=jd[Math.min(S++,jd.length-1)];await new Promise(V=>s(V,I))}}},L=()=>{!u||h||(h=!0,queueMicrotask(()=>{h=!1;const $=c;!u||d!=="on"||!r.size&&JSON.stringify(v())===b||y(!1).then(S=>E(S,$)).catch(()=>{})}))},x=async $=>{const S=await e.fetch($,{cache:"no-store",targetAddressSpace:"loopback"});if(!S.ok){const N=await S.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${S.status}`)}return S},g=async($,S)=>{if(r.has($.id))return;let N;const P=t.get($.target);if(!P||!l($.target))N=bn("That NYX isn't in the Studio any more.");else if(a.has($.target))N=bn("NYX is still loading the last kit.");else{a.add($.target);try{const I=`kit=${encodeURIComponent($.id)}`,V=await(await x(`${u}/api/kit/manifest?${I}`)).json(),G=Array.isArray(V.sounds)?V.sounds:[];if(!G.length)throw new Error("the picker's pads are empty");if(G.length>Mn)throw new Error(`more than ${Mn} sounds`);const q={};for(const H of G){const re=H&&typeof H=="object"?H.pad:null;if(typeof re!="number"||!Number.isInteger(re)||re<1||re>Mn||q[re])throw new Error("a sound has no pad of its own");const be=await x(`${u}/api/kit/audio?${I}&pad=${re}`);if(Number(be.headers.get("content-length")??0)>gn)throw new Error(`pad ${re}'s sound is too big`);const se=await be.arrayBuffer();if(se.byteLength>gn)throw new Error(`pad ${re}'s sound is too big`);const Ce=H.sha256;if(typeof Ce=="string"&&Ce&&await ii(se)!==Ce.toLowerCase())throw new Error(`pad ${re}'s sound isn't the one sent`);q[String(re)]=se}if(S!==c)return;e.reveal?.($.target),N=Yt(await P.receive(V,$.mode,q))}catch(I){N=bn(`Not loaded: ${I.message||"it went wrong"}.`)}finally{a.delete($.target)}}S===c&&(r.set($.id,N),L())},w=async($,S,N)=>{const P=await x(`${u}/api/kit/audio?kit=${encodeURIComponent($)}&pad=${S}`);if(Number(P.headers.get("content-length")??0)>gn)throw new Error(`pad ${S}'s sound is too big`);const I=await P.arrayBuffer();if(I.byteLength>gn)throw new Error(`pad ${S}'s sound is too big`);if(typeof N=="string"&&N&&await ii(I)!==N.toLowerCase())throw new Error(`pad ${S}'s sound isn't the one sent`);return I},A=async $=>{const S=`send=${encodeURIComponent($)}`,N=await(await x(`${u}/api/instrument/manifest?${S}`)).json(),P=Array.isArray(N.files)?N.files:[];if(!P.length)throw new Error("the instrument has no files");if(P.length>A$)throw new Error("the instrument has too many files");const I=[];let V=0;for(const G of P){const q=G&&typeof G=="object"?G:{};if(typeof q.i!="number"||typeof q.path!="string"||!q.path)throw new Error("a file has no name");const H=await x(`${u}/api/instrument/file?${S}&i=${q.i}`);if(Number(H.headers.get("content-length")??0)>gn)throw new Error(`${q.path} is too big`);const re=await H.arrayBuffer();if(re.byteLength>gn)throw new Error(`${q.path} is too big`);if(V+=re.byteLength,V>S$)throw new Error("the instrument is too big");if(typeof q.sha256!="string"||await ii(re)!==q.sha256.toLowerCase())throw new Error(`${q.path} isn't the file that was sent`);I.push({path:q.path.slice(0,400),bytes:re})}return{manifest:N,files:I}},T=async($,S)=>{if(r.has($.id))return;let N;const P=t.get($.target);if(!P||!l($.target))N=bn("That NYX isn't in the Studio any more.");else if(!Vd(P).includes($.type))N=bn("This NYX can't take that: reload the Studio to update it.");else try{if($.type==="undo")N=Yt(await P.undo?.($.of));else if($.type==="play")N=Yt(await P.play?.($.pad));else if($.type==="stop")N=Yt(await P.stop?.($.pad));else if($.type==="remove")N=Yt(await P.remove?.($.pad,$.id));else if($.type==="instrument"){const I=await A($.id);if(S!==c)return;e.reveal?.($.target),N=Yt(await P.instrument?.(I.manifest,I.files))}else{const I=await(await x(`${u}/api/kit/manifest?kit=${encodeURIComponent($.id)}`)).json(),V=Array.isArray(I.sounds)?I.sounds:[],G=V[0]&&typeof V[0]=="object"?V[0]:{};if(V.length!==1||G.pad!==$.pad)throw new Error(`the picker's sound isn't for pad ${$.pad}`);const q=await w($.id,$.pad,G.sha256);if(S!==c)return;N=Yt(await P.receivePad?.(I,{[String($.pad)]:q},$.pad,$.id))}}catch(I){N=bn(`Not loaded: ${I.message||"it went wrong"}.`)}S===c&&(r.set($.id,N),L())},D=()=>{c++,p?.abort(),p=null,h=!1,u="",r.clear(),m("off")};return{host($){return{pickerTarget(S){return t.set($,S),L(),{changed:L,remove(){t.get($)===S&&t.delete($),L()}}}}},start($){const S=Js($);S&&(D(),u=S,m("connecting"),k(++c))},stop:D,seen($){n.set($,o()),t.has($)&&L()},changed:L,forget($){t.delete($),n.delete($),L()},targets:v,get status(){return d}}}const Ud="http://www.w3.org/2000/svg";function F$(){const e=document.createElementNS(Ud,"svg");e.setAttribute("viewBox","0 0 10 10"),e.setAttribute("aria-hidden","true"),e.setAttribute("class","scene-menu-caret");const t=document.createElementNS(Ud,"path");return t.setAttribute("d","M1.5 3.5 5 7l3.5-3.5"),e.append(t),e}function oh(e=typeof navigator<"u"?navigator.platform:""){return/Mac|iPhone|iPad|iPod/i.test(e)}function P$(e=oh()){return e?"⌘S":"Ctrl+S"}function ih(e){return(e.metaKey===!0||e.ctrlKey===!0)&&!e.altKey&&!e.shiftKey&&(e.key==="s"||e.key==="S")}function R$(e,t){e.addEventListener("keydown",n=>{!ih(n)||n.defaultPrevented||(n.preventDefault(),n.repeat||t())})}function D$(e){const t=document.createElement("button");t.type="button",t.className="ghost scene-menu-btn",t.setAttribute("aria-haspopup","menu"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-controls","scene-menu"),t.setAttribute("aria-label","Scene menu: Save, Load, New"),t.title="Save, Load, New",t.append(F$());const n=document.createElement("div");n.id="scene-menu",n.className="scene-menu",n.setAttribute("role","menu"),n.setAttribute("aria-label","Scene"),n.append(...e);const a=document.createElement("div");a.className="scene-menu-wrap",a.append(t,n);const r=()=>[...n.querySelectorAll('[role="menuitem"]')].filter(u=>!u.disabled&&u.getClientRects().length>0);for(const u of e)u.getAttribute("role")==="menuitem"&&(u.tabIndex=-1,u.addEventListener("click",()=>l(!1)));const o=()=>a.hasAttribute("data-open");function s(){o()||(a.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),r()[0]?.focus({preventScroll:!0}),document.addEventListener("pointerdown",d,!0))}function l(u=!1){o()&&(a.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",d,!0),u&&t.focus({preventScroll:!0}))}function d(u){a.contains(u.target)||l()}return t.addEventListener("click",()=>o()?l():s()),t.addEventListener("keydown",u=>{if(u.key==="ArrowDown"||u.key==="ArrowUp"){u.preventDefault(),s();const c=r();(u.key==="ArrowUp"?c[c.length-1]:c[0])?.focus({preventScroll:!0})}}),n.addEventListener("keydown",u=>{const c=r(),p=c.indexOf(document.activeElement);let h;if(u.key==="ArrowDown")h=c[(p+1)%c.length];else if(u.key==="ArrowUp")h=c[(p-1+c.length)%c.length];else if(u.key==="Home")h=c[0];else if(u.key==="End")h=c[c.length-1];else if(u.key==="Escape"){u.preventDefault(),u.stopPropagation(),l(!0);return}else if(u.key==="Tab"){l(!1);return}else return;u.preventDefault(),h?.focus({preventScroll:!0})}),{el:a,button:t,list:n,open:s,close:l,isOpen:o}}const O$=300,z$=120*1e3;function B$(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function _$(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(B$))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>O$*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l},...t.rights==="unknown"?{rights:"unknown"}:{}}}}function Gd(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function j$(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??z$,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:Gd(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!Gd(c).some(m=>m.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=_$(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let b;try{const m=await Promise.race([Promise.resolve(c.receive(h,u)),new Promise(v=>{b=setTimeout(()=>v({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!m||typeof m!="object"||typeof m.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:m}catch(m){return{ok:!1,reason:"error",message:m instanceof Error?m.message:String(m)}}finally{clearTimeout(b)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const q$="/studio/assets/silence-processor-BBLKD9j-.js",Xt=1,si=1024,sh=[1,10,100],V$=32,H$=32,lh=128,U$=400,G$=["off","blocked","live","paused","none"],Tn=e=>typeof e=="object"&&e!==null,Ie=e=>typeof e=="number"&&Number.isFinite(e),K$=(e,t=lh)=>typeof e=="string"&&e.length>0&&e.length<=t,li=e=>e<0?0:e>1?1:e,W$=["live","quiet","offline","off"],Y$=["removed","hold"],Kd=e=>e<-1?-1:e>1?1:e,X$=/^[A-Z0-9?*-]{0,8}$/i;function Wd(e){if(!Tn(e))return null;const{net:t,sta:n,loc:a,cha:r,name:o,rate:s}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof r!="string"||![t,n,a,r].every(l=>X$.test(l))||!t||!n||typeof o!="string"||o.length>lh||!Ie(s)||s<0||s>1e4?null:{net:t,sta:n,loc:a,cha:r,name:o,rate:s}}function J$(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==si)return null;const n=new Float32Array(si),a=e;for(let r=0;r<si;r++){const o=Number(a[r]);if(!Number.isFinite(o))return null;n[r]=o<-1?-1:o>1?1:o}return n}function Q$(e){if(!Tn(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Xt||!K$(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,V$)){if(!Tn(r)||!Ie(r.at)||!Ie(r.value))return null;a.push({at:r.at,value:li(r.value)})}return{v:Xt,kind:"energy",source:n,frames:a}}case"table":{if(!Ie(e.seq)||e.seq<0||!Ie(e.at)||!Ie(e.rms)||e.rms<0||!sh.includes(e.speed))return null;const a=J$(e.samples);if(!a)return null;const r=e.station===null?null:Wd(e.station);if(e.station!==null&&!r)return null;const o=e.behindSec===null?null:Ie(e.behindSec)?e.behindSec:void 0;return o===void 0?null:{v:Xt,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:r,behindSec:o,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!W$.includes(e.state))return null;const a=e.station===null?null:Wd(e.station);if(e.station!==null&&!a)return null;const r=d=>d===null?null:Ie(d)?d:void 0,o=r(e.newestAgeSec),s=r(e.behindSec);if(o===void 0||s===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>U$)return null;const l={v:Xt,kind:"status",source:n,state:e.state,station:a,newestAgeSec:o,behindSec:s,hold:e.hold,credit:e.credit};return Ie(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),G$.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,H$)){if(!Tn(r)||!Ie(r.at)||!Ie(r.tiltX)||!Ie(r.tiltY)||!Ie(r.heading)||!Ie(r.shake))return null;const o=r.heading%1;a.push({at:r.at,tiltX:Kd(r.tiltX),tiltY:Kd(r.tiltY),heading:o<0?o+1:o,shake:li(r.shake)})}return{v:Xt,kind:"motion",source:n,frames:a}}case"shake":return!Ie(e.at)||!Ie(e.strength)?null:{v:Xt,kind:"shake",source:n,at:e.at,strength:li(e.strength)};case"off":return Y$.includes(e.reason)?{v:Xt,kind:"off",source:n,reason:e.reason}:null;default:return null}}function Z$(e){if(!Tn(e))return null;const t={};return e.energy===!0&&(t.energy=!0),Tn(e.table)&&sh.includes(e.table.speed)&&(t.table={speed:e.table.speed}),e.motion===!0&&(t.motion=!0),t.energy||t.table||t.motion?t:null}function eE(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,o={sent:{energy:0,table:0,status:0,off:0,motion:0,shake:0},errors:0},s=m=>e.name?.(m)??m,l=m=>{for(const v of[...m])try{v()}catch{}},d=()=>{l(a);for(const m of t.values())l(m.demandListeners)},u=(m,v)=>{try{m.receiver(v),o.sent[v.kind]++}catch{o.errors++}},c=(m,v)=>v.kind==="energy"?!!m.wants.energy:v.kind==="table"?m.wants.table?.speed===v.speed:v.kind==="motion"||v.kind==="shake"?!!m.wants.motion:!0,p=m=>{for(const v of t.values()){v.status&&u(m,v.status),v.energy&&m.wants.energy&&u(m,v.energy),v.motion&&m.wants.motion&&u(m,v.motion);const f=m.wants.table&&v.tables.get(m.wants.table.speed);f&&u(m,f)}},h=()=>{const m=new Set;let v=!1;const f=[],y=[];for(const[E,k]of n)k.wants.energy&&(v=!0),k.wants.table&&m.add(k.wants.table.speed),k.wants.motion&&y.push(s(E)),f.push(s(E));return{energy:v,speeds:[...m].sort((E,k)=>E-k),receivers:n.size,names:f,motion:y.length>0,motionNames:y}};function b(m,v){const f=t.get(m),y=f??{id:m,name:v,status:null,energy:null,motion:null,tables:new Map,demandListeners:new Set};return y.name=v,t.set(m,y),f||l(r),{id:m,name:v,send(E){const k=Q$(E);if(!(!k||k.source!==m||t.get(m)!==y)){if(k.kind==="status"){const L=JSON.stringify(y.status);y.status=k,JSON.stringify(k)!==L&&l(a)}else k.kind==="energy"?y.energy=k:k.kind==="motion"?y.motion=k:k.kind==="table"?y.tables.set(k.speed,k):k.kind==="off"&&k.reason==="removed"&&(y.energy=null,y.motion=null);for(const L of n.values())c(L,k)&&u(L,k)}},demand:h,onDemand(E){return typeof E!="function"?()=>{}:(y.demandListeners.add(E),()=>y.demandListeners.delete(E))},remove(){if(t.get(m)!==y)return;t.delete(m);const E={v:1,kind:"off",source:m,reason:"removed"};for(const k of n.values())u(k,E);l(r),l(a)}}}return{host(m){return{situationIn(v,f){const y=Z$(f);if(typeof v!="function"||!y)return n.delete(m)&&d(),()=>{};const E={receiver:v,wants:y};return n.set(m,E),d(),p(E),()=>{n.get(m)===E&&(n.delete(m),d())}},situationSource:v=>b(m,typeof v=="string"?v.slice(0,64):m),situationSources:()=>[...t.values()].map(v=>({id:v.id,name:v.name})),onSituationSources(v){return typeof v!="function"?()=>{}:(r.add(v),()=>r.delete(v))}}},statuses:()=>[...t.values()].flatMap(m=>m.status?[{source:m.id,name:m.name,status:m.status}]:[]),wants:m=>n.get(m)?.wants??null,drop(m){const v=t.get(m);if(v){t.delete(m);const f={v:1,kind:"off",source:m,reason:"removed"};for(const y of n.values())u(y,f);l(r)}(n.delete(m)||v)&&d()},onChange(m){return a.add(m),()=>a.delete(m)},stats:o}}function tE(e,t=Rs){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const nE=["Space","Backspace"];function aE(){const e=new Map,t=n=>{const a=e.get(n);return a?.length?a[a.length-1]??null:null};return{claim(n,a,r){if(typeof n!="string"||!n||typeof r!="function")return()=>{};const o={owner:n,handler:r},s=[...new Set(a)].filter(l=>nE.includes(l));for(const l of s){const d=e.get(l)??[];d.push(o),e.set(l,d)}return()=>{for(const l of s){const d=e.get(l);if(!d)continue;const u=d.indexOf(o);u>=0&&d.splice(u,1),d.length||e.delete(l)}}},press(n,a){const r=typeof a?.code=="string"?a.code:"",o=t(r);if(!o)return!1;if(a.repeat===!0)return!0;try{return o.handler({code:r,shiftKey:a.shiftKey===!0,from:String(n)})===!0}catch{return!1}},owner:n=>t(n)?.owner??null,drop(n){for(const[a,r]of e){const o=r.filter(s=>s.owner!==n);o.length?e.set(a,o):e.delete(a)}}}}const rE=56;function oE(e){const{row:t}=e,n=p=>p-t.left,a=Math.max(0,n(e.strips.left)),r=Math.min(t.width,n(e.strips.left+e.strips.width)),o=e.add?n(e.add.left):null,s=o===null||o<a||o>=r||o+e.groupWidth>t.width,l=s?0:o,d=s?r:Math.max(a,Math.min(r,l)),u=new Map;for(const p of e.channels){const h=n(p.left),b=h+p.width;u.set(p.id,{left:h,width:p.width,out:b<=a+1||h>=d-1})}let c=null;if(e.master){const p=n(e.master.left);!(!s&&p<l+e.groupWidth&&p+e.master.width>l)&&p>=0&&p+e.master.width<=t.width+1&&(c={left:p,width:e.master.width})}return{laneWidth:d,laneClip:a,tabs:u,groupLeft:l,master:c,twoRows:s}}function iE(e,t){return[...e.filter(t),...e.filter(n=>!t(n))]}function sE(e){const t=/^(.*?)(?:\s+(\d+))?$/.exec(e.trim()),n=(t?.[1]??e).trim(),a=t?.[2],r=n.slice(0,2);return a?`${r} ${a}`:r}const Yd=6,ci=".nc-strip:not([data-nc-master])",Xd=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,yn=e=>e?.id?.replace(/^tab-/,"")??null;function lE(e){const{tabs:t,addTab:n,mixHost:a}=e,r=document.createElement("div");r.className="tab-lane",r.setAttribute("role","none");const o=document.createElement("div");o.className="tab-lane-inner",o.setAttribute("role","none"),r.append(o);const s=document.createElement("div");s.className="tab-group",s.setAttribute("role","none");const l=document.createElement("span");l.className="tab-master",l.setAttribute("aria-hidden","true"),l.textContent="Master",t.prepend(r),t.append(s,l),s.append(n);const d=$=>document.getElementById(`tab-${$}`),u=$=>a.querySelector(`${ci}[data-nc-id="strip-${CSS.escape($)}"]`);function c(){for(const $ of e.order()){const S=d($);S&&(e.hasStrip($)?o.append(S):s.insertBefore(S,n))}h()}let p=0;function h(){p||(p=requestAnimationFrame(()=>{p=0,b()}))}function b(){const $=a.querySelector(".nc-section[data-nc-section='strips'], [data-nc-id='strips']"),S=[...a.querySelectorAll(ci)],N=!!$&&$.getClientRects().length>0&&S.length>0;if(t.toggleAttribute("data-aligned",N),N||t.removeAttribute("data-two-rows"),!N||!$){for(const be of o.children){const se=be;se.style.left="",se.style.width="",se.hidden=!1,se.removeAttribute("data-narrow")}r.style.width="",s.style.left="",l.hidden=!0;return}const P=t.getBoundingClientRect(),I=$.getBoundingClientRect(),G=$.querySelector("[data-nc-id='mix-add']")?.getBoundingClientRect(),H=a.querySelector(".nc-strip[data-nc-master]")?.getBoundingClientRect(),re=oE({row:{left:P.left,width:P.width},strips:{left:I.left,width:I.width},channels:S.map(be=>{const se=be.getBoundingClientRect();return{id:Xd(be)??"",left:se.left,width:se.width}}),add:G&&G.width>0?{left:G.left,width:G.width}:null,master:H&&H.width>0?{left:H.left,width:H.width}:null,groupWidth:s.getBoundingClientRect().width});r.style.width=`${Math.max(0,re.laneWidth)}px`,r.style.clipPath=`inset(0 0 0 ${Math.max(0,re.laneClip)}px)`;for(const be of o.children){const se=be,Ce=re.tabs.get(yn(se)??"");if(!Ce){se.hidden=!0;continue}se.hidden=!1,se.style.left=`${Ce.left}px`,se.style.width=`${Ce.width}px`,se.toggleAttribute("data-narrow",Ce.width<rE),se.toggleAttribute("data-out",Ce.out)}s.style.left=`${re.groupLeft}px`,t.toggleAttribute("data-two-rows",re.twoRows),l.hidden=!re.master,re.master&&(l.style.left=`${re.master.left}px`,l.style.width=`${re.master.width}px`)}if(new MutationObserver(()=>h()).observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-nc-folded","hidden","class"]}),a.addEventListener("scroll",()=>h(),{capture:!0,passive:!0}),typeof ResizeObserver=="function"){const $=new ResizeObserver(()=>h());$.observe(a),$.observe(t)}window.addEventListener("resize",()=>h()),document.fonts?.ready.then(()=>h());const m=()=>a.querySelector(".nc-section[data-nc-section='strips']");let v=null;r.addEventListener("pointerdown",$=>{$.pointerType==="mouse"||$.target?.closest?.(".tab-grip")||(v={pointerId:$.pointerId,x:$.clientX,moved:!1})}),r.addEventListener("pointermove",$=>{if(!v||$.pointerId!==v.pointerId)return;const S=$.clientX-v.x;if(!v.moved&&Math.abs(S)<Yd)return;v.moved=!0,v.x=$.clientX;const N=m();N&&(N.scrollLeft-=S)});const f=$=>{if(!v||$.pointerId!==v.pointerId)return;const S=v.moved;if(v=null,!S)return;const N=P=>{P.stopPropagation(),P.preventDefault()};t.addEventListener("click",N,{capture:!0,once:!0}),window.setTimeout(()=>t.removeEventListener("click",N,{capture:!0}),0)};r.addEventListener("pointerup",f),r.addEventListener("pointercancel",f),r.addEventListener("wheel",$=>{const S=m();!S||Math.abs($.deltaX)<=Math.abs($.deltaY)||(S.scrollLeft+=$.deltaX,$.preventDefault())},{passive:!1});let y=null;const E=()=>{for(const $ of document.querySelectorAll("[data-tab-drop], .nc-strip[data-drop]"))$.removeAttribute("data-tab-drop"),$.removeAttribute("data-drop")},k=()=>[...a.querySelectorAll(ci)].map($=>{const S=$.getBoundingClientRect();return{id:Xd($)??"",left:S.left,width:S.width}}),L=()=>e.order().filter($=>e.hasStrip($)),x=()=>{y&&(y.tab.removeAttribute("data-dragging"),u(y.id)?.removeAttribute("data-dragging"),t.removeAttribute("data-tab-drag"),E(),y=null)},g=$=>{$.active=!0,$.tab.setAttribute("data-dragging","true"),u($.id)?.setAttribute("data-dragging","true"),t.setAttribute("data-tab-drag",""),$.touch&&navigator.vibrate?.(10)};t.addEventListener("pointerdown",$=>{if(y||$.pointerType==="mouse"&&$.button!==0)return;const S=$.target?.closest?.(".tab-grip"),N=S?.closest(".tab"),P=yn(N??null);if(!S||!N||!P||!e.hasStrip(P))return;y={id:P,tab:N,pointerId:$.pointerId,x0:$.clientX,y0:$.clientY,active:!1,move:null,touch:$.pointerType!=="mouse"},$.preventDefault()}),window.addEventListener("pointermove",$=>{const S=y;if(!S||$.pointerId!==S.pointerId)return;if(!S.active){if(Math.hypot($.clientX-S.x0,$.clientY-S.y0)<Yd)return;g(S)}$.preventDefault();const N=If(k(),$.clientX),P=N?Gi(L(),S.id,N):null;S.move=P,E(),N&&P&&(u(N.target)?.setAttribute("data-drop",N.side),d(N.target)?.setAttribute("data-tab-drop",N.side))});const w=$=>{const S=y;if(!S||$.pointerId!==S.pointerId)return;const N=S.active?S.move:null,P=S.active;if(x(),P){const I=V=>{V.stopPropagation(),V.preventDefault()};t.addEventListener("click",I,{capture:!0,once:!0}),window.setTimeout(()=>t.removeEventListener("click",I,{capture:!0}),0)}N&&e.onReorder(N.id,N.before)};window.addEventListener("pointerup",w),window.addEventListener("pointercancel",w),t.addEventListener("keydown",$=>{if(!$.altKey||$.key!=="ArrowLeft"&&$.key!=="ArrowRight")return;const S=yn($.target?.closest?.(".tab")??null);if(!S||!e.hasStrip(S))return;$.preventDefault(),$.stopImmediatePropagation();const N=L(),P=N.indexOf(S),I=P+($.key==="ArrowLeft"?-1:1);P<0||I<0||I>=N.length||(e.onReorder(S,$.key==="ArrowLeft"?N[I]:N[I+1]??null),d(S)?.focus({preventScroll:!0}),requestAnimationFrame(()=>{const V=d(S);V&&document.activeElement!==V&&V.focus({preventScroll:!0})}))},{capture:!0});function A($,S){const N=S.querySelector(".tab-name");if(!N||S.hasAttribute("data-renaming"))return;const P=e.nameOf($),I=document.createElement("input");I.type="text",I.className="tab-name-input",I.value=P,I.maxLength=e.nameMax,I.spellcheck=!1,I.autocomplete="off",I.setAttribute("aria-label",`Rename ${P}`),I.setAttribute("data-nc-help",e.renameHelp),S.setAttribute("data-renaming",""),N.after(I),I.focus(),I.select();let V=!1;const G=q=>{if(V)return;V=!0;const H=I.value;I.remove(),S.removeAttribute("data-renaming"),q&&H!==P&&e.onRename($,H),S.isConnected&&S.focus({preventScroll:!0})};I.addEventListener("keydown",q=>{q.stopPropagation(),q.key==="Enter"?(q.preventDefault(),G(!0)):q.key==="Escape"&&(q.preventDefault(),G(!1))});for(const q of["click","pointerdown","dblclick"])I.addEventListener(q,H=>H.stopPropagation());I.addEventListener("blur",()=>G(!0))}const T=($,S,N,P)=>{const I=u($),V=I?.querySelector(".nc-strip-hd");if(!I||!V)return;V.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,cancelable:!0,clientX:N,clientY:P}));const G=document.querySelector("[data-nc-strip-menu]");if(!G)return;const q=()=>document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0,cancelable:!0})),H=(se,Ce,ye)=>{const Y=document.createElement("button");Y.type="button",Y.className="nc-strip-menu-item",Y.dataset.tabMenu=Ce;const ke=document.createElement("span");return ke.textContent=se,Y.append(ke),Y.addEventListener("click",()=>{q(),ye()}),Y},re=I.dataset.ncFolded==="true";G.append(H(re?"Expand strip":"Minimize strip","fold",()=>{I.querySelector("[data-nc-strip-hide]")?.click(),h()}),H("Rename…","rename",()=>A($,S)));const be=G.getBoundingClientRect();be.bottom>window.innerHeight-4&&(G.style.top=`${Math.max(4,window.innerHeight-be.height-4)}px`)};t.addEventListener("contextmenu",$=>{const S=$.target?.closest?.(".tab"),N=yn(S??null);!S||!N||!e.hasStrip(N)||($.preventDefault(),T(N,S,$.clientX,$.clientY))});let D=0;t.addEventListener("pointerdown",$=>{if($.pointerType==="mouse")return;const S=$.target;if(S?.closest?.(".tab-grip, .tab-remove"))return;const N=S?.closest?.(".tab"),P=yn(N??null);if(!N||!P||!e.hasStrip(P))return;const I=$.clientX,V=$.clientY;window.clearTimeout(D),D=window.setTimeout(()=>T(P,N,I,V),up+200)});for(const $ of["pointerup","pointercancel","pointermove"])t.addEventListener($,S=>{$==="pointermove"&&S.pointerType==="mouse"||window.clearTimeout(D)});return t.addEventListener("dblclick",$=>{const S=$.target?.closest?.(".tab"),N=yn(S??null);!S||!N||!e.hasStrip(N)||$.target.closest(".tab-grip, .tab-remove")||A(N,S)}),{sync:c,layout:h,visualOrder:()=>iE(e.order(),e.hasStrip)}}const ts=lb,kt=sb,di={system:"System",light:"Light",dark:"Dark"};function cE(e){try{return ps(e?.getItem(ts))}catch{return"system"}}function dE(e,t){try{t==="system"?e?.removeItem(ts):e?.setItem(ts,t)}catch{}}const uE=e=>kt[(kt.indexOf(e)+1)%kt.length]??"system";function pE(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function ch(e,t){const n=pE(e);n&&fs(t,n)}function fE(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=kt.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=di[s],l.append(d),l.setAttribute("aria-label",`${di[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${di[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?uE(s):s;o(c),t(c),r[kt.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function o(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(kt.indexOf(a)+l+kt.length)%kt.length,u=kt[d]??"system";o(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:o}}function hE(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let d=a.get(l);return d||(d=n(o,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const ra=$$(Se(),Xs(),location.search);{const e=x$(location.href);if(e)try{history.replaceState(history.state,"",e)}catch{}}const dh=Ys(Se());let Vt=!1;const ae=new AudioContext({latencyHint:"interactive"});hE(ae.audioWorklet,location.href);const Qs=Pk(Se()),mE=new URLSearchParams(location.search).has("plugins"),gE=mE,wa=E1({ctx:ae,moduleUrl:pa,base:location.href,remote:gE,store:Hw(),frozen:Qs});function Jd(e,t){wa?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),Zs.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){Mt?.render();for(const s of Ik(a,e.getChain()))$t({message:U.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>Mt?.render()))}),e}function bE(e){return ue.list().find(t=>t.id===e)?.name??e}const Zs=new Set,Ue=h1(),Bn={},yE=Of,mo=new Map,ue=new gx(ae,{restore:e=>Ue.channels[e],fx:e=>{const t=Fo(ae,{moduleUrl:pa,bpm:120,state:cf(e,Ue)});return Bn[e]=t,t},masterFx:()=>{const e=Fo(ae,{moduleUrl:pa,bpm:120,slots:_i,state:Zv(Ue,_i)});return e.onChange(Pa),Jd(e,()=>"Master")},channelFx:e=>{Qr.delete(e);const t=Fo(ae,{moduleUrl:pa,bpm:K.bpm(),slots:yE,state:Ue.channelFx[e]??{v:2,chain:[]}}),n=Ou(t,K.clock,{mapper:mt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(Pa),mo.set(e,t),t.dispose=(r=>()=>{Zs.delete(t),r()})(t.dispose),Jd(t,()=>bE(e))}});ue.setMaster(Ue.master);ue.setReturn("a",Ue.returns.a);ue.setReturn("b",Ue.returns.b);let uh=()=>!1;const mt=new Mm(ae,{hold:()=>uh()});mt.start();const ph=qk();let fh=()=>{};const hh=Aw(ae.sampleRate),go=aw(ae,{nodeFor:e=>ue.tapNode(e),latencyFor:e=>ue.tapLatency(e,hh.get()),sources:()=>[{id:"master",name:"Master"},...ue.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{fh=e})}),Ge=Sk(),an=Rv(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Ut=e=>W.some(t=>t.id===e),el=e=>W.find(t=>t.id===e)?.name??e,mh=e=>{const t=W.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Ba=e=>{ht(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Be.get(e)?.contentWindow?.focus()},gh=j$({live:Ut,nameOf:el,brandOf:mh,reveal:Ba});let xa=!1,oa=null;const ui=2e4,Qe=I$({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>zt.value.trim()||"Studio",live:Ut,nameOf:el,brandOf:mh,shown:()=>We,reveal:Ba,outDb:e=>ue.channelOutDb(e),onStatus:e=>{if(eo(e),XE(e),e==="on"){const t=Ur(ge());t.on&&!t.ok&&Gr(ge(),{...t,ok:!0})}}});let bh=!1;const tl=Yv(),nl=Kv({now:()=>ae.currentTime,labelOf:e=>{const t=W.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[dl,Ke,hl]}),bo=aE(),Kr=vw(window,{shown:()=>We,frameDoc:e=>{try{return Be.get(e)?.contentDocument??null}catch{return null}}}),yo=zk({blocked:()=>!nl.el.hidden,clearOf:()=>[dl,Ke,hl]}),al=Zw({ctx:ae,transport:()=>K.clock.transport,toContextTime:e=>mt.toContextTime(e),now:ze,ticker:e=>hu(e,{intervalMs:20})}),st=fk({nowBeat:()=>{const e=K.clock.transport;return e.running?e.beatAt(ze()):null},startAudio:()=>ae.state==="running"?void 0:qn(),onDeliver:(e,t)=>$E(e,t)}),ns=new Set,vo=()=>{for(const e of[...ns])try{e()}catch{}};st.onChange(()=>{vo(),xE()});const Gn=eE({name:e=>W.find(t=>t.id===e)?.name??e});Gn.onChange(()=>{EE(),AE()});window.ncStudio=_v(ae,ue,{notes:st,situation:Gn,clock:()=>K.clock,targets:{list:()=>W.filter(e=>xe.find(t=>t.id===e.type)?.noteTarget!==!1).map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:st.listening(e.id),takesPitch:st.takesPitch(e.id),...st.layerOnly(e.id)?{layerOnly:!0}:{}})),listen(e){return ns.add(e),()=>ns.delete(e)}},show:e=>{Ut(e)&&Ba(e)},add:e=>yl(e,{show:!1}),countIn:nl.api,keys:bo,playKeys:{declare:(e,t)=>Kr.route.declare(e,t),onTyping:e=>Kr.onTyping(e)},metronome:al,readout:yo.api,studioTransport:{play:()=>{(!K.running()||Ge.owner()!==uo)&&lt.click()},playOnly:e=>{qn(),!K.running()&&(Ge.claim(e),K.play(),De())},stop:()=>{K.running()&&K.stop(),De()},running:()=>K.running(),bpm:()=>K.bpm()},chip:(e,t)=>ol(e,t),holdFirstPlay:e=>{const t=tl.hold(),n=Te.hold(e);return()=>{t(),n()}},attached:e=>Te.attached(e),presets:an,share:gh,picker:Qe,legacyCopy:()=>!y$(ge()),generation:()=>dh,grab:go,play:Ge,mapper:rw(mt),resolve:(e,t)=>NE(e,t),syncScope:ph,fxWorklet:new URL(pa,location.href).href});const K=Hk(()=>ae.state,jk(ph),()=>bh&&ae.state==="running"&&mt.ready&&tl.count===0&&Te.settled()?null:FE());uh=()=>K.clock.transport.isPlayingAt(ze());function ge(){try{return globalThis.localStorage??null}catch{return null}}K.setTempo(n$(ge()));const Fe=new pw(ae,()=>ue.tapNode("master"));let rn=null,yh=!0;const Ve=new mw(ae,()=>ue.tapNode("master"),fw(ge()));let vh=null;function R(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(r,o===!0?"":String(o));return a.append(...n),a}const lt=R("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),_n=R("input",{type:"number",class:"bpm",min:At[0],max:At[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Wr=R("output",{class:"position","aria-label":"Bar and beat"},"—"),Ot=R("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":ee["transport:rec"]},"Rec"),cn=R("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":ee["transport:keep"]},"Keep"),wh=R("div",{class:"keep-held","data-nc-help":ee["keep:held"]}),rl=[...ow.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],_a=rl.map(e=>R("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),Na=gs({checked:Ve.keeping,labelledBy:"keep-switch-label",onChange:e=>{hw(ge(),e),Ve.setKeeping(e),_e(e?"Keeping: on":"Keeping: off (nothing held)")}}),ft=R("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},wh,..._a,R("div",{class:"keep-switch","data-nc-help":ee["keep:switch"]},R("span",{id:"keep-switch-label"},"Keeping"),Na.el)),xh=R("div",{class:"keep-wrap"},cn,ft),la=R("a",{class:"take",hidden:!0}),Ia=new Map;function vE(e){const t=document.getElementById(`tab-${e}`);if(!t)return;const n=Ia.get(e);t.toggleAttribute("data-recording",n?.recording===!0);const a=t.querySelector(".tab-status");a&&(a.textContent=n?.text??"",a.hidden=!n?.text)}function as(e,t,n=!1){const a=t.replace(/\s+/g," ").trim().slice(0,48);a?Ia.set(e,{text:a,recording:n}):Ia.delete(e),vE(e)}const wE={notes:new Set,situation:new Set};function kh(e,t){const n=wE[e];for(const a of n)t.has(a)||as(a,"");n.clear();for(const[a,r]of t)n.add(a),as(a,r)}function xE(){const e=new Map;for(const t of st.statuses()){if(!Ut(t.source))continue;const{now:n,next:a}=t.status;e.set(t.source,`${n}${a&&a!==n?` → ${a}`:""}`)}kh("notes",e)}const Ln=Tk(),Cn=new Map;let Qd=0;const kE=e=>e.split("#")[0]==="calliope";function $E(e,t){if(t.kind==="played"||t.kind==="routes"||!kE(t.source))return;const n=K.clock.transport,a=ze();if(t.kind==="notes")Ln.notes(t.source,e,t.events.map(r=>({start:n.timeAt(r.startBeat),end:n.timeAt(r.startBeat+r.lengthBeats)})));else if(t.kind==="audition")Ln.notes(t.source,e,[{start:a,end:a+t.holdSec}]);else if(t.kind==="off")Ln.cut(t.source,e,t.atBeat!==void 0&&n.running?Math.max(a,n.timeAt(t.atBeat)):a);else return;$h()}function $h(){window.clearTimeout(Qd);const e=ze(),t=Ck(K.bpm()),n=Ln.lit(e,t),a=o=>st.sources().find(s=>s.id===o)?.name||el(o);for(const[o,s]of n){let l=Cn.get(o);l||(l=R("span",{class:"calliope-dot","aria-hidden":"true"}),Cn.set(o,l)),l.setAttribute("data-nc-help",ee["strip:played-by"].replace("{who}",Lk(s.map(a)))),l.setAttribute("data-on",""),Eh(o)}for(const[o,s]of Cn)n.has(o)||s.removeAttribute("data-on");const r=Ln.next(e,t);(r!==null||n.size)&&(Qd=window.setTimeout($h,Math.min(250,Math.max(16,r===null?250:(r-e)*1e3+5))))}function Eh(e){const t=Cn.get(e),n=document.getElementById(`tab-${e}`);t&&n?.classList.contains("tab-channel")&&t.parentElement!==n&&n.append(t)}function ol(e,t){const n=typeof t?.text=="string"?t.text:"";as(e,n,t?.recording===!0)}const Je=R("button",{type:"button",class:"situation-chip aria-line",hidden:!0});Je.addEventListener("click",()=>{const e=Je.dataset.source;e&&Ut(e)&&Ba(e)});function Zd(e){return e.hold?"held":e.recorded&&e.state!=="live"?"recording · offline":e.state==="live"&&e.behindSec!==null?`${Math.round(e.behindSec)} s behind`:e.state}function EE(){const e=Gn.statuses().filter(d=>Ut(d.source)&&d.status.state!=="off");kh("situation",new Map(e.map(d=>[d.source,Zd(d.status)])));const t=e[0];if(Je.hidden=!t,!t)return;const n=t.status;Je.dataset.source=t.source,Je.dataset.state=n.state;const a=n.station?`${n.station.net}.${n.station.sta}`:"",r=Zd(n),o=a&&!(n.recorded&&n.state!=="live")?`${a} · ${r}`:r,s=W.find(d=>d.id===t.source),l=xe.find(d=>d.id===s?.type)?.brand??t.name;Je.replaceChildren(R("span",{class:"aria-line-dot","aria-hidden":"true"}),R("span",{class:"aria-line-name"},l),R("span",{class:"aria-line-words"},o)),Je.setAttribute("aria-label",`${t.name}: ${o}. Show it.`)}const ka=R("button",{type:"button",class:"situation-chip aria-line motion-chip",hidden:!0}),Yr=R("button",{type:"button",class:"motion-dot",hidden:!0},R("span",{class:"motion-dot-mark","aria-hidden":"true"}));for(const e of[ka,Yr])e.addEventListener("click",()=>{const t=e.dataset.source;t&&Ut(t)&&Ba(t)});function AE(){const e=Gn.statuses().find(a=>Ut(a.source)&&(a.status.motion==="live"||a.status.motion==="paused"));if(ka.hidden=Yr.hidden=!e,!e)return;const t=e.status.motion,n=ee[`motion:${t}`].replace("ARIA 1",e.name);for(const a of[ka,Yr])a.dataset.source=e.source,a.dataset.state=t,a.setAttribute("data-nc-help",n),a.setAttribute("aria-label",`My phone: motion ${t}. Show ${e.name}.`);ka.replaceChildren(R("span",{class:"aria-line-dot","aria-hidden":"true"}),R("span",{class:"aria-line-name"},"PHONE"),R("span",{class:"aria-line-words"},`· ${t}`))}const Xe=R("span",{class:"status",role:"status"}),zt=R("input",{type:"text",class:"scene-name",maxlength:60,value:a$(ge()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),il=(e,t,n,a)=>R("button",{type:"button",class:"ghost scene-item",role:"menuitem","data-scene":e,title:t},R("span",{class:"scene-item-label"},n),...a?[R("kbd",{class:"scene-item-key","aria-hidden":"true"},a)]:[]),sl=il("save","Save this Scene as a file","Save",P$());sl.setAttribute("aria-keyshortcuts",oh()?"Meta+S":"Control+S");const Ah=il("load","Load a Scene file","Load…"),Sh=il("new","Start a new Scene","New scene"),$a=R("input",{type:"file",accept:".json,application/json",hidden:!0}),ct=R("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},R("span",{class:"picker-dot","aria-hidden":"true"}),R("span",{class:"picker-label"},"Picker")),ll=fE(cE(ge()),e=>{dE(ge(),e),fs(e);for(const t of Be.values())ch(t,e)});fs(ll.choice);const cl=Yw(Gw(ge()),e=>{Kw(ge(),e),hs(e);for(const t of Be.values())yf(t,e)},{theme:ll.el});hs(cl.look);const dl=R("h1",{class:"brand","aria-label":"NetComposer Studio"},R("span",{"aria-hidden":"true"},"NetComposer",R("span",{class:"brand-sep"}," / "),"Studio")),rs=R("span",{class:"beat-light","aria-hidden":"true"}),tn=R("span",{class:"status-long"}),wn=R("span",{class:"status-short"});Xe.append(tn,wn);const Ke=R("header",{class:"top"},R("div",{class:"transport"},lt,R("label",{class:"tempo"},_n,R("span",{class:"tempo-unit"},"BPM")),rs,Wr),R("div",{class:"record"},Ot,xh,la),R("div",{class:"situation-chips"},Je,ka),Yr,Xe),eu=window.matchMedia("(min-width: 1200px)");let tu="";function ul(e=!1){const t=Xe.hasAttribute("data-quiet"),n=`${t}|${eu.matches}|${tn.textContent}|${Je.textContent}|${Je.hidden}`;if(!e&&n===tu||(tu=n,Xe.removeAttribute("data-below"),t||!eu.matches))return;const a=r=>!!r&&r.scrollWidth>r.clientWidth+1;(a(Xe)||a(Je.querySelector(".aria-line-words")))&&Xe.setAttribute("data-below","")}new ResizeObserver(()=>ul(!0)).observe(Ke);new MutationObserver(()=>ul()).observe(Je,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["hidden"]});const Mh=Ow();zw(Ke.querySelector(".record"),Mh);const Th=R("button",{type:"button",class:"ghost scene-item scene-item-reset",role:"menuitem","data-reset":"scene"},R("span",{class:"scene-item-label"},"Reset Studio…")),pl=D$([sl,Ah,Sh,R("div",{class:"scene-menu-sep",role:"separator"}),Th]);Th.addEventListener("click",()=>void Kh(pl.button));const SE=R("div",{class:"scene-pick"},zt,pl.el),wo=R("div",{class:"scene-actions"},SE,ct,cl.el),fl=R("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");fl.addEventListener("click",()=>void Kh(Xr.button));wo.append(fl);const Xr=av({panel:wo}),Lh=R("span",{class:"offline-line foot-offline",role:"status",hidden:!0}),Ch=R("div",{class:"offline-line menu-offline",role:"status",hidden:!0});wo.insertBefore(Ch,fl);function ME(e){document.documentElement.dataset.studioOffline=e;for(const t of[Lh,Ch]){if(t.hidden=e==="none",e==="none"){t.replaceChildren(),t.removeAttribute("data-nc-help");continue}if(t.dataset.state=e,t.setAttribute("data-nc-help",ee[`offline:${e}`]),t.replaceChildren(R("span",{},yk[e])),e==="update"){const n=R("button",{type:"button",class:"offline-reload"},"Reload");n.addEventListener("click",()=>void Ak()),t.append(R("span",{class:"offline-sep","aria-hidden":"true"}," · "),n)}}}const TE=R("footer",{class:"studio-foot"},Lh),hl=R("div",{class:"scene",role:"group","aria-label":"Scene"},wo,$a,Xr.button);Fe.supported||(Ot.disabled=!0,Ot.title="This browser can't record audio",cn.disabled=!0);const ja=R("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),xo=R("div",{class:"stage"}),ml=R("label",{class:"tab tab-add",title:"Add an instrument"},R("span",{"aria-hidden":"true"},"+")),Nn=R("select",{class:"tab-add-select","aria-label":"Add an instrument"});Nn.append(R("option",{value:""},"Add an instrument"),...Rs.map(e=>{const t=R("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Nn.addEventListener("change",()=>{const e=Nn.value;Nn.value="",e&&yl(e)});ml.append(Nn);ja.append(ml);let Kn=null;Z0();const Fa=R("div",{class:"spine","aria-hidden":"true"}),Be=new Map;let W=yv(bv(xe),xe),We=W[0]?.id??"";const Nh=new URLSearchParams(location.search).has("measure"),nu=new Map,gl=xv((e,t)=>fetch(e,t));for(const e of W)gl(e.src);const LE=2e4,Te=Mv(W.map(e=>{const t=xe.find(a=>a.id===e.type),n=t?.brand??e.name;return{id:e.id,brand:e.n>1?`${n} ${e.n}`:n,name:t?.name??e.name}})),Ih=new Set,Ea=new Map;for(const e of W){let t=()=>{};const n=new Promise(a=>{t=a});Ea.set(e.id,{go:t,turn:n})}function Fh(e){const t=R("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);qh(t,e),t.addEventListener("click",()=>ht(e.id)),ja.append(t),Kn?.sync();const n=nu.get(e.type)??Promise.resolve(),a=gl(e.src),r=Promise.all([n,a,Ea.get(e.id)?.turn]).then(([,o])=>new Promise(s=>{if(!W.some(u=>u.id===e.id))return s();const l=R("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Zp(e,Nh,o),allow:"autoplay; clipboard-read; clipboard-write; microphone; display-capture; accelerometer; gyroscope; magnetometer; screen-wake-lock"});Be.set(e.id,l),Te.requested(e.id),window.setTimeout(()=>Te.fail(e.id),$v),l.addEventListener("load",()=>{Ih.add(e.id),Te.loaded(e.id),Eo()},{once:!0});const d=window.setTimeout(s,LE);l.addEventListener("load",()=>CE(l)),l.addEventListener("load",()=>{window.clearTimeout(d),s()},{once:!0}),xo.append(l),ht(We)}));return nu.set(e.type,r),r}const Ph=window.matchMedia(Uu);function Rh(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",Ph.matches)}catch{}}Ph.addEventListener("change",()=>{for(const e of Be.values())Rh(e)});function CE(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",t.defaultView&&R$(t.defaultView,Uh),yf(e,cl.look),ch(e,ll.choice),Rh(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Oh.set(n,Math.round(l.getBoundingClientRect().bottom)),n===We&&zh())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),ko()}).observe(r),bl.add(e),Dh(e)}const bl=new Set;function Dh(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){bl.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Ke).position==="sticky"?Ke.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let pi=!1;function ko(){pi||(pi=!0,requestAnimationFrame(()=>{pi=!1;for(const e of bl)Dh(e)}))}window.addEventListener("scroll",ko,{passive:!0});window.addEventListener("resize",ko);const Oh=new Map;function zh(){const e=Oh.get(We);e===void 0?Fa.style.removeProperty("--spine-top"):Fa.style.setProperty("--spine-top",`${e}px`)}function Bh(e){if(!e){Fa.replaceChildren();return}const t=tE(e),n=R("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),Fa.replaceChildren(R("span",{class:"spine-text"},n,R("span",{class:"spine-rest"},t.rest)))}function ht(e){We=e,Eo(),Qe.seen(e),Bh(W.find(t=>t.id===e)),zh(),ko();for(const t of W){const n=t.id===e;Be.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const NE=kv(()=>W.map(e=>({instance:e,window:()=>Be.get(e.id)?.contentWindow,readyState:()=>{try{return Be.get(e.id)?.contentDocument?.readyState}catch{return}}})),xe);function yl(e,t={}){Xh();const n=xe.find(s=>s.id===e);if(!n)return null;const a=n.single?W.find(s=>s.type===n.id):void 0;if(a)return t.show!==!1&&ht(a.id),a.id;const r=mv(W,n),o=W.map(s=>s.type).lastIndexOf(r.type);return W=o<0?[...W,r]:[...W.slice(0,o+1),r,...W.slice(o+1)],Vt||Un(W),Fh(r),vo(),Kn?.sync(),t.show!==!1&&ht(r.id),Mt?.render(),r.id}function _h(e,t){const n=W.find(l=>l.id===e);if(!n)return;const a=W.filter(l=>l.id!==e),r=l=>xe.find(d=>d.id===l.type)?.sound===!1,o=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:o+1:a.findIndex(l=>l.id===t);W=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],Vt||Un(W),Mt?.render(),Kn?.sync()}function jh(e,t){W=hv(W,e,t,xe),Vt||Un(W);const n=W.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&qh(a,n),Be.get(e)?.setAttribute("title",n.name),vo(),We===e&&Bh(n),ue.rename(e,n.name)}async function os(e,t){const n=W.find(d=>d.id===e),a=n?.name??e,r=xe.find(d=>d.id===n?.type)?.sound===!1;if(!await dt({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;Xh(),W=W.filter(d=>d.id!==e),Vt||Un(W),gh.forget(e),Qe.forget(e),st.drop(e),Ln.drop(e),Cn.get(e)?.remove(),Cn.delete(e),Gn.drop(e),bo.drop(e),Kr.route.drop(e),al.want(e,!1),yo.api.set(e,null),ol(e,null);const s=Ge.playing().includes(e);Ge.drop(e),s&&Ge.out(e);const l=Be.get(e);Be.delete(e),Te.remove(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),Kn?.sync(),ue.detach(e),IE(e),N1(Se(),e),We===e&&ht(W[0]?.id??""),vo()}function qh(e,t){const n=xe.find(d=>d.id===t.type);if(n?.sound!==!1){const d=R("span",{class:"tab-grip","aria-hidden":"true",title:"Drag to move this channel"}),u=R("span",{class:"tab-name"},t.name),c=R("span",{class:"tab-short","aria-hidden":"true"},sE(t.name)),p=R("span",{class:"tab-brand","aria-hidden":"true"},n?.brand??""),h=R("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});h.textContent="×";const b=m=>{m.stopPropagation(),os(t.id,e)};h.addEventListener("click",b),h.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&b(m)}),e.classList.add("tab-channel"),n?.identity&&e.style.setProperty("--tab-identity",`var(--nc-ui-${n.identity})`),e.title=t.name,e.setAttribute("data-nc-help",ee["strip:name"]),e.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight"),e.replaceChildren(d,R("span",{class:"tab-label"},u,c,p),h),Eh(t.id);return}const a=R("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=R("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const o=d=>{d.stopPropagation(),os(t.id,e)};r.addEventListener("click",o),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&o(d)});const s=Ia.get(t.id),l=R("span",{class:"tab-status"},s?.text??"");l.hidden=!s?.text,e.toggleAttribute("data-recording",s?.recording===!0),e.replaceChildren(a,R("span",{class:"tab-words"},R("span",{class:"tab-word"},t.name),l),r)}const Jr=R("div",{class:"mix"});Jr.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==We&&W.some(a=>a.id===n)&&ht(n)});Kn=lE({tabs:ja,addTab:ml,mixHost:Jr,order:()=>W.map(e=>e.id),hasStrip:e=>{const t=W.find(n=>n.id===e);return xe.find(n=>n.id===t?.type)?.sound!==!1},onReorder:(e,t)=>_h(e,t),onRename:(e,t)=>jh(e,t),nameOf:e=>W.find(t=>t.id===e)?.name??"",renameHelp:ee["strip:rename"],nameMax:Fs});let Mt=null,jn=0;const Qr=new Set;function IE(e){Qr.add(e),delete Ue.channels[e],delete Ue.channelFx[e],mo.delete(e),Pa()}let qa=!1;function Pa(){window.clearTimeout(jn),!qa&&(jn=window.setTimeout(()=>{Af(Vh())},300))}function Vh(){const e={...Ue.channels};for(const r of ue.list())e[r.id]=r.strip;for(const r of Qr)delete e[r];const t={};for(const r of["a","b"]){const o=Bn[r];o&&(t[r]=o.getState())}const n=ue.masterFx?.getState()??null,a={...Ue.channelFx};for(const[r,o]of mo)a[r]=o.getState();for(const r of Qr)delete a[r];return{v:1,channels:e,master:ue.masterPositionValue,returns:{a:{on:ue.returns.a.on,level:ue.returns.a.level},b:{on:ue.returns.b.on,level:ue.returns.b.level}},insert:{on:n?ew(n):Ue.insert.on},fx:t,channelFx:a,masterFx:n??Ue.masterFx}}ue.onChange(()=>{Mt?.render(),Pa(),Qe.changed()});for(const e of Object.values(Bn))e?.onChange(Pa);async function qn(){ae.state!=="running"&&await ae.resume()}const au=1500;async function FE(){Te.settled()||(qn(),await Te.whenSettled());const e=performance.now()+au;await Promise.race([qn(),new Promise(t=>setTimeout(t,au))]),await mt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([tl.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}lt.addEventListener("click",()=>{qn(),K.running()&&Ge.owner()===uo?K.stop():K.running()?Ge.claimAll():(Ge.claimAll(),K.play()),De()});function Hh(){const e=Number(_n.value);K.setTempo(e),Vt||eh(K.bpm(),ge())}zt.addEventListener("change",()=>{zt.value=Ht(zt.value),Vt||th(zt.value,ge())});function PE(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=R("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}sl.addEventListener("click",()=>void vl());function Uh(){pl.close(),vl()}document.addEventListener("keydown",e=>{!ih(e)||e.repeat||(e.preventDefault(),Uh())});async function vl(){const e=Ht(zt.value),t=W.map(o=>o.id),n=await an.collect(t),a=Jk(Kk({name:e,bpm:K.bpm(),instances:W,mix:Vh(),presets:n}));PE(t$(e),a.text,"application/json");const r=W.filter(o=>!n[o.id]).map(o=>o.name);_e(Zk({name:e,missing:r,song:Gs(n),droppedSong:a.droppedSong}))}Ah.addEventListener("click",()=>$a.click());$a.addEventListener("change",async()=>{const e=$a.files?.[0];if($a.value="",!e)return;const t=Wk(await e.text(),xe.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){_e(t.error);return}const n=t.scene;await dt({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Gh({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Sh.addEventListener("click",async()=>{await dt({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Gh({name:Us,bpm:Vr,instances:Ta(xe),mix:La()})});function Gh(e){K.running()&&K.stop(),qa=!0,window.clearTimeout(jn);const t=e.instances.map(({id:n,name:a})=>{const[r,o]=n.split("#"),s=xe.find(l=>l.id===r);return s?Hn(s,o?Number(o):1,a):null}).filter(n=>n!==null);Un(t),Af(e.mix),eh(e.bpm,ge()),th(e.name,ge()),an.stash({...e.presets??{}}),location.reload()}async function Kh(e){try{Xr.isOpen()&&Xr.close()}catch{}qe("dialog: opened");const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, folds and meters."];Fe.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):rn&&!yh&&t.push({text:`Your last Rec take (${rn.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"});const n=await dt({title:"Reset the Studio?",body:"The music stops and the Studio starts over: one of each instrument at its factory sound and pattern, a fresh mix, 120 BPM. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void vl()},confirmLabel:"Reset",danger:!0,returnFocus:e});qe(n?"dialog: Reset":"dialog: Cancel"),n&&Yh("reset")}const Wh=[];function qe(e,t){const n=t?`${e}: ${t instanceof Error?t.message:String(t)}`:e;Wh.push(n),t?console.error(`[reset] ${n}`):console.info(`[reset] ${n}`)}let In=null;function Yh(e){qe(`${e}: asked`);let t=null;try{t=v$(Se(),Xs(),e)}catch(n){qe(`${e}: storing the request failed`,n)}if(!t){ru("This browser's storage is blocked: the Studio can't reset");return}qe(`${e}: request stored`);try{K.running()&&K.stop()}catch(n){qe(`${e}: stopping the music failed (going on)`,n)}qa=!0,window.clearTimeout(jn);try{In=w$(location.href,e,t),qe(`${e}: going to ${In}`),location.replace(In)}catch(n){qe(`${e}: navigating failed, reloading`,n);try{location.reload()}catch(a){qe(`${e}: reloading failed`,a)}}window.setTimeout(()=>{qe(`${e}: still on the page after 5 s`),ru(`The Studio didn't reload: reload to ${e==="reset"?"reset":"undo"}`,()=>location.reload())},5e3)}function ru(e,t){_e(e,ou);try{const n=$t({message:e,duration:ou,anchor:Ke,...t?{actionLabel:"Reload",onAction:t}:{}});n.el.dataset.resetProblem=""}catch(n){qe("showing the problem failed",n)}}const ou=12e3;addEventListener("pageshow",e=>{!e.persisted||!In||(qe("restored from the page cache: going again"),location.replace(In))});addEventListener("storage",e=>{if(!(Vt||In||e.key!==fo&&e.key!==null)&&Ys(ge())!==dh){Vt=!0,qa=!0,window.clearTimeout(jn),qe("another tab reset the Studio: this page saves nothing more"),document.documentElement.dataset.studioStale="";try{const t=$t({message:"The Studio was reset in another tab",actionLabel:"Reload",duration:RE,anchor:Ke,onAction:()=>location.reload()});t.el.dataset.studioStale=""}catch{_e("The Studio was reset in another tab: reload")}}});const RE=6e5;let is=null;function DE(){const e=$t({message:"Studio reset",actionLabel:"Undo",duration:i$,anchor:Ke,onAction:()=>Yh("undo"),onClose:t=>{is=null,t!=="action"&&ho(Se(),Xs())}});e.el.dataset.resetUndo="",is=e}function Xh(){is?.close("close")}let iu=0,ss="",ls=0;function _e(e,t=4e3){ss=e,ls=performance.now()+t,De(),window.clearTimeout(iu),iu=window.setTimeout(()=>{ls=0,De()},t)}_n.addEventListener("change",Hh);_n.addEventListener("keydown",e=>{e.key==="Enter"&&Hh()});Ot.addEventListener("click",()=>{qn();const e=Fe.state;e==="recording"?OE():e==="arming"||e==="armed"?(Fe.cancel(),_e("Rec cancelled")):e==="idle"&&(Fe.arm(K.playing()),Jh())});async function OE(){const e=await Fe.stop();e&&(rn&&URL.revokeObjectURL(rn.url),rn={url:URL.createObjectURL(e.blob),take:e},la.href=rn.url,la.download=e.name,la.textContent=`Save take (${e.seconds.toFixed(1)} s)`,la.hidden=!1,yh=!1)}function Jh(){const e=Fe.state;if(e!=="arming"&&e!=="armed")return;const t=K.clock.transport;if(!t.running||t.startTime===null){Fe.schedule(null);return}const n=Math.round(mt.toContextTime(t.startTime)*ae.sampleRate);Fe.schedule(n+go.latency("master"))}function zE(){const e=Fe.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";Ot.dataset.state=t?"armed":n?"recording":"idle",Ot.setAttribute("aria-pressed",String(n)),Ot.textContent=t?"Armed":n?"Stop rec":"Rec",Ot.disabled=e==="stopping"||!Fe.supported,De()}Fe.onChange(zE);let Ra=null;function BE(){const e=K.clock.transport;!e.running||e.startTime===null||(Ra=Math.round(mt.toContextTime(e.startTime)*ae.sampleRate)+go.latency("master"))}function Qh(){return!K.clock.transport.running||Ra===null?null:{origin:Ra,barFrames:240/K.bpm()*ae.sampleRate}}function Zh(e){const t=rl[e];return!t||t.key==="since"&&Ra===null?null:t.choice(Ra??0)}function $o(){const e=!ft.hidden;if(cn.setAttribute("aria-expanded",String(e)),cn.dataset.keeping=Ve.keeping?"on":"off",!e)return;Na.checked!==Ve.keeping&&Na.set(Ve.keeping);const t=Ve.status,n=uf(t)/(t.sampleRate||ae.sampleRate);wh.textContent=Ve.keeping?`${ji(n)} of sound held`:"Keeping is off";const a=Qh();_a.forEach((r,o)=>{const s=Zh(o),l=s?Ve.plan(s,a):null;r.disabled=!l;const d=rl[o];d?.key==="since"&&(r.textContent=l?`Keep since Play (${ji((l.to-l.from)/(t.sampleRate||ae.sampleRate))})`:d.label)})}Ve.onChange($o);function em(){ft.hidden&&(ft.hidden=!1,Ve.refresh(),$o(),(_a.find(e=>!e.disabled)??Na.el).focus())}function Va(e=!1){ft.hidden||(ft.hidden=!0,$o(),e&&cn.focus())}cn.addEventListener("click",()=>{ft.hidden?em():Va()});document.addEventListener("pointerdown",e=>{!ft.hidden&&!xh.contains(e.target)&&Va()});ft.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),Va(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[..._a.filter(r=>!r.disabled),Na.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});_a.forEach((e,t)=>e.addEventListener("click",()=>{const n=Zh(t);n&&_E(n)}));async function _E(e){Va(!0);const t=await Ve.keep(e,{grid:Qh(),bpm:K.bpm()});if(!t){_e("Nothing held to keep");return}vh=t;const n=URL.createObjectURL(t.blob);R("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),_e(`Kept ${ji(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||cn.disabled||(e.preventDefault(),ft.hidden?em():Va(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace")return;const t=e.target;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))){if(bo.press("studio",e)){e.preventDefault();return}e.code!=="Space"||e.repeat||(e.preventDefault(),lt.click())}});ja.addEventListener("keydown",e=>{if(e.target===Nn||e.altKey)return;const t=Kn?.visualOrder()??W.map(r=>r.id),n=t.indexOf(We),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),ht(a),document.getElementById(`tab-${a}`)?.focus())});function De(){const e=K.running()&&Ge.owner()===uo;lt.textContent=e?"Stop":"Play",lt.setAttribute("aria-pressed",String(e)),document.activeElement!==_n&&(_n.value=String(Math.round(K.bpm()*10)/10));const t=K.position();Wr.value=t?`${t.bar}.${t.beat}`:"—";const n=K.peers().length;tn.textContent=ae.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",wn.textContent=ae.state==="running"?"":"Audio off";const a=Fe.state==="arming"||Fe.state==="armed";a&&(tn.textContent="Rec armed: waiting for sound",wn.textContent="Rec armed"),Xe.classList.toggle("off",ae.state!=="running");const{done:r,total:o}=Te.counts(),s=!Te.settled(),l=!s&&Zr>0&&performance.now()-Zr<tm;if(Xe.classList.toggle("loading",s),Xe.classList.toggle("just-ready",l),s)tn.textContent=`Loading the Studio… ${r} of ${o} instruments ready`,wn.textContent=`Loading ${r}/${o}`,Xe.classList.remove("off");else if(l&&!a){const c=Te.items().filter(p=>p.state==="failed");tn.textContent=c.length?`Studio ready: ${c.map(p=>p.brand).join(", ")} didn't load`:"Studio ready: press Play",wn.textContent="Ready",Xe.classList.remove("off")}const d=ls>performance.now();d&&(tn.textContent=ss,wn.textContent=ss);const u=l&&Te.items().some(c=>c.state==="failed");Xe.toggleAttribute("data-quiet",!(d||a||u)),Ke.toggleAttribute("data-running",K.running()),ul(),s||(ae.state==="running"?lt.removeAttribute("data-nc-help"):lt.setAttribute("data-nc-help",ee["transport:play-off"]))}const tm=2500;let Zr=0;K.clock.onChange(()=>{K.clock.transport.running&&(bh=!0),BE(),$o(),K.running()||Ge.clear(),Jh(),De()});Ge.onChange(De);Ge.onLastOut(()=>{K.running()&&K.stop(),De()});K.clock.onChange(()=>Mt?.render());K.peer.onPeers(De);ae.addEventListener("statechange",De);const jE=.25;let su=performance.now();function nm(e){const t=Math.min(.1,(e-su)/1e3);su=e,Mt?.frame(t);const n=K.position(),a=n?`${n.bar}.${n.beat}`:"—";Wr.value!==a&&(Wr.value=a);const r=K.beatPhase(),o=r!==null&&r<jE;rs.hasAttribute("data-on")!==o&&rs.toggleAttribute("data-on",o),requestAnimationFrame(nm)}const am=R("ul",{class:"boot-list"}),rm=R("div",{class:"boot-panel"},R("p",{class:"boot-title"},"Loading the Studio"),am,R("p",{class:"boot-note"},"Play is ready once every instrument is in."));xo.append(rm);let lu=!1;function Eo(){const e=Te.items(),{done:t,total:n}=Te.counts(),a=Te.settled();if(a&&!Zr&&(Zr=performance.now(),document.documentElement.dataset.studioLoaded="",window.setTimeout(De,tm)),lu){De();return}lu=a,document.documentElement.toggleAttribute("data-studio-loading",!a),Ke.style.setProperty("--boot-done",String(n?t/n:1)),lt.disabled=!a,a||lt.setAttribute("data-nc-help",ee["transport:play-loading"]),am.replaceChildren(...e.map(o=>R("li",{class:"boot-item","data-boot":o.state},R("span",{class:"boot-mark","aria-hidden":"true"}),R("span",{class:"boot-name"},R("span",{class:"boot-brand"},o.brand)," ",R("span",{class:"boot-type"},o.name)),R("span",{class:"boot-word"},Av[o.state]))));for(const o of W){const s=document.getElementById(`tab-${o.id}`),l=a?void 0:e.find(d=>d.id===o.id)?.state;l?s?.setAttribute("data-boot",l):s?.removeAttribute("data-boot")}const r=a||Ih.has(We);rm.hidden=r,xo.classList.toggle("booting",!r),De()}Te.onChange(Eo);function qE(e){gl(e.src).then(t=>{const n=new URL(Zp(e,Nh,t),location.href).href;return fetch(n,{priority:"low"}).then(a=>a.ok?a.text():"").then(a=>{for(const r of Nv(a,n))document.head.querySelector(`link[rel="prefetch"][href="${CSS.escape(r)}"]`)||document.head.append(R("link",{rel:"prefetch",href:r}))})}).catch(()=>{})}function VE(){const e=Tv(W.map(t=>t.id),We);Lv(e,t=>{if(Ea.get(t)?.go(),t===e[0])for(const n of W)n.id!==t&&qE(n);return Te.whenDone(t)},()=>Cv()).then(()=>{for(const t of Ea.values())t.go();Ea.clear()})}async function HE(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.replaceChildren(dl,Ke,hl,Jr,R("main",{class:"instruments"},ja,R("div",{class:"bay"},Fa,xo),TE),nl.el,yo.el),Mt=ix(Jr,ue,{order:()=>W.map(t=>t.id),catalogue:Rs.filter(t=>t.sound!==!1),bpm:()=>K.bpm(),onAdd:yl,onRemove:(t,n)=>void os(t,n),onReorder:(t,n)=>_h(t,n),onRename:(t,n)=>jh(t,n),...wa?{plugins:wa}:{}});for(const t of W)Fh(t);Eo(),ae.state==="running"&&await ae.suspend(),await ae.audioWorklet.addModule(q$),Mh.start(ae,!0),fh(),Fe.attach(),Ve.attach(),await K.start();for(const t of[Bn.a,Bn.b,ue.masterFx])t&&Ou(t,K.clock,{mapper:mt});VE(),ht(We),De(),requestAnimationFrame(nm),window.setInterval(()=>ue.parkIdleReturns(),hx),document.documentElement.dataset.studioReady="",ra&&(document.documentElement.dataset.studioReset=ra),ra==="reset"?DE():ra==="undo"?_e("Reset undone"):ra==="failed"&&_e("Couldn't reset: this browser's storage is full"),GE(),WE(),window.setTimeout(()=>Ek({script:new URL(import.meta.url).pathname,builds:()=>kk([...Be.values()].map(t=>t.src),location.href),onChange:ME}),3e3),wa&&Rk({ctx:ae,running:()=>Fk([...Zs].map(t=>t.getChain())),onFrozen:UE})}async function UE(e){Qs.add(e.map(a=>a.id)),window.clearTimeout(jn),qa=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),_e(`${t} froze the audio`),await dt({title:U.frozenTitle,body:U.frozenBody(t),confirmLabel:U.frozenOpen,cancelLabel:U.frozenStay})&&window.open(location.href,"_blank")}function GE(){const e=new Set(an.pending());if(!e.size)return;const t=[],n=s=>W.find(l=>l.id===s)?.name??s,a=Gs(an.peek()),r=()=>{window.clearTimeout(o);const s=[...t,...an.dropPending()].map(n);_e(e$({name:Ht(zt.value),kept:s,song:a}))};an.onApplied((s,l)=>{e.delete(s)&&(l||t.push(s),e.size||r())});const o=window.setTimeout(r,Fv)}window.__studio={resetTrail:Wh,ctx:ae,mixer:ue,grab:go,recorder:Fe,keys:bo,keyRoute:Kr.route,metronome:al,readout:yo.api,moduleChip:ol,tabLine:e=>Ia.get(e)??null,get lastTake(){return rn?.take??null},keeper:Ve,get lastKeep(){return vh},limiterDelay:hh,mapper:mt,transport:K,frames:Be,show:ht,get instances(){return W},fx:Bn,plugins:wa,frozen:Qs,channelCores:mo,get mix(){return Mt},situation:Gn,notes:{bus:st,dev:(e,t,n={})=>{const a=bk(st.source(e,e),K.clock,{settings:t});for(const[r,o]of Object.entries(n))a.source.setTarget(r,{role:o.role,on:o.on??!0,...o.octave===void 0?{}:{octave:o.octave}});return a}}};HE();const KE={off:"Picker",connecting:"Picker…",on:"Picker on",away:"Picker: no answer",ask:"Picker: connect",blocked:"Picker: blocked"};function eo(e){ct.dataset.picker=e;const t=ct.querySelector(".picker-label");t&&(t.textContent=KE[e]),ct.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),ct.dataset.ncHelp=ee[`picker:${e}`]}eo("off");async function WE(){let e=Ur(ge());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const r=t?Js(t):e.address;r&&(e={on:!0,address:r},Gr(ge(),e))}if(!e.on)return;const n=await M$(navigator.permissions,location.hostname,r=>{const o=Ur(ge()),s=ct.dataset.picker;o.on&&(r==="granted"&&(s==="ask"||s==="blocked")?Qe.start(o.address):r==="denied"&&Qe.status!=="on"&&(Qe.stop(),eo("blocked")))}),a=T$(e,n);a==="start"?Qe.start(e.address):a!=="off"&&eo(a)}ct.addEventListener("click",()=>void YE());async function YE(){const e=Ur(ge()),t=ct.dataset.picker;if(t==="ask"||t==="blocked"){xa=!0,Qe.start(e.address);return}if(Qe.status!=="off"){if(!await dt({title:"Disconnect the Sample Picker?",body:"The Picker won't see or load this Studio's NYX pads until you connect it again.",confirmLabel:"Disconnect",returnFocus:ct}))return;Gr(ge(),{...e,on:!1}),Qe.stop();return}await dt({title:"Connect the Sample Picker?",body:`Connected, the Sample Picker on this computer (${e.address}) shows your NYX's pads, and a tap on a pad there loads the sound here. Chrome may ask to let this site reach this computer: choose Allow.`,confirmLabel:"Connect",returnFocus:ct})&&(Gr(ge(),{...e,on:!0}),xa=!0,Qe.start(e.address))}function XE(e){if(e==="on"||e==="off"){xa=!1,oa?.close("close");return}if(e!=="away"||!xa)return;xa=!1;const t="Can't reach the Sample Picker. Start it on this computer (it must be on port 5177). If it's running, allow Local network access for this site in Chrome's site settings.";_e("Can't reach the Sample Picker",ui);try{oa?.close("close");const n=$t({message:t,duration:ui,anchor:Ke,onClose:()=>{oa===n&&(oa=null)}});n.el.dataset.pickerCantReach="",oa=n}catch{_e(t,ui)}}
