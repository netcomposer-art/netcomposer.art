(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const je=1e-9;function rr(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Rn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return rr(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+je&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=e.beat+je)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+je){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-je;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Rn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+je)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+je)return n[a];return n[0]}}const or=Object.freeze({beatsPerBar:4,beatUnit:4}),Ye=1e-9;function sr(t){return Math.floor(t+Ye)}function qa(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Ye)*e;return n&&r<=t+Ye?r+e:r}class lr{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Rn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??or}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Ye&&(this.stopTime===null||e<this.stopTime-Ye)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Ye?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=sr(e/n),r=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return qa(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Ua="nc-clock/snapshot",Va=1;function cr(t,e="local"){return{format:Ua,version:Va,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function dr(t,e){const n=ur(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const me=t=>typeof t=="number"&&Number.isFinite(t),Qn=t=>t===null||me(t);function ur(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Ua&&n("format"),(!me(e.version)||Math.floor(e.version)!==Va)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!me(e.anchor.beat)||!me(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&me(a.beat)&&me(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!me(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!me(e.meter.beatUnit))&&n("meter"),(!Qn(e.startTime)||!Qn(e.stopTime)||!me(e.stoppedBeat))&&n("transport times"),e}class pr{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new lr(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){dr(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return cr(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const hr="nc-sync/1",mr=1,fr="nc-sync",gr="nc-sync-leader",br=0,Ka=.5,Ja=.75;function yr(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Ka&&t<=Ja?t:null}const on=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),nt=t=>typeof t=="number"&&Number.isFinite(t),Lt=t=>typeof t=="string"&&t.length>0;function wr(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==mr||!Lt(e.type)||!Lt(e.from)||!nt(e.term)||!nt(e.seq)||!nt(e.sentAt))return null;switch(e.type){case"hello":return Lt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return nt(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&nt(e.slot)?e:null;case"ping":case"pong":return Lt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function vr(t,e,n,a,r){return{proto:hr,from:e,term:n,seq:a,sentAt:r,...t}}function ee(){return(performance.timeOrigin+performance.now())/1e3}const sn=.003,kr=3,$r=.01,ea=500;class ta{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?$r:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=sn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(a&&o){const l=this.offsets,c=this.preStep;l.length=0;for(let d=0;d<c.length;d++)l.push(c[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const d=this.offsets,u=this.preStep;u.length=0;for(let h=0;h<d.length;h++)u.push(d[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,c=e-n;for(let d=0;d<l.length;d++)l[d]+=c;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let o=0;o<a;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=sn&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<ea)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),n=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=sn)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<ea)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(kr,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}class xr{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...on,...e.capabilities},this.channelOption=e.channel??fr,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const a=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??qa(c,1),c);a&&a>0?(s.tempo.rampTempo(e,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Ja,Math.max(Ka,e)):br;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=yr(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=wr(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...on,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...on},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(gr,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(vr(e,this.id,this.term,++this.seq,this.o.now()))}}const Sr="modulepreload",Mr=function(t){return"/lucy/"+t},na={},Ar=function(e,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=Mr(d),d in na)return;na[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Sr,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((g,b)=>{m.addEventListener("load",g),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var Lr=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],wn=[.25,.5,.75,1,1.5,2],Er=4.9,O={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ne={fmt:"wet"},ce={fmt:"pct"},Pe={fmt:"db"},Et={fmt:"signedPct"},ln={fmt:"num",suffix:" ms"},j={div:100};function L(t,e,n,a,r,o,s,l){var c={key:t,label:e,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function Tt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var ut=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:O.hpQ},{dsp:{law:O.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:O.bpHz,astrid:!0},{dsp:{law:O.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:O.bpQ},{dsp:{law:O.bpQ}}),L("mix","Mix",0,100,100,3,Ne,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Tt(Lr),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,ce,{dsp:j,unit:"%"}),L("mix","Wet/dry",0,100,0,3,Ne,{dsp:j,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:O.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Tt([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,ce,{dsp:j,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,Et,{dsp:j,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,ln,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),L("decay","Decay",0,100,50,3,ce,{dsp:j,unit:"%"}),L("damping","Damping",0,100,0,4,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,0,5,Ne,{dsp:j,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),L("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),L("feedback","Feedback",-90,90,50,3,Et,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,4,Ne,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),L("depth","Depth",0,100,50,2,ce,{dsp:j,unit:"%"}),L("spread","Spread",0,100,70,3,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,40,4,Ne,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),L("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Tt([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,5,Ne,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,Pe,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,Pe,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:O.midHz,astrid:!0},{dsp:{law:O.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:O.eqQ},{dsp:{law:O.eqQ}}),L("high_db","High",-18,18,0,4,Pe,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,Pe,{unit:"dB"}),L("mix","Mix",0,100,100,3,Ne,{dsp:j,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Tt([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:O.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,Et,{dsp:j,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,Et,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,Pe,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:O.ratio},{dsp:{law:O.ratio}}),L("attack_ms","Attack",1,100,10,3,ln,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,ln,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,Pe,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,ce,{dsp:j,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],Tr=ut.map(function(t){return t.type});ut.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Cr={reverb:"plate"};function zn(t){var e=Cr[t]||t;return Tr.indexOf(e)>=0?e:null}function ve(t){for(var e=zn(t),n=0;n<ut.length;n++)if(ut[n].type===e)return ut[n];return null}function Ze(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Qa(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Ze(n.law,e);return a===null?0:a}function aa(t,e){return Math.min(Er,t*60/(e>0?e:120))}var ia=function(t){return t>0?"+":t<0?"−":""};function Nr(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function ei(t,e,n){var a=t.format,r;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:ia(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return ia(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(r=Ze(a.law,e),r===null?a.zero||"open":a.astrid?Nr(r):r+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ze(a.law,e).toFixed(1);case"ratio":return Ze(a.law,e).toFixed(1)+":1";case"rate":return r=Ze(a.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(aa(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(aa(e,n)*1e3)+" ms"}return String(e)}var Ir=1,qt=["drive","delay","plate"];function Rr(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,r){return ei(t,a,r)},e}var pt=qt.map(function(t){var e=ve(t),n={type:t,label:e.label,dials:e.dials.map(Rr)};return e.tempoSynced&&(n.tempoSynced=!0),n}),zr={reverb:"plate"};function jt(t){var e=zr[t]||t;return qt.indexOf(e)>=0?e:null}function Ut(t){for(var e=jt(t),n=0;n<pt.length;n++)if(pt[n].type===e)return pt[n];return null}function ti(t,e){var n=Ut(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Ke(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Ae(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(a-e)&&(a=t.options[r].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function Br(){return{v:Ir,chain:pt.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Wr(t){return wn.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},wn[0])}function cn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function jr(t){for(var e=Array.isArray(t)?t:cn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Br(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(cn(l)){var c=jt(l.type);if(!c){typeof l.type=="string"&&o.push(l.type);continue}if(r[c]){o.push(c);continue}r[c]=!0;var d=a.chain[qt.indexOf(c)],u=cn(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Ut(c).dials.forEach(function(h){d.dials[h.key]=Ae(h,u[h.key])}),Pr(c,d.dials,u)}}return{state:a,dropped:o}}function Pr(t,e,n){for(var a=Ut(t),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(e[o.key]=Ae(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Ke(o,e)))}}function vn(t){return jr(t).state}function Fr(t){return JSON.parse(JSON.stringify(t))}var Or=24,kn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function $n(t,e,n){if(e==="bypass")return n?0:1;var a=ti(t,e)||Gr(t,e);return a?Qa(a,n):0}function Gr(t,e){var n=ve(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Hr={};pt.forEach(function(t){t.dials.forEach(function(e){Hr[t.type+"."+e.key]=e.format})});function dn(t,e){var n=new Float64Array(Or),a=vn(t);return a.chain.forEach(function(r){var o=kn[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=$n(r.type,s,r.dials[s])})}),n}var Dr=2,Pt=3,Zr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function at(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Bn(t,e){var n=ve(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var r=1;a[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function Yr(t){var e=ve(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Xr(t,e,n){var a=t.length-1,r=Math.max(0,Math.min(a,n));if(e<0||e>a||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function _r(t){return typeof t=="number"&&isFinite(t)?Wr(t):t}function ra(t,e,n){var a={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=_r(o)),a[r.key]=Ae(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Ae(r,typeof e[r.key]=="number"?e[r.key]:a[r.key],Ke(r,a)))}),a}function qr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=Ze(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,a=o)}return a}}var Ur={rate:"rate_hz"};function Vr(t,e,n,a){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Ur[o.key]||o.key;r[o.key]=qr(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Kr(t,e){var n=e>0?Math.floor(e):Pt,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):at(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var c=[],d=0;d<o.length;d++){var u=o[d];if(at(u)&&!(u.type==="limiter"||u.fixed===!0)){var h=zn(u.type),m=h&&ve(h);if(!m||s&&["drive","delay","plate"].indexOf(h)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||h);continue}var g;at(u.params)&&!at(u.dials)?g=ra(m,Vr(m,u.params,r,u.id||h),l):g=ra(m,at(u.dials)?u.dials:{},l);var b=Bn(h,c),y=typeof u.id=="string"&&Zr.test(u.id)&&!c.some(function(f){return f.id===u.id})?u.id:b.id,p=s?u.bypass!==!1:u.bypass===!0;c.push({id:s?b.id:y,type:h,bypass:p,dials:g})}}return{state:{v:Dr,chain:c},dropped:a,notes:r}}function ht(t,e){return Kr(t,e).state}function Fe(t){var e=ve(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,Qa(a,t.dials[a.key])])}),n}function Jr(t){var e=ht(t,8),n=[],a=e.chain.map(function(r,o){var s=ve(r.type),l={};return o>=Pt&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=r.dials[c.key];if(c.more){d!==c.default&&n.push(r.id+"."+c.key);return}c.key==="delay_beats"&&wn.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Qr="nc-fx@1",eo=600,to=256,no=8,it=typeof WeakMap=="function"?new WeakMap:null;function ao(t,e){var n=it&&it.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await Ar(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),it&&(it.set(t,n),n.catch(function(){it.delete(t)})),n)}function Oe(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ni(t,e,n,a){var r=Math.min(400,Math.max(20,Oe(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",c=Oe(e.preGain,1),d=Math.max(0,Oe(e.crossfade,.012)),u=Oe(e.maxDelaySeconds,void 0),h=t.createGain(),m=t.createGain(),g=t.createGain(),b=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,h.connect(g),g.connect(m),b.connect(m);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},f=n(r);p.post=function($){p.node?p.node.port.postMessage($):p.disposed||(o.length>=to&&(o=a().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push($))};function w($){var S=o.map(function(x){var A=Object.assign({},x);return A.when>$||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return o=[],S}p.emit=function($){for(var S=0;S<p.listeners.length;S++)try{p.listeners[S]($)}catch(x){typeof console<"u"&&console.error(x)}},p.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;p.tooFar=function($){return typeof $=="number"&&$>t.currentTime+eo?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var M=ao(t,e.moduleUrl).then(function(){if(!p.disposed){var $=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},f);$.pending=w(t.currentTime),p.node=new AudioWorkletNode(t,Qr,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(b);var S=t.currentTime;S<=0||d===0?(g.gain.value=0,b.gain.value=1):(g.gain.setValueAtTime(1,S),g.gain.linearRampToValueAtTime(0,S+d),b.gain.setValueAtTime(0,S),b.gain.linearRampToValueAtTime(1,S+d)),p.status="ready"}},function($){p.status="unavailable",o=[],p.error=$});return p.core={input:h,output:m,modInput:y,ready:M,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function($,S){var x=Oe($,NaN);!(x>0)||p.disposed||p.tooFar(S)||(p.bpm=Math.min(400,Math.max(20,x)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(S)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function($){var S=$&&typeof $=="object"?$:{at:$};if(!(p.disposed||p.tooFar(S.at))){var x=Oe(S.fadeMs,0);p.post({t:"clear",when:p.whenOf(S.at),fadeMs:x>0?Math.min(1e3,x):0})}},onChange:function($){return p.listeners.push($),function(){var S=p.listeners.indexOf($);S>=0&&p.listeners.splice(S,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,g,b,m,y].forEach(function($){try{$&&$.disconnect()}catch{}})}}},p}function io(t,e){var n=e||{};if(n.slots)return ro(t,n);var a=vn(n.state),r=Array.from(dn(a)),o=ni(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(dn(a)),when:0}]}),s=o.core;function l(c){return a.chain[qt.indexOf(c)]}return s.setParam=function(c,d,u,h){var m=jt(c);if(!(!m||o.disposed||o.tooFar(h))){var g=l(m),b;if(d==="bypass")b=!!u;else{var y=ti(m,d);if(!y)return;b=Ae(y,u,Ke(y,g.dials))}return d==="bypass"?g.bypass=b:g.dials[d]=b,o.post({t:"p",i:kn[m][d],v:$n(m,d,b),when:o.whenOf(h)}),o.emit({effect:m,key:d,value:b}),Ut(m).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===d}))){var f=g.dials[p.key],w=Ae(p,f,Ke(p,g.dials));w!==f&&(g.dials[p.key]=w,o.post({t:"p",i:kn[m][p.key],v:$n(m,p.key,w),when:o.whenOf(h)}),o.emit({effect:m,key:p.key,value:w}))}}),b}},s.getParam=function(c,d){var u=jt(c);if(u){var h=l(u);return d==="bypass"?h.bypass:h.dials[d]}},s.getState=function(){return Fr(a)},s.setState=function(c,d){o.disposed||o.tooFar(d&&d.at)||(a=vn(c),o.post({t:"load",program:Array.from(dn(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},s}function ro(t,e){var n=e.slots===!0?Pt:Math.max(1,Math.min(no,Math.floor(+e.slots)||Pt)),a=ht(e.state,n),r=1,o={};function s(p){return o[p.id]||(o[p.id]=r++),o[p.id]}function l(p){return p.map(function(f){return{uid:s(f),type:f.type,program:Fe(f)}})}var c=l(a.chain),d=a.chain.map(function(p){return o[p.id]}),u=ni(t,e,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return o[p.id]}),when:0}]}),h=u.core;function m(p){var f;for(f=0;f<a.chain.length;f++)if(a.chain[f].id===p)return a.chain[f];var w=zn(p);if(w){for(f=0;f<a.chain.length;f++)if(a.chain[f].type===w)return a.chain[f]}return null}function g(p,f){var w=s(p);u.post({t:"add",uid:w,type:p.type,when:f}),Fe(p).forEach(function(v){u.post({t:"ps",uid:w,k:v[0],v:v[1],when:f,snap:!0})})}function b(p){u.post({t:"order",uids:a.chain.map(function(f){return o[f.id]}),when:p})}function y(p,f){var w={};a.chain.forEach(function($){w[$.id]=$});var v=a.chain.map(function($){return o[$.id]}).join();p.chain.forEach(function($){var S=w[$.id];if(!S||S.type!==$.type){delete o[$.id],g($,f);return}var x={};Fe(S).forEach(function(A){x[A[0]]=A[1]}),Fe($).forEach(function(A){x[A[0]]!==A[1]&&u.post({t:"ps",uid:o[$.id],k:A[0],v:A[1],when:f})})});var M={};p.chain.forEach(function($){M[$.id]=!0}),Object.keys(o).forEach(function($){M[$]||delete o[$]}),a=p,a.chain.map(function($){return o[$.id]}).join()!==v&&b(f)}return h.slots=n,h.setParam=function(p,f,w,v){var M=m(p);if(!(!M||u.disposed||u.tooFar(v))){var $=ve(M.type),S,x=null;if(f==="bypass")S=!!w;else{for(var A=0;A<$.dials.length;A++)$.dials[A].key===f&&(x=$.dials[A]);if(!x)return;S=Ae(x,w,Ke(x,M.dials))}var z={},Z={};Fe(M).forEach(function(N){z[N[0]]=N[1]}),$.dials.forEach(function(N){N.stepWhen&&(Z[N.key]=M.dials[N.key])}),f==="bypass"?M.bypass=S:M.dials[f]=S,$.dials.forEach(function(N){N.stepWhen&&(M.dials[N.key]=Ae(N,M.dials[N.key],Ke(N,M.dials)))});var te=u.whenOf(v),se=o[M.id];return Fe(M).forEach(function(N){(z[N[0]]!==N[1]||x&&N[0]===x.k)&&u.post({t:"ps",uid:se,k:N[0],v:N[1],when:te})}),u.emit({effect:M.id,key:f,value:S}),Object.keys(Z).forEach(function(N){N!==f&&M.dials[N]!==Z[N]&&u.emit({effect:M.id,key:N,value:M.dials[N]})}),S}},h.getParam=function(p,f){var w=m(p);if(w)return f==="bypass"?w.bypass:w.dials[f]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,f){u.disposed||u.tooFar(f&&f.at)||(y(ht(p,n),u.whenOf(f&&f.at)),u.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,f){var w=f||{},v=Bn(p,a.chain);if(!(!v||a.chain.length>=n||u.disposed||u.tooFar(w.at))){if(w.dials){var M=ht({v:2,chain:[{id:v.id,type:v.type,dials:w.dials}]},1).chain[0];v.dials=M.dials}w.bypass===!0&&(v.bypass=!0);var $=a.chain.slice(),S=typeof w.index=="number"?Math.max(0,Math.min($.length,w.index)):$.length;return $.splice(S,0,v),y({v:2,chain:$},u.whenOf(w.at)),u.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,f){var w=m(p),v=f&&f.at;return!w||u.disposed||u.tooFar(v)?!1:(y({v:2,chain:a.chain.filter(function(M){return M!==w})},u.whenOf(v)),u.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,f,w){var v=m(p),M=w&&w.at;if(!v||u.disposed||u.tooFar(M))return!1;var $=Xr(a.chain,a.chain.indexOf(v),f);return $===a.chain?!1:(y({v:2,chain:$},u.whenOf(M)),u.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:Yr(p),bypass:p.bypass}})},h.toAstrid=function(){return Jr(a)},h}function oa(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function oo(t,e,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(m){return r.toContextTime(m)}:e&&e.timebase==="shared"?null:function(m){return m},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,c=l&&l.tempo?l.tempo:l,d=!1;function u(m){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof m!="number")){var g=o(l.timeAt(m));return typeof g=="number"&&isFinite(g)?g:void 0}}function h(){var m=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(m)){var g=l&&typeof l.bpm=="number"?l.bpm:oa(c,0);g>0&&t.setTempo(g);return}var b=oa(c,m);b>0&&t.setTempo(b);for(var y=c&&(c.points||c.tempoPoints)||[],p=0;p<y.length;p++){var f=y[p];if(f.beat>m&&f.bpm>0){var w=u(f.beat);w!==void 0&&t.setTempo(f.bpm,w)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(m){m&&(m.kind==="tempo"&&m.bpm>0?t.setTempo(m.bpm,u(m.atBeat)):(m.kind==="snapshot"||m.kind==="start")&&h())})}const so="/lucy/assets/worklet-CnpUVY5i.js";var lo="nc-ui",ai={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},xn={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},Me={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},st=t=>`--${lo}-${t}`,Sn=ai["label-on-fill-dark"],sa=ai["label-on-fill-light"],co=Me["label-min-contrast"],uo=/^#[0-9a-f]{6}$/i,po=t=>typeof t=="string"&&uo.test(t),It=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function la(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${It(r(0)*255)}${It(r(8)*255)}${It(r(4)*255)}`}function ii(t){let[e,n,a]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),r=Math.max(e,n,a),o=Math.min(e,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-a)/l%6):r===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:c,l:s}}function ca(t){let[e,n,a]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Mn(t,e){let[n,a]=[ca(t),ca(e)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var Ft=t=>Mn(t,Sn)>=Mn(t,sa)?Sn:sa;function ri(t,e,n,a=co){let r=la(t,e,n),o=Ft(r)===Sn?1:-1;for(let s=0;s<40&&Mn(r,Ft(r))<a;s++)n+=o*.01,r=la(t,e,n);return r}function ho(t){let{h:e,s:n}=ii(t),a=ri(e,Math.min(n,Me["surprise-on-max-saturation"]),Me["surprise-on-lightness"]);return{fill:t,ink:Ft(t),on:a,onInk:Ft(a)}}var mo=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function fo(t,e=Math.random){let[n,a]=Me["surprise-saturation"],[r,o]=Me["surprise-lightness"],s=Me["surprise-min-hue-gap"],l=po(t)?ii(t).h:null,c=e()*360;return l!==null&&mo(c,l)<s&&(c=(l+s+e()*(360-2*s))%360),ri(c,n+e()*(a-n),r+e()*(o-r))}function go(t){if(!t)return null;let e=ho(t);return{[st("surprise-fill")]:e.fill,[st("surprise-ink")]:e.ink,[st("surprise-on")]:e.on,[st("surprise-on-ink")]:e.onInk}}var bo=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,yo=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function da(t){let[e,n,a]=[1,3,5].map(l=>bo(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function wo([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>It(yo(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var vo=Me["velocity-range"],oi={min:xn.rhythm["velocity-min"],max:xn.rhythm["velocity-max"]};function ko(t,e=oi){let[n,a]=vo,r=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,o=(r-n)/(a-n),s=xn.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=da(e.min),c=da(e.max);return{velocity:r,t:o,fill:wo(l.map((d,u)=>d+(c[u]-d)*o)),ink:s}}function ua(t,e=oi){return{[st("velocity-fill")]:ko(t,e).fill}}var $o={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},xo={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},So={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Mo={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Vt={};for(let[t,e]of Object.entries(xo))Vt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Mo))Vt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(So))Vt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map($o.renames.map(t=>[t.old,t.new]));function si(t){let e=Vt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function Y(t){return si(t).prop}function i(t){return`var(${Y(t)})`}function Ao(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(Y(e)));return Number.isFinite(n)?n:0}function K(t,e){let n=si(e),a=t.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Lo(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Eo(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var To="[data-modulated], [data-modulated] *";function Co(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${Y("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${Y("divider")}: ${i(`module-div-stack-${a}`)};
      ${Y("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${Y("text-sub")}: ${i("module-sub-stack-1")};
      ${Y("divider")}: ${i("module-div-stack-1")};
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
${[1,2,3,4].map(t).join(`
`)}
${[1,2,3,4].map(n).join(`
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
${To} { transition: none; }
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
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${i("toast-pad-x")} / 2) calc(${i("toast-pad-x")} * 0.75);
  border-radius: ${i("toast-radius")};
  background: ${i("toast-bg")};
  color: ${i("toast-text")};
  font-family: ${i("font-ui")};
  font-size: ${i("toast-font-size")};
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
  ${Y("text-sub")}: ${i("module-sub-stack-1")};
  ${Y("divider")}: ${i("module-div-stack-1")};
  ${Y("slider-track")}: ${i("module-div-stack-1")};
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
  ${Y("text-sub")}: ${i("module-sub-stack-1")};
  ${Y("divider")}: ${i("module-div-stack-1")};
  ${Y("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${Y("text-sub")}: inherit;
  ${Y("divider")}: inherit;
  ${Y("slider-track")}: inherit;
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
`}var un=null,No="nc-ui-fallback";function li(t=globalThis.document){if(!t?.documentElement||(t.documentElement,un&&un.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${No} {
${Co()}
}
`,t.head.append(e),un=e}var Io=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Ro=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Io,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Ro(document);function ci(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let c=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var di=new WeakMap,pa=.25;function zo(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=t.step??.005,l=t.onChange,c=t.onReset,d=p=>Math.min(1,Math.max(0,p)),u=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=p=>{let f=d(p);f!==o&&(o=f,u(),l?.(f))},m=0,g=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();p.target!==r&&f.height>0&&h(1-(p.clientY-f.top)/f.height),m=p.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!g)return;let f=n.getBoundingClientRect().height||1,w=(m-p.clientY)/f*(p.shiftKey?pa:1);m=p.clientY,h(o+w)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",p=>{p.preventDefault(),c?.()}),n.addEventListener("keydown",p=>{let f=p.shiftKey?s*pa:s,w={ArrowUp:o+f,ArrowRight:o+f,ArrowDown:o-f,ArrowLeft:o-f,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});let y={el:n,get value(){return o},get dragging(){return g},set(p){g||(o=d(Number(p)||0),u())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(c=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),di.set(n,y),y}function Bo(t){return di.get(t)}var ui=new WeakMap,Wo=.2,jo=1.5,Po=.5;function Fo(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function ha(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Fo(a.getComputedStyle(t).getPropertyValue(Y(e)),n)}function Oo(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let f=e.createElement("span");f.className="nc-meter-peak";let w=e.createElement("span");w.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",p.append(f,w,v),o.append(p),s.push({peak:f,rms:w,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=t.label,c=t.onClear,d=!1,u=-1,h=-1,m=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},g=(y,p,f,w)=>{let v=Math.round(w*1e3)/1e3;f[p]!==v&&(f[p]=v,y.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{b.clear(),c?.()});let b={el:a,get clipped(){return d},update(y,p){u<0&&(u=ha(a,"motion-meter-fall",Wo)),h<0&&(h=ha(a,"motion-meter-hold",jo));let f=Math.max(0,Math.min(.25,Number(p)||0)),w=u>0?Math.exp(-f/u):0;s.forEach((v,M)=>{let $=y[M]??y[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number($.peak)||0)),x=Math.min(S,Math.max(0,Number($.rms)||0));$.over&&b.clip(),v.level.peak=S>=v.level.peak?S:S+(v.level.peak-S)*w,v.level.rms=x>=v.level.rms?x:x+(v.level.rms-x)*w,v.holdAge+=f,S>=v.holdAt?(v.holdAt=S,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max(S,v.holdAt-Po*f)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,m())},clear(){d=!1,m()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,m()},configure(y){y.onClear&&(c=y.onClear)}};return m(),b.reset(),ui.set(a,b),b}function Go(t){return t?ui.get(t):void 0}function Ho(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*a)),o=Math.max(1,Math.floor(n*a));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function $e(t){return Math.max(0,Math.min(1,t))}function pi(t,e){let{ctx:n,w:a,h:r}=Ho(t);if(!n)return;n.clearRect(0,0,a,r);let o=Eo(t);if(e.paint==="swatch"){let c=K(t,"accent"),d=K(t,"rhythm.step-cell-on");t.dataset.ncAccent=c,t.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(e.paint==="filter"){let c=e.mode??"lp",d=K(t,Lo(c)),u=K(t,"divider"),h=$e(e.cutoff??.5),m=.08+(1-$e(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let b=g/Math.max(1,a),y=0;c==="lp"?y=b<h?1:Math.max(0,1-(b-h)/m):c==="hp"?y=b>h?1:Math.max(0,1-(h-b)/m):y=Math.max(0,1-Math.abs(b-h)/m);let p=r*.78-y*r*.62;g===0?n.moveTo(g,p):n.lineTo(g,p)}n.strokeStyle=d,n.stroke(),n.fillStyle=K(t,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,r),t.dataset.ncAccent=d;return}if(e.paint==="envelope"){n.strokeStyle=K(t,"accent"),n.beginPath();let c=Math.max(.05,e.decay??.4);for(let d=0;d<=a;d++){let u=d/Math.max(1,a),h=(r-4)*(1-Math.exp(-u*4/c));n.lineTo(d,r-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let c=Array.isArray(e.peaks)?e.peaks:[],[d,u]=Array.isArray(e.region)?e.region:[0,1],h=K(t,"accent"),m=K(t,"text-sub"),g=r/2;n.fillStyle=K(t,"accent-soft"),n.fillRect($e(d)*a,0,($e(u)-$e(d))*a,r),n.strokeStyle=K(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let b=Math.floor(c.length/2);for(let y=0;y<b;y++){let p=(y+.5)/b*a,f=Math.max(-1,Math.min(1,c[y*2]??0)),w=Math.max(-1,Math.min(1,c[y*2+1]??0)),v=(y+.5)/b;n.strokeStyle=v>=d&&v<=u?h:m,n.beginPath(),n.moveTo(p,g-w*(g-1)),n.lineTo(p,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[d,u,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round($e(y)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,r),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=K(t,"text"),n.fillRect(Math.round($e(e.position)*(a-1)),0,1,r)),b||(n.fillStyle=m,n.font=o,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let c=$e(e.level??0);n.fillStyle=K(t,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=K(t,"accent"),n.fillRect(0,r*.4,a*c,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=K(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=K(t,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),t.dataset.ncAccent=K(t,"accent")}var hi={slop:8,longPressMs:500,pitchPx:16},Do=class{constructor(t,e,n=hi){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Zo(t,e,n,a=hi){let r=!1,o=0,s=(d,u)=>{let h=t.ownerDocument.elementFromPoint?.(d,u),m=[...t.querySelectorAll(e)],g=h?m.findIndex(p=>p===h||p.contains(h)):-1;if(g>=0)return g;let b=-1,y=Number.POSITIVE_INFINITY;return m.forEach((p,f)=>{if(p.hidden)return;let w=p.getBoundingClientRect();if(u<w.top||u>w.bottom)return;let v=Math.abs(d-(w.left+w.width/2));v<y&&v<=w.width&&(b=f,y=v)}),b},l=new Do(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),t.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),t.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),t.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),t.addEventListener("contextmenu",d=>d.preventDefault()),l}var Ct="application/x-nc-pad",ma="http://www.w3.org/2000/svg";function Yo(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*e/n),l=Math.max(s+1,Math.floor((o+1)*e/n)),c=0,d=0;for(let h=s;h<l;h++)c=Math.min(c,t[2*h]??0),d=Math.max(d,t[2*h+1]??0);let u=n===1?50:o/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Xo(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((r,o)=>a.append(_o(n,o,e))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Rt(n)}),fi(n,t),n}function _o(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(ma,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(ma,"path");return c.append(d),a.append(r,o,s,l,c),Uo(t,a,e,n),a.addEventListener("dblclick",()=>{let u=n(t);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&mi(t,a,e,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(Ct,String(e)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let h=u.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(Ct)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=h.includes(Ct)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let h=n(t);if(h?.type!=="padGrid")return;let m=u.dataTransfer?.getData(Ct);if(m!==void 0&&m!==""){u.preventDefault(),u.stopPropagation();let b=Number(m);b!==e&&h.onMove?.(b,e,u.altKey);return}let g=u.dataTransfer?.files?.[0];g&&(u.preventDefault(),u.stopPropagation(),h.onFile?.(e,g))}),a}function qo(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Uo(t,e,n,a){let r=0,o=!1,s=0,l=0,c=()=>{window.clearTimeout(r),r=0};e.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,s=d.clientX,l=d.clientY,c();let u=a(t);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=fa(t,e,n,a)},450)))}),e.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,c);e.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=fa(t,e,n,a)}),e.addEventListener("click",()=>{if(o){o=!1;return}qo(t,n,a)})}function fa(t,e,n,a){let r=a(t);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Rt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Rt(t)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let u of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=u.id,h.textContent=u.label,h.addEventListener("click",()=>{Rt(t);let m=a(t);m?.type==="padGrid"&&(u.id==="rename"&&m.onRename?mi(t,e,n,a):m.onMenu?.(n,u.id))}),l.append(h)}t.append(s,l);let c=t.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function mi(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(t);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let h=o.value.trim();o.remove(),e.focus();let m=a(t);u&&h&&m?.type==="padGrid"&&m.onRename?.(n,h)};o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])o.addEventListener(u,h=>h.stopPropagation());t.append(o),o.focus(),o.select()}function Rt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function fi(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),c?.setAttribute("d",Yo(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let u=e.selected===r;u?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",u?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function ne(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Kt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function ga(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function yt(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Vo=450,ba=8;function be(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Ko(t){let e=Ao(t,"target-min");return e>0?e:44}function Jo(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Ko(t),a=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,h=c+a,m=d-a,g=d+a;for(let b=0;b<e.length;b++){if(o===b)continue;let y=r[b];if(!y||y.width===0)continue;let p=y.left+y.width/2,f=y.top+y.height/2;Math.abs(f-d)<a*2&&(p>c?h=Math.min(h,(c+p)/2):p<c&&(u=Math.max(u,(c+p)/2))),Math.abs(p-c)<a*2&&(f>d?g=Math.min(g,(d+f)/2):f<d&&(m=Math.max(m,(d+f)/2)))}u=Math.min(u,l.left),h=Math.max(h,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${m-l.top}px`,s.style.width=`${Math.max(0,h-u)}px`,s.style.height=`${Math.max(0,g-m)}px`,s.style.transform="none"}}function gi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ya(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ot(t,e){switch(t.type){case"slider":return Qo(t,e);case"select":return ts(t,e);case"toggle":return ns(t,e);case"button":return as(t,e);case"readout":return is(t);case"label":return ls(t);case"note":return wa(t);case"knob":return us(t,e);case"choice":return ps(t,e);case"slotRow":return hs(t,e);case"stepGrid":return bs(t,e);case"canvas":return vs(t);case"fx":return Ss(t,e);case"strip":return ks(t,e);case"stripAdd":return xs(t,e);case"padGrid":return Xo(t,e);case"moves":return os(t,e);default:return wa({id:"unknown",text:""})}}function Le(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,yi(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??yt(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),ga(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")ga(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&cs(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??yt(e.value))}else if(e.type==="choice")wi(t,e);else if(e.type==="slotRow")ki(t,e);else if(e.type==="stepGrid")An(t,e);else if(e.type==="padGrid")fi(t,e);else if(e.type==="moves")bi(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&pi(n,e)}else if(e.type==="strip"){Mi(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${Ln(n.id)}"]`);a instanceof Element&&Le(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")xi(t,e);else if(e.type==="fx"){Ai(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${Ln(n.id)}"]`);a instanceof Element&&Le(a,n)}}}}function Qo(t,e){let n=Kt(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{let o=e(a);o?.type==="slider"&&o.onChange(Number(a.value))}),a.addEventListener("change",()=>{let o=e(a);o?.type==="slider"&&o.onCommit?.(Number(a.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(a,r),t.onTap&&n.insertBefore(es(t,a,e),r),n.append(ne()),Le(n,t),n}function es(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(be());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function ts(t,e){let n=Kt(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,a.append(o)}return a.value=t.value,a.addEventListener("change",()=>{let r=e(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,ne()),n}function ns(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(ne()),Le(n,t),n}function as(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(ne()),Le(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=gi(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&$i(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function is(t){let e=Kt(t.id,t.label);return e.append(ne()),Le(e,t),e}var rs=450;function os(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(ss(l.icon)),c.addEventListener("click",()=>{let d=e(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}r.append(o,s),n.append(r)}return bi(n,t),n}function bi(t,e){for(let n of e.groups)for(let a of n.moves){let r=t.querySelector(`[data-nc-move="${Ln(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function ss(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function ls(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(ne()),e}function wa(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(ne()),e}function va(t){if(typeof t.valueText=="string")return t.valueText;let e=yt(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function yi(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function cs(t,e){let n=e.max-e.min||1,a=(e.value-e.min)/n;yi(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(a*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",va(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${va(e)}`}function ds(t,e){let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function us(t,e){let n=Kt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",c=>{o=c.clientY;let d=e(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId)}),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;let d=e(a);if(d?.type!=="knob")return;let u=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,s-(c.clientY-o)*u/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{let c=e(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{let d=e(a);if(d?.type!=="knob")return;let u=ds(d,c);u!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,u))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(a,l),n.append(ne()),Le(n,t),n}function ps(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let a of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(ne()),wi(n,t),n}function wi(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function hs(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let h=t.slots[u],m=document.createElement("span");m.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(u),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,be()),ms(m,g,n,u,e),a.append(m)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=gi(),r.append(be()),r.addEventListener("click",()=>{$i(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,o,ne()),vi(n,e),ki(n,t),n}function ka(t,e,n,a){let r=n(t);if(r?.type!=="slotRow")return;lt(t);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(e,o)}function ms(t,e,n,a,r){let o=0,s=0,l=0,c=!1,d=!1,u=!1,h=!1,m=()=>{window.clearTimeout(o),o=0},g=f=>{let w=f.clientX-s,v=f.clientY-l;w*w+v*v>ba*ba&&(c=!0,m())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=f=>{let w=o!==0&&!c&&!d;m(),b(),w&&(u=!0,ka(n,a,r,f))},p=()=>{c=!0,m(),b()};t.addEventListener("pointerdown",f=>{f.button===0&&(b(),d=!1,c=!1,u=!1,s=f.clientX,l=f.clientY,m(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,fs(n,e,a,r))},Vo),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",f=>f.preventDefault()),t.addEventListener("click",f=>{if(u||d||c){u=!1,d=!1,c=!1;return}ka(n,a,r,f)})}function vi(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=$a("Save","store"),r=$a("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),lt(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=e(t);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),lt(t)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),lt(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&lt(t)})}function $a(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function fs(t,e,n,a){vi(t,a);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function lt(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ki(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function $i(t){let e=t.dataset.ncLastFill||null,n=fo(e);t.dataset.ncLastFill=n;let a=go(n);if(a)for(let[r,o]of Object.entries(a))t.style.setProperty(r,o)}function gs(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function bs(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=p=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=p,a.append(f),f},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let f of[o,s]){let w=f===p;f.setAttribute("aria-checked",w?"true":"false"),f.tabIndex=w?0:-1}};l(o);for(let p of[o,s])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let f=s.getAttribute("aria-checked")==="true"?o:s;l(f),f.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),t.onFill&&c.append(gs(n,e)),t.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&f.onClear?.()}),c.append(p)}n.append(c);for(let p of t.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,M=0;w.addEventListener("pointerdown",x=>{v=!1,!(x.pointerType==="mouse"||x.button!==0)&&(M=window.setTimeout(()=>{let A=e(n);A?.type!=="stepGrid"||!A.selectedRows||(v=!0,A.onSelectRow?.(A.rows.findIndex(z=>z.id===p.id),!0))},rs))});for(let x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(M));w.addEventListener("contextmenu",x=>{v&&x.preventDefault()}),w.addEventListener("click",x=>{let A=e(n);if(A?.type!=="stepGrid")return;if(v){v=!1;return}let z=A.rows.findIndex(te=>te.id===p.id),Z=!!A.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);A.onSelectRow?.(z,Z)}),w.addEventListener("keydown",x=>ys(n,w,x));let $=[];for(let x of["mute","solo"]){if(!(x==="mute"?t.onMute:t.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let z=document.createElement("button");z.type="button",z.className="nc-ms",z.dataset.ncMs=x,z.textContent=x==="mute"?"M":"S",z.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${p.label}`),A.append(z,be()),A.addEventListener("click",()=>{let Z=e(n);if(Z?.type!=="stepGrid")return;let te=Z.rows.findIndex(se=>se.id===p.id);(x==="mute"?Z.onMute:Z.onSolo)?.(te)}),$.push(A)}let S=document.createElement("div");S.className="nc-steps";for(let x=0;x<p.steps.length;x++){let A=document.createElement("span");A.className="nc-step-wrap";let z=document.createElement("button");z.type="button",z.className="nc-step",z.dataset.ncStep=`${p.id}:${x}`,z.setAttribute("aria-label",`${p.label} step ${x+1}`),A.append(z,be()),A.addEventListener("click",Z=>{let te=e(n);if(te?.type!=="stepGrid")return;let se=te.rows.findIndex(Ce=>Ce.id===p.id),N=s.getAttribute("aria-checked")==="true";te.onToggle(se,x,Z.shiftKey||N)}),S.append(A)}if(t.onLength&&S.append(ws(n,S,p,e)),f.append(...$,w,S),t.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=p.id,x.setAttribute("aria-label",`Re-roll ${p.label}`),x.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=ya(),x.append(be()),x.addEventListener("click",()=>{let A=e(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(z=>z.id===p.id))}),f.append(x)}f.addEventListener("click",x=>{if(x.target!==f)return;let A=e(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(z=>z.id===p.id))}),xa(n,S,".nc-step-wrap",e,s,()=>p.id),n.append(f)}let d=document.createElement("div");d.className="nc-pads-head";let u=(p,f,w)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=f,w&&v.setAttribute("aria-label",w),v},h=u("nc-pads-step","‹","Previous lane"),m=u("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",An(n,p))}));for(let[p,f]of[[h,-1],[m,1]])p.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let v=w.rows.length;w.onSelectRow?.(((Nt(w)+f)%v+v)%v)});if(d.append(h,g,m),t.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=ya(),p.addEventListener("click",()=>{let f=e(n);if(f?.type!=="stepGrid")return;let w=Nt(f);w>=0&&f.onDice?.(w)}),d.append(p)}if(t.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),d.append(p)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(p),f.textContent=String(p+1),f.addEventListener("click",w=>{let v=e(n);if(v?.type!=="stepGrid")return;let M=Nt(v);if(M<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(M,p+1);return}let $=s.getAttribute("aria-checked")==="true";v.onToggle(M,p,w.shiftKey||$)}),b.append(f)}return xa(n,b,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[Nt(p)]?.id:void 0}),n.append(b),n.append(ne()),An(n,t),n}function Nt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function xa(t,e,n,a,r,o){let s="on",l=!0,c=-1,d=(u,h)=>{let m=u.rows[c]?.steps[h];!m||h>=u.rows[c].length||(u.onSet?u.onSet(c,h,s,l):!!m[s]!==l&&u.onToggle(c,h,s==="accent"))};Zo(e,n,u=>{let h=a(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let m=h.rows.findIndex(g=>g.id===o());m>=0&&h.rows[m].length!==u.pad+1&&h.onLength?.(m,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let m=o();c=h.rows.findIndex(b=>b.id===m);let g=h.rows[c]?.steps[u.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(h,u.pad)}else if(u.kind==="long"){let m=o(),g=h.rows.findIndex(y=>y.id===m),b=e.querySelectorAll(n)[u.pad];g>=0&&b instanceof HTMLElement&&h.onLongPress?.(g,u.pad,b)}}})}function ys(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],r=a.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function ws(t,e,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(be());let o=d=>{let u=a(t);if(u?.type!=="stepGrid")return;let h=u.rows.findIndex(b=>b.id===n.id),m=u.rows[h];if(!m)return;let g=Math.max(1,Math.min(m.steps.length,d));g!==m.length&&u.onLength?.(h,g)},s=d=>{let u=[...e.querySelectorAll(".nc-step")],h=1;return u.forEach((m,g)=>{let b=m.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(h=g+1)}),h},l=d=>o(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),r.addEventListener("keydown",d=>{let u=a(t);if(u?.type!=="stepGrid")return;let h=u.rows.find(g=>g.id===n.id);if(!h)return;let m={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in m&&(d.preventDefault(),o(m[d.key]))}),r}var pn=new WeakMap;function Sa(t,e){let n=typeof e=="number"?e:null;if(!(pn.has(t)&&pn.get(t)===n)){if(pn.set(t,n),n===null){for(let a of Object.keys(ua(1)))t.style.removeProperty(a);return}for(let[a,r]of Object.entries(ua(n)))t.style.setProperty(a,r)}}function An(t,e){let n=e.rows.some(u=>u.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let r=t.querySelector(".nc-pads"),o=e.rows.find(u=>u.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!e.transport?.playing,h=e.transport?.label??(u?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",u?"true":"false");let m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let u=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let h of r.querySelectorAll("[data-nc-pad]")){let m=Number(h.getAttribute("data-nc-pad")),g=o.steps[m];h instanceof HTMLButtonElement&&(h.hidden=!g||!l&&m>=o.length,l&&m>=o.length?h.dataset.out="true":delete h.dataset.out,l&&m===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${m+1}`),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,Sa(h,g?.velocity),e.playhead>=0&&m===u?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let u of e.rows){for(let g=0;g<u.steps.length;g++){let b=u.steps[g],y=t.querySelector(`[data-nc-step="${u.id}:${g}"]`);if(!(y instanceof HTMLButtonElement))continue;let p=y.closest(".nc-row");if(p instanceof HTMLElement){e.selectedRow===u.id?p.dataset.selected="true":delete p.dataset.selected;let v=e.selectedRow!==u.id&&(e.selectedRows??[]).includes(u.id);v?p.dataset.picked="true":delete p.dataset.picked;let M=p.querySelector(".nc-name");M instanceof HTMLElement&&(M.setAttribute("aria-pressed",e.selectedRow===u.id||v?"true":"false"),M.textContent!==u.label&&(M.textContent=u.label,M.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?p.dataset.silent="true":delete p.dataset.silent;for(let $ of p.querySelectorAll("[data-nc-ms]")){let S=$.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;$.setAttribute("aria-pressed",S?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,g%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Sa(y,b.velocity);let f=e.playhead>=0&&u.length>0?(e.playhead%u.length+u.length)%u.length:-1;g===f?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!e.onLength&&e.selectedRow===u.id;y.hidden=g>=u.length&&!w,g>=u.length&&w?y.dataset.out="true":delete y.dataset.out}let h=t.querySelector(`[data-nc-len="${u.id}"]`),m=t.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&m&&m.nextElementSibling!==h){let g=document.activeElement===h;m.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(u.length)),h.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),h.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function vs(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,ne()),e}function ks(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",a.append(r),t.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(b)}),a.append(b)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",b.append(y,be()),b.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(b)}let s=document.createElement("div");s.className="nc-strip-ms";for(let b of["mute","solo"]){if(!(b==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=b,p.textContent=b==="mute"?"M":"S",y.append(p,be()),y.addEventListener("click",()=>{let f=e(n);f?.type==="strip"&&(b==="mute"?f.onMute:f.onSolo)?.()}),s.append(y)}let l=document.createElement("div");l.className="nc-strip-sends";for(let b of t.sends??[])l.append(Ot({...b,type:"knob",compact:!0},e));let c=document.createElement("div");c.className="nc-strip-body";let d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(let b of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(b.value)),y.textContent=b.label,d.append(y)}let u=zo({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:b=>{let y=e(n);y?.type==="strip"&&y.onChange(b)},onReset:()=>{let b=e(n);b?.type==="strip"&&Aa(b)}}),h=Oo({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let b=e(n);b?.type==="strip"&&b.onClipClear?.()}});c.append(d,u.el,h.el);let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let g=0;return m.addEventListener("click",b=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(g),b.detail===0?Ma(n,m,e):b.detail===1&&(g=window.setTimeout(()=>Ma(n,m,e),$s)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(g);let b=e(n);b?.type==="strip"&&Aa(b)}),n.append(a,o,s,l,c,m,ne()),Mi(n,t),n}var $s=250;function Ma(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??yt(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let c=r.value;if(r.remove(),e.hidden=!1,l){let d=n(t);d?.type==="strip"&&d.onTypeIn?.(c)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function xs(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),c=s.value;Si(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,ne()),xi(n,t),n}function xi(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Si(a))}function Si(t){let e=t.options[0];e&&(e.selected=!0)}function Aa(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Mi(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?Bo(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),Go(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let c=e.valueText??yt(e.value);s.textContent!==c&&(s.textContent=c),s.setAttribute("aria-label",`${e.label} level ${c}`);let d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(let c of t.querySelectorAll("[data-nc-ms]")){let d=c.getAttribute("data-nc-ms"),u=d==="mute"?e.mute===!0:e.solo===!0;c.setAttribute("aria-pressed",u?"true":"false"),c.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let c=e.hacksLabel??"Hacks";l.textContent!==c&&(l.textContent=c),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${c}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Ss(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title,t.on===void 0)n.append(a);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=ci({checked:t.on,labelledBy:a.id,onChange:s=>{let l=e(o.el);l?.type==="fx"&&l.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(a,o.el),n.append(r)}for(let r of t.controls)n.append(Ot(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(Ot(s,e));n.append(r)}return n.append(ne()),Ai(n,t),n}function Ai(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Ln(t){return t.replace(/["\\]/g,"\\$&")}function Ms(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&pi(n,a)}Jo(t)}var As=Me["toast-duration"];function Ls({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function Es(t,e,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>t.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=r(e-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function Ts(t,e,n,a,r,o){let s=t.bottom+r,l=Math.max(o,Math.min(t.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of e)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+r,c=!0)}return{top:s,left:l}}var La="data-nc-ui-toast-live";function Cs(t,e){let n=e.querySelector(`[${La}]`);return n||(n=t.createElement("div"),n.setAttribute(La,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function Ns({message:t,actionLabel:e,onAction:n,duration:a=As,onClose:r,avoid:o=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=t,u.appendChild(h);let m=null;e&&(m=c.createElement("button"),m.type="button",m.className="nc-ui-toast-action",m.textContent=e,u.appendChild(m)),l.appendChild(u);let g="open",b=F=>F&&typeof F.getBoundingClientRect=="function"?F.getBoundingClientRect():null,y=b(u),p=y?.height||44,f=d.getComputedStyle?.(u),w=Number.parseFloat(f?.getPropertyValue(Y("toast-offset")))||16,v=Number.parseFloat(f?.getPropertyValue(Y("toast-anchor-gap")))||8,M=b(s),$=d.innerHeight??0,S=o.map(b).filter(Boolean),x=M&&M.bottom>0&&M.top<$?Ts(M,S,{width:y?.width||0,height:p},d.innerWidth??0,v,w):null;x&&x.top+p<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${x.top+(d.scrollY??0)}px`,u.style.left=`${x.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Es(S,$,p,w));let A=d.requestAnimationFrame?.bind(d)??(F=>setTimeout(F,16));A(()=>A(()=>{g==="open"&&u.setAttribute("data-state","open")})),Cs(c,l).textContent=Ls({message:t,actionLabel:e});let z,Z,te=new Promise(F=>{Z=F}),se=F=>{clearTimeout(z),z=setTimeout(()=>oe("timeout"),F)},N=a,Ce=Date.now(),I=()=>{g==="open"&&(clearTimeout(z),N=Math.max(0,N-(Date.now()-Ce)))},P=()=>{g==="open"&&(Ce=Date.now(),se(N))};u.addEventListener("pointerenter",I),u.addEventListener("pointerleave",P),u.addEventListener("focusin",I),u.addEventListener("focusout",P),m?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{oe("action")}}),Number.isFinite(a)&&se(a);function oe(F="close"){if(g!=="open")return;g="closing",clearTimeout(z),u.setAttribute("data-state","closing"),r?.(F);let Vn=d.getComputedStyle?.(u),ir=Vn?Math.max(0,...String(Vn.transitionDuration||"").split(",").map(Jn=>Number.parseFloat(Jn)*(Jn.trim().endsWith("ms")?1:1e3)||0)):0,Kn=()=>{g!=="gone"&&(g="gone",u.remove(),Z(F))};u.addEventListener("transitionend",Kn),setTimeout(Kn,ir+50)}return{el:u,close:oe,closed:te}}var Gt="data-nc-help";function Is(t,e,n,a=0,r=6,o=8){let s=t.top-r-e.height,l=s>=a+o?"above":"below",c=l==="above"?s:t.bottom+r,d=Math.max(o,Math.min(t.left,n-o-e.width));return{top:Math.round(c),left:Math.round(d),side:l}}var hn=new WeakMap;function Rs(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function zs({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=hn.get(t);if(n)return n;let a=t.defaultView,r=null,o=null,s,l=()=>{clearTimeout(s),o=null,r&&(r.hidden=!0)},c=m=>{let g=m.getAttribute(Gt);if(!g)return;r||(r=t.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",t.body.appendChild(r)),r.textContent=g,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let b=m.getBoundingClientRect(),y=Is(b,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,Rs(t));r.style.top=`${y.top}px`,r.style.left=`${y.left}px`,r.dataset.side=y.side,r.style.visibility=""},d=m=>{if(m.pointerType==="touch")return;let g=m.target&&m.target.closest?m.target.closest(`[${Gt}]`):null;g!==o&&(l(),g&&(o=g,s=setTimeout(()=>{o===g&&g.isConnected&&c(g)},e)))},u=m=>{m.key==="Escape"&&l()};t.addEventListener("pointerover",d),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",u),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let h={hide:l,uninstall(){l(),t.removeEventListener("pointerover",d),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",u),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),r?.remove(),r=null,hn.delete(t)}};return hn.set(t,h),h}var Wn="netcomposer.rhythm.hidden.v1",xe=new WeakMap;function mn(){try{return globalThis.localStorage??null}catch{return null}}function Li(t,e=Wn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ea(t,e,n,a=Wn){let r=Li(t,a);n?r.add(e):r.delete(e);try{t?.setItem(a,JSON.stringify([...r]))}catch{}}function jn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)],n=[];for(let a of e)n.push(a),a.type==="fx"&&n.push(...a.controls,...a.more??[]),a.type==="strip"&&n.push(...(a.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function Bs(t,e){if(!(!t||!e))return jn(t).find(n=>n.id===e)}function Ws(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${jn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function js(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),t.append(n),Ei(t,e)}function Ei(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Ps(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=xe.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Bs(n,a)}function Fs(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],a=Ws(e);if(t.dataset.ncSignature===a){for(let r of n){let o=t.querySelector(`[data-nc-section="${Ta(r.id)}"]`);o&&Ei(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${Ta(s.id)}"]`);l instanceof Element&&Le(l,s)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),js(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(Ot(l,Ps));t.append(o)}}function Ta(t){return t.replace(/["\\]/g,"\\$&")}function Os(t,e=Wn){li();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=Li(mn(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=ci({labelledBy:o.id,onChange:f=>(xe.get(n)??t).onToggle?.(f)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",r.append(o,u,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",m.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,r,h,m),n.setAttribute("aria-labelledby",o.id);let y=f=>{let w=xe.get(n)??t;n.dataset.ncOpen=f?"false":"true",h.hidden=f,m.hidden=!f,l.textContent=f?"+":"−",l.setAttribute("aria-expanded",f?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${f?"Show":"Hide"} ${w.title}`),l.title=f?"Show":"Hide",f?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let f=n.dataset.ncOpen==="true";Ea(mn(),(xe.get(n)??t).id,f,e),y(f),En(n.parentElement)}),m.addEventListener("click",()=>{Ea(mn(),(xe.get(n)??t).id,!1,e),y(!1),En(n.parentElement)});let p={el:n,update(f){xe.set(n,f),f.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=f.title,u.textContent=f.status??"",f.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),g.textContent=f.summary??f.title,d.el.hidden=f.on===void 0,d.set(f.on===!0),f.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,m.setAttribute("aria-label",`Show ${f.title}`),Fs(h,f),y(h.hidden),p.redraw()},redraw(){let f=xe.get(n);f&&Ms(n,jn(f))}};return xe.set(n,t),y(a),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Gs(t,e,n="adjacent"){li(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),En(t)}function En(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),a=e.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function Hs(t,e,n,a){const r=Math.min(n,t.length);for(let o=Math.max(0,e);o<r;o++)if(Math.abs(t[o]??0)>=a)return o;return-1}function Ds(t,e,n,a=.35){let r=0;for(let l=0;l<t.length;l++)r=Math.max(r,Math.abs(t[l]??0));if(r<.01)return null;const o=[];for(const l of e){const c=Hs(t,l,l+n,r*a);c>=0&&o.push(c-l)}if(o.length*2<e.length||o.length===0)return null;o.sort((l,c)=>l-c);const s=Math.floor(o.length/2);return o.length%2?o[s]??0:((o[s-1]??0)+(o[s]??0))/2}const Zs="/lucy/assets/capture-processor-DaZ9hnJi.js",ct=["eq","compressor"],Ys={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function Pn(t){if(t!==void 0){const n=ht(t,ct.length);if(n.chain.length===ct.length&&n.chain.every((a,r)=>a.type===ct[r]))return n}return{v:2,chain:ct.flatMap(n=>{const a=Bn(n);return a?[{...a,bypass:!0,dials:{...a.dials,...Ys[n]}}]:[]})}}const Ti={"page:title":"LUCY records a few bars from your mic, or the Studio's Master, and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take's region (between its markers) as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"What Record records: your mic or audio interface (its level, monitor and timing correction), or in the Studio its Master.","module:takes":"Everything you have recorded or loaded, kept in this browser, newest first. The outlined take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take's region looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records the chosen bars from the next bar line: the mic at once (starting the clock), the Master once the music plays. Press again to cancel.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.",status:"What LUCY is doing now: armed and counting in, recording, playing a take, sitting out or stopped.","record-from":"Mic records your input. Master records the whole Studio mix on the bar lines, inside the page: no monitor, and no round trip or nudge applies.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.","takes:empty":"Takes you record, or audio files you Load, appear here as cards, newest first.","take:card":"One take: click it to make it the one Record and Play act on. The outlined card is the selected one.","take:name":"The take's name. Double-click to rename it: Enter saves, Escape cancels.","take:region":"The part that plays, as bar.beat from Start to End, its length in bars and beats, and in seconds.","take:wave":"The take's sound, with its bar lines and fainter beats at the tempo it was recorded at. Outside the markers it is dimmed: that part is skipped.","take:start":"Where the take starts playing. Drag it (Alt or Option skips the snap) or use the arrow keys; double-click to put it back at the start.","take:end":"Where the take stops and loops back to Start. Drag it or use the arrow keys; double-click to put it back at the end.","take:snap":"What the markers snap to: a bar, a beat, an eighth or a sixteenth at the take's tempo, or off. Snapped, the loop is whole beats, so it sits in time.","take:play":"Plays this take, looping its region in time with the clock; Stop stops it. Only the part between the markers plays.","take:send":"Copies this take's region onto a Sampler pad. A region of a bar or more is fitted to the nearest whole bars; a shorter one lands unfitted.","take:more":"Download this take as a WAV file, or delete it.","take:download":"Saves this take's region (between the markers) as a WAV file you can open in any audio app.","take:delete":"Deletes this take from this browser. Undo on the message that follows brings it back.","take:recording":"The take being recorded: it waits for the bar line (or for the Master's music), then fills in as the audio arrives.","take:cancel":"Stops this recording and drops it. Nothing is kept.","take:source":"Where the take came from: your Mic, the Studio's Master, or a File you loaded.","take:fact:bars":"How many bars the whole take lasts at the tempo it was recorded at.","take:fact:secs":"How long the whole take lasts, in seconds.","take:fact:bpm":"The tempo it was recorded at. At another tempo it plays faster or slower, and its pitch follows.","take:fact:chans":"Mono (one channel) or stereo (two).","take:fact:rate":"Its sample rate: how many times a second the sound was measured.","take:fact:when":"When it was recorded or loaded. Rest on it for the full date and time.","send-to":"Which Sampler gets the take, when the Studio holds more than one.","send-pad":"The pad the take goes onto. A pad that has a sample is replaced only if you say so in the Sampler, and Undo there brings it back.","send-go":"Sends the region to the chosen pad. If that pad has a sample, the Sampler opens and asks first.","send-cancel":"Closes the picker without sending anything.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function Ci(t){return`lucy-help-${t.replace(/[^\w-]/g,"-")}`}function Xs(t=document){const e=t.querySelector("[data-lucy-help]");if(e)return e;const n=t.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[a,r]of Object.entries(Ti)){const o=t.createElement("span");o.id=Ci(a),o.textContent=r,n.append(o)}return t.body.append(n),n}function R(t,e,...n){const a=Ti[t];if(!a)return;e&&e.getAttribute(Gt)!==a&&e.setAttribute(Gt,a);const r=Ci(t);for(const o of n)o&&o.getAttribute("aria-describedby")!==r&&o.setAttribute("aria-describedby",r)}function _s(t,e,n,a=r=>r){const r=`module:${e}`;R(r,t.querySelector(".nc-module-hd .nc-title")),R(r,t.querySelector(".nc-slim"));const o=l=>t.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=o(l.id);if(!c)return;const d=a(l.id);switch(l.type){case"slider":case"select":R(d,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":R(d,c.querySelector(".nc-label"));break;case"button":R(d,c,c);break;case"choice":R(d,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":R(d,c);break;case"fx":{R(d,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),R("hack:switch",c.querySelector("[data-nc-fx-switch]"));for(const u of[...l.controls??[],...l.more??[]])s(u);break}}};for(const l of n)s(l)}const D=4,zt=[1,2,4,8];function Tn(t){return Math.ceil(t/D-1e-6)*D+0}function qs(t,e,n=0){let a=Tn(t);return a-t<n&&(a+=D),{startBeat:a,endBeat:a+e*D}}function Us(t,e,n,a){const r=Math.round((t+n)*a);return{startFrame:r,endFrame:r+Math.round((e-t)*a)}}function Je(t){return 60/t}function Vs(t,e,n){const a=o=>Math.round(o*4*Je(n)*e),r=zt.find(o=>a(o)>=t)??zt[zt.length-1];return{bars:r,frames:a(r),trimmed:t>a(r)}}const Ca="master",Ks=1,Js=6e3;function Qs(t,e,n=0,a=Ks){if(e){const o=Math.max(0,Math.floor(t/D)*D);return t-o<=a?o:Tn(t)}let r=Math.max(0,Tn(t));return r-t<n&&(r+=D),r}function el(t,e,n,a){const r=Math.round(t*a);return{from:r,to:r+tl(e,n,a)}}function tl(t,e,n){return Math.round(t*D*60/e*n)}class nl{constructor(e){this.deps=e}current={kind:"idle"};rec=null;stopTimer=null;job=0;get phase(){return this.current}get busy(){return this.current.kind!=="idle"}press(){this.busy?this.cancel():this.arm()}arm(){if(this.busy)return!0;const e=this.deps.grab();return e?.record?(e.listen(Ca),this.set({kind:"waiting"}),this.deps.running()&&this.start(!1),!0):(this.deps.failed("unavailable"),!1)}cancel(){this.drop(),this.set({kind:"idle"})}clockChanged(e){this.current.kind==="waiting"&&this.deps.running()?this.start(e):this.current.kind==="recording"&&!this.deps.running()&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("stopped"))}start(e){const n=this.deps.grab(),a=Qs(this.deps.beatNow(),e,this.deps.leadBeats()),r=this.deps.bars(),o=this.deps.bpm(),s=this.deps.sampleRate(),{from:l,to:c}=el(this.deps.contextTime(a),r,o,s),d=n?.record?.(Ca,l)??null;if(!d){this.set({kind:"idle"}),this.deps.failed("unavailable");return}const u=++this.job,h=this.deps.nextId();this.rec=d,this.set({kind:"recording",id:h,startBeat:a,endBeat:a+r*D,bars:r,bpm:o,from:l,to:c});const m=(c-l)/s*1e3,g=Math.max(0,(this.deps.contextTime(a)-this.nowContext())*1e3);this.stopTimer=this.deps.after(g+m+Js,()=>{u===this.job&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("timeout"))}),d.stop(c).then(b=>this.finish(u,b),()=>this.finish(u,null))}nowContext(){return this.deps.contextTime(this.deps.beatNow())}finish(e,n){if(e!==this.job||this.current.kind!=="recording")return;const a=this.current;this.stopTimer?.(),this.stopTimer=null,this.rec=null,this.set({kind:"idle"});const r=n?.[0]?.length??0;if(!n||r===0){this.deps.failed("empty");return}this.deps.done({id:a.id,bars:a.bars,bpm:a.bpm,startBeat:a.startBeat,from:a.from,to:a.to,channels:n})}drop(){this.job++,this.stopTimer?.(),this.stopTimer=null,this.rec?.cancel(),this.rec=null}set(e){this.current=e,this.deps.changed()}}function al(t){let e=0;for(const n of t)for(const a of n)e=Math.max(e,Math.abs(a));return e}const Jt=600;class Ht{constructor(e,n=Jt){this.totalFrames=e,this.columns=n,this.peaks=new Float32Array(n*2)}peaks;at=0;get filled(){return this.totalFrames<=0?0:Math.min(this.columns,Math.ceil(this.at/this.totalFrames*this.columns))}get frames(){return this.at}add(e){const n=e[0]?.length??0;if(!n||this.totalFrames<=0)return;const a=this.totalFrames/this.columns;let r=0;for(;r<n&&this.at<this.totalFrames;){const o=Math.min(this.columns-1,Math.floor(this.at/a)),s=Math.min(this.totalFrames,Math.ceil((o+1)*a)),l=Math.max(1,Math.min(n-r,s-this.at));let c=this.peaks[o*2]??0,d=this.peaks[o*2+1]??0;for(const u of e)for(let h=r;h<r+l;h++){const m=u[h]??0;m<c&&(c=m),m>d&&(d=m)}this.peaks[o*2]=Math.max(-1,c),this.peaks[o*2+1]=Math.min(1,d),r+=l,this.at+=l}}}function Qt(t,e=Jt){const n=new Ht(t[0]?.length??0,e);return n.add(t),n.peaks}function Na(t,e=t.length/2,n=.01){const a=Math.min(t.length/2,Math.max(0,Math.floor(e)));if(!a)return"";const r=l=>Math.round(l*1e3)/1e3,o=[],s=[];for(let l=0;l<a;l++){const c=Math.max(t[l*2+1]??0,n);o.push(`${l} ${r(-c)}`,`${l+1} ${r(-c)}`)}for(let l=a-1;l>=0;l--){const c=Math.min(t[l*2]??0,-n);s.push(`${l+1} ${r(-c)}`,`${l} ${r(-c)}`)}return`M${o.join("L")}L${s.join("L")}Z`}function il(t,e=Date.now()){const n=Date.parse(t);if(!Number.isFinite(n))return"";const a=Math.max(0,(e-n)/1e3);if(a<45)return"just now";const r=Math.round(a/60);if(r<60)return`${r} min ago`;const o=Math.round(r/60);if(o<24)return`${o} h ago`;const s=Math.round(o/24);return s===1?"yesterday":s<7?`${s} days ago`:new Date(n).toLocaleDateString(void 0,{day:"numeric",month:"short"})}function rl(t){const e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"}):""}const ol="instance",sl=99;function St(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(ol)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=sl?n:1}function Ia(t,e){return e===1?t:`${t}#${e}`}function ll(t,e){return e===1?t:`${t} ${e}`}let Ge;function cl(t,e=St()){if(Ge!==void 0)return Ge;Ge=null;try{if(typeof window>"u"||window.parent===window)return Ge;const n=window.parent.ncStudio;n&&n.version===1&&(Ge=n.attach(t,{instance:e}))}catch{}return Ge}function dl(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,r,o)=>n.request(`${a}${e}`,r,o)}:null}}function ul(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Fn(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function wt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function Dt(t,e=St()){return e>1?`${t}#${e}`:t}function pl(t,e=St()){const n=wt()?.owner()??null;return n===null||n==="studio"||n===Dt(t,e)}const De=["off","bar","beat","8","16"],hl="beat",ml={off:"Off",bar:"Bar",beat:"Beat",8:"1/8",16:"1/16"};function ye(t){return 60/t.bpm*t.sampleRate}function Ni(t,e){const n=ye(t);switch(e){case"bar":return n*D;case"beat":return n;case"8":return n/2;case"16":return n/4;default:return null}}function Ii(t){return Math.min(t.frames,Math.max(1,Math.round(ye(t)/4)))}function ke(t){return t.region??{start:0,end:t.frames}}function fl(t,e){return e.start<=0&&e.end>=t.frames}function gl(t,e,n){const a=Ni(t,n),r=Math.max(0,Math.min(t.frames,e));if(a===null)return Math.round(r);const o=Math.round(Math.round(r/a)*a);return Math.abs(t.frames-r)<Math.abs(o-r)?t.frames:Math.max(0,Math.min(t.frames,o))}function dt(t,e,n){const a=ke(t),r=Ii(t),o=Math.round(n);return e==="start"?{start:Math.max(0,Math.min(o,a.end-r)),end:a.end}:{start:a.start,end:Math.min(t.frames,Math.max(o,a.start+r))}}function bl(t,e){if(!e||typeof e!="object")return;const n=e,a=n.start,r=n.end;if(typeof a!="number"||typeof r!="number"||!Number.isFinite(a)||!Number.isFinite(r))return;const o=Math.round(a),s=Math.round(r);if(!(o<0||s>t.frames||s-o<Ii(t))&&!(o===0&&s===t.frames))return{start:o,end:s}}function Ra(t,e,n,a,r=!1){const o=ke(t),s=e==="start"?o.start:o.end,l=r?ye(t)*D:Ni(t,a)??ye(t)/4,c=s/l,u=Math.abs(c-Math.round(c))*l<.5?Math.round(c)+n:n>0?Math.ceil(c):Math.floor(c);let h=Math.round(u*l);return n>0&&h>t.frames&&(h=t.frames),n>0&&Math.abs(t.frames-h)<1&&(h=t.frames),dt(t,e,h)}function za(t,e){const n=e/ye(t)*4,a=Math.round(n),r=Math.abs(n-a)*(ye(t)/4)<1,o=r?a:Math.floor(n),s=Math.floor(o/16)+1,l=Math.floor(o%16/4)+1,c=o%4+1;return`${r?"":"≈"}${s}.${l}${c===1?"":`.${c}`}`}function yl(t){const e=Math.round(t*1e3)/1e3,n=Math.floor((e+1e-9)/D),a=Math.round((e-n*D)*1e3)/1e3,r=[];if(n&&r.push(`${n} bar${n===1?"":"s"}`),a>0||!n){const o=Number.isInteger(a)?String(a):String(Math.round(a*100)/100);r.push(`${o} beat${a===1?"":"s"}`)}return r.join(" ")}function On(t,e=ke(t)){return(e.end-e.start)/ye(t)}function wl(t,e=ke(t)){const n=(e.end-e.start)/t.sampleRate;return`${za(t,e.start)} → ${za(t,e.end)} · ${yl(On(t,e))} · ${n.toFixed(2)} s`}function vl(t,e,n){const a=Math.round(n/ye(t)*4),r=Math.floor(a/16)+1,o=Math.floor(a%16/4)+1;return`${e==="start"?"Start":"End"}: ${(n/t.sampleRate).toFixed(2)} s, bar ${r} beat ${o}`}function kl(t,e=ke(t)){const n=On(t,e)/D;return n>=1-1e-6?Math.max(1,Math.round(n)):void 0}function Ri(t,e){return t.map(n=>n.slice(e.start,e.end))}function $l(t,e,n=0){let a=Math.ceil(t/D-1e-6)*D+0;a-t<n&&(a+=D);const r=Math.max(1e-6,e),o=(a%r+r)%r;return{startBeat:a,offsetBeats:Math.abs(o-r)<1e-6?0:o}}function xl(t){const e=ye(t),n=[],a=[],r=Math.floor(t.frames/e+1e-6);for(let o=1;o<=r;o++){const s=o*e/t.frames;if(s>=1-1e-6)break;(o%D===0?n:a).push(s)}return{bars:n,beats:a}}const Sl={mic:"Mic",master:"Master",file:"File"},zi=40;function Bi(t){return t.source??(t.name===`Master ${t.id}`?"master":"mic")}function rt(t){return t.snap??hl}function Ml(t,e){t.source??=Bi(t);const n=e.replace(/\s+/g," ").trim().slice(0,zi);return!n||n===`Take ${t.id}`?t.name=void 0:t.name=n,t.name}const Xe={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1,source:"mic"};function ge(t){return t.name??`Take ${t.id}`}const Ba=new Set([1,2,4,8]);function en(t){const e=t&&typeof t=="object"?t:{},n=(l,c,d)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=d?l:null,a=Array.isArray(e.takes)?e.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},d=n(c.id,1,1e9),u=n(c.bars,1,8),h=n(c.bpm,20,300),m=n(c.sampleRate,8e3,192e3),g=n(c.channels,1,2),b=n(c.frames,0,1e9);if(d===null||u===null||!Ba.has(u)||h===null||m===null||g===null||b===null)return[];if(c.saved!==!0)return[];const y=typeof c.name=="string"&&c.name.trim()?c.name.trim().slice(0,zi):void 0,p={id:d,bars:u,bpm:h,sampleRate:m,channels:g,frames:b,created:String(c.created??""),saved:!0,...y?{name:y}:{}};(c.source==="mic"||c.source==="master"||c.source==="file")&&(p.source=c.source);const f=bl(p,c.region);return f&&(p.region=f),typeof c.snap=="string"&&De.includes(c.snap)&&(p.snap=c.snap),[p]}):[],r=n(e.bars,1,8),o=n(e.selected,1,1e9),s=Math.max(n(e.nextId,1,1e9)??1,...a.map(l=>l.id+1));return{bars:r!==null&&Ba.has(r)?r:Xe.bars,monitor:typeof e.monitor=="boolean"?e.monitor:Xe.monitor,roundTripMs:n(e.roundTripMs,0,1e3),nudgeMs:n(e.nudgeMs,-10,10)??0,takes:a,selected:o!==null&&a.some(l=>l.id===o)?o:a.at(-1)?.id??null,nextId:s,master:n(e.master,0,1)??Xe.master,source:e.source==="master"?"master":"mic",...e.fx&&typeof e.fx=="object"?{fx:e.fx}:{}}}function Al(t,e=Wi()){try{const n=e?.getItem(t);return n?en(JSON.parse(n)):{...Xe,takes:[]}}catch{return{...Xe,takes:[]}}}function Ll(t,e,n=Wi()){try{n?.setItem(t,JSON.stringify(e))}catch{}}function Wi(){try{return globalThis.localStorage??null}catch{return null}}function El(t,e){const n=ke(t),a=kl(t,n);return{name:ge(t),sampleRate:t.sampleRate,channels:Ri(e,n),...a!==void 0?{bars:a}:{},bpm:t.bpm}}class Tl{constructor(e,n){this.state=e,this.removeFile=n}pending=new Map;delete(e){const n=this.state.takes.findIndex(r=>r.id===e),a=this.state.takes[n];return a?(this.pending.set(e,{meta:a,index:n,selected:this.state.selected===e}),this.state.takes.splice(n,1),this.state.selected===e&&(this.state.selected=null),!0):!1}undo(e){const n=this.pending.get(e);return n?(this.pending.delete(e),this.state.takes.some(a=>a.id===e)||this.state.takes.splice(Math.min(n.index,this.state.takes.length),0,n.meta),n.selected&&(this.state.selected=e),n.meta):null}async settle(e){this.pending.delete(e)&&await this.removeFile(e)}get held(){return[...this.pending.keys()]}}function He(t,e){return`${t}-take-${e}.f32`}function Cl(t){return t.channels*t.frames*4}class Nl{constructor(e){this.prefix=e}memory=new Map;dir=null;ready=Promise.resolve();adopt(e,n){return e===this.prefix||!n.length?this.ready:(this.ready=(async()=>{const a=await this.folder();if(a)for(const r of n){try{await a.getFileHandle(He(this.prefix,r));continue}catch{}try{const o=await(await a.getFileHandle(He(e,r))).getFile(),l=await(await a.getFileHandle(He(this.prefix,r),{create:!0})).createWritable?.();if(!l)continue;await l.write(await o.arrayBuffer()),await l.close()}catch{}}})(),this.ready)}folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(e,n){this.memory.set(e,n),await this.ready;const a=await this.folder();if(!a)return!1;try{const o=await(await a.getFileHandle(He(this.prefix,e),{create:!0})).createWritable?.();if(!o)return!1;for(const s of n)await o.write(s);return await o.close(),!0}catch{return!1}}async load(e){const n=this.memory.get(e.id);if(n)return n.length===e.channels&&n.every(r=>r.length===e.frames)?n:null;await this.ready;const a=await this.folder();if(!a)return null;try{const r=await(await a.getFileHandle(He(this.prefix,e.id))).getFile();if(r.size!==Cl(e))return null;const o=new Float32Array(await r.arrayBuffer()),s=Array.from({length:e.channels},(l,c)=>o.slice(c*e.frames,(c+1)*e.frames));return this.memory.set(e.id,s),s}catch{return null}}async remove(e){this.memory.delete(e),await this.ready;const n=await this.folder();try{await n?.removeEntry(He(this.prefix,e))}catch{}}}function Il(t,e){const n=t[0]?.length??0,a=t.length,r=n*a*4,o=new DataView(new ArrayBuffer(44+r)),s=(c,d)=>{for(let u=0;u<d.length;u++)o.setUint8(c+u,d.charCodeAt(u))};s(0,"RIFF"),o.setUint32(4,36+r,!0),s(8,"WAVE"),s(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,3,!0),o.setUint16(22,a,!0),o.setUint32(24,e,!0),o.setUint32(28,e*a*4,!0),o.setUint16(32,a*4,!0),o.setUint16(34,32,!0),s(36,"data"),o.setUint32(40,r,!0);let l=44;for(let c=0;c<n;c++)for(let d=0;d<a;d++)o.setFloat32(l,t[d]?.[c]??0,!0),l+=4;return new Uint8Array(o.buffer)}const Gn="netcomposer.lucy",Zt=1;function Rl(t){const{roundTripMs:e,nudgeMs:n,...a}=en(JSON.parse(JSON.stringify(t)));return{format:Gn,v:Zt,...a,fx:Pn(a.fx)}}function zl(t,e){const n=Bl(e);return{...n,roundTripMs:t.roundTripMs,nudgeMs:t.nudgeMs,nextId:Math.max(n.nextId,t.nextId)}}function Bl(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Not a LUCY preset: expected an object.");const e=t;if(e.format!==void 0&&e.format!==Gn)throw new Error(`Not a LUCY preset: format ${String(e.format)}.`);if(e.v!==void 0){if(typeof e.v!="number"||!Number.isInteger(e.v)||e.v<0)throw new Error("Not a LUCY preset: bad version.");if(e.v>Zt)throw new Error(`LUCY preset v${e.v} is newer than this LUCY (v${Zt}).`)}if(!Array.isArray(e.takes)||typeof e.bars!="number")throw new Error("Not a LUCY preset: no takes or length.");const n=en(e);return{...n,fx:Pn(n.fx)}}function Wl(t){return t.replace(/[\\/]/g,"~")}function jl(t,e=St()){const n=Ia("lucy.state",e),a=Ia("lucy",e),r=typeof t?.storageKey=="function"?t.storageKey.bind(t):null;return r?{state:r("lucy.state"),files:Wl(r("lucy")),legacyState:n,legacyFiles:a}:{state:n,files:a,legacyState:n,legacyFiles:a}}function Pl(t,e){if(!e||t.state===t.legacyState)return null;try{if(e.getItem(t.state)!==null)return null;const n=e.getItem(t.legacyState);let a={...Xe,takes:[]};if(n)try{a=en(JSON.parse(n))}catch{}return e.setItem(t.state,JSON.stringify(a)),n?a.takes.map(r=>r.id):null}catch{return null}}const mt="http://www.w3.org/2000/svg";function E(t,e,n={},...a){const r=document.createElement(t);e&&(r.className=e);for(const[o,s]of Object.entries(n))r.setAttribute(o,s);return r.append(...a),r}function J(t,e){t.textContent!==e&&(t.textContent=e)}function ae(t,e,n){n===null?t.hasAttribute(e)&&t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ot(t,e,n){ae(t,`data-${e}`,n?"true":null)}function Wa(){const t=document.createElementNS(mt,"svg");t.setAttribute("class","lucy-wave-svg"),t.setAttribute("viewBox",`0 -1 ${Jt} 2`),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("aria-hidden","true");const e=o=>{const s=document.createElementNS(mt,"path");return s.setAttribute("class",o),t.append(s),s},n=e("lucy-wave-env"),a=e("lucy-wave-beats"),r=e("lucy-wave-bars");return{svg:t,beats:a,bars:r,env:n}}function Fl(){const t=document.createElementNS(mt,"svg");t.setAttribute("class","lucy-take-play-icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");const e=document.createElementNS(mt,"path");e.setAttribute("class","lucy-icon-play"),e.setAttribute("d","M7 5 L19 12 L7 19 Z");const n=document.createElementNS(mt,"path");return n.setAttribute("class","lucy-icon-stop"),n.setAttribute("d","M6 6 H18 V18 H6 Z"),t.append(e,n),t}function fn(t){return t.map(e=>`M${Math.round(e*Jt*100)/100} -1V1`).join("")}class Ol{constructor(e){this.on=e,this.el=E("div","lucy-takes"),this.list=E("div","lucy-take-list",{role:"list"}),this.emptyLine=E("p","lucy-takes-empty"),R("takes:empty",this.emptyLine),this.el.append(this.emptyLine,this.list),document.addEventListener("pointerdown",n=>{this.openMenu&&!this.openMenu.root.querySelector(".lucy-take-more-wrap")?.contains(n.target)&&this.closeMenu()})}el;list;emptyLine;cards=new Map;live=null;openMenu=null;render(e){this.renderLive(e.live);const n=!e.takes.length&&!e.live;if(this.emptyLine.hidden=!n,n){J(this.emptyLine,""),this.emptyLine.firstChild||this.emptyLine.append(E("span","lucy-takes-empty-line",{},"No takes yet. Record or load a WAV."),E("span","lucy-takes-empty-hint"));const o=this.emptyLine.querySelector(".lucy-takes-empty-hint");o&&J(o,e.hint)}const a=new Set;let r=this.live?.root??null;for(const o of e.takes){a.add(o.id);let s=this.cards.get(o.id);s||(s=this.create(o),this.cards.set(o.id,s)),this.update(s,o,e),(r?r.nextElementSibling:this.list.firstElementChild)!==s.root&&(r?r.after(s.root):this.list.prepend(s.root)),r=s.root}for(const[o,s]of this.cards)a.has(o)||(this.openMenu===s&&(this.openMenu=null),s.root.remove(),this.cards.delete(o))}setPlayhead(e,n){for(const a of this.cards.values()){const r=a.id===e&&n>=0;if(r){const o=n.toFixed(4);a.wave.style.getPropertyValue("--lucy-at")!==o&&a.wave.style.setProperty("--lucy-at",o)}ot(a.wave,"head",r)}}card(e){return this.cards.get(e)?.root}renderLive(e){if(!e){this.live?.root.remove(),this.live=null;return}if(!this.live){const r=E("span","lucy-take-live-label",{"aria-live":"polite"}),o=E("button","nc-page-action lucy-take-action",{type:"button"},"Cancel");o.addEventListener("click",()=>this.on.cancelRecording()),R("take:cancel",o,o);const{svg:s,bars:l,env:c}=Wa(),d=E("div","lucy-take-wave",{"data-live":"true"},s),u=E("span","lucy-take-name lucy-take-name-live",{},"New take"),h=E("article","lucy-take",{"data-live":"true",role:"listitem","aria-label":"Recording"},E("div","lucy-take-hd",{},u,r,E("div","lucy-take-actions",{},o)),d);R("take:recording",r),this.list.prepend(h),this.live={root:h,label:r,env:c,bars:l,drawn:""}}J(this.live.label,e.label);const n=e.bars.join(",");this.live.bars.dataset.key!==n&&(this.live.bars.dataset.key=n,this.live.bars.setAttribute("d",fn(e.bars)));const a=e.peaks?`${e.filled}`:"";a!==this.live.drawn&&(this.live.drawn=a,this.live.env.setAttribute("d",e.peaks?Na(e.peaks,e.filled):"")),this.list.firstElementChild!==this.live.root&&this.list.prepend(this.live.root)}create(e){const n=e.id,a=E("h3","lucy-take-name",{tabindex:"0"}),r=E("span","lucy-take-region nc-readout"),o=(I,P)=>{const oe=E("button","nc-page-action lucy-take-action",{type:"button","data-take-action":P},I);return R(`take:${P}`,oe,oe),oe},s=E("button","lucy-take-play",{type:"button","data-take-action":"play","aria-label":"Play","aria-pressed":"false"},Fl());R("take:play",s,s);const l=E("span","lucy-take-source");R("take:source",l);const c=o("Send to Sampler","send"),d=E("button","nc-page-action lucy-take-action lucy-take-more",{type:"button","aria-haspopup":"menu","aria-expanded":"false","aria-label":"More actions","data-take-action":"more"},"⋯");R("take:more",d,d);const u=E("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"download"},"Download WAV"),h=E("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"delete"},"Delete");R("take:download",u,u),R("take:delete",h,h);const m=E("div","lucy-take-menu",{role:"menu"},u,h);m.hidden=!0;const g=E("div","lucy-take-actions",{},c,E("span","lucy-take-more-wrap",{},d,m)),{svg:b,env:y}=Wa(),p=I=>{const P=E("div","lucy-take-marker",{role:"slider",tabindex:"0","data-marker":I,"aria-orientation":"horizontal"});return R(`take:${I}`,P,P),P},f={start:p("start"),end:p("end")},w=E("span","lucy-take-wave-empty"),v=E("div","lucy-take-barnums",{"aria-hidden":"true"}),M=E("div","lucy-take-wave",{role:"group"},v,b,E("div","lucy-take-dim",{"data-side":"start"}),E("div","lucy-take-dim",{"data-side":"end"}),E("div","lucy-take-playhead",{"aria-hidden":"true"},E("span","lucy-take-playhead-line")),f.start,f.end,w);M.style.setProperty("--lucy-at","-1"),R("take:wave",M);const $=I=>{const P=E("span","lucy-take-fact",{"data-fact":I});return R(`take:fact:${I}`,P),P},S={bars:$("bars"),secs:$("secs"),bpm:$("bpm"),chans:$("chans"),rate:$("rate"),when:$("when")},x=E("span","lucy-take-snap-label",{id:`lucy-snap-${n}`},"Snap"),A=E("span","nc-choice-row lucy-take-snap",{role:"radiogroup","aria-labelledby":`lucy-snap-${n}`});for(const I of De){const P=E("button","nc-choice lucy-take-snap-opt",{type:"button",role:"radio","data-snap":I,"aria-checked":"false",tabindex:"-1"},ml[I]);P.addEventListener("click",()=>this.on.setSnap(n,I)),A.append(P)}A.addEventListener("keydown",I=>{const P=I.key==="ArrowRight"||I.key==="ArrowDown"?1:I.key==="ArrowLeft"||I.key==="ArrowUp"?-1:0;if(!P)return;I.preventDefault();const oe=De.indexOf(rt(N.meta)),F=De[(oe+P+De.length)%De.length]??"beat";this.on.setSnap(n,F),A.querySelector(`[data-snap="${F}"]`)?.focus()}),R("take:snap",x,A);const z=E("div","lucy-take-facts nc-readout",{},...Object.values(S),E("span","lucy-take-snap-wrap",{},x,A)),Z=E("div","lucy-take-picker");Z.hidden=!0;const te=E("p","lucy-take-note",{"aria-live":"polite"});te.hidden=!0;const se=E("article","lucy-take",{role:"listitem","data-take":String(n)},E("div","lucy-take-hd",{},s,E("div","lucy-take-title",{},a,l,r),g),M,z,Z,te);R("take:card",null,se),R("take:name",a),R("take:region",r);const N={id:n,root:se,name:a,region:r,play:s,sourcePill:l,barNums:v,send:c,more:d,menu:m,download:u,remove:h,wave:M,env:y,empty:w,markers:f,facts:S,snap:A,picker:Z,note:te,drawn:"none",gridKey:"",meta:e,draft:null,editing:!1};se.addEventListener("click",I=>{I.target.closest("button, select, input, label, [role=slider], .lucy-take-picker")||this.on.select(n)}),s.addEventListener("click",()=>this.on.play(n)),c.addEventListener("click",()=>this.on.openSend(n)),d.addEventListener("click",()=>this.openMenu===N?this.closeMenu():this.showMenu(N)),m.addEventListener("keydown",I=>{I.key==="Escape"&&(this.closeMenu(),d.focus())}),u.addEventListener("click",()=>{this.closeMenu(),this.on.download(n)}),h.addEventListener("click",()=>{this.closeMenu(),this.on.remove(n)});const Ce=()=>{if(N.editing)return;N.editing=!0;const I=E("input","lucy-take-rename",{type:"text",maxlength:"40","aria-label":`Rename ${ge(N.meta)}`,value:ge(N.meta)});a.replaceWith(I),I.focus(),I.select();let P=!1;const oe=F=>{P||(P=!0,N.editing=!1,I.replaceWith(a),F&&this.on.rename(n,I.value),a.focus())};I.addEventListener("keydown",F=>{F.key==="Enter"?(F.preventDefault(),oe(!0)):F.key==="Escape"&&(F.preventDefault(),oe(!1))}),I.addEventListener("blur",()=>oe(!0))};a.addEventListener("dblclick",Ce),a.addEventListener("keydown",I=>{(I.key==="Enter"||I.key==="F2")&&(I.preventDefault(),Ce())});for(const I of["start","end"])this.bindMarker(N,I);return N}showMenu(e){this.closeMenu(),this.openMenu=e,e.menu.hidden=!1,e.more.setAttribute("aria-expanded","true"),e.menu.querySelector("button:not(:disabled)")?.focus()}closeMenu(){const e=this.openMenu;e&&(this.openMenu=null,e.menu.hidden=!0,e.more.setAttribute("aria-expanded","false"))}bindMarker(e,n){const a=e.markers[n],r=()=>({...e.meta,region:e.draft??e.meta.region}),o=l=>{const c=e.wave.getBoundingClientRect();return(l-c.left)/Math.max(1,c.width)*e.meta.frames},s=(l,c)=>{e.draft=c?null:l,this.paintRegion(e,l),this.on.setRegion(e.id,l,c)};a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.preventDefault(),a.setPointerCapture(l.pointerId),a.focus(),e.root.dataset.dragging="true";let c=null;const d=h=>{const m=r(),g=o(h.clientX),b=h.altKey?g:gl(m,g,rt(m));c=dt(m,n,b),s(c,!1)},u=h=>{a.removeEventListener("pointermove",d),a.removeEventListener("pointerup",u),a.removeEventListener("pointercancel",u),e.root.removeAttribute("data-dragging");try{a.releasePointerCapture(h.pointerId)}catch{}c&&s(c,!0)};a.addEventListener("pointermove",d),a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u)}),a.addEventListener("dblclick",()=>{const l=r();s(dt(l,n,n==="start"?0:l.frames),!0)}),a.addEventListener("keydown",l=>{const c=r();let d=null;l.key==="ArrowLeft"||l.key==="ArrowDown"?d=Ra(c,n,-1,rt(c),l.shiftKey):l.key==="ArrowRight"||l.key==="ArrowUp"?d=Ra(c,n,1,rt(c),l.shiftKey):l.key==="Home"?d=dt(c,n,0):l.key==="End"&&(d=dt(c,n,c.frames)),d&&(l.preventDefault(),s(d,!0))})}paintRegion(e,n){const a={...e.meta,region:n},r=Math.max(1,a.frames);e.wave.style.setProperty("--lucy-start",(n.start/r).toFixed(5)),e.wave.style.setProperty("--lucy-end",(n.end/r).toFixed(5)),J(e.region,wl(a,n).replace(/(?<![·→]) (?![·→])/g," "));const o=s=>(s/a.sampleRate).toFixed(2);for(const s of["start","end"]){const l=e.markers[s],c=n[s];ae(l,"aria-label",`${s==="start"?"Start":"End"} of ${ge(a)}`),ae(l,"aria-valuemin","0"),ae(l,"aria-valuemax",o(a.frames)),ae(l,"aria-valuenow",o(c)),ae(l,"aria-valuetext",vl(a,s,c))}}update(e,n,a){e.meta=n;const r=n.id,o=ge(n);e.editing||J(e.name,o),ae(e.root,"aria-label",o);const s=a.selected===r,l=a.playing===r;ot(e.root,"selected",s),ot(e.root,"playing",l),ae(e.root,"aria-current",s?"true":null),ae(e.play,"aria-label",`${l?"Stop":"Play"} ${o}`),ae(e.play,"aria-pressed",l?"true":"false");const c=a.peaks(r),d=c===null;ot(e.root,"missing",d),ot(e.root,"loading",c===void 0),e.drawn!==c&&(e.drawn=c,e.env.setAttribute("d",c?Na(c):"")),J(e.empty,d?"Not in this browser":""),ae(e.wave,"aria-label",d?`${o}: audio not in this browser`:`${o}: waveform`);const u=`${n.bpm}:${n.sampleRate}:${n.frames}`;if(e.gridKey!==u){e.gridKey=u;const b=xl(n),y=e.wave.querySelector(".lucy-wave-beats"),p=e.wave.querySelector(".lucy-wave-bars");y?.setAttribute("d",fn(b.beats)),p?.setAttribute("d",fn(b.bars)),e.barNums.replaceChildren(...[0,...b.bars].map((f,w)=>{const v=E("span","lucy-take-barnum",{},String(w+1));return v.style.setProperty("--lucy-x",f.toFixed(5)),v}))}for(const b of Object.values(e.markers))b.hidden=d;e.draft||this.paintRegion(e,ke(n));const h=n.frames/n.sampleRate;J(e.sourcePill,Sl[Bi(n)]),J(e.facts.bars,`${n.bars} bar${n.bars===1?"":"s"}`),J(e.facts.secs,`${h.toFixed(1)} s`),J(e.facts.bpm,`${Math.round(n.bpm*10)/10} BPM`),J(e.facts.chans,n.channels===2?"Stereo":"Mono"),J(e.facts.rate,`${Math.round(n.sampleRate/100)/10} kHz`),J(e.facts.when,il(n.created,a.now)),ae(e.facts.when,"title",rl(n.created)||null);const m=rt(n);for(const b of e.snap.querySelectorAll("[data-snap]")){const y=b.dataset.snap===m;ae(b,"aria-checked",y?"true":"false"),ae(b,"tabindex",y?"0":"-1"),b.disabled=d}e.send.hidden=!a.canSend,J(e.send,`Send to ${a.sendName}`),e.send.disabled=d,e.download.disabled=d,e.play.disabled=d,this.renderPicker(e,a);const g=a.sendNote?.take===r?a.sendNote.text:"";e.note.hidden=!g,J(e.note,g)}renderPicker(e,n){const a=n.picker?.take===e.id&&n.canSend?n.picker:null;if(e.picker.hidden=!a,e.send.hidden=e.send.hidden||!!a,!a){e.picker.firstChild&&e.picker.replaceChildren();return}const r=a.receivers.find(d=>d.instance===a.to)??a.receivers[0],o=JSON.stringify([a.receivers.map(d=>[d.instance,d.targets.map(u=>u.id)]),a.to]);if(e.picker.dataset.key!==o){e.picker.dataset.key=o,e.picker.replaceChildren();const d=(m,g,b,y,p)=>{const f=`lucy-${m}-${e.id}`,w=E("select","nc-select lucy-take-pick",{id:f,"data-pick":m});for(const M of y)w.append(E("option","",{value:M.value},M.label));w.addEventListener("change",()=>p(w.value));const v=E("label","lucy-take-snap-label",{for:f},g);R(b,v,w),e.picker.append(E("span","lucy-take-pick-wrap",{},v,w))};a.receivers.length>1&&d("send-to","Sampler","send-to",a.receivers.map(m=>({value:m.instance,label:m.name})),m=>this.on.pickTo(m)),d("send-pad",r?.label??"Pad","send-pad",(r?.targets??[]).map(m=>({value:m.id,label:m.name})),m=>this.on.pickTarget(m));const u=E("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-go"},"Send");u.addEventListener("click",()=>this.on.send()),R("send-go",u,u);const h=E("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-cancel"},"Cancel");h.addEventListener("click",()=>this.on.cancelSend()),R("send-cancel",h,h),e.picker.append(u,h)}const s=e.picker.querySelector('[data-pick="send-to"]');s&&s.value!==a.to&&(s.value=a.to);const l=e.picker.querySelector('[data-pick="send-pad"]');l&&l.value!==a.target&&(l.value=a.target);const c=e.picker.querySelector('[data-take-action="send-go"]');c&&(J(c,a.sending?"Sending…":"Send"),c.disabled=a.sending)}}const Gl="LUCY Audio",vt="lucy",ue=St(),Hn=.15,_=cl(vt,ue),tn=jl(_,ue),ja=Pl(tn,Hl()),ji=tn.state,k=Al(ji),he=new Nl(tn.files);ja&&he.adopt(tn.legacyFiles,ja);const X=()=>Ll(ji,k);function Hl(){try{return globalThis.localStorage??null}catch{return null}}let le=!1,B={kind:"idle"},_e=!1,W="",Yt=0,Bt=0;const de=new pr({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let T=null,Wt=null;const Dl=new xr({...dl(),app:ll(Gl,ue),version:"0.1.0",clock:de,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=T?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),Qe=t=>t+(Wt?.offset??0),G=()=>de.transport,kt=()=>G().isPlayingAt(ee()),Pi=()=>!!_&&typeof Fn()?.record=="function",We=()=>k.source==="master"&&Pi()?"master":"mic",Re=()=>kt()&&!le;let Se=null,re=null,Ee=null,Q=null,Xt=null,Ie=null,nn=1,Fi=!1,_t=null;function ze(){return _t??=(async()=>{_?(T=_.ctx,Se=_.output,Wt=_.mapper??new ta(_.ctx)):(T=new AudioContext({latencyHint:"interactive"}),Se=T.destination,Wt=new ta(T)),Wt.start();try{await T.audioWorklet.addModule(Zs)}catch{return W="Audio could not start (the recorder's worklet did not load). Reload to try again.",C(),!1}re=new AudioWorkletNode(T,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),re.port.onmessage=e=>Zl(e.data);const t=new GainNode(T,{gain:0});return re.connect(t).connect(Se),Q=io(T,{moduleUrl:ul()??so,bpm:G().bpm,slots:ct.length,state:Pn(k.fx)}),Xt=new GainNode(T,{gain:k.master}),Q.output.connect(Xt).connect(Se),oo(Q,de,{toAudioTime:Qe,now:ee}),Q.onChange(()=>{k.fx=Q?.getState(),X()}),Ee=new GainNode(T,{gain:0}),Ee.connect(Q.input),Te(k.monitor),!0})(),_t}async function Dn(){if(Ie)return!0;if(!await ze()||!T||!re||!Ee)return!1;T.state!=="running"&&await T.resume().catch(()=>{});try{const t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}}}),n=t.getAudioTracks()[0]?.getSettings()??{};return nn=Math.max(1,Math.min(2,n.channelCount??1)),Fi=!!(n.echoCancellation||n.noiseSuppression||n.autoGainControl),Ie=T.createMediaStreamSource(t),Ie.connect(re),Ie.connect(Ee),W="",C(),!0}catch{return W="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",C(),!1}}function Te(t){k.monitor=t,X(),Ee&&T&&Ee.gain.setTargetAtTime(t&&!_e&&We()==="mic"?1:0,T.currentTime,.01),Bt=0,C()}let fe=null,ft=null;function Zl(t){if(t.type==="level"&&typeof t.peak=="number"){Yt=t.peak;const e=performance.now();k.monitor&&Ie&&Yt>.97?(Bt||=e,e-Bt>1500&&(Te(!1),W="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):Bt=0,uc();return}if(t.type==="chunk"&&t.id!==void 0&&t.channels){(!fe||fe.id!==t.id)&&(fe={id:t.id,parts:[]}),fe.parts.push(t.channels),H?.id===t.id&&(H.builder.add(t.channels),At());return}if(t.type==="done"&&t.id!==void 0){const e=fe?.id===t.id?fe.parts:[];fe=null;const n=Yl(e);if(ft&&t.id===Xi){ft(n),ft=null;return}_l(t.id,n)}}function Yl(t){const e=t[0]?.length??0,n=t.reduce((a,r)=>a+(r[0]?.length??0),0);return Array.from({length:e},(a,r)=>{const o=new Float32Array(n);let s=0;for(const l of t){const c=l[r];c&&(o.set(c,s),s+=c.length)}return o})}function Zn(){const t=k.nudgeMs/1e3;if(k.roundTripMs!==null)return k.roundTripMs/1e3+t;const e=T;return(e?.baseLatency??0)+(e?.outputLatency??0)+.01+t}async function Xl(t,e){const n=performance.now()+e;for(;!t();){if(performance.now()>n)return!1;await new Promise(a=>setTimeout(a,20))}return!0}async function Oi(){if(We()==="master"||V.busy){await Ul();return}if(B.kind!=="idle"){re?.port.postMessage({type:"cancel"}),B={kind:"idle"},fe=null,H=null,C();return}if(!await Dn()||!T||!re)return;if(G().running||(_&&wt()?.claim(Dt(vt,ue)),de.play({at:ee()})),le=!1,!await Xl(()=>G().running,2e3)){W="The clock did not start.",C();return}const t=G(),e=Hn/Je(t.bpm),{startBeat:n,endBeat:a}=qs(Math.max(0,t.beatAt(ee())),k.bars,e),r=Qe(t.timeAt(n)),o=Qe(t.timeAt(a)),{startFrame:s,endFrame:l}=Us(r,o,Zn(),T.sampleRate),c=k.nextId++;X(),re.port.postMessage({type:"record",id:c,startFrame:s,endFrame:l,channels:nn}),B={kind:"armed",id:c,startBeat:n,endBeat:a},H={id:c,source:"mic",bars:k.bars,builder:new Ht(l-s)},W="",C()}async function _l(t,e){if(B.kind==="idle"||B.id!==t||!T)return;B={kind:"idle"},H?.id===t&&(H=null);const n=e[0]?.length??0;if(n===0){W="Nothing was recorded.",C();return}const a={id:t,bars:k.bars,bpm:G().bpm,sampleRate:T.sampleRate,channels:e.length,frames:n,created:new Date().toISOString(),saved:!1,source:"mic"};we.set(t,Qt(e)),a.saved=await he.save(t,e),a.saved||(W="This take is kept until you reload: this browser has no file storage here."),k.takes.push(a),k.selected=t,X(),await pe(t)}const V=new nl({grab:Fn,running:()=>G().running,beatNow:()=>G().beatAt(ee()),bpm:()=>G().bpm,contextTime:t=>Qe(G().timeAt(t)),sampleRate:()=>T?.sampleRate??48e3,leadBeats:()=>Hn/Je(G().bpm),bars:()=>k.bars,nextId:()=>{const t=k.nextId++;return X(),t},after:(t,e)=>{const n=setTimeout(e,t);return()=>clearTimeout(n)},done:t=>void Vl(t),failed:t=>{W=ql[t],H=null,C()},changed:()=>C()}),ql={cancelled:"",stopped:"Music stopped: no take.",unavailable:"Reload the Studio to record its Master.",empty:"The Master take came back empty.",timeout:"Master take timed out: no take."};async function Ul(){if(V.busy){V.cancel(),H=null,W="",C();return}!await ze()||!T||(W="",V.arm())}async function Vl(t){if(!T)return;if(al(t.channels)<1e-4){W="The Master was silent: no take.",C();return}const e=t.channels.map(a=>new Float32Array(a)),n={id:t.id,bars:t.bars,bpm:t.bpm,sampleRate:T.sampleRate,channels:e.length,frames:e[0]?.length??0,created:new Date().toISOString(),saved:!1,name:`Master ${t.id}`,source:"master"};H?.id===t.id&&(H=null),we.set(t.id,Qt(e)),n.saved=await he.save(t.id,e),W=n.saved?"":"This take is kept until you reload: this browser has no file storage here.",k.takes.push(n),k.selected=t.id,Mt(),X(),await pe(t.id)}function Gi(t){an(!1),k.source=t,W="",X(),Te(k.monitor)}function tt(){try{return _?.sendAudio?_.audioReceivers?.()??[]:[]}catch{return[]}}let U=null,gt=!1,Be=null;function Hi(t){return(t?.targets.find(e=>!e.filled)??t?.targets[0])?.id??""}function Di(t=k.selected){const e=tt()[0];!e||t===null||!k.takes.some(n=>n.id===t)||(U={take:t,to:e.instance,target:Hi(e)},Be=null,C())}function Mt(){U=null}async function Zi(){const t=U,e=k.takes.find(l=>l.id===t?.take);if(!t||!e||!_?.sendAudio||gt)return;const n=await he.load(e),a=tt().find(l=>l.instance===t.to),r=a?.name??"Sampler",o=`${a?.label??"Pad"} ${t.target}`;if(!n){Be={take:e.id,text:`${ge(e)} could not be read.`},C();return}gt=!0,C();let s;try{s=await _.sendAudio(t.to,El(e,n),t.target)}catch(l){s={ok:!1,reason:"error",message:l instanceof Error?l.message:String(l)}}gt=!1,U=null,Be={take:e.id,text:s.ok?`Sent to ${r} · ${o}`:s.reason==="cancelled"?`Not sent: ${o} kept.`:`Not sent: ${s.message??s.reason}`},C()}let ie=null,qe=null;async function pe(t){t!==k.selected&&Mt(),k.selected=t,X();const e=k.takes.find(a=>a.id===t);if(!e||!T){ie=null,et(!0),C();return}const n=await he.load(e);if(!n)W=`Take ${e.id} could not be read.`,ie=null;else{const a=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});n.forEach((r,o)=>a.copyToChannel(r,o)),ie={id:e.id,audio:a}}et(!0),C()}function Cn(t){if(qe){try{qe.node.stop(t??0)}catch{}qe=null}}let Ue=null,Nn=null;function et(t=!1){const e=k.takes.find(b=>b.id===ie?.id);if(!T||!Se||!ie||!e||!Re()){Cn(),Ue=null,Nn=null;return}const n=G(),a=ke(e),r=JSON.stringify([ie.id,n.startTime,n.bpm,a.start,a.end]);if(!t&&qe?.stamp===r)return;const o=Hn/Je(n.bpm),{startBeat:s,offsetBeats:l}=$l(Math.max(0,n.beatAt(ee())),On(e,a),o),c=Math.max(Qe(n.timeAt(s)),T.currentTime);Cn(c);const d=new AudioBufferSourceNode(T,{buffer:ie.audio,loop:!0}),u=a.start/e.sampleRate,h=a.end/e.sampleRate;d.loopStart=u,d.loopEnd=h;const m=n.bpm/e.bpm;d.playbackRate.value=m,d.connect(Q?.input??Se);const g=Math.min(h-u,l*Je(e.bpm));d.start(c,u+g),qe={node:d,stamp:r},Nn=Ue,Ue={id:e.id,when:c,offset:g,start:u,length:h-u,duration:e.frames/e.sampleRate,rate:m}}function Yi(t=T?.currentTime??0){const e=Ue&&t>=Ue.when?Ue:Nn??null;if(!e||!qe||t<e.when||!e.length)return{id:null,at:-1};const n=(((t-e.when)*e.rate+e.offset)%e.length+e.length)%e.length;return{id:e.id,at:(e.start+n)/e.duration}}const Xi=0;async function Kl(){if(_e||B.kind!=="idle"||V.busy||!await Dn()||!T||!re||!Se)return;_e=!0,Te(k.monitor),W="Calibrating: speakers on, keep quiet for two seconds…",C();const t=T.sampleRate,e=T.currentTime+.3,n=[0,.5,1,1.5].map(d=>e+d),a=Math.round((e-.05)*t),r=Math.round((e+2.2)*t),o=new Promise(d=>{ft=d,setTimeout(()=>d(null),4e3)});re.port.postMessage({type:"record",id:Xi,startFrame:a,endFrame:r,channels:1});for(const d of n){const u=new OscillatorNode(T,{frequency:2e3}),h=new GainNode(T,{gain:0});h.gain.setValueAtTime(.8,d),h.gain.setValueAtTime(0,d+.004),u.connect(h).connect(Se),u.start(d),u.stop(d+.01)}const s=await o;ft=null,_e=!1;const l=s?.[0],c=l?Ds(l,n.map(d=>Math.round(d*t)-a),Math.round(.4*t)):null;c===null?W="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(k.roundTripMs=Math.round(c/t*1e4)/10,W=`Round trip ${k.roundTripMs} ms: takes are shifted by it.`,X()),Te(k.monitor)}async function In(){if(await ze(),T&&T.state!=="running"&&await T.resume().catch(()=>{}),_&&kt()){if(!le&&wt()?.owner()===Dt(vt,ue)){de.stop({at:ee()});return}le=!le,et(!0),C();return}kt()?de.stop({at:ee()}):(le=!1,_&&wt()?.claim(Dt(vt,ue)),de.play({at:ee()}))}let Pa=G().running;de.onChange(()=>{const t=G().running&&!Pa;t&&_&&(le=!pl(vt,ue)),Pa=G().running,G().running||(le=!1,B.kind!=="idle"&&(re?.port.postMessage({type:"cancel"}),B={kind:"idle"})),V.clockChanged(t),et(),C()});wt()?.onAll(()=>{le&&(le=!1,et(!0),C())});async function Yn(t=k.selected){const e=k.takes.find(o=>o.id===t);if(!e){W="No take to save yet: record one, or Load an audio file.",C();return}const n=await he.load(e);if(!n){W=`${ge(e)} is not in this browser: nothing to save.`,C();return}const a=new Blob([Il(Ri(n,ke(e)),e.sampleRate)],{type:"audio/wav"}),r=document.createElement("a");r.href=URL.createObjectURL(a),r.download=`lucy${ue>1?`-${ue}`:""}-take-${e.id}-${Math.round(e.bpm)}bpm-${e.created.slice(0,10)}.wav`,r.hidden=!0,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(r.href),1e4)}async function Jl(t){if(!await ze()||!T)return;let e;try{e=await T.decodeAudioData(await t.arrayBuffer())}catch{W=`Couldn't read ${t.name}: not an audio file this browser can decode.`,C();return}const n=G().bpm,a=Vs(e.length,e.sampleRate,n),r=[];for(let l=0;l<Math.min(2,e.numberOfChannels);l++){const c=new Float32Array(a.frames);c.set(e.getChannelData(l).subarray(0,a.frames)),r.push(c)}const o=k.nextId++,s={id:o,bars:a.bars,bpm:n,sampleRate:e.sampleRate,channels:r.length,frames:a.frames,created:new Date().toISOString(),saved:!1,source:"file"};we.set(o,Qt(r)),s.saved=await he.save(o,r),W=`${t.name} is take ${o}: ${a.bars} bar${a.bars===1?"":"s"} at ${Math.round(n)} BPM${a.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,k.takes.push(s),k.selected=o,X(),await pe(o)}function Ql(){an(!1),kt()&&(_?le=!0:de.stop({at:ee()})),Cn(),Q?.clear({fadeMs:20}),Te(!1)}function _i(t){k.master=Math.min(1,Math.max(0,t)),X(),Xt&&T&&Xt.gain.setTargetAtTime(k.master,T.currentTime,.01),$t.value=String(k.master),Xn.textContent=`${Math.round(k.master*100)}%`}async function ec(t){const e=zl(k,t);an(!1),Mt(),Object.assign(k,e),we.clear(),W="",X(),!(_t&&!await _t)&&(Q?.setState(k.fx),_i(k.master),Te(k.monitor),await pe(k.selected))}function an(t=!0){V.busy&&V.cancel(),B.kind!=="idle"&&(re?.port.postMessage({type:"cancel"}),B={kind:"idle"},fe=null),H=null,t&&C()}const bt=new Tl(k,t=>(we.delete(t),he.remove(t)));async function qi(t=k.selected){if(t===null)return;const e=k.takes.find(a=>a.id===t),n=k.selected===t;!e||!bt.delete(t)||(U?.take===t&&Mt(),Be?.take===t&&(Be=null),X(),n?await pe(k.takes.at(-1)?.id??null):C(),Ns({message:`Deleted ${ge(e)}`,actionLabel:"Undo",onAction:()=>{bt.undo(t)&&(X(),k.selected===t?pe(t):C())},onClose:a=>{a!=="action"&&bt.settle(t)}}))}function Ui(t,e){const n=k.takes.find(a=>a.id===t);n&&(Ml(n,e),X(),C())}function Vi(t,e,n){if(!n)return;const a=k.takes.find(r=>r.id===t);a&&(fl(a,e)?a.region=void 0:a.region={start:e.start,end:e.end},X(),ie?.id===t&&et(),C())}function Ki(t,e){const n=k.takes.find(a=>a.id===t);n&&(e==="beat"?n.snap=void 0:n.snap=e,X(),C())}async function Ji(t){if(ie?.id===t&&Re()){await In();return}(k.selected!==t||ie?.id!==t)&&await pe(t),Re()||await In()}const q=(t,e={},...n)=>{const a=document.createElement(t);for(const[r,o]of Object.entries(e))a.setAttribute(r,o);return a.append(...n),a},Qi=document.getElementById("app");Qi.classList.add("nc","nc-page");zs();Xs();const rn=q("header",{class:"nc-page-hd"},q("div",{},q("h1",{class:"nc-page-title"},q("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",q("span",{class:"nc-page-sep"},"/")," AUDIO ",q("span",{class:"nc-page-sep"},"/")," ",q("span",{class:"nc-mono"},String(ue).padStart(2,"0"))),q("p",{class:"nc-page-sub"},"A NetComposer element."))),$t=q("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(k.master),"data-nc-id":"lucy-master"});$t.addEventListener("input",()=>_i(Number($t.value)));const Xn=q("span",{class:"nc-readout","data-nc-readout":""});Xn.textContent=`${Math.round(k.master*100)}%`;const Ve=q("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});Ve.hidden=!0;Ve.addEventListener("change",()=>{const t=Ve.files?.[0];Ve.value="",t&&Jl(t)});const gn=(t,e)=>{const n=q("button",{type:"button",class:"nc-page-action","data-lucy-action":t.toLowerCase()},t);return n.addEventListener("click",e),R(`action:${t.toLowerCase()}`,n,n),n};rn.append(q("div",{class:"nc-page-actions"},q("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},q("label",{class:"nc-label",for:"lucy-master"},"Master"),$t,Xn),gn("Save",()=>void Yn()),gn("Load",()=>Ve.click()),gn("Panic",Ql),Ve));R("page:title",rn.querySelector(".nc-page-title"));R("master",rn.querySelector('label[for="lucy-master"]'),$t);const _n=q("div",{class:"nc-stack","data-nc-layout":"adjacent"});Qi.append(rn,q("main",{class:"nc-page-body"},_n));function er(){const t=G(),e=V.phase;if(e.kind==="waiting")return"Waiting for Master…";if(e.kind==="recording"){const a=t.beatAt(ee());if(a<e.startBeat)return"Waiting for Master…";const r=Math.floor((a-e.startBeat)/4)+1;return`Recording Master bar ${Math.min(r,e.bars)} of ${e.bars}`}if(B.kind!=="idle"){const a=t.beatAt(ee());if(a<B.startBeat){const o=Math.ceil((B.startBeat-a)/4);return`Armed: recording in ${o} bar${o===1?"":"s"}`}const r=Math.floor((a-B.startBeat)/4)+1;return`Recording bar ${Math.min(r,k.bars)} of ${k.bars}`}if(!kt())return k.takes.length?"Stopped":We()==="master"?"Record to take the Master":"Arm to record a take";if(le)return"Sitting out";const n=ie?k.takes.find(a=>a.id===ie?.id):void 0;return n?`Playing ${ge(n)}`:"Playing (no take yet)"}function tc(){const t=V.phase;return t.kind==="waiting"?"Armed":t.kind==="recording"?G().beatAt(ee())<t.startBeat?"Armed":"Recording":B.kind==="armed"?"Armed":B.kind==="recording"?"Recording":"Record"}function nc(){const t=B.kind!=="idle"||V.busy;return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:Re()?"Stop":"Play",on:Re(),onPress:()=>void In()},{type:"button",id:"arm",label:tc(),on:t,ariaLabel:t?"Cancel the take":We()==="master"?"Record the Master from the next bar line the music plays":"Record a take from the next bar",onPress:()=>void Oi()},{type:"choice",id:"bars",label:"Length (bars)",value:String(k.bars),options:zt.map(e=>({value:String(e),label:`${e} bar${e===1?"":"s"}`})),onChange:e=>{k.bars=Number(e),X(),C()}},{type:"readout",id:"status",label:"Status",value:er()}]}}function Fa(){return Pi()?[{type:"choice",id:"record-from",label:"Record from",value:We(),options:[{value:"mic",label:"Mic"},{value:"master",label:"Master"}],onChange:t=>Gi(t==="master"?"master":"mic")}]:[]}function ac(){return We()==="master"?{id:"input",title:"Input",controls:[...Fa(),{type:"note",id:"master-note",text:"Internal: no monitor, no nudge."},...W?[{type:"note",id:"notice",text:W}]:[]]}:{id:"input",title:"Input",controls:[...Fa(),Ie?{type:"readout",id:"source",label:"Input",value:`${nn===2?"Stereo":"Mono"} · ${Math.round((T?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void Dn()},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,Yt)},{type:"choice",id:"monitor",label:"Monitor",value:k.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:t=>Te(t==="on")},...Fi?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...W?[{type:"note",id:"notice",text:W}]:[],{type:"label",id:"timing-label",text:"Timing"},...dc().controls??[]]}}function ic(){return{id:"takes",title:"Takes",summary:k.takes.length?`${k.takes.length} take${k.takes.length===1?"":"s"}`:"No takes",controls:[]}}const we=new Map,bn=new Set;let Oa=Promise.resolve();function rc(t){we.has(t.id)||bn.has(t.id)||(bn.add(t.id),Oa=Oa.then(async()=>{const e=await he.load(t).catch(()=>null);bn.delete(t.id),!(!k.takes.includes(t)&&!bt.held.includes(t.id))&&(we.set(t.id,e?Qt(e):null),At())}))}let H=null,yn=!1;function tr(){const t=G(),e=V.phase;if(e.kind==="waiting")return"Waiting for Master…";if(e.kind==="recording"){const n=t.beatAt(ee());if(n<e.startBeat)return"Waiting for Master…";const a=Math.floor((n-e.startBeat)/D)+1;return`Recording · bar ${Math.min(a,e.bars)} of ${e.bars}`}if(B.kind!=="idle"){const n=t.beatAt(ee());if(n<B.startBeat){const r=Math.ceil((B.startBeat-n)/D);return`Armed · recording in ${r} bar${r===1?"":"s"}`}const a=Math.floor((n-B.startBeat)/D)+1;return`Recording · bar ${Math.min(a,k.bars)} of ${k.bars}`}return""}function oc(){const t=V.phase,e=Fn();if(!T||!e)return;if(t.kind==="waiting"){H??={id:-1,source:"master",bars:k.bars,builder:new Ht(0)};return}if(t.kind!=="recording"||((!H||H.id!==t.id)&&(H={id:t.id,source:"master",bars:t.bars,builder:new Ht(t.to-t.from)}),yn))return;const n=t.from+H.builder.frames,a=Math.min(t.to,Math.floor(T.currentTime*T.sampleRate)-2048);if(a-n<4096)return;yn=!0;const r=H;e.take("master",n,a).then(o=>{o&&H===r&&(r.builder.add(o),At())}).catch(()=>{}).finally(()=>{yn=!1})}function sc(){if(!(B.kind!=="idle"||V.busy))return null;const e=H?.bars??k.bars,n=H?.builder;return{label:tr(),source:V.busy?"master":"mic",peaks:n&&n.totalFrames>0?n.peaks:null,filled:n?.filled??0,bars:Array.from({length:Math.max(0,e-1)},(a,r)=>(r+1)/e)}}function lc(){const t=tt();for(const n of k.takes)rc(n);const e=t.find(n=>n.instance===U?.to)??t[0];return{takes:[...k.takes].reverse(),selected:k.selected,playing:Re()&&ie?ie.id:null,peaks:n=>we.get(n),canSend:t.length>0,sendName:t.length===1?t[0]?.name??"Sampler":"Sampler",picker:U&&e?{take:U.take,receivers:t,to:e.instance,target:U.target,sending:gt}:null,sendNote:Be,live:sc(),hint:We()==="master"?"Record takes the Master on the next bar.":"Record takes the mic on the next bar.",now:Date.now()}}const xt=new Ol({select:t=>void pe(t),play:t=>void Ji(t),rename:Ui,openSend:t=>Di(t),pickTo:t=>{const e=tt().find(n=>n.instance===t);e&&U&&(U={...U,to:e.instance,target:Hi(e)}),C()},pickTarget:t=>{U&&(U={...U,target:t}),C()},send:()=>void Zi(),cancelSend:()=>{gt||(Mt(),C())},download:t=>void Yn(t),remove:t=>void qi(t),setRegion:Vi,setSnap:Ki,cancelRecording:()=>an()});function At(){xt.render(lc())}const qn=new Map;function Ga(t,e,n){const a=Number(Q?.getParam(e,n.key)??n.default),r=`hacks-${e}-${n.key}`;qn.set(r,`hack:${t}:${n.key}`);const o=s=>{Q?.setParam(e,n.key,s),C()};return n.options?{type:"select",id:r,label:n.label,value:String(a),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>o(Number(s))}:{type:"slider",id:r,label:n.label,min:n.min,max:n.max,step:n.step??.001,value:a,valueText:ei(n,a,G().bpm),onChange:o}}function Ha(t,e){const n=Q?.getChain().find(o=>o.type===t)?.id??t,a=ve(t),r=a?.dials??[];return qn.set(`hacks-${t}`,`hack:${t}`),{type:"fx",id:`hacks-${t}`,title:a?.label??t,depth:e,on:Q?Q.getParam(n,"bypass")===!1:!1,onToggle:o=>{Q?.setParam(n,"bypass",!o),C()},controls:r.filter(o=>!o.more).map(o=>Ga(t,n,o)),more:r.filter(o=>o.more).map(o=>Ga(t,n,o))}}function cc(){return{id:"hacks",title:"Hacks",controls:[Ha("eq",1),Ha("compressor",2)]}}function dc(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:k.roundTripMs===null?`${Math.round(Zn()*1e3)} ms (estimate)`:`${k.roundTripMs} ms`},{type:"button",id:"calibrate",label:_e?"Listening…":"Calibrate",on:_e,onPress:()=>void Kl()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:k.nudgeMs,valueText:`${k.nudgeMs>0?"+":""}${k.nudgeMs} ms`,onChange:t=>{k.nudgeMs=t,X(),C()}}]}}function nr(t,e){if(t.update(e),e.id==="takes"){const a=t.el.querySelector(".nc-module-body");a&&xt.el.parentElement!==a&&a.append(xt.el)}const n=[...e.controls??[],...(e.sections??[]).flatMap(a=>a.controls)];_s(t.el,e.id,n,a=>qn.get(a)??a)}const Un=[nc,ac,ic,cc].map(t=>({def:t,handle:Os(t())}));Gs(_n,Un.map(t=>t.handle),"adjacent");_n.dataset.lucyLayout="";C();function C(){for(const t of Un)nr(t.handle,t.def());At()}function uc(){const t=Un[1];t&&nr(t.handle,t.def())}let Da="",Za="",Ya=0;const pc=matchMedia("(prefers-reduced-motion: reduce)");let Xa="",_a=0;function ar(t){if(t-_a>1e3){_a=t;const s=JSON.stringify(tt().map(l=>[l.instance,l.name,l.targets.map(c=>c.name)]));s!==Xa&&(Xa=s,C())}if(B.kind!=="idle"){const s=G();B.kind==="armed"&&s.beatAt(ee())>=B.startBeat&&(B={...B,kind:"recording"})}const e=er(),n=tr();(e!==Da||n!==Za)&&(Da=e,Za=n,C()),V.busy&&oc(),t-Ya>3e4&&(Ya=t,At());const a=Yi(),r=a.id===null?void 0:k.takes.find(s=>s.id===a.id);let o=a.at;if(pc.matches&&r&&o>=0){const s=r.frames/r.sampleRate/Je(r.bpm);o=Math.floor(o*s)/s}xt.setPlayhead(Re()?a.id:null,o),requestAnimationFrame(ar)}requestAnimationFrame(ar);Dl.start();if(_)ze().then(()=>pe(k.selected)),_.providePreset?.({format:Gn,version:Zt,get:()=>Rl(k),set:ec});else{const t=()=>{ze().then(()=>pe(k.selected))};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__lucy={state:k,clock:de,get ctx(){return T},get phase(){return B},get master(){return V.phase},pressRecord:()=>Oi(),setSource:Gi,receivers:tt,openSend:Di,cards:xt,trash:bt,playheadAt:Yi,get peaks(){return we},get live(){return H},removeTake:qi,rename:Ui,setRegion:Vi,setSnap:Ki,playTake:Ji,download:Yn,get sendPick(){return U},set sendPick(t){U=t,C()},sendTake:Zi,get sendNote(){return Be},get level(){return Yt},get fx(){return Q},roundTrip:Zn,toContext:Qe,takeAudio:t=>{const e=k.takes.find(n=>n.id===t);return e?he.load(e):null},async testInput(t,e=1){if(!await ze()||!T||!re||!Ee)return;const n=t(T);n.connect(re),n.connect(Ee),Ie=n,nn=e,C()}};
