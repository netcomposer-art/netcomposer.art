(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const J=1e-9;function mn(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class qe{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return mn(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,c)=>r.beat-c.beat);let a=i.length?i[0].bpm:this.bpm;for(const r of i)r.beat<=e.beat+J&&(a=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const r of i){if(r.beat<=e.beat+J)continue;const c=this.clamp(r.bpm);c!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+J){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-J;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const o=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(i/a));this.setTempoAt(o,t);for(let c=1;c<=r;c++)this.setTempoAt(o+(e-o)*c/r,t+i*(c-1)/r)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new qe({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+J)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+J)return t[i];return t[0]}}const fn=Object.freeze({beatsPerBar:4,beatUnit:4}),Z=1e-9;function gn(n){return Math.floor(n+Z)}function vt(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-Z)*e;return t&&a<=n+Z?a+e:a}class bn{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new qe({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??fn}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Z&&(this.stopTime===null||e<this.stopTime-Z)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Z?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=gn(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return vt(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const xt="nc-clock/snapshot",St=1;function yn(n,e="local"){return{format:xt,version:St,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function wn(n,e){const t=$n(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function kn(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const j=n=>typeof n=="number"&&Number.isFinite(n),et=n=>n===null||j(n);function $n(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==xt&&t("format"),(!j(e.version)||Math.floor(e.version)!==St)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!j(e.anchor.beat)||!j(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&j(i.beat)&&j(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!j(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!j(e.meter.beatUnit))&&t("meter"),(!et(e.startTime)||!et(e.stopTime)||!j(e.stoppedBeat))&&t("transport times"),e}class vn{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new bn(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){wn(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return yn(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const xn="nc-sync/1",Sn=1,Tn="nc-sync",En="nc-sync-leader",Ln=0,Tt=.5,Et=.75;function Mn(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Tt&&n<=Et?n:null}const Ee=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ie=n=>typeof n=="number"&&Number.isFinite(n),le=n=>typeof n=="string"&&n.length>0;function An(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Sn||!le(e.type)||!le(e.from)||!ie(e.term)||!ie(e.seq)||!ie(e.sentAt))return null;switch(e.type){case"hello":return le(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return ie(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&ie(e.slot)?e:null;case"ping":case"pong":return le(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Nn(n,e,t,i,a){return{proto:xn,from:e,term:t,seq:i,sentAt:a,...n}}function ee(){return(performance.timeOrigin+performance.now())/1e3}function tt(n){const e=n.slice().sort((i,a)=>i-a),t=e.length>>1;return e.length%2?e[t]:(e[t-1]+e[t])/2}const ce=.003,Cn=3,Pn=500;class _n{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets=[],this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};waitSince=null;readyStamp=void 0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10)}get reanchors(){return this.stepCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=ce&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,o=a-tt(this.offsets);if(Math.abs(o)<=this.stepThreshold)return this.clearPending(),!1;if(this.pendingStep!==null&&Math.abs(o-this.pendingStep)<this.stepThreshold/2){if(t===this.pendingStamp)return this.followUp(),!1;if(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations)return this.followUp(),!1;this.offsets=[a],this.clearPending(),this.stepCount++;const r={stepSeconds:o,confirmedAt:this.ctx.currentTime,reanchors:this.stepCount};for(const c of[...this.stepListeners])c(r);return!0}return this.pendingStep=o,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1)}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=ce&&i.performanceTime>0)t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,this.waitSince=null;else if(!i||!(i.contextTime>=ce)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<Pn)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Cn,this.keep)}sampleIfNotReady(){if(this.ready)return!0;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=!!e&&e.contextTime>=ce&&e.performanceTime>0;return(!t||e.contextTime!==this.readyStamp)&&(this.readyStamp=t?e.contextTime:void 0,this.sample()),this.ready}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?tt(this.offsets):this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.ctx.addEventListener?.("statechange",this.onSink))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onSink)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class In{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Ee,...e.capabilities},this.channelOption=e.channel??Tn,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,o]=this.tempoRange();e=Math.min(o,Math.max(a,e));const r=this.clock.transport,c=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const u=r.beatAt(c+this.o.minLeadSeconds),l=Math.max(t??vt(u,1),u);i&&i>0?(r.tempo.rampTempo(e,l,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,l),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Et,Math.max(Tt,e)):Ln;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=Mn(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=An(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Ee,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Ee},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(En,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,c)=>[o?0:1,r,c];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(a===null||r[0]<i[0]||r[0]===i[0]&&(r[1]<i[1]||r[1]===i[1]&&r[2]<i[2]))&&(i=r,a=o.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(Nn(e,this.id,this.term,++this.seq,this.o.now()))}}const Rn=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],be=10,Lt=["1","2","3","4","5","6","7","8","9","0"];function zn(){return{slots:Array.from({length:be},()=>null),active:null}}function Fe(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function jn(n,e,t){const i=n.slots.slice();return i[e]=Fe(t),{slots:i,active:e}}function On(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Bn(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function Dn(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=Fe(e),{slots:t,active:n.active}}const Hn=16,qn=[2,6,10,14],Fn=[2,3,6,10,11,14],nt=[0,2,4,6,8,10,12,14],Un=[2,6,10,14],Gn=[1,3,7,9,11,15],Kn={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function H(){return Array.from({length:Hn},()=>!1)}function O(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function Le(n,e,t){return O(n,Math.max(0,e-t),Math.min(1,e+t))}function Vn(n){const e=H();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Wn(n){const e=H();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=qn.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function Yn(n,e){const t=H();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Xn(n,e){const t=H();let i=0;for(const a of Fn)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function Jn(n){const e=H();let t=0;for(const i of Un){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function Qn(n,e){const t=H();for(const r of nt)t[r]=!n[r];const i=nt.filter(r=>t[r]&&r!==0),a=1+Math.floor(e()*3);for(let r=0;r<a&&i.length>0;r+=1){const c=Math.floor(e()*i.length),u=i.splice(c,1)[0];u!==void 0&&(t[u]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function Zn(n,e){const t=H(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const o of i){if(a>=3)break;e()<.45&&(t[o]=!0,a+=1)}return t}function ei(n,e,t){const i=H();let a=0;for(const o of Gn)a>=2||n[o]||e[o]||t()<.35&&(i[o]=!0,a+=1);return i}function Mt(n,e,t){return Array.from({length:e},(i,a)=>{const o=n[a]===!0,r=o&&t(a);return{on:o,accent:r,velocity:r?1:.8}})}function At(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function ti(n,e,t){const i=Kn[n];return{tune:O(t,i.tune[0],i.tune[1],!0),decay:O(t,i.decay[0],i.decay[1]),tone:Le(t,e.tone,.15),snap:Le(t,e.snap,.15),drive:Le(t,e.drive,.1),level:O(t,i.level[0],i.level[1])}}function Nt(n){const e=Vn(n),t=Wn(n),i=Jn(n);return{kick:e,snare:t,clap:Yn(t,n),rim:Xn(e,n),hat:Qn(i,n),hatOpen:i,tom:Zn(t,n),metal:ei(e,t,n)}}function ni(n,e,t){const i=n.tracks[e];if(!i)return n;const a=c=>c.every((u,l)=>u.on===(i.steps[l]?.on??!1));let o=i.steps;for(let c=0;c<6;c++){const u=Nt(t)[i.voice];if(o=Mt(u,i.length,l=>At(i.voice,l)),!a(o)&&o.some(l=>l.on))break}const r=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((c,u)=>u===e?{...c,steps:[...o,...r]}:c)}}function ii(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,o)=>{if(o<t||o>=e.length)return a;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function si(n,e){const t=Nt(e),i=e()<.4?.5:O(e,.5,.62),a=e(),o=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:o,cutoff:O(e,.55,.9),resonance:O(e,.05,.3),drive:O(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:ti(r.voice,r.params,e),steps:Mt(t[r.voice],r.length,c=>At(r.voice,c))}))}}function ai(n,e=Math.random){const t=[];let i=null;for(let o=0;o<be;o+=1){const r=Fe(si(n,e));t.push(r),o===0&&(i=r)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}const Ct="netcomposer.rhythm",Pt=1,_t="netcomposer.rhythm.preset.",oi=new Set(Rn);function ri(n){return`${_t}${n}`}function It(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==Ct&&e.push("Unknown format"),t.version!==Pt&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(_t))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)oi.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function li(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const ci={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function di(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:Ct,version:Pt,id:ri("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:li(e.on,e.accent),params:{...ci[e.voice]}}))}}class ui{queued=null;tap(e,t){return!t||this.queued===e?(this.queued=null,{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}take(){const e=this.queued;return this.queued=null,e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null)}}function pi(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class hi{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:a=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>i||e<=o)return this.taps=[e],null;const r=e-o,c=this.meanInterval();c!==null&&Math.abs(r-c)>c*a&&(this.taps=[o]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const mi="nc-ui",fi={breakpoint:{md:"768px"}},Rt={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},U={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},de=n=>`--${mi}-${n}`,Ie=Rt["label-on-fill-dark"],it=Rt["label-on-fill-light"],gi=U["label-min-contrast"],bi=/^#[0-9a-f]{6}$/i,yi=n=>typeof n=="string"&&bi.test(n),Me=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function st(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=o=>{const r=(o+n/30)%12;return t-i*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Me(a(0)*255)}${Me(a(8)*255)}${Me(a(4)*255)}`}function zt(n){const[e,t,i]=[1,3,5].map(d=>parseInt(n.slice(d,d+2),16)/255),a=Math.max(e,t,i),o=Math.min(e,t,i),r=(a+o)/2,c=a-o;if(!c)return{h:0,s:0,l:r};const u=c/(1-Math.abs(2*r-1));return{h:((a===e?60*((t-i)/c%6):a===t?60*((i-e)/c+2):60*((e-t)/c+4))+360)%360,s:u,l:r}}function at(n){const[e,t,i]=[1,3,5].map(a=>{const o=parseInt(n.slice(a,a+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function Re(n,e){const[t,i]=[at(n),at(e)].sort((a,o)=>o-a);return(t+.05)/(i+.05)}const fe=n=>Re(n,Ie)>=Re(n,it)?Ie:it;function jt(n,e,t,i=gi){let a=st(n,e,t);const o=fe(a)===Ie?1:-1;for(let r=0;r<40&&Re(a,fe(a))<i;r++)t+=o*.01,a=st(n,e,t);return a}function wi(n){const{h:e,s:t}=zt(n),i=jt(e,Math.min(t,U["surprise-on-max-saturation"]),U["surprise-on-lightness"]);return{fill:n,ink:fe(n),on:i,onInk:fe(i)}}const ki=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function $i(n,e=Math.random){const[t,i]=U["surprise-saturation"],[a,o]=U["surprise-lightness"],r=U["surprise-min-hue-gap"],c=yi(n)?zt(n).h:null;let u=e()*360;return c!==null&&ki(u,c)<r&&(u=(c+r+e()*(360-2*r))%360),jt(u,t+e()*(i-t),a+e()*(o-a))}function vi(n){if(!n)return null;const e=wi(n);return{[de("surprise-fill")]:e.fill,[de("surprise-ink")]:e.ink,[de("surprise-on")]:e.on,[de("surprise-on-ink")]:e.onInk}}const xi=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Si={renames:xi},Ti={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},Ei={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},Li={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},ye={};for(const[n,e]of Object.entries(Ti))ye[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(Li))ye[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Ei))ye[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(Si.renames.map(n=>[n.old,n.new]));function Ot(n){const e=ye[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function B(n){return Ot(n).prop}function s(n){return`var(${B(n)})`}function Mi(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(B(e)));return Number.isFinite(t)?t:0}function R(n,e){const t=Ot(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=o:t.kind==="opacity"?a.style.opacity=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=o:a.style.color=o,(n instanceof Element?n:i.documentElement).append(a);const u=(i.defaultView??window).getComputedStyle(a),l=t.kind==="family"?u.fontFamily:t.kind==="color"?u.color:t.kind==="opacity"?u.opacity:u.paddingLeft;return a.remove(),l}function Ai(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function Ni(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const Ci="[data-modulated], [data-modulated] *";function Pi(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-fx[data-nc-depth="${i}"] {
      background: ${s(`module-bg-stack-${i}`)};
      ${B("text-sub")}: ${s(`module-sub-stack-${i}`)};
      ${B("divider")}: ${s(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${s(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${B("text-sub")}: ${s("module-sub-stack-1")};
      ${B("divider")}: ${s("module-div-stack-1")};
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
${Ci} { transition: none; }
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
.nc-snap[data-active="true"] {
  background: ${s("surprise-on")};
  border-color: ${s("surprise-on")};
  color: ${s("surprise-on-ink")};
}
/* Queued for the end of the bar (Bass): a steady accent outline that goes full accent on the beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  outline: ${s("focus-width")} solid color-mix(in srgb, ${s("accent")} 45%, transparent);
  outline-offset: ${s("hairline")};
}
.nc-snap[data-queued="true"][data-pulse="true"] { outline-color: ${s("accent")}; }
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
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${s("focus-width")}) 0 0 ${s("text")}; }
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
    outline-color: color-mix(in srgb, ${s("accent")} 45%, transparent);
  }
}
`}let Ae=null;function Bt(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Ae&&Ae.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=Pi(),n.head.append(e),Ae=e}const Dt={slop:8,longPressMs:500,pitchPx:16};class _i{constructor(e,t,i=Dt){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const o=this.hit(t,i);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const o=t-this.x0,r=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const c=Math.trunc(-r/this.config.pitchPx);c!==this.degrees&&(this.degrees=c,this.emit({kind:"pitch",pad:this.pad,degrees:c,phase:"move"}))}else if(this.phase==="paint"){const c=this.hit(t,i);c>=0&&c!==this.lastPad&&(this.lastPad=c,this.emit({kind:"paint",pad:c,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Ii(n,e,t,i=Dt){let a=!1,o=0;const r=(l,d)=>{const b=n.ownerDocument.elementFromPoint?.(l,d),m=[...n.querySelectorAll(e)],y=b?m.findIndex(g=>g===b||g.contains(b)):-1;if(y>=0)return y;let w=-1,p=Number.POSITIVE_INFINITY;return m.forEach((g,k)=>{if(g.hidden)return;const v=g.getBoundingClientRect();if(d<v.top||d>v.bottom)return;const x=Math.abs(l-(v.left+v.width/2));x<p&&x<=v.width&&(w=k,p=x)}),w},c=new _i(r,l=>{(l.kind==="paint"||l.kind==="long")&&(a=!0),t(l)},i),u=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",l=>{l.button>0||(a=!1,c.down(l.pointerId,l.clientX,l.clientY,l.timeStamp)&&(u(),o=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",l=>{c.state!=="idle"&&(c.move(l.pointerId,l.clientX,l.clientY,l.timeStamp),c.state!=="pending"&&u())}),n.addEventListener("pointerup",l=>{u(),c.up(l.pointerId,l.clientX,l.clientY,l.timeStamp)}),n.addEventListener("pointercancel",l=>{u(),c.cancel(l.pointerId)}),n.addEventListener("click",l=>{a&&(a=!1,l.stopPropagation(),l.preventDefault())},!0),n.addEventListener("contextmenu",l=>l.preventDefault()),c}const Ri=U["toast-duration"];function zi({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function ji(n,e,t,i){const a=c=>({top:c,bottom:c+t}),o=c=>n.some(u=>u&&u.bottom>c.top&&u.top<c.bottom),r=a(e-i-t);return o(r)?o(a(i))?"bottom":"top":"bottom"}function Ht(n,e,t,i,a,o){let r=n.bottom+a;const c=Math.max(o,Math.min(n.left,i-o-t.width));for(let u=!0,l=0;u&&l<8;l++){u=!1;for(const d of e)d&&d.bottom>r&&d.top<r+t.height&&d.right>c&&d.left<c+t.width&&(r=d.bottom+a,u=!0)}return{top:r,left:c}}const ot="data-nc-ui-toast-live";function Oi(n,e){let t=e.querySelector(`[${ot}]`);return t||(t=n.createElement("div"),t.setAttribute(ot,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Bi({message:n,actionLabel:e,onAction:t,duration:i=Ri,onClose:a,avoid:o=[],anchor:r,host:c,document:u=globalThis.document}={}){c=c??u.body;const l=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");const h=u.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,d.appendChild(h);let b=null;e&&(b=u.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,d.appendChild(b)),c.appendChild(d);let m="open";const y=I=>I&&typeof I.getBoundingClientRect=="function"?I.getBoundingClientRect():null,w=y(d),p=w?.height||44,g=l.getComputedStyle?.(d),k=Number.parseFloat(g?.getPropertyValue(B("toast-offset")))||16,v=Number.parseFloat(g?.getPropertyValue(B("toast-anchor-gap")))||8,x=y(r),$=l.innerHeight??0,T=o.map(y).filter(Boolean),E=x&&x.bottom>0&&x.top<$?Ht(x,T,{width:w?.width||0,height:p},l.innerWidth??0,v,k):null;E&&E.top+p<=$?(d.setAttribute("data-placement","anchor"),d.style.top=`${E.top+(l.scrollY??0)}px`,d.style.left=`${E.left+(l.scrollX??0)}px`):d.setAttribute("data-placement",ji(T,$,p,k));const M=l.requestAnimationFrame?.bind(l)??(I=>setTimeout(I,16));M(()=>M(()=>{m==="open"&&d.setAttribute("data-state","open")})),Oi(u,c).textContent=zi({message:n,actionLabel:e});let N,X;const ne=new Promise(I=>{X=I}),re=I=>{clearTimeout(N),N=setTimeout(()=>Te("timeout"),I)};let Se=i,We=Date.now();const Ye=()=>{m==="open"&&(clearTimeout(N),Se=Math.max(0,Se-(Date.now()-We)))},Xe=()=>{m==="open"&&(We=Date.now(),re(Se))};d.addEventListener("pointerenter",Ye),d.addEventListener("pointerleave",Xe),d.addEventListener("focusin",Ye),d.addEventListener("focusout",Xe),b?.addEventListener("click",()=>{if(m==="open")try{t?.()}finally{Te("action")}}),Number.isFinite(i)&&re(i);function Te(I="close"){if(m!=="open")return;m="closing",clearTimeout(N),d.setAttribute("data-state","closing"),a?.(I);const Je=l.getComputedStyle?.(d),hn=Je?Math.max(0,...String(Je.transitionDuration||"").split(",").map(Ze=>Number.parseFloat(Ze)*(Ze.trim().endsWith("ms")?1:1e3)||0)):0,Qe=()=>{m!=="gone"&&(m="gone",d.remove(),X(I))};d.addEventListener("transitionend",Qe),setTimeout(Qe,hn+50)}return{el:d,close:Te,closed:ne}}function rt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Di({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:o,host:r,document:c=globalThis.document}){r=r??c.body;const u=c.defaultView??globalThis,l={velocity:t,probability:i},d=c.createElement("div");d.className="nc-slot-scrim nc-step-editor-scrim";const h=c.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const b=c.createElement("div");b.className="nc-step-editor-head";const m=c.createElement("span");m.className="nc-label",m.textContent=e;const y=c.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",b.append(m,y),h.appendChild(b);const w=[];for(const[x,$]of[["velocity","Velocity"],["probability","Chance"]]){const T=c.createElement("label");T.className="nc-step-editor-row";const E=c.createElement("span");E.className="nc-label",E.textContent=$;const M=c.createElement("input");M.type="range",M.className="nc-range",M.min=x==="velocity"?"0.05":"0",M.max="1",M.step="0.05",M.value=String(l[x]),M.setAttribute("data-nc-edit",x);const N=c.createElement("output");N.className="nc-readout",N.textContent=rt(l[x]),M.setAttribute("aria-valuetext",N.textContent),M.addEventListener("input",()=>{l[x]=Number(M.value),N.textContent=rt(l[x]),M.setAttribute("aria-valuetext",N.textContent),a({velocity:l.velocity,probability:l.probability})}),T.append(E,M,N),h.appendChild(T),w.push(M)}if(r.append(d,h),n?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${fi.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),d.setAttribute("data-placement","sheet");else{const x=n?.getBoundingClientRect?.(),$=h.getBoundingClientRect(),T=Number.parseFloat(u.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(x){let{top:E,left:M}=Ht(x,[],{width:$.width,height:$.height},u.innerWidth,T,T);E+$.height>u.innerHeight&&(E=Math.max(T,x.top-T-$.height)),h.style.top=`${E}px`,h.style.left=`${M}px`}h.setAttribute("data-placement","anchor")}w[0]?.focus({preventScroll:!0});let g=!0;const k=x=>{x.key==="Escape"&&(x.preventDefault(),v())};function v(){g&&(g=!1,c.removeEventListener("keydown",k,!0),d.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return c.addEventListener("keydown",k,!0),d.addEventListener("pointerdown",x=>{x.preventDefault(),v()}),y.addEventListener("click",v),{el:h,close:v}}function Hi(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==o)&&(n.width=a,n.height=o);const r=n.getContext("2d");return r?.setTransform(i,0,0,i,0,0),{ctx:r,w:e,h:t}}function Ne(n){return Math.max(0,Math.min(1,n))}function qt(n,e){const{ctx:t,w:i,h:a}=Hi(n);if(!t)return;t.clearRect(0,0,i,a);const o=Ni(n);if(e.paint==="swatch"){const u=R(n,"accent"),l=R(n,"rhythm.step-cell-on");n.dataset.ncAccent=u,n.dataset.ncStep=l,t.fillStyle=u,t.fillRect(0,0,i/2,a),t.fillStyle=l,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const u=e.mode??"lp",l=R(n,Ai(u)),d=R(n,"divider"),h=Ne(e.cutoff??.5),b=.08+(1-Ne(e.resonance??.2))*.22;t.strokeStyle=d,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let m=0;m<=i;m++){const y=m/Math.max(1,i);let w=0;u==="lp"?w=y<h?1:Math.max(0,1-(y-h)/b):u==="hp"?w=y>h?1:Math.max(0,1-(h-y)/b):w=Math.max(0,1-Math.abs(y-h)/b);const p=a*.78-w*a*.62;m===0?t.moveTo(m,p):t.lineTo(m,p)}t.strokeStyle=l,t.stroke(),t.fillStyle=R(n,"text-sub"),t.font=o,t.fillText(u.toUpperCase(),0,a),n.dataset.ncAccent=l;return}if(e.paint==="envelope"){t.strokeStyle=R(n,"accent"),t.beginPath();const u=Math.max(.05,e.decay??.4);for(let l=0;l<=i;l++){const d=l/Math.max(1,i),h=(a-4)*(1-Math.exp(-d*4/u));t.lineTo(l,a-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const u=Ne(e.level??0);t.fillStyle=R(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=R(n,"accent"),t.fillRect(0,a*.4,i*u,a*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),c=((e.step??0)%r+r)%r;t.fillStyle=R(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=R(n,"rhythm.playhead"),t.fillRect(c/r*i,a*.3,Math.max(1,i/r),a*.4),n.dataset.ncAccent=R(n,"accent")}function _(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function we(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function lt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function ze(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const qi=450,ct=8;function G(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Fi(n){const e=Mi(n,"target-min");return e>0?e:44}function Ui(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=Fi(n),a=i/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){const c=t[r],u=o[r];if(!(c instanceof HTMLElement)||!u||u.width===0||u.height===0)continue;if(u.width>=i&&u.height>=i){c.style.display="none";continue}const l=u.left+u.width/2,d=u.top+u.height/2;let h=l-a,b=l+a,m=d-a,y=d+a;for(let w=0;w<t.length;w++){if(r===w)continue;const p=o[w];if(!p||p.width===0)continue;const g=p.left+p.width/2,k=p.top+p.height/2;Math.abs(k-d)<a*2&&(g>l?b=Math.min(b,(l+g)/2):g<l&&(h=Math.max(h,(l+g)/2))),Math.abs(g-l)<a*2&&(k>d?y=Math.min(y,(d+k)/2):k<d&&(m=Math.max(m,(d+k)/2)))}h=Math.min(h,u.left),b=Math.max(b,u.right),m=Math.min(m,u.top),y=Math.max(y,u.bottom),c.style.left=`${h-u.left}px`,c.style.top=`${m-u.top}px`,c.style.width=`${Math.max(0,b-h)}px`,c.style.height=`${Math.max(0,y-m)}px`,c.style.transform="none"}}function Ft(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function dt(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ut(n,e){switch(n.type){case"slider":return Gi(n,e);case"select":return Vi(n,e);case"toggle":return Wi(n,e);case"button":return Yi(n,e);case"readout":return Xi(n);case"label":return Ji(n);case"note":return ut(n);case"knob":return ts(n,e);case"choice":return ns(n,e);case"slotRow":return is(n,e);case"stepGrid":return rs(n,e);case"canvas":return ds(n);case"fx":return us(n,e);default:return ut({id:"unknown",text:""})}}function Y(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Gt(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=ze(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),lt(n,e.label);else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")lt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Zi(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=ze(e.value))}else if(e.type==="choice")Kt(n,e);else if(e.type==="slotRow")Wt(n,e);else if(e.type==="stepGrid")je(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&qt(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${ps(t.id)}"]`);i instanceof Element&&Y(i,t)}}}function Gi(n,e){const t=we(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{const o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),n.onTap&&t.insertBefore(Ki(n,i,e),a),t.append(_()),Y(t,n),t}function Ki(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(G());const a=o=>{const r=t(e);r?.type==="slider"&&r.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&a(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),a(o.timeStamp))}),i}function Vi(n,e){const t=we(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const o=document.createElement("option");o.value=a.value,o.textContent=a.label,i.append(o)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,_()),t}function Wi(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(_()),Y(t,n),t}function Yi(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(_()),Y(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=Ft(),a.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Yt(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),i.append(t,a),i}function Xi(n){const e=we(n.id,n.label);return e.append(_()),Y(e,n),e}function Ji(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(_()),e}function ut(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(_()),e}function Qi(n){const e=ze(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Gt(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Zi(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;Gt(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",Qi(e)),n.setAttribute("aria-label",e.label)}function es(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function ts(n,e){const t=we(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let o=0,r=0;i.addEventListener("pointerdown",u=>{o=u.clientY;const l=e(i);r=l&&"value"in l?Number(l.value):0,i.setPointerCapture?.(u.pointerId)}),i.addEventListener("pointermove",u=>{if(i.hasPointerCapture&&!i.hasPointerCapture(u.pointerId))return;const l=e(i);if(l?.type!=="knob")return;const d=l.max-l.min||1,h=Math.min(l.max,Math.max(l.min,r-(u.clientY-o)*d/120));l.onChange(h)}),i.addEventListener("keydown",u=>{const l=e(i);if(l?.type!=="knob")return;const d=es(l,u);d!==null&&(u.preventDefault(),l.onChange(Math.min(l.max,Math.max(l.min,d))))});const c=t.querySelector("[data-nc-readout]");return t.insertBefore(i,c),t.append(_()),Y(t,n),t}function ns(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(i.value)}),a.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],c=r.indexOf(a);let u=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(c+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(c-1+r.length)%r.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=r.length-1;else return;const l=r[u];l instanceof HTMLButtonElement&&(o.preventDefault(),l.focus(),l.click())}),t.append(a)}return t.append(_()),Kt(t,n),t}function Kt(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function is(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let d=0;d<n.slots.length;d++){const h=n.slots[d],b=document.createElement("span");b.className="nc-snap-wrap";const m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(d),m.textContent=h.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(m,G()),ss(b,m,t,d,e),i.append(b)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=Ft(),a.append(G()),a.addEventListener("click",()=>{Yt(t);const d=e(t);d?.type==="slotRow"&&d.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const c=document.createElement("input");c.type="range",c.className="nc-range nc-morph",c.min="0",c.max="4",c.step="0.01",c.setAttribute("aria-label","Morph time"),c.addEventListener("input",()=>{const d=e(t);d?.type==="slotRow"&&d.onMorph(Number(c.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(r,u,c);const l=document.createElement("div");return l.className="nc-slot-line",l.append(i,...a?[a]:[]),t.append(l,o,_()),Vt(t,e),Wt(t,n),t}function pt(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;se(n);const o=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,o)}function ss(n,e,t,i,a){let o=0,r=0,c=0,u=!1,l=!1,d=!1,h=!1;const b=()=>{window.clearTimeout(o),o=0},m=g=>{const k=g.clientX-r,v=g.clientY-c;k*k+v*v>ct*ct&&(u=!0,b())},y=()=>{h&&(h=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",p))},w=g=>{const k=o!==0&&!u&&!l;b(),y(),k&&(d=!0,pt(t,i,a,g))},p=()=>{u=!0,b(),y()};n.addEventListener("pointerdown",g=>{g.button===0&&(y(),l=!1,u=!1,d=!1,r=g.clientX,c=g.clientY,b(),o=window.setTimeout(()=>{o=0,!u&&(l=!0,as(t,e,i,a))},qi),h=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",g=>g.preventDefault()),n.addEventListener("click",g=>{if(d||l||u){d=!1,l=!1,u=!1;return}pt(t,i,a,g)})}function Vt(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=ht("Save","store"),a=ht("Clear","clear");t.append(i,a);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),se(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const c=r.target;if(!(c instanceof HTMLButtonElement))return;const u=e(n);if(u?.type!=="slotRow")return;const l=Number(t.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(u.onSlot(l,"store"),se(n)):c.dataset.ncSlotOp==="clear"&&(u.onSlot(l,"clear"),se(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&se(n)})}function ht(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function as(n,e,t,i){Vt(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),c=e.getBoundingClientRect();a.style.left=`${c.left-r.left}px`,a.style.top=`${c.bottom-r.top}px`,a.querySelector("button")?.focus()}function se(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Wt(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const o=Number(a.dataset.ncSlot),r=e.slots[o];if(!r)continue;a.textContent=r.label,r.filled?a.dataset.filled="true":delete a.dataset.filled,r.active?a.dataset.active="true":delete a.dataset.active,r.edited?a.dataset.edited="true":delete a.dataset.edited,r.queued?a.dataset.queued="true":delete a.dataset.queued,r.queued&&r.pulse?a.dataset.pulse="true":delete a.dataset.pulse;const c=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];a.setAttribute("aria-label",[r.label,...c.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Yt(n){const e=n.dataset.ncLastFill||null,t=$i(e);n.dataset.ncLastFill=t;const i=vi(t);if(i)for(const[a,o]of Object.entries(i))n.style.setProperty(a,o)}function os(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=o=>{if(i===o)return;i=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),a(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>a(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||a(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),a(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function rs(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=p=>{const g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=p,i.append(g),g},o=a("Note"),r=a("Accent");r.dataset.ncAccentMode="";const c=p=>{for(const g of[o,r]){const k=g===p;g.setAttribute("aria-checked",k?"true":"false"),g.tabIndex=k?0:-1}};c(o);for(const p of[o,r])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const g=r.getAttribute("aria-checked")==="true"?o:r;c(g),g.focus()});const u=document.createElement("div");u.className="nc-step-tools",u.append(i),n.onFill&&u.append(os(t,e)),t.append(u);for(const p of n.rows){const g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=p.label,k.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(k.dataset.ncLane=String((p.lane-1)%4+1)),k.addEventListener("click",()=>{const $=e(t);if($?.type!=="stepGrid")return;const T=$.rows.findIndex(E=>E.id===p.id);$.onSelectRow?.(T)}),k.addEventListener("keydown",$=>ls(t,k,$));const v=[];for(const $ of["mute","solo"]){if(!($==="mute"?n.onMute:n.onSolo))continue;const E=document.createElement("span");E.className="nc-ms-wrap";const M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=$,M.textContent=$==="mute"?"M":"S",M.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${p.label}`),E.append(M,G()),E.addEventListener("click",()=>{const N=e(t);if(N?.type!=="stepGrid")return;const X=N.rows.findIndex(ne=>ne.id===p.id);($==="mute"?N.onMute:N.onSolo)?.(X)}),v.push(E)}const x=document.createElement("div");x.className="nc-steps";for(let $=0;$<p.steps.length;$++){const T=document.createElement("span");T.className="nc-step-wrap";const E=document.createElement("button");E.type="button",E.className="nc-step",E.dataset.ncStep=`${p.id}:${$}`,E.setAttribute("aria-label",`${p.label} step ${$+1}`),T.append(E,G()),T.addEventListener("click",M=>{const N=e(t);if(N?.type!=="stepGrid")return;const X=N.rows.findIndex(re=>re.id===p.id),ne=r.getAttribute("aria-checked")==="true";N.onToggle(X,$,M.shiftKey||ne)}),x.append(T)}if(n.onLength&&x.append(cs(t,x,p,e)),g.append(...v,k,x),n.onDice){const $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=p.id,$.setAttribute("aria-label",`Re-roll ${p.label}`),$.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=dt(),$.append(G()),$.addEventListener("click",()=>{const T=e(t);T?.type==="stepGrid"&&T.onDice?.(T.rows.findIndex(E=>E.id===p.id))}),g.append($)}g.addEventListener("click",$=>{if($.target!==g)return;const T=e(t);T?.type==="stepGrid"&&T.onSelectRow?.(T.rows.findIndex(E=>E.id===p.id))}),mt(t,x,".nc-step-wrap",e,r,()=>p.id),t.append(g)}const l=document.createElement("div");l.className="nc-pads-head";const d=(p,g,k)=>{const v=document.createElement("button");return v.type="button",v.className=p,v.textContent=g,k&&v.setAttribute("aria-label",k),v},h=d("nc-pads-step","‹","Previous lane"),b=d("nc-pads-step","›","Next lane"),m=document.createElement(n.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),n.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{const p=e(t);p?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",je(t,p))}));for(const[p,g]of[[h,-1],[b,1]])p.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const v=k.rows.length;k.onSelectRow?.(((ue(k)+g)%v+v)%v)});if(l.append(h,m,b),n.onDice){const p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=dt(),p.addEventListener("click",()=>{const g=e(t);if(g?.type!=="stepGrid")return;const k=ue(g);k>=0&&g.onDice?.(k)}),l.append(p)}if(n.transport){const p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const g=e(t);g?.type==="stepGrid"&&g.transport?.onToggle()}),l.append(p)}t.append(l);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const w=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<w;p++){const g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(p),g.textContent=String(p+1),g.addEventListener("click",k=>{const v=e(t);if(v?.type!=="stepGrid")return;const x=ue(v);if(x<0)return;if(t.dataset.ncLenMode==="true"){v.onLength?.(x,p+1);return}const $=r.getAttribute("aria-checked")==="true";v.onToggle(x,p,k.shiftKey||$)}),y.append(g)}return mt(t,y,".nc-pad",e,r,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[ue(p)]?.id:void 0}),t.append(y),t.append(_()),je(t,n),t}function ue(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function mt(n,e,t,i,a,o){let r="on",c=!0,u=-1;const l=(d,h)=>{const b=d.rows[u]?.steps[h];!b||h>=d.rows[u].length||(d.onSet?d.onSet(u,h,r,c):!!b[r]!==c&&d.onToggle(u,h,r==="accent"))};Ii(e,t,d=>{const h=i(n);if(h?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;const b=h.rows.findIndex(m=>m.id===o());b>=0&&h.rows[b].length!==d.pad+1&&h.onLength?.(b,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){const b=o();u=h.rows.findIndex(y=>y.id===b);const m=h.rows[u]?.steps[d.pad];if(!m)return;r=a.getAttribute("aria-checked")==="true"?"accent":"on",c=!m[r]}l(h,d.pad)}else if(d.kind==="long"){const b=o(),m=h.rows.findIndex(w=>w.id===b),y=e.querySelectorAll(t)[d.pad];m>=0&&y instanceof HTMLElement&&h.onLongPress?.(m,d.pad,y)}}})}function ls(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let o=a;t.key==="ArrowDown"?o=a+1:t.key==="ArrowUp"?o=a-1:t.key==="Home"?o=0:o=i.length-1;const r=i[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function cs(n,e,t,i){const a=document.createElement("button");a.type="button",a.className="nc-len-handle",a.dataset.ncLen=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-valuemin","1"),a.setAttribute("aria-valuemax",String(t.steps.length)),a.append(G());const o=l=>{const d=i(n);if(d?.type!=="stepGrid")return;const h=d.rows.findIndex(y=>y.id===t.id),b=d.rows[h];if(!b)return;const m=Math.max(1,Math.min(b.steps.length,l));m!==b.length&&d.onLength?.(h,m)},r=l=>{const d=[...e.querySelectorAll(".nc-step")];let h=1;return d.forEach((b,m)=>{const y=b.getBoundingClientRect();y.width>0&&l>=y.left+y.width/2&&(h=m+1)}),h},c=l=>o(r(l.clientX)),u=()=>{window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete a.dataset.dragging};return a.addEventListener("pointerdown",l=>{l.button===0&&(l.preventDefault(),a.dataset.dragging="true",window.addEventListener("pointermove",c),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),a.addEventListener("keydown",l=>{const d=i(n);if(d?.type!=="stepGrid")return;const h=d.rows.find(m=>m.id===t.id);if(!h)return;const b={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};l.key in b&&(l.preventDefault(),o(b[l.key]))}),a}function je(n,e){const t=e.rows.some(l=>l.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(l=>l.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),r=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&a&&(o.textContent=r?`${a.label} · ${a.length}`:a.label,e.onLength&&(o.setAttribute("aria-pressed",r?"true":"false"),o.setAttribute("aria-label",r?`${a.label} length ${a.length} steps: tap or drag the pads to set the end, tap here when done`:`${a.label}, ${a.length} steps: tap to set the length`)));const c=n.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&a&&(c.setAttribute("aria-label",`Re-roll ${a.label}`),c.title=`Re-roll ${a.label}: new steps for this lane (Undo takes it back)`);const u=n.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){const l=!!e.transport?.playing;u.textContent=l?"Stop":"Play",u.setAttribute("aria-pressed",l?"true":"false")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const l=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const d of i.querySelectorAll("[data-nc-pad]")){const h=Number(d.getAttribute("data-nc-pad")),b=a.steps[h];d instanceof HTMLButtonElement&&(d.hidden=!b||!r&&h>=a.length,r&&h>=a.length?d.dataset.out="true":delete d.dataset.out,r&&h===a.length-1?d.dataset.end="true":delete d.dataset.end,d.setAttribute("aria-label",`${a.label} step ${h+1}`),d.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?d.dataset.accent="true":delete d.dataset.accent,b?.dim?d.dataset.dim="true":delete d.dataset.dim,e.playhead>=0&&h===l?d.dataset.playhead="true":delete d.dataset.playhead)}}for(const l of e.rows){for(let m=0;m<l.steps.length;m++){const y=l.steps[m],w=n.querySelector(`[data-nc-step="${l.id}:${m}"]`);if(!(w instanceof HTMLButtonElement))continue;const p=w.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===l.id?p.dataset.selected="true":delete p.dataset.selected;const v=p.querySelector(".nc-name");v instanceof HTMLElement&&v.setAttribute("aria-pressed",e.selectedRow===l.id?"true":"false"),l.mute||t&&!l.solo?p.dataset.silent="true":delete p.dataset.silent;for(const $ of p.querySelectorAll("[data-nc-ms]")){const T=$.getAttribute("data-nc-ms")==="mute"?l.mute:l.solo;$.setAttribute("aria-pressed",T?"true":"false")}}w.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?w.dataset.accent="true":delete w.dataset.accent,y.dim?w.dataset.dim="true":delete w.dataset.dim,m%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof y.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level"));const g=e.playhead>=0&&l.length>0?(e.playhead%l.length+l.length)%l.length:-1;m===g?w.dataset.playhead="true":delete w.dataset.playhead;const k=!!e.onLength&&e.selectedRow===l.id;w.hidden=m>=l.length&&!k,m>=l.length&&k?w.dataset.out="true":delete w.dataset.out}const d=n.querySelector(`[data-nc-len="${l.id}"]`),b=n.querySelector(`[data-nc-step="${l.id}:${Math.max(0,l.length-1)}"]`)?.closest(".nc-step-wrap");if(d instanceof HTMLElement&&b&&b.nextElementSibling!==d){const m=document.activeElement===d;b.after(d),m&&d.focus()}d instanceof HTMLElement&&(d.setAttribute("aria-valuenow",String(l.length)),d.setAttribute("aria-label",`${l.label} length, ${l.length} steps`),d.title=`${l.label}: drag to set the length (${l.length} steps)`)}}function ds(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,_()),e}function us(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(Ut(a,e));return t.append(_()),t}function ps(n){return n.replace(/["\\]/g,"\\$&")}function hs(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&qt(t,i)}Ui(n)}const Ue="netcomposer.rhythm.hidden.v1",q=new WeakMap;function Ce(){try{return globalThis.localStorage??null}catch{return null}}function Xt(n,e=Ue){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function ft(n,e,t,i=Ue){const a=Xt(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function Ge(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function ms(n,e){if(!(!n||!e))return Ge(n).find(t=>t.id===e)}function fs(n){return Ge(n).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(t=>`${t.id}/${t.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(t=>t.value).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.controls.map(t=>t.id).join(",")}`:`${e.type}:${e.id}`).join("|")}function gs(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=q.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ms(t,i)}function bs(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=fs(e);if(n.dataset.ncSignature===i){for(const a of t)for(const o of a.controls){const r=n.querySelector(`[data-nc-id="${ys(o.id)}"]`);r instanceof Element&&Y(r,o)}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const o=document.createElement("div");if(o.className="nc-section",o.dataset.ncSection=a.id,a.inset&&(o.dataset.ncInset="true"),a.title){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=a.title,o.append(r)}for(const r of a.controls)o.append(Ut(r,gs));n.append(o)}}function ys(n){return n.replace(/["\\]/g,"\\$&")}function ke(n,e=Ue){Bt();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1";const i=Xt(Ce(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="",r.append(c,u);const l=document.createElement("span");l.className="nc-snap-msg",l.dataset.ncStatus="",a.append(o,l,r);const d=document.createElement("div");d.className="nc-module-body",d.id=`${n.id}-body`;const h=document.createElement("button");h.type="button",h.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",h.append(b);const m=document.createElement("i");m.className="nc-token-probe",m.dataset.ncProbe="",t.append(m,a,d,h),t.setAttribute("aria-labelledby",o.id);const y=p=>{const g=q.get(t)??n;t.dataset.ncOpen=p?"false":"true",d.hidden=p,h.hidden=!p,c.textContent=p?"+":"−",c.setAttribute("aria-expanded",p?"false":"true"),c.setAttribute("aria-controls",d.id),c.setAttribute("aria-label",`${p?"Show":"Hide"} ${g.title}`),c.title=p?"Show":"Hide",p?t.dataset.ncSlim="":delete t.dataset.ncSlim};c.addEventListener("click",()=>{const p=t.dataset.ncOpen==="true";ft(Ce(),(q.get(t)??n).id,p,e),y(p),Oe(t.parentElement)}),h.addEventListener("click",()=>{ft(Ce(),(q.get(t)??n).id,!1,e),y(!1),Oe(t.parentElement)});const w={el:t,update(p){q.set(t,p),o.textContent=p.title,l.textContent=p.status??"",p.status!==void 0?l.setAttribute("aria-live","polite"):l.removeAttribute("aria-live"),b.textContent=p.summary??p.title,h.setAttribute("aria-label",`Show ${p.title}`),bs(d,p),y(d.hidden),w.redraw()},redraw(){const p=q.get(t);p&&hs(t,Ge(p))}};return q.set(t,n),y(i),w.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>w.redraw()).observe(t),w}function ws(n,e,t="adjacent"){Bt(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,o)=>{const r=o%4+1;a.el.dataset.ncShade=String(r),a.el.dataset.ncPlace=i;const c=a.el.querySelector("[data-nc-index]");c&&(c.textContent=String(r).padStart(2,"0")),n.append(a.el),a.redraw()}),Oe(n)}function Oe(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols");return}const e=[...n.children].filter(t=>t instanceof HTMLElement&&t.classList.contains("nc-module")).map(t=>t instanceof HTMLElement&&t.hasAttribute("data-nc-slim")?s("module-slim-column"):"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",e.join(" "))}const Jt="petra-rhythm.state",Qt=1,ks=400,$s=2e3;function vs(n){return JSON.stringify({v:Qt,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function xs(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return It({...n,swing:t,fx:i,tracks:a}).ok}function Ss(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Qt)return null;const t=It(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==be)return null;const o=a.slots.map(l=>l===null?null:l);if(!o.every(l=>l===null||xs(i,l)))return null;const r=Number.isInteger(a.active)&&o[a.active]?a.active:null,c=e.selectedTrack,u=Number.isInteger(c)&&c>=0&&c<i.tracks.length?c:0;return{doc:i,bank:{slots:o,active:r},selectedTrack:u}}function Ts(n,e,t=ks){let i,a=0,o="";const r=()=>{clearTimeout(i),i=void 0,a=0;try{const c=vs(e());if(c===o)return;n.setItem(Jt,c),o=c}catch{}};return{schedule(){const c=Date.now();a||(a=c),clearTimeout(i),i=setTimeout(r,Math.min(t,Math.max(0,a+$s-c)))},flush:r}}function Es(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return Ss(n.getItem(Jt))}catch{return null}}const Pe={maker:"PETRA",instrument:"RHYTHM",number:"01"},Zt="PETRA Rhythm";let gt=!1;function Ls(){return`
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
`}function Ms(n){const e=n.ownerDocument;if(!gt){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Ls(),e.head.append(c),gt=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=Pe.number,i.append(`${Pe.maker} `,a(),` ${Pe.instrument} `,a()," ",o);const r=e.createElement("p");return r.className="petra-head-line",r.textContent="A NetComposer element.",t.append(i,r),n.before(t),t}function As(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function bt(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const o=a+(e-i)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,c=performance.timeOrigin+o;return{playedMs:c,plusLatencyMs:c+r,latencyMs:r,stampContextTime:i,stampPerformanceTime:a}}class Ns{doc=di();bank=zn();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Dn(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.bank=jn(this.bank,e,this.doc),this.edited=null}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=On(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}recall(e,t=this.morphSeconds){const i=Bn(this.bank,e,this.doc,t);return i.applied?(this.retireSparkle(),this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=i.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=ai(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=ni(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e));return t===this.doc.swing?!1:(this.retireSparkle(),this.doc.swing=t,this.writeActive(),this.glidePending=0,!0)}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const Cs=1400;function _e(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Ps(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class _s{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},Cs))}}const Is=50;function Rs(n,e,t,i=Is){if(t)return 0;const a=n-e;return a>=i?0:i-a}class zs{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=Bi({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}const js="/rhythm/assets/processor-Du6xnmHA.js",en=new URLSearchParams(location.search),z=en.has("measure"),Os=!(z&&en.get("clockStepFix")==="0");let Be=0;const Bs=.05;z&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[]);const V=[40,240],f=new Ns,pe=z?null:Es(localStorage,location.search);pe&&(f.doc=pe.doc,f.bank=pe.bank,f.selectTrack(pe.selectedTrack));const tn=z?null:Ts(localStorage,()=>({doc:f.doc,bank:f.bank,selectedTrack:f.selectedTrack}));if(z){for(const e of f.doc.tracks)e.solo=e.voice==="kick";const n=f.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Bs)}const P=new vn({bpm:f.doc.bpm,minBpm:V[0],maxBpm:V[1],timebase:"shared"}),Ke=document.querySelector("#app");if(!(Ke instanceof HTMLElement))throw new Error("Missing #app");Ms(Ke);const oe=new zs(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let L=null;z&&(window.__audioInfo=()=>L?{sampleRate:L.sampleRate,outputLatency:L.outputLatency,baseLatency:L.baseLatency,state:L.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>$e(),window.__clockStep=n=>{Be=n},window.__debug=()=>({audio:L?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:L?.getOutputTimestamp?.()??null,currentTime:L?.currentTime??null,reanchors:K?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let ae=null,K=null,ge=0,nn=0;function Ds(){return L?L.state==="running"?"running":L.state==="suspended"?"suspended":L.state==="interrupted"?"interrupted":"none":"needs-gesture"}const C=new In({app:Zt,version:"0.1.0",clock:P,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:V},audio:Ds,outputLatencyMs:()=>K?.outputLatencyMs??null,swing:()=>f.doc.swing});let yt="",sn=!1,wt=Number.NEGATIVE_INFINITY,Q=null;const D=new ui;let te=null,F=null;const Hs=.12;function W(n=ee()){return P.transport.isPlayingAt(n)}function De(n){if(!C.isLeader)return;const e=Rs(performance.now(),wt,n);if(e>0){Q===null&&(Q=setTimeout(()=>{Q=null,De(!0)},e));return}Q!==null&&(clearTimeout(Q),Q=null),C.publishState()&&(wt=performance.now())}function kt(){return sn?ii(f.doc).tracks:f.doc.tracks}function A(){if(!ae||!K)return;const n=f.consumeGlide(),e=Math.round(K.offset*1e4)/1e4,t=kn(P.toSnapshot(),e,"audio"),i=JSON.stringify({atBeat:te,offset:e,anchor:t.anchor,start:t.startTime,stop:t.stopTime,tempo:t.tempo,swing:f.doc.swing,glide:n??null,tracks:kt(),fx:f.doc.fx});if(i===yt)return;yt=i;const a={clock:t,measure:z,swing:f.doc.swing,fx:{...f.doc.fx},...n===void 0?{}:{glideSeconds:n},...te===null?{}:{atBeat:te},tracks:kt().map(o=>({id:o.id,voice:o.voice,length:o.length,mute:o.mute,solo:o.solo,steps:o.steps})),params:f.doc.tracks.map(o=>({voice:o.voice,params:{...o.params}}))};ae.port.postMessage({type:"state",state:a})}async function qs(){if(!L){if(L=new AudioContext,z){const n=L,e=n.getOutputTimestamp.bind(n);n.getOutputTimestamp=()=>{const t=e(),i=!Be||!t.contextTime?t:{contextTime:t.contextTime+Be/1e3,performanceTime:t.performanceTime},a=window.__ts;return a&&a.length<2e5&&a.push([performance.timeOrigin+performance.now(),i.contextTime??0,i.performanceTime??0]),i}}K=new _n(L,Os?{}:{stepThresholdMs:0}),K.onStep(n=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:n.stepSeconds*1e3,confirmedAt:n.confirmedAt,reanchors:n.reanchors}),A()}),K.start(),await L.audioWorklet.addModule(js),ae=new AudioWorkletNode(L,"rhythm"),ae.port.onmessage=n=>{if(n.data.level!==void 0&&n.data.step!==void 0&&(nn=n.data.level,ge!==n.data.step&&(ge=n.data.step,S())),!(!z||!L)){for(const e of n.data.onsets??[]){const t=bt(L,e.contextTime);t&&window.__onsets?.push({app:Zt,beat:e.beat,contextTime:e.contextTime,hidden:document.hidden,stampAgeMs:(L.currentTime-e.contextTime)*1e3,...t})}for(const e of n.data.render??[]){const t=bt(L,e.contextTime);t&&window.__render?.push({contextTime:e.contextTime,peak:e.peak,playedMs:t.playedMs})}}},ae.connect(L.destination),A()}}async function $e(){await qs(),L&&(L.state!=="running"&&await L.resume(),W()?P.stop({at:ee()}):P.play({at:ee()}))}const he=new _s(()=>S());function ve(){F!==null&&clearTimeout(F),F=null}function Ve(n,e){if(te=e,!f.recall(n)){te=null;return}const t=f.morphSeconds>0?f.morphSeconds:0;C.sendSnapshot("recall",n,t>0?{glide:{seconds:t}}:{})}function Fs(){ve();const n=pi(P.transport.beatAt(ee())),e=()=>{F=null;const i=D.take();if(i===null)return;Ve(i,n),A(),S();const a=Math.max(0,(P.transport.timeAt(n)-ee())*1e3)+30;F=setTimeout(()=>{F=null,te=null,A()},a)},t=(P.transport.timeAt(n)-ee()-Hs)*1e3;t<=0?e():F=setTimeout(e,t)}function Us(n){if(D.tap(n,W()).kind==="queue"){Fs(),S();return}ve(),Ve(n,null)}function me(n,e){const t=Lt[n]??"";if(e==="store")f.store(n),he.say(_e(e,t,!0));else if(e==="clear"){const i=f.bank.slots[n]!=null;D.queued===n&&(D.cancel(n),ve()),f.clear(n),he.say(_e(e,t,i)),i&&oe.show(xe,`Slot ${t} cleared`)}else f.bank.slots[n]==null?he.say(_e(e,t,!1,matchMedia("(pointer: coarse)").matches)):Us(n);A(),S()}function xe(){f.undoSurprise()&&(oe.dismiss(),A(),S())}function Gs(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),xe();return}if(n.code==="Space"){n.preventDefault(),$e();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=be||(n.preventDefault(),n.shiftKey?me(i,"store"):n.altKey?me(i,"clear"):me(i,"recall"))}const Ks=new hi({min:V[0],max:V[1]});function $t(n){f.doc.bpm=n,P.setTempo({bpm:n}),A(),S()}function Vs(){return C.swing==null?"No session swing yet. There is no request message, so this slider stays on this tab.":"The leader sets swing. This slider shows that value. A local edit would stay on this tab."}function an(){const n=W(),e=C.swing;return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:he.text,controls:[{type:"button",id:"play",label:n?"Stop":"Play",on:n,onPress:()=>void $e(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{f.surprise(),A(),S(),oe.show(xe)}},{type:"slider",id:"bpm",label:"Tempo",min:V[0],max:V[1],step:1,value:P.transport.bpm,onChange:$t,onTap:t=>{const i=Ks.tap(t);i!==null&&i!==P.transport.bpm&&$t(i)}},{type:"slider",id:"swing",label:C.isLeader?"Swing":e==null?"Swing (local)":"Swing (leader)",min:.5,max:.75,step:.01,value:C.isLeader?f.doc.swing:e??f.doc.swing,disabled:!C.isLeader,modulated:!C.isLeader&&e!=null,onChange:t=>{C.isLeader&&(f.edit(i=>{i.swing=t}),De(!1),A(),S())},onCommit:()=>{De(!0)}},...C.isLeader?[]:[{type:"note",id:"swing-note",text:Vs()}],...C.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:C.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:f.morphSeconds,morphText:Ps(f.morphSeconds),slots:Lt.map((t,i)=>({label:t,filled:f.bank.slots[i]!=null,active:f.bank.active===i,edited:f.edited===i,queued:D.queued===i,pulse:D.queued===i&&n&&ge%4===0})),onMorph:t=>{f.morphSeconds=t,S()},onSlot:(t,i)=>{me(t,i)}}]}}function He(){const n=f.doc.tracks.length;return n===0?0:Math.min(f.selectedTrack,n-1)}function on(){const n=f.doc.tracks[He()];return{id:"pattern",title:"Pattern",summary:n?`${f.doc.tracks.length} tracks · ${n.name}`:`${f.doc.tracks.length} tracks`,controls:[{type:"stepGrid",transport:{playing:W(),onToggle:()=>void $e()},id:"grid",playhead:W()?ge:-1,selectedRow:n?.id,onSelectRow:e=>{f.selectTrack(e),S()},onDice:e=>{const t=f.doc.tracks[e]?.name??"Lane";f.diceLane(e)&&(A(),S(),oe.show(xe,`New ${t} steps`))},onFill:e=>{sn=e,A(),S()},onLength:(e,t)=>{f.edit(i=>{const a=i.tracks[e];a&&(a.length=Math.max(1,Math.min(a.steps.length,Math.round(t))))}),A(),S()},onMute:e=>{f.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),A(),S()},onSolo:e=>{f.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),A(),S()},onToggle:(e,t,i)=>{f.edit(a=>{const o=a.tracks[e]?.steps[t];o&&(i?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),A(),S()},onLongPress:(e,t,i)=>{const a=f.doc.tracks[e],o=a?.steps[t];!a||!o||Di({anchor:i,title:`${a.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:c})=>{f.edit(u=>{const l=u.tracks[e]?.steps[t];l&&(l.on=!0,l.velocity=r,l.probability=c>=1?void 0:c)}),A(),S()}})},onSet:(e,t,i,a)=>{f.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(i==="accent"?(r.accent=a,a&&(r.on=!0)):(r.on=a,a||(r.accent=!1)))}),A(),S()},rows:f.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]}}function rn(){const n=He(),e=f.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"voice",title:e?.name??"Voice",summary:e?`level ${e.params.level.toFixed(2)}`:"",sections:[{id:"lane",controls:[{type:"choice",id:"track",label:"Track",value:e?.id??"",options:f.doc.tracks.map(i=>({value:i.id,label:i.name})),onChange:i=>{const a=f.doc.tracks.findIndex(o=>o.id===i);f.selectTrack(a),S()}}]},{id:"sound",inset:!0,controls:t.map(i=>({type:"slider",id:i,label:i,min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{f.edit(o=>{const r=o.tracks[He()];r&&(r.params[i]=a)}),A(),S()}}))}]}}function ln(){return{id:"filter",title:"Filter",summary:f.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:f.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{f.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),A(),S()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:f.doc.fx.cutoff,onChange:n=>{f.edit(e=>{e.fx.cutoff=n}),A(),S()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:f.doc.fx.mode,cutoff:f.doc.fx.cutoff,resonance:f.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:nn}]}}const cn=ke(an()),dn=ke(on()),un=ke(rn()),pn=ke(ln());function S(){f.takeSurpriseEdit()&&oe.dismiss(),cn.update(an()),dn.update(on()),un.update(rn()),pn.update(ln()),tn?.schedule()}window.addEventListener("pagehide",()=>tn?.flush());P.onChange(()=>{if(f.playing=W(),!f.playing&&D.queued!==null){const n=D.take();ve(),n!==null&&Ve(n,null)}f.doc.bpm=P.transport.bpm,A(),S()});C.onSwing(n=>{f.adoptSwing(n)&&(A(),S())});C.onSnapshot(n=>{n.op==="recall"&&f.recall(n.slot,n.glide?.seconds??0)&&(A(),S())});C.onRole(()=>S());C.onPeers(()=>S());await C.start();document.addEventListener("keydown",Gs);ws(Ke,[cn,dn,un,pn],"adjacent");S();setInterval(()=>{const n=W();if(n!==f.playing&&(f.playing=n,S()),A(),!z||!L)return;const e=As(L);e&&window.__stamps?.push(e)},250);
