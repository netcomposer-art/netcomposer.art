(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Ht=1e-9;function Mp(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Ui{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Mp(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Ht&&(r=s.bpm);const i=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+Ht)continue;const l=this.clamp(s.bpm);l!==i[i.length-1].bpm&&i.push({beat:s.beat,time:0,bpm:l})}this.segs=i,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Ht){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ht;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const i=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(i,n);for(let l=1;l<=s;l++)this.setTempoAt(i+(t-i)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Ui({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Ht)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Ht)return n[a];return n[0]}}const Tp=Object.freeze({beatsPerBar:4,beatUnit:4}),en=1e-9;function Lp(e){return Math.floor(e+en)}function Xl(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-en)*t;return n&&r<=e+en?r+t:r}class Cp{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Ui({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Tp}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-en&&(this.stopTime===null||t<this.stopTime-en)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-en?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=Lp(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return Xl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Jl="nc-clock/snapshot",Ql=1;function Np(e,t="local"){return{format:Jl,version:Ql,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Ip(e,t){const n=Fp(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Je=e=>typeof e=="number"&&Number.isFinite(e),Zo=e=>e===null||Je(e);function Fp(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Jl&&n("format"),(!Je(t.version)||Math.floor(t.version)!==Ql)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Je(t.anchor.beat)||!Je(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Je(a.beat)&&Je(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Je(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Je(t.meter.beatUnit))&&n("meter"),(!Zo(t.startTime)||!Zo(t.stopTime)||!Je(t.stoppedBeat))&&n("transport times"),t}class Pp{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Cp(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Ip(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Np(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const zp="nc-sync/1",Dp=1,Rp="nc-sync",Op="nc-sync-leader",Bp=0,Zl=.5,ec=.75;function jp(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Zl&&e<=ec?e:null}const wr=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),wn=e=>typeof e=="number"&&Number.isFinite(e),oa=e=>typeof e=="string"&&e.length>0;function qp(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Dp||!oa(t.type)||!oa(t.from)||!wn(t.term)||!wn(t.seq)||!wn(t.sentAt))return null;switch(t.type){case"hello":return oa(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return wn(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&wn(t.slot)?t:null;case"ping":case"pong":return oa(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function _p(e,t,n,a,r){return{proto:zp,from:t,term:n,seq:a,sentAt:r,...e}}function Pe(){return(performance.timeOrigin+performance.now())/1e3}const xr=.003,Vp=3,kr=.002+1e-6,Hp=.01,es=500;class Up{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Hp:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=xr&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,i=this.median(),s=r-i,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,i,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.heldBase()!==null,i=this.ctx.currentTime,s=i<=this.revertUntil;let l;if(a&&s){const d=this.offsets,u=this.preStep;d.length=0;for(let c=0;c<u.length;c++)d.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const c=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<c.length;f++)p.push(c[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const d=this.offsets,u=t-n;for(let c=0;c<d.length;c++)d[c]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}if(!r)for(const d of[...this.stepListeners])d(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let i=0;i<a;i++){const s=t[i];let l=i-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=xr&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<es)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=xr)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const i=this.perfNow();if(this.waitSince===null&&(this.waitSince=i),i-this.waitSince<es)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Vp,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,i=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=kr&&d++;d>i&&(r=l,i=d)}if(i<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>kr&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=kr}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}const Wp="let t=null;onmessage=e=>{clearInterval(t);t=null;if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}";function Gp(){const e=globalThis;return typeof e.Worker=="function"&&typeof e.Blob=="function"&&typeof e.document=="object"&&typeof e.URL?.createObjectURL=="function"}function Kp(e,t={}){const n=t.intervalMs??20,a=t.now??(typeof performance<"u"?()=>performance.now():()=>Date.now());let r=null,i=null,s=null,l=-1/0,d=!1;const u=()=>{if(!d)return;const c=a();c-l<n/2||(l=c,e())};if(t.worker===!0||t.worker!==!1&&Gp())try{i=URL.createObjectURL(new Blob([Wp],{type:"text/javascript"})),r=new Worker(i),r.onmessage=u}catch{r=null,i&&URL.revokeObjectURL(i),i=null}return{get running(){return d},get kind(){return r?"worker+timer":"timer"},start(){d||(d=!0,s=setInterval(u,n),r?.postMessage(n))},stop(){d=!1,s&&clearInterval(s),s=null,r?.postMessage(0)},dispose(){this.stop(),r?.terminate(),r=null,i&&URL.revokeObjectURL(i),i=null}}}class Yp{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...wr,...t.capabilities},this.channelOption=t.channel??Rp,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),i=()=>{n===this.startWaits&&t(r)};return a.then(i,i),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,i]=this.tempoRange();t=Math.min(i,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??Xl(d,1),d);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(ec,Math.max(Zl,t)):Bp;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=jp(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=qp(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...wr,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const i of this.peers.values())i.leader=i.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...wr},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const i=new AbortController;this.lockAbort=i,this.locks.request(Op,{signal:i.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===i&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(i,s,l)=>[i?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const i of this.peers.values()){if(!i.capabilities.canLead)continue;const s=n(i.capabilities.prefersLeader,i.joinedAt,i.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=i.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(_p(t,this.id,this.term,++this.seq,this.o.now()))}}const Xp="modulepreload",Jp=function(e){return"/studio/"+e},ts={},Qp=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=Jp(u),u in ts)return;ts[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Xp,c||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((g,m)=>{f.addEventListener("load",g),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};var Zp=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ni=[.25,.5,.75,1,1.5,2],eh=4.9,ne={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0}},Ke={fmt:"wet"},we={fmt:"pct"},Ut={fmt:"db"},sa={fmt:"signedPct"},la={fmt:"num",suffix:" ms"},ee={div:100};function P(e,t,n,a,r,i,s,l){var d={key:e,label:t,min:n,max:a,default:r,step:1,k:i,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function xn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Nn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ne.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[P("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ne.hpHz,astrid:!0,zero:"off"}),P("q","Resonance",0,100,0,2,{fmt:"q",law:ne.hpQ},{dsp:{law:ne.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[P("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ne.bpHz,astrid:!0},{dsp:{law:ne.bpHz}}),P("q","Q",0,100,0,2,{fmt:"q",law:ne.bpQ},{dsp:{law:ne.bpQ}}),P("mix","Mix",0,100,100,3,Ke,{dsp:ee,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[P("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:xn(Zp),overriddenBy:"beats_free",tempoSynced:!0}),P("feedback","Feedback",0,90,35,2,we,{dsp:ee,unit:"%"}),P("mix","Wet/dry",0,100,0,3,Ke,{dsp:ee,unit:"%",astridKey:"wet"}),P("tone","Tone",0,100,100,4,{fmt:"hz",law:ne.delayTone,offAt:100},{dsp:{div:99},more:!0}),P("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:xn([[0,"Insert"],[1,"Send"]]),more:!0}),P("send","Send",0,100,100,7,we,{dsp:ee,unit:"%",more:!0}),P("mod_send","Accent → send",-100,100,0,8,sa,{dsp:ee,unit:"%",more:!0}),P("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[P("predelay","Pre-delay",0,200,0,1,la,{dsp:{div:1e3},unit:"ms"}),P("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:ee,unit:"%"}),P("decay","Decay",0,100,50,3,we,{dsp:ee,unit:"%"}),P("damping","Damping",0,100,0,4,we,{dsp:ee,unit:"%"}),P("mix","Mix",0,100,0,5,Ke,{dsp:ee,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[P("size","Size",0,100,60,1,we,{dsp:ee,unit:"%"}),P("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),P("predelay","Pre-delay",0,250,20,3,la,{dsp:{div:1e3},unit:"ms"}),P("tone","Tone",0,100,60,4,{fmt:"hz",law:ne.hallTone,astrid:!0},{dsp:{law:ne.hallTone}}),P("mix","Mix",0,100,25,5,Ke,{dsp:ee,unit:"%"}),P("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),P("width","Width",0,100,100,7,we,{dsp:ee,unit:"%",more:!0}),P("motion","Motion",0,100,30,8,we,{dsp:ee,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[P("rate","Rate",0,100,35,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),P("depth","Depth",0,100,60,2,we,{dsp:ee,unit:"%"}),P("width","Width",0,100,80,3,we,{dsp:ee,unit:"%"}),P("mix","Mix",0,100,50,4,Ke,{dsp:ee,unit:"%"}),P("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:xn([[3,"3"],[6,"6"]]),more:!0}),P("vibrato","Vibrato",0,100,20,6,we,{dsp:ee,unit:"%",more:!0})]},{type:"flanger",label:"Flanger",dials:[P("rate","Rate",0,100,26,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),P("depth","Depth",0,100,70,2,we,{dsp:ee,unit:"%"}),P("feedback","Feedback",-90,90,50,3,sa,{dsp:ee,unit:"%"}),P("mix","Mix",0,100,50,4,Ke,{dsp:ee,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[P("rate","Rate",0,100,52,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),P("depth","Depth",0,100,50,2,we,{dsp:ee,unit:"%"}),P("spread","Spread",0,100,70,3,we,{dsp:ee,unit:"%"}),P("mix","Mix",0,100,40,4,Ke,{dsp:ee,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[P("rate","Rate",0,100,39,1,{fmt:"rate",law:ne.rate},{dsp:{law:ne.rate}}),P("depth","Depth",0,100,70,2,we,{dsp:ee,unit:"%"}),P("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:xn([[4,"4"],[6,"6"],[8,"8"]])}),P("feedback","Feedback",0,90,30,4,we,{dsp:ee,unit:"%"}),P("mix","Mix",0,100,50,5,Ke,{dsp:ee,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[P("low_db","Low",-18,18,0,1,Ut,{unit:"dB"}),P("mid_db","Mid",-18,18,0,2,Ut,{unit:"dB"}),P("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ne.midHz,astrid:!0},{dsp:{law:ne.midHz}}),P("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ne.eqQ},{dsp:{law:ne.eqQ}}),P("high_db","High",-18,18,0,4,Ut,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[P("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),P("output_db","Output",-12,12,0,2,Ut,{unit:"dB"}),P("mix","Mix",0,100,100,3,Ke,{dsp:ee,unit:"%"}),P("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:xn([[0,"Smooth"],[1,"Acid"]]),more:!0}),P("tone","Tone",0,100,100,5,{fmt:"hz",law:ne.driveTone,offAt:100},{dsp:{div:99},more:!0}),P("mod_drive","Accent → drive",-100,100,0,6,sa,{dsp:ee,unit:"%",more:!0}),P("mod_tone","Accent → tone",-100,100,0,7,sa,{dsp:ee,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[P("threshold_db","Threshold",-60,0,0,1,Ut,{unit:"dB"}),P("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ne.ratio},{dsp:{law:ne.ratio}}),P("attack_ms","Attack",1,100,10,3,la,{unit:"ms"}),P("release_ms","Release",10,1e3,150,4,la,{unit:"ms"}),P("makeup_db","Makeup",0,24,0,5,Ut,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[P("width","Width",0,200,100,1,we,{dsp:ee,unit:"%"}),P("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:ee})]}],th=Nn.map(function(e){return e.type}),nh=Nn.filter(function(e){return!e.hidden}).map(function(e){return e.type}),ah={reverb:"plate"},sn={},tc=[],In=[];function rh(e){sn[e.type]||tc.push(e.type),sn[e.type]=e;for(var t=0;t<In.length;t++)try{In[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function ih(){return tc.map(function(e){return sn[e]})}function oh(e){return In.push(e),function(){var t=In.indexOf(e);t>=0&&In.splice(t,1)}}function nc(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Wi(e){var t=ah[e]||e;return th.indexOf(t)>=0||typeof t=="string"&&sn[t]?t:null}function le(e){for(var t=Wi(e),n=0;n<Nn.length;n++)if(Nn[n].type===t)return Nn[n];return t&&sn[t]?sn[t]:null}function sh(e,t){var n=le(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Xt(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Na(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=Xt(n.law,t);return a===null?0:a}function ns(e,t){return Math.min(eh,e*60/(t>0?t:120))}var as=function(e){return e>0?"+":e<0?"−":""};function lh(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function ac(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:as(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return as(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=Xt(a.law,t),r===null?a.zero||"open":a.astrid?lh(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+Xt(a.law,t).toFixed(1);case"ratio":return Xt(a.law,t).toFixed(1)+":1";case"rate":return r=Xt(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var i=0;i<e.options.length;i++)if(e.options[i].value===t)return e.options[i].label;return String(t);case"tempoMs":return Math.round(ns(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(ns(t,n)*1e3)+" ms"}return String(t)}var ch=1,er=["drive","delay","plate"];function dh(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return ac(e,a,r)},t}var tn=er.map(function(e){var t=le(e),n={type:e,label:t.label,dials:t.dials.map(dh)};return t.tempoSynced&&(n.tempoSynced=!0),n}),uh={reverb:"plate"};function Ia(e){var t=uh[e]||e;return er.indexOf(t)>=0?t:null}function tr(e){for(var t=Ia(e),n=0;n<tn.length;n++)if(tn[n].type===t)return tn[n];return null}function rc(e,t){var n=tr(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function ln(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function et(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var i=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*i)/i))+0}function ph(){return{v:ch,chain:tn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function hh(e){return ni.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ni[0])}function $r(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fh(e){for(var t=Array.isArray(e)?e:$r(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=ph(),r={},i=[],s=0;s<t.length;s++){var l=t[s];if($r(l)){var d=Ia(l.type);if(!d){typeof l.type=="string"&&i.push(l.type);continue}if(r[d]){i.push(d);continue}r[d]=!0;var u=a.chain[er.indexOf(d)],c=$r(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,tr(d).dials.forEach(function(p){u.dials[p.key]=et(p,c[p.key])}),mh(d,u.dials,c)}}return{state:a,dropped:i}}function mh(e,t,n){for(var a=tr(e),r=0;r<a.dials.length;r++){var i=a.dials[r];i.stepWhen&&(t[i.key]=et(i,n&&typeof n[i.key]=="number"?n[i.key]:t[i.key],ln(i,t)))}}function Fa(e){return fh(e).state}function gh(e){return JSON.parse(JSON.stringify(e))}var bh=24,ai={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function ri(e,t,n){if(t==="bypass")return n?0:1;var a=rc(e,t)||yh(e,t);return a?Na(a,n):0}function yh(e,t){var n=le(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var vh={};tn.forEach(function(e){e.dials.forEach(function(t){vh[e.type+"."+t.key]=t.format})});function Er(e,t){var n=new Float64Array(bh),a=Fa(e);return a.chain.forEach(function(r){var i=ai[r.type];n[i.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[i[s]]=ri(r.type,s,r.dials[s])})}),n}var wh="__ncFxLoop",xh=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,rs=/[A-Za-z_$\u0080-\uffff]/,Sr=/[A-Za-z0-9_$\u0080-\uffff]/;function kh(e){var t=[],n=0,a=e.length,r=[],i,s;function l(){var f=t.length?t[t.length-1]:null;return f?f.t==="name"?xh.test(f.v):f.t==="num"||f.t==="str"||f.t==="tpl"||f.t==="re"?!1:f.v!==")"&&f.v!=="]":!0}function d(){for(var f=n-1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i==="`"){n++,t.push({t:"tpl",v:"",s:f,e:n});return}if(i==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:f,e:n});return}n++}t.push({t:"tpl",v:"",s:f,e:a})}for(;n<a;){if(i=e[n],i===" "||i==="	"||i===`
`||i==="\r"||i==="\f"||i==="\v"||i===" "||i==="\uFEFF"||i==="\u2028"||i==="\u2029"){n++;continue}if(i==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(i==="/"&&e[n+1]==="*"){var u=e.indexOf("*/",n+2);n=u<0?a:u+2;continue}if(s=n,i==='"'||i==="'"){for(n++;n<a&&e[n]!==i&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(i==="`"){n++,d();continue}if(i==="/"&&l()){n++;for(var c=!1;n<a;){if(i=e[n],i==="\\"){n+=2;continue}if(i===`
`)break;if(c)i==="]"&&(c=!1);else if(i==="[")c=!0;else if(i==="/"){n++;break}n++}for(;n<a&&Sr.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(rs.test(i)||i==="\\"){for(n++;n<a&&(Sr.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i==="#"&&n+1<a&&rs.test(e[n+1])){for(n+=2;n<a&&Sr.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(i>="0"&&i<="9"||i==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(i==="{")r.push("{");else if(i==="}"){var p=r.pop();if(p==="tpl"){n++,d();continue}}if(i==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(i==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:i,s,e:n})}return t}function $h(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function Eh(e){for(var t=String(e),n=kh(t),a=[],r=wh+"()",i=0;i<n.length;i++){var s=n[i];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=i>0?n[i-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var d=i+1;if(!(s.v==="for"&&n[d]&&n[d].t==="name"&&n[d].v==="await")&&!(!n[d]||n[d].t!=="p"||n[d].v!=="(")){var u=$h(n,d);if(!(u<0)){if(s.v==="while"){if(u===d+1)continue;a.push([n[d].e,r+" && ("],[n[u].s,")"]);continue}for(var c=[],p=0,f=d+1;f<u;f++){var g=n[f].t==="p"?n[f].v:"";g==="("||g==="["||g==="{"?p++:g===")"||g==="]"||g==="}"?p--:g===";"&&p===0&&c.push(f)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(y,x){return y[0]-x[0]});for(var m="",v=0,h=0;h<a.length;h++)m+=t.slice(v,a[h][0])+a[h][1],v=a[h][0];return m+t.slice(v)}var Ar=1,is=15,ic=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,Sh=/^[a-z][a-z0-9_]{0,31}$/,oc=/^\d+\.\d+\.\d+$/,sc=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,Ah=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,os=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],ss=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Pa={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function Fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wt(e){return typeof e=="number"&&isFinite(e)}function Mt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function nr(e){var t=[],n=e,a=function(l,d){t.push(l+": "+d)};if(!Fn(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){os.indexOf(l)<0&&a(l,"unknown field (allowed: "+os.slice(1).join(", ")+")")}),n.ncPlugin!==Ar&&a("ncPlugin","must be "+Ar),(typeof n.id!="string"||!ic.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),Mt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!oc.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),Mt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!sc.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return Mt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!Ah.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>is)a("params","at most "+is);else{var i={};n.params.forEach(function(l,d){var u="params["+d+"]";if(!Fn(l)){a(u,"must be an object");return}Object.keys(l).forEach(function(f){ss.indexOf(f)<0&&a(u+"."+f,"unknown field (allowed: "+ss.join(", ")+")")}),typeof l.id!="string"||!Sh.test(l.id)||l.id==="bypass"?a(u+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):i[l.id]?a(u+".id",'"'+l.id+'" is used twice'):i[l.id]=!0,Mt(l.label,24)||a(u+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(u+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(f){return Mt(f,24)})){a(u+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(u,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(u,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!Wt(l.minValue)||!Wt(l.maxValue)||!(l.minValue<l.maxValue)){a(u,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(Wt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(u+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):Wt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:Mh(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(u,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!Wt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(u+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(u+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(Wt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(u+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(u+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Ar,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function Mh(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function Th(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function ar(e){return"plugin:"+e}function Lh(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var d={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var u=s.type==="choice"?s.choices:["Off","On"];d.step=null,d.options=u.map(function(p,f){return{value:f,label:p}}),d.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";d.format={fmt:"fixed",div:1,add:0,digits:Th(s.discreteStep),suffix:c}}return s.more&&(d.more=!0),d}),i={type:ar(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(i.note=n.description),n.website&&(i.plugin.website=n.website),i}function lc(e,t){var n=nr(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=le(ar(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=Lh(n.manifest,t);return rh(r),r}async function cc(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function Ch(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function ls(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var i=new Uint8Array(await r.arrayBuffer());if(n){var s=await cc(i);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(i)}var ca=typeof WeakMap=="function"?new WeakMap:null;function dc(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function uc(e,t,n,a,r){var i=t.id+"@"+t.version,s=ca&&ca.get(e);!s&&ca&&(s={},ca.set(e,s));var l=s&&s[i];if(l){var d=await l,u=await n();return{stale:u!==d}}var c=(async function(){var p=await n();await bc(e,r);var f=URL.createObjectURL(new Blob([Eh(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}return p})();return s&&(s[i]=c,c.catch(function(){delete s[i]})),await c,{stale:!1}}async function pc(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));Ch(r);var i=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await ls(r.href,i,s.manifest,"plugin.json"),d;try{d=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var u=nr(d);if(!u.ok)throw new Error("nc-fx plugin: "+r.href+": "+u.errors.join("; "));var c=u.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=le(ar(c.id));if(p&&p.plugin.version!==c.version)throw dc(c,p.plugin.version);var f=new URL(c.dsp,r),g=await uc(e,c,function(){return ls(f.href,i,s.dsp,"DSP file")},f.href,a.moduleUrl),m=lc(c,{url:r.href,listed:a.listed===!0});return{entry:m,manifest:c,url:r.href,stale:g.stale}}var Nh=256*1024;async function cs(e,t,n){var a=n||{},r=t||{},i=r.manifest;if(typeof i=="string")try{i=JSON.parse(i)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=nr(i);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>Nh)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var d=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,u=le(ar(l.id));if(u&&u.plugin.version!==l.version)throw dc(l,u.plugin.version);var c=r.dsp,p=await uc(e,l,async function(){return c},d.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),f=lc(l,{url:d,listed:!1});return{entry:f,manifest:l,url:d,stale:p.stale}}function Ih(e){var t=[];if(!Fn(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,i){var s="plugins["+i+"]",l=[];if(!Fn(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!ic.test(r.id))&&l.push("id"),Mt(r.name,40)||l.push("name"),(typeof r.version!="string"||!oc.test(r.version))&&l.push("version"),Mt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!sc.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!Fn(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var d={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(d.description=r.description.slice(0,200)),n.push(d)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function Fh(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var i=Ih(await r.json());return{registry:i.registry,url:a.href,errors:i.errors}}function Ph(e,t,n,a){return pc(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function zh(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,i=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,d=e.currentTime,u=i(),c=0,p=!1,f=s(function(){var g=i(),m=g-u,v=e.currentTime;if(u=g,e.state!=="running"||v!==d){d=v,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(m>4*r){c=0;return}c+=m,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:v}))},r);return{stop:function(){l(f)},stalled:function(){return p}}}var Dh=2,za=3,ds=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Tt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Rh=/^local:[A-Za-z0-9._@-]{1,200}$/,Oh=/^\d+\.\d+\.\d+$/;function Bh(e,t){var n=Tt(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Oh.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Rh.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function hc(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function jh(e){var t={},n=0;if(Tt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function qh(e){return e.plugin?e.plugin.idBase:e.type}function fc(e,t){var n=le(e);if(!n)return null;var a={};(t||[]).forEach(function(d){d&&d.id&&(a[d.id]=!0)});for(var r=1,i=qh(n);a[i+"-"+r];)r++;var s={};n.dials.forEach(function(d){s[d.key]=d.default});var l={id:i+"-"+r,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=hc(n)),l}function _h(e){var t=le(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Vh(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var i=e.slice(),s=i.splice(t,1)[0];return i.splice(r,0,s),i}function Hh(e){return typeof e=="number"&&isFinite(e)?hh(e):e}function us(e,t,n){var a={};return e.dials.forEach(function(r){var i=t[r.key];i===void 0&&r.astridKey&&(i=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(i=Hh(i)),a[r.key]=e.plugin?et(r,i,r.step):et(r,i)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=et(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],ln(r,a)))}),a}function Uh(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,i=e.min;i<=e.max;i++){var s=Xt(n.law,i),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=i)}return a}}var Wh={rate:"rate_hz"};function Gh(e,t,n,a){var r={};return e.dials.forEach(function(i){if(!i.more){var s=i.astridKey||Wh[i.key]||i.key;r[i.key]=Uh(i,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Kh(e,t){var n=t>0?Math.floor(t):za,a=[],r=[],i=[],s=!1,l=!1;Array.isArray(e)?(i=e,l=!0):Tt(e)&&Array.isArray(e.chain)&&(i=e.chain,s=e.v===1,l=e.schema===2);for(var d=[],u=0;u<i.length;u++){var c=i[u];if(Tt(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=Wi(c.type),f=p&&le(p);if(!f&&!s&&nc(c.type)){if(d.length>=n){a.push(c.id||c.type);continue}for(var g=Bh(c.plugin,c.type),m=g.id.split(".").pop(),v=1;d.some(function(w){return w.id===m+"-"+v});)v++;var h=typeof c.id=="string"&&ds.test(c.id)&&!d.some(function(w){return w.id===c.id})?c.id:m+"-"+v;d.push({id:h,type:c.type,bypass:c.bypass===!0,dials:jh(c.dials),plugin:g});continue}if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||p);continue}var y;Tt(c.params)&&!Tt(c.dials)?y=us(f,Gh(f,c.params,r,c.id||p),l):y=us(f,Tt(c.dials)?c.dials:{},l);var x=fc(p,d),b=typeof c.id=="string"&&ds.test(c.id)&&!d.some(function(w){return w.id===c.id})?c.id:x.id,A=s?c.bypass!==!1:c.bypass===!0,T={id:s?x.id:b,type:p,bypass:A,dials:y};f.plugin&&(T.plugin=hc(f)),d.push(T)}}return{state:{v:Dh,chain:d},dropped:a,notes:r}}function Nt(e,t){return Kh(e,t).state}function Gt(e){var t=le(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,Na(a,e.dials[a.key])])}),n}function Yh(e){var t=Nt(e,8),n=[],a=t.chain.filter(function(r){if(r.plugin)return n.push(r.id+": ASTRID has no plugins"),!1;var i=le(r.type);return i&&i.own?(n.push(r.id+": ASTRID has no "+i.label),!1):!0}).map(function(r,i){var s=le(r.type),l={};return i>=za&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&ni.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Xh=150,Jh=6e3,Qh=18,mc=6.283185307179586;function rr(e,t,n){return e<t?t:e>n?n:e}function Zh(e,t,n,a,r){var i=Math.pow(10,n/40),s=mc*t/r,l=Math.cos(s),d=Math.sin(s),u,c,p,f,g,m,v,h;if(e===0||e===2){v=d/2*Math.SQRT2,h=2*Math.sqrt(i)*v;var y=e===0?1:-1;u=i*(i+1-y*(i-1)*l+h),c=y*2*i*(i-1-y*(i+1)*l),p=i*(i+1-y*(i-1)*l-h),f=i+1+y*(i-1)*l+h,g=-y*2*(i-1+y*(i+1)*l),m=i+1+y*(i-1)*l-h}else v=d/(2*a),u=1+v*i,c=-2*l,p=1-v*i,f=1+v/i,g=-2*l,m=1-v/i;return[u/f,c/f,p/f,g/f,m/f]}function ef(e,t,n){var a=mc*t/n,r=Math.cos(a),i=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),d=e[0]+e[1]*r+e[2]*s,u=-(e[1]*i+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*i+e[4]*l);return 10*Math.log10((d*d+u*u)/(c*c+p*p))}var ps={};function kt(e){return ps[e]||(ps[e]=sh("eq",e))}function Yt(e,t){var n=kt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return rr(a,n.min,n.max)}function gc(e){return[{id:"low",kind:0,hz:Xh,db:Yt(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Na(kt("mid_hz"),Yt(e,"mid_hz")),db:Yt(e,"mid_db"),q:Na(kt("mid_q"),Yt(e,"mid_q"))},{id:"high",kind:2,hz:Jh,db:Yt(e,"high_db"),q:Math.SQRT1_2}]}function tf(e,t,n){for(var a=gc(e),r=n.length,i=new Float64Array(r),s=[],l=t/2,d=0;d<a.length;d++){var u=a[d],c=new Float64Array(r);if(u.db!==0)for(var p=Zh(u.kind,u.hz,u.db,u.q,t),f=0;f<r;f++){var g=n[f]<l?n[f]:l*.9999;c[f]=ef(p,g,t),i[f]+=c[f]}s.push(c)}return{total:i,bands:s}}function nf(e){var t=kt("mid_hz").dsp.law;return rr(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function af(e){var t=kt("mid_q").dsp.law;return rr(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Da={low:"low_db",mid:"mid_db",high:"high_db"},rf={low:"Low",mid:"Mid",high:"High"};function of(e,t,n){var a=[];function r(i,s){var l=kt(i),d=l.step||1;s=rr(Math.round(s/d)*d,l.min,l.max),s===0&&(s=0),s!==Yt(e,i)&&a.push([i,s])}return typeof n.db=="number"&&Da[t]&&r(Da[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",nf(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",af(n.q)),a}function sf(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Da[e]?[Da[e]]:[];return t.map(function(n){return[n,kt(n).default]})}var da=typeof WeakMap=="function"?new WeakMap:null;function lf(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=da&&da.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},da&&da.set(e,n)),n.handle}function cf(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:kt(c).default});var i=e&&e.output&&e.output.context,s=a.sampleRate||i&&i.sampleRate||48e3,l=a.help||{},d=gc(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",f=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:rf[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+f+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+f,help:l[c.id]}}),u=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Qh,sampleRate:s,on:a.on!==!1,bands:d,help:l.graph,response:function(c){return tf(r,s,c)},spectrum:a.spectrum===!1?void 0:lf(e)||void 0,onBand:function(c,p){u(of(r,c,p))},onReset:function(c){u(sf(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var df="nc-fx@1",uf=600,pf=256,hf=8,kn=typeof WeakMap=="function"?new WeakMap:null;function bc(e,t){var n=kn&&kn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Qp(async()=>{const{default:i}=await import("./worklet-source-D0pmvsu9.js");return{default:i}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),kn&&(kn.set(e,n),n.catch(function(){kn.delete(e)})),n)}function Kt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function yc(e,t,n,a){var r=Math.min(400,Math.max(20,Kt(t.bpm,120))),i=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",d=Kt(t.preGain,1),u=Math.max(0,Kt(t.crossfade,.012)),c=Kt(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),g=e.createGain(),m=e.createGain(),v=null;t.modInput===!0&&(v=e.createGain(),v.channelCount=1,v.channelCountMode="explicit",v.channelInterpretation="discrete"),m.gain.value=0,p.connect(g),g.connect(f),m.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0},y=n(r);h.post=function(w){h.node?h.node.port.postMessage(w):h.disposed||(i.length>=pf&&(i=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&i.push({t:"meter",on:!0})),i.push(w))};function x(w){var k=i.map(function(M){var S=Object.assign({},M);return S.when>w||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return i=[],k}h.emit=function(w){for(var k=0;k<h.listeners.length;k++)try{h.listeners[k](w)}catch(M){typeof console<"u"&&console.error(M)}},h.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var b=!1;h.tooFar=function(w){return typeof w=="number"&&w>e.currentTime+uf?(!b&&typeof console<"u"&&(b=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var A=bc(e,t.moduleUrl).then(function(){if(!h.disposed){var w=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},y);w.pending=x(e.currentTime),h.node=new AudioWorkletNode(e,df,{numberOfInputs:v?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),h.node.port.onmessage=function(M){var S=M.data;if(S&&S.t==="lv"&&h.mUsers>0)h.lv=S.d,h.lvAt=hs();else if(S&&S.t==="perr"&&h.onPluginError&&S.d)for(var L=0;L<(S.n|0);L++)h.onPluginError(S.d[2*L],S.d[2*L+1])},p.connect(h.node),v&&v.connect(h.node,0,1),h.node.connect(m);var k=e.currentTime;k<=0||u===0?(g.gain.value=0,m.gain.value=1):(g.gain.setValueAtTime(1,k),g.gain.linearRampToValueAtTime(0,k+u),m.gain.setValueAtTime(0,k),m.gain.linearRampToValueAtTime(1,k+u)),h.status="ready"}},function(w){h.status="unavailable",i=[],h.error=w});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&hs()-h.lvAt<ff?h.lv:null};var T={};return h.meter=function(w,k){if(T[w])return T[w];var M=0,S={in:0,out:0},L={open:function(){return h.meterOpen()?(M++,!0):!1},close:function(){M!==0&&(M--,h.meterClose())},read:function(){var N=M>0?h.levels():null;return S.in=0,S.out=0,N&&k(N,S),S}};return T[w]=L,L},h.core={input:p,output:f,modInput:v,ready:A,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(w,k){var M=Kt(w,NaN);!(M>0)||h.disposed||h.tooFar(k)||(h.bpm=Math.min(400,Math.max(20,M)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(k)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function(w){var k=w&&typeof w=="object"?w:{at:w};if(!(h.disposed||h.tooFar(k.at))){var M=Kt(k.fadeMs,0);h.post({t:"clear",when:h.whenOf(k.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function(w){return h.listeners.push(w),function(){var k=h.listeners.indexOf(w);k>=0&&h.listeners.splice(k,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",i=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,m,f,v].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},h}var ff=250;function hs(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function vc(e,t){t.in=e[0],t.out=e[1]}function Mr(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Tr(e,t){var n=t||{};if(n.slots)return mf(e,n);var a=Fa(n.state),r=Array.from(Er(a)),i=yc(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Er(a)),when:0}]}),s=i.core;function l(d){return a.chain[er.indexOf(d)]}return s.setParam=function(d,u,c,p){var f=Ia(d);if(!(!f||i.disposed||i.tooFar(p))){var g=l(f),m;if(u==="bypass")m=!!c;else{var v=rc(f,u);if(!v)return;m=et(v,c,ln(v,g.dials))}return u==="bypass"?g.bypass=m:g.dials[u]=m,i.post({t:"p",i:ai[f][u],v:ri(f,u,m),when:i.whenOf(p)}),i.emit({effect:f,key:u,value:m}),tr(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(b){return b.key===u}))){var y=g.dials[h.key],x=et(h,y,ln(h,g.dials));x!==y&&(g.dials[h.key]=x,i.post({t:"p",i:ai[f][h.key],v:ri(f,h.key,x),when:i.whenOf(p)}),i.emit({effect:f,key:h.key,value:x}))}}),m}},s.meter=function(){return i.meter("",vc)},s.getParam=function(d,u){var c=Ia(d);if(c){var p=l(c);return u==="bypass"?p.bypass:p.dials[u]}},s.getState=function(){return gh(a)},s.setState=function(d,u){i.disposed||i.tooFar(u&&u.at)||(a=Fa(d),i.post({t:"load",program:Array.from(Er(a)),when:i.whenOf(u&&u.at)}),i.emit({effect:null,key:null,value:null}))},s}function mf(e,t){var n=t.slots===!0?za:Math.max(1,Math.min(hf,Math.floor(+t.slots)||za)),a=Nt(t.state,n),r=1,i={},s={};function l(w){return!nc(w.type)||le(w.type)!==null}function d(w){var k=le(w.type);return k&&k.plugin?k.plugin.engine:w.type}function u(w){return i[w.id]||(i[w.id]=r++),i[w.id]}function c(w){return w.filter(l).map(function(k){return{uid:u(k),type:d(k),program:Gt(k)}})}function p(){return a.chain.filter(l).map(function(w){return i[w.id]})}var f=c(a.chain),g=p(),m=yc(e,t,function(){return{slots:n,chain:f,order:g}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),v=m.core;m.onPluginError=function(w,k){for(var M in i)i[M]===w&&(s[M]=k,m.emit({effect:M,key:"error",value:k}))};function h(w){var k;for(k=0;k<a.chain.length;k++)if(a.chain[k].id===w)return a.chain[k];var M=Wi(w);if(M){for(k=0;k<a.chain.length;k++)if(a.chain[k].type===M)return a.chain[k]}return null}function y(w,k){var M=u(w);m.post({t:"add",uid:M,type:d(w),when:k}),Gt(w).forEach(function(S){m.post({t:"ps",uid:M,k:S[0],v:S[1],when:k,snap:!0})})}function x(w){m.post({t:"order",uids:p(),when:w})}function b(w,k){var M={};a.chain.forEach(function(N){M[N.id]=N});var S=p().join();w.chain.forEach(function(N){var j=M[N.id];if(!l(N)){delete i[N.id];return}if(!j||j.type!==N.type||!i[N.id]){delete i[N.id],delete s[N.id],y(N,k);return}var _={};Gt(j).forEach(function(K){_[K[0]]=K[1]}),Gt(N).forEach(function(K){_[K[0]]!==K[1]&&m.post({t:"ps",uid:i[N.id],k:K[0],v:K[1],when:k})})});var L={};w.chain.forEach(function(N){L[N.id]=!0}),Object.keys(i).forEach(function(N){L[N]||delete i[N]}),Object.keys(s).forEach(function(N){L[N]||delete s[N]}),a=w,p().join()!==S&&x(k)}var A=oh(function(w){if(!(m.disposed||!a.chain.some(function(M){return M.type===w}))){var k=JSON.parse(JSON.stringify(a));k.chain=k.chain.map(function(M){return M.type===w?Nt({v:2,chain:[M]},1).chain[0]:M}),b(k,0),m.emit({effect:null,key:"plugin",value:w})}}),T=v.dispose;return v.dispose=function(){A(),T()},v.slots=n,v.meter=function(w){return w==null||w===""?m.meter("",vc):m.meter("#"+w,function(k,M){var S=h(w),L=S?i[S.id]:0,N=k[2];if(L){for(var j=3,_=0;_<N;_++,j+=3)if(k[j]===L){M.in=k[j+1],M.out=k[j+2];return}}})},v.setParam=function(w,k,M,S){var L=h(w);if(!(!L||m.disposed||m.tooFar(S))){var N=le(L.type),j,_=null;if(!N)return k!=="bypass"?void 0:(L.bypass=!!M,m.emit({effect:L.id,key:k,value:L.bypass}),L.bypass);if(k==="bypass")j=!!M;else{for(var K=0;K<N.dials.length;K++)N.dials[K].key===k&&(_=N.dials[K]);if(!_)return;j=et(_,M,ln(_,L.dials))}var pe={},ge={};Gt(L).forEach(function(G){pe[G[0]]=G[1]}),N.dials.forEach(function(G){G.stepWhen&&(ge[G.key]=L.dials[G.key])}),k==="bypass"?L.bypass=j:L.dials[k]=j,N.dials.forEach(function(G){G.stepWhen&&(L.dials[G.key]=et(G,L.dials[G.key],ln(G,L.dials)))});var se=m.whenOf(S),re=i[L.id];return re&&Gt(L).forEach(function(G){(pe[G[0]]!==G[1]||_&&G[0]===_.k)&&m.post({t:"ps",uid:re,k:G[0],v:G[1],when:se})}),m.emit({effect:L.id,key:k,value:j}),Object.keys(ge).forEach(function(G){G!==k&&L.dials[G]!==ge[G]&&m.emit({effect:L.id,key:G,value:L.dials[G]})}),j}},v.getParam=function(w,k){var M=h(w);if(M)return k==="bypass"?M.bypass:M.dials[k]},v.getState=function(){return JSON.parse(JSON.stringify(a))},v.setState=function(w,k){m.disposed||m.tooFar(k&&k.at)||(b(Nt(w,n),m.whenOf(k&&k.at)),m.emit({effect:null,key:null,value:null}))},v.addEffect=function(w,k){var M=k||{},S=fc(w,a.chain);if(!(!S||a.chain.length>=n||m.disposed||m.tooFar(M.at))){if(M.dials){var L=Nt({v:2,chain:[{id:S.id,type:S.type,dials:M.dials}]},1).chain[0];S.dials=L.dials}M.bypass===!0&&(S.bypass=!0);var N=a.chain.slice(),j=typeof M.index=="number"?Math.max(0,Math.min(N.length,M.index)):N.length;return N.splice(j,0,S),b({v:2,chain:N},m.whenOf(M.at)),m.emit({effect:S.id,key:"chain",value:"add"}),S.id}},v.removeEffect=function(w,k){var M=h(w),S=k&&k.at;return!M||m.disposed||m.tooFar(S)?!1:(b({v:2,chain:a.chain.filter(function(L){return L!==M})},m.whenOf(S)),m.emit({effect:M.id,key:"chain",value:"remove"}),!0)},v.moveEffect=function(w,k,M){var S=h(w),L=M&&M.at;if(!S||m.disposed||m.tooFar(L))return!1;var N=Vh(a.chain,a.chain.indexOf(S),k);return N===a.chain?!1:(b({v:2,chain:N},m.whenOf(L)),m.emit({effect:S.id,key:"chain",value:"move"}),!0)},v.getChain=function(){return a.chain.map(function(w){var k={id:w.id,type:w.type,name:_h(w),bypass:w.bypass};if(w.plugin){var M=s[w.id]||0,S=!l(w)||M===5;k.plugin={id:w.plugin.id,version:w.plugin.version,url:w.plugin.url,name:w.plugin.name,status:S?"missing":M?"failed":"ready"},M&&!S&&(k.plugin.error=Pa[M]||Pa[2])}return k})},v.toAstrid=function(){return Yh(a)},v}function fs(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function wc(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,i=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(f){return r.toContextTime(f)}:t&&t.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,d=l&&l.tempo?l.tempo:l,u=!1;function c(f){if(!i){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var g=i(l.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var g=l&&typeof l.bpm=="number"?l.bpm:fs(d,0);g>0&&e.setTempo(g);return}var m=fs(d,f);m>0&&e.setTempo(m);for(var v=d&&(d.points||d.tempoPoints)||[],h=0;h<v.length;h++){var y=v[h];if(y.beat>f&&y.bpm>0){var x=c(y.beat);x!==void 0&&e.setTempo(y.bpm,x)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?e.setTempo(f.bpm,c(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&p())})}const Pn="/studio/assets/worklet-DI4xhM-u.js";var gf="nc-ui",bf={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Gi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ra={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},yf={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},bt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},vf={light:{color:bf.color,semantic:Gi,component:Ra,runtime:yf},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Tn=e=>`--${gf}-${e}`,ii=Gi["label-on-fill-dark"],ms=Gi["label-on-fill-light"],wf=bt["label-min-contrast"],xf=/^#[0-9a-f]{6}$/i,kf=e=>typeof e=="string"&&xf.test(e),ka=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function gs(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${ka(r(0)*255)}${ka(r(8)*255)}${ka(r(4)*255)}`}function xc(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),r=Math.max(t,n,a),i=Math.min(t,n,a),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function bs(e){let[t,n,a]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function oi(e,t){let[n,a]=[bs(e),bs(t)].sort((r,i)=>i-r);return(n+.05)/(a+.05)}var Oa=e=>oi(e,ii)>=oi(e,ms)?ii:ms;function kc(e,t,n,a=wf){let r=gs(e,t,n),i=Oa(r)===ii?1:-1;for(let s=0;s<40&&oi(r,Oa(r))<a;s++)n+=i*.01,r=gs(e,t,n);return r}function $f(e){let{h:t,s:n}=xc(e),a=kc(t,Math.min(n,bt["surprise-on-max-saturation"]),bt["surprise-on-lightness"]);return{fill:e,ink:Oa(e),on:a,onInk:Oa(a)}}var Ef=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Sf(e,t=Math.random){let[n,a]=bt["surprise-saturation"],[r,i]=bt["surprise-lightness"],s=bt["surprise-min-hue-gap"],l=kf(e)?xc(e).h:null,d=t()*360;return l!==null&&Ef(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),kc(d,n+t()*(a-n),r+t()*(i-r))}function Af(e){if(!e)return null;let t=$f(e);return{[Tn("surprise-fill")]:t.fill,[Tn("surprise-ink")]:t.ink,[Tn("surprise-on")]:t.on,[Tn("surprise-on-ink")]:t.onInk}}var Mf=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Tf=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function ys(e){let[t,n,a]=[1,3,5].map(l=>Mf(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function Lf([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*i,-1.2684380046*a+2.6097574011*r-.3413193965*i,-.0041960863*a-.7034186147*r+1.707614701*i].map(s=>ka(Tf(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Cf=bt["velocity-range"],$c={min:Ra.rhythm["velocity-min"],max:Ra.rhythm["velocity-max"]},vs=Object.fromEntries(Object.entries(vf).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Nf(e,t=$c){let[n,a]=Cf,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(r-n)/(a-n),s=t.ink??Ra.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=ys(t.min),d=ys(t.max);return{velocity:r,t:i,fill:Lf(l.map((u,c)=>u+(d[c]-u)*i)),ink:s}}function ws(e,t=$c){return{[Tn("velocity-fill")]:Nf(e,t).fill}}var Ba="data-nc-theme",si="nc-ui-theme-change",If=Object.freeze(["system","light","dark"]),Ff="netcomposer.studio.theme.v1",Pf="(prefers-color-scheme: dark)",Ki=e=>e?.documentElement??null,Ec=e=>e?.defaultView?.matchMedia?.(Pf)??null,Yi=e=>e==="light"||e==="dark"?e:"system";function zf(e=globalThis.document){return Yi(Ki(e)?.getAttribute(Ba))}function ja(e=globalThis.document){let t=zf(e);return t!=="system"?t:Ec(e)?.matches?"dark":"light"}function Xi(e,t=globalThis.document){let n=Ki(t);if(!n)return"light";let a=Yi(e);a==="system"?n.removeAttribute(Ba):n.setAttribute(Ba,a);let r=ja(t),i=t.defaultView?.CustomEvent;return i&&t.dispatchEvent(new i(si,{detail:{choice:a,theme:r}})),r}function Sc(e,t=globalThis.document){let n=Ki(t);if(!n)return()=>{};let a=ja(t),r=()=>{let d=ja(t);d!==a&&(a=d,e(d))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Ba]});let l=Ec(t);return l?.addEventListener?.("change",r),t.addEventListener(si,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(si,r)}}var Df={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Rf={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Of={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Bf={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ir={};for(let[e,t]of Object.entries(Rf))ir[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Bf))ir[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Of))ir[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Df.renames.map(e=>[e.old,e.new]));function Ac(e){let t=ir[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ae(e){return Ac(e).prop}function o(e){return`var(${ae(e)})`}function jf(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ae(t)));return Number.isFinite(n)?n:0}function me(e,t){let n=Ac(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Mc(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function qf(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var _f="[data-modulated], [data-modulated] *",Tc="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Lr(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function xs(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Vf(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${ae("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${ae("divider")}: ${o(`module-div-stack-${a}`)};
      ${ae("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${ae("text-sub")}: ${o("module-sub-stack-1")};
      ${ae("divider")}: ${o("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("body-size")};
  font-weight: ${o("title-weight")};
  line-height: ${o("label-leading")};
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
  padding: ${o("page-pad-y")} ${o("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${o("page-action-gap")};
  min-width: 0;
  padding-bottom: ${o("page-head-gap")};
  border-bottom: ${o("hairline")} solid ${o("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${o("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${o("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${o("page-pad-x")} * -1);
  right: calc(${o("page-pad-x")} * -1);
  background: ${o("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${o("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${o("page-title-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${o("page-sub-gap")} 0 0; font-size: ${o("page-sub-size")}; color: ${o("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${o("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${o("control-gap")} ${o("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${o("control-gap")};
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-page-action:hover { color: ${o("text")}; border-bottom-color: ${o("text")}; }
.nc-page-action:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
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
    min-width: ${o("target-min")};
    min-height: ${o("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${o("target-min")} - ${o("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${o("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${o("target-min")} / 2.75); height: calc(${o("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${o("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${o("control-gap")};
    background: ${o("surface-page")};
    color: ${o("text")};
    border-bottom: ${o("hairline")} solid ${o("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${o("page-pad-x")} * -1);
    right: calc(${o("page-pad-x")} * -1);
    padding-inline: ${o("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${o("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${o("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${o("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${o("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${o("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${o("page-pad-x-md")} * -1);
    right: calc(${o("page-pad-x-md")} * -1);
    padding-inline: ${o("page-pad-x-md")};
  }
}
.nc-module {
  background: ${o("module-bg-adjacent-1")};
  color: ${o("text")};
  padding: ${o("module-pad")};
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${o("font-ui")};
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
  gap: ${o("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${o("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${o("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${o("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${o("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${o("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${o("title-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${o("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${o("header-gap")}; flex: none; }
.nc-index {
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${o("control-gap")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("body-size")};
  line-height: ${o("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${o("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${o("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${o("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
.nc-slim-lines {
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${o("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${o("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${o("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${o("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${o("readout-size")};
  color: ${o("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${o("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${o("name-width")} - ${o("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${o("name-width")} - ${o("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${o("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${o("module-gap")};
  row-gap: ${o("control-gap")};
  padding-bottom: ${o("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${o("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${o("control-gap")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  line-height: ${o("label-leading")};
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
  bottom: calc(-1 * ${o("control-gap")});
  width: max(100%, ${o("target-min")});
  height: max(100%, ${o("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${o("text-sub")}; color: ${o("text")}; }
.nc-tap:active { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-tap:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${o("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  padding: ${o("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${o("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${o("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${o("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${o("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${o("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${o("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${o("hairline")};
  background: ${o("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${o("hairline")};
  background: ${o("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${o("hairline")};
  background: ${o("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${o("slider-thumb-size")};
  height: ${o("slider-thumb-size")};
  margin-top: calc(${o("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${o("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${o("slider-thumb-size")};
  height: ${o("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${o("slider-thumb")};
  transition: none;
}
${_f} { transition: none; }
.nc-range:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${o("hairline")} solid ${o("text")};
  background: transparent;
  color: ${o("text")};
  min-height: ${o("target-min")};
  padding: ${o("button-pad-y")} 0;
  font-size: ${o("readout-size")};
  letter-spacing: ${o("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${o("transition-feedback")};
}
.nc-btn:hover { background: ${o("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${o("accent")};
  border-color: ${o("accent")};
  color: ${o("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${o("focus-width-strong")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
.nc-btn:disabled { color: ${o("text-sub")}; border-color: ${o("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${o("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${o("text")}; }
.nc-toggle:hover { border-bottom-color: ${o("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${o("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${o("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${o("rhythm.track-solo")};
  border-bottom-color: ${o("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  margin-bottom: ${o("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${o("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("tab-size")};
  font-weight: ${o("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${o("label-size")}; padding-inline: ${o("control-gap")}; }
.nc-seg > button:hover { color: ${o("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${o("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${o("hairline")} * -1);
  height: ${o("tab-mark")};
  background: ${o("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: calc(${o("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  border-radius: 0;
  color: ${o("text")};
  font-size: ${o("body-size")};
  padding: ${o("control-gap")} ${o("select-pad-end")} ${o("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${o("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${o("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${o("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${o("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${o("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${o("slot-size")};
  width: ${o("slot-size")};
  max-width: ${o("slot-size")};
  min-width: 0;
  height: ${o("slot-size")};
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
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("slot-font-size")};
  line-height: ${o("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${o("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${o("text-sub")};
  color: ${o("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${o("accent")};
  color: ${o("accent")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${o("accent")};
  outline: ${o("focus-width")} solid ${o("accent-faint")};
  outline-offset: ${o("hairline")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${o("accent")};
  background: ${o("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${o("control-gap")};
  right: ${o("control-gap")};
  width: ${o("control-gap")};
  height: ${o("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${o("sparkle-size")};
  width: ${o("sparkle-size")};
  height: ${o("sparkle-size")};
  margin-inline: ${o("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${o("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${o("target-min")};
  width: ${o("target-min")};
  min-height: ${o("target-min")};
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  background: ${o("surprise-fill")};
  color: ${o("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${o("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${o("target-min")} / 2); height: calc(${o("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${o("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-sparkle svg { width: ${o("sparkle-icon-size")}; height: ${o("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${o("text")}; }
.nc-sparkle:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${o("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${o("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${o("name-width")};
  width: ${o("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${o("beat-gap")} - ${o("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${o("row-inset")});
  padding-inline: ${o("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${o("accent-tint")};
  box-shadow: inset ${o("marker-width")} 0 0 ${o("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${o("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${o("text")};
  text-decoration: underline;
  text-decoration-color: ${o("accent")};
  text-decoration-thickness: ${o("hairline")};
  text-underline-offset: ${o("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${o("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${o("move-row-gap")}; margin-top: ${o("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${o("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${o("move-label-width")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${o("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${o("move-size")};
  height: ${o("move-size")};
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${o("move-icon")}; height: ${o("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${o("text")}; border-color: ${o("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-moves-btn:disabled { color: ${o("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${o("target-min")}; height: ${o("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${o("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${o("text-sub")}; border-color: ${o("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${o("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${o("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${o("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${o("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${o("slider-pitch")};
  height: ${o("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${o("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${o("rhythm.track-mute")};
  border-color: ${o("rhythm.track-mute")};
  color: ${o("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${o("rhythm.track-solo")};
  border-color: ${o("rhythm.track-solo")};
  color: ${o("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${o("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${o("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
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
  background: ${o("velocity-fill")};
  border-color: ${o("velocity-fill")};
  color: ${o("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${o("playhead-width")} solid ${o("rhythm.playhead")};
  outline-offset: ${o("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${o("rhythm.bar-accent")}; }
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${o("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${o("control-gap")};
  margin-inline: calc((${o("control-gap")} + ${o("rhythm.step-gap")}) / -2);
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
  width: ${o("hairline")};
  height: ${o("target-min")};
  max-height: calc(${o("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${o("hairline")} solid ${o("text-sub")};
  background: ${o("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${o("text")}; border-color: ${o("text")}; }
.nc-len-handle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${o("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${o("accent")}; }
.nc-pad[data-out="true"] { border-color: ${o("divider")}; border-style: dashed; background: transparent; color: ${o("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${o("focus-width")} * 2) 0 0 ${o("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${o("focus-width")} * 2) 0 0 ${o("text")}, inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
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
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${o("module-gap")};
  margin-bottom: ${o("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${o("target-min")} / 3); height: calc(${o("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${o("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${o("target-min")};
  min-height: ${o("target-min")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${o("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${o("control-gap")};
  color: ${o("text-sub")};
  font-weight: ${o("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${o("text")}; border-bottom-color: ${o("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${o("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${o("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${o("target-min")} * 1.25);
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${o("control-gap")} ${o("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${o("velocity-fill")};
  border-color: ${o("velocity-fill")};
  color: ${o("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${o("playhead-width")} solid ${o("rhythm.playhead")};
  outline-offset: ${o("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${o("divider")}; color: ${o("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${o("text-sub")}; border-color: ${o("text-sub")}; color: ${o("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-step:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${o("playhead-width")};
  outline-offset: ${o("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${o("module-pad")} * -1);
  padding: ${o("stack-card-pad-y")} ${o("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${o("module-gap")} 0;
  font-size: ${o("body-size")};
  font-weight: ${o("fx-name-weight")};
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
  gap: ${o("module-gap")};
  margin-bottom: ${o("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
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
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${o("text")}; }
.nc-fold-toggle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${o("control-gap")} * 1.5);
  height: calc(${o("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${o("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${o("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${o("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${o("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${o("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${o("control-gap")};
  border-bottom: ${o("hairline")} solid transparent;
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  line-height: ${o("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${o("text")}; border-bottom-color: ${o("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${o("body-size")};
  font-weight: ${o("fx-name-weight")};
  color: ${o("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${o("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${o("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${o("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${o("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  height: ${o("level-steps-height")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("eq-graph-bg")};
  border-radius: ${o("slot-radius")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${o("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${o("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${o("beat-gap")} - ${o("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${o("level-steps-bar")}; }
.nc-lsteps-env { fill: ${o("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${o("level-steps-curve")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${o("divider")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${o("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${o("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${o("playhead-width")} solid ${o("playhead")}; outline-offset: ${o("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${o("level-steps-free")}; outline-width: ${o("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${o("playhead-width")} * -1) 0 0 ${o("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${o("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${o("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${o("slot-gap")} * 2) * -1));
  padding: calc(${o("slot-gap")} / 2) calc(${o("slot-gap")} * 2);
  border-radius: ${o("slot-radius")};
  background: ${o("accent")};
  color: ${o("on-accent")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${o("slot-gap")};
  padding: ${o("slot-gap")} calc(${o("slot-gap")} * 2) 0;
  font-family: ${o("font-readout")};
  font-size: ${o("slot-font-size")};
  line-height: 1;
  color: ${o("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${o("hairline")} solid ${o("divider")}; margin-top: ${o("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${o("slot-gap")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${o("slot-gap")} 0 ${o("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${o("hairline")} * -1);
  height: ${o("tab-mark")};
  background: ${o("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${o("label-size")} * 1.8); height: calc(${o("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${o("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("surface-page")};
  border-radius: ${o("slot-radius")};
  box-shadow: 0 0 0 ${o("hairline")} ${o("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${o("slot-gap")} * 2); font-family: ${o("font-readout")}; font-size: ${o("readout-size-small")}; color: ${o("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${o("slot-gap")} * 2); border-radius: ${o("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${o("on-accent")}; background: ${o("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${o("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${o("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${o("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${o("eq-graph-height")};
  background: ${o("eq-graph-bg")};
  border-radius: ${o("slot-radius")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${o("eq-curve")};
  position: absolute;
  width: ${o("eq-node-size")};
  height: ${o("eq-node-size")};
  margin: calc(${o("eq-node-size")} / -2) 0 0 calc(${o("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${o("hairline")} ${o("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${o("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${o("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${o("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${o("target-min")};
  height: ${o("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${o("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${o("hairline")} * 2) ${o("eq-graph-bg")}, 0 0 0 calc(${o("hairline")} * 2 + ${o("focus-width")}) ${o("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${o("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${o("hairline")} ${o("control-gap")};
  border-radius: ${o("slot-radius")};
  background: ${o("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
  color: ${o("text")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  line-height: ${o("label-leading")};
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
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${o("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-close { font-size: ${o("title-size")}; padding-inline: ${o("control-gap")}; }
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
  padding: 0 ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${o("control-gap")} * -1);
  right: calc(${o("control-gap")} * -1);
  height: max(100%, calc(${o("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${o("text")}; }
.nc-fx-remove:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${o("control-gap")} * 2.5); height: calc(${o("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${o("control-gap")} * 1.1);
  height: calc(${o("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${o("hairline")} * 1.5); border-top-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${o("hairline")} * 1.5); border-top-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${o("hairline")} * 1.5); border-bottom-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${o("hairline")} * 1.5); border-bottom-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${o("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${o("module-pad")} * 2);
  row-gap: ${o("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${o("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${o("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${o("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${o("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${o("hairline")} ${o("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${o("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${o("control-gap")};
  cursor: pointer;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-ui-more > summary:hover { color: ${o("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${o("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${o("module-gap")};
  row-gap: ${o("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${o("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${o("text-sub")};
}
.nc-group-toggle:hover { color: ${o("text")}; }
.nc-group-toggle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${o("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${o("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${o("control-gap")};
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${o("text")}; border-bottom-color: ${o("accent")}; }
.nc-ui-switch:hover { color: ${o("text")}; border-bottom-color: ${o("text")}; }
.nc-ui-switch:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
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
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${o("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  padding: ${o("module-pad")};
  background: ${o("surface-page")};
  border-top: ${o("hairline")} solid ${o("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${o("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${o("title-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${o("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${o("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${o("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${o("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${o("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${o("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${o("danger")}; }
.nc-knob {
  width: ${o("knob-size")};
  height: ${o("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${o("hairline")} solid ${o("divider")};
  background: ${o("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${o("control-gap")};
  width: ${o("hairline")};
  height: ${o("control-gap")};
  background: ${o("text")};
  transform-origin: center ${o("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${o("control-gap")} ${o("header-gap")};
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
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  padding: ${o("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${o("target-min")}; min-height: ${o("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${o("text")};
  border-bottom-color: ${o("accent")};
}
.nc-choice:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${o("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${o("target-min")} * 1.5);
  padding: ${o("control-gap")} ${o("control-gap")} ${o("control-gap")} calc(${o("control-gap")} * 2);
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${o("control-gap")};
  inset-inline-start: ${o("hairline")};
  width: ${o("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${o("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${o("text-sub")}; font-size: ${o("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${o("control-gap")};
  inset-inline-end: ${o("control-gap")};
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${o("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${o("control-gap")};
  border-color: ${o("divider")};
  background: ${o("divider")};
  color: ${o("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${o("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${o("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${o("accent")}; box-shadow: inset 0 0 0 ${o("hairline")} ${o("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${o("target-min")};
  padding: 0 ${o("control-gap")};
  border: ${o("hairline")} solid ${o("accent")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${o("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${o("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${o("control-gap")};
  min-width: ${o("name-width")};
  padding: ${o("control-gap")};
  background: ${o("surface-page")};
  border: ${o("hairline")} solid ${o("divider")};
  color: ${o("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${o("target-min")};
  border: 0;
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${o("target-min")};
  margin-block: calc((${o("slider-pitch")} - ${o("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${o("target-min")}; height: ${o("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${o("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${o("target-min")}); right: calc(${o("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${o("target-min")} - ${o("slider-pitch")}) / 2);
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
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${o("target-min")};
  height: ${o("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${o("target-min-coarse")}; height: ${o("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${o("module-gap")};
  width: calc(${o("name-width")} * 6);
  max-width: calc(100vw - 2 * ${o("module-gap")});
  padding: ${o("module-gap")};
  background: ${o("surface-page")};
  border: ${o("hairline")} solid ${o("divider")};
  color: ${o("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${o("focus-width")} solid ${o("text")};
  outline-offset: ${o("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${o("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${o("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${o("module-gap")};
  min-height: ${o("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${o("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${o("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${o("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${o("target-min")};
  min-height: ${o("target-min")};
  border: 0;
  background: none;
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${o("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${o("hairline")} 0 0;
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
  gap: ${o("toast-gap")};
  max-width: calc(100vw - 2 * ${o("toast-offset")});
  min-height: ${o("toast-target")};
  padding: 0 0 0 ${o("toast-pad-x")};
  border-radius: ${o("toast-radius")};
  background: ${o("toast-bg")};
  color: ${o("toast-text")};
  font-family: ${o("font-ui")};
  font-size: ${o("toast-font-size")};
  line-height: ${o("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${o("motion-fade")} ${o("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${o("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${o("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${o("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${o("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${o("motion-fade-out")} ${o("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${o("toast-pad-x")} / 2) calc(${o("toast-pad-x")} * 0.75);
  border-radius: ${o("toast-radius")};
  background: ${o("toast-bg")};
  color: ${o("toast-text")};
  font-family: ${o("font-ui")};
  font-size: ${o("toast-font-size")};
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
  min-width: ${o("toast-target")};
  min-height: ${o("toast-target")};
  padding: 0 ${o("toast-pad-x")};
  border: 0;
  background: none;
  color: ${o("toast-action")};
  font: inherit;
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${o("focus-width")} solid ${o("toast-action")};
  outline-offset: calc(-2 * ${o("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${o("hairline")};
  height: ${o("hairline")};
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
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  border-top: ${o("hairline")} solid ${o("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${o("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${o("module-pad")} ${o("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${o("module-bg-stack-1")};
  ${ae("text-sub")}: ${o("module-sub-stack-1")};
  ${ae("divider")}: ${o("module-div-stack-1")};
  ${ae("slider-track")}: ${o("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  border-inline-end: ${o("hairline")} solid ${o("module-div-stack-1")};
  background: ${o("module-bg-stack-1")};
  ${ae("text-sub")}: ${o("module-sub-stack-1")};
  ${ae("divider")}: ${o("module-div-stack-1")};
  ${ae("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${ae("text-sub")}: ${o("module-sub-stack-1")};
  ${ae("divider")}: ${o("module-div-stack-1")};
  ${ae("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${ae("text-sub")}: inherit;
  ${ae("divider")}: inherit;
  ${ae("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${o("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${o("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${o("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${o("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${o("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${o("fx-card-width")}; }
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
    width: calc(${o("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${o("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${o("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${o("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${o("module-gap")} * 3), 100% ${o("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${o("module-pad")} * -1) calc(${o("module-gap")} * -1);
    padding: ${o("stack-card-pad-y")} ${o("module-pad")} calc(${o("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${o("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${o("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${o("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${o("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${o("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${o("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${o("fx-card-width")};
    margin-inline-end: calc(${o("fx-card-width")} * -1);
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
    gap: ${o("module-gap")};
    height: ${o("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${o("target-min")};
  height: ${o("target-min")};
  margin: 0;
  padding: 0;
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${o("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${o("divider")}; border-color: ${o("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${o("control-gap")} * 2.5);
  height: calc(${o("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${o("hairline")} * 2) calc(${o("hairline")} * 2) 0 0;
  transform: translateX(calc(${o("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${o("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${o("text")};
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
  --nc-strip-ms-row: ${o("slider-pitch")};
  --nc-strip-knob-row: calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")});
  position: relative;
  flex: none;
  width: ${o("strip-width")};
  display: grid;
  grid-template-columns: ${o("control-gap")} minmax(0, 1fr) ${o("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${o("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${o("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${o("hairline")} solid ${o("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${o(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${ae("divider")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${ae("meter-track")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${o("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${o("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${o("control-gap")};
  min-width: calc(${o("strip-width")} * 2.5);
  padding: calc(${o("control-gap")} * 2) calc(${o("control-gap")} * 2.5);
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-size: ${o("label-size")};
}
.nc-strip-menu-title { color: ${o("text-sub")}; font-weight: ${o("label-weight")}; letter-spacing: ${o("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${o("control-gap")} * 4.5);
  height: calc(${o("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${o("hairline")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${o("text-sub")};
  font: inherit;
  font-size: ${o("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${o("hairline")} * 2) solid ${o("text")}; outline-offset: ${o("hairline")}; color: ${o("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${o("control-gap")} * 3);
  margin: 0;
  padding: ${o("control-gap")} 0;
  border: 0;
  border-top: ${o("hairline")} solid ${o("divider")};
  background: transparent;
  color: ${o("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${o("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${o("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${o("target-min")} * 0.7); height: calc(${o("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${o("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${o("stack-card-pad-y")} ${o("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${o("stack-card-pad-y")} ${o("module-pad")}; }
.nc-strip[data-nc-master] { width: ${o("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${o("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${o("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${o("danger")}; }
.nc-strip-remove:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${o("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${o("control-gap")};
  right: ${o("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${o("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${o("control-gap")} * 1.5);
  height: calc(${o("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${o("hairline")}, transparent calc(${o("hairline")} * 1.5)) 0 0 / calc(${o("control-gap")} * 0.75) calc(${o("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${o("control-gap")} * -1);
    top: calc(${o("control-gap")} * -1);
    width: calc(${o("target-min")} / 2);
    height: calc(${o("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${o("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${o("slider-pitch")};
  grid-auto-rows: ${o("slider-pitch")};
  gap: ${o("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${o("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${o("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${o("control-gap")}; }
.nc-strip-fold { gap: ${o("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${o("label-size")}; font-weight: ${o("label-weight")}; letter-spacing: ${o("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${o("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${o("fader-cap-height")};
  height: ${o("control-gap")};
  background: linear-gradient(${o("divider")}, ${o("divider")}) center / 100% ${o("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${o("control-gap")}));
  width: ${o("control-gap")};
  height: ${o("control-gap")};
  border-radius: 50%;
  background: ${o("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${o("fader-cap-height")};
  height: ${o("control-gap")};
  background: var(--nc-strip-cap, ${o("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("slider-pitch")};
  grid-template-rows: ${o("slider-pitch")};
  column-gap: ${o("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${o("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${o("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${o("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${ae("divider")}: ${o("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${o("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${o("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${o("hairline")} solid color-mix(in oklab, ${o("text-sub")} 50%, ${o("strip-divider")});
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("strip-hacks-text")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${o("text")}; border-color: ${o("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${o("fader-cap-master")};
  border-color: ${o("fader-cap-master")};
  color: ${o("surface-page")};
}
.nc-hacks:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${o("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${o("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${o("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-track")} calc(var(--knob-from, 135) * 1deg), ${o("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${o("label-size")};
  line-height: ${o("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${o("fader-cap-width")} auto auto;
  grid-template-rows: ${o("clip-size")} ${o("fader-height")};
  justify-content: center;
  column-gap: ${o("control-gap")};
  row-gap: ${o("control-gap")};
  padding-block: calc(${o("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${o("font-readout")};
  font-size: ${o("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${o("text-sub")};
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
  width: ${o("fader-cap-width")};
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
  width: ${o("rule-strong")};
  transform: translateX(-50%);
  background: ${o("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${o("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${o("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${o("hairline")};
  transform: translateY(-50%);
  background: ${o("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${o("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${o("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${o("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${o("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${o("clip-size")};
  padding: 0;
  border: 0;
  background: ${o("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${o("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${o("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-meter-bars { display: flex; gap: ${o("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${o("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${o("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${o("meter-peak")}; }
.nc-meter-rms { background: ${o("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${o("rule-strong")} solid ${o("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${o("hairline")}; height: ${o("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${o("fx-level-bar")}; overflow: hidden; background: ${o("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${o("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${o("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${o("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${o("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${o("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${o("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${o("divider")}; text-underline-offset: ${o("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("accent")};
  border-radius: 0;
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${o("strip-width")};
  margin-inline-start: ${o("module-gap")};
  border: ${o("hairline")} dashed ${o("divider")};
  color: ${o("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${o("text")}; border-color: ${o("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${o("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${o("font-readout")}; font-size: ${o("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
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
  font-size: ${o("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-db:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
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
    border-top: ${o("hairline")} solid ${o("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${o("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${o("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${o("module-pad-x-desktop")};
    padding-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${o("stack-card-pad-y")} ${o("module-pad-x-desktop")} ${o("module-pad-y-desktop")};
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
  background: ${o("accent")};
  font-family: ${o("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${o("page-pad-y-md")} ${o("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${o("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${o("page-pad-y-md")} * -1); left: calc(${o("page-pad-x-md")} * -1); right: calc(${o("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${o("header-gap")};
  padding-inline: ${o("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${o("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${o("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${o("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${o("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${o("target-min")}; }
  .nc-snap { font-size: ${o("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${o("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${o("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${o("page-pad-x-xl")} * -1); right: calc(${o("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${o("hairline")} solid ${o("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${o("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${o("target-min")};
  }
  .nc-snap { font-size: ${o("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
    padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
    padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${o("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${o("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${o("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    padding-inline: ${o("module-pad-x-desktop")};
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
    border-bottom: ${o("hairline")} solid ${o("divider")};
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
    gap: ${o("module-gap")};
    padding-block: ${o("control-gap")};
    background: ${o("surface-page")};
    border-bottom: ${o("hairline")} solid ${o("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${o("module-gap")};
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
    max-width: ${o("slot-span")};
    height: ${o("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${o("readout-size")}; }
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
${xs("")}
}
@media (max-width: 1023px) {
${xs("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Lr("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Lr("")}
}
@media (max-width: 1023px) {
${Lr("html[data-nc-landscape] ")}
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${o("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent-faint")};
  }
}
`}var Cr=null,Hf="nc-ui-fallback";function Lc(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Cr&&Cr.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Hf} {
${Vf()}
}
`,e.head.append(t),Cr=t}var $n=null,Uf=0,Wf=new URL("/studio/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Cc=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Wf,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Cc(document);function _e(e){return Nc(e).then(t=>!!t.ok)}function Nc({title:e,body:t,lines:n=[],extra:a,confirmLabel:r="Confirm",cancelLabel:i="Cancel",danger:s=!1,root:l,returnFocus:d,signal:u},c){if($n||u?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,f=Cc(p),g=l??p.body,m=p.defaultView??globalThis,v=`nc-ui-confirm-${++Uf}`,h=(U,ve,he)=>{let Fe=p.createElement(U);return Fe.className=`nc-ui-confirm${ve}`,he!=null&&(Fe.textContent=he),Fe},y=h("div","-layer");y.dataset.state="enter";let x=h("div","");x.setAttribute("role","alertdialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-labelledby",`${v}-t`);let b=h("h2","-title",e);b.id=`${v}-t`;let A=h("p","-body",t);A.id=`${v}-b`;let T=n.map((U,ve)=>{let he=h("p","-body",U?.text??U);return he.id=`${v}-b${ve}`,U?.tone==="danger"&&(he.dataset.tone="danger"),he});x.setAttribute("aria-describedby",[A,...T].map(U=>U.id).join(" "));let w=a&&h("button","-extra",a.label);w&&(w.type="button",w.dataset.ncConfirm="extra",w.addEventListener("click",()=>a.onAction?.()));let k=h("div","-actions"),M=(U,ve)=>{let he=h("button","-btn",U);return he.type="button",he.dataset.ncConfirm=ve,he.addEventListener("click",()=>be(ve==="ok")),he},S=M(i,"cancel"),L=M(r,"ok");s&&(L.dataset.danger="true"),k.append(S,L);let[N,j]=c?.(h,L)??[];x.append(b,A,...T,...N?[N]:[],...w?[w]:[],k);let _=[j,w,S,L].filter(Boolean);y.append(x);let K={layer:y};$n=K;let pe=d??p.activeElement,ge=[];for(let U of g.children)U.hasAttribute("inert")||(U.setAttribute("inert",""),ge.push(U));let se=()=>{if($n!==K)return;g.append(y),(j??S).focus({preventScroll:!0});let U=m.requestAnimationFrame?.bind(m)??(ve=>setTimeout(ve,16));U(()=>U(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};f?f.then(se):se();let re=!1;y.addEventListener("pointerdown",U=>{re=U.target===y}),y.addEventListener("click",U=>{U.target===y&&re&&be(!1),re=!1});let G=U=>{if(U.stopImmediatePropagation(),U.key==="Escape")U.preventDefault(),be(!1);else if(U.key==="Tab"){U.preventDefault();let ve=_.filter(Fe=>!Fe.disabled),he=ve.length;ve[(ve.indexOf(p.activeElement)+(U.shiftKey?he-1:1))%he].focus()}else U.key==="Enter"&&(U.preventDefault(),p.activeElement===w?w.click():p.activeElement===S?be(!1):L.disabled||be(!0))},jt=U=>U.stopImmediatePropagation();m.addEventListener("keydown",G,!0),m.addEventListener("keyup",jt,!0);let $t=()=>be(!1);u?.addEventListener("abort",$t);let Et,ra=new Promise(U=>{Et=U});function be(U){if($n!==K)return;$n=null,m.removeEventListener("keydown",G,!0),m.removeEventListener("keyup",jt,!0),u?.removeEventListener("abort",$t);for(let Ge of ge)Ge.removeAttribute("inert");y.dataset.state="closing",pe?.isConnected&&typeof pe.focus=="function"&&pe.focus({preventScroll:!0});let ve=m.getComputedStyle?.(y),he=Math.max(0,...String(ve?.transitionDuration??"").split(",").map(Ge=>Number.parseFloat(Ge)*(Ge.trim().endsWith("ms")?1:1e3)||0)),Fe=()=>y.remove();y.addEventListener("transitionend",Ge=>Ge.target===y&&Fe()),setTimeout(Fe,he+50),Et({ok:U,value:j?.value.trim()})}return ra}function Gf(e){let t=e.field??{};return Nc(e,(n,a)=>{let r=n("label","-field"),i=n("input","-input");i.type=t.type??"text",i.value=t.value??"",t.placeholder&&(i.placeholder=t.placeholder),i.spellcheck=!1,i.autocomplete="off";let s=()=>{a.disabled=i.value.trim()===""};return i.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),i),[r,i]}).then(n=>n.ok?n.value:null)}function Ji(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(r,i),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ic=new WeakMap,ks=.25;function Kf(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let i=0,s=e.step??.005,l=e.onChange,d=e.onReset,u=h=>Math.min(1,Math.max(0,h)),c=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},p=h=>{let y=u(h);y!==i&&(i=y,c(),l?.(y))},f=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let y=n.getBoundingClientRect();h.target!==r&&y.height>0&&p(1-(h.clientY-y.top)/y.height),f=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;let y=n.getBoundingClientRect().height||1,x=(f-h.clientY)/y*(h.shiftKey?ks:1);f=h.clientY,p(i+x)});let m=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",m),n.addEventListener("pointercancel",m),n.addEventListener("lostpointercapture",m),n.addEventListener("dblclick",h=>{h.preventDefault(),d?.()}),n.addEventListener("keydown",h=>{let y=h.shiftKey?s*ks:s,x={ArrowUp:i+y,ArrowRight:i+y,ArrowDown:i-y,ArrowLeft:i-y,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};h.key in x&&(h.preventDefault(),p(x[h.key]))});let v={el:n,get value(){return i},get dragging(){return g},set(h){g||(i=u(Number(h)||0),c())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(d=h.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),Ic.set(n,v),v}function Yf(e){return Ic.get(e)}var Fc=new WeakMap,Xf=.2,Jf=1.5,Qf=.5;function Zf(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function $s(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Zf(a.getComputedStyle(e).getPropertyValue(ae(t)),n)}function em(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let v=0;v<n;v++){let h=t.createElement("span");h.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let b=t.createElement("span");b.className="nc-meter-hold",h.append(y,x,b),i.append(h),s.push({peak:y,rms:x,hold:b,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,i);let l=e.label,d=e.onClear,u=!1,c=-1,p=-1,f=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},g=(v,h,y,x)=>{let b=Math.round(x*1e3)/1e3;y[h]!==b&&(y[h]=b,v.style.transform=h==="hold"?`translateY(${Math.round((1-b)*1e3)/10}%)`:`scaleY(${b})`)};r.addEventListener("click",()=>{m.clear(),d?.()});let m={el:a,get clipped(){return u},update(v,h){c<0&&(c=$s(a,"motion-meter-fall",Xf)),p<0&&(p=$s(a,"motion-meter-hold",Jf));let y=Math.max(0,Math.min(.25,Number(h)||0)),x=c>0?Math.exp(-y/c):0;s.forEach((b,A)=>{let T=v[A]??v[0]??{peak:0,rms:0},w=Math.min(1,Math.max(0,Number(T.peak)||0)),k=Math.min(w,Math.max(0,Number(T.rms)||0));T.over&&m.clip(),b.level.peak=w>=b.level.peak?w:w+(b.level.peak-w)*x,b.level.rms=k>=b.level.rms?k:k+(b.level.rms-k)*x,b.holdAge+=y,w>=b.holdAt?(b.holdAt=w,b.holdAge=0):b.holdAge>p&&(b.holdAt=Math.max(w,b.holdAt-Qf*y)),g(b.peak,"peak",b.shown,b.level.peak),g(b.rms,"rms",b.shown,b.level.rms),g(b.hold,"hold",b.shown,b.holdAt),b.hold.dataset.off=b.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let v of s)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,g(v.peak,"peak",v.shown,0),g(v.rms,"rms",v.shown,0),g(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,f()},configure(v){v.onClear&&(d=v.onClear)}};return f(),m.reset(),Fc.set(a,m),m}function Pc(e){return e?Fc.get(e):void 0}var tm=3,nm=new Set(["freq","q","rate","time","log"]);function Qi(e,t,n){return!e||!nm.has(e)||!(n>t)?"linear":t>0?"log":"power"}function or(e,t,n){return Qi(e,t,n)!=="linear"}function qa(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=Qi(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function zc(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),i=Qi(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**tm:r)}function Dc(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function Zi(e,t,n,a){return Math.round(qa(e,t,n,a)*1e3)}function li(e,t,n,a,r){return Dc(zc(e,t,n,Number(a)/1e3),t,n,r)}function am(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+r:t==="ArrowLeft"||t==="ArrowDown"?i=a-r:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function Rc(e,t,n,a,r,i=!1,s){let l=Zi(e,t,n,a),d=am(l,r,i);if(d===null)return null;let u=li(e,t,n,d,s),c=Math.sign(d-l),p=Dc(Number(a),t,n,s);for(;c!==0&&u===p&&d>0&&d<1e3;)d+=c,u=li(e,t,n,d,s);return u}function Es(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Ss(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function rm(e,t,n,a=n/6){let r=e.some(c=>c===null),i=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,f)=>p===null?c:c+Ss(t[f]),0),l=s>0?i/s:0,d=e.map(c=>c===null?0:Math.min(i,Ss(c)*l));if(r){let c=d.reduce((f,g)=>f+g,0),p=e.indexOf(null);d[p]=Math.max(a,n-c)}let u=[0];for(let c of d)u.push(Math.round((u[u.length-1]+c)*100)/100);return r&&(u[u.length-1]=n),u}function im(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function st(e){return Math.max(0,Math.min(1,e))}function Oc(e,t){let{ctx:n,w:a,h:r}=im(e);if(!n)return;n.clearRect(0,0,a,r);let i=qf(e);if(t.paint==="swatch"){let d=me(e,"accent"),u=me(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,r),n.fillStyle=u,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){lm(n,a,r,t,e,i);return}if(t.paint==="filter"){let d=t.mode??"lp",u=me(e,Mc(d)),c=me(e,"divider"),p=st(t.cutoff??.5),f=.08+(1-st(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let m=g/Math.max(1,a),v=0;d==="lp"?v=m<p?1:Math.max(0,1-(m-p)/f):d==="hp"?v=m>p?1:Math.max(0,1-(p-m)/f):v=Math.max(0,1-Math.abs(m-p)/f);let h=r*.78-v*r*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=u,n.stroke(),n.fillStyle=me(e,"text-sub"),n.font=i,n.fillText(d.toUpperCase(),0,r),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=me(e,"accent");let d=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[c,p,f]=rm([d,u],t.max??[1,4],a),g=2,m=r-1;n.beginPath(),n.moveTo(c,m),n.lineTo(p,g);let v=Math.max(1,Math.ceil(f-p));for(let h=1;h<=v;h++){let y=h/v;n.lineTo(p+(f-p)*y,m-(m-g)*Math.exp(-4.6*y)*(1-y*.01))}n.lineTo(f,m),n.lineTo(a,m),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[u,c]=Array.isArray(t.region)?t.region:[0,1],p=me(e,"accent"),f=me(e,"text-sub"),g=r/2;n.fillStyle=me(e,"accent-soft"),n.fillRect(st(u)*a,0,(st(c)-st(u))*a,r),n.strokeStyle=me(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let m=Math.floor(d.length/2);for(let v=0;v<m;v++){let h=(v+.5)/m*a,y=Math.max(-1,Math.min(1,d[v*2]??0)),x=Math.max(-1,Math.min(1,d[v*2+1]??0)),b=(v+.5)/m;n.strokeStyle=b>=u&&b<=c?p:f,n.beginPath(),n.moveTo(h,g-x*(g-1)),n.lineTo(h,g-y*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let v of[u,c,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(st(v)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=me(e,"text"),n.fillRect(Math.round(st(t.position)*(a-1)),0,1,r)),m||(n.fillStyle=f,n.font=i,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let d=st(t.level??0);n.fillStyle=me(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=me(e,"accent"),n.fillRect(0,r*.4,a*d,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=me(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=me(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=me(e,"accent")}var zn=20,ci=2e4,Nr=24,As=-60;function om(e,t,n,a,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),d,u,c;e==="hp"?[d,u,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,u,c]=[l,0,-l]:[d,u,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,g=1-l,m=2*Math.PI*a/r,v=(b,A,T)=>b+A*Math.cos(m)+T*Math.cos(2*m),h=(b,A)=>-(b*Math.sin(m)+A*Math.sin(2*m)),y=Math.hypot(v(d,u,c),h(u,c)),x=Math.hypot(v(p,f,g),h(f,g));return x>0?y/x:0}function sm(e,t){return Math.log(Math.max(zn,Math.min(ci,e))/zn)/Math.log(ci/zn)*t}function Ms(e,t,n){let a=Math.max(As,Math.min(Nr,e));return t+(Nr-a)/(Nr-As)*(n-t)}function lm(e,t,n,a,r,i){let s=a.mode??"lp",l=me(r,Mc(s)),d=me(r,"divider"),u=me(r,"text-sub"),c=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-c-3),g=a.q??Math.SQRT1_2,m=Math.round(Ms(0,p,f))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,m),e.lineTo(t,m),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let h=zn*(ci/zn)**(v/Math.max(1,t)),y=a.open?1:om(s,a.hz,g,h,a.sampleRate),x=Ms(20*Math.log10(Math.max(1e-5,y)),p,f);v===0?e.moveTo(v,x):e.lineTo(v,x)}if(e.strokeStyle=l,e.stroke(),!a.open){let v=Math.round(sm(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,p),e.lineTo(v,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function qe(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function cm(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Rt=20,Qn=2e4,eo=Math.log(Qn/Rt),di=32,dm=250,um=-100,pm=1200,hm=4.5,Ts=-6,Lt=-96,fm=48,Ls=[100,1e3,1e4],mm=[6,12];function nn(e,t){return Math.log(Math.max(Rt,Math.min(Qn,e))/Rt)/eo*t}function $a(e,t){return Rt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*eo)}function yt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function ui(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Bc=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function gm(e,t,n,a){let r=n?3:1,i=d=>({db:Math.max(-a,Math.min(a,e.db+d*r))}),s=d=>({hz:Math.max(e.minHz??Rt,Math.min(e.maxHz??Qn,e.hz*2**(d*r/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function to(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function bm(e,t,n,a,r,i,s,l,d){let u=d?.25:1,c={},p=Math.max(1,i/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*u/p*s/to(e))),e.moveHz){let f=t.hz*Math.exp(n*u/Math.max(1,r)*eo);c.hz=Math.max(e.minHz??Rt,Math.min(e.maxHz??Qn,f))}return c}function ym(e,t,n,a,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-i),d=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ye=new WeakMap;function vm(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,i);for(let d of e.bands)a.append(wm(n,d,t));a.append(s),a.addEventListener("click",d=>{if(!Uc(n)||d.button>0)return;let u=Hc(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ye.set(n,{control:e,cache:null,spec:null,active:null}),qc(n,e),n}function jc(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function wm(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},i=()=>r()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let c=i();c&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",lt(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let c=r(),p=i(),f=ye.get(e);if(!c||!p||!f?.box)return;let{w:g,h:m,pad:v}=f.box;c.onBand(p.id,bm(p,s.start,u.clientX-s.x,u.clientY-s.y,g,m,c.range??18,v,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&lt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let c=r(),p=i();if(!c||!p)return;let f=gm(p,u.key,u.shiftKey,c.range??18);f&&(u.preventDefault(),f==="reset"?c.onReset?.(p.id):c.onBand(p.id,f),lt(e,p.id))});let d=null;return a.addEventListener("wheel",u=>{let c=r(),p=i();if(!c||!p?.moveQ)return;u.preventDefault();let f=u.timeStamp;(!d||f-d.t>400)&&(d={q:p.q,t:f});let g=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;d.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,d.q*2**(-g/240))),d.t=f,c.onBand(p.id,{q:d.q}),lt(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>lt(e,t.id)),a.addEventListener("focus",()=>lt(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&lt(e,null)}),a.addEventListener("blur",()=>{s||lt(e,null)}),a}function lt(e,t){let n=ye.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?cn(e):no(e)}function no(e){let t=ye.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(m=>m.id===t.active):null;for(let m of e.querySelectorAll(".nc-eq-node"))m instanceof HTMLElement&&(a&&m.dataset.band===a.id?m.dataset.active="true":delete m.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,Bc(a.db)];a.kind==="peak"?r.push(ui(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${ui(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(xm(t.control,a)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,d=nn(a.hz,i),u=yt(a.db*to(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(i-c,d-c/2)),g=u-p-l*1.5>=0?u-p-l*1.5:Math.min(s-p,u+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(g)}px`}function xm(e,t){return e.bands.indexOf(t)%3+1}function qc(e,t){let n=ye.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ao(e);let a=t.range??18;t.bands.forEach((r,i)=>{let s=jc(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${Bc(r.db)}, ${ui(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),cn(e),Mm(e)}function _c(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Vc(e){return{curve:qe(e,"eq-curve"),fill:qe(e,"eq-fill"),quiet:qe(e,"text-sub"),grid:qe(e,"eq-grid"),zero:qe(e,"divider"),label:qe(e,"text-sub"),spectrum:qe(e,"eq-spectrum"),bands:[qe(e,"eq-band-1"),qe(e,"eq-band-2"),qe(e,"eq-band-3")]}}function km(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function cn(e){ye.has(e)&&ao(e);let t=ye.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:i,h:s}=_c(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),d=a.range??18;t.box={w:i,h:s,pad:l},t.colours=Vc(e);let u=t.colours,c=km(a,i);if(!t.cache||t.cache.key!==c){let A=Math.max(64,Math.ceil(i)+1),T=new Float64Array(A);for(let k=0;k<A;k++)T[k]=$a(k/(A-1)*i,i);let w=null;try{w=typeof a.response=="function"?a.response(T):null}catch{w=null}t.cache={key:c,freqs:T,total:w?.total??new Float64Array(A),bands:w?.bands??[]}}r.clearRect(0,0,i,s);let p=cm(e),f=a.on!==!1;$m(r,i,s,d,l,u,p);let{freqs:g,total:m,bands:v}=t.cache,h=Array.from(g,A=>nn(A,i)),y=yt(0,s,d,l);v.forEach((A,T)=>{if(!A||!A.some(M=>Math.abs(M)>.05))return;let w=f?u.bands[T%3]:u.quiet,k=Array.from(A,M=>yt(M,s,d,l));r.save(),t.active&&a.bands[T]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=w,Cs(r,h,k,y)),r.globalAlpha=f?.75:.4,r.strokeStyle=w,r.lineWidth=.75,Ir(r,h,k),r.restore()});let x=Array.from(m,A=>yt(A,s,d,l)),b=f?u.curve:u.quiet;r.save(),r.fillStyle=f?u.fill:u.quiet,r.globalAlpha=f?.2:.08,Cs(r,h,x,y),r.restore(),r.save(),r.strokeStyle=f?u.fill:b,r.lineJoin="round",r.lineCap="round",f&&(r.globalAlpha=.16,r.lineWidth=4,Ir(r,h,x)),r.globalAlpha=1,r.strokeStyle=b,r.lineWidth=1.25,Ir(r,h,x),r.restore(),Em(e),no(e)}function $m(e,t,n,a,r,i,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let u=1;u<=9;u++){let c=d*u;if(c<Rt||c>Qn)continue;let p=Math.round(nn(c,t))+.5;e.globalAlpha=Ls.includes(c)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let d of mm)if(!(d>a))for(let u of[1,-1]){let c=Math.round(yt(d*u,n,a,r))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(yt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Ls){let u=d>=1e3?`${d/1e3}k`:String(d),c=e.measureText(u).width,p=nn(d,t)+3;e.fillText(u,p+c+2>t?nn(d,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>a)continue;let u=yt(d,n,a,r);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(u)-1)}e.restore()}function _a(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function Ir(e,t,n){e.beginPath(),_a(e,t,n),e.stroke()}function Cs(e,t,n,a){e.beginPath(),_a(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function Hc(e){return e.closest("[data-nc-maxable]")}function Uc(e){let t=Hc(e);return!!t&&!t.hasAttribute("data-nc-max")}function ao(e){let t=Uc(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ye.get(e);n?.active&&(n.active=null,no(e))}return t}function Em(e){ao(e);let t=ye.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=jc(e,s.id);l instanceof HTMLElement&&(l.style.left=`${nn(s.hz,n).toFixed(1)}px`,l.style.top=`${yt(s.db*to(s),a,i,r).toFixed(1)}px`)}}function Sm(e,t,n,a){let r=a/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let u=(d-.5)/(e-1)*t,c=(d+.5)/(e-1)*t,p=$a(u,t),f=$a(c,t),g=$a(d/(e-1)*t,t);i[d]=Math.min(n-1,p/r),s[d]=Math.min(n-1,f/r),l[d]=hm*Math.log2(g/1e3)}return{lo:i,hi:s,tilt:l}}function Am(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,d=e[Math.min(e.length-1,a+1)]??l;return l+(d-l)*s}let i=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function Mm(e){let t=ye.get(e);if(t){if(!t.control.spectrum){Gc(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=ye.get(e)?.spec;r&&(r.visible=a.some(i=>i.isIntersecting),pi(e))}),t.spec.io.observe(e)):t.spec.visible=!0}pi(e)}}function pi(e){let t=ye.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){Wc(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=hi(e),n.onVis||(n.onVis=()=>pi(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&fi(e,!1)}function hi(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function fi(e,t){let n=ye.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Fr(e,hi(e))),dm):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,Fr(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,Fr(e,hi(e))),di))}function Wc(e){let t=ye.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function Gc(e){let t=ye.get(e)?.spec;if(!t)return;Wc(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ye.get(e);n&&(n.spec=null)}function Fr(e,t){let n=ye.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){Gc(e);return}if(!a.analyser)return;if(t-a.last<di-4&&!a.idle){fi(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):di/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=_c(i);if(!s)return;let u=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:u,w:l,sr:c,...Sm(u,l,a.buf.length,c)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=fm*r,{lo:g,hi:m,tilt:v}=a.map;for(let y=0;y<u;y++){let x=Am(a.buf,g[y],m[y]);x>p&&(p=x);let b=x+v[y],A=a.disp[y]-f;a.disp[y]=b>A?b:A}p>um&&(a.loud=t);let h=t-a.loud>pm;s.clearRect(0,0,l,d),(!h||a.disp.some(y=>y>Lt))&&Tm(s,l,d,a.disp,n.colours??Vc(e)),a.idle=h&&!a.disp.some(y=>y>Lt),fi(e,a.idle)}function Tm(e,t,n,a,r){let i=a.length,s=new Array(i),l=new Array(i),d=u=>{let c=a[Math.max(0,Math.min(i-1,u))];return Number.isFinite(c)?c:Lt};for(let u=0;u<i;u++){let c=d(u)*.36+(d(u-1)+d(u+1))*.22+(d(u-2)+d(u+2))*.1,p=(Math.max(Lt,Math.min(Ts,Number.isFinite(c)?c:Lt))-Lt)/(Ts-Lt);s[u]=u/(i-1)*t,l[u]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),_a(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),_a(e,s,l),e.stroke(),e.restore()}var Ie=new WeakMap,Lm=450,Cm=6,Nm=33,Pr=24,Im="http://www.w3.org/2000/svg";function Fm(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Pm(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function zm(e,t,n,a,r){let i=e.slice();if(t===a)return i[a]=r,i;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let d=(l-t)/(a-t);i[l]=Math.round((n+(r-n)*d)*100)/100}return i}function Dm(e,t){let n=e.steps[t],a=(e.shapes??[]).find(i=>i.value===n.shape),r=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${r}`}function Ct(e,t){let n=document.createElementNS(Im,e);for(let[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n}function Kc(e){let t=Ct("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Ct("path",{d:e})),t}function Rm(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let r=document.createElement("div");r.className="nc-lsteps-axis",r.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,r,i,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Ie.set(n,d),Bm(n,a),jm(n,s),Yc(n,e),n}function ze(e){let t=Ie.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Om(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function zr(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=Om(e);return{i:Pm(t.clientX,a),level:Fm(t.clientY-n.top,n.height)}}function Bm(e,t){let n=Ie.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let s=ze(e);if(!s||i.button>0||!s.steps.length)return;i.preventDefault(),Va(e),t.setPointerCapture?.(i.pointerId);let l=zr(t,i),d=s.steps.map(u=>u.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Ns(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let u=n.drag;!u||u.moved||(u.long=!0,ze(e)?.onLevels(u.start.slice(),!0),Dr(e,u.i))},Lm)}),t.addEventListener("pointermove",i=>{let s=n.drag;if(!s||s.id!==i.pointerId||s.long||!s.moved&&Math.hypot(i.clientX-s.x,i.clientY-s.y)<Cm)return;s.moved=!0,a();let l=zr(t,i);Ns(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let r=i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(i.pointerId),s.long||ze(e)?.onLevels(s.levels.slice(),!0),mi(e,-1))};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",i=>{let s=n.drag;!s||s.id!==i.pointerId||(a(),n.drag=null,s.long||ze(e)?.onLevels(s.start.slice(),!0),mi(e,-1))}),t.addEventListener("contextmenu",i=>{ze(e)?.onShape&&(i.preventDefault(),Dr(e,zr(t,i).i))}),t.addEventListener("keydown",i=>{let s=ze(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),u=s.steps[d].level,c=p=>{let f=s.steps.map(g=>g.level);f[d]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(f,!0)};switch(i.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":c(u+(i.shiftKey?.01:.05));break;case"ArrowDown":c(u-(i.shiftKey?.01:.05));break;case"PageUp":c(u+.25);break;case"PageDown":c(u-.25);break;case"Home":c(1);break;case"End":c(0);break;case"Enter":case" ":if(!s.onShape)return;Dr(e,d);break;default:return}i.preventDefault(),gi(e)}),t.addEventListener("focus",()=>gi(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function Ns(e,t,n,a,r,i){let s=Ie.get(e).drag;s&&(s.levels=zm(s.levels,t,n,a,r),mi(e,a,s.levels[a]),ze(e)?.onLevels(s.levels.slice(),i))}function mi(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function gi(e){let t=Ie.get(e),n=e.querySelector(".nc-lsteps-plot"),a=ze(e);if(!n||!a)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let r=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[r]?.level??0)*100))),n.setAttribute("aria-valuetext",Dm(a,r))}function jm(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Va(e,!0);return}let a=[...t.querySelectorAll("button")],r=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(r+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(r-1+a.length)%a.length]?.focus())}),Ie.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Va(e)}}function Dr(e,t){let n=ze(e),a=e.querySelector(".nc-lsteps-pick"),r=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!r)return;let i=Ie.get(e);i.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let g of n.shapes??[]){let m=document.createElement("button");m.type="button",m.setAttribute("role","menuitemradio"),m.setAttribute("aria-checked",n.steps[t]?.shape===g.value?"true":"false"),g.icon&&m.append(Kc(g.icon)),m.append(document.createTextNode(g.label)),m.addEventListener("click",()=>{ze(e)?.onShape?.(t,g.value),Va(e,!0)}),a.append(m)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=r.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),u=l?.getBoundingClientRect(),c=a.getBoundingClientRect().width,p=u?u.left+u.width/2-d.left:0,f=Math.max(0,Math.min(d.width-c,p-c/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Va(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Ie.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function qm(e,t){let n=Ie.get(e),a=e.querySelector(".nc-lsteps-plot"),r=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",r.textContent="";for(let i=0;i<t;i++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(i),i%4===0&&i>0&&(s.dataset.beat="true");let l=Ct("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Ct("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Ct("path",{class:"nc-lsteps-env",d:""}),Ct("path",{class:"nc-lsteps-top",d:""}),Ct("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let d=document.createElement("span");i%4===0&&(d.textContent=String(i+1)),i%4===0&&i>0&&(d.dataset.beat="true"),r.append(d)}}}function Yc(e,t){let n=Ie.get(e);if(!n)return;n.control=t;let a=t.steps.length;qm(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let r=e.querySelector(".nc-lsteps-plot");r.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),s=r.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((g,m)=>{let v=s[m];if(!v)return;let h=String((m%2?1-i:i)*2);v.style.setProperty("--nc-lsteps-grow",h),l[m]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&m>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=g.level<=0?"true":"false";let y=Math.max(0,Math.min(1,g.level)),x=v.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-y*100)),x.setAttribute("height",String(y*100));let b=t.curve?t.curve(m,Pr):null,A="M0 100",T="";for(let w=0;w<=Pr;w++){let k=b?Math.max(0,Math.min(1,b[w]??y)):y,M=w/Pr*100,S=100-k*100;A+=` L${M.toFixed(2)} ${S.toFixed(2)}`,T+=`${w?" L":"M"}${M.toFixed(2)} ${S.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${A} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",T)});let d=e.querySelector(".nc-lsteps-shapes"),u=(t.shapes??[]).map(g=>`${g.value}:${g.label}`).join();if(u!==n.shapeKey){n.shapeKey=u,d.textContent="";for(let g of t.shapes??[]){let m=document.createElement("button");m.type="button",m.className="nc-lsteps-shape",m.setAttribute("role","tab"),m.dataset.shape=String(g.value),g.icon&&m.append(Kc(g.icon)),m.append(document.createTextNode(g.label)),m.addEventListener("click",()=>ze(e)?.onShapeAll?.(g.value)),d.append(m)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let c=t.played??a,p=t.steps[0]?.shape,f=t.steps.slice(0,c).every(g=>g.shape===p);for(let g of d.querySelectorAll(".nc-lsteps-shape")){let m=f&&g.dataset.shape===String(p);g.setAttribute("aria-selected",m?"true":"false"),g.tabIndex=m||!f&&g===d.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),gi(e),n.last=-2,_m(e)}function _m(e){let t=Ie.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Rr(e,null);return}let a=0,r=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Rr(e,null);return}i-a>=Nm&&(a=i,Rr(e,t.control.playhead())),t.loop=n.requestAnimationFrame(r)};t.loop=n.requestAnimationFrame(r)}function Rr(e,t){let n=Ie.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,r=!!t?.locked;if(!(n.last===a&&n.lastLocked===r)){n.last=a,n.lastLocked=r;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===a?(i.dataset.playhead="true",i.dataset.locked=r?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!r?"true":"false"}}var Vm=.8912509381337456,bi=32,Hm=250,Um=1200,Wm=.2,Xc=1.5;function Gm(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Km(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var Ha=new WeakMap,Is=new WeakMap;function Fs(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function Ym(e){let t=Is.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let i of r){let s=Ha.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),Dn(s))}Jt(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Dn(r);Jt(t)}),Is.set(e,t),t}var Jc=e=>e.els.some(t=>t.isConnected);function Xm(e){if(!e.loop.io)return Jc(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Dn(e){let t=!e.dead&&!!e.source&&Xm(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ro(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),wi(e))}function ro(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Jt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Qc(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ro(e)),!e.raf&&!e.timer&&yi(e,!1)}function yi(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Ps(e,ro(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),Hm):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Ps(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),bi)}function Qc(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ps(e,t){if(t-e.last<bi-4&&!e.idle&&e.last){yi(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):bi/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let i of e.recs){if(!Jc(i)){(i.placed||e.frames-i.born>90)&&Zc(i);continue}i.placed=!0,i.open&&(r=!0,Jm(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!r){Qc(e);return}e.idle=t-e.loud>Um&&!a,yi(e,e.idle)}function Jm(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Fs(f,"motion-meter-fall",Wm),e.hold=Fs(f,"motion-meter-hold",Xc)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",i=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let f of e.els)f.dataset.ncRows=d}let u=e.fall>0?Math.exp(-t/e.fall):0,c=[i,l],p=!1;for(let f=0;f<2;f++){let g=Gm(c[f]);g>0&&(p=!0),e.disp[f]=g>=e.disp[f]?g:g+(e.disp[f]-g)*u,e.disp[f]<.001&&(e.disp[f]=0),c[f]>=Vm&&(e.clipAt[f]=n);let m=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;vi(e,f,e.disp[f],m)}return p}function vi(e,t,n,a){let r=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function wi(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,vi(e,0,0,!1),vi(e,1,0,!1)}function Zc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ha.get(t)===e&&Ha.delete(t)}function Qm(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=Ym(a),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Xc,rows:""};for(let s of n)Ha.set(s,i),r.io?.observe(s);if(r.recs.add(i),wi(i),!r.io){let s=a.defaultView,l=()=>{Dn(i),Jt(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){Dn(i),Jt(r);return}i.open&&(i.open=!1,i.source?.close?.(),wi(i)),i.source=l,Dn(i),Jt(r)}},destroy(){i.dead||Zc(i),Jt(r)}}}var ed={slop:8,longPressMs:500,pitchPx:16},Zm=class{constructor(e,t,n=ed){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function eg(e,t,n,a=ed){let r=!1,i=0,s=(u,c)=>{let p=e.ownerDocument.elementFromPoint?.(u,c),f=[...e.querySelectorAll(t)],g=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(g>=0)return g;let m=-1,v=Number.POSITIVE_INFINITY;return f.forEach((h,y)=>{if(h.hidden)return;let x=h.getBoundingClientRect();if(c<x.top||c>x.bottom)return;let b=Math.abs(u-(x.left+x.width/2));b<v&&b<=x.width&&(m=y,v=b)}),m},l=new Zm(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},a),d=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var td="netcomposer.groups.v1";function io(){try{return globalThis.localStorage??null}catch{return null}}function nd(e=io(),t=td){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&a.set(r,i);return a}catch{return new Map}}function tg(e,t,n,a=td){let r=nd(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function ng(e,t=io()){return nd(t).get(e.id)??e.open===!0}function ag(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",d.id);for(let u of e.controls)d.append(n(u,t));return r.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";tg(io(),e.id,u),xi(a,u);let c=t(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(r,d),ad(a,e),xi(a,ng(e)),rd(a,e),a}function xi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function ad(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function rd(e,t){ad(e,t)&&xi(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var ua="application/x-nc-pad",zs="http://www.w3.org/2000/svg";function rg(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),d=0,u=0;for(let p=s;p<l;p++)d=Math.min(d,e[2*p]??0),u=Math.max(u,e[2*p+1]??0);let c=n===1?50:i/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function ig(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>a.append(og(n,i,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Ea(n)}),od(n,e),n}function og(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(zs,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(zs,"path");return d.append(u),a.append(r,i,s,l,d),lg(e,a,t,n),i.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&id(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(ua,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(ua)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(ua)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=c.dataTransfer?.getData(ua);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let m=Number(f);m!==t&&p.onMove?.(m,t,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,g))}),a}function sg(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function lg(e,t,n,a){let r=0,i=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;i=!1,s=u.clientX,l=u.clientY,d();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=Ds(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,d);t.addEventListener("contextmenu",u=>{u.preventDefault(),d(),i=Ds(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}sg(e,n,a)})}function Ds(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;Ea(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Ea(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of i){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Ea(e);let f=a(e);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?id(e,t,n,a):f.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let d=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function id(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let p=i.value.trim();i.remove(),t.focus();let f=a(e);c&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};i.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),i.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])i.addEventListener(c,p=>p.stopPropagation());e.append(i),i.focus(),i.select()}function Ea(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function od(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),d=i.querySelector(".nc-padgrid-pad-wave path"),u=i.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),d?.setAttribute("d",rg(a.peaks))),!a.empty&&a.hint?i.dataset.hint="true":delete i.dataset.hint,a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let c=t.selected===r;c?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",c?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function Me(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function sr(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function Rs(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Vn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var cg=450,Os=8;function Ve(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function dg(e){let t=jf(e,"target-min");return t>0?t:44}function ug(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=dg(e),a=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,p=d+a,f=u-a,g=u+a;for(let m=0;m<t.length;m++){if(i===m)continue;let v=r[m];if(!v||v.width===0)continue;let h=v.left+v.width/2,y=v.top+v.height/2;Math.abs(y-u)<a*2&&(h>d?p=Math.min(p,(d+h)/2):h<d&&(c=Math.max(c,(d+h)/2))),Math.abs(h-d)<a*2&&(y>u?g=Math.min(g,(u+y)/2):y<u&&(f=Math.max(f,(u+y)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function sd(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Bs(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function zt(e,t){switch(e.type){case"slider":return pg(e,t);case"select":return fg(e,t);case"toggle":return mg(e,t);case"button":return gg(e,t);case"readout":return bg(e);case"label":return xg(e);case"note":return js(e);case"knob":return Eg(e,t);case"choice":return Sg(e,t);case"slotRow":return Ag(e,t);case"stepGrid":return Cg(e,t);case"canvas":return Pg(e);case"fx":return Vg(e,t);case"eqGraph":return vm(e,t);case"levelSteps":return Rm(e,t);case"group":return ag(e,t,zt);case"strip":return zg(e,t);case"stripAdd":return Bg(e,t);case"padGrid":return ig(e,t);case"moves":return vg(e,t);default:return js({id:"unknown",text:""})}}function De(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,dd(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(ld(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??Vn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Rs(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Rs(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&vt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&kg(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Vn(t.value))}else if(t.type==="choice")ud(e,t);else if(t.type==="slotRow")hd(e,t);else if(t.type==="stepGrid")$i(e,t);else if(t.type==="padGrid")od(e,t);else if(t.type==="moves")cd(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Oc(n,t)}else if(t.type==="eqGraph")qc(e,t);else if(t.type==="levelSteps")Yc(e,t);else if(t.type==="strip"){bd(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Dt(n.id)}"]`);a instanceof Element&&De(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")md(e,t);else if(t.type==="group"){rd(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Dt(n.id)}"]`);a instanceof Element&&De(a,n)}}else if(t.type==="fx"){Ad(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Dt(n.id)}"]`);a instanceof Element&&De(a,n)}}}}function pg(e,t){let n=sr(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=or(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(ld(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>r?li(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&a.addEventListener("keydown",l=>{let d=t(a);if(d?.type!=="slider"||a.disabled)return;let u=d.taper??e.taper,c=Rc(u,d.min,d.max,d.value,l.key,l.shiftKey,d.step);c!==null&&(l.preventDefault(),a.value=String(Zi(u,d.min,d.max,c)),d.onChange(c),d.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(hg(e,a,t),s),n.append(Me()),De(n,e),n}function ld(e){return or(e.taper,e.min,e.max)?Zi(e.taper,e.min,e.max,e.value):e.value}function hg(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ve());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),a}function fg(e,t){let n=sr(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,Me()),n}function mg(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(Me()),De(n,e),n}function gg(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Me()),De(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=sd(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&fd(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function bg(e){let t=sr(e.id,e.label);return t.append(Me()),De(t,e),t}var yg=450;function vg(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(wg(l.icon)),d.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}r.append(i,s),n.append(r)}return cd(n,e),n}function cd(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Dt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function wg(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function xg(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Me()),t}function js(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Me()),t}function qs(e){if(typeof e.valueText=="string")return e.valueText;let t=Vn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function dd(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function kg(e,t){let n=qa(t.taper,t.min,t.max,t.value);dd(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(qa(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,r))),e.style.setProperty("--knob-to",String(Math.max(a,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",qs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${qs(t)}`}function $g(e,t){if(or(e.taper,e.min,e.max))return Rc(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Eg(e,t){let n=sr(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let i=0,s=0;a.addEventListener("pointerdown",u=>{i=u.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(or(c.taper,c.min,c.max)){let g=qa(c.taper,c.min,c.max,s)-(u.clientY-i)/120;c.onChange(zc(c.taper,c.min,c.max,g));return}let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(u.clientY-i)*p/120));c.onChange(f)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let c=t(a);if(c?.type!=="knob")return;let p=$g(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Me()),De(n,e),n}function Sg(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")d=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(i.key==="Home")d=0;else if(i.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(i.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(Me()),ud(n,e),n}function ud(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Ag(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,Ve()),Mg(f,g,n,c,t),a.append(f)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=sd(),r.append(Ve()),r.addEventListener("click",()=>{fd(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",i.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...r?[r]:[]),n.append(u,i,Me()),pd(n,t),hd(n,e),n}function _s(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;Ln(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,i)}function Mg(e,t,n,a,r){let i=0,s=0,l=0,d=!1,u=!1,c=!1,p=!1,f=()=>{window.clearTimeout(i),i=0},g=y=>{let x=y.clientX-s,b=y.clientY-l;x*x+b*b>Os*Os&&(d=!0,f())},m=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",h))},v=y=>{let x=i!==0&&!d&&!u;f(),m(),x&&(c=!0,_s(n,a,r,y))},h=()=>{d=!0,f(),m()};e.addEventListener("pointerdown",y=>{y.button===0&&(m(),u=!1,d=!1,c=!1,s=y.clientX,l=y.clientY,f(),i=window.setTimeout(()=>{i=0,!d&&(u=!0,Tg(n,t,a,r))},cg),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(c||u||d){c=!1,u=!1,d=!1;return}_s(n,a,r,y)})}function pd(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Vs("Save","store"),r=Vs("Clear","clear");n.append(a,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ln(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Ln(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Ln(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ln(e)})}function Vs(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Tg(e,t,n,a){pd(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Ln(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function hd(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function fd(e){let t=e.dataset.ncLastFill||null,n=Sf(t);e.dataset.ncLastFill=n;let a=Af(n);if(a)for(let[r,i]of Object.entries(a))e.style.setProperty(r,i)}function Lg(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function Cg(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=h=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=h,a.append(y),y},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let y of[i,s]){let x=y===h;y.setAttribute("aria-checked",x?"true":"false"),y.tabIndex=x?0:-1}};l(i);for(let h of[i,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let y=s.getAttribute("aria-checked")==="true"?i:s;l(y),y.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),e.onFill&&d.append(Lg(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.onClear?.()}),d.append(h)}n.append(d);for(let h of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=h.label,x.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(x.dataset.ncLane=String((h.lane-1)%4+1));let b=!1,A=0;x.addEventListener("pointerdown",k=>{b=!1,!(k.pointerType==="mouse"||k.button!==0)&&(A=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(b=!0,M.onSelectRow?.(M.rows.findIndex(S=>S.id===h.id),!0))},yg))});for(let k of["pointerup","pointercancel","pointerleave"])x.addEventListener(k,()=>window.clearTimeout(A));x.addEventListener("contextmenu",k=>{b&&k.preventDefault()}),x.addEventListener("click",k=>{let M=t(n);if(M?.type!=="stepGrid")return;if(b){b=!1;return}let S=M.rows.findIndex(N=>N.id===h.id),L=!!M.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);M.onSelectRow?.(S,L)}),x.addEventListener("keydown",k=>Ng(n,x,k));let T=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let S=document.createElement("button");S.type="button",S.className="nc-ms",S.dataset.ncMs=k,S.textContent=k==="mute"?"M":"S",S.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${h.label}`),M.append(S,Ve()),M.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let N=L.rows.findIndex(j=>j.id===h.id);(k==="mute"?L.onMute:L.onSolo)?.(N)}),T.push(M)}let w=document.createElement("div");w.className="nc-steps";for(let k=0;k<h.steps.length;k++){let M=document.createElement("span");M.className="nc-step-wrap";let S=document.createElement("button");S.type="button",S.className="nc-step",S.dataset.ncStep=`${h.id}:${k}`,S.setAttribute("aria-label",`${h.label} step ${k+1}`),M.append(S,Ve()),M.addEventListener("click",L=>{let N=t(n);if(N?.type!=="stepGrid")return;let j=N.rows.findIndex(K=>K.id===h.id),_=s.getAttribute("aria-checked")==="true";N.onToggle(j,k,L.shiftKey||_)}),w.append(M)}if(e.onLength&&w.append(Ig(n,w,h,t)),y.append(...T,x,w),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=h.id,k.setAttribute("aria-label",`Re-roll ${h.label}`),k.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Bs(),k.append(Ve()),k.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(S=>S.id===h.id))}),y.append(k)}y.addEventListener("click",k=>{if(k.target!==y)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(S=>S.id===h.id))}),Hs(n,w,".nc-step-wrap",t,s,()=>h.id),n.append(y)}let u=document.createElement("div");u.className="nc-pads-head";let c=(h,y,x)=>{let b=document.createElement("button");return b.type="button",b.className=h,b.textContent=y,x&&b.setAttribute("aria-label",x),b},p=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",$i(n,h))}));for(let[h,y]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let b=x.rows.length;x.onSelectRow?.(((pa(x)+y)%b+b)%b)});if(u.append(p,g,f),e.onDice){let h=c("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Bs(),h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid")return;let x=pa(y);x>=0&&y.onDice?.(x)}),u.append(h)}if(e.transport){let h=c("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let y=t(n);y?.type==="stepGrid"&&y.transport?.onToggle()}),u.append(h)}n.append(u);let m=document.createElement("div");m.className="nc-pads",m.setAttribute("role","group");let v=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<v;h++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(h),y.textContent=String(h+1),y.addEventListener("click",x=>{let b=t(n);if(b?.type!=="stepGrid")return;let A=pa(b);if(A<0)return;if(n.dataset.ncLenMode==="true"){b.onLength?.(A,h+1);return}let T=s.getAttribute("aria-checked")==="true";b.onToggle(A,h,x.shiftKey||T)}),m.append(y)}return Hs(n,m,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[pa(h)]?.id:void 0}),n.append(m),n.append(Me()),$i(n,e),n}function pa(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Hs(e,t,n,a,r,i){let s="on",l=!0,d=-1,u=(c,p)=>{let f=c.rows[d]?.steps[p];!f||p>=c.rows[d].length||(c.onSet?c.onSet(d,p,s,l):!!f[s]!==l&&c.onToggle(d,p,s==="accent"))};eg(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=p.rows.findIndex(g=>g.id===i());f>=0&&p.rows[f].length!==c.pad+1&&p.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=i();d=p.rows.findIndex(m=>m.id===f);let g=p.rows[d]?.steps[c.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}u(p,c.pad)}else if(c.kind==="long"){let f=i(),g=p.rows.findIndex(v=>v.id===f),m=t.querySelectorAll(n)[c.pad];g>=0&&m instanceof HTMLElement&&p.onLongPress?.(g,c.pad,m)}}})}function Ng(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=a.length-1;let s=a[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Ig(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(Ve());let i=u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(m=>m.id===n.id),f=c.rows[p];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,u));g!==f.length&&c.onLength?.(p,g)},s=u=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((f,g)=>{let m=f.getBoundingClientRect();m.width>0&&u>=m.left+m.width/2&&(p=g+1)}),p},l=u=>i(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(g=>g.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};u.key in f&&(u.preventDefault(),i(f[u.key]))}),r}var Or=new WeakMap,ha=new WeakMap;function Fg(e){return e?(ha.has(e)||(ha.set(e,ja(e)),Sc(t=>{ha.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ki(n,Number(n.getAttribute("data-nc-velocity")))},e)),ha.get(e)):"light"}function ki(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Fg(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(Or.has(e)&&Or.get(e)===r)){if(Or.set(e,r),n===null){for(let i of Object.keys(ws(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(ws(n,vs[a]??vs.light)))e.style.setProperty(i,s)}}function $i(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&i&&(d.setAttribute("aria-label",`Re-roll ${i.label}`),d.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let f=t.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let c=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),g=i.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=i.length,l&&f>=i.length?p.dataset.out="true":delete p.dataset.out,l&&f===i.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${i.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,ki(p,g?.velocity),t.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let g=0;g<c.steps.length;g++){let m=c.steps[g],v=e.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(v instanceof HTMLButtonElement))continue;let h=v.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;let b=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);b?h.dataset.picked="true":delete h.dataset.picked;let A=h.querySelector(".nc-name");A instanceof HTMLElement&&(A.setAttribute("aria-pressed",t.selectedRow===c.id||b?"true":"false"),A.textContent!==c.label&&(A.textContent=c.label,A.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(let T of h.querySelectorAll("[data-nc-ms]")){let w=T.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;T.setAttribute("aria-pressed",w?"true":"false")}}v.setAttribute("aria-pressed",m.on?"true":"false"),m.accent?v.dataset.accent="true":delete v.dataset.accent,m.dim?v.dataset.dim="true":delete v.dataset.dim,g%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof m.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,m.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),ki(v,m.velocity);let y=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;g===y?v.dataset.playhead="true":delete v.dataset.playhead;let x=!!t.onLength&&t.selectedRow===c.id;v.hidden=g>=c.length&&!x,g>=c.length&&x?v.dataset.out="true":delete v.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),f=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let g=document.activeElement===p;f.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Pg(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,Me()),t}function zg(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=xd(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let b=document.createElement("span");b.className="nc-strip-grip-dots",b.setAttribute("aria-hidden","true"),l.append(b),l.addEventListener("keydown",A=>{if(A.key!=="ArrowLeft"&&A.key!=="ArrowRight"||A.ctrlKey||A.metaKey||A.shiftKey)return;let T=t(n);T?.type==="strip"&&(A.preventDefault(),T.onMove?.(A.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Gs(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",b=>{b.pointerType==="touch"||b.pointerType==="pen"||b.target instanceof Element&&b.target.closest("input, .nc-strip-remove")||(b.preventDefault(),Gs(n,a,t,{x:b.clientX,y:b.clientY}))}),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onRemove?.(b)}),a.append(b)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks",A.dataset.ncHacks="",b.append(A,Ve()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onHacks?.()}),d.append(b)}let u=document.createElement("div");if(u.className="nc-strip-ms",e.onSendsView){let b=document.createElement("span");b.className="nc-hacks-wrap nc-sends-view-wrap";let A=document.createElement("button");A.type="button",A.className="nc-hacks nc-sends-view",A.dataset.ncSendsView="",b.append(A,Ve()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onSendsView?.()}),u.append(b)}for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=b,T.textContent=b==="mute"?"M":"S",A.append(T,Ve()),A.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&(b==="mute"?w.onMute:w.onSolo)?.()}),u.append(A)}let c=document.createElement("div");c.className="nc-strip-sends";for(let b of e.sends??[])c.append(zt({...b,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(zt(oo(e),t));let f=document.createElement("div");f.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let A=document.createElement("span");A.className="nc-scale-tick",A.style.setProperty("--tick-pos",String(b.value)),A.textContent=b.label,g.append(A)}let m=Kf({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let A=t(n);A?.type==="strip"&&A.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&Ws(b)}}),v=em({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(f.append(g,m.el,v.el),i){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let A=document.createElement("span");A.className="nc-strip-fold-cap",A.setAttribute("aria-hidden","true");let T=document.createElement("span");T.className="nc-ui-fx-fold-name",T.dataset.ncStripFoldName="";let w=document.createElement("span");w.className="nc-strip-fold-pan",w.setAttribute("aria-hidden","true"),w.hidden=!e.pan,b.append(A,w,T),b.addEventListener("click",()=>{let k=t(n);if(k?.type!=="strip")return;k.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),f.prepend(b)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let y=0;h.addEventListener("click",b=>{let A=t(n);A?.type!=="strip"||!A.onTypeIn||(window.clearTimeout(y),b.detail===0?Us(n,h,t):b.detail===1&&(y=window.setTimeout(()=>Us(n,h,t),Og)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(y);let b=t(n);b?.type==="strip"&&Ws(b)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(zt(so(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,x,d,u,c,p,f,h,Me()),bd(n,e),n}function oo(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Rg(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function so(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??Dg(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function Dg(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Rg(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Og=250;function Us(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??Vn(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let d=r.value;if(r.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(d)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Bg(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;gd(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,Me()),md(n,e),n}function md(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(a.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),gd(a))}function gd(e){let t=e.options[0];t&&(t.selected=!0)}function Ws(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bd(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?Yf(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Pc(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let m=t.valueText??Vn(t.value);s.textContent!==m&&(s.textContent=m),s.setAttribute("aria-label",`${t.label} level ${m}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let m of e.querySelectorAll("[data-nc-ms]")){let v=m.getAttribute("data-nc-ms"),h=v==="mute"?t.mute===!0:t.solo===!0;m.setAttribute("aria-pressed",h?"true":"false"),m.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let m=t.hacksLabel??"Hacks";l.textContent!==m&&(l.textContent=m),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${m}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let m=t.sendsViewLabel??"Sends";d.textContent!==m&&(d.textContent=m),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${m}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),vt(d,t.sendsViewHelp)}let u=e.querySelector("[data-nc-strip-grip]");u instanceof HTMLElement&&(u.setAttribute("aria-label",`Move ${t.label}`),u.title=t.moveHelp??"Drag to move this channel");let c=yd(t);if(c?e.dataset.ncShade=String(c):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let m=e.querySelector(`.nc-strip-trim [data-nc-id="${Dt(t.trim.id)}"]`);m&&De(m,so(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let m=e.querySelector(`.nc-strip-pan [data-nc-id="${Dt(t.pan.id)}"]`);m&&De(m,oo(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(kd(f,p,t.label),vt(f,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!p,g.setAttribute("aria-label",`Expand ${t.label}`);let m=g.querySelector("[data-nc-strip-fold-name]");m&&m.textContent!==t.label&&(m.textContent=t.label),vt(g,t.foldedHelp??t.foldHelp)}}function yd(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=vd?t:0}var vd=8,fa=null;function Gs(e,t,n,a){fa?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let d=i.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let u=i.createElement("div");u.className="nc-strip-menu-shades",u.setAttribute("role","radiogroup"),u.setAttribute("aria-labelledby",d.id);let c=yd(r),p=e.querySelector("[data-nc-strip-grip]")??t,f=(y=!1)=>{if(fa!==f)return;fa=null;let x=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",m,!0),i.removeEventListener("pointerdown",v,!0),s.removeEventListener("resize",h),(y||x)&&p?.isConnected&&p.focus?.({preventScroll:!0})},g=[0,...Array.from({length:vd},(y,x)=>x+1)].map(y=>{let x=i.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",y===c?"true":"false"),x.setAttribute("tabindex",y===c?"0":"-1"),x.dataset.ncShadeChoice=String(y),y===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(y),x.setAttribute("aria-label",`Shade ${y}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),x.addEventListener("click",()=>{let b=n(e);f(!0),b?.type==="strip"&&b.onShade?.(y===0?null:y)}),x});if(u.append(...g),u.addEventListener("keydown",y=>{let x=g.indexOf(i.activeElement);if(x<0)return;let b=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?b=(x+1)%g.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?b=(x-1+g.length)%g.length:y.key==="Home"?b=0:y.key==="End"&&(b=g.length-1),!(b<0)&&(y.preventDefault(),g[x].setAttribute("tabindex","-1"),g[b].setAttribute("tabindex","0"),g[b].focus())}),l.append(d,u),typeof r.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(b=>b.classList?.contains("nc-strip")&&!b.hasAttribute("data-nc-master")),x=y.indexOf(e);for(let[b,A,T]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let w=i.createElement("button");w.type="button",w.className="nc-strip-menu-item",w.dataset.ncStripMove=b<0?"left":"right";let k=i.createElement("span");k.textContent=A;let M=i.createElement("kbd");M.textContent=T,M.setAttribute("aria-hidden","true"),w.append(k,M),w.disabled=b<0?x<=0:x<0||x>=y.length-1,w.addEventListener("click",()=>{let S=n(e);f(!0),S?.type==="strip"&&S.onMove?.(b)}),l.append(w)}}i.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},x=l.offsetWidth,b=l.offsetHeight,A=s.innerWidth||i.documentElement.clientWidth||x,T=s.innerHeight||i.documentElement.clientHeight||b,w=a?a.x:y.right-x,k=a?a.y:y.bottom+4;w=Math.max(4,Math.min(w,A-x-4)),k+b>T-4&&(k=Math.max(4,(a?a.y:y.top)-b-4)),l.style.left=`${Math.round(w)}px`,l.style.top=`${Math.round(k)}px`})();let m=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),f(!0);else if(y.key==="Tab"&&l.contains(i.activeElement)){let x=[...l.querySelectorAll("button:not([disabled])")].filter(A=>A.getAttribute("tabindex")!=="-1"),b=(x.indexOf(i.activeElement)+(y.shiftKey?-1:1)+x.length)%x.length;y.preventDefault(),x[b]?.focus()}},v=y=>{l.contains(y.target)||f(!1)},h=()=>f(!1);return i.addEventListener("keydown",m,!0),i.addEventListener("pointerdown",v,!0),s.addEventListener("resize",h),fa=f,(g.find(y=>y.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}function Ks(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Dt(t)}"]`);return Pc(n?.querySelector(".nc-meter")??void 0)}var Ei=typeof ResizeObserver=="function"?new ResizeObserver(jg):null;function jg(e){for(let t of e){if(!t.target.isConnected){Ei.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&qg(n)}}function qg(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+i}px`)}function _g(e){if(Ei)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ei.observe(t)}function Vg(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Ua(e)&&!i&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(Ed(n,"head")),e.on!==void 0){let d=Ji({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(d.el);c?.type==="fx"&&c.onToggle?.(u)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}r&&l.append(Ug(n,t)),Ua(e)&&l.append(Yg(n,t)),s&&l.append(Xg(t)),n.append(l)}r&&n.prepend(Wg(n,t)),i&&Sd(n,e);for(let l of e.controls)n.append(zt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let u of e.more)l.append(zt(u,t));n.append(l)}return n.append(Me()),Ad(n,e),_g(n),n}var Hg=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function wd(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&Hg(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function Ug(e,t){let n=xd();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),wd(e))}),n}function xd(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function kd(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Wg(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ed(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),wd(e)}}),n}var dn=new Set;function Sa(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Ua=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Gg="(max-width: 768px)";function Kg(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Yg(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Kg()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&($d(e,a,!dn.has(a.id)),n.focus())}),n}function Xg(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function $d(e,t,n){n?dn.add(t.id):dn.delete(t.id),lo(e,t)}function Jg(e,t){t?.type==="fx"&&dn.has(t.id)&&$d(e,t,!1)}function Qg(e){return e.ownerDocument.defaultView?.matchMedia?.(Gg).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function lo(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Ua(t)&&dn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Ua(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Sa(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&cn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",vt(n,t.maxHelp)),!a){e.dataset.ncMax&&Ys(e);return}if(!e.isConnected){let s=()=>e.isConnected&&dn.has(t.id)&&lo(e,t);queueMicrotask(()=>{e.isConnected?s():Sa(e.ownerDocument,s)});return}let r=Qg(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&Ys(e),e.dataset.ncMax=r,r==="over"&&Zg(e,t)),eb(e.ownerDocument),r==="over"&&co(e),Sa(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&cn(s)})}function Ys(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Sa(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&cn(n)})}function Zg(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function co(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=ym(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Xs=new WeakSet;function eb(e){Xs.has(e)||(Xs.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&co(t)}))}var Si=new WeakMap;function Ed(e,t){let n=Km(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Sd(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)vt(r,t.meterHelp);let a=Si.get(e);a?a.set(t.meter):Si.set(e,Qm(n,t.meter))}function Ad(e,t){(t.meter||Si.has(e))&&Sd(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(kd(i,r,t.title),vt(i,t.foldHelp)),lo(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let u=l.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=d,u.hidden=d==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),vt(l,t.foldHelp)}}function vt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Dt(e){return e.replace(/["\\]/g,"\\$&")}function tb(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&Oc(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&cn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&co(n);ug(e)}var nb=bt["toast-duration"];function ab({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function rb(e,t,n,a){let r=l=>({top:l,bottom:l+n}),i=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=r(t-a-n);return i(s)?i(r(a))?"bottom":"top":"bottom"}function ib(e,t,n,a,r,i){let s=e.bottom+r,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,d=!0)}return{top:s,left:l}}var Js="data-nc-ui-toast-live";function ob(e,t){let n=t.querySelector(`[${Js}]`);return n||(n=e.createElement("div"),n.setAttribute(Js,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Qt({message:e,actionLabel:t,onAction:n,duration:a=nb,onClose:r,avoid:i=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let f=null;t&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,c.appendChild(f)),l.appendChild(c);let g="open",m=re=>re&&typeof re.getBoundingClientRect=="function"?re.getBoundingClientRect():null,v=m(c),h=v?.height||44,y=u.getComputedStyle?.(c),x=Number.parseFloat(y?.getPropertyValue(ae("toast-offset")))||16,b=Number.parseFloat(y?.getPropertyValue(ae("toast-anchor-gap")))||8,A=m(s),T=u.innerHeight??0,w=i.map(m).filter(Boolean),k=A&&A.bottom>0&&A.top<T?ib(A,w,{width:v?.width||0,height:h},u.innerWidth??0,b,x):null;k&&k.top+h<=T?(c.setAttribute("data-placement","anchor"),c.style.top=`${k.top+(u.scrollY??0)}px`,c.style.left=`${k.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",rb(w,T,h,x));let M=u.requestAnimationFrame?.bind(u)??(re=>setTimeout(re,16));M(()=>M(()=>{g==="open"&&c.setAttribute("data-state","open")})),ob(d,l).textContent=ab({message:e,actionLabel:t});let S,L,N=new Promise(re=>{L=re}),j=re=>{clearTimeout(S),S=setTimeout(()=>se("timeout"),re)},_=a,K=Date.now(),pe=()=>{g==="open"&&(clearTimeout(S),_=Math.max(0,_-(Date.now()-K)))},ge=()=>{g==="open"&&(K=Date.now(),j(_))};c.addEventListener("pointerenter",pe),c.addEventListener("pointerleave",ge),c.addEventListener("focusin",pe),c.addEventListener("focusout",ge),f?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{se("action")}}),Number.isFinite(a)&&j(a);function se(re="close"){if(g!=="open")return;g="closing",clearTimeout(S),c.setAttribute("data-state","closing"),r?.(re);let G=u.getComputedStyle?.(c),jt=G?Math.max(0,...String(G.transitionDuration||"").split(",").map(Et=>Number.parseFloat(Et)*(Et.trim().endsWith("ms")?1:1e3)||0)):0,$t=()=>{g!=="gone"&&(g="gone",c.remove(),L(re))};c.addEventListener("transitionend",$t),setTimeout($t,jt+50)}return{el:c,close:se,closed:N}}var Qs="data-nc-help";function sb(e,t,n,a=0,r=6,i=8){let s=e.top-r-t.height,l=s>=a+i?"above":"below",d=l==="above"?s:e.bottom+r,u=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(d),left:Math.round(u),side:l}}var Br=new WeakMap;function lb(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function cb({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Br.get(e);if(n)return n;let a=e.defaultView,r=null,i=null,s,l=!1,d,u=()=>{clearTimeout(s),clearTimeout(d),i=null,l=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},c=(m,v)=>{let h=v??m.getAttribute(Qs);if(!h)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=h,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let y=m.getBoundingClientRect(),x=sb(y,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,lb(e));return r.style.top=`${x.top}px`,r.style.left=`${x.left}px`,r.dataset.side=x.side,r.style.visibility="",!0},p=m=>{if(l||m.pointerType==="touch")return;let v=m.target&&m.target.closest?m.target.closest(`[${Qs}]`):null;v!==i&&(u(),v&&(i=v,s=setTimeout(()=>{i===v&&v.isConnected&&c(v)},t)))},f=m=>{(l||m.key==="Escape")&&u()};e.addEventListener("pointerover",p),e.addEventListener("pointerdown",u,!0),e.addEventListener("keydown",f),a.addEventListener("scroll",u,!0),a.addEventListener("blur",u);let g={hide:u,pin(m,v,{ms:h=0}={}){return u(),!m||!m.isConnected||!c(m,v)?!1:(l=!0,r.dataset.pinned="",h>0&&(d=setTimeout(u,h)),!0)},uninstall(){u(),e.removeEventListener("pointerover",p),e.removeEventListener("pointerdown",u,!0),e.removeEventListener("keydown",f),a.removeEventListener("scroll",u,!0),a.removeEventListener("blur",u),r?.remove(),r=null,Br.delete(e)}};return Br.set(e,g),g}var Md="(max-width: 768px)",db='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',ub='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',pb=0;function hb({panel:e,button:t,label:n="Menu",media:a=Md}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++pb}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=db),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function d(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(ub)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:h}={}){if(!l())return;let y=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(h??y)&&s.focus?.({preventScroll:!0})}function c(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),u({focus:!0}))}function p(h){let y=h.target;y instanceof i.Node&&(e.contains(y)||s.contains(y))||u({focus:!1})}let f=()=>l()?u({focus:!0}):d(),g=h=>{let y=h.target,x=y instanceof i.Element?y.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",g);let m=i.matchMedia?.(a),v=()=>{m?.matches||u({focus:!1})};return m?.addEventListener?.("change",v),{button:s,panel:e,open:d,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",g),m?.removeEventListener?.("change",v)}}}var uo="netcomposer.rhythm.hidden.v1",Qe=new WeakMap;function jr(){try{return globalThis.localStorage??null}catch{return null}}function Td(e,t=uo){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Zs(e,t,n,a=uo){let r=Td(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function po(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)a(i)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(oo(r)),r.trim&&n.push(so(r)));return n}function Ld(e,t){if(!(!e||!t))return po(e).find(n=>n.id===t)}function fb(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${po(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function mb(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Cd(e,t)}function Cd(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function gb(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Qe.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ld(n,a)}function bb(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=fb(t);if(e.dataset.ncSignature===r){for(let i of a){let s=e.querySelector(`[data-nc-section="${tl(i.id)}"]`);s&&Cd(s,i);for(let l of i.controls){let d=e.querySelector(`[data-nc-id="${tl(l.id)}"]`);d instanceof Element&&De(d,l)}s instanceof HTMLElement&&Ai(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),mb(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let d of i.controls)l.append(zt(d,gb));e.append(s),Ai(s,i,n)}}function Nd(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var yb="(max-width: 768px)",Id=new WeakMap;function el(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function vb(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=el("prev"),i=el("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,i,l);let d=(u,c)=>{let p=Id.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Nd(f,p.pageSize,(t.pages.get(p.id)??0)+u);t.pages.set(p.id,g),p.onPage?.(g),Ai(e,{...p,page:g},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>d(-1,r)),i.addEventListener("click",()=>d(1,i)),e.prepend(a),a}function Ai(e,t,n){Id.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=Nd(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(yb).matches===!0,d=e.closest(".nc-module");a.forEach((h,y)=>{let x=Math.floor(y/r)!==s;if(x?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,x&&!l){let b=d instanceof HTMLElement?Qe.get(d):void 0;Jg(h,Ld(b,h.dataset.ncId))}});let u=vb(e,n),c=u.querySelector('[data-nc-fx-page="prev"]'),p=u.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===i-1?"true":"false");let f=u.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${i}`;f.textContent!==g&&(f.textContent=g);let m=u.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${s+1} of ${i}`;m.textContent!==v&&(m.textContent=v)}function tl(e){return e.replace(/["\\]/g,"\\$&")}function wb(e,t=uo){Lc();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Td(jr(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Ji({labelledBy:i.id,onChange:x=>(Qe.get(n)??e).onToggle?.(x)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(i,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",n.append(m,r,p,f),n.setAttribute("aria-labelledby",i.id);let v=x=>{let b=Qe.get(n)??e;n.dataset.ncOpen=x?"false":"true",p.hidden=x,f.hidden=!x,l.textContent=x?"+":"−",l.setAttribute("aria-expanded",x?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${x?"Show":"Hide"} ${b.title}`),l.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";Zs(jr(),(Qe.get(n)??e).id,x,t),v(x),Mi(n.parentElement)}),f.addEventListener("click",()=>{Zs(jr(),(Qe.get(n)??e).id,!1,t),v(!1),Mi(n.parentElement)});let h={pages:new Map,redraw:()=>y.redraw()},y={el:n,update(x){Qe.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=x.title,c.textContent=x.status??"",x.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=x.summary??x.title,u.el.hidden=x.on===void 0,u.set(x.on===!0),x.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${x.title}`),bb(p,x,h),v(p.hidden),y.redraw()},redraw(){let x=Qe.get(n);x&&tb(n,po(x))}};return Qe.set(n,e),v(a),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(n),Sc(()=>y.redraw(),n.ownerDocument),y}function xb(e,t,n="adjacent"){Lc(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Mi(e)}function Mi(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?o("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ho="netcomposer.studio.instances.v1",nl="netcomposer.studio.types-seen.v1",kb=["petra-rhythm","olive-bass"];function Fd(e,t){return t===1?e:`${e}#${t}`}function fo(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function $b(e,t){return t===1?e.name:`${e.name} ${t}`}function fn(e,t,n){const a=$b(e,t),r=zd(n,a);return{id:Fd(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const Pd=20;function zd(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Pd).join("").trim()||t}function Eb(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const i=a.find(s=>s.id===r.type);return i?fn(i,r.n,n):r})}function Sb(e,t,n){const a=new URLSearchParams({instance:String(e.n)});return t&&a.set("measure",""),n&&a.set("b",n),`${e.src}?${a.toString().replace(/=(&|$)/g,"$1")}`}function Ab(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return fn(t,a)}function Hn(e){return e.filter(t=>t.available!==!1).map(t=>fn(t,1))}function Mb(e,t){if(!Array.isArray(e))return Hn(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,i=typeof a=="string"?a:r?.id;if(typeof i!="string")continue;const s=fo(i),l=s&&t.find(d=>d.id===s.type&&d.available!==!1);!s||!l||n.some(d=>d.id===i)||n.push(fn(l,s.n,r?.name))}return n.length>0||e.length===0?n:Hn(t)}function mo(){try{return globalThis.localStorage??null}catch{return null}}function Tb(e,t=mo()){try{const n=t?.getItem(ho);return n?Mb(JSON.parse(n),e):Hn(e)}catch{return Hn(e)}}function Lb(e,t,n=mo()){let a=kb;try{const s=JSON.parse(n?.getItem(nl)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const i=[...e];for(const s of r)i.some(l=>l.type===s.id)||i.push(fn(s,1));try{n?.setItem(nl,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return i.length!==e.length&&mn(i,n),i}function Cb(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function mn(e,t=mo()){try{t?.setItem(ho,JSON.stringify(Cb(e)))}catch{}}function Nb(e){const t=/^commit: ([0-9a-f]{7,40})\b/m.exec(e);return t?t[1].slice(0,12):null}function Ib(e,t=1500){const n=new Map;return a=>{let r=n.get(a);if(!r){const i=e(`${a}BUILD.txt`,{cache:"no-cache"}).then(s=>s.ok?s.text():"").then(Nb,()=>null);r=Promise.race([i,new Promise(s=>setTimeout(()=>s(null),t))]),n.set(a,r)}return r}}function Fb(e,t){const n=new Map;return(a,r)=>{const i=fo(a),s=i?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?i?.n:void 0,d=e().filter(c=>c.instance.type===s);let u;if(l!==void 0&&Number.isInteger(l)&&l>=1)u=d.find(c=>c.instance.n===l);else{const c=d.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});u=c.find(p=>p.readyState?.()!=="complete")??c[0]??d[0]}if(!u){if(t.some(p=>p.id===s))return null;const c=l!==void 0?Fd(s,l):a;return{id:c,name:c}}return n.set(u.instance.id,u.window()),{id:u.instance.id,name:u.instance.name}}}const Aa="netcomposer.studio.pending-presets.v1",Pb=3e3,zb=6e4;function al(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Db(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function Rb(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Aa)??"{}"),l={};if(s&&typeof s=="object")for(const[d,u]of Object.entries(s))al(u)&&(l[d]=u);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Aa,JSON.stringify(s)):l.removeItem(Aa)}catch{}},i=async(s,l)=>{const d=a(),u=d[s];if(!u)return;delete d[s],r(d);let c=u.format===l.format;if(c)try{await l.set(u.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),i(s,l))},provided:()=>[...t.keys()],async collect(s,l=Pb){const d={};return await Promise.all(s.map(async u=>{const c=t.get(u);if(!c)return;const p=await Db(Promise.resolve().then(()=>c.get()),l);p!=null&&(d[u]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),d},stash(s){const l={};for(const[d,u]of Object.entries(s))al(u)&&(l[d]=u);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function Ob(e,t){return`${e}@studio/${t}`}const Bb=1,Ae=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"},{id:"calliope",name:"Generator",src:"/calliope/",brand:"CALLIOPE",identity:"instrument-calliope",sound:!1}],go=[...Ae];function jb(e,t,n={}){const a=n.instruments??Ae;return{version:Bb,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,i){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,i):{id:r,name:a.find(v=>v.id===r)?.name??r};if(!s)return null;const l=s.id.split("#")[0],u=a.find(v=>v.id===l)?.sound===!1?e.createGain():t.attach(s.id,s.name),c=s.id,p=n.presets,f=n.share?.host(c),g=n.picker?.host(c),m=n.notes?.host(c);return{ctx:e,output:u,...n.mapper===void 0?{}:{mapper:n.mapper},instance:c,storageKey:v=>Ob(v,c),...n.legacyCopy?.()===!1?{legacyCopy:!1}:{},...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...p?{providePreset:v=>p.provide(c,v)}:{},...f?{audioReceivers:f.audioReceivers,sendAudio:f.sendAudio,onAudio:f.onAudio,reveal:f.reveal}:{},...g?{pickerTarget:g.pickerTarget}:{},...m?{notesIn:m.notesIn,notesSource:m.notesSource,notesTakeBack:m.notesTakeBack}:{},...n.clock?{clock:n.clock()}:{},...n.targets?{notesTargets:()=>n.targets?.list()??[],onNotesTargets:v=>typeof v=="function"?n.targets?.listen(v)??(()=>{}):()=>{}}:{},...n.show?{showInstance:v=>typeof v=="string"&&n.show?.(v)}:{}}}}}const rl=16,qb=30;function _b(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,rl+1):[],a=t.until;if(n.length<1||n.length>rl||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,d)=>d>0&&l<=n[d-1]))return null;const r=n[0],i=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=i||a-r>qb)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,d)=>s[d]===!0),until:a}}function Vb(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Hb(e,t){return t===null?e:`${t} · ${e}`}function Ub(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function Wb(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const i=t.title,s=new Map;let l=!1;const d=()=>{const c=e.now();for(const[b,A]of s)c>=A.until&&s.delete(b);const[p,f]=[...s][0]??[],g=f?Vb(f,c):null;if(!p||!g){n.hidden=!0,delete n.dataset.accent,t.title=i,l=!1;return}n.hidden=!1;const m=e.clearOf?.()??[],v=`${Ub(m.map(b=>b.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==v&&n.style.setProperty("--count-in-top",v);const h=e.labelOf(p);a.textContent!==h&&(a.textContent=h);const y=String(g.n);r.textContent!==y&&(r.textContent=y),n.toggleAttribute("data-accent",g.accent),n.setAttribute("aria-label",`${h} count-in ${y}`);const x=Hb(i,g.n);t.title!==x&&(t.title=x),requestAnimationFrame(d)},u=()=>{l||(l=!0,requestAnimationFrame(d))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const f=_b(p);f&&(s.set(c,f),u())},clear(c){s.delete(c)&&u()}}}}const Gb=1e4;function Kb(e=Gb,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const i=a;a=[];for(const s of i)s()};return{hold(){const i={};n.add(i);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(i)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(i=>a.push(i))}}}const Dd="netcomposer.studio.fx-fold.v1",Yb=["a","b","insert"],Rd={a:!0,b:!0,insert:!1};function Od(e){try{const t=e?.getItem(Dd);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const i of Yb)typeof a[i]=="boolean"&&(r[i]=a[i]);return r}catch{return{}}}function Bd(e){return{...Rd,...Od(e)}}function jd(e,t,n){const a={...Od(e),[t]:n};try{e?.setItem(Dd,JSON.stringify(a))}catch{}return{...Rd,...a}}const qd="netcomposer.studio.insert-fold.v1";function _d(e){try{const t=e?.getItem(qd),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Vd(e,t,n){const a=[..._d(e)].filter(i=>i!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(qd,JSON.stringify(r))}catch{}return new Set(r)}function Xb(e,t){return Bd(e).insert?(jd(e,"insert",!1),Vd(e,t,!0)):_d(e)}function ke(){try{return globalThis.localStorage??null}catch{return null}}const Jb={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function Hd(e,t){const n=t.fx[e],a=Fa(n);for(const r of a.chain){const i=Jb[e][r.type];n===void 0&&i&&Object.assign(r.dials,i),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const Ud="drive-1",Ti=3;function Qb(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return Nt(e.masterFx,t);const n=e.insert.on?Hd("insert",e).chain.find(a=>a.type==="drive"):void 0;return Nt({v:2,chain:n?[{id:Ud,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function Zb(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const e0={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function t0(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const ma=e=>({channels:null,reason:e,message:e0[e]});function n0(e,t){const n=new Map,a=new Map;let r=1;const i=l=>{const d=t.nodeFor(l);if(!d)return null;const u=n.get(l);if(u&&u.source===d)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const f=p.data;f.type!=="took"&&f.type!=="recorded"||(a.get(f.id)?.(f.channels,f.reason),a.delete(f.id))},d.connect(c),n.set(l,{node:c,source:d}),c},s=async(l,d,u)=>{await t.ready;const c=i(l);if(!c)return ma("no-source");if(!(u>d))return ma("empty");const p=r++;return new Promise(f=>{a.set(p,(g,m)=>f(g?{channels:g}:ma(m??"gone"))),c.port.postMessage({type:"take",id:p,from:d,to:u}),setTimeout(()=>{a.delete(p)&&f(ma("timeout"))},t0(u,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,d){if(!t.nodeFor(l))return null;const u=n.get(l)?.node??null,c=r++;let p=u;const f=m=>p?.port.postMessage(m);p?f({type:"record",id:c,from:d}):t.ready.then(()=>{p=i(l),f({type:"record",id:c,from:d})});let g=!1;return{stop(m){return g?Promise.resolve(null):(g=!0,new Promise(v=>{a.set(c,v),f({type:"record-end",id:c,to:m}),setTimeout(()=>{a.delete(c)&&v(null)},Math.max(0,(m-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){g=!0,f({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const d=t.latencyFor?.(l)??0;return Number.isFinite(d)&&d>0?Math.round(d):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>i(l)),!0):!1},take:(l,d,u)=>s(l,d,u).then(c=>c.channels),takeResult:s}}function a0(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const i=Reflect.get(n,a,r);return typeof i=="function"?i.bind(n):i}})}const te={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","transport:keep":"Saves the last minutes of the Master as a WAV, no Rec needed. It holds up to 5 min of sound; silence isn't held, so 2 min is 2 minutes of sound. K opens it.","keep:held":"How much sound Keep holds now, up to 5 min. Silence longer than 2 seconds isn't held. While the clock runs, a Keep starts on a bar line.","keep:switch":"Keeping on holds the Master's last 5 minutes of sound in this tab (about 58 MB). Off forgets it and holds nothing.","mix:sends":"The two send effects every channel feeds with its A and B knobs. The master's Sends button shows and hides them. Folded, click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to close them.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to close them.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:trim":"Trim: this channel's input gain, before its Inserts and fader, −12 to +24 dB. Bring up a quiet instrument here; double-click for 0 dB.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag (or touch and hold) to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:view":"Shows or hides the send effects, A · Reverb and B · Delay. Outlined while a channel sends to them. They keep sounding either way.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again.","load:ok":"Audio load {pct}%. Plenty of room.","load:busy":"Audio load {pct}%. Close an instrument if you hear crackles.","load:dropout":"A brief spike caused an audio dropout. Average load is {pct}%. If you hear crackles often, close an instrument.","load:over":"Audio load {pct}%. The audio is dropping out. Stop or close an instrument."},r0=[60,120,300],i0={on:!1,written:0,size:0,segments:[],lastDropped:null,bytes:0,sampleRate:48e3};function Wd(e){return Math.max(0,Math.min(e.written,e.size))}function qr(e,t){let n=null;for(const a of e){if(a.pos>t)break;n=a}return n?n.frame+(t-n.pos):null}function o0(e,t,n){for(let a=e.length-1;a>=0;a--){const r=e[a];if(r&&r.pos<=t)return{start:r.pos,end:e[a+1]?.pos??n}}return null}function s0(e,t,n){const a=Wd(e);if(a<=0)return null;const r=e.written-a;let i;if("last"in t){const u=Math.round(t.last*e.sampleRate);if(u<=0||u>a)return null;i=e.written-u}else{if(e.lastDropped!==null&&e.lastDropped>=t.since)return null;let u=null;for(let c=0;c<e.segments.length;c++){const p=e.segments[c];if(!p)continue;const f=e.segments[c+1]?.pos??e.written;if(t.since<p.frame+(f-p.pos)){u=Math.max(r,p.pos+Math.max(0,t.since-p.frame));break}}if(u===null||u>=e.written)return null;i=u}let s="exact";if(n&&n.barFrames>0){const u=qr(e.segments,i),c=o0(e.segments,i,e.written);if(u!==null&&c){const p=((u-n.origin)%n.barFrames+n.barFrames)%n.barFrames,f=i-Math.round(p),g=p===0?i:i+Math.round(n.barFrames-p);p===0?s="bar":f>=Math.max(r,c.start)&&"last"in t?(i=f,s="bar"):g<Math.min(e.written,c.end)&&(i=g,s="bar")}}const l=qr(e.segments,i)??0,d=(qr(e.segments,e.written-1)??l)+1;return{from:i,to:e.written,frame:l,endFrame:d,start:s}}function Li(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function l0(e,t,n){const a=l=>String(l).padStart(2,"0"),r=`${e.getFullYear()}-${a(e.getMonth()+1)}-${a(e.getDate())}-${a(e.getHours())}${a(e.getMinutes())}`,i=`${Math.round(t*10)/10}bpm`,s="last"in n?`${Math.round(n.last/60)}m`:"since-play";return`netcomposer-keep-${r}-${i}-${s}.wav`}const Gd="audio/wav";function c0(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function d0(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let i=0;i<n;i++)for(const s of[e[i]??0,t[i]??0]){const l=Math.max(-1,Math.min(1,s)),d=Math.round(l<0?l*8388608:l*8388607);a[r++]=d&255,a[r++]=d>>8&255,a[r++]=d>>16&255}return a}function Kd(e,t,n=24){const r=n/8,i=e*2*r,s=new ArrayBuffer(44),l=new DataView(s),d=(u,c)=>{for(let p=0;p<4;p++)l.setUint8(u+p,c.charCodeAt(p))};return d(0,"RIFF"),l.setUint32(4,36+i,!0),d(8,"WAVE"),d(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,2,!0),l.setUint32(24,t,!0),l.setUint32(28,t*2*r,!0),l.setUint16(32,2*r,!0),l.setUint16(34,r*8,!0),d(36,"data"),l.setUint32(40,i,!0),new Uint8Array(s)}class u0{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(d0(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([Kd(this.frames,n),...this.parts],{type:Gd});this.finish({blob:a,name:c0(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const Yd="netcomposer.studio.keeping.v1";function p0(e){try{return e?.getItem(Yd)!=="off"}catch{return!0}}function h0(e,t){try{e?.setItem(Yd,t?"on":"off")}catch{}}class f0{constructor(t,n,a=!0){this.ctx=t,this.source=n,this.on=a}node=null;latest=i0;on;id=0;jobs=new Map;listeners=new Set;attach(){const t=this.source();if(this.node||!t||typeof AudioWorkletNode>"u")return;const n=new AudioWorkletNode(this.ctx,"nc-studio-keep",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n,n.port.postMessage({type:"keeping",on:this.on})}get supported(){return typeof AudioWorkletNode<"u"}get keeping(){return this.on}get status(){return this.latest}setKeeping(t){this.on=t,this.node?.port.postMessage({type:"keeping",on:t}),t||(this.latest={...this.latest,on:t,written:0,segments:[],bytes:0,lastDropped:null}),this.emit()}refresh(){this.node?.port.postMessage({type:"status"})}plan(t,n){return this.on?s0(this.latest,t,n):null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}keep(t,n){const a=this.node;if(!a||!this.on)return Promise.resolve(null);const r=++this.id;return new Promise(i=>{this.jobs.set(r,{parts:[],plan:null,rate:this.ctx.sampleRate,done:s=>{if(!s)return i(null);const l=s.plan.to-s.plan.from,d=new Blob([Kd(l,s.rate,16),...s.parts],{type:Gd});i({blob:d,name:l0(n.when??new Date,n.bpm,t),seconds:l/s.rate,frame:s.plan.frame,endFrame:s.plan.endFrame,start:s.plan.start,choice:t})}}),a.port.postMessage({type:"keep",id:r,choice:t,grid:n.grid??null,now:this.ctx.state!=="running"})})}emit(){for(const t of this.listeners)t()}message(t){if(t.type==="keep-status"&&t.status){this.latest=t.status,this.emit();return}const n=t.id===void 0?void 0:this.jobs.get(t.id);if(!(!n||t.id===void 0)){if(t.type==="keep-plan")n.plan=t.plan??null,n.rate=t.sampleRate??n.rate,n.plan||(this.jobs.delete(t.id),n.done(null));else if(t.type==="keep-part"){if(t.data)n.parts.push(t.data);else if(t.done){this.jobs.delete(t.id),n.done(null);return}t.done&&n.plan&&(this.jobs.delete(t.id),n.done({plan:n.plan,parts:n.parts,rate:n.rate}))}}}}const Xd={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function m0(e){return Math.floor(.006*e)}const Ci=1024,il=Ci+8192,g0=.25;function b0(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function y0(e,t,n=OfflineAudioContext){const a=new n(1,il,e),r=a.createBuffer(1,il,e);r.getChannelData(0)[Ci]=g0;const i=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);i.connect(s.input),s.output.connect(a.destination),i.start(0);const l=await a.startRendering();return b0(l.getChannelData(0),Ci)}function v0(e,t=()=>y0(e,n=>{const a=new DynamicsCompressorNode(n,Xd);return{input:a,output:a}})){let n=m0(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const w0=65,x0=90,k0=5e3,Ma=3,Ta=1;function $0(e,t){return e>=x0||t>=Ma?"over":t>0?"dropout":e>=w0?"busy":"ok"}function E0(e){return e==="over"?"Overloaded":e==="busy"?"Busy":e==="dropout"?"· dropout":""}function S0(e,t){return te[`load:${t}`].replace("{pct}",String(Math.round(e)))}class A0{pct=0;state="ok";underruns=0;recent=[];read(t,n){this.pct=Math.max(0,Math.min(100,Number.isFinite(t.pct)?t.pct:0));const a=Number.isFinite(t.underruns)?Math.max(0,Math.floor(t.underruns)):0;this.underruns+=a;for(let r=0;r<Math.min(a,Ma);r++)this.recent.push(n);return this.tick(n)}tick(t){for(;this.recent.length&&t-this.recent[0]>=k0;)this.recent.shift();return this.recent.length>Ma&&this.recent.splice(0,this.recent.length-Ma),this.state=$0(this.pct,this.recent.length),this.state}}class M0{constructor(t=Ta){this.intervalS=t}lastStart=Number.NEGATIVE_INFINITY;take(t,n){return!((t??0)>0)||!Number.isFinite(n)||n<this.lastStart+this.intervalS*.9?0:(this.lastStart=n,1)}}function ut(e,t,n={}){const a=document.createElement(e);a.className=t;for(const[r,i]of Object.entries(n))a.setAttribute(r,i);return a}function T0(e={}){const t=e.now??(()=>performance.now()),n=new A0,a=ut("span","load-fill"),r=ut("span","load-pct"),i=ut("span","load-word"),s=ut("button","load",{type:"button","data-testid":"load-meter","data-state":"ok"});s.append(ut("span","load-label"),ut("span","load-bar",{"aria-hidden":"true"}),r,i),s.firstChild.textContent="Load",s.querySelector(".load-bar")?.append(a);const l=ut("div","nc-ui-help load-tip",{role:"tooltip",id:"load-tip","data-testid":"load-tip"});l.hidden=!0,s.setAttribute("aria-describedby","load-tip");let d=!1,u=0;const c={path:"none",pct:0,state:"ok",underruns:0,recent:0,readings:0,measured:!0,inject(b){d=b!==null,b&&f({pct:b.pct,underruns:b.underruns??(b.underrun?1:0)})}};window.__NC_LOAD__=c;function p(){const b=n.state;s.dataset.state=b,a.style.width=`${Math.round(n.pct)}%`,r.textContent=`${Math.round(n.pct)}%`,i.textContent=E0(b);const A=S0(n.pct,b);s.setAttribute("aria-label",A),l.textContent=A,c.pct=n.pct,c.state=b,c.underruns=n.underruns,c.recent=n.recent.length,c.readings=u,l.hidden||v()}function f(b){u++,n.read(b,t()),p()}function g(b){d||f(b)}window.setInterval(()=>{const b=n.state;n.tick(t())!==b&&p()},500);let m=0;function v(){l.isConnected||document.body.append(l);const b=s.getBoundingClientRect();l.style.visibility="hidden",l.style.top="0px",l.style.left="0px";const A=l.offsetWidth,T=8,w=Math.max(T,Math.min(b.left,window.innerWidth-A-T));l.style.top=`${Math.round(b.bottom+6)}px`,l.style.left=`${Math.round(w)}px`,l.dataset.side="below",l.style.visibility=""}function h(){l.hidden=!1,v()}function y(){window.clearTimeout(m),l.hidden=!0}l.style.position="fixed",l.style.pointerEvents="none",s.addEventListener("pointerenter",b=>{b.pointerType!=="touch"&&(window.clearTimeout(m),m=window.setTimeout(h,e.helpDelay??500))}),s.addEventListener("pointerleave",b=>{b.pointerType!=="touch"&&y()}),s.addEventListener("click",()=>l.hidden?h():y()),s.addEventListener("blur",y),document.addEventListener("pointerdown",b=>{s.contains(b.target)||y()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&y()}),window.addEventListener("scroll",y,!0),p();let x=!1;return{el:s,start(b,A){if(x)return c.path;x=!0;const T=b.renderCapacity;if(T&&typeof T.start=="function"){const w=new M0(Ta);return T.addEventListener("update",k=>{const M=k,S=typeof M.timestamp=="number"?M.timestamp:b.currentTime-Ta;g({pct:(M.averageLoad??0)*100,underruns:w.take(M.underrunRatio,S)})}),T.start({updateInterval:Ta}),c.path="renderCapacity",c.path}if(A&&typeof AudioWorkletNode=="function")try{const k=Math.round((b.baseLatency??0)*b.sampleRate),M=new AudioWorkletNode(b,"nc-studio-load",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{framesPerCallback:k}});return M.port.onmessage=S=>{S.data?.type==="load"&&(c.measured=S.data.measured,g({pct:S.data.load,underruns:S.data.underruns}))},c.path="worklet",c.path}catch{}return c.path="none",c.path}}}function L0(e,t){const n=ut("div","transport-col");e.replaceWith(n),n.append(e,t.el)}const En={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},C0=256*1024,N0=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",ga=e=>e.webkitRelativePath||e.name;async function I0(e){const t=[...e],a=t.filter(f=>f.name==="plugin.json").sort((f,g)=>ga(f).split("/").length-ga(g).split("/").length)[0];if(!a)throw new Error(En.noManifest);const r=await a.text();let i;try{i=JSON.parse(r)}catch{throw new Error(En.badJson)}const s=nr(i);if(!s.ok||!s.manifest)throw new Error(En.bad(s.errors.join("; ")));const l=s.manifest,d=N0(ga(a))+l.dsp,u=l.dsp.split("/").pop()??l.dsp,c=t.find(f=>ga(f)===d)??t.find(f=>f!==a&&f.name===u&&!f.webkitRelativePath);if(!c)throw new Error(En.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>C0)throw new Error(En.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function F0(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await cc(new TextEncoder().encode(e.dsp)),added:t}}const ol=e=>`local:${e}`,Wa=e=>e.startsWith("local:"),Jd=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function Qd(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(Jd),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const P0="netcomposer-studio-plugins",ba="plugins";function z0(e=globalThis.indexedDB){const t=Qd(),n=new Promise(i=>{if(!e)return i(null);try{const s=e.open(P0,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(ba)||s.result.createObjectStore(ba,{keyPath:"id"})},s.onsuccess=()=>i(s.result),s.onerror=()=>i(null),s.onblocked=()=>i(null)}catch{i(null)}}),a=async(i,s,l)=>{const d=await n;return d?new Promise((u,c)=>{const p=d.transaction(ba,i),f=s(p.objectStore(ba));p.oncomplete=()=>u(f.result),p.onerror=()=>c(p.error??f.error),p.onabort=()=>c(p.error??f.error)}):l()},r=i=>{const s=i;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(Jd)},async get(i){const s=await a("readonly",l=>l.get(i),()=>t.get(i));return r(s)?s:null},put:i=>a("readwrite",s=>s.put(i),()=>t.put(i)).then(()=>{}),remove:i=>a("readwrite",s=>s.delete(i),()=>t.remove(i)).then(()=>{})}}const nt=-54,Zn=6,He=-nt/(Zn-nt),D0=-6,Ni=(D0-nt)/(Zn-nt);function Zd(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:nt+t*(Zn-nt)}function R0(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function O0(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function pt(e){return R0(Zd(e))}function B0(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function j0(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:pt(n.position))}function bo(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-nt)/(Zn-nt)))}function sl(e){return bo(O0(e))}const ll=[0,-6,-12,-24,-48].map(e=>({value:bo(e),label:e===0?"0":`−${-e}`})),q0=1;function _0(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function cl(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<nt?0:bo(Math.min(Zn,n)):null}function V0(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const yo="netcomposer.studio.mix.v1",eu={position:Ni,mute:!1,solo:!1,sendA:0,sendB:0,pan:0,shade:0,trim:0},tu=-12,nu=24,H0=.5;function au(e){if(typeof e!="number"||!Number.isFinite(e))return 0;const t=Math.round(Math.min(nu,Math.max(tu,e))*10)/10;return t===0?0:t}const U0=8;function W0(e){return typeof e=="number"&&Number.isInteger(e)&&e>=1&&e<=U0?e:0}function Un(){return{v:1,channels:{},master:He,returns:{a:{on:!0,level:He},b:{on:!0,level:He}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Rn=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,G0=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,Ga=(e,t)=>typeof e=="boolean"?e:t,ht=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function K0(e){const t=ht(e);return{position:Rn(t.position,eu.position),mute:Ga(t.mute,!1),solo:Ga(t.solo,!1),sendA:Math.min(He,Rn(t.sendA,0)),sendB:Math.min(He,Rn(t.sendB,0)),pan:G0(t.pan),shade:W0(t.shade),trim:au(t.trim)}}function ru(e){const t=Un(),n=ht(e);if(n.v!==1)return t;const a={};for(const[u,c]of Object.entries(ht(n.channels)))u.length>0&&u.length<=64&&(a[u]=K0(c));const r=ht(n.returns),i=(u,c)=>{const p=ht(u);return{on:Ga(p.on,c.on),level:Rn(p.level,c.level)}},s={},l=ht(n.fx);for(const u of["a","b","insert"])l[u]!==void 0&&(s[u]=l[u]);const d={};for(const[u,c]of Object.entries(ht(n.channelFx)))u.length>0&&u.length<=64&&c&&typeof c=="object"&&(d[u]=c);return{v:1,channels:a,master:Rn(n.master,t.master),returns:{a:i(r.a,t.returns.a),b:i(r.b,t.returns.b)},insert:{on:Ga(ht(n.insert).on,t.insert.on)},fx:s,channelFx:d,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function iu(){try{return globalThis.localStorage??null}catch{return null}}function Y0(e=iu()){try{const t=e?.getItem(yo);return t?ru(JSON.parse(t)):Un()}catch{return Un()}}function ou(e,t=iu()){try{return t?.setItem(yo,JSON.stringify(e)),t!==null}catch{return!1}}const lr=3;function X0(e,t=lr){return Math.max(1,Math.ceil(e/t))}function dl(e,t=lr){return Math.max(0,Math.floor(e/t))}function J0(e,t,n,a=null,r=lr){const i=X0(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return dl(s,r);const l=new Set(e.ids);let d=-1;return n.forEach((u,c)=>{l.has(u)||(d=c)}),d>=0?dl(d,r):Math.min(i,Math.max(0,e.page))}const su=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function Q0(e,t){if(!su(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Z0(e,t,n){if(!su(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const ul="plugin-url",_r="plugin-folder",pl="plugin-files",Vr="kept:",Hr="forget:",Ur="listed:",ey="../plugins/registry.json",O={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function ty(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Pa))if(a===e)return t[Number(n)];return"Stopped."}function Sn(e){if(Wa(e))return O.thisComputer;try{return new URL(e).host||e}catch{return e}}function ny(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function ay(e){const t=new URL(ey,e.base).href;let n=[];const a=new Set,r=new Map,i=[],s=new Set,l=()=>{for(const T of s)T()},d=T=>String(T?.message??T).replace(/^nc-fx plugins?: /,""),u=e.remote!==!1,c=e.store??Qd();let p=[];const f=new Map,g=new Set,m=T=>{g.has(T)||(g.add(T),l())},v=e.frozen,h=async()=>{try{p=await c.list()}catch(T){console.warn(`Studio plugins: can't read this computer's plugins (${d(T)})`)}l()},y=h(),x=u?Fh(t,{fetch:e.fetch}).then(T=>{n=T.registry.plugins;for(const k of T.errors)console.warn(`Studio plugins: registry ${k}`);l();const w=i.splice(0);w.length&&A.restore(w)}).catch(T=>{console.info(`Studio plugins: no listed plugins (${d(T)})`)}):Promise.resolve(),b=async(T,w)=>{a.add(T),r.delete(T),l();try{const{entry:k,stale:M}=await w();return k.plugin&&(M&&m(k.plugin.id),v?.clear(k.plugin.id)),k.type}catch(k){throw r.set(T,d(k)),k}finally{a.delete(T),l()}},A={listed:()=>n,loaded:()=>ih().filter(T=>!T.plugin.listed&&!Wa(T.plugin.url)),remote:u,local:()=>p,stale:T=>g.has(T),frozen:T=>!!v?.has(T),async addPicked(T){const w=await F0(T);v?.clear(w.id);const k=le(`plugin:${w.id}`);if(k){const S=k.plugin?.version===w.version&&f.get(w.id)===w.sha256;return await c.put(w),await h(),S||m(w.id),S?{type:k.type}:{reload:!0}}const M=await b(w.id,()=>cs(e.ctx,{manifest:w.manifest,dsp:w.dsp,dspName:w.dspName},{moduleUrl:e.moduleUrl,url:ol(w.id)}));return f.set(w.id,w.sha256),await c.put(w),await h(),{type:M}},async loadKept(T){v?.clear(T);const w=le(`plugin:${T}`),k=await c.get(T);if(w){const S=f.get(T);return k&&S&&S!==k.sha256&&m(T),w.type}if(!k)throw new Error(O.notKept);const M=await b(T,()=>cs(e.ctx,{manifest:k.manifest,dsp:k.dsp,dspName:k.dspName},{moduleUrl:e.moduleUrl,url:ol(T)}));return f.set(T,k.sha256),M},async forget(T){await c.remove(T),await h()},listingFor(T){const w=n.find(M=>M.id===T.id);if(!w)return null;const k=new URL(w.manifest,t).href;return!T.url||T.url===k?w:null},loading:T=>a.has(T),async loadListed(T){v?.clear(T);const w=le(`plugin:${T}`);if(w)return w.type;await x;const k=n.find(M=>M.id===T);if(!k)throw new Error(`${T} isn't listed`);return b(T,()=>Ph(e.ctx,k,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(T){return b("url",()=>pc(e.ctx,T,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(T){for(const w of T)if(!(w.status!=="missing"||a.has(w.id)||le(`plugin:${w.id}`))&&!v?.has(w.id)){if(Wa(w.url)){y.then(()=>{p.some(k=>k.id===w.id)&&!a.has(w.id)&&!le(`plugin:${w.id}`)&&A.loadKept(w.id).catch(()=>{})});continue}if(u){if(!n.length){i.some(k=>k.id===w.id)||i.push(w);continue}A.listingFor(w)&&A.loadListed(w.id).catch(()=>{})}}},onChange(T){return s.add(T),()=>s.delete(T)},problem:T=>r.get(T)??null,clearProblem(T){r.delete(T)&&l()}};return A}const lu="netcomposer.studio.sends.v2";function ry(e){try{return e?.getItem(lu)==="1"}catch{return!1}}function iy(e,t){try{e?.setItem(lu,t?"1":"0")}catch{}}function oy(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Ka(e){return e.hacksShown!==null?{kind:"stack",id:e.hacksShown}:e.sendsShown?{kind:"sends"}:{kind:"none"}}function sy(e){return Ka(e).kind==="sends"?{hacksShown:null,sendsShown:!1}:{hacksShown:null,sendsShown:!0}}function ly(e){for(const t of e)if(t.sendA>0||t.sendB>0)return!0;return!1}function hl(e,t){return e&&!t}function cy(e,t,n){return e&&Ka(t).kind==="none"&&n.every(a=>a===0)}const cu="netcomposer.studio.strip-fold.v1";function du(e){try{const t=e?.getItem(cu),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function uu(e,t){try{e?.setItem(cu,JSON.stringify([...t].sort()))}catch{}return t}function pu(e,t,n){const a=new Set(du(e));return n?a.add(t):a.delete(t),uu(e,a)}function dy(e,t){return pu(e,t,!1)}function uy(e,t){const n=new Set(t),a=du(e),r=new Set([...a].filter(i=>n.has(i)));return r.size===a.size?a:uu(e,r)}function py(e,t){if(!e.includes(t.id))return[...e];const n=e.filter(i=>i!==t.id),a=t.before===null?-1:n.indexOf(t.before),r=a<0?n.length:a;return[...n.slice(0,r),t.id,...n.slice(r)]}function hy(e,t,n){const a=e.indexOf(t);if(a<0)return null;const r=a+n;return r<0||r>=e.length?null:n<0?{id:t,before:e[r]}:{id:t,before:e[r+1]??null}}function fy(e,t){if(e.length===0)return null;let n=e[0],a=Number.POSITIVE_INFINITY;for(const r of e){const i=t<r.left?r.left-t:t>r.left+r.width?t-(r.left+r.width):0;i<a&&(n=r,a=i)}return{target:n.id,side:t<n.left+n.width/2?"before":"after"}}function fl(e,t,n){const a=e.indexOf(n.target);if(a<0||!e.includes(t))return null;const r=n.side==="before"?n.target:e[a+1]??null;if(r===t)return null;const i={id:t,before:r};return py(e,i).every((l,d)=>l===e[d])?null:i}const my=-18,gy=-20,hu=3,by=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],ml=[-20,-10,-7,-5,-3,0,1,2,3],yy=.3,vy=6.638/yy,wy=48;function xy(e){return e-my}function fu(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-hu)/20))):e>0?1:0}function ky(e){return e>0?fu(xy(20*Math.log10(e))):0}function vo(e){return(Math.min(1,Math.max(0,e))*2-1)*wy}const gl={x:0,v:0};function $y(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=vy,i=e.x-t,s=e.v+r*i,l=Math.exp(-r*n),d=t+(i+s*n)*l,u=(e.v-r*s*n)*l;return d>=1?{x:1,v:0}:d<=0?{x:0,v:0}:{x:d,v:u}}function Ey(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const mu="netcomposer.studio.vu.v1";function Sy(e){try{return e?.getItem(mu)==="1"}catch{return!1}}function Ay(e,t){try{e?.setItem(mu,t?"1":"0")}catch{}}const gu="netcomposer.studio.vu-fold.v1";function My(e){try{return e?.getItem(gu)==="1"}catch{return!1}}function Ty(e,t){try{e?.setItem(gu,t?"1":"0")}catch{}}const Ly="http://www.w3.org/2000/svg",Ii=200,Wr=112,Zt=Ii/2,On=132,bl=100,Cy=108,Ny=105,Iy=116,Fy=103,Py=112,Ye=(e,t)=>{const n=document.createElementNS(Ly,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},yl=e=>Math.round(e*100)/100;function Bn(e,t){const n=vo(fu(e))*Math.PI/180;return[yl(Zt+t*Math.sin(n)),yl(On-t*Math.cos(n))]}function vl(e,t,n){const[a,r]=Bn(e,n),[i,s]=Bn(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${i} ${s}`}const zy=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function wl(e){const t=Ye("svg",{class:"vu-meter",viewBox:`0 0 ${Ii} ${Wr}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(Ye("rect",{class:"vu-face",x:.5,y:.5,width:Ii-1,height:Wr-1,rx:4})),t.append(Ye("path",{class:"vu-arc",d:vl(gy,0,bl)})),t.append(Ye("path",{class:"vu-zone",d:vl(0,hu,Fy)}));for(const i of by){const[s,l]=Bn(i,bl),[d,u]=Bn(i,ml.includes(i)?Cy:Ny);t.append(Ye("line",{class:i>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:d,y2:u}))}for(const i of ml){const[s,l]=Bn(i,Iy),d=Ye("text",{class:i>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});d.textContent=Math.abs(i)===20||i===3?zy(i):String(Math.abs(i)),t.append(d)}const n=Ye("text",{class:"vu-legend",x:Zt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=Ye("text",{class:"vu-side",x:10,y:Wr-10});a.textContent=e;const r=Ye("line",{class:"vu-needle",x1:Zt,y1:On,x2:Zt,y2:On-Py,transform:`rotate(${vo(0)} ${Zt} ${On})`});return t.append(n,a,r),{svg:t,needle:r}}function Dy(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",te["vu:fold"]);const i=document.createElement("span");i.className="nc-strip-name vu-name",i.textContent="Meters",i.setAttribute("data-nc-help",te["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",te["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,i,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const d=["L","R"].map(y=>{const x=document.createElement("span");x.className="vu-bar",x.dataset.side=y;const b=document.createElement("span");return b.className="vu-bar-fill",x.append(b),l.append(x),b});let u=e.folded;const c=()=>{t.toggleAttribute("data-folded",u),a.setAttribute("aria-expanded",u?"false":"true"),a.setAttribute("aria-label",u?"Expand VU meters":"Minimize VU meters"),a.title=u?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{u=!u,c(),e.onFold(u)});const p=wl("L"),f=wl("R");t.append(n,p.svg,f.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),m=[gl,gl],v=[Number.NaN,Number.NaN],h=[p.needle,f.needle];return{el:t,frame(y,x){let b=!1;for(const A of[0,1]){const T=y?ky(y[A]):0;m[A]=$y(m[A],T,x,g.matches),(!Ey(m[A],T)||T>0)&&(b=!0);const w=Math.round(vo(m[A].x)*10)/10;w!==v[A]&&(v[A]=w,h[A].setAttribute("transform",`rotate(${w} ${Zt} ${On})`),d[A].style.transform=`scaleY(${Math.max(0,Math.min(1,m[A].x)).toFixed(3)})`,t.dataset[A===0?"vuL":"vuR"]=w.toFixed(1))}return b}}}const Ry="netcomposer.studio.hidden.v1",ya=1/120,ct="master",xl="Inserts",Oy="(max-width: 768px)",bu=8,La=e=>B0(Zd(e)),kl=e=>{const t=La(e);return t==="−∞"?"off":`${t} dB`};function By(e,t){return tn.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function jy(e,t,n){const a=n.bpm,r=$=>{const C=n.order(),I=C.indexOf($);return I<0?C.length:I},i=($,C,I,R)=>{const F=By(I,R);if(!F||!C)return null;const X=Number(C.getParam(I,R)??F.default),Z=`mix-${$}-${R}`;return F.options?{type:"select",id:Z,label:F.label,value:String(X),options:F.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>{C.setParam(I,R,Number(z)),ie.render()}}:{type:"slider",id:Z,label:F.label,min:F.min,max:F.max,step:F.step??1,taper:Es(F),value:X,valueText:F.format(X,a()),onChange:z=>{C.setParam(I,R,z),ie.render()}}},s=($,C,I,R)=>R.map(F=>i($,C,I,F)).filter(F=>F!==null),l=matchMedia(Oy);let d=null;const u=$=>{d=$,ie.render()},c=$=>u(d===$?null:$);l.addEventListener("change",()=>ie.render());const p=($,C,I,R)=>{$.setParam(C,I,R),ie.render()},f=($,C,I,R)=>cf(C,I,{id:`hack-${$}-${I}-graph`,on:R,set:(F,X)=>p(C,I,F,X),help:{graph:te["eq:graph"],low:te["eq:low"],mid:te["eq:mid"],high:te["eq:high"]}}),g=($,C,I,R)=>{const F=Number(C.getParam(I,R.key)??R.default),X=`hack-${$}-${I}-${R.key}`,Z=z=>p(C,I,R.key,z);return R.options?{type:"select",id:X,label:R.label,value:String(F),options:R.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>Z(Number(z))}:{type:"slider",id:X,label:R.label,min:R.min,max:R.max,step:R.step??.001,taper:Es(R),value:F,valueText:ac(R,F,a()),onChange:Z}},m="",v={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let h=Xb(ke(),`${ct}/${Ud}`);const y=$=>({folded:h.has($),onFold:C=>{h=Vd(ke(),$,C),ie.render()},foldHelp:te["fx:fold"]}),x=n.plugins;x?.onChange(()=>ie.render());const b=new Map,A=$=>String($?.message??$).replace(/^nc-fx plugins?: /,""),T=($,C,I)=>{b.set($,C),ie.render(),Qt({message:I,duration:9e3,anchor:ce.el.querySelector(`[data-nc-id='hack-${$}-add']`)})},w=($,C)=>{const I=Qt({message:C,duration:12e3,actionLabel:O.reloadAction,onAction:()=>location.reload(),anchor:ce.el.querySelector(`[data-nc-id='hack-${$}-add']`)});I.el.dataset.pluginReload=$},k=$=>le($)?.label??$,M=$=>!!$&&$.startsWith("plugin:")&&!!x?.stale($.slice(7)),S=async($,C,I)=>{if(!x)return null;const R=I??await Gf({title:O.urlTitle,body:O.urlBody,field:{label:O.urlField,placeholder:x.remote?O.urlPlaceholder:O.urlPlaceholderLocal,type:"url"},confirmLabel:O.urlNext,returnFocus:C??void 0});if(!R)return null;const F=ny(R,location.href,x.remote);if(!F)return T($,O.badUrlShort,x.remote?O.badUrl:O.badUrlLocal),null;if(!await _e({title:O.warnTitle,body:O.warnBody(Sn(F)),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const Z=await x.loadUrl(F);return M(Z)&&w($,O.reloadToHear(k(Z))),Z}catch(Z){return Z?.reload?(b.set($,O.failedShort),ie.render(),w($,A(Z))):T($,O.failedShort,A(Z)),null}},L=$=>{const C=document.createElement("input");return C.type="file",C.hidden=!0,C.dataset.ncId="plugin-files",$?C.webkitdirectory=!0:(C.multiple=!0,C.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(C),new Promise(I=>{const R=F=>{C.remove(),I(F)};C.addEventListener("change",()=>R(C.files?.length?[...C.files]:null)),C.addEventListener("cancel",()=>R(null)),C.click()})},N=async($,C,I)=>{if(!x)return null;const R=await L(I);if(!R)return null;let F;try{F=await I0(R)}catch(Z){return T($,O.failedShort,A(Z)),null}if(!await _e({title:O.warnTitle,body:O.fileWarnBody(F.manifest.name,F.manifest.author),confirmLabel:O.warnLoad,danger:!0,returnFocus:C??void 0}))return null;try{const Z=await x.addPicked(F);return"reload"in Z?(w($,O.reloadToUse(F.manifest.name,F.manifest.version)),null):Z.type}catch(Z){return T($,O.failedShort,A(Z)),null}},j=async($,C,I)=>{if(!x)return;const R=x.local().find(X=>X.id===C)?.name??C;await _e({title:O.forgetTitle(R),body:O.forgetBody,confirmLabel:O.forgetConfirm,danger:!0,returnFocus:I??void 0})&&(await x.forget(C),Qt({message:O.forgotten(R),duration:5e3,anchor:ce.el.querySelector(`[data-nc-id='hack-${$}-add']`)}))},_=async($,C,I,R)=>{b.delete($);let F=I;if(I===_r||I===pl)F=await N($,R,I===_r);else if(I.startsWith(Hr))await j($,I.slice(Hr.length),R),F=null;else if(I.startsWith(Vr)&&x){ie.render();try{F=await x.loadKept(I.slice(Vr.length)),M(F)&&w($,O.reloadToHear(k(F)))}catch(X){T($,O.failedShort,A(X)),F=null}}else if(I===ul)F=await S($,R);else if(I.startsWith(Ur)&&x){ie.render();try{F=await x.loadListed(I.slice(Ur.length))}catch(X){T($,O.failedShort,A(X)),F=null}}F&&C.addEffect(F,{dials:v[F]}),ie.render()},K=()=>x?[...x.listed().map($=>({value:`${Ur}${$.id}`,label:$.name,group:"Plugins"})),...x.local().map($=>({value:`${Vr}${$.id}`,label:O.kept($.name),group:"Plugins"})),...x.loaded().map($=>({value:$.type,label:`${$.label} (${Sn($.plugin.url)})`,group:"Plugins"})),{value:_r,label:O.folder,group:"Plugins"},{value:pl,label:O.files,group:"Plugins"},{value:ul,label:O.url,group:"Plugins"},...x.local().map($=>({value:`${Hr}${$.id}`,label:O.forget($.name),group:"Plugins"}))]:[];let pe=null,ge=null,se=null;const re=$=>t.masterFx===$||t.list().some(C=>C.fx===$),G=$=>requestAnimationFrame(()=>ce.el.querySelector($)?.focus()),jt=($,C,I,R,F,X,Z)=>{const z=Q0(I.getState(),R);if(!z||!I.removeEffect(R))return;const fe=!!Z&&Z===document.activeElement;if(se?.close(),ie.render(),fe){const St=I.getChain()[z.index];G(St?`[data-nc-id='hack-${$}-${St.id}'] [data-nc-fx-remove]`:`#hack-${$}-add-type`)}const Y=Qt({message:`${F} removed from ${C}.`,actionLabel:"Undo",anchor:ce.el.querySelector("[data-nc-area='fx']"),onAction:()=>$t($,I,z,X),onClose:()=>{se===Y&&(se=null)}});Y.el.dataset.insertUndo=$,se=Y},$t=($,C,I,R)=>{if(!re(C))return;const F=Z0(C.getState(),I,R);let X=I.slot.id;if(F)C.setState(F);else{const{type:Z,dials:z,bypass:fe}=I.slot;X=C.addEffect(Z,{index:I.index,dials:z,bypass:fe})}X&&(d=$,ge=`hack-${$}-${X}`,ie.render(),G(`[data-nc-id='hack-${$}-${X}'] [data-nc-fx-remove]`))},Et=($,C,I,R)=>{const F=I.getChain(),X=F.map((z,fe)=>{const Y=le(z.type),St=Y?.dials??[],Ko=ue=>jt($,C,I,z.id,z.name,R,ue),Yo=ue=>{I.moveEffect(z.id,ue),ge=`hack-${$}-${z.id}`,ie.render()},vn=[];fe>0&&vn.push({type:"button",id:`hack-${$}-${z.id}-left`,label:"Move left",on:!1,onPress:()=>Yo(fe-1)}),fe<F.length-1&&vn.push({type:"button",id:`hack-${$}-${z.id}-right`,label:"Move right",on:!1,onPress:()=>Yo(fe+1)}),vn.push({type:"button",id:`hack-${$}-${z.id}-remove`,label:"Remove",ariaLabel:`Remove ${z.name} from ${C}`,on:!1,onPress:()=>Ko(document.getElementById(`hack-${$}-${z.id}-remove`))});const Xo={onRemove:ue=>Ko(ue),removeLabel:`Remove ${z.name}`},de=z.plugin,Ne=(ue,At,Vt=!1)=>({type:"note",id:`hack-${$}-${z.id}-${ue}`,...Vt?{tone:"danger"}:{},text:At});if(de&&de.status==="missing"){const ue=x?.listingFor(de)??null,At=Wa(de.url),Vt=At&&!!x?.local().some(ia=>ia.id===de.id),Jo=x?.loading(de.id)??!1,Qo=Jo?[Ne("missing",O.loading)]:[Ne("missing",x?.frozen(de.id)?O.frozenShort:At&&!Vt?O.notKept:de.url?O.missing:O.missingNoUrl,!0),Ne("through",O.through),Ne("kept",O.dialsKept),...de.url?[Ne("from",O.from(Sn(de.url)))]:[]];return x&&de.url&&!Jo&&Qo.push({type:"button",id:`hack-${$}-${z.id}-load`,label:ue||Vt?O.load:At?O.pickAgain:O.loadAsk,ariaLabel:ue||Vt?`Load ${de.name}`:At?`Pick ${de.name}'s folder (asks first)`:`Load ${de.name} from ${Sn(de.url)} (asks first)`,on:!1,onPress:()=>{const ia=document.getElementById(`hack-${$}-${z.id}-load`);ue?x.loadListed(de.id).catch(()=>ie.render()):Vt?x.loadKept(de.id).catch(()=>ie.render()):At?N($,ia,!0).then(()=>ie.render()):S($,ia,de.url)}}),{type:"fx",id:`hack-${$}-${z.id}`,title:`${fe+1} · ${z.name}`,...y(`${$}/${z.id}`),depth:fe%4+1,controls:Qo,more:vn,...Xo}}const _t=Y&&"plugin"in Y?Y.plugin:void 0,Sp=_t?[Ne("by",`By ${_t.author}`),Ne("version",`${_t.licence} · ${_t.version}`),Ne("source",_t.listed?"Listed":O.from(Sn(_t.url)))]:[],Ap=de?.status==="failed"?[Ne("failed",ty(de.error),!0),Ne("through",O.through),Ne("retry",O.retry)]:de&&x?.stale(de.id)?[Ne("newcode",O.newCode)]:[];return{type:"fx",id:`hack-${$}-${z.id}`,title:`${fe+1} · ${z.name}`,...y(`${$}/${z.id}`),depth:fe%4+1,on:!z.bypass,meter:Mr(I,z.id)??void 0,meterHelp:te["fx:meter"],onToggle:ue=>{I.setParam(z.id,"bypass",!ue),ie.render()},controls:[...Ap,...z.type==="eq"?[f($,I,z.id,!z.bypass)]:[],...St.filter(ue=>!ue.more).map(ue=>g($,I,z.id,ue))],maxHelp:te["fx:max"],...Xo,more:[...St.filter(ue=>ue.more).map(ue=>g($,I,z.id,ue)),...Sp,...vn]}}),Z=F.length>=R;return X.push({type:"fx",id:`hack-${$}-add`,title:`${C} · Inserts`,...y(`${$}/add`),depth:F.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,...b.get($)?{tone:"danger"}:{},text:b.get($)??(x?.loading("url")||x?.listed().some(z=>x.loading(z.id))||x?.local().some(z=>x.loading(z.id))?O.loading:Z?`${F.length} of ${R}: the stack is full.`:F.length===0?"No effects yet.":`${F.length} of ${R}, first to last.`)},...Z?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:m,options:[{value:m,label:"Effect…"},...nh.map(z=>({value:z,label:le(z)?.label??z})),...K()],onChange:z=>{if(z===m)return;const fe=document.getElementById(`hack-${$}-add-type`);fe instanceof HTMLSelectElement&&(fe.value=m),_($,I,z,fe)}}]]}),X},ra=$=>{const C=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:ya,value:C.level,valueText:kl(C.level),onChange:I=>t.setReturn($,{level:I})}};let be=ry(ke());const U=()=>oy(globalThis.window,{portrait:Md,landscape:Tc}),ve=()=>{const $=sy({hacksShown:d,sendsShown:be});d=$.hacksShown,$.sendsShown!==be&&(be=$.sendsShown,iy(ke(),be)),ie.render()},he=($,C,I)=>{const R=hy(n.order(),$,C);if(!R)return;n.onReorder?.(R.id,R.before);const X=ce.el.querySelector(`${ft}[data-nc-id="strip-${CSS.escape($)}"]`)?.querySelector(I);X&&document.activeElement!==X&&X.focus()};let Fe=uy(ke(),n.order());const Ge=()=>cy(U(),{hacksShown:d,sendsShown:be},t.list().map($=>$.strip.trim)),$p=()=>[...t.list()].sort(($,C)=>r($.id)-r(C.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:La($.strip.position),step:ya,defaultValue:Ni,resetText:`${La(Ni)} dB`,ticks:[...ll],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:hl(U(),be),onChange:C=>t.set($.id,{position:C}),onTypeIn:C=>{const I=cl(C);I!==null&&t.set($.id,{position:I})},onRemove:C=>n.onRemove($.id,C),folded:Fe.has($.id),onFold:C=>{Fe=pu(ke(),$.id,C),ie.render()},foldHelp:te["strip:fold"],foldedHelp:te["strip:folded"],onMove:C=>he($.id,C,"[data-nc-strip-grip]"),shade:$.strip.shade,onShade:C=>t.set($.id,{shade:C??0}),...$.fx?{hacks:d===$.id,hacksLabel:xl,hacksEmpty:$.fx.getChain().length===0,onHacks:()=>c($.id)}:{},trim:{id:`trim-${$.id}`,value:$.strip.trim,min:tu,max:nu,step:H0,defaultValue:0,ariaLabel:`${$.name} trim`,help:te["strip:trim"],onChange:C=>t.set($.id,{trim:au(C)})},trimHidden:Ge(),pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:te["strip:pan"],onChange:C=>t.set($.id,{pan:Math.abs(C)<.005?0:C})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(C=>{const I=C==="A"?"sendA":"sendB",R=$.strip[I];return{id:`send-${C.toLowerCase()}-${$.id}`,label:C,ariaLabel:`${$.name} send ${C}`,min:0,max:He,step:ya*2,value:R,valueText:kl(R),defaultValue:0,onChange:F=>t.set($.id,{[I]:F})}})})),Ep=()=>({type:"strip",id:`strip-${ct}`,label:"Master",master:!0,sendsHidden:hl(U(),be),trimRow:!0,trimHidden:Ge(),onSendsView:ve,sendsView:Ka({hacksShown:d,sendsShown:be}).kind==="sends",sendsViewEmpty:!ly(t.list().map($=>$.strip)),sendsViewLabel:"Sends",sendsViewHelp:te["sends:view"],...t.masterFx?{hacks:d===ct,hacksLabel:xl,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(ct)}:{},channels:2,value:t.masterPositionValue,valueText:La(t.masterPositionValue),step:ya,defaultValue:He,resetText:"0.0 dB",ticks:[...ll],onChange:$=>t.setMaster($),onTypeIn:$=>{const C=cl($);C!==null&&t.setMaster(C)}});let jo=Bd(ke());const qo=$=>({folded:jo[$],foldSlim:!0,onFold:C=>{jo=jd(ke(),$,C),ie.render()},foldHelp:te["fx:fold"]});let bn=Sy(ke()),qt=null,yn=!0;const _o=$=>{bn=$,yn=!0,Ay(ke(),$),ie.render()},Vo=()=>{const $=t.returns.a,C=t.returns.b,I=d===ct&&t.masterFx?{id:ct,name:"Master",fx:t.masterFx}:(()=>{const Y=t.list().find(St=>St.id===d);return Y?.fx?{id:Y.id,name:Y.name,fx:Y.fx}:null})();I||(d=null);const R=t.masterFx?.getChain()??[],F=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:Y=>t.setReturn("a",{on:Y}),meter:Mr($.fx)??void 0,meterHelp:te["fx:meter-return"],...qo("a"),controls:[ra("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:C.on,onToggle:Y=>t.setReturn("b",{on:Y}),meter:Mr(C.fx)??void 0,meterHelp:te["fx:meter-return"],...qo("b"),controls:[ra("b"),...s("b",C.fx,"delay",["delay_beats","feedback"])],more:s("b",C.fx,"delay",["tone","low_cut"])}],X=I?[...Et(I.id,I.name,I.fx,I.id===ct?Ti:bu)]:be?F:[],Z=I?.id??"sends",z=X.map(Y=>Y.id),fe=J0(pe,Z,z,ge);return pe={key:Z,ids:z,page:fe},ge=null,{id:"mix",title:"Mix",summary:`${t.list().map(Y=>Y.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${R.filter(Y=>!Y.bypass).map(Y=>Y.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...$p(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(Y=>({value:Y.id,label:Y.available===!1?`${Y.name} (soon)`:Y.name,disabled:Y.available===!1})),onAdd:Y=>n.onAdd(Y)}]},{id:"fx",area:"fx",label:I?`${I.name} inserts`:"Send effects",pageSize:lr,page:fe,onPage:Y=>{pe&&(pe={...pe,page:Y})},controls:X},...bn?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[Ep()]}]}},ce=wb(Vo(),Ry),Ho=()=>ce.el.toggleAttribute("data-hacks-folded",Ka({hacksShown:d,sendsShown:be}).kind==="none"&&l.matches);Ho();const je=document.createElement("button");je.type="button",je.className="nc-page-action vu-add",je.dataset.vuAdd="",je.textContent="+ Meters",je.setAttribute("aria-label","Add VU meters"),je.setAttribute("data-nc-help",te["vu:add"]),je.addEventListener("click",()=>{_o(!0),qt?.el.querySelector("[data-vu-remove]")?.focus()}),ce.el.querySelector(".nc-module-end")?.prepend(je);const Uo=()=>ce.el.toggleAttribute("data-sends-hidden",!be);Uo();const Wo=()=>{je.hidden=bn;const $=ce.el.querySelector('[data-nc-section="meters"]');!bn||!$||(qt??=Dy({onRemove:()=>{_o(!1),je.focus()},folded:My(ke()),onFold:C=>{yn=!0,Ty(ke(),C)}}),qt.el.parentElement!==$&&$.append(qt.el))};Wo(),Uy(ce.el,n,he),Hy(ce.el,t,n),El(ce.el),$l(ce.el),xb(e,[ce],"adjacent");const Go=$=>({peak:sl($.peak),rms:sl($.rms),over:$.peak>=q0}),ie={module:ce,get hacksShown(){return d},showHacks:u,render(){ce.update(Vo()),Ho(),Wo(),Uo(),El(ce.el),$l(ce.el)},frame($){if(ce.el.dataset.ncOpen!=="true")return;for(const I of t.list())Ks(ce.el,`strip-${I.id}`)?.update([Go(I.levels())],$);const C=t.masterLevels();if(Ks(ce.el,`strip-${ct}`)?.update(C.map(Go),$),qt&&bn){const I=t.ctx.state==="running";I&&(yn=!0),yn&&(yn=qt.frame(I?[C[0].rms,C[1].rms]:null,$))}}};return ie}const ft=".nc-strip:not([data-nc-master])",Ca=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null,qy="[data-nc-strip-grip], .nc-strip-hd, .nc-strip-fold",_y=6,Vy=400,va=12;function $l(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?te["inserts:master"]:te["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",te["mix:sends"])}function El(e){for(const t of e.querySelectorAll(`${ft} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",te["strip:name"]);for(const t of e.querySelectorAll(`${ft} .nc-strip-hd`))t.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight")}function Hy(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,i=r?.closest(ft),s=Ca(i??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const d=t.list().find(f=>f.id===s)?.name??r.textContent??"",u=document.createElement("input");u.type="text",u.className="nc-strip-name-input",u.value=d,u.maxLength=Pd,u.spellcheck=!1,u.autocomplete="off",u.setAttribute("aria-label",`Rename ${d}`),u.setAttribute("data-nc-help",te["strip:rename"]),l.setAttribute("data-renaming",""),l.insertBefore(u,r),u.focus(),u.select();let c=!1;const p=f=>{if(c)return;c=!0;const g=u.value;u.remove(),l.removeAttribute("data-renaming"),f&&g!==d&&n.onRename?.(s,g)};u.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),u.addEventListener("blur",()=>p(!0)),u.addEventListener("click",f=>f.stopPropagation())})}function Uy(e,t,n){let a=null;const r=()=>{for(const c of e.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop")},i=()=>{a&&(window.clearTimeout(a.timer),a.strip.removeAttribute("data-dragging"),e.removeAttribute("data-strip-drag"),r(),a=null)},s=c=>{c.active=!0,c.strip.setAttribute("data-dragging","true"),e.setAttribute("data-strip-drag",""),c.touch&&!c.grip&&navigator.vibrate?.(10)},l=()=>[...e.querySelectorAll(ft)].map(c=>{const p=c.getBoundingClientRect();return{id:Ca(c)??"",left:p.left,width:p.width}}),d=(c,p)=>{const f=c.strip.parentElement;if(f&&f.scrollWidth>f.clientWidth){const v=f.getBoundingClientRect();p<v.left+va*2?f.scrollLeft-=va:p>v.right-va*2&&(f.scrollLeft+=va)}const g=fy(l(),p),m=g?fl(t.order(),c.id,g):null;c.mark=m?g:null,r(),c.mark&&e.querySelector(`${ft}[data-nc-id="strip-${CSS.escape(c.mark.target)}"]`)?.setAttribute("data-drop",c.mark.side)},u=()=>{const c=p=>{p.stopPropagation(),p.preventDefault()};e.addEventListener("click",c,{capture:!0,once:!0}),window.setTimeout(()=>e.removeEventListener("click",c,{capture:!0}),0)};e.addEventListener("pointerdown",c=>{if(a||c.pointerType==="mouse"&&c.button!==0)return;const p=c.target instanceof Element?c.target:null;if(!p||p.closest("input, .nc-strip-remove, [data-nc-strip-hide], [data-renaming]"))return;const f=p.closest(qy),g=f?.closest(ft),m=Ca(g??null);if(!f||!g||!m)return;const v={id:m,strip:g,pointerId:c.pointerId,x0:c.clientX,y0:c.clientY,grip:f.matches("[data-nc-strip-grip]"),touch:c.pointerType!=="mouse",active:!1,timer:0,mark:null};a=v,v.touch&&!v.grip&&(v.timer=window.setTimeout(()=>{a===v&&!v.active&&s(v)},Vy)),v.grip&&!v.touch&&c.preventDefault()}),window.addEventListener("pointermove",c=>{const p=a;if(!(!p||c.pointerId!==p.pointerId)){if(!p.active){if(Math.hypot(c.clientX-p.x0,c.clientY-p.y0)<_y)return;if(p.touch&&!p.grip)return i();s(p)}c.preventDefault(),d(p,c.clientX)}}),e.addEventListener("touchmove",c=>{a?.active&&c.preventDefault()},{passive:!1}),e.addEventListener("contextmenu",c=>{a?.touch&&c.preventDefault()}),window.addEventListener("pointerup",c=>{const p=a;if(!p||c.pointerId!==p.pointerId)return;const f=p.active?p.mark:null,g=p.active;if(i(),!g)return;u();const m=f?fl(t.order(),p.id,f):null;m&&t.onReorder?.(m.id,m.before)}),window.addEventListener("pointercancel",c=>{a&&c.pointerId===a.pointerId&&i()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&a?.active&&i()}),e.addEventListener("keydown",c=>{if(!c.altKey||c.ctrlKey||c.metaKey||c.shiftKey||c.key!=="ArrowLeft"&&c.key!=="ArrowRight")return;const p=c.target instanceof Element?c.target:null,f=p?.closest(".nc-strip-hd, [data-nc-strip-hide], .nc-strip-fold");if(!p||!f||p.closest("input, [data-nc-strip-grip]"))return;const g=Ca(f.closest(ft));if(!g)return;c.preventDefault();const m=f.matches("[data-nc-strip-hide]")?"[data-nc-strip-hide]":f.matches(".nc-strip-fold")?".nc-strip-fold":".nc-strip-hd :is(button, [tabindex])";n(g,c.key==="ArrowLeft"?-1:1,m)})}const Wy=1e-5,Gy=2e3,Ky=500,jn={parked:!1,quietSince:null};function Yy(e,t,n,a){if(t)return jn;if(e.parked)return e;if(!(n<Wy))return jn;const r=e.quietSince??a;return{parked:a-r>=Gy,quietSince:r}}const Sl=e=>10**(e/20),Xe=.012,Gr=1024,Al=32768;class Xy{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:jn,b:jn};parkMeters;parkScratch=new Float32Array(Al);masterPosition=He;channels=[];listeners=new Set;scratch=new Float32Array(Gr);restore;channelFx;applyQueued=!1;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Gr});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:pt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,Xd),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const i=l=>{const d=new GainNode(t,{gain:1}),u=n.fx?.(l)??null,c=new GainNode(t,{gain:pt(He)}),p=a();return u?(d.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:d,fx:u,gain:c,meter:p,on:u!==null,level:He}};this.returns={a:i("a"),b:i("b")};const s=l=>{const d=new AnalyserNode(t,{fftSize:Al});return this.returns[l].gain.connect(d),d};this.parkMeters={a:s("a"),b:s("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.trim);else{const r=new GainNode(this.ctx,{gain:1}),i=this.restore?.(t)??eu,s=new GainNode(this.ctx,{gain:Sl(i.trim)});r.connect(s);const l=new GainNode(this.ctx,{gain:0}),d=new AnalyserNode(this.ctx,{fftSize:Gr}),u=new GainNode(this.ctx,{gain:0}),c=new GainNode(this.ctx,{gain:0}),p=this.channelFx?.(t)??null;p?(s.connect(p.input),p.output.connect(l)):s.connect(l);const f=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),g=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),m=new GainNode(this.ctx,{gain:1}),v=new GainNode(this.ctx,{gain:1}),h=new ChannelMergerNode(this.ctx,{numberOfInputs:2});l.connect(d),l.connect(f).connect(g),g.connect(m,0).connect(h,0,0),g.connect(v,1).connect(h,0,1),h.connect(this.bus),h.connect(u).connect(this.returns.a.bus),h.connect(c).connect(this.returns.b.bus),a={id:t,name:n,input:r,trim:s,fader:l,stereo:f,split:g,balL:m,balR:v,panner:h,meter:d,sendA:u,sendB:c,fx:p,strip:i},this.channels.push(a),this.queueApply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.trim,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.queueApply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=i=>{const s=i?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(i=>i.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.queueApply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(pt(t),this.ctx.currentTime,Xe),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Xe),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(pt(a.level),r,Xe)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>pt(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain),a.fx.clear()):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=jn,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=Yy(a,this.fed(n),a.parked?0:this.parkPeak(n),t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}parkPeak(t){const n=this.parkScratch;this.parkMeters[t].getFloatTimeDomainData(n);let a=0;for(let r=0;r<n.length;r++)a=Math.max(a,Math.abs(n[r]??0));return a}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}queueApply(){this.applyQueued||(this.applyQueued=!0,queueMicrotask(()=>{this.applyQueued=!1,this.apply()}))}apply(){const t=j0(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,Xe),a.trim.gain.setTargetAtTime(Sl(a.strip.trim),n,Xe),a.sendA.gain.setTargetAtTime(pt(a.strip.sendA),n,Xe),a.sendB.gain.setTargetAtTime(pt(a.strip.sendB),n,Xe);const[i,s]=V0(a.strip.pan);a.balL.gain.setTargetAtTime(i,n,Xe),a.balR.gain.setTargetAtTime(s,n,Xe)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),_0(this.scratch)}emit(){for(const t of this.listeners)t()}}const Jy=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],An=(e,t)=>t.map(([n,a,r,i])=>({id:n,name:a,intervals:r,category:e,symbol:i})),yu=[...An("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...An("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...An("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...An("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...An("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],vu=new Map(yu.map(e=>[e.id,e])),Kr={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function Qy(e){if(typeof e!="string")return"major";if(vu.has(e))return e;if(Kr[e])return Kr[e];const t=a=>a.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(Kr).find(([a])=>t(a)===n)?.[1]??yu.find(a=>t(a.name)===n||t(a.id)===n)?.id??"major"}function wo(e){return vu.get(Qy(e))}const Fi=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function wu(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),a=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(a>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(a,Math.min(r,0))*12;return e.map(s=>s+i)}function Zy(e,t,n=0,a="compact"){const i=wo(t).intervals.map(l=>Fi(e,0,127)+l);for(let l=0;l<Fi(n,0,i.length-1);l++){const d=i.shift(),u=i[i.length-1];i.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return wu(i.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,i.length-1))))}function ev(e,t=1){return[...new Set(Array.from({length:Fi(t,1,4)},(n,a)=>e.map(r=>r+a*12)).flat().filter(n=>n>=0&&n<=127))]}function tv(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),a=n.length;if(a<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[a-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=a-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(a-1)/2)-Math.abs(s.i-(a-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((a-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((a-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let d=1;l.length<a;d++)for(const u of[i+s*d,i-s*d])u>=0&&u<a&&l.push(n[u]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[a-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(d=>[s,d])}default:return n}}const nv=16,Pi={hits:5,steps:8,rotate:0};function xu(e){const t=(a,r)=>typeof a=="number"&&Number.isFinite(a)?Math.round(a):r,n=Math.max(1,Math.min(nv,t(e?.arpSteps,Pi.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,Pi.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function ku(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}function av(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let a=t-t%e.steps;a<t;a++)ku(e,a)&&n++;return n}const rv=1592598566;function iv(e){let t=(Math.imul(e^rv,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const Ml=new Map;function ov(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let a=Ml.get(e);(!a||a.step>n)&&(a={step:0,pos:0});let{step:r,pos:i}=a;for(;r<n;r++){const s=iv(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return Ml.set(e,{step:r,pos:i}),i}function sv(e,t,n,a=Pi,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return ov(t,n);if(e==="euclidean"){const s=xu({arpHits:a.hits,arpSteps:a.steps,arpRotate:a.rotate}),l=Math.max(0,Math.floor(n));return ku(s,l)?i(av(s,l)):null}return i(n)}const xo=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}];new Set(xo.map(e=>e.id));new Map(xo.map(e=>[e.num,e.id]));xo.map(e=>({value:e.id,label:e.name}));const $u=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}];$u.map(e=>e.id);const Tl=e=>$u.find(t=>t.id===e)?.kind??"repeat",lv=15,cv=40,Le=e=>[...e].sort((t,n)=>t-n);function Eu(e,t){const n=Le(e);for(let a=0;a<t;a++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const wa=e=>Eu(e,1);function dv(e,t){const n=e[0];return n-((n-t)%12+12)%12}function uv(e,t){const n=Le(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Le([n[0],...n.slice(2),n[1]+12]);case 2:return Le([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Le([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function pv(e,t,n,a=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(a()*r));default:return i%r}}function hv(e,t,n,a,r=Math.random){const i=Le(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Eu(i,pv(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(a/2-Math.round(a/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:uv(i,n),velocity:.9};default:return null}}function fv(e,t,n,a,r=t){const i=Le(t);if(!i.length)return[];const s=(d,u,c,p)=>d.map(f=>({step:f,len:u,notes:c,velocity:p})),l=dv(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,wa(i),.75),...s([8],3,[l-12],1),...s([12],2,wa(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,wa(i),.9);case"house":return s([2,6,10,14],1,wa(i),.9);case"montuno":{const d=l+(a[1]??4),u=l+(a[2]??7),c=a[3]!==void 0&&a[3]<12?l+a[3]:l+12,p=[l,l+12],f=[d,u];return[[0,p],[3,f],[5,p],[6,f],[8,[u,c]],[10,p],[13,f],[14,[u,l+12]]].map(([g,m])=>({step:g,len:1,notes:Le(m),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:Le(r),velocity:.9,next:!0}];case"strum":{const d=[...i,i[0]+12];return[{step:0,len:3.5,notes:d,velocity:.95,strum:"down"},{step:8,len:3.5,notes:d,velocity:.75,strum:"up"}]}default:return[]}}function mv(e,t,n){const a=n==="down"?Le(e):Le(e).reverse(),r=Math.max(0,Math.min(cv,t))/1e3;return a.map((i,s)=>({midi:i,offset:s*r}))}const Ll=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function gv(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let a;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?a=[14]:r&&n(6)?a=[17]:n(4)&&n(8)&&!n(7)?a=[14]:n(4)&&n(10)?a=[14,21]:n(4)?a=[14,18,21]:n(3)?a=[14,17]:n(5)||n(2)?a=[14,21]:a=[14],a.filter(i=>!n(i%12))}function bv(e,t,n,a=Math.random){const r=gv(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(a()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function zi(e,t,n=0,a="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const d=r.shift(),u=r[r.length-1];r.push(d+Math.ceil((u-d+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[a]??0;return wu(r.map((l,d)=>l+12*Math.floor(d*s/Math.max(1,r.length-1))))}function yv(e,t){const n=Le(e),a=Le(t);if(n.length===a.length)return n.reduce((i,s,l)=>i+Math.abs(s-a[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,a),0)+a.reduce((i,s)=>i+r(s,n),0)}function vv(e,t,n,a,r,i="compact",s){const l=zi(t,n,s??r,i);if(!e||!e.length)return l;let d=l,u=1/0,c=1/0;const p=s!==void 0?[s]:n.map((f,g)=>g);for(const f of p)for(const g of[-24,-12,0,12]){const m=zi(t,n,f,i).map(y=>y+g);if(m[0]<a-7||m[0]>a+12||m[0]<0||m[m.length-1]>127)continue;const v=yv(m,e),h=Math.abs(m.reduce((y,x)=>y+x,0)/m.length-e.reduce((y,x)=>y+x,0)/e.length);(v<u-1e-9||Math.abs(v-u)<1e-9&&h<c-1e-9)&&(d=m,u=v,c=h)}return d}const wv={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},E=(e,t,n,a=1,r={})=>({degree:e,chord:t,numeral:n,bars:a,...r}),B="major",xe="minor",q="dominant-7",Q="minor-7",Se="major-7",Yr="half-diminished-7",Xr="diminished-7",W=(e,t,n,a,r,i)=>({id:e,group:t,name:n,level:a,tonality:r,chords:i,short:wv[t]}),Cl=e=>[E(0,q,"I7"),E(e==="IV7"?5:0,q,e),E(0,q,"I7"),E(0,q,"I7"),E(5,q,"IV7"),E(5,q,"IV7"),E(0,q,"I7"),E(0,q,"I7"),E(7,q,"V7"),E(5,q,"IV7"),E(0,q,"I7"),E(7,q,"V7")],Su=[W("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[E(0,B,"I"),E(7,B,"V"),E(9,xe,"vi"),E(5,B,"IV")]),W("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[E(9,xe,"vi"),E(5,B,"IV"),E(0,B,"I"),E(7,B,"V")]),W("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[E(0,B,"I"),E(9,xe,"vi"),E(5,B,"IV"),E(7,B,"V")]),W("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[E(0,B,"I"),E(10,B,"♭VII"),E(5,B,"IV",2)]),W("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[E(0,B,"I",.5),E(7,B,"V",.5),E(9,xe,"vi",.5),E(4,xe,"iii",.5),E(5,B,"IV",.5),E(0,B,"I",.5),E(5,B,"IV",.5),E(7,B,"V",.5)]),W("blues-12","Blues","12-bar",1,"blues",Cl("I7")),W("blues-12-quick","Blues","12-bar quick change",2,"blues",Cl("IV7")),W("blues-minor","Blues","Minor blues",2,"minor",[E(0,Q,"i7"),E(0,Q,"i7"),E(0,Q,"i7"),E(0,Q,"i7"),E(5,Q,"iv7"),E(5,Q,"iv7"),E(0,Q,"i7"),E(0,Q,"i7"),E(8,q,"♭VI7"),E(7,q,"V7"),E(0,Q,"i7"),E(7,q,"V7")]),W("blues-jazz","Blues","Jazz blues",3,"blues",[E(0,q,"I7"),E(5,q,"IV7"),E(0,q,"I7"),E(7,Q,"v7",.5),E(0,q,"I7",.5),E(5,q,"IV7"),E(6,Xr,"♯iv°7"),E(0,q,"I7"),E(9,q,"VI7"),E(2,Q,"ii7"),E(7,q,"V7"),E(0,q,"I7",.5),E(9,q,"VI7",.5),E(2,Q,"ii7",.5),E(7,q,"V7",.5)]),W("jazz-2-5-1","Jazz","ii–V–I",1,"major",[E(2,Q,"ii7"),E(7,q,"V7"),E(0,Se,"Imaj7",2)]),W("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[E(2,Yr,"iiø7"),E(7,"7b9","V7♭9"),E(0,"minor-6","i6",2)]),W("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[E(0,Se,"Imaj7",.5),E(9,Q,"vi7",.5),E(2,Q,"ii7",.5),E(7,q,"V7",.5)]),W("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[E(4,Q,"iii7",.5),E(9,q,"VI7",.5),E(2,Q,"ii7",.5),E(7,q,"V7",.5)]),W("jazz-autumn","Jazz","Autumn cycle",3,"minor",[E(5,Q,"iv7"),E(10,q,"♭VII7"),E(3,Se,"♭IIImaj7"),E(8,Se,"♭VImaj7"),E(2,Yr,"iiø7"),E(7,"7b9","V7♭9"),E(0,Q,"i7",2)]),W("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[E(0,Se,"Imaj7",.5),E(3,q,"♭III7",.5),E(8,Se,"♭VImaj7",.5),E(11,q,"VII7",.5),E(4,Se,"IIImaj7"),E(10,Q,"♭vii7",.5),E(3,q,"♭III7",.5),E(8,Se,"♭VImaj7",.5),E(11,q,"VII7",.5),E(4,Se,"IIImaj7",.5),E(7,q,"V7",.5),E(0,Se,"Imaj7"),E(6,Q,"♯iv7",.5),E(11,q,"VII7",.5)]),W("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[E(0,Q,"i7"),E(5,q,"IV7")]),W("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[E(5,Se,"IVmaj7"),E(4,Q,"iii7"),E(2,Q,"ii7"),E(0,Se,"Imaj7")]),W("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[E(5,Se,"IVmaj7"),E(4,q,"III7"),E(9,Q,"vi7"),E(7,Q,"v7",.5),E(0,q,"I7",.5)]),W("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[E(2,"minor-9","ii9"),E(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),E(0,"major-9","Imaj9",2)]),W("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[E(0,B,"I"),E(5,B,"IV",.5),E(6,Xr,"♯iv°7",.5)]),W("gospel-7-3-6","Gospel","7–3–6",3,"major",[E(11,Yr,"viiø7"),E(4,q,"III7"),E(9,Q,"vi7",2)]),W("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[E(0,B,"I",.5),E(0,q,"I7",.5),E(5,B,"IV",.5),E(6,Xr,"♯iv°7",.5),E(0,B,"I/V",2,{inversion:2})]),W("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[E(0,xe,"i"),E(8,B,"VI"),E(3,B,"III"),E(10,B,"VII")]),W("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[E(0,xe,"i"),E(10,B,"VII"),E(8,B,"VI"),E(10,B,"VII")]),W("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[E(0,Q,"i7"),E(5,Q,"iv7")]),W("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[E(0,xe,"i"),E(8,B,"VI"),E(10,B,"VII"),E(7,xe,"v")]),W("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[E(5,xe,"iv"),E(0,xe,"i")]),W("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[E(0,B,"I"),E(8,B,"♭VI"),E(10,B,"♭VII"),E(0,B,"I")]),W("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[E(0,B,"I"),E(4,B,"III")]),W("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[E(0,B,"I"),E(2,B,"II")]),W("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[E(0,xe,"i"),E(10,B,"♭VII"),E(8,B,"♭VI"),E(7,B,"V")]),W("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[E(0,xe,"i"),E(5,xe,"iv"),E(7,q,"V7",2)]),W("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[E(0,Se,"Imaj7",2),E(2,q,"II7",2),E(2,Q,"ii7"),E(7,q,"V7")]),W("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[E(2,"minor-9","ii9"),E(7,"dominant-9","V9"),E(0,"major-9","Imaj9"),E(9,"minor-9","vi9")]),W("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[E(5,Se,"IVmaj7"),E(4,Q,"iii7"),E(9,Q,"vi7",2)]),W("modal-dorian","Modal","Dorian i–IV",1,"dorian",[E(0,xe,"i"),E(5,B,"IV")]),W("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[E(0,B,"I"),E(10,B,"♭VII")]),W("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[E(0,xe,"i"),E(1,B,"♭II")])];Su.map(e=>e.id);const xv=e=>Su.find(t=>t.id===e)??null;function Jr(e,t,n,a=0){const r=xv(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const d=wo(s.chord),u=s.intervals??d.intervals,c=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:c,chord:d.id,intervals:u,numeral:s.numeral,name:`${Jy[c]}${s.symbol??d.symbol}`,bars:a>0?a:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const kv=e=>e.reduce((t,n)=>t+n.bars,0),$v=(e,t)=>e.slice(0,t).reduce((n,a)=>n+a.bars,0);function Nl(e,t){const n=kv(e),a=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(a<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:a,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:a,total:n}}const Ev=16,Sv=()=>Array.from({length:Ev},()=>null),Av=["off","single","chord","random"],Mv=e=>Av.includes(e),Tv={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:Sv(),chordPadMode:"pad"};function Il(e,t,n=Math.random){if(e.mode==="off")return[];const a=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[a];if(e.mode==="random"){const d=Math.min(127,(e.octave+1)*12),u=Math.min(127,d+e.octaveRange*12-1);return[d+Math.floor(n()*(u-d+1))]}const r=Zy(a,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=ev(r,e.arpOctaves),s=tv(i,e.arp),l=sv(e.arp,s.length,t,xu(e),n);return l===null?[]:[s[l]]}function Fl(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Lv(e,t,{octave:n}={}){if(t==="chord")return e.map(i=>({...i,role:"chord"}));const a=new Map;for(const i of e)a.set(i.hit,[...a.get(i.hit)??[],i]);const r=[];for(const i of a.values()){const s=i[0],l=Math.max(...i.map(d=>d.velocity));if(t==="top"){const d=i.reduce((u,c)=>c.note>u.note?c:u);r.push({...d,role:"top",offsetSec:0,velocity:l})}else{const d=n===void 0?s.root:Math.min(127,Math.max(0,(n+1)*12+(s.root%12+12)%12));r.push({...s,note:d,role:"root",offsetSec:0,velocity:l})}}return r}function Cv(e,t){return t.direction&&t.strumMs>0&&e.length>1?mv(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function Nv(e,t=0){return Cv(e.notes,e).map(({midi:n,offset:a})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:a,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Pl=(e,t,n)=>Math.min(n,Math.max(t,e)),Iv=1e-9;function Fv(e,t){return t>0?Math.ceil(e/t-Iv)*t:e}const zl=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class ko{step=0;grid={origin:0,index:0,interval:16};comp=zl(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const a=this.settings.interval,r=4/a,i=n?Fv(t,r):t;this.grid={origin:i,index:0,interval:a},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=zl(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new ko(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const a=this.comp;return n.comp={...a,jump:a.jump?{...a.jump}:null,last:a.last?[...a.last]:null,bar:{...a.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&Tl(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,a=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const c=this.chordAt(t),p={...n,chord:c.chord,note:c.rootPc,octave:Math.floor(c.root/12)-1,...c.inversion!==void 0?{inversion:c.inversion}:{}},f=Il(p,this.step,this.random);return this.step++,f.length?this.hit(t,a,f,1,null,c,!1,"arp"):null}if(Tl(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),d=this.voicingFor(l),u=hv(n.chordStyle,d,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!u||!u.notes.length?null:this.hit(t,a,u.notes,u.velocity,Ll(this.beatInBar(t)),l,!0,"chord")}if(!Mv(n.mode))return this.step++,null;const r=Il(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:a,gate:Pl(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,a,r,i,s,l,d){const u=this.settings,c=[...a];if(l&&u.tension>0&&this.chordRandom()*100<u.tension){const f=bv(c,s.rootPc,s.intervals,this.chordRandom);f!==null&&c.push(f)}const p=u.chordStyle==="strum"&&i?u.strum>0?u.strum:lv:u.strum;return{beat:t,spanBeats:n,gate:Pl(u.gate/100,.1,1),velocity:r,notes:c,kind:"comp",direction:i,strumMs:p,chord:s,root:s.root,role:d}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=wo(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,a=Jr(n.chordProgression,n.note,n.octave,n.progressionBars);return a?.length?Nl(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,a=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${a}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?vv(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,a,n.arpSpread,t.inversion):zi(t.root,t.intervals,a,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,a=this.settings;if(n.bar===t&&n.settings===a)return n.hits;const r=a,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),d=this.voicingFor(l);let u=d;if(s==="push"){const p=this.chordAt((t+1)*i);if(`${p.root}|${p.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const f={last:this.comp.last,key:this.comp.lastKey};u=this.voicingFor(p),this.comp.last=f.last,this.comp.lastKey=f.key}}let c=fv(s,d,l.rootPc,l.intervals,u).filter(p=>p.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(c=c.filter(p=>p.step!==0)),this.comp.bar={bar:t,settings:a,hits:c},c}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const a=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),u=this.compBar(l).find(g=>l*r+g.step/4>=this.comp.from-1e-9);if(!u){this.comp.from=(l+1)*r;continue}const c=l*r+u.step/4;if(!t(c))break;if(this.comp.from=c+1e-6,n())continue;const p=u.next&&a.chordStyle==="push"?u.len+6:u.len;u.next&&(this.comp.pushedTo=l+1);const f=this.chordAt(u.next?(l+1)*r:c);i.push(this.hit(c,p/4,u.notes,u.velocity,u.strum??Ll(this.beatInBar(c)),f,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const a=Jr(n.chordProgression,n.note,n.octave,n.progressionBars);if(!a?.length)return null;const r=Nl(a,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const a=this.settings,r=Jr(a.chordProgression,a.note,a.octave,a.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-$v(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const a=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&a.push(l)}this.advance()}this.barStyleActive()?a.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of a)r.push(...Nv(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const cr=1,Pv=8;function zv(e,t,n,a,r){return`${e}|${t}|${n}|${a}|${r}`}function Dl(e,t,n,a,r={}){const i=new Map;return Lv(n,a,r).map(s=>{const l=i.get(s.hit)??0;return i.set(s.hit,l+1),{...s,id:zv(e,t,s.role,s.hit,l),source:e}})}const Dv=(e,t)=>({v:cr,kind:"notes",source:e,events:t}),xa=(e,t,n)=>({v:cr,kind:"off",source:e,reason:t,...n===void 0?{}:{atBeat:n}}),Rv=e=>({v:cr,kind:"routes",routes:e}),Ov=(e,t,n)=>({v:cr,kind:"audition",source:e,events:t,holdSec:n}),dt=1e-9;function Bv(e={}){const t=new Map,n=new Map,a=new Set,r={sent:{notes:0,off:0,routes:0,audition:0},events:0,errors:0},i=()=>e.nowBeat?.()??null,s=new Set,l=()=>{for(const h of[...s])try{h()}catch{}},d=(h,y)=>{const x=n.get(h);if(x){r.sent[y.kind]++,y.kind==="notes"&&(r.events+=y.events.length);try{x(y)}catch{r.errors++}}},u=h=>{const y=[];for(const x of t.values()){const b=x.targets.get(h);b?.on&&y.push({source:x.handle.id,name:x.handle.name,role:b.role,...b.octave===void 0?{}:{octave:b.octave},...b.transpose?{transpose:b.transpose}:{}})}return y},c=h=>d(h,Rv(u(h))),p=(h,y,x)=>{const b=h.targets.get(y);if(!b?.on||!x.length)return;const A=Rl(Dl(h.handle.id,h.run,x,b.role,{...b.octave===void 0?{}:{octave:b.octave}}),b.transpose??0);A.length&&d(y,Dv(h.handle.id,A))},f=(h,y)=>{const x=[...h.current,...h.kept.filter(A=>A.startBeat<y-dt)];if(!x.length)return[];let b=x[0];for(const A of x)A.startBeat>b.startBeat+dt&&(b=A);return x.filter(A=>A.hit===b.hit&&Math.abs(A.startBeat-b.startBeat)<=dt)},g=(h,y)=>{const x=i();if(x===null)return h.kept;const b=h.kept.filter(A=>A.startBeat>=x-dt);return a.has(y)?[...f(h,x),...b]:b},m=h=>{const y=i();y!==null&&h.kept.length&&h.kept[0].startBeat<y-dt&&(h.current=f(h,y),h.kept=h.kept.filter(x=>x.startBeat>=y-dt))};function v(h,y){const x=t.get(h);x&&x.handle.remove();const b={handle:void 0,run:1,kept:[],current:[],targets:new Map,status:null,takeBack:null},A=()=>t.get(h)===b,T={id:h,name:y,send(w){if(!A()||!w.length)return;m(b);const k=w.map(M=>({...M}));b.kept.push(...k);for(const M of b.targets.keys())p(b,M,k)},audition(w,k){if(!A()||!w.length||!(k>0))return;const M=Math.min(k,Pv),S=w.map(j=>({...j})),L=()=>{if(A())for(const[j,_]of b.targets){if(!_.on||a.has(j))continue;const K=Rl(Dl(h,0,S,_.role,{..._.octave===void 0?{}:{octave:_.octave}}),_.transpose??0);K.length&&d(j,Ov(h,K,M))}};let N;try{N=e.startAudio?.()}catch{N=void 0}N?N.then(L,L):L()},restart(){A()&&(b.run++,b.kept=[],b.current=[])},off(w,k){if(A()){b.kept=k===void 0?[]:b.kept.filter(M=>M.startBeat<k-dt),(k===void 0||b.current.some(M=>M.startBeat>=k-dt))&&(b.current=[]);for(const[M,S]of b.targets)S.on&&d(M,xa(h,w??"stop",k))}},setTarget(w,k){if(!A()||typeof w!="string"||!w)return;const M=b.targets.get(w),S=jv(k.transpose),L={role:k.role,on:k.on===!0,...k.octave===void 0?{}:{octave:k.octave},...S?{transpose:S}:{}};b.targets.set(w,L);const N=M&&(M.role!==L.role||M.octave!==L.octave||(M.transpose??0)!==(L.transpose??0))&&M.on;M?.on&&(!L.on||N)&&d(w,xa(h,"off")),(!M||M.on!==L.on||N)&&c(w),L.on&&(!M?.on||N)&&p(b,w,g(b,w)),(!M||M.on!==L.on)&&l()},removeTarget(w){const k=b.targets.get(w);!A()||!k||(b.targets.delete(w),k.on&&(d(w,xa(h,"removed")),c(w)))},targets:()=>[...b.targets].map(([w,k])=>({target:w,...k})),remove(){if(!A())return;const w=[...b.targets].filter(([,k])=>k.on).map(([k])=>k);for(const k of w)d(k,xa(h,"removed"));t.delete(h);for(const k of w)c(k);l()},status(w){if(!A())return;const k=w&&typeof w.now=="string"&&typeof w.next=="string"?{now:w.now.slice(0,32),next:w.next.slice(0,32)}:null;JSON.stringify(k)!==JSON.stringify(b.status)&&(b.status=k,l())},onTakeBack(w){A()&&(b.takeBack=typeof w=="function"?w:null)}};return b.handle=T,t.set(h,b),T}return{source:v,sources:()=>[...t.values()].map(h=>h.handle),host:h=>({notesIn(y,x){if(typeof y!="function")return()=>{};const b=x?.takes==="pitch",A=!n.has(h)||a.has(h)!==b;n.set(h,y),b?a.add(h):a.delete(h),A&&l(),c(h);for(const T of t.values())T.targets.get(h)?.on&&p(T,h,g(T,h));return()=>{n.get(h)===y&&(n.delete(h),a.delete(h),l())}},notesSource:y=>v(h,String(y).slice(0,64)),notesTakeBack(y){const x=t.get(y);if(!x?.takeBack||!x.targets.has(h))return null;try{const b=x.takeBack(h);return b==null?null:structuredClone(b)}catch{return null}}}),routesFor:u,listening:h=>n.has(h),takesPitch:h=>n.has(h)&&a.has(h),drop(h){n.delete(h),a.delete(h);for(const y of[...t.values()])y.handle.id===h?y.handle.remove():y.targets.delete(h);l()},statuses:()=>[...t.values()].filter(h=>h.status!==null).map(h=>({source:h.handle.id,name:h.handle.name,status:{...h.status}})),onChange(h){return s.add(h),()=>s.delete(h)},stats:()=>({sent:{...r.sent},events:r.events,errors:r.errors})}}function jv(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(-48,Math.min(48,Math.round(e))):0}function Rl(e,t){if(!t)return e;const n=a=>Math.max(0,Math.min(127,a+t));return e.map(a=>({...a,note:n(a.note),root:n(a.root)}))}const qv=.5,_v=20;function Vv(e,t,n={}){const a=n.aheadSec??qv,r=n.now??Pe;let i={...Tv,...n.settings};const s=n.seed??1,l=()=>new ko(()=>i,{random:Fl(s),chordRandom:Fl(s+1),beatsPerBar:()=>Math.max(1,t.transport.meter?.beatsPerBar??4)});let d=null,u=0,c=!1;const p=()=>{const h=t.transport;if(!d||!h.running)return;const y=d.window(h.beatAt(r()+a));y.length&&(u+=y.length,e.send(y))},f=(h,y)=>{d=l(),e.restart(),d.start(h,{join:y}),p()},g=t.onChange(h=>{if(!c){if(h.kind==="start")f(h.beat,!1);else if(h.kind==="stop")d=null,e.off("stop");else if(h.kind==="snapshot"){const y=t.transport;!y.running&&d?(d=null,e.off("stop")):y.running&&!d&&f(y.beatAt(Math.max(y.startTime??r(),r())),!0)}}}),m=(n.ticker??(h=>Kp(h,{intervalMs:_v})))(p);m.start();const v=t.transport;return v.running&&f(v.beatAt(Math.max(v.startTime??r(),r())),!0),{source:e,set(h){i={...i,...h}},settings:()=>i,sent:()=>u,remove(){c||(c=!0,g(),m.dispose(),e.remove())}}}const $o="studio";function Hv(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,i=u=>{try{return r.get(u)?.()===!0}catch{return!1}},s=u=>{for(const c of[...u])try{c()}catch{}},l=u=>{if(u!==e){e=u;for(const c of n)c()}},d=(u,c)=>(u.add(c),()=>{u.delete(c)});return{owner:()=>e,claim(u){e===null&&l(u)},claimAll(){l($o),s(t)},clear:()=>l(null),onAll:u=>d(t,u),member(u,c){return r.set(u,c),()=>{r.get(u)===c&&r.delete(u)}},out(u){for(const c of r.keys())if(c!==u&&i(c))return;s(a)},drop:u=>{r.delete(u)},onLastOut:u=>d(a,u),playing:()=>[...r.keys()].filter(i),onChange:u=>d(n,u)}}const Ol="netcomposer.studio.plugins.frozen.v1",Uv=2e3;function Wv(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==Pa[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Gv(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function Kv(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(Ol)??"[]");return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(Ol,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const i=n();i.includes(r)&&a(i.filter(s=>s!==r))}}}function Yv(e){let t=!1;const n=(e.watch??zh)(e.ctx,{stallMs:e.stallMs??Uv,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Xv="NetComposer Studio",tt=[40,240],Jv="nc-sync";function Qv(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Jv}${n}`,locks:t?{request:(a,r,i)=>t.request(`${a}${n}`,r,i)}:null}}function Zv(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const ew=.2,Bl=.5;function tw(e,t,n){const a=new Pp({bpm:120,minBpm:tt[0],maxBpm:tt[1],timebase:"shared"}),r=new Yp({app:Xv,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:tt},startLeadSeconds:ew,...n?{startGate:()=>n(),gatedStartLeadSeconds:Bl}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const d=e();return d==="running"?"running":d==="closed"?"none":"needs-gesture"}});let i=!1,s=0,l=!1;return{clock:a,peer:r,async start(){i||(i=!0,await r.start())},play(){const d=n?.()??null;if(!d){l=!1,a.play({at:Pe()});return}const u=++s,c=Pe();l=!0;const p=()=>{u!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Pe())+Bl,0),r.publishState()):a.play({at:Pe()}))};d.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Pe()})},setTempo:d=>a.setTempo({bpm:nw(d)}),playing:()=>a.transport.isPlayingAt(Pe()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const d=a.transport,u=Pe();return d.isPlayingAt(u)?aw(d.beatAt(u)):null},beatPhase(){const d=a.transport,u=Pe();if(!d.isPlayingAt(u))return null;const c=d.beatAt(u);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function nw(e){return Number.isFinite(e)?Math.min(tt[1],Math.max(tt[0],Math.round(e*10)/10)):120}function aw(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Di="netcomposer.scene",Au=1,Eo="netcomposer.studio.tempo.v1",So="netcomposer.studio.scene-name.v1",Ya=120,Ao="Untitled scene",rw=2*1024*1024;function dr(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(tt[1],Math.max(tt[0],Math.round(t*10)/10)):Ya}function Bt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||Ao}function iw(e){return{format:Di,v:Au,name:Bt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:dr(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function ow(e,t){if(e.length>rw)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Di)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const i=new Set,s=[];for(const u of Array.isArray(a.instances)?a.instances:[]){if(!u||typeof u!="object")continue;const c=u.id;if(typeof c!="string")continue;const p=fo(c);if(!p||!t.includes(p.type)||i.has(c))continue;i.add(c);const f=u.name;s.push({id:c,type:p.type,name:zd(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,d={};if(a.presets&&typeof a.presets=="object")for(const[u,c]of Object.entries(a.presets))i.has(u)&&(d[u]=c);return{ok:!0,scene:{format:Di,v:Au,name:Bt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:dr(l)},meter:[4,4],instances:s,mix:ru(a.mix??Un()),presets:d,media:Array.isArray(a.media)?a.media:[]}}}function sw(e){return`${Bt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function lw(e){try{const t=e?.getItem(Eo);return t?dr(Number(t)):Ya}catch{return Ya}}function Mu(e,t){try{t?.setItem(Eo,String(dr(e)))}catch{}}function cw(e){try{return Bt(e?.getItem(So))}catch{return Ao}}function Tu(e,t){try{t?.setItem(So,Bt(e))}catch{}}const Ri="netcomposer.studio.reset-pending.v1",Mo="netcomposer.studio.reset-undo.v1",To="netcomposer.studio.legacy-copy.v1",jl="nyx.scene-samples",dw=3e4,uw=[ho,yo,Eo,So,To];function pw(e){return e.includes("@studio/")||uw.includes(e)}function Lu(e){const t=[];for(let n=0;n<e.length;n++){const a=e.key(n);a!==null&&pw(a)&&t.push(a)}return t}const hw=/^[0-9a-f]{16,64}$/;function fw(e){const t=new Set,n=(a,r)=>{if(!(!a||typeof a!="object"||r>6))for(const[i,s]of Object.entries(a))i==="sample"&&typeof s=="string"&&hw.test(s)?t.add(s):n(s,r+1)};try{n(JSON.parse(e),0)}catch{}return[...t]}function mw(e,t){const n=new Set;for(const[i,s]of Object.entries(t))if(i.startsWith("nyx.state"))for(const l of fw(s))n.add(l);if(!n.size)return;let a=[];try{const i=JSON.parse(e.getItem(jl)??"[]");Array.isArray(i)&&(a=i.filter(s=>typeof s=="string"))}catch{}const r=[...a.filter(i=>!n.has(i)),...n].slice(-2048);e.setItem(jl,JSON.stringify(r))}function gw(e,t){for(const n of[t,e])try{const a=n?.getItem(Mo);if(!a)continue;const r=JSON.parse(a);if(r?.v===1&&r.keys&&typeof r.keys=="object")return r}catch{}return null}function ur(e,t){for(const n of[t,e])try{n?.removeItem(Mo)}catch{}}function bw(e,t,n=Date.now()){const a={};for(const s of Lu(e)){const l=e.getItem(s);l!==null&&(a[s]=l)}const r=JSON.stringify({v:1,at:n,keys:a});try{mw(e,a)}catch{}for(const s of Object.keys(a))e.removeItem(s);try{t?.removeItem(Aa)}catch{}ur(e,t);let i=!1;for(const s of[t,e])if(!(i||!s))try{s.setItem(Mo,r),i=!0}catch{}if(!i){for(const[s,l]of Object.entries(a))e.setItem(s,l);return!1}try{e.setItem(To,"off")}catch{}return!0}function yw(e,t){const n=gw(e,t);if(!n)return!1;for(const a of Lu(e))e.removeItem(a);ur(e,t);for(const[a,r]of Object.entries(n.keys))typeof r=="string"&&e.setItem(a,r);return!0}function vw(e){try{return e?.getItem(To)==="off"}catch{return!1}}function Lo(){try{return globalThis.sessionStorage??null}catch{return null}}function ww(e,t){try{return e?.setItem(Ri,t),!!e}catch{return!1}}function xw(e,t){if(!e)return null;let n=null;try{n=t?.getItem(Ri)??null,t?.removeItem(Ri)}catch{n=null}try{if(n==="reset")return bw(e,t)?"reset":"failed";if(n==="undo")return yw(e,t)?"undo":null;ur(e,t)}catch{}return null}const Cu="netcomposer.studio.picker.v1",ql="http://127.0.0.1:5177",kw=1,an=16,_l=64*1024*1024,Vl=[1e3,2e3,5e3,1e4],$w=new Set(["127.0.0.1","localhost","[::1]"]);function Co(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!$w.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Nu(e){try{const t=JSON.parse(e?.getItem(Cu)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:Co(n.address)??ql}}catch{return{on:!1,address:ql}}}function Oi(e,t){try{e?.setItem(Cu,JSON.stringify(t))}catch{}}function Ew(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:an},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const Qr=e=>({ok:!1,placed:[],left:[],message:e}),Zr=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=an).slice(0,16):[];function Sw(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=Zr([a.from]),[i]=Zr([a.to]);return r&&i?[{from:r,to:i}]:[]}).slice(0,an),left:Zr(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function Aw(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function Mw(e){const t=new Map,n=new Map,a=new Set,r=new Map,i=e.now??(()=>Date.now()),s=e.setTimeout??((S,L)=>setTimeout(S,L)),l=e.clearTimeout??(S=>clearTimeout(S)),d=S=>e.live?.(S)??!0;let u="off",c="",p=0,f=null,g=null,m="";const v=S=>{S!==u&&(u=S,e.onStatus?.(S))},h=()=>[...t.entries()].filter(([S])=>d(S)).map(([S,L])=>{const N=e.brandOf?.(S);return{id:S,name:(e.nameOf?.(S)??S).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===S,seen:n.get(S)??0,pads:Ew(L)}}),y=S=>{const L=h();return m=JSON.stringify(L),JSON.stringify({v:kw,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:L,results:[...r.entries()].map(([N,j])=>({id:N,...j})),wait:S})},x=(S,L)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:y(S),cache:"no-store",...L?{signal:L}:{},targetAddressSpace:"loopback"}),b=async(S,L)=>{if(!S.ok)throw new Error(`the picker said ${S.status}`);const N=await S.json();if(L!==p)return;if(v("on"),Array.isArray(N.ack))for(const _ of N.ack)typeof _=="string"&&r.delete(_);const j=Array.isArray(N.commands)?N.commands:[];for(const _ of j.slice(0,4)){const K=Aw(_);K&&k(K,L)}},A=async S=>{let L=0,N=!1;for(;S===p;){const j=new AbortController;f=j;try{await b(await x(N,j.signal),S),L=0,N=!0}catch{if(S!==p)return;N=!1,v("away");const _=Vl[Math.min(L++,Vl.length-1)];await new Promise(K=>s(K,_))}}},T=()=>{!c||g!==null||(g=s(()=>{g=null;const S=p;!c||u!=="on"||!r.size&&JSON.stringify(h())===m||x(!1).then(L=>b(L,S)).catch(()=>{})},150))},w=async S=>{const L=await e.fetch(S,{cache:"no-store",targetAddressSpace:"loopback"});if(!L.ok){const N=await L.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${L.status}`)}return L},k=async(S,L)=>{if(r.has(S.id))return;let N;const j=t.get(S.target);if(!j||!d(S.target))N=Qr("That NYX isn't in the Studio any more.");else if(a.has(S.target))N=Qr("NYX is still loading the last kit.");else{a.add(S.target);try{const _=await(await w(`${c}/api/kit/manifest`)).json(),K=Array.isArray(_.sounds)?_.sounds:[];if(!K.length)throw new Error("the picker's pads are empty");if(K.length>an)throw new Error(`more than ${an} sounds`);const pe={};for(const ge of K){const se=ge&&typeof ge=="object"?ge.pad:null;if(typeof se!="number"||!Number.isInteger(se)||se<1||se>an||pe[se])throw new Error("a sound has no pad of its own");const re=await w(`${c}/api/kit/audio?pad=${se}`);if(Number(re.headers.get("content-length")??0)>_l)throw new Error(`pad ${se}'s sound is too big`);const G=await re.arrayBuffer();if(G.byteLength>_l)throw new Error(`pad ${se}'s sound is too big`);pe[String(se)]=G}if(L!==p)return;e.reveal?.(S.target),N=Sw(await j.receive(_,S.mode,pe))}catch(_){N=Qr(`Not loaded: ${_.message||"it went wrong"}.`)}finally{a.delete(S.target)}}L===p&&(r.set(S.id,N),T())},M=()=>{p++,f?.abort(),f=null,g!==null&&l(g),g=null,c="",r.clear(),v("off")};return{host(S){return{pickerTarget(L){return t.set(S,L),T(),{changed:T,remove(){t.get(S)===L&&t.delete(S),T()}}}}},start(S){const L=Co(S);L&&(M(),c=L,v("connecting"),A(++p))},stop:M,seen(S){n.set(S,i()),t.has(S)&&T()},changed:T,forget(S){t.delete(S),n.delete(S),T()},targets:h,get status(){return u}}}const Tw=300,Lw=120*1e3;function Cw(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Nw(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(Cw))return{ok:!1,message:"Channels must be 32-bit float arrays."};const i=r[0].length;if(i===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==i))return{ok:!1,message:"The channels differ in length."};if(i>Tw*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Hl(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Iw(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??Lw,i=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const u=e.brandOf?.(l);return{instance:l,name:a(l),...u?{brand:u}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:Hl(d)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>i(s),async sendAudio(l,d,u){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof u!="string"||!Hl(c).some(m=>m.id===u))return{ok:!1,reason:"invalid",message:`No ${u} there.`};const p=Nw(d);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let g;try{const m=await Promise.race([Promise.resolve(c.receive(f,u)),new Promise(v=>{g=setTimeout(()=>v({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!m||typeof m!="object"||typeof m.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:m}catch(m){return{ok:!1,reason:"error",message:m instanceof Error?m.message:String(m)}}finally{clearTimeout(g)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Fw="/studio/assets/silence-processor-BBLKD9j-.js";function Pw(e,t=go){const n=t.find(i=>i.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const Bi=Ff,Ze=If,ei={system:"System",light:"Light",dark:"Dark"};function zw(e){try{return Yi(e?.getItem(Bi))}catch{return"system"}}function Dw(e,t){try{t==="system"?e?.removeItem(Bi):e?.setItem(Bi,t)}catch{}}const Rw=e=>Ze[(Ze.indexOf(e)+1)%Ze.length]??"system";function Ow(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function Iu(e,t){const n=Ow(e);n&&Xi(t,n)}function Bw(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=Ze.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const d=document.createElement("span");return d.className="theme-word",d.textContent=ei[s],l.append(d),l.setAttribute("aria-label",`${ei[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${ei[s]} theme`,l.addEventListener("click",()=>{const u=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!u?Rw(s):s;i(c),t(c),r[Ze.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function i(s){a=s;for(const l of r){const d=l.dataset.themeChoice===s;l.setAttribute("aria-checked",d?"true":"false"),l.tabIndex=d?0:-1}}return i(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,d=(Ze.indexOf(a)+l+Ze.length)%Ze.length,u=Ze[d]??"system";i(u),t(u),r[d]?.focus()}),{el:n,get choice(){return a},set:i}}function jw(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(i,s)=>{const l=new URL(String(i),t).href;let d=a.get(l);return d||(d=n(i,s),a.set(l,d),d.catch(()=>{a.get(l)===d&&a.delete(l)})),d},configurable:!0}),e}const Mn=xw(ke(),Lo()),J=new AudioContext({latencyHint:"interactive"});jw(J.audioWorklet,location.href);const No=Kv(ke()),qw=new URLSearchParams(location.search).has("plugins"),_w=qw,qn=ay({ctx:J,moduleUrl:Pn,base:location.href,remote:_w,store:z0(),frozen:No});function Ul(e,t){qn?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),Io.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){rt?.render();for(const s of Wv(a,e.getChain()))Qt({message:O.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const i=e.getChain().length;i!==n&&(n=i,queueMicrotask(()=>rt?.render()))}),e}function Vw(e){return oe.list().find(t=>t.id===e)?.name??e}const Io=new Set,Ce=Y0(),un={},Hw=bu,pr=new Map,oe=new Xy(J,{restore:e=>Ce.channels[e],fx:e=>{const t=Tr(J,{moduleUrl:Pn,bpm:120,state:Hd(e,Ce)});return un[e]=t,t},masterFx:()=>{const e=Tr(J,{moduleUrl:Pn,bpm:120,slots:Ti,state:Qb(Ce,Ti)});return e.onChange(Xn),Ul(e,()=>"Master")},channelFx:e=>{Za.delete(e);const t=Tr(J,{moduleUrl:Pn,bpm:H.bpm(),slots:Hw,state:Ce.channelFx[e]??{v:2,chain:[]}}),n=wc(t,H.clock,{mapper:it}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(Xn),pr.set(e,t),t.dispose=(r=>()=>{Io.delete(t),r()})(t.dispose),Ul(t,()=>Vw(e))}});oe.setMaster(Ce.master);oe.setReturn("a",Ce.returns.a);oe.setReturn("b",Ce.returns.b);let Fu=()=>!1;const it=new Up(J,{hold:()=>Fu()});it.start();const Pu=Zv();let zu=()=>{};const Du=v0(J.sampleRate),hr=n0(J,{nodeFor:e=>oe.tapNode(e),latencyFor:e=>oe.tapLatency(e,Du.get()),sources:()=>[{id:"master",name:"Master"},...oe.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{zu=e})}),Re=Hv(),rn=Rb(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),ea=e=>V.some(t=>t.id===e),Ru=e=>V.find(t=>t.id===e)?.name??e,Ou=e=>{const t=V.find(a=>a.id===e),n=Ae.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},fr=e=>{at(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Oe.get(e)?.contentWindow?.focus()},Bu=Iw({live:ea,nameOf:Ru,brandOf:Ou,reveal:fr}),mt=Mw({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>Pt.value.trim()||"Studio",live:ea,nameOf:Ru,brandOf:Ou,shown:()=>We,reveal:fr,onStatus:e=>Bo(e)});let ju=!1;const Fo=Kb(),qu=Wb({now:()=>J.currentTime,labelOf:e=>{const t=V.find(a=>a.id===e),n=Ae.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Yu,hn,Zu]}),wt=Bv({nowBeat:()=>{const e=H.clock.transport;return e.running?e.beatAt(Pe()):null},startAudio:()=>J.state==="running"?void 0:yr()}),ji=new Set,mr=()=>{for(const e of[...ji])try{e()}catch{}};wt.onChange(()=>{mr(),Uw()});window.ncStudio=jb(J,oe,{notes:wt,clock:()=>H.clock,targets:{list:()=>V.map(e=>({instance:e.id,name:e.name,type:e.type,n:e.n,takesNotes:wt.listening(e.id),takesPitch:wt.takesPitch(e.id)})),listen(e){return ji.add(e),()=>ji.delete(e)}},show:e=>{ea(e)&&fr(e)},countIn:qu.api,holdFirstPlay:()=>Fo.hold(),presets:rn,share:Bu,picker:mt,legacyCopy:()=>!vw($e()),grab:hr,play:Re,mapper:a0(it),resolve:(e,t)=>Jw(e,t),syncScope:Pu,fxWorklet:new URL(Pn,location.href).href});const H=tw(()=>J.state,Qv(Pu),()=>ju&&J.state==="running"&&it.ready&&Fo.count===0?null:tx());Fu=()=>H.clock.transport.isPlayingAt(Pe());function $e(){try{return globalThis.localStorage??null}catch{return null}}H.setTempo(lw($e()));const Ee=new u0(J,()=>oe.tapNode("master"));let It=null,_u=!0;const Te=new f0(J,()=>oe.tapNode("master"),p0($e()));let Vu=null;function D(e,t={},...n){const a=document.createElement(e);for(const[r,i]of Object.entries(t))i===void 0||i===!1||a.setAttribute(r,i===!0?"":String(i));return a.append(...n),a}const Wn=D("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),pn=D("input",{type:"number",class:"bpm",min:tt[0],max:tt[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Xa=D("output",{class:"position","aria-label":"Bar and beat"},"—"),gt=D("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":te["transport:rec"]},"Rec"),Ot=D("button",{type:"button",class:"btn keep","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"keep-menu","aria-keyshortcuts":"K","data-nc-help":te["transport:keep"]},"Keep"),Hu=D("div",{class:"keep-held","data-nc-help":te["keep:held"]}),Po=[...r0.map(e=>({choice:()=>({last:e}),label:`Keep last ${e/60} min`,key:String(e)})),{choice:e=>({since:e}),label:"Keep since Play",key:"since"}],ta=Po.map(e=>D("button",{type:"button",role:"menuitem",class:"keep-item","data-keep":e.key},e.label)),Gn=Ji({checked:Te.keeping,labelledBy:"keep-switch-label",onChange:e=>{h0($e(),e),Te.setKeeping(e),Be(e?"Keeping: on":"Keeping: off (nothing held)")}}),Ue=D("div",{class:"keep-menu",id:"keep-menu",role:"menu","aria-label":"Keep",hidden:!0},Hu,...ta,D("div",{class:"keep-switch","data-nc-help":te["keep:switch"]},D("span",{id:"keep-switch-label"},"Keeping"),Gn.el)),Uu=D("div",{class:"keep-wrap"},Ot,Ue),Cn=D("a",{class:"take",hidden:!0}),Ft=D("button",{type:"button",class:"notes-chip",hidden:!0});Ft.addEventListener("click",()=>{const e=Ft.dataset.source;e&&ea(e)&&fr(e)});function Uw(){const e=wt.statuses().filter(i=>ea(i.source));Ft.hidden=e.length===0;const t=e[0];if(!t)return;Ft.dataset.source=t.source;const{now:n,next:a}=t.status,r=`${n}${a&&a!==n?` → ${a}`:""}`;Ft.replaceChildren(D("span",{class:"notes-chip-dot","aria-hidden":"true"}),D("span",{class:"notes-chip-name"},t.name),D("span",{class:"notes-chip-chord"},r),...e.length>1?[D("span",{class:"notes-chip-count",title:`${e.length} CALLIOPEs playing`},String(e.length))]:[]),Ft.setAttribute("aria-label",`${t.name} plays ${r}. Show it.`)}const zo=D("span",{class:"status",role:"status"}),Pt=D("input",{type:"text",class:"scene-name",maxlength:60,value:cw($e()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Wu=D("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Gu=D("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),Ku=D("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),_n=D("input",{type:"file",accept:".json,application/json",hidden:!0}),xt=D("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},D("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),Do=Bw(zw($e()),e=>{Dw($e(),e),Xi(e);for(const t of Oe.values())Iu(t,e)});Xi(Do.choice);const Yu=D("h1",{class:"brand","aria-label":"NetComposer Studio"},D("span",{"aria-hidden":"true"},"NetComposer",D("span",{class:"brand-sep"}," / "),"Studio")),qi=D("span",{class:"beat-light","aria-hidden":"true"}),Ja=D("span",{class:"status-long"}),Qa=D("span",{class:"status-short"});zo.append(Ja,Qa);const hn=D("header",{class:"top"},D("div",{class:"transport"},Wn,D("label",{class:"tempo"},pn,D("span",{class:"tempo-unit"},"BPM")),qi,Xa),D("div",{class:"record-col"},D("div",{class:"record"},gt,Uu,Cn),Ft),zo),Xu=T0();L0(hn.querySelector(".transport"),Xu);const Ro=D("div",{class:"scene-actions"},Pt,Wu,Gu,Ku,xt,Do.el),Ju=D("button",{type:"button",class:"ghost menu-reset","data-reset":"menu"},"Reset Studio…");Ju.addEventListener("click",()=>void mp(Qu.button));Ro.append(Ju);const Qu=hb({panel:Ro}),_i=D("button",{type:"button",class:"foot-reset","data-reset":"foot"},"Reset Studio…");_i.addEventListener("click",()=>void mp(_i));const Ww=D("footer",{class:"studio-foot"},_i),Zu=D("div",{class:"scene",role:"group","aria-label":"Scene"},Ro,_n,Qu.button);Ee.supported||(gt.disabled=!0,gt.title="This browser can't record audio",Ot.disabled=!0);const gn=D("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),ep=D("div",{class:"stage"}),na=D("label",{class:"tab tab-add",title:"Add an instrument"},D("span",{"aria-hidden":"true"},"+")),on=D("select",{class:"tab-add-select","aria-label":"Add an instrument"});on.append(D("option",{value:""},"Add an instrument"),...go.map(e=>{const t=D("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));on.addEventListener("change",()=>{const e=on.value;on.value="",e&&lp(e)});na.append(on);gn.append(na);cb();const Kn=D("div",{class:"spine","aria-hidden":"true"}),Oe=new Map;let V=Lb(Tb(Ae),Ae),We=V[0]?.id??"";const Gw=new URLSearchParams(location.search).has("measure"),Wl=new Map,Kw=Ib((e,t)=>fetch(e,t)),Yw=2e4;function tp(e){const t=D("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);dp(t,e),t.addEventListener("click",()=>at(e.id)),gn.insertBefore(t,na);const n=Wl.get(e.type)??Promise.resolve(),a=Kw(e.src),r=Promise.all([n,a]).then(([,i])=>new Promise(s=>{if(!V.some(u=>u.id===e.id))return s();const l=D("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Sb(e,Gw,i),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Oe.set(e.id,l);const d=window.setTimeout(s,Yw);l.addEventListener("load",()=>Xw(l)),l.addEventListener("load",()=>{window.clearTimeout(d),s()},{once:!0}),ep.append(l),at(We)}));return Wl.set(e.type,r),r}const np=window.matchMedia(Tc);function ap(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",np.matches)}catch{}}np.addEventListener("change",()=>{for(const e of Oe.values())ap(e)});function Xw(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",Iu(e,Do.choice),ap(e);const n=e.id.replace(/^panel-/,""),a=()=>{const i=t?.querySelector(".nc-page"),s=i?i.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(ip.set(n,Math.round(l.getBoundingClientRect().bottom)),n===We&&op())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),gr()}).observe(r),Oo.add(e),rp(e)}const Oo=new Set;function rp(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){Oo.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(hn).position==="sticky"?hn.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),i=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(i-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-i)}px`)}let ti=!1;function gr(){ti||(ti=!0,requestAnimationFrame(()=>{ti=!1;for(const e of Oo)rp(e)}))}window.addEventListener("scroll",gr,{passive:!0});window.addEventListener("resize",gr);const ip=new Map;function op(){const e=ip.get(We);e===void 0?Kn.style.removeProperty("--spine-top"):Kn.style.setProperty("--spine-top",`${e}px`)}function sp(e){if(!e){Kn.replaceChildren();return}const t=Pw(e),n=D("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),Kn.replaceChildren(D("span",{class:"spine-text"},n,D("span",{class:"spine-rest"},t.rest)))}function at(e){We=e,mt.seen(e),sp(V.find(t=>t.id===e)),op(),gr();for(const t of V){const n=t.id===e;Oe.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const Jw=Fb(()=>V.map(e=>({instance:e,window:()=>Oe.get(e.id)?.contentWindow,readyState:()=>{try{return Oe.get(e.id)?.contentDocument?.readyState}catch{return}}})),Ae);function lp(e){bp();const t=Ae.find(r=>r.id===e);if(!t)return;const n=Ab(V,t),a=V.map(r=>r.type).lastIndexOf(n.type);V=a<0?[...V,n]:[...V.slice(0,a+1),n,...V.slice(a+1)],mn(V),tp(n),mr();for(const r of V){const i=document.getElementById(`tab-${r.id}`);i&&gn.insertBefore(i,na)}at(n.id),rt?.render()}function Qw(e,t){const n=V.find(l=>l.id===e);if(!n)return;const a=V.filter(l=>l.id!==e),r=l=>Ae.find(d=>d.id===l.type)?.sound===!1,i=a.reduce((l,d,u)=>r(d)?l:u,-1),s=t===null?r(n)?a.length:i+1:a.findIndex(l=>l.id===t);V=[...a.slice(0,s<0?a.length:s),n,...a.slice(s<0?a.length:s)],mn(V);for(const l of V){const d=document.getElementById(`tab-${l.id}`);d&&gn.insertBefore(d,na)}rt?.render()}function Zw(e,t){V=Eb(V,e,t,Ae),mn(V);const n=V.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&dp(a,n),Oe.get(e)?.setAttribute("title",n.name),mr(),We===e&&sp(n),oe.rename(e,n.name)}async function cp(e,t){const n=V.find(d=>d.id===e),a=n?.name??e,r=Ae.find(d=>d.id===n?.type)?.sound===!1;if(!await _e({title:`Remove ${a}?`,body:r?"Its tab goes, and what it plays stops. Its settings stay in this browser.":`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;bp(),V=V.filter(d=>d.id!==e),mn(V),Bu.forget(e),mt.forget(e),wt.drop(e);const s=Re.playing().includes(e);Re.drop(e),s&&Re.out(e);const l=Oe.get(e);Oe.delete(e),l?.setAttribute("src","about:blank"),l?.remove(),document.getElementById(`tab-${e}`)?.remove(),oe.detach(e),ex(e),dy(ke(),e),We===e&&at(V[0]?.id??""),mr()}function dp(e,t){const n=Ae.find(s=>s.id===t.type);if(n?.sound!==!1){e.textContent=t.name;return}const a=D("span",{class:"tab-dot","aria-hidden":"true"});n.identity&&(a.style.background=`var(--nc-ui-${n.identity})`);const r=D("span",{class:"tab-remove",role:"button",tabindex:"0","aria-label":`Remove ${t.name}`,title:`Remove ${t.name}`});r.textContent="×";const i=s=>{s.stopPropagation(),cp(t.id,e)};r.addEventListener("click",i),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&i(s)}),e.replaceChildren(a,D("span",{},t.name),r)}const Vi=D("div",{class:"mix"});Vi.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==We&&V.some(a=>a.id===n)&&at(n)});let rt=null,Yn=0;const Za=new Set;function ex(e){Za.add(e),delete Ce.channels[e],delete Ce.channelFx[e],pr.delete(e),Xn()}let br=!1;function Xn(){window.clearTimeout(Yn),!br&&(Yn=window.setTimeout(()=>{ou(up())},300))}function up(){const e={...Ce.channels};for(const r of oe.list())e[r.id]=r.strip;for(const r of Za)delete e[r];const t={};for(const r of["a","b"]){const i=un[r];i&&(t[r]=i.getState())}const n=oe.masterFx?.getState()??null,a={...Ce.channelFx};for(const[r,i]of pr)a[r]=i.getState();for(const r of Za)delete a[r];return{v:1,channels:e,master:oe.masterPositionValue,returns:{a:{on:oe.returns.a.on,level:oe.returns.a.level},b:{on:oe.returns.b.on,level:oe.returns.b.level}},insert:{on:n?Zb(n):Ce.insert.on},fx:t,channelFx:a,masterFx:n??Ce.masterFx}}oe.onChange(()=>{rt?.render(),Xn()});for(const e of Object.values(un))e?.onChange(Xn);async function yr(){J.state!=="running"&&await J.resume()}const Gl=1500;async function tx(){const e=performance.now()+Gl;await Promise.race([yr(),new Promise(t=>setTimeout(t,Gl))]),await it.whenSettled(Math.max(0,e-performance.now())),await Promise.race([Fo.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}Wn.addEventListener("click",()=>{yr(),H.running()&&Re.owner()===$o?H.stop():H.running()?Re.claimAll():(Re.claimAll(),H.play()),ot()});function pp(){const e=Number(pn.value);H.setTempo(e),Mu(H.bpm(),$e())}Pt.addEventListener("change",()=>{Pt.value=Bt(Pt.value),Tu(Pt.value,$e())});function nx(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=D("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Wu.addEventListener("click",()=>void hp());async function hp(){const e=Bt(Pt.value),t=V.map(i=>i.id),n=await rn.collect(t),a=iw({name:e,bpm:H.bpm(),instances:V,mix:up(),presets:n});nx(sw(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=V.filter(i=>!n[i.id]).map(i=>i.name);Be(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)}Gu.addEventListener("click",()=>_n.click());_n.addEventListener("change",async()=>{const e=_n.files?.[0];if(_n.value="",!e)return;const t=ow(await e.text(),Ae.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){Be(t.error);return}const n=t.scene;await _e({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&fp({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Ku.addEventListener("click",async()=>{await _e({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&fp({name:Ao,bpm:Ya,instances:Hn(Ae),mix:Un()})});function fp(e){H.running()&&H.stop(),br=!0,window.clearTimeout(Yn);const t=e.instances.map(({id:n,name:a})=>{const[r,i]=n.split("#"),s=Ae.find(l=>l.id===r);return s?fn(s,i?Number(i):1,a):null}).filter(n=>n!==null);mn(t),ou(e.mix),Mu(e.bpm,$e()),Tu(e.name,$e()),rn.stash({...e.presets??{}}),location.reload()}async function mp(e){const t=["Kept: your samples, LUCY takes and Scene files.","Kept: theme, folds and meters."];Ee.state==="recording"?t.push({text:"Rec is recording: its take will be lost.",tone:"danger"}):It&&!_u&&t.push({text:`Your last Rec take (${It.take.seconds.toFixed(1)} s) isn't saved.`,tone:"danger"}),await _e({title:"Reset the Studio?",body:"The music stops and the Studio starts over: one of each instrument at its factory sound and pattern, a fresh mix, 120 BPM. You can undo it for 30 seconds.",lines:t,extra:{label:"Save Scene first",onAction:()=>void hp()},confirmLabel:"Reset",danger:!0,returnFocus:e})&&gp("reset")}function gp(e){if(!ww(Lo(),e)){Be("This browser can't reset the Studio");return}H.running()&&H.stop(),br=!0,window.clearTimeout(Yn),location.reload()}let Hi=null;function ax(){const e=Qt({message:"Studio reset",actionLabel:"Undo",duration:dw,anchor:hn,onAction:()=>gp("undo"),onClose:t=>{Hi=null,t!=="action"&&ur(ke(),Lo())}});e.el.dataset.resetUndo="",Hi=e}function bp(){Hi?.close("close")}let Kl=0;function Be(e){Ja.textContent=e,Qa.textContent=e,window.clearTimeout(Kl),Kl=window.setTimeout(ot,4e3)}pn.addEventListener("change",pp);pn.addEventListener("keydown",e=>{e.key==="Enter"&&pp()});gt.addEventListener("click",()=>{yr();const e=Ee.state;e==="recording"?rx():e==="arming"||e==="armed"?(Ee.cancel(),Be("Rec cancelled")):e==="idle"&&(Ee.arm(H.playing()),yp())});async function rx(){const e=await Ee.stop();e&&(It&&URL.revokeObjectURL(It.url),It={url:URL.createObjectURL(e.blob),take:e},Cn.href=It.url,Cn.download=e.name,Cn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,Cn.hidden=!1,_u=!1)}function yp(){const e=Ee.state;if(e!=="arming"&&e!=="armed")return;const t=H.clock.transport;if(!t.running||t.startTime===null){Ee.schedule(null);return}const n=Math.round(it.toContextTime(t.startTime)*J.sampleRate);Ee.schedule(n+hr.latency("master"))}function ix(){const e=Ee.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";gt.dataset.state=t?"armed":n?"recording":"idle",gt.setAttribute("aria-pressed",String(n)),gt.textContent=t?"Armed":n?"Stop rec":"Rec",gt.disabled=e==="stopping"||!Ee.supported,ot()}Ee.onChange(ix);let Jn=null;function ox(){const e=H.clock.transport;!e.running||e.startTime===null||(Jn=Math.round(it.toContextTime(e.startTime)*J.sampleRate)+hr.latency("master"))}function vp(){return!H.clock.transport.running||Jn===null?null:{origin:Jn,barFrames:240/H.bpm()*J.sampleRate}}function wp(e){const t=Po[e];return!t||t.key==="since"&&Jn===null?null:t.choice(Jn??0)}function vr(){const e=!Ue.hidden;if(Ot.setAttribute("aria-expanded",String(e)),Ot.dataset.keeping=Te.keeping?"on":"off",!e)return;Gn.checked!==Te.keeping&&Gn.set(Te.keeping);const t=Te.status,n=Wd(t)/(t.sampleRate||J.sampleRate);Hu.textContent=Te.keeping?`${Li(n)} of sound held`:"Keeping is off";const a=vp();ta.forEach((r,i)=>{const s=wp(i),l=s?Te.plan(s,a):null;r.disabled=!l;const d=Po[i];d?.key==="since"&&(r.textContent=l?`Keep since Play (${Li((l.to-l.from)/(t.sampleRate||J.sampleRate))})`:d.label)})}Te.onChange(vr);function xp(){Ue.hidden&&(Ue.hidden=!1,Te.refresh(),vr(),(ta.find(e=>!e.disabled)??Gn.el).focus())}function aa(e=!1){Ue.hidden||(Ue.hidden=!0,vr(),e&&Ot.focus())}Ot.addEventListener("click",()=>{Ue.hidden?xp():aa()});document.addEventListener("pointerdown",e=>{!Ue.hidden&&!Uu.contains(e.target)&&aa()});Ue.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault(),aa(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const t=[...ta.filter(r=>!r.disabled),Gn.el],n=t.indexOf(document.activeElement);t[(n+(e.key==="ArrowDown"?1:t.length-1))%t.length]?.focus()});ta.forEach((e,t)=>e.addEventListener("click",()=>{const n=wp(t);n&&sx(n)}));async function sx(e){aa(!0);const t=await Te.keep(e,{grid:vp(),bpm:H.bpm()});if(!t){Be("Nothing held to keep");return}Vu=t;const n=URL.createObjectURL(t.blob);D("a",{href:n,download:t.name}).click(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),Be(`Kept ${Li(t.seconds)} as a WAV`)}document.addEventListener("keydown",e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.key!=="k"&&e.key!=="K")return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||Ot.disabled||(e.preventDefault(),Ue.hidden?xp():aa(!0))});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),Wn.click())});gn.addEventListener("keydown",e=>{if(e.target===on)return;const t=V.map(r=>r.id),n=t.indexOf(We),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),at(a),document.getElementById(`tab-${a}`)?.focus())});function ot(){const e=H.running()&&Re.owner()===$o;Wn.textContent=e?"Stop":"Play",Wn.setAttribute("aria-pressed",String(e)),document.activeElement!==pn&&(pn.value=String(Math.round(H.bpm()*10)/10));const t=H.position();Xa.value=t?`${t.bar}.${t.beat}`:"—";const n=H.peers().length;Ja.textContent=J.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Qa.textContent=J.state==="running"?"":"Audio off",(Ee.state==="arming"||Ee.state==="armed")&&(Ja.textContent="Rec armed: waiting for sound",Qa.textContent="Rec armed"),zo.classList.toggle("off",J.state!=="running")}H.clock.onChange(()=>{H.clock.transport.running&&(ju=!0),ox(),vr(),H.running()||Re.clear(),yp(),ot()});Re.onChange(ot);Re.onLastOut(()=>{H.running()&&H.stop(),ot()});H.clock.onChange(()=>rt?.render());H.peer.onPeers(ot);J.addEventListener("statechange",ot);const lx=.25;let Yl=performance.now();function kp(e){const t=Math.min(.1,(e-Yl)/1e3);Yl=e,rt?.frame(t);const n=H.position(),a=n?`${n.bar}.${n.beat}`:"—";Xa.value!==a&&(Xa.value=a);const r=H.beatPhase(),i=r!==null&&r<lx;qi.hasAttribute("data-on")!==i&&qi.toggleAttribute("data-on",i),requestAnimationFrame(kp)}async function cx(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(Yu,hn,Zu,Vi,D("main",{class:"instruments"},gn,D("div",{class:"bay"},Kn,ep),Ww),qu.el),rt=jy(Vi,oe,{order:()=>V.map(t=>t.id),catalogue:go.filter(t=>t.sound!==!1),bpm:()=>H.bpm(),onAdd:lp,onRemove:(t,n)=>void cp(t,n),onReorder:(t,n)=>Qw(t,n),onRename:(t,n)=>Zw(t,n),...qn?{plugins:qn}:{}}),J.state==="running"&&await J.suspend(),await J.audioWorklet.addModule(Fw),Xu.start(J,!0),zu(),Ee.attach(),Te.attach(),await H.start();for(const t of[un.a,un.b,oe.masterFx])t&&wc(t,H.clock,{mapper:it});for(const t of V)tp(t);at(We),ot(),requestAnimationFrame(kp),window.setInterval(()=>oe.parkIdleReturns(),Ky),document.documentElement.dataset.studioReady="",Mn&&(document.documentElement.dataset.studioReset=Mn),Mn==="reset"?ax():Mn==="undo"?Be("Reset undone"):Mn==="failed"&&Be("Couldn't reset: this browser's storage is full"),ux(),hx(),qn&&Yv({ctx:J,running:()=>Gv([...Io].map(t=>t.getChain())),onFrozen:dx})}async function dx(e){No.add(e.map(a=>a.id)),window.clearTimeout(Yn),br=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),Be(`${t} froze the audio`),await _e({title:O.frozenTitle,body:O.frozenBody(t),confirmLabel:O.frozenOpen,cancelLabel:O.frozenStay})&&window.open(location.href,"_blank")}function ux(){const e=new Set(rn.pending());if(!e.size)return;const t=[],n=i=>V.find(s=>s.id===i)?.name??i,a=()=>{window.clearTimeout(r);const i=[...t,...rn.dropPending()].map(n);Be(i.length?`Scene loaded; ${i.join(", ")} kept ${i.length===1?"its":"their"} own sound`:"Scene loaded")};rn.onApplied((i,s)=>{e.delete(i)&&(s||t.push(i),e.size||a())});const r=window.setTimeout(a,zb)}window.__studio={ctx:J,mixer:oe,grab:hr,recorder:Ee,get lastTake(){return It?.take??null},keeper:Te,get lastKeep(){return Vu},limiterDelay:Du,mapper:it,transport:H,frames:Oe,show:at,get instances(){return V},fx:un,plugins:qn,frozen:No,channelCores:pr,get mix(){return rt},notes:{bus:wt,dev:(e,t,n={})=>{const a=Vv(wt.source(e,e),H.clock,{settings:t});for(const[r,i]of Object.entries(n))a.source.setTarget(r,{role:i.role,on:i.on??!0,...i.octave===void 0?{}:{octave:i.octave}});return a}}};cx();function Bo(e){xt.dataset.picker=e,xt.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),xt.dataset.ncHelp=te[`picker:${e}`]}Bo("off");async function px(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function hx(){let e=Nu($e());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?Co(t):e.address;a&&(e={on:!0,address:a},Oi($e(),e))}if(!e.on)return;const n=await px();n==="granted"||n==="unknown"?mt.start(e.address):Bo(n==="denied"?"blocked":"ask")}xt.addEventListener("click",()=>void fx());async function fx(){const e=Nu($e()),t=xt.dataset.picker;if(t==="ask"||t==="blocked"){mt.start(e.address);return}if(mt.status!=="off"){if(!await _e({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:xt}))return;Oi($e(),{...e,on:!1}),mt.stop();return}await _e({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:xt})&&(Oi($e(),{...e,on:!0}),mt.start(e.address))}
