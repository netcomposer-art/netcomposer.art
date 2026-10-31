(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const be=1e-9;function Pa(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class _t{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Pa(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+be&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+be)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+be){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-be;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(e-o)*l/s,n+i*(l-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new _t({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+be)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+be)return n[i];return n[0]}}const Ga=Object.freeze({beatsPerBar:4,beatUnit:4}),xe=1e-9;function Fa(t){return Math.floor(t+xe)}function Pn(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-xe)*e;return n&&r<=t+xe?r+e:r}class Ha{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new _t({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ga}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-xe&&(this.stopTime===null||e<this.stopTime-xe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-xe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=Fa(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return Pn(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Gn="nc-clock/snapshot",Fn=1;function _a(t,e="local"){return{format:Gn,version:Fn,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Da(t,e){const n=Ya(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const K=t=>typeof t=="number"&&Number.isFinite(t),en=t=>t===null||K(t);function Ya(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Gn&&n("format"),(!K(e.version)||Math.floor(e.version)!==Fn)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!K(e.anchor.beat)||!K(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&K(i.beat)&&K(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!K(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!K(e.meter.beatUnit))&&n("meter"),(!en(e.startTime)||!en(e.stopTime)||!K(e.stoppedBeat))&&n("transport times"),e}class Za{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Ha(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){Da(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return _a(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Xa="nc-sync/1",Va=1,Ua="nc-sync",qa="nc-sync-leader",Ka=0,Hn=.5,_n=.75;function Ja(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Hn&&t<=_n?t:null}const wt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Te=t=>typeof t=="number"&&Number.isFinite(t),Ye=t=>typeof t=="string"&&t.length>0;function Qa(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Va||!Ye(e.type)||!Ye(e.from)||!Te(e.term)||!Te(e.seq)||!Te(e.sentAt))return null;switch(e.type){case"hello":return Ye(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return Te(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&Te(e.slot)?e:null;case"ping":case"pong":return Ye(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function ei(t,e,n,i,r){return{proto:Xa,from:e,term:n,seq:i,sentAt:r,...t}}function Ce(){return(performance.timeOrigin+performance.now())/1e3}const vt=.003,ti=3,ni=.01,tn=500;class ai{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?ni:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=vt&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,p=this.preStep;p.length=0;for(let m=0;m<c.length;m++)p.push(c[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,u=e-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=vt&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<tn)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=vt)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<tn)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(ti,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class ii{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...wt,...e.capabilities},this.channelOption=e.channel??Ua,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Pn(u,1),u);i&&i>0?(s.tempo.rampTempo(e,c,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(_n,Math.max(Hn,e)):Ka;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Ja(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Qa(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...wt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...wt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(qa,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(ei(e,this.id,this.term,++this.seq,this.o.now()))}}const ri="modulepreload",oi=function(t){return"/studio/"+t},nn={},si=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=oi(c),c in nn)return;nn[c]=!0;const p=c.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":ri,p||(f.as="script"),f.crossOrigin="",f.href=c,u&&f.setAttribute("nonce",u),document.head.appendChild(f),p)return new Promise((y,g)=>{f.addEventListener("load",y),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};var li=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Tt=[.25,.5,.75,1,1.5,2],ci=4.9,O={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},ce={fmt:"wet"},X={fmt:"pct"},ye={fmt:"db"},Ze={fmt:"signedPct"},$t={fmt:"num",suffix:" ms"},R={div:100};function M(t,e,n,i,r,o,s,l){var u={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function Xe(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var je=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:O.hpHz,astrid:!0,zero:"off"}),M("q","Resonance",0,100,0,2,{fmt:"q",law:O.hpQ},{dsp:{law:O.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[M("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:O.bpHz,astrid:!0},{dsp:{law:O.bpHz}}),M("q","Q",0,100,0,2,{fmt:"q",law:O.bpQ},{dsp:{law:O.bpQ}}),M("mix","Mix",0,100,100,3,ce,{dsp:R,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[M("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Xe(li),overriddenBy:"beats_free",tempoSynced:!0}),M("feedback","Feedback",0,90,35,2,X,{dsp:R,unit:"%"}),M("mix","Wet/dry",0,100,0,3,ce,{dsp:R,unit:"%",astridKey:"wet"}),M("tone","Tone",0,100,100,4,{fmt:"hz",law:O.delayTone,offAt:100},{dsp:{div:99},more:!0}),M("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Xe([[0,"Insert"],[1,"Send"]]),more:!0}),M("send","Send",0,100,100,7,X,{dsp:R,unit:"%",more:!0}),M("mod_send","Accent → send",-100,100,0,8,Ze,{dsp:R,unit:"%",more:!0}),M("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[M("predelay","Pre-delay",0,200,0,1,$t,{dsp:{div:1e3},unit:"ms"}),M("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:R,unit:"%"}),M("decay","Decay",0,100,50,3,X,{dsp:R,unit:"%"}),M("damping","Damping",0,100,0,4,X,{dsp:R,unit:"%"}),M("mix","Mix",0,100,0,5,ce,{dsp:R,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[M("rate","Rate",0,100,26,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:R,unit:"%"}),M("feedback","Feedback",-90,90,50,3,Ze,{dsp:R,unit:"%"}),M("mix","Mix",0,100,50,4,ce,{dsp:R,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[M("rate","Rate",0,100,52,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),M("depth","Depth",0,100,50,2,X,{dsp:R,unit:"%"}),M("spread","Spread",0,100,70,3,X,{dsp:R,unit:"%"}),M("mix","Mix",0,100,40,4,ce,{dsp:R,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[M("rate","Rate",0,100,39,1,{fmt:"rate",law:O.rate},{dsp:{law:O.rate}}),M("depth","Depth",0,100,70,2,X,{dsp:R,unit:"%"}),M("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Xe([[4,"4"],[6,"6"],[8,"8"]])}),M("feedback","Feedback",0,90,30,4,X,{dsp:R,unit:"%"}),M("mix","Mix",0,100,50,5,ce,{dsp:R,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[M("low_db","Low",-18,18,0,1,ye,{unit:"dB"}),M("mid_db","Mid",-18,18,0,2,ye,{unit:"dB"}),M("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:O.midHz,astrid:!0},{dsp:{law:O.midHz}}),M("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:O.eqQ},{dsp:{law:O.eqQ}}),M("high_db","High",-18,18,0,4,ye,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[M("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),M("output_db","Output",-12,12,0,2,ye,{unit:"dB"}),M("mix","Mix",0,100,100,3,ce,{dsp:R,unit:"%"}),M("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Xe([[0,"Smooth"],[1,"Acid"]]),more:!0}),M("tone","Tone",0,100,100,5,{fmt:"hz",law:O.driveTone,offAt:100},{dsp:{div:99},more:!0}),M("mod_drive","Accent → drive",-100,100,0,6,Ze,{dsp:R,unit:"%",more:!0}),M("mod_tone","Accent → tone",-100,100,0,7,Ze,{dsp:R,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[M("threshold_db","Threshold",-60,0,0,1,ye,{unit:"dB"}),M("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:O.ratio},{dsp:{law:O.ratio}}),M("attack_ms","Attack",1,100,10,3,$t,{unit:"ms"}),M("release_ms","Release",10,1e3,150,4,$t,{unit:"ms"}),M("makeup_db","Makeup",0,24,0,5,ye,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[M("width","Width",0,200,100,1,X,{dsp:R,unit:"%"}),M("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:R})]}],di=je.map(function(t){return t.type}),ui=je.filter(function(t){return!t.hidden}).map(function(t){return t.type}),pi={reverb:"plate"};function Dt(t){var e=pi[t]||t;return di.indexOf(e)>=0?e:null}function U(t){for(var e=Dt(t),n=0;n<je.length;n++)if(je[n].type===e)return je[n];return null}function ke(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Dn(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=ke(n.law,e);return i===null?0:i}function an(t,e){return Math.min(ci,t*60/(e>0?e:120))}var rn=function(t){return t>0?"+":t<0?"−":""};function hi(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Yn(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:rn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return rn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=ke(i.law,e),r===null?i.zero||"open":i.astrid?hi(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+ke(i.law,e).toFixed(1);case"ratio":return ke(i.law,e).toFixed(1)+":1";case"rate":return r=ke(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(an(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(an(e,n)*1e3)+" ms"}return String(e)}var mi=1,ut=["drive","delay","plate"];function fi(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return Yn(t,i,r)},e}var Se=ut.map(function(t){var e=U(t),n={type:t,label:e.label,dials:e.dials.map(fi)};return e.tempoSynced&&(n.tempoSynced=!0),n}),gi={reverb:"plate"};function nt(t){var e=gi[t]||t;return ut.indexOf(e)>=0?e:null}function pt(t){for(var e=nt(t),n=0;n<Se.length;n++)if(Se[n].type===e)return Se[n];return null}function Zn(t,e){var n=pt(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Le(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function re(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function bi(){return{v:mi,chain:Se.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function yi(t){return Tt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Tt[0])}function kt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function wi(t){for(var e=Array.isArray(t)?t:kt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=bi(),r={},o=[],s=0;s<e.length;s++){var l=e[s];if(kt(l)){var u=nt(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(r[u]){o.push(u);continue}r[u]=!0;var c=i.chain[ut.indexOf(u)],p=kt(l.dials)?l.dials:{};u==="delay"&&p.mix===void 0&&p.wet!==void 0&&(p=Object.assign({},p,{mix:p.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,pt(u).dials.forEach(function(m){c.dials[m.key]=re(m,p[m.key])}),vi(u,c.dials,p)}}return{state:i,dropped:o}}function vi(t,e,n){for(var i=pt(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=re(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Le(o,e)))}}function at(t){return wi(t).state}function $i(t){return JSON.parse(JSON.stringify(t))}var ki=24,Ct={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function It(t,e,n){if(e==="bypass")return n?0:1;var i=Zn(t,e)||xi(t,e);return i?Dn(i,n):0}function xi(t,e){var n=U(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var Si={};Se.forEach(function(t){t.dials.forEach(function(e){Si[t.type+"."+e.key]=e.format})});function xt(t,e){var n=new Float64Array(ki),i=at(t);return i.chain.forEach(function(r){var o=Ct[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=It(r.type,s,r.dials[s])})}),n}var Ai=2,it=3,Li=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ie(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Xn(t,e){var n=U(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function Ei(t){var e=U(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function Mi(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function Ti(t){return typeof t=="number"&&isFinite(t)?yi(t):t}function on(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=Ti(o)),i[r.key]=re(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=re(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],Le(r,i)))}),i}function Ci(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=ke(n.law,o),l=s===null?1/0:Math.abs(s-e);l<r&&(r=l,i=o)}return i}}var Ii={rate:"rate_hz"};function Ni(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Ii[o.key]||o.key;r[o.key]=Ci(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function zi(t,e){var n=e>0?Math.floor(e):it,i=[],r=[],o=[],s=!1,l=!1;Array.isArray(t)?(o=t,l=!0):Ie(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,l=t.schema===2);for(var u=[],c=0;c<o.length;c++){var p=o[c];if(Ie(p)&&!(p.type==="limiter"||p.fixed===!0)){var m=Dt(p.type),f=m&&U(m);if(!f||s&&["drive","delay","plate"].indexOf(m)<0){typeof p.type=="string"&&i.push(p.type);continue}if(u.length>=n){i.push(p.id||m);continue}var y;Ie(p.params)&&!Ie(p.dials)?y=on(f,Ni(f,p.params,r,p.id||m),l):y=on(f,Ie(p.dials)?p.dials:{},l);var g=Xn(m,u),b=typeof p.id=="string"&&Li.test(p.id)&&!u.some(function(h){return h.id===p.id})?p.id:g.id,d=s?p.bypass!==!1:p.bypass===!0;u.push({id:s?g.id:b,type:m,bypass:d,dials:y})}}return{state:{v:Ai,chain:u},dropped:i,notes:r}}function Ke(t,e){return zi(t,e).state}function we(t){var e=U(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,Dn(i,t.dials[i.key])])}),n}function Ri(t){var e=Ke(t,8),n=[],i=e.chain.map(function(r,o){var s=U(r.type),l={};return o>=it&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=r.dials[u.key];if(u.more){c!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&Tt.indexOf(c)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:i,lossy:n}}var Oi="nc-fx@1",Bi=600,ji=256,Wi=8,Ne=typeof WeakMap=="function"?new WeakMap:null;function Pi(t,e){var n=Ne&&Ne.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await si(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Ne&&(Ne.set(t,n),n.catch(function(){Ne.delete(t)})),n)}function ve(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Vn(t,e,n,i){var r=Math.min(400,Math.max(20,ve(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=ve(e.preGain,1),c=Math.max(0,ve(e.crossfade,.012)),p=ve(e.maxDelaySeconds,void 0),m=t.createGain(),f=t.createGain(),y=t.createGain(),g=t.createGain(),b=null;e.modInput===!0&&(b=t.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),g.gain.value=0,m.connect(y),y.connect(f),g.connect(f);var d={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},h=n(r);d.post=function(v){d.node?d.node.port.postMessage(v):d.disposed||(o.length>=ji&&(o=i().concat([{t:"tempo",bpm:d.bpm,when:0}])),o.push(v))};function $(v){var x=o.map(function(w){var S=Object.assign({},w);return S.when>v||(S.when=0,S.t!=="clear"&&(S.snap=!0)),S});return o=[],x}d.emit=function(v){for(var x=0;x<d.listeners.length;x++)try{d.listeners[x](v)}catch(w){typeof console<"u"&&console.error(w)}},d.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var k=!1;d.tooFar=function(v){return typeof v=="number"&&v>t.currentTime+Bi?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=Pi(t,e.moduleUrl).then(function(){if(!d.disposed){var v=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:p},h);v.pending=$(t.currentTime),d.node=new AudioWorkletNode(t,Oi,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),m.connect(d.node),b&&b.connect(d.node,0,1),d.node.connect(g);var x=t.currentTime;x<=0||c===0?(y.gain.value=0,g.gain.value=1):(y.gain.setValueAtTime(1,x),y.gain.linearRampToValueAtTime(0,x+c),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+c)),d.status="ready"}},function(v){d.status="unavailable",o=[],d.error=v});return d.core={input:m,output:f,modInput:b,ready:E,get status(){return d.status},get error(){return d.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(v,x){var w=ve(v,NaN);!(w>0)||d.disposed||d.tooFar(x)||(d.bpm=Math.min(400,Math.max(20,w)),d.post({t:"tempo",bpm:d.bpm,when:d.whenOf(x)}),d.emit({effect:null,key:"tempo",value:d.bpm}))},getTempo:function(){return d.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(d.disposed||d.tooFar(x.at))){var w=ve(x.fadeMs,0);d.post({t:"clear",when:d.whenOf(x.at),fadeMs:w>0?Math.min(1e3,w):0})}},onChange:function(v){return d.listeners.push(v),function(){var x=d.listeners.indexOf(v);x>=0&&d.listeners.splice(x,1)}},dispose:function(){if(!d.disposed){if(d.disposed=!0,d.status="disposed",o=[],d.listeners.length=0,d.node){d.node.port.postMessage({t:"dispose"}),d.node.port.close();try{d.node.disconnect()}catch{}}[m,y,g,f,b].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},d}function sn(t,e){var n=e||{};if(n.slots)return Gi(t,n);var i=at(n.state),r=Array.from(xt(i)),o=Vn(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(xt(i)),when:0}]}),s=o.core;function l(u){return i.chain[ut.indexOf(u)]}return s.setParam=function(u,c,p,m){var f=nt(u);if(!(!f||o.disposed||o.tooFar(m))){var y=l(f),g;if(c==="bypass")g=!!p;else{var b=Zn(f,c);if(!b)return;g=re(b,p,Le(b,y.dials))}return c==="bypass"?y.bypass=g:y.dials[c]=g,o.post({t:"p",i:Ct[f][c],v:It(f,c,g),when:o.whenOf(m)}),o.emit({effect:f,key:c,value:g}),pt(f).dials.forEach(function(d){if(!(!d.stepWhen||!d.stepWhen.some(function(k){return k.key===c}))){var h=y.dials[d.key],$=re(d,h,Le(d,y.dials));$!==h&&(y.dials[d.key]=$,o.post({t:"p",i:Ct[f][d.key],v:It(f,d.key,$),when:o.whenOf(m)}),o.emit({effect:f,key:d.key,value:$}))}}),g}},s.getParam=function(u,c){var p=nt(u);if(p){var m=l(p);return c==="bypass"?m.bypass:m.dials[c]}},s.getState=function(){return $i(i)},s.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(i=at(u),o.post({t:"load",program:Array.from(xt(i)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function Gi(t,e){var n=e.slots===!0?it:Math.max(1,Math.min(Wi,Math.floor(+e.slots)||it)),i=Ke(e.state,n),r=1,o={};function s(d){return o[d.id]||(o[d.id]=r++),o[d.id]}function l(d){return d.map(function(h){return{uid:s(h),type:h.type,program:we(h)}})}var u=l(i.chain),c=i.chain.map(function(d){return o[d.id]}),p=Vn(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(i.chain),order:i.chain.map(function(d){return o[d.id]}),when:0}]}),m=p.core;function f(d){var h;for(h=0;h<i.chain.length;h++)if(i.chain[h].id===d)return i.chain[h];var $=Dt(d);if($){for(h=0;h<i.chain.length;h++)if(i.chain[h].type===$)return i.chain[h]}return null}function y(d,h){var $=s(d);p.post({t:"add",uid:$,type:d.type,when:h}),we(d).forEach(function(k){p.post({t:"ps",uid:$,k:k[0],v:k[1],when:h,snap:!0})})}function g(d){p.post({t:"order",uids:i.chain.map(function(h){return o[h.id]}),when:d})}function b(d,h){var $={};i.chain.forEach(function(v){$[v.id]=v});var k=i.chain.map(function(v){return o[v.id]}).join();d.chain.forEach(function(v){var x=$[v.id];if(!x||x.type!==v.type){delete o[v.id],y(v,h);return}var w={};we(x).forEach(function(S){w[S[0]]=S[1]}),we(v).forEach(function(S){w[S[0]]!==S[1]&&p.post({t:"ps",uid:o[v.id],k:S[0],v:S[1],when:h})})});var E={};d.chain.forEach(function(v){E[v.id]=!0}),Object.keys(o).forEach(function(v){E[v]||delete o[v]}),i=d,i.chain.map(function(v){return o[v.id]}).join()!==k&&g(h)}return m.slots=n,m.setParam=function(d,h,$,k){var E=f(d);if(!(!E||p.disposed||p.tooFar(k))){var v=U(E.type),x,w=null;if(h==="bypass")x=!!$;else{for(var S=0;S<v.dials.length;S++)v.dials[S].key===h&&(w=v.dials[S]);if(!w)return;x=re(w,$,Le(w,E.dials))}var T={},A={};we(E).forEach(function(L){T[L[0]]=L[1]}),v.dials.forEach(function(L){L.stepWhen&&(A[L.key]=E.dials[L.key])}),h==="bypass"?E.bypass=x:E.dials[h]=x,v.dials.forEach(function(L){L.stepWhen&&(E.dials[L.key]=re(L,E.dials[L.key],Le(L,E.dials)))});var N=p.whenOf(k),H=o[E.id];return we(E).forEach(function(L){(T[L[0]]!==L[1]||w&&L[0]===w.k)&&p.post({t:"ps",uid:H,k:L[0],v:L[1],when:N})}),p.emit({effect:E.id,key:h,value:x}),Object.keys(A).forEach(function(L){L!==h&&E.dials[L]!==A[L]&&p.emit({effect:E.id,key:L,value:E.dials[L]})}),x}},m.getParam=function(d,h){var $=f(d);if($)return h==="bypass"?$.bypass:$.dials[h]},m.getState=function(){return JSON.parse(JSON.stringify(i))},m.setState=function(d,h){p.disposed||p.tooFar(h&&h.at)||(b(Ke(d,n),p.whenOf(h&&h.at)),p.emit({effect:null,key:null,value:null}))},m.addEffect=function(d,h){var $=h||{},k=Xn(d,i.chain);if(!(!k||i.chain.length>=n||p.disposed||p.tooFar($.at))){if($.dials){var E=Ke({v:2,chain:[{id:k.id,type:k.type,dials:$.dials}]},1).chain[0];k.dials=E.dials}$.bypass===!0&&(k.bypass=!0);var v=i.chain.slice(),x=typeof $.index=="number"?Math.max(0,Math.min(v.length,$.index)):v.length;return v.splice(x,0,k),b({v:2,chain:v},p.whenOf($.at)),p.emit({effect:k.id,key:"chain",value:"add"}),k.id}},m.removeEffect=function(d,h){var $=f(d),k=h&&h.at;return!$||p.disposed||p.tooFar(k)?!1:(b({v:2,chain:i.chain.filter(function(E){return E!==$})},p.whenOf(k)),p.emit({effect:$.id,key:"chain",value:"remove"}),!0)},m.moveEffect=function(d,h,$){var k=f(d),E=$&&$.at;if(!k||p.disposed||p.tooFar(E))return!1;var v=Mi(i.chain,i.chain.indexOf(k),h);return v===i.chain?!1:(b({v:2,chain:v},p.whenOf(E)),p.emit({effect:k.id,key:"chain",value:"move"}),!0)},m.getChain=function(){return i.chain.map(function(d){return{id:d.id,type:d.type,name:Ei(d),bypass:d.bypass}})},m.toAstrid=function(){return Ri(i)},m}function ln(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Un(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=e&&e.transport?e.transport:e,u=l&&l.tempo?l.tempo:l,c=!1;function p(f){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof f!="number")){var y=o(l.timeAt(f));return typeof y=="number"&&isFinite(y)?y:void 0}}function m(){var f=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(f)){var y=l&&typeof l.bpm=="number"?l.bpm:ln(u,0);y>0&&t.setTempo(y);return}var g=ln(u,f);g>0&&t.setTempo(g);for(var b=u&&(u.points||u.tempoPoints)||[],d=0;d<b.length;d++){var h=b[d];if(h.beat>f&&h.bpm>0){var $=p(h.beat);$!==void 0&&t.setTempo(h.bpm,$)}}}return m(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,p(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&m())})}const Nt="/studio/assets/worklet-CnpUVY5i.js";var Fi="nc-ui",qn={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},zt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ue={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Re=t=>`--${Fi}-${t}`,Rt=qn["label-on-fill-dark"],cn=qn["label-on-fill-light"],Hi=ue["label-min-contrast"],_i=/^#[0-9a-f]{6}$/i,Di=t=>typeof t=="string"&&_i.test(t),Je=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function dn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Je(r(0)*255)}${Je(r(8)*255)}${Je(r(4)*255)}`}function Kn(t){let[e,n,i]=[1,3,5].map(c=>parseInt(t.slice(c,c+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/l%6):r===n?60*((i-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:s}}function un(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Ot(t,e){let[n,i]=[un(t),un(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var rt=t=>Ot(t,Rt)>=Ot(t,cn)?Rt:cn;function Jn(t,e,n,i=Hi){let r=dn(t,e,n),o=rt(r)===Rt?1:-1;for(let s=0;s<40&&Ot(r,rt(r))<i;s++)n+=o*.01,r=dn(t,e,n);return r}function Yi(t){let{h:e,s:n}=Kn(t),i=Jn(e,Math.min(n,ue["surprise-on-max-saturation"]),ue["surprise-on-lightness"]);return{fill:t,ink:rt(t),on:i,onInk:rt(i)}}var Zi=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Xi(t,e=Math.random){let[n,i]=ue["surprise-saturation"],[r,o]=ue["surprise-lightness"],s=ue["surprise-min-hue-gap"],l=Di(t)?Kn(t).h:null,u=e()*360;return l!==null&&Zi(u,l)<s&&(u=(l+s+e()*(360-2*s))%360),Jn(u,n+e()*(i-n),r+e()*(o-r))}function Vi(t){if(!t)return null;let e=Yi(t);return{[Re("surprise-fill")]:e.fill,[Re("surprise-ink")]:e.ink,[Re("surprise-on")]:e.on,[Re("surprise-on-ink")]:e.onInk}}var Ui=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,qi=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function pn(t){let[e,n,i]=[1,3,5].map(l=>Ui(parseInt(t.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Ki([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>Je(qi(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ji=ue["velocity-range"],Qn={min:zt.rhythm["velocity-min"],max:zt.rhythm["velocity-max"]};function Qi(t,e=Qn){let[n,i]=Ji,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=zt.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let l=pn(e.min),u=pn(e.max);return{velocity:r,t:o,fill:Ki(l.map((c,p)=>c+(u[p]-c)*o)),ink:s}}function hn(t,e=Qn){return{[Re("velocity-fill")]:Qi(t,e).fill}}var er={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},tr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","fader-cap-master":"color","strip-hacks-text":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},nr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ar={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ht={};for(let[t,e]of Object.entries(tr))ht[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(ar))ht[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(nr))ht[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(er.renames.map(t=>[t.old,t.new]));function ea(t){let e=ht[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function P(t){return ea(t).prop}function a(t){return`var(${P(t)})`}function ir(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(P(e)));return Number.isFinite(n)?n:0}function Y(t,e){let n=ea(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function rr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function or(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var sr="[data-modulated], [data-modulated] *";function lr(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${P("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${P("divider")}: ${a(`module-div-stack-${i}`)};
      ${P("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${P("text-sub")}: ${a("module-sub-stack-1")};
      ${P("divider")}: ${a("module-div-stack-1")};
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
${sr} { transition: none; }
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
  ${P("text-sub")}: ${a("module-sub-stack-1")};
  ${P("divider")}: ${a("module-div-stack-1")};
  ${P("slider-track")}: ${a("module-div-stack-1")};
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
  ${P("text-sub")}: ${a("module-sub-stack-1")};
  ${P("divider")}: ${a("module-div-stack-1")};
  ${P("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${P("text-sub")}: inherit;
  ${P("divider")}: inherit;
  ${P("slider-track")}: inherit;
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
`}var St=null,cr="nc-ui-fallback";function ta(t=globalThis.document){if(!t?.documentElement||(t.documentElement,St&&St.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${cr} {
${lr()}
}
`,t.head.append(e),St=e}var ze=null,dr=0,ur=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,na=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=ur,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&na(document);function pr({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l}){if(ze||l?.aborted)return Promise.resolve(!1);let u=o?.ownerDocument??document,c=na(u),p=o??u.body,m=u.defaultView??globalThis,f=`nc-ui-confirm-${++dr}`,y=(I,D,B)=>{let fe=u.createElement(I);return fe.className=`nc-ui-confirm${D}`,B!=null&&(fe.textContent=B),fe},g=y("div","-layer");g.dataset.state="enter";let b=y("div","");b.setAttribute("role","alertdialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-labelledby",`${f}-t`),b.setAttribute("aria-describedby",`${f}-b`);let d=y("h2","-title",t);d.id=`${f}-t`;let h=y("p","-body",e);h.id=`${f}-b`;let $=y("div","-actions"),k=(I,D)=>{let B=y("button","-btn",I);return B.type="button",B.dataset.ncConfirm=D,B.addEventListener("click",()=>q(D==="ok")),B},E=k(i,"cancel"),v=k(n,"ok");r&&(v.dataset.danger="true"),$.append(E,v),b.append(d,h,$),g.append(b);let x={layer:g};ze=x;let w=s??u.activeElement,S=[];for(let I of p.children)I.hasAttribute("inert")||(I.setAttribute("inert",""),S.push(I));let T=()=>{if(ze!==x)return;p.append(g),E.focus({preventScroll:!0});let I=m.requestAnimationFrame?.bind(m)??(D=>setTimeout(D,16));I(()=>I(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};c?c.then(T):T();let A=!1;g.addEventListener("pointerdown",I=>{A=I.target===g}),g.addEventListener("click",I=>{I.target===g&&A&&q(!1),A=!1});let N=I=>{I.stopImmediatePropagation(),I.key==="Escape"?(I.preventDefault(),q(!1)):I.key==="Tab"?(I.preventDefault(),(u.activeElement===E?v:E).focus()):I.key==="Enter"&&(I.preventDefault(),u.activeElement===v?q(!0):u.activeElement===E&&q(!1))},H=I=>I.stopImmediatePropagation();m.addEventListener("keydown",N,!0),m.addEventListener("keyup",H,!0);let L=()=>q(!1);l?.addEventListener("abort",L);let z,Qt=new Promise(I=>{z=I});function q(I){if(ze!==x)return;ze=null,m.removeEventListener("keydown",N,!0),m.removeEventListener("keyup",H,!0),l?.removeEventListener("abort",L);for(let ge of S)ge.removeAttribute("inert");g.dataset.state="closing",w?.isConnected&&typeof w.focus=="function"&&w.focus({preventScroll:!0});let D=m.getComputedStyle?.(g),B=Math.max(0,...String(D?.transitionDuration??"").split(",").map(ge=>Number.parseFloat(ge)*(ge.trim().endsWith("ms")?1:1e3)||0)),fe=()=>g.remove();g.addEventListener("transitionend",ge=>ge.target===g&&fe()),setTimeout(fe,B+50),z(I)}return Qt}function aa(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let u=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var ia=new WeakMap,mn=.25;function hr(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,l=t.onChange,u=t.onReset,c=d=>Math.min(1,Math.max(0,d)),p=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},m=d=>{let h=c(d);h!==o&&(o=h,p(),l?.(h))},f=0,y=!1;n.addEventListener("pointerdown",d=>{if(d.button!==0)return;d.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();d.target!==r&&h.height>0&&m(1-(d.clientY-h.top)/h.height),f=d.clientY,y=!0,n.dataset.dragging="true",n.setPointerCapture?.(d.pointerId)}),n.addEventListener("pointermove",d=>{if(!y)return;let h=n.getBoundingClientRect().height||1,$=(f-d.clientY)/h*(d.shiftKey?mn:1);f=d.clientY,m(o+$)});let g=()=>{y=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",d=>{d.preventDefault(),u?.()}),n.addEventListener("keydown",d=>{let h=d.shiftKey?s*mn:s,$={ArrowUp:o+h,ArrowRight:o+h,ArrowDown:o-h,ArrowLeft:o-h,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};d.key in $&&(d.preventDefault(),m($[d.key]))});let b={el:n,get value(){return o},get dragging(){return y},set(d){y||(o=c(Number(d)||0),p())},setText(d){d?n.setAttribute("aria-valuetext",d):n.removeAttribute("aria-valuetext")},setLabel(d){n.setAttribute("aria-label",d)},configure(d){typeof d.step=="number"&&d.step>0&&(s=d.step),d.onChange&&(l=d.onChange),d.onReset&&(u=d.onReset)}};return b.setLabel(t.label),b.set(t.value??0),b.setText(t.valueText),ia.set(n,b),b}function mr(t){return ia.get(t)}var ra=new WeakMap,fr=.2,gr=1.5,br=.5;function yr(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function fn(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:yr(i.getComputedStyle(t).getPropertyValue(P(e)),n)}function wr(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let d=e.createElement("span");d.className="nc-meter-bar";let h=e.createElement("span");h.className="nc-meter-peak";let $=e.createElement("span");$.className="nc-meter-rms";let k=e.createElement("span");k.className="nc-meter-hold",d.append(h,$,k),o.append(d),s.push({peak:h,rms:$,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let l=t.label,u=t.onClear,c=!1,p=-1,m=-1,f=()=>{r.dataset.lit=c?"true":"false",r.setAttribute("aria-pressed",c?"true":"false"),r.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),r.title=c?"Clipped. Click to clear":"Clip light"},y=(b,d,h,$)=>{let k=Math.round($*1e3)/1e3;h[d]!==k&&(h[d]=k,b.style.transform=d==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};r.addEventListener("click",()=>{g.clear(),u?.()});let g={el:i,get clipped(){return c},update(b,d){p<0&&(p=fn(i,"motion-meter-fall",fr)),m<0&&(m=fn(i,"motion-meter-hold",gr));let h=Math.max(0,Math.min(.25,Number(d)||0)),$=p>0?Math.exp(-h/p):0;s.forEach((k,E)=>{let v=b[E]??b[0]??{peak:0,rms:0},x=Math.min(1,Math.max(0,Number(v.peak)||0)),w=Math.min(x,Math.max(0,Number(v.rms)||0));v.over&&g.clip(),k.level.peak=x>=k.level.peak?x:x+(k.level.peak-x)*$,k.level.rms=w>=k.level.rms?w:w+(k.level.rms-w)*$,k.holdAge+=h,x>=k.holdAt?(k.holdAt=x,k.holdAge=0):k.holdAge>m&&(k.holdAt=Math.max(x,k.holdAt-br*h)),y(k.peak,"peak",k.shown,k.level.peak),y(k.rms,"rms",k.shown,k.level.rms),y(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,y(b.peak,"peak",b.shown,0),y(b.rms,"rms",b.shown,0),y(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,f()},configure(b){b.onClear&&(u=b.onClear)}};return f(),g.reset(),ra.set(i,g),g}function oa(t){return t?ra.get(t):void 0}function vr(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function At(t){return Math.max(0,Math.min(1,t))}function sa(t,e){let{ctx:n,w:i,h:r}=vr(t);if(!n)return;n.clearRect(0,0,i,r);let o=or(t);if(e.paint==="swatch"){let u=Y(t,"accent"),c=Y(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,i/2,r),n.fillStyle=c,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let u=e.mode??"lp",c=Y(t,rr(u)),p=Y(t,"divider"),m=At(e.cutoff??.5),f=.08+(1-At(e.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let y=0;y<=i;y++){let g=y/Math.max(1,i),b=0;u==="lp"?b=g<m?1:Math.max(0,1-(g-m)/f):u==="hp"?b=g>m?1:Math.max(0,1-(m-g)/f):b=Math.max(0,1-Math.abs(g-m)/f);let d=r*.78-b*r*.62;y===0?n.moveTo(y,d):n.lineTo(y,d)}n.strokeStyle=c,n.stroke(),n.fillStyle=Y(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,r),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=Y(t,"accent"),n.beginPath();let u=Math.max(.05,e.decay??.4);for(let c=0;c<=i;c++){let p=c/Math.max(1,i),m=(r-4)*(1-Math.exp(-p*4/u));n.lineTo(c,r-m)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="meter"){let u=At(e.level??0);n.fillStyle=Y(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=Y(t,"accent"),n.fillRect(0,r*.4,i*u,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=Y(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=Y(t,"rhythm.playhead"),n.fillRect(l/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=Y(t,"accent")}var la={slop:8,longPressMs:500,pitchPx:16},$r=class{constructor(t,e,n=la){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function kr(t,e,n,i=la){let r=!1,o=0,s=(c,p)=>{let m=t.ownerDocument.elementFromPoint?.(c,p),f=[...t.querySelectorAll(e)],y=m?f.findIndex(d=>d===m||d.contains(m)):-1;if(y>=0)return y;let g=-1,b=Number.POSITIVE_INFINITY;return f.forEach((d,h)=>{if(d.hidden)return;let $=d.getBoundingClientRect();if(p<$.top||p>$.bottom)return;let k=Math.abs(c-($.left+$.width/2));k<b&&k<=$.width&&(g=h,b=k)}),g},l=new $r(s,c=>{(c.kind==="paint"||c.kind==="long")&&(r=!0),n(c)},i),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",c=>{c.button>0||(r=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{r&&(r=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}function _(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function mt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function gn(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Pe(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var xr=450,bn=8;function J(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Sr(t){let e=ir(t,"target-min");return e>0?e:44}function Ar(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=Sr(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,p=u-i,m=u+i,f=c-i,y=c+i;for(let g=0;g<e.length;g++){if(o===g)continue;let b=r[g];if(!b||b.width===0)continue;let d=b.left+b.width/2,h=b.top+b.height/2;Math.abs(h-c)<i*2&&(d>u?m=Math.min(m,(u+d)/2):d<u&&(p=Math.max(p,(u+d)/2))),Math.abs(d-u)<i*2&&(h>c?y=Math.min(y,(c+h)/2):h<c&&(f=Math.max(f,(c+h)/2)))}p=Math.min(p,l.left),m=Math.max(m,l.right),f=Math.min(f,l.top),y=Math.max(y,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,m-p)}px`,s.style.height=`${Math.max(0,y-f)}px`,s.style.transform="none"}}function ca(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function yn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ot(t,e){switch(t.type){case"slider":return Lr(t,e);case"select":return Mr(t,e);case"toggle":return Tr(t,e);case"button":return Cr(t,e);case"readout":return Ir(t);case"label":return Nr(t);case"note":return wn(t);case"knob":return Or(t,e);case"choice":return Br(t,e);case"slotRow":return jr(t,e);case"stepGrid":return Fr(t,e);case"canvas":return Dr(t);case"fx":return Vr(t,e);case"strip":return Yr(t,e);case"stripAdd":return Xr(t,e);default:return wn({id:"unknown",text:""})}}function oe(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,da(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??Pe(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),gn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")gn(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&zr(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??Pe(e.value))}else if(e.type==="choice")ua(t,e);else if(e.type==="slotRow")ha(t,e);else if(e.type==="stepGrid")Bt(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&sa(n,e)}else if(e.type==="strip"){ba(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${jt(n.id)}"]`);i instanceof Element&&oe(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")fa(t,e);else if(e.type==="fx"){ya(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${jt(n.id)}"]`);i instanceof Element&&oe(i,n)}}}}function Lr(t,e){let n=mt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(Er(t,i,e),r),n.append(_()),oe(n,t),n}function Er(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(J());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function Mr(t,e){let n=mt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,_()),n}function Tr(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(_()),oe(n,t),n}function Cr(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(_()),oe(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=ca(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&ma(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function Ir(t){let e=mt(t.id,t.label);return e.append(_()),oe(e,t),e}function Nr(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(_()),e}function wn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(_()),e}function vn(t){if(typeof t.valueText=="string")return t.valueText;let e=Pe(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function da(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function zr(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;da(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",vn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${vn(e)}`}function Rr(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function Or(t,e){let n=mt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",u=>{o=u.clientY;let c=e(i);s=c&&"value"in c?Number(c.value):0,i.setPointerCapture?.(u.pointerId)}),i.addEventListener("pointermove",u=>{if(i.hasPointerCapture&&!i.hasPointerCapture(u.pointerId))return;let c=e(i);if(c?.type!=="knob")return;let p=c.max-c.min||1,m=Math.min(c.max,Math.max(c.min,s-(u.clientY-o)*p/120));c.onChange(m)}),i.addEventListener("dblclick",()=>{let u=e(i);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),i.addEventListener("keydown",u=>{let c=e(i);if(c?.type!=="knob")return;let p=Rr(c,u);p!==null&&(u.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(i,l),n.append(_()),oe(n,t),n}function Br(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(r)}return n.append(_()),ua(n,t),n}function ua(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function jr(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let p=0;p<t.slots.length;p++){let m=t.slots[p],f=document.createElement("span");f.className="nc-snap-wrap";let y=document.createElement("button");y.type="button",y.className="nc-snap",y.dataset.ncSlot=String(p),y.textContent=m.label,y.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(y,J()),Wr(f,y,n,p,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=ca(),r.append(J()),r.addEventListener("click",()=>{ma(n);let p=e(n);p?.type==="slotRow"&&p.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=e(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(i,...r?[r]:[]),n.append(c,o,_()),pa(n,e),ha(n,t),n}function $n(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;Oe(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Wr(t,e,n,i,r){let o=0,s=0,l=0,u=!1,c=!1,p=!1,m=!1,f=()=>{window.clearTimeout(o),o=0},y=h=>{let $=h.clientX-s,k=h.clientY-l;$*$+k*k>bn*bn&&(u=!0,f())},g=()=>{m&&(m=!1,window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",d))},b=h=>{let $=o!==0&&!u&&!c;f(),g(),$&&(p=!0,$n(n,i,r,h))},d=()=>{u=!0,f(),g()};t.addEventListener("pointerdown",h=>{h.button===0&&(g(),c=!1,u=!1,p=!1,s=h.clientX,l=h.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,Pr(n,e,i,r))},xr),m=!0,window.addEventListener("pointermove",y),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",d))}),t.addEventListener("contextmenu",h=>h.preventDefault()),t.addEventListener("click",h=>{if(p||c||u){p=!1,c=!1,u=!1;return}$n(n,i,r,h)})}function pa(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=kn("Save","store"),r=kn("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Oe(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=e(t);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),Oe(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),Oe(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&Oe(t)})}function kn(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Pr(t,e,n,i){pa(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Oe(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ha(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function ma(t){let e=t.dataset.ncLastFill||null,n=Xi(e);t.dataset.ncLastFill=n;let i=Vi(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function Gr(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Fr(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=d=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=d,i.append(h),h},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=d=>{for(let h of[o,s]){let $=h===d;h.setAttribute("aria-checked",$?"true":"false"),h.tabIndex=$?0:-1}};l(o);for(let d of[o,s])d.addEventListener("click",()=>l(d));i.addEventListener("keydown",d=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(d.key))return;d.preventDefault();let h=s.getAttribute("aria-checked")==="true"?o:s;l(h),h.focus()});let u=document.createElement("div");u.className="nc-step-tools",u.append(i),t.onFill&&u.append(Gr(n,e)),n.append(u);for(let d of t.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let $=document.createElement("button");$.type="button",$.className="nc-name",$.textContent=d.label,$.setAttribute("aria-label",`Select ${d.label}`),d.lane&&($.dataset.ncLane=String((d.lane-1)%4+1)),$.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid")return;let x=v.rows.findIndex(w=>w.id===d.id);v.onSelectRow?.(x)}),$.addEventListener("keydown",v=>Hr(n,$,v));let k=[];for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let w=document.createElement("button");w.type="button",w.className="nc-ms",w.dataset.ncMs=v,w.textContent=v==="mute"?"M":"S",w.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${d.label}`),x.append(w,J()),x.addEventListener("click",()=>{let S=e(n);if(S?.type!=="stepGrid")return;let T=S.rows.findIndex(A=>A.id===d.id);(v==="mute"?S.onMute:S.onSolo)?.(T)}),k.push(x)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<d.steps.length;v++){let x=document.createElement("span");x.className="nc-step-wrap";let w=document.createElement("button");w.type="button",w.className="nc-step",w.dataset.ncStep=`${d.id}:${v}`,w.setAttribute("aria-label",`${d.label} step ${v+1}`),x.append(w,J()),x.addEventListener("click",S=>{let T=e(n);if(T?.type!=="stepGrid")return;let A=T.rows.findIndex(H=>H.id===d.id),N=s.getAttribute("aria-checked")==="true";T.onToggle(A,v,S.shiftKey||N)}),E.append(x)}if(t.onLength&&E.append(_r(n,E,d,e)),h.append(...k,$,E),t.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=d.id,v.setAttribute("aria-label",`Re-roll ${d.label}`),v.title=`Re-roll ${d.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=yn(),v.append(J()),v.addEventListener("click",()=>{let x=e(n);x?.type==="stepGrid"&&x.onDice?.(x.rows.findIndex(w=>w.id===d.id))}),h.append(v)}h.addEventListener("click",v=>{if(v.target!==h)return;let x=e(n);x?.type==="stepGrid"&&x.onSelectRow?.(x.rows.findIndex(w=>w.id===d.id))}),xn(n,E,".nc-step-wrap",e,s,()=>d.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let p=(d,h,$)=>{let k=document.createElement("button");return k.type="button",k.className=d,k.textContent=h,$&&k.setAttribute("aria-label",$),k},m=p("nc-pads-step","‹","Previous lane"),f=p("nc-pads-step","›","Next lane"),y=document.createElement(t.onLength?"button":"span");y.className="nc-pads-label",y.setAttribute("aria-live","polite"),t.onLength&&(y.type="button",y.dataset.ncLenToggle="",y.addEventListener("click",()=>{let d=e(n);d?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Bt(n,d))}));for(let[d,h]of[[m,-1],[f,1]])d.addEventListener("click",()=>{let $=e(n);if($?.type!=="stepGrid"||$.rows.length===0)return;let k=$.rows.length;$.onSelectRow?.(((Ve($)+h)%k+k)%k)});if(c.append(m,y,f),t.onDice){let d=p("nc-pads-step nc-pads-dice","","Re-roll lane");d.dataset.ncPadsDice="",d.innerHTML=yn(),d.addEventListener("click",()=>{let h=e(n);if(h?.type!=="stepGrid")return;let $=Ve(h);$>=0&&h.onDice?.($)}),c.append(d)}if(t.transport){let d=p("nc-pads-play","Play");d.dataset.ncPadsPlay="",d.addEventListener("click",()=>{let h=e(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(d)}n.append(c);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let b=Math.max(0,...t.rows.map(d=>d.steps.length));for(let d=0;d<b;d++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(d),h.textContent=String(d+1),h.addEventListener("click",$=>{let k=e(n);if(k?.type!=="stepGrid")return;let E=Ve(k);if(E<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.(E,d+1);return}let v=s.getAttribute("aria-checked")==="true";k.onToggle(E,d,$.shiftKey||v)}),g.append(h)}return xn(n,g,".nc-pad",e,s,()=>{let d=e(n);return d?.type==="stepGrid"?d.rows[Ve(d)]?.id:void 0}),n.append(g),n.append(_()),Bt(n,t),n}function Ve(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function xn(t,e,n,i,r,o){let s="on",l=!0,u=-1,c=(p,m)=>{let f=p.rows[u]?.steps[m];!f||m>=p.rows[u].length||(p.onSet?p.onSet(u,m,s,l):!!f[s]!==l&&p.onToggle(u,m,s==="accent"))};kr(e,n,p=>{let m=i(t);if(m?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(p.kind!=="paint")return;let f=m.rows.findIndex(y=>y.id===o());f>=0&&m.rows[f].length!==p.pad+1&&m.onLength?.(f,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let f=o();u=m.rows.findIndex(g=>g.id===f);let y=m.rows[u]?.steps[p.pad];if(!y)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!y[s]}c(m,p.pad)}else if(p.kind==="long"){let f=o(),y=m.rows.findIndex(b=>b.id===f),g=e.querySelectorAll(n)[p.pad];y>=0&&g instanceof HTMLElement&&m.onLongPress?.(y,p.pad,g)}}})}function Hr(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function _r(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(J());let o=c=>{let p=i(t);if(p?.type!=="stepGrid")return;let m=p.rows.findIndex(g=>g.id===n.id),f=p.rows[m];if(!f)return;let y=Math.max(1,Math.min(f.steps.length,c));y!==f.length&&p.onLength?.(m,y)},s=c=>{let p=[...e.querySelectorAll(".nc-step")],m=1;return p.forEach((f,y)=>{let g=f.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(m=y+1)}),m},l=c=>o(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",c=>{let p=i(t);if(p?.type!=="stepGrid")return;let m=p.rows.find(y=>y.id===n.id);if(!m)return;let f={ArrowLeft:m.length-1,ArrowDown:m.length-1,ArrowRight:m.length+1,ArrowUp:m.length+1,Home:1,End:m.steps.length};c.key in f&&(c.preventDefault(),o(f[c.key]))}),r}var Lt=new WeakMap;function Sn(t,e){let n=typeof e=="number"?e:null;if(!(Lt.has(t)&&Lt.get(t)===n)){if(Lt.set(t,n),n===null){for(let i of Object.keys(hn(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(hn(n)))t.style.setProperty(i,r)}}function Bt(t,e){let n=e.rows.some(c=>c.solo),i=t.querySelector(".nc-pads"),r=e.rows.find(c=>c.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=s?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",s?"true":"false"),o.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let l=t.querySelector("[data-nc-pads-dice]");l instanceof HTMLElement&&r&&(l.setAttribute("aria-label",`Re-roll ${r.label}`),l.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let c=!!e.transport?.playing,p=e.transport?.label??(c?"Stop":"Play");u.textContent!==p&&(u.textContent=p),u.setAttribute("aria-pressed",c?"true":"false");let m=e.transport?.ariaLabel;m?u.setAttribute("aria-label",m):u.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let c=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let m=Number(p.getAttribute("data-nc-pad")),f=r.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!f||!s&&m>=r.length,s&&m>=r.length?p.dataset.out="true":delete p.dataset.out,s&&m===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${m+1}`),p.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?p.dataset.accent="true":delete p.dataset.accent,f?.dim?p.dataset.dim="true":delete p.dataset.dim,Sn(p,f?.velocity),e.playhead>=0&&m===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of e.rows){for(let f=0;f<c.steps.length;f++){let y=c.steps[f],g=t.querySelector(`[data-nc-step="${c.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;let b=g.closest(".nc-row");if(b instanceof HTMLElement){e.selectedRow===c.id?b.dataset.selected="true":delete b.dataset.selected;let $=b.querySelector(".nc-name");$ instanceof HTMLElement&&$.setAttribute("aria-pressed",e.selectedRow===c.id?"true":"false"),c.mute||n&&!c.solo?b.dataset.silent="true":delete b.dataset.silent;for(let k of b.querySelectorAll("[data-nc-ms]")){let E=k.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;k.setAttribute("aria-pressed",E?"true":"false")}}g.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?g.dataset.accent="true":delete g.dataset.accent,y.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof y.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Sn(g,y.velocity);let d=e.playhead>=0&&c.length>0?(e.playhead%c.length+c.length)%c.length:-1;f===d?g.dataset.playhead="true":delete g.dataset.playhead;let h=!!e.onLength&&e.selectedRow===c.id;g.hidden=f>=c.length&&!h,f>=c.length&&h?g.dataset.out="true":delete g.dataset.out}let p=t.querySelector(`[data-nc-len="${c.id}"]`),m=t.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&m&&m.nextElementSibling!==p){let f=document.activeElement===p;m.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function Dr(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,_()),e}function Yr(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let b=e(n);b?.type==="strip"&&b.onRemove?.(g)}),i.append(g)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",g.append(b,J()),g.addEventListener("click",()=>{let d=e(n);d?.type==="strip"&&d.onHacks?.()}),o.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let b=document.createElement("span");b.className="nc-ms-wrap";let d=document.createElement("button");d.type="button",d.className="nc-ms",d.dataset.ncMs=g,d.textContent=g==="mute"?"M":"S",b.append(d,J()),b.addEventListener("click",()=>{let h=e(n);h?.type==="strip"&&(g==="mute"?h.onMute:h.onSolo)?.()}),s.append(b)}let l=document.createElement("div");l.className="nc-strip-sends";for(let g of t.sends??[])l.append(ot({...g,type:"knob",compact:!0},e));let u=document.createElement("div");u.className="nc-strip-body";let c=document.createElement("span");c.className="nc-scale",c.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(g.value)),b.textContent=g.label,c.append(b)}let p=hr({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let b=e(n);b?.type==="strip"&&b.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&Ln(g)}}),m=wr({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});u.append(c,p.el,m.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let y=0;return f.addEventListener("click",g=>{let b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(y),g.detail===0?An(n,f,e):g.detail===1&&(y=window.setTimeout(()=>An(n,f,e),Zr)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(y);let g=e(n);g?.type==="strip"&&Ln(g)}),n.append(i,o,s,l,u,f,_()),ba(n,t),n}var Zr=250;function An(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??Pe(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=r.value;if(r.remove(),e.hidden=!1,l){let c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Xr(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),u=s.value;ga(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(i,s,_()),fa(n,t),n}function fa(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),ga(i))}function ga(t){let e=t.options[0];e&&(e.selected=!0)}function Ln(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function ba(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?mr(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),oa(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let u=e.valueText??Pe(e.value);s.textContent!==u&&(s.textContent=u),s.setAttribute("aria-label",`${e.label} level ${u}`);let c=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${c}`:c}for(let u of t.querySelectorAll("[data-nc-ms]")){let c=u.getAttribute("data-nc-ms"),p=c==="mute"?e.mute===!0:e.solo===!0;u.setAttribute("aria-pressed",p?"true":"false"),u.setAttribute("aria-label",`${c==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let u=e.hacksLabel??"Hacks";l.textContent!==u&&(l.textContent=u),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${u}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function En(t,e){let n=t?.querySelector?.(`.nc-strip[data-nc-id="${jt(e)}"]`);return oa(n?.querySelector(".nc-meter")??void 0)}function Vr(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=aa({checked:t.on,labelledBy:i.id,onChange:s=>{let l=e(o.el);l?.type==="fx"&&l.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(ot(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(ot(s,e));n.append(r)}return n.append(_()),ya(n,t),n}function ya(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function jt(t){return t.replace(/["\\]/g,"\\$&")}function Ur(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&sa(n,i)}Ar(t)}var Yt="netcomposer.rhythm.hidden.v1",te=new WeakMap;function Et(){try{return globalThis.localStorage??null}catch{return null}}function wa(t,e=Yt){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function Mn(t,e,n,i=Yt){let r=wa(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function Zt(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function qr(t,e){if(!(!t||!e))return Zt(t).find(n=>n.id===e)}function Kr(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${Zt(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Jr(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),va(t,e)}function va(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Qr(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=te.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return qr(n,i)}function eo(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=Kr(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${Tn(r.id)}"]`);o&&va(o,r);for(let s of r.controls){let l=t.querySelector(`[data-nc-id="${Tn(s.id)}"]`);l instanceof Element&&oe(l,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),Jr(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let l of r.controls)s.append(ot(l,Qr));t.append(o)}}function Tn(t){return t.replace(/["\\]/g,"\\$&")}function to(t,e=Yt){ta();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=wa(Et(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=aa({labelledBy:o.id,onChange:h=>(te.get(n)??t).onToggle?.(h)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",r.append(o,p,s);let m=document.createElement("div");m.className="nc-module-body",m.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let y=document.createElement("span");y.className="nc-slim-lines",f.append(y);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,m,f),n.setAttribute("aria-labelledby",o.id);let b=h=>{let $=te.get(n)??t;n.dataset.ncOpen=h?"false":"true",m.hidden=h,f.hidden=!h,l.textContent=h?"+":"−",l.setAttribute("aria-expanded",h?"false":"true"),l.setAttribute("aria-controls",m.id),l.setAttribute("aria-label",`${h?"Show":"Hide"} ${$.title}`),l.title=h?"Show":"Hide",h?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let h=n.dataset.ncOpen==="true";Mn(Et(),(te.get(n)??t).id,h,e),b(h),Wt(n.parentElement)}),f.addEventListener("click",()=>{Mn(Et(),(te.get(n)??t).id,!1,e),b(!1),Wt(n.parentElement)});let d={el:n,update(h){te.set(n,h),h.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=h.title,p.textContent=h.status??"",h.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),y.textContent=h.summary??h.title,c.el.hidden=h.on===void 0,c.set(h.on===!0),h.on===!1?m.dataset.ncDim="true":delete m.dataset.ncDim,f.setAttribute("aria-label",`Show ${h.title}`),eo(m,h),b(m.hidden),d.redraw()},redraw(){let h=te.get(n);h&&Ur(n,Zt(h))}};return te.set(n,t),b(i),d.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>d.redraw()).observe(n),d}function no(t,e,n="adjacent"){ta(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),Wt(t)}function Wt(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const $a="netcomposer.studio.instances.v1",Cn="netcomposer.studio.types-seen.v1",ao=["petra-rhythm","olive-bass"];function ka(t,e){return e===1?t:`${t}#${e}`}function xa(t){const e=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(t);if(!e?.[1])return null;const n=e[2]?Number(e[2]):1;return n===1&&e[2]?null:{type:e[1],n}}function ft(t,e){return{id:ka(t.id,e),type:t.id,n:e,name:e===1?t.name:`${t.name} ${e}`,src:t.src}}function io(t,e){const n=new URLSearchParams({instance:String(t.n)});return e&&n.set("measure",""),`${t.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function ro(t,e){const n=new Set(t.filter(r=>r.type===e.id).map(r=>r.n));let i=1;for(;n.has(i);)i++;return ft(e,i)}function st(t){return t.filter(e=>e.available!==!1).map(e=>ft(e,1))}function oo(t,e){if(!Array.isArray(t))return st(e);const n=[];for(const i of t){if(typeof i!="string")continue;const r=xa(i),o=r&&e.find(s=>s.id===r.type&&s.available!==!1);!r||!o||n.some(s=>s.id===i)||n.push(ft(o,r.n))}return n.length>0||t.length===0?n:st(e)}function Xt(){try{return globalThis.localStorage??null}catch{return null}}function so(t,e=Xt()){try{const n=e?.getItem($a);return n?oo(JSON.parse(n),t):st(t)}catch{return st(t)}}function lo(t,e,n=Xt()){let i=ao;try{const s=JSON.parse(n?.getItem(Cn)??"null");Array.isArray(s)&&(i=s.filter(l=>typeof l=="string"))}catch{}const r=e.filter(s=>!i.includes(s.id)&&s.available!==!1);if(r.length===0)return[...t];const o=[...t];for(const s of r)o.some(l=>l.type===s.id)||o.push(ft(s,1));try{n?.setItem(Cn,JSON.stringify([...new Set([...i,...r.map(s=>s.id)])]))}catch{}return o.length!==t.length&&Vt(o,n),o}function Vt(t,e=Xt()){try{e?.setItem($a,JSON.stringify(t.map(n=>n.id)))}catch{}}function co(t,e){const n=new Map;return(i,r)=>{const o=xa(i),s=o?.type??i,l=r?.instance!==void 0?Number(r.instance):i.includes("#")?o?.n:void 0,u=t().filter(p=>p.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(p=>p.instance.n===l);else{const p=u.filter(m=>{const f=m.window();return f!=null&&f!==n.get(m.instance.id)});c=p.find(m=>m.readyState?.()!=="complete")??p[0]??u[0]}if(!c){if(e.some(m=>m.id===s))return null;const p=l!==void 0?ka(s,l):i;return{id:p,name:p}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const uo=1,ie=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX"}],Ut=[...ie];function po(t,e,n={}){const i=n.instruments??ie;return{version:uo,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:i.find(u=>u.id===r)?.name??r};if(!s)return null;const l=e.attach(s.id,s.name);return n.mapper===void 0?{ctx:t,output:l}:{ctx:t,output:l,mapper:n.mapper}}}}const ho={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function mo(t,e){const n=e.fx[t],i=at(n);for(const r of i.chain){const o=ho[t][r.type];n===void 0&&o&&Object.assign(r.dials,o),t==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):t==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!e.insert.on}return i}function fo(t){const e=()=>{};return new Proxy(t,{get(n,i,r){if(i==="stop")return e;const o=Reflect.get(n,i,r);return typeof o=="function"?o.bind(n):o}})}const Q=-54,He=6,V=-Q/(He-Q),go=-9,Pt=(go-Q)/(He-Q);function Sa(t){const e=Math.min(1,Math.max(0,t));return e===0?Number.NEGATIVE_INFINITY:Q+e*(He-Q)}function bo(t){return t===Number.NEGATIVE_INFINITY?0:10**(t/20)}function yo(t){return t<=0?Number.NEGATIVE_INFINITY:20*Math.log10(t)}function de(t){return bo(Sa(t))}function wo(t){if(t===Number.NEGATIVE_INFINITY||t<-99)return"−∞";const e=t.toFixed(1);return e.startsWith("-")?`−${e.slice(1)}`:t>.05?`+${e}`:e}function vo(t){const e=t.some(n=>n.solo);return t.map(n=>n.mute||e&&!n.solo?0:de(n.position))}function qt(t){return t===Number.NEGATIVE_INFINITY||Number.isNaN(t)?0:Math.min(1,Math.max(0,(t-Q)/(He-Q)))}function In(t){return qt(yo(t))}const Nn=[0,-6,-12,-24,-48].map(t=>({value:qt(t),label:t===0?"0":`−${-t}`})),$o=1;function ko(t){let e=0,n=0;for(const i of t){const r=Math.abs(i);r>e&&(e=r),n+=i*i}return{peak:e,rms:t.length>0?Math.sqrt(n/t.length):0}}function zn(t){const e=t.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(e==="")return null;if(e==="off"||e==="-inf"||e==="-∞"||e==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(e))return null;const n=Number(e.replace(",","."));return Number.isFinite(n)?n<Q?0:qt(Math.min(He,n)):null}const Aa="netcomposer.studio.mix.v1",La={position:Pt,mute:!1,solo:!1,sendA:0,sendB:0};function Gt(){return{v:1,channels:{},master:V,returns:{a:{on:!0,level:V},b:{on:!0,level:V}},insert:{on:!1},fx:{},channelFx:{}}}const We=(t,e)=>typeof t=="number"&&Number.isFinite(t)?Math.min(1,Math.max(0,t)):e,lt=(t,e)=>typeof t=="boolean"?t:e,ne=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{};function xo(t){const e=ne(t);return{position:We(e.position,La.position),mute:lt(e.mute,!1),solo:lt(e.solo,!1),sendA:Math.min(V,We(e.sendA,0)),sendB:Math.min(V,We(e.sendB,0))}}function So(t){const e=Gt(),n=ne(t);if(n.v!==1)return e;const i={};for(const[c,p]of Object.entries(ne(n.channels)))c.length>0&&c.length<=64&&(i[c]=xo(p));const r=ne(n.returns),o=(c,p)=>{const m=ne(c);return{on:lt(m.on,p.on),level:We(m.level,p.level)}},s={},l=ne(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,p]of Object.entries(ne(n.channelFx)))c.length>0&&c.length<=64&&p&&typeof p=="object"&&(u[c]=p);return{v:1,channels:i,master:We(n.master,e.master),returns:{a:o(r.a,e.returns.a),b:o(r.b,e.returns.b)},insert:{on:lt(ne(n.insert).on,e.insert.on)},fx:s,channelFx:u}}function Ea(){try{return globalThis.localStorage??null}catch{return null}}function Ao(t=Ea()){try{const e=t?.getItem(Aa);return e?So(JSON.parse(e)):Gt()}catch{return Gt()}}function Lo(t,e=Ea()){try{return e?.setItem(Aa,JSON.stringify(t)),e!==null}catch{return!1}}const Eo="netcomposer.studio.hidden.v1",Ue=1/120,ee="master",Rn="Inserts",Mo="(max-width: 768px)",Qe=8,et=t=>wo(Sa(t)),On=t=>{const e=et(t);return e==="−∞"?"off":`${e} dB`};function To(t,e){return Se.find(n=>n.type===t)?.dials.find(n=>n.key===e)}function Co(t,e,n){const i=n.bpm,r=w=>{const S=n.order(),T=S.indexOf(w);return T<0?S.length:T},o=(w,S,T,A)=>{const N=To(T,A);if(!N||!S)return null;const H=Number(S.getParam(T,A)??N.default),L=`mix-${w}-${A}`;return N.options?{type:"select",id:L,label:N.label,value:String(H),options:N.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>{S.setParam(T,A,Number(z)),x.render()}}:{type:"slider",id:L,label:N.label,min:N.min,max:N.max,step:N.step??1,value:H,valueText:N.format(H,i()),onChange:z=>{S.setParam(T,A,z),x.render()}}},s=(w,S,T,A)=>A.map(N=>o(w,S,T,N)).filter(N=>N!==null),l=matchMedia(Mo);let u=l.matches?null:ee;const c=w=>{u=w===null&&!l.matches?ee:w,x.render()},p=w=>c(u===w?l.matches?null:ee:w);l.addEventListener("change",()=>c(u));const m=(w,S,T,A)=>{const N=Number(S.getParam(T,A.key)??A.default),H=`hack-${w}-${T}-${A.key}`,L=z=>{S.setParam(T,A.key,z),x.render()};return A.options?{type:"select",id:H,label:A.label,value:String(N),options:A.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>L(Number(z))}:{type:"slider",id:H,label:A.label,min:A.min,max:A.max,step:A.step??.001,value:N,valueText:Yn(A,N,i()),onChange:L}},f="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3}},g=(w,S,T)=>{const A=T.getChain(),N=A.map((L,z)=>{const q=U(L.type)?.dials??[],I=B=>{T.moveEffect(L.id,B),x.render()},D=[];return z>0&&D.push({type:"button",id:`hack-${w}-${L.id}-left`,label:"Move left",on:!1,onPress:()=>I(z-1)}),z<A.length-1&&D.push({type:"button",id:`hack-${w}-${L.id}-right`,label:"Move right",on:!1,onPress:()=>I(z+1)}),D.push({type:"button",id:`hack-${w}-${L.id}-remove`,label:"Remove",ariaLabel:`Remove ${L.name} from ${S}`,on:!1,onPress:()=>{T.removeEffect(L.id),x.render()}}),{type:"fx",id:`hack-${w}-${L.id}`,title:`${z+1} · ${L.name}`,depth:z%4+1,on:!L.bypass,onToggle:B=>{T.setParam(L.id,"bypass",!B),x.render()},controls:q.filter(B=>!B.more).map(B=>m(w,T,L.id,B)),more:[...q.filter(B=>B.more).map(B=>m(w,T,L.id,B)),...D]}}),H=A.length>=Qe;return N.push({type:"fx",id:`hack-${w}-add`,title:`${S} · Inserts`,depth:A.length%4+1,controls:[{type:"note",id:`hack-${w}-note`,text:H?`${A.length} of ${Qe}: the stack is full.`:A.length===0?"No effects yet.":`${A.length} of ${Qe}, first to last.`},...H?[]:[{type:"select",id:`hack-${w}-add-type`,label:"Add",value:f,options:[{value:f,label:"Effect…"},...ui.map(L=>({value:L,label:U(L)?.label??L}))],onChange:L=>{L!==f&&(T.addEffect(L,{dials:y[L]}),x.render())}}]]}),N},b=w=>{const S=e.returns[w];return{type:"slider",id:`mix-${w}-return`,label:"Return",min:0,max:1,step:Ue,value:S.level,valueText:On(S.level),onChange:T=>e.setReturn(w,{level:T})}},d=()=>[...e.list()].sort((w,S)=>r(w.id)-r(S.id)).map(w=>({type:"strip",id:`strip-${w.id}`,label:w.name,value:w.strip.position,valueText:et(w.strip.position),step:Ue,defaultValue:Pt,resetText:`${et(Pt)} dB`,ticks:[...Nn],mute:w.strip.mute,solo:w.strip.solo,silent:w.silent,onChange:S=>e.set(w.id,{position:S}),onTypeIn:S=>{const T=zn(S);T!==null&&e.set(w.id,{position:T})},onRemove:S=>n.onRemove(w.id,S),...w.fx?{hacks:u===w.id,hacksLabel:Rn,onHacks:()=>p(w.id)}:{},onMute:()=>e.set(w.id,{mute:!w.strip.mute}),onSolo:()=>e.set(w.id,{solo:!w.strip.solo}),sends:["A","B"].map(S=>{const T=S==="A"?"sendA":"sendB",A=w.strip[T];return{id:`send-${S.toLowerCase()}-${w.id}`,label:S,ariaLabel:`${w.name} send ${S}`,min:0,max:V,step:Ue*2,value:A,valueText:On(A),defaultValue:0,onChange:N=>e.set(w.id,{[T]:N})}})})),h=()=>({type:"strip",id:`strip-${ee}`,label:"Master",master:!0,hacks:u===ee,hacksLabel:Rn,onHacks:()=>p(ee),channels:2,value:e.masterPositionValue,valueText:et(e.masterPositionValue),step:Ue,defaultValue:V,resetText:"0.0 dB",ticks:[...Nn],onChange:w=>e.setMaster(w),onTypeIn:w=>{const S=zn(w);S!==null&&e.setMaster(S)}}),$=()=>{const w=e.returns.a,S=e.returns.b,T=e.list().find(A=>A.id===u&&A.fx);return!T&&u!==null&&(u=ee),{id:"mix",title:"Mix",summary:`${e.list().map(A=>A.name).join(", ")||"No instruments"} · A Reverb · B Delay · Drive ${e.insertEnabled?"on":"off"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...d(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(A=>({value:A.id,label:A.available===!1?`${A.name} (soon)`:A.name,disabled:A.available===!1})),onAdd:A=>n.onAdd(A)}]},{id:"fx",area:"fx",label:T?`${T.name} inserts`:"Effects",controls:T?.fx?g(T.id,T.name,T.fx):[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:w.on,onToggle:A=>e.setReturn("a",{on:A}),controls:[b("a"),...s("a",w.fx,"plate",["decay","size"])],more:s("a",w.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:S.on,onToggle:A=>e.setReturn("b",{on:A}),controls:[b("b"),...s("b",S.fx,"delay",["delay_beats","feedback"])],more:s("b",S.fx,"delay",["tone","low_cut"])},{type:"fx",id:"mix-insert",title:"Insert · Drive",depth:3,on:e.insertEnabled,onToggle:A=>e.setInsert(A),controls:s("insert",e.insert,"drive",["drive_db","tone","output_db"]),more:s("insert",e.insert,"drive",["mix","curve"])}]},{id:"master",area:"master",label:"Master",controls:[h()]}]}},k=to($(),Eo),E=()=>k.el.toggleAttribute("data-hacks-folded",u===null);E(),no(t,[k],"adjacent");const v=w=>({peak:In(w.peak),rms:In(w.rms),over:w.peak>=$o}),x={module:k,get hacksShown(){return u},showHacks:c,render(){k.update($()),E()},frame(w){if(k.el.dataset.ncOpen==="true"){for(const S of e.list())En(k.el,`strip-${S.id}`)?.update([v(S.levels())],w);En(k.el,`strip-${ee}`)?.update(e.masterLevels().map(v),w)}}};return x}const $e=.012,Mt=1024;class Io{ctx;bus;insert;master;limiter;masterMeter;masterMeters;insertMeters;returns;recordOut;masterPosition=V;insertOn=!1;channels=[];listeners=new Set;scratch=new Float32Array(Mt);restore;channelFx;constructor(e,n={}){this.ctx=e,this.restore=n.restore,this.channelFx=n.channelFx;const i=()=>new AnalyserNode(e,{fftSize:Mt});this.bus=new GainNode(e,{gain:1}),this.master=new GainNode(e,{gain:de(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(e,{threshold:-3,knee:0,ratio:20,attack:.001,release:.1}),this.masterMeter=i(),this.masterMeters=[i(),i()],this.insertMeters={pre:i(),post:i()},this.recordOut=new MediaStreamAudioDestinationNode(e),this.insert=n.fx?.("insert")??null,this.bus.connect(this.insertMeters.pre),this.insert?(this.bus.connect(this.insert.input),this.insert.output.connect(this.master),this.insert.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(e.destination);const r=new ChannelSplitterNode(e,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1),this.limiter.connect(this.recordOut);const o=s=>{const l=new GainNode(e,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(e,{gain:de(V)}),p=i();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(p),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:p,on:u!==null,level:V}};this.returns={a:o("a"),b:o("b")}}attach(e,n){let i=this.channels.find(r=>r.id===e);if(i)i.input.disconnect(),i.input=new GainNode(this.ctx,{gain:1}),i.input.connect(i.fx?.input??i.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Mt}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(e)??null;c?(r.connect(c.input),c.output.connect(o)):r.connect(o),o.connect(s).connect(this.bus),o.connect(l).connect(this.returns.a.bus),o.connect(u).connect(this.returns.b.bus),i={id:e,name:n,input:r,fader:o,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(e)??La},this.channels.push(i),this.apply()}return this.emit(),i.input}detach(e){const n=this.channels.findIndex(r=>r.id===e);if(n<0)return;const[i]=this.channels.splice(n,1);if(i){for(const r of[i.input,i.fader,i.meter,i.sendA,i.sendB])r.disconnect();i.fx?.output.disconnect(),i.fx?.dispose(),this.apply(),this.emit()}}set(e,n){const i=this.channels.find(r=>r.id===e);i&&(i.strip={...i.strip,...n},this.apply(),this.emit())}setMaster(e){this.masterPosition=e,this.master.gain.setTargetAtTime(de(e),this.ctx.currentTime,$e),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(e,n){const i=this.returns[e],r=this.ctx.currentTime;n.on!==void 0&&(i.on=n.on&&i.fx!==null,i.bus.gain.setTargetAtTime(i.on?1:0,r,$e)),n.level!==void 0&&(i.level=n.level,i.fx&&i.gain.gain.setTargetAtTime(de(i.level),r,$e)),this.emit()}setInsert(e){this.insertOn=e,this.insert?.setParam("drive","bypass",!e),this.emit()}get insertEnabled(){return this.insertOn}setTempo(e,n){for(const i of[this.returns.a.fx,this.returns.b.fx,this.insert])i?.setTempo(e,n);for(const i of this.channels)i.fx?.setTempo(e,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(e){return this.levelsOf(this.returns[e].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const e=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||e&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}apply(){const e=vo(this.channels.map(i=>i.strip)),n=this.ctx.currentTime;this.channels.forEach((i,r)=>{i.fader.gain.setTargetAtTime(e[r]??0,n,$e),i.sendA.gain.setTargetAtTime(de(i.strip.sendA),n,$e),i.sendB.gain.setTargetAtTime(de(i.strip.sendB),n,$e)})}levelsOf(e){return e.getFloatTimeDomainData(this.scratch),ko(this.scratch)}emit(){for(const e of this.listeners)e()}}const No=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus","audio/mp4"];function zo(t){return No.find(e=>t(e))??null}function Ro(t){return t.startsWith("audio/mp4")?"m4a":t.startsWith("audio/ogg")?"ogg":"webm"}function Oo(t,e){const n=r=>String(r).padStart(2,"0");return`netcomposer-studio-${`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}-${n(t.getHours())}${n(t.getMinutes())}`}.${Ro(e)}`}class Bo{constructor(e){this.stream=e,this.mimeType=typeof MediaRecorder>"u"?null:zo(n=>MediaRecorder.isTypeSupported(n))}recorder=null;chunks=[];startedAt=0;mimeType;get supported(){return this.mimeType!==null}get recording(){return this.recorder?.state==="recording"}start(){!this.mimeType||this.recording||(this.chunks=[],this.recorder=new MediaRecorder(this.stream,{mimeType:this.mimeType}),this.recorder.ondataavailable=e=>{e.data.size>0&&this.chunks.push(e.data)},this.startedAt=performance.now(),this.recorder.start(250))}stop(){const e=this.recorder,n=this.mimeType;return!e||!n||e.state==="inactive"?Promise.resolve(null):new Promise(i=>{e.onstop=()=>{this.recorder=null;const r=new Blob(this.chunks,{type:n});i({blob:r,name:Oo(new Date,n),seconds:(performance.now()-this.startedAt)/1e3})},e.stop()})}}const jo="/studio/assets/silence-processor-Cr4LKvRl.js";function Wo(t,e=Ut){const n=e.find(o=>o.id===t.type),i=(n?.name??t.type).toUpperCase(),r=String(t.n).padStart(2,"0");return{brand:n?.brand??i,rest:` / ${i} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const Po="NetComposer Studio",pe=[40,240],Go="nc-sync";function Fo(t,e=globalThis.navigator?.locks){const n=`/studio/${t}`;return{channel:`${Go}${n}`,locks:e?{request:(i,r,o)=>e.request(`${i}${n}`,r,o)}:null}}function Ho(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function _o(t,e){const n=new Za({bpm:120,minBpm:pe[0],maxBpm:pe[1],timebase:"shared"}),i=new ii({app:Po,version:"0.1.0",clock:n,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:pe},...e?{channel:e.channel,locks:e.locks}:{},audio:()=>{const o=t();return o==="running"?"running":o==="closed"?"none":"needs-gesture"}});let r=!1;return{clock:n,peer:i,async start(){r||(r=!0,await i.start())},play:()=>n.play({at:Ce()}),stop:()=>n.stop({at:Ce()}),setTempo:o=>n.setTempo({bpm:Do(o)}),playing:()=>n.transport.isPlayingAt(Ce()),running:()=>n.transport.running,bpm:()=>n.transport.bpm,position(){const o=n.transport,s=Ce();return o.isPlayingAt(s)?Yo(o.beatAt(s)):null},beatPhase(){const o=n.transport,s=Ce();if(!o.isPlayingAt(s))return null;const l=o.beatAt(s);return l-Math.floor(l)},peers:()=>[...i.peers.values()]}}function Do(t){return Number.isFinite(t)?Math.min(pe[1],Math.max(pe[0],Math.round(t*10)/10)):120}function Yo(t){const e=Math.max(0,Math.floor(t));return{bar:Math.floor(e/4)+1,beat:e%4+1}}function Zo(t,e){const n=t.addModule.bind(t),i=new Map;return Object.defineProperty(t,"addModule",{value:(o,s)=>{const l=new URL(String(o),e).href;let u=i.get(l);return u||(u=n(o,s),i.set(l,u),u.catch(()=>{i.get(l)===u&&i.delete(l)})),u},configurable:!0}),t}const F=new AudioContext({latencyHint:"interactive"});Zo(F.audioWorklet,location.href);const Z=Ao(),he={},Xo=Qe,Kt=new Map,G=new Io(F,{restore:t=>Z.channels[t],fx:t=>{const e=sn(F,{moduleUrl:Nt,bpm:120,state:mo(t,Z)});return he[t]=e,e},channelFx:t=>{dt.delete(t);const e=sn(F,{moduleUrl:Nt,bpm:W.bpm(),slots:Xo,state:Z.channelFx[t]??{v:2,chain:[]}}),n=Un(e,W.clock,{mapper:_e}),i=e.dispose.bind(e);return e.dispose=()=>{n(),i()},e.onChange(bt),Kt.set(t,e),e}});G.setMaster(Z.master);G.setReturn("a",Z.returns.a);G.setReturn("b",Z.returns.b);G.setInsert(Z.insert.on);const _e=new ai(F);_e.start();const Ma=Ho();window.ncStudio=po(F,G,{mapper:fo(_e),resolve:(t,e)=>es(t,e),syncScope:Ma,fxWorklet:new URL(Nt,location.href).href});const W=_o(()=>F.state,Fo(Ma)),tt=new Bo(G.recordOut.stream);let qe=null;function C(t,e={},...n){const i=document.createElement(t);for(const[r,o]of Object.entries(e))o===void 0||o===!1||i.setAttribute(r,o===!0?"":String(o));return i.append(...n),i}const Ge=C("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),Ee=C("input",{type:"number",class:"bpm",min:pe[0],max:pe[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),ct=C("output",{class:"position","aria-label":"Bar and beat"},"—"),ae=C("button",{type:"button",class:"btn rec","aria-pressed":"false"},"Rec"),Be=C("a",{class:"take",hidden:!0}),Jt=C("span",{class:"status",role:"status"}),Vo=C("h1",{class:"brand"},C("span",{},"NetComposer ",C("span",{},"Studio"))),Ft=C("span",{class:"beat-light","aria-hidden":"true"}),Ta=C("span",{class:"status-long"}),Ca=C("span",{class:"status-short"});Jt.append(Ta,Ca);const Uo=C("header",{class:"top"},C("div",{class:"transport"},Ge,C("label",{class:"tempo"},Ee,C("span",{class:"tempo-unit"},"BPM")),Ft,ct),C("div",{class:"record"},ae,Be),Jt);tt.supported||(ae.disabled=!0,ae.title="This browser can't record audio");const De=C("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Ia=C("div",{class:"stage"}),gt=C("label",{class:"tab tab-add",title:"Add an instrument"},C("span",{"aria-hidden":"true"},"+")),Ae=C("select",{class:"tab-add-select","aria-label":"Add an instrument"});Ae.append(C("option",{value:""},"Add an instrument"),...Ut.map(t=>{const e=C("option",{value:t.id},t.available===!1?`${t.name} (soon)`:t.name);return e.disabled=t.available===!1,e}));Ae.addEventListener("change",()=>{const t=Ae.value;Ae.value="",t&&Oa(t)});gt.append(Ae);De.append(gt);const Fe=C("div",{class:"spine","aria-hidden":"true"}),me=new Map;let j=lo(so(ie),ie),le=j[0]?.id??"";const qo=new URLSearchParams(location.search).has("measure"),Bn=new Map,Ko=2e4;function Na(t){const e=C("button",{type:"button",role:"tab",id:`tab-${t.id}`,"aria-controls":`panel-${t.id}`,class:"tab"},t.name);e.addEventListener("click",()=>se(t.id)),De.insertBefore(e,gt);const i=(Bn.get(t.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!j.some(l=>l.id===t.id))return r();const o=C("iframe",{id:`panel-${t.id}`,role:"tabpanel","aria-labelledby":`tab-${t.id}`,title:t.name,src:io(t,qo),allow:"autoplay; clipboard-read; clipboard-write; microphone"});me.set(t.id,o);const s=window.setTimeout(r,Ko);o.addEventListener("load",()=>Jo(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),Ia.append(o),se(le)}));return Bn.set(t.type,i),i}function Jo(t){let e=null;try{e=t.contentDocument}catch{return}if(!e?.documentElement)return;e.documentElement.dataset.ncHosted="";const n=t.id.replace(/^panel-/,""),i=()=>{const o=e?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:e?.documentElement.scrollHeight??0;s>0&&(t.style.height=`${Math.ceil(s)}px`);const l=e?.querySelector(".nc-page-hd, .nc-title-band");l&&(za.set(n,Math.round(l.getBoundingClientRect().bottom)),n===le&&Ra())};i();const r=e.querySelector(".nc-page")??e.body;r&&new ResizeObserver(i).observe(r)}const za=new Map;function Ra(){const t=za.get(le);t===void 0?Fe.style.removeProperty("--spine-top"):Fe.style.setProperty("--spine-top",`${t}px`)}function Qo(t){if(!t){Fe.replaceChildren();return}const e=Wo(t),n=C("span",{class:"spine-brand"},e.brand);e.identity&&(n.style.color=`var(--nc-ui-${e.identity})`),Fe.replaceChildren(C("span",{class:"spine-text"},n,C("span",{class:"spine-rest"},e.rest)))}function se(t){le=t,Qo(j.find(e=>e.id===t)),Ra();for(const e of j){const n=e.id===t;me.get(e.id)?.classList.toggle("shown",n);const i=document.getElementById(`tab-${e.id}`);i?.setAttribute("aria-selected",String(n)),i?.setAttribute("tabindex",n?"0":"-1")}}const es=co(()=>j.map(t=>({instance:t,window:()=>me.get(t.id)?.contentWindow,readyState:()=>{try{return me.get(t.id)?.contentDocument?.readyState}catch{return}}})),ie);function Oa(t){const e=ie.find(i=>i.id===t);if(!e)return;const n=ro(j,e);j=[...j,n].sort((i,r)=>ie.findIndex(o=>o.id===i.type)-ie.findIndex(o=>o.id===r.type)||i.n-r.n),Vt(j),Na(n);for(const i of j){const r=document.getElementById(`tab-${i.id}`);r&&De.insertBefore(r,gt)}se(n.id),Me?.render()}async function ts(t,e){const i=j.find(s=>s.id===t)?.name??t;if(!await pr({title:`Remove ${i}?`,body:`Its channel, strip and mix settings go. ${i}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:e}))return;j=j.filter(s=>s.id!==t),Vt(j);const o=me.get(t);me.delete(t),o?.setAttribute("src","about:blank"),o?.remove(),document.getElementById(`tab-${t}`)?.remove(),G.detach(t),ns(t),le===t&&se(j[0]?.id??"")}const Ht=C("div",{class:"mix"});Ht.addEventListener("click",t=>{const n=t.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==le&&j.some(i=>i.id===n)&&se(n)});let Me=null,jn=0;const dt=new Set;function ns(t){dt.add(t),delete Z.channels[t],delete Z.channelFx[t],Kt.delete(t),bt()}function bt(){window.clearTimeout(jn),jn=window.setTimeout(()=>{const t={...Z.channels};for(const i of G.list())t[i.id]=i.strip;for(const i of dt)delete t[i];const e={};for(const i of["a","b","insert"]){const r=he[i];r&&(e[i]=r.getState())}const n={...Z.channelFx};for(const[i,r]of Kt)n[i]=r.getState();for(const i of dt)delete n[i];Lo({v:1,channels:t,master:G.masterPositionValue,returns:{a:{on:G.returns.a.on,level:G.returns.a.level},b:{on:G.returns.b.on,level:G.returns.b.level}},insert:{on:G.insertEnabled},fx:e,channelFx:n})},300)}G.onChange(()=>{Me?.render(),bt()});for(const t of Object.values(he))t?.onChange(bt);async function Ba(){F.state!=="running"&&await F.resume()}Ge.addEventListener("click",()=>{Ba(),W.running()?W.stop():W.play()});function ja(){const t=Number(Ee.value);W.setTempo(t)}Ee.addEventListener("change",ja);Ee.addEventListener("keydown",t=>{t.key==="Enter"&&ja()});ae.addEventListener("click",async()=>{if(Ba(),tt.recording){const t=await tt.stop();ae.setAttribute("aria-pressed","false"),ae.textContent="Rec",t&&(qe&&URL.revokeObjectURL(qe.url),qe={url:URL.createObjectURL(t.blob),take:t},Be.href=qe.url,Be.download=t.name,Be.textContent=`Save take (${t.seconds.toFixed(1)} s)`,Be.hidden=!1)}else tt.start(),ae.setAttribute("aria-pressed","true"),ae.textContent="Stop rec"});document.addEventListener("keydown",t=>{if(t.code!=="Space"||t.repeat)return;const e=t.target;e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)||(t.preventDefault(),Ge.click())});De.addEventListener("keydown",t=>{if(t.target===Ae)return;const e=j.map(r=>r.id),n=e.indexOf(le),i=t.key==="ArrowRight"?e[(n+1)%e.length]:t.key==="ArrowLeft"?e[(n-1+e.length)%e.length]:null;i&&(t.preventDefault(),se(i),document.getElementById(`tab-${i}`)?.focus())});function yt(){const t=W.running();Ge.textContent=t?"Stop":"Play",Ge.setAttribute("aria-pressed",String(t)),document.activeElement!==Ee&&(Ee.value=String(Math.round(W.bpm()*10)/10));const e=W.position();ct.value=e?`${e.bar}.${e.beat}`:"—";const n=W.peers().length;Ta.textContent=F.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Ca.textContent=F.state==="running"?"":"Audio off",Jt.classList.toggle("off",F.state!=="running")}W.clock.onChange(yt);W.clock.onChange(()=>Me?.render());W.peer.onPeers(yt);F.addEventListener("statechange",yt);const as=.25;let Wn=performance.now();function Wa(t){const e=Math.min(.1,(t-Wn)/1e3);Wn=t,Me?.frame(e);const n=W.position(),i=n?`${n.bar}.${n.beat}`:"—";ct.value!==i&&(ct.value=i);const r=W.beatPhase(),o=r!==null&&r<as;Ft.hasAttribute("data-on")!==o&&Ft.toggleAttribute("data-on",o),requestAnimationFrame(Wa)}async function is(){const t=document.getElementById("app");if(!t)throw new Error("Missing #app");t.append(Vo,Uo,Ht,C("main",{class:"instruments"},De,C("div",{class:"bay"},Fe,Ia))),Me=Co(Ht,G,{order:()=>j.map(e=>e.id),catalogue:Ut,bpm:()=>W.bpm(),onAdd:Oa,onRemove:(e,n)=>void ts(e,n)}),F.state==="running"&&await F.suspend(),await F.audioWorklet.addModule(jo),await W.start();for(const e of[he.a,he.b,he.insert])e&&Un(e,W.clock,{mapper:_e});for(const e of j)Na(e);se(le),yt(),requestAnimationFrame(Wa),document.documentElement.dataset.studioReady=""}window.__studio={ctx:F,mixer:G,mapper:_e,transport:W,frames:me,show:se,get instances(){return j},fx:he,get mix(){return Me}};is();
