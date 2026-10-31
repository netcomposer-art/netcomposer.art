(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const Ee=1e-9;function yi(t,e,n,i=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,i))}class hn{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return yi(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const i=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,c)=>s.beat-c.beat);let r=i.length?i[0].bpm:this.bpm;for(const s of i)s.beat<=e.beat+Ee&&(r=s.bpm);const o=[{beat:e.beat,time:e.time,bpm:this.clamp(r)}];for(const s of i){if(s.beat<=e.beat+Ee)continue;const c=this.clamp(s.bpm);c!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:c})}this.segs=o,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Ee){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Ee;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,i,r=.25){const o=this.bpmAt(n);if(!(i>0)||!(r>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(i/r));this.setTempoAt(o,n);for(let c=1;c<=s;c++)this.setTempoAt(o+(e-o)*c/s,n+i*(c-1)/s)}prune(e){let n=0;for(let i=1;i<this.segs.length;i++)this.segs[i].beat<=e&&(n=i);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new hn({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const i=this.segs[n-1];this.segs[n].time=i.time+(this.segs[n].beat-i.beat)*60/i.bpm}}segAtBeat(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].beat<=e+Ee)return n[i];return n[0]}segAtTime(e){const n=this.segs;for(let i=n.length-1;i>0;i--)if(n[i].time<=e+Ee)return n[i];return n[0]}}const vi=Object.freeze({beatsPerBar:4,beatUnit:4}),Pe=1e-9;function wi(t){return Math.floor(t+Pe)}function ca(t,e,n=!1){if(!(e>0))return t;const r=Math.ceil(t/e-Pe)*e;return n&&r<=t+Pe?r+e:r}class $i{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new hn({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??vi}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Pe&&(this.stopTime===null||e<this.stopTime-Pe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const i=this.tempo.anchor;return this.tempo.setTempoAt(e,i.beat),i.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Pe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),i=wi(e/n),r=Math.max(0,e-i*n);return{beat:e,bar:i,beatInBar:r,barPhase:r/n}}nextBar(e,n=!1){return ca(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const da="nc-clock/snapshot",ua=1;function ki(t,e="local"){return{format:da,version:ua,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function xi(t,e){const n=Si(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const K=t=>typeof t=="number"&&Number.isFinite(t),An=t=>t===null||K(t);function Si(t){const e=t,n=i=>{throw new TypeError(`Invalid nc-clock snapshot: ${i}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==da&&n("format"),(!K(e.version)||Math.floor(e.version)!==ua)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!K(e.anchor.beat)||!K(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(i=>i&&K(i.beat)&&K(i.bpm)&&i.bpm>0))&&n("tempo"),(!e.meter||!K(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!K(e.meter.beatUnit))&&n("meter"),(!An(e.startTime)||!An(e.stopTime)||!K(e.stoppedBeat))&&n("transport times"),e}class Ai{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new $i(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,i){this.transport.start({at:e,beat:n,bpm:i}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const i=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:i,bpm:this.transport.tempo.bpmAt(i)})}applySnapshot(e){xi(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return ki(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Li="nc-sync/1",Mi=1,Ei="nc-sync",Ci="nc-sync-leader",Ti=0,pa=.5,ha=.75;function Ni(t){return typeof t=="number"&&Number.isFinite(t)&&t>=pa&&t<=ha?t:null}const Pt=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),De=t=>typeof t=="number"&&Number.isFinite(t),it=t=>typeof t=="string"&&t.length>0;function Ii(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Mi||!it(e.type)||!it(e.from)||!De(e.term)||!De(e.seq)||!De(e.sentAt))return null;switch(e.type){case"hello":return it(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return De(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&De(e.slot)?e:null;case"ping":case"pong":return it(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function zi(t,e,n,i,r){return{proto:Li,from:e,term:n,seq:i,sentAt:r,...t}}function U(){return(performance.timeOrigin+performance.now())/1e3}const Ot=.003,Ri=3,ji=.01,Ln=500;class Mn{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];timer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null)return;const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?ji:0)||this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.offsets.length)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,i=e?.performanceTime??0;if(!(n>=Ot&&i>0)||!Number.isFinite(n)||!Number.isFinite(i))return!1;const r=n-(this.timeOrigin+i)/1e3,o=this.median(),s=r-o,c=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&c<=this.stepThreshold&&c<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,i){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(i&&o){const c=this.offsets,u=this.preStep;c.length=0;for(let l=0;l<u.length;l++)c.push(u[l]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const l=this.offsets,d=this.preStep;d.length=0;for(let h=0;h<l.length;h++)d.push(l[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,u=e-n;for(let l=0;l<c.length;l++)c[l]+=u;this.stepCount++,s={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const c of[...this.stepListeners])c(s);return!0}median(){const e=this.offsets,n=this.scratch,i=e.length;n.length=i;for(let o=0;o<i;o++){const s=e[o];let c=o-1;for(;c>=0&&n[c]>s;)n[c+1]=n[c],c--;n[c+1]=s}const r=i>>1;return i%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.readLatency(!1);let n=null;const i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=Ot&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Ln)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3;else if(!i||!(i.contextTime>=Ot)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Ln)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),!0)}get ready(){return this.offsets.length>=Math.min(Ri,this.keep)}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const i=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(i)&&i>0?i:Number.isFinite(r)&&r>0?r:null}}class Pi{id;term=0;peers=new Map;o;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Pt,...e.capabilities},this.channelOption=e.channel??Ei,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,i={}){this.send({type:"snapshot",op:e,slot:n,...i})}requestStart(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart();return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}requestStop(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(){const e=this.clock.transport,n=this.o.now();if(e.isPlayingAt(n)&&e.stopTime===null){const i=e.nextBar(e.beatAt(n+this.o.minLeadSeconds));this.clock.commitStart(e.timeAt(i),0)}else this.clock.commitStart(n+this.o.startLeadSeconds,0);this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,i){const[r,o]=this.tempoRange();e=Math.min(o,Math.max(r,e));const s=this.clock.transport,c=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const u=s.beatAt(c+this.o.minLeadSeconds),l=Math.max(n??ca(u,1),u);i&&i>0?(s.tempo.rampTempo(e,l,i),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,l),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const i of this.peers.values())e=Math.max(e,i.capabilities.tempoRange[0]),n=Math.min(n,i.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(ha,Math.max(pa,e)):Ti;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Ni(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const i of[...this.swingListeners])i(n)}}receive(e){const n=Ii(e);if(!n||n.from===this.id)return;const i=this.lastSeq.get(n.from);if(!(i!==void 0&&n.seq<=i)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Pt,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Pt},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.decideStart():this.decideStop(n.all??!1));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Ci,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,c)=>[o?0:1,s,c];let i=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<i[0]||s[0]===i[0]&&(s[1]<i[1]||s[1]===i[1]&&s[2]<i[2]))&&(i=s,r=o.id)}this.setLeader(r===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const i=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return i[0]!==r[0]?i[0]<r[0]:i[1]!==r[1]?i[1]<r[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const i of[...this.peers.values()]){const r=(i.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-i.lastSeen>r&&(this.peers.delete(i.id),this.lastSeq.delete(i.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(zi(e,this.id,this.term,++this.seq,this.o.now()))}}const Oi="modulepreload",Bi=function(t){return"/nyx/"+t},En={},Wi=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=c?.nonce||c?.getAttribute("nonce");r=s(n.map(l=>{if(l=Bi(l),l in En)return;En[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Oi,d||(f.as="script"),f.crossOrigin="",f.href=l,u&&f.setAttribute("nonce",u),document.head.appendChild(f),d)return new Promise((b,g)=>{f.addEventListener("load",b),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};var Gi=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Xt=[.25,.5,.75,1,1.5,2],Hi=4.9,I={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},be={fmt:"wet"},q={fmt:"pct"},Ce={fmt:"db"},rt={fmt:"signedPct"},Bt={fmt:"num",suffix:" ms"},N={div:100};function S(t,e,n,i,r,o,s,c){var u={key:t,label:e,min:n,max:i,default:r,step:1,k:o,unit:null,format:s};if(c)for(var l in c)u[l]=c[l];return u}function ot(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var Ue=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[S("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:I.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[S("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:I.hpHz,astrid:!0,zero:"off"}),S("q","Resonance",0,100,0,2,{fmt:"q",law:I.hpQ},{dsp:{law:I.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[S("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:I.bpHz,astrid:!0},{dsp:{law:I.bpHz}}),S("q","Q",0,100,0,2,{fmt:"q",law:I.bpQ},{dsp:{law:I.bpQ}}),S("mix","Mix",0,100,100,3,be,{dsp:N,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[S("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:ot(Gi),overriddenBy:"beats_free",tempoSynced:!0}),S("feedback","Feedback",0,90,35,2,q,{dsp:N,unit:"%"}),S("mix","Wet/dry",0,100,0,3,be,{dsp:N,unit:"%",astridKey:"wet"}),S("tone","Tone",0,100,100,4,{fmt:"hz",law:I.delayTone,offAt:100},{dsp:{div:99},more:!0}),S("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),S("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:ot([[0,"Insert"],[1,"Send"]]),more:!0}),S("send","Send",0,100,100,7,q,{dsp:N,unit:"%",more:!0}),S("mod_send","Accent → send",-100,100,0,8,rt,{dsp:N,unit:"%",more:!0}),S("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[S("predelay","Pre-delay",0,200,0,1,Bt,{dsp:{div:1e3},unit:"ms"}),S("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:N,unit:"%"}),S("decay","Decay",0,100,50,3,q,{dsp:N,unit:"%"}),S("damping","Damping",0,100,0,4,q,{dsp:N,unit:"%"}),S("mix","Mix",0,100,0,5,be,{dsp:N,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[S("rate","Rate",0,100,26,1,{fmt:"rate",law:I.rate},{dsp:{law:I.rate}}),S("depth","Depth",0,100,70,2,q,{dsp:N,unit:"%"}),S("feedback","Feedback",-90,90,50,3,rt,{dsp:N,unit:"%"}),S("mix","Mix",0,100,50,4,be,{dsp:N,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[S("rate","Rate",0,100,52,1,{fmt:"rate",law:I.rate},{dsp:{law:I.rate}}),S("depth","Depth",0,100,50,2,q,{dsp:N,unit:"%"}),S("spread","Spread",0,100,70,3,q,{dsp:N,unit:"%"}),S("mix","Mix",0,100,40,4,be,{dsp:N,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[S("rate","Rate",0,100,39,1,{fmt:"rate",law:I.rate},{dsp:{law:I.rate}}),S("depth","Depth",0,100,70,2,q,{dsp:N,unit:"%"}),S("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:ot([[4,"4"],[6,"6"],[8,"8"]])}),S("feedback","Feedback",0,90,30,4,q,{dsp:N,unit:"%"}),S("mix","Mix",0,100,50,5,be,{dsp:N,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[S("low_db","Low",-18,18,0,1,Ce,{unit:"dB"}),S("mid_db","Mid",-18,18,0,2,Ce,{unit:"dB"}),S("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:I.midHz,astrid:!0},{dsp:{law:I.midHz}}),S("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:I.eqQ},{dsp:{law:I.eqQ}}),S("high_db","High",-18,18,0,4,Ce,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[S("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),S("output_db","Output",-12,12,0,2,Ce,{unit:"dB"}),S("mix","Mix",0,100,100,3,be,{dsp:N,unit:"%"}),S("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:ot([[0,"Smooth"],[1,"Acid"]]),more:!0}),S("tone","Tone",0,100,100,5,{fmt:"hz",law:I.driveTone,offAt:100},{dsp:{div:99},more:!0}),S("mod_drive","Accent → drive",-100,100,0,6,rt,{dsp:N,unit:"%",more:!0}),S("mod_tone","Accent → tone",-100,100,0,7,rt,{dsp:N,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[S("threshold_db","Threshold",-60,0,0,1,Ce,{unit:"dB"}),S("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:I.ratio},{dsp:{law:I.ratio}}),S("attack_ms","Attack",1,100,10,3,Bt,{unit:"ms"}),S("release_ms","Release",10,1e3,150,4,Bt,{unit:"ms"}),S("makeup_db","Makeup",0,24,0,5,Ce,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[S("width","Width",0,200,100,1,q,{dsp:N,unit:"%"}),S("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:N})]}],Fi=Ue.map(function(t){return t.type});Ue.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Di={reverb:"plate"};function mn(t){var e=Di[t]||t;return Fi.indexOf(e)>=0?e:null}function ie(t){for(var e=mn(t),n=0;n<Ue.length;n++)if(Ue[n].type===e)return Ue[n];return null}function Re(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function ma(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var i=Re(n.law,e);return i===null?0:i}function Cn(t,e){return Math.min(Hi,t*60/(e>0?e:120))}var Tn=function(t){return t>0?"+":t<0?"−":""};function Zi(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function fa(t,e,n){var i=t.format,r;switch(i.fmt){case"db":return e===0&&i.zero?i.zero:Tn(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Tn(e)+Math.abs(e)+"%";case"num":return e+i.suffix;case"fixed":return(i.add+e/i.div).toFixed(i.digits)+i.suffix;case"hz":return i.offAt!==void 0&&e>=i.offAt?"off":i.law?(r=Re(i.law,e),r===null?i.zero||"open":i.astrid?Zi(r):r+" Hz"):e===0&&i.zero?i.zero:e+" Hz";case"q":return"Q "+Re(i.law,e).toFixed(1);case"ratio":return Re(i.law,e).toFixed(1)+":1";case"rate":return r=Re(i.law,e),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var o=0;o<t.options.length;o++)if(t.options[o].value===e)return t.options[o].label;return String(e);case"tempoMs":return Math.round(Cn(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Cn(e,n)*1e3)+" ms"}return String(e)}var Yi=1,Mt=["drive","delay","plate"];function Xi(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(i,r){return fa(t,i,r)},e}var Ve=Mt.map(function(t){var e=ie(t),n={type:t,label:e.label,dials:e.dials.map(Xi)};return e.tempoSynced&&(n.tempoSynced=!0),n}),_i={reverb:"plate"};function ft(t){var e=_i[t]||t;return Mt.indexOf(e)>=0?e:null}function Et(t){for(var e=ft(t),n=0;n<Ve.length;n++)if(Ve[n].type===e)return Ve[n];return null}function ga(t,e){var n=Et(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}function Oe(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function me(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var i=t.options[0].value,r=1;r<t.options.length;r++)Math.abs(t.options[r].value-e)<Math.abs(i-e)&&(i=t.options[r].value);return i}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*o)/o))+0}function qi(){return{v:Yi,chain:Ve.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Ui(t){return Xt.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Xt[0])}function Wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Vi(t){for(var e=Array.isArray(t)?t:Wt(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),i=qi(),r={},o=[],s=0;s<e.length;s++){var c=e[s];if(Wt(c)){var u=ft(c.type);if(!u){typeof c.type=="string"&&o.push(c.type);continue}if(r[u]){o.push(u);continue}r[u]=!0;var l=i.chain[Mt.indexOf(u)],d=Wt(c.dials)?c.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),l.bypass=n?c.bypass===!0:c.bypass!==!1,Et(u).dials.forEach(function(h){l.dials[h.key]=me(h,d[h.key])}),Ki(u,l.dials,d)}}return{state:i,dropped:o}}function Ki(t,e,n){for(var i=Et(t),r=0;r<i.dials.length;r++){var o=i.dials[r];o.stepWhen&&(e[o.key]=me(o,n&&typeof n[o.key]=="number"?n[o.key]:e[o.key],Oe(o,e)))}}function _t(t){return Vi(t).state}function Ji(t){return JSON.parse(JSON.stringify(t))}var Qi=24,qt={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ut(t,e,n){if(e==="bypass")return n?0:1;var i=ga(t,e)||er(t,e);return i?ma(i,n):0}function er(t,e){var n=ie(t);if(!n)return null;for(var i=0;i<n.dials.length;i++)if(n.dials[i].key===e)return n.dials[i];return null}var tr={};Ve.forEach(function(t){t.dials.forEach(function(e){tr[t.type+"."+e.key]=e.format})});function Gt(t,e){var n=new Float64Array(Qi),i=_t(t);return i.chain.forEach(function(r){var o=qt[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=Ut(r.type,s,r.dials[s])})}),n}var nr=2,gt=3,ar=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Ze(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ba(t,e){var n=ie(t);if(!n)return null;var i={};(e||[]).forEach(function(s){s&&s.id&&(i[s.id]=!0)});for(var r=1;i[n.type+"-"+r];)r++;var o={};return n.dials.forEach(function(s){o[s.key]=s.default}),{id:n.type+"-"+r,type:n.type,bypass:!1,dials:o}}function ir(t){var e=ie(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function rr(t,e,n){var i=t.length-1,r=Math.max(0,Math.min(i,n));if(e<0||e>i||e===r)return t;var o=t.slice(),s=o.splice(e,1)[0];return o.splice(r,0,s),o}function or(t){return typeof t=="number"&&isFinite(t)?Ui(t):t}function Nn(t,e,n){var i={};return t.dials.forEach(function(r){var o=e[r.key];o===void 0&&r.astridKey&&(o=e[r.astridKey]),n&&t.type==="delay"&&r.key==="delay_beats"&&(o=or(o)),i[r.key]=me(r,o)}),t.dials.forEach(function(r){r.stepWhen&&(i[r.key]=me(r,typeof e[r.key]=="number"?e[r.key]:i[r.key],Oe(r,i)))}),i}function sr(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var i=t.min,r=1/0,o=t.min;o<=t.max;o++){var s=Re(n.law,o),c=s===null?1/0:Math.abs(s-e);c<r&&(r=c,i=o)}return i}}var lr={rate:"rate_hz"};function cr(t,e,n,i){var r={};return t.dials.forEach(function(o){if(!o.more){var s=o.astridKey||lr[o.key]||o.key;r[o.key]=sr(o,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(i+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function dr(t,e){var n=e>0?Math.floor(e):gt,i=[],r=[],o=[],s=!1,c=!1;Array.isArray(t)?(o=t,c=!0):Ze(t)&&Array.isArray(t.chain)&&(o=t.chain,s=t.v===1,c=t.schema===2);for(var u=[],l=0;l<o.length;l++){var d=o[l];if(Ze(d)&&!(d.type==="limiter"||d.fixed===!0)){var h=mn(d.type),f=h&&ie(h);if(!f||s&&["drive","delay","plate"].indexOf(h)<0){typeof d.type=="string"&&i.push(d.type);continue}if(u.length>=n){i.push(d.id||h);continue}var b;Ze(d.params)&&!Ze(d.dials)?b=Nn(f,cr(f,d.params,r,d.id||h),c):b=Nn(f,Ze(d.dials)?d.dials:{},c);var g=ba(h,u),y=typeof d.id=="string"&&ar.test(d.id)&&!u.some(function(m){return m.id===d.id})?d.id:g.id,p=s?d.bypass!==!1:d.bypass===!0;u.push({id:s?g.id:y,type:h,bypass:p,dials:b})}}return{state:{v:nr,chain:u},dropped:i,notes:r}}function ut(t,e){return dr(t,e).state}function Te(t){var e=ie(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(i){n.push([i.k,ma(i,t.dials[i.key])])}),n}function ur(t){var e=ut(t,8),n=[],i=e.chain.map(function(r,o){var s=ie(r.type),c={};return o>=gt&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var l=r.dials[u.key];if(u.more){l!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&Xt.indexOf(l)<0&&n.push(r.id+".delay_beats"),c[u.astridKey||u.key]=l}),{id:r.id,type:r.type,bypass:r.bypass,dials:c}});return{hacks:i,lossy:n}}var pr="nc-fx@1",hr=600,mr=256,fr=8,Ye=typeof WeakMap=="function"?new WeakMap:null;function gr(t,e){var n=Ye&&Ye.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var i=(await Wi(async()=>{const{default:o}=await import("./worklet-source-Cg0XnXjY.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([i],{type:"text/javascript"}));try{await t.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Ye&&(Ye.set(t,n),n.catch(function(){Ye.delete(t)})),n)}function Ne(t,e){return typeof t=="number"&&isFinite(t)?t:e}function ya(t,e,n,i){var r=Math.min(400,Math.max(20,Ne(e.bpm,120))),o=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",c=e.bypassMode==="hold"?"hold":"run",u=Ne(e.preGain,1),l=Math.max(0,Ne(e.crossfade,.012)),d=Ne(e.maxDelaySeconds,void 0),h=t.createGain(),f=t.createGain(),b=t.createGain(),g=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,h.connect(b),b.connect(f),g.connect(f);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r},m=n(r);p.post=function(v){p.node?p.node.port.postMessage(v):p.disposed||(o.length>=mr&&(o=i().concat([{t:"tempo",bpm:p.bpm,when:0}])),o.push(v))};function w(v){var k=o.map(function(L){var M=Object.assign({},L);return M.when>v||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return o=[],k}p.emit=function(v){for(var k=0;k<p.listeners.length;k++)try{p.listeners[k](v)}catch(L){typeof console<"u"&&console.error(L)}},p.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var $=!1;p.tooFar=function(v){return typeof v=="number"&&v>t.currentTime+hr?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var A=gr(t,e.moduleUrl).then(function(){if(!p.disposed){var v=Object.assign({bpm:r,bypassMode:c,limiter:s,preGain:u,maxDelaySeconds:d},m);v.pending=w(t.currentTime),p.node=new AudioWorkletNode(t,pr,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),h.connect(p.node),y&&y.connect(p.node,0,1),p.node.connect(g);var k=t.currentTime;k<=0||l===0?(b.gain.value=0,g.gain.value=1):(b.gain.setValueAtTime(1,k),b.gain.linearRampToValueAtTime(0,k+l),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+l)),p.status="ready"}},function(v){p.status="unavailable",o=[],p.error=v});return p.core={input:h,output:f,modInput:y,ready:A,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(v,k){var L=Ne(v,NaN);!(L>0)||p.disposed||p.tooFar(k)||(p.bpm=Math.min(400,Math.max(20,L)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(k)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function(v){var k=v&&typeof v=="object"?v:{at:v};if(!(p.disposed||p.tooFar(k.at))){var L=Ne(k.fadeMs,0);p.post({t:"clear",when:p.whenOf(k.at),fadeMs:L>0?Math.min(1e3,L):0})}},onChange:function(v){return p.listeners.push(v),function(){var k=p.listeners.indexOf(v);k>=0&&p.listeners.splice(k,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",o=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,b,g,f,y].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},p}function br(t,e){var n=e||{};if(n.slots)return yr(t,n);var i=_t(n.state),r=Array.from(Gt(i)),o=ya(t,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Gt(i)),when:0}]}),s=o.core;function c(u){return i.chain[Mt.indexOf(u)]}return s.setParam=function(u,l,d,h){var f=ft(u);if(!(!f||o.disposed||o.tooFar(h))){var b=c(f),g;if(l==="bypass")g=!!d;else{var y=ga(f,l);if(!y)return;g=me(y,d,Oe(y,b.dials))}return l==="bypass"?b.bypass=g:b.dials[l]=g,o.post({t:"p",i:qt[f][l],v:Ut(f,l,g),when:o.whenOf(h)}),o.emit({effect:f,key:l,value:g}),Et(f).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function($){return $.key===l}))){var m=b.dials[p.key],w=me(p,m,Oe(p,b.dials));w!==m&&(b.dials[p.key]=w,o.post({t:"p",i:qt[f][p.key],v:Ut(f,p.key,w),when:o.whenOf(h)}),o.emit({effect:f,key:p.key,value:w}))}}),g}},s.getParam=function(u,l){var d=ft(u);if(d){var h=c(d);return l==="bypass"?h.bypass:h.dials[l]}},s.getState=function(){return Ji(i)},s.setState=function(u,l){o.disposed||o.tooFar(l&&l.at)||(i=_t(u),o.post({t:"load",program:Array.from(Gt(i)),when:o.whenOf(l&&l.at)}),o.emit({effect:null,key:null,value:null}))},s}function yr(t,e){var n=e.slots===!0?gt:Math.max(1,Math.min(fr,Math.floor(+e.slots)||gt)),i=ut(e.state,n),r=1,o={};function s(p){return o[p.id]||(o[p.id]=r++),o[p.id]}function c(p){return p.map(function(m){return{uid:s(m),type:m.type,program:Te(m)}})}var u=c(i.chain),l=i.chain.map(function(p){return o[p.id]}),d=ya(t,e,function(){return{slots:n,chain:u,order:l}},function(){return[{t:"sync",chain:c(i.chain),order:i.chain.map(function(p){return o[p.id]}),when:0}]}),h=d.core;function f(p){var m;for(m=0;m<i.chain.length;m++)if(i.chain[m].id===p)return i.chain[m];var w=mn(p);if(w){for(m=0;m<i.chain.length;m++)if(i.chain[m].type===w)return i.chain[m]}return null}function b(p,m){var w=s(p);d.post({t:"add",uid:w,type:p.type,when:m}),Te(p).forEach(function($){d.post({t:"ps",uid:w,k:$[0],v:$[1],when:m,snap:!0})})}function g(p){d.post({t:"order",uids:i.chain.map(function(m){return o[m.id]}),when:p})}function y(p,m){var w={};i.chain.forEach(function(v){w[v.id]=v});var $=i.chain.map(function(v){return o[v.id]}).join();p.chain.forEach(function(v){var k=w[v.id];if(!k||k.type!==v.type){delete o[v.id],b(v,m);return}var L={};Te(k).forEach(function(M){L[M[0]]=M[1]}),Te(v).forEach(function(M){L[M[0]]!==M[1]&&d.post({t:"ps",uid:o[v.id],k:M[0],v:M[1],when:m})})});var A={};p.chain.forEach(function(v){A[v.id]=!0}),Object.keys(o).forEach(function(v){A[v]||delete o[v]}),i=p,i.chain.map(function(v){return o[v.id]}).join()!==$&&g(m)}return h.slots=n,h.setParam=function(p,m,w,$){var A=f(p);if(!(!A||d.disposed||d.tooFar($))){var v=ie(A.type),k,L=null;if(m==="bypass")k=!!w;else{for(var M=0;M<v.dials.length;M++)v.dials[M].key===m&&(L=v.dials[M]);if(!L)return;k=me(L,w,Oe(L,A.dials))}var X={},_={};Te(A).forEach(function(C){X[C[0]]=C[1]}),v.dials.forEach(function(C){C.stepWhen&&(_[C.key]=A.dials[C.key])}),m==="bypass"?A.bypass=k:A.dials[m]=k,v.dials.forEach(function(C){C.stepWhen&&(A.dials[C.key]=me(C,A.dials[C.key],Oe(C,A.dials)))});var xe=d.whenOf($),Se=o[A.id];return Te(A).forEach(function(C){(X[C[0]]!==C[1]||L&&C[0]===L.k)&&d.post({t:"ps",uid:Se,k:C[0],v:C[1],when:xe})}),d.emit({effect:A.id,key:m,value:k}),Object.keys(_).forEach(function(C){C!==m&&A.dials[C]!==_[C]&&d.emit({effect:A.id,key:C,value:A.dials[C]})}),k}},h.getParam=function(p,m){var w=f(p);if(w)return m==="bypass"?w.bypass:w.dials[m]},h.getState=function(){return JSON.parse(JSON.stringify(i))},h.setState=function(p,m){d.disposed||d.tooFar(m&&m.at)||(y(ut(p,n),d.whenOf(m&&m.at)),d.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,m){var w=m||{},$=ba(p,i.chain);if(!(!$||i.chain.length>=n||d.disposed||d.tooFar(w.at))){if(w.dials){var A=ut({v:2,chain:[{id:$.id,type:$.type,dials:w.dials}]},1).chain[0];$.dials=A.dials}w.bypass===!0&&($.bypass=!0);var v=i.chain.slice(),k=typeof w.index=="number"?Math.max(0,Math.min(v.length,w.index)):v.length;return v.splice(k,0,$),y({v:2,chain:v},d.whenOf(w.at)),d.emit({effect:$.id,key:"chain",value:"add"}),$.id}},h.removeEffect=function(p,m){var w=f(p),$=m&&m.at;return!w||d.disposed||d.tooFar($)?!1:(y({v:2,chain:i.chain.filter(function(A){return A!==w})},d.whenOf($)),d.emit({effect:w.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,m,w){var $=f(p),A=w&&w.at;if(!$||d.disposed||d.tooFar(A))return!1;var v=rr(i.chain,i.chain.indexOf($),m);return v===i.chain?!1:(y({v:2,chain:v},d.whenOf(A)),d.emit({effect:$.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return i.chain.map(function(p){return{id:p.id,type:p.type,name:ir(p),bypass:p.bypass}})},h.toAstrid=function(){return ur(i)},h}function In(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function vr(t,e,n){var i=n||{},r=i.mapper&&typeof i.mapper.toContextTime=="function"?i.mapper:null,o=typeof i.toAudioTime=="function"?i.toAudioTime:r?function(f){return r.toContextTime(f)}:e&&e.timebase==="shared"?null:function(f){return f},s=typeof i.now=="function"?i.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,c=e&&e.transport?e.transport:e,u=c&&c.tempo?c.tempo:c,l=!1;function d(f){if(!o){!l&&typeof console<"u"&&(l=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!c||typeof c.timeAt!="function"||typeof f!="number")){var b=o(c.timeAt(f));return typeof b=="number"&&isFinite(b)?b:void 0}}function h(){var f=s&&c&&typeof c.beatAt=="function"?c.beatAt(s()):NaN;if(!isFinite(f)){var b=c&&typeof c.bpm=="number"?c.bpm:In(u,0);b>0&&t.setTempo(b);return}var g=In(u,f);g>0&&t.setTempo(g);for(var y=u&&(u.points||u.tempoPoints)||[],p=0;p<y.length;p++){var m=y[p];if(m.beat>f&&m.bpm>0){var w=d(m.beat);w!==void 0&&t.setTempo(m.bpm,w)}}}return h(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(f){f&&(f.kind==="tempo"&&f.bpm>0?t.setTempo(f.bpm,d(f.atBeat)):(f.kind==="snapshot"||f.kind==="start")&&h())})}const wr="/nyx/assets/worklet-CnpUVY5i.js";var $r="nc-ui",va={"label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF"},Vt={rhythm:{"step-cell-ink":"#F5F5F5","velocity-min":"#477399","velocity-max":"#003153"}},ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},_e=t=>`--${$r}-${t}`,Kt=va["label-on-fill-dark"],zn=va["label-on-fill-light"],kr=ye["label-min-contrast"],xr=/^#[0-9a-f]{6}$/i,Sr=t=>typeof t=="string"&&xr.test(t),pt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Rn(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let i=e*Math.min(n,1-n),r=o=>{let s=(o+t/30)%12;return n-i*Math.max(-1,Math.min(s-3,9-s,1))};return`#${pt(r(0)*255)}${pt(r(8)*255)}${pt(r(4)*255)}`}function wa(t){let[e,n,i]=[1,3,5].map(l=>parseInt(t.slice(l,l+2),16)/255),r=Math.max(e,n,i),o=Math.min(e,n,i),s=(r+o)/2,c=r-o;if(!c)return{h:0,s:0,l:s};let u=c/(1-Math.abs(2*s-1));return{h:((r===e?60*((n-i)/c%6):r===n?60*((i-e)/c+2):60*((e-n)/c+4))+360)%360,s:u,l:s}}function jn(t){let[e,n,i]=[1,3,5].map(r=>{let o=parseInt(t.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*i}function Jt(t,e){let[n,i]=[jn(t),jn(e)].sort((r,o)=>o-r);return(n+.05)/(i+.05)}var bt=t=>Jt(t,Kt)>=Jt(t,zn)?Kt:zn;function $a(t,e,n,i=kr){let r=Rn(t,e,n),o=bt(r)===Kt?1:-1;for(let s=0;s<40&&Jt(r,bt(r))<i;s++)n+=o*.01,r=Rn(t,e,n);return r}function Ar(t){let{h:e,s:n}=wa(t),i=$a(e,Math.min(n,ye["surprise-on-max-saturation"]),ye["surprise-on-lightness"]);return{fill:t,ink:bt(t),on:i,onInk:bt(i)}}var Lr=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Mr(t,e=Math.random){let[n,i]=ye["surprise-saturation"],[r,o]=ye["surprise-lightness"],s=ye["surprise-min-hue-gap"],c=Sr(t)?wa(t).h:null,u=e()*360;return c!==null&&Lr(u,c)<s&&(u=(c+s+e()*(360-2*s))%360),$a(u,n+e()*(i-n),r+e()*(o-r))}function Er(t){if(!t)return null;let e=Ar(t);return{[_e("surprise-fill")]:e.fill,[_e("surprise-ink")]:e.ink,[_e("surprise-on")]:e.on,[_e("surprise-on-ink")]:e.onInk}}var Cr=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Tr=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Pn(t){let[e,n,i]=[1,3,5].map(c=>Cr(parseInt(t.slice(c,c+2),16)/255)),r=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*i),o=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*i),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*i);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function Nr([t,e,n]){let i=(t+.3963377774*e+.2158037573*n)**3,r=(t-.1055613458*e-.0638541728*n)**3,o=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*i-3.3077115913*r+.2309699292*o,-1.2684380046*i+2.6097574011*r-.3413193965*o,-.0041960863*i-.7034186147*r+1.707614701*o].map(s=>pt(Tr(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ir=ye["velocity-range"],ka={min:Vt.rhythm["velocity-min"],max:Vt.rhythm["velocity-max"]};function zr(t,e=ka){let[n,i]=Ir,r=Number.isFinite(t)?Math.max(n,Math.min(i,t)):n,o=(r-n)/(i-n),s=Vt.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:e.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:e.max.toUpperCase(),ink:s};let c=Pn(e.min),u=Pn(e.max);return{velocity:r,t:o,fill:Nr(c.map((l,d)=>l+(u[d]-l)*o)),ink:s}}function On(t,e=ka){return{[_e("velocity-fill")]:zr(t,e).fill}}var Rr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},jr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Pr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Or={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ct={};for(let[t,e]of Object.entries(jr))Ct[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(Or))Ct[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(Pr))Ct[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(Rr.renames.map(t=>[t.old,t.new]));function xa(t){let e=Ct[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function j(t){return xa(t).prop}function a(t){return`var(${j(t)})`}function Br(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(j(e)));return Number.isFinite(n)?n:0}function O(t,e){let n=xa(e),i=t.ownerDocument??document,r=i.createElement("span");r.dataset.ncLive=e,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(t instanceof Element?t:i.documentElement).append(r);let s=(i.defaultView??window).getComputedStyle(r),c=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),c}function Wr(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function Gr(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let i=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),i}var Hr="[data-modulated], [data-modulated] *";function Fr(){let t=i=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${i}"],
    .nc-ui-fx[data-nc-depth="${i}"] {
      background: ${a(`module-bg-stack-${i}`)};
      ${j("text-sub")}: ${a(`module-sub-stack-${i}`)};
      ${j("divider")}: ${a(`module-div-stack-${i}`)};
      ${j("slider-track")}: ${a(`module-div-stack-${i}`)};
    }`,e=i=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${i}"] { background: ${a(`module-bg-adjacent-${i}`)}; }`,n=i=>i<4?`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${i+1}`)}; }`:`.nc-module[data-nc-shade="${i}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${j("text-sub")}: ${a("module-sub-stack-1")};
      ${j("divider")}: ${a("module-div-stack-1")};
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
${Hr} { transition: none; }
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
.nc-padgrid-pad-name { font-weight: ${a("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${a("text-sub")}; font-size: ${a("readout-size-small")}; }
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
  ${j("text-sub")}: ${a("module-sub-stack-1")};
  ${j("divider")}: ${a("module-div-stack-1")};
  ${j("slider-track")}: ${a("module-div-stack-1")};
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
  ${j("text-sub")}: ${a("module-sub-stack-1")};
  ${j("divider")}: ${a("module-div-stack-1")};
  ${j("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${j("text-sub")}: inherit;
  ${j("divider")}: inherit;
  ${j("slider-track")}: inherit;
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
/* Every other channel strip is shaded, so a row of identical strips reads apart (the master keeps the module's). */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${a("strip-alt-bg")}; }
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
`}var Ht=null,Dr="nc-ui-fallback";function Sa(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ht&&Ht.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${Dr} {
${Fr()}
}
`,t.head.append(e),Ht=e}var Xe=null,Zr=0,Yr=new URL("data:text/css;base64,LyogbmMtdWkgY29uZmlybSAoY29uZmlybS5qcyBsaW5rcyB0aGlzIGZpbGUgb25jZSBwZXIgZG9jdW1lbnQ7IG5vIGtpdC5qcyBuZWVkZWQpLiBPbmUgcXVlc3Rpb24gb3ZlciBhIGRpbW1lZCwKICAgaW5lcnQgcGFnZS4gQ2FuY2VsIGlzIGFuIG91dGxpbmVkIGJ1dHRvbiBsaWtlIC5uYy1idG47IHRoZSBhY3Rpb24gZmlsbHMgd2l0aCBkYW5nZXIgd2hlbiBpdCBpcyBkZXN0cnVjdGl2ZS4gVGhlCiAgIGxheWVyIGZhZGVzIGluIHdpdGggbW90aW9uLWZhZGUgYW5kIG91dCB3aXRoIG1vdGlvbi1mYWRlLW91dCwgdGhlIGJveCBzY2FsZXMgaW4gd2l0aCBtb3Rpb24tc2xpZGUuCiAgIFNlbWFudGljIHRva2VucyBvbmx5LiBFdmVyeSB2YXIoKSBjYXJyaWVzIHRoZSB0b2tlbidzIGN1cnJlbnQgdmFsdWUgYXMgaXRzIGZhbGxiYWNrLCBzbyB0aGUgZGlhbG9nIGxvb2tzIHRoZSBzYW1lCiAgIGluIGFuIGFwcCB3aXRob3V0IG5jLXVpIHRva2VucyAoQmFzcyk7IHRlc3QvY29uZmlybS50ZXN0Lm1qcyBjaGVja3MgZWFjaCBmYWxsYmFjayBhZ2FpbnN0IGRpc3QvdG9rZW5zLmpzLiAqLwoubmMtdWktY29uZmlybS1sYXllciwKLm5jLXVpLWNvbmZpcm0tbGF5ZXIgKiB7CiAgYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoubmMtdWktY29uZmlybS1sYXllciB7CiAgcG9zaXRpb246IGZpeGVkOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDMwOwogIGRpc3BsYXk6IGdyaWQ7CiAgcGxhY2UtaXRlbXM6IGNlbnRlcjsKICBwYWRkaW5nOiB2YXIoLS1uYy11aS1kaWFsb2ctcGFkLCAxNnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1kaWFsb2ctc2NyaW0sIHJnYmEoMzYsMzYsMzYsMC4zNSkpOwogIG9wYWNpdHk6IDA7CiAgdG91Y2gtYWN0aW9uOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUsIC4ycykgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtZWFzaW5nLCBlYXNlKTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gewogIG9wYWNpdHk6IDE7Cn0KLm5jLXVpLWNvbmZpcm0tbGF5ZXJbZGF0YS1zdGF0ZT0iY2xvc2luZyJdIHsKICBvcGFjaXR5OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmMtdWktbW90aW9uLWZhZGUtb3V0LCAuMjVzKSB2YXIoLS1uYy11aS1tb3Rpb24tZmFkZS1vdXQtZWFzaW5nLCBlYXNlLW91dCk7Cn0KLm5jLXVpLWNvbmZpcm0gewogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1nYXAsIDEycHgpOwogIHdpZHRoOiBtaW4odmFyKC0tbmMtdWktZGlhbG9nLXdpZHRoLCAzMjBweCksIDEwMCUpOwogIHBhZGRpbmc6IHZhcigtLW5jLXVpLWRpYWxvZy1wYWQsIDE2cHgpOwogIGJvcmRlcjogdmFyKC0tbmMtdWktaGFpcmxpbmUsIDFweCkgc29saWQgdmFyKC0tbmMtdWktZGl2aWRlciwgI0RERERERCk7CiAgYm9yZGVyLXJhZGl1czogdmFyKC0tbmMtdWktZGlhbG9nLXJhZGl1cywgMnB4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXBhZ2UsICNGNUY1RjUpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LCAjMjQyNDI0KTsKICBmb250LWZhbWlseTogdmFyKC0tbmMtdWktZm9udC11aSwgJ0ludGVyJywgJ0dlaXN0Jywgc2Fucy1zZXJpZik7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGZvbnQtd2VpZ2h0OiB2YXIoLS1uYy11aS10aXRsZS13ZWlnaHQsIDQwMCk7CiAgbGluZS1oZWlnaHQ6IHZhcigtLW5jLXVpLWRpYWxvZy1sZWFkaW5nLCAxLjM1KTsKICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOwogIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS1uYy11aS1tb3Rpb24tc2xpZGUsIC4yMnMpIHZhcigtLW5jLXVpLW1vdGlvbi1zbGlkZS1lYXNpbmcsIGVhc2Utb3V0KTsKfQoubmMtdWktY29uZmlybS1sYXllcltkYXRhLXN0YXRlPSJvcGVuIl0gLm5jLXVpLWNvbmZpcm0gewogIHRyYW5zZm9ybTogbm9uZTsKfQoubmMtdWktY29uZmlybS10aXRsZSB7CiAgbWFyZ2luOiAwOwogIGZvbnQtc2l6ZTogdmFyKC0tbmMtdWktdGl0bGUtc2l6ZS1zbGltLCAxOHB4KTsKICBmb250LXdlaWdodDogdmFyKC0tbmMtdWktdGl0bGUtd2VpZ2h0LCA0MDApOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS10aXRsZS10cmFja2luZywgLS4wMWVtKTsKfQoubmMtdWktY29uZmlybS1ib2R5IHsKICBtYXJnaW46IDA7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1ib2R5LXNpemUsIDEzcHgpOwogIGNvbG9yOiB2YXIoLS1uYy11aS10ZXh0LXN1YiwgIzU5NTk1OSk7Cn0KLm5jLXVpLWNvbmZpcm0tYWN0aW9ucyB7CiAgZGlzcGxheTogZmxleDsKICBnYXA6IHZhcigtLW5jLXVpLWRpYWxvZy1idXR0b24tZ2FwLCA4cHgpOwp9CmJ1dHRvbi5uYy11aS1jb25maXJtLWJ0biB7CiAgZmxleDogMSAxIDA7CiAgbWluLXdpZHRoOiAwOwogIG1pbi1oZWlnaHQ6IHZhcigtLW5jLXVpLXRhcmdldC1taW4sIDQ0cHgpOwogIG92ZXJmbG93OiBoaWRkZW47CiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICBib3JkZXI6IHZhcigtLW5jLXVpLWhhaXJsaW5lLCAxcHgpIHNvbGlkIHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGJvcmRlci1yYWRpdXM6IDA7CiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7CiAgY29sb3I6IHZhcigtLW5jLXVpLXRleHQsICMyNDI0MjQpOwogIGZvbnQ6IGluaGVyaXQ7CiAgZm9udC1zaXplOiB2YXIoLS1uYy11aS1yZWFkb3V0LXNpemUsIDEycHgpOwogIGxldHRlci1zcGFjaW5nOiB2YXIoLS1uYy11aS1sYWJlbC10cmFja2luZywgLjE0ZW0pOwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRyYW5zaXRpb24tcHJvcGVydHk6IGNvbG9yLCBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3I7CiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0tbmMtdWktdHJhbnNpdGlvbi1mZWVkYmFjaywgLjE1cyk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiB2YXIoLS1uYy11aS1zdXJmYWNlLXJhaXNlZCwgI0VBRUFFQSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuW2RhdGEtZGFuZ2VyPSJ0cnVlIl0gewogIGJvcmRlci1jb2xvcjogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgYmFja2dyb3VuZDogdmFyKC0tbmMtdWktZGFuZ2VyLCBoc2woOCA1NSUgNDQlKSk7CiAgY29sb3I6IHZhcigtLW5jLXVpLW9uLWRhbmdlciwgI0Y1RjVGNSk7Cn0KYnV0dG9uLm5jLXVpLWNvbmZpcm0tYnRuOmZvY3VzIHsKICBvdXRsaW5lOiB2YXIoLS1uYy11aS1mb2N1cy13aWR0aC1zdHJvbmcsIDJweCkgc29saWQgdmFyKC0tbmMtdWktZm9jdXMtcmluZywgIzAwMzE1Myk7CiAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLW5jLXVpLWZvY3VzLXdpZHRoLXN0cm9uZywgMnB4KTsKfQpAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkgewogIC5uYy11aS1jb25maXJtLWxheWVyLAogIC5uYy11aS1jb25maXJtLWxheWVyW2RhdGEtc3RhdGU9ImNsb3NpbmciXSwKICAubmMtdWktY29uZmlybSwKICBidXR0b24ubmMtdWktY29uZmlybS1idG4gewogICAgdHJhbnNpdGlvbjogbm9uZTsKICAgIGFuaW1hdGlvbjogbm9uZTsKICB9Cn0K",import.meta.url).href,Aa=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=Yr,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let i=()=>{e.ncWait=null,n()};e.onload=i,e.onerror=i}),t.head.append(e)),e?.ncWait};typeof document<"u"&&Aa(document);function Xr({title:t,body:e,confirmLabel:n="Confirm",cancelLabel:i="Cancel",danger:r=!1,root:o,returnFocus:s,signal:c}){if(Xe||c?.aborted)return Promise.resolve(!1);let u=o?.ownerDocument??document,l=Aa(u),d=o??u.body,h=u.defaultView??globalThis,f=`nc-ui-confirm-${++Zr}`,b=(E,re,V)=>{let Le=u.createElement(E);return Le.className=`nc-ui-confirm${re}`,V!=null&&(Le.textContent=V),Le},g=b("div","-layer");g.dataset.state="enter";let y=b("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${f}-t`),y.setAttribute("aria-describedby",`${f}-b`);let p=b("h2","-title",t);p.id=`${f}-t`;let m=b("p","-body",e);m.id=`${f}-b`;let w=b("div","-actions"),$=(E,re)=>{let V=b("button","-btn",E);return V.type="button",V.dataset.ncConfirm=re,V.addEventListener("click",()=>Ae(re==="ok")),V},A=$(i,"cancel"),v=$(n,"ok");r&&(v.dataset.danger="true"),w.append(A,v),y.append(p,m,w),g.append(y);let k={layer:g};Xe=k;let L=s??u.activeElement,M=[];for(let E of d.children)E.hasAttribute("inert")||(E.setAttribute("inert",""),M.push(E));let X=()=>{if(Xe!==k)return;d.append(g),A.focus({preventScroll:!0});let E=h.requestAnimationFrame?.bind(h)??(re=>setTimeout(re,16));E(()=>E(()=>{g.dataset.state==="enter"&&(g.dataset.state="open")}))};l?l.then(X):X();let _=!1;g.addEventListener("pointerdown",E=>{_=E.target===g}),g.addEventListener("click",E=>{E.target===g&&_&&Ae(!1),_=!1});let xe=E=>{E.stopImmediatePropagation(),E.key==="Escape"?(E.preventDefault(),Ae(!1)):E.key==="Tab"?(E.preventDefault(),(u.activeElement===A?v:A).focus()):E.key==="Enter"&&(E.preventDefault(),u.activeElement===v?Ae(!0):u.activeElement===A&&Ae(!1))},Se=E=>E.stopImmediatePropagation();h.addEventListener("keydown",xe,!0),h.addEventListener("keyup",Se,!0);let C=()=>Ae(!1);c?.addEventListener("abort",C);let Sn,bi=new Promise(E=>{Sn=E});function Ae(E){if(Xe!==k)return;Xe=null,h.removeEventListener("keydown",xe,!0),h.removeEventListener("keyup",Se,!0),c?.removeEventListener("abort",C);for(let Me of M)Me.removeAttribute("inert");g.dataset.state="closing",L?.isConnected&&typeof L.focus=="function"&&L.focus({preventScroll:!0});let re=h.getComputedStyle?.(g),V=Math.max(0,...String(re?.transitionDuration??"").split(",").map(Me=>Number.parseFloat(Me)*(Me.trim().endsWith("ms")?1:1e3)||0)),Le=()=>g.remove();g.addEventListener("transitionend",Me=>Me.target===g&&Le()),setTimeout(Le,V+50),Sn(E)}return bi}function La(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let i=e.createElement("span");i.className="nc-ui-switch-text",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.dataset.ncOn="",r.textContent=t.onText??"On";let o=e.createElement("span");o.dataset.ncOff="",o.textContent=t.offText??"Off",i.append(r,o),n.append(i);let s=!1,c=l=>{s=l===!0,n.setAttribute("aria-checked",s?"true":"false")};c(t.checked);let u=()=>{c(!s),t.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:c,destroy(){n.removeEventListener("click",u),n.remove()}}}var Ma=new WeakMap,Bn=.25;function _r(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let i=e.createElement("span");i.className="nc-fader-track",i.setAttribute("aria-hidden","true");let r=e.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(i,r);let o=0,s=t.step??.005,c=t.onChange,u=t.onReset,l=p=>Math.min(1,Math.max(0,p)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},h=p=>{let m=l(p);m!==o&&(o=m,d(),c?.(m))},f=0,b=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();p.target!==r&&m.height>0&&h(1-(p.clientY-m.top)/m.height),f=p.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!b)return;let m=n.getBoundingClientRect().height||1,w=(f-p.clientY)/m*(p.shiftKey?Bn:1);f=p.clientY,h(o+w)});let g=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",p=>{p.preventDefault(),u?.()}),n.addEventListener("keydown",p=>{let m=p.shiftKey?s*Bn:s,w={ArrowUp:o+m,ArrowRight:o+m,ArrowDown:o-m,ArrowLeft:o-m,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};p.key in w&&(p.preventDefault(),h(w[p.key]))});let y={el:n,get value(){return o},get dragging(){return b},set(p){b||(o=l(Number(p)||0),d())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(c=p.onChange),p.onReset&&(u=p.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),Ma.set(n,y),y}function qr(t){return Ma.get(t)}var Ea=new WeakMap,Ur=.2,Vr=1.5,Kr=.5;function Jr(t,e){let n=String(t??"").trim(),i=Number.parseFloat(n);return Number.isFinite(i)?n.endsWith("ms")?i/1e3:i:e}function Wn(t,e,n){let i=t.ownerDocument?.defaultView??globalThis;return typeof i.getComputedStyle!="function"?n:Jr(i.getComputedStyle(t).getPropertyValue(j(e)),n)}function Qr(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,i=e.createElement("div");i.className="nc-meter",i.dataset.ncChannels=String(n);let r=e.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=e.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let p=e.createElement("span");p.className="nc-meter-bar";let m=e.createElement("span");m.className="nc-meter-peak";let w=e.createElement("span");w.className="nc-meter-rms";let $=e.createElement("span");$.className="nc-meter-hold",p.append(m,w,$),o.append(p),s.push({peak:m,rms:w,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}i.append(r,o);let c=t.label,u=t.onClear,l=!1,d=-1,h=-1,f=()=>{r.dataset.lit=l?"true":"false",r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${c} clipped: clear`:`${c} clip light`),r.title=l?"Clipped. Click to clear":"Clip light"},b=(y,p,m,w)=>{let $=Math.round(w*1e3)/1e3;m[p]!==$&&(m[p]=$,y.style.transform=p==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};r.addEventListener("click",()=>{g.clear(),u?.()});let g={el:i,get clipped(){return l},update(y,p){d<0&&(d=Wn(i,"motion-meter-fall",Ur)),h<0&&(h=Wn(i,"motion-meter-hold",Vr));let m=Math.max(0,Math.min(.25,Number(p)||0)),w=d>0?Math.exp(-m/d):0;s.forEach(($,A)=>{let v=y[A]??y[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number(v.peak)||0)),L=Math.min(k,Math.max(0,Number(v.rms)||0));v.over&&g.clip(),$.level.peak=k>=$.level.peak?k:k+($.level.peak-k)*w,$.level.rms=L>=$.level.rms?L:L+($.level.rms-L)*w,$.holdAge+=m,k>=$.holdAt?($.holdAt=k,$.holdAge=0):$.holdAge>h&&($.holdAt=Math.max(k,$.holdAt-Kr*m)),b($.peak,"peak",$.shown,$.level.peak),b($.rms,"rms",$.shown,$.level.rms),b($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){l||(l=!0,f())},clear(){l=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,b(y.peak,"peak",y.shown,0),b(y.rms,"rms",y.shown,0),b(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){c=y,f()},configure(y){y.onClear&&(u=y.onClear)}};return f(),g.reset(),Ea.set(i,g),g}function eo(t){return t?Ea.get(t):void 0}function to(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),i=t.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(n*i));(t.width!==r||t.height!==o)&&(t.width=r,t.height=o);let s=t.getContext("2d");return s?.setTransform(i,0,0,i,0,0),{ctx:s,w:e,h:n}}function oe(t){return Math.max(0,Math.min(1,t))}function Ca(t,e){let{ctx:n,w:i,h:r}=to(t);if(!n)return;n.clearRect(0,0,i,r);let o=Gr(t);if(e.paint==="swatch"){let u=O(t,"accent"),l=O(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=l,n.fillStyle=u,n.fillRect(0,0,i/2,r),n.fillStyle=l,n.fillRect(i/2,0,i/2,r);return}if(e.paint==="filter"){let u=e.mode??"lp",l=O(t,Wr(u)),d=O(t,"divider"),h=oe(e.cutoff??.5),f=.08+(1-oe(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(i,r*.72),n.stroke(),n.beginPath();for(let b=0;b<=i;b++){let g=b/Math.max(1,i),y=0;u==="lp"?y=g<h?1:Math.max(0,1-(g-h)/f):u==="hp"?y=g>h?1:Math.max(0,1-(h-g)/f):y=Math.max(0,1-Math.abs(g-h)/f);let p=r*.78-y*r*.62;b===0?n.moveTo(b,p):n.lineTo(b,p)}n.strokeStyle=l,n.stroke(),n.fillStyle=O(t,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,r),t.dataset.ncAccent=l;return}if(e.paint==="envelope"){n.strokeStyle=O(t,"accent"),n.beginPath();let u=Math.max(.05,e.decay??.4);for(let l=0;l<=i;l++){let d=l/Math.max(1,i),h=(r-4)*(1-Math.exp(-d*4/u));n.lineTo(l,r-h)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let u=Array.isArray(e.peaks)?e.peaks:[],[l,d]=Array.isArray(e.region)?e.region:[0,1],h=O(t,"accent"),f=O(t,"text-sub"),b=r/2;n.fillStyle=O(t,"accent-soft"),n.fillRect(oe(l)*i,0,(oe(d)-oe(l))*i,r),n.strokeStyle=O(t,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(i,b),n.stroke();let g=Math.floor(u.length/2);for(let y=0;y<g;y++){let p=(y+.5)/g*i,m=Math.max(-1,Math.min(1,u[y*2]??0)),w=Math.max(-1,Math.min(1,u[y*2+1]??0)),$=(y+.5)/g;n.strokeStyle=$>=l&&$<=d?h:f,n.beginPath(),n.moveTo(p,b-w*(b-1)),n.lineTo(p,b-m*(b-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[l,d,...Array.isArray(e.markers)?e.markers:[]]){let p=Math.round(oe(y)*(i-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,r),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=O(t,"text"),n.fillRect(Math.round(oe(e.position)*(i-1)),0,1,r)),g||(n.fillStyle=f,n.font=o,n.fillText(e.empty??"Empty",0,b+4)),t.dataset.ncAccent=h;return}if(e.paint==="meter"){let u=oe(e.level??0);n.fillStyle=O(t,"divider"),n.fillRect(0,r*.4,i,r*.2),n.fillStyle=O(t,"accent"),n.fillRect(0,r*.4,i*u,r*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),c=((e.step??0)%s+s)%s;n.fillStyle=O(t,"rhythm.step-cell-off"),n.fillRect(0,r*.45,i,r*.1),n.fillStyle=O(t,"rhythm.playhead"),n.fillRect(c/s*i,r*.3,Math.max(1,i/s),r*.4),t.dataset.ncAccent=O(t,"accent")}var Ta={slop:8,longPressMs:500,pitchPx:16},no=class{constructor(t,e,n=Ta){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,i){if(this.phase!=="idle")return!1;let r=this.hit(e,n);return r<0?!1:(this.phase="pending",this.pointer=t,this.pad=r,this.x0=e,this.y0=n,this.t0=i,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,i){if(t!==this.pointer)return;let r=e-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(i),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,i){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,i),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function ao(t,e,n,i=Ta){let r=!1,o=0,s=(l,d)=>{let h=t.ownerDocument.elementFromPoint?.(l,d),f=[...t.querySelectorAll(e)],b=h?f.findIndex(p=>p===h||p.contains(h)):-1;if(b>=0)return b;let g=-1,y=Number.POSITIVE_INFINITY;return f.forEach((p,m)=>{if(p.hidden)return;let w=p.getBoundingClientRect();if(d<w.top||d>w.bottom)return;let $=Math.abs(l-(w.left+w.width/2));$<y&&$<=w.width&&(g=m,y=$)}),g},c=new no(s,l=>{(l.kind==="paint"||l.kind==="long")&&(r=!0),n(l)},i),u=()=>{o&&clearTimeout(o),o=0};return t.addEventListener("pointerdown",l=>{l.button>0||(r=!1,c.down(l.pointerId,l.clientX,l.clientY,l.timeStamp)&&(u(),o=setTimeout(()=>c.tick(performance.now()),i.longPressMs)))}),t.addEventListener("pointermove",l=>{c.state!=="idle"&&(c.move(l.pointerId,l.clientX,l.clientY,l.timeStamp),c.state!=="pending"&&u())}),t.addEventListener("pointerup",l=>{u(),c.up(l.pointerId,l.clientX,l.clientY,l.timeStamp)}),t.addEventListener("pointercancel",l=>{u(),c.cancel(l.pointerId)}),t.addEventListener("click",l=>{r&&(r=!1,l.stopPropagation(),l.preventDefault())},!0),t.addEventListener("contextmenu",l=>l.preventDefault()),c}var st="application/x-nc-pad",Gn="http://www.w3.org/2000/svg";function io(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),i=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*e/n),c=Math.max(s+1,Math.floor((o+1)*e/n)),u=0,l=0;for(let h=s;h<c;h++)u=Math.min(u,t[2*h]??0),l=Math.max(l,t[2*h+1]??0);let d=n===1?50:o/(n-1)*100;i.push(`${d.toFixed(1)} ${(10-Math.min(1,l)*10).toFixed(2)}`),r.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${i.join("L")}L${r.reverse().join("L")}Z`}function ro(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let i=document.createElement("div");return i.className="nc-padgrid-pads",i.dataset.ncColumns=String(t.columns??2),t.pads.forEach((r,o)=>i.append(oo(n,o,e))),n.append(i),n.addEventListener("keydown",r=>{r.key==="Escape"&&ht(n)}),Ia(n,t),n}function oo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-padgrid-pad",i.dataset.ncPad=String(e);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let c=document.createElementNS(Gn,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let u=document.createElementNS(Gn,"path");return c.append(u),i.append(r,o,s,c),lo(t,i,e,n),i.addEventListener("dblclick",()=>{let l=n(t);l?.type==="padGrid"&&l.onRename&&i.dataset.empty!=="true"&&Na(t,i,e,n)}),i.addEventListener("dragstart",l=>{if(i.dataset.empty==="true"||!l.dataTransfer){l.preventDefault();return}l.dataTransfer.setData(st,String(e)),l.dataTransfer.effectAllowed="copyMove",i.dataset.dragging="true"}),i.addEventListener("dragend",()=>delete i.dataset.dragging),i.addEventListener("dragover",l=>{let d=l.dataTransfer?.types??[];!d.includes("Files")&&!d.includes(st)||(l.preventDefault(),l.stopPropagation(),l.dataTransfer&&(l.dataTransfer.dropEffect=d.includes(st)&&!l.altKey?"move":"copy"),i.dataset.drop="true")}),i.addEventListener("dragleave",()=>delete i.dataset.drop),i.addEventListener("drop",l=>{delete i.dataset.drop;let d=n(t);if(d?.type!=="padGrid")return;let h=l.dataTransfer?.getData(st);if(h!==void 0&&h!==""){l.preventDefault(),l.stopPropagation();let b=Number(h);b!==e&&d.onMove?.(b,e,l.altKey);return}let f=l.dataTransfer?.files?.[0];f&&(l.preventDefault(),l.stopPropagation(),d.onFile?.(e,f))}),i}function so(t,e,n){let i=n(t);i?.type==="padGrid"&&i.onPress(e)}function lo(t,e,n,i){let r=0,o=!1,s=0,c=0,u=()=>{window.clearTimeout(r),r=0};e.addEventListener("pointerdown",l=>{l.button===0&&(o=!1,s=l.clientX,c=l.clientY,u(),r=window.setTimeout(()=>{r=0,o=Hn(t,e,n,i)},450))}),e.addEventListener("pointermove",l=>{r&&Math.hypot(l.clientX-s,l.clientY-c)>8&&u()});for(let l of["pointerup","pointercancel","pointerleave"])e.addEventListener(l,u);e.addEventListener("contextmenu",l=>{l.preventDefault(),u(),o=Hn(t,e,n,i)}),e.addEventListener("click",()=>{if(o){o=!1;return}so(t,n,i)})}function Hn(t,e,n,i){let r=i(t);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;ht(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),ht(t)}),s.addEventListener("click",d=>d.stopPropagation());let c=document.createElement("div");c.className="nc-slot-menu nc-padgrid-pad-menu",c.setAttribute("role","menu"),c.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let d of o){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=d.id,h.textContent=d.label,h.addEventListener("click",()=>{ht(t);let f=i(t);f?.type==="padGrid"&&(d.id==="rename"&&f.onRename?Na(t,e,n,i):f.onMenu?.(n,d.id))}),c.append(h)}t.append(s,c);let u=t.getBoundingClientRect(),l=e.getBoundingClientRect();return c.style.left=`${l.left-u.left}px`,c.style.top=`${l.bottom-u.top}px`,c.querySelector("button")?.focus(),!0}function Na(t,e,n,i){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=i(t);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),c=e.getBoundingClientRect();o.style.left=`${c.left-s.left}px`,o.style.top=`${c.top-s.top}px`,o.style.width=`${c.width}px`;let u=!1,l=d=>{if(u)return;u=!0;let h=o.value.trim();o.remove(),e.focus();let f=i(t);d&&h&&f?.type==="padGrid"&&f.onRename?.(n,h)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?l(!0):d.key==="Escape"&&l(!1)}),o.addEventListener("blur",()=>l(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,h=>h.stopPropagation());t.append(o),o.focus(),o.select()}function ht(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Ia(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((i,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),c=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path");o.draggable=!i.empty,i.empty?(o.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),c&&(c.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=i.label),c&&(c.textContent=""),u?.setAttribute("d",io(i.peaks))),i.lane?o.dataset.ncLane=String(i.lane):delete o.dataset.ncLane;let l=e.selected===r;l?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",l?"true":"false"),i.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",i.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${i.label}${l?", selected":""}`)})}function G(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Tt(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let i=document.createElement("label");i.className="nc-label",i.htmlFor=t,i.textContent=e;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(i,r),n}function Fn(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Ke(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var co=450,Dn=8;function ee(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function uo(t){let e=Br(t,"target-min");return e>0?e:44}function po(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=uo(t),i=n/2,r=e.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<e.length;o++){let s=e[o],c=r[o];if(!(s instanceof HTMLElement)||!c||c.width===0||c.height===0)continue;if(c.width>=n&&c.height>=n){s.style.display="none";continue}let u=c.left+c.width/2,l=c.top+c.height/2,d=u-i,h=u+i,f=l-i,b=l+i;for(let g=0;g<e.length;g++){if(o===g)continue;let y=r[g];if(!y||y.width===0)continue;let p=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-l)<i*2&&(p>u?h=Math.min(h,(u+p)/2):p<u&&(d=Math.max(d,(u+p)/2))),Math.abs(p-u)<i*2&&(m>l?b=Math.min(b,(l+m)/2):m<l&&(f=Math.max(f,(l+m)/2)))}d=Math.min(d,c.left),h=Math.max(h,c.right),f=Math.min(f,c.top),b=Math.max(b,c.bottom),s.style.left=`${d-c.left}px`,s.style.top=`${f-c.top}px`,s.style.width=`${Math.max(0,h-d)}px`,s.style.height=`${Math.max(0,b-f)}px`,s.style.transform="none"}}function za(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Zn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function yt(t,e){switch(t.type){case"slider":return ho(t,e);case"select":return fo(t,e);case"toggle":return go(t,e);case"button":return bo(t,e);case"readout":return yo(t);case"label":return vo(t);case"note":return Yn(t);case"knob":return ko(t,e);case"choice":return xo(t,e);case"slotRow":return So(t,e);case"stepGrid":return Eo(t,e);case"canvas":return No(t);case"fx":return jo(t,e);case"strip":return Io(t,e);case"stripAdd":return Ro(t,e);case"padGrid":return ro(t,e);default:return Yn({id:"unknown",text:""})}}function fe(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),i=t.querySelector("label");i&&(i.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Ra(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let r=t.querySelector("[data-nc-readout]");r&&(r.textContent=e.valueText??Ke(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Fn(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Fn(t,e.text);else if(e.type==="knob"){let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&wo(n,e);let i=t.querySelector("[data-nc-readout]");i&&(i.textContent=e.valueText??Ke(e.value))}else if(e.type==="choice")ja(t,e);else if(e.type==="slotRow")Oa(t,e);else if(e.type==="stepGrid")Qt(t,e);else if(e.type==="padGrid")Ia(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Ca(n,e)}else if(e.type==="strip"){Ha(t,e);for(let n of e.sends??[]){let i=t.querySelector(`[data-nc-id="${Qn(n.id)}"]`);i instanceof Element&&fe(i,{...n,type:"knob"})}}else if(e.type==="stripAdd")Wa(t,e);else if(e.type==="fx"){Fa(t,e);for(let n of[...e.controls,...e.more??[]]){let i=t.querySelector(`[data-nc-id="${Qn(n.id)}"]`);i instanceof Element&&fe(i,n)}}}}function ho(t,e){let n=Tt(t.id,t.label);n.dataset.ncSlider="";let i=document.createElement("input");i.type="range",i.className="nc-range",i.id=t.id,i.min=String(t.min),i.max=String(t.max),i.step=String(t.step),i.value=String(t.value),i.disabled=t.disabled===!0,i.dataset.ncId=t.id,i.addEventListener("input",()=>{let o=e(i);o?.type==="slider"&&o.onChange(Number(i.value))}),i.addEventListener("change",()=>{let o=e(i);o?.type==="slider"&&o.onCommit?.(Number(i.value))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(i,r),t.onTap&&n.insertBefore(mo(t,i,e),r),n.append(G()),fe(n,t),n}function mo(t,e,n){let i=document.createElement("button");i.type="button",i.className="nc-tap",i.dataset.ncTap=t.id,i.textContent="Tap",i.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),i.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,i.append(ee());let r=o=>{let s=n(e);s?.type==="slider"&&s.onTap?.(o)};return i.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),i.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),i}function fo(t,e){let n=Tt(t.id,t.label),i=document.createElement("select");i.className="nc-select",i.id=t.id,i.dataset.ncId=t.id;for(let r of t.options){let o=document.createElement("option");o.value=r.value,o.textContent=r.label,i.append(o)}return i.value=t.value,i.addEventListener("change",()=>{let r=e(i);r?.type==="select"&&r.onChange(i.value)}),n.append(i,G()),n}function go(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let i=e(n);i?.type==="toggle"&&i.onPress()}),n.append(G()),fe(n,t),n}function bo(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let o=e(n);o?.type==="button"&&o.onPress()}),n.append(G()),fe(n,t),!t.onSparkle)return n;let i=document.createElement("div");i.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=t.id,r.setAttribute("aria-label","Surprise me"),r.title=t.sparkleTitle??"Surprise me",r.innerHTML=za(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Ba(o);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),i.append(n,r),i}function yo(t){let e=Tt(t.id,t.label);return e.append(G()),fe(e,t),e}function vo(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(G()),e}function Yn(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(G()),e}function Xn(t){if(typeof t.valueText=="string")return t.valueText;let e=Ke(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Ra(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function wo(t,e){let n=e.max-e.min||1,i=(e.value-e.min)/n;Ra(t,e.modulated===!0),t.style.setProperty("--knob-turn",String(Math.round(i*270))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Xn(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Xn(e)}`}function $o(t,e){let n=t.max-t.min||1,i=typeof t.step=="number"&&t.step>0?t.step:n/100,r=e.shiftKey?i/10:i;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+i*10:e.key==="PageDown"?t.value-i*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+r:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-r:null}function ko(t,e){let n=Tt(t.id,t.label);t.compact&&(n.dataset.ncCompact="");let i=document.createElement("button");i.type="button",i.className="nc-knob",i.dataset.ncId=t.id;let r=document.createElement("i");r.className="nc-knob-mark",i.append(r);let o=0,s=0;i.addEventListener("pointerdown",u=>{o=u.clientY;let l=e(i);s=l&&"value"in l?Number(l.value):0,i.setPointerCapture?.(u.pointerId)}),i.addEventListener("pointermove",u=>{if(i.hasPointerCapture&&!i.hasPointerCapture(u.pointerId))return;let l=e(i);if(l?.type!=="knob")return;let d=l.max-l.min||1,h=Math.min(l.max,Math.max(l.min,s-(u.clientY-o)*d/120));l.onChange(h)}),i.addEventListener("dblclick",()=>{let u=e(i);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),i.addEventListener("keydown",u=>{let l=e(i);if(l?.type!=="knob")return;let d=$o(l,u);d!==null&&(u.preventDefault(),l.onChange(Math.min(l.max,Math.max(l.min,d))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(i,c),n.append(G()),fe(n,t),n}function xo(t,e){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(let i of t.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=i.value,r.setAttribute("role","tab"),r.textContent=i.label,r.addEventListener("click",()=>{let o=e(n);o?.type==="choice"&&o.onChange(i.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],c=s.indexOf(r),u=c;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(c+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(c-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let l=s[u];l instanceof HTMLButtonElement&&(o.preventDefault(),l.focus(),l.click())}),n.append(r)}return n.append(G()),ja(n,t),n}function ja(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let i=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",i?"true":"false"),n.tabIndex=i?0:-1}}function So(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-snap-row",i.setAttribute("role","group"),i.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){let h=t.slots[d],f=document.createElement("span");f.className="nc-snap-wrap";let b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(d),b.textContent=h.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(b,ee()),Ao(f,b,n,d,e),i.append(f)}let r=t.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=za(),r.append(ee()),r.addEventListener("click",()=>{Ba(n);let d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let c=document.createElement("input");c.type="range",c.className="nc-range nc-morph",c.min="0",c.max="4",c.step="0.01",c.setAttribute("aria-label","Morph time"),c.addEventListener("input",()=>{let d=e(n);d?.type==="slotRow"&&d.onMorph(Number(c.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,c);let l=document.createElement("div");return l.className="nc-slot-line",l.append(i,...r?[r]:[]),n.append(l,o,G()),Pa(n,e),Oa(n,t),n}function _n(t,e,n,i){let r=n(t);if(r?.type!=="slotRow")return;qe(t);let o=i.shiftKey?"store":i.altKey?"clear":"recall";r.onSlot(e,o)}function Ao(t,e,n,i,r){let o=0,s=0,c=0,u=!1,l=!1,d=!1,h=!1,f=()=>{window.clearTimeout(o),o=0},b=m=>{let w=m.clientX-s,$=m.clientY-c;w*w+$*$>Dn*Dn&&(u=!0,f())},g=()=>{h&&(h=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",p))},y=m=>{let w=o!==0&&!u&&!l;f(),g(),w&&(d=!0,_n(n,i,r,m))},p=()=>{u=!0,f(),g()};t.addEventListener("pointerdown",m=>{m.button===0&&(g(),l=!1,u=!1,d=!1,s=m.clientX,c=m.clientY,f(),o=window.setTimeout(()=>{o=0,!u&&(l=!0,Lo(n,e,i,r))},co),h=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",p))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(d||l||u){d=!1,l=!1,u=!1;return}_n(n,i,r,m)})}function Pa(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let i=qn("Save","store"),r=qn("Clear","clear");n.append(i,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),qe(t)}),o.addEventListener("click",s=>s.stopPropagation()),t.append(o,n),n.addEventListener("click",s=>{let c=s.target;if(!(c instanceof HTMLButtonElement))return;let u=e(t);if(u?.type!=="slotRow")return;let l=Number(n.dataset.ncIndex);c.dataset.ncSlotOp==="store"?(u.onSlot(l,"store"),qe(t)):c.dataset.ncSlotOp==="clear"&&(u.onSlot(l,"clear"),qe(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&qe(t)})}function qn(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Lo(t,e,n,i){Pa(t,i);let r=t.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=t.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),c=e.getBoundingClientRect();r.style.left=`${c.left-s.left}px`,r.style.top=`${c.bottom-s.top}px`,r.querySelector("button")?.focus()}function qe(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Oa(t,e){for(let r of t.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=e.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let c=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...c.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let i=t.querySelector("[data-nc-morph]");i&&(i.textContent=e.morphText)}function Ba(t){let e=t.dataset.ncLastFill||null,n=Mr(e);t.dataset.ncLastFill=n;let i=Er(n);if(i)for(let[r,o]of Object.entries(i))t.style.setProperty(r,o)}function Mo(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let i=!1,r=o=>{if(i===o)return;i=o,n.setAttribute("aria-pressed",o?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Eo(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let i=document.createElement("div");i.className="nc-seg",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Step tool");let r=p=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=p,i.append(m),m},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let c=p=>{for(let m of[o,s]){let w=m===p;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};c(o);for(let p of[o,s])p.addEventListener("click",()=>c(p));i.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let m=s.getAttribute("aria-checked")==="true"?o:s;c(m),m.focus()});let u=document.createElement("div");u.className="nc-step-tools",u.append(i),t.onFill&&u.append(Mo(n,e)),n.append(u);for(let p of t.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=p.label,w.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(w.dataset.ncLane=String((p.lane-1)%4+1)),w.addEventListener("click",()=>{let v=e(n);if(v?.type!=="stepGrid")return;let k=v.rows.findIndex(L=>L.id===p.id);v.onSelectRow?.(k)}),w.addEventListener("keydown",v=>Co(n,w,v));let $=[];for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=v,L.textContent=v==="mute"?"M":"S",L.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${p.label}`),k.append(L,ee()),k.addEventListener("click",()=>{let M=e(n);if(M?.type!=="stepGrid")return;let X=M.rows.findIndex(_=>_.id===p.id);(v==="mute"?M.onMute:M.onSolo)?.(X)}),$.push(k)}let A=document.createElement("div");A.className="nc-steps";for(let v=0;v<p.steps.length;v++){let k=document.createElement("span");k.className="nc-step-wrap";let L=document.createElement("button");L.type="button",L.className="nc-step",L.dataset.ncStep=`${p.id}:${v}`,L.setAttribute("aria-label",`${p.label} step ${v+1}`),k.append(L,ee()),k.addEventListener("click",M=>{let X=e(n);if(X?.type!=="stepGrid")return;let _=X.rows.findIndex(Se=>Se.id===p.id),xe=s.getAttribute("aria-checked")==="true";X.onToggle(_,v,M.shiftKey||xe)}),A.append(k)}if(t.onLength&&A.append(To(n,A,p,e)),m.append(...$,w,A),t.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=p.id,v.setAttribute("aria-label",`Re-roll ${p.label}`),v.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=Zn(),v.append(ee()),v.addEventListener("click",()=>{let k=e(n);k?.type==="stepGrid"&&k.onDice?.(k.rows.findIndex(L=>L.id===p.id))}),m.append(v)}m.addEventListener("click",v=>{if(v.target!==m)return;let k=e(n);k?.type==="stepGrid"&&k.onSelectRow?.(k.rows.findIndex(L=>L.id===p.id))}),Un(n,A,".nc-step-wrap",e,s,()=>p.id),n.append(m)}let l=document.createElement("div");l.className="nc-pads-head";let d=(p,m,w)=>{let $=document.createElement("button");return $.type="button",$.className=p,$.textContent=m,w&&$.setAttribute("aria-label",w),$},h=d("nc-pads-step","‹","Previous lane"),f=d("nc-pads-step","›","Next lane"),b=document.createElement(t.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),t.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{let p=e(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Qt(n,p))}));for(let[p,m]of[[h,-1],[f,1]])p.addEventListener("click",()=>{let w=e(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let $=w.rows.length;w.onSelectRow?.(((lt(w)+m)%$+$)%$)});if(l.append(h,b,f),t.onDice){let p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Zn(),p.addEventListener("click",()=>{let m=e(n);if(m?.type!=="stepGrid")return;let w=lt(m);w>=0&&m.onDice?.(w)}),l.append(p)}if(t.transport){let p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),l.append(p)}n.append(l);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...t.rows.map(p=>p.steps.length));for(let p=0;p<y;p++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(p),m.textContent=String(p+1),m.addEventListener("click",w=>{let $=e(n);if($?.type!=="stepGrid")return;let A=lt($);if(A<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(A,p+1);return}let v=s.getAttribute("aria-checked")==="true";$.onToggle(A,p,w.shiftKey||v)}),g.append(m)}return Un(n,g,".nc-pad",e,s,()=>{let p=e(n);return p?.type==="stepGrid"?p.rows[lt(p)]?.id:void 0}),n.append(g),n.append(G()),Qt(n,t),n}function lt(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Un(t,e,n,i,r,o){let s="on",c=!0,u=-1,l=(d,h)=>{let f=d.rows[u]?.steps[h];!f||h>=d.rows[u].length||(d.onSet?d.onSet(u,h,s,c):!!f[s]!==c&&d.onToggle(u,h,s==="accent"))};ao(e,n,d=>{let h=i(t);if(h?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;let f=h.rows.findIndex(b=>b.id===o());f>=0&&h.rows[f].length!==d.pad+1&&h.onLength?.(f,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let f=o();u=h.rows.findIndex(g=>g.id===f);let b=h.rows[u]?.steps[d.pad];if(!b)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",c=!b[s]}l(h,d.pad)}else if(d.kind==="long"){let f=o(),b=h.rows.findIndex(y=>y.id===f),g=e.querySelectorAll(n)[d.pad];b>=0&&g instanceof HTMLElement&&h.onLongPress?.(b,d.pad,g)}}})}function Co(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let i=[...t.querySelectorAll(".nc-name")],r=i.indexOf(e),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=i.length-1;let s=i[o];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function To(t,e,n,i){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(ee());let o=l=>{let d=i(t);if(d?.type!=="stepGrid")return;let h=d.rows.findIndex(g=>g.id===n.id),f=d.rows[h];if(!f)return;let b=Math.max(1,Math.min(f.steps.length,l));b!==f.length&&d.onLength?.(h,b)},s=l=>{let d=[...e.querySelectorAll(".nc-step")],h=1;return d.forEach((f,b)=>{let g=f.getBoundingClientRect();g.width>0&&l>=g.left+g.width/2&&(h=b+1)}),h},c=l=>o(s(l.clientX)),u=()=>{window.removeEventListener("pointermove",c),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",l=>{l.button===0&&(l.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",c),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",l=>{let d=i(t);if(d?.type!=="stepGrid")return;let h=d.rows.find(b=>b.id===n.id);if(!h)return;let f={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};l.key in f&&(l.preventDefault(),o(f[l.key]))}),r}var Ft=new WeakMap;function Vn(t,e){let n=typeof e=="number"?e:null;if(!(Ft.has(t)&&Ft.get(t)===n)){if(Ft.set(t,n),n===null){for(let i of Object.keys(On(1)))t.style.removeProperty(i);return}for(let[i,r]of Object.entries(On(n)))t.style.setProperty(i,r)}}function Qt(t,e){let n=e.rows.some(l=>l.solo),i=t.querySelector(".nc-pads"),r=e.rows.find(l=>l.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),s=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=s?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",s?"true":"false"),o.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=t.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let l=!!e.transport?.playing,d=e.transport?.label??(l?"Stop":"Play");u.textContent!==d&&(u.textContent=d),u.setAttribute("aria-pressed",l?"true":"false");let h=e.transport?.ariaLabel;h?u.setAttribute("aria-label",h):u.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let l=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let d of i.querySelectorAll("[data-nc-pad]")){let h=Number(d.getAttribute("data-nc-pad")),f=r.steps[h];d instanceof HTMLButtonElement&&(d.hidden=!f||!s&&h>=r.length,s&&h>=r.length?d.dataset.out="true":delete d.dataset.out,s&&h===r.length-1?d.dataset.end="true":delete d.dataset.end,d.setAttribute("aria-label",`${r.label} step ${h+1}`),d.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?d.dataset.accent="true":delete d.dataset.accent,f?.dim?d.dataset.dim="true":delete d.dataset.dim,Vn(d,f?.velocity),e.playhead>=0&&h===l?d.dataset.playhead="true":delete d.dataset.playhead)}}for(let l of e.rows){for(let f=0;f<l.steps.length;f++){let b=l.steps[f],g=t.querySelector(`[data-nc-step="${l.id}:${f}"]`);if(!(g instanceof HTMLButtonElement))continue;let y=g.closest(".nc-row");if(y instanceof HTMLElement){e.selectedRow===l.id?y.dataset.selected="true":delete y.dataset.selected;let w=y.querySelector(".nc-name");w instanceof HTMLElement&&(w.setAttribute("aria-pressed",e.selectedRow===l.id?"true":"false"),w.textContent!==l.label&&(w.textContent=l.label,w.setAttribute("aria-label",`Select ${l.label}`))),l.mute||n&&!l.solo?y.dataset.silent="true":delete y.dataset.silent;for(let $ of y.querySelectorAll("[data-nc-ms]")){let A=$.getAttribute("data-nc-ms")==="mute"?l.mute:l.solo;$.setAttribute("aria-pressed",A?"true":"false")}}g.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?g.dataset.accent="true":delete g.dataset.accent,b.dim?g.dataset.dim="true":delete g.dataset.dim,f%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof b.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),Vn(g,b.velocity);let p=e.playhead>=0&&l.length>0?(e.playhead%l.length+l.length)%l.length:-1;f===p?g.dataset.playhead="true":delete g.dataset.playhead;let m=!!e.onLength&&e.selectedRow===l.id;g.hidden=f>=l.length&&!m,f>=l.length&&m?g.dataset.out="true":delete g.dataset.out}let d=t.querySelector(`[data-nc-len="${l.id}"]`),h=t.querySelector(`[data-nc-step="${l.id}:${Math.max(0,l.length-1)}"]`)?.closest(".nc-step-wrap");if(d instanceof HTMLElement&&h&&h.nextElementSibling!==d){let f=document.activeElement===d;h.after(d),f&&d.focus()}d instanceof HTMLElement&&(d.setAttribute("aria-valuenow",String(l.length)),d.setAttribute("aria-label",`${l.label} length, ${l.length} steps`),d.title=`${l.label}: drag to set the length (${l.length} steps)`)}}function No(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let i=document.createElement("canvas");return i.className="nc-canvas",i.dataset.ncId=t.id,i.dataset.ncPaint=t.paint,e.append(n,i,G()),e}function Io(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let i=document.createElement("div");i.className="nc-strip-hd";let r=document.createElement("span");if(r.className="nc-strip-name",r.dataset.ncStripName="",i.append(r),t.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let y=e(n);y?.type==="strip"&&y.onRemove?.(g)}),i.append(g)}let o=document.createElement("div");if(o.className="nc-strip-hacks",t.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",g.append(y,ee()),g.addEventListener("click",()=>{let p=e(n);p?.type==="strip"&&p.onHacks?.()}),o.append(g)}let s=document.createElement("div");s.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?t.onMute:t.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let p=document.createElement("button");p.type="button",p.className="nc-ms",p.dataset.ncMs=g,p.textContent=g==="mute"?"M":"S",y.append(p,ee()),y.addEventListener("click",()=>{let m=e(n);m?.type==="strip"&&(g==="mute"?m.onMute:m.onSolo)?.()}),s.append(y)}let c=document.createElement("div");c.className="nc-strip-sends";for(let g of t.sends??[])c.append(yt({...g,type:"knob",compact:!0},e));let u=document.createElement("div");u.className="nc-strip-body";let l=document.createElement("span");l.className="nc-scale",l.setAttribute("aria-hidden","true");for(let g of t.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(g.value)),y.textContent=g.label,l.append(y)}let d=_r({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:g=>{let y=e(n);y?.type==="strip"&&y.onChange(g)},onReset:()=>{let g=e(n);g?.type==="strip"&&Jn(g)}}),h=Qr({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let g=e(n);g?.type==="strip"&&g.onClipClear?.()}});u.append(l,d.el,h.el);let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;return f.addEventListener("click",g=>{let y=e(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(b),g.detail===0?Kn(n,f,e):g.detail===1&&(b=window.setTimeout(()=>Kn(n,f,e),zo)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let g=e(n);g?.type==="strip"&&Jn(g)}),n.append(i,o,s,c,u,f,G()),Ha(n,t),n}var zo=250;function Kn(t,e,n){let i=n(t);if(i?.type!=="strip"||!i.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=i.valueText??Ke(i.value),r.setAttribute("aria-label",`${i.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(r),r.focus(),r.select?.();let o=!1,s=c=>{if(o)return;o=!0;let u=r.value;if(r.remove(),e.hidden=!1,c){let l=n(t);l?.type==="strip"&&l.onTypeIn?.(u)}e.focus?.()};r.addEventListener("keydown",c=>{c.key==="Enter"?(c.preventDefault(),s(!0)):c.key==="Escape"&&(c.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Ro(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let i=document.createElement("span");i.className="nc-strip-add-face",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",i.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let c=e(n),u=s.value;Ga(s),c?.type==="stripAdd"&&u&&c.onAdd(u)}),n.append(i,s,G()),Wa(n,t),n}function Wa(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let i=t.querySelector("select");if(!(i instanceof HTMLSelectElement))return;i.setAttribute("aria-label",e.ariaLabel??e.label);let r=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],o=[...i.options].map(c=>`${c.value}|${c.textContent}|${c.disabled}`).join(","),s=r.map(c=>`${c.value}|${c.label}|${c.disabled===!0}`).join(",");o!==s&&(i.replaceChildren(...r.map(c=>{let u=document.createElement("option");return u.value=c.value,u.textContent=c.label,u.disabled=c.disabled===!0,u})),Ga(i))}function Ga(t){let e=t.options[0];e&&(e.selected=!0)}function Jn(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Ha(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let i=t.querySelector("[data-nc-strip-remove]");i&&(i.setAttribute("aria-label",`Remove ${e.label}`),i.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);let r=t.querySelector(".nc-fader"),o=r?qr(r):void 0;o&&(o.configure({step:e.step}),o.set(e.value),o.setText(e.valueText),o.setLabel(`${e.label} level`)),eo(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let u=e.valueText??Ke(e.value);s.textContent!==u&&(s.textContent=u),s.setAttribute("aria-label",`${e.label} level ${u}`);let l=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${l}`:l}for(let u of t.querySelectorAll("[data-nc-ms]")){let l=u.getAttribute("data-nc-ms"),d=l==="mute"?e.mute===!0:e.solo===!0;u.setAttribute("aria-pressed",d?"true":"false"),u.setAttribute("aria-label",`${l==="mute"?"Mute":"Solo"} ${e.label}`)}let c=t.querySelector("[data-nc-hacks]");if(c){let u=e.hacksLabel??"Hacks";c.textContent!==u&&(c.textContent=u),c.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),c.setAttribute("aria-label",`${u}: ${e.label}`)}e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity}function jo(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let i=document.createElement("h3");if(i.className="nc-ui-fx-name",i.id=`${t.id}-name`,i.textContent=t.title,t.on===void 0)n.append(i);else{let r=document.createElement("div");r.className="nc-ui-fx-hd";let o=La({checked:t.on,labelledBy:i.id,onChange:s=>{let c=e(o.el);c?.type==="fx"&&c.onToggle?.(s)}});o.el.dataset.ncFxSwitch="",r.append(i,o.el),n.append(r)}for(let r of t.controls)n.append(yt(r,e));if(t.more?.length){let r=document.createElement("details");r.className="nc-ui-more";let o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(let s of t.more)r.append(yt(s,e));n.append(r)}return n.append(G()),Fa(n,t),n}function Fa(t,e){let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let i=t.querySelector("[data-nc-fx-switch]");i&&i.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim}function Qn(t){return t.replace(/["\\]/g,"\\$&")}function Po(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let i=e.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);i?.type==="canvas"&&Ca(n,i)}po(t)}var fn="netcomposer.rhythm.hidden.v1",se=new WeakMap;function Dt(){try{return globalThis.localStorage??null}catch{return null}}function Da(t,e=fn){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(i=>typeof i=="string"):[])}catch{return new Set}}function ea(t,e,n,i=fn){let r=Da(t,i);n?r.add(e):r.delete(e);try{t?.setItem(i,JSON.stringify([...r]))}catch{}}function gn(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(i=>i.controls)],n=[];for(let i of e)n.push(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0})));return n}function Oo(t,e){if(!(!t||!e))return gn(t).find(n=>n.id===e)}function Bo(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${gn(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>n.value).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function Wo(t,e){if(!e.title)return;if(!e.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=e.title,t.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let i=document.createElement("h3");i.className="nc-panel-title",i.textContent=e.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(i,r),t.append(n),Za(t,e)}function Za(t,e){if(!e.panel)return;let n=[...t.children].find(o=>o.classList.contains("nc-panel-hd")),i=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");i&&(i.textContent=e.title??""),r&&(r.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Go(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=se.get(e),i=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Oo(n,i)}function Ho(t,e){let n=e.sections??[{id:"main",controls:e.controls??[]}],i=Bo(e);if(t.dataset.ncSignature===i){for(let r of n){let o=t.querySelector(`[data-nc-section="${ta(r.id)}"]`);o&&Za(o,r);for(let s of r.controls){let c=t.querySelector(`[data-nc-id="${ta(s.id)}"]`);c instanceof Element&&fe(c,s)}}return}t.dataset.ncSignature=i,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of n){let o=document.createElement("div");o.className="nc-section",o.dataset.ncSection=r.id,r.inset&&(o.dataset.ncInset="true"),r.area&&(o.dataset.ncArea=r.area),r.label&&(o.setAttribute("role","group"),o.setAttribute("aria-label",r.label)),r.panel&&(o.dataset.ncPanel="true",o.setAttribute("role","region"),r.title&&o.setAttribute("aria-label",r.title)),Wo(o,r);let s=r.panel?document.createElement("div"):o;r.panel&&(s.className="nc-panel-body",o.append(s));for(let c of r.controls)s.append(yt(c,Go));t.append(o)}}function ta(t){return t.replace(/["\\]/g,"\\$&")}function Fo(t,e=fn){Sa();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let i=Da(Dt(),e).has(t.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let c=document.createElement("button");c.type="button",c.className="nc-hide",c.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let l=La({labelledBy:o.id,onChange:m=>(se.get(n)??t).onToggle?.(m)});l.el.dataset.ncModuleSwitch="",s.append(l.el,c,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",r.append(o,d,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${t.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let b=document.createElement("span");b.className="nc-slim-lines",f.append(b);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,r,h,f),n.setAttribute("aria-labelledby",o.id);let y=m=>{let w=se.get(n)??t;n.dataset.ncOpen=m?"false":"true",h.hidden=m,f.hidden=!m,c.textContent=m?"+":"−",c.setAttribute("aria-expanded",m?"false":"true"),c.setAttribute("aria-controls",h.id),c.setAttribute("aria-label",`${m?"Show":"Hide"} ${w.title}`),c.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};c.addEventListener("click",()=>{let m=n.dataset.ncOpen==="true";ea(Dt(),(se.get(n)??t).id,m,e),y(m),en(n.parentElement)}),f.addEventListener("click",()=>{ea(Dt(),(se.get(n)??t).id,!1,e),y(!1),en(n.parentElement)});let p={el:n,update(m){se.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=m.title,d.textContent=m.status??"",m.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),b.textContent=m.summary??m.title,l.el.hidden=m.on===void 0,l.set(m.on===!0),m.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),Ho(h,m),y(h.hidden),p.redraw()},redraw(){let m=se.get(n);m&&Po(n,gn(m))}};return se.set(n,t),y(i),p.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>p.redraw()).observe(n),p}function Do(t,e,n="adjacent"){Sa(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let i=n==="stack"?"stack":"adjacent";e.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=i;let c=r.el.querySelector("[data-nc-index]");c&&(c.textContent=String(s).padStart(2,"0")),t.append(r.el),r.redraw()}),en(t)}function en(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=e.some(o=>o.hasAttribute("data-nc-lead")),i=e.map(o=>o.hasAttribute("data-nc-slim")?a("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",i.join(" "));let r=e.filter(o=>!o.hasAttribute("data-nc-slim"));n&&e.length===4&&r.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function Ya(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const ct=t=>Math.max(0,Math.min(100,t));function Zo(t){const e=Ya(t.cutoff),n=ct(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:ct(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:ct(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:ct(100*Math.log(e/2e4)/Math.log(150/2e4))}}}const Xa=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function tn(t){const e=Zo(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:Xa(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function Yo(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((i,r)=>i.type!==e.chain[r]?.type))return{whole:!0};const n=[];return e.chain.forEach((i,r)=>{const o=t.chain[r];if(o){o.bypass!==i.bypass&&n.push([i.id,"bypass",i.bypass]);for(const[s,c]of Object.entries(i.dials))o.dials[s]!==c&&n.push([i.id,s,c])}}),{whole:!1,params:n}}const Be=8,pe=16,nn=10,_a=["1","2","3","4","5","6","7","8","9","0"],qa=[0,2,4,8,16],Xo=[0,1,2,4,8],an=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","fill","!fill","pre","!pre"],vt={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function tt(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0}}function Ua(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Va(){return{length:pe,mute:!1,solo:!1,steps:Array.from({length:pe},Ua)}}function Ka(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(vt.drive),compressor:structuredClone(vt.compressor)}}function rn(){return{v:1,pads:Array.from({length:Be},(t,e)=>tt(e)),lanes:Array.from({length:Be},Va),swing:.5,hacks:Ka(),slots:Array.from({length:nn},()=>null),active:null,selected:0,master:1}}const te=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},W=(t,e,n,i)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):i,he=(t,e,n,i)=>Math.round(W(t,e,n,i)),ve=(t,e)=>typeof t=="boolean"?t:e,wt=(t,e,n)=>e.includes(t)?t:n,_o=/^[0-9a-f]{16,64}$/;function qo(t,e){const n=te(t),i=tt(e);let r=W(n.start,0,1,0),o=W(n.end,0,1,1);o-r<.001&&([r,o]=[0,1]);const s=qa.includes(n.slices)?n.slices:0,c=Array.isArray(n.cuts)?n.cuts.filter(u=>typeof u=="number"&&u>0&&u<1).sort((u,l)=>u-l).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):i.name,sample:typeof n.sample=="string"&&_o.test(n.sample)?n.sample:null,mode:wt(n.mode,["oneshot","gate","loop"],i.mode),dir:wt(n.dir,["fwd","rev","pingpong"],i.dir),start:r,end:o,slices:s,cuts:s?c:[],tune:he(n.tune,-24,24,0),fine:he(n.fine,-100,100,0),fit:Xo.includes(n.fit)?n.fit:0,attack:W(n.attack,0,.1,i.attack),decay:W(n.decay,.01,4,i.decay),cutoff:W(n.cutoff,-1,1,0),resonance:W(n.resonance,0,1,0),level:W(n.level,0,1,i.level),pan:W(n.pan,-1,1,0),choke:he(n.choke,0,2,0)}}function Uo(t){const e=te(t);return{on:ve(e.on,!1),accent:ve(e.accent,!1),velocity:W(e.velocity,0,1,.8),chance:W(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:he(e.slice,0,15,0),pitch:he(e.pitch,-12,12,0),reverse:ve(e.reverse,!1),cond:wt(e.cond,an,"always")}}function Vo(t){const e=te(t),n=Array.isArray(e.steps)?e.steps:[];return{length:he(e.length,1,pe,pe),mute:ve(e.mute,!1),solo:ve(e.solo,!1),steps:Array.from({length:pe},(i,r)=>Uo(n[r]))}}function na(t,e){const n=te(t),i={...e.dials};for(const[r,o]of Object.entries(te(n.dials)))r in e.dials&&typeof o=="number"&&Number.isFinite(o)&&(i[r]=o);return{on:ve(n.on,e.on),dials:i}}function Ko(t){const e=te(t),n=te(e.filter),i=Ka();return{filter:{on:ve(n.on,i.filter.on),mode:wt(n.mode,["lp","hp","bp"],i.filter.mode),cutoff:W(n.cutoff,0,1,i.filter.cutoff),resonance:W(n.resonance,0,1,i.filter.resonance)},drive:na(e.drive,vt.drive),compressor:na(e.compressor,vt.compressor)}}function on(t){const e=te(t),n=Array.isArray(e.pads)?e.pads:[],i=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:Be},(r,o)=>qo(n[o],o)),lanes:Array.from({length:Be},(r,o)=>Vo(i[o])),swing:W(e.swing,.5,.75,.5),hacks:Ko(e.hacks)}}function Jo(t){const e=te(t);if(e.v!==1)return rn();const n=Array.isArray(e.slots)?e.slots:[],i=on(e),r=Array.from({length:nn},(s,c)=>n[c]?on(n[c]):null),o=e.active===null?null:he(e.active,0,nn-1,-1);return{v:1,...i,slots:r,active:o!==null&&o>=0&&r[o]?o:null,selected:he(e.selected,0,Be-1,0),master:W(e.master,0,1,1)}}function Ja(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}function He(t){const e=new Set;for(const n of[t,...t.slots])for(const i of n?.pads??[])i.sample&&e.add(i.sample);return e}function Qa(){try{return globalThis.localStorage??null}catch{return null}}function Qo(t,e=Qa()){try{const n=e?.getItem(t);return n?Jo(JSON.parse(n)):rn()}catch{return rn()}}function es(t,e,n=Qa()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const ts=.25;function ei(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function ns(t,e,n){const i=t.start*e.frames,r=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(i),Math.ceil(r)];const o=ei(t),s=Math.min(n,o.length-2);return[Math.floor(i+o[s]*(r-i)),Math.ceil(i+o[s+1]*(r-i))]}function as(t,e,n,i=0){let o=2**((t.tune+t.fine/100+i)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,c=t.fit*4*(60/n);s>0&&c>0&&(o*=s/c)}return o}const is=1.5;function ti(t,e,n,i,r){if(!n.on||!t.sample||!i)return null;const o=n.slice??(t.slices?e%t.slices:null),[s,c]=ns(t,i,o),u=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;return{sample:t.sample,from:s,to:c,rate:as(t,i,r,n.pitch),gain:Math.min(1.5,n.velocity*(n.accent?is:1))*t.level,pan:t.pan,mode:t.mode,dir:u,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond}}function rs(t,e,n,i=null){return ti(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:i,pitch:0,reverse:!1,cond:"always"},e,n)}function os(t,e,n){const i=t.lanes.some(r=>r.solo);return{swing:t.swing,lanes:t.lanes.map((r,o)=>{const s=t.pads[o],c=s?.sample?e(s.sample):void 0;return{length:r.length,audible:i?r.solo:!r.mute,steps:r.steps.map((u,l)=>s?ti(s,l,u,c,n):null)}})}}const ss="/nyx/assets/sampler-processor-7BllxM3H.js",ni=827873614,ls=60;async function cs(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),i=[new Uint8Array(n.buffer),...t.map(u=>new Uint8Array(u.buffer))],r=i.reduce((u,l)=>u+l.byteLength,0),o=new Uint8Array(r);let s=0;for(const u of i)o.set(u,s),s+=u.byteLength;const c=new Uint8Array(await crypto.subtle.digest("SHA-256",o));return Array.from(c.subarray(0,16),u=>u.toString(16).padStart(2,"0")).join("")}function ds(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([ni,t.sampleRate,t.data.length,e]),t.data.forEach((i,r)=>{n.set(new Uint8Array(i.buffer,i.byteOffset,e*4),16+r*e*4)}),n}function us(t,e){if(e.byteLength<16)return null;const[n,i,r,o]=new Uint32Array(e,0,4);if(n!==ni||!r||r>2||e.byteLength!==16+o*4*r)return null;const s=Array.from({length:r},(c,u)=>new Float32Array(e.slice(16+u*o*4,16+(u+1)*o*4)));return{hash:t,data:s,sampleRate:i,channels:r,frames:o}}class ps{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const i=await cs(e,n),r={hash:i,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(i,r);const o=await this.folder();if(!o)return{sample:r,saved:!1};try{const c=await(await o.getFileHandle(`${i}.f32`,{create:!0})).createWritable?.();return c?(await c.write(ds(r)),await c.close(),{sample:r,saved:!0}):{sample:r,saved:!1}}catch{return{sample:r,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const i=await this.folder();if(!i)return null;try{const r=await(await i.getFileHandle(`${e}.f32`)).getFile(),o=us(e,await r.arrayBuffer());return o&&this.memory.set(e,o),o}catch{return null}}async prune(e){for(const i of[...this.memory.keys()])e.has(i)||this.memory.delete(i);const n=await this.folder();if(n)try{const i=[];for await(const r of n.keys())i.push(r);for(const r of i){const o=r.replace(/\.f32$/,"");r.endsWith(".f32")&&!e.has(o)&&await n.removeEntry(r)}}catch{}}}function hs(t){const e=Math.min(t.length,Math.round(ls*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(i,r)=>{const o=new Float32Array(e);return o.set(t.getChannelData(r).subarray(0,e)),o}),trimmed:e<t.length}}function ai(t,e=200){const n=t[0]?.length??0,i=[];if(!n)return i;const r=n/e;for(let o=0;o<e;o++){const s=Math.floor(o*r),c=Math.max(s+1,Math.floor((o+1)*r));let u=0,l=0;const d=Math.max(1,Math.floor((c-s)/256));for(let h=s;h<c&&h<n;h+=d){let f=0;for(const b of t)f+=b[h]??0;f/=t.length,f<u&&(u=f),f>l&&(l=f)}i.push(Math.max(-1,u),Math.min(1,l))}return i}function ms(t,e,n,i,r){const o=i-n;if(r<2||o<64)return[];const s=Math.max(32,Math.round(e*.01)),c=[];for(let b=n;b<i;b+=s){let g=0;for(const y of t)for(let p=b;p<Math.min(i,b+s);p++)g+=(y[p]??0)*(y[p]??0);c.push(Math.log10(g/s+1e-9))}const u=c.map((b,g)=>{const y=c.slice(Math.max(0,g-4),g),p=y.length?y.reduce((m,w)=>m+w,0)/y.length:b;return Math.max(0,b-p)}),l=Math.max(1,Math.floor(c.length/r/8)),d=u.map((b,g)=>({f:b,i:g})).filter(b=>b.i>0&&b.f>.3).sort((b,g)=>g.f-b.f),h=[];for(const b of d){if(h.length>=r-1)break;h.every(g=>Math.abs(g-b.i)>=l)&&h.push(b.i)}const f=h.map(b=>b*s/o).filter(b=>b>.001&&b<.999);for(let b=1;f.length<r-1&&b<r;b++){const g=b/r;f.every(y=>Math.abs(y-g)>.5/r)&&f.push(g)}for(let b=1;f.length<r-1;b++)f.push(b/(r+1));return f.sort((b,g)=>b-g).slice(0,r-1)}function ii(t=gs()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const i=n&&typeof n=="object"?n:{},r=o=>typeof i[o]=="number"&&Number.isFinite(i[o])?i[o]:0;return i.saved!==!0||!r("id")||!r("frames")||!r("sampleRate")?[]:[{id:r("id"),bars:r("bars"),bpm:r("bpm"),sampleRate:r("sampleRate"),channels:Math.min(2,Math.max(1,r("channels"))),frames:r("frames")}]}):[]}catch{return[]}}async function fs(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const i=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),r=new Float32Array(await i.arrayBuffer());return r.length<t.frames*t.channels?null:Array.from({length:t.channels},(o,s)=>r.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function gs(){try{return globalThis.localStorage??null}catch{return null}}const bs="instance",ys=99;function ri(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(bs)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=ys?n:1}function vs(t,e){return e===1?t:`${t}#${e}`}function ws(t,e){return e===1?t:`${t} ${e}`}let Ie;function $s(t,e=ri()){if(Ie!==void 0)return Ie;Ie=null;try{if(typeof window>"u"||window.parent===window)return Ie;const n=window.parent.ncStudio;n&&n.version===1&&(Ie=n.attach(t,{instance:e}))}catch{}return Ie}function ks(){let t;try{if(typeof window<"u"&&window.parent!==window){const i=window.parent.ncStudio;i&&i.version===1&&typeof i.syncScope=="string"&&i.syncScope&&(t=i.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(i,r,o)=>n.request(`${i}${e}`,r,o)}:null}}function xs(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Nt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}const Ss="NYX Sampler",As="nyx",ge=ri(),oi=vs("nyx.state",ge),Ls=.15,x=Qo(oi),Y=new ps(ge>1?`nyx-${ge}`:"nyx"),It=()=>es(oi,x);let de=!1,ke=0,J=null,$t=!1,je="",B="";const We=new Map;let nt=new Map;const ne=new Ai({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let z=null,mt=null;const Ms=new Pi({...ks(),app:ws(Ss,ge),version:"0.1.0",clock:ne,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=z?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"}}),kt=t=>t+(mt?.offset??0),Z=()=>ne.transport,Je=()=>Z().isPlayingAt(U()),Qe=()=>Je()&&!de,le=$s(As,ge);let Zt=null,F=null,Q=null,xt=null,aa=null;const ia=new Set;function ae(){return aa??=(async()=>{le?(z=le.ctx,Zt=le.output,mt=le.mapper??new Mn(le.ctx)):(z=new AudioContext({latencyHint:"interactive"}),Zt=z.destination,mt=new Mn(z)),mt.start();try{await z.audioWorklet.addModule(ss)}catch{return B="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}F=new AudioWorkletNode(z,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),F.port.onmessage=t=>Es(t.data),Q=br(z,{moduleUrl:xs()??wr,bpm:Z().bpm,slots:3,state:tn(x.hacks)}),sn=tn(x.hacks),xt=new GainNode(z,{gain:x.master}),F.connect(Q.input),Q.output.connect(xt).connect(Zt),vr(Q,ne,{toAudioTime:kt,now:U});for(const t of He(x))await bn(t);return Fe(),at(),!0})(),aa}async function bn(t){const e=await Y.get(t);return e?(We.has(t)||We.set(t,ai(e.data)),F&&!ia.has(t)&&(ia.add(t),F.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function Es(t){t.type!=="pos"||!t.voices||(nt=new Map(t.voices.map(([e,n,i])=>[e,n/Math.max(1,i)])))}function Fe(){F?.port.postMessage({type:"program",program:os(x,t=>Y.info(t),Z().bpm)})}let ra="";function at(t=!1){if(!F)return;const e=Z(),n=Qe();let i=0,r=e.bpm;if(e.running){const s=Math.max(0,e.beatAt(U())),c=e.timeAt(s);r=60/(e.timeAt(s+1)-c),i=kt(c)-s*60/r}const o=JSON.stringify([n,Math.round(i*2e3),r,ke]);!t&&o===ra||(ra=o,F.port.postMessage({type:"clock",clock:{playing:n,zero:i,bpm:r,join:ke}}))}let sn=null;function si(){if(!Q)return;const t=tn(x.hacks),e=Yo(sn,t);if(sn=t,e.whole)Q.setState(t);else for(const[n,i,r]of e.params)Q.setParam(n,i,r)}function D(t){t(),x.active!==null&&($t=!0),je="",It(),Fe(),si(),T()}const H=t=>x.pads[t]??tt(t),ce=t=>x.lanes[t]??Va(),li=()=>H(x.selected);function zt(t,e=x.selected){D(()=>t(H(e)))}function St(t,e,n){D(()=>{const i=ce(t).steps[e];i&&n(i)})}function we(t,e=!0){x.selected=Math.max(0,Math.min(Be-1,t)),J&&J.lane!==x.selected&&(J=null),It(),e&&ue(x.selected),T()}async function ue(t,e=null){if(!await ae()||!z||!F)return;z.state!=="running"&&await z.resume().catch(()=>{});const n=H(t),i=n.sample?rs(n,Y.info(n.sample),Z().bpm,e):null;i&&F.port.postMessage({type:"play",pad:t,hit:i})}async function Rt(t,e,n,i){const{sample:r,saved:o}=await Y.put(e,n);await bn(r.hash),D(()=>{const s=H(t);s.sample=r.hash,s.name=i.slice(0,24)||`Pad ${t+1}`,s.start=0,s.end=1,s.slices=0,s.cuts=[],s.fit=0}),B=o?"":"Kept until you reload: this browser has no file storage here.",Y.prune(He(x)),ue(t)}async function yn(t,e=x.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await Is(t);return}if(!await ae()||!z)return;let n;try{n=await z.decodeAudioData(await t.arrayBuffer())}catch{B=`Couldn't read ${t.name}: not an audio file this browser can decode.`,T();return}const{data:i,trimmed:r}=hs(n);await Rt(e,i,n.sampleRate,t.name.replace(/\.[^.]+$/,"")),r&&(B=`${t.name} was cut to its first minute.`,T())}const R={from:"master",bars:1,busy:!1};async function vn(){const t=Nt();if(!t||R.busy||!await ae()||!z)return;const e=Z();if(!e.running){B="Play first: Grab takes the bars that just played.",T();return}const n=R.bars,i=Math.floor(e.beatAt(U())/4)*4,r=i-4*n;if(r<0){B=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const o=z.sampleRate,s=Math.round(kt(e.timeAt(r))*o),c=Math.round(kt(e.timeAt(i))*o);R.busy=!0,T();const u=await t.take(R.from,s,c);R.busy=!1;const l=t.sources().find(f=>f.id===R.from)?.name??R.from;if(!u){B=`${l} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let d=0;for(const f of u)for(const b of f)d=Math.max(d,Math.abs(b));if(d<1e-4){B=`${l} was silent for those ${n===1?"bar":"bars"}.`,T();return}const h=x.selected;await Rt(h,u,o,`${l} grab`),n===1?(D(()=>{const f=H(h);f.fit=1,f.slices=16,f.cuts=[],f.decay=4;const b=ce(h);b.length=pe;for(const g of b.steps)Object.assign(g,Ua(),{on:!0})}),B=`Grabbed a bar of ${l}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(zt(f=>{f.fit=n},h),await ln(8,"transients"),B=`Grabbed ${n} bars of ${l}, fitted to ${n} bars and sliced at the hits.`),T()}async function Cs(t){const e=await fs(t);if(!e){B=`LUCY take ${t.id} could not be read.`,T();return}await Rt(x.selected,e,t.sampleRate,`LUCY take ${t.id}`)}async function ci(){const t=x.selected,e=H(t);!e.sample||!await Xr({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(D(()=>{x.pads[t]=tt(t)}),Y.prune(He(x)))}async function ln(t,e){const n=li();let i=[];if(t&&e==="transients"&&n.sample){const r=await Y.get(n.sample);r&&(i=ms(r.data,r.sampleRate,Math.floor(n.start*r.frames),Math.ceil(n.end*r.frames),t))}zt(r=>{r.slices=t,r.cuts=i})}function Ts(t,e){const n=_a[t]??String(t+1);if(e==="store")x.slots[t]=Ja(x),x.active=t,$t=!1,je=`Stored in ${n}`;else if(e==="clear")x.slots[t]=null,x.active===t&&(x.active=null),je=`Cleared ${n}`,Y.prune(He(x));else{const i=x.slots[t];if(!i){je=`${n} is empty: Shift-click or long-press to store`,T();return}di(i),x.active=t,$t=!1,je=`Recalled ${n}`}It(),Fe(),si(),T()}function di(t){const e=structuredClone(t);x.pads=e.pads,x.lanes=e.lanes,x.swing=e.swing,x.hacks=e.hacks,J=null;for(const n of He(x))bn(n).then(()=>Fe())}async function ui(){if(await ae(),z&&z.state!=="running"&&await z.resume().catch(()=>{}),le&&Je()){if(de=!de,!de){const t=Z();ke=t.nextBar(t.beatAt(U()+Ls))}at(!0),T();return}Je()?ne.stop({at:U()}):(de=!1,ke=0,ne.play({at:U()}))}ne.onChange(()=>{Z().running||(de=!1,ke=0),Fe(),at(!0),T()});function Ns(){const t={nyx:1,...Ja(x)},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${ge>1?`-${ge}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Is(t){let e;try{e=JSON.parse(await t.text())}catch{B=`Couldn't read ${t.name}: not a NYX pattern.`,T();return}if(!e||typeof e!="object"||e.nyx!==1){B=`Couldn't read ${t.name}: not a NYX pattern.`,T();return}const n=on(e);D(()=>di(n));const i=[];for(const r of x.pads)r.sample&&!await Y.get(r.sample)&&i.push(r.name);B=i.length?`Loaded. ${i.length===1?"One pad needs its":`${i.length} pads need their`} sample again (${i.join(", ")}): samples stay in the browser they were loaded in.`:`Loaded ${t.name}.`,Fe(),T()}function zs(){F?.port.postMessage({type:"stop"}),Je()&&(le?de=!0:ne.stop({at:U()})),at(!0),Q?.clear({fadeMs:20}),T()}function Rs(t){x.master=Math.min(1,Math.max(0,t)),It(),xt&&z&&xt.gain.setTargetAtTime(x.master,z.currentTime,.01),At.value=String(x.master),wn.textContent=`${Math.round(x.master*100)}%`}const P=(t,e={},...n)=>{const i=document.createElement(t);for(const[r,o]of Object.entries(e))i.setAttribute(r,o);return i.append(...n),i},jt=document.getElementById("app");jt.classList.add("nc","nc-page");const pi=P("header",{class:"nc-page-hd"},P("div",{},P("h1",{class:"nc-page-title"},P("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",P("span",{class:"nc-page-sep"},"/")," SAMPLER ",P("span",{class:"nc-page-sep"},"/")," ",P("span",{class:"nc-mono"},String(ge).padStart(2,"0"))),P("p",{class:"nc-page-sub"},"A NetComposer element."))),At=P("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(x.master),"data-nc-id":"nyx-master"});At.addEventListener("input",()=>Rs(Number(At.value)));const wn=P("span",{class:"nc-readout","data-nc-readout":""});wn.textContent=`${Math.round(x.master*100)}%`;const oa="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",$e=P("input",{type:"file"});$e.hidden=!0;let sa="pad";$e.addEventListener("change",()=>{const t=$e.files?.[0];$e.value="",t&&yn(t)});function $n(t){sa=t,$e.accept=sa==="pad"?oa:`${oa},.json,application/json`,$e.click()}const Yt=(t,e,n)=>{const i=P("button",{type:"button",class:"nc-page-action",title:n,"data-nyx-action":t.toLowerCase()},t);return i.addEventListener("click",e),i};pi.append(P("div",{class:"nc-page-actions"},P("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},P("label",{class:"nc-label",for:"nyx-master"},"Master"),At,wn),Yt("Save",Ns,"Download the pattern (pads, steps, Hacks). Samples stay in this browser"),Yt("Load",()=>$n("any"),"Load a pattern, or an audio file onto the selected pad"),Yt("Panic",zs,"Every voice out, and sit out until Play"),$e));const kn=P("div",{class:"nc-stack","data-nc-layout":"adjacent"});jt.append(pi,P("main",{class:"nc-page-body"},kn));jt.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});jt.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),yn(e))});const Ge=t=>`${Math.round(t*100)}%`,ze=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,cn=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,dn=(t,e="")=>`${t>0?"+":""}${t}${e}`;function js(t){return Math.abs(t)<.001?"open":t<0?`LP ${cn(2e4*(60/2e4)**-t)}`:`HP ${cn(20*(8e3/20)**t)}`}function Ps(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function hi(){return Je()?de?"Sitting out":Z().beatAt(U())<ke?"Joining on the next bar":"Playing":x.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function Os(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const mi=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],et={fill:!1,perform:null};function Lt(t){et.fill!==t&&(et.fill=t,F?.port.postMessage({type:"fill",on:t}),T())}function un(t){et.perform!==t&&(et.perform=t,F?.port.postMessage({type:"perform",mode:t}),T())}function Bs(t){const e=r=>{const s=(r.target instanceof Element?r.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),c=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return mi.some(u=>u.mode===c)?c:null},n=r=>{ae(),r==="fill"?Lt(!0):un(r)},i=()=>{Lt(!1),un(null)};t.addEventListener("pointerdown",r=>{const o=e(r);if(!o)return;r.preventDefault(),n(o);const s=()=>{i(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",r=>{if((r.key===" "||r.key==="Enter")&&!r.repeat){const o=e(r);if(!o)return;r.preventDefault(),n(o)}}),t.addEventListener("keyup",r=>{(r.key===" "||r.key==="Enter")&&e(r)&&i()}),window.addEventListener("blur",i)}function Ws(){return{id:"transport",title:"Transport",status:je,controls:[{type:"button",id:"play",label:Qe()?"Stop":"Play",on:Qe(),onPress:()=>void ui()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:et.perform??"",options:mi.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(Z().bpm),valueText:`${Math.round(Z().bpm)} BPM`,onChange:t=>{ne.setTempo({bpm:t}),T()}},{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:x.swing,valueText:Ge(x.swing),onChange:t=>D(()=>{x.swing=t})},{type:"readout",id:"status",label:"Status",value:hi()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:_a.map((t,e)=>({label:t,filled:x.slots[e]!=null,active:x.active===e,edited:x.active===e&&$t})),onMorph:()=>{},onSlot:(t,e)=>Ts(t,e)}]}}function fi(){if(!Qe())return-1;const t=Z().beatAt(U());return t<0||t<ke?-1:Math.floor(t/ts)%pe}function Gs(){const t=li(),e=fi();return{id:"pattern",title:"Pattern",lead:!0,summary:`${x.lanes.filter(n=>n.steps.some(i=>i.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${x.selected}`,rows:x.lanes.map((n,i)=>({id:`pad-${i}`,label:H(i).name,length:n.length,lane:i%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(r=>({on:r.on,accent:r.accent,velocity:r.velocity,dim:!H(i).sample}))})),onToggle:(n,i,r)=>St(n,i,o=>{r?(o.accent=o.on?!o.accent:!0,o.on=!0):(o.on=!o.on,o.on||(o.accent=!1))}),onSet:(n,i,r,o)=>St(n,i,s=>{r==="on"?(s.on=o,o||(s.accent=!1)):(s.accent=o,o&&(s.on=!0))}),onSelectRow:n=>we(n),onLongPress:(n,i)=>{J={lane:n,step:i},we(n,!1)},onMute:n=>D(()=>{ce(n).mute=!ce(n).mute}),onSolo:n=>D(()=>{ce(n).solo=!ce(n).solo}),onLength:(n,i)=>D(()=>{ce(n).length=Math.max(1,Math.min(pe,i))}),transport:{playing:Qe(),onToggle:()=>void ui()},onFill:n=>Lt(n)},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:x.selected,pads:x.pads.map((n,i)=>({label:n.name,empty:!n.sample,peaks:n.sample?We.get(n.sample):void 0,lane:i%4+1,playing:nt.has(i)})),onPress:n=>Ds(n),onFile:(n,i)=>{we(n,!1),yn(i,n)},onMove:(n,i,r)=>Zs(n,i,r),menu:n=>Xs(n),onMenu:(n,i)=>void _s(n,i),onRename:(n,i)=>Ys(n,i)}]}]}}function Hs(t){if(!J||J.lane!==x.selected)return[];const{lane:e,step:n}=J,i=ce(e).steps[n];if(!i)return[];const r=o=>St(e,n,o);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:i.velocity,valueText:Ge(i.velocity),onChange:o=>r(s=>{s.velocity=o})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:i.chance,valueText:Ge(i.chance),onChange:o=>r(s=>{s.chance=o})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:i.slice===null?"auto":String(i.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(o,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:o=>r(s=>{s.slice=o==="auto"?null:Number(o)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:i.pitch,valueText:dn(i.pitch," st"),onChange:o=>r(s=>{s.pitch=o})},{type:"select",id:"lock-cond",label:"Plays",value:i.cond,options:an.map(o=>({value:o,label:Os(o)})),onChange:o=>r(s=>{an.includes(o)&&(s.cond=o)})},{type:"choice",id:"lock-reverse",label:"Direction",value:i.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:o=>r(s=>{s.reverse=o==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{J=null,T()}}]}function Fs(){const t=Nt();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:R.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{R.from=n,t.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(R.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{R.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:R.busy?"Grabbing…":R.bars===1?"Grab last bar":`Grab last ${R.bars} bars`,on:R.busy,onPress:()=>void vn()}]}function Ds(t){if(!H(t).sample){we(t,!1),$n("pad");return}we(t)}function Zs(t,e,n){D(()=>{const i=structuredClone(H(t)),r=structuredClone(H(e));x.pads[e]=i,n||(x.pads[t]=r.sample?r:tt(t))}),we(e,!1)}function Ys(t,e){zt(n=>{n.name=e.slice(0,24)},t)}function Xs(t){const e=!!H(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}];for(const i of ii().slice(-4).reverse())n.push({id:`take-${i.id}`,label:`LUCY take ${i.id}`});return Nt()&&n.push({id:"grab",label:R.bars===1?"Grab the last bar":`Grab the last ${R.bars} bars`}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function _s(t,e){if(we(t,!1),e==="load")$n("pad");else if(e==="grab")await vn();else if(e==="clear")await ci();else if(e.startsWith("take-")){const n=ii().find(i=>`take-${i.id}`===e);n&&await Cs(n)}}const qs=["q","w","e","r","a","s","d","f"];document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=qs.indexOf(t.key.toLowerCase());n<0||!H(n).sample||(t.preventDefault(),ue(n))});function Us(){const t=x.selected,e=H(t),n=e.sample?Y.info(e.sample):void 0,i=ei(e).slice(1,-1),r=e.end-e.start,o=n?n.frames/n.sampleRate:0,s=!!e.sample,c=s&&!n,u=d=>zt(d),l=s?[{type:"readout",id:"sample",label:"Length",value:c?"Not in this browser: load it again":`${ze(o*r)} of ${ze(o)} · ${n?.channels===2?"stereo":"mono"}`},{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:d=>u(h=>{h.mode=d})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:d=>u(h=>{(d==="fwd"||d==="rev"||d==="pingpong")&&(h.dir=d)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:ze(e.start*o),onChange:d=>u(h=>{h.start=Math.min(d,h.end-.002)}),onCommit:()=>void ue(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:ze(e.end*o),onChange:d=>u(h=>{h.end=Math.max(d,h.start+.002)}),onCommit:()=>void ue(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:qa.map(d=>({value:String(d),label:d?`${d}`:"Off"})),onChange:d=>void ln(Number(d),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:d=>void ln(e.slices,d==="transients"?"transients":"even")}]:[],{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:dn(e.tune," st"),onChange:d=>u(h=>{h.tune=d}),onCommit:()=>void ue(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:dn(e.fine," ct"),onChange:d=>u(h=>{h.fine=d})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(d=>({value:String(d),label:`${d} bar${d===1?"":"s"}`}))],onChange:d=>u(h=>{h.fit=Number(d)})},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,value:e.attack,valueText:ze(e.attack),onChange:d=>u(h=>{h.attack=d})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,value:e.decay,valueText:e.decay>=3.99?"Hold":ze(e.decay),onChange:d=>u(h=>{h.decay=d}),onCommit:()=>void ue(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:js(e.cutoff),onChange:d=>u(h=>{h.cutoff=Math.abs(d)<.02?0:d})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Ge(e.resonance),onChange:d=>u(h=>{h.resonance=d})},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:Ge(e.level),onChange:d=>u(h=>{h.level=d})},{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:Ps(e.pan),onChange:d=>u(h=>{h.pan=Math.abs(d)<.02?0:d})},{type:"choice",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},{value:"1",label:"Group A"},{value:"2",label:"Group B"}],onChange:d=>u(h=>{h.choke=Number(d)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void ci()}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?We.get(e.sample)??[]:[],region:[e.start,e.end],markers:i.map(d=>e.start+d*r),position:nt.get(t)??-1}]:[],...B?[{type:"note",id:"notice",text:B}]:[],...Hs(e),...l,...Fs()]}}function pn(t,e){D(()=>e(x.hacks[t]))}function Vs(t,e){const n=x.hacks[t].dials[e.key]??e.default,i=`hack-${t}-${e.key}`,r=o=>pn(t,s=>{s.dials[e.key]=o});return e.options?{type:"select",id:i,label:e.label,value:String(n),options:e.options.map(o=>({value:String(o.value),label:o.label})),onChange:o=>r(Number(o))}:{type:"slider",id:i,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:fa(e,n,Z().bpm),onChange:r}}const dt=(t,e)=>(ie(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>Vs(t,n));function Ks(){const t=x.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,i=o=>D(()=>o(x.hacks.filter)),r=[Xa(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:r.length?r.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,onToggle:o=>i(s=>{s.on=o}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>i(s=>{(o==="lp"||o==="hp"||o==="bp")&&(s.mode=o)})},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":cn(Ya(e.cutoff)),onChange:o=>i(s=>{s.cutoff=o})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Ge(e.resonance),onChange:o=>i(s=>{s.resonance=o})}],{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance}]},{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,onToggle:o=>pn("drive",s=>{s.on=o}),controls:dt("drive",!1),more:dt("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,onToggle:o=>pn("compressor",s=>{s.on=o}),controls:dt("compressor",!1),more:dt("compressor",!0)}]}}const xn=[Ws,Gs,Us,Ks].map(t=>({def:t,handle:Fo(t())}));Do(kn,xn.map(t=>t.handle),"adjacent");Bs(kn);function T(){for(const t of xn)t.handle.update(t.def())}let la="";function gi(){at();const t=nt.get(x.selected)??-1,e=JSON.stringify([fi(),hi(),Math.round(t*400)]);if(e!==la){la=e;for(const n of xn.slice(0,3))n.handle.update(n.def())}requestAnimationFrame(gi)}requestAnimationFrame(gi);Ms.start();Promise.all([...He(x)].map(t=>Y.get(t))).then(t=>{for(const e of t)e&&!We.has(e.hash)&&We.set(e.hash,ai(e.data));T()});if(le)ae(),Nt()?.listen(R.from);else{const t=()=>{ae()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:x,clock:ne,store:Y,get ctx(){return z},get fx(){return Q},get positions(){return nt},ensureAudio:ae,play:ue,async setSample(t,e,n,i="test"){await ae()&&await Rt(t,e,n,i)},grab:R,grabBars:vn,setPerform:un,setFill:Lt,toggleStep(t,e){St(t,e,n=>{n.on=!n.on})}};
