(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Ge=1e-9;function Zo(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Xn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Zo(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+Ge&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=e.beat+Ge)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Ge){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ge;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Xn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+Ge)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+Ge)return n[a];return n[0]}}const _o=Object.freeze({beatsPerBar:4,beatUnit:4}),Ke=1e-9;function qo(t){return Math.floor(t+Ke)}function pi(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-Ke)*e;return n&&o<=t+Ke?o+e:o}class Ko{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Xn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??_o}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Ke&&(this.stopTime===null||e<this.stopTime-Ke)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Ke?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=qo(e/n),o=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return pi(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const hi="nc-clock/snapshot",mi=1;function Uo(t,e="local"){return{format:hi,version:mi,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Vo(t,e){const n=Jo(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const me=t=>typeof t=="number"&&Number.isFinite(t),wa=t=>t===null||me(t);function Jo(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==hi&&n("format"),(!me(e.version)||Math.floor(e.version)!==mi)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!me(e.anchor.beat)||!me(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&me(a.beat)&&me(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!me(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!me(e.meter.beatUnit))&&n("meter"),(!wa(e.startTime)||!wa(e.stopTime)||!me(e.stoppedBeat))&&n("transport times"),e}class Qo{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ko(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){Vo(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Uo(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const er="nc-sync/1",tr=1,nr="nc-sync",ar="nc-sync-leader",ir=0,fi=.5,gi=.75;function or(t){return typeof t=="number"&&Number.isFinite(t)&&t>=fi&&t<=gi?t:null}const mn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ot=t=>typeof t=="number"&&Number.isFinite(t),Lt=t=>typeof t=="string"&&t.length>0;function rr(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==tr||!Lt(e.type)||!Lt(e.from)||!ot(e.term)||!ot(e.seq)||!ot(e.sentAt))return null;switch(e.type){case"hello":return Lt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return ot(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&ot(e.slot)?e:null;case"ping":case"pong":return Lt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function sr(t,e,n,a,o){return{proto:er,from:e,term:n,seq:a,sentAt:o,...t}}function Z(){return(performance.timeOrigin+performance.now())/1e3}const fn=.003,lr=3,va=.002+1e-6,cr=.01,ka=500;class $a{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?cr:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=fn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(a&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let u=0;u<d.length;u++)l.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const u=this.offsets,c=this.preStep;c.length=0;for(let h=0;h<u.length;h++)c.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,d=e-n;for(let u=0;u<l.length;u++)l[u]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const s=e[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const o=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=fn&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<ka)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=fn)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<ka)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(lr,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let d=0;for(let u=0;u<n;u++)Math.abs(e[u]-e[l])<=va&&d++;d>r&&(o=l,r=d)}if(r<a)return;const s=e[o];for(let l=n-1;l>=0;l--)Math.abs(e[l]-s)>va&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class dr{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...mn,...e.capabilities},this.channelOption=e.channel??nr,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const a=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??pi(d,1),d);a&&a>0?(s.tempo.rampTempo(e,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,u),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(gi,Math.max(fi,e)):ir;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=or(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=rr(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...mn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...mn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ar,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(sr(e,this.id,this.term,++this.seq,this.o.now()))}}const ur="modulepreload",pr=function(t){return"/nyx/"+t},xa={},hr=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");o=s(n.map(u=>{if(u=pr(u),u in xa)return;xa[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":ur,c||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),c)return new Promise((m,b)=>{f.addEventListener("load",m),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var mr=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Mn=[.25,.5,.75,1,1.5,2],fr=4.9,W={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Oe={fmt:"wet"},de={fmt:"pct"},De={fmt:"db"},Et={fmt:"signedPct"},gn={fmt:"num",suffix:" ms"},B={div:100};function E(t,e,n,a,o,r,s,l){var d={key:t,label:e,min:n,max:a,default:o,step:1,k:r,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function Tt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var pt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[E("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[E("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.hpHz,astrid:!0,zero:"off"}),E("q","Resonance",0,100,0,2,{fmt:"q",law:W.hpQ},{dsp:{law:W.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[E("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:W.bpHz,astrid:!0},{dsp:{law:W.bpHz}}),E("q","Q",0,100,0,2,{fmt:"q",law:W.bpQ},{dsp:{law:W.bpQ}}),E("mix","Mix",0,100,100,3,Oe,{dsp:B,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[E("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Tt(mr),overriddenBy:"beats_free",tempoSynced:!0}),E("feedback","Feedback",0,90,35,2,de,{dsp:B,unit:"%"}),E("mix","Wet/dry",0,100,0,3,Oe,{dsp:B,unit:"%",astridKey:"wet"}),E("tone","Tone",0,100,100,4,{fmt:"hz",law:W.delayTone,offAt:100},{dsp:{div:99},more:!0}),E("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),E("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Tt([[0,"Insert"],[1,"Send"]]),more:!0}),E("send","Send",0,100,100,7,de,{dsp:B,unit:"%",more:!0}),E("mod_send","Accent → send",-100,100,0,8,Et,{dsp:B,unit:"%",more:!0}),E("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[E("predelay","Pre-delay",0,200,0,1,gn,{dsp:{div:1e3},unit:"ms"}),E("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:B,unit:"%"}),E("decay","Decay",0,100,50,3,de,{dsp:B,unit:"%"}),E("damping","Damping",0,100,0,4,de,{dsp:B,unit:"%"}),E("mix","Mix",0,100,0,5,Oe,{dsp:B,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[E("rate","Rate",0,100,26,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),E("depth","Depth",0,100,70,2,de,{dsp:B,unit:"%"}),E("feedback","Feedback",-90,90,50,3,Et,{dsp:B,unit:"%"}),E("mix","Mix",0,100,50,4,Oe,{dsp:B,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[E("rate","Rate",0,100,52,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),E("depth","Depth",0,100,50,2,de,{dsp:B,unit:"%"}),E("spread","Spread",0,100,70,3,de,{dsp:B,unit:"%"}),E("mix","Mix",0,100,40,4,Oe,{dsp:B,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[E("rate","Rate",0,100,39,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),E("depth","Depth",0,100,70,2,de,{dsp:B,unit:"%"}),E("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Tt([[4,"4"],[6,"6"],[8,"8"]])}),E("feedback","Feedback",0,90,30,4,de,{dsp:B,unit:"%"}),E("mix","Mix",0,100,50,5,Oe,{dsp:B,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[E("low_db","Low",-18,18,0,1,De,{unit:"dB"}),E("mid_db","Mid",-18,18,0,2,De,{unit:"dB"}),E("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:W.midHz,astrid:!0},{dsp:{law:W.midHz}}),E("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:W.eqQ},{dsp:{law:W.eqQ}}),E("high_db","High",-18,18,0,4,De,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[E("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),E("output_db","Output",-12,12,0,2,De,{unit:"dB"}),E("mix","Mix",0,100,100,3,Oe,{dsp:B,unit:"%"}),E("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Tt([[0,"Smooth"],[1,"Acid"]]),more:!0}),E("tone","Tone",0,100,100,5,{fmt:"hz",law:W.driveTone,offAt:100},{dsp:{div:99},more:!0}),E("mod_drive","Accent → drive",-100,100,0,6,Et,{dsp:B,unit:"%",more:!0}),E("mod_tone","Accent → tone",-100,100,0,7,Et,{dsp:B,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[E("threshold_db","Threshold",-60,0,0,1,De,{unit:"dB"}),E("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:W.ratio},{dsp:{law:W.ratio}}),E("attack_ms","Attack",1,100,10,3,gn,{unit:"ms"}),E("release_ms","Release",10,1e3,150,4,gn,{unit:"ms"}),E("makeup_db","Makeup",0,24,0,5,De,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[E("width","Width",0,200,100,1,de,{dsp:B,unit:"%"}),E("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:B})]}],gr=pt.map(function(t){return t.type});pt.filter(function(t){return!t.hidden}).map(function(t){return t.type});var br={reverb:"plate"};function Zn(t){var e=br[t]||t;return gr.indexOf(e)>=0?e:null}function Se(t){for(var e=Zn(t),n=0;n<pt.length;n++)if(pt[n].type===e)return pt[n];return null}function qe(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function bi(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=qe(n.law,e);return a===null?0:a}function Sa(t,e){return Math.min(fr,t*60/(e>0?e:120))}var Aa=function(t){return t>0?"+":t<0?"−":""};function yr(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function yi(t,e,n){var a=t.format,o;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:Aa(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Aa(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(o=qe(a.law,e),o===null?a.zero||"open":a.astrid?yr(o):o+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+qe(a.law,e).toFixed(1);case"ratio":return qe(a.law,e).toFixed(1)+":1";case"rate":return o=qe(a.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(Sa(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Sa(e,n)*1e3)+" ms"}return String(e)}var wr=1,nn=["drive","delay","plate"];function vr(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,o){return yi(t,a,o)},e}var ht=nn.map(function(t){var e=Se(t),n={type:t,label:e.label,dials:e.dials.map(vr)};return e.tempoSynced&&(n.tempoSynced=!0),n}),kr={reverb:"plate"};function Dt(t){var e=kr[t]||t;return nn.indexOf(e)>=0?e:null}function an(t){for(var e=Dt(t),n=0;n<ht.length;n++)if(ht[n].type===e)return ht[n];return null}function wi(t,e){var n=an(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Ue(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Ie(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(a-e)&&(a=t.options[o].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function $r(){return{v:wr,chain:ht.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function xr(t){return Mn.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Mn[0])}function bn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Sr(t){for(var e=Array.isArray(t)?t:bn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=$r(),o={},r=[],s=0;s<e.length;s++){var l=e[s];if(bn(l)){var d=Dt(l.type);if(!d){typeof l.type=="string"&&r.push(l.type);continue}if(o[d]){r.push(d);continue}o[d]=!0;var u=a.chain[nn.indexOf(d)],c=bn(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,an(d).dials.forEach(function(h){u.dials[h.key]=Ie(h,c[h.key])}),Ar(d,u.dials,c)}}return{state:a,dropped:r}}function Ar(t,e,n){for(var a=an(t),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(e[r.key]=Ie(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Ue(r,e)))}}function Ln(t){return Sr(t).state}function Mr(t){return JSON.parse(JSON.stringify(t))}var Lr=24,En={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Tn(t,e,n){if(e==="bypass")return n?0:1;var a=wi(t,e)||Er(t,e);return a?bi(a,n):0}function Er(t,e){var n=Se(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Tr={};ht.forEach(function(t){t.dials.forEach(function(e){Tr[t.type+"."+e.key]=e.format})});function yn(t,e){var n=new Float64Array(Lr),a=Ln(t);return a.chain.forEach(function(o){var r=En[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=Tn(o.type,s,o.dials[s])})}),n}var Cr=2,Yt=3,Nr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function rt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function vi(t,e){var n=Se(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function Ir(t){var e=Se(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Rr(t,e,n){var a=t.length-1,o=Math.max(0,Math.min(a,n));if(e<0||e>a||e===o)return t;var r=t.slice(),s=r.splice(e,1)[0];return r.splice(o,0,s),r}function zr(t){return typeof t=="number"&&isFinite(t)?xr(t):t}function Ma(t,e,n){var a={};return t.dials.forEach(function(o){var r=e[o.key];r===void 0&&o.astridKey&&(r=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(r=zr(r)),a[o.key]=Ie(o,r)}),t.dials.forEach(function(o){o.stepWhen&&(a[o.key]=Ie(o,typeof e[o.key]=="number"?e[o.key]:a[o.key],Ue(o,a)))}),a}function Pr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,o=1/0,r=t.min;r<=t.max;r++){var s=qe(n.law,r),l=s===null?1/0:Math.abs(s-e);l<o&&(o=l,a=r)}return a}}var Br={rate:"rate_hz"};function Or(t,e,n,a){var o={};return t.dials.forEach(function(r){if(!r.more){var s=r.astridKey||Br[r.key]||r.key;o[r.key]=Pr(r,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function Wr(t,e){var n=e>0?Math.floor(e):Yt,a=[],o=[],r=[],s=!1,l=!1;Array.isArray(t)?(r=t,l=!0):rt(t)&&Array.isArray(t.chain)&&(r=t.chain,s=t.v===1,l=t.schema===2);for(var d=[],u=0;u<r.length;u++){var c=r[u];if(rt(c)&&!(c.type==="limiter"||c.fixed===!0)){var h=Zn(c.type),f=h&&Se(h);if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof c.type=="string"&&a.push(c.type);continue}if(d.length>=n){a.push(c.id||h);continue}var m;rt(c.params)&&!rt(c.dials)?m=Ma(f,Or(f,c.params,o,c.id||h),l):m=Ma(f,rt(c.dials)?c.dials:{},l);var b=vi(h,d),y=typeof c.id=="string"&&Nr.test(c.id)&&!d.some(function(g){return g.id===c.id})?c.id:b.id,p=s?c.bypass!==!1:c.bypass===!0;d.push({id:s?b.id:y,type:h,bypass:p,dials:m})}}return{state:{v:Cr,chain:d},dropped:a,notes:o}}function zt(t,e){return Wr(t,e).state}function Ye(t){var e=Se(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,bi(a,t.dials[a.key])])}),n}function Fr(t){var e=zt(t,8),n=[],a=e.chain.map(function(o,r){var s=Se(o.type),l={};return r>=Yt&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=o.dials[d.key];if(d.more){u!==d.default&&n.push(o.id+"."+d.key);return}d.key==="delay_beats"&&Mn.indexOf(u)<0&&n.push(o.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var jr="nc-fx@1",Hr=600,Gr=256,Dr=8,st=typeof WeakMap=="function"?new WeakMap:null;function Yr(t,e){var n=st&&st.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await hr(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),st&&(st.set(t,n),n.catch(function(){st.delete(t)})),n)}function Xe(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ki(t,e,n,a){var o=Math.min(400,Math.max(20,Xe(e.bpm,120))),r=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",d=Xe(e.preGain,1),u=Math.max(0,Xe(e.crossfade,.012)),c=Xe(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),m=t.createGain(),b=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,h.connect(m),m.connect(f),b.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o},g=n(o);p.post=function(k){p.node?p.node.port.postMessage(k):p.disposed||(r.length>=Gr&&(r=a().concat([{t:"tempo",bpm:p.bpm,when:0}])),r.push(k))};function w(k){var A=r.map(function(x){var L=Object.assign({},x);return L.when>k||(L.when=0,L.t!=="clear"&&(L.snap=!0)),L});return r=[],A}p.emit=function(k){for(var A=0;A<p.listeners.length;A++)try{p.listeners[A](k)}catch(x){typeof console<"u"&&console.error(x)}},p.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;p.tooFar=function(k){return typeof k=="number"&&k>t.currentTime+Hr?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var M=Yr(t,e.moduleUrl).then(function(){if(!p.disposed){var k=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},g);k.pending=w(t.currentTime),p.node=new AudioWorkletNode(t,jr,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(b);var A=t.currentTime;A<=0||u===0?(m.gain.value=0,b.gain.value=1):(m.gain.setValueAtTime(1,A),m.gain.linearRampToValueAtTime(0,A+u),b.gain.setValueAtTime(0,A),b.gain.linearRampToValueAtTime(1,A+u)),p.status="ready"}},function(k){p.status="unavailable",r=[],p.error=k});return p.core={input:h,output:f,modInput:y,ready:M,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(k,A){var x=Xe(k,NaN);!(x>0)||p.disposed||p.tooFar(A)||(p.bpm=Math.min(400,Math.max(20,x)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(A)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(k){var A=k&&typeof k=="object"?k:{at:k};if(!(p.disposed||p.tooFar(A.at))){var x=Xe(A.fadeMs,0);p.post({t:"clear",when:p.whenOf(A.at),fadeMs:x>0?Math.min(1e3,x):0})}},onChange:function(k){return p.listeners.push(k),function(){var A=p.listeners.indexOf(k);A>=0&&p.listeners.splice(A,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,m,b,f,y].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},p}function Xr(t,e){var n=e||{};if(n.slots)return Zr(t,n);var a=Ln(n.state),o=Array.from(yn(a)),r=ki(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(yn(a)),when:0}]}),s=r.core;function l(d){return a.chain[nn.indexOf(d)]}return s.setParam=function(d,u,c,h){var f=Dt(d);if(!(!f||r.disposed||r.tooFar(h))){var m=l(f),b;if(u==="bypass")b=!!c;else{var y=wi(f,u);if(!y)return;b=Ie(y,c,Ue(y,m.dials))}return u==="bypass"?m.bypass=b:m.dials[u]=b,r.post({t:"p",i:En[f][u],v:Tn(f,u,b),when:r.whenOf(h)}),r.emit({effect:f,key:u,value:b}),an(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===u}))){var g=m.dials[p.key],w=Ie(p,g,Ue(p,m.dials));w!==g&&(m.dials[p.key]=w,r.post({t:"p",i:En[f][p.key],v:Tn(f,p.key,w),when:r.whenOf(h)}),r.emit({effect:f,key:p.key,value:w}))}}),b}},s.getParam=function(d,u){var c=Dt(d);if(c){var h=l(c);return u==="bypass"?h.bypass:h.dials[u]}},s.getState=function(){return Mr(a)},s.setState=function(d,u){r.disposed||r.tooFar(u&&u.at)||(a=Ln(d),r.post({t:"load",program:Array.from(yn(a)),when:r.whenOf(u&&u.at)}),r.emit({effect:null,key:null,value:null}))},s}function Zr(t,e){var n=e.slots===!0?Yt:Math.max(1,Math.min(Dr,Math.floor(+e.slots)||Yt)),a=zt(e.state,n),o=1,r={};function s(p){return r[p.id]||(r[p.id]=o++),r[p.id]}function l(p){return p.map(function(g){return{uid:s(g),type:g.type,program:Ye(g)}})}var d=l(a.chain),u=a.chain.map(function(p){return r[p.id]}),c=ki(t,e,function(){return{slots:n,chain:d,order:u}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return r[p.id]}),when:0}]}),h=c.core;function f(p){var g;for(g=0;g<a.chain.length;g++)if(a.chain[g].id===p)return a.chain[g];var w=Zn(p);if(w){for(g=0;g<a.chain.length;g++)if(a.chain[g].type===w)return a.chain[g]}return null}function m(p,g){var w=s(p);c.post({t:"add",uid:w,type:p.type,when:g}),Ye(p).forEach(function(v){c.post({t:"ps",uid:w,k:v[0],v:v[1],when:g,snap:!0})})}function b(p){c.post({t:"order",uids:a.chain.map(function(g){return r[g.id]}),when:p})}function y(p,g){var w={};a.chain.forEach(function(k){w[k.id]=k});var v=a.chain.map(function(k){return r[k.id]}).join();p.chain.forEach(function(k){var A=w[k.id];if(!A||A.type!==k.type){delete r[k.id],m(k,g);return}var x={};Ye(A).forEach(function(L){x[L[0]]=L[1]}),Ye(k).forEach(function(L){x[L[0]]!==L[1]&&c.post({t:"ps",uid:r[k.id],k:L[0],v:L[1],when:g})})});var M={};p.chain.forEach(function(k){M[k.id]=!0}),Object.keys(r).forEach(function(k){M[k]||delete r[k]}),a=p,a.chain.map(function(k){return r[k.id]}).join()!==v&&b(g)}return h.slots=n,h.setParam=function(p,g,w,v){var M=f(p);if(!(!M||c.disposed||c.tooFar(v))){var k=Se(M.type),A,x=null;if(g==="bypass")A=!!w;else{for(var L=0;L<k.dials.length;L++)k.dials[L].key===g&&(x=k.dials[L]);if(!x)return;A=Ie(x,w,Ue(x,M.dials))}var R={},H={};Ye(M).forEach(function(N){R[N[0]]=N[1]}),k.dials.forEach(function(N){N.stepWhen&&(H[N.key]=M.dials[N.key])}),g==="bypass"?M.bypass=A:M.dials[g]=A,k.dials.forEach(function(N){N.stepWhen&&(M.dials[N.key]=Ie(N,M.dials[N.key],Ue(N,M.dials)))});var Q=c.whenOf(v),re=r[M.id];return Ye(M).forEach(function(N){(R[N[0]]!==N[1]||x&&N[0]===x.k)&&c.post({t:"ps",uid:re,k:N[0],v:N[1],when:Q})}),c.emit({effect:M.id,key:g,value:A}),Object.keys(H).forEach(function(N){N!==g&&M.dials[N]!==H[N]&&c.emit({effect:M.id,key:N,value:M.dials[N]})}),A}},h.getParam=function(p,g){var w=f(p);if(w)return g==="bypass"?w.bypass:w.dials[g]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,g){c.disposed||c.tooFar(g&&g.at)||(y(zt(p,n),c.whenOf(g&&g.at)),c.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,g){var w=g||{},v=vi(p,a.chain);if(!(!v||a.chain.length>=n||c.disposed||c.tooFar(w.at))){if(w.dials){var M=zt({v:2,chain:[{id:v.id,type:v.type,dials:w.dials}]},1).chain[0];v.dials=M.dials}w.bypass===!0&&(v.bypass=!0);var k=a.chain.slice(),A=typeof w.index=="number"?Math.max(0,Math.min(k.length,w.index)):k.length;return k.splice(A,0,v),y({v:2,chain:k},c.whenOf(w.at)),c.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,g){var w=f(p),v=g&&g.at;return!w||c.disposed||c.tooFar(v)?!1:(y({v:2,chain:a.chain.filter(function(M){return M!==w})},c.whenOf(v)),c.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,g,w){var v=f(p),M=w&&w.at;if(!v||c.disposed||c.tooFar(M))return!1;var k=Rr(a.chain,a.chain.indexOf(v),g);return k===a.chain?!1:(y({v:2,chain:k},c.whenOf(M)),c.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:Ir(p),bypass:p.bypass}})},h.toAstrid=function(){return Fr(a)},h}function La(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function _r(t,e,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(f){return o.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,d=l&&l.tempo?l.tempo:l,u=!1;function c(f){if(!r){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var m=r(l.timeAt(f));return typeof m=="number"&&isFinite(m)?m:void 0}}function h(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var m=l&&typeof l.bpm=="number"?l.bpm:La(d,0);m>0&&t.setTempo(m);return}var b=La(d,f);b>0&&t.setTempo(b);for(var y=d&&(d.points||d.tempoPoints)||[],p=0;p<y.length;p++){var g=y[p];if(g.beat>f&&g.bpm>0){var w=c(g.beat);w!==void 0&&t.setTempo(g.bpm,w)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,c(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&h())})}const qr="/nyx/assets/worklet-CnpUVY5i.js";var Kr="nc-ui",$i={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Cn={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},Te={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ct=t=>`--${Kr}-${t}`,Nn=$i["label-on-fill-dark"],Ea=$i["label-on-fill-light"],Ur=Te["label-min-contrast"],Vr=/^#[0-9a-f]{6}$/i,Jr=t=>typeof t=="string"&&Vr.test(t),Pt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Ta(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Pt(o(0)*255)}${Pt(o(8)*255)}${Pt(o(4)*255)}`}function xi(t){let[e,n,a]=[1,3,5].map(u=>parseInt(t.slice(u,u+2),16)/255),o=Math.max(e,n,a),r=Math.min(e,n,a),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-a)/l%6):o===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:s}}function Ca(t){let[e,n,a]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function In(t,e){let[n,a]=[Ca(t),Ca(e)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var Xt=t=>In(t,Nn)>=In(t,Ea)?Nn:Ea;function Si(t,e,n,a=Ur){let o=Ta(t,e,n),r=Xt(o)===Nn?1:-1;for(let s=0;s<40&&In(o,Xt(o))<a;s++)n+=r*.01,o=Ta(t,e,n);return o}function Qr(t){let{h:e,s:n}=xi(t),a=Si(e,Math.min(n,Te["surprise-on-max-saturation"]),Te["surprise-on-lightness"]);return{fill:t,ink:Xt(t),on:a,onInk:Xt(a)}}var es=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function ts(t,e=Math.random){let[n,a]=Te["surprise-saturation"],[o,r]=Te["surprise-lightness"],s=Te["surprise-min-hue-gap"],l=Jr(t)?xi(t).h:null,d=e()*360;return l!==null&&es(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),Si(d,n+e()*(a-n),o+e()*(r-o))}function ns(t){if(!t)return null;let e=Qr(t);return{[ct("surprise-fill")]:e.fill,[ct("surprise-ink")]:e.ink,[ct("surprise-on")]:e.on,[ct("surprise-on-ink")]:e.onInk}}var as=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,is=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Na(t){let[e,n,a]=[1,3,5].map(l=>as(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function os([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(s=>Pt(is(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var rs=Te["velocity-range"],Ai={min:Cn.rhythm["velocity-min"],max:Cn.rhythm["velocity-max"]};function ss(t,e=Ai){let[n,a]=rs,o=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(o-n)/(a-n),s=Cn.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=Na(e.min),d=Na(e.max);return{velocity:o,t:r,fill:os(l.map((u,c)=>u+(d[c]-u)*r)),ink:s}}function Ia(t,e=Ai){return{[ct("velocity-fill")]:ss(t,e).fill}}var ls={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},cs={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ds={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},us={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},on={};for(let[t,e]of Object.entries(cs))on[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(us))on[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(ds))on[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(ls.renames.map(t=>[t.old,t.new]));function Mi(t){let e=on[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function G(t){return Mi(t).prop}function i(t){return`var(${G(t)})`}function ps(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(G(e)));return Number.isFinite(n)?n:0}function q(t,e){let n=Mi(e),a=t.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function hs(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function ms(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var fs="[data-modulated], [data-modulated] *";function gs(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${G("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${G("divider")}: ${i(`module-div-stack-${a}`)};
      ${G("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${G("text-sub")}: ${i("module-sub-stack-1")};
      ${G("divider")}: ${i("module-div-stack-1")};
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
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name,
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
${fs} { transition: none; }
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
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0; }
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
  grid-template-columns: minmax(0, 1fr) auto auto;
  grid-template-areas: "strips fx master";
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
  ${G("text-sub")}: ${i("module-sub-stack-1")};
  ${G("divider")}: ${i("module-div-stack-1")};
  ${G("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${i("fx-card-width")});
  align-items: stretch;
  padding-top: 0;
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${G("text-sub")}: ${i("module-sub-stack-1")};
  ${G("divider")}: ${i("module-div-stack-1")};
  ${G("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${G("text-sub")}: inherit;
  ${G("divider")}: inherit;
  ${G("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${i("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${i("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${i("module-bg-adjacent-4")}; }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${i("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${i("module-gap")}; }
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
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
  border: ${i("hairline")} solid ${i("strip-hacks-text")};
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
.nc-hacks:hover { color: ${i("text")}; }
.nc-hacks[aria-pressed="true"] {
  background: ${i("fader-cap-master")};
  border-color: ${i("fader-cap-master")};
  color: ${i("surface-page")};
}
.nc-hacks:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${i("module-gap")}; }
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
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "strips master" "fx fx";
  }
}
@media (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 768px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: minmax(0, 1fr); }
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
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}var wn=null,bs="nc-ui-fallback";function Li(t=globalThis.document){if(!t?.documentElement||(t.documentElement,wn&&wn.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${bs} {
${gs()}
}
`,t.head.append(e),wn=e}var lt=null,ys=0,ws=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Ei=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=ws,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Ei(document);function Ti({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:o=!1,root:r,returnFocus:s,signal:l}){if(lt||l?.aborted)return Promise.resolve(!1);let d=r?.ownerDocument??document,u=Ei(d),c=r??d.body,h=d.defaultView??globalThis,f=`nc-ui-confirm-${++ys}`,m=(I,j,ne)=>{let Ae=d.createElement(I);return Ae.className=`nc-ui-confirm${j}`,ne!=null&&(Ae.textContent=ne),Ae},b=m("div","-layer");b.dataset.state="enter";let y=m("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${f}-t`),y.setAttribute("aria-describedby",`${f}-b`);let p=m("h2","-title",t);p.id=`${f}-t`;let g=m("p","-body",e);g.id=`${f}-b`;let w=m("div","-actions"),v=(I,j)=>{let ne=m("button","-btn",I);return ne.type="button",ne.dataset.ncConfirm=j,ne.addEventListener("click",()=>pe(j==="ok")),ne},M=v(a,"cancel"),k=v(n,"ok");o&&(k.dataset.danger="true"),w.append(M,k),y.append(p,g,w),b.append(y);let A={layer:b};lt=A;let x=s??d.activeElement,L=[];for(let I of c.children)I.hasAttribute("inert")||(I.setAttribute("inert",""),L.push(I));let R=()=>{if(lt!==A)return;c.append(b),M.focus({preventScroll:!0});let I=h.requestAnimationFrame?.bind(h)??(j=>setTimeout(j,16));I(()=>I(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};u?u.then(R):R();let H=!1;b.addEventListener("pointerdown",I=>{H=I.target===b}),b.addEventListener("click",I=>{I.target===b&&H&&pe(!1),H=!1});let Q=I=>{I.stopImmediatePropagation(),I.key==="Escape"?(I.preventDefault(),pe(!1)):I.key==="Tab"?(I.preventDefault(),(d.activeElement===M?k:M).focus()):I.key==="Enter"&&(I.preventDefault(),d.activeElement===k?pe(!0):d.activeElement===M&&pe(!1))},re=I=>I.stopImmediatePropagation();h.addEventListener("keydown",Q,!0),h.addEventListener("keyup",re,!0);let N=()=>pe(!1);l?.addEventListener("abort",N);let Be,Mt=new Promise(I=>{Be=I});function pe(I){if(lt!==A)return;lt=null,h.removeEventListener("keydown",Q,!0),h.removeEventListener("keyup",re,!0),l?.removeEventListener("abort",N);for(let he of L)he.removeAttribute("inert");b.dataset.state="closing",x?.isConnected&&typeof x.focus=="function"&&x.focus({preventScroll:!0});let j=h.getComputedStyle?.(b),ne=Math.max(0,...String(j?.transitionDuration??"").split(",").map(he=>Number.parseFloat(he)*(he.trim().endsWith("ms")?1:1e3)||0)),Ae=()=>b.remove();b.addEventListener("transitionend",he=>he.target===b&&Ae()),setTimeout(Ae,ne+50),Be(I)}return Mt}function Ci(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(o,r),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let d=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ni=new WeakMap,Ra=.25;function vs(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,s=t.step??.005,l=t.onChange,d=t.onReset,u=p=>Math.min(1,Math.max(0,p)),c=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{let g=u(p);g!==r&&(r=g,c(),l?.(g))},f=0,m=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();p.target!==o&&g.height>0&&h(1-(p.clientY-g.top)/g.height),f=p.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!m)return;let g=n.getBoundingClientRect().height||1,w=(f-p.clientY)/g*(p.shiftKey?Ra:1);f=p.clientY,h(r+w)});let b=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),n.addEventListener("keydown",p=>{let g=p.shiftKey?s*Ra:s,w={ArrowUp:r+g,ArrowRight:r+g,ArrowDown:r-g,ArrowLeft:r-g,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});let y={el:n,get value(){return r},get dragging(){return m},set(p){m||(r=u(Number(p)||0),c())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(d=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),Ni.set(n,y),y}function ks(t){return Ni.get(t)}var Ii=new WeakMap,$s=.2,xs=1.5,Ss=.5;function As(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function za(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:As(a.getComputedStyle(t).getPropertyValue(G(e)),n)}function Ms(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let g=e.createElement("span");g.className="nc-meter-peak";let w=e.createElement("span");w.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",p.append(g,w,v),r.append(p),s.push({peak:g,rms:w,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=t.label,d=t.onClear,u=!1,c=-1,h=-1,f=()=>{o.dataset.lit=u?"true":"false",o.setAttribute("aria-pressed",u?"true":"false"),o.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),o.title=u?"Clipped. Click to clear":"Clip light"},m=(y,p,g,w)=>{let v=Math.round(w*1e3)/1e3;g[p]!==v&&(g[p]=v,y.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{b.clear(),d?.()});let b={el:a,get clipped(){return u},update(y,p){c<0&&(c=za(a,"motion-meter-fall",$s)),h<0&&(h=za(a,"motion-meter-hold",xs));let g=Math.max(0,Math.min(.25,Number(p)||0)),w=c>0?Math.exp(-g/c):0;s.forEach((v,M)=>{let k=y[M]??y[0]??{peak:0,rms:0},A=Math.min(1,Math.max(0,Number(k.peak)||0)),x=Math.min(A,Math.max(0,Number(k.rms)||0));k.over&&b.clip(),v.level.peak=A>=v.level.peak?A:A+(v.level.peak-A)*w,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*w,v.holdAge+=g,A>=v.holdAt?(v.holdAt=A,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(A,v.holdAt-Ss*g)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(d=y.onClear)}};return f(),b.reset(),Ii.set(a,b),b}function Ls(t){return t?Ii.get(t):void 0}function Es(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function Me(t){return Math.max(0,Math.min(1,t))}function Ri(t,e){let{ctx:n,w:a,h:o}=Es(t);if(!n)return;n.clearRect(0,0,a,o);let r=ms(t);if(e.paint==="swatch"){let d=q(t,"accent"),u=q(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,a/2,o),n.fillStyle=u,n.fillRect(a/2,0,a/2,o);return}if(e.paint==="filter"){let d=e.mode??"lp",u=q(t,hs(d)),c=q(t,"divider"),h=Me(e.cutoff??.5),f=.08+(1-Me(e.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let b=m/Math.max(1,a),y=0;d==="lp"?y=b<h?1:Math.max(0,1-(b-h)/f):d==="hp"?y=b>h?1:Math.max(0,1-(h-b)/f):y=Math.max(0,1-Math.abs(b-h)/f);let p=o*.78-y*o*.62;m===0?n.moveTo(m,p):n.lineTo(m,p)}n.strokeStyle=u,n.stroke(),n.fillStyle=q(t,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,o),t.dataset.ncAccent=u;return}if(e.paint==="envelope"){n.strokeStyle=q(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let u=0;u<=a;u++){let c=u/Math.max(1,a),h=(o-4)*(1-Math.exp(-c*4/d));n.lineTo(u,o-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let d=Array.isArray(e.peaks)?e.peaks:[],[u,c]=Array.isArray(e.region)?e.region:[0,1],h=q(t,"accent"),f=q(t,"text-sub"),m=o/2;n.fillStyle=q(t,"accent-soft"),n.fillRect(Me(u)*a,0,(Me(c)-Me(u))*a,o),n.strokeStyle=q(t,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let b=Math.floor(d.length/2);for(let y=0;y<b;y++){let p=(y+.5)/b*a,g=Math.max(-1,Math.min(1,d[y*2]??0)),w=Math.max(-1,Math.min(1,d[y*2+1]??0)),v=(y+.5)/b;n.strokeStyle=v>=u&&v<=c?h:f,n.beginPath(),n.moveTo(p,m-w*(m-1)),n.lineTo(p,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[u,c,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round(Me(y)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=q(t,"text"),n.fillRect(Math.round(Me(e.position)*(a-1)),0,1,o)),b||(n.fillStyle=f,n.font=r,n.fillText(e.empty??"Empty",0,m+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let d=Me(e.level??0);n.fillStyle=q(t,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=q(t,"accent"),n.fillRect(0,o*.4,a*d,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=q(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=q(t,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),t.dataset.ncAccent=q(t,"accent")}var zi={slop:8,longPressMs:500,pitchPx:16},Ts=class{constructor(t,e,n=zi){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Cs(t,e,n,a=zi){let o=!1,r=0,s=(u,c)=>{let h=t.ownerDocument.elementFromPoint?.(u,c),f=[...t.querySelectorAll(e)],m=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(m>=0)return m;let b=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,g)=>{if(p.hidden)return;let w=p.getBoundingClientRect();if(c<w.top||c>w.bottom)return;let v=Math.abs(u-(w.left+w.width/2));v<y&&v<=w.width&&(b=g,y=v)}),b},l=new Ts(s,u=>{(u.kind==="paint"||u.kind==="long")&&(o=!0),n(u)},a),d=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",u=>{u.button>0||(o=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),t.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),t.addEventListener("click",u=>{o&&(o=!1,u.stopPropagation(),u.preventDefault())},!0),t.addEventListener("contextmenu",u=>u.preventDefault()),l}var Pi="netcomposer.groups.v1";function _n(){try{return globalThis.localStorage??null}catch{return null}}function Bi(t=_n(),e=Pi){try{let n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function Ns(t,e,n,a=Pi){let o=Bi(t,a);o.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function Is(t,e=_n()){return Bi(e).get(t.id)??t.open===!0}function Rs(t,e,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${t.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${t.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",d.id);for(let u of t.controls)d.append(n(u,e));return o.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";Ns(_n(),t.id,u),Pa(a,u);let c=e(a);c?.type==="group"&&c.onToggle?.(u)}),a.append(o,d),Pa(a,Is(t)),Oi(a,t),a}function Pa(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function Oi(t,e){let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=e.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var Ct="application/x-nc-pad",Ba="http://www.w3.org/2000/svg";function zs(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*e/n),l=Math.max(s+1,Math.floor((r+1)*e/n)),d=0,u=0;for(let h=s;h<l;h++)d=Math.min(d,t[2*h]??0),u=Math.max(u,t[2*h+1]??0);let c=n===1?50:r/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),o.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Ps(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,r)=>a.append(Bs(n,r,e))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Bt(n)}),Fi(n,t),n}function Bs(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Ba,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(Ba,"path");return d.append(u),a.append(o,r,s,l,d),Ws(t,a,e,n),r.addEventListener("dblclick",()=>{let c=n(t);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Wi(t,a,e,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Ct,String(e)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let h=c.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(Ct)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=h.includes(Ct)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let f=c.dataTransfer?.getData(Ct);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();let b=Number(f);b!==e&&h.onMove?.(b,e,c.altKey);return}let m=c.dataTransfer?.files?.[0];m&&(c.preventDefault(),c.stopPropagation(),h.onFile?.(e,m))}),a}function Os(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Ws(t,e,n,a){let o=0,r=!1,s=0,l=0,d=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",u=>{if(u.button!==0)return;r=!1,s=u.clientX,l=u.clientY,d();let c=a(t);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=Oa(t,e,n,a)},450)))}),e.addEventListener("pointermove",u=>{o&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])e.addEventListener(u,d);e.addEventListener("contextmenu",u=>{u.preventDefault(),d(),r=Oa(t,e,n,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}Os(t,n,a)})}function Oa(t,e,n,a){let o=a(t);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;Bt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Bt(t)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let c of r){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=c.id,h.textContent=c.label,h.addEventListener("click",()=>{Bt(t);let f=a(t);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?Wi(t,e,n,a):f.onMenu?.(n,c.id))}),l.append(h)}t.append(s,l);let d=t.getBoundingClientRect(),u=e.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function Wi(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(t);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let h=r.value.trim();r.remove(),e.focus();let f=a(t);c&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};r.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),r.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])r.addEventListener(c,h=>h.stopPropagation());t.append(r),r.focus(),r.select()}function Bt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Fi(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),d=r.querySelector(".nc-padgrid-pad-wave path"),u=r.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),d?.setAttribute("d",zs(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let c=e.selected===o;c?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",c?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function J(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function rn(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function Wa(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function gt(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Fs=450,Fa=8;function be(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function js(t){let e=ps(t,"target-min");return e>0?e:44}function Hs(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=js(t),a=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-a,h=d+a,f=u-a,m=u+a;for(let b=0;b<e.length;b++){if(r===b)continue;let y=o[b];if(!y||y.width===0)continue;let p=y.left+y.width/2,g=y.top+y.height/2;Math.abs(g-u)<a*2&&(p>d?h=Math.min(h,(d+p)/2):p<d&&(c=Math.max(c,(d+p)/2))),Math.abs(p-d)<a*2&&(g>u?m=Math.min(m,(u+g)/2):g<u&&(f=Math.max(f,(u+g)/2)))}c=Math.min(c,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),m=Math.max(m,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,h-c)}px`,s.style.height=`${Math.max(0,m-f)}px`,s.style.transform="none"}}function ji(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ja(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function bt(t,e){switch(t.type){case"slider":return Gs(t,e);case"select":return Ys(t,e);case"toggle":return Xs(t,e);case"button":return Zs(t,e);case"readout":return _s(t);case"label":return Vs(t);case"note":return Ha(t);case"knob":return el(t,e);case"choice":return tl(t,e);case"slotRow":return nl(t,e);case"stepGrid":return rl(t,e);case"canvas":return cl(t);case"fx":return hl(t,e);case"group":return Rs(t,e,bt);case"strip":return dl(t,e);case"stripAdd":return pl(t,e);case"padGrid":return Ps(t,e);case"moves":return Ks(t,e);default:return Ha({id:"unknown",text:""})}}function ye(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Gi(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??gt(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Wa(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Wa(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Js(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??gt(e.value))}else if(e.type==="choice")Di(t,e);else if(e.type==="slotRow")Xi(t,e);else if(e.type==="stepGrid")Rn(t,e);else if(e.type==="padGrid")Fi(t,e);else if(e.type==="moves")Hi(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Ri(n,e)}else if(e.type==="strip"){Ki(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${Ot(n.id)}"]`);a instanceof Element&&ye(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")_i(t,e);else if(e.type==="group"){Oi(t,e);for(let n of e.controls){let a=t.querySelector(`[data-nc-id="${Ot(n.id)}"]`);a instanceof Element&&ye(a,n)}}else if(e.type==="fx"){Ui(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${Ot(n.id)}"]`);a instanceof Element&&ye(a,n)}}}}function Gs(t,e){let n=rn(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{let r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{let r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(a,o),t.onTap&&n.insertBefore(Ds(t,a,e),o),n.append(J()),ye(n,t),n}function Ds(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(be());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Ys(t,e){let n=rn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(let o of t.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,a.append(r)}return a.value=t.value,a.addEventListener("change",()=>{let o=e(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,J()),n}function Xs(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(J()),ye(n,t),n}function Zs(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(J()),ye(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=ji(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Zi(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function _s(t){let e=rn(t.id,t.label);return e.append(J()),ye(e,t),e}var qs=450;function Ks(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Us(l.icon)),d.addEventListener("click",()=>{let u=e(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(d)}o.append(r,s),n.append(o)}return Hi(n,t),n}function Hi(t,e){for(let n of e.groups)for(let a of n.moves){let o=t.querySelector(`[data-nc-move="${Ot(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function Us(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Vs(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(J()),e}function Ha(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(J()),e}function Ga(t){if(typeof t.valueText=="string")return t.valueText;let e=gt(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Gi(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Js(t,e){let n=e.max-e.min||1,a=(e.value-e.min)/n;Gi(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(a*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Ga(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Ga(e)}`}function Qs(t,e){let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function el(t,e){let n=rn(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,s=0;a.addEventListener("pointerdown",d=>{r=d.clientY;let u=e(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId)}),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=e(a);if(u?.type!=="knob")return;let c=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-r)*c/120));u.onChange(h)}),a.addEventListener("dblclick",()=>{let d=e(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=e(a);if(u?.type!=="knob")return;let c=Qs(u,d);c!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,c))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(a,l),n.append(J()),ye(n,t),n}function tl(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let a of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(r.preventDefault(),u.focus(),u.click())}),n.append(o)}return n.append(J()),Di(n,t),n}function Di(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function nl(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<t.slots.length;c++){let h=t.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(c),m.textContent=h.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(m,be()),al(f,m,n,c,e),a.append(f)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=ji(),o.append(be()),o.addEventListener("click",()=>{Zi(n);let c=e(n);c?.type==="slotRow"&&c.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=e(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...o?[o]:[]),n.append(u,r,J()),Yi(n,e),Xi(n,t),n}function Da(t,e,n,a){let o=n(t);if(o?.type!=="slotRow")return;dt(t);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(e,r)}function al(t,e,n,a,o){let r=0,s=0,l=0,d=!1,u=!1,c=!1,h=!1,f=()=>{window.clearTimeout(r),r=0},m=g=>{let w=g.clientX-s,v=g.clientY-l;w*w+v*v>Fa*Fa&&(d=!0,f())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=g=>{let w=r!==0&&!d&&!u;f(),b(),w&&(c=!0,Da(n,a,o,g))},p=()=>{d=!0,f(),b()};t.addEventListener("pointerdown",g=>{g.button===0&&(b(),u=!1,d=!1,c=!1,s=g.clientX,l=g.clientY,f(),r=window.setTimeout(()=>{r=0,!d&&(u=!0,il(n,e,a,o))},Fs),h=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",g=>g.preventDefault()),t.addEventListener("click",g=>{if(c||u||d){c=!1,u=!1,d=!1;return}Da(n,a,o,g)})}function Yi(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Ya("Save","store"),o=Ya("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),dt(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),dt(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),dt(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&dt(t)})}function Ya(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function il(t,e,n,a){Yi(t,a);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function dt(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Xi(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Zi(t){let e=t.dataset.ncLastFill||null,n=ts(e);t.dataset.ncLastFill=n;let a=ns(n);if(a)for(let[o,r]of Object.entries(a))t.style.setProperty(o,r)}function ol(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function rl(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=p=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=p,a.append(g),g},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let g of[r,s]){let w=g===p;g.setAttribute("aria-checked",w?"true":"false"),g.tabIndex=w?0:-1}};l(r);for(let p of[r,s])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let g=s.getAttribute("aria-checked")==="true"?r:s;l(g),g.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),t.onFill&&d.append(ol(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let g=e(n);g?.type==="stepGrid"&&g.onClear?.()}),d.append(p)}n.append(d);for(let p of t.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,M=0;w.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(M=window.setTimeout(()=>{let L=e(n);L?.type!=="stepGrid"||!L.selectedRows||(v=!0,L.onSelectRow?.(L.rows.findIndex(R=>R.id===p.id),!0))},qs))});for(let x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(M));w.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),w.addEventListener("click",x=>{let L=e(n);if(L?.type!=="stepGrid")return;if(v){v=!1;return}let R=L.rows.findIndex(Q=>Q.id===p.id),H=!!L.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);L.onSelectRow?.(R,H)}),w.addEventListener("keydown",x=>sl(n,w,x));let k=[];for(let x of["mute","solo"]){if(!(x==="mute"?t.onMute:t.onSolo))continue;let L=document.createElement("span");L.className="nc-ms-wrap";let R=document.createElement("button");R.type="button",R.className="nc-ms",R.dataset.ncMs=x,R.textContent=x==="mute"?"M":"S",R.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${p.label}`),L.append(R,be()),L.addEventListener("click",()=>{let H=e(n);if(H?.type!=="stepGrid")return;let Q=H.rows.findIndex(re=>re.id===p.id);(x==="mute"?H.onMute:H.onSolo)?.(Q)}),k.push(L)}let A=document.createElement("div");A.className="nc-steps";for(let x=0;x<p.steps.length;x++){let L=document.createElement("span");L.className="nc-step-wrap";let R=document.createElement("button");R.type="button",R.className="nc-step",R.dataset.ncStep=`${p.id}:${x}`,R.setAttribute("aria-label",`${p.label} step ${x+1}`),L.append(R,be()),L.addEventListener("click",H=>{let Q=e(n);if(Q?.type!=="stepGrid")return;let re=Q.rows.findIndex(Be=>Be.id===p.id),N=s.getAttribute("aria-checked")==="true";Q.onToggle(re,x,H.shiftKey||N)}),A.append(L)}if(t.onLength&&A.append(ll(n,A,p,e)),g.append(...k,w,A),t.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=p.id,x.setAttribute("aria-label",`Re-roll ${p.label}`),x.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=ja(),x.append(be()),x.addEventListener("click",()=>{let L=e(n);L?.type==="stepGrid"&&L.onDice?.(L.rows.findIndex(R=>R.id===p.id))}),g.append(x)}g.addEventListener("click",x=>{if(x.target!==g)return;let L=e(n);L?.type==="stepGrid"&&L.onSelectRow?.(L.rows.findIndex(R=>R.id===p.id))}),Xa(n,A,".nc-step-wrap",e,s,()=>p.id),n.append(g)}let u=document.createElement("div");u.className="nc-pads-head";let c=(p,g,w)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=g,w&&v.setAttribute("aria-label",w),v},h=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),m=document.createElement(t.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),t.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Rn(n,p))}));for(let[p,g]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let v=w.rows.length;w.onSelectRow?.(((Nt(w)+g)%v+v)%v)});if(u.append(h,m,f),t.onDice){let p=c("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=ja(),p.addEventListener("click",()=>{let g=e(n);if(g?.type!=="stepGrid")return;let w=Nt(g);w>=0&&g.onDice?.(w)}),u.append(p)}if(t.transport){let p=c("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let g=e(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),u.append(p)}n.append(u);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(p),g.textContent=String(p+1),g.addEventListener("click",w=>{let v=e(n);if(v?.type!=="stepGrid")return;let M=Nt(v);if(M<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(M,p+1);return}let k=s.getAttribute("aria-checked")==="true";v.onToggle(M,p,w.shiftKey||k)}),b.append(g)}return Xa(n,b,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[Nt(p)]?.id:void 0}),n.append(b),n.append(J()),Rn(n,t),n}function Nt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Xa(t,e,n,a,o,r){let s="on",l=!0,d=-1,u=(c,h)=>{let f=c.rows[d]?.steps[h];!f||h>=c.rows[d].length||(c.onSet?c.onSet(d,h,s,l):!!f[s]!==l&&c.onToggle(d,h,s==="accent"))};Cs(e,n,c=>{let h=a(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(c.kind!=="paint")return;let f=h.rows.findIndex(m=>m.id===r());f>=0&&h.rows[f].length!==c.pad+1&&h.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let f=r();d=h.rows.findIndex(b=>b.id===f);let m=h.rows[d]?.steps[c.pad];if(!m)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}u(h,c.pad)}else if(c.kind==="long"){let f=r(),m=h.rows.findIndex(y=>y.id===f),b=e.querySelectorAll(n)[c.pad];m>=0&&b instanceof HTMLElement&&h.onLongPress?.(m,c.pad,b)}}})}function sl(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],o=a.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function ll(t,e,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(be());let r=u=>{let c=a(t);if(c?.type!=="stepGrid")return;let h=c.rows.findIndex(b=>b.id===n.id),f=c.rows[h];if(!f)return;let m=Math.max(1,Math.min(f.steps.length,u));m!==f.length&&c.onLength?.(h,m)},s=u=>{let c=[...e.querySelectorAll(".nc-step")],h=1;return c.forEach((f,m)=>{let b=f.getBoundingClientRect();b.width>0&&u>=b.left+b.width/2&&(h=m+1)}),h},l=u=>r(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete o.dataset.dragging};return o.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),o.addEventListener("keydown",u=>{let c=a(t);if(c?.type!=="stepGrid")return;let h=c.rows.find(m=>m.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};u.key in f&&(u.preventDefault(),r(f[u.key]))}),o}var vn=new WeakMap;function Za(t,e){let n=typeof e=="number"?e:null;if(!(vn.has(t)&&vn.get(t)===n)){if(vn.set(t,n),n===null){for(let a of Object.keys(Ia(1)))t.style.removeProperty(a);return}for(let[a,o]of Object.entries(Ia(n)))t.style.setProperty(a,o)}}function Rn(t,e){let n=e.rows.some(c=>c.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),r=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let d=t.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&r&&(d.setAttribute("aria-label",`Re-roll ${r.label}`),d.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!e.transport?.playing,h=e.transport?.label??(c?"Stop":"Play");u.textContent!==h&&(u.textContent=h),u.setAttribute("aria-pressed",c?"true":"false");let f=e.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let c=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let f=Number(h.getAttribute("data-nc-pad")),m=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!m||!l&&f>=r.length,l&&f>=r.length?h.dataset.out="true":delete h.dataset.out,l&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?h.dataset.accent="true":delete h.dataset.accent,m?.dim?h.dataset.dim="true":delete h.dataset.dim,Za(h,m?.velocity),e.playhead>=0&&f===c?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let c of e.rows){for(let m=0;m<c.steps.length;m++){let b=c.steps[m],y=t.querySelector(`[data-nc-step="${c.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===c.id?p.dataset.selected="true":delete p.dataset.selected;let v=e.selectedRow!==c.id&&(e.selectedRows??[]).includes(c.id);v?p.dataset.picked="true":delete p.dataset.picked;let M=p.querySelector(".nc-name");M instanceof HTMLElement&&(M.setAttribute("aria-pressed",e.selectedRow===c.id||v?"true":"false"),M.textContent!==c.label&&(M.textContent=c.label,M.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?p.dataset.silent="true":delete p.dataset.silent;for(let k of p.querySelectorAll("[data-nc-ms]")){let A=k.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;k.setAttribute("aria-pressed",A?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Za(y,b.velocity);let g=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;m===g?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!e.onLength&&e.selectedRow===c.id;y.hidden=m>=c.length&&!w,m>=c.length&&w?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${c.id}"]`),f=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&f&&f.nextElementSibling!==h){let m=document.activeElement===h;f.after(h),m&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(c.length)),h.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),h.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function cl(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,J()),e}function dl(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");if(o.className="nc-strip-name",o.dataset.ncStripName="",a.append(o),t.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(b)}),a.append(b)}let r=document.createElement("div");if(r.className="nc-strip-hacks",t.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",b.append(y,be()),b.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),r.append(b)}let s=document.createElement("div");s.className="nc-strip-ms";for(let b of["mute","solo"]){if(!(b==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=b,p.textContent=b==="mute"?"M":"S",y.append(p,be()),y.addEventListener("click",()=>{let g=e(n);g?.type==="strip"&&(b==="mute"?g.onMute:g.onSolo)?.()}),s.append(y)}let l=document.createElement("div");l.className="nc-strip-sends";for(let b of t.sends??[])l.append(bt({...b,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let u=document.createElement("span");u.className="nc-scale",u.setAttribute("aria-hidden","true");for(let b of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(b.value)),y.textContent=b.label,u.append(y)}let c=vs({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:b=>{let y=e(n);y?.type==="strip"&&y.onChange(b)},onReset:()=>{let b=e(n);b?.type==="strip"&&qa(b)}}),h=Ms({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let b=e(n);b?.type==="strip"&&b.onClipClear?.()}});d.append(u,c.el,h.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let m=0;return f.addEventListener("click",b=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(m),b.detail===0?_a(n,f,e):b.detail===1&&(m=window.setTimeout(()=>_a(n,f,e),ul)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(m);let b=e(n);b?.type==="strip"&&qa(b)}),n.append(a,r,s,l,d,f,J()),Ki(n,t),n}var ul=250;function _a(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??gt(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let d=o.value;if(o.remove(),e.hidden=!1,l){let u=n(t);u?.type==="strip"&&u.onTypeIn?.(d)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function pl(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),d=s.value;qi(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,s,J()),_i(n,t),n}function _i(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...o.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),qi(a))}function qi(t){let e=t.options[0];e&&(e.selected=!0)}function qa(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ki(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let o=t.querySelector(".nc-fader"),r=o?ks(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),Ls(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??gt(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let u=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${u}`:u}for(let d of t.querySelectorAll("[data-nc-ms]")){let u=d.getAttribute("data-nc-ms"),c=u==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",c?"true":"false"),d.setAttribute("aria-label",`${u==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let d=e.hacksLabel??"Hacks";l.textContent!==d&&(l.textContent=d),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function hl(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title,t.on===void 0)n.append(a);else{let o=document.createElement("div");o.className="nc-ui-fx-hd";let r=Ci({checked:t.on,labelledBy:a.id,onChange:s=>{let l=e(r.el);l?.type==="fx"&&l.onToggle?.(s)}});r.el.dataset.ncFxSwitch="",o.append(a,r.el),n.append(o)}for(let o of t.controls)n.append(bt(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let r=document.createElement("summary");r.textContent=t.moreLabel??"More",o.append(r);for(let s of t.more)o.append(bt(s,e));n.append(o)}return n.append(J()),Ui(n,t),n}function Ui(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Ot(t){return t.replace(/["\\]/g,"\\$&")}function ml(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&Ri(n,a)}Hs(t)}var fl=Te["toast-duration"];function gl({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function bl(t,e,n,a){let o=l=>({top:l,bottom:l+n}),r=l=>t.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=o(e-a-n);return r(s)?r(o(a))?"bottom":"top":"bottom"}function yl(t,e,n,a,o,r){let s=t.bottom+o,l=Math.max(r,Math.min(t.left,a-r-n.width));for(let d=!0,u=0;d&&u<8;u++){d=!1;for(let c of e)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+o,d=!0)}return{top:s,left:l}}var Ka="data-nc-ui-toast-live";function wl(t,e){let n=e.querySelector(`[${Ka}]`);return n||(n=t.createElement("div"),n.setAttribute(Ka,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function vl({message:t,actionLabel:e,onAction:n,duration:a=fl,onClose:o,avoid:r=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let u=d.defaultView??globalThis,c=d.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let h=d.createElement("span");h.className="nc-ui-toast-message",h.textContent=t,c.appendChild(h);let f=null;e&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,c.appendChild(f)),l.appendChild(c);let m="open",b=j=>j&&typeof j.getBoundingClientRect=="function"?j.getBoundingClientRect():null,y=b(c),p=y?.height||44,g=u.getComputedStyle?.(c),w=Number.parseFloat(g?.getPropertyValue(G("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(G("toast-anchor-gap")))||8,M=b(s),k=u.innerHeight??0,A=r.map(b).filter(Boolean),x=M&&M.bottom>0&&M.top<k?yl(M,A,{width:y?.width||0,height:p},u.innerWidth??0,v,w):null;x&&x.top+p<=k?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(u.scrollY??0)}px`,c.style.left=`${x.left+(u.scrollX??0)}px`):c.setAttribute("data-placement",bl(A,k,p,w));let L=u.requestAnimationFrame?.bind(u)??(j=>setTimeout(j,16));L(()=>L(()=>{m==="open"&&c.setAttribute("data-state","open")})),wl(d,l).textContent=gl({message:t,actionLabel:e});let R,H,Q=new Promise(j=>{H=j}),re=j=>{clearTimeout(R),R=setTimeout(()=>I("timeout"),j)},N=a,Be=Date.now(),Mt=()=>{m==="open"&&(clearTimeout(R),N=Math.max(0,N-(Date.now()-Be)))},pe=()=>{m==="open"&&(Be=Date.now(),re(N))};c.addEventListener("pointerenter",Mt),c.addEventListener("pointerleave",pe),c.addEventListener("focusin",Mt),c.addEventListener("focusout",pe),f?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{I("action")}}),Number.isFinite(a)&&re(a);function I(j="close"){if(m!=="open")return;m="closing",clearTimeout(R),c.setAttribute("data-state","closing"),o?.(j);let ne=u.getComputedStyle?.(c),Ae=ne?Math.max(0,...String(ne.transitionDuration||"").split(",").map(ya=>Number.parseFloat(ya)*(ya.trim().endsWith("ms")?1:1e3)||0)):0,he=()=>{m!=="gone"&&(m="gone",c.remove(),H(j))};c.addEventListener("transitionend",he),setTimeout(he,Ae+50)}return{el:c,close:I,closed:Q}}var Ua="data-nc-help";function kl(t,e,n,a=0,o=6,r=8){let s=t.top-o-e.height,l=s>=a+r?"above":"below",d=l==="above"?s:t.bottom+o,u=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(d),left:Math.round(u),side:l}}var kn=new WeakMap;function $l(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function xl({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=kn.get(t);if(n)return n;let a=t.defaultView,o=null,r=null,s,l=()=>{clearTimeout(s),r=null,o&&(o.hidden=!0)},d=f=>{let m=f.getAttribute(Ua);if(!m)return;o||(o=t.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",t.body.appendChild(o)),o.textContent=m,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let b=f.getBoundingClientRect(),y=kl(b,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,$l(t));o.style.top=`${y.top}px`,o.style.left=`${y.left}px`,o.dataset.side=y.side,o.style.visibility=""},u=f=>{if(f.pointerType==="touch")return;let m=f.target&&f.target.closest?f.target.closest(`[${Ua}]`):null;m!==r&&(l(),m&&(r=m,s=setTimeout(()=>{r===m&&m.isConnected&&d(m)},e)))},c=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",u),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let h={hide:l,uninstall(){l(),t.removeEventListener("pointerover",u),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),o?.remove(),o=null,kn.delete(t)}};return kn.set(t,h),h}var qn="netcomposer.rhythm.hidden.v1",Le=new WeakMap;function $n(){try{return globalThis.localStorage??null}catch{return null}}function Vi(t,e=qn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Va(t,e,n,a=qn){let o=Vi(t,a);n?o.add(e):o.delete(e);try{t?.setItem(a,JSON.stringify([...o]))}catch{}}function Kn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of e)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function Sl(t,e){if(!(!t||!e))return Kn(t).find(n=>n.id===e)}function Al(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${Kn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Ml(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),t.append(n),Ji(t,e)}function Ji(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Ll(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=Le.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Sl(n,a)}function El(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],a=Al(e);if(t.dataset.ncSignature===a){for(let o of n){let r=t.querySelector(`[data-nc-section="${Ja(o.id)}"]`);r&&Ji(r,o);for(let s of o.controls){let l=t.querySelector(`[data-nc-id="${Ja(s.id)}"]`);l instanceof Element&&ye(l,s)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let o of n){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),Ml(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let l of o.controls)s.append(bt(l,Ll));t.append(r)}}function Ja(t){return t.replace(/["\\]/g,"\\$&")}function Tl(t,e=qn){Li();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=Vi($n(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Ci({labelledBy:r.id,onChange:g=>(Le.get(n)??t).onToggle?.(g)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",o.append(r,c,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",f.append(m);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,o,h,f),n.setAttribute("aria-labelledby",r.id);let y=g=>{let w=Le.get(n)??t;n.dataset.ncOpen=g?"false":"true",h.hidden=g,f.hidden=!g,l.textContent=g?"+":"−",l.setAttribute("aria-expanded",g?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${g?"Show":"Hide"} ${w.title}`),l.title=g?"Show":"Hide",g?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let g=n.dataset.ncOpen==="true";Va($n(),(Le.get(n)??t).id,g,e),y(g),zn(n.parentElement)}),f.addEventListener("click",()=>{Va($n(),(Le.get(n)??t).id,!1,e),y(!1),zn(n.parentElement)});let p={el:n,update(g){Le.set(n,g),g.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=g.title,c.textContent=g.status??"",g.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),m.textContent=g.summary??g.title,u.el.hidden=g.on===void 0,u.set(g.on===!0),g.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${g.title}`),El(h,g),y(h.hidden),p.redraw()},redraw(){let g=Le.get(n);g&&ml(n,Kn(g))}};return Le.set(n,t),y(a),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Cl(t,e,n="adjacent"){Li(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),zn(t)}function zn(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const ke=16,oe=16,Ve=10,Qi=["1","2","3","4","5","6","7","8","9","0"],eo=[0,2,4,8,16],Nl=[0,1,2,4,8],Pn=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],Zt={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function Pe(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0}}function sn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function ln(){return{length:oe,mute:!1,solo:!1,steps:Array.from({length:oe},sn)}}function to(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(Zt.drive),compressor:structuredClone(Zt.compressor)}}function Bn(){return{v:1,pads:Array.from({length:ke},(t,e)=>Pe(e)),lanes:Array.from({length:ke},ln),swing:.5,hacks:to(),slots:Array.from({length:Ve},()=>null),active:null,selected:0,master:1}}const $e=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},U=(t,e,n,a)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):a,Ce=(t,e,n,a)=>Math.round(U(t,e,n,a)),Ne=(t,e)=>typeof t=="boolean"?t:e,_t=(t,e,n)=>e.includes(t)?t:n,Il=/^[0-9a-f]{16,64}$/;function Rl(t,e){const n=$e(t),a=Pe(e);let o=U(n.start,0,1,0),r=U(n.end,0,1,1);r-o<.001&&([o,r]=[0,1]);const s=eo.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=ao?n.cuts.split(" ").map(Number):n.cuts,d=Array.isArray(l)?l.filter(u=>typeof u=="number"&&u>0&&u<1).sort((u,c)=>u-c).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&Il.test(n.sample)?n.sample:null,mode:_t(n.mode,["oneshot","gate","loop"],a.mode),dir:_t(n.dir,["fwd","rev","pingpong"],a.dir),start:o,end:r,slices:s,cuts:s?d:[],tune:Ce(n.tune,-24,24,0),fine:Ce(n.fine,-100,100,0),fit:Nl.includes(n.fit)?n.fit:0,keepPitch:Ne(n.keepPitch,!0),attack:U(n.attack,0,.1,a.attack),decay:U(n.decay,.01,4,a.decay),cutoff:U(n.cutoff,-1,1,0),resonance:U(n.resonance,0,1,0),level:U(n.level,0,1,a.level),pan:U(n.pan,-1,1,0),choke:Ce(n.choke,0,4,0)}}function zl(t){const e=$e(t);return{on:Ne(e.on,!1),accent:Ne(e.accent,!1),velocity:U(e.velocity,0,1,.8),chance:U(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:Ce(e.slice,0,15,0),pitch:Ce(e.pitch,-12,12,0),reverse:Ne(e.reverse,!1),cond:_t(e.cond,Pn,"always")}}function Pl(t){const e=$e(t),n=Array.isArray(e.steps)?e.steps:typeof e.steps=="string"?Dl(e.steps):[];return{length:Ce(e.length,1,oe,oe),mute:Ne(e.mute,!1),solo:Ne(e.solo,!1),steps:Array.from({length:oe},(a,o)=>zl(n[o]))}}function Qa(t,e){const n=$e(t),a={...e.dials};for(const[o,r]of Object.entries($e(n.dials)))o in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[o]=r);return{on:Ne(n.on,e.on),dials:a}}function Bl(t){const e=$e(t),n=$e(e.filter),a=to();return{filter:{on:Ne(n.on,a.filter.on),mode:_t(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:U(n.cutoff,0,1,a.filter.cutoff),resonance:U(n.resonance,0,1,a.filter.resonance)},drive:Qa(e.drive,Zt.drive),compressor:Qa(e.compressor,Zt.compressor)}}function qt(t){const e=$e(t),n=Array.isArray(e.pads)?e.pads:[],a=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:ke},(o,r)=>Rl(n[r],r)),lanes:Array.from({length:ke},(o,r)=>Pl(a[r])),swing:U(e.swing,.5,.75,.5),hacks:Bl(e.hacks)}}function no(t){const e=$e(t);if(e.v!==1)return Bn();const n=Array.isArray(e.slots)?e.slots:[],a=qt(e),o=Array.from({length:Ve},(s,l)=>n[l]?qt(n[l]):null),r=e.active===null?null:Ce(e.active,0,Ve-1,-1);return{v:1,...a,slots:o,active:r!==null&&r>=0&&o[r]?r:null,selected:Ce(e.selected,0,ke-1,0),master:U(e.master,0,1,1)}}function Ol(t,e){return structuredClone({index:e,pad:t.pads[e]??Pe(e),lane:t.lanes[e]??ln()})}function Wl(t,e){const n=structuredClone(e);t.pads[n.index]=n.pad,t.lanes[n.index]=n.lane}const yt=8;function Fl(t,e,n,a=0){const o=t.pads[e],r=t.lanes[e];if(!o||!r)return;o.mode="oneshot",o.dir="fwd",o.decay=4,o.attack=0,o.fit=n,o.keepPitch=!0,o.slices=0,o.cuts=[],r.length=oe;for(const l of r.steps)Object.assign(l,sn());const s=r.steps[0];n<=yt&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function jl(t,e=ke){if(typeof t!="string"||!/^\d{1,3}$/.test(t))return-1;const n=Number(t)-1;return n>=0&&n<e?n:-1}function Un(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}const ao=4096;function Hl(t){const e=sn(),n=t.map(a=>{let o="";return a.on!==e.on&&(o+="x"),a.accent!==e.accent&&(o+="a"),a.reverse!==e.reverse&&(o+="r"),a.velocity!==e.velocity&&(o+=`v${a.velocity}`),a.chance!==e.chance&&(o+=`c${a.chance}`),a.slice!==e.slice&&a.slice!==null&&(o+=`s${a.slice}`),a.pitch!==e.pitch&&(o+=`p${a.pitch}`),a.cond!==e.cond&&(o+=`k${a.cond}`),o||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const Gl="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",ei=new RegExp(`[xar]|[vcsp]${Gl}|k\\S+$`,"gy");function Dl(t){return t.length>ao?[]:t.split(" ").slice(0,oe).map(e=>{const n={};if(e==="-"||e==="")return n;ei.lastIndex=0;let a=0;for(const o of e.matchAll(ei)){const r=o[0];a+=r.length;const s=r.slice(1);r==="x"?n.on=!0:r==="a"?n.accent=!0:r==="r"?n.reverse=!0:r[0]==="v"?n.velocity=Number(s):r[0]==="c"?n.chance=Number(s):r[0]==="s"?n.slice=Number(s):r[0]==="p"?n.pitch=Number(s):r[0]==="k"&&(n.cond=s)}return a===e.length?n:{}})}function Yl(t){const e=t.pads.map((a,o)=>{const r=Pe(o),s={};for(const[l,d]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):r[l]!==d&&(s[l]=d);return s}),n=t.lanes.map(a=>({...a.length!==oe?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:Hl(a.steps)}));return structuredClone({pads:e,lanes:n,swing:t.swing,hacks:t.hacks})}function wt(t){const e=new Set;for(const n of[t,...t.slots])for(const a of n?.pads??[])a.sample&&e.add(a.sample);return e}function io(){try{return globalThis.localStorage??null}catch{return null}}function Xl(t,e=io()){try{const n=e?.getItem(t);return n?no(JSON.parse(n)):Bn()}catch{return Bn()}}function Zl(t,e,n=io()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const we=t=>`${Math.round(t*100)}%`,We=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,On=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,vt=(t,e="")=>`${t>0?"+":""}${t}${e}`,_l=t=>`×${Number(t.toFixed(2))}`;function Wt(t){return Math.abs(t)<.001?"open":t<0?`LP ${On(2e4*(60/2e4)**-t)}`:`HP ${On(20*(8e3/20)**t)}`}const Ft=t=>t>=3.99?"Hold":We(t);function ql(t){const e=Pe(0),n=[];return t.tune!==e.tune&&n.push(vt(t.tune," st")),t.fine!==e.fine&&n.push(vt(t.fine," ct")),t.fit!==e.fit&&n.push(`fit ${t.fit} bar${t.fit===1?"":"s"}`),t.fit&&t.keepPitch!==e.keepPitch&&n.push("varispeed"),Math.abs(t.attack-e.attack)>=5e-4&&n.push(`attack ${We(t.attack)}`),Ft(t.decay)!==Ft(e.decay)&&n.push(`decay ${Ft(t.decay)}`),Wt(t.cutoff)!==Wt(e.cutoff)&&n.push(`filter ${Wt(t.cutoff)}`),we(t.resonance)!==we(e.resonance)&&n.push(`res ${we(t.resonance)}`),n.join(" · ")}function oo(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const It=t=>Math.max(0,Math.min(100,t));function Kl(t){const e=oo(t.cutoff),n=It(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:It(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:It(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:It(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const ro=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function Wn(t){const e=Kl(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:ro(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function Ul(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((a,o)=>a.type!==e.chain[o]?.type))return{whole:!0};const n=[];return e.chain.forEach((a,o)=>{const r=t.chain[o];if(r){r.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))r.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const ti={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts the pad and its lane back as they were before this Grab, Take or take sent from LUCY: its old sound, slices and steps. Cmd/Ctrl+Z does the same.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},Vl={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function X(t){return Object.hasOwn(ti,t)?ti[t]:void 0}function Jl(t,e){const n=Vl[t];return(n&&Object.hasOwn(n,e)?n[e]:void 0)??X(t)}const jt="nyx-help-text",ni=new Map;function Ql(t,e){const n=ni.get(e);if(n&&t.getElementById(n))return n;let a=t.getElementById(jt);a||(a=t.createElement("div"),a.id=jt,a.hidden=!0,t.body.append(a));const o=t.createElement("span");return o.id=`${jt}-${a.children.length+1}`,o.textContent=e,a.append(o),ni.set(e,o.id),o.id}function K(t,e,n){if(!t||!e||(t.getAttribute("data-nc-help")!==e&&t.setAttribute("data-nc-help",e),t.hasAttribute("title")&&t.removeAttribute("title"),!n))return;const a=Ql(n.ownerDocument,e),o=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(o.includes(a))return;const r=[...o.filter(s=>!s.startsWith(`${jt}-`)),a];n.setAttribute("aria-describedby",r.join(" "))}function ec(t){const e=X(t);return e?{"data-nc-help":e}:{}}const tc=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function Vn(t){for(const e of t.querySelectorAll(".nc-module[data-nc-module]"))K(e.querySelector(".nc-module-hd .nc-title"),X(`module:${e.dataset.ncModule}`));for(const e of t.querySelectorAll("[data-nc-section]"))K(e.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),X(`section:${e.dataset.ncSection}`));for(const e of t.querySelectorAll("[data-nc-id]")){const n=e.dataset.ncId??"";if(!e.matches("input, select, canvas"))if(e.classList.contains("nc-field")){const a=e.querySelector(":scope > input, :scope > select, :scope > canvas");K(e.querySelector(":scope > .nc-label"),X(n),a)}else if(e.classList.contains("nc-choice-row"))for(const a of e.querySelectorAll("[data-nc-choice]"))K(a,Jl(n,a.dataset.ncChoice??""),a);else e.classList.contains("nc-btn")?K(e,X(n),e):e.matches(".nc-label[data-nc-text]")?K(e,X(n)):e.classList.contains("nc-ui-fx")&&(K(e.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),X(n),e.querySelector("[data-nc-fx-switch]")),K(e.querySelector(":scope > .nc-ui-more > summary"),X("kit:more")))}for(const[e,n]of tc)for(const a of t.querySelectorAll(e)){const o=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;o&&a.removeAttribute("title"),K(o??a,X(n),a)}for(const e of t.querySelectorAll(".nc-group[data-nc-id]")){const n=e.querySelector(":scope > .nc-group-toggle");K(n?.querySelector(".nc-group-title")??null,X(e.dataset.ncId??""),n),K(n?.querySelector(".nc-group-mark")??null,X("kit:group-toggle"))}for(const e of t.querySelectorAll(".nc-padgrid-pad-badge"))e.textContent?K(e,X("kit:choke-badge")):e.removeAttribute("data-nc-help")}const mt=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],nc=Array.from({length:ke},(t,e)=>{const n=(mt[e%mt.length]??"").slice(3);return e<mt.length?n.toLowerCase():n.toUpperCase()});function so(t){const e=mt.indexOf(t.code);if(e<0)return-1;const n=t.shiftKey?e+mt.length:e;return n<ke?n:-1}class ac{down=new Map;press(e){if(this.down.has(e.code))return-1;const n=so(e);return n>=0&&this.down.set(e.code,n),n}release(e){const n=this.down.get(e.code);return n===void 0?-1:(this.down.delete(e.code),n)}releaseAll(){const e=[...this.down.values()];return this.down.clear(),e}}const ic=.25;function Jn(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function lo(t,e,n){const a=t.start*e.frames,o=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(a),Math.ceil(o)];const r=Jn(t),s=Math.min(n,r.length-2);return[Math.floor(a+r[s]*(o-a)),Math.ceil(a+r[s+1]*(o-a))]}function oc(t,e,n,a=0){let r=2**((t.tune+t.fine/100+a)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,l=t.fit*4*(60/n);s>0&&l>0&&(r*=s/l)}return r}function co(t,e,n){return Math.max(1,Math.round(t*4*60/Math.max(1,e)*n))}function uo(t,e,n){if(!t.fit)return 1;const a=(t.end-t.start)*e.frames/e.sampleRate;return a>0?a/(t.fit*4*(60/Math.max(1,n))):1}const ai=[.75,1.5];function rc(t,e,n){if(n===null||!t.slices)return[0,e];const a=Jn(t),o=Math.min(n,a.length-2);return[Math.floor((a[o]??0)*e),Math.ceil((a[o+1]??1)*e)]}const sc=1.5;function Qn(t,e,n,a,o,r=!1,s){if(!n.on||!t.sample||!a)return null;const l=n.slice??(t.slices?e%t.slices:null),d=m=>s?rc(t,s.frames,m):lo(t,a,m);let[u,c]=d(l);const h=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;if(t.mode==="oneshot"&&l!==null&&t.slices&&!r){const[m,b]=d(null);h==="fwd"?c=b:h==="rev"&&(u=m)}const f=s?2**(n.pitch/12)*(s.frames/co(t.fit,o,a.sampleRate)):oc(t,a,o,n.pitch);return{sample:s?s.sample:t.sample,from:u,to:c,rate:f,gain:Math.min(1.5,n.velocity*(n.accent?sc:1))*t.level,pan:t.pan,mode:t.mode,dir:h,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond,fit:t.fit>0}}function lc(t,e,n,a=null,o){return Qn(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},e,n,!0,o)}function cc(t,e,n,a=()=>{}){const o=t.lanes.some(r=>r.solo);return{swing:t.swing,lanes:t.lanes.map((r,s)=>{const l=t.pads[s],d=l?.sample?e(l.sample):void 0,u=l?a(s):void 0;return{length:r.length,audible:o?r.solo:!r.mute,steps:r.steps.map((c,h)=>l?Qn(l,h,c,d,n,!1,u):null)}})}}const dc="/nyx/assets/sampler-processor-BdlrJ3MQ.js",po=827873614,uc=60;async function pc(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),a=[new Uint8Array(n.buffer),...t.map(d=>new Uint8Array(d.buffer))],o=a.reduce((d,u)=>d+u.byteLength,0),r=new Uint8Array(o);let s=0;for(const d of a)r.set(d,s),s+=d.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(l.subarray(0,16),d=>d.toString(16).padStart(2,"0")).join("")}function hc(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([po,t.sampleRate,t.data.length,e]),t.data.forEach((a,o)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,e*4),16+o*e*4)}),n}function mc(t,e){if(e.byteLength<16)return null;const[n,a,o,r]=new Uint32Array(e,0,4);if(n!==po||!o||o>2||e.byteLength!==16+r*4*o)return null;const s=Array.from({length:o},(l,d)=>new Float32Array(e.slice(16+d*r*4,16+(d+1)*r*4)));return{hash:t,data:s,sampleRate:a,channels:o,frames:r}}class fc{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const a=await pc(e,n),o={hash:a,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(a,o);const r=await this.folder();if(!r)return{sample:o,saved:!1};try{const l=await(await r.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(hc(o)),await l.close(),{sample:o,saved:!0}):{sample:o,saved:!1}}catch{return{sample:o,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(`${e}.f32`)).getFile(),r=mc(e,await o.arrayBuffer());return r&&this.memory.set(e,r),r}catch{return null}}async prune(e){for(const a of[...this.memory.keys()])e.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const o of n.keys())a.push(o);for(const o of a){const r=o.replace(/\.f32$/,"");o.endsWith(".f32")&&!e.has(r)&&await n.removeEntry(o)}}catch{}}}function gc(t){const e=Math.min(t.length,Math.round(uc*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(a,o)=>{const r=new Float32Array(e);return r.set(t.getChannelData(o).subarray(0,e)),r}),trimmed:e<t.length}}function ho(t,e=200){const n=t[0]?.length??0,a=[];if(!n)return a;const o=n/e;for(let r=0;r<e;r++){const s=Math.floor(r*o),l=Math.max(s+1,Math.floor((r+1)*o));let d=0,u=0;const c=Math.max(1,Math.floor((l-s)/256));for(let h=s;h<l&&h<n;h+=c){let f=0;for(const m of t)f+=m[h]??0;f/=t.length,f<d&&(d=f),f>u&&(u=f)}a.push(Math.max(-1,d),Math.min(1,u))}return a}function bc(t,e,n,a,o){const r=a-n;if(o<2||r<64)return[];const s=Math.max(32,Math.round(e*.01)),l=[];for(let m=n;m<a;m+=s){let b=0;for(const y of t)for(let p=m;p<Math.min(a,m+s);p++)b+=(y[p]??0)*(y[p]??0);l.push(Math.log10(b/s+1e-9))}const d=l.map((m,b)=>{const y=l.slice(Math.max(0,b-4),b),p=y.length?y.reduce((g,w)=>g+w,0)/y.length:m;return Math.max(0,m-p)}),u=Math.max(1,Math.floor(l.length/o/8)),c=d.map((m,b)=>({f:m,i:b})).filter(m=>m.i>0&&m.f>.3).sort((m,b)=>b.f-m.f),h=[];for(const m of c){if(h.length>=o-1)break;h.every(b=>Math.abs(b-m.i)>=u)&&h.push(m.i)}const f=h.map(m=>m*s/r).filter(m=>m>.001&&m<.999);for(let m=1;f.length<o-1&&m<o;m++){const b=m/o;f.every(y=>Math.abs(y-b)>.5/o)&&f.push(b)}for(let m=1;f.length<o-1;m++)f.push(m/(o+1));return f.sort((m,b)=>m-b).slice(0,o-1)}function mo(t=wc()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},o=r=>typeof a[r]=="number"&&Number.isFinite(a[r])?a[r]:0;return a.saved!==!0||!o("id")||!o("frames")||!o("sampleRate")?[]:[{id:o("id"),bars:o("bars"),bpm:o("bpm"),sampleRate:o("sampleRate"),channels:Math.min(2,Math.max(1,o("channels"))),frames:o("frames")}]}):[]}catch{return[]}}async function yc(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const a=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),o=new Float32Array(await a.arrayBuffer());return o.length<t.frames*t.channels?null:Array.from({length:t.channels},(r,s)=>o.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function wc(){try{return globalThis.localStorage??null}catch{return null}}const vc=150,fo=96*1024*1024,kc=t=>Math.round(t*10)/10;function $c(t,e,n){if(!t.sample||!t.fit||!t.keepPitch||!e)return null;const[a,o]=lo(t,e,null);if(o-a<2)return null;const r=kc(n);return{sample:t.sample,from:a,to:o,bars:t.fit,bpm:r,semitones:t.tune+t.fine/100,sampleRate:e.sampleRate,frames:co(t.fit,r,e.sampleRate)}}function Ze(t){return`${t.sample}:${t.from}-${t.to}:${t.bars}:${t.bpm.toFixed(1)}:${Math.round(t.semitones*100)}`}const xc=t=>`stretch:${t}`,Sc=t=>t.startsWith("stretch:");class Ac{constructor(e=fo,n=()=>{}){this.maxBytes=e,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(e){return this.map.has(e)}get(e){const n=this.map.get(e);return n&&(this.map.delete(e),this.map.set(e,n)),n}byId(e){for(const n of this.map.values())if(n.sample===e)return n}put(e,n=new Set){const a=this.map.get(e.key);a&&(this.bytes-=a.bytes),this.map.delete(e.key),this.map.set(e.key,e),this.bytes+=e.bytes;for(const[o,r]of this.map){if(this.bytes<=this.maxBytes)break;o===e.key||n.has(o)||(this.map.delete(o),this.bytes-=r.bytes,this.drop(r))}}}class Mc{constructor(e,n=fo){this.host=e,this.cache=new Ac(n,a=>e.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(e,n,a){this.wanted.clear();const o=[];e.forEach((d,u)=>{const c=d.sample?n(d.sample):void 0,h=$c(d,c,a),f=this.current.get(u);if(!h){this.current.delete(u);return}this.wanted.set(u,h);const m=Ze(h),b=this.cache.get(m);b?this.current.set(u,b):(f&&!Lc(f.job,h)&&this.current.delete(u),this.inFlight.has(m)||o.push(m))});const r=o.join("|");if(!o.length||this.failed){this.missingSig="";return}if(r===this.missingSig&&this.timer!==null)return;this.missingSig=r;const s=this.host.clearTimeout??(d=>clearTimeout(d)),l=this.host.setTimeout??((d,u)=>setTimeout(d,u));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},vc)}stretchedFor(e){return this.current.get(e)}renderFor(e){return this.current.get(e)}pending(e){const n=this.wanted.get(e);return n?this.current.get(e)?.key!==Ze(n):!1}renderWanted(){for(const e of new Map([...this.wanted.values()].map(n=>[Ze(n),n])).values()){const n=Ze(e);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,e)))}}idle(){return this.queue}async renderOne(e,n){if(![...this.wanted.values()].some(s=>Ze(s)===e)){this.inFlight.delete(e);return}const a=Date.now();let o=null;try{o=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(e),!o){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const r={key:e,job:n,sample:xc(e),frames:n.frames,bytes:o.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(r,o);for(const[s,l]of this.wanted)Ze(l)===e&&this.current.set(s,r);this.cache.put(r,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const Lc=(t,e)=>t.sample===e.sample&&t.from===e.from&&t.to===e.to,Ec=48e3;function go(t,e){try{const n=t?.latency?.(e);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=Ec?Math.round(n):0}catch{return 0}}function Tc(t,e){return{from:t.from+e,to:t.to+e}}const Cc="instance",Nc=99;function cn(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Cc)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Nc?n:1}function Ic(t,e){return e===1?t:`${t}#${e}`}function Rc(t,e){return e===1?t:`${t} ${e}`}let _e;function zc(t,e=cn()){if(_e!==void 0)return _e;_e=null;try{if(typeof window>"u"||window.parent===window)return _e;const n=window.parent.ncStudio;n&&n.version===1&&(_e=n.attach(t,{instance:e}))}catch{}return _e}function Pc(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,o,r)=>n.request(`${a}${e}`,o,r)}:null}}function Bc(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Re(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function Kt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function Fn(t,e=cn()){return e>1?`${t}#${e}`:t}function Oc(t,e=cn()){const n=Kt()?.owner()??null;return n===null||n==="studio"||n===Fn(t,e)}const Wc="nyx",Fc=1;function bo(t){const e={nyx:1,...Un(t)};if(Array.isArray(t.slots)){const n=Array.from({length:Ve},(o,r)=>{const s=t.slots?.[r];return s?Yl(s):null}),a=typeof t.active=="number"&&n[t.active]?t.active:null;Object.assign(e,{slots:n,active:a})}return e}function yo(t){return wo(t),qt(t)}function jc(t){wo(t);const e=t;if(!Array.isArray(e.slots))return null;const n=e.slots,a=Array.from({length:Ve},(s,l)=>{const d=n[l];return d&&typeof d=="object"&&!Array.isArray(d)?qt(d):null}),o=e.active,r=typeof o=="number"&&Number.isInteger(o)&&o>=0&&o<Ve&&a[o]?o:null;return{slots:a,active:r}}function wo(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Not a NYX pattern.");const e=t.nyx;if(e!==1)throw new Error(`Not a NYX pattern${typeof e=="number"?` (version ${e})`:""}.`)}function ea(){try{return globalThis.localStorage??null}catch{return null}}function Hc(t,e,n=ea()){let a;try{a=e?.storageKey?.(t)}catch{a=void 0}if(typeof a!="string"||!a||a===t)return t;try{if(n&&n.getItem(a)===null){const o=n.getItem(t);o!==null&&n.setItem(a,o)}}catch{}return a}const Gc="nyx.state",vo="nyx.scene-samples",Dc=/^[0-9a-f]{16,64}$/;function ko(t){try{const e=JSON.parse(t?.getItem(vo)??"[]");return Array.isArray(e)?e.filter(n=>typeof n=="string"&&Dc.test(n)):[]}catch{return[]}}function Yc(t,e=ea()){if(!e)return;const n=new Set;for(const o of[t,...t.slots??[]])for(const r of o?.pads??[])r.sample&&n.add(r.sample);if(!n.size)return;const a=[...ko(e).filter(o=>!n.has(o)),...n].slice(-2048);try{e.setItem(vo,JSON.stringify(a))}catch{}}function Xc(t,e=ea()){const n=wt(t);if(!e)return n;try{for(let a=0;a<e.length;a++){const o=e.key(a);if(o?.startsWith(Gc))try{for(const r of wt(no(JSON.parse(e.getItem(o)??"null"))))n.add(r)}catch{}}}catch{return null}for(const a of ko(e))n.add(a);return n}const Zc="NYX Sampler",Ut="nyx",le=cn(),ee=zc(Ut,le),$o=Hc(Ic("nyx.state",le),ee),ta=.15,$=Xl($o),V=new fc(le>1?`nyx-${le}`:"nyx"),dn=()=>Zl($o,$),nt=()=>{const t=Xc($);if(t&&te?.before.pad.sample&&t.add(te.before.pad.sample),t)for(const e of aa)t.add(e);t&&V.prune(t)};let ae=!1,ze=0,ie=null,Je=!1,Fe="",C="";const Qe=new Map;let xo=[],At=new Map;const ue=new Qo({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let z=null,Ht=null;const _c=new dr({...Pc(),app:Rc(Zc,le),version:"0.1.0",clock:ue,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=z?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),kt=t=>t+(Ht?.offset??0),P=()=>ue.transport,et=()=>P().isPlayingAt(Z()),$t=()=>et()&&!ae;let xn=null,D=null,ge=null,Vt=null,ii=null;const oi=new Set;function ce(){return ii??=(async()=>{ee?(z=ee.ctx,xn=ee.output,Ht=ee.mapper??new $a(ee.ctx)):(z=new AudioContext({latencyHint:"interactive"}),xn=z.destination,Ht=new $a(z)),Ht.start();try{await z.audioWorklet.addModule(dc)}catch{return C="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}D=new AudioWorkletNode(z,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),D.port.onmessage=t=>qc(t.data),ge=Xr(z,{moduleUrl:Bc()??qr,bpm:P().bpm,slots:3,state:Wn($.hacks)}),jn=Wn($.hacks),Vt=new GainNode(z,{gain:$.master}),D.connect(ge.input),ge.output.connect(Vt).connect(xn),_r(ge,ue,{toAudioTime:kt,now:Z});for(const t of wt($))await un(t);return He(),at(),!0})(),ii}async function un(t){const e=await V.get(t);return e?(Qe.has(t)||Qe.set(t,ho(e.data)),D&&!oi.has(t)&&(oi.add(t),D.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function qc(t){t.type!=="pos"||!t.voices||(xo=t.voices,At=new Map(t.voices.map(([e,n,a,o])=>{const r=Sc(o)?xe.cache.byId(o):void 0,s=r?V.info(r.job.sample):void 0;return r&&s?[e,(r.job.from+n/r.frames*(r.job.to-r.job.from))/s.frames]:[e,n/Math.max(1,a)]})))}let Gt=null,Kc=0;const ut=new Map,So=[],Uc=.25;function Vc(){if(Gt)return Gt;const t=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return t.onmessage=e=>{const n=e.data;ut.get(n.id)?.(n),ut.delete(n.id)},t.onerror=e=>{console.error("NYX stretch worker",e.message);for(const n of ut.values())n({error:e.message||"worker failed"});ut.clear()},Gt=t,t}async function Jc(t){const e=await V.get(t.sample);if(!e)return null;const n=Math.ceil(Uc*t.sampleRate),a=Math.max(0,t.from-n),o=Math.min(e.frames,t.to+n),r=e.data.map(d=>d.slice(a,o)),s=++Kc,l=Vc();return new Promise(d=>{ut.set(s,u=>{if(u.error||!u.channels){console.error("NYX stretch",u.error),d(null);return}typeof u.ms=="number"&&So.push(Math.round(u.ms)),d(u.channels)}),l.postMessage({id:s,channels:r,sampleRate:t.sampleRate,from:t.from-a,to:t.to-a,frames:t.frames,semitones:t.semitones},r.map(u=>u.buffer))})}const xe=new Mc({run:Jc,deliver(t,e){D?.port.postMessage({type:"sample",hash:t.sample,channels:e,rate:t.job.sampleRate},e.map(n=>n.buffer))},drop(t){D?.port.postMessage({type:"drop",hash:t.sample})},changed(){xe.failed&&!C&&(C="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),He(),T()}});function He(){if(!D)return;const t=P().bpm,e=n=>V.info(n);xe.plan($.pads,e,t),D.port.postMessage({type:"program",program:cc($,e,t,n=>xe.stretchedFor(n))})}let ri="";function at(t=!1){if(!D)return;const e=P(),n=$t();let a=0,o=e.bpm;if(e.running){const s=Math.max(0,e.beatAt(Z())),l=e.timeAt(s);o=60/(e.timeAt(s+1)-l),a=kt(l)-s*60/o}const r=JSON.stringify([n,Math.round(a*2e3),o,ze]);!t&&r===ri||(ri=r,D.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:o,join:ze}}))}let jn=null;function Ao(){if(!ge)return;const t=Wn($.hacks),e=Ul(jn,t);if(jn=t,e.whole)ge.setState(t);else for(const[n,a,o]of e.params)ge.setParam(n,a,o)}let ft=null;function Qc(){if(ft){const e=ft;_(()=>{$.lanes=e}),C="Pattern back.",T();return}const t=structuredClone($.lanes);t.some(e=>e.steps.some(n=>n.on)||e.mute||e.solo||e.length!==oe)&&(_(()=>{$.lanes=$.lanes.map(()=>ln())}),ie=null,ft=t,C="Pattern cleared: press Undo to bring it back.",T())}function _(t){ft=null;const e=sa(!1);t(),e&&nt(),$.active!==null&&(Je=!0),Fe="",dn(),He(),Ao(),T()}const F=t=>$.pads[t]??Pe(t),fe=t=>$.lanes[t]??ln(),Mo=()=>F($.selected);function pn(t,e=$.selected){_(()=>t(F(e)))}function Jt(t,e,n){_(()=>{const a=fe(t).steps[e];a&&n(a)})}function ve(t,e=!0){$.selected=Math.max(0,Math.min(ke-1,t)),ie&&ie.lane!==$.selected&&(ie=null),dn(),e&&Ee($.selected),T()}async function Ee(t,e=null,n=!1){if(!await ce()||!z||!D)return;z.state!=="running"&&await z.resume().catch(()=>{});const a=F(t),o=a.sample?lc(a,V.info(a.sample),P().bpm,e,xe.stretchedFor(t)):null;o&&D.port.postMessage({type:"play",pad:t,hit:o,hold:n})}async function it(t,e,n,a,o=!0){const{sample:r,saved:s}=await V.put(e,n);await un(r.hash),_(()=>{const l=F(t);l.sample=r.hash,l.name=a.slice(0,24)||`Pad ${t+1}`,l.start=0,l.end=1,l.slices=0,l.cuts=[],l.fit=0,l.keepPitch=!0}),C=s?"":"Kept until you reload: this browser has no file storage here.",nt(),o&&Ee(t)}async function na(t,e=$.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await ld(t);return}if(!await ce()||!z)return;let n;try{n=await z.decodeAudioData(await t.arrayBuffer())}catch{C=`Couldn't read ${t.name}: not an audio file this browser can decode.`,T();return}const{data:a,trimmed:o}=gc(n);await it(e,a,n.sampleRate,t.name.replace(/\.[^.]+$/,"")),o&&(C=`${t.name} was cut to its first minute.`,T())}const aa=new Set;let te=null;function tt(t,e=F(t).name){const n=`Pad ${t+1}`;return e===n?n:`${n} (${e})`}async function ia(t,e,n=""){return F(t).sample?Ti({title:`Replace ${tt(t)}?`,body:e==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":e==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function oa(t){const e=Ol($,t);return e.pad.sample&&aa.add(e.pad.sample),e}function ra(t,e){sa();const n=vl({message:t.pad.sample?`${e}: replaced ${tt(t.index,t.pad.name)}.`:`${e} onto Pad ${t.index+1}.`,actionLabel:"Undo",onAction:()=>void la(),onClose:()=>{te&&(te.toast=null)}}),a=n.el.querySelector("button");a instanceof HTMLElement&&K(a,X("grab-undo"),a),te={before:t,what:e,toast:n},t.pad.sample&&aa.delete(t.pad.sample)}function sa(t=!0){if(!te)return!1;const e=te;return te=null,e.toast?.close(),t&&nt(),!0}async function la(){const t=te;if(!t)return!1;te=null,t.toast?.close();const e=t.before.pad.sample;return e&&await un(e),_(()=>Wl($,t.before)),ie?.lane===t.before.index&&(ie=null),C=`Undone: ${tt(t.before.index)} is back as it was.`,nt(),T(),!0}const O={from:"master",bars:1,busy:!1};async function ca(){const t=Re();if(!t||O.busy||!await ce()||!z)return;const e=P();if(!e.running){C="Play first: Grab takes the bars that just played.",T();return}const n=O.bars,a=Math.floor(e.beatAt(Z())/4)*4,o=a-4*n;if(o<0){C=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const r=z.sampleRate,{from:s,to:l}=Tc({from:Math.round(kt(e.timeAt(o))*r),to:Math.round(kt(e.timeAt(a))*r)},go(t,O.from)),d=$.selected;if(O.busy=!0,T(),!await ia(d,"Grab")){O.busy=!1,T();return}const u=await t.take(O.from,s,l);O.busy=!1;const c=t.sources().find(m=>m.id===O.from)?.name??O.from;if(!u){C=`${c} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let h=0;for(const m of u)for(const b of m)h=Math.max(h,Math.abs(b));if(h<1e-4){C=`${c} was silent for those ${n===1?"bar":"bars"}.`,T();return}const f=oa(d);await it(d,u,r,`${c} grab`),n===1?(_(()=>{const m=F(d);m.fit=1,m.keepPitch=!0,m.slices=16,m.cuts=[],m.decay=4;const b=fe(d);b.length=oe;for(const y of b.steps)Object.assign(y,sn(),{on:!0})}),C=`Grabbed a bar of ${c}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(pn(m=>{m.fit=n,m.keepPitch=!0},d),await Hn(8,"transients",d),C=`Grabbed ${n} bars of ${c}, fitted to ${n} bars and sliced at the hits.`),ra(f,`Grabbed ${n===1?"a bar":`${n} bars`}`),T()}const si=240,ed=.25,S={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function da(t){const e=Math.floor(t/4)*4;return t-e<ed?e:e+4}function td(t){const e=z?.sampleRate??48e3;return Math.round(kt(P().timeAt(t))*e)}function Lo(t){const e=z?.sampleRate??48e3;return S.fromFrame+Math.round((t-S.startBeat)*60/S.bpm*e)}function Qt(t=S.source){return Re()?.sources().find(e=>e.id===t)?.name??t}function ua(){S.phase==="idle"?nd():S.phase==="armed"?(S.phase="idle",C="",T()):S.phase==="rec"&&pa()}async function nd(){const t=Re();if(!t?.record){C="Take needs the Studio (reload it to update).",T();return}if(!await ce()||!z)return;const e=$.selected;if(await ia(e,"Take")&&S.phase==="idle"){if(S.source=O.from,S.pad=e,t.listen(S.source),!P().running){S.phase="armed",C="Take armed: starts with the music.",T();return}Eo()}}function Eo(){const t=Re();if(!t?.record||!z){S.phase="idle";return}const e=P();S.startBeat=Math.max(0,da(e.beatAt(Z()))),S.fromFrame=td(S.startBeat),S.bpm=e.bpm,S.latency=go(t,S.source);const n=t.record(S.source,S.fromFrame+S.latency);if(!n){S.phase="idle",C=`${Qt()} can't be recorded.`,T();return}S.rec=n,S.phase="rec",S.warned=!1,S.lastBar=S.startBeat,S.lastBarFrame=S.fromFrame,C=`Taking ${Qt()}: stop on any bar.`,window.clearInterval(S.timer),S.timer=window.setInterval(ad,200),T()}function ad(){if(S.phase!=="rec")return;const t=P();if(!t.running)return;const e=t.beatAt(Z()),n=Math.floor(e/4)*4;n>S.lastBar&&(S.lastBar=n,S.lastBarFrame=Lo(n));const a=240/Math.max(1,t.bpm),o=(Math.max(S.startBeat+4,da(e))-S.startBeat)*60/Math.max(1,t.bpm);if(o+a>si){pa();return}!S.warned&&o>si-30&&(S.warned=!0,C="Take stops at four minutes: about 30 seconds left.");const r=To();r!==S.label&&(S.label=r,T())}function To(){if(S.phase==="armed")return"Armed: waits for Play";if(S.phase==="saving")return"Saving take…";if(S.phase!=="rec")return"Take";const t=P().beatAt(Z());return t<S.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((t-S.startBeat)/4)+1}`}async function pa(t=!1){const e=S.rec;if(S.phase!=="rec"||!e)return;window.clearInterval(S.timer);let n,a;t?(n=S.lastBar,a=S.lastBarFrame):(n=Math.max(S.startBeat+4,da(P().beatAt(Z()))),a=Lo(n));const o=Math.round((n-S.startBeat)/4);if(S.rec=null,o<1){e.cancel(),S.phase="idle",C="The music stopped before a whole bar was taken.",T();return}S.phase="saving",T();try{await id(e,a,o,n)}finally{S.phase="idle",T()}}async function id(t,e,n,a){let o=null;try{o=await t.stop(e+S.latency)}catch(l){console.error("NYX take",l)}const r=Qt();if(!o?.[0]?.length){C=`The take from ${r} came back empty.`,T();return}let s=0;for(const l of o)for(const d of l)s=Math.max(s,Math.abs(d));if(s<1e-4){C=`${r} was silent for the whole take.`,T();return}try{await od(o,n,a,r)}catch(l){console.error("NYX take",l),C=`The take from ${r} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,T()}}async function od(t,e,n,a){const o=S.pad,r=`${a} take`.slice(0,20),s=$.pads.filter(u=>u.name.startsWith(r)).length+1,l=oa(o);await Co(o,t,z?.sampleRate??48e3,e,Math.round(S.startBeat/4),{name:`${r} ${s}`,endBeat:n}),ra(l,`Took ${e===1?"a bar":`${e} bars`}`),C=e<=yt?`${e} bar${e===1?"":"s"} of ${a} on ${F(o).name}: it loops every ${e===1?"bar":`${e} bars`}. Tap the pad to play it any time.`:`${e} bars of ${a} on ${F(o).name}. Longer than ${yt} bars, so it plays from the pad (tap or hold it), not the grid.`,T()}async function Co(t,e,n,a,o,r){await it(t,e,n,r.name,!1);const s=a<=yt;_(()=>Fl($,t,a,o));const l=P(),d=r.endBeat;if(d!==void 0&&s&&l.running&&D&&z){const u=F(t),c=fe(t).steps[0],h=c?Qn(u,0,c,V.info(u.sample??""),l.bpm,!1,xe.stretchedFor(t)):null,m=l.beatAt(Z()+ta)-d;if(h&&m>0&&m<4*a){const b=Math.round(m*60/l.bpm*n*h.rate);h.from+b<h.to-1&&D.port.postMessage({type:"play",pad:t,hit:{...h,from:h.from+b,attack:.005}})}}}let Sn=!1;function No(){return $.pads.map((t,e)=>({id:String(e+1),name:tt(e),...t.sample?{filled:!0}:{}}))}async function Io(t,e){const n=jl(e,$.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${e}.`};if(Sn||S.phase!=="idle"&&S.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await ce()||!z)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};Sn=!0;try{const a=`${t.fromName}'s ${t.name}`;if(ve(n,!1),ee?.reveal?.(),T(),F(n).sample&&!await ia(n,"Sent",a))return C=`Kept ${tt(n)}: ${a} was not placed.`,T(),{ok:!1,reason:"cancelled"};const o=t.channels.map(d=>new Float32Array(d)),r=t.bars,s=oa(n),l=t.name.slice(0,24);return r!==void 0&&Number.isInteger(r)&&r>=1?(await Co(n,o,t.sampleRate,r,0,{name:l}),C=r<=yt?`${a} on Pad ${n+1}: fitted to ${r===1?"a bar":`${r} bars`}, it loops every ${r===1?"bar":`${r} bars`}.`:`${a} on Pad ${n+1}: ${r} bars, so it plays from the pad, not the grid.`):(await it(n,o,t.sampleRate,l,!1),C=`${a} on Pad ${n+1}.`),ra(s,a),T(),{ok:!0,target:e,targetName:tt(n)}}finally{Sn=!1}}async function rd(t){const e=await yc(t);if(!e){C=`LUCY take ${t.id} could not be read.`,T();return}await it($.selected,e,t.sampleRate,`LUCY take ${t.id}`)}async function Ro(){const t=$.selected,e=F(t);!e.sample||!await Ti({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(_(()=>{$.pads[t]=Pe(t)}),nt())}async function Hn(t,e,n=$.selected){const a=F(n);let o=[];if(t&&e==="transients"&&a.sample){const r=await V.get(a.sample);r&&(o=bc(r.data,r.sampleRate,Math.floor(a.start*r.frames),Math.ceil(a.end*r.frames),t))}pn(r=>{r.slices=t,r.cuts=o},n)}function zo(t,e){const n=Qi[t]??String(t+1);if(sa(),e==="store")$.slots[t]=Un($),$.active=t,Je=!1,Fe=`Stored in ${n}`;else if(e==="clear")$.slots[t]=null,$.active===t&&($.active=null),Fe=`Cleared ${n}`,nt();else{const a=$.slots[t];if(!a){Fe=`${n} is empty: Shift-click or long-press to store`,T();return}Po(a),$.active=t,Je=!1,Fe=`Recalled ${n}`}dn(),He(),Ao(),T()}function Po(t){const e=structuredClone(t);$.pads=e.pads,$.lanes=e.lanes,$.swing=e.swing,$.hacks=e.hacks,ie=null;for(const n of wt($))un(n).then(()=>He())}async function Bo(){if(await ce(),z&&z.state!=="running"&&await z.resume().catch(()=>{}),ee&&et()){if(!ae&&Kt()?.owner()===Fn(Ut,le)){ue.stop({at:Z()});return}if(ae=!ae,!ae){const t=P();ze=t.nextBar(t.beatAt(Z()+ta))}at(!0),T();return}et()?ue.stop({at:Z()}):(ae=!1,ze=0,ee&&Kt()?.claim(Fn(Ut,le)),ue.play({at:Z()}))}let li=P().running;ue.onChange(()=>{P().running&&!li&&ee&&(ae=!Oc(Ut,le)),li=P().running,P().running&&S.phase==="armed"&&Eo(),!P().running&&S.phase==="rec"&&pa(!0),P().running||(ae=!1,ze=0),He(),at(!0),T()});Kt()?.onAll(()=>{if(ae){if(ae=!1,et()){const t=P();ze=t.nextBar(t.beatAt(Z()+ta))}at(!0),T()}});function sd(){const t=bo($),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${le>1?`-${le}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function ld(t){let e;try{e=JSON.parse(await t.text()),yo(e)}catch{C=`Couldn't read ${t.name}: not a NYX pattern.`,T();return}await Oo(e,`Loaded ${t.name}.`)}async function Oo(t,e){const n=yo(t),a=jc(t);_(()=>{a&&($.slots=a.slots,$.active=a.active),Po(n)}),a&&(Je=$.active!==null&&JSON.stringify(Un($))!==JSON.stringify($.slots[$.active])),Fe="";const o=[],r=new Set;for(const l of $.pads)l.sample&&!await V.get(l.sample)&&o.push(l.name);for(const l of $.slots)for(const d of l?.pads??[])d.sample&&!$.pads.some(u=>u.sample===d.sample)&&r.add(d.sample);let s=0;for(const l of r)await V.get(l)||s++;C=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:s?`${e} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:e,He(),T()}function cd(){D?.port.postMessage({type:"stop"}),et()&&(ee?ae=!0:ue.stop({at:Z()})),at(!0),ge?.clear({fadeMs:20}),T()}function dd(t){$.master=Math.min(1,Math.max(0,t)),dn(),Vt&&z&&Vt.gain.setTargetAtTime($.master,z.currentTime,.01),xt.value=String($.master),ha.textContent=`${Math.round($.master*100)}%`}const Y=(t,e={},...n)=>{const a=document.createElement(t);for(const[o,r]of Object.entries(e))a.setAttribute(o,r);return a.append(...n),a},hn=document.getElementById("app");hn.classList.add("nc","nc-page");xl();const Wo=Y("header",{class:"nc-page-hd"},Y("div",{},Y("h1",{class:"nc-page-title",...ec("page:title")},Y("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",Y("span",{class:"nc-page-sep"},"/")," SAMPLER ",Y("span",{class:"nc-page-sep"},"/")," ",Y("span",{class:"nc-mono"},String(le).padStart(2,"0"))),Y("p",{class:"nc-page-sub"},"A NetComposer element."))),xt=Y("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String($.master),"data-nc-id":"nyx-master"});xt.addEventListener("input",()=>dd(Number(xt.value)));const ha=Y("span",{class:"nc-readout","data-nc-readout":""});ha.textContent=`${Math.round($.master*100)}%`;const ci="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",je=Y("input",{type:"file"});je.hidden=!0;let di="pad";je.addEventListener("change",()=>{const t=je.files?.[0];je.value="",t&&na(t)});function ma(t){di=t,je.accept=di==="pad"?ci:`${ci},.json,application/json`,je.click()}const An=(t,e)=>{const n=Y("button",{type:"button",class:"nc-page-action","data-nyx-action":t.toLowerCase()},t);return K(n,X(`page:${t.toLowerCase()}`),n),n.addEventListener("click",e),n},Fo=Y("label",{class:"nc-label",for:"nyx-master"},"Master");K(Fo,X("page:master"),xt);Wo.append(Y("div",{class:"nc-page-actions"},Y("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},Fo,xt,ha),An("Save",sd),An("Load",()=>ma("any")),An("Panic",cd),je));const se=Y("div",{class:"nc-stack","data-nc-layout":"adjacent"});hn.append(Wo,Y("main",{class:"nc-page-body"},se));hn.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});hn.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),na(e))});function ud(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function jo(){return et()?ae?"Sitting out":P().beatAt(Z())<ze?"Joining on the next bar":"Playing":$.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function pd(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const Ho=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],St={fill:!1,perform:null};function en(t){St.fill!==t&&(St.fill=t,D?.port.postMessage({type:"fill",on:t}),T())}function Gn(t){St.perform!==t&&(St.perform=t,D?.port.postMessage({type:"perform",mode:t}),T())}function hd(t){const e=o=>{const s=(o.target instanceof Element?o.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return Ho.some(d=>d.mode===l)?l:null},n=o=>{ce(),o==="fill"?en(!0):Gn(o)},a=()=>{en(!1),Gn(null)};t.addEventListener("pointerdown",o=>{const r=e(o);if(!r)return;o.preventDefault(),n(r);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",o=>{if((o.key===" "||o.key==="Enter")&&!o.repeat){const r=e(o);if(!r)return;o.preventDefault(),n(r)}}),t.addEventListener("keyup",o=>{(o.key===" "||o.key==="Enter")&&e(o)&&a()}),window.addEventListener("blur",a)}function md(){return{id:"transport",title:"Transport",status:Fe,controls:[{type:"button",id:"play",label:$t()?"Stop":"Play",on:$t(),onPress:()=>void Bo()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:St.perform??"",options:Ho.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(P().bpm),valueText:`${Math.round(P().bpm)} BPM`,onChange:t=>{ue.setTempo({bpm:t}),T()}},{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:$.swing,valueText:we($.swing),onChange:t=>_(()=>{$.swing=t})},{type:"readout",id:"status",label:"Status",value:jo()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:Qi.map((t,e)=>({label:t,filled:$.slots[e]!=null,active:$.active===e,edited:$.active===e&&Je})),onMorph:()=>{},onSlot:(t,e)=>zo(t,e)}]}}function Go(){if(!$t())return-1;const t=P().beatAt(Z());return t<0||t<ze?-1:Math.floor(t/ic)%oe}function fd(){const t=Mo(),e=Go();return{id:"pattern",title:"Pattern",lead:!0,summary:`${$.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${$.selected}`,rows:$.lanes.map((n,a)=>({id:`pad-${a}`,label:F(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(o=>({on:o.on,accent:o.accent,velocity:o.velocity,dim:!F(a).sample}))})),onToggle:(n,a,o)=>Jt(n,a,r=>{o?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,a,o,r)=>Jt(n,a,s=>{o==="on"?(s.on=r,r||(s.accent=!1)):(s.accent=r,r&&(s.on=!0))}),onSelectRow:n=>ve(n),onLongPress:(n,a)=>{ie={lane:n,step:a},ve(n,!1)},onMute:n=>_(()=>{fe(n).mute=!fe(n).mute}),onSolo:n=>_(()=>{fe(n).solo=!fe(n).solo}),onLength:(n,a)=>_(()=>{fe(n).length=Math.max(1,Math.min(oe,a))}),transport:{playing:$t(),onToggle:()=>void Bo()},onFill:n=>en(n),onClear:()=>Qc(),clearLabel:ft?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:$.selected,pads:$.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:n.sample?Qe.get(n.sample):void 0,lane:a%4+1,playing:At.has(a),badge:n.choke?Dn[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Dn[n.choke-1]}`:void 0})),onDown:n=>yd(n),onPress:n=>wd(n),onFile:(n,a)=>{ve(n,!1),na(a,n)},onMove:(n,a,o)=>vd(n,a,o),menu:n=>$d(n),onMenu:(n,a)=>void xd(n,a),onRename:(n,a)=>kd(n,a)}]}]}}function gd(t){if(!ie||ie.lane!==$.selected)return[];const{lane:e,step:n}=ie,a=fe(e).steps[n];if(!a)return[];const o=r=>Jt(e,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:we(a.velocity),onChange:r=>o(s=>{s.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:we(a.chance),onChange:r=>o(s=>{s.chance=r})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(r,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:r=>o(s=>{s.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:vt(a.pitch," st"),onChange:r=>o(s=>{s.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:Pn.map(r=>({value:r,label:pd(r)})),onChange:r=>o(s=>{Pn.includes(r)&&(s.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>o(s=>{s.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{ie=null,T()}}]}function bd(){const t=Re();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:t.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:O.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{O.from=n,t.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(O.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{O.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:O.busy?"Grabbing…":O.bars===1?"Grab last bar":`Grab last ${O.bars} bars`,on:O.busy,onPress:()=>void ca()},...t.record?[{type:"button",id:"take",label:To(),on:S.phase!=="idle",onPress:()=>ua()}]:[]]}let tn=-1;function yd(t){if(!F(t).sample)return;tn=t,ve(t);const e=()=>{tn=-1};window.addEventListener("pointerup",()=>setTimeout(e),{once:!0})}function wd(t){if(tn===t){tn=-1;return}if(!F(t).sample){ve(t,!1),ma("pad");return}ve(t)}function vd(t,e,n){_(()=>{const a=structuredClone(F(t)),o=structuredClone(F(e));$.pads[e]=a,n||($.pads[t]=o.sample?o:Pe(t))}),ve(e,!1)}const Dn=["A","B","C","D"];function kd(t,e){pn(n=>{n.name=e.slice(0,24)},t)}function $d(t){const e=!!F(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}];for(const a of mo().slice(-4).reverse())n.push({id:`take-${a.id}`,label:`LUCY take ${a.id}`});return Re()&&n.push({id:"grab",label:O.bars===1?"Grab the last bar":`Grab the last ${O.bars} bars`}),Re()?.record&&n.push({id:"record",label:S.phase==="rec"?"Stop the take":`Take from ${Qt(O.from)}`}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function xd(t,e){if(ve(t,!1),e==="load")ma("pad");else if(e==="grab")await ca();else if(e==="record")ua();else if(e==="clear")await Ro();else if(e.startsWith("take-")){const n=mo().find(a=>`take-${a.id}`===e);n&&await rd(n)}}const fa=new ac;document.addEventListener("keydown",t=>{!te||t.repeat||t.shiftKey||t.altKey||!(t.metaKey||t.ctrlKey)||t.key.toLowerCase()!=="z"||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]")||(t.preventDefault(),la())});const Do=t=>D?.port.postMessage({type:"release",pad:t});document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=so(t);n<0||!F(n).sample||(t.preventDefault(),!(fa.press(t)<0)&&Ee(n,null,!0))});document.addEventListener("keyup",t=>{const e=fa.release(t);e>=0&&Do(e)});window.addEventListener("blur",()=>{for(const t of fa.releaseAll())Do(t)});function ga(t){const e=X("kit:pad-key");t.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const o=nc[a];if(!o)return;let r=n.querySelector(":scope > .nyx-pad-key");r||(r=Y("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(r)),r.textContent!==o&&(r.textContent=o),K(r,e)})}function Yo(t){const e=t.querySelector('[data-nc-id="fit-speed"]');if(!e)return;const n=Mo(),a=n.sample?V.info(n.sample):void 0,o=Number((a?uo(n,a,P().bpm):1).toFixed(2)),r=n.keepPitch&&(o<ai[0]||o>ai[1]);e.toggleAttribute("data-nyx-far",r)}function Sd(){const t=$.selected,e=F(t),n=e.sample?V.info(e.sample):void 0,a=Jn(e).slice(1,-1),o=e.end-e.start,r=n?n.frames/n.sampleRate:0,s=!!e.sample,l=s&&!n,d=c=>pn(c),u=s?[{type:"readout",id:"sample",label:"Length",value:l?"Not in this browser: load it again":`${We(r*o)} of ${We(r)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:c=>d(h=>{h.mode=c})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:c=>d(h=>{(c==="fwd"||c==="rev"||c==="pingpong")&&(h.dir=c)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:We(e.start*r),onChange:c=>d(h=>{h.start=Math.min(c,h.end-.002)}),onCommit:()=>void Ee(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:We(e.end*r),onChange:c=>d(h=>{h.end=Math.max(c,h.start+.002)}),onCommit:()=>void Ee(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:eo.map(c=>({value:String(c),label:c?`${c}`:"Off"})),onChange:c=>void Hn(Number(c),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:c=>void Hn(e.slices,c==="transients"?"transients":"even")}]:[],{type:"group",id:"tune-shape",title:"Tune & shape",summary:ql(e),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:vt(e.tune," st"),onChange:c=>d(h=>{h.tune=c}),onCommit:()=>void Ee(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:vt(e.fine," ct"),onChange:c=>d(h=>{h.fine=c})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(c=>({value:String(c),label:`${c} bar${c===1?"":"s"}`}))],onChange:c=>d(h=>{h.fit=Number(c)})},...e.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:e.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:c=>d(h=>{h.keepPitch=c==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${_l(uo(e,n,P().bpm))}${e.keepPitch&&xe.pending(t)&&!xe.failed?" · stretching…":""}`}]:[],{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,value:e.attack,valueText:We(e.attack),onChange:c=>d(h=>{h.attack=c})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,value:e.decay,valueText:Ft(e.decay),onChange:c=>d(h=>{h.decay=c}),onCommit:()=>void Ee(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:Wt(e.cutoff),onChange:c=>d(h=>{h.cutoff=Math.abs(c)<.02?0:c})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:we(e.resonance),onChange:c=>d(h=>{h.resonance=c})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:we(e.level),onChange:c=>d(h=>{h.level=c})},{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:ud(e.pan),onChange:c=>d(h=>{h.pan=Math.abs(c)<.02?0:c})},{type:"select",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},...Dn.map((c,h)=>({value:String(h+1),label:`Group ${c}`}))],onChange:c=>d(h=>{h.choke=Number(c)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Ro()}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?Qe.get(e.sample)??[]:[],region:[e.start,e.end],markers:a.map(c=>e.start+c*o),position:At.get(t)??-1}]:[],...C?[{type:"note",id:"notice",text:C}]:[],...gd(e),...u,...bd()]}}function Yn(t,e){_(()=>e($.hacks[t]))}function Ad(t,e){const n=$.hacks[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,o=r=>Yn(t,s=>{s.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>o(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:yi(e,n,P().bpm),onChange:o}}const Rt=(t,e)=>(Se(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>Ad(t,n));function Md(){const t=$.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,a=r=>_(()=>r($.hacks.filter)),o=[ro(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,onToggle:r=>a(s=>{s.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(s=>{(r==="lp"||r==="hp"||r==="bp")&&(s.mode=r)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":On(oo(e.cutoff)),onChange:r=>a(s=>{s.cutoff=r})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:we(e.resonance),onChange:r=>a(s=>{s.resonance=r})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,onToggle:r=>Yn("drive",s=>{s.on=r}),controls:Rt("drive",!1),more:Rt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,onToggle:r=>Yn("compressor",s=>{s.on=r}),controls:Rt("compressor",!1),more:Rt("compressor",!0)}]}}const ba=[md,fd,Sd,Md].map(t=>({def:t,handle:Tl(t())}));Cl(se,ba.map(t=>t.handle),"adjacent");hd(se);ga(se);Vn(se);function T(){for(const t of ba)t.handle.update(t.def());ga(se),Yo(se),Vn(se)}let ui="";function Xo(){at();const t=At.get($.selected)??-1,e=JSON.stringify([Go(),jo(),Math.round(t*400)]);if(e!==ui){ui=e;for(const n of ba.slice(0,3))n.handle.update(n.def());ga(se),Yo(se),Vn(se)}requestAnimationFrame(Xo)}requestAnimationFrame(Xo);_c.start();Promise.all([...wt($)].map(t=>V.get(t))).then(t=>{for(const e of t)e&&!Qe.has(e.hash)&&Qe.set(e.hash,ho(e.data));T()});if(ee)ce(),ee.providePreset?.({format:Wc,version:Fc,get:()=>(Yc($),bo($)),set:async t=>{await Oo(t,"Loaded the Scene's pattern.")}}),Re()?.listen(O.from),ee.onAudio?.({label:"Pad",targets:No,receive:Io});else{const t=()=>{ce()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:$,clock:ue,store:V,stretcher:xe,stretchTimes:So,get stretchLoaded(){return Gt!==null},get ctx(){return z},get fx(){return ge},get positions(){return At},get voices(){return xo},ensureAudio:ce,play:Ee,async setSample(t,e,n,a="test"){await ce()&&await it(t,e,n,a)},grab:O,grabBars:ca,get padUndo(){return te?{index:te.before.index,sample:te.before.pad.sample}:null},undoPad:la,receiveAudio:Io,padTargets:No,take:S,pressTake:ua,get notice(){return C},setPerform:Gn,setFill:en,actSlot:zo,get edited(){return Je},toggleStep(t,e){Jt(t,e,n=>{n.on=!n.on})}};
