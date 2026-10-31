(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const ve=1e-9;function Ha(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class Kt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Ha(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+ve&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of i){if(s.beat<=e.beat+ve)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+ve){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-ve;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,o=.25){const r=this.bpmAt(n);if(!(i>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Kt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+ve)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+ve)return n[i];return n[0]}}const Fa=Object.freeze({beatsPerBar:4,beatUnit:4}),Le=1e-9;function Za(t){return Math.floor(t+Le)}function Yn(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-Le)*e;return n&&o<=t+Le?o+e:o}class Ya{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Kt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Fa}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Le&&(this.stopTime===null||e<this.stopTime-Le)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Le?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Za(e/n),o=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return Yn(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Dn="nc-clock/snapshot",Xn=1;function Da(t,e="local"){return{format:Dn,version:Xn,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Xa(t,e){const n=_a(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const te=t=>typeof t=="number"&&Number.isFinite(t),ln=t=>t===null||te(t);function _a(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Dn&&n("format"),(!te(e.version)||Math.floor(e.version)!==Xn)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!te(e.anchor.beat)||!te(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&te(i.beat)&&te(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!te(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!te(e.meter.beatUnit))&&n("meter"),(!ln(e.startTime)||!ln(e.stopTime)||!te(e.stoppedBeat))&&n("transport times"),e}class qa{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ya(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Xa(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Da(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Ua="nc-sync/1",Va=1,Ka="nc-sync",Ja="nc-sync-leader",Qa=0,_n=.5,qn=.75;function ei(t){return typeof t=="number"&&Number.isFinite(t)&&t>=_n&&t<=qn?t:null}const Et=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Be=t=>typeof t=="number"&&Number.isFinite(t),nt=t=>typeof t=="string"&&t.length>0;function ti(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Va||!nt(e.type)||!nt(e.from)||!Be(e.term)||!Be(e.seq)||!Be(e.sentAt))return null;switch(e.type){case"hello":return nt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Be(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Be(e.slot)?e:null;case"ping":case"pong":return nt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ni(t,e,n,i,o){return{proto:Ua,from:e,term:n,seq:i,sentAt:o,...t}}function U(){return(performance.timeOrigin+performance.now())/1e3}const Ct=.003,ai=3,ii=.01,cn=500;class dn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?ii:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Ct&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const o=n-(this.timeOrigin+i)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(i&&r){const l=this.offsets,c=this.preStep;l.length=0;for(let d=0;d<c.length;d++)l.push(c[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const d=this.offsets,u=this.preStep;u.length=0;for(let h=0;h<d.length;h++)u.push(d[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,c=e-n;for(let d=0;d<l.length;d++)l[d]+=c;this.stepCount++,s={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let r=0;r<i;r++){const s=e[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=i>>1;return i%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ct&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<cn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ct)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<cn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(ai,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(o)&&o>0?o:null}}class oi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Et,...e.capabilities},this.channelOption=e.channel??Ka,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Yn(c,1),c);i&&i>0?(s.tempo.rampTempo(e,d,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(qn,Math.max(_n,e)):Qa;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=ei(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=ti(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Et,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Et},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Ja,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==o[0]?i[0]<o[0]:i[1]!==o[1]?i[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const o=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>o&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ni(e,this.id,this.term,++this.seq,this.o.now()))}}const ri="modulepreload",si=function(t){return"/lucy/"+t},un={},li=function(e,n,i){let o=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=s(n.map(d=>{if(d=si(d),d in un)return;un[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":ri,u||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((b,g)=>{f.addEventListener("load",b),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var ci=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Pt=[.25,.5,.75,1,1.5,2],di=4.9,B={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},me={fmt:"wet"},J={fmt:"pct"},ke={fmt:"db"},at={fmt:"signedPct"},Tt={fmt:"num",suffix:" ms"},z={div:100};function A(t,e,n,i,o,r,s,l){var c={key:t,label:e,min:n,max:i,default:o,step:1,k:r,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function it(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Fe=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:B.hpQ},{dsp:{law:B.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:B.bpHz,astrid:!0},{dsp:{law:B.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:B.bpQ},{dsp:{law:B.bpQ}}),A("mix","Mix",0,100,100,3,me,{dsp:z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:it(ci),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,J,{dsp:z,unit:"%"}),A("mix","Wet/dry",0,100,0,3,me,{dsp:z,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:B.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:it([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,J,{dsp:z,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,at,{dsp:z,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,Tt,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:z,unit:"%"}),A("decay","Decay",0,100,50,3,J,{dsp:z,unit:"%"}),A("damping","Damping",0,100,0,4,J,{dsp:z,unit:"%"}),A("mix","Mix",0,100,0,5,me,{dsp:z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),A("depth","Depth",0,100,70,2,J,{dsp:z,unit:"%"}),A("feedback","Feedback",-90,90,50,3,at,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,4,me,{dsp:z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),A("depth","Depth",0,100,50,2,J,{dsp:z,unit:"%"}),A("spread","Spread",0,100,70,3,J,{dsp:z,unit:"%"}),A("mix","Mix",0,100,40,4,me,{dsp:z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),A("depth","Depth",0,100,70,2,J,{dsp:z,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:it([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,J,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,5,me,{dsp:z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,ke,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,ke,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:B.midHz,astrid:!0},{dsp:{law:B.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:B.eqQ},{dsp:{law:B.eqQ}}),A("high_db","High",-18,18,0,4,ke,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,ke,{unit:"dB"}),A("mix","Mix",0,100,100,3,me,{dsp:z,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:it([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:B.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,at,{dsp:z,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,at,{dsp:z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,ke,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:B.ratio},{dsp:{law:B.ratio}}),A("attack_ms","Attack",1,100,10,3,Tt,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,Tt,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,ke,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,J,{dsp:z,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:z})]}],ui=Fe.map(function(t){return t.type});Fe.filter(function(t){return!t.hidden}).map(function(t){return t.type});var pi={reverb:"plate"};function Jt(t){var e=pi[t]||t;return ui.indexOf(e)>=0?e:null}function oe(t){for(var e=Jt(t),n=0;n<Fe.length;n++)if(Fe[n].type===e)return Fe[n];return null}function Ae(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Un(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=Ae(n.law,e);return i===null?0:i}function pn(t,e){return Math.min(di,t*60/(e>0?e:120))}var hn=function(t){return t>0?"+":t<0?"−":""};function hi(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Vn(t,e,n){var i=t.format,o;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:hn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return hn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(o=Ae(i.law,e),o===null?i.zero||"open":i.astrid?hi(o):o+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+Ae(i.law,e).toFixed(1);case"ratio":return Ae(i.law,e).toFixed(1)+":1";case"rate":return o=Ae(i.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(pn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(pn(e,n)*1e3)+" ms"}return String(e)}var mi=1,kt=["drive","delay","plate"];function fi(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,o){return Vn(t,i,o)},e}var Ze=kt.map(function(t){var e=oe(t),n={type:t,label:e.label,dials:e.dials.map(fi)};return e.tempoSynced&&(n.tempoSynced=!0),n}),gi={reverb:"plate"};function pt(t){var e=gi[t]||t;return kt.indexOf(e)>=0?e:null}function $t(t){for(var e=pt(t),n=0;n<Ze.length;n++)if(Ze[n].type===e)return Ze[n];return null}function Kn(t,e){var n=$t(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Ce(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function ue(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(i-e)&&(i=t.options[o].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function bi(){return{v:mi,chain:Ze.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function yi(t){return Pt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Pt[0])}function It(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function wi(t){for(var e=Array.isArray(t)?t:It(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=bi(),o={},r=[],s=0;s<e.length;s++){var l=e[s];if(It(l)){var c=pt(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(o[c]){r.push(c);continue}o[c]=!0;var d=i.chain[kt.indexOf(c)],u=It(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,$t(c).dials.forEach(function(h){d.dials[h.key]=ue(h,u[h.key])}),vi(c,d.dials,u)}}return{state:i,dropped:r}}function vi(t,e,n){for(var i=$t(t),o=0;o<i.dials.length;o++){var r=i.dials[o];r.stepWhen&&(e[r.key]=ue(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Ce(r,e)))}}function Gt(t){return wi(t).state}function ki(t){return JSON.parse(JSON.stringify(t))}var $i=24,Ht={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ft(t,e,n){if(e==="bypass")return n?0:1;var i=Kn(t,e)||xi(t,e);return i?Un(i,n):0}function xi(t,e){var n=oe(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var Si={};Ze.forEach(function(t){t.dials.forEach(function(e){Si[t.type+"."+e.key]=e.format})});function Nt(t,e){var n=new Float64Array($i),i=Gt(t);return i.chain.forEach(function(o){var r=Ht[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=Ft(o.type,s,o.dials[s])})}),n}var Ai=2,ht=3,Li=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function We(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Qt(t,e){var n=oe(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var o=1;i[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function Mi(t){var e=oe(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Ei(t,e,n){var i=t.length-1,o=Math.max(0,Math.min(i,n));if(e<0||e>i||e===o)return t;var r=t.slice(),s=r.splice(e,1)[0];return r.splice(o,0,s),r}function Ci(t){return typeof t=="number"&&isFinite(t)?yi(t):t}function mn(t,e,n){var i={};return t.dials.forEach(function(o){var r=e[o.key];r===void 0&&o.astridKey&&(r=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(r=Ci(r)),i[o.key]=ue(o,r)}),t.dials.forEach(function(o){o.stepWhen&&(i[o.key]=ue(o,typeof e[o.key]=="number"?e[o.key]:i[o.key],Ce(o,i)))}),i}function Ti(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,o=1/0,r=t.min;r<=t.max;r++){var s=Ae(n.law,r),l=s===null?1/0:Math.abs(s-e);l<o&&(o=l,i=r)}return i}}var Ii={rate:"rate_hz"};function Ni(t,e,n,i){var o={};return t.dials.forEach(function(r){if(!r.more){var s=r.astridKey||Ii[r.key]||r.key;o[r.key]=Ti(r,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function zi(t,e){var n=e>0?Math.floor(e):ht,i=[],o=[],r=[],s=!1,l=!1;Array.isArray(t)?(r=t,l=!0):We(t)&&Array.isArray(t.chain)&&(r=t.chain,s=t.v===1,l=t.schema===2);for(var c=[],d=0;d<r.length;d++){var u=r[d];if(We(u)&&!(u.type==="limiter"||u.fixed===!0)){var h=Jt(u.type),f=h&&oe(h);if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof u.type=="string"&&i.push(u.type);continue}if(c.length>=n){i.push(u.id||h);continue}var b;We(u.params)&&!We(u.dials)?b=mn(f,Ni(f,u.params,o,u.id||h),l):b=mn(f,We(u.dials)?u.dials:{},l);var g=Qt(h,c),y=typeof u.id=="string"&&Li.test(u.id)&&!c.some(function(m){return m.id===u.id})?u.id:g.id,p=s?u.bypass!==!1:u.bypass===!0;c.push({id:s?g.id:y,type:h,bypass:p,dials:b})}}return{state:{v:Ai,chain:c},dropped:i,notes:o}}function Ye(t,e){return zi(t,e).state}function $e(t){var e=oe(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Un(i,t.dials[i.key])])}),n}function Ri(t){var e=Ye(t,8),n=[],i=e.chain.map(function(o,r){var s=oe(o.type),l={};return r>=ht&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=o.dials[c.key];if(c.more){d!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&Pt.indexOf(d)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:i,lossy:n}}var Bi="nc-fx@1",Wi=600,ji=256,Oi=8,je=typeof WeakMap=="function"?new WeakMap:null;function Pi(t,e){var n=je&&je.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await li(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),je&&(je.set(t,n),n.catch(function(){je.delete(t)})),n)}function xe(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Jn(t,e,n,i){var o=Math.min(400,Math.max(20,xe(e.bpm,120))),r=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",c=xe(e.preGain,1),d=Math.max(0,xe(e.crossfade,.012)),u=xe(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),b=t.createGain(),g=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,h.connect(b),b.connect(f),g.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o},m=n(o);p.post=function(k){p.node?p.node.port.postMessage(k):p.disposed||(r.length>=ji&&(r=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),r.push(k))};function w(k){var x=r.map(function($){var M=Object.assign({},$);return M.when>k||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return r=[],x}p.emit=function(k){for(var x=0;x<p.listeners.length;x++)try{p.listeners[x](k)}catch($){typeof console<"u"&&console.error($)}},p.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;p.tooFar=function(k){return typeof k=="number"&&k>t.currentTime+Wi?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var L=Pi(t,e.moduleUrl).then(function(){if(!p.disposed){var k=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},m);k.pending=w(t.currentTime),p.node=new AudioWorkletNode(t,Bi,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(g);var x=t.currentTime;x<=0||d===0?(b.gain.value=0,g.gain.value=1):(b.gain.setValueAtTime(1,x),b.gain.linearRampToValueAtTime(0,x+d),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+d)),p.status="ready"}},function(k){p.status="unavailable",r=[],p.error=k});return p.core={input:h,output:f,modInput:y,ready:L,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(k,x){var $=xe(k,NaN);!($>0)||p.disposed||p.tooFar(x)||(p.bpm=Math.min(400,Math.max(20,$)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(x)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(k){var x=k&&typeof k=="object"?k:{at:k};if(!(p.disposed||p.tooFar(x.at))){var $=xe(x.fadeMs,0);p.post({t:"clear",when:p.whenOf(x.at),fadeMs:$>0?Math.min(1e3,$):0})}},onChange:function(k){return p.listeners.push(k),function(){var x=p.listeners.indexOf(k);x>=0&&p.listeners.splice(x,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,b,g,f,y].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},p}function Gi(t,e){var n=e||{};if(n.slots)return Hi(t,n);var i=Gt(n.state),o=Array.from(Nt(i)),r=Jn(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Nt(i)),when:0}]}),s=r.core;function l(c){return i.chain[kt.indexOf(c)]}return s.setParam=function(c,d,u,h){var f=pt(c);if(!(!f||r.disposed||r.tooFar(h))){var b=l(f),g;if(d==="bypass")g=!!u;else{var y=Kn(f,d);if(!y)return;g=ue(y,u,Ce(y,b.dials))}return d==="bypass"?b.bypass=g:b.dials[d]=g,r.post({t:"p",i:Ht[f][d],v:Ft(f,d,g),when:r.whenOf(h)}),r.emit({effect:f,key:d,value:g}),$t(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===d}))){var m=b.dials[p.key],w=ue(p,m,Ce(p,b.dials));w!==m&&(b.dials[p.key]=w,r.post({t:"p",i:Ht[f][p.key],v:Ft(f,p.key,w),when:r.whenOf(h)}),r.emit({effect:f,key:p.key,value:w}))}}),g}},s.getParam=function(c,d){var u=pt(c);if(u){var h=l(u);return d==="bypass"?h.bypass:h.dials[d]}},s.getState=function(){return ki(i)},s.setState=function(c,d){r.disposed||r.tooFar(d&&d.at)||(i=Gt(c),r.post({t:"load",program:Array.from(Nt(i)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},s}function Hi(t,e){var n=e.slots===!0?ht:Math.max(1,Math.min(Oi,Math.floor(+e.slots)||ht)),i=Ye(e.state,n),o=1,r={};function s(p){return r[p.id]||(r[p.id]=o++),r[p.id]}function l(p){return p.map(function(m){return{uid:s(m),type:m.type,program:$e(m)}})}var c=l(i.chain),d=i.chain.map(function(p){return r[p.id]}),u=Jn(t,e,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(p){return r[p.id]}),when:0}]}),h=u.core;function f(p){var m;for(m=0;m<i.chain.length;m++)if(i.chain[m].id===p)return i.chain[m];var w=Jt(p);if(w){for(m=0;m<i.chain.length;m++)if(i.chain[m].type===w)return i.chain[m]}return null}function b(p,m){var w=s(p);u.post({t:"add",uid:w,type:p.type,when:m}),$e(p).forEach(function(v){u.post({t:"ps",uid:w,k:v[0],v:v[1],when:m,snap:!0})})}function g(p){u.post({t:"order",uids:i.chain.map(function(m){return r[m.id]}),when:p})}function y(p,m){var w={};i.chain.forEach(function(k){w[k.id]=k});var v=i.chain.map(function(k){return r[k.id]}).join();p.chain.forEach(function(k){var x=w[k.id];if(!x||x.type!==k.type){delete r[k.id],b(k,m);return}var $={};$e(x).forEach(function(M){$[M[0]]=M[1]}),$e(k).forEach(function(M){$[M[0]]!==M[1]&&u.post({t:"ps",uid:r[k.id],k:M[0],v:M[1],when:m})})});var L={};p.chain.forEach(function(k){L[k.id]=!0}),Object.keys(r).forEach(function(k){L[k]||delete r[k]}),i=p,i.chain.map(function(k){return r[k.id]}).join()!==v&&g(m)}return h.slots=n,h.setParam=function(p,m,w,v){var L=f(p);if(!(!L||u.disposed||u.tooFar(v))){var k=oe(L.type),x,$=null;if(m==="bypass")x=!!w;else{for(var M=0;M<k.dials.length;M++)k.dials[M].key===m&&($=k.dials[M]);if(!$)return;x=ue($,w,Ce($,L.dials))}var I={},P={};$e(L).forEach(function(C){I[C[0]]=C[1]}),k.dials.forEach(function(C){C.stepWhen&&(P[C.key]=L.dials[C.key])}),m==="bypass"?L.bypass=x:L.dials[m]=x,k.dials.forEach(function(C){C.stepWhen&&(L.dials[C.key]=ue(C,L.dials[C.key],Ce(C,L.dials)))});var D=u.whenOf(v),re=r[L.id];return $e(L).forEach(function(C){(I[C[0]]!==C[1]||$&&C[0]===$.k)&&u.post({t:"ps",uid:re,k:C[0],v:C[1],when:D})}),u.emit({effect:L.id,key:m,value:x}),Object.keys(P).forEach(function(C){C!==m&&L.dials[C]!==P[C]&&u.emit({effect:L.id,key:C,value:L.dials[C]})}),x}},h.getParam=function(p,m){var w=f(p);if(w)return m==="bypass"?w.bypass:w.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(i))},h.setState=function(p,m){u.disposed||u.tooFar(m&&m.at)||(y(Ye(p,n),u.whenOf(m&&m.at)),u.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var w=m||{},v=Qt(p,i.chain);if(!(!v||i.chain.length>=n||u.disposed||u.tooFar(w.at))){if(w.dials){var L=Ye({v:2,chain:[{id:v.id,type:v.type,dials:w.dials}]},1).chain[0];v.dials=L.dials}w.bypass===!0&&(v.bypass=!0);var k=i.chain.slice(),x=typeof w.index=="number"?Math.max(0,Math.min(k.length,w.index)):k.length;return k.splice(x,0,v),y({v:2,chain:k},u.whenOf(w.at)),u.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,m){var w=f(p),v=m&&m.at;return!w||u.disposed||u.tooFar(v)?!1:(y({v:2,chain:i.chain.filter(function(L){return L!==w})},u.whenOf(v)),u.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,w){var v=f(p),L=w&&w.at;if(!v||u.disposed||u.tooFar(L))return!1;var k=Ei(i.chain,i.chain.indexOf(v),m);return k===i.chain?!1:(y({v:2,chain:k},u.whenOf(L)),u.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:Mi(p),bypass:p.bypass}})},h.toAstrid=function(){return Ri(i)},h}function fn(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Fi(t,e,n){var i=n||{},o=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,r=typeof i.toAudioTime=="function"?i.toAudioTime:o?function(f){return o.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,c=l&&l.tempo?l.tempo:l,d=!1;function u(f){if(!r){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var b=r(l.timeAt(f));return typeof b=="number"&&isFinite(b)?b:void 0}}function h(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var b=l&&typeof l.bpm=="number"?l.bpm:fn(c,0);b>0&&t.setTempo(b);return}var g=fn(c,f);g>0&&t.setTempo(g);for(var y=c&&(c.points||c.tempoPoints)||[],p=0;p<y.length;p++){var m=y[p];if(m.beat>f&&m.bpm>0){var w=u(m.beat);w!==void 0&&t.setTempo(m.bpm,w)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,u(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&h())})}const Zi="/lucy/assets/worklet-CnpUVY5i.js";var Yi="nc-ui",Qn={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Zt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ge={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Pe=t=>`--${Yi}-${t}`,Yt=Qn["label-on-fill-dark"],gn=Qn["label-on-fill-light"],Di=ge["label-min-contrast"],Xi=/^#[0-9a-f]{6}$/i,_i=t=>typeof t=="string"&&Xi.test(t),st=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function bn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${st(o(0)*255)}${st(o(8)*255)}${st(o(4)*255)}`}function ea(t){let[e,n,i]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),o=Math.max(e,n,i),r=Math.min(e,n,i),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-i)/l%6):o===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:c,l:s}}function yn(t){let[e,n,i]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Dt(t,e){let[n,i]=[yn(t),yn(e)].sort((o,r)=>r-o);return(n+.05)/(i+.05)}var mt=t=>Dt(t,Yt)>=Dt(t,gn)?Yt:gn;function ta(t,e,n,i=Di){let o=bn(t,e,n),r=mt(o)===Yt?1:-1;for(let s=0;s<40&&Dt(o,mt(o))<i;s++)n+=r*.01,o=bn(t,e,n);return o}function qi(t){let{h:e,s:n}=ea(t),i=ta(e,Math.min(n,ge["surprise-on-max-saturation"]),ge["surprise-on-lightness"]);return{fill:t,ink:mt(t),on:i,onInk:mt(i)}}var Ui=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Vi(t,e=Math.random){let[n,i]=ge["surprise-saturation"],[o,r]=ge["surprise-lightness"],s=ge["surprise-min-hue-gap"],l=_i(t)?ea(t).h:null,c=e()*360;return l!==null&&Ui(c,l)<s&&(c=(l+s+e()*(360-2*s))%360),ta(c,n+e()*(i-n),o+e()*(r-o))}function Ki(t){if(!t)return null;let e=qi(t);return{[Pe("surprise-fill")]:e.fill,[Pe("surprise-ink")]:e.ink,[Pe("surprise-on")]:e.on,[Pe("surprise-on-ink")]:e.onInk}}var Ji=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Qi=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function wn(t){let[e,n,i]=[1,3,5].map(l=>Ji(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function eo([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*o+.2309699292*r,-1.2684380046*i+2.6097574011*o-.3413193965*r,-.0041960863*i-.7034186147*o+1.707614701*r].map(s=>st(Qi(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var to=ge["velocity-range"],na={min:Zt.rhythm["velocity-min"],max:Zt.rhythm["velocity-max"]};function no(t,e=na){let[n,i]=to,o=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,r=(o-n)/(i-n),s=Zt.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=wn(e.min),c=wn(e.max);return{velocity:o,t:r,fill:eo(l.map((d,u)=>d+(c[u]-d)*r)),ink:s}}function vn(t,e=na){return{[Pe("velocity-fill")]:no(t,e).fill}}var ao={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},io={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},oo={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ro={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},xt={};for(let[t,e]of Object.entries(io))xt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(ro))xt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(oo))xt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(ao.renames.map(t=>[t.old,t.new]));function aa(t){let e=xt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function W(t){return aa(t).prop}function a(t){return`var(${W(t)})`}function so(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(W(e)));return Number.isFinite(n)?n:0}function G(t,e){let n=aa(e),i=t.ownerDocument??document,o=i.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:i.documentElement).append(o);let s=(i.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function lo(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function co(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var uo="[data-modulated], [data-modulated] *";function po(){let t=i=>`
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
${uo} { transition: none; }
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
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${a("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
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
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${a("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${a("move-row-gap")}; margin-top: ${a("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${a("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${a("move-label-width")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${a("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${a("move-size")};
  height: ${a("move-size")};
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${a("move-icon")}; height: ${a("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${a("text")}; border-color: ${a("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-moves-btn:disabled { color: ${a("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${a("target-min")}; height: ${a("target-min")}; }
}
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
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${a("toast-pad-x")} / 2) calc(${a("toast-pad-x")} * 0.75);
  border-radius: ${a("toast-radius")};
  background: ${a("toast-bg")};
  color: ${a("toast-text")};
  font-family: ${a("font-ui")};
  font-size: ${a("toast-font-size")};
  font-weight: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-transform: none;
  text-align: left;
  white-space: normal;
  pointer-events: none;
}
.nc-ui-help[hidden] { display: none; }
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
`}var zt=null,ho="nc-ui-fallback";function ia(t=globalThis.document){if(!t?.documentElement||(t.documentElement,zt&&zt.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${ho} {
${po()}
}
`,t.head.append(e),zt=e}var Oe=null,mo=0,fo=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,oa=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=fo,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&oa(document);function go({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:o=!1,root:r,returnFocus:s,signal:l}){if(Oe||l?.aborted)return Promise.resolve(!1);let c=r?.ownerDocument??document,d=oa(c),u=r??c.body,h=c.defaultView??globalThis,f=`nc-ui-confirm-${++mo}`,b=(T,se,ee)=>{let ye=c.createElement(T);return ye.className=`nc-ui-confirm${se}`,ee!=null&&(ye.textContent=ee),ye},g=b("div","-layer");g.dataset.state="enter";let y=b("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${f}-t`),y.setAttribute("aria-describedby",`${f}-b`);let p=b("h2","-title",t);p.id=`${f}-t`;let m=b("p","-body",e);m.id=`${f}-b`;let w=b("div","-actions"),v=(T,se)=>{let ee=b("button","-btn",T);return ee.type="button",ee.dataset.ncConfirm=se,ee.addEventListener("click",()=>be(se==="ok")),ee},L=v(i,"cancel"),k=v(n,"ok");o&&(k.dataset.danger="true"),w.append(L,k),y.append(p,m,w),g.append(y);let x={layer:g};Oe=x;let $=s??c.activeElement,M=[];for(let T of u.children)T.hasAttribute("inert")||(T.setAttribute("inert",""),M.push(T));let I=()=>{if(Oe!==x)return;u.append(g),L.focus({preventScroll:!0});let T=h.requestAnimationFrame?.bind(h)??(se=>setTimeout(se,16));T(()=>T(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};d?d.then(I):I();let P=!1;g.addEventListener("pointerdown",T=>{P=T.target===g}),g.addEventListener("click",T=>{T.target===g&&P&&be(!1),P=!1});let D=T=>{T.stopImmediatePropagation(),T.key==="Escape"?(T.preventDefault(),be(!1)):T.key==="Tab"?(T.preventDefault(),(c.activeElement===L?k:L).focus()):T.key==="Enter"&&(T.preventDefault(),c.activeElement===k?be(!0):c.activeElement===L&&be(!1))},re=T=>T.stopImmediatePropagation();h.addEventListener("keydown",D,!0),h.addEventListener("keyup",re,!0);let C=()=>be(!1);l?.addEventListener("abort",C);let tt,Ga=new Promise(T=>{tt=T});function be(T){if(Oe!==x)return;Oe=null,h.removeEventListener("keydown",D,!0),h.removeEventListener("keyup",re,!0),l?.removeEventListener("abort",C);for(let we of M)we.removeAttribute("inert");g.dataset.state="closing",$?.isConnected&&typeof $.focus=="function"&&$.focus({preventScroll:!0});let se=h.getComputedStyle?.(g),ee=Math.max(0,...String(se?.transitionDuration??"").split(",").map(we=>Number.parseFloat(we)*(we.trim().endsWith("ms")?1:1e3)||0)),ye=()=>g.remove();g.addEventListener("transitionend",we=>we.target===g&&ye()),setTimeout(ye,ee+50),tt(T)}return Ga}function ra(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",i.append(o,r),n.append(i);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let c=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var sa=new WeakMap,kn=.25;function bo(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(i,o);let r=0,s=t.step??.005,l=t.onChange,c=t.onReset,d=p=>Math.min(1,Math.max(0,p)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{let m=d(p);m!==r&&(r=m,u(),l?.(m))},f=0,b=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();p.target!==o&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!b)return;let m=n.getBoundingClientRect().height||1,w=(f-p.clientY)/m*(p.shiftKey?kn:1);f=p.clientY,h(r+w)});let g=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",p=>{p.preventDefault(),c?.()}),n.addEventListener("keydown",p=>{let m=p.shiftKey?s*kn:s,w={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});let y={el:n,get value(){return r},get dragging(){return b},set(p){b||(r=d(Number(p)||0),u())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(c=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),sa.set(n,y),y}function yo(t){return sa.get(t)}var la=new WeakMap,wo=.2,vo=1.5,ko=.5;function $o(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function $n(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:$o(i.getComputedStyle(t).getPropertyValue(W(e)),n)}function xo(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let m=e.createElement("span");m.className="nc-meter-peak";let w=e.createElement("span");w.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",p.append(m,w,v),r.append(p),s.push({peak:m,rms:w,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(o,r);let l=t.label,c=t.onClear,d=!1,u=-1,h=-1,f=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},b=(y,p,m,w)=>{let v=Math.round(w*1e3)/1e3;m[p]!==v&&(m[p]=v,y.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{g.clear(),c?.()});let g={el:i,get clipped(){return d},update(y,p){u<0&&(u=$n(i,"motion-meter-fall",wo)),h<0&&(h=$n(i,"motion-meter-hold",vo));let m=Math.max(0,Math.min(.25,Number(p)||0)),w=u>0?Math.exp(-m/u):0;s.forEach((v,L)=>{let k=y[L]??y[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(k.peak)||0)),$=Math.min(x,Math.max(0,Number(k.rms)||0));k.over&&g.clip(),v.level.peak=x>=v.level.peak?x:x+(v.level.peak-x)*w,v.level.rms=$>=v.level.rms?$:$+(v.level.rms-$)*w,v.holdAge+=m,x>=v.holdAt?(v.holdAt=x,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(x,v.holdAt-ko*m)),b(v.peak,"peak",v.shown,v.level.peak),b(v.rms,"rms",v.shown,v.level.rms),b(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,b(y.peak,"peak",y.shown,0),b(y.rms,"rms",y.shown,0),b(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(c=y.onClear)}};return f(),g.reset(),la.set(i,g),g}function So(t){return t?la.get(t):void 0}function Ao(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(n*i));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function le(t){return Math.max(0,Math.min(1,t))}function ca(t,e){let{ctx:n,w:i,h:o}=Ao(t);if(!n)return;n.clearRect(0,0,i,o);let r=co(t);if(e.paint==="swatch"){let c=G(t,"accent"),d=G(t,"rhythm.step-cell-on");t.dataset.ncAccent=c,t.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,i/2,o),n.fillStyle=d,n.fillRect(i/2,0,i/2,o);return}if(e.paint==="filter"){let c=e.mode??"lp",d=G(t,lo(c)),u=G(t,"divider"),h=le(e.cutoff??.5),f=.08+(1-le(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(i,o*.72),n.stroke(),n.beginPath();for(let b=0;b<=i;b++){let g=b/Math.max(1,i),y=0;c==="lp"?y=g<h?1:Math.max(0,1-(g-h)/f):c==="hp"?y=g>h?1:Math.max(0,1-(h-g)/f):y=Math.max(0,1-Math.abs(g-h)/f);let p=o*.78-y*o*.62;b===0?n.moveTo(b,p):n.lineTo(b,p)}n.strokeStyle=d,n.stroke(),n.fillStyle=G(t,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,o),t.dataset.ncAccent=d;return}if(e.paint==="envelope"){n.strokeStyle=G(t,"accent"),n.beginPath();let c=Math.max(.05,e.decay??.4);for(let d=0;d<=i;d++){let u=d/Math.max(1,i),h=(o-4)*(1-Math.exp(-u*4/c));n.lineTo(d,o-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let c=Array.isArray(e.peaks)?e.peaks:[],[d,u]=Array.isArray(e.region)?e.region:[0,1],h=G(t,"accent"),f=G(t,"text-sub"),b=o/2;n.fillStyle=G(t,"accent-soft"),n.fillRect(le(d)*i,0,(le(u)-le(d))*i,o),n.strokeStyle=G(t,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(i,b),n.stroke();let g=Math.floor(c.length/2);for(let y=0;y<g;y++){let p=(y+.5)/g*i,m=Math.max(-1,Math.min(1,c[y*2]??0)),w=Math.max(-1,Math.min(1,c[y*2+1]??0)),v=(y+.5)/g;n.strokeStyle=v>=d&&v<=u?h:f,n.beginPath(),n.moveTo(p,b-w*(b-1)),n.lineTo(p,b-m*(b-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[d,u,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round(le(y)*(i-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=G(t,"text"),n.fillRect(Math.round(le(e.position)*(i-1)),0,1,o)),g||(n.fillStyle=f,n.font=r,n.fillText(e.empty??"Empty",0,b+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let c=le(e.level??0);n.fillStyle=G(t,"divider"),n.fillRect(0,o*.4,i,o*.2),n.fillStyle=G(t,"accent"),n.fillRect(0,o*.4,i*c,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=G(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,i,o*.1),n.fillStyle=G(t,"rhythm.playhead"),n.fillRect(l/s*i,o*.3,Math.max(1,i/s),o*.4),t.dataset.ncAccent=G(t,"accent")}var da={slop:8,longPressMs:500,pitchPx:16},Lo=class{constructor(t,e,n=da){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Mo(t,e,n,i=da){let o=!1,r=0,s=(d,u)=>{let h=t.ownerDocument.elementFromPoint?.(d,u),f=[...t.querySelectorAll(e)],b=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(b>=0)return b;let g=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,m)=>{if(p.hidden)return;let w=p.getBoundingClientRect();if(u<w.top||u>w.bottom)return;let v=Math.abs(d-(w.left+w.width/2));v<y&&v<=w.width&&(g=m,y=v)}),g},l=new Lo(s,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},i),c=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),t.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),t.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),t.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),t.addEventListener("contextmenu",d=>d.preventDefault()),l}var ot="application/x-nc-pad",xn="http://www.w3.org/2000/svg";function Eo(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),i=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*e/n),l=Math.max(s+1,Math.floor((r+1)*e/n)),c=0,d=0;for(let h=s;h<l;h++)c=Math.min(c,t[2*h]??0),d=Math.max(d,t[2*h+1]??0);let u=n===1?50:r/(n-1)*100;i.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${i.join("L")}L${o.reverse().join("L")}Z`}function Co(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let i=document.createElement("div");return i.className="nc-padgrid-pads",i.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,r)=>i.append(To(n,r,e))),n.append(i),n.addEventListener("keydown",o=>{o.key==="Escape"&&lt(n)}),pa(n,t),n}function To(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-padgrid-pad",i.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(xn,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(xn,"path");return c.append(d),i.append(o,r,s,l,c),No(t,i,e,n),i.addEventListener("dblclick",()=>{let u=n(t);u?.type==="padGrid"&&u.onRename&&i.dataset.empty!=="true"&&ua(t,i,e,n)}),i.addEventListener("dragstart",u=>{if(i.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(ot,String(e)),u.dataTransfer.effectAllowed="copyMove",i.dataset.dragging="true"}),i.addEventListener("dragend",()=>delete i.dataset.dragging),i.addEventListener("dragover",u=>{let h=u.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(ot)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=h.includes(ot)&&!u.altKey?"move":"copy"),i.dataset.drop="true")}),i.addEventListener("dragleave",()=>delete i.dataset.drop),i.addEventListener("drop",u=>{delete i.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let f=u.dataTransfer?.getData(ot);if(f!==void 0&&f!==""){u.preventDefault(),u.stopPropagation();let g=Number(f);g!==e&&h.onMove?.(g,e,u.altKey);return}let b=u.dataTransfer?.files?.[0];b&&(u.preventDefault(),u.stopPropagation(),h.onFile?.(e,b))}),i}function Io(t,e,n){let i=n(t);i?.type==="padGrid"&&i.onPress(e)}function No(t,e,n,i){let o=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,c();let u=i(t);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=Sn(t,e,n,i)},450)))}),e.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,c);e.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=Sn(t,e,n,i)}),e.addEventListener("click",()=>{if(r){r=!1;return}Io(t,n,i)})}function Sn(t,e,n,i){let o=i(t);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;lt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),lt(t)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let u of r){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=u.id,h.textContent=u.label,h.addEventListener("click",()=>{lt(t);let f=i(t);f?.type==="padGrid"&&(u.id==="rename"&&f.onRename?ua(t,e,n,i):f.onMenu?.(n,u.id))}),l.append(h)}t.append(s,l);let c=t.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function ua(t,e,n,i){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=i(t);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let h=r.value.trim();r.remove(),e.focus();let f=i(t);u&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,h=>h.stopPropagation());t.append(r),r.focus(),r.select()}function lt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function pa(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((i,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=i.empty?"":i.badge??""),r.draggable=!i.empty,i.empty?(r.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=i.label),l&&(l.textContent=""),c?.setAttribute("d",Eo(i.peaks))),i.lane?r.dataset.ncLane=String(i.lane):delete r.dataset.ncLane;let u=e.selected===o;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),i.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",i.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${i.label}${i.badgeLabel?`, ${i.badgeLabel}`:""}${u?", selected":""}`)})}function Z(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function St(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(i,o),n}function An(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function qe(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var zo=450,Ln=8;function ie(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Ro(t){let e=so(t,"target-min");return e>0?e:44}function Bo(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Ro(t),i=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-i,h=c+i,f=d-i,b=d+i;for(let g=0;g<e.length;g++){if(r===g)continue;let y=o[g];if(!y||y.width===0)continue;let p=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-d)<i*2&&(p>c?h=Math.min(h,(c+p)/2):p<c&&(u=Math.max(u,(c+p)/2))),Math.abs(p-c)<i*2&&(m>d?b=Math.min(b,(d+m)/2):m<d&&(f=Math.max(f,(d+m)/2)))}u=Math.min(u,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),b=Math.max(b,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,h-u)}px`,s.style.height=`${Math.max(0,b-f)}px`,s.style.transform="none"}}function ha(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Mn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ft(t,e){switch(t.type){case"slider":return Wo(t,e);case"select":return Oo(t,e);case"toggle":return Po(t,e);case"button":return Go(t,e);case"readout":return Ho(t);case"label":return Do(t);case"note":return En(t);case"knob":return qo(t,e);case"choice":return Uo(t,e);case"slotRow":return Vo(t,e);case"stepGrid":return er(t,e);case"canvas":return ar(t);case"fx":return sr(t,e);case"strip":return ir(t,e);case"stripAdd":return rr(t,e);case"padGrid":return Co(t,e);case"moves":return Zo(t,e);default:return En({id:"unknown",text:""})}}function pe(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,fa(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??qe(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),An(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")An(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Xo(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??qe(e.value))}else if(e.type==="choice")ga(t,e);else if(e.type==="slotRow")ya(t,e);else if(e.type==="stepGrid")Xt(t,e);else if(e.type==="padGrid")pa(t,e);else if(e.type==="moves")ma(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&ca(n,e)}else if(e.type==="strip"){$a(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${_t(n.id)}"]`);i instanceof Element&&pe(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")va(t,e);else if(e.type==="fx"){xa(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${_t(n.id)}"]`);i instanceof Element&&pe(i,n)}}}}function Wo(t,e){let n=St(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{let r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(i,o),t.onTap&&n.insertBefore(jo(t,i,e),o),n.append(Z()),pe(n,t),n}function jo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(ie());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),i}function Oo(t,e){let n=St(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let o of t.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,i.append(r)}return i.value=t.value,i.addEventListener("change",()=>{let o=e(i);o?.type==="select"&&o.onChange(i.value)}),n.append(i,Z()),n}function Po(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(Z()),pe(n,t),n}function Go(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(Z()),pe(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=ha(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&wa(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,o),i}function Ho(t){let e=St(t.id,t.label);return e.append(Z()),pe(e,t),e}var Fo=450;function Zo(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let i of t.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",i.label),i.title&&(o.title=i.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=i.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of i.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${i.label} ${l.text}`),c.append(Yo(l.icon)),c.addEventListener("click",()=>{let d=e(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}o.append(r,s),n.append(o)}return ma(n,t),n}function ma(t,e){for(let n of e.groups)for(let i of n.moves){let o=t.querySelector(`[data-nc-move="${_t(i.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=i.disabled===!0)}}function Yo(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let i=document.createElementNS(e,"path");i.setAttribute("d",t.stroke),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),n.append(i)}if(t?.fill){let i=document.createElementNS(e,"path");i.setAttribute("d",t.fill),i.setAttribute("fill","currentColor"),n.append(i)}return n}function Do(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(Z()),e}function En(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(Z()),e}function Cn(t){if(typeof t.valueText=="string")return t.valueText;let e=qe(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function fa(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Xo(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;fa(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Cn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Cn(e)}`}function _o(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function qo(t,e){let n=St(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",i.append(o);let r=0,s=0;i.addEventListener("pointerdown",c=>{r=c.clientY;let d=e(i);s=d&&"value"in d?Number(d.value):0,i.setPointerCapture?.(c.pointerId)}),i.addEventListener("pointermove",c=>{if(i.hasPointerCapture&&!i.hasPointerCapture(c.pointerId))return;let d=e(i);if(d?.type!=="knob")return;let u=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,s-(c.clientY-r)*u/120));d.onChange(h)}),i.addEventListener("dblclick",()=>{let c=e(i);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),i.addEventListener("keydown",c=>{let d=e(i);if(d?.type!=="knob")return;let u=_o(d,c);u!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,u))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(Z()),pe(n,t),n}function Uo(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=i.value,o.setAttribute("role","tab"),o.textContent=i.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(i.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(Z()),ga(n,t),n}function ga(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Vo(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let h=t.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(u),b.textContent=h.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(b,ie()),Ko(f,b,n,u,e),i.append(f)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=ha(),o.append(ie()),o.addEventListener("click",()=>{wa(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(i,...o?[o]:[]),n.append(d,r,Z()),ba(n,e),ya(n,t),n}function Tn(t,e,n,i){let o=n(t);if(o?.type!=="slotRow")return;Ge(t);let r=i.shiftKey?"store":i.altKey?"clear":"recall";o.onSlot(e,r)}function Ko(t,e,n,i,o){let r=0,s=0,l=0,c=!1,d=!1,u=!1,h=!1,f=()=>{window.clearTimeout(r),r=0},b=m=>{let w=m.clientX-s,v=m.clientY-l;w*w+v*v>Ln*Ln&&(c=!0,f())},g=()=>{h&&(h=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=m=>{let w=r!==0&&!c&&!d;f(),g(),w&&(u=!0,Tn(n,i,o,m))},p=()=>{c=!0,f(),g()};t.addEventListener("pointerdown",m=>{m.button===0&&(g(),d=!1,c=!1,u=!1,s=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Jo(n,e,i,o))},zo),h=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(u||d||c){u=!1,d=!1,c=!1;return}Tn(n,i,o,m)})}function ba(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=In("Save","store"),o=In("Clear","clear");n.append(i,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ge(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=e(t);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Ge(t)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Ge(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&Ge(t)})}function In(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Jo(t,e,n,i){ba(t,i);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function Ge(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ya(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function wa(t){let e=t.dataset.ncLastFill||null,n=Vi(e);t.dataset.ncLastFill=n;let i=Ki(n);if(i)for(let[o,r]of Object.entries(i))t.style.setProperty(o,r)}function Qo(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,o=r=>{if(i===r)return;i=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function er(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let o=p=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,i.append(m),m},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let m of[r,s]){let w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(r);for(let p of[r,s])p.addEventListener("click",()=>l(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let m=s.getAttribute("aria-checked")==="true"?r:s;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(i),t.onFill&&c.append(Qo(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(p)}n.append(c);for(let p of t.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,L=0;w.addEventListener("pointerdown",$=>{v=!1,!($.pointerType==="mouse"||$.button!==0)&&(L=window.setTimeout(()=>{let M=e(n);M?.type!=="stepGrid"||!M.selectedRows||(v=!0,M.onSelectRow?.(M.rows.findIndex(I=>I.id===p.id),!0))},Fo))});for(let $ of["pointerup","pointercancel","pointerleave"])w.addEventListener($,()=>window.clearTimeout(L));w.addEventListener("contextmenu",$=>{v&&$.preventDefault()}),w.addEventListener("click",$=>{let M=e(n);if(M?.type!=="stepGrid")return;if(v){v=!1;return}let I=M.rows.findIndex(D=>D.id===p.id),P=!!M.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);M.onSelectRow?.(I,P)}),w.addEventListener("keydown",$=>tr(n,w,$));let k=[];for(let $ of["mute","solo"]){if(!($==="mute"?t.onMute:t.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let I=document.createElement("button");I.type="button",I.className="nc-ms",I.dataset.ncMs=$,I.textContent=$==="mute"?"M":"S",I.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${p.label}`),M.append(I,ie()),M.addEventListener("click",()=>{let P=e(n);if(P?.type!=="stepGrid")return;let D=P.rows.findIndex(re=>re.id===p.id);($==="mute"?P.onMute:P.onSolo)?.(D)}),k.push(M)}let x=document.createElement("div");x.className="nc-steps";for(let $=0;$<p.steps.length;$++){let M=document.createElement("span");M.className="nc-step-wrap";let I=document.createElement("button");I.type="button",I.className="nc-step",I.dataset.ncStep=`${p.id}:${$}`,I.setAttribute("aria-label",`${p.label} step ${$+1}`),M.append(I,ie()),M.addEventListener("click",P=>{let D=e(n);if(D?.type!=="stepGrid")return;let re=D.rows.findIndex(tt=>tt.id===p.id),C=s.getAttribute("aria-checked")==="true";D.onToggle(re,$,P.shiftKey||C)}),x.append(M)}if(t.onLength&&x.append(nr(n,x,p,e)),m.append(...k,w,x),t.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=p.id,$.setAttribute("aria-label",`Re-roll ${p.label}`),$.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Mn(),$.append(ie()),$.addEventListener("click",()=>{let M=e(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(I=>I.id===p.id))}),m.append($)}m.addEventListener("click",$=>{if($.target!==m)return;let M=e(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(I=>I.id===p.id))}),Nn(n,x,".nc-step-wrap",e,s,()=>p.id),n.append(m)}let d=document.createElement("div");d.className="nc-pads-head";let u=(p,m,w)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=m,w&&v.setAttribute("aria-label",w),v},h=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),b=document.createElement(t.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),t.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Xt(n,p))}));for(let[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let v=w.rows.length;w.onSelectRow?.(((rt(w)+m)%v+v)%v)});if(d.append(h,b,f),t.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Mn(),p.addEventListener("click",()=>{let m=e(n);if(m?.type!=="stepGrid")return;let w=rt(m);w>=0&&m.onDice?.(w)}),d.append(p)}if(t.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(p)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{let v=e(n);if(v?.type!=="stepGrid")return;let L=rt(v);if(L<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(L,p+1);return}let k=s.getAttribute("aria-checked")==="true";v.onToggle(L,p,w.shiftKey||k)}),g.append(m)}return Nn(n,g,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[rt(p)]?.id:void 0}),n.append(g),n.append(Z()),Xt(n,t),n}function rt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Nn(t,e,n,i,o,r){let s="on",l=!0,c=-1,d=(u,h)=>{let f=u.rows[c]?.steps[h];!f||h>=u.rows[c].length||(u.onSet?u.onSet(c,h,s,l):!!f[s]!==l&&u.onToggle(c,h,s==="accent"))};Mo(e,n,u=>{let h=i(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=h.rows.findIndex(b=>b.id===r());f>=0&&h.rows[f].length!==u.pad+1&&h.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=r();c=h.rows.findIndex(g=>g.id===f);let b=h.rows[c]?.steps[u.pad];if(!b)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!b[s]}d(h,u.pad)}else if(u.kind==="long"){let f=r(),b=h.rows.findIndex(y=>y.id===f),g=e.querySelectorAll(n)[u.pad];b>=0&&g instanceof HTMLElement&&h.onLongPress?.(b,u.pad,g)}}})}function tr(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],o=i.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=i.length-1;let s=i[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function nr(t,e,n,i){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(ie());let r=d=>{let u=i(t);if(u?.type!=="stepGrid")return;let h=u.rows.findIndex(g=>g.id===n.id),f=u.rows[h];if(!f)return;let b=Math.max(1,Math.min(f.steps.length,d));b!==f.length&&u.onLength?.(h,b)},s=d=>{let u=[...e.querySelectorAll(".nc-step")],h=1;return u.forEach((f,b)=>{let g=f.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(h=b+1)}),h},l=d=>r(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let u=i(t);if(u?.type!=="stepGrid")return;let h=u.rows.find(b=>b.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in f&&(d.preventDefault(),r(f[d.key]))}),o}var Rt=new WeakMap;function zn(t,e){let n=typeof e=="number"?e:null;if(!(Rt.has(t)&&Rt.get(t)===n)){if(Rt.set(t,n),n===null){for(let i of Object.keys(vn(1)))t.style.removeProperty(i);return}for(let[i,o]of Object.entries(vn(n)))t.style.setProperty(i,o)}}function Xt(t,e){let n=e.rows.some(u=>u.solo),i=t.querySelector("[data-nc-clear]");i&&i.textContent!==(e.clearLabel??"Clear")&&(i.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),r=e.rows.find(u=>u.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!e.transport?.playing,h=e.transport?.label??(u?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",u?"true":"false");let f=e.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let u=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let f=Number(h.getAttribute("data-nc-pad")),b=r.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!b||!l&&f>=r.length,l&&f>=r.length?h.dataset.out="true":delete h.dataset.out,l&&f===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${f+1}`),h.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?h.dataset.accent="true":delete h.dataset.accent,b?.dim?h.dataset.dim="true":delete h.dataset.dim,zn(h,b?.velocity),e.playhead>=0&&f===u?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let u of e.rows){for(let b=0;b<u.steps.length;b++){let g=u.steps[b],y=t.querySelector(`[data-nc-step="${u.id}:${b}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===u.id?p.dataset.selected="true":delete p.dataset.selected;let v=e.selectedRow!==u.id&&(e.selectedRows??[]).includes(u.id);v?p.dataset.picked="true":delete p.dataset.picked;let L=p.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",e.selectedRow===u.id||v?"true":"false"),L.textContent!==u.label&&(L.textContent=u.label,L.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?p.dataset.silent="true":delete p.dataset.silent;for(let k of p.querySelectorAll("[data-nc-ms]")){let x=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",x?"true":"false")}}y.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?y.dataset.accent="true":delete y.dataset.accent,g.dim?y.dataset.dim="true":delete y.dataset.dim,b%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof g.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),zn(y,g.velocity);let m=e.playhead>=0&&u.length>0?(e.playhead%u.length+u.length)%u.length:-1;b===m?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!e.onLength&&e.selectedRow===u.id;y.hidden=b>=u.length&&!w,b>=u.length&&w?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${u.id}"]`),f=t.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&f&&f.nextElementSibling!==h){let b=document.activeElement===h;f.after(h),b&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(u.length)),h.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),h.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function ar(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,Z()),e}function ir(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let o=document.createElement("span");if(o.className="nc-strip-name",o.dataset.ncStripName="",i.append(o),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(g)}),i.append(g)}let r=document.createElement("div");if(r.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",g.append(y,ie()),g.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),r.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=g,p.textContent=g==="mute"?"M":"S",y.append(p,ie()),y.addEventListener("click",()=>{let m=e(n);m?.type==="strip"&&(g==="mute"?m.onMute:m.onSolo)?.()}),s.append(y)}let l=document.createElement("div");l.className="nc-strip-sends";for(let g of t.sends??[])l.append(ft({...g,type:"knob",compact:!0},e));let c=document.createElement("div");c.className="nc-strip-body";let d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(g.value)),y.textContent=g.label,d.append(y)}let u=bo({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let y=e(n);y?.type==="strip"&&y.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&Bn(g)}}),h=xo({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});c.append(d,u.el,h.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;return f.addEventListener("click",g=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(b),g.detail===0?Rn(n,f,e):g.detail===1&&(b=window.setTimeout(()=>Rn(n,f,e),or)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let g=e(n);g?.type==="strip"&&Bn(g)}),n.append(i,r,s,l,c,f,Z()),$a(n,t),n}var or=250;function Rn(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=i.valueText??qe(i.value),o.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=o.value;if(o.remove(),e.hidden=!1,l){let d=n(t);d?.type==="strip"&&d.onTypeIn?.(c)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function rr(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",i.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),c=s.value;ka(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(i,s,Z()),va(n,t),n}function va(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(i.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),ka(i))}function ka(t){let e=t.options[0];e&&(e.selected=!0)}function Bn(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function $a(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let o=t.querySelector(".nc-fader"),r=o?yo(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),So(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let c=e.valueText??qe(e.value);s.textContent!==c&&(s.textContent=c),s.setAttribute("aria-label",`${e.label} level ${c}`);let d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(let c of t.querySelectorAll("[data-nc-ms]")){let d=c.getAttribute("data-nc-ms"),u=d==="mute"?e.mute===!0:e.solo===!0;c.setAttribute("aria-pressed",u?"true":"false"),c.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let c=e.hacksLabel??"Hacks";l.textContent!==c&&(l.textContent=c),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${c}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function sr(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let o=document.createElement("div");o.className="nc-ui-fx-hd";let r=ra({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(r.el);l?.type==="fx"&&l.onToggle?.(s)}});r.el.dataset.ncFxSwitch="",o.append(i,r.el),n.append(o)}for(let o of t.controls)n.append(ft(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let r=document.createElement("summary");r.textContent=t.moreLabel??"More",o.append(r);for(let s of t.more)o.append(ft(s,e));n.append(o)}return n.append(Z()),xa(n,t),n}function xa(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function _t(t){return t.replace(/["\\]/g,"\\$&")}function lr(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);i?.type==="canvas"&&ca(n,i)}Bo(t)}var gt="data-nc-help";function cr(t,e,n,i=0,o=6,r=8){let s=t.top-o-e.height,l=s>=i+r?"above":"below",c=l==="above"?s:t.bottom+o,d=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Bt=new WeakMap;function dr(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function ur({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=Bt.get(t);if(n)return n;let i=t.defaultView,o=null,r=null,s,l=()=>{clearTimeout(s),r=null,o&&(o.hidden=!0)},c=f=>{let b=f.getAttribute(gt);if(!b)return;o||(o=t.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",t.body.appendChild(o)),o.textContent=b,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let g=f.getBoundingClientRect(),y=cr(g,{width:o.offsetWidth,height:o.offsetHeight},i.innerWidth,dr(t));o.style.top=`${y.top}px`,o.style.left=`${y.left}px`,o.dataset.side=y.side,o.style.visibility=""},d=f=>{if(f.pointerType==="touch")return;let b=f.target&&f.target.closest?f.target.closest(`[${gt}]`):null;b!==r&&(l(),b&&(r=b,s=setTimeout(()=>{r===b&&b.isConnected&&c(b)},e)))},u=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",d),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",u),i.addEventListener("scroll",l,!0),i.addEventListener("blur",l);let h={hide:l,uninstall(){l(),t.removeEventListener("pointerover",d),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",u),i.removeEventListener("scroll",l,!0),i.removeEventListener("blur",l),o?.remove(),o=null,Bt.delete(t)}};return Bt.set(t,h),h}var en="netcomposer.rhythm.hidden.v1",ce=new WeakMap;function Wt(){try{return globalThis.localStorage??null}catch{return null}}function Sa(t,e=en){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Wn(t,e,n,i=en){let o=Sa(t,i);n?o.add(e):o.delete(e);try{t?.setItem(i,JSON.stringify([...o]))}catch{}}function tn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0})));return n}function pr(t,e){if(!(!t||!e))return tn(t).find(n=>n.id===e)}function hr(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${tn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(i=>i.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function mr(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(i,o),t.append(n),Aa(t,e)}function Aa(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function fr(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=ce.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return pr(n,i)}function gr(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=hr(e);if(t.dataset.ncSignature===i){for(let o of n){let r=t.querySelector(`[data-nc-section="${jn(o.id)}"]`);r&&Aa(r,o);for(let s of o.controls){let l=t.querySelector(`[data-nc-id="${jn(s.id)}"]`);l instanceof Element&&pe(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let o of n){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),mr(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let l of o.controls)s.append(ft(l,fr));t.append(r)}}function jn(t){return t.replace(/["\\]/g,"\\$&")}function br(t,e=en){ia();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Sa(Wt(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=ra({labelledBy:r.id,onChange:m=>(ce.get(n)??t).onToggle?.(m)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",o.append(r,u,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let b=document.createElement("span");b.className="nc-slim-lines",f.append(b);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,o,h,f),n.setAttribute("aria-labelledby",r.id);let y=m=>{let w=ce.get(n)??t;n.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${w.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";Wn(Wt(),(ce.get(n)??t).id,m,e),y(m),qt(n.parentElement)}),f.addEventListener("click",()=>{Wn(Wt(),(ce.get(n)??t).id,!1,e),y(!1),qt(n.parentElement)});let p={el:n,update(m){ce.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=m.title,u.textContent=m.status??"",m.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),b.textContent=m.summary??m.title,d.el.hidden=m.on===void 0,d.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),gr(h,m),y(h.hidden),p.redraw()},redraw(){let m=ce.get(n);m&&lr(n,tn(m))}};return ce.set(n,t),y(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function yr(t,e,n="adjacent"){ia(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=i;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),qt(t)}function qt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function wr(t,e,n,i){const o=Math.min(n,t.length);for(let r=Math.max(0,e);r<o;r++)if(Math.abs(t[r]??0)>=i)return r;return-1}function vr(t,e,n,i=.35){let o=0;for(let l=0;l<t.length;l++)o=Math.max(o,Math.abs(t[l]??0));if(o<.01)return null;const r=[];for(const l of e){const c=wr(t,l,l+n,o*i);c>=0&&r.push(c-l)}if(r.length*2<e.length||r.length===0)return null;r.sort((l,c)=>l-c);const s=Math.floor(r.length/2);return r.length%2?r[s]??0:((r[s-1]??0)+(r[s]??0))/2}const kr="/lucy/assets/capture-processor-DaZ9hnJi.js",La={"page:title":"LUCY records a few bars from your mic and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"Your mic or audio interface: its level, whether you hear it as you play, and timing correction.","module:takes":"Everything you have recorded or loaded, kept in this browser. The selected take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records your mic for the chosen length from the next bar line, starting the clock if it is stopped. Press again to cancel.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.",status:"What LUCY is doing now: armed and counting in, recording, playing a take, sitting out or stopped.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.",take:"Picks which take loops. Each one stays in this browser until you delete it.",delete:"Deletes the selected take from this browser for good. It asks first.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function Ma(t){return`lucy-help-${t.replace(/[^\w-]/g,"-")}`}function $r(t=document){const e=t.querySelector("[data-lucy-help]");if(e)return e;const n=t.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[i,o]of Object.entries(La)){const r=t.createElement("span");r.id=Ma(i),r.textContent=o,n.append(r)}return t.body.append(n),n}function X(t,e,...n){const i=La[t];if(!i)return;e&&e.getAttribute(gt)!==i&&e.setAttribute(gt,i);const o=Ma(t);for(const r of n)r&&r.getAttribute("aria-describedby")!==o&&r.setAttribute("aria-describedby",o)}function xr(t,e,n,i=o=>o){const o=`module:${e}`;X(o,t.querySelector(".nc-module-hd .nc-title")),X(o,t.querySelector(".nc-slim"));const r=l=>t.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=r(l.id);if(!c)return;const d=i(l.id);switch(l.type){case"slider":case"select":X(d,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":X(d,c.querySelector(".nc-label"));break;case"button":X(d,c,c);break;case"choice":X(d,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":X(d,c);break;case"fx":{X(d,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),X("hack:switch",c.querySelector("[data-nc-fx-switch]"));for(const u of[...l.controls??[],...l.more??[]])s(u);break}}};for(const l of n)s(l)}const Sr="instance",Ar=99;function At(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Sr)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Ar?n:1}function Ea(t,e){return e===1?t:`${t}#${e}`}function Lr(t,e){return e===1?t:`${t} ${e}`}let Se;function Mr(t,e=At()){if(Se!==void 0)return Se;Se=null;try{if(typeof window>"u"||window.parent===window)return Se;const n=window.parent.ncStudio;n&&n.version===1&&(Se=n.attach(t,{instance:e}))}catch{}return Se}function Er(){let t;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(t=i.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(i,o,r)=>n.request(`${i}${e}`,o,r)}:null}}function Cr(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Ue(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function bt(t,e=At()){return e>1?`${t}#${e}`:t}function Tr(t,e=At()){const n=Ue()?.owner()??null;return n===null||n==="studio"||n===bt(t,e)}const De={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1},On=new Set([1,2,4,8]);function Ir(t){const e=t&&typeof t=="object"?t:{},n=(l,c,d)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=d?l:null,i=Array.isArray(e.takes)?e.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},d=n(c.id,1,1e9),u=n(c.bars,1,8),h=n(c.bpm,20,300),f=n(c.sampleRate,8e3,192e3),b=n(c.channels,1,2),g=n(c.frames,0,1e9);return d===null||u===null||!On.has(u)||h===null||f===null||b===null||g===null?[]:c.saved!==!0?[]:[{id:d,bars:u,bpm:h,sampleRate:f,channels:b,frames:g,created:String(c.created??""),saved:!0}]}):[],o=n(e.bars,1,8),r=n(e.selected,1,1e9),s=Math.max(n(e.nextId,1,1e9)??1,...i.map(l=>l.id+1));return{bars:o!==null&&On.has(o)?o:De.bars,monitor:typeof e.monitor=="boolean"?e.monitor:De.monitor,roundTripMs:n(e.roundTripMs,0,1e3),nudgeMs:n(e.nudgeMs,-10,10)??0,takes:i,selected:r!==null&&i.some(l=>l.id===r)?r:i.at(-1)?.id??null,nextId:s,master:n(e.master,0,1)??De.master,...e.fx&&typeof e.fx=="object"?{fx:e.fx}:{}}}function Nr(t,e=Ca()){try{const n=e?.getItem(t);return n?Ir(JSON.parse(n)):{...De,takes:[]}}catch{return{...De,takes:[]}}}function zr(t,e,n=Ca()){try{n?.setItem(t,JSON.stringify(e))}catch{}}function Ca(){try{return globalThis.localStorage??null}catch{return null}}function jt(t,e){return`${t}-take-${e}.f32`}class Rr{constructor(e){this.prefix=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(e,n){this.memory.set(e,n);const i=await this.folder();if(!i)return!1;try{const r=await(await i.getFileHandle(jt(this.prefix,e),{create:!0})).createWritable?.();if(!r)return!1;for(const s of n)await r.write(s);return await r.close(),!0}catch{return!1}}async load(e){const n=this.memory.get(e.id);if(n)return n;const i=await this.folder();if(!i)return null;try{const o=await(await i.getFileHandle(jt(this.prefix,e.id))).getFile(),r=new Float32Array(await o.arrayBuffer()),s=Array.from({length:e.channels},(l,c)=>r.slice(c*e.frames,(c+1)*e.frames));return this.memory.set(e.id,s),s}catch{return null}}async remove(e){this.memory.delete(e);const n=await this.folder();try{await n?.removeEntry(jt(this.prefix,e))}catch{}}}function Br(t,e){const n=t[0]?.length??0,i=t.length,o=n*i*4,r=new DataView(new ArrayBuffer(44+o)),s=(c,d)=>{for(let u=0;u<d.length;u++)r.setUint8(c+u,d.charCodeAt(u))};s(0,"RIFF"),r.setUint32(4,36+o,!0),s(8,"WAVE"),s(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,3,!0),r.setUint16(22,i,!0),r.setUint32(24,e,!0),r.setUint32(28,e*i*4,!0),r.setUint16(32,i*4,!0),r.setUint16(34,32,!0),s(36,"data"),r.setUint32(40,o,!0);let l=44;for(let c=0;c<n;c++)for(let d=0;d<i;d++)r.setFloat32(l,t[d]?.[c]??0,!0),l+=4;return new Uint8Array(r.buffer)}const Te=4,ct=[1,2,4,8];function Ta(t){return Math.ceil(t/Te-1e-6)*Te+0}function Wr(t,e,n=0){let i=Ta(t);return i-t<n&&(i+=Te),{startBeat:i,endBeat:i+e*Te}}function jr(t,e,n,i){const o=Math.round((t+n)*i);return{startFrame:o,endFrame:o+Math.round((e-t)*i)}}function Or(t,e,n=0){let i=Ta(t);i-t<n&&(i+=Te);const o=e*Te,r=(i%o+o)%o;return{startBeat:i,offsetBeats:r}}function yt(t){return 60/t}function Pr(t,e,n){const i=r=>Math.round(r*4*yt(n)*e),o=ct.find(r=>i(r)>=t)??ct[ct.length-1];return{bars:o,frames:i(o),trimmed:t>i(o)}}const Gr="LUCY Audio",Ve="lucy",V=At(),Ia=Ea("lucy.state",V),Na=.15,S=Nr(Ia),Re=new Rr(Ea("lucy",V)),K=()=>zr(Ia,S);let _=!1,N={kind:"idle"},Me=!1,O="",wt=0,dt=0;const Q=new qa({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let E=null,ut=null;const Hr=new oi({...Er(),app:Lr(Gr,V),version:"0.1.0",clock:Q,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=E?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),Ke=t=>t+(ut?.offset??0),F=()=>Q.transport,Je=()=>F().isPlayingAt(U()),Ut=()=>Je()&&!_,q=Mr(Ve,V);let de=null,Y=null,he=null,H=null,vt=null,fe=null,Lt=1,za=!1,Pn=null;function Ie(){return Pn??=(async()=>{q?(E=q.ctx,de=q.output,ut=q.mapper??new dn(q.ctx)):(E=new AudioContext({latencyHint:"interactive"}),de=E.destination,ut=new dn(E)),ut.start();try{await E.audioWorklet.addModule(kr)}catch{return O="Audio could not start (the recorder's worklet did not load). Reload to try again.",R(),!1}Y=new AudioWorkletNode(E,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),Y.port.onmessage=e=>Fr(e.data);const t=new GainNode(E,{gain:0});return Y.connect(t).connect(de),H=Gi(E,{moduleUrl:Cr()??Zi,bpm:F().bpm,slots:He.length,state:is(S.fx)}),vt=new GainNode(E,{gain:S.master}),H.output.connect(vt).connect(de),Fi(H,Q,{toAudioTime:Ke,now:U}),H.onChange(()=>{S.fx=H?.getState(),K()}),he=new GainNode(E,{gain:0}),he.connect(H.input),Ne(S.monitor),!0})(),Pn}async function nn(){if(fe)return!0;if(!await Ie()||!E||!Y||!he)return!1;E.state!=="running"&&await E.resume().catch(()=>{});try{const t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}}}),n=t.getAudioTracks()[0]?.getSettings()??{};return Lt=Math.max(1,Math.min(2,n.channelCount??1)),za=!!(n.echoCancellation||n.noiseSuppression||n.autoGainControl),fe=E.createMediaStreamSource(t),fe.connect(Y),fe.connect(he),O="",R(),!0}catch{return O="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",R(),!1}}function Ne(t){S.monitor=t,K(),he&&E&&he.gain.setTargetAtTime(t&&!Me?1:0,E.currentTime,.01),dt=0,R()}let ne=null,Xe=null;function Fr(t){if(t.type==="level"&&typeof t.peak=="number"){wt=t.peak;const e=performance.now();S.monitor&&fe&&wt>.97?(dt||=e,e-dt>1500&&(Ne(!1),O="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):dt=0,ss();return}if(t.type==="chunk"&&t.id!==void 0&&t.channels){(!ne||ne.id!==t.id)&&(ne={id:t.id,parts:[]}),ne.parts.push(t.channels);return}if(t.type==="done"&&t.id!==void 0){const e=ne?.id===t.id?ne.parts:[];ne=null;const n=Zr(e);if(Xe&&t.id===Ra){Xe(n),Xe=null;return}Xr(t.id,n)}}function Zr(t){const e=t[0]?.length??0,n=t.reduce((i,o)=>i+(o[0]?.length??0),0);return Array.from({length:e},(i,o)=>{const r=new Float32Array(n);let s=0;for(const l of t){const c=l[o];c&&(r.set(c,s),s+=c.length)}return r})}function an(){const t=S.nudgeMs/1e3;if(S.roundTripMs!==null)return S.roundTripMs/1e3+t;const e=E;return(e?.baseLatency??0)+(e?.outputLatency??0)+.01+t}async function Yr(t,e){const n=performance.now()+e;for(;!t();){if(performance.now()>n)return!1;await new Promise(i=>setTimeout(i,20))}return!0}async function Dr(){if(N.kind!=="idle"){Y?.port.postMessage({type:"cancel"}),N={kind:"idle"},ne=null,R();return}if(!await nn()||!E||!Y)return;if(F().running||(q&&Ue()?.claim(bt(Ve,V)),Q.play({at:U()})),_=!1,!await Yr(()=>F().running,2e3)){O="The clock did not start.",R();return}const t=F(),e=Na/yt(t.bpm),{startBeat:n,endBeat:i}=Wr(Math.max(0,t.beatAt(U())),S.bars,e),o=Ke(t.timeAt(n)),r=Ke(t.timeAt(i)),{startFrame:s,endFrame:l}=jr(o,r,an(),E.sampleRate),c=S.nextId++;K(),Y.port.postMessage({type:"record",id:c,startFrame:s,endFrame:l,channels:Lt}),N={kind:"armed",id:c,startBeat:n,endBeat:i},O="",R()}async function Xr(t,e){if(N.kind==="idle"||N.id!==t||!E)return;N={kind:"idle"};const n=e[0]?.length??0;if(n===0){O="Nothing was recorded.",R();return}const i={id:t,bars:S.bars,bpm:F().bpm,sampleRate:E.sampleRate,channels:e.length,frames:n,created:new Date().toISOString(),saved:!1};i.saved=await Re.save(t,e),i.saved||(O="This take is kept until you reload: this browser has no file storage here."),S.takes.push(i),S.selected=t,K(),await ze(t)}let ae=null,_e=null;async function ze(t){S.selected=t,K();const e=S.takes.find(i=>i.id===t);if(!e||!E){ae=null,Qe(!0),R();return}const n=await Re.load(e);if(!n)O=`Take ${e.id} could not be read.`,ae=null;else{const i=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});n.forEach((o,r)=>i.copyToChannel(o,r)),ae={id:e.id,audio:i}}Qe(!0),R()}function Vt(t){if(_e){try{_e.node.stop(t??0)}catch{}_e=null}}function Qe(t=!1){const e=S.takes.find(d=>d.id===ae?.id);if(!E||!de||!ae||!e||!Ut()){Vt();return}const n=F(),i=JSON.stringify([ae.id,n.startTime,n.bpm,e.bars]);if(!t&&_e?.stamp===i)return;const o=Na/yt(n.bpm),{startBeat:r,offsetBeats:s}=Or(Math.max(0,n.beatAt(U())),e.bars,o),l=Ke(n.timeAt(r));Vt(l);const c=new AudioBufferSourceNode(E,{buffer:ae.audio,loop:!0});c.playbackRate.value=n.bpm/e.bpm,c.connect(H?.input??de),c.start(Math.max(l,E.currentTime),s*yt(e.bpm)),_e={node:c,stamp:i}}const Ra=0;async function _r(){if(Me||N.kind!=="idle"||!await nn()||!E||!Y||!de)return;Me=!0,Ne(S.monitor),O="Calibrating: speakers on, keep quiet for two seconds…",R();const t=E.sampleRate,e=E.currentTime+.3,n=[0,.5,1,1.5].map(d=>e+d),i=Math.round((e-.05)*t),o=Math.round((e+2.2)*t),r=new Promise(d=>{Xe=d,setTimeout(()=>d(null),4e3)});Y.port.postMessage({type:"record",id:Ra,startFrame:i,endFrame:o,channels:1});for(const d of n){const u=new OscillatorNode(E,{frequency:2e3}),h=new GainNode(E,{gain:0});h.gain.setValueAtTime(.8,d),h.gain.setValueAtTime(0,d+.004),u.connect(h).connect(de),u.start(d),u.stop(d+.01)}const s=await r;Xe=null,Me=!1;const l=s?.[0],c=l?vr(l,n.map(d=>Math.round(d*t)-i),Math.round(.4*t)):null;c===null?O="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(S.roundTripMs=Math.round(c/t*1e4)/10,O=`Round trip ${S.roundTripMs} ms: takes are shifted by it.`,K()),Ne(S.monitor)}async function qr(){if(await Ie(),E&&E.state!=="running"&&await E.resume().catch(()=>{}),q&&Je()){if(!_&&Ue()?.owner()===bt(Ve,V)){Q.stop({at:U()});return}_=!_,Qe(!0),R();return}Je()?Q.stop({at:U()}):(_=!1,q&&Ue()?.claim(bt(Ve,V)),Q.play({at:U()}))}let Gn=F().running;Q.onChange(()=>{F().running&&!Gn&&q&&(_=!Tr(Ve,V)),Gn=F().running,F().running||(_=!1,N.kind!=="idle"&&(Y?.port.postMessage({type:"cancel"}),N={kind:"idle"})),Qe(),R()});Ue()?.onAll(()=>{_&&(_=!1,Qe(!0),R())});async function Ur(){const t=S.takes.find(o=>o.id===S.selected);if(!t){O="No take to save yet: record one, or Load an audio file.",R();return}const e=await Re.load(t);if(!e)return;const n=new Blob([Br(e,t.sampleRate)],{type:"audio/wav"}),i=document.createElement("a");i.href=URL.createObjectURL(n),i.download=`lucy${V>1?`-${V}`:""}-take-${t.id}-${Math.round(t.bpm)}bpm-${t.created.slice(0,10)}.wav`,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(i.href),1e4)}async function Vr(t){if(!await Ie()||!E)return;let e;try{e=await E.decodeAudioData(await t.arrayBuffer())}catch{O=`Couldn't read ${t.name}: not an audio file this browser can decode.`,R();return}const n=F().bpm,i=Pr(e.length,e.sampleRate,n),o=[];for(let l=0;l<Math.min(2,e.numberOfChannels);l++){const c=new Float32Array(i.frames);c.set(e.getChannelData(l).subarray(0,i.frames)),o.push(c)}const r=S.nextId++,s={id:r,bars:i.bars,bpm:n,sampleRate:e.sampleRate,channels:o.length,frames:i.frames,created:new Date().toISOString(),saved:!1};s.saved=await Re.save(r,o),O=`${t.name} is take ${r}: ${i.bars} bar${i.bars===1?"":"s"} at ${Math.round(n)} BPM${i.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,S.takes.push(s),S.selected=r,K(),await ze(r)}function Kr(){N.kind!=="idle"&&(Y?.port.postMessage({type:"cancel"}),N={kind:"idle"},ne=null),Je()&&(q?_=!0:Q.stop({at:U()})),Vt(),H?.clear({fadeMs:20}),Ne(!1)}function Jr(t){S.master=Math.min(1,Math.max(0,t)),K(),vt&&E&&vt.gain.setTargetAtTime(S.master,E.currentTime,.01),et.value=String(S.master),on.textContent=`${Math.round(S.master*100)}%`}async function Qr(){const t=S.selected;t===null||!await go({title:`Delete take ${t}?`,body:"It is gone from this browser for good.",confirmLabel:"Delete"})||(await Re.remove(t),S.takes=S.takes.filter(n=>n.id!==t),K(),await ze(S.takes.at(-1)?.id??null))}const j=(t,e={},...n)=>{const i=document.createElement(t);for(const[o,r]of Object.entries(e))i.setAttribute(o,r);return i.append(...n),i},Ba=document.getElementById("app");Ba.classList.add("nc","nc-page");ur();$r();const Mt=j("header",{class:"nc-page-hd"},j("div",{},j("h1",{class:"nc-page-title"},j("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",j("span",{class:"nc-page-sep"},"/")," AUDIO ",j("span",{class:"nc-page-sep"},"/")," ",j("span",{class:"nc-mono"},String(V).padStart(2,"0"))),j("p",{class:"nc-page-sub"},"A NetComposer element."))),et=j("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(S.master),"data-nc-id":"lucy-master"});et.addEventListener("input",()=>Jr(Number(et.value)));const on=j("span",{class:"nc-readout","data-nc-readout":""});on.textContent=`${Math.round(S.master*100)}%`;const Ee=j("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});Ee.hidden=!0;Ee.addEventListener("change",()=>{const t=Ee.files?.[0];Ee.value="",t&&Vr(t)});const Ot=(t,e)=>{const n=j("button",{type:"button",class:"nc-page-action","data-lucy-action":t.toLowerCase()},t);return n.addEventListener("click",e),X(`action:${t.toLowerCase()}`,n,n),n};Mt.append(j("div",{class:"nc-page-actions"},j("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},j("label",{class:"nc-label",for:"lucy-master"},"Master"),et,on),Ot("Save",()=>void Ur()),Ot("Load",()=>Ee.click()),Ot("Panic",Kr),Ee));X("page:title",Mt.querySelector(".nc-page-title"));X("master",Mt.querySelector('label[for="lucy-master"]'),et);const Wa=j("div",{class:"nc-stack","data-nc-layout":"adjacent"});Ba.append(Mt,j("main",{class:"nc-page-body"},Wa));function ja(){const t=F();if(N.kind!=="idle"){const e=t.beatAt(U());if(e<N.startBeat){const i=Math.ceil((N.startBeat-e)/4);return`Armed: recording in ${i} bar${i===1?"":"s"}`}const n=Math.floor((e-N.startBeat)/4)+1;return`Recording bar ${Math.min(n,S.bars)} of ${S.bars}`}return Je()?_?"Sitting out":ae?`Playing take ${ae.id}`:"Playing (no take yet)":S.takes.length?"Stopped":"Arm to record a take"}function es(){const t=N.kind!=="idle";return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:Ut()?"Stop":"Play",on:Ut(),onPress:()=>void qr()},{type:"button",id:"arm",label:N.kind==="armed"?"Armed":N.kind==="recording"?"Recording":"Record",on:t,ariaLabel:t?"Cancel the take":"Record a take from the next bar",onPress:()=>void Dr()},{type:"choice",id:"bars",label:"Length (bars)",value:String(S.bars),options:ct.map(e=>({value:String(e),label:`${e} bar${e===1?"":"s"}`})),onChange:e=>{S.bars=Number(e),K(),R()}},{type:"readout",id:"status",label:"Status",value:ja()}]}}function ts(){return{id:"input",title:"Input",controls:[fe?{type:"readout",id:"source",label:"Input",value:`${Lt===2?"Stereo":"Mono"} · ${Math.round((E?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void nn()},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,wt)},{type:"choice",id:"monitor",label:"Monitor",value:S.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:t=>Ne(t==="on")},...za?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...O?[{type:"note",id:"notice",text:O}]:[],{type:"label",id:"timing-label",text:"Timing"},...rs().controls??[]]}}function ns(){return{id:"takes",title:"Takes",controls:S.takes.length?[{type:"choice",id:"take",label:"Take",value:String(S.selected??""),options:S.takes.map(t=>({value:String(t.id),label:`Take ${t.id}`})),onChange:t=>void ze(Number(t))},{type:"button",id:"delete",label:"Delete",on:!1,onPress:()=>void Qr()}]:[{type:"note",id:"none",text:"No takes yet."}]}}const He=["eq","compressor"],as={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function is(t){if(t!==void 0){const n=Ye(t,He.length);if(n.chain.length===He.length&&n.chain.every((i,o)=>i.type===He[o]))return n}return{v:2,chain:He.flatMap(n=>{const i=Qt(n);return i?[{...i,bypass:!0,dials:{...i.dials,...as[n]}}]:[]})}}const rn=new Map;function Hn(t,e,n){const i=Number(H?.getParam(e,n.key)??n.default),o=`hacks-${e}-${n.key}`;rn.set(o,`hack:${t}:${n.key}`);const r=s=>{H?.setParam(e,n.key,s),R()};return n.options?{type:"select",id:o,label:n.label,value:String(i),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>r(Number(s))}:{type:"slider",id:o,label:n.label,min:n.min,max:n.max,step:n.step??.001,value:i,valueText:Vn(n,i,F().bpm),onChange:r}}function Fn(t,e){const n=H?.getChain().find(r=>r.type===t)?.id??t,i=oe(t),o=i?.dials??[];return rn.set(`hacks-${t}`,`hack:${t}`),{type:"fx",id:`hacks-${t}`,title:i?.label??t,depth:e,on:H?H.getParam(n,"bypass")===!1:!1,onToggle:r=>{H?.setParam(n,"bypass",!r),R()},controls:o.filter(r=>!r.more).map(r=>Hn(t,n,r)),more:o.filter(r=>r.more).map(r=>Hn(t,n,r))}}function os(){return{id:"hacks",title:"Hacks",controls:[Fn("eq",1),Fn("compressor",2)]}}function rs(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:S.roundTripMs===null?`${Math.round(an()*1e3)} ms (estimate)`:`${S.roundTripMs} ms`},{type:"button",id:"calibrate",label:Me?"Listening…":"Calibrate",on:Me,onPress:()=>void _r()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:S.nudgeMs,valueText:`${S.nudgeMs>0?"+":""}${S.nudgeMs} ms`,onChange:t=>{S.nudgeMs=t,K(),R()}}]}}function Oa(t,e){t.update(e);const n=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)];xr(t.el,e.id,n,i=>rn.get(i)??i)}const sn=[es,ts,ns,os].map(t=>({def:t,handle:br(t())}));yr(Wa,sn.map(t=>t.handle),"adjacent");R();function R(){for(const t of sn)Oa(t.handle,t.def())}function ss(){const t=sn[1];t&&Oa(t.handle,t.def())}let Zn="";function Pa(){if(N.kind!=="idle"){const e=F();N.kind==="armed"&&e.beatAt(U())>=N.startBeat&&(N={...N,kind:"recording"})}const t=ja();t!==Zn&&(Zn=t,R()),requestAnimationFrame(Pa)}requestAnimationFrame(Pa);Hr.start();if(q)Ie().then(()=>ze(S.selected));else{const t=()=>{Ie().then(()=>ze(S.selected))};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__lucy={state:S,clock:Q,get ctx(){return E},get phase(){return N},get level(){return wt},get fx(){return H},roundTrip:an,toContext:Ke,takeAudio:t=>{const e=S.takes.find(n=>n.id===t);return e?Re.load(e):null},async testInput(t,e=1){if(!await Ie()||!E||!Y||!he)return;const n=t(E);n.connect(Y),n.connect(he),fe=n,Lt=e,R()}};
