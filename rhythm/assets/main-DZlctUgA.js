(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const ae=1e-9;function di(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class nt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return di(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let a=i.length?i[0].bpm:this.bpm;for(const o of i)o.beat<=e.beat+ae&&(a=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const o of i){if(o.beat<=e.beat+ae)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+ae){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-ae;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const r=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const o=Math.max(1,Math.round(i/a));this.setTempoAt(r,t);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,t+i*(l-1)/o)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new nt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+ae)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+ae)return t[i];return t[0]}}const ui=Object.freeze({beatsPerBar:4,beatUnit:4}),oe=1e-9;function hi(n){return Math.floor(n+oe)}function nn(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-oe)*e;return t&&a<=n+oe?a+e:a}class pi{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new nt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??ui}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-oe&&(this.stopTime===null||e<this.stopTime-oe)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-oe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=hi(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return nn(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const sn="nc-clock/snapshot",an=1;function mi(n,e="local"){return{format:sn,version:an,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function fi(n,e){const t=bi(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function gi(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const D=n=>typeof n=="number"&&Number.isFinite(n),Ct=n=>n===null||D(n);function bi(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==sn&&t("format"),(!D(e.version)||Math.floor(e.version)!==an)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!D(e.anchor.beat)||!D(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&D(i.beat)&&D(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!D(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!D(e.meter.beatUnit))&&t("meter"),(!Ct(e.startTime)||!Ct(e.stopTime)||!D(e.stoppedBeat))&&t("transport times"),e}class yi{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new pi(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){fi(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return mi(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const wi="nc-sync/1",ki=1,$i="nc-sync",vi="nc-sync-leader",xi=0,rn=.5,on=.75;function Si(n){return typeof n=="number"&&Number.isFinite(n)&&n>=rn&&n<=on?n:null}const je=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),he=n=>typeof n=="number"&&Number.isFinite(n),we=n=>typeof n=="string"&&n.length>0;function Ti(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ki||!we(e.type)||!we(e.from)||!he(e.term)||!he(e.seq)||!he(e.sentAt))return null;switch(e.type){case"hello":return we(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return he(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&he(e.slot)?e:null;case"ping":case"pong":return we(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Ei(n,e,t,i,a){return{proto:wi,from:e,term:t,seq:i,sentAt:a,...n}}function R(){return(performance.timeOrigin+performance.now())/1e3}const Re=.003,Mi=3,Li=.01,Pt=500;class Ai{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?Li:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=Re&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,r=this.median(),o=a-r,l=Math.abs(a-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!d&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(a,r,d))):(this.pendingStep=o,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,i){const a=this.ctx.currentTime,r=a<=this.revertUntil;let o;if(i&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-t,confirmedAt:a,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,u=this.preStep;u.length=0;for(let p=0;p<c.length;p++)u.push(c[p]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?a+this.stepRevert:-1/0}const l=this.offsets,d=e-t;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,o={stepSeconds:e-t,confirmedAt:a,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,t=this.scratch,i=e.length;t.length=i;for(let r=0;r<i;r++){const o=e[r];let l=r-1;for(;l>=0&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}const a=i>>1;return i%2?t[a]:(t[a-1]+t[a])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Re&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Pt)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Re)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<Pt)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Mi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class Ni{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...je,...e.capabilities},this.channelOption=e.channel??$i,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,r]=this.tempoRange();e=Math.min(r,Math.max(a,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const d=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??nn(d,1),d);i&&i>0?(o.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(on,Math.max(rn,e)):xi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=Si(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=Ti(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...je,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...je},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(vi,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,o,l)=>[r?0:1,o,l];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(a===null||o[0]<i[0]||o[0]===i[0]&&(o[1]<i[1]||o[1]===i[1]&&o[2]<i[2]))&&(i=o,a=r.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(Ei(e,this.id,this.term,++this.seq,this.o.now()))}}const Ci=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],H=10,ln=["1","2","3","4","5","6","7","8","9","0"];function cn(){return{slots:Array.from({length:H},()=>null),active:null}}function it(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function Pi(n,e,t){const i=n.slots.slice();return i[e]=it(t),{slots:i,active:e}}function _i(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function _t(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function Ii(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=it(e),{slots:t,active:n.active}}const ji=16,Ri=[2,6,10,14],Bi=[2,3,6,10,11,14],It=[0,2,4,6,8,10,12,14],zi=[2,6,10,14],Oi=[1,3,7,9,11,15],qi={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function K(){return Array.from({length:ji},()=>!1)}function F(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function Be(n,e,t){return F(n,Math.max(0,e-t),Math.min(1,e+t))}function Di(n){const e=K();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Hi(n){const e=K();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Ri.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function Fi(n,e){const t=K();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Ui(n,e){const t=K();let i=0;for(const a of Bi)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function Gi(n){const e=K();let t=0;for(const i of zi){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function Ki(n,e){const t=K();for(const o of It)t[o]=!n[o];const i=It.filter(o=>t[o]&&o!==0),a=1+Math.floor(e()*3);for(let o=0;o<a&&i.length>0;o+=1){const l=Math.floor(e()*i.length),d=i.splice(l,1)[0];d!==void 0&&(t[d]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(t[o]=!0,r+=1)}return t}function Wi(n,e){const t=K(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const r of i){if(a>=3)break;e()<.45&&(t[r]=!0,a+=1)}return t}function Vi(n,e,t){const i=K();let a=0;for(const r of Oi)a>=2||n[r]||e[r]||t()<.35&&(i[r]=!0,a+=1);return i}function dn(n,e,t){return Array.from({length:e},(i,a)=>{const r=n[a]===!0,o=r&&t(a);return{on:r,accent:o,velocity:o?1:.8}})}function un(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function Yi(n,e,t){const i=qi[n];return{tune:F(t,i.tune[0],i.tune[1],!0),decay:F(t,i.decay[0],i.decay[1]),tone:Be(t,e.tone,.15),snap:Be(t,e.snap,.15),drive:Be(t,e.drive,.1),level:F(t,i.level[0],i.level[1])}}function hn(n){const e=Di(n),t=Hi(n),i=Gi(n);return{kick:e,snare:t,clap:Fi(t,n),rim:Ui(e,n),hat:Ki(i,n),hatOpen:i,tom:Wi(t,n),metal:Vi(e,t,n)}}function Ji(n,e,t){const i=n.tracks[e];if(!i)return n;const a=l=>l.every((d,c)=>d.on===(i.steps[c]?.on??!1));let r=i.steps;for(let l=0;l<6;l++){const d=hn(t)[i.voice];if(r=dn(d,i.length,c=>un(i.voice,c)),!a(r)&&r.some(c=>c.on))break}const o=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((l,d)=>d===e?{...l,steps:[...r,...o]}:l)}}function Xi(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,r)=>{if(r<t||r>=e.length)return a;const o=r-t;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function Qi(n,e){const t=hn(e),i=e()<.4?.5:F(e,.5,.62),a=e(),r=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:r,cutoff:F(e,.55,.9),resonance:F(e,.05,.3),drive:F(e,.02,.18)},tracks:n.tracks.map(o=>({...o,mute:o.mute,solo:o.solo,params:Yi(o.voice,o.params,e),steps:dn(t[o.voice],o.length,l=>un(o.voice,l))}))}}function Zi(n,e=Math.random){const t=[];let i=null;for(let r=0;r<H;r+=1){const o=it(Qi(n,e));t.push(o),r===0&&(i=o)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}function st(n){return`${Math.round(n*100)}%`}function es(n){return st(n)}function ts(n,e){return n==="tune"?`${Math.round(e)} Hz`:st(e)}function ns(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Ge=2,pn=64;function is(n,e){const{version:t,...i}=n,a={...i,version:Ge,slots:Array.from({length:H},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(a)}function jt(n){return Array.isArray(n)&&n.length<=pn}function ss(n){if(os(n)>as)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==at)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==Ge)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const i=t.version,{slots:a,active:r,...o}=t,l=Ee({...o,version:rt});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const d=l.document,c=[];for(const p of d.tracks)jt(p.steps)||c.push(`More than ${pn} steps on ${p.id}`);const u={slots:Array.from({length:H},()=>null),active:null};return i===Ge&&(!Array.isArray(a)||a.length!==H?c.push(`Expected ${H} slots`):a.forEach((p,b)=>{if(p==null)return;if(!Ee({...d,swing:p.swing,fx:p.fx,tracks:p.tracks}).ok||!p.tracks.every(g=>jt(g.steps))){c.push(`Slot ${b+1} is malformed`);return}const w=typeof p.seed=="number"&&Number.isFinite(p.seed)?p.seed>>>0:0;u.slots[b]={swing:p.swing,fx:p.fx,tracks:p.tracks,seed:w}}),r!=null&&(!Number.isInteger(r)||r<0||r>=H||!u.slots[r]?c.push("Active slot is empty or out of range"):u.active=r)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:d,bank:u,from:i}}const at="netcomposer.rhythm",rt=1,as=256*1024,mn="netcomposer.rhythm.preset.",rs=new Set(Ci);function fn(n){return`${mn}${n}`}function os(n){let e=0;for(const t of n){const i=t.codePointAt(0)??0;i<=127?e+=1:i<=2047?e+=2:i<=65535?e+=3:e+=4}return e}function Ee(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==at&&e.push("Unknown format"),t.version!==rt&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(mn))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)rs.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function gn(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const ls={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function bn(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:at,version:rt,id:fn("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:gn(e.on,e.accent),params:{...ls[e.voice]}}))}}function cs(){const n=bn();return{...n,id:fn("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:gn([])}))}}const ds="Tap to join",yn="Tap to join the playing beat";function Se(n,e){return n&&e?"join":e?"stop":"play"}function wn(n){return n==="join"?ds:n==="stop"?"Stop":"Play"}function us(n,e,t={}){const i=t.beatsPerBar??4,a=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+a)/i-1e-9)*i)}class hs{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=Se(e,t),this.shown}gesture(e,t,i=!1){return this.joinedBy=!1,i||this.joining||Se(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const i=this.joinedBy||this.joining||Se(e,t)==="join";return this.joinedBy=!1,i}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=us(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class ps{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const i=this.key(e);if(this.value=e,this.has=!0,!t&&i===this.lastKey)return!1;this.lastKey=i;for(const a of this.listeners)a(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class ot{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,i,a={}){const r=a.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=a.atBeat??kn(t,a.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:i},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new ot;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function kn(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class ms{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:a=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>i||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*a&&(this.taps=[r]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const d=this.meanInterval();return d===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/d)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const $n=globalThis,fs="linkslots",gs=new Set(["0","false","off","no"]);function bs(n,e=$n.location?.search??"",t=ws()){const i=new URLSearchParams(e).get(fs);if(i!==null)return!gs.has(i.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function ys(n,e,t){return t||e===n}function ws(){try{return $n.localStorage??null}catch{return null}}const ks="nc-ui",$s={breakpoint:{md:"768px"}},vn={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},J={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},ke=n=>`--${ks}-${n}`,Ke=vn["label-on-fill-dark"],Rt=vn["label-on-fill-light"],vs=J["label-min-contrast"],xs=/^#[0-9a-f]{6}$/i,Ss=n=>typeof n=="string"&&xs.test(n),ze=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Bt(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=r=>{const o=(r+n/30)%12;return t-i*Math.max(-1,Math.min(o-3,9-o,1))};return`#${ze(a(0)*255)}${ze(a(8)*255)}${ze(a(4)*255)}`}function xn(n){const[e,t,i]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),a=Math.max(e,t,i),r=Math.min(e,t,i),o=(a+r)/2,l=a-r;if(!l)return{h:0,s:0,l:o};const d=l/(1-Math.abs(2*o-1));return{h:((a===e?60*((t-i)/l%6):a===t?60*((i-e)/l+2):60*((e-t)/l+4))+360)%360,s:d,l:o}}function zt(n){const[e,t,i]=[1,3,5].map(a=>{const r=parseInt(n.slice(a,a+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function We(n,e){const[t,i]=[zt(n),zt(e)].sort((a,r)=>r-a);return(t+.05)/(i+.05)}const Me=n=>We(n,Ke)>=We(n,Rt)?Ke:Rt;function Sn(n,e,t,i=vs){let a=Bt(n,e,t);const r=Me(a)===Ke?1:-1;for(let o=0;o<40&&We(a,Me(a))<i;o++)t+=r*.01,a=Bt(n,e,t);return a}function Ts(n){const{h:e,s:t}=xn(n),i=Sn(e,Math.min(t,J["surprise-on-max-saturation"]),J["surprise-on-lightness"]);return{fill:n,ink:Me(n),on:i,onInk:Me(i)}}const Es=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function Ms(n,e=Math.random){const[t,i]=J["surprise-saturation"],[a,r]=J["surprise-lightness"],o=J["surprise-min-hue-gap"],l=Ss(n)?xn(n).h:null;let d=e()*360;return l!==null&&Es(d,l)<o&&(d=(l+o+e()*(360-2*o))%360),Sn(d,t+e()*(i-t),a+e()*(r-a))}function Ls(n){if(!n)return null;const e=Ts(n);return{[ke("surprise-fill")]:e.fill,[ke("surprise-ink")]:e.ink,[ke("surprise-on")]:e.on,[ke("surprise-on-ink")]:e.onInk}}const As=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Ns={renames:As},Cs={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},Ps={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},_s={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},Ne={};for(const[n,e]of Object.entries(Cs))Ne[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(_s))Ne[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Ps))Ne[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(Ns.renames.map(n=>[n.old,n.new]));function Tn(n){const e=Ne[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function U(n){return Tn(n).prop}function s(n){return`var(${U(n)})`}function Is(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(U(e)));return Number.isFinite(t)?t:0}function O(n,e){const t=Tn(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const r=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=r:t.kind==="opacity"?a.style.opacity=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=r:a.style.color=r,(n instanceof Element?n:i.documentElement).append(a);const d=(i.defaultView??window).getComputedStyle(a),c=t.kind==="family"?d.fontFamily:t.kind==="color"?d.color:t.kind==="opacity"?d.opacity:d.paddingLeft;return a.remove(),c}function js(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function Rs(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const Bs="[data-modulated], [data-modulated] *";function zs(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-fx[data-nc-depth="${i}"] {
      background: ${s(`module-bg-stack-${i}`)};
      ${U("text-sub")}: ${s(`module-sub-stack-${i}`)};
      ${U("divider")}: ${s(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${s(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${U("text-sub")}: ${s("module-sub-stack-1")};
      ${U("divider")}: ${s("module-div-stack-1")};
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
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${s("rhythm.name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${s("rhythm.name-width")} - ${s("rhythm.module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${s("rhythm.name-width")} - ${s("rhythm.module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${s("rhythm.name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${s("rhythm.module-gap")};
  row-gap: ${s("rhythm.control-gap")};
  padding-bottom: ${s("rhythm.module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${s("rhythm.name-width")}, 100%), 1fr) auto auto;
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
${Bs} { transition: none; }
.nc-range:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("rhythm.control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty, filled (accent-pad) or accented (ink) step, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
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
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
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
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${s("playhead-width")};
  outline-offset: ${s("playhead-offset")};
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
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
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
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
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("rhythm.control-gap")} ${s("rhythm.header-gap")};
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
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${s("target-min")}; min-height: ${s("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
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
/* Pinned to its containing block's corner at zero size, so wherever it sits in a control (after a long label or
   note, in an unpositioned box) it can never reach past the page edge. It is empty and never shown; it only carries
   the accent and the UI font for token reads. */
.nc-token-probe {
  position: absolute;
  inset: 0 auto auto 0;
  width: 0;
  height: 0;
  overflow: hidden;
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
`}let Oe=null;function En(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Oe&&Oe.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=zs(),n.head.append(e),Oe=e}const Mn={slop:8,longPressMs:500,pitchPx:16};class Os{constructor(e,t,i=Mn){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const r=this.hit(t,i);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const r=t-this.x0,o=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,i);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function qs(n,e,t,i=Mn){let a=!1,r=0;const o=(c,u)=>{const b=n.ownerDocument.elementFromPoint?.(c,u),y=[...n.querySelectorAll(e)],w=b?y.findIndex(f=>f===b||f.contains(b)):-1;if(w>=0)return w;let g=-1,h=Number.POSITIVE_INFINITY;return y.forEach((f,k)=>{if(f.hidden)return;const S=f.getBoundingClientRect();if(u<S.top||u>S.bottom)return;const T=Math.abs(c-(S.left+S.width/2));T<h&&T<=S.width&&(g=k,h=T)}),g},l=new Os(o,c=>{(c.kind==="paint"||c.kind==="long")&&(a=!0),t(c)},i),d=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",c=>{c.button>0||(a=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),n.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{a&&(a=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}const Ds=J["toast-duration"];function Hs({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function Fs(n,e,t,i){const a=l=>({top:l,bottom:l+t}),r=l=>n.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),o=a(e-i-t);return r(o)?r(a(i))?"bottom":"top":"bottom"}function Ln(n,e,t,i,a,r){let o=n.bottom+a;const l=Math.max(r,Math.min(n.left,i-r-t.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(const u of e)u&&u.bottom>o&&u.top<o+t.height&&u.right>l&&u.left<l+t.width&&(o=u.bottom+a,d=!0)}return{top:o,left:l}}const Ot="data-nc-ui-toast-live";function Us(n,e){let t=e.querySelector(`[${Ot}]`);return t||(t=n.createElement("div"),t.setAttribute(Ot,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Gs({message:n,actionLabel:e,onAction:t,duration:i=Ds,onClose:a,avoid:r=[],anchor:o,host:l,document:d=globalThis.document}={}){l=l??d.body;const c=d.defaultView??globalThis,u=d.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=n,u.appendChild(p);let b=null;e&&(b=d.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),l.appendChild(u);let y="open";const w=j=>j&&typeof j.getBoundingClientRect=="function"?j.getBoundingClientRect():null,g=w(u),h=g?.height||44,f=c.getComputedStyle?.(u),k=Number.parseFloat(f?.getPropertyValue(U("toast-offset")))||16,S=Number.parseFloat(f?.getPropertyValue(U("toast-anchor-gap")))||8,T=w(o),$=c.innerHeight??0,E=r.map(w).filter(Boolean),M=T&&T.bottom>0&&T.top<$?Ln(T,E,{width:g?.width||0,height:h},c.innerWidth??0,S,k):null;M&&M.top+h<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${M.top+(c.scrollY??0)}px`,u.style.left=`${M.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",Fs(E,$,h,k));const A=c.requestAnimationFrame?.bind(c)??(j=>setTimeout(j,16));A(()=>A(()=>{y==="open"&&u.setAttribute("data-state","open")})),Us(d,l).textContent=Hs({message:n,actionLabel:e});let N,se;const ue=new Promise(j=>{se=j}),ye=j=>{clearTimeout(N),N=setTimeout(()=>Ie("timeout"),j)};let _e=i,Tt=Date.now();const Et=()=>{y==="open"&&(clearTimeout(N),_e=Math.max(0,_e-(Date.now()-Tt)))},Mt=()=>{y==="open"&&(Tt=Date.now(),ye(_e))};u.addEventListener("pointerenter",Et),u.addEventListener("pointerleave",Mt),u.addEventListener("focusin",Et),u.addEventListener("focusout",Mt),b?.addEventListener("click",()=>{if(y==="open")try{t?.()}finally{Ie("action")}}),Number.isFinite(i)&&ye(i);function Ie(j="close"){if(y!=="open")return;y="closing",clearTimeout(N),u.setAttribute("data-state","closing"),a?.(j);const Lt=c.getComputedStyle?.(u),ci=Lt?Math.max(0,...String(Lt.transitionDuration||"").split(",").map(Nt=>Number.parseFloat(Nt)*(Nt.trim().endsWith("ms")?1:1e3)||0)):0,At=()=>{y!=="gone"&&(y="gone",u.remove(),se(j))};u.addEventListener("transitionend",At),setTimeout(At,ci+50)}return{el:u,close:Ie,closed:ue}}function qt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Ks({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const d=l.defaultView??globalThis,c={velocity:t,probability:i},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const b=l.createElement("div");b.className="nc-step-editor-head";const y=l.createElement("span");y.className="nc-label",y.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",b.append(y,w),p.appendChild(b);const g=[];for(const[T,$]of[["velocity","Velocity"],["probability","Chance"]]){const E=l.createElement("label");E.className="nc-step-editor-row";const M=l.createElement("span");M.className="nc-label",M.textContent=$;const A=l.createElement("input");A.type="range",A.className="nc-range",A.min=T==="velocity"?"0.05":"0",A.max="1",A.step="0.05",A.value=String(c[T]),A.setAttribute("data-nc-edit",T);const N=l.createElement("output");N.className="nc-readout",N.textContent=qt(c[T]),A.setAttribute("aria-valuetext",N.textContent),A.addEventListener("input",()=>{c[T]=Number(A.value),N.textContent=qt(c[T]),A.setAttribute("aria-valuetext",N.textContent),a({velocity:c.velocity,probability:c.probability})}),E.append(M,A,N),p.appendChild(E),g.push(A)}if(o.append(u,p),n?.setAttribute?.("data-editing","true"),d.matchMedia?.(`(max-width: ${$s.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const T=n?.getBoundingClientRect?.(),$=p.getBoundingClientRect(),E=Number.parseFloat(d.getComputedStyle(p).getPropertyValue("row-gap"))||8;if(T){let{top:M,left:A}=Ln(T,[],{width:$.width,height:$.height},d.innerWidth,E,E);M+$.height>d.innerHeight&&(M=Math.max(E,T.top-E-$.height)),p.style.top=`${M}px`,p.style.left=`${A}px`}p.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let f=!0;const k=T=>{T.key==="Escape"&&(T.preventDefault(),S())};function S(){f&&(f=!1,l.removeEventListener("keydown",k,!0),u.remove(),p.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",k,!0),u.addEventListener("pointerdown",T=>{T.preventDefault(),S()}),w.addEventListener("click",S),{el:p,close:S}}function Ws(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==r)&&(n.width=a,n.height=r);const o=n.getContext("2d");return o?.setTransform(i,0,0,i,0,0),{ctx:o,w:e,h:t}}function qe(n){return Math.max(0,Math.min(1,n))}function An(n,e){const{ctx:t,w:i,h:a}=Ws(n);if(!t)return;t.clearRect(0,0,i,a);const r=Rs(n);if(e.paint==="swatch"){const d=O(n,"accent"),c=O(n,"rhythm.step-cell-on");n.dataset.ncAccent=d,n.dataset.ncStep=c,t.fillStyle=d,t.fillRect(0,0,i/2,a),t.fillStyle=c,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const d=e.mode??"lp",c=O(n,js(d)),u=O(n,"divider"),p=qe(e.cutoff??.5),b=.08+(1-qe(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let y=0;y<=i;y++){const w=y/Math.max(1,i);let g=0;d==="lp"?g=w<p?1:Math.max(0,1-(w-p)/b):d==="hp"?g=w>p?1:Math.max(0,1-(p-w)/b):g=Math.max(0,1-Math.abs(w-p)/b);const h=a*.78-g*a*.62;y===0?t.moveTo(y,h):t.lineTo(y,h)}t.strokeStyle=c,t.stroke(),t.fillStyle=O(n,"text-sub"),t.font=r,t.fillText(d.toUpperCase(),0,a),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=O(n,"accent"),t.beginPath();const d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){const u=c/Math.max(1,i),p=(a-4)*(1-Math.exp(-u*4/d));t.lineTo(c,a-p)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const d=qe(e.level??0);t.fillStyle=O(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=O(n,"accent"),t.fillRect(0,a*.4,i*d,a*.2),n.dataset.ncAccent=t.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;t.fillStyle=O(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=O(n,"rhythm.playhead"),t.fillRect(l/o*i,a*.3,Math.max(1,i/o),a*.4),n.dataset.ncAccent=O(n,"accent")}function I(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function Ce(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function Dt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ve(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Vs=450,Ht=8;function X(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Ys(n){const e=Is(n,"target-min");return e>0?e:44}function Js(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=Ys(n),a=i/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){const l=t[o],d=r[o];if(!(l instanceof HTMLElement)||!d||d.width===0||d.height===0)continue;if(d.width>=i&&d.height>=i){l.style.display="none";continue}const c=d.left+d.width/2,u=d.top+d.height/2;let p=c-a,b=c+a,y=u-a,w=u+a;for(let g=0;g<t.length;g++){if(o===g)continue;const h=r[g];if(!h||h.width===0)continue;const f=h.left+h.width/2,k=h.top+h.height/2;Math.abs(k-u)<a*2&&(f>c?b=Math.min(b,(c+f)/2):f<c&&(p=Math.max(p,(c+f)/2))),Math.abs(f-c)<a*2&&(k>u?w=Math.min(w,(u+k)/2):k<u&&(y=Math.max(y,(u+k)/2)))}p=Math.min(p,d.left),b=Math.max(b,d.right),y=Math.min(y,d.top),w=Math.max(w,d.bottom),l.style.left=`${p-d.left}px`,l.style.top=`${y-d.top}px`,l.style.width=`${Math.max(0,b-p)}px`,l.style.height=`${Math.max(0,w-y)}px`,l.style.transform="none"}}function Nn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Ft(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Cn(n,e){switch(n.type){case"slider":return Xs(n,e);case"select":return Zs(n,e);case"toggle":return ea(n,e);case"button":return ta(n,e);case"readout":return na(n);case"label":return ia(n);case"note":return Ut(n);case"knob":return oa(n,e);case"choice":return la(n,e);case"slotRow":return ca(n,e);case"stepGrid":return pa(n,e);case"canvas":return ga(n);case"fx":return ba(n,e);default:return Ut({id:"unknown",text:""})}}function ne(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Pn(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Ve(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),Dt(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")Dt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&aa(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=Ve(e.value))}else if(e.type==="choice")_n(n,e);else if(e.type==="slotRow")jn(n,e);else if(e.type==="stepGrid")Ye(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&An(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${ya(t.id)}"]`);i instanceof Element&&ne(i,t)}}}function Xs(n,e){const t=Ce(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{const r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),n.onTap&&t.insertBefore(Qs(n,i,e),a),t.append(I()),ne(t,n),t}function Qs(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(X());const a=r=>{const o=t(e);o?.type==="slider"&&o.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&a(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),a(r.timeStamp))}),i}function Zs(n,e){const t=Ce(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const r=document.createElement("option");r.value=a.value,r.textContent=a.label,i.append(r)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,I()),t}function ea(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(I()),ne(t,n),t}function ta(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const r=e(t);r?.type==="button"&&r.onPress()}),t.append(I()),ne(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=Nn(),a.addEventListener("click",()=>{const r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Rn(r);const o=e(t);o?.type==="button"&&o.onSparkle?.()}),i.append(t,a),i}function na(n){const e=Ce(n.id,n.label);return e.append(I()),ne(e,n),e}function ia(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(I()),e}function Ut(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(I()),e}function sa(n){const e=Ve(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Pn(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function aa(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;Pn(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",sa(e)),n.setAttribute("aria-label",e.label)}function ra(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function oa(n,e){const t=Ce(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let r=0,o=0;i.addEventListener("pointerdown",d=>{r=d.clientY;const c=e(i);o=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;const c=e(i);if(c?.type!=="knob")return;const u=c.max-c.min||1,p=Math.min(c.max,Math.max(c.min,o-(d.clientY-r)*u/120));c.onChange(p)}),i.addEventListener("keydown",d=>{const c=e(i);if(c?.type!=="knob")return;const u=ra(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(i,l),t.append(I()),ne(t,n),t}function la(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const r=e(t);r?.type==="choice"&&r.onChange(i.value)}),a.addEventListener("keydown",r=>{const o=[...t.querySelectorAll("[data-nc-choice]")],l=o.indexOf(a);let d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+o.length)%o.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=o.length-1;else return;const c=o[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),t.append(a)}return t.append(I()),_n(t,n),t}function _n(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function ca(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){const p=n.slots[u],b=document.createElement("span");b.className="nc-snap-wrap";const y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(u),y.textContent=p.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(y,X()),da(b,y,t,u,e),i.append(b)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=Nn(),a.append(X()),a.addEventListener("click",()=>{Rn(t);const u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(o,d,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...a?[a]:[]),t.append(c,r,I()),In(t,e),jn(t,n),t}function Gt(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;me(n);const r=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,r)}function da(n,e,t,i,a){let r=0,o=0,l=0,d=!1,c=!1,u=!1,p=!1;const b=()=>{window.clearTimeout(r),r=0},y=f=>{const k=f.clientX-o,S=f.clientY-l;k*k+S*S>Ht*Ht&&(d=!0,b())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",h))},g=f=>{const k=r!==0&&!d&&!c;b(),w(),k&&(u=!0,Gt(t,i,a,f))},h=()=>{d=!0,b(),w()};n.addEventListener("pointerdown",f=>{f.button===0&&(w(),c=!1,d=!1,u=!1,o=f.clientX,l=f.clientY,b(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,ua(t,e,i,a))},Vs),p=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",h))}),n.addEventListener("contextmenu",f=>f.preventDefault()),n.addEventListener("click",f=>{if(u||c||d){u=!1,c=!1,d=!1;return}Gt(t,i,a,f)})}function In(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=Kt("Save","store"),a=Kt("Clear","clear");t.append(i,a);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),me(n)}),r.addEventListener("click",o=>o.stopPropagation()),n.append(r,t),t.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const d=e(n);if(d?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),me(n)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),me(n))}),n.addEventListener("keydown",o=>{o.key==="Escape"&&me(n)})}function Kt(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function ua(n,e,t,i){In(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();a.style.left=`${l.left-o.left}px`,a.style.top=`${l.bottom-o.top}px`,a.querySelector("button")?.focus()}function me(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function jn(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const r=Number(a.dataset.ncSlot),o=e.slots[r];if(!o)continue;a.textContent=o.label,o.filled?a.dataset.filled="true":delete a.dataset.filled,o.active?a.dataset.active="true":delete a.dataset.active,o.edited?a.dataset.edited="true":delete a.dataset.edited,o.queued?a.dataset.queued="true":delete a.dataset.queued,o.queued&&o.pulse?a.dataset.pulse="true":delete a.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];a.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Rn(n){const e=n.dataset.ncLastFill||null,t=Ms(e);n.dataset.ncLastFill=t;const i=Ls(t);if(i)for(const[a,r]of Object.entries(i))n.style.setProperty(a,r)}function ha(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=r=>{if(i===r)return;i=r,t.setAttribute("aria-pressed",r?"true":"false");const o=e(n);o?.type==="stepGrid"&&o.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),a(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>a(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||a(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),a(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function pa(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=h=>{const f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=h,i.append(f),f},r=a("Note"),o=a("Accent");o.dataset.ncAccentMode="";const l=h=>{for(const f of[r,o]){const k=f===h;f.setAttribute("aria-checked",k?"true":"false"),f.tabIndex=k?0:-1}};l(r);for(const h of[r,o])h.addEventListener("click",()=>l(h));i.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const f=o.getAttribute("aria-checked")==="true"?r:o;l(f),f.focus()});const d=document.createElement("div");d.className="nc-step-tools",d.append(i),n.onFill&&d.append(ha(t,e)),t.append(d);for(const h of n.rows){const f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=h.label,k.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(k.dataset.ncLane=String((h.lane-1)%4+1)),k.addEventListener("click",()=>{const $=e(t);if($?.type!=="stepGrid")return;const E=$.rows.findIndex(M=>M.id===h.id);$.onSelectRow?.(E)}),k.addEventListener("keydown",$=>ma(t,k,$));const S=[];for(const $ of["mute","solo"]){if(!($==="mute"?n.onMute:n.onSolo))continue;const M=document.createElement("span");M.className="nc-ms-wrap";const A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=$,A.textContent=$==="mute"?"M":"S",A.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),M.append(A,X()),M.addEventListener("click",()=>{const N=e(t);if(N?.type!=="stepGrid")return;const se=N.rows.findIndex(ue=>ue.id===h.id);($==="mute"?N.onMute:N.onSolo)?.(se)}),S.push(M)}const T=document.createElement("div");T.className="nc-steps";for(let $=0;$<h.steps.length;$++){const E=document.createElement("span");E.className="nc-step-wrap";const M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${h.id}:${$}`,M.setAttribute("aria-label",`${h.label} step ${$+1}`),E.append(M,X()),E.addEventListener("click",A=>{const N=e(t);if(N?.type!=="stepGrid")return;const se=N.rows.findIndex(ye=>ye.id===h.id),ue=o.getAttribute("aria-checked")==="true";N.onToggle(se,$,A.shiftKey||ue)}),T.append(E)}if(n.onLength&&T.append(fa(t,T,h,e)),f.append(...S,k,T),n.onDice){const $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Ft(),$.append(X()),$.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===h.id))}),f.append($)}f.addEventListener("click",$=>{if($.target!==f)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===h.id))}),Wt(t,T,".nc-step-wrap",e,o,()=>h.id),t.append(f)}const c=document.createElement("div");c.className="nc-pads-head";const u=(h,f,k)=>{const S=document.createElement("button");return S.type="button",S.className=h,S.textContent=f,k&&S.setAttribute("aria-label",k),S},p=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),y=document.createElement(n.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),n.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{const h=e(t);h?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",Ye(t,h))}));for(const[h,f]of[[p,-1],[b,1]])h.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const S=k.rows.length;k.onSelectRow?.((($e(k)+f)%S+S)%S)});if(c.append(p,y,b),n.onDice){const h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Ft(),h.addEventListener("click",()=>{const f=e(t);if(f?.type!=="stepGrid")return;const k=$e(f);k>=0&&f.onDice?.(k)}),c.append(h)}if(n.transport){const h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const f=e(t);f?.type==="stepGrid"&&f.transport?.onToggle()}),c.append(h)}t.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const g=Math.max(0,...n.rows.map(h=>h.steps.length));for(let h=0;h<g;h++){const f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(h),f.textContent=String(h+1),f.addEventListener("click",k=>{const S=e(t);if(S?.type!=="stepGrid")return;const T=$e(S);if(T<0)return;if(t.dataset.ncLenMode==="true"){S.onLength?.(T,h+1);return}const $=o.getAttribute("aria-checked")==="true";S.onToggle(T,h,k.shiftKey||$)}),w.append(f)}return Wt(t,w,".nc-pad",e,o,()=>{const h=e(t);return h?.type==="stepGrid"?h.rows[$e(h)]?.id:void 0}),t.append(w),t.append(I()),Ye(t,n),t}function $e(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function Wt(n,e,t,i,a,r){let o="on",l=!0,d=-1;const c=(u,p)=>{const b=u.rows[d]?.steps[p];!b||p>=u.rows[d].length||(u.onSet?u.onSet(d,p,o,l):!!b[o]!==l&&u.onToggle(d,p,o==="accent"))};qs(e,t,u=>{const p=i(n);if(p?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const b=p.rows.findIndex(y=>y.id===r());b>=0&&p.rows[b].length!==u.pad+1&&p.onLength?.(b,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const b=r();d=p.rows.findIndex(w=>w.id===b);const y=p.rows[d]?.steps[u.pad];if(!y)return;o=a.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[o]}c(p,u.pad)}else if(u.kind==="long"){const b=r(),y=p.rows.findIndex(g=>g.id===b),w=e.querySelectorAll(t)[u.pad];y>=0&&w instanceof HTMLElement&&p.onLongPress?.(y,u.pad,w)}}})}function ma(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let r=a;t.key==="ArrowDown"?r=a+1:t.key==="ArrowUp"?r=a-1:t.key==="Home"?r=0:r=i.length-1;const o=i[r];!(o instanceof HTMLElement)||o===e||(t.preventDefault(),o.focus(),o.click())}function fa(n,e,t,i){const a=document.createElement("button");a.type="button",a.className="nc-len-handle",a.dataset.ncLen=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-valuemin","1"),a.setAttribute("aria-valuemax",String(t.steps.length)),a.append(X());const r=c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.findIndex(w=>w.id===t.id),b=u.rows[p];if(!b)return;const y=Math.max(1,Math.min(b.steps.length,c));y!==b.length&&u.onLength?.(p,y)},o=c=>{const u=[...e.querySelectorAll(".nc-step")];let p=1;return u.forEach((b,y)=>{const w=b.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(p=y+1)}),p},l=c=>r(o(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete a.dataset.dragging};return a.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),a.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),a.addEventListener("keydown",c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.find(y=>y.id===t.id);if(!p)return;const b={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),a}function Ye(n,e){const t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=n.querySelector(".nc-pads-label"),o=n.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&a&&(r.textContent=o?`${a.label} · ${a.length}`:a.label,e.onLength&&(r.setAttribute("aria-pressed",o?"true":"false"),r.setAttribute("aria-label",o?`${a.label} length ${a.length} steps: tap or drag the pads to set the end, tap here when done`:`${a.label}, ${a.length} steps: tap to set the length`)));const l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&a&&(l.setAttribute("aria-label",`Re-roll ${a.label}`),l.title=`Re-roll ${a.label}: new steps for this lane (Undo takes it back)`);const d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");const p=e.transport?.ariaLabel;p?d.setAttribute("aria-label",p):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const c=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const u of i.querySelectorAll("[data-nc-pad]")){const p=Number(u.getAttribute("data-nc-pad")),b=a.steps[p];u instanceof HTMLButtonElement&&(u.hidden=!b||!o&&p>=a.length,o&&p>=a.length?u.dataset.out="true":delete u.dataset.out,o&&p===a.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${a.label} step ${p+1}`),u.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?u.dataset.accent="true":delete u.dataset.accent,b?.dim?u.dataset.dim="true":delete u.dataset.dim,e.playhead>=0&&p===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(const c of e.rows){for(let y=0;y<c.steps.length;y++){const w=c.steps[y],g=n.querySelector(`[data-nc-step="${c.id}:${y}"]`);if(!(g instanceof HTMLButtonElement))continue;const h=g.closest(".nc-row");if(h instanceof HTMLElement){e.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;const S=h.querySelector(".nc-name");S instanceof HTMLElement&&S.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(const $ of h.querySelectorAll("[data-nc-ms]")){const E=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?g.dataset.accent="true":delete g.dataset.accent,w.dim?g.dataset.dim="true":delete g.dataset.dim,y%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof w.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level"));const f=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;y===f?g.dataset.playhead="true":delete g.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;g.hidden=y>=c.length&&!k,y>=c.length&&k?g.dataset.out="true":delete g.dataset.out}const u=n.querySelector(`[data-nc-len="${c.id}"]`),b=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&b&&b.nextElementSibling!==u){const y=document.activeElement===u;b.after(u),y&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function ga(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,I()),e}function ba(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(Cn(a,e));return t.append(I()),t}function ya(n){return n.replace(/["\\]/g,"\\$&")}function wa(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&An(t,i)}Js(n)}const lt="netcomposer.rhythm.hidden.v1",W=new WeakMap;function De(){try{return globalThis.localStorage??null}catch{return null}}function Bn(n,e=lt){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Vt(n,e,t,i=lt){const a=Bn(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function ct(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function ka(n,e){if(!(!n||!e))return ct(n).find(t=>t.id===e)}function $a(n){return`${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}`).join(",")}#${ct(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(i=>`${i.id}/${i.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(i=>i.value).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.controls.map(i=>i.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function va(n,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=e.title,n.append(r);return}const t=document.createElement("div");t.className="nc-panel-hd";const i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;const a=document.createElement("span");a.className="nc-panel-subject",a.dataset.ncPanelSubject="",t.append(i,a),n.append(t),zn(n,e)}function zn(n,e){if(!e.panel)return;const t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),i=t?.querySelector(".nc-panel-title"),a=t?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),a&&(a.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function xa(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=W.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ka(t,i)}function Sa(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=$a(e);if(n.dataset.ncSignature===i){for(const a of t){const r=n.querySelector(`[data-nc-section="${Yt(a.id)}"]`);r&&zn(r,a);for(const o of a.controls){const l=n.querySelector(`[data-nc-id="${Yt(o.id)}"]`);l instanceof Element&&ne(l,o)}}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=a.id,a.inset&&(r.dataset.ncInset="true"),a.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),a.title&&r.setAttribute("aria-label",a.title)),va(r,a);const o=a.panel?document.createElement("div"):r;a.panel&&(o.className="nc-panel-body",r.append(o));for(const l of a.controls)o.append(Cn(l,xa));n.append(r)}}function Yt(n){return n.replace(/["\\]/g,"\\$&")}function dt(n,e=lt){En();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead="");const i=Bn(De(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="",o.append(l,d);const c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",a.append(r,c,o);const u=document.createElement("div");u.className="nc-module-body",u.id=`${n.id}-body`;const p=document.createElement("button");p.type="button",p.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",p.append(b);const y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",t.append(y,a,u,p),t.setAttribute("aria-labelledby",r.id);const w=h=>{const f=W.get(t)??n;t.dataset.ncOpen=h?"false":"true",u.hidden=h,p.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${f.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const h=t.dataset.ncOpen==="true";Vt(De(),(W.get(t)??n).id,h,e),w(h),Je(t.parentElement)}),p.addEventListener("click",()=>{Vt(De(),(W.get(t)??n).id,!1,e),w(!1),Je(t.parentElement)});const g={el:t,update(h){W.set(t,h),r.textContent=h.title,c.textContent=h.status??"",h.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),b.textContent=h.summary??h.title,p.setAttribute("aria-label",`Show ${h.title}`),Sa(u,h),w(u.hidden),g.redraw()},redraw(){const h=W.get(t);h&&wa(t,ct(h))}};return W.set(t,n),w(i),g.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(t),g}function Ta(n,e,t="adjacent"){En(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,r)=>{const o=r%4+1;a.el.dataset.ncShade=String(o),a.el.dataset.ncPlace=i;const l=a.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),n.append(a.el),a.redraw()}),Je(n)}function Je(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?s("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",i.join(" "));const a=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&a.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function On(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function Ea(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function Ma(n,e={}){const t=new Set,i=(async()=>{await On();for(const a of n)await Ea(e.timeoutMs??200),a.build(),t.add(a)})();return{ready:a=>t.has(a),done:i,toJSON:()=>({built:t.size,total:n.length})}}function ut(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const qn="petra-rhythm.state",Dn=1,La=400,Aa=2e3;function Na(n){return JSON.stringify({v:Dn,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function Ca(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return Ee({...n,swing:t,fx:i,tracks:a}).ok}function Pa(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Dn)return null;const t=Ee(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==H)return null;const r=a.slots.map(c=>c===null?null:c);if(!r.every(c=>c===null||Ca(i,c)))return null;const o=Number.isInteger(a.active)&&r[a.active]?a.active:null,l=e.selectedTrack,d=Number.isInteger(l)&&l>=0&&l<i.tracks.length?l:0;return{doc:i,bank:{slots:r,active:o},selectedTrack:d}}function _a(n,e,t=La){let i,a=0,r="";const o=()=>{clearTimeout(i),i=void 0,a=0;try{const l=Na(e());if(l===r)return;n.setItem(qn,l),r=l}catch{}};return{schedule(){const l=Date.now();a||(a=l),clearTimeout(i),i=setTimeout(o,Math.min(t,Math.max(0,a+Aa-l)))},flush:o}}function Ia(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return Pa(n.getItem(qn))}catch{return null}}const He={maker:"PETRA",instrument:"RHYTHM",number:"01"},ht="PETRA Rhythm";let Jt=!1;function ja(){return`
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
`}function Ra(n){const e=n.ownerDocument;if(!Jt){const d=e.createElement("style");d.dataset.petraHead="",d.textContent=ja(),e.head.append(d),Jt=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const d=e.createElement("span");return d.className="petra-head-sep",d.textContent="/",d},r=e.createElement("span");r.className="petra-head-num",r.textContent=He.number,i.append(`${He.maker} `,a(),` ${He.instrument} `,a()," ",r);const o=e.createElement("p");o.className="petra-head-line",o.textContent="A NetComposer element.";const l=e.createElement("div");return l.className="petra-head-title",l.append(i,o),t.append(l),n.before(t),t}function Ba(n,e){const t=n.ownerDocument,i=t.createElement("details");i.className="petra-menu";const a=t.createElement("summary");a.setAttribute("aria-label","Menu"),a.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=t.createElement("div");r.className="petra-menu-body";const o=t.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const u=o.files?.[0];o.value="",u&&e.load(await u.text(),u.name)});const l=(u,p)=>{const b=t.createElement("button");return b.type="button",b.textContent=u,b.dataset.petraMenu=u.toLowerCase(),b.addEventListener("click",()=>{p(),d||(i.open=!1)}),b};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),i.append(a,r),n.append(i);let d=null;const c=()=>{const u=getComputedStyle(a).display==="none";u!==d&&(i.open=u),d=u};return window.addEventListener("resize",c),c(),i}function za(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function Xt(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const r=a+(e-i)*1e3,o=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:i,stampPerformanceTime:a}}class Oa{doc=bn();bank=cn();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Ii(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Pi(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=i}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=_i(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=_t(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.morphSeconds){const i=_t(this.bank,e,this.doc,t);return i.applied?(this.retireSparkle(),this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=i.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=Zi(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Ji(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),i=this.liveSwing;return this.followSwing=t,t===i?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const qa=1400;function Fe(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Da(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class Ha{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},qa))}}const Fa=50;function Ua(n,e,t,i=Fa){if(t)return 0;const a=n-e;return a>=i?0:i-a}class Ga{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=Gs({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Qt(n,e){const t=new AudioContext(e);let i="loading";const a=(async()=>{t.state==="running"&&await t.suspend();for(const r of n)await t.audioWorklet.addModule(r)})().then(()=>{i="loaded"},r=>{throw i="failed",r});return a.catch(()=>{}),{context:t,ready:a,get status(){return i},async start(){return i==="loaded"&&V(t),await a,t.state!=="running"&&await t.resume(),t.state}}}function V(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const Ka=5e3;function Wa(){return typeof navigator<"u"&&"userAgentData"in navigator}function Va(n,e,t,i={}){const a=i.restartsOnWorkletReady??Wa(),r=i.preloadTimeoutMs??Ka;let o=null,l=!1,d=null,c=null;async function u(){const g=new AudioContext(e);V(g);try{for(const h of n)await g.audioWorklet.addModule(h);return g}catch(h){throw g.close().catch(()=>{}),h}}function p(g,h=!1){l=!0,o=null,g.context.close().catch(()=>{}),h?t?.(new Error(`audio preload still loading after ${r} ms`)):g.ready.catch(f=>t?.(f))}async function b(g){const{context:h}=g;t?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),V(h);const f=(async()=>{for(const k of n)await h.audioWorklet.addModule(k)})();try{return await Promise.race([g.ready.then(()=>{},()=>f),f]),h}catch(k){throw l=!0,o===g&&(o=null),h.close().catch(()=>{}),k}}function y(g){let h;const f=new Promise(k=>{h=setTimeout(()=>k("timeout"),r)});return Promise.race([g.ready.then(()=>"ready"),f]).finally(()=>clearTimeout(h))}async function w(){if(!l){o??=Qt(n,e);const g=o;if(g.status==="failed")p(g);else{const h=g.status==="loaded"||!a;if(h&&V(g.context),g.status==="loading"){let f;try{f=await y(g)}catch{return p(g),u()}if(f==="timeout")return a?(p(g,!0),u()):b(g)}return g.context.state==="closed"?(o===g&&(o=null),w()):(h||V(g.context),g.context)}}return u()}return{preload(){o||d||c||l||(o=Qt(n,e))},load(){return d&&d.state!=="closed"?(V(d),Promise.resolve(d)):c?(o&&(o.status==="loaded"||!a)&&V(o.context),c):(c=w().then(g=>(d=g,o=null,g)).finally(()=>{c=null}),c)}}}const Ya="/rhythm/assets/processor-CdoUgoWY.js",Hn=new URLSearchParams(location.search),B=Hn.has("measure"),Ja="petra-rhythm.linkslots",Xa=bs(Ja),Qa=!(B&&Hn.get("clockStepFix")==="0");let Xe=0;const Za=.05;B&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const ee=[40,240],m=new Oa,ve=B?null:Ia(localStorage,location.search);ve&&(m.doc=ve.doc,m.bank=ve.bank,m.selectTrack(ve.selectedTrack));const pt=B?null:_a(localStorage,()=>({doc:m.doc,bank:m.bank,selectedTrack:m.selectedTrack}));if(B){for(const e of m.doc.tracks)e.solo=e.voice==="kick";const n=m.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Za)}const _=new yi({bpm:m.doc.bpm,minBpm:ee[0],maxBpm:ee[1],timebase:"shared"}),mt=document.querySelector("#app");if(!(mt instanceof HTMLElement))throw new Error("Missing #app");const er=Ra(mt),de=new Ga(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let v=null;B&&(window.__audioInfo=()=>v?{sampleRate:v.sampleRate,outputLatency:v.outputLatency,baseLatency:v.baseLatency,state:v.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>Xn(),window.__clockStep=n=>{Xe=n},window.__debug=()=>({audio:v?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:v?.getOutputTimestamp?.()??null,currentTime:v?.currentTime??null,reanchors:Q?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let q=null,Q=null,Le=0,Fn=0;function tr(){return v?v.state==="running"?"running":v.state==="suspended"?"suspended":v.state==="interrupted"?"interrupted":"none":"needs-gesture"}const C=new Ni({app:ht,version:"0.1.0",clock:_,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:ee},audio:tr,outputLatencyMs:()=>Q?.outputLatencyMs??null,swing:()=>m.liveSwing});let xe="",Un=0,Gn=!1,Zt=Number.NEGATIVE_INFINITY,re=null;const P=new ot;function z(n=R()){return _.transport.isPlayingAt(n)}function fe(n){if(!C.isLeader)return;const e=Ua(performance.now(),Zt,n);if(e>0){re===null&&(re=setTimeout(()=>{re=null,fe(!0)},e));return}re!==null&&(clearTimeout(re),re=null),C.publishState()&&(Zt=performance.now())}function en(){return Gn?Xi(m.doc).tracks:m.doc.tracks}function ge(){if(!Q)return null;const n=Math.round(Q.offset*1e4)/1e4;return{offset:n,shifted:gi(_.toSnapshot(),n,"audio")}}const ft=new ps(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Qe(n=!1){const e=ge();e&&ft.set(e,n)}function Kn(n,e,t,i){return{clock:n,measure:B,swing:m.followSwing??e.swing,fx:{...e.fx},...i===void 0?{}:{glideSeconds:i},tracks:t.map(a=>({id:a.id,voice:a.voice,length:a.length,mute:a.mute,solo:a.solo,steps:a.steps})),params:e.tracks.map(a=>({voice:a.voice,params:{...a.params}}))}}let Y=null;function L(n="state"){const e=n==="state"?ge():ft.current??ge();if(!q||!e)return;or(),n!=="state"&&(xe="");const{offset:t,shifted:i}=e,a=Y;a!==null&&(Y=null,xe="");const r=m.consumeGlide(),o=JSON.stringify({seen:P.lastTaken,offset:t,anchor:i.anchor,start:i.startTime,stop:i.stopTime,tempo:i.tempo,swing:m.liveSwing,glide:r??null,tracks:en(),fx:m.doc.fx});if(o===xe)return;xe=o;const l={...Kn(i,m.doc,en(),r),seen:P.lastTaken,...a===null?{}:{enterBeat:a}};Un=t,q.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:i.anchor.time,start:i.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const gt=Va([Ya],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function bt(){const n=gt.load();if(v)return;const e=await n;if(v){e!==v&&e.close().catch(()=>{});return}if(v=e,B){const i=v,a=i.getOutputTimestamp.bind(i);i.getOutputTimestamp=()=>{const r=a(),o=!Xe||!r.contextTime?r:{contextTime:r.contextTime+Xe/1e3,performanceTime:r.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),o.contextTime??0,o.performanceTime??0]),o}}v.addEventListener("statechange",()=>{x(),ie()}),Q=new Ai(v,Qa?{}:{stepThresholdMs:0}),Q.onStep(i=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:i.stepSeconds*1e3,confirmedAt:i.confirmedAt,reanchors:i.reanchors,revert:i.revert===!0}),Qe(!0)}),Q.start(),q=new AudioWorkletNode(v,"rhythm"),q.port.onmessage=i=>{if(i.data.switched!==void 0&&lr(i.data.switched),i.data.level!==void 0&&i.data.step!==void 0&&(Fn=i.data.level,Le!==i.data.step&&(Le=i.data.step,x())),!(!B||!v)){for(const a of i.data.onsets??[])window.__kicks?.push({step:a.step,beat:a.beat,shared:a.contextTime-Un});for(const a of i.data.onsets??[]){const r=Xt(v,a.contextTime);r&&window.__onsets?.push({app:ht,beat:a.beat,contextTime:a.contextTime,hidden:document.hidden,stampAgeMs:(v.currentTime-a.contextTime)*1e3,...r})}for(const a of i.data.render??[]){const r=Xt(v,a.contextTime);r&&window.__render?.push({contextTime:a.contextTime,peak:a.peak,playedMs:r.playedMs})}}},q.connect(v.destination);let t=!1;ft.subscribe(()=>L(t?"clock":"attach")),_.subscribe(i=>Qe(i.kind==="snapshot"&&i.replay===!0)),t=!0}const Z=new hs;let yt=!1,Te=null,le=null;function Pe(){return!v||v.state!=="running"}function nr(){return le=Z.mode(Pe(),z()),le}function Wn(){return Te??=(async()=>{try{Y=Number.POSITIVE_INFINITY,v&&L(),await bt(),v&&v.state!=="running"&&await v.resume();const n=_.transport;Y=Z.enter(n.beatAt(R()),n.bpm),Ze&&(Ze=!1,Y=Math.floor(n.beatAt(R())/4)*4);const e=Y;yt=!0,kt(),L(),B&&(window.__join={...Z.toJSON(),tapBeat:Vn,sentBeat:e})}catch(n){throw Z.cancel(),Y=Number.NEGATIVE_INFINITY,L(),n}})().finally(()=>{Te=null,x(),ie()}),Te}let Vn=Number.NaN,Ze=!1;function Yn(n){const e=n instanceof KeyboardEvent&&n.repeat;Z.gesture(Pe(),z(),e)&&(Vn=_.transport.beatAt(R()),Wn().catch(Jn))}document.addEventListener("pointerdown",Yn,{capture:!0});document.addEventListener("keydown",Yn,{capture:!0});document.addEventListener("pointerup",()=>{Z.pending&&v&&v.state!=="running"&&v.resume()},{capture:!0});function Jn(n){console.warn("[rhythm] audio couldn't start",n),G.say("Audio couldn't start. Press Play to try again."),x()}function wt(){ir().catch(Jn)}async function ir(){if(Z.swallowClick(Pe(),z())){await Wn();return}await Xn()}let pe=null;function ie(){if(pe!==null&&(clearTimeout(pe),pe=null),!Pe())return;Se(!0,z())!==le&&x();const n=R(),{startTime:e,stopTime:t}=_.transport,i=[e,t].filter(r=>r!==null&&r>n);if(i.length===0)return;const a=Math.min((Math.min(...i)-n)*1e3+1,2**31-1);pe=setTimeout(()=>{pe=null,ie()},a)}const sr=1500;function ar(n){let e,t;const i=new Promise(o=>{e=setTimeout(()=>o(!1),sr)}),a=new Promise(o=>{t=()=>{n.state==="running"&&o(!0)},n.addEventListener("statechange",t)}),r=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([r,a,i]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Ue=!1;function rr(){v?v.state!=="running"&&v.resume().catch(()=>{}):gt.load().catch(()=>{})}async function Xn(){if(Ue){rr();return}Ue=!0;try{if(await bt(),!v)return;if(v.state!=="running"&&!await ar(v)&&!z()){G.say("Tap Play to start audio"),x();return}}finally{Ue=!1}if(z()){_.stop({at:R()});return}_.play({at:R()}),!C.isLeader&&[...C.peers.values()].some(n=>n.leader)&&(yt=!0,kt(),x())}const G=new Ha(()=>x());function te(){return yt&&!C.isLeader}function kt(){!te()||!m.adoptSwing(C.swing)||(L(),x())}function Qn(n,e,t){const i=m.peek(n),a=ge();if(!i||!q||!a)return!1;const r=_.transport.beatAt(R()),o=P.recall(n,r,{glide:e},t===void 0?{}:{atBeat:t});return ni(o,i,a.shifted),!0}let Zn="";function ei(n){return te()?m.followSwing??n.swing:n.swing}function ti(n,e){return JSON.stringify([n,ei(e),e.fx,e.tracks])}function ni(n,e,t){if(!q)return;Zn=ti(n.id,e);const i={...Kn(t,e,e.tracks,n.payload.glide),swing:ei(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};q.port.postMessage({type:"state",state:i})}function or(){const n=P.pending;if(!n||!q)return;const e=m.peek(n.slot);if(!e){P.cancel();return}if(ti(n.id,e)===Zn)return;const t=ge();t&&ni(n,e,t.shifted)}function $t(n,e){const t=m.liveSwing;return m.recall(n,e)?(te()||(m.followSwing=null),m.liveSwing!==t&&fe(!0),!0):!1}function lr(n){const e=P.takeHeld(n);e&&($t(e.slot,e.payload.glide),m.consumeGlide(),L(),x())}function ii(n){if(P.cancel(),!$t(n,m.morphSeconds))return;const e=m.morphSeconds>0?m.morphSeconds:0;C.sendSnapshot("recall",n,{atBeat:_.transport.beatAt(R()),...e>0?{glide:{seconds:e}}:{}})}function cr(n){if(P.tap(n,z()).kind==="queue"){const t=m.morphSeconds>0?m.morphSeconds:0;if(Qn(n,t,kn(_.transport.beatAt(R())))){const i=P.pending?.atBeat;C.sendSnapshot("recall",n,{...i===void 0?{}:{atBeat:i},...t>0?{glide:{seconds:t}}:{}});return}}ii(n)}function ce(n,e){const t=ln[n]??"";if(e==="store")m.store(n),G.say(Fe(e,t,!0));else if(e==="clear"){const i=m.bank.slots[n]!=null;if(P.queued===n){const a=P.drop();P.cancel();const r=m.bank.active;a&&r!=null&&C.sendSnapshot("recall",r,{atBeat:a.atBeat})}m.clear(n),G.say(Fe(e,t,i)),i&&de.show(be,`Slot ${t} cleared`)}else m.bank.slots[n]==null?G.say(Fe(e,t,!1,matchMedia("(pointer: coarse)").matches)):cr(n);L(),x()}function be(){m.undoSurprise()&&(de.dismiss(),L(),x())}function dr(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),be();return}if(n.code==="Space"){n.preventDefault(),n.repeat||wt();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=H||(n.preventDefault(),n.shiftKey?ce(i,"store"):n.altKey?ce(i,"clear"):ce(i,"recall"))}const ur=new ms({min:ee[0],max:ee[1]});function et(n){m.doc.bpm=n,_.setTempo({bpm:n}),L(),x()}function hr(){return te()?"Leader's swing · Save stores it":"Own swing · join to follow"}function si(){const n=z(),e=nr(),t=te();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:G.text,controls:[{type:"button",id:"play",label:wn(e),on:e==="stop",...e==="join"?{ariaLabel:yn}:{},onPress:()=>wt(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{m.surprise(),L(),x(),de.show(be)}},{type:"slider",id:"bpm",label:"Tempo",min:ee[0],max:ee[1],step:1,value:_.transport.bpm,onChange:et,onTap:i=>{const a=ur.tap(i);a!==null&&a!==_.transport.bpm&&et(a)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:m.liveSwing,valueText:es(m.liveSwing),disabled:t,modulated:t&&m.followSwing!=null,onChange:i=>{te()||Te||(m.setSwing(i),fe(!1),L(),x())},onCommit:()=>{fe(!0)}},...C.isLeader?[]:[{type:"note",id:"swing-note",text:hr()}],...C.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:C.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:m.morphSeconds,morphText:Da(m.morphSeconds),slots:ln.map((i,a)=>({label:i,filled:m.bank.slots[a]!=null,active:m.bank.active===a,edited:m.edited===a,queued:P.queued===a,pulse:P.queued===a&&n&&Le%4<2})),onMorph:i=>{m.morphSeconds=i,x()},onSlot:(i,a)=>{ce(i,a)}}]}}function tt(){const n=m.doc.tracks.length;return n===0?0:Math.min(m.selectedTrack,n-1)}function ai(){const n=m.doc.tracks[tt()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${m.doc.tracks.length} tracks · ${n.name}`:`${m.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:le==="stop",label:wn(le??"play"),...le==="join"?{ariaLabel:yn}:{},onToggle:()=>wt()},id:"grid",playhead:z()?Le:-1,selectedRow:n?.id,onSelectRow:e=>{m.selectTrack(e),x()},onDice:e=>{const t=m.doc.tracks[e]?.name??"Lane";m.diceLane(e)&&(L(),x(),de.show(be,`New ${t} steps`))},onFill:e=>{Gn=e,L(),x()},onLength:(e,t)=>{m.edit(i=>{const a=i.tracks[e];a&&(a.length=Math.max(1,Math.min(a.steps.length,Math.round(t))))}),L(),x()},onMute:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),L(),x()},onSolo:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),L(),x()},onToggle:(e,t,i)=>{m.edit(a=>{const r=a.tracks[e]?.steps[t];r&&(i?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),L(),x()},onLongPress:(e,t,i)=>{const a=m.doc.tracks[e],r=a?.steps[t];!a||!r||Ks({anchor:i,title:`${a.name} · step ${t+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{m.edit(d=>{const c=d.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),L(),x()}})},onSet:(e,t,i,a)=>{m.edit(r=>{const o=r.tracks[e]?.steps[t];o&&(i==="accent"?(o.accent=a,a&&(o.on=!0)):(o.on=a,a||(o.accent=!1)))}),L(),x()},rows:m.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]},pr()]}}function pr(){const n=tt(),e=m.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(i=>({type:"slider",id:i,label:ns(i),valueText:ts(i,e?.params[i]??0),min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{m.edit(r=>{const o=r.tracks[tt()];o&&(o.params[i]=a)}),L(),x()}}))}}function vt(){return{id:"filter",title:"Filter",summary:m.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:m.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{m.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),L(),x()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:m.doc.fx.cutoff,valueText:st(m.doc.fx.cutoff),onChange:n=>{m.edit(e=>{e.fx.cutoff=n}),L(),x()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:m.doc.fx.mode,cutoff:m.doc.fx.cutoff,resonance:m.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Fn}]}}await On();const ri=dt(si());await ut();const xt=dt({id:"pattern",title:"Pattern",lead:!0}),St=dt({id:"filter",title:vt().title}),oi={build:()=>xt.update(ai())},li={build:()=>St.update(vt())};let Ae=null;function x(){m.takeSurpriseEdit()&&de.dismiss(),ri.update(si()),Ae?.ready(oi)&&xt.update(ai()),Ae?.ready(li)&&St.update(vt()),pt?.schedule()}window.addEventListener("pagehide",()=>pt?.flush());function tn(n,e,t){P.cancel(),m.replace(n,e),L(),x(),pt?.schedule(),de.show(be,t)}Ba(er,{save:()=>{const n=m.doc.name||"rhythm",e=URL.createObjectURL(new Blob([is(m.doc,m.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),G.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=ss(n);if(!t.ok||!t.document||!t.bank){G.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}tn(t.document,t.bank,`Loaded ${e}`)},create:()=>tn(cs(),cn(),"New pattern"),panic:()=>q?.port.postMessage({type:"panic"})});_.onChange(()=>{if(m.playing=z(),!m.playing&&P.pending){const n=P.drop();n&&ii(n.slot)}m.doc.bpm=_.transport.bpm,L(),x(),ie()});C.onSwing(n=>{te()&&m.adoptSwing(n)&&L(),x()});C.onSnapshot(n=>{if(n.op!=="recall")return;const e=C.peers.get(n.from)?.app;if(!ys(ht,e,Xa)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:R()});const t=n.glide?.seconds??0;if(z()&&Qn(n.slot,t,n.atBeat)){x();return}P.cancel(),$t(n.slot,t),L(),x()});C.onRole(()=>{kt(),x(),ie()});C.onPeers(()=>{x(),ie()});B&&(window.__rhythm={setKick:n=>{m.edit(e=>{const t=e.tracks.find(i=>i.voice==="kick");t&&t.steps.forEach((i,a)=>{i.on=n.includes(a)})}),L(),x()},store:n=>ce(n,"store"),tap:n=>ce(n,"recall"),tempo:n=>et(n),beat:()=>_.transport.beatAt(R()),timeAt:n=>_.transport.timeAt(n),slots:()=>({active:m.bank.active??null,queued:P.queued}),swing:()=>{const n=m.bank.active;return{live:m.liveSwing,doc:m.doc.swing,slot:n==null?null:m.bank.slots[n]?.swing??null,leader:C.isLeader}},setSwing:n=>{m.setSwing(n),fe(!0),L(),x()},lateEnter:()=>{Ze=!0},audio:async()=>(await bt(),await v?.resume(),v?.state??"none")});await ut();await C.start();document.addEventListener("keydown",dr);Ta(mt,[ri,xt,St],"adjacent");await ut();x();Ae=Ma([oi,li]);ie();Ae.done.then(()=>{gt.preload(),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=z();if(n!==m.playing&&(m.playing=n,x()),Qe(),L(),!B||!v)return;const e=za(v);e&&window.__stamps?.push(e)},250);
