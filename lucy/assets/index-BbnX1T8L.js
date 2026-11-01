(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Oe=1e-9;function Ao(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Wn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Ao(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+Oe&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=e.beat+Oe)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Oe){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Oe;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Wn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+Oe)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+Oe)return n[a];return n[0]}}const Eo=Object.freeze({beatsPerBar:4,beatUnit:4}),_e=1e-9;function Mo(t){return Math.floor(t+_e)}function ii(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-_e)*e;return n&&o<=t+_e?o+e:o}class Lo{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Wn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Eo}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-_e&&(this.stopTime===null||e<this.stopTime-_e)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-_e?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=Mo(e/n),o=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return ii(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const oi="nc-clock/snapshot",ri=1;function Co(t,e="local"){return{format:oi,version:ri,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function To(t,e){const n=Fo(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const me=t=>typeof t=="number"&&Number.isFinite(t),la=t=>t===null||me(t);function Fo(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==oi&&n("format"),(!me(e.version)||Math.floor(e.version)!==ri)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!me(e.anchor.beat)||!me(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&me(a.beat)&&me(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!me(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!me(e.meter.beatUnit))&&n("meter"),(!la(e.startTime)||!la(e.stopTime)||!me(e.stoppedBeat))&&n("transport times"),e}class No{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Lo(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){To(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Co(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Io="nc-sync/1",zo=1,Ro="nc-sync",Bo="nc-sync-leader",Do=0,si=.5,li=.75;function jo(t){return typeof t=="number"&&Number.isFinite(t)&&t>=si&&t<=li?t:null}const dn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),rt=t=>typeof t=="number"&&Number.isFinite(t),Nt=t=>typeof t=="string"&&t.length>0;function Wo(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==zo||!Nt(e.type)||!Nt(e.from)||!rt(e.term)||!rt(e.seq)||!rt(e.sentAt))return null;switch(e.type){case"hello":return Nt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return rt(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&rt(e.slot)?e:null;case"ping":case"pong":return Nt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Oo(t,e,n,a,o){return{proto:Io,from:e,term:n,seq:a,sentAt:o,...t}}function oe(){return(performance.timeOrigin+performance.now())/1e3}const un=.003,Po=3,pn=.002+1e-6,Ho=.01,ca=500;class da{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Ho:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=un&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(a&&r){const l=this.offsets,c=this.preStep;l.length=0;for(let u=0;u<c.length;u++)l.push(c[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const u=this.offsets,d=this.preStep;d.length=0;for(let h=0;h<u.length;h++)d.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,c=e-n;for(let u=0;u<l.length;u++)l[u]+=c;this.stepCount++,s={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const s=e[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const o=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=un&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<ca)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=un)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<ca)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(Po,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let c=0;for(let u=0;u<n;u++)Math.abs(e[u]-e[l])<=pn&&c++;c>r&&(o=l,r=c)}if(r<a)return;const s=e[o];for(let l=n-1;l>=0;l--)Math.abs(e[l]-s)>pn&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=pn}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class Go{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...dn,...e.capabilities},this.channelOption=e.channel??Ro,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),r=()=>{n===this.startWaits&&e(o)};return a.then(r,r),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?o:Math.max(e+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??ii(c,1),c);a&&a>0?(s.tempo.rampTempo(e,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,u),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(li,Math.max(si,e)):Do;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=jo(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=Wo(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...dn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...dn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Bo,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Oo(e,this.id,this.term,++this.seq,this.o.now()))}}const Yo="modulepreload",Zo=function(t){return"/lucy/"+t},ua={},qo=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=s(n.map(u=>{if(u=Zo(u),u in ua)return;ua[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Yo,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((g,w)=>{f.addEventListener("load",g),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var Xo=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],An=[.25,.5,.75,1,1.5,2],_o=4.9,P={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ne={fmt:"wet"},de={fmt:"pct"},Pe={fmt:"db"},It={fmt:"signedPct"},hn={fmt:"num",suffix:" ms"},D={div:100};function M(t,e,n,a,o,r,s,l){var c={key:t,label:e,min:n,max:a,default:o,step:1,k:r,unit:null,format:s};if(l)for(var u in l)c[u]=l[u];return c}function zt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var ft=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:P.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:P.hpHz,astrid:!0,zero:"off"}),M("q","Resonance",0,100,0,2,{fmt:"q",law:P.hpQ},{dsp:{law:P.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[M("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:P.bpHz,astrid:!0},{dsp:{law:P.bpHz}}),M("q","Q",0,100,0,2,{fmt:"q",law:P.bpQ},{dsp:{law:P.bpQ}}),M("mix","Mix",0,100,100,3,Ne,{dsp:D,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[M("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:zt(Xo),overriddenBy:"beats_free",tempoSynced:!0}),M("feedback","Feedback",0,90,35,2,de,{dsp:D,unit:"%"}),M("mix","Wet/dry",0,100,0,3,Ne,{dsp:D,unit:"%",astridKey:"wet"}),M("tone","Tone",0,100,100,4,{fmt:"hz",law:P.delayTone,offAt:100},{dsp:{div:99},more:!0}),M("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:zt([[0,"Insert"],[1,"Send"]]),more:!0}),M("send","Send",0,100,100,7,de,{dsp:D,unit:"%",more:!0}),M("mod_send","Accent → send",-100,100,0,8,It,{dsp:D,unit:"%",more:!0}),M("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[M("predelay","Pre-delay",0,200,0,1,hn,{dsp:{div:1e3},unit:"ms"}),M("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:D,unit:"%"}),M("decay","Decay",0,100,50,3,de,{dsp:D,unit:"%"}),M("damping","Damping",0,100,0,4,de,{dsp:D,unit:"%"}),M("mix","Mix",0,100,0,5,Ne,{dsp:D,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[M("rate","Rate",0,100,26,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),M("depth","Depth",0,100,70,2,de,{dsp:D,unit:"%"}),M("feedback","Feedback",-90,90,50,3,It,{dsp:D,unit:"%"}),M("mix","Mix",0,100,50,4,Ne,{dsp:D,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[M("rate","Rate",0,100,52,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),M("depth","Depth",0,100,50,2,de,{dsp:D,unit:"%"}),M("spread","Spread",0,100,70,3,de,{dsp:D,unit:"%"}),M("mix","Mix",0,100,40,4,Ne,{dsp:D,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[M("rate","Rate",0,100,39,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),M("depth","Depth",0,100,70,2,de,{dsp:D,unit:"%"}),M("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:zt([[4,"4"],[6,"6"],[8,"8"]])}),M("feedback","Feedback",0,90,30,4,de,{dsp:D,unit:"%"}),M("mix","Mix",0,100,50,5,Ne,{dsp:D,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[M("low_db","Low",-18,18,0,1,Pe,{unit:"dB"}),M("mid_db","Mid",-18,18,0,2,Pe,{unit:"dB"}),M("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:P.midHz,astrid:!0},{dsp:{law:P.midHz}}),M("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:P.eqQ},{dsp:{law:P.eqQ}}),M("high_db","High",-18,18,0,4,Pe,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[M("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),M("output_db","Output",-12,12,0,2,Pe,{unit:"dB"}),M("mix","Mix",0,100,100,3,Ne,{dsp:D,unit:"%"}),M("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:zt([[0,"Smooth"],[1,"Acid"]]),more:!0}),M("tone","Tone",0,100,100,5,{fmt:"hz",law:P.driveTone,offAt:100},{dsp:{div:99},more:!0}),M("mod_drive","Accent → drive",-100,100,0,6,It,{dsp:D,unit:"%",more:!0}),M("mod_tone","Accent → tone",-100,100,0,7,It,{dsp:D,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[M("threshold_db","Threshold",-60,0,0,1,Pe,{unit:"dB"}),M("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:P.ratio},{dsp:{law:P.ratio}}),M("attack_ms","Attack",1,100,10,3,hn,{unit:"ms"}),M("release_ms","Release",10,1e3,150,4,hn,{unit:"ms"}),M("makeup_db","Makeup",0,24,0,5,Pe,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[M("width","Width",0,200,100,1,de,{dsp:D,unit:"%"}),M("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:D})]}],Uo=ft.map(function(t){return t.type});ft.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Vo={reverb:"plate"};function On(t){var e=Vo[t]||t;return Uo.indexOf(e)>=0?e:null}function ke(t){for(var e=On(t),n=0;n<ft.length;n++)if(ft[n].type===e)return ft[n];return null}function Xe(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function ci(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Xe(n.law,e);return a===null?0:a}function pa(t,e){return Math.min(_o,t*60/(e>0?e:120))}var ha=function(t){return t>0?"+":t<0?"−":""};function Ko(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function di(t,e,n){var a=t.format,o;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:ha(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return ha(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(o=Xe(a.law,e),o===null?a.zero||"open":a.astrid?Ko(o):o+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Xe(a.law,e).toFixed(1);case"ratio":return Xe(a.law,e).toFixed(1)+":1";case"rate":return o=Xe(a.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(pa(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(pa(e,n)*1e3)+" ms"}return String(e)}var Jo=1,Jt=["drive","delay","plate"];function Qo(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,o){return di(t,a,o)},e}var gt=Jt.map(function(t){var e=ke(t),n={type:t,label:e.label,dials:e.dials.map(Qo)};return e.tempoSynced&&(n.tempoSynced=!0),n}),er={reverb:"plate"};function Ht(t){var e=er[t]||t;return Jt.indexOf(e)>=0?e:null}function Qt(t){for(var e=Ht(t),n=0;n<gt.length;n++)if(gt[n].type===e)return gt[n];return null}function ui(t,e){var n=Qt(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function et(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Me(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(a-e)&&(a=t.options[o].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function tr(){return{v:Jo,chain:gt.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function nr(t){return An.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},An[0])}function mn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ar(t){for(var e=Array.isArray(t)?t:mn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=tr(),o={},r=[],s=0;s<e.length;s++){var l=e[s];if(mn(l)){var c=Ht(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(o[c]){r.push(c);continue}o[c]=!0;var u=a.chain[Jt.indexOf(c)],d=mn(l.dials)?l.dials:{};c==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,Qt(c).dials.forEach(function(h){u.dials[h.key]=Me(h,d[h.key])}),ir(c,u.dials,d)}}return{state:a,dropped:r}}function ir(t,e,n){for(var a=Qt(t),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(e[r.key]=Me(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],et(r,e)))}}function En(t){return ar(t).state}function or(t){return JSON.parse(JSON.stringify(t))}var rr=24,Mn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ln(t,e,n){if(e==="bypass")return n?0:1;var a=ui(t,e)||sr(t,e);return a?ci(a,n):0}function sr(t,e){var n=ke(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var lr={};gt.forEach(function(t){t.dials.forEach(function(e){lr[t.type+"."+e.key]=e.format})});function fn(t,e){var n=new Float64Array(rr),a=En(t);return a.chain.forEach(function(o){var r=Mn[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=Ln(o.type,s,o.dials[s])})}),n}var cr=2,Gt=3,dr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function st(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Pn(t,e){var n=ke(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function ur(t){var e=ke(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function pr(t,e,n){var a=t.length-1,o=Math.max(0,Math.min(a,n));if(e<0||e>a||e===o)return t;var r=t.slice(),s=r.splice(e,1)[0];return r.splice(o,0,s),r}function hr(t){return typeof t=="number"&&isFinite(t)?nr(t):t}function ma(t,e,n){var a={};return t.dials.forEach(function(o){var r=e[o.key];r===void 0&&o.astridKey&&(r=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(r=hr(r)),a[o.key]=Me(o,r)}),t.dials.forEach(function(o){o.stepWhen&&(a[o.key]=Me(o,typeof e[o.key]=="number"?e[o.key]:a[o.key],et(o,a)))}),a}function mr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,o=1/0,r=t.min;r<=t.max;r++){var s=Xe(n.law,r),l=s===null?1/0:Math.abs(s-e);l<o&&(o=l,a=r)}return a}}var fr={rate:"rate_hz"};function gr(t,e,n,a){var o={};return t.dials.forEach(function(r){if(!r.more){var s=r.astridKey||fr[r.key]||r.key;o[r.key]=mr(r,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function br(t,e){var n=e>0?Math.floor(e):Gt,a=[],o=[],r=[],s=!1,l=!1;Array.isArray(t)?(r=t,l=!0):st(t)&&Array.isArray(t.chain)&&(r=t.chain,s=t.v===1,l=t.schema===2);for(var c=[],u=0;u<r.length;u++){var d=r[u];if(st(d)&&!(d.type==="limiter"||d.fixed===!0)){var h=On(d.type),f=h&&ke(h);if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof d.type=="string"&&a.push(d.type);continue}if(c.length>=n){a.push(d.id||h);continue}var g;st(d.params)&&!st(d.dials)?g=ma(f,gr(f,d.params,o,d.id||h),l):g=ma(f,st(d.dials)?d.dials:{},l);var w=Pn(h,c),y=typeof d.id=="string"&&dr.test(d.id)&&!c.some(function(m){return m.id===d.id})?d.id:w.id,p=s?d.bypass!==!1:d.bypass===!0;c.push({id:s?w.id:y,type:h,bypass:p,dials:g})}}return{state:{v:cr,chain:c},dropped:a,notes:o}}function bt(t,e){return br(t,e).state}function He(t){var e=ke(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,ci(a,t.dials[a.key])])}),n}function yr(t){var e=bt(t,8),n=[],a=e.chain.map(function(o,r){var s=ke(o.type),l={};return r>=Gt&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var u=o.dials[c.key];if(c.more){u!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&An.indexOf(u)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=u}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var wr="nc-fx@1",vr=600,kr=256,xr=8,lt=typeof WeakMap=="function"?new WeakMap:null;function $r(t,e){var n=lt&&lt.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await qo(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),lt&&(lt.set(t,n),n.catch(function(){lt.delete(t)})),n)}function Ge(t,e){return typeof t=="number"&&isFinite(t)?t:e}function pi(t,e,n,a){var o=Math.min(400,Math.max(20,Ge(e.bpm,120))),r=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",c=Ge(e.preGain,1),u=Math.max(0,Ge(e.crossfade,.012)),d=Ge(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),g=t.createGain(),w=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),w.gain.value=0,h.connect(g),g.connect(f),w.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o},m=n(o);p.post=function(k){p.node?p.node.port.postMessage(k):p.disposed||(r.length>=kr&&(r=a().concat([{t:"tempo",bpm:p.bpm,when:0}])),r.push(k))};function b(k){var A=r.map(function($){var E=Object.assign({},$);return E.when>k||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return r=[],A}p.emit=function(k){for(var A=0;A<p.listeners.length;A++)try{p.listeners[A](k)}catch($){typeof console<"u"&&console.error($)}},p.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;p.tooFar=function(k){return typeof k=="number"&&k>t.currentTime+vr?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=$r(t,e.moduleUrl).then(function(){if(!p.disposed){var k=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:d},m);k.pending=b(t.currentTime),p.node=new AudioWorkletNode(t,wr,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(w);var A=t.currentTime;A<=0||u===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,A),g.gain.linearRampToValueAtTime(0,A+u),w.gain.setValueAtTime(0,A),w.gain.linearRampToValueAtTime(1,A+u)),p.status="ready"}},function(k){p.status="unavailable",r=[],p.error=k});return p.core={input:h,output:f,modInput:y,ready:S,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(k,A){var $=Ge(k,NaN);!($>0)||p.disposed||p.tooFar(A)||(p.bpm=Math.min(400,Math.max(20,$)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(A)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(k){var A=k&&typeof k=="object"?k:{at:k};if(!(p.disposed||p.tooFar(A.at))){var $=Ge(A.fadeMs,0);p.post({t:"clear",when:p.whenOf(A.at),fadeMs:$>0?Math.min(1e3,$):0})}},onChange:function(k){return p.listeners.push(k),function(){var A=p.listeners.indexOf(k);A>=0&&p.listeners.splice(A,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,g,w,f,y].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},p}function Sr(t,e){var n=e||{};if(n.slots)return Ar(t,n);var a=En(n.state),o=Array.from(fn(a)),r=pi(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(fn(a)),when:0}]}),s=r.core;function l(c){return a.chain[Jt.indexOf(c)]}return s.setParam=function(c,u,d,h){var f=Ht(c);if(!(!f||r.disposed||r.tooFar(h))){var g=l(f),w;if(u==="bypass")w=!!d;else{var y=ui(f,u);if(!y)return;w=Me(y,d,et(y,g.dials))}return u==="bypass"?g.bypass=w:g.dials[u]=w,r.post({t:"p",i:Mn[f][u],v:Ln(f,u,w),when:r.whenOf(h)}),r.emit({effect:f,key:u,value:w}),Qt(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===u}))){var m=g.dials[p.key],b=Me(p,m,et(p,g.dials));b!==m&&(g.dials[p.key]=b,r.post({t:"p",i:Mn[f][p.key],v:Ln(f,p.key,b),when:r.whenOf(h)}),r.emit({effect:f,key:p.key,value:b}))}}),w}},s.getParam=function(c,u){var d=Ht(c);if(d){var h=l(d);return u==="bypass"?h.bypass:h.dials[u]}},s.getState=function(){return or(a)},s.setState=function(c,u){r.disposed||r.tooFar(u&&u.at)||(a=En(c),r.post({t:"load",program:Array.from(fn(a)),when:r.whenOf(u&&u.at)}),r.emit({effect:null,key:null,value:null}))},s}function Ar(t,e){var n=e.slots===!0?Gt:Math.max(1,Math.min(xr,Math.floor(+e.slots)||Gt)),a=bt(e.state,n),o=1,r={};function s(p){return r[p.id]||(r[p.id]=o++),r[p.id]}function l(p){return p.map(function(m){return{uid:s(m),type:m.type,program:He(m)}})}var c=l(a.chain),u=a.chain.map(function(p){return r[p.id]}),d=pi(t,e,function(){return{slots:n,chain:c,order:u}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return r[p.id]}),when:0}]}),h=d.core;function f(p){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===p)return a.chain[m];var b=On(p);if(b){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===b)return a.chain[m]}return null}function g(p,m){var b=s(p);d.post({t:"add",uid:b,type:p.type,when:m}),He(p).forEach(function(v){d.post({t:"ps",uid:b,k:v[0],v:v[1],when:m,snap:!0})})}function w(p){d.post({t:"order",uids:a.chain.map(function(m){return r[m.id]}),when:p})}function y(p,m){var b={};a.chain.forEach(function(k){b[k.id]=k});var v=a.chain.map(function(k){return r[k.id]}).join();p.chain.forEach(function(k){var A=b[k.id];if(!A||A.type!==k.type){delete r[k.id],g(k,m);return}var $={};He(A).forEach(function(E){$[E[0]]=E[1]}),He(k).forEach(function(E){$[E[0]]!==E[1]&&d.post({t:"ps",uid:r[k.id],k:E[0],v:E[1],when:m})})});var S={};p.chain.forEach(function(k){S[k.id]=!0}),Object.keys(r).forEach(function(k){S[k]||delete r[k]}),a=p,a.chain.map(function(k){return r[k.id]}).join()!==v&&w(m)}return h.slots=n,h.setParam=function(p,m,b,v){var S=f(p);if(!(!S||d.disposed||d.tooFar(v))){var k=ke(S.type),A,$=null;if(m==="bypass")A=!!b;else{for(var E=0;E<k.dials.length;E++)k.dials[E].key===m&&($=k.dials[E]);if(!$)return;A=Me($,b,et($,S.dials))}var z={},Z={};He(S).forEach(function(F){z[F[0]]=F[1]}),k.dials.forEach(function(F){F.stepWhen&&(Z[F.key]=S.dials[F.key])}),m==="bypass"?S.bypass=A:S.dials[m]=A,k.dials.forEach(function(F){F.stepWhen&&(S.dials[F.key]=Me(F,S.dials[F.key],et(F,S.dials)))});var ee=d.whenOf(v),se=r[S.id];return He(S).forEach(function(F){(z[F[0]]!==F[1]||$&&F[0]===$.k)&&d.post({t:"ps",uid:se,k:F[0],v:F[1],when:ee})}),d.emit({effect:S.id,key:m,value:A}),Object.keys(Z).forEach(function(F){F!==m&&S.dials[F]!==Z[F]&&d.emit({effect:S.id,key:F,value:S.dials[F]})}),A}},h.getParam=function(p,m){var b=f(p);if(b)return m==="bypass"?b.bypass:b.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,m){d.disposed||d.tooFar(m&&m.at)||(y(bt(p,n),d.whenOf(m&&m.at)),d.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var b=m||{},v=Pn(p,a.chain);if(!(!v||a.chain.length>=n||d.disposed||d.tooFar(b.at))){if(b.dials){var S=bt({v:2,chain:[{id:v.id,type:v.type,dials:b.dials}]},1).chain[0];v.dials=S.dials}b.bypass===!0&&(v.bypass=!0);var k=a.chain.slice(),A=typeof b.index=="number"?Math.max(0,Math.min(k.length,b.index)):k.length;return k.splice(A,0,v),y({v:2,chain:k},d.whenOf(b.at)),d.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,m){var b=f(p),v=m&&m.at;return!b||d.disposed||d.tooFar(v)?!1:(y({v:2,chain:a.chain.filter(function(S){return S!==b})},d.whenOf(v)),d.emit({effect:b.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,b){var v=f(p),S=b&&b.at;if(!v||d.disposed||d.tooFar(S))return!1;var k=pr(a.chain,a.chain.indexOf(v),m);return k===a.chain?!1:(y({v:2,chain:k},d.whenOf(S)),d.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:ur(p),bypass:p.bypass}})},h.toAstrid=function(){return yr(a)},h}function fa(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Er(t,e,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(f){return o.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,c=l&&l.tempo?l.tempo:l,u=!1;function d(f){if(!r){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var g=r(l.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function h(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var g=l&&typeof l.bpm=="number"?l.bpm:fa(c,0);g>0&&t.setTempo(g);return}var w=fa(c,f);w>0&&t.setTempo(w);for(var y=c&&(c.points||c.tempoPoints)||[],p=0;p<y.length;p++){var m=y[p];if(m.beat>f&&m.bpm>0){var b=d(m.beat);b!==void 0&&t.setTempo(m.bpm,b)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,d(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&h())})}const Mr="/lucy/assets/worklet-CnpUVY5i.js";var Lr="nc-ui",Cr={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Hn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Yt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Tr={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ee={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Fr={light:{color:Cr.color,semantic:Hn,component:Yt,runtime:Tr},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#2C2B2A",accent:"#69A7D3","accent-wash":"rgba(105,167,211,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#201F1E","shade-2":"#252423","shade-3":"#2A2928","shade-4":"#2F2E2D","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#9F9E9D","sub-1":"#8D8C8B","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#353433","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#5A8BAE","filter-red":"#DC746A","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#9F9E9D",divider:"#353433","surface-raised":"#2C2B2A",accent:"#69A7D3","accent-tint":"#272E32","accent-soft":"rgba(105,167,211,0.1)","accent-faint":"rgba(105,167,211,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#201F1E","module-bg-adjacent-2":"#252423","module-bg-adjacent-3":"#2A2928","module-bg-adjacent-4":"#2F2E2D","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#8D8C8B","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#353433","slider-progress":"#69A7D3","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#69A7D3",playhead:"#69A7D3","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#2C2B2A","slot-active-bg":"#69A7D3","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#4B91C3","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#69A7D3","meter-clip":"#DD7D6E","meter-track":"#353433","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#69A7D3","strip-bg":"#201F1E","strip-alt-bg":"#252423","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#5A8BAE","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#69A7D3",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(105,167,211,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#69A7D3","track-mute":"#9F9E9D","track-solo":"#69A7D3","velocity-bar":"#69A7D3","velocity-min":"#5A8FB5","velocity-max":"#69A7D3","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#69A7D3","lane-3":"#CC985C","lane-4":"#9F9E9D","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#2C2B2A","surprise-ink":"#E8E7E6","surprise-on":"#69A7D3","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},ut=t=>`--${Lr}-${t}`,Cn=Hn["label-on-fill-dark"],ga=Hn["label-on-fill-light"],Nr=Ee["label-min-contrast"],Ir=/^#[0-9a-f]{6}$/i,zr=t=>typeof t=="string"&&Ir.test(t),jt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function ba(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${jt(o(0)*255)}${jt(o(8)*255)}${jt(o(4)*255)}`}function hi(t){let[e,n,a]=[1,3,5].map(u=>parseInt(t.slice(u,u+2),16)/255),o=Math.max(e,n,a),r=Math.min(e,n,a),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-a)/l%6):o===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:c,l:s}}function ya(t){let[e,n,a]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Tn(t,e){let[n,a]=[ya(t),ya(e)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var Zt=t=>Tn(t,Cn)>=Tn(t,ga)?Cn:ga;function mi(t,e,n,a=Nr){let o=ba(t,e,n),r=Zt(o)===Cn?1:-1;for(let s=0;s<40&&Tn(o,Zt(o))<a;s++)n+=r*.01,o=ba(t,e,n);return o}function Rr(t){let{h:e,s:n}=hi(t),a=mi(e,Math.min(n,Ee["surprise-on-max-saturation"]),Ee["surprise-on-lightness"]);return{fill:t,ink:Zt(t),on:a,onInk:Zt(a)}}var Br=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Dr(t,e=Math.random){let[n,a]=Ee["surprise-saturation"],[o,r]=Ee["surprise-lightness"],s=Ee["surprise-min-hue-gap"],l=zr(t)?hi(t).h:null,c=e()*360;return l!==null&&Br(c,l)<s&&(c=(l+s+e()*(360-2*s))%360),mi(c,n+e()*(a-n),o+e()*(r-o))}function jr(t){if(!t)return null;let e=Rr(t);return{[ut("surprise-fill")]:e.fill,[ut("surprise-ink")]:e.ink,[ut("surprise-on")]:e.on,[ut("surprise-on-ink")]:e.onInk}}var Wr=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Or=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function wa(t){let[e,n,a]=[1,3,5].map(l=>Wr(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function Pr([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(s=>jt(Or(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Hr=Ee["velocity-range"],fi={min:Yt.rhythm["velocity-min"],max:Yt.rhythm["velocity-max"]},va=Object.fromEntries(Object.entries(Fr).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function Gr(t,e=fi){let[n,a]=Hr,o=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(o-n)/(a-n),s=e.ink??Yt.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=wa(e.min),c=wa(e.max);return{velocity:o,t:r,fill:Pr(l.map((u,d)=>u+(c[d]-u)*r)),ink:s}}function ka(t,e=fi){return{[ut("velocity-fill")]:Gr(t,e).fill}}var gi="data-nc-theme",xa="nc-ui-theme-change",Yr="(prefers-color-scheme: dark)",bi=t=>t?.documentElement??null,yi=t=>t?.defaultView?.matchMedia?.(Yr)??null,Zr=t=>t==="light"||t==="dark"?t:"system";function qr(t=globalThis.document){return Zr(bi(t)?.getAttribute(gi))}function Fn(t=globalThis.document){let e=qr(t);return e!=="system"?e:yi(t)?.matches?"dark":"light"}function wi(t,e=globalThis.document){let n=bi(e);if(!n)return()=>{};let a=Fn(e),o=()=>{let c=Fn(e);c!==a&&(a=c,t(c))},r=e.defaultView?.MutationObserver,s=r?new r(o):null;s?.observe(n,{attributes:!0,attributeFilter:[gi]});let l=yi(e);return l?.addEventListener?.("change",o),e.addEventListener(xa,o),()=>{s?.disconnect(),l?.removeEventListener?.("change",o),e.removeEventListener(xa,o)}}var Xr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},_r={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Ur={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Vr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},en={};for(let[t,e]of Object.entries(_r))en[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Vr))en[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Ur))en[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Xr.renames.map(t=>[t.old,t.new]));function vi(t){let e=en[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function H(t){return vi(t).prop}function i(t){return`var(${H(t)})`}function Kr(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(H(e)));return Number.isFinite(n)?n:0}function K(t,e){let n=vi(e),a=t.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function Jr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Qr(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var es="[data-modulated], [data-modulated] *";function ts(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${H("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${H("divider")}: ${i(`module-div-stack-${a}`)};
      ${H("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${H("text-sub")}: ${i("module-sub-stack-1")};
      ${H("divider")}: ${i("module-div-stack-1")};
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
${[1,2,3,4].map(e).join(`
`)}
${[1,2,3,4].map(t).join(`
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
${es} { transition: none; }
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
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
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
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${H("text-sub")}: inherit;
  ${H("divider")}: inherit;
  ${H("slider-track")}: inherit;
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
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}var gn=null,ns="nc-ui-fallback";function ki(t=globalThis.document){if(!t?.documentElement||(t.documentElement,gn&&gn.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${ns} {
${ts()}
}
`,t.head.append(e),gn=e}var as=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,is=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=as,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&is(document);function xi(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(o,r),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let c=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var $i=new WeakMap,$a=.25;function os(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,s=t.step??.005,l=t.onChange,c=t.onReset,u=p=>Math.min(1,Math.max(0,p)),d=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{let m=u(p);m!==r&&(r=m,d(),l?.(m))},f=0,g=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();p.target!==o&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!g)return;let m=n.getBoundingClientRect().height||1,b=(f-p.clientY)/m*(p.shiftKey?$a:1);f=p.clientY,h(r+b)});let w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",p=>{p.preventDefault(),c?.()}),n.addEventListener("keydown",p=>{let m=p.shiftKey?s*$a:s,b={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in b&&(p.preventDefault(),h(b[p.key]))});let y={el:n,get value(){return r},get dragging(){return g},set(p){g||(r=u(Number(p)||0),d())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(c=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),$i.set(n,y),y}function rs(t){return $i.get(t)}var Si=new WeakMap,ss=.2,ls=1.5,cs=.5;function ds(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function Sa(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:ds(a.getComputedStyle(t).getPropertyValue(H(e)),n)}function us(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let m=e.createElement("span");m.className="nc-meter-peak";let b=e.createElement("span");b.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",p.append(m,b,v),r.append(p),s.push({peak:m,rms:b,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=t.label,c=t.onClear,u=!1,d=-1,h=-1,f=()=>{o.dataset.lit=u?"true":"false",o.setAttribute("aria-pressed",u?"true":"false"),o.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),o.title=u?"Clipped. Click to clear":"Clip light"},g=(y,p,m,b)=>{let v=Math.round(b*1e3)/1e3;m[p]!==v&&(m[p]=v,y.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{w.clear(),c?.()});let w={el:a,get clipped(){return u},update(y,p){d<0&&(d=Sa(a,"motion-meter-fall",ss)),h<0&&(h=Sa(a,"motion-meter-hold",ls));let m=Math.max(0,Math.min(.25,Number(p)||0)),b=d>0?Math.exp(-m/d):0;s.forEach((v,S)=>{let k=y[S]??y[0]??{peak:0,rms:0},A=Math.min(1,Math.max(0,Number(k.peak)||0)),$=Math.min(A,Math.max(0,Number(k.rms)||0));k.over&&w.clip(),v.level.peak=A>=v.level.peak?A:A+(v.level.peak-A)*b,v.level.rms=$>=v.level.rms?$:$+(v.level.rms-$)*b,v.holdAge+=m,A>=v.holdAt?(v.holdAt=A,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(A,v.holdAt-cs*m)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(c=y.onClear)}};return f(),w.reset(),Si.set(a,w),w}function ps(t){return t?Si.get(t):void 0}function hs(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function $e(t){return Math.max(0,Math.min(1,t))}function Ai(t,e){let{ctx:n,w:a,h:o}=hs(t);if(!n)return;n.clearRect(0,0,a,o);let r=Qr(t);if(e.paint==="swatch"){let c=K(t,"accent"),u=K(t,"rhythm.step-cell-on");t.dataset.ncAccent=c,t.dataset.ncStep=u,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=u,n.fillRect(a/2,0,a/2,o);return}if(e.paint==="filter"){let c=e.mode??"lp",u=K(t,Jr(c)),d=K(t,"divider"),h=$e(e.cutoff??.5),f=.08+(1-$e(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let w=g/Math.max(1,a),y=0;c==="lp"?y=w<h?1:Math.max(0,1-(w-h)/f):c==="hp"?y=w>h?1:Math.max(0,1-(h-w)/f):y=Math.max(0,1-Math.abs(w-h)/f);let p=o*.78-y*o*.62;g===0?n.moveTo(g,p):n.lineTo(g,p)}n.strokeStyle=u,n.stroke(),n.fillStyle=K(t,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,o),t.dataset.ncAccent=u;return}if(e.paint==="envelope"){n.strokeStyle=K(t,"accent"),n.beginPath();let c=Math.max(.05,e.decay??.4);for(let u=0;u<=a;u++){let d=u/Math.max(1,a),h=(o-4)*(1-Math.exp(-d*4/c));n.lineTo(u,o-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let c=Array.isArray(e.peaks)?e.peaks:[],[u,d]=Array.isArray(e.region)?e.region:[0,1],h=K(t,"accent"),f=K(t,"text-sub"),g=o/2;n.fillStyle=K(t,"accent-soft"),n.fillRect($e(u)*a,0,($e(d)-$e(u))*a,o),n.strokeStyle=K(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let w=Math.floor(c.length/2);for(let y=0;y<w;y++){let p=(y+.5)/w*a,m=Math.max(-1,Math.min(1,c[y*2]??0)),b=Math.max(-1,Math.min(1,c[y*2+1]??0)),v=(y+.5)/w;n.strokeStyle=v>=u&&v<=d?h:f,n.beginPath(),n.moveTo(p,g-b*(g-1)),n.lineTo(p,g-m*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[u,d,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round($e(y)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=K(t,"text"),n.fillRect(Math.round($e(e.position)*(a-1)),0,1,o)),w||(n.fillStyle=f,n.font=r,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let c=$e(e.level??0);n.fillStyle=K(t,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=K(t,"accent"),n.fillRect(0,o*.4,a*c,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=K(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=K(t,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),t.dataset.ncAccent=K(t,"accent")}var Ei={slop:8,longPressMs:500,pitchPx:16},ms=class{constructor(t,e,n=Ei){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function fs(t,e,n,a=Ei){let o=!1,r=0,s=(u,d)=>{let h=t.ownerDocument.elementFromPoint?.(u,d),f=[...t.querySelectorAll(e)],g=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(g>=0)return g;let w=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,m)=>{if(p.hidden)return;let b=p.getBoundingClientRect();if(d<b.top||d>b.bottom)return;let v=Math.abs(u-(b.left+b.width/2));v<y&&v<=b.width&&(w=m,y=v)}),w},l=new ms(s,u=>{(u.kind==="paint"||u.kind==="long")&&(o=!0),n(u)},a),c=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",u=>{u.button>0||(o=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&c())}),t.addEventListener("pointerup",u=>{c(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),t.addEventListener("pointercancel",u=>{c(),l.cancel(u.pointerId)}),t.addEventListener("click",u=>{o&&(o=!1,u.stopPropagation(),u.preventDefault())},!0),t.addEventListener("contextmenu",u=>u.preventDefault()),l}var Mi="netcomposer.groups.v1";function Gn(){try{return globalThis.localStorage??null}catch{return null}}function Li(t=Gn(),e=Mi){try{let n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function gs(t,e,n,a=Mi){let o=Li(t,a);o.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function bs(t,e=Gn()){return Li(e).get(t.id)??t.open===!0}function ys(t,e,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${t.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${t.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let u of t.controls)c.append(n(u,e));return o.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";gs(Gn(),t.id,u),Aa(a,u);let d=e(a);d?.type==="group"&&d.onToggle?.(u)}),a.append(o,c),Aa(a,bs(t)),Ci(a,t),a}function Aa(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function Ci(t,e){let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=e.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var Rt="application/x-nc-pad",Ea="http://www.w3.org/2000/svg";function ws(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*e/n),l=Math.max(s+1,Math.floor((r+1)*e/n)),c=0,u=0;for(let h=s;h<l;h++)c=Math.min(c,t[2*h]??0),u=Math.max(u,t[2*h+1]??0);let d=n===1?50:r/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),o.push(`${d.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function vs(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,r)=>a.append(ks(n,r,e))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Wt(n)}),Fi(n,t),n}function ks(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ea,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let u=document.createElementNS(Ea,"path");return c.append(u),a.append(o,r,s,l,c),$s(t,a,e,n),r.addEventListener("dblclick",()=>{let d=n(t);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Ti(t,a,e,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(Rt,String(e)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let h=d.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(Rt)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=h.includes(Rt)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let f=d.dataTransfer?.getData(Rt);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();let w=Number(f);w!==e&&h.onMove?.(w,e,d.altKey);return}let g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),h.onFile?.(e,g))}),a}function xs(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function $s(t,e,n,a){let o=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",u=>{if(u.button!==0)return;r=!1,s=u.clientX,l=u.clientY,c();let d=a(t);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&u.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=Ma(t,e,n,a)},450)))}),e.addEventListener("pointermove",u=>{o&&Math.hypot(u.clientX-s,u.clientY-l)>8&&c()});for(let u of["pointerup","pointercancel","pointerleave"])e.addEventListener(u,c);e.addEventListener("contextmenu",u=>{u.preventDefault(),c(),r=Ma(t,e,n,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}xs(t,n,a)})}function Ma(t,e,n,a){let o=a(t);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;Wt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Wt(t)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let d of r){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=d.id,h.textContent=d.label,h.addEventListener("click",()=>{Wt(t);let f=a(t);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?Ti(t,e,n,a):f.onMenu?.(n,d.id))}),l.append(h)}t.append(s,l);let c=t.getBoundingClientRect(),u=e.getBoundingClientRect();return l.style.left=`${u.left-c.left}px`,l.style.top=`${u.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Ti(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(t);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,u=d=>{if(c)return;c=!0;let h=r.value.trim();r.remove(),e.focus();let f=a(t);d&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};r.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?u(!0):d.key==="Escape"&&u(!1)}),r.addEventListener("blur",()=>u(!0));for(let d of["pointerdown","click","dblclick"])r.addEventListener(d,h=>h.stopPropagation());t.append(r),r.focus(),r.select()}function Wt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Fi(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),u=r.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),c?.setAttribute("d",ws(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let d=e.selected===o;d?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",d?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function te(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function tn(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function La(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function St(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Ss=450,Ca=8;function be(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function As(t){let e=Kr(t,"target-min");return e>0?e:44}function Es(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=As(t),a=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,u=l.top+l.height/2,d=c-a,h=c+a,f=u-a,g=u+a;for(let w=0;w<e.length;w++){if(r===w)continue;let y=o[w];if(!y||y.width===0)continue;let p=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-u)<a*2&&(p>c?h=Math.min(h,(c+p)/2):p<c&&(d=Math.max(d,(c+p)/2))),Math.abs(p-c)<a*2&&(m>u?g=Math.min(g,(u+m)/2):m<u&&(f=Math.max(f,(u+m)/2)))}d=Math.min(d,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,h-d)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function Ni(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Ta(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function tt(t,e){switch(t.type){case"slider":return Ms(t,e);case"select":return Cs(t,e);case"toggle":return Ts(t,e);case"button":return Fs(t,e);case"readout":return Ns(t);case"label":return Bs(t);case"note":return Fa(t);case"knob":return Ws(t,e);case"choice":return Os(t,e);case"slotRow":return Ps(t,e);case"stepGrid":return Zs(t,e);case"canvas":return Us(t);case"fx":return el(t,e);case"group":return ys(t,e,tt);case"strip":return Vs(t,e);case"stripAdd":return Qs(t,e);case"padGrid":return vs(t,e);case"moves":return zs(t,e);default:return Fa({id:"unknown",text:""})}}function ue(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,zi(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??St(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),La(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")La(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&At(t,e.help);let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Ds(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??St(e.value))}else if(e.type==="choice")Ri(t,e);else if(e.type==="slotRow")Di(t,e);else if(e.type==="stepGrid")In(t,e);else if(e.type==="padGrid")Fi(t,e);else if(e.type==="moves")Ii(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Ai(n,e)}else if(e.type==="strip"){Pi(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${yt(n.id)}"]`);a instanceof Element&&ue(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")Wi(t,e);else if(e.type==="group"){Ci(t,e);for(let n of e.controls){let a=t.querySelector(`[data-nc-id="${yt(n.id)}"]`);a instanceof Element&&ue(a,n)}}else if(e.type==="fx"){Zi(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${yt(n.id)}"]`);a instanceof Element&&ue(a,n)}}}}function Ms(t,e){let n=tn(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{let r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{let r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(a,o),t.onTap&&n.insertBefore(Ls(t,a,e),o),n.append(te()),ue(n,t),n}function Ls(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(be());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Cs(t,e){let n=tn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(let o of t.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,a.append(r)}return a.value=t.value,a.addEventListener("change",()=>{let o=e(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,te()),n}function Ts(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(te()),ue(n,t),n}function Fs(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(te()),ue(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=Ni(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&ji(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function Ns(t){let e=tn(t.id,t.label);return e.append(te()),ue(e,t),e}var Is=450;function zs(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Rs(l.icon)),c.addEventListener("click",()=>{let u=e(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(c)}o.append(r,s),n.append(o)}return Ii(n,t),n}function Ii(t,e){for(let n of e.groups)for(let a of n.moves){let o=t.querySelector(`[data-nc-move="${yt(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function Rs(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Bs(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(te()),e}function Fa(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(te()),e}function Na(t){if(typeof t.valueText=="string")return t.valueText;let e=St(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function zi(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Ds(t,e){let n=e.max-e.min||1,a=(e.value-e.min)/n;zi(t,e.modulated===!0);let o=Math.round(a*270);t.style.setProperty("--knob-turn",String(o)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(o,135))),t.style.setProperty("--knob-to",String(Math.max(o,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Na(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Na(e)}`}function js(t,e){let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function Ws(t,e){let n=tn(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,s=0;a.addEventListener("pointerdown",u=>{r=u.clientY;let d=e(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let d=e(a);if(d?.type!=="knob")return;let h=d.max-d.min||1,f=Math.min(d.max,Math.max(d.min,s-(u.clientY-r)*h/120));d.onChange(f)}),a.addEventListener("dblclick",()=>{let u=e(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let d=e(a);if(d?.type!=="knob")return;let h=js(d,u);h!==null&&(u.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(te()),ue(n,t),n}function Os(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let a of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let u=s[c];u instanceof HTMLButtonElement&&(r.preventDefault(),u.focus(),u.click())}),n.append(o)}return n.append(te()),Ri(n,t),n}function Ri(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Ps(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){let h=t.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,be()),Hs(f,g,n,d,e),a.append(f)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Ni(),o.append(be()),o.addEventListener("click",()=>{ji(n);let d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=e(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...o?[o]:[]),n.append(u,r,te()),Bi(n,e),Di(n,t),n}function Ia(t,e,n,a){let o=n(t);if(o?.type!=="slotRow")return;pt(t);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(e,r)}function Hs(t,e,n,a,o){let r=0,s=0,l=0,c=!1,u=!1,d=!1,h=!1,f=()=>{window.clearTimeout(r),r=0},g=m=>{let b=m.clientX-s,v=m.clientY-l;b*b+v*v>Ca*Ca&&(c=!0,f())},w=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=m=>{let b=r!==0&&!c&&!u;f(),w(),b&&(d=!0,Ia(n,a,o,m))},p=()=>{c=!0,f(),w()};t.addEventListener("pointerdown",m=>{m.button===0&&(w(),u=!1,c=!1,d=!1,s=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!c&&(u=!0,Gs(n,e,a,o))},Ss),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(d||u||c){d=!1,u=!1,c=!1;return}Ia(n,a,o,m)})}function Bi(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=za("Save","store"),o=za("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),pt(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=e(t);if(c?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(u,"store"),pt(t)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(u,"clear"),pt(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&pt(t)})}function za(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Gs(t,e,n,a){Bi(t,a);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function pt(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Di(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function ji(t){let e=t.dataset.ncLastFill||null,n=Dr(e);t.dataset.ncLastFill=n;let a=jr(n);if(a)for(let[o,r]of Object.entries(a))t.style.setProperty(o,r)}function Ys(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Zs(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=p=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,a.append(m),m},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let m of[r,s]){let b=m===p;m.setAttribute("aria-checked",b?"true":"false"),m.tabIndex=b?0:-1}};l(r);for(let p of[r,s])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let m=s.getAttribute("aria-checked")==="true"?r:s;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),t.onFill&&c.append(Ys(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(p)}n.append(c);for(let p of t.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=p.label,b.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(b.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,S=0;b.addEventListener("pointerdown",$=>{v=!1,!($.pointerType==="mouse"||$.button!==0)&&(S=window.setTimeout(()=>{let E=e(n);E?.type!=="stepGrid"||!E.selectedRows||(v=!0,E.onSelectRow?.(E.rows.findIndex(z=>z.id===p.id),!0))},Is))});for(let $ of["pointerup","pointercancel","pointerleave"])b.addEventListener($,()=>window.clearTimeout(S));b.addEventListener("contextmenu",$=>{v&&$.preventDefault()}),b.addEventListener("click",$=>{let E=e(n);if(E?.type!=="stepGrid")return;if(v){v=!1;return}let z=E.rows.findIndex(ee=>ee.id===p.id),Z=!!E.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);E.onSelectRow?.(z,Z)}),b.addEventListener("keydown",$=>qs(n,b,$));let k=[];for(let $ of["mute","solo"]){if(!($==="mute"?t.onMute:t.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let z=document.createElement("button");z.type="button",z.className="nc-ms",z.dataset.ncMs=$,z.textContent=$==="mute"?"M":"S",z.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${p.label}`),E.append(z,be()),E.addEventListener("click",()=>{let Z=e(n);if(Z?.type!=="stepGrid")return;let ee=Z.rows.findIndex(se=>se.id===p.id);($==="mute"?Z.onMute:Z.onSolo)?.(ee)}),k.push(E)}let A=document.createElement("div");A.className="nc-steps";for(let $=0;$<p.steps.length;$++){let E=document.createElement("span");E.className="nc-step-wrap";let z=document.createElement("button");z.type="button",z.className="nc-step",z.dataset.ncStep=`${p.id}:${$}`,z.setAttribute("aria-label",`${p.label} step ${$+1}`),E.append(z,be()),E.addEventListener("click",Z=>{let ee=e(n);if(ee?.type!=="stepGrid")return;let se=ee.rows.findIndex(Fe=>Fe.id===p.id),F=s.getAttribute("aria-checked")==="true";ee.onToggle(se,$,Z.shiftKey||F)}),A.append(E)}if(t.onLength&&A.append(Xs(n,A,p,e)),m.append(...k,b,A),t.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=p.id,$.setAttribute("aria-label",`Re-roll ${p.label}`),$.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Ta(),$.append(be()),$.addEventListener("click",()=>{let E=e(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(z=>z.id===p.id))}),m.append($)}m.addEventListener("click",$=>{if($.target!==m)return;let E=e(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(z=>z.id===p.id))}),Ra(n,A,".nc-step-wrap",e,s,()=>p.id),n.append(m)}let u=document.createElement("div");u.className="nc-pads-head";let d=(p,m,b)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=m,b&&v.setAttribute("aria-label",b),v},h=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",In(n,p))}));for(let[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let b=e(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;let v=b.rows.length;b.onSelectRow?.(((Bt(b)+m)%v+v)%v)});if(u.append(h,g,f),t.onDice){let p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Ta(),p.addEventListener("click",()=>{let m=e(n);if(m?.type!=="stepGrid")return;let b=Bt(m);b>=0&&m.onDice?.(b)}),u.append(p)}if(t.transport){let p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),u.append(p)}n.append(u);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",b=>{let v=e(n);if(v?.type!=="stepGrid")return;let S=Bt(v);if(S<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(S,p+1);return}let k=s.getAttribute("aria-checked")==="true";v.onToggle(S,p,b.shiftKey||k)}),w.append(m)}return Ra(n,w,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[Bt(p)]?.id:void 0}),n.append(w),n.append(te()),In(n,t),n}function Bt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Ra(t,e,n,a,o,r){let s="on",l=!0,c=-1,u=(d,h)=>{let f=d.rows[c]?.steps[h];!f||h>=d.rows[c].length||(d.onSet?d.onSet(c,h,s,l):!!f[s]!==l&&d.onToggle(c,h,s==="accent"))};fs(e,n,d=>{let h=a(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;let f=h.rows.findIndex(g=>g.id===r());f>=0&&h.rows[f].length!==d.pad+1&&h.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let f=r();c=h.rows.findIndex(w=>w.id===f);let g=h.rows[c]?.steps[d.pad];if(!g)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}u(h,d.pad)}else if(d.kind==="long"){let f=r(),g=h.rows.findIndex(y=>y.id===f),w=e.querySelectorAll(n)[d.pad];g>=0&&w instanceof HTMLElement&&h.onLongPress?.(g,d.pad,w)}}})}function qs(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],o=a.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Xs(t,e,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(be());let r=u=>{let d=a(t);if(d?.type!=="stepGrid")return;let h=d.rows.findIndex(w=>w.id===n.id),f=d.rows[h];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,u));g!==f.length&&d.onLength?.(h,g)},s=u=>{let d=[...e.querySelectorAll(".nc-step")],h=1;return d.forEach((f,g)=>{let w=f.getBoundingClientRect();w.width>0&&u>=w.left+w.width/2&&(h=g+1)}),h},l=u=>r(s(u.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",u=>{let d=a(t);if(d?.type!=="stepGrid")return;let h=d.rows.find(g=>g.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};u.key in f&&(u.preventDefault(),r(f[u.key]))}),o}var bn=new WeakMap,Dt=new WeakMap;function _s(t){return t?(Dt.has(t)||(Dt.set(t,Fn(t)),wi(e=>{Dt.set(t,e);for(let n of t.querySelectorAll("[data-nc-velocity]"))Nn(n,Number(n.getAttribute("data-nc-velocity")))},t)),Dt.get(t)):"light"}function Nn(t,e){let n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:_s(t.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(bn.has(t)&&bn.get(t)===o)){if(bn.set(t,o),n===null){for(let r of Object.keys(ka(1)))t.style.removeProperty(r);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(ka(n,va[a]??va.light)))t.style.setProperty(r,s)}}function In(t,e){let n=e.rows.some(d=>d.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),r=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let d=!!e.transport?.playing,h=e.transport?.label??(d?"Stop":"Play");u.textContent!==h&&(u.textContent=h),u.setAttribute("aria-pressed",d?"true":"false");let f=e.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let d=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let f=Number(h.getAttribute("data-nc-pad")),g=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!g||!l&&f>=r.length,l&&f>=r.length?h.dataset.out="true":delete h.dataset.out,l&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,Nn(h,g?.velocity),e.playhead>=0&&f===d?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let d of e.rows){for(let g=0;g<d.steps.length;g++){let w=d.steps[g],y=t.querySelector(`[data-nc-step="${d.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===d.id?p.dataset.selected="true":delete p.dataset.selected;let v=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);v?p.dataset.picked="true":delete p.dataset.picked;let S=p.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",e.selectedRow===d.id||v?"true":"false"),S.textContent!==d.label&&(S.textContent=d.label,S.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?p.dataset.silent="true":delete p.dataset.silent;for(let k of p.querySelectorAll("[data-nc-ms]")){let A=k.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;k.setAttribute("aria-pressed",A?"true":"false")}}y.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?y.dataset.accent="true":delete y.dataset.accent,w.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof w.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Nn(y,w.velocity);let m=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;g===m?y.dataset.playhead="true":delete y.dataset.playhead;let b=!!e.onLength&&e.selectedRow===d.id;y.hidden=g>=d.length&&!b,g>=d.length&&b?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${d.id}"]`),f=t.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&f&&f.nextElementSibling!==h){let g=document.activeElement===h;f.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(d.length)),h.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),h.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function Us(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,te()),e}function Vs(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let r=!t.master&&typeof t.onFold=="function",s=null;if(r&&(n.dataset.ncFoldable="",s=Gi(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let m=e(n);m?.type==="strip"&&(m.onFold?.(m.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(o),t.onRemove){let m=document.createElement("button");m.type="button",m.className="nc-strip-remove",m.dataset.ncStripRemove="",m.textContent="×",m.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(m)}),a.append(m)}let l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){let m=document.createElement("span");m.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",m.append(b,be()),m.addEventListener("click",()=>{let v=e(n);v?.type==="strip"&&v.onHacks?.()}),l.append(m)}let c=document.createElement("div");c.className="nc-strip-ms";for(let m of["mute","solo"]){if(!(m==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=m,v.textContent=m==="mute"?"M":"S",b.append(v,be()),b.addEventListener("click",()=>{let S=e(n);S?.type==="strip"&&(m==="mute"?S.onMute:S.onSolo)?.()}),c.append(b)}let u=document.createElement("div");u.className="nc-strip-sends";for(let m of t.sends??[])u.append(tt({...m,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-pan",t.pan&&d.append(tt(Yn(t),e));let h=document.createElement("div");h.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let m of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(m.value)),b.textContent=m.label,f.append(b)}let g=os({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:m=>{let b=e(n);b?.type==="strip"&&b.onChange(m)},onReset:()=>{let m=e(n);m?.type==="strip"&&Da(m)}}),w=us({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let m=e(n);m?.type==="strip"&&m.onClipClear?.()}});if(h.append(f,g.el,w.el),r){let m=document.createElement("button");m.type="button",m.className="nc-ui-fx-fold nc-strip-fold",m.dataset.ncStripFold="",m.setAttribute("aria-expanded","false");let b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!t.pan,m.append(b,S,v),m.addEventListener("click",()=>{let k=e(n);if(k?.type!=="strip")return;k.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),h.prepend(m)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let p=0;return y.addEventListener("click",m=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(p),m.detail===0?Ba(n,y,e):m.detail===1&&(p=window.setTimeout(()=>Ba(n,y,e),Js)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(p);let m=e(n);m?.type==="strip"&&Da(m)}),s&&n.append(s),n.append(a,l,c,u,d,h,y,te()),Pi(n,t),n}function Yn(t){let e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??Ks(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function Ks(t){let e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}var Js=250;function Ba(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??St(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=o.value;if(o.remove(),e.hidden=!1,l){let u=n(t);u?.type==="strip"&&u.onTypeIn?.(c)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function Qs(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),c=s.value;Oi(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,te()),Wi(n,t),n}function Wi(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Oi(a))}function Oi(t){let e=t.options[0];e&&(e.selected=!0)}function Da(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Pi(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let o=t.querySelector(".nc-fader"),r=o?rs(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),ps(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let h=e.valueText??St(e.value);s.textContent!==h&&(s.textContent=h),s.setAttribute("aria-label",`${e.label} level ${h}`);let f=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${f}`:f}for(let h of t.querySelectorAll("[data-nc-ms]")){let f=h.getAttribute("data-nc-ms"),g=f==="mute"?e.mute===!0:e.solo===!0;h.setAttribute("aria-pressed",g?"true":"false"),h.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let h=e.hacksLabel??"Hacks";l.textContent!==h&&(l.textContent=h),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${h}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));let h=t.querySelector(`.nc-strip-pan [data-nc-id="${yt(e.pan.id)}"]`);h&&ue(h,Yn(e))}let c=!e.master&&typeof e.onFold=="function"&&e.folded===!0;c?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let u=t.querySelector("[data-nc-strip-hide]");u instanceof HTMLElement&&(Yi(u,c,e.label),At(u,e.foldHelp));let d=t.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!c,d.setAttribute("aria-label",`Expand ${e.label}`);let h=d.querySelector("[data-nc-strip-fold-name]");h&&h.textContent!==e.label&&(h.textContent=e.label),At(d,e.foldedHelp??e.foldHelp)}}function el(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;let o=typeof t.onFold=="function";if(t.on===void 0&&!o)n.append(a);else{let r=document.createElement("div");if(r.className="nc-ui-fx-hd",r.append(a),t.on!==void 0){let s=xi({checked:t.on,labelledBy:a.id,onChange:l=>{let c=e(s.el);c?.type==="fx"&&c.onToggle?.(l)}});s.el.dataset.ncFxSwitch="",r.append(s.el)}o&&r.append(nl(n,e)),n.append(r)}o&&n.prepend(al(n,e));for(let r of t.controls)n.append(tt(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let s=document.createElement("summary");s.textContent=t.moreLabel??"More",r.append(s);for(let l of t.more)r.append(tt(l,e));n.append(r)}return n.append(te()),Zi(n,t),n}var tl=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Hi(t){let e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),a=t.dataset.ncFolded==="true"&&e&&tl(e)?e:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function nl(t,e){let n=Gi();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Hi(t))}),n}function Gi(){let t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";let e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Yi(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function al(t,e){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,o),n.addEventListener("click",()=>{let s=e(n);s?.type==="fx"&&(s.onFold?.(!1),Hi(t))}),n}function Zi(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;let o=typeof e.onFold=="function"&&e.folded===!0;o?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let r=t.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Yi(r,o,e.title),At(r,e.foldHelp));let s=t.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=e.on===void 0?"":e.on?"On":"Off";s.hidden=!o,s.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=e.on===!0?"true":"false";let c=s.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=l,c.hidden=l==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=e.title),At(s,e.foldHelp)}}function At(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function yt(t){return t.replace(/["\\]/g,"\\$&")}function il(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&Ai(n,a)}Es(t)}var ol=Ee["toast-duration"];function rl({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function sl(t,e,n,a){let o=l=>({top:l,bottom:l+n}),r=l=>t.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=o(e-a-n);return r(s)?r(o(a))?"bottom":"top":"bottom"}function ll(t,e,n,a,o,r){let s=t.bottom+o,l=Math.max(r,Math.min(t.left,a-r-n.width));for(let c=!0,u=0;c&&u<8;u++){c=!1;for(let d of e)d&&d.bottom>s&&d.top<s+n.height&&d.right>l&&d.left<l+n.width&&(s=d.bottom+o,c=!0)}return{top:s,left:l}}var ja="data-nc-ui-toast-live";function cl(t,e){let n=e.querySelector(`[${ja}]`);return n||(n=t.createElement("div"),n.setAttribute(ja,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function dl({message:t,actionLabel:e,onAction:n,duration:a=ol,onClose:o,avoid:r=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let u=c.defaultView??globalThis,d=c.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=t,d.appendChild(h);let f=null;e&&(f=c.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,d.appendChild(f)),l.appendChild(d);let g="open",w=O=>O&&typeof O.getBoundingClientRect=="function"?O.getBoundingClientRect():null,y=w(d),p=y?.height||44,m=u.getComputedStyle?.(d),b=Number.parseFloat(m?.getPropertyValue(H("toast-offset")))||16,v=Number.parseFloat(m?.getPropertyValue(H("toast-anchor-gap")))||8,S=w(s),k=u.innerHeight??0,A=r.map(w).filter(Boolean),$=S&&S.bottom>0&&S.top<k?ll(S,A,{width:y?.width||0,height:p},u.innerWidth??0,v,b):null;$&&$.top+p<=k?(d.setAttribute("data-placement","anchor"),d.style.top=`${$.top+(u.scrollY??0)}px`,d.style.left=`${$.left+(u.scrollX??0)}px`):d.setAttribute("data-placement",sl(A,k,p,b));let E=u.requestAnimationFrame?.bind(u)??(O=>setTimeout(O,16));E(()=>E(()=>{g==="open"&&d.setAttribute("data-state","open")})),cl(c,l).textContent=rl({message:t,actionLabel:e});let z,Z,ee=new Promise(O=>{Z=O}),se=O=>{clearTimeout(z),z=setTimeout(()=>re("timeout"),O)},F=a,Fe=Date.now(),N=()=>{g==="open"&&(clearTimeout(z),F=Math.max(0,F-(Date.now()-Fe)))},W=()=>{g==="open"&&(Fe=Date.now(),se(F))};d.addEventListener("pointerenter",N),d.addEventListener("pointerleave",W),d.addEventListener("focusin",N),d.addEventListener("focusout",W),f?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{re("action")}}),Number.isFinite(a)&&se(a);function re(O="close"){if(g!=="open")return;g="closing",clearTimeout(z),d.setAttribute("data-state","closing"),o?.(O);let oa=u.getComputedStyle?.(d),So=oa?Math.max(0,...String(oa.transitionDuration||"").split(",").map(sa=>Number.parseFloat(sa)*(sa.trim().endsWith("ms")?1:1e3)||0)):0,ra=()=>{g!=="gone"&&(g="gone",d.remove(),Z(O))};d.addEventListener("transitionend",ra),setTimeout(ra,So+50)}return{el:d,close:re,closed:ee}}var qt="data-nc-help";function ul(t,e,n,a=0,o=6,r=8){let s=t.top-o-e.height,l=s>=a+r?"above":"below",c=l==="above"?s:t.bottom+o,u=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(c),left:Math.round(u),side:l}}var yn=new WeakMap;function pl(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function hl({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=yn.get(t);if(n)return n;let a=t.defaultView,o=null,r=null,s,l=()=>{clearTimeout(s),r=null,o&&(o.hidden=!0)},c=f=>{let g=f.getAttribute(qt);if(!g)return;o||(o=t.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",t.body.appendChild(o)),o.textContent=g,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let w=f.getBoundingClientRect(),y=ul(w,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,pl(t));o.style.top=`${y.top}px`,o.style.left=`${y.left}px`,o.dataset.side=y.side,o.style.visibility=""},u=f=>{if(f.pointerType==="touch")return;let g=f.target&&f.target.closest?f.target.closest(`[${qt}]`):null;g!==r&&(l(),g&&(r=g,s=setTimeout(()=>{r===g&&g.isConnected&&c(g)},e)))},d=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",u),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let h={hide:l,uninstall(){l(),t.removeEventListener("pointerover",u),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),o?.remove(),o=null,yn.delete(t)}};return yn.set(t,h),h}var Zn="netcomposer.rhythm.hidden.v1",Se=new WeakMap;function wn(){try{return globalThis.localStorage??null}catch{return null}}function qi(t,e=Zn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Wa(t,e,n,a=Zn){let o=qi(t,a);n?o.add(e):o.delete(e);try{t?.setItem(a,JSON.stringify([...o]))}catch{}}function qn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of e)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),o.pan&&n.push(Yn(o)));return n}function ml(t,e){if(!(!t||!e))return qn(t).find(n=>n.id===e)}function fl(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${qn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}${e.onFold?"f":""}${e.pan?`p=${e.pan.id}`:""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}${e.onFold?":fold":""}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function gl(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),t.append(n),Xi(t,e)}function Xi(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function bl(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=Se.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ml(n,a)}function yl(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],a=fl(e);if(t.dataset.ncSignature===a){for(let o of n){let r=t.querySelector(`[data-nc-section="${Oa(o.id)}"]`);r&&Xi(r,o);for(let s of o.controls){let l=t.querySelector(`[data-nc-id="${Oa(s.id)}"]`);l instanceof Element&&ue(l,s)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let o of n){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),gl(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let l of o.controls)s.append(tt(l,bl));t.append(r)}}function Oa(t){return t.replace(/["\\]/g,"\\$&")}function wl(t,e=Zn){ki();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=qi(wn(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let u=xi({labelledBy:r.id,onChange:m=>(Se.get(n)??t).onToggle?.(m)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,c);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",o.append(r,d,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,o,h,f),n.setAttribute("aria-labelledby",r.id);let y=m=>{let b=Se.get(n)??t;n.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${b.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";Wa(wn(),(Se.get(n)??t).id,m,e),y(m),zn(n.parentElement)}),f.addEventListener("click",()=>{Wa(wn(),(Se.get(n)??t).id,!1,e),y(!1),zn(n.parentElement)});let p={el:n,update(m){Se.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=m.title,d.textContent=m.status??"",m.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=m.summary??m.title,u.el.hidden=m.on===void 0,u.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),yl(h,m),y(h.hidden),p.redraw()},redraw(){let m=Se.get(n);m&&il(n,qn(m))}};return Se.set(n,t),y(a),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),wi(()=>p.redraw(),n.ownerDocument),p}function vl(t,e,n="adjacent"){ki(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),zn(t)}function zn(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function kl(t,e,n,a){const o=Math.min(n,t.length);for(let r=Math.max(0,e);r<o;r++)if(Math.abs(t[r]??0)>=a)return r;return-1}function xl(t,e,n,a=.35){let o=0;for(let l=0;l<t.length;l++)o=Math.max(o,Math.abs(t[l]??0));if(o<.01)return null;const r=[];for(const l of e){const c=kl(t,l,l+n,o*a);c>=0&&r.push(c-l)}if(r.length*2<e.length||r.length===0)return null;r.sort((l,c)=>l-c);const s=Math.floor(r.length/2);return r.length%2?r[s]??0:((r[s-1]??0)+(r[s]??0))/2}const $l="/lucy/assets/capture-processor-DaZ9hnJi.js",ht=["eq","compressor"],Sl={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function Xn(t){if(t!==void 0){const n=bt(t,ht.length);if(n.chain.length===ht.length&&n.chain.every((a,o)=>a.type===ht[o]))return n}return{v:2,chain:ht.flatMap(n=>{const a=Pn(n);return a?[{...a,bypass:!0,dials:{...a.dials,...Sl[n]}}]:[]})}}const _i={"page:title":"LUCY records a few bars from your mic, or the Studio's Master, and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take's region (between its markers) as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"What Record records: your mic or audio interface (its level, monitor and timing correction), or in the Studio its Master.","module:takes":"Everything you have recorded or loaded, kept in this browser, newest first. The outlined take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take's region looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records the chosen bars from the next bar line: the mic at once (starting the clock), the Master once the music plays. Press again to cancel.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.",status:"What LUCY is doing now: armed and counting in, recording, playing a take, sitting out or stopped.","record-from":"Mic records your input. Master records the whole Studio mix on the bar lines, inside the page: no monitor, and no round trip or nudge applies.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.","takes:empty":"Takes you record, or audio files you Load, appear here as cards, newest first.","take:card":"One take: click it to make it the one Record and Play act on. The outlined card is the selected one.","take:name":"The take's name. Double-click to rename it: Enter saves, Escape cancels.","take:region":"The part that plays, as bar.beat from Start to End, its length in bars and beats, and in seconds.","take:wave":"The take's sound, with its bar lines and fainter beats at the tempo it was recorded at. Outside the markers it is dimmed: that part is skipped.","take:start":"Where the take starts playing. Drag it (Alt or Option skips the snap) or use the arrow keys; double-click to put it back at the start.","take:end":"Where the take stops and loops back to Start. Drag it or use the arrow keys; double-click to put it back at the end.","take:snap":"What the markers snap to: a bar, a beat, an eighth or a sixteenth at the take's tempo, or off. Snapped, the loop is whole beats, so it sits in time.","take:play":"Plays this take, looping its region in time with the clock; Stop stops it. Only the part between the markers plays.","take:send":"Copies this take's region onto a Sampler pad. A region of a bar or more is fitted to the nearest whole bars; a shorter one lands unfitted.","take:more":"Download this take as a WAV file, or delete it.","take:download":"Saves this take's region (between the markers) as a WAV file you can open in any audio app.","take:delete":"Deletes this take from this browser. Undo on the message that follows brings it back.","take:recording":"The take being recorded: it waits for the bar line (or for the Master's music), then fills in as the audio arrives.","take:cancel":"Stops this recording and drops it. Nothing is kept.","take:source":"Where the take came from: your Mic, the Studio's Master, or a File you loaded.","take:fact:bars":"How many bars the whole take lasts at the tempo it was recorded at.","take:fact:secs":"How long the whole take lasts, in seconds.","take:fact:bpm":"The tempo it was recorded at. At another tempo it plays faster or slower, and its pitch follows.","take:fact:chans":"Mono (one channel) or stereo (two).","take:fact:rate":"Its sample rate: how many times a second the sound was measured.","take:fact:when":"When it was recorded or loaded. Rest on it for the full date and time.","send-to":"Which Sampler gets the take, when the Studio holds more than one.","send-pad":"The pad the take goes onto. A pad that has a sample is replaced only if you say so in the Sampler, and Undo there brings it back.","send-go":"Sends the region to the chosen pad and opens the Sampler, where Undo puts the pad back. If that pad has a sample, the Sampler asks first.","send-cancel":"Closes the picker without sending anything.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function Ui(t){return`lucy-help-${t.replace(/[^\w-]/g,"-")}`}function Al(t=document){const e=t.querySelector("[data-lucy-help]");if(e)return e;const n=t.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[a,o]of Object.entries(_i)){const r=t.createElement("span");r.id=Ui(a),r.textContent=o,n.append(r)}return t.body.append(n),n}function I(t,e,...n){const a=_i[t];if(!a)return;e&&e.getAttribute(qt)!==a&&e.setAttribute(qt,a);const o=Ui(t);for(const r of n)r&&r.getAttribute("aria-describedby")!==o&&r.setAttribute("aria-describedby",o)}function El(t,e,n,a=o=>o){const o=`module:${e}`;I(o,t.querySelector(".nc-module-hd .nc-title")),I(o,t.querySelector(".nc-slim"));const r=l=>t.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=r(l.id);if(!c)return;const u=a(l.id);switch(l.type){case"slider":case"select":I(u,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":I(u,c.querySelector(".nc-label"));break;case"button":I(u,c,c);break;case"choice":I(u,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":I(u,c);break;case"fx":{I(u,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),I("hack:switch",c.querySelector("[data-nc-fx-switch]"));for(const d of[...l.controls??[],...l.more??[]])s(d);break}}};for(const l of n)s(l)}const Ml=48e3;function Ll(t,e){try{const n=t?.latency?.(e);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Ml?Math.round(n):0}catch{return 0}}function Cl(t,e){return{from:t.from+e,to:t.to+e}}const Tl="instance",Fl=99;function Ct(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Tl)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Fl?n:1}function Pa(t,e){return e===1?t:`${t}#${e}`}function Nl(t,e){return e===1?t:`${t} ${e}`}let Ye;function Il(t,e=Ct()){if(Ye!==void 0)return Ye;Ye=null;try{if(typeof window>"u"||window.parent===window)return Ye;const n=window.parent.ncStudio;n&&n.version===1&&(Ye=n.attach(t,{instance:e}))}catch{}return Ye}function zl(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,o,r)=>n.request(`${a}${e}`,o,r)}:null}}function Rl(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function _n(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function ze(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function nt(t,e=Ct()){return e>1?`${t}#${e}`:t}function Bl(t,e=Ct()){const n=ze()?.owner()??null;return n===null||n==="studio"||n===nt(t,e)}const Y=4,Ot=[1,2,4,8];function Rn(t){return Math.ceil(t/Y-1e-6)*Y+0}function Dl(t,e,n=0){let a=Rn(t);return a-t<n&&(a+=Y),{startBeat:a,endBeat:a+e*Y}}function jl(t,e,n,a){const o=Math.round((t+n)*a);return{startFrame:o,endFrame:o+Math.round((e-t)*a)}}function at(t){return 60/t}function Wl(t,e,n){const a=r=>Math.round(r*4*at(n)*e),o=Ot.find(r=>a(r)>=t)??Ot[Ot.length-1];return{bars:o,frames:a(o),trimmed:t>a(o)}}const vn="master",Ol=1,Pl=6e3;function Hl(t,e,n=0,a=Ol){if(e){const r=Math.max(0,Math.floor(t/Y)*Y);return t-r<=a?r:Rn(t)}let o=Math.max(0,Rn(t));return o-t<n&&(o+=Y),o}function Gl(t,e,n,a){const o=Math.round(t*a);return{from:o,to:o+Yl(e,n,a)}}function Yl(t,e,n){return Math.round(t*Y*60/e*n)}class Zl{constructor(e){this.deps=e}current={kind:"idle"};rec=null;stopTimer=null;job=0;get phase(){return this.current}get busy(){return this.current.kind!=="idle"}press(){this.busy?this.cancel():this.arm()}arm(){if(this.busy)return!0;const e=this.deps.grab();return e?.record?(e.listen(vn),this.set({kind:"waiting"}),this.deps.running()&&this.start(!1),!0):(this.deps.failed("unavailable"),!1)}cancel(){this.drop(),this.set({kind:"idle"})}clockChanged(e){this.current.kind==="waiting"&&this.deps.running()?this.start(e):this.current.kind==="recording"&&!this.deps.running()&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("stopped"))}start(e){const n=this.deps.grab(),a=Hl(this.deps.beatNow(),e,this.deps.leadBeats()),o=this.deps.bars(),r=this.deps.bpm(),s=this.deps.sampleRate(),{from:l,to:c}=Cl(Gl(this.deps.contextTime(a),o,r,s),Ll(n??null,vn)),u=n?.record?.(vn,l)??null;if(!u){this.set({kind:"idle"}),this.deps.failed("unavailable");return}const d=++this.job,h=this.deps.nextId();this.rec=u,this.set({kind:"recording",id:h,startBeat:a,endBeat:a+o*Y,bars:o,bpm:r,from:l,to:c});const f=(c-l)/s*1e3,g=Math.max(0,(this.deps.contextTime(a)-this.nowContext())*1e3);this.stopTimer=this.deps.after(g+f+Pl,()=>{d===this.job&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("timeout"))}),u.stop(c).then(w=>this.finish(d,w),()=>this.finish(d,null))}nowContext(){return this.deps.contextTime(this.deps.beatNow())}finish(e,n){if(e!==this.job||this.current.kind!=="recording")return;const a=this.current;this.stopTimer?.(),this.stopTimer=null,this.rec=null,this.set({kind:"idle"});const o=n?.[0]?.length??0;if(!n||o===0){this.deps.failed("empty");return}this.deps.done({id:a.id,bars:a.bars,bpm:a.bpm,startBeat:a.startBeat,from:a.from,to:a.to,channels:n})}drop(){this.job++,this.stopTimer?.(),this.stopTimer=null,this.rec?.cancel(),this.rec=null}set(e){this.current=e,this.deps.changed()}}function ql(t){let e=0;for(const n of t)for(const a of n)e=Math.max(e,Math.abs(a));return e}const nn=600;class Xt{constructor(e,n=nn){this.totalFrames=e,this.columns=n,this.peaks=new Float32Array(n*2)}peaks;at=0;get filled(){return this.totalFrames<=0?0:Math.min(this.columns,Math.ceil(this.at/this.totalFrames*this.columns))}get frames(){return this.at}add(e){const n=e[0]?.length??0;if(!n||this.totalFrames<=0)return;const a=this.totalFrames/this.columns;let o=0;for(;o<n&&this.at<this.totalFrames;){const r=Math.min(this.columns-1,Math.floor(this.at/a)),s=Math.min(this.totalFrames,Math.ceil((r+1)*a)),l=Math.max(1,Math.min(n-o,s-this.at));let c=this.peaks[r*2]??0,u=this.peaks[r*2+1]??0;for(const d of e)for(let h=o;h<o+l;h++){const f=d[h]??0;f<c&&(c=f),f>u&&(u=f)}this.peaks[r*2]=Math.max(-1,c),this.peaks[r*2+1]=Math.min(1,u),o+=l,this.at+=l}}}function an(t,e=nn){const n=new Xt(t[0]?.length??0,e);return n.add(t),n.peaks}function Ha(t,e=t.length/2,n=.01){const a=Math.min(t.length/2,Math.max(0,Math.floor(e)));if(!a)return"";const o=l=>Math.round(l*1e3)/1e3,r=[],s=[];for(let l=0;l<a;l++){const c=Math.max(t[l*2+1]??0,n);r.push(`${l} ${o(-c)}`,`${l+1} ${o(-c)}`)}for(let l=a-1;l>=0;l--){const c=Math.min(t[l*2]??0,-n);s.push(`${l+1} ${o(-c)}`,`${l} ${o(-c)}`)}return`M${r.join("L")}L${s.join("L")}Z`}function Xl(t,e=Date.now()){const n=Date.parse(t);if(!Number.isFinite(n))return"";const a=Math.max(0,(e-n)/1e3);if(a<45)return"just now";const o=Math.round(a/60);if(o<60)return`${o} min ago`;const r=Math.round(o/60);if(r<24)return`${r} h ago`;const s=Math.round(r/24);return s===1?"yesterday":s<7?`${s} days ago`:new Date(n).toLocaleDateString(void 0,{day:"numeric",month:"short"})}function _l(t){const e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"}):""}const qe=["off","bar","beat","8","16"],Ul="beat",Vl={off:"Off",bar:"Bar",beat:"Beat",8:"1/8",16:"1/16"};function ye(t){return 60/t.bpm*t.sampleRate}function Vi(t,e){const n=ye(t);switch(e){case"bar":return n*Y;case"beat":return n;case"8":return n/2;case"16":return n/4;default:return null}}function Ki(t){return Math.min(t.frames,Math.max(1,Math.round(ye(t)/4)))}function xe(t){return t.region??{start:0,end:t.frames}}function Kl(t,e){return e.start<=0&&e.end>=t.frames}function Jl(t,e,n){const a=Vi(t,n),o=Math.max(0,Math.min(t.frames,e));if(a===null)return Math.round(o);const r=Math.round(Math.round(o/a)*a);return Math.abs(t.frames-o)<Math.abs(r-o)?t.frames:Math.max(0,Math.min(t.frames,r))}function mt(t,e,n){const a=xe(t),o=Ki(t),r=Math.round(n);return e==="start"?{start:Math.max(0,Math.min(r,a.end-o)),end:a.end}:{start:a.start,end:Math.min(t.frames,Math.max(r,a.start+o))}}function Ql(t,e){if(!e||typeof e!="object")return;const n=e,a=n.start,o=n.end;if(typeof a!="number"||typeof o!="number"||!Number.isFinite(a)||!Number.isFinite(o))return;const r=Math.round(a),s=Math.round(o);if(!(r<0||s>t.frames||s-r<Ki(t))&&!(r===0&&s===t.frames))return{start:r,end:s}}function Ga(t,e,n,a,o=!1){const r=xe(t),s=e==="start"?r.start:r.end,l=o?ye(t)*Y:Vi(t,a)??ye(t)/4,c=s/l,d=Math.abs(c-Math.round(c))*l<.5?Math.round(c)+n:n>0?Math.ceil(c):Math.floor(c);let h=Math.round(d*l);return n>0&&h>t.frames&&(h=t.frames),n>0&&Math.abs(t.frames-h)<1&&(h=t.frames),mt(t,e,h)}function Ya(t,e){const n=e/ye(t)*4,a=Math.round(n),o=Math.abs(n-a)*(ye(t)/4)<1,r=o?a:Math.floor(n),s=Math.floor(r/16)+1,l=Math.floor(r%16/4)+1,c=r%4+1;return`${o?"":"≈"}${s}.${l}${c===1?"":`.${c}`}`}function ec(t){const e=Math.round(t*1e3)/1e3,n=Math.floor((e+1e-9)/Y),a=Math.round((e-n*Y)*1e3)/1e3,o=[];if(n&&o.push(`${n} bar${n===1?"":"s"}`),a>0||!n){const r=Number.isInteger(a)?String(a):String(Math.round(a*100)/100);o.push(`${r} beat${a===1?"":"s"}`)}return o.join(" ")}function Un(t,e=xe(t)){return(e.end-e.start)/ye(t)}function tc(t,e=xe(t)){const n=(e.end-e.start)/t.sampleRate;return`${Ya(t,e.start)} → ${Ya(t,e.end)} · ${ec(Un(t,e))} · ${n.toFixed(2)} s`}function nc(t,e,n){const a=Math.round(n/ye(t)*4),o=Math.floor(a/16)+1,r=Math.floor(a%16/4)+1;return`${e==="start"?"Start":"End"}: ${(n/t.sampleRate).toFixed(2)} s, bar ${o} beat ${r}`}function ac(t,e=xe(t)){const n=Un(t,e)/Y;return n>=1-1e-6?Math.max(1,Math.round(n)):void 0}function Ji(t,e){return t.map(n=>n.slice(e.start,e.end))}function ic(t,e,n=0){let a=Math.ceil(t/Y-1e-6)*Y+0;a-t<n&&(a+=Y);const o=Math.max(1e-6,e),r=(a%o+o)%o;return{startBeat:a,offsetBeats:Math.abs(r-o)<1e-6?0:r}}function oc(t){const e=ye(t),n=[],a=[],o=Math.floor(t.frames/e+1e-6);for(let r=1;r<=o;r++){const s=r*e/t.frames;if(s>=1-1e-6)break;(r%Y===0?n:a).push(s)}return{bars:n,beats:a}}const rc={mic:"Mic",master:"Master",file:"File"},Qi=40;function eo(t){return t.source??(t.name===`Master ${t.id}`?"master":"mic")}function ct(t){return t.snap??Ul}function sc(t,e){t.source??=eo(t);const n=e.replace(/\s+/g," ").trim().slice(0,Qi);return!n||n===`Take ${t.id}`?t.name=void 0:t.name=n,t.name}const Ue={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1,source:"mic"};function ge(t){return t.name??`Take ${t.id}`}const Za=new Set([1,2,4,8]);function on(t){const e=t&&typeof t=="object"?t:{},n=(l,c,u)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=u?l:null,a=Array.isArray(e.takes)?e.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},u=n(c.id,1,1e9),d=n(c.bars,1,8),h=n(c.bpm,20,300),f=n(c.sampleRate,8e3,192e3),g=n(c.channels,1,2),w=n(c.frames,0,1e9);if(u===null||d===null||!Za.has(d)||h===null||f===null||g===null||w===null)return[];if(c.saved!==!0)return[];const y=typeof c.name=="string"&&c.name.trim()?c.name.trim().slice(0,Qi):void 0,p={id:u,bars:d,bpm:h,sampleRate:f,channels:g,frames:w,created:String(c.created??""),saved:!0,...y?{name:y}:{}};(c.source==="mic"||c.source==="master"||c.source==="file")&&(p.source=c.source);const m=Ql(p,c.region);return m&&(p.region=m),typeof c.snap=="string"&&qe.includes(c.snap)&&(p.snap=c.snap),[p]}):[],o=n(e.bars,1,8),r=n(e.selected,1,1e9),s=Math.max(n(e.nextId,1,1e9)??1,...a.map(l=>l.id+1));return{bars:o!==null&&Za.has(o)?o:Ue.bars,monitor:typeof e.monitor=="boolean"?e.monitor:Ue.monitor,roundTripMs:n(e.roundTripMs,0,1e3),nudgeMs:n(e.nudgeMs,-10,10)??0,takes:a,selected:r!==null&&a.some(l=>l.id===r)?r:a.at(-1)?.id??null,nextId:s,master:n(e.master,0,1)??Ue.master,source:e.source==="master"?"master":"mic",...e.fx&&typeof e.fx=="object"?{fx:e.fx}:{}}}function lc(t,e=to()){try{const n=e?.getItem(t);return n?on(JSON.parse(n)):{...Ue,takes:[]}}catch{return{...Ue,takes:[]}}}function cc(t,e,n=to()){try{n?.setItem(t,JSON.stringify(e))}catch{}}function to(){try{return globalThis.localStorage??null}catch{return null}}function dc(t,e){const n=xe(t),a=ac(t,n);return{name:ge(t),sampleRate:t.sampleRate,channels:Ji(e,n),...a!==void 0?{bars:a}:{},bpm:t.bpm}}class uc{constructor(e,n){this.state=e,this.removeFile=n}pending=new Map;delete(e){const n=this.state.takes.findIndex(o=>o.id===e),a=this.state.takes[n];return a?(this.pending.set(e,{meta:a,index:n,selected:this.state.selected===e}),this.state.takes.splice(n,1),this.state.selected===e&&(this.state.selected=null),!0):!1}undo(e){const n=this.pending.get(e);return n?(this.pending.delete(e),this.state.takes.some(a=>a.id===e)||this.state.takes.splice(Math.min(n.index,this.state.takes.length),0,n.meta),n.selected&&(this.state.selected=e),n.meta):null}async settle(e){this.pending.delete(e)&&await this.removeFile(e)}get held(){return[...this.pending.keys()]}}function Ze(t,e){return`${t}-take-${e}.f32`}function pc(t){return t.channels*t.frames*4}class hc{constructor(e){this.prefix=e}memory=new Map;dir=null;ready=Promise.resolve();adopt(e,n){return e===this.prefix||!n.length?this.ready:(this.ready=(async()=>{const a=await this.folder();if(a)for(const o of n){try{await a.getFileHandle(Ze(this.prefix,o));continue}catch{}try{const r=await(await a.getFileHandle(Ze(e,o))).getFile(),l=await(await a.getFileHandle(Ze(this.prefix,o),{create:!0})).createWritable?.();if(!l)continue;await l.write(await r.arrayBuffer()),await l.close()}catch{}}})(),this.ready)}folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(e,n){this.memory.set(e,n),await this.ready;const a=await this.folder();if(!a)return!1;try{const r=await(await a.getFileHandle(Ze(this.prefix,e),{create:!0})).createWritable?.();if(!r)return!1;for(const s of n)await r.write(s);return await r.close(),!0}catch{return!1}}async load(e){const n=this.memory.get(e.id);if(n)return n.length===e.channels&&n.every(o=>o.length===e.frames)?n:null;await this.ready;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(Ze(this.prefix,e.id))).getFile();if(o.size!==pc(e))return null;const r=new Float32Array(await o.arrayBuffer()),s=Array.from({length:e.channels},(l,c)=>r.slice(c*e.frames,(c+1)*e.frames));return this.memory.set(e.id,s),s}catch{return null}}async remove(e){this.memory.delete(e),await this.ready;const n=await this.folder();try{await n?.removeEntry(Ze(this.prefix,e))}catch{}}}function mc(t,e){const n=t[0]?.length??0,a=t.length,o=n*a*4,r=new DataView(new ArrayBuffer(44+o)),s=(c,u)=>{for(let d=0;d<u.length;d++)r.setUint8(c+d,u.charCodeAt(d))};s(0,"RIFF"),r.setUint32(4,36+o,!0),s(8,"WAVE"),s(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,3,!0),r.setUint16(22,a,!0),r.setUint32(24,e,!0),r.setUint32(28,e*a*4,!0),r.setUint16(32,a*4,!0),r.setUint16(34,32,!0),s(36,"data"),r.setUint32(40,o,!0);let l=44;for(let c=0;c<n;c++)for(let u=0;u<a;u++)r.setFloat32(l,t[u]?.[c]??0,!0),l+=4;return new Uint8Array(r.buffer)}const Vn="netcomposer.lucy",_t=1;function fc(t){const{roundTripMs:e,nudgeMs:n,...a}=on(JSON.parse(JSON.stringify(t)));return{format:Vn,v:_t,...a,fx:Xn(a.fx)}}function gc(t,e){const n=bc(e);return{...n,roundTripMs:t.roundTripMs,nudgeMs:t.nudgeMs,nextId:Math.max(n.nextId,t.nextId)}}function bc(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Not a LUCY preset: expected an object.");const e=t;if(e.format!==void 0&&e.format!==Vn)throw new Error(`Not a LUCY preset: format ${String(e.format)}.`);if(e.v!==void 0){if(typeof e.v!="number"||!Number.isInteger(e.v)||e.v<0)throw new Error("Not a LUCY preset: bad version.");if(e.v>_t)throw new Error(`LUCY preset v${e.v} is newer than this LUCY (v${_t}).`)}if(!Array.isArray(e.takes)||typeof e.bars!="number")throw new Error("Not a LUCY preset: no takes or length.");const n=on(e);return{...n,fx:Xn(n.fx)}}function yc(t){return t.replace(/[\\/]/g,"~")}function wc(t,e=Ct()){const n=Pa("lucy.state",e),a=Pa("lucy",e),o=typeof t?.storageKey=="function"?t.storageKey.bind(t):null;return o?{state:o("lucy.state"),files:yc(o("lucy")),legacyState:n,legacyFiles:a}:{state:n,files:a,legacyState:n,legacyFiles:a}}function vc(t,e){if(!e||t.state===t.legacyState)return null;try{if(e.getItem(t.state)!==null)return null;const n=e.getItem(t.legacyState);let a={...Ue,takes:[]};if(n)try{a=on(JSON.parse(n))}catch{}return e.setItem(t.state,JSON.stringify(a)),n?a.takes.map(o=>o.id):null}catch{return null}}const wt="http://www.w3.org/2000/svg";function C(t,e,n={},...a){const o=document.createElement(t);e&&(o.className=e);for(const[r,s]of Object.entries(n))o.setAttribute(r,s);return o.append(...a),o}function J(t,e){t.textContent!==e&&(t.textContent=e)}function ne(t,e,n){n===null?t.hasAttribute(e)&&t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function dt(t,e,n){ne(t,`data-${e}`,n?"true":null)}function qa(){const t=document.createElementNS(wt,"svg");t.setAttribute("class","lucy-wave-svg"),t.setAttribute("viewBox",`0 -1 ${nn} 2`),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("aria-hidden","true");const e=r=>{const s=document.createElementNS(wt,"path");return s.setAttribute("class",r),t.append(s),s},n=e("lucy-wave-env"),a=e("lucy-wave-beats"),o=e("lucy-wave-bars");return{svg:t,beats:a,bars:o,env:n}}function kc(){const t=document.createElementNS(wt,"svg");t.setAttribute("class","lucy-take-play-icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");const e=document.createElementNS(wt,"path");e.setAttribute("class","lucy-icon-play"),e.setAttribute("d","M7 5 L19 12 L7 19 Z");const n=document.createElementNS(wt,"path");return n.setAttribute("class","lucy-icon-stop"),n.setAttribute("d","M6 6 H18 V18 H6 Z"),t.append(e,n),t}function kn(t){return t.map(e=>`M${Math.round(e*nn*100)/100} -1V1`).join("")}class xc{constructor(e){this.on=e,this.el=C("div","lucy-takes"),this.list=C("div","lucy-take-list",{role:"list"}),this.emptyLine=C("p","lucy-takes-empty"),I("takes:empty",this.emptyLine),this.el.append(this.emptyLine,this.list),document.addEventListener("pointerdown",n=>{this.openMenu&&!this.openMenu.root.querySelector(".lucy-take-more-wrap")?.contains(n.target)&&this.closeMenu()})}el;list;emptyLine;cards=new Map;live=null;openMenu=null;render(e){this.renderLive(e.live);const n=!e.takes.length&&!e.live;if(this.emptyLine.hidden=!n,n){J(this.emptyLine,""),this.emptyLine.firstChild||this.emptyLine.append(C("span","lucy-takes-empty-line",{},"No takes yet. Record or load a WAV."),C("span","lucy-takes-empty-hint"));const r=this.emptyLine.querySelector(".lucy-takes-empty-hint");r&&J(r,e.hint)}const a=new Set;let o=this.live?.root??null;for(const r of e.takes){a.add(r.id);let s=this.cards.get(r.id);s||(s=this.create(r),this.cards.set(r.id,s)),this.update(s,r,e),(o?o.nextElementSibling:this.list.firstElementChild)!==s.root&&(o?o.after(s.root):this.list.prepend(s.root)),o=s.root}for(const[r,s]of this.cards)a.has(r)||(this.openMenu===s&&(this.openMenu=null),s.root.remove(),this.cards.delete(r))}setPlayhead(e,n){for(const a of this.cards.values()){const o=a.id===e&&n>=0;if(o){const r=n.toFixed(4);a.wave.style.getPropertyValue("--lucy-at")!==r&&a.wave.style.setProperty("--lucy-at",r)}dt(a.wave,"head",o)}}card(e){return this.cards.get(e)?.root}renderLive(e){if(!e){this.live?.root.remove(),this.live=null;return}if(!this.live){const o=C("span","lucy-take-live-label",{"aria-live":"polite"}),r=C("button","nc-page-action lucy-take-action",{type:"button"},"Cancel");r.addEventListener("click",()=>this.on.cancelRecording()),I("take:cancel",r,r);const{svg:s,bars:l,env:c}=qa(),u=C("div","lucy-take-wave",{"data-live":"true"},s),d=C("span","lucy-take-name lucy-take-name-live",{},"New take"),h=C("article","lucy-take",{"data-live":"true",role:"listitem","aria-label":"Recording"},C("div","lucy-take-hd",{},d,o,C("div","lucy-take-actions",{},r)),u);I("take:recording",o),this.list.prepend(h),this.live={root:h,label:o,env:c,bars:l,drawn:""}}J(this.live.label,e.label);const n=e.bars.join(",");this.live.bars.dataset.key!==n&&(this.live.bars.dataset.key=n,this.live.bars.setAttribute("d",kn(e.bars)));const a=e.peaks?`${e.filled}`:"";a!==this.live.drawn&&(this.live.drawn=a,this.live.env.setAttribute("d",e.peaks?Ha(e.peaks,e.filled):"")),this.list.firstElementChild!==this.live.root&&this.list.prepend(this.live.root)}create(e){const n=e.id,a=C("h3","lucy-take-name",{tabindex:"0"}),o=C("span","lucy-take-region nc-readout"),r=(N,W)=>{const re=C("button","nc-page-action lucy-take-action",{type:"button","data-take-action":W},N);return I(`take:${W}`,re,re),re},s=C("button","lucy-take-play",{type:"button","data-take-action":"play","aria-label":"Play","aria-pressed":"false"},kc());I("take:play",s,s);const l=C("span","lucy-take-source");I("take:source",l);const c=r("Send to Sampler","send"),u=C("button","nc-page-action lucy-take-action lucy-take-more",{type:"button","aria-haspopup":"menu","aria-expanded":"false","aria-label":"More actions","data-take-action":"more"},"⋯");I("take:more",u,u);const d=C("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"download"},"Download WAV"),h=C("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"delete"},"Delete");I("take:download",d,d),I("take:delete",h,h);const f=C("div","lucy-take-menu",{role:"menu"},d,h);f.hidden=!0;const g=C("div","lucy-take-actions",{},c,C("span","lucy-take-more-wrap",{},u,f)),{svg:w,env:y}=qa(),p=N=>{const W=C("div","lucy-take-marker",{role:"slider",tabindex:"0","data-marker":N,"aria-orientation":"horizontal"});return I(`take:${N}`,W,W),W},m={start:p("start"),end:p("end")},b=C("span","lucy-take-wave-empty"),v=C("div","lucy-take-barnums",{"aria-hidden":"true"}),S=C("div","lucy-take-wave",{role:"group"},v,w,C("div","lucy-take-dim",{"data-side":"start"}),C("div","lucy-take-dim",{"data-side":"end"}),C("div","lucy-take-playhead",{"aria-hidden":"true"},C("span","lucy-take-playhead-line")),m.start,m.end,b);S.style.setProperty("--lucy-at","-1"),I("take:wave",S);const k=N=>{const W=C("span","lucy-take-fact",{"data-fact":N});return I(`take:fact:${N}`,W),W},A={bars:k("bars"),secs:k("secs"),bpm:k("bpm"),chans:k("chans"),rate:k("rate"),when:k("when")},$=C("span","lucy-take-snap-label",{id:`lucy-snap-${n}`},"Snap"),E=C("span","nc-choice-row lucy-take-snap",{role:"radiogroup","aria-labelledby":`lucy-snap-${n}`});for(const N of qe){const W=C("button","nc-choice lucy-take-snap-opt",{type:"button",role:"radio","data-snap":N,"aria-checked":"false",tabindex:"-1"},Vl[N]);W.addEventListener("click",()=>this.on.setSnap(n,N)),E.append(W)}E.addEventListener("keydown",N=>{const W=N.key==="ArrowRight"||N.key==="ArrowDown"?1:N.key==="ArrowLeft"||N.key==="ArrowUp"?-1:0;if(!W)return;N.preventDefault();const re=qe.indexOf(ct(F.meta)),O=qe[(re+W+qe.length)%qe.length]??"beat";this.on.setSnap(n,O),E.querySelector(`[data-snap="${O}"]`)?.focus()}),I("take:snap",$,E);const z=C("div","lucy-take-facts nc-readout",{},...Object.values(A),C("span","lucy-take-snap-wrap",{},$,E)),Z=C("div","lucy-take-picker");Z.hidden=!0;const ee=C("p","lucy-take-note",{"aria-live":"polite"});ee.hidden=!0;const se=C("article","lucy-take",{role:"listitem","data-take":String(n)},C("div","lucy-take-hd",{},s,C("div","lucy-take-title",{},a,l,o),g),S,z,Z,ee);I("take:card",null,se),I("take:name",a),I("take:region",o);const F={id:n,root:se,name:a,region:o,play:s,sourcePill:l,barNums:v,send:c,more:u,menu:f,download:d,remove:h,wave:S,env:y,empty:b,markers:m,facts:A,snap:E,picker:Z,note:ee,drawn:"none",gridKey:"",meta:e,draft:null,editing:!1};se.addEventListener("click",N=>{N.target.closest("button, select, input, label, [role=slider], .lucy-take-picker")||this.on.select(n)}),s.addEventListener("click",()=>this.on.play(n)),c.addEventListener("click",()=>this.on.openSend(n)),u.addEventListener("click",()=>this.openMenu===F?this.closeMenu():this.showMenu(F)),f.addEventListener("keydown",N=>{N.key==="Escape"&&(this.closeMenu(),u.focus())}),d.addEventListener("click",()=>{this.closeMenu(),this.on.download(n)}),h.addEventListener("click",()=>{this.closeMenu(),this.on.remove(n)});const Fe=()=>{if(F.editing)return;F.editing=!0;const N=C("input","lucy-take-rename",{type:"text",maxlength:"40","aria-label":`Rename ${ge(F.meta)}`,value:ge(F.meta)});a.replaceWith(N),N.focus(),N.select();let W=!1;const re=O=>{W||(W=!0,F.editing=!1,N.replaceWith(a),O&&this.on.rename(n,N.value),a.focus())};N.addEventListener("keydown",O=>{O.key==="Enter"?(O.preventDefault(),re(!0)):O.key==="Escape"&&(O.preventDefault(),re(!1))}),N.addEventListener("blur",()=>re(!0))};a.addEventListener("dblclick",Fe),a.addEventListener("keydown",N=>{(N.key==="Enter"||N.key==="F2")&&(N.preventDefault(),Fe())});for(const N of["start","end"])this.bindMarker(F,N);return F}showMenu(e){this.closeMenu(),this.openMenu=e,e.menu.hidden=!1,e.more.setAttribute("aria-expanded","true"),e.menu.querySelector("button:not(:disabled)")?.focus()}closeMenu(){const e=this.openMenu;e&&(this.openMenu=null,e.menu.hidden=!0,e.more.setAttribute("aria-expanded","false"))}bindMarker(e,n){const a=e.markers[n],o=()=>({...e.meta,region:e.draft??e.meta.region}),r=l=>{const c=e.wave.getBoundingClientRect();return(l-c.left)/Math.max(1,c.width)*e.meta.frames},s=(l,c)=>{e.draft=c?null:l,this.paintRegion(e,l),this.on.setRegion(e.id,l,c)};a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.preventDefault(),a.setPointerCapture(l.pointerId),a.focus(),e.root.dataset.dragging="true";let c=null;const u=h=>{const f=o(),g=r(h.clientX),w=h.altKey?g:Jl(f,g,ct(f));c=mt(f,n,w),s(c,!1)},d=h=>{a.removeEventListener("pointermove",u),a.removeEventListener("pointerup",d),a.removeEventListener("pointercancel",d),e.root.removeAttribute("data-dragging");try{a.releasePointerCapture(h.pointerId)}catch{}c&&s(c,!0)};a.addEventListener("pointermove",u),a.addEventListener("pointerup",d),a.addEventListener("pointercancel",d)}),a.addEventListener("dblclick",()=>{const l=o();s(mt(l,n,n==="start"?0:l.frames),!0)}),a.addEventListener("keydown",l=>{const c=o();let u=null;l.key==="ArrowLeft"||l.key==="ArrowDown"?u=Ga(c,n,-1,ct(c),l.shiftKey):l.key==="ArrowRight"||l.key==="ArrowUp"?u=Ga(c,n,1,ct(c),l.shiftKey):l.key==="Home"?u=mt(c,n,0):l.key==="End"&&(u=mt(c,n,c.frames)),u&&(l.preventDefault(),s(u,!0))})}paintRegion(e,n){const a={...e.meta,region:n},o=Math.max(1,a.frames);e.wave.style.setProperty("--lucy-start",(n.start/o).toFixed(5)),e.wave.style.setProperty("--lucy-end",(n.end/o).toFixed(5)),J(e.region,tc(a,n).replace(/(?<![·→]) (?![·→])/g," "));const r=s=>(s/a.sampleRate).toFixed(2);for(const s of["start","end"]){const l=e.markers[s],c=n[s];ne(l,"aria-label",`${s==="start"?"Start":"End"} of ${ge(a)}`),ne(l,"aria-valuemin","0"),ne(l,"aria-valuemax",r(a.frames)),ne(l,"aria-valuenow",r(c)),ne(l,"aria-valuetext",nc(a,s,c))}}update(e,n,a){e.meta=n;const o=n.id,r=ge(n);e.editing||J(e.name,r),ne(e.root,"aria-label",r);const s=a.selected===o,l=a.playing===o;dt(e.root,"selected",s),dt(e.root,"playing",l),ne(e.root,"aria-current",s?"true":null),ne(e.play,"aria-label",`${l?"Stop":"Play"} ${r}`),ne(e.play,"aria-pressed",l?"true":"false");const c=a.peaks(o),u=c===null;dt(e.root,"missing",u),dt(e.root,"loading",c===void 0),e.drawn!==c&&(e.drawn=c,e.env.setAttribute("d",c?Ha(c):"")),J(e.empty,u?"Not in this browser":""),ne(e.wave,"aria-label",u?`${r}: audio not in this browser`:`${r}: waveform`);const d=`${n.bpm}:${n.sampleRate}:${n.frames}`;if(e.gridKey!==d){e.gridKey=d;const w=oc(n),y=e.wave.querySelector(".lucy-wave-beats"),p=e.wave.querySelector(".lucy-wave-bars");y?.setAttribute("d",kn(w.beats)),p?.setAttribute("d",kn(w.bars)),e.barNums.replaceChildren(...[0,...w.bars].map((m,b)=>{const v=C("span","lucy-take-barnum",{},String(b+1));return v.style.setProperty("--lucy-x",m.toFixed(5)),v}))}for(const w of Object.values(e.markers))w.hidden=u;e.draft||this.paintRegion(e,xe(n));const h=n.frames/n.sampleRate;J(e.sourcePill,rc[eo(n)]),J(e.facts.bars,`${n.bars} bar${n.bars===1?"":"s"}`),J(e.facts.secs,`${h.toFixed(1)} s`),J(e.facts.bpm,`${Math.round(n.bpm*10)/10} BPM`),J(e.facts.chans,n.channels===2?"Stereo":"Mono"),J(e.facts.rate,`${Math.round(n.sampleRate/100)/10} kHz`),J(e.facts.when,Xl(n.created,a.now)),ne(e.facts.when,"title",_l(n.created)||null);const f=ct(n);for(const w of e.snap.querySelectorAll("[data-snap]")){const y=w.dataset.snap===f;ne(w,"aria-checked",y?"true":"false"),ne(w,"tabindex",y?"0":"-1"),w.disabled=u}e.send.hidden=!a.canSend,J(e.send,`Send to ${a.sendName}`),e.send.disabled=u,e.download.disabled=u,e.play.disabled=u,this.renderPicker(e,a);const g=a.sendNote?.take===o?a.sendNote.text:"";e.note.hidden=!g,J(e.note,g)}renderPicker(e,n){const a=n.picker?.take===e.id&&n.canSend?n.picker:null;if(e.picker.hidden=!a,e.send.hidden=e.send.hidden||!!a,!a){e.picker.firstChild&&e.picker.replaceChildren();return}const o=a.receivers.find(u=>u.instance===a.to)??a.receivers[0],r=JSON.stringify([a.receivers.map(u=>[u.instance,u.targets.map(d=>d.id)]),a.to]);if(e.picker.dataset.key!==r){e.picker.dataset.key=r,e.picker.replaceChildren();const u=(f,g,w,y,p)=>{const m=`lucy-${f}-${e.id}`,b=C("select","nc-select lucy-take-pick",{id:m,"data-pick":f});for(const S of y)b.append(C("option","",{value:S.value},S.label));b.addEventListener("change",()=>p(b.value));const v=C("label","lucy-take-snap-label",{for:m},g);I(w,v,b),e.picker.append(C("span","lucy-take-pick-wrap",{},v,b))};a.receivers.length>1&&u("send-to","Sampler","send-to",a.receivers.map(f=>({value:f.instance,label:f.name})),f=>this.on.pickTo(f)),u("send-pad",o?.label??"Pad","send-pad",(o?.targets??[]).map(f=>({value:f.id,label:f.name})),f=>this.on.pickTarget(f));const d=C("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-go"},"Send");d.addEventListener("click",()=>this.on.send()),I("send-go",d,d);const h=C("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-cancel"},"Cancel");h.addEventListener("click",()=>this.on.cancelSend()),I("send-cancel",h,h),e.picker.append(d,h)}const s=e.picker.querySelector('[data-pick="send-to"]');s&&s.value!==a.to&&(s.value=a.to);const l=e.picker.querySelector('[data-pick="send-pad"]');l&&l.value!==a.target&&(l.value=a.target);const c=e.picker.querySelector('[data-take-action="send-go"]');c&&(J(c,a.sending?"Sending…":"Send"),c.disabled=a.sending)}}const $c="LUCY Audio",Re="lucy",ce=Ct(),Kn=.15,X=Il(Re,ce),rn=wc(X,ce),Xa=vc(rn,Sc()),no=rn.state,x=lc(no),he=new hc(rn.files);Xa&&he.adopt(rn.legacyFiles,Xa);const q=()=>cc(no,x);function Sc(){try{return globalThis.localStorage??null}catch{return null}}let le=!1,R={kind:"idle"},Ve=!1,B="",Ut=0,Pt=0;const we=new No({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let L=null,vt=null;const Ac=new Go({...zl(),app:Nl($c,ce),version:"0.1.0",clock:we,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=L?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"},startGate:()=>vt?.whenSettled?.()??null}),Be=t=>t+(vt?.offset??0),j=()=>we.transport,Et=()=>j().running,ao=()=>!!X&&typeof _n()?.record=="function",We=()=>x.source==="master"&&ao()?"master":"mic",Le=()=>Et()&&!le;let Ae=null,ie=null,Ce=null,Q=null,Vt=null,Ie=null,sn=1,io=!1,Kt=null;function De(){return Kt??=(async()=>{X?(L=X.ctx,Ae=X.output,vt=X.mapper??new da(X.ctx)):(L=new AudioContext({latencyHint:"interactive"}),Ae=L.destination,vt=new da(L)),vt.start();try{await L.audioWorklet.addModule($l)}catch{return B="Audio could not start (the recorder's worklet did not load). Reload to try again.",T(),!1}ie=new AudioWorkletNode(L,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),ie.port.onmessage=e=>Ec(e.data);const t=new GainNode(L,{gain:0});return ie.connect(t).connect(Ae),Q=Sr(L,{moduleUrl:Rl()??Mr,bpm:j().bpm,slots:ht.length,state:Xn(x.fx)}),Vt=new GainNode(L,{gain:x.master}),Q.output.connect(Vt).connect(Ae),Er(Q,we,{toAudioTime:Be,now:oe}),Q.onChange(()=>{x.fx=Q?.getState(),q()}),Ce=new GainNode(L,{gain:0}),Ce.connect(Q.input),Te(x.monitor),!0})(),Kt}async function Jn(){if(Ie)return!0;if(!await De()||!L||!ie||!Ce)return!1;L.state!=="running"&&await L.resume().catch(()=>{});try{const t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}}}),n=t.getAudioTracks()[0]?.getSettings()??{};return sn=Math.max(1,Math.min(2,n.channelCount??1)),io=!!(n.echoCancellation||n.noiseSuppression||n.autoGainControl),Ie=L.createMediaStreamSource(t),Ie.connect(ie),Ie.connect(Ce),B="",T(),!0}catch{return B="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",T(),!1}}function Te(t){x.monitor=t,q(),Ce&&L&&Ce.gain.setTargetAtTime(t&&!Ve&&We()==="mic"?1:0,L.currentTime,.01),Pt=0,T()}let fe=null,kt=null;function Ec(t){if(t.type==="level"&&typeof t.peak=="number"){Ut=t.peak;const e=performance.now();x.monitor&&Ie&&Ut>.97?(Pt||=e,e-Pt>1500&&(Te(!1),B="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):Pt=0,Xc();return}if(t.type==="chunk"&&t.id!==void 0&&t.channels){(!fe||fe.id!==t.id)&&(fe={id:t.id,parts:[]}),fe.parts.push(t.channels),G?.id===t.id&&(G.builder.add(t.channels),Ft());return}if(t.type==="done"&&t.id!==void 0){const e=fe?.id===t.id?fe.parts:[];fe=null;const n=Mc(e);if(kt&&t.id===po){kt(n),kt=null;return}Cc(t.id,n)}}function Mc(t){const e=t[0]?.length??0,n=t.reduce((a,o)=>a+(o[0]?.length??0),0);return Array.from({length:e},(a,o)=>{const r=new Float32Array(n);let s=0;for(const l of t){const c=l[o];c&&(r.set(c,s),s+=c.length)}return r})}function Qn(){const t=x.nudgeMs/1e3;if(x.roundTripMs!==null)return x.roundTripMs/1e3+t;const e=L;return(e?.baseLatency??0)+(e?.outputLatency??0)+.01+t}async function Lc(t,e){const n=performance.now()+e;for(;!t();){if(performance.now()>n)return!1;await new Promise(a=>setTimeout(a,20))}return!0}async function oo(){if(We()==="master"||V.busy){await Fc();return}if(R.kind!=="idle"){ie?.port.postMessage({type:"cancel"}),R={kind:"idle"},fe=null,G=null,T();return}if(!await Jn()||!L||!ie)return;if(j().running||(X&&ze()?.claim(nt(Re,ce)),we.play({at:oe()})),le=!1,!await Lc(()=>j().running,2e3)){B="The clock did not start.",T();return}const t=j(),e=Kn/at(t.bpm),{startBeat:n,endBeat:a}=Dl(Math.max(0,t.beatAt(oe())),x.bars,e),o=Be(t.timeAt(n)),r=Be(t.timeAt(a)),{startFrame:s,endFrame:l}=jl(o,r,Qn(),L.sampleRate),c=x.nextId++;q(),ie.port.postMessage({type:"record",id:c,startFrame:s,endFrame:l,channels:sn}),R={kind:"armed",id:c,startBeat:n,endBeat:a},G={id:c,source:"mic",bars:x.bars,builder:new Xt(l-s)},B="",T()}async function Cc(t,e){if(R.kind==="idle"||R.id!==t||!L)return;R={kind:"idle"},G?.id===t&&(G=null);const n=e[0]?.length??0;if(n===0){B="Nothing was recorded.",T();return}const a={id:t,bars:x.bars,bpm:j().bpm,sampleRate:L.sampleRate,channels:e.length,frames:n,created:new Date().toISOString(),saved:!1,source:"mic"};ve.set(t,an(e)),a.saved=await he.save(t,e),a.saved||(B="This take is kept until you reload: this browser has no file storage here."),x.takes.push(a),x.selected=t,q(),await pe(t)}const V=new Zl({grab:_n,running:()=>j().running,beatNow:()=>j().beatAt(oe()),bpm:()=>j().bpm,contextTime:t=>Be(j().timeAt(t)),sampleRate:()=>L?.sampleRate??48e3,leadBeats:()=>Kn/at(j().bpm),bars:()=>x.bars,nextId:()=>{const t=x.nextId++;return q(),t},after:(t,e)=>{const n=setTimeout(e,t);return()=>clearTimeout(n)},done:t=>void Nc(t),failed:t=>{B=Tc[t],G=null,T()},changed:()=>T()}),Tc={cancelled:"",stopped:"Music stopped: no take.",unavailable:"Reload the Studio to record its Master.",empty:"The Master take came back empty.",timeout:"Master take timed out: no take."};async function Fc(){if(V.busy){V.cancel(),G=null,B="",T();return}!await De()||!L||(B="",V.arm())}async function Nc(t){if(!L)return;if(ql(t.channels)<1e-4){B="The Master was silent: no take.",T();return}const e=t.channels.map(a=>new Float32Array(a)),n={id:t.id,bars:t.bars,bpm:t.bpm,sampleRate:L.sampleRate,channels:e.length,frames:e[0]?.length??0,created:new Date().toISOString(),saved:!1,name:`Master ${t.id}`,source:"master"};G?.id===t.id&&(G=null),ve.set(t.id,an(e)),n.saved=await he.save(t.id,e),B=n.saved?"":"This take is kept until you reload: this browser has no file storage here.",x.takes.push(n),x.selected=t.id,Tt(),q(),await pe(t.id)}function ro(t){ln(!1),x.source=t,B="",q(),Te(x.monitor)}function ot(){try{return X?.sendAudio?X.audioReceivers?.()??[]:[]}catch{return[]}}let U=null,xt=!1,je=null;function so(t){return(t?.targets.find(e=>!e.filled)??t?.targets[0])?.id??""}function lo(t=x.selected){const e=ot()[0];!e||t===null||!x.takes.some(n=>n.id===t)||(U={take:t,to:e.instance,target:so(e)},je=null,T())}function Tt(){U=null}async function co(){const t=U,e=x.takes.find(l=>l.id===t?.take);if(!t||!e||!X?.sendAudio||xt)return;const n=await he.load(e),a=ot().find(l=>l.instance===t.to),o=a?.name??"Sampler",r=`${a?.label??"Pad"} ${t.target}`;if(!n){je={take:e.id,text:`${ge(e)} could not be read.`},T();return}xt=!0,T();let s;try{s=await X.sendAudio(t.to,dc(e,n),t.target)}catch(l){s={ok:!1,reason:"error",message:l instanceof Error?l.message:String(l)}}xt=!1,U=null,je={take:e.id,text:s.ok?`Sent to ${o} · ${r}`:s.reason==="cancelled"?`Not sent: ${r} kept.`:`Not sent: ${s.message??s.reason}`},T()}let ae=null,Ke=null;async function pe(t){t!==x.selected&&Tt(),x.selected=t,q();const e=x.takes.find(a=>a.id===t);if(!e||!L){ae=null,it(!0),T();return}const n=await he.load(e);if(!n)B=`Take ${e.id} could not be read.`,ae=null;else{const a=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});n.forEach((o,r)=>a.copyToChannel(o,r)),ae={id:e.id,audio:a}}it(!0),T()}function Bn(t){if(Ke){try{Ke.node.stop(t??0)}catch{}Ke=null}}let Je=null,Dn=null;function it(t=!1){const e=x.takes.find(w=>w.id===ae?.id);if(!L||!Ae||!ae||!e||!Le()){const w=j().stopTime;Bn(w!==null&&L?Math.max(Be(w),L.currentTime):void 0),Je=null,Dn=null;return}const n=j(),a=xe(e),o=JSON.stringify([ae.id,n.startTime,n.bpm,a.start,a.end]);if(!t&&Ke?.stamp===o)return;const r=Kn/at(n.bpm),{startBeat:s,offsetBeats:l}=ic(n.beatAt(oe()),Un(e,a),r),c=Math.max(Be(n.timeAt(s)),L.currentTime);Bn(c);const u=new AudioBufferSourceNode(L,{buffer:ae.audio,loop:!0}),d=a.start/e.sampleRate,h=a.end/e.sampleRate;u.loopStart=d,u.loopEnd=h;const f=n.bpm/e.bpm;u.playbackRate.value=f,u.connect(Q?.input??Ae);const g=Math.min(h-d,l*at(e.bpm));u.start(c,d+g),Ke={node:u,stamp:o},Dn=Je,Je={id:e.id,when:c,offset:g,start:d,length:h-d,duration:e.frames/e.sampleRate,rate:f}}function uo(t=L?.currentTime??0){const e=Je&&t>=Je.when?Je:Dn??null;if(!e||!Ke||t<e.when||!e.length)return{id:null,at:-1};const n=(((t-e.when)*e.rate+e.offset)%e.length+e.length)%e.length;return{id:e.id,at:(e.start+n)/e.duration}}const po=0;async function Ic(){if(Ve||R.kind!=="idle"||V.busy||!await Jn()||!L||!ie||!Ae)return;Ve=!0,Te(x.monitor),B="Calibrating: speakers on, keep quiet for two seconds…",T();const t=L.sampleRate,e=L.currentTime+.3,n=[0,.5,1,1.5].map(u=>e+u),a=Math.round((e-.05)*t),o=Math.round((e+2.2)*t),r=new Promise(u=>{kt=u,setTimeout(()=>u(null),4e3)});ie.port.postMessage({type:"record",id:po,startFrame:a,endFrame:o,channels:1});for(const u of n){const d=new OscillatorNode(L,{frequency:2e3}),h=new GainNode(L,{gain:0});h.gain.setValueAtTime(.8,u),h.gain.setValueAtTime(0,u+.004),d.connect(h).connect(Ae),d.start(u),d.stop(u+.01)}const s=await r;kt=null,Ve=!1;const l=s?.[0],c=l?xl(l,n.map(u=>Math.round(u*t)-a),Math.round(.4*t)):null;c===null?B="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(x.roundTripMs=Math.round(c/t*1e4)/10,B=`Round trip ${x.roundTripMs} ms: takes are shifted by it.`,q()),Te(x.monitor)}async function jn(){if(await De(),L&&L.state!=="running"&&await L.resume().catch(()=>{}),X&&Et()){le=!le,it(!0),T(),le&&ze()?.out?.(nt(Re,ce));return}Et()?we.stop({at:oe()}):(le=!1,X&&ze()?.claim(nt(Re,ce)),we.play({at:oe()}))}let _a=j().running;we.onChange(()=>{const t=j().running&&!_a;t&&X&&(le=!Bl(Re,ce)),_a=j().running,j().running||(le=!1,R.kind!=="idle"&&(ie?.port.postMessage({type:"cancel"}),R={kind:"idle"})),V.clockChanged(t),it(),T()});ze()?.member?.(nt(Re,ce),Le);ze()?.onAll(()=>{le&&(le=!1,it(!0),T())});async function ea(t=x.selected){const e=x.takes.find(r=>r.id===t);if(!e){B="No take to save yet: record one, or Load an audio file.",T();return}const n=await he.load(e);if(!n){B=`${ge(e)} is not in this browser: nothing to save.`,T();return}const a=new Blob([mc(Ji(n,xe(e)),e.sampleRate)],{type:"audio/wav"}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=`lucy${ce>1?`-${ce}`:""}-take-${e.id}-${Math.round(e.bpm)}bpm-${e.created.slice(0,10)}.wav`,o.hidden=!0,document.body.append(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(o.href),1e4)}async function zc(t){if(!await De()||!L)return;let e;try{e=await L.decodeAudioData(await t.arrayBuffer())}catch{B=`Couldn't read ${t.name}: not an audio file this browser can decode.`,T();return}const n=j().bpm,a=Wl(e.length,e.sampleRate,n),o=[];for(let l=0;l<Math.min(2,e.numberOfChannels);l++){const c=new Float32Array(a.frames);c.set(e.getChannelData(l).subarray(0,a.frames)),o.push(c)}const r=x.nextId++,s={id:r,bars:a.bars,bpm:n,sampleRate:e.sampleRate,channels:o.length,frames:a.frames,created:new Date().toISOString(),saved:!1,source:"file"};ve.set(r,an(o)),s.saved=await he.save(r,o),B=`${t.name} is take ${r}: ${a.bars} bar${a.bars===1?"":"s"} at ${Math.round(n)} BPM${a.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,x.takes.push(s),x.selected=r,q(),await pe(r)}function Rc(){ln(!1),Et()&&(X?(le=!0,ze()?.out?.(nt(Re,ce))):we.stop({at:oe()})),Bn(),Q?.clear({fadeMs:20}),Te(!1)}function ho(t){x.master=Math.min(1,Math.max(0,t)),q(),Vt&&L&&Vt.gain.setTargetAtTime(x.master,L.currentTime,.01),Mt.value=String(x.master),ta.textContent=`${Math.round(x.master*100)}%`}async function Bc(t){const e=gc(x,t);ln(!1),Tt(),Object.assign(x,e),ve.clear(),B="",q(),!(Kt&&!await Kt)&&(Q?.setState(x.fx),ho(x.master),Te(x.monitor),await pe(x.selected))}function ln(t=!0){V.busy&&V.cancel(),R.kind!=="idle"&&(ie?.port.postMessage({type:"cancel"}),R={kind:"idle"},fe=null),G=null,t&&T()}const $t=new uc(x,t=>(ve.delete(t),he.remove(t)));async function mo(t=x.selected){if(t===null)return;const e=x.takes.find(a=>a.id===t),n=x.selected===t;!e||!$t.delete(t)||(U?.take===t&&Tt(),je?.take===t&&(je=null),q(),n?await pe(x.takes.at(-1)?.id??null):T(),dl({message:`Deleted ${ge(e)}`,actionLabel:"Undo",onAction:()=>{$t.undo(t)&&(q(),x.selected===t?pe(t):T())},onClose:a=>{a!=="action"&&$t.settle(t)}}))}function fo(t,e){const n=x.takes.find(a=>a.id===t);n&&(sc(n,e),q(),T())}function go(t,e,n){if(!n)return;const a=x.takes.find(o=>o.id===t);a&&(Kl(a,e)?a.region=void 0:a.region={start:e.start,end:e.end},q(),ae?.id===t&&it(),T())}function bo(t,e){const n=x.takes.find(a=>a.id===t);n&&(e==="beat"?n.snap=void 0:n.snap=e,q(),T())}async function yo(t){if(ae?.id===t&&Le()){await jn();return}(x.selected!==t||ae?.id!==t)&&await pe(t),Le()||await jn()}const _=(t,e={},...n)=>{const a=document.createElement(t);for(const[o,r]of Object.entries(e))a.setAttribute(o,r);return a.append(...n),a},wo=document.getElementById("app");wo.classList.add("nc","nc-page");hl();Al();const cn=_("header",{class:"nc-page-hd"},_("div",{},_("h1",{class:"nc-page-title"},_("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",_("span",{class:"nc-page-sep"},"/")," AUDIO ",_("span",{class:"nc-page-sep"},"/")," ",_("span",{class:"nc-mono"},String(ce).padStart(2,"0"))),_("p",{class:"nc-page-sub"},"A NetComposer element."))),Mt=_("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(x.master),"data-nc-id":"lucy-master"});Mt.addEventListener("input",()=>ho(Number(Mt.value)));const ta=_("span",{class:"nc-readout","data-nc-readout":""});ta.textContent=`${Math.round(x.master*100)}%`;const Qe=_("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});Qe.hidden=!0;Qe.addEventListener("change",()=>{const t=Qe.files?.[0];Qe.value="",t&&zc(t)});const xn=(t,e)=>{const n=_("button",{type:"button",class:"nc-page-action","data-lucy-action":t.toLowerCase()},t);return n.addEventListener("click",e),I(`action:${t.toLowerCase()}`,n,n),n};cn.append(_("div",{class:"nc-page-actions"},_("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},_("label",{class:"nc-label",for:"lucy-master"},"Master"),Mt,ta),xn("Save",()=>void ea()),xn("Load",()=>Qe.click()),xn("Panic",Rc),Qe));I("page:title",cn.querySelector(".nc-page-title"));I("master",cn.querySelector('label[for="lucy-master"]'),Mt);const na=_("div",{class:"nc-stack","data-nc-layout":"adjacent"});wo.append(cn,_("main",{class:"nc-page-body"},na));function vo(){const t=j(),e=V.phase;if(e.kind==="waiting")return"Waiting for Master…";if(e.kind==="recording"){const a=t.beatAt(oe());if(a<e.startBeat)return"Waiting for Master…";const o=Math.floor((a-e.startBeat)/4)+1;return`Recording Master bar ${Math.min(o,e.bars)} of ${e.bars}`}if(R.kind!=="idle"){const a=t.beatAt(oe());if(a<R.startBeat){const r=Math.ceil((R.startBeat-a)/4);return`Armed: recording in ${r} bar${r===1?"":"s"}`}const o=Math.floor((a-R.startBeat)/4)+1;return`Recording bar ${Math.min(o,x.bars)} of ${x.bars}`}if(!Et())return x.takes.length?"Stopped":We()==="master"?"Record to take the Master":"Arm to record a take";if(le)return"Sitting out";const n=ae?x.takes.find(a=>a.id===ae?.id):void 0;return n?`Playing ${ge(n)}`:"Playing (no take yet)"}function Dc(){const t=V.phase;return t.kind==="waiting"?"Armed":t.kind==="recording"?j().beatAt(oe())<t.startBeat?"Armed":"Recording":R.kind==="armed"?"Armed":R.kind==="recording"?"Recording":"Record"}function jc(){const t=R.kind!=="idle"||V.busy;return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:Le()?"Stop":"Play",on:Le(),onPress:()=>void jn()},{type:"button",id:"arm",label:Dc(),on:t,ariaLabel:t?"Cancel the take":We()==="master"?"Record the Master from the next bar line the music plays":"Record a take from the next bar",onPress:()=>void oo()},{type:"choice",id:"bars",label:"Length (bars)",value:String(x.bars),options:Ot.map(e=>({value:String(e),label:`${e} bar${e===1?"":"s"}`})),onChange:e=>{x.bars=Number(e),q(),T()}},{type:"readout",id:"status",label:"Status",value:vo()}]}}function Ua(){return ao()?[{type:"choice",id:"record-from",label:"Record from",value:We(),options:[{value:"mic",label:"Mic"},{value:"master",label:"Master"}],onChange:t=>ro(t==="master"?"master":"mic")}]:[]}function Wc(){return We()==="master"?{id:"input",title:"Input",controls:[...Ua(),{type:"note",id:"master-note",text:"Internal: no monitor, no nudge."},...B?[{type:"note",id:"notice",text:B}]:[]]}:{id:"input",title:"Input",controls:[...Ua(),Ie?{type:"readout",id:"source",label:"Input",value:`${sn===2?"Stereo":"Mono"} · ${Math.round((L?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void Jn()},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,Ut)},{type:"choice",id:"monitor",label:"Monitor",value:x.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:t=>Te(t==="on")},...io?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...B?[{type:"note",id:"notice",text:B}]:[],{type:"label",id:"timing-label",text:"Timing"},...qc().controls??[]]}}function Oc(){return{id:"takes",title:"Takes",summary:x.takes.length?`${x.takes.length} take${x.takes.length===1?"":"s"}`:"No takes",controls:[]}}const ve=new Map,$n=new Set;let Va=Promise.resolve();function Pc(t){ve.has(t.id)||$n.has(t.id)||($n.add(t.id),Va=Va.then(async()=>{const e=await he.load(t).catch(()=>null);$n.delete(t.id),!(!x.takes.includes(t)&&!$t.held.includes(t.id))&&(ve.set(t.id,e?an(e):null),Ft())}))}let G=null,Sn=!1;function ko(){const t=j(),e=V.phase;if(e.kind==="waiting")return"Waiting for Master…";if(e.kind==="recording"){const n=t.beatAt(oe());if(n<e.startBeat)return"Waiting for Master…";const a=Math.floor((n-e.startBeat)/Y)+1;return`Recording · bar ${Math.min(a,e.bars)} of ${e.bars}`}if(R.kind!=="idle"){const n=t.beatAt(oe());if(n<R.startBeat){const o=Math.ceil((R.startBeat-n)/Y);return`Armed · recording in ${o} bar${o===1?"":"s"}`}const a=Math.floor((n-R.startBeat)/Y)+1;return`Recording · bar ${Math.min(a,x.bars)} of ${x.bars}`}return""}function Hc(){const t=V.phase,e=_n();if(!L||!e)return;if(t.kind==="waiting"){G??={id:-1,source:"master",bars:x.bars,builder:new Xt(0)};return}if(t.kind!=="recording"||((!G||G.id!==t.id)&&(G={id:t.id,source:"master",bars:t.bars,builder:new Xt(t.to-t.from)}),Sn))return;const n=t.from+G.builder.frames,a=Math.min(t.to,Math.floor(L.currentTime*L.sampleRate)-2048);if(a-n<4096)return;Sn=!0;const o=G;e.take("master",n,a).then(r=>{r&&G===o&&(o.builder.add(r),Ft())}).catch(()=>{}).finally(()=>{Sn=!1})}function Gc(){if(!(R.kind!=="idle"||V.busy))return null;const e=G?.bars??x.bars,n=G?.builder;return{label:ko(),source:V.busy?"master":"mic",peaks:n&&n.totalFrames>0?n.peaks:null,filled:n?.filled??0,bars:Array.from({length:Math.max(0,e-1)},(a,o)=>(o+1)/e)}}function Yc(){const t=ot();for(const n of x.takes)Pc(n);const e=t.find(n=>n.instance===U?.to)??t[0];return{takes:[...x.takes].reverse(),selected:x.selected,playing:Le()&&ae?ae.id:null,peaks:n=>ve.get(n),canSend:t.length>0,sendName:t.length===1?t[0]?.name??"Sampler":"Sampler",picker:U&&e?{take:U.take,receivers:t,to:e.instance,target:U.target,sending:xt}:null,sendNote:je,live:Gc(),hint:We()==="master"?"Record takes the Master on the next bar.":"Record takes the mic on the next bar.",now:Date.now()}}const Lt=new xc({select:t=>void pe(t),play:t=>void yo(t),rename:fo,openSend:t=>lo(t),pickTo:t=>{const e=ot().find(n=>n.instance===t);e&&U&&(U={...U,to:e.instance,target:so(e)}),T()},pickTarget:t=>{U&&(U={...U,target:t}),T()},send:()=>void co(),cancelSend:()=>{xt||(Tt(),T())},download:t=>void ea(t),remove:t=>void mo(t),setRegion:go,setSnap:bo,cancelRecording:()=>ln()});function Ft(){Lt.render(Yc())}const aa=new Map;function Ka(t,e,n){const a=Number(Q?.getParam(e,n.key)??n.default),o=`hacks-${e}-${n.key}`;aa.set(o,`hack:${t}:${n.key}`);const r=s=>{Q?.setParam(e,n.key,s),T()};return n.options?{type:"select",id:o,label:n.label,value:String(a),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>r(Number(s))}:{type:"slider",id:o,label:n.label,min:n.min,max:n.max,step:n.step??.001,value:a,valueText:di(n,a,j().bpm),onChange:r}}function Ja(t,e){const n=Q?.getChain().find(r=>r.type===t)?.id??t,a=ke(t),o=a?.dials??[];return aa.set(`hacks-${t}`,`hack:${t}`),{type:"fx",id:`hacks-${t}`,title:a?.label??t,depth:e,on:Q?Q.getParam(n,"bypass")===!1:!1,onToggle:r=>{Q?.setParam(n,"bypass",!r),T()},controls:o.filter(r=>!r.more).map(r=>Ka(t,n,r)),more:o.filter(r=>r.more).map(r=>Ka(t,n,r))}}function Zc(){return{id:"hacks",title:"Hacks",controls:[Ja("eq",1),Ja("compressor",2)]}}function qc(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:x.roundTripMs===null?`${Math.round(Qn()*1e3)} ms (estimate)`:`${x.roundTripMs} ms`},{type:"button",id:"calibrate",label:Ve?"Listening…":"Calibrate",on:Ve,onPress:()=>void Ic()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:x.nudgeMs,valueText:`${x.nudgeMs>0?"+":""}${x.nudgeMs} ms`,onChange:t=>{x.nudgeMs=t,q(),T()}}]}}function xo(t,e){if(t.update(e),e.id==="takes"){const a=t.el.querySelector(".nc-module-body");a&&Lt.el.parentElement!==a&&a.append(Lt.el)}const n=[...e.controls??[],...(e.sections??[]).flatMap(a=>a.controls)];El(t.el,e.id,n,a=>aa.get(a)??a)}const ia=[jc,Wc,Oc,Zc].map(t=>({def:t,handle:wl(t())}));vl(na,ia.map(t=>t.handle),"adjacent");na.dataset.lucyLayout="";T();function T(){for(const t of ia)xo(t.handle,t.def());Ft()}function Xc(){const t=ia[1];t&&xo(t.handle,t.def())}let Qa="",ei="",ti=0;const _c=matchMedia("(prefers-reduced-motion: reduce)");let ni="",ai=0;function $o(t){if(t-ai>1e3){ai=t;const s=JSON.stringify(ot().map(l=>[l.instance,l.name,l.targets.map(c=>c.name)]));s!==ni&&(ni=s,T())}if(R.kind!=="idle"){const s=j();R.kind==="armed"&&s.beatAt(oe())>=R.startBeat&&(R={...R,kind:"recording"})}const e=vo(),n=ko();(e!==Qa||n!==ei)&&(Qa=e,ei=n,T()),V.busy&&Hc(),t-ti>3e4&&(ti=t,Ft());const a=uo(),o=a.id===null?void 0:x.takes.find(s=>s.id===a.id);let r=a.at;if(_c.matches&&o&&r>=0){const s=o.frames/o.sampleRate/at(o.bpm);r=Math.floor(r*s)/s}Lt.setPlayhead(Le()?a.id:null,r),requestAnimationFrame($o)}requestAnimationFrame($o);Ac.start();if(X)De().then(()=>pe(x.selected)),X.providePreset?.({format:Vn,version:_t,get:()=>fc(x),set:Bc});else{const t=()=>{De().then(()=>pe(x.selected))};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__lucy={state:x,clock:we,get ctx(){return L},get phase(){return R},get master(){return V.phase},pressRecord:()=>oo(),setSource:ro,receivers:ot,openSend:lo,cards:Lt,trash:$t,playheadAt:uo,get peaks(){return ve},get live(){return G},removeTake:mo,rename:fo,setRegion:go,setSnap:bo,playTake:yo,download:ea,get sendPick(){return U},set sendPick(t){U=t,T()},sendTake:co,get sendNote(){return je},get level(){return Ut},get fx(){return Q},roundTrip:Qn,toContext:Be,takeAudio:t=>{const e=x.takes.find(n=>n.id===t);return e?he.load(e):null},async testInput(t,e=1){if(!await De()||!L||!ie||!Ce)return;const n=t(L);n.connect(ie),n.connect(Ce),Ie=n,sn=e,T()}};
