(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const $e=1e-9;function Li(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class ln{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Li(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+$e&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+$e)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+$e){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-$e;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new ln({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+$e)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+$e)return n[i];return n[0]}}const Ti=Object.freeze({beatsPerBar:4,beatUnit:4}),Te=1e-9;function Mi(t){return Math.floor(t+Te)}function ha(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Te)*e;return n&&r<=t+Te?r+e:r}class Ni{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new ln({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ti}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Te&&(this.stopTime===null||e<this.stopTime-Te)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Te?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Mi(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return ha(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const fa="nc-clock/snapshot",ga=1;function Ci(t,e="local"){return{format:fa,version:ga,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ii(t,e){const n=Ri(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const J=t=>typeof t=="number"&&Number.isFinite(t),En=t=>t===null||J(t);function Ri(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==fa&&n("format"),(!J(e.version)||Math.floor(e.version)!==ga)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!J(e.anchor.beat)||!J(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&J(i.beat)&&J(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!J(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!J(e.meter.beatUnit))&&n("meter"),(!En(e.startTime)||!En(e.stopTime)||!J(e.stoppedBeat))&&n("transport times"),e}class zi{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ni(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ii(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Ci(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Oi="nc-sync/1",ji=1,Bi="nc-sync",Pi="nc-sync-leader",Wi=0,ba=.5,ya=.75;function Fi(t){return typeof t=="number"&&Number.isFinite(t)&&t>=ba&&t<=ya?t:null}const Ct=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),je=t=>typeof t=="number"&&Number.isFinite(t),at=t=>typeof t=="string"&&t.length>0;function Gi(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ji||!at(e.type)||!at(e.from)||!je(e.term)||!je(e.seq)||!je(e.sentAt))return null;switch(e.type){case"hello":return at(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return je(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&je(e.slot)?e:null;case"ping":case"pong":return at(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function _i(t,e,n,i,r){return{proto:Oi,from:e,term:n,seq:i,sentAt:r,...t}}function Be(){return(performance.timeOrigin+performance.now())/1e3}const It=.003,Hi=3,Di=.01,Ln=500;class Yi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Di:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=It&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,u=this.preStep;u.length=0;for(let m=0;m<c.length;m++)u.push(c[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,d=e-n;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=It&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ln)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=It)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Ln)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Hi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class Zi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Ct,...e.capabilities},this.channelOption=e.channel??Bi,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??ha(d,1),d);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(ya,Math.max(ba,e)):Wi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Fi(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Gi(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ct,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ct},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Pi,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(_i(e,this.id,this.term,++this.seq,this.o.now()))}}const Xi="modulepreload",Ui=function(t){return"/studio/"+t},Tn={},Vi=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=Ui(c),c in Tn)return;Tn[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Xi,u||(f.as="script"),f.crossOrigin="",f.href=c,d&&f.setAttribute("nonce",d),document.head.appendChild(f),u)return new Promise((y,g)=>{f.addEventListener("load",y),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var qi=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Yt=[.25,.5,.75,1,1.5,2],Ki=4.9,B={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},ue={fmt:"wet"},X={fmt:"pct"},ke={fmt:"db"},it={fmt:"signedPct"},Rt={fmt:"num",suffix:" ms"},j={div:100};function T(t,e,n,i,r,o,s,l){var d={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(l)for(var c in l)d[c]=l[c];return d}function rt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var De=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:B.hpQ},{dsp:{law:B.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:B.bpHz,astrid:!0},{dsp:{law:B.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:B.bpQ},{dsp:{law:B.bpQ}}),T("mix","Mix",0,100,100,3,ue,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:rt(qi),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,X,{dsp:j,unit:"%"}),T("mix","Wet/dry",0,100,0,3,ue,{dsp:j,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:B.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:rt([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,X,{dsp:j,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,it,{dsp:j,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,Rt,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),T("decay","Decay",0,100,50,3,X,{dsp:j,unit:"%"}),T("damping","Damping",0,100,0,4,X,{dsp:j,unit:"%"}),T("mix","Mix",0,100,0,5,ue,{dsp:j,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),T("depth","Depth",0,100,70,2,X,{dsp:j,unit:"%"}),T("feedback","Feedback",-90,90,50,3,it,{dsp:j,unit:"%"}),T("mix","Mix",0,100,50,4,ue,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),T("depth","Depth",0,100,50,2,X,{dsp:j,unit:"%"}),T("spread","Spread",0,100,70,3,X,{dsp:j,unit:"%"}),T("mix","Mix",0,100,40,4,ue,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),T("depth","Depth",0,100,70,2,X,{dsp:j,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:rt([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,X,{dsp:j,unit:"%"}),T("mix","Mix",0,100,50,5,ue,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,ke,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,ke,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:B.midHz,astrid:!0},{dsp:{law:B.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:B.eqQ},{dsp:{law:B.eqQ}}),T("high_db","High",-18,18,0,4,ke,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,ke,{unit:"dB"}),T("mix","Mix",0,100,100,3,ue,{dsp:j,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:rt([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:B.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,it,{dsp:j,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,it,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,ke,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:B.ratio},{dsp:{law:B.ratio}}),T("attack_ms","Attack",1,100,10,3,Rt,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,Rt,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,ke,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,X,{dsp:j,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],Ji=De.map(function(t){return t.type}),Qi=De.filter(function(t){return!t.hidden}).map(function(t){return t.type}),er={reverb:"plate"};function cn(t){var e=er[t]||t;return Ji.indexOf(e)>=0?e:null}function V(t){for(var e=cn(t),n=0;n<De.length;n++)if(De[n].type===e)return De[n];return null}function Ee(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function va(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=Ee(n.law,e);return i===null?0:i}function Mn(t,e){return Math.min(Ki,t*60/(e>0?e:120))}var Nn=function(t){return t>0?"+":t<0?"−":""};function tr(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function wa(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:Nn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Nn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=Ee(i.law,e),r===null?i.zero||"open":i.astrid?tr(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+Ee(i.law,e).toFixed(1);case"ratio":return Ee(i.law,e).toFixed(1)+":1";case"rate":return r=Ee(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Mn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Mn(e,n)*1e3)+" ms"}return String(e)}var nr=1,St=["drive","delay","plate"];function ar(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return wa(t,i,r)},e}var Me=St.map(function(t){var e=V(t),n={type:t,label:e.label,dials:e.dials.map(ar)};return e.tempoSynced&&(n.tempoSynced=!0),n}),ir={reverb:"plate"};function ht(t){var e=ir[t]||t;return St.indexOf(e)>=0?e:null}function At(t){for(var e=ht(t),n=0;n<Me.length;n++)if(Me[n].type===e)return Me[n];return null}function $a(t,e){var n=At(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Ie(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function se(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function rr(){return{v:nr,chain:Me.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function or(t){return Yt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Yt[0])}function zt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function sr(t){for(var e=Array.isArray(t)?t:zt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=rr(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(zt(l)){var d=ht(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var c=i.chain[St.indexOf(d)],u=zt(l.dials)?l.dials:{};d==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,At(d).dials.forEach(function(m){c.dials[m.key]=se(m,u[m.key])}),lr(d,c.dials,u)}}return{state:i,dropped:o}}function lr(t,e,n){for(var i=At(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=se(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Ie(o,e)))}}function ft(t){return sr(t).state}function cr(t){return JSON.parse(JSON.stringify(t))}var dr=24,Zt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Xt(t,e,n){if(e==="bypass")return n?0:1;var i=$a(t,e)||ur(t,e);return i?va(i,n):0}function ur(t,e){var n=V(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var pr={};Me.forEach(function(t){t.dials.forEach(function(e){pr[t.type+"."+e.key]=e.format})});function Ot(t,e){var n=new Float64Array(dr),i=ft(t);return i.chain.forEach(function(r){var o=Zt[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Xt(r.type,s,r.dials[s])})}),n}var mr=2,gt=3,hr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Pe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ka(t,e){var n=V(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function fr(t){var e=V(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function gr(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function br(t){return typeof t=="number"&&isFinite(t)?or(t):t}function Cn(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=br(o)),i[r.key]=se(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=se(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],Ie(r,i)))}),i}function yr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=Ee(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,i=o)}return i}}var vr={rate:"rate_hz"};function wr(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||vr[o.key]||o.key;r[o.key]=yr(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function $r(t,e){var n=e>0?Math.floor(e):gt,i=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):Pe(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var d=[],c=0;c<o.length;c++){var u=o[c];if(Pe(u)&&!(u.type==="limiter"||u.fixed===!0)){var m=cn(u.type),f=m&&V(m);if(!f||s&&["drive","delay","plate"].indexOf(m)<0){typeof u.type=="string"&&i.push(u.type);continue}if(d.length>=n){i.push(u.id||m);continue}var y;Pe(u.params)&&!Pe(u.dials)?y=Cn(f,wr(f,u.params,r,u.id||m),l):y=Cn(f,Pe(u.dials)?u.dials:{},l);var g=ka(m,d),b=typeof u.id=="string"&&hr.test(u.id)&&!d.some(function(h){return h.id===u.id})?u.id:g.id,p=s?u.bypass!==!1:u.bypass===!0;d.push({id:s?g.id:b,type:m,bypass:p,dials:y})}}return{state:{v:mr,chain:d},dropped:i,notes:r}}function ct(t,e){return $r(t,e).state}function xe(t){var e=V(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,va(i,t.dials[i.key])])}),n}function kr(t){var e=ct(t,8),n=[],i=e.chain.map(function(r,o){var s=V(r.type),l={};return o>=gt&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var c=r.dials[d.key];if(d.more){c!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Yt.indexOf(c)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=c}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:i,lossy:n}}var xr="nc-fx@1",Sr=600,Ar=256,Er=8,We=typeof WeakMap=="function"?new WeakMap:null;function Lr(t,e){var n=We&&We.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Vi(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),We&&(We.set(t,n),n.catch(function(){We.delete(t)})),n)}function Se(t,e){return typeof t=="number"&&isFinite(t)?t:e}function xa(t,e,n,i){var r=Math.min(400,Math.max(20,Se(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",d=Se(e.preGain,1),c=Math.max(0,Se(e.crossfade,.012)),u=Se(e.maxDelaySeconds,void 0),m=t.createGain(),f=t.createGain(),y=t.createGain(),g=t.createGain(),b=null;e.modInput===!0&&(b=t.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),g.gain.value=0,m.connect(y),y.connect(f),g.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);p.post=function(w){p.node?p.node.port.postMessage(w):p.disposed||(o.length>=Ar&&(o=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push(w))};function k(w){var x=o.map(function(v){var S=Object.assign({},v);return S.when>w||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return o=[],x}p.emit=function(w){for(var x=0;x<p.listeners.length;x++)try{p.listeners[x](w)}catch(v){typeof console<"u"&&console.error(v)}},p.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var $=!1;p.tooFar=function(w){return typeof w=="number"&&w>t.currentTime+Sr?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var L=Lr(t,e.moduleUrl).then(function(){if(!p.disposed){var w=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:u},h);w.pending=k(t.currentTime),p.node=new AudioWorkletNode(t,xr,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),m.connect(p.node),b&&b.connect(p.node,0,1),p.node.connect(g);var x=t.currentTime;x<=0||c===0?(y.gain.value=0,g.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+c),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+c)),p.status="ready"}},function(w){p.status="unavailable",o=[],p.error=w});return p.core={input:m,output:f,modInput:b,ready:L,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(w,x){var v=Se(w,NaN);!(v>0)||p.disposed||p.tooFar(x)||(p.bpm=Math.min(400,Math.max(20,v)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(x)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(w){var x=w&&typeof w=="object"?w:{at:w};if(!(p.disposed||p.tooFar(x.at))){var v=Se(x.fadeMs,0);p.post({t:"clear",when:p.whenOf(x.at),fadeMs:v>0?Math.min(1e3,v):0})}},onChange:function(w){return p.listeners.push(w),function(){var x=p.listeners.indexOf(w);x>=0&&p.listeners.splice(x,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[m,y,g,f,b].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},p}function In(t,e){var n=e||{};if(n.slots)return Tr(t,n);var i=ft(n.state),r=Array.from(Ot(i)),o=xa(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Ot(i)),when:0}]}),s=o.core;function l(d){return i.chain[St.indexOf(d)]}return s.setParam=function(d,c,u,m){var f=ht(d);if(!(!f||o.disposed||o.tooFar(m))){var y=l(f),g;if(c==="bypass")g=!!u;else{var b=$a(f,c);if(!b)return;g=se(b,u,Ie(b,y.dials))}return c==="bypass"?y.bypass=g:y.dials[c]=g,o.post({t:"p",i:Zt[f][c],v:Xt(f,c,g),when:o.whenOf(m)}),o.emit({effect:f,key:c,value:g}),At(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function($){return $.key===c}))){var h=y.dials[p.key],k=se(p,h,Ie(p,y.dials));k!==h&&(y.dials[p.key]=k,o.post({t:"p",i:Zt[f][p.key],v:Xt(f,p.key,k),when:o.whenOf(m)}),o.emit({effect:f,key:p.key,value:k}))}}),g}},s.getParam=function(d,c){var u=ht(d);if(u){var m=l(u);return c==="bypass"?m.bypass:m.dials[c]}},s.getState=function(){return cr(i)},s.setState=function(d,c){o.disposed||o.tooFar(c&&c.at)||(i=ft(d),o.post({t:"load",program:Array.from(Ot(i)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function Tr(t,e){var n=e.slots===!0?gt:Math.max(1,Math.min(Er,Math.floor(+e.slots)||gt)),i=ct(e.state,n),r=1,o={};function s(p){return o[p.id]||(o[p.id]=r++),o[p.id]}function l(p){return p.map(function(h){return{uid:s(h),type:h.type,program:xe(h)}})}var d=l(i.chain),c=i.chain.map(function(p){return o[p.id]}),u=xa(t,e,function(){return{slots:n,chain:d,order:c}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(p){return o[p.id]}),when:0}]}),m=u.core;function f(p){var h;for(h=0;h<i.chain.length;h++)if(i.chain[h].id===p)return i.chain[h];var k=cn(p);if(k){for(h=0;h<i.chain.length;h++)if(i.chain[h].type===k)return i.chain[h]}return null}function y(p,h){var k=s(p);u.post({t:"add",uid:k,type:p.type,when:h}),xe(p).forEach(function($){u.post({t:"ps",uid:k,k:$[0],v:$[1],when:h,snap:!0})})}function g(p){u.post({t:"order",uids:i.chain.map(function(h){return o[h.id]}),when:p})}function b(p,h){var k={};i.chain.forEach(function(w){k[w.id]=w});var $=i.chain.map(function(w){return o[w.id]}).join();p.chain.forEach(function(w){var x=k[w.id];if(!x||x.type!==w.type){delete o[w.id],y(w,h);return}var v={};xe(x).forEach(function(S){v[S[0]]=S[1]}),xe(w).forEach(function(S){v[S[0]]!==S[1]&&u.post({t:"ps",uid:o[w.id],k:S[0],v:S[1],when:h})})});var L={};p.chain.forEach(function(w){L[w.id]=!0}),Object.keys(o).forEach(function(w){L[w]||delete o[w]}),i=p,i.chain.map(function(w){return o[w.id]}).join()!==$&&g(h)}return m.slots=n,m.setParam=function(p,h,k,$){var L=f(p);if(!(!L||u.disposed||u.tooFar($))){var w=V(L.type),x,v=null;if(h==="bypass")x=!!k;else{for(var S=0;S<w.dials.length;S++)w.dials[S].key===h&&(v=w.dials[S]);if(!v)return;x=se(v,k,Ie(v,L.dials))}var M={},A={};xe(L).forEach(function(E){M[E[0]]=E[1]}),w.dials.forEach(function(E){E.stepWhen&&(A[E.key]=L.dials[E.key])}),h==="bypass"?L.bypass=x:L.dials[h]=x,w.dials.forEach(function(E){E.stepWhen&&(L.dials[E.key]=se(E,L.dials[E.key],Ie(E,L.dials)))});var R=u.whenOf($),_=o[L.id];return xe(L).forEach(function(E){(M[E[0]]!==E[1]||v&&E[0]===v.k)&&u.post({t:"ps",uid:_,k:E[0],v:E[1],when:R})}),u.emit({effect:L.id,key:h,value:x}),Object.keys(A).forEach(function(E){E!==h&&L.dials[E]!==A[E]&&u.emit({effect:L.id,key:E,value:L.dials[E]})}),x}},m.getParam=function(p,h){var k=f(p);if(k)return h==="bypass"?k.bypass:k.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(i))},m.setState=function(p,h){u.disposed||u.tooFar(h&&h.at)||(b(ct(p,n),u.whenOf(h&&h.at)),u.emit({effect:null,key:null,value:null}))},m.addEffect=function(p,h){var k=h||{},$=ka(p,i.chain);if(!(!$||i.chain.length>=n||u.disposed||u.tooFar(k.at))){if(k.dials){var L=ct({v:2,chain:[{id:$.id,type:$.type,dials:k.dials}]},1).chain[0];$.dials=L.dials}k.bypass===!0&&($.bypass=!0);var w=i.chain.slice(),x=typeof k.index=="number"?Math.max(0,Math.min(w.length,k.index)):w.length;return w.splice(x,0,$),b({v:2,chain:w},u.whenOf(k.at)),u.emit({effect:$.id,key:"chain",value:"add"}),$.id}},m.removeEffect=function(p,h){var k=f(p),$=h&&h.at;return!k||u.disposed||u.tooFar($)?!1:(b({v:2,chain:i.chain.filter(function(L){return L!==k})},u.whenOf($)),u.emit({effect:k.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(p,h,k){var $=f(p),L=k&&k.at;if(!$||u.disposed||u.tooFar(L))return!1;var w=gr(i.chain,i.chain.indexOf($),h);return w===i.chain?!1:(b({v:2,chain:w},u.whenOf(L)),u.emit({effect:$.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:fr(p),bypass:p.bypass}})},m.toAstrid=function(){return kr(i)},m}function Rn(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Sa(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,d=l&&l.tempo?l.tempo:l,c=!1;function u(f){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var y=o(l.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function m(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var y=l&&typeof l.bpm=="number"?l.bpm:Rn(d,0);y>0&&t.setTempo(y);return}var g=Rn(d,f);g>0&&t.setTempo(g);for(var b=d&&(d.points||d.tempoPoints)||[],p=0;p<b.length;p++){var h=b[p];if(h.beat>f&&h.bpm>0){var k=u(h.beat);k!==void 0&&t.setTempo(h.bpm,k)}}}return m(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,u(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&m())})}const Ut="/studio/assets/worklet-CnpUVY5i.js";var Mr="nc-ui",Aa={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Vt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},me={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Ge=t=>`--${Mr}-${t}`,qt=Aa["label-on-fill-dark"],zn=Aa["label-on-fill-light"],Nr=me["label-min-contrast"],Cr=/^#[0-9a-f]{6}$/i,Ir=t=>typeof t=="string"&&Cr.test(t),dt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function On(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${dt(r(0)*255)}${dt(r(8)*255)}${dt(r(4)*255)}`}function Ea(t){let[e,n,i]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/l%6):r===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:s}}function jn(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Kt(t,e){let[n,i]=[jn(t),jn(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var bt=t=>Kt(t,qt)>=Kt(t,zn)?qt:zn;function La(t,e,n,i=Nr){let r=On(t,e,n),o=bt(r)===qt?1:-1;for(let s=0;s<40&&Kt(r,bt(r))<i;s++)n+=o*.01,r=On(t,e,n);return r}function Rr(t){let{h:e,s:n}=Ea(t),i=La(e,Math.min(n,me["surprise-on-max-saturation"]),me["surprise-on-lightness"]);return{fill:t,ink:bt(t),on:i,onInk:bt(i)}}var zr=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Or(t,e=Math.random){let[n,i]=me["surprise-saturation"],[r,o]=me["surprise-lightness"],s=me["surprise-min-hue-gap"],l=Ir(t)?Ea(t).h:null,d=e()*360;return l!==null&&zr(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),La(d,n+e()*(i-n),r+e()*(o-r))}function jr(t){if(!t)return null;let e=Rr(t);return{[Ge("surprise-fill")]:e.fill,[Ge("surprise-ink")]:e.ink,[Ge("surprise-on")]:e.on,[Ge("surprise-on-ink")]:e.onInk}}var Br=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Pr=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Bn(t){let[e,n,i]=[1,3,5].map(l=>Br(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Wr([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>dt(Pr(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Fr=me["velocity-range"],Ta={min:Vt.rhythm["velocity-min"],max:Vt.rhythm["velocity-max"]};function Gr(t,e=Ta){let[n,i]=Fr,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=Vt.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=Bn(e.min),d=Bn(e.max);return{velocity:r,t:o,fill:Wr(l.map((c,u)=>c+(d[u]-c)*o)),ink:s}}function Pn(t,e=Ta){return{[Ge("velocity-fill")]:Gr(t,e).fill}}var _r={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Hr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","fader-cap-master":"color","strip-hacks-text":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Dr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Yr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Et={};for(let[t,e]of Object.entries(Hr))Et[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Yr))Et[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Dr))Et[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(_r.renames.map(t=>[t.old,t.new]));function Ma(t){let e=Et[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function G(t){return Ma(t).prop}function a(t){return`var(${G(t)})`}function Zr(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(G(e)));return Number.isFinite(n)?n:0}function Y(t,e){let n=Ma(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Xr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Ur(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var Vr="[data-modulated], [data-modulated] *";function qr(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${G("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${G("divider")}: ${a(`module-div-stack-${i}`)};
      ${G("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${G("text-sub")}: ${a("module-sub-stack-1")};
      ${G("divider")}: ${a("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("body-size")};
  font-weight: ${a("title-weight")};
  line-height: ${a("label-leading")};
}
button, input, select { font: inherit; color: inherit; }
.nc [hidden] { display: none !important; }
.nc-stack { display: flex; flex-direction: column; min-width: 0; }
/* ASTRID's page frame: side gutters, a header with a divider under it, then the modules, inset from the edges. */
.nc-page {
  min-width: 0;
  padding: ${a("page-pad-y")} ${a("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${a("page-action-gap")};
  min-width: 0;
  padding-bottom: ${a("page-head-gap")};
  border-bottom: ${a("hairline")} solid ${a("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${a("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${a("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${a("page-pad-x")} * -1);
  right: calc(${a("page-pad-x")} * -1);
  background: ${a("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${a("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${a("page-title-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${a("page-sub-gap")} 0 0; font-size: ${a("page-sub-size")}; color: ${a("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${a("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${a("control-gap")} ${a("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${a("control-gap")};
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-page-action:hover { color: ${a("text")}; border-bottom-color: ${a("text")}; }
.nc-page-action:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
.nc-module {
  background: ${a("module-bg-adjacent-1")};
  color: ${a("text")};
  padding: ${a("module-pad")};
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${a("font-ui")};
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
  gap: ${a("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${a("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${a("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${a("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${a("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${a("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${a("title-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${a("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${a("header-gap")}; flex: none; }
.nc-index {
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${a("control-gap")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("body-size")};
  line-height: ${a("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${a("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${a("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${a("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
.nc-slim-lines {
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${a("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${a("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${a("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${a("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${a("readout-size")};
  color: ${a("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${a("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${a("name-width")} - ${a("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${a("name-width")} - ${a("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${a("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${a("module-gap")};
  row-gap: ${a("control-gap")};
  padding-bottom: ${a("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${a("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${a("control-gap")};
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  line-height: ${a("label-leading")};
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
  bottom: calc(-1 * ${a("control-gap")});
  width: max(100%, ${a("target-min")});
  height: max(100%, ${a("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${a("text-sub")}; color: ${a("text")}; }
.nc-tap:active { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-tap:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${a("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  padding: ${a("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${a("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${a("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${a("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${a("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${a("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name,
[data-nc-dim="true"] .nc-select { color: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${a("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${a("hairline")};
  background: ${a("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${a("hairline")};
  background: ${a("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${a("hairline")};
  background: ${a("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${a("slider-thumb-size")};
  height: ${a("slider-thumb-size")};
  margin-top: calc(${a("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${a("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${a("slider-thumb-size")};
  height: ${a("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${a("slider-thumb")};
  transition: none;
}
${Vr} { transition: none; }
.nc-range:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${a("hairline")} solid ${a("text")};
  background: transparent;
  color: ${a("text")};
  min-height: ${a("target-min")};
  padding: ${a("button-pad-y")} 0;
  font-size: ${a("readout-size")};
  letter-spacing: ${a("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${a("transition-feedback")};
}
.nc-btn:hover { background: ${a("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${a("accent")};
  border-color: ${a("accent")};
  color: ${a("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${a("focus-width-strong")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
.nc-btn:disabled { color: ${a("text-sub")}; border-color: ${a("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${a("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${a("text")}; }
.nc-toggle:hover { border-bottom-color: ${a("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${a("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${a("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${a("rhythm.track-solo")};
  border-bottom-color: ${a("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  margin-bottom: ${a("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${a("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("tab-size")};
  font-weight: ${a("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${a("label-size")}; padding-inline: ${a("control-gap")}; }
.nc-seg > button:hover { color: ${a("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${a("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${a("hairline")} * -1);
  height: ${a("tab-mark")};
  background: ${a("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: calc(${a("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  border-radius: 0;
  color: ${a("text")};
  font-size: ${a("body-size")};
  padding: ${a("control-gap")} ${a("select-pad-end")} ${a("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${a("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${a("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${a("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${a("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${a("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${a("slot-size")};
  width: ${a("slot-size")};
  max-width: ${a("slot-size")};
  min-width: 0;
  height: ${a("slot-size")};
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
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("slot-font-size")};
  line-height: ${a("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${a("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${a("text-sub")};
  color: ${a("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${a("accent")};
  color: ${a("accent")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${a("accent")};
  outline: ${a("focus-width")} solid ${a("accent-faint")};
  outline-offset: ${a("hairline")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${a("accent")};
  background: ${a("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${a("control-gap")};
  right: ${a("control-gap")};
  width: ${a("control-gap")};
  height: ${a("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${a("sparkle-size")};
  width: ${a("sparkle-size")};
  height: ${a("sparkle-size")};
  margin-inline: ${a("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${a("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${a("target-min")};
  width: ${a("target-min")};
  min-height: ${a("target-min")};
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  background: ${a("surprise-fill")};
  color: ${a("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${a("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${a("target-min")} / 2); height: calc(${a("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${a("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-sparkle svg { width: ${a("sparkle-icon-size")}; height: ${a("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${a("text")}; }
.nc-sparkle:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${a("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${a("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${a("name-width")};
  width: ${a("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${a("beat-gap")} - ${a("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${a("row-inset")});
  padding-inline: ${a("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${a("accent-tint")};
  box-shadow: inset ${a("marker-width")} 0 0 ${a("accent")};
}
.nc-row[data-selected="true"] .nc-name {
  color: ${a("text")};
  text-decoration: underline;
  text-decoration-color: ${a("accent")};
  text-decoration-thickness: ${a("hairline")};
  text-underline-offset: ${a("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]) { background: ${a("rhythm.step-cell-off")}; }
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${a("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${a("text-sub")}; border-color: ${a("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${a("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${a("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${a("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${a("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${a("slider-pitch")};
  height: ${a("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${a("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${a("rhythm.track-mute")};
  border-color: ${a("rhythm.track-mute")};
  color: ${a("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${a("rhythm.track-solo")};
  border-color: ${a("rhythm.track-solo")};
  color: ${a("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${a("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${a("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
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
  background: ${a("velocity-fill")};
  border-color: ${a("velocity-fill")};
  color: ${a("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${a("playhead-width")} solid ${a("rhythm.playhead")};
  outline-offset: ${a("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${a("rhythm.bar-accent")}; }
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${a("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${a("control-gap")};
  margin-inline: calc((${a("control-gap")} + ${a("rhythm.step-gap")}) / -2);
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
  width: ${a("hairline")};
  height: ${a("target-min")};
  max-height: calc(${a("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${a("hairline")} solid ${a("text-sub")};
  background: ${a("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${a("text")}; border-color: ${a("text")}; }
.nc-len-handle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${a("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${a("accent")}; }
.nc-pad[data-out="true"] { border-color: ${a("divider")}; border-style: dashed; background: transparent; color: ${a("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${a("focus-width")} * 2) 0 0 ${a("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${a("focus-width")} * 2) 0 0 ${a("text")}, inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
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
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${a("module-gap")};
  margin-bottom: ${a("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${a("target-min")} / 3); height: calc(${a("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${a("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
.nc-fill[aria-pressed="true"] { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${a("target-min")};
  min-height: ${a("target-min")};
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${a("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${a("target-min")} * 1.25);
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${a("control-gap")} ${a("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${a("velocity-fill")};
  border-color: ${a("velocity-fill")};
  color: ${a("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${a("playhead-width")} solid ${a("rhythm.playhead")};
  outline-offset: ${a("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${a("divider")}; color: ${a("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${a("text-sub")}; border-color: ${a("text-sub")}; color: ${a("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-step:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${a("playhead-width")};
  outline-offset: ${a("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${a("module-pad")} * -1);
  padding: ${a("stack-card-pad-y")} ${a("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${a("module-gap")} 0;
  font-size: ${a("body-size")};
  font-weight: ${a("fx-name-weight")};
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
  gap: ${a("module-gap")};
  margin-bottom: ${a("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${a("display-height")}; }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${a("control-gap")};
  cursor: pointer;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-ui-more > summary:hover { color: ${a("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
/* On/off (ASTRID's ghost On / Off, Peter 2026-10): role="switch", the word alone, no track. Off is text-sub; on is
   text with an accent hairline under it; hover takes the word and the line to text. Both words share one grid cell,
   so the control never changes width when it flips. */
.nc-ui-switch {
  display: inline-flex;
  align-items: baseline;
  flex: none;
  margin: 0;
  padding: 0 0 ${a("control-gap")};
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${a("text")}; border-bottom-color: ${a("accent")}; }
.nc-ui-switch:hover { color: ${a("text")}; border-bottom-color: ${a("text")}; }
.nc-ui-switch:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
.nc-ui-switch-text { display: inline-grid; }
.nc-ui-switch-text > span { grid-area: 1 / 1; }
.nc-ui-switch[aria-checked="true"] [data-nc-off], .nc-ui-switch[aria-checked="false"] [data-nc-on] { visibility: hidden; }
/* Touch (ASTRID's coarse-pointer rule): text controls are drawn small and an invisible pad grows each to target-min,
   centred on it. A select cannot carry a pad, so it grows itself. */
@media (pointer: coarse) {
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-page-action) { position: relative; }
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-page-action)::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${a("target-min")});
    height: max(100%, ${a("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${a("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  padding: ${a("module-pad")};
  background: ${a("surface-page")};
  border-top: ${a("hairline")} solid ${a("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${a("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${a("title-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${a("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${a("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${a("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${a("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${a("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${a("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-knob {
  width: ${a("knob-size")};
  height: ${a("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${a("hairline")} solid ${a("divider")};
  background: ${a("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${a("control-gap")};
  width: ${a("hairline")};
  height: ${a("control-gap")};
  background: ${a("text")};
  transform-origin: center ${a("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${a("control-gap")} ${a("header-gap")};
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
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  padding: ${a("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${a("target-min")}; min-height: ${a("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
.nc-choice[aria-selected="true"] {
  color: ${a("text")};
  border-bottom-color: ${a("accent")};
}
.nc-choice:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${a("control-gap")};
  min-width: ${a("name-width")};
  padding: ${a("control-gap")};
  background: ${a("surface-page")};
  border: ${a("hairline")} solid ${a("divider")};
  color: ${a("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${a("target-min")};
  border: 0;
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${a("target-min")};
  margin-block: calc((${a("slider-pitch")} - ${a("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${a("target-min")}; height: ${a("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${a("module-gap")} * -1); }
  .nc-ms {
    inset: calc((${a("target-min")} - ${a("slider-pitch")}) / 2);
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
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${a("target-min")};
  height: ${a("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${a("target-min-coarse")}; height: ${a("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${a("module-gap")};
  width: calc(${a("name-width")} * 6);
  max-width: calc(100vw - 2 * ${a("module-gap")});
  padding: ${a("module-gap")};
  background: ${a("surface-page")};
  border: ${a("hairline")} solid ${a("divider")};
  color: ${a("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${a("focus-width")} solid ${a("text")};
  outline-offset: ${a("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${a("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${a("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${a("module-gap")};
  min-height: ${a("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${a("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${a("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${a("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${a("target-min")};
  min-height: ${a("target-min")};
  border: 0;
  background: none;
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${a("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${a("hairline")} 0 0;
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
  gap: ${a("toast-gap")};
  max-width: calc(100vw - 2 * ${a("toast-offset")});
  min-height: ${a("toast-target")};
  padding: 0 0 0 ${a("toast-pad-x")};
  border-radius: ${a("toast-radius")};
  background: ${a("toast-bg")};
  color: ${a("toast-text")};
  font-family: ${a("font-ui")};
  font-size: ${a("toast-font-size")};
  line-height: ${a("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${a("motion-fade")} ${a("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${a("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${a("toast-offset")} + env(safe-area-inset-top)); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${a("motion-fade-out")} ${a("motion-fade-out-easing")};
}
.nc-ui-toast-message { overflow: hidden; text-overflow: ellipsis; }
.nc-ui-toast-action {
  min-width: ${a("toast-target")};
  min-height: ${a("toast-target")};
  padding: 0 ${a("toast-pad-x")};
  border: 0;
  background: none;
  color: ${a("toast-action")};
  font: inherit;
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${a("focus-width")} solid ${a("toast-action")};
  outline-offset: calc(-2 * ${a("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${a("hairline")};
  height: ${a("hairline")};
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
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  border-top: ${a("hairline")} solid ${a("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${a("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${a("module-pad")} ${a("control-gap")};
  padding-bottom: ${a("module-pad")};
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${a("module-bg-stack-1")};
  ${G("text-sub")}: ${a("module-sub-stack-1")};
  ${G("divider")}: ${a("module-div-stack-1")};
  ${G("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${a("fx-card-width")});
  align-items: stretch;
  padding-top: 0;
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${G("text-sub")}: ${a("module-sub-stack-1")};
  ${G("divider")}: ${a("module-div-stack-1")};
  ${G("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${G("text-sub")}: inherit;
  ${G("divider")}: inherit;
  ${G("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${a("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${a("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${a("module-bg-adjacent-4")}; }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${a("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${a("module-gap")}; }
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${a("strip-width")};
  display: grid;
  grid-template-rows: auto ${a("slider-pitch")} ${a("slider-pitch")} calc(${a("knob-size")} + ${a("control-gap")} + ${a("label-size")} * ${a("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${a("module-gap")};
  min-width: 0;
  padding-inline: ${a("control-gap")};
}
.nc-strip + .nc-strip { border-inline-start: ${a("hairline")} solid ${a("divider")}; }
.nc-strip[data-nc-master] { width: ${a("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${a("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${a("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${a("danger")}; }
.nc-strip-remove:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${a("text-sub")}; }
.nc-strip-ms { display: flex; gap: ${a("control-gap")}; height: ${a("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${a("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${a("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${a("hairline")} solid ${a("strip-hacks-text")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("strip-hacks-text")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${a("text")}; }
.nc-hacks[aria-pressed="true"] {
  background: ${a("fader-cap-master")};
  border-color: ${a("fader-cap-master")};
  color: ${a("surface-page")};
}
.nc-hacks:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${a("module-gap")}; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${a("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${a("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, ${a("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${a("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${a("meter-track")} 0 270deg, transparent 0);
}
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${a("fader-cap-width")} auto auto;
  grid-template-rows: ${a("clip-size")} ${a("fader-height")};
  justify-content: center;
  column-gap: ${a("control-gap")};
  row-gap: ${a("control-gap")};
  padding-block: calc(${a("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${a("font-readout")};
  font-size: ${a("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${a("text-sub")};
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
  width: ${a("fader-cap-width")};
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
  width: ${a("rule-strong")};
  transform: translateX(-50%);
  background: ${a("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${a("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${a("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${a("hairline")};
  transform: translateY(-50%);
  background: ${a("fader-cap-line")};
}
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${a("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${a("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${a("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${a("clip-size")};
  padding: 0;
  border: 0;
  background: ${a("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${a("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${a("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-meter-bars { display: flex; gap: ${a("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${a("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${a("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${a("meter-peak")}; }
.nc-meter-rms { background: ${a("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${a("rule-strong")} solid ${a("meter-hold-mark")};
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
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${a("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${a("divider")}; text-underline-offset: ${a("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("accent")};
  border-radius: 0;
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${a("strip-width")};
  margin-inline-start: ${a("module-gap")};
  border: ${a("hairline")} dashed ${a("divider")};
  color: ${a("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${a("text")}; border-color: ${a("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${a("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${a("font-readout")}; font-size: ${a("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
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
  font-size: ${a("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-db:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
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
  .nc-strip[data-nc-master] { width: ${a("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${a("module-pad-x-desktop")};
    padding-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${a("module-pad-x-desktop")};
    padding-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${a("stack-card-pad-y")} ${a("module-pad-x-desktop")} ${a("module-pad-y-desktop")};
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
  background: ${a("accent")};
  font-family: ${a("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${a("page-pad-y-md")} ${a("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${a("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${a("page-pad-y-md")} * -1); left: calc(${a("page-pad-x-md")} * -1); right: calc(${a("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${a("header-gap")};
  padding-inline: ${a("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${a("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${a("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${a("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${a("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${a("target-min")}; }
  .nc-snap { font-size: ${a("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${a("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${a("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${a("page-pad-x-xl")} * -1); right: calc(${a("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${a("hairline")} solid ${a("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${a("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${a("target-min")};
  }
  .nc-snap { font-size: ${a("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
    padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
    padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${a("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${a("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${a("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    padding-inline: ${a("module-pad-x-desktop")};
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
    border-bottom: ${a("hairline")} solid ${a("divider")};
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
    gap: ${a("module-gap")};
    padding-block: ${a("control-gap")};
    background: ${a("surface-page")};
    border-bottom: ${a("hairline")} solid ${a("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${a("module-gap")};
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
    max-width: ${a("slot-span")};
    height: ${a("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${a("readout-size")}; }
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
    outline-color: ${a("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent-faint")};
  }
}
`}var jt=null,Kr="nc-ui-fallback";function Na(t=globalThis.document){if(!t?.documentElement||(t.documentElement,jt&&jt.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Kr} {
${qr()}
}
`,t.head.append(e),jt=e}var Fe=null,Jr=0,Qr=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Ca=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Qr,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Ca(document);function dn({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(Fe||l?.aborted)return Promise.resolve(!1);let d=o?.ownerDocument??document,c=Ca(d),u=o??d.body,m=d.defaultView??globalThis,f=`nc-ui-confirm-${++Jr}`,y=(I,D,P)=>{let ve=d.createElement(I);return ve.className=`nc-ui-confirm${D}`,P!=null&&(ve.textContent=P),ve},g=y("div","-layer");g.dataset.state="enter";let b=y("div","");b.setAttribute("role","alertdialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-labelledby",`${f}-t`),b.setAttribute("aria-describedby",`${f}-b`);let p=y("h2","-title",t);p.id=`${f}-t`;let h=y("p","-body",e);h.id=`${f}-b`;let k=y("div","-actions"),$=(I,D)=>{let P=y("button","-btn",I);return P.type="button",P.dataset.ncConfirm=D,P.addEventListener("click",()=>K(D==="ok")),P},L=$(i,"cancel"),w=$(n,"ok");r&&(w.dataset.danger="true"),k.append(L,w),b.append(p,h,k),g.append(b);let x={layer:g};Fe=x;let v=s??d.activeElement,S=[];for(let I of u.children)I.hasAttribute("inert")||(I.setAttribute("inert",""),S.push(I));let M=()=>{if(Fe!==x)return;u.append(g),L.focus({preventScroll:!0});let I=m.requestAnimationFrame?.bind(m)??(D=>setTimeout(D,16));I(()=>I(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};c?c.then(M):M();let A=!1;g.addEventListener("pointerdown",I=>{A=I.target===g}),g.addEventListener("click",I=>{I.target===g&&A&&K(!1),A=!1});let R=I=>{I.stopImmediatePropagation(),I.key==="Escape"?(I.preventDefault(),K(!1)):I.key==="Tab"?(I.preventDefault(),(d.activeElement===L?w:L).focus()):I.key==="Enter"&&(I.preventDefault(),d.activeElement===w?K(!0):d.activeElement===L&&K(!1))},_=I=>I.stopImmediatePropagation();m.addEventListener("keydown",R,!0),m.addEventListener("keyup",_,!0);let E=()=>K(!1);l?.addEventListener("abort",E);let O,An=new Promise(I=>{O=I});function K(I){if(Fe!==x)return;Fe=null,m.removeEventListener("keydown",R,!0),m.removeEventListener("keyup",_,!0),l?.removeEventListener("abort",E);for(let we of S)we.removeAttribute("inert");g.dataset.state="closing",v?.isConnected&&typeof v.focus=="function"&&v.focus({preventScroll:!0});let D=m.getComputedStyle?.(g),P=Math.max(0,...String(D?.transitionDuration??"").split(",").map(we=>Number.parseFloat(we)*(we.trim().endsWith("ms")?1:1e3)||0)),ve=()=>g.remove();g.addEventListener("transitionend",we=>we.target===g&&ve()),setTimeout(ve,P+50),O(I)}return An}function Ia(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let d=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ra=new WeakMap,Wn=.25;function eo(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,l=t.onChange,d=t.onReset,c=p=>Math.min(1,Math.max(0,p)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},m=p=>{let h=c(p);h!==o&&(o=h,u(),l?.(h))},f=0,y=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();p.target!==r&&h.height>0&&m(1-(p.clientY-h.top)/h.height),f=p.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!y)return;let h=n.getBoundingClientRect().height||1,k=(f-p.clientY)/h*(p.shiftKey?Wn:1);f=p.clientY,m(o+k)});let g=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),n.addEventListener("keydown",p=>{let h=p.shiftKey?s*Wn:s,k={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in k&&(p.preventDefault(),m(k[p.key]))});let b={el:n,get value(){return o},get dragging(){return y},set(p){y||(o=c(Number(p)||0),u())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(d=p.onReset)}};return b.setLabel(t.label),b.set(t.value??0),b.setText(t.valueText),Ra.set(n,b),b}function to(t){return Ra.get(t)}var za=new WeakMap,no=.2,ao=1.5,io=.5;function ro(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function Fn(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:ro(i.getComputedStyle(t).getPropertyValue(G(e)),n)}function oo(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let p=e.createElement("span");p.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let k=e.createElement("span");k.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",p.append(h,k,$),o.append(p),s.push({peak:h,rms:k,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let l=t.label,d=t.onClear,c=!1,u=-1,m=-1,f=()=>{r.dataset.lit=c?"true":"false",r.setAttribute("aria-pressed",c?"true":"false"),r.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),r.title=c?"Clipped. Click to clear":"Clip light"},y=(b,p,h,k)=>{let $=Math.round(k*1e3)/1e3;h[p]!==$&&(h[p]=$,b.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};r.addEventListener("click",()=>{g.clear(),d?.()});let g={el:i,get clipped(){return c},update(b,p){u<0&&(u=Fn(i,"motion-meter-fall",no)),m<0&&(m=Fn(i,"motion-meter-hold",ao));let h=Math.max(0,Math.min(.25,Number(p)||0)),k=u>0?Math.exp(-h/u):0;s.forEach(($,L)=>{let w=b[L]??b[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(w.peak)||0)),v=Math.min(x,Math.max(0,Number(w.rms)||0));w.over&&g.clip(),$.level.peak=x>=$.level.peak?x:x+($.level.peak-x)*k,$.level.rms=v>=$.level.rms?v:v+($.level.rms-v)*k,$.holdAge+=h,x>=$.holdAt?($.holdAt=x,$.holdAge=0):$.holdAge>m&&($.holdAt=Math.max(x,$.holdAt-io*h)),y($.peak,"peak",$.shown,$.level.peak),y($.rms,"rms",$.shown,$.level.rms),y($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,y(b.peak,"peak",b.shown,0),y(b.rms,"rms",b.shown,0),y(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,f()},configure(b){b.onClear&&(d=b.onClear)}};return f(),g.reset(),za.set(i,g),g}function Oa(t){return t?za.get(t):void 0}function so(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function Bt(t){return Math.max(0,Math.min(1,t))}function ja(t,e){let{ctx:n,w:i,h:r}=so(t);if(!n)return;n.clearRect(0,0,i,r);let o=Ur(t);if(e.paint==="swatch"){let d=Y(t,"accent"),c=Y(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,i/2,r),n.fillStyle=c,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let d=e.mode??"lp",c=Y(t,Xr(d)),u=Y(t,"divider"),m=Bt(e.cutoff??.5),f=.08+(1-Bt(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let y=0;y<=i;y++){let g=y/Math.max(1,i),b=0;d==="lp"?b=g<m?1:Math.max(0,1-(g-m)/f):d==="hp"?b=g>m?1:Math.max(0,1-(m-g)/f):b=Math.max(0,1-Math.abs(g-m)/f);let p=r*.78-b*r*.62;y===0?n.moveTo(y,p):n.lineTo(y,p)}n.strokeStyle=c,n.stroke(),n.fillStyle=Y(t,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=Y(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let u=c/Math.max(1,i),m=(r-4)*(1-Math.exp(-u*4/d));n.lineTo(c,r-m)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){let d=Bt(e.level??0);n.fillStyle=Y(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=Y(t,"accent"),n.fillRect(0,r*.4,i*d,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=Y(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=Y(t,"rhythm.playhead"),n.fillRect(l/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=Y(t,"accent")}var Ba={slop:8,longPressMs:500,pitchPx:16},lo=class{constructor(t,e,n=Ba){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function co(t,e,n,i=Ba){let r=!1,o=0,s=(c,u)=>{let m=t.ownerDocument.elementFromPoint?.(c,u),f=[...t.querySelectorAll(e)],y=m?f.findIndex(p=>p===m||p.contains(m)):-1;if(y>=0)return y;let g=-1,b=Number.POSITIVE_INFINITY;return f.forEach((p,h)=>{if(p.hidden)return;let k=p.getBoundingClientRect();if(u<k.top||u>k.bottom)return;let $=Math.abs(c-(k.left+k.width/2));$<b&&$<=k.width&&(g=h,b=$)}),g},l=new lo(s,c=>{(c.kind==="paint"||c.kind==="long")&&(r=!0),n(c)},i),d=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(r=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{r&&(r=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}function H(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Lt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function Gn(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Xe(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var uo=450,_n=8;function Q(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function po(t){let e=Zr(t,"target-min");return e>0?e:44}function mo(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=po(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,u=d-i,m=d+i,f=c-i,y=c+i;for(let g=0;g<e.length;g++){if(o===g)continue;let b=r[g];if(!b||b.width===0)continue;let p=b.left+b.width/2,h=b.top+b.height/2;Math.abs(h-c)<i*2&&(p>d?m=Math.min(m,(d+p)/2):p<d&&(u=Math.max(u,(d+p)/2))),Math.abs(p-d)<i*2&&(h>c?y=Math.min(y,(c+h)/2):h<c&&(f=Math.max(f,(c+h)/2)))}u=Math.min(u,l.left),m=Math.max(m,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,m-u)}px`,s.style.height=`${Math.max(0,y-f)}px`,s.style.transform="none"}}function Pa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Hn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function yt(t,e){switch(t.type){case"slider":return ho(t,e);case"select":return go(t,e);case"toggle":return bo(t,e);case"button":return yo(t,e);case"readout":return vo(t);case"label":return wo(t);case"note":return Dn(t);case"knob":return xo(t,e);case"choice":return So(t,e);case"slotRow":return Ao(t,e);case"stepGrid":return Mo(t,e);case"canvas":return Io(t);case"fx":return jo(t,e);case"strip":return Ro(t,e);case"stripAdd":return Oo(t,e);default:return Dn({id:"unknown",text:""})}}function le(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Wa(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??Xe(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Gn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Gn(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&$o(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??Xe(e.value))}else if(e.type==="choice")Fa(t,e);else if(e.type==="slotRow")_a(t,e);else if(e.type==="stepGrid")Jt(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&ja(n,e)}else if(e.type==="strip"){Za(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${Qt(n.id)}"]`);i instanceof Element&&le(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")Da(t,e);else if(e.type==="fx"){Xa(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${Qt(n.id)}"]`);i instanceof Element&&le(i,n)}}}}function ho(t,e){let n=Lt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(fo(t,i,e),r),n.append(H()),le(n,t),n}function fo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(Q());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function go(t,e){let n=Lt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,H()),n}function bo(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(H()),le(n,t),n}function yo(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(H()),le(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=Pa(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Ha(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function vo(t){let e=Lt(t.id,t.label);return e.append(H()),le(e,t),e}function wo(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(H()),e}function Dn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(H()),e}function Yn(t){if(typeof t.valueText=="string")return t.valueText;let e=Xe(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Wa(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function $o(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;Wa(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Yn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Yn(e)}`}function ko(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function xo(t,e){let n=Lt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",d=>{o=d.clientY;let c=e(i);s=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let c=e(i);if(c?.type!=="knob")return;let u=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,s-(d.clientY-o)*u/120));c.onChange(m)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let c=e(i);if(c?.type!=="knob")return;let u=ko(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(H()),le(n,t),n}function So(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let c=s[d];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(r)}return n.append(H()),Fa(n,t),n}function Fa(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Ao(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let m=t.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(u),y.textContent=m.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,Q()),Eo(f,y,n,u,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Pa(),r.append(Q()),r.addEventListener("click",()=>{Ha(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...r?[r]:[]),n.append(c,o,H()),Ga(n,e),_a(n,t),n}function Zn(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;_e(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Eo(t,e,n,i,r){let o=0,s=0,l=0,d=!1,c=!1,u=!1,m=!1,f=()=>{window.clearTimeout(o),o=0},y=h=>{let k=h.clientX-s,$=h.clientY-l;k*k+$*$>_n*_n&&(d=!0,f())},g=()=>{m&&(m=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",p))},b=h=>{let k=o!==0&&!d&&!c;f(),g(),k&&(u=!0,Zn(n,i,r,h))},p=()=>{d=!0,f(),g()};t.addEventListener("pointerdown",h=>{h.button===0&&(g(),c=!1,d=!1,u=!1,s=h.clientX,l=h.clientY,f(),o=window.setTimeout(()=>{o=0,!d&&(c=!0,Lo(n,e,i,r))},uo),m=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(u||c||d){u=!1,c=!1,d=!1;return}Zn(n,i,r,h)})}function Ga(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=Xn("Save","store"),r=Xn("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),_e(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),_e(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),_e(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&_e(t)})}function Xn(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Lo(t,e,n,i){Ga(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function _e(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function _a(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Ha(t){let e=t.dataset.ncLastFill||null,n=Or(e);t.dataset.ncLastFill=n;let i=jr(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function To(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Mo(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=p=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=p,i.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let h of[o,s]){let k=h===p;h.setAttribute("aria-checked",k?"true":"false"),h.tabIndex=k?0:-1}};l(o);for(let p of[o,s])p.addEventListener("click",()=>l(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;l(h),h.focus()});let d=document.createElement("div");d.className="nc-step-tools",d.append(i),t.onFill&&d.append(To(n,e)),n.append(d);for(let p of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=p.label,k.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(k.dataset.ncLane=String((p.lane-1)%4+1)),k.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid")return;let x=w.rows.findIndex(v=>v.id===p.id);w.onSelectRow?.(x)}),k.addEventListener("keydown",w=>No(n,k,w));let $=[];for(let w of["mute","solo"]){if(!(w==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=w,v.textContent=w==="mute"?"M":"S",v.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${p.label}`),x.append(v,Q()),x.addEventListener("click",()=>{let S=e(n);if(S?.type!=="stepGrid")return;let M=S.rows.findIndex(A=>A.id===p.id);(w==="mute"?S.onMute:S.onSolo)?.(M)}),$.push(x)}let L=document.createElement("div");L.className="nc-steps";for(let w=0;w<p.steps.length;w++){let x=document.createElement("span");x.className="nc-step-wrap";let v=document.createElement("button");v.type="button",v.className="nc-step",v.dataset.ncStep=`${p.id}:${w}`,v.setAttribute("aria-label",`${p.label} step ${w+1}`),x.append(v,Q()),x.addEventListener("click",S=>{let M=e(n);if(M?.type!=="stepGrid")return;let A=M.rows.findIndex(_=>_.id===p.id),R=s.getAttribute("aria-checked")==="true";M.onToggle(A,w,S.shiftKey||R)}),L.append(x)}if(t.onLength&&L.append(Co(n,L,p,e)),h.append(...$,k,L),t.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=p.id,w.setAttribute("aria-label",`Re-roll ${p.label}`),w.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=Hn(),w.append(Q()),w.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(v=>v.id===p.id))}),h.append(w)}h.addEventListener("click",w=>{if(w.target!==h)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(v=>v.id===p.id))}),Un(n,L,".nc-step-wrap",e,s,()=>p.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let u=(p,h,k)=>{let $=document.createElement("button");return $.type="button",$.className=p,$.textContent=h,k&&$.setAttribute("aria-label",k),$},m=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),y=document.createElement(t.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),t.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Jt(n,p))}));for(let[p,h]of[[m,-1],[f,1]])p.addEventListener("click",()=>{let k=e(n);if(k?.type!=="stepGrid"||k.rows.length===0)return;let $=k.rows.length;k.onSelectRow?.(((ot(k)+h)%$+$)%$)});if(c.append(m,y,f),t.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Hn(),p.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let k=ot(h);k>=0&&h.onDice?.(k)}),c.append(p)}if(t.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(p)}n.append(c);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let b=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<b;p++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(p),h.textContent=String(p+1),h.addEventListener("click",k=>{let $=e(n);if($?.type!=="stepGrid")return;let L=ot($);if(L<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(L,p+1);return}let w=s.getAttribute("aria-checked")==="true";$.onToggle(L,p,k.shiftKey||w)}),g.append(h)}return Un(n,g,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[ot(p)]?.id:void 0}),n.append(g),n.append(H()),Jt(n,t),n}function ot(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Un(t,e,n,i,r,o){let s="on",l=!0,d=-1,c=(u,m)=>{let f=u.rows[d]?.steps[m];!f||m>=u.rows[d].length||(u.onSet?u.onSet(d,m,s,l):!!f[s]!==l&&u.onToggle(d,m,s==="accent"))};co(e,n,u=>{let m=i(t);if(m?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=m.rows.findIndex(y=>y.id===o());f>=0&&m.rows[f].length!==u.pad+1&&m.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=o();d=m.rows.findIndex(g=>g.id===f);let y=m.rows[d]?.steps[u.pad];if(!y)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[s]}c(m,u.pad)}else if(u.kind==="long"){let f=o(),y=m.rows.findIndex(b=>b.id===f),g=e.querySelectorAll(n)[u.pad];y>=0&&g instanceof HTMLElement&&m.onLongPress?.(y,u.pad,g)}}})}function No(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Co(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(Q());let o=c=>{let u=i(t);if(u?.type!=="stepGrid")return;let m=u.rows.findIndex(g=>g.id===n.id),f=u.rows[m];if(!f)return;let y=Math.max(1,Math.min(f.steps.length,c));y!==f.length&&u.onLength?.(m,y)},s=c=>{let u=[...e.querySelectorAll(".nc-step")],m=1;return u.forEach((f,y)=>{let g=f.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(m=y+1)}),m},l=c=>o(s(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",c=>{let u=i(t);if(u?.type!=="stepGrid")return;let m=u.rows.find(y=>y.id===n.id);if(!m)return;let f={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),r}var Pt=new WeakMap;function Vn(t,e){let n=typeof e=="number"?e:null;if(!(Pt.has(t)&&Pt.get(t)===n)){if(Pt.set(t,n),n===null){for(let i of Object.keys(Pn(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(Pn(n)))t.style.setProperty(i,r)}}function Jt(t,e){let n=e.rows.some(c=>c.solo),i=t.querySelector(".nc-pads"),r=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=s?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",s?"true":"false"),o.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let l=t.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&r&&(l.setAttribute("aria-label",`Re-roll ${r.label}`),l.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");let m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let c=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let m=Number(u.getAttribute("data-nc-pad")),f=r.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!f||!s&&m>=r.length,s&&m>=r.length?u.dataset.out="true":delete u.dataset.out,s&&m===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${m+1}`),u.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?u.dataset.accent="true":delete u.dataset.accent,f?.dim?u.dataset.dim="true":delete u.dataset.dim,Vn(u,f?.velocity),e.playhead>=0&&m===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let c of e.rows){for(let f=0;f<c.steps.length;f++){let y=c.steps[f],g=t.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;let b=g.closest(".nc-row");if(b instanceof HTMLElement){e.selectedRow===c.id?b.dataset.selected="true":delete b.dataset.selected;let k=b.querySelector(".nc-name");k instanceof HTMLElement&&k.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||n&&!c.solo?b.dataset.silent="true":delete b.dataset.silent;for(let $ of b.querySelectorAll("[data-nc-ms]")){let L=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",L?"true":"false")}}g.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?g.dataset.accent="true":delete g.dataset.accent,y.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof y.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Vn(g,y.velocity);let p=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===p?g.dataset.playhead="true":delete g.dataset.playhead;let h=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!h,f>=c.length&&h?g.dataset.out="true":delete g.dataset.out}let u=t.querySelector(`[data-nc-len="${c.id}"]`),m=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&m&&m.nextElementSibling!==u){let f=document.activeElement===u;m.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Io(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,H()),e}function Ro(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(g)}),i.append(g)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",g.append(b,Q()),g.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=g,p.textContent=g==="mute"?"M":"S",b.append(p,Q()),b.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(g==="mute"?h.onMute:h.onSolo)?.()}),s.append(b)}let l=document.createElement("div");l.className="nc-strip-sends";for(let g of t.sends??[])l.append(yt({...g,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let c=document.createElement("span");c.className="nc-scale",c.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(g.value)),b.textContent=g.label,c.append(b)}let u=eo({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let b=e(n);b?.type==="strip"&&b.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&Kn(g)}}),m=oo({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});d.append(c,u.el,m.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",g=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(y),g.detail===0?qn(n,f,e):g.detail===1&&(y=window.setTimeout(()=>qn(n,f,e),zo)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let g=e(n);g?.type==="strip"&&Kn(g)}),n.append(i,o,s,l,d,f,H()),Za(n,t),n}var zo=250;function qn(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??Xe(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Oo(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),d=s.value;Ya(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(i,s,H()),Da(n,t),n}function Da(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Ya(i))}function Ya(t){let e=t.options[0];e&&(e.selected=!0)}function Kn(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Za(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?to(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),Oa(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??Xe(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let c=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${c}`:c}for(let d of t.querySelectorAll("[data-nc-ms]")){let c=d.getAttribute("data-nc-ms"),u=c==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",u?"true":"false"),d.setAttribute("aria-label",`${c==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let d=e.hacksLabel??"Hacks";l.textContent!==d&&(l.textContent=d),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Jn(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${Qt(e)}"]`);return Oa(n?.querySelector(".nc-meter")??void 0)}function jo(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=Ia({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(o.el);l?.type==="fx"&&l.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(yt(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(yt(s,e));n.append(r)}return n.append(H()),Xa(n,t),n}function Xa(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Qt(t){return t.replace(/["\\]/g,"\\$&")}function Bo(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&ja(n,i)}mo(t)}var un="netcomposer.rhythm.hidden.v1",ie=new WeakMap;function Wt(){try{return globalThis.localStorage??null}catch{return null}}function Ua(t,e=un){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Qn(t,e,n,i=un){let r=Ua(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function pn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function Po(t,e){if(!(!t||!e))return pn(t).find(n=>n.id===e)}function Wo(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${pn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Fo(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),Va(t,e)}function Va(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Go(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=ie.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Po(n,i)}function _o(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=Wo(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${ea(r.id)}"]`);o&&Va(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${ea(s.id)}"]`);l instanceof Element&&le(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),Fo(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(yt(l,Go));t.append(o)}}function ea(t){return t.replace(/["\\]/g,"\\$&")}function Ho(t,e=un){Na();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Ua(Wt(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Ia({labelledBy:o.id,onChange:h=>(ie.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,d);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",r.append(o,u,s);let m=document.createElement("div");m.className="nc-module-body",m.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let y=document.createElement("span");y.className="nc-slim-lines",f.append(y);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,m,f),n.setAttribute("aria-labelledby",o.id);let b=h=>{let k=ie.get(n)??t;n.dataset.ncOpen=h?"false":"true",m.hidden=h,f.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${k.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";Qn(Wt(),(ie.get(n)??t).id,h,e),b(h),en(n.parentElement)}),f.addEventListener("click",()=>{Qn(Wt(),(ie.get(n)??t).id,!1,e),b(!1),en(n.parentElement)});let p={el:n,update(h){ie.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,u.textContent=h.status??"",h.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),y.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),_o(m,h),b(m.hidden),p.redraw()},redraw(){let h=ie.get(n);h&&Bo(n,pn(h))}};return ie.set(n,t),b(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Do(t,e,n="adjacent"){Na(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),en(t)}function en(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const qa="netcomposer.studio.instances.v1",ta="netcomposer.studio.types-seen.v1",Yo=["petra-rhythm","olive-bass"];function Ka(t,e){return e===1?t:`${t}#${e}`}function mn(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function Je(t,e){return{id:Ka(t.id,e),type:t.id,n:e,name:e===1?t.name:`${t.name} ${e}`,src:t.src}}function Zo(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Xo(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let i=1;for(;n.has(i);)i++;return Je(e,i)}function Ue(t){return t.filter(e=>e.available!==!1).map(e=>Je(e,1))}function Uo(t,e){if(!Array.isArray(t))return Ue(e);const n=[];for(const i of t){if(typeof i!="string")continue;const r=mn(i),o=r&&e.find(s=>s.id===r.type&&s.available!==!1);!r||!o||n.some(s=>s.id===i)||n.push(Je(o,r.n))}return n.length>0||t.length===0?n:Ue(e)}function hn(){try{return globalThis.localStorage??null}catch{return null}}function Vo(t,e=hn()){try{const n=e?.getItem(qa);return n?Uo(JSON.parse(n),t):Ue(t)}catch{return Ue(t)}}function qo(t,e,n=hn()){let i=Yo;try{const s=JSON.parse(n?.getItem(ta)??"null");Array.isArray(s)&&(i=s.filter(l=>typeof l=="string"))}catch{}const r=e.filter(s=>!i.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(l=>l.type===s.id)||o.push(Je(s,1));try{n?.setItem(ta,JSON.stringify([...new Set([...i,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&Qe(o,n),o}function Qe(t,e=hn()){try{e?.setItem(qa,JSON.stringify(t.map(n=>n.id)))}catch{}}function Ko(t,e){const n=new Map;return(i,r)=>{const o=mn(i),s=o?.type??i,l=r?.instance!==void 0?Number(r.instance):i.includes("#")?o?.n:void 0,d=t().filter(u=>u.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=d.find(u=>u.instance.n===l);else{const u=d.filter(m=>{const f=m.window();return f!=null&&f!==n.get(m.instance.id)});c=u.find(m=>m.readyState?.()!=="complete")??u[0]??d[0]}if(!c){if(e.some(m=>m.id===s))return null;const u=l!==void 0?Ka(s,l):i;return{id:u,name:u}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const Ft="netcomposer.studio.pending-presets.v1",Jo=3e3,Qo=6e4;function na(t){return!!t&&typeof t=="object"&&typeof t.format=="string"&&"data"in t}function es(t,e){return new Promise(n=>{const i=setTimeout(()=>n(void 0),e);t.then(r=>{clearTimeout(i),n(r)},()=>{clearTimeout(i),n(void 0)})})}function ts(t){const e=new Map,n=[],i=()=>{try{const s=JSON.parse(t()?.getItem(Ft)??"{}"),l={};if(s&&typeof s=="object")for(const[d,c]of Object.entries(s))na(c)&&(l[d]=c);return l}catch{return{}}},r=s=>{try{const l=t();if(!l)return;Object.keys(s).length?l.setItem(Ft,JSON.stringify(s)):l.removeItem(Ft)}catch{}},o=async(s,l)=>{const d=i(),c=d[s];if(!c)return;delete d[s],r(d);let u=c.format===l.format;if(u)try{await l.set(c.data)}catch{u=!1}for(const m of n)m(s,u)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(e.set(s,l),o(s,l))},provided:()=>[...e.keys()],async collect(s,l=Jo){const d={};return await Promise.all(s.map(async c=>{const u=e.get(c);if(!u)return;const m=await es(Promise.resolve().then(()=>u.get()),l);m!=null&&(d[c]={format:u.format,...u.version!==void 0?{v:u.version}:{},data:m})})),d},stash(s){const l={};for(const[d,c]of Object.entries(s))na(c)&&(l[d]=c);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(i()),dropPending(){const s=Object.keys(i());return r({}),s}}}function ns(t,e){return`${t}@studio/${e}`}const as=1,q=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],fn=[...q];function is(t,e,n={}){const i=n.instruments??q;return{version:as,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:i.find(m=>m.id===r)?.name??r};if(!s)return null;const l=e.attach(s.id,s.name),d=s.id,c=n.presets,u=n.share?.host(d);return{ctx:t,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:d,storageKey:m=>ns(m,d),...c?{providePreset:m=>c.provide(d,m)}:{},...u?{audioReceivers:u.audioReceivers,sendAudio:u.sendAudio,onAudio:u.onAudio,reveal:u.reveal}:{}}}}}const rs={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function os(t,e){const n=e.fx[t],i=ft(n);for(const r of i.chain){const o=rs[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return i}function ss(t,e){const n=new Map,i=new Map;let r=1;const o=s=>{const l=e.nodeFor(s);if(!l)return null;const d=n.get(s);if(d&&d.source===l)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(t,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=u=>{const m=u.data;m.type!=="took"&&m.type!=="recorded"||(i.get(m.id)?.(m.channels),i.delete(m.id))},l.connect(c),n.set(s,{node:c,source:l}),c};return{record(s,l){if(!e.nodeFor(s))return null;const d=n.get(s)?.node??null,c=r++;let u=d;const m=y=>u?.port.postMessage(y);u?m({type:"record",id:c,from:l}):e.ready.then(()=>{u=o(s),m({type:"record",id:c,from:l})});let f=!1;return{stop(y){return f?Promise.resolve(null):(f=!0,new Promise(g=>{i.set(c,g),m({type:"record-end",id:c,to:y}),setTimeout(()=>{i.delete(c)&&g(null)},Math.max(0,(y-t.currentTime*t.sampleRate)/t.sampleRate)*1e3+5e3)}))},cancel(){f=!0,m({type:"record-cancel",id:c})}}},sources:()=>e.sources(),listen(s){return e.nodeFor(s)?(e.ready.then(()=>o(s)),!0):!1},async take(s,l,d){await e.ready;const c=o(s);if(!c||!(d>l))return null;const u=r++;return new Promise(m=>{i.set(u,m),c.port.postMessage({type:"take",id:u,from:l,to:d}),setTimeout(()=>{i.delete(u)&&m(null)},(d-t.currentTime*t.sampleRate)/t.sampleRate*1e3+2e3)})}}}function ls(t){const e=()=>{};return new Proxy(t,{get(n,i,r){if(i==="stop")return e;const o=Reflect.get(n,i,r);return typeof o=="function"?o.bind(n):o}})}const te=-54,et=6,U=-te/(et-te),cs=-9,tn=(cs-te)/(et-te);function Ja(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:te+e*(et-te)}function ds(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function us(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function pe(t){return ds(Ja(t))}function ps(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function ms(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:pe(n.position))}function gn(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-te)/(et-te)))}function aa(t){return gn(us(t))}const ia=[0,-6,-12,-24,-48].map(t=>({value:gn(t),label:t===0?"0":`−${-t}`})),hs=1;function fs(t){let e=0,n=0;for(const i of t){const r=Math.abs(i);r>e&&(e=r),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function ra(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<te?0:gn(Math.min(et,n)):null}const Qa="netcomposer.studio.mix.v1",ei={position:tn,mute:!1,solo:!1,sendA:0,sendB:0};function Ve(){return{v:1,channels:{},master:U,returns:{a:{on:!0,level:U},b:{on:!0,level:U}},insert:{on:!1},fx:{},channelFx:{}}}const Ye=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,vt=(t,e)=>typeof t=="boolean"?t:e,re=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function gs(t){const e=re(t);return{position:Ye(e.position,ei.position),mute:vt(e.mute,!1),solo:vt(e.solo,!1),sendA:Math.min(U,Ye(e.sendA,0)),sendB:Math.min(U,Ye(e.sendB,0))}}function ti(t){const e=Ve(),n=re(t);if(n.v!==1)return e;const i={};for(const[c,u]of Object.entries(re(n.channels)))c.length>0&&c.length<=64&&(i[c]=gs(u));const r=re(n.returns),o=(c,u)=>{const m=re(c);return{on:vt(m.on,u.on),level:Ye(m.level,u.level)}},s={},l=re(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const d={};for(const[c,u]of Object.entries(re(n.channelFx)))c.length>0&&c.length<=64&&u&&typeof u=="object"&&(d[c]=u);return{v:1,channels:i,master:Ye(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:vt(re(n.insert).on,e.insert.on)},fx:s,channelFx:d}}function ni(){try{return globalThis.localStorage??null}catch{return null}}function bs(t=ni()){try{const e=t?.getItem(Qa);return e?ti(JSON.parse(e)):Ve()}catch{return Ve()}}function ai(t,e=ni()){try{return e?.setItem(Qa,JSON.stringify(t)),e!==null}catch{return!1}}const ys="netcomposer.studio.hidden.v1",st=1/120,ae="master",oa="Inserts",vs="(max-width: 768px)",ut=8,pt=t=>ps(Ja(t)),sa=t=>{const e=pt(t);return e==="−∞"?"off":`${e} dB`};function ws(t,e){return Me.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function $s(t,e,n){const i=n.bpm,r=v=>{const S=n.order(),M=S.indexOf(v);return M<0?S.length:M},o=(v,S,M,A)=>{const R=ws(M,A);if(!R||!S)return null;const _=Number(S.getParam(M,A)??R.default),E=`mix-${v}-${A}`;return R.options?{type:"select",id:E,label:R.label,value:String(_),options:R.options.map(O=>({value:String(O.value),label:O.label})),onChange:O=>{S.setParam(M,A,Number(O)),x.render()}}:{type:"slider",id:E,label:R.label,min:R.min,max:R.max,step:R.step??1,value:_,valueText:R.format(_,i()),onChange:O=>{S.setParam(M,A,O),x.render()}}},s=(v,S,M,A)=>A.map(R=>o(v,S,M,R)).filter(R=>R!==null),l=matchMedia(vs);let d=l.matches?null:ae;const c=v=>{d=v===null&&!l.matches?ae:v,x.render()},u=v=>c(d===v?l.matches?null:ae:v);l.addEventListener("change",()=>c(d));const m=(v,S,M,A)=>{const R=Number(S.getParam(M,A.key)??A.default),_=`hack-${v}-${M}-${A.key}`,E=O=>{S.setParam(M,A.key,O),x.render()};return A.options?{type:"select",id:_,label:A.label,value:String(R),options:A.options.map(O=>({value:String(O.value),label:O.label})),onChange:O=>E(Number(O))}:{type:"slider",id:_,label:A.label,min:A.min,max:A.max,step:A.step??.001,value:R,valueText:wa(A,R,i()),onChange:E}},f="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}},g=(v,S,M)=>{const A=M.getChain(),R=A.map((E,O)=>{const K=V(E.type)?.dials??[],I=P=>{M.moveEffect(E.id,P),x.render()},D=[];return O>0&&D.push({type:"button",id:`hack-${v}-${E.id}-left`,label:"Move left",on:!1,onPress:()=>I(O-1)}),O<A.length-1&&D.push({type:"button",id:`hack-${v}-${E.id}-right`,label:"Move right",on:!1,onPress:()=>I(O+1)}),D.push({type:"button",id:`hack-${v}-${E.id}-remove`,label:"Remove",ariaLabel:`Remove ${E.name} from ${S}`,on:!1,onPress:()=>{M.removeEffect(E.id),x.render()}}),{type:"fx",id:`hack-${v}-${E.id}`,title:`${O+1} · ${E.name}`,depth:O%4+1,on:!E.bypass,onToggle:P=>{M.setParam(E.id,"bypass",!P),x.render()},controls:K.filter(P=>!P.more).map(P=>m(v,M,E.id,P)),more:[...K.filter(P=>P.more).map(P=>m(v,M,E.id,P)),...D]}}),_=A.length>=ut;return R.push({type:"fx",id:`hack-${v}-add`,title:`${S} · Inserts`,depth:A.length%4+1,controls:[{type:"note",id:`hack-${v}-note`,text:_?`${A.length} of ${ut}: the stack is full.`:A.length===0?"No effects yet.":`${A.length} of ${ut}, first to last.`},..._?[]:[{type:"select",id:`hack-${v}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...Qi.map(E=>({value:E,label:V(E)?.label??E}))],onChange:E=>{E!==f&&(M.addEffect(E,{dials:y[E]}),x.render())}}]]}),R},b=v=>{const S=e.returns[v];return{type:"slider",id:`mix-${v}-return`,label:"Return",min:0,max:1,step:st,value:S.level,valueText:sa(S.level),onChange:M=>e.setReturn(v,{level:M})}},p=()=>[...e.list()].sort((v,S)=>r(v.id)-r(S.id)).map(v=>({type:"strip",id:`strip-${v.id}`,label:v.name,value:v.strip.position,valueText:pt(v.strip.position),step:st,defaultValue:tn,resetText:`${pt(tn)} dB`,ticks:[...ia],mute:v.strip.mute,solo:v.strip.solo,silent:v.silent,onChange:S=>e.set(v.id,{position:S}),onTypeIn:S=>{const M=ra(S);M!==null&&e.set(v.id,{position:M})},onRemove:S=>n.onRemove(v.id,S),...v.fx?{hacks:d===v.id,hacksLabel:oa,onHacks:()=>u(v.id)}:{},onMute:()=>e.set(v.id,{mute:!v.strip.mute}),onSolo:()=>e.set(v.id,{solo:!v.strip.solo}),sends:["A","B"].map(S=>{const M=S==="A"?"sendA":"sendB",A=v.strip[M];return{id:`send-${S.toLowerCase()}-${v.id}`,label:S,ariaLabel:`${v.name} send ${S}`,min:0,max:U,step:st*2,value:A,valueText:sa(A),defaultValue:0,onChange:R=>e.set(v.id,{[M]:R})}})})),h=()=>({type:"strip",id:`strip-${ae}`,label:"Master",master:!0,hacks:d===ae,hacksLabel:oa,onHacks:()=>u(ae),channels:2,value:e.masterPositionValue,valueText:pt(e.masterPositionValue),step:st,defaultValue:U,resetText:"0.0 dB",ticks:[...ia],onChange:v=>e.setMaster(v),onTypeIn:v=>{const S=ra(v);S!==null&&e.setMaster(S)}}),k=()=>{const v=e.returns.a,S=e.returns.b,M=e.list().find(A=>A.id===d&&A.fx);return!M&&d!==null&&(d=ae),{id:"mix",title:"Mix",summary:`${e.list().map(A=>A.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...p(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(A=>({value:A.id,label:A.available===!1?`${A.name} (soon)`:A.name,disabled:A.available===!1})),onAdd:A=>n.onAdd(A)}]},{id:"fx",area:"fx",label:M?`${M.name} inserts`:"Effects",controls:M?.fx?g(M.id,M.name,M.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:v.on,onToggle:A=>e.setReturn("a",{on:A}),controls:[b("a"),...s("a",v.fx,"plate",["decay","size"])],more:s("a",v.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:A=>e.setReturn("b",{on:A}),controls:[b("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:A=>e.setInsert(A),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},{id:"master",area:"master",label:"Master",controls:[h()]}]}},$=Ho(k(),ys),L=()=>$.el.toggleAttribute("data-hacks-folded",d===null);L(),ks($.el,n),ca($.el),Do(t,[$],"adjacent");const w=v=>({peak:aa(v.peak),rms:aa(v.rms),over:v.peak>=hs}),x={module:$,get hacksShown(){return d},showHacks:c,render(){$.update(k()),L(),ca($.el)},frame(v){if($.el.dataset.ncOpen==="true"){for(const S of e.list())Jn($.el,`strip-${S.id}`)?.update([w(S.levels())],v);Jn($.el,`strip-${ae}`)?.update(e.masterLevels().map(w),v)}}};return x}const Gt="application/x-nc-strip",wt=".nc-strip:not([data-nc-master])",la=`${wt}, .nc-strip-add`,_t=t=>t?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function ca(t){for(const e of t.querySelectorAll(`${wt} .nc-strip-hd`))!(e instanceof HTMLElement)||e.draggable||(e.draggable=!0,e.title="Drag to move this channel")}function ks(t,e){const n=()=>{for(const r of t.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of t.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},i=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};t.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd"):null)?.closest(wt),l=_t(s??null);!l||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(Gt,l),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),t.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(Gt))return;const o=r.target instanceof Element?r.target.closest(la):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":i(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const l of t.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),t.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(Gt),s=r.target instanceof Element?r.target.closest(la):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),e.onReorder?.(o,null);return}const l=_t(s),d=i(s,r.clientX);if(n(),!l||l===o)return;let c=l;if(d==="after"){const u=[...t.querySelectorAll(wt)],m=u[u.indexOf(s)+1];if(c=m?_t(m):null,c===o)return}e.onReorder?.(o,c)}),t.addEventListener("dragend",n)}const Ae=.012,Ht=1024;class xs{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=U;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(Ht);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const i=()=>new AnalyserNode(e,{fftSize:Ht});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:pe(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const l=new GainNode(e,{gain:1}),d=n.fx?.(s)??null,c=new GainNode(e,{gain:pe(U)}),u=i();return d?(l.connect(d.input),d.output.connect(c)):c.gain.value=0,c.connect(u),c.connect(this.bus),{bus:l,fx:d,gain:c,meter:u,on:d!==null,level:U}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let i=this.channels.find(r=>r.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fx?.input??i.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Ht}),l=new GainNode(this.ctx,{gain:0}),d=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(e)??null;c?(r.connect(c.input),c.output.connect(o)):r.connect(o),o.connect(s).connect(this.bus),o.connect(l).connect(this.returns.a.bus),o.connect(d).connect(this.returns.b.bus),i={id:e,name:n,input:r,fader:o,meter:s,sendA:l,sendB:d,fx:c,strip:this.restore?.(e)??ei},this.channels.push(i),this.apply()}return this.emit(),i.input}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const r of[i.input,i.fader,i.meter,i.sendA,i.sendB])r.disconnect();i.fx?.output.disconnect(),i.fx?.dispose(),this.apply(),this.emit()}}tapNode(e){return e==="master"?this.limiter:this.channels.find(n=>n.id===e)?.fader??null}set(e,n){const i=this.channels.find(r=>r.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(pe(e),this.ctx.currentTime,Ae),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,r,Ae)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(pe(i.level),r,Ae)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n);for(const i of this.channels)i.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=ms(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,r)=>{i.fader.gain.setTargetAtTime(e[r]??0,n,Ae),i.sendA.gain.setTargetAtTime(pe(i.strip.sendA),n,Ae),i.sendB.gain.setTargetAtTime(pe(i.strip.sendB),n,Ae)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),fs(this.scratch)}emit(){for(const e of this.listeners)e()}}const bn="studio";function Ss(){let t=null;const e=new Set,n=new Set,i=o=>{if(o!==t){t=o;for(const s of n)s()}},r=(o,s)=>(o.add(s),()=>{o.delete(s)});return{owner:()=>t,claim(o){t===null&&i(o)},claimAll(){i(bn);for(const o of[...e])try{o()}catch{}},clear:()=>i(null),onAll:o=>r(e,o),onChange:o=>r(n,o)}}const As=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function Es(t){return As.find(e=>t(e))??null}function Ls(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function Ts(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${Ls(e)}`}class Ms{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:Es(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});i({blob:r,name:Ts(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const Ns="NetComposer Studio",ee=[40,240],Cs="nc-sync";function Is(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${Cs}${n}`,locks:e?{request:(i,r,o)=>e.request(`${i}${n}`,r,o)}:null}}function Rs(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function zs(t,e){const n=new zi({bpm:120,minBpm:ee[0],maxBpm:ee[1],timebase:"shared"}),i=new Zi({app:Ns,version:"0.1.0",clock:n,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:ee},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let r=!1;return{clock:n,peer:i,async start(){r||(r=!0,await i.start())},play:()=>n.play({at:Be()}),stop:()=>n.stop({at:Be()}),setTempo:o=>n.setTempo({bpm:Os(o)}),playing:()=>n.transport.isPlayingAt(Be()),running:()=>n.transport.running,bpm:()=>n.transport.bpm,position(){const o=n.transport,s=Be();return o.isPlayingAt(s)?js(o.beatAt(s)):null},beatPhase(){const o=n.transport,s=Be();if(!o.isPlayingAt(s))return null;const l=o.beatAt(s);return l-Math.floor(l)},peers:()=>[...i.peers.values()]}}function Os(t){return Number.isFinite(t)?Math.min(ee[1],Math.max(ee[0],Math.round(t*10)/10)):120}function js(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}const nn="netcomposer.scene",ii=1,ri="netcomposer.studio.tempo.v1",oi="netcomposer.studio.scene-name.v1",$t=120,yn="Untitled scene",Bs=2*1024*1024;function Tt(t){const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(ee[1],Math.max(ee[0],Math.round(e*10)/10)):$t}function ge(t){return(typeof t=="string"?t.replace(/\s+/g," ").trim().slice(0,60):"")||yn}function Ps(t){return{format:nn,v:ii,name:ge(t.name),saved:(t.now??new Date).toISOString(),tempo:{bpm:Tt(t.bpm)},meter:[4,4],instances:t.instances.map(e=>({id:e.id,type:e.type,name:e.name})),mix:t.mix,presets:t.presets??{},media:t.media??[]}}function Ws(t,e){if(t.length>Bs)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(t)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const i=n;if(i.format!==nn)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof i.v=="number"?i.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const c of Array.isArray(i.instances)?i.instances:[]){if(!c||typeof c!="object")continue;const u=c.id;if(typeof u!="string")continue;const m=mn(u);if(!m||!e.includes(m.type)||o.has(u))continue;o.add(u);const f=c.name;s.push({id:u,type:m.type,name:typeof f=="string"?f.slice(0,40):u})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=i.tempo&&typeof i.tempo=="object"?i.tempo.bpm:void 0,d={};if(i.presets&&typeof i.presets=="object")for(const[c,u]of Object.entries(i.presets))o.has(c)&&(d[c]=u);return{ok:!0,scene:{format:nn,v:ii,name:ge(i.name),saved:typeof i.saved=="string"?i.saved:"",tempo:{bpm:Tt(l)},meter:[4,4],instances:s,mix:ti(i.mix??Ve()),presets:d,media:Array.isArray(i.media)?i.media:[]}}}function Fs(t){return`${ge(t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Gs(t){try{const e=t?.getItem(ri);return e?Tt(Number(e)):$t}catch{return $t}}function si(t,e){try{e?.setItem(ri,String(Tt(t)))}catch{}}function _s(t){try{return ge(t?.getItem(oi))}catch{return yn}}function li(t,e){try{e?.setItem(oi,ge(t))}catch{}}const Hs=300,Ds=120*1e3;function Ys(t){return Object.prototype.toString.call(t)==="[object Float32Array]"}function Zs(t){const e=t&&typeof t=="object"?t:null;if(!e)return{ok:!1,message:"No audio."};const n=typeof e.name=="string"?e.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const i=e.sampleRate;if(typeof i!="number"||!Number.isFinite(i)||i<8e3||i>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=e.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(Ys))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(d=>d.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Hs*i)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof e.bars=="number"&&Number.isInteger(e.bars)&&e.bars>=1&&e.bars<=256?e.bars:void 0,l=typeof e.bpm=="number"&&Number.isFinite(e.bpm)&&e.bpm>=20&&e.bpm<=300?e.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:i,channels:r.map(d=>new Float32Array(d)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function da(t){try{const e=t.targets();return Array.isArray(e)?e.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const i=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:i,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Xs(t={}){const e=new Map,n=s=>t.live?.(s)??!0,i=s=>t.nameOf?.(s)??s,r=t.answerMs??Ds,o=s=>[...e.entries()].filter(([l])=>l!==s&&n(l)).map(([l,d])=>{const c=t.brandOf?.(l);return{instance:l,name:i(l),...c?{brand:c}:{},label:typeof d.label=="string"&&d.label?d.label.slice(0,24):"Target",targets:da(d)}});return{forget(s){e.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,d,c){const u=e.get(l);if(l===s||!u||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!da(u).some(g=>g.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const m=Zs(d);if(!m.ok)return{ok:!1,reason:"invalid",message:m.message};const f={...m.audio,from:s,fromName:t.brandOf?.(s)??i(s)};let y;try{const g=await Promise.race([Promise.resolve(u.receive(f,c)),new Promise(b=>{y=setTimeout(()=>b({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!g||typeof g!="object"||typeof g.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:g}catch(g){return{ok:!1,reason:"error",message:g instanceof Error?g.message:String(g)}}finally{clearTimeout(y)}},onAudio(l){return e.set(s,l),()=>{e.get(s)===l&&e.delete(s)}},reveal(){n(s)&&t.reveal?.(s)}}}}}const Us="/studio/assets/silence-processor-D4WJD_Gt.js";function Vs(t,e=fn){const n=e.find(o=>o.id===t.type),i=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??i,rest:` / ${i} / ${r}`,...n?.identity?{identity:n.identity}:{}}}function qs(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const l=new URL(String(o),e).href;let d=i.get(l);return d||(d=n(o,s),i.set(l,d),d.catch(()=>{i.get(l)===d&&i.delete(l)})),d},configurable:!0}),t}const F=new AudioContext({latencyHint:"interactive"});qs(F.audioWorklet,location.href);const Z=bs(),he={},Ks=ut,vn=new Map,W=new xs(F,{restore:t=>Z.channels[t],fx:t=>{const e=In(F,{moduleUrl:Ut,bpm:120,state:os(t,Z)});return he[t]=e,e},channelFx:t=>{xt.delete(t);const e=In(F,{moduleUrl:Ut,bpm:z.bpm(),slots:Ks,state:Z.channelFx[t]??{v:2,chain:[]}}),n=Sa(e,z.clock,{mapper:tt}),i=e.dispose.bind(e);return e.dispose=()=>{n(),i()},e.onChange(Nt),vn.set(t,e),e}});W.setMaster(Z.master);W.setReturn("a",Z.returns.a);W.setReturn("b",Z.returns.b);W.setInsert(Z.insert.on);const tt=new Yi(F);tt.start();const ci=Rs();let di=()=>{};const Js=ss(F,{nodeFor:t=>W.tapNode(t),sources:()=>[{id:"master",name:"Master"},...W.list().map(t=>({id:t.id,name:t.name}))],ready:new Promise(t=>{di=t})}),fe=Ss(),Ne=ts(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),ui=Xs({live:t=>C.some(e=>e.id===t),nameOf:t=>C.find(e=>e.id===t)?.name??t,brandOf:t=>{const e=C.find(i=>i.id===t),n=q.find(i=>i.id===e?.type)?.brand;return e&&n?e.n===1?n:`${n} ${e.n}`:void 0},reveal:t=>{ne(t),document.getElementById(`tab-${t}`)?.scrollIntoView({block:"nearest"}),ce.get(t)?.contentWindow?.focus()}});window.ncStudio=is(F,W,{presets:Ne,share:ui,grab:Js,play:fe,mapper:ls(tt),resolve:(t,e)=>rl(t,e),syncScope:ci,fxWorklet:new URL(Ut,location.href).href});const z=zs(()=>F.state,Is(ci));function Re(){try{return globalThis.localStorage??null}catch{return null}}z.setTempo(Gs(Re()));const mt=new Ms(W.recordOut.stream);let lt=null;function N(t,e={},...n){const i=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||i.setAttribute(r,o===!0?"":String(o));return i.append(...n),i}const qe=N("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),ze=N("input",{type:"number",class:"bpm",min:ee[0],max:ee[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),kt=N("output",{class:"position","aria-label":"Bar and beat"},"—"),oe=N("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),He=N("a",{class:"take",hidden:!0}),wn=N("span",{class:"status",role:"status"}),Le=N("input",{type:"text",class:"scene-name",maxlength:60,value:_s(Re()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),pi=N("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),mi=N("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),hi=N("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),Ze=N("input",{type:"file",accept:".json,application/json",hidden:!0}),Qs=N("h1",{class:"brand","aria-label":"NetComposer Studio"},N("span",{"aria-hidden":"true"},"NetComposer",N("span",{class:"brand-sep"}," / "),"Studio")),an=N("span",{class:"beat-light","aria-hidden":"true"}),$n=N("span",{class:"status-long"}),kn=N("span",{class:"status-short"});wn.append($n,kn);const rn=N("header",{class:"top"},N("div",{class:"transport"},qe,N("label",{class:"tempo"},ze,N("span",{class:"tempo-unit"},"BPM")),an,kt),N("div",{class:"record"},oe,He),wn),el=N("div",{class:"scene",role:"group","aria-label":"Scene"},Le,pi,mi,hi,Ze);mt.supported||(oe.disabled=!0,oe.title="This browser can't record audio");const Oe=N("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),fi=N("div",{class:"stage"}),nt=N("label",{class:"tab tab-add",title:"Add an instrument"},N("span",{"aria-hidden":"true"},"+")),Ce=N("select",{class:"tab-add-select","aria-label":"Add an instrument"});Ce.append(N("option",{value:""},"Add an instrument"),...fn.map(t=>{const e=N("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));Ce.addEventListener("change",()=>{const t=Ce.value;Ce.value="",t&&wi(t)});nt.append(Ce);Oe.append(nt);const Ke=N("div",{class:"spine","aria-hidden":"true"}),ce=new Map;let C=qo(Vo(q),q),de=C[0]?.id??"";const tl=new URLSearchParams(location.search).has("measure"),ua=new Map,nl=2e4;function gi(t){const e=N("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>ne(t.id)),Oe.insertBefore(e,nt);const i=(ua.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!C.some(l=>l.id===t.id))return r();const o=N("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:Zo(t,tl),allow:"autoplay; clipboard-read; clipboard-write; microphone"});ce.set(t.id,o);const s=window.setTimeout(r,nl);o.addEventListener("load",()=>al(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),fi.append(o),ne(de)}));return ua.set(t.type,i),i}function al(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="";const n=t.id.replace(/^panel-/,""),i=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const l=e?.querySelector(".nc-page-hd, .nc-title-band");l&&(yi.set(n,Math.round(l.getBoundingClientRect().bottom)),n===de&&vi())};i();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(()=>{i(),Mt()}).observe(r),xn.add(t),bi(t)}const xn=new Set;function bi(t){let e;try{e=t.contentDocument?.documentElement}catch{return}if(!e||!t.isConnected){xn.delete(t);return}const n=t.getBoundingClientRect();if(n.height<=0)return;const i=getComputedStyle(rn).position==="sticky"?rn.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,i-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));e.style.setProperty("--nc-host-top",`${Math.round(r)}px`),e.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),e.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let Dt=!1;function Mt(){Dt||(Dt=!0,requestAnimationFrame(()=>{Dt=!1;for(const t of xn)bi(t)}))}window.addEventListener("scroll",Mt,{passive:!0});window.addEventListener("resize",Mt);const yi=new Map;function vi(){const t=yi.get(de);t===void 0?Ke.style.removeProperty("--spine-top"):Ke.style.setProperty("--spine-top",`${t}px`)}function il(t){if(!t){Ke.replaceChildren();return}const e=Vs(t),n=N("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),Ke.replaceChildren(N("span",{class:"spine-text"},n,N("span",{class:"spine-rest"},e.rest)))}function ne(t){de=t,il(C.find(e=>e.id===t)),vi(),Mt();for(const e of C){const n=e.id===t;ce.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const rl=Ko(()=>C.map(t=>({instance:t,window:()=>ce.get(t.id)?.contentWindow,readyState:()=>{try{return ce.get(t.id)?.contentDocument?.readyState}catch{return}}})),q);function wi(t){const e=q.find(r=>r.id===t);if(!e)return;const n=Xo(C,e),i=C.map(r=>r.type).lastIndexOf(n.type);C=i<0?[...C,n]:[...C.slice(0,i+1),n,...C.slice(i+1)],Qe(C),gi(n);for(const r of C){const o=document.getElementById(`tab-${r.id}`);o&&Oe.insertBefore(o,nt)}ne(n.id),be?.render()}function ol(t,e){const n=C.find(o=>o.id===t);if(!n)return;const i=C.filter(o=>o.id!==t),r=e===null?i.length:i.findIndex(o=>o.id===e);C=[...i.slice(0,r<0?i.length:r),n,...i.slice(r<0?i.length:r)],Qe(C);for(const o of C){const s=document.getElementById(`tab-${o.id}`);s&&Oe.insertBefore(s,nt)}be?.render()}async function sl(t,e){const i=C.find(s=>s.id===t)?.name??t;if(!await dn({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;C=C.filter(s=>s.id!==t),Qe(C),ui.forget(t);const o=ce.get(t);ce.delete(t),o?.setAttribute("src","about:blank"),o?.remove(),document.getElementById(`tab-${t}`)?.remove(),W.detach(t),ll(t),de===t&&ne(C[0]?.id??"")}const on=N("div",{class:"mix"});on.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==de&&C.some(i=>i.id===n)&&ne(n)});let be=null,sn=0;const xt=new Set;function ll(t){xt.add(t),delete Z.channels[t],delete Z.channelFx[t],vn.delete(t),Nt()}let $i=!1;function Nt(){window.clearTimeout(sn),!$i&&(sn=window.setTimeout(()=>{ai(ki())},300))}function ki(){const t={...Z.channels};for(const i of W.list())t[i.id]=i.strip;for(const i of xt)delete t[i];const e={};for(const i of["a","b","insert"]){const r=he[i];r&&(e[i]=r.getState())}const n={...Z.channelFx};for(const[i,r]of vn)n[i]=r.getState();for(const i of xt)delete n[i];return{v:1,channels:t,master:W.masterPositionValue,returns:{a:{on:W.returns.a.on,level:W.returns.a.level},b:{on:W.returns.b.on,level:W.returns.b.level}},insert:{on:W.insertEnabled},fx:e,channelFx:n}}W.onChange(()=>{be?.render(),Nt()});for(const t of Object.values(he))t?.onChange(Nt);async function xi(){F.state!=="running"&&await F.resume()}qe.addEventListener("click",()=>{xi(),z.running()&&fe.owner()===bn?z.stop():z.running()?fe.claimAll():(fe.claimAll(),z.play()),ye()});function Si(){const t=Number(ze.value);z.setTempo(t),si(z.bpm(),Re())}Le.addEventListener("change",()=>{Le.value=ge(Le.value),li(Le.value,Re())});function cl(t,e,n){const i=URL.createObjectURL(new Blob([e],{type:n})),r=N("a",{href:i,download:t});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}pi.addEventListener("click",async()=>{const t=ge(Le.value),e=C.map(o=>o.id),n=await Ne.collect(e),i=Ps({name:t,bpm:z.bpm(),instances:C,mix:ki(),presets:n});cl(Fs(t),`${JSON.stringify(i,null,2)}
`,"application/json");const r=C.filter(o=>!n[o.id]).map(o=>o.name);Sn(r.length?`Saved “${t}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${t}”`)});mi.addEventListener("click",()=>Ze.click());Ze.addEventListener("change",async()=>{const t=Ze.files?.[0];if(Ze.value="",!t)return;const e=Ws(await t.text(),q.filter(r=>r.available!==!1).map(r=>r.id));if(!e.ok){Sn(e.error);return}const n=e.scene;await dn({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Ai({name:n.name,bpm:n.tempo.bpm,ids:n.instances.map(r=>r.id),mix:n.mix,presets:n.presets})});hi.addEventListener("click",async()=>{await dn({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Ai({name:yn,bpm:$t,ids:Ue(q).map(e=>e.id),mix:Ve()})});function Ai(t){z.running()&&z.stop(),$i=!0,window.clearTimeout(sn);const e=t.ids.map(n=>{const[i,r]=n.split("#"),o=q.find(s=>s.id===i);return o?Je(o,r?Number(r):1):null}).filter(n=>n!==null);Qe(e),ai(t.mix),si(t.bpm,Re()),li(t.name,Re()),Ne.stash({...t.presets??{}}),location.reload()}let pa=0;function Sn(t){$n.textContent=t,kn.textContent=t,window.clearTimeout(pa),pa=window.setTimeout(ye,4e3)}ze.addEventListener("change",Si);ze.addEventListener("keydown",t=>{t.key==="Enter"&&Si()});oe.addEventListener("click",async()=>{if(xi(),mt.recording){const t=await mt.stop();oe.setAttribute("aria-pressed","false"),oe.textContent="Rec",t&&(lt&&URL.revokeObjectURL(lt.url),lt={url:URL.createObjectURL(t.blob),take:t},He.href=lt.url,He.download=t.name,He.textContent=`Save take (${t.seconds.toFixed(1)} s)`,He.hidden=!1)}else mt.start(),oe.setAttribute("aria-pressed","true"),oe.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),qe.click())});Oe.addEventListener("keydown",t=>{if(t.target===Ce)return;const e=C.map(r=>r.id),n=e.indexOf(de),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),ne(i),document.getElementById(`tab-${i}`)?.focus())});function ye(){const t=z.running()&&fe.owner()===bn;qe.textContent=t?"Stop":"Play",qe.setAttribute("aria-pressed",String(t)),document.activeElement!==ze&&(ze.value=String(Math.round(z.bpm()*10)/10));const e=z.position();kt.value=e?`${e.bar}.${e.beat}`:"—";const n=z.peers().length;$n.textContent=F.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",kn.textContent=F.state==="running"?"":"Audio off",wn.classList.toggle("off",F.state!=="running")}z.clock.onChange(()=>{z.running()||fe.clear(),ye()});fe.onChange(ye);z.clock.onChange(()=>be?.render());z.peer.onPeers(ye);F.addEventListener("statechange",ye);const dl=.25;let ma=performance.now();function Ei(t){const e=Math.min(.1,(t-ma)/1e3);ma=t,be?.frame(e);const n=z.position(),i=n?`${n.bar}.${n.beat}`:"—";kt.value!==i&&(kt.value=i);const r=z.beatPhase(),o=r!==null&&r<dl;an.hasAttribute("data-on")!==o&&an.toggleAttribute("data-on",o),requestAnimationFrame(Ei)}async function ul(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Qs,rn,el,on,N("main",{class:"instruments"},Oe,N("div",{class:"bay"},Ke,fi))),be=$s(on,W,{order:()=>C.map(e=>e.id),catalogue:fn,bpm:()=>z.bpm(),onAdd:wi,onRemove:(e,n)=>void sl(e,n),onReorder:(e,n)=>ol(e,n)}),F.state==="running"&&await F.suspend(),await F.audioWorklet.addModule(Us),di(),await z.start();for(const e of[he.a,he.b,he.insert])e&&Sa(e,z.clock,{mapper:tt});for(const e of C)gi(e);ne(de),ye(),requestAnimationFrame(Ei),document.documentElement.dataset.studioReady="",pl()}function pl(){const t=new Set(Ne.pending());if(!t.size)return;const e=[],n=o=>C.find(s=>s.id===o)?.name??o,i=()=>{window.clearTimeout(r);const o=[...e,...Ne.dropPending()].map(n);Sn(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};Ne.onApplied((o,s)=>{t.delete(o)&&(s||e.push(o),t.size||i())});const r=window.setTimeout(i,Qo)}window.__studio={ctx:F,mixer:W,mapper:tt,transport:z,frames:ce,show:ne,get instances(){return C},fx:he,get mix(){return be}};ul();
