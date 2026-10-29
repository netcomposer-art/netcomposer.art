(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const ae=1e-9;function wi(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class rt{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return wi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(r=>Number.isFinite(r.beat)&&Number.isFinite(r.bpm)).slice().sort((r,l)=>r.beat-l.beat);let a=i.length?i[0].bpm:this.bpm;for(const r of i)r.beat<=e.beat+ae&&(a=r.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(a)}];for(const r of i){if(r.beat<=e.beat+ae)continue;const l=this.clamp(r.bpm);l!==o[o.length-1].bpm&&o.push({beat:r.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+ae){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-ae;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,a=.25){const o=this.bpmAt(t);if(!(i>0)||!(a>0)){this.setTempoAt(e,t);return}const r=Math.max(1,Math.round(i/a));this.setTempoAt(o,t);for(let l=1;l<=r;l++)this.setTempoAt(o+(e-o)*l/r,t+i*(l-1)/r)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new rt({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+ae)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+ae)return t[i];return t[0]}}const ki=Object.freeze({beatsPerBar:4,beatUnit:4}),le=1e-9;function vi(n){return Math.floor(n+le)}function hn(n,e,t=!1){if(!(e>0))return n;const a=Math.ceil(n/e-le)*e;return t&&a<=n+le?a+e:a}class $i{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new rt({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??ki}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-le&&(this.stopTime===null||e<this.stopTime-le)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-le?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=vi(e/t),a=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:a,barPhase:a/t}}nextBar(e,t=!1){return hn(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const pn="nc-clock/snapshot",mn=1;function xi(n,e="local"){return{format:pn,version:mn,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function Si(n,e){const t=Ei(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}function Ti(n,e,t=n.timebase){const i=a=>a===null?null:a+e;return{...n,timebase:t,anchor:{beat:n.anchor.beat,time:n.anchor.time+e},tempo:n.tempo.map(a=>({...a})),meter:{...n.meter},startTime:i(n.startTime),stopTime:i(n.stopTime)}}const D=n=>typeof n=="number"&&Number.isFinite(n),Rt=n=>n===null||D(n);function Ei(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==pn&&t("format"),(!D(e.version)||Math.floor(e.version)!==mn)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!D(e.anchor.beat)||!D(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&D(i.beat)&&D(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!D(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!D(e.meter.beatUnit))&&t("meter"),(!Rt(e.startTime)||!Rt(e.stopTime)||!D(e.stoppedBeat))&&t("transport times"),e}class Mi{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new $i(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Si(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return xi(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const Ai="nc-sync/1",Li=1,Ni="nc-sync",Ci="nc-sync-leader",Pi=0,fn=.5,gn=.75;function _i(n){return typeof n=="number"&&Number.isFinite(n)&&n>=fn&&n<=gn?n:null}const Be=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),pe=n=>typeof n=="number"&&Number.isFinite(n),$e=n=>typeof n=="string"&&n.length>0;function Ii(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Li||!$e(e.type)||!$e(e.from)||!pe(e.term)||!pe(e.seq)||!pe(e.sentAt))return null;switch(e.type){case"hello":return $e(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return pe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&pe(e.slot)?e:null;case"ping":case"pong":return $e(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ji(n,e,t,i,a){return{proto:Ai,from:e,term:t,seq:i,sentAt:a,...n}}function z(){return(performance.timeOrigin+performance.now())/1e3}const qe=.003,Ri=3,zi=.01,zt=500;class Oi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?zi:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=qe&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const a=t-(this.timeOrigin+i)/1e3,o=this.median(),r=a-o,l=Math.abs(a-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(r);return!d&&Math.abs(r)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(r-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(a,o,d))):(this.pendingStep=r,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,i){const a=this.ctx.currentTime,o=a<=this.revertUntil;let r;if(i&&o){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,r={stepSeconds:this.preStepBase-t,confirmedAt:a,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,u=this.preStep;u.length=0;for(let p=0;p<c.length;p++)u.push(c[p]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?a+this.stepRevert:-1/0}const l=this.offsets,d=e-t;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,r={stepSeconds:e-t,confirmedAt:a,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(r);return!0}median(){const e=this.offsets,t=this.scratch,i=e.length;t.length=i;for(let o=0;o<i;o++){const r=e[o];let l=o-1;for(;l>=0&&t[l]>r;)t[l+1]=t[l],l--;t[l+1]=r}const a=i>>1;return i%2?t[a]:(t[a-1]+t[a])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=qe&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<zt)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=qe)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const a=this.perfNow();if(this.waitSince===null&&(this.waitSince=a),a-this.waitSince<zt)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Ri,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,a=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(a)&&a>0?a:null}}class Bi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Be,...e.capabilities},this.channelOption=e.channel??Ni,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[a,o]=this.tempoRange();e=Math.min(o,Math.max(a,e));const r=this.clock.transport,l=this.o.now();if(!r.running){this.clock.commitTempo(e),this.broadcastState();return}const d=r.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??hn(d,1),d);i&&i>0?(r.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(gn,Math.max(fn,e)):Pi;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=_i(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=Ii(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const a=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Be,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),a||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const o of this.peers.values())o.leader=o.id===t.from;const a=this.peers.get(t.from);a?a.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Be},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const a of[...this.snapshotListeners])a(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const a of[...this.messageListeners])a(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const r=this.releaseLock;this.releaseLock=null,r()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Ci,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(r=>{this.releaseLock=()=>{this.setLeader(!1),r()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(o,r,l)=>[o?0:1,r,l];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),a=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const r=t(o.capabilities.prefersLeader,o.joinedAt,o.id);(a===null||r[0]<i[0]||r[0]===i[0]&&(r[1]<i[1]||r[1]===i[1]&&r[2]<i[2]))&&(i=r,a=o.id)}this.setLeader(a===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],a=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==a[0]?i[0]<a[0]:i[1]!==a[1]?i[1]<a[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const a=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>a&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(ji(e,this.id,this.term,++this.seq,this.o.now()))}}const qi=["kick","snare","clap","rim","hat","hatOpen","tom","metal"],F=10,bn=["1","2","3","4","5","6","7","8","9","0"];function yn(){return{slots:Array.from({length:F},()=>null),active:null}}function lt(n){return{swing:n.swing,fx:structuredClone(n.fx),tracks:structuredClone(n.tracks)}}function Di(n,e,t){const i=n.slots.slice();return i[e]=lt(t),{slots:i,active:e}}function Fi(n,e){const t=n.slots.slice();return t[e]=null,{slots:t,active:n.active===e?null:n.active}}function Ot(n,e,t,i){const a=n.slots[e];return a?{bank:{slots:n.slots,active:e},document:{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)},glideSeconds:i>0?i:0,applied:!0}:{bank:n,document:t,glideSeconds:0,applied:!1}}function Hi(n,e){if(n.active==null||!n.slots[n.active])return n;const t=n.slots.slice();return t[n.active]=lt(e),{slots:t,active:n.active}}const Ui=16,Gi=[2,6,10,14],Ki=[2,3,6,10,11,14],Bt=[0,2,4,6,8,10,12,14],Wi=[2,6,10,14],Vi=[1,3,7,9,11,15],Yi={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]}};function W(){return Array.from({length:Ui},()=>!1)}function H(n,e,t,i=!1){const a=e+n()*(t-e);return i?Math.round(a):Math.round(a*100)/100}function De(n,e,t){return H(n,Math.max(0,e-t),Math.min(1,e+t))}function Ji(n){const e=W();e[0]=!0,n()<.85&&(e[8]=!0),n()<.75&&(e[4]=!0),n()<.75&&(e[12]=!0);const t=[3,6,10,14],i=t[Math.floor(n()*t.length)]??6;return n()<.35&&(e[i]=!0),e}function Xi(n){const e=W();e[4]=n()<.85,e[12]=n()<.85,!e[4]&&!e[12]&&(e[n()<.5?4:12]=!0);const t=Gi.filter(()=>n()<.22);for(const i of t.slice(0,2))e[i]=!0;return e}function Qi(n,e){const t=W();return n[4]&&e()<.65&&(t[4]=!0),n[12]&&e()<.65&&(t[12]=!0),t}function Zi(n,e){const t=W();let i=0;for(const a of Ki)i>=3||n[a]||e()<.35&&(t[a]=!0,i+=1);return t}function es(n){const e=W();let t=0;for(const i of Wi){if(t>=2)break;n()<.4&&(e[i]=!0,t+=1)}return e}function ts(n,e){const t=W();for(const r of Bt)t[r]=!n[r];const i=Bt.filter(r=>t[r]&&r!==0),a=1+Math.floor(e()*3);for(let r=0;r<a&&i.length>0;r+=1){const l=Math.floor(e()*i.length),d=i.splice(l,1)[0];d!==void 0&&(t[d]=!1)}let o=0;for(const r of[1,3,5,7,9,11,13,15]){if(o>=2)break;e()<.12&&(t[r]=!0,o+=1)}return t}function ns(n,e){const t=W(),i=n[12]?[13,14,15]:[12,13,14,15];let a=0;for(const o of i){if(a>=3)break;e()<.45&&(t[o]=!0,a+=1)}return t}function is(n,e,t){const i=W();let a=0;for(const o of Vi)a>=2||n[o]||e[o]||t()<.35&&(i[o]=!0,a+=1);return i}function wn(n,e,t){return Array.from({length:e},(i,a)=>{const o=n[a]===!0,r=o&&t(a);return{on:o,accent:r,velocity:r?1:.8}})}function kn(n,e){return n==="kick"?e===0||e===8:n==="snare"?e===4||e===12:!1}function ss(n,e,t){const i=Yi[n];return{tune:H(t,i.tune[0],i.tune[1],!0),decay:H(t,i.decay[0],i.decay[1]),tone:De(t,e.tone,.15),snap:De(t,e.snap,.15),drive:De(t,e.drive,.1),level:H(t,i.level[0],i.level[1])}}function vn(n){const e=Ji(n),t=Xi(n),i=es(n);return{kick:e,snare:t,clap:Qi(t,n),rim:Zi(e,n),hat:ts(i,n),hatOpen:i,tom:ns(t,n),metal:is(e,t,n)}}function as(n,e,t){const i=n.tracks[e];if(!i)return n;const a=l=>l.every((d,c)=>d.on===(i.steps[c]?.on??!1));let o=i.steps;for(let l=0;l<6;l++){const d=vn(t)[i.voice];if(o=wn(d,i.length,c=>kn(i.voice,c)),!a(o)&&o.some(c=>c.on))break}const r=i.steps.slice(i.length);return{...n,tracks:n.tracks.map((l,d)=>d===e?{...l,steps:[...o,...r]}:l)}}function os(n){return{...n,tracks:n.tracks.map(e=>{const t=Math.max(0,e.length-4),i=e.steps.map((a,o)=>{if(o<t||o>=e.length)return a;const r=o-t;return e.voice==="snare"?{on:!0,accent:r===3,velocity:[.55,.7,.85,1][r]??1}:e.voice==="tom"?{on:r%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...a,on:!1,accent:!1}:a});return{...e,steps:i}})}}function rs(n,e){const t=vn(e),i=e()<.4?.5:H(e,.5,.62),a=e(),o=a<.8?"lp":a<.9?"hp":"bp";return{...n,bpm:n.bpm,swing:i,fx:{mode:o,cutoff:H(e,.55,.9),resonance:H(e,.05,.3),drive:H(e,.02,.18)},tracks:n.tracks.map(r=>({...r,mute:r.mute,solo:r.solo,params:ss(r.voice,r.params,e),steps:wn(t[r.voice],r.length,l=>kn(r.voice,l))}))}}function ls(n,e=Math.random){const t=[];let i=null;for(let o=0;o<F;o+=1){const r=lt(rs(n,e));t.push(r),o===0&&(i=r)}const a=i?{...n,bpm:n.bpm,swing:i.swing,fx:structuredClone(i.fx),tracks:structuredClone(i.tracks)}:n;return{bank:{slots:t,active:0},document:a}}function ct(n){return`${Math.round(n*100)}%`}function cs(n){return ct(n)}function ds(n,e){return n==="tune"?`${Math.round(e)} Hz`:ct(e)}function us(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Ye=2,$n=64;function hs(n,e){const{version:t,...i}=n,a={...i,version:Ye,slots:Array.from({length:F},(o,r)=>{const l=e.slots[r];return l?{...l,seed:(l.seed??0)>>>0}:null}),active:e.active};return JSON.stringify(a)}function qt(n){return Array.isArray(n)&&n.length<=$n}function ps(n){if(gs(n)>ms)return{ok:!1,errors:["File exceeds the byte cap"]};let e;try{e=JSON.parse(n)}catch{return{ok:!1,errors:["Not a Rhythm file (invalid JSON)"]}}if(!e||typeof e!="object")return{ok:!1,errors:["Not a Rhythm file"]};const t=e;if(t.format!==dt)return{ok:!1,errors:["Not a Rhythm file"]};if(t.version!==1&&t.version!==Ye)return{ok:!1,errors:[`Unsupported version ${String(t.version)}`]};const i=t.version,{slots:a,active:o,...r}=t,l=Le({...r,version:ut});if(!l.ok||!l.document)return{ok:!1,errors:l.errors};const d=l.document,c=[];for(const p of d.tracks)qt(p.steps)||c.push(`More than ${$n} steps on ${p.id}`);const u={slots:Array.from({length:F},()=>null),active:null};return i===Ye&&(!Array.isArray(a)||a.length!==F?c.push(`Expected ${F} slots`):a.forEach((p,b)=>{if(p==null)return;if(!Le({...d,swing:p.swing,fx:p.fx,tracks:p.tracks}).ok||!p.tracks.every(f=>qt(f.steps))){c.push(`Slot ${b+1} is malformed`);return}const w=typeof p.seed=="number"&&Number.isFinite(p.seed)?p.seed>>>0:0;u.slots[b]={swing:p.swing,fx:p.fx,tracks:p.tracks,seed:w}}),o!=null&&(!Number.isInteger(o)||o<0||o>=F||!u.slots[o]?c.push("Active slot is empty or out of range"):u.active=o)),c.length>0?{ok:!1,errors:c}:{ok:!0,errors:[],document:d,bank:u,from:i}}const dt="netcomposer.rhythm",ut=1,ms=256*1024,xn="netcomposer.rhythm.preset.",fs=new Set(qi);function Sn(n){return`${xn}${n}`}function gs(n){let e=0;for(const t of n){const i=t.codePointAt(0)??0;i<=127?e+=1:i<=2047?e+=2:i<=65535?e+=3:e+=4}return e}function Le(n){const e=[];if(!n||typeof n!="object")return{ok:!1,errors:["Document is not an object"]};const t=n;if(t.format!==dt&&e.push("Unknown format"),t.version!==ut&&e.push("Unsupported version"),(typeof t.id!="string"||!t.id.startsWith(xn))&&e.push("Preset id is outside the rhythm namespace"),(typeof t.name!="string"||t.name.length===0)&&e.push("Missing name"),(typeof t.bpm!="number"||!Number.isFinite(t.bpm)||t.bpm<=0)&&e.push("Invalid tempo"),(typeof t.swing!="number"||t.swing<.5||t.swing>.75)&&e.push("Swing is outside 0.5 to 0.75"),(!t.meter||t.meter.beatsPerBar<=0||t.meter.beatUnit<=0)&&e.push("Invalid meter"),(!t.fx||t.fx.mode!=="lp"&&t.fx.mode!=="hp"&&t.fx.mode!=="bp")&&e.push("Invalid filter"),!Array.isArray(t.tracks)||t.tracks.length===0||t.tracks.length>16)e.push("Expected 1 to 16 tracks");else for(const i of t.tracks)fs.has(i.voice)||e.push(`Unknown voice ${i.voice}`),(!Number.isInteger(i.length)||i.length<1||i.length>64)&&e.push(`Bad length on ${i.id}`),(!Array.isArray(i.steps)||i.steps.length<i.length)&&e.push(`Steps shorter than length on ${i.id}`);return e.length>0?{ok:!1,errors:e}:{ok:!0,errors:[],document:t}}function Tn(n,e=[]){return Array.from({length:16},(t,i)=>({on:n.includes(i),accent:e.includes(i),velocity:e.includes(i)?1:.8}))}const bs={kick:{tune:55,decay:.4,tone:.4,snap:.5,drive:.2,level:.8},tom:{tune:90,decay:.35,tone:.4,snap:.4,drive:.15,level:.7},snare:{tune:180,decay:.2,tone:.5,snap:.6,drive:.15,level:.55},clap:{tune:180,decay:.2,tone:.55,snap:.7,drive:.1,level:.45},rim:{tune:400,decay:.08,tone:.6,snap:.8,drive:.05,level:.4},hat:{tune:320,decay:.05,tone:.7,snap:.4,drive:.1,level:.35},hatOpen:{tune:300,decay:.18,tone:.65,snap:.35,drive:.08,level:.32},metal:{tune:240,decay:.18,tone:.6,snap:.7,drive:.2,level:.4}};function En(){const n=[{voice:"kick",name:"Kick",on:[0,4,8,12],accent:[0]},{voice:"snare",name:"Snare",on:[4,12],accent:[4]},{voice:"clap",name:"Clap",on:[4,12]},{voice:"rim",name:"Rim",on:[6,14]},{voice:"hat",name:"Hat",on:[0,2,4,6,8,10,12,14]},{voice:"hatOpen",name:"Open",on:[2,10]},{voice:"tom",name:"Tom",on:[14]},{voice:"metal",name:"Metal",on:[10]}];return{format:dt,version:ut,id:Sn("default"),name:"Default",bpm:120,swing:.5,meter:{beatsPerBar:4,beatUnit:4},fx:{mode:"lp",cutoff:.72,resonance:.15,drive:.08},tracks:n.map(e=>({id:e.voice,name:e.name,voice:e.voice,length:16,mute:!1,solo:!1,steps:Tn(e.on,e.accent),params:{...bs[e.voice]}}))}}function ys(){const n=En();return{...n,id:Sn("untitled"),name:"Untitled",tracks:n.tracks.map(e=>({...e,steps:Tn([])}))}}const ws="Tap to join",Mn="Tap to join the playing beat";function Ee(n,e){return n&&e?"join":e?"stop":"play"}function An(n){return n==="join"?ws:n==="stop"?"Stop":"Play"}function ks(n,e,t={}){const i=t.beatsPerBar??4,a=(t.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((n+a)/i-1e-9)*i)}class vs{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,t){return this.shown=Ee(e,t),this.shown}gesture(e,t,i=!1){return this.joinedBy=!1,i||this.joining||Ee(e,t)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,t){const i=this.joinedBy||this.joining||Ee(e,t)==="join";return this.joinedBy=!1,i}get pending(){return this.joining}enter(e,t){return this.joining=!1,this.entry=ks(e,t,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class $s{constructor(e=t=>JSON.stringify(t)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,t=!1){const i=this.key(e);if(this.value=e,this.has=!0,!t&&i===this.lastKey)return!1;this.lastKey=i;for(const a of this.listeners)a(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class ht{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,t){return!t||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,t,i,a={}){const o=a.id??this.seq+1;this.seq=Math.max(this.seq,o);const r=a.atBeat??Ln(t,a.beatsPerBar);return this.held={id:o,slot:e,atBeat:r,payload:i},this.queued=e,this.held}due(e){const t=this.held;return!t||e<t.atBeat?null:this.finish(t)}takeHeld(e){const t=this.held;return!t||t.id!==e?null:this.finish(t)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const t=new ht;return t.queued=e.queued,t.held=e.held,t.seq=e.seq,t.taken=e.taken,t}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Ln(n,e=4){return n<0?0:(Math.floor(n/e+1e-9)+1)*e}class xs{constructor(e){this.options=e}taps=[];tap(e){const{window:t=4,resetMs:i=2e3,jump:a=.4}=this.options,o=this.taps[this.taps.length-1];if(o===void 0||e-o>i||e<=o)return this.taps=[e],null;const r=e-o,l=this.meanInterval();l!==null&&Math.abs(r-l)>l*a&&(this.taps=[o]),this.taps.push(e),this.taps.length>t+1&&this.taps.splice(0,this.taps.length-t-1);const d=this.meanInterval();return d===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/d)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Nn=globalThis,Ss="linkslots",Ts=new Set(["0","false","off","no"]);function Es(n,e=Nn.location?.search??"",t=As()){const i=new URLSearchParams(e).get(Ss);if(i!==null)return!Ts.has(i.trim().toLowerCase());try{return t?.getItem(n)==="1"}catch{return!1}}function Ms(n,e,t){return t||e===n}function As(){try{return Nn.localStorage??null}catch{return null}}const Ls="nc-ui",Ns={breakpoint:{md:"768px"}},Cn={"label-on-fill-dark":"#1f2421","label-on-fill-light":"#FFFFFF"},Je={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},G={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},fe=n=>`--${Ls}-${n}`,Xe=Cn["label-on-fill-dark"],Dt=Cn["label-on-fill-light"],Cs=G["label-min-contrast"],Ps=/^#[0-9a-f]{6}$/i,_s=n=>typeof n=="string"&&Ps.test(n),Me=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function Ft(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=e*Math.min(t,1-t),a=o=>{const r=(o+n/30)%12;return t-i*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Me(a(0)*255)}${Me(a(8)*255)}${Me(a(4)*255)}`}function Pn(n){const[e,t,i]=[1,3,5].map(u=>parseInt(n.slice(u,u+2),16)/255),a=Math.max(e,t,i),o=Math.min(e,t,i),r=(a+o)/2,l=a-o;if(!l)return{h:0,s:0,l:r};const d=l/(1-Math.abs(2*r-1));return{h:((a===e?60*((t-i)/l%6):a===t?60*((i-e)/l+2):60*((e-t)/l+4))+360)%360,s:d,l:r}}function Ht(n){const[e,t,i]=[1,3,5].map(a=>{const o=parseInt(n.slice(a,a+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function Qe(n,e){const[t,i]=[Ht(n),Ht(e)].sort((a,o)=>o-a);return(t+.05)/(i+.05)}const Ne=n=>Qe(n,Xe)>=Qe(n,Dt)?Xe:Dt;function _n(n,e,t,i=Cs){let a=Ft(n,e,t);const o=Ne(a)===Xe?1:-1;for(let r=0;r<40&&Qe(a,Ne(a))<i;r++)t+=o*.01,a=Ft(n,e,t);return a}function Is(n){const{h:e,s:t}=Pn(n),i=_n(e,Math.min(t,G["surprise-on-max-saturation"]),G["surprise-on-lightness"]);return{fill:n,ink:Ne(n),on:i,onInk:Ne(i)}}const js=(n,e)=>{const t=Math.abs(n-e)%360;return Math.min(t,360-t)};function Rs(n,e=Math.random){const[t,i]=G["surprise-saturation"],[a,o]=G["surprise-lightness"],r=G["surprise-min-hue-gap"],l=_s(n)?Pn(n).h:null;let d=e()*360;return l!==null&&js(d,l)<r&&(d=(l+r+e()*(360-2*r))%360),_n(d,t+e()*(i-t),a+e()*(o-a))}function zs(n){if(!n)return null;const e=Is(n);return{[fe("surprise-fill")]:e.fill,[fe("surprise-ink")]:e.ink,[fe("surprise-on")]:e.on,[fe("surprise-on-ink")]:e.onInk}}const Os=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,Bs=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function Ut(n){const[e,t,i]=[1,3,5].map(l=>Os(parseInt(n.slice(l,l+2),16)/255)),a=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*i),r=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*i);return[.2104542553*a+.793617785*o-.0040720468*r,1.9779984951*a-2.428592205*o+.4505937099*r,.0259040371*a+.7827717662*o-.808675766*r]}function qs([n,e,t]){const i=(n+.3963377774*e+.2158037573*t)**3,a=(n-.1055613458*e-.0638541728*t)**3,o=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*i-3.3077115913*a+.2309699292*o,-1.2684380046*i+2.6097574011*a-.3413193965*o,-.0041960863*i-.7034186147*a+1.707614701*o].map(l=>Me(Bs(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const Ds=G["velocity-range"],In={min:Je.rhythm["velocity-min"],max:Je.rhythm["velocity-max"]};function Fs(n,e=In){const[t,i]=Ds,a=Number.isFinite(n)?Math.max(t,Math.min(i,n)):t,o=(a-t)/(i-t),r=Je.rhythm["step-cell-ink"];if(o<=0)return{velocity:a,t:0,fill:e.min.toUpperCase(),ink:r};if(o>=1)return{velocity:a,t:1,fill:e.max.toUpperCase(),ink:r};const l=Ut(e.min),d=Ut(e.max);return{velocity:a,t:o,fill:qs(l.map((c,u)=>c+(d[u]-c)*o)),ink:r}}function Gt(n,e=In){return{[fe("velocity-fill")]:Fs(n,e).fill}}const Hs=[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}],Us={renames:Hs},Gs={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","disabled-opacity":"opacity","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-button-min":"length","dialog-radius":"length","dialog-leading":"other"},Ks={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","probability-dim":"opacity","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","slider-block":"length","name-width":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","hack-weight":"other","label-leading":"other","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length","menu-item-min":"length"},Ws={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},_e={};for(const[n,e]of Object.entries(Gs))_e[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(const[n,e]of Object.entries(Ws))_e[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(const[n,e]of Object.entries(Ks))_e[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(Us.renames.map(n=>[n.old,n.new]));function jn(n){const e=_e[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function U(n){return jn(n).prop}function s(n){return`var(${U(n)})`}function Vs(n,e){if(!(n instanceof Element))return 0;const t=Number.parseFloat(getComputedStyle(n).getPropertyValue(U(e)));return Number.isFinite(t)?t:0}function B(n,e){const t=jn(e),i=n.ownerDocument??document,a=i.createElement("span");a.dataset.ncLive=e,a.style.position="absolute",a.style.pointerEvents="none";const o=`var(${t.prop})`;t.kind==="family"?a.style.fontFamily=o:t.kind==="opacity"?a.style.opacity=o:t.kind==="length"||t.kind==="other"||t.kind==="duration"?a.style.paddingLeft=o:a.style.color=o,(n instanceof Element?n:i.documentElement).append(a);const d=(i.defaultView??window).getComputedStyle(a),c=t.kind==="family"?d.fontFamily:t.kind==="color"?d.color:t.kind==="opacity"?d.opacity:d.paddingLeft;return a.remove(),c}function Ys(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function Js(n){const e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=s("font-ui"),t.style.fontSize=s("label-size"),t.style.fontWeight=s("label-weight"),(n instanceof Element?n:e.documentElement).append(t);const a=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),a}const Xs="[data-modulated], [data-modulated] *";function Qs(){const n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-fx[data-nc-depth="${i}"] {
      background: ${s(`module-bg-stack-${i}`)};
      ${U("text-sub")}: ${s(`module-sub-stack-${i}`)};
      ${U("divider")}: ${s(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${s(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${U("text-sub")}: ${s("module-sub-stack-1")};
      ${U("divider")}: ${s("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("body-size")};
  font-weight: ${s("title-weight")};
  line-height: ${s("rhythm.label-leading")};
}
button, input, select { font: inherit; color: inherit; }
.nc [hidden] { display: none !important; }
.nc-stack { display: flex; flex-direction: column; min-width: 0; }
.nc-module {
  background: ${s("module-bg-adjacent-1")};
  color: ${s("text")};
  padding: ${s("module-pad")};
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${s("font-ui")};
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
  gap: ${s("rhythm.header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("rhythm.head-margin")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${s("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${s("rhythm.header-gap")}; flex: none; }
.nc-index {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${s("rhythm.control-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: ${s("rhythm.label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${s("rhythm.module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${s("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-slim-lines {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${s("rhythm.module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${s("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${s("readout-size")};
  color: ${s("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${s("rhythm.name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${s("rhythm.name-width")} - ${s("rhythm.module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${s("rhythm.name-width")} - ${s("rhythm.module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${s("rhythm.name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${s("rhythm.module-gap")};
  row-gap: ${s("rhythm.control-gap")};
  padding-bottom: ${s("rhythm.module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${s("rhythm.name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${s("rhythm.control-gap")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("rhythm.label-leading")};
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
  bottom: calc(-1 * ${s("rhythm.control-gap")});
  width: max(100%, ${s("target-min")});
  height: max(100%, ${s("target-min")});
  transform: translateX(-50%);
}
.nc-tap:hover { border-color: ${s("text-sub")}; color: ${s("text")}; }
.nc-tap:active { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-tap:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${s("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${s("rhythm.slider-block")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${s("accent")};
}
.nc-range:disabled { opacity: ${s("disabled-opacity")}; cursor: not-allowed; }
.nc-range::-webkit-slider-runnable-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${s("hairline")};
  background: ${s("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  margin-top: calc(${s("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
${Xs} { transition: none; }
.nc-range:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("rhythm.control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${s("hairline")} solid ${s("text")};
  background: transparent;
  color: ${s("text")};
  padding: ${s("rhythm.button-pad-y")} 0;
  font-size: ${s("readout-size")};
  letter-spacing: ${s("rhythm.button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-btn:hover { background: ${s("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${s("accent")};
  border-color: ${s("accent")};
  color: ${s("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${s("focus-width-strong")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-btn:disabled { opacity: ${s("disabled-opacity")}; }
.nc-toggle {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${s("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${s("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${s("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${s("rhythm.track-solo")};
  border-bottom-color: ${s("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("rhythm.control-gap")};
}
.nc-seg {
  display: inline-flex;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  overflow: hidden;
  margin-bottom: ${s("rhythm.module-gap")};
}
.nc-seg > button {
  flex: 1 1 0;
  min-height: ${s("target-min")};
  min-width: ${s("target-min")};
  padding: 0 ${s("rhythm.header-gap")};
  border: 0;
  border-inline-end: ${s("hairline")} solid ${s("divider")};
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-seg > button:last-child { border-inline-end: 0; }
.nc-seg > button:hover { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"] { background: ${s("text")}; color: ${s("surface-page")}; }
.nc-seg > button:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: calc(${s("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  color: ${s("text")};
  font-size: ${s("body-size")};
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:focus-visible { outline: none; border-bottom-color: ${s("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${s("rhythm.module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${s("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${s("slot-size")};
  width: ${s("slot-size")};
  max-width: ${s("slot-size")};
  min-width: 0;
  height: ${s("slot-size")};
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
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("slot-font-size")};
  line-height: ${s("rhythm.label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${s("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${s("text-sub")};
  color: ${s("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${s("accent")};
  color: ${s("accent")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${s("accent")};
  outline: ${s("focus-width")} solid ${s("accent-faint")};
  outline-offset: ${s("hairline")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${s("accent")};
  background: ${s("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${s("rhythm.control-gap")};
  right: ${s("rhythm.control-gap")};
  width: ${s("rhythm.control-gap")};
  height: ${s("rhythm.control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${s("sparkle-size")};
  width: ${s("sparkle-size")};
  height: ${s("sparkle-size")};
  margin-inline: ${s("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${s("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${s("target-min")};
  width: ${s("target-min")};
  min-height: ${s("target-min")};
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surprise-fill")};
  color: ${s("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${s("target-min")} / 2); height: calc(${s("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${s("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle svg { width: ${s("sparkle-icon-size")}; height: ${s("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${s("text")}; }
.nc-sparkle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s("rhythm.header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${s("rhythm.name-width")};
  width: ${s("rhythm.name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${s("beat-gap")} - ${s("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${s("row-inset")});
  padding-inline: ${s("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${s("accent-tint")};
  box-shadow: inset ${s("marker-width")} 0 0 ${s("accent")};
}
.nc-row[data-selected="true"] .nc-name {
  color: ${s("text")};
  text-decoration: underline;
  text-decoration-color: ${s("accent")};
  text-decoration-thickness: ${s("hairline")};
  text-underline-offset: ${s("rhythm.control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]) { background: ${s("rhythm.step-cell-off")}; }
/* Muted, or silenced by another lane's solo: the lane's steps dim, not just its button. */
.nc-row[data-silent="true"] .nc-steps { opacity: ${s("rhythm.probability-dim")}; }
.nc-name[data-nc-lane="1"] { color: ${s("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${s("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${s("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${s("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${s("rhythm.slider-block")};
  height: ${s("rhythm.slider-block")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${s("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${s("rhythm.track-mute")};
  border-color: ${s("rhythm.track-mute")};
  color: ${s("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${s("rhythm.track-solo")};
  border-color: ${s("rhythm.track-solo")};
  color: ${s("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${s("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${s("rhythm.slider-block")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
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
  background: ${s("velocity-fill")};
  border-color: ${s("velocity-fill")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${s("rhythm.bar-accent")}; }
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { opacity: ${s("rhythm.probability-dim")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("rhythm.control-gap")};
  margin-inline: calc((${s("rhythm.control-gap")} + ${s("rhythm.step-gap")}) / -2);
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
  width: ${s("hairline")};
  height: ${s("target-min")};
  max-height: calc(${s("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${s("hairline")} solid ${s("text-sub")};
  background: ${s("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${s("text")}; border-color: ${s("text")}; }
.nc-len-handle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${s("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${s("accent")}; }
.nc-pad[data-out="true"] { opacity: ${s("rhythm.probability-dim")}; border-style: dashed; background: transparent; color: ${s("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${s("focus-width")} * 2) 0 0 ${s("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${s("focus-width")} * 2) 0 0 ${s("text")}, inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
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
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${s("rhythm.module-gap")};
  margin-bottom: ${s("rhythm.module-gap")};
}
.nc-step-tools > .nc-seg { margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${s("target-min")} / 3); height: calc(${s("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${s("rhythm.module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
.nc-fill[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${s("rhythm.module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${s("target-min")} * 1.25);
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${s("rhythm.control-gap")} ${s("rhythm.module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${s("velocity-fill")};
  border-color: ${s("velocity-fill")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] { opacity: ${s("rhythm.probability-dim")}; }
.nc-pad:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${s("playhead-width")};
  outline-offset: ${s("playhead-offset")};
}
.nc-fx {
  margin-inline: calc(${s("module-pad")} * -1);
  padding: ${s("stack-card-pad-y")} ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-fx-name {
  margin: 0 0 ${s("rhythm.module-gap")} 0;
  font-size: ${s("body-size")};
  font-weight: ${s("rhythm.hack-weight")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
  background: ${s("surface-page")};
  border-top: ${s("hairline")} solid ${s("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${s("rhythm.module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${s("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${s("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${s("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${s("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${s("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${s("rhythm.display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-knob {
  width: ${s("rhythm.knob-size")};
  height: ${s("rhythm.knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${s("rhythm.control-gap")};
  width: ${s("hairline")};
  height: ${s("rhythm.control-gap")};
  background: ${s("text")};
  transform-origin: center ${s("rhythm.module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("rhythm.control-gap")} ${s("rhythm.header-gap")};
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
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  padding: ${s("rhythm.control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${s("target-min")}; min-height: ${s("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
.nc-choice[aria-selected="true"] {
  color: ${s("text")};
  border-bottom-color: ${s("accent")};
}
.nc-choice:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${s("rhythm.control-gap")};
  min-width: ${s("rhythm.name-width")};
  padding: ${s("rhythm.control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${s("rhythm.menu-item-min")};
  border: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
@media (pointer: coarse) {
  .nc-menu-btn { min-height: ${s("target-min")}; }
  /* A 44 px touch band drawn at ASTRID's 20 px pitch: the extra height overlaps the gaps, not the rows. */
  .nc-field[data-nc-slider] .nc-range {
    height: ${s("target-min")};
    margin-block: calc((${s("rhythm.slider-block")} - ${s("target-min")}) / 2);
  }
  /* M and S: each a full 44 px box (the button paints smaller inside), touching, never overlapping. */
  .nc-ms-wrap { flex-basis: ${s("target-min")}; height: ${s("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${s("rhythm.module-gap")} * -1); }
  .nc-ms {
    inset: calc((${s("target-min")} - ${s("rhythm.slider-block")}) / 2);
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
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-hit {
  display: none;
  position: absolute;
  pointer-events: auto;
}
@media (pointer: coarse) {
  .nc-hit {
    display: block;
    left: 50%;
    top: 50%;
    width: ${s("target-min")};
    height: ${s("target-min")};
    transform: translate(-50%, -50%);
  }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${s("rhythm.module-gap")};
  width: calc(${s("rhythm.name-width")} * 6);
  max-width: calc(100vw - 2 * ${s("rhythm.module-gap")});
  padding: ${s("rhythm.module-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  opacity: 1;
  outline: ${s("focus-width")} solid ${s("text")};
  outline-offset: ${s("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${s("text")}; opacity: ${s("rhythm.probability-dim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${s("rhythm.module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${s("rhythm.module-gap")};
  min-height: ${s("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${s("rhythm.name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${s("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${s("rhythm.name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: 0;
  background: none;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${s("rhythm.module-gap")} + env(safe-area-inset-bottom));
  border-width: ${s("hairline")} 0 0;
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
  gap: ${s("toast-gap")};
  max-width: calc(100vw - 2 * ${s("toast-offset")});
  min-height: ${s("toast-target")};
  padding: 0 0 0 ${s("toast-pad-x")};
  border-radius: ${s("toast-radius")};
  background: ${s("toast-bg")};
  color: ${s("toast-text")};
  font-family: ${s("font-ui")};
  font-size: ${s("toast-font-size")};
  line-height: ${s("rhythm.label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${s("motion-fade")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${s("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${s("toast-offset")} + env(safe-area-inset-top)); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${s("motion-fade-out")};
}
.nc-ui-toast-message { overflow: hidden; text-overflow: ellipsis; }
.nc-ui-toast-action {
  min-width: ${s("toast-target")};
  min-height: ${s("toast-target")};
  padding: 0 ${s("toast-pad-x")};
  border: 0;
  background: none;
  color: ${s("toast-action")};
  font: inherit;
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${s("focus-width")} solid ${s("toast-action")};
  outline-offset: calc(-2 * ${s("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${s("hairline")};
  height: ${s("hairline")};
  overflow: hidden;
  clip-path: inset(50%);
  pointer-events: none;
  white-space: nowrap;
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
  background: ${s("accent")};
  font-family: ${s("font-ui")};
  pointer-events: none;
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${s("hairline")} solid ${s("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${s("rhythm.control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${s("target-min")};
  }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${s("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${s("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${s("rhythm.module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-fx {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    padding-inline: ${s("module-pad-x-desktop")};
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
    border-bottom: ${s("hairline")} solid ${s("divider")};
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
    gap: ${s("rhythm.module-gap")};
    padding-block: ${s("rhythm.control-gap")};
    background: ${s("surface-page")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${s("rhythm.module-gap")};
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
    max-width: ${s("slot-span")};
    height: ${s("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (max-width: 360px) {
  .nc-label, .nc-name, .nc-note, .nc-title { text-overflow: ellipsis; }
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"],
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"] {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${s("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
  }
}
`}let Fe=null;function Rn(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Fe&&Fe.ownerDocument===n))return;const e=n.createElement("style");e.dataset.ncKit="",e.textContent=Qs(),n.head.append(e),Fe=e}const zn={slop:8,longPressMs:500,pitchPx:16};class Zs{constructor(e,t,i=zn){this.hit=e,this.emit=t,this.config=i,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,i,a){if(this.phase!=="idle")return!1;const o=this.hit(t,i);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=i,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,i,a){if(e!==this.pointer)return;const o=t-this.x0,r=i-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(t,i);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,i,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,i,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function ea(n,e,t,i=zn){let a=!1,o=0;const r=(c,u)=>{const b=n.ownerDocument.elementFromPoint?.(c,u),y=[...n.querySelectorAll(e)],w=b?y.findIndex(g=>g===b||g.contains(b)):-1;if(w>=0)return w;let f=-1,h=Number.POSITIVE_INFINITY;return y.forEach((g,k)=>{if(g.hidden)return;const S=g.getBoundingClientRect();if(u<S.top||u>S.bottom)return;const T=Math.abs(c-(S.left+S.width/2));T<h&&T<=S.width&&(f=k,h=T)}),f},l=new Zs(r,c=>{(c.kind==="paint"||c.kind==="long")&&(a=!0),t(c)},i),d=()=>{o&&clearTimeout(o),o=0};return n.addEventListener("pointerdown",c=>{c.button>0||(a=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),n.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{a&&(a=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}const ta=G["toast-duration"];function na({message:n,actionLabel:e}){return e?`${n}, ${e}`:String(n)}function ia(n,e,t,i){const a=l=>({top:l,bottom:l+t}),o=l=>n.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),r=a(e-i-t);return o(r)?o(a(i))?"bottom":"top":"bottom"}function On(n,e,t,i,a,o){let r=n.bottom+a;const l=Math.max(o,Math.min(n.left,i-o-t.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(const u of e)u&&u.bottom>r&&u.top<r+t.height&&u.right>l&&u.left<l+t.width&&(r=u.bottom+a,d=!0)}return{top:r,left:l}}const Kt="data-nc-ui-toast-live";function sa(n,e){let t=e.querySelector(`[${Kt}]`);return t||(t=n.createElement("div"),t.setAttribute(Kt,""),t.setAttribute("aria-live","polite"),t.setAttribute("aria-atomic","true"),t.setAttribute("role","status"),t.className="nc-ui-toast-live",e.appendChild(t)),t}function aa({message:n,actionLabel:e,onAction:t,duration:i=ta,onClose:a,avoid:o=[],anchor:r,host:l,document:d=globalThis.document}={}){l=l??d.body;const c=d.defaultView??globalThis,u=d.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=n,u.appendChild(p);let b=null;e&&(b=d.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=e,u.appendChild(b)),l.appendChild(u);let y="open";const w=R=>R&&typeof R.getBoundingClientRect=="function"?R.getBoundingClientRect():null,f=w(u),h=f?.height||44,g=c.getComputedStyle?.(u),k=Number.parseFloat(g?.getPropertyValue(U("toast-offset")))||16,S=Number.parseFloat(g?.getPropertyValue(U("toast-anchor-gap")))||8,T=w(r),v=c.innerHeight??0,E=o.map(w).filter(Boolean),M=T&&T.bottom>0&&T.top<v?On(T,E,{width:f?.width||0,height:h},c.innerWidth??0,S,k):null;M&&M.top+h<=v?(u.setAttribute("data-placement","anchor"),u.style.top=`${M.top+(c.scrollY??0)}px`,u.style.left=`${M.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",ia(E,v,h,k));const L=c.requestAnimationFrame?.bind(c)??(R=>setTimeout(R,16));L(()=>L(()=>{y==="open"&&u.setAttribute("data-state","open")})),sa(d,l).textContent=na({message:n,actionLabel:e});let N,se;const he=new Promise(R=>{se=R}),ve=R=>{clearTimeout(N),N=setTimeout(()=>Oe("timeout"),R)};let ze=i,Nt=Date.now();const Ct=()=>{y==="open"&&(clearTimeout(N),ze=Math.max(0,ze-(Date.now()-Nt)))},Pt=()=>{y==="open"&&(Nt=Date.now(),ve(ze))};u.addEventListener("pointerenter",Ct),u.addEventListener("pointerleave",Pt),u.addEventListener("focusin",Ct),u.addEventListener("focusout",Pt),b?.addEventListener("click",()=>{if(y==="open")try{t?.()}finally{Oe("action")}}),Number.isFinite(i)&&ve(i);function Oe(R="close"){if(y!=="open")return;y="closing",clearTimeout(N),u.setAttribute("data-state","closing"),a?.(R);const _t=c.getComputedStyle?.(u),yi=_t?Math.max(0,...String(_t.transitionDuration||"").split(",").map(jt=>Number.parseFloat(jt)*(jt.trim().endsWith("ms")?1:1e3)||0)):0,It=()=>{y!=="gone"&&(y="gone",u.remove(),se(R))};u.addEventListener("transitionend",It),setTimeout(It,yi+50)}return{el:u,close:Oe,closed:he}}function Wt(n){return`${Math.round(Math.min(1,Math.max(0,Number(n)||0))*100)}%`}function oa({anchor:n,title:e,velocity:t,probability:i,onChange:a,onClose:o,host:r,document:l=globalThis.document}){r=r??l.body;const d=l.defaultView??globalThis,c={velocity:t,probability:i},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const b=l.createElement("div");b.className="nc-step-editor-head";const y=l.createElement("span");y.className="nc-label",y.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",b.append(y,w),p.appendChild(b);const f=[];for(const[T,v]of[["velocity","Velocity"],["probability","Chance"]]){const E=l.createElement("label");E.className="nc-step-editor-row";const M=l.createElement("span");M.className="nc-label",M.textContent=v;const L=l.createElement("input");L.type="range",L.className="nc-range",L.min=T==="velocity"?"0.05":"0",L.max="1",L.step="0.05",L.value=String(c[T]),L.setAttribute("data-nc-edit",T);const N=l.createElement("output");N.className="nc-readout",N.textContent=Wt(c[T]),L.setAttribute("aria-valuetext",N.textContent),L.addEventListener("input",()=>{c[T]=Number(L.value),N.textContent=Wt(c[T]),L.setAttribute("aria-valuetext",N.textContent),a({velocity:c.velocity,probability:c.probability})}),E.append(M,L,N),p.appendChild(E),f.push(L)}if(r.append(u,p),n?.setAttribute?.("data-editing","true"),d.matchMedia?.(`(max-width: ${Ns.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const T=n?.getBoundingClientRect?.(),v=p.getBoundingClientRect(),E=Number.parseFloat(d.getComputedStyle(p).getPropertyValue("row-gap"))||8;if(T){let{top:M,left:L}=On(T,[],{width:v.width,height:v.height},d.innerWidth,E,E);M+v.height>d.innerHeight&&(M=Math.max(E,T.top-E-v.height)),p.style.top=`${M}px`,p.style.left=`${L}px`}p.setAttribute("data-placement","anchor")}f[0]?.focus({preventScroll:!0});let g=!0;const k=T=>{T.key==="Escape"&&(T.preventDefault(),S())};function S(){g&&(g=!1,l.removeEventListener("keydown",k,!0),u.remove(),p.remove(),n?.removeAttribute?.("data-editing"),n?.isConnected&&typeof n.focus=="function"&&n.focus({preventScroll:!0}),o?.())}return l.addEventListener("keydown",k,!0),u.addEventListener("pointerdown",T=>{T.preventDefault(),S()}),w.addEventListener("click",S),{el:p,close:S}}function ra(n){const e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,a=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i));(n.width!==a||n.height!==o)&&(n.width=a,n.height=o);const r=n.getContext("2d");return r?.setTransform(i,0,0,i,0,0),{ctx:r,w:e,h:t}}function He(n){return Math.max(0,Math.min(1,n))}function Bn(n,e){const{ctx:t,w:i,h:a}=ra(n);if(!t)return;t.clearRect(0,0,i,a);const o=Js(n);if(e.paint==="swatch"){const d=B(n,"accent"),c=B(n,"rhythm.step-cell-on");n.dataset.ncAccent=d,n.dataset.ncStep=c,t.fillStyle=d,t.fillRect(0,0,i/2,a),t.fillStyle=c,t.fillRect(i/2,0,i/2,a);return}if(e.paint==="filter"){const d=e.mode??"lp",c=B(n,Ys(d)),u=B(n,"divider"),p=He(e.cutoff??.5),b=.08+(1-He(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,a*.72),t.lineTo(i,a*.72),t.stroke(),t.beginPath();for(let y=0;y<=i;y++){const w=y/Math.max(1,i);let f=0;d==="lp"?f=w<p?1:Math.max(0,1-(w-p)/b):d==="hp"?f=w>p?1:Math.max(0,1-(p-w)/b):f=Math.max(0,1-Math.abs(w-p)/b);const h=a*.78-f*a*.62;y===0?t.moveTo(y,h):t.lineTo(y,h)}t.strokeStyle=c,t.stroke(),t.fillStyle=B(n,"text-sub"),t.font=o,t.fillText(d.toUpperCase(),0,a),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=B(n,"accent"),t.beginPath();const d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){const u=c/Math.max(1,i),p=(a-4)*(1-Math.exp(-u*4/d));t.lineTo(c,a-p)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){const d=He(e.level??0);t.fillStyle=B(n,"divider"),t.fillRect(0,a*.4,i,a*.2),t.fillStyle=B(n,"accent"),t.fillRect(0,a*.4,i*d,a*.2),n.dataset.ncAccent=t.fillStyle;return}const r=Math.max(1,e.steps??16),l=((e.step??0)%r+r)%r;t.fillStyle=B(n,"rhythm.step-cell-off"),t.fillRect(0,a*.45,i,a*.1),t.fillStyle=B(n,"rhythm.playhead"),t.fillRect(l/r*i,a*.3,Math.max(1,i/r),a*.4),n.dataset.ncAccent=B(n,"accent")}function j(){const n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function Ie(n,e){const t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;const i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;const a=document.createElement("span");return a.className="nc-readout",a.dataset.ncReadout="",t.append(i,a),t}function Vt(n,e){const t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function Ze(n){if(!Number.isFinite(n))return"";const e=Math.round(n*100)/100;return String(e)}const la=450,Yt=8;function X(){const n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function ca(n){const e=Vs(n,"target-min");return e>0?e:44}function da(n){if(!(n instanceof HTMLElement))return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=[...n.querySelectorAll(".nc-hit")];if(!e)return;const i=ca(n),a=i/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){const l=t[r],d=o[r];if(!(l instanceof HTMLElement)||!d||d.width===0||d.height===0)continue;if(d.width>=i&&d.height>=i){l.style.display="none";continue}const c=d.left+d.width/2,u=d.top+d.height/2;let p=c-a,b=c+a,y=u-a,w=u+a;for(let f=0;f<t.length;f++){if(r===f)continue;const h=o[f];if(!h||h.width===0)continue;const g=h.left+h.width/2,k=h.top+h.height/2;Math.abs(k-u)<a*2&&(g>c?b=Math.min(b,(c+g)/2):g<c&&(p=Math.max(p,(c+g)/2))),Math.abs(g-c)<a*2&&(k>u?w=Math.min(w,(u+k)/2):k<u&&(y=Math.max(y,(u+k)/2)))}p=Math.min(p,d.left),b=Math.max(b,d.right),y=Math.min(y,d.top),w=Math.max(w,d.bottom),l.style.left=`${p-d.left}px`,l.style.top=`${y-d.top}px`,l.style.width=`${Math.max(0,b-p)}px`,l.style.height=`${Math.max(0,w-y)}px`,l.style.transform="none"}}function qn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Jt(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Dn(n,e){switch(n.type){case"slider":return ua(n,e);case"select":return pa(n,e);case"toggle":return ma(n,e);case"button":return fa(n,e);case"readout":return ga(n);case"label":return ba(n);case"note":return Xt(n);case"knob":return va(n,e);case"choice":return $a(n,e);case"slotRow":return xa(n,e);case"stepGrid":return Ma(n,e);case"canvas":return Na(n);case"fx":return Ca(n,e);default:return Xt({id:"unknown",text:""})}}function ne(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){const t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,Fn(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));const a=n.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Ze(e.value))}else if(e.type==="select"){const t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),Vt(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){const t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")Vt(n,e.text);else if(e.type==="knob"){const t=n.querySelector(".nc-knob");t instanceof HTMLElement&&wa(t,e);const i=n.querySelector("[data-nc-readout]");i&&(i.textContent=Ze(e.value))}else if(e.type==="choice")Hn(n,e);else if(e.type==="slotRow")Gn(n,e);else if(e.type==="stepGrid")et(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){const t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&Bn(t,e)}else if(e.type==="fx")for(const t of e.controls){const i=n.querySelector(`[data-nc-id="${Pa(t.id)}"]`);i instanceof Element&&ne(i,t)}}}function ua(n,e){const t=Ie(n.id,n.label);t.dataset.ncSlider="";const i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{const o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{const o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});const a=t.querySelector("[data-nc-readout]");return t.insertBefore(i,a),n.onTap&&t.insertBefore(ha(n,i,e),a),t.append(j()),ne(t,n),t}function ha(n,e,t){const i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(X());const a=o=>{const r=t(e);r?.type==="slider"&&r.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&a(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),a(o.timeStamp))}),i}function pa(n,e){const t=Ie(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(const a of n.options){const o=document.createElement("option");o.value=a.value,o.textContent=a.label,i.append(o)}return i.value=n.value,i.addEventListener("change",()=>{const a=e(i);a?.type==="select"&&a.onChange(i.value)}),t.append(i,j()),t}function ma(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{const i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(j()),ne(t,n),t}function fa(n,e){const t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{const o=e(t);o?.type==="button"&&o.onPress()}),t.append(j()),ne(t,n),!n.onSparkle)return t;const i=document.createElement("div");i.className="nc-play-row";const a=document.createElement("button");return a.type="button",a.className="nc-sparkle-btn",a.dataset.ncSparkle=n.id,a.setAttribute("aria-label","Surprise me"),a.title=n.sparkleTitle??"Surprise me",a.innerHTML=qn(),a.addEventListener("click",()=>{const o=t.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Kn(o);const r=e(t);r?.type==="button"&&r.onSparkle?.()}),i.append(t,a),i}function ga(n){const e=Ie(n.id,n.label);return e.append(j()),ne(e,n),e}function ba(n){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(j()),e}function Xt(n){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(j()),e}function ya(n){const e=Ze(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function Fn(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function wa(n,e){const t=e.max-e.min||1,i=(e.value-e.min)/t;Fn(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",ya(e)),n.setAttribute("aria-label",e.label)}function ka(n,e){const t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,a=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+a:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-a:null}function va(n,e){const t=Ie(n.id,n.label),i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;const a=document.createElement("i");a.className="nc-knob-mark",i.append(a);let o=0,r=0;i.addEventListener("pointerdown",d=>{o=d.clientY;const c=e(i);r=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;const c=e(i);if(c?.type!=="knob")return;const u=c.max-c.min||1,p=Math.min(c.max,Math.max(c.min,r-(d.clientY-o)*u/120));c.onChange(p)}),i.addEventListener("keydown",d=>{const c=e(i);if(c?.type!=="knob")return;const u=ka(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});const l=t.querySelector("[data-nc-readout]");return t.insertBefore(i,l),t.append(j()),ne(t,n),t}function $a(n,e){const t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(const i of n.options){const a=document.createElement("button");a.type="button",a.className="nc-choice",a.dataset.ncChoice=i.value,a.setAttribute("role","tab"),a.textContent=i.label,a.addEventListener("click",()=>{const o=e(t);o?.type==="choice"&&o.onChange(i.value)}),a.addEventListener("keydown",o=>{const r=[...t.querySelectorAll("[data-nc-choice]")],l=r.indexOf(a);let d=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")d=(l+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")d=(l-1+r.length)%r.length;else if(o.key==="Home")d=0;else if(o.key==="End")d=r.length-1;else return;const c=r[d];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),t.append(a)}return t.append(j()),Hn(t,n),t}function Hn(n,e){for(const t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;const i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function xa(n,e){const t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){const p=n.slots[u],b=document.createElement("span");b.className="nc-snap-wrap";const y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(u),y.textContent=p.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(y,X()),Sa(b,y,t,u,e),i.append(b)}const a=n.onSparkle?document.createElement("button"):null;a&&(a.type="button",a.className="nc-sparkle",a.setAttribute("aria-label","Surprise me"),a.innerHTML=qn(),a.append(X()),a.addEventListener("click",()=>{Kn(t);const u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));const o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";const r=document.createElement("span");r.className="nc-label",r.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",o.append(r,d,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...a?[a]:[]),t.append(c,o,j()),Un(t,e),Gn(t,n),t}function Qt(n,e,t,i){const a=t(n);if(a?.type!=="slotRow")return;ge(n);const o=i.shiftKey?"store":i.altKey?"clear":"recall";a.onSlot(e,o)}function Sa(n,e,t,i,a){let o=0,r=0,l=0,d=!1,c=!1,u=!1,p=!1;const b=()=>{window.clearTimeout(o),o=0},y=g=>{const k=g.clientX-r,S=g.clientY-l;k*k+S*S>Yt*Yt&&(d=!0,b())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",h))},f=g=>{const k=o!==0&&!d&&!c;b(),w(),k&&(u=!0,Qt(t,i,a,g))},h=()=>{d=!0,b(),w()};n.addEventListener("pointerdown",g=>{g.button===0&&(w(),c=!1,d=!1,u=!1,r=g.clientX,l=g.clientY,b(),o=window.setTimeout(()=>{o=0,!d&&(c=!0,Ta(t,e,i,a))},la),p=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",f),window.addEventListener("pointercancel",h))}),n.addEventListener("contextmenu",g=>g.preventDefault()),n.addEventListener("click",g=>{if(u||c||d){u=!1,c=!1,d=!1;return}Qt(t,i,a,g)})}function Un(n,e){if(n.querySelector(".nc-slot-menu"))return;const t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");const i=Zt("Save","store"),a=Zt("Clear","clear");t.append(i,a);const o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),ge(n)}),o.addEventListener("click",r=>r.stopPropagation()),n.append(o,t),t.addEventListener("click",r=>{const l=r.target;if(!(l instanceof HTMLButtonElement))return;const d=e(n);if(d?.type!=="slotRow")return;const c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),ge(n)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),ge(n))}),n.addEventListener("keydown",r=>{r.key==="Escape"&&ge(n)})}function Zt(n,e){const t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Ta(n,e,t,i){Un(n,i);const a=n.querySelector(".nc-slot-menu");if(!(a instanceof HTMLElement))return;const o=n.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),a.hidden=!1,a.dataset.ncIndex=String(t);const r=n.getBoundingClientRect(),l=e.getBoundingClientRect();a.style.left=`${l.left-r.left}px`,a.style.top=`${l.bottom-r.top}px`,a.querySelector("button")?.focus()}function ge(n){const e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function Gn(n,e){for(const a of n.querySelectorAll("[data-nc-slot]")){if(!(a instanceof HTMLButtonElement))continue;const o=Number(a.dataset.ncSlot),r=e.slots[o];if(!r)continue;a.textContent=r.label,r.filled?a.dataset.filled="true":delete a.dataset.filled,r.active?a.dataset.active="true":delete a.dataset.active,r.edited?a.dataset.edited="true":delete a.dataset.edited,r.queued?a.dataset.queued="true":delete a.dataset.queued,r.queued&&r.pulse?a.dataset.pulse="true":delete a.dataset.pulse;const l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];a.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}const t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));const i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Kn(n){const e=n.dataset.ncLastFill||null,t=Rs(e);n.dataset.ncLastFill=t;const i=zs(t);if(i)for(const[a,o]of Object.entries(i))n.style.setProperty(a,o)}function Ea(n,e){const t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1;const a=o=>{if(i===o)return;i=o,t.setAttribute("aria-pressed",o?"true":"false");const r=e(n);r?.type==="stepGrid"&&r.onFill?.(o)};t.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),t.setPointerCapture?.(o.pointerId),a(!0))});for(const o of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(o,()=>a(!1));return t.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||a(!0))}),t.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),a(!1))}),t.addEventListener("contextmenu",o=>o.preventDefault()),t}function Ma(n,e){const t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;const i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");const a=h=>{const g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=h,i.append(g),g},o=a("Note"),r=a("Accent");r.dataset.ncAccentMode="";const l=h=>{for(const g of[o,r]){const k=g===h;g.setAttribute("aria-checked",k?"true":"false"),g.tabIndex=k?0:-1}};l(o);for(const h of[o,r])h.addEventListener("click",()=>l(h));i.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const g=r.getAttribute("aria-checked")==="true"?o:r;l(g),g.focus()});const d=document.createElement("div");d.className="nc-step-tools",d.append(i),n.onFill&&d.append(Ea(t,e)),t.append(d);for(const h of n.rows){const g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";const k=document.createElement("button");k.type="button",k.className="nc-name",k.textContent=h.label,k.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(k.dataset.ncLane=String((h.lane-1)%4+1)),k.addEventListener("click",()=>{const v=e(t);if(v?.type!=="stepGrid")return;const E=v.rows.findIndex(M=>M.id===h.id);v.onSelectRow?.(E)}),k.addEventListener("keydown",v=>Aa(t,k,v));const S=[];for(const v of["mute","solo"]){if(!(v==="mute"?n.onMute:n.onSolo))continue;const M=document.createElement("span");M.className="nc-ms-wrap";const L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=v,L.textContent=v==="mute"?"M":"S",L.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${h.label}`),M.append(L,X()),M.addEventListener("click",()=>{const N=e(t);if(N?.type!=="stepGrid")return;const se=N.rows.findIndex(he=>he.id===h.id);(v==="mute"?N.onMute:N.onSolo)?.(se)}),S.push(M)}const T=document.createElement("div");T.className="nc-steps";for(let v=0;v<h.steps.length;v++){const E=document.createElement("span");E.className="nc-step-wrap";const M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${h.id}:${v}`,M.setAttribute("aria-label",`${h.label} step ${v+1}`),E.append(M,X()),E.addEventListener("click",L=>{const N=e(t);if(N?.type!=="stepGrid")return;const se=N.rows.findIndex(ve=>ve.id===h.id),he=r.getAttribute("aria-checked")==="true";N.onToggle(se,v,L.shiftKey||he)}),T.append(E)}if(n.onLength&&T.append(La(t,T,h,e)),g.append(...S,k,T),n.onDice){const v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=h.id,v.setAttribute("aria-label",`Re-roll ${h.label}`),v.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=Jt(),v.append(X()),v.addEventListener("click",()=>{const E=e(t);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===h.id))}),g.append(v)}g.addEventListener("click",v=>{if(v.target!==g)return;const E=e(t);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===h.id))}),en(t,T,".nc-step-wrap",e,r,()=>h.id),t.append(g)}const c=document.createElement("div");c.className="nc-pads-head";const u=(h,g,k)=>{const S=document.createElement("button");return S.type="button",S.className=h,S.textContent=g,k&&S.setAttribute("aria-label",k),S},p=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),y=document.createElement(n.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),n.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{const h=e(t);h?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",et(t,h))}));for(const[h,g]of[[p,-1],[b,1]])h.addEventListener("click",()=>{const k=e(t);if(k?.type!=="stepGrid"||k.rows.length===0)return;const S=k.rows.length;k.onSelectRow?.(((xe(k)+g)%S+S)%S)});if(c.append(p,y,b),n.onDice){const h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Jt(),h.addEventListener("click",()=>{const g=e(t);if(g?.type!=="stepGrid")return;const k=xe(g);k>=0&&g.onDice?.(k)}),c.append(h)}if(n.transport){const h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const g=e(t);g?.type==="stepGrid"&&g.transport?.onToggle()}),c.append(h)}t.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const f=Math.max(0,...n.rows.map(h=>h.steps.length));for(let h=0;h<f;h++){const g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(h),g.textContent=String(h+1),g.addEventListener("click",k=>{const S=e(t);if(S?.type!=="stepGrid")return;const T=xe(S);if(T<0)return;if(t.dataset.ncLenMode==="true"){S.onLength?.(T,h+1);return}const v=r.getAttribute("aria-checked")==="true";S.onToggle(T,h,k.shiftKey||v)}),w.append(g)}return en(t,w,".nc-pad",e,r,()=>{const h=e(t);return h?.type==="stepGrid"?h.rows[xe(h)]?.id:void 0}),t.append(w),t.append(j()),et(t,n),t}function xe(n){const e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function en(n,e,t,i,a,o){let r="on",l=!0,d=-1;const c=(u,p)=>{const b=u.rows[d]?.steps[p];!b||p>=u.rows[d].length||(u.onSet?u.onSet(d,p,r,l):!!b[r]!==l&&u.onToggle(d,p,r==="accent"))};ea(e,t,u=>{const p=i(n);if(p?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const b=p.rows.findIndex(y=>y.id===o());b>=0&&p.rows[b].length!==u.pad+1&&p.onLength?.(b,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const b=o();d=p.rows.findIndex(w=>w.id===b);const y=p.rows[d]?.steps[u.pad];if(!y)return;r=a.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[r]}c(p,u.pad)}else if(u.kind==="long"){const b=o(),y=p.rows.findIndex(f=>f.id===b),w=e.querySelectorAll(t)[u.pad];y>=0&&w instanceof HTMLElement&&p.onLongPress?.(y,u.pad,w)}}})}function Aa(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;const i=[...n.querySelectorAll(".nc-name")],a=i.indexOf(e);let o=a;t.key==="ArrowDown"?o=a+1:t.key==="ArrowUp"?o=a-1:t.key==="Home"?o=0:o=i.length-1;const r=i[o];!(r instanceof HTMLElement)||r===e||(t.preventDefault(),r.focus(),r.click())}function La(n,e,t,i){const a=document.createElement("button");a.type="button",a.className="nc-len-handle",a.dataset.ncLen=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-valuemin","1"),a.setAttribute("aria-valuemax",String(t.steps.length)),a.append(X());const o=c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.findIndex(w=>w.id===t.id),b=u.rows[p];if(!b)return;const y=Math.max(1,Math.min(b.steps.length,c));y!==b.length&&u.onLength?.(p,y)},r=c=>{const u=[...e.querySelectorAll(".nc-step")];let p=1;return u.forEach((b,y)=>{const w=b.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(p=y+1)}),p},l=c=>o(r(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete a.dataset.dragging};return a.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),a.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),a.addEventListener("keydown",c=>{const u=i(n);if(u?.type!=="stepGrid")return;const p=u.rows.find(y=>y.id===t.id);if(!p)return;const b={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in b&&(c.preventDefault(),o(b[c.key]))}),a}const Ue=new WeakMap;function tn(n,e){const t=typeof e=="number"?e:null;if(!(Ue.has(n)&&Ue.get(n)===t)){if(Ue.set(n,t),t===null){for(const i of Object.keys(Gt(1)))n.style.removeProperty(i);return}for(const[i,a]of Object.entries(Gt(t)))n.style.setProperty(i,a)}}function et(n,e){const t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),a=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=n.querySelector(".nc-pads-label"),r=n.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&a&&(o.textContent=r?`${a.label} · ${a.length}`:a.label,e.onLength&&(o.setAttribute("aria-pressed",r?"true":"false"),o.setAttribute("aria-label",r?`${a.label} length ${a.length} steps: tap or drag the pads to set the end, tap here when done`:`${a.label}, ${a.length} steps: tap to set the length`)));const l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&a&&(l.setAttribute("aria-label",`Re-roll ${a.label}`),l.title=`Re-roll ${a.label}: new steps for this lane (Undo takes it back)`);const d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){const c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");const p=e.transport?.ariaLabel;p?d.setAttribute("aria-label",p):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&a){i.setAttribute("aria-label",`${a.label} steps`),a.lane&&(i.dataset.ncLane=String((a.lane-1)%4+1)),a.mute||t&&!a.solo?i.dataset.silent="true":delete i.dataset.silent;const c=a.length>0?(e.playhead%a.length+a.length)%a.length:-1;for(const u of i.querySelectorAll("[data-nc-pad]")){const p=Number(u.getAttribute("data-nc-pad")),b=a.steps[p];u instanceof HTMLButtonElement&&(u.hidden=!b||!r&&p>=a.length,r&&p>=a.length?u.dataset.out="true":delete u.dataset.out,r&&p===a.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${a.label} step ${p+1}`),u.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?u.dataset.accent="true":delete u.dataset.accent,b?.dim?u.dataset.dim="true":delete u.dataset.dim,tn(u,b?.velocity),e.playhead>=0&&p===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(const c of e.rows){for(let y=0;y<c.steps.length;y++){const w=c.steps[y],f=n.querySelector(`[data-nc-step="${c.id}:${y}"]`);if(!(f instanceof HTMLButtonElement))continue;const h=f.closest(".nc-row");if(h instanceof HTMLElement){e.selectedRow===c.id?h.dataset.selected="true":delete h.dataset.selected;const S=h.querySelector(".nc-name");S instanceof HTMLElement&&S.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?h.dataset.silent="true":delete h.dataset.silent;for(const v of h.querySelectorAll("[data-nc-ms]")){const E=v.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;v.setAttribute("aria-pressed",E?"true":"false")}}f.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?f.dataset.accent="true":delete f.dataset.accent,w.dim?f.dataset.dim="true":delete f.dataset.dim,y%4===0?f.dataset.bar="true":delete f.dataset.bar,typeof w.velocity=="number"?(f.dataset.velocity="true",f.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete f.dataset.velocity,f.style.removeProperty("--level")),tn(f,w.velocity);const g=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;y===g?f.dataset.playhead="true":delete f.dataset.playhead;const k=!!e.onLength&&e.selectedRow===c.id;f.hidden=y>=c.length&&!k,y>=c.length&&k?f.dataset.out="true":delete f.dataset.out}const u=n.querySelector(`[data-nc-len="${c.id}"]`),b=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&b&&b.nextElementSibling!==u){const y=document.activeElement===u;b.after(u),y&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Na(n){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;const t=document.createElement("span");t.className="nc-label",t.textContent=n.label;const i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,j()),e}function Ca(n,e){const t=document.createElement("div");t.className="nc-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);const i=document.createElement("h3");i.className="nc-fx-name",i.textContent=n.title,t.append(i);for(const a of n.controls)t.append(Dn(a,e));return t.append(j()),t}function Pa(n){return n.replace(/["\\]/g,"\\$&")}function _a(n,e){for(const t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;const i=e.find(a=>a.type==="canvas"&&a.id===t.dataset.ncId);i?.type==="canvas"&&Bn(t,i)}da(n)}const pt="netcomposer.rhythm.hidden.v1",V=new WeakMap;function Ge(){try{return globalThis.localStorage??null}catch{return null}}function Wn(n,e=pt){try{const t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function nn(n,e,t,i=pt){const a=Wn(n,i);t?a.add(e):a.delete(e);try{n?.setItem(i,JSON.stringify([...a]))}catch{}}function mt(n){const e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(const i of e)t.push(i),i.type==="fx"&&t.push(...i.controls);return t}function Ia(n,e){if(!(!n||!e))return mt(n).find(t=>t.id===e)}function ja(n){return`${(n.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}`).join(",")}#${mt(n).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(i=>`${i.id}/${i.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(i=>i.value).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.controls.map(i=>i.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Ra(n,e){if(!e.title)return;if(!e.panel){const o=document.createElement("h3");o.className="nc-fx-name",o.textContent=e.title,n.append(o);return}const t=document.createElement("div");t.className="nc-panel-hd";const i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;const a=document.createElement("span");a.className="nc-panel-subject",a.dataset.ncPanelSubject="",t.append(i,a),n.append(t),Vn(n,e)}function Vn(n,e){if(!e.panel)return;const t=[...n.children].find(o=>o.classList.contains("nc-panel-hd")),i=t?.querySelector(".nc-panel-title"),a=t?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),a&&(a.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function za(n){const e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const t=V.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ia(t,i)}function Oa(n,e){const t=e.sections??[{id:"main",controls:e.controls??[]}],i=ja(e);if(n.dataset.ncSignature===i){for(const a of t){const o=n.querySelector(`[data-nc-section="${sn(a.id)}"]`);o&&Vn(o,a);for(const r of a.controls){const l=n.querySelector(`[data-nc-id="${sn(r.id)}"]`);l instanceof Element&&ne(l,r)}}return}n.dataset.ncSignature=i,n.replaceChildren();for(const a of t){const o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=a.id,a.inset&&(o.dataset.ncInset="true"),a.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),a.title&&o.setAttribute("aria-label",a.title)),Ra(o,a);const r=a.panel?document.createElement("div"):o;a.panel&&(r.className="nc-panel-body",o.append(r));for(const l of a.controls)r.append(Dn(l,za));n.append(o)}}function sn(n){return n.replace(/["\\]/g,"\\$&")}function ft(n,e=pt){Rn();const t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead="");const i=Wn(Ge(),e).has(n.id),a=document.createElement("header");a.className="nc-module-hd",a.dataset.ncRow="";const o=document.createElement("h2");o.className="nc-title",o.id=`${n.id}-title`;const r=document.createElement("span");r.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="",r.append(l,d);const c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",a.append(o,c,r);const u=document.createElement("div");u.className="nc-module-body",u.id=`${n.id}-body`;const p=document.createElement("button");p.type="button",p.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",p.append(b);const y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",t.append(y,a,u,p),t.setAttribute("aria-labelledby",o.id);const w=h=>{const g=V.get(t)??n;t.dataset.ncOpen=h?"false":"true",u.hidden=h,p.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${g.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{const h=t.dataset.ncOpen==="true";nn(Ge(),(V.get(t)??n).id,h,e),w(h),tt(t.parentElement)}),p.addEventListener("click",()=>{nn(Ge(),(V.get(t)??n).id,!1,e),w(!1),tt(t.parentElement)});const f={el:t,update(h){V.set(t,h),o.textContent=h.title,c.textContent=h.status??"",h.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),b.textContent=h.summary??h.title,p.setAttribute("aria-label",`Show ${h.title}`),Oa(u,h),w(u.hidden),f.redraw()},redraw(){const h=V.get(t);h&&_a(t,mt(h))}};return V.set(t,n),w(i),f.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>f.redraw()).observe(t),f}function Ba(n,e,t="adjacent"){Rn(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();const i=t==="stack"?"stack":"adjacent";e.forEach((a,o)=>{const r=o%4+1;a.el.dataset.ncShade=String(r),a.el.dataset.ncPlace=i;const l=a.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),n.append(a.el),a.redraw()}),tt(n)}function tt(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}const e=[...n.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),t=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?s("module-slim-column"):t?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",i.join(" "));const a=e.filter(o=>!o.hasAttribute("data-nc-slim"));t&&e.length===4&&a.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function Yn(){return new Promise(n=>{if(typeof requestAnimationFrame!="function"){setTimeout(n,0);return}requestAnimationFrame(()=>setTimeout(n,0))})}function qa(n=200){return new Promise(e=>{const t=globalThis.requestIdleCallback;typeof t=="function"?t(()=>e(),{timeout:n}):setTimeout(e,0)})}function Da(n,e={}){const t=new Set,i=(async()=>{await Yn();for(const a of n)await qa(e.timeoutMs??200),a.build(),t.add(a)})();return{ready:a=>t.has(a),done:i,toJSON:()=>({built:t.size,total:n.length})}}function gt(){const n=globalThis.scheduler;return typeof n?.yield=="function"?n.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const t=new MessageChannel;t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(null)})}const Jn="petra-rhythm.state",Xn=1,Fa=400,Ha=2e3;function Ua(n){return JSON.stringify({v:Xn,doc:n.doc,bank:n.bank,selectedTrack:n.selectedTrack})}function Ga(n,e){if(!e||typeof e!="object")return!1;const{swing:t,fx:i,tracks:a}=e;return Le({...n,swing:t,fx:i,tracks:a}).ok}function Ka(n){if(!n)return null;let e;try{e=JSON.parse(n)}catch{return null}if(!e||e.v!==Xn)return null;const t=Le(e.doc);if(!t.ok||!t.document)return null;const i=t.document,a=e.bank;if(!a||!Array.isArray(a.slots)||a.slots.length!==F)return null;const o=a.slots.map(c=>c===null?null:c);if(!o.every(c=>c===null||Ga(i,c)))return null;const r=Number.isInteger(a.active)&&o[a.active]?a.active:null,l=e.selectedTrack,d=Number.isInteger(l)&&l>=0&&l<i.tracks.length?l:0;return{doc:i,bank:{slots:o,active:r},selectedTrack:d}}function Wa(n,e,t=Fa){let i,a=0,o="";const r=()=>{clearTimeout(i),i=void 0,a=0;try{const l=Ua(e());if(l===o)return;n.setItem(Jn,l),o=l}catch{}};return{schedule(){const l=Date.now();a||(a=l),clearTimeout(i),i=setTimeout(r,Math.min(t,Math.max(0,a+Ha-l)))},flush:r}}function Va(n,e){if(new URLSearchParams(e).has("fresh"))return null;try{return Ka(n.getItem(Jn))}catch{return null}}const Ke={maker:"PETRA",instrument:"RHYTHM",number:"01"},bt="PETRA Rhythm";let an=!1;function Ya(){return`
.petra-head {
  padding: ${s("module-pad")};
  border-bottom: ${s("hairline")} solid ${s("divider")};
}
.petra-head-name {
  margin: 0;
  font-size: ${s("rhythm.brand-size")};
  font-weight: ${s("rhythm.brand-weight")};
  letter-spacing: ${s("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${s("text-sub")}; }
.petra-head-num { font-family: ${s("font-readout")}; }
.petra-head-line {
  margin: ${s("rhythm.brand-sub-gap")} 0 0;
  font-size: ${s("rhythm.brand-sub-size")};
  color: ${s("text-sub")};
}
@media (min-width: 1024px) {
  .petra-head { padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")}; }
}
/* The ⋯ menu (Bass's header menu): Save, Load, New. Phone: a 44 px ⋯ that opens a small panel.
   Desktop: the buttons sit inline in the header and the ⋯ hides. */
.petra-head { position: relative; display: flex; align-items: flex-start; gap: ${s("rhythm.module-gap")}; }
.petra-head-title { flex: 1 1 auto; min-width: 0; }
.petra-menu > summary {
  list-style: none;
  display: grid;
  place-items: center;
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  color: ${s("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${s("target-min")} / 2.75); height: calc(${s("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: ${s("module-pad")};
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${s("rhythm.control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
}
.petra-menu-body button {
  min-height: ${s("target-min")};
  padding: 0 ${s("module-pad")};
  border: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${s("text-sub")}; padding: 0 ${s("rhythm.module-gap")}; }
  .petra-menu-body button:hover { color: ${s("text")}; }
}
`}function Ja(n){const e=n.ownerDocument;if(!an){const d=e.createElement("style");d.dataset.petraHead="",d.textContent=Ya(),e.head.append(d),an=!0}const t=e.createElement("header");t.className="petra-head";const i=e.createElement("h1");i.className="petra-head-name";const a=()=>{const d=e.createElement("span");return d.className="petra-head-sep",d.textContent="/",d},o=e.createElement("span");o.className="petra-head-num",o.textContent=Ke.number,i.append(`${Ke.maker} `,a(),` ${Ke.instrument} `,a()," ",o);const r=e.createElement("p");r.className="petra-head-line",r.textContent="A NetComposer element.";const l=e.createElement("div");return l.className="petra-head-title",l.append(i,r),t.append(l),n.before(t),t}function Xa(n,e){const t=n.ownerDocument,i=t.createElement("details");i.className="petra-menu";const a=t.createElement("summary");a.setAttribute("aria-label","Menu"),a.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const o=t.createElement("div");o.className="petra-menu-body";const r=t.createElement("input");r.type="file",r.accept=".rhythm,.json,application/json",r.hidden=!0,r.addEventListener("change",async()=>{const u=r.files?.[0];r.value="",u&&e.load(await u.text(),u.name)});const l=(u,p)=>{const b=t.createElement("button");return b.type="button",b.textContent=u,b.dataset.petraMenu=u.toLowerCase(),b.addEventListener("click",()=>{p(),d||(i.open=!1)}),b};o.append(l("Save",e.save),l("Load",()=>r.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],r),i.append(a,o),n.append(i);let d=null;const c=()=>{const u=getComputedStyle(a).display==="none";u!==d&&(i.open=u),d=u};return window.addEventListener("resize",c),c(),i}function Qa(n){const e=n.getOutputTimestamp?.(),t=e?.contextTime,i=e?.performanceTime;if(t===void 0||i===void 0||!(t>0)||!(i>0))return null;const a=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0;return{contextTime:t,performanceTime:i,timeOrigin:performance.timeOrigin,latencyMs:a,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function on(n,e){const t=n.getOutputTimestamp?.(),i=t?.contextTime,a=t?.performanceTime;if(i===void 0||a===void 0||!(i>0)||!(a>0)||!Number.isFinite(e))return null;const o=a+(e-i)*1e3,r=Number.isFinite(n.outputLatency)?n.outputLatency*1e3:0,l=performance.timeOrigin+o;return{playedMs:l,plusLatencyMs:l+r,latencyMs:r,stampContextTime:i,stampPerformanceTime:a}}class Za{doc=En();bank=yn();morphSeconds=0;playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Hi(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Di(this.bank,e,this.doc),this.edited=null}replace(e,t){this.retireSparkle();const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(t),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=i}clear(e){this.retireSparkle();const t={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Fi(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=t}peek(e){const t=Ot(this.bank,e,this.doc,0);return t.applied?t.document:null}recall(e,t=this.morphSeconds){const i=Ot(this.bank,e,this.doc,t);return i.applied?(this.retireSparkle(),this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=i.glideSeconds,!0):!1}surprise(e=Math.random){const t={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},i=ls(this.doc,e);this.sparkleUndo=t,this.bank=i.bank,this.doc=i.document,this.edited=null,this.glidePending=0}diceLane(e,t=Math.random){if(!this.doc.tracks[e])return!1;const i={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=as(this.doc,e,t),this.writeActive(),this.sparkleUndo=i,this.glidePending=0,!0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const t=Math.min(.75,Math.max(.5,e)),i=this.liveSwing;return this.followSwing=t,t===i?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(t=>{t.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}const eo=1400;function We(n,e,t,i=!1){return n==="store"?null:n==="clear"?t?`Cleared ${e}`:null:t?null:i?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function to(n){return n===0?"0 s":`${Math.round(n*100)/100} s`}class no{constructor(e){this.repaint=e}text="";timer=0;say(e){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},eo))}}const io=50;function so(n,e,t,i=io){if(t)return 0;const a=n-e;return a>=i?0:i-a}class ao{constructor(e,t=()=>null){this.host=e,this.anchor=t}handle=null;get open(){return this.handle!==null}show(e,t="Surprise applied"){this.handle?.close();const i=aa({message:t,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===i&&(this.handle=null,this.clearLive())}});this.handle=i}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function rn(n,e){const t=new AudioContext(e);let i="loading";const a=(async()=>{t.state==="running"&&await t.suspend();for(const o of n)await t.audioWorklet.addModule(o)})().then(()=>{i="loaded"},o=>{throw i="failed",o});return a.catch(()=>{}),{context:t,ready:a,get status(){return i},async start(){return i==="loaded"&&Y(t),await a,t.state!=="running"&&await t.resume(),t.state}}}function Y(n){n.state==="running"||n.state==="closed"||n.resume().catch(()=>{})}const oo=5e3;function ro(){return typeof navigator<"u"&&"userAgentData"in navigator}function lo(n,e,t,i={}){const a=i.restartsOnWorkletReady??ro(),o=i.preloadTimeoutMs??oo;let r=null,l=!1,d=null,c=null;async function u(){const f=new AudioContext(e);Y(f);try{for(const h of n)await f.audioWorklet.addModule(h);return f}catch(h){throw f.close().catch(()=>{}),h}}function p(f,h=!1){l=!0,r=null,f.context.close().catch(()=>{}),h?t?.(new Error(`audio preload still loading after ${o} ms`)):f.ready.catch(g=>t?.(g))}async function b(f){const{context:h}=f;t?.(new Error(`audio preload still loading after ${o} ms; loading into its context again`)),Y(h);const g=(async()=>{for(const k of n)await h.audioWorklet.addModule(k)})();try{return await Promise.race([f.ready.then(()=>{},()=>g),g]),h}catch(k){throw l=!0,r===f&&(r=null),h.close().catch(()=>{}),k}}function y(f){let h;const g=new Promise(k=>{h=setTimeout(()=>k("timeout"),o)});return Promise.race([f.ready.then(()=>"ready"),g]).finally(()=>clearTimeout(h))}async function w(){if(!l){r??=rn(n,e);const f=r;if(f.status==="failed")p(f);else{const h=f.status==="loaded"||!a;if(h&&Y(f.context),f.status==="loading"){let g;try{g=await y(f)}catch{return p(f),u()}if(g==="timeout")return a?(p(f,!0),u()):b(f)}return f.context.state==="closed"?(r===f&&(r=null),w()):(h||Y(f.context),f.context)}}return u()}return{preload(){r||d||c||l||(r=rn(n,e))},load(){return d&&d.state!=="closed"?(Y(d),Promise.resolve(d)):c?(r&&(r.status==="loaded"||!a)&&Y(r.context),c):(c=w().then(f=>(d=f,r=null,f)).finally(()=>{c=null}),c)}}}const ln="/rhythm/assets/processor-CdoUgoWY.js";let oe;function co(n){if(oe!==void 0)return oe;oe=null;try{if(typeof window>"u"||window.parent===window)return oe;const e=window.parent.ncStudio;e&&e.version===1&&(oe=e.attach(n))}catch{}return oe}function uo(n,e){let t=null;const i=()=>(t??=(async()=>{for(const a of e)await n.audioWorklet.addModule(a);return n})(),t.catch(()=>{t=null}),t);return{preload(){i().catch(()=>{})},load:i}}const Qn=new URLSearchParams(location.search),O=Qn.has("measure"),ho="petra-rhythm.linkslots",po=Es(ho),mo=!(O&&Qn.get("clockStepFix")==="0");let nt=0;const fo=.05;O&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const ee=[40,240],m=new Za,Se=O?null:Va(localStorage,location.search);Se&&(m.doc=Se.doc,m.bank=Se.bank,m.selectTrack(Se.selectedTrack));const yt=O?null:Wa(localStorage,()=>({doc:m.doc,bank:m.bank,selectedTrack:m.selectedTrack}));if(O){for(const e of m.doc.tracks)e.solo=e.voice==="kick";const n=m.doc.tracks.find(e=>e.voice==="kick");n&&(n.params.decay=fo)}const _=new Mi({bpm:m.doc.bpm,minBpm:ee[0],maxBpm:ee[1],timebase:"shared"}),wt=document.querySelector("#app");if(!(wt instanceof HTMLElement))throw new Error("Missing #app");const go=Ja(wt),ue=new ao(document.body,()=>{const n=document.querySelector("#play")?.closest(".nc-module");return n&&n.getBoundingClientRect().width<window.innerWidth/2?n:null});let $=null;O&&(window.__audioInfo=()=>$?{sampleRate:$.sampleRate,outputLatency:$.outputLatency,baseLatency:$.baseLatency,state:$.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",n=>{window.__errors?.push(String(n.reason))}),window.__toggle=()=>oi(),window.__clockStep=n=>{nt=n},window.__debug=()=>({audio:$?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:$?.getOutputTimestamp?.()??null,currentTime:$?.currentTime??null,reanchors:Q?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let q=null,Q=null,Ce=0,Zn=0;function bo(){return $?$.state==="running"?"running":$.state==="suspended"?"suspended":$.state==="interrupted"?"interrupted":"none":"needs-gesture"}const C=new Bi({app:bt,version:"0.1.0",clock:_,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:ee},audio:bo,outputLatencyMs:()=>Q?.outputLatencyMs??null,swing:()=>m.liveSwing});let Te="",ei=0,ti=!1,cn=Number.NEGATIVE_INFINITY,re=null;const P=new ht;function I(n=z()){return _.transport.isPlayingAt(n)}function be(n){if(!C.isLeader)return;const e=so(performance.now(),cn,n);if(e>0){re===null&&(re=setTimeout(()=>{re=null,be(!0)},e));return}re!==null&&(clearTimeout(re),re=null),C.publishState()&&(cn=performance.now())}function dn(){return ti?os(m.doc).tracks:m.doc.tracks}function ye(){if(!Q)return null;const n=Math.round(Q.offset*1e4)/1e4;return{offset:n,shifted:Ti(_.toSnapshot(),n,"audio")}}const kt=new $s(({offset:n,shifted:e})=>JSON.stringify([n,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function it(n=!1){const e=ye();e&&kt.set(e,n)}function ni(n,e,t,i){return{clock:n,measure:O,swing:m.followSwing??e.swing,fx:{...e.fx},...i===void 0?{}:{glideSeconds:i},tracks:t.map(a=>({id:a.id,voice:a.voice,length:a.length,mute:a.mute,solo:a.solo,steps:a.steps})),params:e.tracks.map(a=>({voice:a.voice,params:{...a.params}}))}}let J=null;function A(n="state"){const e=n==="state"?ye():kt.current??ye();if(!q||!e)return;xo(),n!=="state"&&(Te="");const{offset:t,shifted:i}=e,a=J;a!==null&&(J=null,Te="");const o=m.consumeGlide(),r=JSON.stringify({seen:P.lastTaken,offset:t,anchor:i.anchor,start:i.startTime,stop:i.stopTime,tempo:i.tempo,swing:m.liveSwing,glide:o??null,tracks:dn(),fx:m.doc.fx});if(r===Te)return;Te=r;const l={...ni(i,m.doc,dn(),o),seen:P.lastTaken,...a===null?{}:{enterBeat:a}};ei=t,q.port.postMessage({type:"state",state:l}),window.__posts?.push({why:n,anchor:i.anchor.time,start:i.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const we=co("petra-rhythm"),vt=we?uo(we.ctx,[ln]):lo([ln],void 0,n=>console.warn("[rhythm] audio preload failed; loading on Play instead",n));async function je(){const n=vt.load();if($)return;const e=await n;if($){e!==$&&e.close().catch(()=>{});return}if($=e,O){const i=$,a=i.getOutputTimestamp.bind(i);i.getOutputTimestamp=()=>{const o=a(),r=!nt||!o.contextTime?o:{contextTime:o.contextTime+nt/1e3,performanceTime:o.performanceTime},l=window.__ts;return l&&l.length<2e5&&l.push([performance.timeOrigin+performance.now(),r.contextTime??0,r.performanceTime??0]),r}}$.addEventListener("statechange",()=>{x(),ie()}),Q=we?.mapper??new Oi($,mo?{}:{stepThresholdMs:0}),Q.onStep(i=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:i.stepSeconds*1e3,confirmedAt:i.confirmedAt,reanchors:i.reanchors,revert:i.revert===!0}),it(!0)}),Q.start(),q=new AudioWorkletNode($,"rhythm"),q.port.onmessage=i=>{if(i.data.switched!==void 0&&So(i.data.switched),i.data.level!==void 0&&i.data.step!==void 0&&(Zn=i.data.level,Ce!==i.data.step&&(Ce=i.data.step,x())),!(!O||!$)){for(const a of i.data.onsets??[])window.__kicks?.push({step:a.step,beat:a.beat,shared:a.contextTime-ei});for(const a of i.data.onsets??[]){const o=on($,a.contextTime);o&&window.__onsets?.push({app:bt,beat:a.beat,contextTime:a.contextTime,hidden:document.hidden,stampAgeMs:($.currentTime-a.contextTime)*1e3,...o})}for(const a of i.data.render??[]){const o=on($,a.contextTime);o&&window.__render?.push({contextTime:a.contextTime,peak:a.peak,playedMs:o.playedMs})}}},q.connect(we?.output??$.destination);let t=!1;kt.subscribe(()=>A(t?"clock":"attach")),_.subscribe(i=>it(i.kind==="snapshot"&&i.replay===!0)),t=!0}const Z=new vs;let $t=!1,Ae=null,ce=null;function Re(){return!$||$.state!=="running"}function yo(){return ce=Z.mode(Re(),I()),ce}function xt(){return Ae??=(async()=>{try{J=Number.POSITIVE_INFINITY,$&&A(),await je(),$&&$.state!=="running"&&await $.resume();const n=_.transport;J=Z.enter(n.beatAt(z()),n.bpm),st&&(st=!1,J=Math.floor(n.beatAt(z())/4)*4);const e=J;$t=!0,Tt(),A(),O&&(window.__join={...Z.toJSON(),tapBeat:ii,sentBeat:e})}catch(n){throw Z.cancel(),J=Number.NEGATIVE_INFINITY,A(),n}})().finally(()=>{Ae=null,x(),ie()}),Ae}let ii=Number.NaN,st=!1;function si(n){const e=n instanceof KeyboardEvent&&n.repeat;Z.gesture(Re(),I(),e)&&(ii=_.transport.beatAt(z()),xt().catch(ai))}document.addEventListener("pointerdown",si,{capture:!0});document.addEventListener("keydown",si,{capture:!0});document.addEventListener("pointerup",()=>{Z.pending&&$&&$.state!=="running"&&$.resume()},{capture:!0});function ai(n){console.warn("[rhythm] audio couldn't start",n),K.say("Audio couldn't start. Press Play to try again."),x()}function St(){wo().catch(ai)}async function wo(){if(Z.swallowClick(Re(),I())){await xt();return}await oi()}let me=null;function ie(){if(me!==null&&(clearTimeout(me),me=null),!Re())return;Ee(!0,I())!==ce&&x();const n=z(),{startTime:e,stopTime:t}=_.transport,i=[e,t].filter(o=>o!==null&&o>n);if(i.length===0)return;const a=Math.min((Math.min(...i)-n)*1e3+1,2**31-1);me=setTimeout(()=>{me=null,ie()},a)}const ko=1500;function vo(n){let e,t;const i=new Promise(r=>{e=setTimeout(()=>r(!1),ko)}),a=new Promise(r=>{t=()=>{n.state==="running"&&r(!0)},n.addEventListener("statechange",t)}),o=n.resume().then(()=>n.state==="running",()=>!1);return Promise.race([o,a,i]).finally(()=>{clearTimeout(e),t&&n.removeEventListener("statechange",t)})}let Ve=!1;function $o(){$?$.state!=="running"&&$.resume().catch(()=>{}):vt.load().catch(()=>{})}async function oi(){if(Ve){$o();return}Ve=!0;try{if(await je(),!$)return;if($.state!=="running"&&!await vo($)&&!I()){K.say("Tap Play to start audio"),x();return}}finally{Ve=!1}if(I()){_.stop({at:z()});return}_.play({at:z()}),!C.isLeader&&[...C.peers.values()].some(n=>n.leader)&&($t=!0,Tt(),x())}const K=new no(()=>x());function te(){return $t&&!C.isLeader}function Tt(){!te()||!m.adoptSwing(C.swing)||(A(),x())}function ri(n,e,t){const i=m.peek(n),a=ye();if(!i||!q||!a)return!1;const o=_.transport.beatAt(z()),r=P.recall(n,o,{glide:e},t===void 0?{}:{atBeat:t});return ui(r,i,a.shifted),!0}let li="";function ci(n){return te()?m.followSwing??n.swing:n.swing}function di(n,e){return JSON.stringify([n,ci(e),e.fx,e.tracks])}function ui(n,e,t){if(!q)return;li=di(n.id,e);const i={...ni(t,e,e.tracks,n.payload.glide),swing:ci(e),atBeat:n.atBeat,switchId:n.id,slot:n.slot};q.port.postMessage({type:"state",state:i})}function xo(){const n=P.pending;if(!n||!q)return;const e=m.peek(n.slot);if(!e){P.cancel();return}if(di(n.id,e)===li)return;const t=ye();t&&ui(n,e,t.shifted)}function Et(n,e){const t=m.liveSwing;return m.recall(n,e)?(te()||(m.followSwing=null),m.liveSwing!==t&&be(!0),!0):!1}function So(n){const e=P.takeHeld(n);e&&(Et(e.slot,e.payload.glide),m.consumeGlide(),A(),x())}function hi(n){if(P.cancel(),!Et(n,m.morphSeconds))return;const e=m.morphSeconds>0?m.morphSeconds:0;C.sendSnapshot("recall",n,{atBeat:_.transport.beatAt(z()),...e>0?{glide:{seconds:e}}:{}})}function To(n){if(P.tap(n,I()).kind==="queue"){const t=m.morphSeconds>0?m.morphSeconds:0;if(ri(n,t,Ln(_.transport.beatAt(z())))){const i=P.pending?.atBeat;C.sendSnapshot("recall",n,{...i===void 0?{}:{atBeat:i},...t>0?{glide:{seconds:t}}:{}});return}}hi(n)}function de(n,e){const t=bn[n]??"";if(e==="store")m.store(n),K.say(We(e,t,!0));else if(e==="clear"){const i=m.bank.slots[n]!=null;if(P.queued===n){const a=P.drop();P.cancel();const o=m.bank.active;a&&o!=null&&C.sendSnapshot("recall",o,{atBeat:a.atBeat})}m.clear(n),K.say(We(e,t,i)),i&&ue.show(ke,`Slot ${t} cleared`)}else m.bank.slots[n]==null?K.say(We(e,t,!1,matchMedia("(pointer: coarse)").matches)):To(n);A(),x()}function ke(){m.undoSurprise()&&(ue.dismiss(),A(),x())}function Eo(n){const e=n.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((n.metaKey||n.ctrlKey)&&n.key==="z"&&!n.shiftKey){n.preventDefault(),ke();return}if(n.code==="Space"){n.preventDefault(),n.repeat||St();return}const t=n.code.startsWith("Digit")?Number(n.code.slice(5)):Number.NaN;if(!Number.isInteger(t))return;const i=t===0?9:t-1;i<0||i>=F||(n.preventDefault(),n.shiftKey?de(i,"store"):n.altKey?de(i,"clear"):de(i,"recall"))}const Mo=new xs({min:ee[0],max:ee[1]});function at(n){m.doc.bpm=n,_.setTempo({bpm:n}),A(),x()}function Ao(){return te()?"Leader's swing · Save stores it":"Own swing · join to follow"}function pi(){const n=I(),e=yo(),t=te();return{id:"transport",title:"Transport",summary:n?"playing":"stopped",status:K.text,controls:[{type:"button",id:"play",label:An(e),on:e==="stop",...e==="join"?{ariaLabel:Mn}:{},onPress:()=>St(),sparkleTitle:"Surprise me: new grooves in all 10 slots",onSparkle:()=>{m.surprise(),A(),x(),ue.show(ke)}},{type:"slider",id:"bpm",label:"Tempo",min:ee[0],max:ee[1],step:1,value:_.transport.bpm,onChange:at,onTap:i=>{const a=Mo.tap(i);a!==null&&a!==_.transport.bpm&&at(a)}},{type:"slider",id:"swing",label:t?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:m.liveSwing,valueText:cs(m.liveSwing),disabled:t,modulated:t&&m.followSwing!=null,onChange:i=>{te()||Ae||(m.setSwing(i),be(!1),A(),x())},onCommit:()=>{be(!0)}},...C.isLeader?[]:[{type:"note",id:"swing-note",text:Ao()}],...C.peers.size>0?[{type:"readout",id:"role",label:"Sync",value:C.isLeader?"leader":"follower"}]:[],{type:"slotRow",id:"slots",morph:m.morphSeconds,morphText:to(m.morphSeconds),slots:bn.map((i,a)=>({label:i,filled:m.bank.slots[a]!=null,active:m.bank.active===a,edited:m.edited===a,queued:P.queued===a,pulse:P.queued===a&&n&&Ce%4<2})),onMorph:i=>{m.morphSeconds=i,x()},onSlot:(i,a)=>{de(i,a)}}]}}function ot(){const n=m.doc.tracks.length;return n===0?0:Math.min(m.selectedTrack,n-1)}function mi(){const n=m.doc.tracks[ot()];return{id:"pattern",title:"Pattern",lead:!0,summary:n?`${m.doc.tracks.length} tracks · ${n.name}`:`${m.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:ce==="stop",label:An(ce??"play"),...ce==="join"?{ariaLabel:Mn}:{},onToggle:()=>St()},id:"grid",playhead:I()?Ce:-1,selectedRow:n?.id,onSelectRow:e=>{m.selectTrack(e),x()},onDice:e=>{const t=m.doc.tracks[e]?.name??"Lane";m.diceLane(e)&&(A(),x(),ue.show(ke,`New ${t} steps`))},onFill:e=>{ti=e,A(),x()},onLength:(e,t)=>{m.edit(i=>{const a=i.tracks[e];a&&(a.length=Math.max(1,Math.min(a.steps.length,Math.round(t))))}),A(),x()},onMute:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.mute=!i.mute)}),A(),x()},onSolo:e=>{m.edit(t=>{const i=t.tracks[e];i&&(i.solo=!i.solo)}),A(),x()},onToggle:(e,t,i)=>{m.edit(a=>{const o=a.tracks[e]?.steps[t];o&&(i?(o.accent=!o.accent,o.accent&&(o.on=!0)):(o.on=!o.on,o.on||(o.accent=!1)))}),A(),x()},onLongPress:(e,t,i)=>{const a=m.doc.tracks[e],o=a?.steps[t];!a||!o||oa({anchor:i,title:`${a.name} · step ${t+1}`,velocity:o.velocity,probability:o.probability??1,onChange:({velocity:r,probability:l})=>{m.edit(d=>{const c=d.tracks[e]?.steps[t];c&&(c.on=!0,c.velocity=r,c.probability=l>=1?void 0:l)}),A(),x()}})},onSet:(e,t,i,a)=>{m.edit(o=>{const r=o.tracks[e]?.steps[t];r&&(i==="accent"?(r.accent=a,a&&(r.on=!0)):(r.on=a,a||(r.accent=!1)))}),A(),x()},rows:m.doc.tracks.map((e,t)=>({id:e.id,label:e.name,lane:t%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(i=>({on:i.on,accent:i.accent,velocity:i.velocity,dim:(i.probability??1)<1}))}))}]},Lo()]}}function Lo(){const n=ot(),e=m.doc.tracks[n],t=["tune","decay","tone","snap","drive","level"];return{id:"parameters",title:"Parameters",panel:!0,subject:e?.name??"",lane:n%4+1,controls:t.map(i=>({type:"slider",id:i,label:us(i),valueText:ds(i,e?.params[i]??0),min:i==="tune"?20:0,max:i==="tune"?800:1,step:i==="tune"?1:.01,value:e?.params[i]??0,onChange:a=>{m.edit(o=>{const r=o.tracks[ot()];r&&(r.params[i]=a)}),A(),x()}}))}}function Mt(){return{id:"filter",title:"Filter",summary:m.doc.fx.mode,controls:[{type:"select",id:"mode",label:"Mode",value:m.doc.fx.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:n=>{m.edit(e=>{(n==="lp"||n==="hp"||n==="bp")&&(e.fx.mode=n)}),A(),x()}},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:m.doc.fx.cutoff,valueText:ct(m.doc.fx.cutoff),onChange:n=>{m.edit(e=>{e.fx.cutoff=n}),A(),x()}},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:m.doc.fx.mode,cutoff:m.doc.fx.cutoff,resonance:m.doc.fx.resonance},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:Zn}]}}await Yn();const fi=ft(pi());await gt();const At=ft({id:"pattern",title:"Pattern",lead:!0}),Lt=ft({id:"filter",title:Mt().title}),gi={build:()=>At.update(mi())},bi={build:()=>Lt.update(Mt())};let Pe=null;function x(){m.takeSurpriseEdit()&&ue.dismiss(),fi.update(pi()),Pe?.ready(gi)&&At.update(mi()),Pe?.ready(bi)&&Lt.update(Mt()),yt?.schedule()}window.addEventListener("pagehide",()=>yt?.flush());function un(n,e,t){P.cancel(),m.replace(n,e),A(),x(),yt?.schedule(),ue.show(ke,t)}Xa(go,{save:()=>{const n=m.doc.name||"rhythm",e=URL.createObjectURL(new Blob([hs(m.doc,m.bank)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`${n}.rhythm`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),0),K.say(`Saved ${n}.rhythm`)},load:(n,e)=>{const t=ps(n);if(!t.ok||!t.document||!t.bank){K.say(`Couldn't load ${e}: ${t.errors[0]??"not a Rhythm file"}`);return}un(t.document,t.bank,`Loaded ${e}`)},create:()=>un(ys(),yn(),"New pattern"),panic:()=>q?.port.postMessage({type:"panic"})});_.onChange(()=>{if(m.playing=I(),!m.playing&&P.pending){const n=P.drop();n&&hi(n.slot)}m.doc.bpm=_.transport.bpm,A(),x(),ie()});C.onSwing(n=>{te()&&m.adoptSwing(n)&&A(),x()});C.onSnapshot(n=>{if(n.op!=="recall")return;const e=C.peers.get(n.from)?.app;if(!Ms(bt,e,po)){window.__ignoredRecalls?.push({slot:n.slot,app:e??null});return}window.__recalls?.push({slot:n.slot,atBeat:n.atBeat??null,shared:z()});const t=n.glide?.seconds??0;if(I()&&ri(n.slot,t,n.atBeat)){x();return}P.cancel(),Et(n.slot,t),A(),x()});C.onRole(()=>{Tt(),x(),ie()});C.onPeers(()=>{x(),ie()});O&&(window.__rhythm={setKick:n=>{m.edit(e=>{const t=e.tracks.find(i=>i.voice==="kick");t&&t.steps.forEach((i,a)=>{i.on=n.includes(a)})}),A(),x()},store:n=>de(n,"store"),tap:n=>de(n,"recall"),tempo:n=>at(n),beat:()=>_.transport.beatAt(z()),timeAt:n=>_.transport.timeAt(n),slots:()=>({active:m.bank.active??null,queued:P.queued}),swing:()=>{const n=m.bank.active;return{live:m.liveSwing,doc:m.doc.swing,slot:n==null?null:m.bank.slots[n]?.swing??null,leader:C.isLeader}},setSwing:n=>{m.setSwing(n),be(!0),A(),x()},lateEnter:()=>{st=!0},audio:async()=>(await je(),await $?.resume(),$?.state??"none")});await gt();await C.start();document.addEventListener("keydown",Eo);Ba(wt,[fi,At,Lt],"adjacent");await gt();x();Pe=Da([gi,bi]);ie();Pe.done.then(()=>{vt.preload(),we&&je().then(()=>{I()&&$?.state==="running"&&xt()}).catch(()=>{}),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const n=I();if(n!==m.playing&&(m.playing=n,x()),it(),A(),!O||!$)return;const e=Qa($);e&&window.__stamps?.push(e)},250);
