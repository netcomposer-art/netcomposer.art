(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const se=1e-9;function Ba(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class dt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Ba(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,l)=>r.beat-l.beat);let s=i.length?i[0].bpm:this.bpm;for(const r of i)r.beat<=e.beat+se&&(s=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const r of i){if(r.beat<=e.beat+se)continue;const l=this.clamp(r.bpm);l!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+se){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-se;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,s=.25){const o=this.bpmAt(t);if(!(i>0)||!(s>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(i/s));this.setTempoAt(o,t);for(let l=1;l<=r;l++)this.setTempoAt(o+(e-o)*l/r,t+i*(l-1)/r)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new dt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+se)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+se)return t[i];return t[0]}}const qa=Object.freeze({beatsPerBar:4,beatUnit:4}),le=1e-9;function Da(n){return Math.floor(n+le)}function xn(n,e,t=!1){if(!(e>0))return n;const s=Math.ceil(n/e-le)*e;return t&&s<=n+le?s+e:s}class Fa{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new dt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??qa}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-le&&(this.stopTime===null||e<this.stopTime-le)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-le?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=Da(e/t),s=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:s,barPhase:s/t}}nextBar(e,t=!1){return xn(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Sn="nc-clock/snapshot",Tn=1;function Ha(n,e="local"){return{format:Sn,version:Tn,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function Ua(n,e){const t=Ka(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function Ga(n,e,t=n.timebase){const i=s=>s===null?null:s+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(s=>({...s})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const F=n=>typeof n=="number"&&Number.isFinite(n),qt=n=>n===null||F(n);function Ka(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==Sn&&t("format"),(!F(e.version)||Math.floor(e.version)!==Tn)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!F(e.anchor.beat)||!F(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&F(i.beat)&&F(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!F(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!F(e.meter.beatUnit))&&t("meter"),(!qt(e.startTime)||!qt(e.stopTime)||!F(e.stoppedBeat))&&t("transport times"),e}class Ya{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Fa(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ua(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Ha(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const Va="nc-sync/1",Wa=1,Xa="nc-sync",Ja="nc-sync-leader",Qa=0,En=.5,An=.75;function Za(n){return typeof n=="number"&&Number.isFinite(n)&&n>=En&&n<=An?n:null}const He=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),fe=n=>typeof n=="number"&&Number.isFinite(n),Te=n=>typeof n=="string"&&n.length>0;function ei(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Wa||!Te(e.type)||!Te(e.from)||!fe(e.term)||!fe(e.seq)||!fe(e.sentAt))return null;switch(e.type){case"hello":return Te(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return fe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&fe(e.slot)?e:null;case"ping":case"pong":return Te(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ti(n,e,t,i,s){return{proto:Va,from:e,term:t,seq:i,sentAt:s,...n}}function R(){return(performance.timeOrigin+performance.now())/1e3}const Ue=.003,ni=3,ai=.01,Dt=500;class ii{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?ai:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=Ue&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const s=t-(this.timeOrigin+i)/1e3,o=this.median(),r=s-o,l=Math.abs(s-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(r);return!d&&Math.abs(r)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(r-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,o,d))):(this.pendingStep=r,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,i){const s=this.ctx.currentTime,o=s<=this.revertUntil;let r;if(i&&o){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,r={stepSeconds:this.preStepBase-t,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,u=this.preStep;u.length=0;for(let m=0;m<c.length;m++)u.push(c[m]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,d=e-t;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,r={stepSeconds:e-t,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(r);return!0}median(){const e=this.offsets,t=this.scratch,i=e.length;t.length=i;for(let o=0;o<i;o++){const r=e[o];let l=o-1;for(;l>=0&&t[l]>r;)t[l+1]=t[l],l--;t[l+1]=r}const s=i>>1;return i%2?t[s]:(t[s-1]+t[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ue&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Dt)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ue)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<Dt)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(ni,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(s)&&s>0?s:null}}class si{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...He,...e.capabilities},this.channelOption=e.channel??Xa,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[s,o]=this.tempoRange();e=Math.min(o,Math.max(s,e));const r=this.clock.transport,l=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const d=r.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??xn(d,1),d);i&&i>0?(r.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(An,Math.max(En,e)):Qa;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=Za(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=ei(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const s=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...He,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),s||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const s=this.peers.get(t.from);s?s.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...He},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Ja,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,l)=>[o?0:1,r,l];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(s===null||r[0]<i[0]||r[0]===i[0]&&(r[1]<i[1]||r[1]===i[1]&&r[2]<i[2]))&&(i=r,s=o.id)}this.setLeader(s===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],s=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==s[0]?i[0]<s[0]:i[1]!==s[1]?i[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const s=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>s&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(ti(e,this.id,this.term,++this.seq,this.o.now()))}}const oi=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],H=10,Mn=["1","2","3","4","5","6","7","8","9","0"];function Ln(){return{slots:Array.from({length:H},()=>null),active:null}}function ut(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function ri(n,e,t){const i=n.slots.slice();return i[e]=ut(t),{slots:i,active:e}}function li(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Ft(n,e,t,i){const s=n.slots[e];return s?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function ci(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=ut(e),{slots:t,active:n.active}}const di=16,ui=[2,6,10,14],pi=[2,3,6,10,11,14],Ht=[0,2,4,6,8,10,12,14],hi=[2,6,10,14],mi=[1,3,7,9,11,15],fi={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function J(){return Array.from({length:di},()=>!1)}function K(n,e,t,i=!1){const s=e+n()*(t-e);return i?Math.round(s):Math.round(s*100)/100}function Ge(n,e,t){return K(n,Math.max(0,e-t),Math.min(1,e+t))}function gi(n){const e=J();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function bi(n){const e=J();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=ui.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function wi(n,e){const t=J();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function yi(n,e){const t=J();let i=0;for(const s of pi)i>=3||n[s]||e()<.35&&(t[s]=!0,i+=1);return t}function $i(n){const e=J();let t=0;for(const i of hi){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function ki(n,e){const t=J();for(const r of Ht)t[r]=!n[r];const i=Ht.filter(r=>t[r]&&r!==0),s=1+Math.floor(e()*3);for(let r=0;r<s&&i.length>0;r+=1){const l=Math.floor(e()*i.length),d=i.splice(l,1)[0];d!==void 0&&(t[d]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function vi(n,e){const t=J(),i=n[12]?[13,14,15]:[12,13,14,15];let s=0;for(const o of i){if(s>=3)break;e()<.45&&(t[o]=!0,s+=1)}return t}function xi(n,e,t){const i=J();let s=0;for(const o of mi)s>=2||n[o]||e[o]||t()<.35&&(i[o]=!0,s+=1);return i}function Nn(n,e,t){return Array.from({length:e},(i,s)=>{const o=n[s]===!0,r=o&&t(s);return{on:o,accent:r,velocity:r?1:.8}})}function Cn(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function Si(n,e,t){const i=fi[n];return{tune:K(t,i.tune[0],i.tune[1],!0),decay:K(t,i.decay[0],i.decay[1]),tone:Ge(t,e.tone,.15),snap:Ge(t,e.snap,.15),drive:Ge(t,e.drive,.1),level:K(t,i.level[0],i.level[1])}}function Pn(n){const e=gi(n),t=bi(n),i=$i(n);return{kick:e,snare:t,clap:wi(t,n),rim:yi(e,n),hat:ki(i,n),hatOpen:i,tom:vi(t,n),metal:xi(e,t,n)}}function Ti(n,e,t){const i=n.tracks[e];if(!i)return n;const s=l=>l.every((d,c)=>d.on===(i.steps[c]?.on??!1));let o=i.steps;for(let l=0;l<6;l++){const d=Pn(t)[i.voice];if(o=Nn(d,i.length,c=>Cn(i.voice,c)),!s(o)&&o.some(c=>c.on))break}const r=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((l,d)=>d===e?{...l,steps:[...o,...r]}:l)}}function Ei(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((s,o)=>{if(o<t||o>=e.length)return s;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:i}})}}function Ai(n,e){const t=Pn(e),i=e()<.4?.5:K(e,.5,.62),s=e(),o=s<.8?"lp":s<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:o,cutoff:K(e,.55,.9),resonance:K(e,.05,.3),drive:K(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:Si(r.voice,r.params,e),steps:Nn(t[r.voice],r.length,l=>Cn(r.voice,l))}))}}function Mi(n,e=Math.random){const t=[];let i=null;for(let o=0;o<H;o+=1){const r=ut(Ai(n,e));t.push(r),o===0&&(i=r)}const s=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:s}}function pt(n){return`${Math.round(n*100)}%`}function Li(n){return pt(n)}function Ni(n,e){return n==="tune"?`${Math.round(e)} Hz`:pt(e)}function Ci(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Ze=2,zn=64;function Pi(n,e){const{version:t,...i}=n,s={...i,version:Ze,slots:Array.from({length:H},(o,r)=>{const l=e.slots[r];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Ut(n){return Array.isArray(n)&&n.length<=zn}function zi(n){if(Ri(n)>Ii)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==ht)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==Ze)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const i=t.version,{slots:s,active:o,...r}=t,l=Ce({...r,version:mt});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const d=l.document,c=[];for(const m of d.tracks)Ut(m.steps)||c.push(`More than ${zn} steps on ${m.id}`);const u={slots:Array.from({length:H},()=>null),active:null};return i===Ze&&(!Array.isArray(s)||s.length!==H?c.push(`Expected ${H} slots`):s.forEach((m,b)=>{if(m==null)return;if(!Ce({...d,swing:m.swing,fx:m.fx,tracks:m.tracks}).ok||!m.tracks.every(g=>Ut(g.steps))){c.push(`Slot ${b+1} is malformed`);return}const y=typeof m.seed=="number"&&Number.isFinite(m.seed)?m.seed>>>0:0;u.slots[b]={swing:m.swing,fx:m.fx,tracks:m.tracks,seed:y}}),o!=null&&(!Number.isInteger(o)||o<0||o>=H||!u.slots[o]?c.push("Active slot is empty or out of range"):u.active=o)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:d,bank:u,from:i}}const ht="netcomposer.rhythm",mt=1,Ii=256*1024,In="netcomposer.rhythm.preset.",_i=new Set(oi);function _n(n){return`${In}${n}`}function Ri(n){let e=0;for(const t of n){const i=t.codePointAt(0)??0;i<=127?e+=1:i<=2047?e+=2:i<=65535?e+=3:e+=4}return e}function Ce(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==ht&&e.push("Unknown format"),t.version!==mt&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(In))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)_i.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function Rn(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const ji={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function jn(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:ht,version:mt,id:_n("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Rn(e.on,e.accent),params:{...ji[e.voice]}}))}}function Oi(){const n=jn();return{...n,id:_n("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:Rn([])}))}}const Bi="Tap to join",On="Tap to join the playing beat";function Me(n,e){return n&&e?"join":e?"stop":"play"}function Bn(n){return n==="join"?Bi:n==="stop"?"Stop":"Play"}function qi(n,e,t={}){const i=t.beatsPerBar??4,s=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+s)/i-1e-9)*i)}class Di{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=Me(e,t),this.shown}gesture(e,t,i=!1){return this.joinedBy=!1,i||this.joining||Me(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const i=this.joinedBy||this.joining||Me(e,t)==="join";return this.joinedBy=!1,i}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=qi(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class Fi{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const i=this.key(e);if(this.value=e,this.has=!0,!t&&i===this.lastKey)return!1;this.lastKey=i;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class ft{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,i,s={}){const o=s.id??this.seq+1;this.seq=Math.max(this.seq,o);const r=s.atBeat??qn(t,s.beatsPerBar);return this.held={id:o,slot:e,atBeat:r,payload:i},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new ft;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function qn(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class Hi{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:s=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>i||e<=o)return this.taps=[e],null;const r=e-o,l=this.meanInterval();l!==null&&Math.abs(r-l)>l*s&&(this.taps=[o]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const d=this.meanInterval();return d===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/d)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Dn=globalThis,Ui="linkslots",Gi=new Set(["0","false","off","no"]);function Ki(n,e=Dn.location?.search??"",t=Vi()){const i=new URLSearchParams(e).get(Ui);if(i!==null)return!Gi.has(i.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function Yi(n,e,t){return t||e===n}function Vi(){try{return Dn.localStorage??null}catch{return null}}const Wi="nc-ui",Xi={breakpoint:{md:"768px"}},Fn={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},et={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},Y={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},be=n=>`--${Wi}-${n}`,tt=Fn["label-on-fill-dark"],Gt=Fn["label-on-fill-light"],Ji=Y["label-min-contrast"],Qi=/^#[0-9a-f]{6}$/i,Zi=n=>typeof n=="string"&&Qi.test(n),Le=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Kt(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),s=o=>{const r=(o+n/30)%12;return t-i*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Le(s(0)*255)}${Le(s(8)*255)}${Le(s(4)*255)}`}function Hn(n){const[e,t,i]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),s=Math.max(e,t,i),o=Math.min(e,t,i),r=(s+o)/2,l=s-o;if(!l)return{h:0,s:0,l:r};const d=l/(1-Math.abs(2*r-1));return{h:((s===e?60*((t-i)/l%6):s===t?60*((i-e)/l+2):60*((e-t)/l+4))+360)%360,s:d,l:r}}function Yt(n){const[e,t,i]=[1,3,5].map(s=>{const o=parseInt(n.slice(s,s+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function nt(n,e){const[t,i]=[Yt(n),Yt(e)].sort((s,o)=>o-s);return(t+.05)/(i+.05)}const Pe=n=>nt(n,tt)>=nt(n,Gt)?tt:Gt;function Un(n,e,t,i=Ji){let s=Kt(n,e,t);const o=Pe(s)===tt?1:-1;for(let r=0;r<40&&nt(s,Pe(s))<i;r++)t+=o*.01,s=Kt(n,e,t);return s}function es(n){const{h:e,s:t}=Hn(n),i=Un(e,Math.min(t,Y["surprise-on-max-saturation"]),Y["surprise-on-lightness"]);return{fill:n,ink:Pe(n),on:i,onInk:Pe(i)}}const ts=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function ns(n,e=Math.random){const[t,i]=Y["surprise-saturation"],[s,o]=Y["surprise-lightness"],r=Y["surprise-min-hue-gap"],l=Zi(n)?Hn(n).h:null;let d=e()*360;return l!==null&&ts(d,l)<r&&(d=(l+r+e()*(360-2*r))%360),Un(d,t+e()*(i-t),s+e()*(o-s))}function as(n){if(!n)return null;const e=es(n);return{[be("surprise-fill")]:e.fill,[be("surprise-ink")]:e.ink,[be("surprise-on")]:e.on,[be("surprise-on-ink")]:e.onInk}}const is=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,ss=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function Vt(n){const[e,t,i]=[1,3,5].map(l=>is(parseInt(n.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*i),r=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*i);return[.2104542553*s+.793617785*o-.0040720468*r,1.9779984951*s-2.428592205*o+.4505937099*r,.0259040371*s+.7827717662*o-.808675766*r]}function os([n,e,t]){const i=(n+.3963377774*e+.2158037573*t)**3,s=(n-.1055613458*e-.0638541728*t)**3,o=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*i-3.3077115913*s+.2309699292*o,-1.2684380046*i+2.6097574011*s-.3413193965*o,-.0041960863*i-.7034186147*s+1.707614701*o].map(l=>Le(ss(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const rs=Y["velocity-range"],Gn={min:et.rhythm["velocity-min"],max:et.rhythm["velocity-max"]};function ls(n,e=Gn){const[t,i]=rs,s=Number.isFinite(n)?Math.max(t,Math.min(i,n)):t,o=(s-t)/(i-t),r=et.rhythm["step-cell-ink"];if(o<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:r};if(o>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:r};const l=Vt(e.min),d=Vt(e.max);return{velocity:s,t:o,fill:os(l.map((c,u)=>c+(d[u]-c)*o)),ink:r}}function Wt(n,e=Gn){return{[be("velocity-fill")]:ls(n,e).fill}}const cs=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],ds={renames:cs},us={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ps={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},hs={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Re={};for(const[n,e]of Object.entries(us))Re[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(hs))Re[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(ps))Re[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(ds.renames.map(n=>[n.old,n.new]));function Kn(n){const e=Re[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function I(n){return Kn(n).prop}function a(n){return`var(${I(n)})`}function ms(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(I(e)));return Number.isFinite(t)?t:0}function q(n,e){const t=Kn(e),i=n.ownerDocument??document,s=i.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?s.style.fontFamily=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?s.style.paddingLeft=o:s.style.color=o,(n instanceof Element?n:i.documentElement).append(s);const d=(i.defaultView??window).getComputedStyle(s),c=t.kind==="family"?d.fontFamily:t.kind==="color"?d.color:d.paddingLeft;return s.remove(),c}function fs(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function gs(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=a("font-ui"),t.style.fontSize=a("label-size"),t.style.fontWeight=a("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const s=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),s}const bs="[data-modulated], [data-modulated] *";function ws(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${I("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${I("divider")}: ${a(`module-div-stack-${i}`)};
      ${I("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${I("text-sub")}: ${a("module-sub-stack-1")};
      ${I("divider")}: ${a("module-div-stack-1")};
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
  isolation: isolate;
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
${[1,2,3,4].map(n).join(`
`)}
${[1,2,3,4].map(t).join(`
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
${bs} { transition: none; }
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
  ${I("text-sub")}: ${a("module-sub-stack-1")};
  ${I("divider")}: ${a("module-div-stack-1")};
  ${I("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${I("text-sub")}: inherit;
  ${I("divider")}: inherit;
  ${I("slider-track")}: inherit;
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
  grid-template-rows: auto ${a("slider-pitch")} calc(${a("knob-size")} + ${a("control-gap")} + ${a("label-size")} * ${a("label-leading")}) auto auto;
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
/* The instrument's identity colour on its strip name (the master stays text); silent still dims by colour. */
.nc-strip[data-nc-identity="astrid"] { --strip-identity: ${a("instrument-astrid")}; }
.nc-strip[data-nc-identity="petra"] { --strip-identity: ${a("instrument-petra")}; }
.nc-strip[data-nc-identity="olive"] { --strip-identity: ${a("instrument-olive")}; }
.nc-strip[data-nc-identity] .nc-strip-name { color: var(--strip-identity); }
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${a("text-sub")}; }
.nc-strip-ms { display: flex; gap: ${a("control-gap")}; height: ${a("slider-pitch")}; }
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
`}let Ke=null;const ys="nc-ui-fallback";function Yn(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Ke&&Ke.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${ys} {
${ws()}
}
`,n.head.append(e),Ke=e}function Vn(n={}){const e=n.doc??globalThis.document,t=e.createElement("button");t.type="button",t.className="nc-ui-switch",t.setAttribute("role","switch"),n.id&&(t.id=n.id),n.labelledBy?t.setAttribute("aria-labelledby",n.labelledBy):n.label&&t.setAttribute("aria-label",n.label);const i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=n.onText??"On";const o=e.createElement("span");o.dataset.ncOff="",o.textContent=n.offText??"Off",i.append(s,o),t.append(i);let r=!1;const l=c=>{r=c===!0,t.setAttribute("aria-checked",r?"true":"false")};l(n.checked);const d=()=>{l(!r),n.onChange?.(r)};return t.addEventListener("click",d),{el:t,get checked(){return r},set:l,destroy(){t.removeEventListener("click",d),t.remove()}}}const Wn=new WeakMap,Xt=.25;function $s(n){const e=n.doc??globalThis.document,t=e.createElement("div");t.className="nc-fader",t.tabIndex=0,t.setAttribute("role","slider"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","1");const i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),t.append(i,s);let o=0,r=n.step??.005,l=n.onChange,d=n.onReset;const c=p=>Math.min(1,Math.max(0,p)),u=()=>{t.style.setProperty("--fader-pos",String(o)),t.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},m=p=>{const h=c(p);h!==o&&(o=h,u(),l?.(h))};let b=0,f=!1;t.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),t.focus?.({preventScroll:!0});const h=t.getBoundingClientRect();p.target!==s&&h.height>0&&m(1-(p.clientY-h.top)/h.height),b=p.clientY,f=!0,t.dataset.dragging="true",t.setPointerCapture?.(p.pointerId)}),t.addEventListener("pointermove",p=>{if(!f)return;const h=t.getBoundingClientRect().height||1,k=(b-p.clientY)/h*(p.shiftKey?Xt:1);b=p.clientY,m(o+k)});const y=()=>{f=!1,delete t.dataset.dragging};t.addEventListener("pointerup",y),t.addEventListener("pointercancel",y),t.addEventListener("lostpointercapture",y),t.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),t.addEventListener("keydown",p=>{const h=p.shiftKey?r*Xt:r,k={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+r*10,PageDown:o-r*10,Home:0,End:1};p.key in k&&(p.preventDefault(),m(k[p.key]))});const g={el:t,get value(){return o},get dragging(){return f},set(p){f||(o=c(Number(p)||0),u())},setText(p){p?t.setAttribute("aria-valuetext",p):t.removeAttribute("aria-valuetext")},setLabel(p){t.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(r=p.step),p.onChange&&(l=p.onChange),p.onReset&&(d=p.onReset)}};return g.setLabel(n.label),g.set(n.value??0),g.setText(n.valueText),Wn.set(t,g),g}function ks(n){return Wn.get(n)}const Xn=new WeakMap,vs=.2,xs=1.5,Ss=.5;function Ts(n,e){const t=String(n??"").trim(),i=Number.parseFloat(t);return Number.isFinite(i)?t.endsWith("ms")?i/1e3:i:e}function Jt(n,e,t){const i=n.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?t:Ts(i.getComputedStyle(n).getPropertyValue(I(e)),t)}function Es(n){const e=n.doc??globalThis.document,t=n.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(t);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");const r=[];for(let g=0;g<t;g++){const p=e.createElement("span");p.className="nc-meter-bar";const h=e.createElement("span");h.className="nc-meter-peak";const k=e.createElement("span");k.className="nc-meter-rms";const $=e.createElement("span");$.className="nc-meter-hold",p.append(h,k,$),o.append(p),r.push({peak:h,rms:k,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(s,o);let l=n.label,d=n.onClear,c=!1,u=-1,m=-1;const b=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},f=(g,p,h,k)=>{const $=Math.round(k*1e3)/1e3;h[p]!==$&&(h[p]=$,g.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};s.addEventListener("click",()=>{y.clear(),d?.()});const y={el:i,get clipped(){return c},update(g,p){u<0&&(u=Jt(i,"motion-meter-fall",vs)),m<0&&(m=Jt(i,"motion-meter-hold",xs));const h=Math.max(0,Math.min(.25,Number(p)||0)),k=u>0?Math.exp(-h/u):0;r.forEach(($,T)=>{const v=g[T]??g[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(v.peak)||0)),A=Math.min(E,Math.max(0,Number(v.rms)||0));v.over&&y.clip(),$.level.peak=E>=$.level.peak?E:E+($.level.peak-E)*k,$.level.rms=A>=$.level.rms?A:A+($.level.rms-A)*k,$.holdAge+=h,E>=$.holdAt?($.holdAt=E,$.holdAge=0):$.holdAge>m&&($.holdAt=Math.max(E,$.holdAt-Ss*h)),f($.peak,"peak",$.shown,$.level.peak),f($.rms,"rms",$.shown,$.level.rms),f($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(const g of r)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,f(g.peak,"peak",g.shown,0),f(g.rms,"rms",g.shown,0),f(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,b()},configure(g){g.onClear&&(d=g.onClear)}};return b(),y.reset(),Xn.set(i,y),y}function As(n){return n?Xn.get(n):void 0}function Ms(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i));(n.width!==s||n.height!==o)&&(n.width=s,n.height=o);const r=n.getContext("2d");return r?.setTransform(i,0,0,i,0,0),{ctx:r,w:e,h:t}}function Ye(n){return Math.max(0,Math.min(1,n))}function Jn(n,e){const{ctx:t,w:i,h:s}=Ms(n);if(!t)return;t.clearRect(0,0,i,s);const o=gs(n);if(e.paint==="swatch"){const d=q(n,"accent"),c=q(n,"rhythm.step-cell-on");n.dataset.ncAccent=d,n.dataset.ncStep=c,t.fillStyle=d,t.fillRect(0,0,i/2,s),t.fillStyle=c,t.fillRect(i/2,0,i/2,s);return}if(e.paint==="filter"){const d=e.mode??"lp",c=q(n,fs(d)),u=q(n,"divider"),m=Ye(e.cutoff??.5),b=.08+(1-Ye(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,s*.72),t.lineTo(i,s*.72),t.stroke(),t.beginPath();for(let f=0;f<=i;f++){const y=f/Math.max(1,i);let g=0;d==="lp"?g=y<m?1:Math.max(0,1-(y-m)/b):d==="hp"?g=y>m?1:Math.max(0,1-(m-y)/b):g=Math.max(0,1-Math.abs(y-m)/b);const p=s*.78-g*s*.62;f===0?t.moveTo(f,p):t.lineTo(f,p)}t.strokeStyle=c,t.stroke(),t.fillStyle=q(n,"text-sub"),t.font=o,t.fillText(d.toUpperCase(),0,s),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=q(n,"accent"),t.beginPath();const d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){const u=c/Math.max(1,i),m=(s-4)*(1-Math.exp(-u*4/d));t.lineTo(c,s-m)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const d=Ye(e.level??0);t.fillStyle=q(n,"divider"),t.fillRect(0,s*.4,i,s*.2),t.fillStyle=q(n,"accent"),t.fillRect(0,s*.4,i*d,s*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),l=((e.step??0)%r+r)%r;t.fillStyle=q(n,"rhythm.step-cell-off"),t.fillRect(0,s*.45,i,s*.1),t.fillStyle=q(n,"rhythm.playhead"),t.fillRect(l/r*i,s*.3,Math.max(1,i/r),s*.4),n.dataset.ncAccent=q(n,"accent")}const Qn={slop:8,longPressMs:500,pitchPx:16};class Ls{constructor(e,t,i=Qn){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,s){if(this.phase!=="idle")return!1;const o=this.hit(t,i);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=i,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,s){if(e!==this.pointer)return;const o=t-this.x0,r=i-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,i);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,i,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Ns(n,e,t,i=Qn){let s=!1,o=0;const r=(c,u)=>{const b=n.ownerDocument.elementFromPoint?.(c,u),f=[...n.querySelectorAll(e)],y=b?f.findIndex(h=>h===b||h.contains(b)):-1;if(y>=0)return y;let g=-1,p=Number.POSITIVE_INFINITY;return f.forEach((h,k)=>{if(h.hidden)return;const $=h.getBoundingClientRect();if(u<$.top||u>$.bottom)return;const T=Math.abs(c-($.left+$.width/2));T<p&&T<=$.width&&(g=k,p=T)}),g},l=new Ls(r,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),t(c)},i),d=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),n.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}function _(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function je(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",t.append(i,s),t}function Qt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function $e(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Cs=450,Zt=8;function V(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Ps(n){const e=ms(n,"target-min");return e>0?e:44}function zs(n){if(!(n instanceof HTMLElement))return;const e=[...n.querySelectorAll(".nc-hit")],t=Ps(n),i=t/2,s=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){const r=e[o],l=s[o];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=t&&l.height>=t){r.style.display="none";continue}const d=l.left+l.width/2,c=l.top+l.height/2;let u=d-i,m=d+i,b=c-i,f=c+i;for(let y=0;y<e.length;y++){if(o===y)continue;const g=s[y];if(!g||g.width===0)continue;const p=g.left+g.width/2,h=g.top+g.height/2;Math.abs(h-c)<i*2&&(p>d?m=Math.min(m,(d+p)/2):p<d&&(u=Math.max(u,(d+p)/2))),Math.abs(p-d)<i*2&&(h>c?f=Math.min(f,(c+h)/2):h<c&&(b=Math.max(b,(c+h)/2)))}u=Math.min(u,l.left),m=Math.max(m,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),r.style.left=`${u-l.left}px`,r.style.top=`${b-l.top}px`,r.style.width=`${Math.max(0,m-u)}px`,r.style.height=`${Math.max(0,f-b)}px`,r.style.transform="none"}}function Zn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function en(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ze(n,e){switch(n.type){case"slider":return Is(n,e);case"select":return Rs(n,e);case"toggle":return js(n,e);case"button":return Os(n,e);case"readout":return Bs(n);case"label":return qs(n);case"note":return tn(n);case"knob":return Hs(n,e);case"choice":return Us(n,e);case"slotRow":return Gs(n,e);case"stepGrid":return Ws(n,e);case"canvas":return Qs(n);case"fx":return no(n,e);case"strip":return Zs(n,e);case"stripAdd":return to(n,e);default:return tn({id:"unknown",text:""})}}function X(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,ea(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const s=n.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??$e(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),Qt(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")Qt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Ds(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??$e(e.value))}else if(e.type==="choice")ta(n,e);else if(e.type==="slotRow")aa(n,e);else if(e.type==="stepGrid")at(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&Jn(t,e)}else if(e.type==="strip"){ra(n,e);for(const t of e.sends??[]){const i=n.querySelector(`[data-nc-id="${dn(t.id)}"]`);i instanceof Element&&X(i,{...t,type:"knob"})}}else if(e.type==="stripAdd")sa(n,e);else if(e.type==="fx"){la(n,e);for(const t of[...e.controls,...e.more??[]]){const i=n.querySelector(`[data-nc-id="${dn(t.id)}"]`);i instanceof Element&&X(i,t)}}}}function Is(n,e){const t=je(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{const o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});const s=t.querySelector("[data-nc-readout]");return t.insertBefore(i,s),n.onTap&&t.insertBefore(_s(n,i,e),s),t.append(_()),X(t,n),t}function _s(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(V());const s=o=>{const r=t(e);r?.type==="slider"&&r.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&s(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),s(o.timeStamp))}),i}function Rs(n,e){const t=je(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const s of n.options){const o=document.createElement("option");o.value=s.value,o.textContent=s.label,i.append(o)}return i.value=n.value,i.addEventListener("change",()=>{const s=e(i);s?.type==="select"&&s.onChange(i.value)}),t.append(i,_()),t}function js(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(_()),X(t,n),t}function Os(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(_()),X(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=n.id,s.setAttribute("aria-label","Surprise me"),s.title=n.sparkleTitle??"Surprise me",s.innerHTML=Zn(),s.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&ia(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),i.append(t,s),i}function Bs(n){const e=je(n.id,n.label);return e.append(_()),X(e,n),e}function qs(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(_()),e}function tn(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(_()),e}function nn(n){if(typeof n.valueText=="string")return n.valueText;const e=$e(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function ea(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Ds(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;ea(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",nn(e)),n.setAttribute("aria-label",e.ariaLabel??e.label),n.title=`${e.ariaLabel??e.label}: ${nn(e)}`}function Fs(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,s=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-s:null}function Hs(n,e){const t=je(n.id,n.label);n.compact&&(t.dataset.ncCompact="");const i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const s=document.createElement("i");s.className="nc-knob-mark",i.append(s);let o=0,r=0;i.addEventListener("pointerdown",d=>{o=d.clientY;const c=e(i);r=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;const c=e(i);if(c?.type!=="knob")return;const u=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,r-(d.clientY-o)*u/120));c.onChange(m)}),i.addEventListener("dblclick",()=>{const d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{const c=e(i);if(c?.type!=="knob")return;const u=Fs(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(i,l),t.append(_()),X(t,n),t}function Us(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=i.value,s.setAttribute("role","tab"),s.textContent=i.label,s.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(i.value)}),s.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],l=r.indexOf(s);let d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+r.length)%r.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=r.length-1;else return;const c=r[d];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),t.append(s)}return t.append(_()),ta(t,n),t}function ta(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function Gs(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){const m=n.slots[u],b=document.createElement("span");b.className="nc-snap-wrap";const f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=m.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,V()),Ks(b,f,t,u,e),i.append(b)}const s=n.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Zn(),s.append(V()),s.addEventListener("click",()=>{ia(t);const u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(r,d,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...s?[s]:[]),t.append(c,o,_()),na(t,e),aa(t,n),t}function an(n,e,t,i){const s=t(n);if(s?.type!=="slotRow")return;we(n);const o=i.shiftKey?"store":i.altKey?"clear":"recall";s.onSlot(e,o)}function Ks(n,e,t,i,s){let o=0,r=0,l=0,d=!1,c=!1,u=!1,m=!1;const b=()=>{window.clearTimeout(o),o=0},f=h=>{const k=h.clientX-r,$=h.clientY-l;k*k+$*$>Zt*Zt&&(d=!0,b())},y=()=>{m&&(m=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",p))},g=h=>{const k=o!==0&&!d&&!c;b(),y(),k&&(u=!0,an(t,i,s,h))},p=()=>{d=!0,b(),y()};n.addEventListener("pointerdown",h=>{h.button===0&&(y(),c=!1,d=!1,u=!1,r=h.clientX,l=h.clientY,b(),o=window.setTimeout(()=>{o=0,!d&&(c=!0,Ys(t,e,i,s))},Cs),m=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",h=>h.preventDefault()),n.addEventListener("click",h=>{if(u||c||d){u=!1,c=!1,d=!1;return}an(t,i,s,h)})}function na(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=sn("Save","store"),s=sn("Clear","clear");t.append(i,s);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),we(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const l=r.target;if(!(l instanceof HTMLButtonElement))return;const d=e(n);if(d?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),we(n)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),we(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&we(n)})}function sn(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Ys(n,e,t,i){na(n,i);const s=n.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.bottom-r.top}px`,s.querySelector("button")?.focus()}function we(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function aa(n,e){for(const s of n.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const o=Number(s.dataset.ncSlot),r=e.slots[o];if(!r)continue;s.textContent=r.label,r.filled?s.dataset.filled="true":delete s.dataset.filled,r.active?s.dataset.active="true":delete s.dataset.active,r.edited?s.dataset.edited="true":delete s.dataset.edited,r.queued?s.dataset.queued="true":delete s.dataset.queued,r.queued&&r.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function ia(n){const e=n.dataset.ncLastFill||null,t=ns(e);n.dataset.ncLastFill=t;const i=as(t);if(i)for(const[s,o]of Object.entries(i))n.style.setProperty(s,o)}function Vs(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const s=o=>{if(i===o)return;i=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),s(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>s(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||s(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),s(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function Ws(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const s=p=>{const h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=p,i.append(h),h},o=s("Note"),r=s("Accent");r.dataset.ncAccentMode="";const l=p=>{for(const h of[o,r]){const k=h===p;h.setAttribute("aria-checked",k?"true":"false"),h.tabIndex=k?0:-1}};l(o);for(const p of[o,r])p.addEventListener("click",()=>l(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const h=r.getAttribute("aria-checked")==="true"?o:r;l(h),h.focus()});const d=document.createElement("div");d.className="nc-step-tools",d.append(i),n.onFill&&d.append(Vs(t,e)),t.append(d);for(const p of n.rows){const h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=p.label,k.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(k.dataset.ncLane=String((p.lane-1)%4+1)),k.addEventListener("click",()=>{const v=e(t);if(v?.type!=="stepGrid")return;const E=v.rows.findIndex(A=>A.id===p.id);v.onSelectRow?.(E)}),k.addEventListener("keydown",v=>Xs(t,k,v));const $=[];for(const v of["mute","solo"]){if(!(v==="mute"?n.onMute:n.onSolo))continue;const A=document.createElement("span");A.className="nc-ms-wrap";const L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=v,L.textContent=v==="mute"?"M":"S",L.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${p.label}`),A.append(L,V()),A.addEventListener("click",()=>{const C=e(t);if(C?.type!=="stepGrid")return;const ie=C.rows.findIndex(me=>me.id===p.id);(v==="mute"?C.onMute:C.onSolo)?.(ie)}),$.push(A)}const T=document.createElement("div");T.className="nc-steps";for(let v=0;v<p.steps.length;v++){const E=document.createElement("span");E.className="nc-step-wrap";const A=document.createElement("button");A.type="button",A.className="nc-step",A.dataset.ncStep=`${p.id}:${v}`,A.setAttribute("aria-label",`${p.label} step ${v+1}`),E.append(A,V()),E.addEventListener("click",L=>{const C=e(t);if(C?.type!=="stepGrid")return;const ie=C.rows.findIndex(Se=>Se.id===p.id),me=r.getAttribute("aria-checked")==="true";C.onToggle(ie,v,L.shiftKey||me)}),T.append(E)}if(n.onLength&&T.append(Js(t,T,p,e)),h.append(...$,k,T),n.onDice){const v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=p.id,v.setAttribute("aria-label",`Re-roll ${p.label}`),v.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=en(),v.append(V()),v.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(A=>A.id===p.id))}),h.append(v)}h.addEventListener("click",v=>{if(v.target!==h)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(A=>A.id===p.id))}),on(t,T,".nc-step-wrap",e,r,()=>p.id),t.append(h)}const c=document.createElement("div");c.className="nc-pads-head";const u=(p,h,k)=>{const $=document.createElement("button");return $.type="button",$.className=p,$.textContent=h,k&&$.setAttribute("aria-label",k),$},m=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),f=document.createElement(n.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),n.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{const p=e(t);p?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",at(t,p))}));for(const[p,h]of[[m,-1],[b,1]])p.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const $=k.rows.length;k.onSelectRow?.(((Ee(k)+h)%$+$)%$)});if(c.append(m,f,b),n.onDice){const p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=en(),p.addEventListener("click",()=>{const h=e(t);if(h?.type!=="stepGrid")return;const k=Ee(h);k>=0&&h.onDice?.(k)}),c.append(p)}if(n.transport){const p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const h=e(t);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(p)}t.append(c);const y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");const g=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<g;p++){const h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(p),h.textContent=String(p+1),h.addEventListener("click",k=>{const $=e(t);if($?.type!=="stepGrid")return;const T=Ee($);if(T<0)return;if(t.dataset.ncLenMode==="true"){$.onLength?.(T,p+1);return}const v=r.getAttribute("aria-checked")==="true";$.onToggle(T,p,k.shiftKey||v)}),y.append(h)}return on(t,y,".nc-pad",e,r,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[Ee(p)]?.id:void 0}),t.append(y),t.append(_()),at(t,n),t}function Ee(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function on(n,e,t,i,s,o){let r="on",l=!0,d=-1;const c=(u,m)=>{const b=u.rows[d]?.steps[m];!b||m>=u.rows[d].length||(u.onSet?u.onSet(d,m,r,l):!!b[r]!==l&&u.onToggle(d,m,r==="accent"))};Ns(e,t,u=>{const m=i(n);if(m?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const b=m.rows.findIndex(f=>f.id===o());b>=0&&m.rows[b].length!==u.pad+1&&m.onLength?.(b,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const b=o();d=m.rows.findIndex(y=>y.id===b);const f=m.rows[d]?.steps[u.pad];if(!f)return;r=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[r]}c(m,u.pad)}else if(u.kind==="long"){const b=o(),f=m.rows.findIndex(g=>g.id===b),y=e.querySelectorAll(t)[u.pad];f>=0&&y instanceof HTMLElement&&m.onLongPress?.(f,u.pad,y)}}})}function Xs(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],s=i.indexOf(e);let o=s;t.key==="ArrowDown"?o=s+1:t.key==="ArrowUp"?o=s-1:t.key==="Home"?o=0:o=i.length-1;const r=i[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function Js(n,e,t,i){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(t.steps.length)),s.append(V());const o=c=>{const u=i(n);if(u?.type!=="stepGrid")return;const m=u.rows.findIndex(y=>y.id===t.id),b=u.rows[m];if(!b)return;const f=Math.max(1,Math.min(b.steps.length,c));f!==b.length&&u.onLength?.(m,f)},r=c=>{const u=[...e.querySelectorAll(".nc-step")];let m=1;return u.forEach((b,f)=>{const y=b.getBoundingClientRect();y.width>0&&c>=y.left+y.width/2&&(m=f+1)}),m},l=c=>o(r(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),s.addEventListener("keydown",c=>{const u=i(n);if(u?.type!=="stepGrid")return;const m=u.rows.find(f=>f.id===t.id);if(!m)return;const b={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in b&&(c.preventDefault(),o(b[c.key]))}),s}const Ve=new WeakMap;function rn(n,e){const t=typeof e=="number"?e:null;if(!(Ve.has(n)&&Ve.get(n)===t)){if(Ve.set(n,t),t===null){for(const i of Object.keys(Wt(1)))n.style.removeProperty(i);return}for(const[i,s]of Object.entries(Wt(t)))n.style.setProperty(i,s)}}function at(n,e){const t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),s=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),r=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&s&&(o.textContent=r?`${s.label} · ${s.length}`:s.label,e.onLength&&(o.setAttribute("aria-pressed",r?"true":"false"),o.setAttribute("aria-label",r?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));const l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&s&&(l.setAttribute("aria-label",`Re-roll ${s.label}`),l.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);const d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");const m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&s){i.setAttribute("aria-label",`${s.label} steps`),s.lane&&(i.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||t&&!s.solo?i.dataset.silent="true":delete i.dataset.silent;const c=s.length>0?(e.playhead%s.length+s.length)%s.length:-1;for(const u of i.querySelectorAll("[data-nc-pad]")){const m=Number(u.getAttribute("data-nc-pad")),b=s.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!b||!r&&m>=s.length,r&&m>=s.length?u.dataset.out="true":delete u.dataset.out,r&&m===s.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${s.label} step ${m+1}`),u.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?u.dataset.accent="true":delete u.dataset.accent,b?.dim?u.dataset.dim="true":delete u.dataset.dim,rn(u,b?.velocity),e.playhead>=0&&m===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(const c of e.rows){for(let f=0;f<c.steps.length;f++){const y=c.steps[f],g=n.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;const p=g.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===c.id?p.dataset.selected="true":delete p.dataset.selected;const $=p.querySelector(".nc-name");$ instanceof HTMLElement&&$.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?p.dataset.silent="true":delete p.dataset.silent;for(const v of p.querySelectorAll("[data-nc-ms]")){const E=v.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;v.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?g.dataset.accent="true":delete g.dataset.accent,y.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof y.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),rn(g,y.velocity);const h=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===h?g.dataset.playhead="true":delete g.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!k,f>=c.length&&k?g.dataset.out="true":delete g.dataset.out}const u=n.querySelector(`[data-nc-len="${c.id}"]`),b=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&b&&b.nextElementSibling!==u){const f=document.activeElement===u;b.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Qs(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,_()),e}function Zs(n,e){const t=document.createElement("div");t.className="nc-strip",t.dataset.ncId=n.id,t.setAttribute("role","group"),t.setAttribute("aria-label",n.label),n.master&&(t.dataset.ncMaster="");const i=document.createElement("div");i.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",i.append(s),n.onRemove){const f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{const y=e(t);y?.type==="strip"&&y.onRemove?.(f)}),i.append(f)}const o=document.createElement("div");o.className="nc-strip-ms";for(const f of["mute","solo"]){if(!(f==="mute"?n.onMute:n.onSolo))continue;const g=document.createElement("span");g.className="nc-ms-wrap";const p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=f,p.textContent=f==="mute"?"M":"S",g.append(p,V()),g.addEventListener("click",()=>{const h=e(t);h?.type==="strip"&&(f==="mute"?h.onMute:h.onSolo)?.()}),o.append(g)}const r=document.createElement("div");r.className="nc-strip-sends";for(const f of n.sends??[])r.append(ze({...f,type:"knob",compact:!0},e));const l=document.createElement("div");l.className="nc-strip-body";const d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(const f of n.ticks??[]){const y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(f.value)),y.textContent=f.label,d.append(y)}const c=$s({label:`${n.label} level`,value:n.value,step:n.step,valueText:n.valueText,onChange:f=>{const y=e(t);y?.type==="strip"&&y.onChange(f)},onReset:()=>{const f=e(t);f?.type==="strip"&&cn(f)}}),u=Es({channels:n.channels===2?2:1,label:n.label,onClear:()=>{const f=e(t);f?.type==="strip"&&f.onClipClear?.()}});l.append(d,c.el,u.el);const m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;return m.addEventListener("click",f=>{const y=e(t);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(b),f.detail===0?ln(t,m,e):f.detail===1&&(b=window.setTimeout(()=>ln(t,m,e),eo)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);const f=e(t);f?.type==="strip"&&cn(f)}),t.append(i,o,r,l,m,_()),ra(t,n),t}const eo=250;function ln(n,e,t){const i=t(n);if(i?.type!=="strip"||!i.onTypeIn||n.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=i.valueText??$e(i.value),s.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let o=!1;const r=l=>{if(o)return;o=!0;const d=s.value;if(s.remove(),e.hidden=!1,l){const c=t(n);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),s.addEventListener("blur",()=>r(!1))}function to(n,e){const t=document.createElement("div");t.className="nc-strip-add",t.dataset.ncId=n.id;const i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const o=document.createElement("span");o.className="nc-strip-add-label",i.append(s,o);const r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{const l=e(t),d=r.value;oa(r),l?.type==="stripAdd"&&d&&l.onAdd(d)}),t.append(i,r,_()),sa(t,n),t}function sa(n,e){const t=n.querySelector(".nc-strip-add-label");t&&(t.textContent=e.label);const i=n.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==r&&(i.replaceChildren(...s.map(l=>{const d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),oa(i))}function oa(n){const e=n.options[0];e&&(e.selected=!0)}function cn(n){n.onReset?n.onReset():typeof n.defaultValue=="number"&&n.onChange(n.defaultValue)}function ra(n,e){const t=n.querySelector("[data-nc-strip-name]");t&&t.textContent!==e.label&&(t.textContent=e.label);const i=n.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),n.setAttribute("aria-label",e.label);const s=n.querySelector(".nc-fader"),o=s?ks(s):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),As(n.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const r=n.querySelector(".nc-strip-db");if(r instanceof HTMLElement){const l=e.valueText??$e(e.value);r.textContent!==l&&(r.textContent=l),r.setAttribute("aria-label",`${e.label} level ${l}`);const d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";r.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(const l of n.querySelectorAll("[data-nc-ms]")){const d=l.getAttribute("data-nc-ms"),c=d==="mute"?e.mute===!0:e.solo===!0;l.setAttribute("aria-pressed",c?"true":"false"),l.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}e.silent?n.dataset.silent="true":delete n.dataset.silent,e.identity?n.dataset.ncIdentity=e.identity:delete n.dataset.ncIdentity}function no(n,e){const t=document.createElement("div");t.className="nc-ui-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${n.id}-name`,i.textContent=n.title,n.on===void 0)t.append(i);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const o=Vn({checked:n.on,labelledBy:i.id,onChange:r=>{const l=e(o.el);l?.type==="fx"&&l.onToggle?.(r)}});o.el.dataset.ncFxSwitch="",s.append(i,o.el),t.append(s)}for(const s of n.controls)t.append(ze(s,e));if(n.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const o=document.createElement("summary");o.textContent=n.moreLabel??"More",s.append(o);for(const r of n.more)s.append(ze(r,e));t.append(s)}return t.append(_()),la(t,n),t}function la(n,e){const t=n.querySelector(".nc-ui-fx-name");t&&(t.textContent=e.title);const i=n.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?n.dataset.ncDim="true":delete n.dataset.ncDim}function dn(n){return n.replace(/["\\]/g,"\\$&")}function ao(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(s=>s.type==="canvas"&&s.id===t.dataset.ncId);i?.type==="canvas"&&Jn(t,i)}zs(n)}const io=Y["toast-duration"];function so({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function oo(n,e,t,i){const s=l=>({top:l,bottom:l+t}),o=l=>n.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),r=s(e-i-t);return o(r)?o(s(i))?"bottom":"top":"bottom"}function ca(n,e,t,i,s,o){let r=n.bottom+s;const l=Math.max(o,Math.min(n.left,i-o-t.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(const u of e)u&&u.bottom>r&&u.top<r+t.height&&u.right>l&&u.left<l+t.width&&(r=u.bottom+s,d=!0)}return{top:r,left:l}}const un="data-nc-ui-toast-live";function ro(n,e){let t=e.querySelector(`[${un}]`);return t||(t=n.createElement("div"),t.setAttribute(un,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function lo({message:n,actionLabel:e,onAction:t,duration:i=io,onClose:s,avoid:o=[],anchor:r,host:l,document:d=globalThis.document}={}){l=l??d.body;const c=d.defaultView??globalThis,u=d.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const m=d.createElement("span");m.className="nc-ui-toast-message",m.textContent=n,u.appendChild(m);let b=null;e&&(b=d.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),l.appendChild(u);let f="open";const y=O=>O&&typeof O.getBoundingClientRect=="function"?O.getBoundingClientRect():null,g=y(u),p=g?.height||44,h=c.getComputedStyle?.(u),k=Number.parseFloat(h?.getPropertyValue(I("toast-offset")))||16,$=Number.parseFloat(h?.getPropertyValue(I("toast-anchor-gap")))||8,T=y(r),v=c.innerHeight??0,E=o.map(y).filter(Boolean),A=T&&T.bottom>0&&T.top<v?ca(T,E,{width:g?.width||0,height:p},c.innerWidth??0,$,k):null;A&&A.top+p<=v?(u.setAttribute("data-placement","anchor"),u.style.top=`${A.top+(c.scrollY??0)}px`,u.style.left=`${A.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",oo(E,v,p,k));const L=c.requestAnimationFrame?.bind(c)??(O=>setTimeout(O,16));L(()=>L(()=>{f==="open"&&u.setAttribute("data-state","open")})),ro(d,l).textContent=so({message:n,actionLabel:e});let C,ie;const me=new Promise(O=>{ie=O}),Se=O=>{clearTimeout(C),C=setTimeout(()=>Fe("timeout"),O)};let De=i,It=Date.now();const _t=()=>{f==="open"&&(clearTimeout(C),De=Math.max(0,De-(Date.now()-It)))},Rt=()=>{f==="open"&&(It=Date.now(),Se(De))};u.addEventListener("pointerenter",_t),u.addEventListener("pointerleave",Rt),u.addEventListener("focusin",_t),u.addEventListener("focusout",Rt),b?.addEventListener("click",()=>{if(f==="open")try{t?.()}finally{Fe("action")}}),Number.isFinite(i)&&Se(i);function Fe(O="close"){if(f!=="open")return;f="closing",clearTimeout(C),u.setAttribute("data-state","closing"),s?.(O);const jt=c.getComputedStyle?.(u),Oa=jt?Math.max(0,...String(jt.transitionDuration||"").split(",").map(Bt=>Number.parseFloat(Bt)*(Bt.trim().endsWith("ms")?1:1e3)||0)):0,Ot=()=>{f!=="gone"&&(f="gone",u.remove(),ie(O))};u.addEventListener("transitionend",Ot),setTimeout(Ot,Oa+50)}return{el:u,close:Fe,closed:me}}function pn(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function co({anchor:n,title:e,velocity:t,probability:i,onChange:s,onClose:o,host:r,document:l=globalThis.document}){r=r??l.body;const d=l.defaultView??globalThis,c={velocity:t,probability:i},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const m=l.createElement("div");m.className="nc-step-editor",m.setAttribute("role","dialog"),m.setAttribute("aria-label",e);const b=l.createElement("div");b.className="nc-step-editor-head";const f=l.createElement("span");f.className="nc-label",f.textContent=e;const y=l.createElement("button");y.type="button",y.className="nc-step-editor-done",y.textContent="Done",b.append(f,y),m.appendChild(b);const g=[];for(const[T,v]of[["velocity","Velocity"],["probability","Chance"]]){const E=l.createElement("label");E.className="nc-step-editor-row";const A=l.createElement("span");A.className="nc-label",A.textContent=v;const L=l.createElement("input");L.type="range",L.className="nc-range",L.min=T==="velocity"?"0.05":"0",L.max="1",L.step="0.05",L.value=String(c[T]),L.setAttribute("data-nc-edit",T);const C=l.createElement("output");C.className="nc-readout",C.textContent=pn(c[T]),L.setAttribute("aria-valuetext",C.textContent),L.addEventListener("input",()=>{c[T]=Number(L.value),C.textContent=pn(c[T]),L.setAttribute("aria-valuetext",C.textContent),s({velocity:c.velocity,probability:c.probability})}),E.append(A,L,C),m.appendChild(E),g.push(L)}if(r.append(u,m),n?.setAttribute?.("data-editing","true"),d.matchMedia?.(`(max-width: ${Xi.breakpoint.md})`).matches??!1)m.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const T=n?.getBoundingClientRect?.(),v=m.getBoundingClientRect(),E=Number.parseFloat(d.getComputedStyle(m).getPropertyValue("row-gap"))||8;if(T){let{top:A,left:L}=ca(T,[],{width:v.width,height:v.height},d.innerWidth,E,E);A+v.height>d.innerHeight&&(A=Math.max(E,T.top-E-v.height)),m.style.top=`${A}px`,m.style.left=`${L}px`}m.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let h=!0;const k=T=>{T.key==="Escape"&&(T.preventDefault(),$())};function $(){h&&(h=!1,l.removeEventListener("keydown",k,!0),u.remove(),m.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return l.addEventListener("keydown",k,!0),u.addEventListener("pointerdown",T=>{T.preventDefault(),$()}),y.addEventListener("click",$),{el:m,close:$}}const gt="netcomposer.rhythm.hidden.v1",U=new WeakMap;function We(){try{return globalThis.localStorage??null}catch{return null}}function da(n,e=gt){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function hn(n,e,t,i=gt){const s=da(n,i);t?s.add(e):s.delete(e);try{n?.setItem(i,JSON.stringify([...s]))}catch{}}function bt(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls,...i.more??[]),i.type==="strip"&&t.push(...(i.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return t}function uo(n,e){if(!(!n||!e))return bt(n).find(t=>t.id===e)}function po(n){return`${`${n.layout??""}:${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${bt(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(i=>`${i.id}/${i.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(i=>i.value).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}:${(t.sends??[]).map(i=>i.id).join(",")}:${(t.ticks??[]).map(i=>`${i.label}@${i.value}`).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}:${t.controls.map(i=>i.id).join(",")}/${(t.more??[]).map(i=>i.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function ho(n,e){if(!e.title)return;if(!e.panel){const o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,n.append(o);return}const t=document.createElement("div");t.className="nc-panel-hd";const i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",t.append(i,s),n.append(t),ua(n,e)}function ua(n,e){if(!e.panel)return;const t=[...n.children].find(o=>o.classList.contains("nc-panel-hd")),i=t?.querySelector(".nc-panel-title"),s=t?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function mo(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=U.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return uo(t,i)}function fo(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=po(e);if(n.dataset.ncSignature===i){for(const s of t){const o=n.querySelector(`[data-nc-section="${mn(s.id)}"]`);o&&ua(o,s);for(const r of s.controls){const l=n.querySelector(`[data-nc-id="${mn(r.id)}"]`);l instanceof Element&&X(l,r)}}return}n.dataset.ncSignature=i,n.replaceChildren(),e.layout==="console"?n.dataset.ncLayout="console":delete n.dataset.ncLayout;for(const s of t){const o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=s.id,s.inset&&(o.dataset.ncInset="true"),s.area&&(o.dataset.ncArea=s.area),s.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",s.label)),s.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),s.title&&o.setAttribute("aria-label",s.title)),ho(o,s);const r=s.panel?document.createElement("div"):o;s.panel&&(r.className="nc-panel-body",o.append(r));for(const l of s.controls)r.append(ze(l,mo));n.append(o)}}function mn(n){return n.replace(/["\\]/g,"\\$&")}function wt(n,e=gt){Yn();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead=""),n.compact&&(t.dataset.ncCompact="");const i=da(We(),e).has(n.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";const c=Vn({labelledBy:o.id,onChange:h=>(U.get(t)??n).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",r.append(c.el,l,d);const u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",s.append(o,u,r);const m=document.createElement("div");m.className="nc-module-body",m.id=`${n.id}-body`;const b=document.createElement("button");b.type="button",b.className="nc-slim";const f=document.createElement("span");f.className="nc-slim-lines",b.append(f);const y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",t.append(y,s,m,b),t.setAttribute("aria-labelledby",o.id);const g=h=>{const k=U.get(t)??n;t.dataset.ncOpen=h?"false":"true",m.hidden=h,b.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${k.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const h=t.dataset.ncOpen==="true";hn(We(),(U.get(t)??n).id,h,e),g(h),it(t.parentElement)}),b.addEventListener("click",()=>{hn(We(),(U.get(t)??n).id,!1,e),g(!1),it(t.parentElement)});const p={el:t,update(h){U.set(t,h),h.compact?t.dataset.ncCompact="":delete t.dataset.ncCompact,o.textContent=h.title,u.textContent=h.status??"",h.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,b.setAttribute("aria-label",`Show ${h.title}`),fo(m,h),g(m.hidden),p.redraw()},redraw(){const h=U.get(t);h&&ao(t,bt(h))}};return U.set(t,n),g(i),p.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(t),p}function go(n,e,t="adjacent"){Yn(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((s,o)=>{const r=o%4+1;s.el.dataset.ncShade=String(r),s.el.dataset.ncPlace=i;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),n.append(s.el),s.redraw()}),it(n)}function it(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),t=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):t?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",i.join(" "));const s=e.filter(o=>!o.hasAttribute("data-nc-slim"));t&&e.length===4&&s.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function pa(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function bo(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function wo(n,e={}){const t=new Set,i=(async()=>{await pa();for(const s of n)await bo(e.timeoutMs??200),s.build(),t.add(s)})();return{ready:s=>t.has(s),done:i,toJSON:()=>({built:t.size,total:n.length})}}function yt(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const $t="petra-rhythm.state",ha=1,ma=400,yo=2e3;function $o(n){return JSON.stringify({v:ha,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function ko(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:s}=e;return Ce({...n,swing:t,fx:i,tracks:s}).ok}function vo(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==ha)return null;const t=Ce(e.doc);if(!t.ok||!t.document)return null;const i=t.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==H)return null;const o=s.slots.map(c=>c===null?null:c);if(!o.every(c=>c===null||ko(i,c)))return null;const r=Number.isInteger(s.active)&&o[s.active]?s.active:null,l=e.selectedTrack,d=Number.isInteger(l)&&l>=0&&l<i.tracks.length?l:0;return{doc:i,bank:{slots:o,active:r},selectedTrack:d}}function xo(n,e,t=ma,i=$t){let s,o=0,r="";const l=()=>{clearTimeout(s),s=void 0,o=0;try{const d=$o(e());if(d===r)return;n.setItem(i,d),r=d}catch{}};return{schedule(){const d=Date.now();o||(o=d),clearTimeout(s),s=setTimeout(l,Math.min(t,Math.max(0,o+yo-d)))},flush:l}}function So(n,e,t=$t){if(new URLSearchParams(e).has("fresh"))return null;try{return vo(n.getItem(t))}catch{return null}}const Xe={maker:"PETRA",instrument:"RHYTHM",number:"01"},To="PETRA Rhythm";let fn=!1;function Eo(){return`
.petra-head-name {
  margin: 0;
  font-size: ${a("rhythm.brand-size")};
  font-weight: ${a("rhythm.brand-weight")};
  letter-spacing: ${a("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${a("text-sub")}; }
.petra-head-num { font-family: ${a("font-readout")}; }
.petra-head-line {
  margin: ${a("rhythm.brand-sub-gap")} 0 0;
  font-size: ${a("rhythm.brand-sub-size")};
  color: ${a("text-sub")};
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
  min-width: ${a("target-min")};
  min-height: ${a("target-min")};
  color: ${a("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${a("target-min")} / 2.75); height: calc(${a("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${a("control-gap")};
  background: ${a("surface-page")};
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
}
.petra-menu-body button {
  min-height: ${a("target-min")};
  padding: 0 ${a("module-pad")};
  border: 0;
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${a("text-sub")}; padding: 0 ${a("module-gap")}; }
  /* The last word sits on the page gutter, as ASTRID's header does. */
  .petra-menu-body button:last-of-type { padding-inline-end: 0; }
  .petra-menu-body button:hover { color: ${a("text")}; }
}
`}function Ao(n){const e=n.ownerDocument;if(!fn){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Eo(),e.head.append(c),fn=!0}const t=e.createElement("header");t.className="nc-page-hd petra-head";const i=e.createElement("h1");i.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},o=e.createElement("span");o.className="petra-head-num",o.textContent=Xe.number;const r=e.createElement("span");r.className="petra-head-maker",r.style.color=a("instrument-petra"),r.textContent=Xe.maker,i.append(r," ",s(),` ${Xe.instrument} `,s()," ",o);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const d=e.createElement("div");return d.className="petra-head-title",d.append(i,l),t.append(d),n.before(t),t}function Mo(n,e){const t=n.ownerDocument,i=t.createElement("details");i.className="petra-menu";const s=t.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const o=t.createElement("div");o.className="petra-menu-body";const r=t.createElement("input");r.type="file",r.accept=".rhythm,.json,application/json",r.hidden=!0,r.addEventListener("change",async()=>{const u=r.files?.[0];r.value="",u&&e.load(await u.text(),u.name)});const l=(u,m)=>{const b=t.createElement("button");return b.type="button",b.textContent=u,b.dataset.petraMenu=u.toLowerCase(),b.addEventListener("click",()=>{m(),d||(i.open=!1)}),b};o.append(l("Save",e.save),l("Load",()=>r.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],r),i.append(s,o),n.append(i);let d=null;const c=()=>{const u=getComputedStyle(s).display==="none";u!==d&&(i.open=u),d=u};return window.addEventListener("resize",c),c(),i}class Lo{doc=jn();bank=Ln();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=ci(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=ri(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=i}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=li(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=Ft(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.recallGlideSeconds){const i=Ft(this.bank,e,this.doc,t);return i.applied?(this.retireSparkle(),this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=i.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=Mi(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Ti(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),i=this.liveSwing;return this.followSwing=t,t===i?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let gn=!1;function No(){return`
#app .nc-morph-field { display: none; }
`}function Co(n=document){if(gn)return;const e=n.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=No(),n.head.append(e),gn=!0}function Po(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const s=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function bn(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,s=t?.performanceTime;if(i===void 0||s===void 0||!(i>0)||!(s>0)||!Number.isFinite(e))return null;const o=s+(e-i)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+o;return{playedMs:l,plusLatencyMs:l+r,latencyMs:r,stampContextTime:i,stampPerformanceTime:s}}const zo=1400;function Je(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Io(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class _o{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},zo))}}const Ro=50;function jo(n,e,t,i=Ro){if(t)return 0;const s=n-e;return s>=i?0:i-s}class Oo{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=lo({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function wn(n,e){const t=new AudioContext(e);let i="loading";const s=(async()=>{t.state==="running"&&await t.suspend();for(const o of n)await t.audioWorklet.addModule(o)})().then(()=>{i="loaded"},o=>{throw i="failed",o});return s.catch(()=>{}),{context:t,ready:s,get status(){return i},async start(){return i==="loaded"&&Q(t),await s,t.state!=="running"&&await t.resume(),t.state}}}function Q(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const Bo=5e3;function qo(){return typeof navigator<"u"&&"userAgentData"in navigator}function Do(n,e,t,i={}){const s=i.restartsOnWorkletReady??qo(),o=i.preloadTimeoutMs??Bo;let r=null,l=!1,d=null,c=null;async function u(){const g=new AudioContext(e);Q(g);try{for(const p of n)await g.audioWorklet.addModule(p);return g}catch(p){throw g.close().catch(()=>{}),p}}function m(g,p=!1){l=!0,r=null,g.context.close().catch(()=>{}),p?t?.(new Error(`audio preload still loading after ${o} ms`)):g.ready.catch(h=>t?.(h))}async function b(g){const{context:p}=g;t?.(new Error(`audio preload still loading after ${o} ms; loading into its context again`)),Q(p);const h=(async()=>{for(const k of n)await p.audioWorklet.addModule(k)})();try{return await Promise.race([g.ready.then(()=>{},()=>h),h]),p}catch(k){throw l=!0,r===g&&(r=null),p.close().catch(()=>{}),k}}function f(g){let p;const h=new Promise(k=>{p=setTimeout(()=>k("timeout"),o)});return Promise.race([g.ready.then(()=>"ready"),h]).finally(()=>clearTimeout(p))}async function y(){if(!l){r??=wn(n,e);const g=r;if(g.status==="failed")m(g);else{const p=g.status==="loaded"||!s;if(p&&Q(g.context),g.status==="loading"){let h;try{h=await f(g)}catch{return m(g),u()}if(h==="timeout")return s?(m(g,!0),u()):b(g)}return g.context.state==="closed"?(r===g&&(r=null),y()):(p||Q(g.context),g.context)}}return u()}return{preload(){r||d||c||l||(r=wn(n,e))},load(){return d&&d.state!=="closed"?(Q(d),Promise.resolve(d)):c?(r&&(r.status==="loaded"||!s)&&Q(r.context),c):(c=y().then(g=>(d=g,r=null,g)).finally(()=>{c=null}),c)}}}const yn="/rhythm/assets/processor-DgbvutF7.js",Fo="instance",Ho=99;function fa(n=typeof location>"u"?"":location.search){const e=new URLSearchParams(n).get(Fo)?.trim()??"";if(!/^\d+$/.test(e))return 1;const t=Number(e);return t>=2&&t<=Ho?t:1}function ga(n,e){return e===1?n:`${n}#${e}`}function Uo(n,e){return e===1?n:`${n} ${e}`}let oe;function Go(n,e=fa()){if(oe!==void 0)return oe;oe=null;try{if(typeof window>"u"||window.parent===window)return oe;const t=window.parent.ncStudio;t&&t.version===1&&(oe=t.attach(n,{instance:e}))}catch{}return oe}function Ko(){let n;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(n=i.syncScope)}}catch{}if(!n)return{};const e=`/studio/${n}`,t=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:t?{request:(i,s,o)=>t.request(`${i}${e}`,s,o)}:null}}function Yo(n,e){let t=null;const i=()=>(t??=(async()=>{for(const s of e)await n.audioWorklet.addModule(s);return n})(),t.catch(()=>{t=null}),t);return{preload(){i().catch(()=>{})},load:i}}const ba=new URLSearchParams(location.search),B=ba.has("measure"),Oe=fa(),kt=Uo(To,Oe),Vo=ga("petra-rhythm.linkslots",Oe),Wo=Ki(Vo),Xo=!(B&&ba.get("clockStepFix")==="0");let st=0;const Jo=.05;B&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const te=[40,240],w=new Lo,wa=ga($t,Oe),Ae=B?null:So(localStorage,location.search,wa);Ae&&(w.doc=Ae.doc,w.bank=Ae.bank,w.selectTrack(Ae.selectedTrack));const vt=B?null:xo(localStorage,()=>({doc:w.doc,bank:w.bank,selectedTrack:w.selectedTrack}),ma,wa);if(B){for(const e of w.doc.tracks)e.solo=e.voice==="kick";const n=w.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Jo)}const N=new Ya({bpm:w.doc.bpm,minBpm:te[0],maxBpm:te[1],timebase:"shared"}),xt=document.querySelector("#app");if(!(xt instanceof HTMLElement))throw new Error("Missing #app");const Qo=Ao(xt);Co();const he=new Oo(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let x=null;B&&(window.__audioInfo=()=>x?{sampleRate:x.sampleRate,outputLatency:x.outputLatency,baseLatency:x.baseLatency,state:x.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>Ea(),window.__clockStep=n=>{st=n},window.__debug=()=>({audio:x?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:x?.getOutputTimestamp?.()??null,currentTime:x?.currentTime??null,reanchors:Z?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let D=null,Z=null,Ie=0,ya=0;function Zo(){return x?x.state==="running"?"running":x.state==="suspended"?"suspended":x.state==="interrupted"?"interrupted":"none":"needs-gesture"}const P=new si({...Ko(),app:kt,version:"0.1.0",clock:N,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:te},audio:Zo,outputLatencyMs:()=>Z?.outputLatencyMs??null,swing:()=>w.liveSwing});let ye="",$a=0,ka=!1,$n=Number.NEGATIVE_INFINITY,re=null;const z=new ft;let ce=!1;function j(n=R()){return!ce&&N.transport.isPlayingAt(n)}function ke(n){if(!P.isLeader)return;const e=jo(performance.now(),$n,n);if(e>0){re===null&&(re=setTimeout(()=>{re=null,ke(!0)},e));return}re!==null&&(clearTimeout(re),re=null),P.publishState()&&($n=performance.now())}function kn(){const n=ka?Ei(w.doc).tracks:w.doc.tracks;return ce?n.map(e=>({...e,mute:!0})):n}function ve(){if(!Z)return null;const n=Math.round(Z.offset*1e4)/1e4;return{offset:n,shifted:Ga(N.toSnapshot(),n,"audio")}}const St=new Fi(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function ot(n=!1){const e=ve();e&&St.set(e,n)}function va(n,e,t,i){return{clock:n,measure:B,swing:w.followSwing??e.swing,fx:{...e.fx},...i===void 0?{}:{glideSeconds:i},tracks:t.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let G=null;function M(n="state"){const e=n==="state"?ve():St.current??ve();if(!D||!e)return;sr(),n!=="state"&&(ye="");const{offset:t,shifted:i}=e,s=G;s!==null&&(G=null,ye="");const o=w.consumeGlide(),r=JSON.stringify({seen:z.lastTaken,offset:t,anchor:i.anchor,start:i.startTime,stop:i.stopTime,tempo:i.tempo,swing:w.liveSwing,glide:o??null,tracks:kn(),fx:w.doc.fx});if(r===ye)return;ye=r;const l={...va(i,w.doc,kn(),o),seen:z.lastTaken,...s===null?{}:{enterBeat:s}};$a=t,D.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:i.anchor.time,start:i.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const pe=Go("petra-rhythm",Oe),Tt=pe?Yo(pe.ctx,[yn]):Do([yn],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function Be(){const n=Tt.load();if(x)return;const e=await n;if(x){e!==x&&e.close().catch(()=>{});return}if(x=e,B){const i=x,s=i.getOutputTimestamp.bind(i);i.getOutputTimestamp=()=>{const o=s(),r=!st||!o.contextTime?o:{contextTime:o.contextTime+st/1e3,performanceTime:o.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),r.contextTime??0,r.performanceTime??0]),r}}x.addEventListener("statechange",()=>{S(),ae()}),Z=pe?.mapper??new ii(x,Xo?{}:{stepThresholdMs:0}),Z.onStep(i=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:i.stepSeconds*1e3,confirmedAt:i.confirmedAt,reanchors:i.reanchors,revert:i.revert===!0}),ot(!0)}),Z.start(),D=new AudioWorkletNode(x,"rhythm"),D.port.onmessage=i=>{if(i.data.switched!==void 0&&or(i.data.switched),i.data.level!==void 0&&i.data.step!==void 0&&(ya=i.data.level,Ie!==i.data.step&&(Ie=i.data.step,S())),!(!B||!x)){for(const s of i.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-$a});for(const s of i.data.onsets??[]){const o=bn(x,s.contextTime);o&&window.__onsets?.push({app:kt,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(x.currentTime-s.contextTime)*1e3,...o})}for(const s of i.data.render??[]){const o=bn(x,s.contextTime);o&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:o.playedMs})}}},D.connect(pe?.output??x.destination);let t=!1;St.subscribe(()=>M(t?"clock":"attach")),N.subscribe(i=>ot(i.kind==="snapshot"&&i.replay===!0)),t=!0}const ee=new Di;let Et=!1,Ne=null,de=null;function qe(){return!x||x.state!=="running"}function er(){return de=ee.mode(qe(),j()),de}function At(){return Ne??=(async()=>{try{G=Number.POSITIVE_INFINITY,x&&M(),await Be(),x&&x.state!=="running"&&await x.resume();const n=N.transport;G=ee.enter(n.beatAt(R()),n.bpm),rt&&(rt=!1,G=Math.floor(n.beatAt(R())/4)*4);const e=G;Et=!0,Lt(),M(),B&&(window.__join={...ee.toJSON(),tapBeat:xa,sentBeat:e})}catch(n){throw ee.cancel(),G=Number.NEGATIVE_INFINITY,M(),n}})().finally(()=>{Ne=null,S(),ae()}),Ne}let xa=Number.NaN,rt=!1;function Sa(n){const e=n instanceof KeyboardEvent&&n.repeat;ee.gesture(qe(),j(),e)&&(xa=N.transport.beatAt(R()),At().catch(Ta))}document.addEventListener("pointerdown",Sa,{capture:!0});document.addEventListener("keydown",Sa,{capture:!0});document.addEventListener("pointerup",()=>{ee.pending&&x&&x.state!=="running"&&x.resume()},{capture:!0});function Ta(n){console.warn("[rhythm] audio couldn't start",n),W.say("Audio couldn't start. Press Play to try again."),S()}function Mt(){tr().catch(Ta)}async function tr(){if(ee.swallowClick(qe(),j())){await At();return}await Ea()}let ge=null;function ae(){if(ge!==null&&(clearTimeout(ge),ge=null),!qe())return;Me(!0,j())!==de&&S();const n=R(),{startTime:e,stopTime:t}=N.transport,i=[e,t].filter(o=>o!==null&&o>n);if(i.length===0)return;const s=Math.min((Math.min(...i)-n)*1e3+1,2**31-1);ge=setTimeout(()=>{ge=null,ae()},s)}const nr=1500;function ar(n){let e,t;const i=new Promise(r=>{e=setTimeout(()=>r(!1),nr)}),s=new Promise(r=>{t=()=>{n.state==="running"&&r(!0)},n.addEventListener("statechange",t)}),o=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([o,s,i]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Qe=!1;function ir(){x?x.state!=="running"&&x.resume().catch(()=>{}):Tt.load().catch(()=>{})}async function Ea(){if(Qe){ir();return}Qe=!0;try{if(await Be(),!x)return;if(x.state!=="running"&&!await ar(x)&&!j()){W.say("Tap Play to start audio"),S();return}}finally{Qe=!1}if(pe&&N.transport.isPlayingAt(R())){ce?(ce=!1,G=Math.ceil(N.transport.beatAt(R())/4-1e-9)*4):ce=!0,w.playing=j(),ye="",M(),S();return}if(j()){N.stop({at:R()});return}N.play({at:R()}),!P.isLeader&&[...P.peers.values()].some(n=>n.leader)&&(Et=!0,Lt(),S())}const W=new _o(()=>S());function ne(){return Et&&!P.isLeader}function Lt(){!ne()||!w.adoptSwing(P.swing)||(M(),S())}function Aa(n,e,t){const i=w.peek(n),s=ve();if(!i||!D||!s)return!1;const o=N.transport.beatAt(R()),r=z.recall(n,o,{glide:e},t===void 0?{}:{atBeat:t});return Ca(r,i,s.shifted),!0}let Ma="";function La(n){return ne()?w.followSwing??n.swing:n.swing}function Na(n,e){return JSON.stringify([n,La(e),e.fx,e.tracks])}function Ca(n,e,t){if(!D)return;Ma=Na(n.id,e);const i={...va(t,e,e.tracks,n.payload.glide),swing:La(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};D.port.postMessage({type:"state",state:i})}function sr(){const n=z.pending;if(!n||!D)return;const e=w.peek(n.slot);if(!e){z.cancel();return}if(Na(n.id,e)===Ma)return;const t=ve();t&&Ca(n,e,t.shifted)}function Nt(n,e){const t=w.liveSwing;return w.recall(n,e)?(ne()||(w.followSwing=null),w.liveSwing!==t&&ke(!0),!0):!1}function or(n){const e=z.takeHeld(n);e&&(Nt(e.slot,e.payload.glide),w.consumeGlide(),M(),S())}function Pa(n){if(z.cancel(),!Nt(n,w.recallGlideSeconds))return;const e=w.recallGlideSeconds>0?w.recallGlideSeconds:0;P.sendSnapshot("recall",n,{atBeat:N.transport.beatAt(R()),...e>0?{glide:{seconds:e}}:{}})}function rr(n){if(z.tap(n,j()).kind==="queue"){const t=w.recallGlideSeconds>0?w.recallGlideSeconds:0;if(Aa(n,t,qn(N.transport.beatAt(R())))){const i=z.pending?.atBeat;P.sendSnapshot("recall",n,{...i===void 0?{}:{atBeat:i},...t>0?{glide:{seconds:t}}:{}});return}}Pa(n)}function ue(n,e){const t=Mn[n]??"";if(e==="store")w.store(n),W.say(Je(e,t,!0));else if(e==="clear"){const i=w.bank.slots[n]!=null;if(z.queued===n){const s=z.drop();z.cancel();const o=w.bank.active;s&&o!=null&&P.sendSnapshot("recall",o,{atBeat:s.atBeat})}w.clear(n),W.say(Je(e,t,i)),i&&he.show(xe,`Slot ${t} cleared`)}else w.bank.slots[n]==null?W.say(Je(e,t,!1,matchMedia("(pointer: coarse)").matches)):rr(n);M(),S()}function xe(){w.undoSurprise()&&(he.dismiss(),M(),S())}function lr(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),xe();return}if(n.code==="Space"){n.preventDefault(),n.repeat||Mt();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=H||(n.preventDefault(),n.shiftKey?ue(i,"store"):n.altKey?ue(i,"clear"):ue(i,"recall"))}const cr=new Hi({min:te[0],max:te[1]});function lt(n){w.doc.bpm=n,N.setTempo({bpm:n}),M(),S()}function dr(){return ne()?"Leader's swing · Save stores it":"Own swing · join to follow"}function za(){const n=j(),e=er(),t=ne();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:W.text,controls:[{type:"button",id:"play",label:Bn(e),on:e==="stop",...e==="join"?{ariaLabel:On}:{},onPress:()=>Mt(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{w.surprise(),M(),S(),he.show(xe)}},{type:"slider",id:"bpm",label:"Tempo",min:te[0],max:te[1],step:1,value:N.transport.bpm,onChange:lt,onTap:i=>{const s=cr.tap(i);s!==null&&s!==N.transport.bpm&&lt(s)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:w.liveSwing,valueText:Li(w.liveSwing),disabled:t,modulated:t&&w.followSwing!=null,onChange:i=>{ne()||Ne||(w.setSwing(i),ke(!1),M(),S())},onCommit:()=>{ke(!0)}},...P.isLeader?[]:[{type:"note",id:"swing-note",text:dr()}],...P.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:P.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:w.morphSeconds,morphText:Io(w.morphSeconds),slots:Mn.map((i,s)=>({label:i,filled:w.bank.slots[s]!=null,active:w.bank.active===s,edited:w.edited===s,queued:z.queued===s,pulse:z.queued===s&&n&&Ie%4<2})),onMorph:i=>{w.morphSeconds=i,S()},onSlot:(i,s)=>{ue(i,s)}}]}}function ct(){const n=w.doc.tracks.length;return n===0?0:Math.min(w.selectedTrack,n-1)}function Ia(){const n=w.doc.tracks[ct()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${w.doc.tracks.length} tracks · ${n.name}`:`${w.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:de==="stop",label:Bn(de??"play"),...de==="join"?{ariaLabel:On}:{},onToggle:()=>Mt()},id:"grid",playhead:j()?Ie:-1,selectedRow:n?.id,onSelectRow:e=>{w.selectTrack(e),S()},onDice:e=>{const t=w.doc.tracks[e]?.name??"Lane";w.diceLane(e)&&(M(),S(),he.show(xe,`New ${t} steps`))},onFill:e=>{ka=e,M(),S()},onLength:(e,t)=>{w.edit(i=>{const s=i.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(t))))}),M(),S()},onMute:e=>{w.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),M(),S()},onSolo:e=>{w.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),M(),S()},onToggle:(e,t,i)=>{w.edit(s=>{const o=s.tracks[e]?.steps[t];o&&(i?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),M(),S()},onLongPress:(e,t,i)=>{const s=w.doc.tracks[e],o=s?.steps[t];!s||!o||co({anchor:i,title:`${s.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:l})=>{w.edit(d=>{const c=d.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=r,c.probability=l>=1?void 0:l)}),M(),S()}})},onSet:(e,t,i,s)=>{w.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(i==="accent"?(r.accent=s,s&&(r.on=!0)):(r.on=s,s||(r.accent=!1)))}),M(),S()},rows:w.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]},ur()]}}function ur(){const n=ct(),e=w.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(i=>({type:"slider",id:i,label:Ci(i),valueText:Ni(i,e?.params[i]??0),min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:s=>{w.edit(o=>{const r=o.tracks[ct()];r&&(r.params[i]=s)}),M(),S()}}))}}function Ct(){return{id:"filter",title:"Filter",summary:w.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:w.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{w.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),M(),S()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:w.doc.fx.cutoff,valueText:pt(w.doc.fx.cutoff),onChange:n=>{w.edit(e=>{e.fx.cutoff=n}),M(),S()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:w.doc.fx.mode,cutoff:w.doc.fx.cutoff,resonance:w.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:ya}]}}await pa();const _a=wt(za());await yt();const Pt=wt({id:"pattern",title:"Pattern",lead:!0}),zt=wt({id:"filter",title:Ct().title}),Ra={build:()=>Pt.update(Ia())},ja={build:()=>zt.update(Ct())};let _e=null;function S(){w.takeSurpriseEdit()&&he.dismiss(),_a.update(za()),_e?.ready(Ra)&&Pt.update(Ia()),_e?.ready(ja)&&zt.update(Ct()),vt?.schedule()}window.addEventListener("pagehide",()=>vt?.flush());function vn(n,e,t){z.cancel(),w.replace(n,e),M(),S(),vt?.schedule(),he.show(xe,t)}Mo(Qo,{save:()=>{const n=w.doc.name||"rhythm",e=URL.createObjectURL(new Blob([Pi(w.doc,w.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),W.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=zi(n);if(!t.ok||!t.document||!t.bank){W.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}vn(t.document,t.bank,`Loaded ${e}`)},create:()=>vn(Oi(),Ln(),"New pattern"),panic:()=>D?.port.postMessage({type:"panic"})});N.onChange(()=>{if(N.transport.running||(ce=!1),w.playing=j(),!w.playing&&z.pending){const n=z.drop();n&&Pa(n.slot)}w.doc.bpm=N.transport.bpm,M(),S(),ae()});P.onSwing(n=>{ne()&&w.adoptSwing(n)&&M(),S()});P.onSnapshot(n=>{if(n.op!=="recall")return;const e=P.peers.get(n.from)?.app;if(!Yi(kt,e,Wo)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:R()});const t=n.glide?.seconds??0;if(j()&&Aa(n.slot,t,n.atBeat)){S();return}z.cancel(),Nt(n.slot,t),M(),S()});P.onRole(()=>{Lt(),S(),ae()});P.onPeers(()=>{S(),ae()});B&&(window.__rhythm={setKick:n=>{w.edit(e=>{const t=e.tracks.find(i=>i.voice==="kick");t&&t.steps.forEach((i,s)=>{i.on=n.includes(s)})}),M(),S()},store:n=>ue(n,"store"),tap:n=>ue(n,"recall"),tempo:n=>lt(n),beat:()=>N.transport.beatAt(R()),timeAt:n=>N.transport.timeAt(n),slots:()=>({active:w.bank.active??null,queued:z.queued}),swing:()=>{const n=w.bank.active;return{live:w.liveSwing,doc:w.doc.swing,slot:n==null?null:w.bank.slots[n]?.swing??null,leader:P.isLeader}},setSwing:n=>{w.setSwing(n),ke(!0),M(),S()},lateEnter:()=>{rt=!0},audio:async()=>(await Be(),await x?.resume(),x?.state??"none")});await yt();await P.start();document.addEventListener("keydown",lr);go(xt,[_a,Pt,zt],"adjacent");await yt();S();_e=wo([Ra,ja]);ae();_e.done.then(()=>{Tt.preload(),pe&&Be().then(()=>{j()&&x?.state==="running"&&At()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=j();if(n!==w.playing&&(w.playing=n,S()),ot(),M(),!B||!x)return;const e=Po(x);e&&window.__stamps?.push(e)},250);
