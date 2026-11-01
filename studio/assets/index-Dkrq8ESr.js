(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const Ne=1e-9;function Lr(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class An{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Lr(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+Ne&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+Ne)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Ne){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ne;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new An({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+Ne)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+Ne)return n[i];return n[0]}}const Mr=Object.freeze({beatsPerBar:4,beatUnit:4}),Be=1e-9;function Tr(t){return Math.floor(t+Be)}function Za(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Be)*e;return n&&r<=t+Be?r+e:r}class Nr{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new An({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Mr}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Be&&(this.stopTime===null||e<this.stopTime-Be)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Be?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Tr(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return Za(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Xa="nc-clock/snapshot",Va=1;function Cr(t,e="local"){return{format:Xa,version:Va,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ir(t,e){const n=Rr(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const oe=t=>typeof t=="number"&&Number.isFinite(t),Vn=t=>t===null||oe(t);function Rr(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Xa&&n("format"),(!oe(e.version)||Math.floor(e.version)!==Va)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!oe(e.anchor.beat)||!oe(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&oe(i.beat)&&oe(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!oe(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!oe(e.meter.beatUnit))&&n("meter"),(!Vn(e.startTime)||!Vn(e.stopTime)||!oe(e.stoppedBeat))&&n("transport times"),e}class zr{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Nr(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Ir(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Cr(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Or="nc-sync/1",Fr=1,Br="nc-sync",Pr="nc-sync-leader",jr=0,Ua=.5,qa=.75;function Wr(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Ua&&t<=qa?t:null}const Vt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),qe=t=>typeof t=="number"&&Number.isFinite(t),vt=t=>typeof t=="string"&&t.length>0;function Gr(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Fr||!vt(e.type)||!vt(e.from)||!qe(e.term)||!qe(e.seq)||!qe(e.sentAt))return null;switch(e.type){case"hello":return vt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return qe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&qe(e.slot)?e:null;case"ping":case"pong":return vt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Hr(t,e,n,i,r){return{proto:Or,from:e,term:n,seq:i,sentAt:r,...t}}function Ke(){return(performance.timeOrigin+performance.now())/1e3}const Ut=.003,_r=3,Dr=.01,Un=500;class Yr{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Dr:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Ut&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<c.length;p++)d.push(c[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,u=e-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ut&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Un)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ut)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Un)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(_r,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class Zr{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Vt,...e.capabilities},this.channelOption=e.channel??Br,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Za(u,1),u);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(qa,Math.max(Ua,e)):jr;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Wr(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Gr(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Vt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Vt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Pr,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Hr(e,this.id,this.term,++this.seq,this.o.now()))}}const Xr="modulepreload",Vr=function(t){return"/studio/"+t},qn={},Ur=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=Vr(c),c in qn)return;qn[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Xr,d||(f.as="script"),f.crossOrigin="",f.href=c,u&&f.setAttribute("nonce",u),document.head.appendChild(f),d)return new Promise((g,y)=>{f.addEventListener("load",g),f.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var qr=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],dn=[.25,.5,.75,1,1.5,2],Kr=4.9,W={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},xe={fmt:"wet"},ee={fmt:"pct"},Ce={fmt:"db"},wt={fmt:"signedPct"},qt={fmt:"num",suffix:" ms"},j={div:100};function N(t,e,n,i,r,o,s,l){var u={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function $t(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var it=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[N("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[N("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:W.hpHz,astrid:!0,zero:"off"}),N("q","Resonance",0,100,0,2,{fmt:"q",law:W.hpQ},{dsp:{law:W.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[N("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:W.bpHz,astrid:!0},{dsp:{law:W.bpHz}}),N("q","Q",0,100,0,2,{fmt:"q",law:W.bpQ},{dsp:{law:W.bpQ}}),N("mix","Mix",0,100,100,3,xe,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[N("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:$t(qr),overriddenBy:"beats_free",tempoSynced:!0}),N("feedback","Feedback",0,90,35,2,ee,{dsp:j,unit:"%"}),N("mix","Wet/dry",0,100,0,3,xe,{dsp:j,unit:"%",astridKey:"wet"}),N("tone","Tone",0,100,100,4,{fmt:"hz",law:W.delayTone,offAt:100},{dsp:{div:99},more:!0}),N("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),N("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:$t([[0,"Insert"],[1,"Send"]]),more:!0}),N("send","Send",0,100,100,7,ee,{dsp:j,unit:"%",more:!0}),N("mod_send","Accent → send",-100,100,0,8,wt,{dsp:j,unit:"%",more:!0}),N("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[N("predelay","Pre-delay",0,200,0,1,qt,{dsp:{div:1e3},unit:"ms"}),N("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),N("decay","Decay",0,100,50,3,ee,{dsp:j,unit:"%"}),N("damping","Damping",0,100,0,4,ee,{dsp:j,unit:"%"}),N("mix","Mix",0,100,0,5,xe,{dsp:j,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[N("rate","Rate",0,100,26,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),N("depth","Depth",0,100,70,2,ee,{dsp:j,unit:"%"}),N("feedback","Feedback",-90,90,50,3,wt,{dsp:j,unit:"%"}),N("mix","Mix",0,100,50,4,xe,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[N("rate","Rate",0,100,52,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),N("depth","Depth",0,100,50,2,ee,{dsp:j,unit:"%"}),N("spread","Spread",0,100,70,3,ee,{dsp:j,unit:"%"}),N("mix","Mix",0,100,40,4,xe,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[N("rate","Rate",0,100,39,1,{fmt:"rate",law:W.rate},{dsp:{law:W.rate}}),N("depth","Depth",0,100,70,2,ee,{dsp:j,unit:"%"}),N("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:$t([[4,"4"],[6,"6"],[8,"8"]])}),N("feedback","Feedback",0,90,30,4,ee,{dsp:j,unit:"%"}),N("mix","Mix",0,100,50,5,xe,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[N("low_db","Low",-18,18,0,1,Ce,{unit:"dB"}),N("mid_db","Mid",-18,18,0,2,Ce,{unit:"dB"}),N("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:W.midHz,astrid:!0},{dsp:{law:W.midHz}}),N("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:W.eqQ},{dsp:{law:W.eqQ}}),N("high_db","High",-18,18,0,4,Ce,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[N("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),N("output_db","Output",-12,12,0,2,Ce,{unit:"dB"}),N("mix","Mix",0,100,100,3,xe,{dsp:j,unit:"%"}),N("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:$t([[0,"Smooth"],[1,"Acid"]]),more:!0}),N("tone","Tone",0,100,100,5,{fmt:"hz",law:W.driveTone,offAt:100},{dsp:{div:99},more:!0}),N("mod_drive","Accent → drive",-100,100,0,6,wt,{dsp:j,unit:"%",more:!0}),N("mod_tone","Accent → tone",-100,100,0,7,wt,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[N("threshold_db","Threshold",-60,0,0,1,Ce,{unit:"dB"}),N("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:W.ratio},{dsp:{law:W.ratio}}),N("attack_ms","Attack",1,100,10,3,qt,{unit:"ms"}),N("release_ms","Release",10,1e3,150,4,qt,{unit:"ms"}),N("makeup_db","Makeup",0,24,0,5,Ce,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[N("width","Width",0,200,100,1,ee,{dsp:j,unit:"%"}),N("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],Jr=it.map(function(t){return t.type}),Qr=it.filter(function(t){return!t.hidden}).map(function(t){return t.type}),eo={reverb:"plate"};function Ln(t){var e=eo[t]||t;return Jr.indexOf(e)>=0?e:null}function ie(t){for(var e=Ln(t),n=0;n<it.length;n++)if(it[n].type===e)return it[n];return null}function ze(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Ka(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=ze(n.law,e);return i===null?0:i}function Kn(t,e){return Math.min(Kr,t*60/(e>0?e:120))}var Jn=function(t){return t>0?"+":t<0?"−":""};function to(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Ja(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:Jn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Jn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=ze(i.law,e),r===null?i.zero||"open":i.astrid?to(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+ze(i.law,e).toFixed(1);case"ratio":return ze(i.law,e).toFixed(1)+":1";case"rate":return r=ze(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Kn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Kn(e,n)*1e3)+" ms"}return String(e)}var no=1,Gt=["drive","delay","plate"];function ao(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return Ja(t,i,r)},e}var Pe=Gt.map(function(t){var e=ie(t),n={type:t,label:e.label,dials:e.dials.map(ao)};return e.tempoSynced&&(n.tempoSynced=!0),n}),io={reverb:"plate"};function Rt(t){var e=io[t]||t;return Gt.indexOf(e)>=0?e:null}function Ht(t){for(var e=Rt(t),n=0;n<Pe.length;n++)if(Pe[n].type===e)return Pe[n];return null}function Qa(t,e){var n=Ht(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function He(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function we(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function ro(){return{v:no,chain:Pe.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function oo(t){return dn.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},dn[0])}function Kt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function so(t){for(var e=Array.isArray(t)?t:Kt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=ro(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(Kt(l)){var u=Rt(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(r[u]){o.push(u);continue}r[u]=!0;var c=i.chain[Gt.indexOf(u)],d=Kt(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,Ht(u).dials.forEach(function(p){c.dials[p.key]=we(p,d[p.key])}),lo(u,c.dials,d)}}return{state:i,dropped:o}}function lo(t,e,n){for(var i=Ht(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=we(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],He(o,e)))}}function zt(t){return so(t).state}function co(t){return JSON.parse(JSON.stringify(t))}var uo=24,un={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function pn(t,e,n){if(e==="bypass")return n?0:1;var i=Qa(t,e)||po(t,e);return i?Ka(i,n):0}function po(t,e){var n=ie(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var mo={};Pe.forEach(function(t){t.dials.forEach(function(e){mo[t.type+"."+e.key]=e.format})});function Jt(t,e){var n=new Float64Array(uo),i=zt(t);return i.chain.forEach(function(r){var o=un[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=pn(r.type,s,r.dials[s])})}),n}var ho=2,Ot=3,fo=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Je(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ei(t,e){var n=ie(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function go(t){var e=ie(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function bo(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function yo(t){return typeof t=="number"&&isFinite(t)?oo(t):t}function Qn(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=yo(o)),i[r.key]=we(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=we(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],He(r,i)))}),i}function vo(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=ze(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,i=o)}return i}}var wo={rate:"rate_hz"};function $o(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||wo[o.key]||o.key;r[o.key]=vo(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function xo(t,e){var n=e>0?Math.floor(e):Ot,i=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):Je(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var u=[],c=0;c<o.length;c++){var d=o[c];if(Je(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=Ln(d.type),f=p&&ie(p);if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&i.push(d.type);continue}if(u.length>=n){i.push(d.id||p);continue}var g;Je(d.params)&&!Je(d.dials)?g=Qn(f,$o(f,d.params,r,d.id||p),l):g=Qn(f,Je(d.dials)?d.dials:{},l);var y=ei(p,u),v=typeof d.id=="string"&&fo.test(d.id)&&!u.some(function(h){return h.id===d.id})?d.id:y.id,m=s?d.bypass!==!1:d.bypass===!0;u.push({id:s?y.id:v,type:p,bypass:m,dials:g})}}return{state:{v:ho,chain:u},dropped:i,notes:r}}function At(t,e){return xo(t,e).state}function Ie(t){var e=ie(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Ka(i,t.dials[i.key])])}),n}function ko(t){var e=At(t,8),n=[],i=e.chain.map(function(r,o){var s=ie(r.type),l={};return o>=Ot&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=r.dials[u.key];if(u.more){c!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&dn.indexOf(c)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:i,lossy:n}}var So="nc-fx@1",Eo=600,Ao=256,Lo=8,Qe=typeof WeakMap=="function"?new WeakMap:null;function Mo(t,e){var n=Qe&&Qe.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Ur(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Qe&&(Qe.set(t,n),n.catch(function(){Qe.delete(t)})),n)}function Re(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ti(t,e,n,i){var r=Math.min(400,Math.max(20,Re(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Re(e.preGain,1),c=Math.max(0,Re(e.crossfade,.012)),d=Re(e.maxDelaySeconds,void 0),p=t.createGain(),f=t.createGain(),g=t.createGain(),y=t.createGain(),v=null;e.modInput===!0&&(v=t.createGain(),v.channelCount=1,v.channelCountMode="explicit",v.channelInterpretation="discrete"),y.gain.value=0,p.connect(g),g.connect(f),y.connect(f);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);m.post=function($){m.node?m.node.port.postMessage($):m.disposed||(o.length>=Ao&&(o=i().concat([{t:"tempo",bpm:m.bpm,when:0}])),o.push($))};function b($){var E=o.map(function(A){var M=Object.assign({},A);return M.when>$||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],E}m.emit=function($){for(var E=0;E<m.listeners.length;E++)try{m.listeners[E]($)}catch(A){typeof console<"u"&&console.error(A)}},m.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var w=!1;m.tooFar=function($){return typeof $=="number"&&$>t.currentTime+Eo?(!w&&typeof console<"u"&&(w=!0,console.warn("nc-fx: ignoring a time "+Math.round($-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Mo(t,e.moduleUrl).then(function(){if(!m.disposed){var $=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:d},h);$.pending=b(t.currentTime),m.node=new AudioWorkletNode(t,So,{numberOfInputs:v?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),p.connect(m.node),v&&v.connect(m.node,0,1),m.node.connect(y);var E=t.currentTime;E<=0||c===0?(g.gain.value=0,y.gain.value=1):(g.gain.setValueAtTime(1,E),g.gain.linearRampToValueAtTime(0,E+c),y.gain.setValueAtTime(0,E),y.gain.linearRampToValueAtTime(1,E+c)),m.status="ready"}},function($){m.status="unavailable",o=[],m.error=$});return m.core={input:p,output:f,modInput:v,ready:S,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function($,E){var A=Re($,NaN);!(A>0)||m.disposed||m.tooFar(E)||(m.bpm=Math.min(400,Math.max(20,A)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(E)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function($){var E=$&&typeof $=="object"?$:{at:$};if(!(m.disposed||m.tooFar(E.at))){var A=Re(E.fadeMs,0);m.post({t:"clear",when:m.whenOf(E.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function($){return m.listeners.push($),function(){var E=m.listeners.indexOf($);E>=0&&m.listeners.splice(E,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",o=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,g,y,f,v].forEach(function($){try{$&&$.disconnect()}catch{}})}}},m}function ea(t,e){var n=e||{};if(n.slots)return To(t,n);var i=zt(n.state),r=Array.from(Jt(i)),o=ti(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Jt(i)),when:0}]}),s=o.core;function l(u){return i.chain[Gt.indexOf(u)]}return s.setParam=function(u,c,d,p){var f=Rt(u);if(!(!f||o.disposed||o.tooFar(p))){var g=l(f),y;if(c==="bypass")y=!!d;else{var v=Qa(f,c);if(!v)return;y=we(v,d,He(v,g.dials))}return c==="bypass"?g.bypass=y:g.dials[c]=y,o.post({t:"p",i:un[f][c],v:pn(f,c,y),when:o.whenOf(p)}),o.emit({effect:f,key:c,value:y}),Ht(f).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function(w){return w.key===c}))){var h=g.dials[m.key],b=we(m,h,He(m,g.dials));b!==h&&(g.dials[m.key]=b,o.post({t:"p",i:un[f][m.key],v:pn(f,m.key,b),when:o.whenOf(p)}),o.emit({effect:f,key:m.key,value:b}))}}),y}},s.getParam=function(u,c){var d=Rt(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},s.getState=function(){return co(i)},s.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(i=zt(u),o.post({t:"load",program:Array.from(Jt(i)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function To(t,e){var n=e.slots===!0?Ot:Math.max(1,Math.min(Lo,Math.floor(+e.slots)||Ot)),i=At(e.state,n),r=1,o={};function s(m){return o[m.id]||(o[m.id]=r++),o[m.id]}function l(m){return m.map(function(h){return{uid:s(h),type:h.type,program:Ie(h)}})}var u=l(i.chain),c=i.chain.map(function(m){return o[m.id]}),d=ti(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(m){return o[m.id]}),when:0}]}),p=d.core;function f(m){var h;for(h=0;h<i.chain.length;h++)if(i.chain[h].id===m)return i.chain[h];var b=Ln(m);if(b){for(h=0;h<i.chain.length;h++)if(i.chain[h].type===b)return i.chain[h]}return null}function g(m,h){var b=s(m);d.post({t:"add",uid:b,type:m.type,when:h}),Ie(m).forEach(function(w){d.post({t:"ps",uid:b,k:w[0],v:w[1],when:h,snap:!0})})}function y(m){d.post({t:"order",uids:i.chain.map(function(h){return o[h.id]}),when:m})}function v(m,h){var b={};i.chain.forEach(function($){b[$.id]=$});var w=i.chain.map(function($){return o[$.id]}).join();m.chain.forEach(function($){var E=b[$.id];if(!E||E.type!==$.type){delete o[$.id],g($,h);return}var A={};Ie(E).forEach(function(M){A[M[0]]=M[1]}),Ie($).forEach(function(M){A[M[0]]!==M[1]&&d.post({t:"ps",uid:o[$.id],k:M[0],v:M[1],when:h})})});var S={};m.chain.forEach(function($){S[$.id]=!0}),Object.keys(o).forEach(function($){S[$]||delete o[$]}),i=m,i.chain.map(function($){return o[$.id]}).join()!==w&&y(h)}return p.slots=n,p.setParam=function(m,h,b,w){var S=f(m);if(!(!S||d.disposed||d.tooFar(w))){var $=ie(S.type),E,A=null;if(h==="bypass")E=!!b;else{for(var M=0;M<$.dials.length;M++)$.dials[M].key===h&&(A=$.dials[M]);if(!A)return;E=we(A,b,He(A,S.dials))}var F={},z={};Ie(S).forEach(function(R){F[R[0]]=R[1]}),$.dials.forEach(function(R){R.stepWhen&&(z[R.key]=S.dials[R.key])}),h==="bypass"?S.bypass=E:S.dials[h]=E,$.dials.forEach(function(R){R.stepWhen&&(S.dials[R.key]=we(R,S.dials[R.key],He(R,S.dials)))});var V=d.whenOf(w),D=o[S.id];return Ie(S).forEach(function(R){(F[R[0]]!==R[1]||A&&R[0]===A.k)&&d.post({t:"ps",uid:D,k:R[0],v:R[1],when:V})}),d.emit({effect:S.id,key:h,value:E}),Object.keys(z).forEach(function(R){R!==h&&S.dials[R]!==z[R]&&d.emit({effect:S.id,key:R,value:S.dials[R]})}),E}},p.getParam=function(m,h){var b=f(m);if(b)return h==="bypass"?b.bypass:b.dials[h]},p.getState=function(){return JSON.parse(JSON.stringify(i))},p.setState=function(m,h){d.disposed||d.tooFar(h&&h.at)||(v(At(m,n),d.whenOf(h&&h.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(m,h){var b=h||{},w=ei(m,i.chain);if(!(!w||i.chain.length>=n||d.disposed||d.tooFar(b.at))){if(b.dials){var S=At({v:2,chain:[{id:w.id,type:w.type,dials:b.dials}]},1).chain[0];w.dials=S.dials}b.bypass===!0&&(w.bypass=!0);var $=i.chain.slice(),E=typeof b.index=="number"?Math.max(0,Math.min($.length,b.index)):$.length;return $.splice(E,0,w),v({v:2,chain:$},d.whenOf(b.at)),d.emit({effect:w.id,key:"chain",value:"add"}),w.id}},p.removeEffect=function(m,h){var b=f(m),w=h&&h.at;return!b||d.disposed||d.tooFar(w)?!1:(v({v:2,chain:i.chain.filter(function(S){return S!==b})},d.whenOf(w)),d.emit({effect:b.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(m,h,b){var w=f(m),S=b&&b.at;if(!w||d.disposed||d.tooFar(S))return!1;var $=bo(i.chain,i.chain.indexOf(w),h);return $===i.chain?!1:(v({v:2,chain:$},d.whenOf(S)),d.emit({effect:w.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return i.chain.map(function(m){return{id:m.id,type:m.type,name:go(m),bypass:m.bypass}})},p.toAstrid=function(){return ko(i)},p}function ta(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function ni(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,u=l&&l.tempo?l.tempo:l,c=!1;function d(f){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var g=o(l.timeAt(f));return typeof g=="number"&&isFinite(g)?g:void 0}}function p(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var g=l&&typeof l.bpm=="number"?l.bpm:ta(u,0);g>0&&t.setTempo(g);return}var y=ta(u,f);y>0&&t.setTempo(y);for(var v=u&&(u.points||u.tempoPoints)||[],m=0;m<v.length;m++){var h=v[m];if(h.beat>f&&h.bpm>0){var b=d(h.beat);b!==void 0&&t.setTempo(h.bpm,b)}}}return p(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,d(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&p())})}const mn="/studio/assets/worklet-CnpUVY5i.js";var No="nc-ui",ai={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},hn={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},Se={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},tt=t=>`--${No}-${t}`,fn=ai["label-on-fill-dark"],na=ai["label-on-fill-light"],Co=Se["label-min-contrast"],Io=/^#[0-9a-f]{6}$/i,Ro=t=>typeof t=="string"&&Io.test(t),Lt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function aa(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Lt(r(0)*255)}${Lt(r(8)*255)}${Lt(r(4)*255)}`}function ii(t){let[e,n,i]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/l%6):r===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:s}}function ia(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function gn(t,e){let[n,i]=[ia(t),ia(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var Ft=t=>gn(t,fn)>=gn(t,na)?fn:na;function ri(t,e,n,i=Co){let r=aa(t,e,n),o=Ft(r)===fn?1:-1;for(let s=0;s<40&&gn(r,Ft(r))<i;s++)n+=o*.01,r=aa(t,e,n);return r}function zo(t){let{h:e,s:n}=ii(t),i=ri(e,Math.min(n,Se["surprise-on-max-saturation"]),Se["surprise-on-lightness"]);return{fill:t,ink:Ft(t),on:i,onInk:Ft(i)}}var Oo=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Fo(t,e=Math.random){let[n,i]=Se["surprise-saturation"],[r,o]=Se["surprise-lightness"],s=Se["surprise-min-hue-gap"],l=Ro(t)?ii(t).h:null,u=e()*360;return l!==null&&Oo(u,l)<s&&(u=(l+s+e()*(360-2*s))%360),ri(u,n+e()*(i-n),r+e()*(o-r))}function Bo(t){if(!t)return null;let e=zo(t);return{[tt("surprise-fill")]:e.fill,[tt("surprise-ink")]:e.ink,[tt("surprise-on")]:e.on,[tt("surprise-on-ink")]:e.onInk}}var Po=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,jo=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ra(t){let[e,n,i]=[1,3,5].map(l=>Po(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Wo([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>Lt(jo(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Go=Se["velocity-range"],oi={min:hn.rhythm["velocity-min"],max:hn.rhythm["velocity-max"]};function Ho(t,e=oi){let[n,i]=Go,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=hn.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=ra(e.min),u=ra(e.max);return{velocity:r,t:o,fill:Wo(l.map((c,d)=>c+(u[d]-c)*o)),ink:s}}function oa(t,e=oi){return{[tt("velocity-fill")]:Ho(t,e).fill}}var _o={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Do={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Yo={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Zo={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},_t={};for(let[t,e]of Object.entries(Do))_t[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Zo))_t[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Yo))_t[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(_o.renames.map(t=>[t.old,t.new]));function si(t){let e=_t[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function H(t){return si(t).prop}function a(t){return`var(${H(t)})`}function Xo(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(H(e)));return Number.isFinite(n)?n:0}function X(t,e){let n=si(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Vo(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Uo(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var qo="[data-modulated], [data-modulated] *";function Ko(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${H("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${H("divider")}: ${a(`module-div-stack-${i}`)};
      ${H("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${H("text-sub")}: ${a("module-sub-stack-1")};
      ${H("divider")}: ${a("module-div-stack-1")};
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
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
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
${qo} { transition: none; }
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
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${a("control-gap")};
  color: ${a("text-sub")};
  font-weight: ${a("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${a("text")}; border-bottom-color: ${a("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${a("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${a("page-action-gap")}; }
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
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* The horizontal-fold toggle (foldToggle): a small solid triangle, about the ×'s size, in text-sub (ink on hover).
   ◀ while open, flipped to ▶ while folded; the flip takes motion-press, and reduced motion makes it instant. −/+
   (.nc-hide) stays the vertical hide: the triangle means fold sideways. */
.nc-fold-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: ${a("hairline")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${a("text")}; }
.nc-fold-toggle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${a("control-gap")} * 1.5);
  height: calc(${a("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${a("motion-press")} ${a("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${a("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${a("text")}; }
.nc-ui-fx-fold { display: none; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${a("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${a("control-gap")};
  border-bottom: ${a("hairline")} solid transparent;
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  line-height: ${a("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${a("text")}; border-bottom-color: ${a("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${a("body-size")};
  font-weight: ${a("fx-name-weight")};
  color: ${a("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${a("text")}; }
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
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${a("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${a("module-gap")};
  row-gap: ${a("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${a("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${a("text-sub")};
}
.nc-group-toggle:hover { color: ${a("text")}; }
.nc-group-toggle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${a("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${a("module-pad")}; min-width: 0; }
.nc-group-body[hidden] { display: none; }
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
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-group-toggle, .nc-page-action, .nc-step-tools .nc-fill, .nc-fill.nc-clear) { position: relative; }
  :is(.nc-hide, .nc-slim, .nc-toggle, .nc-ui-switch, .nc-seg > button, .nc-ui-more > summary, .nc-group-toggle, .nc-page-action, .nc-step-tools .nc-fill, .nc-fill.nc-clear)::before {
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
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${a("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${a("target-min")});
    height: max(100%, ${a("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${a("module-gap")} * -1); }
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
/* A slider row's input reaches up over its label (the target-min hit band), so with a mouse most of the label was the
   slider's and its description never opened (found in LUCY). With a fine pointer a described label sits above the
   band; touch keeps the full band and has no hover. Nothing moves. */
@media (hover: hover) and (pointer: fine) {
  .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
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
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  grid-template-areas: "strips fx meters master";
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
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${a("fx-card-width")});
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  border-inline-end: ${a("hairline")} solid ${a("module-div-stack-1")};
  background: ${a("module-bg-stack-1")};
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${H("text-sub")}: inherit;
  ${H("divider")}: inherit;
  ${H("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${a("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${a("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${a("module-bg-adjacent-4")}; }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${a("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${a("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${a("fx-card-width")}; }
  /* :has() counts its argument, so the folded card repeats it to win over the open cards' width. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-folded] {
    width: ${a("fx-fold-width")};
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { display: none; }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-fold { display: flex; }
}
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${a("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${a("slider-pitch")} ${a("slider-pitch")} calc(${a("knob-size")} + ${a("control-gap")} + ${a("label-size")} * ${a("label-leading")}) calc(${a("knob-size")} + ${a("control-gap")} + ${a("label-size")} * ${a("label-leading")}) auto auto;
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
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${a("control-gap")}; left: ${a("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
.nc-strip[data-nc-folded] { width: ${a("strip-fold-width")}; padding-inline: 0; align-content: start; }
.nc-strip[data-nc-folded] > .nc-strip-hd { justify-content: center; }
/* The name stays in the row, unseen and zero wide, so the row keeps the open strips' height and the meters line up. */
.nc-strip[data-nc-folded] > .nc-strip-hd > .nc-strip-name { visibility: hidden; width: 0; flex: 0 0 0; }
.nc-strip[data-nc-folded] > .nc-strip-hd > .nc-strip-remove,
.nc-strip[data-nc-folded] > .nc-strip-hacks,
.nc-strip[data-nc-folded] > .nc-strip-sends,
.nc-strip[data-nc-folded] > .nc-strip-pan,
.nc-strip[data-nc-folded] > .nc-strip-db,
.nc-strip[data-nc-folded] > .nc-strip-db-input,
.nc-strip[data-nc-folded] .nc-strip-body > .nc-fader,
.nc-strip[data-nc-folded] .nc-strip-body > .nc-scale { display: none; }
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${a("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${a("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${a("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
  grid-template-columns: auto auto;
  column-gap: ${a("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${a("control-gap")}; }
.nc-strip-fold { gap: ${a("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${a("label-size")}; font-weight: ${a("label-weight")}; letter-spacing: ${a("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${a("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${a("fader-cap-height")};
  height: ${a("control-gap")};
  background: linear-gradient(${a("divider")}, ${a("divider")}) center / 100% ${a("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${a("control-gap")}));
  width: ${a("control-gap")};
  height: ${a("control-gap")};
  border-radius: 50%;
  background: ${a("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${a("fader-cap-height")};
  height: ${a("control-gap")};
  background: var(--nc-strip-cap, ${a("fader-cap")});
}
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
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${a("hairline")} solid ${a("divider")};
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
.nc-hacks:hover { color: ${a("text")}; border-color: ${a("text-sub")}; }
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${a("text-sub")} 50%, ${a("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${a("text-sub")}; }
.nc-hacks[aria-pressed="true"] {
  background: ${a("fader-cap-master")};
  border-color: ${a("fader-cap-master")};
  color: ${a("surface-page")};
}
.nc-hacks:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${a("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
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
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${a("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${a("meter-track")} calc(var(--knob-from, 135) * 1deg), ${a("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${a("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${a("label-size")};
  line-height: ${a("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
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
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${a("fader-cap")}); }
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
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas: "strips meters master" "fx fx fx";
  }
}
@media (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
/* Tablets (769-1023 px): the fx row is full width under the strips; with a card folded, the open ones share the rest. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx:not([data-nc-folded]) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
  }
}
@media (max-width: 768px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: minmax(0, 1fr); }
  /* Phones: the strips and the master keep their row; the meters get their own row under it, above the FX. */
  .nc-module-body[data-nc-layout="console"] {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "strips master" "meters meters" "fx fx";
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
    border-inline-end: 0;
    border-top: ${a("hairline")} solid ${a("module-div-stack-1")};
  }
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
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${a("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent-faint")};
  }
}
`}var Qt=null,Jo="nc-ui-fallback";function li(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Qt&&Qt.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Jo} {
${Ko()}
}
`,t.head.append(e),Qt=e}var et=null,Qo=0,es=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQovKiBJbiB0aGUgU3R1ZGlvIHRoZSBpbnN0cnVtZW50J3MgZnJhbWUgaXMgYXMgdGFsbCBhcyBpdHMgcGFnZTogdGhlIGxheWVyIGNvdmVycyB0aGUgcGFydCB5b3UgY2FuIHNlZSAodGhlIFN0dWRpbwogICB3cml0ZXMgaXQgYXMgLS1uYy1ob3N0LXRvcCAvIC0tbmMtaG9zdC1ib3R0b20pLCBzbyB0aGUgcXVlc3Rpb24gc2l0cyBvbiBzY3JlZW4sIG5vdCBtaWQtcGFnZS4gKi8KaHRtbFtkYXRhLW5jLWhvc3RlZF0gLm5jLXVpLWNvbmZpcm0tbGF5ZXIgewogIHRvcDogdmFyKC0tbmMtaG9zdC10b3AsIDBweCk7CiAgYm90dG9tOiB2YXIoLS1uYy1ob3N0LWJvdHRvbSwgMHB4KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,ci=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=es,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&ci(document);function Mn({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(et||l?.aborted)return Promise.resolve(!1);let u=o?.ownerDocument??document,c=ci(u),d=o??u.body,p=u.defaultView??globalThis,f=`nc-ui-confirm-${++Qo}`,g=(k,T,L)=>{let O=u.createElement(k);return O.className=`nc-ui-confirm${T}`,L!=null&&(O.textContent=L),O},y=g("div","-layer");y.dataset.state="enter";let v=g("div","");v.setAttribute("role","alertdialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-labelledby",`${f}-t`),v.setAttribute("aria-describedby",`${f}-b`);let m=g("h2","-title",t);m.id=`${f}-t`;let h=g("p","-body",e);h.id=`${f}-b`;let b=g("div","-actions"),w=(k,T)=>{let L=g("button","-btn",k);return L.type="button",L.dataset.ncConfirm=T,L.addEventListener("click",()=>x(T==="ok")),L},S=w(i,"cancel"),$=w(n,"ok");r&&($.dataset.danger="true"),b.append(S,$),v.append(m,h,b),y.append(v);let E={layer:y};et=E;let A=s??u.activeElement,M=[];for(let k of d.children)k.hasAttribute("inert")||(k.setAttribute("inert",""),M.push(k));let F=()=>{if(et!==E)return;d.append(y),S.focus({preventScroll:!0});let k=p.requestAnimationFrame?.bind(p)??(T=>setTimeout(T,16));k(()=>k(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(F):F();let z=!1;y.addEventListener("pointerdown",k=>{z=k.target===y}),y.addEventListener("click",k=>{k.target===y&&z&&x(!1),z=!1});let V=k=>{k.stopImmediatePropagation(),k.key==="Escape"?(k.preventDefault(),x(!1)):k.key==="Tab"?(k.preventDefault(),(u.activeElement===S?$:S).focus()):k.key==="Enter"&&(k.preventDefault(),u.activeElement===$?x(!0):u.activeElement===S&&x(!1))},D=k=>k.stopImmediatePropagation();p.addEventListener("keydown",V,!0),p.addEventListener("keyup",D,!0);let R=()=>x(!1);l?.addEventListener("abort",R);let $e,q=new Promise(k=>{$e=k});function x(k){if(et!==E)return;et=null,p.removeEventListener("keydown",V,!0),p.removeEventListener("keyup",D,!0),l?.removeEventListener("abort",R);for(let Z of M)Z.removeAttribute("inert");y.dataset.state="closing",A?.isConnected&&typeof A.focus=="function"&&A.focus({preventScroll:!0});let T=p.getComputedStyle?.(y),L=Math.max(0,...String(T?.transitionDuration??"").split(",").map(Z=>Number.parseFloat(Z)*(Z.trim().endsWith("ms")?1:1e3)||0)),O=()=>y.remove();y.addEventListener("transitionend",Z=>Z.target===y&&O()),setTimeout(O,L+50),$e(k)}return q}function di(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let u=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var ui=new WeakMap,sa=.25;function ts(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,l=t.onChange,u=t.onReset,c=m=>Math.min(1,Math.max(0,m)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=m=>{let h=c(m);h!==o&&(o=h,d(),l?.(h))},f=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();m.target!==r&&h.height>0&&p(1-(m.clientY-h.top)/h.height),f=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let h=n.getBoundingClientRect().height||1,b=(f-m.clientY)/h*(m.shiftKey?sa:1);f=m.clientY,p(o+b)});let y=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",y),n.addEventListener("pointercancel",y),n.addEventListener("lostpointercapture",y),n.addEventListener("dblclick",m=>{m.preventDefault(),u?.()}),n.addEventListener("keydown",m=>{let h=m.shiftKey?s*sa:s,b={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};m.key in b&&(m.preventDefault(),p(b[m.key]))});let v={el:n,get value(){return o},get dragging(){return g},set(m){g||(o=c(Number(m)||0),d())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(u=m.onReset)}};return v.setLabel(t.label),v.set(t.value??0),v.setText(t.valueText),ui.set(n,v),v}function ns(t){return ui.get(t)}var pi=new WeakMap,as=.2,is=1.5,rs=.5;function os(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function la(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:os(i.getComputedStyle(t).getPropertyValue(H(e)),n)}function ss(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let v=0;v<n;v++){let m=e.createElement("span");m.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let b=e.createElement("span");b.className="nc-meter-rms";let w=e.createElement("span");w.className="nc-meter-hold",m.append(h,b,w),o.append(m),s.push({peak:h,rms:b,hold:w,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let l=t.label,u=t.onClear,c=!1,d=-1,p=-1,f=()=>{r.dataset.lit=c?"true":"false",r.setAttribute("aria-pressed",c?"true":"false"),r.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),r.title=c?"Clipped. Click to clear":"Clip light"},g=(v,m,h,b)=>{let w=Math.round(b*1e3)/1e3;h[m]!==w&&(h[m]=w,v.style.transform=m==="hold"?`translateY(${Math.round((1-w)*1e3)/10}%)`:`scaleY(${w})`)};r.addEventListener("click",()=>{y.clear(),u?.()});let y={el:i,get clipped(){return c},update(v,m){d<0&&(d=la(i,"motion-meter-fall",as)),p<0&&(p=la(i,"motion-meter-hold",is));let h=Math.max(0,Math.min(.25,Number(m)||0)),b=d>0?Math.exp(-h/d):0;s.forEach((w,S)=>{let $=v[S]??v[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number($.peak)||0)),A=Math.min(E,Math.max(0,Number($.rms)||0));$.over&&y.clip(),w.level.peak=E>=w.level.peak?E:E+(w.level.peak-E)*b,w.level.rms=A>=w.level.rms?A:A+(w.level.rms-A)*b,w.holdAge+=h,E>=w.holdAt?(w.holdAt=E,w.holdAge=0):w.holdAge>p&&(w.holdAt=Math.max(E,w.holdAt-rs*h)),g(w.peak,"peak",w.shown,w.level.peak),g(w.rms,"rms",w.shown,w.level.rms),g(w.hold,"hold",w.shown,w.holdAt),w.hold.dataset.off=w.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(let v of s)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,g(v.peak,"peak",v.shown,0),g(v.rms,"rms",v.shown,0),g(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,f()},configure(v){v.onClear&&(u=v.onClear)}};return f(),y.reset(),pi.set(i,y),y}function mi(t){return t?pi.get(t):void 0}function ls(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function he(t){return Math.max(0,Math.min(1,t))}function hi(t,e){let{ctx:n,w:i,h:r}=ls(t);if(!n)return;n.clearRect(0,0,i,r);let o=Uo(t);if(e.paint==="swatch"){let u=X(t,"accent"),c=X(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,i/2,r),n.fillStyle=c,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let u=e.mode??"lp",c=X(t,Vo(u)),d=X(t,"divider"),p=he(e.cutoff??.5),f=.08+(1-he(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=i;g++){let y=g/Math.max(1,i),v=0;u==="lp"?v=y<p?1:Math.max(0,1-(y-p)/f):u==="hp"?v=y>p?1:Math.max(0,1-(p-y)/f):v=Math.max(0,1-Math.abs(y-p)/f);let m=r*.78-v*r*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=X(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,r),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=X(t,"accent"),n.beginPath();let u=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let d=c/Math.max(1,i),p=(r-4)*(1-Math.exp(-d*4/u));n.lineTo(c,r-p)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let u=Array.isArray(e.peaks)?e.peaks:[],[c,d]=Array.isArray(e.region)?e.region:[0,1],p=X(t,"accent"),f=X(t,"text-sub"),g=r/2;n.fillStyle=X(t,"accent-soft"),n.fillRect(he(c)*i,0,(he(d)-he(c))*i,r),n.strokeStyle=X(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(i,g),n.stroke();let y=Math.floor(u.length/2);for(let v=0;v<y;v++){let m=(v+.5)/y*i,h=Math.max(-1,Math.min(1,u[v*2]??0)),b=Math.max(-1,Math.min(1,u[v*2+1]??0)),w=(v+.5)/y;n.strokeStyle=w>=c&&w<=d?p:f,n.beginPath(),n.moveTo(m,g-b*(g-1)),n.lineTo(m,g-h*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(let v of[c,d,...Array.isArray(e.markers)?e.markers:[]]){let m=Math.round(he(v)*(i-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,r),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=X(t,"text"),n.fillRect(Math.round(he(e.position)*(i-1)),0,1,r)),y||(n.fillStyle=f,n.font=o,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){let u=he(e.level??0);n.fillStyle=X(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=X(t,"accent"),n.fillRect(0,r*.4,i*u,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=X(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=X(t,"rhythm.playhead"),n.fillRect(l/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=X(t,"accent")}var fi={slop:8,longPressMs:500,pitchPx:16},cs=class{constructor(t,e,n=fi){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function ds(t,e,n,i=fi){let r=!1,o=0,s=(c,d)=>{let p=t.ownerDocument.elementFromPoint?.(c,d),f=[...t.querySelectorAll(e)],g=p?f.findIndex(m=>m===p||m.contains(p)):-1;if(g>=0)return g;let y=-1,v=Number.POSITIVE_INFINITY;return f.forEach((m,h)=>{if(m.hidden)return;let b=m.getBoundingClientRect();if(d<b.top||d>b.bottom)return;let w=Math.abs(c-(b.left+b.width/2));w<v&&w<=b.width&&(y=h,v=w)}),y},l=new cs(s,c=>{(c.kind==="paint"||c.kind==="long")&&(r=!0),n(c)},i),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(r=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{r&&(r=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}var gi="netcomposer.groups.v1";function Tn(){try{return globalThis.localStorage??null}catch{return null}}function bi(t=Tn(),e=gi){try{let n=JSON.parse(t?.getItem(e)??"{}"),i=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&i.set(r,o);return i}catch{return new Map}}function us(t,e,n,i=gi){let r=bi(t,i);r.set(e,n);try{t?.setItem(i,JSON.stringify(Object.fromEntries(r)))}catch{}}function ps(t,e=Tn()){return bi(e).get(t.id)??t.open===!0}function ms(t,e,n){let i=document.createElement("div");i.className="nc-group",i.dataset.ncId=t.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${t.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${t.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",u.id);for(let c of t.controls)u.append(n(c,e));return r.addEventListener("click",()=>{let c=i.dataset.ncOpen!=="true";us(Tn(),t.id,c),ca(i,c);let d=e(i);d?.type==="group"&&d.onToggle?.(c)}),i.append(r,u),ca(i,ps(t)),yi(i,t),i}function ca(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),i=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=e?"−":"+"),i instanceof HTMLElement&&(i.hidden=!e)}function yi(t,e){let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let i=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=e.summary??"";i&&i.textContent!==r&&(i.textContent=r)}var xt="application/x-nc-pad",da="http://www.w3.org/2000/svg";function hs(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),i=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*e/n),l=Math.max(s+1,Math.floor((o+1)*e/n)),u=0,c=0;for(let p=s;p<l;p++)u=Math.min(u,t[2*p]??0),c=Math.max(c,t[2*p+1]??0);let d=n===1?50:o/(n-1)*100;i.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),r.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${i.join("L")}L${r.reverse().join("L")}Z`}function fs(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let i=document.createElement("div");return i.className="nc-padgrid-pads",i.dataset.ncColumns=String(t.columns??2),t.pads.forEach((r,o)=>i.append(gs(n,o,e))),n.append(i),n.addEventListener("keydown",r=>{r.key==="Escape"&&Mt(n)}),wi(n,t),n}function gs(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-padgrid-pad",i.dataset.ncPad=String(e);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(da,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let c=document.createElementNS(da,"path");return u.append(c),i.append(r,o,s,l,u),ys(t,i,e,n),o.addEventListener("dblclick",()=>{let d=n(t);d?.type==="padGrid"&&d.onRename&&i.dataset.empty!=="true"&&vi(t,i,e,n)}),i.addEventListener("dragstart",d=>{if(i.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(xt,String(e)),d.dataTransfer.effectAllowed="copyMove",i.dataset.dragging="true"}),i.addEventListener("dragend",()=>delete i.dataset.dragging),i.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(xt)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(xt)&&!d.altKey?"move":"copy"),i.dataset.drop="true")}),i.addEventListener("dragleave",()=>delete i.dataset.drop),i.addEventListener("drop",d=>{delete i.dataset.drop;let p=n(t);if(p?.type!=="padGrid")return;let f=d.dataTransfer?.getData(xt);if(f!==void 0&&f!==""){d.preventDefault(),d.stopPropagation();let y=Number(f);y!==e&&p.onMove?.(y,e,d.altKey);return}let g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(e,g))}),i}function bs(t,e,n){let i=n(t);i?.type==="padGrid"&&i.onPress(e)}function ys(t,e,n,i){let r=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(r),r=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;o=!1,s=c.clientX,l=c.clientY,u();let d=i(t);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=ua(t,e,n,i)},450)))}),e.addEventListener("pointermove",c=>{r&&Math.hypot(c.clientX-s,c.clientY-l)>8&&u()});for(let c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,u);e.addEventListener("contextmenu",c=>{c.preventDefault(),u(),o=ua(t,e,n,i)}),e.addEventListener("click",()=>{if(o){o=!1;return}bs(t,n,i)})}function ua(t,e,n,i){let r=i(t);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Mt(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Mt(t)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let d of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{Mt(t);let f=i(t);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?vi(t,e,n,i):f.onMenu?.(n,d.id))}),l.append(p)}t.append(s,l);let u=t.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function vi(t,e,n,i){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=i(t);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,c=d=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),e.focus();let f=i(t);d&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),o.addEventListener("blur",()=>c(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());t.append(o),o.focus(),o.select()}function Mt(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function wi(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((i,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),c=o.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=i.empty?"":i.badge??""),o.draggable=!i.empty,i.empty?(o.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=i.label),l&&(l.textContent=""),u?.setAttribute("d",hs(i.peaks))),i.lane?o.dataset.ncLane=String(i.lane):delete o.dataset.ncLane;let d=e.selected===r;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),i.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",i.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${i.label}${i.badgeLabel?`, ${i.badgeLabel}`:""}${d?", selected":""}`)})}function U(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Dt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function pa(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function ct(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var vs=450,ma=8;function le(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function ws(t){let e=Xo(t,"target-min");return e>0?e:44}function $s(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=ws(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,d=u-i,p=u+i,f=c-i,g=c+i;for(let y=0;y<e.length;y++){if(o===y)continue;let v=r[y];if(!v||v.width===0)continue;let m=v.left+v.width/2,h=v.top+v.height/2;Math.abs(h-c)<i*2&&(m>u?p=Math.min(p,(u+m)/2):m<u&&(d=Math.max(d,(u+m)/2))),Math.abs(m-u)<i*2&&(h>c?g=Math.min(g,(c+h)/2):h<c&&(f=Math.max(f,(c+h)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),g=Math.max(g,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,g-f)}px`,s.style.transform="none"}}function $i(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ha(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function _e(t,e){switch(t.type){case"slider":return xs(t,e);case"select":return Ss(t,e);case"toggle":return Es(t,e);case"button":return As(t,e);case"readout":return Ls(t);case"label":return Cs(t);case"note":return fa(t);case"knob":return zs(t,e);case"choice":return Os(t,e);case"slotRow":return Fs(t,e);case"stepGrid":return Ws(t,e);case"canvas":return _s(t);case"fx":return Vs(t,e);case"group":return ms(t,e,_e);case"strip":return Ds(t,e);case"stripAdd":return Xs(t,e);case"padGrid":return fs(t,e);case"moves":return Ts(t,e);default:return fa({id:"unknown",text:""})}}function ne(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,ki(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??ct(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),pa(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")pa(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&dt(t,e.help);let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Is(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??ct(e.value))}else if(e.type==="choice")Si(t,e);else if(e.type==="slotRow")Ai(t,e);else if(e.type==="stepGrid")bn(t,e);else if(e.type==="padGrid")wi(t,e);else if(e.type==="moves")xi(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&hi(n,e)}else if(e.type==="strip"){Ni(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${je(n.id)}"]`);i instanceof Element&&ne(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")Mi(t,e);else if(e.type==="group"){yi(t,e);for(let n of e.controls){let i=t.querySelector(`[data-nc-id="${je(n.id)}"]`);i instanceof Element&&ne(i,n)}}else if(e.type==="fx"){zi(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${je(n.id)}"]`);i instanceof Element&&ne(i,n)}}}}function xs(t,e){let n=Dt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(ks(t,i,e),r),n.append(U()),ne(n,t),n}function ks(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(le());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function Ss(t,e){let n=Dt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,U()),n}function Es(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(U()),ne(n,t),n}function As(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(U()),ne(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=$i(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Li(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function Ls(t){let e=Dt(t.id,t.label);return e.append(U()),ne(e,t),e}var Ms=450;function Ts(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let i of t.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",i.label),i.title&&(r.title=i.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=i.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of i.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${i.label} ${l.text}`),u.append(Ns(l.icon)),u.addEventListener("click",()=>{let c=e(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(u)}r.append(o,s),n.append(r)}return xi(n,t),n}function xi(t,e){for(let n of e.groups)for(let i of n.moves){let r=t.querySelector(`[data-nc-move="${je(i.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=i.disabled===!0)}}function Ns(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let i=document.createElementNS(e,"path");i.setAttribute("d",t.stroke),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),n.append(i)}if(t?.fill){let i=document.createElementNS(e,"path");i.setAttribute("d",t.fill),i.setAttribute("fill","currentColor"),n.append(i)}return n}function Cs(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(U()),e}function fa(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(U()),e}function ga(t){if(typeof t.valueText=="string")return t.valueText;let e=ct(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function ki(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Is(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;ki(t,e.modulated===!0);let r=Math.round(i*270);t.style.setProperty("--knob-turn",String(r)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(r,135))),t.style.setProperty("--knob-to",String(Math.max(r,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",ga(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${ga(e)}`}function Rs(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function zs(t,e){let n=Dt(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",c=>{o=c.clientY;let d=e(i);s=d&&"value"in d?Number(d.value):0,i.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;i.addEventListener("pointerup",l),i.addEventListener("pointercancel",l),i.addEventListener("lostpointercapture",l),i.addEventListener("pointermove",c=>{if(i.hasPointerCapture&&!i.hasPointerCapture(c.pointerId))return;let d=e(i);if(d?.type!=="knob")return;let p=d.max-d.min||1,f=Math.min(d.max,Math.max(d.min,s-(c.clientY-o)*p/120));d.onChange(f)}),i.addEventListener("dblclick",()=>{let c=e(i);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),i.addEventListener("keydown",c=>{let d=e(i);if(d?.type!=="knob")return;let p=Rs(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(i,u),n.append(U()),ne(n,t),n}function Os(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(r)}return n.append(U()),Si(n,t),n}function Si(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function Fs(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){let p=t.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(g,le()),Bs(f,g,n,d,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=$i(),r.append(le()),r.addEventListener("click",()=>{Li(n);let d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=e(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...r?[r]:[]),n.append(c,o,U()),Ei(n,e),Ai(n,t),n}function ba(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;nt(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Bs(t,e,n,i,r){let o=0,s=0,l=0,u=!1,c=!1,d=!1,p=!1,f=()=>{window.clearTimeout(o),o=0},g=h=>{let b=h.clientX-s,w=h.clientY-l;b*b+w*w>ma*ma&&(u=!0,f())},y=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",m))},v=h=>{let b=o!==0&&!u&&!c;f(),y(),b&&(d=!0,ba(n,i,r,h))},m=()=>{u=!0,f(),y()};t.addEventListener("pointerdown",h=>{h.button===0&&(y(),c=!1,u=!1,d=!1,s=h.clientX,l=h.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,Ps(n,e,i,r))},vs),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",m))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(d||c||u){d=!1,c=!1,u=!1;return}ba(n,i,r,h)})}function Ei(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=ya("Save","store"),r=ya("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),nt(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=e(t);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),nt(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),nt(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&nt(t)})}function ya(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Ps(t,e,n,i){Ei(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function nt(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Ai(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Li(t){let e=t.dataset.ncLastFill||null,n=Fo(e);t.dataset.ncLastFill=n;let i=Bo(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function js(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Ws(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=m=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=m,i.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let h of[o,s]){let b=h===m;h.setAttribute("aria-checked",b?"true":"false"),h.tabIndex=b?0:-1}};l(o);for(let m of[o,s])m.addEventListener("click",()=>l(m));i.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;l(h),h.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(i),t.onFill&&u.append(js(n,e)),t.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=t.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.onClear?.()}),u.append(m)}n.append(u);for(let m of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=m.label,b.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(b.dataset.ncLane=String((m.lane-1)%4+1));let w=!1,S=0;b.addEventListener("pointerdown",A=>{w=!1,!(A.pointerType==="mouse"||A.button!==0)&&(S=window.setTimeout(()=>{let M=e(n);M?.type!=="stepGrid"||!M.selectedRows||(w=!0,M.onSelectRow?.(M.rows.findIndex(F=>F.id===m.id),!0))},Ms))});for(let A of["pointerup","pointercancel","pointerleave"])b.addEventListener(A,()=>window.clearTimeout(S));b.addEventListener("contextmenu",A=>{w&&A.preventDefault()}),b.addEventListener("click",A=>{let M=e(n);if(M?.type!=="stepGrid")return;if(w){w=!1;return}let F=M.rows.findIndex(V=>V.id===m.id),z=!!M.selectedRows&&(A.shiftKey||A.metaKey||A.ctrlKey);M.onSelectRow?.(F,z)}),b.addEventListener("keydown",A=>Gs(n,b,A));let $=[];for(let A of["mute","solo"]){if(!(A==="mute"?t.onMute:t.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let F=document.createElement("button");F.type="button",F.className="nc-ms",F.dataset.ncMs=A,F.textContent=A==="mute"?"M":"S",F.setAttribute("aria-label",`${A==="mute"?"Mute":"Solo"} ${m.label}`),M.append(F,le()),M.addEventListener("click",()=>{let z=e(n);if(z?.type!=="stepGrid")return;let V=z.rows.findIndex(D=>D.id===m.id);(A==="mute"?z.onMute:z.onSolo)?.(V)}),$.push(M)}let E=document.createElement("div");E.className="nc-steps";for(let A=0;A<m.steps.length;A++){let M=document.createElement("span");M.className="nc-step-wrap";let F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${m.id}:${A}`,F.setAttribute("aria-label",`${m.label} step ${A+1}`),M.append(F,le()),M.addEventListener("click",z=>{let V=e(n);if(V?.type!=="stepGrid")return;let D=V.rows.findIndex($e=>$e.id===m.id),R=s.getAttribute("aria-checked")==="true";V.onToggle(D,A,z.shiftKey||R)}),E.append(M)}if(t.onLength&&E.append(Hs(n,E,m,e)),h.append(...$,b,E),t.onDice){let A=document.createElement("button");A.type="button",A.className="nc-sparkle nc-row-dice",A.dataset.ncDice=m.id,A.setAttribute("aria-label",`Re-roll ${m.label}`),A.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,A.innerHTML=ha(),A.append(le()),A.addEventListener("click",()=>{let M=e(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(F=>F.id===m.id))}),h.append(A)}h.addEventListener("click",A=>{if(A.target!==h)return;let M=e(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(F=>F.id===m.id))}),va(n,E,".nc-step-wrap",e,s,()=>m.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let d=(m,h,b)=>{let w=document.createElement("button");return w.type="button",w.className=m,w.textContent=h,b&&w.setAttribute("aria-label",b),w},p=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",bn(n,m))}));for(let[m,h]of[[p,-1],[f,1]])m.addEventListener("click",()=>{let b=e(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;let w=b.rows.length;b.onSelectRow?.(((kt(b)+h)%w+w)%w)});if(c.append(p,g,f),t.onDice){let m=d("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=ha(),m.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let b=kt(h);b>=0&&h.onDice?.(b)}),c.append(m)}if(t.transport){let m=d("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(m)}n.append(c);let y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");let v=Math.max(0,...t.rows.map(m=>m.steps.length));for(let m=0;m<v;m++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(m),h.textContent=String(m+1),h.addEventListener("click",b=>{let w=e(n);if(w?.type!=="stepGrid")return;let S=kt(w);if(S<0)return;if(n.dataset.ncLenMode==="true"){w.onLength?.(S,m+1);return}let $=s.getAttribute("aria-checked")==="true";w.onToggle(S,m,b.shiftKey||$)}),y.append(h)}return va(n,y,".nc-pad",e,s,()=>{let m=e(n);return m?.type==="stepGrid"?m.rows[kt(m)]?.id:void 0}),n.append(y),n.append(U()),bn(n,t),n}function kt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function va(t,e,n,i,r,o){let s="on",l=!0,u=-1,c=(d,p)=>{let f=d.rows[u]?.steps[p];!f||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,s,l):!!f[s]!==l&&d.onToggle(u,p,s==="accent"))};ds(e,n,d=>{let p=i(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;let f=p.rows.findIndex(g=>g.id===o());f>=0&&p.rows[f].length!==d.pad+1&&p.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let f=o();u=p.rows.findIndex(y=>y.id===f);let g=p.rows[u]?.steps[d.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}c(p,d.pad)}else if(d.kind==="long"){let f=o(),g=p.rows.findIndex(v=>v.id===f),y=e.querySelectorAll(n)[d.pad];g>=0&&y instanceof HTMLElement&&p.onLongPress?.(g,d.pad,y)}}})}function Gs(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function Hs(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(le());let o=c=>{let d=i(t);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(y=>y.id===n.id),f=d.rows[p];if(!f)return;let g=Math.max(1,Math.min(f.steps.length,c));g!==f.length&&d.onLength?.(p,g)},s=c=>{let d=[...e.querySelectorAll(".nc-step")],p=1;return d.forEach((f,g)=>{let y=f.getBoundingClientRect();y.width>0&&c>=y.left+y.width/2&&(p=g+1)}),p},l=c=>o(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",c=>{let d=i(t);if(d?.type!=="stepGrid")return;let p=d.rows.find(g=>g.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),r}var en=new WeakMap;function wa(t,e){let n=typeof e=="number"?e:null;if(!(en.has(t)&&en.get(t)===n)){if(en.set(t,n),n===null){for(let i of Object.keys(oa(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(oa(n)))t.style.setProperty(i,r)}}function bn(t,e){let n=e.rows.some(d=>d.solo),i=t.querySelector("[data-nc-clear]");i&&i.textContent!==(e.clearLabel??"Clear")&&(i.textContent=e.clearLabel??"Clear");let r=t.querySelector(".nc-pads"),o=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=t.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let c=t.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let d=!!e.transport?.playing,p=e.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");let f=e.transport?.ariaLabel;f?c.setAttribute("aria-label",f):c.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let d=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),g=o.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&f>=o.length,l&&f>=o.length?p.dataset.out="true":delete p.dataset.out,l&&f===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${f+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,wa(p,g?.velocity),e.playhead>=0&&f===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of e.rows){for(let g=0;g<d.steps.length;g++){let y=d.steps[g],v=t.querySelector(`[data-nc-step="${d.id}:${g}"]`);if(!(v instanceof HTMLButtonElement))continue;let m=v.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;let w=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);w?m.dataset.picked="true":delete m.dataset.picked;let S=m.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",e.selectedRow===d.id||w?"true":"false"),S.textContent!==d.label&&(S.textContent=d.label,S.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(let $ of m.querySelectorAll("[data-nc-ms]")){let E=$.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;$.setAttribute("aria-pressed",E?"true":"false")}}v.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?v.dataset.accent="true":delete v.dataset.accent,y.dim?v.dataset.dim="true":delete v.dataset.dim,g%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof y.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),wa(v,y.velocity);let h=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;g===h?v.dataset.playhead="true":delete v.dataset.playhead;let b=!!e.onLength&&e.selectedRow===d.id;v.hidden=g>=d.length&&!b,g>=d.length&&b?v.dataset.out="true":delete v.dataset.out}let p=t.querySelector(`[data-nc-len="${d.id}"]`),f=t.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let g=document.activeElement===p;f.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function _s(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,U()),e}function Ds(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!t.master&&typeof t.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=Ii(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(h.onFold?.(h.folded!==!0),document.activeElement!==s&&s.focus())})),i.append(r),t.onRemove){let h=document.createElement("button");h.type="button",h.className="nc-strip-remove",h.dataset.ncStripRemove="",h.textContent="×",h.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(h)}),i.append(h)}let l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){let h=document.createElement("span");h.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",h.append(b,le()),h.addEventListener("click",()=>{let w=e(n);w?.type==="strip"&&w.onHacks?.()}),l.append(h)}let u=document.createElement("div");u.className="nc-strip-ms";for(let h of["mute","solo"]){if(!(h==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let w=document.createElement("button");w.type="button",w.className="nc-ms",w.dataset.ncMs=h,w.textContent=h==="mute"?"M":"S",b.append(w,le()),b.addEventListener("click",()=>{let S=e(n);S?.type==="strip"&&(h==="mute"?S.onMute:S.onSolo)?.()}),u.append(b)}let c=document.createElement("div");c.className="nc-strip-sends";for(let h of t.sends??[])c.append(_e({...h,type:"knob",compact:!0},e));let d=document.createElement("div");d.className="nc-strip-pan",t.pan&&d.append(_e(Nn(t),e));let p=document.createElement("div");p.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let h of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(h.value)),b.textContent=h.label,f.append(b)}let g=ts({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:h=>{let b=e(n);b?.type==="strip"&&b.onChange(h)},onReset:()=>{let h=e(n);h?.type==="strip"&&xa(h)}}),y=ss({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let h=e(n);h?.type==="strip"&&h.onClipClear?.()}});if(p.append(f,g.el,y.el),o){let h=document.createElement("button");h.type="button",h.className="nc-ui-fx-fold nc-strip-fold",h.dataset.ncStripFold="",h.setAttribute("aria-expanded","false");let b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");let w=document.createElement("span");w.className="nc-ui-fx-fold-name",w.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!t.pan,h.append(b,S,w),h.addEventListener("click",()=>{let $=e(n);if($?.type!=="strip")return;$.onFold?.(!1);let E=n.querySelector("[data-nc-strip-hide]");E instanceof HTMLElement&&E.focus()}),p.prepend(h)}let v=document.createElement("button");v.type="button",v.className="nc-strip-db",v.dataset.ncReadout="";let m=0;return v.addEventListener("click",h=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(m),h.detail===0?$a(n,v,e):h.detail===1&&(m=window.setTimeout(()=>$a(n,v,e),Zs)))}),v.addEventListener("dblclick",()=>{window.clearTimeout(m);let h=e(n);h?.type==="strip"&&xa(h)}),s&&n.append(s),n.append(i,l,u,c,d,p,v,U()),Ni(n,t),n}function Nn(t){let e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??Ys(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function Ys(t){let e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}var Zs=250;function $a(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??ct(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=r.value;if(r.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Xs(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),u=s.value;Ti(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(i,s,U()),Mi(n,t),n}function Mi(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),Ti(i))}function Ti(t){let e=t.options[0];e&&(e.selected=!0)}function xa(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ni(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?ns(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),mi(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=e.valueText??ct(e.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${e.label} level ${p}`);let f=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${f}`:f}for(let p of t.querySelectorAll("[data-nc-ms]")){let f=p.getAttribute("data-nc-ms"),g=f==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));let p=t.querySelector(`.nc-strip-pan [data-nc-id="${je(e.pan.id)}"]`);p&&ne(p,Nn(e))}let u=!e.master&&typeof e.onFold=="function"&&e.folded===!0;u?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let c=t.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Ri(c,u,e.label),dt(c,e.foldHelp));let d=t.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${e.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==e.label&&(p.textContent=e.label),dt(d,e.foldedHelp??e.foldHelp)}}function ka(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${je(e)}"]`);return mi(n?.querySelector(".nc-meter")??void 0)}function Vs(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title;let r=typeof t.onFold=="function";if(t.on===void 0&&!r)n.append(i);else{let o=document.createElement("div");if(o.className="nc-ui-fx-hd",o.append(i),t.on!==void 0){let s=di({checked:t.on,labelledBy:i.id,onChange:l=>{let u=e(s.el);u?.type==="fx"&&u.onToggle?.(l)}});s.el.dataset.ncFxSwitch="",o.append(s.el)}r&&o.append(qs(n,e)),n.append(o)}r&&n.prepend(Ks(n,e));for(let o of t.controls)n.append(_e(o,e));if(t.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let s=document.createElement("summary");s.textContent=t.moreLabel??"More",o.append(s);for(let l of t.more)o.append(_e(l,e));n.append(o)}return n.append(U()),zi(n,t),n}var Us=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Ci(t){let e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),i=t.dataset.ncFolded==="true"&&e&&Us(e)?e:n;i instanceof HTMLElement&&document.activeElement!==i&&i.focus()}function qs(t,e){let n=Ii();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let i=e(n);i?.type==="fx"&&(i.onFold?.(i.folded!==!0),Ci(t))}),n}function Ii(){let t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";let e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Ri(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function Ks(t,e){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let i=document.createElement("span");i.className="nc-ui-fx-fold-state",i.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,i,r),n.addEventListener("click",()=>{let s=e(n);s?.type==="fx"&&(s.onFold?.(!1),Ci(t))}),n}function zi(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;let r=typeof e.onFold=="function"&&e.folded===!0;r?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let o=t.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Ri(o,r,e.title),dt(o,e.foldHelp));let s=t.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=e.on===void 0?"":e.on?"On":"Off";s.hidden=!r,s.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=e.on===!0?"true":"false";let u=s.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");let c=s.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=e.title),dt(s,e.foldHelp)}}function dt(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function je(t){return t.replace(/["\\]/g,"\\$&")}function Js(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&hi(n,i)}$s(t)}var Sa="data-nc-help";function Qs(t,e,n,i=0,r=6,o=8){let s=t.top-r-e.height,l=s>=i+o?"above":"below",u=l==="above"?s:t.bottom+r,c=Math.max(o,Math.min(t.left,n-o-e.width));return{top:Math.round(u),left:Math.round(c),side:l}}var tn=new WeakMap;function el(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function tl({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=tn.get(t);if(n)return n;let i=t.defaultView,r=null,o=null,s,l=()=>{clearTimeout(s),o=null,r&&(r.hidden=!0)},u=f=>{let g=f.getAttribute(Sa);if(!g)return;r||(r=t.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",t.body.appendChild(r)),r.textContent=g,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let y=f.getBoundingClientRect(),v=Qs(y,{width:r.offsetWidth,height:r.offsetHeight},i.innerWidth,el(t));r.style.top=`${v.top}px`,r.style.left=`${v.left}px`,r.dataset.side=v.side,r.style.visibility=""},c=f=>{if(f.pointerType==="touch")return;let g=f.target&&f.target.closest?f.target.closest(`[${Sa}]`):null;g!==o&&(l(),g&&(o=g,s=setTimeout(()=>{o===g&&g.isConnected&&u(g)},e)))},d=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",c),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",d),i.addEventListener("scroll",l,!0),i.addEventListener("blur",l);let p={hide:l,uninstall(){l(),t.removeEventListener("pointerover",c),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",d),i.removeEventListener("scroll",l,!0),i.removeEventListener("blur",l),r?.remove(),r=null,tn.delete(t)}};return tn.set(t,p),p}var Cn="netcomposer.rhythm.hidden.v1",be=new WeakMap;function nn(){try{return globalThis.localStorage??null}catch{return null}}function Oi(t,e=Cn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Ea(t,e,n,i=Cn){let r=Oi(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function In(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(r=>r.controls)],n=[],i=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)i(o)};for(let r of e)i(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Nn(r)));return n}function nl(t,e){if(!(!t||!e))return In(t).find(n=>n.id===e)}function al(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${In(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(i=>i.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}${e.onFold?"f":""}${e.pan?`p=${e.pan.id}`:""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}${e.onFold?":fold":""}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function il(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),Fi(t,e)}function Fi(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function rl(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=be.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return nl(n,i)}function ol(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=al(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${Aa(r.id)}"]`);o&&Fi(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${Aa(s.id)}"]`);l instanceof Element&&ne(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),il(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(_e(l,rl));t.append(o)}}function Aa(t){return t.replace(/["\\]/g,"\\$&")}function sl(t,e=Cn){li();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Oi(nn(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=di({labelledBy:o.id,onChange:h=>(be.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",r.append(o,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",f.append(g);let y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",n.append(y,r,p,f),n.setAttribute("aria-labelledby",o.id);let v=h=>{let b=be.get(n)??t;n.dataset.ncOpen=h?"false":"true",p.hidden=h,f.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${b.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";Ea(nn(),(be.get(n)??t).id,h,e),v(h),yn(n.parentElement)}),f.addEventListener("click",()=>{Ea(nn(),(be.get(n)??t).id,!1,e),v(!1),yn(n.parentElement)});let m={el:n,update(h){be.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,d.textContent=h.status??"",h.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),ol(p,h),v(p.hidden),m.redraw()},redraw(){let h=be.get(n);h&&Js(n,In(h))}};return be.set(n,t),v(i),m.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),m}function ll(t,e,n="adjacent"){li(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),yn(t)}function yn(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const Bi="netcomposer.studio.instances.v1",La="netcomposer.studio.types-seen.v1",cl=["petra-rhythm","olive-bass"];function Pi(t,e){return e===1?t:`${t}#${e}`}function Rn(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function dl(t,e){return e===1?t.name:`${t.name} ${e}`}function Xe(t,e,n){const i=dl(t,e),r=Wi(n,i);return{id:Pi(t.id,e),type:t.id,n:e,name:r,src:t.src,...r!==i?{custom:!0}:{}}}const ji=20;function Wi(t,e){return typeof t!="string"?e:[...t.replace(/\s+/g," ").trim()].slice(0,ji).join("").trim()||e}function ul(t,e,n,i){return t.map(r=>{if(r.id!==e)return r;const o=i.find(s=>s.id===r.type);return o?Xe(o,r.n,n):r})}function pl(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function ml(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let i=1;for(;n.has(i);)i++;return Xe(e,i)}function ut(t){return t.filter(e=>e.available!==!1).map(e=>Xe(e,1))}function hl(t,e){if(!Array.isArray(t))return ut(e);const n=[];for(const i of t){const r=i&&typeof i=="object"?i:null,o=typeof i=="string"?i:r?.id;if(typeof o!="string")continue;const s=Rn(o),l=s&&e.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(Xe(l,s.n,r?.name))}return n.length>0||t.length===0?n:ut(e)}function zn(){try{return globalThis.localStorage??null}catch{return null}}function fl(t,e=zn()){try{const n=e?.getItem(Bi);return n?hl(JSON.parse(n),t):ut(t)}catch{return ut(t)}}function gl(t,e,n=zn()){let i=cl;try{const s=JSON.parse(n?.getItem(La)??"null");Array.isArray(s)&&(i=s.filter(l=>typeof l=="string"))}catch{}const r=e.filter(s=>!i.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(l=>l.type===s.id)||o.push(Xe(s,1));try{n?.setItem(La,JSON.stringify([...new Set([...i,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&Ve(o,n),o}function bl(t){return t.map(e=>e.custom?{id:e.id,name:e.name}:e.id)}function Ve(t,e=zn()){try{e?.setItem(Bi,JSON.stringify(bl(t)))}catch{}}function yl(t,e){const n=new Map;return(i,r)=>{const o=Rn(i),s=o?.type??i,l=r?.instance!==void 0?Number(r.instance):i.includes("#")?o?.n:void 0,u=t().filter(d=>d.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(d=>d.instance.n===l);else{const d=u.filter(p=>{const f=p.window();return f!=null&&f!==n.get(p.instance.id)});c=d.find(p=>p.readyState?.()!=="complete")??d[0]??u[0]}if(!c){if(e.some(p=>p.id===s))return null;const d=l!==void 0?Pi(s,l):i;return{id:d,name:d}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const an="netcomposer.studio.pending-presets.v1",vl=3e3,wl=6e4;function Ma(t){return!!t&&typeof t=="object"&&typeof t.format=="string"&&"data"in t}function $l(t,e){return new Promise(n=>{const i=setTimeout(()=>n(void 0),e);t.then(r=>{clearTimeout(i),n(r)},()=>{clearTimeout(i),n(void 0)})})}function xl(t){const e=new Map,n=[],i=()=>{try{const s=JSON.parse(t()?.getItem(an)??"{}"),l={};if(s&&typeof s=="object")for(const[u,c]of Object.entries(s))Ma(c)&&(l[u]=c);return l}catch{return{}}},r=s=>{try{const l=t();if(!l)return;Object.keys(s).length?l.setItem(an,JSON.stringify(s)):l.removeItem(an)}catch{}},o=async(s,l)=>{const u=i(),c=u[s];if(!c)return;delete u[s],r(u);let d=c.format===l.format;if(d)try{await l.set(c.data)}catch{d=!1}for(const p of n)p(s,d)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(e.set(s,l),o(s,l))},provided:()=>[...e.keys()],async collect(s,l=vl){const u={};return await Promise.all(s.map(async c=>{const d=e.get(c);if(!d)return;const p=await $l(Promise.resolve().then(()=>d.get()),l);p!=null&&(u[c]={format:d.format,...d.version!==void 0?{v:d.version}:{},data:p})})),u},stash(s){const l={};for(const[u,c]of Object.entries(s))Ma(c)&&(l[u]=c);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(i()),dropPending(){const s=Object.keys(i());return r({}),s}}}function kl(t,e){return`${t}@studio/${e}`}const Sl=1,Q=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],On=[...Q];function El(t,e,n={}){const i=n.instruments??Q;return{version:Sl,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:i.find(p=>p.id===r)?.name??r};if(!s)return null;const l=e.attach(s.id,s.name),u=s.id,c=n.presets,d=n.share?.host(u);return{ctx:t,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:p=>kl(p,u),...c?{providePreset:p=>c.provide(u,p)}:{},...d?{audioReceivers:d.audioReceivers,sendAudio:d.sendAudio,onAudio:d.onAudio,reveal:d.reveal}:{}}}}}const Gi="netcomposer.studio.fx-fold.v1",rn={a:!1,b:!1,insert:!1};function Hi(t){try{const e=t?.getItem(Gi);if(!e)return rn;const n=JSON.parse(e);if(!n||typeof n!="object")return rn;const i=n;return{a:i.a===!0,b:i.b===!0,insert:i.insert===!0}}catch{return rn}}function Al(t,e,n){const i={...Hi(t),[e]:n};try{t?.setItem(Gi,JSON.stringify(i))}catch{}return i}function se(){try{return globalThis.localStorage??null}catch{return null}}const Ll={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function Ml(t,e){const n=e.fx[t],i=zt(n);for(const r of i.chain){const o=Ll[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return i}function Tl(t,e){const n=new Map,i=new Map;let r=1;const o=s=>{const l=e.nodeFor(s);if(!l)return null;const u=n.get(s);if(u&&u.source===l)return u.node;u?.node.disconnect();const c=new AudioWorkletNode(t,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=d=>{const p=d.data;p.type!=="took"&&p.type!=="recorded"||(i.get(p.id)?.(p.channels),i.delete(p.id))},l.connect(c),n.set(s,{node:c,source:l}),c};return{record(s,l){if(!e.nodeFor(s))return null;const u=n.get(s)?.node??null,c=r++;let d=u;const p=g=>d?.port.postMessage(g);d?p({type:"record",id:c,from:l}):e.ready.then(()=>{d=o(s),p({type:"record",id:c,from:l})});let f=!1;return{stop(g){return f?Promise.resolve(null):(f=!0,new Promise(y=>{i.set(c,y),p({type:"record-end",id:c,to:g}),setTimeout(()=>{i.delete(c)&&y(null)},Math.max(0,(g-t.currentTime*t.sampleRate)/t.sampleRate)*1e3+5e3)}))},cancel(){f=!0,p({type:"record-cancel",id:c})}}},sources:()=>e.sources(),listen(s){return e.nodeFor(s)?(e.ready.then(()=>o(s)),!0):!1},async take(s,l,u){await e.ready;const c=o(s);if(!c||!(u>l))return null;const d=r++;return new Promise(p=>{i.set(d,p),c.port.postMessage({type:"take",id:d,from:l,to:u}),setTimeout(()=>{i.delete(d)&&p(null)},(u-t.currentTime*t.sampleRate)/t.sampleRate*1e3+2e3)})}}}function Nl(t){const e=()=>{};return new Proxy(t,{get(n,i,r){if(i==="stop")return e;const o=Reflect.get(n,i,r);return typeof o=="function"?o.bind(n):o}})}const de=-54,ft=6,ae=-de/(ft-de),Cl=-9,vn=(Cl-de)/(ft-de);function _i(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:de+e*(ft-de)}function Il(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function Rl(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function ke(t){return Il(_i(t))}function zl(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function Ol(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:ke(n.position))}function Fn(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-de)/(ft-de)))}function Ta(t){return Fn(Rl(t))}const Na=[0,-6,-12,-24,-48].map(t=>({value:Fn(t),label:t===0?"0":`−${-t}`})),Fl=1;function Bl(t){let e=0,n=0;for(const i of t){const r=Math.abs(i);r>e&&(e=r),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function Ca(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<de?0:Fn(Math.min(ft,n)):null}function Pl(t){const e=Math.min(1,Math.max(-1,Number.isFinite(t)?t:0)),n=Math.cos(Math.abs(e)*Math.PI/2);return e>0?[n,1]:e<0?[1,n]:[1,1]}const Di="netcomposer.studio.mix.v1",Yi={position:vn,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function pt(){return{v:1,channels:{},master:ae,returns:{a:{on:!0,level:ae},b:{on:!0,level:ae}},insert:{on:!1},fx:{},channelFx:{}}}const rt=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,jl=t=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(-1,t)):0,Bt=(t,e)=>typeof t=="boolean"?t:e,ye=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function Wl(t){const e=ye(t);return{position:rt(e.position,Yi.position),mute:Bt(e.mute,!1),solo:Bt(e.solo,!1),sendA:Math.min(ae,rt(e.sendA,0)),sendB:Math.min(ae,rt(e.sendB,0)),pan:jl(e.pan)}}function Zi(t){const e=pt(),n=ye(t);if(n.v!==1)return e;const i={};for(const[c,d]of Object.entries(ye(n.channels)))c.length>0&&c.length<=64&&(i[c]=Wl(d));const r=ye(n.returns),o=(c,d)=>{const p=ye(c);return{on:Bt(p.on,d.on),level:rt(p.level,d.level)}},s={},l=ye(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,d]of Object.entries(ye(n.channelFx)))c.length>0&&c.length<=64&&d&&typeof d=="object"&&(u[c]=d);return{v:1,channels:i,master:rt(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:Bt(ye(n.insert).on,e.insert.on)},fx:s,channelFx:u}}function Xi(){try{return globalThis.localStorage??null}catch{return null}}function Gl(t=Xi()){try{const e=t?.getItem(Di);return e?Zi(JSON.parse(e)):pt()}catch{return pt()}}function Vi(t,e=Xi()){try{return e?.setItem(Di,JSON.stringify(t)),e!==null}catch{return!1}}const te={"fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},Ui="netcomposer.studio.strip-fold.v1";function qi(t){try{const e=t?.getItem(Ui),n=e?JSON.parse(e):[];return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Ki(t,e){try{t?.setItem(Ui,JSON.stringify([...e].sort()))}catch{}return e}function Ji(t,e,n){const i=new Set(qi(t));return n?i.add(e):i.delete(e),Ki(t,i)}function Hl(t,e){return Ji(t,e,!1)}function _l(t,e){const n=new Set(e),i=qi(t),r=new Set([...i].filter(o=>n.has(o)));return r.size===i.size?i:Ki(t,r)}const Dl=-18,Yl=-20,Qi=3,Zl=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Ia=[-20,-10,-7,-5,-3,0,1,2,3],Xl=.3,Vl=6.638/Xl,Ul=48;function ql(t){return t-Dl}function er(t){return Number.isFinite(t)?Math.min(1,Math.max(0,10**((t-Qi)/20))):t>0?1:0}function Kl(t){return t>0?er(ql(20*Math.log10(t))):0}function Bn(t){return(Math.min(1,Math.max(0,t))*2-1)*Ul}const Ra={x:0,v:0};function Jl(t,e,n,i=!1){if(i)return{x:e,v:0};if(!(n>0))return t;const r=Vl,o=t.x-e,s=t.v+r*o,l=Math.exp(-r*n),u=e+(o+s*n)*l,c=(t.v-r*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:c}}function Ql(t,e){return Math.abs(t.x-e)<1e-4&&Math.abs(t.v)<.001}const tr="netcomposer.studio.vu.v1";function ec(t){try{return t?.getItem(tr)==="1"}catch{return!1}}function tc(t,e){try{t?.setItem(tr,e?"1":"0")}catch{}}const nr="netcomposer.studio.vu-fold.v1";function nc(t){try{return t?.getItem(nr)==="1"}catch{return!1}}function ac(t,e){try{t?.setItem(nr,e?"1":"0")}catch{}}const ic="http://www.w3.org/2000/svg",wn=200,on=112,Oe=wn/2,ot=132,za=100,rc=108,oc=105,sc=116,lc=103,cc=112,re=(t,e)=>{const n=document.createElementNS(ic,t);for(const[i,r]of Object.entries(e))n.setAttribute(i,String(r));return n},Oa=t=>Math.round(t*100)/100;function st(t,e){const n=Bn(er(t))*Math.PI/180;return[Oa(Oe+e*Math.sin(n)),Oa(ot-e*Math.cos(n))]}function Fa(t,e,n){const[i,r]=st(t,n),[o,s]=st(e,n);return`M ${i} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const dc=t=>t>0?`+${t}`:t<0?`−${-t}`:"0";function Ba(t){const e=re("svg",{class:"vu-meter",viewBox:`0 0 ${wn} ${on}`,role:"img","aria-label":`${t==="L"?"Left":"Right"} VU meter`,"data-vu-side":t});e.append(re("rect",{class:"vu-face",x:.5,y:.5,width:wn-1,height:on-1,rx:4})),e.append(re("path",{class:"vu-arc",d:Fa(Yl,0,za)})),e.append(re("path",{class:"vu-zone",d:Fa(0,Qi,lc)}));for(const o of Zl){const[s,l]=st(o,za),[u,c]=st(o,Ia.includes(o)?rc:oc);e.append(re("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:c}))}for(const o of Ia){const[s,l]=st(o,sc),u=re("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?dc(o):String(Math.abs(o)),e.append(u)}const n=re("text",{class:"vu-legend",x:Oe,y:92,"text-anchor":"middle"});n.textContent="VU";const i=re("text",{class:"vu-side",x:10,y:on-10});i.textContent=t;const r=re("line",{class:"vu-needle",x1:Oe,y1:ot,x2:Oe,y2:ot-cc,transform:`rotate(${Bn(0)} ${Oe} ${ot})`});return e.append(n,i,r),{svg:e,needle:r}}function uc(t){const e=document.createElement("div");e.className="vu",e.dataset.vu="",e.setAttribute("role","group"),e.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const i=document.createElement("button");i.type="button",i.className="nc-fold-toggle",i.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),i.append(r),i.setAttribute("data-nc-help",te["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",te["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",te["vu:remove"]),s.addEventListener("click",()=>t.onRemove(s)),n.append(i,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(h=>{const b=document.createElement("span");b.className="vu-bar",b.dataset.side=h;const w=document.createElement("span");return w.className="vu-bar-fill",b.append(w),l.append(b),w});let c=t.folded;const d=()=>{e.toggleAttribute("data-folded",c),i.setAttribute("aria-expanded",c?"false":"true"),i.setAttribute("aria-label",c?"Expand VU meters":"Minimize VU meters"),i.title=c?"Expand":"Minimize"};d(),i.addEventListener("click",()=>{c=!c,d(),t.onFold(c)});const p=Ba("L"),f=Ba("R");e.append(n,p.svg,f.svg,l);const g=matchMedia("(prefers-reduced-motion: reduce)"),y=[Ra,Ra],v=[Number.NaN,Number.NaN],m=[p.needle,f.needle];return{el:e,frame(h,b){let w=!1;for(const S of[0,1]){const $=h?Kl(h[S]):0;y[S]=Jl(y[S],$,b,g.matches),(!Ql(y[S],$)||$>0)&&(w=!0);const E=Math.round(Bn(y[S].x)*10)/10;E!==v[S]&&(v[S]=E,m[S].setAttribute("transform",`rotate(${E} ${Oe} ${ot})`),u[S].style.transform=`scaleY(${Math.max(0,Math.min(1,y[S].x)).toFixed(3)})`,e.dataset[S===0?"vuL":"vuR"]=E.toFixed(1))}return w}}}const pc="netcomposer.studio.hidden.v1",St=1/120,fe="master",Pa="Inserts",mc="(max-width: 768px)",Tt=8,Nt=t=>zl(_i(t)),ja=t=>{const e=Nt(t);return e==="−∞"?"off":`${e} dB`};function hc(t,e){return Pe.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function fc(t,e,n){const i=n.bpm,r=x=>{const k=n.order(),T=k.indexOf(x);return T<0?k.length:T},o=(x,k,T,L)=>{const O=hc(T,L);if(!O||!k)return null;const Z=Number(k.getParam(T,L)??O.default),B=`mix-${x}-${L}`;return O.options?{type:"select",id:B,label:O.label,value:String(Z),options:O.options.map(G=>({value:String(G.value),label:G.label})),onChange:G=>{k.setParam(T,L,Number(G)),q.render()}}:{type:"slider",id:B,label:O.label,min:O.min,max:O.max,step:O.step??1,value:Z,valueText:O.format(Z,i()),onChange:G=>{k.setParam(T,L,G),q.render()}}},s=(x,k,T,L)=>L.map(O=>o(x,k,T,O)).filter(O=>O!==null),l=matchMedia(mc);let u=l.matches?null:fe;const c=x=>{u=x===null&&!l.matches?fe:x,q.render()},d=x=>c(u===x?l.matches?null:fe:x);l.addEventListener("change",()=>c(u));const p=(x,k,T,L)=>{const O=Number(k.getParam(T,L.key)??L.default),Z=`hack-${x}-${T}-${L.key}`,B=G=>{k.setParam(T,L.key,G),q.render()};return L.options?{type:"select",id:Z,label:L.label,value:String(O),options:L.options.map(G=>({value:String(G.value),label:G.label})),onChange:G=>B(Number(G))}:{type:"slider",id:Z,label:L.label,min:L.min,max:L.max,step:L.step??.001,value:O,valueText:Ja(L,O,i()),onChange:B}},f="",g={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}},y=(x,k,T)=>{const L=T.getChain(),O=L.map((B,G)=>{const Zn=ie(B.type)?.dials??[],Xn=K=>{T.moveEffect(B.id,K),q.render()},yt=[];return G>0&&yt.push({type:"button",id:`hack-${x}-${B.id}-left`,label:"Move left",on:!1,onPress:()=>Xn(G-1)}),G<L.length-1&&yt.push({type:"button",id:`hack-${x}-${B.id}-right`,label:"Move right",on:!1,onPress:()=>Xn(G+1)}),yt.push({type:"button",id:`hack-${x}-${B.id}-remove`,label:"Remove",ariaLabel:`Remove ${B.name} from ${k}`,on:!1,onPress:()=>{T.removeEffect(B.id),q.render()}}),{type:"fx",id:`hack-${x}-${B.id}`,title:`${G+1} · ${B.name}`,depth:G%4+1,on:!B.bypass,onToggle:K=>{T.setParam(B.id,"bypass",!K),q.render()},controls:Zn.filter(K=>!K.more).map(K=>p(x,T,B.id,K)),more:[...Zn.filter(K=>K.more).map(K=>p(x,T,B.id,K)),...yt]}}),Z=L.length>=Tt;return O.push({type:"fx",id:`hack-${x}-add`,title:`${k} · Inserts`,depth:L.length%4+1,controls:[{type:"note",id:`hack-${x}-note`,text:Z?`${L.length} of ${Tt}: the stack is full.`:L.length===0?"No effects yet.":`${L.length} of ${Tt}, first to last.`},...Z?[]:[{type:"select",id:`hack-${x}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...Qr.map(B=>({value:B,label:ie(B)?.label??B}))],onChange:B=>{B!==f&&(T.addEffect(B,{dials:g[B]}),q.render())}}]]}),O},v=x=>{const k=e.returns[x];return{type:"slider",id:`mix-${x}-return`,label:"Return",min:0,max:1,step:St,value:k.level,valueText:ja(k.level),onChange:T=>e.setReturn(x,{level:T})}};let m=_l(se(),n.order());const h=()=>[...e.list()].sort((x,k)=>r(x.id)-r(k.id)).map(x=>({type:"strip",id:`strip-${x.id}`,label:x.name,value:x.strip.position,valueText:Nt(x.strip.position),step:St,defaultValue:vn,resetText:`${Nt(vn)} dB`,ticks:[...Na],mute:x.strip.mute,solo:x.strip.solo,silent:x.silent,onChange:k=>e.set(x.id,{position:k}),onTypeIn:k=>{const T=Ca(k);T!==null&&e.set(x.id,{position:T})},onRemove:k=>n.onRemove(x.id,k),folded:m.has(x.id),onFold:k=>{m=Ji(se(),x.id,k),q.render()},foldHelp:te["strip:fold"],foldedHelp:te["strip:folded"],...x.fx?{hacks:u===x.id,hacksLabel:Pa,onHacks:()=>d(x.id)}:{},pan:{id:`pan-${x.id}`,value:x.strip.pan,ariaLabel:`${x.name} pan`,help:te["strip:pan"],onChange:k=>e.set(x.id,{pan:Math.abs(k)<.005?0:k})},onMute:()=>e.set(x.id,{mute:!x.strip.mute}),onSolo:()=>e.set(x.id,{solo:!x.strip.solo}),sends:["A","B"].map(k=>{const T=k==="A"?"sendA":"sendB",L=x.strip[T];return{id:`send-${k.toLowerCase()}-${x.id}`,label:k,ariaLabel:`${x.name} send ${k}`,min:0,max:ae,step:St*2,value:L,valueText:ja(L),defaultValue:0,onChange:O=>e.set(x.id,{[T]:O})}})})),b=()=>({type:"strip",id:`strip-${fe}`,label:"Master",master:!0,hacks:u===fe,hacksLabel:Pa,onHacks:()=>d(fe),channels:2,value:e.masterPositionValue,valueText:Nt(e.masterPositionValue),step:St,defaultValue:ae,resetText:"0.0 dB",ticks:[...Na],onChange:x=>e.setMaster(x),onTypeIn:x=>{const k=Ca(x);k!==null&&e.setMaster(k)}});let w=Hi(se());const S=x=>({folded:w[x],onFold:k=>{w=Al(se(),x,k),q.render()},foldHelp:te["fx:fold"]});let $=ec(se()),E=null,A=!0;const M=x=>{$=x,A=!0,tc(se(),x),q.render()},F=()=>{const x=e.returns.a,k=e.returns.b,T=e.list().find(L=>L.id===u&&L.fx);return!T&&u!==null&&(u=fe),{id:"mix",title:"Mix",summary:`${e.list().map(L=>L.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...h(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(L=>({value:L.id,label:L.available===!1?`${L.name} (soon)`:L.name,disabled:L.available===!1})),onAdd:L=>n.onAdd(L)}]},{id:"fx",area:"fx",label:T?`${T.name} inserts`:"Effects",controls:T?.fx?y(T.id,T.name,T.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:x.on,onToggle:L=>e.setReturn("a",{on:L}),...S("a"),controls:[v("a"),...s("a",x.fx,"plate",["decay","size"])],more:s("a",x.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:k.on,onToggle:L=>e.setReturn("b",{on:L}),...S("b"),controls:[v("b"),...s("b",k.fx,"delay",["delay_beats","feedback"])],more:s("b",k.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:L=>e.setInsert(L),...S("insert"),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},...$?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[b()]}]}},z=sl(F(),pc),V=()=>z.el.toggleAttribute("data-hacks-folded",u===null);V();const D=document.createElement("button");D.type="button",D.className="nc-page-action vu-add",D.dataset.vuAdd="",D.textContent="+ Meters",D.setAttribute("aria-label","Add VU meters"),D.setAttribute("data-nc-help",te["vu:add"]),D.addEventListener("click",()=>{M(!0),E?.el.querySelector("[data-vu-remove]")?.focus()}),z.el.querySelector(".nc-module-end")?.prepend(D);const R=()=>{D.hidden=$;const x=z.el.querySelector('[data-nc-section="meters"]');!$||!x||(E??=uc({onRemove:()=>{M(!1),D.focus()},folded:nc(se()),onFold:k=>{A=!0,ac(se(),k)}}),E.el.parentElement!==x&&x.append(E.el))};R(),bc(z.el,n),gc(z.el,e,n),Ga(z.el),ll(t,[z],"adjacent");const $e=x=>({peak:Ta(x.peak),rms:Ta(x.rms),over:x.peak>=Fl}),q={module:z,get hacksShown(){return u},showHacks:c,render(){z.update(F()),V(),R(),Ga(z.el)},frame(x){if(z.el.dataset.ncOpen!=="true")return;for(const T of e.list())ka(z.el,`strip-${T.id}`)?.update([$e(T.levels())],x);const k=e.masterLevels();if(ka(z.el,`strip-${fe}`)?.update(k.map($e),x),E&&$){const T=e.ctx.state==="running";T&&(A=!0),A&&(A=E.frame(T?[k[0].rms,k[1].rms]:null,x))}}};return q}const sn="application/x-nc-strip",De=".nc-strip:not([data-nc-master])",Wa=`${De}, .nc-strip-add`,Ct=t=>t?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function Ga(t){for(const e of t.querySelectorAll(`${De} .nc-strip-hd > .nc-strip-name`))e.setAttribute("data-nc-help",te["strip:name"]);for(const e of t.querySelectorAll(`${De} :is(.nc-strip-hd, .nc-strip-fold)`))!(e instanceof HTMLElement)||e.draggable||e.hasAttribute("data-renaming")||(e.draggable=!0,e.title="Drag to move this channel")}function gc(t,e,n){t.addEventListener("dblclick",i=>{const r=i.target instanceof Element?i.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(De),s=Ct(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=e.list().find(f=>f.id===s)?.name??r.textContent??"",c=document.createElement("input");c.type="text",c.className="nc-strip-name-input",c.value=u,c.maxLength=ji,c.spellcheck=!1,c.autocomplete="off",c.setAttribute("aria-label",`Rename ${u}`),c.setAttribute("data-nc-help",te["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(c,r),c.focus(),c.select();let d=!1;const p=f=>{if(d)return;d=!0;const g=c.value;c.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,f&&g!==u&&n.onRename?.(s,g)};c.addEventListener("keydown",f=>{f.key==="Enter"?(f.preventDefault(),p(!0)):f.key==="Escape"&&(f.preventDefault(),p(!1))}),c.addEventListener("blur",()=>p(!0)),c.addEventListener("click",f=>f.stopPropagation()),c.addEventListener("dragstart",f=>f.preventDefault())})}function bc(t,e){const n=()=>{for(const r of t.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of t.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},i=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};t.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(De),l=Ct(s??null);!l||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(sn,l),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),t.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(sn))return;const o=r.target instanceof Element?r.target.closest(Wa):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":i(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const l of t.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),t.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(sn),s=r.target instanceof Element?r.target.closest(Wa):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),e.onReorder?.(o,null);return}const l=Ct(s),u=i(s,r.clientX);if(n(),!l||l===o)return;let c=l;if(u==="after"){const d=[...t.querySelectorAll(De)],p=d[d.indexOf(s)+1];if(c=p?Ct(p):null,c===o)return}e.onReorder?.(o,c)}),t.addEventListener("dragend",n)}const ge=.012,ln=1024;class yc{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=ae;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(ln);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const i=()=>new AnalyserNode(e,{fftSize:ln});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:ke(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const l=new GainNode(e,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(e,{gain:ke(ae)}),d=i();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(d),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:d,on:u!==null,level:ae}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let i=this.channels.find(r=>r.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fx?.input??i.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:ln}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(e)??null;c?(r.connect(c.input),c.output.connect(o)):r.connect(o);const d=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),f=new GainNode(this.ctx,{gain:1}),g=new GainNode(this.ctx,{gain:1}),y=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(d).connect(p),p.connect(f,0).connect(y,0,0),p.connect(g,1).connect(y,0,1),y.connect(this.bus),y.connect(l).connect(this.returns.a.bus),y.connect(u).connect(this.returns.b.bus),i={id:e,name:n,input:r,fader:o,stereo:d,split:p,balL:f,balR:g,panner:y,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(e)??Yi},this.channels.push(i),this.apply()}return this.emit(),i.input}rename(e,n){const i=this.channels.find(r=>r.id===e);!i||i.name===n||(i.name=n,this.emit())}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const r of[i.input,i.fader,i.stereo,i.split,i.balL,i.balR,i.panner,i.meter,i.sendA,i.sendB])r.disconnect();i.fx?.output.disconnect(),i.fx?.dispose(),this.apply(),this.emit()}}tapNode(e){return e==="master"?this.limiter:this.channels.find(n=>n.id===e)?.panner??null}set(e,n){const i=this.channels.find(r=>r.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(ke(e),this.ctx.currentTime,ge),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,r,ge)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(ke(i.level),r,ge)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n);for(const i of this.channels)i.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=Ol(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,r)=>{i.fader.gain.setTargetAtTime(e[r]??0,n,ge),i.sendA.gain.setTargetAtTime(ke(i.strip.sendA),n,ge),i.sendB.gain.setTargetAtTime(ke(i.strip.sendB),n,ge);const[o,s]=Pl(i.strip.pan);i.balL.gain.setTargetAtTime(o,n,ge),i.balR.gain.setTargetAtTime(s,n,ge)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),Bl(this.scratch)}emit(){for(const e of this.listeners)e()}}const Pn="studio";function vc(){let t=null;const e=new Set,n=new Set,i=o=>{if(o!==t){t=o;for(const s of n)s()}},r=(o,s)=>(o.add(s),()=>{o.delete(s)});return{owner:()=>t,claim(o){t===null&&i(o)},claimAll(){i(Pn);for(const o of[...e])try{o()}catch{}},clear:()=>i(null),onAll:o=>r(e,o),onChange:o=>r(n,o)}}const wc=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function $c(t){return wc.find(e=>t(e))??null}function xc(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function kc(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${xc(e)}`}class Sc{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:$c(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});i({blob:r,name:kc(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const Ec="NetComposer Studio",ce=[40,240],Ac="nc-sync";function Lc(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${Ac}${n}`,locks:e?{request:(i,r,o)=>e.request(`${i}${n}`,r,o)}:null}}function Mc(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Tc(t,e){const n=new zr({bpm:120,minBpm:ce[0],maxBpm:ce[1],timebase:"shared"}),i=new Zr({app:Ec,version:"0.1.0",clock:n,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:ce},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let r=!1;return{clock:n,peer:i,async start(){r||(r=!0,await i.start())},play:()=>n.play({at:Ke()}),stop:()=>n.stop({at:Ke()}),setTempo:o=>n.setTempo({bpm:Nc(o)}),playing:()=>n.transport.isPlayingAt(Ke()),running:()=>n.transport.running,bpm:()=>n.transport.bpm,position(){const o=n.transport,s=Ke();return o.isPlayingAt(s)?Cc(o.beatAt(s)):null},beatPhase(){const o=n.transport,s=Ke();if(!o.isPlayingAt(s))return null;const l=o.beatAt(s);return l-Math.floor(l)},peers:()=>[...i.peers.values()]}}function Nc(t){return Number.isFinite(t)?Math.min(ce[1],Math.max(ce[0],Math.round(t*10)/10)):120}function Cc(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}const $n="netcomposer.scene",ar=1,ir="netcomposer.studio.tempo.v1",rr="netcomposer.studio.scene-name.v1",Pt=120,jn="Untitled scene",Ic=2*1024*1024;function Yt(t){const e=typeof t=="number"?t:Number(t);return Number.isFinite(e)?Math.min(ce[1],Math.max(ce[0],Math.round(e*10)/10)):Pt}function Le(t){return(typeof t=="string"?t.replace(/\s+/g," ").trim().slice(0,60):"")||jn}function Rc(t){return{format:$n,v:ar,name:Le(t.name),saved:(t.now??new Date).toISOString(),tempo:{bpm:Yt(t.bpm)},meter:[4,4],instances:t.instances.map(e=>({id:e.id,type:e.type,name:e.name})),mix:t.mix,presets:t.presets??{},media:t.media??[]}}function zc(t,e){if(t.length>Ic)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(t)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const i=n;if(i.format!==$n)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof i.v=="number"?i.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const c of Array.isArray(i.instances)?i.instances:[]){if(!c||typeof c!="object")continue;const d=c.id;if(typeof d!="string")continue;const p=Rn(d);if(!p||!e.includes(p.type)||o.has(d))continue;o.add(d);const f=c.name;s.push({id:d,type:p.type,name:Wi(f,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=i.tempo&&typeof i.tempo=="object"?i.tempo.bpm:void 0,u={};if(i.presets&&typeof i.presets=="object")for(const[c,d]of Object.entries(i.presets))o.has(c)&&(u[c]=d);return{ok:!0,scene:{format:$n,v:ar,name:Le(i.name),saved:typeof i.saved=="string"?i.saved:"",tempo:{bpm:Yt(l)},meter:[4,4],instances:s,mix:Zi(i.mix??pt()),presets:u,media:Array.isArray(i.media)?i.media:[]}}}function Oc(t){return`${Le(t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Fc(t){try{const e=t?.getItem(ir);return e?Yt(Number(e)):Pt}catch{return Pt}}function or(t,e){try{e?.setItem(ir,String(Yt(t)))}catch{}}function Bc(t){try{return Le(t?.getItem(rr))}catch{return jn}}function sr(t,e){try{e?.setItem(rr,Le(t))}catch{}}const Pc=300,jc=120*1e3;function Wc(t){return Object.prototype.toString.call(t)==="[object Float32Array]"}function Gc(t){const e=t&&typeof t=="object"?t:null;if(!e)return{ok:!1,message:"No audio."};const n=typeof e.name=="string"?e.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const i=e.sampleRate;if(typeof i!="number"||!Number.isFinite(i)||i<8e3||i>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=e.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(Wc))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Pc*i)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof e.bars=="number"&&Number.isInteger(e.bars)&&e.bars>=1&&e.bars<=256?e.bars:void 0,l=typeof e.bpm=="number"&&Number.isFinite(e.bpm)&&e.bpm>=20&&e.bpm<=300?e.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:i,channels:r.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function Ha(t){try{const e=t.targets();return Array.isArray(e)?e.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const i=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:i,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Hc(t={}){const e=new Map,n=s=>t.live?.(s)??!0,i=s=>t.nameOf?.(s)??s,r=t.answerMs??jc,o=s=>[...e.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const c=t.brandOf?.(l);return{instance:l,name:i(l),...c?{brand:c}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:Ha(u)}});return{forget(s){e.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,c){const d=e.get(l);if(l===s||!d||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!Ha(d).some(y=>y.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const p=Gc(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const f={...p.audio,from:s,fromName:t.brandOf?.(s)??i(s)};let g;try{const y=await Promise.race([Promise.resolve(d.receive(f,c)),new Promise(v=>{g=setTimeout(()=>v({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!y||typeof y!="object"||typeof y.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:y}catch(y){return{ok:!1,reason:"error",message:y instanceof Error?y.message:String(y)}}finally{clearTimeout(g)}},onAudio(l){return e.set(s,l),()=>{e.get(s)===l&&e.delete(s)}},reveal(){n(s)&&t.reveal?.(s)}}}}}const _c="/studio/assets/silence-processor-D4WJD_Gt.js";function Dc(t,e=On){const n=e.find(o=>o.id===t.type),i=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??i,rest:t.custom&&t.name?` / ${t.name.toUpperCase()}`:` / ${i} / ${r}`,...n?.identity?{identity:n.identity}:{}}}function Yc(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const l=new URL(String(o),e).href;let u=i.get(l);return u||(u=n(o,s),i.set(l,u),u.catch(()=>{i.get(l)===u&&i.delete(l)})),u},configurable:!0}),t}const Y=new AudioContext({latencyHint:"interactive"});Yc(Y.audioWorklet,location.href);const J=Gl(),Ee={},Zc=Tt,Wn=new Map,_=new yc(Y,{restore:t=>J.channels[t],fx:t=>{const e=ea(Y,{moduleUrl:mn,bpm:120,state:Ml(t,J)});return Ee[t]=e,e},channelFx:t=>{Wt.delete(t);const e=ea(Y,{moduleUrl:mn,bpm:P.bpm(),slots:Zc,state:J.channelFx[t]??{v:2,chain:[]}}),n=ni(e,P.clock,{mapper:gt}),i=e.dispose.bind(e);return e.dispose=()=>{n(),i()},e.onChange(Xt),Wn.set(t,e),e}});_.setMaster(J.master);_.setReturn("a",J.returns.a);_.setReturn("b",J.returns.b);_.setInsert(J.insert.on);const gt=new Yr(Y);gt.start();const lr=Mc();let cr=()=>{};const Xc=Tl(Y,{nodeFor:t=>_.tapNode(t),sources:()=>[{id:"master",name:"Master"},..._.list().map(t=>({id:t.id,name:t.name}))],ready:new Promise(t=>{cr=t})}),Ae=vc(),We=xl(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),dr=Hc({live:t=>I.some(e=>e.id===t),nameOf:t=>I.find(e=>e.id===t)?.name??t,brandOf:t=>{const e=I.find(i=>i.id===t),n=Q.find(i=>i.id===e?.type)?.brand;return e&&n?e.n===1?n:`${n} ${e.n}`:void 0},reveal:t=>{pe(t),document.getElementById(`tab-${t}`)?.scrollIntoView({block:"nearest"}),ue.get(t)?.contentWindow?.focus()}});window.ncStudio=El(Y,_,{presets:We,share:dr,grab:Xc,play:Ae,mapper:Nl(gt),resolve:(t,e)=>Qc(t,e),syncScope:lr,fxWorklet:new URL(mn,location.href).href});const P=Tc(()=>Y.state,Lc(lr));function Ye(){try{return globalThis.localStorage??null}catch{return null}}P.setTempo(Fc(Ye()));const It=new Sc(_.recordOut.stream);let Et=null;function C(t,e={},...n){const i=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||i.setAttribute(r,o===!0?"":String(o));return i.append(...n),i}const mt=C("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Ze=C("input",{type:"number",class:"bpm",min:ce[0],max:ce[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),jt=C("output",{class:"position","aria-label":"Bar and beat"},"—"),ve=C("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),at=C("a",{class:"take",hidden:!0}),Gn=C("span",{class:"status",role:"status"}),Fe=C("input",{type:"text",class:"scene-name",maxlength:60,value:Bc(Ye()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),ur=C("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),pr=C("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),mr=C("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),lt=C("input",{type:"file",accept:".json,application/json",hidden:!0}),Vc=C("h1",{class:"brand","aria-label":"NetComposer Studio"},C("span",{"aria-hidden":"true"},"NetComposer",C("span",{class:"brand-sep"}," / "),"Studio")),xn=C("span",{class:"beat-light","aria-hidden":"true"}),Hn=C("span",{class:"status-long"}),_n=C("span",{class:"status-short"});Gn.append(Hn,_n);const kn=C("header",{class:"top"},C("div",{class:"transport"},mt,C("label",{class:"tempo"},Ze,C("span",{class:"tempo-unit"},"BPM")),xn,jt),C("div",{class:"record"},ve,at),Gn),Uc=C("div",{class:"scene",role:"group","aria-label":"Scene"},Fe,ur,pr,mr,lt);It.supported||(ve.disabled=!0,ve.title="This browser can't record audio");const Ue=C("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),hr=C("div",{class:"stage"}),bt=C("label",{class:"tab tab-add",title:"Add an instrument"},C("span",{"aria-hidden":"true"},"+")),Ge=C("select",{class:"tab-add-select","aria-label":"Add an instrument"});Ge.append(C("option",{value:""},"Add an instrument"),...On.map(t=>{const e=C("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));Ge.addEventListener("change",()=>{const t=Ge.value;Ge.value="",t&&wr(t)});bt.append(Ge);Ue.append(bt);tl();const ht=C("div",{class:"spine","aria-hidden":"true"}),ue=new Map;let I=gl(fl(Q),Q),me=I[0]?.id??"";const qc=new URLSearchParams(location.search).has("measure"),_a=new Map,Kc=2e4;function fr(t){const e=C("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>pe(t.id)),Ue.insertBefore(e,bt);const i=(_a.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!I.some(l=>l.id===t.id))return r();const o=C("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:pl(t,qc),allow:"autoplay; clipboard-read; clipboard-write; microphone"});ue.set(t.id,o);const s=window.setTimeout(r,Kc);o.addEventListener("load",()=>Jc(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),hr.append(o),pe(me)}));return _a.set(t.type,i),i}function Jc(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="";const n=t.id.replace(/^panel-/,""),i=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const l=e?.querySelector(".nc-page-hd, .nc-title-band");l&&(br.set(n,Math.round(l.getBoundingClientRect().bottom)),n===me&&yr())};i();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(()=>{i(),Zt()}).observe(r),Dn.add(t),gr(t)}const Dn=new Set;function gr(t){let e;try{e=t.contentDocument?.documentElement}catch{return}if(!e||!t.isConnected){Dn.delete(t);return}const n=t.getBoundingClientRect();if(n.height<=0)return;const i=getComputedStyle(kn).position==="sticky"?kn.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,i-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));e.style.setProperty("--nc-host-top",`${Math.round(r)}px`),e.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),e.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let cn=!1;function Zt(){cn||(cn=!0,requestAnimationFrame(()=>{cn=!1;for(const t of Dn)gr(t)}))}window.addEventListener("scroll",Zt,{passive:!0});window.addEventListener("resize",Zt);const br=new Map;function yr(){const t=br.get(me);t===void 0?ht.style.removeProperty("--spine-top"):ht.style.setProperty("--spine-top",`${t}px`)}function vr(t){if(!t){ht.replaceChildren();return}const e=Dc(t),n=C("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),ht.replaceChildren(C("span",{class:"spine-text"},n,C("span",{class:"spine-rest"},e.rest)))}function pe(t){me=t,vr(I.find(e=>e.id===t)),yr(),Zt();for(const e of I){const n=e.id===t;ue.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const Qc=yl(()=>I.map(t=>({instance:t,window:()=>ue.get(t.id)?.contentWindow,readyState:()=>{try{return ue.get(t.id)?.contentDocument?.readyState}catch{return}}})),Q);function wr(t){const e=Q.find(r=>r.id===t);if(!e)return;const n=ml(I,e),i=I.map(r=>r.type).lastIndexOf(n.type);I=i<0?[...I,n]:[...I.slice(0,i+1),n,...I.slice(i+1)],Ve(I),fr(n);for(const r of I){const o=document.getElementById(`tab-${r.id}`);o&&Ue.insertBefore(o,bt)}pe(n.id),Me?.render()}function ed(t,e){const n=I.find(o=>o.id===t);if(!n)return;const i=I.filter(o=>o.id!==t),r=e===null?i.length:i.findIndex(o=>o.id===e);I=[...i.slice(0,r<0?i.length:r),n,...i.slice(r<0?i.length:r)],Ve(I);for(const o of I){const s=document.getElementById(`tab-${o.id}`);s&&Ue.insertBefore(s,bt)}Me?.render()}function td(t,e){I=ul(I,t,e,Q),Ve(I);const n=I.find(r=>r.id===t);if(!n)return;const i=document.getElementById(`tab-${t}`);i&&(i.textContent=n.name),ue.get(t)?.setAttribute("title",n.name),me===t&&vr(n),_.rename(t,n.name)}async function nd(t,e){const i=I.find(s=>s.id===t)?.name??t;if(!await Mn({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;I=I.filter(s=>s.id!==t),Ve(I),dr.forget(t);const o=ue.get(t);ue.delete(t),o?.setAttribute("src","about:blank"),o?.remove(),document.getElementById(`tab-${t}`)?.remove(),_.detach(t),ad(t),Hl(se(),t),me===t&&pe(I[0]?.id??"")}const Sn=C("div",{class:"mix"});Sn.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==me&&I.some(i=>i.id===n)&&pe(n)});let Me=null,En=0;const Wt=new Set;function ad(t){Wt.add(t),delete J.channels[t],delete J.channelFx[t],Wn.delete(t),Xt()}let $r=!1;function Xt(){window.clearTimeout(En),!$r&&(En=window.setTimeout(()=>{Vi(xr())},300))}function xr(){const t={...J.channels};for(const i of _.list())t[i.id]=i.strip;for(const i of Wt)delete t[i];const e={};for(const i of["a","b","insert"]){const r=Ee[i];r&&(e[i]=r.getState())}const n={...J.channelFx};for(const[i,r]of Wn)n[i]=r.getState();for(const i of Wt)delete n[i];return{v:1,channels:t,master:_.masterPositionValue,returns:{a:{on:_.returns.a.on,level:_.returns.a.level},b:{on:_.returns.b.on,level:_.returns.b.level}},insert:{on:_.insertEnabled},fx:e,channelFx:n}}_.onChange(()=>{Me?.render(),Xt()});for(const t of Object.values(Ee))t?.onChange(Xt);async function kr(){Y.state!=="running"&&await Y.resume()}mt.addEventListener("click",()=>{kr(),P.running()&&Ae.owner()===Pn?P.stop():P.running()?Ae.claimAll():(Ae.claimAll(),P.play()),Te()});function Sr(){const t=Number(Ze.value);P.setTempo(t),or(P.bpm(),Ye())}Fe.addEventListener("change",()=>{Fe.value=Le(Fe.value),sr(Fe.value,Ye())});function id(t,e,n){const i=URL.createObjectURL(new Blob([e],{type:n})),r=C("a",{href:i,download:t});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}ur.addEventListener("click",async()=>{const t=Le(Fe.value),e=I.map(o=>o.id),n=await We.collect(e),i=Rc({name:t,bpm:P.bpm(),instances:I,mix:xr(),presets:n});id(Oc(t),`${JSON.stringify(i,null,2)}
`,"application/json");const r=I.filter(o=>!n[o.id]).map(o=>o.name);Yn(r.length?`Saved “${t}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${t}”`)});pr.addEventListener("click",()=>lt.click());lt.addEventListener("change",async()=>{const t=lt.files?.[0];if(lt.value="",!t)return;const e=zc(await t.text(),Q.filter(r=>r.available!==!1).map(r=>r.id));if(!e.ok){Yn(e.error);return}const n=e.scene;await Mn({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&Er({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});mr.addEventListener("click",async()=>{await Mn({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&Er({name:jn,bpm:Pt,instances:ut(Q),mix:pt()})});function Er(t){P.running()&&P.stop(),$r=!0,window.clearTimeout(En);const e=t.instances.map(({id:n,name:i})=>{const[r,o]=n.split("#"),s=Q.find(l=>l.id===r);return s?Xe(s,o?Number(o):1,i):null}).filter(n=>n!==null);Ve(e),Vi(t.mix),or(t.bpm,Ye()),sr(t.name,Ye()),We.stash({...t.presets??{}}),location.reload()}let Da=0;function Yn(t){Hn.textContent=t,_n.textContent=t,window.clearTimeout(Da),Da=window.setTimeout(Te,4e3)}Ze.addEventListener("change",Sr);Ze.addEventListener("keydown",t=>{t.key==="Enter"&&Sr()});ve.addEventListener("click",async()=>{if(kr(),It.recording){const t=await It.stop();ve.setAttribute("aria-pressed","false"),ve.textContent="Rec",t&&(Et&&URL.revokeObjectURL(Et.url),Et={url:URL.createObjectURL(t.blob),take:t},at.href=Et.url,at.download=t.name,at.textContent=`Save take (${t.seconds.toFixed(1)} s)`,at.hidden=!1)}else It.start(),ve.setAttribute("aria-pressed","true"),ve.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),mt.click())});Ue.addEventListener("keydown",t=>{if(t.target===Ge)return;const e=I.map(r=>r.id),n=e.indexOf(me),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),pe(i),document.getElementById(`tab-${i}`)?.focus())});function Te(){const t=P.running()&&Ae.owner()===Pn;mt.textContent=t?"Stop":"Play",mt.setAttribute("aria-pressed",String(t)),document.activeElement!==Ze&&(Ze.value=String(Math.round(P.bpm()*10)/10));const e=P.position();jt.value=e?`${e.bar}.${e.beat}`:"—";const n=P.peers().length;Hn.textContent=Y.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",_n.textContent=Y.state==="running"?"":"Audio off",Gn.classList.toggle("off",Y.state!=="running")}P.clock.onChange(()=>{P.running()||Ae.clear(),Te()});Ae.onChange(Te);P.clock.onChange(()=>Me?.render());P.peer.onPeers(Te);Y.addEventListener("statechange",Te);const rd=.25;let Ya=performance.now();function Ar(t){const e=Math.min(.1,(t-Ya)/1e3);Ya=t,Me?.frame(e);const n=P.position(),i=n?`${n.bar}.${n.beat}`:"—";jt.value!==i&&(jt.value=i);const r=P.beatPhase(),o=r!==null&&r<rd;xn.hasAttribute("data-on")!==o&&xn.toggleAttribute("data-on",o),requestAnimationFrame(Ar)}async function od(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Vc,kn,Uc,Sn,C("main",{class:"instruments"},Ue,C("div",{class:"bay"},ht,hr))),Me=fc(Sn,_,{order:()=>I.map(e=>e.id),catalogue:On,bpm:()=>P.bpm(),onAdd:wr,onRemove:(e,n)=>void nd(e,n),onReorder:(e,n)=>ed(e,n),onRename:(e,n)=>td(e,n)}),Y.state==="running"&&await Y.suspend(),await Y.audioWorklet.addModule(_c),cr(),await P.start();for(const e of[Ee.a,Ee.b,Ee.insert])e&&ni(e,P.clock,{mapper:gt});for(const e of I)fr(e);pe(me),Te(),requestAnimationFrame(Ar),document.documentElement.dataset.studioReady="",sd()}function sd(){const t=new Set(We.pending());if(!t.size)return;const e=[],n=o=>I.find(s=>s.id===o)?.name??o,i=()=>{window.clearTimeout(r);const o=[...e,...We.dropPending()].map(n);Yn(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};We.onApplied((o,s)=>{t.delete(o)&&(s||e.push(o),t.size||i())});const r=window.setTimeout(i,wl)}window.__studio={ctx:Y,mixer:_,mapper:gt,transport:P,frames:ue,show:pe,get instances(){return I},fx:Ee,get mix(){return Me}};od();
