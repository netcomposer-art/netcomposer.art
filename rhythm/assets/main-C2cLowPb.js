(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const K=1e-9;function on(n,e,t,s=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,s))}class je{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return on(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const s=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,c)=>r.beat-c.beat);let a=s.length?s[0].bpm:this.bpm;for(const r of s)r.beat<=e.beat+K&&(a=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const r of s){if(r.beat<=e.beat+K)continue;const c=this.clamp(r.bpm);c!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+K){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-K;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,s,a=.25){const o=this.bpmAt(t);if(!(s>0)||!(a>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(s/a));this.setTempoAt(o,t);for(let c=1;c<=r;c++)this.setTempoAt(o+(e-o)*c/r,t+s*(c-1)/r)}prune(e){let t=0;for(let s=1;s<this.segs.length;s++)this.segs[s].beat<=e&&(t=s);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new je({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const s=this.segs[t-1];this.segs[t].time=s.time+(this.segs[t].beat-s.beat)*60/s.bpm}}segAtBeat(e){const t=this.segs;for(let s=t.length-1;s>0;s--)if(t[s].beat<=e+K)return t[s];return t[0]}segAtTime(e){const t=this.segs;for(let s=t.length-1;s>0;s--)if(t[s].time<=e+K)return t[s];return t[0]}}const rn=Object.freeze({beatsPerBar:4,beatUnit:4}),W=1e-9;function cn(n){return Math.floor(n+W)}function mt(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-W)*e;return t&&a<=n+W?a+e:a}class ln{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new je({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??rn}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-W&&(this.stopTime===null||e<this.stopTime-W)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const s=this.tempo.anchor;return this.tempo.setTempoAt(e,s.beat),s.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-W?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),s=cn(e/t),a=Math.max(0,e-s*t);return{beat:e,bar:s,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return mt(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ft="nc-clock/snapshot",gt=1;function dn(n,e="local"){return{format:ft,version:gt,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function un(n,e){const t=hn(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function pn(n,e,t=n.timebase){const s=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:s(n.startTime),stopTime:s(n.stopTime)}}const R=n=>typeof n=="number"&&Number.isFinite(n),We=n=>n===null||R(n);function hn(n){const e=n,t=s=>{throw new TypeError(`Invalid nc-clock snapshot: ${s}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==ft&&t("format"),(!R(e.version)||Math.floor(e.version)!==gt)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!R(e.anchor.beat)||!R(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(s=>s&&R(s.beat)&&R(s.bpm)&&s.bpm>0))&&t("tempo"),(!e.meter||!R(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!R(e.meter.beatUnit))&&t("meter"),(!We(e.startTime)||!We(e.stopTime)||!R(e.stoppedBeat))&&t("transport times"),e}class mn{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ln(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,s){this.transport.start({at:e,beat:t,bpm:s}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const s=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:s,bpm:this.transport.tempo.bpmAt(s)})}applySnapshot(e){un(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return dn(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const fn="nc-sync/1",gn=1,bn="nc-sync",yn="nc-sync-leader",wn=0,bt=.5,yt=.75;function kn(n){return typeof n=="number"&&Number.isFinite(n)&&n>=bt&&n<=yt?n:null}const ke=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),J=n=>typeof n=="number"&&Number.isFinite(n),ie=n=>typeof n=="string"&&n.length>0;function $n(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==gn||!ie(e.type)||!ie(e.from)||!J(e.term)||!J(e.seq)||!J(e.sentAt))return null;switch(e.type){case"hello":return ie(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return J(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&J(e.slot)?e:null;case"ping":case"pong":return ie(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function vn(n,e,t,s,a){return{proto:fn,from:e,term:t,seq:s,sentAt:a,...n}}function Me(){return(performance.timeOrigin+performance.now())/1e3}function Ye(n){const e=n.slice().sort((s,a)=>s-a),t=e.length>>1;return e.length%2?e[t]:(e[t-1]+e[t])/2}class xn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets=[],this.pendingStep=null,this.pendingCount=0,this.readLatency(!0),this.sample()};stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;stepCount=0;stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50}get reanchors(){return this.stepCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,s=e?.performanceTime??0;if(!(t>0&&s>0)||!Number.isFinite(t)||!Number.isFinite(s))return!1;const a=t-(this.timeOrigin+s)/1e3,o=a-Ye(this.offsets);if(Math.abs(o)<=this.stepThreshold)return this.pendingStep=null,this.pendingCount=0,!1;if(this.pendingStep!==null&&Math.abs(o-this.pendingStep)<this.stepThreshold/2){if(++this.pendingCount<this.stepConfirmations)return!1;this.offsets=[a],this.pendingStep=null,this.pendingCount=0,this.stepCount++;const r={stepSeconds:o,confirmedAt:this.ctx.currentTime,reanchors:this.stepCount};for(const c of[...this.stepListeners])c(r);return!0}return this.pendingStep=o,this.pendingCount=1,this.stepConfirmations===1?this.checkStep():!1}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const s=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;return s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>0&&s.performanceTime>0?t=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3:(!s||!(s.contextTime>0))&&e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow()),t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>0}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?Ye(this.offsets):this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.ctx.addEventListener?.("statechange",this.onSink))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onSink)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const s=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(s)&&s>0?s:Number.isFinite(a)&&a>0?a:null}}class Sn{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...ke,...e.capabilities},this.channelOption=e.channel??bn,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,s={}){this.send({type:"snapshot",op:e,slot:t,...s})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const s=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(s),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,s){const[a,o]=this.tempoRange();e=Math.min(o,Math.max(a,e));const r=this.clock.transport,c=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const l=r.beatAt(c+this.o.minLeadSeconds),d=Math.max(t??mt(l,1),l);s&&s>0?(r.tempo.rampTempo(e,d,s),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const s of this.peers.values())e=Math.max(e,s.capabilities.tempoRange[0]),t=Math.min(t,s.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(yt,Math.max(bt,e)):wn;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=kn(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const s of[...this.swingListeners])s(t)}}receive(e){const t=$n(e);if(!t||t.from===this.id)return;const s=this.lastSeq.get(t.from);if(!(s!==void 0&&t.seq<=s)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...ke,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...ke},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(yn,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,c)=>[o?0:1,r,c];let s=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(a===null||r[0]<s[0]||r[0]===s[0]&&(r[1]<s[1]||r[1]===s[1]&&r[2]<s[2]))&&(s=r,a=o.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const s=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return s[0]!==a[0]?s[0]<a[0]:s[1]!==a[1]?s[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const s of[...this.peers.values()]){const a=(s.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-s.lastSeen>a&&(this.peers.delete(s.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(vn(e,this.id,this.term,++this.seq,this.o.now()))}}const Tn=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],pe=10,wt=["1","2","3","4","5","6","7","8","9","0"];function En(){return{slots:Array.from({length:pe},()=>null),active:null}}function Oe(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function An(n,e,t){const s=n.slots.slice();return s[e]=Oe(t),{slots:s,active:e}}function Mn(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Ln(n,e,t,s){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:s>0?s:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function Nn(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=Oe(e),{slots:t,active:n.active}}const Cn=16,Pn=[2,6,10,14],In=[2,3,6,10,11,14],Xe=[0,2,4,6,8,10,12,14],_n=[2,6,10,14],zn=[1,3,7,9,11,15],Rn={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function D(){return Array.from({length:Cn},()=>!1)}function O(n,e,t,s=!1){const a=e+n()*(t-e);return s?Math.round(a):Math.round(a*100)/100}function $e(n,e,t){return O(n,Math.max(0,e-t),Math.min(1,e+t))}function jn(n){const e=D();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],s=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[s]=!0),e}function On(n){const e=D();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Pn.filter(()=>n()<.22);for(const s of t.slice(0,2))e[s]=!0;return e}function Bn(n,e){const t=D();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Dn(n,e){const t=D();let s=0;for(const a of In)s>=3||n[a]||e()<.35&&(t[a]=!0,s+=1);return t}function Hn(n){const e=D();let t=0;for(const s of _n){if(t>=2)break;n()<.4&&(e[s]=!0,t+=1)}return e}function Fn(n,e){const t=D();for(const r of Xe)t[r]=!n[r];const s=Xe.filter(r=>t[r]&&r!==0),a=1+Math.floor(e()*3);for(let r=0;r<a&&s.length>0;r+=1){const c=Math.floor(e()*s.length),l=s.splice(c,1)[0];l!==void 0&&(t[l]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function qn(n,e){const t=D(),s=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const o of s){if(a>=3)break;e()<.45&&(t[o]=!0,a+=1)}return t}function Un(n,e,t){const s=D();let a=0;for(const o of zn)a>=2||n[o]||e[o]||t()<.35&&(s[o]=!0,a+=1);return s}function kt(n,e,t){return Array.from({length:e},(s,a)=>{const o=n[a]===!0,r=o&&t(a);return{on:o,accent:r,velocity:r?1:.8}})}function $t(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function Gn(n,e,t){const s=Rn[n];return{tune:O(t,s.tune[0],s.tune[1],!0),decay:O(t,s.decay[0],s.decay[1]),tone:$e(t,e.tone,.15),snap:$e(t,e.snap,.15),drive:$e(t,e.drive,.1),level:O(t,s.level[0],s.level[1])}}function vt(n){const e=jn(n),t=On(n),s=Hn(n);return{kick:e,snare:t,clap:Bn(t,n),rim:Dn(e,n),hat:Fn(s,n),hatOpen:s,tom:qn(t,n),metal:Un(e,t,n)}}function Kn(n,e,t){const s=n.tracks[e];if(!s)return n;const a=c=>c.every((l,d)=>l.on===(s.steps[d]?.on??!1));let o=s.steps;for(let c=0;c<6;c++){const l=vt(t)[s.voice];if(o=kt(l,s.length,d=>$t(s.voice,d)),!a(o)&&o.some(d=>d.on))break}const r=s.steps.slice(s.length);return{...n,tracks:n.tracks.map((c,l)=>l===e?{...c,steps:[...o,...r]}:c)}}function Vn(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),s=e.steps.map((a,o)=>{if(o<t||o>=e.length)return a;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:s}})}}function Wn(n,e){const t=vt(e),s=e()<.4?.5:O(e,.5,.62),a=e(),o=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:s,fx:{mode:o,cutoff:O(e,.55,.9),resonance:O(e,.05,.3),drive:O(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:Gn(r.voice,r.params,e),steps:kt(t[r.voice],r.length,c=>$t(r.voice,c))}))}}function Yn(n,e=Math.random){const t=[];let s=null;for(let o=0;o<pe;o+=1){const r=Oe(Wn(n,e));t.push(r),o===0&&(s=r)}const a=s?{...n,bpm:n.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)}:n;return{bank:{slots:t,active:0},document:a}}const xt="netcomposer.rhythm",St=1,Tt="netcomposer.rhythm.preset.",Xn=new Set(Tn);function Jn(n){return`${Tt}${n}`}function Et(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==xt&&e.push("Unknown format"),t.version!==St&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(Tt))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const s of t.tracks)Xn.has(s.voice)||e.push(`Unknown voice ${s.voice}`),(!Number.isInteger(s.length)||s.length<1||s.length>64)&&e.push(`Bad length on ${s.id}`),(!Array.isArray(s.steps)||s.steps.length<s.length)&&e.push(`Steps shorter than length on ${s.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function Zn(n,e=[]){return Array.from({length:16},(t,s)=>({on:n.includes(s),accent:e.includes(s),velocity:e.includes(s)?1:.8}))}const Qn={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function es(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:xt,version:St,id:Jn("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Zn(e.on,e.accent),params:{...Qn[e.voice]}}))}}const ts="nc-ui",ns={breakpoint:{md:"768px"}},At={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},F={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"toast-duration":5500},ae=n=>`--${ts}-${n}`,Le=At["label-on-fill-dark"],Je=At["label-on-fill-light"],ss=F["label-min-contrast"],is=/^#[0-9a-f]{6}$/i,as=n=>typeof n=="string"&&is.test(n),ve=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Ze(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const s=e*Math.min(t,1-t),a=o=>{const r=(o+n/30)%12;return t-s*Math.max(-1,Math.min(r-3,9-r,1))};return`#${ve(a(0)*255)}${ve(a(8)*255)}${ve(a(4)*255)}`}function Mt(n){const[e,t,s]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),a=Math.max(e,t,s),o=Math.min(e,t,s),r=(a+o)/2,c=a-o;if(!c)return{h:0,s:0,l:r};const l=c/(1-Math.abs(2*r-1));return{h:((a===e?60*((t-s)/c%6):a===t?60*((s-e)/c+2):60*((e-t)/c+4))+360)%360,s:l,l:r}}function Qe(n){const[e,t,s]=[1,3,5].map(a=>{const o=parseInt(n.slice(a,a+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*s}function Ne(n,e){const[t,s]=[Qe(n),Qe(e)].sort((a,o)=>o-a);return(t+.05)/(s+.05)}const de=n=>Ne(n,Le)>=Ne(n,Je)?Le:Je;function Lt(n,e,t,s=ss){let a=Ze(n,e,t);const o=de(a)===Le?1:-1;for(let r=0;r<40&&Ne(a,de(a))<s;r++)t+=o*.01,a=Ze(n,e,t);return a}function os(n){const{h:e,s:t}=Mt(n),s=Lt(e,Math.min(t,F["surprise-on-max-saturation"]),F["surprise-on-lightness"]);return{fill:n,ink:de(n),on:s,onInk:de(s)}}const rs=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function cs(n,e=Math.random){const[t,s]=F["surprise-saturation"],[a,o]=F["surprise-lightness"],r=F["surprise-min-hue-gap"],c=as(n)?Mt(n).h:null;let l=e()*360;return c!==null&&rs(l,c)<r&&(l=(c+r+e()*(360-2*r))%360),Lt(l,t+e()*(s-t),a+e()*(o-a))}function ls(n){if(!n)return null;const e=os(n);return{[ae("surprise-fill")]:e.fill,[ae("surprise-ink")]:e.ink,[ae("surprise-on")]:e.on,[ae("surprise-on-ink")]:e.onInk}}const ds=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],us={renames:ds},ps={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length"},hs={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},ms={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color"},he={};for(const[n,e]of Object.entries(ps))he[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(ms))he[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(hs))he[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(us.renames.map(n=>[n.old,n.new]));function Nt(n){const e=he[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function B(n){return Nt(n).prop}function i(n){return`var(${B(n)})`}function fs(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(B(e)));return Number.isFinite(t)?t:0}function _(n,e){const t=Nt(e),s=n.ownerDocument??document,a=s.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=o:t.kind==="opacity"?a.style.opacity=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=o:a.style.color=o,(n instanceof Element?n:s.documentElement).append(a);const l=(s.defaultView??window).getComputedStyle(a),d=t.kind==="family"?l.fontFamily:t.kind==="color"?l.color:t.kind==="opacity"?l.opacity:l.paddingLeft;return a.remove(),d}function gs(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function bs(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=i("font-ui"),t.style.fontSize=i("label-size"),t.style.fontWeight=i("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const ys="[data-modulated], [data-modulated] *";function ws(){const n=s=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${s}"],
    .nc-fx[data-nc-depth="${s}"] {
      background: ${i(`module-bg-stack-${s}`)};
      ${B("text-sub")}: ${i(`module-sub-stack-${s}`)};
      ${B("divider")}: ${i(`module-div-stack-${s}`)};
    }`,e=s=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${s}"] { background: ${i(`module-bg-adjacent-${s}`)}; }`,t=s=>s<4?`.nc-module[data-nc-shade="${s}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${s+1}`)}; }`:`.nc-module[data-nc-shade="${s}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${B("text-sub")}: ${i("module-sub-stack-1")};
      ${B("divider")}: ${i("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${i("surface-page")};
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("body-size")};
  font-weight: ${i("title-weight")};
  line-height: ${i("rhythm.label-leading")};
}
button, input, select { font: inherit; color: inherit; }
.nc [hidden] { display: none !important; }
.nc-stack { display: flex; flex-direction: column; min-width: 0; }
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
${[1,2,3,4].map(n).join(`
`)}
${[1,2,3,4].map(t).join(`
`)}
.nc-module-hd {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${i("rhythm.header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${i("rhythm.head-margin")}; }
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
.nc-module-end { display: flex; align-items: baseline; gap: ${i("rhythm.header-gap")}; flex: none; }
.nc-index {
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  color: ${i("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${i("rhythm.control-gap")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("body-size")};
  line-height: ${i("rhythm.label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${i("rhythm.module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${i("rhythm.module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${i("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("rhythm.control-gap")};
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
.nc-section { display: flex; flex-direction: column; gap: ${i("rhythm.module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${i("rhythm.module-gap")};
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
/* The slider gives up width, not the label: TEMPO, SWING and DECAY are never cut to "TE…". */
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. */
.nc-field .nc-label { flex: none; min-width: ${i("rhythm.name-width")}; }
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${i("rhythm.module-gap")};
  row-gap: ${i("rhythm.control-gap")};
  padding-bottom: ${i("rhythm.module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
.nc-field[data-nc-slider] .nc-readout { grid-area: value; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
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
  height: ${i("rhythm.slider-block")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${i("accent")};
}
.nc-range:disabled { opacity: ${i("disabled-opacity")}; cursor: not-allowed; }
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
${ys} { transition: none; }
.nc-range:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("rhythm.control-gap")}; }
.nc-btn {
  width: 100%;
  border: ${i("hairline")} solid ${i("text")};
  background: transparent;
  color: ${i("text")};
  padding: ${i("rhythm.button-pad-y")} 0;
  font-size: ${i("readout-size")};
  letter-spacing: ${i("rhythm.button-tracking")};
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
  outline-offset: ${i("rhythm.control-gap")};
}
.nc-btn:disabled { opacity: ${i("disabled-opacity")}; }
.nc-toggle {
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  color: ${i("text-sub")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  padding: ${i("rhythm.control-gap")} 0;
  cursor: pointer;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${i("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${i("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${i("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${i("rhythm.track-solo")};
  border-bottom-color: ${i("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("rhythm.control-gap")};
}
.nc-seg {
  display: inline-flex;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  overflow: hidden;
  margin-bottom: ${i("rhythm.module-gap")};
}
.nc-seg > button {
  flex: 1 1 0;
  min-height: ${i("target-min")};
  min-width: ${i("target-min")};
  padding: 0 ${i("rhythm.header-gap")};
  border: 0;
  border-inline-end: ${i("hairline")} solid ${i("divider")};
  background: transparent;
  color: ${i("text-sub")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: ${i("transition-feedback")};
}
.nc-seg > button:last-child { border-inline-end: 0; }
.nc-seg > button:hover { color: ${i("text")}; }
.nc-seg > button[aria-checked="true"] { background: ${i("text")}; color: ${i("surface-page")}; }
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
  padding: ${i("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:focus-visible { outline: none; border-bottom-color: ${i("accent")}; }
.nc-slot-row { gap: ${i("slot-gap")}; }
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
  line-height: ${i("rhythm.label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${i("text-sub")}; }
.nc-snap[data-filled="true"] {
  background: ${i("surprise-fill")};
  border-color: ${i("surprise-fill")};
  color: ${i("surprise-ink")};
}
.nc-snap[data-active="true"] {
  background: ${i("surprise-on")};
  border-color: ${i("surprise-on")};
  color: ${i("surprise-on-ink")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${i("rhythm.control-gap")};
  right: ${i("rhythm.control-gap")};
  width: ${i("rhythm.control-gap")};
  height: ${i("rhythm.control-gap")};
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
.nc-morph-label {
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  color: ${i("text-sub")};
  white-space: nowrap;
}
.nc-morph {
  flex: 1 1 ${i("rhythm.morph-max")};
  width: ${i("rhythm.morph-max")};
  min-width: ${i("rhythm.morph-min")};
  max-width: ${i("rhythm.morph-max")};
}
.nc-morph-readout {
  flex: 0 0 ${i("rhythm.morph-readout")};
  width: ${i("rhythm.morph-readout")};
  text-align: right;
  font-size: ${i("readout-size-small")};
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
  gap: ${i("rhythm.header-gap")};
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
  flex: 0 1 ${i("rhythm.name-width")};
  width: ${i("rhythm.name-width")};
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
/* A small gap every 4 steps, so beats read at a glance (one beat = one pad row on phones). */
.nc-steps > .nc-step-wrap:nth-child(4n + 1):not(:first-child) { margin-inline-start: ${i("rhythm.control-gap")}; }
/* The selected lane is lit, not just underlined: a tinted row with an accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${i("module-bg-adjacent-4")};
  box-shadow: inset calc(${i("focus-width")} * 2) 0 0 ${i("accent")};
}
.nc-row[data-selected="true"] .nc-name {
  color: ${i("text")};
  text-decoration: underline;
  text-decoration-color: ${i("accent")};
  text-decoration-thickness: ${i("hairline")};
  text-underline-offset: ${i("rhythm.control-gap")};
}
/* Muted, or silenced by another lane's solo: the lane's steps dim, not just its button. */
.nc-row[data-silent="true"] .nc-steps { opacity: ${i("rhythm.probability-dim")}; }
.nc-name[data-nc-lane="1"] { color: ${i("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${i("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${i("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${i("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${i("rhythm.slider-block")};
  height: ${i("rhythm.slider-block")};
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
  max-height: ${i("rhythm.slider-block")};
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
/* Readable grid: off = empty outline, on = solid, accent = the strongest fill. */
.nc-step[aria-pressed="true"] {
  background: ${i("rhythm.step-cell-on")};
  border-color: ${i("rhythm.step-cell-on")};
  color: ${i("rhythm.step-cell-ink")};
}
.nc-step[data-accent="true"] {
  background: ${i("rhythm.step-cell-accent")};
  border-color: ${i("rhythm.step-cell-accent")};
}
.nc-step[data-playhead="true"] {
  outline: ${i("hairline")} solid ${i("rhythm.playhead")};
  outline-offset: calc(${i("hairline")} * -1);
}
.nc-step[data-bar="true"] { border-bottom-color: ${i("rhythm.bar-accent")}; }
.nc-step[data-dim="true"] { opacity: ${i("rhythm.probability-dim")}; }
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
  gap: ${i("rhythm.module-gap")};
  margin-bottom: ${i("rhythm.module-gap")};
}
.nc-step-tools > .nc-seg { margin-bottom: 0; }
.nc-row-dice { flex: none; margin-inline: ${i("rhythm.control-gap")} 0; }
.nc-pads-dice svg { width: calc(${i("target-min")} / 3); height: calc(${i("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${i("rhythm.module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
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
.nc-pads-play { padding-inline: ${i("rhythm.module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${i("text")}; border-color: ${i("text")}; color: ${i("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
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
  padding: ${i("rhythm.control-gap")} ${i("rhythm.module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
.nc-pad[aria-pressed="true"] {
  background: ${i("rhythm.step-cell-on")};
  border-color: ${i("rhythm.step-cell-on")};
  color: ${i("rhythm.step-cell-ink")};
}
.nc-pad[data-accent="true"] {
  background: ${i("rhythm.step-cell-accent")};
  border-color: ${i("rhythm.step-cell-accent")};
  color: ${i("rhythm.step-cell-ink")};
}
.nc-pad[data-playhead="true"] {
  outline: ${i("focus-width")} solid ${i("rhythm.playhead")};
  outline-offset: ${i("hairline")};
}
.nc-pad[data-dim="true"], .nc-pads[data-silent="true"] { opacity: ${i("rhythm.probability-dim")}; }
.nc-pad:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-step:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-fx {
  margin-inline: calc(${i("module-pad")} * -1);
  padding: ${i("stack-card-pad-y")} ${i("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-fx-name {
  margin: 0 0 ${i("rhythm.module-gap")} 0;
  font-size: ${i("body-size")};
  font-weight: ${i("rhythm.hack-weight")};
  white-space: nowrap;
}
.nc-canvas {
  width: 100%;
  height: ${i("rhythm.display-height")};
  display: block;
  background: transparent;
}
.nc-note {
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
  width: ${i("rhythm.knob-size")};
  height: ${i("rhythm.knob-size")};
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
  top: ${i("rhythm.control-gap")};
  width: ${i("hairline")};
  height: ${i("rhythm.control-gap")};
  background: ${i("text")};
  transform-origin: center ${i("rhythm.module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${i("rhythm.control-gap")};
  min-width: 0;
}
.nc-choice {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  padding: ${i("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-choice[aria-selected="true"] {
  color: ${i("text")};
  border-bottom-color: ${i("accent")};
}
.nc-choice:focus-visible {
  outline: ${i("focus-width")} solid ${i("focus-ring")};
  outline-offset: ${i("hairline")};
}
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${i("rhythm.control-gap")};
  min-width: ${i("rhythm.name-width")};
  padding: ${i("rhythm.control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("divider")};
  color: ${i("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${i("rhythm.menu-item-min")};
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
@media (pointer: coarse) {
  .nc-menu-btn { min-height: ${i("target-min")}; }
  /* A 44 px touch band drawn at ASTRID's 20 px pitch: the extra height overlaps the gaps, not the rows. */
  .nc-field[data-nc-slider] .nc-range {
    height: ${i("target-min")};
    margin-block: calc((${i("rhythm.slider-block")} - ${i("target-min")}) / 2);
  }
  /* M and S: each a full 44 px box (the button paints smaller inside), touching, never overlapping. */
  .nc-ms-wrap { flex-basis: ${i("target-min")}; height: ${i("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${i("rhythm.module-gap")} * -1); }
  .nc-ms {
    inset: calc((${i("target-min")} - ${i("rhythm.slider-block")}) / 2);
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
    width: ${i("target-min")};
    height: ${i("target-min")};
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
  gap: ${i("rhythm.module-gap")};
  width: calc(${i("rhythm.name-width")} * 6);
  max-width: calc(100vw - 2 * ${i("rhythm.module-gap")});
  padding: ${i("rhythm.module-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("divider")};
  color: ${i("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  opacity: 1;
  outline: ${i("focus-width")} solid ${i("text")};
  outline-offset: ${i("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${i("text")}; opacity: ${i("rhythm.probability-dim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${i("rhythm.module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${i("rhythm.module-gap")};
  min-height: ${i("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${i("rhythm.name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${i("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${i("rhythm.name-width")}; text-align: right; }
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
  padding-bottom: calc(${i("rhythm.module-gap")} + env(safe-area-inset-bottom));
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
  line-height: ${i("rhythm.label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${i("motion-fade")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${i("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${i("toast-offset")} + env(safe-area-inset-top)); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${i("motion-fade-out")};
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
.nc-token-probe {
  position: absolute;
  width: ${i("hairline")};
  height: ${i("hairline")};
  overflow: hidden;
  clip-path: inset(50%);
  background: ${i("accent")};
  font-family: ${i("font-ui")};
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
    border-inline-end: ${i("hairline")} solid ${i("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")}; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${i("module-pad-y-desktop")} * -1);
    padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")};
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
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${i("rhythm.module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-fx {
    margin-inline: calc(${i("module-pad-x-desktop")} * -1);
    padding-inline: ${i("module-pad-x-desktop")};
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
    gap: ${i("rhythm.module-gap")};
    padding-block: ${i("rhythm.control-gap")};
    background: ${i("surface-page")};
    border-bottom: ${i("hairline")} solid ${i("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${i("rhythm.module-gap")};
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
  .nc-ui-toast, .nc-ui-toast[data-state="closing"],
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"] {
    transition: none;
    animation: none;
  }
}
`}let xe=null;function Ct(n=globalThis.document){if(!n?.documentElement||(n.documentElement,xe&&xe.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=ws(),n.head.append(e),xe=e}const Pt={slop:8,longPressMs:500,pitchPx:16};class ks{constructor(e,t,s=Pt){this.hit=e,this.emit=t,this.config=s,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,s,a){if(this.phase!=="idle")return!1;const o=this.hit(t,s);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=s,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,s,a){if(e!==this.pointer)return;const o=t-this.x0,r=s-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const c=Math.trunc(-r/this.config.pitchPx);c!==this.degrees&&(this.degrees=c,this.emit({kind:"pitch",pad:this.pad,degrees:c,phase:"move"}))}else if(this.phase==="paint"){const c=this.hit(t,s);c>=0&&c!==this.lastPad&&(this.lastPad=c,this.emit({kind:"paint",pad:c,phase:"enter"}))}}up(e,t,s,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,s,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function $s(n,e,t,s=Pt){let a=!1,o=0;const r=(d,u)=>{const b=n.ownerDocument.elementFromPoint?.(d,u),g=[...n.querySelectorAll(e)],y=b?g.findIndex(m=>m===b||m.contains(b)):-1;if(y>=0)return y;let $=-1,p=Number.POSITIVE_INFINITY;return g.forEach((m,w)=>{if(m.hidden)return;const v=m.getBoundingClientRect();if(u<v.top||u>v.bottom)return;const x=Math.abs(d-(v.left+v.width/2));x<p&&x<=v.width&&($=w,p=x)}),$},c=new ks(r,d=>{(d.kind==="paint"||d.kind==="long")&&(a=!0),t(d)},s),l=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",d=>{d.button>0||(a=!1,c.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(l(),o=setTimeout(()=>c.tick(performance.now()),s.longPressMs)))}),n.addEventListener("pointermove",d=>{c.state!=="idle"&&(c.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),c.state!=="pending"&&l())}),n.addEventListener("pointerup",d=>{l(),c.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),n.addEventListener("pointercancel",d=>{l(),c.cancel(d.pointerId)}),n.addEventListener("click",d=>{a&&(a=!1,d.stopPropagation(),d.preventDefault())},!0),n.addEventListener("contextmenu",d=>d.preventDefault()),c}const vs=F["toast-duration"];function xs({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function Ss(n,e,t,s){const a=c=>({top:c,bottom:c+t}),o=c=>n.some(l=>l&&l.bottom>c.top&&l.top<c.bottom),r=a(e-s-t);return o(r)?o(a(s))?"bottom":"top":"bottom"}function It(n,e,t,s,a,o){let r=n.bottom+a;const c=Math.max(o,Math.min(n.left,s-o-t.width));for(let l=!0,d=0;l&&d<8;d++){l=!1;for(const u of e)u&&u.bottom>r&&u.top<r+t.height&&u.right>c&&u.left<c+t.width&&(r=u.bottom+a,l=!0)}return{top:r,left:c}}const et="data-nc-ui-toast-live";function Ts(n,e){let t=e.querySelector(`[${et}]`);return t||(t=n.createElement("div"),t.setAttribute(et,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Es({message:n,actionLabel:e,onAction:t,duration:s=vs,onClose:a,avoid:o=[],anchor:r,host:c,document:l=globalThis.document}={}){c=c??l.body;const d=l.defaultView??globalThis,u=l.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const h=l.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,u.appendChild(h);let b=null;e&&(b=l.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),c.appendChild(u);let g="open";const y=I=>I&&typeof I.getBoundingClientRect=="function"?I.getBoundingClientRect():null,$=y(u),p=$?.height||44,m=d.getComputedStyle?.(u),w=Number.parseFloat(m?.getPropertyValue(B("toast-offset")))||16,v=Number.parseFloat(m?.getPropertyValue(B("toast-anchor-gap")))||8,x=y(r),k=d.innerHeight??0,E=o.map(y).filter(Boolean),S=x&&x.bottom>0&&x.top<k?It(x,E,{width:$?.width||0,height:p},d.innerWidth??0,v,w):null;S&&S.top+p<=k?(u.setAttribute("data-placement","anchor"),u.style.top=`${S.top+(d.scrollY??0)}px`,u.style.left=`${S.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Ss(E,k,p,w));const A=d.requestAnimationFrame?.bind(d)??(I=>setTimeout(I,16));A(()=>A(()=>{g==="open"&&u.setAttribute("data-state","open")})),Ts(l,c).textContent=xs({message:n,actionLabel:e});let N,G;const X=new Promise(I=>{G=I}),se=I=>{clearTimeout(N),N=setTimeout(()=>we("timeout"),I)};let ye=s,Fe=Date.now();const qe=()=>{g==="open"&&(clearTimeout(N),ye=Math.max(0,ye-(Date.now()-Fe)))},Ue=()=>{g==="open"&&(Fe=Date.now(),se(ye))};u.addEventListener("pointerenter",qe),u.addEventListener("pointerleave",Ue),u.addEventListener("focusin",qe),u.addEventListener("focusout",Ue),b?.addEventListener("click",()=>{if(g==="open")try{t?.()}finally{we("action")}}),Number.isFinite(s)&&se(s);function we(I="close"){if(g!=="open")return;g="closing",clearTimeout(N),u.setAttribute("data-state","closing"),a?.(I);const Ge=d.getComputedStyle?.(u),an=Ge?Math.max(0,...String(Ge.transitionDuration||"").split(",").map(Ve=>Number.parseFloat(Ve)*(Ve.trim().endsWith("ms")?1:1e3)||0)):0,Ke=()=>{g!=="gone"&&(g="gone",u.remove(),G(I))};u.addEventListener("transitionend",Ke),setTimeout(Ke,an+50)}return{el:u,close:we,closed:X}}function tt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function As({anchor:n,title:e,velocity:t,probability:s,onChange:a,onClose:o,host:r,document:c=globalThis.document}){r=r??c.body;const l=c.defaultView??globalThis,d={velocity:t,probability:s},u=c.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const h=c.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const b=c.createElement("div");b.className="nc-step-editor-head";const g=c.createElement("span");g.className="nc-label",g.textContent=e;const y=c.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",b.append(g,y),h.appendChild(b);const $=[];for(const[x,k]of[["velocity","Velocity"],["probability","Chance"]]){const E=c.createElement("label");E.className="nc-step-editor-row";const S=c.createElement("span");S.className="nc-label",S.textContent=k;const A=c.createElement("input");A.type="range",A.className="nc-range",A.min=x==="velocity"?"0.05":"0",A.max="1",A.step="0.05",A.value=String(d[x]),A.setAttribute("data-nc-edit",x);const N=c.createElement("output");N.className="nc-readout",N.textContent=tt(d[x]),A.setAttribute("aria-valuetext",N.textContent),A.addEventListener("input",()=>{d[x]=Number(A.value),N.textContent=tt(d[x]),A.setAttribute("aria-valuetext",N.textContent),a({velocity:d.velocity,probability:d.probability})}),E.append(S,A,N),h.appendChild(E),$.push(A)}if(r.append(u,h),n?.setAttribute?.("data-editing","true"),l.matchMedia?.(`(max-width: ${ns.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const x=n?.getBoundingClientRect?.(),k=h.getBoundingClientRect(),E=Number.parseFloat(l.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(x){let{top:S,left:A}=It(x,[],{width:k.width,height:k.height},l.innerWidth,E,E);S+k.height>l.innerHeight&&(S=Math.max(E,x.top-E-k.height)),h.style.top=`${S}px`,h.style.left=`${A}px`}h.setAttribute("data-placement","anchor")}$[0]?.focus({preventScroll:!0});let m=!0;const w=x=>{x.key==="Escape"&&(x.preventDefault(),v())};function v(){m&&(m=!1,c.removeEventListener("keydown",w,!0),u.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return c.addEventListener("keydown",w,!0),u.addEventListener("pointerdown",x=>{x.preventDefault(),v()}),y.addEventListener("click",v),{el:h,close:v}}function Ms(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),s=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*s)),o=Math.max(1,Math.floor(t*s));(n.width!==a||n.height!==o)&&(n.width=a,n.height=o);const r=n.getContext("2d");return r?.setTransform(s,0,0,s,0,0),{ctx:r,w:e,h:t}}function Se(n){return Math.max(0,Math.min(1,n))}function _t(n,e){const{ctx:t,w:s,h:a}=Ms(n);if(!t)return;t.clearRect(0,0,s,a);const o=bs(n);if(e.paint==="swatch"){const l=_(n,"accent"),d=_(n,"rhythm.step-cell-on");n.dataset.ncAccent=l,n.dataset.ncStep=d,t.fillStyle=l,t.fillRect(0,0,s/2,a),t.fillStyle=d,t.fillRect(s/2,0,s/2,a);return}if(e.paint==="filter"){const l=e.mode??"lp",d=_(n,gs(l)),u=_(n,"divider"),h=Se(e.cutoff??.5),b=.08+(1-Se(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(s,a*.72),t.stroke(),t.beginPath();for(let g=0;g<=s;g++){const y=g/Math.max(1,s);let $=0;l==="lp"?$=y<h?1:Math.max(0,1-(y-h)/b):l==="hp"?$=y>h?1:Math.max(0,1-(h-y)/b):$=Math.max(0,1-Math.abs(y-h)/b);const p=a*.78-$*a*.62;g===0?t.moveTo(g,p):t.lineTo(g,p)}t.strokeStyle=d,t.stroke(),t.fillStyle=_(n,"text-sub"),t.font=o,t.fillText(l.toUpperCase(),0,a),n.dataset.ncAccent=d;return}if(e.paint==="envelope"){t.strokeStyle=_(n,"accent"),t.beginPath();const l=Math.max(.05,e.decay??.4);for(let d=0;d<=s;d++){const u=d/Math.max(1,s),h=(a-4)*(1-Math.exp(-u*4/l));t.lineTo(d,a-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const l=Se(e.level??0);t.fillStyle=_(n,"divider"),t.fillRect(0,a*.4,s,a*.2),t.fillStyle=_(n,"accent"),t.fillRect(0,a*.4,s*l,a*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),c=((e.step??0)%r+r)%r;t.fillStyle=_(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,s,a*.1),t.fillStyle=_(n,"rhythm.playhead"),t.fillRect(c/r*s,a*.3,Math.max(1,s/r),a*.4),n.dataset.ncAccent=_(n,"accent")}function P(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function me(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const s=document.createElement("label");s.className="nc-label",s.htmlFor=n,s.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(s,a),t}function nt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ce(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Ls=450,st=8;function Q(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Ns(n){const e=fs(n,"target-min");return e>0?e:44}function Cs(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const s=Ns(n),a=s/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){const c=t[r],l=o[r];if(!(c instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=s&&l.height>=s){c.style.display="none";continue}const d=l.left+l.width/2,u=l.top+l.height/2;let h=d-a,b=d+a,g=u-a,y=u+a;for(let $=0;$<t.length;$++){if(r===$)continue;const p=o[$];if(!p||p.width===0)continue;const m=p.left+p.width/2,w=p.top+p.height/2;Math.abs(w-u)<a*2&&(m>d?b=Math.min(b,(d+m)/2):m<d&&(h=Math.max(h,(d+m)/2))),Math.abs(m-d)<a*2&&(w>u?y=Math.min(y,(u+w)/2):w<u&&(g=Math.max(g,(u+w)/2)))}h=Math.min(h,l.left),b=Math.max(b,l.right),g=Math.min(g,l.top),y=Math.max(y,l.bottom),c.style.left=`${h-l.left}px`,c.style.top=`${g-l.top}px`,c.style.width=`${Math.max(0,b-h)}px`,c.style.height=`${Math.max(0,y-g)}px`,c.style.transform="none"}}function ue(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function zt(n,e){switch(n.type){case"slider":return Ps(n,e);case"select":return Is(n,e);case"toggle":return _s(n,e);case"button":return zs(n,e);case"readout":return Rs(n);case"label":return js(n);case"note":return it(n);case"knob":return Hs(n,e);case"choice":return Fs(n,e);case"slotRow":return qs(n,e);case"stepGrid":return Vs(n,e);case"canvas":return Ys(n);case"fx":return Xs(n,e);default:return it({id:"unknown",text:""})}}function U(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),s=n.querySelector("label");s&&(s.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Rt(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=Ce(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),nt(n,e.label);else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")nt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Bs(t,e);const s=n.querySelector("[data-nc-readout]");s&&(s.textContent=Ce(e.value))}else if(e.type==="choice")jt(n,e);else if(e.type==="slotRow")Bt(n,e);else if(e.type==="stepGrid")Ht(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&_t(t,e)}else if(e.type==="fx")for(const t of e.controls){const s=n.querySelector(`[data-nc-id="${Js(t.id)}"]`);s instanceof Element&&U(s,t)}}}function Ps(n,e){const t=me(n.id,n.label);t.dataset.ncSlider="";const s=document.createElement("input");s.type="range",s.className="nc-range",s.id=n.id,s.min=String(n.min),s.max=String(n.max),s.step=String(n.step),s.value=String(n.value),s.disabled=n.disabled===!0,s.dataset.ncId=n.id,s.addEventListener("input",()=>{const o=e(s);o?.type==="slider"&&o.onChange(Number(s.value))}),s.addEventListener("change",()=>{const o=e(s);o?.type==="slider"&&o.onCommit?.(Number(s.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(s,a),t.append(P()),U(t,n),t}function Is(n,e){const t=me(n.id,n.label),s=document.createElement("select");s.className="nc-select",s.id=n.id,s.dataset.ncId=n.id;for(const a of n.options){const o=document.createElement("option");o.value=a.value,o.textContent=a.label,s.append(o)}return s.value=n.value,s.addEventListener("change",()=>{const a=e(s);a?.type==="select"&&a.onChange(s.value)}),t.append(s,P()),t}function _s(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const s=e(t);s?.type==="toggle"&&s.onPress()}),t.append(P()),U(t,n),t}function zs(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(P()),U(t,n),!n.onSparkle)return t;const s=document.createElement("div");s.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=ue(),a.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Dt(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),s.append(t,a),s}function Rs(n){const e=me(n.id,n.label);return e.append(P()),U(e,n),e}function js(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(P()),e}function it(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(P()),e}function Os(n){const e=Ce(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Rt(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Bs(n,e){const t=e.max-e.min||1,s=(e.value-e.min)/t;Rt(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(s*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",Os(e)),n.setAttribute("aria-label",e.label)}function Ds(n,e){const t=n.max-n.min||1,s=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?s/10:s;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+s*10:e.key==="PageDown"?n.value-s*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function Hs(n,e){const t=me(n.id,n.label),s=document.createElement("button");s.type="button",s.className="nc-knob",s.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",s.append(a);let o=0,r=0;s.addEventListener("pointerdown",l=>{o=l.clientY;const d=e(s);r=d&&"value"in d?Number(d.value):0,s.setPointerCapture?.(l.pointerId)}),s.addEventListener("pointermove",l=>{if(s.hasPointerCapture&&!s.hasPointerCapture(l.pointerId))return;const d=e(s);if(d?.type!=="knob")return;const u=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,r-(l.clientY-o)*u/120));d.onChange(h)}),s.addEventListener("keydown",l=>{const d=e(s);if(d?.type!=="knob")return;const u=Ds(d,l);u!==null&&(l.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,u))))});const c=t.querySelector("[data-nc-readout]");return t.insertBefore(s,c),t.append(P()),U(t,n),t}function Fs(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const s of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=s.value,a.setAttribute("role","tab"),a.textContent=s.label,a.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(s.value)}),a.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],c=r.indexOf(a);let l=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")l=(c+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")l=(c-1+r.length)%r.length;else if(o.key==="Home")l=0;else if(o.key==="End")l=r.length-1;else return;const d=r[l];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),t.append(a)}return t.append(P()),jt(t,n),t}function jt(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const s=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",s?"true":"false"),t.tabIndex=s?0:-1}}function qs(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const s=document.createElement("div");s.className="nc-snap-row",s.setAttribute("role","group"),s.setAttribute("aria-label","Snapshots");for(let l=0;l<n.slots.length;l++){const d=n.slots[l],u=document.createElement("span");u.className="nc-snap-wrap";const h=document.createElement("button");h.type="button",h.className="nc-snap",h.dataset.ncSlot=String(l),h.textContent=d.label,h.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",u.append(h,Q()),Us(u,h,t,l,e),s.append(u)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=ue(),a.append(Q()),a.addEventListener("click",()=>{Dt(t);const l=e(t);l?.type==="slotRow"&&l.onSparkle?.()}));const o=document.createElement("span");o.className="nc-morph-label",o.textContent="Morph";const r=document.createElement("input");r.type="range",r.className="nc-range nc-morph",r.min="0",r.max="4",r.step="0.01",r.setAttribute("aria-label","Morph time"),r.addEventListener("input",()=>{const l=e(t);l?.type==="slotRow"&&l.onMorph(Number(r.value))});const c=document.createElement("span");return c.className="nc-mono nc-morph-readout",c.dataset.ncMorph="",t.append(s,...a?[a]:[],o,r,c,P()),Ot(t,e),Bt(t,n),t}function at(n,e,t,s){const a=t(n);if(a?.type!=="slotRow")return;Z(n);const o=s.shiftKey?"store":s.altKey?"clear":"recall";a.onSlot(e,o)}function Us(n,e,t,s,a){let o=0,r=0,c=0,l=!1,d=!1,u=!1,h=!1;const b=()=>{window.clearTimeout(o),o=0},g=m=>{const w=m.clientX-r,v=m.clientY-c;w*w+v*v>st*st&&(l=!0,b())},y=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",$),window.removeEventListener("pointercancel",p))},$=m=>{const w=o!==0&&!l&&!d;b(),y(),w&&(u=!0,at(t,s,a,m))},p=()=>{l=!0,b(),y()};n.addEventListener("pointerdown",m=>{m.button===0&&(y(),d=!1,l=!1,u=!1,r=m.clientX,c=m.clientY,b(),o=window.setTimeout(()=>{o=0,!l&&(d=!0,Gs(t,e,s,a))},Ls),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",$),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",m=>m.preventDefault()),n.addEventListener("click",m=>{if(u||d||l){u=!1,d=!1,l=!1;return}at(t,s,a,m)})}function Ot(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const s=ot("Save","store"),a=ot("Clear","clear");t.append(s,a);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Z(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const c=r.target;if(!(c instanceof HTMLButtonElement))return;const l=e(n);if(l?.type!=="slotRow")return;const d=Number(t.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(l.onSlot(d,"store"),Z(n)):c.dataset.ncSlotOp==="clear"&&(l.onSlot(d,"clear"),Z(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&Z(n)})}function ot(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Gs(n,e,t,s){Ot(n,s);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),c=e.getBoundingClientRect();a.style.left=`${c.left-r.left}px`,a.style.top=`${c.bottom-r.top}px`,a.querySelector("button")?.focus()}function Z(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Bt(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const o=Number(a.dataset.ncSlot),r=e.slots[o];r&&(a.textContent=r.label,r.filled?a.dataset.filled="true":delete a.dataset.filled,r.active?a.dataset.active="true":delete a.dataset.active,r.edited?(a.dataset.edited="true",a.setAttribute("aria-label",`${r.label}, edited`)):(delete a.dataset.edited,a.removeAttribute("aria-label")))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const s=n.querySelector("[data-nc-morph]");s&&(s.textContent=e.morphText)}function Dt(n){const e=n.dataset.ncLastFill||null,t=cs(e);n.dataset.ncLastFill=t;const s=ls(t);if(s)for(const[a,o]of Object.entries(s))n.style.setProperty(a,o)}function Ks(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let s=!1;const a=o=>{if(s===o)return;s=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),a(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>a(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||a(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),a(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function Vs(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const s=document.createElement("div");s.className="nc-seg",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Step tool");const a=p=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,s.append(m),m},o=a("Note"),r=a("Accent");r.dataset.ncAccentMode="";const c=p=>{for(const m of[o,r]){const w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};c(o);for(const p of[o,r])p.addEventListener("click",()=>c(p));s.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const m=r.getAttribute("aria-checked")==="true"?o:r;c(m),m.focus()});const l=document.createElement("div");l.className="nc-step-tools",l.append(s),n.onFill&&l.append(Ks(t,e)),t.append(l);for(const p of n.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1)),w.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid")return;const E=k.rows.findIndex(S=>S.id===p.id);k.onSelectRow?.(E)}),w.addEventListener("keydown",k=>Ws(t,w,k));const v=[];for(const k of["mute","solo"]){if(!(k==="mute"?n.onMute:n.onSolo))continue;const S=document.createElement("span");S.className="nc-ms-wrap";const A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=k,A.textContent=k==="mute"?"M":"S",A.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${p.label}`),S.append(A,Q()),S.addEventListener("click",()=>{const N=e(t);if(N?.type!=="stepGrid")return;const G=N.rows.findIndex(X=>X.id===p.id);(k==="mute"?N.onMute:N.onSolo)?.(G)}),v.push(S)}const x=document.createElement("div");x.className="nc-steps";for(let k=0;k<p.steps.length;k++){const E=document.createElement("span");E.className="nc-step-wrap";const S=document.createElement("button");S.type="button",S.className="nc-step",S.dataset.ncStep=`${p.id}:${k}`,S.setAttribute("aria-label",`${p.label} step ${k+1}`),E.append(S,Q()),E.addEventListener("click",A=>{const N=e(t);if(N?.type!=="stepGrid")return;const G=N.rows.findIndex(se=>se.id===p.id),X=r.getAttribute("aria-checked")==="true";N.onToggle(G,k,A.shiftKey||X)}),x.append(E)}if(m.append(...v,w,x),n.onDice){const k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=p.id,k.setAttribute("aria-label",`Surprise ${p.label} steps`),k.title=`New ${p.label} steps (Undo takes it back)`,k.innerHTML=ue(),k.append(Q()),k.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(S=>S.id===p.id))}),m.append(k)}m.addEventListener("click",k=>{if(k.target!==m)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(S=>S.id===p.id))}),rt(t,x,".nc-step-wrap",e,r,()=>p.id),t.append(m)}const d=document.createElement("div");d.className="nc-pads-head";const u=(p,m,w)=>{const v=document.createElement("button");return v.type="button",v.className=p,v.textContent=m,w&&v.setAttribute("aria-label",w),v},h=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),g=document.createElement("span");g.className="nc-pads-label",g.setAttribute("aria-live","polite");for(const[p,m]of[[h,-1],[b,1]])p.addEventListener("click",()=>{const w=e(t);if(w?.type!=="stepGrid"||w.rows.length===0)return;const v=w.rows.length;w.onSelectRow?.(((oe(w)+m)%v+v)%v)});if(d.append(h,g,b),n.onDice){const p=u("nc-pads-step nc-pads-dice","","Surprise this lane's steps");p.dataset.ncPadsDice="",p.innerHTML=ue(),p.addEventListener("click",()=>{const m=e(t);if(m?.type!=="stepGrid")return;const w=oe(m);w>=0&&m.onDice?.(w)}),d.append(p)}if(n.transport){const p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(p)}t.append(d);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const $=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<$;p++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{const v=e(t);if(v?.type!=="stepGrid")return;const x=oe(v);if(x<0)return;const k=r.getAttribute("aria-checked")==="true";v.onToggle(x,p,w.shiftKey||k)}),y.append(m)}return rt(t,y,".nc-pad",e,r,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[oe(p)]?.id:void 0}),t.append(y),t.append(P()),Ht(t,n),t}function oe(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function rt(n,e,t,s,a,o){let r="on",c=!0,l=-1;const d=(u,h)=>{const b=u.rows[l]?.steps[h];!b||h>=u.rows[l].length||(u.onSet?u.onSet(l,h,r,c):!!b[r]!==c&&u.onToggle(l,h,r==="accent"))};$s(e,t,u=>{const h=s(n);if(h?.type==="stepGrid"){if(u.kind==="paint"){if(u.phase==="start"){const b=o();l=h.rows.findIndex(y=>y.id===b);const g=h.rows[l]?.steps[u.pad];if(!g)return;r=a.getAttribute("aria-checked")==="true"?"accent":"on",c=!g[r]}d(h,u.pad)}else if(u.kind==="long"){const b=o(),g=h.rows.findIndex($=>$.id===b),y=e.querySelectorAll(t)[u.pad];g>=0&&y instanceof HTMLElement&&h.onLongPress?.(g,u.pad,y)}}})}function Ws(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const s=[...n.querySelectorAll(".nc-name")],a=s.indexOf(e);let o=a;t.key==="ArrowDown"?o=a+1:t.key==="ArrowUp"?o=a-1:t.key==="Home"?o=0:o=s.length-1;const r=s[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function Ht(n,e){const t=e.rows.some(c=>c.solo),s=n.querySelector(".nc-pads"),a=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label");o&&a&&(o.textContent=`${a.label} · 1–${a.length}`);const r=n.querySelector("[data-nc-pads-play]");if(r instanceof HTMLElement){const c=!!e.transport?.playing;r.textContent=c?"Stop":"Play",r.setAttribute("aria-pressed",c?"true":"false")}if(s instanceof HTMLElement&&a){s.setAttribute("aria-label",`${a.label} steps`),a.lane&&(s.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?s.dataset.silent="true":delete s.dataset.silent;const c=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const l of s.querySelectorAll("[data-nc-pad]")){const d=Number(l.getAttribute("data-nc-pad")),u=a.steps[d];l instanceof HTMLButtonElement&&(l.hidden=!u||d>=a.length,l.setAttribute("aria-label",`${a.label} step ${d+1}`),l.setAttribute("aria-pressed",u?.on?"true":"false"),u?.accent?l.dataset.accent="true":delete l.dataset.accent,u?.dim?l.dataset.dim="true":delete l.dataset.dim,e.playhead>=0&&d===c?l.dataset.playhead="true":delete l.dataset.playhead)}}for(const c of e.rows)for(let l=0;l<c.steps.length;l++){const d=c.steps[l],u=n.querySelector(`[data-nc-step="${c.id}:${l}"]`);if(!(u instanceof HTMLButtonElement))continue;const h=u.closest(".nc-row");if(h instanceof HTMLElement){e.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;const g=h.querySelector(".nc-name");g instanceof HTMLElement&&g.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(const $ of h.querySelectorAll("[data-nc-ms]")){const p=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",p?"true":"false")}}u.setAttribute("aria-pressed",d.on?"true":"false"),d.accent?u.dataset.accent="true":delete u.dataset.accent,d.dim?u.dataset.dim="true":delete u.dataset.dim,l%4===0?u.dataset.bar="true":delete u.dataset.bar,typeof d.velocity=="number"?(u.dataset.velocity="true",u.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,d.velocity))*100)}%`)):(delete u.dataset.velocity,u.style.removeProperty("--level"));const b=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;l===b?u.dataset.playhead="true":delete u.dataset.playhead,u.hidden=l>=c.length}}function Ys(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const s=document.createElement("canvas");return s.className="nc-canvas",s.dataset.ncId=n.id,s.dataset.ncPaint=n.paint,e.append(t,s,P()),e}function Xs(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const s=document.createElement("h3");s.className="nc-fx-name",s.textContent=n.title,t.append(s);for(const a of n.controls)t.append(zt(a,e));return t.append(P()),t}function Js(n){return n.replace(/["\\]/g,"\\$&")}function Zs(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const s=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);s?.type==="canvas"&&_t(t,s)}Cs(n)}const Be="netcomposer.rhythm.hidden.v1",H=new WeakMap;function Te(){try{return globalThis.localStorage??null}catch{return null}}function Ft(n,e=Be){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(s=>typeof s=="string"):[])}catch{return new Set}}function ct(n,e,t,s=Be){const a=Ft(n,s);t?a.add(e):a.delete(e);try{n?.setItem(s,JSON.stringify([...a]))}catch{}}function De(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(s=>s.controls)],t=[];for(const s of e)t.push(s),s.type==="fx"&&t.push(...s.controls);return t}function Qs(n,e){if(!(!n||!e))return De(n).find(t=>t.id===e)}function ei(n){return De(n).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(t=>`${t.id}/${t.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(t=>t.value).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.controls.map(t=>t.id).join(",")}`:`${e.type}:${e.id}`).join("|")}function ti(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=H.get(e),s=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Qs(t,s)}function ni(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],s=ei(e);if(n.dataset.ncSignature===s){for(const a of t)for(const o of a.controls){const r=n.querySelector(`[data-nc-id="${si(o.id)}"]`);r instanceof Element&&U(r,o)}return}n.dataset.ncSignature=s,n.replaceChildren();for(const a of t){const o=document.createElement("div");if(o.className="nc-section",o.dataset.ncSection=a.id,a.inset&&(o.dataset.ncInset="true"),a.title){const r=document.createElement("h3");r.className="nc-fx-name",r.textContent=a.title,o.append(r)}for(const r of a.controls)o.append(zt(r,ti));n.append(o)}}function si(n){return n.replace(/["\\]/g,"\\$&")}function fe(n,e=Be){Ct();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1";const s=Ft(Te(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";const l=document.createElement("span");l.className="nc-index",l.dataset.ncIndex="",r.append(c,l);const d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",a.append(o,d,r);const u=document.createElement("div");u.className="nc-module-body",u.id=`${n.id}-body`;const h=document.createElement("button");h.type="button",h.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",h.append(b);const g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",t.append(g,a,u,h),t.setAttribute("aria-labelledby",o.id);const y=p=>{const m=H.get(t)??n;t.dataset.ncOpen=p?"false":"true",u.hidden=p,h.hidden=!p,c.textContent=p?"+":"−",c.setAttribute("aria-expanded",p?"false":"true"),c.setAttribute("aria-controls",u.id),c.setAttribute("aria-label",`${p?"Show":"Hide"} ${m.title}`),c.title=p?"Show":"Hide",p?t.dataset.ncSlim="":delete t.dataset.ncSlim};c.addEventListener("click",()=>{const p=t.dataset.ncOpen==="true";ct(Te(),(H.get(t)??n).id,p,e),y(p),Pe(t.parentElement)}),h.addEventListener("click",()=>{ct(Te(),(H.get(t)??n).id,!1,e),y(!1),Pe(t.parentElement)});const $={el:t,update(p){H.set(t,p),o.textContent=p.title,d.textContent=p.status??"",p.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),b.textContent=p.summary??p.title,h.setAttribute("aria-label",`Show ${p.title}`),ni(u,p),y(u.hidden),$.redraw()},redraw(){const p=H.get(t);p&&Zs(t,De(p))}};return H.set(t,n),y(s),$.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>$.redraw()).observe(t),$}function ii(n,e,t="adjacent"){Ct(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const s=t==="stack"?"stack":"adjacent";e.forEach((a,o)=>{const r=o%4+1;a.el.dataset.ncShade=String(r),a.el.dataset.ncPlace=s;const c=a.el.querySelector("[data-nc-index]");c&&(c.textContent=String(r).padStart(2,"0")),n.append(a.el),a.redraw()}),Pe(n)}function Pe(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols");return}const e=[...n.children].filter(t=>t instanceof HTMLElement&&t.classList.contains("nc-module")).map(t=>t instanceof HTMLElement&&t.hasAttribute("data-nc-slim")?i("module-slim-column"):"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",e.join(" "))}const qt="petra-rhythm.state",Ut=1,ai=400,oi=2e3;function ri(n){return JSON.stringify({v:Ut,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function ci(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:s,tracks:a}=e;return Et({...n,swing:t,fx:s,tracks:a}).ok}function li(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Ut)return null;const t=Et(e.doc);if(!t.ok||!t.document)return null;const s=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==pe)return null;const o=a.slots.map(d=>d===null?null:d);if(!o.every(d=>d===null||ci(s,d)))return null;const r=Number.isInteger(a.active)&&o[a.active]?a.active:null,c=e.selectedTrack,l=Number.isInteger(c)&&c>=0&&c<s.tracks.length?c:0;return{doc:s,bank:{slots:o,active:r},selectedTrack:l}}function di(n,e,t=ai){let s,a=0,o="";const r=()=>{clearTimeout(s),s=void 0,a=0;try{const c=ri(e());if(c===o)return;n.setItem(qt,c),o=c}catch{}};return{schedule(){const c=Date.now();a||(a=c),clearTimeout(s),s=setTimeout(r,Math.min(t,Math.max(0,a+oi-c)))},flush:r}}function ui(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return li(n.getItem(qt))}catch{return null}}const Ee={maker:"PETRA",instrument:"RHYTHM",number:"01"},Gt="PETRA Rhythm";let lt=!1;function pi(){return`
.petra-head {
  padding: ${i("module-pad")};
  border-bottom: ${i("hairline")} solid ${i("divider")};
}
.petra-head-name {
  margin: 0;
  font-size: ${i("rhythm.brand-size")};
  font-weight: ${i("rhythm.brand-weight")};
  letter-spacing: ${i("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${i("text-sub")}; }
.petra-head-num { font-family: ${i("font-readout")}; }
.petra-head-line {
  margin: ${i("rhythm.brand-sub-gap")} 0 0;
  font-size: ${i("rhythm.brand-sub-size")};
  color: ${i("text-sub")};
}
@media (min-width: 1024px) {
  .petra-head { padding: ${i("module-pad-y-desktop")} ${i("module-pad-x-desktop")}; }
}
`}function hi(n){const e=n.ownerDocument;if(!lt){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=pi(),e.head.append(c),lt=!0}const t=e.createElement("header");t.className="petra-head";const s=e.createElement("h1");s.className="petra-head-name";const a=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=Ee.number,s.append(`${Ee.maker} `,a(),` ${Ee.instrument} `,a()," ",o);const r=e.createElement("p");return r.className="petra-head-line",r.textContent="A NetComposer element.",t.append(s,r),n.before(t),t}function mi(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,s=e?.performanceTime;if(t===void 0||s===void 0||!(t>0)||!(s>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:s,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function dt(n,e){const t=n.getOutputTimestamp?.(),s=t?.contextTime,a=t?.performanceTime;if(s===void 0||a===void 0||!(s>0)||!(a>0)||!Number.isFinite(e))return null;const o=a+(e-s)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,c=performance.timeOrigin+o;return{playedMs:c,plusLatencyMs:c+r,latencyMs:r}}class fi{doc=es();bank=En();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Nn(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.bank=An(this.bank,e,this.doc),this.edited=null}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Mn(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}recall(e,t=this.morphSeconds){const s=Ln(this.bank,e,this.doc,t);return s.applied?(this.retireSparkle(),this.bank=s.bank,this.doc=s.document,this.edited=null,this.glidePending=s.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},s=Yn(this.doc,e);this.sparkleUndo=t,this.bank=s.bank,this.doc=s.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const s={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Kn(this.doc,e,t),this.writeActive(),this.sparkleUndo=s,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e));return t===this.doc.swing?!1:(this.retireSparkle(),this.doc.swing=t,this.writeActive(),this.glidePending=0,!0)}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const gi=1400;function Ae(n,e,t,s=!1){return n==="store"?`Stored ${e}`:n==="clear"?t?`Cleared ${e}`:null:t?null:s?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function bi(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class yi{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},gi))}}const wi=50;function ki(n,e,t,s=wi){if(t)return 0;const a=n-e;return a>=s?0:s-a}class $i{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const s=Es({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===s&&(this.handle=null,this.clearLive())}});this.handle=s}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}const vi="/rhythm/assets/processor-BXXz02Xc.js",Kt=new URLSearchParams(location.search),z=Kt.has("measure"),xi=!(z&&Kt.get("clockStepFix")==="0");let Ie=0;const Si=.05;z&&(window.__onsets=[],window.__render=[],window.__stamps=[]);const te=[40,240],f=new fi,re=z?null:ui(localStorage,location.search);re&&(f.doc=re.doc,f.bank=re.bank,f.selectTrack(re.selectedTrack));const Vt=z?null:di(localStorage,()=>({doc:f.doc,bank:f.bank,selectedTrack:f.selectedTrack}));if(z){for(const e of f.doc.tracks)e.solo=e.voice==="kick";const n=f.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Si)}const j=new mn({bpm:f.doc.bpm,minBpm:te[0],maxBpm:te[1],timebase:"shared"}),He=document.querySelector("#app");if(!(He instanceof HTMLElement))throw new Error("Missing #app");hi(He);const ne=new $i(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let T=null;z&&(window.__audioInfo=()=>T?{sampleRate:T.sampleRate,outputLatency:T.outputLatency,baseLatency:T.baseLatency,state:T.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>ge(),window.__clockStep=n=>{Ie=n},window.__debug=()=>({audio:T?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:T?.getOutputTimestamp?.()??null,currentTime:T?.currentTime??null,reanchors:q?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let ee=null,q=null,_e=0,Wt=0;function Ti(){return T?T.state==="running"?"running":T.state==="suspended"?"suspended":T.state==="interrupted"?"interrupted":"none":"needs-gesture"}const C=new Sn({app:Gt,version:"0.1.0",clock:j,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:te},audio:Ti,outputLatencyMs:()=>q?.outputLatencyMs??null,swing:()=>f.doc.swing});let ut="",Yt=!1,pt=Number.NEGATIVE_INFINITY,V=null;function Y(n=Me()){return j.transport.isPlayingAt(n)}function ze(n){if(!C.isLeader)return;const e=ki(performance.now(),pt,n);if(e>0){V===null&&(V=setTimeout(()=>{V=null,ze(!0)},e));return}V!==null&&(clearTimeout(V),V=null),C.publishState()&&(pt=performance.now())}function ht(){return Yt?Vn(f.doc).tracks:f.doc.tracks}function L(){if(!ee||!q)return;const n=f.consumeGlide(),e=Math.round(q.offset*1e4)/1e4,t=pn(j.toSnapshot(),e,"audio"),s=JSON.stringify({offset:e,anchor:t.anchor,start:t.startTime,stop:t.stopTime,tempo:t.tempo,swing:f.doc.swing,glide:n??null,tracks:ht(),fx:f.doc.fx});if(s===ut)return;ut=s;const a={clock:t,measure:z,swing:f.doc.swing,fx:{...f.doc.fx},...n===void 0?{}:{glideSeconds:n},tracks:ht().map(o=>({id:o.id,voice:o.voice,length:o.length,mute:o.mute,solo:o.solo,steps:o.steps})),params:f.doc.tracks.map(o=>({voice:o.voice,params:{...o.params}}))};ee.port.postMessage({type:"state",state:a})}async function Ei(){if(!T){if(T=new AudioContext,z){const n=T,e=n.getOutputTimestamp.bind(n);n.getOutputTimestamp=()=>{const t=e();return!Ie||!t.contextTime?t:{contextTime:t.contextTime+Ie/1e3,performanceTime:t.performanceTime}}}q=new xn(T,xi?{}:{stepThresholdMs:0}),q.onStep(()=>L()),q.start(),await T.audioWorklet.addModule(vi),ee=new AudioWorkletNode(T,"rhythm"),ee.port.onmessage=n=>{if(n.data.level!==void 0&&n.data.step!==void 0&&(Wt=n.data.level,_e!==n.data.step&&(_e=n.data.step,M())),!(!z||!T)){for(const e of n.data.onsets??[]){const t=dt(T,e.contextTime);t&&window.__onsets?.push({app:Gt,beat:e.beat,contextTime:e.contextTime,hidden:document.hidden,stampAgeMs:(T.currentTime-e.contextTime)*1e3,...t})}for(const e of n.data.render??[]){const t=dt(T,e.contextTime);t&&window.__render?.push({contextTime:e.contextTime,peak:e.peak,playedMs:t.playedMs})}}},ee.connect(T.destination),L()}}async function ge(){await Ei(),T&&(T.state!=="running"&&await T.resume(),Y()?j.stop({at:Me()}):j.play({at:Me()}))}const ce=new yi(()=>M());function le(n,e){const t=wt[n]??"";if(e==="store")f.store(n),ce.say(Ae(e,t,!0));else if(e==="clear"){const s=f.bank.slots[n]!=null;f.clear(n),ce.say(Ae(e,t,s)),s&&ne.show(be,`Slot ${t} cleared`)}else if(!f.recall(n))ce.say(Ae(e,t,!1,matchMedia("(pointer: coarse)").matches));else{const s=f.morphSeconds>0?f.morphSeconds:0;C.sendSnapshot("recall",n,s>0?{glide:{seconds:s}}:{})}L(),M()}function be(){f.undoSurprise()&&(ne.dismiss(),L(),M())}function Ai(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),be();return}if(n.code==="Space"){n.preventDefault(),ge();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const s=t===0?9:t-1;s<0||s>=pe||(n.preventDefault(),n.shiftKey?le(s,"store"):n.altKey?le(s,"clear"):le(s,"recall"))}function Mi(){return C.swing==null?"No session swing yet. There is no request message, so this slider stays on this tab.":"The leader sets swing. This slider shows that value. A local edit would stay on this tab."}function Xt(){const n=Y(),e=C.swing;return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:ce.text,controls:[{type:"button",id:"play",label:n?"Stop":"Play",on:n,onPress:()=>void ge(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{f.surprise(),L(),M(),ne.show(be)}},{type:"slider",id:"bpm",label:"Tempo",min:te[0],max:te[1],step:1,value:j.transport.bpm,onChange:t=>{f.doc.bpm=t,j.setTempo({bpm:t}),L(),M()}},{type:"slider",id:"swing",label:C.isLeader?"Swing":e==null?"Swing (local)":"Swing (leader)",min:.5,max:.75,step:.01,value:C.isLeader?f.doc.swing:e??f.doc.swing,disabled:!C.isLeader,modulated:!C.isLeader&&e!=null,onChange:t=>{C.isLeader&&(f.edit(s=>{s.swing=t}),ze(!1),L(),M())},onCommit:()=>{ze(!0)}},...C.isLeader?[]:[{type:"note",id:"swing-note",text:Mi()}],...C.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:C.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:f.morphSeconds,morphText:bi(f.morphSeconds),slots:wt.map((t,s)=>({label:t,filled:f.bank.slots[s]!=null,active:f.bank.active===s,edited:f.edited===s})),onMorph:t=>{f.morphSeconds=t,M()},onSlot:(t,s)=>{le(t,s)}}]}}function Re(){const n=f.doc.tracks.length;return n===0?0:Math.min(f.selectedTrack,n-1)}function Jt(){const n=f.doc.tracks[Re()];return{id:"pattern",title:"Pattern",summary:n?`${f.doc.tracks.length} tracks · ${n.name}`:`${f.doc.tracks.length} tracks`,controls:[{type:"stepGrid",transport:{playing:Y(),onToggle:()=>void ge()},id:"grid",playhead:Y()?_e:-1,selectedRow:n?.id,onSelectRow:e=>{f.selectTrack(e),M()},onDice:e=>{const t=f.doc.tracks[e]?.name??"Lane";f.diceLane(e)&&(L(),M(),ne.show(be,`New ${t} steps`))},onFill:e=>{Yt=e,L(),M()},onMute:e=>{f.edit(t=>{const s=t.tracks[e];s&&(s.mute=!s.mute)}),L(),M()},onSolo:e=>{f.edit(t=>{const s=t.tracks[e];s&&(s.solo=!s.solo)}),L(),M()},onToggle:(e,t,s)=>{f.edit(a=>{const o=a.tracks[e]?.steps[t];o&&(s?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),L(),M()},onLongPress:(e,t,s)=>{const a=f.doc.tracks[e],o=a?.steps[t];!a||!o||As({anchor:s,title:`${a.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:c})=>{f.edit(l=>{const d=l.tracks[e]?.steps[t];d&&(d.on=!0,d.velocity=r,d.probability=c>=1?void 0:c)}),L(),M()}})},onSet:(e,t,s,a)=>{f.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(s==="accent"?(r.accent=a,a&&(r.on=!0)):(r.on=a,a||(r.accent=!1)))}),L(),M()},rows:f.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(s=>({on:s.on,accent:s.accent,velocity:s.velocity,dim:(s.probability??1)<1}))}))}]}}function Zt(){const n=Re(),e=f.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"voice",title:e?.name??"Voice",summary:e?`level ${e.params.level.toFixed(2)}`:"",sections:[{id:"lane",controls:[{type:"choice",id:"track",label:"Track",value:e?.id??"",options:f.doc.tracks.map(s=>({value:s.id,label:s.name})),onChange:s=>{const a=f.doc.tracks.findIndex(o=>o.id===s);f.selectTrack(a),M()}}]},{id:"sound",inset:!0,controls:t.map(s=>({type:"slider",id:s,label:s,min:s==="tune"?20:0,max:s==="tune"?800:1,step:s==="tune"?1:.01,value:e?.params[s]??0,onChange:a=>{f.edit(o=>{const r=o.tracks[Re()];r&&(r.params[s]=a)}),L(),M()}}))}]}}function Qt(){return{id:"filter",title:"Filter",summary:f.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:f.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{f.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),L(),M()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:f.doc.fx.cutoff,onChange:n=>{f.edit(e=>{e.fx.cutoff=n}),L(),M()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:f.doc.fx.mode,cutoff:f.doc.fx.cutoff,resonance:f.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Wt}]}}const en=fe(Xt()),tn=fe(Jt()),nn=fe(Zt()),sn=fe(Qt());function M(){f.takeSurpriseEdit()&&ne.dismiss(),en.update(Xt()),tn.update(Jt()),nn.update(Zt()),sn.update(Qt()),Vt?.schedule()}window.addEventListener("pagehide",()=>Vt?.flush());j.onChange(()=>{f.playing=Y(),f.doc.bpm=j.transport.bpm,L(),M()});C.onSwing(n=>{f.adoptSwing(n)&&(L(),M())});C.onSnapshot(n=>{n.op==="recall"&&f.recall(n.slot,n.glide?.seconds??0)&&(L(),M())});C.onRole(()=>M());C.onPeers(()=>M());await C.start();document.addEventListener("keydown",Ai);ii(He,[en,tn,nn,sn],"adjacent");M();setInterval(()=>{const n=Y();if(n!==f.playing&&(f.playing=n,M()),L(),!z||!T)return;const e=mi(T);e&&window.__stamps?.push(e)},250);
