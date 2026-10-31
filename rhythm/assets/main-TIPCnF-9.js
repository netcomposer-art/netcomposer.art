(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Se=1e-9;function cs(n,e,t,a=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,a))}class dn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return cs(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const a=t.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+Se&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+Se)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+Se){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-Se;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,a,s=.25){const r=this.bpmAt(t);if(!(a>0)||!(s>0)){this.setTempoAt(e,t);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,t);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,t+a*(l-1)/o)}prune(e){let t=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(t=a);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new dn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const a=this.segs[t-1];this.segs[t].time=a.time+(this.segs[t].beat-a.beat)*60/a.bpm}}segAtBeat(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].beat<=e+Se)return t[a];return t[0]}segAtTime(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].time<=e+Se)return t[a];return t[0]}}const ds=Object.freeze({beatsPerBar:4,beatUnit:4}),_e=1e-9;function us(n){return Math.floor(n+_e)}function Oa(n,e,t=!1){if(!(e>0))return n;const s=Math.ceil(n/e-_e)*e;return t&&s<=n+_e?s+e:s}class ps{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new dn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??ds}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-_e&&(this.stopTime===null||e<this.stopTime-_e)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-_e?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),a=us(e/t),s=Math.max(0,e-a*t);return{beat:e,bar:a,beatInBar:s,barPhase:s/t}}nextBar(e,t=!1){return Oa(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ja="nc-clock/snapshot",Ba=1;function hs(n,e="local"){return{format:ja,version:Ba,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function ms(n,e){const t=gs(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function fs(n,e,t=n.timebase){const a=s=>s===null?null:s+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(s=>({...s})),meter:{...n.meter},startTime:a(n.startTime),stopTime:a(n.stopTime)}}const Z=n=>typeof n=="number"&&Number.isFinite(n),Fn=n=>n===null||Z(n);function gs(n){const e=n,t=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==ja&&t("format"),(!Z(e.version)||Math.floor(e.version)!==Ba)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!Z(e.anchor.beat)||!Z(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&Z(a.beat)&&Z(a.bpm)&&a.bpm>0))&&t("tempo"),(!e.meter||!Z(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!Z(e.meter.beatUnit))&&t("meter"),(!Fn(e.startTime)||!Fn(e.stopTime)||!Z(e.stoppedBeat))&&t("transport times"),e}class bs{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ps(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,a){this.transport.start({at:e,beat:t,bpm:a}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const a=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){ms(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return hs(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const ys="nc-sync/1",ws=1,vs="nc-sync",ks="nc-sync-leader",$s=0,Fa=.5,Da=.75;function xs(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Fa&&n<=Da?n:null}const Ct=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Be=n=>typeof n=="number"&&Number.isFinite(n),et=n=>typeof n=="string"&&n.length>0;function Ss(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ws||!et(e.type)||!et(e.from)||!Be(e.term)||!Be(e.seq)||!Be(e.sentAt))return null;switch(e.type){case"hello":return et(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Be(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Be(e.slot)?e:null;case"ping":case"pong":return et(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Es(n,e,t,a,s){return{proto:ys,from:e,term:t,seq:a,sentAt:s,...n}}function F(){return(performance.timeOrigin+performance.now())/1e3}const Nt=.003,Ts=3,As=.01,Dn=500;class Ms{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?As:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,a=e?.performanceTime??0;if(!(t>=Nt&&a>0)||!Number.isFinite(t)||!Number.isFinite(a))return!1;const s=t-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!u&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,u))):(this.pendingStep=o,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,a){const s=this.ctx.currentTime,r=s<=this.revertUntil;let o;if(a&&r){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-t,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,d=this.preStep;d.length=0;for(let h=0;h<c.length;h++)d.push(c[h]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,u=e-t;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,o={stepSeconds:e-t,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,t=this.scratch,a=e.length;t.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}const s=a>>1;return a%2?t[s]:(t[s-1]+t[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=Nt&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Dn)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),t=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=Nt)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<Dn)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Ts,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class Ls{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Ct,...e.capabilities},this.channelOption=e.channel??vs,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,a={}){this.send({type:"snapshot",op:e,slot:t,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const a=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const u=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??Oa(u,1),u);a&&a>0?(o.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),t=Math.min(t,a.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Da,Math.max(Fa,e)):$s;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=xs(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const a of[...this.swingListeners])a(t)}}receive(e){const t=Ss(e);if(!t||t.from===this.id)return;const a=this.lastSeq.get(t.from);if(!(a!==void 0&&t.seq<=a)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const s=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Ct,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),s||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const s=this.peers.get(t.from);s?s.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Ct},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ks,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,o,l)=>[r?0:1,o,l];let a=t(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[t.capabilities.prefersLeader?0:1,t.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(Es(e,this.id,this.term,++this.seq,this.o.now()))}}const Hn=.02,Cs=.06,Ns={shaker:{tune:6500,decay:.025,tone:.55,snap:.55,drive:.5,level:.3}},Ha=["kick","snare","clap","rim","hat","hatOpen","tom","metal","shaker"],ne=10,qa=["1","2","3","4","5","6","7","8","9","0"];function Ua(){return{slots:Array.from({length:ne},()=>null),active:null}}function un(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function Ps(n,e,t){const a=n.slots.slice();return a[e]=un(t),{slots:a,active:e}}function _s(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function qn(n,e,t,a){const s=n.slots[e];return s?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:a>0?a:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function zs(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=un(e),{slots:t,active:n.active}}const Rs=16,Is=[2,6,10,14],Os=[2,3,6,10,11,14],pt=[0,2,4,6,8,10,12,14],js=[2,6,10,14],Bs=[1,3,7,9,11,15],Un=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],pt,[2,6,10,14]],Fs={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]}};function V(){return Array.from({length:Rs},()=>!1)}function ce(n,e,t,a=!1){const s=e+n()*(t-e);return a?Math.round(s):Math.round(s*100)/100}function Pt(n,e,t){return ce(n,Math.max(0,e-t),Math.min(1,e+t))}function Ds(n){const e=V();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],a=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[a]=!0),e}function Hs(n){const e=V();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Is.filter(()=>n()<.22);for(const a of t.slice(0,2))e[a]=!0;return e}function qs(n,e){const t=V();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Us(n,e){const t=V();let a=0;for(const s of Os)a>=3||n[s]||e()<.35&&(t[s]=!0,a+=1);return t}function Gs(n){const e=V();let t=0;for(const a of js){if(t>=2)break;n()<.4&&(e[a]=!0,t+=1)}return e}function Ws(n,e){const t=V();for(const o of pt)t[o]=!n[o];const a=pt.filter(o=>t[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),u=a.splice(l,1)[0];u!==void 0&&(t[u]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(t[o]=!0,r+=1)}return t}function Ks(n,e){const t=V(),a=n[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(t[r]=!0,s+=1)}return t}function Vs(n,e,t){const a=V();let s=0;for(const r of Bs)s>=2||n[r]||e[r]||t()<.35&&(a[r]=!0,s+=1);return a}function Ga(n){const e=V(),t=Un[Math.floor(n()*Un.length)]??pt;for(const a of t)e[a]=!0;return e}function Wa(n,e,t){return Array.from({length:e},(a,s)=>{const r=n[s]===!0,o=r&&t(s);return{on:r,accent:o,velocity:o?1:.8}})}function Ka(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:n==="shaker"?e%4===2:!1}function Ys(n,e,t){const a=Fs[n];return{tune:ce(t,a.tune[0],a.tune[1],!0),decay:n==="shaker"?Math.round((a.decay[0]+t()*(a.decay[1]-a.decay[0]))*1e3)/1e3:ce(t,a.decay[0],a.decay[1]),tone:Pt(t,e.tone,.15),snap:Pt(t,e.snap,.15),drive:Pt(t,e.drive,.1),level:ce(t,a.level[0],a.level[1])}}function Va(n,e=!1){const t=Ds(n),a=Hs(n),s=Gs(n);return{kick:t,snare:a,clap:qs(a,n),rim:Us(t,n),hat:Ws(s,n),hatOpen:s,tom:Ks(a,n),metal:Vs(t,a,n),shaker:e?Ga(n):V()}}function Xs(n,e,t){const a=n.tracks[e];if(!a)return n;const s=l=>l.every((u,c)=>u.on===(a.steps[c]?.on??!1));let r=a.steps;for(let l=0;l<6;l++){const u=Va(t,a.voice==="shaker")[a.voice];if(r=Wa(u,a.length,c=>Ka(a.voice,c)),!s(r)&&r.some(c=>c.on))break}const o=a.steps.slice(a.length);return{...n,tracks:n.tracks.map((l,u)=>u===e?{...l,steps:[...r,...o]}:l)}}function Js(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<t||r>=e.length)return s;const o=r-t;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function Qs(n,e){const t=Va(e),a=e()<.4?.5:ce(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:a,fx:{...n.fx,mode:r,cutoff:ce(e,.55,.9),resonance:ce(e,.05,.3),drive:ce(e,.02,.18)},tracks:n.tracks.map(o=>{const l=Ys(o.voice,o.params,e),u=o.voice==="shaker"?e()<.5?V():Ga(e):t[o.voice];return{...o,mute:o.mute,solo:o.solo,params:l,steps:Wa(u,o.length,c=>Ka(o.voice,c))}})}}function Zs(n,e=Math.random){const t=[];let a=null;for(let r=0;r<ne;r+=1){const o=un(Qs(n,e));t.push(o),r===0&&(a=o)}const s=a?{...n,bpm:n.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:n;return{bank:{slots:t,active:0},document:s}}function ze(n){return`${Math.round(n*100)}%`}function er(n){return ze(n)}function tr(n,e){return n==="tune"?`${Math.round(e)} Hz`:ze(e)}function nr(n){return n.charAt(0).toUpperCase()+n.slice(1)}function Gn(n){return`${Math.round(n*1e3)} ms`}const ar={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:n=>`${Math.round(n)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:Gn},tone:{label:"Bright",min:0,max:1,step:.01,text:ze},snap:{label:"Beads",min:0,max:1,step:.01,text:ze},drive:{label:"Attack",min:0,max:1,step:.01,text:n=>Gn(Hn+(Cs-Hn)*n)},level:{label:"Level",min:0,max:1,step:.01,text:ze}};function ir(n,e){return n==="shaker"?ar[e]:{label:nr(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:t=>tr(e,t)}}const Ut=2,Ya=64;function sr(n,e){const{version:t,...a}=n,s={...a,version:Ut,slots:Array.from({length:ne},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Wn(n){return Array.isArray(n)&&n.length<=Ya}function rr(n){if(dr(n)>lr)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==pn)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==Ut)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const a=t.version,{slots:s,active:r,...o}=t,l=Oe({...o,version:hn});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const u=l.document,c=[];for(const h of u.tracks)Wn(h.steps)||c.push(`More than ${Ya} steps on ${h.id}`);const d={slots:Array.from({length:ne},()=>null),active:null};return a===Ut&&(!Array.isArray(s)||s.length!==ne?c.push(`Expected ${ne} slots`):s.forEach((h,f)=>{if(h==null)return;if(!Oe({...u,swing:h.swing,fx:h.fx,tracks:h.tracks}).ok||!h.tracks.every(g=>Wn(g.steps))){c.push(`Slot ${f+1} is malformed`);return}const b=typeof h.seed=="number"&&Number.isFinite(h.seed)?h.seed>>>0:0;d.slots[f]={swing:h.swing,fx:h.fx,tracks:h.tracks,seed:b}}),r!=null&&(!Number.isInteger(r)||r<0||r>=ne||!d.slots[r]?c.push("Active slot is empty or out of range"):d.active=r)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:u,bank:d,from:a}}const Kn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},Vn=(n,e)=>{const t=n&&typeof n=="object"?n:{},a={...e.dials};for(const[s,r]of Object.entries(t.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof t.on=="boolean"?t.on:e.on,dials:a}};function Ve(n){const e=n.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:Vn(e.drive,Kn.drive),compressor:Vn(e.compressor,Kn.compressor)}}function Xa(n){const e=Math.max(0,Math.min(1,n));return Math.min(2e4,40*2**(e*10))}const tt=n=>Math.max(0,Math.min(100,n));function or(n){const e=Xa(n.cutoff),t=tt(Math.max(0,Math.min(1,n.resonance))*100);return n.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:tt(100*Math.log(e/20)/Math.log(100)),q:t}}:n.mode==="bp"?{type:"bandpass",dials:{centre_hz:tt(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:t,mix:100}}:{type:"lowpass",dials:{cutoff:n.cutoff>=.999?0:tt(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const pn="netcomposer.rhythm",hn=1,rt="Saved by an older Rhythm (no Shaker lane), so it can't be opened",lr=256*1024,Ja="netcomposer.rhythm.preset.",cr=new Set(Ha);function Qa(n){return`${Ja}${n}`}function dr(n){let e=0;for(const t of n){const a=t.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function Oe(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==pn&&e.push("Unknown format"),t.version!==hn&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(Ja))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const s of t.tracks)cr.has(s.voice)||e.push(`Unknown voice ${s.voice}`),(!Number.isInteger(s.length)||s.length<1||s.length>64)&&e.push(`Bad length on ${s.id}`),(!Array.isArray(s.steps)||s.steps.length<s.length)&&e.push(`Steps shorter than length on ${s.id}`);if(e.length>0)return{ok:!1,errors:e};const a=t.tracks;return Ha.some(s=>!a.some(r=>r.voice===s))?{ok:!1,errors:[rt]}:{ok:!0,errors:[],document:t}}function Za(n,e=[]){return Array.from({length:16},(t,a)=>({on:n.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const ur={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4},shaker:{...Ns.shaker}};function ei(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]},{voice:"shaker",name:"Shaker",on:[]}];return{format:pn,version:hn,id:Qa("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Za(e.on,e.accent),params:{...ur[e.voice]}}))}}function pr(){const n=ei();return{...n,id:Qa("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:Za([])}))}}const hr="Tap to join",ti="Tap to join the playing beat";function ot(n,e){return n&&e?"join":e?"stop":"play"}function ni(n){return n==="join"?hr:n==="stop"?"Stop":"Play"}function mr(n,e,t={}){const a=t.beatsPerBar??4,s=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+s)/a-1e-9)*a)}class fr{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=ot(e,t),this.shown}gesture(e,t,a=!1){return this.joinedBy=!1,a||this.joining||ot(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const a=this.joinedBy||this.joining||ot(e,t)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=mr(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class gr{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const a=this.key(e);if(this.value=e,this.has=!0,!t&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class mn{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??ai(t,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new mn;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function ai(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class br{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const ii=globalThis,yr="linkslots",wr=new Set(["0","false","off","no"]);function vr(n,e=ii.location?.search??"",t=$r()){const a=new URLSearchParams(e).get(yr);if(a!==null)return!wr.has(a.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function kr(n,e,t){return t||e===n}function $r(){try{return ii.localStorage??null}catch{return null}}const xr="nc-ui",Sr={breakpoint:{md:"768px"}},si={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Gt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},de={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},qe=n=>`--${xr}-${n}`,Wt=si["label-on-fill-dark"],Yn=si["label-on-fill-light"],Er=de["label-min-contrast"],Tr=/^#[0-9a-f]{6}$/i,Ar=n=>typeof n=="string"&&Tr.test(n),lt=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Xn(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const a=e*Math.min(t,1-t),s=r=>{const o=(r+n/30)%12;return t-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${lt(s(0)*255)}${lt(s(8)*255)}${lt(s(4)*255)}`}function ri(n){const[e,t,a]=[1,3,5].map(d=>parseInt(n.slice(d,d+2),16)/255),s=Math.max(e,t,a),r=Math.min(e,t,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const u=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((t-a)/l%6):s===t?60*((a-e)/l+2):60*((e-t)/l+4))+360)%360,s:u,l:o}}function Jn(n){const[e,t,a]=[1,3,5].map(s=>{const r=parseInt(n.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*a}function Kt(n,e){const[t,a]=[Jn(n),Jn(e)].sort((s,r)=>r-s);return(t+.05)/(a+.05)}const ht=n=>Kt(n,Wt)>=Kt(n,Yn)?Wt:Yn;function oi(n,e,t,a=Er){let s=Xn(n,e,t);const r=ht(s)===Wt?1:-1;for(let o=0;o<40&&Kt(s,ht(s))<a;o++)t+=r*.01,s=Xn(n,e,t);return s}function Mr(n){const{h:e,s:t}=ri(n),a=oi(e,Math.min(t,de["surprise-on-max-saturation"]),de["surprise-on-lightness"]);return{fill:n,ink:ht(n),on:a,onInk:ht(a)}}const Lr=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function Cr(n,e=Math.random){const[t,a]=de["surprise-saturation"],[s,r]=de["surprise-lightness"],o=de["surprise-min-hue-gap"],l=Ar(n)?ri(n).h:null;let u=e()*360;return l!==null&&Lr(u,l)<o&&(u=(l+o+e()*(360-2*o))%360),oi(u,t+e()*(a-t),s+e()*(r-s))}function Nr(n){if(!n)return null;const e=Mr(n);return{[qe("surprise-fill")]:e.fill,[qe("surprise-ink")]:e.ink,[qe("surprise-on")]:e.on,[qe("surprise-on-ink")]:e.onInk}}const Pr=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,_r=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function Qn(n){const[e,t,a]=[1,3,5].map(l=>Pr(parseInt(n.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function zr([n,e,t]){const a=(n+.3963377774*e+.2158037573*t)**3,s=(n-.1055613458*e-.0638541728*t)**3,r=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>lt(_r(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const Rr=de["velocity-range"],li={min:Gt.rhythm["velocity-min"],max:Gt.rhythm["velocity-max"]};function Ir(n,e=li){const[t,a]=Rr,s=Number.isFinite(n)?Math.max(t,Math.min(a,n)):t,r=(s-t)/(a-t),o=Gt.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=Qn(e.min),u=Qn(e.max);return{velocity:s,t:r,fill:zr(l.map((c,d)=>c+(u[d]-c)*r)),ink:o}}function Zn(n,e=li){return{[qe("velocity-fill")]:Ir(n,e).fill}}const Or=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],jr={renames:Or},Br={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Fr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Dr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},kt={};for(const[n,e]of Object.entries(Br))kt[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(Dr))kt[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Fr))kt[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(jr.renames.map(n=>[n.old,n.new]));function ci(n){const e=kt[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function I(n){return ci(n).prop}function i(n){return`var(${I(n)})`}function Hr(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(I(e)));return Number.isFinite(t)?t:0}function D(n,e){const t=ci(e),a=n.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const r=`var(${t.prop})`;t.kind==="family"?s.style.fontFamily=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?s.style.paddingLeft=r:s.style.color=r,(n instanceof Element?n:a.documentElement).append(s);const u=(a.defaultView??window).getComputedStyle(s),c=t.kind==="family"?u.fontFamily:t.kind==="color"?u.color:u.paddingLeft;return s.remove(),c}function qr(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function Ur(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=i("font-ui"),t.style.fontSize=i("label-size"),t.style.fontWeight=i("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const s=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),s}const Gr="[data-modulated], [data-modulated] *";function Wr(){const n=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${I("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${I("divider")}: ${i(`module-div-stack-${a}`)};
      ${I("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,t=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${I("text-sub")}: ${i("module-sub-stack-1")};
      ${I("divider")}: ${i("module-div-stack-1")};
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
${Gr} { transition: none; }
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
  ${I("text-sub")}: ${i("module-sub-stack-1")};
  ${I("divider")}: ${i("module-div-stack-1")};
  ${I("slider-track")}: ${i("module-div-stack-1")};
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
  ${I("text-sub")}: ${i("module-sub-stack-1")};
  ${I("divider")}: ${i("module-div-stack-1")};
  ${I("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${I("text-sub")}: inherit;
  ${I("divider")}: inherit;
  ${I("slider-track")}: inherit;
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
`}let _t=null;const Kr="nc-ui-fallback";function di(n=globalThis.document){if(!n?.documentElement||(n.documentElement,_t&&_t.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Kr} {
${Wr()}
}
`,n.head.append(e),_t=e}function ui(n={}){const e=n.doc??globalThis.document,t=e.createElement("button");t.type="button",t.className="nc-ui-switch",t.setAttribute("role","switch"),n.id&&(t.id=n.id),n.labelledBy?t.setAttribute("aria-labelledby",n.labelledBy):n.label&&t.setAttribute("aria-label",n.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=n.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=n.offText??"Off",a.append(s,r),t.append(a);let o=!1;const l=c=>{o=c===!0,t.setAttribute("aria-checked",o?"true":"false")};l(n.checked);const u=()=>{l(!o),n.onChange?.(o)};return t.addEventListener("click",u),{el:t,get checked(){return o},set:l,destroy(){t.removeEventListener("click",u),t.remove()}}}const pi=new WeakMap,ea=.25;function Vr(n){const e=n.doc??globalThis.document,t=e.createElement("div");t.className="nc-fader",t.tabIndex=0,t.setAttribute("role","slider"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),t.append(a,s);let r=0,o=n.step??.005,l=n.onChange,u=n.onReset;const c=p=>Math.min(1,Math.max(0,p)),d=()=>{t.style.setProperty("--fader-pos",String(r)),t.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{const m=c(p);m!==r&&(r=m,d(),l?.(m))};let f=0,y=!1;t.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),t.focus?.({preventScroll:!0});const m=t.getBoundingClientRect();p.target!==s&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,y=!0,t.dataset.dragging="true",t.setPointerCapture?.(p.pointerId)}),t.addEventListener("pointermove",p=>{if(!y)return;const m=t.getBoundingClientRect().height||1,w=(f-p.clientY)/m*(p.shiftKey?ea:1);f=p.clientY,h(r+w)});const b=()=>{y=!1,delete t.dataset.dragging};t.addEventListener("pointerup",b),t.addEventListener("pointercancel",b),t.addEventListener("lostpointercapture",b),t.addEventListener("dblclick",p=>{p.preventDefault(),u?.()}),t.addEventListener("keydown",p=>{const m=p.shiftKey?o*ea:o,w={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});const g={el:t,get value(){return r},get dragging(){return y},set(p){y||(r=c(Number(p)||0),d())},setText(p){p?t.setAttribute("aria-valuetext",p):t.removeAttribute("aria-valuetext")},setLabel(p){t.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(o=p.step),p.onChange&&(l=p.onChange),p.onReset&&(u=p.onReset)}};return g.setLabel(n.label),g.set(n.value??0),g.setText(n.valueText),pi.set(t,g),g}function Yr(n){return pi.get(n)}const hi=new WeakMap,Xr=.2,Jr=1.5,Qr=.5;function Zr(n,e){const t=String(n??"").trim(),a=Number.parseFloat(t);return Number.isFinite(a)?t.endsWith("ms")?a/1e3:a:e}function ta(n,e,t){const a=n.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?t:Zr(a.getComputedStyle(n).getPropertyValue(I(e)),t)}function eo(n){const e=n.doc??globalThis.document,t=n.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(t);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let g=0;g<t;g++){const p=e.createElement("span");p.className="nc-meter-bar";const m=e.createElement("span");m.className="nc-meter-peak";const w=e.createElement("span");w.className="nc-meter-rms";const v=e.createElement("span");v.className="nc-meter-hold",p.append(m,w,v),r.append(p),o.push({peak:m,rms:w,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=n.label,u=n.onClear,c=!1,d=-1,h=-1;const f=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},y=(g,p,m,w)=>{const v=Math.round(w*1e3)/1e3;m[p]!==v&&(m[p]=v,g.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};s.addEventListener("click",()=>{b.clear(),u?.()});const b={el:a,get clipped(){return c},update(g,p){d<0&&(d=ta(a,"motion-meter-fall",Xr)),h<0&&(h=ta(a,"motion-meter-hold",Jr));const m=Math.max(0,Math.min(.25,Number(p)||0)),w=d>0?Math.exp(-m/d):0;o.forEach((v,S)=>{const $=g[S]??g[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number($.peak)||0)),x=Math.min(E,Math.max(0,Number($.rms)||0));$.over&&b.clip(),v.level.peak=E>=v.level.peak?E:E+(v.level.peak-E)*w,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*w,v.holdAge+=m,E>=v.holdAt?(v.holdAt=E,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(E,v.holdAt-Qr*m)),y(v.peak,"peak",v.shown,v.level.peak),y(v.rms,"rms",v.shown,v.level.rms),y(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(const g of o)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,y(g.peak,"peak",g.shown,0),y(g.rms,"rms",g.shown,0),y(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,f()},configure(g){g.onClear&&(u=g.onClear)}};return f(),b.reset(),hi.set(a,b),b}function to(n){return n?hi.get(n):void 0}function no(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),a=n.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(t*a));(n.width!==s||n.height!==r)&&(n.width=s,n.height=r);const o=n.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:t}}function oe(n){return Math.max(0,Math.min(1,n))}function mi(n,e){const{ctx:t,w:a,h:s}=no(n);if(!t)return;t.clearRect(0,0,a,s);const r=Ur(n);if(e.paint==="swatch"){const u=D(n,"accent"),c=D(n,"rhythm.step-cell-on");n.dataset.ncAccent=u,n.dataset.ncStep=c,t.fillStyle=u,t.fillRect(0,0,a/2,s),t.fillStyle=c,t.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const u=e.mode??"lp",c=D(n,qr(u)),d=D(n,"divider"),h=oe(e.cutoff??.5),f=.08+(1-oe(e.resonance??.2))*.22;t.strokeStyle=d,t.beginPath(),t.moveTo(0,s*.72),t.lineTo(a,s*.72),t.stroke(),t.beginPath();for(let y=0;y<=a;y++){const b=y/Math.max(1,a);let g=0;u==="lp"?g=b<h?1:Math.max(0,1-(b-h)/f):u==="hp"?g=b>h?1:Math.max(0,1-(h-b)/f):g=Math.max(0,1-Math.abs(b-h)/f);const p=s*.78-g*s*.62;y===0?t.moveTo(y,p):t.lineTo(y,p)}t.strokeStyle=c,t.stroke(),t.fillStyle=D(n,"text-sub"),t.font=r,t.fillText(u.toUpperCase(),0,s),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=D(n,"accent"),t.beginPath();const u=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const d=c/Math.max(1,a),h=(s-4)*(1-Math.exp(-d*4/u));t.lineTo(c,s-h)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="waveform"){const u=Array.isArray(e.peaks)?e.peaks:[],[c,d]=Array.isArray(e.region)?e.region:[0,1],h=D(n,"accent"),f=D(n,"text-sub"),y=s/2;t.fillStyle=D(n,"accent-soft"),t.fillRect(oe(c)*a,0,(oe(d)-oe(c))*a,s),t.strokeStyle=D(n,"divider"),t.beginPath(),t.moveTo(0,y),t.lineTo(a,y),t.stroke();const b=Math.floor(u.length/2);for(let g=0;g<b;g++){const p=(g+.5)/b*a,m=Math.max(-1,Math.min(1,u[g*2]??0)),w=Math.max(-1,Math.min(1,u[g*2+1]??0)),v=(g+.5)/b;t.strokeStyle=v>=c&&v<=d?h:f,t.beginPath(),t.moveTo(p,y-w*(y-1)),t.lineTo(p,y-m*(y-1)+.5),t.stroke()}t.strokeStyle=h;for(const g of[c,d,...Array.isArray(e.markers)?e.markers:[]]){const p=Math.round(oe(g)*(a-1))+.5;t.beginPath(),t.moveTo(p,0),t.lineTo(p,s),t.stroke()}typeof e.position=="number"&&e.position>=0&&(t.fillStyle=D(n,"text"),t.fillRect(Math.round(oe(e.position)*(a-1)),0,1,s)),b||(t.fillStyle=f,t.font=r,t.fillText(e.empty??"Empty",0,y+4)),n.dataset.ncAccent=h;return}if(e.paint==="meter"){const u=oe(e.level??0);t.fillStyle=D(n,"divider"),t.fillRect(0,s*.4,a,s*.2),t.fillStyle=D(n,"accent"),t.fillRect(0,s*.4,a*u,s*.2),n.dataset.ncAccent=t.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;t.fillStyle=D(n,"rhythm.step-cell-off"),t.fillRect(0,s*.45,a,s*.1),t.fillStyle=D(n,"rhythm.playhead"),t.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),n.dataset.ncAccent=D(n,"accent")}const fi={slop:8,longPressMs:500,pitchPx:16};class ao{constructor(e,t,a=fi){this.hit=e,this.emit=t,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,a,s){if(this.phase!=="idle")return!1;const r=this.hit(t,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,a,s){if(e!==this.pointer)return;const r=t-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function io(n,e,t,a=fi){let s=!1,r=0;const o=(c,d)=>{const f=n.ownerDocument.elementFromPoint?.(c,d),y=[...n.querySelectorAll(e)],b=f?y.findIndex(m=>m===f||m.contains(f)):-1;if(b>=0)return b;let g=-1,p=Number.POSITIVE_INFINITY;return y.forEach((m,w)=>{if(m.hidden)return;const v=m.getBoundingClientRect();if(d<v.top||d>v.bottom)return;const S=Math.abs(c-(v.left+v.width/2));S<p&&S<=v.width&&(g=w,p=S)}),g},l=new ao(o,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),t(c)},a),u=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),n.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}const so=450,nt="application/x-nc-pad",na="http://www.w3.org/2000/svg",ro=48;function oo(n){const e=Math.floor((n?.length??0)/2);if(!e)return"";const t=Math.min(ro,e),a=[],s=[];for(let r=0;r<t;r++){const o=Math.floor(r*e/t),l=Math.max(o+1,Math.floor((r+1)*e/t));let u=0,c=0;for(let h=o;h<l;h++)u=Math.min(u,n[2*h]??0),c=Math.max(c,n[2*h+1]??0);const d=t===1?50:r/(t-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),s.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function lo(n,e){const t=document.createElement("div");t.className="nc-padgrid",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","group"),t.setAttribute("aria-label",n.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(n.columns??2),n.pads.forEach((s,r)=>a.append(co(t,r,e))),t.append(a),t.addEventListener("keydown",s=>{s.key==="Escape"&&ct(t)}),bi(t,n),t}function co(n,e,t){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="nc-padgrid-pad-name";const o=document.createElement("span");o.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const u=document.createElementNS(na,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");const c=document.createElementNS(na,"path");return u.append(c),a.append(s,r,o,l,u),po(n,a,e,t),a.addEventListener("dblclick",()=>{const d=t(n);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&gi(n,a,e,t)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(nt,String(e)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{const h=d.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(nt)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=h.includes(nt)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;const h=t(n);if(h?.type!=="padGrid")return;const f=d.dataTransfer?.getData(nt);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();const b=Number(f);b!==e&&h.onMove?.(b,e,d.altKey);return}const y=d.dataTransfer?.files?.[0];y&&(d.preventDefault(),d.stopPropagation(),h.onFile?.(e,y))}),a}function uo(n,e,t){const a=t(n);a?.type==="padGrid"&&a.onPress(e)}function po(n,e,t,a){let s=0,r=!1,o=0,l=0;const u=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;r=!1,o=c.clientX,l=c.clientY,u();const d=a(n);d?.type==="padGrid"&&(d.onDown?.(t),!(d.onDown&&c.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,r=aa(n,e,t,a)},so)))}),e.addEventListener("pointermove",c=>{s&&Math.hypot(c.clientX-o,c.clientY-l)>8&&u()});for(const c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,u);e.addEventListener("contextmenu",c=>{c.preventDefault(),u(),r=aa(n,e,t,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}uo(n,t,a)})}function aa(n,e,t,a){const s=a(n);if(s?.type!=="padGrid"||!s.menu)return!1;const r=s.menu(t);if(!r.length)return!1;ct(n);const o=document.createElement("div");o.className="nc-slot-scrim",o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),ct(n)}),o.addEventListener("click",d=>d.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const d of r){const h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=d.id,h.textContent=d.label,h.addEventListener("click",()=>{ct(n);const f=a(n);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?gi(n,e,t,a):f.onMenu?.(t,d.id))}),l.append(h)}n.append(o,l);const u=n.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function gi(n,e,t,a){n.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(n);if(s?.type!=="padGrid")return;const r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=s.nameMax??24,r.value=s.pads[t]?.label??"",r.setAttribute("aria-label",`Name of pad ${t+1}`);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-o.left}px`,r.style.top=`${l.top-o.top}px`,r.style.width=`${l.width}px`;let u=!1;const c=d=>{if(u)return;u=!0;const h=r.value.trim();r.remove(),e.focus();const f=a(n);d&&h&&f?.type==="padGrid"&&f.onRename?.(t,h)};r.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),r.addEventListener("blur",()=>c(!0));for(const d of["pointerdown","click","dblclick"])r.addEventListener(d,h=>h.stopPropagation());n.append(r),r.focus(),r.select()}function ct(n){for(const e of n.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function bi(n,e){const t=n.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const r=t[s];if(!(r instanceof HTMLButtonElement))return;const o=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),u=r.querySelector(".nc-padgrid-pad-wave path"),c=r.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",o&&(o.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete r.dataset.empty,o&&(o.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",oo(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;const d=e.selected===s;d?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",d?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function q(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function $t(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const a=document.createElement("label");a.className="nc-label",a.htmlFor=n,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",t.append(a,s),t}function ia(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ye(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const ho=450,sa=8;function ae(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function mo(n){const e=Hr(n,"target-min");return e>0?e:44}function fo(n){if(!(n instanceof HTMLElement))return;const e=[...n.querySelectorAll(".nc-hit")],t=mo(n),a=t/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=t&&l.height>=t){o.style.display="none";continue}const u=l.left+l.width/2,c=l.top+l.height/2;let d=u-a,h=u+a,f=c-a,y=c+a;for(let b=0;b<e.length;b++){if(r===b)continue;const g=s[b];if(!g||g.width===0)continue;const p=g.left+g.width/2,m=g.top+g.height/2;Math.abs(m-c)<a*2&&(p>u?h=Math.min(h,(u+p)/2):p<u&&(d=Math.max(d,(u+p)/2))),Math.abs(p-u)<a*2&&(m>c?y=Math.min(y,(c+m)/2):m<c&&(f=Math.max(f,(c+m)/2)))}d=Math.min(d,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),o.style.left=`${d-l.left}px`,o.style.top=`${f-l.top}px`,o.style.width=`${Math.max(0,h-d)}px`,o.style.height=`${Math.max(0,y-f)}px`,o.style.transform="none"}}function yi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ra(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function mt(n,e){switch(n.type){case"slider":return go(n,e);case"select":return yo(n,e);case"toggle":return wo(n,e);case"button":return vo(n,e);case"readout":return ko(n);case"label":return Eo(n);case"note":return oa(n);case"knob":return Mo(n,e);case"choice":return Lo(n,e);case"slotRow":return Co(n,e);case"stepGrid":return zo(n,e);case"canvas":return Oo(n);case"fx":return Do(n,e);case"strip":return jo(n,e);case"stripAdd":return Fo(n,e);case"padGrid":return lo(n,e);case"moves":return xo(n,e);default:return oa({id:"unknown",text:""})}}function ue(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),a=n.querySelector("label");a&&(a.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,vi(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const s=n.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??Ye(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),ia(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")ia(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&To(t,e);const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Ye(e.value))}else if(e.type==="choice")ki(n,e);else if(e.type==="slotRow")xi(n,e);else if(e.type==="stepGrid")Vt(n,e);else if(e.type==="padGrid")bi(n,e);else if(e.type==="moves")wi(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&mi(t,e)}else if(e.type==="strip"){Ai(n,e);for(const t of e.sends??[]){const a=n.querySelector(`[data-nc-id="${Yt(t.id)}"]`);a instanceof Element&&ue(a,{...t,type:"knob"})}}else if(e.type==="stripAdd")Ei(n,e);else if(e.type==="fx"){Mi(n,e);for(const t of[...e.controls,...e.more??[]]){const a=n.querySelector(`[data-nc-id="${Yt(t.id)}"]`);a instanceof Element&&ue(a,t)}}}}function go(n,e){const t=$t(n.id,n.label);t.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=n.id,a.min=String(n.min),a.max=String(n.max),a.step=String(n.step),a.value=String(n.value),a.disabled=n.disabled===!0,a.dataset.ncId=n.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=t.querySelector("[data-nc-readout]");return t.insertBefore(a,s),n.onTap&&t.insertBefore(bo(n,a,e),s),t.append(q()),ue(t,n),t}function bo(n,e,t){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=n.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),a.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ae());const s=r=>{const o=t(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function yo(n,e){const t=$t(n.id,n.label),a=document.createElement("select");a.className="nc-select",a.id=n.id,a.dataset.ncId=n.id;for(const s of n.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=n.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),t.append(a,q()),t}function wo(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const a=e(t);a?.type==="toggle"&&a.onPress()}),t.append(q()),ue(t,n),t}function vo(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const r=e(t);r?.type==="button"&&r.onPress()}),t.append(q()),ue(t,n),!n.onSparkle)return t;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=n.id,s.setAttribute("aria-label","Surprise me"),s.title=n.sparkleTitle??"Surprise me",s.innerHTML=yi(),s.addEventListener("click",()=>{const r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Si(r);const o=e(t);o?.type==="button"&&o.onSparkle?.()}),a.append(t,s),a}function ko(n){const e=$t(n.id,n.label);return e.append(q()),ue(e,n),e}const $o=450;function xo(n,e){const t=document.createElement("div");t.className="nc-moves",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","group"),t.setAttribute("aria-label",n.label??"Moves");for(const a of n.groups){const s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);const r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;const o=document.createElement("div");o.className="nc-moves-btns";for(const l of a.moves){const u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(So(l.icon)),u.addEventListener("click",()=>{const c=e(t);c?.type==="moves"&&c.onMove(l.id)}),o.append(u)}s.append(r,o),t.append(s)}return wi(t,n),t}function wi(n,e){for(const t of e.groups)for(const a of t.moves){const s=n.querySelector(`[data-nc-move="${Yt(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function So(n){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");if(t.setAttribute("viewBox","0 0 16 16"),t.setAttribute("aria-hidden","true"),t.setAttribute("class","nc-moves-icon"),n?.stroke){const a=document.createElementNS(e,"path");a.setAttribute("d",n.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),t.append(a)}if(n?.fill){const a=document.createElementNS(e,"path");a.setAttribute("d",n.fill),a.setAttribute("fill","currentColor"),t.append(a)}return t}function Eo(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(q()),e}function oa(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(q()),e}function la(n){if(typeof n.valueText=="string")return n.valueText;const e=Ye(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function vi(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function To(n,e){const t=e.max-e.min||1,a=(e.value-e.min)/t;vi(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(a*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",la(e)),n.setAttribute("aria-label",e.ariaLabel??e.label),n.title=`${e.ariaLabel??e.label}: ${la(e)}`}function Ao(n,e){const t=n.max-n.min||1,a=typeof n.step=="number"&&n.step>0?n.step:t/100,s=e.shiftKey?a/10:a;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+a*10:e.key==="PageDown"?n.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-s:null}function Mo(n,e){const t=$t(n.id,n.label);n.compact&&(t.dataset.ncCompact="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=n.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",u=>{r=u.clientY;const c=e(a);o=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId)}),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;const c=e(a);if(c?.type!=="knob")return;const d=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,o-(u.clientY-r)*d/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{const u=e(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{const c=e(a);if(c?.type!=="knob")return;const d=Ao(c,u);d!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,d))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(a,l),t.append(q()),ue(t,n),t}function Lo(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const a of n.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(t);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...t.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let u=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")u=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")u=(l-1+o.length)%o.length;else if(r.key==="Home")u=0;else if(r.key==="End")u=o.length-1;else return;const c=o[u];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),t.append(s)}return t.append(q()),ki(t,n),t}function ki(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const a=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",a?"true":"false"),t.tabIndex=a?0:-1}}function Co(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<n.slots.length;d++){const h=n.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";const y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(d),y.textContent=h.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,ae()),No(f,y,t,d,e),a.append(f)}const s=n.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=yi(),s.append(ae()),s.addEventListener("click",()=>{Si(t);const d=e(t);d?.type==="slotRow"&&d.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const d=e(t);d?.type==="slotRow"&&d.onMorph(Number(l.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",r.append(o,u,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),t.append(c,r,q()),$i(t,e),xi(t,n),t}function ca(n,e,t,a){const s=t(n);if(s?.type!=="slotRow")return;Ue(n);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function No(n,e,t,a,s){let r=0,o=0,l=0,u=!1,c=!1,d=!1,h=!1;const f=()=>{window.clearTimeout(r),r=0},y=m=>{const w=m.clientX-o,v=m.clientY-l;w*w+v*v>sa*sa&&(u=!0,f())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",p))},g=m=>{const w=r!==0&&!u&&!c;f(),b(),w&&(d=!0,ca(t,a,s,m))},p=()=>{u=!0,f(),b()};n.addEventListener("pointerdown",m=>{m.button===0&&(b(),c=!1,u=!1,d=!1,o=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!u&&(c=!0,Po(t,e,a,s))},ho),h=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",m=>m.preventDefault()),n.addEventListener("click",m=>{if(d||c||u){d=!1,c=!1,u=!1;return}ca(t,a,s,m)})}function $i(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const a=da("Save","store"),s=da("Clear","clear");t.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),Ue(n)}),r.addEventListener("click",o=>o.stopPropagation()),n.append(r,t),t.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const u=e(n);if(u?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),Ue(n)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),Ue(n))}),n.addEventListener("keydown",o=>{o.key==="Escape"&&Ue(n)})}function da(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Po(n,e,t,a){$i(n,a);const s=n.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(t);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function Ue(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function xi(n,e){for(const s of n.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const a=n.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Si(n){const e=n.dataset.ncLastFill||null,t=Cr(e);n.dataset.ncLastFill=t;const a=Nr(t);if(a)for(const[s,r]of Object.entries(a))n.style.setProperty(s,r)}function _o(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,t.setAttribute("aria-pressed",r?"true":"false");const o=e(n);o?.type==="stepGrid"&&o.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>s(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function zo(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=p=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,a.append(m),m},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=p=>{for(const m of[r,o]){const w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(r);for(const p of[r,o])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const m=o.getAttribute("aria-checked")==="true"?r:o;l(m),m.focus()});const u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),n.onFill&&u.append(_o(t,e)),n.onClear){const p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=n.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.onClear?.()}),u.append(p)}t.append(u);for(const p of n.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,S=0;w.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(S=window.setTimeout(()=>{const T=e(t);T?.type!=="stepGrid"||!T.selectedRows||(v=!0,T.onSelectRow?.(T.rows.findIndex(C=>C.id===p.id),!0))},$o))});for(const x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(S));w.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),w.addEventListener("click",x=>{const T=e(t);if(T?.type!=="stepGrid")return;if(v){v=!1;return}const C=T.rows.findIndex(U=>U.id===p.id),B=!!T.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);T.onSelectRow?.(C,B)}),w.addEventListener("keydown",x=>Ro(t,w,x));const $=[];for(const x of["mute","solo"]){if(!(x==="mute"?n.onMute:n.onSolo))continue;const C=document.createElement("span");C.className="nc-ms-wrap";const B=document.createElement("button");B.type="button",B.className="nc-ms",B.dataset.ncMs=x,B.textContent=x==="mute"?"M":"S",B.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${p.label}`),C.append(B,ae()),C.addEventListener("click",()=>{const U=e(t);if(U?.type!=="stepGrid")return;const re=U.rows.findIndex(P=>P.id===p.id);(x==="mute"?U.onMute:U.onSolo)?.(re)}),$.push(C)}const E=document.createElement("div");E.className="nc-steps";for(let x=0;x<p.steps.length;x++){const T=document.createElement("span");T.className="nc-step-wrap";const C=document.createElement("button");C.type="button",C.className="nc-step",C.dataset.ncStep=`${p.id}:${x}`,C.setAttribute("aria-label",`${p.label} step ${x+1}`),T.append(C,ae()),T.addEventListener("click",B=>{const U=e(t);if(U?.type!=="stepGrid")return;const re=U.rows.findIndex(Ze=>Ze.id===p.id),P=o.getAttribute("aria-checked")==="true";U.onToggle(re,x,B.shiftKey||P)}),E.append(T)}if(n.onLength&&E.append(Io(t,E,p,e)),m.append(...$,w,E),n.onDice){const x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=p.id,x.setAttribute("aria-label",`Re-roll ${p.label}`),x.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=ra(),x.append(ae()),x.addEventListener("click",()=>{const T=e(t);T?.type==="stepGrid"&&T.onDice?.(T.rows.findIndex(C=>C.id===p.id))}),m.append(x)}m.addEventListener("click",x=>{if(x.target!==m)return;const T=e(t);T?.type==="stepGrid"&&T.onSelectRow?.(T.rows.findIndex(C=>C.id===p.id))}),ua(t,E,".nc-step-wrap",e,o,()=>p.id),t.append(m)}const c=document.createElement("div");c.className="nc-pads-head";const d=(p,m,w)=>{const v=document.createElement("button");return v.type="button",v.className=p,v.textContent=m,w&&v.setAttribute("aria-label",w),v},h=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),y=document.createElement(n.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),n.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{const p=e(t);p?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",Vt(t,p))}));for(const[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{const w=e(t);if(w?.type!=="stepGrid"||w.rows.length===0)return;const v=w.rows.length;w.onSelectRow?.(((at(w)+m)%v+v)%v)});if(c.append(h,y,f),n.onDice){const p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=ra(),p.addEventListener("click",()=>{const m=e(t);if(m?.type!=="stepGrid")return;const w=at(m);w>=0&&m.onDice?.(w)}),c.append(p)}if(n.transport){const p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const m=e(t);m?.type==="stepGrid"&&m.transport?.onToggle()}),c.append(p)}t.append(c);const b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");const g=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<g;p++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{const v=e(t);if(v?.type!=="stepGrid")return;const S=at(v);if(S<0)return;if(t.dataset.ncLenMode==="true"){v.onLength?.(S,p+1);return}const $=o.getAttribute("aria-checked")==="true";v.onToggle(S,p,w.shiftKey||$)}),b.append(m)}return ua(t,b,".nc-pad",e,o,()=>{const p=e(t);return p?.type==="stepGrid"?p.rows[at(p)]?.id:void 0}),t.append(b),t.append(q()),Vt(t,n),t}function at(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function ua(n,e,t,a,s,r){let o="on",l=!0,u=-1;const c=(d,h)=>{const f=d.rows[u]?.steps[h];!f||h>=d.rows[u].length||(d.onSet?d.onSet(u,h,o,l):!!f[o]!==l&&d.onToggle(u,h,o==="accent"))};io(e,t,d=>{const h=a(n);if(h?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;const f=h.rows.findIndex(y=>y.id===r());f>=0&&h.rows[f].length!==d.pad+1&&h.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){const f=r();u=h.rows.findIndex(b=>b.id===f);const y=h.rows[u]?.steps[d.pad];if(!y)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[o]}c(h,d.pad)}else if(d.kind==="long"){const f=r(),y=h.rows.findIndex(g=>g.id===f),b=e.querySelectorAll(t)[d.pad];y>=0&&b instanceof HTMLElement&&h.onLongPress?.(y,d.pad,b)}}})}function Ro(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const a=[...n.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;t.key==="ArrowDown"?r=s+1:t.key==="ArrowUp"?r=s-1:t.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(t.preventDefault(),o.focus(),o.click())}function Io(n,e,t,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(t.steps.length)),s.append(ae());const r=c=>{const d=a(n);if(d?.type!=="stepGrid")return;const h=d.rows.findIndex(b=>b.id===t.id),f=d.rows[h];if(!f)return;const y=Math.max(1,Math.min(f.steps.length,c));y!==f.length&&d.onLength?.(h,y)},o=c=>{const d=[...e.querySelectorAll(".nc-step")];let h=1;return d.forEach((f,y)=>{const b=f.getBoundingClientRect();b.width>0&&c>=b.left+b.width/2&&(h=y+1)}),h},l=c=>r(o(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),s.addEventListener("keydown",c=>{const d=a(n);if(d?.type!=="stepGrid")return;const h=d.rows.find(y=>y.id===t.id);if(!h)return;const f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};c.key in f&&(c.preventDefault(),r(f[c.key]))}),s}const zt=new WeakMap;function pa(n,e){const t=typeof e=="number"?e:null;if(!(zt.has(n)&&zt.get(n)===t)){if(zt.set(n,t),t===null){for(const a of Object.keys(Zn(1)))n.style.removeProperty(a);return}for(const[a,s]of Object.entries(Zn(t)))n.style.setProperty(a,s)}}function Vt(n,e){const t=e.rows.some(d=>d.solo),a=n.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=n.querySelector(".nc-pads"),r=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),l=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",l?"true":"false"),o.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));const u=n.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&r&&(u.setAttribute("aria-label",`Re-roll ${r.label}`),u.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);const c=n.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){const d=!!e.transport?.playing,h=e.transport?.label??(d?"Stop":"Play");c.textContent!==h&&(c.textContent=h),c.setAttribute("aria-pressed",d?"true":"false");const f=e.transport?.ariaLabel;f?c.setAttribute("aria-label",f):c.removeAttribute("aria-label")}if(s instanceof HTMLElement&&r){s.setAttribute("aria-label",`${r.label} steps`),r.lane&&(s.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||t&&!r.solo?s.dataset.silent="true":delete s.dataset.silent;const d=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(const h of s.querySelectorAll("[data-nc-pad]")){const f=Number(h.getAttribute("data-nc-pad")),y=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!y||!l&&f>=r.length,l&&f>=r.length?h.dataset.out="true":delete h.dataset.out,l&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",y?.on?"true":"false"),y?.accent?h.dataset.accent="true":delete h.dataset.accent,y?.dim?h.dataset.dim="true":delete h.dataset.dim,pa(h,y?.velocity),e.playhead>=0&&f===d?h.dataset.playhead="true":delete h.dataset.playhead)}}for(const d of e.rows){for(let b=0;b<d.steps.length;b++){const g=d.steps[b],p=n.querySelector(`[data-nc-step="${d.id}:${b}"]`);if(!(p instanceof HTMLButtonElement))continue;const m=p.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;const S=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);S?m.dataset.picked="true":delete m.dataset.picked;const $=m.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===d.id||S?"true":"false"),$.textContent!==d.label&&($.textContent=d.label,$.setAttribute("aria-label",`Select ${d.label}`))),d.mute||t&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(const x of m.querySelectorAll("[data-nc-ms]")){const T=x.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;x.setAttribute("aria-pressed",T?"true":"false")}}p.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?p.dataset.accent="true":delete p.dataset.accent,g.dim?p.dataset.dim="true":delete p.dataset.dim,b%4===0?p.dataset.bar="true":delete p.dataset.bar,typeof g.velocity=="number"?(p.dataset.velocity="true",p.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete p.dataset.velocity,p.style.removeProperty("--level")),pa(p,g.velocity);const w=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;b===w?p.dataset.playhead="true":delete p.dataset.playhead;const v=!!e.onLength&&e.selectedRow===d.id;p.hidden=b>=d.length&&!v,b>=d.length&&v?p.dataset.out="true":delete p.dataset.out}const h=n.querySelector(`[data-nc-len="${d.id}"]`),y=n.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&y&&y.nextElementSibling!==h){const b=document.activeElement===h;y.after(h),b&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(d.length)),h.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),h.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function Oo(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=n.id,a.dataset.ncPaint=n.paint,e.append(t,a,q()),e}function jo(n,e){const t=document.createElement("div");t.className="nc-strip",t.dataset.ncId=n.id,t.setAttribute("role","group"),t.setAttribute("aria-label",n.label),n.master&&(t.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",a.append(s),n.onRemove){const b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{const g=e(t);g?.type==="strip"&&g.onRemove?.(b)}),a.append(b)}const r=document.createElement("div");if(r.className="nc-strip-hacks",n.onHacks){const b=document.createElement("span");b.className="nc-hacks-wrap";const g=document.createElement("button");g.type="button",g.className="nc-hacks",g.dataset.ncHacks="",b.append(g,ae()),b.addEventListener("click",()=>{const p=e(t);p?.type==="strip"&&p.onHacks?.()}),r.append(b)}const o=document.createElement("div");o.className="nc-strip-ms";for(const b of["mute","solo"]){if(!(b==="mute"?n.onMute:n.onSolo))continue;const p=document.createElement("span");p.className="nc-ms-wrap";const m=document.createElement("button");m.type="button",m.className="nc-ms",m.dataset.ncMs=b,m.textContent=b==="mute"?"M":"S",p.append(m,ae()),p.addEventListener("click",()=>{const w=e(t);w?.type==="strip"&&(b==="mute"?w.onMute:w.onSolo)?.()}),o.append(p)}const l=document.createElement("div");l.className="nc-strip-sends";for(const b of n.sends??[])l.append(mt({...b,type:"knob",compact:!0},e));const u=document.createElement("div");u.className="nc-strip-body";const c=document.createElement("span");c.className="nc-scale",c.setAttribute("aria-hidden","true");for(const b of n.ticks??[]){const g=document.createElement("span");g.className="nc-scale-tick",g.style.setProperty("--tick-pos",String(b.value)),g.textContent=b.label,c.append(g)}const d=Vr({label:`${n.label} level`,value:n.value,step:n.step,valueText:n.valueText,onChange:b=>{const g=e(t);g?.type==="strip"&&g.onChange(b)},onReset:()=>{const b=e(t);b?.type==="strip"&&ma(b)}}),h=eo({channels:n.channels===2?2:1,label:n.label,onClear:()=>{const b=e(t);b?.type==="strip"&&b.onClipClear?.()}});u.append(c,d.el,h.el);const f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",b=>{const g=e(t);g?.type!=="strip"||!g.onTypeIn||(window.clearTimeout(y),b.detail===0?ha(t,f,e):b.detail===1&&(y=window.setTimeout(()=>ha(t,f,e),Bo)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);const b=e(t);b?.type==="strip"&&ma(b)}),t.append(a,r,o,l,u,f,q()),Ai(t,n),t}const Bo=250;function ha(n,e,t){const a=t(n);if(a?.type!=="strip"||!a.onTypeIn||n.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??Ye(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const u=s.value;if(s.remove(),e.hidden=!1,l){const c=t(n);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function Fo(n,e){const t=document.createElement("div");t.className="nc-strip-add",t.dataset.ncId=n.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(t),u=o.value;Ti(o),l?.type==="stripAdd"&&u&&l.onAdd(u)}),t.append(a,o,q()),Ei(t,n),t}function Ei(n,e){const t=n.querySelector(".nc-strip-add-label");t&&(t.textContent=e.label);const a=n.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Ti(a))}function Ti(n){const e=n.options[0];e&&(e.selected=!0)}function ma(n){n.onReset?n.onReset():typeof n.defaultValue=="number"&&n.onChange(n.defaultValue)}function Ai(n,e){const t=n.querySelector("[data-nc-strip-name]");t&&t.textContent!==e.label&&(t.textContent=e.label);const a=n.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),n.setAttribute("aria-label",e.label);const s=n.querySelector(".nc-fader"),r=s?Yr(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),to(n.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=n.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const u=e.valueText??Ye(e.value);o.textContent!==u&&(o.textContent=u),o.setAttribute("aria-label",`${e.label} level ${u}`);const c=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${c}`:c}for(const u of n.querySelectorAll("[data-nc-ms]")){const c=u.getAttribute("data-nc-ms"),d=c==="mute"?e.mute===!0:e.solo===!0;u.setAttribute("aria-pressed",d?"true":"false"),u.setAttribute("aria-label",`${c==="mute"?"Mute":"Solo"} ${e.label}`)}const l=n.querySelector("[data-nc-hacks]");if(l){const u=e.hacksLabel??"Hacks";l.textContent!==u&&(l.textContent=u),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${u}: ${e.label}`)}e.silent?n.dataset.silent="true":delete n.dataset.silent,delete n.dataset.ncIdentity}function Do(n,e){const t=document.createElement("div");t.className="nc-ui-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${n.id}-name`,a.textContent=n.title,n.on===void 0)t.append(a);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const r=ui({checked:n.on,labelledBy:a.id,onChange:o=>{const l=e(r.el);l?.type==="fx"&&l.onToggle?.(o)}});r.el.dataset.ncFxSwitch="",s.append(a,r.el),t.append(s)}for(const s of n.controls)t.append(mt(s,e));if(n.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const r=document.createElement("summary");r.textContent=n.moreLabel??"More",s.append(r);for(const o of n.more)s.append(mt(o,e));t.append(s)}return t.append(q()),Mi(t,n),t}function Mi(n,e){const t=n.querySelector(".nc-ui-fx-name");t&&(t.textContent=e.title);const a=n.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?n.dataset.ncDim="true":delete n.dataset.ncDim}function Yt(n){return n.replace(/["\\]/g,"\\$&")}function Ho(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===t.dataset.ncId);a?.type==="canvas"&&mi(t,a)}fo(n)}const qo=de["toast-duration"];function Uo({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function Go(n,e,t,a){const s=l=>({top:l,bottom:l+t}),r=l=>n.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),o=s(e-a-t);return r(o)?r(s(a))?"bottom":"top":"bottom"}function Li(n,e,t,a,s,r){let o=n.bottom+s;const l=Math.max(r,Math.min(n.left,a-r-t.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(const d of e)d&&d.bottom>o&&d.top<o+t.height&&d.right>l&&d.left<l+t.width&&(o=d.bottom+s,u=!0)}return{top:o,left:l}}const fa="data-nc-ui-toast-live";function Wo(n,e){let t=e.querySelector(`[${fa}]`);return t||(t=n.createElement("div"),t.setAttribute(fa,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function Ko({message:n,actionLabel:e,onAction:t,duration:a=qo,onClose:s,avoid:r=[],anchor:o,host:l,document:u=globalThis.document}={}){l=l??u.body;const c=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");const h=u.createElement("span");h.className="nc-ui-toast-message",h.textContent=n,d.appendChild(h);let f=null;e&&(f=u.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,d.appendChild(f)),l.appendChild(d);let y="open";const b=W=>W&&typeof W.getBoundingClientRect=="function"?W.getBoundingClientRect():null,g=b(d),p=g?.height||44,m=c.getComputedStyle?.(d),w=Number.parseFloat(m?.getPropertyValue(I("toast-offset")))||16,v=Number.parseFloat(m?.getPropertyValue(I("toast-anchor-gap")))||8,S=b(o),$=c.innerHeight??0,E=r.map(b).filter(Boolean),x=S&&S.bottom>0&&S.top<$?Li(S,E,{width:g?.width||0,height:p},c.innerWidth??0,v,w):null;x&&x.top+p<=$?(d.setAttribute("data-placement","anchor"),d.style.top=`${x.top+(c.scrollY??0)}px`,d.style.left=`${x.left+(c.scrollX??0)}px`):d.setAttribute("data-placement",Go(E,$,p,w));const T=c.requestAnimationFrame?.bind(c)??(W=>setTimeout(W,16));T(()=>T(()=>{y==="open"&&d.setAttribute("data-state","open")})),Wo(u,l).textContent=Uo({message:n,actionLabel:e});let C,B;const U=new Promise(W=>{B=W}),re=W=>{clearTimeout(C),C=setTimeout(()=>Lt("timeout"),W)};let P=a,Ze=Date.now();const Rn=()=>{y==="open"&&(clearTimeout(C),P=Math.max(0,P-(Date.now()-Ze)))},In=()=>{y==="open"&&(Ze=Date.now(),re(P))};d.addEventListener("pointerenter",Rn),d.addEventListener("pointerleave",In),d.addEventListener("focusin",Rn),d.addEventListener("focusout",In),f?.addEventListener("click",()=>{if(y==="open")try{t?.()}finally{Lt("action")}}),Number.isFinite(a)&&re(a);function Lt(W="close"){if(y!=="open")return;y="closing",clearTimeout(C),d.setAttribute("data-state","closing"),s?.(W);const On=c.getComputedStyle?.(d),ls=On?Math.max(0,...String(On.transitionDuration||"").split(",").map(Bn=>Number.parseFloat(Bn)*(Bn.trim().endsWith("ms")?1:1e3)||0)):0,jn=()=>{y!=="gone"&&(y="gone",d.remove(),B(W))};d.addEventListener("transitionend",jn),setTimeout(jn,ls+50)}return{el:d,close:Lt,closed:U}}function ga(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function Vo({anchor:n,title:e,velocity:t,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const u=l.defaultView??globalThis,c={velocity:t,probability:a},d=l.createElement("div");d.className="nc-slot-scrim nc-step-editor-scrim";const h=l.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const y=l.createElement("span");y.className="nc-label",y.textContent=e;const b=l.createElement("button");b.type="button",b.className="nc-step-editor-done",b.textContent="Done",f.append(y,b),h.appendChild(f);const g=[];for(const[S,$]of[["velocity","Velocity"],["probability","Chance"]]){const E=l.createElement("label");E.className="nc-step-editor-row";const x=l.createElement("span");x.className="nc-label",x.textContent=$;const T=l.createElement("input");T.type="range",T.className="nc-range",T.min=S==="velocity"?"0.05":"0",T.max="1",T.step="0.05",T.value=String(c[S]),T.setAttribute("data-nc-edit",S);const C=l.createElement("output");C.className="nc-readout",C.textContent=ga(c[S]),T.setAttribute("aria-valuetext",C.textContent),T.addEventListener("input",()=>{c[S]=Number(T.value),C.textContent=ga(c[S]),T.setAttribute("aria-valuetext",C.textContent),s({velocity:c.velocity,probability:c.probability})}),E.append(x,T,C),h.appendChild(E),g.push(T)}if(o.append(d,h),n?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${Sr.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),d.setAttribute("data-placement","sheet");else{const S=n?.getBoundingClientRect?.(),$=h.getBoundingClientRect(),E=Number.parseFloat(u.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(S){let{top:x,left:T}=Li(S,[],{width:$.width,height:$.height},u.innerWidth,E,E);x+$.height>u.innerHeight&&(x=Math.max(E,S.top-E-$.height)),h.style.top=`${x}px`,h.style.left=`${T}px`}h.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let m=!0;const w=S=>{S.key==="Escape"&&(S.preventDefault(),v())};function v(){m&&(m=!1,l.removeEventListener("keydown",w,!0),d.remove(),h.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",w,!0),d.addEventListener("pointerdown",S=>{S.preventDefault(),v()}),b.addEventListener("click",v),{el:h,close:v}}const fn="netcomposer.rhythm.hidden.v1",le=new WeakMap;function Rt(){try{return globalThis.localStorage??null}catch{return null}}function Ci(n,e=fn){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ba(n,e,t,a=fn){const s=Ci(n,a);t?s.add(e):s.delete(e);try{n?.setItem(a,JSON.stringify([...s]))}catch{}}function gn(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(a=>a.controls)],t=[];for(const a of e)t.push(a),a.type==="fx"&&t.push(...a.controls,...a.more??[]),a.type==="strip"&&t.push(...(a.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return t}function Yo(n,e){if(!(!n||!e))return gn(n).find(t=>t.id===e)}function Xo(n){return`${`${n.layout??""}:${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${gn(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(a=>`${a.id}=${a.moves.map(s=>s.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(a=>a.value).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}:${(t.sends??[]).map(a=>a.id).join(",")}:${(t.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}:${t.controls.map(a=>a.id).join(",")}/${(t.more??[]).map(a=>a.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Jo(n,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,n.append(r);return}const t=document.createElement("div");t.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",t.append(a,s),n.append(t),Ni(n,e)}function Ni(n,e){if(!e.panel)return;const t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),a=t?.querySelector(".nc-panel-title"),s=t?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function Qo(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=le.get(e),a=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Yo(t,a)}function Zo(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],a=Xo(e);if(n.dataset.ncSignature===a){for(const s of t){const r=n.querySelector(`[data-nc-section="${ya(s.id)}"]`);r&&Ni(r,s);for(const o of s.controls){const l=n.querySelector(`[data-nc-id="${ya(o.id)}"]`);l instanceof Element&&ue(l,o)}}return}n.dataset.ncSignature=a,n.replaceChildren(),e.layout==="console"?n.dataset.ncLayout="console":delete n.dataset.ncLayout;for(const s of t){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),Jo(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(mt(l,Qo));n.append(r)}}function ya(n){return n.replace(/["\\]/g,"\\$&")}function bn(n,e=fn){di();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead=""),n.compact&&(t.dataset.ncCompact="");const a=Ci(Rt(),e).has(n.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";const c=ui({labelledBy:r.id,onChange:m=>(le.get(t)??n).onToggle?.(m)});c.el.dataset.ncModuleSwitch="",o.append(c.el,l,u);const d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",s.append(r,d,o);const h=document.createElement("div");h.className="nc-module-body",h.id=`${n.id}-body`;const f=document.createElement("button");f.type="button",f.className="nc-slim";const y=document.createElement("span");y.className="nc-slim-lines",f.append(y);const b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",t.append(b,s,h,f),t.setAttribute("aria-labelledby",r.id);const g=m=>{const w=le.get(t)??n;t.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${w.title}`),l.title=m?"Show":"Hide",m?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const m=t.dataset.ncOpen==="true";ba(Rt(),(le.get(t)??n).id,m,e),g(m),Xt(t.parentElement)}),f.addEventListener("click",()=>{ba(Rt(),(le.get(t)??n).id,!1,e),g(!1),Xt(t.parentElement)});const p={el:t,update(m){le.set(t,m),m.compact?t.dataset.ncCompact="":delete t.dataset.ncCompact,r.textContent=m.title,d.textContent=m.status??"",m.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),y.textContent=m.summary??m.title,c.el.hidden=m.on===void 0,c.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),Zo(h,m),g(h.hidden),p.redraw()},redraw(){const m=le.get(t);m&&Ho(t,gn(m))}};return le.set(t,n),g(a),p.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(t),p}function el(n,e,t="adjacent"){di(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const a=t==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),n.append(s.el),s.redraw()}),Xt(n)}function Xt(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&s.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function Pi(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function tl(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function nl(n,e={}){const t=new Set,a=(async()=>{await Pi();for(const s of n)await tl(e.timeoutMs??200),s.build(),t.add(s)})();return{ready:s=>t.has(s),done:a,toJSON:()=>({built:t.size,total:n.length})}}function yn(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const al="modulepreload",il=function(n){return"/rhythm/"+n},wa={},sl=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");s=o(t.map(c=>{if(c=il(c),c in wa)return;wa[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":al,d||(f.as="script"),f.crossOrigin="",f.href=c,u&&f.setAttribute("nonce",u),document.head.appendChild(f),d)return new Promise((y,b)=>{f.addEventListener("load",y),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var rl=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Jt=[.25,.5,.75,1,1.5,2],ol=4.9,R={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},fe={fmt:"wet"},Y={fmt:"pct"},Ee={fmt:"db"},it={fmt:"signedPct"},It={fmt:"num",suffix:" ms"},z={div:100};function A(n,e,t,a,s,r,o,l){var u={key:n,label:e,min:t,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var c in l)u[c]=l[c];return u}function st(n){return n.map(function(e){return{value:e[0],label:e[1]}})}var We=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:R.hpQ},{dsp:{law:R.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:R.bpHz,astrid:!0},{dsp:{law:R.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:R.bpQ},{dsp:{law:R.bpQ}}),A("mix","Mix",0,100,100,3,fe,{dsp:z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:st(rl),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,Y,{dsp:z,unit:"%"}),A("mix","Wet/dry",0,100,0,3,fe,{dsp:z,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:R.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:st([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,Y,{dsp:z,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,it,{dsp:z,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,It,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:z,unit:"%"}),A("decay","Decay",0,100,50,3,Y,{dsp:z,unit:"%"}),A("damping","Damping",0,100,0,4,Y,{dsp:z,unit:"%"}),A("mix","Mix",0,100,0,5,fe,{dsp:z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,70,2,Y,{dsp:z,unit:"%"}),A("feedback","Feedback",-90,90,50,3,it,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,4,fe,{dsp:z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,50,2,Y,{dsp:z,unit:"%"}),A("spread","Spread",0,100,70,3,Y,{dsp:z,unit:"%"}),A("mix","Mix",0,100,40,4,fe,{dsp:z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,70,2,Y,{dsp:z,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:st([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,Y,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,5,fe,{dsp:z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,Ee,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,Ee,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:R.midHz,astrid:!0},{dsp:{law:R.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:R.eqQ},{dsp:{law:R.eqQ}}),A("high_db","High",-18,18,0,4,Ee,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,Ee,{unit:"dB"}),A("mix","Mix",0,100,100,3,fe,{dsp:z,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:st([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:R.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,it,{dsp:z,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,it,{dsp:z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,Ee,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:R.ratio},{dsp:{law:R.ratio}}),A("attack_ms","Attack",1,100,10,3,It,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,It,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,Ee,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,Y,{dsp:z,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:z})]}],ll=We.map(function(n){return n.type});We.filter(function(n){return!n.hidden}).map(function(n){return n.type});var cl={reverb:"plate"};function wn(n){var e=cl[n]||n;return ll.indexOf(e)>=0?e:null}function se(n){for(var e=wn(n),t=0;t<We.length;t++)if(We[t].type===e)return We[t];return null}function Ne(n,e){if(n.zeroNull&&e<=0)return null;var t=n.pow?n.pow[0]*Math.pow(n.pow[1],e/n.div):n.exp2[0]*Math.pow(2,n.exp2[1]*e/n.div);return n.fixed!==void 0?+t.toFixed(n.fixed):n.round?Math.round(t):t}function _i(n,e){var t=n.dsp;if(!t)return e;if(t.div)return e/t.div;var a=Ne(t.law,e);return a===null?0:a}function va(n,e){return Math.min(ol,n*60/(e>0?e:120))}var ka=function(n){return n>0?"+":n<0?"−":""};function dl(n){return n==null?"open":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1)+" kHz":n+" Hz"}function zi(n,e,t){var a=n.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:ka(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return ka(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Ne(a.law,e),s===null?a.zero||"open":a.astrid?dl(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ne(a.law,e).toFixed(1);case"ratio":return Ne(a.law,e).toFixed(1)+":1";case"rate":return s=Ne(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<n.options.length;r++)if(n.options[r].value===e)return n.options[r].label;return String(e);case"tempoMs":return Math.round(va(e,t)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(va(e,t)*1e3)+" ms"}return String(e)}var ul=1,xt=["drive","delay","plate"];function pl(n){var e={};for(var t in n)t!=="format"&&(e[t]=n[t]);return e.format=function(a,s){return zi(n,a,s)},e}var Ke=xt.map(function(n){var e=se(n),t={type:n,label:e.label,dials:e.dials.map(pl)};return e.tempoSynced&&(t.tempoSynced=!0),t}),hl={reverb:"plate"};function ft(n){var e=hl[n]||n;return xt.indexOf(e)>=0?e:null}function St(n){for(var e=ft(n),t=0;t<Ke.length;t++)if(Ke[t].type===e)return Ke[t];return null}function Ri(n,e){var t=St(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}function je(n,e){if(n.stepWhen&&e){for(var t=0;t<n.stepWhen.length;t++)if(e[n.stepWhen[t].key]===n.stepWhen[t].value)return n.stepWhen[t].step}return n.step}function pe(n,e,t){if(typeof e!="number"||!isFinite(e))return n.default;if(n.options){for(var a=n.options[0].value,s=1;s<n.options.length;s++)Math.abs(n.options[s].value-e)<Math.abs(a-e)&&(a=n.options[s].value);return a}if(n.exact)return e>0?e<n.minOn?n.minOn:e>n.max?n.max:e:0;var r=t>0&&t<1?Math.round(1/t):1;return Math.max(n.min,Math.min(n.max,Math.round(e*r)/r))+0}function ml(){return{v:ul,chain:Ke.map(function(n){var e={};return n.dials.forEach(function(t){e[t.key]=t.default}),{id:n.type,type:n.type,bypass:!0,dials:e}})}}function fl(n){return Jt.reduce(function(e,t){return Math.abs(t-n)<Math.abs(e-n)?t:e},Jt[0])}function Ot(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function gl(n){for(var e=Array.isArray(n)?n:Ot(n)&&Array.isArray(n.chain)?n.chain:[],t=Array.isArray(n),a=ml(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(Ot(l)){var u=ft(l.type);if(!u){typeof l.type=="string"&&r.push(l.type);continue}if(s[u]){r.push(u);continue}s[u]=!0;var c=a.chain[xt.indexOf(u)],d=Ot(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=t?l.bypass===!0:l.bypass!==!1,St(u).dials.forEach(function(h){c.dials[h.key]=pe(h,d[h.key])}),bl(u,c.dials,d)}}return{state:a,dropped:r}}function bl(n,e,t){for(var a=St(n),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=pe(r,t&&typeof t[r.key]=="number"?t[r.key]:e[r.key],je(r,e)))}}function Qt(n){return gl(n).state}function yl(n){return JSON.parse(JSON.stringify(n))}var wl=24,Zt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function en(n,e,t){if(e==="bypass")return t?0:1;var a=Ri(n,e)||vl(n,e);return a?_i(a,t):0}function vl(n,e){var t=se(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}var kl={};Ke.forEach(function(n){n.dials.forEach(function(e){kl[n.type+"."+e.key]=e.format})});function jt(n,e){var t=new Float64Array(wl),a=Qt(n);return a.chain.forEach(function(s){var r=Zt[s.type];t[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){t[r[o]]=en(s.type,o,s.dials[o])})}),t}var $l=2,gt=3,xl=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Fe(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function Ii(n,e){var t=se(n);if(!t)return null;var a={};(e||[]).forEach(function(o){o&&o.id&&(a[o.id]=!0)});for(var s=1;a[t.type+"-"+s];)s++;var r={};return t.dials.forEach(function(o){r[o.key]=o.default}),{id:t.type+"-"+s,type:t.type,bypass:!1,dials:r}}function Sl(n){var e=se(n.type),t=/-(\d+)$/.exec(n.id||"");return(e?e.label:n.type)+(t&&+t[1]>1?" "+t[1]:"")}function El(n,e,t){var a=n.length-1,s=Math.max(0,Math.min(a,t));if(e<0||e>a||e===s)return n;var r=n.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function Tl(n){return typeof n=="number"&&isFinite(n)?fl(n):n}function $a(n,e,t){var a={};return n.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),t&&n.type==="delay"&&s.key==="delay_beats"&&(r=Tl(r)),a[s.key]=pe(s,r)}),n.dials.forEach(function(s){s.stepWhen&&(a[s.key]=pe(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],je(s,a)))}),a}function Al(n,e){if(!(typeof e!="number"||!isFinite(e))){var t=n.dsp;if(!t)return e;if(t.div)return Math.round(e*t.div*1e6)/1e6;for(var a=n.min,s=1/0,r=n.min;r<=n.max;r++){var o=Ne(t.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var Ml={rate:"rate_hz"};function Ll(n,e,t,a){var s={};return n.dials.forEach(function(r){if(!r.more){var o=r.astridKey||Ml[r.key]||r.key;s[r.key]=Al(r,e[o])}}),n.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&t.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function Cl(n,e){var t=e>0?Math.floor(e):gt,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(n)?(r=n,l=!0):Fe(n)&&Array.isArray(n.chain)&&(r=n.chain,o=n.v===1,l=n.schema===2);for(var u=[],c=0;c<r.length;c++){var d=r[c];if(Fe(d)&&!(d.type==="limiter"||d.fixed===!0)){var h=wn(d.type),f=h&&se(h);if(!f||o&&["drive","delay","plate"].indexOf(h)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=t){a.push(d.id||h);continue}var y;Fe(d.params)&&!Fe(d.dials)?y=$a(f,Ll(f,d.params,s,d.id||h),l):y=$a(f,Fe(d.dials)?d.dials:{},l);var b=Ii(h,u),g=typeof d.id=="string"&&xl.test(d.id)&&!u.some(function(m){return m.id===d.id})?d.id:b.id,p=o?d.bypass!==!1:d.bypass===!0;u.push({id:o?b.id:g,type:h,bypass:p,dials:y})}}return{state:{v:$l,chain:u},dropped:a,notes:s}}function dt(n,e){return Cl(n,e).state}function Te(n){var e=se(n.type),t=[[0,n.bypass?0:1]];return e.dials.forEach(function(a){t.push([a.k,_i(a,n.dials[a.key])])}),t}function Nl(n){var e=dt(n,8),t=[],a=e.chain.map(function(s,r){var o=se(s.type),l={};return r>=gt&&t.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(u){var c=s.dials[u.key];if(u.more){c!==u.default&&t.push(s.id+"."+u.key);return}u.key==="delay_beats"&&Jt.indexOf(c)<0&&t.push(s.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:t}}var Pl="nc-fx@1",_l=600,zl=256,Rl=8,De=typeof WeakMap=="function"?new WeakMap:null;function Il(n,e){var t=De&&De.get(n);return t||(t=(async function(){if(!n||!n.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await n.audioWorklet.addModule(String(e));return}var a=(await sl(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await n.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),De&&(De.set(n,t),t.catch(function(){De.delete(n)})),t)}function Ae(n,e){return typeof n=="number"&&isFinite(n)?n:e}function Oi(n,e,t,a){var s=Math.min(400,Math.max(20,Ae(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Ae(e.preGain,1),c=Math.max(0,Ae(e.crossfade,.012)),d=Ae(e.maxDelaySeconds,void 0),h=n.createGain(),f=n.createGain(),y=n.createGain(),b=n.createGain(),g=null;e.modInput===!0&&(g=n.createGain(),g.channelCount=1,g.channelCountMode="explicit",g.channelInterpretation="discrete"),b.gain.value=0,h.connect(y),y.connect(f),b.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},m=t(s);p.post=function($){p.node?p.node.port.postMessage($):p.disposed||(r.length>=zl&&(r=a().concat([{t:"tempo",bpm:p.bpm,when:0}])),r.push($))};function w($){var E=r.map(function(x){var T=Object.assign({},x);return T.when>$||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return r=[],E}p.emit=function($){for(var E=0;E<p.listeners.length;E++)try{p.listeners[E]($)}catch(x){typeof console<"u"&&console.error(x)}},p.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;p.tooFar=function($){return typeof $=="number"&&$>n.currentTime+_l?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-n.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Il(n,e.moduleUrl).then(function(){if(!p.disposed){var $=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:u,maxDelaySeconds:d},m);$.pending=w(n.currentTime),p.node=new AudioWorkletNode(n,Pl,{numberOfInputs:g?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),h.connect(p.node),g&&g.connect(p.node,0,1),p.node.connect(b);var E=n.currentTime;E<=0||c===0?(y.gain.value=0,b.gain.value=1):(y.gain.setValueAtTime(1,E),y.gain.linearRampToValueAtTime(0,E+c),b.gain.setValueAtTime(0,E),b.gain.linearRampToValueAtTime(1,E+c)),p.status="ready"}},function($){p.status="unavailable",r=[],p.error=$});return p.core={input:h,output:f,modInput:g,ready:S,get status(){return p.status},get error(){return p.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*n.sampleRate)):0,limiter:o,setTempo:function($,E){var x=Ae($,NaN);!(x>0)||p.disposed||p.tooFar(E)||(p.bpm=Math.min(400,Math.max(20,x)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(E)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function($){var E=$&&typeof $=="object"?$:{at:$};if(!(p.disposed||p.tooFar(E.at))){var x=Ae(E.fadeMs,0);p.post({t:"clear",when:p.whenOf(E.at),fadeMs:x>0?Math.min(1e3,x):0})}},onChange:function($){return p.listeners.push($),function(){var E=p.listeners.indexOf($);E>=0&&p.listeners.splice(E,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,y,b,f,g].forEach(function($){try{$&&$.disconnect()}catch{}})}}},p}function Ol(n,e){var t=e||{};if(t.slots)return jl(n,t);var a=Qt(t.state),s=Array.from(jt(a)),r=Oi(n,t,function(){return{program:s}},function(){return[{t:"load",program:Array.from(jt(a)),when:0}]}),o=r.core;function l(u){return a.chain[xt.indexOf(u)]}return o.setParam=function(u,c,d,h){var f=ft(u);if(!(!f||r.disposed||r.tooFar(h))){var y=l(f),b;if(c==="bypass")b=!!d;else{var g=Ri(f,c);if(!g)return;b=pe(g,d,je(g,y.dials))}return c==="bypass"?y.bypass=b:y.dials[c]=b,r.post({t:"p",i:Zt[f][c],v:en(f,c,b),when:r.whenOf(h)}),r.emit({effect:f,key:c,value:b}),St(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===c}))){var m=y.dials[p.key],w=pe(p,m,je(p,y.dials));w!==m&&(y.dials[p.key]=w,r.post({t:"p",i:Zt[f][p.key],v:en(f,p.key,w),when:r.whenOf(h)}),r.emit({effect:f,key:p.key,value:w}))}}),b}},o.getParam=function(u,c){var d=ft(u);if(d){var h=l(d);return c==="bypass"?h.bypass:h.dials[c]}},o.getState=function(){return yl(a)},o.setState=function(u,c){r.disposed||r.tooFar(c&&c.at)||(a=Qt(u),r.post({t:"load",program:Array.from(jt(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},o}function jl(n,e){var t=e.slots===!0?gt:Math.max(1,Math.min(Rl,Math.floor(+e.slots)||gt)),a=dt(e.state,t),s=1,r={};function o(p){return r[p.id]||(r[p.id]=s++),r[p.id]}function l(p){return p.map(function(m){return{uid:o(m),type:m.type,program:Te(m)}})}var u=l(a.chain),c=a.chain.map(function(p){return r[p.id]}),d=Oi(n,e,function(){return{slots:t,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return r[p.id]}),when:0}]}),h=d.core;function f(p){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===p)return a.chain[m];var w=wn(p);if(w){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===w)return a.chain[m]}return null}function y(p,m){var w=o(p);d.post({t:"add",uid:w,type:p.type,when:m}),Te(p).forEach(function(v){d.post({t:"ps",uid:w,k:v[0],v:v[1],when:m,snap:!0})})}function b(p){d.post({t:"order",uids:a.chain.map(function(m){return r[m.id]}),when:p})}function g(p,m){var w={};a.chain.forEach(function($){w[$.id]=$});var v=a.chain.map(function($){return r[$.id]}).join();p.chain.forEach(function($){var E=w[$.id];if(!E||E.type!==$.type){delete r[$.id],y($,m);return}var x={};Te(E).forEach(function(T){x[T[0]]=T[1]}),Te($).forEach(function(T){x[T[0]]!==T[1]&&d.post({t:"ps",uid:r[$.id],k:T[0],v:T[1],when:m})})});var S={};p.chain.forEach(function($){S[$.id]=!0}),Object.keys(r).forEach(function($){S[$]||delete r[$]}),a=p,a.chain.map(function($){return r[$.id]}).join()!==v&&b(m)}return h.slots=t,h.setParam=function(p,m,w,v){var S=f(p);if(!(!S||d.disposed||d.tooFar(v))){var $=se(S.type),E,x=null;if(m==="bypass")E=!!w;else{for(var T=0;T<$.dials.length;T++)$.dials[T].key===m&&(x=$.dials[T]);if(!x)return;E=pe(x,w,je(x,S.dials))}var C={},B={};Te(S).forEach(function(P){C[P[0]]=P[1]}),$.dials.forEach(function(P){P.stepWhen&&(B[P.key]=S.dials[P.key])}),m==="bypass"?S.bypass=E:S.dials[m]=E,$.dials.forEach(function(P){P.stepWhen&&(S.dials[P.key]=pe(P,S.dials[P.key],je(P,S.dials)))});var U=d.whenOf(v),re=r[S.id];return Te(S).forEach(function(P){(C[P[0]]!==P[1]||x&&P[0]===x.k)&&d.post({t:"ps",uid:re,k:P[0],v:P[1],when:U})}),d.emit({effect:S.id,key:m,value:E}),Object.keys(B).forEach(function(P){P!==m&&S.dials[P]!==B[P]&&d.emit({effect:S.id,key:P,value:S.dials[P]})}),E}},h.getParam=function(p,m){var w=f(p);if(w)return m==="bypass"?w.bypass:w.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,m){d.disposed||d.tooFar(m&&m.at)||(g(dt(p,t),d.whenOf(m&&m.at)),d.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var w=m||{},v=Ii(p,a.chain);if(!(!v||a.chain.length>=t||d.disposed||d.tooFar(w.at))){if(w.dials){var S=dt({v:2,chain:[{id:v.id,type:v.type,dials:w.dials}]},1).chain[0];v.dials=S.dials}w.bypass===!0&&(v.bypass=!0);var $=a.chain.slice(),E=typeof w.index=="number"?Math.max(0,Math.min($.length,w.index)):$.length;return $.splice(E,0,v),g({v:2,chain:$},d.whenOf(w.at)),d.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,m){var w=f(p),v=m&&m.at;return!w||d.disposed||d.tooFar(v)?!1:(g({v:2,chain:a.chain.filter(function(S){return S!==w})},d.whenOf(v)),d.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,w){var v=f(p),S=w&&w.at;if(!v||d.disposed||d.tooFar(S))return!1;var $=El(a.chain,a.chain.indexOf(v),m);return $===a.chain?!1:(g({v:2,chain:$},d.whenOf(S)),d.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:Sl(p),bypass:p.bypass}})},h.toAstrid=function(){return Nl(a)},h}const Bl="/rhythm/assets/worklet-CnpUVY5i.js",Et="petra-rhythm.state",vn=1,ji=400,Fl=2e3;function Dl(n){return JSON.stringify({v:vn,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function Hl(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:a,tracks:s}=e;return Oe({...n,swing:t,fx:a,tracks:s}).ok}function Bi(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==vn)return null;const t=Oe(e.doc);if(!t.ok||!t.document)return null;const a=t.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==ne||!s.slots.every(c=>c===null||Hl(a,c)))return null;const r=s.slots,o=Number.isInteger(s.active)&&r[s.active]?s.active:null,l=e.selectedTrack,u=Number.isInteger(l)&&l>=0&&l<a.tracks.length?l:0;return{doc:a,bank:{slots:r,active:o},selectedTrack:u}}function ql(n,e,t=ji,a=Et){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const u=Dl(e());if(u===o)return;n.setItem(a,u),o=u}catch{}};return{schedule(){const u=Date.now();r||(r=u),clearTimeout(s),s=setTimeout(l,Math.min(t,Math.max(0,r+Fl-u)))},flush:l}}function Ul(n,e,t=Et){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=n.getItem(t)}catch{return null}if(!a||Bi(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(s.v!==vn||Oe(s.doc).errors[0]===rt||Array.isArray(s.bank?.slots)&&s.bank.slots.some(o=>o!==null&&typeof o=="object"&&Oe({...s?.doc,...o}).errors[0]===rt))?`Couldn't open your last session: ${rt}`:"Couldn't open your last session: it is malformed"}function Gl(n,e,t=Et){if(new URLSearchParams(e).has("fresh"))return null;try{return Bi(n.getItem(t))}catch{return null}}const Bt={maker:"PETRA",instrument:"RHYTHM",number:"01"},Wl="PETRA Rhythm";let xa=!1;function Kl(){return`
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
`}function Vl(n){const e=n.ownerDocument;if(!xa){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Kl(),e.head.append(c),xa=!0}const t=e.createElement("header");t.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},r=e.createElement("span");r.className="petra-head-num",r.textContent=Bt.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=Bt.maker,a.append(o," ",s(),` ${Bt.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const u=e.createElement("div");return u.className="petra-head-title",u.append(a,l),t.append(u),n.before(t),t}function Yl(n,e){const t=n.ownerDocument,a=t.createElement("details");a.className="petra-menu";const s=t.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=t.createElement("div");r.className="petra-menu-body";const o=t.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const d=o.files?.[0];o.value="",d&&e.load(await d.text(),d.name)});const l=(d,h)=>{const f=t.createElement("button");return f.type="button",f.textContent=d,f.dataset.petraMenu=d.toLowerCase(),f.addEventListener("click",()=>{h(),u||(a.open=!1)}),f};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),n.append(a);let u=null;const c=()=>{const d=getComputedStyle(s).display==="none";d!==u&&(a.open=d),u=d};return window.addEventListener("resize",c),c(),a}const Fi={on:!1,accent:!1,velocity:.8},K=n=>({...n??Fi});function J(n){return Math.max(1,Math.min(n.length,n.steps.length))}function Ft(n,e){const t=J(n),a=n.steps.map(K);for(let s=0;s<t;s++)a[((s+e)%t+t)%t]=K(n.steps[s]);return{...n,steps:a}}function Xl(n){const e=J(n),t=n.steps.map(K);for(let a=0;a<e;a++)t[e-1-a]=K(n.steps[a]);return{...n,steps:t}}function Sa(n,e){const t=J(n),a=[];for(let o=0;o<t;o++)n.steps[o]?.on&&a.push(o);if(a.length<2)return{...n,steps:n.steps.map(K)};const s=a.map(o=>n.steps[o]),r=n.steps.map(K);return a.forEach((o,l)=>{const u=s[((l-e)%a.length+a.length)%a.length];r[o]={on:!0,accent:u.accent,velocity:u.velocity,...u.probability!==void 0?{probability:u.probability}:{}}}),{...n,steps:r}}function Jl(n,e){const t=n.map(s=>({...s,steps:s.steps.map(K)})),a=Math.max(0,...n.map(J));for(let s=0;s<a;s++){const r=n.flatMap((l,u)=>s<J(l)?[u]:[]);if(r.length<2)continue;const o=r.map(l=>K(n[l]?.steps[s]));for(let l=o.length-1;l>0;l--){const u=Math.floor(e()*(l+1));[o[l],o[u]]=[o[u],o[l]]}r.forEach((l,u)=>{const c=t[l];c&&(c.steps[s]=o[u])})}return t}function Ql(n,e){const t=J(n),a=n.steps.map(K),s=e()<.5?1:2;for(let r=0;r<s;r++){const o=[],l=[];for(let c=0;c<t;c++)(a[c]?.on?o:l).push(c);if(!l.length)break;const u=o.flatMap(c=>[-1,1].map(d=>[c,(c+d+t)%t]).filter(([,d])=>!a[d]?.on));if(u.length&&e()<.7){const[c,d]=u[Math.floor(e()*u.length)];a[d]=K(a[c]),a[c]=K(Fi)}else{const c=l[Math.floor(e()*l.length)];a[c]={on:!0,accent:!1,velocity:.55}}}return{...n,steps:a}}function Zl(n,e){const t=s=>s.steps.slice(0,J(s)).filter(r=>r.on).length,a=e.some(s=>t(s)>0);switch(n){case"shift-left":case"shift-right":case"shift-random":case"reverse":return e.some(s=>t(s)>0&&t(s)<J(s));case"groove-left":case"groove-right":return e.some(s=>{const r=s.steps.slice(0,J(s)).filter(o=>o.on);return r.length>1&&r.some(o=>o.accent!==r[0]?.accent||o.velocity!==r[0]?.velocity)});case"shuffle":return e.length>1&&a;case"mutate":return e.length>0}}function ec(n,e,t){switch(n){case"shift-left":return e.map(a=>Ft(a,-1));case"shift-right":return e.map(a=>Ft(a,1));case"shift-random":{const a=Math.min(...e.map(J)),s=a>1?1+Math.floor(t()*(a-1)):0;return e.map(r=>Ft(r,s))}case"reverse":return e.map(Xl);case"groove-left":return e.map(a=>Sa(a,-1));case"groove-right":return e.map(a=>Sa(a,1));case"shuffle":return Jl(e,t);case"mutate":return e.map(a=>Ql(a,t))}}class tc{doc=ei();bank=Ua();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=zs(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Ps(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=_s(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=qn(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.recallGlideSeconds){const a=qn(this.bank,e,this.doc,t);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=Zs(this.doc,e);this.sparkleUndo=t,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Xs(this.doc,e,t),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},t=structuredClone(this.doc);for(const a of t.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=t,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}moveTracks(e,t,a=Math.random){const s=e.filter(c=>this.doc.tracks[c]);if(!s.length)return!1;const r=s.map(c=>this.doc.tracks[c]),o=ec(t,r,a);if(JSON.stringify(o)===JSON.stringify(r))return!1;const l={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},u=structuredClone(this.doc);return s.forEach((c,d)=>{const h=o[d];h&&(u.tracks[c]=structuredClone(h))}),this.doc=u,this.writeActive(),this.sparkleUndo=l,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=t,t===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let Ea=!1;function nc(){return`
#app .nc-morph-field { display: none; }
`}function ac(n=document){if(Ea)return;const e=n.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=nc(),n.head.append(e),Ea=!0}function ic(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,a=e?.performanceTime;if(t===void 0||a===void 0||!(t>0)||!(a>0))return null;const s=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function Ta(n,e){const t=n.getOutputTimestamp?.(),a=t?.contextTime,s=t?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const sc=1400;function Dt(n,e,t,a=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function rc(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class oc{constructor(e){this.repaint=e}text="";timer=0;say(e,t=sc){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},t))}}const lc=50;function cc(n,e,t,a=lc){if(t)return 0;const s=n-e;return s>=a?0:a-s}class dc{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const a=Ko({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Aa(n,e){const t=new AudioContext(e);let a="loading";const s=(async()=>{t.state==="running"&&await t.suspend();for(const r of n)await t.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:t,ready:s,get status(){return a},async start(){return a==="loaded"&&ge(t),await s,t.state!=="running"&&await t.resume(),t.state}}}function ge(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const uc=5e3;function pc(){return typeof navigator<"u"&&"userAgentData"in navigator}function hc(n,e,t,a={}){const s=a.restartsOnWorkletReady??pc(),r=a.preloadTimeoutMs??uc;let o=null,l=!1,u=null,c=null;async function d(){const g=new AudioContext(e);ge(g);try{for(const p of n)await g.audioWorklet.addModule(p);return g}catch(p){throw g.close().catch(()=>{}),p}}function h(g,p=!1){l=!0,o=null,g.context.close().catch(()=>{}),p?t?.(new Error(`audio preload still loading after ${r} ms`)):g.ready.catch(m=>t?.(m))}async function f(g){const{context:p}=g;t?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),ge(p);const m=(async()=>{for(const w of n)await p.audioWorklet.addModule(w)})();try{return await Promise.race([g.ready.then(()=>{},()=>m),m]),p}catch(w){throw l=!0,o===g&&(o=null),p.close().catch(()=>{}),w}}function y(g){let p;const m=new Promise(w=>{p=setTimeout(()=>w("timeout"),r)});return Promise.race([g.ready.then(()=>"ready"),m]).finally(()=>clearTimeout(p))}async function b(){if(!l){o??=Aa(n,e);const g=o;if(g.status==="failed")h(g);else{const p=g.status==="loaded"||!s;if(p&&ge(g.context),g.status==="loading"){let m;try{m=await y(g)}catch{return h(g),d()}if(m==="timeout")return s?(h(g,!0),d()):f(g)}return g.context.state==="closed"?(o===g&&(o=null),b()):(p||ge(g.context),g.context)}}return d()}return{preload(){o||u||c||l||(o=Aa(n,e))},load(){return u&&u.state!=="closed"?(ge(u),Promise.resolve(u)):c?(o&&(o.status==="loaded"||!s)&&ge(o.context),c):(c=b().then(g=>(u=g,o=null,g)).finally(()=>{c=null}),c)}}}const Ma="/rhythm/assets/processor-BFa39uiw.js",mc="instance",fc=99;function Tt(n=typeof location>"u"?"":location.search){const e=new URLSearchParams(n).get(mc)?.trim()??"";if(!/^\d+$/.test(e))return 1;const t=Number(e);return t>=2&&t<=fc?t:1}function Di(n,e){return e===1?n:`${n}#${e}`}function gc(n,e){return e===1?n:`${n} ${e}`}let Me;function bc(n,e=Tt()){if(Me!==void 0)return Me;Me=null;try{if(typeof window>"u"||window.parent===window)return Me;const t=window.parent.ncStudio;t&&t.version===1&&(Me=t.attach(n,{instance:e}))}catch{}return Me}function yc(){let n;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(n=a.syncScope)}}catch{}if(!n)return{};const e=`/studio/${n}`,t=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:t?{request:(a,s,r)=>t.request(`${a}${e}`,s,r)}:null}}function wc(){try{if(typeof window>"u"||window.parent===window)return null;const n=window.parent.ncStudio;return n&&n.version===1&&typeof n.fxWorklet=="string"&&n.fxWorklet?n.fxWorklet:null}catch{return null}}function bt(){try{if(typeof window>"u"||window.parent===window)return null;const n=window.parent.ncStudio;return n?.version===1&&n.play?n.play:null}catch{return null}}function tn(n,e=Tt()){return e>1?`${n}#${e}`:n}function vc(n,e=Tt()){const t=bt()?.owner()??null;return t===null||t==="studio"||t===tn(n,e)}function kc(n,e){let t=null;const a=()=>(t??=(async()=>{for(const s of e)await n.audioWorklet.addModule(s);return n})(),t.catch(()=>{t=null}),t);return{preload(){a().catch(()=>{})},load:a}}const Hi=new URLSearchParams(location.search),G=Hi.has("measure"),we=Tt(),kn=gc(Wl,we),$c=Di("petra-rhythm.linkslots",we),xc=vr($c),Sc=!(G&&Hi.get("clockStepFix")==="0");let nn=0;const Ec=.05;G&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const ve=[40,240],k=new tc,$n=Di(Et,we),Ge=G?null:Gl(localStorage,location.search,$n),La=G||Ge?null:Ul(localStorage,location.search,$n);Ge&&(k.doc=Ge.doc,k.bank=Ge.bank,k.selectTrack(Ge.selectedTrack));const xn=G?null:ql(localStorage,()=>({doc:k.doc,bank:k.bank,selectedTrack:k.selectedTrack}),ji,$n);if(G){for(const e of k.doc.tracks)e.solo=e.voice==="kick";const n=k.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=Ec)}const _=new bs({bpm:k.doc.bpm,minBpm:ve[0],maxBpm:ve[1],timebase:"shared"}),Sn=document.querySelector("#app");if(!(Sn instanceof HTMLElement))throw new Error("Missing #app");const Tc=Vl(Sn);ac();const he=new dc(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let M=null;G&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>Xi(),window.__clockStep=n=>{nn=n},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:be?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let Q=null,ee=null,be=null,yt=0,qi=0;function Ac(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const O=new Ls({...yc(),app:kn,version:"0.1.0",clock:_,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:ve},audio:Ac,outputLatencyMs:()=>be?.outputLatencyMs??null,swing:()=>k.liveSwing});let Pe="",Ui=0,Gi=!1,Ca=Number.NEGATIVE_INFINITY,Le=null;const j=new mn;let X=!1;function H(n=F()){return!X&&_.transport.isPlayingAt(n)}function Xe(n){if(!O.isLeader)return;const e=cc(performance.now(),Ca,n);if(e>0){Le===null&&(Le=setTimeout(()=>{Le=null,Xe(!0)},e));return}Le!==null&&(clearTimeout(Le),Le=null),O.publishState()&&(Ca=performance.now())}function Na(){const n=Gi?Js(k.doc).tracks:k.doc.tracks;return X?n.map(e=>({...e,mute:!0})):n}function Je(){if(!be)return null;const n=Math.round(be.offset*1e4)/1e4;return{offset:n,shifted:fs(_.toSnapshot(),n,"audio")}}const En=new gr(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function an(n=!1){const e=Je();e&&En.set(e,n)}const Mc={mode:"lp",cutoff:1,resonance:0,drive:0};function sn(n){const e=Ve(n),t=or(n);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:!e.filter||n.mode==="lp"&&n.cutoff>=.999,dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let rn=null;function Lc(){if(!ee)return;const n=sn(k.doc.fx),e=rn;if(rn=n,!e||e.chain.some((t,a)=>t.type!==n.chain[a]?.type)){ee.setState(n);return}n.chain.forEach((t,a)=>{const s=e.chain[a];if(s){s.bypass!==t.bypass&&ee?.setParam(t.id,"bypass",t.bypass);for(const[r,o]of Object.entries(t.dials))s.dials[r]!==o&&ee?.setParam(t.id,r,o)}})}function Wi(n,e,t,a){return{clock:n,measure:G,swing:k.followSwing??e.swing,fx:Mc,...a===void 0?{}:{glideSeconds:a},tracks:t.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let te=null;function N(n="state"){const e=n==="state"?Je():En.current??Je();if(!Q||!e)return;Ic(),n!=="state"&&(Pe="");const{offset:t,shifted:a}=e,s=te;s!==null&&(te=null,Pe="");const r=k.consumeGlide(),o=JSON.stringify({seen:j.lastTaken,offset:t,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:k.liveSwing,glide:r??null,tracks:Na(),fx:k.doc.fx});if(Lc(),o===Pe)return;Pe=o;const l={...Wi(a,k.doc,Na(),r),seen:j.lastTaken,...s===null?{}:{enterBeat:s}};Ui=t,Q.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const me=bc("petra-rhythm",we),Tn=me?kc(me.ctx,[Ma]):hc([Ma],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function At(){const n=Tn.load();if(M)return;const e=await n;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,G){const a=M,s=a.getOutputTimestamp.bind(a);a.getOutputTimestamp=()=>{const r=s(),o=!nn||!r.contextTime?r:{contextTime:r.contextTime+nn/1e3,performanceTime:r.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),o.contextTime??0,o.performanceTime??0]),o}}M.addEventListener("statechange",()=>{L(),xe()}),be=me?.mapper??new Ms(M,Sc?{}:{stepThresholdMs:0}),be.onStep(a=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:a.stepSeconds*1e3,confirmedAt:a.confirmedAt,reanchors:a.reanchors,revert:a.revert===!0}),an(!0)}),be.start(),Q=new AudioWorkletNode(M,"rhythm"),Q.port.onmessage=a=>{if(a.data.switched!==void 0&&Oc(a.data.switched),a.data.level!==void 0&&a.data.step!==void 0&&(qi=a.data.level,yt!==a.data.step&&(yt=a.data.step,L())),!(!G||!M)){for(const s of a.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-Ui});for(const s of a.data.onsets??[]){const r=Ta(M,s.contextTime);r&&window.__onsets?.push({app:kn,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-s.contextTime)*1e3,...r})}for(const s of a.data.render??[]){const r=Ta(M,s.contextTime);r&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:r.playedMs})}}},ee=Ol(M,{moduleUrl:wc()??Bl,slots:3,state:sn(k.doc.fx)}),rn=sn(k.doc.fx),Q.connect(ee.input),window.__hacks=()=>({state:ee?.getState(),status:ee?.status}),ee.output.connect(me?.output??M.destination);let t=!1;En.subscribe(()=>N(t?"clock":"attach")),_.subscribe(a=>an(a.kind==="snapshot"&&a.replay===!0)),t=!0}const ye=new fr;let An=!1,ut=null,Re=null;function Mt(){return!M||M.state!=="running"}function Cc(){return Re=ye.mode(Mt(),H()),Re}function Mn(){return ut??=(async()=>{try{te=Number.POSITIVE_INFINITY,M&&N(),await At(),M&&M.state!=="running"&&await M.resume();const n=_.transport;te=ye.enter(n.beatAt(F()),n.bpm),on&&(on=!1,te=Math.floor(n.beatAt(F())/4)*4);const e=te;An=!0,Cn(),N(),G&&(window.__join={...ye.toJSON(),tapBeat:Ki,sentBeat:e})}catch(n){throw ye.cancel(),te=Number.NEGATIVE_INFINITY,N(),n}})().finally(()=>{ut=null,L(),xe()}),ut}let Ki=Number.NaN,on=!1;function Vi(n){const e=n instanceof KeyboardEvent&&n.repeat;ye.gesture(Mt(),H(),e)&&(Ki=_.transport.beatAt(F()),Mn().catch(Yi))}document.addEventListener("pointerdown",Vi,{capture:!0});document.addEventListener("keydown",Vi,{capture:!0});document.addEventListener("pointerup",()=>{ye.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function Yi(n){console.warn("[rhythm] audio couldn't start",n),ie.say("Audio couldn't start. Press Play to try again."),L()}function Ln(){Nc().catch(Yi)}async function Nc(){if(ye.swallowClick(Mt(),H())){await Mn();return}await Xi()}let He=null;function xe(){if(He!==null&&(clearTimeout(He),He=null),!Mt())return;ot(!0,H())!==Re&&L();const n=F(),{startTime:e,stopTime:t}=_.transport,a=[e,t].filter(r=>r!==null&&r>n);if(a.length===0)return;const s=Math.min((Math.min(...a)-n)*1e3+1,2**31-1);He=setTimeout(()=>{He=null,xe()},s)}const Pc=1500;function _c(n){let e,t;const a=new Promise(o=>{e=setTimeout(()=>o(!1),Pc)}),s=new Promise(o=>{t=()=>{n.state==="running"&&o(!0)},n.addEventListener("statechange",t)}),r=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Ht=!1;function zc(){M?M.state!=="running"&&M.resume().catch(()=>{}):Tn.load().catch(()=>{})}async function Xi(){if(Ht){zc();return}Ht=!0;try{if(await At(),!M)return;if(M.state!=="running"&&!await _c(M)&&!H()){ie.say("Tap Play to start audio"),L();return}}finally{Ht=!1}if(me&&_.transport.isPlayingAt(F())){if(!X&&bt()?.owner()===tn("petra-rhythm",we)){_.stop({at:F()});return}X?(X=!1,te=Math.ceil(_.transport.beatAt(F())/4-1e-9)*4):X=!0,k.playing=H(),Pe="",N(),L();return}if(H()){_.stop({at:F()});return}me&&bt()?.claim(tn("petra-rhythm",we)),_.play({at:F()}),!O.isLeader&&[...O.peers.values()].some(n=>n.leader)&&(An=!0,Cn(),L())}const ie=new oc(()=>L()),Rc=6e3;La&&ie.say(La,Rc);function ke(){return An&&!O.isLeader}function Cn(){!ke()||!k.adoptSwing(O.swing)||(N(),L())}function Ji(n,e,t){const a=k.peek(n),s=Je();if(!a||!Q||!s)return!1;const r=_.transport.beatAt(F()),o=j.recall(n,r,{glide:e},t===void 0?{}:{atBeat:t});return ts(o,a,s.shifted),!0}let Qi="";function Zi(n){return ke()?k.followSwing??n.swing:n.swing}function es(n,e){return JSON.stringify([n,Zi(e),e.fx,e.tracks])}function ts(n,e,t){if(!Q)return;Qi=es(n.id,e);const a={...Wi(t,e,e.tracks,n.payload.glide),swing:Zi(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};Q.port.postMessage({type:"state",state:a})}function Ic(){const n=j.pending;if(!n||!Q)return;const e=k.peek(n.slot);if(!e){j.cancel();return}if(es(n.id,e)===Qi)return;const t=Je();t&&ts(n,e,t.shifted)}function Nn(n,e){const t=k.liveSwing;return k.recall(n,e)?(ke()||(k.followSwing=null),k.liveSwing!==t&&Xe(!0),!0):!1}function Oc(n){const e=j.takeHeld(n);e&&(Nn(e.slot,e.payload.glide),k.consumeGlide(),N(),L())}function ns(n){if(j.cancel(),!Nn(n,k.recallGlideSeconds))return;const e=k.recallGlideSeconds>0?k.recallGlideSeconds:0;O.sendSnapshot("recall",n,{atBeat:_.transport.beatAt(F()),...e>0?{glide:{seconds:e}}:{}})}function jc(n){if(j.tap(n,H()).kind==="queue"){const t=k.recallGlideSeconds>0?k.recallGlideSeconds:0;if(Ji(n,t,ai(_.transport.beatAt(F())))){const a=j.pending?.atBeat;O.sendSnapshot("recall",n,{...a===void 0?{}:{atBeat:a},...t>0?{glide:{seconds:t}}:{}});return}}ns(n)}function Ie(n,e){const t=qa[n]??"";if(e==="store")k.store(n),ie.say(Dt(e,t,!0));else if(e==="clear"){const a=k.bank.slots[n]!=null;if(j.queued===n){const s=j.drop();j.cancel();const r=k.bank.active;s&&r!=null&&O.sendSnapshot("recall",r,{atBeat:s.atBeat})}k.clear(n),ie.say(Dt(e,t,a)),a&&he.show($e,`Slot ${t} cleared`)}else k.bank.slots[n]==null?ie.say(Dt(e,t,!1,matchMedia("(pointer: coarse)").matches)):jc(n);N(),L()}function $e(){k.undoSurprise()&&(he.dismiss(),N(),L())}function Bc(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),$e();return}if(n.code==="Space"){n.preventDefault(),n.repeat||Ln();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const a=t===0?9:t-1;a<0||a>=ne||(n.preventDefault(),n.shiftKey?Ie(a,"store"):n.altKey?Ie(a,"clear"):Ie(a,"recall"))}const Fc=new br({min:ve[0],max:ve[1]});function ln(n){k.doc.bpm=n,_.setTempo({bpm:n}),N(),L()}function Dc(){return ke()?"Leader's swing · Save stores it":"Own swing · join to follow"}function as(){const n=H(),e=Cc(),t=ke();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:ie.text,controls:[{type:"button",id:"play",label:ni(e),on:e==="stop",...e==="join"?{ariaLabel:ti}:{},onPress:()=>Ln(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{k.surprise(),N(),L(),he.show($e)}},{type:"slider",id:"bpm",label:"Tempo",min:ve[0],max:ve[1],step:1,value:_.transport.bpm,onChange:ln,onTap:a=>{const s=Fc.tap(a);s!==null&&s!==_.transport.bpm&&ln(s)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:k.liveSwing,valueText:er(k.liveSwing),disabled:t,modulated:t&&k.followSwing!=null,onChange:a=>{ke()||ut||(k.setSwing(a),Xe(!1),N(),L())},onCommit:()=>{Xe(!0)}},...O.isLeader?[]:[{type:"note",id:"swing-note",text:Dc()}],...O.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:O.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:k.morphSeconds,morphText:rc(k.morphSeconds),slots:qa.map((a,s)=>({label:a,filled:k.bank.slots[s]!=null,active:k.bank.active===s,edited:k.edited===s,queued:j.queued===s,pulse:j.queued===s&&n&&yt%4<2})),onMorph:a=>{k.morphSeconds=a,L()},onSlot:(a,s)=>{Ie(a,s)}}]}}function Qe(){const n=k.doc.tracks.length;return n===0?0:Math.min(k.selectedTrack,n-1)}let Ce=[];function wt(){const n=k.doc.tracks,e=n[Qe()]?.id,t=Ce.filter(a=>n.some(s=>s.id===a));return e&&!t.includes(e)&&t.unshift(e),t}function Hc(n,e=!1){const t=k.doc.tracks,a=t[n]?.id;if(!a)return;if(!e){Ce=[],k.selectTrack(n);return}const s=wt();if(s.includes(a)&&s.length>1){if(Ce=s.filter(r=>r!==a),t[Qe()]?.id===a){const r=t.findIndex(o=>o.id===Ce[Ce.length-1]);r>=0&&k.selectTrack(r)}}else Ce=s.includes(a)?s:[...s,a],k.selectTrack(n)}const Pa={stroke:"M13 8H3M7 4 3 8l4 4"},_a={stroke:"M3 8h10M9 4l4 4-4 4"},za=[{id:"shift",label:"Shift",title:"The hits move together. Shift-click track names to move several at once.",moves:[{id:"shift-left",text:"Left",title:"Shift the selected tracks one step left (earlier)",icon:Pa},{id:"shift-right",text:"Right",title:"Shift the selected tracks one step right (later)",icon:_a},{id:"shift-random",text:"Random",title:"Shift the selected tracks a random number of steps (all by the same amount)",icon:{stroke:"M3 3h10v10H3zM6 6h0M8 8h0M10 10h0"}},{id:"reverse",text:"Reverse",title:"Play the selected tracks backwards",icon:{stroke:"M2 5h11M10 2l3 3-3 3M14 11H3M6 8l-3 3 3 3"}}]},{id:"groove",label:"Groove",title:"Accents and velocities move from hit to hit; the hits stay where they are",moves:[{id:"groove-left",text:"Left",title:"Each hit takes the next hit's accent and velocity",icon:Pa},{id:"groove-right",text:"Right",title:"Each hit takes the previous hit's accent and velocity",icon:_a}]},{id:"hits",label:"Hits",title:"Trade hits between the selected tracks, or let them evolve",moves:[{id:"shuffle",text:"Shuffle",title:"Trade hits between the selected tracks, step by step (select two or more)",icon:{stroke:"M2 4.5h2.5l6 7H14M2 11.5h2.5l6-7H14M12 2.5l2 2-2 2M12 9.5l2 2-2 2"}},{id:"mutate",text:"Mutate",title:"Move or add one or two hits on each selected track",icon:{fill:"M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z"}}]}];function qc(){const n=wt(),e=k.doc.tracks.filter(t=>n.includes(t.id));return{type:"moves",id:"moves",label:"Pattern moves",groups:za.map(t=>({...t,moves:t.moves.map(a=>({...a,disabled:!Zl(a.id,e)}))})),onMove:t=>{const a=za.flatMap(l=>l.moves.map(u=>({...u,group:l.label}))).find(l=>l.id===t);if(!a)return;const s=wt(),r=k.doc.tracks.flatMap((l,u)=>s.includes(l.id)?[u]:[]);if(!k.moveTracks(r,a.id))return;N(),L();const o=r.length===1?k.doc.tracks[r[0]??0]?.name??"":`${r.length} tracks`;he.show($e,`${a.group} ${a.text.toLowerCase()}: ${o}`)}}}function is(){const n=k.doc.tracks[Qe()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${k.doc.tracks.length} tracks · ${n.name}`:`${k.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Re==="stop",label:ni(Re??"play"),...Re==="join"?{ariaLabel:ti}:{},onToggle:()=>Ln()},id:"grid",playhead:H()?yt:-1,selectedRow:n?.id,selectedRows:wt(),onSelectRow:(e,t)=>{Hc(e,t),L()},onDice:e=>{const t=k.doc.tracks[e]?.name??"Lane";k.diceLane(e)&&(N(),L(),he.show($e,`New ${t} steps`))},onFill:e=>{Gi=e,N(),L()},onClear:()=>{k.clearSteps()&&(N(),L(),he.show($e,"Pattern cleared"))},onLength:(e,t)=>{k.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(t))))}),N(),L()},onMute:e=>{k.edit(t=>{const a=t.tracks[e];a&&(a.mute=!a.mute)}),N(),L()},onSolo:e=>{k.edit(t=>{const a=t.tracks[e];a&&(a.solo=!a.solo)}),N(),L()},onToggle:(e,t,a)=>{k.edit(s=>{const r=s.tracks[e]?.steps[t];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),N(),L()},onLongPress:(e,t,a)=>{const s=k.doc.tracks[e],r=s?.steps[t];!s||!r||Vo({anchor:a,title:`${s.name} · step ${t+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{k.edit(u=>{const c=u.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),N(),L()}})},onSet:(e,t,a,s)=>{k.edit(r=>{const o=r.tracks[e]?.steps[t];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),N(),L()},rows:k.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))},qc()]},Uc()]}}function Uc(){const n=Qe(),e=k.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(a=>{const s=ir(e?.voice,a);return{type:"slider",id:e?.voice==="shaker"?`shaker-${a}`:a,label:s.label,valueText:s.text(e?.params[a]??0),min:s.min,max:s.max,step:s.step,value:e?.params[a]??0,onChange:r=>{k.edit(o=>{const l=o.tracks[Qe()];l&&(l.params[a]=r)}),N(),L()}}})}}function cn(n,e){k.edit(t=>{const a=Ve(t.fx);e(a[n]),t.fx.hacks=a}),N(),L()}function Gc(n,e){const t=Ve(k.doc.fx)[n].dials[e.key]??e.default,a=`hack-${n}-${e.key}`,s=r=>cn(n,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(t),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:t,valueText:zi(e,t,k.doc.bpm),onChange:s}}const qt=(n,e)=>(se(n)?.dials??[]).filter(t=>!t.key.startsWith("mod_")&&t.more===!0===e).map(t=>Gc(n,t));function Wc(n){return n>=1e3?`${(n/1e3).toFixed(n>=1e4?0:1)} kHz`:`${Math.round(n)} Hz`}function Pn(){const n=k.doc.fx,e=Ve(n),t=n.mode==="lp"&&n.cutoff>=.999,a=r=>{k.edit(r),N(),L()},s=[e.filter&&!t?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:r=>a(o=>{o.fx.hacks={...Ve(o.fx),filter:r}}),controls:[{type:"select",id:"mode",label:"Mode",value:n.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(o=>{(r==="lp"||r==="hp"||r==="bp")&&(o.fx.mode=r)})},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:n.cutoff,valueText:t?"open":Wc(Xa(n.cutoff)),onChange:r=>a(o=>{o.fx.cutoff=r})},...n.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:n.resonance,valueText:ze(n.resonance),onChange:r=>a(o=>{o.fx.resonance=r})}],{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:n.mode,cutoff:n.cutoff,resonance:n.mode==="lp"?0:n.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:r=>cn("drive",o=>{o.on=r}),controls:qt("drive",!1),more:qt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:r=>cn("compressor",o=>{o.on=r}),controls:qt("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:qi}]}}await Pi();const ss=bn(as());await yn();const _n=bn({id:"pattern",title:"Pattern",lead:!0}),zn=bn({id:"filter",title:Pn().title}),rs={build:()=>_n.update(is())},os={build:()=>zn.update(Pn())};let vt=null;function L(){k.takeSurpriseEdit()&&he.dismiss(),ss.update(as()),vt?.ready(rs)&&_n.update(is()),vt?.ready(os)&&zn.update(Pn()),xn?.schedule()}window.addEventListener("pagehide",()=>xn?.flush());function Ra(n,e,t){j.cancel(),k.replace(n,e),N(),L(),xn?.schedule(),he.show($e,t)}Yl(Tc,{save:()=>{const n=k.doc.name||"rhythm",e=URL.createObjectURL(new Blob([sr(k.doc,k.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),ie.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=rr(n);if(!t.ok||!t.document||!t.bank){ie.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}Ra(t.document,t.bank,`Loaded ${e}`)},create:()=>Ra(pr(),Ua(),"New pattern"),panic:()=>Q?.port.postMessage({type:"panic"})});let Ia=_.transport.running;_.onChange(()=>{if(_.transport.running||(X=!1),_.transport.running&&!Ia&&me&&(X=!vc("petra-rhythm",we)),Ia=_.transport.running,k.playing=H(),!k.playing&&j.pending){const n=j.drop();n&&ns(n.slot)}k.doc.bpm=_.transport.bpm,N(),L(),xe()});bt()?.onAll(()=>{X&&(X=!1,_.transport.isPlayingAt(F())&&(te=Math.ceil(_.transport.beatAt(F())/4-1e-9)*4),k.playing=H(),Pe="",N(),L())});O.onSwing(n=>{ke()&&k.adoptSwing(n)&&N(),L()});O.onSnapshot(n=>{if(n.op!=="recall")return;const e=O.peers.get(n.from)?.app;if(!kr(kn,e,xc)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:F()});const t=n.glide?.seconds??0;if(H()&&Ji(n.slot,t,n.atBeat)){L();return}j.cancel(),Nn(n.slot,t),N(),L()});O.onRole(()=>{Cn(),L(),xe()});O.onPeers(()=>{L(),xe()});G&&(window.__rhythm={setKick:n=>{k.edit(e=>{const t=e.tracks.find(a=>a.voice==="kick");t&&t.steps.forEach((a,s)=>{a.on=n.includes(s)})}),N(),L()},store:n=>Ie(n,"store"),tap:n=>Ie(n,"recall"),tempo:n=>ln(n),beat:()=>_.transport.beatAt(F()),timeAt:n=>_.transport.timeAt(n),slots:()=>({active:k.bank.active??null,queued:j.queued}),swing:()=>{const n=k.bank.active;return{live:k.liveSwing,doc:k.doc.swing,slot:n==null?null:k.bank.slots[n]?.swing??null,leader:O.isLeader}},setSwing:n=>{k.setSwing(n),Xe(!0),N(),L()},lateEnter:()=>{on=!0},audio:async()=>(await At(),await M?.resume(),M?.state??"none")});await yn();await O.start();document.addEventListener("keydown",Bc);el(Sn,[ss,_n,zn],"adjacent");await yn();L();vt=nl([rs,os]);xe();vt.done.then(()=>{Tn.preload(),me&&At().then(()=>{H()&&M?.state==="running"&&Mn()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=H();if(n!==k.playing&&(k.playing=n,L()),an(),N(),!G||!M)return;const e=ic(M);e&&window.__stamps?.push(e)},250);
