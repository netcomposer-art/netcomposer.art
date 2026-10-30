(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const ge=1e-9;function qi(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Jt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return qi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+ge&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+ge)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+ge){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-ge;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,s=.25){const r=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(e,n);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,n);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,n+a*(l-1)/o)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Jt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+ge)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+ge)return n[a];return n[0]}}const Ui=Object.freeze({beatsPerBar:4,beatUnit:4}),xe=1e-9;function Gi(t){return Math.floor(t+xe)}function va(t,e,n=!1){if(!(e>0))return t;const s=Math.ceil(t/e-xe)*e;return n&&s<=t+xe?s+e:s}class Wi{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Jt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ui}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-xe&&(this.stopTime===null||e<this.stopTime-xe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-xe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=Gi(e/n),s=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:s,barPhase:s/n}}nextBar(e,n=!1){return va(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ka="nc-clock/snapshot",$a=1;function Ki(t,e="local"){return{format:ka,version:$a,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Vi(t,e){const n=Xi(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}function Yi(t,e,n=t.timebase){const a=s=>s===null?null:s+e;return{...t,timebase:n,anchor:{beat:t.anchor.beat,time:t.anchor.time+e},tempo:t.tempo.map(s=>({...s})),meter:{...t.meter},startTime:a(t.startTime),stopTime:a(t.stopTime)}}const Y=t=>typeof t=="number"&&Number.isFinite(t),Ln=t=>t===null||Y(t);function Xi(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==ka&&n("format"),(!Y(e.version)||Math.floor(e.version)!==$a)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!Y(e.anchor.beat)||!Y(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&Y(a.beat)&&Y(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!Y(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!Y(e.meter.beatUnit))&&n("meter"),(!Ln(e.startTime)||!Ln(e.stopTime)||!Y(e.stoppedBeat))&&n("transport times"),e}class Ji{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Wi(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){Vi(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Ki(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Qi="nc-sync/1",Zi=1,es="nc-sync",ts="nc-sync-leader",ns=0,xa=.5,Sa=.75;function as(t){return typeof t=="number"&&Number.isFinite(t)&&t>=xa&&t<=Sa?t:null}const wt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),_e=t=>typeof t=="number"&&Number.isFinite(t),Ke=t=>typeof t=="string"&&t.length>0;function is(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Zi||!Ke(e.type)||!Ke(e.from)||!_e(e.term)||!_e(e.seq)||!_e(e.sentAt))return null;switch(e.type){case"hello":return Ke(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return _e(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&_e(e.slot)?e:null;case"ping":case"pong":return Ke(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ss(t,e,n,a,s){return{proto:Qi,from:e,term:n,seq:a,sentAt:s,...t}}function F(){return(performance.timeOrigin+performance.now())/1e3}const vt=.003,rs=3,os=.01,Cn=500;class ls{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?os:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=vt&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!u&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,u))):(this.pendingStep=o,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const s=this.ctx.currentTime,r=s<=this.revertUntil;let o;if(a&&r){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-n,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,p=this.preStep;p.length=0;for(let m=0;m<c.length;m++)p.push(c[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,u=e-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,o={stepSeconds:e-n,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&n[l]>o;)n[l+1]=n[l],l--;n[l+1]=o}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=vt&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Cn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),n=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=vt)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<Cn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(rs,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class cs{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...wt,...e.capabilities},this.channelOption=e.channel??es,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const a=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const u=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??va(u,1),u);a&&a>0?(o.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Sa,Math.max(xa,e)):ns;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=as(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=is(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...wt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...wt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(ts,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,o,l)=>[r?0:1,o,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ss(e,this.id,this.term,++this.seq,this.o.now()))}}const Nn=.02,ds=.06,us={shaker:{tune:6500,decay:.025,tone:.55,snap:.55,drive:.5,level:.3}},Ta=["kick","snare","clap","rim","hat","hatOpen","tom","metal","shaker"],J=10,Aa=["1","2","3","4","5","6","7","8","9","0"];function Ea(){return{slots:Array.from({length:J},()=>null),active:null}}function Qt(t){return{swing:t.swing,fx:structuredClone(t.fx),tracks:structuredClone(t.tracks)}}function ps(t,e,n){const a=t.slots.slice();return a[e]=Qt(n),{slots:a,active:e}}function hs(t,e){const n=t.slots.slice();return n[e]=null,{slots:n,active:t.active===e?null:t.active}}function _n(t,e,n,a){const s=t.slots[e];return s?{bank:{slots:t.slots,active:e},document:{...n,bpm:n.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:a>0?a:0,applied:!0}:{bank:t,document:n,glideSeconds:0,applied:!1}}function ms(t,e){if(t.active==null||!t.slots[t.active])return t;const n=t.slots.slice();return n[t.active]=Qt(e),{slots:n,active:t.active}}const fs=16,gs=[2,6,10,14],bs=[2,3,6,10,11,14],at=[0,2,4,6,8,10,12,14],ys=[2,6,10,14],ws=[1,3,7,9,11,15],Pn=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],at,[2,6,10,14]],vs={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]}};function G(){return Array.from({length:fs},()=>!1)}function ne(t,e,n,a=!1){const s=e+t()*(n-e);return a?Math.round(s):Math.round(s*100)/100}function kt(t,e,n){return ne(t,Math.max(0,e-n),Math.min(1,e+n))}function ks(t){const e=G();e[0]=!0,t()<.85&&(e[8]=!0),t()<.75&&(e[4]=!0),t()<.75&&(e[12]=!0);const n=[3,6,10,14],a=n[Math.floor(t()*n.length)]??6;return t()<.35&&(e[a]=!0),e}function $s(t){const e=G();e[4]=t()<.85,e[12]=t()<.85,!e[4]&&!e[12]&&(e[t()<.5?4:12]=!0);const n=gs.filter(()=>t()<.22);for(const a of n.slice(0,2))e[a]=!0;return e}function xs(t,e){const n=G();return t[4]&&e()<.65&&(n[4]=!0),t[12]&&e()<.65&&(n[12]=!0),n}function Ss(t,e){const n=G();let a=0;for(const s of bs)a>=3||t[s]||e()<.35&&(n[s]=!0,a+=1);return n}function Ts(t){const e=G();let n=0;for(const a of ys){if(n>=2)break;t()<.4&&(e[a]=!0,n+=1)}return e}function As(t,e){const n=G();for(const o of at)n[o]=!t[o];const a=at.filter(o=>n[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),u=a.splice(l,1)[0];u!==void 0&&(n[u]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(n[o]=!0,r+=1)}return n}function Es(t,e){const n=G(),a=t[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(n[r]=!0,s+=1)}return n}function Ms(t,e,n){const a=G();let s=0;for(const r of ws)s>=2||t[r]||e[r]||n()<.35&&(a[r]=!0,s+=1);return a}function Ma(t){const e=G(),n=Pn[Math.floor(t()*Pn.length)]??at;for(const a of n)e[a]=!0;return e}function La(t,e,n){return Array.from({length:e},(a,s)=>{const r=t[s]===!0,o=r&&n(s);return{on:r,accent:o,velocity:o?1:.8}})}function Ca(t,e){return t==="kick"?e===0||e===8:t==="snare"?e===4||e===12:t==="shaker"?e%4===2:!1}function Ls(t,e,n){const a=vs[t];return{tune:ne(n,a.tune[0],a.tune[1],!0),decay:t==="shaker"?Math.round((a.decay[0]+n()*(a.decay[1]-a.decay[0]))*1e3)/1e3:ne(n,a.decay[0],a.decay[1]),tone:kt(n,e.tone,.15),snap:kt(n,e.snap,.15),drive:kt(n,e.drive,.1),level:ne(n,a.level[0],a.level[1])}}function Na(t,e=!1){const n=ks(t),a=$s(t),s=Ts(t);return{kick:n,snare:a,clap:xs(a,t),rim:Ss(n,t),hat:As(s,t),hatOpen:s,tom:Es(a,t),metal:Ms(n,a,t),shaker:e?Ma(t):G()}}function Cs(t,e,n){const a=t.tracks[e];if(!a)return t;const s=l=>l.every((u,c)=>u.on===(a.steps[c]?.on??!1));let r=a.steps;for(let l=0;l<6;l++){const u=Na(n,a.voice==="shaker")[a.voice];if(r=La(u,a.length,c=>Ca(a.voice,c)),!s(r)&&r.some(c=>c.on))break}const o=a.steps.slice(a.length);return{...t,tracks:t.tracks.map((l,u)=>u===e?{...l,steps:[...r,...o]}:l)}}function Ns(t){return{...t,tracks:t.tracks.map(e=>{const n=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<n||r>=e.length)return s;const o=r-n;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function _s(t,e){const n=Na(e),a=e()<.4?.5:ne(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...t,bpm:t.bpm,swing:a,fx:{...t.fx,mode:r,cutoff:ne(e,.55,.9),resonance:ne(e,.05,.3),drive:ne(e,.02,.18)},tracks:t.tracks.map(o=>{const l=Ls(o.voice,o.params,e),u=o.voice==="shaker"?e()<.5?G():Ma(e):n[o.voice];return{...o,mute:o.mute,solo:o.solo,params:l,steps:La(u,o.length,c=>Ca(o.voice,c))}})}}function Ps(t,e=Math.random){const n=[];let a=null;for(let r=0;r<J;r+=1){const o=Qt(_s(t,e));n.push(o),r===0&&(a=o)}const s=a?{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:t;return{bank:{slots:n,active:0},document:s}}function Se(t){return`${Math.round(t*100)}%`}function zs(t){return Se(t)}function Rs(t,e){return t==="tune"?`${Math.round(e)} Hz`:Se(e)}function Os(t){return t.charAt(0).toUpperCase()+t.slice(1)}function zn(t){return`${Math.round(t*1e3)} ms`}const Is={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:t=>`${Math.round(t)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:zn},tone:{label:"Bright",min:0,max:1,step:.01,text:Se},snap:{label:"Beads",min:0,max:1,step:.01,text:Se},drive:{label:"Attack",min:0,max:1,step:.01,text:t=>zn(Nn+(ds-Nn)*t)},level:{label:"Level",min:0,max:1,step:.01,text:Se}};function js(t,e){return t==="shaker"?Is[e]:{label:Os(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:n=>Rs(e,n)}}const Pt=2,_a=64;function Bs(t,e){const{version:n,...a}=t,s={...a,version:Pt,slots:Array.from({length:J},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Rn(t){return Array.isArray(t)&&t.length<=_a}function Fs(t){if(Us(t)>Hs)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(t)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const n=e;if(n.format!==Zt)return{ok:!1,errors:["Not a Rhythm file"]};if(n.version!==1&&n.version!==Pt)return{ok:!1,errors:[`Unsupported version ${String(n.version)}`]};const a=n.version,{slots:s,active:r,...o}=n,l=Me({...o,version:en});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const u=l.document,c=[];for(const m of u.tracks)Rn(m.steps)||c.push(`More than ${_a} steps on ${m.id}`);const p={slots:Array.from({length:J},()=>null),active:null};return a===Pt&&(!Array.isArray(s)||s.length!==J?c.push(`Expected ${J} slots`):s.forEach((m,b)=>{if(m==null)return;if(!Me({...u,swing:m.swing,fx:m.fx,tracks:m.tracks}).ok||!m.tracks.every(g=>Rn(g.steps))){c.push(`Slot ${b+1} is malformed`);return}const w=typeof m.seed=="number"&&Number.isFinite(m.seed)?m.seed>>>0:0;p.slots[b]={swing:m.swing,fx:m.fx,tracks:m.tracks,seed:w}}),r!=null&&(!Number.isInteger(r)||r<0||r>=J||!p.slots[r]?c.push("Active slot is empty or out of range"):p.active=r)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:u,bank:p,from:a}}const On={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},In=(t,e)=>{const n=t&&typeof t=="object"?t:{},a={...e.dials};for(const[s,r]of Object.entries(n.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof n.on=="boolean"?n.on:e.on,dials:a}};function He(t){const e=t.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:In(e.drive,On.drive),compressor:In(e.compressor,On.compressor)}}function Pa(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const Ve=t=>Math.max(0,Math.min(100,t));function Ds(t){const e=Pa(t.cutoff),n=Ve(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:Ve(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:Ve(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:Ve(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const Zt="netcomposer.rhythm",en=1,Qe="Saved by an older Rhythm (no Shaker lane), so it can't be opened",Hs=256*1024,za="netcomposer.rhythm.preset.",qs=new Set(Ta);function Ra(t){return`${za}${t}`}function Us(t){let e=0;for(const n of t){const a=n.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function Me(t){const e=[];if(!t||typeof t!="object")return{ok:!1,errors:["Document is not an object"]};const n=t;if(n.format!==Zt&&e.push("Unknown format"),n.version!==en&&e.push("Unsupported version"),(typeof n.id!="string"||!n.id.startsWith(za))&&e.push("Preset id is outside the rhythm namespace"),(typeof n.name!="string"||n.name.length===0)&&e.push("Missing name"),(typeof n.bpm!="number"||!Number.isFinite(n.bpm)||n.bpm<=0)&&e.push("Invalid tempo"),(typeof n.swing!="number"||n.swing<.5||n.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!n.meter||n.meter.beatsPerBar<=0||n.meter.beatUnit<=0)&&e.push("Invalid meter"),(!n.fx||n.fx.mode!=="lp"&&n.fx.mode!=="hp"&&n.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(n.tracks)||n.tracks.length===0||n.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const s of n.tracks)qs.has(s.voice)||e.push(`Unknown voice ${s.voice}`),(!Number.isInteger(s.length)||s.length<1||s.length>64)&&e.push(`Bad length on ${s.id}`),(!Array.isArray(s.steps)||s.steps.length<s.length)&&e.push(`Steps shorter than length on ${s.id}`);if(e.length>0)return{ok:!1,errors:e};const a=n.tracks;return Ta.some(s=>!a.some(r=>r.voice===s))?{ok:!1,errors:[Qe]}:{ok:!0,errors:[],document:n}}function Oa(t,e=[]){return Array.from({length:16},(n,a)=>({on:t.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const Gs={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4},shaker:{...us.shaker}};function Ia(){const t=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]},{voice:"shaker",name:"Shaker",on:[]}];return{format:Zt,version:en,id:Ra("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:t.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Oa(e.on,e.accent),params:{...Gs[e.voice]}}))}}function Ws(){const t=Ia();return{...t,id:Ra("untitled"),name:"Untitled",tracks:t.tracks.map(e=>({...e,steps:Oa([])}))}}const Ks="Tap to join",ja="Tap to join the playing beat";function Ze(t,e){return t&&e?"join":e?"stop":"play"}function Ba(t){return t==="join"?Ks:t==="stop"?"Stop":"Play"}function Vs(t,e,n={}){const a=n.beatsPerBar??4,s=(n.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((t+s)/a-1e-9)*a)}class Ys{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,n){return this.shown=Ze(e,n),this.shown}gesture(e,n,a=!1){return this.joinedBy=!1,a||this.joining||Ze(e,n)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,n){const a=this.joinedBy||this.joining||Ze(e,n)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,n){return this.joining=!1,this.entry=Vs(e,n,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class Xs{constructor(e=n=>JSON.stringify(n)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,n=!1){const a=this.key(e);if(this.value=e,this.has=!0,!n&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class tn{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,n){return!n||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,n,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??Fa(n,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const n=this.held;return!n||e<n.atBeat?null:this.finish(n)}takeHeld(e){const n=this.held;return!n||n.id!==e?null:this.finish(n)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const n=new tn;return n.queued=e.queued,n.held=e.held,n.seq=e.seq,n.taken=e.taken,n}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Fa(t,e=4){return t<0?0:(Math.floor(t/e+1e-9)+1)*e}class Js{constructor(e){this.options=e}taps=[];tap(e){const{window:n=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>n+1&&this.taps.splice(0,this.taps.length-n-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Da=globalThis,Qs="linkslots",Zs=new Set(["0","false","off","no"]);function er(t,e=Da.location?.search??"",n=nr()){const a=new URLSearchParams(e).get(Qs);if(a!==null)return!Zs.has(a.trim().toLowerCase());try{return n?.getItem(t)==="1"}catch{return!1}}function tr(t,e,n){return n||e===t}function nr(){try{return Da.localStorage??null}catch{return null}}const ar="nc-ui",ir={breakpoint:{md:"768px"}},Ha={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},zt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ae={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Oe=t=>`--${ar}-${t}`,Rt=Ha["label-on-fill-dark"],jn=Ha["label-on-fill-light"],sr=ae["label-min-contrast"],rr=/^#[0-9a-f]{6}$/i,or=t=>typeof t=="string"&&rr.test(t),et=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Bn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));const a=e*Math.min(n,1-n),s=r=>{const o=(r+t/30)%12;return n-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${et(s(0)*255)}${et(s(8)*255)}${et(s(4)*255)}`}function qa(t){const[e,n,a]=[1,3,5].map(p=>parseInt(t.slice(p,p+2),16)/255),s=Math.max(e,n,a),r=Math.min(e,n,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const u=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((n-a)/l%6):s===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:o}}function Fn(t){const[e,n,a]=[1,3,5].map(s=>{const r=parseInt(t.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Ot(t,e){const[n,a]=[Fn(t),Fn(e)].sort((s,r)=>r-s);return(n+.05)/(a+.05)}const it=t=>Ot(t,Rt)>=Ot(t,jn)?Rt:jn;function Ua(t,e,n,a=sr){let s=Bn(t,e,n);const r=it(s)===Rt?1:-1;for(let o=0;o<40&&Ot(s,it(s))<a;o++)n+=r*.01,s=Bn(t,e,n);return s}function lr(t){const{h:e,s:n}=qa(t),a=Ua(e,Math.min(n,ae["surprise-on-max-saturation"]),ae["surprise-on-lightness"]);return{fill:t,ink:it(t),on:a,onInk:it(a)}}const cr=(t,e)=>{const n=Math.abs(t-e)%360;return Math.min(n,360-n)};function dr(t,e=Math.random){const[n,a]=ae["surprise-saturation"],[s,r]=ae["surprise-lightness"],o=ae["surprise-min-hue-gap"],l=or(t)?qa(t).h:null;let u=e()*360;return l!==null&&cr(u,l)<o&&(u=(l+o+e()*(360-2*o))%360),Ua(u,n+e()*(a-n),s+e()*(r-s))}function ur(t){if(!t)return null;const e=lr(t);return{[Oe("surprise-fill")]:e.fill,[Oe("surprise-ink")]:e.ink,[Oe("surprise-on")]:e.on,[Oe("surprise-on-ink")]:e.onInk}}const pr=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,hr=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Dn(t){const[e,n,a]=[1,3,5].map(l=>pr(parseInt(t.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function mr([t,e,n]){const a=(t+.3963377774*e+.2158037573*n)**3,s=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>et(hr(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const fr=ae["velocity-range"],Ga={min:zt.rhythm["velocity-min"],max:zt.rhythm["velocity-max"]};function gr(t,e=Ga){const[n,a]=fr,s=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(s-n)/(a-n),o=zt.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=Dn(e.min),u=Dn(e.max);return{velocity:s,t:r,fill:mr(l.map((c,p)=>c+(u[p]-c)*r)),ink:o}}function Hn(t,e=Ga){return{[Oe("velocity-fill")]:gr(t,e).fill}}const br=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],yr={renames:br},wr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},vr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},kr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},dt={};for(const[t,e]of Object.entries(wr))dt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(const[t,e]of Object.entries(kr))dt[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(const[t,e]of Object.entries(vr))dt[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(yr.renames.map(t=>[t.old,t.new]));function Wa(t){const e=dt[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function j(t){return Wa(t).prop}function i(t){return`var(${j(t)})`}function $r(t,e){if(!(t instanceof Element))return 0;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue(j(e)));return Number.isFinite(n)?n:0}function U(t,e){const n=Wa(e),a=t.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const r=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=r:s.style.color=r,(t instanceof Element?t:a.documentElement).append(s);const u=(a.defaultView??window).getComputedStyle(s),c=n.kind==="family"?u.fontFamily:n.kind==="color"?u.color:u.paddingLeft;return s.remove(),c}function xr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Sr(t){const e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);const s=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),s}const Tr="[data-modulated], [data-modulated] *";function Ar(){const t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${j("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${j("divider")}: ${i(`module-div-stack-${a}`)};
      ${j("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${j("text-sub")}: ${i("module-sub-stack-1")};
      ${j("divider")}: ${i("module-div-stack-1")};
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
  isolation: isolate;
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
${Tr} { transition: none; }
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
  padding-bottom: ${i("module-pad")};
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
  ${j("text-sub")}: ${i("module-sub-stack-1")};
  ${j("divider")}: ${i("module-div-stack-1")};
  ${j("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${j("text-sub")}: inherit;
  ${j("divider")}: inherit;
  ${j("slider-track")}: inherit;
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
  grid-template-rows: auto ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
  padding-inline: ${i("control-gap")};
}
.nc-strip + .nc-strip { border-inline-start: ${i("hairline")} solid ${i("divider")}; }
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
/* The instrument's identity colour on its strip name (the master stays text); silent still dims by colour. */
.nc-strip[data-nc-identity="astrid"] { --strip-identity: ${i("instrument-astrid")}; }
.nc-strip[data-nc-identity="petra"] { --strip-identity: ${i("instrument-petra")}; }
.nc-strip[data-nc-identity="olive"] { --strip-identity: ${i("instrument-olive")}; }
.nc-strip[data-nc-identity] .nc-strip-name { color: var(--strip-identity); }
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${i("text-sub")}; }
.nc-strip-ms { display: flex; gap: ${i("control-gap")}; height: ${i("slider-pitch")}; }
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
    padding-bottom: ${i("module-pad-y-desktop")};
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
`}let $t=null;const Er="nc-ui-fallback";function Ka(t=globalThis.document){if(!t?.documentElement||(t.documentElement,$t&&$t.ownerDocument===t))return;const e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Er} {
${Ar()}
}
`,t.head.append(e),$t=e}function Va(t={}){const e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=t.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(s,r),n.append(a);let o=!1;const l=c=>{o=c===!0,n.setAttribute("aria-checked",o?"true":"false")};l(t.checked);const u=()=>{l(!o),t.onChange?.(o)};return n.addEventListener("click",u),{el:n,get checked(){return o},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}const Ya=new WeakMap,qn=.25;function Mr(t){const e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let r=0,o=t.step??.005,l=t.onChange,u=t.onReset;const c=d=>Math.min(1,Math.max(0,d)),p=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},m=d=>{const h=c(d);h!==r&&(r=h,p(),l?.(h))};let b=0,f=!1;n.addEventListener("pointerdown",d=>{if(d.button!==0)return;d.preventDefault(),n.focus?.({preventScroll:!0});const h=n.getBoundingClientRect();d.target!==s&&h.height>0&&m(1-(d.clientY-h.top)/h.height),b=d.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(d.pointerId)}),n.addEventListener("pointermove",d=>{if(!f)return;const h=n.getBoundingClientRect().height||1,v=(b-d.clientY)/h*(d.shiftKey?qn:1);b=d.clientY,m(r+v)});const w=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",d=>{d.preventDefault(),u?.()}),n.addEventListener("keydown",d=>{const h=d.shiftKey?o*qn:o,v={ArrowUp:r+h,ArrowRight:r+h,ArrowDown:r-h,ArrowLeft:r-h,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};d.key in v&&(d.preventDefault(),m(v[d.key]))});const g={el:n,get value(){return r},get dragging(){return f},set(d){f||(r=c(Number(d)||0),p())},setText(d){d?n.setAttribute("aria-valuetext",d):n.removeAttribute("aria-valuetext")},setLabel(d){n.setAttribute("aria-label",d)},configure(d){typeof d.step=="number"&&d.step>0&&(o=d.step),d.onChange&&(l=d.onChange),d.onReset&&(u=d.onReset)}};return g.setLabel(t.label),g.set(t.value??0),g.setText(t.valueText),Ya.set(n,g),g}function Lr(t){return Ya.get(t)}const Xa=new WeakMap,Cr=.2,Nr=1.5,_r=.5;function Pr(t,e){const n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function Un(t,e,n){const a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Pr(a.getComputedStyle(t).getPropertyValue(j(e)),n)}function zr(t){const e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let g=0;g<n;g++){const d=e.createElement("span");d.className="nc-meter-bar";const h=e.createElement("span");h.className="nc-meter-peak";const v=e.createElement("span");v.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",d.append(h,v,k),r.append(d),o.push({peak:h,rms:v,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=t.label,u=t.onClear,c=!1,p=-1,m=-1;const b=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},f=(g,d,h,v)=>{const k=Math.round(v*1e3)/1e3;h[d]!==k&&(h[d]=k,g.style.transform=d==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{w.clear(),u?.()});const w={el:a,get clipped(){return c},update(g,d){p<0&&(p=Un(a,"motion-meter-fall",Cr)),m<0&&(m=Un(a,"motion-meter-hold",Nr));const h=Math.max(0,Math.min(.25,Number(d)||0)),v=p>0?Math.exp(-h/p):0;o.forEach((k,S)=>{const y=g[S]??g[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(y.peak)||0)),T=Math.min(x,Math.max(0,Number(y.rms)||0));y.over&&w.clip(),k.level.peak=x>=k.level.peak?x:x+(k.level.peak-x)*v,k.level.rms=T>=k.level.rms?T:T+(k.level.rms-T)*v,k.holdAge+=h,x>=k.holdAt?(k.holdAt=x,k.holdAge=0):k.holdAge>m&&(k.holdAt=Math.max(x,k.holdAt-_r*h)),f(k.peak,"peak",k.shown,k.level.peak),f(k.rms,"rms",k.shown,k.level.rms),f(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(const g of o)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,f(g.peak,"peak",g.shown,0),f(g.rms,"rms",g.shown,0),f(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,b()},configure(g){g.onClear&&(u=g.onClear)}};return b(),w.reset(),Xa.set(a,w),w}function Rr(t){return t?Xa.get(t):void 0}function Or(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==r)&&(t.width=s,t.height=r);const o=t.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:n}}function xt(t){return Math.max(0,Math.min(1,t))}function Ja(t,e){const{ctx:n,w:a,h:s}=Or(t);if(!n)return;n.clearRect(0,0,a,s);const r=Sr(t);if(e.paint==="swatch"){const u=U(t,"accent"),c=U(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,s),n.fillStyle=c,n.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const u=e.mode??"lp",c=U(t,xr(u)),p=U(t,"divider"),m=xt(e.cutoff??.5),b=.08+(1-xt(e.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){const w=f/Math.max(1,a);let g=0;u==="lp"?g=w<m?1:Math.max(0,1-(w-m)/b):u==="hp"?g=w>m?1:Math.max(0,1-(m-w)/b):g=Math.max(0,1-Math.abs(w-m)/b);const d=s*.78-g*s*.62;f===0?n.moveTo(f,d):n.lineTo(f,d)}n.strokeStyle=c,n.stroke(),n.fillStyle=U(t,"text-sub"),n.font=r,n.fillText(u.toUpperCase(),0,s),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=U(t,"accent"),n.beginPath();const u=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const p=c/Math.max(1,a),m=(s-4)*(1-Math.exp(-p*4/u));n.lineTo(c,s-m)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){const u=xt(e.level??0);n.fillStyle=U(t,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=U(t,"accent"),n.fillRect(0,s*.4,a*u,s*.2),t.dataset.ncAccent=n.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;n.fillStyle=U(t,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=U(t,"rhythm.playhead"),n.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),t.dataset.ncAccent=U(t,"accent")}const Qa={slop:8,longPressMs:500,pitchPx:16};class Ir{constructor(e,n,a=Qa){this.hit=e,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,n,a,s){if(this.phase!=="idle")return!1;const r=this.hit(n,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=n,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,n,a,s){if(e!==this.pointer)return;const r=n-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,n,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,n,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function jr(t,e,n,a=Qa){let s=!1,r=0;const o=(c,p)=>{const b=t.ownerDocument.elementFromPoint?.(c,p),f=[...t.querySelectorAll(e)],w=b?f.findIndex(h=>h===b||h.contains(b)):-1;if(w>=0)return w;let g=-1,d=Number.POSITIVE_INFINITY;return f.forEach((h,v)=>{if(h.hidden)return;const k=h.getBoundingClientRect();if(p<k.top||p>k.bottom)return;const S=Math.abs(c-(k.left+k.width/2));S<d&&S<=k.width&&(g=v,d=S)}),g},l=new Ir(o,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),n(c)},a),u=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}function B(){const t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function ut(t,e){const n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;const a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function Gn(t,e){const n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function qe(t){if(!Number.isFinite(t))return"";const e=Math.round(t*100)/100;return String(e)}const Br=450,Wn=8;function ie(){const t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Fr(t){const e=$r(t,"target-min");return e>0?e:44}function Dr(t){if(!(t instanceof HTMLElement))return;const e=[...t.querySelectorAll(".nc-hit")],n=Fr(t),a=n/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){o.style.display="none";continue}const u=l.left+l.width/2,c=l.top+l.height/2;let p=u-a,m=u+a,b=c-a,f=c+a;for(let w=0;w<e.length;w++){if(r===w)continue;const g=s[w];if(!g||g.width===0)continue;const d=g.left+g.width/2,h=g.top+g.height/2;Math.abs(h-c)<a*2&&(d>u?m=Math.min(m,(u+d)/2):d<u&&(p=Math.max(p,(u+d)/2))),Math.abs(d-u)<a*2&&(h>c?f=Math.min(f,(c+h)/2):h<c&&(b=Math.max(b,(c+h)/2)))}p=Math.min(p,l.left),m=Math.max(m,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),o.style.left=`${p-l.left}px`,o.style.top=`${b-l.top}px`,o.style.width=`${Math.max(0,m-p)}px`,o.style.height=`${Math.max(0,f-b)}px`,o.style.transform="none"}}function Za(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Kn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function st(t,e){switch(t.type){case"slider":return Hr(t,e);case"select":return Ur(t,e);case"toggle":return Gr(t,e);case"button":return Wr(t,e);case"readout":return Kr(t);case"label":return Vr(t);case"note":return Vn(t);case"knob":return Jr(t,e);case"choice":return Qr(t,e);case"slotRow":return Zr(t,e);case"stepGrid":return ao(t,e);case"canvas":return ro(t);case"fx":return uo(t,e);case"strip":return oo(t,e);case"stripAdd":return co(t,e);default:return Vn({id:"unknown",text:""})}}function se(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){const n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,ei(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));const s=t.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??qe(e.value))}else if(e.type==="select"){const n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Gn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){const n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Gn(t,e.text);else if(e.type==="knob"){const n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Yr(n,e);const a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??qe(e.value))}else if(e.type==="choice")ti(t,e);else if(e.type==="slotRow")ai(t,e);else if(e.type==="stepGrid")It(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){const n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Ja(n,e)}else if(e.type==="strip"){oi(t,e);for(const n of e.sends??[]){const a=t.querySelector(`[data-nc-id="${na(n.id)}"]`);a instanceof Element&&se(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")si(t,e);else if(e.type==="fx"){li(t,e);for(const n of[...e.controls,...e.more??[]]){const a=t.querySelector(`[data-nc-id="${na(n.id)}"]`);a instanceof Element&&se(a,n)}}}}function Hr(t,e){const n=ut(t.id,t.label);n.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(qr(t,a,e),s),n.append(B()),se(n,t),n}function qr(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ie());const s=r=>{const o=n(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function Ur(t,e){const n=ut(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(const s of t.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=t.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),n.append(a,B()),n}function Gr(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{const a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(B()),se(n,t),n}function Wr(t,e){const n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{const r=e(n);r?.type==="button"&&r.onPress()}),n.append(B()),se(n,t),!t.onSparkle)return n;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=t.id,s.setAttribute("aria-label","Surprise me"),s.title=t.sparkleTitle??"Surprise me",s.innerHTML=Za(),s.addEventListener("click",()=>{const r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&ii(r);const o=e(n);o?.type==="button"&&o.onSparkle?.()}),a.append(n,s),a}function Kr(t){const e=ut(t.id,t.label);return e.append(B()),se(e,t),e}function Vr(t){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(B()),e}function Vn(t){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(B()),e}function Yn(t){if(typeof t.valueText=="string")return t.valueText;const e=qe(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function ei(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Yr(t,e){const n=e.max-e.min||1,a=(e.value-e.min)/n;ei(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(a*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Yn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Yn(e)}`}function Xr(t,e){const n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,s=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-s:null}function Jr(t,e){const n=ut(t.id,t.label);t.compact&&(n.dataset.ncCompact="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",u=>{r=u.clientY;const c=e(a);o=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(u.pointerId)}),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;const c=e(a);if(c?.type!=="knob")return;const p=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,o-(u.clientY-r)*p/120));c.onChange(m)}),a.addEventListener("dblclick",()=>{const u=e(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{const c=e(a);if(c?.type!=="knob")return;const p=Xr(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});const l=n.querySelector("[data-nc-readout]");return n.insertBefore(a,l),n.append(B()),se(n,t),n}function Qr(t,e){const n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(const a of t.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(n);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...n.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let u=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")u=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")u=(l-1+o.length)%o.length;else if(r.key==="Home")u=0;else if(r.key==="End")u=o.length-1;else return;const c=o[u];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(s)}return n.append(B()),ti(n,t),n}function ti(t,e){for(const n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;const a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Zr(t,e){const n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let p=0;p<t.slots.length;p++){const m=t.slots[p],b=document.createElement("span");b.className="nc-snap-wrap";const f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(p),f.textContent=m.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,ie()),eo(b,f,n,p,e),a.append(b)}const s=t.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Za(),s.append(ie()),s.addEventListener("click",()=>{ii(n);const p=e(n);p?.type==="slotRow"&&p.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const p=e(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",r.append(o,u,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),n.append(c,r,B()),ni(n,e),ai(n,t),n}function Xn(t,e,n,a){const s=n(t);if(s?.type!=="slotRow")return;Ie(t);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function eo(t,e,n,a,s){let r=0,o=0,l=0,u=!1,c=!1,p=!1,m=!1;const b=()=>{window.clearTimeout(r),r=0},f=h=>{const v=h.clientX-o,k=h.clientY-l;v*v+k*k>Wn*Wn&&(u=!0,b())},w=()=>{m&&(m=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",d))},g=h=>{const v=r!==0&&!u&&!c;b(),w(),v&&(p=!0,Xn(n,a,s,h))},d=()=>{u=!0,b(),w()};t.addEventListener("pointerdown",h=>{h.button===0&&(w(),c=!1,u=!1,p=!1,o=h.clientX,l=h.clientY,b(),r=window.setTimeout(()=>{r=0,!u&&(c=!0,to(n,e,a,s))},Br),m=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",d))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(p||c||u){p=!1,c=!1,u=!1;return}Xn(n,a,s,h)})}function ni(t,e){if(t.querySelector(".nc-slot-menu"))return;const n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");const a=Jn("Save","store"),s=Jn("Clear","clear");n.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),Ie(t)}),r.addEventListener("click",o=>o.stopPropagation()),t.append(r,n),n.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const u=e(t);if(u?.type!=="slotRow")return;const c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),Ie(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),Ie(t))}),t.addEventListener("keydown",o=>{o.key==="Escape"&&Ie(t)})}function Jn(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function to(t,e,n,a){ni(t,a);const s=t.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);const o=t.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function Ie(t){const e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ai(t,e){for(const s of t.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));const a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function ii(t){const e=t.dataset.ncLastFill||null,n=dr(e);t.dataset.ncLastFill=n;const a=ur(n);if(a)for(const[s,r]of Object.entries(a))t.style.setProperty(s,r)}function no(t,e){const n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");const o=e(t);o?.type==="stepGrid"&&o.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>s(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function ao(t,e){const n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=d=>{const h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=d,a.append(h),h},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=d=>{for(const h of[r,o]){const v=h===d;h.setAttribute("aria-checked",v?"true":"false"),h.tabIndex=v?0:-1}};l(r);for(const d of[r,o])d.addEventListener("click",()=>l(d));a.addEventListener("keydown",d=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(d.key))return;d.preventDefault();const h=o.getAttribute("aria-checked")==="true"?r:o;l(h),h.focus()});const u=document.createElement("div");u.className="nc-step-tools",u.append(a),t.onFill&&u.append(no(n,e)),n.append(u);for(const d of t.rows){const h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";const v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=d.label,v.setAttribute("aria-label",`Select ${d.label}`),d.lane&&(v.dataset.ncLane=String((d.lane-1)%4+1)),v.addEventListener("click",()=>{const y=e(n);if(y?.type!=="stepGrid")return;const x=y.rows.findIndex(T=>T.id===d.id);y.onSelectRow?.(x)}),v.addEventListener("keydown",y=>io(n,v,y));const k=[];for(const y of["mute","solo"]){if(!(y==="mute"?t.onMute:t.onSolo))continue;const T=document.createElement("span");T.className="nc-ms-wrap";const E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=y,E.textContent=y==="mute"?"M":"S",E.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${d.label}`),T.append(E,ie()),T.addEventListener("click",()=>{const _=e(n);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(oe=>oe.id===d.id);(y==="mute"?_.onMute:_.onSolo)?.(W)}),k.push(T)}const S=document.createElement("div");S.className="nc-steps";for(let y=0;y<d.steps.length;y++){const x=document.createElement("span");x.className="nc-step-wrap";const T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${d.id}:${y}`,T.setAttribute("aria-label",`${d.label} step ${y+1}`),x.append(T,ie()),x.addEventListener("click",E=>{const _=e(n);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(fe=>fe.id===d.id),oe=o.getAttribute("aria-checked")==="true";_.onToggle(W,y,E.shiftKey||oe)}),S.append(x)}if(t.onLength&&S.append(so(n,S,d,e)),h.append(...k,v,S),t.onDice){const y=document.createElement("button");y.type="button",y.className="nc-sparkle nc-row-dice",y.dataset.ncDice=d.id,y.setAttribute("aria-label",`Re-roll ${d.label}`),y.title=`Re-roll ${d.label}: new steps for this lane (Undo takes it back)`,y.innerHTML=Kn(),y.append(ie()),y.addEventListener("click",()=>{const x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(T=>T.id===d.id))}),h.append(y)}h.addEventListener("click",y=>{if(y.target!==h)return;const x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(T=>T.id===d.id))}),Qn(n,S,".nc-step-wrap",e,o,()=>d.id),n.append(h)}const c=document.createElement("div");c.className="nc-pads-head";const p=(d,h,v)=>{const k=document.createElement("button");return k.type="button",k.className=d,k.textContent=h,v&&k.setAttribute("aria-label",v),k},m=p("nc-pads-step","‹","Previous lane"),b=p("nc-pads-step","›","Next lane"),f=document.createElement(t.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),t.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{const d=e(n);d?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",It(n,d))}));for(const[d,h]of[[m,-1],[b,1]])d.addEventListener("click",()=>{const v=e(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;const k=v.rows.length;v.onSelectRow?.(((Ye(v)+h)%k+k)%k)});if(c.append(m,f,b),t.onDice){const d=p("nc-pads-step nc-pads-dice","","Re-roll lane");d.dataset.ncPadsDice="",d.innerHTML=Kn(),d.addEventListener("click",()=>{const h=e(n);if(h?.type!=="stepGrid")return;const v=Ye(h);v>=0&&h.onDice?.(v)}),c.append(d)}if(t.transport){const d=p("nc-pads-play","Play");d.dataset.ncPadsPlay="",d.addEventListener("click",()=>{const h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(d)}n.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const g=Math.max(0,...t.rows.map(d=>d.steps.length));for(let d=0;d<g;d++){const h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(d),h.textContent=String(d+1),h.addEventListener("click",v=>{const k=e(n);if(k?.type!=="stepGrid")return;const S=Ye(k);if(S<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(S,d+1);return}const y=o.getAttribute("aria-checked")==="true";k.onToggle(S,d,v.shiftKey||y)}),w.append(h)}return Qn(n,w,".nc-pad",e,o,()=>{const d=e(n);return d?.type==="stepGrid"?d.rows[Ye(d)]?.id:void 0}),n.append(w),n.append(B()),It(n,t),n}function Ye(t){const e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Qn(t,e,n,a,s,r){let o="on",l=!0,u=-1;const c=(p,m)=>{const b=p.rows[u]?.steps[m];!b||m>=p.rows[u].length||(p.onSet?p.onSet(u,m,o,l):!!b[o]!==l&&p.onToggle(u,m,o==="accent"))};jr(e,n,p=>{const m=a(t);if(m?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(p.kind!=="paint")return;const b=m.rows.findIndex(f=>f.id===r());b>=0&&m.rows[b].length!==p.pad+1&&m.onLength?.(b,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){const b=r();u=m.rows.findIndex(w=>w.id===b);const f=m.rows[u]?.steps[p.pad];if(!f)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[o]}c(m,p.pad)}else if(p.kind==="long"){const b=r(),f=m.rows.findIndex(g=>g.id===b),w=e.querySelectorAll(n)[p.pad];f>=0&&w instanceof HTMLElement&&m.onLongPress?.(f,p.pad,w)}}})}function io(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;const a=[...t.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;n.key==="ArrowDown"?r=s+1:n.key==="ArrowUp"?r=s-1:n.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(n.preventDefault(),o.focus(),o.click())}function so(t,e,n,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(ie());const r=c=>{const p=a(t);if(p?.type!=="stepGrid")return;const m=p.rows.findIndex(w=>w.id===n.id),b=p.rows[m];if(!b)return;const f=Math.max(1,Math.min(b.steps.length,c));f!==b.length&&p.onLength?.(m,f)},o=c=>{const p=[...e.querySelectorAll(".nc-step")];let m=1;return p.forEach((b,f)=>{const w=b.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(m=f+1)}),m},l=c=>r(o(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),s.addEventListener("keydown",c=>{const p=a(t);if(p?.type!=="stepGrid")return;const m=p.rows.find(f=>f.id===n.id);if(!m)return;const b={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),s}const St=new WeakMap;function Zn(t,e){const n=typeof e=="number"?e:null;if(!(St.has(t)&&St.get(t)===n)){if(St.set(t,n),n===null){for(const a of Object.keys(Hn(1)))t.style.removeProperty(a);return}for(const[a,s]of Object.entries(Hn(n)))t.style.setProperty(a,s)}}function It(t,e){const n=e.rows.some(c=>c.solo),a=t.querySelector(".nc-pads"),s=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=t.querySelector(".nc-pads-label"),o=t.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&s&&(r.textContent=o?`${s.label} · ${s.length}`:s.label,e.onLength&&(r.setAttribute("aria-pressed",o?"true":"false"),r.setAttribute("aria-label",o?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));const l=t.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&s&&(l.setAttribute("aria-label",`Re-roll ${s.label}`),l.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);const u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){const c=!!e.transport?.playing,p=e.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");const m=e.transport?.ariaLabel;m?u.setAttribute("aria-label",m):u.removeAttribute("aria-label")}if(a instanceof HTMLElement&&s){a.setAttribute("aria-label",`${s.label} steps`),s.lane&&(a.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||n&&!s.solo?a.dataset.silent="true":delete a.dataset.silent;const c=s.length>0?(e.playhead%s.length+s.length)%s.length:-1;for(const p of a.querySelectorAll("[data-nc-pad]")){const m=Number(p.getAttribute("data-nc-pad")),b=s.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!b||!o&&m>=s.length,o&&m>=s.length?p.dataset.out="true":delete p.dataset.out,o&&m===s.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${s.label} step ${m+1}`),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,Zn(p,b?.velocity),e.playhead>=0&&m===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(const c of e.rows){for(let f=0;f<c.steps.length;f++){const w=c.steps[f],g=t.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;const d=g.closest(".nc-row");if(d instanceof HTMLElement){e.selectedRow===c.id?d.dataset.selected="true":delete d.dataset.selected;const k=d.querySelector(".nc-name");k instanceof HTMLElement&&k.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||n&&!c.solo?d.dataset.silent="true":delete d.dataset.silent;for(const y of d.querySelectorAll("[data-nc-ms]")){const x=y.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;y.setAttribute("aria-pressed",x?"true":"false")}}g.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?g.dataset.accent="true":delete g.dataset.accent,w.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof w.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Zn(g,w.velocity);const h=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===h?g.dataset.playhead="true":delete g.dataset.playhead;const v=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!v,f>=c.length&&v?g.dataset.out="true":delete g.dataset.out}const p=t.querySelector(`[data-nc-len="${c.id}"]`),b=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&b&&b.nextElementSibling!==p){const f=document.activeElement===p;b.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function ro(t){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;const n=document.createElement("span");n.className="nc-label",n.textContent=t.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,B()),e}function oo(t,e){const n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",a.append(s),t.onRemove){const f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{const w=e(n);w?.type==="strip"&&w.onRemove?.(f)}),a.append(f)}const r=document.createElement("div");r.className="nc-strip-ms";for(const f of["mute","solo"]){if(!(f==="mute"?t.onMute:t.onSolo))continue;const g=document.createElement("span");g.className="nc-ms-wrap";const d=document.createElement("button");d.type="button",d.className="nc-ms",d.dataset.ncMs=f,d.textContent=f==="mute"?"M":"S",g.append(d,ie()),g.addEventListener("click",()=>{const h=e(n);h?.type==="strip"&&(f==="mute"?h.onMute:h.onSolo)?.()}),r.append(g)}const o=document.createElement("div");o.className="nc-strip-sends";for(const f of t.sends??[])o.append(st({...f,type:"knob",compact:!0},e));const l=document.createElement("div");l.className="nc-strip-body";const u=document.createElement("span");u.className="nc-scale",u.setAttribute("aria-hidden","true");for(const f of t.ticks??[]){const w=document.createElement("span");w.className="nc-scale-tick",w.style.setProperty("--tick-pos",String(f.value)),w.textContent=f.label,u.append(w)}const c=Mr({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:f=>{const w=e(n);w?.type==="strip"&&w.onChange(f)},onReset:()=>{const f=e(n);f?.type==="strip"&&ta(f)}}),p=zr({channels:t.channels===2?2:1,label:t.label,onClear:()=>{const f=e(n);f?.type==="strip"&&f.onClipClear?.()}});l.append(u,c.el,p.el);const m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;return m.addEventListener("click",f=>{const w=e(n);w?.type!=="strip"||!w.onTypeIn||(window.clearTimeout(b),f.detail===0?ea(n,m,e):f.detail===1&&(b=window.setTimeout(()=>ea(n,m,e),lo)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);const f=e(n);f?.type==="strip"&&ta(f)}),n.append(a,r,o,l,m,B()),oi(n,t),n}const lo=250;function ea(t,e,n){const a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??qe(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const u=s.value;if(s.remove(),e.hidden=!1,l){const c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function co(t,e){const n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(n),u=o.value;ri(o),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,o,B()),si(n,t),n}function si(t,e){const n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);const a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),ri(a))}function ri(t){const e=t.options[0];e&&(e.selected=!0)}function ta(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function oi(t,e){const n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);const a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);const s=t.querySelector(".nc-fader"),r=s?Lr(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),Rr(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=t.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const l=e.valueText??qe(e.value);o.textContent!==l&&(o.textContent=l),o.setAttribute("aria-label",`${e.label} level ${l}`);const u=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${u}`:u}for(const l of t.querySelectorAll("[data-nc-ms]")){const u=l.getAttribute("data-nc-ms"),c=u==="mute"?e.mute===!0:e.solo===!0;l.setAttribute("aria-pressed",c?"true":"false"),l.setAttribute("aria-label",`${u==="mute"?"Mute":"Solo"} ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,e.identity?t.dataset.ncIdentity=e.identity:delete t.dataset.ncIdentity}function uo(t,e){const n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);const a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title,t.on===void 0)n.append(a);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const r=Va({checked:t.on,labelledBy:a.id,onChange:o=>{const l=e(r.el);l?.type==="fx"&&l.onToggle?.(o)}});r.el.dataset.ncFxSwitch="",s.append(a,r.el),n.append(s)}for(const s of t.controls)n.append(st(s,e));if(t.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const r=document.createElement("summary");r.textContent=t.moreLabel??"More",s.append(r);for(const o of t.more)s.append(st(o,e));n.append(s)}return n.append(B()),li(n,t),n}function li(t,e){const n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);const a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function na(t){return t.replace(/["\\]/g,"\\$&")}function po(t,e){for(const n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&Ja(n,a)}Dr(t)}const ho=ae["toast-duration"];function mo({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function fo(t,e,n,a){const s=l=>({top:l,bottom:l+n}),r=l=>t.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),o=s(e-a-n);return r(o)?r(s(a))?"bottom":"top":"bottom"}function ci(t,e,n,a,s,r){let o=t.bottom+s;const l=Math.max(r,Math.min(t.left,a-r-n.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(const p of e)p&&p.bottom>o&&p.top<o+n.height&&p.right>l&&p.left<l+n.width&&(o=p.bottom+s,u=!0)}return{top:o,left:l}}const aa="data-nc-ui-toast-live";function go(t,e){let n=e.querySelector(`[${aa}]`);return n||(n=t.createElement("div"),n.setAttribute(aa,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function bo({message:t,actionLabel:e,onAction:n,duration:a=ho,onClose:s,avoid:r=[],anchor:o,host:l,document:u=globalThis.document}={}){l=l??u.body;const c=u.defaultView??globalThis,p=u.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");const m=u.createElement("span");m.className="nc-ui-toast-message",m.textContent=t,p.appendChild(m);let b=null;e&&(b=u.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,p.appendChild(b)),l.appendChild(p);let f="open";const w=q=>q&&typeof q.getBoundingClientRect=="function"?q.getBoundingClientRect():null,g=w(p),d=g?.height||44,h=c.getComputedStyle?.(p),v=Number.parseFloat(h?.getPropertyValue(j("toast-offset")))||16,k=Number.parseFloat(h?.getPropertyValue(j("toast-anchor-gap")))||8,S=w(o),y=c.innerHeight??0,x=r.map(w).filter(Boolean),T=S&&S.bottom>0&&S.top<y?ci(S,x,{width:g?.width||0,height:d},c.innerWidth??0,k,v):null;T&&T.top+d<=y?(p.setAttribute("data-placement","anchor"),p.style.top=`${T.top+(c.scrollY??0)}px`,p.style.left=`${T.left+(c.scrollX??0)}px`):p.setAttribute("data-placement",fo(x,y,d,v));const E=c.requestAnimationFrame?.bind(c)??(q=>setTimeout(q,16));E(()=>E(()=>{f==="open"&&p.setAttribute("data-state","open")})),go(u,l).textContent=mo({message:t,actionLabel:e});let _,W;const oe=new Promise(q=>{W=q}),fe=q=>{clearTimeout(_),_=setTimeout(()=>yt("timeout"),q)};let N=a,xn=Date.now();const Sn=()=>{f==="open"&&(clearTimeout(_),N=Math.max(0,N-(Date.now()-xn)))},Tn=()=>{f==="open"&&(xn=Date.now(),fe(N))};p.addEventListener("pointerenter",Sn),p.addEventListener("pointerleave",Tn),p.addEventListener("focusin",Sn),p.addEventListener("focusout",Tn),b?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{yt("action")}}),Number.isFinite(a)&&fe(a);function yt(q="close"){if(f!=="open")return;f="closing",clearTimeout(_),p.setAttribute("data-state","closing"),s?.(q);const An=c.getComputedStyle?.(p),Hi=An?Math.max(0,...String(An.transitionDuration||"").split(",").map(Mn=>Number.parseFloat(Mn)*(Mn.trim().endsWith("ms")?1:1e3)||0)):0,En=()=>{f!=="gone"&&(f="gone",p.remove(),W(q))};p.addEventListener("transitionend",En),setTimeout(En,Hi+50)}return{el:p,close:yt,closed:oe}}function ia(t){return`${Math.round(Math.min(1,Math.max(0,Number(t)||0))*100)}%`}function yo({anchor:t,title:e,velocity:n,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const u=l.defaultView??globalThis,c={velocity:n,probability:a},p=l.createElement("div");p.className="nc-slot-scrim nc-step-editor-scrim";const m=l.createElement("div");m.className="nc-step-editor",m.setAttribute("role","dialog"),m.setAttribute("aria-label",e);const b=l.createElement("div");b.className="nc-step-editor-head";const f=l.createElement("span");f.className="nc-label",f.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",b.append(f,w),m.appendChild(b);const g=[];for(const[S,y]of[["velocity","Velocity"],["probability","Chance"]]){const x=l.createElement("label");x.className="nc-step-editor-row";const T=l.createElement("span");T.className="nc-label",T.textContent=y;const E=l.createElement("input");E.type="range",E.className="nc-range",E.min=S==="velocity"?"0.05":"0",E.max="1",E.step="0.05",E.value=String(c[S]),E.setAttribute("data-nc-edit",S);const _=l.createElement("output");_.className="nc-readout",_.textContent=ia(c[S]),E.setAttribute("aria-valuetext",_.textContent),E.addEventListener("input",()=>{c[S]=Number(E.value),_.textContent=ia(c[S]),E.setAttribute("aria-valuetext",_.textContent),s({velocity:c.velocity,probability:c.probability})}),x.append(T,E,_),m.appendChild(x),g.push(E)}if(o.append(p,m),t?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${ir.breakpoint.md})`).matches??!1)m.setAttribute("data-placement","sheet"),p.setAttribute("data-placement","sheet");else{const S=t?.getBoundingClientRect?.(),y=m.getBoundingClientRect(),x=Number.parseFloat(u.getComputedStyle(m).getPropertyValue("row-gap"))||8;if(S){let{top:T,left:E}=ci(S,[],{width:y.width,height:y.height},u.innerWidth,x,x);T+y.height>u.innerHeight&&(T=Math.max(x,S.top-x-y.height)),m.style.top=`${T}px`,m.style.left=`${E}px`}m.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let h=!0;const v=S=>{S.key==="Escape"&&(S.preventDefault(),k())};function k(){h&&(h=!1,l.removeEventListener("keydown",v,!0),p.remove(),m.remove(),t?.removeAttribute?.("data-editing"),t?.isConnected&&typeof t.focus=="function"&&t.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",v,!0),p.addEventListener("pointerdown",S=>{S.preventDefault(),k()}),w.addEventListener("click",k),{el:m,close:k}}const nn="netcomposer.rhythm.hidden.v1",ee=new WeakMap;function Tt(){try{return globalThis.localStorage??null}catch{return null}}function di(t,e=nn){try{const n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function sa(t,e,n,a=nn){const s=di(t,a);n?s.add(e):s.delete(e);try{t?.setItem(a,JSON.stringify([...s]))}catch{}}function an(t){const e=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)],n=[];for(const a of e)n.push(a),a.type==="fx"&&n.push(...a.controls,...a.more??[]),a.type==="strip"&&n.push(...(a.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return n}function wo(t,e){if(!(!t||!e))return an(t).find(n=>n.id===e)}function vo(t){return`${`${t.layout??""}:${(t.sections??[]).map(n=>`${n.id}${n.panel?":panel":""}${n.area?`@${n.area}`:""}`).join(",")}`}#${an(t).map(n=>n.type==="stepGrid"?`stepGrid:${n.id}:${n.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${n.onMute?":m":""}${n.onSolo?":s":""}`:n.type==="slotRow"?`slotRow:${n.id}:${n.slots.length}${n.onSparkle?":spark":""}`:n.type==="button"?`button:${n.id}${n.onSparkle?":spark":""}`:n.type==="select"?`select:${n.id}:${n.options.map(a=>a.value).join(",")}`:n.type==="strip"?`strip:${n.id}:${n.channels??1}:${n.master?"master":""}:${n.onMute?"m":""}${n.onSolo?"s":""}${n.onRemove?"x":""}:${(n.sends??[]).map(a=>a.id).join(",")}:${(n.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:n.type==="fx"?`fx:${n.id}:${n.depth}:${n.on===void 0?"":"sw"}:${n.controls.map(a=>a.id).join(",")}/${(n.more??[]).map(a=>a.id).join(",")}`:`${n.type}:${n.id}`).join("|")}`}function ko(t,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}const n=document.createElement("div");n.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),t.append(n),ui(t,e)}function ui(t,e){if(!e.panel)return;const n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function $o(t){const e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const n=ee.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return wo(n,a)}function xo(t,e){const n=e.sections??[{id:"main",controls:e.controls??[]}],a=vo(e);if(t.dataset.ncSignature===a){for(const s of n){const r=t.querySelector(`[data-nc-section="${ra(s.id)}"]`);r&&ui(r,s);for(const o of s.controls){const l=t.querySelector(`[data-nc-id="${ra(o.id)}"]`);l instanceof Element&&se(l,o)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(const s of n){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),ko(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(st(l,$o));t.append(r)}}function ra(t){return t.replace(/["\\]/g,"\\$&")}function sn(t,e=nn){Ka();const n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");const a=di(Tt(),e).has(t.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";const c=Va({labelledBy:r.id,onChange:h=>(ee.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",o.append(c.el,l,u);const p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",s.append(r,p,o);const m=document.createElement("div");m.className="nc-module-body",m.id=`${t.id}-body`;const b=document.createElement("button");b.type="button",b.className="nc-slim";const f=document.createElement("span");f.className="nc-slim-lines",b.append(f);const w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,s,m,b),n.setAttribute("aria-labelledby",r.id);const g=h=>{const v=ee.get(n)??t;n.dataset.ncOpen=h?"false":"true",m.hidden=h,b.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${v.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{const h=n.dataset.ncOpen==="true";sa(Tt(),(ee.get(n)??t).id,h,e),g(h),jt(n.parentElement)}),b.addEventListener("click",()=>{sa(Tt(),(ee.get(n)??t).id,!1,e),g(!1),jt(n.parentElement)});const d={el:n,update(h){ee.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=h.title,p.textContent=h.status??"",h.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),f.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,b.setAttribute("aria-label",`Show ${h.title}`),xo(m,h),g(m.hidden),d.redraw()},redraw(){const h=ee.get(n);h&&po(n,an(h))}};return ee.set(n,t),g(a),d.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>d.redraw()).observe(n),d}function So(t,e,n="adjacent"){Ka(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();const a=n==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),t.append(s.el),s.redraw()}),jt(t)}function jt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}const e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&s.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function pi(){return new Promise(t=>{if(typeof requestAnimationFrame!="function"){setTimeout(t,0);return}requestAnimationFrame(()=>setTimeout(t,0))})}function To(t=200){return new Promise(e=>{const n=globalThis.requestIdleCallback;typeof n=="function"?n(()=>e(),{timeout:t}):setTimeout(e,0)})}function Ao(t,e={}){const n=new Set,a=(async()=>{await pi();for(const s of t)await To(e.timeoutMs??200),s.build(),n.add(s)})();return{ready:s=>n.has(s),done:a,toJSON:()=>({built:n.size,total:t.length})}}function rn(){const t=globalThis.scheduler;return typeof t?.yield=="function"?t.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const n=new MessageChannel;n.port1.onmessage=()=>{n.port1.close(),e()},n.port2.postMessage(null)})}const Eo="modulepreload",Mo=function(t){return"/rhythm/"+t},oa={},Lo=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");s=o(n.map(c=>{if(c=Mo(c),c in oa)return;oa[c]=!0;const p=c.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const b=document.createElement("link");if(b.rel=p?"stylesheet":Eo,p||(b.as="script"),b.crossOrigin="",b.href=c,u&&b.setAttribute("nonce",u),document.head.appendChild(b),p)return new Promise((f,w)=>{b.addEventListener("load",f),b.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var Co=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Bt=[.25,.5,.75,1,1.5,2],No=4.9,z={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},le={fmt:"wet"},K={fmt:"pct"},be={fmt:"db"},Xe={fmt:"signedPct"},At={fmt:"num",suffix:" ms"},P={div:100};function A(t,e,n,a,s,r,o,l){var u={key:t,label:e,min:n,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var c in l)u[c]=l[c];return u}function Je(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Fe=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:z.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:z.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:z.hpQ},{dsp:{law:z.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:z.bpHz,astrid:!0},{dsp:{law:z.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:z.bpQ},{dsp:{law:z.bpQ}}),A("mix","Mix",0,100,100,3,le,{dsp:P,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Je(Co),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,K,{dsp:P,unit:"%"}),A("mix","Wet/dry",0,100,0,3,le,{dsp:P,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:z.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Je([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,K,{dsp:P,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,Xe,{dsp:P,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,At,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:P,unit:"%"}),A("decay","Decay",0,100,50,3,K,{dsp:P,unit:"%"}),A("damping","Damping",0,100,0,4,K,{dsp:P,unit:"%"}),A("mix","Mix",0,100,0,5,le,{dsp:P,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:z.rate},{dsp:{law:z.rate}}),A("depth","Depth",0,100,70,2,K,{dsp:P,unit:"%"}),A("feedback","Feedback",-90,90,50,3,Xe,{dsp:P,unit:"%"}),A("mix","Mix",0,100,50,4,le,{dsp:P,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:z.rate},{dsp:{law:z.rate}}),A("depth","Depth",0,100,50,2,K,{dsp:P,unit:"%"}),A("spread","Spread",0,100,70,3,K,{dsp:P,unit:"%"}),A("mix","Mix",0,100,40,4,le,{dsp:P,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:z.rate},{dsp:{law:z.rate}}),A("depth","Depth",0,100,70,2,K,{dsp:P,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Je([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,K,{dsp:P,unit:"%"}),A("mix","Mix",0,100,50,5,le,{dsp:P,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,be,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,be,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:z.midHz,astrid:!0},{dsp:{law:z.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:z.eqQ},{dsp:{law:z.eqQ}}),A("high_db","High",-18,18,0,4,be,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,be,{unit:"dB"}),A("mix","Mix",0,100,100,3,le,{dsp:P,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Je([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:z.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,Xe,{dsp:P,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,Xe,{dsp:P,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,be,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:z.ratio},{dsp:{law:z.ratio}}),A("attack_ms","Attack",1,100,10,3,At,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,At,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,be,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,K,{dsp:P,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:P})]}],_o=Fe.map(function(t){return t.type});Fe.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Po={reverb:"plate"};function on(t){var e=Po[t]||t;return _o.indexOf(e)>=0?e:null}function Z(t){for(var e=on(t),n=0;n<Fe.length;n++)if(Fe[n].type===e)return Fe[n];return null}function $e(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function hi(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=$e(n.law,e);return a===null?0:a}function la(t,e){return Math.min(No,t*60/(e>0?e:120))}var ca=function(t){return t>0?"+":t<0?"−":""};function zo(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function mi(t,e,n){var a=t.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:ca(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return ca(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=$e(a.law,e),s===null?a.zero||"open":a.astrid?zo(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+$e(a.law,e).toFixed(1);case"ratio":return $e(a.law,e).toFixed(1)+":1";case"rate":return s=$e(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(la(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(la(e,n)*1e3)+" ms"}return String(e)}var Ro=1,pt=["drive","delay","plate"];function Oo(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,s){return mi(t,a,s)},e}var De=pt.map(function(t){var e=Z(t),n={type:t,label:e.label,dials:e.dials.map(Oo)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Io={reverb:"plate"};function rt(t){var e=Io[t]||t;return pt.indexOf(e)>=0?e:null}function ht(t){for(var e=rt(t),n=0;n<De.length;n++)if(De[n].type===e)return De[n];return null}function fi(t,e){var n=ht(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Le(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function re(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,s=1;s<t.options.length;s++)Math.abs(t.options[s].value-e)<Math.abs(a-e)&&(a=t.options[s].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function jo(){return{v:Ro,chain:De.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Bo(t){return Bt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Bt[0])}function Et(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Fo(t){for(var e=Array.isArray(t)?t:Et(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=jo(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(Et(l)){var u=rt(l.type);if(!u){typeof l.type=="string"&&r.push(l.type);continue}if(s[u]){r.push(u);continue}s[u]=!0;var c=a.chain[pt.indexOf(u)],p=Et(l.dials)?l.dials:{};u==="delay"&&p.mix===void 0&&p.wet!==void 0&&(p=Object.assign({},p,{mix:p.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,ht(u).dials.forEach(function(m){c.dials[m.key]=re(m,p[m.key])}),Do(u,c.dials,p)}}return{state:a,dropped:r}}function Do(t,e,n){for(var a=ht(t),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=re(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Le(r,e)))}}function Ft(t){return Fo(t).state}function Ho(t){return JSON.parse(JSON.stringify(t))}var qo=24,Dt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ht(t,e,n){if(e==="bypass")return n?0:1;var a=fi(t,e)||Uo(t,e);return a?hi(a,n):0}function Uo(t,e){var n=Z(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Go={};De.forEach(function(t){t.dials.forEach(function(e){Go[t.type+"."+e.key]=e.format})});function Mt(t,e){var n=new Float64Array(qo),a=Ft(t);return a.chain.forEach(function(s){var r=Dt[s.type];n[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){n[r[o]]=Ht(s.type,o,s.dials[o])})}),n}var Wo=2,ot=3,Ko=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Pe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function gi(t,e){var n=Z(t);if(!n)return null;var a={};(e||[]).forEach(function(o){o&&o.id&&(a[o.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var r={};return n.dials.forEach(function(o){r[o.key]=o.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:r}}function Vo(t){var e=Z(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Yo(t,e,n){var a=t.length-1,s=Math.max(0,Math.min(a,n));if(e<0||e>a||e===s)return t;var r=t.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function Xo(t){return typeof t=="number"&&isFinite(t)?Bo(t):t}function da(t,e,n){var a={};return t.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),n&&t.type==="delay"&&s.key==="delay_beats"&&(r=Xo(r)),a[s.key]=re(s,r)}),t.dials.forEach(function(s){s.stepWhen&&(a[s.key]=re(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],Le(s,a)))}),a}function Jo(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,s=1/0,r=t.min;r<=t.max;r++){var o=$e(n.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var Qo={rate:"rate_hz"};function Zo(t,e,n,a){var s={};return t.dials.forEach(function(r){if(!r.more){var o=r.astridKey||Qo[r.key]||r.key;s[r.key]=Jo(r,e[o])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function el(t,e){var n=e>0?Math.floor(e):ot,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(t)?(r=t,l=!0):Pe(t)&&Array.isArray(t.chain)&&(r=t.chain,o=t.v===1,l=t.schema===2);for(var u=[],c=0;c<r.length;c++){var p=r[c];if(Pe(p)&&!(p.type==="limiter"||p.fixed===!0)){var m=on(p.type),b=m&&Z(m);if(!b||o&&["drive","delay","plate"].indexOf(m)<0){typeof p.type=="string"&&a.push(p.type);continue}if(u.length>=n){a.push(p.id||m);continue}var f;Pe(p.params)&&!Pe(p.dials)?f=da(b,Zo(b,p.params,s,p.id||m),l):f=da(b,Pe(p.dials)?p.dials:{},l);var w=gi(m,u),g=typeof p.id=="string"&&Ko.test(p.id)&&!u.some(function(h){return h.id===p.id})?p.id:w.id,d=o?p.bypass!==!1:p.bypass===!0;u.push({id:o?w.id:g,type:m,bypass:d,dials:f})}}return{state:{v:Wo,chain:u},dropped:a,notes:s}}function tt(t,e){return el(t,e).state}function ye(t){var e=Z(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,hi(a,t.dials[a.key])])}),n}function tl(t){var e=tt(t,8),n=[],a=e.chain.map(function(s,r){var o=Z(s.type),l={};return r>=ot&&n.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(u){var c=s.dials[u.key];if(u.more){c!==u.default&&n.push(s.id+"."+u.key);return}u.key==="delay_beats"&&Bt.indexOf(c)<0&&n.push(s.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var nl="nc-fx@1",al=600,il=256,sl=8,ze=typeof WeakMap=="function"?new WeakMap:null;function rl(t,e){var n=ze&&ze.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await Lo(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),ze&&(ze.set(t,n),n.catch(function(){ze.delete(t)})),n)}function we(t,e){return typeof t=="number"&&isFinite(t)?t:e}function bi(t,e,n,a){var s=Math.min(400,Math.max(20,we(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=we(e.preGain,1),c=Math.max(0,we(e.crossfade,.012)),p=we(e.maxDelaySeconds,void 0),m=t.createGain(),b=t.createGain(),f=t.createGain(),w=t.createGain(),g=null;e.modInput===!0&&(g=t.createGain(),g.channelCount=1,g.channelCountMode="explicit",g.channelInterpretation="discrete"),w.gain.value=0,m.connect(f),f.connect(b),w.connect(b);var d={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},h=n(s);d.post=function(y){d.node?d.node.port.postMessage(y):d.disposed||(r.length>=il&&(r=a().concat([{t:"tempo",bpm:d.bpm,when:0}])),r.push(y))};function v(y){var x=r.map(function(T){var E=Object.assign({},T);return E.when>y||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return r=[],x}d.emit=function(y){for(var x=0;x<d.listeners.length;x++)try{d.listeners[x](y)}catch(T){typeof console<"u"&&console.error(T)}},d.whenOf=function(y){return typeof y=="number"&&isFinite(y)&&y>0?y:0};var k=!1;d.tooFar=function(y){return typeof y=="number"&&y>t.currentTime+al?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(y-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=rl(t,e.moduleUrl).then(function(){if(!d.disposed){var y=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:u,maxDelaySeconds:p},h);y.pending=v(t.currentTime),d.node=new AudioWorkletNode(t,nl,{numberOfInputs:g?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:y}),m.connect(d.node),g&&g.connect(d.node,0,1),d.node.connect(w);var x=t.currentTime;x<=0||c===0?(f.gain.value=0,w.gain.value=1):(f.gain.setValueAtTime(1,x),f.gain.linearRampToValueAtTime(0,x+c),w.gain.setValueAtTime(0,x),w.gain.linearRampToValueAtTime(1,x+c)),d.status="ready"}},function(y){d.status="unavailable",r=[],d.error=y});return d.core={input:m,output:b,modInput:g,ready:S,get status(){return d.status},get error(){return d.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:o,setTempo:function(y,x){var T=we(y,NaN);!(T>0)||d.disposed||d.tooFar(x)||(d.bpm=Math.min(400,Math.max(20,T)),d.post({t:"tempo",bpm:d.bpm,when:d.whenOf(x)}),d.emit({effect:null,key:"tempo",value:d.bpm}))},getTempo:function(){return d.bpm},clear:function(y){var x=y&&typeof y=="object"?y:{at:y};if(!(d.disposed||d.tooFar(x.at))){var T=we(x.fadeMs,0);d.post({t:"clear",when:d.whenOf(x.at),fadeMs:T>0?Math.min(1e3,T):0})}},onChange:function(y){return d.listeners.push(y),function(){var x=d.listeners.indexOf(y);x>=0&&d.listeners.splice(x,1)}},dispose:function(){if(!d.disposed){if(d.disposed=!0,d.status="disposed",r=[],d.listeners.length=0,d.node){d.node.port.postMessage({t:"dispose"}),d.node.port.close();try{d.node.disconnect()}catch{}}[m,f,w,b,g].forEach(function(y){try{y&&y.disconnect()}catch{}})}}},d}function ol(t,e){var n=e||{};if(n.slots)return ll(t,n);var a=Ft(n.state),s=Array.from(Mt(a)),r=bi(t,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from(Mt(a)),when:0}]}),o=r.core;function l(u){return a.chain[pt.indexOf(u)]}return o.setParam=function(u,c,p,m){var b=rt(u);if(!(!b||r.disposed||r.tooFar(m))){var f=l(b),w;if(c==="bypass")w=!!p;else{var g=fi(b,c);if(!g)return;w=re(g,p,Le(g,f.dials))}return c==="bypass"?f.bypass=w:f.dials[c]=w,r.post({t:"p",i:Dt[b][c],v:Ht(b,c,w),when:r.whenOf(m)}),r.emit({effect:b,key:c,value:w}),ht(b).dials.forEach(function(d){if(!(!d.stepWhen||!d.stepWhen.some(function(k){return k.key===c}))){var h=f.dials[d.key],v=re(d,h,Le(d,f.dials));v!==h&&(f.dials[d.key]=v,r.post({t:"p",i:Dt[b][d.key],v:Ht(b,d.key,v),when:r.whenOf(m)}),r.emit({effect:b,key:d.key,value:v}))}}),w}},o.getParam=function(u,c){var p=rt(u);if(p){var m=l(p);return c==="bypass"?m.bypass:m.dials[c]}},o.getState=function(){return Ho(a)},o.setState=function(u,c){r.disposed||r.tooFar(c&&c.at)||(a=Ft(u),r.post({t:"load",program:Array.from(Mt(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},o}function ll(t,e){var n=e.slots===!0?ot:Math.max(1,Math.min(sl,Math.floor(+e.slots)||ot)),a=tt(e.state,n),s=1,r={};function o(d){return r[d.id]||(r[d.id]=s++),r[d.id]}function l(d){return d.map(function(h){return{uid:o(h),type:h.type,program:ye(h)}})}var u=l(a.chain),c=a.chain.map(function(d){return r[d.id]}),p=bi(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(d){return r[d.id]}),when:0}]}),m=p.core;function b(d){var h;for(h=0;h<a.chain.length;h++)if(a.chain[h].id===d)return a.chain[h];var v=on(d);if(v){for(h=0;h<a.chain.length;h++)if(a.chain[h].type===v)return a.chain[h]}return null}function f(d,h){var v=o(d);p.post({t:"add",uid:v,type:d.type,when:h}),ye(d).forEach(function(k){p.post({t:"ps",uid:v,k:k[0],v:k[1],when:h,snap:!0})})}function w(d){p.post({t:"order",uids:a.chain.map(function(h){return r[h.id]}),when:d})}function g(d,h){var v={};a.chain.forEach(function(y){v[y.id]=y});var k=a.chain.map(function(y){return r[y.id]}).join();d.chain.forEach(function(y){var x=v[y.id];if(!x||x.type!==y.type){delete r[y.id],f(y,h);return}var T={};ye(x).forEach(function(E){T[E[0]]=E[1]}),ye(y).forEach(function(E){T[E[0]]!==E[1]&&p.post({t:"ps",uid:r[y.id],k:E[0],v:E[1],when:h})})});var S={};d.chain.forEach(function(y){S[y.id]=!0}),Object.keys(r).forEach(function(y){S[y]||delete r[y]}),a=d,a.chain.map(function(y){return r[y.id]}).join()!==k&&w(h)}return m.slots=n,m.setParam=function(d,h,v,k){var S=b(d);if(!(!S||p.disposed||p.tooFar(k))){var y=Z(S.type),x,T=null;if(h==="bypass")x=!!v;else{for(var E=0;E<y.dials.length;E++)y.dials[E].key===h&&(T=y.dials[E]);if(!T)return;x=re(T,v,Le(T,S.dials))}var _={},W={};ye(S).forEach(function(N){_[N[0]]=N[1]}),y.dials.forEach(function(N){N.stepWhen&&(W[N.key]=S.dials[N.key])}),h==="bypass"?S.bypass=x:S.dials[h]=x,y.dials.forEach(function(N){N.stepWhen&&(S.dials[N.key]=re(N,S.dials[N.key],Le(N,S.dials)))});var oe=p.whenOf(k),fe=r[S.id];return ye(S).forEach(function(N){(_[N[0]]!==N[1]||T&&N[0]===T.k)&&p.post({t:"ps",uid:fe,k:N[0],v:N[1],when:oe})}),p.emit({effect:S.id,key:h,value:x}),Object.keys(W).forEach(function(N){N!==h&&S.dials[N]!==W[N]&&p.emit({effect:S.id,key:N,value:S.dials[N]})}),x}},m.getParam=function(d,h){var v=b(d);if(v)return h==="bypass"?v.bypass:v.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(a))},m.setState=function(d,h){p.disposed||p.tooFar(h&&h.at)||(g(tt(d,n),p.whenOf(h&&h.at)),p.emit({effect:null,key:null,value:null}))},m.addEffect=function(d,h){var v=h||{},k=gi(d,a.chain);if(!(!k||a.chain.length>=n||p.disposed||p.tooFar(v.at))){if(v.dials){var S=tt({v:2,chain:[{id:k.id,type:k.type,dials:v.dials}]},1).chain[0];k.dials=S.dials}v.bypass===!0&&(k.bypass=!0);var y=a.chain.slice(),x=typeof v.index=="number"?Math.max(0,Math.min(y.length,v.index)):y.length;return y.splice(x,0,k),g({v:2,chain:y},p.whenOf(v.at)),p.emit({effect:k.id,key:"chain",value:"add"}),k.id}},m.removeEffect=function(d,h){var v=b(d),k=h&&h.at;return!v||p.disposed||p.tooFar(k)?!1:(g({v:2,chain:a.chain.filter(function(S){return S!==v})},p.whenOf(k)),p.emit({effect:v.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(d,h,v){var k=b(d),S=v&&v.at;if(!k||p.disposed||p.tooFar(S))return!1;var y=Yo(a.chain,a.chain.indexOf(k),h);return y===a.chain?!1:(g({v:2,chain:y},p.whenOf(S)),p.emit({effect:k.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return a.chain.map(function(d){return{id:d.id,type:d.type,name:Vo(d),bypass:d.bypass}})},m.toAstrid=function(){return tl(a)},m}const cl="/rhythm/assets/worklet-CnpUVY5i.js",mt="petra-rhythm.state",ln=1,yi=400,dl=2e3;function ul(t){return JSON.stringify({v:ln,doc:t.doc,bank:t.bank,selectedTrack:t.selectedTrack})}function pl(t,e){if(!e||typeof e!="object")return!1;const{swing:n,fx:a,tracks:s}=e;return Me({...t,swing:n,fx:a,tracks:s}).ok}function wi(t){if(!t)return null;let e;try{e=JSON.parse(t)}catch{return null}if(!e||e.v!==ln)return null;const n=Me(e.doc);if(!n.ok||!n.document)return null;const a=n.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==J||!s.slots.every(c=>c===null||pl(a,c)))return null;const r=s.slots,o=Number.isInteger(s.active)&&r[s.active]?s.active:null,l=e.selectedTrack,u=Number.isInteger(l)&&l>=0&&l<a.tracks.length?l:0;return{doc:a,bank:{slots:r,active:o},selectedTrack:u}}function hl(t,e,n=yi,a=mt){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const u=ul(e());if(u===o)return;t.setItem(a,u),o=u}catch{}};return{schedule(){const u=Date.now();r||(r=u),clearTimeout(s),s=setTimeout(l,Math.min(n,Math.max(0,r+dl-u)))},flush:l}}function ml(t,e,n=mt){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=t.getItem(n)}catch{return null}if(!a||wi(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(s.v!==ln||Me(s.doc).errors[0]===Qe||Array.isArray(s.bank?.slots)&&s.bank.slots.some(o=>o!==null&&typeof o=="object"&&Me({...s?.doc,...o}).errors[0]===Qe))?`Couldn't open your last session: ${Qe}`:"Couldn't open your last session: it is malformed"}function fl(t,e,n=mt){if(new URLSearchParams(e).has("fresh"))return null;try{return wi(t.getItem(n))}catch{return null}}const Lt={maker:"PETRA",instrument:"RHYTHM",number:"01"},gl="PETRA Rhythm";let ua=!1;function bl(){return`
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
`}function yl(t){const e=t.ownerDocument;if(!ua){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=bl(),e.head.append(c),ua=!0}const n=e.createElement("header");n.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},r=e.createElement("span");r.className="petra-head-num",r.textContent=Lt.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=Lt.maker,a.append(o," ",s(),` ${Lt.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const u=e.createElement("div");return u.className="petra-head-title",u.append(a,l),n.append(u),t.before(n),n}function wl(t,e){const n=t.ownerDocument,a=n.createElement("details");a.className="petra-menu";const s=n.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=n.createElement("div");r.className="petra-menu-body";const o=n.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const p=o.files?.[0];o.value="",p&&e.load(await p.text(),p.name)});const l=(p,m)=>{const b=n.createElement("button");return b.type="button",b.textContent=p,b.dataset.petraMenu=p.toLowerCase(),b.addEventListener("click",()=>{m(),u||(a.open=!1)}),b};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),t.append(a);let u=null;const c=()=>{const p=getComputedStyle(s).display==="none";p!==u&&(a.open=p),u=p};return window.addEventListener("resize",c),c(),a}class vl{doc=Ia();bank=Ea();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=ms(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=ps(this.bank,e,this.doc),this.edited=null}replace(e,n){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(n),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=hs(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=n}peek(e){const n=_n(this.bank,e,this.doc,0);return n.applied?n.document:null}recall(e,n=this.recallGlideSeconds){const a=_n(this.bank,e,this.doc,n);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=Ps(this.doc,e);this.sparkleUndo=n,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,n=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Cs(this.doc,e,n),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const n=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=n,n===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(n=>{n.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let pa=!1;function kl(){return`
#app .nc-morph-field { display: none; }
`}function $l(t=document){if(pa)return;const e=t.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=kl(),t.head.append(e),pa=!0}function xl(t){const e=t.getOutputTimestamp?.(),n=e?.contextTime,a=e?.performanceTime;if(n===void 0||a===void 0||!(n>0)||!(a>0))return null;const s=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0;return{contextTime:n,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function ha(t,e){const n=t.getOutputTimestamp?.(),a=n?.contextTime,s=n?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const Sl=1400;function Ct(t,e,n,a=!1){return t==="store"?null:t==="clear"?n?`Cleared ${e}`:null:n?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function Tl(t){return t===0?"0 s":`${Math.round(t*100)/100} s`}class Al{constructor(e){this.repaint=e}text="";timer=0;say(e,n=Sl){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},n))}}const El=50;function Ml(t,e,n,a=El){if(n)return 0;const s=t-e;return s>=a?0:a-s}class Ll{constructor(e,n=()=>null){this.host=e,this.anchor=n}handle=null;get open(){return this.handle!==null}show(e,n="Surprise applied"){this.handle?.close();const a=bo({message:n,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function ma(t,e){const n=new AudioContext(e);let a="loading";const s=(async()=>{n.state==="running"&&await n.suspend();for(const r of t)await n.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:n,ready:s,get status(){return a},async start(){return a==="loaded"&&ce(n),await s,n.state!=="running"&&await n.resume(),n.state}}}function ce(t){t.state==="running"||t.state==="closed"||t.resume().catch(()=>{})}const Cl=5e3;function Nl(){return typeof navigator<"u"&&"userAgentData"in navigator}function _l(t,e,n,a={}){const s=a.restartsOnWorkletReady??Nl(),r=a.preloadTimeoutMs??Cl;let o=null,l=!1,u=null,c=null;async function p(){const g=new AudioContext(e);ce(g);try{for(const d of t)await g.audioWorklet.addModule(d);return g}catch(d){throw g.close().catch(()=>{}),d}}function m(g,d=!1){l=!0,o=null,g.context.close().catch(()=>{}),d?n?.(new Error(`audio preload still loading after ${r} ms`)):g.ready.catch(h=>n?.(h))}async function b(g){const{context:d}=g;n?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),ce(d);const h=(async()=>{for(const v of t)await d.audioWorklet.addModule(v)})();try{return await Promise.race([g.ready.then(()=>{},()=>h),h]),d}catch(v){throw l=!0,o===g&&(o=null),d.close().catch(()=>{}),v}}function f(g){let d;const h=new Promise(v=>{d=setTimeout(()=>v("timeout"),r)});return Promise.race([g.ready.then(()=>"ready"),h]).finally(()=>clearTimeout(d))}async function w(){if(!l){o??=ma(t,e);const g=o;if(g.status==="failed")m(g);else{const d=g.status==="loaded"||!s;if(d&&ce(g.context),g.status==="loading"){let h;try{h=await f(g)}catch{return m(g),p()}if(h==="timeout")return s?(m(g,!0),p()):b(g)}return g.context.state==="closed"?(o===g&&(o=null),w()):(d||ce(g.context),g.context)}}return p()}return{preload(){o||u||c||l||(o=ma(t,e))},load(){return u&&u.state!=="closed"?(ce(u),Promise.resolve(u)):c?(o&&(o.status==="loaded"||!s)&&ce(o.context),c):(c=w().then(g=>(u=g,o=null,g)).finally(()=>{c=null}),c)}}}const fa="/rhythm/assets/processor-BFa39uiw.js",Pl="instance",zl=99;function vi(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Pl)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=zl?n:1}function ki(t,e){return e===1?t:`${t}#${e}`}function Rl(t,e){return e===1?t:`${t} ${e}`}let ve;function Ol(t,e=vi()){if(ve!==void 0)return ve;ve=null;try{if(typeof window>"u"||window.parent===window)return ve;const n=window.parent.ncStudio;n&&n.version===1&&(ve=n.attach(t,{instance:e}))}catch{}return ve}function Il(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,s,r)=>n.request(`${a}${e}`,s,r)}:null}}function jl(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Bl(t,e){let n=null;const a=()=>(n??=(async()=>{for(const s of e)await t.audioWorklet.addModule(s);return t})(),n.catch(()=>{n=null}),n);return{preload(){a().catch(()=>{})},load:a}}const $i=new URLSearchParams(location.search),H=$i.has("measure"),ft=vi(),cn=Rl(gl,ft),Fl=ki("petra-rhythm.linkslots",ft),Dl=er(Fl),Hl=!(H&&$i.get("clockStepFix")==="0");let qt=0;const ql=.05;H&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const pe=[40,240],$=new vl,dn=ki(mt,ft),je=H?null:fl(localStorage,location.search,dn),ga=H||je?null:ml(localStorage,location.search,dn);je&&($.doc=je.doc,$.bank=je.bank,$.selectTrack(je.selectedTrack));const un=H?null:hl(localStorage,()=>({doc:$.doc,bank:$.bank,selectedTrack:$.selectedTrack}),yi,dn);if(H){for(const e of $.doc.tracks)e.solo=e.voice==="kick";const t=$.doc.tracks.find(e=>e.voice==="kick");t&&(t.params.decay=ql)}const R=new Ji({bpm:$.doc.bpm,minBpm:pe[0],maxBpm:pe[1],timebase:"shared"}),pn=document.querySelector("#app");if(!(pn instanceof HTMLElement))throw new Error("Missing #app");const Ul=yl(pn);$l();const Ne=new Ll(document.body,()=>{const t=document.querySelector("#play")?.closest(".nc-module");return t&&t.getBoundingClientRect().width<window.innerWidth/2?t:null});let M=null;H&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",t=>{window.__errors?.push(String(t.reason))}),window.__toggle=()=>Ci(),window.__clockStep=t=>{qt=t},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:de?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let V=null,X=null,de=null,lt=0,xi=0;function Gl(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const O=new cs({...Il(),app:cn,version:"0.1.0",clock:R,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:pe},audio:Gl,outputLatencyMs:()=>de?.outputLatencyMs??null,swing:()=>$.liveSwing});let Be="",Si=0,Ti=!1,ba=Number.NEGATIVE_INFINITY,ke=null;const I=new tn;let Te=!1;function D(t=F()){return!Te&&R.transport.isPlayingAt(t)}function Ue(t){if(!O.isLeader)return;const e=Ml(performance.now(),ba,t);if(e>0){ke===null&&(ke=setTimeout(()=>{ke=null,Ue(!0)},e));return}ke!==null&&(clearTimeout(ke),ke=null),O.publishState()&&(ba=performance.now())}function ya(){const t=Ti?Ns($.doc).tracks:$.doc.tracks;return Te?t.map(e=>({...e,mute:!0})):t}function Ge(){if(!de)return null;const t=Math.round(de.offset*1e4)/1e4;return{offset:t,shifted:Yi(R.toSnapshot(),t,"audio")}}const hn=new Xs(({offset:t,shifted:e})=>JSON.stringify([t,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Ut(t=!1){const e=Ge();e&&hn.set(e,t)}const Wl={mode:"lp",cutoff:1,resonance:0,drive:0};function Gt(t){const e=He(t),n=Ds(t);return{v:2,chain:[{id:`${n.type}-1`,type:n.type,bypass:!e.filter||t.mode==="lp"&&t.cutoff>=.999,dials:n.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let Wt=null;function Kl(){if(!X)return;const t=Gt($.doc.fx),e=Wt;if(Wt=t,!e||e.chain.some((n,a)=>n.type!==t.chain[a]?.type)){X.setState(t);return}t.chain.forEach((n,a)=>{const s=e.chain[a];if(s){s.bypass!==n.bypass&&X?.setParam(n.id,"bypass",n.bypass);for(const[r,o]of Object.entries(n.dials))s.dials[r]!==o&&X?.setParam(n.id,r,o)}})}function Ai(t,e,n,a){return{clock:t,measure:H,swing:$.followSwing??e.swing,fx:Wl,...a===void 0?{}:{glideSeconds:a},tracks:n.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let te=null;function C(t="state"){const e=t==="state"?Ge():hn.current??Ge();if(!V||!e)return;ec(),t!=="state"&&(Be="");const{offset:n,shifted:a}=e,s=te;s!==null&&(te=null,Be="");const r=$.consumeGlide(),o=JSON.stringify({seen:I.lastTaken,offset:n,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:$.liveSwing,glide:r??null,tracks:ya(),fx:$.doc.fx});if(Kl(),o===Be)return;Be=o;const l={...Ai(a,$.doc,ya(),r),seen:I.lastTaken,...s===null?{}:{enterBeat:s}};Si=n,V.port.postMessage({type:"state",state:l}),window.__posts?.push({why:t,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const Ce=Ol("petra-rhythm",ft),mn=Ce?Bl(Ce.ctx,[fa]):_l([fa],void 0,t=>console.warn("[rhythm] audio preload failed; loading on Play instead",t));async function gt(){const t=mn.load();if(M)return;const e=await t;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,H){const a=M,s=a.getOutputTimestamp.bind(a);a.getOutputTimestamp=()=>{const r=s(),o=!qt||!r.contextTime?r:{contextTime:r.contextTime+qt/1e3,performanceTime:r.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),o.contextTime??0,o.performanceTime??0]),o}}M.addEventListener("statechange",()=>{L(),me()}),de=Ce?.mapper??new ls(M,Hl?{}:{stepThresholdMs:0}),de.onStep(a=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:a.stepSeconds*1e3,confirmedAt:a.confirmedAt,reanchors:a.reanchors,revert:a.revert===!0}),Ut(!0)}),de.start(),V=new AudioWorkletNode(M,"rhythm"),V.port.onmessage=a=>{if(a.data.switched!==void 0&&tc(a.data.switched),a.data.level!==void 0&&a.data.step!==void 0&&(xi=a.data.level,lt!==a.data.step&&(lt=a.data.step,L())),!(!H||!M)){for(const s of a.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-Si});for(const s of a.data.onsets??[]){const r=ha(M,s.contextTime);r&&window.__onsets?.push({app:cn,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-s.contextTime)*1e3,...r})}for(const s of a.data.render??[]){const r=ha(M,s.contextTime);r&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:r.playedMs})}}},X=ol(M,{moduleUrl:jl()??cl,slots:3,state:Gt($.doc.fx)}),Wt=Gt($.doc.fx),V.connect(X.input),window.__hacks=()=>({state:X?.getState(),status:X?.status}),X.output.connect(Ce?.output??M.destination);let n=!1;hn.subscribe(()=>C(n?"clock":"attach")),R.subscribe(a=>Ut(a.kind==="snapshot"&&a.replay===!0)),n=!0}const ue=new Ys;let fn=!1,nt=null,Ae=null;function bt(){return!M||M.state!=="running"}function Vl(){return Ae=ue.mode(bt(),D()),Ae}function gn(){return nt??=(async()=>{try{te=Number.POSITIVE_INFINITY,M&&C(),await gt(),M&&M.state!=="running"&&await M.resume();const t=R.transport;te=ue.enter(t.beatAt(F()),t.bpm),Kt&&(Kt=!1,te=Math.floor(t.beatAt(F())/4)*4);const e=te;fn=!0,yn(),C(),H&&(window.__join={...ue.toJSON(),tapBeat:Ei,sentBeat:e})}catch(t){throw ue.cancel(),te=Number.NEGATIVE_INFINITY,C(),t}})().finally(()=>{nt=null,L(),me()}),nt}let Ei=Number.NaN,Kt=!1;function Mi(t){const e=t instanceof KeyboardEvent&&t.repeat;ue.gesture(bt(),D(),e)&&(Ei=R.transport.beatAt(F()),gn().catch(Li))}document.addEventListener("pointerdown",Mi,{capture:!0});document.addEventListener("keydown",Mi,{capture:!0});document.addEventListener("pointerup",()=>{ue.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function Li(t){console.warn("[rhythm] audio couldn't start",t),Q.say("Audio couldn't start. Press Play to try again."),L()}function bn(){Yl().catch(Li)}async function Yl(){if(ue.swallowClick(bt(),D())){await gn();return}await Ci()}let Re=null;function me(){if(Re!==null&&(clearTimeout(Re),Re=null),!bt())return;Ze(!0,D())!==Ae&&L();const t=F(),{startTime:e,stopTime:n}=R.transport,a=[e,n].filter(r=>r!==null&&r>t);if(a.length===0)return;const s=Math.min((Math.min(...a)-t)*1e3+1,2**31-1);Re=setTimeout(()=>{Re=null,me()},s)}const Xl=1500;function Jl(t){let e,n;const a=new Promise(o=>{e=setTimeout(()=>o(!1),Xl)}),s=new Promise(o=>{n=()=>{t.state==="running"&&o(!0)},t.addEventListener("statechange",n)}),r=t.resume().then(()=>t.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),n&&t.removeEventListener("statechange",n)})}let Nt=!1;function Ql(){M?M.state!=="running"&&M.resume().catch(()=>{}):mn.load().catch(()=>{})}async function Ci(){if(Nt){Ql();return}Nt=!0;try{if(await gt(),!M)return;if(M.state!=="running"&&!await Jl(M)&&!D()){Q.say("Tap Play to start audio"),L();return}}finally{Nt=!1}if(Ce&&R.transport.isPlayingAt(F())){Te?(Te=!1,te=Math.ceil(R.transport.beatAt(F())/4-1e-9)*4):Te=!0,$.playing=D(),Be="",C(),L();return}if(D()){R.stop({at:F()});return}R.play({at:F()}),!O.isLeader&&[...O.peers.values()].some(t=>t.leader)&&(fn=!0,yn(),L())}const Q=new Al(()=>L()),Zl=6e3;ga&&Q.say(ga,Zl);function he(){return fn&&!O.isLeader}function yn(){!he()||!$.adoptSwing(O.swing)||(C(),L())}function Ni(t,e,n){const a=$.peek(t),s=Ge();if(!a||!V||!s)return!1;const r=R.transport.beatAt(F()),o=I.recall(t,r,{glide:e},n===void 0?{}:{atBeat:n});return Ri(o,a,s.shifted),!0}let _i="";function Pi(t){return he()?$.followSwing??t.swing:t.swing}function zi(t,e){return JSON.stringify([t,Pi(e),e.fx,e.tracks])}function Ri(t,e,n){if(!V)return;_i=zi(t.id,e);const a={...Ai(n,e,e.tracks,t.payload.glide),swing:Pi(e),atBeat:t.atBeat,switchId:t.id,slot:t.slot};V.port.postMessage({type:"state",state:a})}function ec(){const t=I.pending;if(!t||!V)return;const e=$.peek(t.slot);if(!e){I.cancel();return}if(zi(t.id,e)===_i)return;const n=Ge();n&&Ri(t,e,n.shifted)}function wn(t,e){const n=$.liveSwing;return $.recall(t,e)?(he()||($.followSwing=null),$.liveSwing!==n&&Ue(!0),!0):!1}function tc(t){const e=I.takeHeld(t);e&&(wn(e.slot,e.payload.glide),$.consumeGlide(),C(),L())}function Oi(t){if(I.cancel(),!wn(t,$.recallGlideSeconds))return;const e=$.recallGlideSeconds>0?$.recallGlideSeconds:0;O.sendSnapshot("recall",t,{atBeat:R.transport.beatAt(F()),...e>0?{glide:{seconds:e}}:{}})}function nc(t){if(I.tap(t,D()).kind==="queue"){const n=$.recallGlideSeconds>0?$.recallGlideSeconds:0;if(Ni(t,n,Fa(R.transport.beatAt(F())))){const a=I.pending?.atBeat;O.sendSnapshot("recall",t,{...a===void 0?{}:{atBeat:a},...n>0?{glide:{seconds:n}}:{}});return}}Oi(t)}function Ee(t,e){const n=Aa[t]??"";if(e==="store")$.store(t),Q.say(Ct(e,n,!0));else if(e==="clear"){const a=$.bank.slots[t]!=null;if(I.queued===t){const s=I.drop();I.cancel();const r=$.bank.active;s&&r!=null&&O.sendSnapshot("recall",r,{atBeat:s.atBeat})}$.clear(t),Q.say(Ct(e,n,a)),a&&Ne.show(We,`Slot ${n} cleared`)}else $.bank.slots[t]==null?Q.say(Ct(e,n,!1,matchMedia("(pointer: coarse)").matches)):nc(t);C(),L()}function We(){$.undoSurprise()&&(Ne.dismiss(),C(),L())}function ac(t){const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((t.metaKey||t.ctrlKey)&&t.key==="z"&&!t.shiftKey){t.preventDefault(),We();return}if(t.code==="Space"){t.preventDefault(),t.repeat||bn();return}const n=t.code.startsWith("Digit")?Number(t.code.slice(5)):Number.NaN;if(!Number.isInteger(n))return;const a=n===0?9:n-1;a<0||a>=J||(t.preventDefault(),t.shiftKey?Ee(a,"store"):t.altKey?Ee(a,"clear"):Ee(a,"recall"))}const ic=new Js({min:pe[0],max:pe[1]});function Vt(t){$.doc.bpm=t,R.setTempo({bpm:t}),C(),L()}function sc(){return he()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Ii(){const t=D(),e=Vl(),n=he();return{id:"transport",title:"Transport",summary:t?"playing":"stopped",status:Q.text,controls:[{type:"button",id:"play",label:Ba(e),on:e==="stop",...e==="join"?{ariaLabel:ja}:{},onPress:()=>bn(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{$.surprise(),C(),L(),Ne.show(We)}},{type:"slider",id:"bpm",label:"Tempo",min:pe[0],max:pe[1],step:1,value:R.transport.bpm,onChange:Vt,onTap:a=>{const s=ic.tap(a);s!==null&&s!==R.transport.bpm&&Vt(s)}},{type:"slider",id:"swing",label:n?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:$.liveSwing,valueText:zs($.liveSwing),disabled:n,modulated:n&&$.followSwing!=null,onChange:a=>{he()||nt||($.setSwing(a),Ue(!1),C(),L())},onCommit:()=>{Ue(!0)}},...O.isLeader?[]:[{type:"note",id:"swing-note",text:sc()}],...O.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:O.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:$.morphSeconds,morphText:Tl($.morphSeconds),slots:Aa.map((a,s)=>({label:a,filled:$.bank.slots[s]!=null,active:$.bank.active===s,edited:$.edited===s,queued:I.queued===s,pulse:I.queued===s&&t&&lt%4<2})),onMorph:a=>{$.morphSeconds=a,L()},onSlot:(a,s)=>{Ee(a,s)}}]}}function Yt(){const t=$.doc.tracks.length;return t===0?0:Math.min($.selectedTrack,t-1)}function ji(){const t=$.doc.tracks[Yt()];return{id:"pattern",title:"Pattern",lead:!0,summary:t?`${$.doc.tracks.length} tracks · ${t.name}`:`${$.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Ae==="stop",label:Ba(Ae??"play"),...Ae==="join"?{ariaLabel:ja}:{},onToggle:()=>bn()},id:"grid",playhead:D()?lt:-1,selectedRow:t?.id,onSelectRow:e=>{$.selectTrack(e),L()},onDice:e=>{const n=$.doc.tracks[e]?.name??"Lane";$.diceLane(e)&&(C(),L(),Ne.show(We,`New ${n} steps`))},onFill:e=>{Ti=e,C(),L()},onLength:(e,n)=>{$.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(n))))}),C(),L()},onMute:e=>{$.edit(n=>{const a=n.tracks[e];a&&(a.mute=!a.mute)}),C(),L()},onSolo:e=>{$.edit(n=>{const a=n.tracks[e];a&&(a.solo=!a.solo)}),C(),L()},onToggle:(e,n,a)=>{$.edit(s=>{const r=s.tracks[e]?.steps[n];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),C(),L()},onLongPress:(e,n,a)=>{const s=$.doc.tracks[e],r=s?.steps[n];!s||!r||yo({anchor:a,title:`${s.name} · step ${n+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{$.edit(u=>{const c=u.tracks[e]?.steps[n];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),C(),L()}})},onSet:(e,n,a,s)=>{$.edit(r=>{const o=r.tracks[e]?.steps[n];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),C(),L()},rows:$.doc.tracks.map((e,n)=>({id:e.id,label:e.name,lane:n%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))}]},rc()]}}function rc(){const t=Yt(),e=$.doc.tracks[t],n=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:t%4+1,controls:n.map(a=>{const s=js(e?.voice,a);return{type:"slider",id:e?.voice==="shaker"?`shaker-${a}`:a,label:s.label,valueText:s.text(e?.params[a]??0),min:s.min,max:s.max,step:s.step,value:e?.params[a]??0,onChange:r=>{$.edit(o=>{const l=o.tracks[Yt()];l&&(l.params[a]=r)}),C(),L()}}})}}function Xt(t,e){$.edit(n=>{const a=He(n.fx);e(a[t]),n.fx.hacks=a}),C(),L()}function oc(t,e){const n=He($.doc.fx)[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,s=r=>Xt(t,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:mi(e,n,$.doc.bpm),onChange:s}}const _t=(t,e)=>(Z(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>oc(t,n));function lc(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}function vn(){const t=$.doc.fx,e=He(t),n=t.mode==="lp"&&t.cutoff>=.999,a=r=>{$.edit(r),C(),L()},s=[e.filter&&!n?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:r=>a(o=>{o.fx.hacks={...He(o.fx),filter:r}}),controls:[{type:"select",id:"mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(o=>{(r==="lp"||r==="hp"||r==="bp")&&(o.fx.mode=r)})},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":lc(Pa(t.cutoff)),onChange:r=>a(o=>{o.fx.cutoff=r})},...t.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Se(t.resonance),onChange:r=>a(o=>{o.fx.resonance=r})}],{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:r=>Xt("drive",o=>{o.on=r}),controls:_t("drive",!1),more:_t("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:r=>Xt("compressor",o=>{o.on=r}),controls:_t("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:xi}]}}await pi();const Bi=sn(Ii());await rn();const kn=sn({id:"pattern",title:"Pattern",lead:!0}),$n=sn({id:"filter",title:vn().title}),Fi={build:()=>kn.update(ji())},Di={build:()=>$n.update(vn())};let ct=null;function L(){$.takeSurpriseEdit()&&Ne.dismiss(),Bi.update(Ii()),ct?.ready(Fi)&&kn.update(ji()),ct?.ready(Di)&&$n.update(vn()),un?.schedule()}window.addEventListener("pagehide",()=>un?.flush());function wa(t,e,n){I.cancel(),$.replace(t,e),C(),L(),un?.schedule(),Ne.show(We,n)}wl(Ul,{save:()=>{const t=$.doc.name||"rhythm",e=URL.createObjectURL(new Blob([Bs($.doc,$.bank)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`${t}.rhythm`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),0),Q.say(`Saved ${t}.rhythm`)},load:(t,e)=>{const n=Fs(t);if(!n.ok||!n.document||!n.bank){Q.say(`Couldn't load ${e}: ${n.errors[0]??"not a Rhythm file"}`);return}wa(n.document,n.bank,`Loaded ${e}`)},create:()=>wa(Ws(),Ea(),"New pattern"),panic:()=>V?.port.postMessage({type:"panic"})});R.onChange(()=>{if(R.transport.running||(Te=!1),$.playing=D(),!$.playing&&I.pending){const t=I.drop();t&&Oi(t.slot)}$.doc.bpm=R.transport.bpm,C(),L(),me()});O.onSwing(t=>{he()&&$.adoptSwing(t)&&C(),L()});O.onSnapshot(t=>{if(t.op!=="recall")return;const e=O.peers.get(t.from)?.app;if(!tr(cn,e,Dl)){window.__ignoredRecalls?.push({slot:t.slot,app:e??null});return}window.__recalls?.push({slot:t.slot,atBeat:t.atBeat??null,shared:F()});const n=t.glide?.seconds??0;if(D()&&Ni(t.slot,n,t.atBeat)){L();return}I.cancel(),wn(t.slot,n),C(),L()});O.onRole(()=>{yn(),L(),me()});O.onPeers(()=>{L(),me()});H&&(window.__rhythm={setKick:t=>{$.edit(e=>{const n=e.tracks.find(a=>a.voice==="kick");n&&n.steps.forEach((a,s)=>{a.on=t.includes(s)})}),C(),L()},store:t=>Ee(t,"store"),tap:t=>Ee(t,"recall"),tempo:t=>Vt(t),beat:()=>R.transport.beatAt(F()),timeAt:t=>R.transport.timeAt(t),slots:()=>({active:$.bank.active??null,queued:I.queued}),swing:()=>{const t=$.bank.active;return{live:$.liveSwing,doc:$.doc.swing,slot:t==null?null:$.bank.slots[t]?.swing??null,leader:O.isLeader}},setSwing:t=>{$.setSwing(t),Ue(!0),C(),L()},lateEnter:()=>{Kt=!0},audio:async()=>(await gt(),await M?.resume(),M?.state??"none")});await rn();await O.start();document.addEventListener("keydown",ac);So(pn,[Bi,kn,$n],"adjacent");await rn();L();ct=Ao([Fi,Di]);me();ct.done.then(()=>{mn.preload(),Ce&&gt().then(()=>{D()&&M?.state==="running"&&gn()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const t=D();if(t!==$.playing&&($.playing=t,L()),Ut(),C(),!H||!M)return;const e=xl(M);e&&window.__stamps?.push(e)},250);
