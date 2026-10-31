(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Ee=1e-9;function Mi(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class vn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Mi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,c)=>s.beat-c.beat);let o=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+Ee&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of i){if(s.beat<=e.beat+Ee)continue;const c=this.clamp(s.bpm);c!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:c})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Ee){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ee;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,o=.25){const r=this.bpmAt(n);if(!(i>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/o));this.setTempoAt(r,n);for(let c=1;c<=s;c++)this.setTempoAt(r+(e-r)*c/s,n+i*(c-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new vn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+Ee)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+Ee)return n[i];return n[0]}}const Ei=Object.freeze({beatsPerBar:4,beatUnit:4}),Be=1e-9;function Ci(t){return Math.floor(t+Be)}function wa(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-Be)*e;return n&&o<=t+Be?o+e:o}class Ti{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new vn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ei}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Be&&(this.stopTime===null||e<this.stopTime-Be)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Be?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Ci(e/n),o=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return wa(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const va="nc-clock/snapshot",$a=1;function Ii(t,e="local"){return{format:va,version:$a,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ni(t,e){const n=zi(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const ne=t=>typeof t=="number"&&Number.isFinite(t),zn=t=>t===null||ne(t);function zi(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==va&&n("format"),(!ne(e.version)||Math.floor(e.version)!==$a)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!ne(e.anchor.beat)||!ne(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&ne(i.beat)&&ne(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!ne(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!ne(e.meter.beatUnit))&&n("meter"),(!zn(e.startTime)||!zn(e.stopTime)||!ne(e.stoppedBeat))&&n("transport times"),e}class Ri{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ti(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ni(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Ii(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const ji="nc-sync/1",Bi=1,Pi="nc-sync",Wi="nc-sync-leader",Oi=0,ka=.5,xa=.75;function Gi(t){return typeof t=="number"&&Number.isFinite(t)&&t>=ka&&t<=xa?t:null}const Ft=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Ye=t=>typeof t=="number"&&Number.isFinite(t),ot=t=>typeof t=="string"&&t.length>0;function Fi(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Bi||!ot(e.type)||!ot(e.from)||!Ye(e.term)||!Ye(e.seq)||!Ye(e.sentAt))return null;switch(e.type){case"hello":return ot(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Ye(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Ye(e.slot)?e:null;case"ping":case"pong":return ot(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Hi(t,e,n,i,o){return{proto:ji,from:e,term:n,seq:i,sentAt:o,...t}}function X(){return(performance.timeOrigin+performance.now())/1e3}const Ht=.003,Zi=3,Di=.01,Rn=500;class jn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Di:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Ht&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const o=n-(this.timeOrigin+i)/1e3,r=this.median(),s=o-r,c=Math.abs(o-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&c<=this.stepThreshold&&c<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(i&&r){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const u=this.offsets,l=this.preStep;l.length=0;for(let h=0;h<u.length;h++)l.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const c=this.offsets,d=e-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const c of[...this.stepListeners])c(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let r=0;r<i;r++){const s=e[r];let c=r-1;for(;c>=0&&n[c]>s;)n[c+1]=n[c],c--;n[c+1]=s}const o=i>>1;return i%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ht&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Rn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ht)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Rn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Zi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(o)&&o>0?o:null}}class Yi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Ft,...e.capabilities},this.channelOption=e.channel??Pi,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,c=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(c+this.o.minLeadSeconds),u=Math.max(n??wa(d,1),d);i&&i>0?(s.tempo.rampTempo(e,u,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,u),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(xa,Math.max(ka,e)):Oi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Gi(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Fi(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ft,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ft},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Wi,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,c)=>[r?0:1,s,c];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==o[0]?i[0]<o[0]:i[1]!==o[1]?i[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const o=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>o&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Hi(e,this.id,this.term,++this.seq,this.o.now()))}}const Xi="modulepreload",_i=function(t){return"/nyx/"+t},Bn={},Ui=function(e,n,i){let o=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");o=s(n.map(u=>{if(u=_i(u),u in Bn)return;Bn[u]=!0;const l=u.endsWith(".css"),h=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=l?"stylesheet":Xi,l||(f.as="script"),f.crossOrigin="",f.href=u,d&&f.setAttribute("nonce",d),document.head.appendChild(f),l)return new Promise((g,b)=>{f.addEventListener("load",g),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return o.then(s=>{for(const c of s||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};var qi=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Kt=[.25,.5,.75,1,1.5,2],Vi=4.9,N={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},we={fmt:"wet"},K={fmt:"pct"},Ce={fmt:"db"},rt={fmt:"signedPct"},Zt={fmt:"num",suffix:" ms"},I={div:100};function S(t,e,n,i,o,r,s,c){var d={key:t,label:e,min:n,max:i,default:o,step:1,k:r,unit:null,format:s};if(c)for(var u in c)d[u]=c[u];return d}function st(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Ke=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[S("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:N.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[S("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:N.hpHz,astrid:!0,zero:"off"}),S("q","Resonance",0,100,0,2,{fmt:"q",law:N.hpQ},{dsp:{law:N.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[S("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:N.bpHz,astrid:!0},{dsp:{law:N.bpHz}}),S("q","Q",0,100,0,2,{fmt:"q",law:N.bpQ},{dsp:{law:N.bpQ}}),S("mix","Mix",0,100,100,3,we,{dsp:I,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[S("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:st(qi),overriddenBy:"beats_free",tempoSynced:!0}),S("feedback","Feedback",0,90,35,2,K,{dsp:I,unit:"%"}),S("mix","Wet/dry",0,100,0,3,we,{dsp:I,unit:"%",astridKey:"wet"}),S("tone","Tone",0,100,100,4,{fmt:"hz",law:N.delayTone,offAt:100},{dsp:{div:99},more:!0}),S("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),S("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:st([[0,"Insert"],[1,"Send"]]),more:!0}),S("send","Send",0,100,100,7,K,{dsp:I,unit:"%",more:!0}),S("mod_send","Accent → send",-100,100,0,8,rt,{dsp:I,unit:"%",more:!0}),S("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[S("predelay","Pre-delay",0,200,0,1,Zt,{dsp:{div:1e3},unit:"ms"}),S("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:I,unit:"%"}),S("decay","Decay",0,100,50,3,K,{dsp:I,unit:"%"}),S("damping","Damping",0,100,0,4,K,{dsp:I,unit:"%"}),S("mix","Mix",0,100,0,5,we,{dsp:I,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[S("rate","Rate",0,100,26,1,{fmt:"rate",law:N.rate},{dsp:{law:N.rate}}),S("depth","Depth",0,100,70,2,K,{dsp:I,unit:"%"}),S("feedback","Feedback",-90,90,50,3,rt,{dsp:I,unit:"%"}),S("mix","Mix",0,100,50,4,we,{dsp:I,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[S("rate","Rate",0,100,52,1,{fmt:"rate",law:N.rate},{dsp:{law:N.rate}}),S("depth","Depth",0,100,50,2,K,{dsp:I,unit:"%"}),S("spread","Spread",0,100,70,3,K,{dsp:I,unit:"%"}),S("mix","Mix",0,100,40,4,we,{dsp:I,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[S("rate","Rate",0,100,39,1,{fmt:"rate",law:N.rate},{dsp:{law:N.rate}}),S("depth","Depth",0,100,70,2,K,{dsp:I,unit:"%"}),S("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:st([[4,"4"],[6,"6"],[8,"8"]])}),S("feedback","Feedback",0,90,30,4,K,{dsp:I,unit:"%"}),S("mix","Mix",0,100,50,5,we,{dsp:I,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[S("low_db","Low",-18,18,0,1,Ce,{unit:"dB"}),S("mid_db","Mid",-18,18,0,2,Ce,{unit:"dB"}),S("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:N.midHz,astrid:!0},{dsp:{law:N.midHz}}),S("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:N.eqQ},{dsp:{law:N.eqQ}}),S("high_db","High",-18,18,0,4,Ce,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[S("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),S("output_db","Output",-12,12,0,2,Ce,{unit:"dB"}),S("mix","Mix",0,100,100,3,we,{dsp:I,unit:"%"}),S("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:st([[0,"Smooth"],[1,"Acid"]]),more:!0}),S("tone","Tone",0,100,100,5,{fmt:"hz",law:N.driveTone,offAt:100},{dsp:{div:99},more:!0}),S("mod_drive","Accent → drive",-100,100,0,6,rt,{dsp:I,unit:"%",more:!0}),S("mod_tone","Accent → tone",-100,100,0,7,rt,{dsp:I,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[S("threshold_db","Threshold",-60,0,0,1,Ce,{unit:"dB"}),S("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:N.ratio},{dsp:{law:N.ratio}}),S("attack_ms","Attack",1,100,10,3,Zt,{unit:"ms"}),S("release_ms","Release",10,1e3,150,4,Zt,{unit:"ms"}),S("makeup_db","Makeup",0,24,0,5,Ce,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[S("width","Width",0,200,100,1,K,{dsp:I,unit:"%"}),S("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:I})]}],Ki=Ke.map(function(t){return t.type});Ke.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Ji={reverb:"plate"};function $n(t){var e=Ji[t]||t;return Ki.indexOf(e)>=0?e:null}function le(t){for(var e=$n(t),n=0;n<Ke.length;n++)if(Ke[n].type===e)return Ke[n];return null}function Re(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Sa(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=Re(n.law,e);return i===null?0:i}function Pn(t,e){return Math.min(Vi,t*60/(e>0?e:120))}var Wn=function(t){return t>0?"+":t<0?"−":""};function Qi(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Aa(t,e,n){var i=t.format,o;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:Wn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Wn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(o=Re(i.law,e),o===null?i.zero||"open":i.astrid?Qi(o):o+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+Re(i.law,e).toFixed(1);case"ratio":return Re(i.law,e).toFixed(1)+":1";case"rate":return o=Re(i.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(Pn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Pn(e,n)*1e3)+" ms"}return String(e)}var eo=1,It=["drive","delay","plate"];function to(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,o){return Aa(t,i,o)},e}var Je=It.map(function(t){var e=le(t),n={type:t,label:e.label,dials:e.dials.map(to)};return e.tempoSynced&&(n.tempoSynced=!0),n}),no={reverb:"plate"};function gt(t){var e=no[t]||t;return It.indexOf(e)>=0?e:null}function Nt(t){for(var e=gt(t),n=0;n<Je.length;n++)if(Je[n].type===e)return Je[n];return null}function La(t,e){var n=Nt(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Pe(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function ge(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(i-e)&&(i=t.options[o].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function ao(){return{v:eo,chain:Je.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function io(t){return Kt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Kt[0])}function Dt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function oo(t){for(var e=Array.isArray(t)?t:Dt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=ao(),o={},r=[],s=0;s<e.length;s++){var c=e[s];if(Dt(c)){var d=gt(c.type);if(!d){typeof c.type=="string"&&r.push(c.type);continue}if(o[d]){r.push(d);continue}o[d]=!0;var u=i.chain[It.indexOf(d)],l=Dt(c.dials)?c.dials:{};d==="delay"&&l.mix===void 0&&l.wet!==void 0&&(l=Object.assign({},l,{mix:l.wet})),u.bypass=n?c.bypass===!0:c.bypass!==!1,Nt(d).dials.forEach(function(h){u.dials[h.key]=ge(h,l[h.key])}),ro(d,u.dials,l)}}return{state:i,dropped:r}}function ro(t,e,n){for(var i=Nt(t),o=0;o<i.dials.length;o++){var r=i.dials[o];r.stepWhen&&(e[r.key]=ge(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Pe(r,e)))}}function Jt(t){return oo(t).state}function so(t){return JSON.parse(JSON.stringify(t))}var lo=24,Qt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function en(t,e,n){if(e==="bypass")return n?0:1;var i=La(t,e)||co(t,e);return i?Sa(i,n):0}function co(t,e){var n=le(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var uo={};Je.forEach(function(t){t.dials.forEach(function(e){uo[t.type+"."+e.key]=e.format})});function Yt(t,e){var n=new Float64Array(lo),i=Jt(t);return i.chain.forEach(function(o){var r=Qt[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=en(o.type,s,o.dials[s])})}),n}var po=2,bt=3,ho=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Xe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ma(t,e){var n=le(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var o=1;i[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function mo(t){var e=le(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function fo(t,e,n){var i=t.length-1,o=Math.max(0,Math.min(i,n));if(e<0||e>i||e===o)return t;var r=t.slice(),s=r.splice(e,1)[0];return r.splice(o,0,s),r}function go(t){return typeof t=="number"&&isFinite(t)?io(t):t}function On(t,e,n){var i={};return t.dials.forEach(function(o){var r=e[o.key];r===void 0&&o.astridKey&&(r=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(r=go(r)),i[o.key]=ge(o,r)}),t.dials.forEach(function(o){o.stepWhen&&(i[o.key]=ge(o,typeof e[o.key]=="number"?e[o.key]:i[o.key],Pe(o,i)))}),i}function bo(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,o=1/0,r=t.min;r<=t.max;r++){var s=Re(n.law,r),c=s===null?1/0:Math.abs(s-e);c<o&&(o=c,i=r)}return i}}var yo={rate:"rate_hz"};function wo(t,e,n,i){var o={};return t.dials.forEach(function(r){if(!r.more){var s=r.astridKey||yo[r.key]||r.key;o[r.key]=bo(r,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function vo(t,e){var n=e>0?Math.floor(e):bt,i=[],o=[],r=[],s=!1,c=!1;Array.isArray(t)?(r=t,c=!0):Xe(t)&&Array.isArray(t.chain)&&(r=t.chain,s=t.v===1,c=t.schema===2);for(var d=[],u=0;u<r.length;u++){var l=r[u];if(Xe(l)&&!(l.type==="limiter"||l.fixed===!0)){var h=$n(l.type),f=h&&le(h);if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof l.type=="string"&&i.push(l.type);continue}if(d.length>=n){i.push(l.id||h);continue}var g;Xe(l.params)&&!Xe(l.dials)?g=On(f,wo(f,l.params,o,l.id||h),c):g=On(f,Xe(l.dials)?l.dials:{},c);var b=Ma(h,d),y=typeof l.id=="string"&&ho.test(l.id)&&!d.some(function(m){return m.id===l.id})?l.id:b.id,p=s?l.bypass!==!1:l.bypass===!0;d.push({id:s?b.id:y,type:h,bypass:p,dials:g})}}return{state:{v:po,chain:d},dropped:i,notes:o}}function pt(t,e){return vo(t,e).state}function Te(t){var e=le(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Sa(i,t.dials[i.key])])}),n}function $o(t){var e=pt(t,8),n=[],i=e.chain.map(function(o,r){var s=le(o.type),c={};return r>=bt&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var u=o.dials[d.key];if(d.more){u!==d.default&&n.push(o.id+"."+d.key);return}d.key==="delay_beats"&&Kt.indexOf(u)<0&&n.push(o.id+".delay_beats"),c[d.astridKey||d.key]=u}),{id:o.id,type:o.type,bypass:o.bypass,dials:c}});return{hacks:i,lossy:n}}var ko="nc-fx@1",xo=600,So=256,Ao=8,_e=typeof WeakMap=="function"?new WeakMap:null;function Lo(t,e){var n=_e&&_e.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Ui(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),_e&&(_e.set(t,n),n.catch(function(){_e.delete(t)})),n)}function Ie(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Ea(t,e,n,i){var o=Math.min(400,Math.max(20,Ie(e.bpm,120))),r=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",c=e.bypassMode==="hold"?"hold":"run",d=Ie(e.preGain,1),u=Math.max(0,Ie(e.crossfade,.012)),l=Ie(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),g=t.createGain(),b=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,h.connect(g),g.connect(f),b.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o},m=n(o);p.post=function(w){p.node?p.node.port.postMessage(w):p.disposed||(r.length>=So&&(r=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),r.push(w))};function v(w){var x=r.map(function(L){var E=Object.assign({},L);return E.when>w||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return r=[],x}p.emit=function(w){for(var x=0;x<p.listeners.length;x++)try{p.listeners[x](w)}catch(L){typeof console<"u"&&console.error(L)}},p.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var $=!1;p.tooFar=function(w){return typeof w=="number"&&w>t.currentTime+xo?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var A=Lo(t,e.moduleUrl).then(function(){if(!p.disposed){var w=Object.assign({bpm:o,bypassMode:c,limiter:s,preGain:d,maxDelaySeconds:l},m);w.pending=v(t.currentTime),p.node=new AudioWorkletNode(t,ko,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(b);var x=t.currentTime;x<=0||u===0?(g.gain.value=0,b.gain.value=1):(g.gain.setValueAtTime(1,x),g.gain.linearRampToValueAtTime(0,x+u),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+u)),p.status="ready"}},function(w){p.status="unavailable",r=[],p.error=w});return p.core={input:h,output:f,modInput:y,ready:A,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(w,x){var L=Ie(w,NaN);!(L>0)||p.disposed||p.tooFar(x)||(p.bpm=Math.min(400,Math.max(20,L)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(x)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(w){var x=w&&typeof w=="object"?w:{at:w};if(!(p.disposed||p.tooFar(x.at))){var L=Ie(x.fadeMs,0);p.post({t:"clear",when:p.whenOf(x.at),fadeMs:L>0?Math.min(1e3,L):0})}},onChange:function(w){return p.listeners.push(w),function(){var x=p.listeners.indexOf(w);x>=0&&p.listeners.splice(x,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,g,b,f,y].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},p}function Mo(t,e){var n=e||{};if(n.slots)return Eo(t,n);var i=Jt(n.state),o=Array.from(Yt(i)),r=Ea(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Yt(i)),when:0}]}),s=r.core;function c(d){return i.chain[It.indexOf(d)]}return s.setParam=function(d,u,l,h){var f=gt(d);if(!(!f||r.disposed||r.tooFar(h))){var g=c(f),b;if(u==="bypass")b=!!l;else{var y=La(f,u);if(!y)return;b=ge(y,l,Pe(y,g.dials))}return u==="bypass"?g.bypass=b:g.dials[u]=b,r.post({t:"p",i:Qt[f][u],v:en(f,u,b),when:r.whenOf(h)}),r.emit({effect:f,key:u,value:b}),Nt(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function($){return $.key===u}))){var m=g.dials[p.key],v=ge(p,m,Pe(p,g.dials));v!==m&&(g.dials[p.key]=v,r.post({t:"p",i:Qt[f][p.key],v:en(f,p.key,v),when:r.whenOf(h)}),r.emit({effect:f,key:p.key,value:v}))}}),b}},s.getParam=function(d,u){var l=gt(d);if(l){var h=c(l);return u==="bypass"?h.bypass:h.dials[u]}},s.getState=function(){return so(i)},s.setState=function(d,u){r.disposed||r.tooFar(u&&u.at)||(i=Jt(d),r.post({t:"load",program:Array.from(Yt(i)),when:r.whenOf(u&&u.at)}),r.emit({effect:null,key:null,value:null}))},s}function Eo(t,e){var n=e.slots===!0?bt:Math.max(1,Math.min(Ao,Math.floor(+e.slots)||bt)),i=pt(e.state,n),o=1,r={};function s(p){return r[p.id]||(r[p.id]=o++),r[p.id]}function c(p){return p.map(function(m){return{uid:s(m),type:m.type,program:Te(m)}})}var d=c(i.chain),u=i.chain.map(function(p){return r[p.id]}),l=Ea(t,e,function(){return{slots:n,chain:d,order:u}},function(){return[{t:"sync",chain:c(i.chain),order:i.chain.map(function(p){return r[p.id]}),when:0}]}),h=l.core;function f(p){var m;for(m=0;m<i.chain.length;m++)if(i.chain[m].id===p)return i.chain[m];var v=$n(p);if(v){for(m=0;m<i.chain.length;m++)if(i.chain[m].type===v)return i.chain[m]}return null}function g(p,m){var v=s(p);l.post({t:"add",uid:v,type:p.type,when:m}),Te(p).forEach(function($){l.post({t:"ps",uid:v,k:$[0],v:$[1],when:m,snap:!0})})}function b(p){l.post({t:"order",uids:i.chain.map(function(m){return r[m.id]}),when:p})}function y(p,m){var v={};i.chain.forEach(function(w){v[w.id]=w});var $=i.chain.map(function(w){return r[w.id]}).join();p.chain.forEach(function(w){var x=v[w.id];if(!x||x.type!==w.type){delete r[w.id],g(w,m);return}var L={};Te(x).forEach(function(E){L[E[0]]=E[1]}),Te(w).forEach(function(E){L[E[0]]!==E[1]&&l.post({t:"ps",uid:r[w.id],k:E[0],v:E[1],when:m})})});var A={};p.chain.forEach(function(w){A[w.id]=!0}),Object.keys(r).forEach(function(w){A[w]||delete r[w]}),i=p,i.chain.map(function(w){return r[w.id]}).join()!==$&&b(m)}return h.slots=n,h.setParam=function(p,m,v,$){var A=f(p);if(!(!A||l.disposed||l.tooFar($))){var w=le(A.type),x,L=null;if(m==="bypass")x=!!v;else{for(var E=0;E<w.dials.length;E++)w.dials[E].key===m&&(L=w.dials[E]);if(!L)return;x=ge(L,v,Pe(L,A.dials))}var U={},q={};Te(A).forEach(function(T){U[T[0]]=T[1]}),w.dials.forEach(function(T){T.stepWhen&&(q[T.key]=A.dials[T.key])}),m==="bypass"?A.bypass=x:A.dials[m]=x,w.dials.forEach(function(T){T.stepWhen&&(A.dials[T.key]=ge(T,A.dials[T.key],Pe(T,A.dials)))});var xe=l.whenOf($),Se=r[A.id];return Te(A).forEach(function(T){(U[T[0]]!==T[1]||L&&T[0]===L.k)&&l.post({t:"ps",uid:Se,k:T[0],v:T[1],when:xe})}),l.emit({effect:A.id,key:m,value:x}),Object.keys(q).forEach(function(T){T!==m&&A.dials[T]!==q[T]&&l.emit({effect:A.id,key:T,value:A.dials[T]})}),x}},h.getParam=function(p,m){var v=f(p);if(v)return m==="bypass"?v.bypass:v.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(i))},h.setState=function(p,m){l.disposed||l.tooFar(m&&m.at)||(y(pt(p,n),l.whenOf(m&&m.at)),l.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var v=m||{},$=Ma(p,i.chain);if(!(!$||i.chain.length>=n||l.disposed||l.tooFar(v.at))){if(v.dials){var A=pt({v:2,chain:[{id:$.id,type:$.type,dials:v.dials}]},1).chain[0];$.dials=A.dials}v.bypass===!0&&($.bypass=!0);var w=i.chain.slice(),x=typeof v.index=="number"?Math.max(0,Math.min(w.length,v.index)):w.length;return w.splice(x,0,$),y({v:2,chain:w},l.whenOf(v.at)),l.emit({effect:$.id,key:"chain",value:"add"}),$.id}},h.removeEffect=function(p,m){var v=f(p),$=m&&m.at;return!v||l.disposed||l.tooFar($)?!1:(y({v:2,chain:i.chain.filter(function(A){return A!==v})},l.whenOf($)),l.emit({effect:v.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,v){var $=f(p),A=v&&v.at;if(!$||l.disposed||l.tooFar(A))return!1;var w=fo(i.chain,i.chain.indexOf($),m);return w===i.chain?!1:(y({v:2,chain:w},l.whenOf(A)),l.emit({effect:$.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:mo(p),bypass:p.bypass}})},h.toAstrid=function(){return $o(i)},h}function Gn(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Co(t,e,n){var i=n||{},o=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,r=typeof i.toAudioTime=="function"?i.toAudioTime:o?function(f){return o.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,c=e&&e.transport?e.transport:e,d=c&&c.tempo?c.tempo:c,u=!1;function l(f){if(!r){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!c||typeof c.timeAt!="function"||typeof f!="number")){var g=r(c.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function h(){var f=s&&c&&typeof c.beatAt=="function"?c.beatAt(s()):NaN;if(!isFinite(f)){var g=c&&typeof c.bpm=="number"?c.bpm:Gn(d,0);g>0&&t.setTempo(g);return}var b=Gn(d,f);b>0&&t.setTempo(b);for(var y=d&&(d.points||d.tempoPoints)||[],p=0;p<y.length;p++){var m=y[p];if(m.beat>f&&m.bpm>0){var v=l(m.beat);v!==void 0&&t.setTempo(m.bpm,v)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,l(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&h())})}const To="/nyx/assets/worklet-CnpUVY5i.js";var Io="nc-ui",Ca={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},tn={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ve={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},qe=t=>`--${Io}-${t}`,nn=Ca["label-on-fill-dark"],Fn=Ca["label-on-fill-light"],No=ve["label-min-contrast"],zo=/^#[0-9a-f]{6}$/i,Ro=t=>typeof t=="string"&&zo.test(t),ht=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Hn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${ht(o(0)*255)}${ht(o(8)*255)}${ht(o(4)*255)}`}function Ta(t){let[e,n,i]=[1,3,5].map(u=>parseInt(t.slice(u,u+2),16)/255),o=Math.max(e,n,i),r=Math.min(e,n,i),s=(o+r)/2,c=o-r;if(!c)return{h:0,s:0,l:s};let d=c/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-i)/c%6):o===n?60*((i-e)/c+2):60*((e-n)/c+4))+360)%360,s:d,l:s}}function Zn(t){let[e,n,i]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function an(t,e){let[n,i]=[Zn(t),Zn(e)].sort((o,r)=>r-o);return(n+.05)/(i+.05)}var yt=t=>an(t,nn)>=an(t,Fn)?nn:Fn;function Ia(t,e,n,i=No){let o=Hn(t,e,n),r=yt(o)===nn?1:-1;for(let s=0;s<40&&an(o,yt(o))<i;s++)n+=r*.01,o=Hn(t,e,n);return o}function jo(t){let{h:e,s:n}=Ta(t),i=Ia(e,Math.min(n,ve["surprise-on-max-saturation"]),ve["surprise-on-lightness"]);return{fill:t,ink:yt(t),on:i,onInk:yt(i)}}var Bo=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Po(t,e=Math.random){let[n,i]=ve["surprise-saturation"],[o,r]=ve["surprise-lightness"],s=ve["surprise-min-hue-gap"],c=Ro(t)?Ta(t).h:null,d=e()*360;return c!==null&&Bo(d,c)<s&&(d=(c+s+e()*(360-2*s))%360),Ia(d,n+e()*(i-n),o+e()*(r-o))}function Wo(t){if(!t)return null;let e=jo(t);return{[qe("surprise-fill")]:e.fill,[qe("surprise-ink")]:e.ink,[qe("surprise-on")]:e.on,[qe("surprise-on-ink")]:e.onInk}}var Oo=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Go=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Dn(t){let[e,n,i]=[1,3,5].map(c=>Oo(parseInt(t.slice(c,c+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function Fo([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*o+.2309699292*r,-1.2684380046*i+2.6097574011*o-.3413193965*r,-.0041960863*i-.7034186147*o+1.707614701*r].map(s=>ht(Go(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ho=ve["velocity-range"],Na={min:tn.rhythm["velocity-min"],max:tn.rhythm["velocity-max"]};function Zo(t,e=Na){let[n,i]=Ho,o=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,r=(o-n)/(i-n),s=tn.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let c=Dn(e.min),d=Dn(e.max);return{velocity:o,t:r,fill:Fo(c.map((u,l)=>u+(d[l]-u)*r)),ink:s}}function Yn(t,e=Na){return{[qe("velocity-fill")]:Zo(t,e).fill}}var Do={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Yo={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Xo={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},_o={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},zt={};for(let[t,e]of Object.entries(Yo))zt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(_o))zt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Xo))zt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Do.renames.map(t=>[t.old,t.new]));function za(t){let e=zt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function B(t){return za(t).prop}function a(t){return`var(${B(t)})`}function Uo(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(B(e)));return Number.isFinite(n)?n:0}function O(t,e){let n=za(e),i=t.ownerDocument??document,o=i.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:i.documentElement).append(o);let s=(i.defaultView??window).getComputedStyle(o),c=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),c}function qo(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Vo(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var Ko="[data-modulated], [data-modulated] *";function Jo(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${B("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${B("divider")}: ${a(`module-div-stack-${i}`)};
      ${B("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${B("text-sub")}: ${a("module-sub-stack-1")};
      ${B("divider")}: ${a("module-div-stack-1")};
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
${Ko} { transition: none; }
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
  ${B("text-sub")}: ${a("module-sub-stack-1")};
  ${B("divider")}: ${a("module-div-stack-1")};
  ${B("slider-track")}: ${a("module-div-stack-1")};
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
  ${B("text-sub")}: ${a("module-sub-stack-1")};
  ${B("divider")}: ${a("module-div-stack-1")};
  ${B("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${B("text-sub")}: inherit;
  ${B("divider")}: inherit;
  ${B("slider-track")}: inherit;
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
`}var Xt=null,Qo="nc-ui-fallback";function Ra(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Xt&&Xt.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Qo} {
${Jo()}
}
`,t.head.append(e),Xt=e}var Ue=null,er=0,tr=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,ja=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=tr,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&ja(document);function nr({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:o=!1,root:r,returnFocus:s,signal:c}){if(Ue||c?.aborted)return Promise.resolve(!1);let d=r?.ownerDocument??document,u=ja(d),l=r??d.body,h=d.defaultView??globalThis,f=`nc-ui-confirm-${++er}`,g=(C,ce,te)=>{let Le=d.createElement(C);return Le.className=`nc-ui-confirm${ce}`,te!=null&&(Le.textContent=te),Le},b=g("div","-layer");b.dataset.state="enter";let y=g("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${f}-t`),y.setAttribute("aria-describedby",`${f}-b`);let p=g("h2","-title",t);p.id=`${f}-t`;let m=g("p","-body",e);m.id=`${f}-b`;let v=g("div","-actions"),$=(C,ce)=>{let te=g("button","-btn",C);return te.type="button",te.dataset.ncConfirm=ce,te.addEventListener("click",()=>Ae(ce==="ok")),te},A=$(i,"cancel"),w=$(n,"ok");o&&(w.dataset.danger="true"),v.append(A,w),y.append(p,m,v),b.append(y);let x={layer:b};Ue=x;let L=s??d.activeElement,E=[];for(let C of l.children)C.hasAttribute("inert")||(C.setAttribute("inert",""),E.push(C));let U=()=>{if(Ue!==x)return;l.append(b),A.focus({preventScroll:!0});let C=h.requestAnimationFrame?.bind(h)??(ce=>setTimeout(ce,16));C(()=>C(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};u?u.then(U):U();let q=!1;b.addEventListener("pointerdown",C=>{q=C.target===b}),b.addEventListener("click",C=>{C.target===b&&q&&Ae(!1),q=!1});let xe=C=>{C.stopImmediatePropagation(),C.key==="Escape"?(C.preventDefault(),Ae(!1)):C.key==="Tab"?(C.preventDefault(),(d.activeElement===A?w:A).focus()):C.key==="Enter"&&(C.preventDefault(),d.activeElement===w?Ae(!0):d.activeElement===A&&Ae(!1))},Se=C=>C.stopImmediatePropagation();h.addEventListener("keydown",xe,!0),h.addEventListener("keyup",Se,!0);let T=()=>Ae(!1);c?.addEventListener("abort",T);let Nn,Li=new Promise(C=>{Nn=C});function Ae(C){if(Ue!==x)return;Ue=null,h.removeEventListener("keydown",xe,!0),h.removeEventListener("keyup",Se,!0),c?.removeEventListener("abort",T);for(let Me of E)Me.removeAttribute("inert");b.dataset.state="closing",L?.isConnected&&typeof L.focus=="function"&&L.focus({preventScroll:!0});let ce=h.getComputedStyle?.(b),te=Math.max(0,...String(ce?.transitionDuration??"").split(",").map(Me=>Number.parseFloat(Me)*(Me.trim().endsWith("ms")?1:1e3)||0)),Le=()=>b.remove();b.addEventListener("transitionend",Me=>Me.target===b&&Le()),setTimeout(Le,te+50),Nn(C)}return Li}function Ba(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",i.append(o,r),n.append(i);let s=!1,c=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};c(t.checked);let d=()=>{c(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:c,destroy(){n.removeEventListener("click",d),n.remove()}}}var Pa=new WeakMap,Xn=.25;function ar(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(i,o);let r=0,s=t.step??.005,c=t.onChange,d=t.onReset,u=p=>Math.min(1,Math.max(0,p)),l=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{let m=u(p);m!==r&&(r=m,l(),c?.(m))},f=0,g=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();p.target!==o&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!g)return;let m=n.getBoundingClientRect().height||1,v=(f-p.clientY)/m*(p.shiftKey?Xn:1);f=p.clientY,h(r+v)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),n.addEventListener("keydown",p=>{let m=p.shiftKey?s*Xn:s,v={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in v&&(p.preventDefault(),h(v[p.key]))});let y={el:n,get value(){return r},get dragging(){return g},set(p){g||(r=u(Number(p)||0),l())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(c=p.onChange),p.onReset&&(d=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),Pa.set(n,y),y}function ir(t){return Pa.get(t)}var Wa=new WeakMap,or=.2,rr=1.5,sr=.5;function lr(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function _n(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:lr(i.getComputedStyle(t).getPropertyValue(B(e)),n)}function cr(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let m=e.createElement("span");m.className="nc-meter-peak";let v=e.createElement("span");v.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",p.append(m,v,$),r.append(p),s.push({peak:m,rms:v,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(o,r);let c=t.label,d=t.onClear,u=!1,l=-1,h=-1,f=()=>{o.dataset.lit=u?"true":"false",o.setAttribute("aria-pressed",u?"true":"false"),o.setAttribute("aria-label",u?`${c} clipped: clear`:`${c} clip light`),o.title=u?"Clipped. Click to clear":"Clip light"},g=(y,p,m,v)=>{let $=Math.round(v*1e3)/1e3;m[p]!==$&&(m[p]=$,y.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};o.addEventListener("click",()=>{b.clear(),d?.()});let b={el:i,get clipped(){return u},update(y,p){l<0&&(l=_n(i,"motion-meter-fall",or)),h<0&&(h=_n(i,"motion-meter-hold",rr));let m=Math.max(0,Math.min(.25,Number(p)||0)),v=l>0?Math.exp(-m/l):0;s.forEach(($,A)=>{let w=y[A]??y[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(w.peak)||0)),L=Math.min(x,Math.max(0,Number(w.rms)||0));w.over&&b.clip(),$.level.peak=x>=$.level.peak?x:x+($.level.peak-x)*v,$.level.rms=L>=$.level.rms?L:L+($.level.rms-L)*v,$.holdAge+=m,x>=$.holdAt?($.holdAt=x,$.holdAge=0):$.holdAge>h&&($.holdAt=Math.max(x,$.holdAt-sr*m)),g($.peak,"peak",$.shown,$.level.peak),g($.rms,"rms",$.shown,$.level.rms),g($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,f())},clear(){u=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){c=y,f()},configure(y){y.onClear&&(d=y.onClear)}};return f(),b.reset(),Wa.set(i,b),b}function dr(t){return t?Wa.get(t):void 0}function ur(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(n*i));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function de(t){return Math.max(0,Math.min(1,t))}function Oa(t,e){let{ctx:n,w:i,h:o}=ur(t);if(!n)return;n.clearRect(0,0,i,o);let r=Vo(t);if(e.paint==="swatch"){let d=O(t,"accent"),u=O(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=u,n.fillStyle=d,n.fillRect(0,0,i/2,o),n.fillStyle=u,n.fillRect(i/2,0,i/2,o);return}if(e.paint==="filter"){let d=e.mode??"lp",u=O(t,qo(d)),l=O(t,"divider"),h=de(e.cutoff??.5),f=.08+(1-de(e.resonance??.2))*.22;n.strokeStyle=l,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(i,o*.72),n.stroke(),n.beginPath();for(let g=0;g<=i;g++){let b=g/Math.max(1,i),y=0;d==="lp"?y=b<h?1:Math.max(0,1-(b-h)/f):d==="hp"?y=b>h?1:Math.max(0,1-(h-b)/f):y=Math.max(0,1-Math.abs(b-h)/f);let p=o*.78-y*o*.62;g===0?n.moveTo(g,p):n.lineTo(g,p)}n.strokeStyle=u,n.stroke(),n.fillStyle=O(t,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,o),t.dataset.ncAccent=u;return}if(e.paint==="envelope"){n.strokeStyle=O(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let u=0;u<=i;u++){let l=u/Math.max(1,i),h=(o-4)*(1-Math.exp(-l*4/d));n.lineTo(u,o-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let d=Array.isArray(e.peaks)?e.peaks:[],[u,l]=Array.isArray(e.region)?e.region:[0,1],h=O(t,"accent"),f=O(t,"text-sub"),g=o/2;n.fillStyle=O(t,"accent-soft"),n.fillRect(de(u)*i,0,(de(l)-de(u))*i,o),n.strokeStyle=O(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(i,g),n.stroke();let b=Math.floor(d.length/2);for(let y=0;y<b;y++){let p=(y+.5)/b*i,m=Math.max(-1,Math.min(1,d[y*2]??0)),v=Math.max(-1,Math.min(1,d[y*2+1]??0)),$=(y+.5)/b;n.strokeStyle=$>=u&&$<=l?h:f,n.beginPath(),n.moveTo(p,g-v*(g-1)),n.lineTo(p,g-m*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[u,l,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round(de(y)*(i-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=O(t,"text"),n.fillRect(Math.round(de(e.position)*(i-1)),0,1,o)),b||(n.fillStyle=f,n.font=r,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let d=de(e.level??0);n.fillStyle=O(t,"divider"),n.fillRect(0,o*.4,i,o*.2),n.fillStyle=O(t,"accent"),n.fillRect(0,o*.4,i*d,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),c=((e.step??0)%s+s)%s;n.fillStyle=O(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,i,o*.1),n.fillStyle=O(t,"rhythm.playhead"),n.fillRect(c/s*i,o*.3,Math.max(1,i/s),o*.4),t.dataset.ncAccent=O(t,"accent")}var Ga={slop:8,longPressMs:500,pitchPx:16},pr=class{constructor(t,e,n=Ga){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function hr(t,e,n,i=Ga){let o=!1,r=0,s=(u,l)=>{let h=t.ownerDocument.elementFromPoint?.(u,l),f=[...t.querySelectorAll(e)],g=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(g>=0)return g;let b=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,m)=>{if(p.hidden)return;let v=p.getBoundingClientRect();if(l<v.top||l>v.bottom)return;let $=Math.abs(u-(v.left+v.width/2));$<y&&$<=v.width&&(b=m,y=$)}),b},c=new pr(s,u=>{(u.kind==="paint"||u.kind==="long")&&(o=!0),n(u)},i),d=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",u=>{u.button>0||(o=!1,c.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(d(),r=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",u=>{c.state!=="idle"&&(c.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),c.state!=="pending"&&d())}),t.addEventListener("pointerup",u=>{d(),c.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),t.addEventListener("pointercancel",u=>{d(),c.cancel(u.pointerId)}),t.addEventListener("click",u=>{o&&(o=!1,u.stopPropagation(),u.preventDefault())},!0),t.addEventListener("contextmenu",u=>u.preventDefault()),c}var lt="application/x-nc-pad",Un="http://www.w3.org/2000/svg";function mr(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),i=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*e/n),c=Math.max(s+1,Math.floor((r+1)*e/n)),d=0,u=0;for(let h=s;h<c;h++)d=Math.min(d,t[2*h]??0),u=Math.max(u,t[2*h+1]??0);let l=n===1?50:r/(n-1)*100;i.push(`${l.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),o.push(`${l.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${i.join("L")}L${o.reverse().join("L")}Z`}function fr(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let i=document.createElement("div");return i.className="nc-padgrid-pads",i.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,r)=>i.append(gr(n,r,e))),n.append(i),n.addEventListener("keydown",o=>{o.key==="Escape"&&mt(n)}),Ha(n,t),n}function gr(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-padgrid-pad",i.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let c=document.createElement("span");c.className="nc-padgrid-pad-badge";let d=document.createElementNS(Un,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let u=document.createElementNS(Un,"path");return d.append(u),i.append(o,r,s,c,d),yr(t,i,e,n),i.addEventListener("dblclick",()=>{let l=n(t);l?.type==="padGrid"&&l.onRename&&i.dataset.empty!=="true"&&Fa(t,i,e,n)}),i.addEventListener("dragstart",l=>{if(i.dataset.empty==="true"||!l.dataTransfer){l.preventDefault();return}l.dataTransfer.setData(lt,String(e)),l.dataTransfer.effectAllowed="copyMove",i.dataset.dragging="true"}),i.addEventListener("dragend",()=>delete i.dataset.dragging),i.addEventListener("dragover",l=>{let h=l.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(lt)||(l.preventDefault(),l.stopPropagation(),l.dataTransfer&&(l.dataTransfer.dropEffect=h.includes(lt)&&!l.altKey?"move":"copy"),i.dataset.drop="true")}),i.addEventListener("dragleave",()=>delete i.dataset.drop),i.addEventListener("drop",l=>{delete i.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let f=l.dataTransfer?.getData(lt);if(f!==void 0&&f!==""){l.preventDefault(),l.stopPropagation();let b=Number(f);b!==e&&h.onMove?.(b,e,l.altKey);return}let g=l.dataTransfer?.files?.[0];g&&(l.preventDefault(),l.stopPropagation(),h.onFile?.(e,g))}),i}function br(t,e,n){let i=n(t);i?.type==="padGrid"&&i.onPress(e)}function yr(t,e,n,i){let o=0,r=!1,s=0,c=0,d=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",u=>{if(u.button!==0)return;r=!1,s=u.clientX,c=u.clientY,d();let l=i(t);l?.type==="padGrid"&&(l.onDown?.(n),!(l.onDown&&u.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=qn(t,e,n,i)},450)))}),e.addEventListener("pointermove",u=>{o&&Math.hypot(u.clientX-s,u.clientY-c)>8&&d()});for(let u of["pointerup","pointercancel","pointerleave"])e.addEventListener(u,d);e.addEventListener("contextmenu",u=>{u.preventDefault(),d(),r=qn(t,e,n,i)}),e.addEventListener("click",()=>{if(r){r=!1;return}br(t,n,i)})}function qn(t,e,n,i){let o=i(t);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;mt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),mt(t)}),s.addEventListener("click",l=>l.stopPropagation());let c=document.createElement("div");c.className="nc-slot-menu nc-padgrid-pad-menu",c.setAttribute("role","menu"),c.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let l of r){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=l.id,h.textContent=l.label,h.addEventListener("click",()=>{mt(t);let f=i(t);f?.type==="padGrid"&&(l.id==="rename"&&f.onRename?Fa(t,e,n,i):f.onMenu?.(n,l.id))}),c.append(h)}t.append(s,c);let d=t.getBoundingClientRect(),u=e.getBoundingClientRect();return c.style.left=`${u.left-d.left}px`,c.style.top=`${u.bottom-d.top}px`,c.querySelector("button")?.focus(),!0}function Fa(t,e,n,i){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=i(t);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),c=e.getBoundingClientRect();r.style.left=`${c.left-s.left}px`,r.style.top=`${c.top-s.top}px`,r.style.width=`${c.width}px`;let d=!1,u=l=>{if(d)return;d=!0;let h=r.value.trim();r.remove(),e.focus();let f=i(t);l&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};r.addEventListener("keydown",l=>{l.stopPropagation(),l.key==="Enter"?u(!0):l.key==="Escape"&&u(!1)}),r.addEventListener("blur",()=>u(!0));for(let l of["pointerdown","click","dblclick"])r.addEventListener(l,h=>h.stopPropagation());t.append(r),r.focus(),r.select()}function mt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Ha(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((i,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),c=r.querySelector(".nc-padgrid-pad-hint"),d=r.querySelector(".nc-padgrid-pad-wave path"),u=r.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=i.empty?"":i.badge??""),r.draggable=!i.empty,i.empty?(r.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),c&&(c.textContent=e.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=i.label),c&&(c.textContent=""),d?.setAttribute("d",mr(i.peaks))),i.lane?r.dataset.ncLane=String(i.lane):delete r.dataset.ncLane;let l=e.selected===o;l?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",l?"true":"false"),i.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",i.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${i.label}${i.badgeLabel?`, ${i.badgeLabel}`:""}${l?", selected":""}`)})}function Z(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Rt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(i,o),n}function Vn(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function et(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var wr=450,Kn=8;function ie(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function vr(t){let e=Uo(t,"target-min");return e>0?e:44}function $r(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=vr(t),i=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],c=o[r];if(!(s instanceof HTMLElement)||!c||c.width===0||c.height===0)continue;if(c.width>=n&&c.height>=n){s.style.display="none";continue}let d=c.left+c.width/2,u=c.top+c.height/2,l=d-i,h=d+i,f=u-i,g=u+i;for(let b=0;b<e.length;b++){if(r===b)continue;let y=o[b];if(!y||y.width===0)continue;let p=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-u)<i*2&&(p>d?h=Math.min(h,(d+p)/2):p<d&&(l=Math.max(l,(d+p)/2))),Math.abs(p-d)<i*2&&(m>u?g=Math.min(g,(u+m)/2):m<u&&(f=Math.max(f,(u+m)/2)))}l=Math.min(l,c.left),h=Math.max(h,c.right),f=Math.min(f,c.top),g=Math.max(g,c.bottom),s.style.left=`${l-c.left}px`,s.style.top=`${f-c.top}px`,s.style.width=`${Math.max(0,h-l)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function Za(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Jn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function wt(t,e){switch(t.type){case"slider":return kr(t,e);case"select":return Sr(t,e);case"toggle":return Ar(t,e);case"button":return Lr(t,e);case"readout":return Mr(t);case"label":return Er(t);case"note":return Qn(t);case"knob":return Ir(t,e);case"choice":return Nr(t,e);case"slotRow":return zr(t,e);case"stepGrid":return Pr(t,e);case"canvas":return Gr(t);case"fx":return Dr(t,e);case"strip":return Fr(t,e);case"stripAdd":return Zr(t,e);case"padGrid":return fr(t,e);default:return Qn({id:"unknown",text:""})}}function be(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Da(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??et(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Vn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Vn(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Cr(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??et(e.value))}else if(e.type==="choice")Ya(t,e);else if(e.type==="slotRow")_a(t,e);else if(e.type==="stepGrid")on(t,e);else if(e.type==="padGrid")Ha(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Oa(n,e)}else if(e.type==="strip"){Ka(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${sa(n.id)}"]`);i instanceof Element&&be(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")qa(t,e);else if(e.type==="fx"){Ja(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${sa(n.id)}"]`);i instanceof Element&&be(i,n)}}}}function kr(t,e){let n=Rt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{let r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(i,o),t.onTap&&n.insertBefore(xr(t,i,e),o),n.append(Z()),be(n,t),n}function xr(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(ie());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),i}function Sr(t,e){let n=Rt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let o of t.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,i.append(r)}return i.value=t.value,i.addEventListener("change",()=>{let o=e(i);o?.type==="select"&&o.onChange(i.value)}),n.append(i,Z()),n}function Ar(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(Z()),be(n,t),n}function Lr(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(Z()),be(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=Za(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Ua(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,o),i}function Mr(t){let e=Rt(t.id,t.label);return e.append(Z()),be(e,t),e}function Er(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(Z()),e}function Qn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(Z()),e}function ea(t){if(typeof t.valueText=="string")return t.valueText;let e=et(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Da(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Cr(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;Da(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",ea(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${ea(e)}`}function Tr(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function Ir(t,e){let n=Rt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",i.append(o);let r=0,s=0;i.addEventListener("pointerdown",d=>{r=d.clientY;let u=e(i);s=u&&"value"in u?Number(u.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let u=e(i);if(u?.type!=="knob")return;let l=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-r)*l/120));u.onChange(h)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let u=e(i);if(u?.type!=="knob")return;let l=Tr(u,d);l!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,l))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(i,c),n.append(Z()),be(n,t),n}function Nr(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=i.value,o.setAttribute("role","tab"),o.textContent=i.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(i.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],c=s.indexOf(o),d=c;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(c+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(c-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let u=s[d];u instanceof HTMLButtonElement&&(r.preventDefault(),u.focus(),u.click())}),n.append(o)}return n.append(Z()),Ya(n,t),n}function Ya(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function zr(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let l=0;l<t.slots.length;l++){let h=t.slots[l],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(l),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,ie()),Rr(f,g,n,l,e),i.append(f)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Za(),o.append(ie()),o.addEventListener("click",()=>{Ua(n);let l=e(n);l?.type==="slotRow"&&l.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let c=document.createElement("input");c.type="range",c.className="nc-range nc-morph",c.min="0",c.max="4",c.step="0.01",c.setAttribute("aria-label","Morph time"),c.addEventListener("input",()=>{let l=e(n);l?.type==="slotRow"&&l.onMorph(Number(c.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,c);let u=document.createElement("div");return u.className="nc-slot-line",u.append(i,...o?[o]:[]),n.append(u,r,Z()),Xa(n,e),_a(n,t),n}function ta(t,e,n,i){let o=n(t);if(o?.type!=="slotRow")return;Ve(t);let r=i.shiftKey?"store":i.altKey?"clear":"recall";o.onSlot(e,r)}function Rr(t,e,n,i,o){let r=0,s=0,c=0,d=!1,u=!1,l=!1,h=!1,f=()=>{window.clearTimeout(r),r=0},g=m=>{let v=m.clientX-s,$=m.clientY-c;v*v+$*$>Kn*Kn&&(d=!0,f())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=m=>{let v=r!==0&&!d&&!u;f(),b(),v&&(l=!0,ta(n,i,o,m))},p=()=>{d=!0,f(),b()};t.addEventListener("pointerdown",m=>{m.button===0&&(b(),u=!1,d=!1,l=!1,s=m.clientX,c=m.clientY,f(),r=window.setTimeout(()=>{r=0,!d&&(u=!0,jr(n,e,i,o))},wr),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(l||u||d){l=!1,u=!1,d=!1;return}ta(n,i,o,m)})}function Xa(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=na("Save","store"),o=na("Clear","clear");n.append(i,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ve(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let c=s.target;if(!(c instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(d.onSlot(u,"store"),Ve(t)):c.dataset.ncSlotOp==="clear"&&(d.onSlot(u,"clear"),Ve(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&Ve(t)})}function na(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function jr(t,e,n,i){Xa(t,i);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),c=e.getBoundingClientRect();o.style.left=`${c.left-s.left}px`,o.style.top=`${c.bottom-s.top}px`,o.querySelector("button")?.focus()}function Ve(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function _a(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let c=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...c.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Ua(t){let e=t.dataset.ncLastFill||null,n=Po(e);t.dataset.ncLastFill=n;let i=Wo(n);if(i)for(let[o,r]of Object.entries(i))t.style.setProperty(o,r)}function Br(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,o=r=>{if(i===r)return;i=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Pr(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let o=p=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,i.append(m),m},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let c=p=>{for(let m of[r,s]){let v=m===p;m.setAttribute("aria-checked",v?"true":"false"),m.tabIndex=v?0:-1}};c(r);for(let p of[r,s])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let m=s.getAttribute("aria-checked")==="true"?r:s;c(m),m.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(i),t.onFill&&d.append(Br(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),d.append(p)}n.append(d);for(let p of t.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=p.label,v.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(v.dataset.ncLane=String((p.lane-1)%4+1)),v.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid")return;let x=w.rows.findIndex(L=>L.id===p.id);w.onSelectRow?.(x)}),v.addEventListener("keydown",w=>Wr(n,v,w));let $=[];for(let w of["mute","solo"]){if(!(w==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=w,L.textContent=w==="mute"?"M":"S",L.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${p.label}`),x.append(L,ie()),x.addEventListener("click",()=>{let E=e(n);if(E?.type!=="stepGrid")return;let U=E.rows.findIndex(q=>q.id===p.id);(w==="mute"?E.onMute:E.onSolo)?.(U)}),$.push(x)}let A=document.createElement("div");A.className="nc-steps";for(let w=0;w<p.steps.length;w++){let x=document.createElement("span");x.className="nc-step-wrap";let L=document.createElement("button");L.type="button",L.className="nc-step",L.dataset.ncStep=`${p.id}:${w}`,L.setAttribute("aria-label",`${p.label} step ${w+1}`),x.append(L,ie()),x.addEventListener("click",E=>{let U=e(n);if(U?.type!=="stepGrid")return;let q=U.rows.findIndex(Se=>Se.id===p.id),xe=s.getAttribute("aria-checked")==="true";U.onToggle(q,w,E.shiftKey||xe)}),A.append(x)}if(t.onLength&&A.append(Or(n,A,p,e)),m.append(...$,v,A),t.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=p.id,w.setAttribute("aria-label",`Re-roll ${p.label}`),w.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=Jn(),w.append(ie()),w.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(L=>L.id===p.id))}),m.append(w)}m.addEventListener("click",w=>{if(w.target!==m)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(L=>L.id===p.id))}),aa(n,A,".nc-step-wrap",e,s,()=>p.id),n.append(m)}let u=document.createElement("div");u.className="nc-pads-head";let l=(p,m,v)=>{let $=document.createElement("button");return $.type="button",$.className=p,$.textContent=m,v&&$.setAttribute("aria-label",v),$},h=l("nc-pads-step","‹","Previous lane"),f=l("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",on(n,p))}));for(let[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let $=v.rows.length;v.onSelectRow?.(((ct(v)+m)%$+$)%$)});if(u.append(h,g,f),t.onDice){let p=l("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Jn(),p.addEventListener("click",()=>{let m=e(n);if(m?.type!=="stepGrid")return;let v=ct(m);v>=0&&m.onDice?.(v)}),u.append(p)}if(t.transport){let p=l("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),u.append(p)}n.append(u);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",v=>{let $=e(n);if($?.type!=="stepGrid")return;let A=ct($);if(A<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(A,p+1);return}let w=s.getAttribute("aria-checked")==="true";$.onToggle(A,p,v.shiftKey||w)}),b.append(m)}return aa(n,b,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[ct(p)]?.id:void 0}),n.append(b),n.append(Z()),on(n,t),n}function ct(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function aa(t,e,n,i,o,r){let s="on",c=!0,d=-1,u=(l,h)=>{let f=l.rows[d]?.steps[h];!f||h>=l.rows[d].length||(l.onSet?l.onSet(d,h,s,c):!!f[s]!==c&&l.onToggle(d,h,s==="accent"))};hr(e,n,l=>{let h=i(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(l.kind!=="paint")return;let f=h.rows.findIndex(g=>g.id===r());f>=0&&h.rows[f].length!==l.pad+1&&h.onLength?.(f,l.pad+1);return}if(l.kind==="paint"){if(l.phase==="start"){let f=r();d=h.rows.findIndex(b=>b.id===f);let g=h.rows[d]?.steps[l.pad];if(!g)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",c=!g[s]}u(h,l.pad)}else if(l.kind==="long"){let f=r(),g=h.rows.findIndex(y=>y.id===f),b=e.querySelectorAll(n)[l.pad];g>=0&&b instanceof HTMLElement&&h.onLongPress?.(g,l.pad,b)}}})}function Wr(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],o=i.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=i.length-1;let s=i[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Or(t,e,n,i){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(ie());let r=u=>{let l=i(t);if(l?.type!=="stepGrid")return;let h=l.rows.findIndex(b=>b.id===n.id),f=l.rows[h];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,u));g!==f.length&&l.onLength?.(h,g)},s=u=>{let l=[...e.querySelectorAll(".nc-step")],h=1;return l.forEach((f,g)=>{let b=f.getBoundingClientRect();b.width>0&&u>=b.left+b.width/2&&(h=g+1)}),h},c=u=>r(s(u.clientX)),d=()=>{window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete o.dataset.dragging};return o.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",c),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),o.addEventListener("keydown",u=>{let l=i(t);if(l?.type!=="stepGrid")return;let h=l.rows.find(g=>g.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};u.key in f&&(u.preventDefault(),r(f[u.key]))}),o}var _t=new WeakMap;function ia(t,e){let n=typeof e=="number"?e:null;if(!(_t.has(t)&&_t.get(t)===n)){if(_t.set(t,n),n===null){for(let i of Object.keys(Yn(1)))t.style.removeProperty(i);return}for(let[i,o]of Object.entries(Yn(n)))t.style.setProperty(i,o)}}function on(t,e){let n=e.rows.some(l=>l.solo),i=t.querySelector("[data-nc-clear]");i&&i.textContent!==(e.clearLabel??"Clear")&&(i.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),r=e.rows.find(l=>l.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),c=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&r&&(s.textContent=c?`${r.label} · ${r.length}`:r.label,e.onLength&&(s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let d=t.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&r&&(d.setAttribute("aria-label",`Re-roll ${r.label}`),d.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let l=!!e.transport?.playing,h=e.transport?.label??(l?"Stop":"Play");u.textContent!==h&&(u.textContent=h),u.setAttribute("aria-pressed",l?"true":"false");let f=e.transport?.ariaLabel;f?u.setAttribute("aria-label",f):u.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let l=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let f=Number(h.getAttribute("data-nc-pad")),g=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!g||!c&&f>=r.length,c&&f>=r.length?h.dataset.out="true":delete h.dataset.out,c&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,ia(h,g?.velocity),e.playhead>=0&&f===l?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let l of e.rows){for(let g=0;g<l.steps.length;g++){let b=l.steps[g],y=t.querySelector(`[data-nc-step="${l.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===l.id?p.dataset.selected="true":delete p.dataset.selected;let $=p.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===l.id?"true":"false"),$.textContent!==l.label&&($.textContent=l.label,$.setAttribute("aria-label",`Select ${l.label}`))),l.mute||n&&!l.solo?p.dataset.silent="true":delete p.dataset.silent;for(let A of p.querySelectorAll("[data-nc-ms]")){let w=A.getAttribute("data-nc-ms")==="mute"?l.mute:l.solo;A.setAttribute("aria-pressed",w?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),ia(y,b.velocity);let m=e.playhead>=0&&l.length>0?(e.playhead%l.length+l.length)%l.length:-1;g===m?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!e.onLength&&e.selectedRow===l.id;y.hidden=g>=l.length&&!v,g>=l.length&&v?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${l.id}"]`),f=t.querySelector(`[data-nc-step="${l.id}:${Math.max(0,l.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&f&&f.nextElementSibling!==h){let g=document.activeElement===h;f.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(l.length)),h.setAttribute("aria-label",`${l.label} length, ${l.length} steps`),h.title=`${l.label}: drag to set the length (${l.length} steps)`)}}function Gr(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,Z()),e}function Fr(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let o=document.createElement("span");if(o.className="nc-strip-name",o.dataset.ncStripName="",i.append(o),t.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(b)}),i.append(b)}let r=document.createElement("div");if(r.className="nc-strip-hacks",t.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",b.append(y,ie()),b.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),r.append(b)}let s=document.createElement("div");s.className="nc-strip-ms";for(let b of["mute","solo"]){if(!(b==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=b,p.textContent=b==="mute"?"M":"S",y.append(p,ie()),y.addEventListener("click",()=>{let m=e(n);m?.type==="strip"&&(b==="mute"?m.onMute:m.onSolo)?.()}),s.append(y)}let c=document.createElement("div");c.className="nc-strip-sends";for(let b of t.sends??[])c.append(wt({...b,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let u=document.createElement("span");u.className="nc-scale",u.setAttribute("aria-hidden","true");for(let b of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(b.value)),y.textContent=b.label,u.append(y)}let l=ar({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:b=>{let y=e(n);y?.type==="strip"&&y.onChange(b)},onReset:()=>{let b=e(n);b?.type==="strip"&&ra(b)}}),h=cr({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let b=e(n);b?.type==="strip"&&b.onClipClear?.()}});d.append(u,l.el,h.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let g=0;return f.addEventListener("click",b=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(g),b.detail===0?oa(n,f,e):b.detail===1&&(g=window.setTimeout(()=>oa(n,f,e),Hr)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(g);let b=e(n);b?.type==="strip"&&ra(b)}),n.append(i,r,s,c,d,f,Z()),Ka(n,t),n}var Hr=250;function oa(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=i.valueText??et(i.value),o.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=c=>{if(r)return;r=!0;let d=o.value;if(o.remove(),e.hidden=!1,c){let u=n(t);u?.type==="strip"&&u.onTypeIn?.(d)}e.focus?.()};o.addEventListener("keydown",c=>{c.key==="Enter"?(c.preventDefault(),s(!0)):c.key==="Escape"&&(c.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function Zr(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",i.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let c=e(n),d=s.value;Va(s),c?.type==="stripAdd"&&d&&c.onAdd(d)}),n.append(i,s,Z()),qa(n,t),n}function qa(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...i.options].map(c=>`${c.value}|${c.textContent}|${c.disabled}`).join(","),s=o.map(c=>`${c.value}|${c.label}|${c.disabled===!0}`).join(",");r!==s&&(i.replaceChildren(...o.map(c=>{let d=document.createElement("option");return d.value=c.value,d.textContent=c.label,d.disabled=c.disabled===!0,d})),Va(i))}function Va(t){let e=t.options[0];e&&(e.selected=!0)}function ra(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ka(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let o=t.querySelector(".nc-fader"),r=o?ir(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),dr(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??et(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let u=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${u}`:u}for(let d of t.querySelectorAll("[data-nc-ms]")){let u=d.getAttribute("data-nc-ms"),l=u==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",l?"true":"false"),d.setAttribute("aria-label",`${u==="mute"?"Mute":"Solo"} ${e.label}`)}let c=t.querySelector("[data-nc-hacks]");if(c){let d=e.hacksLabel??"Hacks";c.textContent!==d&&(c.textContent=d),c.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),c.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Dr(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let o=document.createElement("div");o.className="nc-ui-fx-hd";let r=Ba({checked:t.on,labelledBy:i.id,onChange:s=>{let c=e(r.el);c?.type==="fx"&&c.onToggle?.(s)}});r.el.dataset.ncFxSwitch="",o.append(i,r.el),n.append(o)}for(let o of t.controls)n.append(wt(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let r=document.createElement("summary");r.textContent=t.moreLabel??"More",o.append(r);for(let s of t.more)o.append(wt(s,e));n.append(o)}return n.append(Z()),Ja(n,t),n}function Ja(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function sa(t){return t.replace(/["\\]/g,"\\$&")}function Yr(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);i?.type==="canvas"&&Oa(n,i)}$r(t)}var kn="netcomposer.rhythm.hidden.v1",ue=new WeakMap;function Ut(){try{return globalThis.localStorage??null}catch{return null}}function Qa(t,e=kn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function la(t,e,n,i=kn){let o=Qa(t,i);n?o.add(e):o.delete(e);try{t?.setItem(i,JSON.stringify([...o]))}catch{}}function xn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0})));return n}function Xr(t,e){if(!(!t||!e))return xn(t).find(n=>n.id===e)}function _r(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${xn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Ur(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(i,o),t.append(n),ei(t,e)}function ei(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function qr(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=ue.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Xr(n,i)}function Vr(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=_r(e);if(t.dataset.ncSignature===i){for(let o of n){let r=t.querySelector(`[data-nc-section="${ca(o.id)}"]`);r&&ei(r,o);for(let s of o.controls){let c=t.querySelector(`[data-nc-id="${ca(s.id)}"]`);c instanceof Element&&be(c,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let o of n){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),Ur(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let c of o.controls)s.append(wt(c,qr));t.append(r)}}function ca(t){return t.replace(/["\\]/g,"\\$&")}function Kr(t,e=kn){Ra();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Qa(Ut(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let u=Ba({labelledBy:r.id,onChange:m=>(ue.get(n)??t).onToggle?.(m)});u.el.dataset.ncModuleSwitch="",s.append(u.el,c,d);let l=document.createElement("span");l.className="nc-snap-msg",l.dataset.ncStatus="",o.append(r,l,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,o,h,f),n.setAttribute("aria-labelledby",r.id);let y=m=>{let v=ue.get(n)??t;n.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,c.textContent=m?"+":"−",c.setAttribute("aria-expanded",m?"false":"true"),c.setAttribute("aria-controls",h.id),c.setAttribute("aria-label",`${m?"Show":"Hide"} ${v.title}`),c.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};c.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";la(Ut(),(ue.get(n)??t).id,m,e),y(m),rn(n.parentElement)}),f.addEventListener("click",()=>{la(Ut(),(ue.get(n)??t).id,!1,e),y(!1),rn(n.parentElement)});let p={el:n,update(m){ue.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=m.title,l.textContent=m.status??"",m.status!==void 0?l.setAttribute("aria-live","polite"):l.removeAttribute("aria-live"),g.textContent=m.summary??m.title,u.el.hidden=m.on===void 0,u.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),Vr(h,m),y(h.hidden),p.redraw()},redraw(){let m=ue.get(n);m&&Yr(n,xn(m))}};return ue.set(n,t),y(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Jr(t,e,n="adjacent"){Ra(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=i;let c=o.el.querySelector("[data-nc-index]");c&&(c.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),rn(t)}function rn(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function ti(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const dt=t=>Math.max(0,Math.min(100,t));function Qr(t){const e=ti(t.cutoff),n=dt(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:dt(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:dt(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:dt(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const ni=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function sn(t){const e=Qr(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:ni(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function es(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((i,o)=>i.type!==e.chain[o]?.type))return{whole:!0};const n=[];return e.chain.forEach((i,o)=>{const r=t.chain[o];if(r){r.bypass!==i.bypass&&n.push([i.id,"bypass",i.bypass]);for(const[s,c]of Object.entries(i.dials))r.dials[s]!==c&&n.push([i.id,s,c])}}),{whole:!1,params:n}}const We=8,oe=16,ln=10,ai=["1","2","3","4","5","6","7","8","9","0"],ii=[0,2,4,8,16],ts=[0,1,2,4,8],cn=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","fill","!fill","pre","!pre"],vt={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function at(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0}}function oi(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Sn(){return{length:oe,mute:!1,solo:!1,steps:Array.from({length:oe},oi)}}function ri(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(vt.drive),compressor:structuredClone(vt.compressor)}}function dn(){return{v:1,pads:Array.from({length:We},(t,e)=>at(e)),lanes:Array.from({length:We},Sn),swing:.5,hacks:ri(),slots:Array.from({length:ln},()=>null),active:null,selected:0,master:1}}const re=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},G=(t,e,n,i)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):i,me=(t,e,n,i)=>Math.round(G(t,e,n,i)),$e=(t,e)=>typeof t=="boolean"?t:e,$t=(t,e,n)=>e.includes(t)?t:n,ns=/^[0-9a-f]{16,64}$/;function as(t,e){const n=re(t),i=at(e);let o=G(n.start,0,1,0),r=G(n.end,0,1,1);r-o<.001&&([o,r]=[0,1]);const s=ii.includes(n.slices)?n.slices:0,c=Array.isArray(n.cuts)?n.cuts.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):i.name,sample:typeof n.sample=="string"&&ns.test(n.sample)?n.sample:null,mode:$t(n.mode,["oneshot","gate","loop"],i.mode),dir:$t(n.dir,["fwd","rev","pingpong"],i.dir),start:o,end:r,slices:s,cuts:s?c:[],tune:me(n.tune,-24,24,0),fine:me(n.fine,-100,100,0),fit:ts.includes(n.fit)?n.fit:0,attack:G(n.attack,0,.1,i.attack),decay:G(n.decay,.01,4,i.decay),cutoff:G(n.cutoff,-1,1,0),resonance:G(n.resonance,0,1,0),level:G(n.level,0,1,i.level),pan:G(n.pan,-1,1,0),choke:me(n.choke,0,4,0)}}function is(t){const e=re(t);return{on:$e(e.on,!1),accent:$e(e.accent,!1),velocity:G(e.velocity,0,1,.8),chance:G(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:me(e.slice,0,15,0),pitch:me(e.pitch,-12,12,0),reverse:$e(e.reverse,!1),cond:$t(e.cond,cn,"always")}}function os(t){const e=re(t),n=Array.isArray(e.steps)?e.steps:[];return{length:me(e.length,1,oe,oe),mute:$e(e.mute,!1),solo:$e(e.solo,!1),steps:Array.from({length:oe},(i,o)=>is(n[o]))}}function da(t,e){const n=re(t),i={...e.dials};for(const[o,r]of Object.entries(re(n.dials)))o in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(i[o]=r);return{on:$e(n.on,e.on),dials:i}}function rs(t){const e=re(t),n=re(e.filter),i=ri();return{filter:{on:$e(n.on,i.filter.on),mode:$t(n.mode,["lp","hp","bp"],i.filter.mode),cutoff:G(n.cutoff,0,1,i.filter.cutoff),resonance:G(n.resonance,0,1,i.filter.resonance)},drive:da(e.drive,vt.drive),compressor:da(e.compressor,vt.compressor)}}function un(t){const e=re(t),n=Array.isArray(e.pads)?e.pads:[],i=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:We},(o,r)=>as(n[r],r)),lanes:Array.from({length:We},(o,r)=>os(i[r])),swing:G(e.swing,.5,.75,.5),hacks:rs(e.hacks)}}function ss(t){const e=re(t);if(e.v!==1)return dn();const n=Array.isArray(e.slots)?e.slots:[],i=un(e),o=Array.from({length:ln},(s,c)=>n[c]?un(n[c]):null),r=e.active===null?null:me(e.active,0,ln-1,-1);return{v:1,...i,slots:o,active:r!==null&&r>=0&&o[r]?r:null,selected:me(e.selected,0,We-1,0),master:G(e.master,0,1,1)}}function si(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}function He(t){const e=new Set;for(const n of[t,...t.slots])for(const i of n?.pads??[])i.sample&&e.add(i.sample);return e}function li(){try{return globalThis.localStorage??null}catch{return null}}function ls(t,e=li()){try{const n=e?.getItem(t);return n?ss(JSON.parse(n)):dn()}catch{return dn()}}function cs(t,e,n=li()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const ds=.25;function ci(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function ua(t,e,n){const i=t.start*e.frames,o=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(i),Math.ceil(o)];const r=ci(t),s=Math.min(n,r.length-2);return[Math.floor(i+r[s]*(o-i)),Math.ceil(i+r[s+1]*(o-i))]}function us(t,e,n,i=0){let r=2**((t.tune+t.fine/100+i)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,c=t.fit*4*(60/n);s>0&&c>0&&(r*=s/c)}return r}const ps=1.5;function di(t,e,n,i,o,r=!1){if(!n.on||!t.sample||!i)return null;const s=n.slice??(t.slices?e%t.slices:null);let[c,d]=ua(t,i,s);const u=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;if(t.mode==="oneshot"&&s!==null&&t.slices&&!r){const[l,h]=ua(t,i,null);u==="fwd"?d=h:u==="rev"&&(c=l)}return{sample:t.sample,from:c,to:d,rate:us(t,i,o,n.pitch),gain:Math.min(1.5,n.velocity*(n.accent?ps:1))*t.level,pan:t.pan,mode:t.mode,dir:u,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond}}function hs(t,e,n,i=null){return di(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:i,pitch:0,reverse:!1,cond:"always"},e,n,!0)}function ms(t,e,n){const i=t.lanes.some(o=>o.solo);return{swing:t.swing,lanes:t.lanes.map((o,r)=>{const s=t.pads[r],c=s?.sample?e(s.sample):void 0;return{length:o.length,audible:i?o.solo:!o.mute,steps:o.steps.map((d,u)=>s?di(s,u,d,c,n):null)}})}}const fs="/nyx/assets/sampler-processor-7BllxM3H.js",ui=827873614,gs=60;async function bs(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),i=[new Uint8Array(n.buffer),...t.map(d=>new Uint8Array(d.buffer))],o=i.reduce((d,u)=>d+u.byteLength,0),r=new Uint8Array(o);let s=0;for(const d of i)r.set(d,s),s+=d.byteLength;const c=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(c.subarray(0,16),d=>d.toString(16).padStart(2,"0")).join("")}function ys(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([ui,t.sampleRate,t.data.length,e]),t.data.forEach((i,o)=>{n.set(new Uint8Array(i.buffer,i.byteOffset,e*4),16+o*e*4)}),n}function ws(t,e){if(e.byteLength<16)return null;const[n,i,o,r]=new Uint32Array(e,0,4);if(n!==ui||!o||o>2||e.byteLength!==16+r*4*o)return null;const s=Array.from({length:o},(c,d)=>new Float32Array(e.slice(16+d*r*4,16+(d+1)*r*4)));return{hash:t,data:s,sampleRate:i,channels:o,frames:r}}class vs{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const i=await bs(e,n),o={hash:i,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(i,o);const r=await this.folder();if(!r)return{sample:o,saved:!1};try{const c=await(await r.getFileHandle(`${i}.f32`,{create:!0})).createWritable?.();return c?(await c.write(ys(o)),await c.close(),{sample:o,saved:!0}):{sample:o,saved:!1}}catch{return{sample:o,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const i=await this.folder();if(!i)return null;try{const o=await(await i.getFileHandle(`${e}.f32`)).getFile(),r=ws(e,await o.arrayBuffer());return r&&this.memory.set(e,r),r}catch{return null}}async prune(e){for(const i of[...this.memory.keys()])e.has(i)||this.memory.delete(i);const n=await this.folder();if(n)try{const i=[];for await(const o of n.keys())i.push(o);for(const o of i){const r=o.replace(/\.f32$/,"");o.endsWith(".f32")&&!e.has(r)&&await n.removeEntry(o)}}catch{}}}function $s(t){const e=Math.min(t.length,Math.round(gs*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(i,o)=>{const r=new Float32Array(e);return r.set(t.getChannelData(o).subarray(0,e)),r}),trimmed:e<t.length}}function pi(t,e=200){const n=t[0]?.length??0,i=[];if(!n)return i;const o=n/e;for(let r=0;r<e;r++){const s=Math.floor(r*o),c=Math.max(s+1,Math.floor((r+1)*o));let d=0,u=0;const l=Math.max(1,Math.floor((c-s)/256));for(let h=s;h<c&&h<n;h+=l){let f=0;for(const g of t)f+=g[h]??0;f/=t.length,f<d&&(d=f),f>u&&(u=f)}i.push(Math.max(-1,d),Math.min(1,u))}return i}function ks(t,e,n,i,o){const r=i-n;if(o<2||r<64)return[];const s=Math.max(32,Math.round(e*.01)),c=[];for(let g=n;g<i;g+=s){let b=0;for(const y of t)for(let p=g;p<Math.min(i,g+s);p++)b+=(y[p]??0)*(y[p]??0);c.push(Math.log10(b/s+1e-9))}const d=c.map((g,b)=>{const y=c.slice(Math.max(0,b-4),b),p=y.length?y.reduce((m,v)=>m+v,0)/y.length:g;return Math.max(0,g-p)}),u=Math.max(1,Math.floor(c.length/o/8)),l=d.map((g,b)=>({f:g,i:b})).filter(g=>g.i>0&&g.f>.3).sort((g,b)=>b.f-g.f),h=[];for(const g of l){if(h.length>=o-1)break;h.every(b=>Math.abs(b-g.i)>=u)&&h.push(g.i)}const f=h.map(g=>g*s/r).filter(g=>g>.001&&g<.999);for(let g=1;f.length<o-1&&g<o;g++){const b=g/o;f.every(y=>Math.abs(y-b)>.5/o)&&f.push(b)}for(let g=1;f.length<o-1;g++)f.push(g/(o+1));return f.sort((g,b)=>g-b).slice(0,o-1)}function hi(t=Ss()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const i=n&&typeof n=="object"?n:{},o=r=>typeof i[r]=="number"&&Number.isFinite(i[r])?i[r]:0;return i.saved!==!0||!o("id")||!o("frames")||!o("sampleRate")?[]:[{id:o("id"),bars:o("bars"),bpm:o("bpm"),sampleRate:o("sampleRate"),channels:Math.min(2,Math.max(1,o("channels"))),frames:o("frames")}]}):[]}catch{return[]}}async function xs(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const i=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),o=new Float32Array(await i.arrayBuffer());return o.length<t.frames*t.channels?null:Array.from({length:t.channels},(r,s)=>o.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function Ss(){try{return globalThis.localStorage??null}catch{return null}}const As="instance",Ls=99;function jt(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(As)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Ls?n:1}function Ms(t,e){return e===1?t:`${t}#${e}`}function Es(t,e){return e===1?t:`${t} ${e}`}let Ne;function Cs(t,e=jt()){if(Ne!==void 0)return Ne;Ne=null;try{if(typeof window>"u"||window.parent===window)return Ne;const n=window.parent.ncStudio;n&&n.version===1&&(Ne=n.attach(t,{instance:e}))}catch{}return Ne}function Ts(){let t;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(t=i.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(i,o,r)=>n.request(`${i}${e}`,o,r)}:null}}function Is(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Bt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function kt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function pn(t,e=jt()){return e>1?`${t}#${e}`:t}function Ns(t,e=jt()){const n=kt()?.owner()??null;return n===null||n==="studio"||n===pn(t,e)}const zs="NYX Sampler",xt="nyx",V=jt(),mi=Ms("nyx.state",V),fi=.15,k=ls(mi),_=new vs(V>1?`nyx-${V}`:"nyx"),Pt=()=>cs(mi,k);let Y=!1,ye=0,Q=null,St=!1,je="",j="";const Oe=new Map;let it=new Map;const ee=new Ri({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let z=null,ft=null;const Rs=new Yi({...Ts(),app:Es(zs,V),version:"0.1.0",clock:ee,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=z?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),At=t=>t+(ft?.offset??0),W=()=>ee.transport,Ge=()=>W().isPlayingAt(X()),tt=()=>Ge()&&!Y,J=Cs(xt,V);let qt=null,D=null,ae=null,Lt=null,pa=null;const ha=new Set;function se(){return pa??=(async()=>{J?(z=J.ctx,qt=J.output,ft=J.mapper??new jn(J.ctx)):(z=new AudioContext({latencyHint:"interactive"}),qt=z.destination,ft=new jn(z)),ft.start();try{await z.audioWorklet.addModule(fs)}catch{return j="Audio could not start (the sampler's worklet did not load). Reload to try again.",M(),!1}D=new AudioWorkletNode(z,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),D.port.onmessage=t=>js(t.data),ae=Mo(z,{moduleUrl:Is()??To,bpm:W().bpm,slots:3,state:sn(k.hacks)}),hn=sn(k.hacks),Lt=new GainNode(z,{gain:k.master}),D.connect(ae.input),ae.output.connect(Lt).connect(qt),Co(ae,ee,{toAudioTime:At,now:X});for(const t of He(k))await An(t);return Ze(),De(),!0})(),pa}async function An(t){const e=await _.get(t);return e?(Oe.has(t)||Oe.set(t,pi(e.data)),D&&!ha.has(t)&&(ha.add(t),D.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function js(t){t.type!=="pos"||!t.voices||(it=new Map(t.voices.map(([e,n,i])=>[e,n/Math.max(1,i)])))}function Ze(){D?.port.postMessage({type:"program",program:ms(k,t=>_.info(t),W().bpm)})}let ma="";function De(t=!1){if(!D)return;const e=W(),n=tt();let i=0,o=e.bpm;if(e.running){const s=Math.max(0,e.beatAt(X())),c=e.timeAt(s);o=60/(e.timeAt(s+1)-c),i=At(c)-s*60/o}const r=JSON.stringify([n,Math.round(i*2e3),o,ye]);!t&&r===ma||(ma=r,D.port.postMessage({type:"clock",clock:{playing:n,zero:i,bpm:o,join:ye}}))}let hn=null;function gi(){if(!ae)return;const t=sn(k.hacks),e=es(hn,t);if(hn=t,e.whole)ae.setState(t);else for(const[n,i,o]of e.params)ae.setParam(n,i,o)}let Qe=null;function Bs(){if(Qe){const e=Qe;F(()=>{k.lanes=e}),j="Pattern back.",M();return}const t=structuredClone(k.lanes);t.some(e=>e.steps.some(n=>n.on)||e.mute||e.solo||e.length!==oe)&&(F(()=>{k.lanes=k.lanes.map(()=>Sn())}),Q=null,Qe=t,j="Pattern cleared: press Undo to bring it back.",M())}function F(t){Qe=null,t(),k.active!==null&&(St=!0),je="",Pt(),Ze(),gi(),M()}const H=t=>k.pads[t]??at(t),pe=t=>k.lanes[t]??Sn(),bi=()=>H(k.selected);function Wt(t,e=k.selected){F(()=>t(H(e)))}function Mt(t,e,n){F(()=>{const i=pe(t).steps[e];i&&n(i)})}function fe(t,e=!0){k.selected=Math.max(0,Math.min(We-1,t)),Q&&Q.lane!==k.selected&&(Q=null),Pt(),e&&he(k.selected),M()}async function he(t,e=null){if(!await se()||!z||!D)return;z.state!=="running"&&await z.resume().catch(()=>{});const n=H(t),i=n.sample?hs(n,_.info(n.sample),W().bpm,e):null;i&&D.port.postMessage({type:"play",pad:t,hit:i})}async function Ot(t,e,n,i){const{sample:o,saved:r}=await _.put(e,n);await An(o.hash),F(()=>{const s=H(t);s.sample=o.hash,s.name=i.slice(0,24)||`Pad ${t+1}`,s.start=0,s.end=1,s.slices=0,s.cuts=[],s.fit=0}),j=r?"":"Kept until you reload: this browser has no file storage here.",_.prune(He(k)),he(t)}async function Ln(t,e=k.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await Gs(t);return}if(!await se()||!z)return;let n;try{n=await z.decodeAudioData(await t.arrayBuffer())}catch{j=`Couldn't read ${t.name}: not an audio file this browser can decode.`,M();return}const{data:i,trimmed:o}=$s(n);await Ot(e,i,n.sampleRate,t.name.replace(/\.[^.]+$/,"")),o&&(j=`${t.name} was cut to its first minute.`,M())}const R={from:"master",bars:1,busy:!1};async function Mn(){const t=Bt();if(!t||R.busy||!await se()||!z)return;const e=W();if(!e.running){j="Play first: Grab takes the bars that just played.",M();return}const n=R.bars,i=Math.floor(e.beatAt(X())/4)*4,o=i-4*n;if(o<0){j=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,M();return}const r=z.sampleRate,s=Math.round(At(e.timeAt(o))*r),c=Math.round(At(e.timeAt(i))*r);R.busy=!0,M();const d=await t.take(R.from,s,c);R.busy=!1;const u=t.sources().find(f=>f.id===R.from)?.name??R.from;if(!d){j=`${u} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,M();return}let l=0;for(const f of d)for(const g of f)l=Math.max(l,Math.abs(g));if(l<1e-4){j=`${u} was silent for those ${n===1?"bar":"bars"}.`,M();return}const h=k.selected;await Ot(h,d,r,`${u} grab`),n===1?(F(()=>{const f=H(h);f.fit=1,f.slices=16,f.cuts=[],f.decay=4;const g=pe(h);g.length=oe;for(const b of g.steps)Object.assign(b,oi(),{on:!0})}),j=`Grabbed a bar of ${u}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(Wt(f=>{f.fit=n},h),await mn(8,"transients"),j=`Grabbed ${n} bars of ${u}, fitted to ${n} bars and sliced at the hits.`),M()}async function Ps(t){const e=await xs(t);if(!e){j=`LUCY take ${t.id} could not be read.`,M();return}await Ot(k.selected,e,t.sampleRate,`LUCY take ${t.id}`)}async function yi(){const t=k.selected,e=H(t);!e.sample||!await nr({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(F(()=>{k.pads[t]=at(t)}),_.prune(He(k)))}async function mn(t,e){const n=bi();let i=[];if(t&&e==="transients"&&n.sample){const o=await _.get(n.sample);o&&(i=ks(o.data,o.sampleRate,Math.floor(n.start*o.frames),Math.ceil(n.end*o.frames),t))}Wt(o=>{o.slices=t,o.cuts=i})}function Ws(t,e){const n=ai[t]??String(t+1);if(e==="store")k.slots[t]=si(k),k.active=t,St=!1,je=`Stored in ${n}`;else if(e==="clear")k.slots[t]=null,k.active===t&&(k.active=null),je=`Cleared ${n}`,_.prune(He(k));else{const i=k.slots[t];if(!i){je=`${n} is empty: Shift-click or long-press to store`,M();return}wi(i),k.active=t,St=!1,je=`Recalled ${n}`}Pt(),Ze(),gi(),M()}function wi(t){const e=structuredClone(t);k.pads=e.pads,k.lanes=e.lanes,k.swing=e.swing,k.hacks=e.hacks,Q=null;for(const n of He(k))An(n).then(()=>Ze())}async function vi(){if(await se(),z&&z.state!=="running"&&await z.resume().catch(()=>{}),J&&Ge()){if(!Y&&kt()?.owner()===pn(xt,V)){ee.stop({at:X()});return}if(Y=!Y,!Y){const t=W();ye=t.nextBar(t.beatAt(X()+fi))}De(!0),M();return}Ge()?ee.stop({at:X()}):(Y=!1,ye=0,J&&kt()?.claim(pn(xt,V)),ee.play({at:X()}))}let fa=W().running;ee.onChange(()=>{W().running&&!fa&&J&&(Y=!Ns(xt,V)),fa=W().running,W().running||(Y=!1,ye=0),Ze(),De(!0),M()});kt()?.onAll(()=>{if(Y){if(Y=!1,Ge()){const t=W();ye=t.nextBar(t.beatAt(X()+fi))}De(!0),M()}});function Os(){const t={nyx:1,...si(k)},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${V>1?`-${V}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Gs(t){let e;try{e=JSON.parse(await t.text())}catch{j=`Couldn't read ${t.name}: not a NYX pattern.`,M();return}if(!e||typeof e!="object"||e.nyx!==1){j=`Couldn't read ${t.name}: not a NYX pattern.`,M();return}const n=un(e);F(()=>wi(n));const i=[];for(const o of k.pads)o.sample&&!await _.get(o.sample)&&i.push(o.name);j=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:`Loaded ${t.name}.`,Ze(),M()}function Fs(){D?.port.postMessage({type:"stop"}),Ge()&&(J?Y=!0:ee.stop({at:X()})),De(!0),ae?.clear({fadeMs:20}),M()}function Hs(t){k.master=Math.min(1,Math.max(0,t)),Pt(),Lt&&z&&Lt.gain.setTargetAtTime(k.master,z.currentTime,.01),Et.value=String(k.master),En.textContent=`${Math.round(k.master*100)}%`}const P=(t,e={},...n)=>{const i=document.createElement(t);for(const[o,r]of Object.entries(e))i.setAttribute(o,r);return i.append(...n),i},Gt=document.getElementById("app");Gt.classList.add("nc","nc-page");const $i=P("header",{class:"nc-page-hd"},P("div",{},P("h1",{class:"nc-page-title"},P("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",P("span",{class:"nc-page-sep"},"/")," SAMPLER ",P("span",{class:"nc-page-sep"},"/")," ",P("span",{class:"nc-mono"},String(V).padStart(2,"0"))),P("p",{class:"nc-page-sub"},"A NetComposer element."))),Et=P("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(k.master),"data-nc-id":"nyx-master"});Et.addEventListener("input",()=>Hs(Number(Et.value)));const En=P("span",{class:"nc-readout","data-nc-readout":""});En.textContent=`${Math.round(k.master*100)}%`;const ga="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",ke=P("input",{type:"file"});ke.hidden=!0;let ba="pad";ke.addEventListener("change",()=>{const t=ke.files?.[0];ke.value="",t&&Ln(t)});function Cn(t){ba=t,ke.accept=ba==="pad"?ga:`${ga},.json,application/json`,ke.click()}const Vt=(t,e,n)=>{const i=P("button",{type:"button",class:"nc-page-action",title:n,"data-nyx-action":t.toLowerCase()},t);return i.addEventListener("click",e),i};$i.append(P("div",{class:"nc-page-actions"},P("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},P("label",{class:"nc-label",for:"nyx-master"},"Master"),Et,En),Vt("Save",Os,"Download the pattern (pads, steps, Hacks). Samples stay in this browser"),Vt("Load",()=>Cn("any"),"Load a pattern, or an audio file onto the selected pad"),Vt("Panic",Fs,"Every voice out, and sit out until Play"),ke));const Tn=P("div",{class:"nc-stack","data-nc-layout":"adjacent"});Gt.append($i,P("main",{class:"nc-page-body"},Tn));Gt.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});Gt.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),Ln(e))});const Fe=t=>`${Math.round(t*100)}%`,ze=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,fn=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,gn=(t,e="")=>`${t>0?"+":""}${t}${e}`;function Zs(t){return Math.abs(t)<.001?"open":t<0?`LP ${fn(2e4*(60/2e4)**-t)}`:`HP ${fn(20*(8e3/20)**t)}`}function Ds(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function ki(){return Ge()?Y?"Sitting out":W().beatAt(X())<ye?"Joining on the next bar":"Playing":k.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function Ys(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const xi=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],nt={fill:!1,perform:null};function Ct(t){nt.fill!==t&&(nt.fill=t,D?.port.postMessage({type:"fill",on:t}),M())}function bn(t){nt.perform!==t&&(nt.perform=t,D?.port.postMessage({type:"perform",mode:t}),M())}function Xs(t){const e=o=>{const s=(o.target instanceof Element?o.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),c=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return xi.some(d=>d.mode===c)?c:null},n=o=>{se(),o==="fill"?Ct(!0):bn(o)},i=()=>{Ct(!1),bn(null)};t.addEventListener("pointerdown",o=>{const r=e(o);if(!r)return;o.preventDefault(),n(r);const s=()=>{i(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",o=>{if((o.key===" "||o.key==="Enter")&&!o.repeat){const r=e(o);if(!r)return;o.preventDefault(),n(r)}}),t.addEventListener("keyup",o=>{(o.key===" "||o.key==="Enter")&&e(o)&&i()}),window.addEventListener("blur",i)}function _s(){return{id:"transport",title:"Transport",status:je,controls:[{type:"button",id:"play",label:tt()?"Stop":"Play",on:tt(),onPress:()=>void vi()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:nt.perform??"",options:xi.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(W().bpm),valueText:`${Math.round(W().bpm)} BPM`,onChange:t=>{ee.setTempo({bpm:t}),M()}},{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:k.swing,valueText:Fe(k.swing),onChange:t=>F(()=>{k.swing=t})},{type:"readout",id:"status",label:"Status",value:ki()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:ai.map((t,e)=>({label:t,filled:k.slots[e]!=null,active:k.active===e,edited:k.active===e&&St})),onMorph:()=>{},onSlot:(t,e)=>Ws(t,e)}]}}function Si(){if(!tt())return-1;const t=W().beatAt(X());return t<0||t<ye?-1:Math.floor(t/ds)%oe}function Us(){const t=bi(),e=Si();return{id:"pattern",title:"Pattern",lead:!0,summary:`${k.lanes.filter(n=>n.steps.some(i=>i.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${k.selected}`,rows:k.lanes.map((n,i)=>({id:`pad-${i}`,label:H(i).name,length:n.length,lane:i%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(o=>({on:o.on,accent:o.accent,velocity:o.velocity,dim:!H(i).sample}))})),onToggle:(n,i,o)=>Mt(n,i,r=>{o?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,i,o,r)=>Mt(n,i,s=>{o==="on"?(s.on=r,r||(s.accent=!1)):(s.accent=r,r&&(s.on=!0))}),onSelectRow:n=>fe(n),onLongPress:(n,i)=>{Q={lane:n,step:i},fe(n,!1)},onMute:n=>F(()=>{pe(n).mute=!pe(n).mute}),onSolo:n=>F(()=>{pe(n).solo=!pe(n).solo}),onLength:(n,i)=>F(()=>{pe(n).length=Math.max(1,Math.min(oe,i))}),transport:{playing:tt(),onToggle:()=>void vi()},onFill:n=>Ct(n),onClear:()=>Bs(),clearLabel:Qe?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:k.selected,pads:k.pads.map((n,i)=>({label:n.name,empty:!n.sample,peaks:n.sample?Oe.get(n.sample):void 0,lane:i%4+1,playing:it.has(i),badge:n.choke?yn[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${yn[n.choke-1]}`:void 0})),onDown:n=>Ks(n),onPress:n=>Js(n),onFile:(n,i)=>{fe(n,!1),Ln(i,n)},onMove:(n,i,o)=>Qs(n,i,o),menu:n=>tl(n),onMenu:(n,i)=>void nl(n,i),onRename:(n,i)=>el(n,i)}]}]}}function qs(t){if(!Q||Q.lane!==k.selected)return[];const{lane:e,step:n}=Q,i=pe(e).steps[n];if(!i)return[];const o=r=>Mt(e,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:i.velocity,valueText:Fe(i.velocity),onChange:r=>o(s=>{s.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:i.chance,valueText:Fe(i.chance),onChange:r=>o(s=>{s.chance=r})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:i.slice===null?"auto":String(i.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(r,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:r=>o(s=>{s.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:i.pitch,valueText:gn(i.pitch," st"),onChange:r=>o(s=>{s.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:i.cond,options:cn.map(r=>({value:r,label:Ys(r)})),onChange:r=>o(s=>{cn.includes(r)&&(s.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:i.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>o(s=>{s.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{Q=null,M()}}]}function Vs(){const t=Bt();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:R.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{R.from=n,t.listen(n),M()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(R.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{R.bars=n==="4"?4:n==="2"?2:1,M()}},{type:"button",id:"grab",label:R.busy?"Grabbing…":R.bars===1?"Grab last bar":`Grab last ${R.bars} bars`,on:R.busy,onPress:()=>void Mn()}]}let Tt=-1;function Ks(t){if(!H(t).sample)return;Tt=t,fe(t);const e=()=>{Tt=-1};window.addEventListener("pointerup",()=>setTimeout(e),{once:!0})}function Js(t){if(Tt===t){Tt=-1;return}if(!H(t).sample){fe(t,!1),Cn("pad");return}fe(t)}function Qs(t,e,n){F(()=>{const i=structuredClone(H(t)),o=structuredClone(H(e));k.pads[e]=i,n||(k.pads[t]=o.sample?o:at(t))}),fe(e,!1)}const yn=["A","B","C","D"];function el(t,e){Wt(n=>{n.name=e.slice(0,24)},t)}function tl(t){const e=!!H(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}];for(const i of hi().slice(-4).reverse())n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});return Bt()&&n.push({id:"grab",label:R.bars===1?"Grab the last bar":`Grab the last ${R.bars} bars`}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function nl(t,e){if(fe(t,!1),e==="load")Cn("pad");else if(e==="grab")await Mn();else if(e==="clear")await yi();else if(e.startsWith("take-")){const n=hi().find(i=>`take-${i.id}`===e);n&&await Ps(n)}}const al=["q","w","e","r","a","s","d","f"];document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=al.indexOf(t.key.toLowerCase());n<0||!H(n).sample||(t.preventDefault(),he(n))});function il(){const t=k.selected,e=H(t),n=e.sample?_.info(e.sample):void 0,i=ci(e).slice(1,-1),o=e.end-e.start,r=n?n.frames/n.sampleRate:0,s=!!e.sample,c=s&&!n,d=l=>Wt(l),u=s?[{type:"readout",id:"sample",label:"Length",value:c?"Not in this browser: load it again":`${ze(r*o)} of ${ze(r)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:l=>d(h=>{h.mode=l})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:l=>d(h=>{(l==="fwd"||l==="rev"||l==="pingpong")&&(h.dir=l)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:ze(e.start*r),onChange:l=>d(h=>{h.start=Math.min(l,h.end-.002)}),onCommit:()=>void he(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:ze(e.end*r),onChange:l=>d(h=>{h.end=Math.max(l,h.start+.002)}),onCommit:()=>void he(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:ii.map(l=>({value:String(l),label:l?`${l}`:"Off"})),onChange:l=>void mn(Number(l),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:l=>void mn(e.slices,l==="transients"?"transients":"even")}]:[],{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:gn(e.tune," st"),onChange:l=>d(h=>{h.tune=l}),onCommit:()=>void he(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:gn(e.fine," ct"),onChange:l=>d(h=>{h.fine=l})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(l=>({value:String(l),label:`${l} bar${l===1?"":"s"}`}))],onChange:l=>d(h=>{h.fit=Number(l)})},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,value:e.attack,valueText:ze(e.attack),onChange:l=>d(h=>{h.attack=l})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,value:e.decay,valueText:e.decay>=3.99?"Hold":ze(e.decay),onChange:l=>d(h=>{h.decay=l}),onCommit:()=>void he(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:Zs(e.cutoff),onChange:l=>d(h=>{h.cutoff=Math.abs(l)<.02?0:l})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Fe(e.resonance),onChange:l=>d(h=>{h.resonance=l})},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:Fe(e.level),onChange:l=>d(h=>{h.level=l})},{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:Ds(e.pan),onChange:l=>d(h=>{h.pan=Math.abs(l)<.02?0:l})},{type:"select",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},...yn.map((l,h)=>({value:String(h+1),label:`Group ${l}`}))],onChange:l=>d(h=>{h.choke=Number(l)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void yi()}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?Oe.get(e.sample)??[]:[],region:[e.start,e.end],markers:i.map(l=>e.start+l*o),position:it.get(t)??-1}]:[],...j?[{type:"note",id:"notice",text:j}]:[],...qs(e),...u,...Vs()]}}function wn(t,e){F(()=>e(k.hacks[t]))}function ol(t,e){const n=k.hacks[t].dials[e.key]??e.default,i=`hack-${t}-${e.key}`,o=r=>wn(t,s=>{s.dials[e.key]=r});return e.options?{type:"select",id:i,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>o(Number(r))}:{type:"slider",id:i,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:Aa(e,n,W().bpm),onChange:o}}const ut=(t,e)=>(le(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>ol(t,n));function rl(){const t=k.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,i=r=>F(()=>r(k.hacks.filter)),o=[ni(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,onToggle:r=>i(s=>{s.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>i(s=>{(r==="lp"||r==="hp"||r==="bp")&&(s.mode=r)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":fn(ti(e.cutoff)),onChange:r=>i(s=>{s.cutoff=r})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Fe(e.resonance),onChange:r=>i(s=>{s.resonance=r})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,onToggle:r=>wn("drive",s=>{s.on=r}),controls:ut("drive",!1),more:ut("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,onToggle:r=>wn("compressor",s=>{s.on=r}),controls:ut("compressor",!1),more:ut("compressor",!0)}]}}const In=[_s,Us,il,rl].map(t=>({def:t,handle:Kr(t())}));Jr(Tn,In.map(t=>t.handle),"adjacent");Xs(Tn);function M(){for(const t of In)t.handle.update(t.def())}let ya="";function Ai(){De();const t=it.get(k.selected)??-1,e=JSON.stringify([Si(),ki(),Math.round(t*400)]);if(e!==ya){ya=e;for(const n of In.slice(0,3))n.handle.update(n.def())}requestAnimationFrame(Ai)}requestAnimationFrame(Ai);Rs.start();Promise.all([...He(k)].map(t=>_.get(t))).then(t=>{for(const e of t)e&&!Oe.has(e.hash)&&Oe.set(e.hash,pi(e.data));M()});if(J)se(),Bt()?.listen(R.from);else{const t=()=>{se()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:k,clock:ee,store:_,get ctx(){return z},get fx(){return ae},get positions(){return it},ensureAudio:se,play:he,async setSample(t,e,n,i="test"){await se()&&await Ot(t,e,n,i)},grab:R,grabBars:Mn,setPerform:bn,setFill:Ct,toggleStep(t,e){Mt(t,e,n=>{n.on=!n.on})}};
