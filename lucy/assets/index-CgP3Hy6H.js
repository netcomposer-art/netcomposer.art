(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Yt=1e-9;function su(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Po{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return su(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+Yt&&(i=s.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+Yt)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+Yt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Yt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const r=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(t-r)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Po({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+Yt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+Yt)return n[a];return n[0]}}const lu=Object.freeze({beatsPerBar:4,beatUnit:4}),cn=1e-9;function cu(e){return Math.floor(e+cn)}function Sl(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-cn)*t;return n&&i<=e+cn?i+t:i}class du{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Po({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??lu}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-cn&&(this.stopTime===null||t<this.stopTime-cn)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-cn?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=cu(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return Sl(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Tl="nc-clock/snapshot",Ll=1;function uu(e,t="local"){return{format:Tl,version:Ll,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function pu(e,t){const n=hu(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const et=e=>typeof e=="number"&&Number.isFinite(e),Rr=e=>e===null||et(e);function hu(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==Tl&&n("format"),(!et(t.version)||Math.floor(t.version)!==Ll)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!et(t.anchor.beat)||!et(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&et(a.beat)&&et(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!et(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!et(t.meter.beatUnit))&&n("meter"),(!Rr(t.startTime)||!Rr(t.stopTime)||!et(t.stoppedBeat))&&n("transport times"),t}class fu{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new du(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){pu(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return uu(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const mu="nc-sync/1",gu=1,bu="nc-sync",yu="nc-sync-leader",vu=0,Cl=.5,Nl=.75;function wu(e){return typeof e=="number"&&Number.isFinite(e)&&e>=Cl&&e<=Nl?e:null}const gi=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),En=e=>typeof e=="number"&&Number.isFinite(e),ca=e=>typeof e=="string"&&e.length>0;function ku(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==gu||!ca(t.type)||!ca(t.from)||!En(t.term)||!En(t.seq)||!En(t.sentAt))return null;switch(t.type){case"hello":return ca(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return En(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&En(t.slot)?t:null;case"ping":case"pong":return ca(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function xu(e,t,n,a,i){return{proto:mu,from:t,term:n,seq:a,sentAt:i,...e}}function he(){return(performance.timeOrigin+performance.now())/1e3}const bi=.003,$u=3,yi=.002+1e-6,Au=.01,qr=500;class Ir{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Au:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=bi&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,r=this.median(),s=i-r,l=Math.abs(i-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,r,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.heldBase()!==null,r=this.ctx.currentTime,s=r<=this.revertUntil;let l;if(a&&s){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const u=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<u.length;f++)p.push(u[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,d=t-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:t-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!i)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const s=t[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=bi&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<qr)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=bi)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<qr)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min($u,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,r=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(t[d]-t[l])<=yi&&c++;c>r&&(i=l,r=c)}if(r<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>yi&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=yi}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class Eu{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...gi,...t.capabilities},this.channelOption=t.channel??bu,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),r=()=>{n===this.startWaits&&t(i)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,r]=this.tempoRange();t=Math.min(r,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Sl(c,1),c);a&&a>0?(s.tempo.rampTempo(t,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,d),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Nl,Math.max(Cl,t)):vu;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=wu(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=ku(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...gi,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...gi},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(yu,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=r.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(xu(t,this.id,this.term,++this.seq,this.o.now()))}}const Mu="modulepreload",Su=function(e){return"/lucy/"+e},Pr={},Tu=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");i=s(n.map(d=>{if(d=Su(d),d in Pr)return;Pr[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Mu,u||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((m,g)=>{f.addEventListener("load",m),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var Lu=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Hi=[.25,.5,.75,1,1.5,2],Cu=4.9,Y={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0},crunchRate:{pow:[4e3,44100/4e3],div:100,round:!0}},He={fmt:"wet"},ce={fmt:"pct"},Xt={fmt:"db"},da={fmt:"signedPct"},Mn={fmt:"num",suffix:" ms"},j={div:100};function L(e,t,n,a,i,r,s,l){var c={key:e,label:t,min:n,max:a,default:i,step:1,k:r,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function Je(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Bn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:Y.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:Y.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:Y.hpQ},{dsp:{law:Y.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:Y.bpHz,astrid:!0},{dsp:{law:Y.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:Y.bpQ},{dsp:{law:Y.bpQ}}),L("mix","Mix",0,100,100,3,He,{dsp:j,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Je(Lu),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,ce,{dsp:j,unit:"%"}),L("mix","Wet/dry",0,100,0,3,He,{dsp:j,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:Y.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Je([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,ce,{dsp:j,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,da,{dsp:j,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,Mn,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:j,unit:"%"}),L("decay","Decay",0,100,50,3,ce,{dsp:j,unit:"%"}),L("damping","Damping",0,100,0,4,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,0,5,He,{dsp:j,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[L("size","Size",0,100,60,1,ce,{dsp:j,unit:"%"}),L("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),L("predelay","Pre-delay",0,250,20,3,Mn,{dsp:{div:1e3},unit:"ms"}),L("tone","Tone",0,100,60,4,{fmt:"hz",law:Y.hallTone,astrid:!0},{dsp:{law:Y.hallTone}}),L("mix","Mix",0,100,25,5,He,{dsp:j,unit:"%"}),L("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("width","Width",0,100,100,7,ce,{dsp:j,unit:"%",more:!0}),L("motion","Motion",0,100,30,8,ce,{dsp:j,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[L("rate","Rate",0,100,35,1,{fmt:"rate",law:Y.rate},{dsp:{law:Y.rate}}),L("depth","Depth",0,100,60,2,ce,{dsp:j,unit:"%"}),L("width","Width",0,100,80,3,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,4,He,{dsp:j,unit:"%"}),L("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:Je([[3,"3"],[6,"6"]]),more:!0}),L("vibrato","Vibrato",0,100,20,6,ce,{dsp:j,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[L("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:Je([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),L("swing","Swing",0,100,0,3,ce,{dsp:j,unit:"%"}),L("depth","Depth",0,100,90,4,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,100,5,He,{dsp:j,unit:"%"}),L("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:Je([[8,"8"],[16,"16"]]),more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Je([[0,"Volume"],[1,"Filter"]]),more:!0}),L("smooth","Smooth",1,20,4,7,Mn,{unit:"ms",more:!0}),L("spread","Spread",0,100,0,8,ce,{dsp:j,unit:"%",more:!0}),L("res","Resonance",0,100,20,9,ce,{dsp:j,unit:"%",more:!0})]},{type:"crunch",label:"Crunch",own:!0,note:"Rate with no filter, then Bits: the S950 / SP-1200 grit.",dials:[L("rate","Rate",0,100,78,1,{fmt:"khz",law:Y.crunchRate},{step:.1,dsp:{law:Y.crunchRate}}),L("bits","Bits",4,16,12,2,{fmt:"num",suffix:"-bit"},{unit:"bits"}),L("hold","Steps",0,1,0,3,{fmt:"option"},{step:null,options:Je([[0,"Hard"],[1,"Smooth"]]),more:!0})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:Y.rate},{dsp:{law:Y.rate}}),L("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),L("feedback","Feedback",-90,90,50,3,da,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,4,He,{dsp:j,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:Y.rate},{dsp:{law:Y.rate}}),L("depth","Depth",0,100,50,2,ce,{dsp:j,unit:"%"}),L("spread","Spread",0,100,70,3,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,40,4,He,{dsp:j,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:Y.rate},{dsp:{law:Y.rate}}),L("depth","Depth",0,100,70,2,ce,{dsp:j,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Je([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,ce,{dsp:j,unit:"%"}),L("mix","Mix",0,100,50,5,He,{dsp:j,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,Xt,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,Xt,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:Y.midHz,astrid:!0},{dsp:{law:Y.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:Y.eqQ},{dsp:{law:Y.eqQ}}),L("high_db","High",-18,18,0,4,Xt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,Xt,{unit:"dB"}),L("mix","Mix",0,100,100,3,He,{dsp:j,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Je([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:Y.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,da,{dsp:j,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,da,{dsp:j,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,Xt,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:Y.ratio},{dsp:{law:Y.ratio}}),L("attack_ms","Attack",1,100,10,3,Mn,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,Mn,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,Xt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,ce,{dsp:j,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:j})]}],Nu=Bn.map(function(e){return e.type});Bn.filter(function(e){return!e.hidden}).map(function(e){return e.type});var Fu={reverb:"plate"},Wi={};function Fl(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function Oo(e){var t=Fu[e]||e;return Nu.indexOf(t)>=0||typeof t=="string"&&Wi[t]?t:null}function Ae(e){for(var t=Oo(e),n=0;n<Bn.length;n++)if(Bn[n].type===t)return Bn[n];return t&&Wi[t]?Wi[t]:null}function zu(e,t){var n=Ae(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function St(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function La(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=St(n.law,t);return a===null?0:a}function Or(e,t){return Math.min(Cu,e*60/(t>0?t:120))}var _r=function(e){return e>0?"+":e<0?"−":""};function Du(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function zl(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:_r(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return _r(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=St(a.law,t),i===null?a.zero||"open":a.astrid?Du(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"khz":return(St(a.law,t)/1e3).toFixed(1)+" kHz";case"q":return"Q "+St(a.law,t).toFixed(1);case"ratio":return St(a.law,t).toFixed(1)+":1";case"rate":return i=St(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(Or(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(Or(t,n)*1e3)+" ms"}return String(t)}var Bu=1,ei=["drive","delay","plate"];function Ru(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return zl(e,a,i)},t}var Rn=ei.map(function(e){var t=Ae(e),n={type:e,label:t.label,dials:t.dials.map(Ru)};return t.tempoSynced&&(n.tempoSynced=!0),n}),qu={reverb:"plate"};function Ca(e){var t=qu[e]||e;return ei.indexOf(t)>=0?t:null}function ti(e){for(var t=Ca(e),n=0;n<Rn.length;n++)if(Rn[n].type===t)return Rn[n];return null}function Dl(e,t){var n=ti(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function bn(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function it(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function Iu(){return{v:Bu,chain:Rn.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Pu(e){return Hi.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Hi[0])}function vi(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ou(e){for(var t=Array.isArray(e)?e:vi(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Iu(),i={},r=[],s=0;s<t.length;s++){var l=t[s];if(vi(l)){var c=Ca(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(i[c]){r.push(c);continue}i[c]=!0;var d=a.chain[ei.indexOf(c)],u=vi(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,ti(c).dials.forEach(function(p){d.dials[p.key]=it(p,u[p.key])}),_u(c,d.dials,u)}}return{state:a,dropped:r}}function _u(e,t,n){for(var a=ti(e),i=0;i<a.dials.length;i++){var r=a.dials[i];r.stepWhen&&(t[r.key]=it(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],bn(r,t)))}}function Ui(e){return Ou(e).state}function ju(e){return JSON.parse(JSON.stringify(e))}var Hu=24,Vi={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Gi(e,t,n){if(t==="bypass")return n?0:1;var a=Dl(e,t)||Wu(e,t);return a?La(a,n):0}function Wu(e,t){var n=Ae(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var Uu={};Rn.forEach(function(e){e.dials.forEach(function(t){Uu[e.type+"."+t.key]=t.format})});function wi(e,t){var n=new Float64Array(Hu),a=Ui(e);return a.chain.forEach(function(i){var r=Vi[i.type];n[r.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[r[s]]=Gi(i.type,s,i.dials[s])})}),n}var jr={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."},Vu=["hard","pump","swell","blip","glide"],Bl=16;function Ze(e){for(var t=[],n=0;n<Bl;n++)t.push(e[n%e.length]);return t}var Ki=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:Ze([100]),shapes:Ze([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:Ze([15,35,60,85,100,85,60,35]),shapes:Ze([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:Ze([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:Ze([100,55,85,40,100,55,85,70]),shapes:Ze([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:Ze([100,85,70,60,50,40,30,20]),shapes:Ze([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],Gu="Ducker";function Rl(e){for(var t=String(e||"").toLowerCase(),n=0;n<Ki.length;n++){var a=Ki[n];if(a.name.toLowerCase()===t)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function Hr(e,t,n,a){return typeof e!="number"||!isFinite(e)?a:(e=Math.round(e),e<t?t:e>n?n:e)}function _o(e){for(var t=Ki[0],n=e&&typeof e=="object"?e:{},a=Array.isArray(n.levels)?n.levels:[],i=Array.isArray(n.shapes)?n.shapes:[],r={levels:[],shapes:[]},s=0;s<Bl;s++)r.levels.push(Hr(a[s],0,100,t.levels[s])+0),r.shapes.push(Hr(i[s],0,Vu.length-1,t.shapes[s])+0);return r}function Ku(e){var t=_o(e),n=[],a,i,r;for(a=0;a<4;a++){for(r=0,i=3;i>=0;i--)r=r*101+t.levels[a*4+i];n.push([10+a,r])}for(a=0;a<2;a++){for(r=0,i=7;i>=0;i--)r=r*5+t.shapes[a*8+i];n.push([14+a,r])}return n}var Yu=2,Na=3,Wr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function Tt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var Xu=/^local:[A-Za-z0-9._@-]{1,200}$/,Qu=/^\d+\.\d+\.\d+$/;function Ju(e,t){var n=Tt(e)?e:{},a=t.slice(7),i={id:a,version:typeof n.version=="string"&&Qu.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Xu.test(n.url))&&(i.url=n.url),typeof n.name=="string"&&n.name.trim()&&(i.name=n.name.trim().slice(0,40)),i}function ql(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function Zu(e){var t={},n=0;if(Tt(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function ep(e){return e.plugin?e.plugin.idBase:e.type}function jo(e,t){var n=Ae(e);if(!n)return null;var a={};(t||[]).forEach(function(d){d&&d.id&&(a[d.id]=!0)});for(var i=1,r=ep(n);a[r+"-"+i];)i++;var s={};n.dials.forEach(function(d){s[d.key]=d.default});var l={id:r+"-"+i,type:n.type,bypass:!1,dials:s};if(n.plugin&&(l.plugin=ql(n)),n.pattern){var c=Rl(Gu);Object.assign(l.dials,c.dials),l.pattern=c.pattern}return l}function tp(e){var t=Ae(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function np(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var r=e.slice(),s=r.splice(t,1)[0];return r.splice(i,0,s),r}function ap(e){return typeof e=="number"&&isFinite(e)?Pu(e):e}function Ur(e,t,n){var a={};return e.dials.forEach(function(i){var r=t[i.key];r===void 0&&i.astridKey&&(r=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(r=ap(r)),a[i.key]=e.plugin?it(i,r,i.step):it(i,r)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=it(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],bn(i,a)))}),a}function ip(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,r=e.min;r<=e.max;r++){var s=St(n.law,r),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=r)}return a}}var op={rate:"rate_hz"};function rp(e,t,n,a){var i={};return e.dials.forEach(function(r){if(!r.more){var s=r.astridKey||op[r.key]||r.key;i[r.key]=ip(r,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function sp(e,t){var n=t>0?Math.floor(t):Na,a=[],i=[],r=[],s=!1,l=!1;Array.isArray(e)?(r=e,l=!0):Tt(e)&&Array.isArray(e.chain)&&(r=e.chain,s=e.v===1,l=e.schema===2);for(var c=[],d=0;d<r.length;d++){var u=r[d];if(Tt(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=Oo(u.type),f=p&&Ae(p);if(!f&&!s&&Fl(u.type)){if(c.length>=n){a.push(u.id||u.type);continue}for(var m=Ju(u.plugin,u.type),g=m.id.split(".").pop(),y=1;c.some(function(k){return k.id===g+"-"+y});)y++;var h=typeof u.id=="string"&&Wr.test(u.id)&&!c.some(function(k){return k.id===u.id})?u.id:g+"-"+y;c.push({id:h,type:u.type,bypass:u.bypass===!0,dials:Zu(u.dials),plugin:m});continue}if(!f||s&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||p);continue}var b;Tt(u.params)&&!Tt(u.dials)?b=Ur(f,rp(f,u.params,i,u.id||p),l):b=Ur(f,Tt(u.dials)?u.dials:{},l);var x=jo(p,c),v=typeof u.id=="string"&&Wr.test(u.id)&&!c.some(function(k){return k.id===u.id})?u.id:x.id,S=s?u.bypass!==!1:u.bypass===!0,$={id:s?x.id:v,type:p,bypass:S,dials:b};f.plugin&&($.plugin=ql(f)),f.pattern&&($.pattern=_o(u.pattern)),c.push($)}}return{state:{v:Yu,chain:c},dropped:a,notes:i}}function qn(e,t){return sp(e,t).state}function ct(e){var t=Ae(e.type),n=[[0,e.bypass?0:1]];return t&&(t.dials.forEach(function(a){n.push([a.k,La(a,e.dials[a.key])])}),t.pattern&&(n=n.concat(Ku(e.pattern)))),n}function lp(e){var t=qn(e,8),n=[],a=t.chain.filter(function(i){if(i.plugin)return n.push(i.id+": ASTRID has no plugins"),!1;var r=Ae(i.type);return r&&r.own?(n.push(i.id+": ASTRID has no "+r.label),!1):!0}).map(function(i,r){var s=Ae(i.type),l={};return r>=Na&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=i.dials[c.key];if(c.more){d!==c.default&&n.push(i.id+"."+c.key);return}c.key==="delay_beats"&&Hi.indexOf(d)<0&&n.push(i.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var cp=150,dp=6e3,up=18,Il=6.283185307179586;function ni(e,t,n){return e<t?t:e>n?n:e}function pp(e,t,n,a,i){var r=Math.pow(10,n/40),s=Il*t/i,l=Math.cos(s),c=Math.sin(s),d,u,p,f,m,g,y,h;if(e===0||e===2){y=c/2*Math.SQRT2,h=2*Math.sqrt(r)*y;var b=e===0?1:-1;d=r*(r+1-b*(r-1)*l+h),u=b*2*r*(r-1-b*(r+1)*l),p=r*(r+1-b*(r-1)*l-h),f=r+1+b*(r-1)*l+h,m=-b*2*(r-1+b*(r+1)*l),g=r+1+b*(r-1)*l-h}else y=c/(2*a),d=1+y*r,u=-2*l,p=1-y*r,f=1+y/r,m=-2*l,g=1-y/r;return[d/f,u/f,p/f,m/f,g/f]}function hp(e,t,n){var a=Il*t/n,i=Math.cos(a),r=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),c=e[0]+e[1]*i+e[2]*s,d=-(e[1]*r+e[2]*l),u=1+e[3]*i+e[4]*s,p=-(e[3]*r+e[4]*l);return 10*Math.log10((c*c+d*d)/(u*u+p*p))}var Vr={};function wt(e){return Vr[e]||(Vr[e]=zu("eq",e))}function an(e,t){var n=wt(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return ni(a,n.min,n.max)}function Pl(e){return[{id:"low",kind:0,hz:cp,db:an(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:La(wt("mid_hz"),an(e,"mid_hz")),db:an(e,"mid_db"),q:La(wt("mid_q"),an(e,"mid_q"))},{id:"high",kind:2,hz:dp,db:an(e,"high_db"),q:Math.SQRT1_2}]}function fp(e,t,n){for(var a=Pl(e),i=n.length,r=new Float64Array(i),s=[],l=t/2,c=0;c<a.length;c++){var d=a[c],u=new Float64Array(i);if(d.db!==0)for(var p=pp(d.kind,d.hz,d.db,d.q,t),f=0;f<i;f++){var m=n[f]<l?n[f]:l*.9999;u[f]=hp(p,m,t),r[f]+=u[f]}s.push(u)}return{total:r,bands:s}}function mp(e){var t=wt("mid_hz").dsp.law;return ni(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function gp(e){var t=wt("mid_q").dsp.law;return ni(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Fa={low:"low_db",mid:"mid_db",high:"high_db"},bp={low:"Low",mid:"Mid",high:"High"};function yp(e,t,n){var a=[];function i(r,s){var l=wt(r),c=l.step||1;s=ni(Math.round(s/c)*c,l.min,l.max),s===0&&(s=0),s!==an(e,r)&&a.push([r,s])}return typeof n.db=="number"&&Fa[t]&&i(Fa[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&i("mid_hz",mp(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&i("mid_q",gp(n.q)),a}function vp(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Fa[e]?[Fa[e]]:[];return t.map(function(n){return[n,wt(n).default]})}var ua=typeof WeakMap=="function"?new WeakMap:null;function wp(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=ua&&ua.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},ua&&ua.set(e,n)),n.handle}function kp(e,t,n){var a=n||{},i={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(u){var p=e&&typeof e.getParam=="function"?e.getParam(t,u):void 0;i[u]=typeof p=="number"?p:wt(u).default});var r=e&&e.output&&e.output.context,s=a.sampleRate||r&&r.sampleRate||48e3,l=a.help||{},c=Pl(i).map(function(u){var p=(u.db>0?"+":u.db<0?"−":"")+Math.abs(u.db)+" dB",f=u.hz>=1e3?(u.hz/1e3).toFixed(u.hz>=1e4?0:1)+" kHz":Math.round(u.hz)+" Hz";return{id:u.id,label:bp[u.id],kind:u.kind===0?"lowshelf":u.kind===1?"peak":"highshelf",hz:u.hz,db:u.db,q:u.q,moveHz:u.id==="mid",moveQ:u.id==="mid",minHz:u.id==="mid"?200:u.hz,maxHz:u.id==="mid"?5e3:u.hz,minQ:.3,maxQ:6,valueText:u.id==="mid"?p+" at "+f+", Q "+u.q.toFixed(1):p+(u.id==="low"?", shelf below ":", shelf above ")+f,help:l[u.id]}}),d=function(u){for(var p=0;p<u.length;p++)a.set(u[p][0],u[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:up,sampleRate:s,on:a.on!==!1,bands:c,help:l.graph,response:function(u){return fp(i,s,u)},spectrum:a.spectrum===!1?void 0:wp(e)||void 0,onBand:function(u,p){d(yp(i,u,p))},onReset:function(u){d(vp(u).filter(function(p){return p[1]!==i[p[0]]}))}}}var xp="nc-fx@1",$p=600,Ap=256,Ep=8,Sn=typeof WeakMap=="function"?new WeakMap:null;function Mp(e,t){var n=Sn&&Sn.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Tu(async()=>{const{default:r}=await import("./worklet-source-Bi3zqun9.js");return{default:r}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),Sn&&(Sn.set(e,n),n.catch(function(){Sn.delete(e)})),n)}function dt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Ol(e,t,n,a){var i=Math.min(400,Math.max(20,dt(t.bpm,120))),r=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=dt(t.preGain,1),d=Math.max(0,dt(t.crossfade,.012)),u=dt(t.maxDelaySeconds,void 0),p=e.createGain(),f=e.createGain(),m=e.createGain(),g=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,p.connect(m),m.connect(f),g.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0,clk:null},b=n(i);h.post=function(k){h.node?h.node.port.postMessage(k):h.disposed||(r.length>=Ap&&(r=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&r.push({t:"meter",on:!0})),r.push(k))};function x(k){var w=r.map(function(E){var M=Object.assign({},E);return M.when>k||(M.when=0,M.t!=="clear"&&(M.snap=!0)),M});return r=[],w}h.emit=function(k){for(var w=0;w<h.listeners.length;w++)try{h.listeners[w](k)}catch(E){typeof console<"u"&&console.error(E)}},h.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;h.tooFar=function(k){return typeof k=="number"&&k>e.currentTime+$p?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Mp(e,t.moduleUrl).then(function(){if(!h.disposed){var k=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},b);k.pending=x(e.currentTime),h.node=new AudioWorkletNode(e,xp,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),h.node.port.onmessage=function(E){var M=E.data;if(M&&M.t==="lv"&&h.mUsers>0)h.lv=M.d,h.lvAt=Gr();else if(M&&M.t==="clk"&&M.d)h.clk={beat:M.d[0],frame:M.d[1],perFrame:M.d[2],locked:M.d[3]===1,bar:M.d[4]||4};else if(M&&M.t==="perr"&&h.onPluginError&&M.d)for(var C=0;C<(M.n|0);C++)h.onPluginError(M.d[2*C],M.d[2*C+1])},p.connect(h.node),y&&y.connect(h.node,0,1),h.node.connect(g);var w=e.currentTime;w<=0||d===0?(m.gain.value=0,g.gain.value=1):(m.gain.setValueAtTime(1,w),m.gain.linearRampToValueAtTime(0,w+d),g.gain.setValueAtTime(0,w),g.gain.linearRampToValueAtTime(1,w+d)),h.status="ready"}},function(k){h.status="unavailable",r=[],h.error=k});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&Gr()-h.lvAt<Sp?h.lv:null};var $={};return h.meter=function(k,w){if($[k])return $[k];var E=0,M={in:0,out:0,gr:0},C={open:function(){return h.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,h.meterClose())},read:function(){var R=E>0?h.levels():null;return M.in=0,M.out=0,M.gr=0,R&&w(R,M),M}};return $[k]=C,C},h.core={input:p,output:f,modInput:y,ready:S,get status(){return h.status},get error(){return h.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(k,w){var E=dt(k,NaN);!(E>0)||h.disposed||h.tooFar(w)||(h.bpm=Math.min(400,Math.max(20,E)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(w)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},setBeat:function(k,w){var E=dt(k,NaN);E!==E||h.disposed||h.tooFar(w)||h.post({t:"beat",beat:E,when:h.whenOf(w)})},freeRun:function(k){h.disposed||h.tooFar(k)||h.post({t:"free",when:h.whenOf(k)})},setBar:function(k,w){var E=Math.round(dt(k,NaN));!(E>=1&&E<=16)||h.disposed||h.tooFar(w)||h.post({t:"bar",beats:E,when:h.whenOf(w)})},beatAt:function(k){var w=h.clk;if(!w)return null;var E=typeof k=="number"&&isFinite(k)?k:e.currentTime;return{beat:w.beat+(E*e.sampleRate-w.frame)*w.perFrame,bpm:w.perFrame*60*e.sampleRate,locked:w.locked,beatsPerBar:w.bar}},clear:function(k){var w=k&&typeof k=="object"?k:{at:k};if(!(h.disposed||h.tooFar(w.at))){var E=dt(w.fadeMs,0);h.post({t:"clear",when:h.whenOf(w.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(k){return h.listeners.push(k),function(){var w=h.listeners.indexOf(k);w>=0&&h.listeners.splice(w,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",r=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,m,g,f,y].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},h}var Sp=250;function Gr(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function _l(e,t){t.in=e[0],t.out=e[1]}function jl(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Tp(e,t){var n=t||{};if(n.slots)return Lp(e,n);var a=Ui(n.state),i=Array.from(wi(a)),r=Ol(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(wi(a)),when:0}]}),s=r.core;function l(c){return a.chain[ei.indexOf(c)]}return s.setParam=function(c,d,u,p){var f=Ca(c);if(!(!f||r.disposed||r.tooFar(p))){var m=l(f),g;if(d==="bypass")g=!!u;else{var y=Dl(f,d);if(!y)return;g=it(y,u,bn(y,m.dials))}return d==="bypass"?m.bypass=g:m.dials[d]=g,r.post({t:"p",i:Vi[f][d],v:Gi(f,d,g),when:r.whenOf(p)}),r.emit({effect:f,key:d,value:g}),ti(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(v){return v.key===d}))){var b=m.dials[h.key],x=it(h,b,bn(h,m.dials));x!==b&&(m.dials[h.key]=x,r.post({t:"p",i:Vi[f][h.key],v:Gi(f,h.key,x),when:r.whenOf(p)}),r.emit({effect:f,key:h.key,value:x}))}}),g}},s.meter=function(){return r.meter("",_l)},s.getParam=function(c,d){var u=Ca(c);if(u){var p=l(u);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return ju(a)},s.setState=function(c,d){r.disposed||r.tooFar(d&&d.at)||(a=Ui(c),r.post({t:"load",program:Array.from(wi(a)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},s}function Lp(e,t){var n=t.slots===!0?Na:Math.max(1,Math.min(Ep,Math.floor(+t.slots)||Na)),a=qn(t.state,n),i=1,r={},s={};function l($){return!Fl($.type)||Ae($.type)!==null}function c($){var k=Ae($.type);return k&&k.plugin?k.plugin.engine:$.type}function d($){return r[$.id]||(r[$.id]=i++),r[$.id]}function u($){return $.filter(l).map(function(k){return{uid:d(k),type:c(k),program:ct(k)}})}function p(){return a.chain.filter(l).map(function($){return r[$.id]})}var f=u(a.chain),m=p(),g=Ol(e,t,function(){return{slots:n,chain:f,order:m}},function(){return[{t:"sync",chain:u(a.chain),order:p(),when:0}]}),y=g.core;g.onPluginError=function($,k){for(var w in r)r[w]===$&&(s[w]=k,g.emit({effect:w,key:"error",value:k}))};function h($){var k;for(k=0;k<a.chain.length;k++)if(a.chain[k].id===$)return a.chain[k];var w=Oo($);if(w){for(k=0;k<a.chain.length;k++)if(a.chain[k].type===w)return a.chain[k]}return null}function b($,k){var w=d($);g.post({t:"add",uid:w,type:c($),when:k}),ct($).forEach(function(E){g.post({t:"ps",uid:w,k:E[0],v:E[1],when:k,snap:!0})})}function x($){g.post({t:"order",uids:p(),when:$})}function v($,k){var w={};a.chain.forEach(function(C){w[C.id]=C});var E=p().join();$.chain.forEach(function(C){var R=w[C.id];if(!l(C)){delete r[C.id];return}if(!R||R.type!==C.type||!r[C.id]){delete r[C.id],delete s[C.id],b(C,k);return}var B={};ct(R).forEach(function(O){B[O[0]]=O[1]}),ct(C).forEach(function(O){B[O[0]]!==O[1]&&g.post({t:"ps",uid:r[C.id],k:O[0],v:O[1],when:k})})});var M={};$.chain.forEach(function(C){M[C.id]=!0}),Object.keys(r).forEach(function(C){M[C]||delete r[C]}),Object.keys(s).forEach(function(C){M[C]||delete s[C]}),a=$,p().join()!==E&&x(k)}var S=y.dispose;return y.dispose=function(){S()},y.slots=n,y.meter=function($){return $==null||$===""?g.meter("",_l):g.meter("#"+$,function(k,w){var E=h($),M=E?r[E.id]:0,C=k[2];if(M){for(var R=3,B=0;B<C;B++,R+=4)if(k[R]===M){w.in=k[R+1],w.out=k[R+2],w.gr=k[R+3];return}}})},y.setParam=function($,k,w,E){var M=h($);if(!(!M||g.disposed||g.tooFar(E))){var C=Ae(M.type),R,B=null;if(!C)return k!=="bypass"?void 0:(M.bypass=!!w,g.emit({effect:M.id,key:k,value:M.bypass}),M.bypass);if(k==="bypass")R=!!w;else{for(var O=0;O<C.dials.length;O++)C.dials[O].key===k&&(B=C.dials[O]);if(!B)return;R=it(B,w,bn(B,M.dials))}var U={},re={};ct(M).forEach(function(I){U[I[0]]=I[1]}),C.dials.forEach(function(I){I.stepWhen&&(re[I.key]=M.dials[I.key])}),k==="bypass"?M.bypass=R:M.dials[k]=R,C.dials.forEach(function(I){I.stepWhen&&(M.dials[I.key]=it(I,M.dials[I.key],bn(I,M.dials)))});var Q=g.whenOf(E),ve=r[M.id];return ve&&ct(M).forEach(function(I){(U[I[0]]!==I[1]||B&&I[0]===B.k)&&g.post({t:"ps",uid:ve,k:I[0],v:I[1],when:Q})}),g.emit({effect:M.id,key:k,value:R}),Object.keys(re).forEach(function(I){I!==k&&M.dials[I]!==re[I]&&g.emit({effect:M.id,key:I,value:M.dials[I]})}),R}},y.getParam=function($,k){var w=h($);if(w)return k==="bypass"?w.bypass:w.dials[k]},y.setPattern=function($,k,w){var E=h($);if(!(!E||!E.pattern||g.disposed||g.tooFar(w))){var M=k&&typeof k=="object"?k:{},C=_o({levels:Array.isArray(M.levels)?M.levels:E.pattern.levels,shapes:Array.isArray(M.shapes)?M.shapes:E.pattern.shapes}),R={};ct(E).forEach(function(U){R[U[0]]=U[1]}),E.pattern=C;var B=r[E.id],O=g.whenOf(w);return B&&ct(E).forEach(function(U){R[U[0]]!==U[1]&&g.post({t:"ps",uid:B,k:U[0],v:U[1],when:O})}),g.emit({effect:E.id,key:"pattern",value:JSON.parse(JSON.stringify(C))}),JSON.parse(JSON.stringify(C))}},y.getPattern=function($){var k=h($);return k&&k.pattern?JSON.parse(JSON.stringify(k.pattern)):void 0},y.setGatePattern=function($,k,w){var E=h($),M=Rl(k);return!E||!E.pattern||!M||g.disposed||g.tooFar(w)?!1:(Object.keys(M.dials).forEach(function(C){y.setParam(E.id,C,M.dials[C],w)}),y.setPattern(E.id,M.pattern,w),!0)},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function($,k){g.disposed||g.tooFar(k&&k.at)||(v(qn($,n),g.whenOf(k&&k.at)),g.emit({effect:null,key:null,value:null}))},y.addEffect=function($,k){var w=k||{},E=jo($,a.chain);if(!(!E||a.chain.length>=n||g.disposed||g.tooFar(w.at))){if(w.dials){var M=qn({v:2,chain:[{id:E.id,type:E.type,dials:w.dials}]},1).chain[0];E.dials=M.dials}w.bypass===!0&&(E.bypass=!0);var C=a.chain.slice(),R=typeof w.index=="number"?Math.max(0,Math.min(C.length,w.index)):C.length;return C.splice(R,0,E),v({v:2,chain:C},g.whenOf(w.at)),g.emit({effect:E.id,key:"chain",value:"add"}),E.id}},y.removeEffect=function($,k){var w=h($),E=k&&k.at;return!w||g.disposed||g.tooFar(E)?!1:(v({v:2,chain:a.chain.filter(function(M){return M!==w})},g.whenOf(E)),g.emit({effect:w.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function($,k,w){var E=h($),M=w&&w.at;if(!E||g.disposed||g.tooFar(M))return!1;var C=np(a.chain,a.chain.indexOf(E),k);return C===a.chain?!1:(v({v:2,chain:C},g.whenOf(M)),g.emit({effect:E.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function($){var k={id:$.id,type:$.type,name:tp($),bypass:$.bypass};if($.plugin){var w=s[$.id]||0,E=!l($)||w===5;k.plugin={id:$.plugin.id,version:$.plugin.version,url:$.plugin.url,name:$.plugin.name,status:E?"missing":w?"failed":"ready"},w&&!E&&(k.plugin.error=jr[w]||jr[2])}return k})},y.toAstrid=function(){return lp(a)},y}function Kr(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Cp(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(h){return i.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,d=!1;function u(h){if(!r){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var b=r(l.timeAt(h));return typeof b=="number"&&isFinite(b)?b:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var b=l&&typeof l.bpm=="number"?l.bpm:Kr(c,0);b>0&&e.setTempo(b);return}var x=Kr(c,h);x>0&&e.setTempo(x);for(var v=c&&(c.points||c.tempoPoints)||[],S=0;S<v.length;S++){var $=v[S];if($.beat>h&&$.bpm>0){var k=u($.beat);k!==void 0&&e.setTempo($.bpm,k)}}}var f=typeof e.setBeat=="function";function m(){var h=l&&l.meter,b=h&&typeof h.beatsPerBar=="number"?h.beatsPerBar:0;f&&b>=1&&typeof e.setBar=="function"&&e.setBar(b)}function g(h){if(!(!r||typeof h!="number"||!isFinite(h))){var b=r(h);return typeof b=="number"&&isFinite(b)?b:void 0}}function y(){if(f){if(m(),!l||!l.running){e.freeRun();return}var h=s&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;isFinite(h)&&e.setBeat(h,u(h))}}return p(),y(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,u(h.atBeat)):h.kind==="snapshot"?(p(),y()):h.kind==="start"?(p(),f&&typeof h.beat=="number"&&isFinite(h.beat)&&(m(),e.setBeat(h.beat,g(h.at)))):h.kind==="stop"&&f&&e.freeRun(g(h.at)))})}const Np="/lucy/assets/worklet-CwdWwkqb.js";var Fp="nc-ui",zp={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ho={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},za={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Dp={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},gt={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Bp={light:{color:zp.color,semantic:Ho,component:za,runtime:Dp},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"8px","select-mark-h":"4px","select-mark-inset":"3px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Yi=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],Fn=e=>`--${Fp}-${e}`,Hl="data-nc-theme",Yr="nc-ui-theme-change",Rp="(prefers-color-scheme: dark)",Wo=e=>e?.documentElement??null,Wl=e=>e?.defaultView?.matchMedia?.(Rp)??null,qp=e=>e==="light"||e==="dark"?e:"system";function Ip(e=globalThis.document){return qp(Wo(e)?.getAttribute(Hl))}function Xi(e=globalThis.document){let t=Ip(e);return t!=="system"?t:Wl(e)?.matches?"dark":"light"}var Ul="data-nc-skin",Pp=(Yi.find(e=>e.default)??Yi[0])?.id??"prussian",Op=e=>Yi.some(t=>t.id===e)?e:Pp;function _p(e=globalThis.document){return Op(Wo(e)?.getAttribute(Ul))}function Vl(e,t=globalThis.document){let n=Wo(t);if(!n)return()=>{};let a=()=>`${Xi(t)} ${_p(t)}`,i=a(),r=()=>{let d=a();d!==i&&(i=d,e(Xi(t)))},s=t.defaultView?.MutationObserver,l=s?new s(r):null;l?.observe(n,{attributes:!0,attributeFilter:[Hl,Ul]});let c=Wl(t);return c?.addEventListener?.("change",r),t.addEventListener(Yr,r),()=>{l?.disconnect(),c?.removeEventListener?.("change",r),t.removeEventListener(Yr,r)}}var Qi=Ho["label-on-fill-dark"],Xr=Ho["label-on-fill-light"],jp=gt["label-min-contrast"],Hp=/^#[0-9a-f]{6}$/i,Wp=e=>typeof e=="string"&&Hp.test(e),wa=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Qr(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=r=>{let s=(r+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${wa(i(0)*255)}${wa(i(8)*255)}${wa(i(4)*255)}`}function Gl(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,a),r=Math.min(t,n,a),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Jr(e){let[t,n,a]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Ji(e,t){let[n,a]=[Jr(e),Jr(t)].sort((i,r)=>r-i);return(n+.05)/(a+.05)}var Da=e=>Ji(e,Qi)>=Ji(e,Xr)?Qi:Xr;function Kl(e,t,n,a=jp){let i=Qr(e,t,n),r=Da(i)===Qi?1:-1;for(let s=0;s<40&&Ji(i,Da(i))<a;s++)n+=r*.01,i=Qr(e,t,n);return i}function Up(e){let{h:t,s:n}=Gl(e),a=Kl(t,Math.min(n,gt["surprise-on-max-saturation"]),gt["surprise-on-lightness"]);return{fill:e,ink:Da(e),on:a,onInk:Da(a)}}var Vp=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Gp(e,t=Math.random){let[n,a]=gt["surprise-saturation"],[i,r]=gt["surprise-lightness"],s=gt["surprise-min-hue-gap"],l=Wp(e)?Gl(e).h:null,c=t()*360;return l!==null&&Vp(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),Kl(c,n+t()*(a-n),i+t()*(r-i))}function Kp(e){if(!e)return null;let t=Up(e);return{[Fn("surprise-fill")]:t.fill,[Fn("surprise-ink")]:t.ink,[Fn("surprise-on")]:t.on,[Fn("surprise-on-ink")]:t.onInk}}var Yp=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Xp=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Zr(e){let[t,n,a]=[1,3,5].map(l=>Yp(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function Qp([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*r,-1.2684380046*a+2.6097574011*i-.3413193965*r,-.0041960863*a-.7034186147*i+1.707614701*r].map(s=>wa(Xp(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Jp=gt["velocity-range"],Yl={min:za.rhythm["velocity-min"],max:za.rhythm["velocity-max"]},es=Object.fromEntries(Object.entries(Bp).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Zp(e,t=Yl){let[n,a]=Jp,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(i-n)/(a-n),s=t.ink??za.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Zr(t.min),c=Zr(t.max);return{velocity:i,t:r,fill:Qp(l.map((d,u)=>d+(c[u]-d)*r)),ink:s}}function ts(e,t=Yl){return{[Fn("velocity-fill")]:Zp(e,t).fill}}var eh={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},th={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","select-mark-h":"length","select-mark-inset":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},nh={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ah={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ai={};for(let[e,t]of Object.entries(th))ai[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(ah))ai[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(nh))ai[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(eh.renames.map(e=>[e.old,e.new]));function Xl(e){let t=ai[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function ee(e){return Xl(e).prop}function o(e){return`var(${ee(e)})`}function ih(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(ee(t)));return Number.isFinite(n)?n:0}function ue(e,t){let n=Xl(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function Ql(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function oh(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=o("font-ui"),n.style.fontSize=o("label-size"),n.style.fontWeight=o("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var rh="[data-modulated], [data-modulated] *";function ki(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function ns(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${o("hairline")} solid ${o("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function xi(e){return`  background-image: conic-gradient(from -45deg at 50% 100%, ${o(e)} 90deg, transparent 0);`}function sh(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${o(`module-bg-stack-${a}`)};
      ${ee("text-sub")}: ${o(`module-sub-stack-${a}`)};
      ${ee("divider")}: ${o(`module-div-stack-${a}`)};
      ${ee("slider-track")}: ${o(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${o(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${o(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${o("module-bg-stack-1")};
      ${ee("text-sub")}: ${o("module-sub-stack-1")};
      ${ee("divider")}: ${o("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("body-size")};
  font-weight: ${o("title-weight")};
  line-height: ${o("label-leading")};
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
  padding: ${o("page-pad-y")} ${o("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${o("page-action-gap")};
  min-width: 0;
  padding-bottom: ${o("page-head-gap")};
  border-bottom: ${o("hairline")} solid ${o("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${o("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${o("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${o("page-pad-x")} * -1);
  right: calc(${o("page-pad-x")} * -1);
  background: ${o("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${o("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${o("page-title-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${o("page-sub-gap")} 0 0; font-size: ${o("page-sub-size")}; color: ${o("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${o("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${o("control-gap")} ${o("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${o("control-gap")};
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-page-action:hover { color: ${o("text")}; border-bottom-color: ${o("text")}; }
.nc-page-action:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
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
    min-width: ${o("target-min")};
    min-height: ${o("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${o("target-min")} - ${o("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${o("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${o("target-min")} / 2.75); height: calc(${o("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${o("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${o("control-gap")};
    background: ${o("surface-page")};
    color: ${o("text")};
    border-bottom: ${o("hairline")} solid ${o("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${o("page-pad-x")} * -1);
    right: calc(${o("page-pad-x")} * -1);
    padding-inline: ${o("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${o("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${o("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${o("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${o("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${o("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${o("page-pad-x-md")} * -1);
    right: calc(${o("page-pad-x-md")} * -1);
    padding-inline: ${o("page-pad-x-md")};
  }
}
.nc-module {
  background: ${o("module-bg-adjacent-1")};
  color: ${o("text")};
  padding: ${o("module-pad")};
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${o("font-ui")};
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
  gap: ${o("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${o("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${o("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${o("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${o("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${o("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${o("title-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${o("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${o("header-gap")}; flex: none; }
.nc-index {
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${o("control-gap")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("body-size")};
  line-height: ${o("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${o("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${o("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${o("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
.nc-slim-lines {
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${o("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${o("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${o("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${o("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${o("readout-size")};
  color: ${o("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${o("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${o("name-width")} - ${o("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${o("name-width")} - ${o("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${o("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${o("module-gap")};
  row-gap: ${o("control-gap")};
  padding-bottom: ${o("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${o("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${o("control-gap")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  line-height: ${o("label-leading")};
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
  bottom: calc(-1 * ${o("control-gap")});
  width: max(100%, ${o("target-min")});
  height: max(100%, ${o("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${o("text-sub")}; color: ${o("text")}; }
.nc-tap:active { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-tap:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${o("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  padding: ${o("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${o("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${o("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${o("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${o("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${o("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${o("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${o("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${o("hairline")};
  background: ${o("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${o("hairline")};
  background: ${o("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${o("hairline")};
  background: ${o("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${o("slider-thumb-size")};
  height: ${o("slider-thumb-size")};
  margin-top: calc(${o("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${o("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${o("slider-thumb-size")};
  height: ${o("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${o("slider-thumb")};
  transition: none;
}
${rh} { transition: none; }
.nc-range:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${o("hairline")} solid ${o("text")};
  background: transparent;
  color: ${o("text")};
  min-height: ${o("target-min")};
  padding: ${o("button-pad-y")} 0;
  font-size: ${o("readout-size")};
  letter-spacing: ${o("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${o("transition-feedback")};
}
.nc-btn:hover { background: ${o("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${o("accent")};
  border-color: ${o("accent")};
  color: ${o("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${o("focus-width-strong")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
.nc-btn:disabled { color: ${o("text-sub")}; border-color: ${o("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${o("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${o("text")}; }
.nc-toggle:hover { border-bottom-color: ${o("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${o("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${o("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${o("rhythm.track-solo")};
  border-bottom-color: ${o("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  margin-bottom: ${o("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${o("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("tab-size")};
  font-weight: ${o("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${o("label-size")}; padding-inline: ${o("control-gap")}; }
.nc-seg > button:hover { color: ${o("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${o("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${o("hairline")} * -1);
  height: ${o("tab-mark")};
  background: ${o("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: calc(${o("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("divider")};
  border-radius: 0;
  color: ${o("text")};
  font-size: ${o("body-size")};
  padding: ${o("control-gap")} ${o("select-pad-end")} ${o("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${o("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${o("accent")}; }
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; 2026-11-24: ASTRID's ▾, 8×4 px, 3 px in, on
   every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${xi("text-sub")}
  background-size: ${o("select-mark")} ${o("select-mark-h")};
  background-position: right ${o("select-mark-inset")} top 55%;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${xi("text")}
}
:is(.nc-select, .nc-dd):disabled {
${xi("divider")}
}
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${o("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${o("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${o("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${o("slot-size")};
  width: ${o("slot-size")};
  max-width: ${o("slot-size")};
  min-width: 0;
  height: ${o("slot-size")};
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
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("slot-font-size")};
  line-height: ${o("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${o("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${o("text-sub")};
  color: ${o("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${o("accent")};
  color: ${o("accent")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${o("accent")};
  outline: ${o("focus-width")} solid ${o("accent-faint")};
  outline-offset: ${o("hairline")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${o("accent")};
  background: ${o("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${o("control-gap")};
  right: ${o("control-gap")};
  width: ${o("control-gap")};
  height: ${o("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${o("sparkle-size")};
  width: ${o("sparkle-size")};
  height: ${o("sparkle-size")};
  margin-inline: ${o("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${o("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${o("target-min")};
  width: ${o("target-min")};
  min-height: ${o("target-min")};
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  background: ${o("surprise-fill")};
  color: ${o("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${o("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${o("target-min")} / 2); height: calc(${o("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${o("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-sparkle svg { width: ${o("sparkle-icon-size")}; height: ${o("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${o("text")}; }
.nc-sparkle:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${o("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${o("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${o("name-width")};
  width: ${o("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${o("beat-gap")} - ${o("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${o("row-inset")});
  padding-inline: ${o("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${o("accent-tint")};
  box-shadow: inset ${o("marker-width")} 0 0 ${o("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${o("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${o("text")};
  text-decoration: underline;
  text-decoration-color: ${o("accent")};
  text-decoration-thickness: ${o("hairline")};
  text-underline-offset: ${o("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${o("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${o("move-row-gap")}; margin-top: ${o("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${o("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${o("move-label-width")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${o("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${o("move-size")};
  height: ${o("move-size")};
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${o("move-icon")}; height: ${o("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${o("text")}; border-color: ${o("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-moves-btn:disabled { color: ${o("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${o("target-min")}; height: ${o("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${o("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${o("text-sub")}; border-color: ${o("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${o("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${o("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${o("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${o("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${o("slider-pitch")};
  height: ${o("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${o("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${o("rhythm.track-mute")};
  border-color: ${o("rhythm.track-mute")};
  color: ${o("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${o("rhythm.track-solo")};
  border-color: ${o("rhythm.track-solo")};
  color: ${o("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${o("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${o("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
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
  background: ${o("velocity-fill")};
  border-color: ${o("velocity-fill")};
  color: ${o("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${o("playhead-width")} solid ${o("rhythm.playhead")};
  outline-offset: ${o("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${o("rhythm.bar-accent")}; }
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${o("rhythm.step-mark-inset")};
  bottom: ${o("rhythm.step-mark-inset")};
  font-family: ${o("font-readout")};
  font-size: ${o("rhythm.step-mark-size")};
  font-weight: ${o("control-weight")};
  line-height: 1;
  color: ${o("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${o("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${o("rhythm.step-mark-inset")} + ${o("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${o("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${o("control-gap")};
  margin-inline: calc((${o("control-gap")} + ${o("rhythm.step-gap")}) / -2);
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
  width: ${o("hairline")};
  height: ${o("target-min")};
  max-height: calc(${o("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${o("hairline")} solid ${o("text-sub")};
  background: ${o("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${o("text")}; border-color: ${o("text")}; }
.nc-len-handle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${o("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${o("accent")}; }
.nc-pad[data-out="true"] { border-color: ${o("divider")}; border-style: dashed; background: transparent; color: ${o("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${o("focus-width")} * 2) 0 0 ${o("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${o("focus-width")} * 2) 0 0 ${o("text")}, inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
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
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${o("module-gap")};
  margin-bottom: ${o("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${o("target-min")} / 3); height: calc(${o("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${o("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${o("target-min")};
  min-height: ${o("target-min")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${o("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${o("text")}; border-color: ${o("text")}; color: ${o("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${o("control-gap")};
  color: ${o("text-sub")};
  font-weight: ${o("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${o("text")}; border-bottom-color: ${o("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${o("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${o("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${o("target-min")} * 1.25);
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${o("control-gap")} ${o("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${o("velocity-fill")};
  border-color: ${o("velocity-fill")};
  color: ${o("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${o("rhythm.accent-mark-size")}) 0 0 ${o("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${o("playhead-width")} solid ${o("rhythm.playhead")};
  outline-offset: ${o("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${o("divider")}; color: ${o("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${o("text-sub")}; border-color: ${o("text-sub")}; color: ${o("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
.nc-step:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${o("playhead-width")};
  outline-offset: ${o("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${o("module-pad")} * -1);
  padding: ${o("stack-card-pad-y")} ${o("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${o("module-gap")} 0;
  font-size: ${o("body-size")};
  font-weight: ${o("fx-name-weight")};
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
  gap: ${o("module-gap")};
  margin-bottom: ${o("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${o("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
/* The horizontal-fold toggle (foldToggle): a small solid triangle, about the ×'s size, in text-sub (ink on hover).
   ▶ while open, flipped to ◀ while folded (Peter, 2026-11-24, reversing 2026-10-31); the flip takes motion-press,
   and reduced motion makes it instant. −/+
   (.nc-hide) stays the vertical hide: the triangle means fold sideways. */
.nc-fold-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin: 0;
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${o("text")}; }
.nc-fold-toggle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${o("control-gap")} * 1.5);
  height: calc(${o("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${o("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${o("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${o("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${o("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${o("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${o("control-gap")};
  border-bottom: ${o("hairline")} solid transparent;
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  line-height: ${o("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${o("text")}; border-bottom-color: ${o("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${o("body-size")};
  font-weight: ${o("fx-name-weight")};
  color: ${o("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${o("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${o("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${o("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${o("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  height: ${o("level-steps-height")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("eq-graph-bg")};
  border-radius: ${o("slot-radius")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${o("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${o("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${o("beat-gap")} - ${o("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${o("level-steps-bar")}; }
.nc-lsteps-env { fill: ${o("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${o("level-steps-curve")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${o("divider")}; stroke-width: ${o("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${o("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${o("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${o("playhead-width")} solid ${o("playhead")}; outline-offset: ${o("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${o("level-steps-free")}; outline-width: ${o("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${o("playhead-width")} * -1) 0 0 ${o("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${o("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${o("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${o("slot-gap")} * 2) * -1));
  padding: calc(${o("slot-gap")} / 2) calc(${o("slot-gap")} * 2);
  border-radius: ${o("slot-radius")};
  background: ${o("accent")};
  color: ${o("on-accent")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${o("slot-gap")};
  padding: ${o("slot-gap")} calc(${o("slot-gap")} * 2) 0;
  font-family: ${o("font-readout")};
  font-size: ${o("slot-font-size")};
  line-height: 1;
  color: ${o("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${o("hairline")} solid ${o("divider")}; margin-top: ${o("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${o("slot-gap")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${o("slot-gap")} 0 ${o("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${o("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${o("hairline")} * -1);
  height: ${o("tab-mark")};
  background: ${o("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${o("label-size")} * 1.8); height: calc(${o("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${o("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${o("slot-gap")};
  padding: calc(${o("slot-gap")} * 2);
  background: ${o("surface-page")};
  border-radius: ${o("slot-radius")};
  box-shadow: 0 0 0 ${o("hairline")} ${o("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${o("slot-gap")} * 2); font-family: ${o("font-readout")}; font-size: ${o("readout-size-small")}; color: ${o("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${o("slot-gap")} * 2); border-radius: ${o("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${o("on-accent")}; background: ${o("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${o("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${o("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${o("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${o("eq-graph-height")};
  background: ${o("eq-graph-bg")};
  border-radius: ${o("slot-radius")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${o("eq-curve")};
  position: absolute;
  width: ${o("eq-node-size")};
  height: ${o("eq-node-size")};
  margin: calc(${o("eq-node-size")} / -2) 0 0 calc(${o("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${o("hairline")} ${o("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${o("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${o("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${o("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${o("target-min")};
  height: ${o("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${o("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${o("hairline")} * 2) ${o("eq-graph-bg")}, 0 0 0 calc(${o("hairline")} * 2 + ${o("focus-width")}) ${o("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${o("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${o("hairline")} ${o("control-gap")};
  border-radius: ${o("slot-radius")};
  background: ${o("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${o("hairline")} ${o("divider")};
  color: ${o("text")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  line-height: ${o("label-leading")};
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
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${o("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-close { font-size: ${o("title-size")}; padding-inline: ${o("control-gap")}; }
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
  padding: 0 ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${o("control-gap")} * -1);
  right: calc(${o("control-gap")} * -1);
  height: max(100%, calc(${o("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${o("text")}; }
.nc-fx-remove:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${o("control-gap")} * 2.5); height: calc(${o("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${o("control-gap")} * 1.1);
  height: calc(${o("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${o("motion-press")} ${o("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${o("hairline")} * 1.5); border-top-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${o("hairline")} * 1.5); border-top-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${o("hairline")} * 1.5); border-bottom-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${o("hairline")} * 1.5); border-bottom-width: calc(${o("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${o("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${o("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${o("module-pad")} * 2);
  row-gap: ${o("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${o("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${o("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${o("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${o("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${o("hairline")} ${o("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${o("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${o("control-gap")};
  cursor: pointer;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
}
.nc-ui-more > summary:hover { color: ${o("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${o("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${o("module-gap")};
  row-gap: ${o("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${o("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${o("text-sub")};
}
.nc-group-toggle:hover { color: ${o("text")}; }
.nc-group-toggle:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${o("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${o("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${o("control-gap")};
  border: 0;
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${o("text")}; border-bottom-color: ${o("accent")}; }
.nc-ui-switch:hover { color: ${o("text")}; border-bottom-color: ${o("text")}; }
.nc-ui-switch:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
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
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${o("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  padding: ${o("module-pad")};
  background: ${o("surface-page")};
  border-top: ${o("hairline")} solid ${o("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${o("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${o("title-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  color: ${o("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${o("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${o("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${o("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${o("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${o("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${o("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${o("danger")}; }
.nc-knob {
  width: ${o("knob-size")};
  height: ${o("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${o("hairline")} solid ${o("divider")};
  background: ${o("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${o("control-gap")};
  width: ${o("hairline")};
  height: ${o("control-gap")};
  background: ${o("text")};
  transform-origin: center ${o("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${o("control-gap")} ${o("header-gap")};
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
  border-bottom: ${o("hairline")} solid transparent;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  padding: ${o("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${o("target-min")}; min-height: ${o("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${o("text")};
  border-bottom-color: ${o("accent")};
}
.nc-choice:focus-visible {
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${o("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${o("target-min")} * 1.5);
  padding: ${o("control-gap")} ${o("control-gap")} ${o("control-gap")} calc(${o("control-gap")} * 2);
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${o("control-gap")};
  inset-inline-start: ${o("hairline")};
  width: ${o("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${o("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${o("text-sub")}; font-size: ${o("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${o("control-gap")};
  inset-inline-end: ${o("control-gap")};
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${o("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${o("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${o("control-gap")};
  border-color: ${o("divider")};
  background: ${o("divider")};
  color: ${o("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${o("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${o("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${o("accent")}; box-shadow: inset 0 0 0 ${o("hairline")} ${o("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${o("target-min")};
  padding: 0 ${o("control-gap")};
  border: ${o("hairline")} solid ${o("accent")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${o("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${o("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${o("control-gap")};
  min-width: ${o("name-width")};
  padding: ${o("control-gap")};
  background: ${o("surface-page")};
  border: ${o("hairline")} solid ${o("divider")};
  color: ${o("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${o("target-min")};
  border: 0;
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${o("target-min")};
  margin-block: calc((${o("slider-pitch")} - ${o("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${o("target-min")}; height: ${o("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${o("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${o("target-min")}); right: calc(${o("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${o("target-min")});
    height: max(100%, ${o("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${o("target-min")} - ${o("slider-pitch")}) / 2);
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
  outline: ${o("focus-width")} solid ${o("focus-ring")};
  outline-offset: ${o("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${o("target-min")};
  height: ${o("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${o("target-min-coarse")}; height: ${o("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${o("module-gap")};
  width: calc(${o("name-width")} * 6);
  max-width: calc(100vw - 2 * ${o("module-gap")});
  padding: ${o("module-gap")};
  background: ${o("surface-page")};
  border: ${o("hairline")} solid ${o("divider")};
  color: ${o("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${o("focus-width")} solid ${o("text")};
  outline-offset: ${o("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${o("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${o("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${o("module-gap")};
  min-height: ${o("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${o("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${o("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${o("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${o("target-min")};
  min-height: ${o("target-min")};
  border: 0;
  background: none;
  color: ${o("text")};
  font-family: ${o("font-ui")};
  font-size: ${o("label-size")};
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${o("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${o("hairline")} 0 0;
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
  gap: ${o("toast-gap")};
  max-width: calc(100vw - 2 * ${o("toast-offset")});
  min-height: ${o("toast-target")};
  padding: 0 0 0 ${o("toast-pad-x")};
  border-radius: ${o("toast-radius")};
  background: ${o("toast-bg")};
  color: ${o("toast-text")};
  font-family: ${o("font-ui")};
  font-size: ${o("toast-font-size")};
  line-height: ${o("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${o("motion-fade")} ${o("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${o("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${o("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${o("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${o("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${o("motion-fade-out")} ${o("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${o("toast-pad-x")} / 2) calc(${o("toast-pad-x")} * 0.75);
  border-radius: ${o("toast-radius")};
  background: ${o("toast-bg")};
  color: ${o("toast-text")};
  font-family: ${o("font-ui")};
  font-size: ${o("toast-font-size")};
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
  min-width: ${o("toast-target")};
  min-height: ${o("toast-target")};
  padding: 0 ${o("toast-pad-x")};
  border: 0;
  background: none;
  color: ${o("toast-action")};
  font: inherit;
  font-weight: ${o("title-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${o("focus-width")} solid ${o("toast-action")};
  outline-offset: calc(-2 * ${o("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${o("hairline")};
  height: ${o("hairline")};
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
  margin-inline: calc(${o("module-pad")} * -1);
  margin-bottom: calc(${o("module-pad")} * -1);
  border-top: ${o("hairline")} solid ${o("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${o("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${o("module-pad")} ${o("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${o("module-bg-stack-1")};
  ${ee("text-sub")}: ${o("module-sub-stack-1")};
  ${ee("divider")}: ${o("module-div-stack-1")};
  ${ee("slider-track")}: ${o("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  border-inline-end: ${o("hairline")} solid ${o("module-div-stack-1")};
  background: ${o("module-bg-stack-1")};
  ${ee("text-sub")}: ${o("module-sub-stack-1")};
  ${ee("divider")}: ${o("module-div-stack-1")};
  ${ee("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${o("control-gap")} ${o("module-pad")};
  padding-bottom: ${o("module-pad")};
  background: ${o("module-bg-stack-1")};
  ${ee("text-sub")}: ${o("module-sub-stack-1")};
  ${ee("divider")}: ${o("module-div-stack-1")};
  ${ee("slider-track")}: ${o("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${o("stack-card-pad-y")} ${o("module-pad")} ${o("module-pad")};
  ${ee("text-sub")}: inherit;
  ${ee("divider")}: inherit;
  ${ee("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${o("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${o("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${o("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${o("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${o("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${o("fx-card-width")}; }
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
    width: calc(${o("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${o("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${o("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${o("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${o("module-gap")} * 3), 100% ${o("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${o("module-pad")} * -1) calc(${o("module-gap")} * -1);
    padding: ${o("stack-card-pad-y")} ${o("module-pad")} calc(${o("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${o("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${o("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${o("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${o("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${o("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${o("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${o("fx-card-width")};
    margin-inline-end: calc(${o("fx-card-width")} * -1);
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
    gap: ${o("module-gap")};
    height: ${o("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${o("target-min")};
  height: ${o("target-min")};
  margin: 0;
  padding: 0;
  border: ${o("hairline")} solid ${o("text-sub")};
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${o("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${o("divider")}; border-color: ${o("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${o("control-gap")} * 2.5);
  height: calc(${o("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${o("hairline")} * 2) calc(${o("hairline")} * 2) 0 0;
  transform: translateX(calc(${o("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${o("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${o("text")};
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
  --nc-strip-ms-row: ${o("slider-pitch")};
  --nc-strip-knob-row: calc(${o("knob-size")} + ${o("control-gap")} + ${o("label-size")} * ${o("label-leading")});
  position: relative;
  flex: none;
  width: ${o("strip-width")};
  display: grid;
  grid-template-columns: ${o("control-gap")} minmax(0, 1fr) ${o("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${o("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${o("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${o("hairline")} solid ${o("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${o("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${o(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${ee("divider")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${ee("meter-track")}: color-mix(in oklab, ${o("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${o("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${o("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${o("control-gap")};
  min-width: calc(${o("strip-width")} * 2.5);
  padding: calc(${o("control-gap")} * 2) calc(${o("control-gap")} * 2.5);
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: ${o("surface-page")};
  color: ${o("text")};
  font-size: ${o("label-size")};
}
.nc-strip-menu-title { color: ${o("text-sub")}; font-weight: ${o("label-weight")}; letter-spacing: ${o("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${o("control-gap")}; margin-bottom: ${o("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${o("control-gap")} * 4.5);
  height: calc(${o("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${o("hairline")};
  border: ${o("hairline")} solid ${o("divider")};
  border-radius: ${o("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${o("text-sub")};
  font: inherit;
  font-size: ${o("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${o("hairline")} * 2) solid ${o("text")}; outline-offset: ${o("hairline")}; color: ${o("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${o("control-gap")} * 3);
  margin: 0;
  padding: ${o("control-gap")} 0;
  border: 0;
  border-top: ${o("hairline")} solid ${o("divider")};
  background: transparent;
  color: ${o("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${o("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${o("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: calc(${o("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${o("target-min")} * 0.7); height: calc(${o("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${o("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${o("stack-card-pad-y")} ${o("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${o("stack-card-pad-y")} ${o("module-pad")}; }
.nc-strip[data-nc-master] { width: ${o("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${o("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  font-family: ${o("font-readout")};
  font-size: ${o("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${o("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${o("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${o("danger")}; }
.nc-strip-remove:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
  text-transform: uppercase;
  color: ${o("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${o("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ◀ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${o("control-gap")}; left: ${o("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${o("control-gap")};
  right: ${o("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${o("hairline")};
  border: 0;
  background: transparent;
  color: ${o("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${o("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${o("control-gap")} * 1.5);
  height: calc(${o("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${o("hairline")}, transparent calc(${o("hairline")} * 1.5)) 0 0 / calc(${o("control-gap")} * 0.75) calc(${o("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${o("control-gap")} * -1);
    top: calc(${o("control-gap")} * -1);
    width: calc(${o("target-min")} / 2);
    height: calc(${o("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${o("strip-fold-width")};
  align-content: start;
  grid-template-columns: 0 minmax(0, 1fr) 0;
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" ". body ." ". db .";
}
/* Trim (a strip's trim, or the master's trimRow): a knob row at the top, under the name, before the Inserts; every row
   still named. trimHidden (the host's phones) takes the row out, the knob kept unseen. Folded, the trim row joins the
   M and S area. */
.nc-strip > .nc-strip-trim { grid-area: trim; display: flex; justify-content: center; align-items: flex-start; }
.nc-strip:not([data-nc-trim]) > .nc-strip-trim, .nc-strip[data-nc-folded] > .nc-strip-trim { display: none; }
.nc-strip[data-nc-trim] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${o("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-trim] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-folded][data-nc-trim][data-nc-sends-hidden] {
  grid-template-areas: ". hd ." "ms ms ms" "ms ms ms" "ms ms ms" "ms ms ms" ". body ." ". db .";
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
  grid-auto-columns: ${o("slider-pitch")};
  grid-auto-rows: ${o("slider-pitch")};
  gap: ${o("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${o("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${o("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${o("control-gap")}; }
.nc-strip-fold { gap: ${o("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${o("label-size")}; font-weight: ${o("label-weight")}; letter-spacing: ${o("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${o("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${o("fader-cap-height")};
  height: ${o("control-gap")};
  background: linear-gradient(${o("divider")}, ${o("divider")}) center / 100% ${o("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${o("control-gap")}));
  width: ${o("control-gap")};
  height: ${o("control-gap")};
  border-radius: 50%;
  background: ${o("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${o("fader-cap-height")};
  height: ${o("control-gap")};
  background: var(--nc-strip-cap, ${o("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${o("slider-pitch")};
  grid-template-rows: ${o("slider-pitch")};
  column-gap: ${o("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${o("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${o("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${o("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${ee("divider")}: ${o("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${o("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${o("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${o("hairline")} solid color-mix(in oklab, ${o("text-sub")} 50%, ${o("strip-divider")});
  border-radius: ${o("slot-radius")};
  background: transparent;
  color: ${o("strip-hacks-text")};
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${o("text")}; border-color: ${o("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${o("fader-cap-master")};
  border-color: ${o("fader-cap-master")};
  color: ${o("surface-page")};
}
.nc-hacks:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${o("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${o("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${o("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${o("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${o("meter-track")} calc(var(--knob-from, 135) * 1deg), ${o("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${o("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${o("label-size")};
  line-height: ${o("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${o("fader-cap-width")} auto auto;
  grid-template-rows: ${o("clip-size")} ${o("fader-height")};
  justify-content: center;
  column-gap: ${o("control-gap")};
  row-gap: ${o("control-gap")};
  padding-block: calc(${o("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${o("font-readout")};
  font-size: ${o("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${o("text-sub")};
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
  width: ${o("fader-cap-width")};
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
  width: ${o("rule-strong")};
  transform: translateX(-50%);
  background: ${o("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${o("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${o("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${o("hairline")};
  transform: translateY(-50%);
  background: ${o("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${o("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${o("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${o("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${o("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${o("clip-size")};
  padding: 0;
  border: 0;
  background: ${o("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${o("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${o("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-meter-bars { display: flex; gap: ${o("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${o("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${o("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${o("meter-peak")}; }
.nc-meter-rms { background: ${o("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${o("rule-strong")} solid ${o("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${o("hairline")}; height: ${o("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${o("fx-level-bar")}; overflow: hidden; background: ${o("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${o("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${o("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${o("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${o("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${o("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${o("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${o("divider")}; text-underline-offset: ${o("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${o("hairline")} solid ${o("accent")};
  border-radius: 0;
  background: transparent;
  color: ${o("text")};
  font-family: ${o("font-readout")};
  font-size: ${o("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${o("strip-width")};
  margin-inline-start: ${o("module-gap")};
  border: ${o("hairline")} dashed ${o("divider")};
  color: ${o("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${o("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${o("text")}; border-color: ${o("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${o("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${o("font-readout")}; font-size: ${o("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${o("label-size")};
  font-weight: ${o("label-weight")};
  letter-spacing: ${o("label-tracking")};
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
  font-size: ${o("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
.nc-strip-db:focus-visible { outline: ${o("focus-width")} solid ${o("focus-ring")}; outline-offset: ${o("hairline")}; }
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
    border-top: ${o("hairline")} solid ${o("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${o("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${o("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${o("module-pad-x-desktop")};
    padding-bottom: ${o("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${o("stack-card-pad-y")} ${o("module-pad-x-desktop")} ${o("module-pad-y-desktop")};
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
  background: ${o("accent")};
  font-family: ${o("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${o("page-pad-y-md")} ${o("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${o("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${o("page-pad-y-md")} * -1); left: calc(${o("page-pad-x-md")} * -1); right: calc(${o("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${o("header-gap")};
  padding-inline: ${o("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${o("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${o("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${o("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${o("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${o("target-min")}; }
  .nc-snap { font-size: ${o("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${o("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${o("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${o("page-pad-x-xl")} * -1); right: calc(${o("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${o("hairline")} solid ${o("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${o("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${o("target-min")};
  }
  .nc-snap { font-size: ${o("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
    padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${o("module-pad-y-desktop")} * -1);
    padding: ${o("module-pad-y-desktop")} ${o("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${o("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${o("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${o("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${o("module-pad-x-desktop")} * -1);
    padding-inline: ${o("module-pad-x-desktop")};
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
    border-bottom: ${o("hairline")} solid ${o("divider")};
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
    gap: ${o("module-gap")};
    padding-block: ${o("control-gap")};
    background: ${o("surface-page")};
    border-bottom: ${o("hairline")} solid ${o("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${o("module-gap")};
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
    max-width: ${o("slot-span")};
    height: ${o("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${o("readout-size")}; }
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
${ns("")}
}
@media (max-width: 1023px) {
${ns("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${ki("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${ki("")}
}
@media (max-width: 1023px) {
${ki("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${o("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${o("fill-panel")};
  border-radius: ${o("fill-radius")};
  box-shadow: inset 0 0 0 ${o("fill-gutter")} ${o("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${o("fill-radius")} ${o("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${o("fill-cell")};
  border-color: ${o("fill-cell")};
  border-radius: ${o("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${o("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${o("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${o("fill-panel")}) 9%, ${o("fill-panel")});
  border-radius: ${o("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${o("fill-panel")}) 14%, ${o("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${o("fill-panel")}) 14%, ${o("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${o("fill-panel")}; }
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${o("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${o("focus-width")} * 2) 0 ${o("accent-faint")};
  }
}
`}var $i=null,lh="nc-ui-fallback";function Jl(e=globalThis.document){if(!e?.documentElement||(e.documentElement,$i&&$i.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${lh} {
${sh()}
}
`,e.head.append(t),$i=t}var ch=new URL("/lucy/assets/confirm-DwyQU4Nn.css",import.meta.url).href,dh=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=ch,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&dh(document);function Uo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(i,r),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Zl=new WeakMap,as=.25;function uh(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let r=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{let b=d(h);b!==r&&(r=b,u(),l?.(b))},f=0,m=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();h.target!==i&&b.height>0&&p(1-(h.clientY-b.top)/b.height),f=h.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!m)return;let b=n.getBoundingClientRect().height||1,x=(f-h.clientY)/b*(h.shiftKey?as:1);f=h.clientY,p(r+x)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let b=h.shiftKey?s*as:s,x={ArrowUp:r+b,ArrowRight:r+b,ArrowDown:r-b,ArrowLeft:r-b,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};h.key in x&&(h.preventDefault(),p(x[h.key]))});let y={el:n,get value(){return r},get dragging(){return m},set(h){m||(r=d(Number(h)||0),u())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(c=h.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),Zl.set(n,y),y}function ph(e){return Zl.get(e)}var ec=new WeakMap,hh=.2,fh=1.5,mh=.5;function gh(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function is(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:gh(a.getComputedStyle(e).getPropertyValue(ee(t)),n)}function bh(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let h=t.createElement("span");h.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(b,x,v),r.append(h),s.push({peak:b,rms:x,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,r);let l=e.label,c=e.onClear,d=!1,u=-1,p=-1,f=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},m=(y,h,b,x)=>{let v=Math.round(x*1e3)/1e3;b[h]!==v&&(b[h]=v,y.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};i.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(y,h){u<0&&(u=is(a,"motion-meter-fall",hh)),p<0&&(p=is(a,"motion-meter-hold",fh));let b=Math.max(0,Math.min(.25,Number(h)||0)),x=u>0?Math.exp(-b/u):0;s.forEach((v,S)=>{let $=y[S]??y[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number($.peak)||0)),w=Math.min(k,Math.max(0,Number($.rms)||0));$.over&&g.clip(),v.level.peak=k>=v.level.peak?k:k+(v.level.peak-k)*x,v.level.rms=w>=v.level.rms?w:w+(v.level.rms-w)*x,v.holdAge+=b,k>=v.holdAt?(v.holdAt=k,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(k,v.holdAt-mh*b)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(c=y.onClear)}};return f(),g.reset(),ec.set(a,g),g}function yh(e){return e?ec.get(e):void 0}var vh=3,wh=new Set(["freq","q","rate","time","log"]);function Vo(e,t,n){return!e||!wh.has(e)||!(n>t)?"linear":t>0?"log":"power"}function ii(e,t,n){return Vo(e,t,n)!=="linear"}function Ba(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),s=Vo(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function tc(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),r=Vo(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**vh:i)}function nc(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function Go(e,t,n,a){return Math.round(Ba(e,t,n,a)*1e3)}function Zi(e,t,n,a,i){return nc(tc(e,t,n,Number(a)/1e3),t,n,i)}function kh(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=a+i:t==="ArrowLeft"||t==="ArrowDown"?r=a-i:t==="PageUp"?r=a+1e3/10:t==="PageDown"?r=a-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function ac(e,t,n,a,i,r=!1,s){let l=Go(e,t,n,a),c=kh(l,i,r);if(c===null)return null;let d=Zi(e,t,n,c,s),u=Math.sign(c-l),p=nc(Number(a),t,n,s);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=Zi(e,t,n,c,s);return d}function xh(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function os(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function $h(e,t,n,a=n/6){let i=e.some(u=>u===null),r=Math.max(0,n-(i?a:0)),s=e.reduce((u,p,f)=>p===null?u:u+os(t[f]),0),l=s>0?r/s:0,c=e.map(u=>u===null?0:Math.min(r,os(u)*l));if(i){let u=c.reduce((f,m)=>f+m,0),p=e.indexOf(null);c[p]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return i&&(d[d.length-1]=n),d}function Ah(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function ut(e){return Math.max(0,Math.min(1,e))}function ic(e,t){let{ctx:n,w:a,h:i}=Ah(e);if(!n)return;n.clearRect(0,0,a,i);let r=oh(e);if(t.paint==="swatch"){let c=ue(e,"accent"),d=ue(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,i),n.fillStyle=d,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Sh(n,a,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=ue(e,Ql(c)),u=ue(e,"divider"),p=ut(t.cutoff??.5),f=.08+(1-ut(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let g=m/Math.max(1,a),y=0;c==="lp"?y=g<p?1:Math.max(0,1-(g-p)/f):c==="hp"?y=g>p?1:Math.max(0,1-(p-g)/f):y=Math.max(0,1-Math.abs(g-p)/f);let h=i*.78-y*i*.62;m===0?n.moveTo(m,h):n.lineTo(m,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=ue(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ue(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,p,f]=$h([c,d],t.max??[1,4],a),m=2,g=i-1;n.beginPath(),n.moveTo(u,g),n.lineTo(p,m);let y=Math.max(1,Math.ceil(f-p));for(let h=1;h<=y;h++){let b=h/y;n.lineTo(p+(f-p)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(f,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],p=ue(e,"accent"),f=ue(e,"text-sub"),m=i/2;n.fillStyle=ue(e,"accent-soft"),n.fillRect(ut(d)*a,0,(ut(u)-ut(d))*a,i),n.strokeStyle=ue(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let g=Math.floor(c.length/2);for(let y=0;y<g;y++){let h=(y+.5)/g*a,b=Math.max(-1,Math.min(1,c[y*2]??0)),x=Math.max(-1,Math.min(1,c[y*2+1]??0)),v=(y+.5)/g;n.strokeStyle=v>=d&&v<=u?p:f,n.beginPath(),n.moveTo(h,m-x*(m-1)),n.lineTo(h,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(ut(y)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ue(e,"text"),n.fillRect(Math.round(ut(t.position)*(a-1)),0,1,i)),g||(n.fillStyle=f,n.font=r,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=ut(t.level??0);n.fillStyle=ue(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=ue(e,"accent"),n.fillRect(0,i*.4,a*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=ue(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=ue(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=ue(e,"accent")}var In=20,eo=2e4,Ai=24,rs=-60;function Eh(e,t,n,a,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,f=-2*s,m=1-l,g=2*Math.PI*a/i,y=(v,S,$)=>v+S*Math.cos(g)+$*Math.cos(2*g),h=(v,S)=>-(v*Math.sin(g)+S*Math.sin(2*g)),b=Math.hypot(y(c,d,u),h(d,u)),x=Math.hypot(y(p,f,m),h(f,m));return x>0?b/x:0}function Mh(e,t){return Math.log(Math.max(In,Math.min(eo,e))/In)/Math.log(eo/In)*t}function ss(e,t,n){let a=Math.max(rs,Math.min(Ai,e));return t+(Ai-a)/(Ai-rs)*(n-t)}function Sh(e,t,n,a,i,r){let s=a.mode??"lp",l=ue(i,Ql(s)),c=ue(i,"divider"),d=ue(i,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-u-3),m=a.q??Math.SQRT1_2,g=Math.round(ss(0,p,f))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let h=In*(eo/In)**(y/Math.max(1,t)),b=a.open?1:Eh(s,a.hz,m,h,a.sampleRate),x=ss(20*Math.log10(Math.max(1e-5,b)),p,f);y===0?e.moveTo(y,x):e.lineTo(y,x)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(Mh(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function We(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function Th(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Rt=20,Jn=2e4,Ko=Math.log(Jn/Rt),to=32,Lh=250,Ch=-100,Nh=1200,Fh=4.5,ls=-6,Lt=-96,zh=48,cs=[100,1e3,1e4],Dh=[6,12];function dn(e,t){return Math.log(Math.max(Rt,Math.min(Jn,e))/Rt)/Ko*t}function ka(e,t){return Rt*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ko)}function bt(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function no(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var oc=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Bh(e,t,n,a){let i=n?3:1,r=c=>({db:Math.max(-a,Math.min(a,e.db+c*i))}),s=c=>({hz:Math.max(e.minHz??Rt,Math.min(e.maxHz??Jn,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Yo(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Rh(e,t,n,a,i,r,s,l,c){let d=c?.25:1,u={},p=Math.max(1,r/2-l);if(u.db=Math.max(-s,Math.min(s,t.db-a*d/p*s/Yo(e))),e.moveHz){let f=t.hz*Math.exp(n*d/Math.max(1,i)*Ko);u.hz=Math.max(e.minHz??Rt,Math.min(e.maxHz??Jn,f))}return u}function qh(e,t,n,a,i){let r=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-r),c=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var be=new WeakMap;function Ih(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,r);for(let c of e.bands)a.append(Ph(n,c,t));a.append(s),a.addEventListener("click",c=>{if(!uc(n)||c.button>0)return;let d=dc(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),be.set(n,{control:e,cache:null,spec:null,active:null}),sc(n,e),n}function rc(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Ph(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=r();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",pt(e,t.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let u=i(),p=r(),f=be.get(e);if(!u||!p||!f?.box)return;let{w:m,h:g,pad:y}=f.box;u.onBand(p.id,Rh(p,s.start,d.clientX-s.x,d.clientY-s.y,m,g,u.range??18,y,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&pt(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let u=i(),p=r();if(!u||!p)return;let f=Bh(p,d.key,d.shiftKey,u.range??18);f&&(d.preventDefault(),f==="reset"?u.onReset?.(p.id):u.onBand(p.id,f),pt(e,p.id))});let c=null;return a.addEventListener("wheel",d=>{let u=i(),p=r();if(!u||!p?.moveQ)return;d.preventDefault();let f=d.timeStamp;(!c||f-c.t>400)&&(c={q:p.q,t:f});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=f,u.onBand(p.id,{q:c.q}),pt(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>pt(e,t.id)),a.addEventListener("focus",()=>pt(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&pt(e,null)}),a.addEventListener("blur",()=>{s||pt(e,null)}),a}function pt(e,t){let n=be.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?yn(e):Xo(e)}function Xo(e){let t=be.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,oc(a.db)];a.kind==="peak"?i.push(no(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${no(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Oh(t.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,c=dn(a.hz,r),d=bt(a.db*Yo(a),s,t.control.range??18,l),u=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(r-u,c-u/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(m)}px`}function Oh(e,t){return e.bands.indexOf(t)%3+1}function sc(e,t){let n=be.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Qo(e);let a=t.range??18;t.bands.forEach((i,r)=>{let s=rc(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${oc(i.db)}, ${no(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),yn(e),Vh(e)}function lc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function cc(e){return{curve:We(e,"eq-curve"),fill:We(e,"eq-fill"),quiet:We(e,"text-sub"),grid:We(e,"eq-grid"),zero:We(e,"divider"),label:We(e,"text-sub"),spectrum:We(e,"eq-spectrum"),bands:[We(e,"eq-band-1"),We(e,"eq-band-2"),We(e,"eq-band-3")]}}function _h(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function yn(e){be.has(e)&&Qo(e);let t=be.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:r,h:s}=lc(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;t.box={w:r,h:s,pad:l},t.colours=cc(e);let d=t.colours,u=_h(a,r);if(!t.cache||t.cache.key!==u){let S=Math.max(64,Math.ceil(r)+1),$=new Float64Array(S);for(let w=0;w<S;w++)$[w]=ka(w/(S-1)*r,r);let k=null;try{k=typeof a.response=="function"?a.response($):null}catch{k=null}t.cache={key:u,freqs:$,total:k?.total??new Float64Array(S),bands:k?.bands??[]}}i.clearRect(0,0,r,s);let p=Th(e),f=a.on!==!1;jh(i,r,s,c,l,d,p);let{freqs:m,total:g,bands:y}=t.cache,h=Array.from(m,S=>dn(S,r)),b=bt(0,s,c,l);y.forEach((S,$)=>{if(!S||!S.some(E=>Math.abs(E)>.05))return;let k=f?d.bands[$%3]:d.quiet,w=Array.from(S,E=>bt(E,s,c,l));i.save(),t.active&&a.bands[$]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=k,ds(i,h,w,b)),i.globalAlpha=f?.75:.4,i.strokeStyle=k,i.lineWidth=.75,Ei(i,h,w),i.restore()});let x=Array.from(g,S=>bt(S,s,c,l)),v=f?d.curve:d.quiet;i.save(),i.fillStyle=f?d.fill:d.quiet,i.globalAlpha=f?.2:.08,ds(i,h,x,b),i.restore(),i.save(),i.strokeStyle=f?d.fill:v,i.lineJoin="round",i.lineCap="round",f&&(i.globalAlpha=.16,i.lineWidth=4,Ei(i,h,x)),i.globalAlpha=1,i.strokeStyle=v,i.lineWidth=1.25,Ei(i,h,x),i.restore(),Hh(e),Xo(e)}function jh(e,t,n,a,i,r,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Rt||u>Jn)continue;let p=Math.round(dn(u,t))+.5;e.globalAlpha=cs.includes(u)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of Dh)if(!(c>a))for(let d of[1,-1]){let u=Math.round(bt(c*d,n,a,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(bt(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of cs){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,p=dn(c,t)+3;e.fillText(d,p+u+2>t?dn(c,t)-u-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=bt(c,n,a,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Ra(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function Ei(e,t,n){e.beginPath(),Ra(e,t,n),e.stroke()}function ds(e,t,n,a){e.beginPath(),Ra(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function dc(e){return e.closest("[data-nc-maxable]")}function uc(e){let t=dc(e);return!!t&&!t.hasAttribute("data-nc-max")}function Qo(e){let t=uc(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=be.get(e);n?.active&&(n.active=null,Xo(e))}return t}function Hh(e){Qo(e);let t=be.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=rc(e,s.id);l instanceof HTMLElement&&(l.style.left=`${dn(s.hz,n).toFixed(1)}px`,l.style.top=`${bt(s.db*Yo(s),a,r,i).toFixed(1)}px`)}}function Wh(e,t,n,a){let i=a/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,p=ka(d,t),f=ka(u,t),m=ka(c/(e-1)*t,t);r[c]=Math.min(n-1,p/i),s[c]=Math.min(n-1,f/i),l[c]=Fh*Math.log2(m/1e3)}return{lo:r,hi:s,tilt:l}}function Uh(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*s}let r=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function Vh(e){let t=be.get(e);if(t){if(!t.control.spectrum){hc(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=be.get(e)?.spec;i&&(i.visible=a.some(r=>r.isIntersecting),ao(e))}),t.spec.io.observe(e)):t.spec.visible=!0}ao(e)}}function ao(e){let t=be.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){pc(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=io(e),n.onVis||(n.onVis=()=>ao(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&oo(e,!1)}function io(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function oo(e,t){let n=be.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,Mi(e,io(e))),Lh):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,Mi(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,Mi(e,io(e))),to))}function pc(e){let t=be.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function hc(e){let t=be.get(e)?.spec;if(!t)return;pc(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=be.get(e);n&&(n.spec=null)}function Mi(e,t){let n=be.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){hc(e);return}if(!a.analyser)return;if(t-a.last<to-4&&!a.idle){oo(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):to/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=lc(r);if(!s)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Wh(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,f=zh*i,{lo:m,hi:g,tilt:y}=a.map;for(let b=0;b<d;b++){let x=Uh(a.buf,m[b],g[b]);x>p&&(p=x);let v=x+y[b],S=a.disp[b]-f;a.disp[b]=v>S?v:S}p>Ch&&(a.loud=t);let h=t-a.loud>Nh;s.clearRect(0,0,l,c),(!h||a.disp.some(b=>b>Lt))&&Gh(s,l,c,a.disp,n.colours??cc(e)),a.idle=h&&!a.disp.some(b=>b>Lt),oo(e,a.idle)}function Gh(e,t,n,a,i){let r=a.length,s=new Array(r),l=new Array(r),c=d=>{let u=a[Math.max(0,Math.min(r-1,d))];return Number.isFinite(u)?u:Lt};for(let d=0;d<r;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(Lt,Math.min(ls,Number.isFinite(u)?u:Lt))-Lt)/(ls-Lt);s[d]=d/(r-1)*t,l[d]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Ra(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Ra(e,s,l),e.stroke(),e.restore()}var Fe=new WeakMap,Kh=450,Yh=6,Xh=33,Si=24,Qh="http://www.w3.org/2000/svg";function Jh(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Zh(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function ef(e,t,n,a,i){let r=e.slice();if(t===a)return r[a]=i,r;let s=t<a?1:-1;for(let l=t;l!==a+s;l+=s){let c=(l-t)/(a-t);r[l]=Math.round((n+(i-n)*c)*100)/100}return r}function tf(e,t){let n=e.steps[t],a=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${i}`}function Ct(e,t){let n=document.createElementNS(Qh,e);for(let[a,i]of Object.entries(t))n.setAttribute(a,String(i));return n}function fc(e){let t=Ct("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Ct("path",{d:e})),t}function nf(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,i,r,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Fe.set(n,c),of(n,a),rf(n,s),mc(n,e),n}function Re(e){let t=Fe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function af(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function Ti(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=af(e);return{i:Zh(t.clientX,a),level:Jh(t.clientY-n.top,n.height)}}function of(e,t){let n=Fe.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let s=Re(e);if(!s||r.button>0||!s.steps.length)return;r.preventDefault(),qa(e),t.setPointerCapture?.(r.pointerId);let l=Ti(t,r),c=s.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,us(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,Re(e)?.onLevels(d.start.slice(),!0),Li(e,d.i))},Kh)}),t.addEventListener("pointermove",r=>{let s=n.drag;if(!s||s.id!==r.pointerId||s.long||!s.moved&&Math.hypot(r.clientX-s.x,r.clientY-s.y)<Yh)return;s.moved=!0,a();let l=Ti(t,r);us(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let i=r=>{let s=n.drag;!s||s.id!==r.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(r.pointerId),s.long||Re(e)?.onLevels(s.levels.slice(),!0),ro(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let s=n.drag;!s||s.id!==r.pointerId||(a(),n.drag=null,s.long||Re(e)?.onLevels(s.start.slice(),!0),ro(e,-1))}),t.addEventListener("contextmenu",r=>{Re(e)?.onShape&&(r.preventDefault(),Li(e,Ti(t,r).i))}),t.addEventListener("keydown",r=>{let s=Re(e);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(n.focus,l-1),d=s.steps[c].level,u=p=>{let f=s.steps.map(m=>m.level);f[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(f,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(r.shiftKey?.01:.05));break;case"ArrowDown":u(d-(r.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!s.onShape)return;Li(e,c);break;default:return}r.preventDefault(),so(e)}),t.addEventListener("focus",()=>so(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function us(e,t,n,a,i,r){let s=Fe.get(e).drag;s&&(s.levels=ef(s.levels,t,n,a,i),ro(e,a,s.levels[a]),Re(e)?.onLevels(s.levels.slice(),r))}function ro(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function so(e){let t=Fe.get(e),n=e.querySelector(".nc-lsteps-plot"),a=Re(e);if(!n||!a)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",tf(a,i))}function rf(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),qa(e,!0);return}let a=[...t.querySelectorAll("button")],i=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(i+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(i-1+a.length)%a.length]?.focus())}),Fe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&qa(e)}}function Li(e,t){let n=Re(e),a=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!i)return;let r=Fe.get(e);r.focus=t,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,a.append(s);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&g.append(fc(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{Re(e)?.onShape?.(t,m.value),qa(e,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,f=Math.max(0,Math.min(c.width-u,p-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function qa(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Fe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function sf(e,t){let n=Fe.get(e),a=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",i.textContent="";for(let r=0;r<t;r++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(r),r%4===0&&r>0&&(s.dataset.beat="true");let l=Ct("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Ct("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Ct("path",{class:"nc-lsteps-env",d:""}),Ct("path",{class:"nc-lsteps-top",d:""}),Ct("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function mc(e,t){let n=Fe.get(e);if(!n)return;n.control=t;let a=t.steps.length;sf(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),s=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,g)=>{let y=s[g];if(!y)return;let h=String((g%2?1-r:r)*2);y.style.setProperty("--nc-lsteps-grow",h),l[g]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&g>=t.played?y.dataset.out="true":y.removeAttribute("data-out"),y.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),x=y.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-b*100)),x.setAttribute("height",String(b*100));let v=t.curve?t.curve(g,Si):null,S="M0 100",$="";for(let k=0;k<=Si;k++){let w=v?Math.max(0,Math.min(1,v[k]??b)):b,E=k/Si*100,M=100-w*100;S+=` L${E.toFixed(2)} ${M.toFixed(2)}`,$+=`${k?" L":"M"}${E.toFixed(2)} ${M.toFixed(2)}`}y.querySelector(".nc-lsteps-env").setAttribute("d",`${S} L100 100 Z`),y.querySelector(".nc-lsteps-top").setAttribute("d",$)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append(fc(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>Re(e)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??a,p=t.steps[0]?.shape,f=t.steps.slice(0,u).every(m=>m.shape===p);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=f&&m.dataset.shape===String(p);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!f&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),so(e),n.last=-2,lf(e)}function lf(e){let t=Fe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Ci(e,null);return}let a=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Ci(e,null);return}r-a>=Xh&&(a=r,Ci(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function Ci(e,t){let n=Fe.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===a&&n.lastLocked===i)){n.last=a,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===a?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var cf=.8912509381337456,lo=32,df=250,uf=1200,pf=.2,gc=1.5;function hf(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function ff(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var Ia=new WeakMap,ps=new WeakMap;function hs(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function mf(e){let t=ps.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let r of i){let s=Ia.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Pn(s))}on(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Pn(i);on(t)}),ps.set(e,t),t}var bc=e=>e.els.some(t=>t.isConnected);function gf(e){if(!e.loop.io)return bc(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Pn(e){let t=!e.dead&&!!e.source&&gf(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Jo(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),po(e))}function Jo(e){return e.doc.defaultView?.performance?.now()??Date.now()}function on(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){yc(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Jo(e)),!e.raf&&!e.timer&&co(e,!1)}function co(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>fs(e,Jo(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),df):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,fs(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),lo)}function yc(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function fs(e,t){if(t-e.last<lo-4&&!e.idle&&e.last){co(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):lo/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let r of e.recs){if(!bc(r)){(r.placed||e.frames-r.born>90)&&vc(r);continue}r.placed=!0,r.open&&(i=!0,bf(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!i){yc(e);return}e.idle=t-e.loud>uf&&!a,co(e,e.idle)}function bf(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=hs(f,"motion-meter-fall",pf),e.hold=hs(f,"motion-meter-hold",gc)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",r=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let f of e.els)f.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[r,l],p=!1;for(let f=0;f<2;f++){let m=hf(u[f]);m>0&&(p=!0),e.disp[f]=m>=e.disp[f]?m:m+(e.disp[f]-m)*d,e.disp[f]<.001&&(e.disp[f]=0),u[f]>=cf&&(e.clipAt[f]=n);let g=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;uo(e,f,e.disp[f],g)}return p}function uo(e,t,n,a){let i=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function po(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,uo(e,0,0,!1),uo(e,1,0,!1)}function vc(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ia.get(t)===e&&Ia.delete(t)}function yf(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=mf(a),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:gc,rows:""};for(let s of n)Ia.set(s,r),i.io?.observe(s);if(i.recs.add(r),po(r),!i.io){let s=a.defaultView,l=()=>{Pn(r),on(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Pn(r),on(i);return}r.open&&(r.open=!1,r.source?.close?.(),po(r)),r.source=l,Pn(r),on(i)}},destroy(){r.dead||vc(r),on(i)}}}var wc={slop:8,longPressMs:500,pitchPx:16},vf=class{constructor(e,t,n=wc){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function wf(e,t,n,a=wc){let i=!1,r=0,s=(d,u)=>{let p=e.ownerDocument.elementFromPoint?.(d,u),f=[...e.querySelectorAll(t)],m=p?f.findIndex(h=>h===p||h.contains(p)):-1;if(m>=0)return m;let g=-1,y=Number.POSITIVE_INFINITY;return f.forEach((h,b)=>{if(h.hidden)return;let x=h.getBoundingClientRect();if(u<x.top||u>x.bottom)return;let v=Math.abs(d-(x.left+x.width/2));v<y&&v<=x.width&&(g=b,y=v)}),g},l=new vf(s,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},a),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var kc="netcomposer.groups.v1";function Zo(){try{return globalThis.localStorage??null}catch{return null}}function xc(e=Zo(),t=kc){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&a.set(i,r);return a}catch{return new Map}}function kf(e,t,n,a=kc){let i=xc(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function xf(e,t=Zo()){return xc(t).get(e.id)??e.open===!0}function $f(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";kf(Zo(),e.id,d),ho(a,d);let u=t(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(i,c),$c(a,e),ho(a,xf(e)),Ac(a,e),a}function ho(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function $c(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Ac(e,t){$c(e,t)&&ho(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var pa="application/x-nc-pad",ms="http://www.w3.org/2000/svg";function Af(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let p=s;p<l;p++)c=Math.min(c,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let u=n===1?50:r/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function Ef(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>a.append(Mf(n,r,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&xa(n)}),Mc(n,e),n}function Mf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(ms,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(ms,"path");return c.append(d),a.append(i,r,s,l,c),Tf(e,a,t,n),r.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&Ec(e,a,t,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(pa,String(t)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(pa)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(pa)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=u.dataTransfer?.getData(pa);if(f!==void 0&&f!==""){u.preventDefault(),u.stopPropagation();let g=Number(f);g!==t&&p.onMove?.(g,t,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(t,m))}),a}function Sf(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Tf(e,t,n,a){let i=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,c();let u=a(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=gs(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=gs(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}Sf(e,n,a)})}function gs(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;xa(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),xa(e)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{xa(e);let f=a(e);f?.type==="padGrid"&&(u.id==="rename"&&f.onRename?Ec(e,t,n,a):f.onMenu?.(n,u.id))}),l.append(p)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Ec(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=r.value.trim();r.remove(),t.focus();let f=a(e);u&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function xa(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Mc(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Af(a.peaks))),!a.empty&&a.hint?r.dataset.hint="true":delete r.dataset.hint,a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let u=t.selected===i;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function xe(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function oi(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function bs(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Un(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Lf=450,ys=8;function Ve(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Cf(e){let t=ih(e,"target-min");return t>0?t:44}function Nf(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Cf(e),a=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,p=c+a,f=d-a,m=d+a;for(let g=0;g<t.length;g++){if(r===g)continue;let y=i[g];if(!y||y.width===0)continue;let h=y.left+y.width/2,b=y.top+y.height/2;Math.abs(b-d)<a*2&&(h>c?p=Math.min(p,(c+h)/2):h<c&&(u=Math.max(u,(c+h)/2))),Math.abs(h-c)<a*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(f=Math.max(f,(d+b)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),m=Math.max(m,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${f-l.top}px`,s.style.width=`${Math.max(0,p-u)}px`,s.style.height=`${Math.max(0,m-f)}px`,s.style.transform="none"}}function Sc(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function vs(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Dt(e,t){switch(e.type){case"slider":return Ff(e,t);case"select":return Df(e,t);case"toggle":return Bf(e,t);case"button":return Rf(e,t);case"readout":return qf(e);case"label":return _f(e);case"note":return ws(e);case"knob":return Wf(e,t);case"choice":return Uf(e,t);case"slotRow":return Vf(e,t);case"stepGrid":return Xf(e,t);case"canvas":return em(e);case"fx":return cm(e,t);case"eqGraph":return Ih(e,t);case"levelSteps":return nf(e,t);case"group":return $f(e,t,Dt);case"strip":return tm(e,t);case"stripAdd":return om(e,t);case"padGrid":return Ef(e,t);case"moves":return Pf(e,t);default:return ws({id:"unknown",text:""})}}function Oe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Cc(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Tc(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Un(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),bs(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")bs(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&yt(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&jf(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Un(t.value))}else if(t.type==="choice")Nc(e,t);else if(t.type==="slotRow")zc(e,t);else if(t.type==="stepGrid")mo(e,t);else if(t.type==="padGrid")Mc(e,t);else if(t.type==="moves")Lc(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ic(n,t)}else if(t.type==="eqGraph")sc(e,t);else if(t.type==="levelSteps")mc(e,t);else if(t.type==="strip"){qc(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${un(n.id)}"]`);a instanceof Element&&Oe(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Bc(e,t);else if(t.type==="group"){Ac(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${un(n.id)}"]`);a instanceof Element&&Oe(a,n)}}else if(t.type==="fx"){Vc(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${un(n.id)}"]`);a instanceof Element&&Oe(a,n)}}}}function Ff(e,t){let n=oi(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=ii(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(Tc(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let r=l=>i?Zi(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,u=ac(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(Go(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(zf(e,a,t),s),n.append(xe()),Oe(n,e),n}function Tc(e){return ii(e.taper,e.min,e.max)?Go(e.taper,e.min,e.max,e.value):e.value}function zf(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ve());let i=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),a}function Df(e,t){let n=oi(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let r=t(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,xe()),n}function Bf(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(xe()),Oe(n,e),n}function Rf(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(xe()),Oe(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Sc(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Dc(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function qf(e){let t=oi(e.id,e.label);return t.append(xe()),Oe(t,e),t}var If=450;function Pf(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Of(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}i.append(r,s),n.append(i)}return Lc(n,e),n}function Lc(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${un(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function Of(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function _f(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(xe()),t}function ws(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(xe()),t}function ks(e){if(typeof e.valueText=="string")return e.valueText;let t=Un(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Cc(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function jf(e,t){let n=Ba(t.taper,t.min,t.max,t.value);Cc(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Ba(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,i))),e.style.setProperty("--knob-to",String(Math.max(a,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ks(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ks(t)}`}function Hf(e,t){if(ii(e.taper,e.min,e.max))return ac(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Wf(e,t){let n=oi(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let r=0,s=0;a.addEventListener("pointerdown",d=>{r=d.clientY;let u=t(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=t(a);if(u?.type!=="knob")return;if(ii(u.taper,u.min,u.max)){let m=Ba(u.taper,u.min,u.max,s)-(d.clientY-r)/120;u.onChange(tc(u.taper,u.min,u.max,m));return}let p=u.max-u.min||1,f=Math.min(u.max,Math.max(u.min,s-(d.clientY-r)*p/120));u.onChange(f)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=t(a);if(u?.type!=="knob")return;let p=Hf(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(xe()),Oe(n,e),n}function Uf(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),i.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(xe()),Nc(n,e),n}function Nc(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Vf(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let p=e.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(m,Ve()),Gf(f,m,n,u,t),a.append(f)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Sc(),i.append(Ve()),i.addEventListener("click",()=>{Dc(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...i?[i]:[]),n.append(d,r,xe()),Fc(n,t),zc(n,e),n}function xs(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;zn(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,r)}function Gf(e,t,n,a,i){let r=0,s=0,l=0,c=!1,d=!1,u=!1,p=!1,f=()=>{window.clearTimeout(r),r=0},m=b=>{let x=b.clientX-s,v=b.clientY-l;x*x+v*v>ys*ys&&(c=!0,f())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=b=>{let x=r!==0&&!c&&!d;f(),g(),x&&(u=!0,xs(n,a,i,b))},h=()=>{c=!0,f(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,s=b.clientX,l=b.clientY,f(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Kf(n,t,a,i))},Lf),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}xs(n,a,i,b)})}function Fc(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=$s("Save","store"),i=$s("Clear","clear");n.append(a,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),zn(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),zn(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),zn(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&zn(e)})}function $s(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Kf(e,t,n,a){Fc(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function zn(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function zc(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Dc(e){let t=e.dataset.ncLastFill||null,n=Gp(t);e.dataset.ncLastFill=n;let a=Kp(n);if(a)for(let[i,r]of Object.entries(a))e.style.setProperty(i,r)}function Yf(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Xf(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=h=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=h,a.append(b),b},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let b of[r,s]){let x=b===h;b.setAttribute("aria-checked",x?"true":"false"),b.tabIndex=x?0:-1}};l(r);for(let h of[r,s])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let b=s.getAttribute("aria-checked")==="true"?r:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Yf(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=h.label,x.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(x.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,S=0;x.addEventListener("pointerdown",w=>{v=!1,!(w.pointerType==="mouse"||w.button!==0)&&(S=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||(v=!0,E.onSelectRow?.(E.rows.findIndex(M=>M.id===h.id),!0))},If))});for(let w of["pointerup","pointercancel","pointerleave"])x.addEventListener(w,()=>window.clearTimeout(S));x.addEventListener("contextmenu",w=>{v&&w.preventDefault()}),x.addEventListener("click",w=>{let E=t(n);if(E?.type!=="stepGrid")return;if(v){v=!1;return}let M=E.rows.findIndex(R=>R.id===h.id),C=!!E.selectedRows&&(w.shiftKey||w.metaKey||w.ctrlKey);E.onSelectRow?.(M,C)}),x.addEventListener("keydown",w=>Qf(n,x,w));let $=[];for(let w of["mute","solo"]){if(!(w==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=w,M.textContent=w==="mute"?"M":"S",M.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${h.label}`),E.append(M,Ve()),E.addEventListener("click",()=>{let C=t(n);if(C?.type!=="stepGrid")return;let R=C.rows.findIndex(B=>B.id===h.id);(w==="mute"?C.onMute:C.onSolo)?.(R)}),$.push(E)}let k=document.createElement("div");k.className="nc-steps";for(let w=0;w<h.steps.length;w++){let E=document.createElement("span");E.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${h.id}:${w}`,M.setAttribute("aria-label",`${h.label} step ${w+1}`),E.append(M,Ve()),E.addEventListener("click",C=>{let R=t(n);if(R?.type!=="stepGrid")return;let B=R.rows.findIndex(U=>U.id===h.id),O=s.getAttribute("aria-checked")==="true";R.onToggle(B,w,C.shiftKey||O)}),k.append(E)}if(e.onLength&&k.append(Jf(n,k,h,t)),b.append(...$,x,k),e.onDice){let w=document.createElement("button");w.type="button",w.className="nc-sparkle nc-row-dice",w.dataset.ncDice=h.id,w.setAttribute("aria-label",`Re-roll ${h.label}`),w.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,w.innerHTML=vs(),w.append(Ve()),w.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(M=>M.id===h.id))}),b.append(w)}b.addEventListener("click",w=>{if(w.target!==b)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(M=>M.id===h.id))}),As(n,k,".nc-step-wrap",t,s,()=>h.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(h,b,x)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=b,x&&v.setAttribute("aria-label",x),v},p=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",mo(n,h))}));for(let[h,b]of[[p,-1],[f,1]])h.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let v=x.rows.length;x.onSelectRow?.(((ha(x)+b)%v+v)%v)});if(d.append(p,m,f),e.onDice){let h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=vs(),h.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let x=ha(b);x>=0&&b.onDice?.(x)}),d.append(h)}if(e.transport){let h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(h)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(h),b.textContent=String(h+1),b.addEventListener("click",x=>{let v=t(n);if(v?.type!=="stepGrid")return;let S=ha(v);if(S<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(S,h+1);return}let $=s.getAttribute("aria-checked")==="true";v.onToggle(S,h,x.shiftKey||$)}),g.append(b)}return As(n,g,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[ha(h)]?.id:void 0}),n.append(g),n.append(xe()),mo(n,e),n}function ha(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function As(e,t,n,a,i,r){let s="on",l=!0,c=-1,d=(u,p)=>{let f=u.rows[c]?.steps[p];!f||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,s,l):!!f[s]!==l&&u.onToggle(c,p,s==="accent"))};wf(t,n,u=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=p.rows.findIndex(m=>m.id===r());f>=0&&p.rows[f].length!==u.pad+1&&p.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=r();c=p.rows.findIndex(g=>g.id===f);let m=p.rows[c]?.steps[u.pad];if(!m)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(p,u.pad)}else if(u.kind==="long"){let f=r(),m=p.rows.findIndex(y=>y.id===f),g=t.querySelectorAll(n)[u.pad];m>=0&&g instanceof HTMLElement&&p.onLongPress?.(m,u.pad,g)}}})}function Qf(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Jf(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Ve());let r=d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(g=>g.id===n.id),f=u.rows[p];if(!f)return;let m=Math.max(1,Math.min(f.steps.length,d));m!==f.length&&u.onLength?.(p,m)},s=d=>{let u=[...t.querySelectorAll(".nc-step")],p=1;return u.forEach((f,m)=>{let g=f.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(p=m+1)}),p},l=d=>r(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let u=a(e);if(u?.type!=="stepGrid")return;let p=u.rows.find(m=>m.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in f&&(d.preventDefault(),r(f[d.key]))}),i}var Ni=new WeakMap,fa=new WeakMap;function Zf(e){return e?(fa.has(e)||(fa.set(e,Xi(e)),Vl(t=>{fa.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))fo(n,Number(n.getAttribute("data-nc-velocity")))},e)),fa.get(e)):"light"}function fo(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Zf(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(Ni.has(e)&&Ni.get(e)===i)){if(Ni.set(e,i),n===null){for(let r of Object.keys(ts(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(ts(n,es[a]??es.light)))e.style.setProperty(r,s)}}function Es(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function mo(e,t){let n=t.rows.some(u=>u.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,p=t.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let f=t.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let u=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),m=r.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&f>=r.length,l&&f>=r.length?p.dataset.out="true":delete p.dataset.out,l&&f===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${f+1}${m?.markLabel?`, ${m.markLabel}`:""}`),Es(p,m),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,fo(p,m?.velocity),t.playhead>=0&&f===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of t.rows){for(let m=0;m<u.steps.length;m++){let g=u.steps[m],y=e.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let h=y.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===u.id?h.dataset.selected="true":delete h.dataset.selected;let S=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);S?h.dataset.picked="true":delete h.dataset.picked;let $=h.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",t.selectedRow===u.id||S?"true":"false"),$.textContent!==u.label&&($.textContent=u.label,$.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?h.dataset.silent="true":delete h.dataset.silent;for(let k of h.querySelectorAll("[data-nc-ms]")){let w=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",w?"true":"false")}}y.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;y.getAttribute("aria-label")!==b&&y.setAttribute("aria-label",b),Es(y,g),g.accent?y.dataset.accent="true":delete y.dataset.accent,g.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof g.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),fo(y,g.velocity);let x=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;m===x?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!t.onLength&&t.selectedRow===u.id;y.hidden=m>=u.length&&!v,m>=u.length&&v?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${u.id}"]`),f=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let m=document.activeElement===p;f.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function em(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,xe()),t}function tm(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;r&&(n.dataset.ncFoldable="",s=_c(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",S=>{if(S.key!=="ArrowLeft"&&S.key!=="ArrowRight"||S.ctrlKey||S.metaKey||S.shiftKey)return;let $=t(n);$?.type==="strip"&&(S.preventDefault(),$.onMove?.(S.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Ts(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),Ts(n,a,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onRemove?.(v)}),a.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks",S.dataset.ncHacks="",v.append(S,Ve()),v.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks nc-sends-view",S.dataset.ncSendsView="",v.append(S,Ve()),v.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",S.append($,Ve()),S.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&(v==="mute"?k.onMute:k.onSolo)?.()}),d.append(S)}let u=document.createElement("div");u.className="nc-strip-sends";for(let v of e.sends??[])u.append(Dt({...v,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(Dt(er(e),t));let f=document.createElement("div");f.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let S=document.createElement("span");S.className="nc-scale-tick",S.style.setProperty("--tick-pos",String(v.value)),S.textContent=v.label,m.append(S)}let g=uh({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let S=t(n);S?.type==="strip"&&S.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&Ss(v)}}),y=bh({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(f.append(m,g.el,y.el),r){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let S=document.createElement("span");S.className="nc-strip-fold-cap",S.setAttribute("aria-hidden","true");let $=document.createElement("span");$.className="nc-ui-fx-fold-name",$.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!e.pan,v.append(S,k,$),v.addEventListener("click",()=>{let w=t(n);if(w?.type!=="strip")return;w.onFold?.(!1);let E=n.querySelector("[data-nc-strip-hide]");E instanceof HTMLElement&&E.focus()}),f.prepend(v)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let b=0;h.addEventListener("click",v=>{let S=t(n);S?.type!=="strip"||!S.onTypeIn||(window.clearTimeout(b),v.detail===0?Ms(n,h,t):v.detail===1&&(b=window.setTimeout(()=>Ms(n,h,t),im)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(b);let v=t(n);v?.type==="strip"&&Ss(v)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(Dt(tr(e),t)),s&&n.append(s),l&&n.append(l),n.append(a,x,c,d,u,p,f,h,xe()),qc(n,e),n}function er(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??am(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function tr(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??nm(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function nm(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function am(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var im=250;function Ms(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??Un(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function om(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;Rc(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,xe()),Bc(n,e),n}function Bc(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Rc(a))}function Rc(e){let t=e.options[0];t&&(t.selected=!0)}function Ss(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function qc(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?ph(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),yh(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??Un(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let g of e.querySelectorAll("[data-nc-ms]")){let y=g.getAttribute("data-nc-ms"),h=y==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",h?"true":"false"),g.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),yt(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=Ic(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${un(t.trim.id)}"]`);g&&Oe(g,tr(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${un(t.pan.id)}"]`);g&&Oe(g,er(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(jc(f,p,t.label),yt(f,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!p,m.setAttribute("aria-label",`Expand ${t.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),yt(m,t.foldedHelp??t.foldHelp)}}function Ic(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Pc?t:0}var Pc=8,ma=null;function Ts(e,t,n,a){ma?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,s=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=Ic(i),p=e.querySelector("[data-nc-strip-grip]")??t,f=(b=!1)=>{if(ma!==f)return;ma=null;let x=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",g,!0),r.removeEventListener("pointerdown",y,!0),s.removeEventListener("resize",h),(b||x)&&p?.isConnected&&p.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Pc},(b,x)=>x+1)].map(b=>{let x=r.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",b===u?"true":"false"),x.setAttribute("tabindex",b===u?"0":"-1"),x.dataset.ncShadeChoice=String(b),b===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(b),x.setAttribute("aria-label",`Shade ${b}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),x.addEventListener("click",()=>{let v=n(e);f(!0),v?.type==="strip"&&v.onShade?.(b===0?null:b)}),x});if(d.append(...m),d.addEventListener("keydown",b=>{let x=m.indexOf(r.activeElement);if(x<0)return;let v=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?v=(x+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?v=(x-1+m.length)%m.length:b.key==="Home"?v=0:b.key==="End"&&(v=m.length-1),!(v<0)&&(b.preventDefault(),m[x].setAttribute("tabindex","-1"),m[v].setAttribute("tabindex","0"),m[v].focus())}),l.append(c,d),typeof i.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),x=b.indexOf(e);for(let[v,S,$]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=r.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=v<0?"left":"right";let w=r.createElement("span");w.textContent=S;let E=r.createElement("kbd");E.textContent=$,E.setAttribute("aria-hidden","true"),k.append(w,E),k.disabled=v<0?x<=0:x<0||x>=b.length-1,k.addEventListener("click",()=>{let M=n(e);f(!0),M?.type==="strip"&&M.onMove?.(v)}),l.append(k)}}r.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},x=l.offsetWidth,v=l.offsetHeight,S=s.innerWidth||r.documentElement.clientWidth||x,$=s.innerHeight||r.documentElement.clientHeight||v,k=a?a.x:b.right-x,w=a?a.y:b.bottom+4;k=Math.max(4,Math.min(k,S-x-4)),w+v>$-4&&(w=Math.max(4,(a?a.y:b.top)-v-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round(w)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),f(!0);else if(b.key==="Tab"&&l.contains(r.activeElement)){let x=[...l.querySelectorAll("button:not([disabled])")].filter(S=>S.getAttribute("tabindex")!=="-1"),v=(x.indexOf(r.activeElement)+(b.shiftKey?-1:1)+x.length)%x.length;b.preventDefault(),x[v]?.focus()}},y=b=>{l.contains(b.target)||f(!1)},h=()=>f(!1);return r.addEventListener("keydown",g,!0),r.addEventListener("pointerdown",y,!0),s.addEventListener("resize",h),ma=f,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>f(!1)}}var go=typeof ResizeObserver=="function"?new ResizeObserver(rm):null;function rm(e){for(let t of e){if(!t.target.isConnected){go.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&sm(n)}}function sm(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+i+r}px`)}function lm(e){if(go)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))go.observe(t)}function cm(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!Pa(e)&&!r&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),r&&l.append(Wc(n,"head")),e.on!==void 0){let c=Uo({checked:e.on,labelledBy:a.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(um(n,t)),Pa(e)&&l.append(mm(n,t)),s&&l.append(gm(t)),n.append(l)}i&&n.prepend(pm(n,t)),r&&Uc(n,e);for(let l of e.controls)n.append(Dt(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Dt(d,t));n.append(l)}return n.append(xe()),Vc(n,e),lm(n),n}var dm=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Oc(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&dm(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function um(e,t){let n=_c();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Oc(e))}),n}function _c(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function jc(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function pm(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Wc(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Oc(e)}}),n}var vn=new Set;function $a(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Pa=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),hm="(max-width: 768px)";function fm(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function mm(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(fm()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Hc(e,a,!vn.has(a.id)),n.focus())}),n}function gm(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Hc(e,t,n){n?vn.add(t.id):vn.delete(t.id),nr(e,t)}function bm(e,t){t?.type==="fx"&&vn.has(t.id)&&Hc(e,t,!1)}function ym(e){return e.ownerDocument.defaultView?.matchMedia?.(hm).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function nr(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Pa(t)&&vn.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Pa(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),$a(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&yn(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",yt(n,t.maxHelp)),!a){e.dataset.ncMax&&Ls(e);return}if(!e.isConnected){let s=()=>e.isConnected&&vn.has(t.id)&&nr(e,t);queueMicrotask(()=>{e.isConnected?s():$a(e.ownerDocument,s)});return}let i=ym(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Ls(e),e.dataset.ncMax=i,i==="over"&&vm(e,t)),wm(e.ownerDocument),i==="over"&&ar(e),$a(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&yn(s)})}function Ls(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),$a(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&yn(n)})}function vm(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function ar(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=qh(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Cs=new WeakSet;function wm(e){Cs.has(e)||(Cs.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&ar(t)}))}var bo=new WeakMap;function Wc(e,t){let n=ff(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Uc(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)yt(i,t.meterHelp);let a=bo.get(e);a?a.set(t.meter):bo.set(e,yf(n,t.meter))}function Vc(e,t){(t.meter||bo.has(e))&&Uc(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(jc(r,i,t.title),yt(r,t.foldHelp)),nr(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),yt(l,t.foldHelp)}}function yt(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function un(e){return e.replace(/["\\]/g,"\\$&")}function km(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&ic(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&yn(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&ar(n);Nf(e)}var xm=gt["toast-duration"];function $m({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Am(e,t,n,a){let i=l=>({top:l,bottom:l+n}),r=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=i(t-a-n);return r(s)?r(i(a))?"bottom":"top":"bottom"}function Em(e,t,n,a,i,r){let s=e.bottom+i,l=Math.max(r,Math.min(e.left,a-r-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of t)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+i,c=!0)}return{top:s,left:l}}var Ns="data-nc-ui-toast-live";function Mm(e,t){let n=t.querySelector(`[${Ns}]`);return n||(n=e.createElement("div"),n.setAttribute(Ns,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Sm({message:e,actionLabel:t,onAction:n,duration:a=xm,onClose:i,avoid:r=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,u.appendChild(p);let f=null;t&&(f=c.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=t,u.appendChild(f)),l.appendChild(u);let m="open",g=I=>I&&typeof I.getBoundingClientRect=="function"?I.getBoundingClientRect():null,y=g(u),h=y?.height||44,b=d.getComputedStyle?.(u),x=Number.parseFloat(b?.getPropertyValue(ee("toast-offset")))||16,v=Number.parseFloat(b?.getPropertyValue(ee("toast-anchor-gap")))||8,S=g(s),$=d.innerHeight??0,k=r.map(g).filter(Boolean),w=S&&S.bottom>0&&S.top<$?Em(S,k,{width:y?.width||0,height:h},d.innerWidth??0,v,x):null;w&&w.top+h<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${w.top+(d.scrollY??0)}px`,u.style.left=`${w.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Am(k,$,h,x));let E=d.requestAnimationFrame?.bind(d)??(I=>setTimeout(I,16));E(()=>E(()=>{m==="open"&&u.setAttribute("data-state","open")})),Mm(c,l).textContent=$m({message:e,actionLabel:t});let M,C,R=new Promise(I=>{C=I}),B=I=>{clearTimeout(M),M=setTimeout(()=>ve("timeout"),I)},O=a,U=Date.now(),re=()=>{m==="open"&&(clearTimeout(M),O=Math.max(0,O-(Date.now()-U)))},Q=()=>{m==="open"&&(U=Date.now(),B(O))};u.addEventListener("pointerenter",re),u.addEventListener("pointerleave",Q),u.addEventListener("focusin",re),u.addEventListener("focusout",Q),f?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{ve("action")}}),Number.isFinite(a)&&B(a);function ve(I="close"){if(m!=="open")return;m="closing",clearTimeout(M),u.setAttribute("data-state","closing"),i?.(I);let Vt=d.getComputedStyle?.(u),An=Vt?Math.max(0,...String(Vt.transitionDuration||"").split(",").map(Kt=>Number.parseFloat(Kt)*(Kt.trim().endsWith("ms")?1:1e3)||0)):0,Gt=()=>{m!=="gone"&&(m="gone",u.remove(),C(I))};u.addEventListener("transitionend",Gt),setTimeout(Gt,An+50)}return{el:u,close:ve,closed:R}}var Oa="data-nc-help";function Tm(e,t,n,a=0,i=6,r=8){let s=e.top-i-t.height,l=s>=a+r?"above":"below",c=l==="above"?s:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Fi=new WeakMap;function Lm(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Cm({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Fi.get(e);if(n)return n;let a=e.defaultView,i=null,r=null,s,l=!1,c,d=null,u=!1,p=0,f=()=>{clearTimeout(s),u&&!l&&(p=Date.now()+1500),u=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},m=()=>{f(),clearTimeout(c),r=null,d=null,l=!1},g=(w,E)=>{clearTimeout(s),d=E;let M=Date.now()<p?Math.min(t,300):t;s=setTimeout(()=>{r===w&&w.isConnected&&!l&&b(w)&&(u=!0)},M)},y=w=>({x:Number(w.clientX)||0,y:Number(w.clientY)||0}),h=(w,E,M)=>!w||Math.hypot(w.x-E.x,w.y-E.y)>M,b=(w,E)=>{let M=E??w.getAttribute(Oa);if(!M)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=M,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let C=w.getBoundingClientRect(),R=Tm(C,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,Lm(e));return i.style.top=`${R.top}px`,i.style.left=`${R.left}px`,i.dataset.side=R.side,i.style.visibility="",!0},x=w=>{if(l||w.pointerType==="touch")return;let E=w.target&&w.target.closest?w.target.closest(`[${Oa}]`):null;E!==r&&(m(),!(!E||w.buttons)&&(r=E,g(E,y(w))))},v=w=>{if(l||w.pointerType==="touch"||!r)return;if(w.buttons){f(),d=null;return}let E=y(w);u?h(d,E,8)&&(f(),g(r,E)):h(d,E,4)&&g(r,E)},S=w=>{!l&&!w.relatedTarget&&m()},$=w=>{(l||w.key==="Escape")&&m()};e.addEventListener("pointerover",x),e.addEventListener("pointermove",v,{passive:!0}),e.addEventListener("pointerout",S),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",$),a.addEventListener("scroll",m,!0),a.addEventListener("blur",m);let k={hide:m,pin(w,E,{ms:M=0}={}){return m(),!w||!w.isConnected||!b(w,E)?!1:(l=!0,i.dataset.pinned="",M>0&&(c=setTimeout(m,M)),!0)},uninstall(){m(),e.removeEventListener("pointerover",x),e.removeEventListener("pointermove",v),e.removeEventListener("pointerout",S),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",$),a.removeEventListener("scroll",m,!0),a.removeEventListener("blur",m),i?.remove(),i=null,Fi.delete(e)}};return Fi.set(e,k),k}var Nm="(max-width: 768px)",Fm='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',zm='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Dm=0;function Bm({panel:e,button:t,label:n="Menu",media:a=Nm}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Dm}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=Fm),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",u,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(zm)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!l())return;let b=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",u,!0),i.removeEventListener("pointerdown",p,!0),(h??b)&&s.focus?.({preventScroll:!0})}function u(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function p(h){let b=h.target;b instanceof r.Node&&(e.contains(b)||s.contains(b))||d({focus:!1})}let f=()=>l()?d({focus:!0}):c(),m=h=>{let b=h.target,x=b instanceof r.Element?b.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",f),e.addEventListener("click",m);let g=r.matchMedia?.(a),y=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",y),{button:s,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",f),e.removeEventListener("click",m),g?.removeEventListener?.("change",y)}}}var ir="netcomposer.rhythm.hidden.v1",tt=new WeakMap;function zi(){try{return globalThis.localStorage??null}catch{return null}}function Gc(e,t=ir){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Fs(e,t,n,a=ir){let i=Gc(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function or(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)a(r);i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(er(i)),i.trim&&n.push(tr(i)))};for(let i of t)a(i);return n}function Kc(e,t){if(!(!e||!t))return or(e).find(n=>n.id===t)}function Rm(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${or(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function qm(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Yc(e,t)}function Yc(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Im(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=tt.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Kc(n,a)}function Pm(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Rm(t);if(e.dataset.ncSignature===i){for(let r of a){let s=e.querySelector(`[data-nc-section="${Ds(r.id)}"]`);s&&Yc(s,r);for(let l of r.controls){let c=e.querySelector(`[data-nc-id="${Ds(l.id)}"]`);c instanceof Element&&Oe(c,l)}s instanceof HTMLElement&&yo(s,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),qm(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let c of r.controls)l.append(Dt(c,Im));e.append(s),yo(s,r,n)}}function Xc(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Om="(max-width: 768px)",Qc=new WeakMap;function zs(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function _m(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=zs("prev"),r=zs("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,r,l);let c=(d,u)=>{let p=Qc.get(e);if(!p||u.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Xc(f,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,m),p.onPage?.(m),yo(e,{...p,page:m},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(a),a}function yo(e,t,n){Qc.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=Xc(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),r<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Om).matches===!0,c=e.closest(".nc-module");a.forEach((h,b)=>{let x=Math.floor(b/i)!==s;if(x?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,x&&!l){let v=c instanceof HTMLElement?tt.get(c):void 0;bm(h,Kc(v,h.dataset.ncId))}});let d=_m(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===r-1?"true":"false");let f=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${r}`;f.textContent!==m&&(f.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${r}`;g.textContent!==y&&(g.textContent=y)}function Ds(e){return e.replace(/["\\]/g,"\\$&")}function jm(e,t=ir){Jl();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Gc(zi(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Uo({labelledBy:r.id,onChange:x=>(tt.get(n)??e).onToggle?.(x)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",i.append(r,u,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",f.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,i,p,f),n.setAttribute("aria-labelledby",r.id);let y=x=>{let v=tt.get(n)??e;n.dataset.ncOpen=x?"false":"true",p.hidden=x,f.hidden=!x,l.textContent=x?"+":"−",l.setAttribute("aria-expanded",x?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${x?"Show":"Hide"} ${v.title}`),l.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";Fs(zi(),(tt.get(n)??e).id,x,t),y(x),vo(n.parentElement)}),f.addEventListener("click",()=>{Fs(zi(),(tt.get(n)??e).id,!1,t),y(!1),vo(n.parentElement)});let h={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(x){tt.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=x.title,u.textContent=x.status??"",x.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=x.summary??x.title,d.el.hidden=x.on===void 0,d.set(x.on===!0),x.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${x.title}`),Pm(p,x,h),y(p.hidden),b.redraw()},redraw(){let x=tt.get(n);x&&km(n,or(x))}};return tt.set(n,e),y(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Vl(()=>b.redraw(),n.ownerDocument),b}function Hm(e,t,n="adjacent"){Jl(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),vo(e)}function vo(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?o("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const On=-48,Bs=24,Wm=-1,wo=32,Um=250,Vm=1200,Gm=.2,Jc=1.5,Km=[-48,-24,-12,0],ko="−",Rs=e=>e>0?20*Math.log10(e):-1/0;function Vn(e){return e>On?e>=0?1:(e-On)/-On:0}function Zc(e){return e>0?e>=Bs?1:e/Bs:0}function xo(e,t=!1){if(t)return`${e>.05?ko:""}${Math.abs(e).toFixed(1)} dB`;if(!(e>On))return"—";const n=Math.round(e*10)/10;return`${n<0?ko:n>0?"+":""}${Math.abs(n).toFixed(1)}`}function De(e,t,n){const a=e.createElement("span");return a.className=t,n!==void 0&&(a.textContent=n),a}function Ym(e=globalThis.document){Qm(e);const t=e.createElement("div");t.className="nc-comp-gauge",t.setAttribute("aria-hidden","true");for(const[a,i]of[["in","In"],["gr","GR"],["out","Out"]]){t.append(De(e,"nc-comp-gauge-label",i));const r=De(e,"nc-comp-gauge-bar");r.dataset.ncGauge=a,r.append(De(e,"nc-comp-gauge-fill"),De(e,"nc-comp-gauge-peak")),a!=="gr"&&r.append(De(e,"nc-comp-gauge-hot")),a==="in"&&r.append(De(e,"nc-comp-gauge-th")),t.append(r,De(e,"nc-comp-gauge-val",a==="gr"?xo(0,!0):xo(-1/0)))}const n=De(e,"nc-comp-gauge-ticks");for(const a of Km){const i=De(e,"",a===0?"0":`${ko}${-a}`);i.style.left=`${Vn(a)*100}%`,n.append(i)}return t.append(De(e,""),n,De(e,"")),t}const Xm=`
/* A compressor's level gauge (comp-gauge.js; Peter, 2026-11-27, option B): IN, GR, OUT rows, the number at the end of
   each, the dBFS ticks under them. IN and OUT in ink like every meter, the hot colour within 1 dB of full scale; GR
   (filling from the right) and the threshold tick in the instrument's colour (--nc-gauge-gr, set by the app). Rectangles,
   no radius. The loop writes transforms, so nothing transitions. Switched off: GR and OUT grey, IN keeps moving. */
.nc-comp-gauge {
  --nc-gauge-gr-color: var(--nc-gauge-gr, var(--nc-ui-accent));
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  column-gap: var(--nc-ui-control-gap, var(--nc-ui-space-6));
  row-gap: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.25);
  align-items: center;
  min-width: 0;
}
.nc-comp-gauge-label {
  font-size: var(--nc-ui-label-size);
  font-weight: var(--nc-ui-label-weight);
  letter-spacing: var(--nc-ui-label-tracking);
  text-transform: uppercase;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-val {
  min-width: 6ch;
  text-align: right;
  font-family: var(--nc-ui-font-readout);
  font-size: var(--nc-ui-readout-size-small);
  font-variant-numeric: tabular-nums;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-gauge-gr-color); }
.nc-comp-gauge-bar { position: relative; height: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.5); background: var(--nc-ui-divider); }
.nc-comp-gauge-fill {
  position: absolute;
  inset: 0;
  transform-origin: left;
  transform: scaleX(0);
  background: var(--nc-ui-text);
  transition: none;
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-fill { transform-origin: right; background: var(--nc-gauge-gr-color); }
.nc-comp-gauge-hot { position: absolute; top: 0; bottom: 0; right: 0; width: calc(var(--nc-ui-hairline) * 4); background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); display: none; }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-hot { display: block; }
.nc-comp-gauge-peak {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(var(--nc-ui-hairline) * 2);
  margin-left: calc(var(--nc-ui-hairline) * -1);
  background: var(--nc-ui-text);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-peak { background: var(--nc-ui-text); }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-peak { background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); }
.nc-comp-gauge-peak[hidden], .nc-comp-gauge-th[hidden] { display: none; }
.nc-comp-gauge-th {
  position: absolute;
  top: calc(var(--nc-ui-hairline) * -4);
  bottom: calc(var(--nc-ui-hairline) * -4);
  width: 0;
  border-left: calc(var(--nc-ui-hairline) * 1.5) solid var(--nc-gauge-gr-color);
}
.nc-comp-gauge-ticks { position: relative; height: calc(var(--nc-ui-readout-size-small) * 1.2); margin-top: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * -0.5); }
.nc-comp-gauge-ticks > span {
  position: absolute;
  transform: translateX(-50%);
  font-family: var(--nc-ui-font-readout);
  font-size: calc(var(--nc-ui-readout-size-small) * 0.85);
  color: var(--nc-ui-text-sub);
  white-space: nowrap;
}
/* A narrow column (NYX's Hacks): only the ends of the scale. */
.nc-comp-gauge { container-type: inline-size; }
@container (max-width: 240px) { .nc-comp-gauge-ticks > span:not(:first-child):not(:last-child) { display: none; } }
.nc-comp-gauge-ticks > span:first-child { transform: none; }
.nc-comp-gauge-ticks > span:last-child { transform: translateX(-100%); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar:not([data-nc-gauge="in"]) > .nc-comp-gauge-fill { background: var(--nc-ui-text-sub); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-ui-text-sub); }
.nc-ui-fx > .nc-comp-gauge { margin-bottom: var(--nc-ui-control-gap, var(--nc-ui-space-6)); }
`;function Qm(e){if(!e?.head||e.head.querySelector("style[data-nc-comp-gauge]"))return;const t=e.createElement("style");t.dataset.ncCompGauge="",t.textContent=Xm,e.head.append(t)}const _a=new WeakMap,qs=new WeakMap;function Is(e,t,n){const a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;const i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}const ja=e=>e.doc.defaultView?.performance?.now()??Date.now();function Jm(e){let t=qs.get(e);if(t)return t;const n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1};const a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(const r of i){const s=_a.get(r.target);s&&(s.seen=r.isIntersecting,Ha(s))}Wa(t)})),e.addEventListener("visibilitychange",()=>{for(const i of t.recs)Ha(i);Wa(t)}),qs.set(e,t),t}function Ha(e){const t=e.loop.io?e.seen&&e.el.isConnected:e.el.isConnected,n=!e.dead&&!!e.source&&t&&e.loop.doc.visibilityState!=="hidden";if(n&&!e.open){const a=typeof e.source.open=="function"?e.source.open():!0;e.open=a!==!1,e.open&&(e.loop.loud=ja(e.loop))}else!n&&e.open&&(e.open=!1,e.source?.close?.(),Ao(e))}function Wa(e){let t=!1;for(const n of e.recs)n.open&&(t=!0);if(!t)return ed(e);e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ja(e)),!e.raf&&!e.timer&&$o(e,!1)}function $o(e,t){const n=e.doc.defaultView;n&&(t?e.timer=n.setTimeout(()=>(e.timer=0,Di(e,ja(e))),Um):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(a=>(e.raf=0,Di(e,a))):e.timer=n.setTimeout(()=>(e.timer=0,Di(e,ja(e))),wo))}function ed(e){const t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Di(e,t){if(e.last&&!e.idle&&t-e.last<wo-4)return $o(e,!1);const n=e.last?Math.min(.25,(t-e.last)/1e3):wo/1e3;e.last=t;let a=!1,i=!1;for(const r of e.recs){if(!r.el.isConnected){r.placed&&td(r);continue}r.placed=!0,r.open&&(a=!0,Zm(r,n,t)&&(e.loud=t),r.disp.some(s=>s>0)&&(i=!0))}if(!a)return ed(e);e.idle=t-e.loud>Vm&&!i,$o(e,e.idle)}function Zm(e,t,n){e.fall<0&&(e.fall=Is(e.el,"motion-meter-fall",Gm),e.hold=Is(e.el,"motion-meter-hold",Jc));let a=null;try{a=e.source.read()}catch{a=null}const i=e.on();!i&&e.wasOn&&(e.disp[1]=e.disp[2]=0,e.peakDb[1]=0,e.peakDb[2]=-1/0),e.wasOn=i;const r=Rs(Number(a?.in)||0),s=i?Rs(Number(a?.out)||0):-1/0,l=i?Math.max(0,Number(a?.gr)||0):0,c=[Vn(r),Zc(l),Vn(s)],d=[r,l,s],u=e.fall>0?Math.exp(-t/e.fall):0;for(let p=0;p<3;p++){const f=c[p];e.disp[p]=f>=e.disp[p]?f:f+(e.disp[p]-f)*u,e.disp[p]<.001&&(e.disp[p]=0);const m=d[p]>=e.peakDb[p];(m||n-e.peakAt[p]>e.hold*1e3)&&(m?(e.peakDb[p]=d[p],e.peakAt[p]=n):e.peakDb[p]=Math.max(p===1?l:d[p],e.peakDb[p]-t*20))}return rr(e,i),r>On||l>0}function rr(e,t){const n=e.el.querySelectorAll(":scope > .nc-comp-gauge-bar"),a=e.el.querySelectorAll(":scope > .nc-comp-gauge-val"),i=t?"false":"true";e.el.dataset.ncOff!==i&&(e.el.dataset.ncOff=i);for(let c=0;c<3;c++){const d=n[c];if(!d)continue;const u=c===1,p=Math.round(e.disp[c]*1e3)/1e3,f=u?Zc(e.peakDb[c]):Vn(e.peakDb[c]),m=!u&&e.peakDb[c]>=Wm?"true":"false",g=`${p}|${Math.round(f*1e3)}|${m}`;if(e.shown[c]!==g){e.shown[c]=g;const h=d.children[0],b=d.children[1];h.style.transform=`scaleX(${p})`,b.style.left=u?`${(1-f)*100}%`:`${f*100}%`,b.hidden=f<=0,d.dataset.hot=m}const y=xo(e.peakDb[c],u);a[c]&&a[c].textContent!==y&&(a[c].textContent=y)}const r=e.el.querySelector(".nc-comp-gauge-th"),s=e.threshold(),l=typeof s=="number"&&Number.isFinite(s)?`${Vn(s)*100}%`:"";r&&r.style.left!==l&&(r.style.left=l,r.hidden=!l)}function Ao(e){e.disp=[0,0,0],e.peakDb=[-1/0,0,-1/0],e.peakAt=[0,0,0],e.shown=["","",""],rr(e,e.on())}function td(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e),e.loop.io?.unobserve(e.el),_a.get(e.el)===e&&_a.delete(e.el)}function eg(e,t){const n=e.ownerDocument??globalThis.document,a=Jm(n),i={el:e,loop:a,open:!1,dead:!1,seen:!1,placed:!1,source:t?.source??null,threshold:t?.threshold??(()=>null),on:t?.on??(()=>!0),wasOn:!0,disp:[0,0,0],peakDb:[-1/0,0,-1/0],peakAt:[0,0,0],shown:["","",""],fall:-1,hold:Jc};if(_a.set(e,i),a.recs.add(i),a.io?.observe(e),Ao(i),!a.io){const r=n.defaultView,s=()=>{Ha(i),Wa(a)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(s):setTimeout(s,0)}return{set(r){if(i.dead)return;i.threshold=r?.threshold??i.threshold,i.on=r?.on??i.on;const s=r?.source??null;s!==i.source&&(i.open&&(i.open=!1,i.source?.close?.()),i.source=s,Ao(i)),rr(i,i.on()),Ha(i),Wa(a)},destroy(){td(i)}}}const Ps=new WeakMap;function tg(e,t){if(!e)return null;let n=Ps.get(e);if(!n||!n.el.isConnected||n.el.parentElement!==e){n?.binding.destroy();const a=Ym(e.ownerDocument);t?.help&&(a.dataset.ncHelp=t.help);const i=t?.after??e.querySelector(":scope > .nc-ui-fx-hd");i&&i.parentElement===e?i.after(a):e.prepend(a),n={el:a,binding:eg(a,t)},Ps.set(e,n)}else n.binding.set(t);return t?.color&&n.el.style.setProperty("--nc-gauge-gr",t.color),n.el}function ng(e,t,n,a){const i=Math.min(n,e.length);for(let r=Math.max(0,t);r<i;r++)if(Math.abs(e[r]??0)>=a)return r;return-1}function ag(e,t,n,a=.35){let i=0;for(let l=0;l<e.length;l++)i=Math.max(i,Math.abs(e[l]??0));if(i<.01)return null;const r=[];for(const l of t){const c=ng(e,l,l+n,i*a);c>=0&&r.push(c-l)}if(r.length*2<t.length||r.length===0)return null;r.sort((l,c)=>l-c);const s=Math.floor(r.length/2);return r.length%2?r[s]??0:((r[s-1]??0)+(r[s]??0))/2}const ig="/lucy/assets/capture-processor-WFb8p4vo.js",V=4,Aa=[1,2,4,8];function Ua(e){return Math.ceil(e/V-1e-6)*V+0}function og(e,t,n=0){let a=Ua(e);return a-e<n&&(a+=V),{startBeat:a,endBeat:a+t*V}}function rg(e,t,n,a){const i=Math.round((e+n)*a);return{startFrame:i,endFrame:i+Math.round((t-e)*a)}}function qt(e){return 60/e}function nd(e,t,n){const a=r=>Math.round(r*4*qt(n)*t),i=Aa.find(r=>a(r)>=e)??Aa[Aa.length-1];return{bars:i,frames:a(i),trimmed:e>a(i)}}function sg(e,t,n=0){const a=e.currentTime;let i=null;try{i=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null}catch{i=null}if(i&&typeof i.contextTime=="number"&&typeof i.performanceTime=="number"){if(!(i.contextTime>0)||!(i.performanceTime>0))return Number.NEGATIVE_INFINITY;const s=i.contextTime+Math.max(0,t-(n+i.performanceTime))/1e3;if(Number.isFinite(s))return Math.min(a,s)}const r=(e.baseLatency??0)+(e.outputLatency??0);return a-(Number.isFinite(r)&&r>0?r:0)}const lg=[0,4,8],cg=["sound","visual","both"],ad=4,id="both";function dg(e){return lg.includes(e)?e:ad}function ug(e){return cg.includes(e)?e:id}const pg=e=>e!=="visual",sr=e=>e!=="sound",hg=1;function od(e,t,n,a=0,i=hg){if(t){const s=Math.max(0,Math.floor(e/V)*V);if(e-s<=i){const l=s+Math.ceil(n/V)*V;return{countBeat:l-n,startBeat:l}}}const r=Math.max(0,Ua(e+a+n));return{countBeat:r-n,startBeat:r}}function fg(e,t,n){if(e>=n)return null;const a=n-t,i=Math.max(0,Math.floor(e-t+1e-6));return Math.max(1,a-i)}const Ea=.03;function mg(e,t,n,a=Number.NEGATIVE_INFINITY,i=n(t)){const r=[],s=t-e;for(let l=0;l<s;l++){const c=e+l,d=n(c);d<a||d+Ea>i||r.push({time:d,accent:c%V===0,n:s-l})}return r}function gg(e,t){return t===null?e:`${t} · ${e}`}const rn=["eq","compressor"],bg={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function lr(e){if(e!==void 0){const n=qn(e,rn.length);if(n.chain.length===rn.length&&n.chain.every((a,i)=>a.type===rn[i]))return n}return{v:2,chain:rn.flatMap(n=>{const a=jo(n);return a?[{...a,bypass:!0,dials:{...a.dials,...bg[n]}}]:[]})}}const mt={"page:title":"LUCY records a few bars from your mic, or the Studio's Master, and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take's region (between its markers) as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"What Record records: an input (your mic, an audio interface or a virtual cable, with its level, monitor and timing correction), a tab's or the computer's sound, or in the Studio its Master.","module:takes":"Everything you have recorded or loaded, kept in this browser, newest first. The outlined take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take's region looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records the chosen bars from the next bar line: the mic at once, the Master once the music plays. While Lupa jams: Record voice pass, its next loop as a pass.",mic:"The mic threshold: how loud the mic must get for a voice pass to be kept.","mic-threshold":"How loud the mic must get for a voice pass to be kept (default −45 dB): the mark on the meter. A loop quieter than this the whole way leaves nothing.","mic-meter":"What the mic hears now: past the mark it turns purple, loud enough for a voice pass. Drag the mark to change the threshold.","mic-mark":"The mic threshold. Drag it left if your voice doesn't reach it.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.","record-from":"Input: your mic, interface or a virtual cable (BlackHole); Computer audio: a tab's or the computer's sound; Master: the whole Studio mix, inside the page.","capture-label":"What Computer audio records: a browser tab's sound, or the whole computer's (another app or DAW).","input-device":"Which input LUCY records from, chosen here (your Mac's own setting is left alone; each LUCY remembers its own). Unplugged, it falls back to the default and says so.",share:"Opens the browser's picker: a tab with Also share tab audio, or Entire screen with Also share system audio for another app. Only the sound is kept.","share-how-app":"For another app or DAW, choose Entire screen in the picker: the whole computer's sound needs Chrome 141+ on macOS 14.2+.","share-how-tick":"In the picker, turn on Also share tab audio (a tab) or Also share system audio (the screen), or no sound comes.","share-how":"A tab's sound works in Chrome; the whole computer's sound needs Chrome 141+ on macOS 14.2+. Safari can't share sound.","computer-source":"What is being shared now: a tab, a window or the entire screen.","stop-sharing":"Stops sharing (the browser's own Stop sharing bar does the same). A take recording from it is cancelled.","rights-note":"Nobody here knows who owns a tab's or another app's sound, so takes from it are marked Unknown rights, and so is a Sampler pad they're sent to.","count-in":"Counts 4 or 8 beats before a take starts, mic or Master, so you come in on time. Off starts on the next bar line.",click:"The Studio's metronome while a take records, so you play to the beat. It never reaches the take.","count-in-label":"Counts 4 or 8 beats before a take starts, mic or Master, so you come in on time. Off starts on the next bar line.","cue-label":"How the count-in reaches you: a click on each beat, the number in big type here and over every Studio tab, or both.","click-label":"The Studio's metronome while a take records, so you play to the beat. It never reaches the take.",cue:"How the count-in reaches you: a click on each beat, the number in big type here and over every Studio tab, or both.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate, and to show your inputs by name.","inputs-after":"The browser shows your inputs' names (mic, interface, BlackHole) only once the mic is allowed: then an Input menu appears here.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","input-more":"On a phone, timing correction folds away (round trip, Calibrate, Nudge): set it once. Tap to show or hide it.",count:"On a phone, the count-in, how it reaches you, and the click fold away. Tap to show or hide them.","hacks-cards":"On a phone, LUCY's effects fold away: the line says which are on. Tap to show the EQ and Compressor.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.","takes:empty":"Takes you record, or audio files you Load, appear here as cards, newest first.","take:card":"One take: click it to make it the one Record and Play act on. The outlined card is the selected one.","take:name":"The take's name. Double-click to rename it: Enter saves, Escape cancels.","take:region":"The part that plays, as bar.beat from Start to End, its length in bars and beats, and in seconds.","take:wave":"The take's sound with its bar lines and beats; outside the markers it is skipped. Click it to open the take large and edit it.","editor:start":"Where the take starts playing. Drag it (⌘ or Ctrl places it freely) or use the arrow keys; Shift moves a bar.","editor:end":"Where the take stops. Drag it (⌘ or Ctrl places it freely) or use the arrow keys; Shift moves a bar.","editor:overview":"The whole take. The frame is what the stage shows: drag it, or click to jump there.","editor:snap":"What Start and End snap to as you drag them: a bar, a beat, an eighth or a sixteenth at the take's tempo.","editor:normalize":"On, the take plays at LUCY's level standard; off, as it was recorded. The file is never changed.","editor:timing":"Plays the take a millisecond earlier or later (ten with Shift), to line it up with the music. The file is never changed.","editor:reset":"The whole take plays again: Start at its beginning, End at its end.","editor:play":"Loops the take from Start to End. Press again to stop.","take:start":"Where the take starts playing. Drag it (Alt or Option skips the snap) or use the arrow keys; double-click to put it back at the start.","take:end":"Where the take stops and loops back to Start. Drag it or use the arrow keys; double-click to put it back at the end.","take:timing":"Shifts this take earlier (◀) or later (▶) by a millisecond, ten with Shift; double-click the value for 0. The recording itself is never changed.","take:snap":"What the markers snap to: a bar, a beat, an eighth or a sixteenth at the take's tempo, or off. Snapped, the loop is whole beats, so it sits in time.","take:normalize":"On, the take plays at the TRIKI level, so a quiet one fits the mix. Off, it plays as recorded; the audio itself is never changed.","take:normalize-gain":"How much Normalize turns this take up or down to sit at the TRIKI level. It never pushes a peak past −3 dBFS.","take:play":"Plays this take, looping its region in time with the clock; Stop stops it. Only the part between the markers plays.","take:send":"Copies this take's region onto a Sampler pad. A region of a bar or more is fitted to the nearest whole bars; a shorter one lands unfitted.","take:more":"Download this take as a WAV file, or delete it.","take:download":"Saves this take's region (between the markers) as a WAV file you can open in any audio app.","take:delete":"Deletes this take from this browser. Undo on the message that follows brings it back.","take:recording":"The take being recorded: it waits for the bar line (or for the Master's music), then fills in as the audio arrives.","take:cancel":"Stops this recording and drops it. Nothing is kept.","take:source":"Where the take came from: your Mic (or another input), the Studio's Master, Computer audio, or a File you loaded.","take:rights":"A take of computer audio: nobody here knows who owns it, and a Sampler pad it's sent to says so too. Check the licence before you release anything with it.","take:fact:bars":"How many bars the whole take lasts at the tempo it was recorded at.","take:fact:secs":"How long the whole take lasts, in seconds.","take:fact:bpm":"The tempo it was recorded at. At another tempo it plays faster or slower, and its pitch follows.","take:fact:chans":"Mono (one channel) or stereo (two).","take:fact:rate":"Its sample rate: how many times a second the sound was measured.","take:fact:when":"When it was recorded or loaded. Rest on it for the full date and time.","send-to":"Which Sampler gets the take, when the Studio holds more than one.","send-pad":"The pad the take goes onto. A pad that has a sample is replaced only if you say so in the Sampler, and Undo there brings it back.","send-go":"Sends the region to the chosen pad and opens the Sampler, where Undo puts the pad back. If that pad has a sample, the Sampler asks first.","send-name":"An optional name for the sample in the Sampler. Leave it empty to use the take's own name.","send-cancel":"Closes the picker without sending anything.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:eq:graph":"The EQ's curve over what LUCY plays right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","hack:eq:node:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","hack:eq:node:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","hack:eq:node:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","comp-gauge":"What reaches the compressor (In, the threshold as a tick), how much it turns down (GR) and what comes out (Out).","hack:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack:max":"Opens this effect wide, over the modules beside it, so its graph is easy to see. Click again, the ×, or Escape puts it back.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function rd(e){return`lucy-help-${e.replace(/[^\w-]/g,"-")}`}function yg(e=document){const t=e.querySelector("[data-lucy-help]");if(t)return t;const n=e.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[a,i]of Object.entries(mt)){const r=e.createElement("span");r.id=rd(a),r.textContent=i,n.append(r)}return e.body.append(n),n}function q(e,t,...n){const a=mt[e];if(!a)return;t&&t.getAttribute(Oa)!==a&&t.setAttribute(Oa,a);const i=rd(e);for(const r of n)r&&r.getAttribute("aria-describedby")!==i&&r.setAttribute("aria-describedby",i)}function vg(e,t,n,a=i=>i){const i=`module:${t}`;q(i,e.querySelector(".nc-module-hd .nc-title")),q(i,e.querySelector(".nc-slim"));const r=l=>e.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=r(l.id);if(!c)return;const d=a(l.id);switch(l.type){case"slider":case"select":q(d,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":q(d,c.querySelector(".nc-label"));break;case"button":q(d,c,c);break;case"choice":q(d,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":q(d,c);break;case"group":q(d,c.querySelector(":scope > .nc-group-toggle"),c.querySelector(":scope > .nc-group-toggle"));for(const u of l.controls??[])s(u);break;case"fx":{q(d,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),q("hack:switch",c.querySelector("[data-nc-fx-switch]")),q("hack:meter",null,...c.querySelectorAll("[data-nc-fx-level]"));for(const u of[...l.controls??[],...l.more??[]])s(u);break}}};for(const l of n)s(l)}const wg=48e3;function kg(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=wg?Math.round(n):0}catch{return 0}}function xg(e,t){return{from:e.from+t,to:e.to+t}}const $g="instance",Ag=99;function Zn(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get($g)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=Ag?n:1}function Os(e,t){return t===1?e:`${e}#${t}`}function Eg(e,t){return t===1?e:`${e} ${t}`}let Qt;function Mg(e,t=Zn()){if(Qt!==void 0)return Qt;Qt=null;try{if(typeof window>"u"||window.parent===window)return Qt;const n=window.parent.ncStudio;n&&n.version===1&&(Qt=n.attach(e,{instance:t}))}catch{}return Qt}function Sg(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,i,r)=>n.request(`${a}${t}`,i,r)}:null}}function Tg(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function cr(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function sd(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.countIn?e.countIn:null}catch{return null}}function It(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function kt(e,t=Zn()){return t>1?`${e}#${t}`:e}function Lg(e,t=Zn()){const n=It()?.owner()??null;return n===null||n==="studio"||n===kt(e,t)}const Bi="master",Cg=1,Ng=6e3;function Fg(e,t,n=0,a=Cg){if(t){const r=Math.max(0,Math.floor(e/V)*V);return e-r<=a?r:Ua(e)}let i=Math.max(0,Ua(e));return i-e<n&&(i+=V),i}function zg(e,t,n,a){const i=Math.round(e*a);return{from:i,to:i+Dg(t,n,a)}}function Dg(e,t,n){return Math.round(e*V*60/t*n)}class Bg{constructor(t){this.deps=t}current={kind:"idle"};rec=null;stopTimer=null;job=0;startSeconds=null;get phase(){return this.current}get busy(){return this.current.kind!=="idle"}press(){this.busy?this.cancel():this.arm()}arm(){if(this.busy)return!0;const t=this.deps.grab();return t?.record?(t.listen(Bi),this.set({kind:"waiting"}),this.deps.running()&&this.start(!1),!0):(this.deps.failed("unavailable"),!1)}cancel(){this.drop(),this.set({kind:"idle"})}clockChanged(t){if(this.current.kind==="waiting"&&this.deps.running())this.start(t);else if(this.current.kind==="recording"&&!this.deps.running()){const n=this.current,a=this.deps.now?.();if(n.countBeat<n.startBeat&&a!==void 0&&a<(this.startSeconds??0)){this.drop(),this.set({kind:"waiting"});return}this.drop(),this.set({kind:"idle"}),this.deps.failed("stopped")}}start(t){const n=this.deps.grab(),a=this.deps.beatNow(),i=Math.max(0,Math.round(this.deps.countIn?.()??0)),{countBeat:r,startBeat:s}=i>0?od(a,t,i,this.deps.leadBeats()):(()=>{const b=Fg(a,t,this.deps.leadBeats());return{countBeat:b,startBeat:b}})(),l=this.deps.bars(),c=this.deps.bpm(),d=this.deps.sampleRate(),{from:u,to:p}=xg(zg(this.deps.contextTime(s),l,c,d),kg(n??null,Bi)),f=n?.record?.(Bi,u)??null;if(!f){this.set({kind:"idle"}),this.deps.failed("unavailable");return}const m=++this.job,g=this.deps.nextId();this.rec=f,this.startSeconds=this.deps.contextTime(s),this.set({kind:"recording",id:g,countBeat:r,startBeat:s,endBeat:s+l*V,bars:l,bpm:c,from:u,to:p});const y=(p-u)/d*1e3,h=Math.max(0,(this.deps.contextTime(s)-this.nowContext())*1e3);this.stopTimer=this.deps.after(h+y+Ng,()=>{m===this.job&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("timeout"))}),f.stop(p).then(b=>this.finish(m,b),()=>this.finish(m,null))}nowContext(){return this.deps.contextTime(this.deps.beatNow())}finish(t,n){if(t!==this.job||this.current.kind!=="recording")return;const a=this.current;this.stopTimer?.(),this.stopTimer=null,this.rec=null,this.set({kind:"idle"});const i=n?.[0]?.length??0;if(!n||i===0){this.deps.failed("empty");return}this.deps.done({id:a.id,bars:a.bars,bpm:a.bpm,startBeat:a.startBeat,from:a.from,to:a.to,channels:n})}drop(){this.job++,this.stopTimer?.(),this.stopTimer=null,this.rec?.cancel(),this.rec=null,this.startSeconds=null}set(t){this.current=t,this.deps.changed()}}function Rg(e){let t=0;for(const n of e)for(const a of n)t=Math.max(t,Math.abs(a));return t}const qg=-16,Ig=-3,ld=24,Pg=3,Og=-80,_s=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function _g(e,t,n=Pg){const a=e[0]?.length??0;if(!a||!e.length)return{rmsDb:Number.NEGATIVE_INFINITY,peakDb:Number.NEGATIVE_INFINITY};const i=Math.max(1,Math.round(t*.01)),r=Math.ceil(a/i),s=new Float64Array(r);let l=0;for(const m of e)for(let g=0;g<a;g++){const y=m[g]??0;s[g/i|0]+=y*y;const h=y<0?-y:y;h>l&&(l=h)}const c=Math.min(r,Math.max(1,Math.round(n*t/i))),d=c===r?a:c*i;let u=0;for(let m=0;m<c;m++)u+=s[m];let p=u;for(let m=c;m<r;m++)u+=s[m]-s[m-c],u>p&&(p=u);const f=Math.max(0,p)/(d*e.length);return{rmsDb:_s(Math.sqrt(f)),peakDb:_s(l)}}function jg(e){if(!Number.isFinite(e.rmsDb)||e.rmsDb<Og)return 0;let t=Math.min(qg-e.rmsDb,ld);return Number.isFinite(e.peakDb)&&(t=Math.min(t,Ig-e.peakDb)),Math.round(t*10)/10}function Pt(e,t){return jg(_g(e,t))}function cd(e){const t=e.normalize;return t?.on?10**(t.gainDb/20):1}function Hg(e){if(!e||typeof e!="object")return;const t=e;if(typeof t.on!="boolean")return;const n=t.gainDb;if(!(typeof n!="number"||!Number.isFinite(n)||n<-60||n>ld))return{on:t.on,gainDb:n}}function dd(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const ri=600;class Va{constructor(t,n=ri){this.totalFrames=t,this.columns=n,this.peaks=new Float32Array(n*2)}peaks;at=0;get filled(){return this.totalFrames<=0?0:Math.min(this.columns,Math.ceil(this.at/this.totalFrames*this.columns))}get frames(){return this.at}add(t){const n=t[0]?.length??0;if(!n||this.totalFrames<=0)return;const a=this.totalFrames/this.columns;let i=0;for(;i<n&&this.at<this.totalFrames;){const r=Math.min(this.columns-1,Math.floor(this.at/a)),s=Math.min(this.totalFrames,Math.ceil((r+1)*a)),l=Math.max(1,Math.min(n-i,s-this.at));let c=this.peaks[r*2]??0,d=this.peaks[r*2+1]??0;for(const u of t)for(let p=i;p<i+l;p++){const f=u[p]??0;f<c&&(c=f),f>d&&(d=f)}this.peaks[r*2]=Math.max(-1,c),this.peaks[r*2+1]=Math.min(1,d),i+=l,this.at+=l}}}function ea(e,t=ri){const n=new Va(e[0]?.length??0,t);return n.add(e),n.peaks}function js(e,t=e.length/2,n=.01){const a=Math.min(e.length/2,Math.max(0,Math.floor(t)));if(!a)return"";const i=d=>Math.round(d*1e3)/1e3,r=[],s=[],l=d=>i(-Math.max(e[d*2+1]??0,n)),c=d=>i(-Math.min(e[d*2]??0,-n));r.push(`0 ${l(0)}`);for(let d=0;d<a;d++)r.push(`${d+.5} ${l(d)}`);r.push(`${a} ${l(a-1)}`),s.push(`${a} ${c(a-1)}`);for(let d=a-1;d>=0;d--)s.push(`${d+.5} ${c(d)}`);return s.push(`0 ${c(0)}`),`M${r.join("L")}L${s.join("L")}Z`}function Wg(e,t=Date.now()){const n=Date.parse(e);if(!Number.isFinite(n))return"";const a=Math.max(0,(t-n)/1e3);if(a<45)return"just now";const i=Math.round(a/60);if(i<60)return`${i} min ago`;const r=Math.round(i/60);if(r<24)return`${r} h ago`;const s=Math.round(r/24);return s===1?"yesterday":s<7?`${s} days ago`:new Date(n).toLocaleDateString(void 0,{day:"numeric",month:"short"})}function Ug(e){const t=Date.parse(e);return Number.isFinite(t)?new Date(t).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"}):""}const Be=1,Ga=1024,Vg=48,ud=128,Hs=40,Ws=64,Us=8,Vs=16,Gs=1024,pd=16,dr=255,Gg=["chord","root","top"],Kg=["chord","root","top","arp","note"],Ks=24,Ys=-60,Yg=["ask","armed","recording","cancel","quiet","added","undo","undone"],Xs=9999,Jt=256,Eo=2,ga=128,hd=64,Mo=24,Qs=4,Gn=e=>typeof e=="object"&&e!==null,we=e=>typeof e=="string"&&e.length>0&&e.length<=ud,ne=e=>typeof e=="number"&&Number.isFinite(e);function Js(e){return Gn(e)?we(e.id)?we(e.source)?!Number.isInteger(e.note)||e.note<0||e.note>127?"note must be a whole number 0–127":!ne(e.velocity)||e.velocity<0||e.velocity>1?"velocity must be 0–1":ne(e.startBeat)?!ne(e.lengthBeats)||e.lengthBeats<0?"bad lengthBeats":!ne(e.spanBeats)||e.spanBeats<=0?"bad spanBeats":!ne(e.gate)||e.gate<=0||e.gate>1?"gate must be above 0, at most 1":!ne(e.offsetSec)||Math.abs(e.offsetSec)>2?"bad offsetSec":typeof e.role!="string"||!Kg.includes(e.role)?"bad role":Number.isInteger(e.hit)?!Number.isInteger(e.root)||e.root<0||e.root>127?"bad root":e.slice!==void 0&&!fd(e.slice)?`slice must be a whole number 0–${dr}`:null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}const fd=e=>Number.isInteger(e)&&e>=0&&e<=dr,Xg=e=>Number.isInteger(e)&&e>=1&&e<=pd;function md(e){return Gn(e)?we(e.id)?ne(e.beat)?e.type==="slot"?!Number.isInteger(e.slot)||e.slot<1||e.slot>Vs?`slot must be a whole number 1–${Vs}`:null:e.type==="chordPad"?e.pad!==null&&!Xg(e.pad)?`pad must be a whole number 1–${pd}, or null`:null:e.type==="take"?we(e.take)?!ne(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Jt?`lengthBeats must be above 0, at most ${Jt}`:e.gain!==void 0&&(!ne(e.gain)||e.gain<0||e.gain>Eo)?`gain must be 0–${Eo}`:e.offsetBeats!==void 0&&(!ne(e.offsetBeats)||e.offsetBeats<0||e.offsetBeats>=e.lengthBeats)?"offsetBeats must be from 0, below lengthBeats":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=ga&&e.peaks.every(t=>ne(t)&&t>=0&&t<=1))?`peaks must be at most ${ga} values 0–1`:e.normalize!==void 0&&typeof e.normalize!="boolean"?"normalize must be true or false":e.normalizeDb!==void 0&&(!ne(e.normalizeDb)||e.normalizeDb<Ys||e.normalizeDb>Ks)?`normalizeDb must be ${Ys}–${Ks}`:null:"bad take":e.type==="lap"?!ne(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Jt?`lengthBeats must be above 0, at most ${Jt}`:null:e.type==="voice"?typeof e.state!="string"||!Yg.includes(e.state)?"bad voice state":e.lengthBeats!==void 0&&(!ne(e.lengthBeats)||e.lengthBeats<=0||e.lengthBeats>Jt)?`lengthBeats must be above 0, at most ${Jt}`:e.state==="armed"&&e.lengthBeats===void 0?"an armed voice pass needs lengthBeats":e.pass!==void 0&&!(Number.isInteger(e.pass)&&e.pass>=1&&e.pass<=Xs)?`pass must be a whole number 1–${Xs}`:e.take!==void 0&&!we(e.take)?"bad take":(e.state==="undo"||e.state==="undone")&&e.take===void 0?"undo needs its take":e.peaks!==void 0&&!(Array.isArray(e.peaks)&&e.peaks.length<=ga&&e.peaks.every(t=>ne(t)&&t>=0&&t<=1))?`peaks must be at most ${ga} values 0–1`:null:e.type==="param"?typeof e.param!="string"||!Qg.test(e.param)?`param must be 1–${hd} letters, digits, '.', '-' or '_'`:Zs(e.value)?e.label!==void 0&&!el(e.label)?`label must be 1–${Mo} characters`:e.text!==void 0&&!el(e.text)?`text must be 1–${Mo} characters`:e.from!==void 0&&!Zs(e.from)?"from must be 0–1":e.glide!==void 0&&(!ne(e.glide)||e.glide<=0||e.glide>Qs)?`glide must be above 0, at most ${Qs} beats`:null:"value must be 0–1":"bad type":"bad beat":"bad id":"not an object"}const Qg=new RegExp(`^[A-Za-z0-9._-]{1,${hd}}$`),Zs=e=>ne(e)&&e>=0&&e<=1,el=e=>typeof e=="string"&&e.length>0&&e.length<=Mo;function Jg(e){if(!Gn(e))return"not an object";if(e.type==="sound")return we(e.id)?ne(e.beat)?e.stopped!==void 0&&e.stopped!==!0?"stopped must be true when present":null:"bad beat":"bad id";if(e.type!=="note")return md(e);if(!we(e.id))return"bad id";if(!ne(e.beat))return"bad beat";if(typeof e.on!="boolean")return"on must be true or false";if(e.pattern!==void 0&&e.pattern!==!0)return"pattern must be true when present";if(e.stopped!==void 0&&e.stopped!==!0)return"stopped must be true when present";if(e.pattern===!0&&e.stopped===!0)return"a pattern note plays on a running clock";if(!Number.isInteger(e.note)||e.note<0||e.note>127)return"note must be a whole number 0–127";if(e.on){if(!ne(e.velocity)||e.velocity<=0||e.velocity>1)return"velocity must be above 0, at most 1";if(e.slice!==void 0&&!fd(e.slice))return`slice must be a whole number 0–${dr}`;if(e.name!==void 0&&(typeof e.name!="string"||!e.name.length||e.name.length>Hs))return`name must be 1–${Hs} characters`}else if(e.velocity!==void 0||e.slice!==void 0||e.name!==void 0)return"an off has no velocity, slice or name";return null}function tl(e,t){if(!Array.isArray(e))return"events must be a list";if(e.length>Ga)return`more than ${Ga} events`;for(let n=0;n<e.length;n++){const a=t(e[n]);if(a)return`event ${n}: ${a}`}return null}function Zg(e){if(!Gn(e))return"not an object";if(e.v!==Be)return`version ${String(e.v)} is not ${Be}`;if(e.kind==="notes"){if(!we(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>Ga)return`more than ${Ga} events`;for(let t=0;t<e.events.length;t++){const n=Js(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="audition"){if(!we(e.source))return"bad source";if(!Array.isArray(e.events))return"events must be a list";if(e.events.length>Ws)return`more than ${Ws} notes`;if(!ne(e.holdSec)||e.holdSec<=0||e.holdSec>Us)return`holdSec must be above 0, at most ${Us}`;for(let t=0;t<e.events.length;t++){const n=Js(e.events[t]);if(n)return`event ${t}: ${n}`;if(e.events[t].source!==e.source)return`event ${t}: from another source`}return null}if(e.kind==="played")return we(e.source)?tl(e.events,Jg):"bad source";if(e.kind==="controls")return we(e.source)?tl(e.events,md):"bad source";if(e.kind==="off")return we(e.source)?["stop","removed","off","restart"].includes(e.reason)?e.atBeat!==void 0&&!ne(e.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(e.kind==="release"){if(!we(e.source))return"bad source";if(!Array.isArray(e.ids))return"ids must be a list";if(e.ids.length>Gs)return`more than ${Gs} ids`;for(let t=0;t<e.ids.length;t++)if(!we(e.ids[t]))return`id ${t}: bad id`;return null}if(e.kind==="routes"){if(!Array.isArray(e.routes)||e.routes.length>64)return"routes must be a list (at most 64)";for(const t of e.routes){if(!Gn(t)||!we(t.source)||typeof t.name!="string"||t.name.length>ud)return"bad route";if(!Gg.includes(t.role))return"bad route role";if(t.octave!==void 0&&!(Number.isInteger(t.octave)&&t.octave>=-1&&t.octave<=9))return"bad route octave";if(t.transpose!==void 0&&!(Number.isInteger(t.transpose)&&Math.abs(t.transpose)<=Vg))return"bad route transpose";if(t.layer!==void 0&&typeof t.layer!="boolean")return"bad route layer"}return null}return"unknown kind"}const nl=e=>({id:e.id,source:e.source,note:e.note,velocity:e.velocity,startBeat:e.startBeat,lengthBeats:e.lengthBeats,role:e.role,offsetSec:e.offsetSec,spanBeats:e.spanBeats,gate:e.gate,hit:e.hit,root:e.root,...e.slice===void 0?{}:{slice:e.slice}}),gd=e=>e.type==="slot"?{type:"slot",id:e.id,beat:e.beat,slot:e.slot}:e.type==="take"?{type:"take",id:e.id,beat:e.beat,take:e.take,lengthBeats:e.lengthBeats,...e.gain===void 0?{}:{gain:e.gain},...e.offsetBeats===void 0?{}:{offsetBeats:e.offsetBeats},...e.peaks===void 0?{}:{peaks:[...e.peaks]},...e.normalize===void 0?{}:{normalize:e.normalize},...e.normalizeDb===void 0?{}:{normalizeDb:e.normalizeDb}}:e.type==="lap"?{type:"lap",id:e.id,beat:e.beat,lengthBeats:e.lengthBeats}:e.type==="voice"?{type:"voice",id:e.id,beat:e.beat,state:e.state,...e.lengthBeats===void 0?{}:{lengthBeats:e.lengthBeats},...e.pass===void 0?{}:{pass:e.pass},...e.take===void 0?{}:{take:e.take},...e.peaks===void 0?{}:{peaks:[...e.peaks]}}:e.type==="param"?{type:"param",id:e.id,beat:e.beat,param:e.param,value:e.value,...e.label===void 0?{}:{label:e.label},...e.text===void 0?{}:{text:e.text},...e.from===void 0?{}:{from:e.from},...e.glide===void 0?{}:{glide:e.glide}}:{type:"chordPad",id:e.id,beat:e.beat,pad:e.pad},eb=e=>e.type==="sound"?{type:"sound",id:e.id,beat:e.beat,...e.stopped===!0?{stopped:!0}:{}}:e.type!=="note"?gd(e):{type:"note",id:e.id,beat:e.beat,on:e.on,note:e.note,...e.on?{velocity:e.velocity}:{},...e.on&&e.slice!==void 0?{slice:e.slice}:{},...e.on&&e.name!==void 0?{name:e.name}:{},...e.pattern===!0?{pattern:!0}:{},...e.stopped===!0?{stopped:!0}:{}};function tb(e){if(Zg(e))return null;const t=e;return t.kind==="notes"?{v:Be,kind:"notes",source:t.source,events:t.events.map(nl)}:t.kind==="audition"?{v:Be,kind:"audition",source:t.source,events:t.events.map(nl),holdSec:t.holdSec}:t.kind==="played"?{v:Be,kind:"played",source:t.source,events:t.events.map(eb)}:t.kind==="controls"?{v:Be,kind:"controls",source:t.source,events:t.events.map(gd)}:t.kind==="off"?{v:Be,kind:"off",source:t.source,reason:t.reason,...t.atBeat===void 0?{}:{atBeat:t.atBeat}}:t.kind==="release"?{v:Be,kind:"release",source:t.source,ids:[...t.ids]}:{v:Be,kind:"routes",routes:t.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose},...n.layer===void 0?{}:{layer:n.layer}}))}}const bd=-45,xt=-70,ta=-20,al=.05,yd=128,nb=1e6,ab=3,ib=.25,ob=.05,rb=.01,Ma=e=>10**(e/20),sb={takes:"layer"};function lb(e,t){return e?.notesIn?.(t,sb)??(()=>{})}function vd(e){return typeof e=="number"&&Number.isFinite(e)?Math.round(Math.max(xt,Math.min(ta,e))):bd}const cb={thresholdDb:bd,nextVoice:1,voices:[]};function Ka(e){const t=e&&typeof e=="object"?e:{},n=Array.isArray(t.voices)?t.voices.filter(i=>!!i&&[i.id,i.frames,i.sampleRate,i.channels].every(r=>typeof r=="number"&&Number.isInteger(r)&&r>0)):[];for(const i of n)i.normalizeDb!==void 0&&!(Number.isFinite(i.normalizeDb)&&Math.abs(i.normalizeDb)<=60)&&Reflect.deleteProperty(i,"normalizeDb");const a=n.reduce((i,r)=>Math.max(i,r.id),0);return{thresholdDb:vd(t.thresholdDb),nextVoice:Math.max(a+1,typeof t.nextVoice=="number"?Math.floor(t.nextVoice):1),voices:n}}const db=e=>`v${e}`;function Ri(e){const t=/^v(\d{1,9})$/.exec(e);return t?Number(t[1]):null}const wd=e=>{const t=e>0?20*Math.log10(e):-120;return Math.round(Math.max(0,Math.min(1,(t+60)/60))*100)/100};function ub(e,t=yd){const n=e[0]?.length??0;if(!n)return[];const a=Math.min(t,n),i=[];for(let r=0;r<a;r++){const s=Math.floor(r*n/a),l=Math.max(s+1,Math.floor((r+1)*n/a));let c=0;for(const d of e)for(let u=s;u<l;u++){const p=Math.abs(d[u]??0);p>c&&(c=p)}i.push(wd(c))}return i}function pb(e,t){const n=e[0]?.length??0;let a=0;for(let i=0;i<n;i++)for(const r of e)if(Math.abs(r[i]??0)>=t){a++;break}return a}class il{constructor(t,n=yd){this.total=t,this.points=n,this.max=new Float32Array(n)}max;frames=0;add(t){const n=t[0]?.length??0;for(let a=0;a<n;a++){const i=this.frames+a;if(i>=this.total)break;const r=Math.min(this.points-1,Math.floor(i*this.points/this.total));for(const s of t){const l=Math.abs(s[a]??0);l>(this.max[r]??0)&&(this.max[r]=l)}}this.frames=Math.min(this.total,this.frames+n)}values(){const t=this.total>0?Math.floor(this.frames*this.points/this.total):0;return Array.from(this.max.subarray(0,t),wd)}get fraction(){return this.total>0?this.frames/this.total:0}}class qi{constructor(t){this.deps=t}serial=0;takes=[];jam=null;buffers=new Map;view={kind:"idle"};job=null;askedAt=0;confirmed=new Map;stats={asked:0,kept:0,quiet:0,played:0,cancelled:0};setThreshold(t){this.deps.state().thresholdDb=vd(t),this.deps.save(),this.deps.changed()}get voice(){return this.view}get busy(){const t=this.view.kind;return t==="asking"||t==="armed"||t==="recording"}clear(){this.busy||this.view.kind==="saving"||(this.view={kind:"idle"},this.deps.changed())}set(t){this.view=t,this.deps.changed()}message(t){const n=tb(t);n&&(n.kind==="controls"?this.controls(n.events):n.kind==="off"&&this.off(n.atBeat))}controls(t){for(const n of t)n.type==="lap"?this.heardLap(n.beat,n.lengthBeats):n.type==="take"?this.playTake(n):n.type==="voice"&&this.fromLupa(n)}heardLap(t,n){const a=this.jam,i=!!a;!a||t>a.to+n+1e-6||t<a.from-n?this.jam={from:t,to:t+n,lapBeat:t,lengthBeats:n}:(a.to=Math.max(a.to,t+n),t>=a.lapBeat&&(a.lapBeat=t,a.lengthBeats=n)),i||this.deps.changed()}jamming(t){const n=this.jam;return!!n&&t>=n.from-1e-6&&t<n.to-1e-6}jammingNow(){const t=this.beatNow();return t!==null&&this.jamming(t)}loopAt(t){const n=this.jam;if(!n||!this.jamming(t))return null;const a=n.lengthBeats,i=((t-n.lapBeat)%a+a)%a;return{bar:Math.floor(i/4)+1,beat:Math.floor(i%4)+1,bars:Math.max(1,Math.round(a/4))}}beatNow(){try{const t=this.deps.beatNow?.()??null;return t===null||!Number.isFinite(t)?null:t}catch{return null}}ask(){if(this.busy||!this.jammingNow())return!1;const t=this.beatNow()??0;return this.stats.asked++,this.askedAt=this.deps.now(),this.set({kind:"asking"}),this.tell({state:"ask",beat:t})?!0:(this.view.kind==="asking"&&this.set({kind:"failed",text:"Lupa didn't hear. Try again."}),!1)}cancel(){this.busy&&(this.drop(),this.stats.cancelled++,this.tell({state:"cancel",beat:this.beatNow()??0}),this.set({kind:"idle"}))}undo(){const t=this.view;return t.kind!=="added"?!1:this.tell({state:"undo",beat:this.beatNow()??0,take:t.take})}drop(){this.job&&this.deps.cancel(this.job.id),this.job=null}tell(t){try{return this.deps.report({v:Be,kind:"played",events:[{type:"voice",id:`vp-${++this.serial}`,...t}]})}catch{return!1}}fromLupa(t){if(t.state==="armed"&&t.lengthBeats!==void 0)this.armed(t.beat,t.lengthBeats,t.pass??1);else if(t.state==="cancel"){if(!this.busy)return;this.drop(),this.set({kind:"idle"})}else if(t.state==="added"){t.take&&this.confirmed.set(t.take,t.pass??0);const n=this.view;n.kind==="added"&&(!t.take||t.take===n.take)&&this.set({...n,confirmed:!0,...t.pass?{pass:t.pass}:{}})}else if(t.state==="undone"){const n=this.view;n.kind==="added"&&t.take===n.take&&this.set({kind:"undone",pass:n.pass});const a=t.take?Ri(t.take):null;if(a!==null)try{this.deps.uncopyFromTakes?.(a)}catch{}}}async armed(t,n,a){if(this.job){if(Math.abs(this.job.beat-t)<1e-6)return;this.drop()}const i=this.view.kind!=="asking"&&!this.jammingNow(),r=nb+ ++this.serial,s={id:r,beat:t,lengthBeats:n,pass:a,started:i,frames:0,parts:[],peaks:new il(1),loud:!1,queued:!1,sentAt:0};if(this.job=s,this.set({kind:"armed",beat:t,lengthBeats:n,pass:a,started:i}),!this.deps.micOpen()){const f=await this.deps.openMic?.().catch(()=>!1)??!1;if(this.job!==s)return;if(!f||!this.deps.micOpen()){this.job=null,this.tell({state:"cancel",beat:t}),this.set({kind:"failed",text:"Allow the mic to record a voice pass."});return}}const l=this.deps.sampleRate(),c=this.deps.roundTrip(),d=this.deps.timeAt(t);if(d-this.deps.now()<ob){this.job=null,this.tell({state:"cancel",beat:t}),this.set({kind:"failed",text:"The mic opened too late for that loop. Try again."});return}const u=Math.round((d+c)*l),p=Math.round((this.deps.timeAt(t+n)+c)*l);p<=u||(s.frames=p-u,s.peaks=new il(s.frames),s.queued=!0,this.deps.record({id:r,startFrame:u,endFrame:p,channels:this.deps.inputChannels(),gate:Ma(this.deps.state().thresholdDb)}))}tick(){const t=this.view,n=this.deps.now();if(t.kind==="asking"&&n-this.askedAt>ab){this.set({kind:"failed",text:"Lupa didn't answer. Try again."});return}const a=this.job;if(a){if(t.kind==="armed"&&a.queued&&n>=this.deps.timeAt(a.beat)){this.set({kind:"recording",beat:a.beat,lengthBeats:a.lengthBeats,pass:a.pass,peaks:[],loud:a.loud});return}t.kind==="recording"&&n-a.sentAt>=ib&&a.parts.length&&(a.sentAt=n,this.tell({state:"recording",beat:a.beat,peaks:t.peaks}))}}level(t){const n=this.job;!n||this.view.kind!=="recording"||n.loud||t>=Ma(this.deps.state().thresholdDb)&&(n.loud=!0,this.set({...this.view,loud:!0}))}owns(t){return t!==void 0&&this.job?.id===t}capture(t){const n=this.job;if(!n||t.id!==n.id)return;if(t.type==="chunk"&&t.channels){n.parts.push(t.channels),n.peaks.add(t.channels);const i=this.view;i.kind==="recording"&&this.set({...i,peaks:n.peaks.values()});return}if(t.type!=="done")return;this.job=null;const a=(t.loudFrames??0)/this.deps.sampleRate();this.finish(n,ol(n.parts),a>=al,n.lengthBeats)}async finish(t,n,a,i){const r=ub(n);if(!a||!n[0]?.length){this.stats.quiet++,this.tell({state:"quiet",beat:t.beat}),this.set({kind:"quiet",lengthBeats:t.lengthBeats,peaks:t.peaks.values()});return}this.set({kind:"saving",lengthBeats:t.lengthBeats,pass:t.pass,peaks:t.peaks.values()});const s=await this.keep(t.beat,i,n,r);if(!s){this.set({kind:"failed",text:"Lupa didn't take the voice pass."});return}const l=t.peaks.values(),c=this.confirmed.get(s);this.confirmed.clear();const d=Ri(s),u=d===null?void 0:this.deps.state().voices.find(p=>p.id===d);if(u)try{this.deps.copyToTakes?.(u,n,c||t.pass)}catch{}this.set({kind:"added",pass:c||t.pass,take:s,lengthBeats:t.lengthBeats,keptBeats:i,peaks:l,confirmed:c!==void 0})}async keep(t,n,a,i){const r=a[0]?.length??0;if(!r)return null;const s=this.deps.state(),l={id:s.nextVoice++,frames:r,sampleRate:this.deps.sampleRate(),channels:a.length,normalizeDb:Pt(a,this.deps.sampleRate())};s.voices.push(l),this.deps.save();const c=this.deps.storeVoice(l.id,a).catch(()=>!1);this.buffers.set(l.id,c.then(()=>this.deps.loadVoice(l))),await c;const d={type:"take",id:`lap-${l.id}`,beat:t,take:db(l.id),lengthBeats:n,peaks:i,...l.normalizeDb!==void 0?{normalizeDb:l.normalizeDb}:{}},u=this.deps.report({v:Be,kind:"played",events:[d]});return u&&this.stats.kept++,u?d.take:null}async playTake(t){const n=Ri(t.take),a=n===null?void 0:this.deps.state().voices.find(y=>y.id===n);if(!a||n===null)return;const i=t.offsetBeats??0,r={beat:t.beat,endBeat:t.beat+t.lengthBeats-i,playing:null,cancelled:!1};this.takes.push(r);let s=this.buffers.get(n);s||(s=this.deps.loadVoice(a),this.buffers.set(n,s));const l=await s;if(!l||r.cancelled){this.takes=this.takes.filter(y=>y!==r);return}const c=this.deps.beatSeconds();let d=this.deps.timeAt(t.beat),u=i*c;const p=this.deps.timeAt(r.endBeat),f=this.deps.now();d<f&&(u+=f-d,d=f);const m=Math.min(p-d,l.duration-u);if(m<=.02){this.takes=this.takes.filter(y=>y!==r);return}let g=Math.max(0,Math.min(Eo,t.gain??1));if(t.normalize){if(a.normalizeDb===void 0){const y=Array.from({length:l.numberOfChannels},(h,b)=>l.getChannelData(b));a.normalizeDb=Pt(y,l.sampleRate),this.deps.save()}g*=10**(a.normalizeDb/20)}r.playing=this.deps.play(l,d,u,m,g),this.stats.played++}off(t){if(t===void 0){const i=!!this.jam;this.jam=null,this.stopped(),i&&this.deps.changed()}const n=t===void 0?void 0:this.deps.timeAt(t),a=[];for(const i of this.takes){if(t!==void 0&&i.endBeat<=t){a.push(i);continue}i.cancelled=!0,i.playing?.stop(t!==void 0&&i.beat<t?n:void 0)}this.takes=a}stopped(){const t=this.view;if(t.kind==="asking"){this.set({kind:"idle"});return}const n=this.job;if(!n)return;const a=this.deps.now();if(t.kind==="armed"||a<this.deps.timeAt(n.beat)){this.drop(),this.set({kind:"idle"});return}this.drop();const i=ol(n.parts),r=i[0]?.length??0,s=this.deps.sampleRate(),l=Ma(this.deps.state().thresholdDb),c=pb(i,l)/s>=al,d=this.deps.beatSeconds(),u=Math.max(.001,Math.min(n.lengthBeats,r/s/d));this.finish(n,i,c,u)}static fadeSeconds=rb}function ol(e){const t=e[0]?.length??0,n=e.reduce((a,i)=>a+(i[0]?.length??0),0);return Array.from({length:t},(a,i)=>{const r=new Float32Array(n);let s=0;for(const l of e){const c=l[i];c&&(r.set(c,s),s+=c.length)}return r})}const Nt=["off","bar","beat","8","16"],hb="beat",So={off:"Off",bar:"Bar",beat:"Beat",8:"1/8",16:"1/16"};function Ke(e){return 60/e.bpm*e.sampleRate}function kd(e,t){const n=Ke(e);switch(t){case"bar":return n*V;case"beat":return n;case"8":return n/2;case"16":return n/4;default:return null}}function ur(e){return Math.min(e.frames,Math.max(1,Math.round(Ke(e)/4)))}function Xe(e){return e.region??{start:0,end:e.frames}}function fb(e,t){return t.start<=0&&t.end>=e.frames}function xd(e,t,n){const a=kd(e,n),i=Math.max(0,Math.min(e.frames,t));if(a===null)return Math.round(i);const r=Math.round(Math.round(i/a)*a);return Math.abs(e.frames-i)<Math.abs(r-i)?e.frames:Math.max(0,Math.min(e.frames,r))}function sn(e,t,n){const a=Xe(e),i=ur(e),r=Math.round(n);return t==="start"?{start:Math.max(0,Math.min(r,a.end-i)),end:a.end}:{start:a.start,end:Math.min(e.frames,Math.max(r,a.start+i))}}function mb(e,t){if(!t||typeof t!="object")return;const n=t,a=n.start,i=n.end;if(typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i))return;const r=Math.round(a),s=Math.round(i);if(!(r<0||s>e.frames||s-r<ur(e))&&!(r===0&&s===e.frames))return{start:r,end:s}}function To(e,t,n,a,i=!1){const r=Xe(e),s=t==="start"?r.start:r.end,l=i?Ke(e)*V:kd(e,a)??Ke(e)/4,c=s/l,u=Math.abs(c-Math.round(c))*l<.5?Math.round(c)+n:n>0?Math.ceil(c):Math.floor(c);let p=Math.round(u*l);return n>0&&p>e.frames&&(p=e.frames),n>0&&Math.abs(e.frames-p)<1&&(p=e.frames),sn(e,t,p)}function ln(e,t){const n=t/Ke(e)*4,a=Math.round(n),i=Math.abs(n-a)*(Ke(e)/4)<1,r=i?a:Math.floor(n),s=Math.floor(r/16)+1,l=Math.floor(r%16/4)+1,c=r%4+1;return`${i?"":"≈"}${s}.${l}${c===1?"":`.${c}`}`}function $d(e){const t=Math.round(e*1e3)/1e3,n=Math.floor((t+1e-9)/V),a=Math.round((t-n*V)*1e3)/1e3,i=[];if(n&&i.push(`${n} bar${n===1?"":"s"}`),a>0||!n){const r=Number.isInteger(a)?String(a):String(Math.round(a*100)/100);i.push(`${r} beat${a===1?"":"s"}`)}return i.join(" ")}function si(e,t=Xe(e)){return(t.end-t.start)/Ke(e)}function gb(e,t=Xe(e)){const n=(t.end-t.start)/e.sampleRate;return`${ln(e,t.start)} → ${ln(e,t.end)} · ${$d(si(e,t))} · ${n.toFixed(2)} s`}function bb(e,t,n){const a=Math.round(n/Ke(e)*4),i=Math.floor(a/16)+1,r=Math.floor(a%16/4)+1;return`${t==="start"?"Start":"End"}: ${(n/e.sampleRate).toFixed(2)} s, bar ${i} beat ${r}`}function yb(e,t=Xe(e)){const n=si(e,t)/V;return n>=1-1e-6?Math.max(1,Math.round(n)):void 0}function Ad(e,t){return e.map(n=>n.slice(t.start,t.end))}function rl(e,t,n=0){let a=Math.ceil(e/V-1e-6)*V+0;a-e<n&&(a+=V);const i=Math.max(1e-6,t),r=(a%i+i)%i;return{startBeat:a,offsetBeats:Math.abs(r-i)<1e-6?0:r}}function vb(e){const t=Ke(e),n=[],a=[],i=Math.floor(e.frames/t+1e-6);for(let r=1;r<=i;r++){const s=r*t/e.frames;if(s>=1-1e-6)break;(r%V===0?n:a).push(s)}return{bars:n,beats:a}}const wn=500,wb=2;function vt(e){return Math.round(e*10)/10}function pr(e){return Number.isFinite(e)?vt(Math.max(-wn,Math.min(wn,e))):0}function Ed(e,t,n){return pr(e+t*(n?10:1))}function hr(e){const t=vt(e);if(t===0)return"0 ms";const n=Math.abs(t),a=Number.isInteger(n)?String(n):n.toFixed(1);return`${t<0?"−":"+"}${a} ms`}function kb(e,t){return Math.round(e/1e3*t)}function xb(e,t,n){const a=kb(t,n);return a===0?e:e.map(i=>{const r=new Float32Array(i.length);return a<0?r.set(i.subarray(Math.min(i.length,-a)),0):a<i.length&&r.set(i.subarray(0,i.length-a),a),r})}function $b(e,t){if(e.source!=="mic"||t.roundTripMs===null||e.timingNoteOff)return null;const n=vt(t.roundTripMs+t.nudgeMs),a=e.tripMs===void 0||e.tripEstimate===!0,i=vt(e.tripMs??t.estimateMs),r=e.shiftMs??0,s=vt(n-(i-r));return Math.abs(s)<=wb?null:{usedMs:i,estimate:a,nowMs:n,lateMs:s,matchMs:pr(r-s)}}const Ab={mic:"Mic",master:"Master",file:"File",computer:"Computer"};function Md(e){return mr(e)==="computer"?"unknown":null}const fr=40;function mr(e){return e.source??(e.name===`Master ${e.id}`?"master":"mic")}function qe(e){return e.snap??hb}function Eb(e,t){e.source??=mr(e);const n=t.replace(/\s+/g," ").trim().slice(0,fr);return!n||n===`Take ${e.id}`?e.name=void 0:e.name=n,e.name}const pn={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1,source:"mic",input:null,countIn:ad,cue:id,click:!0,lupa:cb};function $e(e){return e.name??`Take ${e.id}`}const sl=new Set([1,2,4,8]);function na(e){const t=e&&typeof e=="object"?e:{},n=(l,c,d)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=d?l:null,a=Array.isArray(t.takes)?t.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},d=n(c.id,1,1e9),u=n(c.bars,1,8),p=n(c.bpm,20,300),f=n(c.sampleRate,8e3,192e3),m=n(c.channels,1,2),g=n(c.frames,0,1e9);if(d===null||u===null||!sl.has(u)||p===null||f===null||m===null||g===null)return[];if(c.saved!==!0)return[];const y=typeof c.name=="string"&&c.name.trim()?c.name.trim().slice(0,fr):void 0,h={id:d,bars:u,bpm:p,sampleRate:f,channels:m,frames:g,created:String(c.created??""),saved:!0,...y?{name:y}:{}};(c.source==="mic"||c.source==="master"||c.source==="file"||c.source==="computer")&&(h.source=c.source);const b=mb(h,c.region);b&&(h.region=b),typeof c.snap=="string"&&Nt.includes(c.snap)&&(h.snap=c.snap);const x=Hg(c.normalize);x&&(h.normalize=x);const v=n(c.shiftMs,-wn,wn);v&&(h.shiftMs=v);const S=n(c.fromVoice,1,1e9);S!==null&&(h.fromVoice=Math.floor(S));const $=n(c.tripMs,0,2e3);return $!==null&&(h.tripMs=$),c.tripEstimate===!0&&(h.tripEstimate=!0),c.timingNoteOff===!0&&(h.timingNoteOff=!0),[h]}):[],i=n(t.bars,1,8),r=n(t.selected,1,1e9),s=Math.max(n(t.nextId,1,1e9)??1,...a.map(l=>l.id+1));return{bars:i!==null&&sl.has(i)?i:pn.bars,monitor:typeof t.monitor=="boolean"?t.monitor:pn.monitor,roundTripMs:n(t.roundTripMs,0,1e3),nudgeMs:n(t.nudgeMs,-10,10)??0,takes:a,selected:r!==null&&a.some(l=>l.id===r)?r:a.at(-1)?.id??null,nextId:s,master:n(t.master,0,1)??pn.master,source:t.source==="master"||t.source==="computer"?t.source:"mic",input:Mb(t.input),countIn:dg(t.countIn),cue:ug(t.cue),click:t.click!==!1,lupa:Ka(t.lupa),...t.fx&&typeof t.fx=="object"?{fx:t.fx}:{}}}function Mb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const t=e,n=typeof t.id=="string"?t.id.slice(0,200):"",a=typeof t.label=="string"?t.label.replace(/\s+/g," ").trim().slice(0,80):"";return n&&n!=="default"?{id:n,label:a||"Input"}:null}function Sb(e,t=li()){try{const n=t?.getItem(e);return n?na(JSON.parse(n)):{...pn,takes:[],lupa:Ka(null)}}catch{return{...pn,takes:[],lupa:Ka(null)}}}const Sd="lucy.calibration.v1",Lo=e=>e.roundTripMs!==null||e.nudgeMs!==0;function Tb(e,t=li()){try{const n=t?.getItem(Sd),a=n?na(JSON.parse(n)):null;a&&Lo(a)?(e.roundTripMs=a.roundTripMs,e.nudgeMs=a.nudgeMs):Lo(e)&&Td(e,t)}catch{}return e}function Td(e,t=li()){if(Lo(e))try{t?.setItem(Sd,JSON.stringify({roundTripMs:e.roundTripMs,nudgeMs:e.nudgeMs}))}catch{}}function Lb(e,t){const n=`${t}-take-`;let a=0;for(const i of e){if(!i.startsWith(n))continue;const r=/^([1-9][0-9]{0,8})\.f32$/.exec(i.slice(n.length));r&&(a=Math.max(a,Number(r[1])))}return a}function Cb(e,t,n=li()){try{n?.setItem(e,JSON.stringify(t))}catch{}}function li(){try{return globalThis.localStorage??null}catch{return null}}function Nb(e,t){return(e??"").replace(/\s+/g," ").trim().slice(0,60)||$e(t)}function Fb(e,t){const n=Xe(e),a=yb(e,n);return{name:$e(e),sampleRate:e.sampleRate,channels:Ad(t,n),...a!==void 0?{bars:a}:{},bpm:e.bpm,...Md(e)?{rights:"unknown"}:{}}}class zb{constructor(t,n){this.state=t,this.removeFile=n}pending=new Map;delete(t){const n=this.state.takes.findIndex(i=>i.id===t),a=this.state.takes[n];return a?(this.pending.set(t,{meta:a,index:n,selected:this.state.selected===t}),this.state.takes.splice(n,1),this.state.selected===t&&(this.state.selected=null),!0):!1}undo(t){const n=this.pending.get(t);return n?(this.pending.delete(t),this.state.takes.some(a=>a.id===t)||this.state.takes.splice(Math.min(n.index,this.state.takes.length),0,n.meta),n.selected&&(this.state.selected=t),n.meta):null}async settle(t){this.pending.delete(t)&&await this.removeFile(t)}get held(){return[...this.pending.keys()]}}function Zt(e,t){return`${e}-take-${t}.f32`}function Db(e){return e.channels*e.frames*4}class Ld{constructor(t){this.prefix=t}memory=new Map;dir=null;ready=Promise.resolve();adopt(t,n){return t===this.prefix||!n.length?this.ready:(this.ready=(async()=>{const a=await this.folder();if(a)for(const i of n){try{await a.getFileHandle(Zt(this.prefix,i));continue}catch{}try{const r=await(await a.getFileHandle(Zt(t,i))).getFile(),l=await(await a.getFileHandle(Zt(this.prefix,i),{create:!0})).createWritable?.();if(!l)continue;await l.write(await r.arrayBuffer()),await l.close()}catch{}}})(),this.ready)}async highestOnDisk(){await this.ready;const t=await this.folder();if(!t)return 0;try{const n=[];for await(const a of t.keys())n.push(a);return Lb(n,this.prefix)}catch{return 0}}folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(t,n){this.memory.set(t,n),await this.ready;const a=await this.folder();if(!a)return!1;try{const r=await(await a.getFileHandle(Zt(this.prefix,t),{create:!0})).createWritable?.();if(!r)return!1;for(const s of n)await r.write(s);return await r.close(),!0}catch{return!1}}async load(t){const n=this.memory.get(t.id);if(n)return n.length===t.channels&&n.every(i=>i.length===t.frames)?n:null;await this.ready;const a=await this.folder();if(!a)return null;try{const i=await(await a.getFileHandle(Zt(this.prefix,t.id))).getFile();if(i.size!==Db(t))return null;const r=new Float32Array(await i.arrayBuffer()),s=Array.from({length:t.channels},(l,c)=>r.slice(c*t.frames,(c+1)*t.frames));return this.memory.set(t.id,s),s}catch{return null}}async remove(t){this.memory.delete(t),await this.ready;const n=await this.folder();try{await n?.removeEntry(Zt(this.prefix,t))}catch{}}}function Bb(e,t){const n=e[0]?.length??0,a=e.length,i=n*a*4,r=new DataView(new ArrayBuffer(44+i)),s=(c,d)=>{for(let u=0;u<d.length;u++)r.setUint8(c+u,d.charCodeAt(u))};s(0,"RIFF"),r.setUint32(4,36+i,!0),s(8,"WAVE"),s(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,3,!0),r.setUint16(22,a,!0),r.setUint32(24,t,!0),r.setUint32(28,t*a*4,!0),r.setUint16(32,a*4,!0),r.setUint16(34,32,!0),s(36,"data"),r.setUint32(40,i,!0);let l=44;for(let c=0;c<n;c++)for(let d=0;d<a;d++)r.setFloat32(l,e[d]?.[c]??0,!0),l+=4;return new Uint8Array(r.buffer)}const gr="netcomposer.lucy",Ya=1;function Rb(e){const{roundTripMs:t,nudgeMs:n,...a}=na(JSON.parse(JSON.stringify(e)));return{format:gr,v:Ya,...a,fx:lr(a.fx)}}function qb(e,t){const n=Ib(t);return{...n,roundTripMs:e.roundTripMs,nudgeMs:e.nudgeMs,nextId:Math.max(n.nextId,e.nextId)}}function Ib(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a LUCY preset: expected an object.");const t=e;if(t.format!==void 0&&t.format!==gr)throw new Error(`Not a LUCY preset: format ${String(t.format)}.`);if(t.v!==void 0){if(typeof t.v!="number"||!Number.isInteger(t.v)||t.v<0)throw new Error("Not a LUCY preset: bad version.");if(t.v>Ya)throw new Error(`LUCY preset v${t.v} is newer than this LUCY (v${Ya}).`)}if(!Array.isArray(t.takes)||typeof t.bars!="number")throw new Error("Not a LUCY preset: no takes or length.");const n=na(t);return{...n,fx:lr(n.fx)}}function Pb(e){return e.replace(/[\\/]/g,"~")}function Ob(e,t=Zn()){const n=Os("lucy.state",t),a=Os("lucy",t),i=typeof e?.storageKey=="function"?e.storageKey.bind(e):null;return i?{state:i("lucy.state"),files:Pb(i("lucy")),legacyState:n,legacyFiles:a}:{state:n,files:a,legacyState:n,legacyFiles:a}}function _b(e,t,n=!0){if(!n||!t||e.state===e.legacyState)return null;try{if(t.getItem(e.state)!==null)return null;const a=t.getItem(e.legacyState);let i={...pn,takes:[],lupa:Ka(null)};if(a)try{i=na(JSON.parse(a))}catch{}return t.setItem(e.state,JSON.stringify(i)),a?i.takes.map(r=>r.id):null}catch{return null}}const _n="http://www.w3.org/2000/svg";function jb(e){const t=i=>`${Number.isInteger(i)?i:i.toFixed(1)} ms`,n=e.estimate?`the ${t(e.usedMs)} estimate`:t(e.usedMs),a=Math.abs(e.lateMs);return`Recorded with ${n}; this setup measures ${t(e.nowMs)}. It plays ${t(a)} ${e.lateMs>0?"late":"early"}.`}function N(e,t,n={},...a){const i=document.createElement(e);t&&(i.className=t);for(const[r,s]of Object.entries(n))i.setAttribute(r,s);return i.append(...a),i}function se(e,t){e.textContent!==t&&(e.textContent=t)}function ye(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function en(e,t,n){ye(e,`data-${t}`,n?"true":null)}function ll(){const e=document.createElementNS(_n,"svg");e.setAttribute("class","lucy-wave-svg"),e.setAttribute("viewBox",`0 -1 ${ri} 2`),e.setAttribute("preserveAspectRatio","none"),e.setAttribute("aria-hidden","true");const t=r=>{const s=document.createElementNS(_n,"path");return s.setAttribute("class",r),e.append(s),s},n=t("lucy-wave-beats"),a=t("lucy-wave-bars"),i=t("lucy-wave-env");return{svg:e,beats:n,bars:a,env:i}}function Hb(){const e=document.createElementNS(_n,"svg");e.setAttribute("class","lucy-take-play-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");const t=document.createElementNS(_n,"path");t.setAttribute("class","lucy-icon-play"),t.setAttribute("d","M7 5 L19 12 L7 19 Z");const n=document.createElementNS(_n,"path");return n.setAttribute("class","lucy-icon-stop"),n.setAttribute("d","M6 6 H18 V18 H6 Z"),e.append(t,n),e}function Ii(e){return e.map(t=>`M${Math.round(t*ri*100)/100} -1V1`).join("")}class Wb{constructor(t){this.on=t,this.el=N("div","lucy-takes"),this.list=N("div","lucy-take-list",{role:"list"}),this.emptyLine=N("p","lucy-takes-empty"),q("takes:empty",this.emptyLine),this.el.append(this.emptyLine,this.list),document.addEventListener("pointerdown",n=>{this.openMenu&&!this.openMenu.root.querySelector(".lucy-take-more-wrap")?.contains(n.target)&&this.closeMenu()})}el;list;emptyLine;cards=new Map;live=null;openMenu=null;render(t){this.renderLive(t.live);const n=!t.takes.length&&!t.live;if(this.emptyLine.hidden=!n,n){se(this.emptyLine,""),this.emptyLine.firstChild||this.emptyLine.append(N("span","lucy-takes-empty-line",{},"No takes yet. Record or load a WAV."),N("span","lucy-takes-empty-hint"));const r=this.emptyLine.querySelector(".lucy-takes-empty-hint");r&&se(r,t.hint)}const a=new Set;let i=this.live?.root??null;for(const r of t.takes){a.add(r.id);let s=this.cards.get(r.id);s||(s=this.create(r),this.cards.set(r.id,s)),this.update(s,r,t),(i?i.nextElementSibling:this.list.firstElementChild)!==s.root&&(i?i.after(s.root):this.list.prepend(s.root)),i=s.root}for(const[r,s]of this.cards)a.has(r)||(this.openMenu===s&&(this.openMenu=null),s.root.remove(),this.cards.delete(r))}setPlayhead(t,n){for(const a of this.cards.values()){const i=a.id===t&&n>=0;if(i){const r=n.toFixed(4);a.wave.style.getPropertyValue("--lucy-at")!==r&&a.wave.style.setProperty("--lucy-at",r)}en(a.wave,"head",i)}}card(t){return this.cards.get(t)?.root}renderLive(t){if(!t){this.live?.root.remove(),this.live=null;return}if(!this.live){const r=N("span","lucy-take-live-label",{"aria-live":"polite"}),s=N("button","nc-page-action lucy-take-action",{type:"button"},"Cancel");s.addEventListener("click",()=>this.on.cancelRecording()),q("take:cancel",s,s);const{svg:l,bars:c,env:d}=ll(),u=N("span","lucy-take-count",{"aria-hidden":"true",hidden:""}),p=N("div","lucy-take-wave",{"data-live":"true"},l,u),f=N("span","lucy-take-name lucy-take-name-live",{},"New take"),m=N("article","lucy-take",{"data-live":"true",role:"listitem","aria-label":"Recording"},N("div","lucy-take-hd",{},f,r,N("div","lucy-take-actions",{},s)),p);q("take:recording",r),this.list.prepend(m),this.live={root:m,label:r,count:u,env:d,bars:c,drawn:""}}se(this.live.label,t.label);const n=t.count??null;this.live.count.hidden=n===null,se(this.live.count,n===null?"":String(n));const a=t.bars.join(",");this.live.bars.dataset.key!==a&&(this.live.bars.dataset.key=a,this.live.bars.setAttribute("d",Ii(t.bars)));const i=t.peaks?`${t.filled}`:"";i!==this.live.drawn&&(this.live.drawn=i,this.live.env.setAttribute("d",t.peaks?js(t.peaks,t.filled):"")),this.list.firstElementChild!==this.live.root&&this.list.prepend(this.live.root)}create(t){const n=t.id,a=N("h3","lucy-take-name",{tabindex:"0"}),i=N("span","lucy-take-region nc-readout"),r=(z,J)=>{const ze=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":J},z);return q(`take:${J}`,ze,ze),ze},s=N("button","lucy-take-play",{type:"button","data-take-action":"play","aria-label":"Play","aria-pressed":"false"},Hb());q("take:play",s,s);const l=N("span","lucy-take-source");q("take:source",l);const c=N("span","lucy-take-source lucy-take-rights");q("take:rights",c);const d=r("Send to Sampler","send"),u=N("button","nc-page-action lucy-take-action lucy-take-more",{type:"button","aria-haspopup":"menu","aria-expanded":"false","aria-label":"More actions","data-take-action":"more"},"⋯");q("take:more",u,u);const p=N("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"download"},"Download WAV"),f=N("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"delete"},"Delete");q("take:download",p,p),q("take:delete",f,f);const m=N("div","lucy-take-menu",{role:"menu"},p,f);m.hidden=!0;const g=N("div","lucy-take-actions",{},d,N("span","lucy-take-more-wrap",{},u,m)),{svg:y,env:h}=ll(),b=z=>{const J=N("div","lucy-take-marker",{role:"slider",tabindex:"0","data-marker":z,"aria-orientation":"horizontal"});return q(`take:${z}`,J,J),J},x={start:b("start"),end:b("end")},v=N("span","lucy-take-wave-empty"),S=N("div","lucy-take-barnums",{"aria-hidden":"true"}),$=N("div","lucy-take-wave",{role:"group"},S,y,N("div","lucy-take-dim",{"data-side":"start"}),N("div","lucy-take-dim",{"data-side":"end"}),N("div","lucy-take-playhead",{"aria-hidden":"true"},N("span","lucy-take-playhead-line")),x.start,x.end,v);$.style.setProperty("--lucy-at","-1"),$.tabIndex=0,$.dataset.lucyEdit="",q("take:wave",$);const k=z=>{const J=N("span","lucy-take-fact",{"data-fact":z});return q(`take:fact:${z}`,J),J},w={bars:k("bars"),secs:k("secs"),bpm:k("bpm"),chans:k("chans"),rate:k("rate"),when:k("when")},E=N("span","lucy-take-snap-label",{id:`lucy-snap-${n}`},"Snap"),M=N("span","nc-choice-row lucy-take-snap",{role:"radiogroup","aria-labelledby":`lucy-snap-${n}`});for(const z of Nt){const J=N("button","nc-choice lucy-take-snap-opt",{type:"button",role:"radio","data-snap":z,"aria-checked":"false",tabindex:"-1"},So[z]);J.addEventListener("click",()=>this.on.setSnap(n,z)),M.append(J)}M.addEventListener("keydown",z=>{const J=z.key==="ArrowRight"||z.key==="ArrowDown"?1:z.key==="ArrowLeft"||z.key==="ArrowUp"?-1:0;if(!J)return;z.preventDefault();const ze=Nt.indexOf(qe(Te.meta)),Qe=Nt[(ze+J+Nt.length)%Nt.length]??"beat";this.on.setSnap(n,Qe),M.querySelector(`[data-snap="${Qe}"]`)?.focus()}),q("take:snap",E,M);const C=N("span","lucy-take-snap-label",{id:`lucy-norm-${n}`},"Normalize"),R=Uo({checked:t.normalize?.on===!0,labelledBy:`lucy-norm-${n}`,onChange:z=>this.on.setNormalize(n,z)});R.el.classList.add("lucy-take-norm");const B=N("span","lucy-take-norm-gain");q("take:normalize",C,R.el),q("take:normalize-gain",B);const O=N("span","lucy-take-snap-label",{id:`lucy-timing-${n}`},"Timing"),U=z=>{const J=N("button","lucy-take-timing-step",{type:"button","aria-label":z<0?"Earlier":"Later","aria-describedby":`lucy-timing-${n}`},z<0?"◀":"▶");return J.addEventListener("click",ze=>this.on.setShift(n,Ed(Te.meta.shiftMs??0,z,ze.shiftKey))),J},re=U(-1),Q=U(1),ve=N("span","lucy-take-timing-value",{"aria-live":"polite"},"0 ms");ve.addEventListener("dblclick",()=>this.on.setShift(n,0)),q("take:timing",O,re,Q,ve);const I=N("span","lucy-take-timing-text"),Vt=N("button","lucy-take-timing-match",{type:"button"},"Match calibration");Vt.addEventListener("click",()=>this.on.matchTiming(n));const An=N("button","lucy-take-timing-quiet",{type:"button"},"Not now");An.addEventListener("click",()=>this.on.dismissTiming(n));const Gt=N("button","lucy-take-timing-quiet",{type:"button"},"Undo");Gt.addEventListener("click",()=>this.on.undoTiming(n));const Kt=N("div","lucy-take-timing-note",{role:"status"},I,N("span","lucy-take-timing-actions",{},Vt,An,Gt));Kt.hidden=!0;const ru=N("div","lucy-take-facts nc-readout",{},...Object.values(w),N("span","lucy-take-norm-wrap",{},C,R.el,B),N("span","lucy-take-timing",{},O,re,ve,Q),N("span","lucy-take-snap-wrap",{},E,M)),pi=N("div","lucy-take-picker");pi.hidden=!0;const hi=N("p","lucy-take-note",{"aria-live":"polite"});hi.hidden=!0;const fi=N("article","lucy-take",{role:"listitem","data-take":String(n)},N("div","lucy-take-hd",{},s,N("div","lucy-take-title",{},a,l,c,i),g),$,ru,Kt,pi,hi);q("take:card",null,fi),q("take:name",a),q("take:region",i);const Te={id:n,root:fi,name:a,region:i,play:s,sourcePill:l,rightsPill:c,barNums:S,send:d,more:u,menu:m,download:p,remove:f,wave:$,env:h,empty:v,markers:x,facts:w,snap:M,normalize:R,normGain:B,timing:{earlier:re,value:ve,later:Q},timingNote:{root:Kt,text:I,match:Vt,notNow:An,undo:Gt},picker:pi,note:hi,drawn:"none",gridKey:"",meta:t,draft:null,editing:!1};fi.addEventListener("click",z=>{z.target.closest("button, select, input, label, [role=slider], .lucy-take-picker")||this.on.select(n)}),s.addEventListener("click",()=>this.on.play(n)),s.addEventListener("pointerdown",()=>this.on.preload?.(n));let mi=null;$.addEventListener("pointerdown",z=>{mi=z.target.closest(".lucy-take-marker")?null:{x:z.clientX,y:z.clientY}}),$.addEventListener("click",z=>{const J=mi;mi=null,!(!J||!this.on.openEditor||!Te.meta.frames)&&(Math.hypot(z.clientX-J.x,z.clientY-J.y)>4||this.on.openEditor(n))}),$.addEventListener("keydown",z=>{z.target!==$||z.key!=="Enter"&&z.key!==" "||(z.preventDefault(),this.on.openEditor?.(n))}),d.addEventListener("click",()=>this.on.openSend(n)),u.addEventListener("click",()=>this.openMenu===Te?this.closeMenu():this.showMenu(Te)),m.addEventListener("keydown",z=>{z.key==="Escape"&&(this.closeMenu(),u.focus())}),p.addEventListener("click",()=>{this.closeMenu(),this.on.download(n)}),f.addEventListener("click",()=>{this.closeMenu(),this.on.remove(n)});const Br=()=>{if(Te.editing)return;Te.editing=!0;const z=N("input","lucy-take-rename",{type:"text",maxlength:"40","aria-label":`Rename ${$e(Te.meta)}`,value:$e(Te.meta)});a.replaceWith(z),z.focus(),z.select();let J=!1;const ze=Qe=>{J||(J=!0,Te.editing=!1,z.replaceWith(a),Qe&&this.on.rename(n,z.value),a.focus())};z.addEventListener("keydown",Qe=>{Qe.key==="Enter"?(Qe.preventDefault(),ze(!0)):Qe.key==="Escape"&&(Qe.preventDefault(),ze(!1))}),z.addEventListener("blur",()=>ze(!0))};a.addEventListener("dblclick",Br),a.addEventListener("keydown",z=>{(z.key==="Enter"||z.key==="F2")&&(z.preventDefault(),Br())});for(const z of["start","end"])this.bindMarker(Te,z);return Te}showMenu(t){this.closeMenu(),this.openMenu=t,t.menu.hidden=!1,t.more.setAttribute("aria-expanded","true"),t.menu.querySelector("button:not(:disabled)")?.focus()}closeMenu(){const t=this.openMenu;t&&(this.openMenu=null,t.menu.hidden=!0,t.more.setAttribute("aria-expanded","false"))}bindMarker(t,n){const a=t.markers[n],i=()=>({...t.meta,region:t.draft??t.meta.region}),r=l=>{const c=t.wave.getBoundingClientRect();return(l-c.left)/Math.max(1,c.width)*t.meta.frames},s=(l,c)=>{t.draft=c?null:l,this.paintRegion(t,l),this.on.setRegion(t.id,l,c)};a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.preventDefault(),a.setPointerCapture(l.pointerId),a.focus(),t.root.dataset.dragging="true";let c=null;const d=p=>{const f=i(),m=r(p.clientX),g=p.altKey?m:xd(f,m,qe(f));c=sn(f,n,g),s(c,!1)},u=p=>{a.removeEventListener("pointermove",d),a.removeEventListener("pointerup",u),a.removeEventListener("pointercancel",u),t.root.removeAttribute("data-dragging");try{a.releasePointerCapture(p.pointerId)}catch{}c&&s(c,!0)};a.addEventListener("pointermove",d),a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u)}),a.addEventListener("dblclick",()=>{const l=i();s(sn(l,n,n==="start"?0:l.frames),!0)}),a.addEventListener("keydown",l=>{const c=i();let d=null;l.key==="ArrowLeft"||l.key==="ArrowDown"?d=To(c,n,-1,qe(c),l.shiftKey):l.key==="ArrowRight"||l.key==="ArrowUp"?d=To(c,n,1,qe(c),l.shiftKey):l.key==="Home"?d=sn(c,n,0):l.key==="End"&&(d=sn(c,n,c.frames)),d&&(l.preventDefault(),s(d,!0))})}paintRegion(t,n){const a={...t.meta,region:n},i=Math.max(1,a.frames);t.wave.style.setProperty("--lucy-start",(n.start/i).toFixed(5)),t.wave.style.setProperty("--lucy-end",(n.end/i).toFixed(5)),se(t.region,gb(a,n).replace(/(?<![·→]) (?![·→])/g," "));const r=s=>(s/a.sampleRate).toFixed(2);for(const s of["start","end"]){const l=t.markers[s],c=n[s];ye(l,"aria-label",`${s==="start"?"Start":"End"} of ${$e(a)}`),ye(l,"aria-valuemin","0"),ye(l,"aria-valuemax",r(a.frames)),ye(l,"aria-valuenow",r(c)),ye(l,"aria-valuetext",bb(a,s,c))}}update(t,n,a){t.meta=n;const i=n.id,r=$e(n);t.editing||se(t.name,r),ye(t.root,"aria-label",r);const s=a.selected===i,l=a.playing===i;en(t.root,"selected",s),en(t.root,"playing",l),ye(t.root,"aria-current",s?"true":null),ye(t.play,"aria-label",`${l?"Stop":"Play"} ${r}`),ye(t.play,"aria-pressed",l?"true":"false");const c=a.peaks(i),d=c===null;en(t.root,"missing",d),en(t.root,"loading",c===void 0),t.drawn!==c&&(t.drawn=c,t.env.setAttribute("d",c?js(c):"")),se(t.empty,d?"Not in this browser":""),ye(t.wave,"aria-label",d?`${r}: audio not in this browser`:`${r}: waveform`);const u=`${n.bpm}:${n.sampleRate}:${n.frames}`;if(t.gridKey!==u){t.gridKey=u;const x=vb(n),v=t.wave.querySelector(".lucy-wave-beats"),S=t.wave.querySelector(".lucy-wave-bars");v?.setAttribute("d",Ii(x.beats)),S?.setAttribute("d",Ii(x.bars)),t.barNums.replaceChildren(...[0,...x.bars].map(($,k)=>{const w=N("span","lucy-take-barnum",{},String(k+1));return w.style.setProperty("--lucy-x",$.toFixed(5)),w}))}for(const x of Object.values(t.markers))x.hidden=d;t.draft||this.paintRegion(t,Xe(n));const p=n.frames/n.sampleRate;se(t.sourcePill,Ab[mr(n)]),se(t.rightsPill,Md(n)?"Unknown rights":""),se(t.facts.bars,`${n.bars} bar${n.bars===1?"":"s"}`),se(t.facts.secs,`${p.toFixed(1)} s`),se(t.facts.bpm,`${Math.round(n.bpm*10)/10} BPM`),se(t.facts.chans,n.channels===2?"Stereo":"Mono"),se(t.facts.rate,`${Math.round(n.sampleRate/100)/10} kHz`),se(t.facts.when,Wg(n.created,a.now)),ye(t.facts.when,"title",Ug(n.created)||null);const f=qe(n);for(const x of t.snap.querySelectorAll("[data-snap]")){const v=x.dataset.snap===f;ye(x,"aria-checked",v?"true":"false"),ye(x,"tabindex",v?"0":"-1"),x.disabled=d}const m=n.normalize;t.normalize.checked!==(m?.on===!0)&&t.normalize.set(m?.on===!0),t.normalize.el.disabled=d,se(t.normGain,m?.on?dd(m.gainDb):""),en(t.root,"normalized",m?.on===!0);const g=n.shiftMs??0;se(t.timing.value,hr(g)),ye(t.timing.value,"data-moved",g?"":null),ye(t.timing.value,"title",g?"Double-click: back to 0 ms":null),t.timing.earlier.disabled=d||g<=-wn,t.timing.later.disabled=d||g>=wn;const y=a.timingDone?.take===i?a.timingDone.text:"",h=y?null:a.timing(n);t.timingNote.root.hidden=!y&&!h,t.timingNote.match.hidden=!h,t.timingNote.notNow.hidden=!h,t.timingNote.undo.hidden=!y,se(t.timingNote.text,y||(h?jb(h):"")),t.send.hidden=!a.canSend,se(t.send,`Send to ${a.sendName}`),t.send.disabled=d,t.download.disabled=d,t.play.disabled=d,this.renderPicker(t,a);const b=a.sendNote?.take===i?a.sendNote.text:"";t.note.hidden=!b,se(t.note,b)}renderPicker(t,n){const a=n.picker?.take===t.id&&n.canSend?n.picker:null;if(t.picker.hidden=!a,t.send.hidden=t.send.hidden||!!a,!a){t.picker.firstChild&&t.picker.replaceChildren();return}const i=a.receivers.find(u=>u.instance===a.to)??a.receivers[0],r=JSON.stringify([a.receivers.map(u=>[u.instance,u.targets.map(p=>p.id)]),a.to]);if(t.picker.dataset.key!==r){t.picker.dataset.key=r,t.picker.replaceChildren();const u=(h,b,x,v,S)=>{const $=`lucy-${h}-${t.id}`,k=N("select","nc-select lucy-take-pick",{id:$,"data-pick":h});for(const E of v)k.append(N("option","",{value:E.value},E.label));k.addEventListener("change",()=>S(k.value));const w=N("label","lucy-take-snap-label",{for:$},b);q(x,w,k),t.picker.append(N("span","lucy-take-pick-wrap",{},w,k))};a.receivers.length>1&&u("send-to","Sampler","send-to",a.receivers.map(h=>({value:h.instance,label:h.name})),h=>this.on.pickTo(h)),u("send-pad",i?.label??"Pad","send-pad",(i?.targets??[]).map(h=>({value:h.id,label:h.name})),h=>this.on.pickTarget(h));const p=`lucy-send-name-${t.id}`,f=N("input","lucy-take-pick-name",{id:p,type:"text","data-pick":"send-name",placeholder:a.defaultName,maxlength:"60",autocomplete:"off",spellcheck:"false"});f.addEventListener("input",()=>this.on.pickName(f.value)),f.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),this.on.send()):h.key==="Escape"&&(h.preventDefault(),this.on.cancelSend())});const m=N("label","lucy-take-snap-label",{for:p},"Name");q("send-name",m,f),t.picker.append(N("span","lucy-take-pick-wrap",{},m,f));const g=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-go"},"Send");g.addEventListener("click",()=>this.on.send()),q("send-go",g,g);const y=N("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-cancel"},"Cancel");y.addEventListener("click",()=>this.on.cancelSend()),q("send-cancel",y,y),t.picker.append(g,y)}const s=t.picker.querySelector('[data-pick="send-to"]');s&&s.value!==a.to&&(s.value=a.to);const l=t.picker.querySelector('[data-pick="send-pad"]');l&&l.value!==a.target&&(l.value=a.target);const c=t.picker.querySelector('[data-pick="send-name"]');c&&(c.value!==a.name&&document.activeElement!==c&&(c.value=a.name),c.placeholder=a.defaultName,c.disabled=a.sending);const d=t.picker.querySelector('[data-take-action="send-go"]');d&&(se(d,a.sending?"Sending…":"Send"),d.disabled=a.sending)}}function _(e,t={},...n){const a=document.createElement(e);for(const[i,r]of Object.entries(t))a.setAttribute(i,r);return a.append(...n),a}const tn=(e,t)=>q(t,e),ht=(e,t,n)=>e<t?t:e>n?n:e,Ft=[1,2,4,8,16,32,64,128],ba=Ft[Ft.length-1],Ub=e=>`${e%1?e.toFixed(1):e}×`,ya=9;class Vb{constructor(t){this.host=t,this.wave=_("canvas",{class:"lucy-ted-wave","aria-hidden":"true"}),this.live=_("canvas",{class:"lucy-ted-live","aria-hidden":"true"}),this.labels=_("div",{class:"lucy-ted-labels","aria-hidden":"true"}),this.startTag=_("button",{type:"button",class:"lucy-ted-tag","data-lucy-ted":"start","aria-label":"Start"},"Start"),this.endTag=_("button",{type:"button",class:"lucy-ted-tag","data-lucy-ted":"end","aria-label":"End"},"End"),tn(this.startTag,"editor:start"),tn(this.endTag,"editor:end"),this.hint=_("span",{class:"lucy-ted-hint","data-lucy-ted":"hint"},""),this.stage=_("div",{class:"lucy-ted-stage","data-lucy-ted":"stage",role:"group","aria-label":"Waveform"},this.wave,this.live,this.labels,this.startTag,this.endTag,this.hint),this.over=_("canvas",{class:"lucy-ted-over","aria-hidden":"true"}),this.frame=_("div",{class:"lucy-ted-frame","data-lucy-ted":"frame"});const n=_("div",{class:"lucy-ted-strip","data-lucy-ted":"strip"},this.over,this.frame);tn(n,"editor:overview"),this.zoomRow=_("div",{class:"lucy-ted-zoom",role:"group","aria-label":"Zoom"}),this.head=_("div",{class:"lucy-ted-head"}),this.controls=_("div",{class:"lucy-ted-ctl"}),this.foot=_("div",{class:"lucy-ted-foot"}),this.dialog=_("div",{class:"lucy-ted",role:"dialog","aria-modal":"true","aria-label":"Take","data-lucy-ted":"dialog",tabindex:"-1"},this.head,this.stage,_("div",{class:"lucy-ted-ov"},n,this.zoomRow),this.controls,this.foot),this.el=_("div",{class:"lucy-ted-scrim","data-lucy-ted":"scrim",hidden:""},this.dialog),this.el.addEventListener("pointerdown",a=>{a.target===this.el&&this.host.close()}),this.el.addEventListener("wheel",a=>{if(a.defaultPrevented)return;const i=this.dialog,r=i.contains(a.target),s=a.deltaY<0?i.scrollTop>0:i.scrollTop+i.clientHeight<i.scrollHeight-1;(!r||!s)&&a.preventDefault()},{passive:!1}),this.dialog.addEventListener("keydown",a=>this.key(a)),document.addEventListener("keydown",a=>{!this.isOpen||a.key!=="Escape"||this.dialog.contains(a.target)||(a.preventDefault(),a.stopPropagation(),this.host.close())},!0),this.wireStage(),this.wireStrip(n),this.wireTag(this.startTag,"start"),this.wireTag(this.endTag,"end"),typeof ResizeObserver<"u"&&new ResizeObserver(()=>{this.waveKey="",this.paint()}).observe(this.stage)}el;isOpen=!1;dialog;stage;wave;live;over;frame;startTag;endTag;labels;head;zoomRow;hint;controls;foot;zoom=1;view=0;drag=null;dragging=null;touches=new Map;raf=0;waveKey="";controlsKey="";colours=null;lastFocus=null;open(){if(!this.host.take())return!1;this.lastFocus=document.activeElement,this.isOpen=!0,this.el.hidden=!1,this.zoom=1,this.view=0,this.waveKey="",this.controlsKey="",this.colours=null,this.drag=null,this.dragging=null,this.refresh(),document.documentElement.dataset.lucyTedOpen="",this.dialog.focus({preventScroll:!0}),this.intoView();const t=()=>{this.isOpen&&(this.paintLive(),this.raf=requestAnimationFrame(t))};return this.raf=requestAnimationFrame(t),!0}close(){this.isOpen&&(this.isOpen=!1,this.el.hidden=!0,delete document.documentElement.dataset.lucyTedOpen,cancelAnimationFrame(this.raf),this.lastFocus instanceof HTMLElement&&this.lastFocus.focus({preventScroll:!0}))}intoView(){const t=document.documentElement;if(!t.hasAttribute("data-nc-hosted"))return;const n=Number.parseFloat(getComputedStyle(t).getPropertyValue("--nc-host-height"));if(!Number.isFinite(n))return;let a=0;try{a=window.parent?.innerHeight??0}catch{a=0}const i=Number.parseFloat(getComputedStyle(this.el).paddingTop)*2||0,r=Math.min(this.dialog.scrollHeight+i,a||Number.POSITIVE_INFINITY);n+1>=r||t.scrollIntoView({block:"start",behavior:"instant"})}refresh(){if(!this.isOpen)return;const t=this.host.take();if(!t){this.host.close();return}this.renderHead(t.meta),this.renderZoom();const n=t.meta,a=JSON.stringify([n.id,qe(n),n.normalize?.on??!1]);a!==this.controlsKey?(this.controlsKey=a,this.renderControls(n),this.renderFoot()):this.updateReadouts(n),this.hint.textContent=qe(n)==="off"?"Drag Start or End anywhere · ⌘-scroll to zoom · ⌥-drag moves the region":`Start and End snap to the ${So[qe(n)].toLowerCase()} · hold ⌘ to place freely · ⌥-drag moves the region`,this.paint()}region(t){return this.dragging??Xe(t)}x(t,n){return(t-this.view)*this.zoom*n}f(t,n){return this.view+t/n/this.zoom}setView(t,n=this.zoom){this.zoom=ht(n,1,ba),this.view=ht(t,0,1-1/this.zoom),this.waveKey="";const a=this.zoomRow.contains(document.activeElement);this.renderZoom(),(a||document.activeElement===document.body)&&this.dialog.focus({preventScroll:!0}),this.paint()}zoomAt(t,n){const a=this.stage.clientWidth||1,i=this.f(n,a),r=ht(this.zoom*t,1,ba);this.setView(i-n/a/r,r)}zoomStep(t){const n=Ft.findIndex(i=>i>=this.zoom-1e-6),a=t>0?Ft[Math.min(Ft.length-1,n+((Ft[n]??1)>this.zoom+1e-6?0:1))]:Ft[Math.max(0,n-1)];this.zoomAt((a??this.zoom)/this.zoom,(this.stage.clientWidth||1)/2)}zoomToRegion(){const t=this.host.take();if(!t)return;const n=this.region(t.meta),a=n.start/t.meta.frames,i=n.end/t.meta.frames,r=Math.max(.002,i-a)*1.25,s=ht(1/r,1,ba);this.setView((a+i)/2-.5/s,s)}wireStage(){const t=this.stage;t.addEventListener("pointerdown",a=>{if(a.target.closest(".lucy-ted-tag"))return;const i=this.host.take();if(!i)return;t.setPointerCapture(a.pointerId),this.touches.set(a.pointerId,a.clientX);const r=t.getBoundingClientRect(),s=r.width||1,l=a.clientX-r.left;if(this.touches.size===2){const[m,g]=[...this.touches.values()];this.drag={kind:"pinch",x0:((m??0)+(g??0))/2-r.left,start0:0,end0:0,view0:this.view,zoom0:this.zoom,dist0:Math.max(10,Math.abs((m??0)-(g??0)))};return}const c=this.region(i.meta),d=i.meta.frames,u=this.x(c.start/d,s),p=this.x(c.end/d,s),f={x0:a.clientX,start0:c.start,end0:c.end,view0:this.view};a.altKey&&l>u&&l<p?this.drag={kind:"move",...f}:Math.abs(l-u)<=ya?this.drag={kind:"start",...f}:Math.abs(l-p)<=ya?this.drag={kind:"end",...f}:this.drag={kind:"pan",...f},t.dataset.dragging=this.drag.kind}),t.addEventListener("pointermove",a=>{this.touches.has(a.pointerId)&&this.touches.set(a.pointerId,a.clientX);const i=this.drag,r=this.host.take();if(!i||!r){this.hover(a);return}const s=t.clientWidth||1;if(i.kind==="pinch"){const[c,d]=[...this.touches.values()],u=Math.max(10,Math.abs((c??0)-(d??0))),p=ht((i.zoom0??1)*(u/(i.dist0??u)),1,ba),f=i.view0+i.x0/s/(i.zoom0??1);this.setView(f-i.x0/s/p,p);return}const l=(a.clientX-i.x0)/s/this.zoom*r.meta.frames;i.kind==="pan"?this.setView(i.view0-(a.clientX-i.x0)/s/this.zoom):i.kind!=="frame"&&this.dragRegion(i.kind,i.start0,i.end0,l,r.meta,a.metaKey||a.ctrlKey)});const n=a=>{this.touches.delete(a.pointerId),this.land(),delete t.dataset.dragging};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("wheel",a=>{const i=t.getBoundingClientRect();if(a.ctrlKey||a.metaKey)a.preventDefault(),this.zoomAt(Math.exp(-a.deltaY*.01),a.clientX-i.left);else if(this.zoom>1&&(Math.abs(a.deltaX)>Math.abs(a.deltaY)||a.shiftKey)){a.preventDefault();const r=a.shiftKey&&!a.deltaX?a.deltaY:a.deltaX;this.setView(this.view+r/(i.width||1)/this.zoom)}},{passive:!1})}land(){const t=this.dragging,n=this.drag?.kind;this.drag=null,this.dragging=null,t&&(n==="start"||n==="end"||n==="move")&&this.host.setRegion(t,!0)}hover(t){const n=this.host.take();if(!n)return;const a=this.stage.getBoundingClientRect(),i=a.width||1,r=t.clientX-a.left,s=this.region(n.meta),l=Math.abs(r-this.x(s.start/n.meta.frames,i))<=ya||Math.abs(r-this.x(s.end/n.meta.frames,i))<=ya;this.stage.dataset.near=l?"true":"false"}dragRegion(t,n,a,i,r,s){const l=s?"off":qe(r),c=u=>xd(r,u,l);let d;if(t==="move"){const u=a-n,p=ht(c(n+i),0,r.frames-u);d={start:Math.round(p),end:Math.round(p+u)}}else{const u={...r,region:{start:n,end:a}};if(d=sn(u,t,c((t==="start"?n:a)+i)),d.end-d.start<ur(r))return}this.dragging=d,this.host.setRegion(d,!1),this.paint(),this.updateReadouts(r)}wireTag(t,n){t.addEventListener("pointerdown",i=>{const r=this.host.take();if(!r)return;i.stopPropagation(),t.setPointerCapture(i.pointerId);const s=this.region(r.meta);this.drag={kind:i.altKey?"move":n,x0:i.clientX,start0:s.start,end0:s.end,view0:this.view},this.stage.dataset.dragging=this.drag.kind}),t.addEventListener("pointermove",i=>{const r=this.drag,s=this.host.take();if(!r||!s||r.kind!==n&&r.kind!=="move")return;const l=this.stage.clientWidth||1;this.dragRegion(r.kind,r.start0,r.end0,(i.clientX-r.x0)/l/this.zoom*s.meta.frames,s.meta,i.metaKey||i.ctrlKey)});const a=()=>{this.land(),delete this.stage.dataset.dragging};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("keydown",i=>{const r=this.host.take();if(!r)return;const s=i.key==="ArrowLeft"?-1:i.key==="ArrowRight"?1:0;s&&(i.preventDefault(),this.host.setRegion(To(r.meta,n,s,qe(r.meta),i.shiftKey),!0))})}wireStrip(t){t.addEventListener("pointerdown",a=>{const i=t.getBoundingClientRect(),r=(a.clientX-i.left)/(i.width||1);t.setPointerCapture(a.pointerId),(r<this.view||r>this.view+1/this.zoom)&&this.setView(r-.5/this.zoom),this.drag={kind:"frame",x0:a.clientX,start0:0,end0:0,view0:this.view}}),t.addEventListener("pointermove",a=>{this.drag?.kind==="frame"&&this.setView(this.drag.view0+(a.clientX-this.drag.x0)/(t.clientWidth||1))});const n=()=>{this.drag?.kind==="frame"&&(this.drag=null)};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}key(t){t.key==="Escape"?(t.preventDefault(),this.host.close()):(t.key==="="||t.key==="+")&&!t.metaKey&&!t.ctrlKey?(t.preventDefault(),this.zoomStep(1)):t.key==="-"&&!t.metaKey&&!t.ctrlKey&&(t.preventDefault(),this.zoomStep(-1)),t.stopPropagation()}renderHead(t){const n=_("button",{type:"button",class:"lucy-ted-x","aria-label":"Close"},"×");n.addEventListener("click",()=>this.host.close());const a=t.frames/t.sampleRate;this.head.replaceChildren(_("span",{class:"lucy-ted-brand"},"LUCY"),_("span",{class:"lucy-ted-take"},`Take ${t.id}`),_("span",{class:"lucy-ted-file","data-lucy-ted":"name"},$e(t)===`Take ${t.id}`?"":$e(t)),_("span",{class:"lucy-ted-meta"},`${t.bars} bar${t.bars===1?"":"s"} · ${a.toFixed(2)} s · ${Math.round(t.bpm)} BPM`),n)}renderZoom(){const t=(n,a,i,r="")=>{const s=_("button",{type:"button",class:`lucy-ted-zb ${r}`,"aria-label":a},n);return s.addEventListener("click",i),s};this.zoomRow.replaceChildren(t("−","Zoom out",()=>this.zoomStep(-1),"lucy-ted-zsign"),_("span",{class:"lucy-ted-zlevel","data-lucy-ted":"zoom"},Ub(this.zoom)),t("+","Zoom in",()=>this.zoomStep(1),"lucy-ted-zsign"),_("i",{class:"lucy-ted-sep"}),t("Fit","Show the whole take",()=>this.setView(0,1)),t("Region","Zoom to the part that plays",()=>this.zoomToRegion()))}renderControls(t){const n=[],a=(p,f,m,g,y)=>{const h=_("span",{class:"lucy-ted-k"},f);tn(h,p),n.push(h,_("div",{class:"lucy-ted-v","data-lucy-ted":y},m),_("div",{class:"lucy-ted-read","data-lucy-ted":`${y}-read`},g))},i=p=>_("div",{class:"lucy-ted-ticks",role:"radiogroup","aria-label":p}),r=(p,f,m,g)=>{const y=_("button",{type:"button",role:"radio",class:"lucy-ted-tick","aria-checked":String(f),"data-value":m},p);return y.addEventListener("click",g),y},s=qe(t),l=i("Snap");for(const p of Nt)l.append(r(So[p],p===s,p,()=>this.host.setSnap(p)));a("editor:snap","Snap",l,this.regionWords(t),"snap");const c=t.normalize?.on===!0,d=i("Normalize");d.append(r("On",c,"on",()=>this.host.setNormalize(!0)),r("Off",!c,"off",()=>this.host.setNormalize(!1))),a("editor:normalize","Normalize",d,this.normalizeWords(t),"normalize");const u=_("div",{class:"lucy-ted-ticks",role:"group","aria-label":"Timing"});for(const[p,f]of[[-1,"◀ Earlier"],[1,"Later ▶"]]){const m=_("button",{type:"button",class:"lucy-ted-tick","data-value":p<0?"earlier":"later"},f);m.addEventListener("click",g=>{const y=this.host.take();y&&this.host.setShift(Ed(y.meta.shiftMs??0,p,g.shiftKey))}),u.append(m)}a("editor:timing","Timing",u,this.host.timingWords(t),"timing"),this.controls.replaceChildren(...n)}regionWords(t){const n=this.region(t);return`Start ${ln(t,n.start)} · End ${ln(t,n.end)} · ${$d(si(t,n))}`}normalizeWords(t){const n=t.normalize;return n?.on?`${dd(n.gainDb)} to LUCY's level`:"plays as recorded"}updateReadouts(t){const n=(a,i)=>{const r=this.controls.querySelector(`[data-lucy-ted="${a}-read"]`);r&&r.textContent!==i&&(r.textContent=i)};n("snap",this.regionWords(t)),n("normalize",this.normalizeWords(t)),n("timing",this.host.timingWords(t))}renderFoot(){const t=_("button",{type:"button",class:"lucy-ted-quiet","data-lucy-ted":"reset"},"Reset region");tn(t,"editor:reset"),t.addEventListener("click",()=>{const r=this.host.take();r&&this.host.setRegion({start:0,end:r.meta.frames},!0)});const n=this.host.playPos()!==null,a=_("button",{type:"button",class:"lucy-ted-play","data-lucy-ted":"play","aria-pressed":String(n)},n?"Stop":"Play take");tn(a,"editor:play"),a.addEventListener("click",()=>this.host.play());const i=_("button",{type:"button",class:"lucy-ted-done","data-lucy-ted":"done"},"Done");i.addEventListener("click",()=>this.host.close()),this.foot.replaceChildren(t,_("span",{class:"lucy-ted-sp"}),a,i)}readColours(){if(this.colours)return this.colours;const t=getComputedStyle(this.dialog),n=a=>t.getPropertyValue(a).trim();return this.colours={top:n("--lucy-ted-stage-top"),mid:n("--lucy-ted-stage-mid"),bottom:n("--lucy-ted-stage-bottom"),slate:n("--lucy-ted-slate"),grid:n("--lucy-ted-grid"),bar:n("--lucy-ted-bar"),hi:n("--lucy-ted-violet-hi"),main:n("--lucy-ted-violet"),lo:n("--lucy-ted-violet-lo"),wash:n("--lucy-ted-wash"),marker:n("--lucy-ted-marker"),play:n("--lucy-ted-play")},this.colours}fit(t){const n=t.clientWidth,a=t.clientHeight;if(!n||!a)return null;const i=Math.min(3,globalThis.devicePixelRatio||1);(t.width!==Math.round(n*i)||t.height!==Math.round(a*i))&&(t.width=Math.round(n*i),t.height=Math.round(a*i));const r=t.getContext("2d");return r?(r.setTransform(i,0,0,i,0,0),{ctx:r,w:n,h:a}):null}envelope(t,n,a,i){const r=new Float32Array(i),s=t.meta.frames;for(let l=0;l<i;l++){const c=Math.floor((n+(a-n)*l/i)*s),d=Math.max(c+1,Math.floor((n+(a-n)*(l+1)/i)*s)),u=Math.max(1,Math.floor((d-c)/48));let p=0;for(let f=Math.max(0,c);f<Math.min(s,d);f+=u)for(const m of t.data){const g=Math.abs(m[f]??0);g>p&&(p=g)}r[l]=p}return r}paint(){if(!this.isOpen)return;const t=this.host.take();if(!t)return;const n=this.region(t.meta),a=JSON.stringify([t.meta.id,t.meta.frames,t.meta.shiftMs??0,n.start,n.end,this.zoom,this.view,this.stage.clientWidth,this.stage.clientHeight,document.documentElement.dataset.theme??"",t.data.length]);a!==this.waveKey&&(this.waveKey=a,this.colours=null,this.paintWave(t,n),this.paintStrip(t,n)),this.paintLive()}paintWave(t,n){const a=this.fit(this.wave);if(!a)return;const{ctx:i,w:r,h:s}=a,l=this.readColours(),c=t.meta,d=c.frames;i.clearRect(0,0,r,s);const u=i.createRadialGradient(r/2,0,0,r/2,0,Math.max(r,s)*1.1);u.addColorStop(0,l.top),u.addColorStop(.55,l.mid),u.addColorStop(1,l.bottom),i.fillStyle=u,i.fillRect(0,0,r,s);const p=Math.round(s*.14),f=p+(s-p)/2,m=(s-p)/2-6,g=this.view,y=1/this.zoom,h=Ke(c)/d,b=[];if(h*this.zoom*r>6){const B=Math.max(0,Math.ceil(g/h)),O=Math.floor((g+y)/h);let U=Number.NEGATIVE_INFINITY;for(let re=B;re<=O&&re-B<4e3;re++){const Q=this.x(re*h,r),ve=re%V===0;i.strokeStyle=ve?l.bar:l.grid,i.lineWidth=1,i.beginPath(),i.moveTo(Math.round(Q)+.5,ve?p:p+(s-p)*.08),i.lineTo(Math.round(Q)+.5,s),i.stroke(),ve&&Q-U>64&&(U=Q,b.push(_("span",{class:"lucy-ted-bar",style:`left:${(Q/r*100).toFixed(3)}%`},`bar ${re/V+1}`)))}}const x=Math.max(2,Math.round(r/2)),v=this.envelope(t,g,g+y,x);let S=0;for(const B of v)B>S&&(S=B);const $=S>0?.92/Math.max(S,.05):1,k=(B,O)=>{const U=new Path2D,re=Q=>Q/x*r;U.moveTo(re(B),f);for(let Q=B;Q<=O;Q++)U.lineTo(re(Q),f-Math.min(1,(v[Math.min(x-1,Q)]??0)*$)*m);for(let Q=O;Q>=B;Q--)U.lineTo(re(Q),f+Math.min(1,(v[Math.min(x-1,Q)]??0)*$)*m);return U.closePath(),U};i.fillStyle=l.slate,i.fill(k(0,x-1));const w=this.x(n.start/d,r),E=this.x(n.end/d,r),M=ht(Math.floor(w/r*x),0,x-1),C=ht(Math.ceil(E/r*x),0,x-1);if(E>0&&w<r&&C>M){const B=i.createLinearGradient(0,p,0,s);B.addColorStop(0,l.wash),B.addColorStop(1,"transparent"),i.fillStyle=B,i.fillRect(Math.max(0,w),p,Math.min(r,E)-Math.max(0,w),s-p);const O=i.createLinearGradient(0,f-m,0,f+m);O.addColorStop(0,l.hi),O.addColorStop(.5,l.main),O.addColorStop(1,l.lo);const U=k(M,C);i.save(),i.beginPath(),i.rect(Math.max(0,w),0,Math.min(r,E)-Math.max(0,w),s),i.clip(),i.shadowColor=l.main,i.shadowBlur=14,i.globalAlpha=.55,i.fillStyle=O,i.fill(U),i.shadowBlur=0,i.globalAlpha=1,i.fill(U),i.restore()}i.strokeStyle=l.marker,i.lineWidth=1.5;for(const B of[w,E])B>=-2&&B<=r+2&&(i.beginPath(),i.moveTo(B,p-4),i.lineTo(B,s),i.stroke());this.labels.replaceChildren(...b);const R=(B,O,U)=>{B.hidden=!(O>=-1&&O<=r+1),B.style.left=`${(O/r*100).toFixed(3)}%`,B.dataset.side=U};R(this.startTag,w,"l"),R(this.endTag,E,"r"),this.startTag.setAttribute("aria-valuetext",`${(n.start/c.sampleRate).toFixed(2)} s, ${ln(c,n.start)}`),this.endTag.setAttribute("aria-valuetext",`${(n.end/c.sampleRate).toFixed(2)} s, ${ln(c,n.end)}`)}paintStrip(t,n){const a=this.fit(this.over);if(!a)return;const{ctx:i,w:r,h:s}=a,l=this.readColours();i.clearRect(0,0,r,s),i.fillStyle=l.bottom,i.fillRect(0,0,r,s);const c=Math.max(2,Math.round(r/3)),d=this.envelope(t,0,1,c);let u=0;for(const g of d)g>u&&(u=g);const p=u>0?1/u:1,f=n.start/t.meta.frames,m=n.end/t.meta.frames;for(let g=0;g<c;g++){const y=(g+.5)/c,h=Math.max(.08,(d[g]??0)*p)*(s/2-2);i.fillStyle=y>=f&&y<=m?l.main:l.slate,i.fillRect(g/c*r,s/2-h,Math.max(1,r/c-1),h*2)}this.frame.style.left=`${(this.view*100).toFixed(3)}%`,this.frame.style.width=`${(100/this.zoom).toFixed(3)}%`}paintLive(){const t=this.fit(this.live);if(!t)return;const{ctx:n,w:a,h:i}=t;n.clearRect(0,0,a,i);const r=this.host.playPos();if(r!==null){const c=this.readColours(),d=Math.round(i*.14),u=this.x(r,a);n.strokeStyle=c.play,n.globalAlpha=.85,n.lineWidth=1,n.beginPath(),n.moveTo(u,d),n.lineTo(u,i),n.stroke(),n.globalAlpha=1}const s=this.foot.querySelector('[data-lucy-ted="play"]'),l=r!==null;s&&s.getAttribute("aria-pressed")!==String(l)&&(s.setAttribute("aria-pressed",String(l)),s.textContent=l?"Stop":"Play take")}}const br={knee:.6,ceiling:.944,range:4,points:8193};function Gb(e,{knee:t,ceiling:n}=br){const a=Math.abs(e);if(a<=t)return e;const i=n-t;return Math.sign(e)*(t+i*Math.tanh((a-t)/i))}function Kb({range:e,points:t}=br){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=Gb((2*a/(t-1)-1)*e);return n}function Yb(e){const t=e.createGain();t.gain.value=1/br.range;const n=e.createWaveShaper();return n.curve=Kb(),n.oversample="none",t.connect(n),{input:t,output:n}}const Xb="LUCY Audio",rt="lucy",Ee=Zn(),yr=.15,Z=Mg(rt,Ee),aa=Ob(Z,Ee),cl=_b(aa,Qb(),Z?.legacyCopy!==!1),Cd=aa.state,A=Tb(Sb(Cd)),je=new Ld(aa.files);cl&&je.adopt(aa.legacyFiles,cl);const G=()=>{Cb(Cd,A),Td(A)},dl=new Ld(`${aa.files}-lupa`),te=new qi({state:()=>A.lupa,save:G,sampleRate:()=>T?.sampleRate??48e3,now:()=>T?.currentTime??0,timeAt:e=>lt(W().timeAt(e)),beatSeconds:()=>qt(W().bpm),roundTrip:()=>oa(),micOpen:()=>!!pe&&!!ie,openMic:async()=>{fe()!=="mic"&&ra("mic");const e=await Ye();return e&&kn(),e},inputChannels:()=>ia,record:e=>ie?.port.postMessage({type:"record",queue:!0,...e}),cancel:e=>ie?.port.postMessage({type:"cancel",id:e}),storeVoice:(e,t)=>dl.save(e,t),copyToTakes:(e,t,n)=>void Ey(e,t,n),uncopyFromTakes:e=>void My(e),loadVoice:async e=>{if(!await Se()||!T)return null;const t=await dl.load({id:e.id,channels:e.channels,frames:e.frames});if(!t?.length)return null;const n=new AudioBuffer({length:e.frames,numberOfChannels:t.length,sampleRate:e.sampleRate});return t.forEach((a,i)=>n.copyToChannel(a,i)),n},play:(e,t,n,a,i)=>{const r=T;if(!r||!K)return{stop:()=>{}};const s=new GainNode(r,{gain:i}),l=new AudioBufferSourceNode(r,{buffer:e});return l.connect(s).connect(K.input),l.start(t,n,a),l.onended=()=>s.disconnect(),{stop:c=>{const d=Math.max(r.currentTime,c??r.currentTime);s.gain.setTargetAtTime(0,d,qi.fadeSeconds/3);try{l.stop(d+qi.fadeSeconds*3)}catch{}}}},report:e=>Z?.notesOut?.(e)??!1,beatNow:()=>W().running?W().beatAt(he()):null,changed:()=>F()});lb(Z,e=>te.message(e));je.highestOnDisk().then(e=>{e<A.nextId||(A.nextId=e+1,G())});function Qb(){try{return globalThis.localStorage??null}catch{return null}}let Ce=!1,D={kind:"idle"},hn=!1,H="",ot=0,Sa=0;const st=new fu({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let T=null,fn=null;const Jb=new Eu({...Sg(),app:Eg(Xb,Ee),version:"0.1.0",clock:st,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=T?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>fn?.whenSettled?.()??null}),lt=e=>e+(fn?.offset??0),W=()=>st.transport,Ot=()=>W().running,Nd=()=>!!Z&&typeof cr()?.record=="function",vr=()=>typeof navigator.mediaDevices?.getDisplayMedia=="function",fe=()=>A.source==="master"&&Nd()?"master":A.source==="computer"&&vr()?"computer":"mic",$t=()=>Ot()&&!Ce;let at=null,ie=null,At=null,K=null,Xa=null,pe=null,Co=null,zt="",ke=[],ge=null,ia=1,Fd=!1,Qa=null;function Se(){return Qa??=(async()=>{Z?(T=Z.ctx,at=Z.output,fn=Z.mapper??new Ir(Z.ctx)):(T=new AudioContext({latencyHint:"interactive"}),at=T.destination,fn=new Ir(T)),fn.start();const e=T;e.addEventListener("statechange",()=>{wr&&e.state!=="running"&&document.visibilityState==="visible"&&e.resume().catch(()=>{})});try{await T.audioWorklet.addModule(ig)}catch{return H="Audio could not start (the recorder's worklet did not load). Reload to try again.",F(),!1}ie=new AudioWorkletNode(T,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),ie.port.onmessage=a=>ty(a.data);const t=new GainNode(T,{gain:0});ie.connect(t).connect(at),K=Tp(T,{moduleUrl:Tg()??Np,bpm:W().bpm,slots:rn.length,state:lr(A.fx)}),Xa=new GainNode(T,{gain:A.master});const n=Yb(T);return K.output.connect(Xa).connect(n.input),n.output.connect(at),Cp(K,st,{toAudioTime:lt,now:he}),K.onChange(()=>{A.fx=K?.getState(),G()}),At=new GainNode(T,{gain:0}),At.connect(K.input),Et(A.monitor),!0})(),Qa}let wr=!1;function zd(){wr=!0,Se().then(e=>{e&&T&&T.state!=="running"&&T.resume().catch(()=>{})})}for(const e of["pointerdown","touchstart","keydown"])addEventListener(e,zd,{capture:!0,passive:!0});document.addEventListener("visibilitychange",()=>{wr&&document.visibilityState==="visible"&&zd()});const Pi={echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}};async function Ye(){if(pe)return!0;if(!await Se()||!T||!ie||!At)return!1;T.state!=="running"&&await T.resume().catch(()=>{});const e=A.input;let t=null,n=!1;try{if(e)try{t=await navigator.mediaDevices.getUserMedia({audio:{...Pi,deviceId:{exact:e.id}}})}catch(r){if(r?.name==="NotAllowedError")throw r;n=!0}if(t??=await navigator.mediaDevices.getUserMedia({audio:{...Pi}}),n&&e){await Fo();const r=ke.find(s=>s.label===e.label);if(r)try{const s=await navigator.mediaDevices.getUserMedia({audio:{...Pi,deviceId:{exact:r.id}}});for(const l of t.getTracks())l.stop();t=s,A.input={...r},G(),n=!1}catch{}}}catch{return H="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",F(),!1}const i=t.getAudioTracks()[0]?.getSettings()??{};return ia=Math.max(1,Math.min(2,i.channelCount??1)),Fd=!!(i.echoCancellation||i.noiseSuppression||i.autoGainControl),Co=t,zt=i.deviceId??"",pe=T.createMediaStreamSource(t),pe.connect(At),kn(),H=n&&e?"Not connected: using the default.":"",await Fo(),F(),!0}function No(){if(pe){try{pe.disconnect()}catch{}for(const e of Co?.getTracks()??[])e.stop();pe=null,Co=null,zt=""}}async function Fo(){try{ke=(await navigator.mediaDevices?.enumerateDevices?.()??[]).filter(t=>t.kind==="audioinput"&&t.deviceId&&t.deviceId!=="default"&&t.label).map(t=>({id:t.deviceId,label:t.label.replace(/\s+/g," ").trim().slice(0,80)}))}catch{ke=[]}}async function Zb(e){const t=ke.find(n=>n.id===e);A.input=t?{...t}:null,G(),D.kind!=="idle"&&fe()==="mic"&&$n(!1),pe?(No(),await Ye()):F()}navigator.mediaDevices?.addEventListener?.("devicechange",()=>{(async()=>{await Fo();const e=A.input,t=!!zt&&ke.some(n=>n.id===zt);pe&&ke.length&&!t?(ke.find(n=>n.id===zt)?.label??e?.label,No(),await Ye(),H="Unplugged: using the default."):pe&&e&&zt!==e.id&&ke.some(n=>n.id===e.id)&&(No(),await Ye()),F()})()});async function Dd(){if(!vr()||!await Se()||!T||!ie)return;T.state!=="running"&&await T.resume().catch(()=>{});let e;try{e=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,suppressLocalAudioPlayback:!1},systemAudio:"include",selfBrowserSurface:"exclude",surfaceSwitching:"include",preferCurrentTab:!1})}catch(l){H=l?.name==="NotAllowedError"?"Nothing shared.":"Can't share a tab or screen here.",F();return}const t=e.getVideoTracks()[0],n=(t?.getSettings?.()??{}).displaySurface,a=t?.label??"";for(const l of e.getVideoTracks())l.stop(),e.removeTrack(l);const i=e.getAudioTracks()[0];if(!i){H=n==="browser"?"No sound: tick Share tab audio.":"No sound: tick Share system audio.",F();return}Ja(!1);const r=i.getSettings()??{},s=ey(n,a);ge={node:T.createMediaStreamSource(e),stream:e,label:s,channels:Math.max(1,Math.min(2,r.channelCount??2))},i.addEventListener("ended",()=>{ge?.stream===e&&(Ja(!1),H="Sharing ended.",F())}),A.source!=="computer"&&ra("computer"),kn(),H="",F()}function ey(e,t){const n=t.replace(/^(web-contents-media-stream|window|screen):\/\/.*$/i,"").trim();return e==="monitor"?"Entire screen":e==="window"?n?`Window · ${n}`:"A window":e==="browser"?n?`Tab · ${n}`:"A tab":n||"Computer audio"}function Ja(e=!0){if(ge){e&&D.kind!=="idle"&&fe()==="computer"&&$n(!1);try{ge.node.disconnect()}catch{}for(const t of ge.stream.getTracks())t.stop();ge=null}}function kn(){if(!ie)return;for(const t of[pe,ge?.node])try{t?.disconnect(ie)}catch{}(fe()==="computer"?ge?.node:fe()==="mic"?pe:null)?.connect(ie),ot=0}function Et(e){A.monitor=e,G(),At&&T&&At.gain.setTargetAtTime(e&&!hn&&fe()==="mic"?1:0,T.currentTime,.01),Sa=0,F()}let nt=null,jn=null;function ty(e){if(e.type!=="level"&&te.owns(e.id)){te.capture(e);return}if(e.type==="level"&&typeof e.peak=="number"){ot=e.peak,te.level(e.peak);const t=performance.now();A.monitor&&pe&&ot>.97?(Sa||=t,t-Sa>1500&&(Et(!1),H="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):Sa=0,o0();return}if(e.type==="chunk"&&e.id!==void 0&&e.channels){(!nt||nt.id!==e.id)&&(nt={id:e.id,parts:[]}),nt.parts.push(e.channels),le?.id===e.id&&(le.builder.add(e.channels),la());return}if(e.type==="done"&&e.id!==void 0){const t=nt?.id===e.id?nt.parts:[];nt=null;const n=ny(t);if(jn&&e.id===jd){jn(n),jn=null;return}dy(e.id,n)}}function ny(e){const t=e[0]?.length??0,n=e.reduce((a,i)=>a+(i[0]?.length??0),0);return Array.from({length:t},(a,i)=>{const r=new Float32Array(n);let s=0;for(const l of e){const c=l[i];c&&(r.set(c,s),s+=c.length)}return r})}function ay(){const e=T;return vt(((e?.baseLatency??0)+(e?.outputLatency??0)+.01)*1e3)}function Bd(e){return $b(e,{roundTripMs:A.roundTripMs,nudgeMs:A.nudgeMs,estimateMs:ay()})}let Ie=null;const iy=8e3;async function ci(e,t){const n=A.takes.find(i=>i.id===e);if(!n)return;const a=pr(t);if((n.shiftMs??0)!==a){if(n.shiftMs=a||void 0,G(),Le.delete(e),Ne.delete(e),de?.id===e){const i=await xr(n);de?.id===e&&i&&(n.shiftMs??0)===a&&(de={id:e,audio:i},Mt(!0))}F()}}function oy(e){const t=A.takes.find(r=>r.id===e),n=t&&Bd(t);if(!t||!n)return;const a=t.shiftMs??0;Ie&&window.clearTimeout(Ie.timer);const i=vt(n.matchMs-a);Ie={take:e,before:a,text:`Shifted ${hr(i).replace(/^[−+]/,"")} ${i<0?"earlier":"later"} to match this setup.`,timer:window.setTimeout(()=>{Ie=null,F()},iy)},ci(e,n.matchMs)}function ry(e){if(Ie?.take!==e)return;const t=Ie.before;window.clearTimeout(Ie.timer),Ie=null,ci(e,t)}function sy(e){const t=A.takes.find(n=>n.id===e);t&&(t.timingNoteOff=!0,G(),F())}function oa(){const e=A.nudgeMs/1e3;if(A.roundTripMs!==null)return A.roundTripMs/1e3+e;const t=T;return(t?.baseLatency??0)+(t?.outputLatency??0)+.01+e}async function ly(e,t){const n=performance.now()+t;for(;!e();){if(performance.now()>n)return!1;await new Promise(a=>setTimeout(a,20))}return!0}function Wt(){return te.busy||D.kind==="idle"&&!oe.busy&&te.jammingNow()}async function cy(){if(te.busy){te.cancel();return}te.voice.kind!=="saving"&&(fe()!=="mic"&&(ra("mic"),H="A voice pass records from Input."),!(!await Ye()||!ie)&&(kn(),te.ask()||(H="Lupa isn't playing now. Press Record again."),F()))}async function Rd(){if(Wt()){await cy();return}if(te.clear(),fe()==="master"||oe.busy){await my();return}if(D.kind!=="idle"){ie?.port.postMessage({type:"cancel",id:D.id}),D={kind:"idle"},nt=null,le=null,_t(),F();return}const e=fe()==="computer"?"computer":"mic";if(e==="computer"){if(!ge){H="Choose a tab or screen first.",F();return}if(!await Se()||!T||!ie)return}else if(!await Ye()||!T||!ie)return;kn();const t=!W().running;if(W().running||(Z&&It()?.claim(kt(rt,Ee)),st.play({at:he()})),Ce=!1,!await ly(()=>W().running,2e3)){H="The clock did not start.",F();return}const n=W(),a=yr/qt(n.bpm),i=Math.max(0,n.beatAt(he())),r=A.countIn?od(i,t,A.countIn,a):null,s=r?r.startBeat:og(i,A.bars,a).startBeat,l=s+A.bars*V,c=lt(n.timeAt(s)),d=lt(n.timeAt(l)),u=e==="computer"?0:oa();Ta=e==="mic"?{ms:vt(u*1e3),estimate:A.roundTripMs===null}:null;const{startFrame:p,endFrame:f}=rg(c,d,u,T.sampleRate),m=A.nextId++;G();const g=e==="computer"?ge?.channels??2:ia;ie.port.postMessage({type:"record",id:m,startFrame:p,endFrame:f,channels:g}),D={kind:"armed",id:m,from:e,startBeat:s,endBeat:l,...r?{countBeat:r.countBeat}:{}},le={id:m,source:e,bars:A.bars,builder:new Va(f-p)},H="",_t(),F()}let Ta=null;async function dy(e,t){if(D.kind==="idle"||D.id!==e||!T)return;const n=D.from;D={kind:"idle"},_t(),le?.id===e&&(le=null);const a=t[0]?.length??0;if(a===0){H="Nothing was recorded.",F();return}const i={id:e,bars:A.bars,bpm:W().bpm,sampleRate:T.sampleRate,channels:t.length,frames:a,created:new Date().toISOString(),saved:!1,source:n,normalize:{on:!0,gainDb:Pt(t,T.sampleRate)}};n==="mic"&&Ta&&(i.tripMs=Ta.ms,Ta.estimate&&(i.tripEstimate=!0)),Ne.set(e,ea(t)),i.saved=await je.save(e,t),i.saved||(H="This take is kept until you reload: this browser has no file storage here."),A.takes.push(i),A.selected=e,G(),await _e(e)}const oe=new Bg({grab:cr,running:()=>W().running,beatNow:()=>W().beatAt(he()),bpm:()=>W().bpm,contextTime:e=>lt(W().timeAt(e)),sampleRate:()=>T?.sampleRate??48e3,leadBeats:()=>yr/qt(W().bpm),bars:()=>A.bars,countIn:()=>A.countIn,now:()=>T?.currentTime??0,nextId:()=>{const e=A.nextId++;return G(),e},after:(e,t)=>{const n=setTimeout(t,e);return()=>clearTimeout(n)},done:e=>void gy(e),failed:e=>{H=fy[e],le=null,F()},changed:()=>{_t(),F()}});let Pe=null;function qd(){const e=oe.phase;return e.kind==="recording"&&e.countBeat<e.startBeat?e:D.kind!=="idle"&&D.countBeat!==void 0&&D.countBeat<D.startBeat?{id:D.id,countBeat:D.countBeat,startBeat:D.startBeat}:null}function _t(){py();const e=qd();if(e&&Pe?.id===e.id||(kr(),!e||!T))return;const t=s=>lt(W().timeAt(s)),n=t(e.startBeat),a=mg(e.countBeat,e.startBeat,t,T.currentTime,n),i=pg(A.cue)?a:[];Pe={id:e.id,clicks:i.map(hy),times:i.map(s=>s.time),badge:!1};const r=sd();if(r&&sr(A.cue)){const s=Array.from({length:e.startBeat-e.countBeat},(l,c)=>e.countBeat+c);r.show(kt(rt,Ee),{beats:s.map(t),accents:s.map(l=>l%V===0),until:n}),Pe.badge=!0}}let Dn=null,va=[];function uy(){const e=oe.phase;return e.kind==="recording"?{id:e.id,startBeat:e.startBeat,endBeat:e.startBeat+e.bars*V}:D.kind!=="idle"?{id:D.id,startBeat:D.startBeat,endBeat:D.endBeat}:null}function py(){const e=Z?.metronome,t=A.click&&e?uy():null;if(t&&Dn===t.id)return;for(const i of va)clearTimeout(i);if(va=[],Dn!==null&&e?.want(!1),Dn=null,!t||!e)return;Dn=t.id;const n=W(),a=i=>Math.max(0,(n.timeAt(i)-he())*1e3);va.push(setTimeout(()=>e.want(!0),a(t.startBeat-.5))),va.push(setTimeout(()=>e.want(!1),a(t.endBeat)+50))}function kr(){if(Pe){for(const e of Pe.clicks)try{e.stop()}catch{}Pe.badge&&sd()?.clear(kt(rt,Ee)),Pe=null}}const ul={accent:.25,beat:.14};function hy(e){const t=T,n=new OscillatorNode(t,{frequency:e.accent?1760:1175}),a=new GainNode(t,{gain:0}),i=e.accent?ul.accent:ul.beat;return a.gain.setValueAtTime(0,e.time),a.gain.linearRampToValueAtTime(i,e.time+.002),a.gain.exponentialRampToValueAtTime(5e-4,e.time+Ea-.002),a.gain.linearRampToValueAtTime(0,e.time+Ea),n.connect(a).connect(t.destination),n.start(e.time),n.stop(e.time+Ea),n.onended=()=>a.disconnect(),n}addEventListener("pagehide",()=>{kr(),Dn!==null&&Z?.metronome?.want(!1)});function jt(){const e=qd();return e?fg(W().beatAt(he()),e.countBeat,e.startBeat):null}const fy={cancelled:"",stopped:"Music stopped: no take.",unavailable:"Reload the Studio to record its Master.",empty:"The Master take came back empty.",timeout:"Master take timed out: no take."};async function my(){if(oe.busy){oe.cancel(),le=null,H="",F();return}!await Se()||!T||(H="",oe.arm())}async function gy(e){if(!T)return;if(Rg(e.channels)<1e-4){H="The Master was silent: no take.",F();return}const t=e.channels.map(a=>new Float32Array(a)),n={id:e.id,bars:e.bars,bpm:e.bpm,sampleRate:T.sampleRate,channels:t.length,frames:t[0]?.length??0,created:new Date().toISOString(),saved:!1,name:`Master ${e.id}`,source:"master",normalize:{on:!0,gainDb:Pt(t,T.sampleRate)}};le?.id===e.id&&(le=null),Ne.set(e.id,ea(t)),n.saved=await je.save(e.id,t),H=n.saved?"":"This take is kept until you reload: this browser has no file storage here.",A.takes.push(n),A.selected=e.id,sa(),G(),await _e(e.id)}function by(e){A.cue=e,G(),kr(),_t(),F()}function ra(e){$n(!1),e!=="mic"&&te.cancel(),A.source=e,H="",G(),Et(A.monitor),kn(),e==="mic"&&!pe&&ke.length&&Ye(),F()}function xn(){try{return Z?.sendAudio?Z.audioReceivers?.()??[]:[]}catch{return[]}}let ae=null,Hn=!1,Ht=null;function Id(e){return(e?.targets.find(t=>!t.filled)??e?.targets[0])?.id??""}function Pd(e=A.selected){const t=xn()[0];!t||e===null||!A.takes.some(n=>n.id===e)||(ae={take:e,to:t.instance,target:Id(t)},Ht=null,F())}function sa(){ae=null}async function Od(){const e=ae,t=A.takes.find(l=>l.id===e?.take);if(!e||!t||!Z?.sendAudio||Hn)return;const n=await Ut(t),a=xn().find(l=>l.instance===e.to),i=a?.name??"Sampler",r=`${a?.label??"Pad"} ${e.target}`;if(!n){Ht={take:t.id,text:`${$e(t)} could not be read.`},F();return}Hn=!0,F();let s;try{s=await Z.sendAudio(e.to,{...Fb(t,n),name:Nb(e.name,t)},e.target)}catch(l){s={ok:!1,reason:"error",message:l instanceof Error?l.message:String(l)}}Hn=!1,ae=null,Ht={take:t.id,text:s.ok?`Sent to ${i} · ${r}`:s.reason==="cancelled"?`Not sent: ${r} kept.`:`Not sent: ${s.message??s.reason}`},F()}let de=null;const Le=new Map,yy=4;async function Ut(e){const t=await je.load(e);return t&&e.shiftMs?xb(t,e.shiftMs,e.sampleRate):t}function xr(e){const t=Le.get(e.id);if(t)return Le.delete(e.id),Le.set(e.id,t),t;const n=T,a=(async()=>{const i=await Ut(e);if(!i||!n)return null;const r=new AudioBuffer({length:e.frames,numberOfChannels:e.channels,sampleRate:e.sampleRate});return i.forEach((s,l)=>r.copyToChannel(s,l)),r})();for(Le.set(e.id,a),a.then(i=>{!i&&Le.get(e.id)===a&&Le.delete(e.id)});Le.size>yy;){const i=Le.keys().next().value;if(i===void 0||i===de?.id)break;Le.delete(i)}return a}function vy(e){const t=A.takes.find(n=>n.id===e);t&&Se().then(n=>{n&&xr(t)})}let Kn=null,ft=null,Ge=null;async function _e(e){e!==A.selected&&sa(),A.selected=e,G();const t=A.takes.find(a=>a.id===e);if(!t||!T){de=null,Mt(!0),F();return}const n=await xr(t);A.selected===e&&(n?de={id:t.id,audio:n}:(H=`Take ${t.id} could not be read.`,de=null),Mt(!0),F())}function zo(e){if(Ge){try{Ge.node.stop(e??0)}catch{}Ge=null}}let Bt=null,Do=null;function Mt(e=!1){const t=A.takes.find(x=>x.id===de?.id);if(!T||!at||!de||!t||!$t()){const x=W().stopTime;zo(x!==null&&T?Math.max(lt(x),T.currentTime):void 0),Bt=null,Do=null;return}const n=W(),a=Xe(t),i=yr/qt(n.bpm),r=n.beatAt(he());Kn===t.id&&(Kn=null,ft={id:t.id,beat:rl(r,V,i).startBeat}),ft&&ft.id!==t.id&&(ft=null);const s=ft?.beat??0,l=JSON.stringify([de.id,n.startTime,n.bpm,a.start,a.end,s]);if(!e&&Ge?.stamp===l)return;const c=rl(r-s,si(t,a),i),d=c.startBeat+s,u=c.offsetBeats,p=Math.max(lt(n.timeAt(d)),T.currentTime);zo(p);const f=new AudioBufferSourceNode(T,{buffer:de.audio,loop:!0}),m=a.start/t.sampleRate,g=a.end/t.sampleRate;f.loopStart=m,f.loopEnd=g;const y=n.bpm/t.bpm;f.playbackRate.value=y;const h=new GainNode(T,{gain:cd(t)});f.connect(h).connect(K?.input??at);const b=Math.min(g-m,u*qt(t.bpm));f.start(p,m+b),Ge={node:f,gain:h,stamp:l},Do=Bt,Bt={id:t.id,when:p,offset:b,start:m,length:g-m,duration:t.frames/t.sampleRate,rate:y}}function _d(){return T?sg(T,performance.timeOrigin+performance.now(),wy()):0}function wy(){try{if(Z&&window.parent!==window)return window.parent.performance.timeOrigin}catch{}return performance.timeOrigin}function $r(e=_d()){const t=Bt&&e>=Bt.when?Bt:Do??null;if(!t||!Ge||e<t.when||!t.length)return{id:null,at:-1};const n=(((e-t.when)*t.rate+t.offset)%t.length+t.length)%t.length;return{id:t.id,at:(t.start+n)/t.duration}}const jd=0;async function ky(){if(hn||D.kind!=="idle"||oe.busy||!await Ye()||!T||!ie||!at)return;hn=!0,Et(A.monitor),H="Calibrating: speakers on, keep quiet for two seconds…",F();const e=T.sampleRate,t=T.currentTime+.3,n=[0,.5,1,1.5].map(d=>t+d),a=Math.round((t-.05)*e),i=Math.round((t+2.2)*e),r=new Promise(d=>{jn=d,setTimeout(()=>d(null),4e3)});ie.port.postMessage({type:"record",id:jd,startFrame:a,endFrame:i,channels:1});for(const d of n){const u=new OscillatorNode(T,{frequency:2e3}),p=new GainNode(T,{gain:0});p.gain.setValueAtTime(.8,d),p.gain.setValueAtTime(0,d+.004),u.connect(p).connect(at),u.start(d),u.stop(d+.01)}const s=await r;jn=null,hn=!1;const l=s?.[0],c=l?ag(l,n.map(d=>Math.round(d*e)-a),Math.round(.4*e)):null;c===null?H="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(A.roundTripMs=Math.round(c/e*1e4)/10,H=`Round trip ${A.roundTripMs} ms: takes are shifted by it.`,G()),Et(A.monitor)}async function Bo(){if(ft=null,await Se(),T&&T.state!=="running"&&await T.resume().catch(()=>{}),Z&&Ot()){Ce=!Ce,Mt(!0),F(),Ce&&It()?.out?.(kt(rt,Ee));return}Ot()?st.stop({at:he()}):(Ce=!1,Z&&It()?.claim(kt(rt,Ee)),st.play({at:he()}))}let pl=W().running;st.onChange(()=>{const e=W().running&&!pl;e&&Z&&(Ce=!Lg(rt,Ee)),pl=W().running,W().running||(Ce=!1,ft=null,Kn=null,D.kind!=="idle"&&(ie?.port.postMessage({type:"cancel"}),D={kind:"idle"})),oe.clockChanged(e),Mt(),F()});It()?.member?.(kt(rt,Ee),$t);It()?.onAll(()=>{Ce&&(Ce=!1,ft=null,Mt(!0),F())});async function Ar(e=A.selected){const t=A.takes.find(r=>r.id===e);if(!t){H="No take to save yet: record one, or Load an audio file.",F();return}const n=await Ut(t);if(!n){H=`${$e(t)} is not in this browser: nothing to save.`,F();return}const a=new Blob([Bb(Ad(n,Xe(t)),t.sampleRate)],{type:"audio/wav"}),i=document.createElement("a");i.href=URL.createObjectURL(a),i.download=`lucy${Ee>1?`-${Ee}`:""}-take-${t.id}-${Math.round(t.bpm)}bpm-${t.created.slice(0,10)}.wav`,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(i.href),1e4)}async function xy(e){if(!await Se()||!T)return;let t;try{t=await T.decodeAudioData(await e.arrayBuffer())}catch{H=`Couldn't read ${e.name}: not an audio file this browser can decode.`,F();return}const n=W().bpm,a=nd(t.length,t.sampleRate,n),i=[];for(let l=0;l<Math.min(2,t.numberOfChannels);l++){const c=new Float32Array(a.frames);c.set(t.getChannelData(l).subarray(0,a.frames)),i.push(c)}const r=A.nextId++,s={id:r,bars:a.bars,bpm:n,sampleRate:t.sampleRate,channels:i.length,frames:a.frames,created:new Date().toISOString(),saved:!1,source:"file",normalize:{on:!0,gainDb:Pt(i,t.sampleRate)}};Ne.set(r,ea(i)),s.saved=await je.save(r,i),H=`${e.name} is take ${r}: ${a.bars} bar${a.bars===1?"":"s"} at ${Math.round(n)} BPM${a.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,A.takes.push(s),A.selected=r,G(),await _e(r)}function $y(){$n(!1),Ot()&&(Z?(Ce=!0,It()?.out?.(kt(rt,Ee))):st.stop({at:he()})),zo(),K?.clear({fadeMs:20}),Et(!1)}function Hd(e){A.master=Math.min(1,Math.max(0,e)),G(),Xa&&T&&Xa.gain.setTargetAtTime(A.master,T.currentTime,.01),Yn.value=String(A.master),Lr.textContent=`${Math.round(A.master*100)}%`}async function Ay(e){const t=qb(A,e);$n(!1),sa(),Object.assign(A,t),Ne.clear(),H="",G(),!(Qa&&!await Qa)&&(K?.setState(A.fx),Hd(A.master),Et(A.monitor),await _e(A.selected))}function $n(e=!0){oe.busy&&oe.cancel(),D.kind!=="idle"&&(ie?.port.postMessage({type:"cancel"}),D={kind:"idle"},nt=null),le=null,_t(),e&&F()}const Wn=new zb(A,e=>(Ne.delete(e),je.remove(e)));async function Wd(e=A.selected){if(e!==null&&de?.id!==e&&Le.delete(e),e===null)return;const t=A.takes.find(a=>a.id===e),n=A.selected===e;!t||!Wn.delete(e)||(ae?.take===e&&sa(),Ht?.take===e&&(Ht=null),G(),n?await _e(A.takes.at(-1)?.id??null):F(),Sm({message:`Deleted ${$e(t)}`,actionLabel:"Undo",onAction:()=>{Wn.undo(e)&&(G(),A.selected===e?_e(e):F())},onClose:a=>{a!=="action"&&Wn.settle(e)}}))}async function Ey(e,t,n){if(A.takes.some(d=>d.fromVoice===e.id))return;const a=W().bpm,i=nd(t[0]?.length??0,e.sampleRate,a),r=t.slice(0,2).map(d=>{const u=new Float32Array(i.frames);return u.set(d.subarray(0,i.frames)),u}),s=A.nextId++,l={id:s,bars:i.bars,bpm:a,sampleRate:e.sampleRate,channels:r.length,frames:i.frames,created:new Date().toISOString(),saved:!1,name:`Voice pass ${n}`.slice(0,fr),source:"mic",normalize:{on:!0,gainDb:e.normalizeDb??Pt(r,e.sampleRate)},fromVoice:e.id},c=oa();c>0&&(l.tripMs=Math.round(c*1e3*10)/10),Ne.set(s,ea(r)),l.saved=await je.save(s,r),A.takes.push(l),G(),F()}async function My(e){const t=A.takes.find(a=>a.fromVoice===e);if(!t)return;const n=A.selected===t.id;A.takes.splice(A.takes.indexOf(t),1),Ne.delete(t.id),Le.delete(t.id),je.remove(t.id),G(),n?await _e(A.takes.at(-1)?.id??null):F()}function Ud(e,t){const n=A.takes.find(a=>a.id===e);n&&(Eb(n,t),G(),F())}function Er(e,t,n){if(!n)return;const a=A.takes.find(i=>i.id===e);a&&(fb(a,t)?a.region=void 0:a.region={start:t.start,end:t.end},G(),de?.id===e&&Mt(),F())}async function Mr(e,t){const n=A.takes.find(a=>a.id===e);if(n){if(n.normalize)n.normalize.on=t;else{const a=t?await je.load(n):null;if(t&&!a)return;n.normalize={on:t,gainDb:a?Pt(a,n.sampleRate):0}}G(),T&&Ge&&de?.id===e&&Ge.gain.gain.setTargetAtTime(cd(n),T.currentTime,.01),F()}}function Sr(e,t){const n=A.takes.find(a=>a.id===e);n&&(t==="beat"?n.snap=void 0:n.snap=t,G(),F())}async function Tr(e){if(de?.id===e&&$t()){await Bo();return}if(!await Se()||!T)return;const t=T;Kn=Ot()?e:null,await Promise.all([t.state==="running"?null:t.resume().catch(()=>{}),A.selected!==e||de?.id!==e?_e(e):null]),$t()?Kn===e&&Mt(!0):await Bo()}const P=(e,t={},...n)=>{const a=document.createElement(e);for(const[i,r]of Object.entries(t))a.setAttribute(i,r);return a.append(...n),a},Vd=document.getElementById("app");Vd.classList.add("nc","nc-page");Cm();yg();const di=P("header",{class:"nc-page-hd"},P("div",{},P("h1",{class:"nc-page-title"},P("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",P("span",{class:"nc-page-sep"},"/")," AUDIO ",P("span",{class:"nc-page-sep"},"/")," ",P("span",{class:"nc-mono"},String(Ee).padStart(2,"0"))),P("p",{class:"nc-page-sub"},"A TRIKI instrument."))),Yn=P("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(A.master),"data-nc-id":"lucy-master"});Yn.addEventListener("input",()=>Hd(Number(Yn.value)));const Lr=P("span",{class:"nc-readout","data-nc-readout":""});Lr.textContent=`${Math.round(A.master*100)}%`;const mn=P("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});mn.hidden=!0;mn.addEventListener("change",()=>{const e=mn.files?.[0];mn.value="",e&&xy(e)});const Ro=(e,t)=>{const n=P("button",{type:"button",class:"nc-page-action","data-lucy-action":e.toLowerCase()},e);return n.addEventListener("click",t),q(`action:${e.toLowerCase()}`,n,n),n},hl=Bm({panel:P("div",{},P("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},P("label",{class:"nc-label",for:"lucy-master"},"Master"),Yn,Lr),Ro("Save",()=>void Ar()),Ro("Load",()=>mn.click()))});di.append(P("div",{class:"nc-page-actions"},hl.panel,Ro("Panic",$y),hl.button,mn));q("page:title",di.querySelector(".nc-page-title"));q("master",di.querySelector('label[for="lucy-master"]'),Yn);const Cr=P("div",{class:"nc-stack","data-nc-layout":"adjacent"});Vd.append(di,P("main",{class:"nc-page-body"},Cr));function Sy(){const e=W(),t=oe.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const a=e.beatAt(he()),i=jt();if(i!==null)return`Count-in: ${i}`;if(a<t.startBeat)return"Waiting for Master…";const r=Math.floor((a-t.startBeat)/4)+1;return`Recording Master bar ${Math.min(r,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const a=e.beatAt(he()),i=jt();if(i!==null)return`Count-in: ${i}`;if(a<D.startBeat){const s=Math.ceil((D.startBeat-a)/4);return`Armed: recording in ${s} bar${s===1?"":"s"}`}const r=Math.floor((a-D.startBeat)/4)+1;return`Recording bar ${Math.min(r,A.bars)} of ${A.bars}`}if(!Ot())return A.takes.length?"Stopped":fe()==="master"?"Record to take the Master":"Arm to record a take";if(Ce)return"Sitting out";const n=de?A.takes.find(a=>a.id===de?.id):void 0;return n?`Playing ${$e(n)}`:"Playing (no take yet)"}function Gd(){if(Wt()){const e=te.voice.kind;return te.busy?"Cancel":e==="added"||e==="quiet"||e==="saving"?"Record another":"Record voice pass"}return Ty()}function Ty(){const e=oe.phase;return e.kind==="waiting"?"Armed":e.kind==="recording"?W().beatAt(he())<e.startBeat?"Armed":"Recording":D.kind==="armed"?"Armed":D.kind==="recording"?"Recording":"Record"}function Ly(){const e=Wt(),t=!e&&(D.kind!=="idle"||oe.busy),n=A.lupa.thresholdDb;return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:$t()?"Stop":"Play",on:$t(),onPress:()=>void Bo()},{type:"button",id:"arm",label:Gd(),on:t,ariaLabel:e?te.busy?"Cancel the voice pass":"Record a voice pass: Lupa's next whole loop from the mic":t?"Cancel the take":fe()==="master"?"Record the Master from the next bar line the music plays":"Record a take from the next bar",onPress:()=>void Rd()},{type:"group",id:"mic",title:"Mic settings",collapse:"phone",controls:[{type:"slider",id:"mic-threshold",label:"Mic threshold",min:xt,max:ta,step:1,value:n,valueText:Cy(n),onChange:a=>te.setThreshold(a)}]},{type:"choice",id:"bars",label:"Length (bars)",value:String(A.bars),options:Aa.map(a=>({value:String(a),label:`${a} bar${a===1?"":"s"}`})),onChange:a=>{A.bars=Number(a),G(),F()}},{type:"group",id:"count",title:"Count-in",collapse:"phone",summary:Dy(),controls:[...Ry(),...By()]}]}}function Cy(e){return`${e<0?"−":""}${Math.abs(e)} dB`}function Oi(){const e=[{value:"mic",label:"Input"},...vr()?[{value:"computer",label:"Computer audio"}]:[],...Nd()?[{value:"master",label:"Master"}]:[]];return e.length<2?[]:[{type:"choice",id:"record-from",label:"Record from",value:fe(),options:e,onChange:t=>ra(t==="master"?"master":t==="computer"?"computer":"mic")}]}function Ny(){const e=A.input,t=ke.map(n=>({value:n.id,label:n.label}));return e&&!ke.some(n=>n.id===e.id)&&t.push({value:e.id,label:`${e.label} (not connected)`}),[{value:"default",label:"Default input"},...t]}const Za=()=>H?[{type:"note",id:"notice",text:H}]:[];function Fy(){return ge?[{type:"readout",id:"computer-source",label:"From",value:ge.label},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,ot)},{type:"button",id:"stop-sharing",label:"Stop sharing",on:!1,onPress:()=>{Ja(),H="",F()}},{type:"note",id:"rights-note",text:"Takes here: unknown rights."},...Za()]:[{type:"label",id:"capture-label",text:"What to capture"},{type:"button",id:"share",label:"Pick tab or screen",on:!0,onPress:()=>void Dd()},{type:"note",id:"share-how",text:"Web page: pick its tab."},{type:"note",id:"share-how-app",text:"Another app: Entire screen."},{type:"note",id:"share-how-tick",text:"Then tick Share audio."},...Za()]}function zy(){return fe()==="master"?{id:"input",title:"Input",controls:[...Oi(),{type:"note",id:"master-note",text:"Internal: no monitor, no nudge."},...Za()]}:fe()==="computer"?{id:"input",title:"Input",controls:[...Oi(),...Fy()]}:{id:"input",title:"Input",controls:[...Oi(),...ke.length?[{type:"select",id:"input-device",label:"Input",value:A.input?.id??"default",options:Ny(),onChange:e=>void Zb(e)}]:[],pe?{type:"readout",id:"source",label:ke.length?"Format":"Input",value:`${ia===2?"Stereo":"Mono"} · ${Math.round((T?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void Ye()},...pe||ke.length?[]:[{type:"note",id:"inputs-after",text:"Then choose your input."}],{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,ot)},{type:"choice",id:"monitor",label:"Monitor",value:A.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:e=>Et(e==="on")},...Fd?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...Za(),{type:"group",id:"input-more",title:"Timing",collapse:"phone",summary:`Round trip ${Kd()} · Nudge ${Yd()}`,controls:[{type:"label",id:"timing-label",text:"Timing"},...Ky().controls??[]]}]}}function Dy(){const e=Z?.metronome?` · click ${A.click?"on":"off"}`:"";if(!A.countIn)return`Count-in off${e}`;const t=A.cue==="sound"?"Click":A.cue==="visual"?"Number":"Both";return`Count-in ${A.countIn} · ${t}${e}`}function Kd(){return A.roundTripMs===null?`${Math.round(oa()*1e3)} ms (estimate)`:`${A.roundTripMs} ms`}function Yd(){return`${A.nudgeMs>0?"+":""}${A.nudgeMs} ms`}function By(){return Z?.metronome?[{type:"label",id:"click-label",text:"Click while recording"},{type:"choice",id:"click",label:"Click while recording",value:A.click?"on":"off",options:[{value:"off",label:"Off"},{value:"on",label:"On"}],onChange:e=>{A.click=e==="on",G(),_t(),F()}},{type:"note",id:"click-note",text:"Never in the take."}]:[]}function Ry(){return[{type:"label",id:"count-in-label",text:"Count-in"},{type:"choice",id:"count-in",label:"Count-in",value:String(A.countIn),options:[{value:"0",label:"Off"},{value:"4",label:"4 beats"},{value:"8",label:"8 beats"}],onChange:e=>{A.countIn=Number(e)===4?4:Number(e)===8?8:0,G(),F()}},...A.countIn?[{type:"label",id:"cue-label",text:"Count-in cue"},{type:"choice",id:"cue",label:"Cue",value:A.cue,options:[{value:"sound",label:"Click"},{value:"visual",label:"Number"},{value:"both",label:"Both"}],onChange:e=>by(e==="sound"||e==="visual"?e:"both")}]:[]]}function qy(){return{id:"takes",title:"Takes",summary:A.takes.length?`${A.takes.length} take${A.takes.length===1?"":"s"}`:"No takes",controls:[]}}const Ne=new Map,_i=new Set;let fl=Promise.resolve();function Iy(e){Ne.has(e.id)||_i.has(e.id)||(_i.add(e.id),fl=fl.then(async()=>{const t=await Ut(e).catch(()=>null);_i.delete(e.id),!(!A.takes.includes(e)&&!Wn.held.includes(e.id))&&(Ne.set(e.id,t?ea(t):null),la())}))}let le=null,ji=!1;function Xd(){const e=W(),t=oe.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const n=e.beatAt(he()),a=jt();if(a!==null)return`Count-in · ${a}`;if(n<t.startBeat)return"Waiting for Master…";const i=Math.floor((n-t.startBeat)/V)+1;return`Recording · bar ${Math.min(i,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const n=e.beatAt(he()),a=jt();if(a!==null)return`Count-in · ${a}`;if(n<D.startBeat){const r=Math.ceil((D.startBeat-n)/V);return`Armed · recording in ${r} bar${r===1?"":"s"}`}const i=Math.floor((n-D.startBeat)/V)+1;return`Recording · bar ${Math.min(i,A.bars)} of ${A.bars}`}return""}function Py(){const e=oe.phase,t=cr();if(!T||!t)return;if(e.kind==="waiting"){le??={id:-1,source:"master",bars:A.bars,builder:new Va(0)};return}if(e.kind!=="recording"||((!le||le.id!==e.id)&&(le={id:e.id,source:"master",bars:e.bars,builder:new Va(e.to-e.from)}),ji))return;const n=e.from+le.builder.frames,a=Math.min(e.to,Math.floor(T.currentTime*T.sampleRate)-2048);if(a-n<4096)return;ji=!0;const i=le;t.take("master",n,a).then(r=>{r&&le===i&&(i.builder.add(r),la())}).catch(()=>{}).finally(()=>{ji=!1})}function Oy(){if(!(D.kind!=="idle"||oe.busy))return null;const t=le?.bars??A.bars,n=le?.builder;return{label:Xd(),count:sr(A.cue)?jt():null,source:oe.busy?"master":D.kind!=="idle"?D.from:"mic",peaks:n&&n.totalFrames>0?n.peaks:null,filled:n?.filled??0,bars:Array.from({length:Math.max(0,t-1)},(a,i)=>(i+1)/t)}}function _y(){const e=xn();for(const n of A.takes)Iy(n);const t=e.find(n=>n.instance===ae?.to)??e[0];return{takes:[...A.takes].reverse(),selected:A.selected,playing:$t()&&de?de.id:null,peaks:n=>Ne.get(n),canSend:e.length>0,sendName:e.length===1?e[0]?.name??"Sampler":"Sampler",picker:ae&&t?{take:ae.take,receivers:e,to:t.instance,target:ae.target,name:ae.name??"",defaultName:(()=>{const n=A.takes.find(a=>a.id===ae?.take);return n?$e(n):""})(),sending:Hn}:null,sendNote:Ht,timing:n=>Bd(n),timingDone:Ie?{take:Ie.take,text:Ie.text}:null,live:Oy(),hint:fe()==="master"?"Record takes the Master on the next bar.":"Record takes the mic on the next bar.",now:Date.now()}}const Xn=new Wb({select:e=>void _e(e),play:e=>void Tr(e),preload:e=>vy(e),rename:Ud,openSend:e=>Pd(e),pickTo:e=>{const t=xn().find(n=>n.instance===e);t&&ae&&(ae={...ae,to:t.instance,target:Id(t)}),F()},pickTarget:e=>{ae&&(ae={...ae,target:e}),F()},pickName:e=>{ae&&(ae={...ae,name:e})},send:()=>void Od(),cancelSend:()=>{Hn||(sa(),F())},download:e=>void Ar(e),remove:e=>void Wd(e),setRegion:Er,setSnap:Sr,setNormalize:(e,t)=>void Mr(e,t),setShift:(e,t)=>void ci(e,t),matchTiming:oy,dismissTiming:sy,undoTiming:ry,cancelRecording:()=>$n(),openEditor:e=>void Hy(e)});function la(){Xn.render(_y())}let X=null,Qn=0;const gn=new Vb({take:()=>{const e=X&&A.takes.find(t=>t.id===X?.id);return e&&X?{meta:e,data:X.data}:null},setRegion:(e,t)=>{X&&Er(X.id,e,t)},setSnap:e=>{X&&Sr(X.id,e)},setNormalize:e=>{X&&Mr(X.id,e)},setShift:e=>{X&&ci(X.id,e)},play:()=>{X&&Tr(X.id)},playPos:()=>{const e=$r();return X&&e.id===X.id&&e.at>=0?e.at:null},timingWords:e=>`${hr(e.shiftMs??0)}${e.tripMs?` · ${jy(e.tripMs)} round trip taken off when recorded`:""}`,close:()=>Qd()});document.body.append(gn.el);const jy=e=>`${Number.isInteger(e)?e:e.toFixed(1)} ms`;async function Hy(e){const t=A.takes.find(i=>i.id===e);if(!t)return;const n=++Qn,a=await Ut(t);if(n===Qn){if(!a?.length){H=`${$e(t)}'s audio isn't in this browser.`,F();return}X={id:e,data:a,shiftMs:t.shiftMs??0},gn.open()||(X=null)}}function Qd(){Qn++,gn.close(),X=null}function Wy(){if(!X||!gn.isOpen)return;const e=A.takes.find(n=>n.id===X?.id);if(!e){Qd();return}const t=e.shiftMs??0;if(t!==X.shiftMs){const n=X.id;X.shiftMs=t;const a=++Qn;Ut(e).then(i=>{a!==Qn||!X||X.id!==n||!i?.length||(X.data=i,gn.refresh())})}gn.refresh()}const ui=new Map;function Jd(e,t,n){K?.setParam(e,t,n),F()}function Uy(e,t){const n="hacks-eq-graph";return ui.set(n,"hack:eq:graph"),kp(K,e,{id:n,on:t,set:(a,i)=>Jd(e,a,i),help:{graph:mt["hack:eq:graph"],low:mt["hack:eq:node:low"],mid:mt["hack:eq:node:mid"],high:mt["hack:eq:node:high"]}})}function ml(e,t,n){const a=Number(K?.getParam(t,n.key)??n.default),i=`hacks-${t}-${n.key}`;ui.set(i,`hack:${e}:${n.key}`);const r=s=>Jd(t,n.key,s);return n.options?{type:"select",id:i,label:n.label,value:String(a),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>r(Number(s))}:{type:"slider",id:i,label:n.label,min:n.min,max:n.max,step:n.step??.001,taper:xh(n),value:a,valueText:zl(n,a,W().bpm),onChange:r}}function Vy(e){const t=K?.getChain().find(n=>n.type===e)?.id??e;return K?K.getParam(t,"bypass")===!1:!1}function gl(e,t){const n=K?.getChain().find(r=>r.type===e)?.id??e,a=Ae(e),i=a?.dials??[];return ui.set(`hacks-${e}`,`hack:${e}`),{type:"fx",id:`hacks-${e}`,title:a?.label??e,depth:t,on:K?K.getParam(n,"bypass")===!1:!1,onToggle:r=>{K?.setParam(n,"bypass",!r),F()},controls:[...e==="eq"?[Uy(n,K?K.getParam(n,"bypass")===!1:!1)]:[],...i.filter(r=>!r.more).map(r=>ml(e,n,r))],more:i.filter(r=>r.more).map(r=>ml(e,n,r)),maxHelp:mt["hack:max"],meter:jl(K,n)??void 0,meterHelp:mt["hack:meter"]}}function Gy(){return{id:"hacks",title:"Hacks",controls:[{type:"group",id:"hacks-cards",title:"EQ & Compressor",collapse:"phone",summary:rn.map(e=>`${Ae(e)?.label??e} ${Vy(e)?"on":"off"}`).join(" · "),controls:[gl("eq",1),gl("compressor",2)]}]}}function Ky(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:Kd()},{type:"button",id:"calibrate",label:hn?"Listening…":"Calibrate",on:hn,onPress:()=>void ky()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:A.nudgeMs,valueText:Yd(),onChange:e=>{A.nudgeMs=e,G(),F()}}]}}const Yy="http://www.w3.org/2000/svg",nn=(e,t)=>{const n=document.createElementNS(Yy,e);for(const[a,i]of Object.entries(t))n.setAttribute(a,i);return n},qo=P("div",{class:"lucy-vp","data-lucy":"vp"}),Zd=P("span",{class:"lucy-meter-fill"}),Nr=P("span",{class:"lucy-meter-mark","aria-hidden":"true"}),me=P("div",{class:"lucy-meter",role:"meter","aria-label":"Mic level","aria-valuemin":String(xt),"aria-valuemax":String(ta),"data-lucy":"meter"},Zd,Nr),eu=P("span",{class:"nc-label"},"Mic"),Xy=P("div",{class:"lucy-mic"},eu,me),Fr=P("div",{class:"lucy-vp-body"});qo.append(Xy,Fr);q("mic-meter",eu,me);q("mic-mark",Nr);let Io=Number.NEGATIVE_INFINITY;const bl=1500,yl=e=>Math.max(0,Math.min(1,(e-xt)/(ta-xt)));me.addEventListener("pointerdown",e=>{const t=i=>{const r=me.getBoundingClientRect();if(r.width<=0)return;const s=Math.max(0,Math.min(1,(i-r.left)/r.width));te.setThreshold(xt+s*(ta-xt))};me.setPointerCapture?.(e.pointerId),me.dataset.drag="",t(e.clientX);const n=i=>t(i.clientX),a=()=>{delete me.dataset.drag,me.removeEventListener("pointermove",n),me.removeEventListener("pointerup",a),me.removeEventListener("pointercancel",a)};me.addEventListener("pointermove",n),me.addEventListener("pointerup",a),me.addEventListener("pointercancel",a)});function Qy(){const e=fe()==="mic"?!!pe:fe()==="computer"?!!ge:!1,t=Ma(A.lupa.thresholdDb),n=ot>0?20*Math.log10(ot):-120,a=e&&ot>=t;a&&(Io=performance.now()),Zd.style.width=`${e?yl(n)*100:0}%`,Nr.style.left=`${yl(A.lupa.thresholdDb)*100}%`,me.toggleAttribute("data-loud",a),me.toggleAttribute("data-off",!e),me.setAttribute("aria-valuenow",String(Math.max(xt,Math.round(n)))),me.setAttribute("aria-valuetext",e?`${Math.round(n)} dB`:"Off")}function Jy(){const e=fe();return e==="master"?{text:"Recording the Master: no mic.",warn:!1,allow:!1}:e==="computer"?ge?performance.now()-Io<bl?{text:"Computer audio on · loud enough",warn:!1,allow:!1}:{text:"Computer audio on · quiet",warn:!1,allow:!1}:{text:"Choose a tab or screen to record.",warn:!1,allow:!1}:pe?performance.now()-Io<bl?{text:"Mic on · loud enough",warn:!1,allow:!1}:{text:"Mic on · too quiet — sing louder or lower the threshold",warn:!0,allow:!1}:{text:"Allow the mic to record.",warn:!1,allow:!0}}function Tn(e,t,n={}){const s=nn("svg",{viewBox:"0 0 400 40",preserveAspectRatio:"none","aria-hidden":"true"});s.append(nn("line",{class:"base",x1:"0",x2:String(400),y1:String(20),y2:String(20)}));for(let d=1;d<e;d++){const u=String(d*400/e);s.append(nn("line",{class:"bar",x1:u,x2:u,y1:"0",y2:String(40)}))}if(t.length>1){const d=Math.min(1,t.length/128),u=t.map((m,g)=>{const y=g/Math.max(1,t.length-1)*d*400,h=n.quiet?.6:Math.max(.6,m*(40/2-3));return[y,h]}),p=u.map(([m,g])=>`${m.toFixed(1)},${(20-g).toFixed(1)}`),f=[...u].reverse().map(([m,g])=>`${m.toFixed(1)},${(20+g).toFixed(1)}`);s.append(nn("path",{class:"wave",d:`M${p.join(" L")} L${f.join(" L")} Z`}))}if(n.kept!==void 0&&n.kept<1){const d=String(n.kept*400);s.append(nn("line",{class:"cut",x1:d,x2:d,y1:"0",y2:String(40)}))}const l=nn("line",{class:"head",x1:"0",x2:"0",y1:"0",y2:String(40)});l.setAttribute("visibility",n.head===null||n.head===void 0?"hidden":"visible"),n.head!==null&&n.head!==void 0&&(l.setAttribute("x1",String(n.head*400)),l.setAttribute("x2",String(n.head*400))),s.append(l);const c=P("div",{class:"lucy-strip","data-lucy":"strip"});return n.quiet&&(c.dataset.quiet=""),c.append(s),n.start&&c.append(P("span",{class:"lucy-dot lucy-strip-start","data-hollow":""})),c}const Ln=e=>P("div",{class:"lucy-bars",style:`--lucy-bars:${e}`,"aria-hidden":"true"},...Array.from({length:e},(t,n)=>P("span",{},String(n+1)))),Cn=(e=!1)=>P("span",{class:"lucy-dot","aria-hidden":"true",...e?{"data-hollow":""}:{}}),Me=(e,...t)=>P("p",{class:"lucy-line",...e},...t),Ue=e=>P("span",{class:"lucy-sub"},e),Nn=(...e)=>P("p",{class:"lucy-help"},...e),tu=(e,t,n)=>{const a=P("button",{type:"button",class:"lucy-link","data-lucy":t},e);return a.addEventListener("click",n),a},nu=()=>Ot()?W().beatAt(he()):null;function au(e){if(e.kind!=="recording")return null;const t=nu();return t===null?null:Math.max(0,Math.min(1,(t-e.beat)/e.lengthBeats))}const Zy=e=>{const t=Math.max(1,Math.ceil(e/4-1e-6));return t===1?"bar 1":`bars 1–${t}`};function e0(){const e=te.voice,t=te.jammingNow(),n=[];if(!Wt()&&(D.kind!=="idle"||oe.busy)){const i=jt(),s=W().beatAt(he()),l=oe.phase;if(i!==null)return n.push(Me({"data-lucy":"count"},P("span",{class:"lucy-big"},String(i)),Ue(`Count-in · then ${A.bars} bar${A.bars===1?"":"s"}`))),{key:`count|${i}`,nodes:n};if(l.kind==="waiting"||l.kind==="recording"&&s<l.startBeat)return n.push(Me({"data-lucy":"take-line"},Cn(!0),"Waiting for the Master")),{key:"master-wait",nodes:n};if(l.kind==="recording"){const c=Math.min(l.bars,Math.floor((s-l.startBeat)/4)+1);return n.push(Me({"data-lucy":"take-line"},Cn(),"Recording the Master",Ue(`· bar ${c} of ${l.bars}`))),{key:`master|${c}`,nodes:n}}if(D.kind!=="idle"&&s<D.startBeat){const c=Math.ceil((D.startBeat-s)/4);return n.push(Me({"data-lucy":"take-line"},Cn(!0),"Armed",Ue(`· recording in ${c} bar${c===1?"":"s"}`))),{key:`armed|${c}`,nodes:n}}if(D.kind!=="idle"){const c=Math.min(A.bars,Math.floor((s-D.startBeat)/4)+1);return n.push(Me({"data-lucy":"take-line"},Cn(),"Recording a take",Ue(`· bar ${c} of ${A.bars}`))),{key:`rec|${c}`,nodes:n}}}const a=i=>Math.max(1,Math.round(i/4));switch(e.kind){case"idle":return t&&n.push(Nn("Lupa is playing · records the next loop as a pass")),{key:`idle|${t}`,nodes:n};case"asking":return n.push(Me({"data-lucy":"voice-line"},Ue("Asking Lupa for its next loop…"))),{key:"asking",nodes:n};case"armed":{const i=nu(),r=i===null?null:Math.max(1,Math.ceil(e.beat-i-1e-9)),s=i===null?null:te.loopAt(i),l=e.started||!s?r!==null&&i!==null&&i>=e.beat-4?`Lupa is starting: count-in beat ${Math.min(4,Math.max(1,5-r))} of 4.`:"Lupa is starting.":`Lupa is on bar ${s.bar} of ${s.bars}, beat ${s.beat}. Records from bar 1.`;return n.push(P("div",{class:"lucy-big","data-lucy":"starts-in"},r===null?"Starts soon…":`Starts in ${r}…`),Me({},Ue(l)),Tn(a(e.lengthBeats),[],{start:!0}),Ln(a(e.lengthBeats))),{key:`armed|${r}|${l}`,nodes:n}}case"recording":{const i=a(e.lengthBeats),r=au(e)??0,s=Math.min(i,Math.floor(r*i)+1);return n.push(Me({"data-lucy":"voice-line"},Cn(),`Recording voice pass ${e.pass}`,Ue(`· bar ${s} of ${i}`)),Tn(i,e.peaks,{head:r}),Ln(i),Nn("Lupa records this one loop, then goes back to Play by itself. Cancel throws this loop away.")),{key:`rec|${s}|${e.peaks.length}`,nodes:n}}case"saving":{const i=a(e.lengthBeats);return n.push(Me({"data-lucy":"voice-line"},Ue(`Keeping voice pass ${e.pass}…`)),Tn(i,e.peaks),Ln(i)),{key:`saving|${e.peaks.length}`,nodes:n}}case"added":{const i=a(e.lengthBeats),r=e.keptBeats<e.lengthBeats-.001;return n.push(Me({"data-lucy":"voice-line","data-done":""},P("span",{"aria-hidden":"true"},"✓"),`Voice pass ${e.pass} added`,Ue(r?`(${Zy(e.keptBeats)}, the jam stopped)`:t?"· Lupa is back in Play":"")),Tn(i,e.peaks,{kept:e.keptBeats/e.lengthBeats}),Ln(i),Nn(tu("Undo","undo",()=>te.undo())," removes it from Lupa.")),{key:`added|${e.pass}|${r}|${t}`,nodes:n}}case"quiet":{const i=a(e.lengthBeats);return n.push(Me({"data-lucy":"voice-line","data-warn":""},"Too quiet: this loop was not kept"),Tn(i,e.peaks,{quiet:!0}),Ln(i),Nn("The mic never reached the mark. Sing closer or louder, or drag the mark left, then press Record another.")),{key:`quiet|${t}`,nodes:n}}case"undone":return n.push(Me({"data-lucy":"voice-line"},Ue(`Voice pass ${e.pass} is out of Lupa.`))),t&&n.push(Nn("Lupa is playing · records the next loop as a pass")),{key:`undone|${t}`,nodes:n};case"failed":return n.push(Me({"data-lucy":"voice-line","data-warn":""},e.text)),{key:`failed|${e.text}`,nodes:n}}}let vl="",wl=Number.NEGATIVE_INFINITY;function zr(e=!0){Qy();const t=performance.now();(e||t-wl>=100)&&(wl=t,t0()),n0()}function t0(){const e=Jy(),{key:t,nodes:n}=e0(),a=`${e.text}|${e.allow}|${t}`;if(a!==vl){vl=a;const i=P("p",{class:"lucy-status",role:"status","data-lucy":"mic-status"},e.text);e.warn&&(i.dataset.warn=""),e.allow&&i.append(" ",tu("Allow the mic","allow-mic",()=>void Ye())),Fr.replaceChildren(i,...n)}}function n0(){const e=au(te.voice);if(e!==null){const t=Fr.querySelector(".lucy-strip .head");if(t){const n=String(e*400);t.setAttribute("x1",n),t.setAttribute("x2",n)}}}function a0(e){const t=e?.querySelector('[data-nc-id="arm"]');if(!t||!e)return;let n=t;for(;n.parentElement&&n.parentElement!==e&&!n.parentElement.matches(".nc-module-body, .nc-section, [role=group]");)n=n.parentElement;n.nextElementSibling!==qo&&n.after(qo);const a=t.matches("button")?t:t.querySelector("button");if(a){const i=Wt()?te.busy?"stop":"rec":"";(a.getAttribute("data-lucy-mark")??"")!==i&&(i?a.setAttribute("data-lucy-mark",i):a.removeAttribute("data-lucy-mark"));const r=a.textContent??"";a.getAttribute("data-lucy-words")!==r&&(a.hasAttribute("data-lucy-words")&&(a.removeAttribute("data-lucy-fade"),a.offsetWidth,a.setAttribute("data-lucy-fade","")),a.setAttribute("data-lucy-words",r))}}function iu(e,t){if(e.update(t),t.id==="takes"){const a=e.el.querySelector(".nc-module-body");a&&Xn.el.parentElement!==a&&a.append(Xn.el)}const n=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)];vg(e.el,t.id,n,a=>ui.get(a)??a),t.id==="transport"&&(a0(e.el.querySelector(".nc-module-body")),zr())}const Dr=[Ly,zy,qy,Gy].map(e=>({def:e,handle:jm(e())}));Hm(Cr,Dr.map(e=>e.handle),"adjacent");Cr.dataset.lucyLayout="";F();function F(){for(const e of Dr)iu(e.handle,e.def());la(),Wy(),i0()}function i0(){const e=document.querySelector('[data-nc-id="hacks-compressor"]');if(!e)return;const t=K?.getChain().find(a=>a.type==="compressor")?.id??"compressor",n=tg(e,{source:jl(K,t),color:"var(--nc-ui-instrument-lucy)",threshold:()=>{const a=K?.getParam(t,"threshold_db");return typeof a=="number"?a:null},on:()=>K?K.getParam(t,"bypass")===!1:!1});q("comp-gauge",n)}function o0(){const e=Dr[1];e&&iu(e.handle,e.def()),zr(!1)}let kl="";const r0=document.title;let xl="",$l=0;const s0=matchMedia("(prefers-reduced-motion: reduce)");let Al="",El=0,Ml=!1;function ou(e){te.tick();const t=Wt();if(t!==Ml&&(Ml=t,F()),zr(!1),e-El>1e3){El=e;const d=JSON.stringify(xn().map(u=>[u.instance,u.name,u.targets.map(p=>p.name)]));d!==Al&&(Al=d,F())}if(D.kind!=="idle"){const d=W();D.kind==="armed"&&d.beatAt(he())>=D.startBeat&&(D={...D,kind:"recording"})}const n=sr(A.cue)?jt():null,a=gg(r0,n);document.title!==a&&(document.title=a);const i=Sy(),r=Xd();(i!==kl||r!==xl)&&(kl=i,xl=r,F()),oe.busy&&Py(),e-$l>3e4&&($l=e,la());const s=$r(),l=s.id===null?void 0:A.takes.find(d=>d.id===s.id);let c=s.at;if(s0.matches&&l&&c>=0){const d=l.frames/l.sampleRate/qt(l.bpm);c=Math.floor(c*d)/d}Xn.setPlayhead($t()?s.id:null,c),requestAnimationFrame(ou)}requestAnimationFrame(ou);Jb.start();if(Z)Se().then(()=>_e(A.selected)),Z.providePreset?.({format:gr,version:Ya,get:()=>Rb(A),set:Ay});else{const e=()=>{Se().then(()=>_e(A.selected))};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__lucy={state:A,clock:st,lupa:te,get recordLabel(){return Gd()},get voiceMode(){return Wt()},get ctx(){return T},get phase(){return D},get master(){return oe.phase},get count(){return Pe&&{id:Pe.id,times:Pe.times,badge:Pe.badge}},pressRecord:()=>Rd(),setSource:ra,get inputs(){return ke},get inputDeviceId(){return zt},get computer(){return ge&&{label:ge.label,channels:ge.channels}},get notice(){return H},shareComputer:Dd,stopComputer:Ja,receivers:xn,openSend:Pd,cards:Xn,trash:Wn,playheadAt:$r,heardNow:_d,beatAtContext:e=>W().beatAt(e-(fn?.offset??0)),get playStart(){return Bt?.when??null},get out(){return at},get peaks(){return Ne},get live(){return le},removeTake:Wd,rename:Ud,setRegion:Er,setSnap:Sr,setNormalize:Mr,get playGain(){return Ge?Ge.gain.gain.value:null},playTake:Tr,download:Ar,get sendPick(){return ae},set sendPick(e){ae=e,F()},sendTake:Od,get sendNote(){return Ht},get level(){return ot},get fx(){return K},roundTrip:oa,toContext:lt,takeAudio:e=>{const t=A.takes.find(n=>n.id===e);return t?je.load(t):null},takePlayed:e=>{const t=A.takes.find(n=>n.id===e);return t?Ut(t):null},repaint:()=>F(),async testInput(e,t=1){if(!await Se()||!T||!ie||!At)return;const n=e(T);n.connect(ie),n.connect(At),pe=n,ia=t,F()}};
