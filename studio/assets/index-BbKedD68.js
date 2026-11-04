(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const wt=1e-9;function gd(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Dr{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return gd(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let r=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+wt&&(r=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(r)}];for(const s of a){if(s.beat<=t.beat+wt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+wt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-wt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,r=.25){const o=this.bpmAt(n);if(!(a>0)||!(r>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/r));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Dr({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+wt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+wt)return n[a];return n[0]}}const bd=Object.freeze({beatsPerBar:4,beatUnit:4}),Tt=1e-9;function yd(e){return Math.floor(e+Tt)}function fs(e,t,n=!1){if(!(t>0))return e;const r=Math.ceil(e/t-Tt)*t;return n&&r<=e+Tt?r+t:r}class wd{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Dr({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??bd}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-Tt&&(this.stopTime===null||t<this.stopTime-Tt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-Tt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=yd(t/n),r=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:r,barPhase:r/n}}nextBar(t,n=!1){return fs(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ms="nc-clock/snapshot",gs=1;function vd(e,t="local"){return{format:ms,version:gs,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function xd(e,t){const n=$d(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Re=e=>typeof e=="number"&&Number.isFinite(e),zi=e=>e===null||Re(e);function $d(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==ms&&n("format"),(!Re(t.version)||Math.floor(t.version)!==gs)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Re(t.anchor.beat)||!Re(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Re(a.beat)&&Re(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Re(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Re(t.meter.beatUnit))&&n("meter"),(!zi(t.startTime)||!zi(t.stopTime)||!Re(t.stoppedBeat))&&n("transport times"),t}class kd{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new wd(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){xd(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return vd(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Ed="nc-sync/1",Sd=1,Ad="nc-sync",Md="nc-sync-leader",Td=0,bs=.5,ys=.75;function Ld(e){return typeof e=="number"&&Number.isFinite(e)&&e>=bs&&e<=ys?e:null}const Ma=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),Kt=e=>typeof e=="number"&&Number.isFinite(e),Ln=e=>typeof e=="string"&&e.length>0;function Cd(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==Sd||!Ln(t.type)||!Ln(t.from)||!Kt(t.term)||!Kt(t.seq)||!Kt(t.sentAt))return null;switch(t.type){case"hello":return Ln(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return Kt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&Kt(t.slot)?t:null;case"ping":case"pong":return Ln(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Nd(e,t,n,a,r){return{proto:Ed,from:t,term:n,seq:a,sentAt:r,...e}}function Ge(){return(performance.timeOrigin+performance.now())/1e3}const Ta=.003,Fd=3,La=.002+1e-6,zd=.01,Pi=500;class Pd{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?zd:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Ta&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const r=n-(this.timeOrigin+a)/1e3,o=this.median(),s=r-o,l=Math.abs(r-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(r,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const r=this.ctx.currentTime,o=r<=this.revertUntil;let s;if(a&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let d=0;d<u.length;d++)l.push(u[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!o){const d=this.offsets,c=this.preStep;c.length=0;for(let p=0;p<d.length;p++)c.push(d[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const l=this.offsets,u=t-n;for(let d=0;d<l.length;d++)l[d]+=u;this.stepCount++,s={stepSeconds:t-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const r=a>>1;return a%2?n[r]:(n[r-1]+n[r])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const r=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(r&&Number.isFinite(r.contextTime)&&Number.isFinite(r.performanceTime)&&r.contextTime>=Ta&&r.performanceTime>0)if(this.waitSince=null,r.contextTime===this.lastStampC&&r.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Pi)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=r.contextTime,this.lastStampP=r.performanceTime,this.stampSince=this.perfNow(),n=r.contextTime-(this.timeOrigin+r.performanceTime)/1e3,a=!0;else if(!r||!(r.contextTime>=Ta)&&!(r.contextTime>0&&!(r.performanceTime>0))){if(r){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Pi)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Fd,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let r=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=La&&u++;u>o&&(r=l,o=u)}if(o<a)return;const s=t[r];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>La&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=La}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const r=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(r,2)};setTimeout(r,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,r=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(r)&&r>0?r:null}}class Rd{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Ma,...t.capabilities},this.channelOption=t.channel??Ad,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const r=this.o.now(),o=()=>{n===this.startWaits&&t(r)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const r=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(r),0)}else{const r=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?r:Math.max(t+this.o.gatedStartLeadSeconds,r),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[r,o]=this.tempoRange();t=Math.min(o,Math.max(r,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??fs(u,1),u);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(ys,Math.max(bs,t)):Td;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Ld(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Cd(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const r=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ma,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),r||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const r=this.peers.get(n.from);r?r.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ma},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(r=>{this.leader&&this.decideStart(r)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const r of[...this.snapshotListeners])r(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const r of[...this.messageListeners])r(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(Md,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),r=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(r===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,r=o.id)}this.setLeader(r===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],r=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==r[0]?a[0]<r[0]:a[1]!==r[1]?a[1]<r[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const r=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>r&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Nd(t,this.id,this.term,++this.seq,this.o.now()))}}const Dd="modulepreload",Od=function(e){return"/studio/"+e},Ri={},Id=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=s(n.map(d=>{if(d=Od(d),d in Ri)return;Ri[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Dd,c||(h.as="script"),h.crossOrigin="",h.href=d,u&&h.setAttribute("nonce",u),document.head.appendChild(h),c)return new Promise((m,b)=>{h.addEventListener("load",m),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var qd=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ar=[.25,.5,.75,1,1.5,2],_d=4.9,ae={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},st={fmt:"wet"},Ae={fmt:"pct"},vt={fmt:"db"},Cn={fmt:"signedPct"},Ca={fmt:"num",suffix:" ms"},Z={div:100};function D(e,t,n,a,r,o,s,l){var u={key:e,label:t,min:n,max:a,default:r,step:1,k:o,unit:null,format:s};if(l)for(var d in l)u[d]=l[d];return u}function Nn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var on=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[D("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[D("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:ae.hpHz,astrid:!0,zero:"off"}),D("q","Resonance",0,100,0,2,{fmt:"q",law:ae.hpQ},{dsp:{law:ae.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[D("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:ae.bpHz,astrid:!0},{dsp:{law:ae.bpHz}}),D("q","Q",0,100,0,2,{fmt:"q",law:ae.bpQ},{dsp:{law:ae.bpQ}}),D("mix","Mix",0,100,100,3,st,{dsp:Z,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[D("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Nn(qd),overriddenBy:"beats_free",tempoSynced:!0}),D("feedback","Feedback",0,90,35,2,Ae,{dsp:Z,unit:"%"}),D("mix","Wet/dry",0,100,0,3,st,{dsp:Z,unit:"%",astridKey:"wet"}),D("tone","Tone",0,100,100,4,{fmt:"hz",law:ae.delayTone,offAt:100},{dsp:{div:99},more:!0}),D("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),D("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Nn([[0,"Insert"],[1,"Send"]]),more:!0}),D("send","Send",0,100,100,7,Ae,{dsp:Z,unit:"%",more:!0}),D("mod_send","Accent → send",-100,100,0,8,Cn,{dsp:Z,unit:"%",more:!0}),D("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[D("predelay","Pre-delay",0,200,0,1,Ca,{dsp:{div:1e3},unit:"ms"}),D("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:Z,unit:"%"}),D("decay","Decay",0,100,50,3,Ae,{dsp:Z,unit:"%"}),D("damping","Damping",0,100,0,4,Ae,{dsp:Z,unit:"%"}),D("mix","Mix",0,100,0,5,st,{dsp:Z,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[D("rate","Rate",0,100,26,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),D("depth","Depth",0,100,70,2,Ae,{dsp:Z,unit:"%"}),D("feedback","Feedback",-90,90,50,3,Cn,{dsp:Z,unit:"%"}),D("mix","Mix",0,100,50,4,st,{dsp:Z,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[D("rate","Rate",0,100,52,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),D("depth","Depth",0,100,50,2,Ae,{dsp:Z,unit:"%"}),D("spread","Spread",0,100,70,3,Ae,{dsp:Z,unit:"%"}),D("mix","Mix",0,100,40,4,st,{dsp:Z,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[D("rate","Rate",0,100,39,1,{fmt:"rate",law:ae.rate},{dsp:{law:ae.rate}}),D("depth","Depth",0,100,70,2,Ae,{dsp:Z,unit:"%"}),D("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Nn([[4,"4"],[6,"6"],[8,"8"]])}),D("feedback","Feedback",0,90,30,4,Ae,{dsp:Z,unit:"%"}),D("mix","Mix",0,100,50,5,st,{dsp:Z,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[D("low_db","Low",-18,18,0,1,vt,{unit:"dB"}),D("mid_db","Mid",-18,18,0,2,vt,{unit:"dB"}),D("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:ae.midHz,astrid:!0},{dsp:{law:ae.midHz}}),D("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:ae.eqQ},{dsp:{law:ae.eqQ}}),D("high_db","High",-18,18,0,4,vt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[D("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),D("output_db","Output",-12,12,0,2,vt,{unit:"dB"}),D("mix","Mix",0,100,100,3,st,{dsp:Z,unit:"%"}),D("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Nn([[0,"Smooth"],[1,"Acid"]]),more:!0}),D("tone","Tone",0,100,100,5,{fmt:"hz",law:ae.driveTone,offAt:100},{dsp:{div:99},more:!0}),D("mod_drive","Accent → drive",-100,100,0,6,Cn,{dsp:Z,unit:"%",more:!0}),D("mod_tone","Accent → tone",-100,100,0,7,Cn,{dsp:Z,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[D("threshold_db","Threshold",-60,0,0,1,vt,{unit:"dB"}),D("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:ae.ratio},{dsp:{law:ae.ratio}}),D("attack_ms","Attack",1,100,10,3,Ca,{unit:"ms"}),D("release_ms","Release",10,1e3,150,4,Ca,{unit:"ms"}),D("makeup_db","Makeup",0,24,0,5,vt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[D("width","Width",0,200,100,1,Ae,{dsp:Z,unit:"%"}),D("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:Z})]}],Bd=on.map(function(e){return e.type}),jd=on.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Hd={reverb:"plate"},Rt={},ws=[],sn=[];function Ud(e){Rt[e.type]||ws.push(e.type),Rt[e.type]=e;for(var t=0;t<sn.length;t++)try{sn[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function Vd(){return ws.map(function(e){return Rt[e]})}function Gd(e){return sn.push(e),function(){var t=sn.indexOf(e);t>=0&&sn.splice(t,1)}}function vs(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Or(e){var t=Hd[e]||e;return Bd.indexOf(t)>=0||typeof t=="string"&&Rt[t]?t:null}function re(e){for(var t=Or(e),n=0;n<on.length;n++)if(on[n].type===t)return on[n];return t&&Rt[t]?Rt[t]:null}function Wd(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function St(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Wn(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=St(n.law,t);return a===null?0:a}function Di(e,t){return Math.min(_d,e*60/(t>0?t:120))}var Oi=function(e){return e>0?"+":e<0?"−":""};function Yd(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function xs(e,t,n){var a=e.format,r;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:Oi(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return Oi(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(r=St(a.law,t),r===null?a.zero||"open":a.astrid?Yd(r):r+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+St(a.law,t).toFixed(1);case"ratio":return St(a.law,t).toFixed(1)+":1";case"rate":return r=St(a.law,t),(r<1?r.toFixed(2):r<10?r.toFixed(1):r.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(Di(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Di(t,n)*1e3)+" ms"}return String(t)}var Kd=1,ma=["drive","delay","plate"];function Xd(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,r){return xs(e,a,r)},t}var Lt=ma.map(function(e){var t=re(e),n={type:e,label:t.label,dials:t.dials.map(Xd)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Jd={reverb:"plate"};function Yn(e){var t=Jd[e]||e;return ma.indexOf(t)>=0?t:null}function ga(e){for(var t=Yn(e),n=0;n<Lt.length;n++)if(Lt[n].type===t)return Lt[n];return null}function $s(e,t){var n=ga(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Dt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Ie(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,r=1;r<e.options.length;r++)Math.abs(e.options[r].value-t)<Math.abs(a-t)&&(a=e.options[r].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Qd(){return{v:Kd,chain:Lt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Zd(e){return ar.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ar[0])}function Na(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function eu(e){for(var t=Array.isArray(e)?e:Na(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Qd(),r={},o=[],s=0;s<t.length;s++){var l=t[s];if(Na(l)){var u=Yn(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(r[u]){o.push(u);continue}r[u]=!0;var d=a.chain[ma.indexOf(u)],c=Na(l.dials)?l.dials:{};u==="delay"&&c.mix===void 0&&c.wet!==void 0&&(c=Object.assign({},c,{mix:c.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,ga(u).dials.forEach(function(p){d.dials[p.key]=Ie(p,c[p.key])}),tu(u,d.dials,c)}}return{state:a,dropped:o}}function tu(e,t,n){for(var a=ga(e),r=0;r<a.dials.length;r++){var o=a.dials[r];o.stepWhen&&(t[o.key]=Ie(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],Dt(o,t)))}}function Kn(e){return eu(e).state}function nu(e){return JSON.parse(JSON.stringify(e))}var au=24,rr={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function ir(e,t,n){if(t==="bypass")return n?0:1;var a=$s(e,t)||ru(e,t);return a?Wn(a,n):0}function ru(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var iu={};Lt.forEach(function(e){e.dials.forEach(function(t){iu[e.type+"."+t.key]=t.format})});function Fa(e,t){var n=new Float64Array(au),a=Kn(e);return a.chain.forEach(function(r){var o=rr[r.type];n[o.bypass]=r.bypass?0:1,Object.keys(r.dials).forEach(function(s){n[o[s]]=ir(r.type,s,r.dials[s])})}),n}var ou="__ncFxLoop",su=/^(?:return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/,Ii=/[A-Za-z_$\u0080-\uffff]/,za=/[A-Za-z0-9_$\u0080-\uffff]/;function lu(e){var t=[],n=0,a=e.length,r=[],o,s;function l(){var h=t.length?t[t.length-1]:null;return h?h.t==="name"?su.test(h.v):h.t==="num"||h.t==="str"||h.t==="tpl"||h.t==="re"?!1:h.v!==")"&&h.v!=="]":!0}function u(){for(var h=n-1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o==="`"){n++,t.push({t:"tpl",v:"",s:h,e:n});return}if(o==="$"&&e[n+1]==="{"){n+=2,r.push("tpl"),t.push({t:"tpl",v:"",s:h,e:n});return}n++}t.push({t:"tpl",v:"",s:h,e:a})}for(;n<a;){if(o=e[n],o===" "||o==="	"||o===`
`||o==="\r"||o==="\f"||o==="\v"||o===" "||o==="\uFEFF"||o==="\u2028"||o==="\u2029"){n++;continue}if(o==="/"&&e[n+1]==="/"){for(;n<a&&e[n]!==`
`&&e[n]!=="\r";)n++;continue}if(o==="/"&&e[n+1]==="*"){var d=e.indexOf("*/",n+2);n=d<0?a:d+2;continue}if(s=n,o==='"'||o==="'"){for(n++;n<a&&e[n]!==o&&e[n]!==`
`;)n+=e[n]==="\\"?2:1;n++,t.push({t:"str",v:"",s,e:n});continue}if(o==="`"){n++,u();continue}if(o==="/"&&l()){n++;for(var c=!1;n<a;){if(o=e[n],o==="\\"){n+=2;continue}if(o===`
`)break;if(c)o==="]"&&(c=!1);else if(o==="[")c=!0;else if(o==="/"){n++;break}n++}for(;n<a&&za.test(e[n]);)n++;t.push({t:"re",v:"",s,e:n});continue}if(Ii.test(o)||o==="\\"){for(n++;n<a&&(za.test(e[n])||e[n]==="\\");)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o==="#"&&n+1<a&&Ii.test(e[n+1])){for(n+=2;n<a&&za.test(e[n]);)n++;t.push({t:"name",v:e.slice(s,n),s,e:n});continue}if(o>="0"&&o<="9"||o==="."&&e[n+1]>="0"&&e[n+1]<="9"){for(n++;n<a&&/[0-9A-Za-z_.]/.test(e[n]);)(e[n]==="e"||e[n]==="E")&&(e[n+1]==="+"||e[n+1]==="-")&&!/^0[xX]/.test(e.slice(s,n))&&n++,n++;t.push({t:"num",v:"",s,e:n});continue}if(o==="{")r.push("{");else if(o==="}"){var p=r.pop();if(p==="tpl"){n++,u();continue}}if(o==="?"&&e[n+1]==="."&&!(e[n+2]>="0"&&e[n+2]<="9")){n+=2,t.push({t:"p",v:"?.",s,e:n});continue}if(o==="."&&e[n+1]==="."&&e[n+2]==="."){n+=3,t.push({t:"p",v:"...",s,e:n});continue}n++,t.push({t:"p",v:o,s,e:n})}return t}function cu(e,t){for(var n=0,a=t;a<e.length;a++){var r=e[a].t==="p"?e[a].v:"";if(r==="("||r==="["||r==="{")n++;else if((r===")"||r==="]"||r==="}")&&(n--,n===0))return r===")"?a:-1}return-1}function du(e){for(var t=String(e),n=lu(t),a=[],r=ou+"()",o=0;o<n.length;o++){var s=n[o];if(!(s.t!=="name"||s.v!=="while"&&s.v!=="for")){var l=o>0?n[o-1]:null;if(!(l&&l.t==="p"&&(l.v==="."||l.v==="?."))){var u=o+1;if(!(s.v==="for"&&n[u]&&n[u].t==="name"&&n[u].v==="await")&&!(!n[u]||n[u].t!=="p"||n[u].v!=="(")){var d=cu(n,u);if(!(d<0)){if(s.v==="while"){if(d===u+1)continue;a.push([n[u].e,r+" && ("],[n[d].s,")"]);continue}for(var c=[],p=0,h=u+1;h<d;h++){var m=n[h].t==="p"?n[h].v:"";m==="("||m==="["||m==="{"?p++:m===")"||m==="]"||m==="}"?p--:m===";"&&p===0&&c.push(h)}c.length===2&&(c[1]===c[0]+1?a.push([n[c[0]].e," "+r]):a.push([n[c[0]].e," "+r+" && ("],[n[c[1]].s,")"]))}}}}}if(!a.length)return t;a.sort(function(g,w){return g[0]-w[0]});for(var b="",y=0,f=0;f<a.length;f++)b+=t.slice(y,a[f][0])+a[f][1],y=a[f][0];return b+t.slice(y)}var Pa=1,qi=15,ks=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,uu=/^[a-z][a-z0-9_]{0,31}$/,Es=/^\d+\.\d+\.\d+$/,Ss=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,pu=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,_i=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],Bi=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Xn={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."};function ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xt(e){return typeof e=="number"&&isFinite(e)}function lt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function ba(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!ln(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){_i.indexOf(l)<0&&a(l,"unknown field (allowed: "+_i.slice(1).join(", ")+")")}),n.ncPlugin!==Pa&&a("ncPlugin","must be "+Pa),(typeof n.id!="string"||!ks.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),lt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Es.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),lt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Ss.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return lt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!pu.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var r=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>qi)a("params","at most "+qi);else{var o={};n.params.forEach(function(l,u){var d="params["+u+"]";if(!ln(l)){a(d,"must be an object");return}Object.keys(l).forEach(function(h){Bi.indexOf(h)<0&&a(d+"."+h,"unknown field (allowed: "+Bi.join(", ")+")")}),typeof l.id!="string"||!uu.test(l.id)||l.id==="bypass"?a(d+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(d+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,lt(l.label,24)||a(d+".label","the dial's name, 1 to 24 characters");var c=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(c)<0){a(d+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:c};if(c==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return lt(h,24)})){a(d+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(d,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(c==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(d,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!xt(l.minValue)||!xt(l.maxValue)||!(l.minValue<l.maxValue)){a(d,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(xt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(d+".discreteStep","a number > 0, at most the range"),p.discreteStep=c==="int"?Math.max(1,Math.round(l.discreteStep||1)):xt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:hu(l.maxValue-l.minValue),c==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(d,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!xt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(d+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(d+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(xt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(d+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(d+".more","true or false")),r.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:Pa,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:r};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function hu(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function fu(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function ya(e){return"plugin:"+e}function mu(e,t){var n=e,a=t||{},r=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var d=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=d.map(function(p,h){return{value:h,label:p}}),u.format={fmt:"option"}}else{var c=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:fu(s.discreteStep),suffix:c}}return s.more&&(u.more=!0),u}),o={type:ya(n.id),label:n.name,dials:r,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function As(e,t){var n=ba(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=re(ya(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var r=mu(n.manifest,t);return Ud(r),r}async function Ms(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",r=0;r<n.length;r++)a+=String.fromCharCode(n[r]);return"sha256-"+btoa(a)}function gu(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function ji(e,t,n,a){var r=await t(e,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+r.status);var o=new Uint8Array(await r.arrayBuffer());if(n){var s=await Ms(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var Fn=typeof WeakMap=="function"?new WeakMap:null;function Ts(e,t){var n=new Error("nc-fx plugin: "+e.name+" "+t+" is already loaded on this page. Reload the page to use "+e.version+".");return n.reload=!0,n}async function Ls(e,t,n,a,r){var o=t.id+"@"+t.version,s=Fn&&Fn.get(e);!s&&Fn&&(s={},Fn.set(e,s));var l=s&&s[o];if(l){var u=await l,d=await n();return{stale:d!==u}}var c=(async function(){var p=await n();await Rs(e,r);var h=URL.createObjectURL(new Blob([du(p)+`
//# sourceURL=`+a+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(h)}finally{URL.revokeObjectURL(h)}return p})();return s&&(s[o]=c,c.catch(function(){delete s[o]})),await c,{stale:!1}}async function Cs(e,t,n){var a=n||{},r=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));gu(r);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await ji(r.href,o,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+r.href+" is not JSON")}var d=ba(u);if(!d.ok)throw new Error("nc-fx plugin: "+r.href+": "+d.errors.join("; "));var c=d.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==c.id||a.expect.version&&a.expect.version!==c.version))throw new Error("nc-fx plugin: "+r.href+" is "+c.id+" "+c.version+", not what the registry lists");var p=re(ya(c.id));if(p&&p.plugin.version!==c.version)throw Ts(c,p.plugin.version);var h=new URL(c.dsp,r),m=await Ls(e,c,function(){return ji(h.href,o,s.dsp,"DSP file")},h.href,a.moduleUrl),b=As(c,{url:r.href,listed:a.listed===!0});return{entry:b,manifest:c,url:r.href,stale:m.stale}}var bu=256*1024;async function Hi(e,t,n){var a=n||{},r=t||{},o=r.manifest;if(typeof o=="string")try{o=JSON.parse(o)}catch{throw new Error("nc-fx plugin: plugin.json is not JSON")}var s=ba(o);if(!s.ok)throw new Error("nc-fx plugin: plugin.json: "+s.errors.join("; "));var l=s.manifest;if(typeof r.dsp!="string"||!r.dsp.trim())throw new Error("nc-fx plugin: "+l.name+" needs its DSP file, "+l.dsp);if(typeof r.dspName=="string"&&r.dspName!==l.dsp)throw new Error("nc-fx plugin: plugin.json names its DSP file "+l.dsp+", not "+r.dspName);if(new TextEncoder().encode(r.dsp).length>bu)throw new Error("nc-fx plugin: "+l.dsp+" is over 256 KB");var u=typeof a.url=="string"&&a.url?a.url:"local:"+l.id,d=re(ya(l.id));if(d&&d.plugin.version!==l.version)throw Ts(l,d.plugin.version);var c=r.dsp,p=await Ls(e,l,async function(){return c},u.replace(/[^A-Za-z0-9:._@\/-]/g,"_")+"/"+l.dsp,a.moduleUrl),h=As(l,{url:u,listed:!1});return{entry:h,manifest:l,url:u,stale:p.stale}}function yu(e){var t=[];if(!ln(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(r,o){var s="plugins["+o+"]",l=[];if(!ln(r)){t.push(s+": must be an object");return}if((typeof r.id!="string"||!ks.test(r.id))&&l.push("id"),lt(r.name,40)||l.push("name"),(typeof r.version!="string"||!Es.test(r.version))&&l.push("version"),lt(r.author,80)||l.push("author"),(typeof r.licence!="string"||!Ss.test(r.licence))&&l.push("licence"),(typeof r.manifest!="string"||!r.manifest)&&l.push("manifest"),(!ln(r.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(r.integrity.dsp||""))&&l.push("integrity"),(typeof r.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(r.checked))&&l.push("checked"),a[r.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[r.id]=!0;var u={id:r.id,name:r.name,version:r.version,author:r.author,licence:r.licence,manifest:r.manifest,integrity:{manifest:r.integrity.manifest,dsp:r.integrity.dsp},checked:r.checked};typeof r.description=="string"&&(u.description=r.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function wu(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),r=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!r.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+r.status);var o=yu(await r.json());return{registry:o.registry,url:a.href,errors:o.errors}}function vu(e,t,n,a){return Cs(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}function xu(e,t){var n=t||{},a=n.stallMs>0?n.stallMs:1500,r=n.everyMs>0?n.everyMs:250,o=n.now||function(){return typeof performance<"u"?performance.now():Date.now()},s=n.setInterval||setInterval,l=n.clearInterval||clearInterval,u=e.currentTime,d=o(),c=0,p=!1,h=s(function(){var m=o(),b=m-d,y=e.currentTime;if(d=m,e.state!=="running"||y!==u){u=y,c=0,p&&e.state==="running"&&(p=!1,n.onResume&&n.onResume());return}if(b>4*r){c=0;return}c+=b,!p&&c>=a&&(p=!0,n.onStall&&n.onStall({frozenMs:c,at:y}))},r);return{stop:function(){l(h)},stalled:function(){return p}}}var $u=2,Jn=3,Ui=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function ct(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var ku=/^local:[A-Za-z0-9._@-]{1,200}$/,Eu=/^\d+\.\d+\.\d+$/;function Su(e,t){var n=ct(e)?e:{},a=t.slice(7),r={id:a,version:typeof n.version=="string"&&Eu.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||ku.test(n.url))&&(r.url=n.url),typeof n.name=="string"&&n.name.trim()&&(r.name=n.name.trim().slice(0,40)),r}function Ns(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Au(e){var t={},n=0;if(ct(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function Mu(e){return e.plugin?e.plugin.idBase:e.type}function Fs(e,t){var n=re(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var r=1,o=Mu(n);a[o+"-"+r];)r++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+r,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=Ns(n)),l}function Tu(e){var t=re(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Lu(e,t,n){var a=e.length-1,r=Math.max(0,Math.min(a,n));if(t<0||t>a||t===r)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(r,0,s),o}function Cu(e){return typeof e=="number"&&isFinite(e)?Zd(e):e}function Vi(e,t,n){var a={};return e.dials.forEach(function(r){var o=t[r.key];o===void 0&&r.astridKey&&(o=t[r.astridKey]),n&&e.type==="delay"&&r.key==="delay_beats"&&(o=Cu(o)),a[r.key]=e.plugin?Ie(r,o,r.step):Ie(r,o)}),e.dials.forEach(function(r){r.stepWhen&&(a[r.key]=Ie(r,typeof t[r.key]=="number"?t[r.key]:a[r.key],Dt(r,a)))}),a}function Nu(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,r=1/0,o=e.min;o<=e.max;o++){var s=St(n.law,o),l=s===null?1/0:Math.abs(s-t);l<r&&(r=l,a=o)}return a}}var Fu={rate:"rate_hz"};function zu(e,t,n,a){var r={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||Fu[o.key]||o.key;r[o.key]=Nu(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),r}function Pu(e,t){var n=t>0?Math.floor(t):Jn,a=[],r=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):ct(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],d=0;d<o.length;d++){var c=o[d];if(ct(c)&&!(c.type==="limiter"||c.fixed===!0)){var p=Or(c.type),h=p&&re(p);if(!h&&!s&&vs(c.type)){if(u.length>=n){a.push(c.id||c.type);continue}for(var m=Su(c.plugin,c.type),b=m.id.split(".").pop(),y=1;u.some(function(v){return v.id===b+"-"+y});)y++;var f=typeof c.id=="string"&&Ui.test(c.id)&&!u.some(function(v){return v.id===c.id})?c.id:b+"-"+y;u.push({id:f,type:c.type,bypass:c.bypass===!0,dials:Au(c.dials),plugin:m});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof c.type=="string"&&a.push(c.type);continue}if(u.length>=n){a.push(c.id||p);continue}var g;ct(c.params)&&!ct(c.dials)?g=Vi(h,zu(h,c.params,r,c.id||p),l):g=Vi(h,ct(c.dials)?c.dials:{},l);var w=Fs(p,u),E=typeof c.id=="string"&&Ui.test(c.id)&&!u.some(function(v){return v.id===c.id})?c.id:w.id,C=s?c.bypass!==!1:c.bypass===!0,S={id:s?w.id:E,type:p,bypass:C,dials:g};h.plugin&&(S.plugin=Ns(h)),u.push(S)}}return{state:{v:$u,chain:u},dropped:a,notes:r}}function ut(e,t){return Pu(e,t).state}function $t(e){var t=re(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,Wn(a,e.dials[a.key])])}),n}function Ru(e){var t=ut(e,8),n=[],a=t.chain.filter(function(r){return r.plugin?(n.push(r.id+": ASTRID has no plugins"),!1):!0}).map(function(r,o){var s=re(r.type),l={};return o>=Jn&&n.push(r.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var d=r.dials[u.key];if(u.more){d!==u.default&&n.push(r.id+"."+u.key);return}u.key==="delay_beats"&&ar.indexOf(d)<0&&n.push(r.id+".delay_beats"),l[u.astridKey||u.key]=d}),{id:r.id,type:r.type,bypass:r.bypass,dials:l}});return{hacks:a,lossy:n}}var Du=150,Ou=6e3,Iu=18,zs=6.283185307179586;function wa(e,t,n){return e<t?t:e>n?n:e}function qu(e,t,n,a,r){var o=Math.pow(10,n/40),s=zs*t/r,l=Math.cos(s),u=Math.sin(s),d,c,p,h,m,b,y,f;if(e===0||e===2){y=u/2*Math.SQRT2,f=2*Math.sqrt(o)*y;var g=e===0?1:-1;d=o*(o+1-g*(o-1)*l+f),c=g*2*o*(o-1-g*(o+1)*l),p=o*(o+1-g*(o-1)*l-f),h=o+1+g*(o-1)*l+f,m=-g*2*(o-1+g*(o+1)*l),b=o+1+g*(o-1)*l-f}else y=u/(2*a),d=1+y*o,c=-2*l,p=1-y*o,h=1+y/o,m=-2*l,b=1-y/o;return[d/h,c/h,p/h,m/h,b/h]}function _u(e,t,n){var a=zs*t/n,r=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*r+e[2]*s,d=-(e[1]*o+e[2]*l),c=1+e[3]*r+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((u*u+d*d)/(c*c+p*p))}var Gi={};function at(e){return Gi[e]||(Gi[e]=Wd("eq",e))}function Et(e,t){var n=at(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return wa(a,n.min,n.max)}function Ps(e){return[{id:"low",kind:0,hz:Du,db:Et(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Wn(at("mid_hz"),Et(e,"mid_hz")),db:Et(e,"mid_db"),q:Wn(at("mid_q"),Et(e,"mid_q"))},{id:"high",kind:2,hz:Ou,db:Et(e,"high_db"),q:Math.SQRT1_2}]}function Bu(e,t,n){for(var a=Ps(e),r=n.length,o=new Float64Array(r),s=[],l=t/2,u=0;u<a.length;u++){var d=a[u],c=new Float64Array(r);if(d.db!==0)for(var p=qu(d.kind,d.hz,d.db,d.q,t),h=0;h<r;h++){var m=n[h]<l?n[h]:l*.9999;c[h]=_u(p,m,t),o[h]+=c[h]}s.push(c)}return{total:o,bands:s}}function ju(e){var t=at("mid_hz").dsp.law;return wa(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function Hu(e){var t=at("mid_q").dsp.law;return wa(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Qn={low:"low_db",mid:"mid_db",high:"high_db"},Uu={low:"Low",mid:"Mid",high:"High"};function Vu(e,t,n){var a=[];function r(o,s){var l=at(o),u=l.step||1;s=wa(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==Et(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Qn[t]&&r(Qn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&r("mid_hz",ju(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&r("mid_q",Hu(n.q)),a}function Gu(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Qn[e]?[Qn[e]]:[];return t.map(function(n){return[n,at(n).default]})}var zn=typeof WeakMap=="function"?new WeakMap:null;function Wu(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=zn&&zn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},zn&&zn.set(e,n)),n.handle}function Yu(e,t,n){var a=n||{},r={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(c){var p=e&&typeof e.getParam=="function"?e.getParam(t,c):void 0;r[c]=typeof p=="number"?p:at(c).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},u=Ps(r).map(function(c){var p=(c.db>0?"+":c.db<0?"−":"")+Math.abs(c.db)+" dB",h=c.hz>=1e3?(c.hz/1e3).toFixed(c.hz>=1e4?0:1)+" kHz":Math.round(c.hz)+" Hz";return{id:c.id,label:Uu[c.id],kind:c.kind===0?"lowshelf":c.kind===1?"peak":"highshelf",hz:c.hz,db:c.db,q:c.q,moveHz:c.id==="mid",moveQ:c.id==="mid",minHz:c.id==="mid"?200:c.hz,maxHz:c.id==="mid"?5e3:c.hz,minQ:.3,maxQ:6,valueText:c.id==="mid"?p+" at "+h+", Q "+c.q.toFixed(1):p+(c.id==="low"?", shelf below ":", shelf above ")+h,help:l[c.id]}}),d=function(c){for(var p=0;p<c.length;p++)a.set(c[p][0],c[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Iu,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(c){return Bu(r,s,c)},spectrum:a.spectrum===!1?void 0:Wu(e)||void 0,onBand:function(c,p){d(Vu(r,c,p))},onReset:function(c){d(Gu(c).filter(function(p){return p[1]!==r[p[0]]}))}}}var Ku="nc-fx@1",Xu=600,Ju=256,Qu=8,Xt=typeof WeakMap=="function"?new WeakMap:null;function Rs(e,t){var n=Xt&&Xt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Id(async()=>{const{default:o}=await import("./worklet-source-Dvdj1jcP.js");return{default:o}},[])).default,r=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}})(),Xt&&(Xt.set(e,n),n.catch(function(){Xt.delete(e)})),n)}function kt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Ds(e,t,n,a){var r=Math.min(400,Math.max(20,kt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=kt(t.preGain,1),d=Math.max(0,kt(t.crossfade,.012)),c=kt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),m=e.createGain(),b=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),b.gain.value=0,p.connect(m),m.connect(h),b.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:r,mUsers:0,lv:null,lvAt:0},g=n(r);f.post=function(v){f.node?f.node.port.postMessage(v):f.disposed||(o.length>=Ju&&(o=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&o.push({t:"meter",on:!0})),o.push(v))};function w(v){var x=o.map(function(A){var k=Object.assign({},A);return k.when>v||(k.when=0,k.t!=="clear"&&(k.snap=!0)),k});return o=[],x}f.emit=function(v){for(var x=0;x<f.listeners.length;x++)try{f.listeners[x](v)}catch(A){typeof console<"u"&&console.error(A)}},f.whenOf=function(v){return typeof v=="number"&&isFinite(v)&&v>0?v:0};var E=!1;f.tooFar=function(v){return typeof v=="number"&&v>e.currentTime+Xu?(!E&&typeof console<"u"&&(E=!0,console.warn("nc-fx: ignoring a time "+Math.round(v-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var C=Rs(e,t.moduleUrl).then(function(){if(!f.disposed){var v=Object.assign({bpm:r,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:c},g);v.pending=w(e.currentTime),f.node=new AudioWorkletNode(e,Ku,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:v}),f.node.port.onmessage=function(A){var k=A.data;if(k&&k.t==="lv"&&f.mUsers>0)f.lv=k.d,f.lvAt=Wi();else if(k&&k.t==="perr"&&f.onPluginError&&k.d)for(var T=0;T<(k.n|0);T++)f.onPluginError(k.d[2*T],k.d[2*T+1])},p.connect(f.node),y&&y.connect(f.node,0,1),f.node.connect(b);var x=e.currentTime;x<=0||d===0?(m.gain.value=0,b.gain.value=1):(m.gain.setValueAtTime(1,x),m.gain.linearRampToValueAtTime(0,x+d),b.gain.setValueAtTime(0,x),b.gain.linearRampToValueAtTime(1,x+d)),f.status="ready"}},function(v){f.status="unavailable",o=[],f.error=v});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&Wi()-f.lvAt<Zu?f.lv:null};var S={};return f.meter=function(v,x){if(S[v])return S[v];var A=0,k={in:0,out:0},T={open:function(){return f.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,f.meterClose())},read:function(){var N=A>0?f.levels():null;return k.in=0,k.out=0,N&&x(N,k),k}};return S[v]=T,T},f.core={input:p,output:h,modInput:y,ready:C,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(v,x){var A=kt(v,NaN);!(A>0)||f.disposed||f.tooFar(x)||(f.bpm=Math.min(400,Math.max(20,A)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(x)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function(v){var x=v&&typeof v=="object"?v:{at:v};if(!(f.disposed||f.tooFar(x.at))){var A=kt(x.fadeMs,0);f.post({t:"clear",when:f.whenOf(x.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function(v){return f.listeners.push(v),function(){var x=f.listeners.indexOf(v);x>=0&&f.listeners.splice(x,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",o=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,b,h,y].forEach(function(v){try{v&&v.disconnect()}catch{}})}}},f}var Zu=250;function Wi(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Os(e,t){t.in=e[0],t.out=e[1]}function Ra(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Da(e,t){var n=t||{};if(n.slots)return ep(e,n);var a=Kn(n.state),r=Array.from(Fa(a)),o=Ds(e,n,function(){return{program:r}},function(){return[{t:"load",program:Array.from(Fa(a)),when:0}]}),s=o.core;function l(u){return a.chain[ma.indexOf(u)]}return s.setParam=function(u,d,c,p){var h=Yn(u);if(!(!h||o.disposed||o.tooFar(p))){var m=l(h),b;if(d==="bypass")b=!!c;else{var y=$s(h,d);if(!y)return;b=Ie(y,c,Dt(y,m.dials))}return d==="bypass"?m.bypass=b:m.dials[d]=b,o.post({t:"p",i:rr[h][d],v:ir(h,d,b),when:o.whenOf(p)}),o.emit({effect:h,key:d,value:b}),ga(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(E){return E.key===d}))){var g=m.dials[f.key],w=Ie(f,g,Dt(f,m.dials));w!==g&&(m.dials[f.key]=w,o.post({t:"p",i:rr[h][f.key],v:ir(h,f.key,w),when:o.whenOf(p)}),o.emit({effect:h,key:f.key,value:w}))}}),b}},s.meter=function(){return o.meter("",Os)},s.getParam=function(u,d){var c=Yn(u);if(c){var p=l(c);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return nu(a)},s.setState=function(u,d){o.disposed||o.tooFar(d&&d.at)||(a=Kn(u),o.post({t:"load",program:Array.from(Fa(a)),when:o.whenOf(d&&d.at)}),o.emit({effect:null,key:null,value:null}))},s}function ep(e,t){var n=t.slots===!0?Jn:Math.max(1,Math.min(Qu,Math.floor(+t.slots)||Jn)),a=ut(t.state,n),r=1,o={},s={};function l(v){return!vs(v.type)||re(v.type)!==null}function u(v){var x=re(v.type);return x&&x.plugin?x.plugin.engine:v.type}function d(v){return o[v.id]||(o[v.id]=r++),o[v.id]}function c(v){return v.filter(l).map(function(x){return{uid:d(x),type:u(x),program:$t(x)}})}function p(){return a.chain.filter(l).map(function(v){return o[v.id]})}var h=c(a.chain),m=p(),b=Ds(e,t,function(){return{slots:n,chain:h,order:m}},function(){return[{t:"sync",chain:c(a.chain),order:p(),when:0}]}),y=b.core;b.onPluginError=function(v,x){for(var A in o)o[A]===v&&(s[A]=x,b.emit({effect:A,key:"error",value:x}))};function f(v){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===v)return a.chain[x];var A=Or(v);if(A){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===A)return a.chain[x]}return null}function g(v,x){var A=d(v);b.post({t:"add",uid:A,type:u(v),when:x}),$t(v).forEach(function(k){b.post({t:"ps",uid:A,k:k[0],v:k[1],when:x,snap:!0})})}function w(v){b.post({t:"order",uids:p(),when:v})}function E(v,x){var A={};a.chain.forEach(function(N){A[N.id]=N});var k=p().join();v.chain.forEach(function(N){var q=A[N.id];if(!l(N)){delete o[N.id];return}if(!q||q.type!==N.type||!o[N.id]){delete o[N.id],delete s[N.id],g(N,x);return}var _={};$t(q).forEach(function(U){_[U[0]]=U[1]}),$t(N).forEach(function(U){_[U[0]]!==U[1]&&b.post({t:"ps",uid:o[N.id],k:U[0],v:U[1],when:x})})});var T={};v.chain.forEach(function(N){T[N.id]=!0}),Object.keys(o).forEach(function(N){T[N]||delete o[N]}),Object.keys(s).forEach(function(N){T[N]||delete s[N]}),a=v,p().join()!==k&&w(x)}var C=Gd(function(v){if(!(b.disposed||!a.chain.some(function(A){return A.type===v}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(A){return A.type===v?ut({v:2,chain:[A]},1).chain[0]:A}),E(x,0),b.emit({effect:null,key:"plugin",value:v})}}),S=y.dispose;return y.dispose=function(){C(),S()},y.slots=n,y.meter=function(v){return v==null||v===""?b.meter("",Os):b.meter("#"+v,function(x,A){var k=f(v),T=k?o[k.id]:0,N=x[2];if(T){for(var q=3,_=0;_<N;_++,q+=3)if(x[q]===T){A.in=x[q+1],A.out=x[q+2];return}}})},y.setParam=function(v,x,A,k){var T=f(v);if(!(!T||b.disposed||b.tooFar(k))){var N=re(T.type),q,_=null;if(!N)return x!=="bypass"?void 0:(T.bypass=!!A,b.emit({effect:T.id,key:x,value:T.bypass}),T.bypass);if(x==="bypass")q=!!A;else{for(var U=0;U<N.dials.length;U++)N.dials[U].key===x&&(_=N.dials[U]);if(!_)return;q=Ie(_,A,Dt(_,T.dials))}var ce={},de={};$t(T).forEach(function(B){ce[B[0]]=B[1]}),N.dials.forEach(function(B){B.stepWhen&&(de[B.key]=T.dials[B.key])}),x==="bypass"?T.bypass=q:T.dials[x]=q,N.dials.forEach(function(B){B.stepWhen&&(T.dials[B.key]=Ie(B,T.dials[B.key],Dt(B,T.dials)))});var J=b.whenOf(k),Q=o[T.id];return Q&&$t(T).forEach(function(B){(ce[B[0]]!==B[1]||_&&B[0]===_.k)&&b.post({t:"ps",uid:Q,k:B[0],v:B[1],when:J})}),b.emit({effect:T.id,key:x,value:q}),Object.keys(de).forEach(function(B){B!==x&&T.dials[B]!==de[B]&&b.emit({effect:T.id,key:B,value:T.dials[B]})}),q}},y.getParam=function(v,x){var A=f(v);if(A)return x==="bypass"?A.bypass:A.dials[x]},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function(v,x){b.disposed||b.tooFar(x&&x.at)||(E(ut(v,n),b.whenOf(x&&x.at)),b.emit({effect:null,key:null,value:null}))},y.addEffect=function(v,x){var A=x||{},k=Fs(v,a.chain);if(!(!k||a.chain.length>=n||b.disposed||b.tooFar(A.at))){if(A.dials){var T=ut({v:2,chain:[{id:k.id,type:k.type,dials:A.dials}]},1).chain[0];k.dials=T.dials}A.bypass===!0&&(k.bypass=!0);var N=a.chain.slice(),q=typeof A.index=="number"?Math.max(0,Math.min(N.length,A.index)):N.length;return N.splice(q,0,k),E({v:2,chain:N},b.whenOf(A.at)),b.emit({effect:k.id,key:"chain",value:"add"}),k.id}},y.removeEffect=function(v,x){var A=f(v),k=x&&x.at;return!A||b.disposed||b.tooFar(k)?!1:(E({v:2,chain:a.chain.filter(function(T){return T!==A})},b.whenOf(k)),b.emit({effect:A.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function(v,x,A){var k=f(v),T=A&&A.at;if(!k||b.disposed||b.tooFar(T))return!1;var N=Lu(a.chain,a.chain.indexOf(k),x);return N===a.chain?!1:(E({v:2,chain:N},b.whenOf(T)),b.emit({effect:k.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function(v){var x={id:v.id,type:v.type,name:Tu(v),bypass:v.bypass};if(v.plugin){var A=s[v.id]||0,k=!l(v)||A===5;x.plugin={id:v.plugin.id,version:v.plugin.version,url:v.plugin.url,name:v.plugin.name,status:k?"missing":A?"failed":"ready"},A&&!k&&(x.plugin.error=Xn[A]||Xn[2])}return x})},y.toAstrid=function(){return Ru(a)},y}function Yi(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Is(e,t,n){var a=n||{},r=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:r?function(h){return r.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:r&&typeof r.sharedNow=="function"?function(){return r.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,d=!1;function c(h){if(!o){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=o(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:Yi(u,0);m>0&&e.setTempo(m);return}var b=Yi(u,h);b>0&&e.setTempo(b);for(var y=u&&(u.points||u.tempoPoints)||[],f=0;f<y.length;f++){var g=y[f];if(g.beat>h&&g.bpm>0){var w=c(g.beat);w!==void 0&&e.setTempo(g.bpm,w)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,c(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const cn="/studio/assets/worklet-C1cegAfk.js";var tp="nc-ui",np={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ir={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Zn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ap={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},et={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},rp={light:{color:np.color,semantic:Ir,component:Zn,runtime:ap},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},en=e=>`--${tp}-${e}`,or=Ir["label-on-fill-dark"],Ki=Ir["label-on-fill-light"],ip=et["label-min-contrast"],op=/^#[0-9a-f]{6}$/i,sp=e=>typeof e=="string"&&op.test(e),Bn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Xi(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),r=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Bn(r(0)*255)}${Bn(r(8)*255)}${Bn(r(4)*255)}`}function qs(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,a),o=Math.min(t,n,a),s=(r+o)/2,l=r-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-a)/l%6):r===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function Ji(e){let[t,n,a]=[1,3,5].map(r=>{let o=parseInt(e.slice(r,r+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function sr(e,t){let[n,a]=[Ji(e),Ji(t)].sort((r,o)=>o-r);return(n+.05)/(a+.05)}var ea=e=>sr(e,or)>=sr(e,Ki)?or:Ki;function _s(e,t,n,a=ip){let r=Xi(e,t,n),o=ea(r)===or?1:-1;for(let s=0;s<40&&sr(r,ea(r))<a;s++)n+=o*.01,r=Xi(e,t,n);return r}function lp(e){let{h:t,s:n}=qs(e),a=_s(t,Math.min(n,et["surprise-on-max-saturation"]),et["surprise-on-lightness"]);return{fill:e,ink:ea(e),on:a,onInk:ea(a)}}var cp=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function dp(e,t=Math.random){let[n,a]=et["surprise-saturation"],[r,o]=et["surprise-lightness"],s=et["surprise-min-hue-gap"],l=sp(e)?qs(e).h:null,u=t()*360;return l!==null&&cp(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),_s(u,n+t()*(a-n),r+t()*(o-r))}function up(e){if(!e)return null;let t=lp(e);return{[en("surprise-fill")]:t.fill,[en("surprise-ink")]:t.ink,[en("surprise-on")]:t.on,[en("surprise-on-ink")]:t.onInk}}var pp=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,hp=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Qi(e){let[t,n,a]=[1,3,5].map(l=>pp(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*r+.793617785*o-.0040720468*s,1.9779984951*r-2.428592205*o+.4505937099*s,.0259040371*r+.7827717662*o-.808675766*s]}function fp([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*r+.2309699292*o,-1.2684380046*a+2.6097574011*r-.3413193965*o,-.0041960863*a-.7034186147*r+1.707614701*o].map(s=>Bn(hp(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var mp=et["velocity-range"],Bs={min:Zn.rhythm["velocity-min"],max:Zn.rhythm["velocity-max"]},Zi=Object.fromEntries(Object.entries(rp).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function gp(e,t=Bs){let[n,a]=mp,r=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(r-n)/(a-n),s=t.ink??Zn.rhythm["step-cell-ink"];if(o<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Qi(t.min),u=Qi(t.max);return{velocity:r,t:o,fill:fp(l.map((d,c)=>d+(u[c]-d)*o)),ink:s}}function eo(e,t=Bs){return{[en("velocity-fill")]:gp(e,t).fill}}var ta="data-nc-theme",lr="nc-ui-theme-change",bp=Object.freeze(["system","light","dark"]),yp="netcomposer.studio.theme.v1",wp="(prefers-color-scheme: dark)",qr=e=>e?.documentElement??null,js=e=>e?.defaultView?.matchMedia?.(wp)??null,_r=e=>e==="light"||e==="dark"?e:"system";function vp(e=globalThis.document){return _r(qr(e)?.getAttribute(ta))}function na(e=globalThis.document){let t=vp(e);return t!=="system"?t:js(e)?.matches?"dark":"light"}function Br(e,t=globalThis.document){let n=qr(t);if(!n)return"light";let a=_r(e);a==="system"?n.removeAttribute(ta):n.setAttribute(ta,a);let r=na(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(lr,{detail:{choice:a,theme:r}})),r}function Hs(e,t=globalThis.document){let n=qr(t);if(!n)return()=>{};let a=na(t),r=()=>{let u=na(t);u!==a&&(a=u,e(u))},o=t.defaultView?.MutationObserver,s=o?new o(r):null;s?.observe(n,{attributes:!0,attributeFilter:[ta]});let l=js(t);return l?.addEventListener?.("change",r),t.addEventListener(lr,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(lr,r)}}var xp={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},$p={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},kp={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Ep={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},va={};for(let[e,t]of Object.entries($p))va[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Ep))va[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(kp))va[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(xp.renames.map(e=>[e.old,e.new]));function Us(e){let t=va[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ee(e){return Us(e).prop}function i(e){return`var(${ee(e)})`}function Sp(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ee(t)));return Number.isFinite(n)?n:0}function le(e,t){let n=Us(t),a=e.ownerDocument??document,r=a.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=o:r.style.color=o,(e instanceof Element?e:a.documentElement).append(r);let s=(a.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Vs(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Ap(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var Mp="[data-modulated], [data-modulated] *",Gs="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function Oa(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function to(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Tp(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${ee("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${ee("divider")}: ${i(`module-div-stack-${a}`)};
      ${ee("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${ee("text-sub")}: ${i("module-sub-stack-1")};
      ${ee("divider")}: ${i("module-div-stack-1")};
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
/* Phones: a page never pans sideways. A guard only: whatever is wider than the screen is the bug, fixed where it is
   (an iPhone sizes a Studio frame to its content, so one wide element pans the whole Studio: Peter, 2026-11-01).
   clip, not hidden: no scroll container, so position: sticky still sticks. */
@media (max-width: 768px) {
  html, body { overflow-x: clip; }
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
/* Page menu (pageMenu, page-menu.js; Peter, 2026-11-01: "On mobile put the top menu choices in a hamburger"). Wider
   than a phone the panel is display: contents, so the actions lay out as before and the ☰ hides. On a phone the
   actions wait behind the ☰ at the header's right; open, they are a flat list under the header, over the page (no
   layout shift), each a full-width target-min row. What an app keeps outside the panel (Panic) stays in the header. */
.nc-page-menu { display: contents; }
.nc-page-menu-btn { display: none; }
@media (max-width: 768px) {
  .nc-page-menu:not([data-nc-open]) { display: none !important; }
  .nc-page-menu-btn {
    display: inline-grid;
    place-items: center;
    flex: none;
    min-width: ${i("target-min")};
    min-height: ${i("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${i("target-min")} - ${i("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${i("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${i("target-min")} / 2.75); height: calc(${i("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${i("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${i("control-gap")};
    background: ${i("surface-page")};
    color: ${i("text")};
    border-bottom: ${i("hairline")} solid ${i("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${i("page-pad-x")} * -1);
    right: calc(${i("page-pad-x")} * -1);
    padding-inline: ${i("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${i("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${i("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${i("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${i("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${i("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${i("page-pad-x-md")} * -1);
    right: calc(${i("page-pad-x-md")} * -1);
    padding-inline: ${i("page-pad-x-md")};
  }
}
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
${[1,2,3,4].map(t).join(`
`)}
${[1,2,3,4].map(e).join(`
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
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${i("module-pad")}; }
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
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
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
${Mp} { transition: none; }
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
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${i("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${i("control-gap")};
  color: ${i("text-sub")};
  font-weight: ${i("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${i("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${i("text")}; border-bottom-color: ${i("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${i("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${i("page-action-gap")}; }
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
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${i("control-gap")}; left: ${i("control-gap")}; z-index: 1; }
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
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${i("text")}; }
.nc-fold-toggle:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${i("control-gap")} * 1.5);
  height: calc(${i("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${i("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${i("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${i("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${i("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${i("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${i("control-gap")};
  border-bottom: ${i("hairline")} solid transparent;
  font-size: ${i("label-size")};
  font-weight: ${i("control-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  line-height: ${i("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${i("text")}; border-bottom-color: ${i("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${i("body-size")};
  font-weight: ${i("fx-name-weight")};
  color: ${i("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${i("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${i("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${i("display-height")}; }
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${i("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${i("eq-graph-height")};
  background: ${i("eq-graph-bg")};
  border-radius: ${i("slot-radius")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${i("eq-curve")};
  position: absolute;
  width: ${i("eq-node-size")};
  height: ${i("eq-node-size")};
  margin: calc(${i("eq-node-size")} / -2) 0 0 calc(${i("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${i("hairline")} ${i("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${i("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${i("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${i("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${i("target-min")};
  height: ${i("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${i("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${i("hairline")} * 2) ${i("eq-graph-bg")}, 0 0 0 calc(${i("hairline")} * 2 + ${i("focus-width")}) ${i("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${i("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${i("hairline")} ${i("control-gap")};
  border-radius: ${i("slot-radius")};
  background: ${i("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
  color: ${i("text")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  line-height: ${i("label-leading")};
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.nc-eq-tip[hidden] { display: none; }
/* Maximize (controls.js setMax): four corner ticks, out to maximize and in to restore, after the switch. */
.nc-fx-max, .nc-fx-close {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${i("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-close { font-size: ${i("title-size")}; padding-inline: ${i("control-gap")}; }
/* Remove (onRemove): a quiet × at the header's end, after maximize, sized like the header's other marks; text-sub,
   ink on hover (the strip's × turns danger: here Undo follows, so it stays calm). Its hit area reaches past the glyph
   to the right and a little up and down, never left over maximize. Not on a folded card (as a minimized strip),
   nor beside the wide panel's own ×. */
.nc-fx-remove {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: 0 ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-readout")};
  font-size: ${i("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${i("control-gap")} * -1);
  right: calc(${i("control-gap")} * -1);
  height: max(100%, calc(${i("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${i("text")}; }
.nc-fx-remove:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${i("control-gap")} * 2.5); height: calc(${i("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${i("control-gap")} * 1.1);
  height: calc(${i("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${i("motion-press")} ${i("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${i("hairline")} * 1.5); border-top-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${i("hairline")} * 1.5); border-top-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${i("hairline")} * 1.5); border-bottom-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${i("hairline")} * 1.5); border-bottom-width: calc(${i("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${i("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${i("module-pad")} * 2);
  row-gap: ${i("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${i("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${i("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${i("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${i("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${i("hairline")} ${i("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${i("module-pad")} * -1); }
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
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${i("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${i("module-gap")};
  row-gap: ${i("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${i("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${i("text-sub")};
}
.nc-group-toggle:hover { color: ${i("text")}; }
.nc-group-toggle:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${i("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${i("module-pad")}; min-width: 0; }
.nc-group-body[hidden] { display: none; }
/* A phone-only group (collapse: "phone"): flat on tablets and desktops (no header; group and body are display:
   contents, so its controls are the section's own flex items, as before it was grouped); a group on phones, below,
   where data-nc-open (not the hidden attribute, which group.js leaves off it) hides its body while closed. */
.nc-group[data-nc-collapse="phone"], .nc-group[data-nc-collapse="phone"] > .nc-group-body { display: contents; }
.nc-group[data-nc-collapse="phone"] > .nc-group-toggle { display: none; }
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
/* ON reads bold (Peter, 2026-11-01: "Hack OFF/ON. ON should be bold"). The word is always bold, shown or not, so the
   switch keeps one width whichever word shows. The fold column's on/off word follows. */
.nc-ui-switch [data-nc-on], .nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { font-weight: var(--nc-ui-font-weight-bold); }
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
.nc-note[data-nc-tone="danger"] { color: ${i("danger")}; }
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
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${i("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${i("target-min")}); right: calc(${i("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
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
/* A slider row's input reaches up over its label (the target-min hit band), so with a mouse most of the label was the
   slider's and its description never opened (found in LUCY). With a fine pointer a described label sits above the
   band; touch keeps the full band and has no hover. Nothing moves. */
@media (hover: hover) and (pointer: fine) {
  .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
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
  grid-template-columns: minmax(0, 1fr) auto auto auto;
  grid-template-areas: "strips fx meters master";
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
  ${ee("text-sub")}: ${i("module-sub-stack-1")};
  ${ee("divider")}: ${i("module-div-stack-1")};
  ${ee("slider-track")}: ${i("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${i("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  border-inline-end: ${i("hairline")} solid ${i("module-div-stack-1")};
  background: ${i("module-bg-stack-1")};
  ${ee("text-sub")}: ${i("module-sub-stack-1")};
  ${ee("divider")}: ${i("module-div-stack-1")};
  ${ee("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${ee("text-sub")}: ${i("module-sub-stack-1")};
  ${ee("divider")}: ${i("module-div-stack-1")};
  ${ee("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${ee("text-sub")}: inherit;
  ${ee("divider")}: inherit;
  ${ee("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${i("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${i("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${i("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${i("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${i("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${i("fx-card-width")}; }
  /* :has() counts its argument, so the folded card repeats it to win over the open cards' width. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-folded] {
    width: var(--nc-fx-fold-w);
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { display: none; }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-fold { display: flex; }
}
/* A maximized card in a console row takes three cards' width (the whole fx row), folded neighbours or not. */
@media (min-width: 769px) {
  /* Its neighbours (Peter, 2026-11-01: "don't wrap the other inserts below, minimize them horizontally") show as
     folded columns beside it for as long as it is maximized; a click on one restores the card (controls.js). Their
     own fold state is untouched. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]):has(> .nc-ui-fx-fold) {
    flex: none;
    width: var(--nc-fx-fold-w);
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]):has(> .nc-ui-fx-fold) > :not(.nc-ui-fx-fold, .nc-token-probe) { display: none; }
  /* !important: the fold button is [hidden] while its card is open, and .nc [hidden] is display: none !important. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx:not([data-nc-max]) > .nc-ui-fx-fold { display: flex !important; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"][data-nc-max="row"] {
    flex: none;
    width: calc(${i("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${i("fx-card-width")} * 3);
  }
}
/* An FX card never makes the console taller (Peter, 2026-11-01: "don't make the vertical version higher. Pin the
   graphic at the top and scroll the freq controls behind it"). From 1024 px, where the fx area shares the strips'
   row, the area takes the row's height (the strips, the master and the meters set it) and adds none of its own; a
   card taller than that keeps its header (and an EQ graph under it) pinned at its top while the rest of its controls
   scroll under them, with a soft shade at the foot while there is more below. Focus scrolls a control clear of the
   pinned part (--nc-fx-pin-h, controls.js). A maximized card's row is unchanged (it has its one-line dial row);
   tablets and phones, where the fx cards have their own row, are unchanged. */
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) {
    height: 0;
    min-height: 100%;
    grid-auto-rows: minmax(0, 1fr);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) {
    min-height: 0;
    /* The pinned header carries the top padding: a sticky box sticks inside the scroller's padding. */
    padding-top: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;
    scroll-padding-top: var(--nc-fx-pin-h, ${i("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${i("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${i("module-gap")} * 3), 100% ${i("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${i("module-pad")} * -1) calc(${i("module-gap")} * -1);
    padding: ${i("stack-card-pad-y")} ${i("module-pad")} calc(${i("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${i("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${i("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${i("module-pad")} 0 0 var(--nc-fx-card-bg);
  }
}
/* Pages (define-module.js, a section's pageSize; Peter, 2026-11-01: "don't push to a second row, create a second
   'page' ... Needs to be obvious though"). From 769 px a paged fx area shows one page of cards in its row, never a
   second row, under a slim bar: ‹ at its left end, "1 / 3" in the middle, › at its right end. The cards of the other
   pages stay laid out but unseen, at their own width and taking no room (a negative margin as wide as the card), so
   the row is as tall as the tallest card of any page and turning a page never changes the Mix's height. Phones (up
   to 768 px) stack every card as before: no bar. */
.nc-fx-pager { display: none; }
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding-top: ${i("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${i("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${i("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${i("fx-card-width")};
    margin-inline-end: calc(${i("fx-card-width")} * -1);
    visibility: hidden;
    pointer-events: none;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page][data-nc-folded] {
    width: var(--nc-fx-fold-w);
    margin-inline-end: calc(var(--nc-fx-fold-w) * -1);
    padding-inline: 0;
  }
  /* A maximized card takes its page (its page-mates as fold columns beside it): the other pages stay out of it. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:has(> .nc-ui-fx[data-nc-max="row"]) > .nc-ui-fx[data-nc-off-page] { display: none; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-fx-pager {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${i("module-gap")};
    height: ${i("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${i("target-min")};
  height: ${i("target-min")};
  margin: 0;
  padding: 0;
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${i("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${i("divider")}; border-color: ${i("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${i("control-gap")} * 2.5);
  height: calc(${i("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${i("hairline")} * 2) calc(${i("hairline")} * 2) 0 0;
  transform: translateX(calc(${i("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${i("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${i("text")};
  white-space: nowrap;
}
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up.
   Every row is a named area and every child is placed by name (never by auto-placement), so a row taken out (the
   sends, display: none) can't shift the rows after it, in any engine. Three columns: a control-gap gutter each side
   of the content; only M and S span the gutters, so on touch two target-min boxes fit side by side inside the strip
   (they overflowed it, and Safari drew S under the next strip; Peter, 2026-11-01). No negative margins. */
.nc-strip {
  /* The M/S row: the slider pitch; target-min on touch (the buttons' full boxes, so they never reach the pan row). */
  --nc-strip-ms-row: ${i("slider-pitch")};
  --nc-strip-knob-row: calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")});
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  grid-template-columns: ${i("control-gap")} minmax(0, 1fr) ${i("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
}
.nc-strip > .nc-strip-hd { grid-area: hd; }
.nc-strip > .nc-strip-hacks { grid-area: hacks; }
.nc-strip > .nc-strip-ms { grid-area: ms; }
.nc-strip > .nc-strip-sends { grid-area: sends; }
.nc-strip > .nc-strip-pan { grid-area: pan; }
.nc-strip > .nc-strip-body { grid-area: body; }
.nc-strip > .nc-strip-db, .nc-strip > .nc-strip-db-input { grid-area: db; }
@media (pointer: coarse) {
  .nc-strip { --nc-strip-ms-row: ${i("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
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
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${i("control-gap")}; left: ${i("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${i("strip-fold-width")};
  align-content: start;
  grid-template-columns: 0 minmax(0, 1fr) 0;
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". body ." ". db .";
}
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
.nc-strip[data-nc-folded] > .nc-strip-ms {
  grid-auto-flow: row;
  grid-template-rows: none;
  grid-auto-columns: ${i("slider-pitch")};
  grid-auto-rows: ${i("slider-pitch")};
  gap: ${i("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${i("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${i("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${i("control-gap")}; }
.nc-strip-fold { gap: ${i("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${i("label-size")}; font-weight: ${i("label-weight")}; letter-spacing: ${i("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${i("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${i("fader-cap-height")};
  height: ${i("control-gap")};
  background: linear-gradient(${i("divider")}, ${i("divider")}) center / 100% ${i("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${i("control-gap")}));
  width: ${i("control-gap")};
  height: ${i("control-gap")};
  border-radius: 50%;
  background: ${i("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${i("fader-cap-height")};
  height: ${i("control-gap")};
  background: var(--nc-strip-cap, ${i("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${i("slider-pitch")};
  grid-template-rows: ${i("slider-pitch")};
  column-gap: ${i("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${i("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${ee("divider")}: ${i("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${i("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${i("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${i("hairline")} solid color-mix(in oklab, ${i("text-sub")} 50%, ${i("strip-divider")});
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
.nc-hacks:hover { color: ${i("text")}; border-color: ${i("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${i("fader-cap-master")};
  border-color: ${i("fader-cap-master")};
  color: ${i("surface-page")};
}
.nc-hacks:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${i("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
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
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${i("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-track")} calc(var(--knob-from, 135) * 1deg), ${i("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${i("label-size")};
  line-height: ${i("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
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
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${i("fader-cap")}); }
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
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${i("hairline")}; height: ${i("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${i("fx-level-bar")}; overflow: hidden; background: ${i("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${i("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${i("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${i("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${i("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${i("fx-level-fold-length")}; min-height: 0; }
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
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas: "strips meters master" "fx fx fx";
  }
}
@media (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-auto-flow: row; grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
/* Tablets (769-1023 px): the fx row is full width under the strips; with a card folded, the open ones share the rest. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx:not([data-nc-folded]) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
  }
  /* Paged: a third each, so a part-filled last page keeps the columns; with a card folded on the page the open
     ones share the rest. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged][data-nc-paged] > .nc-ui-fx:not([data-nc-folded], [data-nc-off-page]) {
    flex: 0 0 calc(100% / 3);
    width: auto;
    min-width: 0;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged][data-nc-paged]:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page])) > .nc-ui-fx:not([data-nc-folded], [data-nc-off-page]) {
    flex: 1 1 0;
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
    border-top: ${i("hairline")} solid ${i("module-div-stack-1")};
  }
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
/* Phones in landscape (Peter, 2026-11-01: "these sections can be side by side in landscape mode"): a short, wide
   screen puts the modules side by side, as many columns as fit at two slim columns wide (two or three on a phone),
   each module at its own height, in reading order; the lead (a step grid) takes two columns and two rows. Tablets and
   desktops are unchanged. An instrument inside the Studio has a frame as tall as its page, so its own media never
   reads as landscape: the Studio sets html[data-nc-landscape] on the frame when the Studio's screen is (LANDSCAPE_PHONE). */
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${to("")}
}
@media (max-width: 1023px) {
${to("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Oa("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Oa("")}
}
@media (max-width: 1023px) {
${Oa("html[data-nc-landscape] ")}
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}var Ia=null,Lp="nc-ui-fallback";function Ws(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Ia&&Ia.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Lp} {
${Tp()}
}
`,e.head.append(t),Ia=t}var Jt=null,Cp=0,Np=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,Ys=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Np,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Ys(document);function qe(e){return Ks(e).then(t=>!!t.ok)}function Ks({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:r=!1,root:o,returnFocus:s,signal:l},u){if(Jt||l?.aborted)return Promise.resolve({});let d=o?.ownerDocument??document,c=Ys(d),p=o??d.body,h=d.defaultView??globalThis,m=`nc-ui-confirm-${++Cp}`,b=(H,pe,fe)=>{let ue=d.createElement(H);return ue.className=`nc-ui-confirm${pe}`,fe!=null&&(ue.textContent=fe),ue},y=b("div","-layer");y.dataset.state="enter";let f=b("div","");f.setAttribute("role","alertdialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",`${m}-t`),f.setAttribute("aria-describedby",`${m}-b`);let g=b("h2","-title",e);g.id=`${m}-t`;let w=b("p","-body",t);w.id=`${m}-b`;let E=b("div","-actions"),C=(H,pe)=>{let fe=b("button","-btn",H);return fe.type="button",fe.dataset.ncConfirm=pe,fe.addEventListener("click",()=>Se(pe==="ok")),fe},S=C(a,"cancel"),v=C(n,"ok");r&&(v.dataset.danger="true"),E.append(S,v);let[x,A]=u?.(b,v)??[];f.append(g,w,...x?[x]:[],E);let k=[A,S,v].filter(Boolean);y.append(f);let T={layer:y};Jt=T;let N=s??d.activeElement,q=[];for(let H of p.children)H.hasAttribute("inert")||(H.setAttribute("inert",""),q.push(H));let _=()=>{if(Jt!==T)return;p.append(y),(A??S).focus({preventScroll:!0});let H=h.requestAnimationFrame?.bind(h)??(pe=>setTimeout(pe,16));H(()=>H(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};c?c.then(_):_();let U=!1;y.addEventListener("pointerdown",H=>{U=H.target===y}),y.addEventListener("click",H=>{H.target===y&&U&&Se(!1),U=!1});let ce=H=>{if(H.stopImmediatePropagation(),H.key==="Escape")H.preventDefault(),Se(!1);else if(H.key==="Tab"){H.preventDefault();let pe=k.filter(ue=>!ue.disabled),fe=pe.length;pe[(pe.indexOf(d.activeElement)+(H.shiftKey?fe-1:1))%fe].focus()}else H.key==="Enter"&&(H.preventDefault(),d.activeElement===S?Se(!1):v.disabled||Se(!0))},de=H=>H.stopImmediatePropagation();h.addEventListener("keydown",ce,!0),h.addEventListener("keyup",de,!0);let J=()=>Se(!1);l?.addEventListener("abort",J);let Q,B=new Promise(H=>{Q=H});function Se(H){if(Jt!==T)return;Jt=null,h.removeEventListener("keydown",ce,!0),h.removeEventListener("keyup",de,!0),l?.removeEventListener("abort",J);for(let Ne of q)Ne.removeAttribute("inert");y.dataset.state="closing",N?.isConnected&&typeof N.focus=="function"&&N.focus({preventScroll:!0});let pe=h.getComputedStyle?.(y),fe=Math.max(0,...String(pe?.transitionDuration??"").split(",").map(Ne=>Number.parseFloat(Ne)*(Ne.trim().endsWith("ms")?1:1e3)||0)),ue=()=>y.remove();y.addEventListener("transitionend",Ne=>Ne.target===y&&ue()),setTimeout(ue,fe+50),Q({ok:H,value:A?.value.trim()})}return B}function Fp(e){let t=e.field??{};return Ks(e,(n,a)=>{let r=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),r.append(n("span","-label",t.label??""),o),[r,o]}).then(n=>n.ok?n.value:null)}function Xs(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(r,o),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var Js=new WeakMap,no=.25;function zp(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(a,r);let o=0,s=e.step??.005,l=e.onChange,u=e.onReset,d=f=>Math.min(1,Math.max(0,f)),c=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=f=>{let g=d(f);g!==o&&(o=g,c(),l?.(g))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();f.target!==r&&g.height>0&&p(1-(f.clientY-g.top)/g.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let g=n.getBoundingClientRect().height||1,w=(h-f.clientY)/g*(f.shiftKey?no:1);h=f.clientY,p(o+w)});let b=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",f=>{f.preventDefault(),u?.()}),n.addEventListener("keydown",f=>{let g=f.shiftKey?s*no:s,w={ArrowUp:o+g,ArrowRight:o+g,ArrowDown:o-g,ArrowLeft:o-g,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};f.key in w&&(f.preventDefault(),p(w[f.key]))});let y={el:n,get value(){return o},get dragging(){return m},set(f){m||(o=d(Number(f)||0),c())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(u=f.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),Js.set(n,y),y}function Pp(e){return Js.get(e)}var Qs=new WeakMap,Rp=.2,Dp=1.5,Op=.5;function Ip(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function ao(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Ip(a.getComputedStyle(e).getPropertyValue(ee(t)),n)}function qp(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let f=t.createElement("span");f.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let w=t.createElement("span");w.className="nc-meter-rms";let E=t.createElement("span");E.className="nc-meter-hold",f.append(g,w,E),o.append(f),s.push({peak:g,rms:w,hold:E,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(r,o);let l=e.label,u=e.onClear,d=!1,c=-1,p=-1,h=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},m=(y,f,g,w)=>{let E=Math.round(w*1e3)/1e3;g[f]!==E&&(g[f]=E,y.style.transform=f==="hold"?`translateY(${Math.round((1-E)*1e3)/10}%)`:`scaleY(${E})`)};r.addEventListener("click",()=>{b.clear(),u?.()});let b={el:a,get clipped(){return d},update(y,f){c<0&&(c=ao(a,"motion-meter-fall",Rp)),p<0&&(p=ao(a,"motion-meter-hold",Dp));let g=Math.max(0,Math.min(.25,Number(f)||0)),w=c>0?Math.exp(-g/c):0;s.forEach((E,C)=>{let S=y[C]??y[0]??{peak:0,rms:0},v=Math.min(1,Math.max(0,Number(S.peak)||0)),x=Math.min(v,Math.max(0,Number(S.rms)||0));S.over&&b.clip(),E.level.peak=v>=E.level.peak?v:v+(E.level.peak-v)*w,E.level.rms=x>=E.level.rms?x:x+(E.level.rms-x)*w,E.holdAge+=g,v>=E.holdAt?(E.holdAt=v,E.holdAge=0):E.holdAge>p&&(E.holdAt=Math.max(v,E.holdAt-Op*g)),m(E.peak,"peak",E.shown,E.level.peak),m(E.rms,"rms",E.shown,E.level.rms),m(E.hold,"hold",E.shown,E.holdAt),E.hold.dataset.off=E.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,h()},configure(y){y.onClear&&(u=y.onClear)}};return h(),b.reset(),Qs.set(a,b),b}function Zs(e){return e?Qs.get(e):void 0}var _p=3,Bp=new Set(["freq","q","rate","time","log"]);function jr(e,t,n){return!e||!Bp.has(e)||!(n>t)?"linear":t>0?"log":"power"}function xa(e,t,n){return jr(e,t,n)!=="linear"}function Hr(e,t,n,a){let r=Number(a);if(!(n>t)||!Number.isFinite(r))return 0;let o=Math.min(n,Math.max(t,r)),s=jr(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function el(e,t,n,a){let r=Math.min(1,Math.max(0,Number(a)||0)),o=jr(e,t,n);return o==="log"?t*(n/t)**r:t+(n-t)*(o==="power"?r**_p:r)}function tl(e,t,n,a){let r=Math.min(n,Math.max(t,e));if(a>0){r=t+Math.round((r-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));r=Number(r.toFixed(o)),r=Math.min(n,Math.max(t,r))}return r}function Ur(e,t,n,a){return Math.round(Hr(e,t,n,a)*1e3)}function cr(e,t,n,a,r){return tl(el(e,t,n,Number(a)/1e3),t,n,r)}function jp(e,t,n=!1){let a=Number(e)||0,r=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+r:t==="ArrowLeft"||t==="ArrowDown"?o=a-r:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function nl(e,t,n,a,r,o=!1,s){let l=Ur(e,t,n,a),u=jp(l,r,o);if(u===null)return null;let d=cr(e,t,n,u,s),c=Math.sign(u-l),p=tl(Number(a),t,n,s);for(;c!==0&&d===p&&u>0&&u<1e3;)u+=c,d=cr(e,t,n,u,s);return d}function ro(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function io(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Hp(e,t,n,a=n/6){let r=e.some(c=>c===null),o=Math.max(0,n-(r?a:0)),s=e.reduce((c,p,h)=>p===null?c:c+io(t[h]),0),l=s>0?o/s:0,u=e.map(c=>c===null?0:Math.min(o,io(c)*l));if(r){let c=u.reduce((h,m)=>h+m,0),p=e.indexOf(null);u[p]=Math.max(a,n-c)}let d=[0];for(let c of u)d.push(Math.round((d[d.length-1]+c)*100)/100);return r&&(d[d.length-1]=n),d}function Up(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function We(e){return Math.max(0,Math.min(1,e))}function al(e,t){let{ctx:n,w:a,h:r}=Up(e);if(!n)return;n.clearRect(0,0,a,r);let o=Ap(e);if(t.paint==="swatch"){let u=le(e,"accent"),d=le(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=d,n.fillStyle=u,n.fillRect(0,0,a/2,r),n.fillStyle=d,n.fillRect(a/2,0,a/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){Wp(n,a,r,t,e,o);return}if(t.paint==="filter"){let u=t.mode??"lp",d=le(e,Vs(u)),c=le(e,"divider"),p=We(t.cutoff??.5),h=.08+(1-We(t.resonance??.2))*.22;n.strokeStyle=c,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(a,r*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let b=m/Math.max(1,a),y=0;u==="lp"?y=b<p?1:Math.max(0,1-(b-p)/h):u==="hp"?y=b>p?1:Math.max(0,1-(p-b)/h):y=Math.max(0,1-Math.abs(b-p)/h);let f=r*.78-y*r*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=le(e,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=le(e,"accent");let u=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[c,p,h]=Hp([u,d],t.max??[1,4],a),m=2,b=r-1;n.beginPath(),n.moveTo(c,b),n.lineTo(p,m);let y=Math.max(1,Math.ceil(h-p));for(let f=1;f<=y;f++){let g=f/y;n.lineTo(p+(h-p)*g,b-(b-m)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(h,b),n.lineTo(a,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[d,c]=Array.isArray(t.region)?t.region:[0,1],p=le(e,"accent"),h=le(e,"text-sub"),m=r/2;n.fillStyle=le(e,"accent-soft"),n.fillRect(We(d)*a,0,(We(c)-We(d))*a,r),n.strokeStyle=le(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let b=Math.floor(u.length/2);for(let y=0;y<b;y++){let f=(y+.5)/b*a,g=Math.max(-1,Math.min(1,u[y*2]??0)),w=Math.max(-1,Math.min(1,u[y*2+1]??0)),E=(y+.5)/b;n.strokeStyle=E>=d&&E<=c?p:h,n.beginPath(),n.moveTo(f,m-w*(m-1)),n.lineTo(f,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[d,c,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(We(y)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=le(e,"text"),n.fillRect(Math.round(We(t.position)*(a-1)),0,1,r)),b||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=We(t.level??0);n.fillStyle=le(e,"divider"),n.fillRect(0,r*.4,a,r*.2),n.fillStyle=le(e,"accent"),n.fillRect(0,r*.4,a*u,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=le(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,a,r*.1),n.fillStyle=le(e,"rhythm.playhead"),n.fillRect(l/s*a,r*.3,Math.max(1,a/s),r*.4),e.dataset.ncAccent=le(e,"accent")}var dn=20,dr=2e4,qa=24,oo=-60;function Vp(e,t,n,a,r=48e3){let o=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(o),l=Math.sin(o)/(2*n),u,d,c;e==="hp"?[u,d,c]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,d,c]=[l,0,-l]:[u,d,c]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,m=1-l,b=2*Math.PI*a/r,y=(E,C,S)=>E+C*Math.cos(b)+S*Math.cos(2*b),f=(E,C)=>-(E*Math.sin(b)+C*Math.sin(2*b)),g=Math.hypot(y(u,d,c),f(d,c)),w=Math.hypot(y(p,h,m),f(h,m));return w>0?g/w:0}function Gp(e,t){return Math.log(Math.max(dn,Math.min(dr,e))/dn)/Math.log(dr/dn)*t}function so(e,t,n){let a=Math.max(oo,Math.min(qa,e));return t+(qa-a)/(qa-oo)*(n-t)}function Wp(e,t,n,a,r,o){let s=a.mode??"lp",l=le(r,Vs(s)),u=le(r,"divider"),d=le(r,"text-sub"),c=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-c-3),m=a.q??Math.SQRT1_2,b=Math.round(so(0,p,h))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let f=dn*(dr/dn)**(y/Math.max(1,t)),g=a.open?1:Vp(s,a.hz,m,f,a.sampleRate),w=so(20*Math.log10(Math.max(1e-5,g)),p,h);y===0?e.moveTo(y,w):e.lineTo(y,w)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(Gp(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(a.hz))}function Me(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let r=n.defaultView.getComputedStyle(a).color;return a.remove(),r}function Yp(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var ht=20,En=2e4,Vr=Math.log(En/ht),ur=32,Kp=250,Xp=-100,Jp=1200,Qp=4.5,lo=-6,dt=-96,Zp=48,co=[100,1e3,1e4],eh=[6,12];function Ct(e,t){return Math.log(Math.max(ht,Math.min(En,e))/ht)/Vr*t}function jn(e,t){return ht*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Vr)}function tt(e,t,n,a){let r=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*r}function pr(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var rl=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function th(e,t,n,a){let r=n?3:1,o=u=>({db:Math.max(-a,Math.min(a,e.db+u*r))}),s=u=>({hz:Math.max(e.minHz??ht,Math.min(e.maxHz??En,e.hz*2**(u*r/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*r)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Gr(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function nh(e,t,n,a,r,o,s,l,u){let d=u?.25:1,c={},p=Math.max(1,o/2-l);if(c.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/Gr(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,r)*Vr);c.hz=Math.max(e.minHz??ht,Math.min(e.maxHz??En,h))}return c}function ah(e,t,n,a,r){let o=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+a*2,s-o),u=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var he=new WeakMap;function rh(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(r,o);for(let u of e.bands)a.append(ih(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!dl(n)||u.button>0)return;let d=cl(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),he.set(n,{control:e,cache:null,spec:null,active:null}),ol(n,e),n}function il(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function ih(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let c=o();c&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:c.hz,db:c.db}},a.dataset.drag="true",Ye(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let c=r(),p=o(),h=he.get(e);if(!c||!p||!h?.box)return;let{w:m,h:b,pad:y}=h.box;c.onBand(p.id,nh(p,s.start,d.clientX-s.x,d.clientY-s.y,m,b,c.range??18,y,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ye(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let c=r(),p=o();if(!c||!p)return;let h=th(p,d.key,d.shiftKey,c.range??18);h&&(d.preventDefault(),h==="reset"?c.onReset?.(p.id):c.onBand(p.id,h),Ye(e,p.id))});let u=null;return a.addEventListener("wheel",d=>{let c=r(),p=o();if(!c||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-m/240))),u.t=h,c.onBand(p.id,{q:u.q}),Ye(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ye(e,t.id)),a.addEventListener("focus",()=>Ye(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ye(e,null)}),a.addEventListener("blur",()=>{s||Ye(e,null)}),a}function Ye(e,t){let n=he.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Ot(e):Wr(e)}function Wr(e){let t=he.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(a&&b.dataset.band===a.id?b.dataset.active="true":delete b.dataset.active);if(!a||!t.box){n.hidden=!0;return}let r=[a.label,rl(a.db)];a.kind==="peak"?r.push(pr(a.hz),`Q ${a.q.toFixed(1)}`):r.push(`${a.kind==="lowshelf"?"below":"above"} ${pr(a.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(oh(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,u=Ct(a.hz,o),d=tt(a.db*Gr(a),s,t.control.range??18,l),c=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-c,u-c/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function oh(e,t){return e.bands.indexOf(t)%3+1}function ol(e,t){let n=he.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Yr(e);let a=t.range??18;t.bands.forEach((r,o)=>{let s=il(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${rl(r.db)}, ${pr(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Ot(e),ph(e)}function sl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==r||e.height!==o)&&(e.width=r,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function ll(e){return{curve:Me(e,"eq-curve"),fill:Me(e,"eq-fill"),quiet:Me(e,"text-sub"),grid:Me(e,"eq-grid"),zero:Me(e,"divider"),label:Me(e,"text-sub"),spectrum:Me(e,"eq-spectrum"),bands:[Me(e,"eq-band-1"),Me(e,"eq-band-2"),Me(e,"eq-band-3")]}}function sh(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Ot(e){he.has(e)&&Yr(e);let t=he.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:r,w:o,h:s}=sl(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:o,h:s,pad:l},t.colours=ll(e);let d=t.colours,c=sh(a,o);if(!t.cache||t.cache.key!==c){let C=Math.max(64,Math.ceil(o)+1),S=new Float64Array(C);for(let x=0;x<C;x++)S[x]=jn(x/(C-1)*o,o);let v=null;try{v=typeof a.response=="function"?a.response(S):null}catch{v=null}t.cache={key:c,freqs:S,total:v?.total??new Float64Array(C),bands:v?.bands??[]}}r.clearRect(0,0,o,s);let p=Yp(e),h=a.on!==!1;lh(r,o,s,u,l,d,p);let{freqs:m,total:b,bands:y}=t.cache,f=Array.from(m,C=>Ct(C,o)),g=tt(0,s,u,l);y.forEach((C,S)=>{if(!C||!C.some(A=>Math.abs(A)>.05))return;let v=h?d.bands[S%3]:d.quiet,x=Array.from(C,A=>tt(A,s,u,l));r.save(),t.active&&a.bands[S]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=v,uo(r,f,x,g)),r.globalAlpha=h?.75:.4,r.strokeStyle=v,r.lineWidth=.75,_a(r,f,x),r.restore()});let w=Array.from(b,C=>tt(C,s,u,l)),E=h?d.curve:d.quiet;r.save(),r.fillStyle=h?d.fill:d.quiet,r.globalAlpha=h?.2:.08,uo(r,f,w,g),r.restore(),r.save(),r.strokeStyle=h?d.fill:E,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,_a(r,f,w)),r.globalAlpha=1,r.strokeStyle=E,r.lineWidth=1.25,_a(r,f,w),r.restore(),ch(e),Wr(e)}function lh(e,t,n,a,r,o,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let d=1;d<=9;d++){let c=u*d;if(c<ht||c>En)continue;let p=Math.round(Ct(c,t))+.5;e.globalAlpha=co.includes(c)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of eh)if(!(u>a))for(let d of[1,-1]){let c=Math.round(tt(u*d,n,a,r))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,c),e.lineTo(t,c),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(tt(0,n,a,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of co){let d=u>=1e3?`${u/1e3}k`:String(u),c=e.measureText(d).width,p=Ct(u,t)+3;e.fillText(d,p+c+2>t?Ct(u,t)-c-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let d=tt(u,n,a,r);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(d)-1)}e.restore()}function aa(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let r=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],r,o)}e.lineTo(t[t.length-1],n[n.length-1])}function _a(e,t,n){e.beginPath(),aa(e,t,n),e.stroke()}function uo(e,t,n,a){e.beginPath(),aa(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function cl(e){return e.closest("[data-nc-maxable]")}function dl(e){let t=cl(e);return!!t&&!t.hasAttribute("data-nc-max")}function Yr(e){let t=dl(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=he.get(e);n?.active&&(n.active=null,Wr(e))}return t}function ch(e){Yr(e);let t=he.get(e);if(!t?.box)return;let{w:n,h:a,pad:r}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=il(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Ct(s.hz,n).toFixed(1)}px`,l.style.top=`${tt(s.db*Gr(s),a,o,r).toFixed(1)}px`)}}function dh(e,t,n,a){let r=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let d=(u-.5)/(e-1)*t,c=(u+.5)/(e-1)*t,p=jn(d,t),h=jn(c,t),m=jn(u/(e-1)*t,t);o[u]=Math.min(n-1,p/r),s[u]=Math.min(n-1,h/r),l[u]=Qp*Math.log2(m/1e3)}return{lo:o,hi:s,tilt:l}}function uh(e,t,n){let a=Math.floor(t),r=Math.ceil(n);if(r-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let o=-1/0;for(let s=a;s<=r&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function ph(e){let t=he.get(e);if(t){if(!t.control.spectrum){pl(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let r=he.get(e)?.spec;r&&(r.visible=a.some(o=>o.isIntersecting),hr(e))}),t.spec.io.observe(e)):t.spec.visible=!0}hr(e)}}function hr(e){let t=he.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){ul(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=fr(e),n.onVis||(n.onVis=()=>hr(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&mr(e,!1)}function fr(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function mr(e,t){let n=he.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Ba(e,fr(e))),Kp):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(r=>(n.raf=0,Ba(e,r))):n.timer=a.setTimeout(()=>(n.timer=0,Ba(e,fr(e))),ur))}function ul(e){let t=he.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function pl(e){let t=he.get(e)?.spec;if(!t)return;ul(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=he.get(e);n&&(n.spec=null)}function Ba(e,t){let n=he.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){pl(e);return}if(!a.analyser)return;if(t-a.last<ur-4&&!a.idle){mr(e,!1);return}let r=a.last?Math.min(.25,(t-a.last)/1e3):ur/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=sl(o);if(!s)return;let d=Math.max(16,Math.round(l/2)),c=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==c)&&(a.map={cols:d,w:l,sr:c,...dh(d,l,a.buf.length,c)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Zp*r,{lo:m,hi:b,tilt:y}=a.map;for(let g=0;g<d;g++){let w=uh(a.buf,m[g],b[g]);w>p&&(p=w);let E=w+y[g],C=a.disp[g]-h;a.disp[g]=E>C?E:C}p>Xp&&(a.loud=t);let f=t-a.loud>Jp;s.clearRect(0,0,l,u),(!f||a.disp.some(g=>g>dt))&&hh(s,l,u,a.disp,n.colours??ll(e)),a.idle=f&&!a.disp.some(g=>g>dt),mr(e,a.idle)}function hh(e,t,n,a,r){let o=a.length,s=new Array(o),l=new Array(o),u=d=>{let c=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(c)?c:dt};for(let d=0;d<o;d++){let c=u(d)*.36+(u(d-1)+u(d+1))*.22+(u(d-2)+u(d+2))*.1,p=(Math.max(dt,Math.min(lo,Number.isFinite(c)?c:dt))-dt)/(lo-dt);s[d]=d/(o-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),aa(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),aa(e,s,l),e.stroke(),e.restore()}var fh=.8912509381337456,gr=32,mh=250,gh=1200,bh=.2,hl=1.5;function yh(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function wh(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",a.append(r),t.append(a)}return t}var ra=new WeakMap,po=new WeakMap;function ho(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let r=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(r);return Number.isFinite(o)?r.endsWith("ms")?o/1e3:o:n}function vh(e){let t=po.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(r=>{for(let o of r){let s=ra.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),un(s))}At(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)un(r);At(t)}),po.set(e,t),t}var fl=e=>e.els.some(t=>t.isConnected);function xh(e){if(!e.loop.io)return fl(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function un(e){let t=!e.dead&&!!e.source&&xh(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Kr(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),wr(e))}function Kr(e){return e.doc.defaultView?.performance?.now()??Date.now()}function At(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){ml(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Kr(e)),!e.raf&&!e.timer&&br(e,!1)}function br(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>fo(e,Kr(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),mh):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,fo(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,a()),gr)}function ml(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function fo(e,t){if(t-e.last<gr-4&&!e.idle&&e.last){br(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):gr/1e3;e.last=t,e.frames++;let a=!1,r=!1;for(let o of e.recs){if(!fl(o)){(o.placed||e.frames-o.born>90)&&gl(o);continue}o.placed=!0,o.open&&(r=!0,$h(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!r){ml(e);return}e.idle=t-e.loud>gh&&!a,br(e,e.idle)}function $h(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=ho(h,"motion-meter-fall",bh),e.hold=ho(h,"motion-meter-hold",hl)}let a=null;try{a=e.source.read()}catch{a=null}let r=typeof a=="number",o=r?a:Number(a?.in)||0,s=!r&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let d=e.fall>0?Math.exp(-t/e.fall):0,c=[o,l],p=!1;for(let h=0;h<2;h++){let m=yh(c[h]);m>0&&(p=!0),e.disp[h]=m>=e.disp[h]?m:m+(e.disp[h]-m)*d,e.disp[h]<.001&&(e.disp[h]=0),c[h]>=fh&&(e.clipAt[h]=n);let b=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;yr(e,h,e.disp[h],b)}return p}function yr(e,t,n,a){let r=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===o)){e.shown[t]=r,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=o)}}}function wr(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,yr(e,0,0,!1),yr(e,1,0,!1)}function gl(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),ra.get(t)===e&&ra.delete(t)}function kh(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,r=vh(a),o={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:hl,rows:""};for(let s of n)ra.set(s,o),r.io?.observe(s);if(r.recs.add(o),wr(o),!r.io){let s=a.defaultView,l=()=>{un(o),At(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){un(o),At(r);return}o.open&&(o.open=!1,o.source?.close?.(),wr(o)),o.source=l,un(o),At(r)}},destroy(){o.dead||gl(o),At(r)}}}var bl={slop:8,longPressMs:500,pitchPx:16},Eh=class{constructor(e,t,n=bl){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let r=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Sh(e,t,n,a=bl){let r=!1,o=0,s=(d,c)=>{let p=e.ownerDocument.elementFromPoint?.(d,c),h=[...e.querySelectorAll(t)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let b=-1,y=Number.POSITIVE_INFINITY;return h.forEach((f,g)=>{if(f.hidden)return;let w=f.getBoundingClientRect();if(c<w.top||c>w.bottom)return;let E=Math.abs(d-(w.left+w.width/2));E<y&&E<=w.width&&(b=g,y=E)}),b},l=new Eh(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},a),u=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",d=>{u(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{u(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var yl="netcomposer.groups.v1";function Xr(){try{return globalThis.localStorage??null}catch{return null}}function wl(e=Xr(),t=yl){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,o]of Object.entries(n))typeof o=="boolean"&&a.set(r,o);return a}catch{return new Map}}function Ah(e,t,n,a=yl){let r=wl(e,a);r.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(r)))}catch{}}function Mh(e,t=Xr()){return wl(t).get(e.id)??e.open===!0}function Th(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",u.id);for(let d of e.controls)u.append(n(d,t));return r.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Ah(Xr(),e.id,d),vr(a,d);let c=t(a);c?.type==="group"&&c.onToggle?.(d)}),a.append(r,u),vl(a,e),vr(a,Mh(e)),xl(a,e),a}function vr(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function vl(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function xl(e,t){vl(e,t)&&vr(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";a&&a.textContent!==r&&(a.textContent=r)}var Pn="application/x-nc-pad",mo="http://www.w3.org/2000/svg";function Lh(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],r=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),u=0,d=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let c=n===1?50:o/(n-1)*100;a.push(`${c.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${c.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${r.reverse().join("L")}Z`}function Ch(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,o)=>a.append(Nh(n,o,t))),n.append(a),n.addEventListener("keydown",r=>{r.key==="Escape"&&Hn(n)}),kl(n,e),n}function Nh(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(mo,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let d=document.createElementNS(mo,"path");return u.append(d),a.append(r,o,s,l,u),zh(e,a,t,n),o.addEventListener("dblclick",()=>{let c=n(e);c?.type==="padGrid"&&c.onRename&&a.dataset.empty!=="true"&&$l(e,a,t,n)}),a.addEventListener("dragstart",c=>{if(a.dataset.empty==="true"||!c.dataTransfer){c.preventDefault();return}c.dataTransfer.setData(Pn,String(t)),c.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",c=>{let p=c.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Pn)||(c.preventDefault(),c.stopPropagation(),c.dataTransfer&&(c.dataTransfer.dropEffect=p.includes(Pn)&&!c.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",c=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=c.dataTransfer?.getData(Pn);if(h!==void 0&&h!==""){c.preventDefault(),c.stopPropagation();let b=Number(h);b!==t&&p.onMove?.(b,t,c.altKey);return}let m=c.dataTransfer?.files?.[0];m&&(c.preventDefault(),c.stopPropagation(),p.onFile?.(t,m))}),a}function Fh(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function zh(e,t,n,a){let r=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,s=d.clientX,l=d.clientY,u();let c=a(e);c?.type==="padGrid"&&(c.onDown?.(n),!(c.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,o=go(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&u()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,u);t.addEventListener("contextmenu",d=>{d.preventDefault(),u(),o=go(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Fh(e,n,a)})}function go(e,t,n,a){let r=a(e);if(r?.type!=="padGrid"||!r.menu)return!1;let o=r.menu(n);if(!o.length)return!1;Hn(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),Hn(e)}),s.addEventListener("click",c=>c.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let c of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=c.id,p.textContent=c.label,p.addEventListener("click",()=>{Hn(e);let h=a(e);h?.type==="padGrid"&&(c.id==="rename"&&h.onRename?$l(e,t,n,a):h.onMenu?.(n,c.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-u.left}px`,l.style.top=`${d.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function $l(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=a(e);if(r?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=r.nameMax??24,o.value=r.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,d=c=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);c&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"?d(!0):c.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let c of["pointerdown","click","dblclick"])o.addEventListener(c,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function Hn(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function kl(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,r)=>{let o=n[r];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Lh(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let c=t.selected===r;c?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",c?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${c?", selected":""}`)})}function ge(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function $a(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(a,r),n}function bo(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function yn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Ph=450,yo=8;function _e(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Rh(e){let t=Sp(e,"target-min");return t>0?t:44}function Dh(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Rh(e),a=n/2,r=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=r[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,d=l.top+l.height/2,c=u-a,p=u+a,h=d-a,m=d+a;for(let b=0;b<t.length;b++){if(o===b)continue;let y=r[b];if(!y||y.width===0)continue;let f=y.left+y.width/2,g=y.top+y.height/2;Math.abs(g-d)<a*2&&(f>u?p=Math.min(p,(u+f)/2):f<u&&(c=Math.max(c,(u+f)/2))),Math.abs(f-u)<a*2&&(g>d?m=Math.min(m,(d+g)/2):g<d&&(h=Math.max(h,(d+g)/2)))}c=Math.min(c,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${c-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-c)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function El(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function wo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function It(e,t){switch(e.type){case"slider":return Oh(e,t);case"select":return qh(e,t);case"toggle":return _h(e,t);case"button":return Bh(e,t);case"readout":return jh(e);case"label":return Gh(e);case"note":return vo(e);case"knob":return Kh(e,t);case"choice":return Xh(e,t);case"slotRow":return Jh(e,t);case"stepGrid":return tf(e,t);case"canvas":return of(e);case"fx":return ff(e,t);case"eqGraph":return rh(e,t);case"group":return Th(e,t,It);case"strip":return sf(e,t);case"stripAdd":return df(e,t);case"padGrid":return Ch(e,t);case"moves":return Uh(e,t);default:return vo({id:"unknown",text:""})}}function Te(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ml(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Sl(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??yn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),bo(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")bo(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ft(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Wh(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??yn(t.value))}else if(t.type==="choice")Tl(e,t);else if(t.type==="slotRow")Cl(e,t);else if(t.type==="stepGrid")$r(e,t);else if(t.type==="padGrid")kl(e,t);else if(t.type==="moves")Al(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&al(n,t)}else if(t.type==="eqGraph")ol(e,t);else if(t.type==="strip"){Pl(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Te(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Fl(e,t);else if(t.type==="group"){xl(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Te(a,n)}}else if(t.type==="fx"){Bl(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Nt(n.id)}"]`);a instanceof Element&&Te(a,n)}}}}function Oh(e,t){let n=$a(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let r=xa(e.taper,e.min,e.max);a.min=String(r?0:e.min),a.max=String(r?1e3:e.max),a.step=String(r?1:e.step),r&&(a.dataset.ncTaper=e.taper),a.value=String(Sl(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>r?cr(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),r&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let d=u.taper??e.taper,c=nl(d,u.min,u.max,u.value,l.key,l.shiftKey,u.step);c!==null&&(l.preventDefault(),a.value=String(Ur(d,u.min,u.max,c)),u.onChange(c),u.onCommit?.(c))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Ih(e,a,t),s),n.append(ge()),Te(n,e),n}function Sl(e){return xa(e.taper,e.min,e.max)?Ur(e.taper,e.min,e.max,e.value):e.value}function Ih(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(_e());let r=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&r(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),r(o.timeStamp))}),a}function qh(e,t){let n=$a(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let r=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?r?.getAttribute("label")!==o.group&&(r=document.createElement("optgroup"),r.setAttribute("label",o.group),a.append(r)):r=null,(r??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,ge()),n}function _h(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ge()),Te(n,e),n}function Bh(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(ge()),Te(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=El(),r.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Nl(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,r),a}function jh(e){let t=$a(e.id,e.label);return t.append(ge()),Te(t,e),t}var Hh=450;function Uh(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",a.label),a.title&&(r.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Vh(l.icon)),u.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(u)}r.append(o,s),n.append(r)}return Al(n,e),n}function Al(e,t){for(let n of t.groups)for(let a of n.moves){let r=e.querySelector(`[data-nc-move="${Nt(a.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=a.disabled===!0)}}function Vh(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Gh(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ge()),t}function vo(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ge()),t}function xo(e){if(typeof e.valueText=="string")return e.valueText;let t=yn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ml(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Wh(e,t){let n=Hr(t.taper,t.min,t.max,t.value);Ml(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",xo(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${xo(t)}`}function Yh(e,t){if(xa(e.taper,e.min,e.max))return nl(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Kh(e,t){let n=$a(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",a.append(r);let o=0,s=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let c=t(a);s=c&&"value"in c?Number(c.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let c=t(a);if(c?.type!=="knob")return;if(xa(c.taper,c.min,c.max)){let m=Hr(c.taper,c.min,c.max,s)-(d.clientY-o)/120;c.onChange(el(c.taper,c.min,c.max,m));return}let p=c.max-c.min||1,h=Math.min(c.max,Math.max(c.min,s-(d.clientY-o)*p/120));c.onChange(h)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let c=t(a);if(c?.type!=="knob")return;let p=Yh(c,d);p!==null&&(d.preventDefault(),c.onChange(Math.min(c.max,Math.max(c.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(ge()),Te(n,e),n}function Xh(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=a.value,r.setAttribute("role","tab"),r.textContent=a.label,r.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),r.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let d=s[u];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(ge()),Tl(n,e),n}function Tl(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Jh(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let c=0;c<e.slots.length;c++){let p=e.slots[c],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(c),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,_e()),Qh(h,m,n,c,t),a.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=El(),r.append(_e()),r.addEventListener("click",()=>{Nl(n);let c=t(n);c?.type==="slotRow"&&c.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let c=t(n);c?.type==="slotRow"&&c.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...r?[r]:[]),n.append(d,o,ge()),Ll(n,t),Cl(n,e),n}function $o(e,t,n,a){let r=n(e);if(r?.type!=="slotRow")return;tn(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";r.onSlot(t,o)}function Qh(e,t,n,a,r){let o=0,s=0,l=0,u=!1,d=!1,c=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},m=g=>{let w=g.clientX-s,E=g.clientY-l;w*w+E*E>yo*yo&&(u=!0,h())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",f))},y=g=>{let w=o!==0&&!u&&!d;h(),b(),w&&(c=!0,$o(n,a,r,g))},f=()=>{u=!0,h(),b()};e.addEventListener("pointerdown",g=>{g.button===0&&(b(),d=!1,u=!1,c=!1,s=g.clientX,l=g.clientY,h(),o=window.setTimeout(()=>{o=0,!u&&(d=!0,Zh(n,t,a,r))},Ph),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(c||d||u){c=!1,d=!1,u=!1;return}$o(n,a,r,g)})}function Ll(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=ko("Save","store"),r=ko("Clear","clear");n.append(a,r);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),tn(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(d,"store"),tn(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(d,"clear"),tn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&tn(e)})}function ko(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Zh(e,t,n,a){Ll(e,a);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function tn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Cl(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let o=Number(r.dataset.ncSlot),s=t.slots[o];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Nl(e){let t=e.dataset.ncLastFill||null,n=dp(t);e.dataset.ncLastFill=n;let a=up(n);if(a)for(let[r,o]of Object.entries(a))e.style.setProperty(r,o)}function ef(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,r=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),r(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>r(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||r(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),r(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function tf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let r=f=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=f,a.append(g),g},o=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let g of[o,s]){let w=g===f;g.setAttribute("aria-checked",w?"true":"false"),g.tabIndex=w?0:-1}};l(o);for(let f of[o,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let g=s.getAttribute("aria-checked")==="true"?o:s;l(g),g.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(ef(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),u.append(f)}n.append(u);for(let f of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=f.label,w.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(w.dataset.ncLane=String((f.lane-1)%4+1));let E=!1,C=0;w.addEventListener("pointerdown",x=>{E=!1,!(x.pointerType==="mouse"||x.button!==0)&&(C=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(E=!0,A.onSelectRow?.(A.rows.findIndex(k=>k.id===f.id),!0))},Hh))});for(let x of["pointerup","pointercancel","pointerleave"])w.addEventListener(x,()=>window.clearTimeout(C));w.addEventListener("contextmenu",x=>{E&&x.preventDefault()}),w.addEventListener("click",x=>{let A=t(n);if(A?.type!=="stepGrid")return;if(E){E=!1;return}let k=A.rows.findIndex(N=>N.id===f.id),T=!!A.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);A.onSelectRow?.(k,T)}),w.addEventListener("keydown",x=>nf(n,w,x));let S=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let k=document.createElement("button");k.type="button",k.className="nc-ms",k.dataset.ncMs=x,k.textContent=x==="mute"?"M":"S",k.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${f.label}`),A.append(k,_e()),A.addEventListener("click",()=>{let T=t(n);if(T?.type!=="stepGrid")return;let N=T.rows.findIndex(q=>q.id===f.id);(x==="mute"?T.onMute:T.onSolo)?.(N)}),S.push(A)}let v=document.createElement("div");v.className="nc-steps";for(let x=0;x<f.steps.length;x++){let A=document.createElement("span");A.className="nc-step-wrap";let k=document.createElement("button");k.type="button",k.className="nc-step",k.dataset.ncStep=`${f.id}:${x}`,k.setAttribute("aria-label",`${f.label} step ${x+1}`),A.append(k,_e()),A.addEventListener("click",T=>{let N=t(n);if(N?.type!=="stepGrid")return;let q=N.rows.findIndex(U=>U.id===f.id),_=s.getAttribute("aria-checked")==="true";N.onToggle(q,x,T.shiftKey||_)}),v.append(A)}if(e.onLength&&v.append(af(n,v,f,t)),g.append(...S,w,v),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=f.id,x.setAttribute("aria-label",`Re-roll ${f.label}`),x.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=wo(),x.append(_e()),x.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(k=>k.id===f.id))}),g.append(x)}g.addEventListener("click",x=>{if(x.target!==g)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(k=>k.id===f.id))}),Eo(n,v,".nc-step-wrap",t,s,()=>f.id),n.append(g)}let d=document.createElement("div");d.className="nc-pads-head";let c=(f,g,w)=>{let E=document.createElement("button");return E.type="button",E.className=f,E.textContent=g,w&&E.setAttribute("aria-label",w),E},p=c("nc-pads-step","‹","Previous lane"),h=c("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",$r(n,f))}));for(let[f,g]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let E=w.rows.length;w.onSelectRow?.(((Rn(w)+g)%E+E)%E)});if(d.append(p,m,h),e.onDice){let f=c("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=wo(),f.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let w=Rn(g);w>=0&&g.onDice?.(w)}),d.append(f)}if(e.transport){let f=c("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),d.append(f)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<y;f++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(f),g.textContent=String(f+1),g.addEventListener("click",w=>{let E=t(n);if(E?.type!=="stepGrid")return;let C=Rn(E);if(C<0)return;if(n.dataset.ncLenMode==="true"){E.onLength?.(C,f+1);return}let S=s.getAttribute("aria-checked")==="true";E.onToggle(C,f,w.shiftKey||S)}),b.append(g)}return Eo(n,b,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[Rn(f)]?.id:void 0}),n.append(b),n.append(ge()),$r(n,e),n}function Rn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Eo(e,t,n,a,r,o){let s="on",l=!0,u=-1,d=(c,p)=>{let h=c.rows[u]?.steps[p];!h||p>=c.rows[u].length||(c.onSet?c.onSet(u,p,s,l):!!h[s]!==l&&c.onToggle(u,p,s==="accent"))};Sh(t,n,c=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(c.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===o());h>=0&&p.rows[h].length!==c.pad+1&&p.onLength?.(h,c.pad+1);return}if(c.kind==="paint"){if(c.phase==="start"){let h=o();u=p.rows.findIndex(b=>b.id===h);let m=p.rows[u]?.steps[c.pad];if(!m)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(p,c.pad)}else if(c.kind==="long"){let h=o(),m=p.rows.findIndex(y=>y.id===h),b=t.querySelectorAll(n)[c.pad];m>=0&&b instanceof HTMLElement&&p.onLongPress?.(m,c.pad,b)}}})}function nf(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],r=a.indexOf(t),o=r;n.key==="ArrowDown"?o=r+1:n.key==="ArrowUp"?o=r-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function af(e,t,n,a){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(_e());let o=d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.findIndex(b=>b.id===n.id),h=c.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&c.onLength?.(p,m)},s=d=>{let c=[...t.querySelectorAll(".nc-step")],p=1;return c.forEach((h,m)=>{let b=h.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(p=m+1)}),p},l=d=>o(s(d.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),r.addEventListener("keydown",d=>{let c=a(e);if(c?.type!=="stepGrid")return;let p=c.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),o(h[d.key]))}),r}var ja=new WeakMap,Dn=new WeakMap;function rf(e){return e?(Dn.has(e)||(Dn.set(e,na(e)),Hs(t=>{Dn.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))xr(n,Number(n.getAttribute("data-nc-velocity")))},e)),Dn.get(e)):"light"}function xr(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:rf(e.ownerDocument),r=n===null?null:`${a} ${n}`;if(!(ja.has(e)&&ja.get(e)===r)){if(ja.set(e,r),n===null){for(let o of Object.keys(eo(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(eo(n,Zi[a]??Zi.light)))e.style.setProperty(o,s)}}function $r(e,t){let n=t.rows.some(c=>c.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),o=t.rows.find(c=>c.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let c=!!t.transport?.playing,p=t.transport?.label??(c?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",c?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&o){r.setAttribute("aria-label",`${o.label} steps`),o.lane&&(r.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?r.dataset.silent="true":delete r.dataset.silent;let c=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of r.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}`),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,xr(p,m?.velocity),t.playhead>=0&&h===c?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let c of t.rows){for(let m=0;m<c.steps.length;m++){let b=c.steps[m],y=e.querySelector(`[data-nc-step="${c.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let f=y.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===c.id?f.dataset.selected="true":delete f.dataset.selected;let E=t.selectedRow!==c.id&&(t.selectedRows??[]).includes(c.id);E?f.dataset.picked="true":delete f.dataset.picked;let C=f.querySelector(".nc-name");C instanceof HTMLElement&&(C.setAttribute("aria-pressed",t.selectedRow===c.id||E?"true":"false"),C.textContent!==c.label&&(C.textContent=c.label,C.setAttribute("aria-label",`Select ${c.label}`))),c.mute||n&&!c.solo?f.dataset.silent="true":delete f.dataset.silent;for(let S of f.querySelectorAll("[data-nc-ms]")){let v=S.getAttribute("data-nc-ms")==="mute"?c.mute:c.solo;S.setAttribute("aria-pressed",v?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),xr(y,b.velocity);let g=t.playhead>=0&&c.length>0?(t.playhead%c.length+c.length)%c.length:-1;m===g?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!t.onLength&&t.selectedRow===c.id;y.hidden=m>=c.length&&!w,m>=c.length&&w?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${c.id}"]`),h=e.querySelector(`[data-nc-step="${c.id}:${Math.max(0,c.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(c.length)),p.setAttribute("aria-label",`${c.label} length, ${c.length} steps`),p.title=`${c.label}: drag to set the length (${c.length} steps)`)}}function of(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ge()),t}function sf(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=Dl(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(r),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&w.onRemove?.(g)}),a.append(g)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let w=document.createElement("button");w.type="button",w.className="nc-hacks",w.dataset.ncHacks="",g.append(w,_e()),g.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onHacks?.()}),l.append(g)}let u=document.createElement("div");u.className="nc-strip-ms";for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let w=document.createElement("span");w.className="nc-ms-wrap";let E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=g,E.textContent=g==="mute"?"M":"S",w.append(E,_e()),w.addEventListener("click",()=>{let C=t(n);C?.type==="strip"&&(g==="mute"?C.onMute:C.onSolo)?.()}),u.append(w)}let d=document.createElement("div");d.className="nc-strip-sends";for(let g of e.sends??[])d.append(It({...g,type:"knob",compact:!0},t));let c=document.createElement("div");c.className="nc-strip-pan",e.pan&&c.append(It(Jr(e),t));let p=document.createElement("div");p.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let w=document.createElement("span");w.className="nc-scale-tick",w.style.setProperty("--tick-pos",String(g.value)),w.textContent=g.label,h.append(w)}let m=zp({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let w=t(n);w?.type==="strip"&&w.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&Ao(g)}}),b=qp({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(p.append(h,m.el,b.el),o){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let w=document.createElement("span");w.className="nc-strip-fold-cap",w.setAttribute("aria-hidden","true");let E=document.createElement("span");E.className="nc-ui-fx-fold-name",E.dataset.ncStripFoldName="";let C=document.createElement("span");C.className="nc-strip-fold-pan",C.setAttribute("aria-hidden","true"),C.hidden=!e.pan,g.append(w,C,E),g.addEventListener("click",()=>{let S=t(n);if(S?.type!=="strip")return;S.onFold?.(!1);let v=n.querySelector("[data-nc-strip-hide]");v instanceof HTMLElement&&v.focus()}),p.prepend(g)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let f=0;return y.addEventListener("click",g=>{let w=t(n);w?.type!=="strip"||!w.onTypeIn||(window.clearTimeout(f),g.detail===0?So(n,y,t):g.detail===1&&(f=window.setTimeout(()=>So(n,y,t),cf)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(f);let g=t(n);g?.type==="strip"&&Ao(g)}),s&&n.append(s),n.append(a,l,u,d,c,p,y,ge()),Pl(n,e),n}function Jr(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??lf(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function lf(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var cf=250;function So(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=a.valueText??yn(a.value),r.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(u)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function df(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(r,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;zl(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,ge()),Fl(n,e),n}function Fl(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...r.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),zl(a))}function zl(e){let t=e.options[0];t&&(t.selected=!0)}function Ao(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Pl(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),o=r?Pp(r):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),Zs(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??yn(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let h=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${h}`:h}for(let p of e.querySelectorAll("[data-nc-ms]")){let h=p.getAttribute("data-nc-ms"),m=h==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",m?"true":"false"),p.setAttribute("aria-label",`${h==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${Nt(t.pan.id)}"]`);p&&Te(p,Jr(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let d=e.querySelector("[data-nc-strip-hide]");d instanceof HTMLElement&&(Ol(d,u,t.label),ft(d,t.foldHelp));let c=e.querySelector("[data-nc-strip-fold]");if(c instanceof HTMLElement){c.hidden=!u,c.setAttribute("aria-label",`Expand ${t.label}`);let p=c.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),ft(c,t.foldedHelp??t.foldHelp)}}function Mo(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${Nt(t)}"]`);return Zs(n?.querySelector(".nc-meter")??void 0)}var kr=typeof ResizeObserver=="function"?new ResizeObserver(uf):null;function uf(e){for(let t of e){if(!t.target.isConnected){kr.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&pf(n)}}function pf(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+r+o}px`)}function hf(e){if(kr)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))kr.observe(t)}function ff(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let r=typeof e.onFold=="function",o=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!ia(e)&&!o&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(ql(n,"head")),e.on!==void 0){let u=Xs({checked:e.on,labelledBy:a.id,onChange:d=>{let c=t(u.el);c?.type==="fx"&&c.onToggle?.(d)}});u.el.dataset.ncFxSwitch="",l.append(u.el)}r&&l.append(gf(n,t)),ia(e)&&l.append(vf(n,t)),s&&l.append(xf(t)),n.append(l)}r&&n.prepend(bf(n,t)),o&&_l(n,e);for(let l of e.controls)n.append(It(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let u=document.createElement("summary");u.textContent=e.moreLabel??"More",l.append(u);for(let d of e.more)l.append(It(d,t));n.append(l)}return n.append(ge()),Bl(n,e),hf(n),n}var mf=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Rl(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&mf(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function gf(e,t){let n=Dl();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Rl(e))}),n}function Dl(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Ol(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function bf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(ql(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Rl(e)}}),n}var qt=new Set;function Un(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var ia=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),yf="(max-width: 768px)";function wf(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function vf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(wf()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Il(e,a,!qt.has(a.id)),n.focus())}),n}function xf(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Il(e,t,n){n?qt.add(t.id):qt.delete(t.id),Qr(e,t)}function $f(e,t){t?.type==="fx"&&qt.has(t.id)&&Il(e,t,!1)}function kf(e){return e.ownerDocument.defaultView?.matchMedia?.(yf).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Qr(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=ia(t)&&qt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!ia(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Un(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Ot(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",ft(n,t.maxHelp)),!a){e.dataset.ncMax&&To(e);return}if(!e.isConnected){let s=()=>e.isConnected&&qt.has(t.id)&&Qr(e,t);queueMicrotask(()=>{e.isConnected?s():Un(e.ownerDocument,s)});return}let r=kf(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&To(e),e.dataset.ncMax=r,r==="over"&&Ef(e,t)),Sf(e.ownerDocument),r==="over"&&Zr(e),Un(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Ot(s)})}function To(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Un(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ot(n)})}function Ef(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Zr(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,o=Number.parseFloat(r?.getComputedStyle(a).columnGap??"")||0,s=ah(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Lo=new WeakSet;function Sf(e){Lo.has(e)||(Lo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Zr(t)}))}var Er=new WeakMap;function ql(e,t){let n=wh(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function _l(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)ft(r,t.meterHelp);let a=Er.get(e);a?a.set(t.meter):Er.set(e,kh(n,t.meter))}function Bl(e,t){(t.meter||Er.has(e))&&_l(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Ol(o,r,t.title),ft(o,t.foldHelp)),Qr(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let u=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",u),s.title=u}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let u=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${u?`, ${u.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=u,d.hidden=u==="");let c=l.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),ft(l,t.foldHelp)}}function ft(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Nt(e){return e.replace(/["\\]/g,"\\$&")}function Af(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);a?.type==="canvas"&&al(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ot(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Zr(n);Dh(e)}var Mf=et["toast-duration"];function Tf({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Lf(e,t,n,a){let r=l=>({top:l,bottom:l+n}),o=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=r(t-a-n);return o(s)?o(r(a))?"bottom":"top":"bottom"}function Cf(e,t,n,a,r,o){let s=e.bottom+r,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let u=!0,d=0;u&&d<8;d++){u=!1;for(let c of t)c&&c.bottom>s&&c.top<s+n.height&&c.right>l&&c.left<l+n.width&&(s=c.bottom+r,u=!0)}return{top:s,left:l}}var Co="data-nc-ui-toast-live";function Nf(e,t){let n=t.querySelector(`[${Co}]`);return n||(n=e.createElement("div"),n.setAttribute(Co,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function nn({message:e,actionLabel:t,onAction:n,duration:a=Mf,onClose:r,avoid:o=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let d=u.defaultView??globalThis,c=u.createElement("div");c.className="nc-ui-toast",c.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,c.appendChild(p);let h=null;t&&(h=u.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,c.appendChild(h)),l.appendChild(c);let m="open",b=Q=>Q&&typeof Q.getBoundingClientRect=="function"?Q.getBoundingClientRect():null,y=b(c),f=y?.height||44,g=d.getComputedStyle?.(c),w=Number.parseFloat(g?.getPropertyValue(ee("toast-offset")))||16,E=Number.parseFloat(g?.getPropertyValue(ee("toast-anchor-gap")))||8,C=b(s),S=d.innerHeight??0,v=o.map(b).filter(Boolean),x=C&&C.bottom>0&&C.top<S?Cf(C,v,{width:y?.width||0,height:f},d.innerWidth??0,E,w):null;x&&x.top+f<=S?(c.setAttribute("data-placement","anchor"),c.style.top=`${x.top+(d.scrollY??0)}px`,c.style.left=`${x.left+(d.scrollX??0)}px`):c.setAttribute("data-placement",Lf(v,S,f,w));let A=d.requestAnimationFrame?.bind(d)??(Q=>setTimeout(Q,16));A(()=>A(()=>{m==="open"&&c.setAttribute("data-state","open")})),Nf(u,l).textContent=Tf({message:e,actionLabel:t});let k,T,N=new Promise(Q=>{T=Q}),q=Q=>{clearTimeout(k),k=setTimeout(()=>J("timeout"),Q)},_=a,U=Date.now(),ce=()=>{m==="open"&&(clearTimeout(k),_=Math.max(0,_-(Date.now()-U)))},de=()=>{m==="open"&&(U=Date.now(),q(_))};c.addEventListener("pointerenter",ce),c.addEventListener("pointerleave",de),c.addEventListener("focusin",ce),c.addEventListener("focusout",de),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{J("action")}}),Number.isFinite(a)&&q(a);function J(Q="close"){if(m!=="open")return;m="closing",clearTimeout(k),c.setAttribute("data-state","closing"),r?.(Q);let B=d.getComputedStyle?.(c),Se=B?Math.max(0,...String(B.transitionDuration||"").split(",").map(pe=>Number.parseFloat(pe)*(pe.trim().endsWith("ms")?1:1e3)||0)):0,H=()=>{m!=="gone"&&(m="gone",c.remove(),T(Q))};c.addEventListener("transitionend",H),setTimeout(H,Se+50)}return{el:c,close:J,closed:N}}var No="data-nc-help";function Ff(e,t,n,a=0,r=6,o=8){let s=e.top-r-t.height,l=s>=a+o?"above":"below",u=l==="above"?s:e.bottom+r,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(u),left:Math.round(d),side:l}}var Ha=new WeakMap;function zf(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Pf({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Ha.get(e);if(n)return n;let a=e.defaultView,r=null,o=null,s,l=()=>{clearTimeout(s),o=null,r&&(r.hidden=!0)},u=h=>{let m=h.getAttribute(No);if(!m)return;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=m,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let b=h.getBoundingClientRect(),y=Ff(b,{width:r.offsetWidth,height:r.offsetHeight},a.innerWidth,zf(e));r.style.top=`${y.top}px`,r.style.left=`${y.left}px`,r.dataset.side=y.side,r.style.visibility=""},d=h=>{if(h.pointerType==="touch")return;let m=h.target&&h.target.closest?h.target.closest(`[${No}]`):null;m!==o&&(l(),m&&(o=m,s=setTimeout(()=>{o===m&&m.isConnected&&u(m)},t)))},c=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",d),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",c),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",d),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",c),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),r?.remove(),r=null,Ha.delete(e)}};return Ha.set(e,p),p}var jl="(max-width: 768px)",Rf='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Df='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Of=0;function If({panel:e,button:t,label:n="Menu",media:a=jl}){let r=e.ownerDocument,o=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Of}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=Rf),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",c,!0),r.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(Df)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let g=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",c,!0),r.removeEventListener("pointerdown",p,!0),(f??g)&&s.focus?.({preventScroll:!0})}function c(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let g=f.target;g instanceof o.Node&&(e.contains(g)||s.contains(g))||d({focus:!1})}let h=()=>l()?d({focus:!0}):u(),m=f=>{let g=f.target,w=g instanceof o.Element?g.closest("button"):null;!w||!e.contains(w)||w.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",m);let b=o.matchMedia?.(a),y=()=>{b?.matches||d({focus:!1})};return b?.addEventListener?.("change",y),{button:s,panel:e,open:u,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",m),b?.removeEventListener?.("change",y)}}}var ei="netcomposer.rhythm.hidden.v1",De=new WeakMap;function Ua(){try{return globalThis.localStorage??null}catch{return null}}function Hl(e,t=ei){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Fo(e,t,n,a=ei){let r=Hl(e,a);n?r.add(t):r.delete(t);try{e?.setItem(a,JSON.stringify([...r]))}catch{}}function ti(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],a=r=>{if(n.push(r),r.type==="group")for(let o of r.controls)a(o)};for(let r of t)a(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),r.pan&&n.push(Jr(r)));return n}function Ul(e,t){if(!(!e||!t))return ti(e).find(n=>n.id===t)}function qf(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ti(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function _f(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(a,r),e.append(n),Vl(e,t)}function Vl(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Bf(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=De.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ul(n,a)}function jf(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],r=qf(t);if(e.dataset.ncSignature===r){for(let o of a){let s=e.querySelector(`[data-nc-section="${Po(o.id)}"]`);s&&Vl(s,o);for(let l of o.controls){let u=e.querySelector(`[data-nc-id="${Po(l.id)}"]`);u instanceof Element&&Te(u,l)}s instanceof HTMLElement&&Sr(s,o,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),_f(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let u of o.controls)l.append(It(u,Bf));e.append(s),Sr(s,o,n)}}function Gl(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,r))}}var Hf="(max-width: 768px)",Wl=new WeakMap;function zo(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Uf(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let r=zo("prev"),o=zo("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(r,s,o,l);let u=(d,c)=>{let p=Wl.get(e);if(!p||c.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Gl(h,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,m),p.onPage?.(m),Sr(e,{...p,page:m},t),c.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===c&&(c===r?o:r).focus(),t.redraw()};return r.addEventListener("click",()=>u(-1,r)),o.addEventListener("click",()=>u(1,o)),e.prepend(a),a}function Sr(e,t,n){Wl.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:o,page:s}=Gl(a.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),o<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Hf).matches===!0,u=e.closest(".nc-module");a.forEach((f,g)=>{let w=Math.floor(g/r)!==s;if(w?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,w&&!l){let E=u instanceof HTMLElement?De.get(u):void 0;$f(f,Ul(E,f.dataset.ncId))}});let d=Uf(e,n),c=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');c.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${o}`;h.textContent!==m&&(h.textContent=m);let b=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${o}`;b.textContent!==y&&(b.textContent=y)}function Po(e){return e.replace(/["\\]/g,"\\$&")}function Vf(e,t=ei){Ws();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Hl(Ua(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let d=Xs({labelledBy:o.id,onChange:w=>(De.get(n)??e).onToggle?.(w)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,u);let c=document.createElement("span");c.className="nc-snap-msg",c.dataset.ncStatus="",r.append(o,c,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,r,p,h),n.setAttribute("aria-labelledby",o.id);let y=w=>{let E=De.get(n)??e;n.dataset.ncOpen=w?"false":"true",p.hidden=w,h.hidden=!w,l.textContent=w?"+":"−",l.setAttribute("aria-expanded",w?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${w?"Show":"Hide"} ${E.title}`),l.title=w?"Show":"Hide",w?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let w=n.dataset.ncOpen==="true";Fo(Ua(),(De.get(n)??e).id,w,t),y(w),Ar(n.parentElement)}),h.addEventListener("click",()=>{Fo(Ua(),(De.get(n)??e).id,!1,t),y(!1),Ar(n.parentElement)});let f={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(w){De.set(n,w),w.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=w.title,c.textContent=w.status??"",w.status!==void 0?c.setAttribute("aria-live","polite"):c.removeAttribute("aria-live"),m.textContent=w.summary??w.title,d.el.hidden=w.on===void 0,d.set(w.on===!0),w.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${w.title}`),jf(p,w,f),y(p.hidden),g.redraw()},redraw(){let w=De.get(n);w&&Af(n,ti(w))}};return De.set(n,e),y(a),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),Hs(()=>g.redraw(),n.ownerDocument),g}function Gf(e,t,n="adjacent"){Ws(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((r,o)=>{let s=o%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=a;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Ar(e)}function Ar(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?i("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let r=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Yl="netcomposer.studio.instances.v1",Ro="netcomposer.studio.types-seen.v1",Wf=["petra-rhythm","olive-bass"];function Kl(e,t){return t===1?e:`${e}#${t}`}function ni(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Yf(e,t){return t===1?e.name:`${e.name} ${t}`}function Ht(e,t,n){const a=Yf(e,t),r=Jl(n,a);return{id:Kl(e.id,t),type:e.id,n:t,name:r,src:e.src,...r!==a?{custom:!0}:{}}}const Xl=20;function Jl(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,Xl).join("").trim()||t}function Kf(e,t,n,a){return e.map(r=>{if(r.id!==t)return r;const o=a.find(s=>s.id===r.type);return o?Ht(o,r.n,n):r})}function Xf(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Jf(e,t){const n=new Set(e.filter(r=>r.type===t.id).map(r=>r.n));let a=1;for(;n.has(a);)a++;return Ht(t,a)}function wn(e){return e.filter(t=>t.available!==!1).map(t=>Ht(t,1))}function Qf(e,t){if(!Array.isArray(e))return wn(t);const n=[];for(const a of e){const r=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:r?.id;if(typeof o!="string")continue;const s=ni(o),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(Ht(l,s.n,r?.name))}return n.length>0||e.length===0?n:wn(t)}function ai(){try{return globalThis.localStorage??null}catch{return null}}function Zf(e,t=ai()){try{const n=t?.getItem(Yl);return n?Qf(JSON.parse(n),e):wn(e)}catch{return wn(e)}}function em(e,t,n=ai()){let a=Wf;try{const s=JSON.parse(n?.getItem(Ro)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const r=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(r.length===0)return[...e];const o=[...e];for(const s of r)o.some(l=>l.type===s.id)||o.push(Ht(s,1));try{n?.setItem(Ro,JSON.stringify([...new Set([...a,...r.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Ut(o,n),o}function tm(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Ut(e,t=ai()){try{t?.setItem(Yl,JSON.stringify(tm(e)))}catch{}}function nm(e,t){const n=new Map;return(a,r)=>{const o=ni(a),s=o?.type??a,l=r?.instance!==void 0?Number(r.instance):a.includes("#")?o?.n:void 0,u=e().filter(c=>c.instance.type===s);let d;if(l!==void 0&&Number.isInteger(l)&&l>=1)d=u.find(c=>c.instance.n===l);else{const c=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});d=c.find(p=>p.readyState?.()!=="complete")??c[0]??u[0]}if(!d){if(t.some(p=>p.id===s))return null;const c=l!==void 0?Kl(s,l):a;return{id:c,name:c}}return n.set(d.instance.id,d.window()),{id:d.instance.id,name:d.instance.name}}}const Va="netcomposer.studio.pending-presets.v1",am=3e3,rm=6e4;function Do(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function im(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(r=>{clearTimeout(a),n(r)},()=>{clearTimeout(a),n(void 0)})})}function om(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Va)??"{}"),l={};if(s&&typeof s=="object")for(const[u,d]of Object.entries(s))Do(d)&&(l[u]=d);return l}catch{return{}}},r=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Va,JSON.stringify(s)):l.removeItem(Va)}catch{}},o=async(s,l)=>{const u=a(),d=u[s];if(!d)return;delete u[s],r(u);let c=d.format===l.format;if(c)try{await l.set(d.data)}catch{c=!1}for(const p of n)p(s,c)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=am){const u={};return await Promise.all(s.map(async d=>{const c=t.get(d);if(!c)return;const p=await im(Promise.resolve().then(()=>c.get()),l);p!=null&&(u[d]={format:c.format,...c.version!==void 0?{v:c.version}:{},data:p})})),u},stash(s){const l={};for(const[u,d]of Object.entries(s))Do(d)&&(l[u]=d);r(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return r({}),s}}}function sm(e,t){return`${e}@studio/${t}`}const lm=1,xe=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],ri=[...xe];function cm(e,t,n={}){const a=n.instruments??xe;return{version:lm,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(r,o){if(typeof r!="string"||r.length===0||r.length>64)return null;const s=n.resolve?n.resolve(r,o):{id:r,name:a.find(h=>h.id===r)?.name??r};if(!s)return null;const l=t.attach(s.id,s.name),u=s.id,d=n.presets,c=n.share?.host(u),p=n.picker?.host(u);return{ctx:e,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:h=>sm(h,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...d?{providePreset:h=>d.provide(u,h)}:{},...c?{audioReceivers:c.audioReceivers,sendAudio:c.sendAudio,onAudio:c.onAudio,reveal:c.reveal}:{},...p?{pickerTarget:p.pickerTarget}:{}}}}}const Oo=16,dm=30;function um(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Oo+1):[],a=t.until;if(n.length<1||n.length>Oo||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const r=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-r>dm)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function pm(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function hm(e,t){return t===null?e:`${t} · ${e}`}function fm(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function mm(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const r=t.createElement("span");r.className="count-in-n",n.append(a,r);const o=t.title,s=new Map;let l=!1;const u=()=>{const c=e.now();for(const[E,C]of s)c>=C.until&&s.delete(E);const[p,h]=[...s][0]??[],m=h?pm(h,c):null;if(!p||!m){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const b=e.clearOf?.()??[],y=`${fm(b.map(E=>E.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==y&&n.style.setProperty("--count-in-top",y);const f=e.labelOf(p);a.textContent!==f&&(a.textContent=f);const g=String(m.n);r.textContent!==g&&(r.textContent=g),n.toggleAttribute("data-accent",m.accent),n.setAttribute("aria-label",`${f} count-in ${g}`);const w=hm(o,m.n);t.title!==w&&(t.title=w),requestAnimationFrame(u)},d=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(c,p){if(typeof c!="string"||!c)return;const h=um(p);h&&(s.set(c,h),d())},clear(c){s.delete(c)&&d()}}}}const gm=1e4;function bm(e=gm,t=globalThis){const n=new Set;let a=[];const r=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),r())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const Ql="netcomposer.studio.fx-fold.v1",ym=["a","b","insert"],Zl={a:!0,b:!0,insert:!1};function ec(e){try{const t=e?.getItem(Ql);if(!t)return{};const n=JSON.parse(t);if(!n||typeof n!="object")return{};const a=n,r={};for(const o of ym)typeof a[o]=="boolean"&&(r[o]=a[o]);return r}catch{return{}}}function tc(e){return{...Zl,...ec(e)}}function nc(e,t,n){const a={...ec(e),[t]:n};try{e?.setItem(Ql,JSON.stringify(a))}catch{}return{...Zl,...a}}const ac="netcomposer.studio.insert-fold.v1";function rc(e){try{const t=e?.getItem(ac),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function ic(e,t,n){const a=[...rc(e)].filter(o=>o!==t);n&&a.push(t);const r=a.slice(-256);try{e?.setItem(ac,JSON.stringify(r))}catch{}return new Set(r)}function wm(e,t){return tc(e).insert?(nc(e,"insert",!1),ic(e,t,!0)):rc(e)}function be(){try{return globalThis.localStorage??null}catch{return null}}const vm={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function oc(e,t){const n=t.fx[e],a=Kn(n);for(const r of a.chain){const o=vm[e][r.type];n===void 0&&o&&Object.assign(r.dials,o),e==="a"?(r.bypass=r.type!=="plate",r.type==="plate"&&(r.dials.mix=100)):e==="b"?(r.bypass=r.type!=="delay",r.type==="delay"&&(r.dials.mix=100,r.dials.mode=0,r.dials.send=100)):r.bypass=r.type!=="drive"||!t.insert.on}return a}const sc="drive-1",Mr=3;function xm(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return ut(e.masterFx,t);const n=e.insert.on?oc("insert",e).chain.find(a=>a.type==="drive"):void 0;return ut({v:2,chain:n?[{id:sc,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function $m(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const km={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function Em(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const On=e=>({channels:null,reason:e,message:km[e]});function Sm(e,t){const n=new Map,a=new Map;let r=1;const o=l=>{const u=t.nodeFor(l);if(!u)return null;const d=n.get(l);if(d&&d.source===u)return d.node;d?.node.disconnect();const c=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return c.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(c),n.set(l,{node:c,source:u}),c},s=async(l,u,d)=>{await t.ready;const c=o(l);if(!c)return On("no-source");if(!(d>u))return On("empty");const p=r++;return new Promise(h=>{a.set(p,(m,b)=>h(m?{channels:m}:On(b??"gone"))),c.port.postMessage({type:"take",id:p,from:u,to:d}),setTimeout(()=>{a.delete(p)&&h(On("timeout"))},Em(d,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const d=n.get(l)?.node??null,c=r++;let p=d;const h=b=>p?.port.postMessage(b);p?h({type:"record",id:c,from:u}):t.ready.then(()=>{p=o(l),h({type:"record",id:c,from:u})});let m=!1;return{stop(b){return m?Promise.resolve(null):(m=!0,new Promise(y=>{a.set(c,y),h({type:"record-end",id:c,to:b}),setTimeout(()=>{a.delete(c)&&y(null)},Math.max(0,(b-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){m=!0,h({type:"record-cancel",id:c})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,u,d)=>s(l,u,d).then(c=>c.channels),takeResult:s}}function Am(e){const t=()=>{};return new Proxy(e,{get(n,a,r){if(a==="stop")return t;const o=Reflect.get(n,a,r);return typeof o=="function"?o.bind(n):o}})}const K={"picker:off":"Connects the Sample Picker on this computer, so its Send to NYX loads the pads of a NYX here. Off: the picker opens NYX on its own.","picker:connecting":"Connecting to the Sample Picker on this computer. Press to disconnect.","picker:on":"The Sample Picker is connected: its Send to NYX loads a NYX here (you choose which there). Press to disconnect.","picker:away":"The Sample Picker isn't answering: start it on this computer; the Studio keeps trying. Press to disconnect.","picker:ask":"The Sample Picker was connected. Press to connect again (Chrome may ask to let this site reach this computer).","picker:blocked":"Chrome blocks this site from reaching this computer. Allow it in the site's settings (Local network access), then press here.","transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","mix:sends":"The two send effects every channel feeds with its A and B knobs. Shown while no Inserts button is lit. They start folded: click a column to open it.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to go back to Reverb and Delay.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to go back to Reverb and Delay.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:toggle":"Hides or shows the send effects: the A · Reverb and B · Delay cards and every channel's A and B knobs. Only the view changes: the sends keep sounding as set. Inserts still opens a stack.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},lc={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function Mm(e){return Math.floor(.006*e)}const Tr=1024,Io=Tr+8192,Tm=.25;function Lm(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function Cm(e,t,n=OfflineAudioContext){const a=new n(1,Io,e),r=a.createBuffer(1,Io,e);r.getChannelData(0)[Tr]=Tm;const o=new AudioBufferSourceNode(a,{buffer:r}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return Lm(l.getChannelData(0),Tr)}function Nm(e,t=()=>Cm(e,n=>{const a=new DynamicsCompressorNode(n,lc);return{input:a,output:a}})){let n=Mm(e);const a=(async()=>{try{const r=await t();r!==null&&r>=0&&r<e/10&&(n=r)}catch{}})();return{get:()=>n,ready:a}}const Qt={noManifest:"No plugin.json there. Pick the plugin's folder, or plugin.json and its DSP file.",noDsp:e=>`plugin.json names its DSP file ${e}. Pick that file too.`,badJson:"plugin.json is not JSON.",bad:e=>`plugin.json has a problem: ${e}`,tooBig:e=>`${e} is over 256 KB.`},Fm=256*1024,zm=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")+1):"",In=e=>e.webkitRelativePath||e.name;async function Pm(e){const t=[...e],a=t.filter(h=>h.name==="plugin.json").sort((h,m)=>In(h).split("/").length-In(m).split("/").length)[0];if(!a)throw new Error(Qt.noManifest);const r=await a.text();let o;try{o=JSON.parse(r)}catch{throw new Error(Qt.badJson)}const s=ba(o);if(!s.ok||!s.manifest)throw new Error(Qt.bad(s.errors.join("; ")));const l=s.manifest,u=zm(In(a))+l.dsp,d=l.dsp.split("/").pop()??l.dsp,c=t.find(h=>In(h)===u)??t.find(h=>h!==a&&h.name===d&&!h.webkitRelativePath);if(!c)throw new Error(Qt.noDsp(l.dsp));const p=await c.text();if(new TextEncoder().encode(p).length>Fm)throw new Error(Qt.tooBig(l.dsp));return{manifest:l,manifestText:r,dspName:l.dsp,dsp:p}}async function Rm(e,t=Date.now()){return{id:e.manifest.id,version:e.manifest.version,name:e.manifest.name,author:e.manifest.author,licence:e.manifest.licence,manifest:e.manifestText,dspName:e.dspName,dsp:e.dsp,sha256:await Ms(new TextEncoder().encode(e.dsp)),added:t}}const qo=e=>`local:${e}`,oa=e=>e.startsWith("local:"),cc=e=>({id:e.id,version:e.version,name:e.name,author:e.author,added:e.added});function dc(){const e=new Map;return{list:async()=>[...e.values()].sort((t,n)=>t.added-n.added).map(cc),get:async t=>e.get(t)??null,put:async t=>{e.set(t.id,t)},remove:async t=>{e.delete(t)}}}const Dm="netcomposer-studio-plugins",qn="plugins";function Om(e=globalThis.indexedDB){const t=dc(),n=new Promise(o=>{if(!e)return o(null);try{const s=e.open(Dm,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(qn)||s.result.createObjectStore(qn,{keyPath:"id"})},s.onsuccess=()=>o(s.result),s.onerror=()=>o(null),s.onblocked=()=>o(null)}catch{o(null)}}),a=async(o,s,l)=>{const u=await n;return u?new Promise((d,c)=>{const p=u.transaction(qn,o),h=s(p.objectStore(qn));p.oncomplete=()=>d(h.result),p.onerror=()=>c(p.error??h.error),p.onabort=()=>c(p.error??h.error)}):l()},r=o=>{const s=o;return!!s&&typeof s.id=="string"&&typeof s.version=="string"&&typeof s.manifest=="string"&&typeof s.dsp=="string"};return{async list(){return(await a("readonly",s=>s.getAll(),async()=>{const s=await t.list();return Promise.all(s.map(l=>t.get(l.id)))})).filter(r).sort((s,l)=>s.added-l.added).map(cc)},async get(o){const s=await a("readonly",l=>l.get(o),()=>t.get(o));return r(s)?s:null},put:o=>a("readwrite",s=>s.put(o),()=>t.put(o)).then(()=>{}),remove:o=>a("readwrite",s=>s.delete(o),()=>t.remove(o)).then(()=>{})}}const je=-54,Sn=6,Le=-je/(Sn-je),Im=-9,Lr=(Im-je)/(Sn-je);function uc(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:je+t*(Sn-je)}function qm(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function _m(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function Xe(e){return qm(uc(e))}function Bm(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function jm(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:Xe(n.position))}function ii(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-je)/(Sn-je)))}function _o(e){return ii(_m(e))}const Bo=[0,-6,-12,-24,-48].map(e=>({value:ii(e),label:e===0?"0":`−${-e}`})),Hm=1;function Um(e){let t=0,n=0;for(const a of e){const r=Math.abs(a);r>t&&(t=r),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function jo(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<je?0:ii(Math.min(Sn,n)):null}function Vm(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const pc="netcomposer.studio.mix.v1",hc={position:Lr,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function vn(){return{v:1,channels:{},master:Le,returns:{a:{on:!0,level:Le},b:{on:!0,level:Le}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const pn=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Gm=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,sa=(e,t)=>typeof e=="boolean"?e:t,Je=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Wm(e){const t=Je(e);return{position:pn(t.position,hc.position),mute:sa(t.mute,!1),solo:sa(t.solo,!1),sendA:Math.min(Le,pn(t.sendA,0)),sendB:Math.min(Le,pn(t.sendB,0)),pan:Gm(t.pan)}}function fc(e){const t=vn(),n=Je(e);if(n.v!==1)return t;const a={};for(const[d,c]of Object.entries(Je(n.channels)))d.length>0&&d.length<=64&&(a[d]=Wm(c));const r=Je(n.returns),o=(d,c)=>{const p=Je(d);return{on:sa(p.on,c.on),level:pn(p.level,c.level)}},s={},l=Je(n.fx);for(const d of["a","b","insert"])l[d]!==void 0&&(s[d]=l[d]);const u={};for(const[d,c]of Object.entries(Je(n.channelFx)))d.length>0&&d.length<=64&&c&&typeof c=="object"&&(u[d]=c);return{v:1,channels:a,master:pn(n.master,t.master),returns:{a:o(r.a,t.returns.a),b:o(r.b,t.returns.b)},insert:{on:sa(Je(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function mc(){try{return globalThis.localStorage??null}catch{return null}}function Ym(e=mc()){try{const t=e?.getItem(pc);return t?fc(JSON.parse(t)):vn()}catch{return vn()}}function gc(e,t=mc()){try{return t?.setItem(pc,JSON.stringify(e)),t!==null}catch{return!1}}const ka=3;function Km(e,t=ka){return Math.max(1,Math.ceil(e/t))}function Ho(e,t=ka){return Math.max(0,Math.floor(e/t))}function Xm(e,t,n,a=null,r=ka){const o=Km(n.length,r)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return Ho(s,r);const l=new Set(e.ids);let u=-1;return n.forEach((d,c)=>{l.has(d)||(u=c)}),u>=0?Ho(u,r):Math.min(o,Math.max(0,e.page))}const bc=e=>!!e&&typeof e=="object"&&Array.isArray(e.chain);function Jm(e,t){if(!bc(e))return null;const n=e.chain.findIndex(a=>a?.id===t);return n<0?null:{slot:JSON.parse(JSON.stringify(e.chain[n])),index:n}}function Qm(e,t,n){if(!bc(e)||e.chain.length>=n||e.chain.some(r=>r?.id===t.slot.id))return null;const a=e.chain.slice();return a.splice(Math.max(0,Math.min(a.length,t.index)),0,t.slot),{...e,v:2,chain:a}}const Uo="plugin-url",Ga="plugin-folder",Vo="plugin-files",Wa="kept:",Ya="forget:",Ka="listed:",Zm="../plugins/registry.json",P={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlLocal:"Plugins load from this computer for now: pick its files, or use http://localhost while you build one.",urlPlaceholderLocal:"http://localhost:…/plugin.json",folder:"Load plugin folder…",files:"Load plugin from files…",url:"Load plugin from URL…",thisComputer:"this computer",kept:e=>`${e} (this computer)`,fileWarnBody:(e,t)=>`This runs ${e} by ${t}, from files on this computer, in your browser. Only run code you made or trust. It is kept in this browser until you remove it.`,forget:e=>`Remove ${e} from this computer…`,forgetTitle:e=>`Remove ${e}?`,forgetBody:"This browser forgets its copy. Slots that use it keep their dials and play as a wire after a reload.",forgetConfirm:"Remove",forgotten:e=>`${e} is removed from this computer.`,reloadToUse:(e,t)=>`Kept ${e} ${t}. Reload the page to hear the new code.`,reloadToHear:e=>`${e} has new code. Reload the page to hear it; until then the old code plays.`,reloadAction:"Reload",newCode:"Reload page: new code.",stuck:(e,t)=>`${e} on ${t} got stuck in a loop and was stopped. The rest of the mix plays on.`,frozenTitle:"The sound stopped",frozenBody:e=>`${e} froze the audio on this page, and it can't be restarted here. In a new tab your mix comes back with ${e} off (add it again to retry). This page stops saving.`,frozenOpen:"Open new tab",frozenStay:"Stay here",frozenShort:"Stopped: froze audio.",notKept:"Not on this computer.",pickAgain:"Pick files…",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",dialsKept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function eg(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded.",6:"Stopped: stuck in a loop."};for(const[n,a]of Object.entries(Xn))if(a===e)return t[Number(n)];return"Stopped."}function Zt(e){if(oa(e))return P.thisComputer;try{return new URL(e).host||e}catch{return e}}function tg(e,t,n=!0){let a;try{a=new URL(e.trim(),t)}catch{return null}const r=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(a.hostname);return a.protocol==="https:"&&(n||r)||a.protocol==="http:"&&r?a.href:null}function ng(e){const t=new URL(Zm,e.base).href;let n=[];const a=new Set,r=new Map,o=[],s=new Set,l=()=>{for(const S of s)S()},u=S=>String(S?.message??S).replace(/^nc-fx plugins?: /,""),d=e.remote!==!1,c=e.store??dc();let p=[];const h=new Map,m=new Set,b=S=>{m.has(S)||(m.add(S),l())},y=e.frozen,f=async()=>{try{p=await c.list()}catch(S){console.warn(`Studio plugins: can't read this computer's plugins (${u(S)})`)}l()},g=f(),w=d?wu(t,{fetch:e.fetch}).then(S=>{n=S.registry.plugins;for(const x of S.errors)console.warn(`Studio plugins: registry ${x}`);l();const v=o.splice(0);v.length&&C.restore(v)}).catch(S=>{console.info(`Studio plugins: no listed plugins (${u(S)})`)}):Promise.resolve(),E=async(S,v)=>{a.add(S),r.delete(S),l();try{const{entry:x,stale:A}=await v();return x.plugin&&(A&&b(x.plugin.id),y?.clear(x.plugin.id)),x.type}catch(x){throw r.set(S,u(x)),x}finally{a.delete(S),l()}},C={listed:()=>n,loaded:()=>Vd().filter(S=>!S.plugin.listed&&!oa(S.plugin.url)),remote:d,local:()=>p,stale:S=>m.has(S),frozen:S=>!!y?.has(S),async addPicked(S){const v=await Rm(S);y?.clear(v.id);const x=re(`plugin:${v.id}`);if(x){const k=x.plugin?.version===v.version&&h.get(v.id)===v.sha256;return await c.put(v),await f(),k||b(v.id),k?{type:x.type}:{reload:!0}}const A=await E(v.id,()=>Hi(e.ctx,{manifest:v.manifest,dsp:v.dsp,dspName:v.dspName},{moduleUrl:e.moduleUrl,url:qo(v.id)}));return h.set(v.id,v.sha256),await c.put(v),await f(),{type:A}},async loadKept(S){y?.clear(S);const v=re(`plugin:${S}`),x=await c.get(S);if(v){const k=h.get(S);return x&&k&&k!==x.sha256&&b(S),v.type}if(!x)throw new Error(P.notKept);const A=await E(S,()=>Hi(e.ctx,{manifest:x.manifest,dsp:x.dsp,dspName:x.dspName},{moduleUrl:e.moduleUrl,url:qo(S)}));return h.set(S,x.sha256),A},async forget(S){await c.remove(S),await f()},listingFor(S){const v=n.find(A=>A.id===S.id);if(!v)return null;const x=new URL(v.manifest,t).href;return!S.url||S.url===x?v:null},loading:S=>a.has(S),async loadListed(S){y?.clear(S);const v=re(`plugin:${S}`);if(v)return v.type;await w;const x=n.find(A=>A.id===S);if(!x)throw new Error(`${S} isn't listed`);return E(S,()=>vu(e.ctx,x,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(S){return E("url",()=>Cs(e.ctx,S,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(S){for(const v of S)if(!(v.status!=="missing"||a.has(v.id)||re(`plugin:${v.id}`))&&!y?.has(v.id)){if(oa(v.url)){g.then(()=>{p.some(x=>x.id===v.id)&&!a.has(v.id)&&!re(`plugin:${v.id}`)&&C.loadKept(v.id).catch(()=>{})});continue}if(d){if(!n.length){o.some(x=>x.id===v.id)||o.push(v);continue}C.listingFor(v)&&C.loadListed(v.id).catch(()=>{})}}},onChange(S){return s.add(S),()=>s.delete(S)},problem:S=>r.get(S)??null,clearProblem(S){r.delete(S)&&l()}};return C}const yc="netcomposer.studio.sends.v1";function ag(e,t=!1){try{const n=e?.getItem(yc);if(n==="0")return!1;if(n==="1")return!0}catch{}return!t}function rg(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function ig(e,t){try{e?.setItem(yc,t?"1":"0")}catch{}}function og(e){return e?{text:"− Sends",aria:"Hide the send effects"}:{text:"+ Sends",aria:"Show the send effects"}}const wc="netcomposer.studio.strip-fold.v1";function vc(e){try{const t=e?.getItem(wc),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function xc(e,t){try{e?.setItem(wc,JSON.stringify([...t].sort()))}catch{}return t}function $c(e,t,n){const a=new Set(vc(e));return n?a.add(t):a.delete(t),xc(e,a)}function sg(e,t){return $c(e,t,!1)}function lg(e,t){const n=new Set(t),a=vc(e),r=new Set([...a].filter(o=>n.has(o)));return r.size===a.size?a:xc(e,r)}const cg=-18,dg=-20,kc=3,ug=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],Go=[-20,-10,-7,-5,-3,0,1,2,3],pg=.3,hg=6.638/pg,fg=48;function mg(e){return e-cg}function Ec(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-kc)/20))):e>0?1:0}function gg(e){return e>0?Ec(mg(20*Math.log10(e))):0}function oi(e){return(Math.min(1,Math.max(0,e))*2-1)*fg}const Wo={x:0,v:0};function bg(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const r=hg,o=e.x-t,s=e.v+r*o,l=Math.exp(-r*n),u=t+(o+s*n)*l,d=(e.v-r*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:d}}function yg(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Sc="netcomposer.studio.vu.v1";function wg(e){try{return e?.getItem(Sc)==="1"}catch{return!1}}function vg(e,t){try{e?.setItem(Sc,t?"1":"0")}catch{}}const Ac="netcomposer.studio.vu-fold.v1";function xg(e){try{return e?.getItem(Ac)==="1"}catch{return!1}}function $g(e,t){try{e?.setItem(Ac,t?"1":"0")}catch{}}const kg="http://www.w3.org/2000/svg",Cr=200,Xa=112,Mt=Cr/2,hn=132,Yo=100,Eg=108,Sg=105,Ag=116,Mg=103,Tg=112,ze=(e,t)=>{const n=document.createElementNS(kg,e);for(const[a,r]of Object.entries(t))n.setAttribute(a,String(r));return n},Ko=e=>Math.round(e*100)/100;function fn(e,t){const n=oi(Ec(e))*Math.PI/180;return[Ko(Mt+t*Math.sin(n)),Ko(hn-t*Math.cos(n))]}function Xo(e,t,n){const[a,r]=fn(e,n),[o,s]=fn(t,n);return`M ${a} ${r} A ${n} ${n} 0 0 1 ${o} ${s}`}const Lg=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function Jo(e){const t=ze("svg",{class:"vu-meter",viewBox:`0 0 ${Cr} ${Xa}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(ze("rect",{class:"vu-face",x:.5,y:.5,width:Cr-1,height:Xa-1,rx:4})),t.append(ze("path",{class:"vu-arc",d:Xo(dg,0,Yo)})),t.append(ze("path",{class:"vu-zone",d:Xo(0,kc,Mg)}));for(const o of ug){const[s,l]=fn(o,Yo),[u,d]=fn(o,Go.includes(o)?Eg:Sg);t.append(ze("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:d}))}for(const o of Go){const[s,l]=fn(o,Ag),u=ze("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?Lg(o):String(Math.abs(o)),t.append(u)}const n=ze("text",{class:"vu-legend",x:Mt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=ze("text",{class:"vu-side",x:10,y:Xa-10});a.textContent=e;const r=ze("line",{class:"vu-needle",x1:Mt,y1:hn,x2:Mt,y2:hn-Tg,transform:`rotate(${oi(0)} ${Mt} ${hn})`});return t.append(n,a,r),{svg:t,needle:r}}function Cg(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const r=document.createElement("span");r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r),a.setAttribute("data-nc-help",K["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",K["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",K["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(g=>{const w=document.createElement("span");w.className="vu-bar",w.dataset.side=g;const E=document.createElement("span");return E.className="vu-bar-fill",w.append(E),l.append(w),E});let d=e.folded;const c=()=>{t.toggleAttribute("data-folded",d),a.setAttribute("aria-expanded",d?"false":"true"),a.setAttribute("aria-label",d?"Expand VU meters":"Minimize VU meters"),a.title=d?"Expand":"Minimize"};c(),a.addEventListener("click",()=>{d=!d,c(),e.onFold(d)});const p=Jo("L"),h=Jo("R");t.append(n,p.svg,h.svg,l);const m=matchMedia("(prefers-reduced-motion: reduce)"),b=[Wo,Wo],y=[Number.NaN,Number.NaN],f=[p.needle,h.needle];return{el:t,frame(g,w){let E=!1;for(const C of[0,1]){const S=g?gg(g[C]):0;b[C]=bg(b[C],S,w,m.matches),(!yg(b[C],S)||S>0)&&(E=!0);const v=Math.round(oi(b[C].x)*10)/10;v!==y[C]&&(y[C]=v,f[C].setAttribute("transform",`rotate(${v} ${Mt} ${hn})`),u[C].style.transform=`scaleY(${Math.max(0,Math.min(1,b[C].x)).toFixed(3)})`,t.dataset[C===0?"vuL":"vuR"]=v.toFixed(1))}return E}}}const Ng="netcomposer.studio.hidden.v1",_n=1/120,Pe="master",Qo="Inserts",Fg="(max-width: 768px)",Mc=8,Vn=e=>Bm(uc(e)),Zo=e=>{const t=Vn(e);return t==="−∞"?"off":`${t} dB`};function zg(e,t){return Lt.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function Pg(e,t,n){const a=n.bpm,r=$=>{const M=n.order(),L=M.indexOf($);return L<0?M.length:L},o=($,M,L,R)=>{const F=zg(L,R);if(!F||!M)return null;const W=Number(M.getParam(L,R)??F.default),V=`mix-${$}-${R}`;return F.options?{type:"select",id:V,label:F.label,value:String(W),options:F.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>{M.setParam(L,R,Number(z)),X.render()}}:{type:"slider",id:V,label:F.label,min:F.min,max:F.max,step:F.step??1,taper:ro(F),value:W,valueText:F.format(W,a()),onChange:z=>{M.setParam(L,R,z),X.render()}}},s=($,M,L,R)=>R.map(F=>o($,M,L,F)).filter(F=>F!==null),l=matchMedia(Fg);let u=null;const d=$=>{u=$,X.render()},c=$=>d(u===$?null:$);l.addEventListener("change",()=>X.render());const p=($,M,L,R)=>{$.setParam(M,L,R),X.render()},h=($,M,L,R)=>Yu(M,L,{id:`hack-${$}-${L}-graph`,on:R,set:(F,W)=>p(M,L,F,W),help:{graph:K["eq:graph"],low:K["eq:low"],mid:K["eq:mid"],high:K["eq:high"]}}),m=($,M,L,R)=>{const F=Number(M.getParam(L,R.key)??R.default),W=`hack-${$}-${L}-${R.key}`,V=z=>p(M,L,R.key,z);return R.options?{type:"select",id:W,label:R.label,value:String(F),options:R.options.map(z=>({value:String(z.value),label:z.label})),onChange:z=>V(Number(z))}:{type:"slider",id:W,label:R.label,min:R.min,max:R.max,step:R.step??.001,taper:ro(R),value:F,valueText:xs(R,F,a()),onChange:V}},b="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let f=wm(be(),`${Pe}/${sc}`);const g=$=>({folded:f.has($),onFold:M=>{f=ic(be(),$,M),X.render()},foldHelp:K["fx:fold"]}),w=n.plugins;w?.onChange(()=>X.render());const E=new Map,C=$=>String($?.message??$).replace(/^nc-fx plugins?: /,""),S=($,M,L)=>{E.set($,M),X.render(),nn({message:L,duration:9e3,anchor:ie.el.querySelector(`[data-nc-id='hack-${$}-add']`)})},v=($,M)=>{const L=nn({message:M,duration:12e3,actionLabel:P.reloadAction,onAction:()=>location.reload(),anchor:ie.el.querySelector(`[data-nc-id='hack-${$}-add']`)});L.el.dataset.pluginReload=$},x=$=>re($)?.label??$,A=$=>!!$&&$.startsWith("plugin:")&&!!w?.stale($.slice(7)),k=async($,M,L)=>{if(!w)return null;const R=L??await Fp({title:P.urlTitle,body:P.urlBody,field:{label:P.urlField,placeholder:w.remote?P.urlPlaceholder:P.urlPlaceholderLocal,type:"url"},confirmLabel:P.urlNext,returnFocus:M??void 0});if(!R)return null;const F=tg(R,location.href,w.remote);if(!F)return S($,P.badUrlShort,w.remote?P.badUrl:P.badUrlLocal),null;if(!await qe({title:P.warnTitle,body:P.warnBody(Zt(F)),confirmLabel:P.warnLoad,danger:!0,returnFocus:M??void 0}))return null;try{const V=await w.loadUrl(F);return A(V)&&v($,P.reloadToHear(x(V))),V}catch(V){return V?.reload?(E.set($,P.failedShort),X.render(),v($,C(V))):S($,P.failedShort,C(V)),null}},T=$=>{const M=document.createElement("input");return M.type="file",M.hidden=!0,M.dataset.ncId="plugin-files",$?M.webkitdirectory=!0:(M.multiple=!0,M.accept=".json,.js,.mjs,application/json,text/javascript"),document.body.append(M),new Promise(L=>{const R=F=>{M.remove(),L(F)};M.addEventListener("change",()=>R(M.files?.length?[...M.files]:null)),M.addEventListener("cancel",()=>R(null)),M.click()})},N=async($,M,L)=>{if(!w)return null;const R=await T(L);if(!R)return null;let F;try{F=await Pm(R)}catch(V){return S($,P.failedShort,C(V)),null}if(!await qe({title:P.warnTitle,body:P.fileWarnBody(F.manifest.name,F.manifest.author),confirmLabel:P.warnLoad,danger:!0,returnFocus:M??void 0}))return null;try{const V=await w.addPicked(F);return"reload"in V?(v($,P.reloadToUse(F.manifest.name,F.manifest.version)),null):V.type}catch(V){return S($,P.failedShort,C(V)),null}},q=async($,M,L)=>{if(!w)return;const R=w.local().find(W=>W.id===M)?.name??M;await qe({title:P.forgetTitle(R),body:P.forgetBody,confirmLabel:P.forgetConfirm,danger:!0,returnFocus:L??void 0})&&(await w.forget(M),nn({message:P.forgotten(R),duration:5e3,anchor:ie.el.querySelector(`[data-nc-id='hack-${$}-add']`)}))},_=async($,M,L,R)=>{E.delete($);let F=L;if(L===Ga||L===Vo)F=await N($,R,L===Ga);else if(L.startsWith(Ya))await q($,L.slice(Ya.length),R),F=null;else if(L.startsWith(Wa)&&w){X.render();try{F=await w.loadKept(L.slice(Wa.length)),A(F)&&v($,P.reloadToHear(x(F)))}catch(W){S($,P.failedShort,C(W)),F=null}}else if(L===Uo)F=await k($,R);else if(L.startsWith(Ka)&&w){X.render();try{F=await w.loadListed(L.slice(Ka.length))}catch(W){S($,P.failedShort,C(W)),F=null}}F&&M.addEffect(F,{dials:y[F]}),X.render()},U=()=>w?[...w.listed().map($=>({value:`${Ka}${$.id}`,label:$.name,group:"Plugins"})),...w.local().map($=>({value:`${Wa}${$.id}`,label:P.kept($.name),group:"Plugins"})),...w.loaded().map($=>({value:$.type,label:`${$.label} (${Zt($.plugin.url)})`,group:"Plugins"})),{value:Ga,label:P.folder,group:"Plugins"},{value:Vo,label:P.files,group:"Plugins"},{value:Uo,label:P.url,group:"Plugins"},...w.local().map($=>({value:`${Ya}${$.id}`,label:P.forget($.name),group:"Plugins"}))]:[];let ce=null,de=null,J=null;const Q=$=>t.masterFx===$||t.list().some(M=>M.fx===$),B=$=>requestAnimationFrame(()=>ie.el.querySelector($)?.focus()),Se=($,M,L,R,F,W,V)=>{const z=Jm(L.getState(),R);if(!z||!L.removeEffect(R))return;const se=!!V&&V===document.activeElement;if(J?.close(),X.render(),se){const it=L.getChain()[z.index];B(it?`[data-nc-id='hack-${$}-${it.id}'] [data-nc-fx-remove]`:`#hack-${$}-add-type`)}const j=nn({message:`${F} removed from ${M}.`,actionLabel:"Undo",anchor:ie.el.querySelector("[data-nc-area='fx']"),onAction:()=>H($,L,z,W),onClose:()=>{J===j&&(J=null)}});j.el.dataset.insertUndo=$,J=j},H=($,M,L,R)=>{if(!Q(M))return;const F=Qm(M.getState(),L,R);let W=L.slot.id;if(F)M.setState(F);else{const{type:V,dials:z,bypass:se}=L.slot;W=M.addEffect(V,{index:L.index,dials:z,bypass:se})}W&&(u=$,de=`hack-${$}-${W}`,X.render(),B(`[data-nc-id='hack-${$}-${W}'] [data-nc-fx-remove]`))},pe=($,M,L,R)=>{const F=L.getChain(),W=F.map((z,se)=>{const j=re(z.type),it=j?.dials??[],Ti=oe=>Se($,M,L,z.id,z.name,R,oe),Li=oe=>{L.moveEffect(z.id,oe),de=`hack-${$}-${z.id}`,X.render()},Yt=[];se>0&&Yt.push({type:"button",id:`hack-${$}-${z.id}-left`,label:"Move left",on:!1,onPress:()=>Li(se-1)}),se<F.length-1&&Yt.push({type:"button",id:`hack-${$}-${z.id}-right`,label:"Move right",on:!1,onPress:()=>Li(se+1)}),Yt.push({type:"button",id:`hack-${$}-${z.id}-remove`,label:"Remove",ariaLabel:`Remove ${z.name} from ${M}`,on:!1,onPress:()=>Ti(document.getElementById(`hack-${$}-${z.id}-remove`))});const Ci={onRemove:oe=>Ti(oe),removeLabel:`Remove ${z.name}`},ne=z.plugin,ve=(oe,ot,yt=!1)=>({type:"note",id:`hack-${$}-${z.id}-${oe}`,...yt?{tone:"danger"}:{},text:ot});if(ne&&ne.status==="missing"){const oe=w?.listingFor(ne)??null,ot=oa(ne.url),yt=ot&&!!w?.local().some(Tn=>Tn.id===ne.id),Ni=w?.loading(ne.id)??!1,Fi=Ni?[ve("missing",P.loading)]:[ve("missing",w?.frozen(ne.id)?P.frozenShort:ot&&!yt?P.notKept:ne.url?P.missing:P.missingNoUrl,!0),ve("through",P.through),ve("kept",P.dialsKept),...ne.url?[ve("from",P.from(Zt(ne.url)))]:[]];return w&&ne.url&&!Ni&&Fi.push({type:"button",id:`hack-${$}-${z.id}-load`,label:oe||yt?P.load:ot?P.pickAgain:P.loadAsk,ariaLabel:oe||yt?`Load ${ne.name}`:ot?`Pick ${ne.name}'s folder (asks first)`:`Load ${ne.name} from ${Zt(ne.url)} (asks first)`,on:!1,onPress:()=>{const Tn=document.getElementById(`hack-${$}-${z.id}-load`);oe?w.loadListed(ne.id).catch(()=>X.render()):yt?w.loadKept(ne.id).catch(()=>X.render()):ot?N($,Tn,!0).then(()=>X.render()):k($,Tn,ne.url)}}),{type:"fx",id:`hack-${$}-${z.id}`,title:`${se+1} · ${z.name}`,...g(`${$}/${z.id}`),depth:se%4+1,controls:Fi,more:Yt,...Ci}}const bt=j&&"plugin"in j?j.plugin:void 0,fd=bt?[ve("by",`By ${bt.author}`),ve("version",`${bt.licence} · ${bt.version}`),ve("source",bt.listed?"Listed":P.from(Zt(bt.url)))]:[],md=ne?.status==="failed"?[ve("failed",eg(ne.error),!0),ve("through",P.through),ve("retry",P.retry)]:ne&&w?.stale(ne.id)?[ve("newcode",P.newCode)]:[];return{type:"fx",id:`hack-${$}-${z.id}`,title:`${se+1} · ${z.name}`,...g(`${$}/${z.id}`),depth:se%4+1,on:!z.bypass,meter:Ra(L,z.id)??void 0,meterHelp:K["fx:meter"],onToggle:oe=>{L.setParam(z.id,"bypass",!oe),X.render()},controls:[...md,...z.type==="eq"?[h($,L,z.id,!z.bypass)]:[],...it.filter(oe=>!oe.more).map(oe=>m($,L,z.id,oe))],maxHelp:K["fx:max"],...Ci,more:[...it.filter(oe=>oe.more).map(oe=>m($,L,z.id,oe)),...fd,...Yt]}}),V=F.length>=R;return W.push({type:"fx",id:`hack-${$}-add`,title:`${M} · Inserts`,...g(`${$}/add`),depth:F.length%4+1,controls:[{type:"note",id:`hack-${$}-note`,...E.get($)?{tone:"danger"}:{},text:E.get($)??(w?.loading("url")||w?.listed().some(z=>w.loading(z.id))||w?.local().some(z=>w.loading(z.id))?P.loading:V?`${F.length} of ${R}: the stack is full.`:F.length===0?"No effects yet.":`${F.length} of ${R}, first to last.`)},...V?[]:[{type:"select",id:`hack-${$}-add-type`,label:"Add",value:b,options:[{value:b,label:"Effect…"},...jd.map(z=>({value:z,label:re(z)?.label??z})),...U()],onChange:z=>{if(z===b)return;const se=document.getElementById(`hack-${$}-add-type`);se instanceof HTMLSelectElement&&(se.value=b),_($,L,z,se)}}]]}),W},fe=$=>{const M=t.returns[$];return{type:"slider",id:`mix-${$}-return`,label:"Return",min:0,max:1,step:_n,value:M.level,valueText:Zo(M.level),onChange:L=>t.setReturn($,{level:L})}};let ue=ag(be(),rg(globalThis.window,{portrait:jl,landscape:Gs})),Ne=lg(be(),n.order());const pd=()=>[...t.list()].sort(($,M)=>r($.id)-r(M.id)).map($=>({type:"strip",id:`strip-${$.id}`,label:$.name,value:$.strip.position,valueText:Vn($.strip.position),step:_n,defaultValue:Lr,resetText:`${Vn(Lr)} dB`,ticks:[...Bo],mute:$.strip.mute,solo:$.strip.solo,silent:$.silent,sendsHidden:!ue,onChange:M=>t.set($.id,{position:M}),onTypeIn:M=>{const L=jo(M);L!==null&&t.set($.id,{position:L})},onRemove:M=>n.onRemove($.id,M),folded:Ne.has($.id),onFold:M=>{Ne=$c(be(),$.id,M),X.render()},foldHelp:K["strip:fold"],foldedHelp:K["strip:folded"],...$.fx?{hacks:u===$.id,hacksLabel:Qo,hacksEmpty:$.fx.getChain().length===0,onHacks:()=>c($.id)}:{},pan:{id:`pan-${$.id}`,value:$.strip.pan,ariaLabel:`${$.name} pan`,help:K["strip:pan"],onChange:M=>t.set($.id,{pan:Math.abs(M)<.005?0:M})},onMute:()=>t.set($.id,{mute:!$.strip.mute}),onSolo:()=>t.set($.id,{solo:!$.strip.solo}),sends:["A","B"].map(M=>{const L=M==="A"?"sendA":"sendB",R=$.strip[L];return{id:`send-${M.toLowerCase()}-${$.id}`,label:M,ariaLabel:`${$.name} send ${M}`,min:0,max:Le,step:_n*2,value:R,valueText:Zo(R),defaultValue:0,onChange:F=>t.set($.id,{[L]:F})}})})),hd=()=>({type:"strip",id:`strip-${Pe}`,label:"Master",master:!0,sendsHidden:!ue,...t.masterFx?{hacks:u===Pe,hacksLabel:Qo,hacksEmpty:t.masterFx.getChain().length===0,onHacks:()=>c(Pe)}:{},channels:2,value:t.masterPositionValue,valueText:Vn(t.masterPositionValue),step:_n,defaultValue:Le,resetText:"0.0 dB",ticks:[...Bo],onChange:$=>t.setMaster($),onTypeIn:$=>{const M=jo($);M!==null&&t.setMaster(M)}});let vi=tc(be());const xi=$=>({folded:vi[$],foldSlim:!0,onFold:M=>{vi=nc(be(),$,M),X.render()},foldHelp:K["fx:fold"]});let Gt=wg(be()),gt=null,Wt=!0;const $i=$=>{Gt=$,Wt=!0,vg(be(),$),X.render()},ki=()=>{const $=t.returns.a,M=t.returns.b,L=u===Pe&&t.masterFx?{id:Pe,name:"Master",fx:t.masterFx}:(()=>{const j=t.list().find(it=>it.id===u);return j?.fx?{id:j.id,name:j.name,fx:j.fx}:null})();L||(u=null);const R=t.masterFx?.getChain()??[],F=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:$.on,onToggle:j=>t.setReturn("a",{on:j}),meter:Ra($.fx)??void 0,meterHelp:K["fx:meter-return"],...xi("a"),controls:[fe("a"),...s("a",$.fx,"plate",["decay","size"])],more:s("a",$.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:M.on,onToggle:j=>t.setReturn("b",{on:j}),meter:Ra(M.fx)??void 0,meterHelp:K["fx:meter-return"],...xi("b"),controls:[fe("b"),...s("b",M.fx,"delay",["delay_beats","feedback"])],more:s("b",M.fx,"delay",["tone","low_cut"])}],W=L?[...L.id===Pe&&l.matches&&ue?F:[],...pe(L.id,L.name,L.fx,L.id===Pe?Mr:Mc)]:ue?F:[],V=L?.id??"sends",z=W.map(j=>j.id),se=Xm(ce,V,z,de);return ce={key:V,ids:z,page:se},de=null,{id:"mix",title:"Mix",summary:`${t.list().map(j=>j.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${R.filter(j=>!j.bypass).map(j=>j.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...pd(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(j=>({value:j.id,label:j.available===!1?`${j.name} (soon)`:j.name,disabled:j.available===!1})),onAdd:j=>n.onAdd(j)}]},{id:"fx",area:"fx",label:L?`${L.name} inserts`:"Send effects",pageSize:ka,page:se,onPage:j=>{ce&&(ce={...ce,page:j})},controls:W},...Gt?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[hd()]}]}},ie=Vf(ki(),Ng),Ei=()=>ie.el.toggleAttribute("data-hacks-folded",u===null&&l.matches);Ei();const $e=document.createElement("button");$e.type="button",$e.className="nc-page-action vu-add",$e.dataset.vuAdd="",$e.textContent="+ Meters",$e.setAttribute("aria-label","Add VU meters"),$e.setAttribute("data-nc-help",K["vu:add"]),$e.addEventListener("click",()=>{$i(!0),gt?.el.querySelector("[data-vu-remove]")?.focus()}),ie.el.querySelector(".nc-module-end")?.prepend($e);const Fe=document.createElement("button");Fe.type="button",Fe.className="nc-page-action sends-toggle",Fe.dataset.sendsToggle="",Fe.setAttribute("data-nc-help",K["sends:toggle"]),Fe.addEventListener("click",()=>{ue=!ue,ig(be(),ue),X.render()}),$e.after(Fe);const Si=()=>{const{text:$,aria:M}=og(ue);Fe.textContent!==$&&(Fe.textContent=$),Fe.setAttribute("aria-label",M),ie.el.toggleAttribute("data-sends-hidden",!ue)};Si();const Ai=()=>{$e.hidden=Gt;const $=ie.el.querySelector('[data-nc-section="meters"]');!Gt||!$||(gt??=Cg({onRemove:()=>{$i(!1),$e.focus()},folded:xg(be()),onFold:M=>{Wt=!0,$g(be(),M)}}),gt.el.parentElement!==$&&$.append(gt.el))};Ai(),Dg(ie.el,n),Rg(ie.el,t,n),ns(ie.el),ts(ie.el),Gf(e,[ie],"adjacent");const Mi=$=>({peak:_o($.peak),rms:_o($.rms),over:$.peak>=Hm}),X={module:ie,get hacksShown(){return u},showHacks:d,render(){ie.update(ki()),Ei(),Ai(),Si(),ns(ie.el),ts(ie.el)},frame($){if(ie.el.dataset.ncOpen!=="true")return;for(const L of t.list())Mo(ie.el,`strip-${L.id}`)?.update([Mi(L.levels())],$);const M=t.masterLevels();if(Mo(ie.el,`strip-${Pe}`)?.update(M.map(Mi),$),gt&&Gt){const L=t.ctx.state==="running";L&&(Wt=!0),Wt&&(Wt=gt.frame(L?[M[0].rms,M[1].rms]:null,$))}}};return X}const Ja="application/x-nc-strip",_t=".nc-strip:not([data-nc-master])",es=`${_t}, .nc-strip-add`,Gn=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function ts(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?K["inserts:master"]:K["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",K["mix:sends"])}function ns(e){for(const t of e.querySelectorAll(`${_t} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",K["strip:name"]);for(const t of e.querySelectorAll(`${_t} :is(.nc-strip-hd, .nc-strip-fold)`))!(t instanceof HTMLElement)||t.draggable||t.hasAttribute("data-renaming")||(t.draggable=!0,t.title="Drag to move this channel")}function Rg(e,t,n){e.addEventListener("dblclick",a=>{const r=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=r?.closest(_t),s=Gn(o??null),l=r?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??r.textContent??"",d=document.createElement("input");d.type="text",d.className="nc-strip-name-input",d.value=u,d.maxLength=Xl,d.spellcheck=!1,d.autocomplete="off",d.setAttribute("aria-label",`Rename ${u}`),d.setAttribute("data-nc-help",K["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(d,r),d.focus(),d.select();let c=!1;const p=h=>{if(c)return;c=!0;const m=d.value;d.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,h&&m!==u&&n.onRename?.(s,m)};d.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),d.addEventListener("blur",()=>p(!0)),d.addEventListener("click",h=>h.stopPropagation()),d.addEventListener("dragstart",h=>h.preventDefault())})}function Dg(e,t){const n=()=>{for(const r of e.querySelectorAll("[data-drop]"))r.removeAttribute("data-drop");for(const r of e.querySelectorAll("[data-dragging]"))r.removeAttribute("data-dragging")},a=(r,o)=>{const s=r.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};e.addEventListener("dragstart",r=>{const s=(r.target instanceof Element?r.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(_t),l=Gn(s??null);!l||!r.dataTransfer||!(s instanceof HTMLElement)||(r.dataTransfer.setData(Ja,l),r.dataTransfer.effectAllowed="move",r.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),e.addEventListener("dragover",r=>{if(!r.dataTransfer?.types.includes(Ja))return;const o=r.target instanceof Element?r.target.closest(es):null;if(!(o instanceof HTMLElement))return;r.preventDefault(),r.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":a(o,r.clientX);if(o.getAttribute("data-drop")!==s){for(const l of e.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),e.addEventListener("drop",r=>{const o=r.dataTransfer?.getData(Ja),s=r.target instanceof Element?r.target.closest(es):null;if(!o||!(s instanceof HTMLElement))return n();if(r.preventDefault(),s.matches(".nc-strip-add")){n(),t.onReorder?.(o,null);return}const l=Gn(s),u=a(s,r.clientX);if(n(),!l||l===o)return;let d=l;if(u==="after"){const c=[...e.querySelectorAll(_t)],p=c[c.indexOf(s)+1];if(d=p?Gn(p):null,d===o)return}t.onReorder?.(o,d)}),e.addEventListener("dragend",n)}const Og=1e-5,Ig=2e3,qg=500,mn={parked:!1,quietSince:null};function _g(e,t,n,a){if(t)return mn;if(e.parked)return e;if(!(n<Og))return mn;const r=e.quietSince??a;return{parked:a-r>=Ig,quietSince:r}}const Ke=.012,Qa=1024;class Bg{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;park={a:mn,b:mn};masterPosition=Le;channels=[];listeners=new Set;scratch=new Float32Array(Qa);restore;channelFx;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Qa});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:Xe(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,lc),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const r=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(r),r.connect(this.masterMeters[0],0),r.connect(this.masterMeters[1],1);const o=s=>{const l=new GainNode(t,{gain:1}),u=n.fx?.(s)??null,d=new GainNode(t,{gain:Xe(Le)}),c=a();return u?(l.connect(u.input),u.output.connect(d)):d.gain.value=0,d.connect(c),d.connect(this.bus),{bus:l,fx:u,gain:d,meter:c,on:u!==null,level:Le}};this.returns={a:o("a"),b:o("b")}}attach(t,n){let a=this.channels.find(r=>r.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const r=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Qa}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),d=this.channelFx?.(t)??null;d?(r.connect(d.input),d.output.connect(o)):r.connect(o);const c=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),h=new GainNode(this.ctx,{gain:1}),m=new GainNode(this.ctx,{gain:1}),b=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(c).connect(p),p.connect(h,0).connect(b,0,0),p.connect(m,1).connect(b,0,1),b.connect(this.bus),b.connect(l).connect(this.returns.a.bus),b.connect(u).connect(this.returns.b.bus),a={id:t,name:n,input:r,fader:o,stereo:c,split:p,balL:h,balR:m,panner:b,meter:s,sendA:l,sendB:u,fx:d,strip:this.restore?.(t)??hc},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(r=>r.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(r=>r.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const r of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])r.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const r=this.channels.find(o=>o.id===t);return r?a(r.fx):null}set(t,n){const a=this.channels.find(r=>r.id===t);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(Xe(t),this.ctx.currentTime,Ke),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],r=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,r,Ke),this.wakeFed()),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(Xe(a.level),r,Ke)),this.emit()}fed(t){const n=this.returns[t];if(!n.on||!n.fx)return!1;const a=t==="a"?"sendA":"sendB";return this.channels.some(r=>Xe(r.strip[a])>0)}setParked(t,n){const a=this.returns[t];a.fx&&(n?(a.bus.disconnect(a.fx.input),a.fx.output.disconnect(a.gain)):(a.bus.connect(a.fx.input),a.fx.output.connect(a.gain)))}wakeFed(){for(const t of["a","b"])this.park[t].parked&&this.fed(t)&&(this.park[t]=mn,this.setParked(t,!1))}parkIdleReturns(t=performance.now()){for(const n of["a","b"]){const a=this.park[n],r=_g(a,this.fed(n),a.parked?0:this.levelsOf(this.returns[n].meter).peak,t);this.park[n]=r,r.parked!==a.parked&&this.setParked(n,r.parked)}}returnParked(t){return this.park[t].parked}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}apply(){const t=jm(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,r)=>{a.fader.gain.setTargetAtTime(t[r]??0,n,Ke),a.sendA.gain.setTargetAtTime(Xe(a.strip.sendA),n,Ke),a.sendB.gain.setTargetAtTime(Xe(a.strip.sendB),n,Ke);const[o,s]=Vm(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,Ke),a.balR.gain.setTargetAtTime(s,n,Ke)}),this.wakeFed()}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),Um(this.scratch)}emit(){for(const t of this.listeners)t()}}const si="studio";function jg(){let e=null;const t=new Set,n=new Set,a=new Set,r=new Map,o=d=>{try{return r.get(d)?.()===!0}catch{return!1}},s=d=>{for(const c of[...d])try{c()}catch{}},l=d=>{if(d!==e){e=d;for(const c of n)c()}},u=(d,c)=>(d.add(c),()=>{d.delete(c)});return{owner:()=>e,claim(d){e===null&&l(d)},claimAll(){l(si),s(t)},clear:()=>l(null),onAll:d=>u(t,d),member(d,c){return r.set(d,c),()=>{r.get(d)===c&&r.delete(d)}},out(d){for(const c of r.keys())if(c!==d&&o(c))return;s(a)},drop:d=>{r.delete(d)},onLastOut:d=>u(a,d),playing:()=>[...r.keys()].filter(o),onChange:d=>u(n,d)}}const as="netcomposer.studio.plugins.frozen.v1",Hg=2e3;function Ug(e,t){const n=[],a=new Set;for(const r of t)r.plugin?.status!=="failed"||r.plugin.error!==Xn[6]||(a.add(r.id),e.has(r.id)||n.push(r));for(const r of[...e])a.has(r)||e.delete(r);for(const r of a)e.add(r);return n}function Vg(e){const t=new Map;for(const n of e)for(const a of n)a.plugin?.status==="ready"&&!t.has(a.plugin.id)&&t.set(a.plugin.id,a.plugin.name);return[...t].map(([n,a])=>({id:n,name:a}))}function Gg(e){let t=[];const n=()=>{if(!e)return t;try{const r=JSON.parse(e.getItem(as)??"[]");return Array.isArray(r)?r.filter(o=>typeof o=="string"):[]}catch{return[]}},a=r=>{t=r;try{e?.setItem(as,JSON.stringify(r))}catch{}};return{has:r=>n().includes(r),list:n,add(r){a([...new Set([...n(),...r])])},clear(r){const o=n();o.includes(r)&&a(o.filter(s=>s!==r))}}}function Wg(e){let t=!1;const n=(e.watch??xu)(e.ctx,{stallMs:e.stallMs??Hg,onStall:()=>{if(t)return;const a=e.running();a.length&&(t=!0,n.stop(),e.onFrozen(a))}});return{stop:()=>n.stop()}}const Yg="audio/wav";function Kg(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function Xg(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let r=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[r++]=u&255,a[r++]=u>>8&255,a[r++]=u>>16&255}return a}function Jg(e,t){const r=e*2*3,o=new ArrayBuffer(44),s=new DataView(o),l=(u,d)=>{for(let c=0;c<4;c++)s.setUint8(u+c,d.charCodeAt(c))};return l(0,"RIFF"),s.setUint32(4,36+r,!0),l(8,"WAVE"),l(12,"fmt "),s.setUint32(16,16,!0),s.setUint16(20,1,!0),s.setUint16(22,2,!0),s.setUint32(24,t,!0),s.setUint32(28,t*2*3,!0),s.setUint16(32,6,!0),s.setUint16(34,24,!0),l(36,"data"),s.setUint32(40,r,!0),new Uint8Array(o)}class Qg{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(Xg(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([Jg(this.frames,n),...this.parts],{type:Yg});this.finish({blob:a,name:Kg(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const Tc="netcomposer.studio.picker.v1",rs="http://127.0.0.1:5177",Zg=1,Ft=16,is=64*1024*1024,os=[1e3,2e3,5e3,1e4],eb=new Set(["127.0.0.1","localhost","[::1]"]);function li(e){if(typeof e!="string"||!e||e.length>64)return null;let t;try{t=new URL(e)}catch{return null}return t.protocol!=="http:"||!eb.has(t.hostname)||!t.port||t.username||t.password||e.replace(/\/$/,"")!==t.origin?null:t.origin}function Lc(e){try{const t=JSON.parse(e?.getItem(Tc)??"null"),n=t&&typeof t=="object"?t:{};return{on:n.on===!0,address:li(n.address)??rs}}catch{return{on:!1,address:rs}}}function Nr(e,t){try{e?.setItem(Tc,JSON.stringify(t))}catch{}}function tb(e){let t=[];try{const n=e.pads();Array.isArray(n)&&(t=n)}catch{}return Array.from({length:Ft},(n,a)=>{const r=t[a]&&typeof t[a]=="object"?t[a]:{};return{pad:a+1,name:typeof r.name=="string"?r.name.slice(0,40):"",filled:r.filled===!0}})}const Za=e=>({ok:!1,placed:[],left:[],message:e}),er=e=>Array.isArray(e)?e.filter(t=>Number.isInteger(t)&&t>=1&&t<=Ft).slice(0,16):[];function nb(e){const t=e&&typeof e=="object"?e:{};return{ok:t.ok===!0,placed:(Array.isArray(t.placed)?t.placed:[]).flatMap(n=>{const a=n&&typeof n=="object"?n:{},[r]=er([a.from]),[o]=er([a.to]);return r&&o?[{from:r,to:o}]:[]}).slice(0,Ft),left:er(t.left),message:typeof t.message=="string"?t.message.slice(0,400):""}}function ab(e){const t=e&&typeof e=="object"?e:{};return t.type!=="kit"||typeof t.id!="string"||!/^[\w-]{1,40}$/.test(t.id)||typeof t.target!="string"||!t.target||t.target.length>64?null:{id:t.id,target:t.target,mode:t.mode==="fill"?"fill":"replace"}}function rb(e){const t=new Map,n=new Map,a=new Set,r=new Map,o=e.now??(()=>Date.now()),s=e.setTimeout??((k,T)=>setTimeout(k,T)),l=e.clearTimeout??(k=>clearTimeout(k)),u=k=>e.live?.(k)??!0;let d="off",c="",p=0,h=null,m=null,b="";const y=k=>{k!==d&&(d=k,e.onStatus?.(k))},f=()=>[...t.entries()].filter(([k])=>u(k)).map(([k,T])=>{const N=e.brandOf?.(k);return{id:k,name:(e.nameOf?.(k)??k).slice(0,40),...N?{brand:N.slice(0,40)}:{},shown:e.shown?.()===k,seen:n.get(k)??0,pads:tb(T)}}),g=k=>{const T=f();return b=JSON.stringify(T),JSON.stringify({v:Zg,studio:e.studio,label:(e.label?.()??"Studio").slice(0,60),targets:T,results:[...r.entries()].map(([N,q])=>({id:N,...q})),wait:k})},w=(k,T)=>e.fetch(`${c}/api/studio/poll`,{method:"POST",headers:{"content-type":"application/json"},body:g(k),cache:"no-store",...T?{signal:T}:{},targetAddressSpace:"loopback"}),E=async(k,T)=>{if(!k.ok)throw new Error(`the picker said ${k.status}`);const N=await k.json();if(T!==p)return;if(y("on"),Array.isArray(N.ack))for(const _ of N.ack)typeof _=="string"&&r.delete(_);const q=Array.isArray(N.commands)?N.commands:[];for(const _ of q.slice(0,4)){const U=ab(_);U&&x(U,T)}},C=async k=>{let T=0,N=!1;for(;k===p;){const q=new AbortController;h=q;try{await E(await w(N,q.signal),k),T=0,N=!0}catch{if(k!==p)return;N=!1,y("away");const _=os[Math.min(T++,os.length-1)];await new Promise(U=>s(U,_))}}},S=()=>{!c||m!==null||(m=s(()=>{m=null;const k=p;!c||d!=="on"||!r.size&&JSON.stringify(f())===b||w(!1).then(T=>E(T,k)).catch(()=>{})},150))},v=async k=>{const T=await e.fetch(k,{cache:"no-store",targetAddressSpace:"loopback"});if(!T.ok){const N=await T.json().catch(()=>({}));throw new Error(typeof N.error=="string"?N.error.slice(0,120):`the picker said ${T.status}`)}return T},x=async(k,T)=>{if(r.has(k.id))return;let N;const q=t.get(k.target);if(!q||!u(k.target))N=Za("That NYX isn't in the Studio any more.");else if(a.has(k.target))N=Za("NYX is still loading the last kit.");else{a.add(k.target);try{const _=await(await v(`${c}/api/kit/manifest`)).json(),U=Array.isArray(_.sounds)?_.sounds:[];if(!U.length)throw new Error("the picker's pads are empty");if(U.length>Ft)throw new Error(`more than ${Ft} sounds`);const ce={};for(const de of U){const J=de&&typeof de=="object"?de.pad:null;if(typeof J!="number"||!Number.isInteger(J)||J<1||J>Ft||ce[J])throw new Error("a sound has no pad of its own");const Q=await v(`${c}/api/kit/audio?pad=${J}`);if(Number(Q.headers.get("content-length")??0)>is)throw new Error(`pad ${J}'s sound is too big`);const B=await Q.arrayBuffer();if(B.byteLength>is)throw new Error(`pad ${J}'s sound is too big`);ce[String(J)]=B}if(T!==p)return;e.reveal?.(k.target),N=nb(await q.receive(_,k.mode,ce))}catch(_){N=Za(`Not loaded: ${_.message||"it went wrong"}.`)}finally{a.delete(k.target)}}T===p&&(r.set(k.id,N),S())},A=()=>{p++,h?.abort(),h=null,m!==null&&l(m),m=null,c="",r.clear(),y("off")};return{host(k){return{pickerTarget(T){return t.set(k,T),S(),{changed:S,remove(){t.get(k)===T&&t.delete(k),S()}}}}},start(k){const T=li(k);T&&(A(),c=T,y("connecting"),C(++p))},stop:A,seen(k){n.set(k,o()),t.has(k)&&S()},changed:S,forget(k){t.delete(k),n.delete(k),S()},targets:f,get status(){return d}}}const ib="NetComposer Studio",Be=[40,240],ob="nc-sync";function sb(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${ob}${n}`,locks:t?{request:(a,r,o)=>t.request(`${a}${n}`,r,o)}:null}}function lb(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const cb=.2,ss=.5;function db(e,t,n){const a=new kd({bpm:120,minBpm:Be[0],maxBpm:Be[1],timebase:"shared"}),r=new Rd({app:ib,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Be},startLeadSeconds:cb,...n?{startGate:()=>n(),gatedStartLeadSeconds:ss}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:r,async start(){o||(o=!0,await r.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:Ge()});return}const d=++s,c=Ge();l=!0;const p=()=>{d!==s||!l||(l=!1,r.isLeader&&!a.transport.running?(a.commitStart(Math.max(c,Ge())+ss,0),r.publishState()):a.play({at:Ge()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:Ge()})},setTempo:u=>a.setTempo({bpm:ub(u)}),playing:()=>a.transport.isPlayingAt(Ge()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,d=Ge();return u.isPlayingAt(d)?pb(u.beatAt(d)):null},beatPhase(){const u=a.transport,d=Ge();if(!u.isPlayingAt(d))return null;const c=u.beatAt(d);return c-Math.floor(c)},peers:()=>[...r.peers.values()]}}function ub(e){return Number.isFinite(e)?Math.min(Be[1],Math.max(Be[0],Math.round(e*10)/10)):120}function pb(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const Fr="netcomposer.scene",Cc=1,Nc="netcomposer.studio.tempo.v1",Fc="netcomposer.studio.scene-name.v1",la=120,ci="Untitled scene",hb=2*1024*1024;function Ea(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Be[1],Math.max(Be[0],Math.round(t*10)/10)):la}function mt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||ci}function fb(e){return{format:Fr,v:Cc,name:mt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:Ea(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function mb(e,t){if(e.length>hb)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==Fr)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const d of Array.isArray(a.instances)?a.instances:[]){if(!d||typeof d!="object")continue;const c=d.id;if(typeof c!="string")continue;const p=ni(c);if(!p||!t.includes(p.type)||o.has(c))continue;o.add(c);const h=d.name;s.push({id:c,type:p.type,name:Jl(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[d,c]of Object.entries(a.presets))o.has(d)&&(u[d]=c);return{ok:!0,scene:{format:Fr,v:Cc,name:mt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:Ea(l)},meter:[4,4],instances:s,mix:fc(a.mix??vn()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function gb(e){return`${mt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function bb(e){try{const t=e?.getItem(Nc);return t?Ea(Number(t)):la}catch{return la}}function zc(e,t){try{t?.setItem(Nc,String(Ea(e)))}catch{}}function yb(e){try{return mt(e?.getItem(Fc))}catch{return ci}}function Pc(e,t){try{t?.setItem(Fc,mt(e))}catch{}}const wb=300,vb=120*1e3;function xb(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function $b(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const r=t.channels;if(!Array.isArray(r)||r.length<1||r.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!r.every(xb))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=r[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(r.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>wb*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:r.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function ls(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function kb(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,r=e.answerMs??vb,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const d=e.brandOf?.(l);return{instance:l,name:a(l),...d?{brand:d}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:ls(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,d){const c=t.get(l);if(l===s||!c||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof d!="string"||!ls(c).some(b=>b.id===d))return{ok:!1,reason:"invalid",message:`No ${d} there.`};const p=$b(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let m;try{const b=await Promise.race([Promise.resolve(c.receive(h,d)),new Promise(y=>{m=setTimeout(()=>y({ok:!1,reason:"timeout",message:"No answer."}),r)})]);return!b||typeof b!="object"||typeof b.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:b}catch(b){return{ok:!1,reason:"error",message:b instanceof Error?b.message:String(b)}}finally{clearTimeout(m)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const Eb="/studio/assets/silence-processor-CMfx2MIS.js";function Sb(e,t=ri){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),r=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${r}`,...n?.identity?{identity:n.identity}:{}}}const zr=yp,Oe=bp,tr={system:"System",light:"Light",dark:"Dark"};function Ab(e){try{return _r(e?.getItem(zr))}catch{return"system"}}function Mb(e,t){try{t==="system"?e?.removeItem(zr):e?.setItem(zr,t)}catch{}}const Tb=e=>Oe[(Oe.indexOf(e)+1)%Oe.length]??"system";function Lb(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function Rc(e,t){const n=Lb(e);n&&Br(t,n)}function Cb(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const r=Oe.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=tr[s],l.append(u),l.setAttribute("aria-label",`${tr[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${tr[s]} theme`,l.addEventListener("click",()=>{const d=n.closest(".nc-page-menu[data-nc-open]")!==null,c=s===a&&!d?Tb(s):s;o(c),t(c),r[Oe.indexOf(c)]?.focus({preventScroll:!0})}),l});n.append(...r);function o(s){a=s;for(const l of r){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(Oe.indexOf(a)+l+Oe.length)%Oe.length,d=Oe[u]??"system";o(d),t(d),r[u]?.focus()}),{el:n,get choice(){return a},set:o}}function Nb(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let u=a.get(l);return u||(u=n(o,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const Y=new AudioContext({latencyHint:"interactive"});Nb(Y.audioWorklet,location.href);const di=Gg(be()),Fb=new URLSearchParams(location.search).has("plugins"),zb=Fb,gn=ng({ctx:Y,moduleUrl:cn,base:location.href,remote:zb,store:Om(),frozen:di});function cs(e,t){gn?.restore(e.getChain().flatMap(r=>r.plugin?[r.plugin]:[])),ui.add(e);let n=e.getChain().length;const a=new Set;return e.onChange(r=>{if(r.key==="error"||r.key==="plugin"){Ue?.render();for(const s of Ug(a,e.getChain()))nn({message:P.stuck(s.plugin?.name??s.name,t()),duration:12e3,anchor:document.querySelector("[data-nc-area='fx']")}).el.dataset.pluginStuck=s.plugin?.id??s.id}const o=e.getChain().length;o!==n&&(n=o,queueMicrotask(()=>Ue?.render()))}),e}function Pb(e){return te.list().find(t=>t.id===e)?.name??e}const ui=new Set,ye=Ym(),Bt={},Rb=Mc,Sa=new Map,te=new Bg(Y,{restore:e=>ye.channels[e],fx:e=>{const t=Da(Y,{moduleUrl:cn,bpm:120,state:oc(e,ye)});return Bt[e]=t,t},masterFx:()=>{const e=Da(Y,{moduleUrl:cn,bpm:120,slots:Mr,state:xm(ye,Mr)});return e.onChange(kn),cs(e,()=>"Master")},channelFx:e=>{fa.delete(e);const t=Da(Y,{moduleUrl:cn,bpm:G.bpm(),slots:Rb,state:ye.channelFx[e]??{v:2,chain:[]}}),n=Is(t,G.clock,{mapper:rt}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(kn),Sa.set(e,t),t.dispose=(r=>()=>{ui.delete(t),r()})(t.dispose),cs(t,()=>Pb(e))}});te.setMaster(ye.master);te.setReturn("a",ye.returns.a);te.setReturn("b",ye.returns.b);const rt=new Pd(Y);rt.start();const Dc=lb();let Oc=()=>{};const Ic=Nm(Y.sampleRate),pi=Sm(Y,{nodeFor:e=>te.tapNode(e),latencyFor:e=>te.tapLatency(e,Ic.get()),sources:()=>[{id:"master",name:"Master"},...te.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{Oc=e})}),ke=jg(),zt=om(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),qc=e=>I.some(t=>t.id===e),_c=e=>I.find(t=>t.id===e)?.name??e,Bc=e=>{const t=I.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},jc=e=>{He(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),Ee.get(e)?.contentWindow?.focus()},Hc=kb({live:qc,nameOf:_c,brandOf:Bc,reveal:jc}),Qe=rb({fetch:(e,t)=>fetch(e,t),studio:`studio-${Math.random().toString(36).slice(2,10)}`,label:()=>pt.value.trim()||"Studio",live:qc,nameOf:_c,brandOf:Bc,shown:()=>Ce,reveal:jc,onStatus:e=>wi(e)});let Uc=!1;const hi=bm(),Vc=mm({now:()=>Y.currentTime,labelOf:e=>{const t=I.find(a=>a.id===e),n=xe.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Kc,pa,Jc]});window.ncStudio=cm(Y,te,{countIn:Vc.api,holdFirstPlay:()=>hi.hold(),presets:zt,share:Hc,picker:Qe,grab:pi,play:ke,mapper:Am(rt),resolve:(e,t)=>_b(e,t),syncScope:Dc,fxWorklet:new URL(cn,location.href).href});const G=db(()=>Y.state,sb(Dc),()=>Uc&&Y.state==="running"&&rt.ready&&hi.count===0?null:Vb());function we(){try{return globalThis.localStorage??null}catch{return null}}G.setTempo(bb(we()));const me=new Qg(Y,()=>te.tapNode("master"));let an=null;function O(e,t={},...n){const a=document.createElement(e);for(const[r,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(r,o===!0?"":String(o));return a.append(...n),a}const xn=O("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),jt=O("input",{type:"number",class:"bpm",min:Be[0],max:Be[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),ca=O("output",{class:"position","aria-label":"Bar and beat"},"—"),Ze=O("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":K["transport:rec"]},"Rec"),rn=O("a",{class:"take",hidden:!0}),fi=O("span",{class:"status",role:"status"}),pt=O("input",{type:"text",class:"scene-name",maxlength:60,value:yb(we()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),Gc=O("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Wc=O("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),Yc=O("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),bn=O("input",{type:"file",accept:".json,application/json",hidden:!0}),nt=O("button",{type:"button",class:"ghost picker-link","data-picker":"off","aria-pressed":"false"},O("span",{class:"picker-dot","aria-hidden":"true"}),"Picker"),mi=Cb(Ab(we()),e=>{Mb(we(),e),Br(e);for(const t of Ee.values())Rc(t,e)});Br(mi.choice);const Kc=O("h1",{class:"brand","aria-label":"NetComposer Studio"},O("span",{"aria-hidden":"true"},"NetComposer",O("span",{class:"brand-sep"}," / "),"Studio")),Pr=O("span",{class:"beat-light","aria-hidden":"true"}),da=O("span",{class:"status-long"}),ua=O("span",{class:"status-short"});fi.append(da,ua);const pa=O("header",{class:"top"},O("div",{class:"transport"},xn,O("label",{class:"tempo"},jt,O("span",{class:"tempo-unit"},"BPM")),Pr,ca),O("div",{class:"record"},Ze,rn),fi),Xc=O("div",{class:"scene-actions"},pt,Gc,Wc,Yc,nt,mi.el),Db=If({panel:Xc}),Jc=O("div",{class:"scene",role:"group","aria-label":"Scene"},Xc,bn,Db.button);me.supported||(Ze.disabled=!0,Ze.title="This browser can't record audio");const Vt=O("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Qc=O("div",{class:"stage"}),An=O("label",{class:"tab tab-add",title:"Add an instrument"},O("span",{"aria-hidden":"true"},"+")),Pt=O("select",{class:"tab-add-select","aria-label":"Add an instrument"});Pt.append(O("option",{value:""},"Add an instrument"),...ri.map(e=>{const t=O("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));Pt.addEventListener("change",()=>{const e=Pt.value;Pt.value="",e&&od(e)});An.append(Pt);Vt.append(An);Pf();const $n=O("div",{class:"spine","aria-hidden":"true"}),Ee=new Map;let I=em(Zf(xe),xe),Ce=I[0]?.id??"";const Ob=new URLSearchParams(location.search).has("measure"),ds=new Map,Ib=2e4;function Zc(e){const t=O("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);t.addEventListener("click",()=>He(e.id)),Vt.insertBefore(t,An);const a=(ds.get(e.type)??Promise.resolve()).then(()=>new Promise(r=>{if(!I.some(l=>l.id===e.id))return r();const o=O("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Xf(e,Ob),allow:"autoplay; clipboard-read; clipboard-write; microphone"});Ee.set(e.id,o);const s=window.setTimeout(r,Ib);o.addEventListener("load",()=>qb(o)),o.addEventListener("load",()=>{window.clearTimeout(s),r()},{once:!0}),Qc.append(o),He(Ce)}));return ds.set(e.type,a),a}const ed=window.matchMedia(Gs);function td(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",ed.matches)}catch{}}ed.addEventListener("change",()=>{for(const e of Ee.values())td(e)});function qb(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",Rc(e,mi.choice),td(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(ad.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Ce&&rd())};a();const r=t.querySelector(".nc-page")??t.body;r&&new ResizeObserver(()=>{a(),Aa()}).observe(r),gi.add(e),nd(e)}const gi=new Set;function nd(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){gi.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(pa).position==="sticky"?pa.getBoundingClientRect().bottom:0,r=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(r,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(r)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-r)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let nr=!1;function Aa(){nr||(nr=!0,requestAnimationFrame(()=>{nr=!1;for(const e of gi)nd(e)}))}window.addEventListener("scroll",Aa,{passive:!0});window.addEventListener("resize",Aa);const ad=new Map;function rd(){const e=ad.get(Ce);e===void 0?$n.style.removeProperty("--spine-top"):$n.style.setProperty("--spine-top",`${e}px`)}function id(e){if(!e){$n.replaceChildren();return}const t=Sb(e),n=O("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),$n.replaceChildren(O("span",{class:"spine-text"},n,O("span",{class:"spine-rest"},t.rest)))}function He(e){Ce=e,Qe.seen(e),id(I.find(t=>t.id===e)),rd(),Aa();for(const t of I){const n=t.id===e;Ee.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const _b=nm(()=>I.map(e=>({instance:e,window:()=>Ee.get(e.id)?.contentWindow,readyState:()=>{try{return Ee.get(e.id)?.contentDocument?.readyState}catch{return}}})),xe);function od(e){const t=xe.find(r=>r.id===e);if(!t)return;const n=Jf(I,t),a=I.map(r=>r.type).lastIndexOf(n.type);I=a<0?[...I,n]:[...I.slice(0,a+1),n,...I.slice(a+1)],Ut(I),Zc(n);for(const r of I){const o=document.getElementById(`tab-${r.id}`);o&&Vt.insertBefore(o,An)}He(n.id),Ue?.render()}function Bb(e,t){const n=I.find(o=>o.id===e);if(!n)return;const a=I.filter(o=>o.id!==e),r=t===null?a.length:a.findIndex(o=>o.id===t);I=[...a.slice(0,r<0?a.length:r),n,...a.slice(r<0?a.length:r)],Ut(I);for(const o of I){const s=document.getElementById(`tab-${o.id}`);s&&Vt.insertBefore(s,An)}Ue?.render()}function jb(e,t){I=Kf(I,e,t,xe),Ut(I);const n=I.find(r=>r.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&(a.textContent=n.name),Ee.get(e)?.setAttribute("title",n.name),Ce===e&&id(n),te.rename(e,n.name)}async function Hb(e,t){const a=I.find(l=>l.id===e)?.name??e;if(!await qe({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;I=I.filter(l=>l.id!==e),Ut(I),Hc.forget(e),Qe.forget(e);const o=ke.playing().includes(e);ke.drop(e),o&&ke.out(e);const s=Ee.get(e);Ee.delete(e),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${e}`)?.remove(),te.detach(e),Ub(e),sg(be(),e),Ce===e&&He(I[0]?.id??"")}const Rr=O("div",{class:"mix"});Rr.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Ce&&I.some(a=>a.id===n)&&He(n)});let Ue=null,ha=0;const fa=new Set;function Ub(e){fa.add(e),delete ye.channels[e],delete ye.channelFx[e],Sa.delete(e),kn()}let bi=!1;function kn(){window.clearTimeout(ha),!bi&&(ha=window.setTimeout(()=>{gc(sd())},300))}function sd(){const e={...ye.channels};for(const r of te.list())e[r.id]=r.strip;for(const r of fa)delete e[r];const t={};for(const r of["a","b"]){const o=Bt[r];o&&(t[r]=o.getState())}const n=te.masterFx?.getState()??null,a={...ye.channelFx};for(const[r,o]of Sa)a[r]=o.getState();for(const r of fa)delete a[r];return{v:1,channels:e,master:te.masterPositionValue,returns:{a:{on:te.returns.a.on,level:te.returns.a.level},b:{on:te.returns.b.on,level:te.returns.b.level}},insert:{on:n?$m(n):ye.insert.on},fx:t,channelFx:a,masterFx:n??ye.masterFx}}te.onChange(()=>{Ue?.render(),kn()});for(const e of Object.values(Bt))e?.onChange(kn);async function yi(){Y.state!=="running"&&await Y.resume()}const us=1500;async function Vb(){const e=performance.now()+us;await Promise.race([yi(),new Promise(t=>setTimeout(t,us))]),await rt.whenSettled(Math.max(0,e-performance.now())),await Promise.race([hi.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}xn.addEventListener("click",()=>{yi(),G.running()&&ke.owner()===si?G.stop():G.running()?ke.claimAll():(ke.claimAll(),G.play()),Ve()});function ld(){const e=Number(jt.value);G.setTempo(e),zc(G.bpm(),we())}pt.addEventListener("change",()=>{pt.value=mt(pt.value),Pc(pt.value,we())});function Gb(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),r=O("a",{href:a,download:e});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}Gc.addEventListener("click",async()=>{const e=mt(pt.value),t=I.map(o=>o.id),n=await zt.collect(t),a=fb({name:e,bpm:G.bpm(),instances:I,mix:sd(),presets:n});Gb(gb(e),`${JSON.stringify(a,null,2)}
`,"application/json");const r=I.filter(o=>!n[o.id]).map(o=>o.name);Mn(r.length?`Saved “${e}” (without ${r.join(", ")}: ${r.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});Wc.addEventListener("click",()=>bn.click());bn.addEventListener("change",async()=>{const e=bn.files?.[0];if(bn.value="",!e)return;const t=mb(await e.text(),xe.filter(r=>r.available!==!1).map(r=>r.id));if(!t.ok){Mn(t.error);return}const n=t.scene;await qe({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&cd({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Yc.addEventListener("click",async()=>{await qe({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&cd({name:ci,bpm:la,instances:wn(xe),mix:vn()})});function cd(e){G.running()&&G.stop(),bi=!0,window.clearTimeout(ha);const t=e.instances.map(({id:n,name:a})=>{const[r,o]=n.split("#"),s=xe.find(l=>l.id===r);return s?Ht(s,o?Number(o):1,a):null}).filter(n=>n!==null);Ut(t),gc(e.mix),zc(e.bpm,we()),Pc(e.name,we()),zt.stash({...e.presets??{}}),location.reload()}let ps=0;function Mn(e){da.textContent=e,ua.textContent=e,window.clearTimeout(ps),ps=window.setTimeout(Ve,4e3)}jt.addEventListener("change",ld);jt.addEventListener("keydown",e=>{e.key==="Enter"&&ld()});Ze.addEventListener("click",()=>{yi();const e=me.state;e==="recording"?Wb():e==="arming"||e==="armed"?(me.cancel(),Mn("Rec cancelled")):e==="idle"&&(me.arm(G.playing()),dd())});async function Wb(){const e=await me.stop();e&&(an&&URL.revokeObjectURL(an.url),an={url:URL.createObjectURL(e.blob),take:e},rn.href=an.url,rn.download=e.name,rn.textContent=`Save take (${e.seconds.toFixed(1)} s)`,rn.hidden=!1)}function dd(){const e=me.state;if(e!=="arming"&&e!=="armed")return;const t=G.clock.transport;if(!t.running||t.startTime===null){me.schedule(null);return}const n=Math.round(rt.toContextTime(t.startTime)*Y.sampleRate);me.schedule(n+pi.latency("master"))}function Yb(){const e=me.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";Ze.dataset.state=t?"armed":n?"recording":"idle",Ze.setAttribute("aria-pressed",String(n)),Ze.textContent=t?"Armed":n?"Stop rec":"Rec",Ze.disabled=e==="stopping"||!me.supported,Ve()}me.onChange(Yb);document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),xn.click())});Vt.addEventListener("keydown",e=>{if(e.target===Pt)return;const t=I.map(r=>r.id),n=t.indexOf(Ce),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),He(a),document.getElementById(`tab-${a}`)?.focus())});function Ve(){const e=G.running()&&ke.owner()===si;xn.textContent=e?"Stop":"Play",xn.setAttribute("aria-pressed",String(e)),document.activeElement!==jt&&(jt.value=String(Math.round(G.bpm()*10)/10));const t=G.position();ca.value=t?`${t.bar}.${t.beat}`:"—";const n=G.peers().length;da.textContent=Y.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",ua.textContent=Y.state==="running"?"":"Audio off",(me.state==="arming"||me.state==="armed")&&(da.textContent="Rec armed: waiting for sound",ua.textContent="Rec armed"),fi.classList.toggle("off",Y.state!=="running")}G.clock.onChange(()=>{G.clock.transport.running&&(Uc=!0),G.running()||ke.clear(),dd(),Ve()});ke.onChange(Ve);ke.onLastOut(()=>{G.running()&&G.stop(),Ve()});G.clock.onChange(()=>Ue?.render());G.peer.onPeers(Ve);Y.addEventListener("statechange",Ve);const Kb=.25;let hs=performance.now();function ud(e){const t=Math.min(.1,(e-hs)/1e3);hs=e,Ue?.frame(t);const n=G.position(),a=n?`${n.bar}.${n.beat}`:"—";ca.value!==a&&(ca.value=a);const r=G.beatPhase(),o=r!==null&&r<Kb;Pr.hasAttribute("data-on")!==o&&Pr.toggleAttribute("data-on",o),requestAnimationFrame(ud)}async function Xb(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(Kc,pa,Jc,Rr,O("main",{class:"instruments"},Vt,O("div",{class:"bay"},$n,Qc)),Vc.el),Ue=Pg(Rr,te,{order:()=>I.map(t=>t.id),catalogue:ri,bpm:()=>G.bpm(),onAdd:od,onRemove:(t,n)=>void Hb(t,n),onReorder:(t,n)=>Bb(t,n),onRename:(t,n)=>jb(t,n),...gn?{plugins:gn}:{}}),Y.state==="running"&&await Y.suspend(),await Y.audioWorklet.addModule(Eb),Oc(),me.attach(),await G.start();for(const t of[Bt.a,Bt.b,te.masterFx])t&&Is(t,G.clock,{mapper:rt});for(const t of I)Zc(t);He(Ce),Ve(),requestAnimationFrame(ud),window.setInterval(()=>te.parkIdleReturns(),qg),document.documentElement.dataset.studioReady="",Qb(),ey(),gn&&Wg({ctx:Y,running:()=>Vg([...ui].map(t=>t.getChain())),onFrozen:Jb})}async function Jb(e){di.add(e.map(a=>a.id)),window.clearTimeout(ha),bi=!0;const t=e.map(a=>a.name).join(", ");document.documentElement.dataset.pluginsFrozen=e.map(a=>a.id).join(" "),Mn(`${t} froze the audio`),await qe({title:P.frozenTitle,body:P.frozenBody(t),confirmLabel:P.frozenOpen,cancelLabel:P.frozenStay})&&window.open(location.href,"_blank")}function Qb(){const e=new Set(zt.pending());if(!e.size)return;const t=[],n=o=>I.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(r);const o=[...t,...zt.dropPending()].map(n);Mn(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};zt.onApplied((o,s)=>{e.delete(o)&&(s||t.push(o),e.size||a())});const r=window.setTimeout(a,rm)}window.__studio={ctx:Y,mixer:te,grab:pi,recorder:me,get lastTake(){return an?.take??null},limiterDelay:Ic,mapper:rt,transport:G,frames:Ee,show:He,get instances(){return I},fx:Bt,plugins:gn,frozen:di,channelCores:Sa,get mix(){return Ue}};Xb();function wi(e){nt.dataset.picker=e,nt.setAttribute("aria-pressed",String(e==="on"||e==="connecting"||e==="away")),nt.dataset.ncHelp=K[`picker:${e}`]}wi("off");async function Zb(){if(["127.0.0.1","localhost","[::1]"].includes(location.hostname))return"granted";try{return(await navigator.permissions.query({name:"loopback-network"})).state}catch{return"unknown"}}async function ey(){let e=Lc(we());const t=new URLSearchParams(location.search).get("picker");if(t!==null){const a=t?li(t):e.address;a&&(e={on:!0,address:a},Nr(we(),e))}if(!e.on)return;const n=await Zb();n==="granted"||n==="unknown"?Qe.start(e.address):wi(n==="denied"?"blocked":"ask")}nt.addEventListener("click",()=>void ty());async function ty(){const e=Lc(we()),t=nt.dataset.picker;if(t==="ask"||t==="blocked"){Qe.start(e.address);return}if(Qe.status!=="off"){if(!await qe({title:"Disconnect the Sample Picker?",body:"Its Send to NYX won't reach this Studio until you connect it again.",confirmLabel:"Disconnect",returnFocus:nt}))return;Nr(we(),{...e,on:!1}),Qe.stop();return}await qe({title:"Connect the Sample Picker?",body:`The Studio talks to the Sample Picker on this computer (${e.address}), so its Send to NYX loads the pads of your NYX here. Chrome may ask to let this site reach this computer: allow it.`,confirmLabel:"Connect",returnFocus:nt})&&(Nr(we(),{...e,on:!0}),Qe.start(e.address))}
