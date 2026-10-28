(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const K=1e-9;function rn(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class Oe{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return rn(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,c)=>r.beat-c.beat);let a=i.length?i[0].bpm:this.bpm;for(const r of i)r.beat<=e.beat+K&&(a=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const r of i){if(r.beat<=e.beat+K)continue;const c=this.clamp(r.bpm);c!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+K){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-K;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const o=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(i/a));this.setTempoAt(o,t);for(let c=1;c<=r;c++)this.setTempoAt(o+(e-o)*c/r,t+i*(c-1)/r)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new Oe({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+K)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+K)return t[i];return t[0]}}const cn=Object.freeze({beatsPerBar:4,beatUnit:4}),W=1e-9;function ln(n){return Math.floor(n+W)}function ft(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-W)*e;return t&&a<=n+W?a+e:a}class dn{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Oe({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??cn}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-W&&(this.stopTime===null||e<this.stopTime-W)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-W?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=ln(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return ft(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const gt="nc-clock/snapshot",bt=1;function un(n,e="local"){return{format:gt,version:bt,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function pn(n,e){const t=mn(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function hn(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const R=n=>typeof n=="number"&&Number.isFinite(n),Ye=n=>n===null||R(n);function mn(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==gt&&t("format"),(!R(e.version)||Math.floor(e.version)!==bt)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!R(e.anchor.beat)||!R(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&R(i.beat)&&R(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!R(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!R(e.meter.beatUnit))&&t("meter"),(!Ye(e.startTime)||!Ye(e.stopTime)||!R(e.stoppedBeat))&&t("transport times"),e}class fn{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new dn(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){pn(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return un(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const gn="nc-sync/1",bn=1,yn="nc-sync",wn="nc-sync-leader",kn=0,yt=.5,wt=.75;function $n(n){return typeof n=="number"&&Number.isFinite(n)&&n>=yt&&n<=wt?n:null}const $e=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),J=n=>typeof n=="number"&&Number.isFinite(n),se=n=>typeof n=="string"&&n.length>0;function xn(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==bn||!se(e.type)||!se(e.from)||!J(e.term)||!J(e.seq)||!J(e.sentAt))return null;switch(e.type){case"hello":return se(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return J(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&J(e.slot)?e:null;case"ping":case"pong":return se(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function vn(n,e,t,i,a){return{proto:gn,from:e,term:t,seq:i,sentAt:a,...n}}function Le(){return(performance.timeOrigin+performance.now())/1e3}function Xe(n){const e=n.slice().sort((i,a)=>i-a),t=e.length>>1;return e.length%2?e[t]:(e[t-1]+e[t])/2}const ae=.003,Sn=3,Tn=500;class En{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets=[],this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};waitSince=null;readyStamp=void 0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10)}get reanchors(){return this.stepCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=ae&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,o=a-Xe(this.offsets);if(Math.abs(o)<=this.stepThreshold)return this.clearPending(),!1;if(this.pendingStep!==null&&Math.abs(o-this.pendingStep)<this.stepThreshold/2){if(t===this.pendingStamp)return this.followUp(),!1;if(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations)return this.followUp(),!1;this.offsets=[a],this.clearPending(),this.stepCount++;const r={stepSeconds:o,confirmedAt:this.ctx.currentTime,reanchors:this.stepCount};for(const c of[...this.stepListeners])c(r);return!0}return this.pendingStep=o,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1)}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=ae&&i.performanceTime>0)t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,this.waitSince=null;else if(!i||!(i.contextTime>=ae)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<Tn)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Sn,this.keep)}sampleIfNotReady(){if(this.ready)return!0;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=!!e&&e.contextTime>=ae&&e.performanceTime>0;return(!t||e.contextTime!==this.readyStamp)&&(this.readyStamp=t?e.contextTime:void 0,this.sample()),this.ready}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?Xe(this.offsets):this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.ctx.addEventListener?.("statechange",this.onSink))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onSink)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class Mn{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...$e,...e.capabilities},this.channelOption=e.channel??yn,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,o]=this.tempoRange();e=Math.min(o,Math.max(a,e));const r=this.clock.transport,c=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const l=r.beatAt(c+this.o.minLeadSeconds),d=Math.max(t??ft(l,1),l);i&&i>0?(r.tempo.rampTempo(e,d,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(wt,Math.max(yt,e)):kn;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=$n(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=xn(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...$e,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...$e},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(wn,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,c)=>[o?0:1,r,c];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(a===null||r[0]<i[0]||r[0]===i[0]&&(r[1]<i[1]||r[1]===i[1]&&r[2]<i[2]))&&(i=r,a=o.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(vn(e,this.id,this.term,++this.seq,this.o.now()))}}const An=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],he=10,kt=["1","2","3","4","5","6","7","8","9","0"];function Ln(){return{slots:Array.from({length:he},()=>null),active:null}}function Be(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function Nn(n,e,t){const i=n.slots.slice();return i[e]=Be(t),{slots:i,active:e}}function Cn(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Pn(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function _n(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=Be(e),{slots:t,active:n.active}}const In=16,zn=[2,6,10,14],Rn=[2,3,6,10,11,14],Je=[0,2,4,6,8,10,12,14],jn=[2,6,10,14],On=[1,3,7,9,11,15],Bn={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function D(){return Array.from({length:In},()=>!1)}function O(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function xe(n,e,t){return O(n,Math.max(0,e-t),Math.min(1,e+t))}function Dn(n){const e=D();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Hn(n){const e=D();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=zn.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function Fn(n,e){const t=D();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Un(n,e){const t=D();let i=0;for(const a of Rn)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function qn(n){const e=D();let t=0;for(const i of jn){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function Gn(n,e){const t=D();for(const r of Je)t[r]=!n[r];const i=Je.filter(r=>t[r]&&r!==0),a=1+Math.floor(e()*3);for(let r=0;r<a&&i.length>0;r+=1){const c=Math.floor(e()*i.length),l=i.splice(c,1)[0];l!==void 0&&(t[l]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function Kn(n,e){const t=D(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const o of i){if(a>=3)break;e()<.45&&(t[o]=!0,a+=1)}return t}function Vn(n,e,t){const i=D();let a=0;for(const o of On)a>=2||n[o]||e[o]||t()<.35&&(i[o]=!0,a+=1);return i}function $t(n,e,t){return Array.from({length:e},(i,a)=>{const o=n[a]===!0,r=o&&t(a);return{on:o,accent:r,velocity:r?1:.8}})}function xt(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function Wn(n,e,t){const i=Bn[n];return{tune:O(t,i.tune[0],i.tune[1],!0),decay:O(t,i.decay[0],i.decay[1]),tone:xe(t,e.tone,.15),snap:xe(t,e.snap,.15),drive:xe(t,e.drive,.1),level:O(t,i.level[0],i.level[1])}}function vt(n){const e=Dn(n),t=Hn(n),i=qn(n);return{kick:e,snare:t,clap:Fn(t,n),rim:Un(e,n),hat:Gn(i,n),hatOpen:i,tom:Kn(t,n),metal:Vn(e,t,n)}}function Yn(n,e,t){const i=n.tracks[e];if(!i)return n;const a=c=>c.every((l,d)=>l.on===(i.steps[d]?.on??!1));let o=i.steps;for(let c=0;c<6;c++){const l=vt(t)[i.voice];if(o=$t(l,i.length,d=>xt(i.voice,d)),!a(o)&&o.some(d=>d.on))break}const r=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((c,l)=>l===e?{...c,steps:[...o,...r]}:c)}}function Xn(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,o)=>{if(o<t||o>=e.length)return a;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function Jn(n,e){const t=vt(e),i=e()<.4?.5:O(e,.5,.62),a=e(),o=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:o,cutoff:O(e,.55,.9),resonance:O(e,.05,.3),drive:O(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:Wn(r.voice,r.params,e),steps:$t(t[r.voice],r.length,c=>xt(r.voice,c))}))}}function Zn(n,e=Math.random){const t=[];let i=null;for(let o=0;o<he;o+=1){const r=Be(Jn(n,e));t.push(r),o===0&&(i=r)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}const St="netcomposer.rhythm",Tt=1,Et="netcomposer.rhythm.preset.",Qn=new Set(An);function ei(n){return`${Et}${n}`}function Mt(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==St&&e.push("Unknown format"),t.version!==Tt&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(Et))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)Qn.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function ti(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const ni={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function ii(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:St,version:Tt,id:ei("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:ti(e.on,e.accent),params:{...ni[e.voice]}}))}}const si="nc-ui",ai={breakpoint:{md:"768px"}},At={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},F={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},oe=n=>`--${si}-${n}`,Ne=At["label-on-fill-dark"],Ze=At["label-on-fill-light"],oi=F["label-min-contrast"],ri=/^#[0-9a-f]{6}$/i,ci=n=>typeof n=="string"&&ri.test(n),ve=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Qe(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=o=>{const r=(o+n/30)%12;return t-i*Math.max(-1,Math.min(r-3,9-r,1))};return`#${ve(a(0)*255)}${ve(a(8)*255)}${ve(a(4)*255)}`}function Lt(n){const[e,t,i]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),a=Math.max(e,t,i),o=Math.min(e,t,i),r=(a+o)/2,c=a-o;if(!c)return{h:0,s:0,l:r};const l=c/(1-Math.abs(2*r-1));return{h:((a===e?60*((t-i)/c%6):a===t?60*((i-e)/c+2):60*((e-t)/c+4))+360)%360,s:l,l:r}}function et(n){const[e,t,i]=[1,3,5].map(a=>{const o=parseInt(n.slice(a,a+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function Ce(n,e){const[t,i]=[et(n),et(e)].sort((a,o)=>o-a);return(t+.05)/(i+.05)}const ue=n=>Ce(n,Ne)>=Ce(n,Ze)?Ne:Ze;function Nt(n,e,t,i=oi){let a=Qe(n,e,t);const o=ue(a)===Ne?1:-1;for(let r=0;r<40&&Ce(a,ue(a))<i;r++)t+=o*.01,a=Qe(n,e,t);return a}function li(n){const{h:e,s:t}=Lt(n),i=Nt(e,Math.min(t,F["surprise-on-max-saturation"]),F["surprise-on-lightness"]);return{fill:n,ink:ue(n),on:i,onInk:ue(i)}}const di=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function ui(n,e=Math.random){const[t,i]=F["surprise-saturation"],[a,o]=F["surprise-lightness"],r=F["surprise-min-hue-gap"],c=ci(n)?Lt(n).h:null;let l=e()*360;return c!==null&&di(l,c)<r&&(l=(c+r+e()*(360-2*r))%360),Nt(l,t+e()*(i-t),a+e()*(o-a))}function pi(n){if(!n)return null;const e=li(n);return{[oe("surprise-fill")]:e.fill,[oe("surprise-ink")]:e.ink,[oe("surprise-on")]:e.on,[oe("surprise-on-ink")]:e.onInk}}const hi=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],mi={renames:hi},fi={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},gi={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},bi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},me={};for(const[n,e]of Object.entries(fi))me[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(bi))me[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(gi))me[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(mi.renames.map(n=>[n.old,n.new]));function Ct(n){const e=me[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function B(n){return Ct(n).prop}function s(n){return`var(${B(n)})`}function yi(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(B(e)));return Number.isFinite(t)?t:0}function I(n,e){const t=Ct(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=o:t.kind==="opacity"?a.style.opacity=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=o:a.style.color=o,(n instanceof Element?n:i.documentElement).append(a);const l=(i.defaultView??window).getComputedStyle(a),d=t.kind==="family"?l.fontFamily:t.kind==="color"?l.color:t.kind==="opacity"?l.opacity:l.paddingLeft;return a.remove(),d}function wi(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function ki(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const $i="[data-modulated], [data-modulated] *";function xi(){const n=i=>`
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
${$i} { transition: none; }
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
.nc-slot-row { gap: ${s("slot-gap")}; }
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
.nc-snap[data-filled="true"] {
  background: ${s("surprise-fill")};
  border-color: ${s("surprise-fill")};
  color: ${s("surprise-ink")};
}
.nc-snap[data-active="true"] {
  background: ${s("surprise-on")};
  border-color: ${s("surprise-on")};
  color: ${s("surprise-on-ink")};
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
.nc-morph-label {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
  white-space: nowrap;
}
.nc-morph {
  flex: 1 1 ${s("rhythm.morph-max")};
  width: ${s("rhythm.morph-max")};
  min-width: ${s("rhythm.morph-min")};
  max-width: ${s("rhythm.morph-max")};
}
.nc-morph-readout {
  flex: 0 0 ${s("rhythm.morph-readout")};
  width: ${s("rhythm.morph-readout")};
  text-align: right;
  font-size: ${s("readout-size-small")};
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
  .nc-slot-row { flex-wrap: wrap; }
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
}
`}let Se=null;function Pt(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Se&&Se.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=xi(),n.head.append(e),Se=e}const _t={slop:8,longPressMs:500,pitchPx:16};class vi{constructor(e,t,i=_t){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const o=this.hit(t,i);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const o=t-this.x0,r=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const c=Math.trunc(-r/this.config.pitchPx);c!==this.degrees&&(this.degrees=c,this.emit({kind:"pitch",pad:this.pad,degrees:c,phase:"move"}))}else if(this.phase==="paint"){const c=this.hit(t,i);c>=0&&c!==this.lastPad&&(this.lastPad=c,this.emit({kind:"paint",pad:c,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Si(n,e,t,i=_t){let a=!1,o=0;const r=(d,u)=>{const b=n.ownerDocument.elementFromPoint?.(d,u),g=[...n.querySelectorAll(e)],y=b?g.findIndex(m=>m===b||m.contains(b)):-1;if(y>=0)return y;let $=-1,p=Number.POSITIVE_INFINITY;return g.forEach((m,w)=>{if(m.hidden)return;const x=m.getBoundingClientRect();if(u<x.top||u>x.bottom)return;const v=Math.abs(d-(x.left+x.width/2));v<p&&v<=x.width&&($=w,p=v)}),$},c=new vi(r,d=>{(d.kind==="paint"||d.kind==="long")&&(a=!0),t(d)},i),l=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",d=>{d.button>0||(a=!1,c.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(l(),o=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",d=>{c.state!=="idle"&&(c.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),c.state!=="pending"&&l())}),n.addEventListener("pointerup",d=>{l(),c.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),n.addEventListener("pointercancel",d=>{l(),c.cancel(d.pointerId)}),n.addEventListener("click",d=>{a&&(a=!1,d.stopPropagation(),d.preventDefault())},!0),n.addEventListener("contextmenu",d=>d.preventDefault()),c}const Ti=F["toast-duration"];function Ei({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function Mi(n,e,t,i){const a=c=>({top:c,bottom:c+t}),o=c=>n.some(l=>l&&l.bottom>c.top&&l.top<c.bottom),r=a(e-i-t);return o(r)?o(a(i))?"bottom":"top":"bottom"}function It(n,e,t,i,a,o){let r=n.bottom+a;const c=Math.max(o,Math.min(n.left,i-o-t.width));for(let l=!0,d=0;l&&d<8;d++){l=!1;for(const u of e)u&&u.bottom>r&&u.top<r+t.height&&u.right>c&&u.left<c+t.width&&(r=u.bottom+a,l=!0)}return{top:r,left:c}}const tt="data-nc-ui-toast-live";function Ai(n,e){let t=e.querySelector(`[${tt}]`);return t||(t=n.createElement("div"),t.setAttribute(tt,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Li({message:n,actionLabel:e,onAction:t,duration:i=Ti,onClose:a,avoid:o=[],anchor:r,host:c,document:l=globalThis.document}={}){c=c??l.body;const d=l.defaultView??globalThis,u=l.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const h=l.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,u.appendChild(h);let b=null;e&&(b=l.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),c.appendChild(u);let g="open";const y=_=>_&&typeof _.getBoundingClientRect=="function"?_.getBoundingClientRect():null,$=y(u),p=$?.height||44,m=d.getComputedStyle?.(u),w=Number.parseFloat(m?.getPropertyValue(B("toast-offset")))||16,x=Number.parseFloat(m?.getPropertyValue(B("toast-anchor-gap")))||8,v=y(r),k=d.innerHeight??0,E=o.map(y).filter(Boolean),S=v&&v.bottom>0&&v.top<k?It(v,E,{width:$?.width||0,height:p},d.innerWidth??0,x,w):null;S&&S.top+p<=k?(u.setAttribute("data-placement","anchor"),u.style.top=`${S.top+(d.scrollY??0)}px`,u.style.left=`${S.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Mi(E,k,p,w));const M=d.requestAnimationFrame?.bind(d)??(_=>setTimeout(_,16));M(()=>M(()=>{g==="open"&&u.setAttribute("data-state","open")})),Ai(l,c).textContent=Ei({message:n,actionLabel:e});let N,G;const X=new Promise(_=>{G=_}),ie=_=>{clearTimeout(N),N=setTimeout(()=>ke("timeout"),_)};let we=i,Ue=Date.now();const qe=()=>{g==="open"&&(clearTimeout(N),we=Math.max(0,we-(Date.now()-Ue)))},Ge=()=>{g==="open"&&(Ue=Date.now(),ie(we))};u.addEventListener("pointerenter",qe),u.addEventListener("pointerleave",Ge),u.addEventListener("focusin",qe),u.addEventListener("focusout",Ge),b?.addEventListener("click",()=>{if(g==="open")try{t?.()}finally{ke("action")}}),Number.isFinite(i)&&ie(i);function ke(_="close"){if(g!=="open")return;g="closing",clearTimeout(N),u.setAttribute("data-state","closing"),a?.(_);const Ke=d.getComputedStyle?.(u),on=Ke?Math.max(0,...String(Ke.transitionDuration||"").split(",").map(We=>Number.parseFloat(We)*(We.trim().endsWith("ms")?1:1e3)||0)):0,Ve=()=>{g!=="gone"&&(g="gone",u.remove(),G(_))};u.addEventListener("transitionend",Ve),setTimeout(Ve,on+50)}return{el:u,close:ke,closed:X}}function nt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Ni({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:o,host:r,document:c=globalThis.document}){r=r??c.body;const l=c.defaultView??globalThis,d={velocity:t,probability:i},u=c.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const h=c.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const b=c.createElement("div");b.className="nc-step-editor-head";const g=c.createElement("span");g.className="nc-label",g.textContent=e;const y=c.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",b.append(g,y),h.appendChild(b);const $=[];for(const[v,k]of[["velocity","Velocity"],["probability","Chance"]]){const E=c.createElement("label");E.className="nc-step-editor-row";const S=c.createElement("span");S.className="nc-label",S.textContent=k;const M=c.createElement("input");M.type="range",M.className="nc-range",M.min=v==="velocity"?"0.05":"0",M.max="1",M.step="0.05",M.value=String(d[v]),M.setAttribute("data-nc-edit",v);const N=c.createElement("output");N.className="nc-readout",N.textContent=nt(d[v]),M.setAttribute("aria-valuetext",N.textContent),M.addEventListener("input",()=>{d[v]=Number(M.value),N.textContent=nt(d[v]),M.setAttribute("aria-valuetext",N.textContent),a({velocity:d.velocity,probability:d.probability})}),E.append(S,M,N),h.appendChild(E),$.push(M)}if(r.append(u,h),n?.setAttribute?.("data-editing","true"),l.matchMedia?.(`(max-width: ${ai.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const v=n?.getBoundingClientRect?.(),k=h.getBoundingClientRect(),E=Number.parseFloat(l.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(v){let{top:S,left:M}=It(v,[],{width:k.width,height:k.height},l.innerWidth,E,E);S+k.height>l.innerHeight&&(S=Math.max(E,v.top-E-k.height)),h.style.top=`${S}px`,h.style.left=`${M}px`}h.setAttribute("data-placement","anchor")}$[0]?.focus({preventScroll:!0});let m=!0;const w=v=>{v.key==="Escape"&&(v.preventDefault(),x())};function x(){m&&(m=!1,c.removeEventListener("keydown",w,!0),u.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return c.addEventListener("keydown",w,!0),u.addEventListener("pointerdown",v=>{v.preventDefault(),x()}),y.addEventListener("click",x),{el:h,close:x}}function Ci(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==o)&&(n.width=a,n.height=o);const r=n.getContext("2d");return r?.setTransform(i,0,0,i,0,0),{ctx:r,w:e,h:t}}function Te(n){return Math.max(0,Math.min(1,n))}function zt(n,e){const{ctx:t,w:i,h:a}=Ci(n);if(!t)return;t.clearRect(0,0,i,a);const o=ki(n);if(e.paint==="swatch"){const l=I(n,"accent"),d=I(n,"rhythm.step-cell-on");n.dataset.ncAccent=l,n.dataset.ncStep=d,t.fillStyle=l,t.fillRect(0,0,i/2,a),t.fillStyle=d,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const l=e.mode??"lp",d=I(n,wi(l)),u=I(n,"divider"),h=Te(e.cutoff??.5),b=.08+(1-Te(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let g=0;g<=i;g++){const y=g/Math.max(1,i);let $=0;l==="lp"?$=y<h?1:Math.max(0,1-(y-h)/b):l==="hp"?$=y>h?1:Math.max(0,1-(h-y)/b):$=Math.max(0,1-Math.abs(y-h)/b);const p=a*.78-$*a*.62;g===0?t.moveTo(g,p):t.lineTo(g,p)}t.strokeStyle=d,t.stroke(),t.fillStyle=I(n,"text-sub"),t.font=o,t.fillText(l.toUpperCase(),0,a),n.dataset.ncAccent=d;return}if(e.paint==="envelope"){t.strokeStyle=I(n,"accent"),t.beginPath();const l=Math.max(.05,e.decay??.4);for(let d=0;d<=i;d++){const u=d/Math.max(1,i),h=(a-4)*(1-Math.exp(-u*4/l));t.lineTo(d,a-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const l=Te(e.level??0);t.fillStyle=I(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=I(n,"accent"),t.fillRect(0,a*.4,i*l,a*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),c=((e.step??0)%r+r)%r;t.fillStyle=I(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=I(n,"rhythm.playhead"),t.fillRect(c/r*i,a*.3,Math.max(1,i/r),a*.4),n.dataset.ncAccent=I(n,"accent")}function P(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function fe(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function it(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Pe(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Pi=450,st=8;function Q(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function _i(n){const e=yi(n,"target-min");return e>0?e:44}function Ii(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=_i(n),a=i/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){const c=t[r],l=o[r];if(!(c instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=i&&l.height>=i){c.style.display="none";continue}const d=l.left+l.width/2,u=l.top+l.height/2;let h=d-a,b=d+a,g=u-a,y=u+a;for(let $=0;$<t.length;$++){if(r===$)continue;const p=o[$];if(!p||p.width===0)continue;const m=p.left+p.width/2,w=p.top+p.height/2;Math.abs(w-u)<a*2&&(m>d?b=Math.min(b,(d+m)/2):m<d&&(h=Math.max(h,(d+m)/2))),Math.abs(m-d)<a*2&&(w>u?y=Math.min(y,(u+w)/2):w<u&&(g=Math.max(g,(u+w)/2)))}h=Math.min(h,l.left),b=Math.max(b,l.right),g=Math.min(g,l.top),y=Math.max(y,l.bottom),c.style.left=`${h-l.left}px`,c.style.top=`${g-l.top}px`,c.style.width=`${Math.max(0,b-h)}px`,c.style.height=`${Math.max(0,y-g)}px`,c.style.transform="none"}}function pe(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Rt(n,e){switch(n.type){case"slider":return zi(n,e);case"select":return Ri(n,e);case"toggle":return ji(n,e);case"button":return Oi(n,e);case"readout":return Bi(n);case"label":return Di(n);case"note":return at(n);case"knob":return qi(n,e);case"choice":return Gi(n,e);case"slotRow":return Ki(n,e);case"stepGrid":return Xi(n,e);case"canvas":return Zi(n);case"fx":return Qi(n,e);default:return at({id:"unknown",text:""})}}function q(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,jt(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=Pe(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),it(n,e.label);else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")it(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Fi(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=Pe(e.value))}else if(e.type==="choice")Ot(n,e);else if(e.type==="slotRow")Dt(n,e);else if(e.type==="stepGrid")Ft(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&zt(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${es(t.id)}"]`);i instanceof Element&&q(i,t)}}}function zi(n,e){const t=fe(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{const o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),t.append(P()),q(t,n),t}function Ri(n,e){const t=fe(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const o=document.createElement("option");o.value=a.value,o.textContent=a.label,i.append(o)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,P()),t}function ji(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(P()),q(t,n),t}function Oi(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(P()),q(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=pe(),a.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Ht(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),i.append(t,a),i}function Bi(n){const e=fe(n.id,n.label);return e.append(P()),q(e,n),e}function Di(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(P()),e}function at(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(P()),e}function Hi(n){const e=Pe(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function jt(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Fi(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;jt(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",Hi(e)),n.setAttribute("aria-label",e.label)}function Ui(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function qi(n,e){const t=fe(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let o=0,r=0;i.addEventListener("pointerdown",l=>{o=l.clientY;const d=e(i);r=d&&"value"in d?Number(d.value):0,i.setPointerCapture?.(l.pointerId)}),i.addEventListener("pointermove",l=>{if(i.hasPointerCapture&&!i.hasPointerCapture(l.pointerId))return;const d=e(i);if(d?.type!=="knob")return;const u=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,r-(l.clientY-o)*u/120));d.onChange(h)}),i.addEventListener("keydown",l=>{const d=e(i);if(d?.type!=="knob")return;const u=Ui(d,l);u!==null&&(l.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,u))))});const c=t.querySelector("[data-nc-readout]");return t.insertBefore(i,c),t.append(P()),q(t,n),t}function Gi(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(i.value)}),a.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],c=r.indexOf(a);let l=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")l=(c+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")l=(c-1+r.length)%r.length;else if(o.key==="Home")l=0;else if(o.key==="End")l=r.length-1;else return;const d=r[l];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),t.append(a)}return t.append(P()),Ot(t,n),t}function Ot(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function Ki(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let l=0;l<n.slots.length;l++){const d=n.slots[l],u=document.createElement("span");u.className="nc-snap-wrap";const h=document.createElement("button");h.type="button",h.className="nc-snap",h.dataset.ncSlot=String(l),h.textContent=d.label,h.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",u.append(h,Q()),Vi(u,h,t,l,e),i.append(u)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=pe(),a.append(Q()),a.addEventListener("click",()=>{Ht(t);const l=e(t);l?.type==="slotRow"&&l.onSparkle?.()}));const o=document.createElement("span");o.className="nc-morph-label",o.textContent="Morph";const r=document.createElement("input");r.type="range",r.className="nc-range nc-morph",r.min="0",r.max="4",r.step="0.01",r.setAttribute("aria-label","Morph time"),r.addEventListener("input",()=>{const l=e(t);l?.type==="slotRow"&&l.onMorph(Number(r.value))});const c=document.createElement("span");return c.className="nc-mono nc-morph-readout",c.dataset.ncMorph="",t.append(i,...a?[a]:[],o,r,c,P()),Bt(t,e),Dt(t,n),t}function ot(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;Z(n);const o=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,o)}function Vi(n,e,t,i,a){let o=0,r=0,c=0,l=!1,d=!1,u=!1,h=!1;const b=()=>{window.clearTimeout(o),o=0},g=m=>{const w=m.clientX-r,x=m.clientY-c;w*w+x*x>st*st&&(l=!0,b())},y=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",$),window.removeEventListener("pointercancel",p))},$=m=>{const w=o!==0&&!l&&!d;b(),y(),w&&(u=!0,ot(t,i,a,m))},p=()=>{l=!0,b(),y()};n.addEventListener("pointerdown",m=>{m.button===0&&(y(),d=!1,l=!1,u=!1,r=m.clientX,c=m.clientY,b(),o=window.setTimeout(()=>{o=0,!l&&(d=!0,Wi(t,e,i,a))},Pi),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",$),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",m=>m.preventDefault()),n.addEventListener("click",m=>{if(u||d||l){u=!1,d=!1,l=!1;return}ot(t,i,a,m)})}function Bt(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=rt("Save","store"),a=rt("Clear","clear");t.append(i,a);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Z(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const c=r.target;if(!(c instanceof HTMLButtonElement))return;const l=e(n);if(l?.type!=="slotRow")return;const d=Number(t.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(l.onSlot(d,"store"),Z(n)):c.dataset.ncSlotOp==="clear"&&(l.onSlot(d,"clear"),Z(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&Z(n)})}function rt(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Wi(n,e,t,i){Bt(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),c=e.getBoundingClientRect();a.style.left=`${c.left-r.left}px`,a.style.top=`${c.bottom-r.top}px`,a.querySelector("button")?.focus()}function Z(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Dt(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const o=Number(a.dataset.ncSlot),r=e.slots[o];r&&(a.textContent=r.label,r.filled?a.dataset.filled="true":delete a.dataset.filled,r.active?a.dataset.active="true":delete a.dataset.active,r.edited?(a.dataset.edited="true",a.setAttribute("aria-label",`${r.label}, edited`)):(delete a.dataset.edited,a.removeAttribute("aria-label")))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Ht(n){const e=n.dataset.ncLastFill||null,t=ui(e);n.dataset.ncLastFill=t;const i=pi(t);if(i)for(const[a,o]of Object.entries(i))n.style.setProperty(a,o)}function Yi(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=o=>{if(i===o)return;i=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),a(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>a(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||a(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),a(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function Xi(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=p=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,i.append(m),m},o=a("Note"),r=a("Accent");r.dataset.ncAccentMode="";const c=p=>{for(const m of[o,r]){const w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};c(o);for(const p of[o,r])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const m=r.getAttribute("aria-checked")==="true"?o:r;c(m),m.focus()});const l=document.createElement("div");l.className="nc-step-tools",l.append(i),n.onFill&&l.append(Yi(t,e)),t.append(l);for(const p of n.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1)),w.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid")return;const E=k.rows.findIndex(S=>S.id===p.id);k.onSelectRow?.(E)}),w.addEventListener("keydown",k=>Ji(t,w,k));const x=[];for(const k of["mute","solo"]){if(!(k==="mute"?n.onMute:n.onSolo))continue;const S=document.createElement("span");S.className="nc-ms-wrap";const M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=k,M.textContent=k==="mute"?"M":"S",M.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${p.label}`),S.append(M,Q()),S.addEventListener("click",()=>{const N=e(t);if(N?.type!=="stepGrid")return;const G=N.rows.findIndex(X=>X.id===p.id);(k==="mute"?N.onMute:N.onSolo)?.(G)}),x.push(S)}const v=document.createElement("div");v.className="nc-steps";for(let k=0;k<p.steps.length;k++){const E=document.createElement("span");E.className="nc-step-wrap";const S=document.createElement("button");S.type="button",S.className="nc-step",S.dataset.ncStep=`${p.id}:${k}`,S.setAttribute("aria-label",`${p.label} step ${k+1}`),E.append(S,Q()),E.addEventListener("click",M=>{const N=e(t);if(N?.type!=="stepGrid")return;const G=N.rows.findIndex(ie=>ie.id===p.id),X=r.getAttribute("aria-checked")==="true";N.onToggle(G,k,M.shiftKey||X)}),v.append(E)}if(m.append(...x,w,v),n.onDice){const k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=p.id,k.setAttribute("aria-label",`Surprise ${p.label} steps`),k.title=`New ${p.label} steps (Undo takes it back)`,k.innerHTML=pe(),k.append(Q()),k.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(S=>S.id===p.id))}),m.append(k)}m.addEventListener("click",k=>{if(k.target!==m)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(S=>S.id===p.id))}),ct(t,v,".nc-step-wrap",e,r,()=>p.id),t.append(m)}const d=document.createElement("div");d.className="nc-pads-head";const u=(p,m,w)=>{const x=document.createElement("button");return x.type="button",x.className=p,x.textContent=m,w&&x.setAttribute("aria-label",w),x},h=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),g=document.createElement("span");g.className="nc-pads-label",g.setAttribute("aria-live","polite");for(const[p,m]of[[h,-1],[b,1]])p.addEventListener("click",()=>{const w=e(t);if(w?.type!=="stepGrid"||w.rows.length===0)return;const x=w.rows.length;w.onSelectRow?.(((re(w)+m)%x+x)%x)});if(d.append(h,g,b),n.onDice){const p=u("nc-pads-step nc-pads-dice","","Surprise this lane's steps");p.dataset.ncPadsDice="",p.innerHTML=pe(),p.addEventListener("click",()=>{const m=e(t);if(m?.type!=="stepGrid")return;const w=re(m);w>=0&&m.onDice?.(w)}),d.append(p)}if(n.transport){const p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(p)}t.append(d);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const $=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<$;p++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{const x=e(t);if(x?.type!=="stepGrid")return;const v=re(x);if(v<0)return;const k=r.getAttribute("aria-checked")==="true";x.onToggle(v,p,w.shiftKey||k)}),y.append(m)}return ct(t,y,".nc-pad",e,r,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[re(p)]?.id:void 0}),t.append(y),t.append(P()),Ft(t,n),t}function re(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function ct(n,e,t,i,a,o){let r="on",c=!0,l=-1;const d=(u,h)=>{const b=u.rows[l]?.steps[h];!b||h>=u.rows[l].length||(u.onSet?u.onSet(l,h,r,c):!!b[r]!==c&&u.onToggle(l,h,r==="accent"))};Si(e,t,u=>{const h=i(n);if(h?.type==="stepGrid"){if(u.kind==="paint"){if(u.phase==="start"){const b=o();l=h.rows.findIndex(y=>y.id===b);const g=h.rows[l]?.steps[u.pad];if(!g)return;r=a.getAttribute("aria-checked")==="true"?"accent":"on",c=!g[r]}d(h,u.pad)}else if(u.kind==="long"){const b=o(),g=h.rows.findIndex($=>$.id===b),y=e.querySelectorAll(t)[u.pad];g>=0&&y instanceof HTMLElement&&h.onLongPress?.(g,u.pad,y)}}})}function Ji(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let o=a;t.key==="ArrowDown"?o=a+1:t.key==="ArrowUp"?o=a-1:t.key==="Home"?o=0:o=i.length-1;const r=i[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function Ft(n,e){const t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label");o&&a&&(o.textContent=`${a.label} · 1–${a.length}`);const r=n.querySelector("[data-nc-pads-play]");if(r instanceof HTMLElement){const c=!!e.transport?.playing;r.textContent=c?"Stop":"Play",r.setAttribute("aria-pressed",c?"true":"false")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const c=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const l of i.querySelectorAll("[data-nc-pad]")){const d=Number(l.getAttribute("data-nc-pad")),u=a.steps[d];l instanceof HTMLButtonElement&&(l.hidden=!u||d>=a.length,l.setAttribute("aria-label",`${a.label} step ${d+1}`),l.setAttribute("aria-pressed",u?.on?"true":"false"),u?.accent?l.dataset.accent="true":delete l.dataset.accent,u?.dim?l.dataset.dim="true":delete l.dataset.dim,e.playhead>=0&&d===c?l.dataset.playhead="true":delete l.dataset.playhead)}}for(const c of e.rows)for(let l=0;l<c.steps.length;l++){const d=c.steps[l],u=n.querySelector(`[data-nc-step="${c.id}:${l}"]`);if(!(u instanceof HTMLButtonElement))continue;const h=u.closest(".nc-row");if(h instanceof HTMLElement){e.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;const g=h.querySelector(".nc-name");g instanceof HTMLElement&&g.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(const $ of h.querySelectorAll("[data-nc-ms]")){const p=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",p?"true":"false")}}u.setAttribute("aria-pressed",d.on?"true":"false"),d.accent?u.dataset.accent="true":delete u.dataset.accent,d.dim?u.dataset.dim="true":delete u.dataset.dim,l%4===0?u.dataset.bar="true":delete u.dataset.bar,typeof d.velocity=="number"?(u.dataset.velocity="true",u.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,d.velocity))*100)}%`)):(delete u.dataset.velocity,u.style.removeProperty("--level"));const b=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;l===b?u.dataset.playhead="true":delete u.dataset.playhead,u.hidden=l>=c.length}}function Zi(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,P()),e}function Qi(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(Rt(a,e));return t.append(P()),t}function es(n){return n.replace(/["\\]/g,"\\$&")}function ts(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&zt(t,i)}Ii(n)}const De="netcomposer.rhythm.hidden.v1",H=new WeakMap;function Ee(){try{return globalThis.localStorage??null}catch{return null}}function Ut(n,e=De){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function lt(n,e,t,i=De){const a=Ut(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function He(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function ns(n,e){if(!(!n||!e))return He(n).find(t=>t.id===e)}function is(n){return He(n).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(t=>`${t.id}/${t.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(t=>t.value).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.controls.map(t=>t.id).join(",")}`:`${e.type}:${e.id}`).join("|")}function ss(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=H.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ns(t,i)}function as(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=is(e);if(n.dataset.ncSignature===i){for(const a of t)for(const o of a.controls){const r=n.querySelector(`[data-nc-id="${os(o.id)}"]`);r instanceof Element&&q(r,o)}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const o=document.createElement("div");if(o.className="nc-section",o.dataset.ncSection=a.id,a.inset&&(o.dataset.ncInset="true"),a.title){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=a.title,o.append(r)}for(const r of a.controls)o.append(Rt(r,ss));n.append(o)}}function os(n){return n.replace(/["\\]/g,"\\$&")}function ge(n,e=De){Pt();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1";const i=Ut(Ee(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";const l=document.createElement("span");l.className="nc-index",l.dataset.ncIndex="",r.append(c,l);const d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",a.append(o,d,r);const u=document.createElement("div");u.className="nc-module-body",u.id=`${n.id}-body`;const h=document.createElement("button");h.type="button",h.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",h.append(b);const g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",t.append(g,a,u,h),t.setAttribute("aria-labelledby",o.id);const y=p=>{const m=H.get(t)??n;t.dataset.ncOpen=p?"false":"true",u.hidden=p,h.hidden=!p,c.textContent=p?"+":"−",c.setAttribute("aria-expanded",p?"false":"true"),c.setAttribute("aria-controls",u.id),c.setAttribute("aria-label",`${p?"Show":"Hide"} ${m.title}`),c.title=p?"Show":"Hide",p?t.dataset.ncSlim="":delete t.dataset.ncSlim};c.addEventListener("click",()=>{const p=t.dataset.ncOpen==="true";lt(Ee(),(H.get(t)??n).id,p,e),y(p),_e(t.parentElement)}),h.addEventListener("click",()=>{lt(Ee(),(H.get(t)??n).id,!1,e),y(!1),_e(t.parentElement)});const $={el:t,update(p){H.set(t,p),o.textContent=p.title,d.textContent=p.status??"",p.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),b.textContent=p.summary??p.title,h.setAttribute("aria-label",`Show ${p.title}`),as(u,p),y(u.hidden),$.redraw()},redraw(){const p=H.get(t);p&&ts(t,He(p))}};return H.set(t,n),y(i),$.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>$.redraw()).observe(t),$}function rs(n,e,t="adjacent"){Pt(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,o)=>{const r=o%4+1;a.el.dataset.ncShade=String(r),a.el.dataset.ncPlace=i;const c=a.el.querySelector("[data-nc-index]");c&&(c.textContent=String(r).padStart(2,"0")),n.append(a.el),a.redraw()}),_e(n)}function _e(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols");return}const e=[...n.children].filter(t=>t instanceof HTMLElement&&t.classList.contains("nc-module")).map(t=>t instanceof HTMLElement&&t.hasAttribute("data-nc-slim")?s("module-slim-column"):"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",e.join(" "))}const qt="petra-rhythm.state",Gt=1,cs=400,ls=2e3;function ds(n){return JSON.stringify({v:Gt,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function us(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return Mt({...n,swing:t,fx:i,tracks:a}).ok}function ps(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Gt)return null;const t=Mt(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==he)return null;const o=a.slots.map(d=>d===null?null:d);if(!o.every(d=>d===null||us(i,d)))return null;const r=Number.isInteger(a.active)&&o[a.active]?a.active:null,c=e.selectedTrack,l=Number.isInteger(c)&&c>=0&&c<i.tracks.length?c:0;return{doc:i,bank:{slots:o,active:r},selectedTrack:l}}function hs(n,e,t=cs){let i,a=0,o="";const r=()=>{clearTimeout(i),i=void 0,a=0;try{const c=ds(e());if(c===o)return;n.setItem(qt,c),o=c}catch{}};return{schedule(){const c=Date.now();a||(a=c),clearTimeout(i),i=setTimeout(r,Math.min(t,Math.max(0,a+ls-c)))},flush:r}}function ms(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return ps(n.getItem(qt))}catch{return null}}const Me={maker:"PETRA",instrument:"RHYTHM",number:"01"},Kt="PETRA Rhythm";let dt=!1;function fs(){return`
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
`}function gs(n){const e=n.ownerDocument;if(!dt){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=fs(),e.head.append(c),dt=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=Me.number,i.append(`${Me.maker} `,a(),` ${Me.instrument} `,a()," ",o);const r=e.createElement("p");return r.className="petra-head-line",r.textContent="A NetComposer element.",t.append(i,r),n.before(t),t}function bs(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function ut(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const o=a+(e-i)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,c=performance.timeOrigin+o;return{playedMs:c,plusLatencyMs:c+r,latencyMs:r,stampContextTime:i,stampPerformanceTime:a}}class ys{doc=ii();bank=Ln();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=_n(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.bank=Nn(this.bank,e,this.doc),this.edited=null}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Cn(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}recall(e,t=this.morphSeconds){const i=Pn(this.bank,e,this.doc,t);return i.applied?(this.retireSparkle(),this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=i.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=Zn(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Yn(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e));return t===this.doc.swing?!1:(this.retireSparkle(),this.doc.swing=t,this.writeActive(),this.glidePending=0,!0)}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const ws=1400;function Ae(n,e,t,i=!1){return n==="store"?`Stored ${e}`:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function ks(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class $s{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},ws))}}const xs=50;function vs(n,e,t,i=xs){if(t)return 0;const a=n-e;return a>=i?0:i-a}class Ss{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=Li({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}const Ts="/rhythm/assets/processor-BXXz02Xc.js",Vt=new URLSearchParams(location.search),z=Vt.has("measure"),Es=!(z&&Vt.get("clockStepFix")==="0");let Ie=0;const Ms=.05;z&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[]);const te=[40,240],f=new ys,ce=z?null:ms(localStorage,location.search);ce&&(f.doc=ce.doc,f.bank=ce.bank,f.selectTrack(ce.selectedTrack));const Wt=z?null:hs(localStorage,()=>({doc:f.doc,bank:f.bank,selectedTrack:f.selectedTrack}));if(z){for(const e of f.doc.tracks)e.solo=e.voice==="kick";const n=f.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Ms)}const j=new fn({bpm:f.doc.bpm,minBpm:te[0],maxBpm:te[1],timebase:"shared"}),Fe=document.querySelector("#app");if(!(Fe instanceof HTMLElement))throw new Error("Missing #app");gs(Fe);const ne=new Ss(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let T=null;z&&(window.__audioInfo=()=>T?{sampleRate:T.sampleRate,outputLatency:T.outputLatency,baseLatency:T.baseLatency,state:T.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>be(),window.__clockStep=n=>{Ie=n},window.__debug=()=>({audio:T?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:T?.getOutputTimestamp?.()??null,currentTime:T?.currentTime??null,reanchors:U?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let ee=null,U=null,ze=0,Yt=0;function As(){return T?T.state==="running"?"running":T.state==="suspended"?"suspended":T.state==="interrupted"?"interrupted":"none":"needs-gesture"}const C=new Mn({app:Kt,version:"0.1.0",clock:j,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:te},audio:As,outputLatencyMs:()=>U?.outputLatencyMs??null,swing:()=>f.doc.swing});let pt="",Xt=!1,ht=Number.NEGATIVE_INFINITY,V=null;function Y(n=Le()){return j.transport.isPlayingAt(n)}function Re(n){if(!C.isLeader)return;const e=vs(performance.now(),ht,n);if(e>0){V===null&&(V=setTimeout(()=>{V=null,Re(!0)},e));return}V!==null&&(clearTimeout(V),V=null),C.publishState()&&(ht=performance.now())}function mt(){return Xt?Xn(f.doc).tracks:f.doc.tracks}function L(){if(!ee||!U)return;const n=f.consumeGlide(),e=Math.round(U.offset*1e4)/1e4,t=hn(j.toSnapshot(),e,"audio"),i=JSON.stringify({offset:e,anchor:t.anchor,start:t.startTime,stop:t.stopTime,tempo:t.tempo,swing:f.doc.swing,glide:n??null,tracks:mt(),fx:f.doc.fx});if(i===pt)return;pt=i;const a={clock:t,measure:z,swing:f.doc.swing,fx:{...f.doc.fx},...n===void 0?{}:{glideSeconds:n},tracks:mt().map(o=>({id:o.id,voice:o.voice,length:o.length,mute:o.mute,solo:o.solo,steps:o.steps})),params:f.doc.tracks.map(o=>({voice:o.voice,params:{...o.params}}))};ee.port.postMessage({type:"state",state:a})}async function Ls(){if(!T){if(T=new AudioContext,z){const n=T,e=n.getOutputTimestamp.bind(n);n.getOutputTimestamp=()=>{const t=e(),i=!Ie||!t.contextTime?t:{contextTime:t.contextTime+Ie/1e3,performanceTime:t.performanceTime},a=window.__ts;return a&&a.length<2e5&&a.push([performance.timeOrigin+performance.now(),i.contextTime??0,i.performanceTime??0]),i}}U=new En(T,Es?{}:{stepThresholdMs:0}),U.onStep(n=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:n.stepSeconds*1e3,confirmedAt:n.confirmedAt,reanchors:n.reanchors}),L()}),U.start(),await T.audioWorklet.addModule(Ts),ee=new AudioWorkletNode(T,"rhythm"),ee.port.onmessage=n=>{if(n.data.level!==void 0&&n.data.step!==void 0&&(Yt=n.data.level,ze!==n.data.step&&(ze=n.data.step,A())),!(!z||!T)){for(const e of n.data.onsets??[]){const t=ut(T,e.contextTime);t&&window.__onsets?.push({app:Kt,beat:e.beat,contextTime:e.contextTime,hidden:document.hidden,stampAgeMs:(T.currentTime-e.contextTime)*1e3,...t})}for(const e of n.data.render??[]){const t=ut(T,e.contextTime);t&&window.__render?.push({contextTime:e.contextTime,peak:e.peak,playedMs:t.playedMs})}}},ee.connect(T.destination),L()}}async function be(){await Ls(),T&&(T.state!=="running"&&await T.resume(),Y()?j.stop({at:Le()}):j.play({at:Le()}))}const le=new $s(()=>A());function de(n,e){const t=kt[n]??"";if(e==="store")f.store(n),le.say(Ae(e,t,!0));else if(e==="clear"){const i=f.bank.slots[n]!=null;f.clear(n),le.say(Ae(e,t,i)),i&&ne.show(ye,`Slot ${t} cleared`)}else if(!f.recall(n))le.say(Ae(e,t,!1,matchMedia("(pointer: coarse)").matches));else{const i=f.morphSeconds>0?f.morphSeconds:0;C.sendSnapshot("recall",n,i>0?{glide:{seconds:i}}:{})}L(),A()}function ye(){f.undoSurprise()&&(ne.dismiss(),L(),A())}function Ns(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),ye();return}if(n.code==="Space"){n.preventDefault(),be();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=he||(n.preventDefault(),n.shiftKey?de(i,"store"):n.altKey?de(i,"clear"):de(i,"recall"))}function Cs(){return C.swing==null?"No session swing yet. There is no request message, so this slider stays on this tab.":"The leader sets swing. This slider shows that value. A local edit would stay on this tab."}function Jt(){const n=Y(),e=C.swing;return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:le.text,controls:[{type:"button",id:"play",label:n?"Stop":"Play",on:n,onPress:()=>void be(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{f.surprise(),L(),A(),ne.show(ye)}},{type:"slider",id:"bpm",label:"Tempo",min:te[0],max:te[1],step:1,value:j.transport.bpm,onChange:t=>{f.doc.bpm=t,j.setTempo({bpm:t}),L(),A()}},{type:"slider",id:"swing",label:C.isLeader?"Swing":e==null?"Swing (local)":"Swing (leader)",min:.5,max:.75,step:.01,value:C.isLeader?f.doc.swing:e??f.doc.swing,disabled:!C.isLeader,modulated:!C.isLeader&&e!=null,onChange:t=>{C.isLeader&&(f.edit(i=>{i.swing=t}),Re(!1),L(),A())},onCommit:()=>{Re(!0)}},...C.isLeader?[]:[{type:"note",id:"swing-note",text:Cs()}],...C.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:C.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:f.morphSeconds,morphText:ks(f.morphSeconds),slots:kt.map((t,i)=>({label:t,filled:f.bank.slots[i]!=null,active:f.bank.active===i,edited:f.edited===i})),onMorph:t=>{f.morphSeconds=t,A()},onSlot:(t,i)=>{de(t,i)}}]}}function je(){const n=f.doc.tracks.length;return n===0?0:Math.min(f.selectedTrack,n-1)}function Zt(){const n=f.doc.tracks[je()];return{id:"pattern",title:"Pattern",summary:n?`${f.doc.tracks.length} tracks · ${n.name}`:`${f.doc.tracks.length} tracks`,controls:[{type:"stepGrid",transport:{playing:Y(),onToggle:()=>void be()},id:"grid",playhead:Y()?ze:-1,selectedRow:n?.id,onSelectRow:e=>{f.selectTrack(e),A()},onDice:e=>{const t=f.doc.tracks[e]?.name??"Lane";f.diceLane(e)&&(L(),A(),ne.show(ye,`New ${t} steps`))},onFill:e=>{Xt=e,L(),A()},onMute:e=>{f.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),L(),A()},onSolo:e=>{f.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),L(),A()},onToggle:(e,t,i)=>{f.edit(a=>{const o=a.tracks[e]?.steps[t];o&&(i?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),L(),A()},onLongPress:(e,t,i)=>{const a=f.doc.tracks[e],o=a?.steps[t];!a||!o||Ni({anchor:i,title:`${a.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:c})=>{f.edit(l=>{const d=l.tracks[e]?.steps[t];d&&(d.on=!0,d.velocity=r,d.probability=c>=1?void 0:c)}),L(),A()}})},onSet:(e,t,i,a)=>{f.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(i==="accent"?(r.accent=a,a&&(r.on=!0)):(r.on=a,a||(r.accent=!1)))}),L(),A()},rows:f.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]}}function Qt(){const n=je(),e=f.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"voice",title:e?.name??"Voice",summary:e?`level ${e.params.level.toFixed(2)}`:"",sections:[{id:"lane",controls:[{type:"choice",id:"track",label:"Track",value:e?.id??"",options:f.doc.tracks.map(i=>({value:i.id,label:i.name})),onChange:i=>{const a=f.doc.tracks.findIndex(o=>o.id===i);f.selectTrack(a),A()}}]},{id:"sound",inset:!0,controls:t.map(i=>({type:"slider",id:i,label:i,min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{f.edit(o=>{const r=o.tracks[je()];r&&(r.params[i]=a)}),L(),A()}}))}]}}function en(){return{id:"filter",title:"Filter",summary:f.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:f.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{f.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),L(),A()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:f.doc.fx.cutoff,onChange:n=>{f.edit(e=>{e.fx.cutoff=n}),L(),A()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:f.doc.fx.mode,cutoff:f.doc.fx.cutoff,resonance:f.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Yt}]}}const tn=ge(Jt()),nn=ge(Zt()),sn=ge(Qt()),an=ge(en());function A(){f.takeSurpriseEdit()&&ne.dismiss(),tn.update(Jt()),nn.update(Zt()),sn.update(Qt()),an.update(en()),Wt?.schedule()}window.addEventListener("pagehide",()=>Wt?.flush());j.onChange(()=>{f.playing=Y(),f.doc.bpm=j.transport.bpm,L(),A()});C.onSwing(n=>{f.adoptSwing(n)&&(L(),A())});C.onSnapshot(n=>{n.op==="recall"&&f.recall(n.slot,n.glide?.seconds??0)&&(L(),A())});C.onRole(()=>A());C.onPeers(()=>A());await C.start();document.addEventListener("keydown",Ns);rs(Fe,[tn,nn,sn,an],"adjacent");A();setInterval(()=>{const n=Y();if(n!==f.playing&&(f.playing=n,A()),L(),!z||!T)return;const e=bs(T);e&&window.__stamps?.push(e)},250);
