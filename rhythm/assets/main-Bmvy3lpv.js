(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Te=1e-9;function ys(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class yn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return ys(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,l)=>r.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const r of a)r.beat<=e.beat+Te&&(s=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const r of a){if(r.beat<=e.beat+Te)continue;const l=this.clamp(r.bpm);l!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Te){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Te;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,s=.25){const o=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(e,n);return}const r=Math.max(1,Math.round(a/s));this.setTempoAt(o,n);for(let l=1;l<=r;l++)this.setTempoAt(o+(e-o)*l/r,n+a*(l-1)/r)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new yn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+Te)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+Te)return n[a];return n[0]}}const ws=Object.freeze({beatsPerBar:4,beatUnit:4}),_e=1e-9;function vs(t){return Math.floor(t+_e)}function Ua(t,e,n=!1){if(!(e>0))return t;const s=Math.ceil(t/e-_e)*e;return n&&s<=t+_e?s+e:s}class ks{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new yn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??ws}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-_e&&(this.stopTime===null||e<this.stopTime-_e)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-_e?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=vs(e/n),s=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:s,barPhase:s/n}}nextBar(e,n=!1){return Ua(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Ga="nc-clock/snapshot",Wa=1;function $s(t,e="local"){return{format:Ga,version:Wa,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function xs(t,e){const n=Ts(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}function Ss(t,e,n=t.timebase){const a=s=>s===null?null:s+e;return{...t,timebase:n,anchor:{beat:t.anchor.beat,time:t.anchor.time+e},tempo:t.tempo.map(s=>({...s})),meter:{...t.meter},startTime:a(t.startTime),stopTime:a(t.stopTime)}}const ee=t=>typeof t=="number"&&Number.isFinite(t),Wn=t=>t===null||ee(t);function Ts(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Ga&&n("format"),(!ee(e.version)||Math.floor(e.version)!==Wa)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!ee(e.anchor.beat)||!ee(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&ee(a.beat)&&ee(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!ee(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!ee(e.meter.beatUnit))&&n("meter"),(!Wn(e.startTime)||!Wn(e.stopTime)||!ee(e.stoppedBeat))&&n("transport times"),e}class Es{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ks(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){xs(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return $s(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const As="nc-sync/1",Ms=1,Ls="nc-sync",Cs="nc-sync-leader",Ns=0,Ka=.5,Va=.75;function Ps(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Ka&&t<=Va?t:null}const It=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),qe=t=>typeof t=="number"&&Number.isFinite(t),at=t=>typeof t=="string"&&t.length>0;function zs(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Ms||!at(e.type)||!at(e.from)||!qe(e.term)||!qe(e.seq)||!qe(e.sentAt))return null;switch(e.type){case"hello":return at(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return qe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&qe(e.slot)?e:null;case"ping":case"pong":return at(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function _s(t,e,n,a,s){return{proto:As,from:e,term:n,seq:a,sentAt:s,...t}}function B(){return(performance.timeOrigin+performance.now())/1e3}const Ot=.003,Rs=3,Is=.01,Kn=500;class Os{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Is:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=Ot&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,o=this.median(),r=s-o,l=Math.abs(s-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(r);return!u&&Math.abs(r)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(r-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,o,u))):(this.pendingStep=r,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const s=this.ctx.currentTime,o=s<=this.revertUntil;let r;if(a&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let d=0;d<u.length;d++)l.push(u[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,r={stepSeconds:this.preStepBase-n,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const d=this.offsets,c=this.preStep;c.length=0;for(let h=0;h<d.length;h++)c.push(d[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,u=e-n;for(let d=0;d<l.length;d++)l[d]+=u;this.stepCount++,r={stepSeconds:e-n,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(r);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let o=0;o<a;o++){const r=e[o];let l=o-1;for(;l>=0&&n[l]>r;)n[l+1]=n[l],l--;n[l+1]=r}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=Ot&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Kn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),n=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=Ot)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<Kn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Rs,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class js{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...It,...e.capabilities},this.channelOption=e.channel??Ls,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const a=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[s,o]=this.tempoRange();e=Math.min(o,Math.max(s,e));const r=this.clock.transport,l=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const u=r.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Ua(u,1),u);a&&a>0?(r.tempo.rampTempo(e,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Va,Math.max(Ka,e)):Ns;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Ps(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=zs(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...It,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...It},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Cs,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,r,l)=>[o?0:1,r,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(s===null||r[0]<a[0]||r[0]===a[0]&&(r[1]<a[1]||r[1]===a[1]&&r[2]<a[2]))&&(a=r,s=o.id)}this.setLeader(s===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(_s(e,this.id,this.term,++this.seq,this.o.now()))}}const Vn=.02,Hs=.06,Bs={shaker:{tune:6500,decay:.025,tone:.55,snap:.55,drive:.5,level:.3}},Ya=["kick","snare","clap","rim","hat","hatOpen","tom","metal","shaker"],ae=10,Xa=["1","2","3","4","5","6","7","8","9","0"];function Ja(){return{slots:Array.from({length:ae},()=>null),active:null}}function wn(t){return{swing:t.swing,fx:structuredClone(t.fx),tracks:structuredClone(t.tracks)}}function Fs(t,e,n){const a=t.slots.slice();return a[e]=wn(n),{slots:a,active:e}}function qs(t,e){const n=t.slots.slice();return n[e]=null,{slots:n,active:t.active===e?null:t.active}}function Yn(t,e,n,a){const s=t.slots[e];return s?{bank:{slots:t.slots,active:e},document:{...n,bpm:n.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:a>0?a:0,applied:!0}:{bank:t,document:n,glideSeconds:0,applied:!1}}function Ds(t,e){if(t.active==null||!t.slots[t.active])return t;const n=t.slots.slice();return n[t.active]=wn(e),{slots:n,active:t.active}}const Us=16,Gs=[2,6,10,14],Ws=[2,3,6,10,11,14],gt=[0,2,4,6,8,10,12,14],Ks=[2,6,10,14],Vs=[1,3,7,9,11,15],Xn=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],gt,[2,6,10,14]],Ys={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]}};function Y(){return Array.from({length:Us},()=>!1)}function de(t,e,n,a=!1){const s=e+t()*(n-e);return a?Math.round(s):Math.round(s*100)/100}function jt(t,e,n){return de(t,Math.max(0,e-n),Math.min(1,e+n))}function Xs(t){const e=Y();e[0]=!0,t()<.85&&(e[8]=!0),t()<.75&&(e[4]=!0),t()<.75&&(e[12]=!0);const n=[3,6,10,14],a=n[Math.floor(t()*n.length)]??6;return t()<.35&&(e[a]=!0),e}function Js(t){const e=Y();e[4]=t()<.85,e[12]=t()<.85,!e[4]&&!e[12]&&(e[t()<.5?4:12]=!0);const n=Gs.filter(()=>t()<.22);for(const a of n.slice(0,2))e[a]=!0;return e}function Qs(t,e){const n=Y();return t[4]&&e()<.65&&(n[4]=!0),t[12]&&e()<.65&&(n[12]=!0),n}function Zs(t,e){const n=Y();let a=0;for(const s of Ws)a>=3||t[s]||e()<.35&&(n[s]=!0,a+=1);return n}function eo(t){const e=Y();let n=0;for(const a of Ks){if(n>=2)break;t()<.4&&(e[a]=!0,n+=1)}return e}function to(t,e){const n=Y();for(const r of gt)n[r]=!t[r];const a=gt.filter(r=>n[r]&&r!==0),s=1+Math.floor(e()*3);for(let r=0;r<s&&a.length>0;r+=1){const l=Math.floor(e()*a.length),u=a.splice(l,1)[0];u!==void 0&&(n[u]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(n[r]=!0,o+=1)}return n}function no(t,e){const n=Y(),a=t[12]?[13,14,15]:[12,13,14,15];let s=0;for(const o of a){if(s>=3)break;e()<.45&&(n[o]=!0,s+=1)}return n}function ao(t,e,n){const a=Y();let s=0;for(const o of Vs)s>=2||t[o]||e[o]||n()<.35&&(a[o]=!0,s+=1);return a}function Qa(t){const e=Y(),n=Xn[Math.floor(t()*Xn.length)]??gt;for(const a of n)e[a]=!0;return e}function Za(t,e,n){return Array.from({length:e},(a,s)=>{const o=t[s]===!0,r=o&&n(s);return{on:o,accent:r,velocity:r?1:.8}})}function ei(t,e){return t==="kick"?e===0||e===8:t==="snare"?e===4||e===12:t==="shaker"?e%4===2:!1}function io(t,e,n){const a=Ys[t];return{tune:de(n,a.tune[0],a.tune[1],!0),decay:t==="shaker"?Math.round((a.decay[0]+n()*(a.decay[1]-a.decay[0]))*1e3)/1e3:de(n,a.decay[0],a.decay[1]),tone:jt(n,e.tone,.15),snap:jt(n,e.snap,.15),drive:jt(n,e.drive,.1),level:de(n,a.level[0],a.level[1])}}function ti(t,e=!1){const n=Xs(t),a=Js(t),s=eo(t);return{kick:n,snare:a,clap:Qs(a,t),rim:Zs(n,t),hat:to(s,t),hatOpen:s,tom:no(a,t),metal:ao(n,a,t),shaker:e?Qa(t):Y()}}function so(t,e,n){const a=t.tracks[e];if(!a)return t;const s=l=>l.every((u,d)=>u.on===(a.steps[d]?.on??!1));let o=a.steps;for(let l=0;l<6;l++){const u=ti(n,a.voice==="shaker")[a.voice];if(o=Za(u,a.length,d=>ei(a.voice,d)),!s(o)&&o.some(d=>d.on))break}const r=a.steps.slice(a.length);return{...t,tracks:t.tracks.map((l,u)=>u===e?{...l,steps:[...o,...r]}:l)}}function oo(t){return{...t,tracks:t.tracks.map(e=>{const n=Math.max(0,e.length-4),a=e.steps.map((s,o)=>{if(o<n||o>=e.length)return s;const r=o-n;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function ro(t,e){const n=ti(e),a=e()<.4?.5:de(e,.5,.62),s=e(),o=s<.8?"lp":s<.9?"hp":"bp";return{...t,bpm:t.bpm,swing:a,fx:{...t.fx,mode:o,cutoff:de(e,.55,.9),resonance:de(e,.05,.3),drive:de(e,.02,.18)},tracks:t.tracks.map(r=>{const l=io(r.voice,r.params,e),u=r.voice==="shaker"?e()<.5?Y():Qa(e):n[r.voice];return{...r,mute:r.mute,solo:r.solo,params:l,steps:Za(u,r.length,d=>ei(r.voice,d))}})}}function lo(t,e=Math.random){const n=[];let a=null;for(let o=0;o<ae;o+=1){const r=wn(ro(t,e));n.push(r),o===0&&(a=r)}const s=a?{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:t;return{bank:{slots:n,active:0},document:s}}function Re(t){return`${Math.round(t*100)}%`}function co(t){return Re(t)}function uo(t,e){return t==="tune"?`${Math.round(e)} Hz`:Re(e)}function po(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Jn(t){return`${Math.round(t*1e3)} ms`}const ho={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:t=>`${Math.round(t)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:Jn},tone:{label:"Bright",min:0,max:1,step:.01,text:Re},snap:{label:"Beads",min:0,max:1,step:.01,text:Re},drive:{label:"Attack",min:0,max:1,step:.01,text:t=>Jn(Vn+(Hs-Vn)*t)},level:{label:"Level",min:0,max:1,step:.01,text:Re}};function mo(t,e){return t==="shaker"?ho[e]:{label:po(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:n=>uo(e,n)}}const bt=2,ni=64;function ai(t,e){const{version:n,...a}=t,s={...a,version:bt,slots:Array.from({length:ae},(o,r)=>{const l=e.slots[r];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Qn(t){return Array.isArray(t)&&t.length<=ni}function ii(t){if(yo(t)>go)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(t)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const n=e;if(n.format!==Et)return{ok:!1,errors:["Not a Rhythm file"]};if(n.version!==1&&n.version!==bt)return{ok:!1,errors:[`Unsupported version ${String(n.version)}`]};const a=n.version,{slots:s,active:o,...r}=n,l=He({...r,version:vn});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const u=l.document,d=[];for(const h of u.tracks)Qn(h.steps)||d.push(`More than ${ni} steps on ${h.id}`);const c={slots:Array.from({length:ae},()=>null),active:null};return a===bt&&(!Array.isArray(s)||s.length!==ae?d.push(`Expected ${ae} slots`):s.forEach((h,f)=>{if(h==null)return;if(!He({...u,swing:h.swing,fx:h.fx,tracks:h.tracks}).ok||!h.tracks.every(g=>Qn(g.steps))){d.push(`Slot ${f+1} is malformed`);return}const b=typeof h.seed=="number"&&Number.isFinite(h.seed)?h.seed>>>0:0;c.slots[f]={swing:h.swing,fx:h.fx,tracks:h.tracks,seed:b}}),o!=null&&(!Number.isInteger(o)||o<0||o>=ae||!c.slots[o]?d.push("Active slot is empty or out of range"):c.active=o)),d.length>0?{ok:!1,errors:d}:{ok:!0,errors:[],document:u,bank:c,from:a}}const Zn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},ea=(t,e)=>{const n=t&&typeof t=="object"?t:{},a={...e.dials};for(const[s,o]of Object.entries(n.dials??{}))s in e.dials&&typeof o=="number"&&Number.isFinite(o)&&(a[s]=o);return{on:typeof n.on=="boolean"?n.on:e.on,dials:a}};function Qe(t){const e=t.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:ea(e.drive,Zn.drive),compressor:ea(e.compressor,Zn.compressor)}}function si(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const it=t=>Math.max(0,Math.min(100,t));function fo(t){const e=si(t.cutoff),n=it(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:it(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:it(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:it(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const Et="netcomposer.rhythm",vn=1,ct="Saved by an older Rhythm (no Shaker lane), so it can't be opened",go=256*1024,oi="netcomposer.rhythm.preset.",bo=new Set(Ya);function ri(t){return`${oi}${t}`}function yo(t){let e=0;for(const n of t){const a=n.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function He(t){const e=[];if(!t||typeof t!="object")return{ok:!1,errors:["Document is not an object"]};const n=t;if(n.format!==Et&&e.push("Unknown format"),n.version!==vn&&e.push("Unsupported version"),(typeof n.id!="string"||!n.id.startsWith(oi))&&e.push("Preset id is outside the rhythm namespace"),(typeof n.name!="string"||n.name.length===0)&&e.push("Missing name"),(typeof n.bpm!="number"||!Number.isFinite(n.bpm)||n.bpm<=0)&&e.push("Invalid tempo"),(typeof n.swing!="number"||n.swing<.5||n.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!n.meter||n.meter.beatsPerBar<=0||n.meter.beatUnit<=0)&&e.push("Invalid meter"),(!n.fx||n.fx.mode!=="lp"&&n.fx.mode!=="hp"&&n.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(n.tracks)||n.tracks.length===0||n.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const s of n.tracks)bo.has(s.voice)||e.push(`Unknown voice ${s.voice}`),(!Number.isInteger(s.length)||s.length<1||s.length>64)&&e.push(`Bad length on ${s.id}`),(!Array.isArray(s.steps)||s.steps.length<s.length)&&e.push(`Steps shorter than length on ${s.id}`);if(e.length>0)return{ok:!1,errors:e};const a=n.tracks;return Ya.some(s=>!a.some(o=>o.voice===s))?{ok:!1,errors:[ct]}:{ok:!0,errors:[],document:n}}function li(t,e=[]){return Array.from({length:16},(n,a)=>({on:t.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const wo={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4},shaker:{...Bs.shaker}};function ci(){const t=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]},{voice:"shaker",name:"Shaker",on:[]}];return{format:Et,version:vn,id:ri("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:t.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:li(e.on,e.accent),params:{...wo[e.voice]}}))}}function vo(){const t=ci();return{...t,id:ri("untitled"),name:"Untitled",tracks:t.tracks.map(e=>({...e,steps:li([])}))}}const ko="Tap to join",di="Tap to join the playing beat";function dt(t,e){return t&&e?"join":e?"stop":"play"}function ui(t){return t==="join"?ko:t==="stop"?"Stop":"Play"}function $o(t,e,n={}){const a=n.beatsPerBar??4,s=(n.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((t+s)/a-1e-9)*a)}class xo{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,n){return this.shown=dt(e,n),this.shown}gesture(e,n,a=!1){return this.joinedBy=!1,a||this.joining||dt(e,n)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,n){const a=this.joinedBy||this.joining||dt(e,n)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,n){return this.joining=!1,this.entry=$o(e,n,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class So{constructor(e=n=>JSON.stringify(n)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,n=!1){const a=this.key(e);if(this.value=e,this.has=!0,!n&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class kn{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,n){return!n||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,n,a,s={}){const o=s.id??this.seq+1;this.seq=Math.max(this.seq,o);const r=s.atBeat??pi(n,s.beatsPerBar);return this.held={id:o,slot:e,atBeat:r,payload:a},this.queued=e,this.held}due(e){const n=this.held;return!n||e<n.atBeat?null:this.finish(n)}takeHeld(e){const n=this.held;return!n||n.id!==e?null:this.finish(n)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const n=new kn;return n.queued=e.queued,n.held=e.held,n.seq=e.seq,n.taken=e.taken,n}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function pi(t,e=4){return t<0?0:(Math.floor(t/e+1e-9)+1)*e}class To{constructor(e){this.options=e}taps=[];tap(e){const{window:n=4,resetMs:a=2e3,jump:s=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>a||e<=o)return this.taps=[e],null;const r=e-o,l=this.meanInterval();l!==null&&Math.abs(r-l)>l*s&&(this.taps=[o]),this.taps.push(e),this.taps.length>n+1&&this.taps.splice(0,this.taps.length-n-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const hi=globalThis,Eo="linkslots",Ao=new Set(["0","false","off","no"]);function Mo(t,e=hi.location?.search??"",n=Co()){const a=new URLSearchParams(e).get(Eo);if(a!==null)return!Ao.has(a.trim().toLowerCase());try{return n?.getItem(t)==="1"}catch{return!1}}function Lo(t,e,n){return n||e===t}function Co(){try{return hi.localStorage??null}catch{return null}}const No="nc-ui",Po={breakpoint:{md:"768px"}},mi={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Jt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ue={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},We=t=>`--${No}-${t}`,Qt=mi["label-on-fill-dark"],ta=mi["label-on-fill-light"],zo=ue["label-min-contrast"],_o=/^#[0-9a-f]{6}$/i,Ro=t=>typeof t=="string"&&_o.test(t),ut=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function na(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));const a=e*Math.min(n,1-n),s=o=>{const r=(o+t/30)%12;return n-a*Math.max(-1,Math.min(r-3,9-r,1))};return`#${ut(s(0)*255)}${ut(s(8)*255)}${ut(s(4)*255)}`}function fi(t){const[e,n,a]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),s=Math.max(e,n,a),o=Math.min(e,n,a),r=(s+o)/2,l=s-o;if(!l)return{h:0,s:0,l:r};const u=l/(1-Math.abs(2*r-1));return{h:((s===e?60*((n-a)/l%6):s===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:r}}function aa(t){const[e,n,a]=[1,3,5].map(s=>{const o=parseInt(t.slice(s,s+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Zt(t,e){const[n,a]=[aa(t),aa(e)].sort((s,o)=>o-s);return(n+.05)/(a+.05)}const yt=t=>Zt(t,Qt)>=Zt(t,ta)?Qt:ta;function gi(t,e,n,a=zo){let s=na(t,e,n);const o=yt(s)===Qt?1:-1;for(let r=0;r<40&&Zt(s,yt(s))<a;r++)n+=o*.01,s=na(t,e,n);return s}function Io(t){const{h:e,s:n}=fi(t),a=gi(e,Math.min(n,ue["surprise-on-max-saturation"]),ue["surprise-on-lightness"]);return{fill:t,ink:yt(t),on:a,onInk:yt(a)}}const Oo=(t,e)=>{const n=Math.abs(t-e)%360;return Math.min(n,360-n)};function jo(t,e=Math.random){const[n,a]=ue["surprise-saturation"],[s,o]=ue["surprise-lightness"],r=ue["surprise-min-hue-gap"],l=Ro(t)?fi(t).h:null;let u=e()*360;return l!==null&&Oo(u,l)<r&&(u=(l+r+e()*(360-2*r))%360),gi(u,n+e()*(a-n),s+e()*(o-s))}function Ho(t){if(!t)return null;const e=Io(t);return{[We("surprise-fill")]:e.fill,[We("surprise-ink")]:e.ink,[We("surprise-on")]:e.on,[We("surprise-on-ink")]:e.onInk}}const Bo=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Fo=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ia(t){const[e,n,a]=[1,3,5].map(l=>Bo(parseInt(t.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),r=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*o-.0040720468*r,1.9779984951*s-2.428592205*o+.4505937099*r,.0259040371*s+.7827717662*o-.808675766*r]}function qo([t,e,n]){const a=(t+.3963377774*e+.2158037573*n)**3,s=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*o,-1.2684380046*a+2.6097574011*s-.3413193965*o,-.0041960863*a-.7034186147*s+1.707614701*o].map(l=>ut(Fo(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const Do=ue["velocity-range"],bi={min:Jt.rhythm["velocity-min"],max:Jt.rhythm["velocity-max"]};function Uo(t,e=bi){const[n,a]=Do,s=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,o=(s-n)/(a-n),r=Jt.rhythm["step-cell-ink"];if(o<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:r};if(o>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:r};const l=ia(e.min),u=ia(e.max);return{velocity:s,t:o,fill:qo(l.map((d,c)=>d+(u[c]-d)*o)),ink:r}}function sa(t,e=bi){return{[We("velocity-fill")]:Uo(t,e).fill}}const Go=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Wo={renames:Go},Ko={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Vo={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Yo={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},At={};for(const[t,e]of Object.entries(Ko))At[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(const[t,e]of Object.entries(Yo))At[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(const[t,e]of Object.entries(Vo))At[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Wo.renames.map(t=>[t.old,t.new]));function yi(t){const e=At[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function I(t){return yi(t).prop}function i(t){return`var(${I(t)})`}function Xo(t,e){if(!(t instanceof Element))return 0;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue(I(e)));return Number.isFinite(n)?n:0}function F(t,e){const n=yi(e),a=t.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const o=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=o:s.style.color=o,(t instanceof Element?t:a.documentElement).append(s);const u=(a.defaultView??window).getComputedStyle(s),d=n.kind==="family"?u.fontFamily:n.kind==="color"?u.color:u.paddingLeft;return s.remove(),d}function Jo(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Qo(t){const e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);const s=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),s}const Zo="[data-modulated], [data-modulated] *";function er(){const t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${I("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${I("divider")}: ${i(`module-div-stack-${a}`)};
      ${I("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
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
${Zo} { transition: none; }
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
`}let Ht=null;const tr="nc-ui-fallback";function wi(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ht&&Ht.ownerDocument===t))return;const e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${tr} {
${er()}
}
`,t.head.append(e),Ht=e}function vi(t={}){const e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=t.onText??"On";const o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",a.append(s,o),n.append(a);let r=!1;const l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(t.checked);const u=()=>{l(!r),t.onChange?.(r)};return n.addEventListener("click",u),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}const ki=new WeakMap,oa=.25;function nr(t){const e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let o=0,r=t.step??.005,l=t.onChange,u=t.onReset;const d=p=>Math.min(1,Math.max(0,p)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=p=>{const m=d(p);m!==o&&(o=m,c(),l?.(m))};let f=0,y=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});const m=n.getBoundingClientRect();p.target!==s&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!y)return;const m=n.getBoundingClientRect().height||1,w=(f-p.clientY)/m*(p.shiftKey?oa:1);f=p.clientY,h(o+w)});const b=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",p=>{p.preventDefault(),u?.()}),n.addEventListener("keydown",p=>{const m=p.shiftKey?r*oa:r,w={ArrowUp:o+m,ArrowRight:o+m,ArrowDown:o-m,ArrowLeft:o-m,PageUp:o+r*10,PageDown:o-r*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});const g={el:n,get value(){return o},get dragging(){return y},set(p){y||(o=d(Number(p)||0),c())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(r=p.step),p.onChange&&(l=p.onChange),p.onReset&&(u=p.onReset)}};return g.setLabel(t.label),g.set(t.value??0),g.setText(t.valueText),ki.set(n,g),g}function ar(t){return ki.get(t)}const $i=new WeakMap,ir=.2,sr=1.5,or=.5;function rr(t,e){const n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function ra(t,e,n){const a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:rr(a.getComputedStyle(t).getPropertyValue(I(e)),n)}function lr(t){const e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");const r=[];for(let g=0;g<n;g++){const p=e.createElement("span");p.className="nc-meter-bar";const m=e.createElement("span");m.className="nc-meter-peak";const w=e.createElement("span");w.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",p.append(m,w,k),o.append(p),r.push({peak:m,rms:w,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,o);let l=t.label,u=t.onClear,d=!1,c=-1,h=-1;const f=()=>{s.dataset.lit=d?"true":"false",s.setAttribute("aria-pressed",d?"true":"false"),s.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),s.title=d?"Clipped. Click to clear":"Clip light"},y=(g,p,m,w)=>{const k=Math.round(w*1e3)/1e3;m[p]!==k&&(m[p]=k,g.style.transform=p==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{b.clear(),u?.()});const b={el:a,get clipped(){return d},update(g,p){c<0&&(c=ra(a,"motion-meter-fall",ir)),h<0&&(h=ra(a,"motion-meter-hold",sr));const m=Math.max(0,Math.min(.25,Number(p)||0)),w=c>0?Math.exp(-m/c):0;r.forEach((k,S)=>{const $=g[S]??g[0]??{peak:0,rms:0},T=Math.min(1,Math.max(0,Number($.peak)||0)),x=Math.min(T,Math.max(0,Number($.rms)||0));$.over&&b.clip(),k.level.peak=T>=k.level.peak?T:T+(k.level.peak-T)*w,k.level.rms=x>=k.level.rms?x:x+(k.level.rms-x)*w,k.holdAge+=m,T>=k.holdAt?(k.holdAt=T,k.holdAge=0):k.holdAge>h&&(k.holdAt=Math.max(T,k.holdAt-or*m)),y(k.peak,"peak",k.shown,k.level.peak),y(k.rms,"rms",k.shown,k.level.rms),y(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(const g of r)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,y(g.peak,"peak",g.shown,0),y(g.rms,"rms",g.shown,0),y(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,f()},configure(g){g.onClear&&(u=g.onClear)}};return f(),b.reset(),$i.set(a,b),b}function cr(t){return t?$i.get(t):void 0}function dr(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),o=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==o)&&(t.width=s,t.height=o);const r=t.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:e,h:n}}function le(t){return Math.max(0,Math.min(1,t))}function xi(t,e){const{ctx:n,w:a,h:s}=dr(t);if(!n)return;n.clearRect(0,0,a,s);const o=Qo(t);if(e.paint==="swatch"){const u=F(t,"accent"),d=F(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,s),n.fillStyle=d,n.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const u=e.mode??"lp",d=F(t,Jo(u)),c=F(t,"divider"),h=le(e.cutoff??.5),f=.08+(1-le(e.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let y=0;y<=a;y++){const b=y/Math.max(1,a);let g=0;u==="lp"?g=b<h?1:Math.max(0,1-(b-h)/f):u==="hp"?g=b>h?1:Math.max(0,1-(h-b)/f):g=Math.max(0,1-Math.abs(b-h)/f);const p=s*.78-g*s*.62;y===0?n.moveTo(y,p):n.lineTo(y,p)}n.strokeStyle=d,n.stroke(),n.fillStyle=F(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,s),t.dataset.ncAccent=d;return}if(e.paint==="envelope"){n.strokeStyle=F(t,"accent"),n.beginPath();const u=Math.max(.05,e.decay??.4);for(let d=0;d<=a;d++){const c=d/Math.max(1,a),h=(s-4)*(1-Math.exp(-c*4/u));n.lineTo(d,s-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){const u=Array.isArray(e.peaks)?e.peaks:[],[d,c]=Array.isArray(e.region)?e.region:[0,1],h=F(t,"accent"),f=F(t,"text-sub"),y=s/2;n.fillStyle=F(t,"accent-soft"),n.fillRect(le(d)*a,0,(le(c)-le(d))*a,s),n.strokeStyle=F(t,"divider"),n.beginPath(),n.moveTo(0,y),n.lineTo(a,y),n.stroke();const b=Math.floor(u.length/2);for(let g=0;g<b;g++){const p=(g+.5)/b*a,m=Math.max(-1,Math.min(1,u[g*2]??0)),w=Math.max(-1,Math.min(1,u[g*2+1]??0)),k=(g+.5)/b;n.strokeStyle=k>=d&&k<=c?h:f,n.beginPath(),n.moveTo(p,y-w*(y-1)),n.lineTo(p,y-m*(y-1)+.5),n.stroke()}n.strokeStyle=h;for(const g of[d,c,...Array.isArray(e.markers)?e.markers:[]]){const p=Math.round(le(g)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,s),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=F(t,"text"),n.fillRect(Math.round(le(e.position)*(a-1)),0,1,s)),b||(n.fillStyle=f,n.font=o,n.fillText(e.empty??"Empty",0,y+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){const u=le(e.level??0);n.fillStyle=F(t,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=F(t,"accent"),n.fillRect(0,s*.4,a*u,s*.2),t.dataset.ncAccent=n.fillStyle;return}const r=Math.max(1,e.steps??16),l=((e.step??0)%r+r)%r;n.fillStyle=F(t,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=F(t,"rhythm.playhead"),n.fillRect(l/r*a,s*.3,Math.max(1,a/r),s*.4),t.dataset.ncAccent=F(t,"accent")}const Si={slop:8,longPressMs:500,pitchPx:16};class ur{constructor(e,n,a=Si){this.hit=e,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,n,a,s){if(this.phase!=="idle")return!1;const o=this.hit(n,a);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=n,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,n,a,s){if(e!==this.pointer)return;const o=n-this.x0,r=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,n,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,n,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function pr(t,e,n,a=Si){let s=!1,o=0;const r=(d,c)=>{const f=t.ownerDocument.elementFromPoint?.(d,c),y=[...t.querySelectorAll(e)],b=f?y.findIndex(m=>m===f||m.contains(f)):-1;if(b>=0)return b;let g=-1,p=Number.POSITIVE_INFINITY;return y.forEach((m,w)=>{if(m.hidden)return;const k=m.getBoundingClientRect();if(c<k.top||c>k.bottom)return;const S=Math.abs(d-(k.left+k.width/2));S<p&&S<=k.width&&(g=w,p=S)}),g},l=new ur(r,d=>{(d.kind==="paint"||d.kind==="long")&&(s=!0),n(d)},a),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",d=>{d.button>0||(s=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),t.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),t.addEventListener("click",d=>{s&&(s=!1,d.stopPropagation(),d.preventDefault())},!0),t.addEventListener("contextmenu",d=>d.preventDefault()),l}const hr=450,st="application/x-nc-pad",la="http://www.w3.org/2000/svg",mr=48;function fr(t){const e=Math.floor((t?.length??0)/2);if(!e)return"";const n=Math.min(mr,e),a=[],s=[];for(let o=0;o<n;o++){const r=Math.floor(o*e/n),l=Math.max(r+1,Math.floor((o+1)*e/n));let u=0,d=0;for(let h=r;h<l;h++)u=Math.min(u,t[2*h]??0),d=Math.max(d,t[2*h+1]??0);const c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),s.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function gr(t,e){const n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((s,o)=>a.append(br(n,o,e))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&pt(n)}),Ei(n,t),n}function br(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="nc-padgrid-pad-name";const r=document.createElement("span");r.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const u=document.createElementNS(la,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");const d=document.createElementNS(la,"path");return u.append(d),a.append(s,o,r,l,u),wr(t,a,e,n),a.addEventListener("dblclick",()=>{const c=n(t);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&Ti(t,a,e,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(st,String(e)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{const h=c.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(st)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=h.includes(st)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;const h=n(t);if(h?.type!=="padGrid")return;const f=c.dataTransfer?.getData(st);if(f!==void 0&&f!==""){c.preventDefault(),c.stopPropagation();const b=Number(f);b!==e&&h.onMove?.(b,e,c.altKey);return}const y=c.dataTransfer?.files?.[0];y&&(c.preventDefault(),c.stopPropagation(),h.onFile?.(e,y))}),a}function yr(t,e,n){const a=n(t);a?.type==="padGrid"&&a.onPress(e)}function wr(t,e,n,a){let s=0,o=!1,r=0,l=0;const u=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,r=d.clientX,l=d.clientY,u();const c=a(t);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,o=ca(t,e,n,a)},hr)))}),e.addEventListener("pointermove",d=>{s&&Math.hypot(d.clientX-r,d.clientY-l)>8&&u()});for(const d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,u);e.addEventListener("contextmenu",d=>{d.preventDefault(),u(),o=ca(t,e,n,a)}),e.addEventListener("click",()=>{if(o){o=!1;return}yr(t,n,a)})}function ca(t,e,n,a){const s=a(t);if(s?.type!=="padGrid"||!s.menu)return!1;const o=s.menu(n);if(!o.length)return!1;pt(t);const r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),pt(t)}),r.addEventListener("click",c=>c.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const c of o){const h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=c.id,h.textContent=c.label,h.addEventListener("click",()=>{pt(t);const f=a(t);f?.type==="padGrid"&&(c.id==="rename"&&f.onRename?Ti(t,e,n,a):f.onMenu?.(n,c.id))}),l.append(h)}t.append(r,l);const u=t.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Ti(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(t);if(s?.type!=="padGrid")return;const o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=s.nameMax??24,o.value=s.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);const r=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.top-r.top}px`,o.style.width=`${l.width}px`;let u=!1;const d=c=>{if(u)return;u=!0;const h=o.value.trim();o.remove(),e.focus();const f=a(t);c&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(const c of["pointerdown","click","dblclick"])o.addEventListener(c,h=>h.stopPropagation());t.append(o),o.focus(),o.select()}function pt(t){for(const e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Ei(t,e){const n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const o=n[s];if(!(o instanceof HTMLButtonElement))return;const r=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",r&&(r.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,r&&(r.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",fr(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;const c=e.selected===s;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function D(){const t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Mt(t,e){const n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;const a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function da(t,e){const n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Ze(t){if(!Number.isFinite(t))return"";const e=Math.round(t*100)/100;return String(e)}const vr=450,ua=8;function ie(){const t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function kr(t){const e=Xo(t,"target-min");return e>0?e:44}function $r(t){if(!(t instanceof HTMLElement))return;const e=[...t.querySelectorAll(".nc-hit")],n=kr(t),a=n/2,s=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){const r=e[o],l=s[o];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}const u=l.left+l.width/2,d=l.top+l.height/2;let c=u-a,h=u+a,f=d-a,y=d+a;for(let b=0;b<e.length;b++){if(o===b)continue;const g=s[b];if(!g||g.width===0)continue;const p=g.left+g.width/2,m=g.top+g.height/2;Math.abs(m-d)<a*2&&(p>u?h=Math.min(h,(u+p)/2):p<u&&(c=Math.max(c,(u+p)/2))),Math.abs(p-u)<a*2&&(m>d?y=Math.min(y,(d+m)/2):m<d&&(f=Math.max(f,(d+m)/2)))}c=Math.min(c,l.left),h=Math.max(h,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),r.style.left=`${c-l.left}px`,r.style.top=`${f-l.top}px`,r.style.width=`${Math.max(0,h-c)}px`,r.style.height=`${Math.max(0,y-f)}px`,r.style.transform="none"}}function Ai(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function pa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function wt(t,e){switch(t.type){case"slider":return xr(t,e);case"select":return Tr(t,e);case"toggle":return Er(t,e);case"button":return Ar(t,e);case"readout":return Mr(t);case"label":return Pr(t);case"note":return ha(t);case"knob":return Rr(t,e);case"choice":return Ir(t,e);case"slotRow":return Or(t,e);case"stepGrid":return Fr(t,e);case"canvas":return Ur(t);case"fx":return Vr(t,e);case"strip":return Gr(t,e);case"stripAdd":return Kr(t,e);case"padGrid":return gr(t,e);case"moves":return Cr(t,e);default:return ha({id:"unknown",text:""})}}function pe(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){const n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Li(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));const s=t.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??Ze(e.value))}else if(e.type==="select"){const n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),da(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){const n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")da(t,e.text);else if(e.type==="knob"){const n=t.querySelector(".nc-knob");n instanceof HTMLElement&&zr(n,e);const a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Ze(e.value))}else if(e.type==="choice")Ci(t,e);else if(e.type==="slotRow")Pi(t,e);else if(e.type==="stepGrid")en(t,e);else if(e.type==="padGrid")Ei(t,e);else if(e.type==="moves")Mi(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){const n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&xi(n,e)}else if(e.type==="strip"){Ii(t,e);for(const n of e.sends??[]){const a=t.querySelector(`[data-nc-id="${tn(n.id)}"]`);a instanceof Element&&pe(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")_i(t,e);else if(e.type==="fx"){Oi(t,e);for(const n of[...e.controls,...e.more??[]]){const a=t.querySelector(`[data-nc-id="${tn(n.id)}"]`);a instanceof Element&&pe(a,n)}}}}function xr(t,e){const n=Mt(t.id,t.label);n.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{const o=e(a);o?.type==="slider"&&o.onChange(Number(a.value))}),a.addEventListener("change",()=>{const o=e(a);o?.type==="slider"&&o.onCommit?.(Number(a.value))});const s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(Sr(t,a,e),s),n.append(D()),pe(n,t),n}function Sr(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ie());const s=o=>{const r=n(e);r?.type==="slider"&&r.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&s(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),s(o.timeStamp))}),a}function Tr(t,e){const n=Mt(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(const s of t.options){const o=document.createElement("option");o.value=s.value,o.textContent=s.label,a.append(o)}return a.value=t.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),n.append(a,D()),n}function Er(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{const a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(D()),pe(n,t),n}function Ar(t,e){const n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{const o=e(n);o?.type==="button"&&o.onPress()}),n.append(D()),pe(n,t),!t.onSparkle)return n;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=t.id,s.setAttribute("aria-label","Surprise me"),s.title=t.sparkleTitle??"Surprise me",s.innerHTML=Ai(),s.addEventListener("click",()=>{const o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&zi(o);const r=e(n);r?.type==="button"&&r.onSparkle?.()}),a.append(n,s),a}function Mr(t){const e=Mt(t.id,t.label);return e.append(D()),pe(e,t),e}const Lr=450;function Cr(t,e){const n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(const a of t.groups){const s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);const o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;const r=document.createElement("div");r.className="nc-moves-btns";for(const l of a.moves){const u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Nr(l.icon)),u.addEventListener("click",()=>{const d=e(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(u)}s.append(o,r),n.append(s)}return Mi(n,t),n}function Mi(t,e){for(const n of e.groups)for(const a of n.moves){const s=t.querySelector(`[data-nc-move="${tn(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function Nr(t){const e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){const a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){const a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Pr(t){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(D()),e}function ha(t){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(D()),e}function ma(t){if(typeof t.valueText=="string")return t.valueText;const e=Ze(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Li(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function zr(t,e){const n=e.max-e.min||1,a=(e.value-e.min)/n;Li(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(a*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",ma(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${ma(e)}`}function _r(t,e){const n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,s=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-s:null}function Rr(t,e){const n=Mt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let o=0,r=0;a.addEventListener("pointerdown",u=>{o=u.clientY;const d=e(a);r=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(u.pointerId)}),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;const d=e(a);if(d?.type!=="knob")return;const c=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,r-(u.clientY-o)*c/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{const u=e(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{const d=e(a);if(d?.type!=="knob")return;const c=_r(d,u);c!==null&&(u.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,c))))});const l=n.querySelector("[data-nc-readout]");return n.insertBefore(a,l),n.append(D()),pe(n,t),n}function Ir(t,e){const n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(const a of t.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const o=e(n);o?.type==="choice"&&o.onChange(a.value)}),s.addEventListener("keydown",o=>{const r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(s);let u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+r.length)%r.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=r.length-1;else return;const d=r[u];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(s)}return n.append(D()),Ci(n,t),n}function Ci(t,e){for(const n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;const a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Or(t,e){const n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<t.slots.length;c++){const h=t.slots[c],f=document.createElement("span");f.className="nc-snap-wrap";const y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(c),y.textContent=h.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,ie()),jr(f,y,n,c,e),a.append(f)}const s=t.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Ai(),s.append(ie()),s.addEventListener("click",()=>{zi(n);const c=e(n);c?.type==="slotRow"&&c.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const c=e(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(r,u,l);const d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...s?[s]:[]),n.append(d,o,D()),Ni(n,e),Pi(n,t),n}function fa(t,e,n,a){const s=n(t);if(s?.type!=="slotRow")return;Ke(t);const o=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,o)}function jr(t,e,n,a,s){let o=0,r=0,l=0,u=!1,d=!1,c=!1,h=!1;const f=()=>{window.clearTimeout(o),o=0},y=m=>{const w=m.clientX-r,k=m.clientY-l;w*w+k*k>ua*ua&&(u=!0,f())},b=()=>{h&&(h=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",p))},g=m=>{const w=o!==0&&!u&&!d;f(),b(),w&&(c=!0,fa(n,a,s,m))},p=()=>{u=!0,f(),b()};t.addEventListener("pointerdown",m=>{m.button===0&&(b(),d=!1,u=!1,c=!1,r=m.clientX,l=m.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(d=!0,Hr(n,e,a,s))},vr),h=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(c||d||u){c=!1,d=!1,u=!1;return}fa(n,a,s,m)})}function Ni(t,e){if(t.querySelector(".nc-slot-menu"))return;const n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");const a=ga("Save","store"),s=ga("Clear","clear");n.append(a,s);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Ke(t)}),o.addEventListener("click",r=>r.stopPropagation()),t.append(o,n),n.addEventListener("click",r=>{const l=r.target;if(!(l instanceof HTMLButtonElement))return;const u=e(t);if(u?.type!=="slotRow")return;const d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),Ke(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),Ke(t))}),t.addEventListener("keydown",r=>{r.key==="Escape"&&Ke(t)})}function ga(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Hr(t,e,n,a){Ni(t,a);const s=t.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);const r=t.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.bottom-r.top}px`,s.querySelector("button")?.focus()}function Ke(t){const e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Pi(t,e){for(const s of t.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const o=Number(s.dataset.ncSlot),r=e.slots[o];if(!r)continue;s.textContent=r.label,r.filled?s.dataset.filled="true":delete s.dataset.filled,r.active?s.dataset.active="true":delete s.dataset.active,r.edited?s.dataset.edited="true":delete s.dataset.edited,r.queued?s.dataset.queued="true":delete s.dataset.queued,r.queued&&r.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}const n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));const a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function zi(t){const e=t.dataset.ncLastFill||null,n=jo(e);t.dataset.ncLastFill=n;const a=Ho(n);if(a)for(const[s,o]of Object.entries(a))t.style.setProperty(s,o)}function Br(t,e){const n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1;const s=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");const r=e(t);r?.type==="stepGrid"&&r.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),s(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>s(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||s(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),s(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Fr(t,e){const n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=p=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,a.append(m),m},o=s("Note"),r=s("Accent");r.dataset.ncAccentMode="";const l=p=>{for(const m of[o,r]){const w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(o);for(const p of[o,r])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();const m=r.getAttribute("aria-checked")==="true"?o:r;l(m),m.focus()});const u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),t.onFill&&u.append(Br(n,e)),t.onClear){const p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=t.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),u.append(p)}n.append(u);for(const p of t.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1));let k=!1,S=0;w.addEventListener("pointerdown",x=>{k=!1,!(x.pointerType==="mouse"||x.button!==0)&&(S=window.setTimeout(()=>{const E=e(n);E?.type!=="stepGrid"||!E.selectedRows||(k=!0,E.onSelectRow?.(E.rows.findIndex(C=>C.id===p.id),!0))},Lr))});for(const x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(S));w.addEventListener("contextmenu",x=>{k&&x.preventDefault()}),w.addEventListener("click",x=>{const E=e(n);if(E?.type!=="stepGrid")return;if(k){k=!1;return}const C=E.rows.findIndex(U=>U.id===p.id),H=!!E.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);E.onSelectRow?.(C,H)}),w.addEventListener("keydown",x=>qr(n,w,x));const $=[];for(const x of["mute","solo"]){if(!(x==="mute"?t.onMute:t.onSolo))continue;const C=document.createElement("span");C.className="nc-ms-wrap";const H=document.createElement("button");H.type="button",H.className="nc-ms",H.dataset.ncMs=x,H.textContent=x==="mute"?"M":"S",H.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${p.label}`),C.append(H,ie()),C.addEventListener("click",()=>{const U=e(n);if(U?.type!=="stepGrid")return;const re=U.rows.findIndex(P=>P.id===p.id);(x==="mute"?U.onMute:U.onSolo)?.(re)}),$.push(C)}const T=document.createElement("div");T.className="nc-steps";for(let x=0;x<p.steps.length;x++){const E=document.createElement("span");E.className="nc-step-wrap";const C=document.createElement("button");C.type="button",C.className="nc-step",C.dataset.ncStep=`${p.id}:${x}`,C.setAttribute("aria-label",`${p.label} step ${x+1}`),E.append(C,ie()),E.addEventListener("click",H=>{const U=e(n);if(U?.type!=="stepGrid")return;const re=U.rows.findIndex(nt=>nt.id===p.id),P=r.getAttribute("aria-checked")==="true";U.onToggle(re,x,H.shiftKey||P)}),T.append(E)}if(t.onLength&&T.append(Dr(n,T,p,e)),m.append(...$,w,T),t.onDice){const x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=p.id,x.setAttribute("aria-label",`Re-roll ${p.label}`),x.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=pa(),x.append(ie()),x.addEventListener("click",()=>{const E=e(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(C=>C.id===p.id))}),m.append(x)}m.addEventListener("click",x=>{if(x.target!==m)return;const E=e(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(C=>C.id===p.id))}),ba(n,T,".nc-step-wrap",e,r,()=>p.id),n.append(m)}const d=document.createElement("div");d.className="nc-pads-head";const c=(p,m,w)=>{const k=document.createElement("button");return k.type="button",k.className=p,k.textContent=m,w&&k.setAttribute("aria-label",w),k},h=c("nc-pads-step","‹","Previous lane"),f=c("nc-pads-step","›","Next lane"),y=document.createElement(t.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),t.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{const p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",en(n,p))}));for(const[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{const w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;const k=w.rows.length;w.onSelectRow?.(((ot(w)+m)%k+k)%k)});if(d.append(h,y,f),t.onDice){const p=c("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=pa(),p.addEventListener("click",()=>{const m=e(n);if(m?.type!=="stepGrid")return;const w=ot(m);w>=0&&m.onDice?.(w)}),d.append(p)}if(t.transport){const p=c("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(p)}n.append(d);const b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");const g=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<g;p++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{const k=e(n);if(k?.type!=="stepGrid")return;const S=ot(k);if(S<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(S,p+1);return}const $=r.getAttribute("aria-checked")==="true";k.onToggle(S,p,w.shiftKey||$)}),b.append(m)}return ba(n,b,".nc-pad",e,r,()=>{const p=e(n);return p?.type==="stepGrid"?p.rows[ot(p)]?.id:void 0}),n.append(b),n.append(D()),en(n,t),n}function ot(t){const e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function ba(t,e,n,a,s,o){let r="on",l=!0,u=-1;const d=(c,h)=>{const f=c.rows[u]?.steps[h];!f||h>=c.rows[u].length||(c.onSet?c.onSet(u,h,r,l):!!f[r]!==l&&c.onToggle(u,h,r==="accent"))};pr(e,n,c=>{const h=a(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(c.kind!=="paint")return;const f=h.rows.findIndex(y=>y.id===o());f>=0&&h.rows[f].length!==c.pad+1&&h.onLength?.(f,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){const f=o();u=h.rows.findIndex(b=>b.id===f);const y=h.rows[u]?.steps[c.pad];if(!y)return;r=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[r]}d(h,c.pad)}else if(c.kind==="long"){const f=o(),y=h.rows.findIndex(g=>g.id===f),b=e.querySelectorAll(n)[c.pad];y>=0&&b instanceof HTMLElement&&h.onLongPress?.(y,c.pad,b)}}})}function qr(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;const a=[...t.querySelectorAll(".nc-name")],s=a.indexOf(e);let o=s;n.key==="ArrowDown"?o=s+1:n.key==="ArrowUp"?o=s-1:n.key==="Home"?o=0:o=a.length-1;const r=a[o];!(r instanceof HTMLElement)||r===e||(n.preventDefault(),r.focus(),r.click())}function Dr(t,e,n,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(ie());const o=d=>{const c=a(t);if(c?.type!=="stepGrid")return;const h=c.rows.findIndex(b=>b.id===n.id),f=c.rows[h];if(!f)return;const y=Math.max(1,Math.min(f.steps.length,d));y!==f.length&&c.onLength?.(h,y)},r=d=>{const c=[...e.querySelectorAll(".nc-step")];let h=1;return c.forEach((f,y)=>{const b=f.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(h=y+1)}),h},l=d=>o(r(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete s.dataset.dragging};return s.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),s.addEventListener("keydown",d=>{const c=a(t);if(c?.type!=="stepGrid")return;const h=c.rows.find(y=>y.id===n.id);if(!h)return;const f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in f&&(d.preventDefault(),o(f[d.key]))}),s}const Bt=new WeakMap;function ya(t,e){const n=typeof e=="number"?e:null;if(!(Bt.has(t)&&Bt.get(t)===n)){if(Bt.set(t,n),n===null){for(const a of Object.keys(sa(1)))t.style.removeProperty(a);return}for(const[a,s]of Object.entries(sa(n)))t.style.setProperty(a,s)}}function en(t,e){const n=e.rows.some(c=>c.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=t.querySelector(".nc-pads"),o=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&o&&(r.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));const u=t.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);const d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,h=e.transport?.label??(c?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",c?"true":"false");const f=e.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(s instanceof HTMLElement&&o){s.setAttribute("aria-label",`${o.label} steps`),o.lane&&(s.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?s.dataset.silent="true":delete s.dataset.silent;const c=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(const h of s.querySelectorAll("[data-nc-pad]")){const f=Number(h.getAttribute("data-nc-pad")),y=o.steps[f];h instanceof HTMLButtonElement&&(h.hidden=!y||!l&&f>=o.length,l&&f>=o.length?h.dataset.out="true":delete h.dataset.out,l&&f===o.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${o.label} step ${f+1}`),h.setAttribute("aria-pressed",y?.on?"true":"false"),y?.accent?h.dataset.accent="true":delete h.dataset.accent,y?.dim?h.dataset.dim="true":delete h.dataset.dim,ya(h,y?.velocity),e.playhead>=0&&f===c?h.dataset.playhead="true":delete h.dataset.playhead)}}for(const c of e.rows){for(let b=0;b<c.steps.length;b++){const g=c.steps[b],p=t.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(p instanceof HTMLButtonElement))continue;const m=p.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===c.id?m.dataset.selected="true":delete m.dataset.selected;const S=e.selectedRow!==c.id&&(e.selectedRows??[]).includes(c.id);S?m.dataset.picked="true":delete m.dataset.picked;const $=m.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===c.id||S?"true":"false"),$.textContent!==c.label&&($.textContent=c.label,$.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?m.dataset.silent="true":delete m.dataset.silent;for(const x of m.querySelectorAll("[data-nc-ms]")){const E=x.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;x.setAttribute("aria-pressed",E?"true":"false")}}p.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?p.dataset.accent="true":delete p.dataset.accent,g.dim?p.dataset.dim="true":delete p.dataset.dim,b%4===0?p.dataset.bar="true":delete p.dataset.bar,typeof g.velocity=="number"?(p.dataset.velocity="true",p.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete p.dataset.velocity,p.style.removeProperty("--level")),ya(p,g.velocity);const w=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;b===w?p.dataset.playhead="true":delete p.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;p.hidden=b>=c.length&&!k,b>=c.length&&k?p.dataset.out="true":delete p.dataset.out}const h=t.querySelector(`[data-nc-len="${c.id}"]`),y=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&y&&y.nextElementSibling!==h){const b=document.activeElement===h;y.after(h),b&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(c.length)),h.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),h.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Ur(t){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;const n=document.createElement("span");n.className="nc-label",n.textContent=t.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,D()),e}function Gr(t,e){const n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",a.append(s),t.onRemove){const b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{const g=e(n);g?.type==="strip"&&g.onRemove?.(b)}),a.append(b)}const o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){const b=document.createElement("span");b.className="nc-hacks-wrap";const g=document.createElement("button");g.type="button",g.className="nc-hacks",g.dataset.ncHacks="",b.append(g,ie()),b.addEventListener("click",()=>{const p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(b)}const r=document.createElement("div");r.className="nc-strip-ms";for(const b of["mute","solo"]){if(!(b==="mute"?t.onMute:t.onSolo))continue;const p=document.createElement("span");p.className="nc-ms-wrap";const m=document.createElement("button");m.type="button",m.className="nc-ms",m.dataset.ncMs=b,m.textContent=b==="mute"?"M":"S",p.append(m,ie()),p.addEventListener("click",()=>{const w=e(n);w?.type==="strip"&&(b==="mute"?w.onMute:w.onSolo)?.()}),r.append(p)}const l=document.createElement("div");l.className="nc-strip-sends";for(const b of t.sends??[])l.append(wt({...b,type:"knob",compact:!0},e));const u=document.createElement("div");u.className="nc-strip-body";const d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(const b of t.ticks??[]){const g=document.createElement("span");g.className="nc-scale-tick",g.style.setProperty("--tick-pos",String(b.value)),g.textContent=b.label,d.append(g)}const c=nr({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:b=>{const g=e(n);g?.type==="strip"&&g.onChange(b)},onReset:()=>{const b=e(n);b?.type==="strip"&&va(b)}}),h=lr({channels:t.channels===2?2:1,label:t.label,onClear:()=>{const b=e(n);b?.type==="strip"&&b.onClipClear?.()}});u.append(d,c.el,h.el);const f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",b=>{const g=e(n);g?.type!=="strip"||!g.onTypeIn||(window.clearTimeout(y),b.detail===0?wa(n,f,e):b.detail===1&&(y=window.setTimeout(()=>wa(n,f,e),Wr)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);const b=e(n);b?.type==="strip"&&va(b)}),n.append(a,o,r,l,u,f,D()),Ii(n,t),n}const Wr=250;function wa(t,e,n){const a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??Ze(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let o=!1;const r=l=>{if(o)return;o=!0;const u=s.value;if(s.remove(),e.hidden=!1,l){const d=n(t);d?.type==="strip"&&d.onTypeIn?.(u)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),s.addEventListener("blur",()=>r(!1))}function Kr(t,e){const n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const o=document.createElement("span");o.className="nc-strip-add-label",a.append(s,o);const r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{const l=e(n),u=r.value;Ri(r),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,r,D()),_i(n,t),n}function _i(t,e){const n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);const a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==r&&(a.replaceChildren(...s.map(l=>{const u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Ri(a))}function Ri(t){const e=t.options[0];e&&(e.selected=!0)}function va(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ii(t,e){const n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);const a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);const s=t.querySelector(".nc-fader"),o=s?ar(s):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),cr(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const r=t.querySelector(".nc-strip-db");if(r instanceof HTMLElement){const u=e.valueText??Ze(e.value);r.textContent!==u&&(r.textContent=u),r.setAttribute("aria-label",`${e.label} level ${u}`);const d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";r.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(const u of t.querySelectorAll("[data-nc-ms]")){const d=u.getAttribute("data-nc-ms"),c=d==="mute"?e.mute===!0:e.solo===!0;u.setAttribute("aria-pressed",c?"true":"false"),u.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}const l=t.querySelector("[data-nc-hacks]");if(l){const u=e.hacksLabel??"Hacks";l.textContent!==u&&(l.textContent=u),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${u}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function Vr(t,e){const n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);const a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title,t.on===void 0)n.append(a);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const o=vi({checked:t.on,labelledBy:a.id,onChange:r=>{const l=e(o.el);l?.type==="fx"&&l.onToggle?.(r)}});o.el.dataset.ncFxSwitch="",s.append(a,o.el),n.append(s)}for(const s of t.controls)n.append(wt(s,e));if(t.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const o=document.createElement("summary");o.textContent=t.moreLabel??"More",s.append(o);for(const r of t.more)s.append(wt(r,e));n.append(s)}return n.append(D()),Oi(n,t),n}function Oi(t,e){const n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);const a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function tn(t){return t.replace(/["\\]/g,"\\$&")}function Yr(t,e){for(const n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&xi(n,a)}$r(t)}const Xr=ue["toast-duration"];function Jr({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function Qr(t,e,n,a){const s=l=>({top:l,bottom:l+n}),o=l=>t.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),r=s(e-a-n);return o(r)?o(s(a))?"bottom":"top":"bottom"}function ji(t,e,n,a,s,o){let r=t.bottom+s;const l=Math.max(o,Math.min(t.left,a-o-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(const c of e)c&&c.bottom>r&&c.top<r+n.height&&c.right>l&&c.left<l+n.width&&(r=c.bottom+s,u=!0)}return{top:r,left:l}}const ka="data-nc-ui-toast-live";function Zr(t,e){let n=e.querySelector(`[${ka}]`);return n||(n=t.createElement("div"),n.setAttribute(ka,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function el({message:t,actionLabel:e,onAction:n,duration:a=Xr,onClose:s,avoid:o=[],anchor:r,host:l,document:u=globalThis.document}={}){l=l??u.body;const d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");const h=u.createElement("span");h.className="nc-ui-toast-message",h.textContent=t,c.appendChild(h);let f=null;e&&(f=u.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,c.appendChild(f)),l.appendChild(c);let y="open";const b=W=>W&&typeof W.getBoundingClientRect=="function"?W.getBoundingClientRect():null,g=b(c),p=g?.height||44,m=d.getComputedStyle?.(c),w=Number.parseFloat(m?.getPropertyValue(I("toast-offset")))||16,k=Number.parseFloat(m?.getPropertyValue(I("toast-anchor-gap")))||8,S=b(r),$=d.innerHeight??0,T=o.map(b).filter(Boolean),x=S&&S.bottom>0&&S.top<$?ji(S,T,{width:g?.width||0,height:p},d.innerWidth??0,k,w):null;x&&x.top+p<=$?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(d.scrollY??0)}px`,c.style.left=`${x.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",Qr(T,$,p,w));const E=d.requestAnimationFrame?.bind(d)??(W=>setTimeout(W,16));E(()=>E(()=>{y==="open"&&c.setAttribute("data-state","open")})),Zr(u,l).textContent=Jr({message:t,actionLabel:e});let C,H;const U=new Promise(W=>{H=W}),re=W=>{clearTimeout(C),C=setTimeout(()=>Rt("timeout"),W)};let P=a,nt=Date.now();const Fn=()=>{y==="open"&&(clearTimeout(C),P=Math.max(0,P-(Date.now()-nt)))},qn=()=>{y==="open"&&(nt=Date.now(),re(P))};c.addEventListener("pointerenter",Fn),c.addEventListener("pointerleave",qn),c.addEventListener("focusin",Fn),c.addEventListener("focusout",qn),f?.addEventListener("click",()=>{if(y==="open")try{n?.()}finally{Rt("action")}}),Number.isFinite(a)&&re(a);function Rt(W="close"){if(y!=="open")return;y="closing",clearTimeout(C),c.setAttribute("data-state","closing"),s?.(W);const Dn=d.getComputedStyle?.(c),bs=Dn?Math.max(0,...String(Dn.transitionDuration||"").split(",").map(Gn=>Number.parseFloat(Gn)*(Gn.trim().endsWith("ms")?1:1e3)||0)):0,Un=()=>{y!=="gone"&&(y="gone",c.remove(),H(W))};c.addEventListener("transitionend",Un),setTimeout(Un,bs+50)}return{el:c,close:Rt,closed:U}}function $a(t){return`${Math.round(Math.min(1,Math.max(0,Number(t)||0))*100)}%`}function tl({anchor:t,title:e,velocity:n,probability:a,onChange:s,onClose:o,host:r,document:l=globalThis.document}){r=r??l.body;const u=l.defaultView??globalThis,d={velocity:n,probability:a},c=l.createElement("div");c.className="nc-slot-scrim nc-step-editor-scrim";const h=l.createElement("div");h.className="nc-step-editor",h.setAttribute("role","dialog"),h.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const y=l.createElement("span");y.className="nc-label",y.textContent=e;const b=l.createElement("button");b.type="button",b.className="nc-step-editor-done",b.textContent="Done",f.append(y,b),h.appendChild(f);const g=[];for(const[S,$]of[["velocity","Velocity"],["probability","Chance"]]){const T=l.createElement("label");T.className="nc-step-editor-row";const x=l.createElement("span");x.className="nc-label",x.textContent=$;const E=l.createElement("input");E.type="range",E.className="nc-range",E.min=S==="velocity"?"0.05":"0",E.max="1",E.step="0.05",E.value=String(d[S]),E.setAttribute("data-nc-edit",S);const C=l.createElement("output");C.className="nc-readout",C.textContent=$a(d[S]),E.setAttribute("aria-valuetext",C.textContent),E.addEventListener("input",()=>{d[S]=Number(E.value),C.textContent=$a(d[S]),E.setAttribute("aria-valuetext",C.textContent),s({velocity:d.velocity,probability:d.probability})}),T.append(x,E,C),h.appendChild(T),g.push(E)}if(r.append(c,h),t?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${Po.breakpoint.md})`).matches??!1)h.setAttribute("data-placement","sheet"),c.setAttribute("data-placement","sheet");else{const S=t?.getBoundingClientRect?.(),$=h.getBoundingClientRect(),T=Number.parseFloat(u.getComputedStyle(h).getPropertyValue("row-gap"))||8;if(S){let{top:x,left:E}=ji(S,[],{width:$.width,height:$.height},u.innerWidth,T,T);x+$.height>u.innerHeight&&(x=Math.max(T,S.top-T-$.height)),h.style.top=`${x}px`,h.style.left=`${E}px`}h.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let m=!0;const w=S=>{S.key==="Escape"&&(S.preventDefault(),k())};function k(){m&&(m=!1,l.removeEventListener("keydown",w,!0),c.remove(),h.remove(),t?.removeAttribute?.("data-editing"),t?.isConnected&&typeof t.focus=="function"&&t.focus({preventScroll:!0}),o?.())}return l.addEventListener("keydown",w,!0),c.addEventListener("pointerdown",S=>{S.preventDefault(),k()}),b.addEventListener("click",k),{el:h,close:k}}const Ye="data-nc-help",nl=350;function al(t,e,n,a=0,s=6,o=8){const r=t.top-s-e.height,l=r>=a+o?"above":"below",u=l==="above"?r:t.bottom+s,d=Math.max(o,Math.min(t.left,n-o-e.width));return{top:Math.round(u),left:Math.round(d),side:l}}const Ft=new WeakMap;function il(t){const e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function sl({document:t=globalThis.document,delay:e=nl}={}){if(!t)return{uninstall(){},hide(){}};const n=Ft.get(t);if(n)return n;const a=t.defaultView;let s=null,o=null,r;const l=()=>{clearTimeout(r),o=null,s&&(s.hidden=!0)},u=f=>{const y=f.getAttribute(Ye);if(!y)return;s||(s=t.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",t.body.appendChild(s)),s.textContent=y,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";const b=f.getBoundingClientRect(),g=al(b,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,il(t));s.style.top=`${g.top}px`,s.style.left=`${g.left}px`,s.dataset.side=g.side,s.style.visibility=""},d=f=>{if(f.pointerType==="touch")return;const y=f.target&&f.target.closest?f.target.closest(`[${Ye}]`):null;y!==o&&(l(),y&&(o=y,r=setTimeout(()=>{o===y&&y.isConnected&&u(y)},e)))},c=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",d),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);const h={hide:l,uninstall(){l(),t.removeEventListener("pointerover",d),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),s?.remove(),s=null,Ft.delete(t)}};return Ft.set(t,h),h}const $n="netcomposer.rhythm.hidden.v1",ce=new WeakMap;function qt(){try{return globalThis.localStorage??null}catch{return null}}function Hi(t,e=$n){try{const n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function xa(t,e,n,a=$n){const s=Hi(t,a);n?s.add(e):s.delete(e);try{t?.setItem(a,JSON.stringify([...s]))}catch{}}function xn(t){const e=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)],n=[];for(const a of e)n.push(a),a.type==="fx"&&n.push(...a.controls,...a.more??[]),a.type==="strip"&&n.push(...(a.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return n}function ol(t,e){if(!(!t||!e))return xn(t).find(n=>n.id===e)}function rl(t){return`${`${t.layout??""}:${(t.sections??[]).map(n=>`${n.id}${n.panel?":panel":""}${n.area?`@${n.area}`:""}`).join(",")}`}#${xn(t).map(n=>n.type==="stepGrid"?`stepGrid:${n.id}:${n.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${n.onMute?":m":""}${n.onSolo?":s":""}`:n.type==="moves"?`moves:${n.id}:${n.groups.map(a=>`${a.id}=${a.moves.map(s=>s.id).join("+")}`).join(",")}`:n.type==="padGrid"?`padGrid:${n.id}:${n.pads.length}:${n.columns??2}`:n.type==="slotRow"?`slotRow:${n.id}:${n.slots.length}${n.onSparkle?":spark":""}`:n.type==="button"?`button:${n.id}${n.onSparkle?":spark":""}`:n.type==="select"?`select:${n.id}:${n.options.map(a=>a.value).join(",")}`:n.type==="strip"?`strip:${n.id}:${n.channels??1}:${n.master?"master":""}:${n.onMute?"m":""}${n.onSolo?"s":""}${n.onRemove?"x":""}${n.onHacks?"h":""}:${(n.sends??[]).map(a=>a.id).join(",")}:${(n.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:n.type==="fx"?`fx:${n.id}:${n.depth}:${n.on===void 0?"":"sw"}:${n.controls.map(a=>a.id).join(",")}/${(n.more??[]).map(a=>a.id).join(",")}`:`${n.type}:${n.id}`).join("|")}`}function ll(t,e){if(!e.title)return;if(!e.panel){const o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}const n=document.createElement("div");n.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),t.append(n),Bi(t,e)}function Bi(t,e){if(!e.panel)return;const n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function cl(t){const e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const n=ce.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ol(n,a)}function dl(t,e){const n=e.sections??[{id:"main",controls:e.controls??[]}],a=rl(e);if(t.dataset.ncSignature===a){for(const s of n){const o=t.querySelector(`[data-nc-section="${Sa(s.id)}"]`);o&&Bi(o,s);for(const r of s.controls){const l=t.querySelector(`[data-nc-id="${Sa(r.id)}"]`);l instanceof Element&&pe(l,r)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(const s of n){const o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=s.id,s.inset&&(o.dataset.ncInset="true"),s.area&&(o.dataset.ncArea=s.area),s.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",s.label)),s.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),s.title&&o.setAttribute("aria-label",s.title)),ll(o,s);const r=s.panel?document.createElement("div"):o;s.panel&&(r.className="nc-panel-body",o.append(r));for(const l of s.controls)r.append(wt(l,cl));t.append(o)}}function Sa(t){return t.replace(/["\\]/g,"\\$&")}function Sn(t,e=$n){wi();const n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");const a=Hi(qt(),e).has(t.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";const d=vi({labelledBy:o.id,onChange:m=>(ce.get(n)??t).onToggle?.(m)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,u);const c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",s.append(o,c,r);const h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;const f=document.createElement("button");f.type="button",f.className="nc-slim";const y=document.createElement("span");y.className="nc-slim-lines",f.append(y);const b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,s,h,f),n.setAttribute("aria-labelledby",o.id);const g=m=>{const w=ce.get(n)??t;n.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${w.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{const m=n.dataset.ncOpen==="true";xa(qt(),(ce.get(n)??t).id,m,e),g(m),nn(n.parentElement)}),f.addEventListener("click",()=>{xa(qt(),(ce.get(n)??t).id,!1,e),g(!1),nn(n.parentElement)});const p={el:n,update(m){ce.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=m.title,c.textContent=m.status??"",m.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),y.textContent=m.summary??m.title,d.el.hidden=m.on===void 0,d.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),dl(h,m),g(h.hidden),p.redraw()},redraw(){const m=ce.get(n);m&&Yr(n,xn(m))}};return ce.set(n,t),g(a),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function ul(t,e,n="adjacent"){wi(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();const a=n==="stack"?"stack":"adjacent";e.forEach((s,o)=>{const r=o%4+1;s.el.dataset.ncShade=String(r),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),t.append(s.el),s.redraw()}),nn(t)}function nn(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}const e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),a=e.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&s.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function Fi(){return new Promise(t=>{if(typeof requestAnimationFrame!="function"){setTimeout(t,0);return}requestAnimationFrame(()=>setTimeout(t,0))})}function pl(t=200){return new Promise(e=>{const n=globalThis.requestIdleCallback;typeof n=="function"?n(()=>e(),{timeout:t}):setTimeout(e,0)})}function hl(t,e={}){const n=new Set,a=(async()=>{await Fi();for(const s of t)await pl(e.timeoutMs??200),s.build(),n.add(s)})();return{ready:s=>n.has(s),done:a,toJSON:()=>({built:n.size,total:t.length})}}function Tn(){const t=globalThis.scheduler;return typeof t?.yield=="function"?t.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const n=new MessageChannel;n.port1.onmessage=()=>{n.port1.close(),e()},n.port2.postMessage(null)})}const ml="modulepreload",fl=function(t){return"/rhythm/"+t},Ta={},gl=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");s=r(n.map(d=>{if(d=fl(d),d in Ta)return;Ta[d]=!0;const c=d.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":ml,c||(f.as="script"),f.crossOrigin="",f.href=d,u&&f.setAttribute("nonce",u),document.head.appendChild(f),c)return new Promise((y,b)=>{f.addEventListener("load",y),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return s.then(r=>{for(const l of r||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var bl=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],an=[.25,.5,.75,1,1.5,2],yl=4.9,R={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},ge={fmt:"wet"},X={fmt:"pct"},Ee={fmt:"db"},rt={fmt:"signedPct"},Dt={fmt:"num",suffix:" ms"},_={div:100};function A(t,e,n,a,s,o,r,l){var u={key:t,label:e,min:n,max:a,default:s,step:1,k:o,unit:null,format:r};if(l)for(var d in l)u[d]=l[d];return u}function lt(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Xe=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:R.hpQ},{dsp:{law:R.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:R.bpHz,astrid:!0},{dsp:{law:R.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:R.bpQ},{dsp:{law:R.bpQ}}),A("mix","Mix",0,100,100,3,ge,{dsp:_,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:lt(bl),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,X,{dsp:_,unit:"%"}),A("mix","Wet/dry",0,100,0,3,ge,{dsp:_,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:R.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:lt([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,X,{dsp:_,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,rt,{dsp:_,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,Dt,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:_,unit:"%"}),A("decay","Decay",0,100,50,3,X,{dsp:_,unit:"%"}),A("damping","Damping",0,100,0,4,X,{dsp:_,unit:"%"}),A("mix","Mix",0,100,0,5,ge,{dsp:_,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,70,2,X,{dsp:_,unit:"%"}),A("feedback","Feedback",-90,90,50,3,rt,{dsp:_,unit:"%"}),A("mix","Mix",0,100,50,4,ge,{dsp:_,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,50,2,X,{dsp:_,unit:"%"}),A("spread","Spread",0,100,70,3,X,{dsp:_,unit:"%"}),A("mix","Mix",0,100,40,4,ge,{dsp:_,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),A("depth","Depth",0,100,70,2,X,{dsp:_,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:lt([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,X,{dsp:_,unit:"%"}),A("mix","Mix",0,100,50,5,ge,{dsp:_,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,Ee,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,Ee,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:R.midHz,astrid:!0},{dsp:{law:R.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:R.eqQ},{dsp:{law:R.eqQ}}),A("high_db","High",-18,18,0,4,Ee,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,Ee,{unit:"dB"}),A("mix","Mix",0,100,100,3,ge,{dsp:_,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:lt([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:R.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,rt,{dsp:_,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,rt,{dsp:_,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,Ee,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:R.ratio},{dsp:{law:R.ratio}}),A("attack_ms","Attack",1,100,10,3,Dt,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,Dt,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,Ee,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,X,{dsp:_,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:_})]}],wl=Xe.map(function(t){return t.type});Xe.filter(function(t){return!t.hidden}).map(function(t){return t.type});var vl={reverb:"plate"};function En(t){var e=vl[t]||t;return wl.indexOf(e)>=0?e:null}function oe(t){for(var e=En(t),n=0;n<Xe.length;n++)if(Xe[n].type===e)return Xe[n];return null}function Pe(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function qi(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Pe(n.law,e);return a===null?0:a}function Ea(t,e){return Math.min(yl,t*60/(e>0?e:120))}var Aa=function(t){return t>0?"+":t<0?"−":""};function kl(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Di(t,e,n){var a=t.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:Aa(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Aa(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Pe(a.law,e),s===null?a.zero||"open":a.astrid?kl(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Pe(a.law,e).toFixed(1);case"ratio":return Pe(a.law,e).toFixed(1)+":1";case"rate":return s=Pe(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Ea(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Ea(e,n)*1e3)+" ms"}return String(e)}var $l=1,Lt=["drive","delay","plate"];function xl(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,s){return Di(t,a,s)},e}var Je=Lt.map(function(t){var e=oe(t),n={type:t,label:e.label,dials:e.dials.map(xl)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Sl={reverb:"plate"};function vt(t){var e=Sl[t]||t;return Lt.indexOf(e)>=0?e:null}function Ct(t){for(var e=vt(t),n=0;n<Je.length;n++)if(Je[n].type===e)return Je[n];return null}function Ui(t,e){var n=Ct(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Be(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function he(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,s=1;s<t.options.length;s++)Math.abs(t.options[s].value-e)<Math.abs(a-e)&&(a=t.options[s].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function Tl(){return{v:$l,chain:Je.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function El(t){return an.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},an[0])}function Ut(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Al(t){for(var e=Array.isArray(t)?t:Ut(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Tl(),s={},o=[],r=0;r<e.length;r++){var l=e[r];if(Ut(l)){var u=vt(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(s[u]){o.push(u);continue}s[u]=!0;var d=a.chain[Lt.indexOf(u)],c=Ut(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Ct(u).dials.forEach(function(h){d.dials[h.key]=he(h,c[h.key])}),Ml(u,d.dials,c)}}return{state:a,dropped:o}}function Ml(t,e,n){for(var a=Ct(t),s=0;s<a.dials.length;s++){var o=a.dials[s];o.stepWhen&&(e[o.key]=he(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Be(o,e)))}}function sn(t){return Al(t).state}function Ll(t){return JSON.parse(JSON.stringify(t))}var Cl=24,on={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function rn(t,e,n){if(e==="bypass")return n?0:1;var a=Ui(t,e)||Nl(t,e);return a?qi(a,n):0}function Nl(t,e){var n=oe(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var Pl={};Je.forEach(function(t){t.dials.forEach(function(e){Pl[t.type+"."+e.key]=e.format})});function Gt(t,e){var n=new Float64Array(Cl),a=sn(t);return a.chain.forEach(function(s){var o=on[s.type];n[o.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(r){n[o[r]]=rn(s.type,r,s.dials[r])})}),n}var zl=2,kt=3,_l=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function De(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Gi(t,e){var n=oe(t);if(!n)return null;var a={};(e||[]).forEach(function(r){r&&r.id&&(a[r.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var o={};return n.dials.forEach(function(r){o[r.key]=r.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:o}}function Rl(t){var e=oe(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Il(t,e,n){var a=t.length-1,s=Math.max(0,Math.min(a,n));if(e<0||e>a||e===s)return t;var o=t.slice(),r=o.splice(e,1)[0];return o.splice(s,0,r),o}function Ol(t){return typeof t=="number"&&isFinite(t)?El(t):t}function Ma(t,e,n){var a={};return t.dials.forEach(function(s){var o=e[s.key];o===void 0&&s.astridKey&&(o=e[s.astridKey]),n&&t.type==="delay"&&s.key==="delay_beats"&&(o=Ol(o)),a[s.key]=he(s,o)}),t.dials.forEach(function(s){s.stepWhen&&(a[s.key]=he(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],Be(s,a)))}),a}function jl(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,s=1/0,o=t.min;o<=t.max;o++){var r=Pe(n.law,o),l=r===null?1/0:Math.abs(r-e);l<s&&(s=l,a=o)}return a}}var Hl={rate:"rate_hz"};function Bl(t,e,n,a){var s={};return t.dials.forEach(function(o){if(!o.more){var r=o.astridKey||Hl[o.key]||o.key;s[o.key]=jl(o,e[r])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function Fl(t,e){var n=e>0?Math.floor(e):kt,a=[],s=[],o=[],r=!1,l=!1;Array.isArray(t)?(o=t,l=!0):De(t)&&Array.isArray(t.chain)&&(o=t.chain,r=t.v===1,l=t.schema===2);for(var u=[],d=0;d<o.length;d++){var c=o[d];if(De(c)&&!(c.type==="limiter"||c.fixed===!0)){var h=En(c.type),f=h&&oe(h);if(!f||r&&["drive","delay","plate"].indexOf(h)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||h);continue}var y;De(c.params)&&!De(c.dials)?y=Ma(f,Bl(f,c.params,s,c.id||h),l):y=Ma(f,De(c.dials)?c.dials:{},l);var b=Gi(h,u),g=typeof c.id=="string"&&_l.test(c.id)&&!u.some(function(m){return m.id===c.id})?c.id:b.id,p=r?c.bypass!==!1:c.bypass===!0;u.push({id:r?b.id:g,type:h,bypass:p,dials:y})}}return{state:{v:zl,chain:u},dropped:a,notes:s}}function ht(t,e){return Fl(t,e).state}function Ae(t){var e=oe(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,qi(a,t.dials[a.key])])}),n}function ql(t){var e=ht(t,8),n=[],a=e.chain.map(function(s,o){var r=oe(s.type),l={};return o>=kt&&n.push(s.id+": ASTRID keeps three hacks"),r.dials.forEach(function(u){var d=s.dials[u.key];if(u.more){d!==u.default&&n.push(s.id+"."+u.key);return}u.key==="delay_beats"&&an.indexOf(d)<0&&n.push(s.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var Dl="nc-fx@1",Ul=600,Gl=256,Wl=8,Ue=typeof WeakMap=="function"?new WeakMap:null;function Kl(t,e){var n=Ue&&Ue.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await gl(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),Ue&&(Ue.set(t,n),n.catch(function(){Ue.delete(t)})),n)}function Me(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Wi(t,e,n,a){var s=Math.min(400,Math.max(20,Me(e.bpm,120))),o=[],r=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Me(e.preGain,1),d=Math.max(0,Me(e.crossfade,.012)),c=Me(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),y=t.createGain(),b=t.createGain(),g=null;e.modInput===!0&&(g=t.createGain(),g.channelCount=1,g.channelCountMode="explicit",g.channelInterpretation="discrete"),b.gain.value=0,h.connect(y),y.connect(f),b.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},m=n(s);p.post=function($){p.node?p.node.port.postMessage($):p.disposed||(o.length>=Gl&&(o=a().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push($))};function w($){var T=o.map(function(x){var E=Object.assign({},x);return E.when>$||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return o=[],T}p.emit=function($){for(var T=0;T<p.listeners.length;T++)try{p.listeners[T]($)}catch(x){typeof console<"u"&&console.error(x)}},p.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var k=!1;p.tooFar=function($){return typeof $=="number"&&$>t.currentTime+Ul?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round($-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Kl(t,e.moduleUrl).then(function(){if(!p.disposed){var $=Object.assign({bpm:s,bypassMode:l,limiter:r,preGain:u,maxDelaySeconds:c},m);$.pending=w(t.currentTime),p.node=new AudioWorkletNode(t,Dl,{numberOfInputs:g?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),h.connect(p.node),g&&g.connect(p.node,0,1),p.node.connect(b);var T=t.currentTime;T<=0||d===0?(y.gain.value=0,b.gain.value=1):(y.gain.setValueAtTime(1,T),y.gain.linearRampToValueAtTime(0,T+d),b.gain.setValueAtTime(0,T),b.gain.linearRampToValueAtTime(1,T+d)),p.status="ready"}},function($){p.status="unavailable",o=[],p.error=$});return p.core={input:h,output:f,modInput:g,ready:S,get status(){return p.status},get error(){return p.error},latencySamples:r==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:r,setTempo:function($,T){var x=Me($,NaN);!(x>0)||p.disposed||p.tooFar(T)||(p.bpm=Math.min(400,Math.max(20,x)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(T)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function($){var T=$&&typeof $=="object"?$:{at:$};if(!(p.disposed||p.tooFar(T.at))){var x=Me(T.fadeMs,0);p.post({t:"clear",when:p.whenOf(T.at),fadeMs:x>0?Math.min(1e3,x):0})}},onChange:function($){return p.listeners.push($),function(){var T=p.listeners.indexOf($);T>=0&&p.listeners.splice(T,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,y,b,f,g].forEach(function($){try{$&&$.disconnect()}catch{}})}}},p}function Vl(t,e){var n=e||{};if(n.slots)return Yl(t,n);var a=sn(n.state),s=Array.from(Gt(a)),o=Wi(t,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from(Gt(a)),when:0}]}),r=o.core;function l(u){return a.chain[Lt.indexOf(u)]}return r.setParam=function(u,d,c,h){var f=vt(u);if(!(!f||o.disposed||o.tooFar(h))){var y=l(f),b;if(d==="bypass")b=!!c;else{var g=Ui(f,d);if(!g)return;b=he(g,c,Be(g,y.dials))}return d==="bypass"?y.bypass=b:y.dials[d]=b,o.post({t:"p",i:on[f][d],v:rn(f,d,b),when:o.whenOf(h)}),o.emit({effect:f,key:d,value:b}),Ct(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(k){return k.key===d}))){var m=y.dials[p.key],w=he(p,m,Be(p,y.dials));w!==m&&(y.dials[p.key]=w,o.post({t:"p",i:on[f][p.key],v:rn(f,p.key,w),when:o.whenOf(h)}),o.emit({effect:f,key:p.key,value:w}))}}),b}},r.getParam=function(u,d){var c=vt(u);if(c){var h=l(c);return d==="bypass"?h.bypass:h.dials[d]}},r.getState=function(){return Ll(a)},r.setState=function(u,d){o.disposed||o.tooFar(d&&d.at)||(a=sn(u),o.post({t:"load",program:Array.from(Gt(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},r}function Yl(t,e){var n=e.slots===!0?kt:Math.max(1,Math.min(Wl,Math.floor(+e.slots)||kt)),a=ht(e.state,n),s=1,o={};function r(p){return o[p.id]||(o[p.id]=s++),o[p.id]}function l(p){return p.map(function(m){return{uid:r(m),type:m.type,program:Ae(m)}})}var u=l(a.chain),d=a.chain.map(function(p){return o[p.id]}),c=Wi(t,e,function(){return{slots:n,chain:u,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return o[p.id]}),when:0}]}),h=c.core;function f(p){var m;for(m=0;m<a.chain.length;m++)if(a.chain[m].id===p)return a.chain[m];var w=En(p);if(w){for(m=0;m<a.chain.length;m++)if(a.chain[m].type===w)return a.chain[m]}return null}function y(p,m){var w=r(p);c.post({t:"add",uid:w,type:p.type,when:m}),Ae(p).forEach(function(k){c.post({t:"ps",uid:w,k:k[0],v:k[1],when:m,snap:!0})})}function b(p){c.post({t:"order",uids:a.chain.map(function(m){return o[m.id]}),when:p})}function g(p,m){var w={};a.chain.forEach(function($){w[$.id]=$});var k=a.chain.map(function($){return o[$.id]}).join();p.chain.forEach(function($){var T=w[$.id];if(!T||T.type!==$.type){delete o[$.id],y($,m);return}var x={};Ae(T).forEach(function(E){x[E[0]]=E[1]}),Ae($).forEach(function(E){x[E[0]]!==E[1]&&c.post({t:"ps",uid:o[$.id],k:E[0],v:E[1],when:m})})});var S={};p.chain.forEach(function($){S[$.id]=!0}),Object.keys(o).forEach(function($){S[$]||delete o[$]}),a=p,a.chain.map(function($){return o[$.id]}).join()!==k&&b(m)}return h.slots=n,h.setParam=function(p,m,w,k){var S=f(p);if(!(!S||c.disposed||c.tooFar(k))){var $=oe(S.type),T,x=null;if(m==="bypass")T=!!w;else{for(var E=0;E<$.dials.length;E++)$.dials[E].key===m&&(x=$.dials[E]);if(!x)return;T=he(x,w,Be(x,S.dials))}var C={},H={};Ae(S).forEach(function(P){C[P[0]]=P[1]}),$.dials.forEach(function(P){P.stepWhen&&(H[P.key]=S.dials[P.key])}),m==="bypass"?S.bypass=T:S.dials[m]=T,$.dials.forEach(function(P){P.stepWhen&&(S.dials[P.key]=he(P,S.dials[P.key],Be(P,S.dials)))});var U=c.whenOf(k),re=o[S.id];return Ae(S).forEach(function(P){(C[P[0]]!==P[1]||x&&P[0]===x.k)&&c.post({t:"ps",uid:re,k:P[0],v:P[1],when:U})}),c.emit({effect:S.id,key:m,value:T}),Object.keys(H).forEach(function(P){P!==m&&S.dials[P]!==H[P]&&c.emit({effect:S.id,key:P,value:S.dials[P]})}),T}},h.getParam=function(p,m){var w=f(p);if(w)return m==="bypass"?w.bypass:w.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,m){c.disposed||c.tooFar(m&&m.at)||(g(ht(p,n),c.whenOf(m&&m.at)),c.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var w=m||{},k=Gi(p,a.chain);if(!(!k||a.chain.length>=n||c.disposed||c.tooFar(w.at))){if(w.dials){var S=ht({v:2,chain:[{id:k.id,type:k.type,dials:w.dials}]},1).chain[0];k.dials=S.dials}w.bypass===!0&&(k.bypass=!0);var $=a.chain.slice(),T=typeof w.index=="number"?Math.max(0,Math.min($.length,w.index)):$.length;return $.splice(T,0,k),g({v:2,chain:$},c.whenOf(w.at)),c.emit({effect:k.id,key:"chain",value:"add"}),k.id}},h.removeEffect=function(p,m){var w=f(p),k=m&&m.at;return!w||c.disposed||c.tooFar(k)?!1:(g({v:2,chain:a.chain.filter(function(S){return S!==w})},c.whenOf(k)),c.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,w){var k=f(p),S=w&&w.at;if(!k||c.disposed||c.tooFar(S))return!1;var $=Il(a.chain,a.chain.indexOf(k),m);return $===a.chain?!1:(g({v:2,chain:$},c.whenOf(S)),c.emit({effect:k.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:Rl(p),bypass:p.bypass}})},h.toAstrid=function(){return ql(a)},h}const Xl="/rhythm/assets/worklet-CnpUVY5i.js",Ie="petra-rhythm.state",An=1,Ki=400,Jl=2e3;function Ql(t){return JSON.stringify({v:An,doc:t.doc,bank:t.bank,selectedTrack:t.selectedTrack})}function Zl(t,e){if(!e||typeof e!="object")return!1;const{swing:n,fx:a,tracks:s}=e;return He({...t,swing:n,fx:a,tracks:s}).ok}function Vi(t){if(!t)return null;let e;try{e=JSON.parse(t)}catch{return null}if(!e||e.v!==An)return null;const n=He(e.doc);if(!n.ok||!n.document)return null;const a=n.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==ae||!s.slots.every(d=>d===null||Zl(a,d)))return null;const o=s.slots,r=Number.isInteger(s.active)&&o[s.active]?s.active:null,l=e.selectedTrack,u=Number.isInteger(l)&&l>=0&&l<a.tracks.length?l:0;return{doc:a,bank:{slots:o,active:r},selectedTrack:u}}function ec(t,e,n=Ki,a=Ie){let s,o=0,r="";const l=()=>{clearTimeout(s),s=void 0,o=0;try{const u=Ql(e());if(u===r)return;t.setItem(a,u),r=u}catch{}};return{schedule(){const u=Date.now();o||(o=u),clearTimeout(s),s=setTimeout(l,Math.min(n,Math.max(0,o+Jl-u)))},flush:l}}function tc(t,e,n=Ie){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=t.getItem(n)}catch{return null}if(!a||Vi(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(s.v!==An||He(s.doc).errors[0]===ct||Array.isArray(s.bank?.slots)&&s.bank.slots.some(r=>r!==null&&typeof r=="object"&&He({...s?.doc,...r}).errors[0]===ct))?`Couldn't open your last session: ${ct}`:"Couldn't open your last session: it is malformed"}function nc(t,e,n=Ie){if(new URLSearchParams(e).has("fresh"))return null;try{return Vi(t.getItem(n))}catch{return null}}const Wt={maker:"PETRA",instrument:"RHYTHM",number:"01"},ac="PETRA Rhythm";let La=!1;function ic(){return`
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
`}function sc(t){const e=t.ownerDocument;if(!La){const d=e.createElement("style");d.dataset.petraHead="",d.textContent=ic(),e.head.append(d),La=!0}const n=e.createElement("header");n.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const d=e.createElement("span");return d.className="petra-head-sep",d.textContent="/",d},o=e.createElement("span");o.className="petra-head-num",o.textContent=Wt.number;const r=e.createElement("span");r.className="petra-head-maker",r.style.color=i("instrument-petra"),r.textContent=Wt.maker,a.append(r," ",s(),` ${Wt.instrument} `,s()," ",o);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const u=e.createElement("div");return u.className="petra-head-title",u.append(a,l),n.append(u),t.before(n),n}function oc(t,e){const n=t.ownerDocument,a=n.createElement("details");a.className="petra-menu";const s=n.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const o=n.createElement("div");o.className="petra-menu-body";const r=n.createElement("input");r.type="file",r.accept=".rhythm,.json,application/json",r.hidden=!0,r.addEventListener("change",async()=>{const c=r.files?.[0];r.value="",c&&e.load(await c.text(),c.name)});const l=(c,h)=>{const f=n.createElement("button");return f.type="button",f.textContent=c,f.dataset.petraMenu=c.toLowerCase(),f.addEventListener("click",()=>{h(),u||(a.open=!1)}),f};o.append(l("Save",e.save),l("Load",()=>r.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],r),a.append(s,o),t.append(a);let u=null;const d=()=>{const c=getComputedStyle(s).display==="none";c!==u&&(a.open=c),u=c};return window.addEventListener("resize",d),d(),a}const mt={brand:"PETRA Rhythm, a drum machine and one of the NetComposer instruments. Open with the others, it plays on their clock.",menu:"Save, Load, New and Panic.","menu:save":"Downloads the pattern and all 10 slots as a .rhythm file you can load again later.","menu:load":"Opens a .rhythm file, replacing the pattern and all 10 slots. Undo in the message that follows brings back what was there.","menu:new":"Starts over with the default kit, every lane empty and every slot cleared. Undo in the message that follows brings it back.","menu:panic":"Silences every sound that is still ringing, at once. The beat keeps playing.","module:transport":"Starts and stops the beat, sets its speed and swing, and holds the 10 pattern slots.","module:pattern":"The drum pattern: one lane per drum, one square per 16th note. Click squares to add hits; click a drum's name to shape its sound.","module:filter":"Effects on the whole kit, in this order: Filter, Drive, Compressor. They are saved with the pattern and its slots.",hide:"Folds this module down to a slim bar to save room. Press again to open it.",index:"This module's number on the page.",slim:"This module is folded away. Click to open it again.",play:"Starts and stops the beat; Space does the same. When it reads Tap to join, the beat is already playing: tap and you come in on the next bar.",surprise:"Fills all 10 slots with new grooves and plays the first. Undo (or Cmd/Ctrl+Z) puts everything back.",bpm:"The speed of the beat in beats per minute (BPM), from 40 to 240. Higher is faster.",tap:"Tap this in time with the music, two taps or more, and Tempo follows your taps.",swing:"Pushes every second 16th note later for a shuffled, laid-back feel. 50% is straight; higher swings harder, up to 75%.","swing-note":"Whose swing this tab plays. Join the beat (Tap to join or Play) to follow the leading tab's swing; Save then stores it in a slot.",role:"With other NetComposer tabs open, one leads the shared tempo and clock and the others follow it. This tab's part is shown here.",slots:"Ten pattern slots. Click a saved one to play it (while playing, it switches on the next bar); Shift-click or long-press saves, Option-click clears.","slots@touch":"Ten pattern slots. Tap a saved one to play it (while playing, it switches on the next bar); long-press to save or clear.","slot-save":"Saves the pattern as it is now into this slot.","slot-clear":"Empties this slot. Undo in the message that follows puts it back.",morph:"How long a slot change glides from the old sound to the new one. 0 s switches at once.","tool-note":"In Note mode, clicking a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-note@touch":"In Note mode, tapping a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-accent@touch":"In Accent mode, tapping a square adds or removes an accent, a louder hit. An empty square gets the hit too.","tool-accent":"In Accent mode, clicking a square adds or removes an accent, a louder hit (an empty square gets the hit too). Shift-click does this in Note mode.",fill:"Hold it for a fill over the last beat: a snare roll, tom answers, the closed hat drops out. Let go and the pattern is as it was.",clear:"Turns every square off on every lane; the sounds and lengths stay. Undo takes it back.",mute:"Mute: silences this lane. Press again to hear it.",solo:"Solo: plays only the soloed lanes. Solo more than one to hear them together.",lane:"Click to shape its sound below; Shift- or Cmd-click adds it to the lanes Moves act on.","lane@touch":"Tap to shape its sound below; long-press adds it to the lanes Moves act on.","drum@kick":"Kick drum, the low thump.","drum@snare":"Snare drum, the crack on the backbeat.","drum@clap":"Hand clap, a quick burst of noise.","drum@rim":"Rimshot, a short knock.","drum@hat":"Closed hi-hat, a short tick that cuts the open hat short.","drum@hatOpen":"Open hi-hat, a longer sizzle that a closed-hat hit cuts short.","drum@tom":"Tom, a pitched drum.","drum@metal":"Metal, a clanging, bell-like hit.","drum@shaker":"Shaker, beads in a shell.",length:"Drag to set how many steps this lane plays before it starts over. A shorter lane drifts against the others for shifting patterns.",dice:"New steps for this lane only; its sound and length stay. Undo takes it back.","pads-prev":"Shows the previous lane on the pads.","pads-next":"Shows the next lane on the pads.","pads-lane":"The lane on the pads. Tap it, then tap a pad to set where the lane ends; tap it again when done.","moves:shift":"Moves the selected lanes' hits together, wrapping round the end. Shift-click lane names to move several at once.","moves:shift@touch":"Moves the selected lanes' hits together, wrapping round the end. Long-press lane names to move several at once.","moves:groove":"Moves the accents and velocities from hit to hit; the hits stay where they are.","moves:hits":"Trades hits between the selected lanes, or nudges a few so the part evolves.","move:shift-left":"Every hit one step earlier; the first wraps round to the end.","move:shift-right":"Every hit one step later; the last wraps round to the start.","move:shift-random":"Shifts by a random number of steps, every selected lane by the same amount.","move:reverse":"Plays the selected lanes backwards.","move:groove-left":"Each hit takes the next hit's accent and velocity.","move:groove-right":"Each hit takes the previous hit's accent and velocity.","move:shuffle":"Trades hits between the selected lanes, step by step. Select two lanes or more first.","move:mutate":"Moves or adds one or two hits on each selected lane, so the part evolves.","edit-step":"The step you are editing. Long-press another square to edit that one.","edit-velocity":"How hard this step hits. Lower is softer.","edit-chance":"How often this step plays: 100% every time, 50% about every other time. Steps under 100% show dimmed.","edit-done":"Closes the step editor.","section:parameters":"The sound of the selected lane. Click a drum's name in the grid to pick another.","panel-subject":"The lane these sliders shape. Click another drum's name in the grid to switch.",tune:"The drum's pitch in hertz (Hz, vibrations per second). Lower is deeper; higher is tighter.","tune@kick":"The pitch the kick settles on, in hertz (Hz, vibrations per second). Lower is deeper and boomier; higher is punchier.","tune@tom":"The pitch the tom settles on, in hertz (Hz, vibrations per second). Lower is a deep floor tom; higher is a small tom.","tune@snare":"The pitch of the snare's ringing body under the noise, in hertz (Hz). Lower is deeper; higher is tighter.","tune@rim":"The pitch of the rimshot's knock, in hertz (Hz). Lower is woodier; higher is sharper.","tune@clap":"A clap has no pitched body, so Tune does nothing on this lane.","tune@hat":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@hatOpen":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@metal":"The pitch of the clang, in hertz (Hz). Lower is a deep gong; higher is a small bell.",decay:"How long each hit rings before it fades. Short is tight; long rings on.","decay@kick":"How long the kick booms, and how slowly its pitch falls. Short is a tight thud; long is a deep boom.","decay@tom":"How long the tom rings, and how slowly its pitch falls. Short is a thud; long rings on.","decay@hatOpen":"How long the open hat sizzles; it rings far longer than the closed hat at the same setting. A closed-hat hit still cuts it short.",tone:"How bright the hit is. Lower is darker; higher is brighter.","tone@kick":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@tom":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@snare":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@clap":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@rim":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@hat":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@hatOpen":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@metal":"How much the clang rings with extra overtones. Lower is a purer tone; higher is harsher.",snap:"How sharp the start of each hit is. More is punchier.","snap@kick":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@tom":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@snare":"Noise rattle against the drum's body. More is a noisier crack; less is more tone.","snap@rim":"Noise against the knock's body. More is a noisier click; less is more tone.","snap@clap":"How tight the clap's bursts are and how much noise they carry. More is a tighter, snappier clap.","snap@hat":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@hatOpen":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@metal":"Moves the clang's overtones for a different metallic colour. Try a few settings to hear each one.",drive:"Saturation on this drum alone. More is fatter and grittier; 0 is clean.",level:"How loud this lane is. Turn it down to sit it back in the mix.","shaker-tune":"The shell's resonance in hertz (Hz, vibrations per second). Lower is a bigger, darker shaker; higher is smaller and brighter.","shaker-decay":"How long each shake rings after its peak. Short is a tight tick; long is a smoother swish.","shaker-tone":"How bright and ringing the shell is. Higher is brighter and thinner; lower is softer.","shaker-snap":"How many beads: few is a coarse, ticking cabasa, many is a dense, soft egg shaker.","shaker-drive":"How quickly each stroke swells in. Short is a sharp chick; long is a soft swish.","shaker-level":"How loud the shaker is. Turn it down to sit it back in the mix.","hack:hack-filter":"A filter on the whole kit: it takes away part of the sound to make it darker or thinner.","hack:hack-drive":"Saturation on the whole kit for warmth and grit. It also tames the loudest peaks.","hack:hack-compressor":"Evens out the loud and quiet parts of the kit for a tighter, punchier sound.","hack-switch":"Turns this effect on or off. Off, the sound passes through untouched and the settings are kept.",more:"More settings for this effect.",mode:"Low pass keeps the lows and cuts the highs; High pass does the opposite. Band pass keeps only a band around Cutoff.",cutoff:"Where the filter cuts, in hertz (Hz). In Low pass, lower is darker and all the way up is open; in High pass, higher is thinner.",resonance:"Boosts the sound right at the Cutoff for a sharper, ringing edge. 0 is smooth.",curve:"A picture of the filter: low pitches on the left, high on the right. Where the line is high the sound passes; where it drops, it is cut.",meter:"How loud the kit is right now, after the Hacks.","hack-drive-drive_db":"How hard the sound is pushed into saturation, in decibels (dB). More is grittier; 0 is clean.","hack-drive-output_db":"The level after the drive, in decibels (dB). Use it to match the loudness with Drive on and off.","hack-drive-mix":"The blend of driven and clean sound. 100% is all driven; lower mixes the clean kit back in.","hack-drive-curve":"The drive's character. Smooth is warm and keeps the level steady; Acid is harder and rawer.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up is off; lower is darker.","hack-compressor-threshold_db":"The level, in decibels (dB), above which the compressor turns the sound down. Lower acts on more of the sound.","hack-compressor-ratio":"How strongly sound above the Threshold is turned down. 1:1 does nothing; higher squashes harder.","hack-compressor-attack_ms":"How quickly the compressor clamps down, in milliseconds (ms). Slower lets each hit's punch through first.","hack-compressor-release_ms":"How quickly the compressor lets go after a hit, in milliseconds (ms). Shorter pumps with the beat; longer is smoother.","hack-compressor-makeup_db":"Turns the compressed kit back up, in decibels (dB), to make up for what the compressor took off.","toast-undo":"Takes back the last surprise, re-roll, clear, move, slot clear or load."};function Ca(t,e,n=!1){return(e?mt[`${t}@${e}`]:void 0)??(n?mt[`${t}@touch`]:void 0)??mt[t]}function rc(t,e=!1){if(t.key!=="lane")return Ca(t.key,t.voice,e);const n=t.voice?mt[`drum@${t.voice}`]:void 0,a=Ca("lane",void 0,e);return n&&a?`${n} ${a}`:a}const be=(t,e)=>t.dataset?.[e];function lc(t,e){const n=[],a=(o,r)=>{for(const l of Array.from(t.querySelectorAll(o))){const u=r(l);u&&n.push({el:l,...u})}},s=o=>()=>({key:o});return a(".petra-head-title",s("brand")),a(".petra-menu > summary",s("menu")),a("[data-petra-menu]",o=>({key:`menu:${be(o,"petraMenu")}`})),a(".nc-module-hd > .nc-title",o=>{const r=o.closest("[data-nc-module]")?.getAttribute("data-nc-module");return r?{key:`module:${r}`}:null}),a("[data-nc-hide]",s("hide")),a("[data-nc-index]",s("index")),a(".nc-slim",s("slim")),a(".nc-field",o=>{const r=Array.from(o.children).find(h=>h.classList.contains("nc-label"));if(!r)return null;const l=o.classList.contains("nc-morph-field")?"morph":be(o,"ncId");if(!l)return null;const u=r.getAttribute("for"),d=u?o.ownerDocument.getElementById(u)??null:o.querySelector("input, select"),c=o.closest('[data-nc-section="parameters"]')?e.selectedVoice():void 0;return{key:l,voice:c,control:d,el:r}}),a(".nc-btn[data-nc-id]",o=>({key:be(o,"ncId")??""})),a("[data-nc-sparkle]",s("surprise")),a("[data-nc-tap]",s("tap")),a(".nc-snap[data-nc-slot]",s("slots")),a("[data-nc-slot-op]",o=>({key:`slot-${be(o,"ncSlotOp")==="store"?"save":"clear"}`})),a(".nc-note[data-nc-id]",o=>({key:be(o,"ncId")??""})),a('.nc-seg[aria-label="Step tool"] > button',o=>({key:o.hasAttribute("data-nc-accent-mode")?"tool-accent":"tool-note"})),a("[data-nc-fill]:not([data-nc-clear])",s("fill")),a("[data-nc-clear]",s("clear")),a("[data-nc-ms]",o=>({key:be(o,"ncMs")==="solo"?"solo":"mute"})),a(".nc-row > .nc-name",o=>{const r=o.closest(".nc-row"),l=r?.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??r?.querySelector("[data-nc-len]")?.getAttribute("data-nc-len")??void 0;return{key:"lane",voice:l?e.voiceOf(l):void 0}}),a(".nc-len-handle",s("length")),a(".nc-row-dice, [data-nc-pads-dice]",s("dice")),a(".nc-pads-step:not([data-nc-pads-dice])",o=>({key:o.getAttribute("aria-label")?.startsWith("Next")?"pads-next":"pads-prev"})),a(".nc-pads-label",s("pads-lane")),a("[data-nc-pads-play]",s("play")),a(".nc-moves-row > .nc-moves-label",o=>({key:`moves:${(o.parentElement?.getAttribute("aria-label")??"").toLowerCase()}`,control:o.parentElement})),a("[data-nc-move]",o=>({key:`move:${be(o,"ncMove")}`})),a(".nc-panel-title",o=>{const r=o.closest("[data-nc-section]")?.getAttribute("data-nc-section");return r?{key:`section:${r}`}:null}),a(".nc-panel-subject",s("panel-subject")),a(".nc-ui-fx > .nc-ui-fx-hd > .nc-ui-fx-name",o=>{const r=o.closest(".nc-ui-fx")?.getAttribute("data-nc-id");return r?{key:`hack:${r}`}:null}),a("[data-nc-fx-switch]",s("hack-switch")),a("details.nc-ui-more > summary",s("more")),a(".nc-step-editor-head > .nc-label",s("edit-step")),a(".nc-step-editor-done",s("edit-done")),a(".nc-step-editor-row > .nc-label",o=>{const r=o.parentElement?.querySelector("input[data-nc-edit]");return{key:`edit-${r?.getAttribute("data-nc-edit")==="probability"?"chance":"velocity"}`,control:r??null}}),a(".nc-ui-toast-action",s("toast-undo")),n}const Na="rhythm-help-",cc="button, input, select, summary, [role]";function dc(t,e=document){sl({document:e});const n=e.createElement("div");n.id="rhythm-help",n.hidden=!0,e.body.append(n);const a=new Map,s=d=>{let c=a.get(d);if(!c){c=`${Na}${a.size+1}`;const h=e.createElement("span");h.id=c,h.textContent=d,n.append(h),a.set(d,c)}return c},o=(d,c)=>{const h=d.getAttribute("aria-describedby")??"",y=[...h.split(/\s+/).filter(b=>b&&!b.startsWith(Na)),c].join(" ");y!==h&&d.setAttribute("aria-describedby",y)};let r;const l=()=>{r=t.selectedVoice();const d=e.defaultView?.matchMedia?.("(pointer: coarse)").matches??!1;for(const c of lc(e,t)){const h=rc(c,d);if(!h)continue;c.el.getAttribute(Ye)!==h&&c.el.setAttribute(Ye,h),c.el.removeAttribute("title"),c.control?.classList.contains("nc-moves-row")&&c.control.removeAttribute("title");const f=c.control??(c.el.matches(cc)?c.el:null);f&&o(f,s(h))}},u=new MutationObserver(d=>{let c=!1;for(const h of d){if(h.type==="attributes"){const f=h.target;f.hasAttribute("title")&&f.hasAttribute(Ye)&&f.removeAttribute("title");continue}if(!(h.target===n||h.target.localName==="canvas"))for(const f of Array.from(h.addedNodes))f.nodeType===1&&!f.matches(".nc-ui-help, [data-nc-probe]")&&(c=!0)}c&&l()});return u.observe(e.body,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["title"]}),l(),{refresh:l,follow(){t.selectedVoice()!==r&&l()},disconnect(){u.disconnect(),n.remove()}}}const Yi={on:!1,accent:!1,velocity:.8},K=t=>({...t??Yi});function Q(t){return Math.max(1,Math.min(t.length,t.steps.length))}function Kt(t,e){const n=Q(t),a=t.steps.map(K);for(let s=0;s<n;s++)a[((s+e)%n+n)%n]=K(t.steps[s]);return{...t,steps:a}}function uc(t){const e=Q(t),n=t.steps.map(K);for(let a=0;a<e;a++)n[e-1-a]=K(t.steps[a]);return{...t,steps:n}}function Pa(t,e){const n=Q(t),a=[];for(let r=0;r<n;r++)t.steps[r]?.on&&a.push(r);if(a.length<2)return{...t,steps:t.steps.map(K)};const s=a.map(r=>t.steps[r]),o=t.steps.map(K);return a.forEach((r,l)=>{const u=s[((l-e)%a.length+a.length)%a.length];o[r]={on:!0,accent:u.accent,velocity:u.velocity,...u.probability!==void 0?{probability:u.probability}:{}}}),{...t,steps:o}}function pc(t,e){const n=t.map(s=>({...s,steps:s.steps.map(K)})),a=Math.max(0,...t.map(Q));for(let s=0;s<a;s++){const o=t.flatMap((l,u)=>s<Q(l)?[u]:[]);if(o.length<2)continue;const r=o.map(l=>K(t[l]?.steps[s]));for(let l=r.length-1;l>0;l--){const u=Math.floor(e()*(l+1));[r[l],r[u]]=[r[u],r[l]]}o.forEach((l,u)=>{const d=n[l];d&&(d.steps[s]=r[u])})}return n}function hc(t,e){const n=Q(t),a=t.steps.map(K),s=e()<.5?1:2;for(let o=0;o<s;o++){const r=[],l=[];for(let d=0;d<n;d++)(a[d]?.on?r:l).push(d);if(!l.length)break;const u=r.flatMap(d=>[-1,1].map(c=>[d,(d+c+n)%n]).filter(([,c])=>!a[c]?.on));if(u.length&&e()<.7){const[d,c]=u[Math.floor(e()*u.length)];a[c]=K(a[d]),a[d]=K(Yi)}else{const d=l[Math.floor(e()*l.length)];a[d]={on:!0,accent:!1,velocity:.55}}}return{...t,steps:a}}function mc(t,e){const n=s=>s.steps.slice(0,Q(s)).filter(o=>o.on).length,a=e.some(s=>n(s)>0);switch(t){case"shift-left":case"shift-right":case"shift-random":case"reverse":return e.some(s=>n(s)>0&&n(s)<Q(s));case"groove-left":case"groove-right":return e.some(s=>{const o=s.steps.slice(0,Q(s)).filter(r=>r.on);return o.length>1&&o.some(r=>r.accent!==o[0]?.accent||r.velocity!==o[0]?.velocity)});case"shuffle":return e.length>1&&a;case"mutate":return e.length>0}}function fc(t,e,n){switch(t){case"shift-left":return e.map(a=>Kt(a,-1));case"shift-right":return e.map(a=>Kt(a,1));case"shift-random":{const a=Math.min(...e.map(Q)),s=a>1?1+Math.floor(n()*(a-1)):0;return e.map(o=>Kt(o,s))}case"reverse":return e.map(uc);case"groove-left":return e.map(a=>Pa(a,-1));case"groove-right":return e.map(a=>Pa(a,1));case"shuffle":return pc(e,n);case"mutate":return e.map(a=>hc(a,n))}}class gc{doc=ci();bank=Ja();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Ds(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Fs(this.bank,e,this.doc),this.edited=null}replace(e,n){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(n),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=qs(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=n}peek(e){const n=Yn(this.bank,e,this.doc,0);return n.applied?n.document:null}recall(e,n=this.recallGlideSeconds){const a=Yn(this.bank,e,this.doc,n);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=lo(this.doc,e);this.sparkleUndo=n,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,n=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=so(this.doc,e,n),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},n=structuredClone(this.doc);for(const a of n.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=n,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}moveTracks(e,n,a=Math.random){const s=e.filter(d=>this.doc.tracks[d]);if(!s.length)return!1;const o=s.map(d=>this.doc.tracks[d]),r=fc(n,o,a);if(JSON.stringify(r)===JSON.stringify(o))return!1;const l={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},u=structuredClone(this.doc);return s.forEach((d,c)=>{const h=r[c];h&&(u.tracks[d]=structuredClone(h))}),this.doc=u,this.writeActive(),this.sparkleUndo=l,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const n=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=n,n===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(n=>{n.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let za=!1;function bc(){return`
#app .nc-morph-field { display: none; }
button[data-nc-help], summary[data-nc-help] { cursor: pointer; }
.nc-len-handle[data-nc-help] { cursor: ew-resize; }
.nc-btn[data-nc-help]:disabled { cursor: not-allowed; }
.nc-moves-btn[data-nc-help]:disabled { cursor: default; }
/* nc-ui help/slider-labels (not vendored yet): the slider's hit band covers most of its label, so with a mouse the
   label sits above it and opens its description. In the fallback layer, as the kit is: the live kit takes over. */
@layer nc-ui-fallback {
  @media (hover: hover) and (pointer: fine) {
    .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
  }
}
`}function yc(t=document){if(za)return;const e=t.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=bc(),t.head.append(e),za=!0}function wc(t){const e=t.getOutputTimestamp?.(),n=e?.contextTime,a=e?.performanceTime;if(n===void 0||a===void 0||!(n>0)||!(a>0))return null;const s=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0;return{contextTime:n,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function _a(t,e){const n=t.getOutputTimestamp?.(),a=n?.contextTime,s=n?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const o=s+(e-a)*1e3,r=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0,l=performance.timeOrigin+o;return{playedMs:l,plusLatencyMs:l+r,latencyMs:r,stampContextTime:a,stampPerformanceTime:s}}const vc=1400;function Vt(t,e,n,a=!1){return t==="store"?null:t==="clear"?n?`Cleared ${e}`:null:n?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function kc(t){return t===0?"0 s":`${Math.round(t*100)/100} s`}class $c{constructor(e){this.repaint=e}text="";timer=0;say(e,n=vc){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},n))}}const xc=50;function Sc(t,e,n,a=xc){if(n)return 0;const s=t-e;return s>=a?0:a-s}class Tc{constructor(e,n=()=>null){this.host=e,this.anchor=n}handle=null;get open(){return this.handle!==null}show(e,n="Surprise applied"){this.handle?.close();const a=el({message:n,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Ra(t,e){const n=new AudioContext(e);let a="loading";const s=(async()=>{n.state==="running"&&await n.suspend();for(const o of t)await n.audioWorklet.addModule(o)})().then(()=>{a="loaded"},o=>{throw a="failed",o});return s.catch(()=>{}),{context:n,ready:s,get status(){return a},async start(){return a==="loaded"&&ye(n),await s,n.state!=="running"&&await n.resume(),n.state}}}function ye(t){t.state==="running"||t.state==="closed"||t.resume().catch(()=>{})}const Ec=5e3;function Ac(){return typeof navigator<"u"&&"userAgentData"in navigator}function Mc(t,e,n,a={}){const s=a.restartsOnWorkletReady??Ac(),o=a.preloadTimeoutMs??Ec;let r=null,l=!1,u=null,d=null;async function c(){const g=new AudioContext(e);ye(g);try{for(const p of t)await g.audioWorklet.addModule(p);return g}catch(p){throw g.close().catch(()=>{}),p}}function h(g,p=!1){l=!0,r=null,g.context.close().catch(()=>{}),p?n?.(new Error(`audio preload still loading after ${o} ms`)):g.ready.catch(m=>n?.(m))}async function f(g){const{context:p}=g;n?.(new Error(`audio preload still loading after ${o} ms; loading into its context again`)),ye(p);const m=(async()=>{for(const w of t)await p.audioWorklet.addModule(w)})();try{return await Promise.race([g.ready.then(()=>{},()=>m),m]),p}catch(w){throw l=!0,r===g&&(r=null),p.close().catch(()=>{}),w}}function y(g){let p;const m=new Promise(w=>{p=setTimeout(()=>w("timeout"),o)});return Promise.race([g.ready.then(()=>"ready"),m]).finally(()=>clearTimeout(p))}async function b(){if(!l){r??=Ra(t,e);const g=r;if(g.status==="failed")h(g);else{const p=g.status==="loaded"||!s;if(p&&ye(g.context),g.status==="loading"){let m;try{m=await y(g)}catch{return h(g),c()}if(m==="timeout")return s?(h(g,!0),c()):f(g)}return g.context.state==="closed"?(r===g&&(r=null),b()):(p||ye(g.context),g.context)}}return c()}return{preload(){r||u||d||l||(r=Ra(t,e))},load(){return u&&u.state!=="closed"?(ye(u),Promise.resolve(u)):d?(r&&(r.status==="loaded"||!s)&&ye(r.context),d):(d=b().then(g=>(u=g,r=null,g)).finally(()=>{d=null}),d)}}}const Ia="/rhythm/assets/processor-BFa39uiw.js";function Lc(){try{return globalThis.localStorage??null}catch{return null}}function Xi(t,e,n=e,a=Lc()){if(!t||typeof t.storageKey!="function")return n;const s=t.storageKey(e);if(typeof s!="string"||!s||s===n)return n;try{if(a&&a.getItem(s)===null){const o=a.getItem(n);o!==null&&a.setItem(s,o)}}catch{}return s}const Cc="instance",Nc=99;function Nt(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Cc)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Nc?n:1}function ln(t,e){return e===1?t:`${t}#${e}`}function Pc(t,e){return e===1?t:`${t} ${e}`}let Le;function zc(t,e=Nt()){if(Le!==void 0)return Le;Le=null;try{if(typeof window>"u"||window.parent===window)return Le;const n=window.parent.ncStudio;n&&n.version===1&&(Le=n.attach(t,{instance:e}))}catch{}return Le}function _c(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,s,o)=>n.request(`${a}${e}`,s,o)}:null}}function Rc(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function $t(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function cn(t,e=Nt()){return e>1?`${t}#${e}`:t}function Ic(t,e=Nt()){const n=$t()?.owner()??null;return n===null||n==="studio"||n===cn(t,e)}function Oc(t,e){return JSON.parse(ai(t,e))}function jc(t){let e;try{e=typeof t=="string"?t:JSON.stringify(t)}catch{throw new Error("Not a Rhythm file")}if(typeof e!="string")throw new Error("Not a Rhythm file");const n=ii(e);if(!n.ok||!n.document||!n.bank)throw new Error(n.errors[0]??"Not a Rhythm file");return{document:n.document,bank:n.bank}}function Hc(t,e){return{format:Et,version:bt,get:()=>{const{doc:n,bank:a}=t();return Oc(n,a)},set:n=>{const{document:a,bank:s}=jc(n);e(a,s)}}}function Bc(t,e){let n=null;const a=()=>(n??=(async()=>{for(const s of e)await t.audioWorklet.addModule(s);return t})(),n.catch(()=>{n=null}),n);return{preload(){a().catch(()=>{})},load:a}}const Ji=new URLSearchParams(location.search),G=Ji.has("measure"),me=Nt(),V=zc("petra-rhythm",me),Mn=Pc(ac,me),Fc=Xi(V,"petra-rhythm.linkslots",ln("petra-rhythm.linkslots",me)),qc=Mo(Fc),Dc=!(G&&Ji.get("clockStepFix")==="0");let dn=0;const Uc=.05;G&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const ke=[40,240],v=new gc,Ln=G?ln(Ie,me):Xi(V,Ie,ln(Ie,me)),Ve=G?null:nc(localStorage,location.search,Ln),Oa=G||Ve?null:tc(localStorage,location.search,Ln);Ve&&(v.doc=Ve.doc,v.bank=Ve.bank,v.selectTrack(Ve.selectedTrack));const Pt=G?null:ec(localStorage,()=>({doc:v.doc,bank:v.bank,selectedTrack:v.selectedTrack}),Ki,Ln);if(G){for(const e of v.doc.tracks)e.solo=e.voice==="kick";const t=v.doc.tracks.find(e=>e.voice==="kick");t&&(t.params.decay=Uc)}const z=new Es({bpm:v.doc.bpm,minBpm:ke[0],maxBpm:ke[1],timebase:"shared"}),Cn=document.querySelector("#app");if(!(Cn instanceof HTMLElement))throw new Error("Missing #app");const Gc=sc(Cn);yc();const Wc=dc({voiceOf:t=>v.doc.tracks.find(e=>e.id===t)?.voice,selectedVoice:()=>v.doc.tracks[Fe()]?.voice}),fe=new Tc(document.body,()=>{const t=document.querySelector("#play")?.closest(".nc-module");return t&&t.getBoundingClientRect().width<window.innerWidth/2?t:null});let M=null;G&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",t=>{window.__errors?.push(String(t.reason))}),window.__toggle=()=>ss(),window.__clockStep=t=>{dn=t},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:we?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let Z=null,te=null,we=null,xt=0,Qi=0;function Kc(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const O=new js({..._c(),app:Mn,version:"0.1.0",clock:z,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:ke},audio:Kc,outputLatencyMs:()=>we?.outputLatencyMs??null,swing:()=>v.liveSwing});let ze="",Zi=0,es=!1,ja=Number.NEGATIVE_INFINITY,Ce=null;const j=new kn;let J=!1;function q(t=B()){return!J&&z.transport.isPlayingAt(t)}function et(t){if(!O.isLeader)return;const e=Sc(performance.now(),ja,t);if(e>0){Ce===null&&(Ce=setTimeout(()=>{Ce=null,et(!0)},e));return}Ce!==null&&(clearTimeout(Ce),Ce=null),O.publishState()&&(ja=performance.now())}function Ha(){const t=es?oo(v.doc).tracks:v.doc.tracks;return J?t.map(e=>({...e,mute:!0})):t}function tt(){if(!we)return null;const t=Math.round(we.offset*1e4)/1e4;return{offset:t,shifted:Ss(z.toSnapshot(),t,"audio")}}const Nn=new So(({offset:t,shifted:e})=>JSON.stringify([t,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function un(t=!1){const e=tt();e&&Nn.set(e,t)}const Vc={mode:"lp",cutoff:1,resonance:0,drive:0};function pn(t){const e=Qe(t),n=fo(t);return{v:2,chain:[{id:`${n.type}-1`,type:n.type,bypass:!e.filter||t.mode==="lp"&&t.cutoff>=.999,dials:n.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let hn=null;function Yc(){if(!te)return;const t=pn(v.doc.fx),e=hn;if(hn=t,!e||e.chain.some((n,a)=>n.type!==t.chain[a]?.type)){te.setState(t);return}t.chain.forEach((n,a)=>{const s=e.chain[a];if(s){s.bypass!==n.bypass&&te?.setParam(n.id,"bypass",n.bypass);for(const[o,r]of Object.entries(n.dials))s.dials[o]!==r&&te?.setParam(n.id,o,r)}})}function ts(t,e,n,a){return{clock:t,measure:G,swing:v.followSwing??e.swing,fx:Vc,...a===void 0?{}:{glideSeconds:a},tracks:n.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let ne=null;function N(t="state"){const e=t==="state"?tt():Nn.current??tt();if(!Z||!e)return;nd(),t!=="state"&&(ze="");const{offset:n,shifted:a}=e,s=ne;s!==null&&(ne=null,ze="");const o=v.consumeGlide(),r=JSON.stringify({seen:j.lastTaken,offset:n,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:v.liveSwing,glide:o??null,tracks:Ha(),fx:v.doc.fx});if(Yc(),r===ze)return;ze=r;const l={...ts(a,v.doc,Ha(),o),seen:j.lastTaken,...s===null?{}:{enterBeat:s}};Zi=n,Z.port.postMessage({type:"state",state:l}),window.__posts?.push({why:t,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const Pn=V?Bc(V.ctx,[Ia]):Mc([Ia],void 0,t=>console.warn("[rhythm] audio preload failed; loading on Play instead",t));async function zt(){const t=Pn.load();if(M)return;const e=await t;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,G){const a=M,s=a.getOutputTimestamp.bind(a);a.getOutputTimestamp=()=>{const o=s(),r=!dn||!o.contextTime?o:{contextTime:o.contextTime+dn/1e3,performanceTime:o.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),r.contextTime??0,r.performanceTime??0]),r}}M.addEventListener("statechange",()=>{L(),Se()}),we=V?.mapper??new Os(M,Dc?{}:{stepThresholdMs:0}),we.onStep(a=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:a.stepSeconds*1e3,confirmedAt:a.confirmedAt,reanchors:a.reanchors,revert:a.revert===!0}),un(!0)}),we.start(),Z=new AudioWorkletNode(M,"rhythm"),Z.port.onmessage=a=>{if(a.data.switched!==void 0&&ad(a.data.switched),a.data.level!==void 0&&a.data.step!==void 0&&(Qi=a.data.level,xt!==a.data.step&&(xt=a.data.step,L())),!(!G||!M)){for(const s of a.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-Zi});for(const s of a.data.onsets??[]){const o=_a(M,s.contextTime);o&&window.__onsets?.push({app:Mn,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-s.contextTime)*1e3,...o})}for(const s of a.data.render??[]){const o=_a(M,s.contextTime);o&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:o.playedMs})}}},te=Vl(M,{moduleUrl:Rc()??Xl,slots:3,state:pn(v.doc.fx)}),hn=pn(v.doc.fx),Z.connect(te.input),window.__hacks=()=>({state:te?.getState(),status:te?.status}),te.output.connect(V?.output??M.destination);let n=!1;Nn.subscribe(()=>N(n?"clock":"attach")),z.subscribe(a=>un(a.kind==="snapshot"&&a.replay===!0)),n=!0}const ve=new xo;let zn=!1,ft=null,Oe=null;function _t(){return!M||M.state!=="running"}function Xc(){return Oe=ve.mode(_t(),q()),Oe}function _n(){return ft??=(async()=>{try{ne=Number.POSITIVE_INFINITY,M&&N(),await zt(),M&&M.state!=="running"&&await M.resume();const t=z.transport;ne=ve.enter(t.beatAt(B()),t.bpm),mn&&(mn=!1,ne=Math.floor(t.beatAt(B())/4)*4);const e=ne;zn=!0,In(),N(),G&&(window.__join={...ve.toJSON(),tapBeat:ns,sentBeat:e})}catch(t){throw ve.cancel(),ne=Number.NEGATIVE_INFINITY,N(),t}})().finally(()=>{ft=null,L(),Se()}),ft}let ns=Number.NaN,mn=!1;function as(t){const e=t instanceof KeyboardEvent&&t.repeat;ve.gesture(_t(),q(),e)&&(ns=z.transport.beatAt(B()),_n().catch(is))}document.addEventListener("pointerdown",as,{capture:!0});document.addEventListener("keydown",as,{capture:!0});document.addEventListener("pointerup",()=>{ve.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function is(t){console.warn("[rhythm] audio couldn't start",t),se.say("Audio couldn't start. Press Play to try again."),L()}function Rn(){Jc().catch(is)}async function Jc(){if(ve.swallowClick(_t(),q())){await _n();return}await ss()}let Ge=null;function Se(){if(Ge!==null&&(clearTimeout(Ge),Ge=null),!_t())return;dt(!0,q())!==Oe&&L();const t=B(),{startTime:e,stopTime:n}=z.transport,a=[e,n].filter(o=>o!==null&&o>t);if(a.length===0)return;const s=Math.min((Math.min(...a)-t)*1e3+1,2**31-1);Ge=setTimeout(()=>{Ge=null,Se()},s)}const Qc=1500;function Zc(t){let e,n;const a=new Promise(r=>{e=setTimeout(()=>r(!1),Qc)}),s=new Promise(r=>{n=()=>{t.state==="running"&&r(!0)},t.addEventListener("statechange",n)}),o=t.resume().then(()=>t.state==="running",()=>!1);return Promise.race([o,s,a]).finally(()=>{clearTimeout(e),n&&t.removeEventListener("statechange",n)})}let Yt=!1;function ed(){M?M.state!=="running"&&M.resume().catch(()=>{}):Pn.load().catch(()=>{})}async function ss(){if(Yt){ed();return}Yt=!0;try{if(await zt(),!M)return;if(M.state!=="running"&&!await Zc(M)&&!q()){se.say("Tap Play to start audio"),L();return}}finally{Yt=!1}if(V&&z.transport.isPlayingAt(B())){if(!J&&$t()?.owner()===cn("petra-rhythm",me)){z.stop({at:B()});return}J?(J=!1,ne=Math.ceil(z.transport.beatAt(B())/4-1e-9)*4):J=!0,v.playing=q(),ze="",N(),L();return}if(q()){z.stop({at:B()});return}V&&$t()?.claim(cn("petra-rhythm",me)),z.play({at:B()}),!O.isLeader&&[...O.peers.values()].some(t=>t.leader)&&(zn=!0,In(),L())}const se=new $c(()=>L()),td=6e3;Oa&&se.say(Oa,td);function $e(){return zn&&!O.isLeader}function In(){!$e()||!v.adoptSwing(O.swing)||(N(),L())}function os(t,e,n){const a=v.peek(t),s=tt();if(!a||!Z||!s)return!1;const o=z.transport.beatAt(B()),r=j.recall(t,o,{glide:e},n===void 0?{}:{atBeat:n});return ds(r,a,s.shifted),!0}let rs="";function ls(t){return $e()?v.followSwing??t.swing:t.swing}function cs(t,e){return JSON.stringify([t,ls(e),e.fx,e.tracks])}function ds(t,e,n){if(!Z)return;rs=cs(t.id,e);const a={...ts(n,e,e.tracks,t.payload.glide),swing:ls(e),atBeat:t.atBeat,switchId:t.id,slot:t.slot};Z.port.postMessage({type:"state",state:a})}function nd(){const t=j.pending;if(!t||!Z)return;const e=v.peek(t.slot);if(!e){j.cancel();return}if(cs(t.id,e)===rs)return;const n=tt();n&&ds(t,e,n.shifted)}function On(t,e){const n=v.liveSwing;return v.recall(t,e)?($e()||(v.followSwing=null),v.liveSwing!==n&&et(!0),!0):!1}function ad(t){const e=j.takeHeld(t);e&&(On(e.slot,e.payload.glide),v.consumeGlide(),N(),L())}function us(t){if(j.cancel(),!On(t,v.recallGlideSeconds))return;const e=v.recallGlideSeconds>0?v.recallGlideSeconds:0;O.sendSnapshot("recall",t,{atBeat:z.transport.beatAt(B()),...e>0?{glide:{seconds:e}}:{}})}function id(t){if(j.tap(t,q()).kind==="queue"){const n=v.recallGlideSeconds>0?v.recallGlideSeconds:0;if(os(t,n,pi(z.transport.beatAt(B())))){const a=j.pending?.atBeat;O.sendSnapshot("recall",t,{...a===void 0?{}:{atBeat:a},...n>0?{glide:{seconds:n}}:{}});return}}us(t)}function je(t,e){const n=Xa[t]??"";if(e==="store")v.store(t),se.say(Vt(e,n,!0));else if(e==="clear"){const a=v.bank.slots[t]!=null;if(j.queued===t){const s=j.drop();j.cancel();const o=v.bank.active;s&&o!=null&&O.sendSnapshot("recall",o,{atBeat:s.atBeat})}v.clear(t),se.say(Vt(e,n,a)),a&&fe.show(xe,`Slot ${n} cleared`)}else v.bank.slots[t]==null?se.say(Vt(e,n,!1,matchMedia("(pointer: coarse)").matches)):id(t);N(),L()}function xe(){v.undoSurprise()&&(fe.dismiss(),N(),L())}function sd(t){const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((t.metaKey||t.ctrlKey)&&t.key==="z"&&!t.shiftKey){t.preventDefault(),xe();return}if(t.code==="Space"){t.preventDefault(),t.repeat||Rn();return}const n=t.code.startsWith("Digit")?Number(t.code.slice(5)):Number.NaN;if(!Number.isInteger(n))return;const a=n===0?9:n-1;a<0||a>=ae||(t.preventDefault(),t.shiftKey?je(a,"store"):t.altKey?je(a,"clear"):je(a,"recall"))}const od=new To({min:ke[0],max:ke[1]});function fn(t){v.doc.bpm=t,z.setTempo({bpm:t}),N(),L()}function rd(){return $e()?"Leader's swing · Save stores it":"Own swing · join to follow"}function ps(){const t=q(),e=Xc(),n=$e();return{id:"transport",title:"Transport",summary:t?"playing":"stopped",status:se.text,controls:[{type:"button",id:"play",label:ui(e),on:e==="stop",...e==="join"?{ariaLabel:di}:{},onPress:()=>Rn(),onSparkle:()=>{v.surprise(),N(),L(),fe.show(xe)}},{type:"slider",id:"bpm",label:"Tempo",min:ke[0],max:ke[1],step:1,value:z.transport.bpm,onChange:fn,onTap:a=>{const s=od.tap(a);s!==null&&s!==z.transport.bpm&&fn(s)}},{type:"slider",id:"swing",label:n?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:v.liveSwing,valueText:co(v.liveSwing),disabled:n,modulated:n&&v.followSwing!=null,onChange:a=>{$e()||ft||(v.setSwing(a),et(!1),N(),L())},onCommit:()=>{et(!0)}},...O.isLeader?[]:[{type:"note",id:"swing-note",text:rd()}],...O.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:O.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:v.morphSeconds,morphText:kc(v.morphSeconds),slots:Xa.map((a,s)=>({label:a,filled:v.bank.slots[s]!=null,active:v.bank.active===s,edited:v.edited===s,queued:j.queued===s,pulse:j.queued===s&&t&&xt%4<2})),onMorph:a=>{v.morphSeconds=a,L()},onSlot:(a,s)=>{je(a,s)}}]}}function Fe(){const t=v.doc.tracks.length;return t===0?0:Math.min(v.selectedTrack,t-1)}let Ne=[];function St(){const t=v.doc.tracks,e=t[Fe()]?.id,n=Ne.filter(a=>t.some(s=>s.id===a));return e&&!n.includes(e)&&n.unshift(e),n}function ld(t,e=!1){const n=v.doc.tracks,a=n[t]?.id;if(!a)return;if(!e){Ne=[],v.selectTrack(t);return}const s=St();if(s.includes(a)&&s.length>1){if(Ne=s.filter(o=>o!==a),n[Fe()]?.id===a){const o=n.findIndex(r=>r.id===Ne[Ne.length-1]);o>=0&&v.selectTrack(o)}}else Ne=s.includes(a)?s:[...s,a],v.selectTrack(t)}const Ba={stroke:"M13 8H3M7 4 3 8l4 4"},Fa={stroke:"M3 8h10M9 4l4 4-4 4"},qa=[{id:"shift",label:"Shift",moves:[{id:"shift-left",text:"Left",icon:Ba},{id:"shift-right",text:"Right",icon:Fa},{id:"shift-random",text:"Random",icon:{stroke:"M3 3h10v10H3zM6 6h0M8 8h0M10 10h0"}},{id:"reverse",text:"Reverse",icon:{stroke:"M2 5h11M10 2l3 3-3 3M14 11H3M6 8l-3 3 3 3"}}]},{id:"groove",label:"Groove",moves:[{id:"groove-left",text:"Left",icon:Ba},{id:"groove-right",text:"Right",icon:Fa}]},{id:"hits",label:"Hits",moves:[{id:"shuffle",text:"Shuffle",icon:{stroke:"M2 4.5h2.5l6 7H14M2 11.5h2.5l6-7H14M12 2.5l2 2-2 2M12 9.5l2 2-2 2"}},{id:"mutate",text:"Mutate",icon:{fill:"M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z"}}]}];function cd(){const t=St(),e=v.doc.tracks.filter(n=>t.includes(n.id));return{type:"moves",id:"moves",label:"Pattern moves",groups:qa.map(n=>({...n,moves:n.moves.map(a=>({...a,disabled:!mc(a.id,e)}))})),onMove:n=>{const a=qa.flatMap(l=>l.moves.map(u=>({...u,group:l.label}))).find(l=>l.id===n);if(!a)return;const s=St(),o=v.doc.tracks.flatMap((l,u)=>s.includes(l.id)?[u]:[]);if(!v.moveTracks(o,a.id))return;N(),L();const r=o.length===1?v.doc.tracks[o[0]??0]?.name??"":`${o.length} tracks`;fe.show(xe,`${a.group} ${a.text.toLowerCase()}: ${r}`)}}}function hs(){const t=v.doc.tracks[Fe()];return{id:"pattern",title:"Pattern",lead:!0,summary:t?`${v.doc.tracks.length} tracks · ${t.name}`:`${v.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Oe==="stop",label:ui(Oe??"play"),...Oe==="join"?{ariaLabel:di}:{},onToggle:()=>Rn()},id:"grid",playhead:q()?xt:-1,selectedRow:t?.id,selectedRows:St(),onSelectRow:(e,n)=>{ld(e,n),L()},onDice:e=>{const n=v.doc.tracks[e]?.name??"Lane";v.diceLane(e)&&(N(),L(),fe.show(xe,`New ${n} steps`))},onFill:e=>{es=e,N(),L()},onClear:()=>{v.clearSteps()&&(N(),L(),fe.show(xe,"Pattern cleared"))},onLength:(e,n)=>{v.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(n))))}),N(),L()},onMute:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.mute=!a.mute)}),N(),L()},onSolo:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.solo=!a.solo)}),N(),L()},onToggle:(e,n,a)=>{v.edit(s=>{const o=s.tracks[e]?.steps[n];o&&(a?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),N(),L()},onLongPress:(e,n,a)=>{const s=v.doc.tracks[e],o=s?.steps[n];!s||!o||tl({anchor:a,title:`${s.name} · step ${n+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:l})=>{v.edit(u=>{const d=u.tracks[e]?.steps[n];d&&(d.on=!0,d.velocity=r,d.probability=l>=1?void 0:l)}),N(),L()}})},onSet:(e,n,a,s)=>{v.edit(o=>{const r=o.tracks[e]?.steps[n];r&&(a==="accent"?(r.accent=s,s&&(r.on=!0)):(r.on=s,s||(r.accent=!1)))}),N(),L()},rows:v.doc.tracks.map((e,n)=>({id:e.id,label:e.name,lane:n%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))},cd()]},dd()]}}function dd(){const t=Fe(),e=v.doc.tracks[t],n=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:t%4+1,controls:n.map(a=>{const s=mo(e?.voice,a);return{type:"slider",id:e?.voice==="shaker"?`shaker-${a}`:a,label:s.label,valueText:s.text(e?.params[a]??0),min:s.min,max:s.max,step:s.step,value:e?.params[a]??0,onChange:o=>{v.edit(r=>{const l=r.tracks[Fe()];l&&(l.params[a]=o)}),N(),L()}}})}}function gn(t,e){v.edit(n=>{const a=Qe(n.fx);e(a[t]),n.fx.hacks=a}),N(),L()}function ud(t,e){const n=Qe(v.doc.fx)[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,s=o=>gn(t,r=>{r.dials[e.key]=o});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>s(Number(o))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:Di(e,n,v.doc.bpm),onChange:s}}const Xt=(t,e)=>(oe(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>ud(t,n));function pd(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}function jn(){const t=v.doc.fx,e=Qe(t),n=t.mode==="lp"&&t.cutoff>=.999,a=o=>{v.edit(o),N(),L()},s=[e.filter&&!n?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:o=>a(r=>{r.fx.hacks={...Qe(r.fx),filter:o}}),controls:[{type:"select",id:"mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>a(r=>{(o==="lp"||o==="hp"||o==="bp")&&(r.fx.mode=o)})},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":pd(si(t.cutoff)),onChange:o=>a(r=>{r.fx.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Re(t.resonance),onChange:o=>a(r=>{r.fx.resonance=o})}],{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:o=>gn("drive",r=>{r.on=o}),controls:Xt("drive",!1),more:Xt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:o=>gn("compressor",r=>{r.on=o}),controls:Xt("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Qi}]}}await Fi();const ms=Sn(ps());await Tn();const Hn=Sn({id:"pattern",title:"Pattern",lead:!0}),Bn=Sn({id:"filter",title:jn().title}),fs={build:()=>Hn.update(hs())},gs={build:()=>Bn.update(jn())};let Tt=null;function L(){v.takeSurpriseEdit()&&fe.dismiss(),ms.update(ps()),Tt?.ready(fs)&&Hn.update(hs()),Tt?.ready(gs)&&Bn.update(jn()),Wc.follow(),Pt?.schedule()}window.addEventListener("pagehide",()=>Pt?.flush());function bn(t,e,n){j.cancel(),v.replace(t,e),N(),L(),Pt?.schedule(),fe.show(xe,n)}oc(Gc,{save:()=>{const t=v.doc.name||"rhythm",e=URL.createObjectURL(new Blob([ai(v.doc,v.bank)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`${t}.rhythm`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),0),se.say(`Saved ${t}.rhythm`)},load:(t,e)=>{const n=ii(t);if(!n.ok||!n.document||!n.bank){se.say(`Couldn't load ${e}: ${n.errors[0]??"not a Rhythm file"}`);return}bn(n.document,n.bank,`Loaded ${e}`)},create:()=>bn(vo(),Ja(),"New pattern"),panic:()=>Z?.port.postMessage({type:"panic"})});V?.providePreset?.(Hc(()=>({doc:v.doc,bank:v.bank}),(t,e)=>{bn(t,e,"Loaded the Scene's pattern"),Pt?.flush()}));let Da=z.transport.running;z.onChange(()=>{if(z.transport.running||(J=!1),z.transport.running&&!Da&&V&&(J=!Ic("petra-rhythm",me)),Da=z.transport.running,v.playing=q(),!v.playing&&j.pending){const t=j.drop();t&&us(t.slot)}v.doc.bpm=z.transport.bpm,N(),L(),Se()});$t()?.onAll(()=>{J&&(J=!1,z.transport.isPlayingAt(B())&&(ne=Math.ceil(z.transport.beatAt(B())/4-1e-9)*4),v.playing=q(),ze="",N(),L())});O.onSwing(t=>{$e()&&v.adoptSwing(t)&&N(),L()});O.onSnapshot(t=>{if(t.op!=="recall")return;const e=O.peers.get(t.from)?.app;if(!Lo(Mn,e,qc)){window.__ignoredRecalls?.push({slot:t.slot,app:e??null});return}window.__recalls?.push({slot:t.slot,atBeat:t.atBeat??null,shared:B()});const n=t.glide?.seconds??0;if(q()&&os(t.slot,n,t.atBeat)){L();return}j.cancel(),On(t.slot,n),N(),L()});O.onRole(()=>{In(),L(),Se()});O.onPeers(()=>{L(),Se()});G&&(window.__rhythm={setKick:t=>{v.edit(e=>{const n=e.tracks.find(a=>a.voice==="kick");n&&n.steps.forEach((a,s)=>{a.on=t.includes(s)})}),N(),L()},store:t=>je(t,"store"),tap:t=>je(t,"recall"),tempo:t=>fn(t),beat:()=>z.transport.beatAt(B()),timeAt:t=>z.transport.timeAt(t),slots:()=>({active:v.bank.active??null,queued:j.queued}),swing:()=>{const t=v.bank.active;return{live:v.liveSwing,doc:v.doc.swing,slot:t==null?null:v.bank.slots[t]?.swing??null,leader:O.isLeader}},setSwing:t=>{v.setSwing(t),et(!0),N(),L()},lateEnter:()=>{mn=!0},audio:async()=>(await zt(),await M?.resume(),M?.state??"none")});await Tn();await O.start();document.addEventListener("keydown",sd);ul(Cn,[ms,Hn,Bn],"adjacent");await Tn();L();Tt=hl([fs,gs]);Se();Tt.done.then(()=>{Pn.preload(),V&&zt().then(()=>{q()&&M?.state==="running"&&_n()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const t=q();if(t!==v.playing&&(v.playing=t,L()),un(),N(),!G||!M)return;const e=wc(M);e&&window.__stamps?.push(e)},250);
