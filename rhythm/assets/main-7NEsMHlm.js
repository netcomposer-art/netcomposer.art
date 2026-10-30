(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ge=1e-9;function Oi(n,e,t,a=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,a))}class Kt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Oi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const a=t.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+ge&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+ge)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+ge){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-ge;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,a,s=.25){const r=this.bpmAt(t);if(!(a>0)||!(s>0)){this.setTempoAt(e,t);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,t);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,t+a*(l-1)/o)}prune(e){let t=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(t=a);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new Kt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const a=this.segs[t-1];this.segs[t].time=a.time+(this.segs[t].beat-a.beat)*60/a.bpm}}segAtBeat(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].beat<=e+ge)return t[a];return t[0]}segAtTime(e){const t=this.segs;for(let a=t.length-1;a>0;a--)if(t[a].time<=e+ge)return t[a];return t[0]}}const Ri=Object.freeze({beatsPerBar:4,beatUnit:4}),xe=1e-9;function Ii(n){return Math.floor(n+xe)}function ha(n,e,t=!1){if(!(e>0))return n;const s=Math.ceil(n/e-xe)*e;return t&&s<=n+xe?s+e:s}class ji{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Kt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ri}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-xe&&(this.stopTime===null||e<this.stopTime-xe)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-xe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),a=Ii(e/t),s=Math.max(0,e-a*t);return{beat:e,bar:a,beatInBar:s,barPhase:s/t}}nextBar(e,t=!1){return ha(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ma="nc-clock/snapshot",fa=1;function Bi(n,e="local"){return{format:ma,version:fa,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function Fi(n,e){const t=qi(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function Di(n,e,t=n.timebase){const a=s=>s===null?null:s+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(s=>({...s})),meter:{...n.meter},startTime:a(n.startTime),stopTime:a(n.stopTime)}}const V=n=>typeof n=="number"&&Number.isFinite(n),Tn=n=>n===null||V(n);function qi(n){const e=n,t=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==ma&&t("format"),(!V(e.version)||Math.floor(e.version)!==fa)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!V(e.anchor.beat)||!V(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&V(a.beat)&&V(a.bpm)&&a.bpm>0))&&t("tempo"),(!e.meter||!V(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!V(e.meter.beatUnit))&&t("meter"),(!Tn(e.startTime)||!Tn(e.stopTime)||!V(e.stoppedBeat))&&t("transport times"),e}class Hi{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new ji(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,a){this.transport.start({at:e,beat:t,bpm:a}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const a=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){Fi(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Bi(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const Ui="nc-sync/1",Wi=1,Gi="nc-sync",Ki="nc-sync-leader",Vi=0,ga=.5,ba=.75;function Yi(n){return typeof n=="number"&&Number.isFinite(n)&&n>=ga&&n<=ba?n:null}const ft=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Ce=n=>typeof n=="number"&&Number.isFinite(n),Ue=n=>typeof n=="string"&&n.length>0;function Xi(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Wi||!Ue(e.type)||!Ue(e.from)||!Ce(e.term)||!Ce(e.seq)||!Ce(e.sentAt))return null;switch(e.type){case"hello":return Ue(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Ce(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Ce(e.slot)?e:null;case"ping":case"pong":return Ue(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Ji(n,e,t,a,s){return{proto:Ui,from:e,term:t,seq:a,sentAt:s,...n}}function F(){return(performance.timeOrigin+performance.now())/1e3}const gt=.003,Qi=3,Zi=.01,An=500;class es{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?Zi:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,a=e?.performanceTime??0;if(!(t>=gt&&a>0)||!Number.isFinite(t)||!Number.isFinite(a))return!1;const s=t-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),p=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!p&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&p===this.pendingBack&&(p||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,p))):(this.pendingStep=o,this.pendingBack=p,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,a){const s=this.ctx.currentTime,r=s<=this.revertUntil;let o;if(a&&r){const l=this.offsets,p=this.preStep;l.length=0;for(let c=0;c<p.length;c++)l.push(p[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,o={stepSeconds:this.preStepBase-t,confirmedAt:s,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,u=this.preStep;u.length=0;for(let m=0;m<c.length;m++)u.push(c[m]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?s+this.stepRevert:-1/0}const l=this.offsets,p=e-t;for(let c=0;c<l.length;c++)l[c]+=p;this.stepCount++,o={stepSeconds:e-t,confirmedAt:s,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(o);return!0}median(){const e=this.offsets,t=this.scratch,a=e.length;t.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}const s=a>>1;return a%2?t[s]:(t[s-1]+t[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const a=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(a&&Number.isFinite(a.contextTime)&&Number.isFinite(a.performanceTime)&&a.contextTime>=gt&&a.performanceTime>0)if(this.waitSince=null,a.contextTime===this.lastStampC&&a.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<An)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=a.contextTime,this.lastStampP=a.performanceTime,this.stampSince=this.perfNow(),t=a.contextTime-(this.timeOrigin+a.performanceTime)/1e3;else if(!a||!(a.contextTime>=gt)&&!(a.contextTime>0&&!(a.performanceTime>0))){if(a){const s=this.perfNow();if(this.waitSince===null&&(this.waitSince=s),s-this.waitSince<An)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Qi,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class ts{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...ft,...e.capabilities},this.channelOption=e.channel??Gi,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,a={}){this.send({type:"snapshot",op:e,slot:t,...a})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const a=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(a),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const p=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??ha(p,1),p);a&&a>0?(o.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),t=Math.min(t,a.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(ba,Math.max(ga,e)):Vi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=Yi(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const a of[...this.swingListeners])a(t)}}receive(e){const t=Xi(e);if(!t||t.from===this.id)return;const a=this.lastSeq.get(t.from);if(!(a!==void 0&&t.seq<=a)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const s=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...ft,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),s||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const s=this.peers.get(t.from);s?s.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...ft},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Ki,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,o,l)=>[r?0:1,o,l];let a=t(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[t.capabilities.prefersLeader?0:1,t.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(Ji(e,this.id,this.term,++this.seq,this.o.now()))}}const ns=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],X=10,ya=["1","2","3","4","5","6","7","8","9","0"];function wa(){return{slots:Array.from({length:X},()=>null),active:null}}function Vt(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function as(n,e,t){const a=n.slots.slice();return a[e]=Vt(t),{slots:a,active:e}}function is(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function En(n,e,t,a){const s=n.slots[e];return s?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:s.swing,fx:structuredClone(s.fx),tracks:structuredClone(s.tracks)},glideSeconds:a>0?a:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function ss(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=Vt(e),{slots:t,active:n.active}}const rs=16,os=[2,6,10,14],ls=[2,3,6,10,11,14],Mn=[0,2,4,6,8,10,12,14],cs=[2,6,10,14],ds=[1,3,7,9,11,15],us={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function re(){return Array.from({length:rs},()=>!1)}function ee(n,e,t,a=!1){const s=e+n()*(t-e);return a?Math.round(s):Math.round(s*100)/100}function bt(n,e,t){return ee(n,Math.max(0,e-t),Math.min(1,e+t))}function ps(n){const e=re();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],a=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[a]=!0),e}function hs(n){const e=re();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=os.filter(()=>n()<.22);for(const a of t.slice(0,2))e[a]=!0;return e}function ms(n,e){const t=re();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function fs(n,e){const t=re();let a=0;for(const s of ls)a>=3||n[s]||e()<.35&&(t[s]=!0,a+=1);return t}function gs(n){const e=re();let t=0;for(const a of cs){if(t>=2)break;n()<.4&&(e[a]=!0,t+=1)}return e}function bs(n,e){const t=re();for(const o of Mn)t[o]=!n[o];const a=Mn.filter(o=>t[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),p=a.splice(l,1)[0];p!==void 0&&(t[p]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(t[o]=!0,r+=1)}return t}function ys(n,e){const t=re(),a=n[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(t[r]=!0,s+=1)}return t}function ws(n,e,t){const a=re();let s=0;for(const r of ds)s>=2||n[r]||e[r]||t()<.35&&(a[r]=!0,s+=1);return a}function va(n,e,t){return Array.from({length:e},(a,s)=>{const r=n[s]===!0,o=r&&t(s);return{on:r,accent:o,velocity:o?1:.8}})}function ka(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function vs(n,e,t){const a=us[n];return{tune:ee(t,a.tune[0],a.tune[1],!0),decay:ee(t,a.decay[0],a.decay[1]),tone:bt(t,e.tone,.15),snap:bt(t,e.snap,.15),drive:bt(t,e.drive,.1),level:ee(t,a.level[0],a.level[1])}}function $a(n){const e=ps(n),t=hs(n),a=gs(n);return{kick:e,snare:t,clap:ms(t,n),rim:fs(e,n),hat:bs(a,n),hatOpen:a,tom:ys(t,n),metal:ws(e,t,n)}}function ks(n,e,t){const a=n.tracks[e];if(!a)return n;const s=l=>l.every((p,c)=>p.on===(a.steps[c]?.on??!1));let r=a.steps;for(let l=0;l<6;l++){const p=$a(t)[a.voice];if(r=va(p,a.length,c=>ka(a.voice,c)),!s(r)&&r.some(c=>c.on))break}const o=a.steps.slice(a.length);return{...n,tracks:n.tracks.map((l,p)=>p===e?{...l,steps:[...r,...o]}:l)}}function $s(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<t||r>=e.length)return s;const o=r-t;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function xs(n,e){const t=$a(e),a=e()<.4?.5:ee(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:a,fx:{...n.fx,mode:r,cutoff:ee(e,.55,.9),resonance:ee(e,.05,.3),drive:ee(e,.02,.18)},tracks:n.tracks.map(o=>({...o,mute:o.mute,solo:o.solo,params:vs(o.voice,o.params,e),steps:va(t[o.voice],o.length,l=>ka(o.voice,l))}))}}function Ss(n,e=Math.random){const t=[];let a=null;for(let r=0;r<X;r+=1){const o=Vt(xs(n,e));t.push(o),r===0&&(a=o)}const s=a?{...n,bpm:n.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:n;return{bank:{slots:t,active:0},document:s}}function Yt(n){return`${Math.round(n*100)}%`}function Ts(n){return Yt(n)}function As(n,e){return n==="tune"?`${Math.round(e)} Hz`:Yt(e)}function Es(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Lt=2,xa=64;function Ms(n,e){const{version:t,...a}=n,s={...a,version:Lt,slots:Array.from({length:X},(r,o)=>{const l=e.slots[o];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(s)}function Ln(n){return Array.isArray(n)&&n.length<=xa}function Ls(n){if(zs(n)>Ns)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==Xt)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==Lt)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const a=t.version,{slots:s,active:r,...o}=t,l=et({...o,version:Jt});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const p=l.document,c=[];for(const m of p.tracks)Ln(m.steps)||c.push(`More than ${xa} steps on ${m.id}`);const u={slots:Array.from({length:X},()=>null),active:null};return a===Lt&&(!Array.isArray(s)||s.length!==X?c.push(`Expected ${X} slots`):s.forEach((m,b)=>{if(m==null)return;if(!et({...p,swing:m.swing,fx:m.fx,tracks:m.tracks}).ok||!m.tracks.every(g=>Ln(g.steps))){c.push(`Slot ${b+1} is malformed`);return}const w=typeof m.seed=="number"&&Number.isFinite(m.seed)?m.seed>>>0:0;u.slots[b]={swing:m.swing,fx:m.fx,tracks:m.tracks,seed:w}}),r!=null&&(!Number.isInteger(r)||r<0||r>=X||!u.slots[r]?c.push("Active slot is empty or out of range"):u.active=r)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:p,bank:u,from:a}}const Cn={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},Nn=(n,e)=>{const t=n&&typeof n=="object"?n:{},a={...e.dials};for(const[s,r]of Object.entries(t.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof t.on=="boolean"?t.on:e.on,dials:a}};function Be(n){const e=n.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:Nn(e.drive,Cn.drive),compressor:Nn(e.compressor,Cn.compressor)}}function Sa(n){const e=Math.max(0,Math.min(1,n));return Math.min(2e4,40*2**(e*10))}const We=n=>Math.max(0,Math.min(100,n));function Cs(n){const e=Sa(n.cutoff),t=We(Math.max(0,Math.min(1,n.resonance))*100);return n.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:We(100*Math.log(e/20)/Math.log(100)),q:t}}:n.mode==="bp"?{type:"bandpass",dials:{centre_hz:We(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:t,mix:100}}:{type:"lowpass",dials:{cutoff:n.cutoff>=.999?0:We(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const Xt="netcomposer.rhythm",Jt=1,Ns=256*1024,Ta="netcomposer.rhythm.preset.",_s=new Set(ns);function Aa(n){return`${Ta}${n}`}function zs(n){let e=0;for(const t of n){const a=t.codePointAt(0)??0;a<=127?e+=1:a<=2047?e+=2:a<=65535?e+=3:e+=4}return e}function et(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==Xt&&e.push("Unknown format"),t.version!==Jt&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(Ta))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const a of t.tracks)_s.has(a.voice)||e.push(`Unknown voice ${a.voice}`),(!Number.isInteger(a.length)||a.length<1||a.length>64)&&e.push(`Bad length on ${a.id}`),(!Array.isArray(a.steps)||a.steps.length<a.length)&&e.push(`Steps shorter than length on ${a.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function Ea(n,e=[]){return Array.from({length:16},(t,a)=>({on:n.includes(a),accent:e.includes(a),velocity:e.includes(a)?1:.8}))}const Ps={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function Ma(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:Xt,version:Jt,id:Aa("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Ea(e.on,e.accent),params:{...Ps[e.voice]}}))}}function Os(){const n=Ma();return{...n,id:Aa("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:Ea([])}))}}const Rs="Tap to join",La="Tap to join the playing beat";function Xe(n,e){return n&&e?"join":e?"stop":"play"}function Ca(n){return n==="join"?Rs:n==="stop"?"Stop":"Play"}function Is(n,e,t={}){const a=t.beatsPerBar??4,s=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+s)/a-1e-9)*a)}class js{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=Xe(e,t),this.shown}gesture(e,t,a=!1){return this.joinedBy=!1,a||this.joining||Xe(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const a=this.joinedBy||this.joining||Xe(e,t)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=Is(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class Bs{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const a=this.key(e);if(this.value=e,this.has=!0,!t&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class Qt{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??Na(t,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new Qt;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Na(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class Fs{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const p=this.meanInterval();return p===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/p)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const _a=globalThis,Ds="linkslots",qs=new Set(["0","false","off","no"]);function Hs(n,e=_a.location?.search??"",t=Ws()){const a=new URLSearchParams(e).get(Ds);if(a!==null)return!qs.has(a.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function Us(n,e,t){return t||e===n}function Ws(){try{return _a.localStorage??null}catch{return null}}const Gs="nc-ui",Ks={breakpoint:{md:"768px"}},za={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Ct={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},te={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Pe=n=>`--${Gs}-${n}`,Nt=za["label-on-fill-dark"],_n=za["label-on-fill-light"],Vs=te["label-min-contrast"],Ys=/^#[0-9a-f]{6}$/i,Xs=n=>typeof n=="string"&&Ys.test(n),Je=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function zn(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const a=e*Math.min(t,1-t),s=r=>{const o=(r+n/30)%12;return t-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${Je(s(0)*255)}${Je(s(8)*255)}${Je(s(4)*255)}`}function Pa(n){const[e,t,a]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),s=Math.max(e,t,a),r=Math.min(e,t,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const p=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((t-a)/l%6):s===t?60*((a-e)/l+2):60*((e-t)/l+4))+360)%360,s:p,l:o}}function Pn(n){const[e,t,a]=[1,3,5].map(s=>{const r=parseInt(n.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*a}function _t(n,e){const[t,a]=[Pn(n),Pn(e)].sort((s,r)=>r-s);return(t+.05)/(a+.05)}const tt=n=>_t(n,Nt)>=_t(n,_n)?Nt:_n;function Oa(n,e,t,a=Vs){let s=zn(n,e,t);const r=tt(s)===Nt?1:-1;for(let o=0;o<40&&_t(s,tt(s))<a;o++)t+=r*.01,s=zn(n,e,t);return s}function Js(n){const{h:e,s:t}=Pa(n),a=Oa(e,Math.min(t,te["surprise-on-max-saturation"]),te["surprise-on-lightness"]);return{fill:n,ink:tt(n),on:a,onInk:tt(a)}}const Qs=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function Zs(n,e=Math.random){const[t,a]=te["surprise-saturation"],[s,r]=te["surprise-lightness"],o=te["surprise-min-hue-gap"],l=Xs(n)?Pa(n).h:null;let p=e()*360;return l!==null&&Qs(p,l)<o&&(p=(l+o+e()*(360-2*o))%360),Oa(p,t+e()*(a-t),s+e()*(r-s))}function er(n){if(!n)return null;const e=Js(n);return{[Pe("surprise-fill")]:e.fill,[Pe("surprise-ink")]:e.ink,[Pe("surprise-on")]:e.on,[Pe("surprise-on-ink")]:e.onInk}}const tr=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,nr=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function On(n){const[e,t,a]=[1,3,5].map(l=>tr(parseInt(n.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function ar([n,e,t]){const a=(n+.3963377774*e+.2158037573*t)**3,s=(n-.1055613458*e-.0638541728*t)**3,r=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>Je(nr(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const ir=te["velocity-range"],Ra={min:Ct.rhythm["velocity-min"],max:Ct.rhythm["velocity-max"]};function sr(n,e=Ra){const[t,a]=ir,s=Number.isFinite(n)?Math.max(t,Math.min(a,n)):t,r=(s-t)/(a-t),o=Ct.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=On(e.min),p=On(e.max);return{velocity:s,t:r,fill:ar(l.map((c,u)=>c+(p[u]-c)*r)),ink:o}}function Rn(n,e=Ra){return{[Pe("velocity-fill")]:sr(n,e).fill}}const rr=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],or={renames:rr},lr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},cr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},dr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ot={};for(const[n,e]of Object.entries(lr))ot[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(dr))ot[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(cr))ot[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(or.renames.map(n=>[n.old,n.new]));function Ia(n){const e=ot[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function j(n){return Ia(n).prop}function i(n){return`var(${j(n)})`}function ur(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(j(e)));return Number.isFinite(t)?t:0}function U(n,e){const t=Ia(e),a=n.ownerDocument??document,s=a.createElement("span");s.dataset.ncLive=e,s.style.position="absolute",s.style.pointerEvents="none";const r=`var(${t.prop})`;t.kind==="family"?s.style.fontFamily=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?s.style.paddingLeft=r:s.style.color=r,(n instanceof Element?n:a.documentElement).append(s);const p=(a.defaultView??window).getComputedStyle(s),c=t.kind==="family"?p.fontFamily:t.kind==="color"?p.color:p.paddingLeft;return s.remove(),c}function pr(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function hr(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=i("font-ui"),t.style.fontSize=i("label-size"),t.style.fontWeight=i("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const s=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),s}const mr="[data-modulated], [data-modulated] *";function fr(){const n=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${j("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${j("divider")}: ${i(`module-div-stack-${a}`)};
      ${j("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,t=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
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
${mr} { transition: none; }
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
`}let yt=null;const gr="nc-ui-fallback";function ja(n=globalThis.document){if(!n?.documentElement||(n.documentElement,yt&&yt.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${gr} {
${fr()}
}
`,n.head.append(e),yt=e}function Ba(n={}){const e=n.doc??globalThis.document,t=e.createElement("button");t.type="button",t.className="nc-ui-switch",t.setAttribute("role","switch"),n.id&&(t.id=n.id),n.labelledBy?t.setAttribute("aria-labelledby",n.labelledBy):n.label&&t.setAttribute("aria-label",n.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=n.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=n.offText??"Off",a.append(s,r),t.append(a);let o=!1;const l=c=>{o=c===!0,t.setAttribute("aria-checked",o?"true":"false")};l(n.checked);const p=()=>{l(!o),n.onChange?.(o)};return t.addEventListener("click",p),{el:t,get checked(){return o},set:l,destroy(){t.removeEventListener("click",p),t.remove()}}}const Fa=new WeakMap,In=.25;function br(n){const e=n.doc??globalThis.document,t=e.createElement("div");t.className="nc-fader",t.tabIndex=0,t.setAttribute("role","slider"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),t.append(a,s);let r=0,o=n.step??.005,l=n.onChange,p=n.onReset;const c=d=>Math.min(1,Math.max(0,d)),u=()=>{t.style.setProperty("--fader-pos",String(r)),t.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},m=d=>{const h=c(d);h!==r&&(r=h,u(),l?.(h))};let b=0,f=!1;t.addEventListener("pointerdown",d=>{if(d.button!==0)return;d.preventDefault(),t.focus?.({preventScroll:!0});const h=t.getBoundingClientRect();d.target!==s&&h.height>0&&m(1-(d.clientY-h.top)/h.height),b=d.clientY,f=!0,t.dataset.dragging="true",t.setPointerCapture?.(d.pointerId)}),t.addEventListener("pointermove",d=>{if(!f)return;const h=t.getBoundingClientRect().height||1,v=(b-d.clientY)/h*(d.shiftKey?In:1);b=d.clientY,m(r+v)});const w=()=>{f=!1,delete t.dataset.dragging};t.addEventListener("pointerup",w),t.addEventListener("pointercancel",w),t.addEventListener("lostpointercapture",w),t.addEventListener("dblclick",d=>{d.preventDefault(),p?.()}),t.addEventListener("keydown",d=>{const h=d.shiftKey?o*In:o,v={ArrowUp:r+h,ArrowRight:r+h,ArrowDown:r-h,ArrowLeft:r-h,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};d.key in v&&(d.preventDefault(),m(v[d.key]))});const g={el:t,get value(){return r},get dragging(){return f},set(d){f||(r=c(Number(d)||0),u())},setText(d){d?t.setAttribute("aria-valuetext",d):t.removeAttribute("aria-valuetext")},setLabel(d){t.setAttribute("aria-label",d)},configure(d){typeof d.step=="number"&&d.step>0&&(o=d.step),d.onChange&&(l=d.onChange),d.onReset&&(p=d.onReset)}};return g.setLabel(n.label),g.set(n.value??0),g.setText(n.valueText),Fa.set(t,g),g}function yr(n){return Fa.get(n)}const Da=new WeakMap,wr=.2,vr=1.5,kr=.5;function $r(n,e){const t=String(n??"").trim(),a=Number.parseFloat(t);return Number.isFinite(a)?t.endsWith("ms")?a/1e3:a:e}function jn(n,e,t){const a=n.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?t:$r(a.getComputedStyle(n).getPropertyValue(j(e)),t)}function xr(n){const e=n.doc??globalThis.document,t=n.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(t);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let g=0;g<t;g++){const d=e.createElement("span");d.className="nc-meter-bar";const h=e.createElement("span");h.className="nc-meter-peak";const v=e.createElement("span");v.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",d.append(h,v,k),r.append(d),o.push({peak:h,rms:v,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=n.label,p=n.onClear,c=!1,u=-1,m=-1;const b=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},f=(g,d,h,v)=>{const k=Math.round(v*1e3)/1e3;h[d]!==k&&(h[d]=k,g.style.transform=d==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{w.clear(),p?.()});const w={el:a,get clipped(){return c},update(g,d){u<0&&(u=jn(a,"motion-meter-fall",wr)),m<0&&(m=jn(a,"motion-meter-hold",vr));const h=Math.max(0,Math.min(.25,Number(d)||0)),v=u>0?Math.exp(-h/u):0;o.forEach((k,S)=>{const y=g[S]??g[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(y.peak)||0)),T=Math.min(x,Math.max(0,Number(y.rms)||0));y.over&&w.clip(),k.level.peak=x>=k.level.peak?x:x+(k.level.peak-x)*v,k.level.rms=T>=k.level.rms?T:T+(k.level.rms-T)*v,k.holdAge+=h,x>=k.holdAt?(k.holdAt=x,k.holdAge=0):k.holdAge>m&&(k.holdAt=Math.max(x,k.holdAt-kr*h)),f(k.peak,"peak",k.shown,k.level.peak),f(k.rms,"rms",k.shown,k.level.rms),f(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(const g of o)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,f(g.peak,"peak",g.shown,0),f(g.rms,"rms",g.shown,0),f(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,b()},configure(g){g.onClear&&(p=g.onClear)}};return b(),w.reset(),Da.set(a,w),w}function Sr(n){return n?Da.get(n):void 0}function Tr(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),a=n.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(t*a));(n.width!==s||n.height!==r)&&(n.width=s,n.height=r);const o=n.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:t}}function wt(n){return Math.max(0,Math.min(1,n))}function qa(n,e){const{ctx:t,w:a,h:s}=Tr(n);if(!t)return;t.clearRect(0,0,a,s);const r=hr(n);if(e.paint==="swatch"){const p=U(n,"accent"),c=U(n,"rhythm.step-cell-on");n.dataset.ncAccent=p,n.dataset.ncStep=c,t.fillStyle=p,t.fillRect(0,0,a/2,s),t.fillStyle=c,t.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const p=e.mode??"lp",c=U(n,pr(p)),u=U(n,"divider"),m=wt(e.cutoff??.5),b=.08+(1-wt(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,s*.72),t.lineTo(a,s*.72),t.stroke(),t.beginPath();for(let f=0;f<=a;f++){const w=f/Math.max(1,a);let g=0;p==="lp"?g=w<m?1:Math.max(0,1-(w-m)/b):p==="hp"?g=w>m?1:Math.max(0,1-(m-w)/b):g=Math.max(0,1-Math.abs(w-m)/b);const d=s*.78-g*s*.62;f===0?t.moveTo(f,d):t.lineTo(f,d)}t.strokeStyle=c,t.stroke(),t.fillStyle=U(n,"text-sub"),t.font=r,t.fillText(p.toUpperCase(),0,s),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=U(n,"accent"),t.beginPath();const p=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const u=c/Math.max(1,a),m=(s-4)*(1-Math.exp(-u*4/p));t.lineTo(c,s-m)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const p=wt(e.level??0);t.fillStyle=U(n,"divider"),t.fillRect(0,s*.4,a,s*.2),t.fillStyle=U(n,"accent"),t.fillRect(0,s*.4,a*p,s*.2),n.dataset.ncAccent=t.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;t.fillStyle=U(n,"rhythm.step-cell-off"),t.fillRect(0,s*.45,a,s*.1),t.fillStyle=U(n,"rhythm.playhead"),t.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),n.dataset.ncAccent=U(n,"accent")}const Ha={slop:8,longPressMs:500,pitchPx:16};class Ar{constructor(e,t,a=Ha){this.hit=e,this.emit=t,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,a,s){if(this.phase!=="idle")return!1;const r=this.hit(t,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,a,s){if(e!==this.pointer)return;const r=t-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Er(n,e,t,a=Ha){let s=!1,r=0;const o=(c,u)=>{const b=n.ownerDocument.elementFromPoint?.(c,u),f=[...n.querySelectorAll(e)],w=b?f.findIndex(h=>h===b||h.contains(b)):-1;if(w>=0)return w;let g=-1,d=Number.POSITIVE_INFINITY;return f.forEach((h,v)=>{if(h.hidden)return;const k=h.getBoundingClientRect();if(u<k.top||u>k.bottom)return;const S=Math.abs(c-(k.left+k.width/2));S<d&&S<=k.width&&(g=v,d=S)}),g},l=new Ar(o,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),t(c)},a),p=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(p(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&p())}),n.addEventListener("pointerup",c=>{p(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{p(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}function B(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function lt(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const a=document.createElement("label");a.className="nc-label",a.htmlFor=n,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",t.append(a,s),t}function Bn(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Fe(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const Mr=450,Fn=8;function ne(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Lr(n){const e=ur(n,"target-min");return e>0?e:44}function Cr(n){if(!(n instanceof HTMLElement))return;const e=[...n.querySelectorAll(".nc-hit")],t=Lr(n),a=t/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=t&&l.height>=t){o.style.display="none";continue}const p=l.left+l.width/2,c=l.top+l.height/2;let u=p-a,m=p+a,b=c-a,f=c+a;for(let w=0;w<e.length;w++){if(r===w)continue;const g=s[w];if(!g||g.width===0)continue;const d=g.left+g.width/2,h=g.top+g.height/2;Math.abs(h-c)<a*2&&(d>p?m=Math.min(m,(p+d)/2):d<p&&(u=Math.max(u,(p+d)/2))),Math.abs(d-p)<a*2&&(h>c?f=Math.min(f,(c+h)/2):h<c&&(b=Math.max(b,(c+h)/2)))}u=Math.min(u,l.left),m=Math.max(m,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),o.style.left=`${u-l.left}px`,o.style.top=`${b-l.top}px`,o.style.width=`${Math.max(0,m-u)}px`,o.style.height=`${Math.max(0,f-b)}px`,o.style.transform="none"}}function Ua(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Dn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function nt(n,e){switch(n.type){case"slider":return Nr(n,e);case"select":return zr(n,e);case"toggle":return Pr(n,e);case"button":return Or(n,e);case"readout":return Rr(n);case"label":return Ir(n);case"note":return qn(n);case"knob":return Fr(n,e);case"choice":return Dr(n,e);case"slotRow":return qr(n,e);case"stepGrid":return Gr(n,e);case"canvas":return Yr(n);case"fx":return Zr(n,e);case"strip":return Xr(n,e);case"stripAdd":return Qr(n,e);default:return qn({id:"unknown",text:""})}}function ie(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),a=n.querySelector("label");a&&(a.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Wa(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const s=n.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??Fe(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),Bn(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")Bn(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&jr(t,e);const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Fe(e.value))}else if(e.type==="choice")Ga(n,e);else if(e.type==="slotRow")Va(n,e);else if(e.type==="stepGrid")zt(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&qa(t,e)}else if(e.type==="strip"){Qa(n,e);for(const t of e.sends??[]){const a=n.querySelector(`[data-nc-id="${Xn(t.id)}"]`);a instanceof Element&&ie(a,{...t,type:"knob"})}}else if(e.type==="stripAdd")Xa(n,e);else if(e.type==="fx"){Za(n,e);for(const t of[...e.controls,...e.more??[]]){const a=n.querySelector(`[data-nc-id="${Xn(t.id)}"]`);a instanceof Element&&ie(a,t)}}}}function Nr(n,e){const t=lt(n.id,n.label);t.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=n.id,a.min=String(n.min),a.max=String(n.max),a.step=String(n.step),a.value=String(n.value),a.disabled=n.disabled===!0,a.dataset.ncId=n.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=t.querySelector("[data-nc-readout]");return t.insertBefore(a,s),n.onTap&&t.insertBefore(_r(n,a,e),s),t.append(B()),ie(t,n),t}function _r(n,e,t){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=n.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),a.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ne());const s=r=>{const o=t(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function zr(n,e){const t=lt(n.id,n.label),a=document.createElement("select");a.className="nc-select",a.id=n.id,a.dataset.ncId=n.id;for(const s of n.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=n.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),t.append(a,B()),t}function Pr(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const a=e(t);a?.type==="toggle"&&a.onPress()}),t.append(B()),ie(t,n),t}function Or(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const r=e(t);r?.type==="button"&&r.onPress()}),t.append(B()),ie(t,n),!n.onSparkle)return t;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=n.id,s.setAttribute("aria-label","Surprise me"),s.title=n.sparkleTitle??"Surprise me",s.innerHTML=Ua(),s.addEventListener("click",()=>{const r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Ya(r);const o=e(t);o?.type==="button"&&o.onSparkle?.()}),a.append(t,s),a}function Rr(n){const e=lt(n.id,n.label);return e.append(B()),ie(e,n),e}function Ir(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(B()),e}function qn(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(B()),e}function Hn(n){if(typeof n.valueText=="string")return n.valueText;const e=Fe(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Wa(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function jr(n,e){const t=e.max-e.min||1,a=(e.value-e.min)/t;Wa(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(a*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",Hn(e)),n.setAttribute("aria-label",e.ariaLabel??e.label),n.title=`${e.ariaLabel??e.label}: ${Hn(e)}`}function Br(n,e){const t=n.max-n.min||1,a=typeof n.step=="number"&&n.step>0?n.step:t/100,s=e.shiftKey?a/10:a;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+a*10:e.key==="PageDown"?n.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-s:null}function Fr(n,e){const t=lt(n.id,n.label);n.compact&&(t.dataset.ncCompact="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=n.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",p=>{r=p.clientY;const c=e(a);o=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(p.pointerId)}),a.addEventListener("pointermove",p=>{if(a.hasPointerCapture&&!a.hasPointerCapture(p.pointerId))return;const c=e(a);if(c?.type!=="knob")return;const u=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,o-(p.clientY-r)*u/120));c.onChange(m)}),a.addEventListener("dblclick",()=>{const p=e(a);p?.type==="knob"&&typeof p.defaultValue=="number"&&p.onChange(p.defaultValue)}),a.addEventListener("keydown",p=>{const c=e(a);if(c?.type!=="knob")return;const u=Br(c,p);u!==null&&(p.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(a,l),t.append(B()),ie(t,n),t}function Dr(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const a of n.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(t);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...t.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let p=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")p=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")p=(l-1+o.length)%o.length;else if(r.key==="Home")p=0;else if(r.key==="End")p=o.length-1;else return;const c=o[p];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),t.append(s)}return t.append(B()),Ga(t,n),t}function Ga(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const a=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",a?"true":"false"),t.tabIndex=a?0:-1}}function qr(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){const m=n.slots[u],b=document.createElement("span");b.className="nc-snap-wrap";const f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=m.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,ne()),Hr(b,f,t,u,e),a.append(b)}const s=n.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Ua(),s.append(ne()),s.addEventListener("click",()=>{Ya(t);const u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const p=document.createElement("span");p.className="nc-readout nc-morph-readout",p.dataset.ncMorph="",r.append(o,p,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),t.append(c,r,B()),Ka(t,e),Va(t,n),t}function Un(n,e,t,a){const s=t(n);if(s?.type!=="slotRow")return;Oe(n);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function Hr(n,e,t,a,s){let r=0,o=0,l=0,p=!1,c=!1,u=!1,m=!1;const b=()=>{window.clearTimeout(r),r=0},f=h=>{const v=h.clientX-o,k=h.clientY-l;v*v+k*k>Fn*Fn&&(p=!0,b())},w=()=>{m&&(m=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",d))},g=h=>{const v=r!==0&&!p&&!c;b(),w(),v&&(u=!0,Un(t,a,s,h))},d=()=>{p=!0,b(),w()};n.addEventListener("pointerdown",h=>{h.button===0&&(w(),c=!1,p=!1,u=!1,o=h.clientX,l=h.clientY,b(),r=window.setTimeout(()=>{r=0,!p&&(c=!0,Ur(t,e,a,s))},Mr),m=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",d))}),n.addEventListener("contextmenu",h=>h.preventDefault()),n.addEventListener("click",h=>{if(u||c||p){u=!1,c=!1,p=!1;return}Un(t,a,s,h)})}function Ka(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const a=Wn("Save","store"),s=Wn("Clear","clear");t.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),Oe(n)}),r.addEventListener("click",o=>o.stopPropagation()),n.append(r,t),t.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const p=e(n);if(p?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(p.onSlot(c,"store"),Oe(n)):l.dataset.ncSlotOp==="clear"&&(p.onSlot(c,"clear"),Oe(n))}),n.addEventListener("keydown",o=>{o.key==="Escape"&&Oe(n)})}function Wn(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Ur(n,e,t,a){Ka(n,a);const s=n.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(t);const o=n.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function Oe(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Va(n,e){for(const s of n.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const a=n.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Ya(n){const e=n.dataset.ncLastFill||null,t=Zs(e);n.dataset.ncLastFill=t;const a=er(t);if(a)for(const[s,r]of Object.entries(a))n.style.setProperty(s,r)}function Wr(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,t.setAttribute("aria-pressed",r?"true":"false");const o=e(n);o?.type==="stepGrid"&&o.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>s(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function Gr(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=d=>{const h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=d,a.append(h),h},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=d=>{for(const h of[r,o]){const v=h===d;h.setAttribute("aria-checked",v?"true":"false"),h.tabIndex=v?0:-1}};l(r);for(const d of[r,o])d.addEventListener("click",()=>l(d));a.addEventListener("keydown",d=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(d.key))return;d.preventDefault();const h=o.getAttribute("aria-checked")==="true"?r:o;l(h),h.focus()});const p=document.createElement("div");p.className="nc-step-tools",p.append(a),n.onFill&&p.append(Wr(t,e)),t.append(p);for(const d of n.rows){const h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";const v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=d.label,v.setAttribute("aria-label",`Select ${d.label}`),d.lane&&(v.dataset.ncLane=String((d.lane-1)%4+1)),v.addEventListener("click",()=>{const y=e(t);if(y?.type!=="stepGrid")return;const x=y.rows.findIndex(T=>T.id===d.id);y.onSelectRow?.(x)}),v.addEventListener("keydown",y=>Kr(t,v,y));const k=[];for(const y of["mute","solo"]){if(!(y==="mute"?n.onMute:n.onSolo))continue;const T=document.createElement("span");T.className="nc-ms-wrap";const E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=y,E.textContent=y==="mute"?"M":"S",E.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${d.label}`),T.append(E,ne()),T.addEventListener("click",()=>{const _=e(t);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(oe=>oe.id===d.id);(y==="mute"?_.onMute:_.onSolo)?.(W)}),k.push(T)}const S=document.createElement("div");S.className="nc-steps";for(let y=0;y<d.steps.length;y++){const x=document.createElement("span");x.className="nc-step-wrap";const T=document.createElement("button");T.type="button",T.className="nc-step",T.dataset.ncStep=`${d.id}:${y}`,T.setAttribute("aria-label",`${d.label} step ${y+1}`),x.append(T,ne()),x.addEventListener("click",E=>{const _=e(t);if(_?.type!=="stepGrid")return;const W=_.rows.findIndex(fe=>fe.id===d.id),oe=o.getAttribute("aria-checked")==="true";_.onToggle(W,y,E.shiftKey||oe)}),S.append(x)}if(n.onLength&&S.append(Vr(t,S,d,e)),h.append(...k,v,S),n.onDice){const y=document.createElement("button");y.type="button",y.className="nc-sparkle nc-row-dice",y.dataset.ncDice=d.id,y.setAttribute("aria-label",`Re-roll ${d.label}`),y.title=`Re-roll ${d.label}: new steps for this lane (Undo takes it back)`,y.innerHTML=Dn(),y.append(ne()),y.addEventListener("click",()=>{const x=e(t);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(T=>T.id===d.id))}),h.append(y)}h.addEventListener("click",y=>{if(y.target!==h)return;const x=e(t);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(T=>T.id===d.id))}),Gn(t,S,".nc-step-wrap",e,o,()=>d.id),t.append(h)}const c=document.createElement("div");c.className="nc-pads-head";const u=(d,h,v)=>{const k=document.createElement("button");return k.type="button",k.className=d,k.textContent=h,v&&k.setAttribute("aria-label",v),k},m=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),f=document.createElement(n.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),n.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{const d=e(t);d?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",zt(t,d))}));for(const[d,h]of[[m,-1],[b,1]])d.addEventListener("click",()=>{const v=e(t);if(v?.type!=="stepGrid"||v.rows.length===0)return;const k=v.rows.length;v.onSelectRow?.(((Ge(v)+h)%k+k)%k)});if(c.append(m,f,b),n.onDice){const d=u("nc-pads-step nc-pads-dice","","Re-roll lane");d.dataset.ncPadsDice="",d.innerHTML=Dn(),d.addEventListener("click",()=>{const h=e(t);if(h?.type!=="stepGrid")return;const v=Ge(h);v>=0&&h.onDice?.(v)}),c.append(d)}if(n.transport){const d=u("nc-pads-play","Play");d.dataset.ncPadsPlay="",d.addEventListener("click",()=>{const h=e(t);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(d)}t.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const g=Math.max(0,...n.rows.map(d=>d.steps.length));for(let d=0;d<g;d++){const h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(d),h.textContent=String(d+1),h.addEventListener("click",v=>{const k=e(t);if(k?.type!=="stepGrid")return;const S=Ge(k);if(S<0)return;if(t.dataset.ncLenMode==="true"){k.onLength?.(S,d+1);return}const y=o.getAttribute("aria-checked")==="true";k.onToggle(S,d,v.shiftKey||y)}),w.append(h)}return Gn(t,w,".nc-pad",e,o,()=>{const d=e(t);return d?.type==="stepGrid"?d.rows[Ge(d)]?.id:void 0}),t.append(w),t.append(B()),zt(t,n),t}function Ge(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function Gn(n,e,t,a,s,r){let o="on",l=!0,p=-1;const c=(u,m)=>{const b=u.rows[p]?.steps[m];!b||m>=u.rows[p].length||(u.onSet?u.onSet(p,m,o,l):!!b[o]!==l&&u.onToggle(p,m,o==="accent"))};Er(e,t,u=>{const m=a(n);if(m?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const b=m.rows.findIndex(f=>f.id===r());b>=0&&m.rows[b].length!==u.pad+1&&m.onLength?.(b,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const b=r();p=m.rows.findIndex(w=>w.id===b);const f=m.rows[p]?.steps[u.pad];if(!f)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[o]}c(m,u.pad)}else if(u.kind==="long"){const b=r(),f=m.rows.findIndex(g=>g.id===b),w=e.querySelectorAll(t)[u.pad];f>=0&&w instanceof HTMLElement&&m.onLongPress?.(f,u.pad,w)}}})}function Kr(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const a=[...n.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;t.key==="ArrowDown"?r=s+1:t.key==="ArrowUp"?r=s-1:t.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(t.preventDefault(),o.focus(),o.click())}function Vr(n,e,t,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(t.steps.length)),s.append(ne());const r=c=>{const u=a(n);if(u?.type!=="stepGrid")return;const m=u.rows.findIndex(w=>w.id===t.id),b=u.rows[m];if(!b)return;const f=Math.max(1,Math.min(b.steps.length,c));f!==b.length&&u.onLength?.(m,f)},o=c=>{const u=[...e.querySelectorAll(".nc-step")];let m=1;return u.forEach((b,f)=>{const w=b.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(m=f+1)}),m},l=c=>r(o(c.clientX)),p=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",p),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",p),window.addEventListener("pointercancel",p))}),s.addEventListener("keydown",c=>{const u=a(n);if(u?.type!=="stepGrid")return;const m=u.rows.find(f=>f.id===t.id);if(!m)return;const b={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),s}const vt=new WeakMap;function Kn(n,e){const t=typeof e=="number"?e:null;if(!(vt.has(n)&&vt.get(n)===t)){if(vt.set(n,t),t===null){for(const a of Object.keys(Rn(1)))n.style.removeProperty(a);return}for(const[a,s]of Object.entries(Rn(t)))n.style.setProperty(a,s)}}function zt(n,e){const t=e.rows.some(c=>c.solo),a=n.querySelector(".nc-pads"),s=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=n.querySelector(".nc-pads-label"),o=n.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&s&&(r.textContent=o?`${s.label} · ${s.length}`:s.label,e.onLength&&(r.setAttribute("aria-pressed",o?"true":"false"),r.setAttribute("aria-label",o?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));const l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&s&&(l.setAttribute("aria-label",`Re-roll ${s.label}`),l.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);const p=n.querySelector("[data-nc-pads-play]");if(p instanceof HTMLElement){const c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");p.textContent!==u&&(p.textContent=u),p.setAttribute("aria-pressed",c?"true":"false");const m=e.transport?.ariaLabel;m?p.setAttribute("aria-label",m):p.removeAttribute("aria-label")}if(a instanceof HTMLElement&&s){a.setAttribute("aria-label",`${s.label} steps`),s.lane&&(a.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||t&&!s.solo?a.dataset.silent="true":delete a.dataset.silent;const c=s.length>0?(e.playhead%s.length+s.length)%s.length:-1;for(const u of a.querySelectorAll("[data-nc-pad]")){const m=Number(u.getAttribute("data-nc-pad")),b=s.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!b||!o&&m>=s.length,o&&m>=s.length?u.dataset.out="true":delete u.dataset.out,o&&m===s.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${s.label} step ${m+1}`),u.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?u.dataset.accent="true":delete u.dataset.accent,b?.dim?u.dataset.dim="true":delete u.dataset.dim,Kn(u,b?.velocity),e.playhead>=0&&m===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(const c of e.rows){for(let f=0;f<c.steps.length;f++){const w=c.steps[f],g=n.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;const d=g.closest(".nc-row");if(d instanceof HTMLElement){e.selectedRow===c.id?d.dataset.selected="true":delete d.dataset.selected;const k=d.querySelector(".nc-name");k instanceof HTMLElement&&k.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?d.dataset.silent="true":delete d.dataset.silent;for(const y of d.querySelectorAll("[data-nc-ms]")){const x=y.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;y.setAttribute("aria-pressed",x?"true":"false")}}g.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?g.dataset.accent="true":delete g.dataset.accent,w.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof w.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Kn(g,w.velocity);const h=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===h?g.dataset.playhead="true":delete g.dataset.playhead;const v=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!v,f>=c.length&&v?g.dataset.out="true":delete g.dataset.out}const u=n.querySelector(`[data-nc-len="${c.id}"]`),b=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&b&&b.nextElementSibling!==u){const f=document.activeElement===u;b.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Yr(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=n.id,a.dataset.ncPaint=n.paint,e.append(t,a,B()),e}function Xr(n,e){const t=document.createElement("div");t.className="nc-strip",t.dataset.ncId=n.id,t.setAttribute("role","group"),t.setAttribute("aria-label",n.label),n.master&&(t.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");if(s.className="nc-strip-name",s.dataset.ncStripName="",a.append(s),n.onRemove){const f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{const w=e(t);w?.type==="strip"&&w.onRemove?.(f)}),a.append(f)}const r=document.createElement("div");r.className="nc-strip-ms";for(const f of["mute","solo"]){if(!(f==="mute"?n.onMute:n.onSolo))continue;const g=document.createElement("span");g.className="nc-ms-wrap";const d=document.createElement("button");d.type="button",d.className="nc-ms",d.dataset.ncMs=f,d.textContent=f==="mute"?"M":"S",g.append(d,ne()),g.addEventListener("click",()=>{const h=e(t);h?.type==="strip"&&(f==="mute"?h.onMute:h.onSolo)?.()}),r.append(g)}const o=document.createElement("div");o.className="nc-strip-sends";for(const f of n.sends??[])o.append(nt({...f,type:"knob",compact:!0},e));const l=document.createElement("div");l.className="nc-strip-body";const p=document.createElement("span");p.className="nc-scale",p.setAttribute("aria-hidden","true");for(const f of n.ticks??[]){const w=document.createElement("span");w.className="nc-scale-tick",w.style.setProperty("--tick-pos",String(f.value)),w.textContent=f.label,p.append(w)}const c=br({label:`${n.label} level`,value:n.value,step:n.step,valueText:n.valueText,onChange:f=>{const w=e(t);w?.type==="strip"&&w.onChange(f)},onReset:()=>{const f=e(t);f?.type==="strip"&&Yn(f)}}),u=xr({channels:n.channels===2?2:1,label:n.label,onClear:()=>{const f=e(t);f?.type==="strip"&&f.onClipClear?.()}});l.append(p,c.el,u.el);const m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;return m.addEventListener("click",f=>{const w=e(t);w?.type!=="strip"||!w.onTypeIn||(window.clearTimeout(b),f.detail===0?Vn(t,m,e):f.detail===1&&(b=window.setTimeout(()=>Vn(t,m,e),Jr)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);const f=e(t);f?.type==="strip"&&Yn(f)}),t.append(a,r,o,l,m,B()),Qa(t,n),t}const Jr=250;function Vn(n,e,t){const a=t(n);if(a?.type!=="strip"||!a.onTypeIn||n.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??Fe(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const p=s.value;if(s.remove(),e.hidden=!1,l){const c=t(n);c?.type==="strip"&&c.onTypeIn?.(p)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function Qr(n,e){const t=document.createElement("div");t.className="nc-strip-add",t.dataset.ncId=n.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(t),p=o.value;Ja(o),l?.type==="stripAdd"&&p&&l.onAdd(p)}),t.append(a,o,B()),Xa(t,n),t}function Xa(n,e){const t=n.querySelector(".nc-strip-add-label");t&&(t.textContent=e.label);const a=n.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const p=document.createElement("option");return p.value=l.value,p.textContent=l.label,p.disabled=l.disabled===!0,p})),Ja(a))}function Ja(n){const e=n.options[0];e&&(e.selected=!0)}function Yn(n){n.onReset?n.onReset():typeof n.defaultValue=="number"&&n.onChange(n.defaultValue)}function Qa(n,e){const t=n.querySelector("[data-nc-strip-name]");t&&t.textContent!==e.label&&(t.textContent=e.label);const a=n.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),n.setAttribute("aria-label",e.label);const s=n.querySelector(".nc-fader"),r=s?yr(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),Sr(n.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=n.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const l=e.valueText??Fe(e.value);o.textContent!==l&&(o.textContent=l),o.setAttribute("aria-label",`${e.label} level ${l}`);const p=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${p}`:p}for(const l of n.querySelectorAll("[data-nc-ms]")){const p=l.getAttribute("data-nc-ms"),c=p==="mute"?e.mute===!0:e.solo===!0;l.setAttribute("aria-pressed",c?"true":"false"),l.setAttribute("aria-label",`${p==="mute"?"Mute":"Solo"} ${e.label}`)}e.silent?n.dataset.silent="true":delete n.dataset.silent,e.identity?n.dataset.ncIdentity=e.identity:delete n.dataset.ncIdentity}function Zr(n,e){const t=document.createElement("div");t.className="nc-ui-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const a=document.createElement("h3");if(a.className="nc-ui-fx-name",a.id=`${n.id}-name`,a.textContent=n.title,n.on===void 0)t.append(a);else{const s=document.createElement("div");s.className="nc-ui-fx-hd";const r=Ba({checked:n.on,labelledBy:a.id,onChange:o=>{const l=e(r.el);l?.type==="fx"&&l.onToggle?.(o)}});r.el.dataset.ncFxSwitch="",s.append(a,r.el),t.append(s)}for(const s of n.controls)t.append(nt(s,e));if(n.more?.length){const s=document.createElement("details");s.className="nc-ui-more";const r=document.createElement("summary");r.textContent=n.moreLabel??"More",s.append(r);for(const o of n.more)s.append(nt(o,e));t.append(s)}return t.append(B()),Za(t,n),t}function Za(n,e){const t=n.querySelector(".nc-ui-fx-name");t&&(t.textContent=e.title);const a=n.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?n.dataset.ncDim="true":delete n.dataset.ncDim}function Xn(n){return n.replace(/["\\]/g,"\\$&")}function eo(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===t.dataset.ncId);a?.type==="canvas"&&qa(t,a)}Cr(n)}const to=te["toast-duration"];function no({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function ao(n,e,t,a){const s=l=>({top:l,bottom:l+t}),r=l=>n.some(p=>p&&p.bottom>l.top&&p.top<l.bottom),o=s(e-a-t);return r(o)?r(s(a))?"bottom":"top":"bottom"}function ei(n,e,t,a,s,r){let o=n.bottom+s;const l=Math.max(r,Math.min(n.left,a-r-t.width));for(let p=!0,c=0;p&&c<8;c++){p=!1;for(const u of e)u&&u.bottom>o&&u.top<o+t.height&&u.right>l&&u.left<l+t.width&&(o=u.bottom+s,p=!0)}return{top:o,left:l}}const Jn="data-nc-ui-toast-live";function io(n,e){let t=e.querySelector(`[${Jn}]`);return t||(t=n.createElement("div"),t.setAttribute(Jn,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function so({message:n,actionLabel:e,onAction:t,duration:a=to,onClose:s,avoid:r=[],anchor:o,host:l,document:p=globalThis.document}={}){l=l??p.body;const c=p.defaultView??globalThis,u=p.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const m=p.createElement("span");m.className="nc-ui-toast-message",m.textContent=n,u.appendChild(m);let b=null;e&&(b=p.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),l.appendChild(u);let f="open";const w=q=>q&&typeof q.getBoundingClientRect=="function"?q.getBoundingClientRect():null,g=w(u),d=g?.height||44,h=c.getComputedStyle?.(u),v=Number.parseFloat(h?.getPropertyValue(j("toast-offset")))||16,k=Number.parseFloat(h?.getPropertyValue(j("toast-anchor-gap")))||8,S=w(o),y=c.innerHeight??0,x=r.map(w).filter(Boolean),T=S&&S.bottom>0&&S.top<y?ei(S,x,{width:g?.width||0,height:d},c.innerWidth??0,k,v):null;T&&T.top+d<=y?(u.setAttribute("data-placement","anchor"),u.style.top=`${T.top+(c.scrollY??0)}px`,u.style.left=`${T.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",ao(x,y,d,v));const E=c.requestAnimationFrame?.bind(c)??(q=>setTimeout(q,16));E(()=>E(()=>{f==="open"&&u.setAttribute("data-state","open")})),io(p,l).textContent=no({message:n,actionLabel:e});let _,W;const oe=new Promise(q=>{W=q}),fe=q=>{clearTimeout(_),_=setTimeout(()=>mt("timeout"),q)};let N=a,wn=Date.now();const vn=()=>{f==="open"&&(clearTimeout(_),N=Math.max(0,N-(Date.now()-wn)))},kn=()=>{f==="open"&&(wn=Date.now(),fe(N))};u.addEventListener("pointerenter",vn),u.addEventListener("pointerleave",kn),u.addEventListener("focusin",vn),u.addEventListener("focusout",kn),b?.addEventListener("click",()=>{if(f==="open")try{t?.()}finally{mt("action")}}),Number.isFinite(a)&&fe(a);function mt(q="close"){if(f!=="open")return;f="closing",clearTimeout(_),u.setAttribute("data-state","closing"),s?.(q);const $n=c.getComputedStyle?.(u),Pi=$n?Math.max(0,...String($n.transitionDuration||"").split(",").map(Sn=>Number.parseFloat(Sn)*(Sn.trim().endsWith("ms")?1:1e3)||0)):0,xn=()=>{f!=="gone"&&(f="gone",u.remove(),W(q))};u.addEventListener("transitionend",xn),setTimeout(xn,Pi+50)}return{el:u,close:mt,closed:oe}}function Qn(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function ro({anchor:n,title:e,velocity:t,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const p=l.defaultView??globalThis,c={velocity:t,probability:a},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const m=l.createElement("div");m.className="nc-step-editor",m.setAttribute("role","dialog"),m.setAttribute("aria-label",e);const b=l.createElement("div");b.className="nc-step-editor-head";const f=l.createElement("span");f.className="nc-label",f.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",b.append(f,w),m.appendChild(b);const g=[];for(const[S,y]of[["velocity","Velocity"],["probability","Chance"]]){const x=l.createElement("label");x.className="nc-step-editor-row";const T=l.createElement("span");T.className="nc-label",T.textContent=y;const E=l.createElement("input");E.type="range",E.className="nc-range",E.min=S==="velocity"?"0.05":"0",E.max="1",E.step="0.05",E.value=String(c[S]),E.setAttribute("data-nc-edit",S);const _=l.createElement("output");_.className="nc-readout",_.textContent=Qn(c[S]),E.setAttribute("aria-valuetext",_.textContent),E.addEventListener("input",()=>{c[S]=Number(E.value),_.textContent=Qn(c[S]),E.setAttribute("aria-valuetext",_.textContent),s({velocity:c.velocity,probability:c.probability})}),x.append(T,E,_),m.appendChild(x),g.push(E)}if(o.append(u,m),n?.setAttribute?.("data-editing","true"),p.matchMedia?.(`(max-width: ${Ks.breakpoint.md})`).matches??!1)m.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const S=n?.getBoundingClientRect?.(),y=m.getBoundingClientRect(),x=Number.parseFloat(p.getComputedStyle(m).getPropertyValue("row-gap"))||8;if(S){let{top:T,left:E}=ei(S,[],{width:y.width,height:y.height},p.innerWidth,x,x);T+y.height>p.innerHeight&&(T=Math.max(x,S.top-x-y.height)),m.style.top=`${T}px`,m.style.left=`${E}px`}m.setAttribute("data-placement","anchor")}g[0]?.focus({preventScroll:!0});let h=!0;const v=S=>{S.key==="Escape"&&(S.preventDefault(),k())};function k(){h&&(h=!1,l.removeEventListener("keydown",v,!0),u.remove(),m.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",v,!0),u.addEventListener("pointerdown",S=>{S.preventDefault(),k()}),w.addEventListener("click",k),{el:m,close:k}}const Zt="netcomposer.rhythm.hidden.v1",Q=new WeakMap;function kt(){try{return globalThis.localStorage??null}catch{return null}}function ti(n,e=Zt){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Zn(n,e,t,a=Zt){const s=ti(n,a);t?s.add(e):s.delete(e);try{n?.setItem(a,JSON.stringify([...s]))}catch{}}function en(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(a=>a.controls)],t=[];for(const a of e)t.push(a),a.type==="fx"&&t.push(...a.controls,...a.more??[]),a.type==="strip"&&t.push(...(a.sends??[]).map(s=>({...s,type:"knob",compact:!0})));return t}function oo(n,e){if(!(!n||!e))return en(n).find(t=>t.id===e)}function lo(n){return`${`${n.layout??""}:${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${en(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(a=>a.value).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}:${(t.sends??[]).map(a=>a.id).join(",")}:${(t.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}:${t.controls.map(a=>a.id).join(",")}/${(t.more??[]).map(a=>a.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function co(n,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,n.append(r);return}const t=document.createElement("div");t.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",t.append(a,s),n.append(t),ni(n,e)}function ni(n,e){if(!e.panel)return;const t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),a=t?.querySelector(".nc-panel-title"),s=t?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function uo(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=Q.get(e),a=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return oo(t,a)}function po(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],a=lo(e);if(n.dataset.ncSignature===a){for(const s of t){const r=n.querySelector(`[data-nc-section="${ea(s.id)}"]`);r&&ni(r,s);for(const o of s.controls){const l=n.querySelector(`[data-nc-id="${ea(o.id)}"]`);l instanceof Element&&ie(l,o)}}return}n.dataset.ncSignature=a,n.replaceChildren(),e.layout==="console"?n.dataset.ncLayout="console":delete n.dataset.ncLayout;for(const s of t){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),co(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(nt(l,uo));n.append(r)}}function ea(n){return n.replace(/["\\]/g,"\\$&")}function tn(n,e=Zt){ja();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead=""),n.compact&&(t.dataset.ncCompact="");const a=ti(kt(),e).has(n.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const p=document.createElement("span");p.className="nc-index",p.dataset.ncIndex="";const c=Ba({labelledBy:r.id,onChange:h=>(Q.get(t)??n).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",o.append(c.el,l,p);const u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",s.append(r,u,o);const m=document.createElement("div");m.className="nc-module-body",m.id=`${n.id}-body`;const b=document.createElement("button");b.type="button",b.className="nc-slim";const f=document.createElement("span");f.className="nc-slim-lines",b.append(f);const w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",t.append(w,s,m,b),t.setAttribute("aria-labelledby",r.id);const g=h=>{const v=Q.get(t)??n;t.dataset.ncOpen=h?"false":"true",m.hidden=h,b.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${v.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const h=t.dataset.ncOpen==="true";Zn(kt(),(Q.get(t)??n).id,h,e),g(h),Pt(t.parentElement)}),b.addEventListener("click",()=>{Zn(kt(),(Q.get(t)??n).id,!1,e),g(!1),Pt(t.parentElement)});const d={el:t,update(h){Q.set(t,h),h.compact?t.dataset.ncCompact="":delete t.dataset.ncCompact,r.textContent=h.title,u.textContent=h.status??"",h.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,b.setAttribute("aria-label",`Show ${h.title}`),po(m,h),g(m.hidden),d.redraw()},redraw(){const h=Q.get(t);h&&eo(t,en(h))}};return Q.set(t,n),g(a),d.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>d.redraw()).observe(t),d}function ho(n,e,t="adjacent"){ja(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const a=t==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),n.append(s.el),s.redraw()}),Pt(n)}function Pt(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&s.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function ai(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function mo(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function fo(n,e={}){const t=new Set,a=(async()=>{await ai();for(const s of n)await mo(e.timeoutMs??200),s.build(),t.add(s)})();return{ready:s=>t.has(s),done:a,toJSON:()=>({built:t.size,total:n.length})}}function nn(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const go="modulepreload",bo=function(n){return"/rhythm/"+n},ta={},yo=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),p=l?.nonce||l?.getAttribute("nonce");s=o(t.map(c=>{if(c=bo(c),c in ta)return;ta[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const b=document.createElement("link");if(b.rel=u?"stylesheet":go,u||(b.as="script"),b.crossOrigin="",b.href=c,p&&b.setAttribute("nonce",p),document.head.appendChild(b),u)return new Promise((f,w)=>{b.addEventListener("load",f),b.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var wo=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Ot=[.25,.5,.75,1,1.5,2],vo=4.9,P={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},le={fmt:"wet"},G={fmt:"pct"},be={fmt:"db"},Ke={fmt:"signedPct"},$t={fmt:"num",suffix:" ms"},z={div:100};function A(n,e,t,a,s,r,o,l){var p={key:n,label:e,min:t,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var c in l)p[c]=l[c];return p}function Ve(n){return n.map(function(e){return{value:e[0],label:e[1]}})}var Ie=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:P.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[A("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:P.hpHz,astrid:!0,zero:"off"}),A("q","Resonance",0,100,0,2,{fmt:"q",law:P.hpQ},{dsp:{law:P.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[A("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:P.bpHz,astrid:!0},{dsp:{law:P.bpHz}}),A("q","Q",0,100,0,2,{fmt:"q",law:P.bpQ},{dsp:{law:P.bpQ}}),A("mix","Mix",0,100,100,3,le,{dsp:z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[A("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Ve(wo),overriddenBy:"beats_free",tempoSynced:!0}),A("feedback","Feedback",0,90,35,2,G,{dsp:z,unit:"%"}),A("mix","Wet/dry",0,100,0,3,le,{dsp:z,unit:"%",astridKey:"wet"}),A("tone","Tone",0,100,100,4,{fmt:"hz",law:P.delayTone,offAt:100},{dsp:{div:99},more:!0}),A("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),A("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Ve([[0,"Insert"],[1,"Send"]]),more:!0}),A("send","Send",0,100,100,7,G,{dsp:z,unit:"%",more:!0}),A("mod_send","Accent → send",-100,100,0,8,Ke,{dsp:z,unit:"%",more:!0}),A("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[A("predelay","Pre-delay",0,200,0,1,$t,{dsp:{div:1e3},unit:"ms"}),A("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:z,unit:"%"}),A("decay","Decay",0,100,50,3,G,{dsp:z,unit:"%"}),A("damping","Damping",0,100,0,4,G,{dsp:z,unit:"%"}),A("mix","Mix",0,100,0,5,le,{dsp:z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[A("rate","Rate",0,100,26,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),A("depth","Depth",0,100,70,2,G,{dsp:z,unit:"%"}),A("feedback","Feedback",-90,90,50,3,Ke,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,4,le,{dsp:z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[A("rate","Rate",0,100,52,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),A("depth","Depth",0,100,50,2,G,{dsp:z,unit:"%"}),A("spread","Spread",0,100,70,3,G,{dsp:z,unit:"%"}),A("mix","Mix",0,100,40,4,le,{dsp:z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[A("rate","Rate",0,100,39,1,{fmt:"rate",law:P.rate},{dsp:{law:P.rate}}),A("depth","Depth",0,100,70,2,G,{dsp:z,unit:"%"}),A("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Ve([[4,"4"],[6,"6"],[8,"8"]])}),A("feedback","Feedback",0,90,30,4,G,{dsp:z,unit:"%"}),A("mix","Mix",0,100,50,5,le,{dsp:z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[A("low_db","Low",-18,18,0,1,be,{unit:"dB"}),A("mid_db","Mid",-18,18,0,2,be,{unit:"dB"}),A("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:P.midHz,astrid:!0},{dsp:{law:P.midHz}}),A("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:P.eqQ},{dsp:{law:P.eqQ}}),A("high_db","High",-18,18,0,4,be,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[A("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),A("output_db","Output",-12,12,0,2,be,{unit:"dB"}),A("mix","Mix",0,100,100,3,le,{dsp:z,unit:"%"}),A("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Ve([[0,"Smooth"],[1,"Acid"]]),more:!0}),A("tone","Tone",0,100,100,5,{fmt:"hz",law:P.driveTone,offAt:100},{dsp:{div:99},more:!0}),A("mod_drive","Accent → drive",-100,100,0,6,Ke,{dsp:z,unit:"%",more:!0}),A("mod_tone","Accent → tone",-100,100,0,7,Ke,{dsp:z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[A("threshold_db","Threshold",-60,0,0,1,be,{unit:"dB"}),A("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:P.ratio},{dsp:{law:P.ratio}}),A("attack_ms","Attack",1,100,10,3,$t,{unit:"ms"}),A("release_ms","Release",10,1e3,150,4,$t,{unit:"ms"}),A("makeup_db","Makeup",0,24,0,5,be,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[A("width","Width",0,200,100,1,G,{dsp:z,unit:"%"}),A("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:z})]}],ko=Ie.map(function(n){return n.type});Ie.filter(function(n){return!n.hidden}).map(function(n){return n.type});var $o={reverb:"plate"};function an(n){var e=$o[n]||n;return ko.indexOf(e)>=0?e:null}function J(n){for(var e=an(n),t=0;t<Ie.length;t++)if(Ie[t].type===e)return Ie[t];return null}function $e(n,e){if(n.zeroNull&&e<=0)return null;var t=n.pow?n.pow[0]*Math.pow(n.pow[1],e/n.div):n.exp2[0]*Math.pow(2,n.exp2[1]*e/n.div);return n.fixed!==void 0?+t.toFixed(n.fixed):n.round?Math.round(t):t}function ii(n,e){var t=n.dsp;if(!t)return e;if(t.div)return e/t.div;var a=$e(t.law,e);return a===null?0:a}function na(n,e){return Math.min(vo,n*60/(e>0?e:120))}var aa=function(n){return n>0?"+":n<0?"−":""};function xo(n){return n==null?"open":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1)+" kHz":n+" Hz"}function si(n,e,t){var a=n.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:aa(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return aa(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=$e(a.law,e),s===null?a.zero||"open":a.astrid?xo(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+$e(a.law,e).toFixed(1);case"ratio":return $e(a.law,e).toFixed(1)+":1";case"rate":return s=$e(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<n.options.length;r++)if(n.options[r].value===e)return n.options[r].label;return String(e);case"tempoMs":return Math.round(na(e,t)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(na(e,t)*1e3)+" ms"}return String(e)}var So=1,ct=["drive","delay","plate"];function To(n){var e={};for(var t in n)t!=="format"&&(e[t]=n[t]);return e.format=function(a,s){return si(n,a,s)},e}var je=ct.map(function(n){var e=J(n),t={type:n,label:e.label,dials:e.dials.map(To)};return e.tempoSynced&&(t.tempoSynced=!0),t}),Ao={reverb:"plate"};function at(n){var e=Ao[n]||n;return ct.indexOf(e)>=0?e:null}function dt(n){for(var e=at(n),t=0;t<je.length;t++)if(je[t].type===e)return je[t];return null}function ri(n,e){var t=dt(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}function Ee(n,e){if(n.stepWhen&&e){for(var t=0;t<n.stepWhen.length;t++)if(e[n.stepWhen[t].key]===n.stepWhen[t].value)return n.stepWhen[t].step}return n.step}function se(n,e,t){if(typeof e!="number"||!isFinite(e))return n.default;if(n.options){for(var a=n.options[0].value,s=1;s<n.options.length;s++)Math.abs(n.options[s].value-e)<Math.abs(a-e)&&(a=n.options[s].value);return a}if(n.exact)return e>0?e<n.minOn?n.minOn:e>n.max?n.max:e:0;var r=t>0&&t<1?Math.round(1/t):1;return Math.max(n.min,Math.min(n.max,Math.round(e*r)/r))+0}function Eo(){return{v:So,chain:je.map(function(n){var e={};return n.dials.forEach(function(t){e[t.key]=t.default}),{id:n.type,type:n.type,bypass:!0,dials:e}})}}function Mo(n){return Ot.reduce(function(e,t){return Math.abs(t-n)<Math.abs(e-n)?t:e},Ot[0])}function xt(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function Lo(n){for(var e=Array.isArray(n)?n:xt(n)&&Array.isArray(n.chain)?n.chain:[],t=Array.isArray(n),a=Eo(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(xt(l)){var p=at(l.type);if(!p){typeof l.type=="string"&&r.push(l.type);continue}if(s[p]){r.push(p);continue}s[p]=!0;var c=a.chain[ct.indexOf(p)],u=xt(l.dials)?l.dials:{};p==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),c.bypass=t?l.bypass===!0:l.bypass!==!1,dt(p).dials.forEach(function(m){c.dials[m.key]=se(m,u[m.key])}),Co(p,c.dials,u)}}return{state:a,dropped:r}}function Co(n,e,t){for(var a=dt(n),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=se(r,t&&typeof t[r.key]=="number"?t[r.key]:e[r.key],Ee(r,e)))}}function Rt(n){return Lo(n).state}function No(n){return JSON.parse(JSON.stringify(n))}var _o=24,It={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function jt(n,e,t){if(e==="bypass")return t?0:1;var a=ri(n,e)||zo(n,e);return a?ii(a,t):0}function zo(n,e){var t=J(n);if(!t)return null;for(var a=0;a<t.dials.length;a++)if(t.dials[a].key===e)return t.dials[a];return null}var Po={};je.forEach(function(n){n.dials.forEach(function(e){Po[n.type+"."+e.key]=e.format})});function St(n,e){var t=new Float64Array(_o),a=Rt(n);return a.chain.forEach(function(s){var r=It[s.type];t[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){t[r[o]]=jt(s.type,o,s.dials[o])})}),t}var Oo=2,it=3,Ro=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ne(n){return!!n&&typeof n=="object"&&!Array.isArray(n)}function oi(n,e){var t=J(n);if(!t)return null;var a={};(e||[]).forEach(function(o){o&&o.id&&(a[o.id]=!0)});for(var s=1;a[t.type+"-"+s];)s++;var r={};return t.dials.forEach(function(o){r[o.key]=o.default}),{id:t.type+"-"+s,type:t.type,bypass:!1,dials:r}}function Io(n){var e=J(n.type),t=/-(\d+)$/.exec(n.id||"");return(e?e.label:n.type)+(t&&+t[1]>1?" "+t[1]:"")}function jo(n,e,t){var a=n.length-1,s=Math.max(0,Math.min(a,t));if(e<0||e>a||e===s)return n;var r=n.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function Bo(n){return typeof n=="number"&&isFinite(n)?Mo(n):n}function ia(n,e,t){var a={};return n.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),t&&n.type==="delay"&&s.key==="delay_beats"&&(r=Bo(r)),a[s.key]=se(s,r)}),n.dials.forEach(function(s){s.stepWhen&&(a[s.key]=se(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],Ee(s,a)))}),a}function Fo(n,e){if(!(typeof e!="number"||!isFinite(e))){var t=n.dsp;if(!t)return e;if(t.div)return Math.round(e*t.div*1e6)/1e6;for(var a=n.min,s=1/0,r=n.min;r<=n.max;r++){var o=$e(t.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var Do={rate:"rate_hz"};function qo(n,e,t,a){var s={};return n.dials.forEach(function(r){if(!r.more){var o=r.astridKey||Do[r.key]||r.key;s[r.key]=Fo(r,e[o])}}),n.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&t.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function Ho(n,e){var t=e>0?Math.floor(e):it,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(n)?(r=n,l=!0):Ne(n)&&Array.isArray(n.chain)&&(r=n.chain,o=n.v===1,l=n.schema===2);for(var p=[],c=0;c<r.length;c++){var u=r[c];if(Ne(u)&&!(u.type==="limiter"||u.fixed===!0)){var m=an(u.type),b=m&&J(m);if(!b||o&&["drive","delay","plate"].indexOf(m)<0){typeof u.type=="string"&&a.push(u.type);continue}if(p.length>=t){a.push(u.id||m);continue}var f;Ne(u.params)&&!Ne(u.dials)?f=ia(b,qo(b,u.params,s,u.id||m),l):f=ia(b,Ne(u.dials)?u.dials:{},l);var w=oi(m,p),g=typeof u.id=="string"&&Ro.test(u.id)&&!p.some(function(h){return h.id===u.id})?u.id:w.id,d=o?u.bypass!==!1:u.bypass===!0;p.push({id:o?w.id:g,type:m,bypass:d,dials:f})}}return{state:{v:Oo,chain:p},dropped:a,notes:s}}function Qe(n,e){return Ho(n,e).state}function ye(n){var e=J(n.type),t=[[0,n.bypass?0:1]];return e.dials.forEach(function(a){t.push([a.k,ii(a,n.dials[a.key])])}),t}function Uo(n){var e=Qe(n,8),t=[],a=e.chain.map(function(s,r){var o=J(s.type),l={};return r>=it&&t.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(p){var c=s.dials[p.key];if(p.more){c!==p.default&&t.push(s.id+"."+p.key);return}p.key==="delay_beats"&&Ot.indexOf(c)<0&&t.push(s.id+".delay_beats"),l[p.astridKey||p.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:t}}var Wo="nc-fx@1",Go=600,Ko=256,Vo=8,_e=typeof WeakMap=="function"?new WeakMap:null;function Yo(n,e){var t=_e&&_e.get(n);return t||(t=(async function(){if(!n||!n.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await n.audioWorklet.addModule(String(e));return}var a=(await yo(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await n.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),_e&&(_e.set(n,t),t.catch(function(){_e.delete(n)})),t)}function we(n,e){return typeof n=="number"&&isFinite(n)?n:e}function li(n,e,t,a){var s=Math.min(400,Math.max(20,we(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",p=we(e.preGain,1),c=Math.max(0,we(e.crossfade,.012)),u=we(e.maxDelaySeconds,void 0),m=n.createGain(),b=n.createGain(),f=n.createGain(),w=n.createGain(),g=null;e.modInput===!0&&(g=n.createGain(),g.channelCount=1,g.channelCountMode="explicit",g.channelInterpretation="discrete"),w.gain.value=0,m.connect(f),f.connect(b),w.connect(b);var d={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},h=t(s);d.post=function(y){d.node?d.node.port.postMessage(y):d.disposed||(r.length>=Ko&&(r=a().concat([{t:"tempo",bpm:d.bpm,when:0}])),r.push(y))};function v(y){var x=r.map(function(T){var E=Object.assign({},T);return E.when>y||(E.when=0,E.t!=="clear"&&(E.snap=!0)),E});return r=[],x}d.emit=function(y){for(var x=0;x<d.listeners.length;x++)try{d.listeners[x](y)}catch(T){typeof console<"u"&&console.error(T)}},d.whenOf=function(y){return typeof y=="number"&&isFinite(y)&&y>0?y:0};var k=!1;d.tooFar=function(y){return typeof y=="number"&&y>n.currentTime+Go?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(y-n.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Yo(n,e.moduleUrl).then(function(){if(!d.disposed){var y=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:p,maxDelaySeconds:u},h);y.pending=v(n.currentTime),d.node=new AudioWorkletNode(n,Wo,{numberOfInputs:g?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:y}),m.connect(d.node),g&&g.connect(d.node,0,1),d.node.connect(w);var x=n.currentTime;x<=0||c===0?(f.gain.value=0,w.gain.value=1):(f.gain.setValueAtTime(1,x),f.gain.linearRampToValueAtTime(0,x+c),w.gain.setValueAtTime(0,x),w.gain.linearRampToValueAtTime(1,x+c)),d.status="ready"}},function(y){d.status="unavailable",r=[],d.error=y});return d.core={input:m,output:b,modInput:g,ready:S,get status(){return d.status},get error(){return d.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*n.sampleRate)):0,limiter:o,setTempo:function(y,x){var T=we(y,NaN);!(T>0)||d.disposed||d.tooFar(x)||(d.bpm=Math.min(400,Math.max(20,T)),d.post({t:"tempo",bpm:d.bpm,when:d.whenOf(x)}),d.emit({effect:null,key:"tempo",value:d.bpm}))},getTempo:function(){return d.bpm},clear:function(y){var x=y&&typeof y=="object"?y:{at:y};if(!(d.disposed||d.tooFar(x.at))){var T=we(x.fadeMs,0);d.post({t:"clear",when:d.whenOf(x.at),fadeMs:T>0?Math.min(1e3,T):0})}},onChange:function(y){return d.listeners.push(y),function(){var x=d.listeners.indexOf(y);x>=0&&d.listeners.splice(x,1)}},dispose:function(){if(!d.disposed){if(d.disposed=!0,d.status="disposed",r=[],d.listeners.length=0,d.node){d.node.port.postMessage({t:"dispose"}),d.node.port.close();try{d.node.disconnect()}catch{}}[m,f,w,b,g].forEach(function(y){try{y&&y.disconnect()}catch{}})}}},d}function Xo(n,e){var t=e||{};if(t.slots)return Jo(n,t);var a=Rt(t.state),s=Array.from(St(a)),r=li(n,t,function(){return{program:s}},function(){return[{t:"load",program:Array.from(St(a)),when:0}]}),o=r.core;function l(p){return a.chain[ct.indexOf(p)]}return o.setParam=function(p,c,u,m){var b=at(p);if(!(!b||r.disposed||r.tooFar(m))){var f=l(b),w;if(c==="bypass")w=!!u;else{var g=ri(b,c);if(!g)return;w=se(g,u,Ee(g,f.dials))}return c==="bypass"?f.bypass=w:f.dials[c]=w,r.post({t:"p",i:It[b][c],v:jt(b,c,w),when:r.whenOf(m)}),r.emit({effect:b,key:c,value:w}),dt(b).dials.forEach(function(d){if(!(!d.stepWhen||!d.stepWhen.some(function(k){return k.key===c}))){var h=f.dials[d.key],v=se(d,h,Ee(d,f.dials));v!==h&&(f.dials[d.key]=v,r.post({t:"p",i:It[b][d.key],v:jt(b,d.key,v),when:r.whenOf(m)}),r.emit({effect:b,key:d.key,value:v}))}}),w}},o.getParam=function(p,c){var u=at(p);if(u){var m=l(u);return c==="bypass"?m.bypass:m.dials[c]}},o.getState=function(){return No(a)},o.setState=function(p,c){r.disposed||r.tooFar(c&&c.at)||(a=Rt(p),r.post({t:"load",program:Array.from(St(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},o}function Jo(n,e){var t=e.slots===!0?it:Math.max(1,Math.min(Vo,Math.floor(+e.slots)||it)),a=Qe(e.state,t),s=1,r={};function o(d){return r[d.id]||(r[d.id]=s++),r[d.id]}function l(d){return d.map(function(h){return{uid:o(h),type:h.type,program:ye(h)}})}var p=l(a.chain),c=a.chain.map(function(d){return r[d.id]}),u=li(n,e,function(){return{slots:t,chain:p,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(d){return r[d.id]}),when:0}]}),m=u.core;function b(d){var h;for(h=0;h<a.chain.length;h++)if(a.chain[h].id===d)return a.chain[h];var v=an(d);if(v){for(h=0;h<a.chain.length;h++)if(a.chain[h].type===v)return a.chain[h]}return null}function f(d,h){var v=o(d);u.post({t:"add",uid:v,type:d.type,when:h}),ye(d).forEach(function(k){u.post({t:"ps",uid:v,k:k[0],v:k[1],when:h,snap:!0})})}function w(d){u.post({t:"order",uids:a.chain.map(function(h){return r[h.id]}),when:d})}function g(d,h){var v={};a.chain.forEach(function(y){v[y.id]=y});var k=a.chain.map(function(y){return r[y.id]}).join();d.chain.forEach(function(y){var x=v[y.id];if(!x||x.type!==y.type){delete r[y.id],f(y,h);return}var T={};ye(x).forEach(function(E){T[E[0]]=E[1]}),ye(y).forEach(function(E){T[E[0]]!==E[1]&&u.post({t:"ps",uid:r[y.id],k:E[0],v:E[1],when:h})})});var S={};d.chain.forEach(function(y){S[y.id]=!0}),Object.keys(r).forEach(function(y){S[y]||delete r[y]}),a=d,a.chain.map(function(y){return r[y.id]}).join()!==k&&w(h)}return m.slots=t,m.setParam=function(d,h,v,k){var S=b(d);if(!(!S||u.disposed||u.tooFar(k))){var y=J(S.type),x,T=null;if(h==="bypass")x=!!v;else{for(var E=0;E<y.dials.length;E++)y.dials[E].key===h&&(T=y.dials[E]);if(!T)return;x=se(T,v,Ee(T,S.dials))}var _={},W={};ye(S).forEach(function(N){_[N[0]]=N[1]}),y.dials.forEach(function(N){N.stepWhen&&(W[N.key]=S.dials[N.key])}),h==="bypass"?S.bypass=x:S.dials[h]=x,y.dials.forEach(function(N){N.stepWhen&&(S.dials[N.key]=se(N,S.dials[N.key],Ee(N,S.dials)))});var oe=u.whenOf(k),fe=r[S.id];return ye(S).forEach(function(N){(_[N[0]]!==N[1]||T&&N[0]===T.k)&&u.post({t:"ps",uid:fe,k:N[0],v:N[1],when:oe})}),u.emit({effect:S.id,key:h,value:x}),Object.keys(W).forEach(function(N){N!==h&&S.dials[N]!==W[N]&&u.emit({effect:S.id,key:N,value:S.dials[N]})}),x}},m.getParam=function(d,h){var v=b(d);if(v)return h==="bypass"?v.bypass:v.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(a))},m.setState=function(d,h){u.disposed||u.tooFar(h&&h.at)||(g(Qe(d,t),u.whenOf(h&&h.at)),u.emit({effect:null,key:null,value:null}))},m.addEffect=function(d,h){var v=h||{},k=oi(d,a.chain);if(!(!k||a.chain.length>=t||u.disposed||u.tooFar(v.at))){if(v.dials){var S=Qe({v:2,chain:[{id:k.id,type:k.type,dials:v.dials}]},1).chain[0];k.dials=S.dials}v.bypass===!0&&(k.bypass=!0);var y=a.chain.slice(),x=typeof v.index=="number"?Math.max(0,Math.min(y.length,v.index)):y.length;return y.splice(x,0,k),g({v:2,chain:y},u.whenOf(v.at)),u.emit({effect:k.id,key:"chain",value:"add"}),k.id}},m.removeEffect=function(d,h){var v=b(d),k=h&&h.at;return!v||u.disposed||u.tooFar(k)?!1:(g({v:2,chain:a.chain.filter(function(S){return S!==v})},u.whenOf(k)),u.emit({effect:v.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(d,h,v){var k=b(d),S=v&&v.at;if(!k||u.disposed||u.tooFar(S))return!1;var y=jo(a.chain,a.chain.indexOf(k),h);return y===a.chain?!1:(g({v:2,chain:y},u.whenOf(S)),u.emit({effect:k.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return a.chain.map(function(d){return{id:d.id,type:d.type,name:Io(d),bypass:d.bypass}})},m.toAstrid=function(){return Uo(a)},m}const Qo="/rhythm/assets/worklet-CnpUVY5i.js",sn="petra-rhythm.state",ci=1,di=400,Zo=2e3;function el(n){return JSON.stringify({v:ci,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function tl(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:a,tracks:s}=e;return et({...n,swing:t,fx:a,tracks:s}).ok}function nl(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==ci)return null;const t=et(e.doc);if(!t.ok||!t.document)return null;const a=t.document,s=e.bank;if(!s||!Array.isArray(s.slots)||s.slots.length!==X)return null;const r=s.slots.map(c=>c===null?null:c);if(!r.every(c=>c===null||tl(a,c)))return null;const o=Number.isInteger(s.active)&&r[s.active]?s.active:null,l=e.selectedTrack,p=Number.isInteger(l)&&l>=0&&l<a.tracks.length?l:0;return{doc:a,bank:{slots:r,active:o},selectedTrack:p}}function al(n,e,t=di,a=sn){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const p=el(e());if(p===o)return;n.setItem(a,p),o=p}catch{}};return{schedule(){const p=Date.now();r||(r=p),clearTimeout(s),s=setTimeout(l,Math.min(t,Math.max(0,r+Zo-p)))},flush:l}}function il(n,e,t=sn){if(new URLSearchParams(e).has("fresh"))return null;try{return nl(n.getItem(t))}catch{return null}}const Tt={maker:"PETRA",instrument:"RHYTHM",number:"01"},sl="PETRA Rhythm";let sa=!1;function rl(){return`
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
`}function ol(n){const e=n.ownerDocument;if(!sa){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=rl(),e.head.append(c),sa=!0}const t=e.createElement("header");t.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},r=e.createElement("span");r.className="petra-head-num",r.textContent=Tt.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=Tt.maker,a.append(o," ",s(),` ${Tt.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A NetComposer element.";const p=e.createElement("div");return p.className="petra-head-title",p.append(a,l),t.append(p),n.before(t),t}function ll(n,e){const t=n.ownerDocument,a=t.createElement("details");a.className="petra-menu";const s=t.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=t.createElement("div");r.className="petra-menu-body";const o=t.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const u=o.files?.[0];o.value="",u&&e.load(await u.text(),u.name)});const l=(u,m)=>{const b=t.createElement("button");return b.type="button",b.textContent=u,b.dataset.petraMenu=u.toLowerCase(),b.addEventListener("click",()=>{m(),p||(a.open=!1)}),b};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),n.append(a);let p=null;const c=()=>{const u=getComputedStyle(s).display==="none";u!==p&&(a.open=u),p=u};return window.addEventListener("resize",c),c(),a}class cl{doc=Ma();bank=wa();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=ss(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=as(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=is(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=En(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.recallGlideSeconds){const a=En(this.bank,e,this.doc,t);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=Ss(this.doc,e);this.sparkleUndo=t,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=ks(this.doc,e,t),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=t,t===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let ra=!1;function dl(){return`
#app .nc-morph-field { display: none; }
`}function ul(n=document){if(ra)return;const e=n.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=dl(),n.head.append(e),ra=!0}function pl(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,a=e?.performanceTime;if(t===void 0||a===void 0||!(t>0)||!(a>0))return null;const s=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function oa(n,e){const t=n.getOutputTimestamp?.(),a=t?.contextTime,s=t?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const hl=1400;function At(n,e,t,a=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function ml(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class fl{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},hl))}}const gl=50;function bl(n,e,t,a=gl){if(t)return 0;const s=n-e;return s>=a?0:a-s}class yl{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const a=so({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function la(n,e){const t=new AudioContext(e);let a="loading";const s=(async()=>{t.state==="running"&&await t.suspend();for(const r of n)await t.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:t,ready:s,get status(){return a},async start(){return a==="loaded"&&ce(t),await s,t.state!=="running"&&await t.resume(),t.state}}}function ce(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const wl=5e3;function vl(){return typeof navigator<"u"&&"userAgentData"in navigator}function kl(n,e,t,a={}){const s=a.restartsOnWorkletReady??vl(),r=a.preloadTimeoutMs??wl;let o=null,l=!1,p=null,c=null;async function u(){const g=new AudioContext(e);ce(g);try{for(const d of n)await g.audioWorklet.addModule(d);return g}catch(d){throw g.close().catch(()=>{}),d}}function m(g,d=!1){l=!0,o=null,g.context.close().catch(()=>{}),d?t?.(new Error(`audio preload still loading after ${r} ms`)):g.ready.catch(h=>t?.(h))}async function b(g){const{context:d}=g;t?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),ce(d);const h=(async()=>{for(const v of n)await d.audioWorklet.addModule(v)})();try{return await Promise.race([g.ready.then(()=>{},()=>h),h]),d}catch(v){throw l=!0,o===g&&(o=null),d.close().catch(()=>{}),v}}function f(g){let d;const h=new Promise(v=>{d=setTimeout(()=>v("timeout"),r)});return Promise.race([g.ready.then(()=>"ready"),h]).finally(()=>clearTimeout(d))}async function w(){if(!l){o??=la(n,e);const g=o;if(g.status==="failed")m(g);else{const d=g.status==="loaded"||!s;if(d&&ce(g.context),g.status==="loading"){let h;try{h=await f(g)}catch{return m(g),u()}if(h==="timeout")return s?(m(g,!0),u()):b(g)}return g.context.state==="closed"?(o===g&&(o=null),w()):(d||ce(g.context),g.context)}}return u()}return{preload(){o||p||c||l||(o=la(n,e))},load(){return p&&p.state!=="closed"?(ce(p),Promise.resolve(p)):c?(o&&(o.status==="loaded"||!s)&&ce(o.context),c):(c=w().then(g=>(p=g,o=null,g)).finally(()=>{c=null}),c)}}}const ca="/rhythm/assets/processor-DgbvutF7.js",$l="instance",xl=99;function ui(n=typeof location>"u"?"":location.search){const e=new URLSearchParams(n).get($l)?.trim()??"";if(!/^\d+$/.test(e))return 1;const t=Number(e);return t>=2&&t<=xl?t:1}function pi(n,e){return e===1?n:`${n}#${e}`}function Sl(n,e){return e===1?n:`${n} ${e}`}let ve;function Tl(n,e=ui()){if(ve!==void 0)return ve;ve=null;try{if(typeof window>"u"||window.parent===window)return ve;const t=window.parent.ncStudio;t&&t.version===1&&(ve=t.attach(n,{instance:e}))}catch{}return ve}function Al(){let n;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(n=a.syncScope)}}catch{}if(!n)return{};const e=`/studio/${n}`,t=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:t?{request:(a,s,r)=>t.request(`${a}${e}`,s,r)}:null}}function El(){try{if(typeof window>"u"||window.parent===window)return null;const n=window.parent.ncStudio;return n&&n.version===1&&typeof n.fxWorklet=="string"&&n.fxWorklet?n.fxWorklet:null}catch{return null}}function Ml(n,e){let t=null;const a=()=>(t??=(async()=>{for(const s of e)await n.audioWorklet.addModule(s);return n})(),t.catch(()=>{t=null}),t);return{preload(){a().catch(()=>{})},load:a}}const hi=new URLSearchParams(location.search),H=hi.has("measure"),ut=ui(),rn=Sl(sl,ut),Ll=pi("petra-rhythm.linkslots",ut),Cl=Hs(Ll),Nl=!(H&&hi.get("clockStepFix")==="0");let Bt=0;const _l=.05;H&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const pe=[40,240],$=new cl,mi=pi(sn,ut),Ye=H?null:il(localStorage,location.search,mi);Ye&&($.doc=Ye.doc,$.bank=Ye.bank,$.selectTrack(Ye.selectedTrack));const on=H?null:al(localStorage,()=>({doc:$.doc,bank:$.bank,selectedTrack:$.selectedTrack}),di,mi);if(H){for(const e of $.doc.tracks)e.solo=e.voice==="kick";const n=$.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=_l)}const O=new Hi({bpm:$.doc.bpm,minBpm:pe[0],maxBpm:pe[1],timebase:"shared"}),ln=document.querySelector("#app");if(!(ln instanceof HTMLElement))throw new Error("Missing #app");const zl=ol(ln);ul();const Le=new yl(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let M=null;H&&(window.__audioInfo=()=>M?{sampleRate:M.sampleRate,outputLatency:M.outputLatency,baseLatency:M.baseLatency,state:M.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>$i(),window.__clockStep=n=>{Bt=n},window.__debug=()=>({audio:M?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:M?.getOutputTimestamp?.()??null,currentTime:M?.currentTime??null,reanchors:de?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let K=null,Y=null,de=null,st=0,fi=0;function Pl(){return M?M.state==="running"?"running":M.state==="suspended"?"suspended":M.state==="interrupted"?"interrupted":"none":"needs-gesture"}const R=new ts({...Al(),app:rn,version:"0.1.0",clock:O,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:pe},audio:Pl,outputLatencyMs:()=>de?.outputLatencyMs??null,swing:()=>$.liveSwing});let Re="",gi=0,bi=!1,da=Number.NEGATIVE_INFINITY,ke=null;const I=new Qt;let Se=!1;function D(n=F()){return!Se&&O.transport.isPlayingAt(n)}function De(n){if(!R.isLeader)return;const e=bl(performance.now(),da,n);if(e>0){ke===null&&(ke=setTimeout(()=>{ke=null,De(!0)},e));return}ke!==null&&(clearTimeout(ke),ke=null),R.publishState()&&(da=performance.now())}function ua(){const n=bi?$s($.doc).tracks:$.doc.tracks;return Se?n.map(e=>({...e,mute:!0})):n}function qe(){if(!de)return null;const n=Math.round(de.offset*1e4)/1e4;return{offset:n,shifted:Di(O.toSnapshot(),n,"audio")}}const cn=new Bs(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function Ft(n=!1){const e=qe();e&&cn.set(e,n)}const Ol={mode:"lp",cutoff:1,resonance:0,drive:0};function Dt(n){const e=Be(n),t=Cs(n);return{v:2,chain:[{id:`${t.type}-1`,type:t.type,bypass:!e.filter||n.mode==="lp"&&n.cutoff>=.999,dials:t.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let qt=null;function Rl(){if(!Y)return;const n=Dt($.doc.fx),e=qt;if(qt=n,!e||e.chain.some((t,a)=>t.type!==n.chain[a]?.type)){Y.setState(n);return}n.chain.forEach((t,a)=>{const s=e.chain[a];if(s){s.bypass!==t.bypass&&Y?.setParam(t.id,"bypass",t.bypass);for(const[r,o]of Object.entries(t.dials))s.dials[r]!==o&&Y?.setParam(t.id,r,o)}})}function yi(n,e,t,a){return{clock:n,measure:H,swing:$.followSwing??e.swing,fx:Ol,...a===void 0?{}:{glideSeconds:a},tracks:t.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),params:e.tracks.map(s=>({voice:s.voice,params:{...s.params}}))}}let Z=null;function C(n="state"){const e=n==="state"?qe():cn.current??qe();if(!K||!e)return;ql(),n!=="state"&&(Re="");const{offset:t,shifted:a}=e,s=Z;s!==null&&(Z=null,Re="");const r=$.consumeGlide(),o=JSON.stringify({seen:I.lastTaken,offset:t,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:$.liveSwing,glide:r??null,tracks:ua(),fx:$.doc.fx});if(Rl(),o===Re)return;Re=o;const l={...yi(a,$.doc,ua(),r),seen:I.lastTaken,...s===null?{}:{enterBeat:s}};gi=t,K.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const Me=Tl("petra-rhythm",ut),dn=Me?Ml(Me.ctx,[ca]):kl([ca],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function pt(){const n=dn.load();if(M)return;const e=await n;if(M){e!==M&&e.close().catch(()=>{});return}if(M=e,H){const a=M,s=a.getOutputTimestamp.bind(a);a.getOutputTimestamp=()=>{const r=s(),o=!Bt||!r.contextTime?r:{contextTime:r.contextTime+Bt/1e3,performanceTime:r.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),o.contextTime??0,o.performanceTime??0]),o}}M.addEventListener("statechange",()=>{L(),me()}),de=Me?.mapper??new es(M,Nl?{}:{stepThresholdMs:0}),de.onStep(a=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:a.stepSeconds*1e3,confirmedAt:a.confirmedAt,reanchors:a.reanchors,revert:a.revert===!0}),Ft(!0)}),de.start(),K=new AudioWorkletNode(M,"rhythm"),K.port.onmessage=a=>{if(a.data.switched!==void 0&&Hl(a.data.switched),a.data.level!==void 0&&a.data.step!==void 0&&(fi=a.data.level,st!==a.data.step&&(st=a.data.step,L())),!(!H||!M)){for(const s of a.data.onsets??[])window.__kicks?.push({step:s.step,beat:s.beat,shared:s.contextTime-gi});for(const s of a.data.onsets??[]){const r=oa(M,s.contextTime);r&&window.__onsets?.push({app:rn,beat:s.beat,contextTime:s.contextTime,hidden:document.hidden,stampAgeMs:(M.currentTime-s.contextTime)*1e3,...r})}for(const s of a.data.render??[]){const r=oa(M,s.contextTime);r&&window.__render?.push({contextTime:s.contextTime,peak:s.peak,playedMs:r.playedMs})}}},Y=Xo(M,{moduleUrl:El()??Qo,slots:3,state:Dt($.doc.fx)}),qt=Dt($.doc.fx),K.connect(Y.input),window.__hacks=()=>({state:Y?.getState(),status:Y?.status}),Y.output.connect(Me?.output??M.destination);let t=!1;cn.subscribe(()=>C(t?"clock":"attach")),O.subscribe(a=>Ft(a.kind==="snapshot"&&a.replay===!0)),t=!0}const ue=new js;let un=!1,Ze=null,Te=null;function ht(){return!M||M.state!=="running"}function Il(){return Te=ue.mode(ht(),D()),Te}function pn(){return Ze??=(async()=>{try{Z=Number.POSITIVE_INFINITY,M&&C(),await pt(),M&&M.state!=="running"&&await M.resume();const n=O.transport;Z=ue.enter(n.beatAt(F()),n.bpm),Ht&&(Ht=!1,Z=Math.floor(n.beatAt(F())/4)*4);const e=Z;un=!0,mn(),C(),H&&(window.__join={...ue.toJSON(),tapBeat:wi,sentBeat:e})}catch(n){throw ue.cancel(),Z=Number.NEGATIVE_INFINITY,C(),n}})().finally(()=>{Ze=null,L(),me()}),Ze}let wi=Number.NaN,Ht=!1;function vi(n){const e=n instanceof KeyboardEvent&&n.repeat;ue.gesture(ht(),D(),e)&&(wi=O.transport.beatAt(F()),pn().catch(ki))}document.addEventListener("pointerdown",vi,{capture:!0});document.addEventListener("keydown",vi,{capture:!0});document.addEventListener("pointerup",()=>{ue.pending&&M&&M.state!=="running"&&M.resume()},{capture:!0});function ki(n){console.warn("[rhythm] audio couldn't start",n),ae.say("Audio couldn't start. Press Play to try again."),L()}function hn(){jl().catch(ki)}async function jl(){if(ue.swallowClick(ht(),D())){await pn();return}await $i()}let ze=null;function me(){if(ze!==null&&(clearTimeout(ze),ze=null),!ht())return;Xe(!0,D())!==Te&&L();const n=F(),{startTime:e,stopTime:t}=O.transport,a=[e,t].filter(r=>r!==null&&r>n);if(a.length===0)return;const s=Math.min((Math.min(...a)-n)*1e3+1,2**31-1);ze=setTimeout(()=>{ze=null,me()},s)}const Bl=1500;function Fl(n){let e,t;const a=new Promise(o=>{e=setTimeout(()=>o(!1),Bl)}),s=new Promise(o=>{t=()=>{n.state==="running"&&o(!0)},n.addEventListener("statechange",t)}),r=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Et=!1;function Dl(){M?M.state!=="running"&&M.resume().catch(()=>{}):dn.load().catch(()=>{})}async function $i(){if(Et){Dl();return}Et=!0;try{if(await pt(),!M)return;if(M.state!=="running"&&!await Fl(M)&&!D()){ae.say("Tap Play to start audio"),L();return}}finally{Et=!1}if(Me&&O.transport.isPlayingAt(F())){Se?(Se=!1,Z=Math.ceil(O.transport.beatAt(F())/4-1e-9)*4):Se=!0,$.playing=D(),Re="",C(),L();return}if(D()){O.stop({at:F()});return}O.play({at:F()}),!R.isLeader&&[...R.peers.values()].some(n=>n.leader)&&(un=!0,mn(),L())}const ae=new fl(()=>L());function he(){return un&&!R.isLeader}function mn(){!he()||!$.adoptSwing(R.swing)||(C(),L())}function xi(n,e,t){const a=$.peek(n),s=qe();if(!a||!K||!s)return!1;const r=O.transport.beatAt(F()),o=I.recall(n,r,{glide:e},t===void 0?{}:{atBeat:t});return Ei(o,a,s.shifted),!0}let Si="";function Ti(n){return he()?$.followSwing??n.swing:n.swing}function Ai(n,e){return JSON.stringify([n,Ti(e),e.fx,e.tracks])}function Ei(n,e,t){if(!K)return;Si=Ai(n.id,e);const a={...yi(t,e,e.tracks,n.payload.glide),swing:Ti(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};K.port.postMessage({type:"state",state:a})}function ql(){const n=I.pending;if(!n||!K)return;const e=$.peek(n.slot);if(!e){I.cancel();return}if(Ai(n.id,e)===Si)return;const t=qe();t&&Ei(n,e,t.shifted)}function fn(n,e){const t=$.liveSwing;return $.recall(n,e)?(he()||($.followSwing=null),$.liveSwing!==t&&De(!0),!0):!1}function Hl(n){const e=I.takeHeld(n);e&&(fn(e.slot,e.payload.glide),$.consumeGlide(),C(),L())}function Mi(n){if(I.cancel(),!fn(n,$.recallGlideSeconds))return;const e=$.recallGlideSeconds>0?$.recallGlideSeconds:0;R.sendSnapshot("recall",n,{atBeat:O.transport.beatAt(F()),...e>0?{glide:{seconds:e}}:{}})}function Ul(n){if(I.tap(n,D()).kind==="queue"){const t=$.recallGlideSeconds>0?$.recallGlideSeconds:0;if(xi(n,t,Na(O.transport.beatAt(F())))){const a=I.pending?.atBeat;R.sendSnapshot("recall",n,{...a===void 0?{}:{atBeat:a},...t>0?{glide:{seconds:t}}:{}});return}}Mi(n)}function Ae(n,e){const t=ya[n]??"";if(e==="store")$.store(n),ae.say(At(e,t,!0));else if(e==="clear"){const a=$.bank.slots[n]!=null;if(I.queued===n){const s=I.drop();I.cancel();const r=$.bank.active;s&&r!=null&&R.sendSnapshot("recall",r,{atBeat:s.atBeat})}$.clear(n),ae.say(At(e,t,a)),a&&Le.show(He,`Slot ${t} cleared`)}else $.bank.slots[n]==null?ae.say(At(e,t,!1,matchMedia("(pointer: coarse)").matches)):Ul(n);C(),L()}function He(){$.undoSurprise()&&(Le.dismiss(),C(),L())}function Wl(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),He();return}if(n.code==="Space"){n.preventDefault(),n.repeat||hn();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const a=t===0?9:t-1;a<0||a>=X||(n.preventDefault(),n.shiftKey?Ae(a,"store"):n.altKey?Ae(a,"clear"):Ae(a,"recall"))}const Gl=new Fs({min:pe[0],max:pe[1]});function Ut(n){$.doc.bpm=n,O.setTempo({bpm:n}),C(),L()}function Kl(){return he()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Li(){const n=D(),e=Il(),t=he();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:ae.text,controls:[{type:"button",id:"play",label:Ca(e),on:e==="stop",...e==="join"?{ariaLabel:La}:{},onPress:()=>hn(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{$.surprise(),C(),L(),Le.show(He)}},{type:"slider",id:"bpm",label:"Tempo",min:pe[0],max:pe[1],step:1,value:O.transport.bpm,onChange:Ut,onTap:a=>{const s=Gl.tap(a);s!==null&&s!==O.transport.bpm&&Ut(s)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:$.liveSwing,valueText:Ts($.liveSwing),disabled:t,modulated:t&&$.followSwing!=null,onChange:a=>{he()||Ze||($.setSwing(a),De(!1),C(),L())},onCommit:()=>{De(!0)}},...R.isLeader?[]:[{type:"note",id:"swing-note",text:Kl()}],...R.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:R.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:$.morphSeconds,morphText:ml($.morphSeconds),slots:ya.map((a,s)=>({label:a,filled:$.bank.slots[s]!=null,active:$.bank.active===s,edited:$.edited===s,queued:I.queued===s,pulse:I.queued===s&&n&&st%4<2})),onMorph:a=>{$.morphSeconds=a,L()},onSlot:(a,s)=>{Ae(a,s)}}]}}function Wt(){const n=$.doc.tracks.length;return n===0?0:Math.min($.selectedTrack,n-1)}function Ci(){const n=$.doc.tracks[Wt()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${$.doc.tracks.length} tracks · ${n.name}`:`${$.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Te==="stop",label:Ca(Te??"play"),...Te==="join"?{ariaLabel:La}:{},onToggle:()=>hn()},id:"grid",playhead:D()?st:-1,selectedRow:n?.id,onSelectRow:e=>{$.selectTrack(e),L()},onDice:e=>{const t=$.doc.tracks[e]?.name??"Lane";$.diceLane(e)&&(C(),L(),Le.show(He,`New ${t} steps`))},onFill:e=>{bi=e,C(),L()},onLength:(e,t)=>{$.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(t))))}),C(),L()},onMute:e=>{$.edit(t=>{const a=t.tracks[e];a&&(a.mute=!a.mute)}),C(),L()},onSolo:e=>{$.edit(t=>{const a=t.tracks[e];a&&(a.solo=!a.solo)}),C(),L()},onToggle:(e,t,a)=>{$.edit(s=>{const r=s.tracks[e]?.steps[t];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),C(),L()},onLongPress:(e,t,a)=>{const s=$.doc.tracks[e],r=s?.steps[t];!s||!r||ro({anchor:a,title:`${s.name} · step ${t+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{$.edit(p=>{const c=p.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),C(),L()}})},onSet:(e,t,a,s)=>{$.edit(r=>{const o=r.tracks[e]?.steps[t];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),C(),L()},rows:$.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))}]},Vl()]}}function Vl(){const n=Wt(),e=$.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(a=>({type:"slider",id:a,label:Es(a),valueText:As(a,e?.params[a]??0),min:a==="tune"?20:0,max:a==="tune"?800:1,step:a==="tune"?1:.01,value:e?.params[a]??0,onChange:s=>{$.edit(r=>{const o=r.tracks[Wt()];o&&(o.params[a]=s)}),C(),L()}}))}}function Gt(n,e){$.edit(t=>{const a=Be(t.fx);e(a[n]),t.fx.hacks=a}),C(),L()}function Yl(n,e){const t=Be($.doc.fx)[n].dials[e.key]??e.default,a=`hack-${n}-${e.key}`,s=r=>Gt(n,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(t),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:t,valueText:si(e,t,$.doc.bpm),onChange:s}}const Mt=(n,e)=>(J(n)?.dials??[]).filter(t=>!t.key.startsWith("mod_")&&t.more===!0===e).map(t=>Yl(n,t));function Xl(n){return n>=1e3?`${(n/1e3).toFixed(n>=1e4?0:1)} kHz`:`${Math.round(n)} Hz`}function gn(){const n=$.doc.fx,e=Be(n),t=n.mode==="lp"&&n.cutoff>=.999,a=r=>{$.edit(r),C(),L()},s=[e.filter&&!t?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:s.length?s.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:r=>a(o=>{o.fx.hacks={...Be(o.fx),filter:r}}),controls:[{type:"select",id:"mode",label:"Mode",value:n.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(o=>{(r==="lp"||r==="hp"||r==="bp")&&(o.fx.mode=r)})},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:n.cutoff,valueText:t?"open":Xl(Sa(n.cutoff)),onChange:r=>a(o=>{o.fx.cutoff=r})},...n.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:n.resonance,valueText:Yt(n.resonance),onChange:r=>a(o=>{o.fx.resonance=r})}],{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:n.mode,cutoff:n.cutoff,resonance:n.mode==="lp"?0:n.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:r=>Gt("drive",o=>{o.on=r}),controls:Mt("drive",!1),more:Mt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:r=>Gt("compressor",o=>{o.on=r}),controls:Mt("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:fi}]}}await ai();const Ni=tn(Li());await nn();const bn=tn({id:"pattern",title:"Pattern",lead:!0}),yn=tn({id:"filter",title:gn().title}),_i={build:()=>bn.update(Ci())},zi={build:()=>yn.update(gn())};let rt=null;function L(){$.takeSurpriseEdit()&&Le.dismiss(),Ni.update(Li()),rt?.ready(_i)&&bn.update(Ci()),rt?.ready(zi)&&yn.update(gn()),on?.schedule()}window.addEventListener("pagehide",()=>on?.flush());function pa(n,e,t){I.cancel(),$.replace(n,e),C(),L(),on?.schedule(),Le.show(He,t)}ll(zl,{save:()=>{const n=$.doc.name||"rhythm",e=URL.createObjectURL(new Blob([Ms($.doc,$.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),ae.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=Ls(n);if(!t.ok||!t.document||!t.bank){ae.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}pa(t.document,t.bank,`Loaded ${e}`)},create:()=>pa(Os(),wa(),"New pattern"),panic:()=>K?.port.postMessage({type:"panic"})});O.onChange(()=>{if(O.transport.running||(Se=!1),$.playing=D(),!$.playing&&I.pending){const n=I.drop();n&&Mi(n.slot)}$.doc.bpm=O.transport.bpm,C(),L(),me()});R.onSwing(n=>{he()&&$.adoptSwing(n)&&C(),L()});R.onSnapshot(n=>{if(n.op!=="recall")return;const e=R.peers.get(n.from)?.app;if(!Us(rn,e,Cl)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:F()});const t=n.glide?.seconds??0;if(D()&&xi(n.slot,t,n.atBeat)){L();return}I.cancel(),fn(n.slot,t),C(),L()});R.onRole(()=>{mn(),L(),me()});R.onPeers(()=>{L(),me()});H&&(window.__rhythm={setKick:n=>{$.edit(e=>{const t=e.tracks.find(a=>a.voice==="kick");t&&t.steps.forEach((a,s)=>{a.on=n.includes(s)})}),C(),L()},store:n=>Ae(n,"store"),tap:n=>Ae(n,"recall"),tempo:n=>Ut(n),beat:()=>O.transport.beatAt(F()),timeAt:n=>O.transport.timeAt(n),slots:()=>({active:$.bank.active??null,queued:I.queued}),swing:()=>{const n=$.bank.active;return{live:$.liveSwing,doc:$.doc.swing,slot:n==null?null:$.bank.slots[n]?.swing??null,leader:R.isLeader}},setSwing:n=>{$.setSwing(n),De(!0),C(),L()},lateEnter:()=>{Ht=!0},audio:async()=>(await pt(),await M?.resume(),M?.state??"none")});await nn();await R.start();document.addEventListener("keydown",Wl);ho(ln,[Ni,bn,yn],"adjacent");await nn();L();rt=fo([_i,zi]);me();rt.done.then(()=>{dn.preload(),Me&&pt().then(()=>{D()&&M?.state==="running"&&pn()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=D();if(n!==$.playing&&($.playing=n,L()),Ft(),C(),!H||!M)return;const e=pl(M);e&&window.__stamps?.push(e)},250);
