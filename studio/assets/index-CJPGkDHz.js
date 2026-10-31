(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const ye=1e-9;function Xa(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class Vt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Xa(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+ye&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+ye)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+ye){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-ye;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Vt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+ye)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+ye)return n[i];return n[0]}}const Va=Object.freeze({beatsPerBar:4,beatUnit:4}),Se=1e-9;function Ua(t){return Math.floor(t+Se)}function Zn(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Se)*e;return n&&r<=t+Se?r+e:r}class qa{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Vt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Va}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Se&&(this.stopTime===null||e<this.stopTime-Se)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Se?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Ua(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return Zn(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Xn="nc-clock/snapshot",Vn=1;function Ka(t,e="local"){return{format:Xn,version:Vn,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ja(t,e){const n=Qa(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const K=t=>typeof t=="number"&&Number.isFinite(t),on=t=>t===null||K(t);function Qa(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Xn&&n("format"),(!K(e.version)||Math.floor(e.version)!==Vn)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!K(e.anchor.beat)||!K(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&K(i.beat)&&K(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!K(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!K(e.meter.beatUnit))&&n("meter"),(!on(e.startTime)||!on(e.stopTime)||!K(e.stoppedBeat))&&n("transport times"),e}class ei{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new qa(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ja(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Ka(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const ti="nc-sync/1",ni=1,ai="nc-sync",ii="nc-sync-leader",ri=0,Un=.5,qn=.75;function oi(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Un&&t<=qn?t:null}const kt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Ne=t=>typeof t=="number"&&Number.isFinite(t),Ve=t=>typeof t=="string"&&t.length>0;function si(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ni||!Ve(e.type)||!Ve(e.from)||!Ne(e.term)||!Ne(e.seq)||!Ne(e.sentAt))return null;switch(e.type){case"hello":return Ve(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Ne(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Ne(e.slot)?e:null;case"ping":case"pong":return Ve(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function li(t,e,n,i,r){return{proto:ti,from:e,term:n,seq:i,sentAt:r,...t}}function Re(){return(performance.timeOrigin+performance.now())/1e3}const xt=.003,ci=3,di=.01,sn=500;class ui{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?di:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=xt&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,p=this.preStep;p.length=0;for(let m=0;m<c.length;m++)p.push(c[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,d=e-n;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=xt&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<sn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=xt)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<sn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(ci,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class pi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...kt,...e.capabilities},this.channelOption=e.channel??ai,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Zn(d,1),d);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(qn,Math.max(Un,e)):ri;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=oi(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=si(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...kt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...kt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(ii,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(li(e,this.id,this.term,++this.seq,this.o.now()))}}const hi="modulepreload",mi=function(t){return"/studio/"+t},ln={},fi=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=mi(c),c in ln)return;ln[c]=!0;const p=c.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":hi,p||(f.as="script"),f.crossOrigin="",f.href=c,d&&f.setAttribute("nonce",d),document.head.appendChild(f),p)return new Promise((y,g)=>{f.addEventListener("load",y),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var gi=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],zt=[.25,.5,.75,1,1.5,2],bi=4.9,B={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},le={fmt:"wet"},X={fmt:"pct"},we={fmt:"db"},Ue={fmt:"signedPct"},St={fmt:"num",suffix:" ms"},O={div:100};function M(t,e,n,i,r,o,s,l){var d={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(l)for(var c in l)d[c]=l[c];return d}function qe(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Fe=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.hpHz,astrid:!0,zero:"off"}),M("q","Resonance",0,100,0,2,{fmt:"q",law:B.hpQ},{dsp:{law:B.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[M("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:B.bpHz,astrid:!0},{dsp:{law:B.bpHz}}),M("q","Q",0,100,0,2,{fmt:"q",law:B.bpQ},{dsp:{law:B.bpQ}}),M("mix","Mix",0,100,100,3,le,{dsp:O,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[M("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:qe(gi),overriddenBy:"beats_free",tempoSynced:!0}),M("feedback","Feedback",0,90,35,2,X,{dsp:O,unit:"%"}),M("mix","Wet/dry",0,100,0,3,le,{dsp:O,unit:"%",astridKey:"wet"}),M("tone","Tone",0,100,100,4,{fmt:"hz",law:B.delayTone,offAt:100},{dsp:{div:99},more:!0}),M("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:qe([[0,"Insert"],[1,"Send"]]),more:!0}),M("send","Send",0,100,100,7,X,{dsp:O,unit:"%",more:!0}),M("mod_send","Accent → send",-100,100,0,8,Ue,{dsp:O,unit:"%",more:!0}),M("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[M("predelay","Pre-delay",0,200,0,1,St,{dsp:{div:1e3},unit:"ms"}),M("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:O,unit:"%"}),M("decay","Decay",0,100,50,3,X,{dsp:O,unit:"%"}),M("damping","Damping",0,100,0,4,X,{dsp:O,unit:"%"}),M("mix","Mix",0,100,0,5,le,{dsp:O,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[M("rate","Rate",0,100,26,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:O,unit:"%"}),M("feedback","Feedback",-90,90,50,3,Ue,{dsp:O,unit:"%"}),M("mix","Mix",0,100,50,4,le,{dsp:O,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[M("rate","Rate",0,100,52,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,50,2,X,{dsp:O,unit:"%"}),M("spread","Spread",0,100,70,3,X,{dsp:O,unit:"%"}),M("mix","Mix",0,100,40,4,le,{dsp:O,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[M("rate","Rate",0,100,39,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:O,unit:"%"}),M("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:qe([[4,"4"],[6,"6"],[8,"8"]])}),M("feedback","Feedback",0,90,30,4,X,{dsp:O,unit:"%"}),M("mix","Mix",0,100,50,5,le,{dsp:O,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[M("low_db","Low",-18,18,0,1,we,{unit:"dB"}),M("mid_db","Mid",-18,18,0,2,we,{unit:"dB"}),M("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:B.midHz,astrid:!0},{dsp:{law:B.midHz}}),M("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:B.eqQ},{dsp:{law:B.eqQ}}),M("high_db","High",-18,18,0,4,we,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[M("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),M("output_db","Output",-12,12,0,2,we,{unit:"dB"}),M("mix","Mix",0,100,100,3,le,{dsp:O,unit:"%"}),M("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:qe([[0,"Smooth"],[1,"Acid"]]),more:!0}),M("tone","Tone",0,100,100,5,{fmt:"hz",law:B.driveTone,offAt:100},{dsp:{div:99},more:!0}),M("mod_drive","Accent → drive",-100,100,0,6,Ue,{dsp:O,unit:"%",more:!0}),M("mod_tone","Accent → tone",-100,100,0,7,Ue,{dsp:O,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[M("threshold_db","Threshold",-60,0,0,1,we,{unit:"dB"}),M("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:B.ratio},{dsp:{law:B.ratio}}),M("attack_ms","Attack",1,100,10,3,St,{unit:"ms"}),M("release_ms","Release",10,1e3,150,4,St,{unit:"ms"}),M("makeup_db","Makeup",0,24,0,5,we,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[M("width","Width",0,200,100,1,X,{dsp:O,unit:"%"}),M("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:O})]}],yi=Fe.map(function(t){return t.type}),wi=Fe.filter(function(t){return!t.hidden}).map(function(t){return t.type}),vi={reverb:"plate"};function Ut(t){var e=vi[t]||t;return yi.indexOf(e)>=0?e:null}function U(t){for(var e=Ut(t),n=0;n<Fe.length;n++)if(Fe[n].type===e)return Fe[n];return null}function xe(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Kn(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=xe(n.law,e);return i===null?0:i}function cn(t,e){return Math.min(bi,t*60/(e>0?e:120))}var dn=function(t){return t>0?"+":t<0?"−":""};function $i(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Jn(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:dn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return dn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=xe(i.law,e),r===null?i.zero||"open":i.astrid?$i(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+xe(i.law,e).toFixed(1);case"ratio":return xe(i.law,e).toFixed(1)+":1";case"rate":return r=xe(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(cn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(cn(e,n)*1e3)+" ms"}return String(e)}var ki=1,ft=["drive","delay","plate"];function xi(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return Jn(t,i,r)},e}var Ae=ft.map(function(t){var e=U(t),n={type:t,label:e.label,dials:e.dials.map(xi)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Si={reverb:"plate"};function rt(t){var e=Si[t]||t;return ft.indexOf(e)>=0?e:null}function gt(t){for(var e=rt(t),n=0;n<Ae.length;n++)if(Ae[n].type===e)return Ae[n];return null}function Qn(t,e){var n=gt(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Ee(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function ie(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function Ai(){return{v:ki,chain:Ae.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Li(t){return zt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},zt[0])}function At(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ei(t){for(var e=Array.isArray(t)?t:At(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=Ai(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(At(l)){var d=rt(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var c=i.chain[ft.indexOf(d)],p=At(l.dials)?l.dials:{};d==="delay"&&p.mix===void 0&&p.wet!==void 0&&(p=Object.assign({},p,{mix:p.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,gt(d).dials.forEach(function(m){c.dials[m.key]=ie(m,p[m.key])}),Mi(d,c.dials,p)}}return{state:i,dropped:o}}function Mi(t,e,n){for(var i=gt(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=ie(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Ee(o,e)))}}function ot(t){return Ei(t).state}function Ti(t){return JSON.parse(JSON.stringify(t))}var Ci=24,Ot={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Bt(t,e,n){if(e==="bypass")return n?0:1;var i=Qn(t,e)||Ii(t,e);return i?Kn(i,n):0}function Ii(t,e){var n=U(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var Ni={};Ae.forEach(function(t){t.dials.forEach(function(e){Ni[t.type+"."+e.key]=e.format})});function Lt(t,e){var n=new Float64Array(Ci),i=ot(t);return i.chain.forEach(function(r){var o=Ot[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Bt(r.type,s,r.dials[s])})}),n}var Ri=2,st=3,zi=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function ze(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ea(t,e){var n=U(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function Oi(t){var e=U(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Bi(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function ji(t){return typeof t=="number"&&isFinite(t)?Li(t):t}function un(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=ji(o)),i[r.key]=ie(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=ie(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],Ee(r,i)))}),i}function Wi(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=xe(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,i=o)}return i}}var Pi={rate:"rate_hz"};function Fi(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Pi[o.key]||o.key;r[o.key]=Wi(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Gi(t,e){var n=e>0?Math.floor(e):st,i=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):ze(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var d=[],c=0;c<o.length;c++){var p=o[c];if(ze(p)&&!(p.type==="limiter"||p.fixed===!0)){var m=Ut(p.type),f=m&&U(m);if(!f||s&&["drive","delay","plate"].indexOf(m)<0){typeof p.type=="string"&&i.push(p.type);continue}if(d.length>=n){i.push(p.id||m);continue}var y;ze(p.params)&&!ze(p.dials)?y=un(f,Fi(f,p.params,r,p.id||m),l):y=un(f,ze(p.dials)?p.dials:{},l);var g=ea(m,d),b=typeof p.id=="string"&&zi.test(p.id)&&!d.some(function(h){return h.id===p.id})?p.id:g.id,u=s?p.bypass!==!1:p.bypass===!0;d.push({id:s?g.id:b,type:m,bypass:u,dials:y})}}return{state:{v:Ri,chain:d},dropped:i,notes:r}}function et(t,e){return Gi(t,e).state}function ve(t){var e=U(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Kn(i,t.dials[i.key])])}),n}function Hi(t){var e=et(t,8),n=[],i=e.chain.map(function(r,o){var s=U(r.type),l={};return o>=st&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var c=r.dials[d.key];if(d.more){c!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&zt.indexOf(c)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=c}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:i,lossy:n}}var Di="nc-fx@1",_i=600,Yi=256,Zi=8,Oe=typeof WeakMap=="function"?new WeakMap:null;function Xi(t,e){var n=Oe&&Oe.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await fi(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Oe&&(Oe.set(t,n),n.catch(function(){Oe.delete(t)})),n)}function $e(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ta(t,e,n,i){var r=Math.min(400,Math.max(20,$e(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",d=$e(e.preGain,1),c=Math.max(0,$e(e.crossfade,.012)),p=$e(e.maxDelaySeconds,void 0),m=t.createGain(),f=t.createGain(),y=t.createGain(),g=t.createGain(),b=null;e.modInput===!0&&(b=t.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),g.gain.value=0,m.connect(y),y.connect(f),g.connect(f);var u={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);u.post=function(v){u.node?u.node.port.postMessage(v):u.disposed||(o.length>=Yi&&(o=i().concat([{t:"tempo",bpm:u.bpm,when:0}])),o.push(v))};function k(v){var x=o.map(function(w){var S=Object.assign({},w);return S.when>v||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return o=[],x}u.emit=function(v){for(var x=0;x<u.listeners.length;x++)try{u.listeners[x](v)}catch(w){typeof console<"u"&&console.error(w)}},u.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var $=!1;u.tooFar=function(v){return typeof v=="number"&&v>t.currentTime+_i?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=Xi(t,e.moduleUrl).then(function(){if(!u.disposed){var v=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:p},h);v.pending=k(t.currentTime),u.node=new AudioWorkletNode(t,Di,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),m.connect(u.node),b&&b.connect(u.node,0,1),u.node.connect(g);var x=t.currentTime;x<=0||c===0?(y.gain.value=0,g.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+c),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+c)),u.status="ready"}},function(v){u.status="unavailable",o=[],u.error=v});return u.core={input:m,output:f,modInput:b,ready:E,get status(){return u.status},get error(){return u.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(v,x){var w=$e(v,NaN);!(w>0)||u.disposed||u.tooFar(x)||(u.bpm=Math.min(400,Math.max(20,w)),u.post({t:"tempo",bpm:u.bpm,when:u.whenOf(x)}),u.emit({effect:null,key:"tempo",value:u.bpm}))},getTempo:function(){return u.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(u.disposed||u.tooFar(x.at))){var w=$e(x.fadeMs,0);u.post({t:"clear",when:u.whenOf(x.at),fadeMs:w>0?Math.min(1e3,w):0})}},onChange:function(v){return u.listeners.push(v),function(){var x=u.listeners.indexOf(v);x>=0&&u.listeners.splice(x,1)}},dispose:function(){if(!u.disposed){if(u.disposed=!0,u.status="disposed",o=[],u.listeners.length=0,u.node){u.node.port.postMessage({t:"dispose"}),u.node.port.close();try{u.node.disconnect()}catch{}}[m,y,g,f,b].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},u}function pn(t,e){var n=e||{};if(n.slots)return Vi(t,n);var i=ot(n.state),r=Array.from(Lt(i)),o=ta(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Lt(i)),when:0}]}),s=o.core;function l(d){return i.chain[ft.indexOf(d)]}return s.setParam=function(d,c,p,m){var f=rt(d);if(!(!f||o.disposed||o.tooFar(m))){var y=l(f),g;if(c==="bypass")g=!!p;else{var b=Qn(f,c);if(!b)return;g=ie(b,p,Ee(b,y.dials))}return c==="bypass"?y.bypass=g:y.dials[c]=g,o.post({t:"p",i:Ot[f][c],v:Bt(f,c,g),when:o.whenOf(m)}),o.emit({effect:f,key:c,value:g}),gt(f).dials.forEach(function(u){if(!(!u.stepWhen||!u.stepWhen.some(function($){return $.key===c}))){var h=y.dials[u.key],k=ie(u,h,Ee(u,y.dials));k!==h&&(y.dials[u.key]=k,o.post({t:"p",i:Ot[f][u.key],v:Bt(f,u.key,k),when:o.whenOf(m)}),o.emit({effect:f,key:u.key,value:k}))}}),g}},s.getParam=function(d,c){var p=rt(d);if(p){var m=l(p);return c==="bypass"?m.bypass:m.dials[c]}},s.getState=function(){return Ti(i)},s.setState=function(d,c){o.disposed||o.tooFar(c&&c.at)||(i=ot(d),o.post({t:"load",program:Array.from(Lt(i)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function Vi(t,e){var n=e.slots===!0?st:Math.max(1,Math.min(Zi,Math.floor(+e.slots)||st)),i=et(e.state,n),r=1,o={};function s(u){return o[u.id]||(o[u.id]=r++),o[u.id]}function l(u){return u.map(function(h){return{uid:s(h),type:h.type,program:ve(h)}})}var d=l(i.chain),c=i.chain.map(function(u){return o[u.id]}),p=ta(t,e,function(){return{slots:n,chain:d,order:c}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(u){return o[u.id]}),when:0}]}),m=p.core;function f(u){var h;for(h=0;h<i.chain.length;h++)if(i.chain[h].id===u)return i.chain[h];var k=Ut(u);if(k){for(h=0;h<i.chain.length;h++)if(i.chain[h].type===k)return i.chain[h]}return null}function y(u,h){var k=s(u);p.post({t:"add",uid:k,type:u.type,when:h}),ve(u).forEach(function($){p.post({t:"ps",uid:k,k:$[0],v:$[1],when:h,snap:!0})})}function g(u){p.post({t:"order",uids:i.chain.map(function(h){return o[h.id]}),when:u})}function b(u,h){var k={};i.chain.forEach(function(v){k[v.id]=v});var $=i.chain.map(function(v){return o[v.id]}).join();u.chain.forEach(function(v){var x=k[v.id];if(!x||x.type!==v.type){delete o[v.id],y(v,h);return}var w={};ve(x).forEach(function(S){w[S[0]]=S[1]}),ve(v).forEach(function(S){w[S[0]]!==S[1]&&p.post({t:"ps",uid:o[v.id],k:S[0],v:S[1],when:h})})});var E={};u.chain.forEach(function(v){E[v.id]=!0}),Object.keys(o).forEach(function(v){E[v]||delete o[v]}),i=u,i.chain.map(function(v){return o[v.id]}).join()!==$&&g(h)}return m.slots=n,m.setParam=function(u,h,k,$){var E=f(u);if(!(!E||p.disposed||p.tooFar($))){var v=U(E.type),x,w=null;if(h==="bypass")x=!!k;else{for(var S=0;S<v.dials.length;S++)v.dials[S].key===h&&(w=v.dials[S]);if(!w)return;x=ie(w,k,Ee(w,E.dials))}var T={},A={};ve(E).forEach(function(L){T[L[0]]=L[1]}),v.dials.forEach(function(L){L.stepWhen&&(A[L.key]=E.dials[L.key])}),h==="bypass"?E.bypass=x:E.dials[h]=x,v.dials.forEach(function(L){L.stepWhen&&(E.dials[L.key]=ie(L,E.dials[L.key],Ee(L,E.dials)))});var N=p.whenOf($),H=o[E.id];return ve(E).forEach(function(L){(T[L[0]]!==L[1]||w&&L[0]===w.k)&&p.post({t:"ps",uid:H,k:L[0],v:L[1],when:N})}),p.emit({effect:E.id,key:h,value:x}),Object.keys(A).forEach(function(L){L!==h&&E.dials[L]!==A[L]&&p.emit({effect:E.id,key:L,value:E.dials[L]})}),x}},m.getParam=function(u,h){var k=f(u);if(k)return h==="bypass"?k.bypass:k.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(i))},m.setState=function(u,h){p.disposed||p.tooFar(h&&h.at)||(b(et(u,n),p.whenOf(h&&h.at)),p.emit({effect:null,key:null,value:null}))},m.addEffect=function(u,h){var k=h||{},$=ea(u,i.chain);if(!(!$||i.chain.length>=n||p.disposed||p.tooFar(k.at))){if(k.dials){var E=et({v:2,chain:[{id:$.id,type:$.type,dials:k.dials}]},1).chain[0];$.dials=E.dials}k.bypass===!0&&($.bypass=!0);var v=i.chain.slice(),x=typeof k.index=="number"?Math.max(0,Math.min(v.length,k.index)):v.length;return v.splice(x,0,$),b({v:2,chain:v},p.whenOf(k.at)),p.emit({effect:$.id,key:"chain",value:"add"}),$.id}},m.removeEffect=function(u,h){var k=f(u),$=h&&h.at;return!k||p.disposed||p.tooFar($)?!1:(b({v:2,chain:i.chain.filter(function(E){return E!==k})},p.whenOf($)),p.emit({effect:k.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(u,h,k){var $=f(u),E=k&&k.at;if(!$||p.disposed||p.tooFar(E))return!1;var v=Bi(i.chain,i.chain.indexOf($),h);return v===i.chain?!1:(b({v:2,chain:v},p.whenOf(E)),p.emit({effect:$.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return i.chain.map(function(u){return{id:u.id,type:u.type,name:Oi(u),bypass:u.bypass}})},m.toAstrid=function(){return Hi(i)},m}function hn(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function na(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,d=l&&l.tempo?l.tempo:l,c=!1;function p(f){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var y=o(l.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function m(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var y=l&&typeof l.bpm=="number"?l.bpm:hn(d,0);y>0&&t.setTempo(y);return}var g=hn(d,f);g>0&&t.setTempo(g);for(var b=d&&(d.points||d.tempoPoints)||[],u=0;u<b.length;u++){var h=b[u];if(h.beat>f&&h.bpm>0){var k=p(h.beat);k!==void 0&&t.setTempo(h.bpm,k)}}}return m(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,p(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&m())})}const jt="/studio/assets/worklet-CnpUVY5i.js";var Ui="nc-ui",aa={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Wt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},de={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},je=t=>`--${Ui}-${t}`,Pt=aa["label-on-fill-dark"],mn=aa["label-on-fill-light"],qi=de["label-min-contrast"],Ki=/^#[0-9a-f]{6}$/i,Ji=t=>typeof t=="string"&&Ki.test(t),tt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function fn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${tt(r(0)*255)}${tt(r(8)*255)}${tt(r(4)*255)}`}function ia(t){let[e,n,i]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/l%6):r===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:s}}function gn(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Ft(t,e){let[n,i]=[gn(t),gn(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var lt=t=>Ft(t,Pt)>=Ft(t,mn)?Pt:mn;function ra(t,e,n,i=qi){let r=fn(t,e,n),o=lt(r)===Pt?1:-1;for(let s=0;s<40&&Ft(r,lt(r))<i;s++)n+=o*.01,r=fn(t,e,n);return r}function Qi(t){let{h:e,s:n}=ia(t),i=ra(e,Math.min(n,de["surprise-on-max-saturation"]),de["surprise-on-lightness"]);return{fill:t,ink:lt(t),on:i,onInk:lt(i)}}var er=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function tr(t,e=Math.random){let[n,i]=de["surprise-saturation"],[r,o]=de["surprise-lightness"],s=de["surprise-min-hue-gap"],l=Ji(t)?ia(t).h:null,d=e()*360;return l!==null&&er(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),ra(d,n+e()*(i-n),r+e()*(o-r))}function nr(t){if(!t)return null;let e=Qi(t);return{[je("surprise-fill")]:e.fill,[je("surprise-ink")]:e.ink,[je("surprise-on")]:e.on,[je("surprise-on-ink")]:e.onInk}}var ar=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,ir=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function bn(t){let[e,n,i]=[1,3,5].map(l=>ar(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function rr([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>tt(ir(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var or=de["velocity-range"],oa={min:Wt.rhythm["velocity-min"],max:Wt.rhythm["velocity-max"]};function sr(t,e=oa){let[n,i]=or,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=Wt.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=bn(e.min),d=bn(e.max);return{velocity:r,t:o,fill:rr(l.map((c,p)=>c+(d[p]-c)*o)),ink:s}}function yn(t,e=oa){return{[je("velocity-fill")]:sr(t,e).fill}}var lr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},cr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","fader-cap-master":"color","strip-hacks-text":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},dr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ur={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},bt={};for(let[t,e]of Object.entries(cr))bt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(ur))bt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(dr))bt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(lr.renames.map(t=>[t.old,t.new]));function sa(t){let e=bt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function G(t){return sa(t).prop}function a(t){return`var(${G(t)})`}function pr(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(G(e)));return Number.isFinite(n)?n:0}function Y(t,e){let n=sa(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function hr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function mr(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var fr="[data-modulated], [data-modulated] *";function gr(){let t=i=>`
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
${fr} { transition: none; }
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
`}var Et=null,br="nc-ui-fallback";function la(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Et&&Et.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${br} {
${gr()}
}
`,t.head.append(e),Et=e}var Be=null,yr=0,wr=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,ca=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=wr,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&ca(document);function vr({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(Be||l?.aborted)return Promise.resolve(!1);let d=o?.ownerDocument??document,c=ca(d),p=o??d.body,m=d.defaultView??globalThis,f=`nc-ui-confirm-${++yr}`,y=(I,_,j)=>{let ge=d.createElement(I);return ge.className=`nc-ui-confirm${_}`,j!=null&&(ge.textContent=j),ge},g=y("div","-layer");g.dataset.state="enter";let b=y("div","");b.setAttribute("role","alertdialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-labelledby",`${f}-t`),b.setAttribute("aria-describedby",`${f}-b`);let u=y("h2","-title",t);u.id=`${f}-t`;let h=y("p","-body",e);h.id=`${f}-b`;let k=y("div","-actions"),$=(I,_)=>{let j=y("button","-btn",I);return j.type="button",j.dataset.ncConfirm=_,j.addEventListener("click",()=>q(_==="ok")),j},E=$(i,"cancel"),v=$(n,"ok");r&&(v.dataset.danger="true"),k.append(E,v),b.append(u,h,k),g.append(b);let x={layer:g};Be=x;let w=s??d.activeElement,S=[];for(let I of p.children)I.hasAttribute("inert")||(I.setAttribute("inert",""),S.push(I));let T=()=>{if(Be!==x)return;p.append(g),E.focus({preventScroll:!0});let I=m.requestAnimationFrame?.bind(m)??(_=>setTimeout(_,16));I(()=>I(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};c?c.then(T):T();let A=!1;g.addEventListener("pointerdown",I=>{A=I.target===g}),g.addEventListener("click",I=>{I.target===g&&A&&q(!1),A=!1});let N=I=>{I.stopImmediatePropagation(),I.key==="Escape"?(I.preventDefault(),q(!1)):I.key==="Tab"?(I.preventDefault(),(d.activeElement===E?v:E).focus()):I.key==="Enter"&&(I.preventDefault(),d.activeElement===v?q(!0):d.activeElement===E&&q(!1))},H=I=>I.stopImmediatePropagation();m.addEventListener("keydown",N,!0),m.addEventListener("keyup",H,!0);let L=()=>q(!1);l?.addEventListener("abort",L);let z,rn=new Promise(I=>{z=I});function q(I){if(Be!==x)return;Be=null,m.removeEventListener("keydown",N,!0),m.removeEventListener("keyup",H,!0),l?.removeEventListener("abort",L);for(let be of S)be.removeAttribute("inert");g.dataset.state="closing",w?.isConnected&&typeof w.focus=="function"&&w.focus({preventScroll:!0});let _=m.getComputedStyle?.(g),j=Math.max(0,...String(_?.transitionDuration??"").split(",").map(be=>Number.parseFloat(be)*(be.trim().endsWith("ms")?1:1e3)||0)),ge=()=>g.remove();g.addEventListener("transitionend",be=>be.target===g&&ge()),setTimeout(ge,j+50),z(I)}return rn}function da(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let d=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var ua=new WeakMap,wn=.25;function $r(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,l=t.onChange,d=t.onReset,c=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},m=u=>{let h=c(u);h!==o&&(o=h,p(),l?.(h))},f=0,y=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();u.target!==r&&h.height>0&&m(1-(u.clientY-h.top)/h.height),f=u.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!y)return;let h=n.getBoundingClientRect().height||1,k=(f-u.clientY)/h*(u.shiftKey?wn:1);f=u.clientY,m(o+k)});let g=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",u=>{u.preventDefault(),d?.()}),n.addEventListener("keydown",u=>{let h=u.shiftKey?s*wn:s,k={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};u.key in k&&(u.preventDefault(),m(k[u.key]))});let b={el:n,get value(){return o},get dragging(){return y},set(u){y||(o=c(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(s=u.step),u.onChange&&(l=u.onChange),u.onReset&&(d=u.onReset)}};return b.setLabel(t.label),b.set(t.value??0),b.setText(t.valueText),ua.set(n,b),b}function kr(t){return ua.get(t)}var pa=new WeakMap,xr=.2,Sr=1.5,Ar=.5;function Lr(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function vn(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:Lr(i.getComputedStyle(t).getPropertyValue(G(e)),n)}function Er(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let u=e.createElement("span");u.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let k=e.createElement("span");k.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",u.append(h,k,$),o.append(u),s.push({peak:h,rms:k,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let l=t.label,d=t.onClear,c=!1,p=-1,m=-1,f=()=>{r.dataset.lit=c?"true":"false",r.setAttribute("aria-pressed",c?"true":"false"),r.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),r.title=c?"Clipped. Click to clear":"Clip light"},y=(b,u,h,k)=>{let $=Math.round(k*1e3)/1e3;h[u]!==$&&(h[u]=$,b.style.transform=u==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};r.addEventListener("click",()=>{g.clear(),d?.()});let g={el:i,get clipped(){return c},update(b,u){p<0&&(p=vn(i,"motion-meter-fall",xr)),m<0&&(m=vn(i,"motion-meter-hold",Sr));let h=Math.max(0,Math.min(.25,Number(u)||0)),k=p>0?Math.exp(-h/p):0;s.forEach(($,E)=>{let v=b[E]??b[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(v.peak)||0)),w=Math.min(x,Math.max(0,Number(v.rms)||0));v.over&&g.clip(),$.level.peak=x>=$.level.peak?x:x+($.level.peak-x)*k,$.level.rms=w>=$.level.rms?w:w+($.level.rms-w)*k,$.holdAge+=h,x>=$.holdAt?($.holdAt=x,$.holdAge=0):$.holdAge>m&&($.holdAt=Math.max(x,$.holdAt-Ar*h)),y($.peak,"peak",$.shown,$.level.peak),y($.rms,"rms",$.shown,$.level.rms),y($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,y(b.peak,"peak",b.shown,0),y(b.rms,"rms",b.shown,0),y(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,f()},configure(b){b.onClear&&(d=b.onClear)}};return f(),g.reset(),pa.set(i,g),g}function ha(t){return t?pa.get(t):void 0}function Mr(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function Mt(t){return Math.max(0,Math.min(1,t))}function ma(t,e){let{ctx:n,w:i,h:r}=Mr(t);if(!n)return;n.clearRect(0,0,i,r);let o=mr(t);if(e.paint==="swatch"){let d=Y(t,"accent"),c=Y(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,i/2,r),n.fillStyle=c,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let d=e.mode??"lp",c=Y(t,hr(d)),p=Y(t,"divider"),m=Mt(e.cutoff??.5),f=.08+(1-Mt(e.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let y=0;y<=i;y++){let g=y/Math.max(1,i),b=0;d==="lp"?b=g<m?1:Math.max(0,1-(g-m)/f):d==="hp"?b=g>m?1:Math.max(0,1-(m-g)/f):b=Math.max(0,1-Math.abs(g-m)/f);let u=r*.78-b*r*.62;y===0?n.moveTo(y,u):n.lineTo(y,u)}n.strokeStyle=c,n.stroke(),n.fillStyle=Y(t,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=Y(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let p=c/Math.max(1,i),m=(r-4)*(1-Math.exp(-p*4/d));n.lineTo(c,r-m)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){let d=Mt(e.level??0);n.fillStyle=Y(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=Y(t,"accent"),n.fillRect(0,r*.4,i*d,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=Y(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=Y(t,"rhythm.playhead"),n.fillRect(l/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=Y(t,"accent")}var fa={slop:8,longPressMs:500,pitchPx:16},Tr=class{constructor(t,e,n=fa){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Cr(t,e,n,i=fa){let r=!1,o=0,s=(c,p)=>{let m=t.ownerDocument.elementFromPoint?.(c,p),f=[...t.querySelectorAll(e)],y=m?f.findIndex(u=>u===m||u.contains(m)):-1;if(y>=0)return y;let g=-1,b=Number.POSITIVE_INFINITY;return f.forEach((u,h)=>{if(u.hidden)return;let k=u.getBoundingClientRect();if(p<k.top||p>k.bottom)return;let $=Math.abs(c-(k.left+k.width/2));$<b&&$<=k.width&&(g=h,b=$)}),g},l=new Tr(s,c=>{(c.kind==="paint"||c.kind==="long")&&(r=!0),n(c)},i),d=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(r=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{r&&(r=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}function D(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function yt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function $n(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function He(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Ir=450,kn=8;function J(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Nr(t){let e=pr(t,"target-min");return e>0?e:44}function Rr(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Nr(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,p=d-i,m=d+i,f=c-i,y=c+i;for(let g=0;g<e.length;g++){if(o===g)continue;let b=r[g];if(!b||b.width===0)continue;let u=b.left+b.width/2,h=b.top+b.height/2;Math.abs(h-c)<i*2&&(u>d?m=Math.min(m,(d+u)/2):u<d&&(p=Math.max(p,(d+u)/2))),Math.abs(u-d)<i*2&&(h>c?y=Math.min(y,(c+h)/2):h<c&&(f=Math.max(f,(c+h)/2)))}p=Math.min(p,l.left),m=Math.max(m,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,m-p)}px`,s.style.height=`${Math.max(0,y-f)}px`,s.style.transform="none"}}function ga(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function xn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ct(t,e){switch(t.type){case"slider":return zr(t,e);case"select":return Br(t,e);case"toggle":return jr(t,e);case"button":return Wr(t,e);case"readout":return Pr(t);case"label":return Fr(t);case"note":return Sn(t);case"knob":return Dr(t,e);case"choice":return _r(t,e);case"slotRow":return Yr(t,e);case"stepGrid":return Ur(t,e);case"canvas":return Jr(t);case"fx":return no(t,e);case"strip":return Qr(t,e);case"stripAdd":return to(t,e);default:return Sn({id:"unknown",text:""})}}function re(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,ba(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??He(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),$n(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")$n(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Gr(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??He(e.value))}else if(e.type==="choice")ya(t,e);else if(e.type==="slotRow")va(t,e);else if(e.type==="stepGrid")Gt(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&ma(n,e)}else if(e.type==="strip"){Sa(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${Ht(n.id)}"]`);i instanceof Element&&re(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")ka(t,e);else if(e.type==="fx"){Aa(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${Ht(n.id)}"]`);i instanceof Element&&re(i,n)}}}}function zr(t,e){let n=yt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(Or(t,i,e),r),n.append(D()),re(n,t),n}function Or(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(J());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function Br(t,e){let n=yt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,D()),n}function jr(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(D()),re(n,t),n}function Wr(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(D()),re(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=ga(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&$a(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function Pr(t){let e=yt(t.id,t.label);return e.append(D()),re(e,t),e}function Fr(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(D()),e}function Sn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(D()),e}function An(t){if(typeof t.valueText=="string")return t.valueText;let e=He(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function ba(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Gr(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;ba(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",An(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${An(e)}`}function Hr(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function Dr(t,e){let n=yt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",d=>{o=d.clientY;let c=e(i);s=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let c=e(i);if(c?.type!=="knob")return;let p=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,s-(d.clientY-o)*p/120));c.onChange(m)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let c=e(i);if(c?.type!=="knob")return;let p=Hr(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(D()),re(n,t),n}function _r(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let c=s[d];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(r)}return n.append(D()),ya(n,t),n}function ya(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Yr(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let p=0;p<t.slots.length;p++){let m=t.slots[p],f=document.createElement("span");f.className="nc-snap-wrap";let y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(p),y.textContent=m.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,J()),Zr(f,y,n,p,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=ga(),r.append(J()),r.addEventListener("click",()=>{$a(n);let p=e(n);p?.type==="slotRow"&&p.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=e(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...r?[r]:[]),n.append(c,o,D()),wa(n,e),va(n,t),n}function Ln(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;We(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Zr(t,e,n,i,r){let o=0,s=0,l=0,d=!1,c=!1,p=!1,m=!1,f=()=>{window.clearTimeout(o),o=0},y=h=>{let k=h.clientX-s,$=h.clientY-l;k*k+$*$>kn*kn&&(d=!0,f())},g=()=>{m&&(m=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",u))},b=h=>{let k=o!==0&&!d&&!c;f(),g(),k&&(p=!0,Ln(n,i,r,h))},u=()=>{d=!0,f(),g()};t.addEventListener("pointerdown",h=>{h.button===0&&(g(),c=!1,d=!1,p=!1,s=h.clientX,l=h.clientY,f(),o=window.setTimeout(()=>{o=0,!d&&(c=!0,Xr(n,e,i,r))},Ir),m=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",u))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(p||c||d){p=!1,c=!1,d=!1;return}Ln(n,i,r,h)})}function wa(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=En("Save","store"),r=En("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),We(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),We(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),We(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&We(t)})}function En(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Xr(t,e,n,i){wa(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function We(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function va(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function $a(t){let e=t.dataset.ncLastFill||null,n=tr(e);t.dataset.ncLastFill=n;let i=nr(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function Vr(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Ur(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=u=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=u,i.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=u=>{for(let h of[o,s]){let k=h===u;h.setAttribute("aria-checked",k?"true":"false"),h.tabIndex=k?0:-1}};l(o);for(let u of[o,s])u.addEventListener("click",()=>l(u));i.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;l(h),h.focus()});let d=document.createElement("div");d.className="nc-step-tools",d.append(i),t.onFill&&d.append(Vr(n,e)),n.append(d);for(let u of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=u.label,k.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(k.dataset.ncLane=String((u.lane-1)%4+1)),k.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid")return;let x=v.rows.findIndex(w=>w.id===u.id);v.onSelectRow?.(x)}),k.addEventListener("keydown",v=>qr(n,k,v));let $=[];for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let w=document.createElement("button");w.type="button",w.className="nc-ms",w.dataset.ncMs=v,w.textContent=v==="mute"?"M":"S",w.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${u.label}`),x.append(w,J()),x.addEventListener("click",()=>{let S=e(n);if(S?.type!=="stepGrid")return;let T=S.rows.findIndex(A=>A.id===u.id);(v==="mute"?S.onMute:S.onSolo)?.(T)}),$.push(x)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<u.steps.length;v++){let x=document.createElement("span");x.className="nc-step-wrap";let w=document.createElement("button");w.type="button",w.className="nc-step",w.dataset.ncStep=`${u.id}:${v}`,w.setAttribute("aria-label",`${u.label} step ${v+1}`),x.append(w,J()),x.addEventListener("click",S=>{let T=e(n);if(T?.type!=="stepGrid")return;let A=T.rows.findIndex(H=>H.id===u.id),N=s.getAttribute("aria-checked")==="true";T.onToggle(A,v,S.shiftKey||N)}),E.append(x)}if(t.onLength&&E.append(Kr(n,E,u,e)),h.append(...$,k,E),t.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=u.id,v.setAttribute("aria-label",`Re-roll ${u.label}`),v.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=xn(),v.append(J()),v.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(w=>w.id===u.id))}),h.append(v)}h.addEventListener("click",v=>{if(v.target!==h)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(w=>w.id===u.id))}),Mn(n,E,".nc-step-wrap",e,s,()=>u.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let p=(u,h,k)=>{let $=document.createElement("button");return $.type="button",$.className=u,$.textContent=h,k&&$.setAttribute("aria-label",k),$},m=p("nc-pads-step","‹","Previous lane"),f=p("nc-pads-step","›","Next lane"),y=document.createElement(t.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),t.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{let u=e(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Gt(n,u))}));for(let[u,h]of[[m,-1],[f,1]])u.addEventListener("click",()=>{let k=e(n);if(k?.type!=="stepGrid"||k.rows.length===0)return;let $=k.rows.length;k.onSelectRow?.(((Ke(k)+h)%$+$)%$)});if(c.append(m,y,f),t.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=xn(),u.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let k=Ke(h);k>=0&&h.onDice?.(k)}),c.append(u)}if(t.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(u)}n.append(c);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let b=Math.max(0,...t.rows.map(u=>u.steps.length));for(let u=0;u<b;u++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(u),h.textContent=String(u+1),h.addEventListener("click",k=>{let $=e(n);if($?.type!=="stepGrid")return;let E=Ke($);if(E<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(E,u+1);return}let v=s.getAttribute("aria-checked")==="true";$.onToggle(E,u,k.shiftKey||v)}),g.append(h)}return Mn(n,g,".nc-pad",e,s,()=>{let u=e(n);return u?.type==="stepGrid"?u.rows[Ke(u)]?.id:void 0}),n.append(g),n.append(D()),Gt(n,t),n}function Ke(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Mn(t,e,n,i,r,o){let s="on",l=!0,d=-1,c=(p,m)=>{let f=p.rows[d]?.steps[m];!f||m>=p.rows[d].length||(p.onSet?p.onSet(d,m,s,l):!!f[s]!==l&&p.onToggle(d,m,s==="accent"))};Cr(e,n,p=>{let m=i(t);if(m?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(p.kind!=="paint")return;let f=m.rows.findIndex(y=>y.id===o());f>=0&&m.rows[f].length!==p.pad+1&&m.onLength?.(f,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let f=o();d=m.rows.findIndex(g=>g.id===f);let y=m.rows[d]?.steps[p.pad];if(!y)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[s]}c(m,p.pad)}else if(p.kind==="long"){let f=o(),y=m.rows.findIndex(b=>b.id===f),g=e.querySelectorAll(n)[p.pad];y>=0&&g instanceof HTMLElement&&m.onLongPress?.(y,p.pad,g)}}})}function qr(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Kr(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(J());let o=c=>{let p=i(t);if(p?.type!=="stepGrid")return;let m=p.rows.findIndex(g=>g.id===n.id),f=p.rows[m];if(!f)return;let y=Math.max(1,Math.min(f.steps.length,c));y!==f.length&&p.onLength?.(m,y)},s=c=>{let p=[...e.querySelectorAll(".nc-step")],m=1;return p.forEach((f,y)=>{let g=f.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(m=y+1)}),m},l=c=>o(s(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",c=>{let p=i(t);if(p?.type!=="stepGrid")return;let m=p.rows.find(y=>y.id===n.id);if(!m)return;let f={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),r}var Tt=new WeakMap;function Tn(t,e){let n=typeof e=="number"?e:null;if(!(Tt.has(t)&&Tt.get(t)===n)){if(Tt.set(t,n),n===null){for(let i of Object.keys(yn(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(yn(n)))t.style.setProperty(i,r)}}function Gt(t,e){let n=e.rows.some(c=>c.solo),i=t.querySelector(".nc-pads"),r=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=s?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",s?"true":"false"),o.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let l=t.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&r&&(l.setAttribute("aria-label",`Re-roll ${r.label}`),l.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!e.transport?.playing,p=e.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let c=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let m=Number(p.getAttribute("data-nc-pad")),f=r.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!f||!s&&m>=r.length,s&&m>=r.length?p.dataset.out="true":delete p.dataset.out,s&&m===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${m+1}`),p.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?p.dataset.accent="true":delete p.dataset.accent,f?.dim?p.dataset.dim="true":delete p.dataset.dim,Tn(p,f?.velocity),e.playhead>=0&&m===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of e.rows){for(let f=0;f<c.steps.length;f++){let y=c.steps[f],g=t.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;let b=g.closest(".nc-row");if(b instanceof HTMLElement){e.selectedRow===c.id?b.dataset.selected="true":delete b.dataset.selected;let k=b.querySelector(".nc-name");k instanceof HTMLElement&&k.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||n&&!c.solo?b.dataset.silent="true":delete b.dataset.silent;for(let $ of b.querySelectorAll("[data-nc-ms]")){let E=$.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;$.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?g.dataset.accent="true":delete g.dataset.accent,y.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof y.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Tn(g,y.velocity);let u=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===u?g.dataset.playhead="true":delete g.dataset.playhead;let h=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!h,f>=c.length&&h?g.dataset.out="true":delete g.dataset.out}let p=t.querySelector(`[data-nc-len="${c.id}"]`),m=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&m&&m.nextElementSibling!==p){let f=document.activeElement===p;m.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Jr(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,D()),e}function Qr(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(g)}),i.append(g)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",g.append(b,J()),g.addEventListener("click",()=>{let u=e(n);u?.type==="strip"&&u.onHacks?.()}),o.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let u=document.createElement("button");u.type="button",u.className="nc-ms",u.dataset.ncMs=g,u.textContent=g==="mute"?"M":"S",b.append(u,J()),b.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(g==="mute"?h.onMute:h.onSolo)?.()}),s.append(b)}let l=document.createElement("div");l.className="nc-strip-sends";for(let g of t.sends??[])l.append(ct({...g,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let c=document.createElement("span");c.className="nc-scale",c.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(g.value)),b.textContent=g.label,c.append(b)}let p=$r({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let b=e(n);b?.type==="strip"&&b.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&In(g)}}),m=Er({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});d.append(c,p.el,m.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",g=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(y),g.detail===0?Cn(n,f,e):g.detail===1&&(y=window.setTimeout(()=>Cn(n,f,e),eo)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let g=e(n);g?.type==="strip"&&In(g)}),n.append(i,o,s,l,d,f,D()),Sa(n,t),n}var eo=250;function Cn(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??He(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function to(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),d=s.value;xa(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(i,s,D()),ka(n,t),n}function ka(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),xa(i))}function xa(t){let e=t.options[0];e&&(e.selected=!0)}function In(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Sa(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?kr(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),ha(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??He(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let c=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${c}`:c}for(let d of t.querySelectorAll("[data-nc-ms]")){let c=d.getAttribute("data-nc-ms"),p=c==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",p?"true":"false"),d.setAttribute("aria-label",`${c==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let d=e.hacksLabel??"Hacks";l.textContent!==d&&(l.textContent=d),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Nn(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${Ht(e)}"]`);return ha(n?.querySelector(".nc-meter")??void 0)}function no(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=da({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(o.el);l?.type==="fx"&&l.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(ct(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(ct(s,e));n.append(r)}return n.append(D()),Aa(n,t),n}function Aa(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Ht(t){return t.replace(/["\\]/g,"\\$&")}function ao(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&ma(n,i)}Rr(t)}var qt="netcomposer.rhythm.hidden.v1",te=new WeakMap;function Ct(){try{return globalThis.localStorage??null}catch{return null}}function La(t,e=qt){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Rn(t,e,n,i=qt){let r=La(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function Kt(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function io(t,e){if(!(!t||!e))return Kt(t).find(n=>n.id===e)}function ro(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${Kt(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function oo(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),Ea(t,e)}function Ea(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function so(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=te.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return io(n,i)}function lo(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=ro(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${zn(r.id)}"]`);o&&Ea(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${zn(s.id)}"]`);l instanceof Element&&re(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),oo(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(ct(l,so));t.append(o)}}function zn(t){return t.replace(/["\\]/g,"\\$&")}function co(t,e=qt){la();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=La(Ct(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=da({labelledBy:o.id,onChange:h=>(te.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,d);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",r.append(o,p,s);let m=document.createElement("div");m.className="nc-module-body",m.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let y=document.createElement("span");y.className="nc-slim-lines",f.append(y);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,m,f),n.setAttribute("aria-labelledby",o.id);let b=h=>{let k=te.get(n)??t;n.dataset.ncOpen=h?"false":"true",m.hidden=h,f.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${k.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";Rn(Ct(),(te.get(n)??t).id,h,e),b(h),Dt(n.parentElement)}),f.addEventListener("click",()=>{Rn(Ct(),(te.get(n)??t).id,!1,e),b(!1),Dt(n.parentElement)});let u={el:n,update(h){te.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,p.textContent=h.status??"",h.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),y.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),lo(m,h),b(m.hidden),u.redraw()},redraw(){let h=te.get(n);h&&ao(n,Kt(h))}};return te.set(n,t),b(i),u.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>u.redraw()).observe(n),u}function uo(t,e,n="adjacent"){la(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),Dt(t)}function Dt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const Ma="netcomposer.studio.instances.v1",On="netcomposer.studio.types-seen.v1",po=["petra-rhythm","olive-bass"];function Ta(t,e){return e===1?t:`${t}#${e}`}function Ca(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function wt(t,e){return{id:Ta(t.id,e),type:t.id,n:e,name:e===1?t.name:`${t.name} ${e}`,src:t.src}}function ho(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function mo(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let i=1;for(;n.has(i);)i++;return wt(e,i)}function dt(t){return t.filter(e=>e.available!==!1).map(e=>wt(e,1))}function fo(t,e){if(!Array.isArray(t))return dt(e);const n=[];for(const i of t){if(typeof i!="string")continue;const r=Ca(i),o=r&&e.find(s=>s.id===r.type&&s.available!==!1);!r||!o||n.some(s=>s.id===i)||n.push(wt(o,r.n))}return n.length>0||t.length===0?n:dt(e)}function Jt(){try{return globalThis.localStorage??null}catch{return null}}function go(t,e=Jt()){try{const n=e?.getItem(Ma);return n?fo(JSON.parse(n),t):dt(t)}catch{return dt(t)}}function bo(t,e,n=Jt()){let i=po;try{const s=JSON.parse(n?.getItem(On)??"null");Array.isArray(s)&&(i=s.filter(l=>typeof l=="string"))}catch{}const r=e.filter(s=>!i.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(l=>l.type===s.id)||o.push(wt(s,1));try{n?.setItem(On,JSON.stringify([...new Set([...i,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&vt(o,n),o}function vt(t,e=Jt()){try{e?.setItem(Ma,JSON.stringify(t.map(n=>n.id)))}catch{}}function yo(t,e){const n=new Map;return(i,r)=>{const o=Ca(i),s=o?.type??i,l=r?.instance!==void 0?Number(r.instance):i.includes("#")?o?.n:void 0,d=t().filter(p=>p.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=d.find(p=>p.instance.n===l);else{const p=d.filter(m=>{const f=m.window();return f!=null&&f!==n.get(m.instance.id)});c=p.find(m=>m.readyState?.()!=="complete")??p[0]??d[0]}if(!c){if(e.some(m=>m.id===s))return null;const p=l!==void 0?Ta(s,l):i;return{id:p,name:p}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const wo=1,Me=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],Qt=[...Me];function vo(t,e,n={}){const i=n.instruments??Me;return{version:wo,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:i.find(d=>d.id===r)?.name??r};if(!s)return null;const l=e.attach(s.id,s.name);return n.mapper===void 0?{ctx:t,output:l}:{ctx:t,output:l,mapper:n.mapper}}}}const $o={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function ko(t,e){const n=e.fx[t],i=ot(n);for(const r of i.chain){const o=$o[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return i}function xo(t,e){const n=new Map,i=new Map;let r=1;const o=s=>{const l=e.nodeFor(s);if(!l)return null;const d=n.get(s);if(d&&d.source===l)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(t,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const m=p.data;m.type==="took"&&(i.get(m.id)?.(m.channels),i.delete(m.id))},l.connect(c),n.set(s,{node:c,source:l}),c};return{sources:()=>e.sources(),listen(s){return e.nodeFor(s)?(e.ready.then(()=>o(s)),!0):!1},async take(s,l,d){await e.ready;const c=o(s);if(!c||!(d>l))return null;const p=r++;return new Promise(m=>{i.set(p,m),c.port.postMessage({type:"take",id:p,from:l,to:d}),setTimeout(()=>{i.delete(p)&&m(null)},(d-t.currentTime*t.sampleRate)/t.sampleRate*1e3+2e3)})}}}function So(t){const e=()=>{};return new Proxy(t,{get(n,i,r){if(i==="stop")return e;const o=Reflect.get(n,i,r);return typeof o=="function"?o.bind(n):o}})}const Q=-54,Ye=6,V=-Q/(Ye-Q),Ao=-9,_t=(Ao-Q)/(Ye-Q);function Ia(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:Q+e*(Ye-Q)}function Lo(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function Eo(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function ce(t){return Lo(Ia(t))}function Mo(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function To(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:ce(n.position))}function en(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-Q)/(Ye-Q)))}function Bn(t){return en(Eo(t))}const jn=[0,-6,-12,-24,-48].map(t=>({value:en(t),label:t===0?"0":`−${-t}`})),Co=1;function Io(t){let e=0,n=0;for(const i of t){const r=Math.abs(i);r>e&&(e=r),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function Wn(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<Q?0:en(Math.min(Ye,n)):null}const Na="netcomposer.studio.mix.v1",Ra={position:_t,mute:!1,solo:!1,sendA:0,sendB:0};function Yt(){return{v:1,channels:{},master:V,returns:{a:{on:!0,level:V},b:{on:!0,level:V}},insert:{on:!1},fx:{},channelFx:{}}}const Ge=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,ut=(t,e)=>typeof t=="boolean"?t:e,ne=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function No(t){const e=ne(t);return{position:Ge(e.position,Ra.position),mute:ut(e.mute,!1),solo:ut(e.solo,!1),sendA:Math.min(V,Ge(e.sendA,0)),sendB:Math.min(V,Ge(e.sendB,0))}}function Ro(t){const e=Yt(),n=ne(t);if(n.v!==1)return e;const i={};for(const[c,p]of Object.entries(ne(n.channels)))c.length>0&&c.length<=64&&(i[c]=No(p));const r=ne(n.returns),o=(c,p)=>{const m=ne(c);return{on:ut(m.on,p.on),level:Ge(m.level,p.level)}},s={},l=ne(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const d={};for(const[c,p]of Object.entries(ne(n.channelFx)))c.length>0&&c.length<=64&&p&&typeof p=="object"&&(d[c]=p);return{v:1,channels:i,master:Ge(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:ut(ne(n.insert).on,e.insert.on)},fx:s,channelFx:d}}function za(){try{return globalThis.localStorage??null}catch{return null}}function zo(t=za()){try{const e=t?.getItem(Na);return e?Ro(JSON.parse(e)):Yt()}catch{return Yt()}}function Oo(t,e=za()){try{return e?.setItem(Na,JSON.stringify(t)),e!==null}catch{return!1}}const Bo="netcomposer.studio.hidden.v1",Je=1/120,ee="master",Pn="Inserts",jo="(max-width: 768px)",nt=8,at=t=>Mo(Ia(t)),Fn=t=>{const e=at(t);return e==="−∞"?"off":`${e} dB`};function Wo(t,e){return Ae.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function Po(t,e,n){const i=n.bpm,r=w=>{const S=n.order(),T=S.indexOf(w);return T<0?S.length:T},o=(w,S,T,A)=>{const N=Wo(T,A);if(!N||!S)return null;const H=Number(S.getParam(T,A)??N.default),L=`mix-${w}-${A}`;return N.options?{type:"select",id:L,label:N.label,value:String(H),options:N.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>{S.setParam(T,A,Number(z)),x.render()}}:{type:"slider",id:L,label:N.label,min:N.min,max:N.max,step:N.step??1,value:H,valueText:N.format(H,i()),onChange:z=>{S.setParam(T,A,z),x.render()}}},s=(w,S,T,A)=>A.map(N=>o(w,S,T,N)).filter(N=>N!==null),l=matchMedia(jo);let d=l.matches?null:ee;const c=w=>{d=w===null&&!l.matches?ee:w,x.render()},p=w=>c(d===w?l.matches?null:ee:w);l.addEventListener("change",()=>c(d));const m=(w,S,T,A)=>{const N=Number(S.getParam(T,A.key)??A.default),H=`hack-${w}-${T}-${A.key}`,L=z=>{S.setParam(T,A.key,z),x.render()};return A.options?{type:"select",id:H,label:A.label,value:String(N),options:A.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>L(Number(z))}:{type:"slider",id:H,label:A.label,min:A.min,max:A.max,step:A.step??.001,value:N,valueText:Jn(A,N,i()),onChange:L}},f="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}},g=(w,S,T)=>{const A=T.getChain(),N=A.map((L,z)=>{const q=U(L.type)?.dials??[],I=j=>{T.moveEffect(L.id,j),x.render()},_=[];return z>0&&_.push({type:"button",id:`hack-${w}-${L.id}-left`,label:"Move left",on:!1,onPress:()=>I(z-1)}),z<A.length-1&&_.push({type:"button",id:`hack-${w}-${L.id}-right`,label:"Move right",on:!1,onPress:()=>I(z+1)}),_.push({type:"button",id:`hack-${w}-${L.id}-remove`,label:"Remove",ariaLabel:`Remove ${L.name} from ${S}`,on:!1,onPress:()=>{T.removeEffect(L.id),x.render()}}),{type:"fx",id:`hack-${w}-${L.id}`,title:`${z+1} · ${L.name}`,depth:z%4+1,on:!L.bypass,onToggle:j=>{T.setParam(L.id,"bypass",!j),x.render()},controls:q.filter(j=>!j.more).map(j=>m(w,T,L.id,j)),more:[...q.filter(j=>j.more).map(j=>m(w,T,L.id,j)),..._]}}),H=A.length>=nt;return N.push({type:"fx",id:`hack-${w}-add`,title:`${S} · Inserts`,depth:A.length%4+1,controls:[{type:"note",id:`hack-${w}-note`,text:H?`${A.length} of ${nt}: the stack is full.`:A.length===0?"No effects yet.":`${A.length} of ${nt}, first to last.`},...H?[]:[{type:"select",id:`hack-${w}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...wi.map(L=>({value:L,label:U(L)?.label??L}))],onChange:L=>{L!==f&&(T.addEffect(L,{dials:y[L]}),x.render())}}]]}),N},b=w=>{const S=e.returns[w];return{type:"slider",id:`mix-${w}-return`,label:"Return",min:0,max:1,step:Je,value:S.level,valueText:Fn(S.level),onChange:T=>e.setReturn(w,{level:T})}},u=()=>[...e.list()].sort((w,S)=>r(w.id)-r(S.id)).map(w=>({type:"strip",id:`strip-${w.id}`,label:w.name,value:w.strip.position,valueText:at(w.strip.position),step:Je,defaultValue:_t,resetText:`${at(_t)} dB`,ticks:[...jn],mute:w.strip.mute,solo:w.strip.solo,silent:w.silent,onChange:S=>e.set(w.id,{position:S}),onTypeIn:S=>{const T=Wn(S);T!==null&&e.set(w.id,{position:T})},onRemove:S=>n.onRemove(w.id,S),...w.fx?{hacks:d===w.id,hacksLabel:Pn,onHacks:()=>p(w.id)}:{},onMute:()=>e.set(w.id,{mute:!w.strip.mute}),onSolo:()=>e.set(w.id,{solo:!w.strip.solo}),sends:["A","B"].map(S=>{const T=S==="A"?"sendA":"sendB",A=w.strip[T];return{id:`send-${S.toLowerCase()}-${w.id}`,label:S,ariaLabel:`${w.name} send ${S}`,min:0,max:V,step:Je*2,value:A,valueText:Fn(A),defaultValue:0,onChange:N=>e.set(w.id,{[T]:N})}})})),h=()=>({type:"strip",id:`strip-${ee}`,label:"Master",master:!0,hacks:d===ee,hacksLabel:Pn,onHacks:()=>p(ee),channels:2,value:e.masterPositionValue,valueText:at(e.masterPositionValue),step:Je,defaultValue:V,resetText:"0.0 dB",ticks:[...jn],onChange:w=>e.setMaster(w),onTypeIn:w=>{const S=Wn(w);S!==null&&e.setMaster(S)}}),k=()=>{const w=e.returns.a,S=e.returns.b,T=e.list().find(A=>A.id===d&&A.fx);return!T&&d!==null&&(d=ee),{id:"mix",title:"Mix",summary:`${e.list().map(A=>A.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...u(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(A=>({value:A.id,label:A.available===!1?`${A.name} (soon)`:A.name,disabled:A.available===!1})),onAdd:A=>n.onAdd(A)}]},{id:"fx",area:"fx",label:T?`${T.name} inserts`:"Effects",controls:T?.fx?g(T.id,T.name,T.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:w.on,onToggle:A=>e.setReturn("a",{on:A}),controls:[b("a"),...s("a",w.fx,"plate",["decay","size"])],more:s("a",w.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:A=>e.setReturn("b",{on:A}),controls:[b("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:A=>e.setInsert(A),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},{id:"master",area:"master",label:"Master",controls:[h()]}]}},$=co(k(),Bo),E=()=>$.el.toggleAttribute("data-hacks-folded",d===null);E(),Fo($.el,n),Hn($.el),uo(t,[$],"adjacent");const v=w=>({peak:Bn(w.peak),rms:Bn(w.rms),over:w.peak>=Co}),x={module:$,get hacksShown(){return d},showHacks:c,render(){$.update(k()),E(),Hn($.el)},frame(w){if($.el.dataset.ncOpen==="true"){for(const S of e.list())Nn($.el,`strip-${S.id}`)?.update([v(S.levels())],w);Nn($.el,`strip-${ee}`)?.update(e.masterLevels().map(v),w)}}};return x}const It="application/x-nc-strip",pt=".nc-strip:not([data-nc-master])",Gn=`${pt}, .nc-strip-add`,Nt=t=>t?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function Hn(t){for(const e of t.querySelectorAll(`${pt} .nc-strip-hd`))!(e instanceof HTMLElement)||e.draggable||(e.draggable=!0,e.title="Drag to move this channel")}function Fo(t,e){const n=()=>{for(const r of t.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of t.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},i=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};t.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd"):null)?.closest(pt),l=Nt(s??null);!l||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(It,l),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),t.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(It))return;const o=r.target instanceof Element?r.target.closest(Gn):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":i(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const l of t.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),t.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(It),s=r.target instanceof Element?r.target.closest(Gn):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),e.onReorder?.(o,null);return}const l=Nt(s),d=i(s,r.clientX);if(n(),!l||l===o)return;let c=l;if(d==="after"){const p=[...t.querySelectorAll(pt)],m=p[p.indexOf(s)+1];if(c=m?Nt(m):null,c===o)return}e.onReorder?.(o,c)}),t.addEventListener("dragend",n)}const ke=.012,Rt=1024;class Go{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=V;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(Rt);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const i=()=>new AnalyserNode(e,{fftSize:Rt});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:ce(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const l=new GainNode(e,{gain:1}),d=n.fx?.(s)??null,c=new GainNode(e,{gain:ce(V)}),p=i();return d?(l.connect(d.input),d.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:l,fx:d,gain:c,meter:p,on:d!==null,level:V}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let i=this.channels.find(r=>r.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fx?.input??i.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Rt}),l=new GainNode(this.ctx,{gain:0}),d=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(e)??null;c?(r.connect(c.input),c.output.connect(o)):r.connect(o),o.connect(s).connect(this.bus),o.connect(l).connect(this.returns.a.bus),o.connect(d).connect(this.returns.b.bus),i={id:e,name:n,input:r,fader:o,meter:s,sendA:l,sendB:d,fx:c,strip:this.restore?.(e)??Ra},this.channels.push(i),this.apply()}return this.emit(),i.input}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const r of[i.input,i.fader,i.meter,i.sendA,i.sendB])r.disconnect();i.fx?.output.disconnect(),i.fx?.dispose(),this.apply(),this.emit()}}tapNode(e){return e==="master"?this.limiter:this.channels.find(n=>n.id===e)?.fader??null}set(e,n){const i=this.channels.find(r=>r.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(ce(e),this.ctx.currentTime,ke),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,r,ke)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(ce(i.level),r,ke)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n);for(const i of this.channels)i.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=To(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,r)=>{i.fader.gain.setTargetAtTime(e[r]??0,n,ke),i.sendA.gain.setTargetAtTime(ce(i.strip.sendA),n,ke),i.sendB.gain.setTargetAtTime(ce(i.strip.sendB),n,ke)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),Io(this.scratch)}emit(){for(const e of this.listeners)e()}}const tn="studio";function Ho(){let t=null;const e=new Set,n=new Set,i=o=>{if(o!==t){t=o;for(const s of n)s()}},r=(o,s)=>(o.add(s),()=>{o.delete(s)});return{owner:()=>t,claim(o){t===null&&i(o)},claimAll(){i(tn);for(const o of[...e])try{o()}catch{}},clear:()=>i(null),onAll:o=>r(e,o),onChange:o=>r(n,o)}}const Do=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function _o(t){return Do.find(e=>t(e))??null}function Yo(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function Zo(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${Yo(e)}`}class Xo{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:_o(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});i({blob:r,name:Zo(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const Vo="/studio/assets/silence-processor-DIacLFV4.js";function Uo(t,e=Qt){const n=e.find(o=>o.id===t.type),i=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??i,rest:` / ${i} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const qo="NetComposer Studio",ue=[40,240],Ko="nc-sync";function Jo(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${Ko}${n}`,locks:e?{request:(i,r,o)=>e.request(`${i}${n}`,r,o)}:null}}function Qo(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function es(t,e){const n=new ei({bpm:120,minBpm:ue[0],maxBpm:ue[1],timebase:"shared"}),i=new pi({app:qo,version:"0.1.0",clock:n,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:ue},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let r=!1;return{clock:n,peer:i,async start(){r||(r=!0,await i.start())},play:()=>n.play({at:Re()}),stop:()=>n.stop({at:Re()}),setTempo:o=>n.setTempo({bpm:ts(o)}),playing:()=>n.transport.isPlayingAt(Re()),running:()=>n.transport.running,bpm:()=>n.transport.bpm,position(){const o=n.transport,s=Re();return o.isPlayingAt(s)?ns(o.beatAt(s)):null},beatPhase(){const o=n.transport,s=Re();if(!o.isPlayingAt(s))return null;const l=o.beatAt(s);return l-Math.floor(l)},peers:()=>[...i.peers.values()]}}function ts(t){return Number.isFinite(t)?Math.min(ue[1],Math.max(ue[0],Math.round(t*10)/10)):120}function ns(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}function as(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const l=new URL(String(o),e).href;let d=i.get(l);return d||(d=n(o,s),i.set(l,d),d.catch(()=>{i.get(l)===d&&i.delete(l)})),d},configurable:!0}),t}const F=new AudioContext({latencyHint:"interactive"});as(F.audioWorklet,location.href);const Z=zo(),pe={},is=nt,nn=new Map,P=new Go(F,{restore:t=>Z.channels[t],fx:t=>{const e=pn(F,{moduleUrl:jt,bpm:120,state:ko(t,Z)});return pe[t]=e,e},channelFx:t=>{mt.delete(t);const e=pn(F,{moduleUrl:jt,bpm:W.bpm(),slots:is,state:Z.channelFx[t]??{v:2,chain:[]}}),n=na(e,W.clock,{mapper:Ze}),i=e.dispose.bind(e);return e.dispose=()=>{n(),i()},e.onChange($t),nn.set(t,e),e}});P.setMaster(Z.master);P.setReturn("a",Z.returns.a);P.setReturn("b",Z.returns.b);P.setInsert(Z.insert.on);const Ze=new ui(F);Ze.start();const Oa=Qo();let Ba=()=>{};const rs=xo(F,{nodeFor:t=>P.tapNode(t),sources:()=>[{id:"master",name:"Master"},...P.list().map(t=>({id:t.id,name:t.name}))],ready:new Promise(t=>{Ba=t})}),he=Ho();window.ncStudio=vo(F,P,{grab:rs,play:he,mapper:So(Ze),resolve:(t,e)=>ps(t,e),syncScope:Oa,fxWorklet:new URL(jt,location.href).href});const W=es(()=>F.state,Jo(Oa)),it=new Xo(P.recordOut.stream);let Qe=null;function C(t,e={},...n){const i=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||i.setAttribute(r,o===!0?"":String(o));return i.append(...n),i}const De=C("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Te=C("input",{type:"number",class:"bpm",min:ue[0],max:ue[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),ht=C("output",{class:"position","aria-label":"Bar and beat"},"—"),ae=C("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),Pe=C("a",{class:"take",hidden:!0}),an=C("span",{class:"status",role:"status"}),os=C("h1",{class:"brand"},C("span",{},"NetComposer ",C("span",{},"Studio"))),Zt=C("span",{class:"beat-light","aria-hidden":"true"}),ja=C("span",{class:"status-long"}),Wa=C("span",{class:"status-short"});an.append(ja,Wa);const ss=C("header",{class:"top"},C("div",{class:"transport"},De,C("label",{class:"tempo"},Te,C("span",{class:"tempo-unit"},"BPM")),Zt,ht),C("div",{class:"record"},ae,Pe),an);it.supported||(ae.disabled=!0,ae.title="This browser can't record audio");const Ce=C("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Pa=C("div",{class:"stage"}),Xe=C("label",{class:"tab tab-add",title:"Add an instrument"},C("span",{"aria-hidden":"true"},"+")),Le=C("select",{class:"tab-add-select","aria-label":"Add an instrument"});Le.append(C("option",{value:""},"Add an instrument"),...Qt.map(t=>{const e=C("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));Le.addEventListener("change",()=>{const t=Le.value;Le.value="",t&&Da(t)});Xe.append(Le);Ce.append(Xe);const _e=C("div",{class:"spine","aria-hidden":"true"}),me=new Map;let R=bo(go(Me),Me),se=R[0]?.id??"";const ls=new URLSearchParams(location.search).has("measure"),Dn=new Map,cs=2e4;function Fa(t){const e=C("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>oe(t.id)),Ce.insertBefore(e,Xe);const i=(Dn.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!R.some(l=>l.id===t.id))return r();const o=C("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:ho(t,ls),allow:"autoplay; clipboard-read; clipboard-write; microphone"});me.set(t.id,o);const s=window.setTimeout(r,cs);o.addEventListener("load",()=>ds(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),Pa.append(o),oe(se)}));return Dn.set(t.type,i),i}function ds(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="";const n=t.id.replace(/^panel-/,""),i=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const l=e?.querySelector(".nc-page-hd, .nc-title-band");l&&(Ga.set(n,Math.round(l.getBoundingClientRect().bottom)),n===se&&Ha())};i();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(i).observe(r)}const Ga=new Map;function Ha(){const t=Ga.get(se);t===void 0?_e.style.removeProperty("--spine-top"):_e.style.setProperty("--spine-top",`${t}px`)}function us(t){if(!t){_e.replaceChildren();return}const e=Uo(t),n=C("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),_e.replaceChildren(C("span",{class:"spine-text"},n,C("span",{class:"spine-rest"},e.rest)))}function oe(t){se=t,us(R.find(e=>e.id===t)),Ha();for(const e of R){const n=e.id===t;me.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const ps=yo(()=>R.map(t=>({instance:t,window:()=>me.get(t.id)?.contentWindow,readyState:()=>{try{return me.get(t.id)?.contentDocument?.readyState}catch{return}}})),Me);function Da(t){const e=Me.find(r=>r.id===t);if(!e)return;const n=mo(R,e),i=R.map(r=>r.type).lastIndexOf(n.type);R=i<0?[...R,n]:[...R.slice(0,i+1),n,...R.slice(i+1)],vt(R),Fa(n);for(const r of R){const o=document.getElementById(`tab-${r.id}`);o&&Ce.insertBefore(o,Xe)}oe(n.id),fe?.render()}function hs(t,e){const n=R.find(o=>o.id===t);if(!n)return;const i=R.filter(o=>o.id!==t),r=e===null?i.length:i.findIndex(o=>o.id===e);R=[...i.slice(0,r<0?i.length:r),n,...i.slice(r<0?i.length:r)],vt(R);for(const o of R){const s=document.getElementById(`tab-${o.id}`);s&&Ce.insertBefore(s,Xe)}fe?.render()}async function ms(t,e){const i=R.find(s=>s.id===t)?.name??t;if(!await vr({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;R=R.filter(s=>s.id!==t),vt(R);const o=me.get(t);me.delete(t),o?.setAttribute("src","about:blank"),o?.remove(),document.getElementById(`tab-${t}`)?.remove(),P.detach(t),fs(t),se===t&&oe(R[0]?.id??"")}const Xt=C("div",{class:"mix"});Xt.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==se&&R.some(i=>i.id===n)&&oe(n)});let fe=null,_n=0;const mt=new Set;function fs(t){mt.add(t),delete Z.channels[t],delete Z.channelFx[t],nn.delete(t),$t()}function $t(){window.clearTimeout(_n),_n=window.setTimeout(()=>{const t={...Z.channels};for(const i of P.list())t[i.id]=i.strip;for(const i of mt)delete t[i];const e={};for(const i of["a","b","insert"]){const r=pe[i];r&&(e[i]=r.getState())}const n={...Z.channelFx};for(const[i,r]of nn)n[i]=r.getState();for(const i of mt)delete n[i];Oo({v:1,channels:t,master:P.masterPositionValue,returns:{a:{on:P.returns.a.on,level:P.returns.a.level},b:{on:P.returns.b.on,level:P.returns.b.level}},insert:{on:P.insertEnabled},fx:e,channelFx:n})},300)}P.onChange(()=>{fe?.render(),$t()});for(const t of Object.values(pe))t?.onChange($t);async function _a(){F.state!=="running"&&await F.resume()}De.addEventListener("click",()=>{_a(),W.running()&&he.owner()===tn?W.stop():W.running()?he.claimAll():(he.claimAll(),W.play()),Ie()});function Ya(){const t=Number(Te.value);W.setTempo(t)}Te.addEventListener("change",Ya);Te.addEventListener("keydown",t=>{t.key==="Enter"&&Ya()});ae.addEventListener("click",async()=>{if(_a(),it.recording){const t=await it.stop();ae.setAttribute("aria-pressed","false"),ae.textContent="Rec",t&&(Qe&&URL.revokeObjectURL(Qe.url),Qe={url:URL.createObjectURL(t.blob),take:t},Pe.href=Qe.url,Pe.download=t.name,Pe.textContent=`Save take (${t.seconds.toFixed(1)} s)`,Pe.hidden=!1)}else it.start(),ae.setAttribute("aria-pressed","true"),ae.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),De.click())});Ce.addEventListener("keydown",t=>{if(t.target===Le)return;const e=R.map(r=>r.id),n=e.indexOf(se),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),oe(i),document.getElementById(`tab-${i}`)?.focus())});function Ie(){const t=W.running()&&he.owner()===tn;De.textContent=t?"Stop":"Play",De.setAttribute("aria-pressed",String(t)),document.activeElement!==Te&&(Te.value=String(Math.round(W.bpm()*10)/10));const e=W.position();ht.value=e?`${e.bar}.${e.beat}`:"—";const n=W.peers().length;ja.textContent=F.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Wa.textContent=F.state==="running"?"":"Audio off",an.classList.toggle("off",F.state!=="running")}W.clock.onChange(()=>{W.running()||he.clear(),Ie()});he.onChange(Ie);W.clock.onChange(()=>fe?.render());W.peer.onPeers(Ie);F.addEventListener("statechange",Ie);const gs=.25;let Yn=performance.now();function Za(t){const e=Math.min(.1,(t-Yn)/1e3);Yn=t,fe?.frame(e);const n=W.position(),i=n?`${n.bar}.${n.beat}`:"—";ht.value!==i&&(ht.value=i);const r=W.beatPhase(),o=r!==null&&r<gs;Zt.hasAttribute("data-on")!==o&&Zt.toggleAttribute("data-on",o),requestAnimationFrame(Za)}async function bs(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(os,ss,Xt,C("main",{class:"instruments"},Ce,C("div",{class:"bay"},_e,Pa))),fe=Po(Xt,P,{order:()=>R.map(e=>e.id),catalogue:Qt,bpm:()=>W.bpm(),onAdd:Da,onRemove:(e,n)=>void ms(e,n),onReorder:(e,n)=>hs(e,n)}),F.state==="running"&&await F.suspend(),await F.audioWorklet.addModule(Vo),Ba(),await W.start();for(const e of[pe.a,pe.b,pe.insert])e&&na(e,W.clock,{mapper:Ze});for(const e of R)Fa(e);oe(se),Ie(),requestAnimationFrame(Za),document.documentElement.dataset.studioReady=""}window.__studio={ctx:F,mixer:P,mapper:Ze,transport:W,frames:me,show:oe,get instances(){return R},fx:pe,get mix(){return fe}};bs();
