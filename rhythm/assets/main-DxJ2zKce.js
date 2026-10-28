(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const Q=1e-9;function kn(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class De{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return kn(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,c)=>r.beat-c.beat);let a=i.length?i[0].bpm:this.bpm;for(const r of i)r.beat<=e.beat+Q&&(a=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const r of i){if(r.beat<=e.beat+Q)continue;const c=this.clamp(r.bpm);c!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+Q){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-Q;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const o=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(i/a));this.setTempoAt(o,t);for(let c=1;c<=r;c++)this.setTempoAt(o+(e-o)*c/r,t+i*(c-1)/r)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new De({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+Q)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+Q)return t[i];return t[0]}}const $n=Object.freeze({beatsPerBar:4,beatUnit:4}),ee=1e-9;function vn(n){return Math.floor(n+ee)}function $t(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-ee)*e;return t&&a<=n+ee?a+e:a}class xn{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new De({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??$n}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-ee&&(this.stopTime===null||e<this.stopTime-ee)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-ee?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=vn(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return $t(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const vt="nc-clock/snapshot",xt=1;function Sn(n,e="local"){return{format:vt,version:xt,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function Tn(n,e){const t=Mn(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function En(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const O=n=>typeof n=="number"&&Number.isFinite(n),Ze=n=>n===null||O(n);function Mn(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==vt&&t("format"),(!O(e.version)||Math.floor(e.version)!==xt)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!O(e.anchor.beat)||!O(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&O(i.beat)&&O(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!O(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!O(e.meter.beatUnit))&&t("meter"),(!Ze(e.startTime)||!Ze(e.stopTime)||!O(e.stoppedBeat))&&t("transport times"),e}class Ln{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new xn(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Tn(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Sn(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const An="nc-sync/1",Nn=1,Cn="nc-sync",Pn="nc-sync-leader",_n=0,St=.5,Tt=.75;function In(n){return typeof n=="number"&&Number.isFinite(n)&&n>=St&&n<=Tt?n:null}const Se=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ie=n=>typeof n=="number"&&Number.isFinite(n),re=n=>typeof n=="string"&&n.length>0;function Rn(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Nn||!re(e.type)||!re(e.from)||!ie(e.term)||!ie(e.seq)||!ie(e.sentAt))return null;switch(e.type){case"hello":return re(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return ie(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&ie(e.slot)?e:null;case"ping":case"pong":return re(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function zn(n,e,t,i,a){return{proto:An,from:e,term:t,seq:i,sentAt:a,...n}}function D(){return(performance.timeOrigin+performance.now())/1e3}function et(n){const e=n.slice().sort((i,a)=>i-a),t=e.length>>1;return e.length%2?e[t]:(e[t-1]+e[t])/2}const le=.003,jn=3,On=500;class Bn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets=[],this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};waitSince=null;readyStamp=void 0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10)}get reanchors(){return this.stepCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=le&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,o=a-et(this.offsets);if(Math.abs(o)<=this.stepThreshold)return this.clearPending(),!1;if(this.pendingStep!==null&&Math.abs(o-this.pendingStep)<this.stepThreshold/2){if(t===this.pendingStamp)return this.followUp(),!1;if(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations)return this.followUp(),!1;this.offsets=[a],this.clearPending(),this.stepCount++;const r={stepSeconds:o,confirmedAt:this.ctx.currentTime,reanchors:this.stepCount};for(const c of[...this.stepListeners])c(r);return!0}return this.pendingStep=o,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1)}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=le&&i.performanceTime>0)t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,this.waitSince=null;else if(!i||!(i.contextTime>=le)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<On)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(jn,this.keep)}sampleIfNotReady(){if(this.ready)return!0;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=!!e&&e.contextTime>=le&&e.performanceTime>0;return(!t||e.contextTime!==this.readyStamp)&&(this.readyStamp=t?e.contextTime:void 0,this.sample()),this.ready}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?et(this.offsets):this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.ctx.addEventListener?.("statechange",this.onSink))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onSink)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class qn{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Se,...e.capabilities},this.channelOption=e.channel??Cn,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,o]=this.tempoRange();e=Math.min(o,Math.max(a,e));const r=this.clock.transport,c=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const u=r.beatAt(c+this.o.minLeadSeconds),l=Math.max(t??$t(u,1),u);i&&i>0?(r.tempo.rampTempo(e,l,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,l),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Tt,Math.max(St,e)):_n;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=In(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=Rn(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Se,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Se},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Pn,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,c)=>[o?0:1,r,c];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(a===null||r[0]<i[0]||r[0]===i[0]&&(r[1]<i[1]||r[1]===i[1]&&r[2]<i[2]))&&(i=r,a=o.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(zn(e,this.id,this.term,++this.seq,this.o.now()))}}const Dn=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],fe=10,Et=["1","2","3","4","5","6","7","8","9","0"];function Hn(){return{slots:Array.from({length:fe},()=>null),active:null}}function He(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function Fn(n,e,t){const i=n.slots.slice();return i[e]=He(t),{slots:i,active:e}}function Un(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function tt(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function Gn(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=He(e),{slots:t,active:n.active}}const Kn=16,Vn=[2,6,10,14],Wn=[2,3,6,10,11,14],nt=[0,2,4,6,8,10,12,14],Yn=[2,6,10,14],Xn=[1,3,7,9,11,15],Jn={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function F(){return Array.from({length:Kn},()=>!1)}function B(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function Te(n,e,t){return B(n,Math.max(0,e-t),Math.min(1,e+t))}function Qn(n){const e=F();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Zn(n){const e=F();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Vn.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function ei(n,e){const t=F();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function ti(n,e){const t=F();let i=0;for(const a of Wn)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function ni(n){const e=F();let t=0;for(const i of Yn){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function ii(n,e){const t=F();for(const r of nt)t[r]=!n[r];const i=nt.filter(r=>t[r]&&r!==0),a=1+Math.floor(e()*3);for(let r=0;r<a&&i.length>0;r+=1){const c=Math.floor(e()*i.length),u=i.splice(c,1)[0];u!==void 0&&(t[u]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function si(n,e){const t=F(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const o of i){if(a>=3)break;e()<.45&&(t[o]=!0,a+=1)}return t}function ai(n,e,t){const i=F();let a=0;for(const o of Xn)a>=2||n[o]||e[o]||t()<.35&&(i[o]=!0,a+=1);return i}function Mt(n,e,t){return Array.from({length:e},(i,a)=>{const o=n[a]===!0,r=o&&t(a);return{on:o,accent:r,velocity:r?1:.8}})}function Lt(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function oi(n,e,t){const i=Jn[n];return{tune:B(t,i.tune[0],i.tune[1],!0),decay:B(t,i.decay[0],i.decay[1]),tone:Te(t,e.tone,.15),snap:Te(t,e.snap,.15),drive:Te(t,e.drive,.1),level:B(t,i.level[0],i.level[1])}}function At(n){const e=Qn(n),t=Zn(n),i=ni(n);return{kick:e,snare:t,clap:ei(t,n),rim:ti(e,n),hat:ii(i,n),hatOpen:i,tom:si(t,n),metal:ai(e,t,n)}}function ri(n,e,t){const i=n.tracks[e];if(!i)return n;const a=c=>c.every((u,l)=>u.on===(i.steps[l]?.on??!1));let o=i.steps;for(let c=0;c<6;c++){const u=At(t)[i.voice];if(o=Mt(u,i.length,l=>Lt(i.voice,l)),!a(o)&&o.some(l=>l.on))break}const r=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((c,u)=>u===e?{...c,steps:[...o,...r]}:c)}}function li(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,o)=>{if(o<t||o>=e.length)return a;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function ci(n,e){const t=At(e),i=e()<.4?.5:B(e,.5,.62),a=e(),o=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:o,cutoff:B(e,.55,.9),resonance:B(e,.05,.3),drive:B(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:oi(r.voice,r.params,e),steps:Mt(t[r.voice],r.length,c=>Lt(r.voice,c))}))}}function di(n,e=Math.random){const t=[];let i=null;for(let o=0;o<fe;o+=1){const r=He(ci(n,e));t.push(r),o===0&&(i=r)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}const Nt="netcomposer.rhythm",Ct=1,Pt="netcomposer.rhythm.preset.",ui=new Set(Dn);function pi(n){return`${Pt}${n}`}function _t(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==Nt&&e.push("Unknown format"),t.version!==Ct&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(Pt))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)ui.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function hi(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const mi={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function fi(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:Nt,version:Ct,id:pi("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:hi(e.on,e.accent),params:{...mi[e.voice]}}))}}class Fe{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,i,a={}){const o=a.id??this.seq+1;this.seq=Math.max(this.seq,o);const r=a.atBeat??It(t,a.beatsPerBar);return this.held={id:o,slot:e,atBeat:r,payload:i},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new Fe;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function It(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class gi{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:a=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>i||e<=o)return this.taps=[e],null;const r=e-o,c=this.meanInterval();c!==null&&Math.abs(r-c)>c*a&&(this.taps=[o]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const bi="nc-ui",yi={breakpoint:{md:"768px"}},Rt={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},G={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},ce=n=>`--${bi}-${n}`,Pe=Rt["label-on-fill-dark"],it=Rt["label-on-fill-light"],wi=G["label-min-contrast"],ki=/^#[0-9a-f]{6}$/i,$i=n=>typeof n=="string"&&ki.test(n),Ee=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function st(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=o=>{const r=(o+n/30)%12;return t-i*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Ee(a(0)*255)}${Ee(a(8)*255)}${Ee(a(4)*255)}`}function zt(n){const[e,t,i]=[1,3,5].map(d=>parseInt(n.slice(d,d+2),16)/255),a=Math.max(e,t,i),o=Math.min(e,t,i),r=(a+o)/2,c=a-o;if(!c)return{h:0,s:0,l:r};const u=c/(1-Math.abs(2*r-1));return{h:((a===e?60*((t-i)/c%6):a===t?60*((i-e)/c+2):60*((e-t)/c+4))+360)%360,s:u,l:r}}function at(n){const[e,t,i]=[1,3,5].map(a=>{const o=parseInt(n.slice(a,a+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function _e(n,e){const[t,i]=[at(n),at(e)].sort((a,o)=>o-a);return(t+.05)/(i+.05)}const he=n=>_e(n,Pe)>=_e(n,it)?Pe:it;function jt(n,e,t,i=wi){let a=st(n,e,t);const o=he(a)===Pe?1:-1;for(let r=0;r<40&&_e(a,he(a))<i;r++)t+=o*.01,a=st(n,e,t);return a}function vi(n){const{h:e,s:t}=zt(n),i=jt(e,Math.min(t,G["surprise-on-max-saturation"]),G["surprise-on-lightness"]);return{fill:n,ink:he(n),on:i,onInk:he(i)}}const xi=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function Si(n,e=Math.random){const[t,i]=G["surprise-saturation"],[a,o]=G["surprise-lightness"],r=G["surprise-min-hue-gap"],c=$i(n)?zt(n).h:null;let u=e()*360;return c!==null&&xi(u,c)<r&&(u=(c+r+e()*(360-2*r))%360),jt(u,t+e()*(i-t),a+e()*(o-a))}function Ti(n){if(!n)return null;const e=vi(n);return{[ce("surprise-fill")]:e.fill,[ce("surprise-ink")]:e.ink,[ce("surprise-on")]:e.on,[ce("surprise-on-ink")]:e.onInk}}const Ei=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Mi={renames:Ei},Li={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},Ai={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},Ni={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},ge={};for(const[n,e]of Object.entries(Li))ge[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(Ni))ge[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Ai))ge[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(Mi.renames.map(n=>[n.old,n.new]));function Ot(n){const e=ge[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function q(n){return Ot(n).prop}function s(n){return`var(${q(n)})`}function Ci(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(q(e)));return Number.isFinite(t)?t:0}function z(n,e){const t=Ot(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=o:t.kind==="opacity"?a.style.opacity=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=o:a.style.color=o,(n instanceof Element?n:i.documentElement).append(a);const u=(i.defaultView??window).getComputedStyle(a),l=t.kind==="family"?u.fontFamily:t.kind==="color"?u.color:t.kind==="opacity"?u.opacity:u.paddingLeft;return a.remove(),l}function Pi(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function _i(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const Ii="[data-modulated], [data-modulated] *";function Ri(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-fx[data-nc-depth="${i}"] {
      background: ${s(`module-bg-stack-${i}`)};
      ${q("text-sub")}: ${s(`module-sub-stack-${i}`)};
      ${q("divider")}: ${s(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${s(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${q("text-sub")}: ${s("module-sub-stack-1")};
      ${q("divider")}: ${s("module-div-stack-1")};
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
${Ii} { transition: none; }
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
/* Active (Bass): the accent green outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${s("accent")};
  color: ${s("accent")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Queued for the end of the bar (Bass): a faint green underline and outline that go full green on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${s("accent")};
  outline: ${s("focus-width")} solid color-mix(in srgb, ${s("accent")} 35%, transparent);
  outline-offset: ${s("hairline")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 color-mix(in srgb, ${s("accent")} 35%, transparent);
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${s("accent")};
  background: color-mix(in srgb, ${s("accent")} 10%, transparent);
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
/* A small gap every 4 steps, so beats read at a glance (one beat = one pad row on phones). */
.nc-steps > .nc-step-wrap:nth-child(4n + 1):not(:first-child) { margin-inline-start: ${s("rhythm.control-gap")}; }
/* The selected lane is lit, not just underlined: a tinted row with an accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${s("module-bg-adjacent-4")};
  box-shadow: inset calc(${s("focus-width")} * 2) 0 0 ${s("accent")};
}
.nc-row[data-selected="true"] .nc-name {
  color: ${s("text")};
  text-decoration: underline;
  text-decoration-color: ${s("accent")};
  text-decoration-thickness: ${s("hairline")};
  text-underline-offset: ${s("rhythm.control-gap")};
}
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
.nc-row-dice { flex: none; margin-inline: ${s("rhythm.control-gap")} 0; }
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
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("rhythm.control-gap")};
  min-width: 0;
}
.nc-choice {
  flex: 1 1 auto;
  min-width: 0;
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
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
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
    outline-color: color-mix(in srgb, ${s("accent")} 35%, transparent);
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 color-mix(in srgb, ${s("accent")} 35%, transparent);
  }
}
`}let Me=null;function Bt(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Me&&Me.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=Ri(),n.head.append(e),Me=e}const qt={slop:8,longPressMs:500,pitchPx:16};class zi{constructor(e,t,i=qt){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const o=this.hit(t,i);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const o=t-this.x0,r=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const c=Math.trunc(-r/this.config.pitchPx);c!==this.degrees&&(this.degrees=c,this.emit({kind:"pitch",pad:this.pad,degrees:c,phase:"move"}))}else if(this.phase==="paint"){const c=this.hit(t,i);c>=0&&c!==this.lastPad&&(this.lastPad=c,this.emit({kind:"paint",pad:c,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function ji(n,e,t,i=qt){let a=!1,o=0;const r=(l,d)=>{const b=n.ownerDocument.elementFromPoint?.(l,d),f=[...n.querySelectorAll(e)],y=b?f.findIndex(g=>g===b||g.contains(b)):-1;if(y>=0)return y;let w=-1,p=Number.POSITIVE_INFINITY;return f.forEach((g,k)=>{if(g.hidden)return;const v=g.getBoundingClientRect();if(d<v.top||d>v.bottom)return;const x=Math.abs(l-(v.left+v.width/2));x<p&&x<=v.width&&(w=k,p=x)}),w},c=new zi(r,l=>{(l.kind==="paint"||l.kind==="long")&&(a=!0),t(l)},i),u=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",l=>{l.button>0||(a=!1,c.down(l.pointerId,l.clientX,l.clientY,l.timeStamp)&&(u(),o=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",l=>{c.state!=="idle"&&(c.move(l.pointerId,l.clientX,l.clientY,l.timeStamp),c.state!=="pending"&&u())}),n.addEventListener("pointerup",l=>{u(),c.up(l.pointerId,l.clientX,l.clientY,l.timeStamp)}),n.addEventListener("pointercancel",l=>{u(),c.cancel(l.pointerId)}),n.addEventListener("click",l=>{a&&(a=!1,l.stopPropagation(),l.preventDefault())},!0),n.addEventListener("contextmenu",l=>l.preventDefault()),c}const Oi=G["toast-duration"];function Bi({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function qi(n,e,t,i){const a=c=>({top:c,bottom:c+t}),o=c=>n.some(u=>u&&u.bottom>c.top&&u.top<c.bottom),r=a(e-i-t);return o(r)?o(a(i))?"bottom":"top":"bottom"}function Dt(n,e,t,i,a,o){let r=n.bottom+a;const c=Math.max(o,Math.min(n.left,i-o-t.width));for(let u=!0,l=0;u&&l<8;l++){u=!1;for(const d of e)d&&d.bottom>r&&d.top<r+t.height&&d.right>c&&d.left<c+t.width&&(r=d.bottom+a,u=!0)}return{top:r,left:c}}const ot="data-nc-ui-toast-live";function Di(n,e){let t=e.querySelector(`[${ot}]`);return t||(t=n.createElement("div"),t.setAttribute(ot,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Hi({message:n,actionLabel:e,onAction:t,duration:i=Oi,onClose:a,avoid:o=[],anchor:r,host:c,document:u=globalThis.document}={}){c=c??u.body;const l=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");const h=u.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,d.appendChild(h);let b=null;e&&(b=u.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,d.appendChild(b)),c.appendChild(d);let f="open";const y=R=>R&&typeof R.getBoundingClientRect=="function"?R.getBoundingClientRect():null,w=y(d),p=w?.height||44,g=l.getComputedStyle?.(d),k=Number.parseFloat(g?.getPropertyValue(q("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(q("toast-anchor-gap")))||8,x=y(r),$=l.innerHeight??0,E=o.map(y).filter(Boolean),M=x&&x.bottom>0&&x.top<$?Dt(x,E,{width:w?.width||0,height:p},l.innerWidth??0,v,k):null;M&&M.top+p<=$?(d.setAttribute("data-placement","anchor"),d.style.top=`${M.top+(l.scrollY??0)}px`,d.style.left=`${M.left+(l.scrollX??0)}px`):d.setAttribute("data-placement",qi(E,$,p,k));const L=l.requestAnimationFrame?.bind(l)??(R=>setTimeout(R,16));L(()=>L(()=>{f==="open"&&d.setAttribute("data-state","open")})),Di(u,c).textContent=Bi({message:n,actionLabel:e});let C,J;const ne=new Promise(R=>{J=R}),oe=R=>{clearTimeout(C),C=setTimeout(()=>xe("timeout"),R)};let ve=i,Ve=Date.now();const We=()=>{f==="open"&&(clearTimeout(C),ve=Math.max(0,ve-(Date.now()-Ve)))},Ye=()=>{f==="open"&&(Ve=Date.now(),oe(ve))};d.addEventListener("pointerenter",We),d.addEventListener("pointerleave",Ye),d.addEventListener("focusin",We),d.addEventListener("focusout",Ye),b?.addEventListener("click",()=>{if(f==="open")try{t?.()}finally{xe("action")}}),Number.isFinite(i)&&oe(i);function xe(R="close"){if(f!=="open")return;f="closing",clearTimeout(C),d.setAttribute("data-state","closing"),a?.(R);const Xe=l.getComputedStyle?.(d),wn=Xe?Math.max(0,...String(Xe.transitionDuration||"").split(",").map(Qe=>Number.parseFloat(Qe)*(Qe.trim().endsWith("ms")?1:1e3)||0)):0,Je=()=>{f!=="gone"&&(f="gone",d.remove(),J(R))};d.addEventListener("transitionend",Je),setTimeout(Je,wn+50)}return{el:d,close:xe,closed:ne}}function rt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Fi({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:o,host:r,document:c=globalThis.document}){r=r??c.body;const u=c.defaultView??globalThis,l={velocity:t,probability:i},d=c.createElement("div");d.className="nc-slot-scrim nc-step-editor-scrim";const h=c.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const b=c.createElement("div");b.className="nc-step-editor-head";const f=c.createElement("span");f.className="nc-label",f.textContent=e;const y=c.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",b.append(f,y),h.appendChild(b);const w=[];for(const[x,$]of[["velocity","Velocity"],["probability","Chance"]]){const E=c.createElement("label");E.className="nc-step-editor-row";const M=c.createElement("span");M.className="nc-label",M.textContent=$;const L=c.createElement("input");L.type="range",L.className="nc-range",L.min=x==="velocity"?"0.05":"0",L.max="1",L.step="0.05",L.value=String(l[x]),L.setAttribute("data-nc-edit",x);const C=c.createElement("output");C.className="nc-readout",C.textContent=rt(l[x]),L.setAttribute("aria-valuetext",C.textContent),L.addEventListener("input",()=>{l[x]=Number(L.value),C.textContent=rt(l[x]),L.setAttribute("aria-valuetext",C.textContent),a({velocity:l.velocity,probability:l.probability})}),E.append(M,L,C),h.appendChild(E),w.push(L)}if(r.append(d,h),n?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${yi.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),d.setAttribute("data-placement","sheet");else{const x=n?.getBoundingClientRect?.(),$=h.getBoundingClientRect(),E=Number.parseFloat(u.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(x){let{top:M,left:L}=Dt(x,[],{width:$.width,height:$.height},u.innerWidth,E,E);M+$.height>u.innerHeight&&(M=Math.max(E,x.top-E-$.height)),h.style.top=`${M}px`,h.style.left=`${L}px`}h.setAttribute("data-placement","anchor")}w[0]?.focus({preventScroll:!0});let g=!0;const k=x=>{x.key==="Escape"&&(x.preventDefault(),v())};function v(){g&&(g=!1,c.removeEventListener("keydown",k,!0),d.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return c.addEventListener("keydown",k,!0),d.addEventListener("pointerdown",x=>{x.preventDefault(),v()}),y.addEventListener("click",v),{el:h,close:v}}function Ui(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==o)&&(n.width=a,n.height=o);const r=n.getContext("2d");return r?.setTransform(i,0,0,i,0,0),{ctx:r,w:e,h:t}}function Le(n){return Math.max(0,Math.min(1,n))}function Ht(n,e){const{ctx:t,w:i,h:a}=Ui(n);if(!t)return;t.clearRect(0,0,i,a);const o=_i(n);if(e.paint==="swatch"){const u=z(n,"accent"),l=z(n,"rhythm.step-cell-on");n.dataset.ncAccent=u,n.dataset.ncStep=l,t.fillStyle=u,t.fillRect(0,0,i/2,a),t.fillStyle=l,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const u=e.mode??"lp",l=z(n,Pi(u)),d=z(n,"divider"),h=Le(e.cutoff??.5),b=.08+(1-Le(e.resonance??.2))*.22;t.strokeStyle=d,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let f=0;f<=i;f++){const y=f/Math.max(1,i);let w=0;u==="lp"?w=y<h?1:Math.max(0,1-(y-h)/b):u==="hp"?w=y>h?1:Math.max(0,1-(h-y)/b):w=Math.max(0,1-Math.abs(y-h)/b);const p=a*.78-w*a*.62;f===0?t.moveTo(f,p):t.lineTo(f,p)}t.strokeStyle=l,t.stroke(),t.fillStyle=z(n,"text-sub"),t.font=o,t.fillText(u.toUpperCase(),0,a),n.dataset.ncAccent=l;return}if(e.paint==="envelope"){t.strokeStyle=z(n,"accent"),t.beginPath();const u=Math.max(.05,e.decay??.4);for(let l=0;l<=i;l++){const d=l/Math.max(1,i),h=(a-4)*(1-Math.exp(-d*4/u));t.lineTo(l,a-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const u=Le(e.level??0);t.fillStyle=z(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=z(n,"accent"),t.fillRect(0,a*.4,i*u,a*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),c=((e.step??0)%r+r)%r;t.fillStyle=z(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=z(n,"rhythm.playhead"),t.fillRect(c/r*i,a*.3,Math.max(1,i/r),a*.4),n.dataset.ncAccent=z(n,"accent")}function I(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function be(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function lt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ie(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Gi=450,ct=8;function K(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Ki(n){const e=Ci(n,"target-min");return e>0?e:44}function Vi(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=Ki(n),a=i/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){const c=t[r],u=o[r];if(!(c instanceof HTMLElement)||!u||u.width===0||u.height===0)continue;if(u.width>=i&&u.height>=i){c.style.display="none";continue}const l=u.left+u.width/2,d=u.top+u.height/2;let h=l-a,b=l+a,f=d-a,y=d+a;for(let w=0;w<t.length;w++){if(r===w)continue;const p=o[w];if(!p||p.width===0)continue;const g=p.left+p.width/2,k=p.top+p.height/2;Math.abs(k-d)<a*2&&(g>l?b=Math.min(b,(l+g)/2):g<l&&(h=Math.max(h,(l+g)/2))),Math.abs(g-l)<a*2&&(k>d?y=Math.min(y,(d+k)/2):k<d&&(f=Math.max(f,(d+k)/2)))}h=Math.min(h,u.left),b=Math.max(b,u.right),f=Math.min(f,u.top),y=Math.max(y,u.bottom),c.style.left=`${h-u.left}px`,c.style.top=`${f-u.top}px`,c.style.width=`${Math.max(0,b-h)}px`,c.style.height=`${Math.max(0,y-f)}px`,c.style.transform="none"}}function Ft(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function dt(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ut(n,e){switch(n.type){case"slider":return Wi(n,e);case"select":return Xi(n,e);case"toggle":return Ji(n,e);case"button":return Qi(n,e);case"readout":return Zi(n);case"label":return es(n);case"note":return ut(n);case"knob":return ss(n,e);case"choice":return as(n,e);case"slotRow":return os(n,e);case"stepGrid":return ds(n,e);case"canvas":return hs(n);case"fx":return ms(n,e);default:return ut({id:"unknown",text:""})}}function X(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Gt(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=Ie(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),lt(n,e.label);else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")lt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&ns(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=Ie(e.value))}else if(e.type==="choice")Kt(n,e);else if(e.type==="slotRow")Wt(n,e);else if(e.type==="stepGrid")Re(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&Ht(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${fs(t.id)}"]`);i instanceof Element&&X(i,t)}}}function Wi(n,e){const t=be(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{const o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),n.onTap&&t.insertBefore(Yi(n,i,e),a),t.append(I()),X(t,n),t}function Yi(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(K());const a=o=>{const r=t(e);r?.type==="slider"&&r.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&a(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),a(o.timeStamp))}),i}function Xi(n,e){const t=be(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const o=document.createElement("option");o.value=a.value,o.textContent=a.label,i.append(o)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,I()),t}function Ji(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(I()),X(t,n),t}function Qi(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(I()),X(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=Ft(),a.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Yt(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),i.append(t,a),i}function Zi(n){const e=be(n.id,n.label);return e.append(I()),X(e,n),e}function es(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(I()),e}function ut(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(I()),e}function ts(n){const e=Ie(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Gt(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function ns(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;Gt(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",ts(e)),n.setAttribute("aria-label",e.label)}function is(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function ss(n,e){const t=be(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let o=0,r=0;i.addEventListener("pointerdown",u=>{o=u.clientY;const l=e(i);r=l&&"value"in l?Number(l.value):0,i.setPointerCapture?.(u.pointerId)}),i.addEventListener("pointermove",u=>{if(i.hasPointerCapture&&!i.hasPointerCapture(u.pointerId))return;const l=e(i);if(l?.type!=="knob")return;const d=l.max-l.min||1,h=Math.min(l.max,Math.max(l.min,r-(u.clientY-o)*d/120));l.onChange(h)}),i.addEventListener("keydown",u=>{const l=e(i);if(l?.type!=="knob")return;const d=is(l,u);d!==null&&(u.preventDefault(),l.onChange(Math.min(l.max,Math.max(l.min,d))))});const c=t.querySelector("[data-nc-readout]");return t.insertBefore(i,c),t.append(I()),X(t,n),t}function as(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(i.value)}),a.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],c=r.indexOf(a);let u=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(c+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(c-1+r.length)%r.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=r.length-1;else return;const l=r[u];l instanceof HTMLButtonElement&&(o.preventDefault(),l.focus(),l.click())}),t.append(a)}return t.append(I()),Kt(t,n),t}function Kt(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function os(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let d=0;d<n.slots.length;d++){const h=n.slots[d],b=document.createElement("span");b.className="nc-snap-wrap";const f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(d),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,K()),rs(b,f,t,d,e),i.append(b)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=Ft(),a.append(K()),a.addEventListener("click",()=>{Yt(t);const d=e(t);d?.type==="slotRow"&&d.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const c=document.createElement("input");c.type="range",c.className="nc-range nc-morph",c.min="0",c.max="4",c.step="0.01",c.setAttribute("aria-label","Morph time"),c.addEventListener("input",()=>{const d=e(t);d?.type==="slotRow"&&d.onMorph(Number(c.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(r,u,c);const l=document.createElement("div");return l.className="nc-slot-line",l.append(i,...a?[a]:[]),t.append(l,o,I()),Vt(t,e),Wt(t,n),t}function pt(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;se(n);const o=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,o)}function rs(n,e,t,i,a){let o=0,r=0,c=0,u=!1,l=!1,d=!1,h=!1;const b=()=>{window.clearTimeout(o),o=0},f=g=>{const k=g.clientX-r,v=g.clientY-c;k*k+v*v>ct*ct&&(u=!0,b())},y=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",p))},w=g=>{const k=o!==0&&!u&&!l;b(),y(),k&&(d=!0,pt(t,i,a,g))},p=()=>{u=!0,b(),y()};n.addEventListener("pointerdown",g=>{g.button===0&&(y(),l=!1,u=!1,d=!1,r=g.clientX,c=g.clientY,b(),o=window.setTimeout(()=>{o=0,!u&&(l=!0,ls(t,e,i,a))},Gi),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",g=>g.preventDefault()),n.addEventListener("click",g=>{if(d||l||u){d=!1,l=!1,u=!1;return}pt(t,i,a,g)})}function Vt(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=ht("Save","store"),a=ht("Clear","clear");t.append(i,a);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),se(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const c=r.target;if(!(c instanceof HTMLButtonElement))return;const u=e(n);if(u?.type!=="slotRow")return;const l=Number(t.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(u.onSlot(l,"store"),se(n)):c.dataset.ncSlotOp==="clear"&&(u.onSlot(l,"clear"),se(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&se(n)})}function ht(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function ls(n,e,t,i){Vt(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),c=e.getBoundingClientRect();a.style.left=`${c.left-r.left}px`,a.style.top=`${c.bottom-r.top}px`,a.querySelector("button")?.focus()}function se(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Wt(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const o=Number(a.dataset.ncSlot),r=e.slots[o];if(!r)continue;a.textContent=r.label,r.filled?a.dataset.filled="true":delete a.dataset.filled,r.active?a.dataset.active="true":delete a.dataset.active,r.edited?a.dataset.edited="true":delete a.dataset.edited,r.queued?a.dataset.queued="true":delete a.dataset.queued,r.queued&&r.pulse?a.dataset.pulse="true":delete a.dataset.pulse;const c=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];a.setAttribute("aria-label",[r.label,...c.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Yt(n){const e=n.dataset.ncLastFill||null,t=Si(e);n.dataset.ncLastFill=t;const i=Ti(t);if(i)for(const[a,o]of Object.entries(i))n.style.setProperty(a,o)}function cs(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=o=>{if(i===o)return;i=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),a(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>a(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||a(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),a(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function ds(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=p=>{const g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=p,i.append(g),g},o=a("Note"),r=a("Accent");r.dataset.ncAccentMode="";const c=p=>{for(const g of[o,r]){const k=g===p;g.setAttribute("aria-checked",k?"true":"false"),g.tabIndex=k?0:-1}};c(o);for(const p of[o,r])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const g=r.getAttribute("aria-checked")==="true"?o:r;c(g),g.focus()});const u=document.createElement("div");u.className="nc-step-tools",u.append(i),n.onFill&&u.append(cs(t,e)),t.append(u);for(const p of n.rows){const g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=p.label,k.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(k.dataset.ncLane=String((p.lane-1)%4+1)),k.addEventListener("click",()=>{const $=e(t);if($?.type!=="stepGrid")return;const E=$.rows.findIndex(M=>M.id===p.id);$.onSelectRow?.(E)}),k.addEventListener("keydown",$=>us(t,k,$));const v=[];for(const $ of["mute","solo"]){if(!($==="mute"?n.onMute:n.onSolo))continue;const M=document.createElement("span");M.className="nc-ms-wrap";const L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=$,L.textContent=$==="mute"?"M":"S",L.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${p.label}`),M.append(L,K()),M.addEventListener("click",()=>{const C=e(t);if(C?.type!=="stepGrid")return;const J=C.rows.findIndex(ne=>ne.id===p.id);($==="mute"?C.onMute:C.onSolo)?.(J)}),v.push(M)}const x=document.createElement("div");x.className="nc-steps";for(let $=0;$<p.steps.length;$++){const E=document.createElement("span");E.className="nc-step-wrap";const M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${p.id}:${$}`,M.setAttribute("aria-label",`${p.label} step ${$+1}`),E.append(M,K()),E.addEventListener("click",L=>{const C=e(t);if(C?.type!=="stepGrid")return;const J=C.rows.findIndex(oe=>oe.id===p.id),ne=r.getAttribute("aria-checked")==="true";C.onToggle(J,$,L.shiftKey||ne)}),x.append(E)}if(n.onLength&&x.append(ps(t,x,p,e)),g.append(...v,k,x),n.onDice){const $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=p.id,$.setAttribute("aria-label",`Re-roll ${p.label}`),$.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=dt(),$.append(K()),$.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===p.id))}),g.append($)}g.addEventListener("click",$=>{if($.target!==g)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===p.id))}),mt(t,x,".nc-step-wrap",e,r,()=>p.id),t.append(g)}const l=document.createElement("div");l.className="nc-pads-head";const d=(p,g,k)=>{const v=document.createElement("button");return v.type="button",v.className=p,v.textContent=g,k&&v.setAttribute("aria-label",k),v},h=d("nc-pads-step","‹","Previous lane"),b=d("nc-pads-step","›","Next lane"),f=document.createElement(n.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),n.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{const p=e(t);p?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",Re(t,p))}));for(const[p,g]of[[h,-1],[b,1]])p.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const v=k.rows.length;k.onSelectRow?.(((de(k)+g)%v+v)%v)});if(l.append(h,f,b),n.onDice){const p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=dt(),p.addEventListener("click",()=>{const g=e(t);if(g?.type!=="stepGrid")return;const k=de(g);k>=0&&g.onDice?.(k)}),l.append(p)}if(n.transport){const p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const g=e(t);g?.type==="stepGrid"&&g.transport?.onToggle()}),l.append(p)}t.append(l);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const w=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<w;p++){const g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(p),g.textContent=String(p+1),g.addEventListener("click",k=>{const v=e(t);if(v?.type!=="stepGrid")return;const x=de(v);if(x<0)return;if(t.dataset.ncLenMode==="true"){v.onLength?.(x,p+1);return}const $=r.getAttribute("aria-checked")==="true";v.onToggle(x,p,k.shiftKey||$)}),y.append(g)}return mt(t,y,".nc-pad",e,r,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[de(p)]?.id:void 0}),t.append(y),t.append(I()),Re(t,n),t}function de(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function mt(n,e,t,i,a,o){let r="on",c=!0,u=-1;const l=(d,h)=>{const b=d.rows[u]?.steps[h];!b||h>=d.rows[u].length||(d.onSet?d.onSet(u,h,r,c):!!b[r]!==c&&d.onToggle(u,h,r==="accent"))};ji(e,t,d=>{const h=i(n);if(h?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;const b=h.rows.findIndex(f=>f.id===o());b>=0&&h.rows[b].length!==d.pad+1&&h.onLength?.(b,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){const b=o();u=h.rows.findIndex(y=>y.id===b);const f=h.rows[u]?.steps[d.pad];if(!f)return;r=a.getAttribute("aria-checked")==="true"?"accent":"on",c=!f[r]}l(h,d.pad)}else if(d.kind==="long"){const b=o(),f=h.rows.findIndex(w=>w.id===b),y=e.querySelectorAll(t)[d.pad];f>=0&&y instanceof HTMLElement&&h.onLongPress?.(f,d.pad,y)}}})}function us(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let o=a;t.key==="ArrowDown"?o=a+1:t.key==="ArrowUp"?o=a-1:t.key==="Home"?o=0:o=i.length-1;const r=i[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function ps(n,e,t,i){const a=document.createElement("button");a.type="button",a.className="nc-len-handle",a.dataset.ncLen=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-valuemin","1"),a.setAttribute("aria-valuemax",String(t.steps.length)),a.append(K());const o=l=>{const d=i(n);if(d?.type!=="stepGrid")return;const h=d.rows.findIndex(y=>y.id===t.id),b=d.rows[h];if(!b)return;const f=Math.max(1,Math.min(b.steps.length,l));f!==b.length&&d.onLength?.(h,f)},r=l=>{const d=[...e.querySelectorAll(".nc-step")];let h=1;return d.forEach((b,f)=>{const y=b.getBoundingClientRect();y.width>0&&l>=y.left+y.width/2&&(h=f+1)}),h},c=l=>o(r(l.clientX)),u=()=>{window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete a.dataset.dragging};return a.addEventListener("pointerdown",l=>{l.button===0&&(l.preventDefault(),a.dataset.dragging="true",window.addEventListener("pointermove",c),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),a.addEventListener("keydown",l=>{const d=i(n);if(d?.type!=="stepGrid")return;const h=d.rows.find(f=>f.id===t.id);if(!h)return;const b={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};l.key in b&&(l.preventDefault(),o(b[l.key]))}),a}function Re(n,e){const t=e.rows.some(l=>l.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(l=>l.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),r=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&a&&(o.textContent=r?`${a.label} · ${a.length}`:a.label,e.onLength&&(o.setAttribute("aria-pressed",r?"true":"false"),o.setAttribute("aria-label",r?`${a.label} length ${a.length} steps: tap or drag the pads to set the end, tap here when done`:`${a.label}, ${a.length} steps: tap to set the length`)));const c=n.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&a&&(c.setAttribute("aria-label",`Re-roll ${a.label}`),c.title=`Re-roll ${a.label}: new steps for this lane (Undo takes it back)`);const u=n.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){const l=!!e.transport?.playing;u.textContent=l?"Stop":"Play",u.setAttribute("aria-pressed",l?"true":"false")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const l=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const d of i.querySelectorAll("[data-nc-pad]")){const h=Number(d.getAttribute("data-nc-pad")),b=a.steps[h];d instanceof HTMLButtonElement&&(d.hidden=!b||!r&&h>=a.length,r&&h>=a.length?d.dataset.out="true":delete d.dataset.out,r&&h===a.length-1?d.dataset.end="true":delete d.dataset.end,d.setAttribute("aria-label",`${a.label} step ${h+1}`),d.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?d.dataset.accent="true":delete d.dataset.accent,b?.dim?d.dataset.dim="true":delete d.dataset.dim,e.playhead>=0&&h===l?d.dataset.playhead="true":delete d.dataset.playhead)}}for(const l of e.rows){for(let f=0;f<l.steps.length;f++){const y=l.steps[f],w=n.querySelector(`[data-nc-step="${l.id}:${f}"]`);if(!(w instanceof HTMLButtonElement))continue;const p=w.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===l.id?p.dataset.selected="true":delete p.dataset.selected;const v=p.querySelector(".nc-name");v instanceof HTMLElement&&v.setAttribute("aria-pressed",e.selectedRow===l.id?"true":"false"),l.mute||t&&!l.solo?p.dataset.silent="true":delete p.dataset.silent;for(const $ of p.querySelectorAll("[data-nc-ms]")){const E=$.getAttribute("data-nc-ms")==="mute"?l.mute:l.solo;$.setAttribute("aria-pressed",E?"true":"false")}}w.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?w.dataset.accent="true":delete w.dataset.accent,y.dim?w.dataset.dim="true":delete w.dataset.dim,f%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof y.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level"));const g=e.playhead>=0&&l.length>0?(e.playhead%l.length+l.length)%l.length:-1;f===g?w.dataset.playhead="true":delete w.dataset.playhead;const k=!!e.onLength&&e.selectedRow===l.id;w.hidden=f>=l.length&&!k,f>=l.length&&k?w.dataset.out="true":delete w.dataset.out}const d=n.querySelector(`[data-nc-len="${l.id}"]`),b=n.querySelector(`[data-nc-step="${l.id}:${Math.max(0,l.length-1)}"]`)?.closest(".nc-step-wrap");if(d instanceof HTMLElement&&b&&b.nextElementSibling!==d){const f=document.activeElement===d;b.after(d),f&&d.focus()}d instanceof HTMLElement&&(d.setAttribute("aria-valuenow",String(l.length)),d.setAttribute("aria-label",`${l.label} length, ${l.length} steps`),d.title=`${l.label}: drag to set the length (${l.length} steps)`)}}function hs(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,I()),e}function ms(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(Ut(a,e));return t.append(I()),t}function fs(n){return n.replace(/["\\]/g,"\\$&")}function gs(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&Ht(t,i)}Vi(n)}const Ue="netcomposer.rhythm.hidden.v1",U=new WeakMap;function Ae(){try{return globalThis.localStorage??null}catch{return null}}function Xt(n,e=Ue){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function ft(n,e,t,i=Ue){const a=Xt(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function Ge(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function bs(n,e){if(!(!n||!e))return Ge(n).find(t=>t.id===e)}function ys(n){return Ge(n).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(t=>`${t.id}/${t.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(t=>t.value).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.controls.map(t=>t.id).join(",")}`:`${e.type}:${e.id}`).join("|")}function ws(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=U.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return bs(t,i)}function ks(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=ys(e);if(n.dataset.ncSignature===i){for(const a of t)for(const o of a.controls){const r=n.querySelector(`[data-nc-id="${$s(o.id)}"]`);r instanceof Element&&X(r,o)}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const o=document.createElement("div");if(o.className="nc-section",o.dataset.ncSection=a.id,a.inset&&(o.dataset.ncInset="true"),a.title){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=a.title,o.append(r)}for(const r of a.controls)o.append(Ut(r,ws));n.append(o)}}function $s(n){return n.replace(/["\\]/g,"\\$&")}function ye(n,e=Ue){Bt();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1";const i=Xt(Ae(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="",r.append(c,u);const l=document.createElement("span");l.className="nc-snap-msg",l.dataset.ncStatus="",a.append(o,l,r);const d=document.createElement("div");d.className="nc-module-body",d.id=`${n.id}-body`;const h=document.createElement("button");h.type="button",h.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",h.append(b);const f=document.createElement("i");f.className="nc-token-probe",f.dataset.ncProbe="",t.append(f,a,d,h),t.setAttribute("aria-labelledby",o.id);const y=p=>{const g=U.get(t)??n;t.dataset.ncOpen=p?"false":"true",d.hidden=p,h.hidden=!p,c.textContent=p?"+":"−",c.setAttribute("aria-expanded",p?"false":"true"),c.setAttribute("aria-controls",d.id),c.setAttribute("aria-label",`${p?"Show":"Hide"} ${g.title}`),c.title=p?"Show":"Hide",p?t.dataset.ncSlim="":delete t.dataset.ncSlim};c.addEventListener("click",()=>{const p=t.dataset.ncOpen==="true";ft(Ae(),(U.get(t)??n).id,p,e),y(p),ze(t.parentElement)}),h.addEventListener("click",()=>{ft(Ae(),(U.get(t)??n).id,!1,e),y(!1),ze(t.parentElement)});const w={el:t,update(p){U.set(t,p),o.textContent=p.title,l.textContent=p.status??"",p.status!==void 0?l.setAttribute("aria-live","polite"):l.removeAttribute("aria-live"),b.textContent=p.summary??p.title,h.setAttribute("aria-label",`Show ${p.title}`),ks(d,p),y(d.hidden),w.redraw()},redraw(){const p=U.get(t);p&&gs(t,Ge(p))}};return U.set(t,n),y(i),w.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>w.redraw()).observe(t),w}function vs(n,e,t="adjacent"){Bt(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,o)=>{const r=o%4+1;a.el.dataset.ncShade=String(r),a.el.dataset.ncPlace=i;const c=a.el.querySelector("[data-nc-index]");c&&(c.textContent=String(r).padStart(2,"0")),n.append(a.el),a.redraw()}),ze(n)}function ze(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols");return}const e=[...n.children].filter(t=>t instanceof HTMLElement&&t.classList.contains("nc-module")).map(t=>t instanceof HTMLElement&&t.hasAttribute("data-nc-slim")?s("module-slim-column"):"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",e.join(" "))}const Jt="petra-rhythm.state",Qt=1,xs=400,Ss=2e3;function Ts(n){return JSON.stringify({v:Qt,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function Es(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return _t({...n,swing:t,fx:i,tracks:a}).ok}function Ms(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Qt)return null;const t=_t(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==fe)return null;const o=a.slots.map(l=>l===null?null:l);if(!o.every(l=>l===null||Es(i,l)))return null;const r=Number.isInteger(a.active)&&o[a.active]?a.active:null,c=e.selectedTrack,u=Number.isInteger(c)&&c>=0&&c<i.tracks.length?c:0;return{doc:i,bank:{slots:o,active:r},selectedTrack:u}}function Ls(n,e,t=xs){let i,a=0,o="";const r=()=>{clearTimeout(i),i=void 0,a=0;try{const c=Ts(e());if(c===o)return;n.setItem(Jt,c),o=c}catch{}};return{schedule(){const c=Date.now();a||(a=c),clearTimeout(i),i=setTimeout(r,Math.min(t,Math.max(0,a+Ss-c)))},flush:r}}function As(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return Ms(n.getItem(Jt))}catch{return null}}const Ne={maker:"PETRA",instrument:"RHYTHM",number:"01"},Zt="PETRA Rhythm";let gt=!1;function Ns(){return`
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
`}function Cs(n){const e=n.ownerDocument;if(!gt){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Ns(),e.head.append(c),gt=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=Ne.number,i.append(`${Ne.maker} `,a(),` ${Ne.instrument} `,a()," ",o);const r=e.createElement("p");return r.className="petra-head-line",r.textContent="A NetComposer element.",t.append(i,r),n.before(t),t}function Ps(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function bt(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const o=a+(e-i)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,c=performance.timeOrigin+o;return{playedMs:c,plusLatencyMs:c+r,latencyMs:r,stampContextTime:i,stampPerformanceTime:a}}class _s{doc=fi();bank=Hn();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Gn(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.bank=Fn(this.bank,e,this.doc),this.edited=null}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Un(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e,t=!1){const i=tt(this.bank,e,this.doc,0);return i.applied?t?{...i.document,swing:this.doc.swing}:i.document:null}recall(e,t=this.morphSeconds,i=!1){const a=tt(this.bank,e,this.doc,t);return a.applied?(i&&(a.document.swing=this.doc.swing),this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=di(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=ri(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e));return t===this.doc.swing?!1:(this.retireSparkle(),this.doc.swing=t,this.writeActive(),this.glidePending=0,!0)}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const Is=1400;function Ce(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Rs(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class zs{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},Is))}}const js=50;function Os(n,e,t,i=js){if(t)return 0;const a=n-e;return a>=i?0:i-a}class Bs{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=Hi({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}const qs="/rhythm/assets/processor-sgtyG4sG.js",en=new URLSearchParams(location.search),j=en.has("measure"),Ds=!(j&&en.get("clockStepFix")==="0");let je=0;const Hs=.05;j&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[]);const Y=[40,240],m=new _s,ue=j?null:As(localStorage,location.search);ue&&(m.doc=ue.doc,m.bank=ue.bank,m.selectTrack(ue.selectedTrack));const tn=j?null:Ls(localStorage,()=>({doc:m.doc,bank:m.bank,selectedTrack:m.selectedTrack}));if(j){for(const e of m.doc.tracks)e.solo=e.voice==="kick";const n=m.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Hs)}const _=new Ln({bpm:m.doc.bpm,minBpm:Y[0],maxBpm:Y[1],timebase:"shared"}),Ke=document.querySelector("#app");if(!(Ke instanceof HTMLElement))throw new Error("Missing #app");Cs(Ke);const ae=new Bs(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let T=null;j&&(window.__audioInfo=()=>T?{sampleRate:T.sampleRate,outputLatency:T.outputLatency,baseLatency:T.baseLatency,state:T.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>we(),window.__clockStep=n=>{je=n},window.__debug=()=>({audio:T?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:T?.getOutputTimestamp?.()??null,currentTime:T?.currentTime??null,reanchors:W?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let V=null,W=null,me=0,nn=0;function Fs(){return T?T.state==="running"?"running":T.state==="suspended"?"suspended":T.state==="interrupted"?"interrupted":"none":"needs-gesture"}const N=new qn({app:Zt,version:"0.1.0",clock:_,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:Y},audio:Fs,outputLatencyMs:()=>W?.outputLatencyMs??null,swing:()=>m.doc.swing});let yt="",sn=0,an=!1,wt=Number.NEGATIVE_INFINITY,Z=null;const P=new Fe;function H(n=D()){return _.transport.isPlayingAt(n)}function Oe(n){if(!N.isLeader)return;const e=Os(performance.now(),wt,n);if(e>0){Z===null&&(Z=setTimeout(()=>{Z=null,Oe(!0)},e));return}Z!==null&&(clearTimeout(Z),Z=null),N.publishState()&&(wt=performance.now())}function kt(){return an?li(m.doc).tracks:m.doc.tracks}function on(){if(!W)return null;const n=Math.round(W.offset*1e4)/1e4;return{offset:n,shifted:En(_.toSnapshot(),n,"audio")}}function rn(n,e,t,i){return{clock:n,measure:j,swing:e.swing,fx:{...e.fx},...i===void 0?{}:{glideSeconds:i},tracks:t.map(a=>({id:a.id,voice:a.voice,length:a.length,mute:a.mute,solo:a.solo,steps:a.steps})),params:e.tracks.map(a=>({voice:a.voice,params:{...a.params}}))}}function A(){const n=on();if(!V||!n)return;const{offset:e,shifted:t}=n,i=m.consumeGlide(),a=JSON.stringify({seen:P.lastTaken,offset:e,anchor:t.anchor,start:t.startTime,stop:t.stopTime,tempo:t.tempo,swing:m.doc.swing,glide:i??null,tracks:kt(),fx:m.doc.fx});if(a===yt)return;yt=a;const o={...rn(t,m.doc,kt(),i),seen:P.lastTaken};sn=e,V.port.postMessage({type:"state",state:o})}async function ln(){if(!T){if(T=new AudioContext,j){const n=T,e=n.getOutputTimestamp.bind(n);n.getOutputTimestamp=()=>{const t=e(),i=!je||!t.contextTime?t:{contextTime:t.contextTime+je/1e3,performanceTime:t.performanceTime},a=window.__ts;return a&&a.length<2e5&&a.push([performance.timeOrigin+performance.now(),i.contextTime??0,i.performanceTime??0]),i}}W=new Bn(T,Ds?{}:{stepThresholdMs:0}),W.onStep(n=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:n.stepSeconds*1e3,confirmedAt:n.confirmedAt,reanchors:n.reanchors}),A()}),W.start(),await T.audioWorklet.addModule(qs),V=new AudioWorkletNode(T,"rhythm"),V.port.onmessage=n=>{if(n.data.switched!==void 0&&Us(n.data.switched),n.data.level!==void 0&&n.data.step!==void 0&&(nn=n.data.level,me!==n.data.step&&(me=n.data.step,S())),!(!j||!T)){for(const e of n.data.onsets??[])window.__kicks?.push({step:e.step,beat:e.beat,shared:e.contextTime-sn});for(const e of n.data.onsets??[]){const t=bt(T,e.contextTime);t&&window.__onsets?.push({app:Zt,beat:e.beat,contextTime:e.contextTime,hidden:document.hidden,stampAgeMs:(T.currentTime-e.contextTime)*1e3,...t})}for(const e of n.data.render??[]){const t=bt(T,e.contextTime);t&&window.__render?.push({contextTime:e.contextTime,peak:e.peak,playedMs:t.playedMs})}}},V.connect(T.destination),A()}}async function we(){await ln(),T&&(T.state!=="running"&&await T.resume(),H()?_.stop({at:D()}):_.play({at:D()}))}const pe=new zs(()=>S());function ke(){return!N.isLeader}function cn(n,e,t){const i=m.peek(n,ke()),a=on();if(!i||!V||!a)return!1;const o=_.transport.beatAt(D()),r=P.recall(n,o,{glide:e},t===void 0?{}:{atBeat:t}),c={...rn(a.shifted,i,i.tracks,e),atBeat:r.atBeat,switchId:r.id,slot:n};return V.port.postMessage({type:"state",state:c}),!0}function Us(n){const e=P.takeHeld(n);e&&(m.recall(e.slot,e.payload.glide,ke()),m.consumeGlide(),A(),S())}function dn(n){if(P.cancel(),!m.recall(n,m.morphSeconds,ke()))return;const e=m.morphSeconds>0?m.morphSeconds:0;N.sendSnapshot("recall",n,{atBeat:_.transport.beatAt(D()),...e>0?{glide:{seconds:e}}:{}})}function Gs(n){if(P.tap(n,H()).kind==="queue"){const t=m.morphSeconds>0?m.morphSeconds:0;if(cn(n,t,It(_.transport.beatAt(D())))){const i=P.pending?.atBeat;N.sendSnapshot("recall",n,{...i===void 0?{}:{atBeat:i},...t>0?{glide:{seconds:t}}:{}});return}}dn(n)}function te(n,e){const t=Et[n]??"";if(e==="store")m.store(n),pe.say(Ce(e,t,!0));else if(e==="clear"){const i=m.bank.slots[n]!=null;if(P.queued===n){const a=P.drop();P.cancel();const o=m.bank.active;a&&o!=null&&N.sendSnapshot("recall",o,{atBeat:a.atBeat})}m.clear(n),pe.say(Ce(e,t,i)),i&&ae.show($e,`Slot ${t} cleared`)}else m.bank.slots[n]==null?pe.say(Ce(e,t,!1,matchMedia("(pointer: coarse)").matches)):Gs(n);A(),S()}function $e(){m.undoSurprise()&&(ae.dismiss(),A(),S())}function Ks(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),$e();return}if(n.code==="Space"){n.preventDefault(),we();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=fe||(n.preventDefault(),n.shiftKey?te(i,"store"):n.altKey?te(i,"clear"):te(i,"recall"))}const Vs=new gi({min:Y[0],max:Y[1]});function Be(n){m.doc.bpm=n,_.setTempo({bpm:n}),A(),S()}function Ws(){return N.swing==null?"No session swing yet. There is no request message, so this slider stays on this tab.":"The leader sets swing. This slider shows that value. A local edit would stay on this tab."}function un(){const n=H(),e=N.swing;return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:pe.text,controls:[{type:"button",id:"play",label:n?"Stop":"Play",on:n,onPress:()=>void we(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{m.surprise(),A(),S(),ae.show($e)}},{type:"slider",id:"bpm",label:"Tempo",min:Y[0],max:Y[1],step:1,value:_.transport.bpm,onChange:Be,onTap:t=>{const i=Vs.tap(t);i!==null&&i!==_.transport.bpm&&Be(i)}},{type:"slider",id:"swing",label:N.isLeader?"Swing":e==null?"Swing (local)":"Swing (leader)",min:.5,max:.75,step:.01,value:N.isLeader?m.doc.swing:e??m.doc.swing,disabled:!N.isLeader,modulated:!N.isLeader&&e!=null,onChange:t=>{N.isLeader&&(m.edit(i=>{i.swing=t}),Oe(!1),A(),S())},onCommit:()=>{Oe(!0)}},...N.isLeader?[]:[{type:"note",id:"swing-note",text:Ws()}],...N.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:N.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:m.morphSeconds,morphText:Rs(m.morphSeconds),slots:Et.map((t,i)=>({label:t,filled:m.bank.slots[i]!=null,active:m.bank.active===i,edited:m.edited===i,queued:P.queued===i,pulse:P.queued===i&&n&&me%4<2})),onMorph:t=>{m.morphSeconds=t,S()},onSlot:(t,i)=>{te(t,i)}}]}}function qe(){const n=m.doc.tracks.length;return n===0?0:Math.min(m.selectedTrack,n-1)}function pn(){const n=m.doc.tracks[qe()];return{id:"pattern",title:"Pattern",summary:n?`${m.doc.tracks.length} tracks · ${n.name}`:`${m.doc.tracks.length} tracks`,controls:[{type:"stepGrid",transport:{playing:H(),onToggle:()=>void we()},id:"grid",playhead:H()?me:-1,selectedRow:n?.id,onSelectRow:e=>{m.selectTrack(e),S()},onDice:e=>{const t=m.doc.tracks[e]?.name??"Lane";m.diceLane(e)&&(A(),S(),ae.show($e,`New ${t} steps`))},onFill:e=>{an=e,A(),S()},onLength:(e,t)=>{m.edit(i=>{const a=i.tracks[e];a&&(a.length=Math.max(1,Math.min(a.steps.length,Math.round(t))))}),A(),S()},onMute:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),A(),S()},onSolo:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),A(),S()},onToggle:(e,t,i)=>{m.edit(a=>{const o=a.tracks[e]?.steps[t];o&&(i?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),A(),S()},onLongPress:(e,t,i)=>{const a=m.doc.tracks[e],o=a?.steps[t];!a||!o||Fi({anchor:i,title:`${a.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:c})=>{m.edit(u=>{const l=u.tracks[e]?.steps[t];l&&(l.on=!0,l.velocity=r,l.probability=c>=1?void 0:c)}),A(),S()}})},onSet:(e,t,i,a)=>{m.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(i==="accent"?(r.accent=a,a&&(r.on=!0)):(r.on=a,a||(r.accent=!1)))}),A(),S()},rows:m.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]}}function hn(){const n=qe(),e=m.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"voice",title:e?.name??"Voice",summary:e?`level ${e.params.level.toFixed(2)}`:"",sections:[{id:"lane",controls:[{type:"choice",id:"track",label:"Track",value:e?.id??"",options:m.doc.tracks.map(i=>({value:i.id,label:i.name})),onChange:i=>{const a=m.doc.tracks.findIndex(o=>o.id===i);m.selectTrack(a),S()}}]},{id:"sound",inset:!0,controls:t.map(i=>({type:"slider",id:i,label:i,min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{m.edit(o=>{const r=o.tracks[qe()];r&&(r.params[i]=a)}),A(),S()}}))}]}}function mn(){return{id:"filter",title:"Filter",summary:m.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:m.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{m.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),A(),S()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:m.doc.fx.cutoff,onChange:n=>{m.edit(e=>{e.fx.cutoff=n}),A(),S()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:m.doc.fx.mode,cutoff:m.doc.fx.cutoff,resonance:m.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:nn}]}}const fn=ye(un()),gn=ye(pn()),bn=ye(hn()),yn=ye(mn());function S(){m.takeSurpriseEdit()&&ae.dismiss(),fn.update(un()),gn.update(pn()),bn.update(hn()),yn.update(mn()),tn?.schedule()}window.addEventListener("pagehide",()=>tn?.flush());_.onChange(()=>{if(m.playing=H(),!m.playing&&P.pending){const n=P.drop();n&&dn(n.slot)}m.doc.bpm=_.transport.bpm,A(),S()});N.onSwing(n=>{m.adoptSwing(n)&&(A(),S())});N.onSnapshot(n=>{if(n.op!=="recall")return;window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:D()});const e=n.glide?.seconds??0;if(H()&&cn(n.slot,e,n.atBeat)){S();return}P.cancel(),m.recall(n.slot,e,ke()),A(),S()});N.onRole(()=>S());N.onPeers(()=>S());j&&(window.__rhythm={setKick:n=>{m.edit(e=>{const t=e.tracks.find(i=>i.voice==="kick");t&&t.steps.forEach((i,a)=>{i.on=n.includes(a)})}),A(),S()},store:n=>te(n,"store"),tap:n=>te(n,"recall"),tempo:n=>Be(n),beat:()=>_.transport.beatAt(D()),timeAt:n=>_.transport.timeAt(n),slots:()=>({active:m.bank.active??null,queued:P.queued}),audio:async()=>(await ln(),await T?.resume(),T?.state??"none")});await N.start();document.addEventListener("keydown",Ks);vs(Ke,[fn,gn,bn,yn],"adjacent");S();setInterval(()=>{const n=H();if(n!==m.playing&&(m.playing=n,S()),A(),!j||!T)return;const e=Ps(T);e&&window.__stamps?.push(e)},250);
