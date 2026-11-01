(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Xe=1e-9;function Qs(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Fa{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return Qs(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Xe&&(o=s.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=t.beat+Xe)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Xe){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Xe;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(t-r)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Fa({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Xe)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Xe)return n[a];return n[0]}}const Js=Object.freeze({beatsPerBar:4,beatUnit:4}),it=1e-9;function el(e){return Math.floor(e+it)}function Fo(e,t,n=!1){if(!(t>0))return e;const o=Math.ceil(e/t-it)*t;return n&&o<=e+it?o+t:o}class tl{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Fa({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Js}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-it&&(this.stopTime===null||t<this.stopTime-it)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-it?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=el(t/n),o=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:o,barPhase:o/n}}nextBar(t,n=!1){return Fo(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Io="nc-clock/snapshot",zo=1;function nl(e,t="local"){return{format:Io,version:zo,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function al(e,t){const n=il(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const xe=e=>typeof e=="number"&&Number.isFinite(e),gi=e=>e===null||xe(e);function il(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Io&&n("format"),(!xe(t.version)||Math.floor(t.version)!==zo)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!xe(t.anchor.beat)||!xe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&xe(a.beat)&&xe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!xe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!xe(t.meter.beatUnit))&&n("meter"),(!gi(t.startTime)||!gi(t.stopTime)||!xe(t.stoppedBeat))&&n("transport times"),t}class ol{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new tl(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){al(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return nl(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const rl="nc-sync/1",sl=1,ll="nc-sync",cl="nc-sync-leader",dl=0,Ro=.5,Do=.75;function ul(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Ro&&e<=Do?e:null}const Dn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),xt=e=>typeof e=="number"&&Number.isFinite(e),Yt=e=>typeof e=="string"&&e.length>0;function pl(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==sl||!Yt(t.type)||!Yt(t.from)||!xt(t.term)||!xt(t.seq)||!xt(t.sentAt))return null;switch(t.type){case"hello":return Yt(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return xt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&xt(t.slot)?t:null;case"ping":case"pong":return Yt(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function ml(e,t,n,a,o){return{proto:rl,from:t,term:n,seq:a,sentAt:o,...e}}function Te(){return(performance.timeOrigin+performance.now())/1e3}const Bn=.003,hl=3,On=.002+1e-6,fl=.01,bi=500;class gl{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?fl:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Bn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(a&&r){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<c.length;p++)d.push(c[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,u=t-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:t-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const s=t[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const o=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=Bn&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<bi)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=Bn)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<bi)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(hl,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(t[c]-t[l])<=On&&u++;u>r&&(o=l,r=u)}if(r<a)return;const s=t[o];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>On&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=On}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class bl{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Dn,...t.capabilities},this.channelOption=t.channel??ll,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),r=()=>{n===this.startWaits&&t(o)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?o:Math.max(t+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[o,r]=this.tempoRange();t=Math.min(r,Math.max(o,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Fo(u,1),u);a&&a>0?(s.tempo.rampTempo(t,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,c),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Do,Math.max(Ro,t)):dl;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=ul(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=pl(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Dn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Dn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(cl,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=r.id)}this.setLeader(o===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(ml(t,this.id,this.term,++this.seq,this.o.now()))}}const yl="modulepreload",wl=function(e){return"/studio/"+e},yi={},vl=function(t,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");o=s(n.map(c=>{if(c=wl(c),c in yi)return;yi[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":yl,d||(h.as="script"),h.crossOrigin="",h.href=c,u&&h.setAttribute("nonce",u),document.head.appendChild(h),d)return new Promise((g,y)=>{h.addEventListener("load",g),h.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var xl=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],aa=[.25,.5,.75,1,1.5,2],$l=4.9,_={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},qe={fmt:"wet"},pe={fmt:"pct"},Ue={fmt:"db"},Zt={fmt:"signedPct"},Pn={fmt:"num",suffix:" ms"},q={div:100};function T(e,t,n,a,o,r,s,l){var u={key:e,label:t,min:n,max:a,default:o,step:1,k:r,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function Vt(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Lt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:_.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:_.hpQ},{dsp:{law:_.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:_.bpHz,astrid:!0},{dsp:{law:_.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:_.bpQ},{dsp:{law:_.bpQ}}),T("mix","Mix",0,100,100,3,qe,{dsp:q,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Vt(xl),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,pe,{dsp:q,unit:"%"}),T("mix","Wet/dry",0,100,0,3,qe,{dsp:q,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:_.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Vt([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,pe,{dsp:q,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,Zt,{dsp:q,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,Pn,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:q,unit:"%"}),T("decay","Decay",0,100,50,3,pe,{dsp:q,unit:"%"}),T("damping","Damping",0,100,0,4,pe,{dsp:q,unit:"%"}),T("mix","Mix",0,100,0,5,qe,{dsp:q,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,70,2,pe,{dsp:q,unit:"%"}),T("feedback","Feedback",-90,90,50,3,Zt,{dsp:q,unit:"%"}),T("mix","Mix",0,100,50,4,qe,{dsp:q,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,50,2,pe,{dsp:q,unit:"%"}),T("spread","Spread",0,100,70,3,pe,{dsp:q,unit:"%"}),T("mix","Mix",0,100,40,4,qe,{dsp:q,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:_.rate},{dsp:{law:_.rate}}),T("depth","Depth",0,100,70,2,pe,{dsp:q,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Vt([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,pe,{dsp:q,unit:"%"}),T("mix","Mix",0,100,50,5,qe,{dsp:q,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,Ue,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,Ue,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:_.midHz,astrid:!0},{dsp:{law:_.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:_.eqQ},{dsp:{law:_.eqQ}}),T("high_db","High",-18,18,0,4,Ue,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,Ue,{unit:"dB"}),T("mix","Mix",0,100,100,3,qe,{dsp:q,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Vt([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:_.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,Zt,{dsp:q,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,Zt,{dsp:q,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,Ue,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:_.ratio},{dsp:{law:_.ratio}}),T("attack_ms","Attack",1,100,10,3,Pn,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,Pn,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,Ue,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,pe,{dsp:q,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:q})]}],kl=Lt.map(function(e){return e.type}),El=Lt.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Al={reverb:"plate"};function Ia(e){var t=Al[e]||e;return kl.indexOf(t)>=0?t:null}function ce(e){for(var t=Ia(e),n=0;n<Lt.length;n++)if(Lt[n].type===t)return Lt[n];return null}function Sl(e,t){var n=ce(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function et(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function un(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=et(n.law,t);return a===null?0:a}function wi(e,t){return Math.min($l,e*60/(t>0?t:120))}var vi=function(e){return e>0?"+":e<0?"−":""};function Ml(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Bo(e,t,n){var a=e.format,o;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:vi(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return vi(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(o=et(a.law,t),o===null?a.zero||"open":a.astrid?Ml(o):o+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+et(a.law,t).toFixed(1);case"ratio":return et(a.law,t).toFixed(1)+":1";case"rate":return o=et(a.law,t),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(wi(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(wi(t,n)*1e3)+" ms"}return String(t)}var Ll=1,Ln=["drive","delay","plate"];function Tl(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,o){return Bo(e,a,o)},t}var ot=Ln.map(function(e){var t=ce(e),n={type:e,label:t.label,dials:t.dials.map(Tl)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Cl={reverb:"plate"};function pn(e){var t=Cl[e]||e;return Ln.indexOf(t)>=0?t:null}function Tn(e){for(var t=pn(e),n=0;n<ot.length;n++)if(ot[n].type===t)return ot[n];return null}function Oo(e,t){var n=Tn(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function ut(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function De(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,o=1;o<e.options.length;o++)Math.abs(e.options[o].value-t)<Math.abs(a-t)&&(a=e.options[o].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function Nl(){return{v:Ll,chain:ot.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Fl(e){return aa.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},aa[0])}function qn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Il(e){for(var t=Array.isArray(e)?e:qn(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Nl(),o={},r=[],s=0;s<t.length;s++){var l=t[s];if(qn(l)){var u=pn(l.type);if(!u){typeof l.type=="string"&&r.push(l.type);continue}if(o[u]){r.push(u);continue}o[u]=!0;var c=a.chain[Ln.indexOf(u)],d=qn(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,Tn(u).dials.forEach(function(p){c.dials[p.key]=De(p,d[p.key])}),zl(u,c.dials,d)}}return{state:a,dropped:r}}function zl(e,t,n){for(var a=Tn(e),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(t[r.key]=De(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],ut(r,t)))}}function mn(e){return Il(e).state}function Rl(e){return JSON.parse(JSON.stringify(e))}var Dl=24,ia={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function oa(e,t,n){if(t==="bypass")return n?0:1;var a=Oo(e,t)||Bl(e,t);return a?un(a,n):0}function Bl(e,t){var n=ce(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Ol={};ot.forEach(function(e){e.dials.forEach(function(t){Ol[e.type+"."+t.key]=t.format})});function Hn(e,t){var n=new Float64Array(Dl),a=mn(e);return a.chain.forEach(function(o){var r=ia[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=oa(o.type,s,o.dials[s])})}),n}var Pl=2,hn=3,ql=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function $t(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Po(e,t){var n=ce(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function Hl(e){var t=ce(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function jl(e,t,n){var a=e.length-1,o=Math.max(0,Math.min(a,n));if(t<0||t>a||t===o)return e;var r=e.slice(),s=r.splice(t,1)[0];return r.splice(o,0,s),r}function _l(e){return typeof e=="number"&&isFinite(e)?Fl(e):e}function xi(e,t,n){var a={};return e.dials.forEach(function(o){var r=t[o.key];r===void 0&&o.astridKey&&(r=t[o.astridKey]),n&&e.type==="delay"&&o.key==="delay_beats"&&(r=_l(r)),a[o.key]=De(o,r)}),e.dials.forEach(function(o){o.stepWhen&&(a[o.key]=De(o,typeof t[o.key]=="number"?t[o.key]:a[o.key],ut(o,a)))}),a}function Wl(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,o=1/0,r=e.min;r<=e.max;r++){var s=et(n.law,r),l=s===null?1/0:Math.abs(s-t);l<o&&(o=l,a=r)}return a}}var Gl={rate:"rate_hz"};function Yl(e,t,n,a){var o={};return e.dials.forEach(function(r){if(!r.more){var s=r.astridKey||Gl[r.key]||r.key;o[r.key]=Wl(r,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function Zl(e,t){var n=t>0?Math.floor(t):hn,a=[],o=[],r=[],s=!1,l=!1;Array.isArray(e)?(r=e,l=!0):$t(e)&&Array.isArray(e.chain)&&(r=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],c=0;c<r.length;c++){var d=r[c];if($t(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=Ia(d.type),h=p&&ce(p);if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var g;$t(d.params)&&!$t(d.dials)?g=xi(h,Yl(h,d.params,o,d.id||p),l):g=xi(h,$t(d.dials)?d.dials:{},l);var y=Po(p,u),w=typeof d.id=="string"&&ql.test(d.id)&&!u.some(function(f){return f.id===d.id})?d.id:y.id,m=s?d.bypass!==!1:d.bypass===!0;u.push({id:s?y.id:w,type:p,bypass:m,dials:g})}}return{state:{v:Pl,chain:u},dropped:a,notes:o}}function rt(e,t){return Zl(e,t).state}function Ke(e){var t=ce(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,un(a,e.dials[a.key])])}),n}function Vl(e){var t=rt(e,8),n=[],a=t.chain.map(function(o,r){var s=ce(o.type),l={};return r>=hn&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=o.dials[u.key];if(u.more){c!==u.default&&n.push(o.id+"."+u.key);return}u.key==="delay_beats"&&aa.indexOf(c)<0&&n.push(o.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var Xl=150,Ul=6e3,Kl=18,qo=6.283185307179586;function Cn(e,t,n){return e<t?t:e>n?n:e}function Ql(e,t,n,a,o){var r=Math.pow(10,n/40),s=qo*t/o,l=Math.cos(s),u=Math.sin(s),c,d,p,h,g,y,w,m;if(e===0||e===2){w=u/2*Math.SQRT2,m=2*Math.sqrt(r)*w;var f=e===0?1:-1;c=r*(r+1-f*(r-1)*l+m),d=f*2*r*(r-1-f*(r+1)*l),p=r*(r+1-f*(r-1)*l-m),h=r+1+f*(r-1)*l+m,g=-f*2*(r-1+f*(r+1)*l),y=r+1+f*(r-1)*l-m}else w=u/(2*a),c=1+w*r,d=-2*l,p=1-w*r,h=1+w/r,g=-2*l,y=1-w/r;return[c/h,d/h,p/h,g/h,y/h]}function Jl(e,t,n){var a=qo*t/n,o=Math.cos(a),r=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*o+e[2]*s,c=-(e[1]*r+e[2]*l),d=1+e[3]*o+e[4]*s,p=-(e[3]*r+e[4]*l);return 10*Math.log10((u*u+c*c)/(d*d+p*p))}var $i={};function Be(e){return $i[e]||($i[e]=Sl("eq",e))}function Je(e,t){var n=Be(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Cn(a,n.min,n.max)}function Ho(e){return[{id:"low",kind:0,hz:Xl,db:Je(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:un(Be("mid_hz"),Je(e,"mid_hz")),db:Je(e,"mid_db"),q:un(Be("mid_q"),Je(e,"mid_q"))},{id:"high",kind:2,hz:Ul,db:Je(e,"high_db"),q:Math.SQRT1_2}]}function ec(e,t,n){for(var a=Ho(e),o=n.length,r=new Float64Array(o),s=[],l=t/2,u=0;u<a.length;u++){var c=a[u],d=new Float64Array(o);if(c.db!==0)for(var p=Ql(c.kind,c.hz,c.db,c.q,t),h=0;h<o;h++){var g=n[h]<l?n[h]:l*.9999;d[h]=Jl(p,g,t),r[h]+=d[h]}s.push(d)}return{total:r,bands:s}}function tc(e){var t=Be("mid_hz").dsp.law;return Cn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function nc(e){var t=Be("mid_q").dsp.law;return Cn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var fn={low:"low_db",mid:"mid_db",high:"high_db"},ac={low:"Low",mid:"Mid",high:"High"};function ic(e,t,n){var a=[];function o(r,s){var l=Be(r),u=l.step||1;s=Cn(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==Je(e,r)&&a.push([r,s])}return typeof n.db=="number"&&fn[t]&&o(fn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&o("mid_hz",tc(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&o("mid_q",nc(n.q)),a}function oc(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:fn[e]?[fn[e]]:[];return t.map(function(n){return[n,Be(n).default]})}var Xt=typeof WeakMap=="function"?new WeakMap:null;function rc(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=Xt&&Xt.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},Xt&&Xt.set(e,n)),n.handle}function sc(e,t,n){var a=n||{},o={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(d){var p=e&&typeof e.getParam=="function"?e.getParam(t,d):void 0;o[d]=typeof p=="number"?p:Be(d).default});var r=e&&e.output&&e.output.context,s=a.sampleRate||r&&r.sampleRate||48e3,l=a.help||{},u=Ho(o).map(function(d){var p=(d.db>0?"+":d.db<0?"−":"")+Math.abs(d.db)+" dB",h=d.hz>=1e3?(d.hz/1e3).toFixed(d.hz>=1e4?0:1)+" kHz":Math.round(d.hz)+" Hz";return{id:d.id,label:ac[d.id],kind:d.kind===0?"lowshelf":d.kind===1?"peak":"highshelf",hz:d.hz,db:d.db,q:d.q,moveHz:d.id==="mid",moveQ:d.id==="mid",minHz:d.id==="mid"?200:d.hz,maxHz:d.id==="mid"?5e3:d.hz,minQ:.3,maxQ:6,valueText:d.id==="mid"?p+" at "+h+", Q "+d.q.toFixed(1):p+(d.id==="low"?", shelf below ":", shelf above ")+h,help:l[d.id]}}),c=function(d){for(var p=0;p<d.length;p++)a.set(d[p][0],d[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Kl,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(d){return ec(o,s,d)},spectrum:a.spectrum===!1?void 0:rc(e)||void 0,onBand:function(d,p){c(ic(o,d,p))},onReset:function(d){c(oc(d).filter(function(p){return p[1]!==o[p[0]]}))}}}var lc="nc-fx@1",cc=600,dc=256,uc=8,kt=typeof WeakMap=="function"?new WeakMap:null;function pc(e,t){var n=kt&&kt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await vl(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),kt&&(kt.set(e,n),n.catch(function(){kt.delete(e)})),n)}function Qe(e,t){return typeof e=="number"&&isFinite(e)?e:t}function jo(e,t,n,a){var o=Math.min(400,Math.max(20,Qe(t.bpm,120))),r=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=Qe(t.preGain,1),c=Math.max(0,Qe(t.crossfade,.012)),d=Qe(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),g=e.createGain(),y=e.createGain(),w=null;t.modInput===!0&&(w=e.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),y.gain.value=0,p.connect(g),g.connect(h),y.connect(h);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o,mUsers:0,lv:null,lvAt:0},f=n(o);m.post=function(x){m.node?m.node.port.postMessage(x):m.disposed||(r.length>=dc&&(r=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&r.push({t:"meter",on:!0})),r.push(x))};function b(x){var k=r.map(function(S){var F=Object.assign({},S);return F.when>x||(F.when=0,F.t!=="clear"&&(F.snap=!0)),F});return r=[],k}m.emit=function(x){for(var k=0;k<m.listeners.length;k++)try{m.listeners[k](x)}catch(S){typeof console<"u"&&console.error(S)}},m.whenOf=function(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0};var v=!1;m.tooFar=function(x){return typeof x=="number"&&x>e.currentTime+cc?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=pc(e,t.moduleUrl).then(function(){if(!m.disposed){var x=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:d},f);x.pending=b(e.currentTime),m.node=new AudioWorkletNode(e,lc,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:x}),m.node.port.onmessage=function(S){var F=S.data;F&&F.t==="lv"&&m.mUsers>0&&(m.lv=F.d,m.lvAt=ki())},p.connect(m.node),w&&w.connect(m.node,0,1),m.node.connect(y);var k=e.currentTime;k<=0||c===0?(g.gain.value=0,y.gain.value=1):(g.gain.setValueAtTime(1,k),g.gain.linearRampToValueAtTime(0,k+c),y.gain.setValueAtTime(0,k),y.gain.linearRampToValueAtTime(1,k+c)),m.status="ready"}},function(x){m.status="unavailable",r=[],m.error=x});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&ki()-m.lvAt<mc?m.lv:null};var A={};return m.meter=function(x,k){if(A[x])return A[x];var S=0,F={in:0,out:0},j={open:function(){return m.meterOpen()?(S++,!0):!1},close:function(){S!==0&&(S--,m.meterClose())},read:function(){var V=S>0?m.levels():null;return F.in=0,F.out=0,V&&k(V,F),F}};return A[x]=j,j},m.core={input:p,output:h,modInput:w,ready:E,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(x,k){var S=Qe(x,NaN);!(S>0)||m.disposed||m.tooFar(k)||(m.bpm=Math.min(400,Math.max(20,S)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(k)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(x){var k=x&&typeof x=="object"?x:{at:x};if(!(m.disposed||m.tooFar(k.at))){var S=Qe(k.fadeMs,0);m.post({t:"clear",when:m.whenOf(k.at),fadeMs:S>0?Math.min(1e3,S):0})}},onChange:function(x){return m.listeners.push(x),function(){var k=m.listeners.indexOf(x);k>=0&&m.listeners.splice(k,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",r=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,g,y,h,w].forEach(function(x){try{x&&x.disconnect()}catch{}})}}},m}var mc=250;function ki(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function _o(e,t){t.in=e[0],t.out=e[1]}function jn(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function _n(e,t){var n=t||{};if(n.slots)return hc(e,n);var a=mn(n.state),o=Array.from(Hn(a)),r=jo(e,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Hn(a)),when:0}]}),s=r.core;function l(u){return a.chain[Ln.indexOf(u)]}return s.setParam=function(u,c,d,p){var h=pn(u);if(!(!h||r.disposed||r.tooFar(p))){var g=l(h),y;if(c==="bypass")y=!!d;else{var w=Oo(h,c);if(!w)return;y=De(w,d,ut(w,g.dials))}return c==="bypass"?g.bypass=y:g.dials[c]=y,r.post({t:"p",i:ia[h][c],v:oa(h,c,y),when:r.whenOf(p)}),r.emit({effect:h,key:c,value:y}),Tn(h).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(v){return v.key===c}))){var f=g.dials[m.key],b=De(m,f,ut(m,g.dials));b!==f&&(g.dials[m.key]=b,r.post({t:"p",i:ia[h][m.key],v:oa(h,m.key,b),when:r.whenOf(p)}),r.emit({effect:h,key:m.key,value:b}))}}),y}},s.meter=function(){return r.meter("",_o)},s.getParam=function(u,c){var d=pn(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},s.getState=function(){return Rl(a)},s.setState=function(u,c){r.disposed||r.tooFar(c&&c.at)||(a=mn(u),r.post({t:"load",program:Array.from(Hn(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},s}function hc(e,t){var n=t.slots===!0?hn:Math.max(1,Math.min(uc,Math.floor(+t.slots)||hn)),a=rt(t.state,n),o=1,r={};function s(m){return r[m.id]||(r[m.id]=o++),r[m.id]}function l(m){return m.map(function(f){return{uid:s(f),type:f.type,program:Ke(f)}})}var u=l(a.chain),c=a.chain.map(function(m){return r[m.id]}),d=jo(e,t,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(m){return r[m.id]}),when:0}]}),p=d.core;function h(m){var f;for(f=0;f<a.chain.length;f++)if(a.chain[f].id===m)return a.chain[f];var b=Ia(m);if(b){for(f=0;f<a.chain.length;f++)if(a.chain[f].type===b)return a.chain[f]}return null}function g(m,f){var b=s(m);d.post({t:"add",uid:b,type:m.type,when:f}),Ke(m).forEach(function(v){d.post({t:"ps",uid:b,k:v[0],v:v[1],when:f,snap:!0})})}function y(m){d.post({t:"order",uids:a.chain.map(function(f){return r[f.id]}),when:m})}function w(m,f){var b={};a.chain.forEach(function(A){b[A.id]=A});var v=a.chain.map(function(A){return r[A.id]}).join();m.chain.forEach(function(A){var x=b[A.id];if(!x||x.type!==A.type){delete r[A.id],g(A,f);return}var k={};Ke(x).forEach(function(S){k[S[0]]=S[1]}),Ke(A).forEach(function(S){k[S[0]]!==S[1]&&d.post({t:"ps",uid:r[A.id],k:S[0],v:S[1],when:f})})});var E={};m.chain.forEach(function(A){E[A.id]=!0}),Object.keys(r).forEach(function(A){E[A]||delete r[A]}),a=m,a.chain.map(function(A){return r[A.id]}).join()!==v&&y(f)}return p.slots=n,p.meter=function(m){return m==null||m===""?d.meter("",_o):d.meter("#"+m,function(f,b){var v=h(m),E=v?r[v.id]:0,A=f[2];if(E){for(var x=3,k=0;k<A;k++,x+=3)if(f[x]===E){b.in=f[x+1],b.out=f[x+2];return}}})},p.setParam=function(m,f,b,v){var E=h(m);if(!(!E||d.disposed||d.tooFar(v))){var A=ce(E.type),x,k=null;if(f==="bypass")x=!!b;else{for(var S=0;S<A.dials.length;S++)A.dials[S].key===f&&(k=A.dials[S]);if(!k)return;x=De(k,b,ut(k,E.dials))}var F={},j={};Ke(E).forEach(function(R){F[R[0]]=R[1]}),A.dials.forEach(function(R){R.stepWhen&&(j[R.key]=E.dials[R.key])}),f==="bypass"?E.bypass=x:E.dials[f]=x,A.dials.forEach(function(R){R.stepWhen&&(E.dials[R.key]=De(R,E.dials[R.key],ut(R,E.dials)))});var V=d.whenOf(v),ee=r[E.id];return Ke(E).forEach(function(R){(F[R[0]]!==R[1]||k&&R[0]===k.k)&&d.post({t:"ps",uid:ee,k:R[0],v:R[1],when:V})}),d.emit({effect:E.id,key:f,value:x}),Object.keys(j).forEach(function(R){R!==f&&E.dials[R]!==j[R]&&d.emit({effect:E.id,key:R,value:E.dials[R]})}),x}},p.getParam=function(m,f){var b=h(m);if(b)return f==="bypass"?b.bypass:b.dials[f]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(m,f){d.disposed||d.tooFar(f&&f.at)||(w(rt(m,n),d.whenOf(f&&f.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(m,f){var b=f||{},v=Po(m,a.chain);if(!(!v||a.chain.length>=n||d.disposed||d.tooFar(b.at))){if(b.dials){var E=rt({v:2,chain:[{id:v.id,type:v.type,dials:b.dials}]},1).chain[0];v.dials=E.dials}b.bypass===!0&&(v.bypass=!0);var A=a.chain.slice(),x=typeof b.index=="number"?Math.max(0,Math.min(A.length,b.index)):A.length;return A.splice(x,0,v),w({v:2,chain:A},d.whenOf(b.at)),d.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(m,f){var b=h(m),v=f&&f.at;return!b||d.disposed||d.tooFar(v)?!1:(w({v:2,chain:a.chain.filter(function(E){return E!==b})},d.whenOf(v)),d.emit({effect:b.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(m,f,b){var v=h(m),E=b&&b.at;if(!v||d.disposed||d.tooFar(E))return!1;var A=jl(a.chain,a.chain.indexOf(v),f);return A===a.chain?!1:(w({v:2,chain:A},d.whenOf(E)),d.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(m){return{id:m.id,type:m.type,name:Hl(m),bypass:m.bypass}})},p.toAstrid=function(){return Vl(a)},p}function Ei(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Wo(e,t,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(h){return o.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,c=!1;function d(h){if(!r){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var g=r(l.timeAt(h));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var g=l&&typeof l.bpm=="number"?l.bpm:Ei(u,0);g>0&&e.setTempo(g);return}var y=Ei(u,h);y>0&&e.setTempo(y);for(var w=u&&(u.points||u.tempoPoints)||[],m=0;m<w.length;m++){var f=w[m];if(f.beat>h&&f.bpm>0){var b=d(f.beat);b!==void 0&&e.setTempo(f.bpm,b)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,d(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const nn="/studio/assets/worklet-CAv1bvAp.js";var fc="nc-ui",gc={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},za={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},gn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},bc={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},_e={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},yc={light:{color:gc.color,semantic:za,component:gn,runtime:bc},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#2C2B2A",accent:"#69A7D3","accent-wash":"rgba(105,167,211,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#201F1E","shade-2":"#252423","shade-3":"#2A2928","shade-4":"#2F2E2D","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#9F9E9D","sub-1":"#8D8C8B","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#353433","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#5A8BAE","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#9F9E9D",divider:"#353433","surface-raised":"#2C2B2A",accent:"#69A7D3","accent-tint":"#272E32","accent-soft":"rgba(105,167,211,0.1)","accent-faint":"rgba(105,167,211,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#201F1E","module-bg-adjacent-2":"#252423","module-bg-adjacent-3":"#2A2928","module-bg-adjacent-4":"#2F2E2D","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#8D8C8B","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#353433","slider-progress":"#69A7D3","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#69A7D3",playhead:"#69A7D3","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#2C2B2A","slot-active-bg":"#69A7D3","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#4B91C3","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#69A7D3","meter-clip":"#DD7D6E","meter-track":"#353433","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#69A7D3","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#69A7D3","strip-bg":"#201F1E","strip-alt-bg":"#252423","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#353433","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#5A8BAE","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#69A7D3",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(105,167,211,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#69A7D3","track-mute":"#9F9E9D","track-solo":"#69A7D3","velocity-bar":"#69A7D3","velocity-min":"#5A8FB5","velocity-max":"#69A7D3","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#69A7D3","lane-3":"#CC985C","lane-4":"#9F9E9D","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#2C2B2A","surprise-ink":"#E8E7E6","surprise-on":"#69A7D3","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},At=e=>`--${fc}-${e}`,ra=za["label-on-fill-dark"],Ai=za["label-on-fill-light"],wc=_e["label-min-contrast"],vc=/^#[0-9a-f]{6}$/i,xc=e=>typeof e=="string"&&vc.test(e),an=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Si(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),o=r=>{let s=(r+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${an(o(0)*255)}${an(o(8)*255)}${an(o(4)*255)}`}function Go(e){let[t,n,a]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),o=Math.max(t,n,a),r=Math.min(t,n,a),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((o===t?60*((n-a)/l%6):o===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function Mi(e){let[t,n,a]=[1,3,5].map(o=>{let r=parseInt(e.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function sa(e,t){let[n,a]=[Mi(e),Mi(t)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var bn=e=>sa(e,ra)>=sa(e,Ai)?ra:Ai;function Yo(e,t,n,a=wc){let o=Si(e,t,n),r=bn(o)===ra?1:-1;for(let s=0;s<40&&sa(o,bn(o))<a;s++)n+=r*.01,o=Si(e,t,n);return o}function $c(e){let{h:t,s:n}=Go(e),a=Yo(t,Math.min(n,_e["surprise-on-max-saturation"]),_e["surprise-on-lightness"]);return{fill:e,ink:bn(e),on:a,onInk:bn(a)}}var kc=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Ec(e,t=Math.random){let[n,a]=_e["surprise-saturation"],[o,r]=_e["surprise-lightness"],s=_e["surprise-min-hue-gap"],l=xc(e)?Go(e).h:null,u=t()*360;return l!==null&&kc(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Yo(u,n+t()*(a-n),o+t()*(r-o))}function Ac(e){if(!e)return null;let t=$c(e);return{[At("surprise-fill")]:t.fill,[At("surprise-ink")]:t.ink,[At("surprise-on")]:t.on,[At("surprise-on-ink")]:t.onInk}}var Sc=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Mc=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Li(e){let[t,n,a]=[1,3,5].map(l=>Sc(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function Lc([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(s=>an(Mc(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Tc=_e["velocity-range"],Zo={min:gn.rhythm["velocity-min"],max:gn.rhythm["velocity-max"]},Ti=Object.fromEntries(Object.entries(yc).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Cc(e,t=Zo){let[n,a]=Tc,o=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(o-n)/(a-n),s=t.ink??gn.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:s};let l=Li(t.min),u=Li(t.max);return{velocity:o,t:r,fill:Lc(l.map((c,d)=>c+(u[d]-c)*r)),ink:s}}function Ci(e,t=Zo){return{[At("velocity-fill")]:Cc(e,t).fill}}var yn="data-nc-theme",la="nc-ui-theme-change",Nc=Object.freeze(["system","light","dark"]),Fc="netcomposer.studio.theme.v1",Ic="(prefers-color-scheme: dark)",Ra=e=>e?.documentElement??null,Vo=e=>e?.defaultView?.matchMedia?.(Ic)??null,Da=e=>e==="light"||e==="dark"?e:"system";function zc(e=globalThis.document){return Da(Ra(e)?.getAttribute(yn))}function wn(e=globalThis.document){let t=zc(e);return t!=="system"?t:Vo(e)?.matches?"dark":"light"}function Ba(e,t=globalThis.document){let n=Ra(t);if(!n)return"light";let a=Da(e);a==="system"?n.removeAttribute(yn):n.setAttribute(yn,a);let o=wn(t),r=t.defaultView?.CustomEvent;return r&&t.dispatchEvent(new r(la,{detail:{choice:a,theme:o}})),o}function Xo(e,t=globalThis.document){let n=Ra(t);if(!n)return()=>{};let a=wn(t),o=()=>{let u=wn(t);u!==a&&(a=u,e(u))},r=t.defaultView?.MutationObserver,s=r?new r(o):null;s?.observe(n,{attributes:!0,attributeFilter:[yn]});let l=Vo(t);return l?.addEventListener?.("change",o),t.addEventListener(la,o),()=>{s?.disconnect(),l?.removeEventListener?.("change",o),t.removeEventListener(la,o)}}var Rc={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Dc={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Bc={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Oc={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Nn={};for(let[e,t]of Object.entries(Dc))Nn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Oc))Nn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Bc))Nn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Rc.renames.map(e=>[e.old,e.new]));function Uo(e){let t=Nn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function Z(e){return Uo(e).prop}function i(e){return`var(${Z(e)})`}function Pc(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(Z(t)));return Number.isFinite(n)?n:0}function K(e,t){let n=Uo(t),a=e.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(e instanceof Element?e:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function qc(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Hc(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var jc="[data-modulated], [data-modulated] *",_c="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Ni(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Wc(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${Z("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${Z("divider")}: ${i(`module-div-stack-${a}`)};
      ${Z("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${Z("text-sub")}: ${i("module-sub-stack-1")};
      ${Z("divider")}: ${i("module-div-stack-1")};
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
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${i("module-pad")}; }
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
${jc} { transition: none; }
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
.nc-ui-fx-visual { display: block; width: 100%; height: ${i("display-height")}; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${i("module-gap")} * -1); }
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
  ${Z("text-sub")}: ${i("module-sub-stack-1")};
  ${Z("divider")}: ${i("module-div-stack-1")};
  ${Z("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${i("fx-card-width")});
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
  ${Z("text-sub")}: ${i("module-sub-stack-1")};
  ${Z("divider")}: ${i("module-div-stack-1")};
  ${Z("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${Z("text-sub")}: ${i("module-sub-stack-1")};
  ${Z("divider")}: ${i("module-div-stack-1")};
  ${Z("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${Z("text-sub")}: inherit;
  ${Z("divider")}: inherit;
  ${Z("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${i("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${i("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${i("module-bg-adjacent-4")}; }
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
    width: ${i("fx-fold-width")};
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
    width: ${i("fx-fold-width")};
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
    width: ${i("fx-fold-width")};
    margin-inline-end: calc(${i("fx-fold-width")} * -1);
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
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
  padding-inline: ${i("control-gap")};
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${i("hairline")} solid ${i("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${i("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${i("strip-alt-bg")}; }
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
.nc-strip[data-nc-folded] { width: ${i("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${i("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
  grid-template-columns: auto auto;
  column-gap: ${i("control-gap")};
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] > .nc-strip-body { grid-row: 5; }
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
.nc-strip-ms { display: flex; gap: ${i("control-gap")}; height: ${i("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${i("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${i("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${i("hairline")} solid ${i("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${i("text-sub")} 50%, ${i("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${i("text-sub")}; }
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
    radial-gradient(closest-side, ${i("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${i("surface-page")} 70%, transparent 72%),
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
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
${Ni("")}
}
@media (max-width: 1023px) {
${Ni("html[data-nc-landscape] ")}
}
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
`}var Wn=null,Gc="nc-ui-fallback";function Ko(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Wn&&Wn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Gc} {
${Wc()}
}
`,e.head.append(t),Wn=t}var Et=null,Yc=0,Zc=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Qo=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Zc,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Qo(document);function Oa({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:o=!1,root:r,returnFocus:s,signal:l}){if(Et||l?.aborted)return Promise.resolve(!1);let u=r?.ownerDocument??document,c=Qo(u),d=r??u.body,p=u.defaultView??globalThis,h=`nc-ui-confirm-${++Yc}`,g=(C,oe,G)=>{let U=u.createElement(C);return U.className=`nc-ui-confirm${oe}`,G!=null&&(U.textContent=G),U},y=g("div","-layer");y.dataset.state="enter";let w=g("div","");w.setAttribute("role","alertdialog"),w.setAttribute("aria-modal","true"),w.setAttribute("aria-labelledby",`${h}-t`),w.setAttribute("aria-describedby",`${h}-b`);let m=g("h2","-title",e);m.id=`${h}-t`;let f=g("p","-body",t);f.id=`${h}-b`;let b=g("div","-actions"),v=(C,oe)=>{let G=g("button","-btn",C);return G.type="button",G.dataset.ncConfirm=oe,G.addEventListener("click",()=>ge(oe==="ok")),G},E=v(a,"cancel"),A=v(n,"ok");o&&(A.dataset.danger="true"),b.append(E,A),w.append(m,f,b),y.append(w);let x={layer:y};Et=x;let k=s??u.activeElement,S=[];for(let C of d.children)C.hasAttribute("inert")||(C.setAttribute("inert",""),S.push(C));let F=()=>{if(Et!==x)return;d.append(y),E.focus({preventScroll:!0});let C=p.requestAnimationFrame?.bind(p)??(oe=>setTimeout(oe,16));C(()=>C(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(F):F();let j=!1;y.addEventListener("pointerdown",C=>{j=C.target===y}),y.addEventListener("click",C=>{C.target===y&&j&&ge(!1),j=!1});let V=C=>{C.stopImmediatePropagation(),C.key==="Escape"?(C.preventDefault(),ge(!1)):C.key==="Tab"?(C.preventDefault(),(u.activeElement===E?A:E).focus()):C.key==="Enter"&&(C.preventDefault(),u.activeElement===A?ge(!0):u.activeElement===E&&ge(!1))},ee=C=>C.stopImmediatePropagation();p.addEventListener("keydown",V,!0),p.addEventListener("keyup",ee,!0);let R=()=>ge(!1);l?.addEventListener("abort",R);let ue,_t=new Promise(C=>{ue=C});function ge(C){if(Et!==x)return;Et=null,p.removeEventListener("keydown",V,!0),p.removeEventListener("keyup",ee,!0),l?.removeEventListener("abort",R);for(let be of S)be.removeAttribute("inert");y.dataset.state="closing",k?.isConnected&&typeof k.focus=="function"&&k.focus({preventScroll:!0});let oe=p.getComputedStyle?.(y),G=Math.max(0,...String(oe?.transitionDuration??"").split(",").map(be=>Number.parseFloat(be)*(be.trim().endsWith("ms")?1:1e3)||0)),U=()=>y.remove();y.addEventListener("transitionend",be=>be.target===y&&U()),setTimeout(U,G+50),ue(C)}return _t}function Jo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(o,r),n.append(a);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var er=new WeakMap,Fi=.25;function Vc(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,s=e.step??.005,l=e.onChange,u=e.onReset,c=m=>Math.min(1,Math.max(0,m)),d=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=m=>{let f=c(m);f!==r&&(r=f,d(),l?.(f))},h=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();m.target!==o&&f.height>0&&p(1-(m.clientY-f.top)/f.height),h=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let f=n.getBoundingClientRect().height||1,b=(h-m.clientY)/f*(m.shiftKey?Fi:1);h=m.clientY,p(r+b)});let y=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",y),n.addEventListener("pointercancel",y),n.addEventListener("lostpointercapture",y),n.addEventListener("dblclick",m=>{m.preventDefault(),u?.()}),n.addEventListener("keydown",m=>{let f=m.shiftKey?s*Fi:s,b={ArrowUp:r+f,ArrowRight:r+f,ArrowDown:r-f,ArrowLeft:r-f,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};m.key in b&&(m.preventDefault(),p(b[m.key]))});let w={el:n,get value(){return r},get dragging(){return g},set(m){g||(r=c(Number(m)||0),d())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(u=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),er.set(n,w),w}function Xc(e){return er.get(e)}var tr=new WeakMap,Uc=.2,Kc=1.5,Qc=.5;function Jc(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Ii(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Jc(a.getComputedStyle(e).getPropertyValue(Z(t)),n)}function ed(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let m=t.createElement("span");m.className="nc-meter-bar";let f=t.createElement("span");f.className="nc-meter-peak";let b=t.createElement("span");b.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",m.append(f,b,v),r.append(m),s.push({peak:f,rms:b,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=e.label,u=e.onClear,c=!1,d=-1,p=-1,h=()=>{o.dataset.lit=c?"true":"false",o.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),o.title=c?"Clipped. Click to clear":"Clip light"},g=(w,m,f,b)=>{let v=Math.round(b*1e3)/1e3;f[m]!==v&&(f[m]=v,w.style.transform=m==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{y.clear(),u?.()});let y={el:a,get clipped(){return c},update(w,m){d<0&&(d=Ii(a,"motion-meter-fall",Uc)),p<0&&(p=Ii(a,"motion-meter-hold",Kc));let f=Math.max(0,Math.min(.25,Number(m)||0)),b=d>0?Math.exp(-f/d):0;s.forEach((v,E)=>{let A=w[E]??w[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(A.peak)||0)),k=Math.min(x,Math.max(0,Number(A.rms)||0));A.over&&y.clip(),v.level.peak=x>=v.level.peak?x:x+(v.level.peak-x)*b,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*b,v.holdAge+=f,x>=v.holdAt?(v.holdAt=x,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(x,v.holdAt-Qc*f)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,h())},clear(){c=!1,h()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,g(w.peak,"peak",w.shown,0),g(w.rms,"rms",w.shown,0),g(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,h()},configure(w){w.onClear&&(u=w.onClear)}};return h(),y.reset(),tr.set(a,y),y}function nr(e){return e?tr.get(e):void 0}function td(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Ce(e){return Math.max(0,Math.min(1,e))}function ar(e,t){let{ctx:n,w:a,h:o}=td(e);if(!n)return;n.clearRect(0,0,a,o);let r=Hc(e);if(t.paint==="swatch"){let u=K(e,"accent"),c=K(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,o),n.fillStyle=c,n.fillRect(a/2,0,a/2,o);return}if(t.paint==="filter"){let u=t.mode??"lp",c=K(e,qc(u)),d=K(e,"divider"),p=Ce(t.cutoff??.5),h=.08+(1-Ce(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let y=g/Math.max(1,a),w=0;u==="lp"?w=y<p?1:Math.max(0,1-(y-p)/h):u==="hp"?w=y>p?1:Math.max(0,1-(p-y)/h):w=Math.max(0,1-Math.abs(y-p)/h);let m=o*.78-w*o*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=K(e,"text-sub"),n.font=r,n.fillText(u.toUpperCase(),0,o),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=K(e,"accent"),n.beginPath();let u=Math.max(.05,t.decay??.4);for(let c=0;c<=a;c++){let d=c/Math.max(1,a),p=(o-4)*(1-Math.exp(-d*4/u));n.lineTo(c,o-p)}n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[c,d]=Array.isArray(t.region)?t.region:[0,1],p=K(e,"accent"),h=K(e,"text-sub"),g=o/2;n.fillStyle=K(e,"accent-soft"),n.fillRect(Ce(c)*a,0,(Ce(d)-Ce(c))*a,o),n.strokeStyle=K(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let y=Math.floor(u.length/2);for(let w=0;w<y;w++){let m=(w+.5)/y*a,f=Math.max(-1,Math.min(1,u[w*2]??0)),b=Math.max(-1,Math.min(1,u[w*2+1]??0)),v=(w+.5)/y;n.strokeStyle=v>=c&&v<=d?p:h,n.beginPath(),n.moveTo(m,g-b*(g-1)),n.lineTo(m,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[c,d,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(Ce(w)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=K(e,"text"),n.fillRect(Math.round(Ce(t.position)*(a-1)),0,1,o)),y||(n.fillStyle=h,n.font=r,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=Ce(t.level??0);n.fillStyle=K(e,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=K(e,"accent"),n.fillRect(0,o*.4,a*u,o*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=K(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=K(e,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),e.dataset.ncAccent=K(e,"accent")}function me(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function nd(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var We=20,qt=2e4,Pa=Math.log(qt/We),ca=32,ad=250,id=-100,od=1200,rd=4.5,zi=-6,je=-96,sd=48,Ri=[100,1e3,1e4],ld=[6,12];function st(e,t){return Math.log(Math.max(We,Math.min(qt,e))/We)/Pa*t}function on(e,t){return We*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Pa)}function Re(e,t,n,a){let o=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*o}function da(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ir=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function cd(e,t,n,a){let o=n?3:1,r=u=>({db:Math.max(-a,Math.min(a,e.db+u*o))}),s=u=>({hz:Math.max(e.minHz??We,Math.min(e.maxHz??qt,e.hz*2**(u*o/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*o)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function qa(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function dd(e,t,n,a,o,r,s,l,u){let c=u?.25:1,d={},p=Math.max(1,r/2-l);if(d.db=Math.max(-s,Math.min(s,t.db-a*c/p*s/qa(e))),e.moveHz){let h=t.hz*Math.exp(n*c/Math.max(1,o)*Pa);d.hz=Math.max(e.minHz??We,Math.min(e.maxHz??qt,h))}return d}function ud(e,t,n,a,o){let r=Math.max(0,n.left)+1,s=Math.min(n.right,o)-1,l=Math.min(t.width*3+a*2,s-r),u=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var X=new WeakMap;function pd(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(o,r);for(let u of e.bands)a.append(md(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!dr(n)||u.button>0)return;let c=cr(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),X.set(n,{control:e,cache:null,spec:null,active:null}),rr(n,e),n}function or(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function md(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},r=()=>o()?.bands.find(c=>c.id===t.id)??null,s=null;a.addEventListener("pointerdown",c=>{if(c.button!==0)return;let d=r();d&&(c.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(c.pointerId),s={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",Ne(e,t.id))}),a.addEventListener("pointermove",c=>{if(!s||c.pointerId!==s.id)return;let d=o(),p=r(),h=X.get(e);if(!d||!p||!h?.box)return;let{w:g,h:y,pad:w}=h.box;d.onBand(p.id,dd(p,s.start,c.clientX-s.x,c.clientY-s.y,g,y,d.range??18,w,c.shiftKey))});let l=c=>{!s||c.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ne(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",c=>{c.preventDefault(),o()?.onReset?.(t.id)}),a.addEventListener("keydown",c=>{let d=o(),p=r();if(!d||!p)return;let h=cd(p,c.key,c.shiftKey,d.range??18);h&&(c.preventDefault(),h==="reset"?d.onReset?.(p.id):d.onBand(p.id,h),Ne(e,p.id))});let u=null;return a.addEventListener("wheel",c=>{let d=o(),p=r();if(!d||!p?.moveQ)return;c.preventDefault();let h=c.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let g=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-g/240))),u.t=h,d.onBand(p.id,{q:u.q}),Ne(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ne(e,t.id)),a.addEventListener("focus",()=>Ne(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ne(e,null)}),a.addEventListener("blur",()=>{s||Ne(e,null)}),a}function Ne(e,t){let n=X.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?pt(e):Ha(e)}function Ha(e){let t=X.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(y=>y.id===t.active):null;for(let y of e.querySelectorAll(".nc-eq-node"))y instanceof HTMLElement&&(a&&y.dataset.band===a.id?y.dataset.active="true":delete y.dataset.active);if(!a||!t.box){n.hidden=!0;return}let o=[a.label,ir(a.db)];a.kind==="peak"?o.push(da(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${da(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(hd(t.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,u=st(a.hz,r),c=Re(a.db*qa(a),s,t.control.range??18,l),d=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(r-d,u-d/2)),g=c-p-l*1.5>=0?c-p-l*1.5:Math.min(s-p,c+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(g)}px`}function hd(e,t){return e.bands.indexOf(t)%3+1}function rr(e,t){let n=X.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ja(e);let a=t.range??18;t.bands.forEach((o,r)=>{let s=or(e,o.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=o.kind,s.setAttribute("aria-label",`${o.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(o.db)),s.setAttribute("aria-valuetext",o.valueText??`${ir(o.db)}, ${da(o.hz)}`),s.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?s.setAttribute("data-nc-help",o.help):s.removeAttribute("data-nc-help"))}),pt(e),vd(e)}function sr(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function lr(e){return{curve:me(e,"eq-curve"),fill:me(e,"eq-fill"),quiet:me(e,"text-sub"),grid:me(e,"eq-grid"),zero:me(e,"divider"),label:me(e,"text-sub"),spectrum:me(e,"eq-spectrum"),bands:[me(e,"eq-band-1"),me(e,"eq-band-2"),me(e,"eq-band-3")]}}function fd(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function pt(e){X.has(e)&&ja(e);let t=X.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:o,w:r,h:s}=sr(n);if(!o)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:r,h:s,pad:l},t.colours=lr(e);let c=t.colours,d=fd(a,r);if(!t.cache||t.cache.key!==d){let E=Math.max(64,Math.ceil(r)+1),A=new Float64Array(E);for(let k=0;k<E;k++)A[k]=on(k/(E-1)*r,r);let x=null;try{x=typeof a.response=="function"?a.response(A):null}catch{x=null}t.cache={key:d,freqs:A,total:x?.total??new Float64Array(E),bands:x?.bands??[]}}o.clearRect(0,0,r,s);let p=nd(e),h=a.on!==!1;gd(o,r,s,u,l,c,p);let{freqs:g,total:y,bands:w}=t.cache,m=Array.from(g,E=>st(E,r)),f=Re(0,s,u,l);w.forEach((E,A)=>{if(!E||!E.some(S=>Math.abs(S)>.05))return;let x=h?c.bands[A%3]:c.quiet,k=Array.from(E,S=>Re(S,s,u,l));o.save(),t.active&&a.bands[A]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=x,Di(o,m,k,f)),o.globalAlpha=h?.75:.4,o.strokeStyle=x,o.lineWidth=.75,Gn(o,m,k),o.restore()});let b=Array.from(y,E=>Re(E,s,u,l)),v=h?c.curve:c.quiet;o.save(),o.fillStyle=h?c.fill:c.quiet,o.globalAlpha=h?.2:.08,Di(o,m,b,f),o.restore(),o.save(),o.strokeStyle=h?c.fill:v,o.lineJoin="round",o.lineCap="round",h&&(o.globalAlpha=.16,o.lineWidth=4,Gn(o,m,b)),o.globalAlpha=1,o.strokeStyle=v,o.lineWidth=1.25,Gn(o,m,b),o.restore(),bd(e),Ha(e)}function gd(e,t,n,a,o,r,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let c=1;c<=9;c++){let d=u*c;if(d<We||d>qt)continue;let p=Math.round(st(d,t))+.5;e.globalAlpha=Ri.includes(d)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of ld)if(!(u>a))for(let c of[1,-1]){let d=Math.round(Re(u*c,n,a,o))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(Re(0,n,a,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of Ri){let c=u>=1e3?`${u/1e3}k`:String(u),d=e.measureText(c).width,p=st(u,t)+3;e.fillText(c,p+d+2>t?st(u,t)-d-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let c=Re(u,n,a,o);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(c)-1)}e.restore()}function vn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let o=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],o,r)}e.lineTo(t[t.length-1],n[n.length-1])}function Gn(e,t,n){e.beginPath(),vn(e,t,n),e.stroke()}function Di(e,t,n,a){e.beginPath(),vn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function cr(e){return e.closest("[data-nc-maxable]")}function dr(e){let t=cr(e);return!!t&&!t.hasAttribute("data-nc-max")}function ja(e){let t=dr(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=X.get(e);n?.active&&(n.active=null,Ha(e))}return t}function bd(e){ja(e);let t=X.get(e);if(!t?.box)return;let{w:n,h:a,pad:o}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=or(e,s.id);l instanceof HTMLElement&&(l.style.left=`${st(s.hz,n).toFixed(1)}px`,l.style.top=`${Re(s.db*qa(s),a,r,o).toFixed(1)}px`)}}function yd(e,t,n,a){let o=a/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let c=(u-.5)/(e-1)*t,d=(u+.5)/(e-1)*t,p=on(c,t),h=on(d,t),g=on(u/(e-1)*t,t);r[u]=Math.min(n-1,p/o),s[u]=Math.min(n-1,h/o),l[u]=rd*Math.log2(g/1e3)}return{lo:r,hi:s,tilt:l}}function wd(e,t,n){let a=Math.floor(t),o=Math.ceil(n);if(o-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let r=-1/0;for(let s=a;s<=o&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function vd(e){let t=X.get(e);if(t){if(!t.control.spectrum){pr(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let o=X.get(e)?.spec;o&&(o.visible=a.some(r=>r.isIntersecting),ua(e))}),t.spec.io.observe(e)):t.spec.visible=!0}ua(e)}}function ua(e){let t=X.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){ur(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=pa(e),n.onVis||(n.onVis=()=>ua(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ma(e,!1)}function pa(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ma(e,t){let n=X.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Yn(e,pa(e))),ad):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,Yn(e,o))):n.timer=a.setTimeout(()=>(n.timer=0,Yn(e,pa(e))),ca))}function ur(e){let t=X.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function pr(e){let t=X.get(e)?.spec;if(!t)return;ur(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=X.get(e);n&&(n.spec=null)}function Yn(e,t){let n=X.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){pr(e);return}if(!a.analyser)return;if(t-a.last<ca-4&&!a.idle){ma(e,!1);return}let o=a.last?Math.min(.25,(t-a.last)/1e3):ca/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=sr(r);if(!s)return;let c=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==c||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:c,w:l,sr:d,...yd(c,l,a.buf.length,d)},a.disp=new Float32Array(c).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=sd*o,{lo:g,hi:y,tilt:w}=a.map;for(let f=0;f<c;f++){let b=wd(a.buf,g[f],y[f]);b>p&&(p=b);let v=b+w[f],E=a.disp[f]-h;a.disp[f]=v>E?v:E}p>id&&(a.loud=t);let m=t-a.loud>od;s.clearRect(0,0,l,u),(!m||a.disp.some(f=>f>je))&&xd(s,l,u,a.disp,n.colours??lr(e)),a.idle=m&&!a.disp.some(f=>f>je),ma(e,a.idle)}function xd(e,t,n,a,o){let r=a.length,s=new Array(r),l=new Array(r),u=c=>{let d=a[Math.max(0,Math.min(r-1,c))];return Number.isFinite(d)?d:je};for(let c=0;c<r;c++){let d=u(c)*.36+(u(c-1)+u(c+1))*.22+(u(c-2)+u(c+2))*.1,p=(Math.max(je,Math.min(zi,Number.isFinite(d)?d:je))-je)/(zi-je);s[c]=c/(r-1)*t,l[c]=n-p*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),vn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),vn(e,s,l),e.stroke(),e.restore()}var $d=.8912509381337456,ha=32,kd=250,Ed=1200,Ad=.2,mr=1.5;function Sd(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Md(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",a.append(o),t.append(a)}return t}var xn=new WeakMap,Bi=new WeakMap;function Oi(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(o);return Number.isFinite(r)?o.endsWith("ms")?r/1e3:r:n}function Ld(e){let t=Bi.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(o=>{for(let r of o){let s=xn.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Tt(s))}tt(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)Tt(o);tt(t)}),Bi.set(e,t),t}var hr=e=>e.els.some(t=>t.isConnected);function Td(e){if(!e.loop.io)return hr(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Tt(e){let t=!e.dead&&!!e.source&&Td(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=_a(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ba(e))}function _a(e){return e.doc.defaultView?.performance?.now()??Date.now()}function tt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){fr(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=_a(e)),!e.raf&&!e.timer&&fa(e,!1)}function fa(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Pi(e,_a(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),kd):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,Pi(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,a()),ha)}function fr(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Pi(e,t){if(t-e.last<ha-4&&!e.idle&&e.last){fa(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):ha/1e3;e.last=t,e.frames++;let a=!1,o=!1;for(let r of e.recs){if(!hr(r)){(r.placed||e.frames-r.born>90)&&gr(r);continue}r.placed=!0,r.open&&(o=!0,Cd(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!o){fr(e);return}e.idle=t-e.loud>Ed&&!a,fa(e,e.idle)}function Cd(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Oi(h,"motion-meter-fall",Ad),e.hold=Oi(h,"motion-meter-hold",mr)}let a=null;try{a=e.source.read()}catch{a=null}let o=typeof a=="number",r=o?a:Number(a?.in)||0,s=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let c=e.fall>0?Math.exp(-t/e.fall):0,d=[r,l],p=!1;for(let h=0;h<2;h++){let g=Sd(d[h]);g>0&&(p=!0),e.disp[h]=g>=e.disp[h]?g:g+(e.disp[h]-g)*c,e.disp[h]<.001&&(e.disp[h]=0),d[h]>=$d&&(e.clipAt[h]=n);let y=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;ga(e,h,e.disp[h],y)}return p}function ga(e,t,n,a){let o=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===r)){e.shown[t]=o,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=r)}}}function ba(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,ga(e,0,0,!1),ga(e,1,0,!1)}function gr(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),xn.get(t)===e&&xn.delete(t)}function Nd(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=Ld(a),r={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:mr,rows:""};for(let s of n)xn.set(s,r),o.io?.observe(s);if(o.recs.add(r),ba(r),!o.io){let s=a.defaultView,l=()=>{Tt(r),tt(o)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Tt(r),tt(o);return}r.open&&(r.open=!1,r.source?.close?.(),ba(r)),r.source=l,Tt(r),tt(o)}},destroy(){r.dead||gr(r),tt(o)}}}var br={slop:8,longPressMs:500,pitchPx:16},Fd=class{constructor(e,t,n=br){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let o=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Id(e,t,n,a=br){let o=!1,r=0,s=(c,d)=>{let p=e.ownerDocument.elementFromPoint?.(c,d),h=[...e.querySelectorAll(t)],g=p?h.findIndex(m=>m===p||m.contains(p)):-1;if(g>=0)return g;let y=-1,w=Number.POSITIVE_INFINITY;return h.forEach((m,f)=>{if(m.hidden)return;let b=m.getBoundingClientRect();if(d<b.top||d>b.bottom)return;let v=Math.abs(c-(b.left+b.width/2));v<w&&v<=b.width&&(y=f,w=v)}),y},l=new Fd(s,c=>{(c.kind==="paint"||c.kind==="long")&&(o=!0),n(c)},a),u=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",c=>{c.button>0||(o=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{o&&(o=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var yr="netcomposer.groups.v1";function Wa(){try{return globalThis.localStorage??null}catch{return null}}function wr(e=Wa(),t=yr){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function zd(e,t,n,a=yr){let o=wr(e,a);o.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function Rd(e,t=Wa()){return wr(t).get(e.id)??e.open===!0}function Dd(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",u.id);for(let c of e.controls)u.append(n(c,t));return o.addEventListener("click",()=>{let c=a.dataset.ncOpen!=="true";zd(Wa(),e.id,c),qi(a,c);let d=t(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(o,u),qi(a,Rd(e)),vr(a,e),a}function qi(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t)}function vr(e,t){let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var Ut="application/x-nc-pad",Hi="http://www.w3.org/2000/svg";function Bd(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),u=0,c=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),c=Math.max(c,e[2*p+1]??0);let d=n===1?50:r/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),o.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Od(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,r)=>a.append(Pd(n,r,t))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&rn(n)}),$r(n,e),n}function Pd(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(Hi,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let c=document.createElementNS(Hi,"path");return u.append(c),a.append(o,r,s,l,u),Hd(e,a,t,n),r.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&xr(e,a,t,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(Ut,String(t)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Ut)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(Ut)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=d.dataTransfer?.getData(Ut);if(h!==void 0&&h!==""){d.preventDefault(),d.stopPropagation();let y=Number(h);y!==t&&p.onMove?.(y,t,d.altKey);return}let g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(t,g))}),a}function qd(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Hd(e,t,n,a){let o=0,r=!1,s=0,l=0,u=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;r=!1,s=c.clientX,l=c.clientY,u();let d=a(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=ji(e,t,n,a)},450)))}),t.addEventListener("pointermove",c=>{o&&Math.hypot(c.clientX-s,c.clientY-l)>8&&u()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,u);t.addEventListener("contextmenu",c=>{c.preventDefault(),u(),r=ji(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}qd(e,n,a)})}function ji(e,t,n,a){let o=a(e);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;rn(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),rn(e)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{rn(e);let h=a(e);h?.type==="padGrid"&&(d.id==="rename"&&h.onRename?xr(e,t,n,a):h.onMenu?.(n,d.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function xr(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(e);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let u=!1,c=d=>{if(u)return;u=!0;let p=r.value.trim();r.remove(),t.focus();let h=a(e);d&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};r.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),r.addEventListener("blur",()=>c(!0));for(let d of["pointerdown","click","dblclick"])r.addEventListener(d,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function rn(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function $r(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),u=r.querySelector(".nc-padgrid-pad-wave path"),c=r.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Bd(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let d=t.selected===o;d?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",d?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function J(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Fn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function _i(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function zt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var jd=450,Wi=8;function Ee(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function _d(e){let t=Pc(e,"target-min");return t>0?t:44}function Wd(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=_d(e),a=n/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,d=u-a,p=u+a,h=c-a,g=c+a;for(let y=0;y<t.length;y++){if(r===y)continue;let w=o[y];if(!w||w.width===0)continue;let m=w.left+w.width/2,f=w.top+w.height/2;Math.abs(f-c)<a*2&&(m>u?p=Math.min(p,(u+m)/2):m<u&&(d=Math.max(d,(u+m)/2))),Math.abs(m-u)<a*2&&(f>c?g=Math.min(g,(c+f)/2):f<c&&(h=Math.max(h,(c+f)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),g=Math.max(g,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,g-h)}px`,s.style.transform="none"}}function kr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Gi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function mt(e,t){switch(e.type){case"slider":return Gd(e,t);case"select":return Zd(e,t);case"toggle":return Vd(e,t);case"button":return Xd(e,t);case"readout":return Ud(e);case"label":return eu(e);case"note":return Yi(e);case"knob":return au(e,t);case"choice":return iu(e,t);case"slotRow":return ou(e,t);case"stepGrid":return cu(e,t);case"canvas":return mu(e);case"fx":return yu(e,t);case"eqGraph":return pd(e,t);case"group":return Dd(e,t,mt);case"strip":return hu(e,t);case"stripAdd":return bu(e,t);case"padGrid":return Od(e,t);case"moves":return Qd(e,t);default:return Yi({id:"unknown",text:""})}}function he(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ar(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(t.value)),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??zt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),_i(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")_i(e,t.text);else if(t.type==="knob"){e instanceof HTMLElement&&Ge(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&tu(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??zt(t.value))}else if(t.type==="choice")Sr(e,t);else if(t.type==="slotRow")Lr(e,t);else if(t.type==="stepGrid")wa(e,t);else if(t.type==="padGrid")$r(e,t);else if(t.type==="moves")Er(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ar(n,t)}else if(t.type==="eqGraph")rr(e,t);else if(t.type==="strip"){Fr(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${lt(n.id)}"]`);a instanceof Element&&he(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Cr(e,t);else if(t.type==="group"){vr(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${lt(n.id)}"]`);a instanceof Element&&he(a,n)}}else if(t.type==="fx"){Pr(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${lt(n.id)}"]`);a instanceof Element&&he(a,n)}}}}function Gd(e,t){let n=Fn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id,a.min=String(e.min),a.max=String(e.max),a.step=String(e.step),a.value=String(e.value),a.disabled=e.disabled===!0,a.dataset.ncId=e.id,a.addEventListener("input",()=>{let r=t(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{let r=t(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(a,o),e.onTap&&n.insertBefore(Yd(e,a,t),o),n.append(J()),he(n,e),n}function Yd(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ee());let o=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Zd(e,t){let n=Fn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;for(let o of e.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,a.append(r)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,J()),n}function Vd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(J()),he(n,e),n}function Xd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(J()),he(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=kr(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Tr(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function Ud(e){let t=Fn(e.id,e.label);return t.append(J()),he(t,e),t}var Kd=450;function Qd(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Jd(l.icon)),u.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(u)}o.append(r,s),n.append(o)}return Er(n,e),n}function Er(e,t){for(let n of t.groups)for(let a of n.moves){let o=e.querySelector(`[data-nc-move="${lt(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function Jd(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function eu(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(J()),t}function Yi(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",t.textContent=e.text,t.append(J()),t}function Zi(e){if(typeof e.valueText=="string")return e.valueText;let t=zt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ar(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function tu(e,t){let n=t.max-t.min||1,a=(t.value-t.min)/n;Ar(e,t.modulated===!0);let o=Math.round(a*270);e.style.setProperty("--knob-turn",String(o)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(o,135))),e.style.setProperty("--knob-to",String(Math.max(o,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Zi(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Zi(t)}`}function nu(e,t){let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function au(e,t){let n=Fn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,s=0;a.addEventListener("pointerdown",c=>{r=c.clientY;let d=t(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;let d=t(a);if(d?.type!=="knob")return;let p=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,s-(c.clientY-r)*p/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{let c=t(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{let d=t(a);if(d?.type!=="knob")return;let p=nu(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(J()),he(n,e),n}function iu(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),u=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")u=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(r.key==="Home")u=0;else if(r.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(o)}return n.append(J()),Sr(n,e),n}function Sr(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function ou(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let p=e.slots[d],h=document.createElement("span");h.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(g,Ee()),ru(h,g,n,d,t),a.append(h)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=kr(),o.append(Ee()),o.addEventListener("click",()=>{Tr(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",r.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...o?[o]:[]),n.append(c,r,J()),Mr(n,t),Lr(n,e),n}function Vi(e,t,n,a){let o=n(e);if(o?.type!=="slotRow")return;St(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(t,r)}function ru(e,t,n,a,o){let r=0,s=0,l=0,u=!1,c=!1,d=!1,p=!1,h=()=>{window.clearTimeout(r),r=0},g=f=>{let b=f.clientX-s,v=f.clientY-l;b*b+v*v>Wi*Wi&&(u=!0,h())},y=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=f=>{let b=r!==0&&!u&&!c;h(),y(),b&&(d=!0,Vi(n,a,o,f))},m=()=>{u=!0,h(),y()};e.addEventListener("pointerdown",f=>{f.button===0&&(y(),c=!1,u=!1,d=!1,s=f.clientX,l=f.clientY,h(),r=window.setTimeout(()=>{r=0,!u&&(c=!0,su(n,t,a,o))},jd),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",f=>f.preventDefault()),e.addEventListener("click",f=>{if(d||c||u){d=!1,c=!1,u=!1;return}Vi(n,a,o,f)})}function Mr(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Xi("Save","store"),o=Xi("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),St(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),St(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),St(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&St(e)})}function Xi(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function su(e,t,n,a){Mr(e,a);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function St(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Lr(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=t.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Tr(e){let t=e.dataset.ncLastFill||null,n=Ec(t);e.dataset.ncLastFill=n;let a=Ac(n);if(a)for(let[o,r]of Object.entries(a))e.style.setProperty(o,r)}function lu(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function cu(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=m=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=m,a.append(f),f},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let f of[r,s]){let b=f===m;f.setAttribute("aria-checked",b?"true":"false"),f.tabIndex=b?0:-1}};l(r);for(let m of[r,s])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let f=s.getAttribute("aria-checked")==="true"?r:s;l(f),f.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(lu(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.onClear?.()}),u.append(m)}n.append(u);for(let m of e.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=m.label,b.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(b.dataset.ncLane=String((m.lane-1)%4+1));let v=!1,E=0;b.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(E=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(v=!0,S.onSelectRow?.(S.rows.findIndex(F=>F.id===m.id),!0))},Kd))});for(let k of["pointerup","pointercancel","pointerleave"])b.addEventListener(k,()=>window.clearTimeout(E));b.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),b.addEventListener("click",k=>{let S=t(n);if(S?.type!=="stepGrid")return;if(v){v=!1;return}let F=S.rows.findIndex(V=>V.id===m.id),j=!!S.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);S.onSelectRow?.(F,j)}),b.addEventListener("keydown",k=>du(n,b,k));let A=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let F=document.createElement("button");F.type="button",F.className="nc-ms",F.dataset.ncMs=k,F.textContent=k==="mute"?"M":"S",F.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${m.label}`),S.append(F,Ee()),S.addEventListener("click",()=>{let j=t(n);if(j?.type!=="stepGrid")return;let V=j.rows.findIndex(ee=>ee.id===m.id);(k==="mute"?j.onMute:j.onSolo)?.(V)}),A.push(S)}let x=document.createElement("div");x.className="nc-steps";for(let k=0;k<m.steps.length;k++){let S=document.createElement("span");S.className="nc-step-wrap";let F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${m.id}:${k}`,F.setAttribute("aria-label",`${m.label} step ${k+1}`),S.append(F,Ee()),S.addEventListener("click",j=>{let V=t(n);if(V?.type!=="stepGrid")return;let ee=V.rows.findIndex(ue=>ue.id===m.id),R=s.getAttribute("aria-checked")==="true";V.onToggle(ee,k,j.shiftKey||R)}),x.append(S)}if(e.onLength&&x.append(uu(n,x,m,t)),f.append(...A,b,x),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=m.id,k.setAttribute("aria-label",`Re-roll ${m.label}`),k.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Gi(),k.append(Ee()),k.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(F=>F.id===m.id))}),f.append(k)}f.addEventListener("click",k=>{if(k.target!==f)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(F=>F.id===m.id))}),Ui(n,x,".nc-step-wrap",t,s,()=>m.id),n.append(f)}let c=document.createElement("div");c.className="nc-pads-head";let d=(m,f,b)=>{let v=document.createElement("button");return v.type="button",v.className=m,v.textContent=f,b&&v.setAttribute("aria-label",b),v},p=d("nc-pads-step","‹","Previous lane"),h=d("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",wa(n,m))}));for(let[m,f]of[[p,-1],[h,1]])m.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;let v=b.rows.length;b.onSelectRow?.(((Kt(b)+f)%v+v)%v)});if(c.append(p,g,h),e.onDice){let m=d("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Gi(),m.addEventListener("click",()=>{let f=t(n);if(f?.type!=="stepGrid")return;let b=Kt(f);b>=0&&f.onDice?.(b)}),c.append(m)}if(e.transport){let m=d("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),c.append(m)}n.append(c);let y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(m),f.textContent=String(m+1),f.addEventListener("click",b=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=Kt(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,m+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(E,m,b.shiftKey||A)}),y.append(f)}return Ui(n,y,".nc-pad",t,s,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Kt(m)]?.id:void 0}),n.append(y),n.append(J()),wa(n,e),n}function Kt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Ui(e,t,n,a,o,r){let s="on",l=!0,u=-1,c=(d,p)=>{let h=d.rows[u]?.steps[p];!h||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,s,l):!!h[s]!==l&&d.onToggle(u,p,s==="accent"))};Id(t,n,d=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let h=p.rows.findIndex(g=>g.id===r());h>=0&&p.rows[h].length!==d.pad+1&&p.onLength?.(h,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let h=r();u=p.rows.findIndex(y=>y.id===h);let g=p.rows[u]?.steps[d.pad];if(!g)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}c(p,d.pad)}else if(d.kind==="long"){let h=r(),g=p.rows.findIndex(w=>w.id===h),y=t.querySelectorAll(n)[d.pad];g>=0&&y instanceof HTMLElement&&p.onLongPress?.(g,d.pad,y)}}})}function du(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],o=a.indexOf(t),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function uu(e,t,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(Ee());let r=c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(y=>y.id===n.id),h=d.rows[p];if(!h)return;let g=Math.max(1,Math.min(h.steps.length,c));g!==h.length&&d.onLength?.(p,g)},s=c=>{let d=[...t.querySelectorAll(".nc-step")],p=1;return d.forEach((h,g)=>{let y=h.getBoundingClientRect();y.width>0&&c>=y.left+y.width/2&&(p=g+1)}),p},l=c=>r(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete o.dataset.dragging};return o.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),o.addEventListener("keydown",c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.find(g=>g.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in h&&(c.preventDefault(),r(h[c.key]))}),o}var Zn=new WeakMap,Qt=new WeakMap;function pu(e){return e?(Qt.has(e)||(Qt.set(e,wn(e)),Xo(t=>{Qt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ya(n,Number(n.getAttribute("data-nc-velocity")))},e)),Qt.get(e)):"light"}function ya(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:pu(e.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(Zn.has(e)&&Zn.get(e)===o)){if(Zn.set(e,o),n===null){for(let r of Object.keys(Ci(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(Ci(n,Ti[a]??Ti.light)))e.style.setProperty(r,s)}}function wa(e,t){let n=t.rows.some(d=>d.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),r=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&r&&(u.setAttribute("aria-label",`Re-roll ${r.label}`),u.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let d=!!t.transport?.playing,p=t.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");let h=t.transport?.ariaLabel;h?c.setAttribute("aria-label",h):c.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let d=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of o.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),g=r.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&h>=r.length,l&&h>=r.length?p.dataset.out="true":delete p.dataset.out,l&&h===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${h+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,ya(p,g?.velocity),t.playhead>=0&&h===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of t.rows){for(let g=0;g<d.steps.length;g++){let y=d.steps[g],w=e.querySelector(`[data-nc-step="${d.id}:${g}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;let v=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);v?m.dataset.picked="true":delete m.dataset.picked;let E=m.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===d.id||v?"true":"false"),E.textContent!==d.label&&(E.textContent=d.label,E.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(let A of m.querySelectorAll("[data-nc-ms]")){let x=A.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;A.setAttribute("aria-pressed",x?"true":"false")}}w.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?w.dataset.accent="true":delete w.dataset.accent,y.dim?w.dataset.dim="true":delete w.dataset.dim,g%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof y.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),ya(w,y.velocity);let f=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;g===f?w.dataset.playhead="true":delete w.dataset.playhead;let b=!!t.onLength&&t.selectedRow===d.id;w.hidden=g>=d.length&&!b,g>=d.length&&b?w.dataset.out="true":delete w.dataset.out}let p=e.querySelector(`[data-nc-len="${d.id}"]`),h=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let g=document.activeElement===p;h.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function mu(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,J()),t}function hu(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;if(r&&(n.dataset.ncFoldable="",s=zr(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let f=t(n);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(o),e.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&b.onRemove?.(f)}),a.append(f)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let f=document.createElement("span");f.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",f.append(b,Ee()),f.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onHacks?.()}),l.append(f)}let u=document.createElement("div");u.className="nc-strip-ms";for(let f of["mute","solo"]){if(!(f==="mute"?e.onMute:e.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=f,v.textContent=f==="mute"?"M":"S",b.append(v,Ee()),b.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(f==="mute"?E.onMute:E.onSolo)?.()}),u.append(b)}let c=document.createElement("div");c.className="nc-strip-sends";for(let f of e.sends??[])c.append(mt({...f,type:"knob",compact:!0},t));let d=document.createElement("div");d.className="nc-strip-pan",e.pan&&d.append(mt(Ga(e),t));let p=document.createElement("div");p.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let f of e.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(f.value)),b.textContent=f.label,h.append(b)}let g=Vc({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:f=>{let b=t(n);b?.type==="strip"&&b.onChange(f)},onReset:()=>{let f=t(n);f?.type==="strip"&&Qi(f)}}),y=ed({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let f=t(n);f?.type==="strip"&&f.onClipClear?.()}});if(p.append(h,g.el,y.el),r){let f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");let b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,f.append(b,E,v),f.addEventListener("click",()=>{let A=t(n);if(A?.type!=="strip")return;A.onFold?.(!1);let x=n.querySelector("[data-nc-strip-hide]");x instanceof HTMLElement&&x.focus()}),p.prepend(f)}let w=document.createElement("button");w.type="button",w.className="nc-strip-db",w.dataset.ncReadout="";let m=0;return w.addEventListener("click",f=>{let b=t(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(m),f.detail===0?Ki(n,w,t):f.detail===1&&(m=window.setTimeout(()=>Ki(n,w,t),gu)))}),w.addEventListener("dblclick",()=>{window.clearTimeout(m);let f=t(n);f?.type==="strip"&&Qi(f)}),s&&n.append(s),n.append(a,l,u,c,d,p,w,J()),Fr(n,e),n}function Ga(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??fu(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function fu(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var gu=250;function Ki(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??zt(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let u=o.value;if(o.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(u)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function bu(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;Nr(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,J()),Cr(n,e),n}function Cr(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...o.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Nr(a))}function Nr(e){let t=e.options[0];t&&(t.selected=!0)}function Qi(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Fr(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),r=o?Xc(o):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),nr(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??zt(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let h=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${h}`:h}for(let p of e.querySelectorAll("[data-nc-ms]")){let h=p.getAttribute("data-nc-ms"),g=h==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${h==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${lt(t.pan.id)}"]`);p&&he(p,Ga(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let c=e.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Rr(c,u,t.label),Ge(c,t.foldHelp));let d=e.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${t.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),Ge(d,t.foldedHelp??t.foldHelp)}}function Ji(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${lt(t)}"]`);return nr(n?.querySelector(".nc-meter")??void 0)}function yu(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let o=typeof e.onFold=="function",r=!!e.meter;if(e.on===void 0&&!o&&!$n(e)&&!r)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),r&&s.append(Br(n,"head")),e.on!==void 0){let l=Jo({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(l.el);c?.type==="fx"&&c.onToggle?.(u)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}o&&s.append(vu(n,t)),$n(e)&&s.append(Eu(n,t)),n.append(s)}o&&n.prepend(xu(n,t)),r&&Or(n,e);for(let s of e.controls)n.append(mt(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let u of e.more)s.append(mt(u,t));n.append(s)}return n.append(J()),Pr(n,e),n}var wu=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Ir(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&wu(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function vu(e,t){let n=zr();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Ir(e))}),n}function zr(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Rr(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function xu(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Br(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Ir(e)}}),n}var ht=new Set;function sn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var $n=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),$u="(max-width: 768px)";function ku(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Eu(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(ku()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Dr(e,a,!ht.has(a.id)),n.focus())}),n}function Dr(e,t,n){n?ht.add(t.id):ht.delete(t.id),Ya(e,t)}function Au(e,t){t?.type==="fx"&&ht.has(t.id)&&Dr(e,t,!1)}function Su(e){return e.ownerDocument.defaultView?.matchMedia?.($u).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ya(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=$n(t)&&ht.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!$n(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),sn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&pt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Ge(n,t.maxHelp)),!a){e.dataset.ncMax&&eo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&ht.has(t.id)&&Ya(e,t);queueMicrotask(()=>{e.isConnected?s():sn(e.ownerDocument,s)});return}let o=Su(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&eo(e),e.dataset.ncMax=o,o==="over"&&Mu(e,t)),Lu(e.ownerDocument),o==="over"&&Za(e),sn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&pt(s)})}function eo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),sn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&pt(n)})}function Mu(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Za(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,r=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,s=ud(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var to=new WeakSet;function Lu(e){to.has(e)||(to.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Za(t)}))}var va=new WeakMap;function Br(e,t){let n=Md(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Or(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)Ge(o,t.meterHelp);let a=va.get(e);a?a.set(t.meter):va.set(e,Nd(n,t.meter))}function Pr(e,t){(t.meter||va.has(e))&&Or(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Rr(r,o,t.title),Ge(r,t.foldHelp)),Ya(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!o,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let u=s.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");let c=s.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),Ge(s,t.foldHelp)}}function Ge(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function lt(e){return e.replace(/["\\]/g,"\\$&")}function Tu(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&ar(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&pt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Za(n);Wd(e)}var no="data-nc-help";function Cu(e,t,n,a=0,o=6,r=8){let s=e.top-o-t.height,l=s>=a+r?"above":"below",u=l==="above"?s:e.bottom+o,c=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(u),left:Math.round(c),side:l}}var Vn=new WeakMap;function Nu(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Fu({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Vn.get(e);if(n)return n;let a=e.defaultView,o=null,r=null,s,l=()=>{clearTimeout(s),r=null,o&&(o.hidden=!0)},u=h=>{let g=h.getAttribute(no);if(!g)return;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=g,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let y=h.getBoundingClientRect(),w=Cu(y,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,Nu(e));o.style.top=`${w.top}px`,o.style.left=`${w.left}px`,o.dataset.side=w.side,o.style.visibility=""},c=h=>{if(h.pointerType==="touch")return;let g=h.target&&h.target.closest?h.target.closest(`[${no}]`):null;g!==r&&(l(),g&&(r=g,s=setTimeout(()=>{r===g&&g.isConnected&&u(g)},t)))},d=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",c),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",c),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),o?.remove(),o=null,Vn.delete(e)}};return Vn.set(e,p),p}var Iu="(max-width: 768px)",zu='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Ru='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Du=0;function Bu({panel:e,button:t,label:n="Menu",media:a=Iu}){let o=e.ownerDocument,r=o.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Du}`);let s=t??o.createElement("button");t||(s.type="button",s.innerHTML=zu),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),o.addEventListener("keydown",d,!0),o.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Ru)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function c({focus:m}={}){if(!l())return;let f=e.contains(o.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),o.removeEventListener("keydown",d,!0),o.removeEventListener("pointerdown",p,!0),(m??f)&&s.focus?.({preventScroll:!0})}function d(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),c({focus:!0}))}function p(m){let f=m.target;f instanceof r.Node&&(e.contains(f)||s.contains(f))||c({focus:!1})}let h=()=>l()?c({focus:!0}):u(),g=m=>{let f=m.target,b=f instanceof r.Element?f.closest("button"):null;!b||!e.contains(b)||b.closest("[data-nc-menu-stay]")||c({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",g);let y=r.matchMedia?.(a),w=()=>{y?.matches||c({focus:!1})};return y?.addEventListener?.("change",w),{button:s,panel:e,open:u,close:c,isOpen:l,destroy(){c({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",g),y?.removeEventListener?.("change",w)}}}var Va="netcomposer.rhythm.hidden.v1",$e=new WeakMap;function Xn(){try{return globalThis.localStorage??null}catch{return null}}function qr(e,t=Va){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ao(e,t,n,a=Va){let o=qr(e,a);n?o.add(t):o.delete(t);try{e?.setItem(a,JSON.stringify([...o]))}catch{}}function Xa(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of t)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),o.pan&&n.push(Ga(o)));return n}function Hr(e,t){if(!(!e||!t))return Xa(e).find(n=>n.id===t)}function Ou(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Xa(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>n.value).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Pu(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),e.append(n),jr(e,t)}function jr(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function qu(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=$e.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Hr(n,a)}function Hu(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],o=Ou(t);if(e.dataset.ncSignature===o){for(let r of a){let s=e.querySelector(`[data-nc-section="${oo(r.id)}"]`);s&&jr(s,r);for(let l of r.controls){let u=e.querySelector(`[data-nc-id="${oo(l.id)}"]`);u instanceof Element&&he(u,l)}s instanceof HTMLElement&&xa(s,r,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),Pu(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let u of r.controls)l.append(mt(u,qu));e.append(s),xa(s,r,n)}}function _r(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var ju="(max-width: 768px)",Wr=new WeakMap;function io(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function _u(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=io("prev"),r=io("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,s,r,l);let u=(c,d)=>{let p=Wr.get(e);if(!p||d.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=_r(h,p.pageSize,(t.pages.get(p.id)??0)+c);t.pages.set(p.id,g),p.onPage?.(g),xa(e,{...p,page:g},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===o?r:o).focus(),t.redraw()};return o.addEventListener("click",()=>u(-1,o)),r.addEventListener("click",()=>u(1,r)),e.prepend(a),a}function xa(e,t,n){Wr.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:r,page:s}=_r(a.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,s),r<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(ju).matches===!0,u=e.closest(".nc-module");a.forEach((m,f)=>{let b=Math.floor(f/o)!==s;if(b?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,b&&!l){let v=u instanceof HTMLElement?$e.get(u):void 0;Au(m,Hr(v,m.dataset.ncId))}});let c=_u(e,n),d=c.querySelector('[data-nc-fx-page="prev"]'),p=c.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===r-1?"true":"false");let h=c.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${r}`;h.textContent!==g&&(h.textContent=g);let y=c.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${r}`;y.textContent!==w&&(y.textContent=w)}function oo(e){return e.replace(/["\\]/g,"\\$&")}function Wu(e,t=Va){Ko();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=qr(Xn(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=Jo({labelledBy:r.id,onChange:b=>($e.get(n)??e).onToggle?.(b)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",o.append(r,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",h.append(g);let y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",n.append(y,o,p,h),n.setAttribute("aria-labelledby",r.id);let w=b=>{let v=$e.get(n)??e;n.dataset.ncOpen=b?"false":"true",p.hidden=b,h.hidden=!b,l.textContent=b?"+":"−",l.setAttribute("aria-expanded",b?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${b?"Show":"Hide"} ${v.title}`),l.title=b?"Show":"Hide",b?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let b=n.dataset.ncOpen==="true";ao(Xn(),($e.get(n)??e).id,b,t),w(b),$a(n.parentElement)}),h.addEventListener("click",()=>{ao(Xn(),($e.get(n)??e).id,!1,t),w(!1),$a(n.parentElement)});let m={pages:new Map,redraw:()=>f.redraw()},f={el:n,update(b){$e.set(n,b),b.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=b.title,d.textContent=b.status??"",b.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=b.summary??b.title,c.el.hidden=b.on===void 0,c.set(b.on===!0),b.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${b.title}`),Hu(p,b,m),w(p.hidden),f.redraw()},redraw(){let b=$e.get(n);b&&Tu(n,Xa(b))}};return $e.set(n,e),w(a),f.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>f.redraw()).observe(n),Xo(()=>f.redraw(),n.ownerDocument),f}function Gu(e,t,n="adjacent"){Ko(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(o.el),o.redraw()}),$a(e)}function $a(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let o=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Gr="netcomposer.studio.instances.v1",ro="netcomposer.studio.types-seen.v1",Yu=["petra-rhythm","olive-bass"];function Yr(e,t){return t===1?e:`${e}#${t}`}function Ua(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Zu(e,t){return t===1?e.name:`${e.name} ${t}`}function yt(e,t,n){const a=Zu(e,t),o=Vr(n,a);return{id:Yr(e.id,t),type:e.id,n:t,name:o,src:e.src,...o!==a?{custom:!0}:{}}}const Zr=20;function Vr(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Zr).join("").trim()||t}function Vu(e,t,n,a){return e.map(o=>{if(o.id!==t)return o;const r=a.find(s=>s.id===o.type);return r?yt(r,o.n,n):o})}function Xu(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Uu(e,t){const n=new Set(e.filter(o=>o.type===t.id).map(o=>o.n));let a=1;for(;n.has(a);)a++;return yt(t,a)}function Rt(e){return e.filter(t=>t.available!==!1).map(t=>yt(t,1))}function Ku(e,t){if(!Array.isArray(e))return Rt(t);const n=[];for(const a of e){const o=a&&typeof a=="object"?a:null,r=typeof a=="string"?a:o?.id;if(typeof r!="string")continue;const s=Ua(r),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===r)||n.push(yt(l,s.n,o?.name))}return n.length>0||e.length===0?n:Rt(t)}function Ka(){try{return globalThis.localStorage??null}catch{return null}}function Qu(e,t=Ka()){try{const n=t?.getItem(Gr);return n?Ku(JSON.parse(n),e):Rt(e)}catch{return Rt(e)}}function Ju(e,t,n=Ka()){let a=Yu;try{const s=JSON.parse(n?.getItem(ro)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const o=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(o.length===0)return[...e];const r=[...e];for(const s of o)r.some(l=>l.type===s.id)||r.push(yt(s,1));try{n?.setItem(ro,JSON.stringify([...new Set([...a,...o.map(s=>s.id)])]))}catch{}return r.length!==e.length&&wt(r,n),r}function ep(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function wt(e,t=Ka()){try{t?.setItem(Gr,JSON.stringify(ep(e)))}catch{}}function tp(e,t){const n=new Map;return(a,o)=>{const r=Ua(a),s=r?.type??a,l=o?.instance!==void 0?Number(o.instance):a.includes("#")?r?.n:void 0,u=e().filter(d=>d.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(d=>d.instance.n===l);else{const d=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});c=d.find(p=>p.readyState?.()!=="complete")??d[0]??u[0]}if(!c){if(t.some(p=>p.id===s))return null;const d=l!==void 0?Yr(s,l):a;return{id:d,name:d}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const Un="netcomposer.studio.pending-presets.v1",np=3e3,ap=6e4;function so(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function ip(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(o=>{clearTimeout(a),n(o)},()=>{clearTimeout(a),n(void 0)})})}function op(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Un)??"{}"),l={};if(s&&typeof s=="object")for(const[u,c]of Object.entries(s))so(c)&&(l[u]=c);return l}catch{return{}}},o=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Un,JSON.stringify(s)):l.removeItem(Un)}catch{}},r=async(s,l)=>{const u=a(),c=u[s];if(!c)return;delete u[s],o(u);let d=c.format===l.format;if(d)try{await l.set(c.data)}catch{d=!1}for(const p of n)p(s,d)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),r(s,l))},provided:()=>[...t.keys()],async collect(s,l=np){const u={};return await Promise.all(s.map(async c=>{const d=t.get(c);if(!d)return;const p=await ip(Promise.resolve().then(()=>d.get()),l);p!=null&&(u[c]={format:d.format,...d.version!==void 0?{v:d.version}:{},data:p})})),u},stash(s){const l={};for(const[u,c]of Object.entries(s))so(c)&&(l[u]=c);o(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return o({}),s}}}function rp(e,t){return`${e}@studio/${t}`}const sp=1,ie=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],Qa=[...ie];function lp(e,t,n={}){const a=n.instruments??ie;return{version:sp,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(o,r){if(typeof o!="string"||o.length===0||o.length>64)return null;const s=n.resolve?n.resolve(o,r):{id:o,name:a.find(p=>p.id===o)?.name??o};if(!s)return null;const l=t.attach(s.id,s.name),u=s.id,c=n.presets,d=n.share?.host(u);return{ctx:e,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:p=>rp(p,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...c?{providePreset:p=>c.provide(u,p)}:{},...d?{audioReceivers:d.audioReceivers,sendAudio:d.sendAudio,onAudio:d.onAudio,reveal:d.reveal}:{}}}}}const lo=16,cp=30;function dp(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,lo+1):[],a=t.until;if(n.length<1||n.length>lo||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const o=n[0],r=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=r||a-o>cp)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function up(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function pp(e,t){return t===null?e:`${t} · ${e}`}function mp(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function hp(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const o=t.createElement("span");o.className="count-in-n",n.append(a,o);const r=t.title,s=new Map;let l=!1;const u=()=>{const d=e.now();for(const[v,E]of s)d>=E.until&&s.delete(v);const[p,h]=[...s][0]??[],g=h?up(h,d):null;if(!p||!g){n.hidden=!0,delete n.dataset.accent,t.title=r,l=!1;return}n.hidden=!1;const y=e.clearOf?.()??[],w=`${mp(y.map(v=>v.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==w&&n.style.setProperty("--count-in-top",w);const m=e.labelOf(p);a.textContent!==m&&(a.textContent=m);const f=String(g.n);o.textContent!==f&&(o.textContent=f),n.toggleAttribute("data-accent",g.accent),n.setAttribute("aria-label",`${m} count-in ${f}`);const b=pp(r,g.n);t.title!==b&&(t.title=b),requestAnimationFrame(u)},c=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(d,p){if(typeof d!="string"||!d)return;const h=dp(p);h&&(s.set(d,h),c())},clear(d){s.delete(d)&&c()}}}}const fp=1e4;function gp(e=fp,t=globalThis){const n=new Set;let a=[];const o=()=>{if(n.size>0)return;const r=a;a=[];for(const s of r)s()};return{hold(){const r={};n.add(r);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(r)&&(t.clearTimeout(s),o())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(r=>a.push(r))}}}const Xr="netcomposer.studio.fx-fold.v1",Kn={a:!1,b:!1,insert:!1};function Ja(e){try{const t=e?.getItem(Xr);if(!t)return Kn;const n=JSON.parse(t);if(!n||typeof n!="object")return Kn;const a=n;return{a:a.a===!0,b:a.b===!0,insert:a.insert===!0}}catch{return Kn}}function Ur(e,t,n){const a={...Ja(e),[t]:n};try{e?.setItem(Xr,JSON.stringify(a))}catch{}return a}const Kr="netcomposer.studio.insert-fold.v1";function Qr(e){try{const t=e?.getItem(Kr),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Jr(e,t,n){const a=[...Qr(e)].filter(r=>r!==t);n&&a.push(t);const o=a.slice(-256);try{e?.setItem(Kr,JSON.stringify(o))}catch{}return new Set(o)}function bp(e,t){return Ja(e).insert?(Ur(e,"insert",!1),Jr(e,t,!0)):Qr(e)}function ne(){try{return globalThis.localStorage??null}catch{return null}}const yp={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function es(e,t){const n=t.fx[e],a=mn(n);for(const o of a.chain){const r=yp[e][o.type];n===void 0&&r&&Object.assign(o.dials,r),e==="a"?(o.bypass=o.type!=="plate",o.type==="plate"&&(o.dials.mix=100)):e==="b"?(o.bypass=o.type!=="delay",o.type==="delay"&&(o.dials.mix=100,o.dials.mode=0,o.dials.send=100)):o.bypass=o.type!=="drive"||!t.insert.on}return a}const ts="drive-1",ka=3;function wp(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return rt(e.masterFx,t);const n=e.insert.on?es("insert",e).chain.find(a=>a.type==="drive"):void 0;return rt({v:2,chain:n?[{id:ts,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function vp(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const xp={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function $p(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const Jt=e=>({channels:null,reason:e,message:xp[e]});function kp(e,t){const n=new Map,a=new Map;let o=1;const r=l=>{const u=t.nodeFor(l);if(!u)return null;const c=n.get(l);if(c&&c.source===u)return c.node;c?.node.disconnect();const d=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return d.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(d),n.set(l,{node:d,source:u}),d},s=async(l,u,c)=>{await t.ready;const d=r(l);if(!d)return Jt("no-source");if(!(c>u))return Jt("empty");const p=o++;return new Promise(h=>{a.set(p,(g,y)=>h(g?{channels:g}:Jt(y??"gone"))),d.port.postMessage({type:"take",id:p,from:u,to:c}),setTimeout(()=>{a.delete(p)&&h(Jt("timeout"))},$p(c,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const c=n.get(l)?.node??null,d=o++;let p=c;const h=y=>p?.port.postMessage(y);p?h({type:"record",id:d,from:u}):t.ready.then(()=>{p=r(l),h({type:"record",id:d,from:u})});let g=!1;return{stop(y){return g?Promise.resolve(null):(g=!0,new Promise(w=>{a.set(d,w),h({type:"record-end",id:d,to:y}),setTimeout(()=>{a.delete(d)&&w(null)},Math.max(0,(y-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){g=!0,h({type:"record-cancel",id:d})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>r(l)),!0):!1},take:(l,u,c)=>s(l,u,c).then(d=>d.channels),takeResult:s}}function Ep(e){const t=()=>{};return new Proxy(e,{get(n,a,o){if(a==="stop")return t;const r=Reflect.get(n,a,o);return typeof r=="function"?r.bind(n):r}})}const ns={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function Ap(e){return Math.floor(.006*e)}const Ea=1024,co=Ea+8192,Sp=.25;function Mp(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function Lp(e,t,n=OfflineAudioContext){const a=new n(1,co,e),o=a.createBuffer(1,co,e);o.getChannelData(0)[Ea]=Sp;const r=new AudioBufferSourceNode(a,{buffer:o}),s=t(a);r.connect(s.input),s.output.connect(a.destination),r.start(0);const l=await a.startRendering();return Mp(l.getChannelData(0),Ea)}function Tp(e,t=()=>Lp(e,n=>{const a=new DynamicsCompressorNode(n,ns);return{input:a,output:a}})){let n=Ap(e);const a=(async()=>{try{const o=await t();o!==null&&o>=0&&o<e/10&&(n=o)}catch{}})();return{get:()=>n,ready:a}}const Se=-54,Ht=6,fe=-Se/(Ht-Se),Cp=-9,Aa=(Cp-Se)/(Ht-Se);function as(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:Se+t*(Ht-Se)}function Np(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function Fp(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function He(e){return Np(as(e))}function Ip(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function zp(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:He(n.position))}function ei(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-Se)/(Ht-Se)))}function uo(e){return ei(Fp(e))}const po=[0,-6,-12,-24,-48].map(e=>({value:ei(e),label:e===0?"0":`−${-e}`})),Rp=1;function Dp(e){let t=0,n=0;for(const a of e){const o=Math.abs(a);o>t&&(t=o),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function mo(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<Se?0:ei(Math.min(Ht,n)):null}function Bp(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const is="netcomposer.studio.mix.v1",os={position:Aa,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function Dt(){return{v:1,channels:{},master:fe,returns:{a:{on:!0,level:fe},b:{on:!0,level:fe}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Ct=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Op=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,kn=(e,t)=>typeof e=="boolean"?e:t,Ie=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Pp(e){const t=Ie(e);return{position:Ct(t.position,os.position),mute:kn(t.mute,!1),solo:kn(t.solo,!1),sendA:Math.min(fe,Ct(t.sendA,0)),sendB:Math.min(fe,Ct(t.sendB,0)),pan:Op(t.pan)}}function rs(e){const t=Dt(),n=Ie(e);if(n.v!==1)return t;const a={};for(const[c,d]of Object.entries(Ie(n.channels)))c.length>0&&c.length<=64&&(a[c]=Pp(d));const o=Ie(n.returns),r=(c,d)=>{const p=Ie(c);return{on:kn(p.on,d.on),level:Ct(p.level,d.level)}},s={},l=Ie(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,d]of Object.entries(Ie(n.channelFx)))c.length>0&&c.length<=64&&d&&typeof d=="object"&&(u[c]=d);return{v:1,channels:a,master:Ct(n.master,t.master),returns:{a:r(o.a,t.returns.a),b:r(o.b,t.returns.b)},insert:{on:kn(Ie(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function ss(){try{return globalThis.localStorage??null}catch{return null}}function qp(e=ss()){try{const t=e?.getItem(is);return t?rs(JSON.parse(t)):Dt()}catch{return Dt()}}function ls(e,t=ss()){try{return t?.setItem(is,JSON.stringify(e)),t!==null}catch{return!1}}const In=3;function Hp(e,t=In){return Math.max(1,Math.ceil(e/t))}function ho(e,t=In){return Math.max(0,Math.floor(e/t))}function jp(e,t,n,a=null,o=In){const r=Hp(n.length,o)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return ho(s,o);const l=new Set(e.ids);let u=-1;return n.forEach((c,d)=>{l.has(c)||(u=d)}),u>=0?ho(u,o):Math.min(r,Math.max(0,e.page))}const H={"mix:sends":"The two send effects every channel feeds with its A and B knobs. Shown while no Inserts button is lit.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to go back to Reverb and Delay.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to go back to Reverb and Delay.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:toggle":"Hides or shows the send effects: the A · Reverb and B · Delay cards and every channel's A and B knobs. Only the view changes: the sends keep sounding as set. Inserts still opens a stack.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},cs="netcomposer.studio.sends.v1";function _p(e){try{return e?.getItem(cs)!=="0"}catch{return!0}}function Wp(e,t){try{e?.setItem(cs,t?"1":"0")}catch{}}function Gp(e){return e?{text:"− Sends",aria:"Hide the send effects"}:{text:"+ Sends",aria:"Show the send effects"}}const ds="netcomposer.studio.strip-fold.v1";function us(e){try{const t=e?.getItem(ds),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ps(e,t){try{e?.setItem(ds,JSON.stringify([...t].sort()))}catch{}return t}function ms(e,t,n){const a=new Set(us(e));return n?a.add(t):a.delete(t),ps(e,a)}function Yp(e,t){return ms(e,t,!1)}function Zp(e,t){const n=new Set(t),a=us(e),o=new Set([...a].filter(r=>n.has(r)));return o.size===a.size?a:ps(e,o)}const Vp=-18,Xp=-20,hs=3,Up=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],fo=[-20,-10,-7,-5,-3,0,1,2,3],Kp=.3,Qp=6.638/Kp,Jp=48;function em(e){return e-Vp}function fs(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-hs)/20))):e>0?1:0}function tm(e){return e>0?fs(em(20*Math.log10(e))):0}function ti(e){return(Math.min(1,Math.max(0,e))*2-1)*Jp}const go={x:0,v:0};function nm(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const o=Qp,r=e.x-t,s=e.v+o*r,l=Math.exp(-o*n),u=t+(r+s*n)*l,c=(e.v-o*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:c}}function am(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const gs="netcomposer.studio.vu.v1";function im(e){try{return e?.getItem(gs)==="1"}catch{return!1}}function om(e,t){try{e?.setItem(gs,t?"1":"0")}catch{}}const bs="netcomposer.studio.vu-fold.v1";function rm(e){try{return e?.getItem(bs)==="1"}catch{return!1}}function sm(e,t){try{e?.setItem(bs,t?"1":"0")}catch{}}const lm="http://www.w3.org/2000/svg",Sa=200,Qn=112,nt=Sa/2,Nt=132,bo=100,cm=108,dm=105,um=116,pm=103,mm=112,we=(e,t)=>{const n=document.createElementNS(lm,e);for(const[a,o]of Object.entries(t))n.setAttribute(a,String(o));return n},yo=e=>Math.round(e*100)/100;function Ft(e,t){const n=ti(fs(e))*Math.PI/180;return[yo(nt+t*Math.sin(n)),yo(Nt-t*Math.cos(n))]}function wo(e,t,n){const[a,o]=Ft(e,n),[r,s]=Ft(t,n);return`M ${a} ${o} A ${n} ${n} 0 0 1 ${r} ${s}`}const hm=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function vo(e){const t=we("svg",{class:"vu-meter",viewBox:`0 0 ${Sa} ${Qn}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(we("rect",{class:"vu-face",x:.5,y:.5,width:Sa-1,height:Qn-1,rx:4})),t.append(we("path",{class:"vu-arc",d:wo(Xp,0,bo)})),t.append(we("path",{class:"vu-zone",d:wo(0,hs,pm)}));for(const r of Up){const[s,l]=Ft(r,bo),[u,c]=Ft(r,fo.includes(r)?cm:dm);t.append(we("line",{class:r>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:c}))}for(const r of fo){const[s,l]=Ft(r,um),u=we("text",{class:r>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(r)===20||r===3?hm(r):String(Math.abs(r)),t.append(u)}const n=we("text",{class:"vu-legend",x:nt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=we("text",{class:"vu-side",x:10,y:Qn-10});a.textContent=e;const o=we("line",{class:"vu-needle",x1:nt,y1:Nt,x2:nt,y2:Nt-mm,transform:`rotate(${ti(0)} ${nt} ${Nt})`});return t.append(n,a,o),{svg:t,needle:o}}function fm(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const o=document.createElement("span");o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),a.append(o),a.setAttribute("data-nc-help",H["vu:fold"]);const r=document.createElement("span");r.className="nc-strip-name vu-name",r.textContent="Meters",r.setAttribute("data-nc-help",H["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",H["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,r,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(f=>{const b=document.createElement("span");b.className="vu-bar",b.dataset.side=f;const v=document.createElement("span");return v.className="vu-bar-fill",b.append(v),l.append(b),v});let c=e.folded;const d=()=>{t.toggleAttribute("data-folded",c),a.setAttribute("aria-expanded",c?"false":"true"),a.setAttribute("aria-label",c?"Expand VU meters":"Minimize VU meters"),a.title=c?"Expand":"Minimize"};d(),a.addEventListener("click",()=>{c=!c,d(),e.onFold(c)});const p=vo("L"),h=vo("R");t.append(n,p.svg,h.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),y=[go,go],w=[Number.NaN,Number.NaN],m=[p.needle,h.needle];return{el:t,frame(f,b){let v=!1;for(const E of[0,1]){const A=f?tm(f[E]):0;y[E]=nm(y[E],A,b,g.matches),(!am(y[E],A)||A>0)&&(v=!0);const x=Math.round(ti(y[E].x)*10)/10;x!==w[E]&&(w[E]=x,m[E].setAttribute("transform",`rotate(${x} ${nt} ${Nt})`),u[E].style.transform=`scaleY(${Math.max(0,Math.min(1,y[E].x)).toFixed(3)})`,t.dataset[E===0?"vuL":"vuR"]=x.toFixed(1))}return v}}}const gm="netcomposer.studio.hidden.v1",en=1/120,ve="master",xo="Inserts",bm="(max-width: 768px)",ys=8,ln=e=>Ip(as(e)),$o=e=>{const t=ln(e);return t==="−∞"?"off":`${t} dB`};function ym(e,t){return ot.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function wm(e,t,n){const a=n.bpm,o=$=>{const M=n.order(),L=M.indexOf($);return L<0?M.length:L},r=($,M,L,D)=>{const B=ym(L,D);if(!B||!M)return null;const te=Number(M.getParam(L,D)??B.default),re=`mix-${$}-${D}`;return B.options?{type:"select",id:re,label:B.label,value:String(te),options:B.options.map(N=>({value:String(N.value),label:N.label})),onChange:N=>{M.setParam(L,D,Number(N)),Q.render()}}:{type:"slider",id:re,label:B.label,min:B.min,max:B.max,step:B.step??1,value:te,valueText:B.format(te,a()),onChange:N=>{M.setParam(L,D,N),Q.render()}}},s=($,M,L,D)=>D.map(B=>r($,M,L,B)).filter(B=>B!==null),l=matchMedia(bm);let u=null;const c=$=>{u=$,Q.render()},d=$=>c(u===$?null:$);l.addEventListener("change",()=>Q.render());const p=($,M,L,D)=>{$.setParam(M,L,D),Q.render()},h=($,M,L,D)=>sc(M,L,{id:`hack-${$}-${L}-graph`,on:D,set:(B,te)=>p(M,L,B,te),help:{graph:H["eq:graph"],low:H["eq:low"],mid:H["eq:mid"],high:H["eq:high"]}}),g=($,M,L,D)=>{const B=Number(M.getParam(L,D.key)??D.default),te=`hack-${$}-${L}-${D.key}`,re=N=>p(M,L,D.key,N);return D.options?{type:"select",id:te,label:D.label,value:String(B),options:D.options.map(N=>({value:String(N.value),label:N.label})),onChange:N=>re(Number(N))}:{type:"slider",id:te,label:D.label,min:D.min,max:D.max,step:D.step??.001,value:B,valueText:Bo(D,B,a()),onChange:re}},y="",w={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let m=bp(ne(),`${ve}/${ts}`);const f=$=>({folded:m.has($),onFold:M=>{m=Jr(ne(),$,M),Q.render()},foldHelp:H["fx:fold"]});let b=null,v=null;const E=($,M,L,D)=>{const B=L.getChain(),te=B.map((N,ye)=>{const Wt=ce(N.type)?.dials??[],fi=se=>{L.moveEffect(N.id,se),v=`hack-${$}-${N.id}`,Q.render()},Gt=[];return ye>0&&Gt.push({type:"button",id:`hack-${$}-${N.id}-left`,label:"Move left",on:!1,onPress:()=>fi(ye-1)}),ye<B.length-1&&Gt.push({type:"button",id:`hack-${$}-${N.id}-right`,label:"Move right",on:!1,onPress:()=>fi(ye+1)}),Gt.push({type:"button",id:`hack-${$}-${N.id}-remove`,label:"Remove",ariaLabel:`Remove ${N.name} from ${M}`,on:!1,onPress:()=>{L.removeEffect(N.id),Q.render()}}),{type:"fx",id:`hack-${$}-${N.id}`,title:`${ye+1} · ${N.name}`,...f(`${$}/${N.id}`),depth:ye%4+1,on:!N.bypass,meter:jn(L,N.id)??void 0,meterHelp:H["fx:meter"],onToggle:se=>{L.setParam(N.id,"bypass",!se),Q.render()},controls:[...N.type==="eq"?[h($,L,N.id,!N.bypass)]:[],...Wt.filter(se=>!se.more).map(se=>g($,L,N.id,se))],maxHelp:H["fx:max"],more:[...Wt.filter(se=>se.more).map(se=>g($,L,N.id,se)),...Gt]}}),re=B.length>=D;return te.push({type:"fx",id:`hack-${$}-add`,title:`${M} · Inserts`,...f(`${$}/add`),depth:B.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,text:re?`${B.length} of ${D}: the stack is full.`:B.length===0?"No effects yet.":`${B.length} of ${D}, first to last.`},...re?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:y,options:[{value:y,label:"Effect…"},...El.map(N=>({value:N,label:ce(N)?.label??N}))],onChange:N=>{N!==y&&(L.addEffect(N,{dials:w[N]}),Q.render())}}]]}),te},A=$=>{const M=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:en,value:M.level,valueText:$o(M.level),onChange:L=>t.setReturn($,{level:L})}};let x=_p(ne()),k=Zp(ne(),n.order());const S=()=>[...t.list()].sort(($,M)=>o($.id)-o(M.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:ln($.strip.position),step:en,defaultValue:Aa,resetText:`${ln(Aa)} dB`,ticks:[...po],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:!x,onChange:M=>t.set($.id,{position:M}),onTypeIn:M=>{const L=mo(M);L!==null&&t.set($.id,{position:L})},onRemove:M=>n.onRemove($.id,M),folded:k.has($.id),onFold:M=>{k=ms(ne(),$.id,M),Q.render()},foldHelp:H["strip:fold"],foldedHelp:H["strip:folded"],...$.fx?{hacks:u===$.id,hacksLabel:xo,onHacks:()=>d($.id)}:{},pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:H["strip:pan"],onChange:M=>t.set($.id,{pan:Math.abs(M)<.005?0:M})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(M=>{const L=M==="A"?"sendA":"sendB",D=$.strip[L];return{id:`send-${M.toLowerCase()}-${$.id}`,label:M,ariaLabel:`${$.name} send ${M}`,min:0,max:fe,step:en*2,value:D,valueText:$o(D),defaultValue:0,onChange:B=>t.set($.id,{[L]:B})}})})),F=()=>({type:"strip",id:`strip-${ve}`,label:"Master",master:!0,sendsHidden:!x,...t.masterFx?{hacks:u===ve,hacksLabel:xo,onHacks:()=>d(ve)}:{},channels:2,value:t.masterPositionValue,valueText:ln(t.masterPositionValue),step:en,defaultValue:fe,resetText:"0.0 dB",ticks:[...po],onChange:$=>t.setMaster($),onTypeIn:$=>{const M=mo($);M!==null&&t.setMaster(M)}});let j=Ja(ne());const V=$=>({folded:j[$],onFold:M=>{j=Ur(ne(),$,M),Q.render()},foldHelp:H["fx:fold"]});let ee=im(ne()),R=null,ue=!0;const _t=$=>{ee=$,ue=!0,om(ne(),$),Q.render()},ge=()=>{const $=t.returns.a,M=t.returns.b,L=u===ve&&t.masterFx?{id:ve,name:"Master",fx:t.masterFx}:(()=>{const P=t.list().find(Wt=>Wt.id===u);return P?.fx?{id:P.id,name:P.name,fx:P.fx}:null})();L||(u=null);const D=t.masterFx?.getChain()??[],B=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:P=>t.setReturn("a",{on:P}),meter:jn($.fx)??void 0,meterHelp:H["fx:meter-return"],...V("a"),controls:[A("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:M.on,onToggle:P=>t.setReturn("b",{on:P}),meter:jn(M.fx)??void 0,meterHelp:H["fx:meter-return"],...V("b"),controls:[A("b"),...s("b",M.fx,"delay",["delay_beats","feedback"])],more:s("b",M.fx,"delay",["tone","low_cut"])}],te=L?[...L.id===ve&&l.matches&&x?B:[],...E(L.id,L.name,L.fx,L.id===ve?ka:ys)]:x?B:[],re=L?.id??"sends",N=te.map(P=>P.id),ye=jp(b,re,N,v);return b={key:re,ids:N,page:ye},v=null,{id:"mix",title:"Mix",summary:`${t.list().map(P=>P.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${D.filter(P=>!P.bypass).map(P=>P.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...S(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(P=>({value:P.id,label:P.available===!1?`${P.name} (soon)`:P.name,disabled:P.available===!1})),onAdd:P=>n.onAdd(P)}]},{id:"fx",area:"fx",label:L?`${L.name} inserts`:"Send effects",pageSize:In,page:ye,onPage:P=>{b&&(b={...b,page:P})},controls:te},...ee?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[F()]}]}},C=Wu(ge(),gm),oe=()=>C.el.toggleAttribute("data-hacks-folded",u===null&&l.matches);oe();const G=document.createElement("button");G.type="button",G.className="nc-page-action vu-add",G.dataset.vuAdd="",G.textContent="+ Meters",G.setAttribute("aria-label","Add VU meters"),G.setAttribute("data-nc-help",H["vu:add"]),G.addEventListener("click",()=>{_t(!0),R?.el.querySelector("[data-vu-remove]")?.focus()}),C.el.querySelector(".nc-module-end")?.prepend(G);const U=document.createElement("button");U.type="button",U.className="nc-page-action sends-toggle",U.dataset.sendsToggle="",U.setAttribute("data-nc-help",H["sends:toggle"]),U.addEventListener("click",()=>{x=!x,Wp(ne(),x),Q.render()}),G.after(U);const be=()=>{const{text:$,aria:M}=Gp(x);U.textContent!==$&&(U.textContent=$),U.setAttribute("aria-label",M),C.el.toggleAttribute("data-sends-hidden",!x)};be();const mi=()=>{G.hidden=ee;const $=C.el.querySelector('[data-nc-section="meters"]');!ee||!$||(R??=fm({onRemove:()=>{_t(!1),G.focus()},folded:rm(ne()),onFold:M=>{ue=!0,sm(ne(),M)}}),R.el.parentElement!==$&&$.append(R.el))};mi(),xm(C.el,n),vm(C.el,t,n),Ao(C.el),Eo(C.el),Gu(e,[C],"adjacent");const hi=$=>({peak:uo($.peak),rms:uo($.rms),over:$.peak>=Rp}),Q={module:C,get hacksShown(){return u},showHacks:c,render(){C.update(ge()),oe(),mi(),be(),Ao(C.el),Eo(C.el)},frame($){if(C.el.dataset.ncOpen!=="true")return;for(const L of t.list())Ji(C.el,`strip-${L.id}`)?.update([hi(L.levels())],$);const M=t.masterLevels();if(Ji(C.el,`strip-${ve}`)?.update(M.map(hi),$),R&&ee){const L=t.ctx.state==="running";L&&(ue=!0),ue&&(ue=R.frame(L?[M[0].rms,M[1].rms]:null,$))}}};return Q}const Jn="application/x-nc-strip",ft=".nc-strip:not([data-nc-master])",ko=`${ft}, .nc-strip-add`,cn=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function Eo(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?H["inserts:master"]:H["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",H["mix:sends"])}function Ao(e){for(const t of e.querySelectorAll(`${ft} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",H["strip:name"]);for(const t of e.querySelectorAll(`${ft} :is(.nc-strip-hd, .nc-strip-fold)`))!(t instanceof HTMLElement)||t.draggable||t.hasAttribute("data-renaming")||(t.draggable=!0,t.title="Drag to move this channel")}function vm(e,t,n){e.addEventListener("dblclick",a=>{const o=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,r=o?.closest(ft),s=cn(r??null),l=o?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??o.textContent??"",c=document.createElement("input");c.type="text",c.className="nc-strip-name-input",c.value=u,c.maxLength=Zr,c.spellcheck=!1,c.autocomplete="off",c.setAttribute("aria-label",`Rename ${u}`),c.setAttribute("data-nc-help",H["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(c,o),c.focus(),c.select();let d=!1;const p=h=>{if(d)return;d=!0;const g=c.value;c.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,h&&g!==u&&n.onRename?.(s,g)};c.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),c.addEventListener("blur",()=>p(!0)),c.addEventListener("click",h=>h.stopPropagation()),c.addEventListener("dragstart",h=>h.preventDefault())})}function xm(e,t){const n=()=>{for(const o of e.querySelectorAll("[data-drop]"))o.removeAttribute("data-drop");for(const o of e.querySelectorAll("[data-dragging]"))o.removeAttribute("data-dragging")},a=(o,r)=>{const s=o.getBoundingClientRect();return r<s.left+s.width/2?"before":"after"};e.addEventListener("dragstart",o=>{const s=(o.target instanceof Element?o.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(ft),l=cn(s??null);!l||!o.dataTransfer||!(s instanceof HTMLElement)||(o.dataTransfer.setData(Jn,l),o.dataTransfer.effectAllowed="move",o.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),e.addEventListener("dragover",o=>{if(!o.dataTransfer?.types.includes(Jn))return;const r=o.target instanceof Element?o.target.closest(ko):null;if(!(r instanceof HTMLElement))return;o.preventDefault(),o.dataTransfer.dropEffect="move";const s=r.matches(".nc-strip-add")?"before":a(r,o.clientX);if(r.getAttribute("data-drop")!==s){for(const l of e.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");r.setAttribute("data-drop",s)}}),e.addEventListener("drop",o=>{const r=o.dataTransfer?.getData(Jn),s=o.target instanceof Element?o.target.closest(ko):null;if(!r||!(s instanceof HTMLElement))return n();if(o.preventDefault(),s.matches(".nc-strip-add")){n(),t.onReorder?.(r,null);return}const l=cn(s),u=a(s,o.clientX);if(n(),!l||l===r)return;let c=l;if(u==="after"){const d=[...e.querySelectorAll(ft)],p=d[d.indexOf(s)+1];if(c=p?cn(p):null,c===r)return}t.onReorder?.(r,c)}),e.addEventListener("dragend",n)}const Fe=.012,ea=1024;class $m{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=fe;channels=[];listeners=new Set;scratch=new Float32Array(ea);restore;channelFx;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:ea});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:He(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,ns),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.recordOut=new MediaStreamAudioDestinationNode(t),this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const o=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(o),o.connect(this.masterMeters[0],0),o.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const r=s=>{const l=new GainNode(t,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(t,{gain:He(fe)}),d=a();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(d),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:d,on:u!==null,level:fe}};this.returns={a:r("a"),b:r("b")}}attach(t,n){let a=this.channels.find(o=>o.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const o=new GainNode(this.ctx,{gain:1}),r=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:ea}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(t)??null;c?(o.connect(c.input),c.output.connect(r)):o.connect(r);const d=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),h=new GainNode(this.ctx,{gain:1}),g=new GainNode(this.ctx,{gain:1}),y=new ChannelMergerNode(this.ctx,{numberOfInputs:2});r.connect(s),r.connect(d).connect(p),p.connect(h,0).connect(y,0,0),p.connect(g,1).connect(y,0,1),y.connect(this.bus),y.connect(l).connect(this.returns.a.bus),y.connect(u).connect(this.returns.b.bus),a={id:t,name:n,input:o,fader:r,stereo:d,split:p,balL:h,balR:g,panner:y,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(t)??os},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(o=>o.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(o=>o.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const o of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])o.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=r=>{const s=r?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const o=this.channels.find(r=>r.id===t);return o?a(o.fx):null}set(t,n){const a=this.channels.find(o=>o.id===t);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(He(t),this.ctx.currentTime,Fe),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],o=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,o,Fe)),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(He(a.level),o,Fe)),this.emit()}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}apply(){const t=zp(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,o)=>{a.fader.gain.setTargetAtTime(t[o]??0,n,Fe),a.sendA.gain.setTargetAtTime(He(a.strip.sendA),n,Fe),a.sendB.gain.setTargetAtTime(He(a.strip.sendB),n,Fe);const[r,s]=Bp(a.strip.pan);a.balL.gain.setTargetAtTime(r,n,Fe),a.balR.gain.setTargetAtTime(s,n,Fe)})}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Dp(this.scratch)}emit(){for(const t of this.listeners)t()}}const ni="studio";function km(){let e=null;const t=new Set,n=new Set,a=new Set,o=new Map,r=c=>{try{return o.get(c)?.()===!0}catch{return!1}},s=c=>{for(const d of[...c])try{d()}catch{}},l=c=>{if(c!==e){e=c;for(const d of n)d()}},u=(c,d)=>(c.add(d),()=>{c.delete(d)});return{owner:()=>e,claim(c){e===null&&l(c)},claimAll(){l(ni),s(t)},clear:()=>l(null),onAll:c=>u(t,c),member(c,d){return o.set(c,d),()=>{o.get(c)===d&&o.delete(c)}},out(c){for(const d of o.keys())if(d!==c&&r(d))return;s(a)},drop:c=>{o.delete(c)},onLastOut:c=>u(a,c),playing:()=>[...o.keys()].filter(r),onChange:c=>u(n,c)}}const Em=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function Am(e){return Em.find(t=>e(t))??null}function Sm(e){return e.startsWith("audio/mp4")?"m4a":e.startsWith("audio/ogg")?"ogg":"webm"}function Mm(e,t){const n=o=>String(o).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}-${n(e.getHours())}${n(e.getMinutes())}`}.${Sm(t)}`}class Lm{constructor(t){this.stream=t,this.mimeType=typeof MediaRecorder>"u"?null:Am(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=t=>{t.data.size>0&&this.chunks.push(t.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const t=this.recorder,n=this.mimeType;return!t||!n||t.state==="inactive"?Promise.resolve(null):new Promise(a=>{t.onstop=()=>{this.recorder=null;const o=new Blob(this.chunks,{type:n});a({blob:o,name:Mm(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},t.stop()})}}const Tm="NetComposer Studio",Ae=[40,240],Cm="nc-sync";function Nm(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${Cm}${n}`,locks:t?{request:(a,o,r)=>t.request(`${a}${n}`,o,r)}:null}}function Fm(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Im=.2,So=.3;function zm(e,t,n){const a=new ol({bpm:120,minBpm:Ae[0],maxBpm:Ae[1],timebase:"shared"}),o=new bl({app:Tm,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Ae},startLeadSeconds:Im,...n?{startGate:()=>n(),gatedStartLeadSeconds:So}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let r=!1,s=0,l=!1;return{clock:a,peer:o,async start(){r||(r=!0,await o.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:Te()});return}const c=++s,d=Te();l=!0;const p=()=>{c!==s||!l||(l=!1,o.isLeader&&!a.transport.running?(a.commitStart(Math.max(d,Te())+So,0),o.publishState()):a.play({at:Te()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Te()})},setTempo:u=>a.setTempo({bpm:Rm(u)}),playing:()=>a.transport.isPlayingAt(Te()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,c=Te();return u.isPlayingAt(c)?Dm(u.beatAt(c)):null},beatPhase(){const u=a.transport,c=Te();if(!u.isPlayingAt(c))return null;const d=u.beatAt(c);return d-Math.floor(d)},peers:()=>[...o.peers.values()]}}function Rm(e){return Number.isFinite(e)?Math.min(Ae[1],Math.max(Ae[0],Math.round(e*10)/10)):120}function Dm(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Ma="netcomposer.scene",ws=1,vs="netcomposer.studio.tempo.v1",xs="netcomposer.studio.scene-name.v1",En=120,ai="Untitled scene",Bm=2*1024*1024;function zn(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Ae[1],Math.max(Ae[0],Math.round(t*10)/10)):En}function Ye(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||ai}function Om(e){return{format:Ma,v:ws,name:Ye(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:zn(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function Pm(e,t){if(e.length>Bm)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Ma)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const r=new Set,s=[];for(const c of Array.isArray(a.instances)?a.instances:[]){if(!c||typeof c!="object")continue;const d=c.id;if(typeof d!="string")continue;const p=Ua(d);if(!p||!t.includes(p.type)||r.has(d))continue;r.add(d);const h=c.name;s.push({id:d,type:p.type,name:Vr(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[c,d]of Object.entries(a.presets))r.has(c)&&(u[c]=d);return{ok:!0,scene:{format:Ma,v:ws,name:Ye(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:zn(l)},meter:[4,4],instances:s,mix:rs(a.mix??Dt()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function qm(e){return`${Ye(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Hm(e){try{const t=e?.getItem(vs);return t?zn(Number(t)):En}catch{return En}}function $s(e,t){try{t?.setItem(vs,String(zn(e)))}catch{}}function jm(e){try{return Ye(e?.getItem(xs))}catch{return ai}}function ks(e,t){try{t?.setItem(xs,Ye(e))}catch{}}const _m=300,Wm=120*1e3;function Gm(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Ym(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const o=t.channels;if(!Array.isArray(o)||o.length<1||o.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!o.every(Gm))return{ok:!1,message:"Channels must be 32-bit float arrays."};const r=o[0].length;if(r===0)return{ok:!1,message:"The audio is empty."};if(o.some(u=>u.length!==r))return{ok:!1,message:"The channels differ in length."};if(r>_m*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:o.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Mo(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Zm(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,o=e.answerMs??Wm,r=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const c=e.brandOf?.(l);return{instance:l,name:a(l),...c?{brand:c}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:Mo(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>r(s),async sendAudio(l,u,c){const d=t.get(l);if(l===s||!d||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!Mo(d).some(y=>y.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const p=Ym(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let g;try{const y=await Promise.race([Promise.resolve(d.receive(h,c)),new Promise(w=>{g=setTimeout(()=>w({ok:!1,reason:"timeout",message:"No answer."}),o)})]);return!y||typeof y!="object"||typeof y.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:y}catch(y){return{ok:!1,reason:"error",message:y instanceof Error?y.message:String(y)}}finally{clearTimeout(g)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Vm="/studio/assets/silence-processor-BT_UBYxP.js";function Xm(e,t=Qa){const n=t.find(r=>r.id===e.type),a=(n?.name??e.type).toUpperCase(),o=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${o}`,...n?.identity?{identity:n.identity}:{}}}const La=Fc,ke=Nc,ta={system:"System",light:"Light",dark:"Dark"};function Um(e){try{return Da(e?.getItem(La))}catch{return"system"}}function Km(e,t){try{t==="system"?e?.removeItem(La):e?.setItem(La,t)}catch{}}const Qm=e=>ke[(ke.indexOf(e)+1)%ke.length]??"system";function Jm(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function Es(e,t){const n=Jm(e);n&&Ba(t,n)}function eh(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const o=ke.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=ta[s],l.append(u),l.setAttribute("aria-label",`${ta[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${ta[s]} theme`,l.addEventListener("click",()=>{const c=n.closest(".nc-page-menu[data-nc-open]")!==null,d=s===a&&!c?Qm(s):s;r(d),t(d),o[ke.indexOf(d)]?.focus({preventScroll:!0})}),l});n.append(...o);function r(s){a=s;for(const l of o){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return r(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(ke.indexOf(a)+l+ke.length)%ke.length,c=ke[u]??"system";r(c),t(c),o[u]?.focus()}),{el:n,get choice(){return a},set:r}}function th(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(r,s)=>{const l=new URL(String(r),t).href;let u=a.get(l);return u||(u=n(r,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const W=new AudioContext({latencyHint:"interactive"});th(W.audioWorklet,location.href);const ae=qp(),gt={},nh=ys,ii=new Map,Y=new $m(W,{restore:e=>ae.channels[e],fx:e=>{const t=_n(W,{moduleUrl:nn,bpm:120,state:es(e,ae)});return gt[e]=t,t},masterFx:()=>{const e=_n(W,{moduleUrl:nn,bpm:120,slots:ka,state:wp(ae,ka)});return e.onChange(Pt),e},channelFx:e=>{Mn.delete(e);const t=_n(W,{moduleUrl:nn,bpm:O.bpm(),slots:nh,state:ae.channelFx[e]??{v:2,chain:[]}}),n=Wo(t,O.clock,{mapper:Ze}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(Pt),ii.set(e,t),t}});Y.setMaster(ae.master);Y.setReturn("a",ae.returns.a);Y.setReturn("b",ae.returns.b);const Ze=new gl(W);Ze.start();const As=Fm();let Ss=()=>{};const Ms=Tp(W.sampleRate),Ls=kp(W,{nodeFor:e=>Y.tapNode(e),latencyFor:e=>Y.tapLatency(e,Ms.get()),sources:()=>[{id:"master",name:"Master"},...Y.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{Ss=e})}),le=km(),ct=op(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Ts=Zm({live:e=>z.some(t=>t.id===e),nameOf:e=>z.find(t=>t.id===e)?.name??e,brandOf:e=>{const t=z.find(a=>a.id===e),n=ie.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},reveal:e=>{Me(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),de.get(e)?.contentWindow?.focus()}});let Cs=!1;const oi=gp(),Ns=hp({now:()=>W.currentTime,labelOf:e=>{const t=z.find(a=>a.id===e),n=ie.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Rs,Sn,Bs]});window.ncStudio=lp(W,Y,{countIn:Ns.api,holdFirstPlay:()=>oi.hold(),presets:ct,share:Ts,grab:Ls,play:le,mapper:Ep(Ze),resolve:(e,t)=>sh(e,t),syncScope:As,fxWorklet:new URL(nn,location.href).href});const O=zm(()=>W.state,Nm(As),()=>Cs&&W.state==="running"&&Ze.ready&&oi.count===0?null:ph());function Oe(){try{return globalThis.localStorage??null}catch{return null}}O.setTempo(Hm(Oe()));const dn=new Lm(Y.recordOut.stream);let tn=null;function I(e,t={},...n){const a=document.createElement(e);for(const[o,r]of Object.entries(t))r===void 0||r===!1||a.setAttribute(o,r===!0?"":String(r));return a.append(...n),a}const Bt=I("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),bt=I("input",{type:"number",class:"bpm",min:Ae[0],max:Ae[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),An=I("output",{class:"position","aria-label":"Bar and beat"},"—"),ze=I("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),Mt=I("a",{class:"take",hidden:!0}),ri=I("span",{class:"status",role:"status"}),at=I("input",{type:"text",class:"scene-name",maxlength:60,value:jm(Oe()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Fs=I("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Is=I("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),zs=I("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),It=I("input",{type:"file",accept:".json,application/json",hidden:!0}),si=eh(Um(Oe()),e=>{Km(Oe(),e),Ba(e);for(const t of de.values())Es(t,e)});Ba(si.choice);const Rs=I("h1",{class:"brand","aria-label":"NetComposer Studio"},I("span",{"aria-hidden":"true"},"NetComposer",I("span",{class:"brand-sep"}," / "),"Studio")),Ta=I("span",{class:"beat-light","aria-hidden":"true"}),li=I("span",{class:"status-long"}),ci=I("span",{class:"status-short"});ri.append(li,ci);const Sn=I("header",{class:"top"},I("div",{class:"transport"},Bt,I("label",{class:"tempo"},bt,I("span",{class:"tempo-unit"},"BPM")),Ta,An),I("div",{class:"record"},ze,Mt),ri),Ds=I("div",{class:"scene-actions"},at,Fs,Is,zs,si.el),ah=Bu({panel:Ds}),Bs=I("div",{class:"scene",role:"group","aria-label":"Scene"},Ds,It,ah.button);dn.supported||(ze.disabled=!0,ze.title="This browser can't record audio");const vt=I("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Os=I("div",{class:"stage"}),jt=I("label",{class:"tab tab-add",title:"Add an instrument"},I("span",{"aria-hidden":"true"},"+")),dt=I("select",{class:"tab-add-select","aria-label":"Add an instrument"});dt.append(I("option",{value:""},"Add an instrument"),...Qa.map(e=>{const t=I("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));dt.addEventListener("change",()=>{const e=dt.value;dt.value="",e&&Ys(e)});jt.append(dt);vt.append(jt);Fu();const Ot=I("div",{class:"spine","aria-hidden":"true"}),de=new Map;let z=Ju(Qu(ie),ie),Le=z[0]?.id??"";const ih=new URLSearchParams(location.search).has("measure"),Lo=new Map,oh=2e4;function Ps(e){const t=I("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);t.addEventListener("click",()=>Me(e.id)),vt.insertBefore(t,jt);const a=(Lo.get(e.type)??Promise.resolve()).then(()=>new Promise(o=>{if(!z.some(l=>l.id===e.id))return o();const r=I("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Xu(e,ih),allow:"autoplay; clipboard-read; clipboard-write; microphone"});de.set(e.id,r);const s=window.setTimeout(o,oh);r.addEventListener("load",()=>rh(r)),r.addEventListener("load",()=>{window.clearTimeout(s),o()},{once:!0}),Os.append(r),Me(Le)}));return Lo.set(e.type,a),a}const qs=window.matchMedia(_c);function Hs(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",qs.matches)}catch{}}qs.addEventListener("change",()=>{for(const e of de.values())Hs(e)});function rh(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",Es(e,si.choice),Hs(e);const n=e.id.replace(/^panel-/,""),a=()=>{const r=t?.querySelector(".nc-page"),s=r?r.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(_s.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Le&&Ws())};a();const o=t.querySelector(".nc-page")??t.body;o&&new ResizeObserver(()=>{a(),Rn()}).observe(o),di.add(e),js(e)}const di=new Set;function js(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){di.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Sn).position==="sticky"?Sn.getBoundingClientRect().bottom:0,o=Math.min(n.height,Math.max(0,a-n.top)),r=Math.max(o,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(o)}px`),t.style.setProperty("--nc-host-height",`${Math.round(r-o)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-r)}px`)}let na=!1;function Rn(){na||(na=!0,requestAnimationFrame(()=>{na=!1;for(const e of di)js(e)}))}window.addEventListener("scroll",Rn,{passive:!0});window.addEventListener("resize",Rn);const _s=new Map;function Ws(){const e=_s.get(Le);e===void 0?Ot.style.removeProperty("--spine-top"):Ot.style.setProperty("--spine-top",`${e}px`)}function Gs(e){if(!e){Ot.replaceChildren();return}const t=Xm(e),n=I("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),Ot.replaceChildren(I("span",{class:"spine-text"},n,I("span",{class:"spine-rest"},t.rest)))}function Me(e){Le=e,Gs(z.find(t=>t.id===e)),Ws(),Rn();for(const t of z){const n=t.id===e;de.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const sh=tp(()=>z.map(e=>({instance:e,window:()=>de.get(e.id)?.contentWindow,readyState:()=>{try{return de.get(e.id)?.contentDocument?.readyState}catch{return}}})),ie);function Ys(e){const t=ie.find(o=>o.id===e);if(!t)return;const n=Uu(z,t),a=z.map(o=>o.type).lastIndexOf(n.type);z=a<0?[...z,n]:[...z.slice(0,a+1),n,...z.slice(a+1)],wt(z),Ps(n);for(const o of z){const r=document.getElementById(`tab-${o.id}`);r&&vt.insertBefore(r,jt)}Me(n.id),Ve?.render()}function lh(e,t){const n=z.find(r=>r.id===e);if(!n)return;const a=z.filter(r=>r.id!==e),o=t===null?a.length:a.findIndex(r=>r.id===t);z=[...a.slice(0,o<0?a.length:o),n,...a.slice(o<0?a.length:o)],wt(z);for(const r of z){const s=document.getElementById(`tab-${r.id}`);s&&vt.insertBefore(s,jt)}Ve?.render()}function ch(e,t){z=Vu(z,e,t,ie),wt(z);const n=z.find(o=>o.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&(a.textContent=n.name),de.get(e)?.setAttribute("title",n.name),Le===e&&Gs(n),Y.rename(e,n.name)}async function dh(e,t){const a=z.find(l=>l.id===e)?.name??e;if(!await Oa({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;z=z.filter(l=>l.id!==e),wt(z),Ts.forget(e);const r=le.playing().includes(e);le.drop(e),r&&le.out(e);const s=de.get(e);de.delete(e),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${e}`)?.remove(),Y.detach(e),uh(e),Yp(ne(),e),Le===e&&Me(z[0]?.id??"")}const Ca=I("div",{class:"mix"});Ca.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Le&&z.some(a=>a.id===n)&&Me(n)});let Ve=null,Na=0;const Mn=new Set;function uh(e){Mn.add(e),delete ae.channels[e],delete ae.channelFx[e],ii.delete(e),Pt()}let Zs=!1;function Pt(){window.clearTimeout(Na),!Zs&&(Na=window.setTimeout(()=>{ls(Vs())},300))}function Vs(){const e={...ae.channels};for(const o of Y.list())e[o.id]=o.strip;for(const o of Mn)delete e[o];const t={};for(const o of["a","b"]){const r=gt[o];r&&(t[o]=r.getState())}const n=Y.masterFx?.getState()??null,a={...ae.channelFx};for(const[o,r]of ii)a[o]=r.getState();for(const o of Mn)delete a[o];return{v:1,channels:e,master:Y.masterPositionValue,returns:{a:{on:Y.returns.a.on,level:Y.returns.a.level},b:{on:Y.returns.b.on,level:Y.returns.b.level}},insert:{on:n?vp(n):ae.insert.on},fx:t,channelFx:a,masterFx:n??ae.masterFx}}Y.onChange(()=>{Ve?.render(),Pt()});for(const e of Object.values(gt))e?.onChange(Pt);async function ui(){W.state!=="running"&&await W.resume()}const To=1500;async function ph(){const e=performance.now()+To;await Promise.race([ui(),new Promise(t=>setTimeout(t,To))]),await Ze.whenSettled(Math.max(0,e-performance.now())),await Promise.race([oi.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}Bt.addEventListener("click",()=>{ui(),O.running()&&le.owner()===ni?O.stop():O.running()?le.claimAll():(le.claimAll(),O.play()),Pe()});function Xs(){const e=Number(bt.value);O.setTempo(e),$s(O.bpm(),Oe())}at.addEventListener("change",()=>{at.value=Ye(at.value),ks(at.value,Oe())});function mh(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),o=I("a",{href:a,download:e});document.body.append(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Fs.addEventListener("click",async()=>{const e=Ye(at.value),t=z.map(r=>r.id),n=await ct.collect(t),a=Om({name:e,bpm:O.bpm(),instances:z,mix:Vs(),presets:n});mh(qm(e),`${JSON.stringify(a,null,2)}
`,"application/json");const o=z.filter(r=>!n[r.id]).map(r=>r.name);pi(o.length?`Saved “${e}” (without ${o.join(", ")}: ${o.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});Is.addEventListener("click",()=>It.click());It.addEventListener("change",async()=>{const e=It.files?.[0];if(It.value="",!e)return;const t=Pm(await e.text(),ie.filter(o=>o.available!==!1).map(o=>o.id));if(!t.ok){pi(t.error);return}const n=t.scene;await Oa({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Us({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});zs.addEventListener("click",async()=>{await Oa({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Us({name:ai,bpm:En,instances:Rt(ie),mix:Dt()})});function Us(e){O.running()&&O.stop(),Zs=!0,window.clearTimeout(Na);const t=e.instances.map(({id:n,name:a})=>{const[o,r]=n.split("#"),s=ie.find(l=>l.id===o);return s?yt(s,r?Number(r):1,a):null}).filter(n=>n!==null);wt(t),ls(e.mix),$s(e.bpm,Oe()),ks(e.name,Oe()),ct.stash({...e.presets??{}}),location.reload()}let Co=0;function pi(e){li.textContent=e,ci.textContent=e,window.clearTimeout(Co),Co=window.setTimeout(Pe,4e3)}bt.addEventListener("change",Xs);bt.addEventListener("keydown",e=>{e.key==="Enter"&&Xs()});ze.addEventListener("click",async()=>{if(ui(),dn.recording){const e=await dn.stop();ze.setAttribute("aria-pressed","false"),ze.textContent="Rec",e&&(tn&&URL.revokeObjectURL(tn.url),tn={url:URL.createObjectURL(e.blob),take:e},Mt.href=tn.url,Mt.download=e.name,Mt.textContent=`Save take (${e.seconds.toFixed(1)} s)`,Mt.hidden=!1)}else dn.start(),ze.setAttribute("aria-pressed","true"),ze.textContent="Stop rec"});document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),Bt.click())});vt.addEventListener("keydown",e=>{if(e.target===dt)return;const t=z.map(o=>o.id),n=t.indexOf(Le),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),Me(a),document.getElementById(`tab-${a}`)?.focus())});function Pe(){const e=O.running()&&le.owner()===ni;Bt.textContent=e?"Stop":"Play",Bt.setAttribute("aria-pressed",String(e)),document.activeElement!==bt&&(bt.value=String(Math.round(O.bpm()*10)/10));const t=O.position();An.value=t?`${t.bar}.${t.beat}`:"—";const n=O.peers().length;li.textContent=W.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",ci.textContent=W.state==="running"?"":"Audio off",ri.classList.toggle("off",W.state!=="running")}O.clock.onChange(()=>{O.clock.transport.running&&(Cs=!0),O.running()||le.clear(),Pe()});le.onChange(Pe);le.onLastOut(()=>{O.running()&&O.stop(),Pe()});O.clock.onChange(()=>Ve?.render());O.peer.onPeers(Pe);W.addEventListener("statechange",Pe);const hh=.25;let No=performance.now();function Ks(e){const t=Math.min(.1,(e-No)/1e3);No=e,Ve?.frame(t);const n=O.position(),a=n?`${n.bar}.${n.beat}`:"—";An.value!==a&&(An.value=a);const o=O.beatPhase(),r=o!==null&&o<hh;Ta.hasAttribute("data-on")!==r&&Ta.toggleAttribute("data-on",r),requestAnimationFrame(Ks)}async function fh(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(Rs,Sn,Bs,Ca,I("main",{class:"instruments"},vt,I("div",{class:"bay"},Ot,Os)),Ns.el),Ve=wm(Ca,Y,{order:()=>z.map(t=>t.id),catalogue:Qa,bpm:()=>O.bpm(),onAdd:Ys,onRemove:(t,n)=>void dh(t,n),onReorder:(t,n)=>lh(t,n),onRename:(t,n)=>ch(t,n)}),W.state==="running"&&await W.suspend(),await W.audioWorklet.addModule(Vm),Ss(),await O.start();for(const t of[gt.a,gt.b,Y.masterFx])t&&Wo(t,O.clock,{mapper:Ze});for(const t of z)Ps(t);Me(Le),Pe(),requestAnimationFrame(Ks),document.documentElement.dataset.studioReady="",gh()}function gh(){const e=new Set(ct.pending());if(!e.size)return;const t=[],n=r=>z.find(s=>s.id===r)?.name??r,a=()=>{window.clearTimeout(o);const r=[...t,...ct.dropPending()].map(n);pi(r.length?`Scene loaded; ${r.join(", ")} kept ${r.length===1?"its":"their"} own sound`:"Scene loaded")};ct.onApplied((r,s)=>{e.delete(r)&&(s||t.push(r),e.size||a())});const o=window.setTimeout(a,ap)}window.__studio={ctx:W,mixer:Y,grab:Ls,limiterDelay:Ms,mapper:Ze,transport:O,frames:de,show:Me,get instances(){return z},fx:gt,get mix(){return Ve}};fh();
