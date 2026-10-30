(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const ce=1e-9;function sa(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class St{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return sa(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+ce&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of i){if(s.beat<=e.beat+ce)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+ce){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-ce;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,o=.25){const r=this.bpmAt(n);if(!(i>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new St({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+ce)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+ce)return n[i];return n[0]}}const la=Object.freeze({beatsPerBar:4,beatUnit:4}),pe=1e-9;function ca(t){return Math.floor(t+pe)}function fn(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-pe)*e;return n&&o<=t+pe?o+e:o}class da{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new St({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??la}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-pe&&(this.stopTime===null||e<this.stopTime-pe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-pe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=ca(e/n),o=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return fn(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const gn="nc-clock/snapshot",bn=1;function ua(t,e="local"){return{format:gn,version:bn,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function pa(t,e){const n=ma(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const X=t=>typeof t=="number"&&Number.isFinite(t),Nt=t=>t===null||X(t);function ma(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==gn&&n("format"),(!X(e.version)||Math.floor(e.version)!==bn)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!X(e.anchor.beat)||!X(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&X(i.beat)&&X(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!X(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!X(e.meter.beatUnit))&&n("meter"),(!Nt(e.startTime)||!Nt(e.stopTime)||!X(e.stoppedBeat))&&n("transport times"),e}class ha{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new da(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){pa(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return ua(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const fa="nc-sync/1",ga=1,ba="nc-sync",ya="nc-sync-leader",wa=0,yn=.5,wn=.75;function va(t){return typeof t=="number"&&Number.isFinite(t)&&t>=yn&&t<=wn?t:null}const tt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),be=t=>typeof t=="number"&&Number.isFinite(t),Ie=t=>typeof t=="string"&&t.length>0;function $a(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==ga||!Ie(e.type)||!Ie(e.from)||!be(e.term)||!be(e.seq)||!be(e.sentAt))return null;switch(e.type){case"hello":return Ie(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return be(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&be(e.slot)?e:null;case"ping":case"pong":return Ie(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ka(t,e,n,i,o){return{proto:fa,from:e,term:n,seq:i,sentAt:o,...t}}function Ce(){return(performance.timeOrigin+performance.now())/1e3}const nt=.003,xa=3,Sa=.01,Rt=500;class Aa{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Sa:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=nt&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const o=n-(this.timeOrigin+i)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(i&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<c.length;f++)p.push(c[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,d=e-n;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,s={stepSeconds:e-n,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let r=0;r<i;r++){const s=e[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=i>>1;return i%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=nt&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Rt)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=nt)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Rt)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(xa,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(o)&&o>0?o:null}}class La{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...tt,...e.capabilities},this.channelOption=e.channel??ba,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??fn(d,1),d);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(wn,Math.max(yn,e)):wa;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=va(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=$a(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...tt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...tt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ya,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==o[0]?i[0]<o[0]:i[1]!==o[1]?i[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const o=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>o&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ka(e,this.id,this.term,++this.seq,this.o.now()))}}const Ma="modulepreload",Ea=function(t){return"/studio/"+t},zt={},Ta=function(e,n,i){let o=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");o=s(n.map(c=>{if(c=Ea(c),c in zt)return;zt[c]=!0;const p=c.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const b=document.createElement("link");if(b.rel=p?"stylesheet":Ma,p||(b.as="script"),b.crossOrigin="",b.href=c,d&&b.setAttribute("nonce",d),document.head.appendChild(b),p)return new Promise((g,h)=>{b.addEventListener("load",g),b.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var Ia=1,Ca=4.9,At=["drive","delay","plate"],Na=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],jt=function(t){return(t>0?"+":t<0?"−":"")+Math.abs(t)+" dB"},Ne=function(t){return t+"%"},at=function(t){return t+"% wet"},it=function(t){return(t>0?"+":t<0?"−":"")+Math.abs(t)+"%"};function T(t,e,n,i,o,r){return{key:t,label:e,min:n,max:i,step:1,default:o,format:r}}function Bt(t,e){return Math.min(Ca,t*60/(e>0?e:120))}var me=[{type:"drive",label:"Drive",dials:[Object.assign(T("drive_db","Drive",0,24,0,function(t){return t===0?"clean":jt(t)}),{stepWhen:[{key:"curve",value:1,step:.1}]}),T("output_db","Output",-12,12,0,jt),T("mix","Mix",0,100,100,at),{key:"curve",label:"Curve",min:0,max:1,step:null,default:0,options:[{value:0,label:"Smooth"},{value:1,label:"Acid"}],format:function(t){return t===1?"Acid":"Smooth"}},T("tone","Tone",0,100,100,function(t){return t>=100?"off":Math.round(500*Math.pow(2,5*t/99))+" Hz"}),T("mod_drive","Accent → drive",-100,100,0,it),T("mod_tone","Accent → tone",-100,100,0,it)]},{type:"delay",label:"Delay",tempoSynced:!0,dials:[{key:"delay_beats",label:"Timing",min:.125,max:2,step:null,default:.75,overriddenBy:"beats_free",options:Na.map(function(t){return{value:t[0],label:t[1]}}),format:function(t,e){return Math.round(Bt(t,e)*1e3)+" ms"}},T("feedback","Feedback",0,90,35,Ne),T("mix","Wet/dry",0,100,0,at),T("tone","Tone",0,100,100,function(t){return t>=100?"off":Math.round(800*Math.pow(2,4*t/99))+" Hz"}),Object.assign(T("low_cut","Low cut",0,1e3,0,function(t){return t===0?"off":t+" Hz"}),{curve:"log"}),{key:"mode",label:"Mode",min:0,max:1,step:null,default:0,options:[{value:0,label:"Insert"},{value:1,label:"Send"}],format:function(t){return t===1?"Send":"Insert"}},T("send","Send",0,100,100,Ne),T("mod_send","Accent → send",-100,100,0,it),Object.assign(T("beats_free","Free time",0,2,0,function(t,e){return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Bt(t,e)*1e3)+" ms"}),{step:.001,exact:!0,minOn:.125})]},{type:"plate",label:"Reverb",dials:[T("predelay","Pre-delay",0,200,0,function(t){return t+" ms"}),T("size","Size",0,100,50,function(t){return(.5+t/100).toFixed(2)+"×"}),T("decay","Decay",0,100,50,Ne),T("damping","Damping",0,100,0,Ne),T("mix","Mix",0,100,0,at)]}],Ra={reverb:"plate"};function Ge(t){var e=Ra[t]||t;return At.indexOf(e)>=0?e:null}function _e(t){for(var e=Ge(t),n=0;n<me.length;n++)if(me[n].type===e)return me[n];return null}function za(t,e){var n=_e(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function pt(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Pe(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(i-e)&&(i=t.options[o].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function ja(){return{v:Ia,chain:me.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function ot(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ba(t){for(var e=Array.isArray(t)?t:ot(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=ja(),o={},r=[],s=0;s<e.length;s++){var l=e[s];if(ot(l)){var d=Ge(l.type);if(!d){typeof l.type=="string"&&r.push(l.type);continue}if(o[d]){r.push(d);continue}o[d]=!0;var c=i.chain[At.indexOf(d)],p=ot(l.dials)?l.dials:{};d==="delay"&&p.mix===void 0&&p.wet!==void 0&&(p=Object.assign({},p,{mix:p.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,_e(d).dials.forEach(function(f){c.dials[f.key]=Pe(f,p[f.key])}),Oa(d,c.dials,p)}}return{state:i,dropped:r}}function Oa(t,e,n){for(var i=_e(t),o=0;o<i.dials.length;o++){var r=i.dials[o];r.stepWhen&&(e[r.key]=Pe(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],pt(r,e)))}}function Ze(t){return Ba(t).state}function Wa(t){return JSON.parse(JSON.stringify(t))}var Ga=24,mt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function ht(t,e,n){if(e==="bypass")return n?0:1;switch(t){case"drive":return e==="mix"||e==="mod_drive"||e==="mod_tone"?n/100:e==="tone"?n/99:n;case"delay":return e==="delay_beats"||e==="low_cut"||e==="mode"||e==="beats_free"?n:e==="tone"?n/99:n/100;case"plate":return e==="predelay"?n/1e3:n/100}return 0}var Pa={};me.forEach(function(t){t.dials.forEach(function(e){Pa[t.type+"."+e.key]=e.format})});function rt(t,e){var n=new Float64Array(Ga),i=Ze(t);return i.chain.forEach(function(o){var r=mt[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=ht(o.type,s,o.dials[s])})}),n}var Za="nc-fx@1",Ya=600,Fa=256,ye=typeof WeakMap=="function"?new WeakMap:null;function Da(t,e){var n=ye&&ye.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Ta(async()=>{const{default:r}=await import("./worklet-source-CPTm0TPz.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),ye&&(ye.set(t,n),n.catch(function(){ye.delete(t)})),n)}function de(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Ha(t,e){var n=e||{},i=Ze(n.state),o=Math.min(400,Math.max(20,de(n.bpm,120))),r=Array.from(rt(i)),s=o,l=[],d=n.limiter==="soft"||n.limiter==="lookahead"?n.limiter:"off",c=n.bypassMode==="hold"?"hold":"run",p=de(n.preGain,1),f=Math.max(0,de(n.crossfade,.012)),b=de(n.maxDelaySeconds,void 0),g=t.createGain(),h=t.createGain(),y=t.createGain(),u=t.createGain(),m=null;n.modInput===!0&&(m=t.createGain(),m.channelCount=1,m.channelCountMode="explicit",m.channelInterpretation="discrete"),u.gain.value=0,g.connect(y),y.connect(h),u.connect(h);var w=null,v="loading",L=null,k=!1,S=[];function A(x){w?w.port.postMessage(x):k||(l.length>=Fa&&(l=[{t:"load",program:Array.from(rt(i)),when:0},{t:"tempo",bpm:o,when:0}]),l.push(x))}function Z(x){var $=l.map(function(M){var E=Object.assign({},M);return E.when>x||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return l=[],$}function W(x){for(var $=0;$<S.length;$++)try{S[$](x)}catch(M){typeof console<"u"&&console.error(M)}}function G(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0}var Q=!1;function D(x){return typeof x=="number"&&x>t.currentTime+Ya?(!Q&&typeof console<"u"&&(Q=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1}var Ee=Da(t,n.moduleUrl).then(function(){if(!k){w=new AudioWorkletNode(t,Za,{numberOfInputs:m?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:{program:r,bpm:s,bypassMode:c,limiter:d,preGain:p,maxDelaySeconds:b,pending:Z(t.currentTime)}}),g.connect(w),m&&m.connect(w,0,1),w.connect(u);var x=t.currentTime;x<=0||f===0?(y.gain.value=0,u.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+f),u.gain.setValueAtTime(0,x),u.gain.linearRampToValueAtTime(1,x+f)),v="ready"}},function(x){v="unavailable",l=[],L=x});function ge(x){return i.chain[At.indexOf(x)]}var Qe={input:g,output:h,modInput:m,ready:Ee,get status(){return v},get error(){return L},latencySamples:d==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,setParam:function(x,$,M,E){var N=Ge(x);if(!(!N||k||D(E))){var P=ge(N),ee;if($==="bypass")ee=!!M;else{var et=za(N,$);if(!et)return;ee=Pe(et,M,pt(et,P.dials))}return $==="bypass"?P.bypass=ee:P.dials[$]=ee,A({t:"p",i:mt[N][$],v:ht(N,$,ee),when:G(E)}),W({effect:N,key:$,value:ee}),_e(N).dials.forEach(function(H){if(!(!H.stepWhen||!H.stepWhen.some(function(ra){return ra.key===$}))){var Ct=P.dials[H.key],Te=Pe(H,Ct,pt(H,P.dials));Te!==Ct&&(P.dials[H.key]=Te,A({t:"p",i:mt[N][H.key],v:ht(N,H.key,Te),when:G(E)}),W({effect:N,key:H.key,value:Te}))}}),ee}},getParam:function(x,$){var M=Ge(x);if(M){var E=ge(M);return $==="bypass"?E.bypass:E.dials[$]}},getState:function(){return Wa(i)},setState:function(x,$){k||D($&&$.at)||(i=Ze(x),A({t:"load",program:Array.from(rt(i)),when:G($&&$.at)}),W({effect:null,key:null,value:null}))},setTempo:function(x,$){var M=de(x,NaN);!(M>0)||k||D($)||(o=Math.min(400,Math.max(20,M)),A({t:"tempo",bpm:o,when:G($)}),W({effect:null,key:"tempo",value:o}))},getTempo:function(){return o},clear:function(x){var $=x&&typeof x=="object"?x:{at:x};if(!(k||D($.at))){var M=de($.fadeMs,0);A({t:"clear",when:G($.at),fadeMs:M>0?Math.min(1e3,M):0})}},onChange:function(x){return S.push(x),function(){var $=S.indexOf(x);$>=0&&S.splice($,1)}},dispose:function(){if(!k){if(k=!0,v="disposed",l=[],S.length=0,w){w.port.postMessage({t:"dispose"}),w.port.close();try{w.disconnect()}catch{}}[g,y,u,h,m].forEach(function(x){try{x&&x.disconnect()}catch{}})}}};return Qe}function Ot(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Xa(t,e,n){var i=n||{},o=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,r=typeof i.toAudioTime=="function"?i.toAudioTime:o?function(b){return o.toContextTime(b)}:e&&e.timebase==="shared"?null:function(b){return b},s=typeof i.now=="function"?i.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,d=l&&l.tempo?l.tempo:l,c=!1;function p(b){if(!r){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof b!="number")){var g=r(l.timeAt(b));return typeof g=="number"&&isFinite(g)?g:void 0}}function f(){var b=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(b)){var g=l&&typeof l.bpm=="number"?l.bpm:Ot(d,0);g>0&&t.setTempo(g);return}var h=Ot(d,b);h>0&&t.setTempo(h);for(var y=d&&(d.points||d.tempoPoints)||[],u=0;u<y.length;u++){var m=y[u];if(m.beat>b&&m.bpm>0){var w=p(m.beat);w!==void 0&&t.setTempo(m.bpm,w)}}}return f(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(b){b&&(b.kind==="tempo"&&b.bpm>0?t.setTempo(b.bpm,p(b.atBeat)):(b.kind==="snapshot"||b.kind==="start")&&f())})}const _a="/studio/assets/worklet-DIGstQOf.js";var Va="nc-ui",vn={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},ft={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ae={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},ve=t=>`--${Va}-${t}`,gt=vn["label-on-fill-dark"],Wt=vn["label-on-fill-light"],Ua=ae["label-min-contrast"],qa=/^#[0-9a-f]{6}$/i,Ka=t=>typeof t=="string"&&qa.test(t),Be=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Gt(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Be(o(0)*255)}${Be(o(8)*255)}${Be(o(4)*255)}`}function $n(t){let[e,n,i]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),o=Math.max(e,n,i),r=Math.min(e,n,i),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-i)/l%6):o===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:s}}function Pt(t){let[e,n,i]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function bt(t,e){let[n,i]=[Pt(t),Pt(e)].sort((o,r)=>r-o);return(n+.05)/(i+.05)}var Ye=t=>bt(t,gt)>=bt(t,Wt)?gt:Wt;function kn(t,e,n,i=Ua){let o=Gt(t,e,n),r=Ye(o)===gt?1:-1;for(let s=0;s<40&&bt(o,Ye(o))<i;s++)n+=r*.01,o=Gt(t,e,n);return o}function Ja(t){let{h:e,s:n}=$n(t),i=kn(e,Math.min(n,ae["surprise-on-max-saturation"]),ae["surprise-on-lightness"]);return{fill:t,ink:Ye(t),on:i,onInk:Ye(i)}}var Qa=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function ei(t,e=Math.random){let[n,i]=ae["surprise-saturation"],[o,r]=ae["surprise-lightness"],s=ae["surprise-min-hue-gap"],l=Ka(t)?$n(t).h:null,d=e()*360;return l!==null&&Qa(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),kn(d,n+e()*(i-n),o+e()*(r-o))}function ti(t){if(!t)return null;let e=Ja(t);return{[ve("surprise-fill")]:e.fill,[ve("surprise-ink")]:e.ink,[ve("surprise-on")]:e.on,[ve("surprise-on-ink")]:e.onInk}}var ni=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,ai=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Zt(t){let[e,n,i]=[1,3,5].map(l=>ni(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function ii([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*o+.2309699292*r,-1.2684380046*i+2.6097574011*o-.3413193965*r,-.0041960863*i-.7034186147*o+1.707614701*r].map(s=>Be(ai(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var oi=ae["velocity-range"],xn={min:ft.rhythm["velocity-min"],max:ft.rhythm["velocity-max"]};function ri(t,e=xn){let[n,i]=oi,o=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,r=(o-n)/(i-n),s=ft.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=Zt(e.min),d=Zt(e.max);return{velocity:o,t:r,fill:ii(l.map((c,p)=>c+(d[p]-c)*r)),ink:s}}function Yt(t,e=xn){return{[ve("velocity-fill")]:ri(t,e).fill}}var si={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},li={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ci={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},di={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ve={};for(let[t,e]of Object.entries(li))Ve[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(di))Ve[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(ci))Ve[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(si.renames.map(t=>[t.old,t.new]));function Sn(t){let e=Ve[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function O(t){return Sn(t).prop}function a(t){return`var(${O(t)})`}function ui(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(O(e)));return Number.isFinite(n)?n:0}function Y(t,e){let n=Sn(e),i=t.ownerDocument??document,o=i.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:i.documentElement).append(o);let s=(i.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function pi(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function mi(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var hi="[data-modulated], [data-modulated] *";function fi(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${O("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${O("divider")}: ${a(`module-div-stack-${i}`)};
      ${O("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${O("text-sub")}: ${a("module-sub-stack-1")};
      ${O("divider")}: ${a("module-div-stack-1")};
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
${hi} { transition: none; }
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
  ${O("text-sub")}: ${a("module-sub-stack-1")};
  ${O("divider")}: ${a("module-div-stack-1")};
  ${O("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${O("text-sub")}: inherit;
  ${O("divider")}: inherit;
  ${O("slider-track")}: inherit;
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
`}var st=null,gi="nc-ui-fallback";function An(t=globalThis.document){if(!t?.documentElement||(t.documentElement,st&&st.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${gi} {
${fi()}
}
`,t.head.append(e),st=e}var we=null,bi=0,yi=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Ln=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=yi,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Ln(document);function wi({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:o=!1,root:r,returnFocus:s,signal:l}){if(we||l?.aborted)return Promise.resolve(!1);let d=r?.ownerDocument??document,c=Ln(d),p=r??d.body,f=d.defaultView??globalThis,b=`nc-ui-confirm-${++bi}`,g=($,M,E)=>{let N=d.createElement($);return N.className=`nc-ui-confirm${M}`,E!=null&&(N.textContent=E),N},h=g("div","-layer");h.dataset.state="enter";let y=g("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${b}-t`),y.setAttribute("aria-describedby",`${b}-b`);let u=g("h2","-title",t);u.id=`${b}-t`;let m=g("p","-body",e);m.id=`${b}-b`;let w=g("div","-actions"),v=($,M)=>{let E=g("button","-btn",$);return E.type="button",E.dataset.ncConfirm=M,E.addEventListener("click",()=>x(M==="ok")),E},L=v(i,"cancel"),k=v(n,"ok");o&&(k.dataset.danger="true"),w.append(L,k),y.append(u,m,w),h.append(y);let S={layer:h};we=S;let A=s??d.activeElement,Z=[];for(let $ of p.children)$.hasAttribute("inert")||($.setAttribute("inert",""),Z.push($));let W=()=>{if(we!==S)return;p.append(h),L.focus({preventScroll:!0});let $=f.requestAnimationFrame?.bind(f)??(M=>setTimeout(M,16));$(()=>$(()=>{h.dataset.state==="enter"&&(h.dataset.state="open")}))};c?c.then(W):W();let G=!1;h.addEventListener("pointerdown",$=>{G=$.target===h}),h.addEventListener("click",$=>{$.target===h&&G&&x(!1),G=!1});let Q=$=>{$.stopImmediatePropagation(),$.key==="Escape"?($.preventDefault(),x(!1)):$.key==="Tab"?($.preventDefault(),(d.activeElement===L?k:L).focus()):$.key==="Enter"&&($.preventDefault(),d.activeElement===k?x(!0):d.activeElement===L&&x(!1))},D=$=>$.stopImmediatePropagation();f.addEventListener("keydown",Q,!0),f.addEventListener("keyup",D,!0);let Ee=()=>x(!1);l?.addEventListener("abort",Ee);let ge,Qe=new Promise($=>{ge=$});function x($){if(we!==S)return;we=null,f.removeEventListener("keydown",Q,!0),f.removeEventListener("keyup",D,!0),l?.removeEventListener("abort",Ee);for(let P of Z)P.removeAttribute("inert");h.dataset.state="closing",A?.isConnected&&typeof A.focus=="function"&&A.focus({preventScroll:!0});let M=f.getComputedStyle?.(h),E=Math.max(0,...String(M?.transitionDuration??"").split(",").map(P=>Number.parseFloat(P)*(P.trim().endsWith("ms")?1:1e3)||0)),N=()=>h.remove();h.addEventListener("transitionend",P=>P.target===h&&N()),setTimeout(N,E+50),ge($)}return Qe}function Mn(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",i.append(o,r),n.append(i);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let d=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var En=new WeakMap,Ft=.25;function vi(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(i,o);let r=0,s=t.step??.005,l=t.onChange,d=t.onReset,c=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},f=u=>{let m=c(u);m!==r&&(r=m,p(),l?.(m))},b=0,g=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();u.target!==o&&m.height>0&&f(1-(u.clientY-m.top)/m.height),b=u.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!g)return;let m=n.getBoundingClientRect().height||1,w=(b-u.clientY)/m*(u.shiftKey?Ft:1);b=u.clientY,f(r+w)});let h=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",h),n.addEventListener("pointercancel",h),n.addEventListener("lostpointercapture",h),n.addEventListener("dblclick",u=>{u.preventDefault(),d?.()}),n.addEventListener("keydown",u=>{let m=u.shiftKey?s*Ft:s,w={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};u.key in w&&(u.preventDefault(),f(w[u.key]))});let y={el:n,get value(){return r},get dragging(){return g},set(u){g||(r=c(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(s=u.step),u.onChange&&(l=u.onChange),u.onReset&&(d=u.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),En.set(n,y),y}function $i(t){return En.get(t)}var Tn=new WeakMap,ki=.2,xi=1.5,Si=.5;function Ai(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function Dt(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:Ai(i.getComputedStyle(t).getPropertyValue(O(e)),n)}function Li(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let u=e.createElement("span");u.className="nc-meter-bar";let m=e.createElement("span");m.className="nc-meter-peak";let w=e.createElement("span");w.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",u.append(m,w,v),r.append(u),s.push({peak:m,rms:w,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(o,r);let l=t.label,d=t.onClear,c=!1,p=-1,f=-1,b=()=>{o.dataset.lit=c?"true":"false",o.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),o.title=c?"Clipped. Click to clear":"Clip light"},g=(y,u,m,w)=>{let v=Math.round(w*1e3)/1e3;m[u]!==v&&(m[u]=v,y.style.transform=u==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{h.clear(),d?.()});let h={el:i,get clipped(){return c},update(y,u){p<0&&(p=Dt(i,"motion-meter-fall",ki)),f<0&&(f=Dt(i,"motion-meter-hold",xi));let m=Math.max(0,Math.min(.25,Number(u)||0)),w=p>0?Math.exp(-m/p):0;s.forEach((v,L)=>{let k=y[L]??y[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(k.peak)||0)),A=Math.min(S,Math.max(0,Number(k.rms)||0));k.over&&h.clip(),v.level.peak=S>=v.level.peak?S:S+(v.level.peak-S)*w,v.level.rms=A>=v.level.rms?A:A+(v.level.rms-A)*w,v.holdAge+=m,S>=v.holdAt?(v.holdAt=S,v.holdAge=0):v.holdAge>f&&(v.holdAt=Math.max(S,v.holdAt-Si*m)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,b()},configure(y){y.onClear&&(d=y.onClear)}};return b(),h.reset(),Tn.set(i,h),h}function In(t){return t?Tn.get(t):void 0}function Mi(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(n*i));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function lt(t){return Math.max(0,Math.min(1,t))}function Cn(t,e){let{ctx:n,w:i,h:o}=Mi(t);if(!n)return;n.clearRect(0,0,i,o);let r=mi(t);if(e.paint==="swatch"){let d=Y(t,"accent"),c=Y(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,i/2,o),n.fillStyle=c,n.fillRect(i/2,0,i/2,o);return}if(e.paint==="filter"){let d=e.mode??"lp",c=Y(t,pi(d)),p=Y(t,"divider"),f=lt(e.cutoff??.5),b=.08+(1-lt(e.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(i,o*.72),n.stroke(),n.beginPath();for(let g=0;g<=i;g++){let h=g/Math.max(1,i),y=0;d==="lp"?y=h<f?1:Math.max(0,1-(h-f)/b):d==="hp"?y=h>f?1:Math.max(0,1-(f-h)/b):y=Math.max(0,1-Math.abs(h-f)/b);let u=o*.78-y*o*.62;g===0?n.moveTo(g,u):n.lineTo(g,u)}n.strokeStyle=c,n.stroke(),n.fillStyle=Y(t,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,o),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=Y(t,"accent"),n.beginPath();let d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let p=c/Math.max(1,i),f=(o-4)*(1-Math.exp(-p*4/d));n.lineTo(c,o-f)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){let d=lt(e.level??0);n.fillStyle=Y(t,"divider"),n.fillRect(0,o*.4,i,o*.2),n.fillStyle=Y(t,"accent"),n.fillRect(0,o*.4,i*d,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=Y(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,i,o*.1),n.fillStyle=Y(t,"rhythm.playhead"),n.fillRect(l/s*i,o*.3,Math.max(1,i/s),o*.4),t.dataset.ncAccent=Y(t,"accent")}var Nn={slop:8,longPressMs:500,pitchPx:16},Ei=class{constructor(t,e,n=Nn){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Ti(t,e,n,i=Nn){let o=!1,r=0,s=(c,p)=>{let f=t.ownerDocument.elementFromPoint?.(c,p),b=[...t.querySelectorAll(e)],g=f?b.findIndex(u=>u===f||u.contains(f)):-1;if(g>=0)return g;let h=-1,y=Number.POSITIVE_INFINITY;return b.forEach((u,m)=>{if(u.hidden)return;let w=u.getBoundingClientRect();if(p<w.top||p>w.bottom)return;let v=Math.abs(c-(w.left+w.width/2));v<y&&v<=w.width&&(h=m,y=v)}),h},l=new Ei(s,c=>{(c.kind==="paint"||c.kind==="long")&&(o=!0),n(c)},i),d=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",c=>{c.button>0||(o=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{o&&(o=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}function B(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Ue(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(i,o),n}function Ht(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Se(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Ii=450,Xt=8;function q(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Ci(t){let e=ui(t,"target-min");return e>0?e:44}function Ni(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Ci(t),i=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,p=d-i,f=d+i,b=c-i,g=c+i;for(let h=0;h<e.length;h++){if(r===h)continue;let y=o[h];if(!y||y.width===0)continue;let u=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-c)<i*2&&(u>d?f=Math.min(f,(d+u)/2):u<d&&(p=Math.max(p,(d+u)/2))),Math.abs(u-d)<i*2&&(m>c?g=Math.min(g,(c+m)/2):m<c&&(b=Math.max(b,(c+m)/2)))}p=Math.min(p,l.left),f=Math.max(f,l.right),b=Math.min(b,l.top),g=Math.max(g,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${b-l.top}px`,s.style.width=`${Math.max(0,f-p)}px`,s.style.height=`${Math.max(0,g-b)}px`,s.style.transform="none"}}function Rn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function _t(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Fe(t,e){switch(t.type){case"slider":return Ri(t,e);case"select":return ji(t,e);case"toggle":return Bi(t,e);case"button":return Oi(t,e);case"readout":return Wi(t);case"label":return Gi(t);case"note":return Vt(t);case"knob":return Yi(t,e);case"choice":return Fi(t,e);case"slotRow":return Di(t,e);case"stepGrid":return Vi(t,e);case"canvas":return Ki(t);case"fx":return to(t,e);case"strip":return Ji(t,e);case"stripAdd":return eo(t,e);default:return Vt({id:"unknown",text:""})}}function K(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,zn(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??Se(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Ht(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Ht(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Pi(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??Se(e.value))}else if(e.type==="choice")jn(t,e);else if(e.type==="slotRow")On(t,e);else if(e.type==="stepGrid")yt(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Cn(n,e)}else if(e.type==="strip"){Zn(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${wt(n.id)}"]`);i instanceof Element&&K(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")Gn(t,e);else if(e.type==="fx"){Yn(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${wt(n.id)}"]`);i instanceof Element&&K(i,n)}}}}function Ri(t,e){let n=Ue(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{let r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});let o=n.querySelector("[data-nc-readout]");return n.insertBefore(i,o),t.onTap&&n.insertBefore(zi(t,i,e),o),n.append(B()),K(n,t),n}function zi(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(q());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),i}function ji(t,e){let n=Ue(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let o of t.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,i.append(r)}return i.value=t.value,i.addEventListener("change",()=>{let o=e(i);o?.type==="select"&&o.onChange(i.value)}),n.append(i,B()),n}function Bi(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(B()),K(n,t),n}function Oi(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(B()),K(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=Rn(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Wn(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,o),i}function Wi(t){let e=Ue(t.id,t.label);return e.append(B()),K(e,t),e}function Gi(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(B()),e}function Vt(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(B()),e}function Ut(t){if(typeof t.valueText=="string")return t.valueText;let e=Se(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function zn(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Pi(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;zn(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Ut(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Ut(e)}`}function Zi(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function Yi(t,e){let n=Ue(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",i.append(o);let r=0,s=0;i.addEventListener("pointerdown",d=>{r=d.clientY;let c=e(i);s=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let c=e(i);if(c?.type!=="knob")return;let p=c.max-c.min||1,f=Math.min(c.max,Math.max(c.min,s-(d.clientY-r)*p/120));c.onChange(f)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let c=e(i);if(c?.type!=="knob")return;let p=Zi(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(B()),K(n,t),n}function Fi(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=i.value,o.setAttribute("role","tab"),o.textContent=i.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(i.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let c=s[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(o)}return n.append(B()),jn(n,t),n}function jn(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Di(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let p=0;p<t.slots.length;p++){let f=t.slots[p],b=document.createElement("span");b.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(p),g.textContent=f.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(g,q()),Hi(b,g,n,p,e),i.append(b)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Rn(),o.append(q()),o.addEventListener("click",()=>{Wn(n);let p=e(n);p?.type==="slotRow"&&p.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=e(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...o?[o]:[]),n.append(c,r,B()),Bn(n,e),On(n,t),n}function qt(t,e,n,i){let o=n(t);if(o?.type!=="slotRow")return;$e(t);let r=i.shiftKey?"store":i.altKey?"clear":"recall";o.onSlot(e,r)}function Hi(t,e,n,i,o){let r=0,s=0,l=0,d=!1,c=!1,p=!1,f=!1,b=()=>{window.clearTimeout(r),r=0},g=m=>{let w=m.clientX-s,v=m.clientY-l;w*w+v*v>Xt*Xt&&(d=!0,b())},h=()=>{f&&(f=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",u))},y=m=>{let w=r!==0&&!d&&!c;b(),h(),w&&(p=!0,qt(n,i,o,m))},u=()=>{d=!0,b(),h()};t.addEventListener("pointerdown",m=>{m.button===0&&(h(),c=!1,d=!1,p=!1,s=m.clientX,l=m.clientY,b(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,Xi(n,e,i,o))},Ii),f=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",u))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(p||c||d){p=!1,c=!1,d=!1;return}qt(n,i,o,m)})}function Bn(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=Kt("Save","store"),o=Kt("Clear","clear");n.append(i,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),$e(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(t);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),$e(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),$e(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&$e(t)})}function Kt(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Xi(t,e,n,i){Bn(t,i);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function $e(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function On(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Wn(t){let e=t.dataset.ncLastFill||null,n=ei(e);t.dataset.ncLastFill=n;let i=ti(n);if(i)for(let[o,r]of Object.entries(i))t.style.setProperty(o,r)}function _i(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,o=r=>{if(i===r)return;i=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Vi(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let o=u=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,i.append(m),m},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=u=>{for(let m of[r,s]){let w=m===u;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(r);for(let u of[r,s])u.addEventListener("click",()=>l(u));i.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let m=s.getAttribute("aria-checked")==="true"?r:s;l(m),m.focus()});let d=document.createElement("div");d.className="nc-step-tools",d.append(i),t.onFill&&d.append(_i(n,e)),n.append(d);for(let u of t.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=u.label,w.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(w.dataset.ncLane=String((u.lane-1)%4+1)),w.addEventListener("click",()=>{let k=e(n);if(k?.type!=="stepGrid")return;let S=k.rows.findIndex(A=>A.id===u.id);k.onSelectRow?.(S)}),w.addEventListener("keydown",k=>Ui(n,w,k));let v=[];for(let k of["mute","solo"]){if(!(k==="mute"?t.onMute:t.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=k,A.textContent=k==="mute"?"M":"S",A.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${u.label}`),S.append(A,q()),S.addEventListener("click",()=>{let Z=e(n);if(Z?.type!=="stepGrid")return;let W=Z.rows.findIndex(G=>G.id===u.id);(k==="mute"?Z.onMute:Z.onSolo)?.(W)}),v.push(S)}let L=document.createElement("div");L.className="nc-steps";for(let k=0;k<u.steps.length;k++){let S=document.createElement("span");S.className="nc-step-wrap";let A=document.createElement("button");A.type="button",A.className="nc-step",A.dataset.ncStep=`${u.id}:${k}`,A.setAttribute("aria-label",`${u.label} step ${k+1}`),S.append(A,q()),S.addEventListener("click",Z=>{let W=e(n);if(W?.type!=="stepGrid")return;let G=W.rows.findIndex(D=>D.id===u.id),Q=s.getAttribute("aria-checked")==="true";W.onToggle(G,k,Z.shiftKey||Q)}),L.append(S)}if(t.onLength&&L.append(qi(n,L,u,e)),m.append(...v,w,L),t.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=u.id,k.setAttribute("aria-label",`Re-roll ${u.label}`),k.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=_t(),k.append(q()),k.addEventListener("click",()=>{let S=e(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(A=>A.id===u.id))}),m.append(k)}m.addEventListener("click",k=>{if(k.target!==m)return;let S=e(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(A=>A.id===u.id))}),Jt(n,L,".nc-step-wrap",e,s,()=>u.id),n.append(m)}let c=document.createElement("div");c.className="nc-pads-head";let p=(u,m,w)=>{let v=document.createElement("button");return v.type="button",v.className=u,v.textContent=m,w&&v.setAttribute("aria-label",w),v},f=p("nc-pads-step","‹","Previous lane"),b=p("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let u=e(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",yt(n,u))}));for(let[u,m]of[[f,-1],[b,1]])u.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let v=w.rows.length;w.onSelectRow?.(((Re(w)+m)%v+v)%v)});if(c.append(f,g,b),t.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=_t(),u.addEventListener("click",()=>{let m=e(n);if(m?.type!=="stepGrid")return;let w=Re(m);w>=0&&m.onDice?.(w)}),c.append(u)}if(t.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),c.append(u)}n.append(c);let h=document.createElement("div");h.className="nc-pads",h.setAttribute("role","group");let y=Math.max(0,...t.rows.map(u=>u.steps.length));for(let u=0;u<y;u++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",w=>{let v=e(n);if(v?.type!=="stepGrid")return;let L=Re(v);if(L<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(L,u+1);return}let k=s.getAttribute("aria-checked")==="true";v.onToggle(L,u,w.shiftKey||k)}),h.append(m)}return Jt(n,h,".nc-pad",e,s,()=>{let u=e(n);return u?.type==="stepGrid"?u.rows[Re(u)]?.id:void 0}),n.append(h),n.append(B()),yt(n,t),n}function Re(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Jt(t,e,n,i,o,r){let s="on",l=!0,d=-1,c=(p,f)=>{let b=p.rows[d]?.steps[f];!b||f>=p.rows[d].length||(p.onSet?p.onSet(d,f,s,l):!!b[s]!==l&&p.onToggle(d,f,s==="accent"))};Ti(e,n,p=>{let f=i(t);if(f?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(p.kind!=="paint")return;let b=f.rows.findIndex(g=>g.id===r());b>=0&&f.rows[b].length!==p.pad+1&&f.onLength?.(b,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let b=r();d=f.rows.findIndex(h=>h.id===b);let g=f.rows[d]?.steps[p.pad];if(!g)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}c(f,p.pad)}else if(p.kind==="long"){let b=r(),g=f.rows.findIndex(y=>y.id===b),h=e.querySelectorAll(n)[p.pad];g>=0&&h instanceof HTMLElement&&f.onLongPress?.(g,p.pad,h)}}})}function Ui(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],o=i.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=i.length-1;let s=i[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function qi(t,e,n,i){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(q());let r=c=>{let p=i(t);if(p?.type!=="stepGrid")return;let f=p.rows.findIndex(h=>h.id===n.id),b=p.rows[f];if(!b)return;let g=Math.max(1,Math.min(b.steps.length,c));g!==b.length&&p.onLength?.(f,g)},s=c=>{let p=[...e.querySelectorAll(".nc-step")],f=1;return p.forEach((b,g)=>{let h=b.getBoundingClientRect();h.width>0&&c>=h.left+h.width/2&&(f=g+1)}),f},l=c=>r(s(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete o.dataset.dragging};return o.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),o.addEventListener("keydown",c=>{let p=i(t);if(p?.type!=="stepGrid")return;let f=p.rows.find(g=>g.id===n.id);if(!f)return;let b={ArrowLeft:f.length-1,ArrowDown:f.length-1,ArrowRight:f.length+1,ArrowUp:f.length+1,Home:1,End:f.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),o}var ct=new WeakMap;function Qt(t,e){let n=typeof e=="number"?e:null;if(!(ct.has(t)&&ct.get(t)===n)){if(ct.set(t,n),n===null){for(let i of Object.keys(Yt(1)))t.style.removeProperty(i);return}for(let[i,o]of Object.entries(Yt(n)))t.style.setProperty(i,o)}}function yt(t,e){let n=e.rows.some(c=>c.solo),i=t.querySelector(".nc-pads"),o=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&o&&(r.textContent=s?`${o.label} · ${o.length}`:o.label,e.onLength&&(r.setAttribute("aria-pressed",s?"true":"false"),r.setAttribute("aria-label",s?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let l=t.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&o&&(l.setAttribute("aria-label",`Re-roll ${o.label}`),l.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!e.transport?.playing,p=e.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let f=e.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let c=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),b=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!b||!s&&f>=o.length,s&&f>=o.length?p.dataset.out="true":delete p.dataset.out,s&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}`),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,Qt(p,b?.velocity),e.playhead>=0&&f===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of e.rows){for(let b=0;b<c.steps.length;b++){let g=c.steps[b],h=t.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(h instanceof HTMLButtonElement))continue;let y=h.closest(".nc-row");if(y instanceof HTMLElement){e.selectedRow===c.id?y.dataset.selected="true":delete y.dataset.selected;let w=y.querySelector(".nc-name");w instanceof HTMLElement&&w.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||n&&!c.solo?y.dataset.silent="true":delete y.dataset.silent;for(let v of y.querySelectorAll("[data-nc-ms]")){let L=v.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;v.setAttribute("aria-pressed",L?"true":"false")}}h.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?h.dataset.accent="true":delete h.dataset.accent,g.dim?h.dataset.dim="true":delete h.dataset.dim,b%4===0?h.dataset.bar="true":delete h.dataset.bar,typeof g.velocity=="number"?(h.dataset.velocity="true",h.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete h.dataset.velocity,h.style.removeProperty("--level")),Qt(h,g.velocity);let u=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;b===u?h.dataset.playhead="true":delete h.dataset.playhead;let m=!!e.onLength&&e.selectedRow===c.id;h.hidden=b>=c.length&&!m,b>=c.length&&m?h.dataset.out="true":delete h.dataset.out}let p=t.querySelector(`[data-nc-len="${c.id}"]`),f=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let b=document.activeElement===p;f.after(p),b&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Ki(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,B()),e}function Ji(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let o=document.createElement("span");if(o.className="nc-strip-name",o.dataset.ncStripName="",i.append(o),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&h.onRemove?.(g)}),i.append(g)}let r=document.createElement("div");r.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let h=document.createElement("span");h.className="nc-ms-wrap";let y=document.createElement("button");y.type="button",y.className="nc-ms",y.dataset.ncMs=g,y.textContent=g==="mute"?"M":"S",h.append(y,q()),h.addEventListener("click",()=>{let u=e(n);u?.type==="strip"&&(g==="mute"?u.onMute:u.onSolo)?.()}),r.append(h)}let s=document.createElement("div");s.className="nc-strip-sends";for(let g of t.sends??[])s.append(Fe({...g,type:"knob",compact:!0},e));let l=document.createElement("div");l.className="nc-strip-body";let d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let h=document.createElement("span");h.className="nc-scale-tick",h.style.setProperty("--tick-pos",String(g.value)),h.textContent=g.label,d.append(h)}let c=vi({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let h=e(n);h?.type==="strip"&&h.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&tn(g)}}),p=Li({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});l.append(d,c.el,p.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;return f.addEventListener("click",g=>{let h=e(n);h?.type!=="strip"||!h.onTypeIn||(window.clearTimeout(b),g.detail===0?en(n,f,e):g.detail===1&&(b=window.setTimeout(()=>en(n,f,e),Qi)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let g=e(n);g?.type==="strip"&&tn(g)}),n.append(i,r,s,l,f,B()),Zn(n,t),n}var Qi=250;function en(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=i.valueText??Se(i.value),o.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let d=o.value;if(o.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function eo(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",i.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),d=s.value;Pn(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(i,s,B()),Gn(n,t),n}function Gn(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(i.replaceChildren(...o.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Pn(i))}function Pn(t){let e=t.options[0];e&&(e.selected=!0)}function tn(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Zn(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let o=t.querySelector(".nc-fader"),r=o?$i(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),In(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let l=e.valueText??Se(e.value);s.textContent!==l&&(s.textContent=l),s.setAttribute("aria-label",`${e.label} level ${l}`);let d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(let l of t.querySelectorAll("[data-nc-ms]")){let d=l.getAttribute("data-nc-ms"),c=d==="mute"?e.mute===!0:e.solo===!0;l.setAttribute("aria-pressed",c?"true":"false"),l.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function nn(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${wt(e)}"]`);return In(n?.querySelector(".nc-meter")??void 0)}function to(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let o=document.createElement("div");o.className="nc-ui-fx-hd";let r=Mn({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(r.el);l?.type==="fx"&&l.onToggle?.(s)}});r.el.dataset.ncFxSwitch="",o.append(i,r.el),n.append(o)}for(let o of t.controls)n.append(Fe(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let r=document.createElement("summary");r.textContent=t.moreLabel??"More",o.append(r);for(let s of t.more)o.append(Fe(s,e));n.append(o)}return n.append(B()),Yn(n,t),n}function Yn(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function wt(t){return t.replace(/["\\]/g,"\\$&")}function no(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);i?.type==="canvas"&&Cn(n,i)}Ni(t)}var Lt="netcomposer.rhythm.hidden.v1",V=new WeakMap;function dt(){try{return globalThis.localStorage??null}catch{return null}}function Fn(t,e=Lt){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function an(t,e,n,i=Lt){let o=Fn(t,i);n?o.add(e):o.delete(e);try{t?.setItem(i,JSON.stringify([...o]))}catch{}}function Mt(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0})));return n}function ao(t,e){if(!(!t||!e))return Mt(t).find(n=>n.id===e)}function io(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${Mt(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function oo(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(i,o),t.append(n),Dn(t,e)}function Dn(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function ro(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=V.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ao(n,i)}function so(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=io(e);if(t.dataset.ncSignature===i){for(let o of n){let r=t.querySelector(`[data-nc-section="${on(o.id)}"]`);r&&Dn(r,o);for(let s of o.controls){let l=t.querySelector(`[data-nc-id="${on(s.id)}"]`);l instanceof Element&&K(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let o of n){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),oo(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let l of o.controls)s.append(Fe(l,ro));t.append(r)}}function on(t){return t.replace(/["\\]/g,"\\$&")}function lo(t,e=Lt){An();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Fn(dt(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Mn({labelledBy:r.id,onChange:m=>(V.get(n)??t).onToggle?.(m)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,d);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",o.append(r,p,s);let f=document.createElement("div");f.className="nc-module-body",f.id=`${t.id}-body`;let b=document.createElement("button");b.type="button",b.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",b.append(g);let h=document.createElement("i");h.className="nc-token-probe",h.dataset.ncProbe="",n.append(h,o,f,b),n.setAttribute("aria-labelledby",r.id);let y=m=>{let w=V.get(n)??t;n.dataset.ncOpen=m?"false":"true",f.hidden=m,b.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",f.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${w.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";an(dt(),(V.get(n)??t).id,m,e),y(m),vt(n.parentElement)}),b.addEventListener("click",()=>{an(dt(),(V.get(n)??t).id,!1,e),y(!1),vt(n.parentElement)});let u={el:n,update(m){V.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=m.title,p.textContent=m.status??"",m.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),g.textContent=m.summary??m.title,c.el.hidden=m.on===void 0,c.set(m.on===!0),m.on===!1?f.dataset.ncDim="true":delete f.dataset.ncDim,b.setAttribute("aria-label",`Show ${m.title}`),so(f,m),y(f.hidden),u.redraw()},redraw(){let m=V.get(n);m&&no(n,Mt(m))}};return V.set(n,t),y(i),u.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>u.redraw()).observe(n),u}function co(t,e,n="adjacent"){An(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=i;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),vt(t)}function vt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const Hn="netcomposer.studio.instances.v1";function Xn(t,e){return e===1?t:`${t}#${e}`}function _n(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function Et(t,e){return{id:Xn(t.id,e),type:t.id,n:e,name:e===1?t.name:`${t.name} ${e}`,src:t.src}}function uo(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function po(t,e){const n=new Set(t.filter(o=>o.type===e.id).map(o=>o.n));let i=1;for(;n.has(i);)i++;return Et(e,i)}function De(t){return t.filter(e=>e.available!==!1).map(e=>Et(e,1))}function mo(t,e){if(!Array.isArray(t))return De(e);const n=[];for(const i of t){if(typeof i!="string")continue;const o=_n(i),r=o&&e.find(s=>s.id===o.type&&s.available!==!1);!o||!r||n.some(s=>s.id===i)||n.push(Et(r,o.n))}return n.length>0||t.length===0?n:De(e)}function Vn(){try{return globalThis.localStorage??null}catch{return null}}function ho(t,e=Vn()){try{const n=e?.getItem(Hn);return n?mo(JSON.parse(n),t):De(t)}catch{return De(t)}}function Un(t,e=Vn()){try{e?.setItem(Hn,JSON.stringify(t.map(n=>n.id)))}catch{}}function fo(t,e){const n=new Map;return(i,o)=>{const r=_n(i),s=r?.type??i,l=o?.instance!==void 0?Number(o.instance):i.includes("#")?r?.n:void 0,d=t().filter(p=>p.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=d.find(p=>p.instance.n===l);else{const p=d.filter(f=>{const b=f.window();return b!=null&&b!==n.get(f.instance.id)});c=p.find(f=>f.readyState?.()!=="complete")??p[0]??d[0]}if(!c){if(e.some(f=>f.id===s))return null;const p=l!==void 0?Xn(s,l):i;return{id:p,name:p}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const go=1,ie=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/"},{id:"olive-bass",name:"Bass",src:"/bass/"}],bo=[...ie,{id:"astrid-synth",name:"Synth",src:"/synth/",available:!1}];function yo(t,e,n={}){const i=n.instruments??ie;return{version:go,attach(o,r){if(typeof o!="string"||o.length===0||o.length>64)return null;const s=n.resolve?n.resolve(o,r):{id:o,name:i.find(d=>d.id===o)?.name??o};if(!s)return null;const l=e.attach(s.id,s.name);return n.mapper===void 0?{ctx:t,output:l}:{ctx:t,output:l,mapper:n.mapper}}}}const wo={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function vo(t,e){const n=e.fx[t],i=Ze(n);for(const o of i.chain){const r=wo[t][o.type];n===void 0&&r&&Object.assign(o.dials,r),t==="a"?(o.bypass=o.type!=="plate",o.type==="plate"&&(o.dials.mix=100)):t==="b"?(o.bypass=o.type!=="delay",o.type==="delay"&&(o.dials.mix=100,o.dials.mode=0,o.dials.send=100)):o.bypass=o.type!=="drive"||!e.insert.on}return i}function $o(t){const e=()=>{};return new Proxy(t,{get(n,i,o){if(i==="stop")return e;const r=Reflect.get(n,i,o);return typeof r=="function"?r.bind(n):r}})}const _=-54,Le=6,F=-_/(Le-_),ko=-9,$t=(ko-_)/(Le-_);function qn(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:_+e*(Le-_)}function xo(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function So(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function te(t){return xo(qn(t))}function Ao(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function Lo(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:te(n.position))}function Tt(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-_)/(Le-_)))}function rn(t){return Tt(So(t))}const sn=[0,-6,-12,-24,-48].map(t=>({value:Tt(t),label:t===0?"0":`−${-t}`})),Mo=1;function Eo(t){let e=0,n=0;for(const i of t){const o=Math.abs(i);o>e&&(e=o),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function ln(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<_?0:Tt(Math.min(Le,n)):null}const Kn="netcomposer.studio.mix.v1",Jn={position:$t,mute:!1,solo:!1,sendA:0,sendB:0};function kt(){return{v:1,channels:{},master:F,returns:{a:{on:!0,level:F},b:{on:!0,level:F}},insert:{on:!1},fx:{}}}const xe=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,He=(t,e)=>typeof t=="boolean"?t:e,ne=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function To(t){const e=ne(t);return{position:xe(e.position,Jn.position),mute:He(e.mute,!1),solo:He(e.solo,!1),sendA:Math.min(F,xe(e.sendA,0)),sendB:Math.min(F,xe(e.sendB,0))}}function Io(t){const e=kt(),n=ne(t);if(n.v!==1)return e;const i={};for(const[d,c]of Object.entries(ne(n.channels)))d.length>0&&d.length<=64&&(i[d]=To(c));const o=ne(n.returns),r=(d,c)=>{const p=ne(d);return{on:He(p.on,c.on),level:xe(p.level,c.level)}},s={},l=ne(n.fx);for(const d of["a","b","insert"])l[d]!==void 0&&(s[d]=l[d]);return{v:1,channels:i,master:xe(n.master,e.master),returns:{a:r(o.a,e.returns.a),b:r(o.b,e.returns.b)},insert:{on:He(ne(n.insert).on,e.insert.on)},fx:s}}function Qn(){try{return globalThis.localStorage??null}catch{return null}}function Co(t=Qn()){try{const e=t?.getItem(Kn);return e?Io(JSON.parse(e)):kt()}catch{return kt()}}function No(t,e=Qn()){try{return e?.setItem(Kn,JSON.stringify(t)),e!==null}catch{return!1}}const Ro="netcomposer.studio.hidden.v1",ze=1/120,cn="master",Oe=t=>Ao(qn(t)),dn=t=>{const e=Oe(t);return e==="−∞"?"off":`${e} dB`};function zo(t,e){return me.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function jo(t,e,n){const i=n.bpm,o=h=>{const y=n.order(),u=y.indexOf(h);return u<0?y.length:u},r=(h,y,u,m)=>{const w=zo(u,m);if(!w||!y)return null;const v=Number(y.getParam(u,m)??w.default),L=`mix-${h}-${m}`;return w.options?{type:"select",id:L,label:w.label,value:String(v),options:w.options.map(k=>({value:String(k.value),label:k.label})),onChange:k=>{y.setParam(u,m,Number(k)),g.render()}}:{type:"slider",id:L,label:w.label,min:w.min,max:w.max,step:w.step??1,value:v,valueText:w.format(v,i()),onChange:k=>{y.setParam(u,m,k),g.render()}}},s=(h,y,u,m)=>m.map(w=>r(h,y,u,w)).filter(w=>w!==null),l=h=>{const y=e.returns[h];return{type:"slider",id:`mix-${h}-return`,label:"Return",min:0,max:1,step:ze,value:y.level,valueText:dn(y.level),onChange:u=>e.setReturn(h,{level:u})}},d=()=>[...e.list()].sort((h,y)=>o(h.id)-o(y.id)).map(h=>({type:"strip",id:`strip-${h.id}`,label:h.name,value:h.strip.position,valueText:Oe(h.strip.position),step:ze,defaultValue:$t,resetText:`${Oe($t)} dB`,ticks:[...sn],mute:h.strip.mute,solo:h.strip.solo,silent:h.silent,onChange:y=>e.set(h.id,{position:y}),onTypeIn:y=>{const u=ln(y);u!==null&&e.set(h.id,{position:u})},onRemove:y=>n.onRemove(h.id,y),onMute:()=>e.set(h.id,{mute:!h.strip.mute}),onSolo:()=>e.set(h.id,{solo:!h.strip.solo}),sends:["A","B"].map(y=>{const u=y==="A"?"sendA":"sendB",m=h.strip[u];return{id:`send-${y.toLowerCase()}-${h.id}`,label:y,ariaLabel:`${h.name} send ${y}`,min:0,max:F,step:ze*2,value:m,valueText:dn(m),defaultValue:0,onChange:w=>e.set(h.id,{[u]:w})}})})),c=()=>({type:"strip",id:`strip-${cn}`,label:"Master",master:!0,channels:2,value:e.masterPositionValue,valueText:Oe(e.masterPositionValue),step:ze,defaultValue:F,resetText:"0.0 dB",ticks:[...sn],onChange:h=>e.setMaster(h),onTypeIn:h=>{const y=ln(h);y!==null&&e.setMaster(y)}}),p=()=>{const h=e.returns.a,y=e.returns.b,u=e.list().length;return{id:"mix",title:"Mix",summary:`${u} channel${u===1?"":"s"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...d(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(m=>({value:m.id,label:m.available===!1?`${m.name} (soon)`:m.name,disabled:m.available===!1})),onAdd:m=>n.onAdd(m)}]},{id:"fx",area:"fx",label:"Effects",controls:[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:h.on,onToggle:m=>e.setReturn("a",{on:m}),controls:[l("a"),...s("a",h.fx,"plate",["decay","size"])],more:s("a",h.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:y.on,onToggle:m=>e.setReturn("b",{on:m}),controls:[l("b"),...s("b",y.fx,"delay",["delay_beats","feedback"])],more:s("b",y.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:m=>e.setInsert(m),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},{id:"master",area:"master",label:"Master",controls:[c()]}]}},f=lo(p(),Ro);co(t,[f],"adjacent");const b=h=>({peak:rn(h.peak),rms:rn(h.rms),over:h.peak>=Mo}),g={module:f,render(){f.update(p())},frame(h){if(f.el.dataset.ncOpen==="true"){for(const y of e.list())nn(f.el,`strip-${y.id}`)?.update([b(y.levels())],h);nn(f.el,`strip-${cn}`)?.update(e.masterLevels().map(b),h)}}};return g}const ue=.012,ut=1024;class Bo{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=F;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(ut);restore;constructor(e,n={}){this.ctx=e,this.restore=n.restore;const i=()=>new AnalyserNode(e,{fftSize:ut});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:te(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const o=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(o),o.connect(this.masterMeters[0],0),o.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const r=s=>{const l=new GainNode(e,{gain:1}),d=n.fx?.(s)??null,c=new GainNode(e,{gain:te(F)}),p=i();return d?(l.connect(d.input),d.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:l,fx:d,gain:c,meter:p,on:d!==null,level:F}};this.returns={a:r("a"),b:r("b")}}attach(e,n){let i=this.channels.find(o=>o.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fader);else{const o=new GainNode(this.ctx,{gain:1}),r=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:ut}),l=new GainNode(this.ctx,{gain:0}),d=new GainNode(this.ctx,{gain:0});o.connect(r).connect(s).connect(this.bus),r.connect(l).connect(this.returns.a.bus),r.connect(d).connect(this.returns.b.bus),i={id:e,name:n,input:o,fader:r,meter:s,sendA:l,sendB:d,strip:this.restore?.(e)??Jn},this.channels.push(i),this.apply()}return this.emit(),i.input}detach(e){const n=this.channels.findIndex(o=>o.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const o of[i.input,i.fader,i.meter,i.sendA,i.sendB])o.disconnect();this.apply(),this.emit()}}set(e,n){const i=this.channels.find(o=>o.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(te(e),this.ctx.currentTime,ue),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],o=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,o,ue)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(te(i.level),o,ue)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=Lo(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,o)=>{i.fader.gain.setTargetAtTime(e[o]??0,n,ue),i.sendA.gain.setTargetAtTime(te(i.strip.sendA),n,ue),i.sendB.gain.setTargetAtTime(te(i.strip.sendB),n,ue)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),Eo(this.scratch)}emit(){for(const e of this.listeners)e()}}const Oo=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function Wo(t){return Oo.find(e=>t(e))??null}function Go(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function Po(t,e){const n=o=>String(o).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${Go(e)}`}class Zo{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:Wo(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const o=new Blob(this.chunks,{type:n});i({blob:o,name:Po(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const Yo="/studio/assets/silence-processor-Cr4LKvRl.js",Fo="NetComposer Studio",oe=[40,240];function Do(t){const e=new ha({bpm:120,minBpm:oe[0],maxBpm:oe[1],timebase:"shared"}),n=new La({app:Fo,version:"0.1.0",clock:e,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:oe},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let i=!1;return{clock:e,peer:n,async start(){i||(i=!0,await n.start())},play:()=>e.play({at:Ce()}),stop:()=>e.stop({at:Ce()}),setTempo:o=>e.setTempo({bpm:Ho(o)}),playing:()=>e.transport.isPlayingAt(Ce()),running:()=>e.transport.running,bpm:()=>e.transport.bpm,position(){const o=e.transport,r=Ce();return o.isPlayingAt(r)?Xo(o.beatAt(r)):null},peers:()=>[...n.peers.values()]}}function Ho(t){return Number.isFinite(t)?Math.min(oe[1],Math.max(oe[0],Math.round(t*10)/10)):120}function Xo(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}function _o(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(r,s)=>{const l=new URL(String(r),e).href;let d=i.get(l);return d||(d=n(r,s),i.set(l,d),d.catch(()=>{i.get(l)===d&&i.delete(l)})),d},configurable:!0}),t}const j=new AudioContext({latencyHint:"interactive"});_o(j.audioWorklet,location.href);const J=Co(),re={},R=new Bo(j,{restore:t=>J.channels[t],fx:t=>{const e=Ha(j,{moduleUrl:_a,bpm:120,state:vo(t,J)});return re[t]=e,e}});R.setMaster(J.master);R.setReturn("a",J.returns.a);R.setReturn("b",J.returns.b);R.setInsert(J.insert.on);const qe=new Aa(j);qe.start();window.ncStudio=yo(j,R,{mapper:$o(qe),resolve:(t,e)=>Ko(t,e)});const z=Do(()=>j.state),We=new Zo(R.recordOut.stream);let je=null;function I(t,e={},...n){const i=document.createElement(t);for(const[o,r]of Object.entries(e))r===void 0||r===!1||i.setAttribute(o,r===!0?"":String(r));return i.append(...n),i}const Ae=I("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),he=I("input",{type:"number",class:"bpm",min:oe[0],max:oe[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Xe=I("output",{class:"position","aria-label":"Bar and beat"},"—"),U=I("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),ke=I("a",{class:"take",hidden:!0}),xt=I("span",{class:"status",role:"status"}),Vo=I("header",{class:"top"},I("h1",{class:"brand"},"NetComposer ",I("span",{},"Studio")),I("div",{class:"transport"},Ae,I("label",{class:"tempo"},he,"BPM"),Xe),I("div",{class:"record"},U,ke),xt);We.supported||(U.disabled=!0,U.title="This browser can't record audio");const Ke=I("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),ea=I("div",{class:"stage"}),se=new Map;let C=ho(ie),Me=C[0]?.id??"";const Uo=new URLSearchParams(location.search).has("measure"),un=new Map,qo=2e4;function ta(t){const e=I("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>le(t.id)),Ke.append(e);const i=(un.get(t.type)??Promise.resolve()).then(()=>new Promise(o=>{if(!C.some(l=>l.id===t.id))return o();const r=I("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:uo(t,Uo),allow:"autoplay; clipboard-read; clipboard-write"});se.set(t.id,r);const s=window.setTimeout(o,qo);r.addEventListener("load",()=>{window.clearTimeout(s),o()},{once:!0}),ea.append(r),le(Me)}));return un.set(t.type,i),i}function le(t){Me=t;for(const e of C){const n=e.id===t;se.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const Ko=fo(()=>C.map(t=>({instance:t,window:()=>se.get(t.id)?.contentWindow,readyState:()=>{try{return se.get(t.id)?.contentDocument?.readyState}catch{return}}})),ie);function Jo(t){const e=ie.find(i=>i.id===t);if(!e)return;const n=po(C,e);C=[...C,n].sort((i,o)=>ie.findIndex(r=>r.id===i.type)-ie.findIndex(r=>r.id===o.type)||i.n-o.n),Un(C),ta(n);for(const i of C){const o=document.getElementById(`tab-${i.id}`);o&&Ke.append(o)}le(n.id),fe?.render()}async function Qo(t,e){const i=C.find(s=>s.id===t)?.name??t;if(!await wi({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;C=C.filter(s=>s.id!==t),Un(C);const r=se.get(t);se.delete(t),r?.setAttribute("src","about:blank"),r?.remove(),document.getElementById(`tab-${t}`)?.remove(),R.detach(t),er(t),Me===t&&le(C[0]?.id??"")}const pn=I("div",{class:"mix"});let fe=null,mn=0;const na=new Set;function er(t){na.add(t),delete J.channels[t],It()}function It(){window.clearTimeout(mn),mn=window.setTimeout(()=>{const t={...J.channels};for(const n of R.list())t[n.id]=n.strip;for(const n of na)delete t[n];const e={};for(const n of["a","b","insert"]){const i=re[n];i&&(e[n]=i.getState())}No({v:1,channels:t,master:R.masterPositionValue,returns:{a:{on:R.returns.a.on,level:R.returns.a.level},b:{on:R.returns.b.on,level:R.returns.b.level}},insert:{on:R.insertEnabled},fx:e})},300)}R.onChange(()=>{fe?.render(),It()});for(const t of Object.values(re))t?.onChange(It);async function aa(){j.state!=="running"&&await j.resume()}Ae.addEventListener("click",()=>{aa(),z.running()?z.stop():z.play()});function ia(){const t=Number(he.value);z.setTempo(t)}he.addEventListener("change",ia);he.addEventListener("keydown",t=>{t.key==="Enter"&&ia()});U.addEventListener("click",async()=>{if(aa(),We.recording){const t=await We.stop();U.setAttribute("aria-pressed","false"),U.textContent="Rec",t&&(je&&URL.revokeObjectURL(je.url),je={url:URL.createObjectURL(t.blob),take:t},ke.href=je.url,ke.download=t.name,ke.textContent=`Save take (${t.seconds.toFixed(1)} s)`,ke.hidden=!1)}else We.start(),U.setAttribute("aria-pressed","true"),U.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),Ae.click())});Ke.addEventListener("keydown",t=>{const e=C.map(o=>o.id),n=e.indexOf(Me),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),le(i),document.getElementById(`tab-${i}`)?.focus())});function Je(){const t=z.running();Ae.textContent=t?"Stop":"Play",Ae.setAttribute("aria-pressed",String(t)),document.activeElement!==he&&(he.value=String(Math.round(z.bpm()*10)/10));const e=z.position();Xe.value=e?`${e.bar}.${e.beat}`:"—";const n=z.peers().length;xt.textContent=j.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",xt.classList.toggle("off",j.state!=="running")}z.clock.onChange(Je);z.clock.onChange(()=>fe?.render());z.peer.onPeers(Je);j.addEventListener("statechange",Je);let hn=performance.now();function oa(t){const e=Math.min(.1,(t-hn)/1e3);hn=t,fe?.frame(e);const n=z.position(),i=n?`${n.bar}.${n.beat}`:"—";Xe.value!==i&&(Xe.value=i),requestAnimationFrame(oa)}async function tr(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Vo,pn,I("main",{class:"instruments"},Ke,ea)),fe=jo(pn,R,{order:()=>C.map(e=>e.id),catalogue:bo,bpm:()=>z.bpm(),onAdd:Jo,onRemove:(e,n)=>void Qo(e,n)}),j.state==="running"&&await j.suspend(),await j.audioWorklet.addModule(Yo),await z.start();for(const e of[re.a,re.b,re.insert])e&&Xa(e,z.clock,{mapper:qe});for(const e of C)ta(e);le(Me),Je(),requestAnimationFrame(oa),document.documentElement.dataset.studioReady=""}window.__studio={ctx:j,mixer:R,mapper:qe,transport:z,frames:se,show:le,get instances(){return C},fx:re,get mix(){return fe}};tr();
