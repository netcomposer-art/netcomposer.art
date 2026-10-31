(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const $e=1e-9;function ki(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class on{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return ki(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,c)=>s.beat-c.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+$e&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+$e)continue;const c=this.clamp(s.bpm);c!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+$e){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-$e;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let c=1;c<=s;c++)this.setTempoAt(o+(e-o)*c/s,n+i*(c-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new on({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+$e)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+$e)return n[i];return n[0]}}const xi=Object.freeze({beatsPerBar:4,beatUnit:4}),Me=1e-9;function Si(t){return Math.floor(t+Me)}function ca(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Me)*e;return n&&r<=t+Me?r+e:r}class Ai{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new on({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??xi}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Me&&(this.stopTime===null||e<this.stopTime-Me)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Me?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Si(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return ca(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const da="nc-clock/snapshot",ua=1;function Li(t,e="local"){return{format:da,version:ua,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ei(t,e){const n=Mi(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const K=t=>typeof t=="number"&&Number.isFinite(t),xn=t=>t===null||K(t);function Mi(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==da&&n("format"),(!K(e.version)||Math.floor(e.version)!==ua)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!K(e.anchor.beat)||!K(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&K(i.beat)&&K(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!K(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!K(e.meter.beatUnit))&&n("meter"),(!xn(e.startTime)||!xn(e.stopTime)||!K(e.stoppedBeat))&&n("transport times"),e}class Ti{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ai(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ei(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Li(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Ci="nc-sync/1",Ni=1,Ii="nc-sync",Ri="nc-sync-leader",zi=0,pa=.5,ha=.75;function Oi(t){return typeof t=="number"&&Number.isFinite(t)&&t>=pa&&t<=ha?t:null}const Ct=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Oe=t=>typeof t=="number"&&Number.isFinite(t),nt=t=>typeof t=="string"&&t.length>0;function Bi(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Ni||!nt(e.type)||!nt(e.from)||!Oe(e.term)||!Oe(e.seq)||!Oe(e.sentAt))return null;switch(e.type){case"hello":return nt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Oe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Oe(e.slot)?e:null;case"ping":case"pong":return nt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ji(t,e,n,i,r){return{proto:Ci,from:e,term:n,seq:i,sentAt:r,...t}}function Be(){return(performance.timeOrigin+performance.now())/1e3}const Nt=.003,Pi=3,Wi=.01,Sn=500;class Fi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Wi:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Nt&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,c=Math.abs(r-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&c<=this.stepThreshold&&c<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const c=this.offsets,d=this.preStep;c.length=0;for(let l=0;l<d.length;l++)c.push(d[l]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const l=this.offsets,u=this.preStep;u.length=0;for(let m=0;m<l.length;m++)u.push(l[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,d=e-n;for(let l=0;l<c.length;l++)c[l]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const c of[...this.stepListeners])c(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let c=o-1;for(;c>=0&&n[c]>s;)n[c+1]=n[c],c--;n[c+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Nt&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Sn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Nt)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Sn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Pi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class Gi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Ct,...e.capabilities},this.channelOption=e.channel??Ii,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,c=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(c+this.o.minLeadSeconds),l=Math.max(n??ca(d,1),d);i&&i>0?(s.tempo.rampTempo(e,l,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,l),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(ha,Math.max(pa,e)):zi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Oi(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Bi(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ct,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ct},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Ri,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,c)=>[o?0:1,s,c];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ji(e,this.id,this.term,++this.seq,this.o.now()))}}const Hi="modulepreload",_i=function(t){return"/studio/"+t},An={},Di=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");r=s(n.map(l=>{if(l=_i(l),l in An)return;An[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Hi,u||(f.as="script"),f.crossOrigin="",f.href=l,d&&f.setAttribute("nonce",d),document.head.appendChild(f),u)return new Promise((y,g)=>{f.addEventListener("load",y),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};var Yi=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],_t=[.25,.5,.75,1,1.5,2],Zi=4.9,j={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},de={fmt:"wet"},X={fmt:"pct"},ke={fmt:"db"},at={fmt:"signedPct"},It={fmt:"num",suffix:" ms"},B={div:100};function M(t,e,n,i,r,o,s,c){var d={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(c)for(var l in c)d[l]=c[l];return d}function it(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var _e=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:j.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:j.hpHz,astrid:!0,zero:"off"}),M("q","Resonance",0,100,0,2,{fmt:"q",law:j.hpQ},{dsp:{law:j.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[M("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:j.bpHz,astrid:!0},{dsp:{law:j.bpHz}}),M("q","Q",0,100,0,2,{fmt:"q",law:j.bpQ},{dsp:{law:j.bpQ}}),M("mix","Mix",0,100,100,3,de,{dsp:B,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[M("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:it(Yi),overriddenBy:"beats_free",tempoSynced:!0}),M("feedback","Feedback",0,90,35,2,X,{dsp:B,unit:"%"}),M("mix","Wet/dry",0,100,0,3,de,{dsp:B,unit:"%",astridKey:"wet"}),M("tone","Tone",0,100,100,4,{fmt:"hz",law:j.delayTone,offAt:100},{dsp:{div:99},more:!0}),M("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:it([[0,"Insert"],[1,"Send"]]),more:!0}),M("send","Send",0,100,100,7,X,{dsp:B,unit:"%",more:!0}),M("mod_send","Accent → send",-100,100,0,8,at,{dsp:B,unit:"%",more:!0}),M("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[M("predelay","Pre-delay",0,200,0,1,It,{dsp:{div:1e3},unit:"ms"}),M("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:B,unit:"%"}),M("decay","Decay",0,100,50,3,X,{dsp:B,unit:"%"}),M("damping","Damping",0,100,0,4,X,{dsp:B,unit:"%"}),M("mix","Mix",0,100,0,5,de,{dsp:B,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[M("rate","Rate",0,100,26,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:B,unit:"%"}),M("feedback","Feedback",-90,90,50,3,at,{dsp:B,unit:"%"}),M("mix","Mix",0,100,50,4,de,{dsp:B,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[M("rate","Rate",0,100,52,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),M("depth","Depth",0,100,50,2,X,{dsp:B,unit:"%"}),M("spread","Spread",0,100,70,3,X,{dsp:B,unit:"%"}),M("mix","Mix",0,100,40,4,de,{dsp:B,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[M("rate","Rate",0,100,39,1,{fmt:"rate",law:j.rate},{dsp:{law:j.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:B,unit:"%"}),M("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:it([[4,"4"],[6,"6"],[8,"8"]])}),M("feedback","Feedback",0,90,30,4,X,{dsp:B,unit:"%"}),M("mix","Mix",0,100,50,5,de,{dsp:B,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[M("low_db","Low",-18,18,0,1,ke,{unit:"dB"}),M("mid_db","Mid",-18,18,0,2,ke,{unit:"dB"}),M("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:j.midHz,astrid:!0},{dsp:{law:j.midHz}}),M("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:j.eqQ},{dsp:{law:j.eqQ}}),M("high_db","High",-18,18,0,4,ke,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[M("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),M("output_db","Output",-12,12,0,2,ke,{unit:"dB"}),M("mix","Mix",0,100,100,3,de,{dsp:B,unit:"%"}),M("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:it([[0,"Smooth"],[1,"Acid"]]),more:!0}),M("tone","Tone",0,100,100,5,{fmt:"hz",law:j.driveTone,offAt:100},{dsp:{div:99},more:!0}),M("mod_drive","Accent → drive",-100,100,0,6,at,{dsp:B,unit:"%",more:!0}),M("mod_tone","Accent → tone",-100,100,0,7,at,{dsp:B,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[M("threshold_db","Threshold",-60,0,0,1,ke,{unit:"dB"}),M("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:j.ratio},{dsp:{law:j.ratio}}),M("attack_ms","Attack",1,100,10,3,It,{unit:"ms"}),M("release_ms","Release",10,1e3,150,4,It,{unit:"ms"}),M("makeup_db","Makeup",0,24,0,5,ke,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[M("width","Width",0,200,100,1,X,{dsp:B,unit:"%"}),M("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:B})]}],Xi=_e.map(function(t){return t.type}),Ui=_e.filter(function(t){return!t.hidden}).map(function(t){return t.type}),Vi={reverb:"plate"};function sn(t){var e=Vi[t]||t;return Xi.indexOf(e)>=0?e:null}function V(t){for(var e=sn(t),n=0;n<_e.length;n++)if(_e[n].type===e)return _e[n];return null}function Le(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function ma(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=Le(n.law,e);return i===null?0:i}function Ln(t,e){return Math.min(Zi,t*60/(e>0?e:120))}var En=function(t){return t>0?"+":t<0?"−":""};function qi(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function fa(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:En(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return En(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=Le(i.law,e),r===null?i.zero||"open":i.astrid?qi(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+Le(i.law,e).toFixed(1);case"ratio":return Le(i.law,e).toFixed(1)+":1";case"rate":return r=Le(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Ln(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Ln(e,n)*1e3)+" ms"}return String(e)}var Ki=1,xt=["drive","delay","plate"];function Ji(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return fa(t,i,r)},e}var Te=xt.map(function(t){var e=V(t),n={type:t,label:e.label,dials:e.dials.map(Ji)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Qi={reverb:"plate"};function ht(t){var e=Qi[t]||t;return xt.indexOf(e)>=0?e:null}function St(t){for(var e=ht(t),n=0;n<Te.length;n++)if(Te[n].type===e)return Te[n];return null}function ga(t,e){var n=St(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Ne(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function oe(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function er(){return{v:Ki,chain:Te.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function tr(t){return _t.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},_t[0])}function Rt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function nr(t){for(var e=Array.isArray(t)?t:Rt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=er(),r={},o=[],s=0;s<e.length;s++){var c=e[s];if(Rt(c)){var d=ht(c.type);if(!d){typeof c.type=="string"&&o.push(c.type);continue}if(r[d]){o.push(d);continue}r[d]=!0;var l=i.chain[xt.indexOf(d)],u=Rt(c.dials)?c.dials:{};d==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),l.bypass=n?c.bypass===!0:c.bypass!==!1,St(d).dials.forEach(function(m){l.dials[m.key]=oe(m,u[m.key])}),ar(d,l.dials,u)}}return{state:i,dropped:o}}function ar(t,e,n){for(var i=St(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=oe(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Ne(o,e)))}}function mt(t){return nr(t).state}function ir(t){return JSON.parse(JSON.stringify(t))}var rr=24,Dt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Yt(t,e,n){if(e==="bypass")return n?0:1;var i=ga(t,e)||or(t,e);return i?ma(i,n):0}function or(t,e){var n=V(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var sr={};Te.forEach(function(t){t.dials.forEach(function(e){sr[t.type+"."+e.key]=e.format})});function zt(t,e){var n=new Float64Array(rr),i=mt(t);return i.chain.forEach(function(r){var o=Dt[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Yt(r.type,s,r.dials[s])})}),n}var lr=2,ft=3,cr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function je(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ba(t,e){var n=V(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function dr(t){var e=V(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function ur(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function pr(t){return typeof t=="number"&&isFinite(t)?tr(t):t}function Mn(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=pr(o)),i[r.key]=oe(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=oe(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],Ne(r,i)))}),i}function hr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=Le(n.law,o),c=s===null?1/0:Math.abs(s-e);c<r&&(r=c,i=o)}return i}}var mr={rate:"rate_hz"};function fr(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||mr[o.key]||o.key;r[o.key]=hr(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function gr(t,e){var n=e>0?Math.floor(e):ft,i=[],r=[],o=[],s=!1,c=!1;Array.isArray(t)?(o=t,c=!0):je(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,c=t.schema===2);for(var d=[],l=0;l<o.length;l++){var u=o[l];if(je(u)&&!(u.type==="limiter"||u.fixed===!0)){var m=sn(u.type),f=m&&V(m);if(!f||s&&["drive","delay","plate"].indexOf(m)<0){typeof u.type=="string"&&i.push(u.type);continue}if(d.length>=n){i.push(u.id||m);continue}var y;je(u.params)&&!je(u.dials)?y=Mn(f,fr(f,u.params,r,u.id||m),c):y=Mn(f,je(u.dials)?u.dials:{},c);var g=ba(m,d),b=typeof u.id=="string"&&cr.test(u.id)&&!d.some(function(h){return h.id===u.id})?u.id:g.id,p=s?u.bypass!==!1:u.bypass===!0;d.push({id:s?g.id:b,type:m,bypass:p,dials:y})}}return{state:{v:lr,chain:d},dropped:i,notes:r}}function lt(t,e){return gr(t,e).state}function xe(t){var e=V(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,ma(i,t.dials[i.key])])}),n}function br(t){var e=lt(t,8),n=[],i=e.chain.map(function(r,o){var s=V(r.type),c={};return o>=ft&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(d){var l=r.dials[d.key];if(d.more){l!==d.default&&n.push(r.id+"."+d.key);return}d.key==="delay_beats"&&_t.indexOf(l)<0&&n.push(r.id+".delay_beats"),c[d.astridKey||d.key]=l}),{id:r.id,type:r.type,bypass:r.bypass,dials:c}});return{hacks:i,lossy:n}}var yr="nc-fx@1",wr=600,vr=256,$r=8,Pe=typeof WeakMap=="function"?new WeakMap:null;function kr(t,e){var n=Pe&&Pe.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Di(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Pe&&(Pe.set(t,n),n.catch(function(){Pe.delete(t)})),n)}function Se(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ya(t,e,n,i){var r=Math.min(400,Math.max(20,Se(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",c=e.bypassMode==="hold"?"hold":"run",d=Se(e.preGain,1),l=Math.max(0,Se(e.crossfade,.012)),u=Se(e.maxDelaySeconds,void 0),m=t.createGain(),f=t.createGain(),y=t.createGain(),g=t.createGain(),b=null;e.modInput===!0&&(b=t.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),g.gain.value=0,m.connect(y),y.connect(f),g.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);p.post=function(v){p.node?p.node.port.postMessage(v):p.disposed||(o.length>=vr&&(o=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push(v))};function k(v){var x=o.map(function(w){var S=Object.assign({},w);return S.when>v||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return o=[],x}p.emit=function(v){for(var x=0;x<p.listeners.length;x++)try{p.listeners[x](v)}catch(w){typeof console<"u"&&console.error(w)}},p.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var $=!1;p.tooFar=function(v){return typeof v=="number"&&v>t.currentTime+wr?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=kr(t,e.moduleUrl).then(function(){if(!p.disposed){var v=Object.assign({bpm:r,bypassMode:c,limiter:s,preGain:d,maxDelaySeconds:u},h);v.pending=k(t.currentTime),p.node=new AudioWorkletNode(t,yr,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),m.connect(p.node),b&&b.connect(p.node,0,1),p.node.connect(g);var x=t.currentTime;x<=0||l===0?(y.gain.value=0,g.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+l),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+l)),p.status="ready"}},function(v){p.status="unavailable",o=[],p.error=v});return p.core={input:m,output:f,modInput:b,ready:E,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(v,x){var w=Se(v,NaN);!(w>0)||p.disposed||p.tooFar(x)||(p.bpm=Math.min(400,Math.max(20,w)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(x)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(p.disposed||p.tooFar(x.at))){var w=Se(x.fadeMs,0);p.post({t:"clear",when:p.whenOf(x.at),fadeMs:w>0?Math.min(1e3,w):0})}},onChange:function(v){return p.listeners.push(v),function(){var x=p.listeners.indexOf(v);x>=0&&p.listeners.splice(x,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[m,y,g,f,b].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},p}function Tn(t,e){var n=e||{};if(n.slots)return xr(t,n);var i=mt(n.state),r=Array.from(zt(i)),o=ya(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(zt(i)),when:0}]}),s=o.core;function c(d){return i.chain[xt.indexOf(d)]}return s.setParam=function(d,l,u,m){var f=ht(d);if(!(!f||o.disposed||o.tooFar(m))){var y=c(f),g;if(l==="bypass")g=!!u;else{var b=ga(f,l);if(!b)return;g=oe(b,u,Ne(b,y.dials))}return l==="bypass"?y.bypass=g:y.dials[l]=g,o.post({t:"p",i:Dt[f][l],v:Yt(f,l,g),when:o.whenOf(m)}),o.emit({effect:f,key:l,value:g}),St(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function($){return $.key===l}))){var h=y.dials[p.key],k=oe(p,h,Ne(p,y.dials));k!==h&&(y.dials[p.key]=k,o.post({t:"p",i:Dt[f][p.key],v:Yt(f,p.key,k),when:o.whenOf(m)}),o.emit({effect:f,key:p.key,value:k}))}}),g}},s.getParam=function(d,l){var u=ht(d);if(u){var m=c(u);return l==="bypass"?m.bypass:m.dials[l]}},s.getState=function(){return ir(i)},s.setState=function(d,l){o.disposed||o.tooFar(l&&l.at)||(i=mt(d),o.post({t:"load",program:Array.from(zt(i)),when:o.whenOf(l&&l.at)}),o.emit({effect:null,key:null,value:null}))},s}function xr(t,e){var n=e.slots===!0?ft:Math.max(1,Math.min($r,Math.floor(+e.slots)||ft)),i=lt(e.state,n),r=1,o={};function s(p){return o[p.id]||(o[p.id]=r++),o[p.id]}function c(p){return p.map(function(h){return{uid:s(h),type:h.type,program:xe(h)}})}var d=c(i.chain),l=i.chain.map(function(p){return o[p.id]}),u=ya(t,e,function(){return{slots:n,chain:d,order:l}},function(){return[{t:"sync",chain:c(i.chain),order:i.chain.map(function(p){return o[p.id]}),when:0}]}),m=u.core;function f(p){var h;for(h=0;h<i.chain.length;h++)if(i.chain[h].id===p)return i.chain[h];var k=sn(p);if(k){for(h=0;h<i.chain.length;h++)if(i.chain[h].type===k)return i.chain[h]}return null}function y(p,h){var k=s(p);u.post({t:"add",uid:k,type:p.type,when:h}),xe(p).forEach(function($){u.post({t:"ps",uid:k,k:$[0],v:$[1],when:h,snap:!0})})}function g(p){u.post({t:"order",uids:i.chain.map(function(h){return o[h.id]}),when:p})}function b(p,h){var k={};i.chain.forEach(function(v){k[v.id]=v});var $=i.chain.map(function(v){return o[v.id]}).join();p.chain.forEach(function(v){var x=k[v.id];if(!x||x.type!==v.type){delete o[v.id],y(v,h);return}var w={};xe(x).forEach(function(S){w[S[0]]=S[1]}),xe(v).forEach(function(S){w[S[0]]!==S[1]&&u.post({t:"ps",uid:o[v.id],k:S[0],v:S[1],when:h})})});var E={};p.chain.forEach(function(v){E[v.id]=!0}),Object.keys(o).forEach(function(v){E[v]||delete o[v]}),i=p,i.chain.map(function(v){return o[v.id]}).join()!==$&&g(h)}return m.slots=n,m.setParam=function(p,h,k,$){var E=f(p);if(!(!E||u.disposed||u.tooFar($))){var v=V(E.type),x,w=null;if(h==="bypass")x=!!k;else{for(var S=0;S<v.dials.length;S++)v.dials[S].key===h&&(w=v.dials[S]);if(!w)return;x=oe(w,k,Ne(w,E.dials))}var T={},A={};xe(E).forEach(function(L){T[L[0]]=L[1]}),v.dials.forEach(function(L){L.stepWhen&&(A[L.key]=E.dials[L.key])}),h==="bypass"?E.bypass=x:E.dials[h]=x,v.dials.forEach(function(L){L.stepWhen&&(E.dials[L.key]=oe(L,E.dials[L.key],Ne(L,E.dials)))});var I=u.whenOf($),H=o[E.id];return xe(E).forEach(function(L){(T[L[0]]!==L[1]||w&&L[0]===w.k)&&u.post({t:"ps",uid:H,k:L[0],v:L[1],when:I})}),u.emit({effect:E.id,key:h,value:x}),Object.keys(A).forEach(function(L){L!==h&&E.dials[L]!==A[L]&&u.emit({effect:E.id,key:L,value:E.dials[L]})}),x}},m.getParam=function(p,h){var k=f(p);if(k)return h==="bypass"?k.bypass:k.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(i))},m.setState=function(p,h){u.disposed||u.tooFar(h&&h.at)||(b(lt(p,n),u.whenOf(h&&h.at)),u.emit({effect:null,key:null,value:null}))},m.addEffect=function(p,h){var k=h||{},$=ba(p,i.chain);if(!(!$||i.chain.length>=n||u.disposed||u.tooFar(k.at))){if(k.dials){var E=lt({v:2,chain:[{id:$.id,type:$.type,dials:k.dials}]},1).chain[0];$.dials=E.dials}k.bypass===!0&&($.bypass=!0);var v=i.chain.slice(),x=typeof k.index=="number"?Math.max(0,Math.min(v.length,k.index)):v.length;return v.splice(x,0,$),b({v:2,chain:v},u.whenOf(k.at)),u.emit({effect:$.id,key:"chain",value:"add"}),$.id}},m.removeEffect=function(p,h){var k=f(p),$=h&&h.at;return!k||u.disposed||u.tooFar($)?!1:(b({v:2,chain:i.chain.filter(function(E){return E!==k})},u.whenOf($)),u.emit({effect:k.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(p,h,k){var $=f(p),E=k&&k.at;if(!$||u.disposed||u.tooFar(E))return!1;var v=ur(i.chain,i.chain.indexOf($),h);return v===i.chain?!1:(b({v:2,chain:v},u.whenOf(E)),u.emit({effect:$.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:dr(p),bypass:p.bypass}})},m.toAstrid=function(){return br(i)},m}function Cn(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function wa(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,c=e&&e.transport?e.transport:e,d=c&&c.tempo?c.tempo:c,l=!1;function u(f){if(!o){!l&&typeof console<"u"&&(l=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!c||typeof c.timeAt!="function"||typeof f!="number")){var y=o(c.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function m(){var f=s&&c&&typeof c.beatAt=="function"?c.beatAt(s()):NaN;if(!isFinite(f)){var y=c&&typeof c.bpm=="number"?c.bpm:Cn(d,0);y>0&&t.setTempo(y);return}var g=Cn(d,f);g>0&&t.setTempo(g);for(var b=d&&(d.points||d.tempoPoints)||[],p=0;p<b.length;p++){var h=b[p];if(h.beat>f&&h.bpm>0){var k=u(h.beat);k!==void 0&&t.setTempo(h.bpm,k)}}}return m(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,u(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&m())})}const Zt="/studio/assets/worklet-CnpUVY5i.js";var Sr="nc-ui",va={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Xt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},pe={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Fe=t=>`--${Sr}-${t}`,Ut=va["label-on-fill-dark"],Nn=va["label-on-fill-light"],Ar=pe["label-min-contrast"],Lr=/^#[0-9a-f]{6}$/i,Er=t=>typeof t=="string"&&Lr.test(t),ct=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function In(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${ct(r(0)*255)}${ct(r(8)*255)}${ct(r(4)*255)}`}function $a(t){let[e,n,i]=[1,3,5].map(l=>parseInt(t.slice(l,l+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,c=r-o;if(!c)return{h:0,s:0,l:s};let d=c/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/c%6):r===n?60*((i-e)/c+2):60*((e-n)/c+4))+360)%360,s:d,l:s}}function Rn(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Vt(t,e){let[n,i]=[Rn(t),Rn(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var gt=t=>Vt(t,Ut)>=Vt(t,Nn)?Ut:Nn;function ka(t,e,n,i=Ar){let r=In(t,e,n),o=gt(r)===Ut?1:-1;for(let s=0;s<40&&Vt(r,gt(r))<i;s++)n+=o*.01,r=In(t,e,n);return r}function Mr(t){let{h:e,s:n}=$a(t),i=ka(e,Math.min(n,pe["surprise-on-max-saturation"]),pe["surprise-on-lightness"]);return{fill:t,ink:gt(t),on:i,onInk:gt(i)}}var Tr=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Cr(t,e=Math.random){let[n,i]=pe["surprise-saturation"],[r,o]=pe["surprise-lightness"],s=pe["surprise-min-hue-gap"],c=Er(t)?$a(t).h:null,d=e()*360;return c!==null&&Tr(d,c)<s&&(d=(c+s+e()*(360-2*s))%360),ka(d,n+e()*(i-n),r+e()*(o-r))}function Nr(t){if(!t)return null;let e=Mr(t);return{[Fe("surprise-fill")]:e.fill,[Fe("surprise-ink")]:e.ink,[Fe("surprise-on")]:e.on,[Fe("surprise-on-ink")]:e.onInk}}var Ir=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Rr=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function zn(t){let[e,n,i]=[1,3,5].map(c=>Ir(parseInt(t.slice(c,c+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function zr([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>ct(Rr(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Or=pe["velocity-range"],xa={min:Xt.rhythm["velocity-min"],max:Xt.rhythm["velocity-max"]};function Br(t,e=xa){let[n,i]=Or,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=Xt.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let c=zn(e.min),d=zn(e.max);return{velocity:r,t:o,fill:zr(c.map((l,u)=>l+(d[u]-l)*o)),ink:s}}function On(t,e=xa){return{[Fe("velocity-fill")]:Br(t,e).fill}}var jr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Pr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","fader-cap-master":"color","strip-hacks-text":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Wr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Fr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},At={};for(let[t,e]of Object.entries(Pr))At[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Fr))At[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Wr))At[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(jr.renames.map(t=>[t.old,t.new]));function Sa(t){let e=At[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function G(t){return Sa(t).prop}function a(t){return`var(${G(t)})`}function Gr(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(G(e)));return Number.isFinite(n)?n:0}function Y(t,e){let n=Sa(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),c=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),c}function Hr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function _r(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var Dr="[data-modulated], [data-modulated] *";function Yr(){let t=i=>`
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
${Dr} { transition: none; }
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
`}var Ot=null,Zr="nc-ui-fallback";function Aa(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ot&&Ot.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Zr} {
${Yr()}
}
`,t.head.append(e),Ot=e}var We=null,Xr=0,Ur=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,La=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Ur,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&La(document);function ln({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:c}){if(We||c?.aborted)return Promise.resolve(!1);let d=o?.ownerDocument??document,l=La(d),u=o??d.body,m=d.defaultView??globalThis,f=`nc-ui-confirm-${++Xr}`,y=(N,D,P)=>{let we=d.createElement(N);return we.className=`nc-ui-confirm${D}`,P!=null&&(we.textContent=P),we},g=y("div","-layer");g.dataset.state="enter";let b=y("div","");b.setAttribute("role","alertdialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-labelledby",`${f}-t`),b.setAttribute("aria-describedby",`${f}-b`);let p=y("h2","-title",t);p.id=`${f}-t`;let h=y("p","-body",e);h.id=`${f}-b`;let k=y("div","-actions"),$=(N,D)=>{let P=y("button","-btn",N);return P.type="button",P.dataset.ncConfirm=D,P.addEventListener("click",()=>q(D==="ok")),P},E=$(i,"cancel"),v=$(n,"ok");r&&(v.dataset.danger="true"),k.append(E,v),b.append(p,h,k),g.append(b);let x={layer:g};We=x;let w=s??d.activeElement,S=[];for(let N of u.children)N.hasAttribute("inert")||(N.setAttribute("inert",""),S.push(N));let T=()=>{if(We!==x)return;u.append(g),E.focus({preventScroll:!0});let N=m.requestAnimationFrame?.bind(m)??(D=>setTimeout(D,16));N(()=>N(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};l?l.then(T):T();let A=!1;g.addEventListener("pointerdown",N=>{A=N.target===g}),g.addEventListener("click",N=>{N.target===g&&A&&q(!1),A=!1});let I=N=>{N.stopImmediatePropagation(),N.key==="Escape"?(N.preventDefault(),q(!1)):N.key==="Tab"?(N.preventDefault(),(d.activeElement===E?v:E).focus()):N.key==="Enter"&&(N.preventDefault(),d.activeElement===v?q(!0):d.activeElement===E&&q(!1))},H=N=>N.stopImmediatePropagation();m.addEventListener("keydown",I,!0),m.addEventListener("keyup",H,!0);let L=()=>q(!1);c?.addEventListener("abort",L);let O,kn=new Promise(N=>{O=N});function q(N){if(We!==x)return;We=null,m.removeEventListener("keydown",I,!0),m.removeEventListener("keyup",H,!0),c?.removeEventListener("abort",L);for(let ve of S)ve.removeAttribute("inert");g.dataset.state="closing",w?.isConnected&&typeof w.focus=="function"&&w.focus({preventScroll:!0});let D=m.getComputedStyle?.(g),P=Math.max(0,...String(D?.transitionDuration??"").split(",").map(ve=>Number.parseFloat(ve)*(ve.trim().endsWith("ms")?1:1e3)||0)),we=()=>g.remove();g.addEventListener("transitionend",ve=>ve.target===g&&we()),setTimeout(we,P+50),O(N)}return kn}function Ea(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,c=l=>{s=l===!0,n.setAttribute("aria-checked",s?"true":"false")};c(t.checked);let d=()=>{c(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:c,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ma=new WeakMap,Bn=.25;function Vr(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,c=t.onChange,d=t.onReset,l=p=>Math.min(1,Math.max(0,p)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},m=p=>{let h=l(p);h!==o&&(o=h,u(),c?.(h))},f=0,y=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();p.target!==r&&h.height>0&&m(1-(p.clientY-h.top)/h.height),f=p.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!y)return;let h=n.getBoundingClientRect().height||1,k=(f-p.clientY)/h*(p.shiftKey?Bn:1);f=p.clientY,m(o+k)});let g=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),n.addEventListener("keydown",p=>{let h=p.shiftKey?s*Bn:s,k={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in k&&(p.preventDefault(),m(k[p.key]))});let b={el:n,get value(){return o},get dragging(){return y},set(p){y||(o=l(Number(p)||0),u())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(c=p.onChange),p.onReset&&(d=p.onReset)}};return b.setLabel(t.label),b.set(t.value??0),b.setText(t.valueText),Ma.set(n,b),b}function qr(t){return Ma.get(t)}var Ta=new WeakMap,Kr=.2,Jr=1.5,Qr=.5;function eo(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function jn(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:eo(i.getComputedStyle(t).getPropertyValue(G(e)),n)}function to(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let p=e.createElement("span");p.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let k=e.createElement("span");k.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",p.append(h,k,$),o.append(p),s.push({peak:h,rms:k,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let c=t.label,d=t.onClear,l=!1,u=-1,m=-1,f=()=>{r.dataset.lit=l?"true":"false",r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${c} clipped: clear`:`${c} clip light`),r.title=l?"Clipped. Click to clear":"Clip light"},y=(b,p,h,k)=>{let $=Math.round(k*1e3)/1e3;h[p]!==$&&(h[p]=$,b.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};r.addEventListener("click",()=>{g.clear(),d?.()});let g={el:i,get clipped(){return l},update(b,p){u<0&&(u=jn(i,"motion-meter-fall",Kr)),m<0&&(m=jn(i,"motion-meter-hold",Jr));let h=Math.max(0,Math.min(.25,Number(p)||0)),k=u>0?Math.exp(-h/u):0;s.forEach(($,E)=>{let v=b[E]??b[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(v.peak)||0)),w=Math.min(x,Math.max(0,Number(v.rms)||0));v.over&&g.clip(),$.level.peak=x>=$.level.peak?x:x+($.level.peak-x)*k,$.level.rms=w>=$.level.rms?w:w+($.level.rms-w)*k,$.holdAge+=h,x>=$.holdAt?($.holdAt=x,$.holdAge=0):$.holdAge>m&&($.holdAt=Math.max(x,$.holdAt-Qr*h)),y($.peak,"peak",$.shown,$.level.peak),y($.rms,"rms",$.shown,$.level.rms),y($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){l||(l=!0,f())},clear(){l=!1,f()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,y(b.peak,"peak",b.shown,0),y(b.rms,"rms",b.shown,0),y(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){c=b,f()},configure(b){b.onClear&&(d=b.onClear)}};return f(),g.reset(),Ta.set(i,g),g}function Ca(t){return t?Ta.get(t):void 0}function no(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function Bt(t){return Math.max(0,Math.min(1,t))}function Na(t,e){let{ctx:n,w:i,h:r}=no(t);if(!n)return;n.clearRect(0,0,i,r);let o=_r(t);if(e.paint==="swatch"){let d=Y(t,"accent"),l=Y(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=l,n.fillStyle=d,n.fillRect(0,0,i/2,r),n.fillStyle=l,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let d=e.mode??"lp",l=Y(t,Hr(d)),u=Y(t,"divider"),m=Bt(e.cutoff??.5),f=.08+(1-Bt(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let y=0;y<=i;y++){let g=y/Math.max(1,i),b=0;d==="lp"?b=g<m?1:Math.max(0,1-(g-m)/f):d==="hp"?b=g>m?1:Math.max(0,1-(m-g)/f):b=Math.max(0,1-Math.abs(g-m)/f);let p=r*.78-b*r*.62;y===0?n.moveTo(y,p):n.lineTo(y,p)}n.strokeStyle=l,n.stroke(),n.fillStyle=Y(t,"text-sub"),n.font=o,n.fillText(d.toUpperCase(),0,r),t.dataset.ncAccent=l;return}if(e.paint==="envelope"){n.strokeStyle=Y(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let l=0;l<=i;l++){let u=l/Math.max(1,i),m=(r-4)*(1-Math.exp(-u*4/d));n.lineTo(l,r-m)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){let d=Bt(e.level??0);n.fillStyle=Y(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=Y(t,"accent"),n.fillRect(0,r*.4,i*d,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),c=((e.step??0)%s+s)%s;n.fillStyle=Y(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=Y(t,"rhythm.playhead"),n.fillRect(c/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=Y(t,"accent")}var Ia={slop:8,longPressMs:500,pitchPx:16},ao=class{constructor(t,e,n=Ia){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function io(t,e,n,i=Ia){let r=!1,o=0,s=(l,u)=>{let m=t.ownerDocument.elementFromPoint?.(l,u),f=[...t.querySelectorAll(e)],y=m?f.findIndex(p=>p===m||p.contains(m)):-1;if(y>=0)return y;let g=-1,b=Number.POSITIVE_INFINITY;return f.forEach((p,h)=>{if(p.hidden)return;let k=p.getBoundingClientRect();if(u<k.top||u>k.bottom)return;let $=Math.abs(l-(k.left+k.width/2));$<b&&$<=k.width&&(g=h,b=$)}),g},c=new ao(s,l=>{(l.kind==="paint"||l.kind==="long")&&(r=!0),n(l)},i),d=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",l=>{l.button>0||(r=!1,c.down(l.pointerId,l.clientX,l.clientY,l.timeStamp)&&(d(),o=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",l=>{c.state!=="idle"&&(c.move(l.pointerId,l.clientX,l.clientY,l.timeStamp),c.state!=="pending"&&d())}),t.addEventListener("pointerup",l=>{d(),c.up(l.pointerId,l.clientX,l.clientY,l.timeStamp)}),t.addEventListener("pointercancel",l=>{d(),c.cancel(l.pointerId)}),t.addEventListener("click",l=>{r&&(r=!1,l.stopPropagation(),l.preventDefault())},!0),t.addEventListener("contextmenu",l=>l.preventDefault()),c}function _(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Lt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function Pn(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Ze(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var ro=450,Wn=8;function J(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function oo(t){let e=Gr(t,"target-min");return e>0?e:44}function so(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=oo(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],c=r[o];if(!(s instanceof HTMLElement)||!c||c.width===0||c.height===0)continue;if(c.width>=n&&c.height>=n){s.style.display="none";continue}let d=c.left+c.width/2,l=c.top+c.height/2,u=d-i,m=d+i,f=l-i,y=l+i;for(let g=0;g<e.length;g++){if(o===g)continue;let b=r[g];if(!b||b.width===0)continue;let p=b.left+b.width/2,h=b.top+b.height/2;Math.abs(h-l)<i*2&&(p>d?m=Math.min(m,(d+p)/2):p<d&&(u=Math.max(u,(d+p)/2))),Math.abs(p-d)<i*2&&(h>l?y=Math.min(y,(l+h)/2):h<l&&(f=Math.max(f,(l+h)/2)))}u=Math.min(u,c.left),m=Math.max(m,c.right),f=Math.min(f,c.top),y=Math.max(y,c.bottom),s.style.left=`${u-c.left}px`,s.style.top=`${f-c.top}px`,s.style.width=`${Math.max(0,m-u)}px`,s.style.height=`${Math.max(0,y-f)}px`,s.style.transform="none"}}function Ra(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Fn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function bt(t,e){switch(t.type){case"slider":return lo(t,e);case"select":return uo(t,e);case"toggle":return po(t,e);case"button":return ho(t,e);case"readout":return mo(t);case"label":return fo(t);case"note":return Gn(t);case"knob":return yo(t,e);case"choice":return wo(t,e);case"slotRow":return vo(t,e);case"stepGrid":return So(t,e);case"canvas":return Eo(t);case"fx":return No(t,e);case"strip":return Mo(t,e);case"stripAdd":return Co(t,e);default:return Gn({id:"unknown",text:""})}}function se(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,za(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??Ze(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Pn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Pn(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&go(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??Ze(e.value))}else if(e.type==="choice")Oa(t,e);else if(e.type==="slotRow")ja(t,e);else if(e.type==="stepGrid")qt(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Na(n,e)}else if(e.type==="strip"){Ga(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${Kt(n.id)}"]`);i instanceof Element&&se(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")Wa(t,e);else if(e.type==="fx"){Ha(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${Kt(n.id)}"]`);i instanceof Element&&se(i,n)}}}}function lo(t,e){let n=Lt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(co(t,i,e),r),n.append(_()),se(n,t),n}function co(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(J());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function uo(t,e){let n=Lt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,_()),n}function po(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(_()),se(n,t),n}function ho(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(_()),se(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=Ra(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Pa(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function mo(t){let e=Lt(t.id,t.label);return e.append(_()),se(e,t),e}function fo(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(_()),e}function Gn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(_()),e}function Hn(t){if(typeof t.valueText=="string")return t.valueText;let e=Ze(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function za(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function go(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;za(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Hn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Hn(e)}`}function bo(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function yo(t,e){let n=Lt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",d=>{o=d.clientY;let l=e(i);s=l&&"value"in l?Number(l.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let l=e(i);if(l?.type!=="knob")return;let u=l.max-l.min||1,m=Math.min(l.max,Math.max(l.min,s-(d.clientY-o)*u/120));l.onChange(m)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let l=e(i);if(l?.type!=="knob")return;let u=bo(l,d);u!==null&&(d.preventDefault(),l.onChange(Math.min(l.max,Math.max(l.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(i,c),n.append(_()),se(n,t),n}function wo(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],c=s.indexOf(r),d=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(c+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(c-1+s.length)%s.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=s.length-1;else return;let l=s[d];l instanceof HTMLButtonElement&&(o.preventDefault(),l.focus(),l.click())}),n.append(r)}return n.append(_()),Oa(n,t),n}function Oa(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function vo(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let m=t.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(u),y.textContent=m.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,J()),$o(f,y,n,u,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Ra(),r.append(J()),r.addEventListener("click",()=>{Pa(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let c=document.createElement("input");c.type="range",c.className="nc-range nc-morph",c.min="0",c.max="4",c.step="0.01",c.setAttribute("aria-label","Morph time"),c.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(c.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(s,d,c);let l=document.createElement("div");return l.className="nc-slot-line",l.append(i,...r?[r]:[]),n.append(l,o,_()),Ba(n,e),ja(n,t),n}function _n(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;Ge(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function $o(t,e,n,i,r){let o=0,s=0,c=0,d=!1,l=!1,u=!1,m=!1,f=()=>{window.clearTimeout(o),o=0},y=h=>{let k=h.clientX-s,$=h.clientY-c;k*k+$*$>Wn*Wn&&(d=!0,f())},g=()=>{m&&(m=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",p))},b=h=>{let k=o!==0&&!d&&!l;f(),g(),k&&(u=!0,_n(n,i,r,h))},p=()=>{d=!0,f(),g()};t.addEventListener("pointerdown",h=>{h.button===0&&(g(),l=!1,d=!1,u=!1,s=h.clientX,c=h.clientY,f(),o=window.setTimeout(()=>{o=0,!d&&(l=!0,ko(n,e,i,r))},ro),m=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(u||l||d){u=!1,l=!1,d=!1;return}_n(n,i,r,h)})}function Ba(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=Dn("Save","store"),r=Dn("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ge(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let c=s.target;if(!(c instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let l=Number(n.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(d.onSlot(l,"store"),Ge(t)):c.dataset.ncSlotOp==="clear"&&(d.onSlot(l,"clear"),Ge(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&Ge(t)})}function Dn(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function ko(t,e,n,i){Ba(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),c=e.getBoundingClientRect();r.style.left=`${c.left-s.left}px`,r.style.top=`${c.bottom-s.top}px`,r.querySelector("button")?.focus()}function Ge(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ja(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let c=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...c.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Pa(t){let e=t.dataset.ncLastFill||null,n=Cr(e);t.dataset.ncLastFill=n;let i=Nr(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function xo(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function So(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=p=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=p,i.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let c=p=>{for(let h of[o,s]){let k=h===p;h.setAttribute("aria-checked",k?"true":"false"),h.tabIndex=k?0:-1}};c(o);for(let p of[o,s])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;c(h),h.focus()});let d=document.createElement("div");d.className="nc-step-tools",d.append(i),t.onFill&&d.append(xo(n,e)),n.append(d);for(let p of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=p.label,k.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(k.dataset.ncLane=String((p.lane-1)%4+1)),k.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid")return;let x=v.rows.findIndex(w=>w.id===p.id);v.onSelectRow?.(x)}),k.addEventListener("keydown",v=>Ao(n,k,v));let $=[];for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let w=document.createElement("button");w.type="button",w.className="nc-ms",w.dataset.ncMs=v,w.textContent=v==="mute"?"M":"S",w.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${p.label}`),x.append(w,J()),x.addEventListener("click",()=>{let S=e(n);if(S?.type!=="stepGrid")return;let T=S.rows.findIndex(A=>A.id===p.id);(v==="mute"?S.onMute:S.onSolo)?.(T)}),$.push(x)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<p.steps.length;v++){let x=document.createElement("span");x.className="nc-step-wrap";let w=document.createElement("button");w.type="button",w.className="nc-step",w.dataset.ncStep=`${p.id}:${v}`,w.setAttribute("aria-label",`${p.label} step ${v+1}`),x.append(w,J()),x.addEventListener("click",S=>{let T=e(n);if(T?.type!=="stepGrid")return;let A=T.rows.findIndex(H=>H.id===p.id),I=s.getAttribute("aria-checked")==="true";T.onToggle(A,v,S.shiftKey||I)}),E.append(x)}if(t.onLength&&E.append(Lo(n,E,p,e)),h.append(...$,k,E),t.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=p.id,v.setAttribute("aria-label",`Re-roll ${p.label}`),v.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=Fn(),v.append(J()),v.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(w=>w.id===p.id))}),h.append(v)}h.addEventListener("click",v=>{if(v.target!==h)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(w=>w.id===p.id))}),Yn(n,E,".nc-step-wrap",e,s,()=>p.id),n.append(h)}let l=document.createElement("div");l.className="nc-pads-head";let u=(p,h,k)=>{let $=document.createElement("button");return $.type="button",$.className=p,$.textContent=h,k&&$.setAttribute("aria-label",k),$},m=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),y=document.createElement(t.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),t.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",qt(n,p))}));for(let[p,h]of[[m,-1],[f,1]])p.addEventListener("click",()=>{let k=e(n);if(k?.type!=="stepGrid"||k.rows.length===0)return;let $=k.rows.length;k.onSelectRow?.(((rt(k)+h)%$+$)%$)});if(l.append(m,y,f),t.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Fn(),p.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let k=rt(h);k>=0&&h.onDice?.(k)}),l.append(p)}if(t.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),l.append(p)}n.append(l);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let b=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<b;p++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(p),h.textContent=String(p+1),h.addEventListener("click",k=>{let $=e(n);if($?.type!=="stepGrid")return;let E=rt($);if(E<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(E,p+1);return}let v=s.getAttribute("aria-checked")==="true";$.onToggle(E,p,k.shiftKey||v)}),g.append(h)}return Yn(n,g,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[rt(p)]?.id:void 0}),n.append(g),n.append(_()),qt(n,t),n}function rt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Yn(t,e,n,i,r,o){let s="on",c=!0,d=-1,l=(u,m)=>{let f=u.rows[d]?.steps[m];!f||m>=u.rows[d].length||(u.onSet?u.onSet(d,m,s,c):!!f[s]!==c&&u.onToggle(d,m,s==="accent"))};io(e,n,u=>{let m=i(t);if(m?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=m.rows.findIndex(y=>y.id===o());f>=0&&m.rows[f].length!==u.pad+1&&m.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=o();d=m.rows.findIndex(g=>g.id===f);let y=m.rows[d]?.steps[u.pad];if(!y)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",c=!y[s]}l(m,u.pad)}else if(u.kind==="long"){let f=o(),y=m.rows.findIndex(b=>b.id===f),g=e.querySelectorAll(n)[u.pad];y>=0&&g instanceof HTMLElement&&m.onLongPress?.(y,u.pad,g)}}})}function Ao(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Lo(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(J());let o=l=>{let u=i(t);if(u?.type!=="stepGrid")return;let m=u.rows.findIndex(g=>g.id===n.id),f=u.rows[m];if(!f)return;let y=Math.max(1,Math.min(f.steps.length,l));y!==f.length&&u.onLength?.(m,y)},s=l=>{let u=[...e.querySelectorAll(".nc-step")],m=1;return u.forEach((f,y)=>{let g=f.getBoundingClientRect();g.width>0&&l>=g.left+g.width/2&&(m=y+1)}),m},c=l=>o(s(l.clientX)),d=()=>{window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete r.dataset.dragging};return r.addEventListener("pointerdown",l=>{l.button===0&&(l.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",c),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),r.addEventListener("keydown",l=>{let u=i(t);if(u?.type!=="stepGrid")return;let m=u.rows.find(y=>y.id===n.id);if(!m)return;let f={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};l.key in f&&(l.preventDefault(),o(f[l.key]))}),r}var jt=new WeakMap;function Zn(t,e){let n=typeof e=="number"?e:null;if(!(jt.has(t)&&jt.get(t)===n)){if(jt.set(t,n),n===null){for(let i of Object.keys(On(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(On(n)))t.style.setProperty(i,r)}}function qt(t,e){let n=e.rows.some(l=>l.solo),i=t.querySelector(".nc-pads"),r=e.rows.find(l=>l.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=s?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",s?"true":"false"),o.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let l=!!e.transport?.playing,u=e.transport?.label??(l?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",l?"true":"false");let m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let l=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let m=Number(u.getAttribute("data-nc-pad")),f=r.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!f||!s&&m>=r.length,s&&m>=r.length?u.dataset.out="true":delete u.dataset.out,s&&m===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${m+1}`),u.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?u.dataset.accent="true":delete u.dataset.accent,f?.dim?u.dataset.dim="true":delete u.dataset.dim,Zn(u,f?.velocity),e.playhead>=0&&m===l?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let l of e.rows){for(let f=0;f<l.steps.length;f++){let y=l.steps[f],g=t.querySelector(`[data-nc-step="${l.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;let b=g.closest(".nc-row");if(b instanceof HTMLElement){e.selectedRow===l.id?b.dataset.selected="true":delete b.dataset.selected;let k=b.querySelector(".nc-name");k instanceof HTMLElement&&k.setAttribute("aria-pressed",e.selectedRow===l.id?"true":"false"),l.mute||n&&!l.solo?b.dataset.silent="true":delete b.dataset.silent;for(let $ of b.querySelectorAll("[data-nc-ms]")){let E=$.getAttribute("data-nc-ms")==="mute"?l.mute:l.solo;$.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?g.dataset.accent="true":delete g.dataset.accent,y.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof y.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Zn(g,y.velocity);let p=e.playhead>=0&&l.length>0?(e.playhead%l.length+l.length)%l.length:-1;f===p?g.dataset.playhead="true":delete g.dataset.playhead;let h=!!e.onLength&&e.selectedRow===l.id;g.hidden=f>=l.length&&!h,f>=l.length&&h?g.dataset.out="true":delete g.dataset.out}let u=t.querySelector(`[data-nc-len="${l.id}"]`),m=t.querySelector(`[data-nc-step="${l.id}:${Math.max(0,l.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&m&&m.nextElementSibling!==u){let f=document.activeElement===u;m.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(l.length)),u.setAttribute("aria-label",`${l.label} length, ${l.length} steps`),u.title=`${l.label}: drag to set the length (${l.length} steps)`)}}function Eo(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,_()),e}function Mo(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(g)}),i.append(g)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",g.append(b,J()),g.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=g,p.textContent=g==="mute"?"M":"S",b.append(p,J()),b.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(g==="mute"?h.onMute:h.onSolo)?.()}),s.append(b)}let c=document.createElement("div");c.className="nc-strip-sends";for(let g of t.sends??[])c.append(bt({...g,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-body";let l=document.createElement("span");l.className="nc-scale",l.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(g.value)),b.textContent=g.label,l.append(b)}let u=Vr({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let b=e(n);b?.type==="strip"&&b.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&Un(g)}}),m=to({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});d.append(l,u.el,m.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",g=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(y),g.detail===0?Xn(n,f,e):g.detail===1&&(y=window.setTimeout(()=>Xn(n,f,e),To)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let g=e(n);g?.type==="strip"&&Un(g)}),n.append(i,o,s,c,d,f,_()),Ga(n,t),n}var To=250;function Xn(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??Ze(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=c=>{if(o)return;o=!0;let d=r.value;if(r.remove(),e.hidden=!1,c){let l=n(t);l?.type==="strip"&&l.onTypeIn?.(d)}e.focus?.()};r.addEventListener("keydown",c=>{c.key==="Enter"?(c.preventDefault(),s(!0)):c.key==="Escape"&&(c.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Co(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let c=e(n),d=s.value;Fa(s),c?.type==="stripAdd"&&d&&c.onAdd(d)}),n.append(i,s,_()),Wa(n,t),n}function Wa(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(c=>`${c.value}|${c.textContent}|${c.disabled}`).join(","),s=r.map(c=>`${c.value}|${c.label}|${c.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(c=>{let d=document.createElement("option");return d.value=c.value,d.textContent=c.label,d.disabled=c.disabled===!0,d})),Fa(i))}function Fa(t){let e=t.options[0];e&&(e.selected=!0)}function Un(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ga(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?qr(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),Ca(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let d=e.valueText??Ze(e.value);s.textContent!==d&&(s.textContent=d),s.setAttribute("aria-label",`${e.label} level ${d}`);let l=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${l}`:l}for(let d of t.querySelectorAll("[data-nc-ms]")){let l=d.getAttribute("data-nc-ms"),u=l==="mute"?e.mute===!0:e.solo===!0;d.setAttribute("aria-pressed",u?"true":"false"),d.setAttribute("aria-label",`${l==="mute"?"Mute":"Solo"} ${e.label}`)}let c=t.querySelector("[data-nc-hacks]");if(c){let d=e.hacksLabel??"Hacks";c.textContent!==d&&(c.textContent=d),c.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),c.setAttribute("aria-label",`${d}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Vn(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${Kt(e)}"]`);return Ca(n?.querySelector(".nc-meter")??void 0)}function No(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=Ea({checked:t.on,labelledBy:i.id,onChange:s=>{let c=e(o.el);c?.type==="fx"&&c.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(bt(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(bt(s,e));n.append(r)}return n.append(_()),Ha(n,t),n}function Ha(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Kt(t){return t.replace(/["\\]/g,"\\$&")}function Io(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&Na(n,i)}so(t)}var cn="netcomposer.rhythm.hidden.v1",ae=new WeakMap;function Pt(){try{return globalThis.localStorage??null}catch{return null}}function _a(t,e=cn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function qn(t,e,n,i=cn){let r=_a(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function dn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function Ro(t,e){if(!(!t||!e))return dn(t).find(n=>n.id===e)}function zo(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${dn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Oo(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),Da(t,e)}function Da(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Bo(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=ae.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ro(n,i)}function jo(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=zo(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${Kn(r.id)}"]`);o&&Da(o,r);for(let s of r.controls){let c=t.querySelector(`[data-nc-id="${Kn(s.id)}"]`);c instanceof Element&&se(c,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),Oo(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let c of r.controls)s.append(bt(c,Bo));t.append(o)}}function Kn(t){return t.replace(/["\\]/g,"\\$&")}function Po(t,e=cn){Aa();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=_a(Pt(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let l=Ea({labelledBy:o.id,onChange:h=>(ae.get(n)??t).onToggle?.(h)});l.el.dataset.ncModuleSwitch="",s.append(l.el,c,d);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",r.append(o,u,s);let m=document.createElement("div");m.className="nc-module-body",m.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let y=document.createElement("span");y.className="nc-slim-lines",f.append(y);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,m,f),n.setAttribute("aria-labelledby",o.id);let b=h=>{let k=ae.get(n)??t;n.dataset.ncOpen=h?"false":"true",m.hidden=h,f.hidden=!h,c.textContent=h?"+":"−",c.setAttribute("aria-expanded",h?"false":"true"),c.setAttribute("aria-controls",m.id),c.setAttribute("aria-label",`${h?"Show":"Hide"} ${k.title}`),c.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};c.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";qn(Pt(),(ae.get(n)??t).id,h,e),b(h),Jt(n.parentElement)}),f.addEventListener("click",()=>{qn(Pt(),(ae.get(n)??t).id,!1,e),b(!1),Jt(n.parentElement)});let p={el:n,update(h){ae.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,u.textContent=h.status??"",h.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),y.textContent=h.summary??h.title,l.el.hidden=h.on===void 0,l.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),jo(m,h),b(m.hidden),p.redraw()},redraw(){let h=ae.get(n);h&&Io(n,dn(h))}};return ae.set(n,t),b(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Wo(t,e,n="adjacent"){Aa(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let c=r.el.querySelector("[data-nc-index]");c&&(c.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),Jt(t)}function Jt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const Ya="netcomposer.studio.instances.v1",Jn="netcomposer.studio.types-seen.v1",Fo=["petra-rhythm","olive-bass"];function Za(t,e){return e===1?t:`${t}#${e}`}function un(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function Ke(t,e){return{id:Za(t.id,e),type:t.id,n:e,name:e===1?t.name:`${t.name} ${e}`,src:t.src}}function Go(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Ho(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let i=1;for(;n.has(i);)i++;return Ke(e,i)}function Xe(t){return t.filter(e=>e.available!==!1).map(e=>Ke(e,1))}function _o(t,e){if(!Array.isArray(t))return Xe(e);const n=[];for(const i of t){if(typeof i!="string")continue;const r=un(i),o=r&&e.find(s=>s.id===r.type&&s.available!==!1);!r||!o||n.some(s=>s.id===i)||n.push(Ke(o,r.n))}return n.length>0||t.length===0?n:Xe(e)}function pn(){try{return globalThis.localStorage??null}catch{return null}}function Do(t,e=pn()){try{const n=e?.getItem(Ya);return n?_o(JSON.parse(n),t):Xe(t)}catch{return Xe(t)}}function Yo(t,e,n=pn()){let i=Fo;try{const s=JSON.parse(n?.getItem(Jn)??"null");Array.isArray(s)&&(i=s.filter(c=>typeof c=="string"))}catch{}const r=e.filter(s=>!i.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(c=>c.type===s.id)||o.push(Ke(s,1));try{n?.setItem(Jn,JSON.stringify([...new Set([...i,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&Je(o,n),o}function Je(t,e=pn()){try{e?.setItem(Ya,JSON.stringify(t.map(n=>n.id)))}catch{}}function Zo(t,e){const n=new Map;return(i,r)=>{const o=un(i),s=o?.type??i,c=r?.instance!==void 0?Number(r.instance):i.includes("#")?o?.n:void 0,d=t().filter(u=>u.instance.type===s);let l;if(c!==void 0&&Number.isInteger(c)&&c>=1)l=d.find(u=>u.instance.n===c);else{const u=d.filter(m=>{const f=m.window();return f!=null&&f!==n.get(m.instance.id)});l=u.find(m=>m.readyState?.()!=="complete")??u[0]??d[0]}if(!l){if(e.some(m=>m.id===s))return null;const u=c!==void 0?Za(s,c):i;return{id:u,name:u}}return n.set(l.instance.id,l.window()),{id:l.instance.id,name:l.instance.name}}}const Xo=1,ee=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],hn=[...ee];function Uo(t,e,n={}){const i=n.instruments??ee;return{version:Xo,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:i.find(d=>d.id===r)?.name??r};if(!s)return null;const c=e.attach(s.id,s.name);return n.mapper===void 0?{ctx:t,output:c}:{ctx:t,output:c,mapper:n.mapper}}}}const Vo={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function qo(t,e){const n=e.fx[t],i=mt(n);for(const r of i.chain){const o=Vo[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return i}function Ko(t,e){const n=new Map,i=new Map;let r=1;const o=s=>{const c=e.nodeFor(s);if(!c)return null;const d=n.get(s);if(d&&d.source===c)return d.node;d?.node.disconnect();const l=new AudioWorkletNode(t,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return l.port.onmessage=u=>{const m=u.data;m.type!=="took"&&m.type!=="recorded"||(i.get(m.id)?.(m.channels),i.delete(m.id))},c.connect(l),n.set(s,{node:l,source:c}),l};return{record(s,c){if(!e.nodeFor(s))return null;const d=n.get(s)?.node??null,l=r++;let u=d;const m=y=>u?.port.postMessage(y);u?m({type:"record",id:l,from:c}):e.ready.then(()=>{u=o(s),m({type:"record",id:l,from:c})});let f=!1;return{stop(y){return f?Promise.resolve(null):(f=!0,new Promise(g=>{i.set(l,g),m({type:"record-end",id:l,to:y}),setTimeout(()=>{i.delete(l)&&g(null)},Math.max(0,(y-t.currentTime*t.sampleRate)/t.sampleRate)*1e3+5e3)}))},cancel(){f=!0,m({type:"record-cancel",id:l})}}},sources:()=>e.sources(),listen(s){return e.nodeFor(s)?(e.ready.then(()=>o(s)),!0):!1},async take(s,c,d){await e.ready;const l=o(s);if(!l||!(d>c))return null;const u=r++;return new Promise(m=>{i.set(u,m),l.port.postMessage({type:"take",id:u,from:c,to:d}),setTimeout(()=>{i.delete(u)&&m(null)},(d-t.currentTime*t.sampleRate)/t.sampleRate*1e3+2e3)})}}}function Jo(t){const e=()=>{};return new Proxy(t,{get(n,i,r){if(i==="stop")return e;const o=Reflect.get(n,i,r);return typeof o=="function"?o.bind(n):o}})}const te=-54,Qe=6,U=-te/(Qe-te),Qo=-9,Qt=(Qo-te)/(Qe-te);function Xa(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:te+e*(Qe-te)}function es(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function ts(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function ue(t){return es(Xa(t))}function ns(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function as(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:ue(n.position))}function mn(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-te)/(Qe-te)))}function Qn(t){return mn(ts(t))}const ea=[0,-6,-12,-24,-48].map(t=>({value:mn(t),label:t===0?"0":`−${-t}`})),is=1;function rs(t){let e=0,n=0;for(const i of t){const r=Math.abs(i);r>e&&(e=r),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function ta(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<te?0:mn(Math.min(Qe,n)):null}const Ua="netcomposer.studio.mix.v1",Va={position:Qt,mute:!1,solo:!1,sendA:0,sendB:0};function Ue(){return{v:1,channels:{},master:U,returns:{a:{on:!0,level:U},b:{on:!0,level:U}},insert:{on:!1},fx:{},channelFx:{}}}const De=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,yt=(t,e)=>typeof t=="boolean"?t:e,ie=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function os(t){const e=ie(t);return{position:De(e.position,Va.position),mute:yt(e.mute,!1),solo:yt(e.solo,!1),sendA:Math.min(U,De(e.sendA,0)),sendB:Math.min(U,De(e.sendB,0))}}function qa(t){const e=Ue(),n=ie(t);if(n.v!==1)return e;const i={};for(const[l,u]of Object.entries(ie(n.channels)))l.length>0&&l.length<=64&&(i[l]=os(u));const r=ie(n.returns),o=(l,u)=>{const m=ie(l);return{on:yt(m.on,u.on),level:De(m.level,u.level)}},s={},c=ie(n.fx);for(const l of["a","b","insert"])c[l]!==void 0&&(s[l]=c[l]);const d={};for(const[l,u]of Object.entries(ie(n.channelFx)))l.length>0&&l.length<=64&&u&&typeof u=="object"&&(d[l]=u);return{v:1,channels:i,master:De(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:yt(ie(n.insert).on,e.insert.on)},fx:s,channelFx:d}}function Ka(){try{return globalThis.localStorage??null}catch{return null}}function ss(t=Ka()){try{const e=t?.getItem(Ua);return e?qa(JSON.parse(e)):Ue()}catch{return Ue()}}function Ja(t,e=Ka()){try{return e?.setItem(Ua,JSON.stringify(t)),e!==null}catch{return!1}}const ls="netcomposer.studio.hidden.v1",ot=1/120,ne="master",na="Inserts",cs="(max-width: 768px)",dt=8,ut=t=>ns(Xa(t)),aa=t=>{const e=ut(t);return e==="−∞"?"off":`${e} dB`};function ds(t,e){return Te.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function us(t,e,n){const i=n.bpm,r=w=>{const S=n.order(),T=S.indexOf(w);return T<0?S.length:T},o=(w,S,T,A)=>{const I=ds(T,A);if(!I||!S)return null;const H=Number(S.getParam(T,A)??I.default),L=`mix-${w}-${A}`;return I.options?{type:"select",id:L,label:I.label,value:String(H),options:I.options.map(O=>({value:String(O.value),label:O.label})),onChange:O=>{S.setParam(T,A,Number(O)),x.render()}}:{type:"slider",id:L,label:I.label,min:I.min,max:I.max,step:I.step??1,value:H,valueText:I.format(H,i()),onChange:O=>{S.setParam(T,A,O),x.render()}}},s=(w,S,T,A)=>A.map(I=>o(w,S,T,I)).filter(I=>I!==null),c=matchMedia(cs);let d=c.matches?null:ne;const l=w=>{d=w===null&&!c.matches?ne:w,x.render()},u=w=>l(d===w?c.matches?null:ne:w);c.addEventListener("change",()=>l(d));const m=(w,S,T,A)=>{const I=Number(S.getParam(T,A.key)??A.default),H=`hack-${w}-${T}-${A.key}`,L=O=>{S.setParam(T,A.key,O),x.render()};return A.options?{type:"select",id:H,label:A.label,value:String(I),options:A.options.map(O=>({value:String(O.value),label:O.label})),onChange:O=>L(Number(O))}:{type:"slider",id:H,label:A.label,min:A.min,max:A.max,step:A.step??.001,value:I,valueText:fa(A,I,i()),onChange:L}},f="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}},g=(w,S,T)=>{const A=T.getChain(),I=A.map((L,O)=>{const q=V(L.type)?.dials??[],N=P=>{T.moveEffect(L.id,P),x.render()},D=[];return O>0&&D.push({type:"button",id:`hack-${w}-${L.id}-left`,label:"Move left",on:!1,onPress:()=>N(O-1)}),O<A.length-1&&D.push({type:"button",id:`hack-${w}-${L.id}-right`,label:"Move right",on:!1,onPress:()=>N(O+1)}),D.push({type:"button",id:`hack-${w}-${L.id}-remove`,label:"Remove",ariaLabel:`Remove ${L.name} from ${S}`,on:!1,onPress:()=>{T.removeEffect(L.id),x.render()}}),{type:"fx",id:`hack-${w}-${L.id}`,title:`${O+1} · ${L.name}`,depth:O%4+1,on:!L.bypass,onToggle:P=>{T.setParam(L.id,"bypass",!P),x.render()},controls:q.filter(P=>!P.more).map(P=>m(w,T,L.id,P)),more:[...q.filter(P=>P.more).map(P=>m(w,T,L.id,P)),...D]}}),H=A.length>=dt;return I.push({type:"fx",id:`hack-${w}-add`,title:`${S} · Inserts`,depth:A.length%4+1,controls:[{type:"note",id:`hack-${w}-note`,text:H?`${A.length} of ${dt}: the stack is full.`:A.length===0?"No effects yet.":`${A.length} of ${dt}, first to last.`},...H?[]:[{type:"select",id:`hack-${w}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...Ui.map(L=>({value:L,label:V(L)?.label??L}))],onChange:L=>{L!==f&&(T.addEffect(L,{dials:y[L]}),x.render())}}]]}),I},b=w=>{const S=e.returns[w];return{type:"slider",id:`mix-${w}-return`,label:"Return",min:0,max:1,step:ot,value:S.level,valueText:aa(S.level),onChange:T=>e.setReturn(w,{level:T})}},p=()=>[...e.list()].sort((w,S)=>r(w.id)-r(S.id)).map(w=>({type:"strip",id:`strip-${w.id}`,label:w.name,value:w.strip.position,valueText:ut(w.strip.position),step:ot,defaultValue:Qt,resetText:`${ut(Qt)} dB`,ticks:[...ea],mute:w.strip.mute,solo:w.strip.solo,silent:w.silent,onChange:S=>e.set(w.id,{position:S}),onTypeIn:S=>{const T=ta(S);T!==null&&e.set(w.id,{position:T})},onRemove:S=>n.onRemove(w.id,S),...w.fx?{hacks:d===w.id,hacksLabel:na,onHacks:()=>u(w.id)}:{},onMute:()=>e.set(w.id,{mute:!w.strip.mute}),onSolo:()=>e.set(w.id,{solo:!w.strip.solo}),sends:["A","B"].map(S=>{const T=S==="A"?"sendA":"sendB",A=w.strip[T];return{id:`send-${S.toLowerCase()}-${w.id}`,label:S,ariaLabel:`${w.name} send ${S}`,min:0,max:U,step:ot*2,value:A,valueText:aa(A),defaultValue:0,onChange:I=>e.set(w.id,{[T]:I})}})})),h=()=>({type:"strip",id:`strip-${ne}`,label:"Master",master:!0,hacks:d===ne,hacksLabel:na,onHacks:()=>u(ne),channels:2,value:e.masterPositionValue,valueText:ut(e.masterPositionValue),step:ot,defaultValue:U,resetText:"0.0 dB",ticks:[...ea],onChange:w=>e.setMaster(w),onTypeIn:w=>{const S=ta(w);S!==null&&e.setMaster(S)}}),k=()=>{const w=e.returns.a,S=e.returns.b,T=e.list().find(A=>A.id===d&&A.fx);return!T&&d!==null&&(d=ne),{id:"mix",title:"Mix",summary:`${e.list().map(A=>A.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...p(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(A=>({value:A.id,label:A.available===!1?`${A.name} (soon)`:A.name,disabled:A.available===!1})),onAdd:A=>n.onAdd(A)}]},{id:"fx",area:"fx",label:T?`${T.name} inserts`:"Effects",controls:T?.fx?g(T.id,T.name,T.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:w.on,onToggle:A=>e.setReturn("a",{on:A}),controls:[b("a"),...s("a",w.fx,"plate",["decay","size"])],more:s("a",w.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:A=>e.setReturn("b",{on:A}),controls:[b("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:A=>e.setInsert(A),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},{id:"master",area:"master",label:"Master",controls:[h()]}]}},$=Po(k(),ls),E=()=>$.el.toggleAttribute("data-hacks-folded",d===null);E(),ps($.el,n),ra($.el),Wo(t,[$],"adjacent");const v=w=>({peak:Qn(w.peak),rms:Qn(w.rms),over:w.peak>=is}),x={module:$,get hacksShown(){return d},showHacks:l,render(){$.update(k()),E(),ra($.el)},frame(w){if($.el.dataset.ncOpen==="true"){for(const S of e.list())Vn($.el,`strip-${S.id}`)?.update([v(S.levels())],w);Vn($.el,`strip-${ne}`)?.update(e.masterLevels().map(v),w)}}};return x}const Wt="application/x-nc-strip",wt=".nc-strip:not([data-nc-master])",ia=`${wt}, .nc-strip-add`,Ft=t=>t?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function ra(t){for(const e of t.querySelectorAll(`${wt} .nc-strip-hd`))!(e instanceof HTMLElement)||e.draggable||(e.draggable=!0,e.title="Drag to move this channel")}function ps(t,e){const n=()=>{for(const r of t.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of t.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},i=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};t.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd"):null)?.closest(wt),c=Ft(s??null);!c||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(Wt,c),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),t.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(Wt))return;const o=r.target instanceof Element?r.target.closest(ia):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":i(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const c of t.querySelectorAll("[data-drop]"))c.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),t.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(Wt),s=r.target instanceof Element?r.target.closest(ia):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),e.onReorder?.(o,null);return}const c=Ft(s),d=i(s,r.clientX);if(n(),!c||c===o)return;let l=c;if(d==="after"){const u=[...t.querySelectorAll(wt)],m=u[u.indexOf(s)+1];if(l=m?Ft(m):null,l===o)return}e.onReorder?.(o,l)}),t.addEventListener("dragend",n)}const Ae=.012,Gt=1024;class hs{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=U;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(Gt);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const i=()=>new AnalyserNode(e,{fftSize:Gt});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:ue(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const c=new GainNode(e,{gain:1}),d=n.fx?.(s)??null,l=new GainNode(e,{gain:ue(U)}),u=i();return d?(c.connect(d.input),d.output.connect(l)):l.gain.value=0,l.connect(u),l.connect(this.bus),{bus:c,fx:d,gain:l,meter:u,on:d!==null,level:U}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let i=this.channels.find(r=>r.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fx?.input??i.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Gt}),c=new GainNode(this.ctx,{gain:0}),d=new GainNode(this.ctx,{gain:0}),l=this.channelFx?.(e)??null;l?(r.connect(l.input),l.output.connect(o)):r.connect(o),o.connect(s).connect(this.bus),o.connect(c).connect(this.returns.a.bus),o.connect(d).connect(this.returns.b.bus),i={id:e,name:n,input:r,fader:o,meter:s,sendA:c,sendB:d,fx:l,strip:this.restore?.(e)??Va},this.channels.push(i),this.apply()}return this.emit(),i.input}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const r of[i.input,i.fader,i.meter,i.sendA,i.sendB])r.disconnect();i.fx?.output.disconnect(),i.fx?.dispose(),this.apply(),this.emit()}}tapNode(e){return e==="master"?this.limiter:this.channels.find(n=>n.id===e)?.fader??null}set(e,n){const i=this.channels.find(r=>r.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(ue(e),this.ctx.currentTime,Ae),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,r,Ae)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(ue(i.level),r,Ae)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n);for(const i of this.channels)i.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=as(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,r)=>{i.fader.gain.setTargetAtTime(e[r]??0,n,Ae),i.sendA.gain.setTargetAtTime(ue(i.strip.sendA),n,Ae),i.sendB.gain.setTargetAtTime(ue(i.strip.sendB),n,Ae)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),rs(this.scratch)}emit(){for(const e of this.listeners)e()}}const fn="studio";function ms(){let t=null;const e=new Set,n=new Set,i=o=>{if(o!==t){t=o;for(const s of n)s()}},r=(o,s)=>(o.add(s),()=>{o.delete(s)});return{owner:()=>t,claim(o){t===null&&i(o)},claimAll(){i(fn);for(const o of[...e])try{o()}catch{}},clear:()=>i(null),onAll:o=>r(e,o),onChange:o=>r(n,o)}}const fs=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function gs(t){return fs.find(e=>t(e))??null}function bs(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function ys(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${bs(e)}`}class ws{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:gs(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});i({blob:r,name:ys(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const vs="NetComposer Studio",Q=[40,240],$s="nc-sync";function ks(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${$s}${n}`,locks:e?{request:(i,r,o)=>e.request(`${i}${n}`,r,o)}:null}}function xs(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Ss(t,e){const n=new Ti({bpm:120,minBpm:Q[0],maxBpm:Q[1],timebase:"shared"}),i=new Gi({app:vs,version:"0.1.0",clock:n,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Q},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let r=!1;return{clock:n,peer:i,async start(){r||(r=!0,await i.start())},play:()=>n.play({at:Be()}),stop:()=>n.stop({at:Be()}),setTempo:o=>n.setTempo({bpm:As(o)}),playing:()=>n.transport.isPlayingAt(Be()),running:()=>n.transport.running,bpm:()=>n.transport.bpm,position(){const o=n.transport,s=Be();return o.isPlayingAt(s)?Ls(o.beatAt(s)):null},beatPhase(){const o=n.transport,s=Be();if(!o.isPlayingAt(s))return null;const c=o.beatAt(s);return c-Math.floor(c)},peers:()=>[...i.peers.values()]}}function As(t){return Number.isFinite(t)?Math.min(Q[1],Math.max(Q[0],Math.round(t*10)/10)):120}function Ls(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}const en="netcomposer.scene",Qa=1,ei="netcomposer.studio.tempo.v1",ti="netcomposer.studio.scene-name.v1",vt=120,gn="Untitled scene",Es=2*1024*1024;function Et(t){const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(Q[1],Math.max(Q[0],Math.round(e*10)/10)):vt}function ge(t){return(typeof t=="string"?t.replace(/\s+/g," ").trim().slice(0,60):"")||gn}function Ms(t){return{format:en,v:Qa,name:ge(t.name),saved:(t.now??new Date).toISOString(),tempo:{bpm:Et(t.bpm)},meter:[4,4],instances:t.instances.map(e=>({id:e.id,type:e.type,name:e.name})),mix:t.mix,presets:t.presets??{},media:t.media??[]}}function Ts(t,e){if(t.length>Es)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(t)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const i=n;if(i.format!==en)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof i.v=="number"?i.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const l of Array.isArray(i.instances)?i.instances:[]){if(!l||typeof l!="object")continue;const u=l.id;if(typeof u!="string")continue;const m=un(u);if(!m||!e.includes(m.type)||o.has(u))continue;o.add(u);const f=l.name;s.push({id:u,type:m.type,name:typeof f=="string"?f.slice(0,40):u})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const c=i.tempo&&typeof i.tempo=="object"?i.tempo.bpm:void 0,d={};if(i.presets&&typeof i.presets=="object")for(const[l,u]of Object.entries(i.presets))o.has(l)&&(d[l]=u);return{ok:!0,scene:{format:en,v:Qa,name:ge(i.name),saved:typeof i.saved=="string"?i.saved:"",tempo:{bpm:Et(c)},meter:[4,4],instances:s,mix:qa(i.mix??Ue()),presets:d,media:Array.isArray(i.media)?i.media:[]}}}function Cs(t){return`${ge(t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Ns(t){try{const e=t?.getItem(ei);return e?Et(Number(e)):vt}catch{return vt}}function ni(t,e){try{e?.setItem(ei,String(Et(t)))}catch{}}function Is(t){try{return ge(t?.getItem(ti))}catch{return gn}}function ai(t,e){try{e?.setItem(ti,ge(t))}catch{}}const Rs="/studio/assets/silence-processor-D4WJD_Gt.js";function zs(t,e=hn){const n=e.find(o=>o.id===t.type),i=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??i,rest:` / ${i} / ${r}`,...n?.identity?{identity:n.identity}:{}}}function Os(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const c=new URL(String(o),e).href;let d=i.get(c);return d||(d=n(o,s),i.set(c,d),d.catch(()=>{i.get(c)===d&&i.delete(c)})),d},configurable:!0}),t}const F=new AudioContext({latencyHint:"interactive"});Os(F.audioWorklet,location.href);const Z=ss(),he={},Bs=dt,bn=new Map,W=new hs(F,{restore:t=>Z.channels[t],fx:t=>{const e=Tn(F,{moduleUrl:Zt,bpm:120,state:qo(t,Z)});return he[t]=e,e},channelFx:t=>{kt.delete(t);const e=Tn(F,{moduleUrl:Zt,bpm:z.bpm(),slots:Bs,state:Z.channelFx[t]??{v:2,chain:[]}}),n=wa(e,z.clock,{mapper:et}),i=e.dispose.bind(e);return e.dispose=()=>{n(),i()},e.onChange(Tt),bn.set(t,e),e}});W.setMaster(Z.master);W.setReturn("a",Z.returns.a);W.setReturn("b",Z.returns.b);W.setInsert(Z.insert.on);const et=new Fi(F);et.start();const ii=xs();let ri=()=>{};const js=Ko(F,{nodeFor:t=>W.tapNode(t),sources:()=>[{id:"master",name:"Master"},...W.list().map(t=>({id:t.id,name:t.name}))],ready:new Promise(t=>{ri=t})}),me=ms();window.ncStudio=Uo(F,W,{grab:js,play:me,mapper:Jo(et),resolve:(t,e)=>Ds(t,e),syncScope:ii,fxWorklet:new URL(Zt,location.href).href});const z=Ss(()=>F.state,ks(ii));function Ie(){try{return globalThis.localStorage??null}catch{return null}}z.setTempo(Ns(Ie()));const pt=new ws(W.recordOut.stream);let st=null;function C(t,e={},...n){const i=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||i.setAttribute(r,o===!0?"":String(o));return i.append(...n),i}const Ve=C("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Re=C("input",{type:"number",class:"bpm",min:Q[0],max:Q[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),$t=C("output",{class:"position","aria-label":"Bar and beat"},"—"),re=C("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),He=C("a",{class:"take",hidden:!0}),yn=C("span",{class:"status",role:"status"}),Ee=C("input",{type:"text",class:"scene-name",maxlength:60,value:Is(Ie()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),oi=C("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),si=C("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),li=C("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),Ye=C("input",{type:"file",accept:".json,application/json",hidden:!0}),Ps=C("h1",{class:"brand"},C("span",{},"NetComposer ",C("span",{},"Studio"))),tn=C("span",{class:"beat-light","aria-hidden":"true"}),wn=C("span",{class:"status-long"}),vn=C("span",{class:"status-short"});yn.append(wn,vn);const nn=C("header",{class:"top"},C("div",{class:"transport"},Ve,C("label",{class:"tempo"},Re,C("span",{class:"tempo-unit"},"BPM")),tn,$t),C("div",{class:"record"},re,He),yn),Ws=C("div",{class:"scene",role:"group","aria-label":"Scene"},Ee,oi,si,li,Ye);pt.supported||(re.disabled=!0,re.title="This browser can't record audio");const ze=C("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),ci=C("div",{class:"stage"}),tt=C("label",{class:"tab tab-add",title:"Add an instrument"},C("span",{"aria-hidden":"true"},"+")),Ce=C("select",{class:"tab-add-select","aria-label":"Add an instrument"});Ce.append(C("option",{value:""},"Add an instrument"),...hn.map(t=>{const e=C("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));Ce.addEventListener("change",()=>{const t=Ce.value;Ce.value="",t&&mi(t)});tt.append(Ce);ze.append(tt);const qe=C("div",{class:"spine","aria-hidden":"true"}),fe=new Map;let R=Yo(Do(ee),ee),ce=R[0]?.id??"";const Fs=new URLSearchParams(location.search).has("measure"),oa=new Map,Gs=2e4;function di(t){const e=C("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>le(t.id)),ze.insertBefore(e,tt);const i=(oa.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!R.some(c=>c.id===t.id))return r();const o=C("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:Go(t,Fs),allow:"autoplay; clipboard-read; clipboard-write; microphone"});fe.set(t.id,o);const s=window.setTimeout(r,Gs);o.addEventListener("load",()=>Hs(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),ci.append(o),le(ce)}));return oa.set(t.type,i),i}function Hs(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="";const n=t.id.replace(/^panel-/,""),i=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const c=e?.querySelector(".nc-page-hd, .nc-title-band");c&&(pi.set(n,Math.round(c.getBoundingClientRect().bottom)),n===ce&&hi())};i();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(()=>{i(),Mt()}).observe(r),$n.add(t),ui(t)}const $n=new Set;function ui(t){let e;try{e=t.contentDocument?.documentElement}catch{return}if(!e||!t.isConnected){$n.delete(t);return}const n=t.getBoundingClientRect();if(n.height<=0)return;const i=getComputedStyle(nn).position==="sticky"?nn.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,i-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));e.style.setProperty("--nc-host-top",`${Math.round(r)}px`),e.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),e.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let Ht=!1;function Mt(){Ht||(Ht=!0,requestAnimationFrame(()=>{Ht=!1;for(const t of $n)ui(t)}))}window.addEventListener("scroll",Mt,{passive:!0});window.addEventListener("resize",Mt);const pi=new Map;function hi(){const t=pi.get(ce);t===void 0?qe.style.removeProperty("--spine-top"):qe.style.setProperty("--spine-top",`${t}px`)}function _s(t){if(!t){qe.replaceChildren();return}const e=zs(t),n=C("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),qe.replaceChildren(C("span",{class:"spine-text"},n,C("span",{class:"spine-rest"},e.rest)))}function le(t){ce=t,_s(R.find(e=>e.id===t)),hi(),Mt();for(const e of R){const n=e.id===t;fe.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const Ds=Zo(()=>R.map(t=>({instance:t,window:()=>fe.get(t.id)?.contentWindow,readyState:()=>{try{return fe.get(t.id)?.contentDocument?.readyState}catch{return}}})),ee);function mi(t){const e=ee.find(r=>r.id===t);if(!e)return;const n=Ho(R,e),i=R.map(r=>r.type).lastIndexOf(n.type);R=i<0?[...R,n]:[...R.slice(0,i+1),n,...R.slice(i+1)],Je(R),di(n);for(const r of R){const o=document.getElementById(`tab-${r.id}`);o&&ze.insertBefore(o,tt)}le(n.id),be?.render()}function Ys(t,e){const n=R.find(o=>o.id===t);if(!n)return;const i=R.filter(o=>o.id!==t),r=e===null?i.length:i.findIndex(o=>o.id===e);R=[...i.slice(0,r<0?i.length:r),n,...i.slice(r<0?i.length:r)],Je(R);for(const o of R){const s=document.getElementById(`tab-${o.id}`);s&&ze.insertBefore(s,tt)}be?.render()}async function Zs(t,e){const i=R.find(s=>s.id===t)?.name??t;if(!await ln({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;R=R.filter(s=>s.id!==t),Je(R);const o=fe.get(t);fe.delete(t),o?.setAttribute("src","about:blank"),o?.remove(),document.getElementById(`tab-${t}`)?.remove(),W.detach(t),Xs(t),ce===t&&le(R[0]?.id??"")}const an=C("div",{class:"mix"});an.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==ce&&R.some(i=>i.id===n)&&le(n)});let be=null,rn=0;const kt=new Set;function Xs(t){kt.add(t),delete Z.channels[t],delete Z.channelFx[t],bn.delete(t),Tt()}let fi=!1;function Tt(){window.clearTimeout(rn),!fi&&(rn=window.setTimeout(()=>{Ja(gi())},300))}function gi(){const t={...Z.channels};for(const i of W.list())t[i.id]=i.strip;for(const i of kt)delete t[i];const e={};for(const i of["a","b","insert"]){const r=he[i];r&&(e[i]=r.getState())}const n={...Z.channelFx};for(const[i,r]of bn)n[i]=r.getState();for(const i of kt)delete n[i];return{v:1,channels:t,master:W.masterPositionValue,returns:{a:{on:W.returns.a.on,level:W.returns.a.level},b:{on:W.returns.b.on,level:W.returns.b.level}},insert:{on:W.insertEnabled},fx:e,channelFx:n}}W.onChange(()=>{be?.render(),Tt()});for(const t of Object.values(he))t?.onChange(Tt);async function bi(){F.state!=="running"&&await F.resume()}Ve.addEventListener("click",()=>{bi(),z.running()&&me.owner()===fn?z.stop():z.running()?me.claimAll():(me.claimAll(),z.play()),ye()});function yi(){const t=Number(Re.value);z.setTempo(t),ni(z.bpm(),Ie())}Ee.addEventListener("change",()=>{Ee.value=ge(Ee.value),ai(Ee.value,Ie())});function Us(t,e,n){const i=URL.createObjectURL(new Blob([e],{type:n})),r=C("a",{href:i,download:t});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}oi.addEventListener("click",()=>{const t=ge(Ee.value),e=Ms({name:t,bpm:z.bpm(),instances:R,mix:gi()});Us(Cs(t),`${JSON.stringify(e,null,2)}
`,"application/json"),vi(`Saved “${t}”`)});si.addEventListener("click",()=>Ye.click());Ye.addEventListener("change",async()=>{const t=Ye.files?.[0];if(Ye.value="",!t)return;const e=Ts(await t.text(),ee.filter(r=>r.available!==!1).map(r=>r.id));if(!e.ok){vi(e.error);return}const n=e.scene;await ln({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, mix and tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&wi({name:n.name,bpm:n.tempo.bpm,ids:n.instances.map(r=>r.id),mix:n.mix})});li.addEventListener("click",async()=>{await ln({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&wi({name:gn,bpm:vt,ids:Xe(ee).map(e=>e.id),mix:Ue()})});function wi(t){z.running()&&z.stop(),fi=!0,window.clearTimeout(rn);const e=t.ids.map(n=>{const[i,r]=n.split("#"),o=ee.find(s=>s.id===i);return o?Ke(o,r?Number(r):1):null}).filter(n=>n!==null);Je(e),Ja(t.mix),ni(t.bpm,Ie()),ai(t.name,Ie()),location.reload()}let sa=0;function vi(t){wn.textContent=t,vn.textContent=t,window.clearTimeout(sa),sa=window.setTimeout(ye,4e3)}Re.addEventListener("change",yi);Re.addEventListener("keydown",t=>{t.key==="Enter"&&yi()});re.addEventListener("click",async()=>{if(bi(),pt.recording){const t=await pt.stop();re.setAttribute("aria-pressed","false"),re.textContent="Rec",t&&(st&&URL.revokeObjectURL(st.url),st={url:URL.createObjectURL(t.blob),take:t},He.href=st.url,He.download=t.name,He.textContent=`Save take (${t.seconds.toFixed(1)} s)`,He.hidden=!1)}else pt.start(),re.setAttribute("aria-pressed","true"),re.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),Ve.click())});ze.addEventListener("keydown",t=>{if(t.target===Ce)return;const e=R.map(r=>r.id),n=e.indexOf(ce),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),le(i),document.getElementById(`tab-${i}`)?.focus())});function ye(){const t=z.running()&&me.owner()===fn;Ve.textContent=t?"Stop":"Play",Ve.setAttribute("aria-pressed",String(t)),document.activeElement!==Re&&(Re.value=String(Math.round(z.bpm()*10)/10));const e=z.position();$t.value=e?`${e.bar}.${e.beat}`:"—";const n=z.peers().length;wn.textContent=F.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",vn.textContent=F.state==="running"?"":"Audio off",yn.classList.toggle("off",F.state!=="running")}z.clock.onChange(()=>{z.running()||me.clear(),ye()});me.onChange(ye);z.clock.onChange(()=>be?.render());z.peer.onPeers(ye);F.addEventListener("statechange",ye);const Vs=.25;let la=performance.now();function $i(t){const e=Math.min(.1,(t-la)/1e3);la=t,be?.frame(e);const n=z.position(),i=n?`${n.bar}.${n.beat}`:"—";$t.value!==i&&($t.value=i);const r=z.beatPhase(),o=r!==null&&r<Vs;tn.hasAttribute("data-on")!==o&&tn.toggleAttribute("data-on",o),requestAnimationFrame($i)}async function qs(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Ps,nn,Ws,an,C("main",{class:"instruments"},ze,C("div",{class:"bay"},qe,ci))),be=us(an,W,{order:()=>R.map(e=>e.id),catalogue:hn,bpm:()=>z.bpm(),onAdd:mi,onRemove:(e,n)=>void Zs(e,n),onReorder:(e,n)=>Ys(e,n)}),F.state==="running"&&await F.suspend(),await F.audioWorklet.addModule(Rs),ri(),await z.start();for(const e of[he.a,he.b,he.insert])e&&wa(e,z.clock,{mapper:et});for(const e of R)di(e);le(ce),ye(),requestAnimationFrame($i),document.documentElement.dataset.studioReady=""}window.__studio={ctx:F,mixer:W,mapper:et,transport:z,frames:fe,show:le,get instances(){return R},fx:he,get mix(){return be}};qs();
