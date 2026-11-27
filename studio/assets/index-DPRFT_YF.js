(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const vn=1e-9;function sg(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Os{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return sg(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+vn&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+vn)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+vn){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-vn;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Os({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+vn)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+vn)return n[a];return n[0]}}const lg=Object.freeze({beatsPerBar:4,beatUnit:4}),In=1e-9;function cg(e){return Math.floor(e+In)}function Yu(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-In)*t;return n&&r<=e+In?r+t:r}class dg{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Os({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??lg}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-In&&(this.stopTime===null||t<this.stopTime-In)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-In?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=cg(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return Yu(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Xu="nc-clock/snapshot",Ju=1;function ug(e,t="local"){return{format:Xu,version:Ju,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function pg(e,t){const n=fg(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Et=e=>typeof e=="number"&&Number.isFinite(e),ic=e=>e===null||Et(e);function fg(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Xu&&n("format"),(!Et(t.version)||Math.floor(t.version)!==Ju)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Et(t.anchor.beat)||!Et(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Et(a.beat)&&Et(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Et(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Et(t.meter.beatUnit))&&n("meter"),(!ic(t.startTime)||!ic(t.stopTime)||!Et(t.stoppedBeat))&&n("transport times"),t}class hg{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new dg(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){pg(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return ug(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const mg="nc-sync/1",gg=1,bg="nc-sync",yg="nc-sync-leader",vg=0,Qu=.5,Zu=.75;function wg(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Qu&&e<=Zu?e:null}const Uo=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ra=e=>typeof e=="number"&&Number.isFinite(e),ar=e=>typeof e=="string"&&e.length>0;function kg(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==gg||!ar(t.type)||!ar(t.from)||!ra(t.term)||!ra(t.seq)||!ra(t.sentAt))return null;switch(t.type){case"hello":return ar(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return ra(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&ra(t.slot)?t:null;case"ping":case"pong":return ar(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function xg(e,t,n,a,r){return{proto:mg,from:t,term:n,seq:a,sentAt:r,...e}}function Re(){return(performance.timeOrigin+performance.now())/1e3}const Go=.003,$g=3,Ko=.002+1e-6,Eg=.01,sc=500;class Ag{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Eg:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Go&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,o=this.ctx.currentTime,s=o<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<c.length;h++)p.push(c[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=Go&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<sc)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=Go)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<sc)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min($g,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=Ko&&d++;d>o&&(r=l,o=d)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Ko&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Ko}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const Sg="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function Mg(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function ep(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,o=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&Mg())try{o=URL.createObjectURL(new Blob([Sg],{type:"text/javascript"})),r=new Worker(o),r.onmessage=u}catch{r=null,o&&URL.revokeObjectURL(o),o=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,o&&URL.revokeObjectURL(o),o=null}}}class Tg{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Uo,...t.capabilities},this.channelOption=t.channel??bg,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??Yu(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Zu,Math.max(Qu,t)):vg;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=wg(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=kg(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Uo,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Uo},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(yg,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(xg(t,this.id,this.term,++this.seq,this.o.now()))}}const Lg="modulepreload",Cg=function(e){return"/studio/"+e},lc={},Ig=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=Cg(u),u in lc)return;lc[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Lg,c||(h.as="script"),h.crossOrigin="",h.href=u,d&&h.setAttribute("nonce",d),document.head.appendChild(h),c)return new Promise((b,g)=>{h.addEventListener("load",b),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Ng=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Di=[.25,.5,.75,1,1.5,2],Fg=4.9,le={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0},crunchRate:{pow:[4e3,44100/4e3],div:100,round:!0}},lt={fmt:"wet"},xe={fmt:"pct"},wn={fmt:"db"},rr={fmt:"signedPct"},oa={fmt:"num",suffix:" ms"},ae={div:100};function j(e,t,n,a,r,o,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function vt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var ga=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[j("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:le.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[j("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:le.hpHz,astrid:!0,zero:"off"}),j("q","Resonance",0,100,0,2,{fmt:"q",law:le.hpQ},{dsp:{law:le.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[j("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:le.bpHz,astrid:!0},{dsp:{law:le.bpHz}}),j("q","Q",0,100,0,2,{fmt:"q",law:le.bpQ},{dsp:{law:le.bpQ}}),j("mix","Mix",0,100,100,3,lt,{dsp:ae,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[j("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:vt(Ng),overriddenBy:"beats_free",tempoSynced:!0}),j("feedback","Feedback",0,90,35,2,xe,{dsp:ae,unit:"%"}),j("mix","Wet/dry",0,100,0,3,lt,{dsp:ae,unit:"%",astridKey:"wet"}),j("tone","Tone",0,100,100,4,{fmt:"hz",law:le.delayTone,offAt:100},{dsp:{div:99},more:!0}),j("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),j("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:vt([[0,"Insert"],[1,"Send"]]),more:!0}),j("send","Send",0,100,100,7,xe,{dsp:ae,unit:"%",more:!0}),j("mod_send","Accent → send",-100,100,0,8,rr,{dsp:ae,unit:"%",more:!0}),j("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[j("predelay","Pre-delay",0,200,0,1,oa,{dsp:{div:1e3},unit:"ms"}),j("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:ae,unit:"%"}),j("decay","Decay",0,100,50,3,xe,{dsp:ae,unit:"%"}),j("damping","Damping",0,100,0,4,xe,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,0,5,lt,{dsp:ae,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[j("size","Size",0,100,60,1,xe,{dsp:ae,unit:"%"}),j("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),j("predelay","Pre-delay",0,250,20,3,oa,{dsp:{div:1e3},unit:"ms"}),j("tone","Tone",0,100,60,4,{fmt:"hz",law:le.hallTone,astrid:!0},{dsp:{law:le.hallTone}}),j("mix","Mix",0,100,25,5,lt,{dsp:ae,unit:"%"}),j("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),j("width","Width",0,100,100,7,xe,{dsp:ae,unit:"%",more:!0}),j("motion","Motion",0,100,30,8,xe,{dsp:ae,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[j("rate","Rate",0,100,35,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),j("depth","Depth",0,100,60,2,xe,{dsp:ae,unit:"%"}),j("width","Width",0,100,80,3,xe,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,50,4,lt,{dsp:ae,unit:"%"}),j("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:vt([[3,"3"],[6,"6"]]),more:!0}),j("vibrato","Vibrato",0,100,20,6,xe,{dsp:ae,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[j("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:vt([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),j("swing","Swing",0,100,0,3,xe,{dsp:ae,unit:"%"}),j("depth","Depth",0,100,90,4,xe,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,100,5,lt,{dsp:ae,unit:"%"}),j("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:vt([[8,"8"],[16,"16"]]),more:!0}),j("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:vt([[0,"Volume"],[1,"Filter"]]),more:!0}),j("smooth","Smooth",1,20,4,7,oa,{unit:"ms",more:!0}),j("spread","Spread",0,100,0,8,xe,{dsp:ae,unit:"%",more:!0}),j("res","Resonance",0,100,20,9,xe,{dsp:ae,unit:"%",more:!0})]},{type:"crunch",label:"Crunch",own:!0,note:"Rate with no filter, then Bits: the S950 / SP-1200 grit.",dials:[j("rate","Rate",0,100,78,1,{fmt:"khz",law:le.crunchRate},{step:.1,dsp:{law:le.crunchRate}}),j("bits","Bits",4,16,12,2,{fmt:"num",suffix:"-bit"},{unit:"bits"}),j("hold","Steps",0,1,0,3,{fmt:"option"},{step:null,options:vt([[0,"Hard"],[1,"Smooth"]]),more:!0})]},{type:"flanger",label:"Flanger",dials:[j("rate","Rate",0,100,26,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),j("depth","Depth",0,100,70,2,xe,{dsp:ae,unit:"%"}),j("feedback","Feedback",-90,90,50,3,rr,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,50,4,lt,{dsp:ae,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[j("rate","Rate",0,100,52,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),j("depth","Depth",0,100,50,2,xe,{dsp:ae,unit:"%"}),j("spread","Spread",0,100,70,3,xe,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,40,4,lt,{dsp:ae,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[j("rate","Rate",0,100,39,1,{fmt:"rate",law:le.rate},{dsp:{law:le.rate}}),j("depth","Depth",0,100,70,2,xe,{dsp:ae,unit:"%"}),j("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:vt([[4,"4"],[6,"6"],[8,"8"]])}),j("feedback","Feedback",0,90,30,4,xe,{dsp:ae,unit:"%"}),j("mix","Mix",0,100,50,5,lt,{dsp:ae,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[j("low_db","Low",-18,18,0,1,wn,{unit:"dB"}),j("mid_db","Mid",-18,18,0,2,wn,{unit:"dB"}),j("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:le.midHz,astrid:!0},{dsp:{law:le.midHz}}),j("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:le.eqQ},{dsp:{law:le.eqQ}}),j("high_db","High",-18,18,0,4,wn,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[j("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),j("output_db","Output",-12,12,0,2,wn,{unit:"dB"}),j("mix","Mix",0,100,100,3,lt,{dsp:ae,unit:"%"}),j("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:vt([[0,"Smooth"],[1,"Acid"]]),more:!0}),j("tone","Tone",0,100,100,5,{fmt:"hz",law:le.driveTone,offAt:100},{dsp:{div:99},more:!0}),j("mod_drive","Accent → drive",-100,100,0,6,rr,{dsp:ae,unit:"%",more:!0}),j("mod_tone","Accent → tone",-100,100,0,7,rr,{dsp:ae,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[j("threshold_db","Threshold",-60,0,0,1,wn,{unit:"dB"}),j("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:le.ratio},{dsp:{law:le.ratio}}),j("attack_ms","Attack",1,100,10,3,oa,{unit:"ms"}),j("release_ms","Release",10,1e3,150,4,oa,{unit:"ms"}),j("makeup_db","Makeup",0,24,0,5,wn,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[j("width","Width",0,200,100,1,xe,{dsp:ae,unit:"%"}),j("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:ae})]}],Pg=ga.map(function(e){return e.type}),Rg=ga.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Dg={reverb:"plate"},_n={},tp=[],ba=[];function Og(e){_n[e.type]||tp.push(e.type),_n[e.type]=e;for(var t=0;t<ba.length;t++)try{ba[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function zg(){return tp.map(function(e){return _n[e]})}function Bg(e){return ba.push(e),function(){var t=ba.indexOf(e);t>=0&&ba.splice(t,1)}}function np(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function zs(e){var t=Dg[e]||e;return Pg.indexOf(t)>=0||typeof t=="string"&&_n[t]?t:null}function he(e){for(var t=zs(e),n=0;n<ga.length;n++)if(ga[n].type===t)return ga[n];return t&&_n[t]?_n[t]:null}function _g(e,t){var n=he(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function an(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Nr(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=an(n.law,t);return a===null?0:a}function cc(e,t){return Math.min(Fg,e*60/(t>0?t:120))}var dc=function(e){return e>0?"+":e<0?"−":""};function jg(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function ap(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:dc(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return dc(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=an(a.law,t),r===null?a.zero||"open":a.astrid?jg(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"khz":return(an(a.law,t)/1e3).toFixed(1)+" kHz";case"q":return"Q "+an(a.law,t).toFixed(1);case"ratio":return an(a.law,t).toFixed(1)+":1";case"rate":return r=an(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(cc(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(cc(t,n)*1e3)+" ms"}return String(t)}var qg=1,vo=["drive","delay","plate"];function Hg(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return ap(e,a,r)},t}var Nn=vo.map(function(e){var t=he(e),n={type:e,label:t.label,dials:t.dials.map(Hg)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Vg={reverb:"plate"};function Fr(e){var t=Vg[e]||e;return vo.indexOf(t)>=0?t:null}function wo(e){for(var t=Fr(e),n=0;n<Nn.length;n++)if(Nn[n].type===t)return Nn[n];return null}function rp(e,t){var n=wo(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function jn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Lt(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Ug(){return{v:qg,chain:Nn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Gg(e){return Di.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Di[0])}function Wo(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kg(e){for(var t=Array.isArray(e)?e:Wo(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Ug(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(Wo(l)){var d=Fr(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var u=a.chain[vo.indexOf(d)],c=Wo(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,wo(d).dials.forEach(function(p){u.dials[p.key]=Lt(p,c[p.key])}),Wg(d,u.dials,c)}}return{state:a,dropped:o}}function Wg(e,t,n){for(var a=wo(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=Lt(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],jn(o,t)))}}function Pr(e){return Kg(e).state}function Yg(e){return JSON.parse(JSON.stringify(e))}var Xg=24,Oi={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function zi(e,t,n){if(t==="bypass")return n?0:1;var a=rp(e,t)||Jg(e,t);return a?Nr(a,n):0}function Jg(e,t){var n=he(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Qg={};Nn.forEach(function(e){e.dials.forEach(function(t){Qg[e.type+"."+t.key]=t.format})});function Yo(e,t){var n=new Float64Array(Xg),a=Pr(e);return a.chain.forEach(function(r){var o=Oi[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=zi(r.type,s,r.dials[s])})}),n}var Zg="__ncFxLoop",eb=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,uc=/[A-Za-z_$\u0080-\uffff]/,Xo=/[A-Za-z0-9_$\u0080-\uffff]/;function tb(e){var t=[],n=0,a=e.length,r=[],o,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?eb.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function d(){for(var h=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,d();continue}if(o==="/"&&l()){n++;for(var c=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(c)o==="]"&&(c=!1);else if(o==="[")c=!0;else if(o==="/"){n++;break}n++}for(;n<a&&Xo.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(uc.test(o)||o==="\\"){for(n++;n<a&&(Xo.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&uc.test(e[n+1])){for(n+=2;n<a&&Xo.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")r.push("{");else if(o==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function nb(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function ab(e){for(var t=String(e),n=tb(t),a=[],r=Zg+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=o+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=nb(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,h=d+1;h<u;h++){var b=n[h].t==="p"?n[h].v:"";b==="("||b==="["||b==="{"?p++:b===")"||b==="]"||b==="}"?p--:b===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(y,$){return y[0]-$[0]});for(var g="",v=0,f=0;f<a.length;f++)g+=t.slice(v,a[f][0])+a[f][1],v=a[f][0];return g+t.slice(v)}var Jo=1,pc=15,op=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,rb=/^[a-z][a-z0-9_]{0,31}$/,ip=/^\d+\.\d+\.\d+$/,sp=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,ob=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,fc=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],hc=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Rr={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function ya(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function kn(e){return typeof e=="number"&&isFinite(e)}function rn(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function ko(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!ya(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){fc.indexOf(l)<0&&a(l,"unknown field (allowed: "+fc.slice(1).join(", ")+")")}),n.ncPlugin!==Jo&&a("ncPlugin","must be "+Jo),(typeof n.id!="string"||!op.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),rn(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!ip.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),rn(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!sp.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return rn(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!ob.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>pc)a("params","at most "+pc);else{var o={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!ya(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(h){hc.indexOf(h)<0&&a(u+"."+h,"unknown field (allowed: "+hc.join(", ")+")")}),typeof l.id!="string"||!rb.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(u+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,rn(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return rn(h,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!kn(l.minValue)||!kn(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(kn(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):kn(l.discreteStep)&&l.discreteStep>0?l.discreteStep:ib(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!kn(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(kn(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Jo,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function ib(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function sb(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function xo(e){return"plugin:"+e}function lb(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,h){return{value:h,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:sb(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),o={type:xo(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function lp(e,t){var n=ko(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=he(xo(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=lb(n.manifest,t);return Og(r),r}async function cp(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function cb(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function mc(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var o=new Uint8Array(await r.arrayBuffer());if(n){var s=await cp(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var or=typeof WeakMap=="function"?new WeakMap:null;function dp(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function up(e,t,n,a,r){var o=t.id+"@"+t.version,s=or&&or.get(e);!s&&or&&(s={},or.set(e,s));var l=s&&s[o];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await wp(e,r);var h=URL.createObjectURL(new Blob([ab(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[o]=c,c.catch(function(){delete s[o]})),await c,{stale:!1}}async function pp(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));cb(r);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await mc(r.href,o,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=ko(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=he(xo(c.id));if(p&&p.plugin.version!==c.version)throw dp(c,p.plugin.version);var h=new URL(c.dsp,r),b=await up(e,c,function(){return mc(h.href,o,s.dsp,"DSP file")},h.href,a.moduleUrl),g=lp(c,{url:r.href,listed:a.listed===!0});return{entry:g,manifest:c,url:r.href,stale:b.stale}}var db=256*1024;async function gc(e,t,n){var a=n||{},r=t||{},o=r.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=ko(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>db)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=he(xo(l.id));if(u&&u.plugin.version!==l.version)throw dp(l,u.plugin.version);var c=r.dsp,p=await up(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=lp(l,{url:d,listed:!1});return{entry:h,manifest:l,url:d,stale:p.stale}}function ub(e){var t=[];if(!ya(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,o){var s="plugins["+o+"]",l=[];if(!ya(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!op.test(r.id))&&l.push("id"),rn(r.name,40)||l.push("name"),(typeof r.version!="string"||!ip.test(r.version))&&l.push("version"),rn(r.author,80)||l.push("author"),(typeof r.licence!="string"||!sp.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!ya(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function pb(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var o=ub(await r.json());return{registry:o.registry,url:a.href,errors:o.errors}}function fb(e,t,n,a){return pp(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function hb(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=o(),c=0,p=!1,h=s(function(){var b=o(),g=b-u,v=e.currentTime;if(u=b,e.state!=="running"||v!==d){d=v,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(g>4*r){c=0;return}c+=g,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:v}))},r);return{stop:function(){l(h)},stalled:function(){return p}}}var mb=["hard","pump","swell","blip","glide"],gb=["Hard","Pump","Swell","Blip","Glide"],fp=16;function wt(e){for(var t=[],n=0;n<fp;n++)t.push(e[n%e.length]);return t}var qn=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:wt([100]),shapes:wt([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:wt([15,35,60,85,100,85,60,35]),shapes:wt([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:wt([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:wt([100,55,85,40,100,55,85,70]),shapes:wt([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:wt([100,85,70,60,50,40,30,20]),shapes:wt([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],bb="Ducker";function hp(e){for(var t=String(e||"").toLowerCase(),n=0;n<qn.length;n++){var a=qn[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function bc(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function Ga(e){for(var t=qn[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],r=Array.isArray(n.shapes)?n.shapes:[],o={levels:[],shapes:[]},s=0;s<fp;s++)o.levels.push(bc(a[s],0,100,t.levels[s])+0),o.shapes.push(bc(r[s],0,mb.length-1,t.shapes[s])+0);return o}function yb(e){var t=Ga(e),n=[],a,r,o;for(a=0;a<4;a++){for(o=0,r=3;r>=0;r--)o=o*101+t.levels[a*4+r];n.push([10+a,o])}for(a=0;a<2;a++){for(o=0,r=7;r>=0;r--)o=o*5+t.shapes[a*8+r];n.push([14+a,o])}return n}function vb(e){if(!e||!e.dials)return"Custom";for(var t=Ga(e.pattern),n=0;n<qn.length;n++){var a=qn[n],r=!0,o;for(o in a.dials)e.dials[o]!==a.dials[o]&&(r=!1);var s=a.dials.steps;for(o=0;r&&o<s;o++)(t.levels[o]!==a.levels[o]||t.shapes[o]!==a.shapes[o])&&(r=!1);if(r)return a.name}return"Custom"}function mp(e){var t=e&&e.steps===8?8:16;return e&&e.rate===12&&t>12?12:t}function wb(e,t,n){var a=e&&(e.rate===4||e.rate===8||e.rate===12)?e.rate:16,r=e&&e.steps===8?8:16,o=4/a,s=+t||0;if(a===12){var l=n>0?n:4;s-=Math.floor(s/l)*l}var d=.5+.25*(e&&typeof e.swing=="number"?e.swing:0)/100,u=s/o*.5,c=Math.floor(u),p=u-c,h=(c%16+16)%16,b=p<d?h*2:h*2+1;return b&r-1}function kb(e,t,n,a){for(var r=Ga(t),o=e&&e.steps===8?8:16,s=mp(e),l=(n%o+o)%o,d=l+1>=s?0:l+1,u=r.levels[l]/100,c=r.levels[d]/100,p=r.shapes[l],h=[],b=a>0?a:24,g=0;g<=b;g++){var v=g/b,f,y;switch(p){case 1:y=v*1.6667,y>1&&(y=1),f=u*y*(2-y);break;case 2:f=u*v*v;break;case 3:f=v<.12?u:u*Math.exp((.12-v)*18);break;case 4:y=v*v*(3-2*v),f=u+(c-u)*y;break;default:f=u}h.push(f)}return h}var xb=2,Dr=3,yc=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function on(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var $b=/^local:[A-Za-z0-9._@-]{1,200}$/,Eb=/^\d+\.\d+\.\d+$/;function Ab(e,t){var n=on(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Eb.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||$b.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function gp(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Sb(e){var t={},n=0;if(on(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function Mb(e){return e.plugin?e.plugin.idBase:e.type}function bp(e,t){var n=he(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,o=Mb(n);a[o+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+r,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=gp(n)),n.pattern){var d=hp(bb);Object.assign(l.dials,d.dials),l.pattern=d.pattern}return l}function Tb(e){var t=he(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Lb(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Cb(e){return typeof e=="number"&&isFinite(e)?Gg(e):e}function vc(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Cb(o)),a[r.key]=e.plugin?Lt(r,o,r.step):Lt(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Lt(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],jn(r,a)))}),a}function Ib(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=an(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var Nb={rate:"rate_hz"};function Fb(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Nb[o.key]||o.key;r[o.key]=Ib(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Pb(e,t){var n=t>0?Math.floor(t):Dr,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):on(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<o.length;u++){var c=o[u];if(on(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=zs(c.type),h=p&&he(p);if(!h&&!s&&np(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var b=Ab(c.plugin,c.type),g=b.id.split(".").pop(),v=1;d.some(function(m){return m.id===g+"-"+v});)v++;var f=typeof c.id=="string"&&yc.test(c.id)&&!d.some(function(m){return m.id===c.id})?c.id:g+"-"+v;d.push({id:f,type:c.type,bypass:c.bypass===!0,dials:Sb(c.dials),plugin:b});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var y;on(c.params)&&!on(c.dials)?y=vc(h,Fb(h,c.params,r,c.id||p),l):y=vc(h,on(c.dials)?c.dials:{},l);var $=bp(p,d),x=typeof c.id=="string"&&yc.test(c.id)&&!d.some(function(m){return m.id===c.id})?c.id:$.id,M=s?c.bypass!==!1:c.bypass===!0,k={id:s?$.id:x,type:p,bypass:M,dials:y};h.plugin&&(k.plugin=gp(h)),h.pattern&&(k.pattern=Ga(c.pattern)),d.push(k)}}return{state:{v:xb,chain:d},dropped:a,notes:r}}function dn(e,t){return Pb(e,t).state}function Pt(e){var t=he(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,Nr(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(yb(e.pattern)))),n}function Rb(e){var t=dn(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var o=he(r.type);return o&&o.own?(n.push(r.id+": ASTRID has no "+o.label),!1):!0}).map(function(r,o){var s=he(r.type),l={};return o>=Dr&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Di.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Db=150,Ob=6e3,zb=18,yp=6.283185307179586;function $o(e,t,n){return e<t?t:e>n?n:e}function Bb(e,t,n,a,r){var o=Math.pow(10,n/40),s=yp*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,h,b,g,v,f;if(e===0||e===2){v=d/2*Math.SQRT2,f=2*Math.sqrt(o)*v;var y=e===0?1:-1;u=o*(o+1-y*(o-1)*l+f),c=y*2*o*(o-1-y*(o+1)*l),p=o*(o+1-y*(o-1)*l-f),h=o+1+y*(o-1)*l+f,b=-y*2*(o-1+y*(o+1)*l),g=o+1+y*(o-1)*l-f}else v=d/(2*a),u=1+v*o,c=-2*l,p=1-v*o,h=1+v/o,b=-2*l,g=1-v/o;return[u/h,c/h,p/h,b/h,g/h]}function _b(e,t,n){var a=yp*t/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*o+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var wc={};function Gt(e){return wc[e]||(wc[e]=_g("eq",e))}function Sn(e,t){var n=Gt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return $o(a,n.min,n.max)}function vp(e){return[{id:"low",kind:0,hz:Db,db:Sn(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Nr(Gt("mid_hz"),Sn(e,"mid_hz")),db:Sn(e,"mid_db"),q:Nr(Gt("mid_q"),Sn(e,"mid_q"))},{id:"high",kind:2,hz:Ob,db:Sn(e,"high_db"),q:Math.SQRT1_2}]}function jb(e,t,n){for(var a=vp(e),r=n.length,o=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=Bb(u.kind,u.hz,u.db,u.q,t),h=0;h<r;h++){var b=n[h]<l?n[h]:l*.9999;c[h]=_b(p,b,t),o[h]+=c[h]}s.push(c)}return{total:o,bands:s}}function qb(e){var t=Gt("mid_hz").dsp.law;return $o(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Hb(e){var t=Gt("mid_q").dsp.law;return $o(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Or={low:"low_db",mid:"mid_db",high:"high_db"},Vb={low:"Low",mid:"Mid",high:"High"};function Ub(e,t,n){var a=[];function r(o,s){var l=Gt(o),d=l.step||1;s=$o(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==Sn(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Or[t]&&r(Or[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",qb(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",Hb(n.q)),a}function Gb(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Or[e]?[Or[e]]:[];return t.map(function(n){return[n,Gt(n).default]})}var ir=typeof WeakMap=="function"?new WeakMap:null;function Kb(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=ir&&ir.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},ir&&ir.set(e,n)),n.handle}function Wb(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:Gt(c).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},d=vp(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Vb[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:zb,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return jb(r,s,c)},spectrum:a.spectrum===!1?void 0:Kb(e)||void 0,onBand:function(c,p){u(Ub(r,c,p))},onReset:function(c){u(Gb(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Yb="nc-fx@1",Xb=600,Jb=256,Qb=8,ia=typeof WeakMap=="function"?new WeakMap:null;function wp(e,t){var n=ia&&ia.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Ig(async()=>{const{default:o}=await import("./worklet-source-Bi3zqun9.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),ia&&(ia.set(e,n),n.catch(function(){ia.delete(e)})),n)}function Rt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function kp(e,t,n,a){var r=Math.min(400,Math.max(20,Rt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=Rt(t.preGain,1),u=Math.max(0,Rt(t.crossfade,.012)),c=Rt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),b=e.createGain(),g=e.createGain(),v=null;t.modInput===!0&&(v=e.createGain(),v.channelCount=1,v.channelCountMode="explicit",v.channelInterpretation="discrete"),g.gain.value=0,p.connect(b),b.connect(h),g.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0,clk:null},y=n(r);f.post=function(m){f.node?f.node.port.postMessage(m):f.disposed||(o.length>=Jb&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push(m))};function $(m){var w=o.map(function(A){var T=Object.assign({},A);return T.when>m||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return o=[],w}f.emit=function(m){for(var w=0;w<f.listeners.length;w++)try{f.listeners[w](m)}catch(A){typeof console<"u"&&console.error(A)}},f.whenOf=function(m){return typeof m=="number"&&isFinite(m)&&m>0?m:0};var x=!1;f.tooFar=function(m){return typeof m=="number"&&m>e.currentTime+Xb?(!x&&typeof console<"u"&&(x=!0,console.warn("nc-fx: ignoring a time "+Math.round(m-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var M=wp(e,t.moduleUrl).then(function(){if(!f.disposed){var m=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},y);m.pending=$(e.currentTime),f.node=new AudioWorkletNode(e,Yb,{numberOfInputs:v?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:m}),f.node.port.onmessage=function(A){var T=A.data;if(T&&T.t==="lv"&&f.mUsers>0)f.lv=T.d,f.lvAt=kc();else if(T&&T.t==="clk"&&T.d)f.clk={beat:T.d[0],frame:T.d[1],perFrame:T.d[2],locked:T.d[3]===1,bar:T.d[4]||4};else if(T&&T.t==="perr"&&f.onPluginError&&T.d)for(var D=0;D<(T.n|0);D++)f.onPluginError(T.d[2*D],T.d[2*D+1])},p.connect(f.node),v&&v.connect(f.node,0,1),f.node.connect(g);var w=e.currentTime;w<=0||u===0?(b.gain.value=0,g.gain.value=1):(b.gain.setValueAtTime(1,w),b.gain.linearRampToValueAtTime(0,w+u),g.gain.setValueAtTime(0,w),g.gain.linearRampToValueAtTime(1,w+u)),f.status="ready"}},function(m){f.status="unavailable",o=[],f.error=m});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&kc()-f.lvAt<Zb?f.lv:null};var k={};return f.meter=function(m,w){if(k[m])return k[m];var A=0,T={in:0,out:0,gr:0},D={open:function(){return f.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,f.meterClose())},read:function(){var E=A>0?f.levels():null;return T.in=0,T.out=0,T.gr=0,E&&w(E,T),T}};return k[m]=D,D},f.core={input:p,output:h,modInput:v,ready:M,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(m,w){var A=Rt(m,NaN);!(A>0)||f.disposed||f.tooFar(w)||(f.bpm=Math.min(400,Math.max(20,A)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(w)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},setBeat:function(m,w){var A=Rt(m,NaN);A!==A||f.disposed||f.tooFar(w)||f.post({t:"beat",beat:A,when:f.whenOf(w)})},freeRun:function(m){f.disposed||f.tooFar(m)||f.post({t:"free",when:f.whenOf(m)})},setBar:function(m,w){var A=Math.round(Rt(m,NaN));!(A>=1&&A<=16)||f.disposed||f.tooFar(w)||f.post({t:"bar",beats:A,when:f.whenOf(w)})},beatAt:function(m){var w=f.clk;if(!w)return null;var A=typeof m=="number"&&isFinite(m)?m:e.currentTime;return{beat:w.beat+(A*e.sampleRate-w.frame)*w.perFrame,bpm:w.perFrame*60*e.sampleRate,locked:w.locked,beatsPerBar:w.bar}},clear:function(m){var w=m&&typeof m=="object"?m:{at:m};if(!(f.disposed||f.tooFar(w.at))){var A=Rt(w.fadeMs,0);f.post({t:"clear",when:f.whenOf(w.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(m){return f.listeners.push(m),function(){var w=f.listeners.indexOf(m);w>=0&&f.listeners.splice(w,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,b,g,h,v].forEach(function(m){try{m&&m.disconnect()}catch{}})}}},f}var Zb=250;function kc(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function xp(e,t){t.in=e[0],t.out=e[1]}function sr(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Qo(e,t){var n=t||{};if(n.slots)return ey(e,n);var a=Pr(n.state),r=Array.from(Yo(a)),o=kp(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Yo(a)),when:0}]}),s=o.core;function l(d){return a.chain[vo.indexOf(d)]}return s.setParam=function(d,u,c,p){var h=Fr(d);if(!(!h||o.disposed||o.tooFar(p))){var b=l(h),g;if(u==="bypass")g=!!c;else{var v=rp(h,u);if(!v)return;g=Lt(v,c,jn(v,b.dials))}return u==="bypass"?b.bypass=g:b.dials[u]=g,o.post({t:"p",i:Oi[h][u],v:zi(h,u,g),when:o.whenOf(p)}),o.emit({effect:h,key:u,value:g}),wo(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(x){return x.key===u}))){var y=b.dials[f.key],$=Lt(f,y,jn(f,b.dials));$!==y&&(b.dials[f.key]=$,o.post({t:"p",i:Oi[h][f.key],v:zi(h,f.key,$),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:$}))}}),g}},s.meter=function(){return o.meter("",xp)},s.getParam=function(d,u){var c=Fr(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return Yg(a)},s.setState=function(d,u){o.disposed||o.tooFar(u&&u.at)||(a=Pr(d),o.post({t:"load",program:Array.from(Yo(a)),when:o.whenOf(u&&u.at)}),o.emit({effect:null,key:null,value:null}))},s}function ey(e,t){var n=t.slots===!0?Dr:Math.max(1,Math.min(Qb,Math.floor(+t.slots)||Dr)),a=dn(t.state,n),r=1,o={},s={};function l(m){return!np(m.type)||he(m.type)!==null}function d(m){var w=he(m.type);return w&&w.plugin?w.plugin.engine:m.type}function u(m){return o[m.id]||(o[m.id]=r++),o[m.id]}function c(m){return m.filter(l).map(function(w){return{uid:u(w),type:d(w),program:Pt(w)}})}function p(){return a.chain.filter(l).map(function(m){return o[m.id]})}var h=c(a.chain),b=p(),g=kp(e,t,function(){return{slots:n,chain:h,order:b}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),v=g.core;g.onPluginError=function(m,w){for(var A in o)o[A]===m&&(s[A]=w,g.emit({effect:A,key:"error",value:w}))};function f(m){var w;for(w=0;w<a.chain.length;w++)if(a.chain[w].id===m)return a.chain[w];var A=zs(m);if(A){for(w=0;w<a.chain.length;w++)if(a.chain[w].type===A)return a.chain[w]}return null}function y(m,w){var A=u(m);g.post({t:"add",uid:A,type:d(m),when:w}),Pt(m).forEach(function(T){g.post({t:"ps",uid:A,k:T[0],v:T[1],when:w,snap:!0})})}function $(m){g.post({t:"order",uids:p(),when:m})}function x(m,w){var A={};a.chain.forEach(function(E){A[E.id]=E});var T=p().join();m.chain.forEach(function(E){var S=A[E.id];if(!l(E)){delete o[E.id];return}if(!S||S.type!==E.type||!o[E.id]){delete o[E.id],delete s[E.id],y(E,w);return}var C={};Pt(S).forEach(function(N){C[N[0]]=N[1]}),Pt(E).forEach(function(N){C[N[0]]!==N[1]&&g.post({t:"ps",uid:o[E.id],k:N[0],v:N[1],when:w})})});var D={};m.chain.forEach(function(E){D[E.id]=!0}),Object.keys(o).forEach(function(E){D[E]||delete o[E]}),Object.keys(s).forEach(function(E){D[E]||delete s[E]}),a=m,p().join()!==T&&$(w)}var M=Bg(function(m){if(!(g.disposed||!a.chain.some(function(A){return A.type===m}))){var w=JSON.parse(JSON.stringify(a));w.chain=w.chain.map(function(A){return A.type===m?dn({v:2,chain:[A]},1).chain[0]:A}),x(w,0),g.emit({effect:null,key:"plugin",value:m})}}),k=v.dispose;return v.dispose=function(){M(),k()},v.slots=n,v.meter=function(m){return m==null||m===""?g.meter("",xp):g.meter("#"+m,function(w,A){var T=f(m),D=T?o[T.id]:0,E=w[2];if(D){for(var S=3,C=0;C<E;C++,S+=4)if(w[S]===D){A.in=w[S+1],A.out=w[S+2],A.gr=w[S+3];return}}})},v.setParam=function(m,w,A,T){var D=f(m);if(!(!D||g.disposed||g.tooFar(T))){var E=he(D.type),S,C=null;if(!E)return w!=="bypass"?void 0:(D.bypass=!!A,g.emit({effect:D.id,key:w,value:D.bypass}),D.bypass);if(w==="bypass")S=!!A;else{for(var N=0;N<E.dials.length;N++)E.dials[N].key===w&&(C=E.dials[N]);if(!C)return;S=Lt(C,A,jn(C,D.dials))}var F={},U={};Pt(D).forEach(function(_){F[_[0]]=_[1]}),E.dials.forEach(function(_){_.stepWhen&&(U[_.key]=D.dials[_.key])}),w==="bypass"?D.bypass=S:D.dials[w]=S,E.dials.forEach(function(_){_.stepWhen&&(D.dials[_.key]=Lt(_,D.dials[_.key],jn(_,D.dials)))});var R=g.whenOf(T),B=o[D.id];return B&&Pt(D).forEach(function(_){(F[_[0]]!==_[1]||C&&_[0]===C.k)&&g.post({t:"ps",uid:B,k:_[0],v:_[1],when:R})}),g.emit({effect:D.id,key:w,value:S}),Object.keys(U).forEach(function(_){_!==w&&D.dials[_]!==U[_]&&g.emit({effect:D.id,key:_,value:D.dials[_]})}),S}},v.getParam=function(m,w){var A=f(m);if(A)return w==="bypass"?A.bypass:A.dials[w]},v.setPattern=function(m,w,A){var T=f(m);if(!(!T||!T.pattern||g.disposed||g.tooFar(A))){var D=w&&typeof w=="object"?w:{},E=Ga({levels:Array.isArray(D.levels)?D.levels:T.pattern.levels,shapes:Array.isArray(D.shapes)?D.shapes:T.pattern.shapes}),S={};Pt(T).forEach(function(F){S[F[0]]=F[1]}),T.pattern=E;var C=o[T.id],N=g.whenOf(A);return C&&Pt(T).forEach(function(F){S[F[0]]!==F[1]&&g.post({t:"ps",uid:C,k:F[0],v:F[1],when:N})}),g.emit({effect:T.id,key:"pattern",value:JSON.parse(JSON.stringify(E))}),JSON.parse(JSON.stringify(E))}},v.getPattern=function(m){var w=f(m);return w&&w.pattern?JSON.parse(JSON.stringify(w.pattern)):void 0},v.setGatePattern=function(m,w,A){var T=f(m),D=hp(w);return!T||!T.pattern||!D||g.disposed||g.tooFar(A)?!1:(Object.keys(D.dials).forEach(function(E){v.setParam(T.id,E,D.dials[E],A)}),v.setPattern(T.id,D.pattern,A),!0)},v.getState=function(){return JSON.parse(JSON.stringify(a))},v.setState=function(m,w){g.disposed||g.tooFar(w&&w.at)||(x(dn(m,n),g.whenOf(w&&w.at)),g.emit({effect:null,key:null,value:null}))},v.addEffect=function(m,w){var A=w||{},T=bp(m,a.chain);if(!(!T||a.chain.length>=n||g.disposed||g.tooFar(A.at))){if(A.dials){var D=dn({v:2,chain:[{id:T.id,type:T.type,dials:A.dials}]},1).chain[0];T.dials=D.dials}A.bypass===!0&&(T.bypass=!0);var E=a.chain.slice(),S=typeof A.index=="number"?Math.max(0,Math.min(E.length,A.index)):E.length;return E.splice(S,0,T),x({v:2,chain:E},g.whenOf(A.at)),g.emit({effect:T.id,key:"chain",value:"add"}),T.id}},v.removeEffect=function(m,w){var A=f(m),T=w&&w.at;return!A||g.disposed||g.tooFar(T)?!1:(x({v:2,chain:a.chain.filter(function(D){return D!==A})},g.whenOf(T)),g.emit({effect:A.id,key:"chain",value:"remove"}),!0)},v.moveEffect=function(m,w,A){var T=f(m),D=A&&A.at;if(!T||g.disposed||g.tooFar(D))return!1;var E=Lb(a.chain,a.chain.indexOf(T),w);return E===a.chain?!1:(x({v:2,chain:E},g.whenOf(D)),g.emit({effect:T.id,key:"chain",value:"move"}),!0)},v.getChain=function(){return a.chain.map(function(m){var w={id:m.id,type:m.type,name:Tb(m),bypass:m.bypass};if(m.plugin){var A=s[m.id]||0,T=!l(m)||A===5;w.plugin={id:m.plugin.id,version:m.plugin.version,url:m.plugin.url,name:m.plugin.name,status:T?"missing":A?"failed":"ready"},A&&!T&&(w.plugin.error=Rr[A]||Rr[2])}return w})},v.toAstrid=function(){return Rb(a)},v}function xc(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function $p(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(f){return r.toContextTime(f)}:t&&t.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(f){if(!o){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var y=o(l.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var y=l&&typeof l.bpm=="number"?l.bpm:xc(d,0);y>0&&e.setTempo(y);return}var $=xc(d,f);$>0&&e.setTempo($);for(var x=d&&(d.points||d.tempoPoints)||[],M=0;M<x.length;M++){var k=x[M];if(k.beat>f&&k.bpm>0){var m=c(k.beat);m!==void 0&&e.setTempo(k.bpm,m)}}}var h=typeof e.setBeat=="function";function b(){var f=l&&l.meter,y=f&&typeof f.beatsPerBar=="number"?f.beatsPerBar:0;h&&y>=1&&typeof e.setBar=="function"&&e.setBar(y)}function g(f){if(!(!o||typeof f!="number"||!isFinite(f))){var y=o(f);return typeof y=="number"&&isFinite(y)?y:void 0}}function v(){if(h){if(b(),!l||!l.running){e.freeRun();return}var f=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(f)&&e.setBeat(f,c(f))}}return p(),v(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?e.setTempo(f.bpm,c(f.atBeat)):f.kind==="snapshot"?(p(),v()):f.kind==="start"?(p(),h&&typeof f.beat=="number"&&isFinite(f.beat)&&(b(),e.setBeat(f.beat,g(f.at)))):f.kind==="stop"&&h&&e.freeRun(g(f.at)))})}const va="/studio/assets/worklet-CwdWwkqb.js",ty=1,ny="https://nc-perform-api.psemme.workers.dev",ay=128*1024,ry=Object.freeze({"netcomposer.synth":"/synth/","netcomposer.rhythm":"/rhythm/","netcomposer.bass":"/bass/","netcomposer.nyx":"/nyx/","netcomposer.calliope":"/calliope/"}),oy=80,iy=40,sy=/^[0-9a-z]{10}$/,ly=Object.freeze(["netcomposer.art","triki.art"]);function cy(e){if(typeof e!="string"||e.length>4096)return!1;try{const t=new URL(e);return t.protocol==="https:"&&ly.includes(t.hostname)}catch{return!1}}function Ep(e){if(!e||typeof e!="object"||Array.isArray(e))return"A link needs an object.";const t=e;return t.v!==ty?"Unknown link version.":t.kind!=="preset"?"Only presets can be shared.":typeof t.format!="string"||!Object.hasOwn(ry,t.format)?"That instrument can't be shared yet.":!("data"in t)||t.data===null||typeof t.data!="object"?"The preset is empty.":t.fv!==void 0&&(typeof t.fv!="number"||!Number.isFinite(t.fv))?"Bad format version.":t.name!==void 0&&(typeof t.name!="string"||t.name.length>oy)?"The name is too long.":t.by!==void 0&&(typeof t.by!="string"||t.by.length>iy)?"The author name is too long.":t.from!==void 0&&!cy(t.from)?"Bad remix link.":null}function dy(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),n=atob(t+"===".slice((t.length+3)%4)),a=new Uint8Array(n.length);for(let r=0;r<n.length;r++)a[r]=n.charCodeAt(r);return a}async function uy(e,t,n){const a=new Blob([e]).stream().pipeThrough(t).getReader(),r=[];let o=0;for(;;){const{done:d,value:u}=await a.read();if(d)break;if(o+=u.length,o>n)throw await a.cancel(),new Error("This link is too large.");r.push(u)}const s=new Uint8Array(o);let l=0;for(const d of r)s.set(d,l),l+=d.length;return s}async function py(e){try{if(typeof e!="string"||!/^[A-Za-z0-9_-]+$/.test(e))return null;const t=await uy(dy(e),new DecompressionStream("deflate"),ay),n=JSON.parse(new TextDecoder().decode(t));return Ep(n)?null:n}catch{return null}}function fy(e){const t=String(e||"").replace(/^#/,""),n=new URLSearchParams(t),a=n.get("p");if(a)return{kind:"inline",code:a};const r=n.get("s");return r&&sy.test(r)?{kind:"short",id:r}:null}async function hy(e,{api:t=ny,fetch:n=globalThis.fetch}={}){const a=fy(e);if(!a)return null;if(a.kind==="inline"){const s=await py(a.code);return s?{envelope:s,link:a}:{error:"This link is broken."}}let r;try{r=await n(`${t}/api/share/${a.id}`)}catch{return{error:"Couldn't reach the link service. Check your connection."}}if(r.status===404)return{error:"This link doesn't exist."};if(!r.ok)return{error:"Couldn't open this link."};const o=await r.json().catch(()=>null);return o&&!Ep(o)?{envelope:o,link:a}:{error:"This link is broken."}}const my={"netcomposer.synth":{type:"astrid-synth",brand:"ASTRID"},"netcomposer.rhythm":{type:"petra-rhythm",brand:"PETRA"},"netcomposer.bass":{type:"olive-bass",brand:"OLIVE"},"netcomposer.nyx":{type:"nyx",brand:"NYX"},"netcomposer.calliope":{type:"calliope",brand:"CALLIOPE"}};function Ap(e){const t=new URLSearchParams(String(e||"").replace(/^#/,""));if(!t.has("new"))return null;const n=t.get("p");if(n)return`#p=${n}`;const a=t.get("s");return a?`#s=${a}`:null}async function gy(e,t=hy){const n=Ap(e);if(!n)return null;const a=await t(n);if(!a)return{error:"This link is broken."};if("error"in a)return a;const r=my[a.envelope.format];return r?{type:r.type,envelope:a.envelope,name:a.envelope.name?.trim()||r.brand}:{error:"That instrument can't be added from a link yet."}}function by(e){return{format:e.format,...e.fv!==void 0?{v:e.fv}:{},data:e.data}}var yy="nc-ui",vy={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Bs={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},zr={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},wy={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ht={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ky={light:{color:vy.color,semantic:Bs,component:zr,runtime:wy},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Br=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],fa=e=>`--${yy}-${e}`,_r="data-nc-theme",Bi="nc-ui-theme-change",xy=Object.freeze(["system","light","dark"]),$y="netcomposer.studio.theme.v1",Ey="(prefers-color-scheme: dark)",Xn=e=>e?.documentElement??null,Sp=e=>e?.defaultView?.matchMedia?.(Ey)??null,_s=e=>e==="light"||e==="dark"?e:"system";function Ay(e=globalThis.document){return _s(Xn(e)?.getAttribute(_r))}function Pa(e=globalThis.document){let t=Ay(e);return t!=="system"?t:Sp(e)?.matches?"dark":"light"}function js(e,t=globalThis.document){let n=Xn(t);if(!n)return"light";let a=_s(e);a==="system"?n.removeAttribute(_r):n.setAttribute(_r,a);let r=Pa(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(Bi,{detail:{choice:a,theme:r}})),r}var jr="data-nc-skin",_i="data-nc-fill",Sy="nc-ui-look-change",qr=Br,Hn=(Br.find(e=>e.default)??Br[0])?.id??"prussian",My="netcomposer.studio.skin.v1",Ty="netcomposer.studio.fill.v1",Ra=e=>Br.some(t=>t.id===e)?e:Hn;function Mp(e=globalThis.document){return Ra(Xn(e)?.getAttribute(jr))}function Ly(e=globalThis.document){return Xn(e)?.hasAttribute(_i)??!1}function qs(e={},t=globalThis.document){let n=Xn(t);if(!n)return{skin:Hn,fill:!1};if("skin"in e){let o=Ra(e.skin);o===Hn?n.removeAttribute(jr):n.setAttribute(jr,o)}"fill"in e&&(e.fill?n.setAttribute(_i,""):n.removeAttribute(_i));let a={skin:Mp(t),fill:Ly(t)},r=t.defaultView?.CustomEvent;return r&&t.dispatchEvent(new r(Sy,{detail:a})),a}function Hs(e,t=globalThis.document){let n=Xn(t);if(!n)return()=>{};let a=()=>`${Pa(t)} ${Mp(t)}`,r=a(),o=()=>{let u=a();u!==r&&(r=u,e(Pa(t)))},s=t.defaultView?.MutationObserver,l=s?new s(o):null;l?.observe(n,{attributes:!0,attributeFilter:[_r,jr]});let d=Sp(t);return d?.addEventListener?.("change",o),t.addEventListener(Bi,o),()=>{l?.disconnect(),d?.removeEventListener?.("change",o),t.removeEventListener(Bi,o)}}var ji=Bs["label-on-fill-dark"],$c=Bs["label-on-fill-light"],Cy=Ht["label-min-contrast"],Iy=/^#[0-9a-f]{6}$/i,Ny=e=>typeof e=="string"&&Iy.test(e),$r=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Ec(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${$r(r(0)*255)}${$r(r(8)*255)}${$r(r(4)*255)}`}function Tp(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function Ac(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function qi(e,t){let[n,a]=[Ac(e),Ac(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var Hr=e=>qi(e,ji)>=qi(e,$c)?ji:$c;function Lp(e,t,n,a=Cy){let r=Ec(e,t,n),o=Hr(r)===ji?1:-1;for(let s=0;s<40&&qi(r,Hr(r))<a;s++)n+=o*.01,r=Ec(e,t,n);return r}function Fy(e){let{h:t,s:n}=Tp(e),a=Lp(t,Math.min(n,Ht["surprise-on-max-saturation"]),Ht["surprise-on-lightness"]);return{fill:e,ink:Hr(e),on:a,onInk:Hr(a)}}var Py=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Ry(e,t=Math.random){let[n,a]=Ht["surprise-saturation"],[r,o]=Ht["surprise-lightness"],s=Ht["surprise-min-hue-gap"],l=Ny(e)?Tp(e).h:null,d=t()*360;return l!==null&&Py(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),Lp(d,n+t()*(a-n),r+t()*(o-r))}function Dy(e){if(!e)return null;let t=Fy(e);return{[fa("surprise-fill")]:t.fill,[fa("surprise-ink")]:t.ink,[fa("surprise-on")]:t.on,[fa("surprise-on-ink")]:t.onInk}}var Oy=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,zy=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Sc(e){let[t,n,a]=[1,3,5].map(l=>Oy(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function By([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>$r(zy(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var _y=Ht["velocity-range"],Cp={min:zr.rhythm["velocity-min"],max:zr.rhythm["velocity-max"]},Mc=Object.fromEntries(Object.entries(ky).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function jy(e,t=Cp){let[n,a]=_y,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??zr.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Sc(t.min),d=Sc(t.max);return{velocity:r,t:o,fill:By(l.map((u,c)=>u+(d[c]-u)*o)),ink:s}}function Tc(e,t=Cp){return{[fa("velocity-fill")]:jy(e,t).fill}}var qy={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Hy={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","select-mark-h":"length","select-mark-inset":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Vy={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Uy={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Eo={};for(let[e,t]of Object.entries(Hy))Eo[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Uy))Eo[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Vy))Eo[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(qy.renames.map(e=>[e.old,e.new]));function Ip(e){let t=Eo[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function pe(e){return Ip(e).prop}function i(e){return`var(${pe(e)})`}function Gy(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(pe(t)));return Number.isFinite(n)?n:0}function Te(e,t){let n=Ip(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Np(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Ky(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Wy="[data-modulated], [data-modulated] *",Fp="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Zo(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Lc(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ei(e){return`  background-image: conic-gradient(from -45deg at 50% 100%, ${i(e)} 90deg, transparent 0);`}function Yy(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${pe("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${pe("divider")}: ${i(`module-div-stack-${a}`)};
      ${pe("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${pe("text-sub")}: ${i("module-sub-stack-1")};
      ${pe("divider")}: ${i("module-div-stack-1")};
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
${Wy} { transition: none; }
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
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; 2026-11-24: ASTRID's ▾, 8×4 px, 3 px in, on
   every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${ei("text-sub")}
  background-size: ${i("select-mark")} ${i("select-mark-h")};
  background-position: right ${i("select-mark-inset")} top 55%;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${ei("text")}
}
:is(.nc-select, .nc-dd):disabled {
${ei("divider")}
}
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
   ▶ while open, flipped to ◀ while folded (Peter, 2026-11-24, reversing 2026-10-31); the flip takes motion-press,
   and reduced motion makes it instant. −/+
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
  clip-path: polygon(0 0, 100% 50%, 0 100%);
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
  ${pe("text-sub")}: ${i("module-sub-stack-1")};
  ${pe("divider")}: ${i("module-div-stack-1")};
  ${pe("slider-track")}: ${i("module-div-stack-1")};
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
  ${pe("text-sub")}: ${i("module-sub-stack-1")};
  ${pe("divider")}: ${i("module-div-stack-1")};
  ${pe("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${pe("text-sub")}: ${i("module-sub-stack-1")};
  ${pe("divider")}: ${i("module-div-stack-1")};
  ${pe("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${pe("text-sub")}: inherit;
  ${pe("divider")}: inherit;
  ${pe("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${pe("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${pe("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
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
   ◀ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${pe("divider")}: ${i("strip-divider")}; }
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
${Lc("")}
}
@media (max-width: 1023px) {
${Lc("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Zo("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Zo("")}
}
@media (max-width: 1023px) {
${Zo("html[data-nc-landscape] ")}
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
`}var ti=null,Xy="nc-ui-fallback";function Pp(e=globalThis.document){if(!e?.documentElement||(e.documentElement,ti&&ti.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Xy} {
${Yy()}
}
`,e.head.append(t),ti=t}var sa=null,Jy=0,Qy=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Rp=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Qy,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Rp(document);function pt(e){return Dp(e).then(t=>!!t.ok)}function Dp({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:o="Cancel",danger:s=!1,root:l,returnFocus:d,signal:u},c){if(sa||u?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,h=Rp(p),b=l??p.body,g=p.defaultView??globalThis,v=`nc-ui-confirm-${++Jy}`,f=(X,Ae,Se)=>{let tt=p.createElement(X);return tt.className=`nc-ui-confirm${Ae}`,Se!=null&&(tt.textContent=Se),tt},y=f("div","-layer");y.dataset.state="enter";let $=f("div","");$.setAttribute("role","alertdialog"),$.setAttribute("aria-modal","true"),$.setAttribute("aria-labelledby",`${v}-t`);let x=f("h2","-title",e);x.id=`${v}-t`;let M=f("p","-body",t);M.id=`${v}-b`;let k=n.map((X,Ae)=>{let Se=f("p","-body",X?.text??X);return Se.id=`${v}-b${Ae}`,X?.tone==="danger"&&(Se.dataset.tone="danger"),Se});$.setAttribute("aria-describedby",[M,...k].map(X=>X.id).join(" "));let m=a&&f("button","-extra",a.label);m&&(m.type="button",m.dataset.ncConfirm="extra",m.addEventListener("click",()=>a.onAction?.()));let w=f("div","-actions"),A=(X,Ae)=>{let Se=f("button","-btn",X);return Se.type="button",Se.dataset.ncConfirm=Ae,Se.addEventListener("click",()=>ke(Ae==="ok")),Se},T=A(o,"cancel"),D=A(r,"ok");s&&(D.dataset.danger="true"),w.append(T,D);let[E,S]=c?.(f,D)??[];$.append(x,M,...k,...E?[E]:[],...m?[m]:[],w);let C=[S,m,T,D].filter(Boolean);y.append($);let N={layer:y};sa=N;let F=d??p.activeElement,U=[];for(let X of b.children)X.hasAttribute("inert")||(X.setAttribute("inert",""),U.push(X));let R=()=>{if(sa!==N)return;b.append(y),(S??T).focus({preventScroll:!0});let X=g.requestAnimationFrame?.bind(g)??(Ae=>setTimeout(Ae,16));X(()=>X(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};h?h.then(R):R();let B=!1;y.addEventListener("pointerdown",X=>{B=X.target===y}),y.addEventListener("click",X=>{X.target===y&&B&&ke(!1),B=!1});let _=X=>{if(X.stopImmediatePropagation(),X.key==="Escape")X.preventDefault(),ke(!1);else if(X.key==="Tab"){X.preventDefault();let Ae=C.filter(tt=>!tt.disabled),Se=Ae.length;Ae[(Ae.indexOf(p.activeElement)+(X.shiftKey?Se-1:1))%Se].focus()}else X.key==="Enter"&&(X.preventDefault(),p.activeElement===m?m.click():p.activeElement===T?ke(!1):D.disabled||ke(!0))},G=X=>X.stopImmediatePropagation();g.addEventListener("keydown",_,!0),g.addEventListener("keyup",G,!0);let de=()=>ke(!1);u?.addEventListener("abort",de);let oe,Ee=new Promise(X=>{oe=X});function ke(X){if(sa!==N)return;sa=null,g.removeEventListener("keydown",_,!0),g.removeEventListener("keyup",G,!0),u?.removeEventListener("abort",de);for(let yt of U)yt.removeAttribute("inert");y.dataset.state="closing",F?.isConnected&&typeof F.focus=="function"&&F.focus({preventScroll:!0});let Ae=g.getComputedStyle?.(y),Se=Math.max(0,...String(Ae?.transitionDuration??"").split(",").map(yt=>Number.parseFloat(yt)*(yt.trim().endsWith("ms")?1:1e3)||0)),tt=()=>y.remove();y.addEventListener("transitionend",yt=>yt.target===y&&tt()),setTimeout(tt,Se+50),oe({ok:X,value:S?.value.trim()})}return Ee}function Zy(e){let t=e.field??{};return Dp(e,(n,a)=>{let r=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),o),[r,o]}).then(n=>n.ok?n.value:null)}function Vs(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Op=new WeakMap,Cc=.25;function e0(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=f=>Math.min(1,Math.max(0,f)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let y=u(f);y!==o&&(o=y,c(),l?.(y))},h=0,b=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let y=n.getBoundingClientRect();f.target!==r&&y.height>0&&p(1-(f.clientY-y.top)/y.height),h=f.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!b)return;let y=n.getBoundingClientRect().height||1,$=(h-f.clientY)/y*(f.shiftKey?Cc:1);h=f.clientY,p(o+$)});let g=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",f=>{f.preventDefault(),d?.()}),n.addEventListener("keydown",f=>{let y=f.shiftKey?s*Cc:s,$={ArrowUp:o+y,ArrowRight:o+y,ArrowDown:o-y,ArrowLeft:o-y,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in $&&(f.preventDefault(),p($[f.key]))});let v={el:n,get value(){return o},get dragging(){return b},set(f){b||(o=u(Number(f)||0),c())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(d=f.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),Op.set(n,v),v}function t0(e){return Op.get(e)}var zp=new WeakMap,n0=.2,a0=1.5,r0=.5;function o0(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Ic(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:o0(a.getComputedStyle(e).getPropertyValue(pe(t)),n)}function i0(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let v=0;v<n;v++){let f=t.createElement("span");f.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let $=t.createElement("span");$.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",f.append(y,$,x),o.append(f),s.push({peak:y,rms:$,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,h=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},b=(v,f,y,$)=>{let x=Math.round($*1e3)/1e3;y[f]!==x&&(y[f]=x,v.style.transform=f==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};r.addEventListener("click",()=>{g.clear(),d?.()});let g={el:a,get clipped(){return u},update(v,f){c<0&&(c=Ic(a,"motion-meter-fall",n0)),p<0&&(p=Ic(a,"motion-meter-hold",a0));let y=Math.max(0,Math.min(.25,Number(f)||0)),$=c>0?Math.exp(-y/c):0;s.forEach((x,M)=>{let k=v[M]??v[0]??{peak:0,rms:0},m=Math.min(1,Math.max(0,Number(k.peak)||0)),w=Math.min(m,Math.max(0,Number(k.rms)||0));k.over&&g.clip(),x.level.peak=m>=x.level.peak?m:m+(x.level.peak-m)*$,x.level.rms=w>=x.level.rms?w:w+(x.level.rms-w)*$,x.holdAge+=y,m>=x.holdAt?(x.holdAt=m,x.holdAge=0):x.holdAge>p&&(x.holdAt=Math.max(m,x.holdAt-r0*y)),b(x.peak,"peak",x.shown,x.level.peak),b(x.rms,"rms",x.shown,x.level.rms),b(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,h())},clear(){u=!1,h()},reset(){for(let v of s)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,b(v.peak,"peak",v.shown,0),b(v.rms,"rms",v.shown,0),b(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,h()},configure(v){v.onClear&&(d=v.onClear)}};return h(),g.reset(),zp.set(a,g),g}function Bp(e){return e?zp.get(e):void 0}var s0=3,l0=new Set(["freq","q","rate","time","log"]);function Us(e,t,n){return!e||!l0.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ao(e,t,n){return Us(e,t,n)!=="linear"}function Vr(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=Us(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function _p(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=Us(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**s0:r)}function jp(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function Gs(e,t,n,a){return Math.round(Vr(e,t,n,a)*1e3)}function Hi(e,t,n,a,r){return jp(_p(e,t,n,Number(a)/1e3),t,n,r)}function c0(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function qp(e,t,n,a,r,o=!1,s){let l=Gs(e,t,n,a),d=c0(l,r,o);if(d===null)return null;let u=Hi(e,t,n,d,s),c=Math.sign(d-l),p=jp(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=Hi(e,t,n,d,s);return u}function Nc(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Fc(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function d0(e,t,n,a=n/6){let r=e.some(c=>c===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+Fc(t[h]),0),l=s>0?o/s:0,d=e.map(c=>c===null?0:Math.min(o,Fc(c)*l));if(r){let c=d.reduce((h,b)=>h+b,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function u0(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Dt(e){return Math.max(0,Math.min(1,e))}function Hp(e,t){let{ctx:n,w:a,h:r}=u0(e);if(!n)return;n.clearRect(0,0,a,r);let o=Ky(e);if(t.paint==="swatch"){let d=Te(e,"accent"),u=Te(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){h0(n,a,r,t,e,o);return}if(t.paint==="filter"){let d=t.mode??"lp",u=Te(e,Np(d)),c=Te(e,"divider"),p=Dt(t.cutoff??.5),h=.08+(1-Dt(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let b=0;b<=a;b++){let g=b/Math.max(1,a),v=0;d==="lp"?v=g<p?1:Math.max(0,1-(g-p)/h):d==="hp"?v=g>p?1:Math.max(0,1-(p-g)/h):v=Math.max(0,1-Math.abs(g-p)/h);let f=r*.78-v*r*.62;b===0?n.moveTo(b,f):n.lineTo(b,f)}n.strokeStyle=u,n.stroke(),n.fillStyle=Te(e,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=Te(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,h]=d0([d,u],t.max??[1,4],a),b=2,g=r-1;n.beginPath(),n.moveTo(c,g),n.lineTo(p,b);let v=Math.max(1,Math.ceil(h-p));for(let f=1;f<=v;f++){let y=f/v;n.lineTo(p+(h-p)*y,g-(g-b)*Math.exp(-4.6*y)*(1-y*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=Te(e,"accent"),h=Te(e,"text-sub"),b=r/2;n.fillStyle=Te(e,"accent-soft"),n.fillRect(Dt(u)*a,0,(Dt(c)-Dt(u))*a,r),n.strokeStyle=Te(e,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(a,b),n.stroke();let g=Math.floor(d.length/2);for(let v=0;v<g;v++){let f=(v+.5)/g*a,y=Math.max(-1,Math.min(1,d[v*2]??0)),$=Math.max(-1,Math.min(1,d[v*2+1]??0)),x=(v+.5)/g;n.strokeStyle=x>=u&&x<=c?p:h,n.beginPath(),n.moveTo(f,b-$*(b-1)),n.lineTo(f,b-y*(b-1)+.5),n.stroke()}n.strokeStyle=p;for(let v of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(Dt(v)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Te(e,"text"),n.fillRect(Math.round(Dt(t.position)*(a-1)),0,1,r)),g||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,b+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=Dt(t.level??0);n.fillStyle=Te(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=Te(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=Te(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=Te(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=Te(e,"accent")}var wa=20,Vi=2e4,ni=24,Pc=-60;function p0(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,b=1-l,g=2*Math.PI*a/r,v=(x,M,k)=>x+M*Math.cos(g)+k*Math.cos(2*g),f=(x,M)=>-(x*Math.sin(g)+M*Math.sin(2*g)),y=Math.hypot(v(d,u,c),f(u,c)),$=Math.hypot(v(p,h,b),f(h,b));return $>0?y/$:0}function f0(e,t){return Math.log(Math.max(wa,Math.min(Vi,e))/wa)/Math.log(Vi/wa)*t}function Rc(e,t,n){let a=Math.max(Pc,Math.min(ni,e));return t+(ni-a)/(ni-Pc)*(n-t)}function h0(e,t,n,a,r,o){let s=a.mode??"lp",l=Te(r,Np(s)),d=Te(r,"divider"),u=Te(r,"text-sub"),c=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),b=a.q??Math.SQRT1_2,g=Math.round(Rc(0,p,h))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let f=wa*(Vi/wa)**(v/Math.max(1,t)),y=a.open?1:p0(s,a.hz,b,f,a.sampleRate),$=Rc(20*Math.log10(Math.max(1e-5,y)),p,h);v===0?e.moveTo(v,$):e.lineTo(v,$)}if(e.strokeStyle=l,e.stroke(),!a.open){let v=Math.round(f0(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,p),e.lineTo(v,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function ct(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function m0(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var hn=20,Ka=2e4,Ks=Math.log(Ka/hn),Ui=32,g0=250,b0=-100,y0=1200,v0=4.5,Dc=-6,sn=-96,w0=48,Oc=[100,1e3,1e4],k0=[6,12];function Fn(e,t){return Math.log(Math.max(hn,Math.min(Ka,e))/hn)/Ks*t}function Er(e,t){return hn*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ks)}function Vt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function Gi(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Vp=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function x0(e,t,n,a){let r=n?3:1,o=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??hn,Math.min(e.maxHz??Ka,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ws(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function $0(e,t,n,a,r,o,s,l,d){let u=d?.25:1,c={},p=Math.max(1,o/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/Ws(e))),e.moveHz){let h=t.hz*Math.exp(n*u/Math.max(1,r)*Ks);c.hz=Math.max(e.minHz??hn,Math.min(e.maxHz??Ka,h))}return c}function E0(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),d=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var Ne=new WeakMap;function A0(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let d of e.bands)a.append(S0(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!Xp(n)||d.button>0)return;let u=Yp(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),Ne.set(n,{control:e,cache:null,spec:null,active:null}),Gp(n,e),n}function Up(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function S0(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},o=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=o();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",Ot(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=o(),h=Ne.get(e);if(!c||!p||!h?.box)return;let{w:b,h:g,pad:v}=h.box;c.onBand(p.id,$0(p,s.start,u.clientX-s.x,u.clientY-s.y,b,g,c.range??18,v,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ot(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=o();if(!c||!p)return;let h=x0(p,u.key,u.shiftKey,c.range??18);h&&(u.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),Ot(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=o();if(!c||!p?.moveQ)return;u.preventDefault();let h=u.timeStamp;(!d||h-d.t>400)&&(d={q:p.q,t:h});let b=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-b/240))),d.t=h,c.onBand(p.id,{q:d.q}),Ot(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ot(e,t.id)),a.addEventListener("focus",()=>Ot(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ot(e,null)}),a.addEventListener("blur",()=>{s||Ot(e,null)}),a}function Ot(e,t){let n=Ne.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Vn(e):Ys(e)}function Ys(e){let t=Ne.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,Vp(a.db)];a.kind==="peak"?r.push(Gi(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${Gi(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(M0(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,d=Fn(a.hz,o),u=Vt(a.db*Ws(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-c,d-c/2)),b=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(b)}px`}function M0(e,t){return e.bands.indexOf(t)%3+1}function Gp(e,t){let n=Ne.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Xs(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=Up(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${Vp(r.db)}, ${Gi(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Vn(e),F0(e)}function Kp(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Wp(e){return{curve:ct(e,"eq-curve"),fill:ct(e,"eq-fill"),quiet:ct(e,"text-sub"),grid:ct(e,"eq-grid"),zero:ct(e,"divider"),label:ct(e,"text-sub"),spectrum:ct(e,"eq-spectrum"),bands:[ct(e,"eq-band-1"),ct(e,"eq-band-2"),ct(e,"eq-band-3")]}}function T0(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Vn(e){Ne.has(e)&&Xs(e);let t=Ne.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=Kp(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:o,h:s,pad:l},t.colours=Wp(e);let u=t.colours,c=T0(a,o);if(!t.cache||t.cache.key!==c){let M=Math.max(64,Math.ceil(o)+1),k=new Float64Array(M);for(let w=0;w<M;w++)k[w]=Er(w/(M-1)*o,o);let m=null;try{m=typeof a.response=="function"?a.response(k):null}catch{m=null}t.cache={key:c,freqs:k,total:m?.total??new Float64Array(M),bands:m?.bands??[]}}r.clearRect(0,0,o,s);let p=m0(e),h=a.on!==!1;L0(r,o,s,d,l,u,p);let{freqs:b,total:g,bands:v}=t.cache,f=Array.from(b,M=>Fn(M,o)),y=Vt(0,s,d,l);v.forEach((M,k)=>{if(!M||!M.some(A=>Math.abs(A)>.05))return;let m=h?u.bands[k%3]:u.quiet,w=Array.from(M,A=>Vt(A,s,d,l));r.save(),t.active&&a.bands[k]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=m,zc(r,f,w,y)),r.globalAlpha=h?.75:.4,r.strokeStyle=m,r.lineWidth=.75,ai(r,f,w),r.restore()});let $=Array.from(g,M=>Vt(M,s,d,l)),x=h?u.curve:u.quiet;r.save(),r.fillStyle=h?u.fill:u.quiet,r.globalAlpha=h?.2:.08,zc(r,f,$,y),r.restore(),r.save(),r.strokeStyle=h?u.fill:x,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,ai(r,f,$)),r.globalAlpha=1,r.strokeStyle=x,r.lineWidth=1.25,ai(r,f,$),r.restore(),C0(e),Ys(e)}function L0(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<hn||c>Ka)continue;let p=Math.round(Fn(c,t))+.5;e.globalAlpha=Oc.includes(c)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of k0)if(!(d>a))for(let u of[1,-1]){let c=Math.round(Vt(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(Vt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Oc){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=Fn(d,t)+3;e.fillText(u,p+c+2>t?Fn(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=Vt(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function Ur(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function ai(e,t,n){e.beginPath(),Ur(e,t,n),e.stroke()}function zc(e,t,n,a){e.beginPath(),Ur(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Yp(e){return e.closest("[data-nc-maxable]")}function Xp(e){let t=Yp(e);return!!t&&!t.hasAttribute("data-nc-max")}function Xs(e){let t=Xp(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=Ne.get(e);n?.active&&(n.active=null,Ys(e))}return t}function C0(e){Xs(e);let t=Ne.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=Up(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Fn(s.hz,n).toFixed(1)}px`,l.style.top=`${Vt(s.db*Ws(s),a,o,r).toFixed(1)}px`)}}function I0(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=Er(u,t),h=Er(c,t),b=Er(d/(e-1)*t,t);o[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,h/r),l[d]=v0*Math.log2(b/1e3)}return{lo:o,hi:s,tilt:l}}function N0(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function F0(e){let t=Ne.get(e);if(t){if(!t.control.spectrum){Qp(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=Ne.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),Ki(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Ki(e)}}function Ki(e){let t=Ne.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Jp(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Wi(e),n.onVis||(n.onVis=()=>Ki(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Yi(e,!1)}function Wi(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Yi(e,t){let n=Ne.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ri(e,Wi(e))),g0):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,ri(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,ri(e,Wi(e))),Ui))}function Jp(e){let t=Ne.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Qp(e){let t=Ne.get(e)?.spec;if(!t)return;Jp(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=Ne.get(e);n&&(n.spec=null)}function ri(e,t){let n=Ne.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Qp(e);return}if(!a.analyser)return;if(t-a.last<Ui-4&&!a.idle){Yi(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):Ui/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=Kp(o);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...I0(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=w0*r,{lo:b,hi:g,tilt:v}=a.map;for(let y=0;y<u;y++){let $=N0(a.buf,b[y],g[y]);$>p&&(p=$);let x=$+v[y],M=a.disp[y]-h;a.disp[y]=x>M?x:M}p>b0&&(a.loud=t);let f=t-a.loud>y0;s.clearRect(0,0,l,d),(!f||a.disp.some(y=>y>sn))&&P0(s,l,d,a.disp,n.colours??Wp(e)),a.idle=f&&!a.disp.some(y=>y>sn),Yi(e,a.idle)}function P0(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),d=u=>{let c=a[Math.max(0,Math.min(o-1,u))];return Number.isFinite(c)?c:sn};for(let u=0;u<o;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(sn,Math.min(Dc,Number.isFinite(c)?c:sn))-sn)/(Dc-sn);s[u]=u/(o-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Ur(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Ur(e,s,l),e.stroke(),e.restore()}var et=new WeakMap,Zp=450,R0=6,D0=33,oi=24,O0="http://www.w3.org/2000/svg";function z0(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function B0(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function _0(e,t,n,a,r){let o=e.slice();if(t===a)return o[a]=r,o;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let d=(l-t)/(a-t);o[l]=Math.round((n+(r-n)*d)*100)/100}return o}function j0(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function ln(e,t){let n=document.createElementNS(O0,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function ef(e){let t=ln("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(ln("path",{d:e})),t}function q0(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,o,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return et.set(n,d),V0(n,a),U0(n,s),tf(n,e),n}function rt(e){let t=et.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function H0(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function ii(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=H0(e);return{i:B0(t.clientX,a),level:z0(t.clientY-n.top,n.height)}}function V0(e,t){let n=et.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let s=rt(e);if(!s||o.button>0||!s.steps.length)return;o.preventDefault(),Gr(e),t.setPointerCapture?.(o.pointerId);let l=ii(t,o),d=s.steps.map(u=>u.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Bc(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let u=n.drag;!u||u.moved||(u.long=!0,rt(e)?.onLevels(u.start.slice(),!0),si(e,u.i))},Zp)}),t.addEventListener("pointermove",o=>{let s=n.drag;if(!s||s.id!==o.pointerId||s.long||!s.moved&&Math.hypot(o.clientX-s.x,o.clientY-s.y)<R0)return;s.moved=!0,a();let l=ii(t,o);Bc(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),s.long||rt(e)?.onLevels(s.levels.slice(),!0),Xi(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",o=>{let s=n.drag;!s||s.id!==o.pointerId||(a(),n.drag=null,s.long||rt(e)?.onLevels(s.start.slice(),!0),Xi(e,-1))}),t.addEventListener("contextmenu",o=>{rt(e)?.onShape&&(o.preventDefault(),si(e,ii(t,o).i))}),t.addEventListener("keydown",o=>{let s=rt(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),u=s.steps[d].level,c=p=>{let h=s.steps.map(b=>b.level);h[d]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(h,!0)};switch(o.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":c(u+(o.shiftKey?.01:.05));break;case"ArrowDown":c(u-(o.shiftKey?.01:.05));break;case"PageUp":c(u+.25);break;case"PageDown":c(u-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;si(e,d);break;default:return}o.preventDefault(),Ji(e)}),t.addEventListener("focus",()=>Ji(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Bc(e,t,n,a,r,o){let s=et.get(e).drag;s&&(s.levels=_0(s.levels,t,n,a,r),Xi(e,a,s.levels[a]),rt(e)?.onLevels(s.levels.slice(),o))}function Xi(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Ji(e){let t=et.get(e),n=e.querySelector(".nc-lsteps-plot"),a=rt(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",j0(a,r))}function U0(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Gr(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),et.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Gr(e)}}function si(e,t){let n=rt(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let o=et.get(e);o.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let b of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===b.value?"true":"false"),b.icon&&g.append(ef(b.icon)),g.append(document.createTextNode(b.label)),g.addEventListener("click",()=>{rt(e)?.onShape?.(t,b.value),Gr(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),u=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=u?u.left+u.width/2-d.left:0,h=Math.max(0,Math.min(d.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Gr(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",et.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function G0(e,t){let n=et.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let o=0;o<t;o++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(o),o%4===0&&o>0&&(s.dataset.beat="true");let l=ln("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(ln("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),ln("path",{class:"nc-lsteps-env",d:""}),ln("path",{class:"nc-lsteps-top",d:""}),ln("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let d=document.createElement("span");o%4===0&&(d.textContent=String(o+1)),o%4===0&&o>0&&(d.dataset.beat="true"),r.append(d)}}}function tf(e,t){let n=et.get(e);if(!n)return;n.control=t;let a=t.steps.length;G0(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((b,g)=>{let v=s[g];if(!v)return;let f=String((g%2?1-o:o)*2);v.style.setProperty("--nc-lsteps-grow",f),l[g]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&g>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=b.level<=0?"true":"false";let y=Math.max(0,Math.min(1,b.level)),$=v.querySelector(".nc-lsteps-level");$.setAttribute("y",String(100-y*100)),$.setAttribute("height",String(y*100));let x=t.curve?t.curve(g,oi):null,M="M0 100",k="";for(let m=0;m<=oi;m++){let w=x?Math.max(0,Math.min(1,x[m]??y)):y,A=m/oi*100,T=100-w*100;M+=` L${A.toFixed(2)} ${T.toFixed(2)}`,k+=`${m?" L":"M"}${A.toFixed(2)} ${T.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${M} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",k)});let d=e.querySelector(".nc-lsteps-shapes"),u=(t.shapes??[]).map(b=>`${b.value}:${b.label}`).join();if(u!==n.shapeKey){n.shapeKey=u,d.textContent="";for(let b of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(b.value),b.icon&&g.append(ef(b.icon)),g.append(document.createTextNode(b.label)),g.addEventListener("click",()=>rt(e)?.onShapeAll?.(b.value)),d.append(g)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,h=t.steps.slice(0,c).every(b=>b.shape===p);for(let b of d.querySelectorAll(".nc-lsteps-shape")){let g=h&&b.dataset.shape===String(p);b.setAttribute("aria-selected",g?"true":"false"),b.tabIndex=g||!h&&b===d.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Ji(e),n.last=-2,K0(e)}function K0(e){let t=et.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&li(e,null);return}let a=0,r=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){li(e,null);return}o-a>=D0&&(a=o,li(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function li(e,t){let n=et.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=r?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var W0=.8912509381337456,Qi=32,Y0=250,X0=1200,J0=.2,nf=1.5;function Q0(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Z0(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Kr=new WeakMap,_c=new WeakMap;function jc(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function ev(e){let t=_c.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=Kr.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),ka(s))}Tn(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)ka(r);Tn(t)}),_c.set(e,t),t}var af=e=>e.els.some(t=>t.isConnected);function tv(e){if(!e.loop.io)return af(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ka(e){let t=!e.dead&&!!e.source&&tv(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Js(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ts(e))}function Js(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Tn(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){rf(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Js(e)),!e.raf&&!e.timer&&Zi(e,!1)}function Zi(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>qc(e,Js(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Y0):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,qc(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Qi)}function rf(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function qc(e,t){if(t-e.last<Qi-4&&!e.idle&&e.last){Zi(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Qi/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!af(o)){(o.placed||e.frames-o.born>90)&&of(o);continue}o.placed=!0,o.open&&(r=!0,nv(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){rf(e);return}e.idle=t-e.loud>X0&&!a,Zi(e,e.idle)}function nv(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=jc(h,"motion-meter-fall",J0),e.hold=jc(h,"motion-meter-hold",nf)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let h of e.els)h.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[o,l],p=!1;for(let h=0;h<2;h++){let b=Q0(c[h]);b>0&&(p=!0),e.disp[h]=b>=e.disp[h]?b:b+(e.disp[h]-b)*u,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=W0&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;es(e,h,e.disp[h],g)}return p}function es(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function ts(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,es(e,0,0,!1),es(e,1,0,!1)}function of(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Kr.get(t)===e&&Kr.delete(t)}function av(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=ev(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:nf,rows:""};for(let s of n)Kr.set(s,o),r.io?.observe(s);if(r.recs.add(o),ts(o),!r.io){let s=a.defaultView,l=()=>{ka(o),Tn(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){ka(o),Tn(r);return}o.open&&(o.open=!1,o.source?.close?.(),ts(o)),o.source=l,ka(o),Tn(r)}},destroy(){o.dead||of(o),Tn(r)}}}var sf={slop:8,longPressMs:500,pitchPx:16},rv=class{constructor(t,n,a=sf){this.hit=t,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,n,a,r){if(this.phase!=="idle")return!1;let o=this.hit(n,a);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=n,this.y0=a,this.t0=r,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,n,a,r){if(t!==this.pointer)return;let o=n-this.x0,s=a-this.y0;if(this.phase==="pending"){if(this.tick(r),this.phase!=="pending"||Math.hypot(o,s)<this.config.slop)return;Math.abs(s)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-s/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(t,n,a,r){t===this.pointer&&(this.phase==="pending"&&this.move(t,n,a,r),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function ov(e,t,n,a=sf){let r=!1,o=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),h=[...e.querySelectorAll(t)],b=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(b>=0)return b;let g=-1,v=Number.POSITIVE_INFINITY;return h.forEach((f,y)=>{if(f.hidden)return;let $=f.getBoundingClientRect();if(c<$.top||c>$.bottom)return;let x=Math.abs(u-($.left+$.width/2));x<v&&x<=$.width&&(g=y,v=x)}),g},l=new rv(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var lf="netcomposer.groups.v1";function Qs(){try{return globalThis.localStorage??null}catch{return null}}function cf(e=Qs(),t=lf){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function iv(e,t,n,a=lf){let r=cf(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function sv(e,t=Qs()){return cf(t).get(e.id)??e.open===!0}function lv(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";iv(Qs(),e.id,u),ns(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),df(a,e),ns(a,sv(e)),uf(a,e),a}function ns(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function df(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function uf(e,t){df(e,t)&&ns(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var lr="application/x-nc-pad",Hc="http://www.w3.org/2000/svg";function cv(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function dv(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(uv(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Ar(n)}),ff(n,e),n}function uv(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Hc,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(Hc,"path");return d.append(u),a.append(r,o,s,l,d),fv(e,a,t,n),o.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&pf(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(lr,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(lr)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(lr)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(lr);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let g=Number(h);g!==t&&p.onMove?.(g,t,c.altKey);return}let b=c.dataTransfer?.files?.[0];b&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,b))}),a}function pv(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function fv(e,t,n,a){let r=0,o=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;o=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=Vc(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),o=Vc(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}pv(e,n,a)})}function Vc(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Ar(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Ar(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Ar(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?pf(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function pf(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),o.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function Ar(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function ff(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),d=o.querySelector(".nc-padgrid-pad-wave path"),u=o.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),d?.setAttribute("d",cv(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let c=t.selected===r;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function He(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function So(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function Uc(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Da(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var hv=450,Gc=8;function ft(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function mv(e){let t=Gy(e,"target-min");return t>0?t:44}function gv(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=mv(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,h=u-a,b=u+a;for(let g=0;g<t.length;g++){if(o===g)continue;let v=r[g];if(!v||v.width===0)continue;let f=v.left+v.width/2,y=v.top+v.height/2;Math.abs(y-u)<a*2&&(f>d?p=Math.min(p,(d+f)/2):f<d&&(c=Math.max(c,(d+f)/2))),Math.abs(f-d)<a*2&&(y>u?b=Math.min(b,(u+y)/2):y<u&&(h=Math.max(h,(u+y)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),b=Math.max(b,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,b-h)}px`,s.style.transform="none"}}function hf(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Kc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function pn(e,t){switch(e.type){case"slider":return bv(e,t);case"select":return vv(e,t);case"toggle":return wv(e,t);case"button":return kv(e,t);case"readout":return xv(e);case"label":return Sv(e);case"note":return Wc(e);case"knob":return Lv(e,t);case"choice":return Cv(e,t);case"slotRow":return Iv(e,t);case"stepGrid":return Rv(e,t);case"canvas":return Bv(e);case"fx":return Wv(e,t);case"eqGraph":return A0(e,t);case"levelSteps":return q0(e,t);case"group":return lv(e,t,pn);case"strip":return _v(e,t);case"stripAdd":return Vv(e,t);case"padGrid":return dv(e,t);case"moves":return Ev(e,t);default:return Wc({id:"unknown",text:""})}}function it(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,bf(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(mf(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Da(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Uc(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Uc(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Ut(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Mv(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Da(t.value))}else if(t.type==="choice")yf(e,t);else if(t.type==="slotRow")wf(e,t);else if(t.type==="stepGrid")rs(e,t);else if(t.type==="padGrid")ff(e,t);else if(t.type==="moves")gf(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Hp(n,t)}else if(t.type==="eqGraph")Gp(e,t);else if(t.type==="levelSteps")tf(e,t);else if(t.type==="strip"){Ef(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${fn(n.id)}"]`);a instanceof Element&&it(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")xf(e,t);else if(t.type==="group"){uf(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${fn(n.id)}"]`);a instanceof Element&&it(a,n)}}else if(t.type==="fx"){Ff(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${fn(n.id)}"]`);a instanceof Element&&it(a,n)}}}}function bv(e,t){let n=So(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=Ao(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(mf(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?Hi(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=qp(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(Gs(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(yv(e,a,t),s),n.append(He()),it(n,e),n}function mf(e){return Ao(e.taper,e.min,e.max)?Gs(e.taper,e.min,e.max,e.value):e.value}function yv(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ft());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function vv(e,t){let n=So(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,He()),n}function wv(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(He()),it(n,e),n}function kv(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(He()),it(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=hf(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&kf(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function xv(e){let t=So(e.id,e.label);return t.append(He()),it(t,e),t}var $v=450;function Ev(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Av(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(o,s),n.append(r)}return gf(n,e),n}function gf(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${fn(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Av(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Sv(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(He()),t}function Wc(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(He()),t}function Yc(e){if(typeof e.valueText=="string")return e.valueText;let t=Da(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function bf(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Mv(e,t){let n=Vr(t.taper,t.min,t.max,t.value);bf(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Vr(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Yc(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Yc(t)}`}function Tv(e,t){if(Ao(e.taper,e.min,e.max))return qp(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Lv(e,t){let n=So(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",u=>{o=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(Ao(c.taper,c.min,c.max)){let b=Vr(c.taper,c.min,c.max,s)-(u.clientY-o)/120;c.onChange(_p(c.taper,c.min,c.max,b));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(u.clientY-o)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=Tv(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(He()),it(n,e),n}function Cv(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(o.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(He()),yf(n,e),n}function yf(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Iv(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(c),b.textContent=p.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(b,ft()),Nv(h,b,n,c,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=hf(),r.append(ft()),r.addEventListener("click",()=>{kf(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,o,He()),vf(n,t),wf(n,e),n}function Xc(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;ha(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function Nv(e,t,n,a,r){let o=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},b=y=>{let $=y.clientX-s,x=y.clientY-l;$*$+x*x>Gc*Gc&&(d=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",f))},v=y=>{let $=o!==0&&!d&&!u;h(),g(),$&&(c=!0,Xc(n,a,r,y))},f=()=>{d=!0,h(),g()};e.addEventListener("pointerdown",y=>{y.button===0&&(g(),u=!1,d=!1,c=!1,s=y.clientX,l=y.clientY,h(),o=window.setTimeout(()=>{o=0,!d&&(u=!0,Fv(n,t,a,r))},hv),p=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(c||u||d){c=!1,u=!1,d=!1;return}Xc(n,a,r,y)})}function vf(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Jc("Save","store"),r=Jc("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),ha(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),ha(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),ha(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&ha(e)})}function Jc(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Fv(e,t,n,a){vf(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function ha(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function wf(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function kf(e){let t=e.dataset.ncLastFill||null,n=Ry(t);e.dataset.ncLastFill=n;let a=Dy(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function Pv(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Rv(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=f=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=f,a.append(y),y},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let y of[o,s]){let $=y===f;y.setAttribute("aria-checked",$?"true":"false"),y.tabIndex=$?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let y=s.getAttribute("aria-checked")==="true"?o:s;l(y),y.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(Pv(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.onClear?.()}),d.append(f)}n.append(d);for(let f of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let $=document.createElement("button");$.type="button",$.className="nc-name",$.textContent=f.label,$.setAttribute("aria-label",`Select ${f.label}`),f.lane&&($.dataset.ncLane=String((f.lane-1)%4+1));let x=!1,M=0;$.addEventListener("pointerdown",w=>{x=!1,!(w.pointerType==="mouse"||w.button!==0)&&(M=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(x=!0,A.onSelectRow?.(A.rows.findIndex(T=>T.id===f.id),!0))},$v))});for(let w of["pointerup","pointercancel","pointerleave"])$.addEventListener(w,()=>window.clearTimeout(M));$.addEventListener("contextmenu",w=>{x&&w.preventDefault()}),$.addEventListener("click",w=>{let A=t(n);if(A?.type!=="stepGrid")return;if(x){x=!1;return}let T=A.rows.findIndex(E=>E.id===f.id),D=!!A.selectedRows&&(w.shiftKey||w.metaKey||w.ctrlKey);A.onSelectRow?.(T,D)}),$.addEventListener("keydown",w=>Dv(n,$,w));let k=[];for(let w of["mute","solo"]){if(!(w==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=w,T.textContent=w==="mute"?"M":"S",T.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${f.label}`),A.append(T,ft()),A.addEventListener("click",()=>{let D=t(n);if(D?.type!=="stepGrid")return;let E=D.rows.findIndex(S=>S.id===f.id);(w==="mute"?D.onMute:D.onSolo)?.(E)}),k.push(A)}let m=document.createElement("div");m.className="nc-steps";for(let w=0;w<f.steps.length;w++){let A=document.createElement("span");A.className="nc-step-wrap";let T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${f.id}:${w}`,T.setAttribute("aria-label",`${f.label} step ${w+1}`),A.append(T,ft()),A.addEventListener("click",D=>{let E=t(n);if(E?.type!=="stepGrid")return;let S=E.rows.findIndex(N=>N.id===f.id),C=s.getAttribute("aria-checked")==="true";E.onToggle(S,w,D.shiftKey||C)}),m.append(A)}if(e.onLength&&m.append(Ov(n,m,f,t)),y.append(...k,$,m),e.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=f.id,w.setAttribute("aria-label",`Re-roll ${f.label}`),w.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=Kc(),w.append(ft()),w.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(T=>T.id===f.id))}),y.append(w)}y.addEventListener("click",w=>{if(w.target!==y)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(T=>T.id===f.id))}),Qc(n,m,".nc-step-wrap",t,s,()=>f.id),n.append(y)}let u=document.createElement("div");u.className="nc-pads-head";let c=(f,y,$)=>{let x=document.createElement("button");return x.type="button",x.className=f,x.textContent=y,$&&x.setAttribute("aria-label",$),x},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),b=document.createElement(e.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),e.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",rs(n,f))}));for(let[f,y]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let $=t(n);if($?.type!=="stepGrid"||$.rows.length===0)return;let x=$.rows.length;$.onSelectRow?.(((cr($)+y)%x+x)%x)});if(u.append(p,b,h),e.onDice){let f=c("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=Kc(),f.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid")return;let $=cr(y);$>=0&&y.onDice?.($)}),u.append(f)}if(e.transport){let f=c("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.transport?.onToggle()}),u.append(f)}n.append(u);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let v=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<v;f++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(f),y.textContent=String(f+1),y.addEventListener("click",$=>{let x=t(n);if(x?.type!=="stepGrid")return;let M=cr(x);if(M<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(M,f+1);return}let k=s.getAttribute("aria-checked")==="true";x.onToggle(M,f,$.shiftKey||k)}),g.append(y)}return Qc(n,g,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[cr(f)]?.id:void 0}),n.append(g),n.append(He()),rs(n,e),n}function cr(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Qc(e,t,n,a,r,o){let s="on",l=!0,d=-1,u=(c,p)=>{let h=c.rows[d]?.steps[p];!h||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!h[s]!==l&&c.onToggle(d,p,s==="accent"))};ov(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(b=>b.id===o());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=o();d=p.rows.findIndex(g=>g.id===h);let b=p.rows[d]?.steps[c.pad];if(!b)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!b[s]}u(p,c.pad)}else if(c.kind==="long"){let h=o(),b=p.rows.findIndex(v=>v.id===h),g=t.querySelectorAll(n)[c.pad];b>=0&&g instanceof HTMLElement&&p.onLongPress?.(b,c.pad,g)}}})}function Dv(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Ov(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(ft());let o=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(g=>g.id===n.id),h=c.rows[p];if(!h)return;let b=Math.max(1,Math.min(h.steps.length,u));b!==h.length&&c.onLength?.(p,b)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,b)=>{let g=h.getBoundingClientRect();g.width>0&&u>=g.left+g.width/2&&(p=b+1)}),p},l=u=>o(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(b=>b.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in h&&(u.preventDefault(),o(h[u.key]))}),r}var ci=new WeakMap,dr=new WeakMap;function zv(e){return e?(dr.has(e)||(dr.set(e,Pa(e)),Hs(t=>{dr.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))as(n,Number(n.getAttribute("data-nc-velocity")))},e)),dr.get(e)):"light"}function as(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:zv(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(ci.has(e)&&ci.get(e)===r)){if(ci.set(e,r),n===null){for(let o of Object.keys(Tc(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(Tc(n,Mc[a]??Mc.light)))e.style.setProperty(o,s)}}function Zc(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function rs(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&o&&(d.setAttribute("aria-label",`Re-roll ${o.label}`),d.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?u.setAttribute("aria-label",h):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let c=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),b=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!b||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}${b?.markLabel?`, ${b.markLabel}`:""}`),Zc(p,b),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,as(p,b?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let b=0;b<c.steps.length;b++){let g=c.steps[b],v=e.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(v instanceof HTMLButtonElement))continue;let f=v.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===c.id?f.dataset.selected="true":delete f.dataset.selected;let M=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);M?f.dataset.picked="true":delete f.dataset.picked;let k=f.querySelector(".nc-name");k instanceof HTMLElement&&(k.setAttribute("aria-pressed",t.selectedRow===c.id||M?"true":"false"),k.textContent!==c.label&&(k.textContent=c.label,k.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?f.dataset.silent="true":delete f.dataset.silent;for(let m of f.querySelectorAll("[data-nc-ms]")){let w=m.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;m.setAttribute("aria-pressed",w?"true":"false")}}v.setAttribute("aria-pressed",g.on?"true":"false");let y=`${c.label} step ${b+1}${g.markLabel?`, ${g.markLabel}`:""}`;v.getAttribute("aria-label")!==y&&v.setAttribute("aria-label",y),Zc(v,g),g.accent?v.dataset.accent="true":delete v.dataset.accent,g.dim?v.dataset.dim="true":delete v.dataset.dim,b%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof g.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),as(v,g.velocity);let $=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;b===$?v.dataset.playhead="true":delete v.dataset.playhead;let x=!!t.onLength&&t.selectedRow===c.id;v.hidden=b>=c.length&&!x,b>=c.length&&x?v.dataset.out="true":delete v.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let b=document.activeElement===p;h.after(p),b&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Bv(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,He()),t}function _v(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;o&&(n.dataset.ncFoldable="",s=Tf(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),l.append(x),l.addEventListener("keydown",M=>{if(M.key!=="ArrowLeft"&&M.key!=="ArrowRight"||M.ctrlKey||M.metaKey||M.shiftKey)return;let k=t(n);k?.type==="strip"&&(M.preventDefault(),k.onMove?.(M.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>nd(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),nd(n,a,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onRemove?.(x)}),a.append(x)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let M=document.createElement("button");M.type="button",M.className="nc-hacks",M.dataset.ncHacks="",x.append(M,ft()),x.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onHacks?.()}),d.append(x)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let M=document.createElement("button");M.type="button",M.className="nc-hacks nc-sends-view",M.dataset.ncSendsView="",x.append(M,ft()),x.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onSendsView?.()}),u.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let k=document.createElement("button");k.type="button",k.className="nc-ms",k.dataset.ncMs=x,k.textContent=x==="mute"?"M":"S",M.append(k,ft()),M.addEventListener("click",()=>{let m=t(n);m?.type==="strip"&&(x==="mute"?m.onMute:m.onSolo)?.()}),u.append(M)}let c=document.createElement("div");c.className="nc-strip-sends";for(let x of e.sends??[])c.append(pn({...x,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(pn(Zs(e),t));let h=document.createElement("div");h.className="nc-strip-body";let b=document.createElement("span");b.className="nc-scale",b.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let M=document.createElement("span");M.className="nc-scale-tick",M.style.setProperty("--tick-pos",String(x.value)),M.textContent=x.label,b.append(M)}let g=e0({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let M=t(n);M?.type==="strip"&&M.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&td(x)}}),v=i0({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(h.append(b,g.el,v.el),o){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let M=document.createElement("span");M.className="nc-strip-fold-cap",M.setAttribute("aria-hidden","true");let k=document.createElement("span");k.className="nc-ui-fx-fold-name",k.dataset.ncStripFoldName="";let m=document.createElement("span");m.className="nc-strip-fold-pan",m.setAttribute("aria-hidden","true"),m.hidden=!e.pan,x.append(M,m,k),x.addEventListener("click",()=>{let w=t(n);if(w?.type!=="strip")return;w.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),h.prepend(x)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;f.addEventListener("click",x=>{let M=t(n);M?.type!=="strip"||!M.onTypeIn||(window.clearTimeout(y),x.detail===0?ed(n,f,t):x.detail===1&&(y=window.setTimeout(()=>ed(n,f,t),Hv)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let x=t(n);x?.type==="strip"&&td(x)});let $=document.createElement("div");return $.className="nc-strip-trim",e.trim&&$.append(pn(el(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,$,d,u,c,p,h,f,He()),Ef(n,e),n}function Zs(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??qv(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function el(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??jv(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function jv(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function qv(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Hv=250;function ed(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Da(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Vv(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;$f(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,He()),xf(n,e),n}function xf(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),$f(a))}function $f(e){let t=e.options[0];t&&(t.selected=!0)}function td(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Ef(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?t0(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Bp(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??Da(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let g of e.querySelectorAll("[data-nc-ms]")){let v=g.getAttribute("data-nc-ms"),f=v==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",f?"true":"false"),g.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let g=t.sendsViewLabel??"Sends";d.textContent!==g&&(d.textContent=g),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Ut(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=Af(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${fn(t.trim.id)}"]`);g&&it(g,el(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${fn(t.pan.id)}"]`);g&&it(g,Zs(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Lf(h,p,t.label),Ut(h,t.foldHelp));let b=e.querySelector("[data-nc-strip-fold]");if(b instanceof HTMLElement){b.hidden=!p,b.setAttribute("aria-label",`Expand ${t.label}`);let g=b.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),Ut(b,t.foldedHelp??t.foldHelp)}}function Af(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Sf?t:0}var Sf=8,ur=null;function nd(e,t,n,a){ur?.();let r=n(e);if(r?.type!=="strip")return null;let o=e.ownerDocument,s=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=o.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=o.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=Af(r),p=e.querySelector("[data-nc-strip-grip]")??t,h=(y=!1)=>{if(ur!==h)return;ur=null;let $=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",g,!0),o.removeEventListener("pointerdown",v,!0),s.removeEventListener("resize",f),(y||$)&&p?.isConnected&&p.focus?.({preventScroll:!0})},b=[0,...Array.from({length:Sf},(y,$)=>$+1)].map(y=>{let $=o.createElement("button");return $.type="button",$.setAttribute("role","radio"),$.setAttribute("aria-checked",y===c?"true":"false"),$.setAttribute("tabindex",y===c?"0":"-1"),$.dataset.ncShadeChoice=String(y),y===0?($.textContent="Auto",$.setAttribute("aria-label","Auto: alternate light and dark"),$.title="Auto: alternate light and dark"):($.textContent=String(y),$.setAttribute("aria-label",`Shade ${y}`),$.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),$.addEventListener("click",()=>{let x=n(e);h(!0),x?.type==="strip"&&x.onShade?.(y===0?null:y)}),$});if(u.append(...b),u.addEventListener("keydown",y=>{let $=b.indexOf(o.activeElement);if($<0)return;let x=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?x=($+1)%b.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?x=($-1+b.length)%b.length:y.key==="Home"?x=0:y.key==="End"&&(x=b.length-1),!(x<0)&&(y.preventDefault(),b[$].setAttribute("tabindex","-1"),b[x].setAttribute("tabindex","0"),b[x].focus())}),l.append(d,u),typeof r.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),$=y.indexOf(e);for(let[x,M,k]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let m=o.createElement("button");m.type="button",m.className="nc-strip-menu-item",m.dataset.ncStripMove=x<0?"left":"right";let w=o.createElement("span");w.textContent=M;let A=o.createElement("kbd");A.textContent=k,A.setAttribute("aria-hidden","true"),m.append(w,A),m.disabled=x<0?$<=0:$<0||$>=y.length-1,m.addEventListener("click",()=>{let T=n(e);h(!0),T?.type==="strip"&&T.onMove?.(x)}),l.append(m)}}o.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},$=l.offsetWidth,x=l.offsetHeight,M=s.innerWidth||o.documentElement.clientWidth||$,k=s.innerHeight||o.documentElement.clientHeight||x,m=a?a.x:y.right-$,w=a?a.y:y.bottom+4;m=Math.max(4,Math.min(m,M-$-4)),w+x>k-4&&(w=Math.max(4,(a?a.y:y.top)-x-4)),l.style.left=`${Math.round(m)}px`,l.style.top=`${Math.round(w)}px`})();let g=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),h(!0);else if(y.key==="Tab"&&l.contains(o.activeElement)){let $=[...l.querySelectorAll("button:not([disabled])")].filter(M=>M.getAttribute("tabindex")!=="-1"),x=($.indexOf(o.activeElement)+(y.shiftKey?-1:1)+$.length)%$.length;y.preventDefault(),$[x]?.focus()}},v=y=>{l.contains(y.target)||h(!1)},f=()=>h(!1);return o.addEventListener("keydown",g,!0),o.addEventListener("pointerdown",v,!0),s.addEventListener("resize",f),ur=h,(b.find(y=>y.getAttribute("tabindex")==="0")??b[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}function ad(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${fn(t)}"]`);return Bp(n?.querySelector(".nc-meter")??void 0)}var os=typeof ResizeObserver=="function"?new ResizeObserver(Uv):null;function Uv(e){for(let t of e){if(!t.target.isConnected){os.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Gv(n)}}function Gv(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function Kv(e){if(os)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))os.observe(t)}function Wv(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Wr(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(If(n,"head")),e.on!==void 0){let d=Vs({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(Xv(n,t)),Wr(e)&&l.append(ew(n,t)),s&&l.append(tw(t)),n.append(l)}r&&n.prepend(Jv(n,t)),o&&Nf(n,e);for(let l of e.controls)n.append(pn(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(pn(u,t));n.append(l)}return n.append(He()),Ff(n,e),Kv(n),n}var Yv=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Mf(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Yv(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Xv(e,t){let n=Tf();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Mf(e))}),n}function Tf(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Lf(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Jv(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(If(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Mf(e)}}),n}var Un=new Set;function Sr(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Wr=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Qv="(max-width: 768px)";function Zv(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function ew(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Zv()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Cf(e,a,!Un.has(a.id)),n.focus())}),n}function tw(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Cf(e,t,n){n?Un.add(t.id):Un.delete(t.id),tl(e,t)}function nw(e,t){t?.type==="fx"&&Un.has(t.id)&&Cf(e,t,!1)}function aw(e){return e.ownerDocument.defaultView?.matchMedia?.(Qv).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function tl(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Wr(t)&&Un.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Wr(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Sr(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Vn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Ut(n,t.maxHelp)),!a){e.dataset.ncMax&&rd(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Un.has(t.id)&&tl(e,t);queueMicrotask(()=>{e.isConnected?s():Sr(e.ownerDocument,s)});return}let r=aw(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&rd(e),e.dataset.ncMax=r,r==="over"&&rw(e,t)),ow(e.ownerDocument),r==="over"&&nl(e),Sr(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Vn(s)})}function rd(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Sr(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Vn(n)})}function rw(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function nl(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=E0(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var od=new WeakSet;function ow(e){od.has(e)||(od.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&nl(t)}))}var is=new WeakMap;function If(e,t){let n=Z0(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Nf(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)Ut(r,t.meterHelp);let a=is.get(e);a?a.set(t.meter):is.set(e,av(n,t.meter))}function Ff(e,t){(t.meter||is.has(e))&&Nf(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Lf(o,r,t.title),Ut(o,t.foldHelp)),tl(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),Ut(l,t.foldHelp)}}function Ut(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function fn(e){return e.replace(/["\\]/g,"\\$&")}function iw(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&Hp(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Vn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&nl(n);gv(e)}var sw=Ht["toast-duration"];function lw({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function cw(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function dw(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var id="data-nc-ui-toast-live";function uw(e,t){let n=t.querySelector(`[${id}]`);return n||(n=e.createElement("div"),n.setAttribute(id,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Mt({message:e,actionLabel:t,onAction:n,duration:a=sw,onClose:r,avoid:o=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=d.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let b="open",g=B=>B&&typeof B.getBoundingClientRect=="function"?B.getBoundingClientRect():null,v=g(c),f=v?.height||44,y=u.getComputedStyle?.(c),$=Number.parseFloat(y?.getPropertyValue(pe("toast-offset")))||16,x=Number.parseFloat(y?.getPropertyValue(pe("toast-anchor-gap")))||8,M=g(s),k=u.innerHeight??0,m=o.map(g).filter(Boolean),w=M&&M.bottom>0&&M.top<k?dw(M,m,{width:v?.width||0,height:f},u.innerWidth??0,x,$):null;w&&w.top+f<=k?(c.setAttribute("data-placement","anchor"),c.style.top=`${w.top+(u.scrollY??0)}px`,c.style.left=`${w.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",cw(m,k,f,$));let A=u.requestAnimationFrame?.bind(u)??(B=>setTimeout(B,16));A(()=>A(()=>{b==="open"&&c.setAttribute("data-state","open")})),uw(d,l).textContent=lw({message:e,actionLabel:t});let T,D,E=new Promise(B=>{D=B}),S=B=>{clearTimeout(T),T=setTimeout(()=>R("timeout"),B)},C=a,N=Date.now(),F=()=>{b==="open"&&(clearTimeout(T),C=Math.max(0,C-(Date.now()-N)))},U=()=>{b==="open"&&(N=Date.now(),S(C))};c.addEventListener("pointerenter",F),c.addEventListener("pointerleave",U),c.addEventListener("focusin",F),c.addEventListener("focusout",U),h?.addEventListener("click",()=>{if(b==="open")try{n?.()}finally{R("action")}}),Number.isFinite(a)&&S(a);function R(B="close"){if(b!=="open")return;b="closing",clearTimeout(T),c.setAttribute("data-state","closing"),r?.(B);let _=u.getComputedStyle?.(c),G=_?Math.max(0,...String(_.transitionDuration||"").split(",").map(oe=>Number.parseFloat(oe)*(oe.trim().endsWith("ms")?1:1e3)||0)):0,de=()=>{b!=="gone"&&(b="gone",c.remove(),D(B))};c.addEventListener("transitionend",de),setTimeout(de,G+50)}return{el:c,close:R,closed:E}}var Gn="data-nc-help";function Pf(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var di=new WeakMap;function pw(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function fw({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=di.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=!1,d,u=null,c=!1,p=0,h=()=>{clearTimeout(s),c&&!l&&(p=Date.now()+1500),c=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},b=()=>{h(),clearTimeout(d),o=null,u=null,l=!1},g=(w,A)=>{clearTimeout(s),u=A;let T=Date.now()<p?Math.min(t,300):t;s=setTimeout(()=>{o===w&&w.isConnected&&!l&&y(w)&&(c=!0)},T)},v=w=>({x:Number(w.clientX)||0,y:Number(w.clientY)||0}),f=(w,A,T)=>!w||Math.hypot(w.x-A.x,w.y-A.y)>T,y=(w,A)=>{let T=A??w.getAttribute(Gn);if(!T)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=T,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let D=w.getBoundingClientRect(),E=Pf(D,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,pw(e));return r.style.top=`${E.top}px`,r.style.left=`${E.left}px`,r.dataset.side=E.side,r.style.visibility="",!0},$=w=>{if(l||w.pointerType==="touch")return;let A=w.target&&w.target.closest?w.target.closest(`[${Gn}]`):null;A!==o&&(b(),!(!A||w.buttons)&&(o=A,g(A,v(w))))},x=w=>{if(l||w.pointerType==="touch"||!o)return;if(w.buttons){h(),u=null;return}let A=v(w);c?f(u,A,8)&&(h(),g(o,A)):f(u,A,4)&&g(o,A)},M=w=>{!l&&!w.relatedTarget&&b()},k=w=>{(l||w.key==="Escape")&&b()};e.addEventListener("pointerover",$),e.addEventListener("pointermove",x,{passive:!0}),e.addEventListener("pointerout",M),e.addEventListener("pointerdown",b,!0),e.addEventListener("keydown",k),a.addEventListener("scroll",b,!0),a.addEventListener("blur",b);let m={hide:b,pin(w,A,{ms:T=0}={}){return b(),!w||!w.isConnected||!y(w,A)?!1:(l=!0,r.dataset.pinned="",T>0&&(d=setTimeout(b,T)),!0)},uninstall(){b(),e.removeEventListener("pointerover",$),e.removeEventListener("pointermove",x),e.removeEventListener("pointerout",M),e.removeEventListener("pointerdown",b,!0),e.removeEventListener("keydown",k),a.removeEventListener("scroll",b,!0),a.removeEventListener("blur",b),r?.remove(),r=null,di.delete(e)}};return di.set(e,m),m}var Rf="(max-width: 768px)",hw='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',mw='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',gw=0;function bw({panel:e,button:t,label:n="Menu",media:a=Rf}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++gw}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=hw),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(mw)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:f}={}){if(!l())return;let y=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(f??y)&&s.focus?.({preventScroll:!0})}function c(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),u({focus:!0}))}function p(f){let y=f.target;y instanceof o.Node&&(e.contains(y)||s.contains(y))||u({focus:!1})}let h=()=>l()?u({focus:!0}):d(),b=f=>{let y=f.target,$=y instanceof o.Element?y.closest("button"):null;!$||!e.contains($)||$.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",b);let g=o.matchMedia?.(a),v=()=>{g?.matches||u({focus:!1})};return g?.addEventListener?.("change",v),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",b),g?.removeEventListener?.("change",v)}}}var al="netcomposer.rhythm.hidden.v1",At=new WeakMap;function ui(){try{return globalThis.localStorage??null}catch{return null}}function Df(e,t=al){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function sd(e,t,n,a=al){let r=Df(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function rl(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o);r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Zs(r)),r.trim&&n.push(el(r)))};for(let r of t)a(r);return n}function Of(e,t){if(!(!e||!t))return rl(e).find(n=>n.id===t)}function yw(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${rl(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function vw(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),zf(e,t)}function zf(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function ww(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=At.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Of(n,a)}function kw(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=yw(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${cd(o.id)}"]`);s&&zf(s,o);for(let l of o.controls){let d=e.querySelector(`[data-nc-id="${cd(l.id)}"]`);d instanceof Element&&it(d,l)}s instanceof HTMLElement&&ss(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),vw(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let d of o.controls)l.append(pn(d,ww));e.append(s),ss(s,o,n)}}function Bf(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var xw="(max-width: 768px)",_f=new WeakMap;function ld(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function $w(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=ld("prev"),o=ld("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let d=(u,c)=>{let p=_f.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:b}=Bf(h,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,b),p.onPage?.(b),ss(e,{...p,page:b},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),o.addEventListener("click",()=>d(1,o)),e.prepend(a),a}function ss(e,t,n){_f.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Bf(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(xw).matches===!0,d=e.closest(".nc-module");a.forEach((f,y)=>{let $=Math.floor(y/r)!==s;if($?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,$&&!l){let x=d instanceof HTMLElement?At.get(d):void 0;nw(f,Of(x,f.dataset.ncId))}});let u=$w(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=u.querySelector("[data-nc-fx-page-count]"),b=`${s+1} / ${o}`;h.textContent!==b&&(h.textContent=b);let g=u.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${s+1} of ${o}`;g.textContent!==v&&(g.textContent=v)}function cd(e){return e.replace(/["\\]/g,"\\$&")}function Ew(e,t=al){Pp();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Df(ui(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Vs({labelledBy:o.id,onChange:$=>(At.get(n)??e).onToggle?.($)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(o,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let b=document.createElement("span");b.className="nc-slim-lines",h.append(b);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,p,h),n.setAttribute("aria-labelledby",o.id);let v=$=>{let x=At.get(n)??e;n.dataset.ncOpen=$?"false":"true",p.hidden=$,h.hidden=!$,l.textContent=$?"+":"−",l.setAttribute("aria-expanded",$?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${$?"Show":"Hide"} ${x.title}`),l.title=$?"Show":"Hide",$?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let $=n.dataset.ncOpen==="true";sd(ui(),(At.get(n)??e).id,$,t),v($),ls(n.parentElement)}),h.addEventListener("click",()=>{sd(ui(),(At.get(n)??e).id,!1,t),v(!1),ls(n.parentElement)});let f={pages:new Map,redraw:()=>y.redraw()},y={el:n,update($){At.set(n,$),$.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=$.title,c.textContent=$.status??"",$.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),b.textContent=$.summary??$.title,u.el.hidden=$.on===void 0,u.set($.on===!0),$.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${$.title}`),kw(p,$,f),v(p.hidden),y.redraw()},redraw(){let $=At.get(n);$&&iw(n,rl($))}};return At.set(n,e),v(a),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(n),Hs(()=>y.redraw(),n.ownerDocument),y}function Aw(e,t,n="adjacent"){Pp(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),ls(e)}function ls(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Mo="netcomposer.studio.instances.v1",dd="netcomposer.studio.types-seen.v1",Sw=["petra-rhythm","olive-bass"];function jf(e,t){return t===1?e:`${e}#${t}`}function ol(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Mw(e,t){return t===1?e.name:`${e.name} ${t}`}function Jn(e,t,n){const a=Mw(e,t),r=qf(n,a);return{id:jf(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const il=20;function qf(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,il).join("").trim()||t}function Tw(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const o=a.find(s=>s.id===r.type);return o?Jn(o,r.n,n):r})}function Hf(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function Lw(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return Jn(t,a)}function Oa(e){return e.filter(t=>t.available!==!1&&t.addOnly!==!0).map(t=>Jn(t,1))}function Cw(e,t){if(!Array.isArray(e))return Oa(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:r?.id;if(typeof o!="string")continue;const s=ol(o),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===o)||n.push(Jn(l,s.n,r?.name))}return n.length>0||e.length===0?n:Oa(t)}function sl(){try{return globalThis.localStorage??null}catch{return null}}function Iw(e,t=sl()){try{const n=t?.getItem(Mo);return n?Cw(JSON.parse(n),e):Oa(e)}catch{return Oa(e)}}function Nw(e,t,n=sl()){let a=Sw;try{const s=JSON.parse(n?.getItem(dd)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const o=[...e];for(const s of r.filter(l=>l.addOnly!==!0))o.some(l=>l.type===s.id)||o.push(Jn(s,1));try{n?.setItem(dd,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Qn(o,n),o}function Fw(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Qn(e,t=sl()){try{t?.setItem(Mo,JSON.stringify(Fw(e)))}catch{}}function Pw(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function Rw(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const o=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(Pw,()=>null);r=Promise.race([o,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function Dw(e,t){const n=new Map;return(a,r)=>{const o=ol(a),s=o?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?o?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?jf(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const Ow=2e4,zw=500,Bw={waiting:"Waiting",loading:"Loading…",starting:"Starting audio…",ready:"Ready",failed:"Didn't load"},_w=["ready","failed"];function jw(e){const t=e.map(c=>({id:c.id,brand:c.brand,name:c.name,state:"waiting",loaded:!1,attached:!1,holds:0})),n=new Set;let a=!1,r=[];const o=new Map,s=c=>t.find(p=>p.id===c),l=c=>_w.includes(c.state),d=()=>{if(!a&&t.every(l)){a=!0;const c=r;r=[];for(const p of c)p()}for(const c of t){if(!l(c))continue;const p=o.get(c.id);if(p){o.delete(c.id);for(const h of p)h()}}for(const c of[...n])try{c()}catch{}},u=c=>{if(a||l(c))return;const p=c.loaded&&c.attached&&c.holds===0?"ready":c.loaded||c.attached?"starting":c.state==="waiting"?"waiting":"loading";p!==c.state&&(c.state=p,d())};return{items:()=>t.map(c=>({id:c.id,brand:c.brand,name:c.name,state:c.state})),counts:()=>({done:t.filter(l).length,total:t.length}),settled:()=>a||t.every(l),whenSettled(){return a||t.every(l)?Promise.resolve():new Promise(c=>r.push(c))},whenDone(c){const p=s(c);return!p||a||l(p)?Promise.resolve():new Promise(h=>o.set(c,[...o.get(c)??[],h]))},requested(c){const p=s(c);!p||a||p.state!=="waiting"||(p.state="loading",d(),u(p))},loaded(c){const p=s(c);p&&(p.loaded=!0,u(p))},attached(c){const p=s(c);p&&(p.attached=!0,u(p))},hold(c){const p=s(c);if(!p||a)return()=>{};p.holds++,u(p);let h=!1;return()=>{h||(h=!0,p.holds--,u(p))}},fail(c){const p=s(c);!p||a||l(p)||(p.state="failed",d())},remove(c){const p=t.findIndex(b=>b.id===c);if(p<0||a)return;t.splice(p,1);const h=o.get(c);o.delete(c);for(const b of h??[])b();d()},onChange(c){return n.add(c),()=>n.delete(c)}}}function qw(e,t){return e.includes(t)?[t,...e.filter(n=>n!==t)]:[...e]}async function Hw(e,t,n){for(let a=0;a<e.length;a++)a>0&&await n(),await t(e[a])}function Vw(e=zw,t=globalThis){return new Promise(n=>{typeof t.requestIdleCallback=="function"?t.requestIdleCallback(()=>n(),{timeout:e}):t.setTimeout(n,0)})}function Uw(e,t){const n=new Set,a=new URL(t),r=/<(script|link)\b([^>]*)>/gi;for(const o of e.matchAll(r)){const s=(o[1]??"").toLowerCase(),l=o[2]??"",d=p=>new RegExp(`\\b${p}\\s*=\\s*("([^"]*)"|'([^']*)')`,"i").exec(l)?.slice(2).find(Boolean);let u;if(s==="script"&&/\btype\s*=\s*["']module["']/i.test(l)&&(u=d("src")),s==="link"){const p=(d("rel")??"").toLowerCase();(p==="modulepreload"||p==="stylesheet")&&(u=d("href"))}if(!u)continue;let c;try{c=new URL(u,a)}catch{continue}c.origin===a.origin&&n.add(c.href)}return[...n]}const Mr="netcomposer.studio.pending-presets.v1",Gw=3e3,Kw=6e4;function ud(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Ww(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Yw(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Mr)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))ud(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Mr,JSON.stringify(s)):l.removeItem(Mr)}catch{}},o=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=Gw){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await Ww(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))ud(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),peek:()=>a(),dropPending(){const s=Object.keys(a());return r({}),s}}}function Xw(e,t,n=""){return n?`${e}@studio/${n}/${t}`:`${e}@studio/${t}`}const Jw=1,Qw=1;function Zw(e,t=we){if(!e||typeof e!="object")return null;const n=e;if(n.v!==Qw||typeof n.type!="string")return null;const a=t.find(r=>r.id===n.type);return!a||a.available===!1||a.addOnly||a.sound===!1?null:a.id}const we=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1},{id:"looper",name:"Looper",src:"/looper/",brand:"LUPA",identity:"instrument-looper",sound:!1,single:!0,noteTarget:!1,addOnly:!0},{id:"aria",name:"Situation",src:"/aria/",brand:"ARIA",identity:"instrument-aria",sound:!1,single:!0,noteTarget:!1}],ll=[...we];function e1(e,t,n={}){const a=n.instruments??we;return{version:Jw,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:a.find(f=>f.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(f=>f.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id;n.attached?.(c);const p=n.presets,h=n.share?.host(c),b=n.picker?.host(c),g=n.notes?.host(c),v=n.situation?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:f=>Xw(f,c,n.generation?.()??""),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:()=>n.holdFirstPlay?.(c)??(()=>{})}:{},...p?{providePreset:f=>p.provide(c,f)}:{},...h?{audioReceivers:h.audioReceivers,sendAudio:h.sendAudio,onAudio:h.onAudio,reveal:h.reveal}:{},...b?{pickerTarget:b.pickerTarget}:{},...g?{notesIn:g.notesIn,notesSource:g.notesSource,notesTakeBack:g.notesTakeBack,notesOut:g.notesOut,onPlayed:g.onPlayed}:{},...n.keys?{studioKey:f=>n.keys?.press(c,f)===!0,claimKeys:(f,y)=>Array.isArray(f)?n.keys?.claim(c,f,y)??(()=>{}):()=>{}}:{},...n.playKeys?{playKeys:f=>Array.isArray(f)?n.playKeys?.declare(c,f)??(()=>{}):()=>{},onStudioTyping:f=>typeof f=="function"?n.playKeys?.onTyping(f)??(()=>{}):()=>{}}:{},...n.metronome?{metronome:t1(n.metronome,c)}:{},...n.readout?{readout:(f,y)=>n.readout?.set(c,f,y)}:{},...n.studioTransport?{studioTransport:n.studioTransport}:{},...n.sounds?{onSound:f=>typeof f=="function"?n.sounds?.listen(c,f)??(()=>{}):()=>{}}:{},...n.midi?{midiIn:(f,y)=>typeof f=="function"?n.midi?.declare(c,f,{keys:y?.keys!==!1,pads:y?.pads===!0})??(()=>{}):()=>{}}:{},...n.chip?{chip:f=>n.chip?.(c,f&&typeof f=="object"?f:null)}:{},...v?{situationIn:v.situationIn,situationSource:v.situationSource,situationSources:v.situationSources,onSituationSources:v.onSituationSources}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:f=>typeof f=="function"?n.targets?.listen(f)??(()=>{}):()=>{}}:{},...n.show?{showInstance:f=>typeof f=="string"&&n.show?.(f)}:{},...n.add?{addInstrument:f=>{const y=Zw(f,a);return y===null?null:n.add?.(y)??null}}:{}}}}}function t1(e,t){return{prefs:()=>e.prefs(),set:n=>e.set(n&&typeof n=="object"?n:{}),want:n=>e.want(t,n===!0),active:()=>e.active(),onChange:n=>typeof n=="function"?e.onChange(n):()=>{}}}const pd=16,n1=30;function a1(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,pd+1):[],a=t.until;if(n.length<1||n.length>pd||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-r>n1)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function r1(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function o1(e,t){return t===null?e:`${t} · ${e}`}function i1(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function s1(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const o=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[x,M]of s)c>=M.until&&s.delete(x);const[p,h]=[...s][0]??[],b=h?r1(h,c):null;if(!p||!b){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const g=e.clearOf?.()??[],v=`${i1(g.map(x=>x.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==v&&n.style.setProperty("--count-in-top",v);const f=e.labelOf(p);a.textContent!==f&&(a.textContent=f);const y=String(b.n);r.textContent!==y&&(r.textContent=y),n.toggleAttribute("data-accent",b.accent),n.setAttribute("aria-label",`${f} count-in ${y}`);const $=o1(o,b.n);t.title!==$&&(t.title=$),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=a1(p);h&&(s.set(c,h),u())},clear(c){s.delete(c)&&u()}}}}const l1=1e4;function c1(e=l1,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const d1=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],la=(e,t)=>t.map(([n,a,r,o])=>({id:n,name:a,intervals:r,category:e,symbol:o})),Vf=[...la("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...la("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...la("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...la("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...la("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],Uf=new Map(Vf.map(e=>[e.id,e])),pi={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function u1(e){if(typeof e!="string")return"major";if(Uf.has(e))return e;if(pi[e])return pi[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(pi).find(([a])=>t(a)===n)?.[1]??Vf.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function cl(e){return Uf.get(u1(e))}const cs=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function Gf(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const o=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+o)}function p1(e,t,n=0,a="compact"){const o=cl(t).intervals.map(l=>cs(e,0,127)+l);for(let l=0;l<cs(n,0,o.length-1);l++){const d=o.shift(),u=o[o.length-1];o.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Gf(o.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,o.length-1))))}function f1(e,t=1){return[...new Set(Array.from({length:cs(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function h1(e,t){const n=[...new Set(e)].sort((o,s)=>o-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(o=>n[a-1-n.indexOf(o)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const o=[];for(let s=0,l=a-1;s<=l;s++,l--)o.push(n[s]),s!==l&&o.push(n[l]);return o}case"inside-out":return n.map((o,s)=>({note:o,i:s})).sort((o,s)=>Math.abs(o.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||o.i-s.i).map(o=>o.note);case"pendulum":{const o=Math.floor((a-1)/2);return[...r.slice(o),...r.slice(0,o)]}case"blossom-up":case"blossom-down":{const o=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[o]];for(let d=1;l.length<a;d++)for(const u of[o+s*d,o-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const o=t.startsWith("low"),s=o?n[0]:n[a-1],l=o?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const m1=16,ds={hits:5,steps:8,rotate:0};function Kf(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(m1,t(e?.arpSteps,ds.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,ds.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function Wf(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function g1(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)Wf(e,a)&&n++;return n}const b1=1592598566;function y1(e){let t=(Math.imul(e^b1,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const fd=new Map;function v1(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=fd.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:o}=a;for(;r<n;r++){const s=y1(r+1);o=(o+(s<.5?1:s<.75?0:e-1))%e}return fd.set(e,{step:r,pos:o}),o}function w1(e,t,n,a=ds,r=Math.random){if(t<1)return null;const o=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return v1(t,n);if(e==="euclidean"){const s=Kf({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return Wf(s,l)?o(g1(s,l)):null}return o(n)}const dl=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(dl.map(e=>e.id));new Map(dl.map(e=>[e.num,e.id]));dl.map(e=>({value:e.id,label:e.name}));const Yf=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];Yf.map(e=>e.id);const hd=e=>Yf.find(t=>t.id===e)?.kind??"repeat",k1=15,x1=40,Ke=e=>[...e].sort((t,n)=>t-n);function Xf(e,t){const n=Ke(e);for(let a=0;a<t;a++){const r=n.shift(),o=n[n.length-1]??r;n.push(r+Math.ceil((o-r+1)/12)*12)}return n}const pr=e=>Xf(e,1);function $1(e,t){const n=e[0];return n-((n-t)%12+12)%12}function E1(e,t){const n=Ke(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Ke([n[0],...n.slice(2),n[1]+12]);case 2:return Ke([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Ke([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function A1(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),o=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-o%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=o%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return o%r}}function S1(e,t,n,a,r=Math.random){const o=Ke(t);if(!o.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:o,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Xf(o,A1(e,o.length,n,r)),velocity:.9};case"alberti":return{notes:[[o[0],o[2]??o[o.length-1],o[1]??o[0],o[2]??o[o.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:o,velocity:s?1:.45}}case"drift":return{notes:E1(o,n),velocity:.9};default:return null}}function M1(e,t,n,a,r=t){const o=Ke(t);if(!o.length)return[];const s=(d,u,c,p)=>d.map(h=>({step:h,len:u,notes:c,velocity:p})),l=$1(o,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,pr(o),.75),...s([8],3,[l-12],1),...s([12],2,pr(o),.75)];case"charleston":return s([0,6],2,o,.9);case"skank":return s([4,12],1,pr(o),.9);case"house":return s([2,6,10,14],1,pr(o),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],h=[d,u];return[[0,p],[3,h],[5,p],[6,h],[8,[u,c]],[10,p],[13,h],[14,[u,l+12]]].map(([b,g])=>({step:b,len:1,notes:Ke(g),velocity:.85}))}case"push":return[...s([0],6,o,.9),...s([6],2,o,.9),{step:14,len:2,notes:Ke(r),velocity:.9,next:!0}];case"strum":{const d=[...o,o[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function T1(e,t,n){const a=n==="down"?Ke(e):Ke(e).reverse(),r=Math.max(0,Math.min(x1,t))/1e3;return a.map((o,s)=>({midi:o,offset:s*r}))}const md=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function L1(e){const t=new Set(e.map(o=>(o%12+12)%12)),n=o=>t.has(o);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(o=>!n(o%12))}function C1(e,t,n,a=Math.random){const r=L1(n);if(!r.length||!e.length)return null;const o=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((o-(s+1))%12+12)%12;return l<=127?l:null}function us(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),o=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<o;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return Gf(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function I1(e,t){const n=Ke(e),a=Ke(t);if(n.length===a.length)return n.reduce((o,s,l)=>o+Math.abs(s-a[l]),0);const r=(o,s)=>Math.min(...s.map(l=>Math.abs(l-o)));return n.reduce((o,s)=>o+r(s,a),0)+a.reduce((o,s)=>o+r(s,n),0)}function N1(e,t,n,a,r,o="compact",s){const l=us(t,n,s??r,o);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((h,b)=>b);for(const h of p)for(const b of[-24,-12,0,12]){const g=us(t,n,h,o).map(y=>y+b);if(g[0]<a-7||g[0]>a+12||g[0]<0||g[g.length-1]>127)continue;const v=I1(g,e),f=Math.abs(g.reduce((y,$)=>y+$,0)/g.length-e.reduce((y,$)=>y+$,0)/e.length);(v<u-1e-9||Math.abs(v-u)<1e-9&&f<c-1e-9)&&(d=g,u=v,c=f)}return d}const F1={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},I=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),J="major",Fe="minor",Q="dominant-7",se="minor-7",ze="major-7",fi="half-diminished-7",hi="diminished-7",ne=(e,t,n,a,r,o)=>({id:e,group:t,name:n,level:a,tonality:r,chords:o,short:F1[t]}),gd=e=>[I(0,Q,"I7"),I(e==="IV7"?5:0,Q,e),I(0,Q,"I7"),I(0,Q,"I7"),I(5,Q,"IV7"),I(5,Q,"IV7"),I(0,Q,"I7"),I(0,Q,"I7"),I(7,Q,"V7"),I(5,Q,"IV7"),I(0,Q,"I7"),I(7,Q,"V7")],Jf=[ne("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[I(0,J,"I"),I(7,J,"V"),I(9,Fe,"vi"),I(5,J,"IV")]),ne("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[I(9,Fe,"vi"),I(5,J,"IV"),I(0,J,"I"),I(7,J,"V")]),ne("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[I(0,J,"I"),I(9,Fe,"vi"),I(5,J,"IV"),I(7,J,"V")]),ne("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[I(0,J,"I"),I(10,J,"♭VII"),I(5,J,"IV",2)]),ne("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[I(0,J,"I",.5),I(7,J,"V",.5),I(9,Fe,"vi",.5),I(4,Fe,"iii",.5),I(5,J,"IV",.5),I(0,J,"I",.5),I(5,J,"IV",.5),I(7,J,"V",.5)]),ne("blues-12","Blues","12-bar",1,"blues",gd("I7")),ne("blues-12-quick","Blues","12-bar quick change",2,"blues",gd("IV7")),ne("blues-minor","Blues","Minor blues",2,"minor",[I(0,se,"i7"),I(0,se,"i7"),I(0,se,"i7"),I(0,se,"i7"),I(5,se,"iv7"),I(5,se,"iv7"),I(0,se,"i7"),I(0,se,"i7"),I(8,Q,"♭VI7"),I(7,Q,"V7"),I(0,se,"i7"),I(7,Q,"V7")]),ne("blues-jazz","Blues","Jazz blues",3,"blues",[I(0,Q,"I7"),I(5,Q,"IV7"),I(0,Q,"I7"),I(7,se,"v7",.5),I(0,Q,"I7",.5),I(5,Q,"IV7"),I(6,hi,"♯iv°7"),I(0,Q,"I7"),I(9,Q,"VI7"),I(2,se,"ii7"),I(7,Q,"V7"),I(0,Q,"I7",.5),I(9,Q,"VI7",.5),I(2,se,"ii7",.5),I(7,Q,"V7",.5)]),ne("jazz-2-5-1","Jazz","ii–V–I",1,"major",[I(2,se,"ii7"),I(7,Q,"V7"),I(0,ze,"Imaj7",2)]),ne("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[I(2,fi,"iiø7"),I(7,"7b9","V7♭9"),I(0,"minor-6","i6",2)]),ne("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[I(0,ze,"Imaj7",.5),I(9,se,"vi7",.5),I(2,se,"ii7",.5),I(7,Q,"V7",.5)]),ne("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[I(4,se,"iii7",.5),I(9,Q,"VI7",.5),I(2,se,"ii7",.5),I(7,Q,"V7",.5)]),ne("jazz-autumn","Jazz","Autumn cycle",3,"minor",[I(5,se,"iv7"),I(10,Q,"♭VII7"),I(3,ze,"♭IIImaj7"),I(8,ze,"♭VImaj7"),I(2,fi,"iiø7"),I(7,"7b9","V7♭9"),I(0,se,"i7",2)]),ne("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[I(0,ze,"Imaj7",.5),I(3,Q,"♭III7",.5),I(8,ze,"♭VImaj7",.5),I(11,Q,"VII7",.5),I(4,ze,"IIImaj7"),I(10,se,"♭vii7",.5),I(3,Q,"♭III7",.5),I(8,ze,"♭VImaj7",.5),I(11,Q,"VII7",.5),I(4,ze,"IIImaj7",.5),I(7,Q,"V7",.5),I(0,ze,"Imaj7"),I(6,se,"♯iv7",.5),I(11,Q,"VII7",.5)]),ne("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[I(0,se,"i7"),I(5,Q,"IV7")]),ne("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[I(5,ze,"IVmaj7"),I(4,se,"iii7"),I(2,se,"ii7"),I(0,ze,"Imaj7")]),ne("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[I(5,ze,"IVmaj7"),I(4,Q,"III7"),I(9,se,"vi7"),I(7,se,"v7",.5),I(0,Q,"I7",.5)]),ne("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[I(2,"minor-9","ii9"),I(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),I(0,"major-9","Imaj9",2)]),ne("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[I(0,J,"I"),I(5,J,"IV",.5),I(6,hi,"♯iv°7",.5)]),ne("gospel-7-3-6","Gospel","7–3–6",3,"major",[I(11,fi,"viiø7"),I(4,Q,"III7"),I(9,se,"vi7",2)]),ne("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[I(0,J,"I",.5),I(0,Q,"I7",.5),I(5,J,"IV",.5),I(6,hi,"♯iv°7",.5),I(0,J,"I/V",2,{inversion:2})]),ne("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[I(0,Fe,"i"),I(8,J,"VI"),I(3,J,"III"),I(10,J,"VII")]),ne("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[I(0,Fe,"i"),I(10,J,"VII"),I(8,J,"VI"),I(10,J,"VII")]),ne("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[I(0,se,"i7"),I(5,se,"iv7")]),ne("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[I(0,Fe,"i"),I(8,J,"VI"),I(10,J,"VII"),I(7,Fe,"v")]),ne("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[I(5,Fe,"iv"),I(0,Fe,"i")]),ne("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[I(0,J,"I"),I(8,J,"♭VI"),I(10,J,"♭VII"),I(0,J,"I")]),ne("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[I(0,J,"I"),I(4,J,"III")]),ne("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[I(0,J,"I"),I(2,J,"II")]),ne("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[I(0,Fe,"i"),I(10,J,"♭VII"),I(8,J,"♭VI"),I(7,J,"V")]),ne("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[I(0,Fe,"i"),I(5,Fe,"iv"),I(7,Q,"V7",2)]),ne("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[I(0,ze,"Imaj7",2),I(2,Q,"II7",2),I(2,se,"ii7"),I(7,Q,"V7")]),ne("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[I(2,"minor-9","ii9"),I(7,"dominant-9","V9"),I(0,"major-9","Imaj9"),I(9,"minor-9","vi9")]),ne("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[I(5,ze,"IVmaj7"),I(4,se,"iii7"),I(9,se,"vi7",2)]),ne("modal-dorian","Modal","Dorian i–IV",1,"dorian",[I(0,Fe,"i"),I(5,J,"IV")]),ne("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[I(0,J,"I"),I(10,J,"♭VII")]),ne("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[I(0,Fe,"i"),I(1,J,"♭II")])];Jf.map(e=>e.id);const P1=e=>Jf.find(t=>t.id===e)??null;function mi(e,t,n,a=0){const r=P1(e);if(!r)return null;const o=(n+1)*12+t;return r.chords.map((s,l)=>{const d=cl(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:o+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${d1[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const R1=e=>e.reduce((t,n)=>t+n.bars,0),D1=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function bd(e,t){const n=R1(e),a=(t%n+n)%n;let r=0;for(let o=0;o<e.length;o++){if(a<r+e[o].bars-1e-9)return{chord:e[o],index:o,position:a,total:n};r+=e[o].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const O1=16,z1=()=>Array.from({length:O1},()=>null),B1=["off","single","chord","random"],_1=e=>B1.includes(e),j1={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:z1(),chordPadMode:"pad"};function yd(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=p1(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const o=f1(r,e.arpOctaves),s=h1(o,e.arp),l=w1(e.arp,s.length,t,Kf(e),n);return l===null?[]:[s[l]]}function vd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function q1(e,t,{octave:n}={}){if(t==="chord")return e.map(o=>({...o,role:"chord"}));const a=new Map;for(const o of e)a.set(o.hit,[...a.get(o.hit)??[],o]);const r=[];for(const o of a.values()){const s=o[0],l=Math.max(...o.map(d=>d.velocity));if(t==="top"){const d=o.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function H1(e,t){return t.direction&&t.strumMs>0&&e.length>1?T1(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function V1(e,t=0){return H1(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const wd=(e,t,n)=>Math.min(n,Math.max(t,e)),U1=1e-9;function G1(e,t){return t>0?Math.ceil(e/t-U1)*t:e}const kd=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class ul{step=0;grid={origin:0,index:0,interval:16};comp=kd(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,o=n?G1(t,r):t;this.grid={origin:o,index:0,interval:a},this.step=Math.max(0,Math.round(o/r));const s=this.beatsPerBar();return this.comp=kd(o,n?0:Math.floor(t/s+1e-9)*s),o}clone(t={}){const n=new ul(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&hd(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},h=yd(p,this.step,this.random);return this.step++,h.length?this.hit(t,a,h,1,null,c,!1,"arp"):null}if(hd(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=S1(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,md(this.beatInBar(t)),l,!0,"chord")}if(!_1(n.mode))return this.step++,null;const r=yd(n,this.step,this.random);if(this.step++,!r.length)return null;const o=n.mode==="chord",s=o?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:wd(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:o?this.plainChordAt():null,root:s,role:o?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,o,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const h=C1(c,s.rootPc,s.intervals,this.chordRandom);h!==null&&c.push(h)}const p=u.chordStyle==="strum"&&o?u.strum>0?u.strum:k1:u.strum;return{beat:t,spanBeats:n,gate:wd(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:o,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=cl(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=mi(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?bd(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const o=n.voiceLeading==="smooth"?N1(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):us(t.root,t.intervals,a,n.arpSpread);return this.comp.last=o,this.comp.lastKey=r,o}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,o=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*o),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*o);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=h.last,this.comp.lastKey=h.key}}let c=M1(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<o-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),o=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(b=>l*r+b.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const h=this.chordAt(u.next?(l+1)*r:c);o.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??md(this.beatInBar(c)),h,!0,"chord"))}return o}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=mi(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=bd(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=mi(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const o=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/o-1e-9)*o;return this.comp.jump={at:l,origin:l-D1(r,t)*o},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let o=0;o<4096;o++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(o=>o<t,n)):this.syncBars();const r=[];for(const o of a)r.push(...V1(o,++this.serial));return r.sort((o,s)=>o.startBeat-s.startBeat)}}const _e=1,Yr=1024,K1=48,Qf=128,xd=40,$d=64,ps=8,Ed=16,Xr=1024,Zf=16,pl=255,W1=["chord","root","top"],Y1=["chord","root","top","arp","note"],Ad=24,Sd=-60,X1=["ask","armed","recording","cancel","quiet","added","undo","undone"],Md=9999,xn=256,Td=2,fr=128,eh=64,fs=24,Ld=4,Cd=64;function J1(e){let t=null;for(const n of e){if(!(n.type==="note"&&n.on||n.type==="sound"))continue;const r={beat:n.beat,stopped:n.stopped===!0,pattern:n.type==="note"&&n.pattern===!0};(!t||r.beat<t.beat)&&(t=r)}return t}function Q1(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function gi(e,t,n,a,r={}){const o=new Map;return q1(n,a,r).map(s=>{const l=o.get(s.hit)??0;return o.set(s.hit,l+1),{...s,id:Q1(e,t,s.role,s.hit,l),source:e}})}const za=e=>typeof e=="object"&&e!==null,Be=e=>typeof e=="string"&&e.length>0&&e.length<=Qf,ve=e=>typeof e=="number"&&Number.isFinite(e);function Id(e){return za(e)?Be(e.id)?Be(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!ve(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":ve(e.startBeat)?!ve(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!ve(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!ve(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!ve(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!Y1.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!th(e.slice)?`slice must be a whole number 0–${pl}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const th=e=>Number.isInteger(e)&&e>=0&&e<=pl,Z1=e=>Number.isInteger(e)&&e>=1&&e<=Zf;function nh(e){return za(e)?Be(e.id)?ve(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>Ed?`slot must be a whole number 1–${Ed}`:null:e.type==="chordPad"?e.pad!==null&&!Z1(e.pad)?`pad must be a whole number 1–${Zf}, or null`:null:e.type==="take"?Be(e.take)?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>xn?`lengthBeats must be above 0, at most ${xn}`:e.gain!==void 0&&(!ve(e.gain)||e.gain<0||e.gain>Td)?`gain must be 0–${Td}`:e.offsetBeats!==void 0&&(!ve(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=fr&&e.peaks.every(t=>ve(t)&&t>=0&&t<=1))?`peaks must be at most ${fr} values 0–1`:e.normalize!==void 0&&typeof e.normalize!="boolean"?"normalize must be true or false":e.normalizeDb!==void 0&&(!ve(e.normalizeDb)||e.normalizeDb<Sd||e.normalizeDb>Ad)?`normalizeDb must be ${Sd}–${Ad}`:null:"bad take":e.type==="lap"?!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>xn?`lengthBeats must be above 0, at most ${xn}`:null:e.type==="voice"?typeof e.state!="string"||!X1.includes(e.state)?"bad voice state":e.lengthBeats!==void 0&&(!ve(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>xn)?`lengthBeats must be above 0, at most ${xn}`:e.state==="armed"&&e.lengthBeats===void 0?"an armed voice pass needs lengthBeats":e.pass!==void 0&&!(Number.isInteger(e.pass)&&e.pass>=1&&e.pass<=Md)?`pass must be a whole number 1–${Md}`:e.take!==void 0&&!Be(e.take)?"bad take":(e.state==="undo"||e.state==="undone")&&e.take===void 0?"undo needs its take":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=fr&&e.peaks.every(t=>ve(t)&&t>=0&&t<=1))?`peaks must be at most ${fr} values 0–1`:null:e.type==="param"?typeof e.param!="string"||!ek.test(e.param)?`param must be 1–${eh} letters, digits, '.', '-' or '_'`:Nd(e.value)?e.label!==void 0&&!Fd(e.label)?`label must be 1–${fs} characters`:e.text!==void 0&&!Fd(e.text)?`text must be 1–${fs} characters`:e.from!==void 0&&!Nd(e.from)?"from must be 0–1":e.glide!==void 0&&(!ve(e.glide)||e.glide<=0||e.glide>Ld)?`glide must be above 0, at most ${Ld} beats`:null:"value must be 0–1":"bad type":"bad beat":"bad id":"not an object"}const ek=new RegExp(`^[A-Za-z0-9._-]{1,${eh}}$`),Nd=e=>ve(e)&&e>=0&&e<=1,Fd=e=>typeof e=="string"&&e.length>0&&e.length<=fs;function tk(e){if(!za(e))return"not an object";if(e.type==="sound")return Be(e.id)?ve(e.beat)?e.stopped!==void 0&&e.stopped!==!0?"stopped must be true when present":null:"bad beat":"bad id";if(e.type!=="note")return nh(e);if(!Be(e.id))return"bad id";if(!ve(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(e.pattern!==void 0&&e.pattern!==!0)return"pattern must be true when present";if(e.stopped!==void 0&&e.stopped!==!0)return"stopped must be true when present";if(e.pattern===!0&&e.stopped===!0)return"a pattern note plays on a running clock";if(e.form!==void 0&&(e.pattern!==!0||typeof e.form!="string"||!e.form.length||e.form.length>Cd))return`form is 1–${Cd} characters, on a pattern note only`;if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!ve(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!th(e.slice))return`slice must be a whole number 0–${pl}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>xd))return`name must be 1–${xd} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function Pd(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>Yr)return`more than ${Yr} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function nk(e){if(!za(e))return"not an object";if(e.v!==_e)return`version ${String(e.v)} is not ${_e}`;if(e.kind==="notes"){if(!Be(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>Yr)return`more than ${Yr} events`;for(let t=0;t<e.events.length;t++){const n=Id(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!Be(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>$d)return`more than ${$d} notes`;if(!ve(e.holdSec)||e.holdSec<=0||e.holdSec>ps)return`holdSec must be above 0, at most ${ps}`;for(let t=0;t<e.events.length;t++){const n=Id(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return Be(e.source)?Pd(e.events,tk):"bad source";if(e.kind==="controls")return Be(e.source)?Pd(e.events,nh):"bad source";if(e.kind==="off")return Be(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!ve(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!Be(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>Xr)return`more than ${Xr} ids`;for(let t=0;t<e.ids.length;t++)if(!Be(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!za(t)||!Be(t.source)||typeof t.name!="string"||t.name.length>Qf)return"bad route";if(!W1.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=K1))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const Rd=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),ah=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]},...e.normalize===void 0?{}:{normalize:e.normalize},...e.normalizeDb===void 0?{}:{normalizeDb:e.normalizeDb}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:e.type==="voice"?{type:"voice",id:e.id,beat:e.beat,state:e.state,...e.lengthBeats===void 0?{}:{lengthBeats:e.lengthBeats},...e.pass===void 0?{}:{pass:e.pass},...e.take===void 0?{}:{take:e.take},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="param"?{type:"param",id:e.id,beat:e.beat,param:e.param,value:e.value,...e.label===void 0?{}:{label:e.label},...e.text===void 0?{}:{text:e.text},...e.from===void 0?{}:{from:e.from},...e.glide===void 0?{}:{glide:e.glide}}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},ak=e=>e.type==="sound"?{type:"sound",id:e.id,beat:e.beat,...e.stopped===!0?{stopped:!0}:{}}:e.type!=="note"?ah(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{},...e.pattern===!0?{pattern:!0}:{},...e.pattern===!0&&e.form!==void 0?{form:e.form}:{},...e.stopped===!0?{stopped:!0}:{}};function Dd(e){if(nk(e))return null;const t=e;return t.kind==="notes"?{v:_e,kind:"notes",source:t.source,events:t.events.map(Rd)}:t.kind==="audition"?{v:_e,kind:"audition",source:t.source,events:t.events.map(Rd),holdSec:t.holdSec}:t.kind==="played"?{v:_e,kind:"played",source:t.source,events:t.events.map(ak)}:t.kind==="controls"?{v:_e,kind:"controls",source:t.source,events:t.events.map(ah)}:t.kind==="off"?{v:_e,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:_e,kind:"release",source:t.source,ids:[...t.ids]}:{v:_e,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const rk=(e,t)=>({v:_e,kind:"notes",source:e,events:t}),hr=(e,t,n)=>({v:_e,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),ok=(e,t)=>({v:_e,kind:"release",source:e,ids:t}),ik=e=>({v:_e,kind:"routes",routes:e}),sk=(e,t,n)=>({v:_e,kind:"audition",source:e,events:t,holdSec:n}),Od=(e,t)=>({v:_e,kind:"controls",source:e,events:t}),lk=1e-6;function ck(e){const t=new Map;let n=new Set;const a=()=>e.beatsPerBar?.()??4,r=d=>Math.ceil(d/a()-lk)*a(),o=d=>{for(const[u,c]of[...t])if(!(c===d.from||!t.has(u)))try{u(d)}catch{}},s=(d,u,c)=>{const p=e.beatNow()!==null;return{from:d,kind:u,beat:p?c:null,stopped:!p||c===null,at:e.now()}},l=()=>new Set(e.beatNow()===null?[]:e.playing());return{listen(d,u){if(typeof u!="function")return()=>{};t.set(u,d),n=l();const c=e.beatNow(),p=[...n].filter(h=>h!==d);if(c!==null&&p.length){const h=s(p[0],"in",r(c));try{u(h)}catch{}}return()=>{t.delete(u)}},get listening(){return t.size>0},played(d,u){if(!t.size)return;const c=J1(u);if(!c)return;const p=u.some(h=>h.type==="sound");o(s(d,p?"voice":c.pattern?"pattern":"played",c.stopped?null:c.beat))},delivered(d,u){if(!t.size||typeof u.source!="string"||u.kind!=="notes"&&u.kind!=="audition")return;const c=Array.isArray(u.events)?u.events:[];if(!c.length)return;if(u.kind==="audition"){o(s(u.source,"notes",null));return}let p=Number.POSITIVE_INFINITY;for(const h of c){const b=h.startBeat;typeof b=="number"&&Number.isFinite(b)&&b<p&&(p=b)}Number.isFinite(p)&&o(s(u.source,"notes",p))},started(d,u){n=l(),t.size&&o({from:u??"studio",kind:"start",beat:d,stopped:!1,at:e.now()})},allIn(){const d=e.beatNow();d===null||!t.size||(o({from:"studio",kind:"in",beat:r(d),stopped:!1,at:e.now()}),n=l())},poll(){const d=e.beatNow();if(d===null){n=new Set;return}const u=l();if(t.size)for(const c of u)n.has(c)||o({from:c,kind:"in",beat:r(d),stopped:!1,at:e.now()});n=u},stopped(){n=new Set}}}const rh="netcomposer.studio.fx-fold.v1",dk=["a","b","insert"],oh={a:!0,b:!0,insert:!1};function ih(e){try{const t=e?.getItem(rh);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const o of dk)typeof a[o]=="boolean"&&(r[o]=a[o]);return r}catch{return{}}}function sh(e){return{...oh,...ih(e)}}function lh(e,t,n){const a={...ih(e),[t]:n};try{e?.setItem(rh,JSON.stringify(a))}catch{}return{...oh,...a}}const ch="netcomposer.studio.insert-fold.v1";function dh(e){try{const t=e?.getItem(ch),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function uh(e,t,n){const a=[...dh(e)].filter(o=>o!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(ch,JSON.stringify(r))}catch{}return new Set(r)}function uk(e,t){return sh(e).insert?(lh(e,"insert",!1),uh(e,t,!0)):dh(e)}function Le(){try{return globalThis.localStorage??null}catch{return null}}const pk={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function ph(e,t){const n=t.fx[e],a=Pr(n);for(const r of a.chain){const o=pk[e][r.type];n===void 0&&o&&Object.assign(r.dials,o),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const fh="drive-1",hs=3;function fk(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return dn(e.masterFx,t);const n=e.insert.on?ph("insert",e).chain.find(a=>a.type==="drive"):void 0;return dn({v:2,chain:n?[{id:fh,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function hk(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const mk={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function gk(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const mr=e=>({channels:null,reason:e,message:mk[e]});function bk(e,t){const n=new Map,a=new Map;let r=1;const o=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=o(l);if(!c)return mr("no-source");if(!(u>d))return mr("empty");const p=r++;return new Promise(h=>{a.set(p,(b,g)=>h(b?{channels:b}:mr(g??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&h(mr("timeout"))},gk(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const h=g=>p?.port.postMessage(g);p?h({type:"record",id:c,from:d}):t.ready.then(()=>{p=o(l),h({type:"record",id:c,from:d})});let b=!1;return{stop(g){return b?Promise.resolve(null):(b=!0,new Promise(v=>{a.set(c,v),h({type:"record-end",id:c,to:g}),setTimeout(()=>{a.delete(c)&&v(null)},Math.max(0,(g-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){b=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function yk(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const o=Reflect.get(n,a,r);return typeof o=="function"?o.bind(n):o}})}const Z={"picker:off":"Connects the Sample Picker on this computer: it shows a NYX's pads here, and a tap there loads a sound onto one. Off: the Picker can't reach this Studio.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: it shows a NYX's pads here and loads sounds onto them (you choose which NYX there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer (on port 5177); the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker isn't connected yet. Press to connect (if Chrome asks to let this site reach this computer, choose Allow).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","motion:live":"Your phone's motion is live in ARIA 1. Tap to open it.","motion:paused":"Your phone's motion is paused in ARIA 1 while its page is hidden. Tap to open it.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:play-off":"Audio is off: press Play to start. Play starts every instrument on the Studio clock.","transport:play-loading":"Play is ready once every instrument is in. The line under the bar fills as they load.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ◀) opens it again.","fx:comp-gauge":"What reaches the compressor (In, the threshold as a tick), how much it turns down (GR) and what comes out (Out).","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","gate:steps":"Tap or drag up and down to draw each step's level. Hold a step (or right-click it) to give it its own shape. The ring is the step playing: dimmed while stopped.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit (right-click its tab, Minimize strip). It keeps playing at the same level; M and S still work, and Expand strip brings it back.","strip:folded":"A minimized channel: mute, solo and level meter, with its short name on the tab below. Right-click the tab and choose Expand strip to open it again; drag the tab's ⠿ to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument, right under its strip. Click to show it below; drag ⠿ to move tab and strip together (Alt+← / Alt+→ too); double-click to rename; right-click (touch and hold) for Shade, Minimize and Rename; × removes it.","strip:played-by":"Played by {who}. The dot fades a bar after its notes stop.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","offline:ready":"This Studio and its instruments are saved in this browser, so they open with no connection. The Library, Picker, live ARIA and plugins need the internet.","offline:offline":"No connection: the Studio runs from this browser's saved copy. The NYX Library and Picker, live ARIA (it plays its 2010 recording) and plugins wait for the internet.","offline:update":"A newer Studio is saved in this browser. Reload to use it; until then this page keeps the version it opened with.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},xa="data-nc-help-mode",hh="nc-help-mode-tip",zd="data-nc-help-mode-css",vk=`
.nc-ui-help:not([data-pinned]):not(.${hh}) { display: none !important; }
html[${xa}], html[${xa}] * { cursor: help !important; }
`;function wk(e){const t=e;if(!t||typeof t.closest!="function")return!1;if(t.isContentEditable)return!0;const n=t.closest("input, textarea, select, [contenteditable='true']");return n?n instanceof HTMLInputElement?!["button","checkbox","radio","range","submit","reset","color","file"].includes(n.type):!0:!1}function Bd(e){const t=e;if(!t||typeof t.closest!="function"||t.closest("[data-help-mode-own]"))return null;const n=t.closest(`[${Gn}]`);return n&&(n.getAttribute(Gn)??"").trim()?n:null}function kk(e,t){let n=!1;const a=()=>e.defaultView?.matchMedia?.("(pointer: coarse)").matches===!0,r=e.createElement("button");r.type="button",r.className="help-btn",r.textContent="?",r.setAttribute("aria-label","Help"),r.setAttribute("aria-pressed","false"),r.setAttribute(Gn,"Help: point at anything to see what it does. ? or Esc turns it off."),r.dataset.helpModeOwn="",r.addEventListener("click",()=>v.toggle());const o=e.createElement("div");o.className="help-band",o.setAttribute("role","status"),o.hidden=!0,o.dataset.helpModeOwn="";const s=e.createElement("span"),l=e.createElement("b");l.textContent="Help";const d=e.createElement("span");s.append(l,d);const u=e.createElement("button");u.type="button",u.className="help-done",u.textContent="Done",u.addEventListener("click",()=>v.set(!1)),o.append(s,u);const c=new WeakMap;function p(f){let y=c.get(f);if(!y||!y.bubble.isConnected){const $=f.createElement("div");$.className=`nc-ui-help ${hh}`,$.setAttribute("role","tooltip"),$.dataset.testid="nc-help-mode",$.hidden=!0,f.body?.append($),y={bubble:$,at:null},c.set(f,y)}return y}function h(f,y){const $=p(f);if($.at===y&&!$.bubble.hidden)return;if($.at=y,!y){$.bubble.hidden=!0;return}$.bubble.textContent=y.getAttribute(Gn)??"",$.bubble.hidden=!1;const x=f.defaultView,M=y.getBoundingClientRect(),k=$.bubble.getBoundingClientRect(),m=Number.parseFloat(x?.getComputedStyle(f.documentElement).getPropertyValue("--nc-host-top")??""),w=Pf(M,k,x?.innerWidth??0,Number.isFinite(m)?m:0);$.bubble.style.top=`${w.top}px`,$.bubble.style.left=`${w.left}px`,$.bubble.dataset.side=w.side}function b(){for(const f of[e,...t()]){const y=c.get(f);y&&(y.bubble.hidden=!0,y.at=null)}}function g(){for(const f of[e,...t()])f.documentElement?.toggleAttribute(xa,n);r.setAttribute("aria-pressed",n?"true":"false"),o.hidden=!n,d.textContent=` · ${a()?"tap":"point at"} anything to see what it does.`,n||b()}const v={button:r,band:o,get on(){return n},set(f){n!==f&&(n=f,g())},toggle(){v.set(!n)},attach(f){const y=f.documentElement;if(!y||y.hasAttribute("data-nc-help-mode-wired")){y?.toggleAttribute(xa,n);return}if(y.setAttribute("data-nc-help-mode-wired",""),y.toggleAttribute(xa,n),!f.head?.querySelector(`[${zd}]`)){const M=f.createElement("style");M.setAttribute(zd,""),M.textContent=vk,f.head?.append(M)}const $=f.defaultView;f.addEventListener("pointerover",M=>{!n||M.pointerType==="touch"||h(f,Bd(M.target))},!0),f.addEventListener("pointerout",M=>{!n||M.pointerType==="touch"||M.relatedTarget||h(f,null)});const x=M=>{if(!n||!a())return;const k=Bd(M.target);k&&(M.preventDefault(),M.stopPropagation(),M.type==="pointerup"&&h(f,k))};for(const M of["pointerdown","pointerup","mousedown","mouseup","click","touchstart","touchend"])f.addEventListener(M,x,{capture:!0,passive:!1});$?.addEventListener("scroll",()=>n&&h(f,null),!0),$?.addEventListener("keydown",M=>{M.defaultPrevented||M.metaKey||M.ctrlKey||M.altKey||wk(M.target)||(M.key==="?"?(M.preventDefault(),M.stopImmediatePropagation(),v.toggle()):M.key==="Escape"&&n&&(M.preventDefault(),M.stopImmediatePropagation(),v.set(!1)))},!0)}};return d.textContent=` · ${a()?"tap":"point at"} anything to see what it does.`,v}const xk=[60,120,300],$k={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function mh(e){return Math.max(0,Math.min(e.written,e.size))}function bi(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function Ek(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function Ak(e,t,n){const a=mh(e);if(a<=0)return null;const r=e.written-a;let o;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;o=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const h=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(h-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;o=u}let s="exact";if(n&&n.barFrames>0){const u=bi(e.segments,o),c=Ek(e.segments,o,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,h=o-Math.round(p),b=p===0?o:o+Math.round(n.barFrames-p);p===0?s="bar":h>=Math.max(r,c.start)&&"last"in t?(o=h,s="bar"):b<Math.min(e.written,c.end)&&(o=b,s="bar")}}const l=bi(e.segments,o)??0,d=(bi(e.segments,e.written-1)??l)+1;return{from:o,to:e.written,frame:l,endFrame:d,start:s}}function ms(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Sk(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,o=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`triki-keep-${r}-${o}-${s}.wav`}const gh="audio/wav";function Mk(e){const t=a=>String(a).padStart(2,"0");return`triki-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function Tk(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function bh(e,t,n=24){const r=n/8,o=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+o,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,o,!0),new Uint8Array(s)}class Lk{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(Tk(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([bh(this.frames,n),...this.parts],{type:gh});this.finish({blob:a,name:Mk(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const yh="netcomposer.studio.keeping.v1";function Ck(e){try{return e?.getItem(yh)!=="off"}catch{return!0}}function Ik(e,t){try{e?.setItem(yh,t?"on":"off")}catch{}}class Nk{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=$k;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?Ak(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(o=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return o(null);const l=s.plan.to-s.plan.from,d=new Blob([bh(l,s.rate,16),...s.parts],{type:gh});o({blob:d,name:Sk(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const Fk=new Set(["range","button","checkbox","radio","submit","reset","file","color","image"]);function vh(e){const t=e;if(!t||typeof t!="object")return!1;if(t.isContentEditable===!0)return!0;const n=t.tagName;return n==="TEXTAREA"?!0:n==="INPUT"&&!Fk.has(String(t.type??"text").toLowerCase())}function Pk(e,t=()=>!1){if(vh(e))return!0;const n=e;return!n||typeof n!="object"?!1:n.closest?.('dialog[open], [role="dialog"], [role="alertdialog"]')?!0:n.tagName==="SELECT"&&!t(e)}function Rk(e){const t=new Map,n=new Map,a=(r,o)=>t.get(r)?.some(s=>s.has(o))===!0;return{declare(r,o){if(typeof r!="string"||!r||!Array.isArray(o))return()=>{};const s=new Set(o.filter(d=>typeof d=="string"&&d.length>0&&d.length<32)),l=t.get(r)??[];return l.push(s),t.set(r,l),()=>{const d=t.get(r);if(!d)return;const u=d.indexOf(s);u>=0&&d.splice(u,1),d.length||t.delete(r)}},down(r,o){if(!r||typeof r.code!="string"||r.ctrlKey||r.metaKey||r.isComposing||Pk(r.target,o))return!1;const s=e.shown();if(!s||!a(s,r.code))return!1;const l=n.get(r.code);if(l!==void 0&&l!==s)return!0;let d=!1;try{d=e.deliver(s,"keydown",r)}catch{d=!1}return r.repeat||n.set(r.code,s),d},up(r){if(!r||typeof r.code!="string")return!1;const o=n.get(r.code);if(o===void 0)return!1;n.delete(r.code);try{e.deliver(o,"keyup",r)}catch{}return!0},releaseAll(){const r=[...n];n.clear();for(const[o,s]of r)try{e.deliver(s,"keyup",{code:o,key:""})}catch{}},drop(r){t.delete(r);for(const[o,s]of[...n])s===r&&n.delete(o)},codes:r=>[...new Set((t.get(r)??[]).flatMap(o=>[...o]))]}}function Dk(e,t){const n=e.document,a=new WeakSet,r=Rk({shown:t.shown,deliver(d,u,c){const p=t.frameDoc(d),h=p?.defaultView;if(!p||!h)return!1;const b=new h.KeyboardEvent(u,{code:c.code,key:c.key??"",shiftKey:c.shiftKey===!0,altKey:c.altKey===!0,repeat:c.repeat===!0,bubbles:!0,cancelable:!0});return!(p.body??p.documentElement).dispatchEvent(b)}});e.addEventListener("keydown",d=>{r.down(d,u=>a.has(u))&&(d.preventDefault(),d.stopImmediatePropagation())},!0),e.addEventListener("keyup",d=>r.up(d),!0),e.addEventListener("blur",()=>r.releaseAll()),n.addEventListener("visibilitychange",()=>{n.visibilityState==="hidden"&&r.releaseAll()}),n.addEventListener("pointerdown",d=>{const u=d.target;u?.tagName==="SELECT"&&a.add(u)},!0),n.addEventListener("keydown",d=>{if(d.code==="Tab"){const u=n.activeElement;u&&a.delete(u)}},!0);const o=new Set;let s=!1;const l=()=>{const d=vh(n.activeElement);if(d!==s){s=d;for(const u of[...o])try{u(s)}catch{}}};return n.addEventListener("focusin",l),n.addEventListener("focusout",d=>{const u=d.target;u?.tagName==="SELECT"&&a.delete(u),queueMicrotask(l)}),{route:r,onTyping(d){if(typeof d!="function")return()=>{};o.add(d);try{d(s)}catch{}return()=>o.delete(d)}}}const Jr={threshold:-3,knee:0,ratio:20,attack:.001,release:.1},Ok=(()=>{const e=Jr.threshold,t=Jr.ratio;return-.6*e*(1-1/t)})();function zk(e){return Math.floor(.006*e)}const gs=1024,_d=gs+8192,Bk=.25;function _k(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function jk(e,t,n=OfflineAudioContext){const a=new n(1,_d,e),r=a.createBuffer(1,_d,e);r.getChannelData(0)[gs]=Bk;const o=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return _k(l.getChannelData(0),gs)}function qk(e,t=()=>jk(e,n=>{const a=new DynamicsCompressorNode(n,Jr);return{input:a,output:a}})){let n=zk(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const Hk=65,Vk=60,Uk=50;function Gk(e,t,n){return t!=="ok"?!0:n?e>=Uk:e>=Vk}const Kk=90,Wk=5e3,Tr=3,Lr=1;function Yk(e,t){return e>=Kk||t>=Tr?"over":t>0?"dropout":e>=Hk?"busy":"ok"}function Xk(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function Jk(e,t){return Z[`load:${t}`].replace("{pct}",String(Math.round(e)))}class Qk{pct=0;state="ok";shown=!1;underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,Tr);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=Wk;)this.recent.shift();return this.recent.length>Tr&&this.recent.splice(0,this.recent.length-Tr),this.state=Yk(this.pct,this.recent.length),this.shown=Gk(this.pct,this.state,this.shown),this.state}}class Zk{constructor(t=Lr){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function en(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,o]of Object.entries(n))a.setAttribute(r,o);return a}function ex(e={}){const t=e.now??(()=>performance.now()),n=new Qk,a=en("span","load-fill"),r=en("span","load-pct"),o=en("span","load-word"),s=en("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(en("span","load-label"),en("span","load-bar",{"aria-hidden":"true"}),r,o),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=en("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let d=!1,u=0;const c={path:"none",pct:0,state:"ok",shown:!1,underruns:0,recent:0,readings:0,measured:!0,inject(x){d=x!==null,x&&h({pct:x.pct,underruns:x.underruns??(x.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const x=n.state;s.dataset.state=x,s.toggleAttribute("data-shown",n.shown),a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,o.textContent=Xk(x);const M=Jk(n.pct,x);s.setAttribute("aria-label",M),l.textContent=M,c.pct=n.pct,c.state=x,c.shown=n.shown,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=u,l.hidden||v()}function h(x){u++,n.read(x,t()),p()}function b(x){d||h(x)}window.setInterval(()=>{const x=n.state,M=n.shown;(n.tick(t())!==x||n.shown!==M)&&p()},500);let g=0;function v(){l.isConnected||document.body.append(l);const x=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const M=l.offsetWidth,k=8,m=Math.max(k,Math.min(x.left,window.innerWidth-M-k));l.style.top=`${Math.round(x.bottom+6)}px`,l.style.left=`${Math.round(m)}px`,l.dataset.side="below",l.style.visibility=""}function f(){l.hidden=!1,v()}function y(){window.clearTimeout(g),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",x=>{x.pointerType!=="touch"&&(window.clearTimeout(g),g=window.setTimeout(f,e.helpDelay??500))}),s.addEventListener("pointerleave",x=>{x.pointerType!=="touch"&&y()}),s.addEventListener("click",()=>l.hidden?f():y()),s.addEventListener("blur",y),document.addEventListener("pointerdown",x=>{s.contains(x.target)||y()}),document.addEventListener("keydown",x=>{x.key==="Escape"&&y()}),window.addEventListener("scroll",y,!0),p();let $=!1;return{el:s,start(x,M){if($)return c.path;$=!0;const k=x.renderCapacity;if(k&&typeof k.start=="function"){const m=new Zk(Lr);return k.addEventListener("update",w=>{const A=w,T=typeof A.timestamp=="number"?A.timestamp:x.currentTime-Lr;b({pct:(A.averageLoad??0)*100,underruns:m.take(A.underrunRatio,T)})}),k.start({updateInterval:Lr}),c.path="renderCapacity",c.path}if(M&&typeof AudioWorkletNode=="function")try{const w=Math.round((x.baseLatency??0)*x.sampleRate),A=new AudioWorkletNode(x,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:w}});return A.port.onmessage=T=>{T.data?.type==="load"&&(c.measured=T.data.measured,b({pct:T.data.load,underruns:T.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function tx(e,t){e.after(t.el)}const ca={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},nx=256*1024,ax=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",gr=e=>e.webkitRelativePath||e.name;async function rx(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,b)=>gr(h).split("/").length-gr(b).split("/").length)[0];if(!a)throw new Error(ca.noManifest);const r=await a.text();let o;try{o=JSON.parse(r)}catch{throw new Error(ca.badJson)}const s=ko(o);if(!s.ok||!s.manifest)throw new Error(ca.bad(s.errors.join("; ")));const l=s.manifest,d=ax(gr(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>gr(h)===d)??t.find(h=>h!==a&&h.name===u&&!h.webkitRelativePath);if(!c)throw new Error(ca.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>nx)throw new Error(ca.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function ox(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await cp(new TextEncoder().encode(e.dsp)),added:t}}const jd=e=>`local:${e}`,Qr=e=>e.startsWith("local:"),wh=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function kh(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(wh),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const ix="netcomposer-studio-plugins",br="plugins";function sx(e=globalThis.indexedDB){const t=kh(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(ix,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(br)||s.result.createObjectStore(br,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(br,o),h=s(p.objectStore(br));p.oncomplete=()=>u(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},r=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(wh)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return r(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const bs=My,ys=Ty,lx={skin:Hn,fill:!1};function cx(e){try{return{skin:Ra(e?.getItem(bs)),fill:e?.getItem(ys)==="1"}}catch{return{...lx}}}function dx(e,t){try{t.skin===Hn?e?.removeItem(bs):e?.setItem(bs,t.skin),t.fill?e?.setItem(ys,"1"):e?.removeItem(ys)}catch{}}function xh(e,t){try{const n=e.contentDocument;n?.documentElement&&qs(t,n)}catch{}}const ux=e=>qr.find(t=>t.id===e)?.name??e;function $e(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a}function qd(e,t){const n=qr.find(r=>r.id===t)??qr[0];if(!n)return;const a=n.swatch[Pa()];e.style.setProperty("--look-paper",a.paper),e.style.setProperty("--look-surf",a.surf),e.style.setProperty("--look-accent",a.accent)}function px(e,t,n={}){let a={...e};const r=$e("div",{class:"look"}),o=$e("span",{class:"look-dot","aria-hidden":"true"}),s=$e("span",{class:"look-word"}),l=$e("button",{type:"button",class:"ghost look-btn","aria-haspopup":"dialog","aria-expanded":"false",title:n.theme?"Theme, skin and panels":"Skin and panels"},o,s),d="look-panel";l.setAttribute("aria-controls",d);const u=qr.map(k=>{const m=$e("span",{class:"look-sw","aria-hidden":"true"},$e("i",{class:"look-sw-paper"}),$e("i",{class:"look-sw-surf"}),$e("i",{class:"look-sw-accent"})),w=$e("button",{type:"button",class:"look-chip",role:"radio","data-skin":k.id,title:k.about},m,$e("span",{class:"look-chip-name"},k.name));return w.addEventListener("click",()=>v({...a,skin:k.id},w)),w}),c=$e("div",{class:"look-chips",role:"radiogroup","aria-label":"Skin"},...u),p=["outlined","filled"].map(k=>{const m=$e("button",{type:"button",class:"look-panel-choice",role:"radio","data-panels":k},k==="filled"?"Filled":"Outlined");return m.addEventListener("click",()=>v({...a,fill:k==="filled"},m)),m}),h=$e("div",{class:"look-panels-choices",role:"radiogroup","aria-label":"Panels"},...p),b=$e("div",{class:"look-pop",id:d,role:"dialog","aria-label":"Look"},...n.theme?[$e("div",{class:"look-theme"},$e("p",{class:"look-head"},"Theme"),n.theme)]:[],$e("p",{class:"look-head"},"Skin"),c,$e("div",{class:"look-panels"},$e("p",{class:"look-head"},"Panels"),h),$e("p",{class:"look-note"},"Instrument colours stay the same in every skin."));r.append(l,b);function g(){s.textContent="Look",l.setAttribute("aria-label",`Look: ${ux(a.skin)} skin${a.fill?", filled panels":""}`),qd(o,a.skin);for(const k of u){const m=k.dataset.skin===a.skin;k.setAttribute("aria-checked",m?"true":"false"),k.tabIndex=m?0:-1,qd(k.querySelector(".look-sw"),k.dataset.skin??"")}for(const k of p){const m=k.dataset.panels==="filled"===a.fill;k.setAttribute("aria-checked",m?"true":"false"),k.tabIndex=m?0:-1}}function v(k,m){a={skin:Ra(k.skin),fill:k.fill},g(),t({...a}),m?.focus({preventScroll:!0})}const f=(k,m)=>w=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(w.key))return;w.preventDefault();const A=k.findIndex(E=>E.getAttribute("aria-checked")==="true"),T=w.key==="ArrowLeft"||w.key==="ArrowUp"?-1:1,D=(A+T+k.length)%k.length;v(m(D),k[D])};c.addEventListener("keydown",f(u,k=>({...a,skin:u[k]?.dataset.skin??Hn}))),h.addEventListener("keydown",f(p,k=>({...a,fill:p[k]?.dataset.panels==="filled"})));const y=()=>r.hasAttribute("data-open");function $(){y()||(r.setAttribute("data-open",""),l.setAttribute("aria-expanded","true"),u.find(k=>k.getAttribute("aria-checked")==="true")?.focus({preventScroll:!0}),document.addEventListener("pointerdown",M,!0))}function x(k=!1){y()&&(r.removeAttribute("data-open"),l.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",M,!0),k&&l.focus({preventScroll:!0}))}function M(k){r.contains(k.target)||x()}return l.addEventListener("click",()=>y()?x():$()),r.addEventListener("keydown",k=>{k.key==="Escape"&&y()&&(k.preventDefault(),k.stopPropagation(),x(!0))}),Hs(()=>g()),g(),{el:r,get look(){return{...a}},set(k){a={skin:Ra(k.skin),fill:k.fill},g()},open:$,close:()=>x()}}const Hd="netcomposer.studio.metronome.v1",yi={on:!0,volume:.5},fx=.2,vi=.03,Vd={accent:1600,beat:1e3};function Ud(e){try{const t=e?JSON.parse(e):{},n=typeof t.volume=="number"&&Number.isFinite(t.volume)?Math.min(1,Math.max(0,t.volume)):yi.volume;return{on:typeof t.on=="boolean"?t.on:yi.on,volume:n}}catch{return{...yi}}}function hx(e,t,n,a=Number.NEGATIVE_INFINITY){const r=[],o=Math.max(1,Math.round(n)),s=Math.max(Math.ceil(e-1e-9),Math.ceil(a-1e-9))+0;for(let l=s;l<t-1e-9;l++)r.push({beat:l,accent:(l%o+o)%o===0});return r}const mx=(e,t)=>Math.min(1,Math.max(0,e))**2*(t?.9:.6);function gx(e){const{ctx:t}=e,n=e.storage===void 0?bx():e.storage;let a=Ud(n?.getItem(Hd)??null);const r=new Set,o=new Set,s=t.createGain();s.connect(e.destination??t.destination);const l={scheduled:0};let d=Number.NEGATIVE_INFINITY,u=!1;const c=[],p=()=>a.on&&r.size>0,h=()=>{for(const y of[...o])try{y()}catch{}},b=()=>{const y=t.currentTime;for(const $ of c.splice(0))try{$.gain.gain.cancelScheduledValues(y),$.gain.gain.setValueAtTime(0,y),$.osc.stop(y+.005)}catch{}},g=(y,$)=>{const x=t.createOscillator(),M=t.createGain();x.frequency.value=$?Vd.accent:Vd.beat;const k=mx(a.volume,$);M.gain.setValueAtTime(0,y),M.gain.linearRampToValueAtTime(k,y+.001),M.gain.exponentialRampToValueAtTime(Math.max(k*.001,1e-5),y+vi),x.connect(M).connect(s),x.start(y),x.stop(y+vi+.005);const m={osc:x,gain:M,end:y+vi+.005};c.push(m),x.onended=()=>{const w=c.indexOf(m);w>=0&&c.splice(w,1);try{M.disconnect()}catch{}},l.scheduled++},v=()=>{const y=e.transport();if(!y.running){u&&b(),u=!1,d=Number.NEGATIVE_INFINITY;return}if(u||(d=Number.NEGATIVE_INFINITY),u=!0,!p())return;const $=e.now(),x=y.beatAt($),M=y.beatAt($+fx),k=hx(Math.max(x,d+1),M,y.meter?.beatsPerBar??4);for(const m of k){const w=e.toContextTime(y.timeAt(m.beat));w<t.currentTime||(g(w,m.accent),d=m.beat)}},f=e.ticker(v);return f.start(),{prefs:()=>({...a}),set(y){const $=Ud(JSON.stringify({...a,...y}));if($.on===a.on&&$.volume===a.volume)return;const x=p();a=$;try{n?.setItem(Hd,JSON.stringify(a))}catch{}x&&!p()&&b(),h()},want(y,$){if(typeof y!="string"||!y)return;const x=r.has(y);if($===x)return;const M=p();$?r.add(y):r.delete(y),M&&!p()&&b(),h()},active:p,onChange(y){return o.add(y),()=>o.delete(y)},bus:s,stats:l,dispose(){f.dispose(),b(),s.disconnect(),o.clear()}}}function bx(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const wi=36,yx=16,vx=10,$h=1,Eh=64,wx=new Set([120,123]);function kx(e){if(!e||typeof e.length!="number"||e.length<2)return null;const t=Number(e[0]);if(!Number.isInteger(t)||t<128||t>=240)return null;const n=t&240,a=(t&15)+1,r=Number(e[1])&127,o=e.length>2?Number(e[2])&127:0;if(n===144||n===128){if(e.length<3)return null;const s=n===144&&o>0,l=s?o:0;return a===vx&&r>=wi&&r<wi+yx?{type:"pad",channel:a,pad:r-wi+1,note:r,velocity:l,on:s}:{type:"note",channel:a,note:r,velocity:l,on:s}}if(n===224){if(e.length<3)return null;const s=(o<<7|r)-8192,l=s<0?s/8192:s/8191;return{type:"bend",channel:a,value:Math.max(-1,Math.min(1,l))}}return n===176?e.length<3?null:wx.has(r)?{type:"all-off",channel:a}:{type:"cc",channel:a,controller:r,value:o}:null}const Gd=e=>Math.max(0,Math.min(1,Math.round(e)/127)),xx=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Kd=e=>`${xx[(e%12+12)%12]}${Math.floor(e/12)-1}`;function $x(e){return e.type==="note"?e.on?`${Kd(e.note)} · velocity ${e.velocity} · channel ${e.channel}`:`${Kd(e.note)} off · channel ${e.channel}`:e.type==="pad"?e.on?`Pad ${e.pad} · velocity ${e.velocity}`:`Pad ${e.pad} off`:e.type==="bend"?`Pitch bend ${e.value>=0?"+":"−"}${Math.abs(e.value).toFixed(2)}`:e.type==="all-off"?`All notes off · channel ${e.channel}`:e.controller===$h?`Mod ${e.value} · channel ${e.channel}`:e.controller===Eh?`Sustain ${e.value>=64?"down":"up"}`:`CC ${e.controller} · ${e.value} · channel ${e.channel}`}function Ex(e){const t=String(e??"");return/\b(MCU|HUI|DIN[\s_-]*THRU|ALV)\b/i.test(t)||/^MIDIIN\d+\s*\(/i.test(t.trim())}function Ax(e){const t=String(e??"").trim();return/mini\s*lab\s*3/i.test(t)?"MiniLab 3":(t.replace(/\s+MIDI(\s+\d+)?$/i,"").trim()||t||"MIDI keyboard").slice(0,32)}const Ah="triki.midi",Wd={connected:!1,keys:"front"};function yr(e){try{const t=e?.getItem(Ah);if(!t)return{...Wd};const n=JSON.parse(t),a=typeof n.keys=="string"&&n.keys.length>0&&n.keys.length<=64?n.keys:"front";return{connected:n.connected===!0,keys:a}}catch{return{...Wd}}}function ki(e,t){try{e?.setItem(Ah,JSON.stringify({v:1,...t}))}catch{}}function Sx(e){const t=new Map,n=[];let a=null,r=null,o="front";const s=new Map,l=new Set;let d=!1;const u=new Set,c=new Set,p=new Set,h=new Set;let b=null;const g=m=>{const w=t.get(m);return w?.length?{keys:w.some(A=>A.keys),pads:w.some(A=>A.pads)}:null},v=(m,w)=>{try{e.deliver(m,w)}catch{}},f=()=>{if(o!=="front"&&g(o)?.keys)return o;const m=e.front();return m&&g(m)?.keys?m:a&&g(a)?.keys?a:null},y=()=>{const m=e.front();return m&&g(m)?.pads?m:r&&g(r)?.pads?r:null},$=()=>{for(const[m,w]of[...s])s.delete(m),M(m,w);l.clear();for(const m of u)v(m,{kind:"bend",value:0,at:x()});for(const m of c)v(m,{kind:"mod",value:0,at:x()});u.clear(),c.clear();for(const m of p)v(m,{kind:"release-all"});p.clear()},x=()=>typeof performance<"u"?performance.now():Date.now(),M=(m,w,A=x())=>{const T=Number(m.slice(1));m[0]==="p"?v(w,{kind:"pad",pad:T,velocity:0,on:!1,at:A}):v(w,{kind:"note",note:T,velocity:0,on:!1,at:A})},k=()=>{const m=f();m!==b&&(b=m,$())};return{declare(m,w){if(typeof m!="string"||!m)return()=>{};const A={keys:w?.keys===!0,pads:w?.pads===!0},T=t.get(m)??[];return T.push(A),t.set(m,T),n.includes(m)||n.push(m),e.front()===m&&(A.keys&&(a=m),A.pads&&(r=m)),b=f(),()=>{const D=t.get(m);if(!D)return;const E=D.indexOf(A);E>=0&&D.splice(E,1),D.length||t.delete(m)}},drop(m){t.delete(m);const w=n.indexOf(m);w>=0&&n.splice(w,1);for(const[A,T]of[...s])T===m&&s.delete(A);u.delete(m),c.delete(m),p.delete(m),a===m&&(a=null),r===m&&(r=null),k()},shown(m){const w=g(m);w?.keys&&(a=m),w?.pads&&(r=m),k()},pin(m){o=typeof m=="string"&&m?m:"front",k()},get pinned(){return o},keysTarget:f,padsTarget:y,keyInstances:()=>n.filter(m=>g(m)?.keys),message(m,w,A){const T=Number.isFinite(w)?w:x();if(m.type==="note"){const S=`n${m.note}`;if(!m.on){const F=s.get(S);if(F===void 0)return;if(d){l.add(S);return}s.delete(S),M(S,F,T);return}const C=f();if(!C)return;b=C;const N=s.get(S);N!==void 0&&M(S,N,T),l.delete(S),s.set(S,C),p.add(C),v(C,{kind:"note",note:m.note,velocity:Gd(m.velocity),on:!0,at:T,...A?{device:A}:{}});return}if(m.type==="pad"){const S=`p${m.pad}`;if(!m.on){const F=s.get(S);if(F===void 0)return;s.delete(S),M(S,F,T);return}const C=y();if(!C)return;const N=s.get(S);N!==void 0&&M(S,N,T),s.set(S,C),p.add(C),v(C,{kind:"pad",pad:m.pad,velocity:Gd(m.velocity),on:!0,at:T,...A?{device:A}:{}});return}if(m.type==="all-off"){$();return}if(m.type==="bend"){const S=f();if(!S)return;m.value===0?u.delete(S):u.add(S),v(S,{kind:"bend",value:m.value,at:T});return}if(m.controller===Eh){const S=m.value>=64;if(S===d)return;if(d=S,!S){for(const C of[...l]){const N=s.get(C);s.delete(C),N!==void 0&&M(C,N,T)}l.clear()}return}if(m.controller===$h){const S=f();if(!S)return;const C=Math.max(0,Math.min(1,m.value/127));C===0?c.delete(S):c.add(S),v(S,{kind:"mod",value:C,at:T});return}const D=e.front(),E={channel:m.channel,controller:m.controller,value:m.value,at:T,instance:D||null};for(const S of[...h])try{S(E)}catch{}},releaseAll(){d=!1,$()},onControl(m){return typeof m!="function"?()=>{}:(h.add(m),()=>h.delete(m))},held:()=>Object.fromEntries(s)}}const Mx=120,Tx=1e3;function ce(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))a.setAttribute(r,o);return a.append(...n),a}function Lx(e){return typeof e?.requestMIDIAccess=="function"}function Cx(e,t){const n=Number(e);return!Number.isFinite(n)||n<=0||n>t+5||n<t-Tx?t:n}function Ix(e){const t=e.nav??(typeof navigator>"u"?void 0:navigator),n=e.now??(()=>performance.now()),a=Lx(t);let r=a?"off":"none",o=null;const s=new Map;let l="",d=null;const u=ce("span",{class:"picker-dot","aria-hidden":"true"}),c=ce("span",{class:"picker-label"},"MIDI"),p=ce("button",{type:"button",class:"ghost picker-link midi-link","data-midi":r,"aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"midi-pop"},u,c),h=ce("div",{class:"midi-pop",id:"midi-pop",role:"dialog","aria-label":"MIDI keyboard"}),b=ce("div",{class:"midi"},p,h);a||(b.dataset.unsupported="");const g=()=>{try{return e.store()}catch{return null}},v=()=>[...new Set([...s.values()].map(R=>R.name))];function f(){p.dataset.midi=r;const R=v(),B=r==="on"&&R.length?R.length===1?R[0]:`${R[0]} +${R.length-1}`:r==="blocked"?"MIDI blocked":"MIDI";c.textContent!==B&&(c.textContent=B),p.setAttribute("aria-label",r==="on"?R.length?`MIDI: ${R.join(", ")} connected`:"MIDI: connected, no keyboard plugged in":r==="ask"?"MIDI: waiting for the browser":r==="blocked"?"MIDI: blocked by the browser":r==="none"?"MIDI: this browser can't use MIDI keyboards":"MIDI: connect a keyboard"),S()&&M(),e.onChange?.(r)}function y(R,B,_){return ce("div",{class:"midi-row"},ce("span",{class:"midi-k"},R),ce("span",{class:"midi-v"},B,..._?[ce("span",{class:"midi-sub","data-midi-sub":""},_)]:[]))}function $(){const R=ce("select",{class:"midi-select","data-midi-id":"keys","aria-label":"Keys play"});R.append(ce("option",{value:"front"},"The tab in front"));const B=e.router.keyInstances(),_=e.router.pinned;for(const G of B){const de=e.label(G);de&&R.append(ce("option",{value:G},de))}return R.value=_!=="front"&&B.includes(_)?_:"front",R.addEventListener("change",()=>k(R.value)),ce("span",{class:"midi-dd"},R)}function x(){const R=e.router.keysTarget(),B=R?e.label(R):null;return B?`now ${B}`:"no instrument with keys"}function M(){const R=[],B=G=>ce("h4",{class:"midi-head"},G),_=(...G)=>ce("p",{class:"midi-fine"},...G);if(r==="none")R.push(B("MIDI keyboard"),ce("p",{},"This browser can’t use MIDI keyboards. Open TRIKI in Chrome, Edge or Firefox to play it from one."),_("Safari and every iPhone browser have no Web MIDI."));else if(r==="ask")R.push(B("MIDI keyboard"),ce("p",{},"Waiting for your browser. Choose ",ce("b",{},"Allow")," in its question at the top left."),_("Firefox asks to add a small site permission first. Said no by mistake? Click the icon left of the address and allow MIDI devices."));else if(r==="blocked"){const G=ce("button",{type:"button",class:"midi-btn primary","data-midi-id":"connect"},"Try again");G.addEventListener("click",()=>void T()),R.push(B("MIDI keyboard"),ce("p",{},"Your browser blocks MIDI devices for this site."),G,_("Click the icon left of the address, allow MIDI devices, then try again."))}else if(r==="off"){const G=ce("button",{type:"button",class:"midi-btn primary","data-midi-id":"connect"},"Connect");G.addEventListener("click",()=>void T()),R.push(B("MIDI keyboard"),ce("p",{},"Play TRIKI from a USB keyboard, with real velocity, on the instrument in front."),G,_("Your browser asks once to allow MIDI devices.",ce("br"),"Chrome, Edge and Firefox. Not Safari."))}else{const G=v(),de=ce("div",{class:"midi-dev"},ce("i",{"aria-hidden":"true"}),G.length?G.join(", "):"No keyboard plugged in"),oe=ce("span",{class:"midi-mono","data-midi-id":"last"},G.length?`last: ${l||"nothing yet"}`:"Plug one in: it shows here."),Ee=ce("button",{type:"button",class:"midi-link-btn","data-midi-id":"disconnect"},"Disconnect");Ee.addEventListener("click",()=>{D(),N(!0)}),R.push(de,oe,y("Keys play",$(),x()),ce("div",{class:"midi-links"},Ee))}h.replaceChildren(...R)}function k(R){e.router.pin(R),ki(g(),{...yr(g()),keys:e.router.pinned}),S()&&M()}function m(){p.dataset.activity="",d&&clearTimeout(d),d=setTimeout(()=>{d=null,delete p.dataset.activity},Mx)}function w(R){const B=Ax(R.name);R.onmidimessage=_=>{const G=kx(_?.data);if(!G)return;const de=Cx(_?.timeStamp,n());if(e.router.message(G,de,B),!(G.type==="note"&&!G.on)&&(l=$x(G),m(),S())){const oe=h.querySelector('[data-midi-id="last"]');oe&&(oe.textContent=`last: ${l}`)}},s.set(R.id,{port:R,name:B})}function A(){if(!o)return;const R=new Set;for(const _ of o.inputs.values())_.state==="disconnected"||Ex(_.name)||(R.add(_.id),s.has(_.id)||w(_));let B=!1;for(const[_,G]of[...s])R.has(_)||(G.port.onmidimessage=null,s.delete(_),B=!0);B&&e.router.releaseAll(),f()}async function T(R=!1){if(!(!a||!t)&&r!=="on"){R||(r="ask",f());try{o=await t.requestMIDIAccess({sysex:!1}),o.onstatechange=()=>A(),r="on",ki(g(),{...yr(g()),connected:!0}),A()}catch{o=null,r=R?"off":"blocked",f()}}}function D(){e.router.releaseAll();for(const R of s.values())R.port.onmidimessage=null;s.clear(),o&&(o.onstatechange=null),o=null,l="",r=a?"off":"none",ki(g(),{...yr(g()),connected:!1}),f()}async function E(){const R=yr(g());if(e.router.pin(R.keys),!a||!R.connected)return;let B="";try{B=(await t.permissions?.query({name:"midi"}))?.state??""}catch{B=""}B==="granted"&&await T(!0)}const S=()=>b.hasAttribute("data-open");function C(){S()||(b.setAttribute("data-open",""),p.setAttribute("aria-expanded","true"),M(),document.addEventListener("pointerdown",F,!0),document.addEventListener("keydown",U,!0))}function N(R=!1){S()&&(b.removeAttribute("data-open"),p.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",F,!0),document.removeEventListener("keydown",U,!0),R&&p.focus({preventScroll:!0}))}function F(R){b.contains(R.target)||N()}function U(R){R.key!=="Escape"||!S()||(R.preventDefault(),R.stopPropagation(),N(b.contains(document.activeElement)||document.activeElement===document.body))}return p.addEventListener("click",()=>S()?N():C()),f(),{el:b,get look(){return r},devices:v,last:()=>l,connect:()=>T(),disconnect:D,autoConnect:E,refresh(){S()&&M()},open:C,close:()=>N()}}const It=-54,Wa=6,ht=-It/(Wa-It),Nx=-6,vs=(Nx-It)/(Wa-It);function Zr(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:It+t*(Wa-It)}function Fx(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Px(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function zt(e){return Fx(Zr(e))}function Rx(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function Dx(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:zt(n.position))}function fl(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-It)/(Wa-It)))}function Yd(e){return fl(Px(e))}const Xd=[0,-6,-12,-24,-48].map(e=>({value:fl(e),label:e===0?"0":`−${-e}`})),Ox=1;function zx(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function Jd(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<It?0:fl(Math.min(Wa,n)):null}function Bx(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const hl="netcomposer.studio.mix.v1",Sh={position:vs,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},Mh=-12,Th=24,_x=.5;function Lh(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(Th,Math.max(Mh,e))*10)/10;return t===0?0:t}const jx=8;function qx(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=jx?e:0}function Ba(){return{v:1,channels:{},master:ht,returns:{a:{on:!0,level:ht},b:{on:!0,level:ht}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const $a=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Hx=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,eo=(e,t)=>typeof e=="boolean"?e:t,Bt=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Vx(e){const t=Bt(e);return{position:$a(t.position,Sh.position),mute:eo(t.mute,!1),solo:eo(t.solo,!1),sendA:Math.min(ht,$a(t.sendA,0)),sendB:Math.min(ht,$a(t.sendB,0)),pan:Hx(t.pan),shade:qx(t.shade),trim:Lh(t.trim)}}function Ch(e){const t=Ba(),n=Bt(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(Bt(n.channels)))u.length>0&&u.length<=64&&(a[u]=Vx(c));const r=Bt(n.returns),o=(u,c)=>{const p=Bt(u);return{on:eo(p.on,c.on),level:$a(p.level,c.level)}},s={},l=Bt(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(Bt(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:$a(n.master,t.master),returns:{a:o(r.a,t.returns.a),b:o(r.b,t.returns.b)},insert:{on:eo(Bt(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function Ih(){try{return globalThis.localStorage??null}catch{return null}}function Ux(e=Ih()){try{const t=e?.getItem(hl);return t?Ch(JSON.parse(t)):Ba()}catch{return Ba()}}function Nh(e,t=Ih()){try{return t?.setItem(hl,JSON.stringify(e)),t!==null}catch{return!1}}const Ea=-48,Qd=24,Gx=-1,ws=32,Kx=250,Wx=1200,Yx=.2,Fh=1.5,Xx=[-48,-24,-12,0],ks="−",Zd=e=>e>0?20*Math.log10(e):-1/0;function _a(e){return e>Ea?e>=0?1:(e-Ea)/-Ea:0}function Ph(e){return e>0?e>=Qd?1:e/Qd:0}function xs(e,t=!1){if(t)return`${e>.05?ks:""}${Math.abs(e).toFixed(1)} dB`;if(!(e>Ea))return"—";const n=Math.round(e*10)/10;return`${n<0?ks:n>0?"+":""}${Math.abs(n).toFixed(1)}`}function nt(e,t,n){const a=e.createElement("span");return a.className=t,n!==void 0&&(a.textContent=n),a}function Jx(e=globalThis.document){Zx(e);const t=e.createElement("div");t.className="nc-comp-gauge",t.setAttribute("aria-hidden","true");for(const[a,r]of[["in","In"],["gr","GR"],["out","Out"]]){t.append(nt(e,"nc-comp-gauge-label",r));const o=nt(e,"nc-comp-gauge-bar");o.dataset.ncGauge=a,o.append(nt(e,"nc-comp-gauge-fill"),nt(e,"nc-comp-gauge-peak")),a!=="gr"&&o.append(nt(e,"nc-comp-gauge-hot")),a==="in"&&o.append(nt(e,"nc-comp-gauge-th")),t.append(o,nt(e,"nc-comp-gauge-val",a==="gr"?xs(0,!0):xs(-1/0)))}const n=nt(e,"nc-comp-gauge-ticks");for(const a of Xx){const r=nt(e,"",a===0?"0":`${ks}${-a}`);r.style.left=`${_a(a)*100}%`,n.append(r)}return t.append(nt(e,""),n,nt(e,"")),t}const Qx=`
/* A compressor's level gauge (comp-gauge.js; Peter, 2026-11-27, option B): IN, GR, OUT rows, the number at the end of
   each, the dBFS ticks under them. IN and OUT in ink like every meter, the hot colour within 1 dB of full scale; GR
   (filling from the right) and the threshold tick in the instrument's colour (--nc-gauge-gr, set by the app). Rectangles,
   no radius. The loop writes transforms, so nothing transitions. Switched off: GR and OUT grey, IN keeps moving. */
.nc-comp-gauge {
  --nc-gauge-gr-color: var(--nc-gauge-gr, var(--nc-ui-accent));
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  column-gap: var(--nc-ui-control-gap, var(--nc-ui-space-6));
  row-gap: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.25);
  align-items: center;
  min-width: 0;
}
.nc-comp-gauge-label {
  font-size: var(--nc-ui-label-size);
  font-weight: var(--nc-ui-label-weight);
  letter-spacing: var(--nc-ui-label-tracking);
  text-transform: uppercase;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-val {
  min-width: 6ch;
  text-align: right;
  font-family: var(--nc-ui-font-readout);
  font-size: var(--nc-ui-readout-size-small);
  font-variant-numeric: tabular-nums;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-gauge-gr-color); }
.nc-comp-gauge-bar { position: relative; height: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.5); background: var(--nc-ui-divider); }
.nc-comp-gauge-fill {
  position: absolute;
  inset: 0;
  transform-origin: left;
  transform: scaleX(0);
  background: var(--nc-ui-text);
  transition: none;
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-fill { transform-origin: right; background: var(--nc-gauge-gr-color); }
.nc-comp-gauge-hot { position: absolute; top: 0; bottom: 0; right: 0; width: calc(var(--nc-ui-hairline) * 4); background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); display: none; }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-hot { display: block; }
.nc-comp-gauge-peak {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(var(--nc-ui-hairline) * 2);
  margin-left: calc(var(--nc-ui-hairline) * -1);
  background: var(--nc-ui-text);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-peak { background: var(--nc-ui-text); }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-peak { background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); }
.nc-comp-gauge-peak[hidden], .nc-comp-gauge-th[hidden] { display: none; }
.nc-comp-gauge-th {
  position: absolute;
  top: calc(var(--nc-ui-hairline) * -4);
  bottom: calc(var(--nc-ui-hairline) * -4);
  width: 0;
  border-left: calc(var(--nc-ui-hairline) * 1.5) solid var(--nc-gauge-gr-color);
}
.nc-comp-gauge-ticks { position: relative; height: calc(var(--nc-ui-readout-size-small) * 1.2); margin-top: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * -0.5); }
.nc-comp-gauge-ticks > span {
  position: absolute;
  transform: translateX(-50%);
  font-family: var(--nc-ui-font-readout);
  font-size: calc(var(--nc-ui-readout-size-small) * 0.85);
  color: var(--nc-ui-text-sub);
  white-space: nowrap;
}
/* A narrow column (NYX's Hacks): only the ends of the scale. */
.nc-comp-gauge { container-type: inline-size; }
@container (max-width: 240px) { .nc-comp-gauge-ticks > span:not(:first-child):not(:last-child) { display: none; } }
.nc-comp-gauge-ticks > span:first-child { transform: none; }
.nc-comp-gauge-ticks > span:last-child { transform: translateX(-100%); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar:not([data-nc-gauge="in"]) > .nc-comp-gauge-fill { background: var(--nc-ui-text-sub); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-ui-text-sub); }
.nc-ui-fx > .nc-comp-gauge { margin-bottom: var(--nc-ui-control-gap, var(--nc-ui-space-6)); }
`;function Zx(e){if(!e?.head||e.head.querySelector("style[data-nc-comp-gauge]"))return;const t=e.createElement("style");t.dataset.ncCompGauge="",t.textContent=Qx,e.head.append(t)}const to=new WeakMap,eu=new WeakMap;function tu(e,t,n){const a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;const r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}const no=e=>e.doc.defaultView?.performance?.now()??Date.now();function e$(e){let t=eu.get(e);if(t)return t;const n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1};const a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(const o of r){const s=to.get(o.target);s&&(s.seen=o.isIntersecting,ao(s))}ro(t)})),e.addEventListener("visibilitychange",()=>{for(const r of t.recs)ao(r);ro(t)}),eu.set(e,t),t}function ao(e){const t=e.loop.io?e.seen&&e.el.isConnected:e.el.isConnected,n=!e.dead&&!!e.source&&t&&e.loop.doc.visibilityState!=="hidden";if(n&&!e.open){const a=typeof e.source.open=="function"?e.source.open():!0;e.open=a!==!1,e.open&&(e.loop.loud=no(e.loop))}else!n&&e.open&&(e.open=!1,e.source?.close?.(),Es(e))}function ro(e){let t=!1;for(const n of e.recs)n.open&&(t=!0);if(!t)return Rh(e);e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=no(e)),!e.raf&&!e.timer&&$s(e,!1)}function $s(e,t){const n=e.doc.defaultView;n&&(t?e.timer=n.setTimeout(()=>(e.timer=0,xi(e,no(e))),Kx):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(a=>(e.raf=0,xi(e,a))):e.timer=n.setTimeout(()=>(e.timer=0,xi(e,no(e))),ws))}function Rh(e){const t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function xi(e,t){if(e.last&&!e.idle&&t-e.last<ws-4)return $s(e,!1);const n=e.last?Math.min(.25,(t-e.last)/1e3):ws/1e3;e.last=t;let a=!1,r=!1;for(const o of e.recs){if(!o.el.isConnected){o.placed&&Dh(o);continue}o.placed=!0,o.open&&(a=!0,t$(o,n,t)&&(e.loud=t),o.disp.some(s=>s>0)&&(r=!0))}if(!a)return Rh(e);e.idle=t-e.loud>Wx&&!r,$s(e,e.idle)}function t$(e,t,n){e.fall<0&&(e.fall=tu(e.el,"motion-meter-fall",Yx),e.hold=tu(e.el,"motion-meter-hold",Fh));let a=null;try{a=e.source.read()}catch{a=null}const r=e.on();!r&&e.wasOn&&(e.disp[1]=e.disp[2]=0,e.peakDb[1]=0,e.peakDb[2]=-1/0),e.wasOn=r;const o=Zd(Number(a?.in)||0),s=r?Zd(Number(a?.out)||0):-1/0,l=r?Math.max(0,Number(a?.gr)||0):0,d=[_a(o),Ph(l),_a(s)],u=[o,l,s],c=e.fall>0?Math.exp(-t/e.fall):0;for(let p=0;p<3;p++){const h=d[p];e.disp[p]=h>=e.disp[p]?h:h+(e.disp[p]-h)*c,e.disp[p]<.001&&(e.disp[p]=0);const b=u[p]>=e.peakDb[p];(b||n-e.peakAt[p]>e.hold*1e3)&&(b?(e.peakDb[p]=u[p],e.peakAt[p]=n):e.peakDb[p]=Math.max(p===1?l:u[p],e.peakDb[p]-t*20))}return ml(e,r),o>Ea||l>0}function ml(e,t){const n=e.el.querySelectorAll(":scope > .nc-comp-gauge-bar"),a=e.el.querySelectorAll(":scope > .nc-comp-gauge-val"),r=t?"false":"true";e.el.dataset.ncOff!==r&&(e.el.dataset.ncOff=r);for(let d=0;d<3;d++){const u=n[d];if(!u)continue;const c=d===1,p=Math.round(e.disp[d]*1e3)/1e3,h=c?Ph(e.peakDb[d]):_a(e.peakDb[d]),b=!c&&e.peakDb[d]>=Gx?"true":"false",g=`${p}|${Math.round(h*1e3)}|${b}`;if(e.shown[d]!==g){e.shown[d]=g;const f=u.children[0],y=u.children[1];f.style.transform=`scaleX(${p})`,y.style.left=c?`${(1-h)*100}%`:`${h*100}%`,y.hidden=h<=0,u.dataset.hot=b}const v=xs(e.peakDb[d],c);a[d]&&a[d].textContent!==v&&(a[d].textContent=v)}const o=e.el.querySelector(".nc-comp-gauge-th"),s=e.threshold(),l=typeof s=="number"&&Number.isFinite(s)?`${_a(s)*100}%`:"";o&&o.style.left!==l&&(o.style.left=l,o.hidden=!l)}function Es(e){e.disp=[0,0,0],e.peakDb=[-1/0,0,-1/0],e.peakAt=[0,0,0],e.shown=["","",""],ml(e,e.on())}function Dh(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e),e.loop.io?.unobserve(e.el),to.get(e.el)===e&&to.delete(e.el)}function n$(e,t){const n=e.ownerDocument??globalThis.document,a=e$(n),r={el:e,loop:a,open:!1,dead:!1,seen:!1,placed:!1,source:t?.source??null,threshold:t?.threshold??(()=>null),on:t?.on??(()=>!0),wasOn:!0,disp:[0,0,0],peakDb:[-1/0,0,-1/0],peakAt:[0,0,0],shown:["","",""],fall:-1,hold:Fh};if(to.set(e,r),a.recs.add(r),a.io?.observe(e),Es(r),!a.io){const o=n.defaultView,s=()=>{ao(r),ro(a)};typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(s):setTimeout(s,0)}return{set(o){if(r.dead)return;r.threshold=o?.threshold??r.threshold,r.on=o?.on??r.on;const s=o?.source??null;s!==r.source&&(r.open&&(r.open=!1,r.source?.close?.()),r.source=s,Es(r)),ml(r,r.on()),ao(r),ro(a)},destroy(){Dh(r)}}}const nu=new WeakMap;function a$(e,t){if(!e)return null;let n=nu.get(e);if(!n||!n.el.isConnected||n.el.parentElement!==e){n?.binding.destroy();const a=Jx(e.ownerDocument);t?.help&&(a.dataset.ncHelp=t.help);const r=t?.after??e.querySelector(":scope > .nc-ui-fx-hd");r&&r.parentElement===e?r.after(a):e.prepend(a),n={el:a,binding:n$(a,t)},nu.set(e,n)}else n.binding.set(t);return t?.color&&n.el.style.setProperty("--nc-gauge-gr",t.color),n.el}const To=3;function r$(e,t=To){return Math.max(1,Math.ceil(e/t))}function au(e,t=To){return Math.max(0,Math.floor(e/t))}function o$(e,t,n,a=null,r=To){const o=r$(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return au(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?au(d,r):Math.min(o,Math.max(0,e.page))}const i$=["M0 10 L0 1 L20 1 L20 10","M0 10 C3 10 6 1 12 1 L20 1","M0 10 C10 10 16 6 20 1 L20 10","M0 10 L0 1 L3 1 C5 1 6 9 11 10 L20 10","M0 8 C8 8 12 2 20 2"],vr="Custom";function ru(e,t){const n={};for(const a of he("gate")?.dials??[])n[a.key]=Number(e.getParam(t,a.key)??a.default);return n}function s$(e,t,n,a,r){const o=he("gate"),s=m=>o?.dials.find(w=>w.key===m),l=t.getPattern(n)??{levels:Array(16).fill(100),shapes:Array(16).fill(0)},d=ru(t,n),u=d.steps===8?8:16,c=mp(d),p=m=>`hack-${e}-${n}-${m}`,h=vb({dials:d,pattern:l}),b=(m,w)=>{t.setParam(n,m,w),r.render()},g=(m,w)=>{const A=s(m);return A?.options?{type:"choice",id:p(m),label:A.label,caption:w,value:String(d[m]),options:A.options.map(T=>({value:String(T.value),label:T.label})),onChange:T=>b(m,Number(T))}:null},v=m=>{const w=s(m);return w?r.dial(w):null},f={type:"levelSteps",id:p("steps-strip"),label:`${h===vr?"Gate":h} steps`,steps:l.levels.slice(0,u).map((m,w)=>({level:m/100,shape:l.shapes[w]})),played:c,swing:.5+.25*(d.swing??0)/100,on:a,shapes:gb.map((m,w)=>({value:w,label:m,icon:i$[w]})),curve:(m,w)=>kb(d,l,m,w),onLevels:m=>{const w=l.levels.slice();m.forEach((A,T)=>{w[T]=Math.round(A*100)}),t.setPattern(n,{levels:w}),r.render()},onShape:(m,w)=>{const A=l.shapes.slice();A[m]=w,t.setPattern(n,{shapes:A}),r.render()},onShapeAll:m=>{t.setPattern(n,{shapes:Array(16).fill(m)}),r.render()},playhead:()=>{const m=t.beatAt(r.heardAt());return m?{step:wb(ru(t,n),m.beat,m.beatsPerBar),locked:m.locked}:null},help:Z["gate:steps"]},$=[{type:"select",id:p("pattern"),label:"Pattern",value:h,options:[...qn.map(m=>({value:m.name,label:m.name})),{value:vr,label:vr}],onChange:m=>{m!==vr&&(t.setGatePattern(n,m),r.render())}},f,g("rate","Rate"),v("swing"),v("depth"),v("mix")],x=d.mode===1,M=[g("steps","Steps"),g("mode","Mode"),v("smooth"),v("spread"),...x?[v("res")]:[]],k=m=>m!==null;return{controls:$.filter(k),more:M.filter(k)}}const Oh=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function l$(e,t){if(!Oh(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function c$(e,t,n){if(!Oh(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const ou="plugin-url",$i="plugin-folder",iu="plugin-files",Ei="kept:",Ai="forget:",Si="listed:",d$="../plugins/registry.json",K={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function u$(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Rr))if(a===e)return t[Number(n)];return"Stopped."}function da(e){if(Qr(e))return K.thisComputer;try{return new URL(e).host||e}catch{return e}}function p$(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function f$(e){const t=new URL(d$,e.base).href;let n=[];const a=new Set,r=new Map,o=[],s=new Set,l=()=>{for(const k of s)k()},d=k=>String(k?.message??k).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??kh();let p=[];const h=new Map,b=new Set,g=k=>{b.has(k)||(b.add(k),l())},v=e.frozen,f=async()=>{try{p=await c.list()}catch(k){console.warn(`Studio plugins: can't read this computer's plugins (${d(k)})`)}l()},y=f(),$=u?pb(t,{fetch:e.fetch}).then(k=>{n=k.registry.plugins;for(const w of k.errors)console.warn(`Studio plugins: registry ${w}`);l();const m=o.splice(0);m.length&&M.restore(m)}).catch(k=>{console.info(`Studio plugins: no listed plugins (${d(k)})`)}):Promise.resolve(),x=async(k,m)=>{a.add(k),r.delete(k),l();try{const{entry:w,stale:A}=await m();return w.plugin&&(A&&g(w.plugin.id),v?.clear(w.plugin.id)),w.type}catch(w){throw r.set(k,d(w)),w}finally{a.delete(k),l()}},M={listed:()=>n,loaded:()=>zg().filter(k=>!k.plugin.listed&&!Qr(k.plugin.url)),remote:u,local:()=>p,stale:k=>b.has(k),frozen:k=>!!v?.has(k),async addPicked(k){const m=await ox(k);v?.clear(m.id);const w=he(`plugin:${m.id}`);if(w){const T=w.plugin?.version===m.version&&h.get(m.id)===m.sha256;return await c.put(m),await f(),T||g(m.id),T?{type:w.type}:{reload:!0}}const A=await x(m.id,()=>gc(e.ctx,{manifest:m.manifest,dsp:m.dsp,dspName:m.dspName},{moduleUrl:e.moduleUrl,url:jd(m.id)}));return h.set(m.id,m.sha256),await c.put(m),await f(),{type:A}},async loadKept(k){v?.clear(k);const m=he(`plugin:${k}`),w=await c.get(k);if(m){const T=h.get(k);return w&&T&&T!==w.sha256&&g(k),m.type}if(!w)throw new Error(K.notKept);const A=await x(k,()=>gc(e.ctx,{manifest:w.manifest,dsp:w.dsp,dspName:w.dspName},{moduleUrl:e.moduleUrl,url:jd(k)}));return h.set(k,w.sha256),A},async forget(k){await c.remove(k),await f()},listingFor(k){const m=n.find(A=>A.id===k.id);if(!m)return null;const w=new URL(m.manifest,t).href;return!k.url||k.url===w?m:null},loading:k=>a.has(k),async loadListed(k){v?.clear(k);const m=he(`plugin:${k}`);if(m)return m.type;await $;const w=n.find(A=>A.id===k);if(!w)throw new Error(`${k} isn't listed`);return x(k,()=>fb(e.ctx,w,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(k){return x("url",()=>pp(e.ctx,k,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(k){for(const m of k)if(!(m.status!=="missing"||a.has(m.id)||he(`plugin:${m.id}`))&&!v?.has(m.id)){if(Qr(m.url)){y.then(()=>{p.some(w=>w.id===m.id)&&!a.has(m.id)&&!he(`plugin:${m.id}`)&&M.loadKept(m.id).catch(()=>{})});continue}if(u){if(!n.length){o.some(w=>w.id===m.id)||o.push(m);continue}M.listingFor(m)&&M.loadListed(m.id).catch(()=>{})}}},onChange(k){return s.add(k),()=>s.delete(k)},problem:k=>r.get(k)??null,clearProblem(k){r.delete(k)&&l()}};return M}const zh="netcomposer.studio.sends.v2";function h$(e){try{return e?.getItem(zh)==="1"}catch{return!1}}function m$(e,t){try{e?.setItem(zh,t?"1":"0")}catch{}}function g$(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function oo(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function b$(e){return oo(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function y$(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function su(e,t){return e&&!t}function v$(e,t,n){return e&&oo(t).kind==="none"&&n.every(a=>a===0)}const Bh="netcomposer.studio.strip-fold.v1";function _h(e){try{const t=e?.getItem(Bh),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function jh(e,t){try{e?.setItem(Bh,JSON.stringify([...t].sort()))}catch{}return t}function qh(e,t,n){const a=new Set(_h(e));return n?a.add(t):a.delete(t),jh(e,a)}function w$(e,t){return qh(e,t,!1)}function k$(e,t){const n=new Set(t),a=_h(e),r=new Set([...a].filter(o=>n.has(o)));return r.size===a.size?a:jh(e,r)}function x$(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(o=>o!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function $$(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function Hh(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const o=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;o<a&&(n=r,a=o)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function As(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const o={id:t,before:r};return x$(e,o).every((l,d)=>l===e[d])?null:o}const E$=-18,A$=-20,Vh=3,S$=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],lu=[-20,-10,-7,-5,-3,0,1,2,3],M$=.3,T$=6.638/M$,L$=48;function C$(e){return e-E$}function Uh(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Vh)/20))):e>0?1:0}function I$(e){return e>0?Uh(C$(20*Math.log10(e))):0}function gl(e){return(Math.min(1,Math.max(0,e))*2-1)*L$}const cu={x:0,v:0};function N$(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=T$,o=e.x-t,s=e.v+r*o,l=Math.exp(-r*n),d=t+(o+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function F$(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Gh="netcomposer.studio.vu.v1";function P$(e){try{return e?.getItem(Gh)==="1"}catch{return!1}}function R$(e,t){try{e?.setItem(Gh,t?"1":"0")}catch{}}const Kh="netcomposer.studio.vu-fold.v1";function D$(e){try{return e?.getItem(Kh)==="1"}catch{return!1}}function O$(e,t){try{e?.setItem(Kh,t?"1":"0")}catch{}}const z$="http://www.w3.org/2000/svg",Ss=200,Mi=112,Ln=Ss/2,Aa=132,du=100,B$=108,_$=105,j$=116,q$=103,H$=112,kt=(e,t)=>{const n=document.createElementNS(z$,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},uu=e=>Math.round(e*100)/100;function Sa(e,t){const n=gl(Uh(e))*Math.PI/180;return[uu(Ln+t*Math.sin(n)),uu(Aa-t*Math.cos(n))]}function pu(e,t,n){const[a,r]=Sa(e,n),[o,s]=Sa(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const V$=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function fu(e){const t=kt("svg",{class:"vu-meter",viewBox:`0 0 ${Ss} ${Mi}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(kt("rect",{class:"vu-face",x:.5,y:.5,width:Ss-1,height:Mi-1,rx:4})),t.append(kt("path",{class:"vu-arc",d:pu(A$,0,du)})),t.append(kt("path",{class:"vu-zone",d:pu(0,Vh,q$)}));for(const o of S$){const[s,l]=Sa(o,du),[d,u]=Sa(o,lu.includes(o)?B$:_$);t.append(kt("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const o of lu){const[s,l]=Sa(o,j$),d=kt("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(o)===20||o===3?V$(o):String(Math.abs(o)),t.append(d)}const n=kt("text",{class:"vu-legend",x:Ln,y:92,"text-anchor":"middle"});n.textContent="VU";const a=kt("text",{class:"vu-side",x:10,y:Mi-10});a.textContent=e;const r=kt("line",{class:"vu-needle",x1:Ln,y1:Aa,x2:Ln,y2:Aa-H$,transform:`rotate(${gl(0)} ${Ln} ${Aa})`});return t.append(n,a,r),{svg:t,needle:r}}function U$(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",Z["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",Z["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",Z["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(y=>{const $=document.createElement("span");$.className="vu-bar",$.dataset.side=y;const x=document.createElement("span");return x.className="vu-bar-fill",$.append(x),l.append($),x});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=fu("L"),h=fu("R");t.append(n,p.svg,h.svg,l);const b=matchMedia("(prefers-reduced-motion: reduce)"),g=[cu,cu],v=[Number.NaN,Number.NaN],f=[p.needle,h.needle];return{el:t,frame(y,$){let x=!1;for(const M of[0,1]){const k=y?I$(y[M]):0;g[M]=N$(g[M],k,$,b.matches),(!F$(g[M],k)||k>0)&&(x=!0);const m=Math.round(gl(g[M].x)*10)/10;m!==v[M]&&(v[M]=m,f[M].setAttribute("transform",`rotate(${m} ${Ln} ${Aa})`),d[M].style.transform=`scaleY(${Math.max(0,Math.min(1,g[M].x)).toFixed(3)})`,t.dataset[M===0?"vuL":"vuR"]=m.toFixed(1))}return x}}}const G$="netcomposer.studio.hidden.v1",wr=1/120,xt="master",hu="Inserts",K$="(max-width: 768px)",Wh=8,Cr=e=>Rx(Zr(e)),mu=e=>{const t=Cr(e);return t==="−∞"?"off":`${t} dB`};function W$(e,t){return Nn.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Y$(e,t,n){const a=n.bpm,r=L=>{const P=n.order(),O=P.indexOf(L);return O<0?P.length:O},o=(L,P,O,V)=>{const q=W$(O,V);if(!q||!P)return null;const ee=Number(P.getParam(O,V)??q.default),ie=`mix-${L}-${V}`;return q.options?{type:"select",id:ie,label:q.label,value:String(ee),options:q.options.map(H=>({value:String(H.value),label:H.label})),onChange:H=>{P.setParam(O,V,Number(H)),ue.render()}}:{type:"slider",id:ie,label:q.label,min:q.min,max:q.max,step:q.step??1,taper:Nc(q),value:ee,valueText:q.format(ee,a()),onChange:H=>{P.setParam(O,V,H),ue.render()}}},s=(L,P,O,V)=>V.map(q=>o(L,P,O,q)).filter(q=>q!==null),l=matchMedia(K$);let d=null;const u=L=>{d=L,ue.render()},c=L=>u(d===L?null:L);l.addEventListener("change",()=>ue.render());const p=(L,P,O,V)=>{L.setParam(P,O,V),ue.render()},h=(L,P,O,V)=>Wb(P,O,{id:`hack-${L}-${O}-graph`,on:V,set:(q,ee)=>p(P,O,q,ee),help:{graph:Z["eq:graph"],low:Z["eq:low"],mid:Z["eq:mid"],high:Z["eq:high"]}}),b=(L,P,O,V)=>{const q=Number(P.getParam(O,V.key)??V.default),ee=`hack-${L}-${O}-${V.key}`,ie=H=>p(P,O,V.key,H);return V.options?{type:"select",id:ee,label:V.label,value:String(q),options:V.options.map(H=>({value:String(H.value),label:H.label})),onChange:H=>ie(Number(H))}:{type:"slider",id:ee,label:V.label,min:V.min,max:V.max,step:V.step??.001,taper:Nc(V),value:q,valueText:ap(V,q,a()),onChange:ie}},g="",v={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let f=uk(Le(),`${xt}/${fh}`);const y=L=>({folded:f.has(L),onFold:P=>{f=uh(Le(),L,P),ue.render()},foldHelp:Z["fx:fold"]}),$=n.plugins;$?.onChange(()=>ue.render());const x=new Map,M=L=>String(L?.message??L).replace(/^nc-fx plugins?: /,""),k=(L,P,O)=>{x.set(L,P),ue.render(),Mt({message:O,duration:9e3,anchor:me.el.querySelector(`[data-nc-id='hack-${L}-add']`)})},m=(L,P)=>{const O=Mt({message:P,duration:12e3,actionLabel:K.reloadAction,onAction:()=>location.reload(),anchor:me.el.querySelector(`[data-nc-id='hack-${L}-add']`)});O.el.dataset.pluginReload=L},w=L=>he(L)?.label??L,A=L=>!!L&&L.startsWith("plugin:")&&!!$?.stale(L.slice(7)),T=async(L,P,O)=>{if(!$)return null;const V=O??await Zy({title:K.urlTitle,body:K.urlBody,field:{label:K.urlField,placeholder:$.remote?K.urlPlaceholder:K.urlPlaceholderLocal,type:"url"},confirmLabel:K.urlNext,returnFocus:P??void 0});if(!V)return null;const q=p$(V,location.href,$.remote);if(!q)return k(L,K.badUrlShort,$.remote?K.badUrl:K.badUrlLocal),null;if(!await pt({title:K.warnTitle,body:K.warnBody(da(q)),confirmLabel:K.warnLoad,danger:!0,returnFocus:P??void 0}))return null;try{const ie=await $.loadUrl(q);return A(ie)&&m(L,K.reloadToHear(w(ie))),ie}catch(ie){return ie?.reload?(x.set(L,K.failedShort),ue.render(),m(L,M(ie))):k(L,K.failedShort,M(ie)),null}},D=L=>{const P=document.createElement("input");return P.type="file",P.hidden=!0,P.dataset.ncId="plugin-files",L?P.webkitdirectory=!0:(P.multiple=!0,P.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(P),new Promise(O=>{const V=q=>{P.remove(),O(q)};P.addEventListener("change",()=>V(P.files?.length?[...P.files]:null)),P.addEventListener("cancel",()=>V(null)),P.click()})},E=async(L,P,O)=>{if(!$)return null;const V=await D(O);if(!V)return null;let q;try{q=await rx(V)}catch(ie){return k(L,K.failedShort,M(ie)),null}if(!await pt({title:K.warnTitle,body:K.fileWarnBody(q.manifest.name,q.manifest.author),confirmLabel:K.warnLoad,danger:!0,returnFocus:P??void 0}))return null;try{const ie=await $.addPicked(q);return"reload"in ie?(m(L,K.reloadToUse(q.manifest.name,q.manifest.version)),null):ie.type}catch(ie){return k(L,K.failedShort,M(ie)),null}},S=async(L,P,O)=>{if(!$)return;const V=$.local().find(ee=>ee.id===P)?.name??P;await pt({title:K.forgetTitle(V),body:K.forgetBody,confirmLabel:K.forgetConfirm,danger:!0,returnFocus:O??void 0})&&(await $.forget(P),Mt({message:K.forgotten(V),duration:5e3,anchor:me.el.querySelector(`[data-nc-id='hack-${L}-add']`)}))},C=async(L,P,O,V)=>{x.delete(L);let q=O;if(O===$i||O===iu)q=await E(L,V,O===$i);else if(O.startsWith(Ai))await S(L,O.slice(Ai.length),V),q=null;else if(O.startsWith(Ei)&&$){ue.render();try{q=await $.loadKept(O.slice(Ei.length)),A(q)&&m(L,K.reloadToHear(w(q)))}catch(ee){k(L,K.failedShort,M(ee)),q=null}}else if(O===ou)q=await T(L,V);else if(O.startsWith(Si)&&$){ue.render();try{q=await $.loadListed(O.slice(Si.length))}catch(ee){k(L,K.failedShort,M(ee)),q=null}}q&&P.addEffect(q,{dials:v[q]}),ue.render()},N=()=>$?[...$.listed().map(L=>({value:`${Si}${L.id}`,label:L.name,group:"Plugins"})),...$.local().map(L=>({value:`${Ei}${L.id}`,label:K.kept(L.name),group:"Plugins"})),...$.loaded().map(L=>({value:L.type,label:`${L.label} (${da(L.plugin.url)})`,group:"Plugins"})),{value:$i,label:K.folder,group:"Plugins"},{value:iu,label:K.files,group:"Plugins"},{value:ou,label:K.url,group:"Plugins"},...$.local().map(L=>({value:`${Ai}${L.id}`,label:K.forget(L.name),group:"Plugins"}))]:[];let F=null,U=null,R=null;const B=L=>t.masterFx===L||t.list().some(P=>P.fx===L),_=L=>requestAnimationFrame(()=>me.el.querySelector(L)?.focus()),G=(L,P,O,V,q,ee,ie)=>{const H=l$(O.getState(),V);if(!H||!O.removeEffect(V))return;const Me=!!ie&&ie===document.activeElement;if(R?.close(),ue.render(),Me){const Qt=O.getChain()[H.index];_(Qt?`[data-nc-id='hack-${L}-${Qt.id}'] [data-nc-fx-remove]`:`#hack-${L}-add-type`)}const te=Mt({message:`${q} removed from ${P}.`,actionLabel:"Undo",anchor:me.el.querySelector("[data-nc-area='fx']"),onAction:()=>de(L,O,H,ee),onClose:()=>{R===te&&(R=null)}});te.el.dataset.insertUndo=L,R=te},de=(L,P,O,V)=>{if(!B(P))return;const q=c$(P.getState(),O,V);let ee=O.slot.id;if(q)P.setState(q);else{const{type:ie,dials:H,bypass:Me,pattern:te}=O.slot;ee=P.addEffect(ie,{index:O.index,dials:H,bypass:Me}),ee&&te&&P.setPattern(ee,te)}ee&&(d=L,U=`hack-${L}-${ee}`,ue.render(),_(`[data-nc-id='hack-${L}-${ee}'] [data-nc-fx-remove]`))},oe=(L,P,O,V)=>{const q=O.getChain(),ee=q.map((H,Me)=>{const te=he(H.type),Qt=te?.dials??[],tc=ge=>G(L,P,O,H.id,H.name,V,ge),nc=ge=>{O.moveEffect(H.id,ge),U=`hack-${L}-${H.id}`,ue.render()},aa=[];Me>0&&aa.push({type:"button",id:`hack-${L}-${H.id}-left`,label:"Move left",on:!1,onPress:()=>nc(Me-1)}),Me<q.length-1&&aa.push({type:"button",id:`hack-${L}-${H.id}-right`,label:"Move right",on:!1,onPress:()=>nc(Me+1)}),aa.push({type:"button",id:`hack-${L}-${H.id}-remove`,label:"Remove",ariaLabel:`Remove ${H.name} from ${P}`,on:!1,onPress:()=>tc(document.getElementById(`hack-${L}-${H.id}-remove`))});const ac={onRemove:ge=>tc(ge),removeLabel:`Remove ${H.name}`},ye=H.plugin,Xe=(ge,Zt,yn=!1)=>({type:"note",id:`hack-${L}-${H.id}-${ge}`,...yn?{tone:"danger"}:{},text:Zt});if(ye&&ye.status==="missing"){const ge=$?.listingFor(ye)??null,Zt=Qr(ye.url),yn=Zt&&!!$?.local().some(nr=>nr.id===ye.id),rc=$?.loading(ye.id)??!1,oc=rc?[Xe("missing",K.loading)]:[Xe("missing",$?.frozen(ye.id)?K.frozenShort:Zt&&!yn?K.notKept:ye.url?K.missing:K.missingNoUrl,!0),Xe("through",K.through),Xe("kept",K.dialsKept),...ye.url?[Xe("from",K.from(da(ye.url)))]:[]];return $&&ye.url&&!rc&&oc.push({type:"button",id:`hack-${L}-${H.id}-load`,label:ge||yn?K.load:Zt?K.pickAgain:K.loadAsk,ariaLabel:ge||yn?`Load ${ye.name}`:Zt?`Pick ${ye.name}'s folder (asks first)`:`Load ${ye.name} from ${da(ye.url)} (asks first)`,on:!1,onPress:()=>{const nr=document.getElementById(`hack-${L}-${H.id}-load`);ge?$.loadListed(ye.id).catch(()=>ue.render()):yn?$.loadKept(ye.id).catch(()=>ue.render()):Zt?E(L,nr,!0).then(()=>ue.render()):T(L,nr,ye.url)}}),{type:"fx",id:`hack-${L}-${H.id}`,title:`${Me+1} · ${H.name}`,...y(`${L}/${H.id}`),depth:Me%4+1,controls:oc,more:aa,...ac}}const bn=te&&"plugin"in te?te.plugin:void 0,og=bn?[Xe("by",`By ${bn.author}`),Xe("version",`${bn.licence} · ${bn.version}`),Xe("source",bn.listed?"Listed":K.from(da(bn.url)))]:[],ig=ye?.status==="failed"?[Xe("failed",u$(ye.error),!0),Xe("through",K.through),Xe("retry",K.retry)]:ye&&$?.stale(ye.id)?[Xe("newcode",K.newCode)]:[],tr=H.type==="gate"?s$(L,O,H.id,!H.bypass,{dial:ge=>b(L,O,H.id,ge),render:()=>ue.render(),heardAt:()=>t.ctx.currentTime-(t.ctx.outputLatency||0)}):null;return{type:"fx",id:`hack-${L}-${H.id}`,title:`${Me+1} · ${H.name}`,...y(`${L}/${H.id}`),depth:Me%4+1,on:!H.bypass,meter:sr(O,H.id)??void 0,meterHelp:Z["fx:meter"],onToggle:ge=>{O.setParam(H.id,"bypass",!ge),ue.render()},controls:tr?tr.controls:[...ig,...H.type==="eq"?[h(L,O,H.id,!H.bypass)]:[],...Qt.filter(ge=>!ge.more).map(ge=>b(L,O,H.id,ge))],maxHelp:Z["fx:max"],...ac,more:[...tr?tr.more:Qt.filter(ge=>ge.more).map(ge=>b(L,O,H.id,ge)),...og,...aa]}}),ie=q.length>=V;return ee.push({type:"fx",id:`hack-${L}-add`,title:`${P} · Inserts`,...y(`${L}/add`),depth:q.length%4+1,controls:[{type:"note",id:`hack-${L}-note`,...x.get(L)?{tone:"danger"}:{},text:x.get(L)??($?.loading("url")||$?.listed().some(H=>$.loading(H.id))||$?.local().some(H=>$.loading(H.id))?K.loading:ie?`${q.length} of ${V}: the stack is full.`:q.length===0?"No effects yet.":`${q.length} of ${V}, first to last.`)},...ie?[]:[{type:"select",id:`hack-${L}-add-type`,label:"Add",value:g,options:[{value:g,label:"Effect…"},...Rg.map(H=>({value:H,label:he(H)?.label??H})),...N()],onChange:H=>{if(H===g)return;const Me=document.getElementById(`hack-${L}-add-type`);Me instanceof HTMLSelectElement&&(Me.value=g),C(L,O,H,Me)}}]]}),ee},Ee=L=>{const P=t.returns[L];return{type:"slider",id:`mix-${L}-return`,label:"Return",min:0,max:1,step:wr,value:P.level,valueText:mu(P.level),onChange:O=>t.setReturn(L,{level:O})}};let ke=h$(Le());const X=()=>g$(globalThis.window,{portrait:Rf,landscape:Fp}),Ae=()=>{const L=b$({hacksShown:d,sendsShown:ke});d=L.hacksShown,L.sendsShown!==ke&&(ke=L.sendsShown,m$(Le(),ke)),ue.render()},Se=(L,P,O)=>{const V=$$(n.order(),L,P);if(!V)return;n.onReorder?.(V.id,V.before);const ee=me.el.querySelector(`${_t}[data-nc-id="strip-${CSS.escape(L)}"]`)?.querySelector(O);ee&&document.activeElement!==ee&&ee.focus()};let tt=k$(Le(),n.order());const yt=()=>v$(X(),{hacksShown:d,sendsShown:ke},t.list().map(L=>L.strip.trim)),ng=()=>[...t.list()].sort((L,P)=>r(L.id)-r(P.id)).map(L=>({type:"strip",id:`strip-${L.id}`,label:L.name,value:L.strip.position,valueText:Cr(L.strip.position),step:wr,defaultValue:vs,resetText:`${Cr(vs)} dB`,ticks:[...Xd],mute:L.strip.mute,solo:L.strip.solo,silent:L.silent,sendsHidden:su(X(),ke),onChange:P=>t.set(L.id,{position:P}),onTypeIn:P=>{const O=Jd(P);O!==null&&t.set(L.id,{position:O})},onRemove:P=>n.onRemove(L.id,P),folded:tt.has(L.id),onFold:P=>{tt=qh(Le(),L.id,P),ue.render()},foldHelp:Z["strip:fold"],foldedHelp:Z["strip:folded"],onMove:P=>Se(L.id,P,"[data-nc-strip-grip]"),shade:L.strip.shade,onShade:P=>t.set(L.id,{shade:P??0}),...L.fx?{hacks:d===L.id,hacksLabel:hu,hacksEmpty:L.fx.getChain().length===0,onHacks:()=>c(L.id)}:{},trim:{id:`trim-${L.id}`,value:L.strip.trim,min:Mh,max:Th,step:_x,defaultValue:0,ariaLabel:`${L.name} trim`,help:Z["strip:trim"],onChange:P=>t.set(L.id,{trim:Lh(P)})},trimHidden:yt(),pan:{id:`pan-${L.id}`,value:L.strip.pan,ariaLabel:`${L.name} pan`,help:Z["strip:pan"],onChange:P=>t.set(L.id,{pan:Math.abs(P)<.005?0:P})},onMute:()=>t.set(L.id,{mute:!L.strip.mute}),onSolo:()=>t.set(L.id,{solo:!L.strip.solo}),sends:["A","B"].map(P=>{const O=P==="A"?"sendA":"sendB",V=L.strip[O];return{id:`send-${P.toLowerCase()}-${L.id}`,label:P,ariaLabel:`${L.name} send ${P}`,min:0,max:ht,step:wr*2,value:V,valueText:mu(V),defaultValue:0,onChange:q=>t.set(L.id,{[O]:q})}})})),ag=()=>({type:"strip",id:`strip-${xt}`,label:"Master",master:!0,sendsHidden:su(X(),ke),trimRow:!0,trimHidden:yt(),onSendsView:Ae,sendsView:oo({hacksShown:d,sendsShown:ke}).kind==="sends",sendsViewEmpty:!y$(t.list().map(L=>L.strip)),sendsViewLabel:"Sends",sendsViewHelp:Z["sends:view"],...t.masterFx?{hacks:d===xt,hacksLabel:hu,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(xt)}:{},channels:2,value:t.masterPositionValue,valueText:Cr(t.masterPositionValue),step:wr,defaultValue:ht,resetText:"0.0 dB",ticks:[...Xd],onChange:L=>t.setMaster(L),onTypeIn:L=>{const P=Jd(L);P!==null&&t.setMaster(P)}});let Kl=sh(Le());const Wl=L=>({folded:Kl[L],foldSlim:!0,onFold:P=>{Kl=lh(Le(),L,P),ue.render()},foldHelp:Z["fx:fold"]});let ta=P$(Le()),gn=null,na=!0;const Yl=L=>{ta=L,na=!0,R$(Le(),L),ue.render()},Xl=()=>{const L=t.returns.a,P=t.returns.b,O=d===xt&&t.masterFx?{id:xt,name:"Master",fx:t.masterFx}:(()=>{const te=t.list().find(Qt=>Qt.id===d);return te?.fx?{id:te.id,name:te.name,fx:te.fx}:null})();O||(d=null);const V=t.masterFx?.getChain()??[],q=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:L.on,onToggle:te=>t.setReturn("a",{on:te}),meter:sr(L.fx)??void 0,meterHelp:Z["fx:meter-return"],...Wl("a"),controls:[Ee("a"),...s("a",L.fx,"plate",["decay","size"])],more:s("a",L.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:P.on,onToggle:te=>t.setReturn("b",{on:te}),meter:sr(P.fx)??void 0,meterHelp:Z["fx:meter-return"],...Wl("b"),controls:[Ee("b"),...s("b",P.fx,"delay",["delay_beats","feedback"])],more:s("b",P.fx,"delay",["tone","low_cut"])}],ee=O?[...oe(O.id,O.name,O.fx,O.id===xt?hs:Wh)]:ke?q:[],ie=O?.id??"sends",H=ee.map(te=>te.id),Me=o$(F,ie,H,U);return F={key:ie,ids:H,page:Me},U=null,{id:"mix",title:"Mix",summary:`${t.list().map(te=>te.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${V.filter(te=>!te.bypass).map(te=>te.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...ng(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(te=>({value:te.id,label:te.available===!1?`${te.name} (soon)`:te.name,disabled:te.available===!1})),onAdd:te=>n.onAdd(te)}]},{id:"fx",area:"fx",label:O?`${O.name} inserts`:"Send effects",pageSize:To,page:Me,onPage:te=>{F&&(F={...F,page:te})},controls:ee},...ta?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[ag()]}]}},me=Ew(Xl(),G$),Jl=()=>me.el.toggleAttribute("data-hacks-folded",oo({hacksShown:d,sendsShown:ke}).kind==="none"&&l.matches);Jl();const st=document.createElement("button");st.type="button",st.className="nc-page-action vu-add",st.dataset.vuAdd="",st.textContent="+ Meters",st.setAttribute("aria-label","Add VU meters"),st.setAttribute("data-nc-help",Z["vu:add"]),st.addEventListener("click",()=>{Yl(!0),gn?.el.querySelector("[data-vu-remove]")?.focus()}),me.el.querySelector(".nc-module-end")?.prepend(st);const Ql=()=>me.el.toggleAttribute("data-sends-hidden",!ke);Ql();const Zl=()=>{st.hidden=ta;const L=me.el.querySelector('[data-nc-section="meters"]');!ta||!L||(gn??=U$({onRemove:()=>{Yl(!1),st.focus()},folded:D$(Le()),onFold:P=>{na=!0,O$(Le(),P)}}),gn.el.parentElement!==L&&L.append(gn.el))};Zl(),eE(me.el,n,Se),Z$(me.el,t,n),bu(me.el),gu(me.el),Aw(e,[me],"adjacent");const ec=L=>({peak:Yd(L.peak),rms:Yd(L.rms),over:L.peak>=Ox});function rg(){const L=[];for(const P of t.list()){if(!P.fx)continue;const O=we.find(V=>P.id===V.id||P.id.startsWith(`${V.id}#`));L.push({id:P.id,fx:P.fx,color:O?.identity?`var(--nc-ui-${O.identity})`:"var(--nc-ui-accent)"})}t.masterFx&&L.push({id:xt,fx:t.masterFx,color:"var(--nc-ui-accent)"});for(const P of L)for(const O of P.fx.getChain()){if(O.type!=="compressor")continue;const V=me.el.querySelector(`[data-nc-id="hack-${P.id}-${O.id}"]`);if(!V)continue;const q=P.fx,ee=a$(V,{source:sr(q,O.id),color:P.color,threshold:()=>{const ie=q.getParam(O.id,"threshold_db");return typeof ie=="number"?ie:null},on:()=>q.getParam(O.id,"bypass")===!1});ee&&Z["fx:comp-gauge"]&&(ee.dataset.ncHelp=Z["fx:comp-gauge"])}}const ue={module:me,get hacksShown(){return d},showHacks:u,render(){me.update(Xl()),rg(),Jl(),Zl(),Ql(),bu(me.el),gu(me.el)},frame(L){if(me.el.dataset.ncOpen!=="true")return;for(const O of t.list())ad(me.el,`strip-${O.id}`)?.update([ec(O.levels())],L);const P=t.masterLevels();if(ad(me.el,`strip-${xt}`)?.update(P.map(ec),L),gn&&ta){const O=t.ctx.state==="running";O&&(na=!0),na&&(na=gn.frame(O?[P[0].rms,P[1].rms]:null,L))}}};return ue}const _t=".nc-strip:not([data-nc-master])",Ir=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,X$="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",J$=6,Q$=400,kr=12;function gu(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?Z["inserts:master"]:Z["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",Z["mix:sends"])}function bu(e){for(const t of e.querySelectorAll(`${_t} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",Z["strip:name"]);for(const t of e.querySelectorAll(`${_t} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Z$(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(_t),s=Ir(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(h=>h.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=il,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",Z["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=h=>{if(c)return;c=!0;const b=u.value;u.remove(),l.removeAttribute("data-renaming"),h&&b!==d&&n.onRename?.(s,b)};u.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",h=>h.stopPropagation())})}function eE(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},o=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(_t)].map(c=>{const p=c.getBoundingClientRect();return{id:Ir(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const h=c.strip.parentElement;if(h&&h.scrollWidth>h.clientWidth){const v=h.getBoundingClientRect();p<v.left+kr*2?h.scrollLeft-=kr:p>v.right-kr*2&&(h.scrollLeft+=kr)}const b=Hh(l(),p),g=b?As(t.order(),c.id,b):null;c.mark=g?b:null,r(),c.mark&&e.querySelector(`${_t}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const h=p.closest(X$),b=h?.closest(_t),g=Ir(b??null);if(!h||!b||!g)return;const v={id:g,strip:b,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:h.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=v,v.touch&&!v.grip&&(v.timer=window.setTimeout(()=>{a===v&&!v.active&&s(v)},Q$)),v.grip&&!v.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<J$)return;if(p.touch&&!p.grip)return o();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const h=p.active?p.mark:null,b=p.active;if(o(),!b)return;u();const g=h?As(t.order(),p.id,h):null;g&&t.onReorder?.(g.id,g.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&o()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&o()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,h=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!h||p.closest("input, [data-nc-strip-grip]"))return;const b=Ir(h.closest(_t));if(!b)return;c.preventDefault();const g=h.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":h.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(b,c.key==="ArrowLeft"?-1:1,g)})}const tE=1e-5,nE=2e3,aE=500,Ma={parked:!1,quietSince:null};function rE(e,t,n,a){if(t)return Ma;if(e.parked)return e;if(!(n<tE))return Ma;const r=e.quietSince??a;return{parked:a-r>=nE,quietSince:r}}const yu=e=>10**(e/20),$t=.012,Ti=1024,vu=32768;class oE{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:Ma,b:Ma};parkMeters;parkScratch=new Float32Array(vu);masterPosition=ht;channels=[];listeners=new Set;scratch=new Float32Array(Ti);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Ti});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:zt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,Jr),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const o=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:zt(ht)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:ht}};this.returns={a:o("a"),b:o("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:vu});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),o=this.restore?.(t)??Sh,s=new GainNode(this.ctx,{gain:yu(o.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:Ti}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const h=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),b=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),g=new GainNode(this.ctx,{gain:1}),v=new GainNode(this.ctx,{gain:1}),f=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(h).connect(b),b.connect(g,0).connect(f,0,0),b.connect(v,1).connect(f,0,1),f.connect(this.bus),f.connect(u).connect(this.returns.a.bus),f.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:h,split:b,balL:g,balR:v,panner:f,meter:d,sendA:u,sendB:c,fx:p,strip:o},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(o=>o.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}channelOutDb(t){const n=this.channels.find(a=>a.id===t);return n?n.strip.trim+Zr(n.strip.position)+Zr(this.masterPosition)+Ok:null}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(zt(t),this.ctx.currentTime,$t),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,$t),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(zt(a.level),r,$t)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>zt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=Ma,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=rE(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=Dx(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,$t),a.trim.gain.setTargetAtTime(yu(a.strip.trim),n,$t),a.sendA.gain.setTargetAtTime(zt(a.strip.sendA),n,$t),a.sendB.gain.setTargetAtTime(zt(a.strip.sendB),n,$t);const[o,s]=Bx(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,$t),a.balR.gain.setTargetAtTime(s,n,$t)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),zx(this.scratch)}emit(){for(const t of this.listeners)t()}}const at=1e-9,xr=new WeakMap;function iE(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,o={sent:{notes:0,off:0,routes:0,audition:0,controls:0,release:0},played:{events:0,refused:0},events:0,errors:0},s=new Set,l=()=>e.nowBeat?.()??null,d=new Set,u=()=>{for(const k of[...d])try{k()}catch{}},c=(k,m)=>!r.has(k)||t.get(m)?.targets.get(k)?.layer===!0,p=(k,m)=>{const w=n.get(k);if(!(!w||m.kind==="played")&&!(m.kind!=="routes"&&!c(k,m.source))){o.sent[m.kind]++,m.kind==="notes"&&(o.events+=m.events.length);try{w(m)}catch{o.errors++}try{e.onDeliver?.(k,m)}catch{}}},h=k=>{const m=[];for(const w of t.values()){const A=w.targets.get(k);A?.on&&c(k,w.handle.id)&&m.push({source:w.handle.id,name:w.handle.name,role:A.role,...A.octave===void 0?{}:{octave:A.octave},...A.transpose?{transpose:A.transpose}:{},...A.layer?{layer:!0}:{}})}return m},b=(k,m,w)=>{!k.targets.get(m)?.on||!w.length||p(m,Od(k.handle.id,w.map(A=>({...A}))))},g=(k,m)=>{const w=l();return k.controls.filter(A=>(w===null||A.beat>=w-at)&&(xr.get(A)??m)===m)},v=k=>p(k,ik(h(k))),f=(k,m,w)=>{const A=k.targets.get(m);if(!A?.on||!w.length)return;const T=wu(gi(k.handle.id,k.run,w,A.role,{...A.octave===void 0?{}:{octave:A.octave}}),A.transpose??0);T.length&&p(m,rk(k.handle.id,T))},y=(k,m)=>{const w=[...k.current,...k.kept.filter(T=>T.startBeat<m-at)];if(!w.length)return[];let A=w[0];for(const T of w)T.startBeat>A.startBeat+at&&(A=T);return w.filter(T=>T.hit===A.hit&&Math.abs(T.startBeat-A.startBeat)<=at)},$=(k,m)=>{const w=l(),A=D=>(xr.get(D)??m)===m;if(w===null)return k.kept.filter(A);const T=k.kept.filter(D=>D.startBeat>=w-at);return(a.has(m)?[...y(k,w),...T]:T).filter(A)},x=k=>{const m=l();m!==null&&k.kept.length&&k.kept[0].startBeat<m-at&&(k.current=y(k,m),k.kept=k.kept.filter(w=>w.startBeat>=m-at)),m!==null&&k.controls.length&&(k.controls=k.controls.filter(w=>w.beat>=m-at))};function M(k,m){const w=t.get(k);w&&w.handle.remove();const A={handle:void 0,run:1,kept:[],current:[],controls:[],targets:new Map,status:null,takeBack:null},T=()=>t.get(k)===A,D={id:k,name:m,send(E,S){if(!T()||!E.length||S!==void 0&&(typeof S!="string"||!S))return;x(A);const C=E.map(N=>({...N}));if(S!==void 0)for(const N of C)xr.set(N,S);if(A.kept.push(...C),S!==void 0)A.targets.has(S)&&f(A,S,C);else for(const N of A.targets.keys())f(A,N,C)},sendControls(E,S){if(!T()||!Array.isArray(E)||!E.length||S!==void 0&&(typeof S!="string"||!S))return;const C=Dd(Od(k,[...E]));if(!(!C||C.kind!=="controls")){if(x(A),S!==void 0)for(const N of C.events)xr.set(N,S);if(A.controls.push(...C.events),S!==void 0)A.targets.has(S)&&b(A,S,C.events);else for(const N of A.targets.keys())b(A,N,C.events)}},audition(E,S){if(!T()||!E.length||!(S>0))return;const C=Math.min(S,ps),N=E.map(R=>({...R})),F=()=>{if(T())for(const[R,B]of A.targets){if(!B.on||a.has(R))continue;const _=wu(gi(k,0,N,B.role,{...B.octave===void 0?{}:{octave:B.octave}}),B.transpose??0);_.length&&p(R,sk(k,_,C))}};let U;try{U=e.startAudio?.()}catch{U=void 0}U?U.then(F,F):F()},restart(){T()&&(A.run++,A.kept=[],A.current=[],A.controls=[])},release(E,S){if(!T()||!Array.isArray(E)||!E.length||S!==void 0&&(typeof S!="string"||!S))return;const C=new Set(E.map(N=>N.hit));A.kept=A.kept.filter(N=>!C.has(N.hit));for(const[N,F]of A.targets){if(!F.on||S!==void 0&&N!==S)continue;const U=gi(k,A.run,E,F.role,{...F.octave===void 0?{}:{octave:F.octave}});for(let R=0;R<U.length;R+=Xr)p(N,ok(k,U.slice(R,R+Xr).map(B=>B.id)))}},off(E,S){if(T()){A.kept=S===void 0?[]:A.kept.filter(C=>C.startBeat<S-at),(S===void 0||A.current.some(C=>C.startBeat>=S-at))&&(A.current=[]),A.controls=S===void 0?[]:A.controls.filter(C=>C.beat<S-at);for(const[C,N]of A.targets)N.on&&p(C,hr(k,E??"stop",S))}},setTarget(E,S){if(!T()||typeof E!="string"||!E)return;const C=A.targets.get(E),N=sE(S.transpose),F={role:S.role,on:S.on===!0,...S.octave===void 0?{}:{octave:S.octave},...N?{transpose:N}:{},...S.layer===!0?{layer:!0}:{}};A.targets.set(E,F);const U=C!==void 0&&C.layer===!0!=(F.layer===!0),R=C&&(C.role!==F.role||C.octave!==F.octave||(C.transpose??0)!==(F.transpose??0))&&C.on;C?.on&&(!F.on||R)&&p(E,hr(k,"off")),(!C||C.on!==F.on||R||U)&&v(E),F.on&&(!C?.on||R)&&(f(A,E,$(A,E)),b(A,E,g(A,E))),(!C||C.on!==F.on)&&u()},removeTarget(E){const S=A.targets.get(E);!T()||!S||(A.targets.delete(E),S.on&&(p(E,hr(k,"removed")),v(E)))},targets:()=>[...A.targets].map(([E,S])=>({target:E,...S})),remove(){if(!T())return;const E=[...A.targets].filter(([,S])=>S.on).map(([S])=>S);for(const S of E)p(S,hr(k,"removed"));t.delete(k);for(const S of E)v(S);u()},status(E){if(!T())return;const S=E&&typeof E.now=="string"&&typeof E.next=="string"?{now:E.now.slice(0,32),next:E.next.slice(0,32)}:null;JSON.stringify(S)!==JSON.stringify(A.status)&&(A.status=S,u())},onTakeBack(E){T()&&(A.takeBack=typeof E=="function"?E:null)}};return A.handle=D,t.set(k,A),D}return{source:M,sources:()=>[...t.values()].map(k=>k.handle),host:k=>({notesIn(m,w){if(typeof m!="function")return()=>{};const A=w?.takes==="pitch",T=w?.takes==="layer",D=!n.has(k)||a.has(k)!==A||r.has(k)!==T;n.set(k,m),A?a.add(k):a.delete(k),T?r.add(k):r.delete(k),D&&u(),v(k);for(const E of t.values())E.targets.get(k)?.on&&(f(E,k,$(E,k)),b(E,k,g(E,k)));return()=>{n.get(k)===m&&(n.delete(k),a.delete(k),r.delete(k),u())}},notesSource:m=>M(k,String(m).slice(0,64)),notesTakeBack(m){const w=t.get(m);if(!w?.takeBack||!w.targets.has(k))return null;try{const A=w.takeBack(k);return A==null?null:structuredClone(A)}catch{return null}},notesOut(m){const w=m&&typeof m=="object"&&m.source===void 0?{...m,source:k}:m,A=Dd(w);if(!A||A.kind!=="played"||A.source!==k)return o.played.refused++,!1;if(!A.events.length)return!0;o.played.events+=A.events.length;for(const T of[...s])try{T(k,structuredClone(A.events))}catch{o.errors++}return!0},onPlayed(m){return typeof m!="function"?()=>{}:(s.add(m),()=>{s.delete(m)})}}),routesFor:h,listening:k=>n.has(k),takesPitch:k=>n.has(k)&&a.has(k),layerOnly:k=>n.has(k)&&r.has(k),drop(k){n.delete(k),a.delete(k),r.delete(k);for(const m of[...t.values()])m.handle.id===k?m.handle.remove():m.targets.delete(k);u()},statuses:()=>[...t.values()].filter(k=>k.status!==null).map(k=>({source:k.handle.id,name:k.handle.name,status:{...k.status}})),onChange(k){return d.add(k),()=>d.delete(k)},stats:()=>({sent:{...o.sent},played:{...o.played},events:o.events,errors:o.errors})}}function sE(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function wu(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const lE=.5,cE=20;function dE(e,t,n={}){const a=n.aheadSec??lE,r=n.now??Re;let o={...j1,...n.settings};const s=n.seed??1,l=()=>new ul(()=>o,{random:vd(s),chordRandom:vd(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const f=t.transport;if(!d||!f.running)return;const y=d.window(f.beatAt(r()+a));y.length&&(u+=y.length,e.send(y))},h=(f,y)=>{d=l(),e.restart(),d.start(f,{join:y}),p()},b=t.onChange(f=>{if(!c){if(f.kind==="start")h(f.beat,!1);else if(f.kind==="stop")d=null,e.off("stop");else if(f.kind==="snapshot"){const y=t.transport;!y.running&&d?(d=null,e.off("stop")):y.running&&!d&&h(y.beatAt(Math.max(y.startTime??r(),r())),!0)}}}),g=(n.ticker??(f=>ep(f,{intervalMs:cE})))(p);g.start();const v=t.transport;return v.running&&h(v.beatAt(Math.max(v.startTime??r(),r())),!0),{source:e,set(f){o={...o,...f}},settings:()=>o,sent:()=>u,remove(){c||(c=!0,b(),g.dispose(),e.remove())}}}const uE={ready:"Offline ready",offline:"Offline — some features need the internet",update:"Update ready"};function pE(e,t,n=!1){return e?n?"update":t?t.page==="older"?"update":t.ready&&t.page==="current"?"ready":"none":"none":"offline"}function fE(e){if(!e||typeof e!="object")return null;const t=e;if(t.type!=="nc-offline:status"||typeof t.ready!="boolean")return null;const n=t.page==="current"||t.page==="older"?t.page:"unknown";return{ready:t.ready,page:n,bytes:typeof t.bytes=="number"?t.bytes:0}}const hE=2e3;function mE(e,t){const n={};for(const a of e){const r=new URL(a,t),o=r.searchParams.get("b");o&&(n[r.pathname]=o)}return n}async function gE(e,t,n={}){if(!e)return null;const a=new MessageChannel,r=new Promise(s=>{const l=setTimeout(()=>s(null),hE);a.port1.onmessage=d=>{clearTimeout(l),s(fE(d.data))}});e.postMessage({type:"nc-offline:status",script:t,builds:n},[a.port2]);const o=await r;return a.port1.close(),o}function bE(e){const t=e.win??window,n=e.container??t.navigator.serviceWorker;if(!n)return()=>{};let a=!1,r=null,o="";const s=async()=>{if(a)return;const b=await gE(r?.active??null,e.script,e.builds?.()??{}),g=!!r?.active&&r.waiting?.state==="installed",v=pE(t.navigator.onLine,b,g),f=`${v} ${b?.page??""} ${b?.ready??""}`;f===o||a||(o=f,e.onChange(v,b))},l=()=>{t.navigator.onLine&&r?.update().catch(()=>{})},d=()=>{s(),l()},u=()=>void s(),c=b=>{b.data?.type==="nc-offline:activated"&&s()},p=()=>void s();t.addEventListener("online",d),t.addEventListener("offline",u),n.addEventListener("message",c),n.addEventListener("controllerchange",p);const h=t.setInterval(l,e.updateEveryMs??1800*1e3);return s(),n.register("/sw.js",{scope:"/",updateViaCache:"none"}).then(b=>{r=b;const g=v=>v?.addEventListener("statechange",()=>{(v.state==="installed"||v.state==="activated")&&s()});return g(b.installing),b.addEventListener("updatefound",()=>g(b.installing)),s()}).catch(()=>{}),()=>{a=!0,t.removeEventListener("online",d),t.removeEventListener("offline",u),n.removeEventListener("message",c),n.removeEventListener("controllerchange",p),t.clearInterval(h)}}async function yE(e=window){const t=e.navigator.serviceWorker,a=(await t?.getRegistration("/").catch(()=>{}))?.waiting;if(t&&a){const r=new Promise(o=>{t.addEventListener("controllerchange",()=>o(),{once:!0}),e.setTimeout(o,3e3)});a.postMessage({type:"nc-offline:skip-waiting"}),await r}e.location.reload()}const Lo="studio";function vE(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,o=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l(Lo),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&o(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(o),onChange:u=>d(n,u)}}const wE=(e,t)=>`${e}\0${t}`;function kE(){const e=new Map,t=(a,r)=>{for(const[o,s]of e)s.spans=s.spans.filter(l=>l.end+r>a),s.spans.length||e.delete(o)},n=(a,r,o)=>{let s=null;for(const l of a)l.start<=r&&(s===null||l.end>s)&&(s=l.end);return s===null?null:s+o};return{notes(a,r,o){const s=o.filter(u=>Number.isFinite(u.start)&&Number.isFinite(u.end)&&u.end>=u.start);if(!s.length)return;const l=wE(a,r);let d=e.get(l);d||(d={source:a,target:r,spans:[]},e.set(l,d)),d.spans.push(...s.map(u=>({start:u.start,end:u.end}))),d.spans.sort((u,c)=>u.start-c.start)},cut(a,r,o){for(const[s,l]of e)l.source!==a||r!==void 0&&l.target!==r||(l.spans=l.spans.filter(d=>d.start<o).map(d=>d.end>o?{start:d.start,end:o}:d),l.spans.length||e.delete(s))},drop(a){for(const[r,o]of e)(o.source===a||o.target===a)&&e.delete(r)},lit(a,r){t(a,r);const o=new Map;for(const s of e.values()){const l=n(s.spans,a,r);if(l===null||a>=l)continue;const d=o.get(s.target)??[];d.includes(s.source)||d.push(s.source),o.set(s.target,d)}return o},next(a,r){let o=null;const s=l=>{l>a&&(o===null||l<o)&&(o=l)};for(const l of e.values()){for(const u of l.spans)u.start>a&&s(u.start);const d=n(l.spans,a,r);d!==null&&s(d)}return o},get busy(){return e.size>0}}}function xE(e){return e.length<=1?e[0]??"":`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`}function $E(e,t=4){return e>0?t*60/e:2}const ku="netcomposer.studio.plugins.frozen.v1",EE=2e3;function AE(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==Rr[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function SE(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function ME(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(ku)??"[]");return Array.isArray(r)?r.filter(o=>typeof o=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(ku,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const o=n();o.includes(r)&&a(o.filter(s=>s!==r))}}}function TE(e){let t=!1;const n=(e.watch??hb)(e.ctx,{stallMs:e.stallMs??EE,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const LE=48;function CE(e){return typeof e!="string"?null:e.replace(/\s+/g," ").trim().slice(0,LE)||null}function IE(e){const t=e&&typeof e=="object"?e.dot:void 0;return t==="rec"||t==="armed"?t:null}function NE(e){const n=(e.doc??document).createElement("div");n.className="studio-readout",n.hidden=!0,n.setAttribute("role","status"),n.setAttribute("aria-live","off");const a=new Map;let r=!1;const o=()=>[...a.values()].at(-1)??null,s=()=>o()?.text??null,l=()=>{const u=s();if(!u||e.blocked?.()){n.hidden=!0,u?requestAnimationFrame(l):r=!1;return}n.hidden=!1;let c=0;for(const b of e.clearOf?.()??[])c=Math.max(c,b.getBoundingClientRect().bottom);const p=`${Math.round(c)}px`;n.style.getPropertyValue("--count-in-top")!==p&&n.style.setProperty("--count-in-top",p),n.textContent!==u&&(n.textContent=u);const h=o()?.dot??null;(n.dataset.dot??null)!==h&&(h?n.dataset.dot=h:delete n.dataset.dot),requestAnimationFrame(l)},d=()=>{r||(r=!0,requestAnimationFrame(l))};return{el:n,api:{set(u,c,p){if(typeof u!="string"||!u)return;const h=CE(c);a.delete(u),h&&a.set(u,{text:h,dot:IE(p)}),d()},current:s,dot:()=>o()?.dot??null}}}const FE="NetComposer Studio",Ct=[40,240],PE="nc-sync";function RE(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${PE}${n}`,locks:t?{request:(a,r,o)=>t.request(`${a}${n}`,r,o)}:null}}function DE(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const OE=.2,xu=.5;function zE(e,t,n){const a=new hg({bpm:120,minBpm:Ct[0],maxBpm:Ct[1],timebase:"shared"}),r=new Tg({app:FE,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Ct},startLeadSeconds:OE,...n?{startGate:()=>n(),gatedStartLeadSeconds:xu}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:r,async start(){o||(o=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:Re()});return}const u=++s,c=Re();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Re())+xu,0),r.publishState()):a.play({at:Re()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Re()})},setTempo:d=>a.setTempo({bpm:BE(d)}),playing:()=>a.transport.isPlayingAt(Re()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=Re();return d.isPlayingAt(u)?_E(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=Re();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function BE(e){return Number.isFinite(e)?Math.min(Ct[1],Math.max(Ct[0],Math.round(e*10)/10)):120}function _E(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Ms="netcomposer.scene",Yh=1,bl="netcomposer.studio.tempo.v1",yl="netcomposer.studio.scene-name.v1",io=120,vl="Untitled scene",Xh=2*1024*1024;function Co(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Ct[1],Math.max(Ct[0],Math.round(t*10)/10)):io}function Xt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||vl}function jE(e){return{format:Ms,v:Yh,name:Xt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Co(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function qE(e,t){if(e.length>Xh)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Ms)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=ol(c);if(!p||!t.includes(p.type)||o.has(c))continue;o.add(c);const h=u.name;s.push({id:c,type:p.type,name:qf(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))o.has(u)&&(d[u]=c);return{ok:!0,scene:{format:Ms,v:Yh,name:Xt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Co(l)},meter:[4,4],instances:s,mix:Ch(a.mix??Ba()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}const HE="nc-song-looper";function wl(e){for(const[t,n]of Object.entries(e)){if(!n||typeof n!="object")continue;const a=n;if(a.format!==HE||!a.data||typeof a.data!="object")continue;const r=a.data;if(typeof r.name=="string")return{id:t,name:r.name,passes:Array.isArray(r.passes)?r.passes.length:0}}return null}function $u(e){return`${JSON.stringify(e,null,2)}
`}const VE=e=>new TextEncoder().encode(e).length;function UE(e){const t=$u(e);if(VE(t)<=Xh)return{scene:e,text:t,droppedSong:!1};const n=wl(e.presets);if(!n)return{scene:e,text:t,droppedSong:!1};const a={...e.presets};delete a[n.id];const r={...e,presets:a};return{scene:r,text:$u(r),droppedSong:!0}}const GE=(e,t,n)=>`${e} ${e===1?t:n}`;function KE(e){const{name:t,missing:n,song:a}=e,r=a!==null&&(e.droppedSong===!0||a.passes>0),o=n.length?` (without ${n.join(", ")}: ${n.length===1?"it hasn't":"they haven't"} loaded yet)`:"";return r?e.droppedSong?`Saved${o}, without LUPA’s song: it’s too large for a Scene.`:`Saved${o}, with LUPA’s song (${GE(a.passes,"pass","passes")}).`:`Saved “${t}”${o}`}function WE(e){const{kept:t,song:n}=e;return t.length?`Scene loaded; ${t.join(", ")} kept ${t.length===1?"its":"their"} own sound`:n&&n.passes>0?"Loaded, with LUPA’s song.":"Scene loaded"}function YE(e){return`${Xt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function XE(e){try{const t=e?.getItem(bl);return t?Co(Number(t)):io}catch{return io}}function Jh(e,t){try{t?.setItem(bl,String(Co(e)))}catch{}}function JE(e){try{return Xt(e?.getItem(yl))}catch{return vl}}function Qh(e,t){try{t?.setItem(yl,Xt(e))}catch{}}const Ts="netcomposer.studio.reset-pending.v1",so="nc-reset",QE=6e4,kl="netcomposer.studio.reset-undo.v1",xl="netcomposer.studio.legacy-copy.v1",Io="netcomposer.studio.generation.v1",ZE=/^[a-z0-9]{1,16}$/,Eu="nyx.scene-samples",eA=3e4,tA=["astrid-synth"],nA=["netcomposer.groups.v1","netcomposer.studio.fx-fold.v1","netcomposer.studio.insert-fold.v1","netcomposer.studio.strip-fold.v1","netcomposer.studio.vu-fold.v1","netcomposer.calliope.ui.v1"],aA=[...nA,Mo,hl,bl,yl,xl,Io];function rA(e){return e.includes("@studio/")||aA.includes(e)}function Zh(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&rA(a)&&t.push(a)}return t}const oA=/^[0-9a-f]{16,64}$/;function iA(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[o,s]of Object.entries(a))o==="sample"&&typeof s=="string"&&oA.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function sA(e,t){const n=new Set;for(const[o,s]of Object.entries(t))if(o.startsWith("nyx.state"))for(const l of iA(s))n.add(l);if(!n.size)return;let a=[];try{const o=JSON.parse(e.getItem(Eu)??"[]");Array.isArray(o)&&(a=o.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(o=>!n.has(o)),...n].slice(-2048);e.setItem(Eu,JSON.stringify(r))}function lA(e,t){for(const n of[e,t])try{const a=n?.getItem(kl);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function No(e,t){for(const n of[t,e])try{n?.removeItem(kl)}catch{}}function cA(e,t,n=Date.now(),a=dA()){const r={};for(const l of Zh(e)){const d=e.getItem(l);d!==null&&(r[l]=d)}const o=JSON.stringify({v:1,at:n,keys:r});try{sA(e,r)}catch{}for(const l of Object.keys(r))e.removeItem(l);try{t?.removeItem(Mr)}catch{}No(e,t);let s=!1;for(const l of[e,t])if(!(s||!l))try{l.setItem(kl,o),s=!0}catch{}if(!s){for(const[l,d]of Object.entries(r))e.setItem(l,d);return!1}try{e.setItem(Mo,JSON.stringify(tA))}catch{}try{e.setItem(xl,"off")}catch{}try{e.setItem(Io,a)}catch{}return!0}function dA(){let e="";for(;e.length<8;)e+=Math.random().toString(36).slice(2);return e.slice(0,8)}function $l(e){try{const t=e?.getItem(Io)??"";return ZE.test(t)?t:""}catch{return""}}function uA(e){const t=e.indexOf("@studio/");if(t<0)return null;const n=e.slice(t+8),a=n.indexOf("/");return a<0?"":n.slice(0,a)}function pA(e){const t=$l(e),n=[];for(let a=0;a<e.length;a++){const r=e.key(a);if(r===null)continue;const o=uA(r);o!==null&&o!==t&&n.push(r)}for(const a of n)try{e.removeItem(a)}catch{}return n}function fA(e,t){const n=lA(e,t);if(!n)return!1;for(const a of Zh(e))e.removeItem(a);No(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function hA(e){try{return e?.getItem(xl)==="off"}catch{return!1}}function El(){try{return globalThis.sessionStorage??null}catch{return null}}function mA(e,t,n,a=Math.random().toString(36).slice(2,10),r=Date.now()){const o=JSON.stringify({what:n,nonce:a,at:r});let s=!1;for(const l of[e,t])try{l?.setItem(Ts,o),l&&(s=!0)}catch{}return s?a:null}function gA(e,t,n){const a=new URL(e);return a.searchParams.set(so,`${t}.${n}`),a.hash="",a.toString()}function bA(e){const t=new URL(e);return t.searchParams.has(so)?(t.searchParams.delete(so),t.toString()):null}function yA(e,t,n,a=Date.now()){const r=new URLSearchParams(n).get(so);let o=null;for(const s of[e,t])try{const l=s?.getItem(Ts);if(s?.removeItem(Ts),!l||o)continue;const d=JSON.parse(l);if(d.what!=="reset"&&d.what!=="undo")continue;const u=r===`${d.what}.${d.nonce}`,c=typeof d.at=="number"&&a-d.at>=0&&a-d.at<QE;(u||r===null&&c)&&(o=d.what)}catch{}return o}function vA(e,t,n="",a=Date.now()){if(!e)return null;const r=yA(e,t,n,a);try{if(r==="reset")return cA(e,t,a)?"reset":"failed";if(r==="undo")return fA(e,t)?"undo":null;No(e,t),pA(e)}catch{}return null}const em="netcomposer.studio.picker.v1",Au="http://127.0.0.1:5177",wA=2,Pn=16,$n=64*1024*1024,kA=4e3,xA=1536*1024*1024,Su=[1e3,2e3,5e3,1e4],tm=new Set(["127.0.0.1","localhost","[::1]"]);function Al(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!tm.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function lo(e){try{const t=JSON.parse(e?.getItem(em)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:Al(n.address)??Au,...n.ok===!0?{ok:!0}:{}}}catch{return{on:!1,address:Au}}}function co(e,t){try{e?.setItem(em,JSON.stringify(t))}catch{}}async function $A(e,t,n){if(tm.has(t))return"granted";try{const a=await e?.query({name:"loopback-network"});if(!a)return"unknown";const r=()=>a.state==="granted"||a.state==="denied"||a.state==="prompt"?a.state:"unknown";return n&&a.addEventListener?.("change",()=>n(r())),r()}catch{return"unknown"}}function EA(e,t){return e.on?t==="granted"?"start":t==="denied"?"blocked":t==="unknown"&&e.ok?"start":"ask":"off"}function Mu(e){return typeof e!="number"||Number.isNaN(e)?null:e===Number.NEGATIVE_INFINITY?-120:Math.round(Math.min(24,Math.max(-120,e))*10)/10}function AA(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Pn},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{},o=r.filled===!0;return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:o,fp:o&&typeof r.fp=="string"&&/^[0-9a-f]{64}$/.test(r.fp)?r.fp:"",sid:o&&typeof r.sid=="string"?r.sid.slice(0,160):"",wave:o&&typeof r.wave=="string"&&/^[0-9a-z]{0,96}$/.test(r.wave)?r.wave:"",used:r.used===!0,playing:o&&r.playing===!0}})}function Tu(e){let t=[];try{t=Array.isArray(e.can)?e.can:[]}catch{}const n={pad:"receivePad",undo:"undo",play:"play",remove:"remove",stop:"stop",instrument:"instrument"};return["pad","undo","play","remove","stop","instrument"].filter(a=>t.includes(a)&&typeof e[n[a]]=="function")}const En=e=>({ok:!1,placed:[],left:[],message:e}),Ta=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Pn).slice(0,16):[];function tn(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=Ta([a.from]),[o]=Ta([a.to]);return r&&o?[{from:r,to:o}]:[]}).slice(0,Pn),left:Ta(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}async function Li(e){const t=new Uint8Array(await crypto.subtle.digest("SHA-256",e));return Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}const Lu=e=>typeof e=="string"&&/^[\w-]{1,40}$/.test(e);function SA(e){const t=e&&typeof e=="object"?e:{};if(!Lu(t.id)||typeof t.target!="string"||!t.target||t.target.length>64)return null;if(t.type==="pad"||t.type==="play"||t.type==="remove"){const[n]=Ta([t.pad]);return n?{type:t.type,id:t.id,target:t.target,pad:n}:null}if(t.type==="stop"){const n=t.pad===0?0:Ta([t.pad])[0]??-1;return n>=0?{type:"stop",id:t.id,target:t.target,pad:n}:null}return t.type==="instrument"?{type:"instrument",id:t.id,target:t.target}:t.type==="undo"&&Lu(t.of)?{type:"undo",id:t.id,target:t.target,of:t.of}:null}function MA(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function TA(e){const t=new Map,n=new Map,a=new Set,r=new Map,o=e.now??(()=>Date.now()),s=e.setTimeout??((E,S)=>setTimeout(E,S)),l=E=>e.live?.(E)??!0;let d="off",u="",c=0,p=null,h=!1,b="";const g=E=>{E!==d&&(d=E,e.onStatus?.(E))},v=()=>[...t.entries()].filter(([E])=>l(E)).map(([E,S])=>{const C=e.brandOf?.(E),N=Mu(S.masterDb?.()),F=Mu(e.outDb?.(E));return{id:E,name:(e.nameOf?.(E)??E).slice(0,40),...C?{brand:C.slice(0,40)}:{},shown:e.shown?.()===E,seen:n.get(E)??0,pads:AA(S),can:Tu(S),...N===null?{}:{master:N},...F===null?{}:{out:F}}}),f=E=>{const S=v();return b=JSON.stringify(S),JSON.stringify({v:wA,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:S,results:[...r.entries()].map(([C,N])=>({id:C,...N})),wait:E})},y=(E,S)=>e.fetch(`${u}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:f(E),cache:"no-store",...S?{signal:S}:{},targetAddressSpace:"loopback"}),$=async(E,S)=>{if(!E.ok)throw new Error(`the picker said ${E.status}`);const C=await E.json();if(S!==c)return;if(g("on"),Array.isArray(C.ack))for(const F of C.ack)typeof F=="string"&&r.delete(F);const N=Array.isArray(C.commands)?C.commands:[];for(const F of N.slice(0,8)){const U=MA(F);U&&m(U,S);const R=U?null:SA(F);R&&T(R,S)}},x=async E=>{let S=0,C=!1;for(;E===c;){const N=new AbortController;p=N;try{await $(await y(C,N.signal),E),S=0,C=!0}catch{if(E!==c)return;C=!1,g("away");const F=Su[Math.min(S++,Su.length-1)];await new Promise(U=>s(U,F))}}},M=()=>{!u||h||(h=!0,queueMicrotask(()=>{h=!1;const E=c;!u||d!=="on"||!r.size&&JSON.stringify(v())===b||y(!1).then(S=>$(S,E)).catch(()=>{})}))},k=async E=>{const S=await e.fetch(E,{cache:"no-store",targetAddressSpace:"loopback"});if(!S.ok){const C=await S.json().catch(()=>({}));throw new Error(typeof C.error=="string"?C.error.slice(0,120):`the picker said ${S.status}`)}return S},m=async(E,S)=>{if(r.has(E.id))return;let C;const N=t.get(E.target);if(!N||!l(E.target))C=En("That NYX isn't in the Studio any more.");else if(a.has(E.target))C=En("NYX is still loading the last kit.");else{a.add(E.target);try{const F=`kit=${encodeURIComponent(E.id)}`,U=await(await k(`${u}/api/kit/manifest?${F}`)).json(),R=Array.isArray(U.sounds)?U.sounds:[];if(!R.length)throw new Error("the picker's pads are empty");if(R.length>Pn)throw new Error(`more than ${Pn} sounds`);const B={};for(const _ of R){const G=_&&typeof _=="object"?_.pad:null;if(typeof G!="number"||!Number.isInteger(G)||G<1||G>Pn||B[G])throw new Error("a sound has no pad of its own");const de=await k(`${u}/api/kit/audio?${F}&pad=${G}`);if(Number(de.headers.get("content-length")??0)>$n)throw new Error(`pad ${G}'s sound is too big`);const oe=await de.arrayBuffer();if(oe.byteLength>$n)throw new Error(`pad ${G}'s sound is too big`);const Ee=_.sha256;if(typeof Ee=="string"&&Ee&&await Li(oe)!==Ee.toLowerCase())throw new Error(`pad ${G}'s sound isn't the one sent`);B[String(G)]=oe}if(S!==c)return;e.reveal?.(E.target),C=tn(await N.receive(U,E.mode,B))}catch(F){C=En(`Not loaded: ${F.message||"it went wrong"}.`)}finally{a.delete(E.target)}}S===c&&(r.set(E.id,C),M())},w=async(E,S,C)=>{const N=await k(`${u}/api/kit/audio?kit=${encodeURIComponent(E)}&pad=${S}`);if(Number(N.headers.get("content-length")??0)>$n)throw new Error(`pad ${S}'s sound is too big`);const F=await N.arrayBuffer();if(F.byteLength>$n)throw new Error(`pad ${S}'s sound is too big`);if(typeof C=="string"&&C&&await Li(F)!==C.toLowerCase())throw new Error(`pad ${S}'s sound isn't the one sent`);return F},A=async E=>{const S=`send=${encodeURIComponent(E)}`,C=await(await k(`${u}/api/instrument/manifest?${S}`)).json(),N=Array.isArray(C.files)?C.files:[];if(!N.length)throw new Error("the instrument has no files");if(N.length>kA)throw new Error("the instrument has too many files");const F=[];let U=0;for(const R of N){const B=R&&typeof R=="object"?R:{};if(typeof B.i!="number"||typeof B.path!="string"||!B.path)throw new Error("a file has no name");const _=await k(`${u}/api/instrument/file?${S}&i=${B.i}`);if(Number(_.headers.get("content-length")??0)>$n)throw new Error(`${B.path} is too big`);const G=await _.arrayBuffer();if(G.byteLength>$n)throw new Error(`${B.path} is too big`);if(U+=G.byteLength,U>xA)throw new Error("the instrument is too big");if(typeof B.sha256!="string"||await Li(G)!==B.sha256.toLowerCase())throw new Error(`${B.path} isn't the file that was sent`);F.push({path:B.path.slice(0,400),bytes:G})}return{manifest:C,files:F}},T=async(E,S)=>{if(r.has(E.id))return;let C;const N=t.get(E.target);if(!N||!l(E.target))C=En("That NYX isn't in the Studio any more.");else if(!Tu(N).includes(E.type))C=En("This NYX can't take that: reload the Studio to update it.");else try{if(E.type==="undo")C=tn(await N.undo?.(E.of));else if(E.type==="play")C=tn(await N.play?.(E.pad));else if(E.type==="stop")C=tn(await N.stop?.(E.pad));else if(E.type==="remove")C=tn(await N.remove?.(E.pad,E.id));else if(E.type==="instrument"){const F=await A(E.id);if(S!==c)return;e.reveal?.(E.target),C=tn(await N.instrument?.(F.manifest,F.files))}else{const F=await(await k(`${u}/api/kit/manifest?kit=${encodeURIComponent(E.id)}`)).json(),U=Array.isArray(F.sounds)?F.sounds:[],R=U[0]&&typeof U[0]=="object"?U[0]:{};if(U.length!==1||R.pad!==E.pad)throw new Error(`the picker's sound isn't for pad ${E.pad}`);const B=await w(E.id,E.pad,R.sha256);if(S!==c)return;C=tn(await N.receivePad?.(F,{[String(E.pad)]:B},E.pad,E.id))}}catch(F){C=En(`Not loaded: ${F.message||"it went wrong"}.`)}S===c&&(r.set(E.id,C),M())},D=()=>{c++,p?.abort(),p=null,h=!1,u="",r.clear(),g("off")};return{host(E){return{pickerTarget(S){return t.set(E,S),M(),{changed:M,remove(){t.get(E)===S&&t.delete(E),M()}}}}},start(E){const S=Al(E);S&&(D(),u=S,g("connecting"),x(++c))},stop:D,seen(E){n.set(E,o()),t.has(E)&&M()},changed:M,forget(E){t.delete(E),n.delete(E),M()},targets:v,get status(){return d}}}const Cu="http://www.w3.org/2000/svg";function LA(){const e=document.createElementNS(Cu,"svg");e.setAttribute("viewBox","0 0 10 10"),e.setAttribute("aria-hidden","true"),e.setAttribute("class","scene-menu-caret");const t=document.createElementNS(Cu,"path");return t.setAttribute("d","M1.5 3.5 5 7l3.5-3.5"),e.append(t),e}function nm(e=typeof navigator<"u"?navigator.platform:""){return/Mac|iPhone|iPad|iPod/i.test(e)}function CA(e=nm()){return e?"⌘S":"Ctrl+S"}function am(e){return(e.metaKey===!0||e.ctrlKey===!0)&&!e.altKey&&!e.shiftKey&&(e.key==="s"||e.key==="S")}function IA(e,t){e.addEventListener("keydown",n=>{!am(n)||n.defaultPrevented||(n.preventDefault(),n.repeat||t())})}function NA(e){const t=document.createElement("button");t.type="button",t.className="ghost scene-menu-btn",t.setAttribute("aria-haspopup","menu"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-controls","scene-menu"),t.setAttribute("aria-label","Scene menu: Save, Load, New"),t.title="Save, Load, New",t.append(LA());const n=document.createElement("div");n.id="scene-menu",n.className="scene-menu",n.setAttribute("role","menu"),n.setAttribute("aria-label","Scene"),n.append(...e);const a=document.createElement("div");a.className="scene-menu-wrap",a.append(t,n);const r=()=>[...n.querySelectorAll('[role="menuitem"]')].filter(u=>!u.disabled&&u.getClientRects().length>0);for(const u of e)u.getAttribute("role")==="menuitem"&&(u.tabIndex=-1,u.addEventListener("click",()=>l(!1)));const o=()=>a.hasAttribute("data-open");function s(){o()||(a.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),r()[0]?.focus({preventScroll:!0}),document.addEventListener("pointerdown",d,!0))}function l(u=!1){o()&&(a.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",d,!0),u&&t.focus({preventScroll:!0}))}function d(u){a.contains(u.target)||l()}return t.addEventListener("click",()=>o()?l():s()),t.addEventListener("keydown",u=>{if(u.key==="ArrowDown"||u.key==="ArrowUp"){u.preventDefault(),s();const c=r();(u.key==="ArrowUp"?c[c.length-1]:c[0])?.focus({preventScroll:!0})}}),n.addEventListener("keydown",u=>{const c=r(),p=c.indexOf(document.activeElement);let h;if(u.key==="ArrowDown")h=c[(p+1)%c.length];else if(u.key==="ArrowUp")h=c[(p-1+c.length)%c.length];else if(u.key==="Home")h=c[0];else if(u.key==="End")h=c[c.length-1];else if(u.key==="Escape"){u.preventDefault(),u.stopPropagation(),l(!0);return}else if(u.key==="Tab"){l(!1);return}else return;u.preventDefault(),h?.focus({preventScroll:!0})}),{el:a,button:t,list:n,open:s,close:l,isOpen:o}}const FA=300,PA=120*1e3;function RA(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function DA(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(RA))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>FA*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l},...t.rights==="unknown"?{rights:"unknown"}:{}}}}function Iu(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function OA(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??PA,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:Iu(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!Iu(c).some(g=>g.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=DA(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let b;try{const g=await Promise.race([Promise.resolve(c.receive(h,u)),new Promise(v=>{b=setTimeout(()=>v({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!g||typeof g!="object"||typeof g.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:g}catch(g){return{ok:!1,reason:"error",message:g instanceof Error?g.message:String(g)}}finally{clearTimeout(b)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const zA="/studio/assets/silence-processor-BBLKD9j-.js",nn=1,Ci=1024,rm=[1,10,100],BA=32,_A=32,om=128,jA=400,qA=["off","blocked","live","paused","none"],Rn=e=>typeof e=="object"&&e!==null,Pe=e=>typeof e=="number"&&Number.isFinite(e),HA=(e,t=om)=>typeof e=="string"&&e.length>0&&e.length<=t,Ii=e=>e<0?0:e>1?1:e,VA=["live","quiet","offline","off"],UA=["removed","hold"],Nu=e=>e<-1?-1:e>1?1:e,GA=/^[A-Z0-9?*-]{0,8}$/i;function Fu(e){if(!Rn(e))return null;const{net:t,sta:n,loc:a,cha:r,name:o,rate:s}=e;return typeof t!="string"||typeof n!="string"||typeof a!="string"||typeof r!="string"||![t,n,a,r].every(l=>GA.test(l))||!t||!n||typeof o!="string"||o.length>om||!Pe(s)||s<0||s>1e4?null:{net:t,sta:n,loc:a,cha:r,name:o,rate:s}}function KA(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==Ci)return null;const n=new Float32Array(Ci),a=e;for(let r=0;r<Ci;r++){const o=Number(a[r]);if(!Number.isFinite(o))return null;n[r]=o<-1?-1:o>1?1:o}return n}function WA(e){if(!Rn(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==nn||!HA(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,BA)){if(!Rn(r)||!Pe(r.at)||!Pe(r.value))return null;a.push({at:r.at,value:Ii(r.value)})}return{v:nn,kind:"energy",source:n,frames:a}}case"table":{if(!Pe(e.seq)||e.seq<0||!Pe(e.at)||!Pe(e.rms)||e.rms<0||!rm.includes(e.speed))return null;const a=KA(e.samples);if(!a)return null;const r=e.station===null?null:Fu(e.station);if(e.station!==null&&!r)return null;const o=e.behindSec===null?null:Pe(e.behindSec)?e.behindSec:void 0;return o===void 0?null:{v:nn,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:r,behindSec:o,samples:a,rms:Math.min(1,e.rms)}}case"status":{if(!VA.includes(e.state))return null;const a=e.station===null?null:Fu(e.station);if(e.station!==null&&!a)return null;const r=d=>d===null?null:Pe(d)?d:void 0,o=r(e.newestAgeSec),s=r(e.behindSec);if(o===void 0||s===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>jA)return null;const l={v:nn,kind:"status",source:n,state:e.state,station:a,newestAgeSec:o,behindSec:s,hold:e.hold,credit:e.credit};return Pe(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),qA.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const a=[];for(const r of e.frames.slice(0,_A)){if(!Rn(r)||!Pe(r.at)||!Pe(r.tiltX)||!Pe(r.tiltY)||!Pe(r.heading)||!Pe(r.shake))return null;const o=r.heading%1;a.push({at:r.at,tiltX:Nu(r.tiltX),tiltY:Nu(r.tiltY),heading:o<0?o+1:o,shake:Ii(r.shake)})}return{v:nn,kind:"motion",source:n,frames:a}}case"shake":return!Pe(e.at)||!Pe(e.strength)?null:{v:nn,kind:"shake",source:n,at:e.at,strength:Ii(e.strength)};case"off":return UA.includes(e.reason)?{v:nn,kind:"off",source:n,reason:e.reason}:null;default:return null}}function YA(e){if(!Rn(e))return null;const t={};return e.energy===!0&&(t.energy=!0),Rn(e.table)&&rm.includes(e.table.speed)&&(t.table={speed:e.table.speed}),e.motion===!0&&(t.motion=!0),t.energy||t.table||t.motion?t:null}function XA(e={}){const t=new Map,n=new Map,a=new Set,r=new Set,o={sent:{energy:0,table:0,status:0,off:0,motion:0,shake:0},errors:0},s=g=>e.name?.(g)??g,l=g=>{for(const v of[...g])try{v()}catch{}},d=()=>{l(a);for(const g of t.values())l(g.demandListeners)},u=(g,v)=>{try{g.receiver(v),o.sent[v.kind]++}catch{o.errors++}},c=(g,v)=>v.kind==="energy"?!!g.wants.energy:v.kind==="table"?g.wants.table?.speed===v.speed:v.kind==="motion"||v.kind==="shake"?!!g.wants.motion:!0,p=g=>{for(const v of t.values()){v.status&&u(g,v.status),v.energy&&g.wants.energy&&u(g,v.energy),v.motion&&g.wants.motion&&u(g,v.motion);const f=g.wants.table&&v.tables.get(g.wants.table.speed);f&&u(g,f)}},h=()=>{const g=new Set;let v=!1;const f=[],y=[];for(const[$,x]of n)x.wants.energy&&(v=!0),x.wants.table&&g.add(x.wants.table.speed),x.wants.motion&&y.push(s($)),f.push(s($));return{energy:v,speeds:[...g].sort(($,x)=>$-x),receivers:n.size,names:f,motion:y.length>0,motionNames:y}};function b(g,v){const f=t.get(g),y=f??{id:g,name:v,status:null,energy:null,motion:null,tables:new Map,demandListeners:new Set};return y.name=v,t.set(g,y),f||l(r),{id:g,name:v,send($){const x=WA($);if(!(!x||x.source!==g||t.get(g)!==y)){if(x.kind==="status"){const M=JSON.stringify(y.status);y.status=x,JSON.stringify(x)!==M&&l(a)}else x.kind==="energy"?y.energy=x:x.kind==="motion"?y.motion=x:x.kind==="table"?y.tables.set(x.speed,x):x.kind==="off"&&x.reason==="removed"&&(y.energy=null,y.motion=null);for(const M of n.values())c(M,x)&&u(M,x)}},demand:h,onDemand($){return typeof $!="function"?()=>{}:(y.demandListeners.add($),()=>y.demandListeners.delete($))},remove(){if(t.get(g)!==y)return;t.delete(g);const $={v:1,kind:"off",source:g,reason:"removed"};for(const x of n.values())u(x,$);l(r),l(a)}}}return{host(g){return{situationIn(v,f){const y=YA(f);if(typeof v!="function"||!y)return n.delete(g)&&d(),()=>{};const $={receiver:v,wants:y};return n.set(g,$),d(),p($),()=>{n.get(g)===$&&(n.delete(g),d())}},situationSource:v=>b(g,typeof v=="string"?v.slice(0,64):g),situationSources:()=>[...t.values()].map(v=>({id:v.id,name:v.name})),onSituationSources(v){return typeof v!="function"?()=>{}:(r.add(v),()=>r.delete(v))}}},statuses:()=>[...t.values()].flatMap(g=>g.status?[{source:g.id,name:g.name,status:g.status}]:[]),wants:g=>n.get(g)?.wants??null,drop(g){const v=t.get(g);if(v){t.delete(g);const f={v:1,kind:"off",source:g,reason:"removed"};for(const y of n.values())u(y,f);l(r)}(n.delete(g)||v)&&d()},onChange(g){return a.add(g),()=>a.delete(g)},stats:o}}function JA(e,t=ll){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const QA=["Space","Backspace"];function ZA(){const e=new Map,t=n=>{const a=e.get(n);return a?.length?a[a.length-1]??null:null};return{claim(n,a,r){if(typeof n!="string"||!n||typeof r!="function")return()=>{};const o={owner:n,handler:r},s=[...new Set(a)].filter(l=>QA.includes(l));for(const l of s){const d=e.get(l)??[];d.push(o),e.set(l,d)}return()=>{for(const l of s){const d=e.get(l);if(!d)continue;const u=d.indexOf(o);u>=0&&d.splice(u,1),d.length||e.delete(l)}}},press(n,a){const r=typeof a?.code=="string"?a.code:"",o=t(r);if(!o)return!1;if(a.repeat===!0)return!0;try{return o.handler({code:r,shiftKey:a.shiftKey===!0,from:String(n)})===!0}catch{return!1}},owner:n=>t(n)?.owner??null,drop(n){for(const[a,r]of e){const o=r.filter(s=>s.owner!==n);o.length?e.set(a,o):e.delete(a)}}}}const eS=56;function tS(e){const{row:t}=e,n=p=>p-t.left,a=Math.max(0,n(e.strips.left)),r=Math.min(t.width,n(e.strips.left+e.strips.width)),o=e.add?n(e.add.left):null,s=o===null||o<a||o>=r||o+e.groupWidth>t.width,l=s?0:o,d=s?r:Math.max(a,Math.min(r,l)),u=new Map;for(const p of e.channels){const h=n(p.left),b=h+p.width;u.set(p.id,{left:h,width:p.width,out:b<=a+1||h>=d-1})}let c=null;if(e.master){const p=n(e.master.left);!(!s&&p<l+e.groupWidth&&p+e.master.width>l)&&p>=0&&p+e.master.width<=t.width+1&&(c={left:p,width:e.master.width})}return{laneWidth:d,laneClip:a,tabs:u,groupLeft:l,master:c,twoRows:s}}function nS(e,t){return[...e.filter(t),...e.filter(n=>!t(n))]}function aS(e){const t=/^(.*?)(?:\s+(\d+))?$/.exec(e.trim()),n=(t?.[1]??e).trim(),a=t?.[2],r=n.slice(0,2);return a?`${r} ${a}`:r}const Pu=6,Ni=".nc-strip:not([data-nc-master])",Ru=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,An=e=>e?.id?.replace(/^tab-/,"")??null;function rS(e){const{tabs:t,addTab:n,mixHost:a}=e,r=document.createElement("div");r.className="tab-lane",r.setAttribute("role","none");const o=document.createElement("div");o.className="tab-lane-inner",o.setAttribute("role","none"),r.append(o);const s=document.createElement("div");s.className="tab-group",s.setAttribute("role","none");const l=document.createElement("span");l.className="tab-master",l.setAttribute("aria-hidden","true"),l.textContent="Master",t.prepend(r),t.append(s,l),s.append(n);const d=E=>document.getElementById(`tab-${E}`),u=E=>a.querySelector(`${Ni}[data-nc-id="strip-${CSS.escape(E)}"]`);function c(){for(const E of e.order()){const S=d(E);S&&(e.hasStrip(E)?o.append(S):s.insertBefore(S,n))}h()}let p=0;function h(){p||(p=requestAnimationFrame(()=>{p=0,b()}))}function b(){const E=a.querySelector(".nc-section[data-nc-section='strips'], [data-nc-id='strips']"),S=[...a.querySelectorAll(Ni)],C=!!E&&E.getClientRects().length>0&&S.length>0;if(t.toggleAttribute("data-aligned",C),C||t.removeAttribute("data-two-rows"),!C||!E){for(const de of o.children){const oe=de;oe.style.left="",oe.style.width="",oe.hidden=!1,oe.removeAttribute("data-narrow")}r.style.width="",s.style.left="",l.hidden=!0;return}const N=t.getBoundingClientRect(),F=E.getBoundingClientRect(),R=E.querySelector("[data-nc-id='mix-add']")?.getBoundingClientRect(),_=a.querySelector(".nc-strip[data-nc-master]")?.getBoundingClientRect(),G=tS({row:{left:N.left,width:N.width},strips:{left:F.left,width:F.width},channels:S.map(de=>{const oe=de.getBoundingClientRect();return{id:Ru(de)??"",left:oe.left,width:oe.width}}),add:R&&R.width>0?{left:R.left,width:R.width}:null,master:_&&_.width>0?{left:_.left,width:_.width}:null,groupWidth:s.getBoundingClientRect().width});r.style.width=`${Math.max(0,G.laneWidth)}px`,r.style.clipPath=`inset(0 0 0 ${Math.max(0,G.laneClip)}px)`;for(const de of o.children){const oe=de,Ee=G.tabs.get(An(oe)??"");if(!Ee){oe.hidden=!0;continue}oe.hidden=!1,oe.style.left=`${Ee.left}px`,oe.style.width=`${Ee.width}px`,oe.toggleAttribute("data-narrow",Ee.width<eS),oe.toggleAttribute("data-out",Ee.out)}s.style.left=`${G.groupLeft}px`,t.toggleAttribute("data-two-rows",G.twoRows),l.hidden=!G.master,G.master&&(l.style.left=`${G.master.left}px`,l.style.width=`${G.master.width}px`)}if(new MutationObserver(()=>h()).observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-nc-folded","hidden","class"]}),a.addEventListener("scroll",()=>h(),{capture:!0,passive:!0}),typeof ResizeObserver=="function"){const E=new ResizeObserver(()=>h());E.observe(a),E.observe(t)}window.addEventListener("resize",()=>h()),document.fonts?.ready.then(()=>h());const g=()=>a.querySelector(".nc-section[data-nc-section='strips']");let v=null;r.addEventListener("pointerdown",E=>{E.pointerType==="mouse"||E.target?.closest?.(".tab-grip")||(v={pointerId:E.pointerId,x:E.clientX,moved:!1})}),r.addEventListener("pointermove",E=>{if(!v||E.pointerId!==v.pointerId)return;const S=E.clientX-v.x;if(!v.moved&&Math.abs(S)<Pu)return;v.moved=!0,v.x=E.clientX;const C=g();C&&(C.scrollLeft-=S)});const f=E=>{if(!v||E.pointerId!==v.pointerId)return;const S=v.moved;if(v=null,!S)return;const C=N=>{N.stopPropagation(),N.preventDefault()};t.addEventListener("click",C,{capture:!0,once:!0}),window.setTimeout(()=>t.removeEventListener("click",C,{capture:!0}),0)};r.addEventListener("pointerup",f),r.addEventListener("pointercancel",f),r.addEventListener("wheel",E=>{const S=g();!S||Math.abs(E.deltaX)<=Math.abs(E.deltaY)||(S.scrollLeft+=E.deltaX,E.preventDefault())},{passive:!1});let y=null;const $=()=>{for(const E of document.querySelectorAll("[data-tab-drop], .nc-strip[data-drop]"))E.removeAttribute("data-tab-drop"),E.removeAttribute("data-drop")},x=()=>[...a.querySelectorAll(Ni)].map(E=>{const S=E.getBoundingClientRect();return{id:Ru(E)??"",left:S.left,width:S.width}}),M=()=>e.order().filter(E=>e.hasStrip(E)),k=()=>{y&&(y.tab.removeAttribute("data-dragging"),u(y.id)?.removeAttribute("data-dragging"),t.removeAttribute("data-tab-drag"),$(),y=null)},m=E=>{E.active=!0,E.tab.setAttribute("data-dragging","true"),u(E.id)?.setAttribute("data-dragging","true"),t.setAttribute("data-tab-drag",""),E.touch&&navigator.vibrate?.(10)};t.addEventListener("pointerdown",E=>{if(y||E.pointerType==="mouse"&&E.button!==0)return;const S=E.target?.closest?.(".tab-grip"),C=S?.closest(".tab"),N=An(C??null);if(!S||!C||!N||!e.hasStrip(N))return;y={id:N,tab:C,pointerId:E.pointerId,x0:E.clientX,y0:E.clientY,active:!1,move:null,touch:E.pointerType!=="mouse"},E.preventDefault()}),window.addEventListener("pointermove",E=>{const S=y;if(!S||E.pointerId!==S.pointerId)return;if(!S.active){if(Math.hypot(E.clientX-S.x0,E.clientY-S.y0)<Pu)return;m(S)}E.preventDefault();const C=Hh(x(),E.clientX),N=C?As(M(),S.id,C):null;S.move=N,$(),C&&N&&(u(C.target)?.setAttribute("data-drop",C.side),d(C.target)?.setAttribute("data-tab-drop",C.side))});const w=E=>{const S=y;if(!S||E.pointerId!==S.pointerId)return;const C=S.active?S.move:null,N=S.active;if(k(),N){const F=U=>{U.stopPropagation(),U.preventDefault()};t.addEventListener("click",F,{capture:!0,once:!0}),window.setTimeout(()=>t.removeEventListener("click",F,{capture:!0}),0)}C&&e.onReorder(C.id,C.before)};window.addEventListener("pointerup",w),window.addEventListener("pointercancel",w),t.addEventListener("keydown",E=>{if(!E.altKey||E.key!=="ArrowLeft"&&E.key!=="ArrowRight")return;const S=An(E.target?.closest?.(".tab")??null);if(!S||!e.hasStrip(S))return;E.preventDefault(),E.stopImmediatePropagation();const C=M(),N=C.indexOf(S),F=N+(E.key==="ArrowLeft"?-1:1);N<0||F<0||F>=C.length||(e.onReorder(S,E.key==="ArrowLeft"?C[F]:C[F+1]??null),d(S)?.focus({preventScroll:!0}),requestAnimationFrame(()=>{const U=d(S);U&&document.activeElement!==U&&U.focus({preventScroll:!0})}))},{capture:!0});function A(E,S){const C=S.querySelector(".tab-name");if(!C||S.hasAttribute("data-renaming"))return;const N=e.nameOf(E),F=document.createElement("input");F.type="text",F.className="tab-name-input",F.value=N,F.maxLength=e.nameMax,F.spellcheck=!1,F.autocomplete="off",F.setAttribute("aria-label",`Rename ${N}`),F.setAttribute("data-nc-help",e.renameHelp),S.setAttribute("data-renaming",""),C.after(F),F.focus(),F.select();let U=!1;const R=B=>{if(U)return;U=!0;const _=F.value;F.remove(),S.removeAttribute("data-renaming"),B&&_!==N&&e.onRename(E,_),S.isConnected&&S.focus({preventScroll:!0})};F.addEventListener("keydown",B=>{B.stopPropagation(),B.key==="Enter"?(B.preventDefault(),R(!0)):B.key==="Escape"&&(B.preventDefault(),R(!1))});for(const B of["click","pointerdown","dblclick"])F.addEventListener(B,_=>_.stopPropagation());F.addEventListener("blur",()=>R(!0))}const T=(E,S,C,N)=>{const F=u(E),U=F?.querySelector(".nc-strip-hd");if(!F||!U)return;U.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,cancelable:!0,clientX:C,clientY:N}));const R=document.querySelector("[data-nc-strip-menu]");if(!R)return;const B=()=>document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0,cancelable:!0})),_=(oe,Ee,ke)=>{const X=document.createElement("button");X.type="button",X.className="nc-strip-menu-item",X.dataset.tabMenu=Ee;const Ae=document.createElement("span");return Ae.textContent=oe,X.append(Ae),X.addEventListener("click",()=>{B(),ke()}),X},G=F.dataset.ncFolded==="true";R.append(_(G?"Expand strip":"Minimize strip","fold",()=>{F.querySelector("[data-nc-strip-hide]")?.click(),h()}),_("Rename…","rename",()=>A(E,S)));const de=R.getBoundingClientRect();de.bottom>window.innerHeight-4&&(R.style.top=`${Math.max(4,window.innerHeight-de.height-4)}px`)};t.addEventListener("contextmenu",E=>{const S=E.target?.closest?.(".tab"),C=An(S??null);!S||!C||!e.hasStrip(C)||(E.preventDefault(),T(C,S,E.clientX,E.clientY))});let D=0;t.addEventListener("pointerdown",E=>{if(E.pointerType==="mouse")return;const S=E.target;if(S?.closest?.(".tab-grip, .tab-remove"))return;const C=S?.closest?.(".tab"),N=An(C??null);if(!C||!N||!e.hasStrip(N))return;const F=E.clientX,U=E.clientY;window.clearTimeout(D),D=window.setTimeout(()=>T(N,C,F,U),Zp+200)});for(const E of["pointerup","pointercancel","pointermove"])t.addEventListener(E,S=>{E==="pointermove"&&S.pointerType==="mouse"||window.clearTimeout(D)});return t.addEventListener("dblclick",E=>{const S=E.target?.closest?.(".tab"),C=An(S??null);!S||!C||!e.hasStrip(C)||E.target.closest(".tab-grip, .tab-remove")||A(C,S)}),{sync:c,layout:h,visualOrder:()=>nS(e.order(),e.hasStrip)}}const Ls=$y,St=xy,Fi={system:"System",light:"Light",dark:"Dark"};function oS(e){try{return _s(e?.getItem(Ls))}catch{return"system"}}function iS(e,t){try{t==="system"?e?.removeItem(Ls):e?.setItem(Ls,t)}catch{}}const sS=e=>St[(St.indexOf(e)+1)%St.length]??"system";function lS(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function im(e,t){const n=lS(e);n&&js(t,n)}function cS(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=St.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=Fi[s],l.append(d),l.setAttribute("aria-label",`${Fi[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${Fi[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?sS(s):s;o(c),t(c),r[St.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function o(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(St.indexOf(a)+l+St.length)%St.length,u=St[d]??"system";o(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:o}}function dS(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let d=a.get(l);return d||(d=n(o,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const ua=vA(Le(),El(),location.search);{const e=bA(location.href);if(e)try{history.replaceState(history.state,"",e)}catch{}}const sm=$l(Le());let Kt=!1;const re=new AudioContext({latencyHint:"interactive"});dS(re.audioWorklet,location.href);const Sl=ME(Le()),uS=new URLSearchParams(location.search).has("plugins"),pS=uS,La=f$({ctx:re,moduleUrl:va,base:location.href,remote:pS,store:sx(),frozen:Sl});function Du(e,t){La?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),Ml.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){Ft?.render();for(const s of AE(a,e.getChain()))Mt({message:K.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>Ft?.render()))}),e}function fS(e){return fe.list().find(t=>t.id===e)?.name??e}const Ml=new Set,We=Ux(),Kn={},hS=Wh,Fo=new Map,fe=new oE(re,{restore:e=>We.channels[e],fx:e=>{const t=Qo(re,{moduleUrl:va,bpm:120,state:ph(e,We)});return Kn[e]=t,t},masterFx:()=>{const e=Qo(re,{moduleUrl:va,bpm:120,slots:hs,state:fk(We,hs)});return e.onChange(Va),Du(e,()=>"Master")},channelFx:e=>{go.delete(e);const t=Qo(re,{moduleUrl:va,bpm:W.bpm(),slots:hS,state:We.channelFx[e]??{v:2,chain:[]}}),n=$p(t,W.clock,{mapper:bt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(Va),Fo.set(e,t),t.dispose=(r=>()=>{Ml.delete(t),r()})(t.dispose),Du(t,()=>fS(e))}});fe.setMaster(We.master);fe.setReturn("a",We.returns.a);fe.setReturn("b",We.returns.b);let lm=()=>!1;const bt=new Ag(re,{hold:()=>lm()});bt.start();const cm=DE();let dm=()=>{};const um=qk(re.sampleRate),Po=bk(re,{nodeFor:e=>fe.tapNode(e),latencyFor:e=>fe.tapLatency(e,um.get()),sources:()=>[{id:"master",name:"Master"},...fe.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{dm=e})}),De=vE(),Tt=Yw(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Jt=e=>Y.some(t=>t.id===e),Tl=e=>Y.find(t=>t.id===e)?.name??e,pm=e=>{const t=Y.find(a=>a.id===e),n=we.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},Ya=e=>{gt(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),qe.get(e)?.contentWindow?.focus()},fm=OA({live:Jt,nameOf:Tl,brandOf:pm,reveal:Ya});let Ca=!1,pa=null;const Pi=2e4,Ze=TA({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>qt.value.trim()||"Studio",live:Jt,nameOf:Tl,brandOf:pm,shown:()=>Ve,reveal:Ya,outDb:e=>fe.channelOutDb(e),onStatus:e=>{if(yo(e),WS(e),e==="on"){const t=lo(be());t.on&&!t.ok&&co(be(),{...t,ok:!0})}}});let hm=!1;const Ll=c1(),Cl=s1({now:()=>re.currentTime,labelOf:e=>{const t=Y.find(a=>a.id===e),n=we.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[zl,Ye,ql]}),Ro=ZA(),uo=Dk(window,{shown:()=>Ve,frameDoc:e=>{try{return qe.get(e)?.contentDocument??null}catch{return null}}}),Cn=new Map,Xa=Sx({front:()=>Ve,deliver(e,t){const n=Cn.get(e),a=n?.[n.length-1];a&&((t.kind==="note"||t.kind==="pad")&&t.on&&re.state!=="running"&&Yt().catch(()=>{}),a(t))}}),Wt=Ix({router:Xa,store:be,label:e=>{const t=Y.find(a=>a.id===e);if(!t)return null;const n=we.find(a=>a.id===t.type)?.brand;return n?`${t.name} · ${n}`:t.name}});Wt.el.addEventListener("click",e=>{e.target?.closest?.('[data-midi-id="connect"]')&&Yt().catch(()=>{})});const Do=NE({blocked:()=>!Cl.el.hidden,clearOf:()=>[zl,Ye,ql]}),Il=gx({ctx:re,transport:()=>W.clock.transport,toContextTime:e=>bt.toContextTime(e),now:Re,ticker:e=>ep(e,{intervalMs:20})}),ot=iE({nowBeat:()=>{const e=W.clock.transport;return e.running?e.beatAt(Re()):null},startAudio:()=>re.state==="running"?void 0:Yt(),onDeliver:(e,t)=>{vS(e,t),Nt.delivered(e,t)}}),Nt=ck({now:Re,beatNow:()=>{const e=W.clock.transport;return e.running?e.beatAt(Re()):null},playing:()=>De.playing()});ot.host("studio").onPlayed((e,t)=>Nt.played(e,t));De.onAll(()=>Nt.allIn());setInterval(()=>{Nt.listening&&Nt.poll()},50);const Cs=new Set,Oo=()=>{for(const e of[...Cs])try{e()}catch{}};ot.onChange(()=>{Oo(),bS()});const Zn=XA({name:e=>Y.find(t=>t.id===e)?.name??e});Zn.onChange(()=>{wS(),kS()});window.ncStudio=e1(re,fe,{notes:ot,sounds:Nt,situation:Zn,clock:()=>W.clock,targets:{list:()=>Y.filter(e=>we.find(t=>t.id===e.type)?.noteTarget!==!1).map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:ot.listening(e.id),takesPitch:ot.takesPitch(e.id),...ot.layerOnly(e.id)?{layerOnly:!0}:{}})),listen(e){return Cs.add(e),()=>Cs.delete(e)}},show:e=>{Jt(e)&&Ya(e)},add:e=>qo(e,{show:!1}),countIn:Cl.api,keys:Ro,playKeys:{declare:(e,t)=>uo.route.declare(e,t),onTyping:e=>uo.onTyping(e)},midi:{declare(e,t,n){const a=Cn.get(e)??[];a.push(t),Cn.set(e,a);const r=Xa.declare(e,n);return Wt.refresh(),()=>{r();const o=Cn.get(e),s=o?.indexOf(t)??-1;o&&s>=0&&o.splice(s,1),o&&!o.length&&Cn.delete(e),Wt.refresh()}}},metronome:Il,readout:Do.api,studioTransport:{play:()=>{(!W.running()||De.owner()!==Lo)&&dt.click()},playOnly:e=>{Yt(),!W.running()&&(De.claim(e),W.play(),je())},stop:()=>{W.running()&&W.stop(),je()},running:()=>W.running(),bpm:()=>W.bpm()},chip:(e,t)=>Fl(e,t),holdFirstPlay:e=>{const t=Ll.hold(),n=Ce.hold(e);return()=>{t(),n()}},attached:e=>Ce.attached(e),presets:Tt,share:fm,picker:Ze,legacyCopy:()=>!hA(be()),generation:()=>sm,grab:Po,play:De,mapper:yk(bt),resolve:(e,t)=>LS(e,t),syncScope:cm,fxWorklet:new URL(va,location.href).href});const W=zE(()=>re.state,RE(cm),()=>hm&&re.state==="running"&&bt.ready&&Ll.count===0&&Ce.settled()?null:IS());lm=()=>W.clock.transport.isPlayingAt(Re());function be(){try{return globalThis.localStorage??null}catch{return null}}W.setTempo(XE(be()));const Oe=new Lk(re,()=>fe.tapNode("master"));let un=null,mm=!0;const Ge=new Nk(re,()=>fe.tapNode("master"),Ck(be()));let gm=null;function z(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(r,o===!0?"":String(o));return a.append(...n),a}const dt=z("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Wn=z("input",{type:"number",class:"bpm",min:Ct[0],max:Ct[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),po=z("output",{class:"position","aria-label":"Bar and beat"},"—"),jt=z("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":Z["transport:rec"]},"Rec"),mn=z("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":Z["transport:keep"]},"Keep"),bm=z("div",{class:"keep-held","data-nc-help":Z["keep:held"]}),Nl=[...xk.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],Ja=Nl.map(e=>z("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),ja=Vs({checked:Ge.keeping,labelledBy:"keep-switch-label",onChange:e=>{Ik(be(),e),Ge.setKeeping(e),Ie(e?"Keeping: on":"Keeping: off (nothing held)")}}),mt=z("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},bm,...Ja,z("div",{class:"keep-switch","data-nc-help":Z["keep:switch"]},z("span",{id:"keep-switch-label"},"Keeping"),ja.el)),ym=z("div",{class:"keep-wrap"},mn,mt),ma=z("a",{class:"take",hidden:!0}),qa=new Map;function mS(e){const t=document.getElementById(`tab-${e}`);if(!t)return;const n=qa.get(e);t.toggleAttribute("data-recording",n?.recording===!0),t.toggleAttribute("data-armed",n?.armed===!0&&n?.recording!==!0);const a=t.querySelector(".tab-status");a&&(a.textContent=n?.text??"",a.hidden=!n?.text)}function Is(e,t,n=!1,a=!1){const r=t.replace(/\s+/g," ").trim().slice(0,48);r?qa.set(e,{text:r,recording:n,...a?{armed:a}:{}}):qa.delete(e),mS(e)}const gS={notes:new Set,situation:new Set};function vm(e,t){const n=gS[e];for(const a of n)t.has(a)||Is(a,"");n.clear();for(const[a,r]of t)n.add(a),Is(a,r)}function bS(){const e=new Map;for(const t of ot.statuses()){if(!Jt(t.source))continue;const{now:n,next:a}=t.status;e.set(t.source,`${n}${a&&a!==n?` → ${a}`:""}`)}vm("notes",e)}const Dn=kE(),On=new Map;let Ou=0;const yS=e=>e.split("#")[0]==="calliope";function vS(e,t){if(t.kind==="played"||t.kind==="routes"||!yS(t.source))return;const n=W.clock.transport,a=Re();if(t.kind==="notes")Dn.notes(t.source,e,t.events.map(r=>({start:n.timeAt(r.startBeat),end:n.timeAt(r.startBeat+r.lengthBeats)})));else if(t.kind==="audition")Dn.notes(t.source,e,[{start:a,end:a+t.holdSec}]);else if(t.kind==="off")Dn.cut(t.source,e,t.atBeat!==void 0&&n.running?Math.max(a,n.timeAt(t.atBeat)):a);else return;wm()}function wm(){window.clearTimeout(Ou);const e=Re(),t=$E(W.bpm()),n=Dn.lit(e,t),a=o=>ot.sources().find(s=>s.id===o)?.name||Tl(o);for(const[o,s]of n){let l=On.get(o);l||(l=z("span",{class:"calliope-dot","aria-hidden":"true"}),On.set(o,l)),l.setAttribute("data-nc-help",Z["strip:played-by"].replace("{who}",xE(s.map(a)))),l.setAttribute("data-on",""),km(o)}for(const[o,s]of On)n.has(o)||s.removeAttribute("data-on");const r=Dn.next(e,t);(r!==null||n.size)&&(Ou=window.setTimeout(wm,Math.min(250,Math.max(16,r===null?250:(r-e)*1e3+5))))}function km(e){const t=On.get(e),n=document.getElementById(`tab-${e}`);t&&n?.classList.contains("tab-channel")&&t.parentElement!==n&&n.append(t)}function Fl(e,t){const n=typeof t?.text=="string"?t.text:"";Is(e,n,t?.recording===!0,t?.armed===!0)}const Qe=z("button",{type:"button",class:"situation-chip aria-line",hidden:!0});Qe.addEventListener("click",()=>{const e=Qe.dataset.source;e&&Jt(e)&&Ya(e)});function zu(e){return e.hold?"held":e.recorded&&e.state!=="live"?"recording · offline":e.state==="live"&&e.behindSec!==null?`${Math.round(e.behindSec)} s behind`:e.state}function wS(){const e=Zn.statuses().filter(d=>Jt(d.source)&&d.status.state!=="off");vm("situation",new Map(e.map(d=>[d.source,zu(d.status)])));const t=e[0];if(Qe.hidden=!t,!t)return;const n=t.status;Qe.dataset.source=t.source,Qe.dataset.state=n.state;const a=n.station?`${n.station.net}.${n.station.sta}`:"",r=zu(n),o=a&&!(n.recorded&&n.state!=="live")?`${a} · ${r}`:r,s=Y.find(d=>d.id===t.source),l=we.find(d=>d.id===s?.type)?.brand??t.name;Qe.replaceChildren(z("span",{class:"aria-line-dot","aria-hidden":"true"}),z("span",{class:"aria-line-name"},l),z("span",{class:"aria-line-words"},o)),Qe.setAttribute("aria-label",`${t.name}: ${o}. Show it.`)}const Ia=z("button",{type:"button",class:"situation-chip aria-line motion-chip",hidden:!0}),fo=z("button",{type:"button",class:"motion-dot",hidden:!0},z("span",{class:"motion-dot-mark","aria-hidden":"true"}));for(const e of[Ia,fo])e.addEventListener("click",()=>{const t=e.dataset.source;t&&Jt(t)&&Ya(t)});function kS(){const e=Zn.statuses().find(a=>Jt(a.source)&&(a.status.motion==="live"||a.status.motion==="paused"));if(Ia.hidden=fo.hidden=!e,!e)return;const t=e.status.motion,n=Z[`motion:${t}`].replace("ARIA 1",e.name);for(const a of[Ia,fo])a.dataset.source=e.source,a.dataset.state=t,a.setAttribute("data-nc-help",n),a.setAttribute("aria-label",`My phone: motion ${t}. Show ${e.name}.`);Ia.replaceChildren(z("span",{class:"aria-line-dot","aria-hidden":"true"}),z("span",{class:"aria-line-name"},"PHONE"),z("span",{class:"aria-line-words"},`· ${t}`))}const Je=z("span",{class:"status",role:"status"}),qt=z("input",{type:"text",class:"scene-name",maxlength:60,value:JE(be()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Pl=(e,t,n,a)=>z("button",{type:"button",class:"ghost scene-item",role:"menuitem","data-scene":e,title:t},z("span",{class:"scene-item-label"},n),...a?[z("kbd",{class:"scene-item-key","aria-hidden":"true"},a)]:[]),Rl=Pl("save","Save this Scene as a file","Save",CA());Rl.setAttribute("aria-keyshortcuts",nm()?"Meta+S":"Control+S");const xm=Pl("load","Load a Scene file","Load…"),$m=Pl("new","Start a new Scene","New scene"),Na=z("input",{type:"file",accept:".json,application/json",hidden:!0}),ut=z("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},z("span",{class:"picker-dot","aria-hidden":"true"}),z("span",{class:"picker-label"},"Picker")),Dl=cS(oS(be()),e=>{iS(be(),e),js(e);for(const t of qe.values())im(t,e)});js(Dl.choice);const Ol=px(cx(be()),e=>{dx(be(),e),qs(e);for(const t of qe.values())xh(t,e)},{theme:Dl.el});qs(Ol.look);const zl=z("h1",{class:"brand","aria-label":"TRIKI Studio"},z("span",{"aria-hidden":"true"},z("span",{class:"brand-name"},"TRIKI"),z("span",{class:"brand-sep"}," / "),"Studio")),Ns=z("span",{class:"beat-light","aria-hidden":"true"}),cn=z("span",{class:"status-long"}),Mn=z("span",{class:"status-short"});Je.append(cn,Mn);const Ye=z("header",{class:"top"},z("div",{class:"transport"},dt,z("label",{class:"tempo"},Wn,z("span",{class:"tempo-unit"},"BPM")),Ns,po),z("div",{class:"record"},jt,ym,ma),z("div",{class:"situation-chips"},Qe,Ia),fo,Je),Bu=window.matchMedia("(min-width: 1200px)");let _u="";function Bl(e=!1){const t=Je.hasAttribute("data-quiet"),n=`${t}|${Bu.matches}|${cn.textContent}|${Qe.textContent}|${Qe.hidden}`;if(!e&&n===_u||(_u=n,Je.removeAttribute("data-below"),t||!Bu.matches))return;const a=r=>!!r&&r.scrollWidth>r.clientWidth+1;(a(Je)||a(Qe.querySelector(".aria-line-words")))&&Je.setAttribute("data-below","")}new ResizeObserver(()=>Bl(!0)).observe(Ye);new MutationObserver(()=>Bl()).observe(Qe,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["hidden"]});const Em=ex();tx(Ye.querySelector(".record"),Em);const Am=z("button",{type:"button",class:"ghost scene-item scene-item-reset",role:"menuitem","data-reset":"scene"},z("span",{class:"scene-item-label"},"Reset Studio…")),_l=NA([Rl,xm,$m,z("div",{class:"scene-menu-sep",role:"separator"}),Am]);Am.addEventListener("click",()=>void Vm(_l.button));const xS=z("div",{class:"scene-pick"},qt,_l.el),zo=z("div",{class:"scene-actions"},xS,Wt.el,ut,Ol.el),jl=z("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");jl.addEventListener("click",()=>void Vm(ho.button));const $S=z("div",{class:"menu-credit"},"TRIKI · a NetComposer project");zo.append(jl,$S);const ho=bw({panel:zo}),Sm=z("span",{class:"offline-line foot-offline",role:"status",hidden:!0}),Mm=z("div",{class:"offline-line menu-offline",role:"status",hidden:!0});zo.insertBefore(Mm,jl);function ES(e){document.documentElement.dataset.studioOffline=e;for(const t of[Sm,Mm]){if(t.hidden=e==="none",e==="none"){t.replaceChildren(),t.removeAttribute("data-nc-help");continue}if(t.dataset.state=e,t.setAttribute("data-nc-help",Z[`offline:${e}`]),t.replaceChildren(z("span",{},uE[e])),e==="update"){const n=z("button",{type:"button",class:"offline-reload"},"Reload");n.addEventListener("click",()=>void yE()),t.append(z("span",{class:"offline-sep","aria-hidden":"true"}," · "),n)}}}const AS=z("span",{class:"foot-credit"},"TRIKI · a NetComposer project"),SS=z("footer",{class:"studio-foot"},Sm,AS),Bo=kk(document,function*(){for(const e of qe.values())try{e.contentDocument?.documentElement&&(yield e.contentDocument)}catch{}}),ql=z("div",{class:"scene",role:"group","aria-label":"Scene"},zo,Na,ho.button,Bo.button);Oe.supported||(jt.disabled=!0,jt.title="This browser can't record audio",mn.disabled=!0);const Qa=z("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),_o=z("div",{class:"stage"}),Hl=z("label",{class:"tab tab-add",title:"Add an instrument"},z("span",{"aria-hidden":"true"},"+")),zn=z("select",{class:"tab-add-select","aria-label":"Add an instrument"});zn.append(z("option",{value:""},"Add an instrument"),...ll.map(e=>{const t=z("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));zn.addEventListener("change",()=>{const e=zn.value;zn.value="",e&&qo(e)});Hl.append(zn);Qa.append(Hl);let ea=null;fw();Bo.attach(document);const Ha=z("div",{class:"spine","aria-hidden":"true"}),qe=new Map;let Y=Nw(Iw(we),we),Ve=Y[0]?.id??"";const Tm=new URLSearchParams(location.search).has("measure"),ju=new Map,Vl=Rw((e,t)=>fetch(e,t));for(const e of Y)Vl(e.src);const MS=2e4,Ce=jw(Y.map(e=>{const t=we.find(a=>a.id===e.type),n=t?.brand??e.name;return{id:e.id,brand:e.n>1?`${n} ${e.n}`:n,name:t?.name??e.name}})),Lm=new Set,Fa=new Map;for(const e of Y){let t=()=>{};const n=new Promise(a=>{t=a});Fa.set(e.id,{go:t,turn:n})}function Cm(e){const t=z("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);Bm(t,e),t.addEventListener("click",()=>gt(e.id)),Qa.append(t),ea?.sync();const n=ju.get(e.type)??Promise.resolve(),a=Vl(e.src),r=Promise.all([n,a,Fa.get(e.id)?.turn]).then(([,o])=>new Promise(s=>{if(!Y.some(u=>u.id===e.id))return s();const l=z("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Hf(e,Tm,o),allow:"autoplay; clipboard-read; clipboard-write; microphone; display-capture; accelerometer; gyroscope; magnetometer; screen-wake-lock"});qe.set(e.id,l),Ce.requested(e.id),window.setTimeout(()=>Ce.fail(e.id),Ow),l.addEventListener("load",()=>{Lm.add(e.id),Ce.loaded(e.id),Vo()},{once:!0});const d=window.setTimeout(s,MS);l.addEventListener("load",()=>TS(l)),l.addEventListener("load",()=>{window.clearTimeout(d),s()},{once:!0}),_o.append(l),gt(Ve)}));return ju.set(e.type,r),r}const Im=window.matchMedia(Fp);function Nm(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",Im.matches)}catch{}}Im.addEventListener("change",()=>{for(const e of qe.values())Nm(e)});function TS(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",t.defaultView&&IA(t.defaultView,qm),xh(e,Ol.look),im(e,Dl.choice),Nm(e),Bo.attach(t);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Pm.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Ve&&Rm())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),jo()}).observe(r),Ul.add(e),Fm(e)}const Ul=new Set;function Fm(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){Ul.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Ye).position==="sticky"?Ye.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let Ri=!1;function jo(){Ri||(Ri=!0,requestAnimationFrame(()=>{Ri=!1;for(const e of Ul)Fm(e)}))}window.addEventListener("scroll",jo,{passive:!0});window.addEventListener("resize",jo);const Pm=new Map;function Rm(){const e=Pm.get(Ve);e===void 0?Ha.style.removeProperty("--spine-top"):Ha.style.setProperty("--spine-top",`${e}px`)}function Dm(e){if(!e){Ha.replaceChildren();return}const t=JA(e),n=z("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),Ha.replaceChildren(z("span",{class:"spine-text"},n,z("span",{class:"spine-rest"},t.rest)))}function gt(e){Ve=e,Xa.shown(e),Wt.refresh(),Vo(),Ze.seen(e),Dm(Y.find(t=>t.id===e)),Rm(),jo();for(const t of Y){const n=t.id===e;qe.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const LS=Dw(()=>Y.map(e=>({instance:e,window:()=>qe.get(e.id)?.contentWindow,readyState:()=>{try{return qe.get(e.id)?.contentDocument?.readyState}catch{return}}})),we);function qo(e,t={}){Km();const n=we.find(s=>s.id===e);if(!n)return null;const a=n.single?Y.find(s=>s.type===n.id):void 0;if(a)return t.show!==!1&&gt(a.id),a.id;const r=Lw(Y,n),o=Y.map(s=>s.type).lastIndexOf(r.type);return Y=o<0?[...Y,r]:[...Y.slice(0,o+1),r,...Y.slice(o+1)],Kt||Qn(Y),Cm(r),Oo(),ea?.sync(),t.show!==!1&&gt(r.id),Ft?.render(),r.id}function Om(e,t){const n=Y.find(l=>l.id===e);if(!n)return;const a=Y.filter(l=>l.id!==e),r=l=>we.find(d=>d.id===l.type)?.sound===!1,o=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:o+1:a.findIndex(l=>l.id===t);Y=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],Kt||Qn(Y),Ft?.render(),ea?.sync()}function zm(e,t){Y=Tw(Y,e,t,we),Kt||Qn(Y);const n=Y.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&Bm(a,n),qe.get(e)?.setAttribute("title",n.name),Oo(),Ve===e&&Dm(n),fe.rename(e,n.name)}async function Fs(e,t){const n=Y.find(d=>d.id===e),a=n?.name??e,r=we.find(d=>d.id===n?.type)?.sound===!1;if(!await pt({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;Km(),Y=Y.filter(d=>d.id!==e),Kt||Qn(Y),fm.forget(e),Ze.forget(e),ot.drop(e),Dn.drop(e),On.get(e)?.remove(),On.delete(e),Zn.drop(e),Ro.drop(e),uo.route.drop(e),Xa.drop(e),Cn.delete(e),Wt.refresh(),Il.want(e,!1),Do.api.set(e,null),Fl(e,null);const s=De.playing().includes(e);De.drop(e),s&&De.out(e);const l=qe.get(e);qe.delete(e),Ce.remove(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),ea?.sync(),fe.detach(e),CS(e),w$(Le(),e),Ve===e&&gt(Y[0]?.id??""),Oo()}function Bm(e,t){const n=we.find(d=>d.id===t.type);if(n?.sound!==!1){const d=z("span",{class:"tab-grip","aria-hidden":"true",title:"Drag to move this channel"}),u=z("span",{class:"tab-name"},t.name),c=z("span",{class:"tab-short","aria-hidden":"true"},aS(t.name)),p=z("span",{class:"tab-brand","aria-hidden":"true"},n?.brand??""),h=z("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});h.textContent="×";const b=g=>{g.stopPropagation(),Fs(t.id,e)};h.addEventListener("click",b),h.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&b(g)}),e.classList.add("tab-channel"),n?.identity&&e.style.setProperty("--tab-identity",`var(--nc-ui-${n.identity})`),e.title=t.name,e.setAttribute("data-nc-help",Z["strip:name"]),e.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight"),e.replaceChildren(d,z("span",{class:"tab-label"},u,c,p),h),km(t.id);return}const a=z("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=z("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const o=d=>{d.stopPropagation(),Fs(t.id,e)};r.addEventListener("click",o),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&o(d)});const s=qa.get(t.id),l=z("span",{class:"tab-status"},s?.text??"");l.hidden=!s?.text,e.toggleAttribute("data-recording",s?.recording===!0),e.toggleAttribute("data-armed",s?.armed===!0&&s?.recording!==!0),e.replaceChildren(a,z("span",{class:"tab-words"},z("span",{class:"tab-word"},t.name),l),r)}const mo=z("div",{class:"mix"});mo.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Ve&&Y.some(a=>a.id===n)&&gt(n)});ea=rS({tabs:Qa,addTab:Hl,mixHost:mo,order:()=>Y.map(e=>e.id),hasStrip:e=>{const t=Y.find(n=>n.id===e);return we.find(n=>n.id===t?.type)?.sound!==!1},onReorder:(e,t)=>Om(e,t),onRename:(e,t)=>zm(e,t),nameOf:e=>Y.find(t=>t.id===e)?.name??"",renameHelp:Z["strip:rename"],nameMax:il});let Ft=null,Yn=0;const go=new Set;function CS(e){go.add(e),delete We.channels[e],delete We.channelFx[e],Fo.delete(e),Va()}let Za=!1;function Va(){window.clearTimeout(Yn),!Za&&(Yn=window.setTimeout(()=>{Nh(_m())},300))}function _m(){const e={...We.channels};for(const r of fe.list())e[r.id]=r.strip;for(const r of go)delete e[r];const t={};for(const r of["a","b"]){const o=Kn[r];o&&(t[r]=o.getState())}const n=fe.masterFx?.getState()??null,a={...We.channelFx};for(const[r,o]of Fo)a[r]=o.getState();for(const r of go)delete a[r];return{v:1,channels:e,master:fe.masterPositionValue,returns:{a:{on:fe.returns.a.on,level:fe.returns.a.level},b:{on:fe.returns.b.on,level:fe.returns.b.level}},insert:{on:n?hk(n):We.insert.on},fx:t,channelFx:a,masterFx:n??We.masterFx}}fe.onChange(()=>{Ft?.render(),Va(),Ze.changed()});for(const e of Object.values(Kn))e?.onChange(Va);async function Yt(){re.state!=="running"&&await re.resume()}const qu=1500;async function IS(){Ce.settled()||(Yt(),await Ce.whenSettled());const e=performance.now()+qu;await Promise.race([Yt(),new Promise(t=>setTimeout(t,qu))]),await bt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([Ll.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}dt.addEventListener("click",()=>{Yt(),W.running()&&De.owner()===Lo?W.stop():W.running()?De.claimAll():(De.claimAll(),W.play()),je()});function jm(){const e=Number(Wn.value);W.setTempo(e),Kt||Jh(W.bpm(),be())}qt.addEventListener("change",()=>{qt.value=Xt(qt.value),Kt||Qh(qt.value,be())});function NS(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=z("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Rl.addEventListener("click",()=>void Gl());function qm(){_l.close(),Gl()}document.addEventListener("keydown",e=>{!am(e)||e.repeat||(e.preventDefault(),qm())});async function Gl(){const e=Xt(qt.value),t=Y.map(o=>o.id),n=await Tt.collect(t),a=UE(jE({name:e,bpm:W.bpm(),instances:Y,mix:_m(),presets:n}));NS(YE(e),a.text,"application/json");const r=Y.filter(o=>!n[o.id]).map(o=>o.name);Ie(KE({name:e,missing:r,song:wl(n),droppedSong:a.droppedSong}))}xm.addEventListener("click",()=>Na.click());Na.addEventListener("change",async()=>{const e=Na.files?.[0];if(Na.value="",!e)return;const t=qE(await e.text(),we.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){Ie(t.error);return}const n=t.scene;await pt({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Hm({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});$m.addEventListener("click",async()=>{await pt({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Hm({name:vl,bpm:io,instances:Oa(we),mix:Ba()})});function Hm(e){W.running()&&W.stop(),Za=!0,window.clearTimeout(Yn);const t=e.instances.map(({id:n,name:a})=>{const[r,o]=n.split("#"),s=we.find(l=>l.id===r);return s?Jn(s,o?Number(o):1,a):null}).filter(n=>n!==null);Qn(t),Nh(e.mix),Jh(e.bpm,be()),Qh(e.name,be()),Tt.stash({...e.presets??{}}),location.reload()}async function Vm(e){try{ho.isOpen()&&ho.close()}catch{}Ue("dialog: opened");const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, Look and meters."];Oe.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):un&&!mm&&t.push({text:`Your last Rec take (${un.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"});const n=await pt({title:"Reset the Studio?",body:"The music stops and the Studio starts over as a blank canvas: one ASTRID at its factory sound, a fresh mix, 120 BPM, every fold closed. Instruments you add start empty. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void Gl()},confirmLabel:"Reset",danger:!0,returnFocus:e});Ue(n?"dialog: Reset":"dialog: Cancel"),n&&Gm("reset")}const Um=[];function Ue(e,t){const n=t?`${e}: ${t instanceof Error?t.message:String(t)}`:e;Um.push(n),t?console.error(`[reset] ${n}`):console.info(`[reset] ${n}`)}let Bn=null;function Gm(e){Ue(`${e}: asked`);let t=null;try{t=mA(Le(),El(),e)}catch(n){Ue(`${e}: storing the request failed`,n)}if(!t){Hu("This browser's storage is blocked: the Studio can't reset");return}Ue(`${e}: request stored`);try{W.running()&&W.stop()}catch(n){Ue(`${e}: stopping the music failed (going on)`,n)}Za=!0,window.clearTimeout(Yn);try{Bn=gA(location.href,e,t),Ue(`${e}: going to ${Bn}`),location.replace(Bn)}catch(n){Ue(`${e}: navigating failed, reloading`,n);try{location.reload()}catch(a){Ue(`${e}: reloading failed`,a)}}window.setTimeout(()=>{Ue(`${e}: still on the page after 5 s`),Hu(`The Studio didn't reload: reload to ${e==="reset"?"reset":"undo"}`,()=>location.reload())},5e3)}function Hu(e,t){Ie(e,Vu);try{const n=Mt({message:e,duration:Vu,anchor:Ye,...t?{actionLabel:"Reload",onAction:t}:{}});n.el.dataset.resetProblem=""}catch(n){Ue("showing the problem failed",n)}}const Vu=12e3;addEventListener("pageshow",e=>{!e.persisted||!Bn||(Ue("restored from the page cache: going again"),location.replace(Bn))});addEventListener("storage",e=>{if(!(Kt||Bn||e.key!==Io&&e.key!==null)&&$l(be())!==sm){Kt=!0,Za=!0,window.clearTimeout(Yn),Ue("another tab reset the Studio: this page saves nothing more"),document.documentElement.dataset.studioStale="";try{const t=Mt({message:"The Studio was reset in another tab",actionLabel:"Reload",duration:FS,anchor:Ye,onAction:()=>location.reload()});t.el.dataset.studioStale=""}catch{Ie("The Studio was reset in another tab: reload")}}});const FS=6e5;let Ps=null;function PS(){const e=Mt({message:"Studio reset",actionLabel:"Undo",duration:eA,anchor:Ye,onAction:()=>Gm("undo"),onClose:t=>{Ps=null,t!=="action"&&No(Le(),El())}});e.el.dataset.resetUndo="",Ps=e}function Km(){Ps?.close("close")}let Uu=0,Rs="",Ds=0;function Ie(e,t=4e3){Rs=e,Ds=performance.now()+t,je(),window.clearTimeout(Uu),Uu=window.setTimeout(()=>{Ds=0,je()},t)}Wn.addEventListener("change",jm);Wn.addEventListener("keydown",e=>{e.key==="Enter"&&jm()});jt.addEventListener("click",()=>{Yt();const e=Oe.state;e==="recording"?RS():e==="arming"||e==="armed"?(Oe.cancel(),Ie("Rec cancelled")):e==="idle"&&(Oe.arm(W.playing()),Wm())});async function RS(){const e=await Oe.stop();e&&(un&&URL.revokeObjectURL(un.url),un={url:URL.createObjectURL(e.blob),take:e},ma.href=un.url,ma.download=e.name,ma.textContent=`Save take (${e.seconds.toFixed(1)} s)`,ma.hidden=!1,mm=!1)}function Wm(){const e=Oe.state;if(e!=="arming"&&e!=="armed")return;const t=W.clock.transport;if(!t.running||t.startTime===null){Oe.schedule(null);return}const n=Math.round(bt.toContextTime(t.startTime)*re.sampleRate);Oe.schedule(n+Po.latency("master"))}function DS(){const e=Oe.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";jt.dataset.state=t?"armed":n?"recording":"idle",jt.setAttribute("aria-pressed",String(n)),jt.textContent=t?"Armed":n?"Stop rec":"Rec",jt.disabled=e==="stopping"||!Oe.supported,je()}Oe.onChange(DS);let Ua=null;function OS(){const e=W.clock.transport;!e.running||e.startTime===null||(Ua=Math.round(bt.toContextTime(e.startTime)*re.sampleRate)+Po.latency("master"))}function Ym(){return!W.clock.transport.running||Ua===null?null:{origin:Ua,barFrames:240/W.bpm()*re.sampleRate}}function Xm(e){const t=Nl[e];return!t||t.key==="since"&&Ua===null?null:t.choice(Ua??0)}function Ho(){const e=!mt.hidden;if(mn.setAttribute("aria-expanded",String(e)),mn.dataset.keeping=Ge.keeping?"on":"off",!e)return;ja.checked!==Ge.keeping&&ja.set(Ge.keeping);const t=Ge.status,n=mh(t)/(t.sampleRate||re.sampleRate);bm.textContent=Ge.keeping?`${ms(n)} of sound held`:"Keeping is off";const a=Ym();Ja.forEach((r,o)=>{const s=Xm(o),l=s?Ge.plan(s,a):null;r.disabled=!l;const d=Nl[o];d?.key==="since"&&(r.textContent=l?`Keep since Play (${ms((l.to-l.from)/(t.sampleRate||re.sampleRate))})`:d.label)})}Ge.onChange(Ho);function Jm(){mt.hidden&&(mt.hidden=!1,Ge.refresh(),Ho(),(Ja.find(e=>!e.disabled)??ja.el).focus())}function er(e=!1){mt.hidden||(mt.hidden=!0,Ho(),e&&mn.focus())}mn.addEventListener("click",()=>{mt.hidden?Jm():er()});document.addEventListener("pointerdown",e=>{!mt.hidden&&!ym.contains(e.target)&&er()});mt.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),er(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...Ja.filter(r=>!r.disabled),ja.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});Ja.forEach((e,t)=>e.addEventListener("click",()=>{const n=Xm(t);n&&zS(n)}));async function zS(e){er(!0);const t=await Ge.keep(e,{grid:Ym(),bpm:W.bpm()});if(!t){Ie("Nothing held to keep");return}gm=t;const n=URL.createObjectURL(t.blob);z("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),Ie(`Kept ${ms(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||mn.disabled||(e.preventDefault(),mt.hidden?Jm():er(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"&&e.code!=="Backspace")return;const t=e.target;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))){if(Ro.press("studio",e)){e.preventDefault();return}e.code!=="Space"||e.repeat||(e.preventDefault(),dt.click())}});Qa.addEventListener("keydown",e=>{if(e.target===zn||e.altKey)return;const t=ea?.visualOrder()??Y.map(r=>r.id),n=t.indexOf(Ve),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),gt(a),document.getElementById(`tab-${a}`)?.focus())});function je(){const e=W.running()&&De.owner()===Lo;dt.textContent=e?"Stop":"Play",dt.setAttribute("aria-pressed",String(e)),document.activeElement!==Wn&&(Wn.value=String(Math.round(W.bpm()*10)/10));const t=W.position();po.value=t?`${t.bar}.${t.beat}`:"—";const n=W.peers().length;cn.textContent=re.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Mn.textContent=re.state==="running"?"":"Audio off";const a=Oe.state==="arming"||Oe.state==="armed";a&&(cn.textContent="Rec armed: waiting for sound",Mn.textContent="Rec armed"),Je.classList.toggle("off",re.state!=="running");const{done:r,total:o}=Ce.counts(),s=!Ce.settled(),l=!s&&bo>0&&performance.now()-bo<Qm;if(Je.classList.toggle("loading",s),Je.classList.toggle("just-ready",l),s)cn.textContent=`Loading the Studio… ${r} of ${o} instruments ready`,Mn.textContent=`Loading ${r}/${o}`,Je.classList.remove("off");else if(l&&!a){const c=Ce.items().filter(p=>p.state==="failed");cn.textContent=c.length?`Studio ready: ${c.map(p=>p.brand).join(", ")} didn't load`:"Studio ready: press Play",Mn.textContent="Ready",Je.classList.remove("off")}const d=Ds>performance.now();d&&(cn.textContent=Rs,Mn.textContent=Rs);const u=l&&Ce.items().some(c=>c.state==="failed");Je.toggleAttribute("data-quiet",!(d||a||u)),Ye.toggleAttribute("data-running",W.running()),Bl(),s||(re.state==="running"?dt.removeAttribute("data-nc-help"):dt.setAttribute("data-nc-help",Z["transport:play-off"]))}const Qm=2500;let bo=0;W.clock.onChange(()=>{W.clock.transport.running&&(hm=!0),OS(),Ho(),W.running()||De.clear(),Wm(),je()});W.clock.onChange(e=>{e.kind==="start"?Nt.started(e.beat,De.owner()):e.kind==="stop"&&Nt.stopped()});De.onChange(je);De.onLastOut(()=>{W.running()&&W.stop(),je()});W.clock.onChange(()=>Ft?.render());W.peer.onPeers(je);re.addEventListener("statechange",je);const BS=.25;let Gu=performance.now();function Zm(e){const t=Math.min(.1,(e-Gu)/1e3);Gu=e,Ft?.frame(t);const n=W.position(),a=n?`${n.bar}.${n.beat}`:"—";po.value!==a&&(po.value=a);const r=W.beatPhase(),o=r!==null&&r<BS;Ns.hasAttribute("data-on")!==o&&Ns.toggleAttribute("data-on",o),requestAnimationFrame(Zm)}const eg=z("ul",{class:"boot-list"}),tg=z("div",{class:"boot-panel"},z("p",{class:"boot-title"},"Loading the Studio"),eg,z("p",{class:"boot-note"},"Play is ready once every instrument is in."));_o.append(tg);let Ku=!1;function Vo(){const e=Ce.items(),{done:t,total:n}=Ce.counts(),a=Ce.settled();if(a&&!bo&&(bo=performance.now(),document.documentElement.dataset.studioLoaded="",window.setTimeout(je,Qm)),Ku){je();return}Ku=a,document.documentElement.toggleAttribute("data-studio-loading",!a),Ye.style.setProperty("--boot-done",String(n?t/n:1)),dt.disabled=!a,a||dt.setAttribute("data-nc-help",Z["transport:play-loading"]),eg.replaceChildren(...e.map(o=>z("li",{class:"boot-item","data-boot":o.state},z("span",{class:"boot-mark","aria-hidden":"true"}),z("span",{class:"boot-name"},z("span",{class:"boot-brand"},o.brand)," ",z("span",{class:"boot-type"},o.name)),z("span",{class:"boot-word"},Bw[o.state]))));for(const o of Y){const s=document.getElementById(`tab-${o.id}`),l=a?void 0:e.find(d=>d.id===o.id)?.state;l?s?.setAttribute("data-boot",l):s?.removeAttribute("data-boot")}const r=a||Lm.has(Ve);tg.hidden=r,_o.classList.toggle("booting",!r),je()}Ce.onChange(Vo);function _S(e){Vl(e.src).then(t=>{const n=new URL(Hf(e,Tm,t),location.href).href;return fetch(n,{priority:"low"}).then(a=>a.ok?a.text():"").then(a=>{for(const r of Uw(a,n))document.head.querySelector(`link[rel="prefetch"][href="${CSS.escape(r)}"]`)||document.head.append(z("link",{rel:"prefetch",href:r}))})}).catch(()=>{})}function jS(){const e=qw(Y.map(t=>t.id),Ve);Hw(e,t=>{if(Fa.get(t)?.go(),t===e[0])for(const n of Y)n.id!==t&&_S(n);return Ce.whenDone(t)},()=>Vw()).then(()=>{for(const t of Fa.values())t.go();Fa.clear()})}async function qS(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.replaceChildren(zl,Ye,ql,Bo.band,mo,z("main",{class:"instruments"},Qa,z("div",{class:"bay"},Ha,_o),SS),Cl.el,Do.el),Ft=Y$(mo,fe,{order:()=>Y.map(t=>t.id),catalogue:ll.filter(t=>t.sound!==!1),bpm:()=>W.bpm(),onAdd:qo,onRemove:(t,n)=>void Fs(t,n),onReorder:(t,n)=>Om(t,n),onRename:(t,n)=>zm(t,n),...La?{plugins:La}:{}});for(const t of Y)Cm(t);Vo(),re.state==="running"&&await re.suspend(),await re.audioWorklet.addModule(zA),Em.start(re,!0),dm(),Oe.attach(),Ge.attach(),await W.start();for(const t of[Kn.a,Kn.b,fe.masterFx])t&&$p(t,W.clock,{mapper:bt});jS(),gt(Ve),je(),requestAnimationFrame(Zm),window.setInterval(()=>fe.parkIdleReturns(),aE),document.documentElement.dataset.studioReady="",ua&&(document.documentElement.dataset.studioReset=ua),ua==="reset"?PS():ua==="undo"?Ie("Reset undone"):ua==="failed"&&Ie("Couldn't reset: this browser's storage is full"),VS(),Wu(),window.addEventListener("hashchange",()=>void Wu()),GS(),Wt.autoConnect(),window.setTimeout(()=>bE({script:new URL(import.meta.url).pathname,builds:()=>mE([...qe.values()].map(t=>t.src),location.href),onChange:ES}),3e3),La&&TE({ctx:re,running:()=>SE([...Ml].map(t=>t.getChain())),onFrozen:HS})}async function HS(e){Sl.add(e.map(a=>a.id)),window.clearTimeout(Yn),Za=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),Ie(`${t} froze the audio`),await pt({title:K.frozenTitle,body:K.frozenBody(t),confirmLabel:K.frozenOpen,cancelLabel:K.frozenStay})&&window.open(location.href,"_blank")}async function Wu(){if(!Ap(location.hash))return;const e=location.hash;try{history.replaceState(null,"",location.pathname+location.search)}catch{}const t=await gy(e);if(!t)return;if("error"in t){Ie(t.error);return}const n=qo(t.type);if(!n){Ie("Couldn't add that instrument.");return}Tt.stash({...Tt.peek(),[n]:by(t.envelope)}),Ie(`Added ${t.name} from a link`)}function VS(){const e=new Set(Tt.pending());if(!e.size)return;const t=[],n=s=>Y.find(l=>l.id===s)?.name??s,a=wl(Tt.peek()),r=()=>{window.clearTimeout(o);const s=[...t,...Tt.dropPending()].map(n);Ie(WE({name:Xt(qt.value),kept:s,song:a}))};Tt.onApplied((s,l)=>{e.delete(s)&&(l||t.push(s),e.size||r())});const o=window.setTimeout(r,Kw)}window.__studio={resetTrail:Um,ctx:re,mixer:fe,grab:Po,recorder:Oe,sounds:Nt,keys:Ro,keyRoute:uo.route,midi:{router:Xa,control:Wt},metronome:Il,readout:Do.api,moduleChip:Fl,tabLine:e=>qa.get(e)??null,get lastTake(){return un?.take??null},keeper:Ge,get lastKeep(){return gm},limiterDelay:um,mapper:bt,transport:W,frames:qe,show:gt,get instances(){return Y},fx:Kn,plugins:La,frozen:Sl,channelCores:Fo,get mix(){return Ft},situation:Zn,notes:{bus:ot,dev:(e,t,n={})=>{const a=dE(ot.source(e,e),W.clock,{settings:t});for(const[r,o]of Object.entries(n))a.source.setTarget(r,{role:o.role,on:o.on??!0,...o.octave===void 0?{}:{octave:o.octave}});return a}}};qS();const US={off:"Picker",connecting:"Picker…",on:"Picker on",away:"Picker: no answer",ask:"Picker: connect",blocked:"Picker: blocked"};function yo(e){ut.dataset.picker=e;const t=ut.querySelector(".picker-label");t&&(t.textContent=US[e]),ut.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),ut.dataset.ncHelp=Z[`picker:${e}`]}yo("off");async function GS(){let e=lo(be());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const r=t?Al(t):e.address;r&&(e={on:!0,address:r},co(be(),e))}if(!e.on)return;const n=await $A(navigator.permissions,location.hostname,r=>{const o=lo(be()),s=ut.dataset.picker;o.on&&(r==="granted"&&(s==="ask"||s==="blocked")?Ze.start(o.address):r==="denied"&&Ze.status!=="on"&&(Ze.stop(),yo("blocked")))}),a=EA(e,n);a==="start"?Ze.start(e.address):a!=="off"&&yo(a)}ut.addEventListener("click",()=>void KS());async function KS(){const e=lo(be()),t=ut.dataset.picker;if(t==="ask"||t==="blocked"){Ca=!0,Ze.start(e.address);return}if(Ze.status!=="off"){if(!await pt({title:"Disconnect the Sample Picker?",body:"The Picker won't see or load this Studio's NYX pads until you connect it again.",confirmLabel:"Disconnect",returnFocus:ut}))return;co(be(),{...e,on:!1}),Ze.stop();return}await pt({title:"Connect the Sample Picker?",body:`Connected, the Sample Picker on this computer (${e.address}) shows your NYX's pads, and a tap on a pad there loads the sound here. Chrome may ask to let this site reach this computer: choose Allow.`,confirmLabel:"Connect",returnFocus:ut})&&(co(be(),{...e,on:!0}),Ca=!0,Ze.start(e.address))}function WS(e){if(e==="on"||e==="off"){Ca=!1,pa?.close("close");return}if(e!=="away"||!Ca)return;Ca=!1;const t="Can't reach the Sample Picker. Start it on this computer (it must be on port 5177). If it's running, allow Local network access for this site in Chrome's site settings.";Ie("Can't reach the Sample Picker",Pi);try{pa?.close("close");const n=Mt({message:t,duration:Pi,anchor:Ye,onClose:()=>{pa===n&&(pa=null)}});n.el.dataset.pickerCantReach="",pa=n}catch{Ie(t,Pi)}}
