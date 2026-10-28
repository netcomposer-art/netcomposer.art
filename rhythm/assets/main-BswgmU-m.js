(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const ne=1e-9;function Xn(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class et{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Xn(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let a=i.length?i[0].bpm:this.bpm;for(const o of i)o.beat<=e.beat+ne&&(a=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const o of i){if(o.beat<=e.beat+ne)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+ne){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-ne;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const r=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const o=Math.max(1,Math.round(i/a));this.setTempoAt(r,t);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,t+i*(l-1)/o)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new et({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+ne)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+ne)return t[i];return t[0]}}const Qn=Object.freeze({beatsPerBar:4,beatUnit:4}),se=1e-9;function Zn(n){return Math.floor(n+se)}function Wt(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-se)*e;return t&&a<=n+se?a+e:a}class ei{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new et({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Qn}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-se&&(this.stopTime===null||e<this.stopTime-se)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-se?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=Zn(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return Wt(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Yt="nc-clock/snapshot",Jt=1;function ti(n,e="local"){return{format:Yt,version:Jt,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function ni(n,e){const t=si(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function ii(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const q=n=>typeof n=="number"&&Number.isFinite(n),St=n=>n===null||q(n);function si(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==Yt&&t("format"),(!q(e.version)||Math.floor(e.version)!==Jt)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!q(e.anchor.beat)||!q(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&q(i.beat)&&q(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!q(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!q(e.meter.beatUnit))&&t("meter"),(!St(e.startTime)||!St(e.stopTime)||!q(e.stoppedBeat))&&t("transport times"),e}class ai{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ei(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){ni(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return ti(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const ri="nc-sync/1",oi=1,li="nc-sync",ci="nc-sync-leader",di=0,Xt=.5,Qt=.75;function ui(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Xt&&n<=Qt?n:null}const Pe=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),de=n=>typeof n=="number"&&Number.isFinite(n),fe=n=>typeof n=="string"&&n.length>0;function pi(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==oi||!fe(e.type)||!fe(e.from)||!de(e.term)||!de(e.seq)||!de(e.sentAt))return null;switch(e.type){case"hello":return fe(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return de(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&de(e.slot)?e:null;case"ping":case"pong":return fe(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function hi(n,e,t,i,a){return{proto:ri,from:e,term:t,seq:i,sentAt:a,...n}}function R(){return(performance.timeOrigin+performance.now())/1e3}const _e=.003,mi=3,fi=.01,Tt=500;class gi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?fi:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=_e&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,r=this.median(),o=a-r,l=Math.abs(a-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!d&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(a,r,d))):(this.pendingStep=o,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,i){const a=this.ctx.currentTime,r=a<=this.revertUntil;let o;if(i&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-t,confirmedAt:a,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,u=this.preStep;u.length=0;for(let p=0;p<c.length;p++)u.push(c[p]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?a+this.stepRevert:-1/0}const l=this.offsets,d=e-t;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,o={stepSeconds:e-t,confirmedAt:a,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,t=this.scratch,i=e.length;t.length=i;for(let r=0;r<i;r++){const o=e[r];let l=r-1;for(;l>=0&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}const a=i>>1;return i%2?t[a]:(t[a-1]+t[a])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=_e&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Tt)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=_e)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<Tt)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(mi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class bi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Pe,...e.capabilities},this.channelOption=e.channel??li,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,r]=this.tempoRange();e=Math.min(r,Math.max(a,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const d=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??Wt(d,1),d);i&&i>0?(o.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Qt,Math.max(Xt,e)):di;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=ui(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=pi(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Pe,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Pe},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ci,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,o,l)=>[r?0:1,o,l];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(a===null||o[0]<i[0]||o[0]===i[0]&&(o[1]<i[1]||o[1]===i[1]&&o[2]<i[2]))&&(i=o,a=r.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(hi(e,this.id,this.term,++this.seq,this.o.now()))}}const yi=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],D=10,Zt=["1","2","3","4","5","6","7","8","9","0"];function en(){return{slots:Array.from({length:D},()=>null),active:null}}function tt(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function wi(n,e,t){const i=n.slots.slice();return i[e]=tt(t),{slots:i,active:e}}function ki(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Et(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function $i(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=tt(e),{slots:t,active:n.active}}const vi=16,xi=[2,6,10,14],Si=[2,3,6,10,11,14],Mt=[0,2,4,6,8,10,12,14],Ti=[2,6,10,14],Ei=[1,3,7,9,11,15],Mi={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function G(){return Array.from({length:vi},()=>!1)}function H(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function je(n,e,t){return H(n,Math.max(0,e-t),Math.min(1,e+t))}function Li(n){const e=G();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Ai(n){const e=G();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=xi.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function Ni(n,e){const t=G();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Ci(n,e){const t=G();let i=0;for(const a of Si)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function Pi(n){const e=G();let t=0;for(const i of Ti){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function _i(n,e){const t=G();for(const o of Mt)t[o]=!n[o];const i=Mt.filter(o=>t[o]&&o!==0),a=1+Math.floor(e()*3);for(let o=0;o<a&&i.length>0;o+=1){const l=Math.floor(e()*i.length),d=i.splice(l,1)[0];d!==void 0&&(t[d]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(t[o]=!0,r+=1)}return t}function ji(n,e){const t=G(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const r of i){if(a>=3)break;e()<.45&&(t[r]=!0,a+=1)}return t}function Ii(n,e,t){const i=G();let a=0;for(const r of Ei)a>=2||n[r]||e[r]||t()<.35&&(i[r]=!0,a+=1);return i}function tn(n,e,t){return Array.from({length:e},(i,a)=>{const r=n[a]===!0,o=r&&t(a);return{on:r,accent:o,velocity:o?1:.8}})}function nn(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function Ri(n,e,t){const i=Mi[n];return{tune:H(t,i.tune[0],i.tune[1],!0),decay:H(t,i.decay[0],i.decay[1]),tone:je(t,e.tone,.15),snap:je(t,e.snap,.15),drive:je(t,e.drive,.1),level:H(t,i.level[0],i.level[1])}}function sn(n){const e=Li(n),t=Ai(n),i=Pi(n);return{kick:e,snare:t,clap:Ni(t,n),rim:Ci(e,n),hat:_i(i,n),hatOpen:i,tom:ji(t,n),metal:Ii(e,t,n)}}function Bi(n,e,t){const i=n.tracks[e];if(!i)return n;const a=l=>l.every((d,c)=>d.on===(i.steps[c]?.on??!1));let r=i.steps;for(let l=0;l<6;l++){const d=sn(t)[i.voice];if(r=tn(d,i.length,c=>nn(i.voice,c)),!a(r)&&r.some(c=>c.on))break}const o=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((l,d)=>d===e?{...l,steps:[...r,...o]}:l)}}function zi(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,r)=>{if(r<t||r>=e.length)return a;const o=r-t;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function Oi(n,e){const t=sn(e),i=e()<.4?.5:H(e,.5,.62),a=e(),r=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:r,cutoff:H(e,.55,.9),resonance:H(e,.05,.3),drive:H(e,.02,.18)},tracks:n.tracks.map(o=>({...o,mute:o.mute,solo:o.solo,params:Ri(o.voice,o.params,e),steps:tn(t[o.voice],o.length,l=>nn(o.voice,l))}))}}function qi(n,e=Math.random){const t=[];let i=null;for(let r=0;r<D;r+=1){const o=tt(Oi(n,e));t.push(o),r===0&&(i=o)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}function nt(n){return`${Math.round(n*100)}%`}function Di(n){return nt(n)}function Hi(n,e){return n==="tune"?`${Math.round(e)} Hz`:nt(e)}function Fi(n){return n.charAt(0).toUpperCase()+n.slice(1)}const He=2,an=64;function Ui(n,e){const{version:t,...i}=n,a={...i,version:He,slots:Array.from({length:D},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(a)}function Lt(n){return Array.isArray(n)&&n.length<=an}function Gi(n){if(Wi(n)>Ki)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==it)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==He)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const i=t.version,{slots:a,active:r,...o}=t,l=$e({...o,version:st});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const d=l.document,c=[];for(const p of d.tracks)Lt(p.steps)||c.push(`More than ${an} steps on ${p.id}`);const u={slots:Array.from({length:D},()=>null),active:null};return i===He&&(!Array.isArray(a)||a.length!==D?c.push(`Expected ${D} slots`):a.forEach((p,f)=>{if(p==null)return;if(!$e({...d,swing:p.swing,fx:p.fx,tracks:p.tracks}).ok||!p.tracks.every(w=>Lt(w.steps))){c.push(`Slot ${f+1} is malformed`);return}const y=typeof p.seed=="number"&&Number.isFinite(p.seed)?p.seed>>>0:0;u.slots[f]={swing:p.swing,fx:p.fx,tracks:p.tracks,seed:y}}),r!=null&&(!Number.isInteger(r)||r<0||r>=D||!u.slots[r]?c.push("Active slot is empty or out of range"):u.active=r)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:d,bank:u,from:i}}const it="netcomposer.rhythm",st=1,Ki=256*1024,rn="netcomposer.rhythm.preset.",Vi=new Set(yi);function on(n){return`${rn}${n}`}function Wi(n){let e=0;for(const t of n){const i=t.codePointAt(0)??0;i<=127?e+=1:i<=2047?e+=2:i<=65535?e+=3:e+=4}return e}function $e(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==it&&e.push("Unknown format"),t.version!==st&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(rn))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)Vi.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function ln(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const Yi={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function cn(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:it,version:st,id:on("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:ln(e.on,e.accent),params:{...Yi[e.voice]}}))}}function Ji(){const n=cn();return{...n,id:on("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:ln([])}))}}const Xi="Tap to join",dn="Tap to join the playing beat";function ke(n,e){return n&&e?"join":e?"stop":"play"}function un(n){return n==="join"?Xi:n==="stop"?"Stop":"Play"}function Qi(n,e,t={}){const i=t.beatsPerBar??4,a=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+a)/i-1e-9)*i)}class Zi{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=ke(e,t),this.shown}gesture(e,t,i=!1){return this.joinedBy=!1,i||this.joining||ke(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const i=this.joinedBy||this.joining||ke(e,t)==="join";return this.joinedBy=!1,i}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=Qi(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class es{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const i=this.key(e);if(this.value=e,this.has=!0,!t&&i===this.lastKey)return!1;this.lastKey=i;for(const a of this.listeners)a(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class at{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,i,a={}){const r=a.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=a.atBeat??pn(t,a.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:i},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new at;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function pn(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class ts{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:a=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>i||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*a&&(this.taps=[r]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const d=this.meanInterval();return d===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/d)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const ns="nc-ui",is={breakpoint:{md:"768px"}},hn={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},W={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},ge=n=>`--${ns}-${n}`,Fe=hn["label-on-fill-dark"],At=hn["label-on-fill-light"],ss=W["label-min-contrast"],as=/^#[0-9a-f]{6}$/i,rs=n=>typeof n=="string"&&as.test(n),Ie=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Nt(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=r=>{const o=(r+n/30)%12;return t-i*Math.max(-1,Math.min(o-3,9-o,1))};return`#${Ie(a(0)*255)}${Ie(a(8)*255)}${Ie(a(4)*255)}`}function mn(n){const[e,t,i]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),a=Math.max(e,t,i),r=Math.min(e,t,i),o=(a+r)/2,l=a-r;if(!l)return{h:0,s:0,l:o};const d=l/(1-Math.abs(2*o-1));return{h:((a===e?60*((t-i)/l%6):a===t?60*((i-e)/l+2):60*((e-t)/l+4))+360)%360,s:d,l:o}}function Ct(n){const[e,t,i]=[1,3,5].map(a=>{const r=parseInt(n.slice(a,a+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function Ue(n,e){const[t,i]=[Ct(n),Ct(e)].sort((a,r)=>r-a);return(t+.05)/(i+.05)}const ve=n=>Ue(n,Fe)>=Ue(n,At)?Fe:At;function fn(n,e,t,i=ss){let a=Nt(n,e,t);const r=ve(a)===Fe?1:-1;for(let o=0;o<40&&Ue(a,ve(a))<i;o++)t+=r*.01,a=Nt(n,e,t);return a}function os(n){const{h:e,s:t}=mn(n),i=fn(e,Math.min(t,W["surprise-on-max-saturation"]),W["surprise-on-lightness"]);return{fill:n,ink:ve(n),on:i,onInk:ve(i)}}const ls=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function cs(n,e=Math.random){const[t,i]=W["surprise-saturation"],[a,r]=W["surprise-lightness"],o=W["surprise-min-hue-gap"],l=rs(n)?mn(n).h:null;let d=e()*360;return l!==null&&ls(d,l)<o&&(d=(l+o+e()*(360-2*o))%360),fn(d,t+e()*(i-t),a+e()*(r-a))}function ds(n){if(!n)return null;const e=os(n);return{[ge("surprise-fill")]:e.fill,[ge("surprise-ink")]:e.ink,[ge("surprise-on")]:e.on,[ge("surprise-on-ink")]:e.onInk}}const us=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],ps={renames:us},hs={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},ms={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},fs={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},Ee={};for(const[n,e]of Object.entries(hs))Ee[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(fs))Ee[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(ms))Ee[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(ps.renames.map(n=>[n.old,n.new]));function gn(n){const e=Ee[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function F(n){return gn(n).prop}function s(n){return`var(${F(n)})`}function gs(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(F(e)));return Number.isFinite(t)?t:0}function z(n,e){const t=gn(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const r=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=r:t.kind==="opacity"?a.style.opacity=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=r:a.style.color=r,(n instanceof Element?n:i.documentElement).append(a);const d=(i.defaultView??window).getComputedStyle(a),c=t.kind==="family"?d.fontFamily:t.kind==="color"?d.color:t.kind==="opacity"?d.opacity:d.paddingLeft;return a.remove(),c}function bs(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function ys(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const ws="[data-modulated], [data-modulated] *";function ks(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-fx[data-nc-depth="${i}"] {
      background: ${s(`module-bg-stack-${i}`)};
      ${F("text-sub")}: ${s(`module-sub-stack-${i}`)};
      ${F("divider")}: ${s(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${s(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${F("text-sub")}: ${s("module-sub-stack-1")};
      ${F("divider")}: ${s("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("body-size")};
  font-weight: ${s("title-weight")};
  line-height: ${s("rhythm.label-leading")};
}
button, input, select { font: inherit; color: inherit; }
.nc [hidden] { display: none !important; }
.nc-stack { display: flex; flex-direction: column; min-width: 0; }
.nc-module {
  background: ${s("module-bg-adjacent-1")};
  color: ${s("text")};
  padding: ${s("module-pad")};
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${s("font-ui")};
  transition: none;
}
${[1,2,3,4].map(e).join(`
`)}
${[1,2,3,4].map(n).join(`
`)}
${[1,2,3,4].map(t).join(`
`)}
.nc-module-hd {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${s("rhythm.header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("rhythm.head-margin")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${s("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${s("rhythm.header-gap")}; flex: none; }
.nc-index {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${s("rhythm.control-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: ${s("rhythm.label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${s("rhythm.module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${s("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-slim-lines {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${s("rhythm.module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${s("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${s("readout-size")};
  color: ${s("text")};
  white-space: nowrap;
}
/* The slider gives up width, not the label: TEMPO, SWING and DECAY are never cut to "TE…". */
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. */
.nc-field .nc-label { flex: none; min-width: ${s("rhythm.name-width")}; }
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${s("rhythm.module-gap")};
  row-gap: ${s("rhythm.control-gap")};
  padding-bottom: ${s("rhythm.module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
.nc-field[data-nc-slider] .nc-readout { grid-area: value; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(0, 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${s("rhythm.control-gap")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("rhythm.label-leading")};
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
  bottom: calc(-1 * ${s("rhythm.control-gap")});
  width: max(100%, ${s("target-min")});
  height: max(100%, ${s("target-min")});
  transform: translateX(-50%);
}
.nc-tap:hover { border-color: ${s("text-sub")}; color: ${s("text")}; }
.nc-tap:active { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-tap:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${s("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${s("rhythm.slider-block")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${s("accent")};
}
.nc-range:disabled { opacity: ${s("disabled-opacity")}; cursor: not-allowed; }
.nc-range::-webkit-slider-runnable-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${s("hairline")};
  background: ${s("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  margin-top: calc(${s("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
${ws} { transition: none; }
.nc-range:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("rhythm.control-gap")}; }
.nc-btn {
  width: 100%;
  border: ${s("hairline")} solid ${s("text")};
  background: transparent;
  color: ${s("text")};
  padding: ${s("rhythm.button-pad-y")} 0;
  font-size: ${s("readout-size")};
  letter-spacing: ${s("rhythm.button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-btn:hover { background: ${s("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${s("accent")};
  border-color: ${s("accent")};
  color: ${s("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${s("focus-width-strong")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-btn:disabled { opacity: ${s("disabled-opacity")}; }
.nc-toggle {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${s("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${s("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${s("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${s("rhythm.track-solo")};
  border-bottom-color: ${s("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-seg {
  display: inline-flex;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  overflow: hidden;
  margin-bottom: ${s("rhythm.module-gap")};
}
.nc-seg > button {
  flex: 1 1 0;
  min-height: ${s("target-min")};
  min-width: ${s("target-min")};
  padding: 0 ${s("rhythm.header-gap")};
  border: 0;
  border-inline-end: ${s("hairline")} solid ${s("divider")};
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-seg > button:last-child { border-inline-end: 0; }
.nc-seg > button:hover { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"] { background: ${s("text")}; color: ${s("surface-page")}; }
.nc-seg > button:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: calc(${s("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  color: ${s("text")};
  font-size: ${s("body-size")};
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:focus-visible { outline: none; border-bottom-color: ${s("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${s("rhythm.module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${s("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${s("slot-size")};
  width: ${s("slot-size")};
  max-width: ${s("slot-size")};
  min-width: 0;
  height: ${s("slot-size")};
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
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("slot-font-size")};
  line-height: ${s("rhythm.label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${s("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${s("text-sub")};
  color: ${s("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${s("accent")};
  color: ${s("accent")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${s("accent")};
  outline: ${s("focus-width")} solid ${s("accent-faint")};
  outline-offset: ${s("hairline")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${s("accent")};
  background: ${s("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${s("rhythm.control-gap")};
  right: ${s("rhythm.control-gap")};
  width: ${s("rhythm.control-gap")};
  height: ${s("rhythm.control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${s("sparkle-size")};
  width: ${s("sparkle-size")};
  height: ${s("sparkle-size")};
  margin-inline: ${s("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${s("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${s("target-min")};
  width: ${s("target-min")};
  min-height: ${s("target-min")};
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surprise-fill")};
  color: ${s("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${s("target-min")} / 2); height: calc(${s("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${s("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle svg { width: ${s("sparkle-icon-size")}; height: ${s("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${s("text")}; }
.nc-sparkle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s("rhythm.header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${s("rhythm.name-width")};
  width: ${s("rhythm.name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
.nc-steps > .nc-step-wrap:nth-child(4n + 1):not(:first-child) {
  margin-inline-start: calc(${s("beat-gap")} - ${s("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${s("row-inset")});
  padding-inline: ${s("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${s("accent-tint")};
  box-shadow: inset ${s("marker-width")} 0 0 ${s("accent")};
}
.nc-row[data-selected="true"] .nc-name {
  color: ${s("text")};
  text-decoration: underline;
  text-decoration-color: ${s("accent")};
  text-decoration-thickness: ${s("hairline")};
  text-underline-offset: ${s("rhythm.control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]) { background: ${s("rhythm.step-cell-off")}; }
/* Muted, or silenced by another lane's solo: the lane's steps dim, not just its button. */
.nc-row[data-silent="true"] .nc-steps { opacity: ${s("rhythm.probability-dim")}; }
.nc-name[data-nc-lane="1"] { color: ${s("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${s("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${s("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${s("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${s("rhythm.slider-block")};
  height: ${s("rhythm.slider-block")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${s("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${s("rhythm.track-mute")};
  border-color: ${s("rhythm.track-mute")};
  color: ${s("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${s("rhythm.track-solo")};
  border-color: ${s("rhythm.track-solo")};
  color: ${s("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${s("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${s("rhythm.slider-block")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* Readable grid: off = empty outline, on = solid, accent = the strongest fill. */
.nc-step[aria-pressed="true"] {
  background: ${s("rhythm.step-cell-on")};
  border-color: ${s("rhythm.step-cell-on")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-step[data-accent="true"] {
  background: ${s("rhythm.step-cell-accent")};
  border-color: ${s("rhythm.step-cell-accent")};
}
.nc-step[data-playhead="true"] {
  outline: ${s("hairline")} solid ${s("rhythm.playhead")};
  outline-offset: calc(${s("hairline")} * -1);
}
/* On a filled or accented step the ink ring sat on a dark fill (1.16:1 on the old accent fill, 1:1 on ink), so the playhead
   vanished exactly where a note plays. There it is drawn in the on-step ink: 6.07:1 on accent-pad, 14.2:1 on ink. */
.nc-step[data-playhead="true"]:is([aria-pressed="true"], [data-accent="true"]) {
  outline-color: ${s("rhythm.step-cell-ink")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${s("rhythm.bar-accent")}; }
.nc-step[data-dim="true"] { opacity: ${s("rhythm.probability-dim")}; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { opacity: ${s("rhythm.probability-dim")}; background: transparent; pointer-events: none; }
.nc-len-handle {
  display: none;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("rhythm.control-gap")};
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
  width: ${s("hairline")};
  height: ${s("target-min")};
  max-height: calc(${s("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${s("hairline")} solid ${s("text-sub")};
  background: ${s("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { display: block; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${s("text")}; border-color: ${s("text")}; }
.nc-len-handle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${s("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${s("accent")}; }
.nc-pad[data-out="true"] { opacity: ${s("rhythm.probability-dim")}; border-style: dashed; background: transparent; color: ${s("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${s("focus-width")} * 2) 0 0 ${s("text")}; }
.nc-pads { display: none; }
.nc-pads-head { display: none; }
.nc-pads-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${s("rhythm.module-gap")};
  margin-bottom: ${s("rhythm.module-gap")};
}
.nc-step-tools > .nc-seg { margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${s("target-min")} / 3); height: calc(${s("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${s("rhythm.module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
.nc-fill[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${s("rhythm.module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${s("target-min")} * 1.25);
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${s("rhythm.control-gap")} ${s("rhythm.module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
.nc-pad[aria-pressed="true"] {
  background: ${s("rhythm.step-cell-on")};
  border-color: ${s("rhythm.step-cell-on")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-pad[data-accent="true"] {
  background: ${s("rhythm.step-cell-accent")};
  border-color: ${s("rhythm.step-cell-accent")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-pad[data-playhead="true"] {
  outline: ${s("focus-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("hairline")};
}
.nc-pad[data-dim="true"], .nc-pads[data-silent="true"] { opacity: ${s("rhythm.probability-dim")}; }
.nc-pad:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-fx {
  margin-inline: calc(${s("module-pad")} * -1);
  padding: ${s("stack-card-pad-y")} ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-fx-name {
  margin: 0 0 ${s("rhythm.module-gap")} 0;
  font-size: ${s("body-size")};
  font-weight: ${s("rhythm.hack-weight")};
  white-space: nowrap;
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
  background: ${s("surface-page")};
  border-top: ${s("hairline")} solid ${s("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${s("rhythm.module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${s("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${s("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${s("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${s("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${s("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${s("rhythm.display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  margin: 0;
  min-width: 0;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-knob {
  width: ${s("rhythm.knob-size")};
  height: ${s("rhythm.knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${s("rhythm.control-gap")};
  width: ${s("hairline")};
  height: ${s("rhythm.control-gap")};
  background: ${s("text")};
  transform-origin: center ${s("rhythm.module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Tabs wrap to a second line rather than cut a name ("Kick", "Snare"...) to "Ki…" in a narrow column. */
.nc-choice-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${s("rhythm.control-gap")} ${s("rhythm.header-gap")};
  min-width: 0;
}
.nc-choice {
  flex: 0 0 auto;
  min-width: 0;
  white-space: nowrap;
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-choice[aria-selected="true"] {
  color: ${s("text")};
  border-bottom-color: ${s("accent")};
}
.nc-choice:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${s("rhythm.control-gap")};
  min-width: ${s("rhythm.name-width")};
  padding: ${s("rhythm.control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${s("rhythm.menu-item-min")};
  border: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
@media (pointer: coarse) {
  .nc-menu-btn { min-height: ${s("target-min")}; }
  /* A 44 px touch band drawn at ASTRID's 20 px pitch: the extra height overlaps the gaps, not the rows. */
  .nc-field[data-nc-slider] .nc-range {
    height: ${s("target-min")};
    margin-block: calc((${s("rhythm.slider-block")} - ${s("target-min")}) / 2);
  }
  /* M and S: each a full 44 px box (the button paints smaller inside), touching, never overlapping. */
  .nc-ms-wrap { flex-basis: ${s("target-min")}; height: ${s("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${s("rhythm.module-gap")} * -1); }
  .nc-ms {
    inset: calc((${s("target-min")} - ${s("rhythm.slider-block")}) / 2);
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
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-hit {
  display: none;
  position: absolute;
  pointer-events: auto;
}
@media (pointer: coarse) {
  .nc-hit {
    display: block;
    left: 50%;
    top: 50%;
    width: ${s("target-min")};
    height: ${s("target-min")};
    transform: translate(-50%, -50%);
  }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${s("rhythm.module-gap")};
  width: calc(${s("rhythm.name-width")} * 6);
  max-width: calc(100vw - 2 * ${s("rhythm.module-gap")});
  padding: ${s("rhythm.module-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  opacity: 1;
  outline: ${s("focus-width")} solid ${s("text")};
  outline-offset: ${s("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${s("text")}; opacity: ${s("rhythm.probability-dim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${s("rhythm.module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  min-height: ${s("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${s("rhythm.name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${s("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${s("rhythm.name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: 0;
  background: none;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${s("rhythm.module-gap")} + env(safe-area-inset-bottom));
  border-width: ${s("hairline")} 0 0;
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
  gap: ${s("toast-gap")};
  max-width: calc(100vw - 2 * ${s("toast-offset")});
  min-height: ${s("toast-target")};
  padding: 0 0 0 ${s("toast-pad-x")};
  border-radius: ${s("toast-radius")};
  background: ${s("toast-bg")};
  color: ${s("toast-text")};
  font-family: ${s("font-ui")};
  font-size: ${s("toast-font-size")};
  line-height: ${s("rhythm.label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${s("motion-fade")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${s("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${s("toast-offset")} + env(safe-area-inset-top)); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${s("motion-fade-out")};
}
.nc-ui-toast-message { overflow: hidden; text-overflow: ellipsis; }
.nc-ui-toast-action {
  min-width: ${s("toast-target")};
  min-height: ${s("toast-target")};
  padding: 0 ${s("toast-pad-x")};
  border: 0;
  background: none;
  color: ${s("toast-action")};
  font: inherit;
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${s("focus-width")} solid ${s("toast-action")};
  outline-offset: calc(-2 * ${s("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${s("hairline")};
  height: ${s("hairline")};
  overflow: hidden;
  clip-path: inset(50%);
  pointer-events: none;
  white-space: nowrap;
}
.nc-token-probe {
  position: absolute;
  width: ${s("hairline")};
  height: ${s("hairline")};
  overflow: hidden;
  clip-path: inset(50%);
  background: ${s("accent")};
  font-family: ${s("font-ui")};
  pointer-events: none;
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${s("hairline")} solid ${s("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${s("rhythm.control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${s("target-min")};
  }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${s("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${s("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${s("rhythm.module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-fx {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    padding-inline: ${s("module-pad-x-desktop")};
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
    border-bottom: ${s("hairline")} solid ${s("divider")};
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
    gap: ${s("rhythm.module-gap")};
    padding-block: ${s("rhythm.control-gap")};
    background: ${s("surface-page")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${s("rhythm.module-gap")};
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
    max-width: ${s("slot-span")};
    height: ${s("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (max-width: 360px) {
  .nc-label, .nc-name, .nc-note, .nc-title { text-overflow: ellipsis; }
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"],
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"] {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${s("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
  }
}
`}let Re=null;function bn(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Re&&Re.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=ks(),n.head.append(e),Re=e}const yn={slop:8,longPressMs:500,pitchPx:16};class $s{constructor(e,t,i=yn){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const r=this.hit(t,i);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const r=t-this.x0,o=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,i);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function vs(n,e,t,i=yn){let a=!1,r=0;const o=(c,u)=>{const f=n.ownerDocument.elementFromPoint?.(c,u),g=[...n.querySelectorAll(e)],y=f?g.findIndex(b=>b===f||b.contains(f)):-1;if(y>=0)return y;let w=-1,h=Number.POSITIVE_INFINITY;return g.forEach((b,k)=>{if(b.hidden)return;const x=b.getBoundingClientRect();if(u<x.top||u>x.bottom)return;const S=Math.abs(c-(x.left+x.width/2));S<h&&S<=x.width&&(w=k,h=S)}),w},l=new $s(o,c=>{(c.kind==="paint"||c.kind==="long")&&(a=!0),t(c)},i),d=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",c=>{c.button>0||(a=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),n.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{a&&(a=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}const xs=W["toast-duration"];function Ss({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function Ts(n,e,t,i){const a=l=>({top:l,bottom:l+t}),r=l=>n.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),o=a(e-i-t);return r(o)?r(a(i))?"bottom":"top":"bottom"}function wn(n,e,t,i,a,r){let o=n.bottom+a;const l=Math.max(r,Math.min(n.left,i-r-t.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(const u of e)u&&u.bottom>o&&u.top<o+t.height&&u.right>l&&u.left<l+t.width&&(o=u.bottom+a,d=!0)}return{top:o,left:l}}const Pt="data-nc-ui-toast-live";function Es(n,e){let t=e.querySelector(`[${Pt}]`);return t||(t=n.createElement("div"),t.setAttribute(Pt,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Ms({message:n,actionLabel:e,onAction:t,duration:i=xs,onClose:a,avoid:r=[],anchor:o,host:l,document:d=globalThis.document}={}){l=l??d.body;const c=d.defaultView??globalThis,u=d.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=n,u.appendChild(p);let f=null;e&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,u.appendChild(f)),l.appendChild(u);let g="open";const y=I=>I&&typeof I.getBoundingClientRect=="function"?I.getBoundingClientRect():null,w=y(u),h=w?.height||44,b=c.getComputedStyle?.(u),k=Number.parseFloat(b?.getPropertyValue(F("toast-offset")))||16,x=Number.parseFloat(b?.getPropertyValue(F("toast-anchor-gap")))||8,S=y(o),$=c.innerHeight??0,E=r.map(y).filter(Boolean),M=S&&S.bottom>0&&S.top<$?wn(S,E,{width:w?.width||0,height:h},c.innerWidth??0,x,k):null;M&&M.top+h<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${M.top+(c.scrollY??0)}px`,u.style.left=`${M.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",Ts(E,$,h,k));const L=c.requestAnimationFrame?.bind(c)??(I=>setTimeout(I,16));L(()=>L(()=>{g==="open"&&u.setAttribute("data-state","open")})),Es(d,l).textContent=Ss({message:n,actionLabel:e});let C,te;const ce=new Promise(I=>{te=I}),me=I=>{clearTimeout(C),C=setTimeout(()=>Ce("timeout"),I)};let Ne=i,yt=Date.now();const wt=()=>{g==="open"&&(clearTimeout(C),Ne=Math.max(0,Ne-(Date.now()-yt)))},kt=()=>{g==="open"&&(yt=Date.now(),me(Ne))};u.addEventListener("pointerenter",wt),u.addEventListener("pointerleave",kt),u.addEventListener("focusin",wt),u.addEventListener("focusout",kt),f?.addEventListener("click",()=>{if(g==="open")try{t?.()}finally{Ce("action")}}),Number.isFinite(i)&&me(i);function Ce(I="close"){if(g!=="open")return;g="closing",clearTimeout(C),u.setAttribute("data-state","closing"),a?.(I);const $t=c.getComputedStyle?.(u),Jn=$t?Math.max(0,...String($t.transitionDuration||"").split(",").map(xt=>Number.parseFloat(xt)*(xt.trim().endsWith("ms")?1:1e3)||0)):0,vt=()=>{g!=="gone"&&(g="gone",u.remove(),te(I))};u.addEventListener("transitionend",vt),setTimeout(vt,Jn+50)}return{el:u,close:Ce,closed:ce}}function _t(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Ls({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const d=l.defaultView??globalThis,c={velocity:t,probability:i},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const g=l.createElement("span");g.className="nc-label",g.textContent=e;const y=l.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",f.append(g,y),p.appendChild(f);const w=[];for(const[S,$]of[["velocity","Velocity"],["probability","Chance"]]){const E=l.createElement("label");E.className="nc-step-editor-row";const M=l.createElement("span");M.className="nc-label",M.textContent=$;const L=l.createElement("input");L.type="range",L.className="nc-range",L.min=S==="velocity"?"0.05":"0",L.max="1",L.step="0.05",L.value=String(c[S]),L.setAttribute("data-nc-edit",S);const C=l.createElement("output");C.className="nc-readout",C.textContent=_t(c[S]),L.setAttribute("aria-valuetext",C.textContent),L.addEventListener("input",()=>{c[S]=Number(L.value),C.textContent=_t(c[S]),L.setAttribute("aria-valuetext",C.textContent),a({velocity:c.velocity,probability:c.probability})}),E.append(M,L,C),p.appendChild(E),w.push(L)}if(o.append(u,p),n?.setAttribute?.("data-editing","true"),d.matchMedia?.(`(max-width: ${is.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const S=n?.getBoundingClientRect?.(),$=p.getBoundingClientRect(),E=Number.parseFloat(d.getComputedStyle(p).getPropertyValue("row-gap"))||8;if(S){let{top:M,left:L}=wn(S,[],{width:$.width,height:$.height},d.innerWidth,E,E);M+$.height>d.innerHeight&&(M=Math.max(E,S.top-E-$.height)),p.style.top=`${M}px`,p.style.left=`${L}px`}p.setAttribute("data-placement","anchor")}w[0]?.focus({preventScroll:!0});let b=!0;const k=S=>{S.key==="Escape"&&(S.preventDefault(),x())};function x(){b&&(b=!1,l.removeEventListener("keydown",k,!0),u.remove(),p.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",k,!0),u.addEventListener("pointerdown",S=>{S.preventDefault(),x()}),y.addEventListener("click",x),{el:p,close:x}}function As(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==r)&&(n.width=a,n.height=r);const o=n.getContext("2d");return o?.setTransform(i,0,0,i,0,0),{ctx:o,w:e,h:t}}function Be(n){return Math.max(0,Math.min(1,n))}function kn(n,e){const{ctx:t,w:i,h:a}=As(n);if(!t)return;t.clearRect(0,0,i,a);const r=ys(n);if(e.paint==="swatch"){const d=z(n,"accent"),c=z(n,"rhythm.step-cell-on");n.dataset.ncAccent=d,n.dataset.ncStep=c,t.fillStyle=d,t.fillRect(0,0,i/2,a),t.fillStyle=c,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const d=e.mode??"lp",c=z(n,bs(d)),u=z(n,"divider"),p=Be(e.cutoff??.5),f=.08+(1-Be(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let g=0;g<=i;g++){const y=g/Math.max(1,i);let w=0;d==="lp"?w=y<p?1:Math.max(0,1-(y-p)/f):d==="hp"?w=y>p?1:Math.max(0,1-(p-y)/f):w=Math.max(0,1-Math.abs(y-p)/f);const h=a*.78-w*a*.62;g===0?t.moveTo(g,h):t.lineTo(g,h)}t.strokeStyle=c,t.stroke(),t.fillStyle=z(n,"text-sub"),t.font=r,t.fillText(d.toUpperCase(),0,a),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=z(n,"accent"),t.beginPath();const d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){const u=c/Math.max(1,i),p=(a-4)*(1-Math.exp(-u*4/d));t.lineTo(c,a-p)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const d=Be(e.level??0);t.fillStyle=z(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=z(n,"accent"),t.fillRect(0,a*.4,i*d,a*.2),n.dataset.ncAccent=t.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;t.fillStyle=z(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=z(n,"rhythm.playhead"),t.fillRect(l/o*i,a*.3,Math.max(1,i/o),a*.4),n.dataset.ncAccent=z(n,"accent")}function j(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function Me(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function jt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ge(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Ns=450,It=8;function Y(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Cs(n){const e=gs(n,"target-min");return e>0?e:44}function Ps(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=Cs(n),a=i/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){const l=t[o],d=r[o];if(!(l instanceof HTMLElement)||!d||d.width===0||d.height===0)continue;if(d.width>=i&&d.height>=i){l.style.display="none";continue}const c=d.left+d.width/2,u=d.top+d.height/2;let p=c-a,f=c+a,g=u-a,y=u+a;for(let w=0;w<t.length;w++){if(o===w)continue;const h=r[w];if(!h||h.width===0)continue;const b=h.left+h.width/2,k=h.top+h.height/2;Math.abs(k-u)<a*2&&(b>c?f=Math.min(f,(c+b)/2):b<c&&(p=Math.max(p,(c+b)/2))),Math.abs(b-c)<a*2&&(k>u?y=Math.min(y,(u+k)/2):k<u&&(g=Math.max(g,(u+k)/2)))}p=Math.min(p,d.left),f=Math.max(f,d.right),g=Math.min(g,d.top),y=Math.max(y,d.bottom),l.style.left=`${p-d.left}px`,l.style.top=`${g-d.top}px`,l.style.width=`${Math.max(0,f-p)}px`,l.style.height=`${Math.max(0,y-g)}px`,l.style.transform="none"}}function $n(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Rt(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function vn(n,e){switch(n.type){case"slider":return _s(n,e);case"select":return Is(n,e);case"toggle":return Rs(n,e);case"button":return Bs(n,e);case"readout":return zs(n);case"label":return Os(n);case"note":return Bt(n);case"knob":return Fs(n,e);case"choice":return Us(n,e);case"slotRow":return Gs(n,e);case"stepGrid":return Ys(n,e);case"canvas":return Qs(n);case"fx":return Zs(n,e);default:return Bt({id:"unknown",text:""})}}function Z(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,xn(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Ge(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),jt(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")jt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Ds(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=Ge(e.value))}else if(e.type==="choice")Sn(n,e);else if(e.type==="slotRow")En(n,e);else if(e.type==="stepGrid")Ke(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&kn(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${ea(t.id)}"]`);i instanceof Element&&Z(i,t)}}}function _s(n,e){const t=Me(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{const r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),n.onTap&&t.insertBefore(js(n,i,e),a),t.append(j()),Z(t,n),t}function js(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(Y());const a=r=>{const o=t(e);o?.type==="slider"&&o.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&a(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),a(r.timeStamp))}),i}function Is(n,e){const t=Me(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const r=document.createElement("option");r.value=a.value,r.textContent=a.label,i.append(r)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,j()),t}function Rs(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(j()),Z(t,n),t}function Bs(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const r=e(t);r?.type==="button"&&r.onPress()}),t.append(j()),Z(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=$n(),a.addEventListener("click",()=>{const r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Mn(r);const o=e(t);o?.type==="button"&&o.onSparkle?.()}),i.append(t,a),i}function zs(n){const e=Me(n.id,n.label);return e.append(j()),Z(e,n),e}function Os(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(j()),e}function Bt(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(j()),e}function qs(n){const e=Ge(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function xn(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Ds(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;xn(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",qs(e)),n.setAttribute("aria-label",e.label)}function Hs(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function Fs(n,e){const t=Me(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let r=0,o=0;i.addEventListener("pointerdown",d=>{r=d.clientY;const c=e(i);o=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;const c=e(i);if(c?.type!=="knob")return;const u=c.max-c.min||1,p=Math.min(c.max,Math.max(c.min,o-(d.clientY-r)*u/120));c.onChange(p)}),i.addEventListener("keydown",d=>{const c=e(i);if(c?.type!=="knob")return;const u=Hs(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(i,l),t.append(j()),Z(t,n),t}function Us(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const r=e(t);r?.type==="choice"&&r.onChange(i.value)}),a.addEventListener("keydown",r=>{const o=[...t.querySelectorAll("[data-nc-choice]")],l=o.indexOf(a);let d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+o.length)%o.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=o.length-1;else return;const c=o[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),t.append(a)}return t.append(j()),Sn(t,n),t}function Sn(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function Gs(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){const p=n.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";const g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(u),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,Y()),Ks(f,g,t,u,e),i.append(f)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=$n(),a.append(Y()),a.addEventListener("click",()=>{Mn(t);const u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(o,d,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...a?[a]:[]),t.append(c,r,j()),Tn(t,e),En(t,n),t}function zt(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;pe(n);const r=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,r)}function Ks(n,e,t,i,a){let r=0,o=0,l=0,d=!1,c=!1,u=!1,p=!1;const f=()=>{window.clearTimeout(r),r=0},g=b=>{const k=b.clientX-o,x=b.clientY-l;k*k+x*x>It*It&&(d=!0,f())},y=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",h))},w=b=>{const k=r!==0&&!d&&!c;f(),y(),k&&(u=!0,zt(t,i,a,b))},h=()=>{d=!0,f(),y()};n.addEventListener("pointerdown",b=>{b.button===0&&(y(),c=!1,d=!1,u=!1,o=b.clientX,l=b.clientY,f(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,Vs(t,e,i,a))},Ns),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",h))}),n.addEventListener("contextmenu",b=>b.preventDefault()),n.addEventListener("click",b=>{if(u||c||d){u=!1,c=!1,d=!1;return}zt(t,i,a,b)})}function Tn(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=Ot("Save","store"),a=Ot("Clear","clear");t.append(i,a);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),pe(n)}),r.addEventListener("click",o=>o.stopPropagation()),n.append(r,t),t.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const d=e(n);if(d?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),pe(n)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),pe(n))}),n.addEventListener("keydown",o=>{o.key==="Escape"&&pe(n)})}function Ot(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Vs(n,e,t,i){Tn(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();a.style.left=`${l.left-o.left}px`,a.style.top=`${l.bottom-o.top}px`,a.querySelector("button")?.focus()}function pe(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function En(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const r=Number(a.dataset.ncSlot),o=e.slots[r];if(!o)continue;a.textContent=o.label,o.filled?a.dataset.filled="true":delete a.dataset.filled,o.active?a.dataset.active="true":delete a.dataset.active,o.edited?a.dataset.edited="true":delete a.dataset.edited,o.queued?a.dataset.queued="true":delete a.dataset.queued,o.queued&&o.pulse?a.dataset.pulse="true":delete a.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];a.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Mn(n){const e=n.dataset.ncLastFill||null,t=cs(e);n.dataset.ncLastFill=t;const i=ds(t);if(i)for(const[a,r]of Object.entries(i))n.style.setProperty(a,r)}function Ws(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=r=>{if(i===r)return;i=r,t.setAttribute("aria-pressed",r?"true":"false");const o=e(n);o?.type==="stepGrid"&&o.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),a(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>a(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||a(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),a(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function Ys(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=h=>{const b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=h,i.append(b),b},r=a("Note"),o=a("Accent");o.dataset.ncAccentMode="";const l=h=>{for(const b of[r,o]){const k=b===h;b.setAttribute("aria-checked",k?"true":"false"),b.tabIndex=k?0:-1}};l(r);for(const h of[r,o])h.addEventListener("click",()=>l(h));i.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const b=o.getAttribute("aria-checked")==="true"?r:o;l(b),b.focus()});const d=document.createElement("div");d.className="nc-step-tools",d.append(i),n.onFill&&d.append(Ws(t,e)),t.append(d);for(const h of n.rows){const b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=h.label,k.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(k.dataset.ncLane=String((h.lane-1)%4+1)),k.addEventListener("click",()=>{const $=e(t);if($?.type!=="stepGrid")return;const E=$.rows.findIndex(M=>M.id===h.id);$.onSelectRow?.(E)}),k.addEventListener("keydown",$=>Js(t,k,$));const x=[];for(const $ of["mute","solo"]){if(!($==="mute"?n.onMute:n.onSolo))continue;const M=document.createElement("span");M.className="nc-ms-wrap";const L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=$,L.textContent=$==="mute"?"M":"S",L.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),M.append(L,Y()),M.addEventListener("click",()=>{const C=e(t);if(C?.type!=="stepGrid")return;const te=C.rows.findIndex(ce=>ce.id===h.id);($==="mute"?C.onMute:C.onSolo)?.(te)}),x.push(M)}const S=document.createElement("div");S.className="nc-steps";for(let $=0;$<h.steps.length;$++){const E=document.createElement("span");E.className="nc-step-wrap";const M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${h.id}:${$}`,M.setAttribute("aria-label",`${h.label} step ${$+1}`),E.append(M,Y()),E.addEventListener("click",L=>{const C=e(t);if(C?.type!=="stepGrid")return;const te=C.rows.findIndex(me=>me.id===h.id),ce=o.getAttribute("aria-checked")==="true";C.onToggle(te,$,L.shiftKey||ce)}),S.append(E)}if(n.onLength&&S.append(Xs(t,S,h,e)),b.append(...x,k,S),n.onDice){const $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Rt(),$.append(Y()),$.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===h.id))}),b.append($)}b.addEventListener("click",$=>{if($.target!==b)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===h.id))}),qt(t,S,".nc-step-wrap",e,o,()=>h.id),t.append(b)}const c=document.createElement("div");c.className="nc-pads-head";const u=(h,b,k)=>{const x=document.createElement("button");return x.type="button",x.className=h,x.textContent=b,k&&x.setAttribute("aria-label",k),x},p=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),g=document.createElement(n.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),n.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{const h=e(t);h?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",Ke(t,h))}));for(const[h,b]of[[p,-1],[f,1]])h.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const x=k.rows.length;k.onSelectRow?.(((be(k)+b)%x+x)%x)});if(c.append(p,g,f),n.onDice){const h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Rt(),h.addEventListener("click",()=>{const b=e(t);if(b?.type!=="stepGrid")return;const k=be(b);k>=0&&b.onDice?.(k)}),c.append(h)}if(n.transport){const h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const b=e(t);b?.type==="stepGrid"&&b.transport?.onToggle()}),c.append(h)}t.append(c);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const w=Math.max(0,...n.rows.map(h=>h.steps.length));for(let h=0;h<w;h++){const b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(h),b.textContent=String(h+1),b.addEventListener("click",k=>{const x=e(t);if(x?.type!=="stepGrid")return;const S=be(x);if(S<0)return;if(t.dataset.ncLenMode==="true"){x.onLength?.(S,h+1);return}const $=o.getAttribute("aria-checked")==="true";x.onToggle(S,h,k.shiftKey||$)}),y.append(b)}return qt(t,y,".nc-pad",e,o,()=>{const h=e(t);return h?.type==="stepGrid"?h.rows[be(h)]?.id:void 0}),t.append(y),t.append(j()),Ke(t,n),t}function be(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function qt(n,e,t,i,a,r){let o="on",l=!0,d=-1;const c=(u,p)=>{const f=u.rows[d]?.steps[p];!f||p>=u.rows[d].length||(u.onSet?u.onSet(d,p,o,l):!!f[o]!==l&&u.onToggle(d,p,o==="accent"))};vs(e,t,u=>{const p=i(n);if(p?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const f=p.rows.findIndex(g=>g.id===r());f>=0&&p.rows[f].length!==u.pad+1&&p.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const f=r();d=p.rows.findIndex(y=>y.id===f);const g=p.rows[d]?.steps[u.pad];if(!g)return;o=a.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[o]}c(p,u.pad)}else if(u.kind==="long"){const f=r(),g=p.rows.findIndex(w=>w.id===f),y=e.querySelectorAll(t)[u.pad];g>=0&&y instanceof HTMLElement&&p.onLongPress?.(g,u.pad,y)}}})}function Js(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let r=a;t.key==="ArrowDown"?r=a+1:t.key==="ArrowUp"?r=a-1:t.key==="Home"?r=0:r=i.length-1;const o=i[r];!(o instanceof HTMLElement)||o===e||(t.preventDefault(),o.focus(),o.click())}function Xs(n,e,t,i){const a=document.createElement("button");a.type="button",a.className="nc-len-handle",a.dataset.ncLen=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-valuemin","1"),a.setAttribute("aria-valuemax",String(t.steps.length)),a.append(Y());const r=c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.findIndex(y=>y.id===t.id),f=u.rows[p];if(!f)return;const g=Math.max(1,Math.min(f.steps.length,c));g!==f.length&&u.onLength?.(p,g)},o=c=>{const u=[...e.querySelectorAll(".nc-step")];let p=1;return u.forEach((f,g)=>{const y=f.getBoundingClientRect();y.width>0&&c>=y.left+y.width/2&&(p=g+1)}),p},l=c=>r(o(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete a.dataset.dragging};return a.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),a.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),a.addEventListener("keydown",c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.find(g=>g.id===t.id);if(!p)return;const f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in f&&(c.preventDefault(),r(f[c.key]))}),a}function Ke(n,e){const t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=n.querySelector(".nc-pads-label"),o=n.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&a&&(r.textContent=o?`${a.label} · ${a.length}`:a.label,e.onLength&&(r.setAttribute("aria-pressed",o?"true":"false"),r.setAttribute("aria-label",o?`${a.label} length ${a.length} steps: tap or drag the pads to set the end, tap here when done`:`${a.label}, ${a.length} steps: tap to set the length`)));const l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&a&&(l.setAttribute("aria-label",`Re-roll ${a.label}`),l.title=`Re-roll ${a.label}: new steps for this lane (Undo takes it back)`);const d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");const p=e.transport?.ariaLabel;p?d.setAttribute("aria-label",p):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const c=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const u of i.querySelectorAll("[data-nc-pad]")){const p=Number(u.getAttribute("data-nc-pad")),f=a.steps[p];u instanceof HTMLButtonElement&&(u.hidden=!f||!o&&p>=a.length,o&&p>=a.length?u.dataset.out="true":delete u.dataset.out,o&&p===a.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${a.label} step ${p+1}`),u.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?u.dataset.accent="true":delete u.dataset.accent,f?.dim?u.dataset.dim="true":delete u.dataset.dim,e.playhead>=0&&p===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(const c of e.rows){for(let g=0;g<c.steps.length;g++){const y=c.steps[g],w=n.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(w instanceof HTMLButtonElement))continue;const h=w.closest(".nc-row");if(h instanceof HTMLElement){e.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;const x=h.querySelector(".nc-name");x instanceof HTMLElement&&x.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(const $ of h.querySelectorAll("[data-nc-ms]")){const E=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",E?"true":"false")}}w.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?w.dataset.accent="true":delete w.dataset.accent,y.dim?w.dataset.dim="true":delete w.dataset.dim,g%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof y.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level"));const b=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;g===b?w.dataset.playhead="true":delete w.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;w.hidden=g>=c.length&&!k,g>=c.length&&k?w.dataset.out="true":delete w.dataset.out}const u=n.querySelector(`[data-nc-len="${c.id}"]`),f=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&f&&f.nextElementSibling!==u){const g=document.activeElement===u;f.after(u),g&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Qs(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,j()),e}function Zs(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(vn(a,e));return t.append(j()),t}function ea(n){return n.replace(/["\\]/g,"\\$&")}function ta(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&kn(t,i)}Ps(n)}const rt="netcomposer.rhythm.hidden.v1",K=new WeakMap;function ze(){try{return globalThis.localStorage??null}catch{return null}}function Ln(n,e=rt){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Dt(n,e,t,i=rt){const a=Ln(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function ot(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function na(n,e){if(!(!n||!e))return ot(n).find(t=>t.id===e)}function ia(n){return`${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}`).join(",")}#${ot(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(i=>`${i.id}/${i.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(i=>i.value).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.controls.map(i=>i.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function sa(n,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=e.title,n.append(r);return}const t=document.createElement("div");t.className="nc-panel-hd";const i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;const a=document.createElement("span");a.className="nc-panel-subject",a.dataset.ncPanelSubject="",t.append(i,a),n.append(t),An(n,e)}function An(n,e){if(!e.panel)return;const t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),i=t?.querySelector(".nc-panel-title"),a=t?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),a&&(a.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function aa(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=K.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return na(t,i)}function ra(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=ia(e);if(n.dataset.ncSignature===i){for(const a of t){const r=n.querySelector(`[data-nc-section="${Ht(a.id)}"]`);r&&An(r,a);for(const o of a.controls){const l=n.querySelector(`[data-nc-id="${Ht(o.id)}"]`);l instanceof Element&&Z(l,o)}}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=a.id,a.inset&&(r.dataset.ncInset="true"),a.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),a.title&&r.setAttribute("aria-label",a.title)),sa(r,a);const o=a.panel?document.createElement("div"):r;a.panel&&(o.className="nc-panel-body",r.append(o));for(const l of a.controls)o.append(vn(l,aa));n.append(r)}}function Ht(n){return n.replace(/["\\]/g,"\\$&")}function lt(n,e=rt){bn();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead="");const i=Ln(ze(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="",o.append(l,d);const c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",a.append(r,c,o);const u=document.createElement("div");u.className="nc-module-body",u.id=`${n.id}-body`;const p=document.createElement("button");p.type="button",p.className="nc-slim";const f=document.createElement("span");f.className="nc-slim-lines",p.append(f);const g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",t.append(g,a,u,p),t.setAttribute("aria-labelledby",r.id);const y=h=>{const b=K.get(t)??n;t.dataset.ncOpen=h?"false":"true",u.hidden=h,p.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${b.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const h=t.dataset.ncOpen==="true";Dt(ze(),(K.get(t)??n).id,h,e),y(h),Ve(t.parentElement)}),p.addEventListener("click",()=>{Dt(ze(),(K.get(t)??n).id,!1,e),y(!1),Ve(t.parentElement)});const w={el:t,update(h){K.set(t,h),r.textContent=h.title,c.textContent=h.status??"",h.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),f.textContent=h.summary??h.title,p.setAttribute("aria-label",`Show ${h.title}`),ra(u,h),y(u.hidden),w.redraw()},redraw(){const h=K.get(t);h&&ta(t,ot(h))}};return K.set(t,n),y(i),w.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>w.redraw()).observe(t),w}function oa(n,e,t="adjacent"){bn(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,r)=>{const o=r%4+1;a.el.dataset.ncShade=String(o),a.el.dataset.ncPlace=i;const l=a.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),n.append(a.el),a.redraw()}),Ve(n)}function Ve(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?s("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",i.join(" "));const a=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&a.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function Nn(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function la(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function ca(n,e={}){const t=new Set,i=(async()=>{await Nn();for(const a of n)await la(e.timeoutMs??200),a.build(),t.add(a)})();return{ready:a=>t.has(a),done:i,toJSON:()=>({built:t.size,total:n.length})}}function ct(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const Cn="petra-rhythm.state",Pn=1,da=400,ua=2e3;function pa(n){return JSON.stringify({v:Pn,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function ha(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return $e({...n,swing:t,fx:i,tracks:a}).ok}function ma(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Pn)return null;const t=$e(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==D)return null;const r=a.slots.map(c=>c===null?null:c);if(!r.every(c=>c===null||ha(i,c)))return null;const o=Number.isInteger(a.active)&&r[a.active]?a.active:null,l=e.selectedTrack,d=Number.isInteger(l)&&l>=0&&l<i.tracks.length?l:0;return{doc:i,bank:{slots:r,active:o},selectedTrack:d}}function fa(n,e,t=da){let i,a=0,r="";const o=()=>{clearTimeout(i),i=void 0,a=0;try{const l=pa(e());if(l===r)return;n.setItem(Cn,l),r=l}catch{}};return{schedule(){const l=Date.now();a||(a=l),clearTimeout(i),i=setTimeout(o,Math.min(t,Math.max(0,a+ua-l)))},flush:o}}function ga(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return ma(n.getItem(Cn))}catch{return null}}const Oe={maker:"PETRA",instrument:"RHYTHM",number:"01"},_n="PETRA Rhythm";let Ft=!1;function ba(){return`
.petra-head {
  padding: ${s("module-pad")};
  border-bottom: ${s("hairline")} solid ${s("divider")};
}
.petra-head-name {
  margin: 0;
  font-size: ${s("rhythm.brand-size")};
  font-weight: ${s("rhythm.brand-weight")};
  letter-spacing: ${s("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${s("text-sub")}; }
.petra-head-num { font-family: ${s("font-readout")}; }
.petra-head-line {
  margin: ${s("rhythm.brand-sub-gap")} 0 0;
  font-size: ${s("rhythm.brand-sub-size")};
  color: ${s("text-sub")};
}
@media (min-width: 1024px) {
  .petra-head { padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")}; }
}
/* The ⋯ menu (Bass's header menu): Save, Load, New. Phone: a 44 px ⋯ that opens a small panel.
   Desktop: the buttons sit inline in the header and the ⋯ hides. */
.petra-head { position: relative; display: flex; align-items: flex-start; gap: ${s("rhythm.module-gap")}; }
.petra-head-title { flex: 1 1 auto; min-width: 0; }
.petra-menu > summary {
  list-style: none;
  display: grid;
  place-items: center;
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  color: ${s("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${s("target-min")} / 2.75); height: calc(${s("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: ${s("module-pad")};
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${s("rhythm.control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
}
.petra-menu-body button {
  min-height: ${s("target-min")};
  padding: 0 ${s("module-pad")};
  border: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${s("text-sub")}; padding: 0 ${s("rhythm.module-gap")}; }
  .petra-menu-body button:hover { color: ${s("text")}; }
}
`}function ya(n){const e=n.ownerDocument;if(!Ft){const d=e.createElement("style");d.dataset.petraHead="",d.textContent=ba(),e.head.append(d),Ft=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const d=e.createElement("span");return d.className="petra-head-sep",d.textContent="/",d},r=e.createElement("span");r.className="petra-head-num",r.textContent=Oe.number,i.append(`${Oe.maker} `,a(),` ${Oe.instrument} `,a()," ",r);const o=e.createElement("p");o.className="petra-head-line",o.textContent="A NetComposer element.";const l=e.createElement("div");return l.className="petra-head-title",l.append(i,o),t.append(l),n.before(t),t}function wa(n,e){const t=n.ownerDocument,i=t.createElement("details");i.className="petra-menu";const a=t.createElement("summary");a.setAttribute("aria-label","Menu"),a.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=t.createElement("div");r.className="petra-menu-body";const o=t.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const u=o.files?.[0];o.value="",u&&e.load(await u.text(),u.name)});const l=(u,p)=>{const f=t.createElement("button");return f.type="button",f.textContent=u,f.dataset.petraMenu=u.toLowerCase(),f.addEventListener("click",()=>{p(),d||(i.open=!1)}),f};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),i.append(a,r),n.append(i);let d=null;const c=()=>{const u=getComputedStyle(a).display==="none";u!==d&&(i.open=u),d=u};return window.addEventListener("resize",c),c(),i}function ka(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function Ut(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const r=a+(e-i)*1e3,o=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:i,stampPerformanceTime:a}}class $a{doc=cn();bank=en();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=$i(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.bank=wi(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=i}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=ki(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e,t=!1){const i=Et(this.bank,e,this.doc,0);return i.applied?t?{...i.document,swing:this.doc.swing}:i.document:null}recall(e,t=this.morphSeconds,i=!1){const a=Et(this.bank,e,this.doc,t);return a.applied?(i&&(a.document.swing=this.doc.swing),this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=qi(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Bi(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e));return t===this.doc.swing?!1:(this.retireSparkle(),this.doc.swing=t,this.writeActive(),this.glidePending=0,!0)}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const va=1400;function qe(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function xa(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class Sa{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},va))}}const Ta=50;function Ea(n,e,t,i=Ta){if(t)return 0;const a=n-e;return a>=i?0:i-a}class Ma{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=Ms({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}const La="/rhythm/assets/processor-CrNf18Ow.js",jn=new URLSearchParams(location.search),B=jn.has("measure"),Aa=!(B&&jn.get("clockStepFix")==="0");let We=0;const Na=.05;B&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__posts=[]);const Q=[40,240],m=new $a,ye=B?null:ga(localStorage,location.search);ye&&(m.doc=ye.doc,m.bank=ye.bank,m.selectTrack(ye.selectedTrack));const dt=B?null:fa(localStorage,()=>({doc:m.doc,bank:m.bank,selectedTrack:m.selectedTrack}));if(B){for(const e of m.doc.tracks)e.solo=e.voice==="kick";const n=m.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Na)}const P=new ai({bpm:m.doc.bpm,minBpm:Q[0],maxBpm:Q[1],timebase:"shared"}),ut=document.querySelector("#app");if(!(ut instanceof HTMLElement))throw new Error("Missing #app");const Ca=ya(ut),le=new Ma(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let v=null;B&&(window.__audioInfo=()=>v?{sampleRate:v.sampleRate,outputLatency:v.outputLatency,baseLatency:v.baseLatency,state:v.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>Hn(),window.__clockStep=n=>{We=n},window.__debug=()=>({audio:v?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:v?.getOutputTimestamp?.()??null,currentTime:v?.currentTime??null,reanchors:J?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let U=null,J=null,xe=0,In=0;function Pa(){return v?v.state==="running"?"running":v.state==="suspended"?"suspended":v.state==="interrupted"?"interrupted":"none":"needs-gesture"}const N=new bi({app:_n,version:"0.1.0",clock:P,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:Q},audio:Pa,outputLatencyMs:()=>J?.outputLatencyMs??null,swing:()=>m.doc.swing});let we="",Rn=0,Bn=!1,Gt=Number.NEGATIVE_INFINITY,ie=null;const _=new at;function O(n=R()){return P.transport.isPlayingAt(n)}function Ye(n){if(!N.isLeader)return;const e=Ea(performance.now(),Gt,n);if(e>0){ie===null&&(ie=setTimeout(()=>{ie=null,Ye(!0)},e));return}ie!==null&&(clearTimeout(ie),ie=null),N.publishState()&&(Gt=performance.now())}function Kt(){return Bn?zi(m.doc).tracks:m.doc.tracks}function Se(){if(!J)return null;const n=Math.round(J.offset*1e4)/1e4;return{offset:n,shifted:ii(P.toSnapshot(),n,"audio")}}const pt=new es(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Je(n=!1){const e=Se();e&&pt.set(e,n)}function zn(n,e,t,i){return{clock:n,measure:B,swing:e.swing,fx:{...e.fx},...i===void 0?{}:{glideSeconds:i},tracks:t.map(a=>({id:a.id,voice:a.voice,length:a.length,mute:a.mute,solo:a.solo,steps:a.steps})),params:e.tracks.map(a=>({voice:a.voice,params:{...a.params}}))}}let V=null;function A(n="state"){const e=n==="state"?Se():pt.current??Se();if(!U||!e)return;n!=="state"&&(we="");const{offset:t,shifted:i}=e,a=V;a!==null&&(V=null,we="");const r=m.consumeGlide(),o=JSON.stringify({seen:_.lastTaken,offset:t,anchor:i.anchor,start:i.startTime,stop:i.stopTime,tempo:i.tempo,swing:m.doc.swing,glide:r??null,tracks:Kt(),fx:m.doc.fx});if(o===we)return;we=o;const l={...zn(i,m.doc,Kt(),r),seen:_.lastTaken,...a===null?{}:{enterBeat:a}};Rn=t,U.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:i.anchor.time,start:i.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}async function ht(){if(v)return;if(v=new AudioContext,B){const e=v,t=e.getOutputTimestamp.bind(e);e.getOutputTimestamp=()=>{const i=t(),a=!We||!i.contextTime?i:{contextTime:i.contextTime+We/1e3,performanceTime:i.performanceTime},r=window.__ts;return r&&r.length<2e5&&r.push([performance.timeOrigin+performance.now(),a.contextTime??0,a.performanceTime??0]),a}}v.addEventListener("statechange",()=>{T(),ee()}),J=new gi(v,Aa?{}:{stepThresholdMs:0}),J.onStep(e=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:e.stepSeconds*1e3,confirmedAt:e.confirmedAt,reanchors:e.reanchors,revert:e.revert===!0}),Je(!0)}),J.start(),await v.audioWorklet.addModule(La),U=new AudioWorkletNode(v,"rhythm"),U.port.onmessage=e=>{if(e.data.switched!==void 0&&ja(e.data.switched),e.data.level!==void 0&&e.data.step!==void 0&&(In=e.data.level,xe!==e.data.step&&(xe=e.data.step,T())),!(!B||!v)){for(const t of e.data.onsets??[])window.__kicks?.push({step:t.step,beat:t.beat,shared:t.contextTime-Rn});for(const t of e.data.onsets??[]){const i=Ut(v,t.contextTime);i&&window.__onsets?.push({app:_n,beat:t.beat,contextTime:t.contextTime,hidden:document.hidden,stampAgeMs:(v.currentTime-t.contextTime)*1e3,...i})}for(const t of e.data.render??[]){const i=Ut(v,t.contextTime);i&&window.__render?.push({contextTime:t.contextTime,peak:t.peak,playedMs:i.playedMs})}}},U.connect(v.destination);let n=!1;pt.subscribe(()=>A(n?"clock":"attach")),P.subscribe(e=>Je(e.kind==="snapshot"&&e.replay===!0)),n=!0}const X=new Zi;let De=null,ae=null;function Le(){return!v||v.state!=="running"}function _a(){return ae=X.mode(Le(),O()),ae}function On(){return De??=(async()=>{try{V=Number.POSITIVE_INFINITY,v&&A(),await ht(),v&&v.state!=="running"&&await v.resume();const n=P.transport;V=X.enter(n.beatAt(R()),n.bpm),Xe&&(Xe=!1,V=Math.floor(n.beatAt(R())/4)*4);const e=V;A(),B&&(window.__join={...X.toJSON(),tapBeat:qn,sentBeat:e})}catch(n){throw X.cancel(),V=Number.NEGATIVE_INFINITY,A(),n}})().finally(()=>{De=null,T(),ee()}),De}let qn=Number.NaN,Xe=!1;function Dn(n){const e=n instanceof KeyboardEvent&&n.repeat;X.gesture(Le(),O(),e)&&(qn=P.transport.beatAt(R()),On())}document.addEventListener("pointerdown",Dn,{capture:!0});document.addEventListener("keydown",Dn,{capture:!0});document.addEventListener("pointerup",()=>{X.pending&&v&&v.state!=="running"&&v.resume()},{capture:!0});async function mt(){if(X.swallowClick(Le(),O())){await On();return}await Hn()}let ue=null;function ee(){if(ue!==null&&(clearTimeout(ue),ue=null),!Le())return;ke(!0,O())!==ae&&T();const n=R(),{startTime:e,stopTime:t}=P.transport,i=[e,t].filter(r=>r!==null&&r>n);if(i.length===0)return;const a=Math.min((Math.min(...i)-n)*1e3+1,2**31-1);ue=setTimeout(()=>{ue=null,ee()},a)}async function Hn(){await ht(),v&&(v.state!=="running"&&await v.resume(),O()?P.stop({at:R()}):P.play({at:R()}))}const re=new Sa(()=>T());function Ae(){return!N.isLeader}function Fn(n,e,t){const i=m.peek(n,Ae()),a=Se();if(!i||!U||!a)return!1;const r=P.transport.beatAt(R()),o=_.recall(n,r,{glide:e},t===void 0?{}:{atBeat:t}),l={...zn(a.shifted,i,i.tracks,e),atBeat:o.atBeat,switchId:o.id,slot:n};return U.port.postMessage({type:"state",state:l}),!0}function ja(n){const e=_.takeHeld(n);e&&(m.recall(e.slot,e.payload.glide,Ae()),m.consumeGlide(),A(),T())}function Un(n){if(_.cancel(),!m.recall(n,m.morphSeconds,Ae()))return;const e=m.morphSeconds>0?m.morphSeconds:0;N.sendSnapshot("recall",n,{atBeat:P.transport.beatAt(R()),...e>0?{glide:{seconds:e}}:{}})}function Ia(n){if(_.tap(n,O()).kind==="queue"){const t=m.morphSeconds>0?m.morphSeconds:0;if(Fn(n,t,pn(P.transport.beatAt(R())))){const i=_.pending?.atBeat;N.sendSnapshot("recall",n,{...i===void 0?{}:{atBeat:i},...t>0?{glide:{seconds:t}}:{}});return}}Un(n)}function oe(n,e){const t=Zt[n]??"";if(e==="store")m.store(n),re.say(qe(e,t,!0));else if(e==="clear"){const i=m.bank.slots[n]!=null;if(_.queued===n){const a=_.drop();_.cancel();const r=m.bank.active;a&&r!=null&&N.sendSnapshot("recall",r,{atBeat:a.atBeat})}m.clear(n),re.say(qe(e,t,i)),i&&le.show(he,`Slot ${t} cleared`)}else m.bank.slots[n]==null?re.say(qe(e,t,!1,matchMedia("(pointer: coarse)").matches)):Ia(n);A(),T()}function he(){m.undoSurprise()&&(le.dismiss(),A(),T())}function Ra(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),he();return}if(n.code==="Space"){n.preventDefault(),n.repeat||mt();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=D||(n.preventDefault(),n.shiftKey?oe(i,"store"):n.altKey?oe(i,"clear"):oe(i,"recall"))}const Ba=new ts({min:Q[0],max:Q[1]});function Qe(n){m.doc.bpm=n,P.setTempo({bpm:n}),A(),T()}function za(){return N.swing==null?"No session swing yet. There is no request message, so this slider stays on this tab.":"The leader sets swing. This slider shows that value. A local edit would stay on this tab."}function Gn(){const n=O(),e=_a(),t=N.swing;return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:re.text,controls:[{type:"button",id:"play",label:un(e),on:e==="stop",...e==="join"?{ariaLabel:dn}:{},onPress:()=>void mt(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{m.surprise(),A(),T(),le.show(he)}},{type:"slider",id:"bpm",label:"Tempo",min:Q[0],max:Q[1],step:1,value:P.transport.bpm,onChange:Qe,onTap:i=>{const a=Ba.tap(i);a!==null&&a!==P.transport.bpm&&Qe(a)}},{type:"slider",id:"swing",label:N.isLeader?"Swing":t==null?"Swing (local)":"Swing (leader)",min:.5,max:.75,step:.01,value:N.isLeader?m.doc.swing:t??m.doc.swing,valueText:Di(N.isLeader?m.doc.swing:t??m.doc.swing),disabled:!N.isLeader,modulated:!N.isLeader&&t!=null,onChange:i=>{N.isLeader&&(m.edit(a=>{a.swing=i}),Ye(!1),A(),T())},onCommit:()=>{Ye(!0)}},...N.isLeader?[]:[{type:"note",id:"swing-note",text:za()}],...N.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:N.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:m.morphSeconds,morphText:xa(m.morphSeconds),slots:Zt.map((i,a)=>({label:i,filled:m.bank.slots[a]!=null,active:m.bank.active===a,edited:m.edited===a,queued:_.queued===a,pulse:_.queued===a&&n&&xe%4<2})),onMorph:i=>{m.morphSeconds=i,T()},onSlot:(i,a)=>{oe(i,a)}}]}}function Ze(){const n=m.doc.tracks.length;return n===0?0:Math.min(m.selectedTrack,n-1)}function Kn(){const n=m.doc.tracks[Ze()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${m.doc.tracks.length} tracks · ${n.name}`:`${m.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:ae==="stop",label:un(ae??"play"),...ae==="join"?{ariaLabel:dn}:{},onToggle:()=>void mt()},id:"grid",playhead:O()?xe:-1,selectedRow:n?.id,onSelectRow:e=>{m.selectTrack(e),T()},onDice:e=>{const t=m.doc.tracks[e]?.name??"Lane";m.diceLane(e)&&(A(),T(),le.show(he,`New ${t} steps`))},onFill:e=>{Bn=e,A(),T()},onLength:(e,t)=>{m.edit(i=>{const a=i.tracks[e];a&&(a.length=Math.max(1,Math.min(a.steps.length,Math.round(t))))}),A(),T()},onMute:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),A(),T()},onSolo:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),A(),T()},onToggle:(e,t,i)=>{m.edit(a=>{const r=a.tracks[e]?.steps[t];r&&(i?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),A(),T()},onLongPress:(e,t,i)=>{const a=m.doc.tracks[e],r=a?.steps[t];!a||!r||Ls({anchor:i,title:`${a.name} · step ${t+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{m.edit(d=>{const c=d.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),A(),T()}})},onSet:(e,t,i,a)=>{m.edit(r=>{const o=r.tracks[e]?.steps[t];o&&(i==="accent"?(o.accent=a,a&&(o.on=!0)):(o.on=a,a||(o.accent=!1)))}),A(),T()},rows:m.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]},Oa()]}}function Oa(){const n=Ze(),e=m.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(i=>({type:"slider",id:i,label:Fi(i),valueText:Hi(i,e?.params[i]??0),min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{m.edit(r=>{const o=r.tracks[Ze()];o&&(o.params[i]=a)}),A(),T()}}))}}function ft(){return{id:"filter",title:"Filter",summary:m.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:m.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{m.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),A(),T()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:m.doc.fx.cutoff,valueText:nt(m.doc.fx.cutoff),onChange:n=>{m.edit(e=>{e.fx.cutoff=n}),A(),T()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:m.doc.fx.mode,cutoff:m.doc.fx.cutoff,resonance:m.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:In}]}}await Nn();const Vn=lt(Gn());await ct();const gt=lt({id:"pattern",title:"Pattern",lead:!0}),bt=lt({id:"filter",title:ft().title}),Wn={build:()=>gt.update(Kn())},Yn={build:()=>bt.update(ft())};let Te=null;function T(){m.takeSurpriseEdit()&&le.dismiss(),Vn.update(Gn()),Te?.ready(Wn)&&gt.update(Kn()),Te?.ready(Yn)&&bt.update(ft()),dt?.schedule()}window.addEventListener("pagehide",()=>dt?.flush());function Vt(n,e,t){_.cancel(),m.replace(n,e),A(),T(),dt?.schedule(),le.show(he,t)}wa(Ca,{save:()=>{const n=m.doc.name||"rhythm",e=URL.createObjectURL(new Blob([Ui(m.doc,m.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),re.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=Gi(n);if(!t.ok||!t.document||!t.bank){re.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}Vt(t.document,t.bank,`Loaded ${e}`)},create:()=>Vt(Ji(),en(),"New pattern"),panic:()=>U?.port.postMessage({type:"panic"})});P.onChange(()=>{if(m.playing=O(),!m.playing&&_.pending){const n=_.drop();n&&Un(n.slot)}m.doc.bpm=P.transport.bpm,A(),T(),ee()});N.onSwing(n=>{m.adoptSwing(n)&&(A(),T())});N.onSnapshot(n=>{if(n.op!=="recall")return;window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:R()});const e=n.glide?.seconds??0;if(O()&&Fn(n.slot,e,n.atBeat)){T();return}_.cancel(),m.recall(n.slot,e,Ae()),A(),T()});N.onRole(()=>{T(),ee()});N.onPeers(()=>{T(),ee()});B&&(window.__rhythm={setKick:n=>{m.edit(e=>{const t=e.tracks.find(i=>i.voice==="kick");t&&t.steps.forEach((i,a)=>{i.on=n.includes(a)})}),A(),T()},store:n=>oe(n,"store"),tap:n=>oe(n,"recall"),tempo:n=>Qe(n),beat:()=>P.transport.beatAt(R()),timeAt:n=>P.transport.timeAt(n),slots:()=>({active:m.bank.active??null,queued:_.queued}),lateEnter:()=>{Xe=!0},audio:async()=>(await ht(),await v?.resume(),v?.state??"none")});await ct();await N.start();document.addEventListener("keydown",Ra);oa(ut,[Vn,gt,bt],"adjacent");await ct();T();Te=ca([Wn,Yn]);ee();Te.done.then(()=>{document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=O();if(n!==m.playing&&(m.playing=n,T()),Je(),A(),!B||!v)return;const e=ka(v);e&&window.__stamps?.push(e)},250);
