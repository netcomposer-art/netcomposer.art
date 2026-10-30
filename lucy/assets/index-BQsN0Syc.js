(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const se=1e-9;function Ln(n,e,t,i=120){return Number.isFinite(n)?Math.min(t,Math.max(e,n)):Math.min(t,Math.max(e,i))}class et{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const t=e.anchor??{beat:0,time:0};this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Ln(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,t){const i=t.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+se&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of i){if(s.beat<=e.beat+se)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,t=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(t)}]}setTempoAt(e,t){if(e=this.clamp(e),!Number.isFinite(t)||t<=this.segs[0].beat+se){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=t-se;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:t,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,t,i,o=.25){const r=this.bpmAt(t);if(!(i>0)||!(o>0)){this.setTempoAt(e,t);return}const s=Math.max(1,Math.round(i/o));this.setTempoAt(r,t);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,t+i*(l-1)/s)}prune(e){let t=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(t=i);t>0&&(this.segs=this.segs.slice(t))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const t=this.segAtBeat(e);return t.time+(e-t.beat)*60/t.bpm}beatAt(e){const t=this.segAtTime(e);return t.beat+(e-t.time)*t.bpm/60}clone(){const e=new et({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(t=>({...t})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let t=Math.max(1,e);t<this.segs.length;t++){const i=this.segs[t-1];this.segs[t].time=i.time+(this.segs[t].beat-i.beat)*60/i.bpm}}segAtBeat(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].beat<=e+se)return t[i];return t[0]}segAtTime(e){const t=this.segs;for(let i=t.length-1;i>0;i--)if(t[i].time<=e+se)return t[i];return t[0]}}const An=Object.freeze({beatsPerBar:4,beatUnit:4}),ce=1e-9;function Mn(n){return Math.floor(n+ce)}function jt(n,e,t=!1){if(!(e>0))return n;const o=Math.ceil(n/e-ce)*e;return t&&o<=n+ce?o+e:o}class En{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new et({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??An}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-ce&&(this.stopTime===null||e<this.stopTime-ce)}start(e){const t=e.beat??0;this.tempo.restart({beat:t,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=t}stop(e){if(this.startTime===null)return;const t=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(t),this.stopTime=t}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,t){if(!this.running||t===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,t),t}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-ce?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const t=Math.max(1,this.meter.beatsPerBar),i=Mn(e/t),o=Math.max(0,e-i*t);return{beat:e,bar:i,beatInBar:o,barPhase:o/t}}nextBar(e,t=!1){return jt(e,Math.max(1,this.meter.beatsPerBar),t)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Wt="nc-clock/snapshot",Gt=1;function Tn(n,e="local"){return{format:Wt,version:Gt,timebase:e,anchor:n.tempo.anchor,tempo:n.tempo.points,meter:{...n.meter},playing:n.running,startTime:n.startTime,stopTime:n.stopTime,stoppedBeat:n.stoppedBeat}}function Cn(n,e){const t=In(e);n.tempo.reset(t.anchor,t.tempo),n.meter={...t.meter},n.startTime=t.startTime,n.stopTime=t.stopTime,n.stoppedBeat=t.stoppedBeat}const G=n=>typeof n=="number"&&Number.isFinite(n),lt=n=>n===null||G(n);function In(n){const e=n,t=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&t("not an object"),e.format!==Wt&&t("format"),(!G(e.version)||Math.floor(e.version)!==Gt)&&t(`unsupported version ${String(e.version)}`),(!e.anchor||!G(e.anchor.beat)||!G(e.anchor.time))&&t("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&G(i.beat)&&G(i.bpm)&&i.bpm>0))&&t("tempo"),(!e.meter||!G(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!G(e.meter.beatUnit))&&t("meter"),(!lt(e.startTime)||!lt(e.stopTime)||!G(e.stoppedBeat))&&t("transport times"),e}class Nn{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new En(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const t=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),t}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,t=0,i){this.transport.start({at:e,beat:t,bpm:i}),this.emit({kind:"start",at:e,beat:t})}commitStop(e,t=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:t})}commitTempo(e,t){const i=this.transport.setTempo(e,t);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Cn(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Tn(this.transport,this.timebase)}emit(e){for(const t of[...this.listeners])t(e)}}const zn="nc-sync/1",Rn=1,Bn="nc-sync",jn="nc-sync-leader",Wn=0,Zt=.5,Ot=.75;function Gn(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Zt&&n<=Ot?n:null}const Oe=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),pe=n=>typeof n=="number"&&Number.isFinite(n),Le=n=>typeof n=="string"&&n.length>0;function Zn(n){const e=n;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Rn||!Le(e.type)||!Le(e.from)||!pe(e.term)||!pe(e.seq)||!pe(e.sentAt))return null;switch(e.type){case"hello":return Le(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return pe(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&pe(e.slot)?e:null;case"ping":case"pong":return Le(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function On(n,e,t,i,o){return{proto:zn,from:e,term:t,seq:i,sentAt:o,...n}}function V(){return(performance.timeOrigin+performance.now())/1e3}const Ye=.003,Yn=3,Pn=.01,ct=500;class dt{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const t=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(t)<=(this.stepThreshold>0?Pn:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,t={}){this.ctx=e,this.keep=Math.max(1,t.samples??9),this.intervalMs=t.intervalMs??250,this.latencyIntervalMs=t.latencyIntervalMs??5e3,this.userOffsetMs=t.userOffsetMs??0,this.timeOrigin=t.timeOrigin??performance.timeOrigin,this.perfNow=t.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,t.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,t.stepConfirmations??3),this.stepCheckMs=t.stepCheckMs??50,this.stepConfirmMs=Math.max(0,t.stepConfirmMs??10),this.stepRevert=Math.max(0,t.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,t=e?.contextTime??0,i=e?.performanceTime??0;if(!(t>=Ye&&i>0)||!Number.isFinite(t)||!Number.isFinite(i))return!1;const o=t-(this.timeOrigin+i)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!d&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?t===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=t,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,d))):(this.pendingStep=s,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=t,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,t,i){const o=this.ctx.currentTime,r=o<=this.revertUntil;let s;if(i&&r){const l=this.offsets,d=this.preStep;l.length=0;for(let c=0;c<d.length;c++)l.push(d[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-t,confirmedAt:o,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-t)<=this.stepThreshold)return!1;if(!r){const c=this.offsets,u=this.preStep;u.length=0;for(let m=0;m<c.length;m++)u.push(c[m]);this.preStepBase=t,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?o+this.stepRevert:-1/0}const l=this.offsets,d=e-t;for(let c=0;c<l.length;c++)l[c]+=d;this.stepCount++,s={stepSeconds:e-t,confirmedAt:o,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,t=this.scratch,i=e.length;t.length=i;for(let r=0;r<i;r++){const s=e[r];let l=r-1;for(;l>=0&&t[l]>s;)t[l+1]=t[l],l--;t[l+1]=s}const o=i>>1;return i%2?t[o]:(t[o-1]+t[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let t=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ye&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<ct)return!0;e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),t=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ye)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<ct)return!1}e.currentTime>0&&(t=e.currentTime-(this.latency??0)-this.sharedNow())}return t===null||!Number.isFinite(t)?!1:(this.offsets.push(t),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Yn,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const t=this.perfNow();if(!e&&t-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=t;const i=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(o)&&o>0?o:null}}class Hn{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const t=globalThis;this.clock=e.clock,this.caps={...Oe,...e.capabilities},this.channelOption=e.channel??Bn,this.locks=e.locks===void 0?t.navigator?.locks??null:e.locks,this.id=e.instanceId??t.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(t.performance.timeOrigin+t.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>t.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,t,i={}){this.send({type:"snapshot",op:e,slot:t,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,t=this.o.now();if(e.isPlayingAt(t)&&e.stopTime===null){const i=e.nextBar(e.beatAt(t+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(t+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,t,i){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const d=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(t??jt(d,1),d);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,t]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),t=Math.min(t,i.capabilities.tempoRange[1]);return e<=t?[e,t]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),t=typeof e=="number"&&Number.isFinite(e)?Math.min(Ot,Math.max(Zt,e)):Wn;this.send({type:"state",clock:this.clock.toSnapshot(),swing:t,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(t)}noteSwing(e){const t=Gn(e);if(!(t===null||t===this.appliedSwing)){this.appliedSwing=t;for(const i of[...this.swingListeners])i(t)}}receive(e){const t=Zn(e);if(!t||t.from===this.id)return;const i=this.lastSeq.get(t.from);if(!(i!==void 0&&t.seq<=i)){switch(this.lastSeq.set(t.from,t.seq),t.term>this.term&&t.type!=="state"&&(this.term=Math.max(this.term,t.term)),t.type){case"hello":case"heartbeat":{const o=this.peers.has(t.from);this.peers.set(t.from,{id:t.from,app:t.app,capabilities:{...Oe,...t.capabilities},audio:t.audio,hidden:t.type==="heartbeat"?t.hidden:!1,leader:t.type==="heartbeat"?t.leader:!1,joinedAt:t.joinedAt,lastSeen:this.o.now(),outputLatencyMs:t.outputLatencyMs}),o||this.emitPeers(),t.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(t.from),this.lastSeq.delete(t.from),this.emitPeers(),this.elect();break;case"state":{if(t.term<this.term)return;if(this.leader){if(t.term===this.term&&this.outranks(t.from)){this.broadcastState();return}this.setLeader(!1)}this.term=t.term;for(const r of this.peers.values())r.leader=r.id===t.from;const o=this.peers.get(t.from);o?o.lastSeen=this.o.now():(this.peers.set(t.from,{id:t.from,app:t.leaderApp,capabilities:{...Oe},audio:"none",hidden:!1,leader:!0,joinedAt:t.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(t.clock),this.noteSwing(t.swing),t.stopAll&&this.clock.commitStop(t.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(t.action==="start"?this.decideStart():this.decideStop(t.all??!1));break;case"tempo":this.leader&&this.decideTempo(t.bpm,t.atBeat,t.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(t);break;case"ping":this.send({type:"pong",id:t.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(t)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(jn,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const t=(r,s,l)=>[r?0:1,s,l];let i=t(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=t(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const t=this.peers.get(e);if(!t)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],o=[t.capabilities.prefersLeader?0:1,t.joinedAt];return i[0]!==o[0]?i[0]<o[0]:i[1]!==o[1]?i[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const t of[...this.roleListeners])t(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let t=!1;for(const i of[...this.peers.values()]){const o=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>o&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),t=!0)}t&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const t of[...this.peerListeners])t(e)}send(e){this.channel&&this.channel.postMessage(On(e,this.id,this.term,++this.seq,this.o.now()))}}var Xn="nc-ui",Yt={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Ve={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ee={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},me=n=>`--${Xn}-${n}`,Ue=Yt["label-on-fill-dark"],ut=Yt["label-on-fill-light"],Fn=ee["label-min-contrast"],Dn=/^#[0-9a-f]{6}$/i,Vn=n=>typeof n=="string"&&Dn.test(n),Me=n=>Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0");function pt(n,e,t){n=(n%360+360)%360,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));let i=e*Math.min(t,1-t),o=r=>{let s=(r+n/30)%12;return t-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Me(o(0)*255)}${Me(o(8)*255)}${Me(o(4)*255)}`}function Pt(n){let[e,t,i]=[1,3,5].map(c=>parseInt(n.slice(c,c+2),16)/255),o=Math.max(e,t,i),r=Math.min(e,t,i),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((t-i)/l%6):o===t?60*((i-e)/l+2):60*((e-t)/l+4))+360)%360,s:d,l:s}}function ht(n){let[e,t,i]=[1,3,5].map(o=>{let r=parseInt(n.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*t+.0722*i}function qe(n,e){let[t,i]=[ht(n),ht(e)].sort((o,r)=>r-o);return(t+.05)/(i+.05)}var Ce=n=>qe(n,Ue)>=qe(n,ut)?Ue:ut;function Ht(n,e,t,i=Fn){let o=pt(n,e,t),r=Ce(o)===Ue?1:-1;for(let s=0;s<40&&qe(o,Ce(o))<i;s++)t+=r*.01,o=pt(n,e,t);return o}function Un(n){let{h:e,s:t}=Pt(n),i=Ht(e,Math.min(t,ee["surprise-on-max-saturation"]),ee["surprise-on-lightness"]);return{fill:n,ink:Ce(n),on:i,onInk:Ce(i)}}var qn=(n,e)=>{let t=Math.abs(n-e)%360;return Math.min(t,360-t)};function _n(n,e=Math.random){let[t,i]=ee["surprise-saturation"],[o,r]=ee["surprise-lightness"],s=ee["surprise-min-hue-gap"],l=Vn(n)?Pt(n).h:null,d=e()*360;return l!==null&&qn(d,l)<s&&(d=(l+s+e()*(360-2*s))%360),Ht(d,t+e()*(i-t),o+e()*(r-o))}function Kn(n){if(!n)return null;let e=Un(n);return{[me("surprise-fill")]:e.fill,[me("surprise-ink")]:e.ink,[me("surprise-on")]:e.on,[me("surprise-on-ink")]:e.onInk}}var Jn=n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4,Qn=n=>n<=.0031308?12.92*n:1.055*n**(1/2.4)-.055;function mt(n){let[e,t,i]=[1,3,5].map(l=>Jn(parseInt(n.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*t+.0514459929*i),r=Math.cbrt(.2119034982*e+.6806995451*t+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*t+.6299787005*i);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function ea([n,e,t]){let i=(n+.3963377774*e+.2158037573*t)**3,o=(n-.1055613458*e-.0638541728*t)**3,r=(n-.0894841775*e-1.291485548*t)**3;return`#${[4.0767416621*i-3.3077115913*o+.2309699292*r,-1.2684380046*i+2.6097574011*o-.3413193965*r,-.0041960863*i-.7034186147*o+1.707614701*r].map(s=>Me(Qn(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var ta=ee["velocity-range"],Xt={min:Ve.rhythm["velocity-min"],max:Ve.rhythm["velocity-max"]};function na(n,e=Xt){let[t,i]=ta,o=Number.isFinite(n)?Math.max(t,Math.min(i,n)):t,r=(o-t)/(i-t),s=Ve.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=mt(e.min),d=mt(e.max);return{velocity:o,t:r,fill:ea(l.map((c,u)=>c+(d[u]-c)*r)),ink:s}}function ft(n,e=Xt){return{[me("velocity-fill")]:na(n,e).fill}}var aa={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ia={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},oa={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ra={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},We={};for(let[n,e]of Object.entries(ia))We[n]={prop:`--nc-ui-${n}`,kind:e,tier:"semantic"};for(let[n,e]of Object.entries(ra))We[n]={prop:`--nc-ui-${n}`,kind:e,tier:"runtime"};for(let[n,e]of Object.entries(oa))We[`rhythm.${n}`]={prop:`--nc-rhythm-${n}`,kind:e,tier:"rhythm"};new Map(aa.renames.map(n=>[n.old,n.new]));function Ft(n){let e=We[n];if(!e)throw new Error(`Unknown token "${n}". Add it to src/alias.js.`);return e}function I(n){return Ft(n).prop}function a(n){return`var(${I(n)})`}function sa(n,e){if(!(n instanceof Element))return 0;let t=Number.parseFloat(getComputedStyle(n).getPropertyValue(I(e)));return Number.isFinite(t)?t:0}function R(n,e){let t=Ft(e),i=n.ownerDocument??document,o=i.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${t.prop})`;t.kind==="family"?o.style.fontFamily=r:t.kind==="length"||t.kind==="other"||t.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(n instanceof Element?n:i.documentElement).append(o);let s=(i.defaultView??window).getComputedStyle(o),l=t.kind==="family"?s.fontFamily:t.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function la(n){return n==="hp"?"filter-highpass":n==="bp"?"filter-bandpass":"filter-lowpass"}function ca(n){let e=n.ownerDocument??document,t=e.createElement("span");t.style.fontFamily=a("font-ui"),t.style.fontSize=a("label-size"),t.style.fontWeight=a("label-weight"),(n instanceof Element?n:e.documentElement).append(t);let i=(e.defaultView??window).getComputedStyle(t).font;return t.remove(),i}var da="[data-modulated], [data-modulated] *";function ua(){let n=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${I("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${I("divider")}: ${a(`module-div-stack-${i}`)};
      ${I("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,t=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${I("text-sub")}: ${a("module-sub-stack-1")};
      ${I("divider")}: ${a("module-div-stack-1")};
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
${[1,2,3,4].map(n).join(`
`)}
${[1,2,3,4].map(t).join(`
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
${da} { transition: none; }
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
  ${I("text-sub")}: ${a("module-sub-stack-1")};
  ${I("divider")}: ${a("module-div-stack-1")};
  ${I("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${I("text-sub")}: inherit;
  ${I("divider")}: inherit;
  ${I("slider-track")}: inherit;
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
`}var Pe=null,pa="nc-ui-fallback";function Dt(n=globalThis.document){if(!n?.documentElement||(n.documentElement,Pe&&Pe.ownerDocument===n))return;let e=n.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${pa} {
${ua()}
}
`,n.head.append(e),Pe=e}var he=null,ha=0,ma=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Vt=n=>{let e=n.querySelector?.("link[data-nc-ui-confirm]");return!e&&n.head&&(e=n.createElement("link"),e.rel="stylesheet",e.href=ma,e.dataset.ncUiConfirm="",e.ncWait=new Promise(t=>{let i=()=>{e.ncWait=null,t()};e.onload=i,e.onerror=i}),n.head.append(e)),e?.ncWait};typeof document<"u"&&Vt(document);function fa({title:n,body:e,confirmLabel:t="Confirm",cancelLabel:i="Cancel",danger:o=!1,root:r,returnFocus:s,signal:l}){if(he||l?.aborted)return Promise.resolve(!1);let d=r?.ownerDocument??document,c=Vt(d),u=r??d.body,m=d.defaultView??globalThis,b=`nc-ui-confirm-${++ha}`,f=(L,P,W)=>{let oe=d.createElement(L);return oe.className=`nc-ui-confirm${P}`,W!=null&&(oe.textContent=W),oe},g=f("div","-layer");g.dataset.state="enter";let y=f("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${b}-t`),y.setAttribute("aria-describedby",`${b}-b`);let p=f("h2","-title",n);p.id=`${b}-t`;let h=f("p","-body",e);h.id=`${b}-b`;let $=f("div","-actions"),w=(L,P)=>{let W=f("button","-btn",L);return W.type="button",W.dataset.ncConfirm=P,W.addEventListener("click",()=>ie(P==="ok")),W},E=w(i,"cancel"),v=w(t,"ok");o&&(v.dataset.danger="true"),$.append(E,v),y.append(p,h,$),g.append(y);let S={layer:g};he=S;let A=s??d.activeElement,j=[];for(let L of u.children)L.hasAttribute("inert")||(L.setAttribute("inert",""),j.push(L));let Y=()=>{if(he!==S)return;u.append(g),E.focus({preventScroll:!0});let L=m.requestAnimationFrame?.bind(m)??(P=>setTimeout(P,16));L(()=>L(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};c?c.then(Y):Y();let K=!1;g.addEventListener("pointerdown",L=>{K=L.target===g}),g.addEventListener("click",L=>{L.target===g&&K&&ie(!1),K=!1});let xe=L=>{L.stopImmediatePropagation(),L.key==="Escape"?(L.preventDefault(),ie(!1)):L.key==="Tab"?(L.preventDefault(),(d.activeElement===E?v:E).focus()):L.key==="Enter"&&(L.preventDefault(),d.activeElement===v?ie(!0):d.activeElement===E&&ie(!1))},Se=L=>L.stopImmediatePropagation();m.addEventListener("keydown",xe,!0),m.addEventListener("keyup",Se,!0);let rt=()=>ie(!1);l?.addEventListener("abort",rt);let st,Sn=new Promise(L=>{st=L});function ie(L){if(he!==S)return;he=null,m.removeEventListener("keydown",xe,!0),m.removeEventListener("keyup",Se,!0),l?.removeEventListener("abort",rt);for(let re of j)re.removeAttribute("inert");g.dataset.state="closing",A?.isConnected&&typeof A.focus=="function"&&A.focus({preventScroll:!0});let P=m.getComputedStyle?.(g),W=Math.max(0,...String(P?.transitionDuration??"").split(",").map(re=>Number.parseFloat(re)*(re.trim().endsWith("ms")?1:1e3)||0)),oe=()=>g.remove();g.addEventListener("transitionend",re=>re.target===g&&oe()),setTimeout(oe,W+50),st(L)}return Sn}function Ut(n={}){let e=n.doc??globalThis.document,t=e.createElement("button");t.type="button",t.className="nc-ui-switch",t.setAttribute("role","switch"),n.id&&(t.id=n.id),n.labelledBy?t.setAttribute("aria-labelledby",n.labelledBy):n.label&&t.setAttribute("aria-label",n.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=n.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=n.offText??"Off",i.append(o,r),t.append(i);let s=!1,l=c=>{s=c===!0,t.setAttribute("aria-checked",s?"true":"false")};l(n.checked);let d=()=>{l(!s),n.onChange?.(s)};return t.addEventListener("click",d),{el:t,get checked(){return s},set:l,destroy(){t.removeEventListener("click",d),t.remove()}}}var qt=new WeakMap,gt=.25;function ga(n){let e=n.doc??globalThis.document,t=e.createElement("div");t.className="nc-fader",t.tabIndex=0,t.setAttribute("role","slider"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),t.append(i,o);let r=0,s=n.step??.005,l=n.onChange,d=n.onReset,c=p=>Math.min(1,Math.max(0,p)),u=()=>{t.style.setProperty("--fader-pos",String(r)),t.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},m=p=>{let h=c(p);h!==r&&(r=h,u(),l?.(h))},b=0,f=!1;t.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),t.focus?.({preventScroll:!0});let h=t.getBoundingClientRect();p.target!==o&&h.height>0&&m(1-(p.clientY-h.top)/h.height),b=p.clientY,f=!0,t.dataset.dragging="true",t.setPointerCapture?.(p.pointerId)}),t.addEventListener("pointermove",p=>{if(!f)return;let h=t.getBoundingClientRect().height||1,$=(b-p.clientY)/h*(p.shiftKey?gt:1);b=p.clientY,m(r+$)});let g=()=>{f=!1,delete t.dataset.dragging};t.addEventListener("pointerup",g),t.addEventListener("pointercancel",g),t.addEventListener("lostpointercapture",g),t.addEventListener("dblclick",p=>{p.preventDefault(),d?.()}),t.addEventListener("keydown",p=>{let h=p.shiftKey?s*gt:s,$={ArrowUp:r+h,ArrowRight:r+h,ArrowDown:r-h,ArrowLeft:r-h,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in $&&(p.preventDefault(),m($[p.key]))});let y={el:t,get value(){return r},get dragging(){return f},set(p){f||(r=c(Number(p)||0),u())},setText(p){p?t.setAttribute("aria-valuetext",p):t.removeAttribute("aria-valuetext")},setLabel(p){t.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(d=p.onReset)}};return y.setLabel(n.label),y.set(n.value??0),y.setText(n.valueText),qt.set(t,y),y}function ba(n){return qt.get(n)}var _t=new WeakMap,ya=.2,wa=1.5,$a=.5;function ka(n,e){let t=String(n??"").trim(),i=Number.parseFloat(t);return Number.isFinite(i)?t.endsWith("ms")?i/1e3:i:e}function bt(n,e,t){let i=n.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?t:ka(i.getComputedStyle(n).getPropertyValue(I(e)),t)}function va(n){let e=n.doc??globalThis.document,t=n.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(t);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<t;y++){let p=e.createElement("span");p.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let $=e.createElement("span");$.className="nc-meter-rms";let w=e.createElement("span");w.className="nc-meter-hold",p.append(h,$,w),r.append(p),s.push({peak:h,rms:$,hold:w,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(o,r);let l=n.label,d=n.onClear,c=!1,u=-1,m=-1,b=()=>{o.dataset.lit=c?"true":"false",o.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),o.title=c?"Clipped. Click to clear":"Clip light"},f=(y,p,h,$)=>{let w=Math.round($*1e3)/1e3;h[p]!==w&&(h[p]=w,y.style.transform=p==="hold"?`translateY(${Math.round((1-w)*1e3)/10}%)`:`scaleY(${w})`)};o.addEventListener("click",()=>{g.clear(),d?.()});let g={el:i,get clipped(){return c},update(y,p){u<0&&(u=bt(i,"motion-meter-fall",ya)),m<0&&(m=bt(i,"motion-meter-hold",wa));let h=Math.max(0,Math.min(.25,Number(p)||0)),$=u>0?Math.exp(-h/u):0;s.forEach((w,E)=>{let v=y[E]??y[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(v.peak)||0)),A=Math.min(S,Math.max(0,Number(v.rms)||0));v.over&&g.clip(),w.level.peak=S>=w.level.peak?S:S+(w.level.peak-S)*$,w.level.rms=A>=w.level.rms?A:A+(w.level.rms-A)*$,w.holdAge+=h,S>=w.holdAt?(w.holdAt=S,w.holdAge=0):w.holdAge>m&&(w.holdAt=Math.max(S,w.holdAt-$a*h)),f(w.peak,"peak",w.shown,w.level.peak),f(w.rms,"rms",w.shown,w.level.rms),f(w.hold,"hold",w.shown,w.holdAt),w.hold.dataset.off=w.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,f(y.peak,"peak",y.shown,0),f(y.rms,"rms",y.shown,0),f(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,b()},configure(y){y.onClear&&(d=y.onClear)}};return b(),g.reset(),_t.set(i,g),g}function xa(n){return n?_t.get(n):void 0}function Sa(n){let e=Math.max(1,n.clientWidth||0),t=Math.max(1,n.clientHeight||0),i=n.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*i)),r=Math.max(1,Math.floor(t*i));(n.width!==o||n.height!==r)&&(n.width=o,n.height=r);let s=n.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:t}}function He(n){return Math.max(0,Math.min(1,n))}function Kt(n,e){let{ctx:t,w:i,h:o}=Sa(n);if(!t)return;t.clearRect(0,0,i,o);let r=ca(n);if(e.paint==="swatch"){let d=R(n,"accent"),c=R(n,"rhythm.step-cell-on");n.dataset.ncAccent=d,n.dataset.ncStep=c,t.fillStyle=d,t.fillRect(0,0,i/2,o),t.fillStyle=c,t.fillRect(i/2,0,i/2,o);return}if(e.paint==="filter"){let d=e.mode??"lp",c=R(n,la(d)),u=R(n,"divider"),m=He(e.cutoff??.5),b=.08+(1-He(e.resonance??.2))*.22;t.strokeStyle=u,t.beginPath(),t.moveTo(0,o*.72),t.lineTo(i,o*.72),t.stroke(),t.beginPath();for(let f=0;f<=i;f++){let g=f/Math.max(1,i),y=0;d==="lp"?y=g<m?1:Math.max(0,1-(g-m)/b):d==="hp"?y=g>m?1:Math.max(0,1-(m-g)/b):y=Math.max(0,1-Math.abs(g-m)/b);let p=o*.78-y*o*.62;f===0?t.moveTo(f,p):t.lineTo(f,p)}t.strokeStyle=c,t.stroke(),t.fillStyle=R(n,"text-sub"),t.font=r,t.fillText(d.toUpperCase(),0,o),n.dataset.ncAccent=c;return}if(e.paint==="envelope"){t.strokeStyle=R(n,"accent"),t.beginPath();let d=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let u=c/Math.max(1,i),m=(o-4)*(1-Math.exp(-u*4/d));t.lineTo(c,o-m)}t.stroke(),n.dataset.ncAccent=t.strokeStyle;return}if(e.paint==="meter"){let d=He(e.level??0);t.fillStyle=R(n,"divider"),t.fillRect(0,o*.4,i,o*.2),t.fillStyle=R(n,"accent"),t.fillRect(0,o*.4,i*d,o*.2),n.dataset.ncAccent=t.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;t.fillStyle=R(n,"rhythm.step-cell-off"),t.fillRect(0,o*.45,i,o*.1),t.fillStyle=R(n,"rhythm.playhead"),t.fillRect(l/s*i,o*.3,Math.max(1,i/s),o*.4),n.dataset.ncAccent=R(n,"accent")}var Jt={slop:8,longPressMs:500,pitchPx:16},La=class{constructor(n,e,t=Jt){this.hit=n,this.emit=e,this.config=t,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(n,e,t,i){if(this.phase!=="idle")return!1;let o=this.hit(e,t);return o<0?!1:(this.phase="pending",this.pointer=n,this.pad=o,this.x0=e,this.y0=t,this.t0=i,this.degrees=0,!0)}tick(n){this.phase==="pending"&&n-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(n,e,t,i){if(n!==this.pointer)return;let o=e-this.x0,r=t-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,t);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(n,e,t,i){n===this.pointer&&(this.phase==="pending"&&this.move(n,e,t,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(n){n===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Aa(n,e,t,i=Jt){let o=!1,r=0,s=(c,u)=>{let m=n.ownerDocument.elementFromPoint?.(c,u),b=[...n.querySelectorAll(e)],f=m?b.findIndex(p=>p===m||p.contains(m)):-1;if(f>=0)return f;let g=-1,y=Number.POSITIVE_INFINITY;return b.forEach((p,h)=>{if(p.hidden)return;let $=p.getBoundingClientRect();if(u<$.top||u>$.bottom)return;let w=Math.abs(c-($.left+$.width/2));w<y&&w<=$.width&&(g=h,y=w)}),g},l=new La(s,c=>{(c.kind==="paint"||c.kind==="long")&&(o=!0),t(c)},i),d=()=>{r&&clearTimeout(r),r=0};return n.addEventListener("pointerdown",c=>{c.button>0||(o=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),n.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),n.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),n.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),n.addEventListener("click",c=>{o&&(o=!1,c.stopPropagation(),c.preventDefault())},!0),n.addEventListener("contextmenu",c=>c.preventDefault()),l}function C(){let n=document.createElement("i");return n.className="nc-token-probe",n.dataset.ncProbe="",n}function Ge(n,e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncRow="",t.dataset.ncId=n;let i=document.createElement("label");i.className="nc-label",i.htmlFor=n,i.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",t.append(i,o),t}function yt(n,e){let t=n.querySelector("[data-nc-probe]");n.textContent=e,t&&n.append(t)}function ye(n){if(!Number.isFinite(n))return"";let e=Math.round(n*100)/100;return String(e)}var Ma=450,wt=8;function D(){let n=document.createElement("span");return n.className="nc-hit",n.setAttribute("aria-hidden","true"),n}function Ea(n){let e=sa(n,"target-min");return e>0?e:44}function Ta(n){if(!(n instanceof HTMLElement))return;let e=[...n.querySelectorAll(".nc-hit")],t=Ea(n),i=t/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=t&&l.height>=t){s.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,u=d-i,m=d+i,b=c-i,f=c+i;for(let g=0;g<e.length;g++){if(r===g)continue;let y=o[g];if(!y||y.width===0)continue;let p=y.left+y.width/2,h=y.top+y.height/2;Math.abs(h-c)<i*2&&(p>d?m=Math.min(m,(d+p)/2):p<d&&(u=Math.max(u,(d+p)/2))),Math.abs(p-d)<i*2&&(h>c?f=Math.min(f,(c+h)/2):h<c&&(b=Math.max(b,(c+h)/2)))}u=Math.min(u,l.left),m=Math.max(m,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${b-l.top}px`,s.style.width=`${Math.max(0,m-u)}px`,s.style.height=`${Math.max(0,f-b)}px`,s.style.transform="none"}}function Qt(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function $t(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ie(n,e){switch(n.type){case"slider":return Ca(n,e);case"select":return Na(n,e);case"toggle":return za(n,e);case"button":return Ra(n,e);case"readout":return Ba(n);case"label":return ja(n);case"note":return kt(n);case"knob":return Za(n,e);case"choice":return Oa(n,e);case"slotRow":return Ya(n,e);case"stepGrid":return Fa(n,e);case"canvas":return Ua(n);case"fx":return Ja(n,e);case"strip":return qa(n,e);case"stripAdd":return Ka(n,e);default:return kt({id:"unknown",text:""})}}function U(n,e){if(!(!(n instanceof Element)||n.dataset.ncId!==e.id)){if(e.type==="slider"&&n instanceof HTMLElement){let t=n.querySelector("input"),i=n.querySelector("label");i&&(i.textContent=e.label),t instanceof HTMLInputElement&&(t.disabled=e.disabled===!0,en(t,e.modulated===!0),document.activeElement!==t&&(t.value=String(e.value)),e.valueText?t.setAttribute("aria-valuetext",e.valueText):t.removeAttribute("aria-valuetext"));let o=n.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??ye(e.value))}else if(e.type==="select"){let t=n.querySelector("select");t instanceof HTMLSelectElement&&document.activeElement!==t&&(t.value=e.value)}else if(e.type==="toggle"&&n instanceof HTMLButtonElement)n.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&n instanceof HTMLButtonElement)n.dataset.on=e.on?"true":"false",n.setAttribute("aria-pressed",e.on?"true":"false"),yt(n,e.label),e.ariaLabel?n.setAttribute("aria-label",e.ariaLabel):n.removeAttribute("aria-label");else if(e.type==="readout"){let t=n.querySelector("[data-nc-readout]");t&&(t.textContent=e.value)}else if(e.type==="label"||e.type==="note")yt(n,e.text);else if(e.type==="knob"){let t=n.querySelector(".nc-knob");t instanceof HTMLElement&&Wa(t,e);let i=n.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??ye(e.value))}else if(e.type==="choice")tn(n,e);else if(e.type==="slotRow")an(n,e);else if(e.type==="stepGrid")_e(n,e);else if(e.type==="canvas"&&n instanceof HTMLElement){let t=n.querySelector("canvas");t instanceof HTMLCanvasElement&&Kt(t,e)}else if(e.type==="strip"){ln(n,e);for(let t of e.sends??[]){let i=n.querySelector(`[data-nc-id="${Tt(t.id)}"]`);i instanceof Element&&U(i,{...t,type:"knob"})}}else if(e.type==="stripAdd")rn(n,e);else if(e.type==="fx"){cn(n,e);for(let t of[...e.controls,...e.more??[]]){let i=n.querySelector(`[data-nc-id="${Tt(t.id)}"]`);i instanceof Element&&U(i,t)}}}}function Ca(n,e){let t=Ge(n.id,n.label);t.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=n.id,i.min=String(n.min),i.max=String(n.max),i.step=String(n.step),i.value=String(n.value),i.disabled=n.disabled===!0,i.dataset.ncId=n.id,i.addEventListener("input",()=>{let r=e(i);r?.type==="slider"&&r.onChange(Number(i.value))}),i.addEventListener("change",()=>{let r=e(i);r?.type==="slider"&&r.onCommit?.(Number(i.value))});let o=t.querySelector("[data-nc-readout]");return t.insertBefore(i,o),n.onTap&&t.insertBefore(Ia(n,i,e),o),t.append(C()),U(t,n),t}function Ia(n,e,t){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=n.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${n.label.toLowerCase()}`),i.title=`Tap ${n.label.toLowerCase()}: tap the beat, two taps or more`,i.append(D());let o=r=>{let s=t(e);s?.type==="slider"&&s.onTap?.(r)};return i.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),i.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),i}function Na(n,e){let t=Ge(n.id,n.label),i=document.createElement("select");i.className="nc-select",i.id=n.id,i.dataset.ncId=n.id;for(let o of n.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,i.append(r)}return i.value=n.value,i.addEventListener("change",()=>{let o=e(i);o?.type==="select"&&o.onChange(i.value)}),t.append(i,C()),t}function za(n,e){let t=document.createElement("button");return t.type="button",t.className="nc-toggle",t.id=n.id,t.dataset.ncId=n.id,t.dataset.ncRow="",n.role&&(t.dataset.ncRole=n.role),t.textContent=n.label,t.addEventListener("click",()=>{let i=e(t);i?.type==="toggle"&&i.onPress()}),t.append(C()),U(t,n),t}function Ra(n,e){let t=document.createElement("button");if(t.type="button",t.className="nc-btn",t.id=n.id,t.dataset.ncId=n.id,t.addEventListener("click",()=>{let r=e(t);r?.type==="button"&&r.onPress()}),t.append(C()),U(t,n),!n.onSparkle)return t;let i=document.createElement("div");i.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=n.id,o.setAttribute("aria-label","Surprise me"),o.title=n.sparkleTitle??"Surprise me",o.innerHTML=Qt(),o.addEventListener("click",()=>{let r=t.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&on(r);let s=e(t);s?.type==="button"&&s.onSparkle?.()}),i.append(t,o),i}function Ba(n){let e=Ge(n.id,n.label);return e.append(C()),U(e,n),e}function ja(n){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=n.id,e.dataset.ncText="",e.textContent=n.text,e.append(C()),e}function kt(n){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=n.id,e.dataset.ncRow="",e.textContent=n.text,e.append(C()),e}function vt(n){if(typeof n.valueText=="string")return n.valueText;let e=ye(n.value),t=typeof n.unit=="string"?n.unit:"";return t===""?e:t==="%"?`${e}%`:`${e} ${t}`}function en(n,e){e?n.dataset.modulated="true":delete n.dataset.modulated}function Wa(n,e){let t=e.max-e.min||1,i=(e.value-e.min)/t;en(n,e.modulated===!0),n.style.setProperty("--knob-turn",String(Math.round(i*270))),n.setAttribute("role","slider"),n.setAttribute("aria-valuemin",String(e.min)),n.setAttribute("aria-valuemax",String(e.max)),n.setAttribute("aria-valuenow",String(e.value)),n.setAttribute("aria-valuetext",vt(e)),n.setAttribute("aria-label",e.ariaLabel??e.label),n.title=`${e.ariaLabel??e.label}: ${vt(e)}`}function Ga(n,e){let t=n.max-n.min||1,i=typeof n.step=="number"&&n.step>0?n.step:t/100,o=e.shiftKey?i/10:i;return e.key==="Home"?n.min:e.key==="End"?n.max:e.key==="PageUp"?n.value+i*10:e.key==="PageDown"?n.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?n.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?n.value-o:null}function Za(n,e){let t=Ge(n.id,n.label);n.compact&&(t.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=n.id;let o=document.createElement("i");o.className="nc-knob-mark",i.append(o);let r=0,s=0;i.addEventListener("pointerdown",d=>{r=d.clientY;let c=e(i);s=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(d.pointerId)}),i.addEventListener("pointermove",d=>{if(i.hasPointerCapture&&!i.hasPointerCapture(d.pointerId))return;let c=e(i);if(c?.type!=="knob")return;let u=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,s-(d.clientY-r)*u/120));c.onChange(m)}),i.addEventListener("dblclick",()=>{let d=e(i);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),i.addEventListener("keydown",d=>{let c=e(i);if(c?.type!=="knob")return;let u=Ga(c,d);u!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,u))))});let l=t.querySelector("[data-nc-readout]");return t.insertBefore(i,l),t.append(C()),U(t,n),t}function Oa(n,e){let t=document.createElement("div");t.className="nc-choice-row",t.dataset.ncId=n.id,t.dataset.ncRow="",t.setAttribute("role","tablist"),t.setAttribute("aria-label",n.label);for(let i of n.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=i.value,o.setAttribute("role","tab"),o.textContent=i.label,o.addEventListener("click",()=>{let r=e(t);r?.type==="choice"&&r.onChange(i.value)}),o.addEventListener("keydown",r=>{let s=[...t.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let c=s[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),t.append(o)}return t.append(C()),tn(t,n),t}function tn(n,e){for(let t of n.querySelectorAll("[data-nc-choice]")){if(!(t instanceof HTMLButtonElement))continue;let i=t.dataset.ncChoice===e.value;t.setAttribute("aria-selected",i?"true":"false"),t.tabIndex=i?0:-1}}function Ya(n,e){let t=document.createElement("div");t.className="nc-slot-row",t.dataset.ncRow="",t.dataset.ncId=n.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let u=0;u<n.slots.length;u++){let m=n.slots[u],b=document.createElement("span");b.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=m.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,D()),Pa(b,f,t,u,e),i.append(b)}let o=n.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Qt(),o.append(D()),o.addEventListener("click",()=>{on(t);let u=e(t);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(t);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...o?[o]:[]),t.append(c,r,C()),nn(t,e),an(t,n),t}function xt(n,e,t,i){let o=t(n);if(o?.type!=="slotRow")return;fe(n);let r=i.shiftKey?"store":i.altKey?"clear":"recall";o.onSlot(e,r)}function Pa(n,e,t,i,o){let r=0,s=0,l=0,d=!1,c=!1,u=!1,m=!1,b=()=>{window.clearTimeout(r),r=0},f=h=>{let $=h.clientX-s,w=h.clientY-l;$*$+w*w>wt*wt&&(d=!0,b())},g=()=>{m&&(m=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=h=>{let $=r!==0&&!d&&!c;b(),g(),$&&(u=!0,xt(t,i,o,h))},p=()=>{d=!0,b(),g()};n.addEventListener("pointerdown",h=>{h.button===0&&(g(),c=!1,d=!1,u=!1,s=h.clientX,l=h.clientY,b(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,Ha(t,e,i,o))},Ma),m=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),n.addEventListener("contextmenu",h=>h.preventDefault()),n.addEventListener("click",h=>{if(u||c||d){u=!1,c=!1,d=!1;return}xt(t,i,o,h)})}function nn(n,e){if(n.querySelector(".nc-slot-menu"))return;let t=document.createElement("div");t.className="nc-slot-menu",t.hidden=!0,t.setAttribute("role","menu"),t.setAttribute("aria-label","Slot");let i=St("Save","store"),o=St("Clear","clear");t.append(i,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),fe(n)}),r.addEventListener("click",s=>s.stopPropagation()),n.append(r,t),t.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=e(n);if(d?.type!=="slotRow")return;let c=Number(t.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),fe(n)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),fe(n))}),n.addEventListener("keydown",s=>{s.key==="Escape"&&fe(n)})}function St(n,e){let t=document.createElement("button");return t.type="button",t.className="nc-menu-btn",t.dataset.ncSlotOp=e,t.setAttribute("role","menuitem"),t.textContent=n,t}function Ha(n,e,t,i){nn(n,i);let o=n.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=n.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(t);let s=n.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function fe(n){let e=n.querySelector(".nc-slot-menu"),t=n.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),t instanceof HTMLElement&&(t.hidden=!0)}function an(n,e){for(let o of n.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let t=n.querySelector(".nc-morph");t instanceof HTMLInputElement&&document.activeElement!==t&&(t.value=String(e.morph));let i=n.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function on(n){let e=n.dataset.ncLastFill||null,t=_n(e);n.dataset.ncLastFill=t;let i=Kn(t);if(i)for(let[o,r]of Object.entries(i))n.style.setProperty(o,r)}function Xa(n,e){let t=document.createElement("button");t.type="button",t.className="nc-fill",t.dataset.ncFill="",t.textContent="Fill",t.title="Hold for a fill",t.setAttribute("aria-pressed","false");let i=!1,o=r=>{if(i===r)return;i=r,t.setAttribute("aria-pressed",r?"true":"false");let s=e(n);s?.type==="stepGrid"&&s.onFill?.(r)};t.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),t.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])t.addEventListener(r,()=>o(!1));return t.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),t.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),t.addEventListener("contextmenu",r=>r.preventDefault()),t}function Fa(n,e){let t=document.createElement("div");t.className="nc-section",t.dataset.ncId=n.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let o=p=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=p,i.append(h),h},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let h of[r,s]){let $=h===p;h.setAttribute("aria-checked",$?"true":"false"),h.tabIndex=$?0:-1}};l(r);for(let p of[r,s])p.addEventListener("click",()=>l(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let h=s.getAttribute("aria-checked")==="true"?r:s;l(h),h.focus()});let d=document.createElement("div");d.className="nc-step-tools",d.append(i),n.onFill&&d.append(Xa(t,e)),t.append(d);for(let p of n.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let $=document.createElement("button");$.type="button",$.className="nc-name",$.textContent=p.label,$.setAttribute("aria-label",`Select ${p.label}`),p.lane&&($.dataset.ncLane=String((p.lane-1)%4+1)),$.addEventListener("click",()=>{let v=e(t);if(v?.type!=="stepGrid")return;let S=v.rows.findIndex(A=>A.id===p.id);v.onSelectRow?.(S)}),$.addEventListener("keydown",v=>Da(t,$,v));let w=[];for(let v of["mute","solo"]){if(!(v==="mute"?n.onMute:n.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=v,A.textContent=v==="mute"?"M":"S",A.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${p.label}`),S.append(A,D()),S.addEventListener("click",()=>{let j=e(t);if(j?.type!=="stepGrid")return;let Y=j.rows.findIndex(K=>K.id===p.id);(v==="mute"?j.onMute:j.onSolo)?.(Y)}),w.push(S)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<p.steps.length;v++){let S=document.createElement("span");S.className="nc-step-wrap";let A=document.createElement("button");A.type="button",A.className="nc-step",A.dataset.ncStep=`${p.id}:${v}`,A.setAttribute("aria-label",`${p.label} step ${v+1}`),S.append(A,D()),S.addEventListener("click",j=>{let Y=e(t);if(Y?.type!=="stepGrid")return;let K=Y.rows.findIndex(Se=>Se.id===p.id),xe=s.getAttribute("aria-checked")==="true";Y.onToggle(K,v,j.shiftKey||xe)}),E.append(S)}if(n.onLength&&E.append(Va(t,E,p,e)),h.append(...w,$,E),n.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=p.id,v.setAttribute("aria-label",`Re-roll ${p.label}`),v.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=$t(),v.append(D()),v.addEventListener("click",()=>{let S=e(t);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(A=>A.id===p.id))}),h.append(v)}h.addEventListener("click",v=>{if(v.target!==h)return;let S=e(t);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(A=>A.id===p.id))}),Lt(t,E,".nc-step-wrap",e,s,()=>p.id),t.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let u=(p,h,$)=>{let w=document.createElement("button");return w.type="button",w.className=p,w.textContent=h,$&&w.setAttribute("aria-label",$),w},m=u("nc-pads-step","‹","Previous lane"),b=u("nc-pads-step","›","Next lane"),f=document.createElement(n.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),n.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let p=e(t);p?.type==="stepGrid"&&(t.dataset.ncLenMode==="true"?delete t.dataset.ncLenMode:t.dataset.ncLenMode="true",_e(t,p))}));for(let[p,h]of[[m,-1],[b,1]])p.addEventListener("click",()=>{let $=e(t);if($?.type!=="stepGrid"||$.rows.length===0)return;let w=$.rows.length;$.onSelectRow?.(((Ae($)+h)%w+w)%w)});if(c.append(m,f,b),n.onDice){let p=u("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=$t(),p.addEventListener("click",()=>{let h=e(t);if(h?.type!=="stepGrid")return;let $=Ae(h);$>=0&&h.onDice?.($)}),c.append(p)}if(n.transport){let p=u("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let h=e(t);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(p)}t.append(c);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...n.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(p),h.textContent=String(p+1),h.addEventListener("click",$=>{let w=e(t);if(w?.type!=="stepGrid")return;let E=Ae(w);if(E<0)return;if(t.dataset.ncLenMode==="true"){w.onLength?.(E,p+1);return}let v=s.getAttribute("aria-checked")==="true";w.onToggle(E,p,$.shiftKey||v)}),g.append(h)}return Lt(t,g,".nc-pad",e,s,()=>{let p=e(t);return p?.type==="stepGrid"?p.rows[Ae(p)]?.id:void 0}),t.append(g),t.append(C()),_e(t,n),t}function Ae(n){let e=n.rows.findIndex(t=>t.id===n.selectedRow);return e>=0?e:n.rows.length>0?0:-1}function Lt(n,e,t,i,o,r){let s="on",l=!0,d=-1,c=(u,m)=>{let b=u.rows[d]?.steps[m];!b||m>=u.rows[d].length||(u.onSet?u.onSet(d,m,s,l):!!b[s]!==l&&u.onToggle(d,m,s==="accent"))};Aa(e,t,u=>{let m=i(n);if(m?.type==="stepGrid"){if(n.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let b=m.rows.findIndex(f=>f.id===r());b>=0&&m.rows[b].length!==u.pad+1&&m.onLength?.(b,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let b=r();d=m.rows.findIndex(g=>g.id===b);let f=m.rows[d]?.steps[u.pad];if(!f)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[s]}c(m,u.pad)}else if(u.kind==="long"){let b=r(),f=m.rows.findIndex(y=>y.id===b),g=e.querySelectorAll(t)[u.pad];f>=0&&g instanceof HTMLElement&&m.onLongPress?.(f,u.pad,g)}}})}function Da(n,e,t){if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;let i=[...n.querySelectorAll(".nc-name")],o=i.indexOf(e),r=o;t.key==="ArrowDown"?r=o+1:t.key==="ArrowUp"?r=o-1:t.key==="Home"?r=0:r=i.length-1;let s=i[r];!(s instanceof HTMLElement)||s===e||(t.preventDefault(),s.focus(),s.click())}function Va(n,e,t,i){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(t.steps.length)),o.append(D());let r=c=>{let u=i(n);if(u?.type!=="stepGrid")return;let m=u.rows.findIndex(g=>g.id===t.id),b=u.rows[m];if(!b)return;let f=Math.max(1,Math.min(b.steps.length,c));f!==b.length&&u.onLength?.(m,f)},s=c=>{let u=[...e.querySelectorAll(".nc-step")],m=1;return u.forEach((b,f)=>{let g=b.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(m=f+1)}),m},l=c=>r(s(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete o.dataset.dragging};return o.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),o.addEventListener("keydown",c=>{let u=i(n);if(u?.type!=="stepGrid")return;let m=u.rows.find(f=>f.id===t.id);if(!m)return;let b={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),o}var Xe=new WeakMap;function At(n,e){let t=typeof e=="number"?e:null;if(!(Xe.has(n)&&Xe.get(n)===t)){if(Xe.set(n,t),t===null){for(let i of Object.keys(ft(1)))n.style.removeProperty(i);return}for(let[i,o]of Object.entries(ft(t)))n.style.setProperty(i,o)}}function _e(n,e){let t=e.rows.some(c=>c.solo),i=n.querySelector(".nc-pads"),o=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],r=n.querySelector(".nc-pads-label"),s=n.dataset.ncLenMode==="true"&&!!e.onLength;r instanceof HTMLElement&&o&&(r.textContent=s?`${o.label} · ${o.length}`:o.label,e.onLength&&(r.setAttribute("aria-pressed",s?"true":"false"),r.setAttribute("aria-label",s?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let l=n.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&o&&(l.setAttribute("aria-label",`Re-roll ${o.label}`),l.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=n.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!e.transport?.playing,u=e.transport?.label??(c?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",c?"true":"false");let m=e.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||t&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let c=o.length>0?(e.playhead%o.length+o.length)%o.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let m=Number(u.getAttribute("data-nc-pad")),b=o.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!b||!s&&m>=o.length,s&&m>=o.length?u.dataset.out="true":delete u.dataset.out,s&&m===o.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${o.label} step ${m+1}`),u.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?u.dataset.accent="true":delete u.dataset.accent,b?.dim?u.dataset.dim="true":delete u.dataset.dim,At(u,b?.velocity),e.playhead>=0&&m===c?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let c of e.rows){for(let b=0;b<c.steps.length;b++){let f=c.steps[b],g=n.querySelector(`[data-nc-step="${c.id}:${b}"]`);if(!(g instanceof HTMLButtonElement))continue;let y=g.closest(".nc-row");if(y instanceof HTMLElement){e.selectedRow===c.id?y.dataset.selected="true":delete y.dataset.selected;let $=y.querySelector(".nc-name");$ instanceof HTMLElement&&$.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||t&&!c.solo?y.dataset.silent="true":delete y.dataset.silent;for(let w of y.querySelectorAll("[data-nc-ms]")){let E=w.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;w.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",f.on?"true":"false"),f.accent?g.dataset.accent="true":delete g.dataset.accent,f.dim?g.dataset.dim="true":delete g.dataset.dim,b%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof f.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,f.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),At(g,f.velocity);let p=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;b===p?g.dataset.playhead="true":delete g.dataset.playhead;let h=!!e.onLength&&e.selectedRow===c.id;g.hidden=b>=c.length&&!h,b>=c.length&&h?g.dataset.out="true":delete g.dataset.out}let u=n.querySelector(`[data-nc-len="${c.id}"]`),m=n.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&m&&m.nextElementSibling!==u){let b=document.activeElement===u;m.after(u),b&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(c.length)),u.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),u.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Ua(n){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=n.id;let t=document.createElement("span");t.className="nc-label",t.textContent=n.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=n.id,i.dataset.ncPaint=n.paint,e.append(t,i,C()),e}function qa(n,e){let t=document.createElement("div");t.className="nc-strip",t.dataset.ncId=n.id,t.setAttribute("role","group"),t.setAttribute("aria-label",n.label),n.master&&(t.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let o=document.createElement("span");if(o.className="nc-strip-name",o.dataset.ncStripName="",i.append(o),n.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let g=e(t);g?.type==="strip"&&g.onRemove?.(f)}),i.append(f)}let r=document.createElement("div");r.className="nc-strip-ms";for(let f of["mute","solo"]){if(!(f==="mute"?n.onMute:n.onSolo))continue;let g=document.createElement("span");g.className="nc-ms-wrap";let y=document.createElement("button");y.type="button",y.className="nc-ms",y.dataset.ncMs=f,y.textContent=f==="mute"?"M":"S",g.append(y,D()),g.addEventListener("click",()=>{let p=e(t);p?.type==="strip"&&(f==="mute"?p.onMute:p.onSolo)?.()}),r.append(g)}let s=document.createElement("div");s.className="nc-strip-sends";for(let f of n.sends??[])s.append(Ie({...f,type:"knob",compact:!0},e));let l=document.createElement("div");l.className="nc-strip-body";let d=document.createElement("span");d.className="nc-scale",d.setAttribute("aria-hidden","true");for(let f of n.ticks??[]){let g=document.createElement("span");g.className="nc-scale-tick",g.style.setProperty("--tick-pos",String(f.value)),g.textContent=f.label,d.append(g)}let c=ga({label:`${n.label} level`,value:n.value,step:n.step,valueText:n.valueText,onChange:f=>{let g=e(t);g?.type==="strip"&&g.onChange(f)},onReset:()=>{let f=e(t);f?.type==="strip"&&Et(f)}}),u=va({channels:n.channels===2?2:1,label:n.label,onClear:()=>{let f=e(t);f?.type==="strip"&&f.onClipClear?.()}});l.append(d,c.el,u.el);let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let b=0;return m.addEventListener("click",f=>{let g=e(t);g?.type!=="strip"||!g.onTypeIn||(window.clearTimeout(b),f.detail===0?Mt(t,m,e):f.detail===1&&(b=window.setTimeout(()=>Mt(t,m,e),_a)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(b);let f=e(t);f?.type==="strip"&&Et(f)}),t.append(i,r,s,l,m,C()),ln(t,n),t}var _a=250;function Mt(n,e,t){let i=t(n);if(i?.type!=="strip"||!i.onTypeIn||n.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=i.valueText??ye(i.value),o.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let d=o.value;if(o.remove(),e.hidden=!1,l){let c=t(n);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function Ka(n,e){let t=document.createElement("div");t.className="nc-strip-add",t.dataset.ncId=n.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",i.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(t),d=s.value;sn(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),t.append(i,s,C()),rn(t,n),t}function rn(n,e){let t=n.querySelector(".nc-strip-add-label");t&&(t.textContent=e.label);let i=n.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(i.replaceChildren(...o.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),sn(i))}function sn(n){let e=n.options[0];e&&(e.selected=!0)}function Et(n){n.onReset?n.onReset():typeof n.defaultValue=="number"&&n.onChange(n.defaultValue)}function ln(n,e){let t=n.querySelector("[data-nc-strip-name]");t&&t.textContent!==e.label&&(t.textContent=e.label);let i=n.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),n.setAttribute("aria-label",e.label);let o=n.querySelector(".nc-fader"),r=o?ba(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),xa(n.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=n.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let l=e.valueText??ye(e.value);s.textContent!==l&&(s.textContent=l),s.setAttribute("aria-label",`${e.label} level ${l}`);let d=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${d}`:d}for(let l of n.querySelectorAll("[data-nc-ms]")){let d=l.getAttribute("data-nc-ms"),c=d==="mute"?e.mute===!0:e.solo===!0;l.setAttribute("aria-pressed",c?"true":"false"),l.setAttribute("aria-label",`${d==="mute"?"Mute":"Solo"} ${e.label}`)}e.silent?n.dataset.silent="true":delete n.dataset.silent,delete n.dataset.ncIdentity}function Ja(n,e){let t=document.createElement("div");t.className="nc-ui-fx",t.dataset.ncId=n.id,t.dataset.ncDepth=String(n.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${n.id}-name`,i.textContent=n.title,n.on===void 0)t.append(i);else{let o=document.createElement("div");o.className="nc-ui-fx-hd";let r=Ut({checked:n.on,labelledBy:i.id,onChange:s=>{let l=e(r.el);l?.type==="fx"&&l.onToggle?.(s)}});r.el.dataset.ncFxSwitch="",o.append(i,r.el),t.append(o)}for(let o of n.controls)t.append(Ie(o,e));if(n.more?.length){let o=document.createElement("details");o.className="nc-ui-more";let r=document.createElement("summary");r.textContent=n.moreLabel??"More",o.append(r);for(let s of n.more)o.append(Ie(s,e));t.append(o)}return t.append(C()),cn(t,n),t}function cn(n,e){let t=n.querySelector(".nc-ui-fx-name");t&&(t.textContent=e.title);let i=n.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?n.dataset.ncDim="true":delete n.dataset.ncDim}function Tt(n){return n.replace(/["\\]/g,"\\$&")}function Qa(n,e){for(let t of n.querySelectorAll("canvas")){if(!(t instanceof HTMLCanvasElement))continue;let i=e.find(o=>o.type==="canvas"&&o.id===t.dataset.ncId);i?.type==="canvas"&&Kt(t,i)}Ta(n)}var tt="netcomposer.rhythm.hidden.v1",H=new WeakMap;function Fe(){try{return globalThis.localStorage??null}catch{return null}}function dn(n,e=tt){try{let t=JSON.parse(n?.getItem(e)??"[]");return new Set(Array.isArray(t)?t.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Ct(n,e,t,i=tt){let o=dn(n,i);t?o.add(e):o.delete(e);try{n?.setItem(i,JSON.stringify([...o]))}catch{}}function nt(n){let e=[...n.controls??[],...(n.sections??[]).flatMap(i=>i.controls)],t=[];for(let i of e)t.push(i),i.type==="fx"&&t.push(...i.controls,...i.more??[]),i.type==="strip"&&t.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0})));return t}function ei(n,e){if(!(!n||!e))return nt(n).find(t=>t.id===e)}function ti(n){return`${`${n.layout??""}:${(n.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${nt(n).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(t=>`${t.id}/${t.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(t=>t.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}:${(e.sends??[]).map(t=>t.id).join(",")}:${(e.ticks??[]).map(t=>`${t.label}@${t.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(t=>t.id).join(",")}/${(e.more??[]).map(t=>t.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function ni(n,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,n.append(r);return}let t=document.createElement("div");t.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",t.append(i,o),n.append(t),un(n,e)}function un(n,e){if(!e.panel)return;let t=[...n.children].find(r=>r.classList.contains("nc-panel-hd")),i=t?.querySelector(".nc-panel-title"),o=t?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?n.dataset.ncLane=String(e.lane):delete n.dataset.ncLane}function ai(n){let e=n.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let t=H.get(e),i=n.getAttribute?.("data-nc-id")??n.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ei(t,i)}function ii(n,e){let t=e.sections??[{id:"main",controls:e.controls??[]}],i=ti(e);if(n.dataset.ncSignature===i){for(let o of t){let r=n.querySelector(`[data-nc-section="${It(o.id)}"]`);r&&un(r,o);for(let s of o.controls){let l=n.querySelector(`[data-nc-id="${It(s.id)}"]`);l instanceof Element&&U(l,s)}}return}n.dataset.ncSignature=i,n.replaceChildren(),e.layout==="console"?n.dataset.ncLayout="console":delete n.dataset.ncLayout;for(let o of t){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),ni(r,o);let s=o.panel?document.createElement("div"):r;o.panel&&(s.className="nc-panel-body",r.append(s));for(let l of o.controls)s.append(Ie(l,ai));n.append(r)}}function It(n){return n.replace(/["\\]/g,"\\$&")}function oi(n,e=tt){Dt();let t=document.createElement("section");t.className="nc nc-module",t.dataset.ncModule=n.id,t.dataset.ncOpen="true",t.dataset.ncPlace="adjacent",t.dataset.ncShade="1",n.lead&&(t.dataset.ncLead=""),n.compact&&(t.dataset.ncCompact="");let i=dn(Fe(),e).has(n.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${n.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Ut({labelledBy:r.id,onChange:h=>(H.get(t)??n).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,d);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",o.append(r,u,s);let m=document.createElement("div");m.className="nc-module-body",m.id=`${n.id}-body`;let b=document.createElement("button");b.type="button",b.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",b.append(f);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",t.append(g,o,m,b),t.setAttribute("aria-labelledby",r.id);let y=h=>{let $=H.get(t)??n;t.dataset.ncOpen=h?"false":"true",m.hidden=h,b.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${$.title}`),l.title=h?"Show":"Hide",h?t.dataset.ncSlim="":delete t.dataset.ncSlim};l.addEventListener("click",()=>{let h=t.dataset.ncOpen==="true";Ct(Fe(),(H.get(t)??n).id,h,e),y(h),Ke(t.parentElement)}),b.addEventListener("click",()=>{Ct(Fe(),(H.get(t)??n).id,!1,e),y(!1),Ke(t.parentElement)});let p={el:t,update(h){H.set(t,h),h.compact?t.dataset.ncCompact="":delete t.dataset.ncCompact,r.textContent=h.title,u.textContent=h.status??"",h.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,b.setAttribute("aria-label",`Show ${h.title}`),ii(m,h),y(m.hidden),p.redraw()},redraw(){let h=H.get(t);h&&Qa(t,nt(h))}};return H.set(t,n),y(i),p.update(n),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(t),p}function ri(n,e,t="adjacent"){Dt(n.ownerDocument),n.classList.add("nc-stack"),n.dataset.ncLayout=t==="stack"?"stack":"adjacent",n.replaceChildren();let i=t==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=i;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),n.append(o.el),o.redraw()}),Ke(n)}function Ke(n){if(!(n instanceof HTMLElement))return;if(n.dataset.ncLayout!=="adjacent"){n.style.removeProperty("--astrid-cols"),delete n.dataset.ncStackLast;return}let e=[...n.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),t=e.some(r=>r.hasAttribute("data-nc-lead")),i=e.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):t?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");n.style.setProperty("--astrid-cols",i.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));t&&e.length===4&&o.length===4?n.dataset.ncStackLast="true":delete n.dataset.ncStackLast}function si(n,e,t,i){const o=Math.min(t,n.length);for(let r=Math.max(0,e);r<o;r++)if(Math.abs(n[r]??0)>=i)return r;return-1}function li(n,e,t,i=.35){let o=0;for(let l=0;l<n.length;l++)o=Math.max(o,Math.abs(n[l]??0));if(o<.01)return null;const r=[];for(const l of e){const d=si(n,l,l+t,o*i);d>=0&&r.push(d-l)}if(r.length*2<e.length||r.length===0)return null;r.sort((l,d)=>l-d);const s=Math.floor(r.length/2);return r.length%2?r[s]??0:((r[s-1]??0)+(r[s]??0))/2}const ci="/lucy/assets/capture-processor-DaZ9hnJi.js",di="instance",ui=99;function pn(n=typeof location>"u"?"":location.search){const e=new URLSearchParams(n).get(di)?.trim()??"";if(!/^\d+$/.test(e))return 1;const t=Number(e);return t>=2&&t<=ui?t:1}function hn(n,e){return e===1?n:`${n}#${e}`}function pi(n,e){return e===1?n:`${n} ${e}`}let le;function hi(n,e=pn()){if(le!==void 0)return le;le=null;try{if(typeof window>"u"||window.parent===window)return le;const t=window.parent.ncStudio;t&&t.version===1&&(le=t.attach(n,{instance:e}))}catch{}return le}function mi(){let n;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(n=i.syncScope)}}catch{}if(!n)return{};const e=`/studio/${n}`,t=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:t?{request:(i,o,r)=>t.request(`${i}${e}`,o,r)}:null}}const Ne={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1},Nt=new Set([1,2,4,8]);function fi(n){const e=n&&typeof n=="object"?n:{},t=(l,d,c)=>typeof l=="number"&&Number.isFinite(l)&&l>=d&&l<=c?l:null,i=Array.isArray(e.takes)?e.takes.flatMap(l=>{const d=l&&typeof l=="object"?l:{},c=t(d.id,1,1e9),u=t(d.bars,1,8),m=t(d.bpm,20,300),b=t(d.sampleRate,8e3,192e3),f=t(d.channels,1,2),g=t(d.frames,0,1e9);return c===null||u===null||!Nt.has(u)||m===null||b===null||f===null||g===null?[]:d.saved!==!0?[]:[{id:c,bars:u,bpm:m,sampleRate:b,channels:f,frames:g,created:String(d.created??""),saved:!0}]}):[],o=t(e.bars,1,8),r=t(e.selected,1,1e9),s=Math.max(t(e.nextId,1,1e9)??1,...i.map(l=>l.id+1));return{bars:o!==null&&Nt.has(o)?o:Ne.bars,monitor:typeof e.monitor=="boolean"?e.monitor:Ne.monitor,roundTripMs:t(e.roundTripMs,0,1e3),nudgeMs:t(e.nudgeMs,-10,10)??0,takes:i,selected:r!==null&&i.some(l=>l.id===r)?r:i.at(-1)?.id??null,nextId:s}}function gi(n,e=mn()){try{const t=e?.getItem(n);return t?fi(JSON.parse(t)):{...Ne,takes:[]}}catch{return{...Ne,takes:[]}}}function bi(n,e,t=mn()){try{t?.setItem(n,JSON.stringify(e))}catch{}}function mn(){try{return globalThis.localStorage??null}catch{return null}}function De(n,e){return`${n}-take-${e}.f32`}class yi{constructor(e){this.prefix=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(e,t){this.memory.set(e,t);const i=await this.folder();if(!i)return!1;try{const r=await(await i.getFileHandle(De(this.prefix,e),{create:!0})).createWritable?.();if(!r)return!1;for(const s of t)await r.write(s);return await r.close(),!0}catch{return!1}}async load(e){const t=this.memory.get(e.id);if(t)return t;const i=await this.folder();if(!i)return null;try{const o=await(await i.getFileHandle(De(this.prefix,e.id))).getFile(),r=new Float32Array(await o.arrayBuffer()),s=Array.from({length:e.channels},(l,d)=>r.slice(d*e.frames,(d+1)*e.frames));return this.memory.set(e.id,s),s}catch{return null}}async remove(e){this.memory.delete(e);const t=await this.folder();try{await t?.removeEntry(De(this.prefix,e))}catch{}}}function wi(n,e){const t=n[0]?.length??0,i=n.length,o=t*i*4,r=new DataView(new ArrayBuffer(44+o)),s=(d,c)=>{for(let u=0;u<c.length;u++)r.setUint8(d+u,c.charCodeAt(u))};s(0,"RIFF"),r.setUint32(4,36+o,!0),s(8,"WAVE"),s(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,3,!0),r.setUint16(22,i,!0),r.setUint32(24,e,!0),r.setUint32(28,e*i*4,!0),r.setUint16(32,i*4,!0),r.setUint16(34,32,!0),s(36,"data"),r.setUint32(40,o,!0);let l=44;for(let d=0;d<t;d++)for(let c=0;c<i;c++)r.setFloat32(l,n[c]?.[d]??0,!0),l+=4;return new Uint8Array(r.buffer)}const ue=4,$i=[1,2,4,8];function fn(n){return Math.ceil(n/ue-1e-6)*ue+0}function ki(n,e,t=0){let i=fn(n);return i-n<t&&(i+=ue),{startBeat:i,endBeat:i+e*ue}}function vi(n,e,t,i){const o=Math.round((n+t)*i);return{startFrame:o,endFrame:o+Math.round((e-n)*i)}}function xi(n,e,t=0){let i=fn(n);i-n<t&&(i+=ue);const o=e*ue,r=(i%o+o)%o;return{startBeat:i,offsetBeats:r}}function Je(n){return 60/n}const Si="LUCY Audio",Li="lucy",ne=pn(),gn=hn("lucy.state",ne),bn=.15,k=gi(gn),ve=new yi(hn("lucy",ne)),_=()=>bi(gn,k);let te=!1,M={kind:"idle"},de=!1,N="",ze=0,Ee=0;const ae=new Nn({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let x=null,Te=null;const Ai=new Hn({...mi(),app:pi(Si,ne),version:"0.1.0",clock:ae,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const n=x?.state;return n==="running"?"running":n==="suspended"?"suspended":n?"none":"needs-gesture"}}),Re=n=>n+(Te?.offset??0),O=()=>ae.transport,Be=()=>O().isPlayingAt(V()),Qe=()=>Be()&&!te,J=hi(Li,ne);let F=null,z=null,q=null,Q=null,Ze=1,yn=!1,zt=null;function we(){return zt??=(async()=>{J?(x=J.ctx,F=J.output,Te=J.mapper??new dt(J.ctx)):(x=new AudioContext({latencyHint:"interactive"}),F=x.destination,Te=new dt(x)),Te.start();try{await x.audioWorklet.addModule(ci)}catch{return N="Audio could not start (the recorder's worklet did not load). Reload to try again.",T(),!1}z=new AudioWorkletNode(x,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),z.port.onmessage=e=>Mi(e.data);const n=new GainNode(x,{gain:0});return z.connect(n).connect(F),q=new GainNode(x,{gain:0}),q.connect(F),$e(k.monitor),!0})(),zt}async function at(){if(Q)return!0;if(!await we()||!x||!z||!q)return!1;x.state!=="running"&&await x.resume().catch(()=>{});try{const n=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}}}),t=n.getAudioTracks()[0]?.getSettings()??{};return Ze=Math.max(1,Math.min(2,t.channelCount??1)),yn=!!(t.echoCancellation||t.noiseSuppression||t.autoGainControl),Q=x.createMediaStreamSource(n),Q.connect(z),Q.connect(q),N="",T(),!0}catch{return N="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",T(),!1}}function $e(n){k.monitor=n,_(),q&&x&&q.gain.setTargetAtTime(n&&!de?1:0,x.currentTime,.01),Ee=0,T()}let X=null,ge=null;function Mi(n){if(n.type==="level"&&typeof n.peak=="number"){ze=n.peak;const e=performance.now();k.monitor&&Q&&ze>.97?(Ee||=e,e-Ee>1500&&($e(!1),N="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):Ee=0,Yi();return}if(n.type==="chunk"&&n.id!==void 0&&n.channels){(!X||X.id!==n.id)&&(X={id:n.id,parts:[]}),X.parts.push(n.channels);return}if(n.type==="done"&&n.id!==void 0){const e=X?.id===n.id?X.parts:[];X=null;const t=Ei(e);if(ge&&n.id===wn){ge(t),ge=null;return}Ii(n.id,t)}}function Ei(n){const e=n[0]?.length??0,t=n.reduce((i,o)=>i+(o[0]?.length??0),0);return Array.from({length:e},(i,o)=>{const r=new Float32Array(t);let s=0;for(const l of n){const d=l[o];d&&(r.set(d,s),s+=d.length)}return r})}function it(){const n=k.nudgeMs/1e3;if(k.roundTripMs!==null)return k.roundTripMs/1e3+n;const e=x;return(e?.baseLatency??0)+(e?.outputLatency??0)+.01+n}async function Ti(n,e){const t=performance.now()+e;for(;!n();){if(performance.now()>t)return!1;await new Promise(i=>setTimeout(i,20))}return!0}async function Ci(){if(M.kind!=="idle"){z?.port.postMessage({type:"cancel"}),M={kind:"idle"},X=null,T();return}if(!await at()||!x||!z)return;if(O().running||ae.play({at:V()}),te=!1,!await Ti(()=>O().running,2e3)){N="The clock did not start.",T();return}const n=O(),e=bn/Je(n.bpm),{startBeat:t,endBeat:i}=ki(Math.max(0,n.beatAt(V())),k.bars,e),o=Re(n.timeAt(t)),r=Re(n.timeAt(i)),{startFrame:s,endFrame:l}=vi(o,r,it(),x.sampleRate),d=k.nextId++;_(),z.port.postMessage({type:"record",id:d,startFrame:s,endFrame:l,channels:Ze}),M={kind:"armed",id:d,startBeat:t,endBeat:i},N="",T()}async function Ii(n,e){if(M.kind==="idle"||M.id!==n||!x)return;M={kind:"idle"};const t=e[0]?.length??0;if(t===0){N="Nothing was recorded.",T();return}const i={id:n,bars:k.bars,bpm:O().bpm,sampleRate:x.sampleRate,channels:e.length,frames:t,created:new Date().toISOString(),saved:!1};i.saved=await ve.save(n,e),i.saved||(N="This take is kept until you reload: this browser has no file storage here."),k.takes.push(i),k.selected=n,_(),await ke(n)}let Z=null,be=null;async function ke(n){k.selected=n,_();const e=k.takes.find(i=>i.id===n);if(!e||!x){Z=null,je(!0),T();return}const t=await ve.load(e);if(!t)N=`Take ${e.id} could not be read.`,Z=null;else{const i=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});t.forEach((o,r)=>i.copyToChannel(o,r)),Z={id:e.id,audio:i}}je(!0),T()}function Rt(n){if(be){try{be.node.stop(n??0)}catch{}be=null}}function je(n=!1){const e=k.takes.find(c=>c.id===Z?.id);if(!x||!F||!Z||!e||!Qe()){Rt();return}const t=O(),i=JSON.stringify([Z.id,t.startTime,t.bpm,e.bars]);if(!n&&be?.stamp===i)return;const o=bn/Je(t.bpm),{startBeat:r,offsetBeats:s}=xi(Math.max(0,t.beatAt(V())),e.bars,o),l=Re(t.timeAt(r));Rt(l);const d=new AudioBufferSourceNode(x,{buffer:Z.audio,loop:!0});d.playbackRate.value=t.bpm/e.bpm,d.connect(F),d.start(Math.max(l,x.currentTime),s*Je(e.bpm)),be={node:d,stamp:i}}const wn=0;async function Ni(){if(de||M.kind!=="idle"||!await at()||!x||!z||!F)return;de=!0,$e(k.monitor),N="Calibrating: speakers on, keep quiet for two seconds…",T();const n=x.sampleRate,e=x.currentTime+.3,t=[0,.5,1,1.5].map(c=>e+c),i=Math.round((e-.05)*n),o=Math.round((e+2.2)*n),r=new Promise(c=>{ge=c,setTimeout(()=>c(null),4e3)});z.port.postMessage({type:"record",id:wn,startFrame:i,endFrame:o,channels:1});for(const c of t){const u=new OscillatorNode(x,{frequency:2e3}),m=new GainNode(x,{gain:0});m.gain.setValueAtTime(.8,c),m.gain.setValueAtTime(0,c+.004),u.connect(m).connect(F),u.start(c),u.stop(c+.01)}const s=await r;ge=null,de=!1;const l=s?.[0],d=l?li(l,t.map(c=>Math.round(c*n)-i),Math.round(.4*n)):null;d===null?N="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(k.roundTripMs=Math.round(d/n*1e4)/10,N=`Round trip ${k.roundTripMs} ms: takes are shifted by it.`,_()),$e(k.monitor)}async function zi(){if(await we(),x&&x.state!=="running"&&await x.resume().catch(()=>{}),J&&Be()){te=!te,je(!0),T();return}Be()?ae.stop({at:V()}):(te=!1,ae.play({at:V()}))}ae.onChange(()=>{O().running||(te=!1,M.kind!=="idle"&&(z?.port.postMessage({type:"cancel"}),M={kind:"idle"})),je(),T()});async function Ri(){const n=k.takes.find(o=>o.id===k.selected);if(!n)return;const e=await ve.load(n);if(!e)return;const t=new Blob([wi(e,n.sampleRate)],{type:"audio/wav"}),i=document.createElement("a");i.href=URL.createObjectURL(t),i.download=`lucy${ne>1?`-${ne}`:""}-take-${n.id}-${Math.round(n.bpm)}bpm-${n.created.slice(0,10)}.wav`,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),1e4)}async function Bi(){const n=k.selected;n===null||!await fa({title:`Delete take ${n}?`,body:"It is gone from this browser for good.",confirmLabel:"Delete"})||(await ve.remove(n),k.takes=k.takes.filter(t=>t.id!==n),_(),await ke(k.takes.at(-1)?.id??null))}const B=(n,e={},...t)=>{const i=document.createElement(n);for(const[o,r]of Object.entries(e))i.setAttribute(o,r);return i.append(...t),i},$n=document.getElementById("app");$n.classList.add("nc","nc-page");const ji=B("header",{class:"nc-page-hd"},B("div",{},B("h1",{class:"nc-page-title"},B("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",B("span",{class:"nc-page-sep"},"/")," AUDIO ",B("span",{class:"nc-page-sep"},"/")," ",B("span",{class:"nc-mono"},String(ne).padStart(2,"0"))),B("p",{class:"nc-page-sub"},"A NetComposer element."))),kn=B("div",{class:"nc-stack","data-nc-layout":"adjacent"});$n.append(ji,B("main",{class:"nc-page-body"},kn));function vn(){const n=O();if(M.kind!=="idle"){const e=n.beatAt(V());if(e<M.startBeat){const i=Math.ceil((M.startBeat-e)/4);return`Armed: recording in ${i} bar${i===1?"":"s"}`}const t=Math.floor((e-M.startBeat)/4)+1;return`Recording bar ${Math.min(t,k.bars)} of ${k.bars}`}return Be()?te?"Sitting out":Z?`Playing take ${Z.id}`:"Playing (no take yet)":k.takes.length?"Stopped":"Arm to record a take"}function Wi(){const n=M.kind!=="idle";return{id:"transport",title:"Transport",lead:!0,controls:[{type:"button",id:"play",label:Qe()?"Stop":"Play",on:Qe(),onPress:()=>void zi()},{type:"button",id:"arm",label:M.kind==="armed"?"Armed":M.kind==="recording"?"Recording":"Record",on:n,ariaLabel:n?"Cancel the take":"Record a take from the next bar",onPress:()=>void Ci()},{type:"choice",id:"bars",label:"Length (bars)",value:String(k.bars),options:$i.map(e=>({value:String(e),label:`${e} bar${e===1?"":"s"}`})),onChange:e=>{k.bars=Number(e),_(),T()}},{type:"readout",id:"status",label:"Status",value:vn()}]}}function Gi(){return{id:"input",title:"Input",controls:[Q?{type:"readout",id:"source",label:"Input",value:`${Ze===2?"Stereo":"Mono"} · ${Math.round((x?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void at()},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,ze)},{type:"choice",id:"monitor",label:"Monitor",value:k.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:n=>$e(n==="on")},...yn?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...N?[{type:"note",id:"notice",text:N}]:[]]}}function Zi(){return{id:"takes",title:"Takes",controls:k.takes.length?[{type:"choice",id:"take",label:"Take",value:String(k.selected??""),options:k.takes.map(n=>({value:String(n.id),label:`Take ${n.id}`})),onChange:n=>void ke(Number(n))},{type:"button",id:"download",label:"Download",on:!1,onPress:()=>void Ri()},{type:"button",id:"delete",label:"Delete",on:!1,onPress:()=>void Bi()}]:[{type:"note",id:"none",text:"No takes yet. Press Record: it starts on the next bar."}]}}function Oi(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:k.roundTripMs===null?`${Math.round(it()*1e3)} ms (estimate)`:`${k.roundTripMs} ms`},{type:"button",id:"calibrate",label:de?"Listening…":"Calibrate",on:de,onPress:()=>void Ni()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:k.nudgeMs,valueText:`${k.nudgeMs>0?"+":""}${k.nudgeMs} ms`,onChange:n=>{k.nudgeMs=n,_(),T()}}]}}const ot=[Wi,Gi,Zi,Oi].map(n=>({def:n,handle:oi(n())}));ri(kn,ot.map(n=>n.handle),"adjacent");function T(){for(const n of ot)n.handle.update(n.def())}function Yi(){const n=ot[1];n&&n.handle.update(n.def())}let Bt="";function xn(){if(M.kind!=="idle"){const e=O();M.kind==="armed"&&e.beatAt(V())>=M.startBeat&&(M={...M,kind:"recording"})}const n=vn();n!==Bt&&(Bt=n,T()),requestAnimationFrame(xn)}requestAnimationFrame(xn);Ai.start();if(J)we().then(()=>ke(k.selected));else{const n=()=>{we().then(()=>ke(k.selected))};document.addEventListener("pointerdown",n,{once:!0,capture:!0}),document.addEventListener("keydown",n,{once:!0,capture:!0})}window.__lucy={state:k,clock:ae,get ctx(){return x},get phase(){return M},get level(){return ze},roundTrip:it,toContext:Re,takeAudio:n=>{const e=k.takes.find(t=>t.id===n);return e?ve.load(e):null},async testInput(n,e=1){if(!await we()||!x||!z||!q)return;const t=n(x);t.connect(z),t.connect(q),Q=t,Ze=e,T()}};
