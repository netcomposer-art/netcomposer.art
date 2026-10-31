(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ke=1e-9;function Qi(n,e,t,a=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,a))}class nn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Qi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const a=t.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+ke&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+ke)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+ke){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-ke;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,a,s=.25){const r=this.bpmAt(t);if(!(a>0)||!(s>0)){this.setTempoAt(e,t);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,t);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,t+a*(l-1)/o)}prune(e){let t=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(t=a);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new nn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const a=this.segs[t-1];this.segs[t].time=a.time+(this.segs[t].beat-a.beat)*60/a.bpm}}segAtBeat(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].beat<=e+ke)return t[a];return t[0]}segAtTime(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].time<=e+ke)return t[a];return t[0]}}const Zi=Object.freeze({beatsPerBar:4,beatUnit:4}),Le=1e-9;function es(n){return Math.floor(n+Le)}function Ma(n,e,t=!1){if(!(e>0))return n;const s=Math.ceil(n/e-Le)*e;return t&&s<=n+Le?s+e:s}class ts{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new nn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Zi}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Le&&(this.stopTime===null||e<this.stopTime-Le)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Le?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),a=es(e/t),s=Math.max(0,e-a*t);return{beat:e,bar:a,beatInBar:s,barPhase:s/t}}nextBar(e,t=!1){return Ma(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const La="nc-clock/snapshot",Ca=1;function ns(n,e="local"){return{format:La,version:Ca,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function as(n,e){const t=ss(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function is(n,e,t=n.timebase){const a=s=>s===null?null:s+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(s=>({...s})),meter:{...n.meter},startTime:a(n.startTime),stopTime:a(n.stopTime)}}const X=n=>typeof n=="number"&&Number.isFinite(n),zn=n=>n===null||X(n);function ss(n){const e=n,t=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==La&&t("format"),(!X(e.version)||Math.floor(e.version)!==Ca)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!X(e.anchor.beat)||!X(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&X(a.beat)&&X(a.bpm)&&a.bpm>0))&&t("tempo"),(!e.meter||!X(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!X(e.meter.beatUnit))&&t("meter"),(!zn(e.startTime)||!zn(e.stopTime)||!X(e.stoppedBeat))&&t("transport times"),e}class rs{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ts(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,a){this.transport.start({at:e,beat:t,bpm:a}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const a=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){as(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return ns(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const os="nc-sync/1",ls=1,cs="nc-sync",ds="nc-sync-leader",us=0,Na=.5,Pa=.75;function ps(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Na&&n<=Pa?n:null}const St=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Oe=n=>typeof n=="number"&&Number.isFinite(n),Ye=n=>typeof n=="string"&&n.length>0;function hs(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ls||!Ye(e.type)||!Ye(e.from)||!Oe(e.term)||!Oe(e.seq)||!Oe(e.sentAt))return null;switch(e.type){case"hello":return Ye(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Oe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Oe(e.slot)?e:null;case"ping":case"pong":return Ye(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ms(n,e,t,a,s){return{proto:os,from:e,term:t,seq:a,sentAt:s,...n}}function B(){return(performance.timeOrigin+performance.now())/1e3}const Et=.003,fs=3,gs=.01,Rn=500;class bs{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?gs:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,a=e?.performanceTime??0;if(!(t>=Et&&a>0)||!Number.isFinite(t)||!Number.isFinite(a))return!1;const s=t-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),p=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!p&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&p===this.pendingBack&&(p||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,p))):(this.pendingStep=o,this.pendingBack=p,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,a){const s=this.ctx.currentTime,r=s<=this.revertUntil;let o;if(a&&r){const l=this.offsets,p=this.preStep;l.length=0;for(let d=0;d<p.length;d++)l.push(p[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-t,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const d=this.offsets,c=this.preStep;c.length=0;for(let h=0;h<d.length;h++)c.push(d[h]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,p=e-t;for(let d=0;d<l.length;d++)l[d]+=p;this.stepCount++,o={stepSeconds:e-t,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,t=this.scratch,a=e.length;t.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}const s=a>>1;return a%2?t[s]:(t[s-1]+t[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=Et&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Rn)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),t=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=Et)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<Rn)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(fs,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class ys{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...St,...e.capabilities},this.channelOption=e.channel??cs,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,a={}){this.send({type:"snapshot",op:e,slot:t,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const a=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const p=o.beatAt(l+this.o.minLeadSeconds),d=Math.max(t??Ma(p,1),p);a&&a>0?(o.tempo.rampTempo(e,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),t=Math.min(t,a.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Pa,Math.max(Na,e)):us;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=ps(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const a of[...this.swingListeners])a(t)}}receive(e){const t=hs(e);if(!t||t.from===this.id)return;const a=this.lastSeq.get(t.from);if(!(a!==void 0&&t.seq<=a)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const s=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...St,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),s||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const s=this.peers.get(t.from);s?s.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...St},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ds,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,o,l)=>[r?0:1,o,l];let a=t(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[t.capabilities.prefersLeader?0:1,t.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(ms(e,this.id,this.term,++this.seq,this.o.now()))}}const On=.02,ws=.06,vs={shaker:{tune:6500,decay:.025,tone:.55,snap:.55,drive:.5,level:.3}},_a=["kick","snare","clap","rim","hat","hatOpen","tom","metal","shaker"],Z=10,za=["1","2","3","4","5","6","7","8","9","0"];function Ra(){return{slots:Array.from({length:Z},()=>null),active:null}}function an(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function ks(n,e,t){const a=n.slots.slice();return a[e]=an(t),{slots:a,active:e}}function $s(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function In(n,e,t,a){const s=n.slots[e];return s?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:a>0?a:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function xs(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=an(e),{slots:t,active:n.active}}const Ss=16,Es=[2,6,10,14],Ts=[2,3,6,10,11,14],ot=[0,2,4,6,8,10,12,14],As=[2,6,10,14],Ms=[1,3,7,9,11,15],jn=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],ot,[2,6,10,14]],Ls={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]}};function G(){return Array.from({length:Ss},()=>!1)}function se(n,e,t,a=!1){const s=e+n()*(t-e);return a?Math.round(s):Math.round(s*100)/100}function Tt(n,e,t){return se(n,Math.max(0,e-t),Math.min(1,e+t))}function Cs(n){const e=G();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],a=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[a]=!0),e}function Ns(n){const e=G();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Es.filter(()=>n()<.22);for(const a of t.slice(0,2))e[a]=!0;return e}function Ps(n,e){const t=G();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function _s(n,e){const t=G();let a=0;for(const s of Ts)a>=3||n[s]||e()<.35&&(t[s]=!0,a+=1);return t}function zs(n){const e=G();let t=0;for(const a of As){if(t>=2)break;n()<.4&&(e[a]=!0,t+=1)}return e}function Rs(n,e){const t=G();for(const o of ot)t[o]=!n[o];const a=ot.filter(o=>t[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),p=a.splice(l,1)[0];p!==void 0&&(t[p]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(t[o]=!0,r+=1)}return t}function Os(n,e){const t=G(),a=n[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(t[r]=!0,s+=1)}return t}function Is(n,e,t){const a=G();let s=0;for(const r of Ms)s>=2||n[r]||e[r]||t()<.35&&(a[r]=!0,s+=1);return a}function Oa(n){const e=G(),t=jn[Math.floor(n()*jn.length)]??ot;for(const a of t)e[a]=!0;return e}function Ia(n,e,t){return Array.from({length:e},(a,s)=>{const r=n[s]===!0,o=r&&t(s);return{on:r,accent:o,velocity:o?1:.8}})}function ja(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:n==="shaker"?e%4===2:!1}function js(n,e,t){const a=Ls[n];return{tune:se(t,a.tune[0],a.tune[1],!0),decay:n==="shaker"?Math.round((a.decay[0]+t()*(a.decay[1]-a.decay[0]))*1e3)/1e3:se(t,a.decay[0],a.decay[1]),tone:Tt(t,e.tone,.15),snap:Tt(t,e.snap,.15),drive:Tt(t,e.drive,.1),level:se(t,a.level[0],a.level[1])}}function Ba(n,e=!1){const t=Cs(n),a=Ns(n),s=zs(n);return{kick:t,snare:a,clap:Ps(a,n),rim:_s(t,n),hat:Rs(s,n),hatOpen:s,tom:Os(a,n),metal:Is(t,a,n),shaker:e?Oa(n):G()}}function Bs(n,e,t){const a=n.tracks[e];if(!a)return n;const s=l=>l.every((p,d)=>p.on===(a.steps[d]?.on??!1));let r=a.steps;for(let l=0;l<6;l++){const p=Ba(t,a.voice==="shaker")[a.voice];if(r=Ia(p,a.length,d=>ja(a.voice,d)),!s(r)&&r.some(d=>d.on))break}const o=a.steps.slice(a.length);return{...n,tracks:n.tracks.map((l,p)=>p===e?{...l,steps:[...r,...o]}:l)}}function Fs(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<t||r>=e.length)return s;const o=r-t;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function Ds(n,e){const t=Ba(e),a=e()<.4?.5:se(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:a,fx:{...n.fx,mode:r,cutoff:se(e,.55,.9),resonance:se(e,.05,.3),drive:se(e,.02,.18)},tracks:n.tracks.map(o=>{const l=js(o.voice,o.params,e),p=o.voice==="shaker"?e()<.5?G():Oa(e):t[o.voice];return{...o,mute:o.mute,solo:o.solo,params:l,steps:Ia(p,o.length,d=>ja(o.voice,d))}})}}function qs(n,e=Math.random){const t=[];let a=null;for(let r=0;r<Z;r+=1){const o=an(Ds(n,e));t.push(o),r===0&&(a=o)}const s=a?{...n,bpm:n.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:n;return{bank:{slots:t,active:0},document:s}}function Ce(n){return`${Math.round(n*100)}%`}function Hs(n){return Ce(n)}function Us(n,e){return n==="tune"?`${Math.round(e)} Hz`:Ce(e)}function Gs(n){return n.charAt(0).toUpperCase()+n.slice(1)}function Bn(n){return`${Math.round(n*1e3)} ms`}const Ws={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:n=>`${Math.round(n)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:Bn},tone:{label:"Bright",min:0,max:1,step:.01,text:Ce},snap:{label:"Beads",min:0,max:1,step:.01,text:Ce},drive:{label:"Attack",min:0,max:1,step:.01,text:n=>Bn(On+(ws-On)*n)},level:{label:"Level",min:0,max:1,step:.01,text:Ce}};function Ks(n,e){return n==="shaker"?Ws[e]:{label:Gs(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:t=>Us(e,t)}}const It=2,Fa=64;function Vs(n,e){const{version:t,...a}=n,s={...a,version:It,slots:Array.from({length:Z},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Fn(n){return Array.isArray(n)&&n.length<=Fa}function Ys(n){if(Zs(n)>Js)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==sn)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==It)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const a=t.version,{slots:s,active:r,...o}=t,l=_e({...o,version:rn});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const p=l.document,d=[];for(const h of p.tracks)Fn(h.steps)||d.push(`More than ${Fa} steps on ${h.id}`);const c={slots:Array.from({length:Z},()=>null),active:null};return a===It&&(!Array.isArray(s)||s.length!==Z?d.push(`Expected ${Z} slots`):s.forEach((h,f)=>{if(h==null)return;if(!_e({...p,swing:h.swing,fx:h.fx,tracks:h.tracks}).ok||!h.tracks.every(g=>Fn(g.steps))){d.push(`Slot ${f+1} is malformed`);return}const b=typeof h.seed=="number"&&Number.isFinite(h.seed)?h.seed>>>0:0;c.slots[f]={swing:h.swing,fx:h.fx,tracks:h.tracks,seed:b}}),r!=null&&(!Number.isInteger(r)||r<0||r>=Z||!c.slots[r]?d.push("Active slot is empty or out of range"):c.active=r)),d.length>0?{ok:!1,errors:d}:{ok:!0,errors:[],document:p,bank:c,from:a}}const Dn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},qn=(n,e)=>{const t=n&&typeof n=="object"?n:{},a={...e.dials};for(const[s,r]of Object.entries(t.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof t.on=="boolean"?t.on:e.on,dials:a}};function Ge(n){const e=n.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:qn(e.drive,Dn.drive),compressor:qn(e.compressor,Dn.compressor)}}function Da(n){const e=Math.max(0,Math.min(1,n));return Math.min(2e4,40*2**(e*10))}const Xe=n=>Math.max(0,Math.min(100,n));function Xs(n){const e=Da(n.cutoff),t=Xe(Math.max(0,Math.min(1,n.resonance))*100);return n.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:Xe(100*Math.log(e/20)/Math.log(100)),q:t}}:n.mode==="bp"?{type:"bandpass",dials:{centre_hz:Xe(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:t,mix:100}}:{type:"lowpass",dials:{cutoff:n.cutoff>=.999?0:Xe(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const sn="netcomposer.rhythm",rn=1,tt="Saved by an older Rhythm (no Shaker lane), so it can't be opened",Js=256*1024,qa="netcomposer.rhythm.preset.",Qs=new Set(_a);function Ha(n){return`${qa}${n}`}function Zs(n){let e=0;for(const t of n){const a=t.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function _e(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==sn&&e.push("Unknown format"),t.version!==rn&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(qa))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const s of t.tracks)Qs.has(s.voice)||e.push(`Unknown voice ${s.voice}`),(!Number.isInteger(s.length)||s.length<1||s.length>64)&&e.push(`Bad length on ${s.id}`),(!Array.isArray(s.steps)||s.steps.length<s.length)&&e.push(`Steps shorter than length on ${s.id}`);if(e.length>0)return{ok:!1,errors:e};const a=t.tracks;return _a.some(s=>!a.some(r=>r.voice===s))?{ok:!1,errors:[tt]}:{ok:!0,errors:[],document:t}}function Ua(n,e=[]){return Array.from({length:16},(t,a)=>({on:n.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const er={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4},shaker:{...vs.shaker}};function Ga(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]},{voice:"shaker",name:"Shaker",on:[]}];return{format:sn,version:rn,id:Ha("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Ua(e.on,e.accent),params:{...er[e.voice]}}))}}function tr(){const n=Ga();return{...n,id:Ha("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:Ua([])}))}}const nr="Tap to join",Wa="Tap to join the playing beat";function nt(n,e){return n&&e?"join":e?"stop":"play"}function Ka(n){return n==="join"?nr:n==="stop"?"Stop":"Play"}function ar(n,e,t={}){const a=t.beatsPerBar??4,s=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+s)/a-1e-9)*a)}class ir{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=nt(e,t),this.shown}gesture(e,t,a=!1){return this.joinedBy=!1,a||this.joining||nt(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const a=this.joinedBy||this.joining||nt(e,t)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=ar(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class sr{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const a=this.key(e);if(this.value=e,this.has=!0,!t&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class on{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??Va(t,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new on;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Va(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class rr{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const p=this.meanInterval();return p===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/p)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Ya=globalThis,or="linkslots",lr=new Set(["0","false","off","no"]);function cr(n,e=Ya.location?.search??"",t=ur()){const a=new URLSearchParams(e).get(or);if(a!==null)return!lr.has(a.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function dr(n,e,t){return t||e===n}function ur(){try{return Ya.localStorage??null}catch{return null}}const pr="nc-ui",hr={breakpoint:{md:"768px"}},Xa={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},jt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},re={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Fe=n=>`--${pr}-${n}`,Bt=Xa["label-on-fill-dark"],Hn=Xa["label-on-fill-light"],mr=re["label-min-contrast"],fr=/^#[0-9a-f]{6}$/i,gr=n=>typeof n=="string"&&fr.test(n),at=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Un(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const a=e*Math.min(t,1-t),s=r=>{const o=(r+n/30)%12;return t-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${at(s(0)*255)}${at(s(8)*255)}${at(s(4)*255)}`}function Ja(n){const[e,t,a]=[1,3,5].map(c=>parseInt(n.slice(c,c+2),16)/255),s=Math.max(e,t,a),r=Math.min(e,t,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const p=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((t-a)/l%6):s===t?60*((a-e)/l+2):60*((e-t)/l+4))+360)%360,s:p,l:o}}function Gn(n){const[e,t,a]=[1,3,5].map(s=>{const r=parseInt(n.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*a}function Ft(n,e){const[t,a]=[Gn(n),Gn(e)].sort((s,r)=>r-s);return(t+.05)/(a+.05)}const lt=n=>Ft(n,Bt)>=Ft(n,Hn)?Bt:Hn;function Qa(n,e,t,a=mr){let s=Un(n,e,t);const r=lt(s)===Bt?1:-1;for(let o=0;o<40&&Ft(s,lt(s))<a;o++)t+=r*.01,s=Un(n,e,t);return s}function br(n){const{h:e,s:t}=Ja(n),a=Qa(e,Math.min(t,re["surprise-on-max-saturation"]),re["surprise-on-lightness"]);return{fill:n,ink:lt(n),on:a,onInk:lt(a)}}const yr=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function wr(n,e=Math.random){const[t,a]=re["surprise-saturation"],[s,r]=re["surprise-lightness"],o=re["surprise-min-hue-gap"],l=gr(n)?Ja(n).h:null;let p=e()*360;return l!==null&&yr(p,l)<o&&(p=(l+o+e()*(360-2*o))%360),Qa(p,t+e()*(a-t),s+e()*(r-s))}function vr(n){if(!n)return null;const e=br(n);return{[Fe("surprise-fill")]:e.fill,[Fe("surprise-ink")]:e.ink,[Fe("surprise-on")]:e.on,[Fe("surprise-on-ink")]:e.onInk}}const kr=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,$r=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function Wn(n){const[e,t,a]=[1,3,5].map(l=>kr(parseInt(n.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function xr([n,e,t]){const a=(n+.3963377774*e+.2158037573*t)**3,s=(n-.1055613458*e-.0638541728*t)**3,r=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>at($r(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const Sr=re["velocity-range"],Za={min:jt.rhythm["velocity-min"],max:jt.rhythm["velocity-max"]};function Er(n,e=Za){const[t,a]=Sr,s=Number.isFinite(n)?Math.max(t,Math.min(a,n)):t,r=(s-t)/(a-t),o=jt.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=Wn(e.min),p=Wn(e.max);return{velocity:s,t:r,fill:xr(l.map((d,c)=>d+(p[c]-d)*r)),ink:o}}function Kn(n,e=Za){return{[Fe("velocity-fill")]:Er(n,e).fill}}const Tr=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Ar={renames:Tr},Mr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Lr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Cr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ft={};for(const[n,e]of Object.entries(Mr))ft[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(Cr))ft[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Lr))ft[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(Ar.renames.map(n=>[n.old,n.new]));function ei(n){const e=ft[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function O(n){return ei(n).prop}function i(n){return`var(${O(n)})`}function Nr(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(O(e)));return Number.isFinite(t)?t:0}function F(n,e){const t=ei(e),a=n.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const r=`var(${t.prop})`;t.kind==="family"?s.style.fontFamily=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?s.style.paddingLeft=r:s.style.color=r,(n instanceof Element?n:a.documentElement).append(s);const p=(a.defaultView??window).getComputedStyle(s),d=t.kind==="family"?p.fontFamily:t.kind==="color"?p.color:p.paddingLeft;return s.remove(),d}function Pr(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function _r(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=i("font-ui"),t.style.fontSize=i("label-size"),t.style.fontWeight=i("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const s=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),s}const zr="[data-modulated], [data-modulated] *";function Rr(){const n=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${O("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${O("divider")}: ${i(`module-div-stack-${a}`)};
      ${O("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,t=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${O("text-sub")}: ${i("module-sub-stack-1")};
      ${O("divider")}: ${i("module-div-stack-1")};
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
${[1,2,3,4].map(n).join(`
`)}
${[1,2,3,4].map(t).join(`
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
${zr} { transition: none; }
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
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]) { background: ${i("rhythm.step-cell-off")}; }
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
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-page-action) { position: relative; }
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-page-action)::before {
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
.nc-padgrid-pad-name { font-weight: ${i("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${i("motion-fade-out")} ${i("motion-fade-out-easing")};
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
  ${O("text-sub")}: ${i("module-sub-stack-1")};
  ${O("divider")}: ${i("module-div-stack-1")};
  ${O("slider-track")}: ${i("module-div-stack-1")};
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
  ${O("text-sub")}: ${i("module-sub-stack-1")};
  ${O("divider")}: ${i("module-div-stack-1")};
  ${O("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${O("text-sub")}: inherit;
  ${O("divider")}: inherit;
  ${O("slider-track")}: inherit;
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
`}let At=null;const Or="nc-ui-fallback";function ti(n=globalThis.document){if(!n?.documentElement||(n.documentElement,At&&At.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Or} {
${Rr()}
}
`,n.head.append(e),At=e}function ni(n={}){const e=n.doc??globalThis.document,t=e.createElement("button");t.type="button",t.className="nc-ui-switch",t.setAttribute("role","switch"),n.id&&(t.id=n.id),n.labelledBy?t.setAttribute("aria-labelledby",n.labelledBy):n.label&&t.setAttribute("aria-label",n.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=n.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=n.offText??"Off",a.append(s,r),t.append(a);let o=!1;const l=d=>{o=d===!0,t.setAttribute("aria-checked",o?"true":"false")};l(n.checked);const p=()=>{l(!o),n.onChange?.(o)};return t.addEventListener("click",p),{el:t,get checked(){return o},set:l,destroy(){t.removeEventListener("click",p),t.remove()}}}const ai=new WeakMap,Vn=.25;function Ir(n){const e=n.doc??globalThis.document,t=e.createElement("div");t.className="nc-fader",t.tabIndex=0,t.setAttribute("role","slider"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),t.append(a,s);let r=0,o=n.step??.005,l=n.onChange,p=n.onReset;const d=u=>Math.min(1,Math.max(0,u)),c=()=>{t.style.setProperty("--fader-pos",String(r)),t.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=u=>{const m=d(u);m!==r&&(r=m,c(),l?.(m))};let f=0,y=!1;t.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),t.focus?.({preventScroll:!0});const m=t.getBoundingClientRect();u.target!==s&&m.height>0&&h(1-(u.clientY-m.top)/m.height),f=u.clientY,y=!0,t.dataset.dragging="true",t.setPointerCapture?.(u.pointerId)}),t.addEventListener("pointermove",u=>{if(!y)return;const m=t.getBoundingClientRect().height||1,v=(f-u.clientY)/m*(u.shiftKey?Vn:1);f=u.clientY,h(r+v)});const b=()=>{y=!1,delete t.dataset.dragging};t.addEventListener("pointerup",b),t.addEventListener("pointercancel",b),t.addEventListener("lostpointercapture",b),t.addEventListener("dblclick",u=>{u.preventDefault(),p?.()}),t.addEventListener("keydown",u=>{const m=u.shiftKey?o*Vn:o,v={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};u.key in v&&(u.preventDefault(),h(v[u.key]))});const g={el:t,get value(){return r},get dragging(){return y},set(u){y||(r=d(Number(u)||0),c())},setText(u){u?t.setAttribute("aria-valuetext",u):t.removeAttribute("aria-valuetext")},setLabel(u){t.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(o=u.step),u.onChange&&(l=u.onChange),u.onReset&&(p=u.onReset)}};return g.setLabel(n.label),g.set(n.value??0),g.setText(n.valueText),ai.set(t,g),g}function jr(n){return ai.get(n)}const ii=new WeakMap,Br=.2,Fr=1.5,Dr=.5;function qr(n,e){const t=String(n??"").trim(),a=Number.parseFloat(t);return Number.isFinite(a)?t.endsWith("ms")?a/1e3:a:e}function Yn(n,e,t){const a=n.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?t:qr(a.getComputedStyle(n).getPropertyValue(O(e)),t)}function Hr(n){const e=n.doc??globalThis.document,t=n.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(t);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let g=0;g<t;g++){const u=e.createElement("span");u.className="nc-meter-bar";const m=e.createElement("span");m.className="nc-meter-peak";const v=e.createElement("span");v.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",u.append(m,v,k),r.append(u),o.push({peak:m,rms:v,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=n.label,p=n.onClear,d=!1,c=-1,h=-1;const f=()=>{s.dataset.lit=d?"true":"false",s.setAttribute("aria-pressed",d?"true":"false"),s.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),s.title=d?"Clipped. Click to clear":"Clip light"},y=(g,u,m,v)=>{const k=Math.round(v*1e3)/1e3;m[u]!==k&&(m[u]=k,g.style.transform=u==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{b.clear(),p?.()});const b={el:a,get clipped(){return d},update(g,u){c<0&&(c=Yn(a,"motion-meter-fall",Br)),h<0&&(h=Yn(a,"motion-meter-hold",Fr));const m=Math.max(0,Math.min(.25,Number(u)||0)),v=c>0?Math.exp(-m/c):0;o.forEach((k,S)=>{const w=g[S]??g[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(w.peak)||0)),E=Math.min(x,Math.max(0,Number(w.rms)||0));w.over&&b.clip(),k.level.peak=x>=k.level.peak?x:x+(k.level.peak-x)*v,k.level.rms=E>=k.level.rms?E:E+(k.level.rms-E)*v,k.holdAge+=m,x>=k.holdAt?(k.holdAt=x,k.holdAge=0):k.holdAge>h&&(k.holdAt=Math.max(x,k.holdAt-Dr*m)),y(k.peak,"peak",k.shown,k.level.peak),y(k.rms,"rms",k.shown,k.level.rms),y(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(const g of o)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,y(g.peak,"peak",g.shown,0),y(g.rms,"rms",g.shown,0),y(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,f()},configure(g){g.onClear&&(p=g.onClear)}};return f(),b.reset(),ii.set(a,b),b}function Ur(n){return n?ii.get(n):void 0}function Gr(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),a=n.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(t*a));(n.width!==s||n.height!==r)&&(n.width=s,n.height=r);const o=n.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:t}}function ae(n){return Math.max(0,Math.min(1,n))}function si(n,e){const{ctx:t,w:a,h:s}=Gr(n);if(!t)return;t.clearRect(0,0,a,s);const r=_r(n);if(e.paint==="swatch"){const p=F(n,"accent"),d=F(n,"rhythm.step-cell-on");n.dataset.ncAccent=p,n.dataset.ncStep=d,t.fillStyle=p,t.fillRect(0,0,a/2,s),t.fillStyle=d,t.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const p=e.mode??"lp",d=F(n,Pr(p)),c=F(n,"divider"),h=ae(e.cutoff??.5),f=.08+(1-ae(e.resonance??.2))*.22;t.strokeStyle=c,t.beginPath(),t.moveTo(0,s*.72),t.lineTo(a,s*.72),t.stroke(),t.beginPath();for(let y=0;y<=a;y++){const b=y/Math.max(1,a);let g=0;p==="lp"?g=b<h?1:Math.max(0,1-(b-h)/f):p==="hp"?g=b>h?1:Math.max(0,1-(h-b)/f):g=Math.max(0,1-Math.abs(b-h)/f);const u=s*.78-g*s*.62;y===0?t.moveTo(y,u):t.lineTo(y,u)}t.strokeStyle=d,t.stroke(),t.fillStyle=F(n,"text-sub"),t.font=r,t.fillText(p.toUpperCase(),0,s),n.dataset.ncAccent=d;return}if(e.paint==="envelope"){t.strokeStyle=F(n,"accent"),t.beginPath();const p=Math.max(.05,e.decay??.4);for(let d=0;d<=a;d++){const c=d/Math.max(1,a),h=(s-4)*(1-Math.exp(-c*4/p));t.lineTo(d,s-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="waveform"){const p=Array.isArray(e.peaks)?e.peaks:[],[d,c]=Array.isArray(e.region)?e.region:[0,1],h=F(n,"accent"),f=F(n,"text-sub"),y=s/2;t.fillStyle=F(n,"accent-soft"),t.fillRect(ae(d)*a,0,(ae(c)-ae(d))*a,s),t.strokeStyle=F(n,"divider"),t.beginPath(),t.moveTo(0,y),t.lineTo(a,y),t.stroke();const b=Math.floor(p.length/2);for(let g=0;g<b;g++){const u=(g+.5)/b*a,m=Math.max(-1,Math.min(1,p[g*2]??0)),v=Math.max(-1,Math.min(1,p[g*2+1]??0)),k=(g+.5)/b;t.strokeStyle=k>=d&&k<=c?h:f,t.beginPath(),t.moveTo(u,y-v*(y-1)),t.lineTo(u,y-m*(y-1)+.5),t.stroke()}t.strokeStyle=h;for(const g of[d,c,...Array.isArray(e.markers)?e.markers:[]]){const u=Math.round(ae(g)*(a-1))+.5;t.beginPath(),t.moveTo(u,0),t.lineTo(u,s),t.stroke()}typeof e.position=="number"&&e.position>=0&&(t.fillStyle=F(n,"text"),t.fillRect(Math.round(ae(e.position)*(a-1)),0,1,s)),b||(t.fillStyle=f,t.font=r,t.fillText(e.empty??"Empty",0,y+4)),n.dataset.ncAccent=h;return}if(e.paint==="meter"){const p=ae(e.level??0);t.fillStyle=F(n,"divider"),t.fillRect(0,s*.4,a,s*.2),t.fillStyle=F(n,"accent"),t.fillRect(0,s*.4,a*p,s*.2),n.dataset.ncAccent=t.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;t.fillStyle=F(n,"rhythm.step-cell-off"),t.fillRect(0,s*.45,a,s*.1),t.fillStyle=F(n,"rhythm.playhead"),t.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),n.dataset.ncAccent=F(n,"accent")}const ri={slop:8,longPressMs:500,pitchPx:16};class Wr{constructor(e,t,a=ri){this.hit=e,this.emit=t,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,a,s){if(this.phase!=="idle")return!1;const r=this.hit(t,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,a,s){if(e!==this.pointer)return;const r=t-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Kr(n,e,t,a=ri){let s=!1,r=0;const o=(d,c)=>{const f=n.ownerDocument.elementFromPoint?.(d,c),y=[...n.querySelectorAll(e)],b=f?y.findIndex(m=>m===f||m.contains(f)):-1;if(b>=0)return b;let g=-1,u=Number.POSITIVE_INFINITY;return y.forEach((m,v)=>{if(m.hidden)return;const k=m.getBoundingClientRect();if(c<k.top||c>k.bottom)return;const S=Math.abs(d-(k.left+k.width/2));S<u&&S<=k.width&&(g=v,u=S)}),g},l=new Wr(o,d=>{(d.kind==="paint"||d.kind==="long")&&(s=!0),t(d)},a),p=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",d=>{d.button>0||(s=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(p(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),n.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&p())}),n.addEventListener("pointerup",d=>{p(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),n.addEventListener("pointercancel",d=>{p(),l.cancel(d.pointerId)}),n.addEventListener("click",d=>{s&&(s=!1,d.stopPropagation(),d.preventDefault())},!0),n.addEventListener("contextmenu",d=>d.preventDefault()),l}const Vr=450,Je="application/x-nc-pad",Xn="http://www.w3.org/2000/svg",Yr=48;function Xr(n){const e=Math.floor((n?.length??0)/2);if(!e)return"";const t=Math.min(Yr,e),a=[],s=[];for(let r=0;r<t;r++){const o=Math.floor(r*e/t),l=Math.max(o+1,Math.floor((r+1)*e/t));let p=0,d=0;for(let h=o;h<l;h++)p=Math.min(p,n[2*h]??0),d=Math.max(d,n[2*h+1]??0);const c=t===1?50:r/(t-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),s.push(`${c.toFixed(1)} ${(10-Math.max(-1,p)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function Jr(n,e){const t=document.createElement("div");t.className="nc-padgrid",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","group"),t.setAttribute("aria-label",n.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(n.columns??2),n.pads.forEach((s,r)=>a.append(Qr(t,r,e))),t.append(a),t.addEventListener("keydown",s=>{s.key==="Escape"&&it(t)}),li(t,n),t}function Qr(n,e,t){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="nc-padgrid-pad-name";const o=document.createElement("span");o.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const p=document.createElementNS(Xn,"svg");p.setAttribute("class","nc-padgrid-pad-wave"),p.setAttribute("viewBox","0 0 100 20"),p.setAttribute("preserveAspectRatio","none"),p.setAttribute("aria-hidden","true");const d=document.createElementNS(Xn,"path");return p.append(d),a.append(s,r,o,l,p),eo(n,a,e,t),a.addEventListener("dblclick",()=>{const c=t(n);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&oi(n,a,e,t)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Je,String(e)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{const h=c.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(Je)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=h.includes(Je)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;const h=t(n);if(h?.type!=="padGrid")return;const f=c.dataTransfer?.getData(Je);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();const b=Number(f);b!==e&&h.onMove?.(b,e,c.altKey);return}const y=c.dataTransfer?.files?.[0];y&&(c.preventDefault(),c.stopPropagation(),h.onFile?.(e,y))}),a}function Zr(n,e,t){const a=t(n);a?.type==="padGrid"&&a.onPress(e)}function eo(n,e,t,a){let s=0,r=!1,o=0,l=0;const p=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",d=>{d.button===0&&(r=!1,o=d.clientX,l=d.clientY,p(),s=window.setTimeout(()=>{s=0,r=Jn(n,e,t,a)},Vr))}),e.addEventListener("pointermove",d=>{s&&Math.hypot(d.clientX-o,d.clientY-l)>8&&p()});for(const d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,p);e.addEventListener("contextmenu",d=>{d.preventDefault(),p(),r=Jn(n,e,t,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}Zr(n,t,a)})}function Jn(n,e,t,a){const s=a(n);if(s?.type!=="padGrid"||!s.menu)return!1;const r=s.menu(t);if(!r.length)return!1;it(n);const o=document.createElement("div");o.className="nc-slot-scrim",o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),it(n)}),o.addEventListener("click",c=>c.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const c of r){const h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=c.id,h.textContent=c.label,h.addEventListener("click",()=>{it(n);const f=a(n);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?oi(n,e,t,a):f.onMenu?.(t,c.id))}),l.append(h)}n.append(o,l);const p=n.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-p.left}px`,l.style.top=`${d.bottom-p.top}px`,l.querySelector("button")?.focus(),!0}function oi(n,e,t,a){n.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(n);if(s?.type!=="padGrid")return;const r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=s.nameMax??24,r.value=s.pads[t]?.label??"",r.setAttribute("aria-label",`Name of pad ${t+1}`);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-o.left}px`,r.style.top=`${l.top-o.top}px`,r.style.width=`${l.width}px`;let p=!1;const d=c=>{if(p)return;p=!0;const h=r.value.trim();r.remove(),e.focus();const f=a(n);c&&h&&f?.type==="padGrid"&&f.onRename?.(t,h)};r.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(const c of["pointerdown","click","dblclick"])r.addEventListener(c,h=>h.stopPropagation());n.append(r),r.focus(),r.select()}function it(n){for(const e of n.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function li(n,e){const t=n.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const r=t[s];if(!(r instanceof HTMLButtonElement))return;const o=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),p=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",o&&(o.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),p?.setAttribute("d","")):(delete r.dataset.empty,o&&(o.textContent=a.label),l&&(l.textContent=""),p?.setAttribute("d",Xr(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;const c=e.selected===s;c?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",c?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function q(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function gt(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const a=document.createElement("label");a.className="nc-label",a.htmlFor=n,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",t.append(a,s),t}function Qn(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function We(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const to=450,Zn=8;function ee(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function no(n){const e=Nr(n,"target-min");return e>0?e:44}function ao(n){if(!(n instanceof HTMLElement))return;const e=[...n.querySelectorAll(".nc-hit")],t=no(n),a=t/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=t&&l.height>=t){o.style.display="none";continue}const p=l.left+l.width/2,d=l.top+l.height/2;let c=p-a,h=p+a,f=d-a,y=d+a;for(let b=0;b<e.length;b++){if(r===b)continue;const g=s[b];if(!g||g.width===0)continue;const u=g.left+g.width/2,m=g.top+g.height/2;Math.abs(m-d)<a*2&&(u>p?h=Math.min(h,(p+u)/2):u<p&&(c=Math.max(c,(p+u)/2))),Math.abs(u-p)<a*2&&(m>d?y=Math.min(y,(d+m)/2):m<d&&(f=Math.max(f,(d+m)/2)))}c=Math.min(c,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),o.style.left=`${c-l.left}px`,o.style.top=`${f-l.top}px`,o.style.width=`${Math.max(0,h-c)}px`,o.style.height=`${Math.max(0,y-f)}px`,o.style.transform="none"}}function ci(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ea(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ct(n,e){switch(n.type){case"slider":return io(n,e);case"select":return ro(n,e);case"toggle":return oo(n,e);case"button":return lo(n,e);case"readout":return co(n);case"label":return uo(n);case"note":return ta(n);case"knob":return mo(n,e);case"choice":return fo(n,e);case"slotRow":return go(n,e);case"stepGrid":return vo(n,e);case"canvas":return xo(n);case"fx":return Ao(n,e);case"strip":return So(n,e);case"stripAdd":return To(n,e);case"padGrid":return Jr(n,e);default:return ta({id:"unknown",text:""})}}function oe(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),a=n.querySelector("label");a&&(a.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,di(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const s=n.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??We(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),Qn(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")Qn(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&po(t,e);const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??We(e.value))}else if(e.type==="choice")ui(n,e);else if(e.type==="slotRow")hi(n,e);else if(e.type==="stepGrid")Dt(n,e);else if(e.type==="padGrid")li(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&si(t,e)}else if(e.type==="strip"){bi(n,e);for(const t of e.sends??[]){const a=n.querySelector(`[data-nc-id="${ca(t.id)}"]`);a instanceof Element&&oe(a,{...t,type:"knob"})}}else if(e.type==="stripAdd")fi(n,e);else if(e.type==="fx"){yi(n,e);for(const t of[...e.controls,...e.more??[]]){const a=n.querySelector(`[data-nc-id="${ca(t.id)}"]`);a instanceof Element&&oe(a,t)}}}}function io(n,e){const t=gt(n.id,n.label);t.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=n.id,a.min=String(n.min),a.max=String(n.max),a.step=String(n.step),a.value=String(n.value),a.disabled=n.disabled===!0,a.dataset.ncId=n.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=t.querySelector("[data-nc-readout]");return t.insertBefore(a,s),n.onTap&&t.insertBefore(so(n,a,e),s),t.append(q()),oe(t,n),t}function so(n,e,t){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=n.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),a.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ee());const s=r=>{const o=t(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function ro(n,e){const t=gt(n.id,n.label),a=document.createElement("select");a.className="nc-select",a.id=n.id,a.dataset.ncId=n.id;for(const s of n.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=n.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),t.append(a,q()),t}function oo(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const a=e(t);a?.type==="toggle"&&a.onPress()}),t.append(q()),oe(t,n),t}function lo(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const r=e(t);r?.type==="button"&&r.onPress()}),t.append(q()),oe(t,n),!n.onSparkle)return t;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=n.id,s.setAttribute("aria-label","Surprise me"),s.title=n.sparkleTitle??"Surprise me",s.innerHTML=ci(),s.addEventListener("click",()=>{const r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&mi(r);const o=e(t);o?.type==="button"&&o.onSparkle?.()}),a.append(t,s),a}function co(n){const e=gt(n.id,n.label);return e.append(q()),oe(e,n),e}function uo(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(q()),e}function ta(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(q()),e}function na(n){if(typeof n.valueText=="string")return n.valueText;const e=We(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function di(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function po(n,e){const t=e.max-e.min||1,a=(e.value-e.min)/t;di(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(a*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",na(e)),n.setAttribute("aria-label",e.ariaLabel??e.label),n.title=`${e.ariaLabel??e.label}: ${na(e)}`}function ho(n,e){const t=n.max-n.min||1,a=typeof n.step=="number"&&n.step>0?n.step:t/100,s=e.shiftKey?a/10:a;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+a*10:e.key==="PageDown"?n.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-s:null}function mo(n,e){const t=gt(n.id,n.label);n.compact&&(t.dataset.ncCompact="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=n.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",p=>{r=p.clientY;const d=e(a);o=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(p.pointerId)}),a.addEventListener("pointermove",p=>{if(a.hasPointerCapture&&!a.hasPointerCapture(p.pointerId))return;const d=e(a);if(d?.type!=="knob")return;const c=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,o-(p.clientY-r)*c/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{const p=e(a);p?.type==="knob"&&typeof p.defaultValue=="number"&&p.onChange(p.defaultValue)}),a.addEventListener("keydown",p=>{const d=e(a);if(d?.type!=="knob")return;const c=ho(d,p);c!==null&&(p.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,c))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(a,l),t.append(q()),oe(t,n),t}function fo(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const a of n.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(t);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...t.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let p=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")p=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")p=(l-1+o.length)%o.length;else if(r.key==="Home")p=0;else if(r.key==="End")p=o.length-1;else return;const d=o[p];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),t.append(s)}return t.append(q()),ui(t,n),t}function ui(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const a=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",a?"true":"false"),t.tabIndex=a?0:-1}}function go(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<n.slots.length;c++){const h=n.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";const y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(c),y.textContent=h.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,ee()),bo(f,y,t,c,e),a.append(f)}const s=n.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=ci(),s.append(ee()),s.addEventListener("click",()=>{mi(t);const c=e(t);c?.type==="slotRow"&&c.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const c=e(t);c?.type==="slotRow"&&c.onMorph(Number(l.value))});const p=document.createElement("span");p.className="nc-readout nc-morph-readout",p.dataset.ncMorph="",r.append(o,p,l);const d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...s?[s]:[]),t.append(d,r,q()),pi(t,e),hi(t,n),t}function aa(n,e,t,a){const s=t(n);if(s?.type!=="slotRow")return;De(n);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function bo(n,e,t,a,s){let r=0,o=0,l=0,p=!1,d=!1,c=!1,h=!1;const f=()=>{window.clearTimeout(r),r=0},y=m=>{const v=m.clientX-o,k=m.clientY-l;v*v+k*k>Zn*Zn&&(p=!0,f())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",u))},g=m=>{const v=r!==0&&!p&&!d;f(),b(),v&&(c=!0,aa(t,a,s,m))},u=()=>{p=!0,f(),b()};n.addEventListener("pointerdown",m=>{m.button===0&&(b(),d=!1,p=!1,c=!1,o=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!p&&(d=!0,yo(t,e,a,s))},to),h=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",u))}),n.addEventListener("contextmenu",m=>m.preventDefault()),n.addEventListener("click",m=>{if(c||d||p){c=!1,d=!1,p=!1;return}aa(t,a,s,m)})}function pi(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const a=ia("Save","store"),s=ia("Clear","clear");t.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),De(n)}),r.addEventListener("click",o=>o.stopPropagation()),n.append(r,t),t.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const p=e(n);if(p?.type!=="slotRow")return;const d=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(p.onSlot(d,"store"),De(n)):l.dataset.ncSlotOp==="clear"&&(p.onSlot(d,"clear"),De(n))}),n.addEventListener("keydown",o=>{o.key==="Escape"&&De(n)})}function ia(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function yo(n,e,t,a){pi(n,a);const s=n.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(t);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function De(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function hi(n,e){for(const s of n.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const a=n.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function mi(n){const e=n.dataset.ncLastFill||null,t=wr(e);n.dataset.ncLastFill=t;const a=vr(t);if(a)for(const[s,r]of Object.entries(a))n.style.setProperty(s,r)}function wo(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,t.setAttribute("aria-pressed",r?"true":"false");const o=e(n);o?.type==="stepGrid"&&o.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>s(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function vo(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=u=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,a.append(m),m},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=u=>{for(const m of[r,o]){const v=m===u;m.setAttribute("aria-checked",v?"true":"false"),m.tabIndex=v?0:-1}};l(r);for(const u of[r,o])u.addEventListener("click",()=>l(u));a.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();const m=o.getAttribute("aria-checked")==="true"?r:o;l(m),m.focus()});const p=document.createElement("div");if(p.className="nc-step-tools",p.append(a),n.onFill&&p.append(wo(t,e)),n.onClear){const u=document.createElement("button");u.type="button",u.className="nc-fill nc-clear",u.dataset.ncClear="",u.textContent=n.clearLabel??"Clear",u.title="Clear every step (Undo takes it back)",u.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.onClear?.()}),p.append(u)}t.append(p);for(const u of n.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=u.label,v.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(v.dataset.ncLane=String((u.lane-1)%4+1)),v.addEventListener("click",()=>{const w=e(t);if(w?.type!=="stepGrid")return;const x=w.rows.findIndex(E=>E.id===u.id);w.onSelectRow?.(x)}),v.addEventListener("keydown",w=>ko(t,v,w));const k=[];for(const w of["mute","solo"]){if(!(w==="mute"?n.onMute:n.onSolo))continue;const E=document.createElement("span");E.className="nc-ms-wrap";const A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=w,A.textContent=w==="mute"?"M":"S",A.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${u.label}`),E.append(A,ee()),E.addEventListener("click",()=>{const _=e(t);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(de=>de.id===u.id);(w==="mute"?_.onMute:_.onSolo)?.(W)}),k.push(E)}const S=document.createElement("div");S.className="nc-steps";for(let w=0;w<u.steps.length;w++){const x=document.createElement("span");x.className="nc-step-wrap";const E=document.createElement("button");E.type="button",E.className="nc-step",E.dataset.ncStep=`${u.id}:${w}`,E.setAttribute("aria-label",`${u.label} step ${w+1}`),x.append(E,ee()),x.addEventListener("click",A=>{const _=e(t);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(ve=>ve.id===u.id),de=o.getAttribute("aria-checked")==="true";_.onToggle(W,w,A.shiftKey||de)}),S.append(x)}if(n.onLength&&S.append($o(t,S,u,e)),m.append(...k,v,S),n.onDice){const w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=u.id,w.setAttribute("aria-label",`Re-roll ${u.label}`),w.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=ea(),w.append(ee()),w.addEventListener("click",()=>{const x=e(t);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(E=>E.id===u.id))}),m.append(w)}m.addEventListener("click",w=>{if(w.target!==m)return;const x=e(t);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(E=>E.id===u.id))}),sa(t,S,".nc-step-wrap",e,o,()=>u.id),t.append(m)}const d=document.createElement("div");d.className="nc-pads-head";const c=(u,m,v)=>{const k=document.createElement("button");return k.type="button",k.className=u,k.textContent=m,v&&k.setAttribute("aria-label",v),k},h=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),y=document.createElement(n.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),n.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{const u=e(t);u?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",Dt(t,u))}));for(const[u,m]of[[h,-1],[f,1]])u.addEventListener("click",()=>{const v=e(t);if(v?.type!=="stepGrid"||v.rows.length===0)return;const k=v.rows.length;v.onSelectRow?.(((Qe(v)+m)%k+k)%k)});if(d.append(h,y,f),n.onDice){const u=c("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=ea(),u.addEventListener("click",()=>{const m=e(t);if(m?.type!=="stepGrid")return;const v=Qe(m);v>=0&&m.onDice?.(v)}),d.append(u)}if(n.transport){const u=c("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(u)}t.append(d);const b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");const g=Math.max(0,...n.rows.map(u=>u.steps.length));for(let u=0;u<g;u++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",v=>{const k=e(t);if(k?.type!=="stepGrid")return;const S=Qe(k);if(S<0)return;if(t.dataset.ncLenMode==="true"){k.onLength?.(S,u+1);return}const w=o.getAttribute("aria-checked")==="true";k.onToggle(S,u,v.shiftKey||w)}),b.append(m)}return sa(t,b,".nc-pad",e,o,()=>{const u=e(t);return u?.type==="stepGrid"?u.rows[Qe(u)]?.id:void 0}),t.append(b),t.append(q()),Dt(t,n),t}function Qe(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function sa(n,e,t,a,s,r){let o="on",l=!0,p=-1;const d=(c,h)=>{const f=c.rows[p]?.steps[h];!f||h>=c.rows[p].length||(c.onSet?c.onSet(p,h,o,l):!!f[o]!==l&&c.onToggle(p,h,o==="accent"))};Kr(e,t,c=>{const h=a(n);if(h?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(c.kind!=="paint")return;const f=h.rows.findIndex(y=>y.id===r());f>=0&&h.rows[f].length!==c.pad+1&&h.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){const f=r();p=h.rows.findIndex(b=>b.id===f);const y=h.rows[p]?.steps[c.pad];if(!y)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[o]}d(h,c.pad)}else if(c.kind==="long"){const f=r(),y=h.rows.findIndex(g=>g.id===f),b=e.querySelectorAll(t)[c.pad];y>=0&&b instanceof HTMLElement&&h.onLongPress?.(y,c.pad,b)}}})}function ko(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const a=[...n.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;t.key==="ArrowDown"?r=s+1:t.key==="ArrowUp"?r=s-1:t.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(t.preventDefault(),o.focus(),o.click())}function $o(n,e,t,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(t.steps.length)),s.append(ee());const r=d=>{const c=a(n);if(c?.type!=="stepGrid")return;const h=c.rows.findIndex(b=>b.id===t.id),f=c.rows[h];if(!f)return;const y=Math.max(1,Math.min(f.steps.length,d));y!==f.length&&c.onLength?.(h,y)},o=d=>{const c=[...e.querySelectorAll(".nc-step")];let h=1;return c.forEach((f,y)=>{const b=f.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(h=y+1)}),h},l=d=>r(o(d.clientX)),p=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p),delete s.dataset.dragging};return s.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))}),s.addEventListener("keydown",d=>{const c=a(n);if(c?.type!=="stepGrid")return;const h=c.rows.find(y=>y.id===t.id);if(!h)return;const f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in f&&(d.preventDefault(),r(f[d.key]))}),s}const Mt=new WeakMap;function ra(n,e){const t=typeof e=="number"?e:null;if(!(Mt.has(n)&&Mt.get(n)===t)){if(Mt.set(n,t),t===null){for(const a of Object.keys(Kn(1)))n.style.removeProperty(a);return}for(const[a,s]of Object.entries(Kn(t)))n.style.setProperty(a,s)}}function Dt(n,e){const t=e.rows.some(c=>c.solo),a=n.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=n.querySelector(".nc-pads"),r=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),l=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",l?"true":"false"),o.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));const p=n.querySelector("[data-nc-pads-dice]");p instanceof HTMLElement&&r&&(p.setAttribute("aria-label",`Re-roll ${r.label}`),p.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);const d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,h=e.transport?.label??(c?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",c?"true":"false");const f=e.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(s instanceof HTMLElement&&r){s.setAttribute("aria-label",`${r.label} steps`),r.lane&&(s.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||t&&!r.solo?s.dataset.silent="true":delete s.dataset.silent;const c=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(const h of s.querySelectorAll("[data-nc-pad]")){const f=Number(h.getAttribute("data-nc-pad")),y=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!y||!l&&f>=r.length,l&&f>=r.length?h.dataset.out="true":delete h.dataset.out,l&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",y?.on?"true":"false"),y?.accent?h.dataset.accent="true":delete h.dataset.accent,y?.dim?h.dataset.dim="true":delete h.dataset.dim,ra(h,y?.velocity),e.playhead>=0&&f===c?h.dataset.playhead="true":delete h.dataset.playhead)}}for(const c of e.rows){for(let b=0;b<c.steps.length;b++){const g=c.steps[b],u=n.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(u instanceof HTMLButtonElement))continue;const m=u.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===c.id?m.dataset.selected="true":delete m.dataset.selected;const S=m.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),S.textContent!==c.label&&(S.textContent=c.label,S.setAttribute("aria-label",`Select ${c.label}`))),c.mute||t&&!c.solo?m.dataset.silent="true":delete m.dataset.silent;for(const x of m.querySelectorAll("[data-nc-ms]")){const E=x.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;x.setAttribute("aria-pressed",E?"true":"false")}}u.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?u.dataset.accent="true":delete u.dataset.accent,g.dim?u.dataset.dim="true":delete u.dataset.dim,b%4===0?u.dataset.bar="true":delete u.dataset.bar,typeof g.velocity=="number"?(u.dataset.velocity="true",u.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete u.dataset.velocity,u.style.removeProperty("--level")),ra(u,g.velocity);const v=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;b===v?u.dataset.playhead="true":delete u.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;u.hidden=b>=c.length&&!k,b>=c.length&&k?u.dataset.out="true":delete u.dataset.out}const h=n.querySelector(`[data-nc-len="${c.id}"]`),y=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&y&&y.nextElementSibling!==h){const b=document.activeElement===h;y.after(h),b&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(c.length)),h.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),h.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function xo(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=n.id,a.dataset.ncPaint=n.paint,e.append(t,a,q()),e}function So(n,e){const t=document.createElement("div");t.className="nc-strip",t.dataset.ncId=n.id,t.setAttribute("role","group"),t.setAttribute("aria-label",n.label),n.master&&(t.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",a.append(s),n.onRemove){const b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{const g=e(t);g?.type==="strip"&&g.onRemove?.(b)}),a.append(b)}const r=document.createElement("div");if(r.className="nc-strip-hacks",n.onHacks){const b=document.createElement("span");b.className="nc-hacks-wrap";const g=document.createElement("button");g.type="button",g.className="nc-hacks",g.dataset.ncHacks="",b.append(g,ee()),b.addEventListener("click",()=>{const u=e(t);u?.type==="strip"&&u.onHacks?.()}),r.append(b)}const o=document.createElement("div");o.className="nc-strip-ms";for(const b of["mute","solo"]){if(!(b==="mute"?n.onMute:n.onSolo))continue;const u=document.createElement("span");u.className="nc-ms-wrap";const m=document.createElement("button");m.type="button",m.className="nc-ms",m.dataset.ncMs=b,m.textContent=b==="mute"?"M":"S",u.append(m,ee()),u.addEventListener("click",()=>{const v=e(t);v?.type==="strip"&&(b==="mute"?v.onMute:v.onSolo)?.()}),o.append(u)}const l=document.createElement("div");l.className="nc-strip-sends";for(const b of n.sends??[])l.append(ct({...b,type:"knob",compact:!0},e));const p=document.createElement("div");p.className="nc-strip-body";const d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(const b of n.ticks??[]){const g=document.createElement("span");g.className="nc-scale-tick",g.style.setProperty("--tick-pos",String(b.value)),g.textContent=b.label,d.append(g)}const c=Ir({label:`${n.label} level`,value:n.value,step:n.step,valueText:n.valueText,onChange:b=>{const g=e(t);g?.type==="strip"&&g.onChange(b)},onReset:()=>{const b=e(t);b?.type==="strip"&&la(b)}}),h=Hr({channels:n.channels===2?2:1,label:n.label,onClear:()=>{const b=e(t);b?.type==="strip"&&b.onClipClear?.()}});p.append(d,c.el,h.el);const f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",b=>{const g=e(t);g?.type!=="strip"||!g.onTypeIn||(window.clearTimeout(y),b.detail===0?oa(t,f,e):b.detail===1&&(y=window.setTimeout(()=>oa(t,f,e),Eo)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);const b=e(t);b?.type==="strip"&&la(b)}),t.append(a,r,o,l,p,f,q()),bi(t,n),t}const Eo=250;function oa(n,e,t){const a=t(n);if(a?.type!=="strip"||!a.onTypeIn||n.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??We(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const p=s.value;if(s.remove(),e.hidden=!1,l){const d=t(n);d?.type==="strip"&&d.onTypeIn?.(p)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function To(n,e){const t=document.createElement("div");t.className="nc-strip-add",t.dataset.ncId=n.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(t),p=o.value;gi(o),l?.type==="stripAdd"&&p&&l.onAdd(p)}),t.append(a,o,q()),fi(t,n),t}function fi(n,e){const t=n.querySelector(".nc-strip-add-label");t&&(t.textContent=e.label);const a=n.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const p=document.createElement("option");return p.value=l.value,p.textContent=l.label,p.disabled=l.disabled===!0,p})),gi(a))}function gi(n){const e=n.options[0];e&&(e.selected=!0)}function la(n){n.onReset?n.onReset():typeof n.defaultValue=="number"&&n.onChange(n.defaultValue)}function bi(n,e){const t=n.querySelector("[data-nc-strip-name]");t&&t.textContent!==e.label&&(t.textContent=e.label);const a=n.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),n.setAttribute("aria-label",e.label);const s=n.querySelector(".nc-fader"),r=s?jr(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),Ur(n.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=n.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const p=e.valueText??We(e.value);o.textContent!==p&&(o.textContent=p),o.setAttribute("aria-label",`${e.label} level ${p}`);const d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(const p of n.querySelectorAll("[data-nc-ms]")){const d=p.getAttribute("data-nc-ms"),c=d==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",c?"true":"false"),p.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}const l=n.querySelector("[data-nc-hacks]");if(l){const p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}e.silent?n.dataset.silent="true":delete n.dataset.silent,delete n.dataset.ncIdentity}function Ao(n,e){const t=document.createElement("div");t.className="nc-ui-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${n.id}-name`,a.textContent=n.title,n.on===void 0)t.append(a);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const r=ni({checked:n.on,labelledBy:a.id,onChange:o=>{const l=e(r.el);l?.type==="fx"&&l.onToggle?.(o)}});r.el.dataset.ncFxSwitch="",s.append(a,r.el),t.append(s)}for(const s of n.controls)t.append(ct(s,e));if(n.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const r=document.createElement("summary");r.textContent=n.moreLabel??"More",s.append(r);for(const o of n.more)s.append(ct(o,e));t.append(s)}return t.append(q()),yi(t,n),t}function yi(n,e){const t=n.querySelector(".nc-ui-fx-name");t&&(t.textContent=e.title);const a=n.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?n.dataset.ncDim="true":delete n.dataset.ncDim}function ca(n){return n.replace(/["\\]/g,"\\$&")}function Mo(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===t.dataset.ncId);a?.type==="canvas"&&si(t,a)}ao(n)}const Lo=re["toast-duration"];function Co({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function No(n,e,t,a){const s=l=>({top:l,bottom:l+t}),r=l=>n.some(p=>p&&p.bottom>l.top&&p.top<l.bottom),o=s(e-a-t);return r(o)?r(s(a))?"bottom":"top":"bottom"}function wi(n,e,t,a,s,r){let o=n.bottom+s;const l=Math.max(r,Math.min(n.left,a-r-t.width));for(let p=!0,d=0;p&&d<8;d++){p=!1;for(const c of e)c&&c.bottom>o&&c.top<o+t.height&&c.right>l&&c.left<l+t.width&&(o=c.bottom+s,p=!0)}return{top:o,left:l}}const da="data-nc-ui-toast-live";function Po(n,e){let t=e.querySelector(`[${da}]`);return t||(t=n.createElement("div"),t.setAttribute(da,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function _o({message:n,actionLabel:e,onAction:t,duration:a=Lo,onClose:s,avoid:r=[],anchor:o,host:l,document:p=globalThis.document}={}){l=l??p.body;const d=p.defaultView??globalThis,c=p.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");const h=p.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,c.appendChild(h);let f=null;e&&(f=p.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,c.appendChild(f)),l.appendChild(c);let y="open";const b=U=>U&&typeof U.getBoundingClientRect=="function"?U.getBoundingClientRect():null,g=b(c),u=g?.height||44,m=d.getComputedStyle?.(c),v=Number.parseFloat(m?.getPropertyValue(O("toast-offset")))||16,k=Number.parseFloat(m?.getPropertyValue(O("toast-anchor-gap")))||8,S=b(o),w=d.innerHeight??0,x=r.map(b).filter(Boolean),E=S&&S.bottom>0&&S.top<w?wi(S,x,{width:g?.width||0,height:u},d.innerWidth??0,k,v):null;E&&E.top+u<=w?(c.setAttribute("data-placement","anchor"),c.style.top=`${E.top+(d.scrollY??0)}px`,c.style.left=`${E.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",No(x,w,u,v));const A=d.requestAnimationFrame?.bind(d)??(U=>setTimeout(U,16));A(()=>A(()=>{y==="open"&&c.setAttribute("data-state","open")})),Po(p,l).textContent=Co({message:n,actionLabel:e});let _,W;const de=new Promise(U=>{W=U}),ve=U=>{clearTimeout(_),_=setTimeout(()=>xt("timeout"),U)};let N=a,Mn=Date.now();const Ln=()=>{y==="open"&&(clearTimeout(_),N=Math.max(0,N-(Date.now()-Mn)))},Cn=()=>{y==="open"&&(Mn=Date.now(),ve(N))};c.addEventListener("pointerenter",Ln),c.addEventListener("pointerleave",Cn),c.addEventListener("focusin",Ln),c.addEventListener("focusout",Cn),f?.addEventListener("click",()=>{if(y==="open")try{t?.()}finally{xt("action")}}),Number.isFinite(a)&&ve(a);function xt(U="close"){if(y!=="open")return;y="closing",clearTimeout(_),c.setAttribute("data-state","closing"),s?.(U);const Nn=d.getComputedStyle?.(c),Ji=Nn?Math.max(0,...String(Nn.transitionDuration||"").split(",").map(_n=>Number.parseFloat(_n)*(_n.trim().endsWith("ms")?1:1e3)||0)):0,Pn=()=>{y!=="gone"&&(y="gone",c.remove(),W(U))};c.addEventListener("transitionend",Pn),setTimeout(Pn,Ji+50)}return{el:c,close:xt,closed:de}}function ua(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function zo({anchor:n,title:e,velocity:t,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const p=l.defaultView??globalThis,d={velocity:t,probability:a},c=l.createElement("div");c.className="nc-slot-scrim nc-step-editor-scrim";const h=l.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const y=l.createElement("span");y.className="nc-label",y.textContent=e;const b=l.createElement("button");b.type="button",b.className="nc-step-editor-done",b.textContent="Done",f.append(y,b),h.appendChild(f);const g=[];for(const[S,w]of[["velocity","Velocity"],["probability","Chance"]]){const x=l.createElement("label");x.className="nc-step-editor-row";const E=l.createElement("span");E.className="nc-label",E.textContent=w;const A=l.createElement("input");A.type="range",A.className="nc-range",A.min=S==="velocity"?"0.05":"0",A.max="1",A.step="0.05",A.value=String(d[S]),A.setAttribute("data-nc-edit",S);const _=l.createElement("output");_.className="nc-readout",_.textContent=ua(d[S]),A.setAttribute("aria-valuetext",_.textContent),A.addEventListener("input",()=>{d[S]=Number(A.value),_.textContent=ua(d[S]),A.setAttribute("aria-valuetext",_.textContent),s({velocity:d.velocity,probability:d.probability})}),x.append(E,A,_),h.appendChild(x),g.push(A)}if(o.append(c,h),n?.setAttribute?.("data-editing","true"),p.matchMedia?.(`(max-width: ${hr.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),c.setAttribute("data-placement","sheet");else{const S=n?.getBoundingClientRect?.(),w=h.getBoundingClientRect(),x=Number.parseFloat(p.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(S){let{top:E,left:A}=wi(S,[],{width:w.width,height:w.height},p.innerWidth,x,x);E+w.height>p.innerHeight&&(E=Math.max(x,S.top-x-w.height)),h.style.top=`${E}px`,h.style.left=`${A}px`}h.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let m=!0;const v=S=>{S.key==="Escape"&&(S.preventDefault(),k())};function k(){m&&(m=!1,l.removeEventListener("keydown",v,!0),c.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",v,!0),c.addEventListener("pointerdown",S=>{S.preventDefault(),k()}),b.addEventListener("click",k),{el:h,close:k}}const ln="netcomposer.rhythm.hidden.v1",ie=new WeakMap;function Lt(){try{return globalThis.localStorage??null}catch{return null}}function vi(n,e=ln){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(a=>typeof a=="string"):[])}catch{return new Set}}function pa(n,e,t,a=ln){const s=vi(n,a);t?s.add(e):s.delete(e);try{n?.setItem(a,JSON.stringify([...s]))}catch{}}function cn(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(a=>a.controls)],t=[];for(const a of e)t.push(a),a.type==="fx"&&t.push(...a.controls,...a.more??[]),a.type==="strip"&&t.push(...(a.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return t}function Ro(n,e){if(!(!n||!e))return cn(n).find(t=>t.id===e)}function Oo(n){return`${`${n.layout??""}:${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${cn(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(a=>a.value).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}:${(t.sends??[]).map(a=>a.id).join(",")}:${(t.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}:${t.controls.map(a=>a.id).join(",")}/${(t.more??[]).map(a=>a.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Io(n,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,n.append(r);return}const t=document.createElement("div");t.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",t.append(a,s),n.append(t),ki(n,e)}function ki(n,e){if(!e.panel)return;const t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),a=t?.querySelector(".nc-panel-title"),s=t?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function jo(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=ie.get(e),a=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ro(t,a)}function Bo(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],a=Oo(e);if(n.dataset.ncSignature===a){for(const s of t){const r=n.querySelector(`[data-nc-section="${ha(s.id)}"]`);r&&ki(r,s);for(const o of s.controls){const l=n.querySelector(`[data-nc-id="${ha(o.id)}"]`);l instanceof Element&&oe(l,o)}}return}n.dataset.ncSignature=a,n.replaceChildren(),e.layout==="console"?n.dataset.ncLayout="console":delete n.dataset.ncLayout;for(const s of t){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),Io(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(ct(l,jo));n.append(r)}}function ha(n){return n.replace(/["\\]/g,"\\$&")}function dn(n,e=ln){ti();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead=""),n.compact&&(t.dataset.ncCompact="");const a=vi(Lt(),e).has(n.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const p=document.createElement("span");p.className="nc-index",p.dataset.ncIndex="";const d=ni({labelledBy:r.id,onChange:m=>(ie.get(t)??n).onToggle?.(m)});d.el.dataset.ncModuleSwitch="",o.append(d.el,l,p);const c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",s.append(r,c,o);const h=document.createElement("div");h.className="nc-module-body",h.id=`${n.id}-body`;const f=document.createElement("button");f.type="button",f.className="nc-slim";const y=document.createElement("span");y.className="nc-slim-lines",f.append(y);const b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",t.append(b,s,h,f),t.setAttribute("aria-labelledby",r.id);const g=m=>{const v=ie.get(t)??n;t.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${v.title}`),l.title=m?"Show":"Hide",m?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const m=t.dataset.ncOpen==="true";pa(Lt(),(ie.get(t)??n).id,m,e),g(m),qt(t.parentElement)}),f.addEventListener("click",()=>{pa(Lt(),(ie.get(t)??n).id,!1,e),g(!1),qt(t.parentElement)});const u={el:t,update(m){ie.set(t,m),m.compact?t.dataset.ncCompact="":delete t.dataset.ncCompact,r.textContent=m.title,c.textContent=m.status??"",m.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),y.textContent=m.summary??m.title,d.el.hidden=m.on===void 0,d.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),Bo(h,m),g(h.hidden),u.redraw()},redraw(){const m=ie.get(t);m&&Mo(t,cn(m))}};return ie.set(t,n),g(a),u.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>u.redraw()).observe(t),u}function Fo(n,e,t="adjacent"){ti(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const a=t==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),n.append(s.el),s.redraw()}),qt(n)}function qt(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&s.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function $i(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function Do(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function qo(n,e={}){const t=new Set,a=(async()=>{await $i();for(const s of n)await Do(e.timeoutMs??200),s.build(),t.add(s)})();return{ready:s=>t.has(s),done:a,toJSON:()=>({built:t.size,total:n.length})}}function un(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const Ho="modulepreload",Uo=function(n){return"/rhythm/"+n},ma={},Go=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){let o=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),p=l?.nonce||l?.getAttribute("nonce");s=o(t.map(d=>{if(d=Uo(d),d in ma)return;ma[d]=!0;const c=d.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":Ho,c||(f.as="script"),f.crossOrigin="",f.href=d,p&&f.setAttribute("nonce",p),document.head.appendChild(f),c)return new Promise((y,b)=>{f.addEventListener("load",y),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var Wo=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Ht=[.25,.5,.75,1,1.5,2],Ko=4.9,R={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},ue={fmt:"wet"},K={fmt:"pct"},$e={fmt:"db"},Ze={fmt:"signedPct"},Ct={fmt:"num",suffix:" ms"},z={div:100};function T(n,e,t,a,s,r,o,l){var p={key:n,label:e,min:t,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var d in l)p[d]=l[d];return p}function et(n){return n.map(function(e){return{value:e[0],label:e[1]}})}var He=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[T("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.hpHz,astrid:!0,zero:"off"}),T("q","Resonance",0,100,0,2,{fmt:"q",law:R.hpQ},{dsp:{law:R.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[T("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:R.bpHz,astrid:!0},{dsp:{law:R.bpHz}}),T("q","Q",0,100,0,2,{fmt:"q",law:R.bpQ},{dsp:{law:R.bpQ}}),T("mix","Mix",0,100,100,3,ue,{dsp:z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[T("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:et(Wo),overriddenBy:"beats_free",tempoSynced:!0}),T("feedback","Feedback",0,90,35,2,K,{dsp:z,unit:"%"}),T("mix","Wet/dry",0,100,0,3,ue,{dsp:z,unit:"%",astridKey:"wet"}),T("tone","Tone",0,100,100,4,{fmt:"hz",law:R.delayTone,offAt:100},{dsp:{div:99},more:!0}),T("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),T("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:et([[0,"Insert"],[1,"Send"]]),more:!0}),T("send","Send",0,100,100,7,K,{dsp:z,unit:"%",more:!0}),T("mod_send","Accent → send",-100,100,0,8,Ze,{dsp:z,unit:"%",more:!0}),T("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[T("predelay","Pre-delay",0,200,0,1,Ct,{dsp:{div:1e3},unit:"ms"}),T("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:z,unit:"%"}),T("decay","Decay",0,100,50,3,K,{dsp:z,unit:"%"}),T("damping","Damping",0,100,0,4,K,{dsp:z,unit:"%"}),T("mix","Mix",0,100,0,5,ue,{dsp:z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[T("rate","Rate",0,100,26,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),T("depth","Depth",0,100,70,2,K,{dsp:z,unit:"%"}),T("feedback","Feedback",-90,90,50,3,Ze,{dsp:z,unit:"%"}),T("mix","Mix",0,100,50,4,ue,{dsp:z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[T("rate","Rate",0,100,52,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),T("depth","Depth",0,100,50,2,K,{dsp:z,unit:"%"}),T("spread","Spread",0,100,70,3,K,{dsp:z,unit:"%"}),T("mix","Mix",0,100,40,4,ue,{dsp:z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[T("rate","Rate",0,100,39,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),T("depth","Depth",0,100,70,2,K,{dsp:z,unit:"%"}),T("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:et([[4,"4"],[6,"6"],[8,"8"]])}),T("feedback","Feedback",0,90,30,4,K,{dsp:z,unit:"%"}),T("mix","Mix",0,100,50,5,ue,{dsp:z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[T("low_db","Low",-18,18,0,1,$e,{unit:"dB"}),T("mid_db","Mid",-18,18,0,2,$e,{unit:"dB"}),T("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:R.midHz,astrid:!0},{dsp:{law:R.midHz}}),T("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:R.eqQ},{dsp:{law:R.eqQ}}),T("high_db","High",-18,18,0,4,$e,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[T("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,2,$e,{unit:"dB"}),T("mix","Mix",0,100,100,3,ue,{dsp:z,unit:"%"}),T("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:et([[0,"Smooth"],[1,"Acid"]]),more:!0}),T("tone","Tone",0,100,100,5,{fmt:"hz",law:R.driveTone,offAt:100},{dsp:{div:99},more:!0}),T("mod_drive","Accent → drive",-100,100,0,6,Ze,{dsp:z,unit:"%",more:!0}),T("mod_tone","Accent → tone",-100,100,0,7,Ze,{dsp:z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[T("threshold_db","Threshold",-60,0,0,1,$e,{unit:"dB"}),T("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:R.ratio},{dsp:{law:R.ratio}}),T("attack_ms","Attack",1,100,10,3,Ct,{unit:"ms"}),T("release_ms","Release",10,1e3,150,4,Ct,{unit:"ms"}),T("makeup_db","Makeup",0,24,0,5,$e,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[T("width","Width",0,200,100,1,K,{dsp:z,unit:"%"}),T("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:z})]}],Vo=He.map(function(n){return n.type});He.filter(function(n){return!n.hidden}).map(function(n){return n.type});var Yo={reverb:"plate"};function pn(n){var e=Yo[n]||n;return Vo.indexOf(e)>=0?e:null}function ne(n){for(var e=pn(n),t=0;t<He.length;t++)if(He[t].type===e)return He[t];return null}function Ae(n,e){if(n.zeroNull&&e<=0)return null;var t=n.pow?n.pow[0]*Math.pow(n.pow[1],e/n.div):n.exp2[0]*Math.pow(2,n.exp2[1]*e/n.div);return n.fixed!==void 0?+t.toFixed(n.fixed):n.round?Math.round(t):t}function xi(n,e){var t=n.dsp;if(!t)return e;if(t.div)return e/t.div;var a=Ae(t.law,e);return a===null?0:a}function fa(n,e){return Math.min(Ko,n*60/(e>0?e:120))}var ga=function(n){return n>0?"+":n<0?"−":""};function Xo(n){return n==null?"open":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1)+" kHz":n+" Hz"}function Si(n,e,t){var a=n.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:ga(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return ga(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Ae(a.law,e),s===null?a.zero||"open":a.astrid?Xo(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ae(a.law,e).toFixed(1);case"ratio":return Ae(a.law,e).toFixed(1)+":1";case"rate":return s=Ae(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<n.options.length;r++)if(n.options[r].value===e)return n.options[r].label;return String(e);case"tempoMs":return Math.round(fa(e,t)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(fa(e,t)*1e3)+" ms"}return String(e)}var Jo=1,bt=["drive","delay","plate"];function Qo(n){var e={};for(var t in n)t!=="format"&&(e[t]=n[t]);return e.format=function(a,s){return Si(n,a,s)},e}var Ue=bt.map(function(n){var e=ne(n),t={type:n,label:e.label,dials:e.dials.map(Qo)};return e.tempoSynced&&(t.tempoSynced=!0),t}),Zo={reverb:"plate"};function dt(n){var e=Zo[n]||n;return bt.indexOf(e)>=0?e:null}function yt(n){for(var e=dt(n),t=0;t<Ue.length;t++)if(Ue[t].type===e)return Ue[t];return null}function Ei(n,e){var t=yt(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}function ze(n,e){if(n.stepWhen&&e){for(var t=0;t<n.stepWhen.length;t++)if(e[n.stepWhen[t].key]===n.stepWhen[t].value)return n.stepWhen[t].step}return n.step}function le(n,e,t){if(typeof e!="number"||!isFinite(e))return n.default;if(n.options){for(var a=n.options[0].value,s=1;s<n.options.length;s++)Math.abs(n.options[s].value-e)<Math.abs(a-e)&&(a=n.options[s].value);return a}if(n.exact)return e>0?e<n.minOn?n.minOn:e>n.max?n.max:e:0;var r=t>0&&t<1?Math.round(1/t):1;return Math.max(n.min,Math.min(n.max,Math.round(e*r)/r))+0}function el(){return{v:Jo,chain:Ue.map(function(n){var e={};return n.dials.forEach(function(t){e[t.key]=t.default}),{id:n.type,type:n.type,bypass:!0,dials:e}})}}function tl(n){return Ht.reduce(function(e,t){return Math.abs(t-n)<Math.abs(e-n)?t:e},Ht[0])}function Nt(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function nl(n){for(var e=Array.isArray(n)?n:Nt(n)&&Array.isArray(n.chain)?n.chain:[],t=Array.isArray(n),a=el(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(Nt(l)){var p=dt(l.type);if(!p){typeof l.type=="string"&&r.push(l.type);continue}if(s[p]){r.push(p);continue}s[p]=!0;var d=a.chain[bt.indexOf(p)],c=Nt(l.dials)?l.dials:{};p==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=t?l.bypass===!0:l.bypass!==!1,yt(p).dials.forEach(function(h){d.dials[h.key]=le(h,c[h.key])}),al(p,d.dials,c)}}return{state:a,dropped:r}}function al(n,e,t){for(var a=yt(n),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=le(r,t&&typeof t[r.key]=="number"?t[r.key]:e[r.key],ze(r,e)))}}function Ut(n){return nl(n).state}function il(n){return JSON.parse(JSON.stringify(n))}var sl=24,Gt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Wt(n,e,t){if(e==="bypass")return t?0:1;var a=Ei(n,e)||rl(n,e);return a?xi(a,t):0}function rl(n,e){var t=ne(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}var ol={};Ue.forEach(function(n){n.dials.forEach(function(e){ol[n.type+"."+e.key]=e.format})});function Pt(n,e){var t=new Float64Array(sl),a=Ut(n);return a.chain.forEach(function(s){var r=Gt[s.type];t[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){t[r[o]]=Wt(s.type,o,s.dials[o])})}),t}var ll=2,ut=3,cl=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ie(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function Ti(n,e){var t=ne(n);if(!t)return null;var a={};(e||[]).forEach(function(o){o&&o.id&&(a[o.id]=!0)});for(var s=1;a[t.type+"-"+s];)s++;var r={};return t.dials.forEach(function(o){r[o.key]=o.default}),{id:t.type+"-"+s,type:t.type,bypass:!1,dials:r}}function dl(n){var e=ne(n.type),t=/-(\d+)$/.exec(n.id||"");return(e?e.label:n.type)+(t&&+t[1]>1?" "+t[1]:"")}function ul(n,e,t){var a=n.length-1,s=Math.max(0,Math.min(a,t));if(e<0||e>a||e===s)return n;var r=n.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function pl(n){return typeof n=="number"&&isFinite(n)?tl(n):n}function ba(n,e,t){var a={};return n.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),t&&n.type==="delay"&&s.key==="delay_beats"&&(r=pl(r)),a[s.key]=le(s,r)}),n.dials.forEach(function(s){s.stepWhen&&(a[s.key]=le(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],ze(s,a)))}),a}function hl(n,e){if(!(typeof e!="number"||!isFinite(e))){var t=n.dsp;if(!t)return e;if(t.div)return Math.round(e*t.div*1e6)/1e6;for(var a=n.min,s=1/0,r=n.min;r<=n.max;r++){var o=Ae(t.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var ml={rate:"rate_hz"};function fl(n,e,t,a){var s={};return n.dials.forEach(function(r){if(!r.more){var o=r.astridKey||ml[r.key]||r.key;s[r.key]=hl(r,e[o])}}),n.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&t.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function gl(n,e){var t=e>0?Math.floor(e):ut,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(n)?(r=n,l=!0):Ie(n)&&Array.isArray(n.chain)&&(r=n.chain,o=n.v===1,l=n.schema===2);for(var p=[],d=0;d<r.length;d++){var c=r[d];if(Ie(c)&&!(c.type==="limiter"||c.fixed===!0)){var h=pn(c.type),f=h&&ne(h);if(!f||o&&["drive","delay","plate"].indexOf(h)<0){typeof c.type=="string"&&a.push(c.type);continue}if(p.length>=t){a.push(c.id||h);continue}var y;Ie(c.params)&&!Ie(c.dials)?y=ba(f,fl(f,c.params,s,c.id||h),l):y=ba(f,Ie(c.dials)?c.dials:{},l);var b=Ti(h,p),g=typeof c.id=="string"&&cl.test(c.id)&&!p.some(function(m){return m.id===c.id})?c.id:b.id,u=o?c.bypass!==!1:c.bypass===!0;p.push({id:o?b.id:g,type:h,bypass:u,dials:y})}}return{state:{v:ll,chain:p},dropped:a,notes:s}}function st(n,e){return gl(n,e).state}function xe(n){var e=ne(n.type),t=[[0,n.bypass?0:1]];return e.dials.forEach(function(a){t.push([a.k,xi(a,n.dials[a.key])])}),t}function bl(n){var e=st(n,8),t=[],a=e.chain.map(function(s,r){var o=ne(s.type),l={};return r>=ut&&t.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(p){var d=s.dials[p.key];if(p.more){d!==p.default&&t.push(s.id+"."+p.key);return}p.key==="delay_beats"&&Ht.indexOf(d)<0&&t.push(s.id+".delay_beats"),l[p.astridKey||p.key]=d}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:t}}var yl="nc-fx@1",wl=600,vl=256,kl=8,je=typeof WeakMap=="function"?new WeakMap:null;function $l(n,e){var t=je&&je.get(n);return t||(t=(async function(){if(!n||!n.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await n.audioWorklet.addModule(String(e));return}var a=(await Go(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await n.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),je&&(je.set(n,t),t.catch(function(){je.delete(n)})),t)}function Se(n,e){return typeof n=="number"&&isFinite(n)?n:e}function Ai(n,e,t,a){var s=Math.min(400,Math.max(20,Se(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",p=Se(e.preGain,1),d=Math.max(0,Se(e.crossfade,.012)),c=Se(e.maxDelaySeconds,void 0),h=n.createGain(),f=n.createGain(),y=n.createGain(),b=n.createGain(),g=null;e.modInput===!0&&(g=n.createGain(),g.channelCount=1,g.channelCountMode="explicit",g.channelInterpretation="discrete"),b.gain.value=0,h.connect(y),y.connect(f),b.connect(f);var u={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},m=t(s);u.post=function(w){u.node?u.node.port.postMessage(w):u.disposed||(r.length>=vl&&(r=a().concat([{t:"tempo",bpm:u.bpm,when:0}])),r.push(w))};function v(w){var x=r.map(function(E){var A=Object.assign({},E);return A.when>w||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return r=[],x}u.emit=function(w){for(var x=0;x<u.listeners.length;x++)try{u.listeners[x](w)}catch(E){typeof console<"u"&&console.error(E)}},u.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var k=!1;u.tooFar=function(w){return typeof w=="number"&&w>n.currentTime+wl?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-n.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=$l(n,e.moduleUrl).then(function(){if(!u.disposed){var w=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:p,maxDelaySeconds:c},m);w.pending=v(n.currentTime),u.node=new AudioWorkletNode(n,yl,{numberOfInputs:g?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),h.connect(u.node),g&&g.connect(u.node,0,1),u.node.connect(b);var x=n.currentTime;x<=0||d===0?(y.gain.value=0,b.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+d),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+d)),u.status="ready"}},function(w){u.status="unavailable",r=[],u.error=w});return u.core={input:h,output:f,modInput:g,ready:S,get status(){return u.status},get error(){return u.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*n.sampleRate)):0,limiter:o,setTempo:function(w,x){var E=Se(w,NaN);!(E>0)||u.disposed||u.tooFar(x)||(u.bpm=Math.min(400,Math.max(20,E)),u.post({t:"tempo",bpm:u.bpm,when:u.whenOf(x)}),u.emit({effect:null,key:"tempo",value:u.bpm}))},getTempo:function(){return u.bpm},clear:function(w){var x=w&&typeof w=="object"?w:{at:w};if(!(u.disposed||u.tooFar(x.at))){var E=Se(x.fadeMs,0);u.post({t:"clear",when:u.whenOf(x.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(w){return u.listeners.push(w),function(){var x=u.listeners.indexOf(w);x>=0&&u.listeners.splice(x,1)}},dispose:function(){if(!u.disposed){if(u.disposed=!0,u.status="disposed",r=[],u.listeners.length=0,u.node){u.node.port.postMessage({t:"dispose"}),u.node.port.close();try{u.node.disconnect()}catch{}}[h,y,b,f,g].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},u}function xl(n,e){var t=e||{};if(t.slots)return Sl(n,t);var a=Ut(t.state),s=Array.from(Pt(a)),r=Ai(n,t,function(){return{program:s}},function(){return[{t:"load",program:Array.from(Pt(a)),when:0}]}),o=r.core;function l(p){return a.chain[bt.indexOf(p)]}return o.setParam=function(p,d,c,h){var f=dt(p);if(!(!f||r.disposed||r.tooFar(h))){var y=l(f),b;if(d==="bypass")b=!!c;else{var g=Ei(f,d);if(!g)return;b=le(g,c,ze(g,y.dials))}return d==="bypass"?y.bypass=b:y.dials[d]=b,r.post({t:"p",i:Gt[f][d],v:Wt(f,d,b),when:r.whenOf(h)}),r.emit({effect:f,key:d,value:b}),yt(f).dials.forEach(function(u){if(!(!u.stepWhen||!u.stepWhen.some(function(k){return k.key===d}))){var m=y.dials[u.key],v=le(u,m,ze(u,y.dials));v!==m&&(y.dials[u.key]=v,r.post({t:"p",i:Gt[f][u.key],v:Wt(f,u.key,v),when:r.whenOf(h)}),r.emit({effect:f,key:u.key,value:v}))}}),b}},o.getParam=function(p,d){var c=dt(p);if(c){var h=l(c);return d==="bypass"?h.bypass:h.dials[d]}},o.getState=function(){return il(a)},o.setState=function(p,d){r.disposed||r.tooFar(d&&d.at)||(a=Ut(p),r.post({t:"load",program:Array.from(Pt(a)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},o}function Sl(n,e){var t=e.slots===!0?ut:Math.max(1,Math.min(kl,Math.floor(+e.slots)||ut)),a=st(e.state,t),s=1,r={};function o(u){return r[u.id]||(r[u.id]=s++),r[u.id]}function l(u){return u.map(function(m){return{uid:o(m),type:m.type,program:xe(m)}})}var p=l(a.chain),d=a.chain.map(function(u){return r[u.id]}),c=Ai(n,e,function(){return{slots:t,chain:p,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(u){return r[u.id]}),when:0}]}),h=c.core;function f(u){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===u)return a.chain[m];var v=pn(u);if(v){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===v)return a.chain[m]}return null}function y(u,m){var v=o(u);c.post({t:"add",uid:v,type:u.type,when:m}),xe(u).forEach(function(k){c.post({t:"ps",uid:v,k:k[0],v:k[1],when:m,snap:!0})})}function b(u){c.post({t:"order",uids:a.chain.map(function(m){return r[m.id]}),when:u})}function g(u,m){var v={};a.chain.forEach(function(w){v[w.id]=w});var k=a.chain.map(function(w){return r[w.id]}).join();u.chain.forEach(function(w){var x=v[w.id];if(!x||x.type!==w.type){delete r[w.id],y(w,m);return}var E={};xe(x).forEach(function(A){E[A[0]]=A[1]}),xe(w).forEach(function(A){E[A[0]]!==A[1]&&c.post({t:"ps",uid:r[w.id],k:A[0],v:A[1],when:m})})});var S={};u.chain.forEach(function(w){S[w.id]=!0}),Object.keys(r).forEach(function(w){S[w]||delete r[w]}),a=u,a.chain.map(function(w){return r[w.id]}).join()!==k&&b(m)}return h.slots=t,h.setParam=function(u,m,v,k){var S=f(u);if(!(!S||c.disposed||c.tooFar(k))){var w=ne(S.type),x,E=null;if(m==="bypass")x=!!v;else{for(var A=0;A<w.dials.length;A++)w.dials[A].key===m&&(E=w.dials[A]);if(!E)return;x=le(E,v,ze(E,S.dials))}var _={},W={};xe(S).forEach(function(N){_[N[0]]=N[1]}),w.dials.forEach(function(N){N.stepWhen&&(W[N.key]=S.dials[N.key])}),m==="bypass"?S.bypass=x:S.dials[m]=x,w.dials.forEach(function(N){N.stepWhen&&(S.dials[N.key]=le(N,S.dials[N.key],ze(N,S.dials)))});var de=c.whenOf(k),ve=r[S.id];return xe(S).forEach(function(N){(_[N[0]]!==N[1]||E&&N[0]===E.k)&&c.post({t:"ps",uid:ve,k:N[0],v:N[1],when:de})}),c.emit({effect:S.id,key:m,value:x}),Object.keys(W).forEach(function(N){N!==m&&S.dials[N]!==W[N]&&c.emit({effect:S.id,key:N,value:S.dials[N]})}),x}},h.getParam=function(u,m){var v=f(u);if(v)return m==="bypass"?v.bypass:v.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(u,m){c.disposed||c.tooFar(m&&m.at)||(g(st(u,t),c.whenOf(m&&m.at)),c.emit({effect:null,key:null,value:null}))},h.addEffect=function(u,m){var v=m||{},k=Ti(u,a.chain);if(!(!k||a.chain.length>=t||c.disposed||c.tooFar(v.at))){if(v.dials){var S=st({v:2,chain:[{id:k.id,type:k.type,dials:v.dials}]},1).chain[0];k.dials=S.dials}v.bypass===!0&&(k.bypass=!0);var w=a.chain.slice(),x=typeof v.index=="number"?Math.max(0,Math.min(w.length,v.index)):w.length;return w.splice(x,0,k),g({v:2,chain:w},c.whenOf(v.at)),c.emit({effect:k.id,key:"chain",value:"add"}),k.id}},h.removeEffect=function(u,m){var v=f(u),k=m&&m.at;return!v||c.disposed||c.tooFar(k)?!1:(g({v:2,chain:a.chain.filter(function(S){return S!==v})},c.whenOf(k)),c.emit({effect:v.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(u,m,v){var k=f(u),S=v&&v.at;if(!k||c.disposed||c.tooFar(S))return!1;var w=ul(a.chain,a.chain.indexOf(k),m);return w===a.chain?!1:(g({v:2,chain:w},c.whenOf(S)),c.emit({effect:k.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(u){return{id:u.id,type:u.type,name:dl(u),bypass:u.bypass}})},h.toAstrid=function(){return bl(a)},h}const El="/rhythm/assets/worklet-CnpUVY5i.js",wt="petra-rhythm.state",hn=1,Mi=400,Tl=2e3;function Al(n){return JSON.stringify({v:hn,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function Ml(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:a,tracks:s}=e;return _e({...n,swing:t,fx:a,tracks:s}).ok}function Li(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==hn)return null;const t=_e(e.doc);if(!t.ok||!t.document)return null;const a=t.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==Z||!s.slots.every(d=>d===null||Ml(a,d)))return null;const r=s.slots,o=Number.isInteger(s.active)&&r[s.active]?s.active:null,l=e.selectedTrack,p=Number.isInteger(l)&&l>=0&&l<a.tracks.length?l:0;return{doc:a,bank:{slots:r,active:o},selectedTrack:p}}function Ll(n,e,t=Mi,a=wt){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const p=Al(e());if(p===o)return;n.setItem(a,p),o=p}catch{}};return{schedule(){const p=Date.now();r||(r=p),clearTimeout(s),s=setTimeout(l,Math.min(t,Math.max(0,r+Tl-p)))},flush:l}}function Cl(n,e,t=wt){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=n.getItem(t)}catch{return null}if(!a||Li(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(s.v!==hn||_e(s.doc).errors[0]===tt||Array.isArray(s.bank?.slots)&&s.bank.slots.some(o=>o!==null&&typeof o=="object"&&_e({...s?.doc,...o}).errors[0]===tt))?`Couldn't open your last session: ${tt}`:"Couldn't open your last session: it is malformed"}function Nl(n,e,t=wt){if(new URLSearchParams(e).has("fresh"))return null;try{return Li(n.getItem(t))}catch{return null}}const _t={maker:"PETRA",instrument:"RHYTHM",number:"01"},Pl="PETRA Rhythm";let ya=!1;function _l(){return`
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
/* The ⋯ menu (Bass's header menu): Save, Load, New. Phone: a 44 px ⋯ that opens a small panel.
   Desktop: the buttons sit inline in the header and the ⋯ hides. */
/* The frame (gutters, padding, the divider under the header) is the kit's .nc-page-hd, as in ASTRID. */
/* The kit's title band isolates the header (nc-ui 6884367: position relative, isolation: isolate), so the ⋯ panel's
   z-index only counts inside it; lifting the header over the page body keeps the open panel above the modules. */
.petra-head { position: relative; z-index: 20; }
.petra-head-title { flex: 1 1 auto; min-width: 0; }
.petra-menu > summary {
  list-style: none;
  display: grid;
  place-items: center;
  min-width: ${i("target-min")};
  min-height: ${i("target-min")};
  color: ${i("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${i("target-min")} / 2.75); height: calc(${i("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${i("control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
}
.petra-menu-body button {
  min-height: ${i("target-min")};
  padding: 0 ${i("module-pad")};
  border: 0;
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${i("text-sub")}; padding: 0 ${i("module-gap")}; }
  /* The last word sits on the page gutter, as ASTRID's header does. */
  .petra-menu-body button:last-of-type { padding-inline-end: 0; }
  .petra-menu-body button:hover { color: ${i("text")}; }
}
`}function zl(n){const e=n.ownerDocument;if(!ya){const d=e.createElement("style");d.dataset.petraHead="",d.textContent=_l(),e.head.append(d),ya=!0}const t=e.createElement("header");t.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const d=e.createElement("span");return d.className="petra-head-sep",d.textContent="/",d},r=e.createElement("span");r.className="petra-head-num",r.textContent=_t.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=_t.maker,a.append(o," ",s(),` ${_t.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const p=e.createElement("div");return p.className="petra-head-title",p.append(a,l),t.append(p),n.before(t),t}function Rl(n,e){const t=n.ownerDocument,a=t.createElement("details");a.className="petra-menu";const s=t.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=t.createElement("div");r.className="petra-menu-body";const o=t.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const c=o.files?.[0];o.value="",c&&e.load(await c.text(),c.name)});const l=(c,h)=>{const f=t.createElement("button");return f.type="button",f.textContent=c,f.dataset.petraMenu=c.toLowerCase(),f.addEventListener("click",()=>{h(),p||(a.open=!1)}),f};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),n.append(a);let p=null;const d=()=>{const c=getComputedStyle(s).display==="none";c!==p&&(a.open=c),p=c};return window.addEventListener("resize",d),d(),a}class Ol{doc=Ga();bank=Ra();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=xs(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=ks(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=$s(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=In(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.recallGlideSeconds){const a=In(this.bank,e,this.doc,t);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=qs(this.doc,e);this.sparkleUndo=t,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Bs(this.doc,e,t),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},t=structuredClone(this.doc);for(const a of t.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=t,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=t,t===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let wa=!1;function Il(){return`
#app .nc-morph-field { display: none; }
`}function jl(n=document){if(wa)return;const e=n.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=Il(),n.head.append(e),wa=!0}function Bl(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,a=e?.performanceTime;if(t===void 0||a===void 0||!(t>0)||!(a>0))return null;const s=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function va(n,e){const t=n.getOutputTimestamp?.(),a=t?.contextTime,s=t?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const Fl=1400;function zt(n,e,t,a=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Dl(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class ql{constructor(e){this.repaint=e}text="";timer=0;say(e,t=Fl){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},t))}}const Hl=50;function Ul(n,e,t,a=Hl){if(t)return 0;const s=n-e;return s>=a?0:a-s}class Gl{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const a=_o({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function ka(n,e){const t=new AudioContext(e);let a="loading";const s=(async()=>{t.state==="running"&&await t.suspend();for(const r of n)await t.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:t,ready:s,get status(){return a},async start(){return a==="loaded"&&pe(t),await s,t.state!=="running"&&await t.resume(),t.state}}}function pe(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const Wl=5e3;function Kl(){return typeof navigator<"u"&&"userAgentData"in navigator}function Vl(n,e,t,a={}){const s=a.restartsOnWorkletReady??Kl(),r=a.preloadTimeoutMs??Wl;let o=null,l=!1,p=null,d=null;async function c(){const g=new AudioContext(e);pe(g);try{for(const u of n)await g.audioWorklet.addModule(u);return g}catch(u){throw g.close().catch(()=>{}),u}}function h(g,u=!1){l=!0,o=null,g.context.close().catch(()=>{}),u?t?.(new Error(`audio preload still loading after ${r} ms`)):g.ready.catch(m=>t?.(m))}async function f(g){const{context:u}=g;t?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),pe(u);const m=(async()=>{for(const v of n)await u.audioWorklet.addModule(v)})();try{return await Promise.race([g.ready.then(()=>{},()=>m),m]),u}catch(v){throw l=!0,o===g&&(o=null),u.close().catch(()=>{}),v}}function y(g){let u;const m=new Promise(v=>{u=setTimeout(()=>v("timeout"),r)});return Promise.race([g.ready.then(()=>"ready"),m]).finally(()=>clearTimeout(u))}async function b(){if(!l){o??=ka(n,e);const g=o;if(g.status==="failed")h(g);else{const u=g.status==="loaded"||!s;if(u&&pe(g.context),g.status==="loading"){let m;try{m=await y(g)}catch{return h(g),c()}if(m==="timeout")return s?(h(g,!0),c()):f(g)}return g.context.state==="closed"?(o===g&&(o=null),b()):(u||pe(g.context),g.context)}}return c()}return{preload(){o||p||d||l||(o=ka(n,e))},load(){return p&&p.state!=="closed"?(pe(p),Promise.resolve(p)):d?(o&&(o.status==="loaded"||!s)&&pe(o.context),d):(d=b().then(g=>(p=g,o=null,g)).finally(()=>{d=null}),d)}}}const $a="/rhythm/assets/processor-BFa39uiw.js",Yl="instance",Xl=99;function vt(n=typeof location>"u"?"":location.search){const e=new URLSearchParams(n).get(Yl)?.trim()??"";if(!/^\d+$/.test(e))return 1;const t=Number(e);return t>=2&&t<=Xl?t:1}function Ci(n,e){return e===1?n:`${n}#${e}`}function Jl(n,e){return e===1?n:`${n} ${e}`}let Ee;function Ql(n,e=vt()){if(Ee!==void 0)return Ee;Ee=null;try{if(typeof window>"u"||window.parent===window)return Ee;const t=window.parent.ncStudio;t&&t.version===1&&(Ee=t.attach(n,{instance:e}))}catch{}return Ee}function Zl(){let n;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(n=a.syncScope)}}catch{}if(!n)return{};const e=`/studio/${n}`,t=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:t?{request:(a,s,r)=>t.request(`${a}${e}`,s,r)}:null}}function ec(){try{if(typeof window>"u"||window.parent===window)return null;const n=window.parent.ncStudio;return n&&n.version===1&&typeof n.fxWorklet=="string"&&n.fxWorklet?n.fxWorklet:null}catch{return null}}function pt(){try{if(typeof window>"u"||window.parent===window)return null;const n=window.parent.ncStudio;return n?.version===1&&n.play?n.play:null}catch{return null}}function Kt(n,e=vt()){return e>1?`${n}#${e}`:n}function tc(n,e=vt()){const t=pt()?.owner()??null;return t===null||t==="studio"||t===Kt(n,e)}function nc(n,e){let t=null;const a=()=>(t??=(async()=>{for(const s of e)await n.audioWorklet.addModule(s);return n})(),t.catch(()=>{t=null}),t);return{preload(){a().catch(()=>{})},load:a}}const Ni=new URLSearchParams(location.search),H=Ni.has("measure"),fe=vt(),mn=Jl(Pl,fe),ac=Ci("petra-rhythm.linkslots",fe),ic=cr(ac),sc=!(H&&Ni.get("clockStepFix")==="0");let Vt=0;const rc=.05;H&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const ge=[40,240],$=new Ol,fn=Ci(wt,fe),qe=H?null:Nl(localStorage,location.search,fn),xa=H||qe?null:Cl(localStorage,location.search,fn);qe&&($.doc=qe.doc,$.bank=qe.bank,$.selectTrack(qe.selectedTrack));const gn=H?null:Ll(localStorage,()=>({doc:$.doc,bank:$.bank,selectedTrack:$.selectedTrack}),Mi,fn);if(H){for(const e of $.doc.tracks)e.solo=e.voice==="kick";const n=$.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=rc)}const P=new rs({bpm:$.doc.bpm,minBpm:ge[0],maxBpm:ge[1],timebase:"shared"}),bn=document.querySelector("#app");if(!(bn instanceof HTMLElement))throw new Error("Missing #app");const oc=zl(bn);jl();const be=new Gl(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let M=null;H&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>Bi(),window.__clockStep=n=>{Vt=n},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:he?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let Y=null,J=null,he=null,ht=0,Pi=0;function lc(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const I=new ys({...Zl(),app:mn,version:"0.1.0",clock:P,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:ge},audio:lc,outputLatencyMs:()=>he?.outputLatencyMs??null,swing:()=>$.liveSwing});let Me="",_i=0,zi=!1,Sa=Number.NEGATIVE_INFINITY,Te=null;const j=new on;let V=!1;function D(n=B()){return!V&&P.transport.isPlayingAt(n)}function Ke(n){if(!I.isLeader)return;const e=Ul(performance.now(),Sa,n);if(e>0){Te===null&&(Te=setTimeout(()=>{Te=null,Ke(!0)},e));return}Te!==null&&(clearTimeout(Te),Te=null),I.publishState()&&(Sa=performance.now())}function Ea(){const n=zi?Fs($.doc).tracks:$.doc.tracks;return V?n.map(e=>({...e,mute:!0})):n}function Ve(){if(!he)return null;const n=Math.round(he.offset*1e4)/1e4;return{offset:n,shifted:is(P.toSnapshot(),n,"audio")}}const yn=new sr(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Yt(n=!1){const e=Ve();e&&yn.set(e,n)}const cc={mode:"lp",cutoff:1,resonance:0,drive:0};function Xt(n){const e=Ge(n),t=Xs(n);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:!e.filter||n.mode==="lp"&&n.cutoff>=.999,dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let Jt=null;function dc(){if(!J)return;const n=Xt($.doc.fx),e=Jt;if(Jt=n,!e||e.chain.some((t,a)=>t.type!==n.chain[a]?.type)){J.setState(n);return}n.chain.forEach((t,a)=>{const s=e.chain[a];if(s){s.bypass!==t.bypass&&J?.setParam(t.id,"bypass",t.bypass);for(const[r,o]of Object.entries(t.dials))s.dials[r]!==o&&J?.setParam(t.id,r,o)}})}function Ri(n,e,t,a){return{clock:n,measure:H,swing:$.followSwing??e.swing,fx:cc,...a===void 0?{}:{glideSeconds:a},tracks:t.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let Q=null;function C(n="state"){const e=n==="state"?Ve():yn.current??Ve();if(!Y||!e)return;bc(),n!=="state"&&(Me="");const{offset:t,shifted:a}=e,s=Q;s!==null&&(Q=null,Me="");const r=$.consumeGlide(),o=JSON.stringify({seen:j.lastTaken,offset:t,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:$.liveSwing,glide:r??null,tracks:Ea(),fx:$.doc.fx});if(dc(),o===Me)return;Me=o;const l={...Ri(a,$.doc,Ea(),r),seen:j.lastTaken,...s===null?{}:{enterBeat:s}};_i=t,Y.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const ce=Ql("petra-rhythm",fe),wn=ce?nc(ce.ctx,[$a]):Vl([$a],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function kt(){const n=wn.load();if(M)return;const e=await n;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,H){const a=M,s=a.getOutputTimestamp.bind(a);a.getOutputTimestamp=()=>{const r=s(),o=!Vt||!r.contextTime?r:{contextTime:r.contextTime+Vt/1e3,performanceTime:r.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),o.contextTime??0,o.performanceTime??0]),o}}M.addEventListener("statechange",()=>{L(),we()}),he=ce?.mapper??new bs(M,sc?{}:{stepThresholdMs:0}),he.onStep(a=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:a.stepSeconds*1e3,confirmedAt:a.confirmedAt,reanchors:a.reanchors,revert:a.revert===!0}),Yt(!0)}),he.start(),Y=new AudioWorkletNode(M,"rhythm"),Y.port.onmessage=a=>{if(a.data.switched!==void 0&&yc(a.data.switched),a.data.level!==void 0&&a.data.step!==void 0&&(Pi=a.data.level,ht!==a.data.step&&(ht=a.data.step,L())),!(!H||!M)){for(const s of a.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-_i});for(const s of a.data.onsets??[]){const r=va(M,s.contextTime);r&&window.__onsets?.push({app:mn,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-s.contextTime)*1e3,...r})}for(const s of a.data.render??[]){const r=va(M,s.contextTime);r&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:r.playedMs})}}},J=xl(M,{moduleUrl:ec()??El,slots:3,state:Xt($.doc.fx)}),Jt=Xt($.doc.fx),Y.connect(J.input),window.__hacks=()=>({state:J?.getState(),status:J?.status}),J.output.connect(ce?.output??M.destination);let t=!1;yn.subscribe(()=>C(t?"clock":"attach")),P.subscribe(a=>Yt(a.kind==="snapshot"&&a.replay===!0)),t=!0}const me=new ir;let vn=!1,rt=null,Ne=null;function $t(){return!M||M.state!=="running"}function uc(){return Ne=me.mode($t(),D()),Ne}function kn(){return rt??=(async()=>{try{Q=Number.POSITIVE_INFINITY,M&&C(),await kt(),M&&M.state!=="running"&&await M.resume();const n=P.transport;Q=me.enter(n.beatAt(B()),n.bpm),Qt&&(Qt=!1,Q=Math.floor(n.beatAt(B())/4)*4);const e=Q;vn=!0,xn(),C(),H&&(window.__join={...me.toJSON(),tapBeat:Oi,sentBeat:e})}catch(n){throw me.cancel(),Q=Number.NEGATIVE_INFINITY,C(),n}})().finally(()=>{rt=null,L(),we()}),rt}let Oi=Number.NaN,Qt=!1;function Ii(n){const e=n instanceof KeyboardEvent&&n.repeat;me.gesture($t(),D(),e)&&(Oi=P.transport.beatAt(B()),kn().catch(ji))}document.addEventListener("pointerdown",Ii,{capture:!0});document.addEventListener("keydown",Ii,{capture:!0});document.addEventListener("pointerup",()=>{me.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function ji(n){console.warn("[rhythm] audio couldn't start",n),te.say("Audio couldn't start. Press Play to try again."),L()}function $n(){pc().catch(ji)}async function pc(){if(me.swallowClick($t(),D())){await kn();return}await Bi()}let Be=null;function we(){if(Be!==null&&(clearTimeout(Be),Be=null),!$t())return;nt(!0,D())!==Ne&&L();const n=B(),{startTime:e,stopTime:t}=P.transport,a=[e,t].filter(r=>r!==null&&r>n);if(a.length===0)return;const s=Math.min((Math.min(...a)-n)*1e3+1,2**31-1);Be=setTimeout(()=>{Be=null,we()},s)}const hc=1500;function mc(n){let e,t;const a=new Promise(o=>{e=setTimeout(()=>o(!1),hc)}),s=new Promise(o=>{t=()=>{n.state==="running"&&o(!0)},n.addEventListener("statechange",t)}),r=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Rt=!1;function fc(){M?M.state!=="running"&&M.resume().catch(()=>{}):wn.load().catch(()=>{})}async function Bi(){if(Rt){fc();return}Rt=!0;try{if(await kt(),!M)return;if(M.state!=="running"&&!await mc(M)&&!D()){te.say("Tap Play to start audio"),L();return}}finally{Rt=!1}if(ce&&P.transport.isPlayingAt(B())){if(!V&&pt()?.owner()===Kt("petra-rhythm",fe)){P.stop({at:B()});return}V?(V=!1,Q=Math.ceil(P.transport.beatAt(B())/4-1e-9)*4):V=!0,$.playing=D(),Me="",C(),L();return}if(D()){P.stop({at:B()});return}ce&&pt()?.claim(Kt("petra-rhythm",fe)),P.play({at:B()}),!I.isLeader&&[...I.peers.values()].some(n=>n.leader)&&(vn=!0,xn(),L())}const te=new ql(()=>L()),gc=6e3;xa&&te.say(xa,gc);function ye(){return vn&&!I.isLeader}function xn(){!ye()||!$.adoptSwing(I.swing)||(C(),L())}function Fi(n,e,t){const a=$.peek(n),s=Ve();if(!a||!Y||!s)return!1;const r=P.transport.beatAt(B()),o=j.recall(n,r,{glide:e},t===void 0?{}:{atBeat:t});return Ui(o,a,s.shifted),!0}let Di="";function qi(n){return ye()?$.followSwing??n.swing:n.swing}function Hi(n,e){return JSON.stringify([n,qi(e),e.fx,e.tracks])}function Ui(n,e,t){if(!Y)return;Di=Hi(n.id,e);const a={...Ri(t,e,e.tracks,n.payload.glide),swing:qi(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};Y.port.postMessage({type:"state",state:a})}function bc(){const n=j.pending;if(!n||!Y)return;const e=$.peek(n.slot);if(!e){j.cancel();return}if(Hi(n.id,e)===Di)return;const t=Ve();t&&Ui(n,e,t.shifted)}function Sn(n,e){const t=$.liveSwing;return $.recall(n,e)?(ye()||($.followSwing=null),$.liveSwing!==t&&Ke(!0),!0):!1}function yc(n){const e=j.takeHeld(n);e&&(Sn(e.slot,e.payload.glide),$.consumeGlide(),C(),L())}function Gi(n){if(j.cancel(),!Sn(n,$.recallGlideSeconds))return;const e=$.recallGlideSeconds>0?$.recallGlideSeconds:0;I.sendSnapshot("recall",n,{atBeat:P.transport.beatAt(B()),...e>0?{glide:{seconds:e}}:{}})}function wc(n){if(j.tap(n,D()).kind==="queue"){const t=$.recallGlideSeconds>0?$.recallGlideSeconds:0;if(Fi(n,t,Va(P.transport.beatAt(B())))){const a=j.pending?.atBeat;I.sendSnapshot("recall",n,{...a===void 0?{}:{atBeat:a},...t>0?{glide:{seconds:t}}:{}});return}}Gi(n)}function Pe(n,e){const t=za[n]??"";if(e==="store")$.store(n),te.say(zt(e,t,!0));else if(e==="clear"){const a=$.bank.slots[n]!=null;if(j.queued===n){const s=j.drop();j.cancel();const r=$.bank.active;s&&r!=null&&I.sendSnapshot("recall",r,{atBeat:s.atBeat})}$.clear(n),te.say(zt(e,t,a)),a&&be.show(Re,`Slot ${t} cleared`)}else $.bank.slots[n]==null?te.say(zt(e,t,!1,matchMedia("(pointer: coarse)").matches)):wc(n);C(),L()}function Re(){$.undoSurprise()&&(be.dismiss(),C(),L())}function vc(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),Re();return}if(n.code==="Space"){n.preventDefault(),n.repeat||$n();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const a=t===0?9:t-1;a<0||a>=Z||(n.preventDefault(),n.shiftKey?Pe(a,"store"):n.altKey?Pe(a,"clear"):Pe(a,"recall"))}const kc=new rr({min:ge[0],max:ge[1]});function Zt(n){$.doc.bpm=n,P.setTempo({bpm:n}),C(),L()}function $c(){return ye()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Wi(){const n=D(),e=uc(),t=ye();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:te.text,controls:[{type:"button",id:"play",label:Ka(e),on:e==="stop",...e==="join"?{ariaLabel:Wa}:{},onPress:()=>$n(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{$.surprise(),C(),L(),be.show(Re)}},{type:"slider",id:"bpm",label:"Tempo",min:ge[0],max:ge[1],step:1,value:P.transport.bpm,onChange:Zt,onTap:a=>{const s=kc.tap(a);s!==null&&s!==P.transport.bpm&&Zt(s)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:$.liveSwing,valueText:Hs($.liveSwing),disabled:t,modulated:t&&$.followSwing!=null,onChange:a=>{ye()||rt||($.setSwing(a),Ke(!1),C(),L())},onCommit:()=>{Ke(!0)}},...I.isLeader?[]:[{type:"note",id:"swing-note",text:$c()}],...I.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:I.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:$.morphSeconds,morphText:Dl($.morphSeconds),slots:za.map((a,s)=>({label:a,filled:$.bank.slots[s]!=null,active:$.bank.active===s,edited:$.edited===s,queued:j.queued===s,pulse:j.queued===s&&n&&ht%4<2})),onMorph:a=>{$.morphSeconds=a,L()},onSlot:(a,s)=>{Pe(a,s)}}]}}function en(){const n=$.doc.tracks.length;return n===0?0:Math.min($.selectedTrack,n-1)}function Ki(){const n=$.doc.tracks[en()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${$.doc.tracks.length} tracks · ${n.name}`:`${$.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Ne==="stop",label:Ka(Ne??"play"),...Ne==="join"?{ariaLabel:Wa}:{},onToggle:()=>$n()},id:"grid",playhead:D()?ht:-1,selectedRow:n?.id,onSelectRow:e=>{$.selectTrack(e),L()},onDice:e=>{const t=$.doc.tracks[e]?.name??"Lane";$.diceLane(e)&&(C(),L(),be.show(Re,`New ${t} steps`))},onFill:e=>{zi=e,C(),L()},onClear:()=>{$.clearSteps()&&(C(),L(),be.show(Re,"Pattern cleared"))},onLength:(e,t)=>{$.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(t))))}),C(),L()},onMute:e=>{$.edit(t=>{const a=t.tracks[e];a&&(a.mute=!a.mute)}),C(),L()},onSolo:e=>{$.edit(t=>{const a=t.tracks[e];a&&(a.solo=!a.solo)}),C(),L()},onToggle:(e,t,a)=>{$.edit(s=>{const r=s.tracks[e]?.steps[t];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),C(),L()},onLongPress:(e,t,a)=>{const s=$.doc.tracks[e],r=s?.steps[t];!s||!r||zo({anchor:a,title:`${s.name} · step ${t+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{$.edit(p=>{const d=p.tracks[e]?.steps[t];d&&(d.on=!0,d.velocity=o,d.probability=l>=1?void 0:l)}),C(),L()}})},onSet:(e,t,a,s)=>{$.edit(r=>{const o=r.tracks[e]?.steps[t];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),C(),L()},rows:$.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))}]},xc()]}}function xc(){const n=en(),e=$.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(a=>{const s=Ks(e?.voice,a);return{type:"slider",id:e?.voice==="shaker"?`shaker-${a}`:a,label:s.label,valueText:s.text(e?.params[a]??0),min:s.min,max:s.max,step:s.step,value:e?.params[a]??0,onChange:r=>{$.edit(o=>{const l=o.tracks[en()];l&&(l.params[a]=r)}),C(),L()}}})}}function tn(n,e){$.edit(t=>{const a=Ge(t.fx);e(a[n]),t.fx.hacks=a}),C(),L()}function Sc(n,e){const t=Ge($.doc.fx)[n].dials[e.key]??e.default,a=`hack-${n}-${e.key}`,s=r=>tn(n,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(t),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:t,valueText:Si(e,t,$.doc.bpm),onChange:s}}const Ot=(n,e)=>(ne(n)?.dials??[]).filter(t=>!t.key.startsWith("mod_")&&t.more===!0===e).map(t=>Sc(n,t));function Ec(n){return n>=1e3?`${(n/1e3).toFixed(n>=1e4?0:1)} kHz`:`${Math.round(n)} Hz`}function En(){const n=$.doc.fx,e=Ge(n),t=n.mode==="lp"&&n.cutoff>=.999,a=r=>{$.edit(r),C(),L()},s=[e.filter&&!t?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:r=>a(o=>{o.fx.hacks={...Ge(o.fx),filter:r}}),controls:[{type:"select",id:"mode",label:"Mode",value:n.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(o=>{(r==="lp"||r==="hp"||r==="bp")&&(o.fx.mode=r)})},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:n.cutoff,valueText:t?"open":Ec(Da(n.cutoff)),onChange:r=>a(o=>{o.fx.cutoff=r})},...n.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:n.resonance,valueText:Ce(n.resonance),onChange:r=>a(o=>{o.fx.resonance=r})}],{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:n.mode,cutoff:n.cutoff,resonance:n.mode==="lp"?0:n.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:r=>tn("drive",o=>{o.on=r}),controls:Ot("drive",!1),more:Ot("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:r=>tn("compressor",o=>{o.on=r}),controls:Ot("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Pi}]}}await $i();const Vi=dn(Wi());await un();const Tn=dn({id:"pattern",title:"Pattern",lead:!0}),An=dn({id:"filter",title:En().title}),Yi={build:()=>Tn.update(Ki())},Xi={build:()=>An.update(En())};let mt=null;function L(){$.takeSurpriseEdit()&&be.dismiss(),Vi.update(Wi()),mt?.ready(Yi)&&Tn.update(Ki()),mt?.ready(Xi)&&An.update(En()),gn?.schedule()}window.addEventListener("pagehide",()=>gn?.flush());function Ta(n,e,t){j.cancel(),$.replace(n,e),C(),L(),gn?.schedule(),be.show(Re,t)}Rl(oc,{save:()=>{const n=$.doc.name||"rhythm",e=URL.createObjectURL(new Blob([Vs($.doc,$.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),te.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=Ys(n);if(!t.ok||!t.document||!t.bank){te.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}Ta(t.document,t.bank,`Loaded ${e}`)},create:()=>Ta(tr(),Ra(),"New pattern"),panic:()=>Y?.port.postMessage({type:"panic"})});let Aa=P.transport.running;P.onChange(()=>{if(P.transport.running||(V=!1),P.transport.running&&!Aa&&ce&&(V=!tc("petra-rhythm",fe)),Aa=P.transport.running,$.playing=D(),!$.playing&&j.pending){const n=j.drop();n&&Gi(n.slot)}$.doc.bpm=P.transport.bpm,C(),L(),we()});pt()?.onAll(()=>{V&&(V=!1,P.transport.isPlayingAt(B())&&(Q=Math.ceil(P.transport.beatAt(B())/4-1e-9)*4),$.playing=D(),Me="",C(),L())});I.onSwing(n=>{ye()&&$.adoptSwing(n)&&C(),L()});I.onSnapshot(n=>{if(n.op!=="recall")return;const e=I.peers.get(n.from)?.app;if(!dr(mn,e,ic)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:B()});const t=n.glide?.seconds??0;if(D()&&Fi(n.slot,t,n.atBeat)){L();return}j.cancel(),Sn(n.slot,t),C(),L()});I.onRole(()=>{xn(),L(),we()});I.onPeers(()=>{L(),we()});H&&(window.__rhythm={setKick:n=>{$.edit(e=>{const t=e.tracks.find(a=>a.voice==="kick");t&&t.steps.forEach((a,s)=>{a.on=n.includes(s)})}),C(),L()},store:n=>Pe(n,"store"),tap:n=>Pe(n,"recall"),tempo:n=>Zt(n),beat:()=>P.transport.beatAt(B()),timeAt:n=>P.transport.timeAt(n),slots:()=>({active:$.bank.active??null,queued:j.queued}),swing:()=>{const n=$.bank.active;return{live:$.liveSwing,doc:$.doc.swing,slot:n==null?null:$.bank.slots[n]?.swing??null,leader:I.isLeader}},setSwing:n=>{$.setSwing(n),Ke(!0),C(),L()},lateEnter:()=>{Qt=!0},audio:async()=>(await kt(),await M?.resume(),M?.state??"none")});await un();await I.start();document.addEventListener("keydown",vc);Fo(bn,[Vi,Tn,An],"adjacent");await un();L();mt=qo([Yi,Xi]);we();mt.done.then(()=>{wn.preload(),ce&&kt().then(()=>{D()&&M?.state==="running"&&kn()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=D();if(n!==$.playing&&($.playing=n,L()),Yt(),C(),!H||!M)return;const e=Bl(M);e&&window.__stamps?.push(e)},250);
