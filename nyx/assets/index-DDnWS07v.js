(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const Te=1e-9;function Pi(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class kn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Pi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+Te&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+Te)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Te){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Te;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new kn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+Te)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+Te)return n[i];return n[0]}}const Oi=Object.freeze({beatsPerBar:4,beatUnit:4}),Oe=1e-9;function Wi(t){return Math.floor(t+Oe)}function Ca(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Oe)*e;return n&&r<=t+Oe?r+e:r}class Gi{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new kn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Oi}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Oe&&(this.stopTime===null||e<this.stopTime-Oe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Oe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Wi(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return Ca(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Ta="nc-clock/snapshot",Ia=1;function Fi(t,e="local"){return{format:Ta,version:Ia,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Hi(t,e){const n=Zi(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const oe=t=>typeof t=="number"&&Number.isFinite(t),Fn=t=>t===null||oe(t);function Zi(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Ta&&n("format"),(!oe(e.version)||Math.floor(e.version)!==Ia)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!oe(e.anchor.beat)||!oe(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&oe(i.beat)&&oe(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!oe(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!oe(e.meter.beatUnit))&&n("meter"),(!Fn(e.startTime)||!Fn(e.stopTime)||!oe(e.stoppedBeat))&&n("transport times"),e}class Di{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Gi(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Hi(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Fi(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Yi="nc-sync/1",Xi=1,_i="nc-sync",Ui="nc-sync-leader",qi=0,Na=.5,za=.75;function Vi(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Na&&t<=za?t:null}const Zt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),_e=t=>typeof t=="number"&&Number.isFinite(t),dt=t=>typeof t=="string"&&t.length>0;function Ki(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Xi||!dt(e.type)||!dt(e.from)||!_e(e.term)||!_e(e.seq)||!_e(e.sentAt))return null;switch(e.type){case"hello":return dt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return _e(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&_e(e.slot)?e:null;case"ping":case"pong":return dt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Ji(t,e,n,i,r){return{proto:Yi,from:e,term:n,seq:i,sentAt:r,...t}}function F(){return(performance.timeOrigin+performance.now())/1e3}const Dt=.003,Qi=3,er=.01,Hn=500;class Zn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?er:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Dt&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const l=this.offsets,d=this.preStep;l.length=0;for(let u=0;u<d.length;u++)l.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const u=this.offsets,c=this.preStep;c.length=0;for(let h=0;h<u.length;h++)c.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,d=e-n;for(let u=0;u<l.length;u++)l[u]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Dt&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Hn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Dt)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Hn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Qi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class tr{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Zt,...e.capabilities},this.channelOption=e.channel??_i,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??Ca(d,1),d);i&&i>0?(s.tempo.rampTempo(e,u,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,u),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(za,Math.max(Na,e)):qi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Vi(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Ki(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Zt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Zt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Ui,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Ji(e,this.id,this.term,++this.seq,this.o.now()))}}const nr="modulepreload",ar=function(t){return"/nyx/"+t},Dn={},ir=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");r=s(n.map(u=>{if(u=ar(u),u in Dn)return;Dn[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":nr,c||(m.as="script"),m.crossOrigin="",m.href=u,d&&m.setAttribute("nonce",d),document.head.appendChild(m),c)return new Promise((g,b)=>{m.addEventListener("load",g),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var rr=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Qt=[.25,.5,.75,1,1.5,2],or=4.9,j={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},$e={fmt:"wet"},J={fmt:"pct"},Ie={fmt:"db"},ut={fmt:"signedPct"},Yt={fmt:"num",suffix:" ms"},B={div:100};function A(t,e,n,i,r,o,s,l){var d={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(l)for(var u in l)d[u]=l[u];return d}function pt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Qe=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:j.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:j.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:j.hpQ},{dsp:{law:j.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:j.bpHz,astrid:!0},{dsp:{law:j.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:j.bpQ},{dsp:{law:j.bpQ}}),A("mix","Mix",0,100,100,3,$e,{dsp:B,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:pt(rr),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,J,{dsp:B,unit:"%"}),A("mix","Wet/dry",0,100,0,3,$e,{dsp:B,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:j.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:pt([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,J,{dsp:B,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,ut,{dsp:B,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,Yt,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:B,unit:"%"}),A("decay","Decay",0,100,50,3,J,{dsp:B,unit:"%"}),A("damping","Damping",0,100,0,4,J,{dsp:B,unit:"%"}),A("mix","Mix",0,100,0,5,$e,{dsp:B,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),A("depth","Depth",0,100,70,2,J,{dsp:B,unit:"%"}),A("feedback","Feedback",-90,90,50,3,ut,{dsp:B,unit:"%"}),A("mix","Mix",0,100,50,4,$e,{dsp:B,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),A("depth","Depth",0,100,50,2,J,{dsp:B,unit:"%"}),A("spread","Spread",0,100,70,3,J,{dsp:B,unit:"%"}),A("mix","Mix",0,100,40,4,$e,{dsp:B,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),A("depth","Depth",0,100,70,2,J,{dsp:B,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:pt([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,J,{dsp:B,unit:"%"}),A("mix","Mix",0,100,50,5,$e,{dsp:B,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,Ie,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,Ie,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:j.midHz,astrid:!0},{dsp:{law:j.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:j.eqQ},{dsp:{law:j.eqQ}}),A("high_db","High",-18,18,0,4,Ie,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,Ie,{unit:"dB"}),A("mix","Mix",0,100,100,3,$e,{dsp:B,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:pt([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:j.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,ut,{dsp:B,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,ut,{dsp:B,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,Ie,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:j.ratio},{dsp:{law:j.ratio}}),A("attack_ms","Attack",1,100,10,3,Yt,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,Yt,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,Ie,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,J,{dsp:B,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:B})]}],sr=Qe.map(function(t){return t.type});Qe.filter(function(t){return!t.hidden}).map(function(t){return t.type});var lr={reverb:"plate"};function xn(t){var e=lr[t]||t;return sr.indexOf(e)>=0?e:null}function de(t){for(var e=xn(t),n=0;n<Qe.length;n++)if(Qe[n].type===e)return Qe[n];return null}function je(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Ra(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=je(n.law,e);return i===null?0:i}function Yn(t,e){return Math.min(or,t*60/(e>0?e:120))}var Xn=function(t){return t>0?"+":t<0?"−":""};function cr(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Ba(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:Xn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Xn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=je(i.law,e),r===null?i.zero||"open":i.astrid?cr(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+je(i.law,e).toFixed(1);case"ratio":return je(i.law,e).toFixed(1)+":1";case"rate":return r=je(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Yn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Yn(e,n)*1e3)+" ms"}return String(e)}var dr=1,Bt=["drive","delay","plate"];function ur(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return Ba(t,i,r)},e}var et=Bt.map(function(t){var e=de(t),n={type:t,label:e.label,dials:e.dials.map(ur)};return e.tempoSynced&&(n.tempoSynced=!0),n}),pr={reverb:"plate"};function $t(t){var e=pr[t]||t;return Bt.indexOf(e)>=0?e:null}function jt(t){for(var e=$t(t),n=0;n<et.length;n++)if(et[n].type===e)return et[n];return null}function ja(t,e){var n=jt(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function We(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function be(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function hr(){return{v:dr,chain:et.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function mr(t){return Qt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Qt[0])}function Xt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function fr(t){for(var e=Array.isArray(t)?t:Xt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=hr(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(Xt(l)){var d=$t(l.type);if(!d){typeof l.type=="string"&&o.push(l.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var u=i.chain[Bt.indexOf(d)],c=Xt(l.dials)?l.dials:{};d==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,jt(d).dials.forEach(function(h){u.dials[h.key]=be(h,c[h.key])}),gr(d,u.dials,c)}}return{state:i,dropped:o}}function gr(t,e,n){for(var i=jt(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=be(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],We(o,e)))}}function en(t){return fr(t).state}function br(t){return JSON.parse(JSON.stringify(t))}var yr=24,tn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function nn(t,e,n){if(e==="bypass")return n?0:1;var i=ja(t,e)||wr(t,e);return i?Ra(i,n):0}function wr(t,e){var n=de(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var vr={};et.forEach(function(t){t.dials.forEach(function(e){vr[t.type+"."+e.key]=e.format})});function _t(t,e){var n=new Float64Array(yr),i=en(t);return i.chain.forEach(function(r){var o=tn[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=nn(r.type,s,r.dials[s])})}),n}var $r=2,kt=3,kr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ue(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Pa(t,e){var n=de(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function xr(t){var e=de(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Sr(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function Ar(t){return typeof t=="number"&&isFinite(t)?mr(t):t}function _n(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=Ar(o)),i[r.key]=be(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=be(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],We(r,i)))}),i}function Lr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=je(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,i=o)}return i}}var Mr={rate:"rate_hz"};function Er(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Mr[o.key]||o.key;r[o.key]=Lr(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Cr(t,e){var n=e>0?Math.floor(e):kt,i=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):Ue(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var d=[],u=0;u<o.length;u++){var c=o[u];if(Ue(c)&&!(c.type==="limiter"||c.fixed===!0)){var h=xn(c.type),m=h&&de(h);if(!m||s&&["drive","delay","plate"].indexOf(h)<0){typeof c.type=="string"&&i.push(c.type);continue}if(d.length>=n){i.push(c.id||h);continue}var g;Ue(c.params)&&!Ue(c.dials)?g=_n(m,Er(m,c.params,r,c.id||h),l):g=_n(m,Ue(c.dials)?c.dials:{},l);var b=Pa(h,d),y=typeof c.id=="string"&&kr.test(c.id)&&!d.some(function(f){return f.id===c.id})?c.id:b.id,p=s?c.bypass!==!1:c.bypass===!0;d.push({id:s?b.id:y,type:h,bypass:p,dials:g})}}return{state:{v:$r,chain:d},dropped:i,notes:r}}function bt(t,e){return Cr(t,e).state}function Ne(t){var e=de(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Ra(i,t.dials[i.key])])}),n}function Tr(t){var e=bt(t,8),n=[],i=e.chain.map(function(r,o){var s=de(r.type),l={};return o>=kt&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=r.dials[d.key];if(d.more){u!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&Qt.indexOf(u)<0&&n.push(r.id+".delay_beats"),l[d.astridKey||d.key]=u}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:i,lossy:n}}var Ir="nc-fx@1",Nr=600,zr=256,Rr=8,qe=typeof WeakMap=="function"?new WeakMap:null;function Br(t,e){var n=qe&&qe.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await ir(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),qe&&(qe.set(t,n),n.catch(function(){qe.delete(t)})),n)}function ze(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Oa(t,e,n,i){var r=Math.min(400,Math.max(20,ze(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",d=ze(e.preGain,1),u=Math.max(0,ze(e.crossfade,.012)),c=ze(e.maxDelaySeconds,void 0),h=t.createGain(),m=t.createGain(),g=t.createGain(),b=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,h.connect(g),g.connect(m),b.connect(m);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},f=n(r);p.post=function(w){p.node?p.node.port.postMessage(w):p.disposed||(o.length>=zr&&(o=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push(w))};function v(w){var x=o.map(function(M){var T=Object.assign({},M);return T.when>w||(T.when=0,T.t!=="clear"&&(T.snap=!0)),T});return o=[],x}p.emit=function(w){for(var x=0;x<p.listeners.length;x++)try{p.listeners[x](w)}catch(M){typeof console<"u"&&console.error(M)}},p.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var $=!1;p.tooFar=function(w){return typeof w=="number"&&w>t.currentTime+Nr?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var L=Br(t,e.moduleUrl).then(function(){if(!p.disposed){var w=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:d,maxDelaySeconds:c},f);w.pending=v(t.currentTime),p.node=new AudioWorkletNode(t,Ir,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(b);var x=t.currentTime;x<=0||u===0?(g.gain.value=0,b.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+u),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+u)),p.status="ready"}},function(w){p.status="unavailable",o=[],p.error=w});return p.core={input:h,output:m,modInput:y,ready:L,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(w,x){var M=ze(w,NaN);!(M>0)||p.disposed||p.tooFar(x)||(p.bpm=Math.min(400,Math.max(20,M)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(x)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(w){var x=w&&typeof w=="object"?w:{at:w};if(!(p.disposed||p.tooFar(x.at))){var M=ze(x.fadeMs,0);p.post({t:"clear",when:p.whenOf(x.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function(w){return p.listeners.push(w),function(){var x=p.listeners.indexOf(w);x>=0&&p.listeners.splice(x,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,g,b,m,y].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},p}function jr(t,e){var n=e||{};if(n.slots)return Pr(t,n);var i=en(n.state),r=Array.from(_t(i)),o=Oa(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(_t(i)),when:0}]}),s=o.core;function l(d){return i.chain[Bt.indexOf(d)]}return s.setParam=function(d,u,c,h){var m=$t(d);if(!(!m||o.disposed||o.tooFar(h))){var g=l(m),b;if(u==="bypass")b=!!c;else{var y=ja(m,u);if(!y)return;b=be(y,c,We(y,g.dials))}return u==="bypass"?g.bypass=b:g.dials[u]=b,o.post({t:"p",i:tn[m][u],v:nn(m,u,b),when:o.whenOf(h)}),o.emit({effect:m,key:u,value:b}),jt(m).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function($){return $.key===u}))){var f=g.dials[p.key],v=be(p,f,We(p,g.dials));v!==f&&(g.dials[p.key]=v,o.post({t:"p",i:tn[m][p.key],v:nn(m,p.key,v),when:o.whenOf(h)}),o.emit({effect:m,key:p.key,value:v}))}}),b}},s.getParam=function(d,u){var c=$t(d);if(c){var h=l(c);return u==="bypass"?h.bypass:h.dials[u]}},s.getState=function(){return br(i)},s.setState=function(d,u){o.disposed||o.tooFar(u&&u.at)||(i=en(d),o.post({t:"load",program:Array.from(_t(i)),when:o.whenOf(u&&u.at)}),o.emit({effect:null,key:null,value:null}))},s}function Pr(t,e){var n=e.slots===!0?kt:Math.max(1,Math.min(Rr,Math.floor(+e.slots)||kt)),i=bt(e.state,n),r=1,o={};function s(p){return o[p.id]||(o[p.id]=r++),o[p.id]}function l(p){return p.map(function(f){return{uid:s(f),type:f.type,program:Ne(f)}})}var d=l(i.chain),u=i.chain.map(function(p){return o[p.id]}),c=Oa(t,e,function(){return{slots:n,chain:d,order:u}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(p){return o[p.id]}),when:0}]}),h=c.core;function m(p){var f;for(f=0;f<i.chain.length;f++)if(i.chain[f].id===p)return i.chain[f];var v=xn(p);if(v){for(f=0;f<i.chain.length;f++)if(i.chain[f].type===v)return i.chain[f]}return null}function g(p,f){var v=s(p);c.post({t:"add",uid:v,type:p.type,when:f}),Ne(p).forEach(function($){c.post({t:"ps",uid:v,k:$[0],v:$[1],when:f,snap:!0})})}function b(p){c.post({t:"order",uids:i.chain.map(function(f){return o[f.id]}),when:p})}function y(p,f){var v={};i.chain.forEach(function(w){v[w.id]=w});var $=i.chain.map(function(w){return o[w.id]}).join();p.chain.forEach(function(w){var x=v[w.id];if(!x||x.type!==w.type){delete o[w.id],g(w,f);return}var M={};Ne(x).forEach(function(T){M[T[0]]=T[1]}),Ne(w).forEach(function(T){M[T[0]]!==T[1]&&c.post({t:"ps",uid:o[w.id],k:T[0],v:T[1],when:f})})});var L={};p.chain.forEach(function(w){L[w.id]=!0}),Object.keys(o).forEach(function(w){L[w]||delete o[w]}),i=p,i.chain.map(function(w){return o[w.id]}).join()!==$&&b(f)}return h.slots=n,h.setParam=function(p,f,v,$){var L=m(p);if(!(!L||c.disposed||c.tooFar($))){var w=de(L.type),x,M=null;if(f==="bypass")x=!!v;else{for(var T=0;T<w.dials.length;T++)w.dials[T].key===f&&(M=w.dials[T]);if(!M)return;x=be(M,v,We(M,L.dials))}var q={},V={};Ne(L).forEach(function(z){q[z[0]]=z[1]}),w.dials.forEach(function(z){z.stepWhen&&(V[z.key]=L.dials[z.key])}),f==="bypass"?L.bypass=x:L.dials[f]=x,w.dials.forEach(function(z){z.stepWhen&&(L.dials[z.key]=be(z,L.dials[z.key],We(z,L.dials)))});var Ae=c.whenOf($),Le=o[L.id];return Ne(L).forEach(function(z){(q[z[0]]!==z[1]||M&&z[0]===M.k)&&c.post({t:"ps",uid:Le,k:z[0],v:z[1],when:Ae})}),c.emit({effect:L.id,key:f,value:x}),Object.keys(V).forEach(function(z){z!==f&&L.dials[z]!==V[z]&&c.emit({effect:L.id,key:z,value:L.dials[z]})}),x}},h.getParam=function(p,f){var v=m(p);if(v)return f==="bypass"?v.bypass:v.dials[f]},h.getState=function(){return JSON.parse(JSON.stringify(i))},h.setState=function(p,f){c.disposed||c.tooFar(f&&f.at)||(y(bt(p,n),c.whenOf(f&&f.at)),c.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,f){var v=f||{},$=Pa(p,i.chain);if(!(!$||i.chain.length>=n||c.disposed||c.tooFar(v.at))){if(v.dials){var L=bt({v:2,chain:[{id:$.id,type:$.type,dials:v.dials}]},1).chain[0];$.dials=L.dials}v.bypass===!0&&($.bypass=!0);var w=i.chain.slice(),x=typeof v.index=="number"?Math.max(0,Math.min(w.length,v.index)):w.length;return w.splice(x,0,$),y({v:2,chain:w},c.whenOf(v.at)),c.emit({effect:$.id,key:"chain",value:"add"}),$.id}},h.removeEffect=function(p,f){var v=m(p),$=f&&f.at;return!v||c.disposed||c.tooFar($)?!1:(y({v:2,chain:i.chain.filter(function(L){return L!==v})},c.whenOf($)),c.emit({effect:v.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,f,v){var $=m(p),L=v&&v.at;if(!$||c.disposed||c.tooFar(L))return!1;var w=Sr(i.chain,i.chain.indexOf($),f);return w===i.chain?!1:(y({v:2,chain:w},c.whenOf(L)),c.emit({effect:$.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:xr(p),bypass:p.bypass}})},h.toAstrid=function(){return Tr(i)},h}function Un(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Or(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(m){return r.toContextTime(m)}:e&&e.timebase==="shared"?null:function(m){return m},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,d=l&&l.tempo?l.tempo:l,u=!1;function c(m){if(!o){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof m!="number")){var g=o(l.timeAt(m));return typeof g=="number"&&isFinite(g)?g:void 0}}function h(){var m=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(m)){var g=l&&typeof l.bpm=="number"?l.bpm:Un(d,0);g>0&&t.setTempo(g);return}var b=Un(d,m);b>0&&t.setTempo(b);for(var y=d&&(d.points||d.tempoPoints)||[],p=0;p<y.length;p++){var f=y[p];if(f.beat>m&&f.bpm>0){var v=c(f.beat);v!==void 0&&t.setTempo(f.bpm,v)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(m){m&&(m.kind==="tempo"&&m.bpm>0?t.setTempo(m.bpm,c(m.atBeat)):(m.kind==="snapshot"||m.kind==="start")&&h())})}const Wr="/nyx/assets/worklet-CnpUVY5i.js";var Gr="nc-ui",Wa={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},an={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ke={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Ke=t=>`--${Gr}-${t}`,rn=Wa["label-on-fill-dark"],qn=Wa["label-on-fill-light"],Fr=ke["label-min-contrast"],Hr=/^#[0-9a-f]{6}$/i,Zr=t=>typeof t=="string"&&Hr.test(t),yt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Vn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${yt(r(0)*255)}${yt(r(8)*255)}${yt(r(4)*255)}`}function Ga(t){let[e,n,i]=[1,3,5].map(u=>parseInt(t.slice(u,u+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/l%6):r===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:s}}function Kn(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function on(t,e){let[n,i]=[Kn(t),Kn(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var xt=t=>on(t,rn)>=on(t,qn)?rn:qn;function Fa(t,e,n,i=Fr){let r=Vn(t,e,n),o=xt(r)===rn?1:-1;for(let s=0;s<40&&on(r,xt(r))<i;s++)n+=o*.01,r=Vn(t,e,n);return r}function Dr(t){let{h:e,s:n}=Ga(t),i=Fa(e,Math.min(n,ke["surprise-on-max-saturation"]),ke["surprise-on-lightness"]);return{fill:t,ink:xt(t),on:i,onInk:xt(i)}}var Yr=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Xr(t,e=Math.random){let[n,i]=ke["surprise-saturation"],[r,o]=ke["surprise-lightness"],s=ke["surprise-min-hue-gap"],l=Zr(t)?Ga(t).h:null,d=e()*360;return l!==null&&Yr(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),Fa(d,n+e()*(i-n),r+e()*(o-r))}function _r(t){if(!t)return null;let e=Dr(t);return{[Ke("surprise-fill")]:e.fill,[Ke("surprise-ink")]:e.ink,[Ke("surprise-on")]:e.on,[Ke("surprise-on-ink")]:e.onInk}}var Ur=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,qr=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Jn(t){let[e,n,i]=[1,3,5].map(l=>Ur(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Vr([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>yt(qr(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Kr=ke["velocity-range"],Ha={min:an.rhythm["velocity-min"],max:an.rhythm["velocity-max"]};function Jr(t,e=Ha){let[n,i]=Kr,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=an.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=Jn(e.min),d=Jn(e.max);return{velocity:r,t:o,fill:Vr(l.map((u,c)=>u+(d[c]-u)*o)),ink:s}}function Qn(t,e=Ha){return{[Ke("velocity-fill")]:Jr(t,e).fill}}var Qr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},eo={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},to={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},no={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Pt={};for(let[t,e]of Object.entries(eo))Pt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(no))Pt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(to))Pt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Qr.renames.map(t=>[t.old,t.new]));function Za(t){let e=Pt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function W(t){return Za(t).prop}function a(t){return`var(${W(t)})`}function ao(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(W(e)));return Number.isFinite(n)?n:0}function H(t,e){let n=Za(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function io(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function ro(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var oo="[data-modulated], [data-modulated] *";function so(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${W("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${W("divider")}: ${a(`module-div-stack-${i}`)};
      ${W("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${W("text-sub")}: ${a("module-sub-stack-1")};
      ${W("divider")}: ${a("module-div-stack-1")};
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
${oo} { transition: none; }
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
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
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
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${a("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${a("target-min")} * 1.5);
  padding: ${a("control-gap")} ${a("control-gap")} ${a("control-gap")} calc(${a("control-gap")} * 2);
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${a("control-gap")};
  inset-inline-start: ${a("hairline")};
  width: ${a("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { font-weight: ${a("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${a("text-sub")}; font-size: ${a("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${a("control-gap")};
  inset-inline-end: ${a("control-gap")};
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${a("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${a("control-gap")};
  border-color: ${a("divider")};
  background: ${a("divider")};
  color: ${a("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${a("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${a("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${a("accent")}; box-shadow: inset 0 0 0 ${a("hairline")} ${a("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${a("target-min")};
  padding: 0 ${a("control-gap")};
  border: ${a("hairline")} solid ${a("accent")};
  border-radius: ${a("slot-radius")};
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${a("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${a("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
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
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${a("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${a("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
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
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${a("module-bg-stack-1")};
  ${W("text-sub")}: ${a("module-sub-stack-1")};
  ${W("divider")}: ${a("module-div-stack-1")};
  ${W("slider-track")}: ${a("module-div-stack-1")};
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
  ${W("text-sub")}: ${a("module-sub-stack-1")};
  ${W("divider")}: ${a("module-div-stack-1")};
  ${W("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${W("text-sub")}: inherit;
  ${W("divider")}: inherit;
  ${W("slider-track")}: inherit;
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
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${a("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${a("strip-alt-bg")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${a("stack-card-pad-y")} ${a("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${a("stack-card-pad-y")} ${a("module-pad")}; }
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
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${a("module-pad-y-desktop")};
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
`}var Ut=null,lo="nc-ui-fallback";function Da(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ut&&Ut.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${lo} {
${so()}
}
`,t.head.append(e),Ut=e}var Ve=null,co=0,uo=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Ya=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=uo,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Ya(document);function po({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(Ve||l?.aborted)return Promise.resolve(!1);let d=o?.ownerDocument??document,u=Ya(d),c=o??d.body,h=d.defaultView??globalThis,m=`nc-ui-confirm-${++co}`,g=(I,ue,re)=>{let Ee=d.createElement(I);return Ee.className=`nc-ui-confirm${ue}`,re!=null&&(Ee.textContent=re),Ee},b=g("div","-layer");b.dataset.state="enter";let y=g("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${m}-t`),y.setAttribute("aria-describedby",`${m}-b`);let p=g("h2","-title",t);p.id=`${m}-t`;let f=g("p","-body",e);f.id=`${m}-b`;let v=g("div","-actions"),$=(I,ue)=>{let re=g("button","-btn",I);return re.type="button",re.dataset.ncConfirm=ue,re.addEventListener("click",()=>Me(ue==="ok")),re},L=$(i,"cancel"),w=$(n,"ok");r&&(w.dataset.danger="true"),v.append(L,w),y.append(p,f,v),b.append(y);let x={layer:b};Ve=x;let M=s??d.activeElement,T=[];for(let I of c.children)I.hasAttribute("inert")||(I.setAttribute("inert",""),T.push(I));let q=()=>{if(Ve!==x)return;c.append(b),L.focus({preventScroll:!0});let I=h.requestAnimationFrame?.bind(h)??(ue=>setTimeout(ue,16));I(()=>I(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};u?u.then(q):q();let V=!1;b.addEventListener("pointerdown",I=>{V=I.target===b}),b.addEventListener("click",I=>{I.target===b&&V&&Me(!1),V=!1});let Ae=I=>{I.stopImmediatePropagation(),I.key==="Escape"?(I.preventDefault(),Me(!1)):I.key==="Tab"?(I.preventDefault(),(d.activeElement===L?w:L).focus()):I.key==="Enter"&&(I.preventDefault(),d.activeElement===w?Me(!0):d.activeElement===L&&Me(!1))},Le=I=>I.stopImmediatePropagation();h.addEventListener("keydown",Ae,!0),h.addEventListener("keyup",Le,!0);let z=()=>Me(!1);l?.addEventListener("abort",z);let Gn,ji=new Promise(I=>{Gn=I});function Me(I){if(Ve!==x)return;Ve=null,h.removeEventListener("keydown",Ae,!0),h.removeEventListener("keyup",Le,!0),l?.removeEventListener("abort",z);for(let Ce of T)Ce.removeAttribute("inert");b.dataset.state="closing",M?.isConnected&&typeof M.focus=="function"&&M.focus({preventScroll:!0});let ue=h.getComputedStyle?.(b),re=Math.max(0,...String(ue?.transitionDuration??"").split(",").map(Ce=>Number.parseFloat(Ce)*(Ce.trim().endsWith("ms")?1:1e3)||0)),Ee=()=>b.remove();b.addEventListener("transitionend",Ce=>Ce.target===b&&Ee()),setTimeout(Ee,re+50),Gn(I)}return ji}function Xa(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let d=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var _a=new WeakMap,ea=.25;function ho(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,l=t.onChange,d=t.onReset,u=p=>Math.min(1,Math.max(0,p)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=p=>{let f=u(p);f!==o&&(o=f,c(),l?.(f))},m=0,g=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();p.target!==r&&f.height>0&&h(1-(p.clientY-f.top)/f.height),m=p.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!g)return;let f=n.getBoundingClientRect().height||1,v=(m-p.clientY)/f*(p.shiftKey?ea:1);m=p.clientY,h(o+v)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),n.addEventListener("keydown",p=>{let f=p.shiftKey?s*ea:s,v={ArrowUp:o+f,ArrowRight:o+f,ArrowDown:o-f,ArrowLeft:o-f,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in v&&(p.preventDefault(),h(v[p.key]))});let y={el:n,get value(){return o},get dragging(){return g},set(p){g||(o=u(Number(p)||0),c())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(d=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),_a.set(n,y),y}function mo(t){return _a.get(t)}var Ua=new WeakMap,fo=.2,go=1.5,bo=.5;function yo(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function ta(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:yo(i.getComputedStyle(t).getPropertyValue(W(e)),n)}function wo(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let f=e.createElement("span");f.className="nc-meter-peak";let v=e.createElement("span");v.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",p.append(f,v,$),o.append(p),s.push({peak:f,rms:v,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let l=t.label,d=t.onClear,u=!1,c=-1,h=-1,m=()=>{r.dataset.lit=u?"true":"false",r.setAttribute("aria-pressed",u?"true":"false"),r.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),r.title=u?"Clipped. Click to clear":"Clip light"},g=(y,p,f,v)=>{let $=Math.round(v*1e3)/1e3;f[p]!==$&&(f[p]=$,y.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};r.addEventListener("click",()=>{b.clear(),d?.()});let b={el:i,get clipped(){return u},update(y,p){c<0&&(c=ta(i,"motion-meter-fall",fo)),h<0&&(h=ta(i,"motion-meter-hold",go));let f=Math.max(0,Math.min(.25,Number(p)||0)),v=c>0?Math.exp(-f/c):0;s.forEach(($,L)=>{let w=y[L]??y[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(w.peak)||0)),M=Math.min(x,Math.max(0,Number(w.rms)||0));w.over&&b.clip(),$.level.peak=x>=$.level.peak?x:x+($.level.peak-x)*v,$.level.rms=M>=$.level.rms?M:M+($.level.rms-M)*v,$.holdAge+=f,x>=$.holdAt?($.holdAt=x,$.holdAge=0):$.holdAge>h&&($.holdAt=Math.max(x,$.holdAt-bo*f)),g($.peak,"peak",$.shown,$.level.peak),g($.rms,"rms",$.shown,$.level.rms),g($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,m())},clear(){u=!1,m()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,m()},configure(y){y.onClear&&(d=y.onClear)}};return m(),b.reset(),Ua.set(i,b),b}function vo(t){return t?Ua.get(t):void 0}function $o(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function pe(t){return Math.max(0,Math.min(1,t))}function qa(t,e){let{ctx:n,w:i,h:r}=$o(t);if(!n)return;n.clearRect(0,0,i,r);let o=ro(t);if(e.paint==="swatch"){let d=H(t,"accent"),u=H(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,i/2,r),n.fillStyle=u,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let d=e.mode??"lp",u=H(t,io(d)),c=H(t,"divider"),h=pe(e.cutoff??.5),m=.08+(1-pe(e.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=i;g++){let b=g/Math.max(1,i),y=0;d==="lp"?y=b<h?1:Math.max(0,1-(b-h)/m):d==="hp"?y=b>h?1:Math.max(0,1-(h-b)/m):y=Math.max(0,1-Math.abs(b-h)/m);let p=r*.78-y*r*.62;g===0?n.moveTo(g,p):n.lineTo(g,p)}n.strokeStyle=u,n.stroke(),n.fillStyle=H(t,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),t.dataset.ncAccent=u;return}if(e.paint==="envelope"){n.strokeStyle=H(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let u=0;u<=i;u++){let c=u/Math.max(1,i),h=(r-4)*(1-Math.exp(-c*4/d));n.lineTo(u,r-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let d=Array.isArray(e.peaks)?e.peaks:[],[u,c]=Array.isArray(e.region)?e.region:[0,1],h=H(t,"accent"),m=H(t,"text-sub"),g=r/2;n.fillStyle=H(t,"accent-soft"),n.fillRect(pe(u)*i,0,(pe(c)-pe(u))*i,r),n.strokeStyle=H(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(i,g),n.stroke();let b=Math.floor(d.length/2);for(let y=0;y<b;y++){let p=(y+.5)/b*i,f=Math.max(-1,Math.min(1,d[y*2]??0)),v=Math.max(-1,Math.min(1,d[y*2+1]??0)),$=(y+.5)/b;n.strokeStyle=$>=u&&$<=c?h:m,n.beginPath(),n.moveTo(p,g-v*(g-1)),n.lineTo(p,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[u,c,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round(pe(y)*(i-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,r),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=H(t,"text"),n.fillRect(Math.round(pe(e.position)*(i-1)),0,1,r)),b||(n.fillStyle=m,n.font=o,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let d=pe(e.level??0);n.fillStyle=H(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=H(t,"accent"),n.fillRect(0,r*.4,i*d,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=H(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=H(t,"rhythm.playhead"),n.fillRect(l/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=H(t,"accent")}var Va={slop:8,longPressMs:500,pitchPx:16},ko=class{constructor(t,e,n=Va){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xo(t,e,n,i=Va){let r=!1,o=0,s=(u,c)=>{let h=t.ownerDocument.elementFromPoint?.(u,c),m=[...t.querySelectorAll(e)],g=h?m.findIndex(p=>p===h||p.contains(h)):-1;if(g>=0)return g;let b=-1,y=Number.POSITIVE_INFINITY;return m.forEach((p,f)=>{if(p.hidden)return;let v=p.getBoundingClientRect();if(c<v.top||c>v.bottom)return;let $=Math.abs(u-(v.left+v.width/2));$<y&&$<=v.width&&(b=f,y=$)}),b},l=new ko(s,u=>{(u.kind==="paint"||u.kind==="long")&&(r=!0),n(u)},i),d=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",u=>{u.button>0||(r=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",u=>{d(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),t.addEventListener("pointercancel",u=>{d(),l.cancel(u.pointerId)}),t.addEventListener("click",u=>{r&&(r=!1,u.stopPropagation(),u.preventDefault())},!0),t.addEventListener("contextmenu",u=>u.preventDefault()),l}var ht="application/x-nc-pad",na="http://www.w3.org/2000/svg";function So(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),i=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*e/n),l=Math.max(s+1,Math.floor((o+1)*e/n)),d=0,u=0;for(let h=s;h<l;h++)d=Math.min(d,t[2*h]??0),u=Math.max(u,t[2*h+1]??0);let c=n===1?50:o/(n-1)*100;i.push(`${c.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${i.join("L")}L${r.reverse().join("L")}Z`}function Ao(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let i=document.createElement("div");return i.className="nc-padgrid-pads",i.dataset.ncColumns=String(t.columns??2),t.pads.forEach((r,o)=>i.append(Lo(n,o,e))),n.append(i),n.addEventListener("keydown",r=>{r.key==="Escape"&&wt(n)}),Ja(n,t),n}function Lo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-padgrid-pad",i.dataset.ncPad=String(e);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(na,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(na,"path");return d.append(u),i.append(r,o,s,l,d),Eo(t,i,e,n),i.addEventListener("dblclick",()=>{let c=n(t);c?.type==="padGrid"&&c.onRename&&i.dataset.empty!=="true"&&Ka(t,i,e,n)}),i.addEventListener("dragstart",c=>{if(i.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(ht,String(e)),c.dataTransfer.effectAllowed="copyMove",i.dataset.dragging="true"}),i.addEventListener("dragend",()=>delete i.dataset.dragging),i.addEventListener("dragover",c=>{let h=c.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(ht)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=h.includes(ht)&&!c.altKey?"move":"copy"),i.dataset.drop="true")}),i.addEventListener("dragleave",()=>delete i.dataset.drop),i.addEventListener("drop",c=>{delete i.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let m=c.dataTransfer?.getData(ht);if(m!==void 0&&m!==""){c.preventDefault(),c.stopPropagation();let b=Number(m);b!==e&&h.onMove?.(b,e,c.altKey);return}let g=c.dataTransfer?.files?.[0];g&&(c.preventDefault(),c.stopPropagation(),h.onFile?.(e,g))}),i}function Mo(t,e,n){let i=n(t);i?.type==="padGrid"&&i.onPress(e)}function Eo(t,e,n,i){let r=0,o=!1,s=0,l=0,d=()=>{window.clearTimeout(r),r=0};e.addEventListener("pointerdown",u=>{if(u.button!==0)return;o=!1,s=u.clientX,l=u.clientY,d();let c=i(t);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&u.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=aa(t,e,n,i)},450)))}),e.addEventListener("pointermove",u=>{r&&Math.hypot(u.clientX-s,u.clientY-l)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])e.addEventListener(u,d);e.addEventListener("contextmenu",u=>{u.preventDefault(),d(),o=aa(t,e,n,i)}),e.addEventListener("click",()=>{if(o){o=!1;return}Mo(t,n,i)})}function aa(t,e,n,i){let r=i(t);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;wt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),wt(t)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let c of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=c.id,h.textContent=c.label,h.addEventListener("click",()=>{wt(t);let m=i(t);m?.type==="padGrid"&&(c.id==="rename"&&m.onRename?Ka(t,e,n,i):m.onMenu?.(n,c.id))}),l.append(h)}t.append(s,l);let d=t.getBoundingClientRect(),u=e.getBoundingClientRect();return l.style.left=`${u.left-d.left}px`,l.style.top=`${u.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function Ka(t,e,n,i){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=i(t);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let d=!1,u=c=>{if(d)return;d=!0;let h=o.value.trim();o.remove(),e.focus();let m=i(t);c&&h&&m?.type==="padGrid"&&m.onRename?.(n,h)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?u(!0):c.key==="Escape"&&u(!1)}),o.addEventListener("blur",()=>u(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,h=>h.stopPropagation());t.append(o),o.focus(),o.select()}function wt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Ja(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((i,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),d=o.querySelector(".nc-padgrid-pad-wave path"),u=o.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=i.empty?"":i.badge??""),o.draggable=!i.empty,i.empty?(o.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=i.label),l&&(l.textContent=""),d?.setAttribute("d",So(i.peaks))),i.lane?o.dataset.ncLane=String(i.lane):delete o.dataset.ncLane;let c=e.selected===r;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),i.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",i.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${i.label}${i.badgeLabel?`, ${i.badgeLabel}`:""}${c?", selected":""}`)})}function X(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Ot(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function ia(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function nt(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Co=450,ra=8;function le(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function To(t){let e=ao(t,"target-min");return e>0?e:44}function Io(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=To(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,u=l.top+l.height/2,c=d-i,h=d+i,m=u-i,g=u+i;for(let b=0;b<e.length;b++){if(o===b)continue;let y=r[b];if(!y||y.width===0)continue;let p=y.left+y.width/2,f=y.top+y.height/2;Math.abs(f-u)<i*2&&(p>d?h=Math.min(h,(d+p)/2):p<d&&(c=Math.max(c,(d+p)/2))),Math.abs(p-d)<i*2&&(f>u?g=Math.min(g,(u+f)/2):f<u&&(m=Math.max(m,(u+f)/2)))}c=Math.min(c,l.left),h=Math.max(h,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${m-l.top}px`,s.style.width=`${Math.max(0,h-c)}px`,s.style.height=`${Math.max(0,g-m)}px`,s.style.transform="none"}}function Qa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function oa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function St(t,e){switch(t.type){case"slider":return No(t,e);case"select":return Ro(t,e);case"toggle":return Bo(t,e);case"button":return jo(t,e);case"readout":return Po(t);case"label":return Oo(t);case"note":return sa(t);case"knob":return Fo(t,e);case"choice":return Ho(t,e);case"slotRow":return Zo(t,e);case"stepGrid":return _o(t,e);case"canvas":return Vo(t);case"fx":return es(t,e);case"strip":return Ko(t,e);case"stripAdd":return Qo(t,e);case"padGrid":return Ao(t,e);default:return sa({id:"unknown",text:""})}}function ye(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,ei(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??nt(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),ia(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")ia(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Wo(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??nt(e.value))}else if(e.type==="choice")ti(t,e);else if(e.type==="slotRow")ai(t,e);else if(e.type==="stepGrid")sn(t,e);else if(e.type==="padGrid")Ja(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&qa(n,e)}else if(e.type==="strip"){si(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${fa(n.id)}"]`);i instanceof Element&&ye(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")ri(t,e);else if(e.type==="fx"){li(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${fa(n.id)}"]`);i instanceof Element&&ye(i,n)}}}}function No(t,e){let n=Ot(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(zo(t,i,e),r),n.append(X()),ye(n,t),n}function zo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(le());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function Ro(t,e){let n=Ot(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,X()),n}function Bo(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(X()),ye(n,t),n}function jo(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(X()),ye(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=Qa(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&ii(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function Po(t){let e=Ot(t.id,t.label);return e.append(X()),ye(e,t),e}function Oo(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(X()),e}function sa(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(X()),e}function la(t){if(typeof t.valueText=="string")return t.valueText;let e=nt(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function ei(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Wo(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;ei(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",la(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${la(e)}`}function Go(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function Fo(t,e){let n=Ot(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",d=>{o=d.clientY;let u=e(i);s=u&&"value"in u?Number(u.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let u=e(i);if(u?.type!=="knob")return;let c=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-o)*c/120));u.onChange(h)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let u=e(i);if(u?.type!=="knob")return;let c=Go(u,d);c!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,c))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(X()),ye(n,t),n}function Ho(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(o.preventDefault(),u.focus(),u.click())}),n.append(r)}return n.append(X()),ti(n,t),n}function ti(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Zo(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let c=0;c<t.slots.length;c++){let h=t.slots[c],m=document.createElement("span");m.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(c),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,le()),Do(m,g,n,c,e),i.append(m)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Qa(),r.append(le()),r.addEventListener("click",()=>{ii(n);let c=e(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=e(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(i,...r?[r]:[]),n.append(u,o,X()),ni(n,e),ai(n,t),n}function ca(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;Je(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Do(t,e,n,i,r){let o=0,s=0,l=0,d=!1,u=!1,c=!1,h=!1,m=()=>{window.clearTimeout(o),o=0},g=f=>{let v=f.clientX-s,$=f.clientY-l;v*v+$*$>ra*ra&&(d=!0,m())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=f=>{let v=o!==0&&!d&&!u;m(),b(),v&&(c=!0,ca(n,i,r,f))},p=()=>{d=!0,m(),b()};t.addEventListener("pointerdown",f=>{f.button===0&&(b(),u=!1,d=!1,c=!1,s=f.clientX,l=f.clientY,m(),o=window.setTimeout(()=>{o=0,!d&&(u=!0,Yo(n,e,i,r))},Co),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",f=>f.preventDefault()),t.addEventListener("click",f=>{if(c||u||d){c=!1,u=!1,d=!1;return}ca(n,i,r,f)})}function ni(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=da("Save","store"),r=da("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Je(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Je(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Je(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&Je(t)})}function da(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Yo(t,e,n,i){ni(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Je(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ai(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function ii(t){let e=t.dataset.ncLastFill||null,n=Xr(e);t.dataset.ncLastFill=n;let i=_r(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function Xo(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function _o(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=p=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=p,i.append(f),f},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let f of[o,s]){let v=f===p;f.setAttribute("aria-checked",v?"true":"false"),f.tabIndex=v?0:-1}};l(o);for(let p of[o,s])p.addEventListener("click",()=>l(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let f=s.getAttribute("aria-checked")==="true"?o:s;l(f),f.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(i),t.onFill&&d.append(Xo(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&f.onClear?.()}),d.append(p)}n.append(d);for(let p of t.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=p.label,v.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(v.dataset.ncLane=String((p.lane-1)%4+1)),v.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid")return;let x=w.rows.findIndex(M=>M.id===p.id);w.onSelectRow?.(x)}),v.addEventListener("keydown",w=>Uo(n,v,w));let $=[];for(let w of["mute","solo"]){if(!(w==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=w,M.textContent=w==="mute"?"M":"S",M.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${p.label}`),x.append(M,le()),x.addEventListener("click",()=>{let T=e(n);if(T?.type!=="stepGrid")return;let q=T.rows.findIndex(V=>V.id===p.id);(w==="mute"?T.onMute:T.onSolo)?.(q)}),$.push(x)}let L=document.createElement("div");L.className="nc-steps";for(let w=0;w<p.steps.length;w++){let x=document.createElement("span");x.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${p.id}:${w}`,M.setAttribute("aria-label",`${p.label} step ${w+1}`),x.append(M,le()),x.addEventListener("click",T=>{let q=e(n);if(q?.type!=="stepGrid")return;let V=q.rows.findIndex(Le=>Le.id===p.id),Ae=s.getAttribute("aria-checked")==="true";q.onToggle(V,w,T.shiftKey||Ae)}),L.append(x)}if(t.onLength&&L.append(qo(n,L,p,e)),f.append(...$,v,L),t.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=p.id,w.setAttribute("aria-label",`Re-roll ${p.label}`),w.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=oa(),w.append(le()),w.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(M=>M.id===p.id))}),f.append(w)}f.addEventListener("click",w=>{if(w.target!==f)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(M=>M.id===p.id))}),ua(n,L,".nc-step-wrap",e,s,()=>p.id),n.append(f)}let u=document.createElement("div");u.className="nc-pads-head";let c=(p,f,v)=>{let $=document.createElement("button");return $.type="button",$.className=p,$.textContent=f,v&&$.setAttribute("aria-label",v),$},h=c("nc-pads-step","‹","Previous lane"),m=c("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",sn(n,p))}));for(let[p,f]of[[h,-1],[m,1]])p.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let $=v.rows.length;v.onSelectRow?.(((mt(v)+f)%$+$)%$)});if(u.append(h,g,m),t.onDice){let p=c("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=oa(),p.addEventListener("click",()=>{let f=e(n);if(f?.type!=="stepGrid")return;let v=mt(f);v>=0&&f.onDice?.(v)}),u.append(p)}if(t.transport){let p=c("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),u.append(p)}n.append(u);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(p),f.textContent=String(p+1),f.addEventListener("click",v=>{let $=e(n);if($?.type!=="stepGrid")return;let L=mt($);if(L<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(L,p+1);return}let w=s.getAttribute("aria-checked")==="true";$.onToggle(L,p,v.shiftKey||w)}),b.append(f)}return ua(n,b,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[mt(p)]?.id:void 0}),n.append(b),n.append(X()),sn(n,t),n}function mt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function ua(t,e,n,i,r,o){let s="on",l=!0,d=-1,u=(c,h)=>{let m=c.rows[d]?.steps[h];!m||h>=c.rows[d].length||(c.onSet?c.onSet(d,h,s,l):!!m[s]!==l&&c.onToggle(d,h,s==="accent"))};xo(e,n,c=>{let h=i(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(c.kind!=="paint")return;let m=h.rows.findIndex(g=>g.id===o());m>=0&&h.rows[m].length!==c.pad+1&&h.onLength?.(m,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let m=o();d=h.rows.findIndex(b=>b.id===m);let g=h.rows[d]?.steps[c.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}u(h,c.pad)}else if(c.kind==="long"){let m=o(),g=h.rows.findIndex(y=>y.id===m),b=e.querySelectorAll(n)[c.pad];g>=0&&b instanceof HTMLElement&&h.onLongPress?.(g,c.pad,b)}}})}function Uo(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function qo(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(le());let o=u=>{let c=i(t);if(c?.type!=="stepGrid")return;let h=c.rows.findIndex(b=>b.id===n.id),m=c.rows[h];if(!m)return;let g=Math.max(1,Math.min(m.steps.length,u));g!==m.length&&c.onLength?.(h,g)},s=u=>{let c=[...e.querySelectorAll(".nc-step")],h=1;return c.forEach((m,g)=>{let b=m.getBoundingClientRect();b.width>0&&u>=b.left+b.width/2&&(h=g+1)}),h},l=u=>o(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",u=>{let c=i(t);if(c?.type!=="stepGrid")return;let h=c.rows.find(g=>g.id===n.id);if(!h)return;let m={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};u.key in m&&(u.preventDefault(),o(m[u.key]))}),r}var qt=new WeakMap;function pa(t,e){let n=typeof e=="number"?e:null;if(!(qt.has(t)&&qt.get(t)===n)){if(qt.set(t,n),n===null){for(let i of Object.keys(Qn(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(Qn(n)))t.style.setProperty(i,r)}}function sn(t,e){let n=e.rows.some(c=>c.solo),i=t.querySelector("[data-nc-clear]");i&&i.textContent!==(e.clearLabel??"Clear")&&(i.textContent=e.clearLabel??"Clear");let r=t.querySelector(".nc-pads"),o=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let d=t.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&o&&(d.setAttribute("aria-label",`Re-roll ${o.label}`),d.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!e.transport?.playing,h=e.transport?.label??(c?"Stop":"Play");u.textContent!==h&&(u.textContent=h),u.setAttribute("aria-pressed",c?"true":"false");let m=e.transport?.ariaLabel;m?u.setAttribute("aria-label",m):u.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let c=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let h of r.querySelectorAll("[data-nc-pad]")){let m=Number(h.getAttribute("data-nc-pad")),g=o.steps[m];h instanceof HTMLButtonElement&&(h.hidden=!g||!l&&m>=o.length,l&&m>=o.length?h.dataset.out="true":delete h.dataset.out,l&&m===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${m+1}`),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,pa(h,g?.velocity),e.playhead>=0&&m===c?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let c of e.rows){for(let g=0;g<c.steps.length;g++){let b=c.steps[g],y=t.querySelector(`[data-nc-step="${c.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===c.id?p.dataset.selected="true":delete p.dataset.selected;let $=p.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),$.textContent!==c.label&&($.textContent=c.label,$.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?p.dataset.silent="true":delete p.dataset.silent;for(let L of p.querySelectorAll("[data-nc-ms]")){let w=L.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;L.setAttribute("aria-pressed",w?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),pa(y,b.velocity);let f=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;g===f?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!e.onLength&&e.selectedRow===c.id;y.hidden=g>=c.length&&!v,g>=c.length&&v?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${c.id}"]`),m=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&m&&m.nextElementSibling!==h){let g=document.activeElement===h;m.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(c.length)),h.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),h.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Vo(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,X()),e}function Ko(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(b)}),i.append(b)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",b.append(y,le()),b.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(b)}let s=document.createElement("div");s.className="nc-strip-ms";for(let b of["mute","solo"]){if(!(b==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=b,p.textContent=b==="mute"?"M":"S",y.append(p,le()),y.addEventListener("click",()=>{let f=e(n);f?.type==="strip"&&(b==="mute"?f.onMute:f.onSolo)?.()}),s.append(y)}let l=document.createElement("div");l.className="nc-strip-sends";for(let b of t.sends??[])l.append(St({...b,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let u=document.createElement("span");u.className="nc-scale",u.setAttribute("aria-hidden","true");for(let b of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(b.value)),y.textContent=b.label,u.append(y)}let c=ho({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:b=>{let y=e(n);y?.type==="strip"&&y.onChange(b)},onReset:()=>{let b=e(n);b?.type==="strip"&&ma(b)}}),h=wo({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let b=e(n);b?.type==="strip"&&b.onClipClear?.()}});d.append(u,c.el,h.el);let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let g=0;return m.addEventListener("click",b=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(g),b.detail===0?ha(n,m,e):b.detail===1&&(g=window.setTimeout(()=>ha(n,m,e),Jo)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(g);let b=e(n);b?.type==="strip"&&ma(b)}),n.append(i,o,s,l,d,m,X()),si(n,t),n}var Jo=250;function ha(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??nt(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let d=r.value;if(r.remove(),e.hidden=!1,l){let u=n(t);u?.type==="strip"&&u.onTypeIn?.(d)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Qo(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),d=s.value;oi(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(i,s,X()),ri(n,t),n}function ri(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),oi(i))}function oi(t){let e=t.options[0];e&&(e.selected=!0)}function ma(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function si(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?mo(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),vo(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??nt(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let u=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${u}`:u}for(let d of t.querySelectorAll("[data-nc-ms]")){let u=d.getAttribute("data-nc-ms"),c=u==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",c?"true":"false"),d.setAttribute("aria-label",`${u==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let d=e.hacksLabel??"Hacks";l.textContent!==d&&(l.textContent=d),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function es(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=Xa({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(o.el);l?.type==="fx"&&l.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(St(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(St(s,e));n.append(r)}return n.append(X()),li(n,t),n}function li(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function fa(t){return t.replace(/["\\]/g,"\\$&")}function ts(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&qa(n,i)}Io(t)}var Sn="netcomposer.rhythm.hidden.v1",he=new WeakMap;function Vt(){try{return globalThis.localStorage??null}catch{return null}}function ci(t,e=Sn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function ga(t,e,n,i=Sn){let r=ci(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function An(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function ns(t,e){if(!(!t||!e))return An(t).find(n=>n.id===e)}function as(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${An(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function is(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),di(t,e)}function di(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function rs(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=he.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ns(n,i)}function os(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=as(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${ba(r.id)}"]`);o&&di(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${ba(s.id)}"]`);l instanceof Element&&ye(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),is(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(St(l,rs));t.append(o)}}function ba(t){return t.replace(/["\\]/g,"\\$&")}function ss(t,e=Sn){Da();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=ci(Vt(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Xa({labelledBy:o.id,onChange:f=>(he.get(n)??t).onToggle?.(f)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,d);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(o,c,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",m.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,r,h,m),n.setAttribute("aria-labelledby",o.id);let y=f=>{let v=he.get(n)??t;n.dataset.ncOpen=f?"false":"true",h.hidden=f,m.hidden=!f,l.textContent=f?"+":"−",l.setAttribute("aria-expanded",f?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${f?"Show":"Hide"} ${v.title}`),l.title=f?"Show":"Hide",f?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let f=n.dataset.ncOpen==="true";ga(Vt(),(he.get(n)??t).id,f,e),y(f),ln(n.parentElement)}),m.addEventListener("click",()=>{ga(Vt(),(he.get(n)??t).id,!1,e),y(!1),ln(n.parentElement)});let p={el:n,update(f){he.set(n,f),f.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=f.title,c.textContent=f.status??"",f.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),g.textContent=f.summary??f.title,u.el.hidden=f.on===void 0,u.set(f.on===!0),f.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,m.setAttribute("aria-label",`Show ${f.title}`),os(h,f),y(h.hidden),p.redraw()},redraw(){let f=he.get(n);f&&ts(n,An(f))}};return he.set(n,t),y(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function ls(t,e,n="adjacent"){Da(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),ln(t)}function ln(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function ui(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const ft=t=>Math.max(0,Math.min(100,t));function cs(t){const e=ui(t.cutoff),n=ft(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:ft(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:ft(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:ft(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const pi=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function cn(t){const e=cs(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:pi(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function ds(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((i,r)=>i.type!==e.chain[r]?.type))return{whole:!0};const n=[];return e.chain.forEach((i,r)=>{const o=t.chain[r];if(o){o.bypass!==i.bypass&&n.push([i.id,"bypass",i.bypass]);for(const[s,l]of Object.entries(i.dials))o.dials[s]!==l&&n.push([i.id,s,l])}}),{whole:!1,params:n}}const Ge=8,ne=16,dn=10,hi=["1","2","3","4","5","6","7","8","9","0"],mi=[0,2,4,8,16],us=[0,1,2,4,8],un=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],At={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function st(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0}}function Ln(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Mn(){return{length:ne,mute:!1,solo:!1,steps:Array.from({length:ne},Ln)}}function fi(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(At.drive),compressor:structuredClone(At.compressor)}}function pn(){return{v:1,pads:Array.from({length:Ge},(t,e)=>st(e)),lanes:Array.from({length:Ge},Mn),swing:.5,hacks:fi(),slots:Array.from({length:dn},()=>null),active:null,selected:0,master:1}}const ce=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},D=(t,e,n,i)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):i,fe=(t,e,n,i)=>Math.round(D(t,e,n,i)),xe=(t,e)=>typeof t=="boolean"?t:e,Lt=(t,e,n)=>e.includes(t)?t:n,ps=/^[0-9a-f]{16,64}$/;function hs(t,e){const n=ce(t),i=st(e);let r=D(n.start,0,1,0),o=D(n.end,0,1,1);o-r<.001&&([r,o]=[0,1]);const s=mi.includes(n.slices)?n.slices:0,l=Array.isArray(n.cuts)?n.cuts.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):i.name,sample:typeof n.sample=="string"&&ps.test(n.sample)?n.sample:null,mode:Lt(n.mode,["oneshot","gate","loop"],i.mode),dir:Lt(n.dir,["fwd","rev","pingpong"],i.dir),start:r,end:o,slices:s,cuts:s?l:[],tune:fe(n.tune,-24,24,0),fine:fe(n.fine,-100,100,0),fit:us.includes(n.fit)?n.fit:0,attack:D(n.attack,0,.1,i.attack),decay:D(n.decay,.01,4,i.decay),cutoff:D(n.cutoff,-1,1,0),resonance:D(n.resonance,0,1,0),level:D(n.level,0,1,i.level),pan:D(n.pan,-1,1,0),choke:fe(n.choke,0,4,0)}}function ms(t){const e=ce(t);return{on:xe(e.on,!1),accent:xe(e.accent,!1),velocity:D(e.velocity,0,1,.8),chance:D(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:fe(e.slice,0,15,0),pitch:fe(e.pitch,-12,12,0),reverse:xe(e.reverse,!1),cond:Lt(e.cond,un,"always")}}function fs(t){const e=ce(t),n=Array.isArray(e.steps)?e.steps:[];return{length:fe(e.length,1,ne,ne),mute:xe(e.mute,!1),solo:xe(e.solo,!1),steps:Array.from({length:ne},(i,r)=>ms(n[r]))}}function ya(t,e){const n=ce(t),i={...e.dials};for(const[r,o]of Object.entries(ce(n.dials)))r in e.dials&&typeof o=="number"&&Number.isFinite(o)&&(i[r]=o);return{on:xe(n.on,e.on),dials:i}}function gs(t){const e=ce(t),n=ce(e.filter),i=fi();return{filter:{on:xe(n.on,i.filter.on),mode:Lt(n.mode,["lp","hp","bp"],i.filter.mode),cutoff:D(n.cutoff,0,1,i.filter.cutoff),resonance:D(n.resonance,0,1,i.filter.resonance)},drive:ya(e.drive,At.drive),compressor:ya(e.compressor,At.compressor)}}function hn(t){const e=ce(t),n=Array.isArray(e.pads)?e.pads:[],i=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:Ge},(r,o)=>hs(n[o],o)),lanes:Array.from({length:Ge},(r,o)=>fs(i[o])),swing:D(e.swing,.5,.75,.5),hacks:gs(e.hacks)}}function bs(t){const e=ce(t);if(e.v!==1)return pn();const n=Array.isArray(e.slots)?e.slots:[],i=hn(e),r=Array.from({length:dn},(s,l)=>n[l]?hn(n[l]):null),o=e.active===null?null:fe(e.active,0,dn-1,-1);return{v:1,...i,slots:r,active:o!==null&&o>=0&&r[o]?o:null,selected:fe(e.selected,0,Ge-1,0),master:D(e.master,0,1,1)}}function gi(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}function De(t){const e=new Set;for(const n of[t,...t.slots])for(const i of n?.pads??[])i.sample&&e.add(i.sample);return e}function bi(){try{return globalThis.localStorage??null}catch{return null}}function ys(t,e=bi()){try{const n=e?.getItem(t);return n?bs(JSON.parse(n)):pn()}catch{return pn()}}function ws(t,e,n=bi()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const vs=.25;function yi(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function wa(t,e,n){const i=t.start*e.frames,r=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(i),Math.ceil(r)];const o=yi(t),s=Math.min(n,o.length-2);return[Math.floor(i+o[s]*(r-i)),Math.ceil(i+o[s+1]*(r-i))]}function $s(t,e,n,i=0){let o=2**((t.tune+t.fine/100+i)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,l=t.fit*4*(60/n);s>0&&l>0&&(o*=s/l)}return o}const ks=1.5;function En(t,e,n,i,r,o=!1){if(!n.on||!t.sample||!i)return null;const s=n.slice??(t.slices?e%t.slices:null);let[l,d]=wa(t,i,s);const u=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;if(t.mode==="oneshot"&&s!==null&&t.slices&&!o){const[c,h]=wa(t,i,null);u==="fwd"?d=h:u==="rev"&&(l=c)}return{sample:t.sample,from:l,to:d,rate:$s(t,i,r,n.pitch),gain:Math.min(1.5,n.velocity*(n.accent?ks:1))*t.level,pan:t.pan,mode:t.mode,dir:u,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond}}function xs(t,e,n,i=null){return En(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:i,pitch:0,reverse:!1,cond:"always"},e,n,!0)}function Ss(t,e,n){const i=t.lanes.some(r=>r.solo);return{swing:t.swing,lanes:t.lanes.map((r,o)=>{const s=t.pads[o],l=s?.sample?e(s.sample):void 0;return{length:r.length,audible:i?r.solo:!r.mute,steps:r.steps.map((d,u)=>s?En(s,u,d,l,n):null)}})}}const As="/nyx/assets/sampler-processor-7BllxM3H.js",wi=827873614,Ls=60;async function Ms(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),i=[new Uint8Array(n.buffer),...t.map(d=>new Uint8Array(d.buffer))],r=i.reduce((d,u)=>d+u.byteLength,0),o=new Uint8Array(r);let s=0;for(const d of i)o.set(d,s),s+=d.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(l.subarray(0,16),d=>d.toString(16).padStart(2,"0")).join("")}function Es(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([wi,t.sampleRate,t.data.length,e]),t.data.forEach((i,r)=>{n.set(new Uint8Array(i.buffer,i.byteOffset,e*4),16+r*e*4)}),n}function Cs(t,e){if(e.byteLength<16)return null;const[n,i,r,o]=new Uint32Array(e,0,4);if(n!==wi||!r||r>2||e.byteLength!==16+o*4*r)return null;const s=Array.from({length:r},(l,d)=>new Float32Array(e.slice(16+d*o*4,16+(d+1)*o*4)));return{hash:t,data:s,sampleRate:i,channels:r,frames:o}}class Ts{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const i=await Ms(e,n),r={hash:i,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(i,r);const o=await this.folder();if(!o)return{sample:r,saved:!1};try{const l=await(await o.getFileHandle(`${i}.f32`,{create:!0})).createWritable?.();return l?(await l.write(Es(r)),await l.close(),{sample:r,saved:!0}):{sample:r,saved:!1}}catch{return{sample:r,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const i=await this.folder();if(!i)return null;try{const r=await(await i.getFileHandle(`${e}.f32`)).getFile(),o=Cs(e,await r.arrayBuffer());return o&&this.memory.set(e,o),o}catch{return null}}async prune(e){for(const i of[...this.memory.keys()])e.has(i)||this.memory.delete(i);const n=await this.folder();if(n)try{const i=[];for await(const r of n.keys())i.push(r);for(const r of i){const o=r.replace(/\.f32$/,"");r.endsWith(".f32")&&!e.has(o)&&await n.removeEntry(r)}}catch{}}}function Is(t){const e=Math.min(t.length,Math.round(Ls*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(i,r)=>{const o=new Float32Array(e);return o.set(t.getChannelData(r).subarray(0,e)),o}),trimmed:e<t.length}}function vi(t,e=200){const n=t[0]?.length??0,i=[];if(!n)return i;const r=n/e;for(let o=0;o<e;o++){const s=Math.floor(o*r),l=Math.max(s+1,Math.floor((o+1)*r));let d=0,u=0;const c=Math.max(1,Math.floor((l-s)/256));for(let h=s;h<l&&h<n;h+=c){let m=0;for(const g of t)m+=g[h]??0;m/=t.length,m<d&&(d=m),m>u&&(u=m)}i.push(Math.max(-1,d),Math.min(1,u))}return i}function Ns(t,e,n,i,r){const o=i-n;if(r<2||o<64)return[];const s=Math.max(32,Math.round(e*.01)),l=[];for(let g=n;g<i;g+=s){let b=0;for(const y of t)for(let p=g;p<Math.min(i,g+s);p++)b+=(y[p]??0)*(y[p]??0);l.push(Math.log10(b/s+1e-9))}const d=l.map((g,b)=>{const y=l.slice(Math.max(0,b-4),b),p=y.length?y.reduce((f,v)=>f+v,0)/y.length:g;return Math.max(0,g-p)}),u=Math.max(1,Math.floor(l.length/r/8)),c=d.map((g,b)=>({f:g,i:b})).filter(g=>g.i>0&&g.f>.3).sort((g,b)=>b.f-g.f),h=[];for(const g of c){if(h.length>=r-1)break;h.every(b=>Math.abs(b-g.i)>=u)&&h.push(g.i)}const m=h.map(g=>g*s/o).filter(g=>g>.001&&g<.999);for(let g=1;m.length<r-1&&g<r;g++){const b=g/r;m.every(y=>Math.abs(y-b)>.5/r)&&m.push(b)}for(let g=1;m.length<r-1;g++)m.push(g/(r+1));return m.sort((g,b)=>g-b).slice(0,r-1)}function $i(t=Rs()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const i=n&&typeof n=="object"?n:{},r=o=>typeof i[o]=="number"&&Number.isFinite(i[o])?i[o]:0;return i.saved!==!0||!r("id")||!r("frames")||!r("sampleRate")?[]:[{id:r("id"),bars:r("bars"),bpm:r("bpm"),sampleRate:r("sampleRate"),channels:Math.min(2,Math.max(1,r("channels"))),frames:r("frames")}]}):[]}catch{return[]}}async function zs(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const i=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),r=new Float32Array(await i.arrayBuffer());return r.length<t.frames*t.channels?null:Array.from({length:t.channels},(o,s)=>r.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function Rs(){try{return globalThis.localStorage??null}catch{return null}}const Bs="instance",js=99;function Wt(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Bs)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=js?n:1}function Ps(t,e){return e===1?t:`${t}#${e}`}function Os(t,e){return e===1?t:`${t} ${e}`}let Re;function Ws(t,e=Wt()){if(Re!==void 0)return Re;Re=null;try{if(typeof window>"u"||window.parent===window)return Re;const n=window.parent.ncStudio;n&&n.version===1&&(Re=n.attach(t,{instance:e}))}catch{}return Re}function Gs(){let t;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(t=i.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(i,r,o)=>n.request(`${i}${e}`,r,o)}:null}}function Fs(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function we(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function Mt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function mn(t,e=Wt()){return e>1?`${t}#${e}`:t}function Hs(t,e=Wt()){const n=Mt()?.owner()??null;return n===null||n==="studio"||n===mn(t,e)}const Zs="NYX Sampler",Et="nyx",K=Wt(),ki=Ps("nyx.state",K),Cn=.15,k=ys(ki),_=new Ts(K>1?`nyx-${K}`:"nyx"),Gt=()=>ws(ki,k);let U=!1,ve=0,te=null,Ct=!1,Pe="",C="";const Fe=new Map;let lt=new Map;const ae=new Di({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let N=null,vt=null;const Ds=new tr({...Gs(),app:Os(Zs,K),version:"0.1.0",clock:ae,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=N?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),at=t=>t+(vt?.offset??0),R=()=>ae.transport,He=()=>R().isPlayingAt(F()),it=()=>He()&&!U,Q=Ws(Et,K);let Kt=null,Y=null,se=null,Tt=null,va=null;const $a=new Set;function ie(){return va??=(async()=>{Q?(N=Q.ctx,Kt=Q.output,vt=Q.mapper??new Zn(Q.ctx)):(N=new AudioContext({latencyHint:"interactive"}),Kt=N.destination,vt=new Zn(N)),vt.start();try{await N.audioWorklet.addModule(As)}catch{return C="Audio could not start (the sampler's worklet did not load). Reload to try again.",E(),!1}Y=new AudioWorkletNode(N,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),Y.port.onmessage=t=>Ys(t.data),se=jr(N,{moduleUrl:Fs()??Wr,bpm:R().bpm,slots:3,state:cn(k.hacks)}),fn=cn(k.hacks),Tt=new GainNode(N,{gain:k.master}),Y.connect(se.input),se.output.connect(Tt).connect(Kt),Or(se,ae,{toAudioTime:at,now:F});for(const t of De(k))await Tn(t);return Ye(),Xe(),!0})(),va}async function Tn(t){const e=await _.get(t);return e?(Fe.has(t)||Fe.set(t,vi(e.data)),Y&&!$a.has(t)&&($a.add(t),Y.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function Ys(t){t.type!=="pos"||!t.voices||(lt=new Map(t.voices.map(([e,n,i])=>[e,n/Math.max(1,i)])))}function Ye(){Y?.port.postMessage({type:"program",program:Ss(k,t=>_.info(t),R().bpm)})}let ka="";function Xe(t=!1){if(!Y)return;const e=R(),n=it();let i=0,r=e.bpm;if(e.running){const s=Math.max(0,e.beatAt(F())),l=e.timeAt(s);r=60/(e.timeAt(s+1)-l),i=at(l)-s*60/r}const o=JSON.stringify([n,Math.round(i*2e3),r,ve]);!t&&o===ka||(ka=o,Y.port.postMessage({type:"clock",clock:{playing:n,zero:i,bpm:r,join:ve}}))}let fn=null;function xi(){if(!se)return;const t=cn(k.hacks),e=ds(fn,t);if(fn=t,e.whole)se.setState(t);else for(const[n,i,r]of e.params)se.setParam(n,i,r)}let tt=null;function Xs(){if(tt){const e=tt;Z(()=>{k.lanes=e}),C="Pattern back.",E();return}const t=structuredClone(k.lanes);t.some(e=>e.steps.some(n=>n.on)||e.mute||e.solo||e.length!==ne)&&(Z(()=>{k.lanes=k.lanes.map(()=>Mn())}),te=null,tt=t,C="Pattern cleared: press Undo to bring it back.",E())}function Z(t){tt=null,t(),k.active!==null&&(Ct=!0),Pe="",Gt(),Ye(),xi(),E()}const O=t=>k.pads[t]??st(t),ee=t=>k.lanes[t]??Mn(),Si=()=>O(k.selected);function Ft(t,e=k.selected){Z(()=>t(O(e)))}function It(t,e,n){Z(()=>{const i=ee(t).steps[e];i&&n(i)})}function ge(t,e=!0){k.selected=Math.max(0,Math.min(Ge-1,t)),te&&te.lane!==k.selected&&(te=null),Gt(),e&&me(k.selected),E()}async function me(t,e=null){if(!await ie()||!N||!Y)return;N.state!=="running"&&await N.resume().catch(()=>{});const n=O(t),i=n.sample?xs(n,_.info(n.sample),R().bpm,e):null;i&&Y.port.postMessage({type:"play",pad:t,hit:i})}async function ct(t,e,n,i,r=!0){const{sample:o,saved:s}=await _.put(e,n);await Tn(o.hash),Z(()=>{const l=O(t);l.sample=o.hash,l.name=i.slice(0,24)||`Pad ${t+1}`,l.start=0,l.end=1,l.slices=0,l.cuts=[],l.fit=0}),C=s?"":"Kept until you reload: this browser has no file storage here.",_.prune(De(k)),r&&me(t)}async function In(t,e=k.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await nl(t);return}if(!await ie()||!N)return;let n;try{n=await N.decodeAudioData(await t.arrayBuffer())}catch{C=`Couldn't read ${t.name}: not an audio file this browser can decode.`,E();return}const{data:i,trimmed:r}=Is(n);await ct(e,i,n.sampleRate,t.name.replace(/\.[^.]+$/,"")),r&&(C=`${t.name} was cut to its first minute.`,E())}const P={from:"master",bars:1,busy:!1};async function Nn(){const t=we();if(!t||P.busy||!await ie()||!N)return;const e=R();if(!e.running){C="Play first: Grab takes the bars that just played.",E();return}const n=P.bars,i=Math.floor(e.beatAt(F())/4)*4,r=i-4*n;if(r<0){C=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,E();return}const o=N.sampleRate,s=Math.round(at(e.timeAt(r))*o),l=Math.round(at(e.timeAt(i))*o);P.busy=!0,E();const d=await t.take(P.from,s,l);P.busy=!1;const u=t.sources().find(m=>m.id===P.from)?.name??P.from;if(!d){C=`${u} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,E();return}let c=0;for(const m of d)for(const g of m)c=Math.max(c,Math.abs(g));if(c<1e-4){C=`${u} was silent for those ${n===1?"bar":"bars"}.`,E();return}const h=k.selected;await ct(h,d,o,`${u} grab`),n===1?(Z(()=>{const m=O(h);m.fit=1,m.slices=16,m.cuts=[],m.decay=4;const g=ee(h);g.length=ne;for(const b of g.steps)Object.assign(b,Ln(),{on:!0})}),C=`Grabbed a bar of ${u}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(Ft(m=>{m.fit=n},h),await gn(8,"transients"),C=`Grabbed ${n} bars of ${u}, fitted to ${n} bars and sliced at the hits.`),E()}const xa=240,_s=.25,Sa=8,S={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,bpm:120,warned:!1,label:""};function zn(t){const e=Math.floor(t/4)*4;return t-e<_s?e:e+4}function Us(t){const e=N?.sampleRate??48e3;return Math.round(at(R().timeAt(t))*e)}function Ai(t){const e=N?.sampleRate??48e3;return S.fromFrame+Math.round((t-S.startBeat)*60/S.bpm*e)}function rt(t=S.source){return we()?.sources().find(e=>e.id===t)?.name??t}function Rn(){S.phase==="idle"?qs():S.phase==="armed"?(S.phase="idle",C="",E()):S.phase==="rec"&&Bn()}async function qs(){const t=we();if(!t?.record){C="Take needs the Studio (reload it to update).",E();return}if(!(!await ie()||!N)){if(S.source=P.from,S.pad=k.selected,t.listen(S.source),!R().running){S.phase="armed",C=`Take is armed: it starts on the first bar when the music plays (from ${rt()}).`,E();return}Li()}}function Li(){const t=we();if(!t?.record||!N){S.phase="idle";return}const e=R();S.startBeat=Math.max(0,zn(e.beatAt(F()))),S.fromFrame=Us(S.startBeat),S.bpm=e.bpm;const n=t.record(S.source,S.fromFrame);if(!n){S.phase="idle",C=`${rt()} can't be recorded.`,E();return}S.rec=n,S.phase="rec",S.warned=!1,S.lastBar=S.startBeat,S.lastBarFrame=S.fromFrame,C=`Recording ${rt()} onto ${O(S.pad).name}: press Take again to stop on the bar.`,window.clearInterval(S.timer),S.timer=window.setInterval(Vs,200),E()}function Vs(){if(S.phase!=="rec")return;const t=R();if(!t.running)return;const e=t.beatAt(F()),n=Math.floor(e/4)*4;n>S.lastBar&&(S.lastBar=n,S.lastBarFrame=Ai(n));const i=240/Math.max(1,t.bpm),r=(Math.max(S.startBeat+4,zn(e))-S.startBeat)*60/Math.max(1,t.bpm);if(r+i>xa){Bn();return}!S.warned&&r>xa-30&&(S.warned=!0,C="Take stops at four minutes: about 30 seconds left.");const o=Mi();o!==S.label&&(S.label=o,E())}function Mi(){if(S.phase==="armed")return"Armed: waits for Play";if(S.phase==="saving")return"Saving take…";if(S.phase!=="rec")return"Take";const t=R().beatAt(F());return t<S.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((t-S.startBeat)/4)+1}`}async function Bn(t=!1){const e=S.rec;if(S.phase!=="rec"||!e)return;window.clearInterval(S.timer);let n,i;t?(n=S.lastBar,i=S.lastBarFrame):(n=Math.max(S.startBeat+4,zn(R().beatAt(F()))),i=Ai(n));const r=Math.round((n-S.startBeat)/4);if(S.rec=null,r<1){e.cancel(),S.phase="idle",C="The music stopped before a whole bar was taken.",E();return}S.phase="saving",E();try{await Ks(e,i,r,n)}finally{S.phase="idle",E()}}async function Ks(t,e,n,i){let r=null;try{r=await t.stop(e)}catch(l){console.error("NYX take",l)}const o=rt();if(!r?.[0]?.length){C=`The take from ${o} came back empty.`,E();return}let s=0;for(const l of r)for(const d of l)s=Math.max(s,Math.abs(d));if(s<1e-4){C=`${o} was silent for the whole take.`,E();return}try{await Js(r,n,i,o)}catch(l){console.error("NYX take",l),C=`The take from ${o} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,E()}}async function Js(t,e,n,i){const r=S.pad,o=`${i} take`.slice(0,20),s=k.pads.filter(h=>h.name.startsWith(o)).length+1,l=N?.sampleRate??48e3;await ct(r,t,l,`${o} ${s}`,!1);const d=e<=Sa,u=Math.round(S.startBeat/4);Z(()=>{const h=O(r);h.mode="oneshot",h.dir="fwd",h.decay=4,h.attack=0,h.fit=e,h.slices=0,h.cuts=[];const m=ee(r);m.length=ne;for(const b of m.steps)Object.assign(b,Ln());const g=m.steps[0];d&&g&&(g.on=!0,g.cond=e===1?"always":`${u%e+1}:${e}`)});const c=R();if(d&&c.running&&Y&&N){const h=O(r),m=ee(r).steps[0],g=m?En(h,0,m,_.info(h.sample??""),c.bpm):null,y=c.beatAt(F()+Cn)-n;if(g&&y>0&&y<4*e){const p=Math.round(y*60/c.bpm*l*g.rate);g.from+p<g.to-1&&Y.port.postMessage({type:"play",pad:r,hit:{...g,from:g.from+p,attack:.005}})}}C=d?`${e} bar${e===1?"":"s"} of ${i} on ${O(r).name}: it loops every ${e===1?"bar":`${e} bars`}. Tap the pad to play it any time.`:`${e} bars of ${i} on ${O(r).name}. Longer than ${Sa} bars, so it plays from the pad (tap or hold it), not the grid.`,E()}async function Qs(t){const e=await zs(t);if(!e){C=`LUCY take ${t.id} could not be read.`,E();return}await ct(k.selected,e,t.sampleRate,`LUCY take ${t.id}`)}async function Ei(){const t=k.selected,e=O(t);!e.sample||!await po({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(Z(()=>{k.pads[t]=st(t)}),_.prune(De(k)))}async function gn(t,e){const n=Si();let i=[];if(t&&e==="transients"&&n.sample){const r=await _.get(n.sample);r&&(i=Ns(r.data,r.sampleRate,Math.floor(n.start*r.frames),Math.ceil(n.end*r.frames),t))}Ft(r=>{r.slices=t,r.cuts=i})}function el(t,e){const n=hi[t]??String(t+1);if(e==="store")k.slots[t]=gi(k),k.active=t,Ct=!1,Pe=`Stored in ${n}`;else if(e==="clear")k.slots[t]=null,k.active===t&&(k.active=null),Pe=`Cleared ${n}`,_.prune(De(k));else{const i=k.slots[t];if(!i){Pe=`${n} is empty: Shift-click or long-press to store`,E();return}Ci(i),k.active=t,Ct=!1,Pe=`Recalled ${n}`}Gt(),Ye(),xi(),E()}function Ci(t){const e=structuredClone(t);k.pads=e.pads,k.lanes=e.lanes,k.swing=e.swing,k.hacks=e.hacks,te=null;for(const n of De(k))Tn(n).then(()=>Ye())}async function Ti(){if(await ie(),N&&N.state!=="running"&&await N.resume().catch(()=>{}),Q&&He()){if(!U&&Mt()?.owner()===mn(Et,K)){ae.stop({at:F()});return}if(U=!U,!U){const t=R();ve=t.nextBar(t.beatAt(F()+Cn))}Xe(!0),E();return}He()?ae.stop({at:F()}):(U=!1,ve=0,Q&&Mt()?.claim(mn(Et,K)),ae.play({at:F()}))}let Aa=R().running;ae.onChange(()=>{R().running&&!Aa&&Q&&(U=!Hs(Et,K)),Aa=R().running,R().running&&S.phase==="armed"&&Li(),!R().running&&S.phase==="rec"&&Bn(!0),R().running||(U=!1,ve=0),Ye(),Xe(!0),E()});Mt()?.onAll(()=>{if(U){if(U=!1,He()){const t=R();ve=t.nextBar(t.beatAt(F()+Cn))}Xe(!0),E()}});function tl(){const t={nyx:1,...gi(k)},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${K>1?`-${K}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function nl(t){let e;try{e=JSON.parse(await t.text())}catch{C=`Couldn't read ${t.name}: not a NYX pattern.`,E();return}if(!e||typeof e!="object"||e.nyx!==1){C=`Couldn't read ${t.name}: not a NYX pattern.`,E();return}const n=hn(e);Z(()=>Ci(n));const i=[];for(const r of k.pads)r.sample&&!await _.get(r.sample)&&i.push(r.name);C=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:`Loaded ${t.name}.`,Ye(),E()}function al(){Y?.port.postMessage({type:"stop"}),He()&&(Q?U=!0:ae.stop({at:F()})),Xe(!0),se?.clear({fadeMs:20}),E()}function il(t){k.master=Math.min(1,Math.max(0,t)),Gt(),Tt&&N&&Tt.gain.setTargetAtTime(k.master,N.currentTime,.01),Nt.value=String(k.master),jn.textContent=`${Math.round(k.master*100)}%`}const G=(t,e={},...n)=>{const i=document.createElement(t);for(const[r,o]of Object.entries(e))i.setAttribute(r,o);return i.append(...n),i},Ht=document.getElementById("app");Ht.classList.add("nc","nc-page");const Ii=G("header",{class:"nc-page-hd"},G("div",{},G("h1",{class:"nc-page-title"},G("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",G("span",{class:"nc-page-sep"},"/")," SAMPLER ",G("span",{class:"nc-page-sep"},"/")," ",G("span",{class:"nc-mono"},String(K).padStart(2,"0"))),G("p",{class:"nc-page-sub"},"A NetComposer element."))),Nt=G("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(k.master),"data-nc-id":"nyx-master"});Nt.addEventListener("input",()=>il(Number(Nt.value)));const jn=G("span",{class:"nc-readout","data-nc-readout":""});jn.textContent=`${Math.round(k.master*100)}%`;const La="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",Se=G("input",{type:"file"});Se.hidden=!0;let Ma="pad";Se.addEventListener("change",()=>{const t=Se.files?.[0];Se.value="",t&&In(t)});function Pn(t){Ma=t,Se.accept=Ma==="pad"?La:`${La},.json,application/json`,Se.click()}const Jt=(t,e,n)=>{const i=G("button",{type:"button",class:"nc-page-action",title:n,"data-nyx-action":t.toLowerCase()},t);return i.addEventListener("click",e),i};Ii.append(G("div",{class:"nc-page-actions"},G("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},G("label",{class:"nc-label",for:"nyx-master"},"Master"),Nt,jn),Jt("Save",tl,"Download the pattern (pads, steps, Hacks). Samples stay in this browser"),Jt("Load",()=>Pn("any"),"Load a pattern, or an audio file onto the selected pad"),Jt("Panic",al,"Every voice out, and sit out until Play"),Se));const On=G("div",{class:"nc-stack","data-nc-layout":"adjacent"});Ht.append(Ii,G("main",{class:"nc-page-body"},On));Ht.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});Ht.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),In(e))});const Ze=t=>`${Math.round(t*100)}%`,Be=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,bn=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,yn=(t,e="")=>`${t>0?"+":""}${t}${e}`;function rl(t){return Math.abs(t)<.001?"open":t<0?`LP ${bn(2e4*(60/2e4)**-t)}`:`HP ${bn(20*(8e3/20)**t)}`}function ol(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function Ni(){return He()?U?"Sitting out":R().beatAt(F())<ve?"Joining on the next bar":"Playing":k.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function sl(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const zi=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],ot={fill:!1,perform:null};function zt(t){ot.fill!==t&&(ot.fill=t,Y?.port.postMessage({type:"fill",on:t}),E())}function wn(t){ot.perform!==t&&(ot.perform=t,Y?.port.postMessage({type:"perform",mode:t}),E())}function ll(t){const e=r=>{const s=(r.target instanceof Element?r.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return zi.some(d=>d.mode===l)?l:null},n=r=>{ie(),r==="fill"?zt(!0):wn(r)},i=()=>{zt(!1),wn(null)};t.addEventListener("pointerdown",r=>{const o=e(r);if(!o)return;r.preventDefault(),n(o);const s=()=>{i(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",r=>{if((r.key===" "||r.key==="Enter")&&!r.repeat){const o=e(r);if(!o)return;r.preventDefault(),n(o)}}),t.addEventListener("keyup",r=>{(r.key===" "||r.key==="Enter")&&e(r)&&i()}),window.addEventListener("blur",i)}function cl(){return{id:"transport",title:"Transport",status:Pe,controls:[{type:"button",id:"play",label:it()?"Stop":"Play",on:it(),onPress:()=>void Ti()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:ot.perform??"",options:zi.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(R().bpm),valueText:`${Math.round(R().bpm)} BPM`,onChange:t=>{ae.setTempo({bpm:t}),E()}},{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:k.swing,valueText:Ze(k.swing),onChange:t=>Z(()=>{k.swing=t})},{type:"readout",id:"status",label:"Status",value:Ni()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:hi.map((t,e)=>({label:t,filled:k.slots[e]!=null,active:k.active===e,edited:k.active===e&&Ct})),onMorph:()=>{},onSlot:(t,e)=>el(t,e)}]}}function Ri(){if(!it())return-1;const t=R().beatAt(F());return t<0||t<ve?-1:Math.floor(t/vs)%ne}function dl(){const t=Si(),e=Ri();return{id:"pattern",title:"Pattern",lead:!0,summary:`${k.lanes.filter(n=>n.steps.some(i=>i.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${k.selected}`,rows:k.lanes.map((n,i)=>({id:`pad-${i}`,label:O(i).name,length:n.length,lane:i%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(r=>({on:r.on,accent:r.accent,velocity:r.velocity,dim:!O(i).sample}))})),onToggle:(n,i,r)=>It(n,i,o=>{r?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,i,r,o)=>It(n,i,s=>{r==="on"?(s.on=o,o||(s.accent=!1)):(s.accent=o,o&&(s.on=!0))}),onSelectRow:n=>ge(n),onLongPress:(n,i)=>{te={lane:n,step:i},ge(n,!1)},onMute:n=>Z(()=>{ee(n).mute=!ee(n).mute}),onSolo:n=>Z(()=>{ee(n).solo=!ee(n).solo}),onLength:(n,i)=>Z(()=>{ee(n).length=Math.max(1,Math.min(ne,i))}),transport:{playing:it(),onToggle:()=>void Ti()},onFill:n=>zt(n),onClear:()=>Xs(),clearLabel:tt?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:k.selected,pads:k.pads.map((n,i)=>({label:n.name,empty:!n.sample,peaks:n.sample?Fe.get(n.sample):void 0,lane:i%4+1,playing:lt.has(i),badge:n.choke?vn[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${vn[n.choke-1]}`:void 0})),onDown:n=>hl(n),onPress:n=>ml(n),onFile:(n,i)=>{ge(n,!1),In(i,n)},onMove:(n,i,r)=>fl(n,i,r),menu:n=>bl(n),onMenu:(n,i)=>void yl(n,i),onRename:(n,i)=>gl(n,i)}]}]}}function ul(t){if(!te||te.lane!==k.selected)return[];const{lane:e,step:n}=te,i=ee(e).steps[n];if(!i)return[];const r=o=>It(e,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:i.velocity,valueText:Ze(i.velocity),onChange:o=>r(s=>{s.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:i.chance,valueText:Ze(i.chance),onChange:o=>r(s=>{s.chance=o})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:i.slice===null?"auto":String(i.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(o,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:o=>r(s=>{s.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:i.pitch,valueText:yn(i.pitch," st"),onChange:o=>r(s=>{s.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:i.cond,options:un.map(o=>({value:o,label:sl(o)})),onChange:o=>r(s=>{un.includes(o)&&(s.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:i.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>r(s=>{s.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{te=null,E()}}]}function pl(){const t=we();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:t.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:P.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{P.from=n,t.listen(n),E()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(P.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{P.bars=n==="4"?4:n==="2"?2:1,E()}},{type:"button",id:"grab",label:P.busy?"Grabbing…":P.bars===1?"Grab last bar":`Grab last ${P.bars} bars`,on:P.busy,onPress:()=>void Nn()},...t.record?[{type:"button",id:"take",label:Mi(),on:S.phase!=="idle",onPress:()=>Rn()}]:[]]}let Rt=-1;function hl(t){if(!O(t).sample)return;Rt=t,ge(t);const e=()=>{Rt=-1};window.addEventListener("pointerup",()=>setTimeout(e),{once:!0})}function ml(t){if(Rt===t){Rt=-1;return}if(!O(t).sample){ge(t,!1),Pn("pad");return}ge(t)}function fl(t,e,n){Z(()=>{const i=structuredClone(O(t)),r=structuredClone(O(e));k.pads[e]=i,n||(k.pads[t]=r.sample?r:st(t))}),ge(e,!1)}const vn=["A","B","C","D"];function gl(t,e){Ft(n=>{n.name=e.slice(0,24)},t)}function bl(t){const e=!!O(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}];for(const i of $i().slice(-4).reverse())n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});return we()&&n.push({id:"grab",label:P.bars===1?"Grab the last bar":`Grab the last ${P.bars} bars`}),we()?.record&&n.push({id:"record",label:S.phase==="rec"?"Stop the take":`Take from ${rt(P.from)}`}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function yl(t,e){if(ge(t,!1),e==="load")Pn("pad");else if(e==="grab")await Nn();else if(e==="record")Rn();else if(e==="clear")await Ei();else if(e.startsWith("take-")){const n=$i().find(i=>`take-${i.id}`===e);n&&await Qs(n)}}const wl=["q","w","e","r","a","s","d","f"];document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=wl.indexOf(t.key.toLowerCase());n<0||!O(n).sample||(t.preventDefault(),me(n))});function vl(){const t=k.selected,e=O(t),n=e.sample?_.info(e.sample):void 0,i=yi(e).slice(1,-1),r=e.end-e.start,o=n?n.frames/n.sampleRate:0,s=!!e.sample,l=s&&!n,d=c=>Ft(c),u=s?[{type:"readout",id:"sample",label:"Length",value:l?"Not in this browser: load it again":`${Be(o*r)} of ${Be(o)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:c=>d(h=>{h.mode=c})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:c=>d(h=>{(c==="fwd"||c==="rev"||c==="pingpong")&&(h.dir=c)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:Be(e.start*o),onChange:c=>d(h=>{h.start=Math.min(c,h.end-.002)}),onCommit:()=>void me(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:Be(e.end*o),onChange:c=>d(h=>{h.end=Math.max(c,h.start+.002)}),onCommit:()=>void me(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:mi.map(c=>({value:String(c),label:c?`${c}`:"Off"})),onChange:c=>void gn(Number(c),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:c=>void gn(e.slices,c==="transients"?"transients":"even")}]:[],{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:yn(e.tune," st"),onChange:c=>d(h=>{h.tune=c}),onCommit:()=>void me(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:yn(e.fine," ct"),onChange:c=>d(h=>{h.fine=c})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(c=>({value:String(c),label:`${c} bar${c===1?"":"s"}`}))],onChange:c=>d(h=>{h.fit=Number(c)})},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,value:e.attack,valueText:Be(e.attack),onChange:c=>d(h=>{h.attack=c})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,value:e.decay,valueText:e.decay>=3.99?"Hold":Be(e.decay),onChange:c=>d(h=>{h.decay=c}),onCommit:()=>void me(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:rl(e.cutoff),onChange:c=>d(h=>{h.cutoff=Math.abs(c)<.02?0:c})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Ze(e.resonance),onChange:c=>d(h=>{h.resonance=c})},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:Ze(e.level),onChange:c=>d(h=>{h.level=c})},{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:ol(e.pan),onChange:c=>d(h=>{h.pan=Math.abs(c)<.02?0:c})},{type:"select",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},...vn.map((c,h)=>({value:String(h+1),label:`Group ${c}`}))],onChange:c=>d(h=>{h.choke=Number(c)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void Ei()}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?Fe.get(e.sample)??[]:[],region:[e.start,e.end],markers:i.map(c=>e.start+c*r),position:lt.get(t)??-1}]:[],...C?[{type:"note",id:"notice",text:C}]:[],...ul(e),...u,...pl()]}}function $n(t,e){Z(()=>e(k.hacks[t]))}function $l(t,e){const n=k.hacks[t].dials[e.key]??e.default,i=`hack-${t}-${e.key}`,r=o=>$n(t,s=>{s.dials[e.key]=o});return e.options?{type:"select",id:i,label:e.label,value:String(n),options:e.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>r(Number(o))}:{type:"slider",id:i,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:Ba(e,n,R().bpm),onChange:r}}const gt=(t,e)=>(de(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>$l(t,n));function kl(){const t=k.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,i=o=>Z(()=>o(k.hacks.filter)),r=[pi(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:r.length?r.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,onToggle:o=>i(s=>{s.on=o}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>i(s=>{(o==="lp"||o==="hp"||o==="bp")&&(s.mode=o)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":bn(ui(e.cutoff)),onChange:o=>i(s=>{s.cutoff=o})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Ze(e.resonance),onChange:o=>i(s=>{s.resonance=o})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,onToggle:o=>$n("drive",s=>{s.on=o}),controls:gt("drive",!1),more:gt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,onToggle:o=>$n("compressor",s=>{s.on=o}),controls:gt("compressor",!1),more:gt("compressor",!0)}]}}const Wn=[cl,dl,vl,kl].map(t=>({def:t,handle:ss(t())}));ls(On,Wn.map(t=>t.handle),"adjacent");ll(On);function E(){for(const t of Wn)t.handle.update(t.def())}let Ea="";function Bi(){Xe();const t=lt.get(k.selected)??-1,e=JSON.stringify([Ri(),Ni(),Math.round(t*400)]);if(e!==Ea){Ea=e;for(const n of Wn.slice(0,3))n.handle.update(n.def())}requestAnimationFrame(Bi)}requestAnimationFrame(Bi);Ds.start();Promise.all([...De(k)].map(t=>_.get(t))).then(t=>{for(const e of t)e&&!Fe.has(e.hash)&&Fe.set(e.hash,vi(e.data));E()});if(Q)ie(),we()?.listen(P.from);else{const t=()=>{ie()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:k,clock:ae,store:_,get ctx(){return N},get fx(){return se},get positions(){return lt},ensureAudio:ie,play:me,async setSample(t,e,n,i="test"){await ie()&&await ct(t,e,n,i)},grab:P,grabBars:Nn,take:S,pressTake:Rn,get notice(){return C},setPerform:wn,setFill:zt,toggleStep(t,e){It(t,e,n=>{n.on=!n.on})}};
