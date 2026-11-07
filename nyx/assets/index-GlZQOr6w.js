(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const St=1e-9;function zd(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class rr{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return zd(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=e.beat+St&&(o=s.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=e.beat+St)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+St){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-St;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(e,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(e-r)*l/s,n+a*(l-1)/s)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new rr({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+St)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+St)return n[a];return n[0]}}const Pd=Object.freeze({beatsPerBar:4,beatUnit:4}),Pt=1e-9;function Dd(t){return Math.floor(t+Pt)}function Rs(t,e,n=!1){if(!(e>0))return t;const o=Math.ceil(t/e-Pt)*e;return n&&o<=t+Pt?o+e:o}class Bd{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new rr({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Pd}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Pt&&(this.stopTime===null||e<this.stopTime-Pt)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Pt?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=Dd(e/n),o=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:o,barPhase:o/n}}nextBar(e,n=!1){return Rs(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const Is="nc-clock/snapshot",js=1;function Od(t,e="local"){return{format:Is,version:js,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function qd(t,e){const n=Rd(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}const Ce=t=>typeof t=="number"&&Number.isFinite(t),di=t=>t===null||Ce(t);function Rd(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==Is&&n("format"),(!Ce(e.version)||Math.floor(e.version)!==js)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!Ce(e.anchor.beat)||!Ce(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&Ce(a.beat)&&Ce(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!Ce(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!Ce(e.meter.beatUnit))&&n("meter"),(!di(e.startTime)||!di(e.stopTime)||!Ce(e.stoppedBeat))&&n("transport times"),e}class Id{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Bd(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){qd(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Od(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const jd="nc-sync/1",_d=1,Hd="nc-sync",Wd="nc-sync-leader",Ud=0,_s=.5,Hs=.75;function Gd(t){return typeof t=="number"&&Number.isFinite(t)&&t>=_s&&t<=Hs?t:null}const Ia=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),en=t=>typeof t=="number"&&Number.isFinite(t),Dn=t=>typeof t=="string"&&t.length>0;function Yd(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==_d||!Dn(e.type)||!Dn(e.from)||!en(e.term)||!en(e.seq)||!en(e.sentAt))return null;switch(e.type){case"hello":return Dn(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return en(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&en(e.slot)?e:null;case"ping":case"pong":return Dn(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function Kd(t,e,n,a,o){return{proto:jd,from:e,term:n,seq:a,sentAt:o,...t}}function ne(){return(performance.timeOrigin+performance.now())/1e3}const ja=.003,Xd=3,_a=.002+1e-6,Vd=.01,ui=500;class pi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Vd:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=ja&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const o=this.heldBase()!==null,r=this.ctx.currentTime,s=r<=this.revertUntil;let l;if(a&&s){const c=this.offsets,d=this.preStep;c.length=0;for(let u=0;u<d.length;u++)c.push(d[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!s){const u=this.offsets,p=this.preStep;p.length=0;for(let h=0;h<u.length;h++)p.push(u[h]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,d=e-n;for(let u=0;u<c.length;u++)c[u]+=d;this.stepCount++,l={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!o)for(const c of[...this.stepListeners])c(l);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const s=e[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const o=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=ja&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<ui)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=ja)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<ui)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(Xd,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let c=0;for(let d=0;d<n;d++)Math.abs(e[d]-e[l])<=_a&&c++;c>r&&(o=l,r=c)}if(r<a)return;const s=e[o];for(let l=n-1;l>=0;l--)Math.abs(e[l]-s)>_a&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-this.estimate())<=_a}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class Qd{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...Ia,...e.capabilities},this.channelOption=e.channel??Hd,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),r=()=>{n===this.startWaits&&e(o)};return a.then(r,r),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?o:Math.max(e+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[o,r]=this.tempoRange();e=Math.min(r,Math.max(o,e));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(e),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),d=Math.max(n??Rs(c,1),c);a&&a>0?(s.tempo.rampTempo(e,d,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,d),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Hs,Math.max(_s,e)):Ud;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Gd(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=Yd(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Ia,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Ia},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Wd,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=r.id)}this.setLeader(o===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(Kd(e,this.id,this.term,++this.seq,this.o.now()))}}const Jd="modulepreload",Zd=function(t){return"/nyx/"+t},hi={},eu=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=s(n.map(d=>{if(d=Zd(d),d in hi)return;hi[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Jd,u||(h.as="script"),h.crossOrigin="",h.href=d,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((m,g)=>{h.addEventListener("load",m),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var tu=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],mo=[.25,.5,.75,1,1.5,2],nu=4.9,X={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},it={fmt:"wet"},Ee={fmt:"pct"},Mt={fmt:"db"},Bn={fmt:"signedPct"},Ha={fmt:"num",suffix:" ms"},Y={div:100};function C(t,e,n,a,o,r,s,l){var c={key:t,label:e,min:n,max:a,default:o,step:1,k:r,unit:null,format:s};if(l)for(var d in l)c[d]=l[d];return c}function On(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var dn=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:X.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[C("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:X.hpHz,astrid:!0,zero:"off"}),C("q","Resonance",0,100,0,2,{fmt:"q",law:X.hpQ},{dsp:{law:X.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[C("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:X.bpHz,astrid:!0},{dsp:{law:X.bpHz}}),C("q","Q",0,100,0,2,{fmt:"q",law:X.bpQ},{dsp:{law:X.bpQ}}),C("mix","Mix",0,100,100,3,it,{dsp:Y,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[C("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:On(tu),overriddenBy:"beats_free",tempoSynced:!0}),C("feedback","Feedback",0,90,35,2,Ee,{dsp:Y,unit:"%"}),C("mix","Wet/dry",0,100,0,3,it,{dsp:Y,unit:"%",astridKey:"wet"}),C("tone","Tone",0,100,100,4,{fmt:"hz",law:X.delayTone,offAt:100},{dsp:{div:99},more:!0}),C("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),C("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:On([[0,"Insert"],[1,"Send"]]),more:!0}),C("send","Send",0,100,100,7,Ee,{dsp:Y,unit:"%",more:!0}),C("mod_send","Accent → send",-100,100,0,8,Bn,{dsp:Y,unit:"%",more:!0}),C("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[C("predelay","Pre-delay",0,200,0,1,Ha,{dsp:{div:1e3},unit:"ms"}),C("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:Y,unit:"%"}),C("decay","Decay",0,100,50,3,Ee,{dsp:Y,unit:"%"}),C("damping","Damping",0,100,0,4,Ee,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,0,5,it,{dsp:Y,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[C("rate","Rate",0,100,26,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,70,2,Ee,{dsp:Y,unit:"%"}),C("feedback","Feedback",-90,90,50,3,Bn,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,50,4,it,{dsp:Y,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[C("rate","Rate",0,100,52,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,50,2,Ee,{dsp:Y,unit:"%"}),C("spread","Spread",0,100,70,3,Ee,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,40,4,it,{dsp:Y,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[C("rate","Rate",0,100,39,1,{fmt:"rate",law:X.rate},{dsp:{law:X.rate}}),C("depth","Depth",0,100,70,2,Ee,{dsp:Y,unit:"%"}),C("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:On([[4,"4"],[6,"6"],[8,"8"]])}),C("feedback","Feedback",0,90,30,4,Ee,{dsp:Y,unit:"%"}),C("mix","Mix",0,100,50,5,it,{dsp:Y,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[C("low_db","Low",-18,18,0,1,Mt,{unit:"dB"}),C("mid_db","Mid",-18,18,0,2,Mt,{unit:"dB"}),C("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:X.midHz,astrid:!0},{dsp:{law:X.midHz}}),C("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:X.eqQ},{dsp:{law:X.eqQ}}),C("high_db","High",-18,18,0,4,Mt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[C("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),C("output_db","Output",-12,12,0,2,Mt,{unit:"dB"}),C("mix","Mix",0,100,100,3,it,{dsp:Y,unit:"%"}),C("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:On([[0,"Smooth"],[1,"Acid"]]),more:!0}),C("tone","Tone",0,100,100,5,{fmt:"hz",law:X.driveTone,offAt:100},{dsp:{div:99},more:!0}),C("mod_drive","Accent → drive",-100,100,0,6,Bn,{dsp:Y,unit:"%",more:!0}),C("mod_tone","Accent → tone",-100,100,0,7,Bn,{dsp:Y,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[C("threshold_db","Threshold",-60,0,0,1,Mt,{unit:"dB"}),C("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:X.ratio},{dsp:{law:X.ratio}}),C("attack_ms","Attack",1,100,10,3,Ha,{unit:"ms"}),C("release_ms","Release",10,1e3,150,4,Ha,{unit:"ms"}),C("makeup_db","Makeup",0,24,0,5,Mt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[C("width","Width",0,200,100,1,Ee,{dsp:Y,unit:"%"}),C("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:Y})]}],au=dn.map(function(t){return t.type});dn.filter(function(t){return!t.hidden}).map(function(t){return t.type});var ou={reverb:"plate"};function ir(t){var e=ou[t]||t;return au.indexOf(e)>=0?e:null}function qe(t){for(var e=ir(t),n=0;n<dn.length;n++)if(dn[n].type===e)return dn[n];return null}function Ft(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Ws(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Ft(n.law,e);return a===null?0:a}function fi(t,e){return Math.min(nu,t*60/(e>0?e:120))}var mi=function(t){return t>0?"+":t<0?"−":""};function ru(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Us(t,e,n){var a=t.format,o;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:mi(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return mi(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(o=Ft(a.law,e),o===null?a.zero||"open":a.astrid?ru(o):o+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ft(a.law,e).toFixed(1);case"ratio":return Ft(a.law,e).toFixed(1)+":1";case"rate":return o=Ft(a.law,e),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(fi(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(fi(e,n)*1e3)+" ms"}return String(e)}var iu=1,Sa=["drive","delay","plate"];function su(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,o){return Us(t,a,o)},e}var un=Sa.map(function(t){var e=qe(t),n={type:t,label:e.label,dials:e.dials.map(su)};return e.tempoSynced&&(n.tempoSynced=!0),n}),lu={reverb:"plate"};function aa(t){var e=lu[t]||t;return Sa.indexOf(e)>=0?e:null}function Ma(t){for(var e=aa(t),n=0;n<un.length;n++)if(un[n].type===e)return un[n];return null}function Gs(t,e){var n=Ma(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Rt(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function Je(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,o=1;o<t.options.length;o++)Math.abs(t.options[o].value-e)<Math.abs(a-e)&&(a=t.options[o].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function cu(){return{v:iu,chain:un.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function du(t){return mo.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},mo[0])}function Wa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function uu(t){for(var e=Array.isArray(t)?t:Wa(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=cu(),o={},r=[],s=0;s<e.length;s++){var l=e[s];if(Wa(l)){var c=aa(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(o[c]){r.push(c);continue}o[c]=!0;var d=a.chain[Sa.indexOf(c)],u=Wa(l.dials)?l.dials:{};c==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),d.bypass=n?l.bypass===!0:l.bypass!==!1,Ma(c).dials.forEach(function(p){d.dials[p.key]=Je(p,u[p.key])}),pu(c,d.dials,u)}}return{state:a,dropped:r}}function pu(t,e,n){for(var a=Ma(t),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(e[r.key]=Je(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Rt(r,e)))}}function go(t){return uu(t).state}function hu(t){return JSON.parse(JSON.stringify(t))}var fu=24,bo={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function yo(t,e,n){if(e==="bypass")return n?0:1;var a=Gs(t,e)||mu(t,e);return a?Ws(a,n):0}function mu(t,e){var n=qe(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var gu={};un.forEach(function(t){t.dials.forEach(function(e){gu[t.type+"."+e.key]=e.format})});function Ua(t,e){var n=new Float64Array(fu),a=go(t);return a.chain.forEach(function(o){var r=bo[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=yo(o.type,s,o.dials[s])})}),n}var bu=2,oa=3,yu=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function tn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ys(t,e){var n=qe(t);if(!n)return null;var a={};(e||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function wu(t){var e=qe(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function vu(t,e,n){var a=t.length-1,o=Math.max(0,Math.min(a,n));if(e<0||e>a||e===o)return t;var r=t.slice(),s=r.splice(e,1)[0];return r.splice(o,0,s),r}function xu(t){return typeof t=="number"&&isFinite(t)?du(t):t}function gi(t,e,n){var a={};return t.dials.forEach(function(o){var r=e[o.key];r===void 0&&o.astridKey&&(r=e[o.astridKey]),n&&t.type==="delay"&&o.key==="delay_beats"&&(r=xu(r)),a[o.key]=Je(o,r)}),t.dials.forEach(function(o){o.stepWhen&&(a[o.key]=Je(o,typeof e[o.key]=="number"?e[o.key]:a[o.key],Rt(o,a)))}),a}function ku(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,o=1/0,r=t.min;r<=t.max;r++){var s=Ft(n.law,r),l=s===null?1/0:Math.abs(s-e);l<o&&(o=l,a=r)}return a}}var $u={rate:"rate_hz"};function Au(t,e,n,a){var o={};return t.dials.forEach(function(r){if(!r.more){var s=r.astridKey||$u[r.key]||r.key;o[r.key]=ku(r,e[s])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function Eu(t,e){var n=e>0?Math.floor(e):oa,a=[],o=[],r=[],s=!1,l=!1;Array.isArray(t)?(r=t,l=!0):tn(t)&&Array.isArray(t.chain)&&(r=t.chain,s=t.v===1,l=t.schema===2);for(var c=[],d=0;d<r.length;d++){var u=r[d];if(tn(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=ir(u.type),h=p&&qe(p);if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(c.length>=n){a.push(u.id||p);continue}var m;tn(u.params)&&!tn(u.dials)?m=gi(h,Au(h,u.params,o,u.id||p),l):m=gi(h,tn(u.dials)?u.dials:{},l);var g=Ys(p,c),w=typeof u.id=="string"&&yu.test(u.id)&&!c.some(function(b){return b.id===u.id})?u.id:g.id,f=s?u.bypass!==!1:u.bypass===!0;c.push({id:s?g.id:w,type:p,bypass:f,dials:m})}}return{state:{v:bu,chain:c},dropped:a,notes:o}}function Gn(t,e){return Eu(t,e).state}function Lt(t){var e=qe(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,Ws(a,t.dials[a.key])])}),n}function Su(t){var e=Gn(t,8),n=[],a=e.chain.map(function(o,r){var s=qe(o.type),l={};return r>=oa&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var d=o.dials[c.key];if(c.more){d!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&mo.indexOf(d)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=d}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var Mu="nc-fx@1",Lu=600,Tu=256,Cu=8,nn=typeof WeakMap=="function"?new WeakMap:null;function Nu(t,e){var n=nn&&nn.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await eu(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),nn&&(nn.set(t,n),n.catch(function(){nn.delete(t)})),n)}function Tt(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Ks(t,e,n,a){var o=Math.min(400,Math.max(20,Tt(e.bpm,120))),r=[],s=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",c=Tt(e.preGain,1),d=Math.max(0,Tt(e.crossfade,.012)),u=Tt(e.maxDelaySeconds,void 0),p=t.createGain(),h=t.createGain(),m=t.createGain(),g=t.createGain(),w=null;e.modInput===!0&&(w=t.createGain(),w.channelCount=1,w.channelCountMode="explicit",w.channelInterpretation="discrete"),g.gain.value=0,p.connect(m),m.connect(h),g.connect(h);var f={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o,mUsers:0,lv:null,lvAt:0},b=n(o);f.post=function(k){f.node?f.node.port.postMessage(k):f.disposed||(r.length>=Tu&&(r=a().concat([{t:"tempo",bpm:f.bpm,when:0}]),f.mUsers>0&&r.push({t:"meter",on:!0})),r.push(k))};function y(k){var A=r.map(function(S){var L=Object.assign({},S);return L.when>k||(L.when=0,L.t!=="clear"&&(L.snap=!0)),L});return r=[],A}f.emit=function(k){for(var A=0;A<f.listeners.length;A++)try{f.listeners[A](k)}catch(S){typeof console<"u"&&console.error(S)}},f.whenOf=function(k){return typeof k=="number"&&isFinite(k)&&k>0?k:0};var v=!1;f.tooFar=function(k){return typeof k=="number"&&k>t.currentTime+Lu?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round(k-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var x=Nu(t,e.moduleUrl).then(function(){if(!f.disposed){var k=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:u},b);k.pending=y(t.currentTime),f.node=new AudioWorkletNode(t,Mu,{numberOfInputs:w?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:k}),f.node.port.onmessage=function(S){var L=S.data;L&&L.t==="lv"&&f.mUsers>0&&(f.lv=L.d,f.lvAt=bi())},p.connect(f.node),w&&w.connect(f.node,0,1),f.node.connect(g);var A=t.currentTime;A<=0||d===0?(m.gain.value=0,g.gain.value=1):(m.gain.setValueAtTime(1,A),m.gain.linearRampToValueAtTime(0,A+d),g.gain.setValueAtTime(0,A),g.gain.linearRampToValueAtTime(1,A+d)),f.status="ready"}},function(k){f.status="unavailable",r=[],f.error=k});f.meterOpen=function(){return f.disposed||f.status==="unavailable"?!1:(f.mUsers++===0&&f.post({t:"meter",on:!0}),!0)},f.meterClose=function(){f.mUsers!==0&&--f.mUsers===0&&(f.lv=null,f.disposed||f.post({t:"meter",on:!1}))},f.levels=function(){return f.lv&&bi()-f.lvAt<Fu?f.lv:null};var $={};return f.meter=function(k,A){if($[k])return $[k];var S=0,L={in:0,out:0},_={open:function(){return f.meterOpen()?(S++,!0):!1},close:function(){S!==0&&(S--,f.meterClose())},read:function(){var U=S>0?f.levels():null;return L.in=0,L.out=0,U&&A(U,L),L}};return $[k]=_,_},f.core={input:p,output:h,modInput:w,ready:x,get status(){return f.status},get error(){return f.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:s,setTempo:function(k,A){var S=Tt(k,NaN);!(S>0)||f.disposed||f.tooFar(A)||(f.bpm=Math.min(400,Math.max(20,S)),f.post({t:"tempo",bpm:f.bpm,when:f.whenOf(A)}),f.emit({effect:null,key:"tempo",value:f.bpm}))},getTempo:function(){return f.bpm},clear:function(k){var A=k&&typeof k=="object"?k:{at:k};if(!(f.disposed||f.tooFar(A.at))){var S=Tt(A.fadeMs,0);f.post({t:"clear",when:f.whenOf(A.at),fadeMs:S>0?Math.min(1e3,S):0})}},onChange:function(k){return f.listeners.push(k),function(){var A=f.listeners.indexOf(k);A>=0&&f.listeners.splice(A,1)}},dispose:function(){if(!f.disposed){if(f.disposed=!0,f.status="disposed",r=[],f.listeners.length=0,f.node){f.node.port.postMessage({t:"dispose"}),f.node.port.close();try{f.node.disconnect()}catch{}}[p,m,g,h,w].forEach(function(k){try{k&&k.disconnect()}catch{}})}}},f}var Fu=250;function bi(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Xs(t,e){e.in=t[0],e.out=t[1]}function zu(t,e){return t&&typeof t.meter=="function"?t.meter(e):null}function Pu(t,e){var n=e||{};if(n.slots)return Du(t,n);var a=go(n.state),o=Array.from(Ua(a)),r=Ks(t,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Ua(a)),when:0}]}),s=r.core;function l(c){return a.chain[Sa.indexOf(c)]}return s.setParam=function(c,d,u,p){var h=aa(c);if(!(!h||r.disposed||r.tooFar(p))){var m=l(h),g;if(d==="bypass")g=!!u;else{var w=Gs(h,d);if(!w)return;g=Je(w,u,Rt(w,m.dials))}return d==="bypass"?m.bypass=g:m.dials[d]=g,r.post({t:"p",i:bo[h][d],v:yo(h,d,g),when:r.whenOf(p)}),r.emit({effect:h,key:d,value:g}),Ma(h).dials.forEach(function(f){if(!(!f.stepWhen||!f.stepWhen.some(function(v){return v.key===d}))){var b=m.dials[f.key],y=Je(f,b,Rt(f,m.dials));y!==b&&(m.dials[f.key]=y,r.post({t:"p",i:bo[h][f.key],v:yo(h,f.key,y),when:r.whenOf(p)}),r.emit({effect:h,key:f.key,value:y}))}}),g}},s.meter=function(){return r.meter("",Xs)},s.getParam=function(c,d){var u=aa(c);if(u){var p=l(u);return d==="bypass"?p.bypass:p.dials[d]}},s.getState=function(){return hu(a)},s.setState=function(c,d){r.disposed||r.tooFar(d&&d.at)||(a=go(c),r.post({t:"load",program:Array.from(Ua(a)),when:r.whenOf(d&&d.at)}),r.emit({effect:null,key:null,value:null}))},s}function Du(t,e){var n=e.slots===!0?oa:Math.max(1,Math.min(Cu,Math.floor(+e.slots)||oa)),a=Gn(e.state,n),o=1,r={};function s(f){return r[f.id]||(r[f.id]=o++),r[f.id]}function l(f){return f.map(function(b){return{uid:s(b),type:b.type,program:Lt(b)}})}var c=l(a.chain),d=a.chain.map(function(f){return r[f.id]}),u=Ks(t,e,function(){return{slots:n,chain:c,order:d}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(f){return r[f.id]}),when:0}]}),p=u.core;function h(f){var b;for(b=0;b<a.chain.length;b++)if(a.chain[b].id===f)return a.chain[b];var y=ir(f);if(y){for(b=0;b<a.chain.length;b++)if(a.chain[b].type===y)return a.chain[b]}return null}function m(f,b){var y=s(f);u.post({t:"add",uid:y,type:f.type,when:b}),Lt(f).forEach(function(v){u.post({t:"ps",uid:y,k:v[0],v:v[1],when:b,snap:!0})})}function g(f){u.post({t:"order",uids:a.chain.map(function(b){return r[b.id]}),when:f})}function w(f,b){var y={};a.chain.forEach(function($){y[$.id]=$});var v=a.chain.map(function($){return r[$.id]}).join();f.chain.forEach(function($){var k=y[$.id];if(!k||k.type!==$.type){delete r[$.id],m($,b);return}var A={};Lt(k).forEach(function(S){A[S[0]]=S[1]}),Lt($).forEach(function(S){A[S[0]]!==S[1]&&u.post({t:"ps",uid:r[$.id],k:S[0],v:S[1],when:b})})});var x={};f.chain.forEach(function($){x[$.id]=!0}),Object.keys(r).forEach(function($){x[$]||delete r[$]}),a=f,a.chain.map(function($){return r[$.id]}).join()!==v&&g(b)}return p.slots=n,p.meter=function(f){return f==null||f===""?u.meter("",Xs):u.meter("#"+f,function(b,y){var v=h(f),x=v?r[v.id]:0,$=b[2];if(x){for(var k=3,A=0;A<$;A++,k+=3)if(b[k]===x){y.in=b[k+1],y.out=b[k+2];return}}})},p.setParam=function(f,b,y,v){var x=h(f);if(!(!x||u.disposed||u.tooFar(v))){var $=qe(x.type),k,A=null;if(b==="bypass")k=!!y;else{for(var S=0;S<$.dials.length;S++)$.dials[S].key===b&&(A=$.dials[S]);if(!A)return;k=Je(A,y,Rt(A,x.dials))}var L={},_={};Lt(x).forEach(function(q){L[q[0]]=q[1]}),$.dials.forEach(function(q){q.stepWhen&&(_[q.key]=x.dials[q.key])}),b==="bypass"?x.bypass=k:x.dials[b]=k,$.dials.forEach(function(q){q.stepWhen&&(x.dials[q.key]=Je(q,x.dials[q.key],Rt(q,x.dials)))});var U=u.whenOf(v),ce=r[x.id];return Lt(x).forEach(function(q){(L[q[0]]!==q[1]||A&&q[0]===A.k)&&u.post({t:"ps",uid:ce,k:q[0],v:q[1],when:U})}),u.emit({effect:x.id,key:b,value:k}),Object.keys(_).forEach(function(q){q!==b&&x.dials[q]!==_[q]&&u.emit({effect:x.id,key:q,value:x.dials[q]})}),k}},p.getParam=function(f,b){var y=h(f);if(y)return b==="bypass"?y.bypass:y.dials[b]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(f,b){u.disposed||u.tooFar(b&&b.at)||(w(Gn(f,n),u.whenOf(b&&b.at)),u.emit({effect:null,key:null,value:null}))},p.addEffect=function(f,b){var y=b||{},v=Ys(f,a.chain);if(!(!v||a.chain.length>=n||u.disposed||u.tooFar(y.at))){if(y.dials){var x=Gn({v:2,chain:[{id:v.id,type:v.type,dials:y.dials}]},1).chain[0];v.dials=x.dials}y.bypass===!0&&(v.bypass=!0);var $=a.chain.slice(),k=typeof y.index=="number"?Math.max(0,Math.min($.length,y.index)):$.length;return $.splice(k,0,v),w({v:2,chain:$},u.whenOf(y.at)),u.emit({effect:v.id,key:"chain",value:"add"}),v.id}},p.removeEffect=function(f,b){var y=h(f),v=b&&b.at;return!y||u.disposed||u.tooFar(v)?!1:(w({v:2,chain:a.chain.filter(function(x){return x!==y})},u.whenOf(v)),u.emit({effect:y.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(f,b,y){var v=h(f),x=y&&y.at;if(!v||u.disposed||u.tooFar(x))return!1;var $=vu(a.chain,a.chain.indexOf(v),b);return $===a.chain?!1:(w({v:2,chain:$},u.whenOf(x)),u.emit({effect:v.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(f){return{id:f.id,type:f.type,name:wu(f),bypass:f.bypass}})},p.toAstrid=function(){return Su(a)},p}function yi(t,e){return typeof t=="number"?t:t?typeof t.bpmAt=="function"?+t.bpmAt(e||0):typeof t.bpm=="number"?t.bpm:NaN:NaN}function Bu(t,e,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(h){return o.toContextTime(h)}:e&&e.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=e&&e.transport?e.transport:e,c=l&&l.tempo?l.tempo:l,d=!1;function u(h){if(!r){!d&&typeof console<"u"&&(d=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var m=r(l.timeAt(h));return typeof m=="number"&&isFinite(m)?m:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var m=l&&typeof l.bpm=="number"?l.bpm:yi(c,0);m>0&&t.setTempo(m);return}var g=yi(c,h);g>0&&t.setTempo(g);for(var w=c&&(c.points||c.tempoPoints)||[],f=0;f<w.length;f++){var b=w[f];if(b.beat>h&&b.bpm>0){var y=u(b.beat);y!==void 0&&t.setTempo(b.bpm,y)}}}return p(),!e||typeof e.onChange!="function"?function(){}:e.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?t.setTempo(h.bpm,u(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const Ou="/nyx/assets/worklet-CAv1bvAp.js";var qu="nc-ui",Ru={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},sr={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ra={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Iu={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ke={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ju={light:{color:Ru.color,semantic:sr,component:ra,runtime:Iu},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},sn=t=>`--${qu}-${t}`,wo=sr["label-on-fill-dark"],wi=sr["label-on-fill-light"],_u=Ke["label-min-contrast"],Hu=/^#[0-9a-f]{6}$/i,Wu=t=>typeof t=="string"&&Hu.test(t),Yn=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function vi(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));let a=e*Math.min(n,1-n),o=r=>{let s=(r+t/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Yn(o(0)*255)}${Yn(o(8)*255)}${Yn(o(4)*255)}`}function Vs(t){let[e,n,a]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),o=Math.max(e,n,a),r=Math.min(e,n,a),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((o===e?60*((n-a)/l%6):o===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:c,l:s}}function xi(t){let[e,n,a]=[1,3,5].map(o=>{let r=parseInt(t.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function vo(t,e){let[n,a]=[xi(t),xi(e)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var ia=t=>vo(t,wo)>=vo(t,wi)?wo:wi;function Qs(t,e,n,a=_u){let o=vi(t,e,n),r=ia(o)===wo?1:-1;for(let s=0;s<40&&vo(o,ia(o))<a;s++)n+=r*.01,o=vi(t,e,n);return o}function Uu(t){let{h:e,s:n}=Vs(t),a=Qs(e,Math.min(n,Ke["surprise-on-max-saturation"]),Ke["surprise-on-lightness"]);return{fill:t,ink:ia(t),on:a,onInk:ia(a)}}var Gu=(t,e)=>{let n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Yu(t,e=Math.random){let[n,a]=Ke["surprise-saturation"],[o,r]=Ke["surprise-lightness"],s=Ke["surprise-min-hue-gap"],l=Wu(t)?Vs(t).h:null,c=e()*360;return l!==null&&Gu(c,l)<s&&(c=(l+s+e()*(360-2*s))%360),Qs(c,n+e()*(a-n),o+e()*(r-o))}function Ku(t){if(!t)return null;let e=Uu(t);return{[sn("surprise-fill")]:e.fill,[sn("surprise-ink")]:e.ink,[sn("surprise-on")]:e.on,[sn("surprise-on-ink")]:e.onInk}}var Xu=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Vu=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ki(t){let[e,n,a]=[1,3,5].map(l=>Xu(parseInt(t.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function Qu([t,e,n]){let a=(t+.3963377774*e+.2158037573*n)**3,o=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(s=>Yn(Vu(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Ju=Ke["velocity-range"],Js={min:ra.rhythm["velocity-min"],max:ra.rhythm["velocity-max"]},$i=Object.fromEntries(Object.entries(ju).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function Zu(t,e=Js){let[n,a]=Ju,o=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(o-n)/(a-n),s=e.ink??ra.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:e.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:e.max.toUpperCase(),ink:s};let l=ki(e.min),c=ki(e.max);return{velocity:o,t:r,fill:Qu(l.map((d,u)=>d+(c[u]-d)*r)),ink:s}}function Ai(t,e=Js){return{[sn("velocity-fill")]:Zu(t,e).fill}}var Zs="data-nc-theme",Ei="nc-ui-theme-change",ep="(prefers-color-scheme: dark)",el=t=>t?.documentElement??null,tl=t=>t?.defaultView?.matchMedia?.(ep)??null,tp=t=>t==="light"||t==="dark"?t:"system";function np(t=globalThis.document){return tp(el(t)?.getAttribute(Zs))}function xo(t=globalThis.document){let e=np(t);return e!=="system"?e:tl(t)?.matches?"dark":"light"}function nl(t,e=globalThis.document){let n=el(e);if(!n)return()=>{};let a=xo(e),o=()=>{let c=xo(e);c!==a&&(a=c,t(c))},r=e.defaultView?.MutationObserver,s=r?new r(o):null;s?.observe(n,{attributes:!0,attributeFilter:[Zs]});let l=tl(e);return l?.addEventListener?.("change",o),e.addEventListener(Ei,o),()=>{s?.disconnect(),l?.removeEventListener?.("change",o),e.removeEventListener(Ei,o)}}var ap={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},op={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},rp={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ip={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},La={};for(let[t,e]of Object.entries(op))La[t]={prop:`--nc-ui-${t}`,kind:e,tier:"semantic"};for(let[t,e]of Object.entries(ip))La[t]={prop:`--nc-ui-${t}`,kind:e,tier:"runtime"};for(let[t,e]of Object.entries(rp))La[`rhythm.${t}`]={prop:`--nc-rhythm-${t}`,kind:e,tier:"rhythm"};new Map(ap.renames.map(t=>[t.old,t.new]));function al(t){let e=La[t];if(!e)throw new Error(`Unknown token "${t}". Add it to src/alias.js.`);return e}function H(t){return al(t).prop}function i(t){return`var(${H(t)})`}function sp(t,e){if(!(t instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(t).getPropertyValue(H(e)));return Number.isFinite(n)?n:0}function J(t,e){let n=al(e),a=t.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=e,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(t instanceof Element?t:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function ol(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}function lp(t){let e=t.ownerDocument??document,n=e.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(t instanceof Element?t:e.documentElement).append(n);let a=(e.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var cp="[data-modulated], [data-modulated] *";function Ga(t){let e=`${t}.nc-group[data-nc-collapse="phone"]`;return`  ${e} { display: flex; }
  ${e} > .nc-group-toggle { display: grid; }
  ${e} > .nc-group-body { display: flex; }
  ${e}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Si(t){let e=`${t}.nc-stack[data-nc-layout="adjacent"]`;return`  ${e} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${e} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${e} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function dp(){let t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${H("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${H("divider")}: ${i(`module-div-stack-${a}`)};
      ${H("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${H("text-sub")}: ${i("module-sub-stack-1")};
      ${H("divider")}: ${i("module-div-stack-1")};
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
${cp} { transition: none; }
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
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${i("rhythm.step-mark-inset")};
  bottom: ${i("rhythm.step-mark-inset")};
  font-family: ${i("font-readout")};
  font-size: ${i("rhythm.step-mark-size")};
  font-weight: ${i("control-weight")};
  line-height: 1;
  color: ${i("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${i("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${i("rhythm.step-mark-inset")} + ${i("rhythm.accent-mark-size")});
}
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
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${i("module-gap")}; }
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
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${i("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${i("slot-gap")};
  height: ${i("level-steps-height")};
  padding: calc(${i("slot-gap")} * 2);
  background: ${i("eq-graph-bg")};
  border-radius: ${i("slot-radius")};
  box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${i("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${i("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${i("beat-gap")} - ${i("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${i("level-steps-bar")}; }
.nc-lsteps-env { fill: ${i("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${i("level-steps-curve")}; stroke-width: ${i("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${i("divider")}; stroke-width: ${i("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${i("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${i("hairline")} ${i("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${i("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${i("playhead-width")} solid ${i("playhead")}; outline-offset: ${i("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${i("level-steps-free")}; outline-width: ${i("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${i("playhead-width")} * -1) 0 0 ${i("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${i("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${i("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${i("slot-gap")} * 2) * -1));
  padding: calc(${i("slot-gap")} / 2) calc(${i("slot-gap")} * 2);
  border-radius: ${i("slot-radius")};
  background: ${i("accent")};
  color: ${i("on-accent")};
  font-family: ${i("font-readout")};
  font-size: ${i("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${i("slot-gap")};
  padding: ${i("slot-gap")} calc(${i("slot-gap")} * 2) 0;
  font-family: ${i("font-readout")};
  font-size: ${i("slot-font-size")};
  line-height: 1;
  color: ${i("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${i("hairline")} solid ${i("divider")}; margin-top: ${i("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${i("slot-gap")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${i("slot-gap")} 0 ${i("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${i("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${i("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${i("hairline")} * -1);
  height: ${i("tab-mark")};
  background: ${i("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${i("label-size")} * 1.8); height: calc(${i("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${i("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${i("slot-gap")};
  padding: calc(${i("slot-gap")} * 2);
  background: ${i("surface-page")};
  border-radius: ${i("slot-radius")};
  box-shadow: 0 0 0 ${i("hairline")} ${i("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${i("slot-gap")} * 2); font-family: ${i("font-readout")}; font-size: ${i("readout-size-small")}; color: ${i("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${i("slot-gap")} * 2); border-radius: ${i("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${i("on-accent")}; background: ${i("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${i("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${i("target-min")}; }
}
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
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${i("control-gap")}; margin-bottom: ${i("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
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
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
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
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${H("text-sub")}: ${i("module-sub-stack-1")};
  ${H("divider")}: ${i("module-div-stack-1")};
  ${H("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${H("text-sub")}: inherit;
  ${H("divider")}: inherit;
  ${H("slider-track")}: inherit;
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
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${i("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${i("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${i(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${H("divider")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${H("meter-track")}: color-mix(in oklab, ${i("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${i("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${i("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${i("control-gap")};
  min-width: calc(${i("strip-width")} * 2.5);
  padding: calc(${i("control-gap")} * 2) calc(${i("control-gap")} * 2.5);
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: ${i("surface-page")};
  color: ${i("text")};
  font-size: ${i("label-size")};
}
.nc-strip-menu-title { color: ${i("text-sub")}; font-weight: ${i("label-weight")}; letter-spacing: ${i("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${i("control-gap")}; margin-bottom: ${i("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${i("control-gap")} * 4.5);
  height: calc(${i("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${i("hairline")};
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${i("text-sub")};
  font: inherit;
  font-size: ${i("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${i("hairline")} * 2) solid ${i("text")}; outline-offset: ${i("hairline")}; color: ${i("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${i("control-gap")} * 3);
  margin: 0;
  padding: ${i("control-gap")} 0;
  border: 0;
  border-top: ${i("hairline")} solid ${i("divider")};
  background: transparent;
  color: ${i("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${i("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${i("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(${i("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${i("target-min")} * 0.7); height: calc(${i("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${i("target-min")}; align-items: center; }
}
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
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${i("control-gap")};
  right: ${i("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${i("hairline")};
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${i("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${i("control-gap")} * 1.5);
  height: calc(${i("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${i("hairline")}, transparent calc(${i("hairline")} * 1.5)) 0 0 / calc(${i("control-gap")} * 0.75) calc(${i("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${i("control-gap")} * -1);
    top: calc(${i("control-gap")} * -1);
    width: calc(${i("target-min")} / 2);
    height: calc(${i("target-min")} / 2);
  }
}
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
/* Trim (a strip's trim, or the master's trimRow): a knob row at the top, under the name, before the Inserts; every row
   still named. trimHidden (the host's phones) takes the row out, the knob kept unseen. Folded, the trim row joins the
   M and S area. */
.nc-strip > .nc-strip-trim { grid-area: trim; display: flex; justify-content: center; align-items: flex-start; }
.nc-strip:not([data-nc-trim]) > .nc-strip-trim, .nc-strip[data-nc-folded] > .nc-strip-trim { display: none; }
.nc-strip[data-nc-trim] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${i("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${i("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${i("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${i("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${H("divider")}: ${i("strip-divider")}; }
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
    radial-gradient(closest-side, var(--nc-strip-ground, ${i("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${i("surface-page")}) 70%, transparent 72%),
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
${Si("")}
}
@media (max-width: 1023px) {
${Si("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Ga("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Ga("")}
}
@media (max-width: 1023px) {
${Ga("html[data-nc-landscape] ")}
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
`}var Ya=null,up="nc-ui-fallback";function rl(t=globalThis.document){if(!t?.documentElement||(t.documentElement,Ya&&Ya.ownerDocument===t))return;let e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${up} {
${dp()}
}
`,t.head.append(e),Ya=e}var an=null,pp=0,hp=new URL("/nyx/assets/confirm-DwyQU4Nn.css",import.meta.url).href,il=t=>{let e=t.querySelector?.("link[data-nc-ui-confirm]");return!e&&t.head&&(e=t.createElement("link"),e.rel="stylesheet",e.href=hp,e.dataset.ncUiConfirm="",e.ncWait=new Promise(n=>{let a=()=>{e.ncWait=null,n()};e.onload=a,e.onerror=a}),t.head.append(e)),e?.ncWait};typeof document<"u"&&il(document);function lr(t){return fp(t).then(e=>!!e.ok)}function fp({title:t,body:e,lines:n=[],extra:a,confirmLabel:o="Confirm",cancelLabel:r="Cancel",danger:s=!1,root:l,returnFocus:c,signal:d},u){if(an||d?.aborted)return Promise.resolve({});let p=l?.ownerDocument??document,h=il(p),m=l??p.body,g=p.defaultView??globalThis,w=`nc-ui-confirm-${++pp}`,f=(P,de,re)=>{let Ie=p.createElement(P);return Ie.className=`nc-ui-confirm${de}`,re!=null&&(Ie.textContent=re),Ie},b=f("div","-layer");b.dataset.state="enter";let y=f("div","");y.setAttribute("role","alertdialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-labelledby",`${w}-t`);let v=f("h2","-title",t);v.id=`${w}-t`;let x=f("p","-body",e);x.id=`${w}-b`;let $=n.map((P,de)=>{let re=f("p","-body",P?.text??P);return re.id=`${w}-b${de}`,P?.tone==="danger"&&(re.dataset.tone="danger"),re});y.setAttribute("aria-describedby",[x,...$].map(P=>P.id).join(" "));let k=a&&f("button","-extra",a.label);k&&(k.type="button",k.dataset.ncConfirm="extra",k.addEventListener("click",()=>a.onAction?.()));let A=f("div","-actions"),S=(P,de)=>{let re=f("button","-btn",P);return re.type="button",re.dataset.ncConfirm=de,re.addEventListener("click",()=>At(de==="ok")),re},L=S(r,"cancel"),_=S(o,"ok");s&&(_.dataset.danger="true"),A.append(L,_);let[U,ce]=[];y.append(v,x,...$,...U?[U]:[],...k?[k]:[],A);let q=[ce,k,L,_].filter(Boolean);b.append(y);let Re={layer:b};an=Re;let kt=c??p.activeElement,Vt=[];for(let P of m.children)P.hasAttribute("inert")||(P.setAttribute("inert",""),Vt.push(P));let $t=()=>{if(an!==Re)return;m.append(b),(ce??L).focus({preventScroll:!0});let P=g.requestAnimationFrame?.bind(g)??(de=>setTimeout(de,16));P(()=>P(()=>{b.dataset.state==="enter"&&(b.dataset.state="open")}))};h?h.then($t):$t();let oe=!1;b.addEventListener("pointerdown",P=>{oe=P.target===b}),b.addEventListener("click",P=>{P.target===b&&oe&&At(!1),oe=!1});let Qt=P=>{if(P.stopImmediatePropagation(),P.key==="Escape")P.preventDefault(),At(!1);else if(P.key==="Tab"){P.preventDefault();let de=q.filter(Ie=>!Ie.disabled),re=de.length;de[(de.indexOf(p.activeElement)+(P.shiftKey?re-1:1))%re].focus()}else P.key==="Enter"&&(P.preventDefault(),p.activeElement===k?k.click():p.activeElement===L?At(!1):_.disabled||At(!0))},Pn=P=>P.stopImmediatePropagation();g.addEventListener("keydown",Qt,!0),g.addEventListener("keyup",Pn,!0);let Jt=()=>At(!1);d?.addEventListener("abort",Jt);let Zt,Fd=new Promise(P=>{Zt=P});function At(P){if(an!==Re)return;an=null,g.removeEventListener("keydown",Qt,!0),g.removeEventListener("keyup",Pn,!0),d?.removeEventListener("abort",Jt);for(let Et of Vt)Et.removeAttribute("inert");b.dataset.state="closing",kt?.isConnected&&typeof kt.focus=="function"&&kt.focus({preventScroll:!0});let de=g.getComputedStyle?.(b),re=Math.max(0,...String(de?.transitionDuration??"").split(",").map(Et=>Number.parseFloat(Et)*(Et.trim().endsWith("ms")?1:1e3)||0)),Ie=()=>b.remove();b.addEventListener("transitionend",Et=>Et.target===b&&Ie()),setTimeout(Ie,re+50),Zt({ok:P,value:ce?.value.trim()})}return Fd}function sl(t={}){let e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);let a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.dataset.ncOn="",o.textContent=t.onText??"On";let r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(o,r),n.append(a);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(t.checked);let c=()=>{l(!s),t.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var ll=new WeakMap,Mi=.25;function mp(t){let e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=e.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,s=t.step??.005,l=t.onChange,c=t.onReset,d=f=>Math.min(1,Math.max(0,f)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=f=>{let b=d(f);b!==r&&(r=b,u(),l?.(b))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();f.target!==o&&b.height>0&&p(1-(f.clientY-b.top)/b.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let b=n.getBoundingClientRect().height||1,y=(h-f.clientY)/b*(f.shiftKey?Mi:1);h=f.clientY,p(r+y)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let b=f.shiftKey?s*Mi:s,y={ArrowUp:r+b,ArrowRight:r+b,ArrowDown:r-b,ArrowLeft:r-b,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};f.key in y&&(f.preventDefault(),p(y[f.key]))});let w={el:n,get value(){return r},get dragging(){return m},set(f){m||(r=d(Number(f)||0),u())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return w.setLabel(t.label),w.set(t.value??0),w.setText(t.valueText),ll.set(n,w),w}function gp(t){return ll.get(t)}var cl=new WeakMap,bp=.2,yp=1.5,wp=.5;function vp(t,e){let n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function Li(t,e,n){let a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:vp(a.getComputedStyle(t).getPropertyValue(H(e)),n)}function xp(t){let e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=e.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let f=e.createElement("span");f.className="nc-meter-bar";let b=e.createElement("span");b.className="nc-meter-peak";let y=e.createElement("span");y.className="nc-meter-rms";let v=e.createElement("span");v.className="nc-meter-hold",f.append(b,y,v),r.append(f),s.push({peak:b,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=t.label,c=t.onClear,d=!1,u=-1,p=-1,h=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},m=(w,f,b,y)=>{let v=Math.round(y*1e3)/1e3;b[f]!==v&&(b[f]=v,w.style.transform=f==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{g.clear(),c?.()});let g={el:a,get clipped(){return d},update(w,f){u<0&&(u=Li(a,"motion-meter-fall",bp)),p<0&&(p=Li(a,"motion-meter-hold",yp));let b=Math.max(0,Math.min(.25,Number(f)||0)),y=u>0?Math.exp(-b/u):0;s.forEach((v,x)=>{let $=w[x]??w[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number($.peak)||0)),A=Math.min(k,Math.max(0,Number($.rms)||0));$.over&&g.clip(),v.level.peak=k>=v.level.peak?k:k+(v.level.peak-k)*y,v.level.rms=A>=v.level.rms?A:A+(v.level.rms-A)*y,v.holdAge+=b,k>=v.holdAt?(v.holdAt=k,v.holdAge=0):v.holdAge>p&&(v.holdAt=Math.max(k,v.holdAt-wp*b)),m(v.peak,"peak",v.shown,v.level.peak),m(v.rms,"rms",v.shown,v.level.rms),m(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,m(w.peak,"peak",w.shown,0),m(w.rms,"rms",w.shown,0),m(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,h()},configure(w){w.onClear&&(c=w.onClear)}};return h(),g.reset(),cl.set(a,g),g}function kp(t){return t?cl.get(t):void 0}var $p=3,Ap=new Set(["freq","q","rate","time","log"]);function cr(t,e,n){return!t||!Ap.has(t)||!(n>e)?"linear":e>0?"log":"power"}function Ta(t,e,n){return cr(t,e,n)!=="linear"}function sa(t,e,n,a){let o=Number(a);if(!(n>e)||!Number.isFinite(o))return 0;let r=Math.min(n,Math.max(e,o)),s=cr(t,e,n);if(s==="log")return Math.log(r/e)/Math.log(n/e);let l=(r-e)/(n-e);return s==="power"?Math.cbrt(l):l}function dl(t,e,n,a){let o=Math.min(1,Math.max(0,Number(a)||0)),r=cr(t,e,n);return r==="log"?e*(n/e)**o:e+(n-e)*(r==="power"?o**$p:o)}function ul(t,e,n,a){let o=Math.min(n,Math.max(e,t));if(a>0){o=e+Math.round((o-e)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));o=Number(o.toFixed(r)),o=Math.min(n,Math.max(e,o))}return o}function dr(t,e,n,a){return Math.round(sa(t,e,n,a)*1e3)}function ko(t,e,n,a,o){return ul(dl(t,e,n,Number(a)/1e3),e,n,o)}function Ep(t,e,n=!1){let a=Number(t)||0,o=n?1:1e3/100,r=null;return e==="ArrowRight"||e==="ArrowUp"?r=a+o:e==="ArrowLeft"||e==="ArrowDown"?r=a-o:e==="PageUp"?r=a+1e3/10:e==="PageDown"?r=a-1e3/10:e==="Home"?r=0:e==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function pl(t,e,n,a,o,r=!1,s){let l=dr(t,e,n,a),c=Ep(l,o,r);if(c===null)return null;let d=ko(t,e,n,c,s),u=Math.sign(c-l),p=ul(Number(a),e,n,s);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=ko(t,e,n,c,s);return d}function Sp(t){return!t||t.options?"linear":typeof t.taper=="string"?t.taper:t.curve==="log"?"freq":t.unit==="ms"||/_ms$/.test(String(t.key??""))||t.key==="predelay"?"time":"linear"}function Ti(t){let e=Number(t);return e>0&&Number.isFinite(e)?Math.log1p(e/.03):0}function Mp(t,e,n,a=n/6){let o=t.some(u=>u===null),r=Math.max(0,n-(o?a:0)),s=t.reduce((u,p,h)=>p===null?u:u+Ti(e[h]),0),l=s>0?r/s:0,c=t.map(u=>u===null?0:Math.min(r,Ti(u)*l));if(o){let u=c.reduce((h,m)=>h+m,0),p=t.indexOf(null);c[p]=Math.max(a,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return o&&(d[d.length-1]=n),d}function Lp(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function je(t){return Math.max(0,Math.min(1,t))}function hl(t,e){let{ctx:n,w:a,h:o}=Lp(t);if(!n)return;n.clearRect(0,0,a,o);let r=lp(t);if(e.paint==="swatch"){let c=J(t,"accent"),d=J(t,"rhythm.step-cell-on");t.dataset.ncAccent=c,t.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=d,n.fillRect(a/2,0,a/2,o);return}if(e.paint==="filter"&&typeof e.hz=="number"){Np(n,a,o,e,t,r);return}if(e.paint==="filter"){let c=e.mode??"lp",d=J(t,ol(c)),u=J(t,"divider"),p=je(e.cutoff??.5),h=.08+(1-je(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let g=m/Math.max(1,a),w=0;c==="lp"?w=g<p?1:Math.max(0,1-(g-p)/h):c==="hp"?w=g>p?1:Math.max(0,1-(p-g)/h):w=Math.max(0,1-Math.abs(g-p)/h);let f=o*.78-w*o*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=J(t,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,o),t.dataset.ncAccent=d;return}if(e.paint==="envelope"){n.strokeStyle=J(t,"accent");let c=Math.max(0,e.attack??0),d=Math.max(0,e.decay??.4),[u,p,h]=Mp([c,d],e.max??[1,4],a),m=2,g=o-1;n.beginPath(),n.moveTo(u,g),n.lineTo(p,m);let w=Math.max(1,Math.ceil(h-p));for(let f=1;f<=w;f++){let b=f/w;n.lineTo(p+(h-p)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){let c=Array.isArray(e.peaks)?e.peaks:[],[d,u]=Array.isArray(e.region)?e.region:[0,1],p=J(t,"accent"),h=J(t,"text-sub"),m=o/2;n.fillStyle=J(t,"accent-soft"),n.fillRect(je(d)*a,0,(je(u)-je(d))*a,o),n.strokeStyle=J(t,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let g=Math.floor(c.length/2);for(let w=0;w<g;w++){let f=(w+.5)/g*a,b=Math.max(-1,Math.min(1,c[w*2]??0)),y=Math.max(-1,Math.min(1,c[w*2+1]??0)),v=(w+.5)/g;n.strokeStyle=v>=d&&v<=u?p:h,n.beginPath(),n.moveTo(f,m-y*(m-1)),n.lineTo(f,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=p;for(let w of[d,u,...Array.isArray(e.markers)?e.markers:[]]){let f=Math.round(je(w)*(a-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,o),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=J(t,"text"),n.fillRect(Math.round(je(e.position)*(a-1)),0,1,o)),g||(n.fillStyle=h,n.font=r,n.fillText(e.empty??"Empty",0,m+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){let c=je(e.level??0);n.fillStyle=J(t,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=J(t,"accent"),n.fillRect(0,o*.4,a*c,o*.2),t.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,e.steps??16),l=((e.step??0)%s+s)%s;n.fillStyle=J(t,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=J(t,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),t.dataset.ncAccent=J(t,"accent")}var pn=20,$o=2e4,Ka=24,Ci=-60;function Tp(t,e,n,a,o=48e3){let r=2*Math.PI*Math.min(e,o*.49)/o,s=Math.cos(r),l=Math.sin(r)/(2*n),c,d,u;t==="hp"?[c,d,u]=[(1+s)/2,-(1+s),(1+s)/2]:t==="bp"?[c,d,u]=[l,0,-l]:[c,d,u]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,m=1-l,g=2*Math.PI*a/o,w=(v,x,$)=>v+x*Math.cos(g)+$*Math.cos(2*g),f=(v,x)=>-(v*Math.sin(g)+x*Math.sin(2*g)),b=Math.hypot(w(c,d,u),f(d,u)),y=Math.hypot(w(p,h,m),f(h,m));return y>0?b/y:0}function Cp(t,e){return Math.log(Math.max(pn,Math.min($o,t))/pn)/Math.log($o/pn)*e}function Ni(t,e,n){let a=Math.max(Ci,Math.min(Ka,t));return e+(Ka-a)/(Ka-Ci)*(n-e)}function Np(t,e,n,a,o,r){let s=a.mode??"lp",l=J(o,ol(s)),c=J(o,"divider"),d=J(o,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-u-3),m=a.q??Math.SQRT1_2,g=Math.round(Ni(0,p,h))+.5;t.strokeStyle=c,t.lineWidth=1,t.beginPath(),t.moveTo(0,g),t.lineTo(e,g),t.stroke(),t.beginPath();for(let w=0;w<=e;w++){let f=pn*($o/pn)**(w/Math.max(1,e)),b=a.open?1:Tp(s,a.hz,m,f,a.sampleRate),y=Ni(20*Math.log10(Math.max(1e-5,b)),p,h);w===0?t.moveTo(w,y):t.lineTo(w,y)}if(t.strokeStyle=l,t.stroke(),!a.open){let w=Math.round(Cp(a.hz,e))+.5;t.strokeStyle=d,t.setLineDash?.([2,3]),t.beginPath(),t.moveTo(w,p),t.lineTo(w,h),t.stroke(),t.setLineDash?.([])}t.fillStyle=d,t.font=r,t.textAlign="left",t.fillText("20 Hz",0,n-1),t.textAlign="right",t.fillText("20 kHz",e,n-1),t.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(a.hz))}function Se(t,e){let n=t.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${e})`,t.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function Fp(t){let e=t.ownerDocument,n=e.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",t.append(n);let a=e.defaultView.getComputedStyle(n).font;return n.remove(),a}var mt=20,Cn=2e4,ur=Math.log(Cn/mt),Ao=32,zp=250,Pp=-100,Dp=1200,Bp=4.5,Fi=-6,lt=-96,Op=48,zi=[100,1e3,1e4],qp=[6,12];function Dt(t,e){return Math.log(Math.max(mt,Math.min(Cn,t))/mt)/ur*e}function Kn(t,e){return mt*Math.exp(Math.max(0,Math.min(e,t))/Math.max(1,e)*ur)}function Xe(t,e,n,a){let o=e/2-a;return e/2-Math.max(-n,Math.min(n,t))/n*o}function Eo(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}var fl=t=>`${t>0?"+":t<0?"−":""}${Math.abs(Math.round(t*10)/10)} dB`;function Rp(t,e,n,a){let o=n?3:1,r=c=>({db:Math.max(-a,Math.min(a,t.db+c*o))}),s=c=>({hz:Math.max(t.minHz??mt,Math.min(t.maxHz??Cn,t.hz*2**(c*o/6)))}),l=c=>({q:Math.max(t.minQ??.1,Math.min(t.maxQ??20,t.q*1.25**(c*o)))});switch(e){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return t.moveHz?s(1):r(1);case"ArrowLeft":return t.moveHz?s(-1):r(-1);case"PageUp":return t.moveQ?l(1):null;case"PageDown":return t.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function pr(t){return t.kind==="lowshelf"||t.kind==="highshelf"?.5:1}function Ip(t,e,n,a,o,r,s,l,c){let d=c?.25:1,u={},p=Math.max(1,r/2-l);if(u.db=Math.max(-s,Math.min(s,e.db-a*d/p*s/pr(t))),t.moveHz){let h=e.hz*Math.exp(n*d/Math.max(1,o)*ur);u.hz=Math.max(t.minHz??mt,Math.min(t.maxHz??Cn,h))}return u}function jp(t,e,n,a,o){let r=Math.max(0,n.left)+1,s=Math.min(n.right,o)-1,l=Math.min(e.width*3+a*2,s-r),c=Math.max(r,Math.min(t.left,s-l));return{left:Math.round(c-e.left),top:Math.round(t.top-e.top),width:Math.round(l)}}var ae=new WeakMap;function _p(t,e){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=t.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(o,r);for(let c of t.bands)a.append(Hp(n,c,e));a.append(s),a.addEventListener("click",c=>{if(!vl(n)||c.button>0)return;let d=wl(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ae.set(n,{control:t,cache:null,spec:null,active:null}),gl(n,t),n}function ml(t,e){return[...t.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===e)??null}function Hp(t,e,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=e.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let d=n(t);return d?.type==="eqGraph"?d:null},r=()=>o()?.bands.find(d=>d.id===e.id)??null,s=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=r();u&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},a.dataset.drag="true",_e(t,e.id))}),a.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let u=o(),p=r(),h=ae.get(t);if(!u||!p||!h?.box)return;let{w:m,h:g,pad:w}=h.box;u.onBand(p.id,Ip(p,s.start,d.clientX-s.x,d.clientY-s.y,m,g,u.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete a.dataset.drag,t.ownerDocument.activeElement!==a&&!a.matches(":hover")&&_e(t,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),o()?.onReset?.(e.id)}),a.addEventListener("keydown",d=>{let u=o(),p=r();if(!u||!p)return;let h=Rp(p,d.key,d.shiftKey,u.range??18);h&&(d.preventDefault(),h==="reset"?u.onReset?.(p.id):u.onBand(p.id,h),_e(t,p.id))});let c=null;return a.addEventListener("wheel",d=>{let u=o(),p=r();if(!u||!p?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!c||h-c.t>400)&&(c={q:p.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-m/240))),c.t=h,u.onBand(p.id,{q:c.q}),_e(t,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>_e(t,e.id)),a.addEventListener("focus",()=>_e(t,e.id)),a.addEventListener("pointerleave",()=>{!s&&t.ownerDocument.activeElement!==a&&_e(t,null)}),a.addEventListener("blur",()=>{s||_e(t,null)}),a}function _e(t,e){let n=ae.get(t);if(!n)return;let a=n.active!==e;n.active=e,a?It(t):hr(t)}function hr(t){let e=ae.get(t),n=t.querySelector(".nc-eq-tip");if(!e||!(n instanceof HTMLElement))return;let a=e.active?e.control.bands.find(g=>g.id===e.active):null;for(let g of t.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!e.box){n.hidden=!0;return}let o=[a.label,fl(a.db)];a.kind==="peak"?o.push(Eo(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${Eo(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(Wp(e.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=e.box,c=Dt(a.hz,r),d=Xe(a.db*pr(a),s,e.control.range??18,l),u=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(r-u,c-u/2)),m=d-p-l*1.5>=0?d-p-l*1.5:Math.min(s-p,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function Wp(t,e){return t.bands.indexOf(e)%3+1}function gl(t,e){let n=ae.get(t);if(!n)return;n.control=e,t.setAttribute("aria-label",e.label??"EQ curve"),e.help?t.setAttribute("data-nc-help",e.help):t.removeAttribute("data-nc-help"),t.dataset.on=e.on===!1?"false":"true",fr(t);let a=e.range??18;e.bands.forEach((o,r)=>{let s=ml(t,o.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=o.kind,s.setAttribute("aria-label",`${o.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(o.db)),s.setAttribute("aria-valuetext",o.valueText??`${fl(o.db)}, ${Eo(o.hz)}`),s.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?s.setAttribute("data-nc-help",o.help):s.removeAttribute("data-nc-help"))}),It(t),Vp(t)}function bl(t){let e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(e*a)),r=Math.max(1,Math.round(n*a));(t.width!==o||t.height!==r)&&(t.width=o,t.height=r);let s=t.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:e,h:n}}function yl(t){return{curve:Se(t,"eq-curve"),fill:Se(t,"eq-fill"),quiet:Se(t,"text-sub"),grid:Se(t,"eq-grid"),zero:Se(t,"divider"),label:Se(t,"text-sub"),spectrum:Se(t,"eq-spectrum"),bands:[Se(t,"eq-band-1"),Se(t,"eq-band-2"),Se(t,"eq-band-3")]}}function Up(t,e){return`${e}|${t.sampleRate??""}|${t.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function It(t){ae.has(t)&&fr(t);let e=ae.get(t),n=t.querySelector(".nc-eq-curve");if(!e||!(n instanceof HTMLCanvasElement)||!t.isConnected)return;let a=e.control,{ctx:o,w:r,h:s}=bl(n);if(!o)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;e.box={w:r,h:s,pad:l},e.colours=yl(t);let d=e.colours,u=Up(a,r);if(!e.cache||e.cache.key!==u){let x=Math.max(64,Math.ceil(r)+1),$=new Float64Array(x);for(let A=0;A<x;A++)$[A]=Kn(A/(x-1)*r,r);let k=null;try{k=typeof a.response=="function"?a.response($):null}catch{k=null}e.cache={key:u,freqs:$,total:k?.total??new Float64Array(x),bands:k?.bands??[]}}o.clearRect(0,0,r,s);let p=Fp(t),h=a.on!==!1;Gp(o,r,s,c,l,d,p);let{freqs:m,total:g,bands:w}=e.cache,f=Array.from(m,x=>Dt(x,r)),b=Xe(0,s,c,l);w.forEach((x,$)=>{if(!x||!x.some(S=>Math.abs(S)>.05))return;let k=h?d.bands[$%3]:d.quiet,A=Array.from(x,S=>Xe(S,s,c,l));o.save(),e.active&&a.bands[$]?.id===e.active&&(o.globalAlpha=.14,o.fillStyle=k,Pi(o,f,A,b)),o.globalAlpha=h?.75:.4,o.strokeStyle=k,o.lineWidth=.75,Xa(o,f,A),o.restore()});let y=Array.from(g,x=>Xe(x,s,c,l)),v=h?d.curve:d.quiet;o.save(),o.fillStyle=h?d.fill:d.quiet,o.globalAlpha=h?.2:.08,Pi(o,f,y,b),o.restore(),o.save(),o.strokeStyle=h?d.fill:v,o.lineJoin="round",o.lineCap="round",h&&(o.globalAlpha=.16,o.lineWidth=4,Xa(o,f,y)),o.globalAlpha=1,o.strokeStyle=v,o.lineWidth=1.25,Xa(o,f,y),o.restore(),Yp(t),hr(t)}function Gp(t,e,n,a,o,r,s){t.save(),t.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<mt||u>Cn)continue;let p=Math.round(Dt(u,e))+.5;t.globalAlpha=zi.includes(u)?.9:.35,t.strokeStyle=r.grid,t.beginPath(),t.moveTo(p,0),t.lineTo(p,n),t.stroke()}for(let c of qp)if(!(c>a))for(let d of[1,-1]){let u=Math.round(Xe(c*d,n,a,o))+.5;t.globalAlpha=c===12?.75:.4,t.strokeStyle=r.grid,t.beginPath(),t.moveTo(0,u),t.lineTo(e,u),t.stroke()}t.globalAlpha=1,t.strokeStyle=r.zero;let l=Math.round(Xe(0,n,a,o))+.5;t.beginPath(),t.moveTo(0,l),t.lineTo(e,l),t.stroke(),t.font=s,t.fillStyle=r.label,t.globalAlpha=.9,t.textBaseline="bottom",t.textAlign="left";for(let c of zi){let d=c>=1e3?`${c/1e3}k`:String(c),u=t.measureText(d).width,p=Dt(c,e)+3;t.fillText(d,p+u+2>e?Dt(c,e)-u-3:p,n-2)}t.textBaseline="bottom",t.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=Xe(c,n,a,o);t.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",e-3,Math.round(d)-1)}t.restore()}function la(t,e,n){t.moveTo(e[0],n[0]);for(let a=1;a<e.length-1;a++){let o=(e[a]+e[a+1])/2,r=(n[a]+n[a+1])/2;t.quadraticCurveTo(e[a],n[a],o,r)}t.lineTo(e[e.length-1],n[n.length-1])}function Xa(t,e,n){t.beginPath(),la(t,e,n),t.stroke()}function Pi(t,e,n,a){t.beginPath(),la(t,e,n),t.lineTo(e[e.length-1],a),t.lineTo(e[0],a),t.closePath(),t.fill()}function wl(t){return t.closest("[data-nc-maxable]")}function vl(t){let e=wl(t);return!!e&&!e.hasAttribute("data-nc-max")}function fr(t){let e=vl(t);e?t.dataset.locked="":delete t.dataset.locked;for(let n of t.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",e?"-1":"0"),e?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(e){let n=ae.get(t);n?.active&&(n.active=null,hr(t))}return e}function Yp(t){fr(t);let e=ae.get(t);if(!e?.box)return;let{w:n,h:a,pad:o}=e.box,r=e.control.range??18;for(let s of e.control.bands){let l=ml(t,s.id);l instanceof HTMLElement&&(l.style.left=`${Dt(s.hz,n).toFixed(1)}px`,l.style.top=`${Xe(s.db*pr(s),a,r,o).toFixed(1)}px`)}}function Kp(t,e,n,a){let o=a/2/n,r=new Float32Array(t),s=new Float32Array(t),l=new Float32Array(t);for(let c=0;c<t;c++){let d=(c-.5)/(t-1)*e,u=(c+.5)/(t-1)*e,p=Kn(d,e),h=Kn(u,e),m=Kn(c/(t-1)*e,e);r[c]=Math.min(n-1,p/o),s[c]=Math.min(n-1,h/o),l[c]=Bp*Math.log2(m/1e3)}return{lo:r,hi:s,tilt:l}}function Xp(t,e,n){let a=Math.floor(e),o=Math.ceil(n);if(o-a<=1){let s=e-a,l=t[a]??-1/0,c=t[Math.min(t.length-1,a+1)]??l;return l+(c-l)*s}let r=-1/0;for(let s=a;s<=o&&s<t.length;s++)t[s]>r&&(r=t[s]);return r}function Vp(t){let e=ae.get(t);if(e){if(!e.control.spectrum){kl(t);return}if(!e.spec){e.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=t.ownerDocument.defaultView?.IntersectionObserver;n?(e.spec.io=new n(a=>{let o=ae.get(t)?.spec;o&&(o.visible=a.some(r=>r.isIntersecting),So(t))}),e.spec.io.observe(t)):e.spec.visible=!0}So(t)}}function So(t){let e=ae.get(t),n=e?.spec;if(!n)return;let a=t.ownerDocument;if(!(t.isConnected&&n.visible&&a.visibilityState!=="hidden"&&e.control.spectrum)){xl(t);return}if(!n.analyser){if(n.source=e.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Mo(t),n.onVis||(n.onVis=()=>So(t),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Lo(t,!1)}function Mo(t){return t.ownerDocument.defaultView?.performance?.now()??Date.now()}function Lo(t,e){let n=ae.get(t)?.spec,a=t.ownerDocument.defaultView;!n||!a||(e?n.timer=a.setTimeout(()=>(n.timer=0,Va(t,Mo(t))),zp):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,Va(t,o))):n.timer=a.setTimeout(()=>(n.timer=0,Va(t,Mo(t))),Ao))}function xl(t){let e=ae.get(t)?.spec;if(!e)return;let n=t.ownerDocument.defaultView;e.raf&&n?.cancelAnimationFrame?.(e.raf),e.timer&&n?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.analyser&&(e.source?.close?.(),e.analyser=null,e.source=null),e.disp&&e.disp.fill(-1/0);let a=t.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function kl(t){let e=ae.get(t)?.spec;if(!e)return;xl(t),e.io?.disconnect(),e.onVis&&t.ownerDocument.removeEventListener("visibilitychange",e.onVis);let n=ae.get(t);n&&(n.spec=null)}function Va(t,e){let n=ae.get(t),a=n?.spec;if(!n||!a)return;if(!t.isConnected){kl(t);return}if(!a.analyser)return;if(e-a.last<Ao-4&&!a.idle){Lo(t,!1);return}let o=a.last?Math.min(.25,(e-a.last)/1e3):Ao/1e3;a.last=e;let r=t.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=bl(r);if(!s)return;let d=Math.max(16,Math.round(l/2)),u=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==u)&&(a.map={cols:d,w:l,sr:u,...Kp(d,l,a.buf.length,u)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Op*o,{lo:m,hi:g,tilt:w}=a.map;for(let b=0;b<d;b++){let y=Xp(a.buf,m[b],g[b]);y>p&&(p=y);let v=y+w[b],x=a.disp[b]-h;a.disp[b]=v>x?v:x}p>Pp&&(a.loud=e);let f=e-a.loud>Dp;s.clearRect(0,0,l,c),(!f||a.disp.some(b=>b>lt))&&Qp(s,l,c,a.disp,n.colours??yl(t)),a.idle=f&&!a.disp.some(b=>b>lt),Lo(t,a.idle)}function Qp(t,e,n,a,o){let r=a.length,s=new Array(r),l=new Array(r),c=d=>{let u=a[Math.max(0,Math.min(r-1,d))];return Number.isFinite(u)?u:lt};for(let d=0;d<r;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(lt,Math.min(Fi,Number.isFinite(u)?u:lt))-lt)/(Fi-lt);s[d]=d/(r-1)*e,l[d]=n-p*n}t.save(),t.fillStyle=o.spectrum,t.globalAlpha=.13,t.beginPath(),la(t,s,l),t.lineTo(e,n),t.lineTo(0,n),t.closePath(),t.fill(),t.globalAlpha=.32,t.strokeStyle=o.spectrum,t.lineWidth=1,t.beginPath(),la(t,s,l),t.stroke(),t.restore()}var we=new WeakMap,Jp=450,Zp=6,eh=33,Qa=24,th="http://www.w3.org/2000/svg";function nh(t,e){let n=1-t/Math.max(1,e);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function ah(t,e){for(let n=0;n<e.length;n++)if(t<e[n])return n;return e.length-1}function oh(t,e,n,a,o){let r=t.slice();if(e===a)return r[a]=o,r;let s=e<a?1:-1;for(let l=e;l!==a+s;l+=s){let c=(l-e)/(a-e);r[l]=Math.round((n+(o-n)*c)*100)/100}return r}function rh(t,e){let n=t.steps[e],a=(t.shapes??[]).find(r=>r.value===n.shape),o=t.played!==void 0&&e>=t.played?", not playing":"";return`Step ${e+1} of ${t.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${o}`}function ct(t,e){let n=document.createElementNS(th,t);for(let[a,o]of Object.entries(e))n.setAttribute(a,String(o));return n}function $l(t){let e=ct("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return e.append(ct("path",{d:t})),e}function ih(t,e){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=t.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let o=document.createElement("div");o.className="nc-lsteps-axis",o.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(a,o,r,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:t,lookup:e,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return we.set(n,c),lh(n,a),ch(n,s),Al(n,t),n}function ve(t){let e=we.get(t),n=e?.lookup?.(t);return n?.type==="levelSteps"?n:e?.control}function sh(t){return[...t.querySelectorAll(".nc-lsteps-step")].map(e=>e.getBoundingClientRect().right)}function Ja(t,e){let n=(t.querySelector(".nc-lsteps-step")??t).getBoundingClientRect(),a=sh(t);return{i:ah(e.clientX,a),level:nh(e.clientY-n.top,n.height)}}function lh(t,e){let n=we.get(t),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};e.addEventListener("pointerdown",r=>{let s=ve(t);if(!s||r.button>0||!s.steps.length)return;r.preventDefault(),ca(t),e.setPointerCapture?.(r.pointerId);let l=Ja(e,r),c=s.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Di(t,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,ve(t)?.onLevels(d.start.slice(),!0),Za(t,d.i))},Jp)}),e.addEventListener("pointermove",r=>{let s=n.drag;if(!s||s.id!==r.pointerId||s.long||!s.moved&&Math.hypot(r.clientX-s.x,r.clientY-s.y)<Zp)return;s.moved=!0,a();let l=Ja(e,r);Di(t,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let o=r=>{let s=n.drag;!s||s.id!==r.pointerId||(a(),n.drag=null,e.releasePointerCapture?.(r.pointerId),s.long||ve(t)?.onLevels(s.levels.slice(),!0),To(t,-1))};e.addEventListener("pointerup",o),e.addEventListener("pointercancel",r=>{let s=n.drag;!s||s.id!==r.pointerId||(a(),n.drag=null,s.long||ve(t)?.onLevels(s.start.slice(),!0),To(t,-1))}),e.addEventListener("contextmenu",r=>{ve(t)?.onShape&&(r.preventDefault(),Za(t,Ja(e,r).i))}),e.addEventListener("keydown",r=>{let s=ve(t);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(n.focus,l-1),d=s.steps[c].level,u=p=>{let h=s.steps.map(m=>m.level);h[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,s.onLevels(h,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":u(d+(r.shiftKey?.01:.05));break;case"ArrowDown":u(d-(r.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!s.onShape)return;Za(t,c);break;default:return}r.preventDefault(),Co(t)}),e.addEventListener("focus",()=>Co(t)),e.addEventListener("blur",()=>{for(let r of e.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function Di(t,e,n,a,o,r){let s=we.get(t).drag;s&&(s.levels=oh(s.levels,e,n,a,o),To(t,a,s.levels[a]),ve(t)?.onLevels(s.levels.slice(),r))}function To(t,e,n){for(let a of t.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===e?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Co(t){let e=we.get(t),n=t.querySelector(".nc-lsteps-plot"),a=ve(t);if(!n||!a)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===e.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let o=Math.min(e.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[o]?.level??0)*100))),n.setAttribute("aria-valuetext",rh(a,o))}function ch(t,e){e.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ca(t,!0);return}let a=[...e.querySelectorAll("button")],o=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(o+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(o-1+a.length)%a.length]?.focus())}),we.get(t).outside=n=>{!e.hidden&&!e.contains(n.target)&&ca(t)}}function Za(t,e){let n=ve(t),a=t.querySelector(".nc-lsteps-pick"),o=t.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!o)return;let r=we.get(t);r.focus=e,a.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${e+1}`,a.append(s);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[e]?.shape===m.value?"true":"false"),m.icon&&g.append($l(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{ve(t)?.onShape?.(e,m.value),ca(t,!0)}),a.append(g)}a.setAttribute("aria-label",`Shape of step ${e+1}`),a.hidden=!1,t.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=o.querySelector(`.nc-lsteps-step[data-i="${e}"]`),c=t.getBoundingClientRect(),d=l?.getBoundingClientRect(),u=a.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,h=Math.max(0,Math.min(c.width-u,p-u/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function ca(t,e=!1){let n=t.querySelector(".nc-lsteps-pick");!n||n.hidden||(t.ownerDocument.removeEventListener("pointerdown",we.get(t).outside,!0),n.hidden=!0,n.textContent="",e&&t.querySelector(".nc-lsteps-plot")?.focus?.())}function dh(t,e){let n=we.get(t),a=t.querySelector(".nc-lsteps-plot"),o=t.querySelector(".nc-lsteps-axis");if(n.count!==e){n.count=e,a.textContent="",o.textContent="";for(let r=0;r<e;r++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(r),r%4===0&&r>0&&(s.dataset.beat="true");let l=ct("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(ct("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),ct("path",{class:"nc-lsteps-env",d:""}),ct("path",{class:"nc-lsteps-top",d:""}),ct("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),a.append(s);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),o.append(c)}}}function Al(t,e){let n=we.get(t);if(!n)return;n.control=e;let a=e.steps.length;dh(t,a),t.setAttribute("aria-label",e.label??"Steps"),e.help?t.setAttribute("data-nc-help",e.help):t.removeAttribute("data-nc-help"),t.dataset.on=e.on===!1?"false":"true";let o=t.querySelector(".nc-lsteps-plot");o.setAttribute("aria-label",e.label??"Steps");let r=Math.max(.5,Math.min(.75,e.swing??.5)),s=o.querySelectorAll(".nc-lsteps-step"),l=t.querySelectorAll(".nc-lsteps-axis > span");e.steps.forEach((m,g)=>{let w=s[g];if(!w)return;let f=String((g%2?1-r:r)*2);w.style.setProperty("--nc-lsteps-grow",f),l[g]?.style.setProperty("--nc-lsteps-grow",f),e.played!==void 0&&g>=e.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),y=w.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-b*100)),y.setAttribute("height",String(b*100));let v=e.curve?e.curve(g,Qa):null,x="M0 100",$="";for(let k=0;k<=Qa;k++){let A=v?Math.max(0,Math.min(1,v[k]??b)):b,S=k/Qa*100,L=100-A*100;x+=` L${S.toFixed(2)} ${L.toFixed(2)}`,$+=`${k?" L":"M"}${S.toFixed(2)} ${L.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${x} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",$)});let c=t.querySelector(".nc-lsteps-shapes"),d=(e.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of e.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append($l(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>ve(t)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(e.shapes?.length&&e.onShapeAll),c.setAttribute("aria-label",e.shapesLabel??"Shape of every step");let u=e.played??a,p=e.steps[0]?.shape,h=e.steps.slice(0,u).every(m=>m.shape===p);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=h&&m.dataset.shape===String(p);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!h&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Co(t),n.last=-2,uh(t)}function uh(t){let e=we.get(t),n=t.ownerDocument?.defaultView;if(!e||e.loop||!e.control.playhead||!n?.requestAnimationFrame){e&&!e.control.playhead&&eo(t,null);return}let a=0,o=r=>{if(e.loop=0,!t.isConnected||!e.control.playhead){eo(t,null);return}r-a>=eh&&(a=r,eo(t,e.control.playhead())),e.loop=n.requestAnimationFrame(o)};e.loop=n.requestAnimationFrame(o)}function eo(t,e){let n=we.get(t),a=e&&Number.isInteger(e.step)?e.step:-1,o=!!e?.locked;if(!(n.last===a&&n.lastLocked===o)){n.last=a,n.lastLocked=o;for(let r of t.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===a?(r.dataset.playhead="true",r.dataset.locked=o?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));t.dataset.free=e&&!o?"true":"false"}}var ph=.8912509381337456,No=32,hh=250,fh=1200,mh=.2,El=1.5;function gh(t){let e=Number(t);if(!(e>0))return 0;let n=(20*Math.log10(e)- -48)/48;return n<=0?0:n>=1?1:n}function bh(t=globalThis.document){let e=t.createElement("span");e.className="nc-fx-level",e.setAttribute("aria-hidden","true"),e.dataset.ncRows="2";for(let n of["in","out"]){let a=t.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=t.createElement("span");o.className="nc-fx-level-fill",a.append(o),e.append(a)}return e}var da=new WeakMap,Bi=new WeakMap;function Oi(t,e,n){let a=t.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(t).getPropertyValue(`--nc-ui-${e}`)??"").trim(),r=Number.parseFloat(o);return Number.isFinite(r)?o.endsWith("ms")?r/1e3:r:n}function yh(t){let e=Bi.get(t);if(e)return e;let n=t.defaultView;e={doc:t,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(e.io=new a(o=>{for(let r of o){let s=da.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),hn(s))}zt(e)})),t.addEventListener("visibilitychange",()=>{for(let o of e.recs)hn(o);zt(e)}),Bi.set(t,e),e}var Sl=t=>t.els.some(e=>e.isConnected);function wh(t){if(!t.loop.io)return Sl(t);for(let e of t.els)if(t.seen.get(e)===!0&&e.isConnected)return!0;return!1}function hn(t){let e=!t.dead&&!!t.source&&wh(t)&&t.loop.doc.visibilityState!=="hidden";if(e&&!t.open){let n=typeof t.source.open=="function"?t.source.open():!0;t.open=n!==!1,t.open&&(t.loop.loud=mr(t.loop))}else!e&&t.open&&(t.open=!1,t.source?.close?.(),Po(t))}function mr(t){return t.doc.defaultView?.performance?.now()??Date.now()}function zt(t){let e=!1;for(let n of t.recs)n.open&&(e=!0);if(!e){Ml(t);return}t.idle&&t.timer&&(t.doc.defaultView?.clearTimeout(t.timer),t.timer=0,t.idle=!1,t.loud=mr(t)),!t.raf&&!t.timer&&Fo(t,!1)}function Fo(t,e){let n=t.doc.defaultView;if(!n)return;let a=()=>qi(t,mr(t));e?t.timer=n.setTimeout(()=>(t.timer=0,a()),hh):typeof n.requestAnimationFrame=="function"?t.raf=n.requestAnimationFrame(o=>(t.raf=0,qi(t,o))):t.timer=n.setTimeout(()=>(t.timer=0,a()),No)}function Ml(t){let e=t.doc.defaultView;t.raf&&e?.cancelAnimationFrame?.(t.raf),t.timer&&e?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.idle=!1,t.last=0}function qi(t,e){if(e-t.last<No-4&&!t.idle&&t.last){Fo(t,!1);return}let n=t.last?Math.min(.25,(e-t.last)/1e3):No/1e3;t.last=e,t.frames++;let a=!1,o=!1;for(let r of t.recs){if(!Sl(r)){(r.placed||t.frames-r.born>90)&&Ll(r);continue}r.placed=!0,r.open&&(o=!0,vh(r,n,e)&&(t.loud=e),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!o){Ml(t);return}t.idle=e-t.loud>fh&&!a,Fo(t,t.idle)}function vh(t,e,n){if(t.fall<0){let h=t.els[0];t.fall=Oi(h,"motion-meter-fall",mh),t.hold=Oi(h,"motion-meter-hold",El)}let a=null;try{a=t.source.read()}catch{a=null}let o=typeof a=="number",r=o?a:Number(a?.in)||0,s=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(t.rows!==c){t.rows=c;for(let h of t.els)h.dataset.ncRows=c}let d=t.fall>0?Math.exp(-e/t.fall):0,u=[r,l],p=!1;for(let h=0;h<2;h++){let m=gh(u[h]);m>0&&(p=!0),t.disp[h]=m>=t.disp[h]?m:m+(t.disp[h]-m)*d,t.disp[h]<.001&&(t.disp[h]=0),u[h]>=ph&&(t.clipAt[h]=n);let g=t.clipAt[h]>0&&n-t.clipAt[h]<t.hold*1e3;zo(t,h,t.disp[h],g)}return p}function zo(t,e,n,a){let o=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(t.shown[e]===o&&t.clipShown[e]===r)){t.shown[e]=o,t.clipShown[e]=r;for(let s of t.els){let l=s.children[e]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=r)}}}function Po(t){t.disp[0]=0,t.disp[1]=0,t.clipAt[0]=0,t.clipAt[1]=0,zo(t,0,0,!1),zo(t,1,0,!1)}function Ll(t){t.open&&(t.open=!1,t.source?.close?.()),t.dead=!0,t.loop.recs.delete(t);for(let e of t.els)t.loop.io?.unobserve(e),da.get(e)===t&&da.delete(e)}function xh(t,e){let n=(Array.isArray(t)?t:[t]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=yh(a),r={els:n,source:e??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:El,rows:""};for(let s of n)da.set(s,r),o.io?.observe(s);if(o.recs.add(r),Po(r),!o.io){let s=a.defaultView,l=()=>{hn(r),zt(o)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){hn(r),zt(o);return}r.open&&(r.open=!1,r.source?.close?.(),Po(r)),r.source=l,hn(r),zt(o)}},destroy(){r.dead||Ll(r),zt(o)}}}var Tl={slop:8,longPressMs:500,pitchPx:16},kh=class{constructor(t,e,n=Tl){this.hit=t,this.emit=e,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(t,e,n,a){if(this.phase!=="idle")return!1;let o=this.hit(e,n);return o<0?!1:(this.phase="pending",this.pointer=t,this.pad=o,this.x0=e,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(t){this.phase==="pending"&&t-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(t,e,n,a){if(t!==this.pointer)return;let o=e-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(e,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(t,e,n,a){t===this.pointer&&(this.phase==="pending"&&this.move(t,e,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(t){t===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function $h(t,e,n,a=Tl){let o=!1,r=0,s=(d,u)=>{let p=t.ownerDocument.elementFromPoint?.(d,u),h=[...t.querySelectorAll(e)],m=p?h.findIndex(f=>f===p||f.contains(p)):-1;if(m>=0)return m;let g=-1,w=Number.POSITIVE_INFINITY;return h.forEach((f,b)=>{if(f.hidden)return;let y=f.getBoundingClientRect();if(u<y.top||u>y.bottom)return;let v=Math.abs(d-(y.left+y.width/2));v<w&&v<=y.width&&(g=b,w=v)}),g},l=new kh(s,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},a),c=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),t.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),t.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),t.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),t.addEventListener("contextmenu",d=>d.preventDefault()),l}var Cl="netcomposer.groups.v1";function gr(){try{return globalThis.localStorage??null}catch{return null}}function Nl(t=gr(),e=Cl){try{let n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function Ah(t,e,n,a=Cl){let o=Nl(t,a);o.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function Eh(t,e=gr()){return Nl(e).get(t.id)??t.open===!0}function Sh(t,e,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${t.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${t.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let d of t.controls)c.append(n(d,e));return o.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Ah(gr(),t.id,d),Do(a,d);let u=e(a);u?.type==="group"&&u.onToggle?.(d)}),a.append(o,c),Fl(a,t),Do(a,Eh(t)),zl(a,t),a}function Do(t,e){t.dataset.ncOpen=e?"true":"false";let n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e&&t.dataset.ncCollapse!=="phone")}function Fl(t,e){let n=e.collapse==="phone"?"phone":void 0;return t.dataset.ncCollapse===n?!1:(n?t.dataset.ncCollapse=n:delete t.dataset.ncCollapse,!0)}function zl(t,e){Fl(t,e)&&Do(t,t.dataset.ncOpen==="true");let n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);let a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=e.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var qn="application/x-nc-pad",Ri="http://www.w3.org/2000/svg";function Mh(t){let e=Math.floor((t?.length??0)/2);if(!e)return"";let n=Math.min(48,e),a=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*e/n),l=Math.max(s+1,Math.floor((r+1)*e/n)),c=0,d=0;for(let p=s;p<l;p++)c=Math.min(c,t[2*p]??0),d=Math.max(d,t[2*p+1]??0);let u=n===1?50:r/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Lh(t,e){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((o,r)=>a.append(Th(n,r,e))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Xn(n)}),Dl(n,t),n}function Th(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ri,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ri,"path");return c.append(d),a.append(o,r,s,l,c),Nh(t,a,e,n),r.addEventListener("dblclick",()=>{let u=n(t);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&Pl(t,a,e,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(qn,String(e)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(qn)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(qn)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;let p=n(t);if(p?.type!=="padGrid")return;let h=u.dataTransfer?.getData(qn);if(h!==void 0&&h!==""){u.preventDefault(),u.stopPropagation();let g=Number(h);g!==e&&p.onMove?.(g,e,u.altKey);return}let m=u.dataTransfer?.files?.[0];m&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(e,m))}),a}function Ch(t,e,n){let a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Nh(t,e,n,a){let o=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(o),o=0};e.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,c();let u=a(t);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=Ii(t,e,n,a)},450)))}),e.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])e.addEventListener(d,c);e.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=Ii(t,e,n,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}Ch(t,n,a)})}function Ii(t,e,n,a){let o=a(t);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;Xn(t);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Xn(t)}),s.addEventListener("click",u=>u.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(let u of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Xn(t);let h=a(t);h?.type==="padGrid"&&(u.id==="rename"&&h.onRename?Pl(t,e,n,a):h.onMenu?.(n,u.id))}),l.append(p)}t.append(s,l);let c=t.getBoundingClientRect(),d=e.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Pl(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(t);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=r.value.trim();r.remove(),e.focus();let h=a(t);u&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());t.append(r),r.focus(),r.select()}function Xn(t){for(let e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Dl(t,e){let n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Mh(a.peaks))),!a.empty&&a.hint?r.dataset.hint="true":delete r.dataset.hint,a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let u=e.selected===o;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function le(){let t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function Ca(t,e){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;let a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function ji(t,e){let n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function wn(t){if(!Number.isFinite(t))return"";let e=Math.round(t*100)/100;return String(e)}var Fh=450,_i=8;function Le(){let t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function zh(t){let e=sp(t,"target-min");return e>0?e:44}function Ph(t){if(!(t instanceof HTMLElement))return;let e=[...t.querySelectorAll(".nc-hit")],n=zh(t),a=n/2,o=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){let s=e[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,u=c-a,p=c+a,h=d-a,m=d+a;for(let g=0;g<e.length;g++){if(r===g)continue;let w=o[g];if(!w||w.width===0)continue;let f=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-d)<a*2&&(f>c?p=Math.min(p,(c+f)/2):f<c&&(u=Math.max(u,(c+f)/2))),Math.abs(f-c)<a*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(h=Math.max(h,(d+b)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${u-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-u)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function Bl(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Hi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function pt(t,e){switch(t.type){case"slider":return Dh(t,e);case"select":return Oh(t,e);case"toggle":return qh(t,e);case"button":return Rh(t,e);case"readout":return Ih(t);case"label":return Wh(t);case"note":return Wi(t);case"knob":return Yh(t,e);case"choice":return Kh(t,e);case"slotRow":return Xh(t,e);case"stepGrid":return Zh(t,e);case"canvas":return af(t);case"fx":return hf(t,e);case"eqGraph":return _p(t,e);case"levelSteps":return ih(t,e);case"group":return Sh(t,e,pt);case"strip":return of(t,e);case"stripAdd":return cf(t,e);case"padGrid":return Lh(t,e);case"moves":return _h(t,e);default:return Wi({id:"unknown",text:""})}}function ke(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){let n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Rl(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(Ol(e))),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));let o=t.querySelector("[data-nc-readout]");o&&(o.textContent=e.valueText??wn(e.value))}else if(e.type==="select"){let n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),ji(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){let n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")ji(t,e.text),e.type==="note"&&t instanceof HTMLElement&&(e.tone?t.dataset.ncTone=e.tone:delete t.dataset.ncTone);else if(e.type==="knob"){t instanceof HTMLElement&&Ve(t,e.help);let n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Uh(n,e);let a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??wn(e.value))}else if(e.type==="choice")Il(t,e);else if(e.type==="slotRow")_l(t,e);else if(e.type==="stepGrid")Oo(t,e);else if(e.type==="padGrid")Dl(t,e);else if(e.type==="moves")ql(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){let n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&hl(n,e)}else if(e.type==="eqGraph")gl(t,e);else if(e.type==="levelSteps")Al(t,e);else if(e.type==="strip"){Gl(t,e);for(let n of e.sends??[]){let a=t.querySelector(`[data-nc-id="${Bt(n.id)}"]`);a instanceof Element&&ke(a,{...n,type:"knob",compact:!0})}}else if(e.type==="stripAdd")Wl(t,e);else if(e.type==="group"){zl(t,e);for(let n of e.controls){let a=t.querySelector(`[data-nc-id="${Bt(n.id)}"]`);a instanceof Element&&ke(a,n)}}else if(e.type==="fx"){tc(t,e);for(let n of[...e.controls,...e.more??[]]){let a=t.querySelector(`[data-nc-id="${Bt(n.id)}"]`);a instanceof Element&&ke(a,n)}}}}function Dh(t,e){let n=Ca(t.id,t.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id;let o=Ta(t.taper,t.min,t.max);a.min=String(o?0:t.min),a.max=String(o?1e3:t.max),a.step=String(o?1:t.step),o&&(a.dataset.ncTaper=t.taper),a.value=String(Ol(t)),a.disabled=t.disabled===!0,a.dataset.ncId=t.id;let r=l=>o?ko(l.taper??t.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=e(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=e(a);l?.type==="slider"&&l.onCommit?.(r(l))}),o&&a.addEventListener("keydown",l=>{let c=e(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??t.taper,u=pl(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);u!==null&&(l.preventDefault(),a.value=String(dr(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(Bh(t,a,e),s),n.append(le()),ke(n,t),n}function Ol(t){return Ta(t.taper,t.min,t.max)?dr(t.taper,t.min,t.max,t.value):t.value}function Bh(t,e,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Le());let o=r=>{let s=n(e);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Oh(t,e){let n=Ca(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;let o=null;for(let r of t.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?o?.getAttribute("label")!==r.group&&(o=document.createElement("optgroup"),o.setAttribute("label",r.group),a.append(o)):o=null,(o??a).append(s)}return a.value=t.value,a.addEventListener("change",()=>{let r=e(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,le()),n}function qh(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{let a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(le()),ke(n,t),n}function Rh(t,e){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{let r=e(n);r?.type==="button"&&r.onPress()}),n.append(le()),ke(n,t),!t.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=t.id,o.setAttribute("aria-label","Surprise me"),o.title=t.sparkleTitle??"Surprise me",o.innerHTML=Bl(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Hl(r);let s=e(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function Ih(t){let e=Ca(t.id,t.label);return e.append(le()),ke(e,t),e}var jh=450;function _h(t,e){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(let a of t.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Hh(l.icon)),c.addEventListener("click",()=>{let d=e(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}o.append(r,s),n.append(o)}return ql(n,t),n}function ql(t,e){for(let n of e.groups)for(let a of n.moves){let o=t.querySelector(`[data-nc-move="${Bt(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function Hh(t){let e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){let a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){let a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Wh(t){let e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(le()),e}function Wi(t){let e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",t.tone&&(e.dataset.ncTone=t.tone),e.textContent=t.text,e.append(le()),e}function Ui(t){if(typeof t.valueText=="string")return t.valueText;let e=wn(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Rl(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Uh(t,e){let n=sa(e.taper,e.min,e.max,e.value);Rl(t,e.modulated===!0);let a=Math.round(n*270);if(t.style.setProperty("--knob-turn",String(a)),e.bipolar){let o=typeof e.origin=="number"&&Number.isFinite(e.origin)?Math.round(sa(e.taper,e.min,e.max,e.origin)*270):135;t.style.setProperty("--knob-from",String(Math.min(a,o))),t.style.setProperty("--knob-to",String(Math.max(a,o)))}t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Ui(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Ui(e)}`}function Gh(t,e){if(Ta(t.taper,t.min,t.max))return pl(t.taper,t.min,t.max,t.value,e.key,e.shiftKey,t.step);let n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,o=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+o:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-o:null}function Yh(t,e){let n=Ca(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,s=0;a.addEventListener("pointerdown",d=>{r=d.clientY;let u=e(a);s=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let u=e(a);if(u?.type!=="knob")return;if(Ta(u.taper,u.min,u.max)){let m=sa(u.taper,u.min,u.max,s)-(d.clientY-r)/120;u.onChange(dl(u.taper,u.min,u.max,m));return}let p=u.max-u.min||1,h=Math.min(u.max,Math.max(u.min,s-(d.clientY-r)*p/120));u.onChange(h)}),a.addEventListener("dblclick",()=>{let d=e(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let u=e(a);if(u?.type!=="knob")return;let p=Gh(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(le()),ke(n,t),n}function Kh(t,e){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label),t.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=t.caption,n.dataset.ncCaption="",n.append(a)}for(let a of t.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=e(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(le()),Il(n,t),n}function Il(t,e){for(let n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Xh(t,e){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){let p=t.slots[u],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(u),m.textContent=p.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,Le()),Vh(h,m,n,u,e),a.append(h)}let o=t.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Bl(),o.append(Le()),o.addEventListener("click",()=>{Hl(n);let u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...o?[o]:[]),n.append(d,r,le()),jl(n,e),_l(n,t),n}function Gi(t,e,n,a){let o=n(t);if(o?.type!=="slotRow")return;ln(t);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(e,r)}function Vh(t,e,n,a,o){let r=0,s=0,l=0,c=!1,d=!1,u=!1,p=!1,h=()=>{window.clearTimeout(r),r=0},m=b=>{let y=b.clientX-s,v=b.clientY-l;y*y+v*v>_i*_i&&(c=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",f))},w=b=>{let y=r!==0&&!c&&!d;h(),g(),y&&(u=!0,Gi(n,a,o,b))},f=()=>{c=!0,h(),g()};t.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,u=!1,s=b.clientX,l=b.clientY,h(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Qh(n,e,a,o))},Fh),p=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",f))}),t.addEventListener("contextmenu",b=>b.preventDefault()),t.addEventListener("click",b=>{if(u||d||c){u=!1,d=!1,c=!1;return}Gi(n,a,o,b)})}function jl(t,e){if(t.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Yi("Save","store"),o=Yi("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),ln(t)}),r.addEventListener("click",s=>s.stopPropagation()),t.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=e(t);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),ln(t)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),ln(t))}),t.addEventListener("keydown",s=>{s.key==="Escape"&&ln(t)})}function Yi(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Qh(t,e,n,a){jl(t,a);let o=t.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=t.getBoundingClientRect(),l=e.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function ln(t){let e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function _l(t,e){for(let o of t.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=e.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));let a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Hl(t){let e=t.dataset.ncLastFill||null,n=Yu(e);t.dataset.ncLastFill=n;let a=Ku(n);if(a)for(let[o,r]of Object.entries(a))t.style.setProperty(o,r)}function Jh(t,e){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=e(t);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Zh(t,e){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=f=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=f,a.append(b),b},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let b of[r,s]){let y=b===f;b.setAttribute("aria-checked",y?"true":"false"),b.tabIndex=y?0:-1}};l(r);for(let f of[r,s])f.addEventListener("click",()=>l(f));a.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let b=s.getAttribute("aria-checked")==="true"?r:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),t.onFill&&c.append(Jh(n,e)),t.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=t.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let b=e(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(f)}n.append(c);for(let f of t.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=f.label,y.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(y.dataset.ncLane=String((f.lane-1)%4+1));let v=!1,x=0;y.addEventListener("pointerdown",A=>{v=!1,!(A.pointerType==="mouse"||A.button!==0)&&(x=window.setTimeout(()=>{let S=e(n);S?.type!=="stepGrid"||!S.selectedRows||(v=!0,S.onSelectRow?.(S.rows.findIndex(L=>L.id===f.id),!0))},jh))});for(let A of["pointerup","pointercancel","pointerleave"])y.addEventListener(A,()=>window.clearTimeout(x));y.addEventListener("contextmenu",A=>{v&&A.preventDefault()}),y.addEventListener("click",A=>{let S=e(n);if(S?.type!=="stepGrid")return;if(v){v=!1;return}let L=S.rows.findIndex(U=>U.id===f.id),_=!!S.selectedRows&&(A.shiftKey||A.metaKey||A.ctrlKey);S.onSelectRow?.(L,_)}),y.addEventListener("keydown",A=>ef(n,y,A));let $=[];for(let A of["mute","solo"]){if(!(A==="mute"?t.onMute:t.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=A,L.textContent=A==="mute"?"M":"S",L.setAttribute("aria-label",`${A==="mute"?"Mute":"Solo"} ${f.label}`),S.append(L,Le()),S.addEventListener("click",()=>{let _=e(n);if(_?.type!=="stepGrid")return;let U=_.rows.findIndex(ce=>ce.id===f.id);(A==="mute"?_.onMute:_.onSolo)?.(U)}),$.push(S)}let k=document.createElement("div");k.className="nc-steps";for(let A=0;A<f.steps.length;A++){let S=document.createElement("span");S.className="nc-step-wrap";let L=document.createElement("button");L.type="button",L.className="nc-step",L.dataset.ncStep=`${f.id}:${A}`,L.setAttribute("aria-label",`${f.label} step ${A+1}`),S.append(L,Le()),S.addEventListener("click",_=>{let U=e(n);if(U?.type!=="stepGrid")return;let ce=U.rows.findIndex(Re=>Re.id===f.id),q=s.getAttribute("aria-checked")==="true";U.onToggle(ce,A,_.shiftKey||q)}),k.append(S)}if(t.onLength&&k.append(tf(n,k,f,e)),b.append(...$,y,k),t.onDice){let A=document.createElement("button");A.type="button",A.className="nc-sparkle nc-row-dice",A.dataset.ncDice=f.id,A.setAttribute("aria-label",`Re-roll ${f.label}`),A.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,A.innerHTML=Hi(),A.append(Le()),A.addEventListener("click",()=>{let S=e(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(L=>L.id===f.id))}),b.append(A)}b.addEventListener("click",A=>{if(A.target!==b)return;let S=e(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(L=>L.id===f.id))}),Ki(n,k,".nc-step-wrap",e,s,()=>f.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let u=(f,b,y)=>{let v=document.createElement("button");return v.type="button",v.className=f,v.textContent=b,y&&v.setAttribute("aria-label",y),v},p=u("nc-pads-step","‹","Previous lane"),h=u("nc-pads-step","›","Next lane"),m=document.createElement(t.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),t.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=e(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Oo(n,f))}));for(let[f,b]of[[p,-1],[h,1]])f.addEventListener("click",()=>{let y=e(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((Rn(y)+b)%v+v)%v)});if(d.append(p,m,h),t.onDice){let f=u("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=Hi(),f.addEventListener("click",()=>{let b=e(n);if(b?.type!=="stepGrid")return;let y=Rn(b);y>=0&&b.onDice?.(y)}),d.append(f)}if(t.transport){let f=u("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let b=e(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(f)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let w=Math.max(0,...t.rows.map(f=>f.steps.length));for(let f=0;f<w;f++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(f),b.textContent=String(f+1),b.addEventListener("click",y=>{let v=e(n);if(v?.type!=="stepGrid")return;let x=Rn(v);if(x<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(x,f+1);return}let $=s.getAttribute("aria-checked")==="true";v.onToggle(x,f,y.shiftKey||$)}),g.append(b)}return Ki(n,g,".nc-pad",e,s,()=>{let f=e(n);return f?.type==="stepGrid"?f.rows[Rn(f)]?.id:void 0}),n.append(g),n.append(le()),Oo(n,t),n}function Rn(t){let e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Ki(t,e,n,a,o,r){let s="on",l=!0,c=-1,d=(u,p)=>{let h=u.rows[c]?.steps[p];!h||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,s,l):!!h[s]!==l&&u.onToggle(c,p,s==="accent"))};$h(e,n,u=>{let p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;let h=p.rows.findIndex(m=>m.id===r());h>=0&&p.rows[h].length!==u.pad+1&&p.onLength?.(h,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let h=r();c=p.rows.findIndex(g=>g.id===h);let m=p.rows[c]?.steps[u.pad];if(!m)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(p,u.pad)}else if(u.kind==="long"){let h=r(),m=p.rows.findIndex(w=>w.id===h),g=e.querySelectorAll(n)[u.pad];m>=0&&g instanceof HTMLElement&&p.onLongPress?.(m,u.pad,g)}}})}function ef(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...t.querySelectorAll(".nc-name")],o=a.indexOf(e),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===e||(n.preventDefault(),s.focus(),s.click())}function tf(t,e,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(Le());let r=d=>{let u=a(t);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(g=>g.id===n.id),h=u.rows[p];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&u.onLength?.(p,m)},s=d=>{let u=[...e.querySelectorAll(".nc-step")],p=1;return u.forEach((h,m)=>{let g=h.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(p=m+1)}),p},l=d=>r(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let u=a(t);if(u?.type!=="stepGrid")return;let p=u.rows.find(m=>m.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in h&&(d.preventDefault(),r(h[d.key]))}),o}var to=new WeakMap,In=new WeakMap;function nf(t){return t?(In.has(t)||(In.set(t,xo(t)),nl(e=>{In.set(t,e);for(let n of t.querySelectorAll("[data-nc-velocity]"))Bo(n,Number(n.getAttribute("data-nc-velocity")))},t)),In.get(t)):"light"}function Bo(t,e){let n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:nf(t.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(to.has(t)&&to.get(t)===o)){if(to.set(t,o),n===null){for(let r of Object.keys(Ai(1)))t.style.removeProperty(r);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(Ai(n,$i[a]??$i.light)))t.style.setProperty(r,s)}}function Xi(t,e){let n=typeof e?.mark=="string"?e.mark.trim().slice(0,2):"";n?t.dataset.ncMark!==n&&(t.dataset.ncMark=n):"ncMark"in t.dataset&&delete t.dataset.ncMark}function Oo(t,e){let n=e.rows.some(u=>u.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");let o=t.querySelector(".nc-pads"),r=e.rows.find(u=>u.id===e.selectedRow)??e.rows[0],s=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=t.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=t.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!e.transport?.playing,p=e.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let h=e.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let u=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(let p of o.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),m=r.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!m||!l&&h>=r.length,l&&h>=r.length?p.dataset.out="true":delete p.dataset.out,l&&h===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${h+1}${m?.markLabel?`, ${m.markLabel}`:""}`),Xi(p,m),p.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?p.dataset.accent="true":delete p.dataset.accent,m?.dim?p.dataset.dim="true":delete p.dataset.dim,Bo(p,m?.velocity),e.playhead>=0&&h===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of e.rows){for(let m=0;m<u.steps.length;m++){let g=u.steps[m],w=t.querySelector(`[data-nc-step="${u.id}:${m}"]`);if(!(w instanceof HTMLButtonElement))continue;let f=w.closest(".nc-row");if(f instanceof HTMLElement){e.selectedRow===u.id?f.dataset.selected="true":delete f.dataset.selected;let x=e.selectedRow!==u.id&&(e.selectedRows??[]).includes(u.id);x?f.dataset.picked="true":delete f.dataset.picked;let $=f.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===u.id||x?"true":"false"),$.textContent!==u.label&&($.textContent=u.label,$.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?f.dataset.silent="true":delete f.dataset.silent;for(let k of f.querySelectorAll("[data-nc-ms]")){let A=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",A?"true":"false")}}w.setAttribute("aria-pressed",g.on?"true":"false");let b=`${u.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;w.getAttribute("aria-label")!==b&&w.setAttribute("aria-label",b),Xi(w,g),g.accent?w.dataset.accent="true":delete w.dataset.accent,g.dim?w.dataset.dim="true":delete w.dataset.dim,m%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof g.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),Bo(w,g.velocity);let y=e.playhead>=0&&u.length>0?(e.playhead%u.length+u.length)%u.length:-1;m===y?w.dataset.playhead="true":delete w.dataset.playhead;let v=!!e.onLength&&e.selectedRow===u.id;w.hidden=m>=u.length&&!v,m>=u.length&&v?w.dataset.out="true":delete w.dataset.out}let p=t.querySelector(`[data-nc-len="${u.id}"]`),h=t.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let m=document.activeElement===p;h.after(p),m&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function af(t){let e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;let n=document.createElement("span");n.className="nc-label",n.textContent=t.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,le()),e}function of(t,e){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let r=!t.master&&typeof t.onFold=="function",s=null;r&&(n.dataset.ncFoldable="",s=Vl(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=e(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(o);let l=null;if(!t.master&&typeof t.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",x=>{if(x.key!=="ArrowLeft"&&x.key!=="ArrowRight"||x.ctrlKey||x.metaKey||x.shiftKey)return;let $=e(n);$?.type==="strip"&&(x.preventDefault(),$.onMove?.(x.key==="ArrowLeft"?-1:1))})}if(l&&typeof t.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Ji(n,l,e))),!t.master&&typeof t.onShade=="function"&&a.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),Ji(n,a,e,{x:v.clientX,y:v.clientY}))}),t.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let x=e(n);x?.type==="strip"&&x.onRemove?.(v)}),a.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",t.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks",x.dataset.ncHacks="",v.append(x,Le()),v.addEventListener("click",()=>{let $=e(n);$?.type==="strip"&&$.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",t.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let x=document.createElement("button");x.type="button",x.className="nc-hacks nc-sends-view",x.dataset.ncSendsView="",v.append(x,Le()),v.addEventListener("click",()=>{let $=e(n);$?.type==="strip"&&$.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?t.onMute:t.onSolo))continue;let x=document.createElement("span");x.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",x.append($,Le()),x.addEventListener("click",()=>{let k=e(n);k?.type==="strip"&&(v==="mute"?k.onMute:k.onSolo)?.()}),d.append(x)}let u=document.createElement("div");u.className="nc-strip-sends";for(let v of t.sends??[])u.append(pt({...v,type:"knob",compact:!0},e));let p=document.createElement("div");p.className="nc-strip-pan",t.pan&&p.append(pt(br(t),e));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let v of t.ticks??[]){let x=document.createElement("span");x.className="nc-scale-tick",x.style.setProperty("--tick-pos",String(v.value)),x.textContent=v.label,m.append(x)}let g=mp({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:v=>{let x=e(n);x?.type==="strip"&&x.onChange(v)},onReset:()=>{let v=e(n);v?.type==="strip"&&Qi(v)}}),w=xp({channels:t.channels===2?2:1,label:t.label,onClear:()=>{let v=e(n);v?.type==="strip"&&v.onClipClear?.()}});if(h.append(m,g.el,w.el),r){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let x=document.createElement("span");x.className="nc-strip-fold-cap",x.setAttribute("aria-hidden","true");let $=document.createElement("span");$.className="nc-ui-fx-fold-name",$.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!t.pan,v.append(x,k,$),v.addEventListener("click",()=>{let A=e(n);if(A?.type!=="strip")return;A.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),h.prepend(v)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;f.addEventListener("click",v=>{let x=e(n);x?.type!=="strip"||!x.onTypeIn||(window.clearTimeout(b),v.detail===0?Vi(n,f,e):v.detail===1&&(b=window.setTimeout(()=>Vi(n,f,e),lf)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let v=e(n);v?.type==="strip"&&Qi(v)});let y=document.createElement("div");return y.className="nc-strip-trim",t.trim&&y.append(pt(yr(t),e)),s&&n.append(s),l&&n.append(l),n.append(a,y,c,d,u,p,h,f,le()),Gl(n,t),n}function br(t){let e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??sf(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function yr(t){let e=t.trim,n=e.min??-12,a=e.max??24;return{type:"knob",id:e.id,label:e.label??"Trim",ariaLabel:e.ariaLabel??`${t.label} trim`,min:n,max:a,step:e.step??.5,value:e.value,valueText:e.valueText??rf(e.value),defaultValue:e.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:e.help,onChange:o=>e.onChange(o)}}function rf(t){let e=Math.round((Number(t)||0)*10)/10;if(e===0)return"0 dB";let n=Number.isInteger(e)?String(Math.abs(e)):Math.abs(e).toFixed(1);return`${e>0?"+":"−"}${n} dB`}function sf(t){let e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}var lf=250;function Vi(t,e,n){let a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??wn(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=o.value;if(o.remove(),e.hidden=!1,l){let d=n(t);d?.type==="strip"&&d.onTypeIn?.(c)}e.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function cf(t,e){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=e(n),c=s.value;Ul(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,le()),Wl(n,t),n}function Wl(t,e){let n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);let a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);let o=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Ul(a))}function Ul(t){let e=t.options[0];e&&(e.selected=!0)}function Qi(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Gl(t,e){let n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);let a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label),t.toggleAttribute("data-nc-sends-hidden",e.sendsHidden===!0);let o=t.querySelector(".nc-fader"),r=o?gp(o):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),kp(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);let s=t.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=e.valueText??wn(e.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${e.label} level ${g}`);let w=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";s.title=e.onTypeIn?`Click to type a value. ${w}`:w}for(let g of t.querySelectorAll("[data-nc-ms]")){let w=g.getAttribute("data-nc-ms"),f=w==="mute"?e.mute===!0:e.solo===!0;g.setAttribute("aria-pressed",f?"true":"false"),g.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${e.label}`)}let l=t.querySelector("[data-nc-hacks]");if(l){let g=e.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${e.label}`),l.toggleAttribute("data-nc-empty",e.hacksEmpty===!0)}let c=t.querySelector("[data-nc-sends-view]");if(c){let g=e.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",e.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${e.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",e.sendsViewEmpty===!0),Ve(c,e.sendsViewHelp)}let d=t.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${e.label}`),d.title=e.moveHelp??"Drag to move this channel");let u=Yl(e);if(u?t.dataset.ncShade=String(u):delete t.dataset.ncShade,e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,(e.trim||e.trimRow)&&!e.trimHidden?t.dataset.ncTrim="":delete t.dataset.ncTrim,e.trim){let g=t.querySelector(`.nc-strip-trim [data-nc-id="${Bt(e.trim.id)}"]`);g&&ke(g,yr(e))}if(e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));let g=t.querySelector(`.nc-strip-pan [data-nc-id="${Bt(e.pan.id)}"]`);g&&ke(g,br(e))}let p=!e.master&&typeof e.onFold=="function"&&e.folded===!0;p?t.dataset.ncFolded="true":delete t.dataset.ncFolded;let h=t.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Ql(h,p,e.label),Ve(h,e.foldHelp));let m=t.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!p,m.setAttribute("aria-label",`Expand ${e.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==e.label&&(g.textContent=e.label),Ve(m,e.foldedHelp??e.foldHelp)}}function Yl(t){let e=t?.shade;return!t?.master&&Number.isInteger(e)&&e>=1&&e<=Kl?e:0}var Kl=8,jn=null;function Ji(t,e,n,a){jn?.();let o=n(t);if(o?.type!=="strip")return null;let r=t.ownerDocument,s=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=Yl(o),p=t.querySelector("[data-nc-strip-grip]")??e,h=(b=!1)=>{if(jn!==h)return;jn=null;let y=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",g,!0),r.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",f),(b||y)&&p?.isConnected&&p.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Kl},(b,y)=>y+1)].map(b=>{let y=r.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",b===u?"true":"false"),y.setAttribute("tabindex",b===u?"0":"-1"),y.dataset.ncShadeChoice=String(b),b===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(b),y.setAttribute("aria-label",`Shade ${b}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),y.addEventListener("click",()=>{let v=n(t);h(!0),v?.type==="strip"&&v.onShade?.(b===0?null:b)}),y});if(d.append(...m),d.addEventListener("keydown",b=>{let y=m.indexOf(r.activeElement);if(y<0)return;let v=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?v=(y+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?v=(y-1+m.length)%m.length:b.key==="Home"?v=0:b.key==="End"&&(v=m.length-1),!(v<0)&&(b.preventDefault(),m[y].setAttribute("tabindex","-1"),m[v].setAttribute("tabindex","0"),m[v].focus())}),l.append(c,d),typeof o.onMove=="function"){let b=[...t.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),y=b.indexOf(t);for(let[v,x,$]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=r.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=v<0?"left":"right";let A=r.createElement("span");A.textContent=x;let S=r.createElement("kbd");S.textContent=$,S.setAttribute("aria-hidden","true"),k.append(A,S),k.disabled=v<0?y<=0:y<0||y>=b.length-1,k.addEventListener("click",()=>{let L=n(t);h(!0),L?.type==="strip"&&L.onMove?.(v)}),l.append(k)}}r.body.append(l),(()=>{let b=e.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,v=l.offsetHeight,x=s.innerWidth||r.documentElement.clientWidth||y,$=s.innerHeight||r.documentElement.clientHeight||v,k=a?a.x:b.right-y,A=a?a.y:b.bottom+4;k=Math.max(4,Math.min(k,x-y-4)),A+v>$-4&&(A=Math.max(4,(a?a.y:b.top)-v-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round(A)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),h(!0);else if(b.key==="Tab"&&l.contains(r.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(x=>x.getAttribute("tabindex")!=="-1"),v=(y.indexOf(r.activeElement)+(b.shiftKey?-1:1)+y.length)%y.length;b.preventDefault(),y[v]?.focus()}},w=b=>{l.contains(b.target)||h(!1)},f=()=>h(!1);return r.addEventListener("keydown",g,!0),r.addEventListener("pointerdown",w,!0),s.addEventListener("resize",f),jn=h,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var qo=typeof ResizeObserver=="function"?new ResizeObserver(df):null;function df(t){for(let e of t){if(!e.target.isConnected){qo.unobserve(e.target);continue}let n=e.target.parentElement;n?.classList.contains("nc-ui-fx")&&uf(n)}}function uf(t){let e=t.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=t.querySelector(":scope > .nc-eq"),a=e instanceof HTMLElement?e.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(t).rowGap)||0;t.style.setProperty("--nc-fx-hd-h",`${a}px`),t.style.setProperty("--nc-fx-pin-h",`${a+o+r}px`)}function pf(t){if(qo)for(let e of t.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))qo.observe(e)}function hf(t,e){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;let o=typeof t.onFold=="function",r=!!t.meter,s=typeof t.onRemove=="function";if(t.on===void 0&&!o&&!ua(t)&&!r&&!s)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),r&&l.append(Zl(n,"head")),t.on!==void 0){let c=sl({checked:t.on,labelledBy:a.id,onChange:d=>{let u=e(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}o&&l.append(mf(n,e)),ua(t)&&l.append(wf(n,e)),s&&l.append(vf(e)),n.append(l)}o&&n.prepend(gf(n,e)),r&&ec(n,t);for(let l of t.controls)n.append(pt(l,e));if(t.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=t.moreLabel??"More",l.append(c);for(let d of t.more)l.append(pt(d,e));n.append(l)}return n.append(le()),tc(n,t),pf(n),n}var ff=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Xl(t){let e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),a=t.dataset.ncFolded==="true"&&e&&ff(e)?e:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function mf(t,e){let n=Vl();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Xl(t))}),n}function Vl(){let t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";let e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Ql(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function gf(t,e){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,o),t.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Zl(t,"fold")),n.addEventListener("click",()=>{let s=e(n);if(s?.type==="fx"){if(s.folded!==!0){let l=t.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Xl(t)}}),n}var jt=new Set;function Vn(t,e){let n=t.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(e):setTimeout(e,16)}var ua=t=>t.maximize===!0||t.maximize!==!1&&t.controls.some(e=>e.type==="eqGraph"||e.type==="levelSteps"),bf="(max-width: 768px)";function yf(){let t=document.createElement("span");t.className="nc-fx-max-icon",t.setAttribute("aria-hidden","true");for(let e=0;e<4;e++)t.append(document.createElement("i"));return t}function wf(t,e){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(yf()),n.addEventListener("click",()=>{let a=e(n);a?.type==="fx"&&(Jl(t,a,!jt.has(a.id)),n.focus())}),n}function vf(t){let e=document.createElement("button");return e.type="button",e.className="nc-fx-remove",e.dataset.ncFxRemove="",e.textContent="×",e.addEventListener("click",()=>{let n=t(e);n?.type==="fx"&&n.onRemove?.(e)}),e}function Jl(t,e,n){n?jt.add(e.id):jt.delete(e.id),wr(t,e)}function xf(t,e){e?.type==="fx"&&jt.has(e.id)&&Jl(t,e,!1)}function kf(t){return t.ownerDocument.defaultView?.matchMedia?.(bf).matches?"tall":t.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function wr(t,e){let n=t.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=ua(e)&&jt.has(e.id)&&!(typeof e.onFold=="function"&&e.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!ua(e)||typeof e.onFold=="function"&&e.folded===!0,t.hasAttribute("data-nc-maxable")===n.hidden&&(t.toggleAttribute("data-nc-maxable",!n.hidden),Vn(t.ownerDocument,()=>{for(let s of t.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&It(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${e.title}`),n.title=a?"Restore (Esc)":"Maximize",Ve(n,e.maxHelp)),!a){t.dataset.ncMax&&Zi(t);return}if(!t.isConnected){let s=()=>t.isConnected&&jt.has(e.id)&&wr(t,e);queueMicrotask(()=>{t.isConnected?s():Vn(t.ownerDocument,s)});return}let o=kf(t),r=[...t.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&t.style.setProperty("--nc-fx-dials",String(r)),t.dataset.ncMax!==o&&(t.dataset.ncMax&&Zi(t),t.dataset.ncMax=o,o==="over"&&$f(t,e)),Af(t.ownerDocument),o==="over"&&vr(t),Vn(t.ownerDocument,()=>{for(let s of t.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&It(s)})}function Zi(t){let e=t.dataset.ncMax;delete t.dataset.ncMax,t.style.removeProperty("--nc-fx-dials"),e==="over"&&(t.previousElementSibling?.matches(".nc-fx-ghost")&&t.previousElementSibling.remove(),t.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),t.style.removeProperty("left"),t.style.removeProperty("top"),t.style.removeProperty("width"),t.removeAttribute("role"),t.removeAttribute("aria-label")),Vn(t.ownerDocument,()=>{for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&It(n)})}function $f(t,e){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${t.offsetHeight}px`,t.before(n),t.setAttribute("role","region"),t.setAttribute("aria-label",`${e.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${e.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=t.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),t.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function vr(t){let e=t.previousElementSibling,n=t.closest(".nc-module");if(!(e instanceof HTMLElement)||!e.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=t.ownerDocument.defaultView,r=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,s=jp(e.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,o?.innerWidth??Number.POSITIVE_INFINITY);t.style.left=`${s.left}px`,t.style.top=`${s.top}px`,t.style.width=`${s.width}px`}var es=new WeakSet;function Af(t){es.has(t)||(es.add(t),t.addEventListener("keydown",e=>{if(e.key!=="Escape"||e.defaultPrevented)return;let n=[...t.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(t.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(e.preventDefault(),a.click())}),t.defaultView?.addEventListener("resize",()=>{for(let e of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))e instanceof HTMLElement&&vr(e)}))}var Ro=new WeakMap;function Zl(t,e){let n=bh(t.ownerDocument);return n.dataset.ncFxLevel=e,n}function ec(t,e){let n=[...t.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)Ve(o,e.meterHelp);let a=Ro.get(t);a?a.set(e.meter):Ro.set(t,xh(n,e.meter))}function tc(t,e){(e.meter||Ro.has(t))&&ec(t,e);let n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);let a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;let o=typeof e.onFold=="function"&&e.folded===!0;o?t.dataset.ncFolded="true":delete t.dataset.ncFolded,e.foldSlim===!0?t.dataset.ncFoldSlim="":delete t.dataset.ncFoldSlim;let r=t.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Ql(r,o,e.title),Ve(r,e.foldHelp)),wr(t,e);let s=t.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=e.removeLabel??`Remove ${e.title}`;s.hidden=o,s.setAttribute("aria-label",c),s.title=c}let l=t.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=e.on===void 0?"":e.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${e.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=e.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=l.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=e.title),Ve(l,e.foldHelp)}}function Ve(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function Bt(t){return t.replace(/["\\]/g,"\\$&")}function Ef(t,e){for(let n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=e.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&hl(n,a)}for(let n of t.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&It(n);for(let n of t.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&vr(n);Ph(t)}var Sf=Ke["toast-duration"];function Mf({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function Lf(t,e,n,a){let o=l=>({top:l,bottom:l+n}),r=l=>t.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=o(e-a-n);return r(s)?r(o(a))?"bottom":"top":"bottom"}function Tf(t,e,n,a,o,r){let s=t.bottom+o,l=Math.max(r,Math.min(t.left,a-r-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let u of e)u&&u.bottom>s&&u.top<s+n.height&&u.right>l&&u.left<l+n.width&&(s=u.bottom+o,c=!0)}return{top:s,left:l}}var ts="data-nc-ui-toast-live";function Cf(t,e){let n=e.querySelector(`[${ts}]`);return n||(n=t.createElement("div"),n.setAttribute(ts,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function Nf({message:t,actionLabel:e,onAction:n,duration:a=Sf,onClose:o,avoid:r=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,u=c.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");let p=c.createElement("span");p.className="nc-ui-toast-message",p.textContent=t,u.appendChild(p);let h=null;e&&(h=c.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=e,u.appendChild(h)),l.appendChild(u);let m="open",g=oe=>oe&&typeof oe.getBoundingClientRect=="function"?oe.getBoundingClientRect():null,w=g(u),f=w?.height||44,b=d.getComputedStyle?.(u),y=Number.parseFloat(b?.getPropertyValue(H("toast-offset")))||16,v=Number.parseFloat(b?.getPropertyValue(H("toast-anchor-gap")))||8,x=g(s),$=d.innerHeight??0,k=r.map(g).filter(Boolean),A=x&&x.bottom>0&&x.top<$?Tf(x,k,{width:w?.width||0,height:f},d.innerWidth??0,v,y):null;A&&A.top+f<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${A.top+(d.scrollY??0)}px`,u.style.left=`${A.left+(d.scrollX??0)}px`):u.setAttribute("data-placement",Lf(k,$,f,y));let S=d.requestAnimationFrame?.bind(d)??(oe=>setTimeout(oe,16));S(()=>S(()=>{m==="open"&&u.setAttribute("data-state","open")})),Cf(c,l).textContent=Mf({message:t,actionLabel:e});let L,_,U=new Promise(oe=>{_=oe}),ce=oe=>{clearTimeout(L),L=setTimeout(()=>$t("timeout"),oe)},q=a,Re=Date.now(),kt=()=>{m==="open"&&(clearTimeout(L),q=Math.max(0,q-(Date.now()-Re)))},Vt=()=>{m==="open"&&(Re=Date.now(),ce(q))};u.addEventListener("pointerenter",kt),u.addEventListener("pointerleave",Vt),u.addEventListener("focusin",kt),u.addEventListener("focusout",Vt),h?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{$t("action")}}),Number.isFinite(a)&&ce(a);function $t(oe="close"){if(m!=="open")return;m="closing",clearTimeout(L),u.setAttribute("data-state","closing"),o?.(oe);let Qt=d.getComputedStyle?.(u),Pn=Qt?Math.max(0,...String(Qt.transitionDuration||"").split(",").map(Zt=>Number.parseFloat(Zt)*(Zt.trim().endsWith("ms")?1:1e3)||0)):0,Jt=()=>{m!=="gone"&&(m="gone",u.remove(),_(oe))};u.addEventListener("transitionend",Jt),setTimeout(Jt,Pn+50)}return{el:u,close:$t,closed:U}}var ns="data-nc-help";function Ff(t,e,n,a=0,o=6,r=8){let s=t.top-o-e.height,l=s>=a+r?"above":"below",c=l==="above"?s:t.bottom+o,d=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(c),left:Math.round(d),side:l}}var no=new WeakMap;function zf(t){let e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function Pf({document:t=globalThis.document,delay:e=350}={}){if(!t)return{uninstall(){},hide(){}};let n=no.get(t);if(n)return n;let a=t.defaultView,o=null,r=null,s,l=!1,c,d=()=>{clearTimeout(s),clearTimeout(c),r=null,l=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},u=(g,w)=>{let f=w??g.getAttribute(ns);if(!f)return!1;o||(o=t.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",t.body.appendChild(o)),o.textContent=f,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let b=g.getBoundingClientRect(),y=Ff(b,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,zf(t));return o.style.top=`${y.top}px`,o.style.left=`${y.left}px`,o.dataset.side=y.side,o.style.visibility="",!0},p=g=>{if(l||g.pointerType==="touch")return;let w=g.target&&g.target.closest?g.target.closest(`[${ns}]`):null;w!==r&&(d(),w&&(r=w,s=setTimeout(()=>{r===w&&w.isConnected&&u(w)},e)))},h=g=>{(l||g.key==="Escape")&&d()};t.addEventListener("pointerover",p),t.addEventListener("pointerdown",d,!0),t.addEventListener("keydown",h),a.addEventListener("scroll",d,!0),a.addEventListener("blur",d);let m={hide:d,pin(g,w,{ms:f=0}={}){return d(),!g||!g.isConnected||!u(g,w)?!1:(l=!0,o.dataset.pinned="",f>0&&(c=setTimeout(d,f)),!0)},uninstall(){d(),t.removeEventListener("pointerover",p),t.removeEventListener("pointerdown",d,!0),t.removeEventListener("keydown",h),a.removeEventListener("scroll",d,!0),a.removeEventListener("blur",d),o?.remove(),o=null,no.delete(t)}};return no.set(t,m),m}var Df="(max-width: 768px)",Bf='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Of='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',qf=0;function Rf({panel:t,button:e,label:n="Menu",media:a=Df}){let o=t.ownerDocument,r=o.defaultView??globalThis;t.classList.add("nc-page-menu"),t.id||(t.id=`nc-page-menu-${++qf}`);let s=e??o.createElement("button");e||(s.type="button",s.innerHTML=Bf),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",t.id);let l=()=>t.hasAttribute("data-nc-open");function c(){l()||(t.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),o.addEventListener("keydown",u,!0),o.addEventListener("pointerdown",p,!0),[...t.querySelectorAll(Of)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let b=t.contains(o.activeElement);t.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),o.removeEventListener("keydown",u,!0),o.removeEventListener("pointerdown",p,!0),(f??b)&&s.focus?.({preventScroll:!0})}function u(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function p(f){let b=f.target;b instanceof r.Node&&(t.contains(b)||s.contains(b))||d({focus:!1})}let h=()=>l()?d({focus:!0}):c(),m=f=>{let b=f.target,y=b instanceof r.Element?b.closest("button"):null;!y||!t.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),t.addEventListener("click",m);let g=r.matchMedia?.(a),w=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",w),{button:s,panel:t,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),t.removeEventListener("click",m),g?.removeEventListener?.("change",w)}}}var xr="netcomposer.rhythm.hidden.v1",Ne=new WeakMap;function ao(){try{return globalThis.localStorage??null}catch{return null}}function nc(t,e=xr){try{let n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function as(t,e,n,a=xr){let o=nc(t,a);n?o.add(e):o.delete(e);try{t?.setItem(a,JSON.stringify([...o]))}catch{}}function kr(t){let e=[...t.controls??[],...(t.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of e)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),o.pan&&n.push(br(o)),o.trim&&n.push(yr(o)));return n}function ac(t,e){if(!(!t||!e))return kr(t).find(n=>n.id===e)}function If(t){return`${`${t.layout??""}:${(t.sections??[]).map(e=>`${e.id}${e.panel?":panel":""}${e.area?`@${e.area}`:""}`).join(",")}`}#${kr(t).map(e=>e.type==="stepGrid"?`stepGrid:${e.id}:${e.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${e.onMute?":m":""}${e.onSolo?":s":""}`:e.type==="moves"?`moves:${e.id}:${e.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:e.type==="padGrid"?`padGrid:${e.id}:${e.pads.length}:${e.columns??2}`:e.type==="slotRow"?`slotRow:${e.id}:${e.slots.length}${e.onSparkle?":spark":""}`:e.type==="button"?`button:${e.id}${e.onSparkle?":spark":""}`:e.type==="select"?`select:${e.id}:${e.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:e.type==="strip"?`strip:${e.id}:${e.channels??1}:${e.master?"master":""}:${e.onMute?"m":""}${e.onSolo?"s":""}${e.onRemove?"x":""}${e.onHacks?"h":""}${e.onFold?"f":""}${e.pan?`p=${e.pan.id}`:""}${e.trim?`t=${e.trim.id}`:""}:${(e.sends??[]).map(n=>n.id).join(",")}:${(e.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:e.type==="group"?`group:${e.id}:${e.controls.map(n=>n.id).join(",")}`:e.type==="fx"?`fx:${e.id}:${e.depth}:${e.on===void 0?"":"sw"}${e.onFold?":fold":""}${e.onRemove?":x":""}:${e.controls.map(n=>n.id).join(",")}/${(e.more??[]).map(n=>n.id).join(",")}`:`${e.type}:${e.id}`).join("|")}`}function jf(t,e){if(!e.title)return;if(!e.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),t.append(n),oc(t,e)}function oc(t,e){if(!e.panel)return;let n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),o&&(o.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function _f(t){let e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;let n=Ne.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ac(n,a)}function Hf(t,e,n){let a=e.sections??[{id:"main",controls:e.controls??[]}],o=If(e);if(t.dataset.ncSignature===o){for(let r of a){let s=t.querySelector(`[data-nc-section="${rs(r.id)}"]`);s&&oc(s,r);for(let l of r.controls){let c=t.querySelector(`[data-nc-id="${rs(l.id)}"]`);c instanceof Element&&ke(c,l)}s instanceof HTMLElement&&Io(s,r,n)}return}t.dataset.ncSignature=o,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),jf(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let c of r.controls)l.append(pt(c,_f));t.append(s),Io(s,r,n)}}function rc(t,e,n){let a=e>0?Math.max(1,Math.ceil(t/e)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var Wf="(max-width: 768px)",ic=new WeakMap;function os(t){let e=document.createElement("button");e.type="button",e.className="nc-fx-page-btn",e.dataset.ncFxPage=t;let n=t==="prev"?"Previous effects page":"Next effects page";e.setAttribute("aria-label",n),e.title=t==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),e.append(a),e}function Uf(t,e){let n=[...t.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=os("prev"),r=os("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,s,r,l);let c=(d,u)=>{let p=ic.get(t);if(!p||u.getAttribute("aria-disabled")==="true")return;let h=t.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=rc(h,p.pageSize,(e.pages.get(p.id)??0)+d);e.pages.set(p.id,m),p.onPage?.(m),Io(t,{...p,page:m},e),u.getAttribute("aria-disabled")==="true"&&t.ownerDocument.activeElement===u&&(u===o?r:o).focus(),e.redraw()};return o.addEventListener("click",()=>c(-1,o)),r.addEventListener("click",()=>c(1,r)),t.prepend(a),a}function Io(t,e,n){ic.set(t,e);let a=[...t.querySelectorAll(":scope > .nc-ui-fx")],o=e.pageSize??0,{pages:r,page:s}=rc(a.length,o,e.page??n.pages.get(e.id)??0);if(o>0&&n.pages.set(e.id,s),r<=1){for(let f of[...t.children])f.classList.contains("nc-fx-pager")&&f.remove();delete t.dataset.ncPaged;for(let f of a)delete f.dataset.ncOffPage;return}t.dataset.ncPaged="";let l=t.ownerDocument.defaultView?.matchMedia?.(Wf).matches===!0,c=t.closest(".nc-module");a.forEach((f,b)=>{let y=Math.floor(b/o)!==s;if(y?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?Ne.get(c):void 0;xf(f,ac(v,f.dataset.ncId))}});let d=Uf(t,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===r-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${r}`;h.textContent!==m&&(h.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${r}`;g.textContent!==w&&(g.textContent=w)}function rs(t){return t.replace(/["\\]/g,"\\$&")}function Gf(t,e=xr){rl();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");let a=nc(ao(),e).has(t.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=sl({labelledBy:r.id,onChange:y=>(Ne.get(n)??t).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",o.append(r,u,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,o,p,h),n.setAttribute("aria-labelledby",r.id);let w=y=>{let v=Ne.get(n)??t;n.dataset.ncOpen=y?"false":"true",p.hidden=y,h.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";as(ao(),(Ne.get(n)??t).id,y,e),w(y),jo(n.parentElement)}),h.addEventListener("click",()=>{as(ao(),(Ne.get(n)??t).id,!1,e),w(!1),jo(n.parentElement)});let f={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(y){Ne.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=y.title,u.textContent=y.status??"",y.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),m.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),Hf(p,y,f),w(p.hidden),b.redraw()},redraw(){let y=Ne.get(n);y&&Ef(n,kr(y))}};return Ne.set(n,t),w(a),b.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),nl(()=>b.redraw(),n.ownerDocument),b}function Yf(t,e,n="adjacent"){rl(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();let a=n==="stack"?"stack":"adjacent";e.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),t.append(o.el),o.redraw()}),jo(t)}function jo(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}let e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));let o=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&o.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}const Kf="https://musicmatter.art/library/library.json",Ot="musicmatter.art",Xf=["CC0-1.0","CC-BY-4.0","CC-BY-SA-4.0","PDM-1.0"],sc=6,Vf=2,$r=["kick","snare","clap","hat","tom","perc","cymbal","fx","tonal"],lc=["redistributable","personal","unknown"],pa=t=>typeof t=="number"&&Number.isFinite(t)&&t>=40&&t<=250;function cc(t){const e=t.kind==="loop"?"loop":t.kind==="one-shot"?"one-shot":"";return{kind:e,bpm:e==="loop"&&pa(t.bpm)?t.bpm:0}}const Ge=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},j=(t,e=300)=>typeof t=="string"?t.trim().slice(0,e):"",ue=(t,e=0)=>typeof t=="number"&&Number.isFinite(t)?t:e,be=t=>{const e=j(t,600);return/^https?:\/\/[^\s"'<>]+$/i.test(e)?e:""},Ar=/^[0-9a-f]{64}$/,dc="0123456789abcdefghijklmnopqrstuvwxyz";function Qf(t){const e=Ge(t),n=Array.isArray(e.sounds)?e.sounds:[],a=new Set,o=[];for(const r of n){const s=Ge(r),l=j(s.id,160),c=j(s.role),d=j(s.license,40),u=be(s.audio),p=j(s.sha256,64).toLowerCase(),h=j(s.title,160);if(!l||a.has(l)||!$r.includes(c)||!u||!h||!Xf.includes(d)||!Ar.test(p))continue;a.add(l);const m=Ge(s.measures),g=ue(m.gain_db),w=Ge(s.source);o.push({id:l,origin:"shelf",licenseStatus:"",permission:"",role:c,title:h,instrument:h.split(" · ")[0]??h,tags:(Array.isArray(s.tags)?s.tags:[]).filter(f=>typeof f=="string").map(f=>f.toLowerCase().slice(0,40)),license:d,licenseUrl:be(s.license_url)||Er(d),creator:j(s.creator,120)||"Unknown",creatorLink:be(s.creator_link),source:be(w.url),audio:u,manifest:be(s.manifest),sha256:p,measures:{length:ue(m.length_s,1),attack:ue(m.attack_ms,10),decay:ue(m.decay_s,.3),centroid:ue(m.centroid_hz,1e3),level:ue(m.hit_dbfs,-20)+g,gain:g},wave:typeof s.wave=="string"?Array.from(s.wave.slice(0,96),f=>Math.max(0,dc.indexOf(f))/35):[],...cc(s)})}return{name:j(e.name,120)||Ot,sounds:o}}function _o(t){const e=j(t,400).replace(/\\/g,"/");if(!e||e.startsWith("/")||/^[a-z][a-z0-9+.-]*:/i.test(e)||e.includes("\0"))return"";const n=e.split("/");return n.some(a=>!a||a==="."||a==="..")?"":n.join("/")}const Jf="local:";function uc(t,e){const n=Ge(t),a=Array.isArray(n.sounds)?n.sounds:[],o=new Set,r=[];for(const s of a){const l=Ge(s),c=j(l.id,160),d=`${Jf}${c}`,u=j(l.role),p=j(l.license,40)||"unknown",h=_o(l.audio),m=j(l.sha256,64).toLowerCase(),g=j(l.title,160);if(!c||o.has(d)||!$r.includes(u)||!h||!g||!Ar.test(m))continue;o.add(d);const w=Ge(l.measures),f=ue(w.gain_db),b=Ge(l.source),y=j(l.license_status,20);r.push({id:d,origin:"local",licenseStatus:lc.includes(y)?y:"unknown",permission:j(l.permission,300),role:u,title:g,instrument:g.split(" · ")[0]??g,tags:(Array.isArray(l.tags)?l.tags:[]).filter(v=>typeof v=="string").map(v=>v.toLowerCase().slice(0,40)),license:p,licenseUrl:be(l.license_url)||Er(p),creator:j(l.creator,120)||"Unknown",creatorLink:be(l.creator_link),source:be(b.url),audio:`local:${e}/${h}`,manifest:_o(l.manifest),sha256:m,measures:{length:ue(w.length_s,1),attack:ue(w.attack_ms,10),decay:ue(w.decay_s,.3),centroid:ue(w.centroid_hz,1e3),level:ue(w.hit_dbfs,-20)+f,gain:f},wave:typeof l.wave=="string"?Array.from(l.wave.slice(0,96),v=>Math.max(0,dc.indexOf(v))/35):[],...cc(l)})}return{name:j(n.name,120)||"Local Library",sounds:r}}function pc(t){const e=/^local:[^/]+\/(.+)$/.exec(t);return e?_o(e[1]):""}function is(t,...e){return{name:t,sounds:e.flatMap(n=>n?.sounds??[])}}function Er(t){return t==="CC0-1.0"?"https://creativecommons.org/publicdomain/zero/1.0/":t==="CC-BY-4.0"?"https://creativecommons.org/licenses/by/4.0/":t==="CC-BY-SA-4.0"?"https://creativecommons.org/licenses/by-sa/4.0/":t==="PDM-1.0"?"https://creativecommons.org/publicdomain/mark/1.0/":""}function Sr(t,e="",n=""){return t==="CC0-1.0"?"CC0":t==="CC-BY-4.0"?"BY":t==="CC-BY-SA-4.0"?"BY-SA":t==="PDM-1.0"?"PD":t==="Permission-only"||n?"PERM":e==="personal"?"PERS":e==="unknown"||t==="unknown"?"?":t}function hc(t){return t.origin==="local"&&t.licenseStatus!=="redistributable"}function Na(t,e=24){const n=t.trim();if(n.length<=e)return n;const[a=n,o=""]=n.split(" · "),r=o.split(/\s+/).at(-1)??"",s=/^(?:v|vl|rr|k)?\d{1,2}$|^(?:p{1,3}|mp|mf|f{1,3})\d*$/i.test(r)?r:"",l=s?`${a} ${s}`:"";return l&&l.length<=e?l:a.length<=e?a:n.slice(0,e).trim()}const Ho={kick:"kick",kicks:"kick",bd:"kick",bassdrum:"kick","bass drum":"kick","kick drum":"kick",snare:"snare",snares:"snare",sd:"snare","snare drum":"snare",rimshot:"snare",clap:"clap",claps:"clap",handclap:"clap",handclaps:"clap","hand clap":"clap","hand claps":"clap",hat:"hat",hats:"hat",hihat:"hat",hihats:"hat","hi-hat":"hat","hi-hats":"hat","hi hat":"hat","hi hats":"hat","high hat":"hat",hh:"hat",ch:"hat",oh:"hat",tom:"tom",toms:"tom",tomtom:"tom","floor tom":"tom",perc:"perc",percs:"perc",percussion:"perc",cymbal:"cymbal",cymbals:"cymbal",crash:"cymbal",ride:"cymbal",splash:"cymbal",china:"cymbal",fx:"fx",sfx:"fx",effect:"fx",effects:"fx",tonal:"tonal",melodic:"tonal",pitched:"tonal",bell:"tonal",bells:"tonal",mallet:"tonal",mallets:"tonal",chime:"tonal",chimes:"tonal"},Zf={ch:"closed",oh:"open"},ss={punchy:{wants:[{measure:"attack",dir:-1},{measure:"decay",dir:-1}],tag:"punchy"},tight:{wants:[{measure:"decay",dir:-1}],tag:"tight"},snappy:{wants:[{measure:"decay",dir:-1},{measure:"centroid",dir:1}],tag:"snappy"},short:{wants:[{measure:"length",dir:-1},{measure:"decay",dir:-1}],tag:"short"},dry:{wants:[{measure:"decay",dir:-1}]},long:{wants:[{measure:"length",dir:1},{measure:"decay",dir:1}],tag:"long"},ringing:{wants:[{measure:"decay",dir:1}]},wet:{wants:[{measure:"decay",dir:1}]},big:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},boomy:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}],tag:"boomy"},fat:{wants:[{measure:"decay",dir:1},{measure:"centroid",dir:-1}]},deep:{wants:[{measure:"centroid",dir:-1}],tag:"deep"},dark:{wants:[{measure:"centroid",dir:-1}],tag:"dark"},warm:{wants:[{measure:"centroid",dir:-1}]},low:{wants:[{measure:"centroid",dir:-1}]},muffled:{wants:[{measure:"centroid",dir:-1}]},bright:{wants:[{measure:"centroid",dir:1}],tag:"bright"},crisp:{wants:[{measure:"centroid",dir:1},{measure:"decay",dir:-1}]},sharp:{wants:[{measure:"centroid",dir:1},{measure:"attack",dir:-1}]},high:{wants:[{measure:"centroid",dir:1}]},airy:{wants:[{measure:"centroid",dir:1}]},loud:{wants:[{measure:"level",dir:1}],tag:"hard"},hard:{wants:[{measure:"level",dir:1}],tag:"hard"},heavy:{wants:[{measure:"level",dir:1},{measure:"centroid",dir:-1}]},soft:{wants:[{measure:"level",dir:-1}],tag:"soft"},quiet:{wants:[{measure:"level",dir:-1}],tag:"soft"},gentle:{wants:[{measure:"level",dir:-1}],tag:"soft"},ghost:{wants:[{measure:"level",dir:-1}],tag:"soft"}},Wo={funk:["tight","punchy"],funky:["tight","punchy"],disco:["tight","bright"],dusty:["dark","soft"],lofi:["dark","soft"],"lo-fi":["dark","soft"],vintage:["dark"],"70s":["dark","tight"],"60s":["dark","soft"],old:["dark"],jazz:["soft","dark"],jazzy:["soft","dark"],rock:["hard","long"],metal:["hard","bright"],hiphop:["punchy","dark"],"hip-hop":["punchy","dark"],"boom bap":["punchy","dark"],boombap:["punchy","dark"],trap:["punchy","short"],techno:["tight","punchy"],house:["tight","punchy"],ambient:["long","soft"],cinematic:["big","long"],epic:["big","loud"]},fc=new Set(["kit","kits","drumkit","drumkits","drums","set","drum kit"]),em=new Set("a an the some any with and or of for to me my give find get want need please like sound sounds sample samples one ones really very bit little more less that this".split(" "));function tm(t){const e=t.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean),n=[];for(let a=0;a<e.length;a++){const o=`${e[a]} ${e[a+1]??""}`;e[a+1]&&(o in Ho||o in Wo||fc.has(o))?(n.push(o),a++):n.push(e[a])}return n}function Mr(t){return new Set(t.title.toLowerCase().split(/[^a-z0-9]+/).map(e=>e.replace(/\d+$/,"")).filter(e=>e.length>1))}function Uo(t,e){const n={text:t.trim(),roles:[],tags:[],softTags:[],wants:[],kit:!1,kind:"",unknown:[]},a=new Set;if(e)for(const r of e.sounds){for(const s of r.tags)a.add(s);for(const s of Mr(r))a.add(s)}const o=r=>{const s=ss[r];s&&(n.wants.push(...s.wants),s.tag&&!n.softTags.includes(s.tag)&&n.softTags.push(s.tag))};for(const r of tm(t))if(fc.has(r))n.kit=!0;else if(r in Ho){const s=Ho[r];n.roles.includes(s)||n.roles.push(s);const l=Zf[r];(l==="open"||l==="closed")&&(n.kind=l)}else if(r in ss)o(r);else if(r in Wo)for(const s of Wo[r]??[])o(s);else if(r==="open")n.kind="open";else if(r==="closed"||r==="close")n.kind="closed";else{if(em.has(r))continue;if(!e||a.has(r)||a.has(r.replace(/s$/,""))){const s=e&&!a.has(r)?r.replace(/s$/,""):r;n.tags.includes(s)||n.tags.push(s)}else n.unknown.push(r)}return n}function nm(t,e){const n=[...t].sort((r,s)=>r.measures[e]-s.measures[e]),a=new Map,o=Math.max(1,n.length-1);return n.forEach((r,s)=>a.set(r.id,s/o)),a}const am=[{measure:"level",dir:1,weight:.5},{measure:"length",dir:-1,weight:.2}],om=.2,rm={kick:-1,tom:-1,snare:1,clap:1,hat:1};function Lr(t,e){const n=new Set(e.wants.map(s=>s.measure)),a=new Map,o=(s,l)=>{let c=a.get(s);return c||(c=nm(t,s),a.set(s,c)),c.get(l)??.5},r=(s,l)=>s.reduce((c,d)=>{const u=o(d.measure,l);return c+(d.dir>0?u:1-u)},0)/Math.max(1,s.length);return t.map(s=>{const l=Mr(s);let c=0;for(const u of e.tags)c+=s.tags.includes(u)?2:l.has(u)?1:0;e.wants.length&&(c+=2*r(e.wants,s.id));const d=rm[s.role];for(const u of[...am,...d?[{measure:"centroid",dir:d,weight:om}]:[]])n.has(u.measure)||(c+=2*u.weight*r([u],s.id));for(const u of e.softTags)s.tags.includes(u)&&(c+=.4);return{sound:s,score:c}})}const ls=(t,e)=>e.score-t.score||t.sound.title.localeCompare(e.sound.title)||t.sound.id.localeCompare(e.sound.id);function ha(t,e,n,a){let o=t.sounds.filter(r=>!a.has(r.id)&&(!e.length||e.includes(r.role)));if(n.length){const r=o.filter(s=>{const l=Mr(s);return n.some(c=>s.tags.includes(c)||l.has(c))});r.length&&(o=r)}return o}function Tr(t,e){const n=[...t].sort(ls),a=[],o=new Map;for(const r of n){if(a.length>=e)break;const s=o.get(r.sound.instrument)??0;s>=Vf||(o.set(r.sound.instrument,s+1),a.push(r))}for(const r of n){if(a.length>=e)break;a.includes(r)||a.push(r)}return a.sort(ls)}function im(t,e){if(!e)return t;const n=t.filter(a=>a.role==="hat"&&vn(a)===e);return n.length?n:t}function sm(t,e,n={}){const a=e.kind&&!e.roles.length?["hat"]:e.roles,o=im(ha(t,a,e.tags,n.exclude??new Set),e.kind);return Tr(Lr(o,e),n.limit??sc)}const lm=[{key:"kick",label:"Kick",role:"kick",nearest:["tom","perc"]},{key:"snare",label:"Snare",role:"snare",nearest:["clap","perc"]},{key:"clap",label:"Clap",role:"clap",nearest:["snare","perc"]},{key:"closed-hat",label:"Closed hat",role:"hat",tag:"closed",nearest:["perc","cymbal"]},{key:"open-hat",label:"Open hat",role:"hat",tag:"open",nearest:["cymbal","perc"]},{key:"tom",label:"Tom",role:"tom",nearest:["perc","kick"]},{key:"perc",label:"Perc",role:"perc",nearest:["tom","tonal"]},{key:"fx",label:"FX",role:"fx",nearest:["tonal","cymbal","perc"]}];function vn(t){if(t.tags.includes("closed"))return"closed";if(t.tags.includes("open"))return"open";const e=t.title.toLowerCase();return/\bclose[d]?\b|hitc\b/.test(e)?"closed":/\bopen\b|hito\b/.test(e)?"open":""}function cm(t,e,n,a){const o=ha(t,[e.role],n.tags,a);if(e.tag){const r=o.filter(l=>vn(l)===e.tag);if(r.length)return{list:r,role:e.role,kindMissing:!1};const s=o.filter(l=>vn(l)==="");if(s.length)return{list:s,role:e.role,kindMissing:!0}}else if(o.length)return{list:o,role:e.role,kindMissing:!1};for(const r of e.nearest){const s=ha(t,[r],n.tags,a);if(s.length)return{list:s,role:r,kindMissing:!1}}return{list:[],role:e.role,kindMissing:!1}}const dm={kick:"a kick",snare:"a snare",clap:"a clap",hat:"a hat",tom:"a tom",perc:"a percussion sound",cymbal:"a cymbal",fx:"an effect",tonal:"a tonal sound"};function cs(t,e){const n=e.wants.some(r=>r.measure==="level")?e:{...e,wants:[...e.wants,{measure:"level",dir:1}]},a=new Set,o=[];for(const r of lm){const{list:s,role:l,kindMissing:c}=cm(t,r,n,a),d=Tr(Lr(s,n),1)[0];if(!d)continue;a.add(d.sound.id);const u=l!==r.role?`No ${r.label.toLowerCase()} in the Library: ${dm[l]} instead.`:c?`No ${r.label.toLowerCase()} labelled as one: the nearest hat instead.`:void 0;o.push({slot:r,sound:d.sound,...u?{note:u}:{}})}return o}const Cr="your local Library";function Nr(t,e){return{id:t.id,title:t.title,role:t.role,creator:t.creator,creatorLink:t.creatorLink,license:t.license,licenseUrl:t.licenseUrl,source:t.source,audio:t.audio,sha256:t.sha256,gainDb:t.measures.gain,curator:t.origin==="local"?Cr:Ot,query:e.trim().slice(0,120),kind:t.role==="hat"?vn(t):"",origin:t.origin,licenseStatus:t.licenseStatus}}function um(t){if(!t||typeof t!="object"||Array.isArray(t))return null;const e=t,n=j(e.id,160),a=j(e.title,160),o=j(e.license,40),r=j(e.sha256,64).toLowerCase();if(!n||!a||!o)return null;const s=$r.includes(e.role)?e.role:"perc",l=e.kind==="closed"||e.kind==="open"?e.kind:"",c=e.origin==="local"?"local":"shelf",d=j(e.licenseStatus,20),u=c==="local"?pc(j(e.audio,600))?j(e.audio,600):"":be(e.audio);return{id:n,title:a,role:s,creator:j(e.creator,120)||"Unknown",creatorLink:be(e.creatorLink),license:o,licenseUrl:be(e.licenseUrl)||Er(o),source:be(e.source),audio:u,sha256:Ar.test(r)?r:"",gainDb:Math.max(-60,Math.min(60,ue(e.gainDb))),curator:j(e.curator,80)||(c==="local"?Cr:Ot),query:j(e.query,120),kind:l,origin:c,licenseStatus:c==="local"&&lc.includes(d)?d:c==="local"?"unknown":""}}function pm(t,e,n=new Set,a=3){const o=Uo(e.query,t),r=new Set([...n,e.id]);let s=ha(t,[e.role],o.tags,r);if(e.role==="hat"&&e.kind){const l=s.filter(c=>vn(c)===e.kind);l.length&&(s=l)}return Tr(Lr(s,{...o,roles:[e.role]}),a)}function mc(t){const e=new Map;return t.forEach((n,a)=>{const o=n.provenance;if(!o)return;const r=e.get(o.id);r?r.pads.push(a+1):e.set(o.id,{...o,pads:[a+1]})}),[...e.values()]}function hm(t){return["shelf","local"].map(n=>({origin:n,credits:t.filter(a=>(a.origin??"shelf")===n)})).filter(n=>n.credits.length)}const fm=-14,mm=-1,gc=24,gm=.05,bm=-80,ds=t=>t>0?20*Math.log10(t):Number.NEGATIVE_INFINITY;function ym(t,e){const n=t[0]?.length??0,a=t.length;if(!n||!a)return{hit:Number.NEGATIVE_INFINITY,peak:Number.NEGATIVE_INFINITY};const o=Math.max(1,Math.round(gm*e)),r=new Float64Array(n);let s=0;for(let d=0;d<n;d++){let u=0;for(const p of t){const h=p[d]??0;u+=h;const m=h<0?-h:h;m>s&&(s=m)}u/=a,r[d]=u*u}let l=0,c=0;for(let d=0;d<n;d++)l+=r[d]??0,d>=o&&(l-=r[d-o]??0),l>c&&(c=l);return{hit:ds(Math.sqrt(Math.max(0,c)/o)),peak:ds(s)}}function wm(t){if(!Number.isFinite(t.hit)||t.hit<bm)return 0;let e=Math.min(fm-t.hit,gc);Number.isFinite(t.peak)&&(e=Math.min(e,mm-t.peak));const n=Math.round(e*10)/10;return n===0?0:n}function _t(t,e){return{on:!0,gainDb:wm(ym(t,e))}}const vm=Object.freeze({on:!0,gainDb:0});function us(t){return t.normalize?t.normalize.on:t.provenance!==null}function xm(t){const e=t.normalize;return e?e.on?e.gainDb:t.provenance?-t.provenance.gainDb:0:0}function km(t){const e=xm(t);return e===0?1:10**(e/20)}function $m(t){if(!t||typeof t!="object"||Array.isArray(t))return null;const e=t;if(typeof e.on!="boolean")return null;const n=e.gainDb;return typeof n!="number"||!Number.isFinite(n)||n<-60||n>gc?null:{on:e.on,gainDb:n}}function Am(t){const e=Math.round(t*10)/10;return e===0?"0.0 dB":`${e>0?"+":"−"}${Math.abs(e).toFixed(1)} dB`}const V=16,te=16,Ht=10,bc=["1","2","3","4","5","6","7","8","9","0"],yc=[0,2,4,8,16],wc=[0,1,2,4,8],fa=["always","1:2","2:2","1:3","2:3","3:3","1:4","2:4","3:4","4:4","1:5","2:5","3:5","4:5","5:5","1:6","2:6","3:6","4:6","5:6","6:6","1:7","2:7","3:7","4:7","5:7","6:7","7:7","1:8","2:8","3:8","4:8","5:8","6:8","7:8","8:8","fill","!fill","pre","!pre"],ma={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}};function Ae(t){return{name:`Pad ${t+1}`,sample:null,mode:"oneshot",dir:"fwd",start:0,end:1,slices:0,cuts:[],tune:0,fine:0,fit:0,keepPitch:!0,attack:0,decay:4,cutoff:0,resonance:0,level:.8,pan:0,choke:0,provenance:null,normalize:null,offsetDb:0,follow:null,note:0}}function xn(t){return!t.sample||t.fit>0?!1:t.follow??t.provenance?.role==="tonal"}function Em(t,e){const n=/^(\d):(\d)$/.exec(t.cond);return!t.on||!n?{}:{mark:n[1],markLabel:`${e===te?"bar":"pass"} ${n[1]} of ${n[2]}`}}function Nn(){return{on:!1,accent:!1,velocity:.8,chance:1,slice:null,pitch:0,reverse:!1,cond:"always"}}function Fa(){return{length:te,mute:!1,solo:!1,steps:Array.from({length:te},Nn)}}function vc(){return{filter:{on:!0,mode:"lp",cutoff:1,resonance:.15},drive:structuredClone(ma.drive),compressor:structuredClone(ma.compressor)}}function Go(){return{v:1,pads:Array.from({length:V},(t,e)=>Ae(e)),lanes:Array.from({length:V},Fa),swing:.5,hacks:vc(),slots:Array.from({length:Ht},()=>null),active:null,selected:0,master:1}}const Pe=t=>t&&typeof t=="object"&&!Array.isArray(t)?t:{},ie=(t,e,n,a)=>typeof t=="number"&&Number.isFinite(t)?Math.min(n,Math.max(e,t)):a,ze=(t,e,n,a)=>Math.round(ie(t,e,n,a)),Qe=(t,e)=>typeof t=="boolean"?t:e,ga=(t,e,n)=>e.includes(t)?t:n,_n=/^[0-9a-f]{16,64}$/,Sm=1e-6;function Mm(t,e){const n=Pe(t),a=Ae(e);let o=ie(n.start,0,1,0),r=ie(n.end,0,1,1);r-o<Sm&&([o,r]=[0,1]);const s=yc.includes(n.slices)?n.slices:0,l=typeof n.cuts=="string"&&n.cuts.length<=kc?n.cuts.split(" ").map(Number):n.cuts,c=Array.isArray(l)?l.filter(d=>typeof d=="number"&&d>0&&d<1).sort((d,u)=>d-u).slice(0,15):[];return{name:typeof n.name=="string"&&n.name.trim()?n.name.trim().slice(0,24):a.name,sample:typeof n.sample=="string"&&_n.test(n.sample)?n.sample:null,mode:ga(n.mode,["oneshot","gate","loop"],a.mode),dir:ga(n.dir,["fwd","rev","pingpong"],a.dir),start:o,end:r,slices:s,cuts:s?c:[],tune:ze(n.tune,-24,24,0),fine:ze(n.fine,-100,100,0),fit:wc.includes(n.fit)?n.fit:0,keepPitch:Qe(n.keepPitch,!0),attack:ie(n.attack,0,.1,a.attack),decay:ie(n.decay,.01,4,a.decay),cutoff:ie(n.cutoff,-1,1,0),resonance:ie(n.resonance,0,1,0),level:ie(n.level,0,1,a.level),pan:ie(n.pan,-1,1,0),choke:ze(n.choke,0,4,0),provenance:typeof n.sample=="string"&&_n.test(n.sample)?um(n.provenance):null,normalize:typeof n.sample=="string"&&_n.test(n.sample)?$m(n.normalize):null,offsetDb:typeof n.sample=="string"&&_n.test(n.sample)?ie(n.offsetDb,-24,0,0):0,follow:typeof n.follow=="boolean"?n.follow:null,note:ze(n.note,0,11,0)}}function Lm(t){const e=Pe(t);return{on:Qe(e.on,!1),accent:Qe(e.accent,!1),velocity:ie(e.velocity,0,1,.8),chance:ie(e.chance,0,1,1),slice:e.slice===null||e.slice===void 0?null:ze(e.slice,0,15,0),pitch:ze(e.pitch,-12,12,0),reverse:Qe(e.reverse,!1),cond:ga(e.cond,fa,"always")}}function Tm(t){const e=Pe(t),n=Array.isArray(e.steps)?e.steps:typeof e.steps=="string"?Om(e.steps):[];return{length:ze(e.length,1,te,te),mute:Qe(e.mute,!1),solo:Qe(e.solo,!1),steps:Array.from({length:te},(a,o)=>Lm(n[o]))}}function ps(t,e){const n=Pe(t),a={...e.dials};for(const[o,r]of Object.entries(Pe(n.dials)))o in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[o]=r);return{on:Qe(n.on,e.on),dials:a}}function Cm(t){const e=Pe(t),n=Pe(e.filter),a=vc();return{filter:{on:Qe(n.on,a.filter.on),mode:ga(n.mode,["lp","hp","bp"],a.filter.mode),cutoff:ie(n.cutoff,0,1,a.filter.cutoff),resonance:ie(n.resonance,0,1,a.filter.resonance)},drive:ps(e.drive,ma.drive),compressor:ps(e.compressor,ma.compressor)}}function ba(t){const e=Pe(t),n=Array.isArray(e.pads)?e.pads:[],a=Array.isArray(e.lanes)?e.lanes:[];return{pads:Array.from({length:V},(o,r)=>Mm(n[r],r)),lanes:Array.from({length:V},(o,r)=>Tm(a[r])),swing:ie(e.swing,.5,.75,.5),hacks:Cm(e.hacks)}}function xc(t){const e=Pe(t);if(e.v!==1)return Go();const n=Array.isArray(e.slots)?e.slots:[],a=ba(e),o=Array.from({length:Ht},(s,l)=>n[l]?ba(n[l]):null),r=e.active===null?null:ze(e.active,0,Ht-1,-1);return{v:1,...a,slots:o,active:r!==null&&r>=0&&o[r]?r:null,selected:ze(e.selected,0,V-1,0),master:ie(e.master,0,1,1)}}function Fr(t,e){return structuredClone({index:e,pad:t.pads[e]??Ae(e),lane:t.lanes[e]??Fa()})}function Nm(t,e){const n=structuredClone(e);t.pads[n.index]=n.pad,t.lanes[n.index]=n.lane}function zr(t,e){const n=(r,s)=>r.index??s,a=e.map((r,s)=>Fr(t,n(r,s))),o=e.map((r,s)=>r.hat?t.pads[n(r,s)]?.choke??0:0).find(r=>r>0)??1;return e.forEach((r,s)=>{const l=Ae(n(r,s));l.sample=r.sample,l.name=r.name.slice(0,24)||l.name,l.provenance=r.provenance,l.normalize=r.normalize!==void 0?r.normalize&&{...r.normalize}:r.provenance?{on:!0,gainDb:0}:null,r.hat&&(l.choke=o),t.pads[n(r,s)]=l}),a}function Fm(t,e){const n=Array.from({length:V},(a,o)=>Fr(t,o));for(let a=0;a<V;a++)t.pads[a]=Ae(a);return zr(t,e),n}const kn=8;function zm(t,e,n,a=0){const o=t.pads[e],r=t.lanes[e];if(!o||!r)return;o.mode="oneshot",o.dir="fwd",o.decay=4,o.attack=0,o.fit=n,o.keepPitch=!0,o.slices=0,o.cuts=[],r.length=te;for(const l of r.steps)Object.assign(l,Nn());const s=r.steps[0];n<=kn&&s&&(s.on=!0,s.cond=n===1?"always":`${a%n+1}:${n}`)}function Pm(t,e=V){if(typeof t!="string"||!/^\d{1,3}$/.test(t))return-1;const n=Number(t)-1;return n>=0&&n<e?n:-1}function Pr(t){return structuredClone({pads:t.pads,lanes:t.lanes,swing:t.swing,hacks:t.hacks})}const kc=4096;function Dm(t){const e=Nn(),n=t.map(a=>{let o="";return a.on!==e.on&&(o+="x"),a.accent!==e.accent&&(o+="a"),a.reverse!==e.reverse&&(o+="r"),a.velocity!==e.velocity&&(o+=`v${a.velocity}`),a.chance!==e.chance&&(o+=`c${a.chance}`),a.slice!==e.slice&&a.slice!==null&&(o+=`s${a.slice}`),a.pitch!==e.pitch&&(o+=`p${a.pitch}`),a.cond!==e.cond&&(o+=`k${a.cond}`),o||"-"});for(;n.at(-1)==="-";)n.pop();return n.join(" ")}const Bm="-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?",hs=new RegExp(`[xar]|[vcsp]${Bm}|k\\S+$`,"gy");function Om(t){return t.length>kc?[]:t.split(" ").slice(0,te).map(e=>{const n={};if(e==="-"||e==="")return n;hs.lastIndex=0;let a=0;for(const o of e.matchAll(hs)){const r=o[0];a+=r.length;const s=r.slice(1);r==="x"?n.on=!0:r==="a"?n.accent=!0:r==="r"?n.reverse=!0:r[0]==="v"?n.velocity=Number(s):r[0]==="c"?n.chance=Number(s):r[0]==="s"?n.slice=Number(s):r[0]==="p"?n.pitch=Number(s):r[0]==="k"&&(n.cond=s)}return a===e.length?n:{}})}function qm(t){const e=t.pads.map((a,o)=>{const r=Ae(o),s={};for(const[l,c]of Object.entries(a))l==="cuts"?a.cuts.length&&(s.cuts=a.cuts.join(" ")):r[l]!==c&&(s[l]=c);return s}),n=t.lanes.map(a=>({...a.length!==te?{length:a.length}:{},...a.mute?{mute:!0}:{},...a.solo?{solo:!0}:{},steps:Dm(a.steps)}));return structuredClone({pads:e,lanes:n,swing:t.swing,hacks:t.hacks})}function $n(t){const e=new Set;for(const n of[t,...t.slots])for(const a of n?.pads??[])a.sample&&e.add(a.sample);return e}function $c(){try{return globalThis.localStorage??null}catch{return null}}function Rm(t,e=$c()){try{const n=e?.getItem(t);return n?xc(JSON.parse(n)):Go()}catch{return Go()}}function Im(t,e,n=$c()){try{return n?.setItem(t,JSON.stringify(e)),!!n}catch{return!1}}const He=1e-6;function jm(t,e){return Math.min(127,Math.max(0,(e+1)*12+(t%12+12)%12))}class oo{entries=[];add(e){for(const n of e){let a=this.entries.find(r=>r.chord?.hit===n.hit&&Math.abs(r.startBeat-n.startBeat)<He);a||(a={startBeat:n.startBeat,chord:{root:n.root,notes:[],startBeat:n.startBeat,lengthBeats:0,sounding:!0,hit:n.hit}},this.insert(a));const o=a.chord;o.notes.includes(n.note)||(o.notes.push(n.note),o.notes.sort((r,s)=>r-s)),o.lengthBeats=Math.max(o.lengthBeats,n.lengthBeats)}}off(e){if(e===void 0){this.entries=[];return}this.entries=this.entries.filter(n=>n.startBeat<e-He),this.entries.push({startBeat:e,chord:null})}cut(e){this.entries=this.entries.filter(n=>n.startBeat<e-He)}points(e=Number.NEGATIVE_INFINITY){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=e+He&&(n=a);return this.entries.slice(n).map(a=>({beat:a.startBeat,root:a.chord?a.chord.root:null}))}chordAt(e){let n=null;for(const o of this.entries){if(o.startBeat>e+He)break;n=o}if(!n?.chord)return null;const a=n.chord;return{...a,notes:[...a.notes],sounding:e<a.startBeat+a.lengthBeats-He}}pitchAt(e,{octave:n}={}){const a=this.chordAt(e);return a?n===void 0?a.root:jm(a.root,n):null}prune(e){let n=0;for(let a=0;a<this.entries.length;a++)this.entries[a].startBeat<=e+He&&(n=a);n>0&&this.entries.splice(0,n)}get size(){return this.entries.length}insert(e){let n=this.entries.length;for(;n>0&&this.entries[n-1].startBeat>e.startBeat+He;)n--;this.entries.splice(n,0,e)}}const fn=1,fs=1024,_m=48,Ac=128,Hm=["chord","root","top"],Wm=["chord","root","top","arp","note"];function Um(t){const e=t.split("|");if(e.length<5)return null;const n=Number(e[e.length-4]);return Number.isInteger(n)?n:null}const Yo=t=>typeof t=="object"&&t!==null,mn=t=>typeof t=="string"&&t.length>0&&t.length<=Ac,st=t=>typeof t=="number"&&Number.isFinite(t);function Gm(t){return Yo(t)?mn(t.id)?mn(t.source)?!Number.isInteger(t.note)||t.note<0||t.note>127?"note must be a whole number 0–127":!st(t.velocity)||t.velocity<0||t.velocity>1?"velocity must be 0–1":st(t.startBeat)?!st(t.lengthBeats)||t.lengthBeats<0?"bad lengthBeats":!st(t.spanBeats)||t.spanBeats<=0?"bad spanBeats":!st(t.gate)||t.gate<=0||t.gate>1?"gate must be above 0, at most 1":!st(t.offsetSec)||Math.abs(t.offsetSec)>2?"bad offsetSec":typeof t.role!="string"||!Wm.includes(t.role)?"bad role":Number.isInteger(t.hit)?!Number.isInteger(t.root)||t.root<0||t.root>127?"bad root":null:"bad hit":"bad startBeat":"bad source":"bad id":"not an object"}function Ym(t){if(!Yo(t))return"not an object";if(t.v!==fn)return`version ${String(t.v)} is not ${fn}`;if(t.kind==="notes"){if(!mn(t.source))return"bad source";if(!Array.isArray(t.events))return"events must be a list";if(t.events.length>fs)return`more than ${fs} events`;for(let e=0;e<t.events.length;e++){const n=Gm(t.events[e]);if(n)return`event ${e}: ${n}`;if(t.events[e].source!==t.source)return`event ${e}: from another source`}return null}if(t.kind==="off")return mn(t.source)?["stop","removed","off","restart"].includes(t.reason)?t.atBeat!==void 0&&!st(t.atBeat)?"bad atBeat":null:"bad reason":"bad source";if(t.kind==="routes"){if(!Array.isArray(t.routes)||t.routes.length>64)return"routes must be a list (at most 64)";for(const e of t.routes){if(!Yo(e)||!mn(e.source)||typeof e.name!="string"||e.name.length>Ac)return"bad route";if(!Hm.includes(e.role))return"bad route role";if(e.octave!==void 0&&!(Number.isInteger(e.octave)&&e.octave>=-1&&e.octave<=9))return"bad route octave";if(e.transpose!==void 0&&!(Number.isInteger(e.transpose)&&Math.abs(e.transpose)<=_m))return"bad route transpose"}return null}return"unknown kind"}const Km=t=>({id:t.id,source:t.source,note:t.note,velocity:t.velocity,startBeat:t.startBeat,lengthBeats:t.lengthBeats,role:t.role,offsetSec:t.offsetSec,spanBeats:t.spanBeats,gate:t.gate,hit:t.hit,root:t.root});function Xm(t){if(Ym(t))return null;const e=t;return e.kind==="notes"?{v:fn,kind:"notes",source:e.source,events:e.events.map(Km)}:e.kind==="off"?{v:fn,kind:"off",source:e.source,reason:e.reason,...e.atBeat===void 0?{}:{atBeat:e.atBeat}}:{v:fn,kind:"routes",routes:e.routes.map(n=>({source:n.source,name:n.name,role:n.role,...n.octave===void 0?{}:{octave:n.octave},...n.transpose===void 0?{}:{transpose:n.transpose}}))}}class Vm{track=new oo;run=null;current=[];serial=0;stats={accepted:0,ignored:0,invalid:0};get routes(){return this.current}get route(){return this.current[0]??null}get active(){return this.current.length>0}get version(){return this.serial}receive(e){const n=Xm(e);if(!n)return this.stats.invalid++,null;if(n.kind==="routes"){const r=this.route?.source??null;return this.current=n.routes,(this.route?.source??null)!==r&&this.reset(),n}const a=this.route?.source;if(n.source!==a)return this.stats.ignored++,n;if(n.kind==="off")return n.reason==="stop"&&n.atBeat===void 0||(n.reason==="restart"&&n.atBeat!==void 0?this.track.cut(n.atBeat):n.atBeat!==void 0?this.track.off(n.atBeat):this.track.off(),this.serial++),n;let o=!1;for(const r of n.events){const s=Um(r.id);if(s!==null&&this.run!==null&&s<this.run){this.stats.ignored++;continue}s!==null&&(this.run===null||s>this.run)&&(this.track=new oo,this.run=s),this.track.add([r]),this.stats.accepted++,o=!0}return o&&this.serial++,n}rootAt(e){return this.active?this.track.chordAt(e)?.root??null:null}points(e=Number.NEGATIVE_INFINITY){return this.active?this.track.points(e):[]}prune(e){this.track.prune(e)}reset(){this.track=new oo,this.run=null,this.serial++}}const Qm=t=>t.offsetDb?10**(t.offsetDb/20):1,Jm=.25;function Dr(t){return t.slices?t.cuts.length===t.slices-1?[0,...t.cuts,1]:Array.from({length:t.slices+1},(e,n)=>n/t.slices):[0,1]}function Ec(t,e,n){const a=t.start*e.frames,o=t.end*e.frames;if(n===null||!t.slices)return[Math.floor(a),Math.ceil(o)];const r=Dr(t),s=Math.min(n,r.length-2);return[Math.floor(a+r[s]*(o-a)),Math.ceil(a+r[s+1]*(o-a))]}function Zm(t,e,n,a=0){let r=2**((t.tune+t.fine/100+a)/12);if(t.fit){const s=(t.end-t.start)*e.frames/e.sampleRate,l=t.fit*4*(60/n);s>0&&l>0&&(r*=s/l)}return r}function Sc(t,e,n){return Math.max(1,Math.round(t*4*60/Math.max(1,e)*n))}function Br(t,e,n){if(!t.fit)return 1;const a=(t.end-t.start)*e.frames/e.sampleRate;return a>0?a/(t.fit*4*(60/Math.max(1,n))):1}const Wt=[.75,1.5];function eg(t,e,n){if(n===null||!t.slices)return[0,e];const a=Dr(t),o=Math.min(n,a.length-2);return[Math.floor((a[o]??0)*e),Math.ceil((a[o+1]??1)*e)]}const tg=1.5;function Or(t,e,n,a,o,r=!1,s){if(!n.on||!t.sample||!a)return null;const l=n.slice??(t.slices?e%t.slices:null),c=m=>s?eg(t,s.frames,m):Ec(t,a,m);let[d,u]=c(l);const p=n.reverse?t.dir==="rev"?"fwd":"rev":t.dir;if(t.mode==="oneshot"&&l!==null&&t.slices&&!r){const[m,g]=c(null);p==="fwd"?u=g:p==="rev"&&(d=m)}const h=s?2**(n.pitch/12)*(s.frames/Sc(t.fit,o,a.sampleRate)):Zm(t,a,o,n.pitch);return{sample:s?s.sample:t.sample,from:d,to:u,rate:h,gain:Math.min(1.5,n.velocity*(n.accent?tg:1))*t.level*km(t)*Qm(t),pan:t.pan,mode:t.mode,dir:p,attack:t.attack,decay:t.decay,cutoff:t.cutoff,resonance:t.resonance,choke:t.choke,chance:n.chance,cond:n.cond,fit:t.fit>0,...!r&&xn(t)?{follow:t.note}:{}}}function Mc(t,e,n,a=null,o){return Or(t,0,{on:!0,accent:!1,velocity:.8,chance:1,slice:a,pitch:0,reverse:!1,cond:"always"},e,n,!0,o)}function ng(t,e,n,a=()=>{}){const o=t.lanes.some(r=>r.solo);return{swing:t.swing,lanes:t.lanes.map((r,s)=>{const l=t.pads[s],c=l?.sample?e(l.sample):void 0,d=l?a(s):void 0;return{length:r.length,audible:o?r.solo:!r.mute,steps:r.steps.map((u,p)=>l?Or(l,p,u,c,n,!1,d):null)}})}}const qr=4,ag=.03,og=new Set(["oneshot","oneshots","shot","shots","hit","hits","stab","stabs","single"]),rg=new Set(["loop","loops","break","breaks","breakbeat","groove","grooves","beat","riff"]);function Lc(t){return t.replace(/^.*[\\/]/,"").replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean)}function Tc(t){const e=Lc(t);for(let n=0;n<e.length;n++){const a=e[n]??"",o=/^(\d{2,3})bpm$/i.exec(a)??/^bpm(\d{2,3})$/i.exec(a);if(o&&pa(Number(o[1])))return Number(o[1]);if(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(e[n+1]??"")&&pa(Number(a)))return Number(a)}for(const n of e)if(/^[1-9]\d{1,2}$/.test(n)&&Number(n)>=50&&Number(n)<=200)return Number(n);return 0}function Rr(t){const e=Lc(t).map(o=>o.toLowerCase());if(e.some((o,r)=>og.has(o)||o==="one"&&/^shots?$/.test(e[r+1]??"")))return{kind:"one-shot",bpm:0};const a=Tc(t);return a?{kind:"loop",bpm:a}:{kind:e.some(o=>rg.has(o))?"loop":"",bpm:0}}function Cc(t,e,n=qr,a=wc){if(!(t>0)||!pa(e)||!(n>0))return 0;const o=t*e/60/n,r=Math.round(o);return r<1||Math.abs(o-r)>ag*r?0:a.includes(r)?r:0}function ig(t,e,n,a=qr){if(e.kind!=="loop")return null;const o=Cc(t,e.bpm,a);if(!o)return null;const r=t/(o*a*(60/Math.max(1,n))),s=Number(r.toFixed(2));return{bars:o,bpm:e.bpm,speed:r,far:s<Wt[0]||s>Wt[1]}}function sg(t){const e=Number.isInteger(t.bpm)?String(t.bpm):t.bpm.toFixed(1);return`Fitted: ${t.bars} bar${t.bars===1?"":"s"}, ${e} BPM`}function ms(t){return t.far?`×${t.speed.toFixed(2)} may smear`:""}const Nc="nyx.autofit.v1",Fc=()=>{try{return globalThis.localStorage??null}catch{return null}};function lg(t=Fc()){try{return t?.getItem(Nc)!=="off"}catch{return!0}}function cg(t,e=Fc()){try{e?.setItem(Nc,t?"on":"off")}catch{}}function zc(t,e){return!!(t&&e.sample===t.sample&&e.fit===t.fit.bars)}function dg(t,e){e.fit=t.before.fit,e.keepPitch=t.before.keepPitch}const Te=t=>`${Math.round(t*100)}%`,dt=t=>t<1?`${Math.round(t*1e3)} ms`:`${t.toFixed(2)} s`,Ko=t=>t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`,An=(t,e="")=>`${t>0?"+":""}${t}${e}`,ug=t=>`×${Number(t.toFixed(2))}`;function Qn(t){return Math.abs(t)<.001?"open":t<0?`LP ${Ko(2e4*(60/2e4)**-t)}`:`HP ${Ko(20*(8e3/20)**t)}`}const Jn=t=>t>=3.99?"Hold":dt(t);function pg(t){const e=Ae(0),n=[];return t.tune!==e.tune&&n.push(An(t.tune," st")),t.fine!==e.fine&&n.push(An(t.fine," ct")),t.fit!==e.fit&&n.push(`fit ${t.fit} bar${t.fit===1?"":"s"}`),t.fit&&t.keepPitch!==e.keepPitch&&n.push("varispeed"),Math.abs(t.attack-e.attack)>=5e-4&&n.push(`attack ${dt(t.attack)}`),Jn(t.decay)!==Jn(e.decay)&&n.push(`decay ${Jn(t.decay)}`),Qn(t.cutoff)!==Qn(e.cutoff)&&n.push(`filter ${Qn(t.cutoff)}`),Te(t.resonance)!==Te(e.resonance)&&n.push(`res ${Te(t.resonance)}`),n.join(" · ")}function Pc(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const Hn=t=>Math.max(0,Math.min(100,t));function Ir(t){const e=Pc(t.cutoff),n=Hn(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:Hn(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:Hn(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:Hn(100*Math.log(e/2e4)/Math.log(150/2e4))}}}function hg(t){const{type:e,dials:n}=Ir(t);if(e==="highpass"){const o=n.cutoff??0;return{hz:20*100**(o/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:o<=0}}if(e==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const Dc=t=>!t.on||t.mode==="lp"&&t.cutoff>=.999;function Xo(t){const e=Ir(t.filter);return{v:2,chain:[{id:`${e.type}-1`,type:e.type,bypass:Dc(t.filter),dials:e.dials},{id:"drive-1",type:"drive",bypass:!t.drive.on,dials:{...t.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!t.compressor.on,dials:{...t.compressor.dials}}]}}function fg(t,e){if(!t||t.chain.length!==e.chain.length)return{whole:!0};if(t.chain.some((a,o)=>a.type!==e.chain[o]?.type))return{whole:!0};const n=[];return e.chain.forEach((a,o)=>{const r=t.chain[o];if(r){r.bypass!==a.bypass&&n.push([a.id,"bypass",a.bypass]);for(const[s,l]of Object.entries(a.dials))r.dials[s]!==l&&n.push([a.id,s,l])}}),{whole:!1,params:n}}const gs={"page:title":"NYX, the NetComposer sampler. The number is which copy of NYX this is.","page:master":"The volume of everything NYX plays, after the Hacks.","page:save":"Downloads the pattern as a file: pads, steps, Hacks and the ten slots. The samples stay in this browser.","page:load":"Opens a saved pattern file (with its slots, if it has them), or puts an audio file onto the selected pad.","page:panic":"Silences every voice and effect tail at once. NYX then sits out until you press Play.","module:transport":"Play and stop NYX, set the tempo and swing, and keep up to ten saved versions of the whole kit and pattern.","module:pattern":"The 16-step grid, one lane per pad: a step that is on plays that lane's pad. The pads under the grid are the sounds.","module:params":"Everything about the selected pad: which part of the sample plays, its pitch, shape, filter and level. A selected step's locks show here too.","module:hacks":"Effects on everything NYX plays, in order: Filter, then Drive, then Compressor. They are saved with the pattern and its slots.","section:pads":"The 16 sounds: Q W E R A S D F play 1–8, Shift 9–16. Tap to play, double-click a name to rename; long-press or right-click to load or clear; drag to swap.",play:"Starts and stops NYX. In the Studio, Stop sits NYX out while the others play on, and Play brings it back on the next bar.","perform-label":"Effects you play live: hold a button down and NYX's sound changes until you let go. Nothing is saved.",perform:"Hold one of these down to change NYX's sound until you let go.",tempo:"Beats per minute: how fast the pattern plays. In the Studio every instrument shares this clock.",swing:"Pushes every second sixteenth note later for a looser, shuffled feel. 50% is straight.",status:"What NYX is doing now: stopped, playing, sitting out, or waiting to join on the next bar.","kit:slot":"A memory for the whole kit and pattern. Tap to recall it; Shift-click or long-press to store here, Option-click to clear.","kit:note":"Step tool: a tap on a step turns it on or off.","kit:accent":"Step tool: a tap on a step makes it an accent, played louder. Shift-click accents a step with either tool.","kit:fill":"Hold for a fill: steps set to play Only in Fill come in and Not in Fill steps drop out, until you let go.","kit:clear":"Turns every step off and resets lane lengths, mutes, solos and step locks; the pads keep their sounds. Undo brings it back.","kit:mute":"Mute: silences this lane. Its steps stay as they are.","kit:solo":"Solo: hear only the soloed lanes. Solo several to hear them together.","kit:length":"Drag to set how many steps this lane plays before it starts over. Lanes of different lengths drift against each other.","kit:lane-length":"Tap to set this lane's length, then tap the step it should end on.","kit:pad-key":"The key that plays this pad: lower case (q to f) is the key alone, upper case (Q to F) is Shift with it. A Gate pad holds while its key is down.","kit:choke-badge":"Choke group: pads showing the same letter cut each other off, like an open and a closed hi-hat. Set it under Choke.",wave:"The selected pad's sample: the part between Start and End is what plays, lines mark the slices, and a cursor follows playback.",sample:"How much of the sample plays (between Start and End) out of its full length, and whether it is mono or stereo.",mode:"How the pad plays when hit: right through (One-shot), only as long as its step (Gate), or round and round (Loop).",dir:"Which way the pad plays through its sample: forwards, backwards, or forwards then back.",start:"Where the pad starts playing in the sample. Move it right to skip the beginning.",end:"Where the pad stops playing in the sample. Move it left to cut off the tail.",slices:"Cuts the played part into 2 to 16 pieces; each step plays the next piece in turn. Off plays the whole part every time.",chop:"Where the slices are cut: at equal spacing, or where the hits in the sound start.","chop-to-pads":"Cuts this pad's sound into up to 16 slices, one per pad, to play by hand or rearrange in the pattern.","chop:wave":"The slices and the pad each lands on. Tap a slice to hear it.","chop:close":"Closes Chop to pads without changing any pad.","chop:mode":"How the sound is cut: where its hits start, into equal parts, or on the beat.","chop:mode:transients":"Cuts where each hit starts, so a slice is one hit (a drum, a note, a word).","chop:mode:even":"Cuts into equal parts: 16, 8 or 4.","chop:mode:beats":"Cuts on the beat at the sound's tempo: every beat, eighth or sixteenth.","chop:sensitivity":"Higher finds quieter hits; lower keeps only the strongest.","chop:count":"The most slices to make (Even: exactly this many). Never more than the pads left from Fill from.","chop:every":"Beats: a slice every beat, eighth or sixteenth at the sound's tempo. Choices past 16 slices are off.","chop:first":"The pad the first slice goes on; the rest follow, up to pad 16.","chop:play-back":"Writes steps that play the slices in order, so the pattern sounds like the original. On when the tempo is known.","chop:more":"The tempo used, Choke and Snap to hits.","chop:tempo":"The sound's tempo: from its Fit, its name, a take, or the Studio's when the length fits; else a guess.","chop:choke":"On, the slices cut each other: a new slice stops the last one.","chop:snap":"Even and Beats: moves each cut to a hit that starts within 20 ms, so an early hit isn't split.","chop:go":"Puts the slices on the pads. Pads with sounds are replaced; Undo puts them back.","library:chop":"Loads this loop onto the selected pad and opens Chop to pads on it.","tune-shape":"Pitch, speed and shape of the selected pad. Closed, it lists what differs from a new pad; NYX remembers in this browser whether it's open.","transport-more":"On a phone, Swing folds away; the line shows it. Tap to show or hide it.","pad-more":"On a phone, the pad's pan, choke group and Clear pad fold away; the line shows pan and choke. Tap to show or hide them.","hacks-more":"On a phone, Drive and Compressor fold away under the Filter; the line says which are on. Tap to show them.","kit:group-toggle":"Opens or closes this section.","pitch-label":"How high or low the pad plays. Pitch changes speed too, like a record, unless Fit's Keep pitch is on.",tune:"Pitch in semitones, up to two octaves either way. Higher also plays faster, unless the pad is fitted with Keep pitch on.",fine:"Fine pitch in cents (hundredths of a semitone), for small corrections.",fit:"Makes the pad last exactly this many bars at the current tempo, and keeps it in time when the tempo changes. Off plays it as recorded.","keep-pitch":"On, Fit stretches the pad to its bars without changing its pitch, and Tune moves the pitch only. Off, it speeds up or slows down like a record.","fit-speed":"How fast the pad plays to fit its bars: ×1 is as recorded. With Keep pitch, stretching far past ×0.75 to ×1.5 may smear the sound.","auto-fit":"On, a loop that arrives with its tempo (picker, My samples, or a name like Loop_100_Am) is fitted to its bars with Keep pitch. One-shots never are.","auto-fit-note":"This loop came with its tempo, so NYX set Fit to its bars with Keep pitch on. It plays in time at any tempo.","auto-fit-far":"Keep pitch is stretching this loop past ×0.75 to ×1.5, where it may smear. Fit it to other bars, or turn Keep pitch off.","auto-fit-undo":"Turns this pad's automatic Fit off again: the loop plays as recorded. The sound stays.","shape-label":"How each hit's volume moves over time: how it fades in and how it dies away.",attack:"How long each hit takes to fade in. Zero is instant; more softens the start.",decay:"How quickly each hit fades away (in Gate, once its step ends). All the way up is Hold: no fade.",cutoff:"Left of centre cuts the highs (darker), right of centre cuts the lows (thinner). Centre leaves the pad open.",resonance:"Boosts the sound right at the filter's edge for a sharper, ringing tone. It does nothing while the filter is open.","out-label":"Where the pad sits in the mix: how loud, how far left or right, and which pads cut it off.",level:"How loud this pad plays.",normalize:"On, the pad plays at the Library's level, so a quiet file fits the kit; Level still sets how loud. Off, it plays as recorded.","normalize-label":"Plays the pad at the Library's level, so a quiet file fits the kit. Grabs and Takes are at mix level already.","normalize-gain":"What Normalize adds to this pad: the gain that brings your audio to the Library's level, never a peak past −1 dBFS.",pan:"Places the pad left or right in the stereo picture. C is the centre.",choke:"Pads in the same group cut each other off when one plays, like open and closed hi-hats. None lets it ring over the others.","clear-pad":"Removes this pad's sample and settings. Its steps in the grid stay.","lock-label":"Locks for this one step: settings here change only this step, not the whole pad. Long-press another step to edit it.","lock-velocity":"How loud this step plays, before any accent.","lock-chance":"The odds this step plays each time round. At 100% it always plays; lower leaves it out at random.","lock-slice":"Which slice this step plays. In order plays the slice that matches the step's place, so a chopped beat plays back as it was.","lock-pitch":"Moves this step up or down in semitones, on top of the pad's own Tune.","lock-cond":"When this step plays: always, only on some passes through the lane, only with Fill held or not, or only if the lane's last conditional step did or didn't.","lock-reverse":"Whether this step plays the pad's own way or the other way round.","lock-done":"Closes this step's locks and goes back to the pad's settings.","notes-label":"CALLIOPE plays this NYX: your pattern keeps its hits, and pads that follow take its chord's root.","pad-follow":"On: this pad's hits play at the root of CALLIOPE's chord. Off: its own pitch, as drums want.","pad-note":"The note this sample plays at as recorded. NYX tunes from it to CALLIOPE's root, never more than six semitones away.","notes-open":"Shows CALLIOPE, the Studio's note generator that tunes this NYX's pads now.","notes-mine":"Take the pitch back: CALLIOPE stops playing this NYX, and every pad plays its own pitch again.","grab-label":"Brings sound from the Studio onto the selected pad: Grab the bars that just played, or Take a performance as it happens.","grab-from":"Which Studio sound to grab or take from: the master mix or one instrument's channel.","grab-bars":"How many bars Grab takes. One bar is cut into 16 slices with every step on; longer grabs are sliced at the hits.",grab:"Copies the bars that just played onto the selected pad, cut on the bar lines (the music must be playing). It asks before replacing a pad that has a sound.","grab-undo":"Puts back what this Grab, Take, sent take, Library Load or Build kit replaced: old sounds, slices and steps. Cmd/Ctrl+Z does the same.",library:"Opens the Library: openly licensed sounds checked by a person, found by plain words. Load fills the selected pad; Build kit fills pads 1–8.",credit:"Who made this pad's sound, and its licence. Library › Credits has the full credit with links, and saved patterns keep it.","library:ask":"Plain words: a role (kick, snare, hat, clap, tom, perc, cymbal, fx) and a sound (punchy, tight, dark, bright, long, soft). Add kit for a whole kit.","library:close":"Closes the Library. Esc in the field does the same.","library:play":"Plays this sound through NYX's output, at the level it will have on a pad. Press again to stop.","library:load":"Puts this sound on the selected pad, named after it and with its credit; the steps stay. Undo brings the old sound back.","library:kit":"Fills pads 1–8 with a kit for your words (kick, snare, clap, hats, tom, perc, fx); the pattern stays and the hats cut each other. One Undo puts all eight back.","library:credits":"Every Library sound on the pads: who made it, its licence and its source. Saved patterns, slots and Studio Scenes keep these credits.","library:badge":"The licence. CC0 needs no credit (NYX credits it anyway); BY needs credit, and BY-SA credit plus the same licence on what you make.","library:wave":"The sound's shape, start to end: a tall start is a sharp hit, a long tail rings on.","library:source-shelf":"The curated shelf on musicmatter.art: openly licensed sounds, each checked by a person.","library:source-local":"My samples: your local Library, the folder the sample picker exported. Its sounds play in this browser and are never uploaded.","library:source-all":"Searches musicmatter.art and My samples (your local Library) together.","library:open-folder":"Opens a local Library folder (the sample picker's export) from this computer. NYX only reads it; nothing is uploaded.","library:reconnect":"Your local Library folder, remembered from last time: the browser asks once more before NYX can read it.","library:forget":"Closes your local Library and forgets the folder. The files stay where they are; pads keep their sounds.",take:"Records the chosen source onto the selected pad in whole bars until you press again (up to four minutes); takes of up to 8 bars loop. It asks first if the pad has a sound.","hack-filter":"A filter on all of NYX, to darken it, thin it or narrow it down. The switch turns it on.","filter-mode":"Which part the filter keeps: the lows (low pass), the highs (high pass) or a band in the middle (band pass).","filter-cutoff":"Where the filter cuts. In low pass, all the way up is open: no filtering.","filter-resonance":"Boosts the sound around the cutoff for a sharper, more nasal tone.","filter-curve":"A picture of the filter: how loud each pitch range comes out, lows on the left, highs on the right.","hack-meter":"The level going into this Hack (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack-drive":"Distortion on all of NYX, from warm to gritty. The switch turns it on.","hack-drive-drive_db":"How hard the sound is pushed into distortion. 0 dB is clean.","hack-drive-output_db":"The level after the drive, to balance out the louder distorted sound.","hack-drive-mix":"How much of the driven sound is mixed with the clean one. 100% is all drive.","hack-drive-curve":"The kind of distortion: Smooth is warm and round, Acid is harder and buzzier.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up leaves it bright.","hack-compressor":"Evens out NYX's level: loud hits are turned down, so the whole sounds tighter and punchier. The switch turns it on.","hack-compressor-threshold_db":"The level above which the compressor starts turning the sound down. Lower catches more.","hack-compressor-ratio":"How strongly sound above the threshold is turned down. Higher is a firmer squeeze.","hack-compressor-attack_ms":"How fast the compressor reacts to a loud hit. Slower lets the start of each hit punch through.","hack-compressor-release_ms":"How fast the compressor lets go once the sound drops back below the threshold.","hack-compressor-makeup_db":"Turns the whole sound back up after compressing, to make up for the lost level.","kit:more":"More settings for this effect."},mg={perform:{repeat16:"While held, repeats the last sixteenth note over and over, like a stutter.",repeat8:"While held, repeats the last eighth note over and over.",reverse:"While held, plays what NYX just played backwards.",half:"While held, plays on at half speed, an octave lower.",stop:"While held, slows to a halt like a tape machine switched off."},mode:{oneshot:"One-shot: plays on from the hit until it ends or the lane's next hit cuts it. Good for drums.",gate:"Gate: plays only as long as its step (or its key is held), then fades by Decay. Good for chopping long sounds.",loop:"Loop: plays round and round until the pad plays again or the music stops."},dir:{fwd:"Plays the sample the normal way, start to end.",rev:"Plays the sample backwards, end to start.",pingpong:"Plays forwards, then back again. In Loop it keeps bouncing."},normalize:{on:"Normalize on: the pad plays at the Library's level.",off:"Normalize off: the pad plays as recorded."},"keep-pitch":{on:"Keep pitch: the pad is stretched to its bars and stays at its pitch, whatever the tempo. Tune moves the pitch only.",off:"Varispeed: the pad speeds up or slows down to fit its bars, and its pitch moves with it, like a record."},"auto-fit":{on:"Auto-fit on: loops with a known tempo land fitted to their bars, Keep pitch on.",off:"Auto-fit off: loops land as recorded; set Fit yourself."},chop:{even:"Cuts the slices at equal spacing.",transients:"Cuts the slices where the hits in the sound start, so each slice is one hit."},"lock-reverse":{pad:"This step plays in the pad's own direction.",rev:"This step plays the other way round from the pad."}};function B(t){return Object.hasOwn(gs,t)?gs[t]:void 0}function gg(t,e){const n=mg[t];return(n&&Object.hasOwn(n,e)?n[e]:void 0)??B(t)}const Zn="nyx-help-text",bs=new Map;function bg(t,e){const n=bs.get(e);if(n&&t.getElementById(n))return n;let a=t.getElementById(Zn);a||(a=t.createElement("div"),a.id=Zn,a.hidden=!0,t.body.append(a));const o=t.createElement("span");return o.id=`${Zn}-${a.children.length+1}`,o.textContent=e,a.append(o),bs.set(e,o.id),o.id}function I(t,e,n){if(!t||!e||(t.getAttribute("data-nc-help")!==e&&t.setAttribute("data-nc-help",e),t.hasAttribute("title")&&t.removeAttribute("title"),!n))return;const a=bg(n.ownerDocument,e),o=(n.getAttribute("aria-describedby")??"").split(/\s+/).filter(Boolean);if(o.includes(a))return;const r=[...o.filter(s=>!s.startsWith(`${Zn}-`)),a];n.setAttribute("aria-describedby",r.join(" "))}function yg(t){const e=B(t);return e?{"data-nc-help":e}:{}}const wg=[['.nc-seg [role="radio"]:not([data-nc-accent-mode])',"kit:note"],['.nc-seg [role="radio"][data-nc-accent-mode]',"kit:accent"],["[data-nc-fill]:not([data-nc-clear])","kit:fill"],["[data-nc-clear]","kit:clear"],['.nc-ms[data-nc-ms="mute"]',"kit:mute"],['.nc-ms[data-nc-ms="solo"]',"kit:solo"],[".nc-len-handle","kit:length"],["[data-nc-len-toggle]","kit:lane-length"],["[data-nc-pads-play]","play"],[".nc-snap","kit:slot"]];function jr(t){for(const e of t.querySelectorAll(".nc-module[data-nc-module]"))I(e.querySelector(".nc-module-hd .nc-title"),B(`module:${e.dataset.ncModule}`));for(const e of t.querySelectorAll("[data-nc-section]"))I(e.querySelector(":scope > .nc-ui-fx-name, :scope > .nc-panel-hd > .nc-panel-title"),B(`section:${e.dataset.ncSection}`));for(const e of t.querySelectorAll("[data-nc-id]")){const n=e.dataset.ncId??"";if(!e.matches("input, select, canvas"))if(e.classList.contains("nc-field")){const a=e.querySelector(":scope > input, :scope > select, :scope > canvas");I(e.querySelector(":scope > .nc-label"),B(n),a)}else if(e.classList.contains("nc-choice-row"))for(const a of e.querySelectorAll("[data-nc-choice]"))I(a,gg(n,a.dataset.ncChoice??""),a);else e.classList.contains("nc-btn")?I(e,B(n),e):e.matches(".nc-label[data-nc-text]")?I(e,B(n)):e.classList.contains("nc-ui-fx")&&(I(e.querySelector(":scope > .nc-ui-fx-hd > .nc-ui-fx-name, :scope > .nc-ui-fx-name"),B(n),e.querySelector("[data-nc-fx-switch]")),I(e.querySelector(":scope > .nc-ui-more > summary"),B("kit:more")))}for(const[e,n]of wg)for(const a of t.querySelectorAll(e)){const o=a.parentElement?.querySelector(":scope > .nc-hit")?a.parentElement:null;o&&a.removeAttribute("title"),I(o??a,B(n),a)}for(const e of t.querySelectorAll(".nc-group[data-nc-id]")){const n=e.querySelector(":scope > .nc-group-toggle");I(n?.querySelector(".nc-group-title")??null,B(e.dataset.ncId??""),n),I(n?.querySelector(".nc-group-mark")??null,B("kit:group-toggle"))}for(const e of t.querySelectorAll(".nc-padgrid-pad-badge"))e.textContent?I(e,B("kit:choke-badge")):e.removeAttribute("data-nc-help")}const gn=["KeyQ","KeyW","KeyE","KeyR","KeyA","KeyS","KeyD","KeyF"],vg=Array.from({length:V},(t,e)=>{const n=(gn[e%gn.length]??"").slice(3);return e<gn.length?n.toLowerCase():n.toUpperCase()});function Bc(t){const e=gn.indexOf(t.code);if(e<0)return-1;const n=t.shiftKey?e+gn.length:e;return n<V?n:-1}class xg{down=new Map;press(e){if(this.down.has(e.code))return-1;const n=Bc(e);return n>=0&&this.down.set(e.code,n),n}release(e){const n=this.down.get(e.code);return n===void 0?-1:(this.down.delete(e.code),n)}releaseAll(){const e=[...this.down.values()];return this.down.clear(),e}}const kg="/nyx/assets/limiter-processor-BPr7zuRH.js",$g="/nyx/assets/sampler-processor-DY8GjsXI.js",Ag=.001,Eg=(t,e,n)=>{const a=new Float32Array(Math.max(0,n-e)),o=t.length||1;for(const r of t)for(let s=e;s<n;s++)a[s-e]+=(r[s]??0)/o;return a};function Sg(t,e,n,a,o){const r=t.length;for(let s=0;s<r;s++){const l=o[s];if(l>s){const c=t[s];t[s]=t[l],t[l]=c;const d=e[s];e[s]=e[l],e[l]=d}}for(let s=2;s<=r;s<<=1){const l=s>>1,c=r/s;for(let d=0;d<r;d+=s)for(let u=0;u<l;u++){const p=n[u*c],h=a[u*c],m=d+u,g=m+l,w=t[g]*p+e[g]*h,f=e[g]*p-t[g]*h;t[g]=t[m]-w,e[g]=e[m]-f,t[m]+=w,e[m]+=f}}}function Mg(t,e){const n=e>64e3?2048:e>32e3?1024:512,a=n/4,o=Math.max(0,Math.floor((t.length-n)/a)+1),r=n/2,s=new Float32Array(n);for(let y=0;y<n;y++)s[y]=.5-.5*Math.cos(2*Math.PI*y/n);const l=new Float32Array(r),c=new Float32Array(r);for(let y=0;y<r;y++)l[y]=Math.cos(2*Math.PI*y/n),c[y]=Math.sin(2*Math.PI*y/n);const d=Math.log2(n),u=new Uint32Array(n);for(let y=0;y<n;y++){let v=0;for(let x=0;x<d;x++)v|=(y>>x&1)<<d-1-x;u[y]=v}const p=new Float32Array(n),h=new Float32Array(n);let m=new Float32Array(r),g=new Float32Array(r);const w=new Float32Array(o),f=4/n*1e3;let b=0;for(let y=0;y<o;y++){const v=y*a;for(let $=0;$<n;$++)p[$]=t[v+$]*s[$],h[$]=0;Sg(p,h,l,c,u);for(let $=0;$<r;$++)g[$]=Math.log1p(f*Math.sqrt(p[$]*p[$]+h[$]*h[$]));let x=0;if(y>0)for(let $=1;$<r-1;$++){const k=Math.max(m[$-1],m[$],m[$+1]),A=g[$]-k;A>0&&(x+=A)}w[y]=x,x>b&&(b=x),[m,g]=[g,m]}if(b>0)for(let y=0;y<o;y++)w[y]/=b;return{flux:w,hop:a,size:n}}function Lg(t,e,n,a){const o=Math.max(8,Math.round(5e-4*e)),r=Math.max(0,n-Math.round(.01*e)),s=Math.min(t.length,a),l=[];for(let h=r;h<s;h+=o){let m=0;for(let g=Math.max(1,h);g<Math.min(s,h+o);g++)m=Math.max(m,Math.abs(t[g]-t[g-1]));l.push(m)}if(!l.length)return{at:n,contrast:0};let c=0;for(let h=1;h<l.length;h++)l[h]>l[c]&&(c=h);let d=l[c];for(let h=0;h<=c;h++)d=Math.min(d,l[h]);const u=d+.1*(l[c]-d);let p=c;for(;p>0&&l[p-1]>u;)p--;return{at:r+Math.max(0,p-1)*o,contrast:l[c]>0?1-d/l[c]:0}}function Tg(t,e,n){let a=Math.max(0,Math.min(t.length-1,e));for(let o=Math.max(0,e-n);o<=Math.min(t.length-1,e+n);o++)Math.abs(t[o])<Math.abs(t[a])&&(a=o);return a}function ys(t,e,n=0,a=t[0]?.length??0){const o=Eg(t,n,a),{flux:r,hop:s,size:l}=Mg(o,e),c=e/s/1e3,d=Math.max(1,Math.round(100*c)),u=Math.max(1,Math.round(30*c)),p=Math.max(1,Math.round(25*c)),h=new Float64Array(r.length+1);for(let f=0;f<r.length;f++)h[f+1]=h[f]+r[f];const m=[],g=Math.round(Ag*e),w=Math.round(5e-4*e);for(let f=1;f<r.length;f++){const b=r[f],y=Math.max(0,f-d),v=Math.min(r.length,f+u+1),x=b-(h[v]-h[y])/(v-y);if(x<.02)continue;let $=!0;for(let L=Math.max(0,f-p);L<=Math.min(r.length-1,f+p);L++)if(r[L]>b||r[L]===b&&L<f){$=!1;break}if(!$)continue;const{at:k,contrast:A}=Lg(o,e,f*s,f*s+l),S=Tg(o,k-g,w);m.push({cut:n+S,hit:n+k,strength:b*(.25+.75*A),margin:x})}return m.sort((f,b)=>b.strength-f.strength),{from:n,to:a,sampleRate:e,candidates:m}}function Cg(t){return .3*(1-Math.max(0,Math.min(1,t)))**1.6+.02}function ws(t,e){const n=Cg(e);return t.candidates.filter(a=>a.margin>=n)}const Ue=16,Ng=.03,Fg=.002,zg=.02,Pg=.7;function Oc(t,e){const{from:n,to:a,sampleRate:o}=t,r=Math.round(Ng*o),s=Math.max(2,Math.min(Ue,Math.round(e.count??Ue)));if(a-n<r*2)return{cuts:[n,a],hits:[n]};if(e.mode==="transients"){const h=ws(t,e.sensitivity??.5),m=h.find(w=>w.cut-n<r),g=[];for(const w of h){if(g.length>=s-1)break;w.cut-n<r||a-w.cut<r||g.every(f=>Math.abs(f.cut-w.cut)>=r)&&g.push(w)}return g.sort((w,f)=>w.cut-f.cut),{cuts:[n,...g.map(w=>w.cut),a],hits:[m?m.hit:n,...g.map(w=>w.hit)]}}let l,c=a;if(e.mode==="even")l=Array.from({length:s},(h,m)=>n+Math.round((a-n)*m/s));else{const h=60/(e.bpm&&e.bpm>0?e.bpm:120)/(e.perBeat??1)*o;l=[];for(let m=0;m<Ue&&n+m*h<a-r;m++)l.push(n+Math.round(m*h));l.length>=Ue&&(c=Math.min(a,n+Math.round(Ue*h)))}const d=e.snap===!1?0:Math.round(zg*o),u=d?ws(t,Pg):[];return{cuts:[...l.map((h,m)=>{if(m===0||!d)return h;let g=h,w=d+1;for(const f of u){const b=Math.abs(f.hit-h);b<=d&&b<w&&(w=b,g=f.cut)}return g}),c],hits:l}}function Dg(t,e){const n=t.to-t.from;if(e<2||n<64)return[];const o=Oc(t,{mode:"transients",sensitivity:.5,count:e}).cuts.slice(1,-1).map(r=>(r-t.from)/n).filter(r=>r>.001&&r<.999);for(let r=1;o.length<e-1&&r<e;r++){const s=r/e;o.every(l=>Math.abs(l-s)>.5/e)&&o.push(s)}for(let r=1;o.length<e-1;r++)o.push(r/(e+1));return o.sort((r,s)=>r-s).slice(0,e-1)}function Bg(t){const e=r=>Math.round(r*10)/10;if(t.fit>0&&t.seconds>0)return{bpm:e(t.fit*240/t.seconds),known:!0,from:"from its Fit"};if(t.given>0)return{bpm:t.given,known:!0,from:t.givenFrom??"from the take"};const n=Tc(t.name);if(n)return{bpm:n,known:!0,from:"from its name"};const a=Cc(t.seconds,t.studioBpm);if(a)return{bpm:e(a*240/t.seconds),known:!0,from:"the Studio's"};const o=Og(t.seconds);return o?{bpm:o.bpm,known:!1,from:"guessed from its length"}:{bpm:t.studioBpm,known:!1,from:"the Studio's"}}function Og(t,e=[]){let n=null;for(const a of[1,2,4,8]){const o=a*4*60/t;if(o<70||o>180)continue;const r=60/o/4,l=(e.length?e.reduce((c,d)=>c+Math.abs(d/r-Math.round(d/r)),0)/e.length:0)+Math.abs(o-110)/2e3;(!n||l<n.score)&&(n={bpm:o,bars:a,score:l})}return n?{bpm:Math.round(n.bpm*10)/10,bars:n.bars}:null}function _r(t,e,n){const a=60/n/4*e,o=t.cuts[0],r=(t.cuts[t.cuts.length-1]-o)/a,s=Math.max(1,Math.ceil(r/te-.06)),l=new Set;return{positions:t.hits.map(d=>{const u=Math.max(0,Math.round((d-o)/a));return l.has(u)?-1:(l.add(u),u)}),bars:s>8?0:s}}function qc(t,e,n){const{positions:a}=_r(t,e,n),o=a.map(r=>r>=0);return{cuts:t.cuts.filter((r,s)=>s===t.cuts.length-1||o[s]),hits:t.hits.filter((r,s)=>o[s])}}const qg=.006;function Rg(t,e,n,a=qg){const o=60/n/4*e,r=t.cuts[0]??0,s=t.cuts[t.cuts.length-1]??0,l=a*e,c=[...t.cuts],d=[...t.hits];for(let u=1;u<d.length;u++){const p=d[u]??0,h=r+Math.round(Math.round((p-r)/o)*o);Math.abs(p-h)<=l&&h>r&&h<s&&(c[u]=h,d[u]=h)}return qc({cuts:c,hits:d},e,n)}function Ig(t,e){return t.cuts.length-1<=e?t:{cuts:[...t.cuts.slice(0,e),t.cuts[t.cuts.length-1]],hits:t.hits.slice(0,e)}}function jg(t){return t.replace(/\.[a-z0-9]{2,4}$/i,"").split(/[\s_\-.()[\],+&]+/).filter(Boolean).filter((a,o,r)=>!/^\d{2,3}bpm$/i.test(a)&&!/^bpm\d{2,3}$/i.test(a)&&!/^bpm$/i.test(a)&&!(/^[1-9]\d{1,2}$/.test(a)&&Number(a)>=50&&Number(a)<=200)&&!(/^\d{2,3}$/.test(a)&&/^bpm$/i.test(r[o+1]??""))&&!/^[A-G](?:#|b|s|sharp|flat)?(?:m|min|maj|minor|major)?$/.test(a)).join(" ").trim()||"Loop"}function ea(t,e){const n=String(e+1);return`${t.slice(0,23-n.length).trim()} ${n}`}function _g(t,e,n){const a=new Set(t.filter((o,r)=>(r<e||r>=e+n)&&o.sample&&o.choke).map(o=>o.choke));for(const o of[4,3,2,1])if(!a.has(o))return o;return 0}function Hg(t,e,n){const a=Math.min(e.cuts.length-1,V-n.first),o=n.playBack?_r(e,n.sampleRate,n.playBack.bpm):null,r=Math.round(Fg*n.sampleRate),s=[];for(let l=0;l<a;l++){const c=n.first+l,d=t.pads[c];if(!d)continue;const u=l<a-1?Math.min(n.frames,e.cuts[l+1]+r):e.cuts[l+1];if(Object.assign(d,{name:ea(n.stem,l),sample:n.sample,mode:"oneshot",dir:"fwd",start:e.cuts[l]/n.frames,end:u/n.frames,slices:0,cuts:[],tune:0,fine:0,fit:0,attack:0,decay:4,cutoff:0,resonance:0,level:n.source?.level??.8,pan:0,choke:n.choke??0,provenance:n.source?.provenance?structuredClone(n.source.provenance):null,normalize:n.source?.normalize?{...n.source.normalize}:null,offsetDb:n.source?.offsetDb??0,follow:!1,note:n.source?.note??0}),o?.bars){const p=t.lanes[c];p.length=te,p.steps=Array.from({length:te},()=>Nn());const h=o.positions[l];if(h!==void 0&&h>=0){const m=p.steps[h%te];m.on=!0;const g=o.bars>1?`${Math.floor(h/te)+1}:${o.bars}`:"always";m.cond=fa.includes(g)?g:"always"}}s.push(c)}return s}const Rc=827873614,Wg=60;async function Ug(t,e){const n=new Float64Array([e,t.length,t[0]?.length??0]),a=[new Uint8Array(n.buffer),...t.map(c=>new Uint8Array(c.buffer))],o=a.reduce((c,d)=>c+d.byteLength,0),r=new Uint8Array(o);let s=0;for(const c of a)r.set(c,s),s+=c.byteLength;const l=new Uint8Array(await crypto.subtle.digest("SHA-256",r));return Array.from(l.subarray(0,16),c=>c.toString(16).padStart(2,"0")).join("")}function Gg(t){const e=t.data[0]?.length??0,n=new Uint8Array(16+e*4*t.data.length);return new Uint32Array(n.buffer,0,4).set([Rc,t.sampleRate,t.data.length,e]),t.data.forEach((a,o)=>{n.set(new Uint8Array(a.buffer,a.byteOffset,e*4),16+o*e*4)}),n}function Yg(t,e){if(e.byteLength<16)return null;const[n,a,o,r]=new Uint32Array(e,0,4);if(n!==Rc||!o||o>2||e.byteLength!==16+r*4*o)return null;const s=Array.from({length:o},(l,c)=>new Float32Array(e.slice(16+c*r*4,16+(c+1)*r*4)));return{hash:t,data:s,sampleRate:a,channels:o,frames:r}}class Kg{constructor(e="nyx"){this.folderName=e}memory=new Map;dir=null;folder(){return this.dir??=(async()=>{try{const e=await navigator.storage?.getDirectory?.();return e?await e.getDirectoryHandle(this.folderName,{create:!0}):null}catch{return null}})(),this.dir}info(e){return this.memory.get(e)}held(e){return this.memory.get(e)}async put(e,n){const a=await Ug(e,n),o={hash:a,data:e,sampleRate:n,channels:e.length,frames:e[0]?.length??0};this.memory.set(a,o);const r=await this.folder();if(!r)return{sample:o,saved:!1};try{const l=await(await r.getFileHandle(`${a}.f32`,{create:!0})).createWritable?.();return l?(await l.write(Gg(o)),await l.close(),{sample:o,saved:!0}):{sample:o,saved:!1}}catch{return{sample:o,saved:!1}}}async get(e){const n=this.memory.get(e);if(n)return n;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(`${e}.f32`)).getFile(),r=Yg(e,await o.arrayBuffer());return r&&this.memory.set(e,r),r}catch{return null}}async prune(e){for(const a of[...this.memory.keys()])e.has(a)||this.memory.delete(a);const n=await this.folder();if(n)try{const a=[];for await(const o of n.keys())a.push(o);for(const o of a){const r=o.replace(/\.f32$/,"");o.endsWith(".f32")&&!e.has(r)&&await n.removeEntry(o)}}catch{}}}function Ic(t){const e=Math.min(t.length,Math.round(Wg*t.sampleRate));return{data:Array.from({length:Math.min(2,t.numberOfChannels)},(a,o)=>{const r=new Float32Array(e);return r.set(t.getChannelData(o).subarray(0,e)),r}),trimmed:e<t.length}}function vs(t,e=200){const n=t[0]?.length??0,a=[];if(!n)return a;const o=n/e;for(let r=0;r<e;r++){const s=Math.floor(r*o),l=Math.max(s+1,Math.floor((r+1)*o));let c=0,d=0;const u=Math.max(1,Math.floor((l-s)/256));for(let p=s;p<l&&p<n;p+=u){let h=0;for(const m of t)h+=m[p]??0;h/=t.length,h<c&&(c=h),h>d&&(d=h)}a.push(Math.max(-1,c),Math.min(1,d))}return a}function Vo(t=Vg()){try{const e=JSON.parse(t?.getItem("lucy.state")??"null");return Array.isArray(e?.takes)?e.takes.flatMap(n=>{const a=n&&typeof n=="object"?n:{},o=r=>typeof a[r]=="number"&&Number.isFinite(a[r])?a[r]:0;return a.saved!==!0||!o("id")||!o("frames")||!o("sampleRate")?[]:[{id:o("id"),bars:o("bars"),bpm:o("bpm"),sampleRate:o("sampleRate"),channels:Math.min(2,Math.max(1,o("channels"))),frames:o("frames")}]}):[]}catch{return[]}}async function Xg(t){try{const e=await navigator.storage?.getDirectory?.();if(!e)return null;const a=await(await(await e.getDirectoryHandle("lucy")).getFileHandle(`lucy-take-${t.id}.f32`)).getFile(),o=new Float32Array(await a.arrayBuffer());return o.length<t.frames*t.channels?null:Array.from({length:t.channels},(r,s)=>o.slice(s*t.frames,(s+1)*t.frames))}catch{return null}}function Vg(){try{return globalThis.localStorage??null}catch{return null}}const Qg=150,jc=96*1024*1024,Jg=t=>Math.round(t*10)/10;function Zg(t,e,n){if(!t.sample||!t.fit||!t.keepPitch||!e)return null;const[a,o]=Ec(t,e,null);if(o-a<2)return null;const r=Jg(n);return{sample:t.sample,from:a,to:o,bars:t.fit,bpm:r,semitones:t.tune+t.fine/100,sampleRate:e.sampleRate,frames:Sc(t.fit,r,e.sampleRate)}}function Ct(t){return`${t.sample}:${t.from}-${t.to}:${t.bars}:${t.bpm.toFixed(1)}:${Math.round(t.semitones*100)}`}const eb=t=>`stretch:${t}`,tb=t=>t.startsWith("stretch:");class nb{constructor(e=jc,n=()=>{}){this.maxBytes=e,this.drop=n}map=new Map;bytes=0;get size(){return this.map.size}has(e){return this.map.has(e)}get(e){const n=this.map.get(e);return n&&(this.map.delete(e),this.map.set(e,n)),n}byId(e){for(const n of this.map.values())if(n.sample===e)return n}put(e,n=new Set){const a=this.map.get(e.key);a&&(this.bytes-=a.bytes),this.map.delete(e.key),this.map.set(e.key,e),this.bytes+=e.bytes;for(const[o,r]of this.map){if(this.bytes<=this.maxBytes)break;o===e.key||n.has(o)||(this.map.delete(o),this.bytes-=r.bytes,this.drop(r))}}}class ab{constructor(e,n=jc){this.host=e,this.cache=new nb(n,a=>e.drop(a))}cache;current=new Map;wanted=new Map;inFlight=new Set;timer=null;queue=Promise.resolve();missingSig="";renders=0;lastMs=0;failed=!1;plan(e,n,a){this.wanted.clear();const o=[];e.forEach((c,d)=>{const u=c.sample?n(c.sample):void 0,p=Zg(c,u,a),h=this.current.get(d);if(!p){this.current.delete(d);return}this.wanted.set(d,p);const m=Ct(p),g=this.cache.get(m);g?this.current.set(d,g):(h&&!ob(h.job,p)&&this.current.delete(d),this.inFlight.has(m)||o.push(m))});const r=o.join("|");if(!o.length||this.failed){this.missingSig="";return}if(r===this.missingSig&&this.timer!==null)return;this.missingSig=r;const s=this.host.clearTimeout??(c=>clearTimeout(c)),l=this.host.setTimeout??((c,d)=>setTimeout(c,d));this.timer!==null&&s(this.timer),this.timer=l(()=>{this.timer=null,this.missingSig="",this.renderWanted()},Qg)}stretchedFor(e){return this.current.get(e)}renderFor(e){return this.current.get(e)}pending(e){const n=this.wanted.get(e);return n?this.current.get(e)?.key!==Ct(n):!1}renderWanted(){for(const e of new Map([...this.wanted.values()].map(n=>[Ct(n),n])).values()){const n=Ct(e);this.cache.has(n)||this.inFlight.has(n)||(this.inFlight.add(n),this.queue=this.queue.then(()=>this.renderOne(n,e)))}}idle(){return this.queue}async renderOne(e,n){if(![...this.wanted.values()].some(s=>Ct(s)===e)){this.inFlight.delete(e);return}const a=Date.now();let o=null;try{o=await this.host.run(n)}catch(s){console.error("NYX stretch",s)}if(this.inFlight.delete(e),!o){this.failed=!0,this.host.changed();return}this.lastMs=Date.now()-a,this.renders++;const r={key:e,job:n,sample:eb(e),frames:n.frames,bytes:o.reduce((s,l)=>s+l.byteLength,0)};this.host.deliver(r,o);for(const[s,l]of this.wanted)Ct(l)===e&&this.current.set(s,r);this.cache.put(r,new Set([...this.current.values()].map(s=>s.key))),this.host.changed()}}const ob=(t,e)=>t.sample===e.sample&&t.from===e.from&&t.to===e.to,rb=48e3;function _c(t,e){try{const n=t?.latency?.(e);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=rb?Math.round(n):0}catch{return 0}}function ib(t,e){return{from:t.from+e,to:t.to+e}}const sb="instance",lb=99;function za(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(sb)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=lb?n:1}function cb(t,e){return e===1?t:`${t}#${e}`}function db(t,e){return e===1?t:`${t} ${e}`}let Nt;function ub(t,e=za()){if(Nt!==void 0)return Nt;Nt=null;try{if(typeof window>"u"||window.parent===window)return Nt;const n=window.parent.ncStudio;n&&n.version===1&&(Nt=n.attach(t,{instance:e}))}catch{}return Nt}function pb(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,o,r)=>n.request(`${a}${e}`,o,r)}:null}}function hb(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Ze(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.grab?t.grab:null}catch{return null}}function Ut(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function En(t,e=za()){return e>1?`${t}#${e}`:t}function fb(t,e=za()){const n=Ut()?.owner()??null;return n===null||n==="studio"||n===En(t,e)}const xs=48;function mb(t){const e=[];for(const n of t.points().slice(-64))e.push(n.beat,n.root===null?Number.NaN:n.root);return{type:"follow",points:e,transpose:t.route?.transpose??0}}function gb(t){const e=Math.trunc((t.transpose??0)/12);return e?`Root, ${e>0?"+":"−"}${Math.abs(e)} oct`:"Root"}function bb(t,e){const n=t;if(typeof n?.notesIn!="function")return null;const a=new Vm,o=new Set;let r=-1,s="",l=!1;const c=()=>{l=!1;const u=JSON.stringify(a.route),p=u!==s;if(!p&&a.version===r)return;s=u;const h=a.points();h.length>xs&&a.prune(h[h.length-xs].beat),r=a.version,e(mb(a));for(const m of[...o])m(p)};try{n.notesIn(u=>{a.receive(u),l||(l=!0,queueMicrotask(c))},{takes:"pitch"})}catch{return null}const d=u=>{const p=a.route?.source;if(!p||typeof u!="function")return!1;try{return u.call(n,p),!0}catch{return!1}};return{follower:a,route:()=>a.route,resend(){r=-1,c()},takeBack:()=>d(n.notesTakeBack),open:()=>d(n.showInstance),onChange(u){o.add(u)}}}class yb{constructor(e){this.make=e}worker=null;seq=0;calls=new Map;cache=new Map;times=[];workerNow(){if(this.worker||!this.make)return this.worker;try{const e=this.make();e.onmessage=n=>{const a=n.data;this.calls.get(a.id)?.(a),this.calls.delete(a.id)},e.onerror=n=>{for(const a of this.calls.values())a({error:n.message||"worker failed"});this.calls.clear()},this.worker=e}catch{this.worker=null}return this.worker}analysis(e,n,a,o,r){const s=`${e}:${o}:${r}`;let l=this.cache.get(s);return l||(l=this.run(n,a,o,r),this.cache.set(s,l),l.catch(()=>this.cache.delete(s)),this.cache.size>16&&this.cache.delete(this.cache.keys().next().value),l)}run(e,n,a,o){const r=this.workerNow();if(!r)return Promise.resolve(ys(e,n,a,o));const s=++this.seq;return new Promise(l=>{this.calls.set(s,c=>{c.analysis?(c.ms!==void 0&&this.times.push(c.ms),l(c.analysis)):l(ys(e,n,a,o))}),r.postMessage({id:s,channels:e.map(c=>c.slice(a,o)),sampleRate:n,from:a})})}}function R(t,e={},...n){const a=document.createElement(t);for(const[o,r]of Object.entries(e))a.setAttribute(o,r);return a.append(...n),a}const We=(t,e)=>I(t,B(e),t),wb=[{value:"transients",label:"At hits"},{value:"even",label:"Even"},{value:"beats",label:"Beats"}];class vb{constructor(e){this.host=e,this.canvas=R("canvas",{class:"nyx-chop-wave",role:"img","aria-label":"The slices","data-nyx-chop":"wave"}),We(this.canvas,"chop:wave"),this.canvas.addEventListener("click",o=>this.clickWave(o)),this.title=R("span",{class:"nc-readout nyx-chop-name","data-nyx-chop":"name"});const n=R("button",{type:"button",class:"nc-btn nyx-chop-close","data-nyx-chop":"close"},"Close");We(n,"chop:close"),n.addEventListener("click",()=>this.host.close()),this.body=R("div",{class:"nyx-chop-body"});const a=R("span",{class:"nc-label"},"Chop to pads");this.el=R("div",{class:"nyx-chop",role:"region","aria-label":"Chop to pads","data-nyx-chop":""},R("div",{class:"nyx-chop-head"},a,this.title,n),R("div",{class:"nyx-chop-wavebox"},this.canvas),this.body),typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.paintWave()).observe(this.canvas)}el;isOpen=!1;src=null;analysisOf=null;mode="transients";sensitivity=.5;count=16;perBeat=2;first=0;playBack=!0;choke=!0;snap=!0;moreOpen=!1;result=null;status="";canvas;body;title;async open(){const e=await this.host.source();if(!e)return!1;this.isOpen=!0,this.src=e,this.first=e.pad,this.playBack=e.tempo.known,this.analysisOf=null,this.result=null,this.status="Finding the hits…",this.render();const n=await this.host.analysis(e);return this.src!==e||(this.analysisOf=n,this.status="",this.run()),!0}close(){this.isOpen=!1,this.src=null,this.analysisOf=null}set(e){Object.assign(this,e),this.run()}get preview(){return{chop:this.result,first:this.first,playBack:this.playBack,choke:this.choke,bpm:this.src?.tempo.bpm??0}}run(){this.compute(),this.render()}compute(){const e=this.src,n=this.analysisOf;if(!e||!n)return;const a=V-this.first;let o=Oc(n,{mode:this.mode,sensitivity:this.sensitivity,count:Math.min(this.count,a),bpm:e.tempo.bpm,perBeat:this.perBeat,snap:this.snap});this.playBack&&(o=this.mode==="transients"&&e.tempo.known?Rg(o,e.sampleRate,e.tempo.bpm):qc(o,e.sampleRate,e.tempo.bpm)),this.result=Ig(o,a)}field(e,n,a,o=""){const r=R("label",{class:"nc-label",for:`nyx-chop-${e}`},n);return We(r,`chop:${e}`),R("div",{class:"nc-field","data-nc-row":"","data-nc-id":`chop-${e}`},r,R("span",{class:"nc-readout","data-nc-readout":""},o),a)}choices(e,n,a,o,r){const s=R("div",{class:"nc-choice-row",role:"tablist","aria-label":n,id:`nyx-chop-${e}`,"data-nyx-chop":e});for(const c of o){const d=R("button",{type:"button",class:"nc-choice",role:"tab","aria-selected":String(c.value===a),"data-nc-choice":c.value},c.label);We(d,B(`chop:${e}:${c.value}`)?`chop:${e}:${c.value}`:`chop:${e}`),c.disabled&&(d.disabled=!0),d.addEventListener("click",()=>r(c.value)),s.append(d)}const l=R("span",{class:"nc-label"},n);return We(l,`chop:${e}`),R("div",{class:"nc-field nyx-chop-choice","data-nc-row":"","data-nc-id":`chop-${e}`},l,s)}select(e,n,a,o){const r=R("select",{class:"nc-select",id:`nyx-chop-${e}`,"data-nyx-chop":e});for(const s of a)r.append(R("option",{value:s.value},s.label));return r.value=n,r.addEventListener("change",()=>o(r.value)),r}onOff(e,n,a,o,r=!1){return this.choices(e,n,a?"on":"off",[{value:"on",label:"On",disabled:r},{value:"off",label:"Off",disabled:r}],s=>o(s==="on"))}render(){const e=this.src;if(!e)return;const n=(e.to-e.from)/e.sampleRate;this.title.textContent=`${e.stem} · ${n<10?n.toFixed(2):n.toFixed(1)} s`;const a=this.result,o=[];if(o.push(this.choices("mode","Chop",this.mode,wb,h=>{this.mode=h,this.run()})),this.mode==="transients"){const h=R("input",{type:"range",class:"nc-range",id:"nyx-chop-sensitivity",min:"0",max:"1",step:"0.01","data-nyx-chop":"sensitivity"});h.value=String(this.sensitivity);const m=this.field("sensitivity","Sensitivity",h,`${Math.round(this.sensitivity*100)}%`);h.addEventListener("input",()=>{this.sensitivity=Number(h.value),this.compute();const g=m.querySelector(".nc-readout");g&&(g.textContent=`${Math.round(this.sensitivity*100)}%`),this.paintWave()}),h.addEventListener("change",()=>this.render()),m.setAttribute("data-nc-slider",""),m.append(m.querySelector(".nc-readout")),o.push(m)}if(this.mode!=="beats")o.push(this.field("count","Slices",this.select("count",String(this.count),[16,8,4].map(h=>({value:String(h),label:this.mode==="transients"?`Up to ${h}`:String(h)})),h=>{this.count=Number(h),this.run()})));else{const h=m=>Math.ceil(n*e.tempo.bpm/60*m-.05);o.push(this.choices("every","Every",String(this.perBeat),[{value:"1",label:"Beat",disabled:h(1)>Ue},{value:"2",label:"1/8",disabled:h(2)>Ue},{value:"4",label:"1/16",disabled:h(4)>Ue}],m=>{this.perBeat=Number(m),this.run()}))}o.push(this.field("first","Fill from",this.select("first",String(this.first),Array.from({length:V},(h,m)=>({value:String(m),label:`Pad ${m+1}`})),h=>{this.first=Number(h),this.run()})));const r=a?_r(a,e.sampleRate,e.tempo.bpm):null,s=r!==null&&r.bars===0;if(o.push(this.onOff("play-back","Play it back",this.playBack&&!s,h=>{this.playBack=h,this.run()},s)),this.status&&o.push(R("p",{class:"nc-note","data-nyx-chop":"status"},this.status)),a&&r){const h=a.cuts.length-1,m=this.first+h,g=h>1?`${ea(e.stem,0)} to ${ea(e.stem,h-1)}`:ea(e.stem,0),w=this.playBack&&r.bars?` Play it back writes ${r.bars===1?"a bar":`${r.bars} bars`} on their lanes.`:s?" Longer than 8 bars: no Play it back.":"";o.push(R("p",{class:"nc-note","data-nyx-chop":"summary"},`${h} slices onto pads ${this.first+1}–${m}: ${g}.${w}`));const f=this.host.pads().slice(this.first,m).filter((b,y)=>b.sample&&this.first+y!==e.pad).length;f&&o.push(R("p",{class:"nc-note nyx-chop-warn","data-nyx-chop":"warn"},`${f===1?"1 of those pads has a sound":`${f} of those pads have sounds`}. Chop replaces ${f===1?"it":"them"}; Undo puts ${f===1?"it":"them"} back.`))}const l=R("div",{class:"nc-group","data-nc-id":"chop-more","data-nc-open":String(this.moreOpen)}),c=R("button",{type:"button",class:"nc-group-toggle","aria-expanded":String(this.moreOpen),"data-nyx-chop":"more"},R("span",{class:"nc-group-title"},"More"),R("span",{class:"nc-group-summary"},`${e.tempo.bpm} BPM · choke ${this.choke?"on":"off"}${this.mode!=="transients"?` · snap ${this.snap?"on":"off"}`:""}`),R("span",{class:"nc-group-mark","aria-hidden":"true"},this.moreOpen?"−":"+"));We(c,"chop:more"),c.addEventListener("click",()=>{this.moreOpen=!this.moreOpen,this.render()});const d=R("div",{class:"nc-group-body",role:"group"});d.hidden=!this.moreOpen;const u=R("div",{class:"nc-field","data-nc-row":"","data-nc-id":"chop-tempo"},R("span",{class:"nc-label"},"Tempo"),R("span",{class:"nc-readout","data-nc-readout":""},`${e.tempo.bpm} BPM, ${e.tempo.from}`));We(u.firstElementChild,"chop:tempo"),d.append(u,this.onOff("choke","Choke",this.choke,h=>{this.choke=h,this.render()})),this.mode!=="transients"&&d.append(this.onOff("snap","Snap to hits",this.snap,h=>{this.snap=h,this.run()})),l.append(c,d),o.push(l);const p=R("button",{type:"button",class:"nc-btn nyx-chop-go","data-nyx-chop":"go"},"Chop to pads");We(p,"chop:go"),p.disabled=!a,p.addEventListener("click",()=>{this.src&&this.result&&this.host.apply(this.src,this.result,{first:this.first,playBack:this.playBack&&!s,choke:this.choke,bpm:this.src.tempo.bpm})}),o.push(p),this.body.replaceChildren(...o),this.paintWave()}clickWave(e){const n=this.src,a=this.result;if(!n||!a)return;const o=this.canvas.getBoundingClientRect(),r=n.from+(e.clientX-o.left)/Math.max(1,o.width)*(n.to-n.from);for(let s=0;s<a.cuts.length-1;s++)if(r>=a.cuts[s]&&r<a.cuts[s+1]){this.host.audition(n,a.cuts[s],a.cuts[s+1]);return}}paintWave(){const e=this.src,n=this.canvas,a=n.clientWidth,o=n.clientHeight;if(!e||!a||!o)return;const r=window.devicePixelRatio||1;n.width=Math.round(a*r),n.height=Math.round(o*r);const s=n.getContext("2d");if(!s)return;s.scale(r,r);const l=getComputedStyle(this.el),c=x=>l.getPropertyValue(x).trim(),d=c("--nc-ui-accent"),u=c("--nc-ui-accent-soft")||c("--nc-ui-divider"),p=c("--nc-ui-color-accent-pad")||c("--nc-ui-text-sub"),h=c("--nc-ui-font-readout")||"monospace",m=this.result;s.clearRect(0,0,a,o);const g=Math.max(1,e.to-e.from),w=x=>(x-e.from)/g*a,f=16,b=f+(o-f)/2,y=(o-f)/2-2;if(m)for(let x=1;x<m.cuts.length-1;x+=2)s.fillStyle=u,s.fillRect(w(m.cuts[x]),f,w(m.cuts[x+1])-w(m.cuts[x]),o-f);s.fillStyle=p;const v=g/a;for(let x=0;x<a;x++){const $=Math.floor(e.from+x*v),k=Math.min(e.to,Math.floor(e.from+(x+1)*v));let A=0,S=0;const L=Math.max(1,Math.floor((k-$)/64));for(let _=$;_<k;_+=L){let U=0;for(const ce of e.data)U+=ce[_]??0;U/=e.data.length||1,U<A&&(A=U),U>S&&(S=U)}s.fillRect(x,b-S*y,1,Math.max(1,(S-A)*y))}if(m){s.fillStyle=d,s.strokeStyle=d,s.lineWidth=1,s.font=`600 10px ${h}`,s.textBaseline="top";for(let x=0;x<m.cuts.length-1;x++){const $=Math.round(w(m.cuts[x]))+.5;s.beginPath(),s.moveTo($,f-2),s.lineTo($,o),s.stroke();const k=String(this.first+x+1);w(m.cuts[x+1])-w(m.cuts[x])>s.measureText(k).width+6&&s.fillText(k,$+3,1)}}}attach(e){if(!this.isOpen||!e){this.el.isConnected&&this.el.remove();return}e.nextElementSibling!==this.el&&e.after(this.el),this.paintWave()}}const ks="My samples";function ro(t){return t.permission?"used with permission":t.licenseStatus==="redistributable"?"shareable licence":t.licenseStatus==="personal"?"personal use":"licence unknown: personal use"}const $s="http://www.w3.org/2000/svg";function z(t,e={},...n){const a=document.createElement(t);for(const[o,r]of Object.entries(e))a.setAttribute(o,r);return a.append(...n),a}function on(t,e,n={}){return t?z("a",{href:t,target:"_blank",rel:"noopener noreferrer",...n},e):z("span",n,e)}function xb(t){const e=kb(t);if(!e.length)return"M0 1H48";const n=e.map(s=>Math.sqrt(Math.max(0,s))),a=n.length,o=n.map((s,l)=>`${(l+.5)*48/a} ${1-Math.max(.04,s)*.96}`),r=[...n].map((s,l)=>`${(l+.5)*48/a} ${1+Math.max(.04,s)*.96}`).reverse();return`M0 1L${o.join("L")}L48 1L${r.join("L")}Z`}function kb(t){let e=-1;for(let n=t.length-1;n>=0;n--)if((t[n]??0)>0){e=n;break}return e<0?[]:t.slice(0,Math.min(t.length,Math.max(8,e+2)))}function $b(t){const e=document.createElementNS($s,"svg");e.setAttribute("viewBox","0 0 48 2"),e.setAttribute("preserveAspectRatio","none"),e.setAttribute("class","nyx-lib-wave"),e.setAttribute("aria-hidden","true");const n=document.createElementNS($s,"path");return n.setAttribute("d",xb(t)),e.append(n),e}function Ab(t){return t<1?`${t.toFixed(2)} s`:t<10?`${t.toFixed(1)} s`:`${Math.round(t)} s`}const Eb={kick:"Kick",snare:"Snare",clap:"Clap",hat:"Hat",tom:"Tom",perc:"Perc",cymbal:"Cymbal",fx:"FX",tonal:"Tonal"};class Sb{constructor(e){this.host=e,this.input=z("input",{type:"search",class:"nyx-lib-input",id:"nyx-library-ask",placeholder:"punchy kick, dusty funk kit",autocomplete:"off",spellcheck:"false",enterkeyhint:"search","aria-label":"Ask the Library","data-nyx-lib":"ask"});const n=z("label",{class:"nc-label",for:"nyx-library-ask"},"Ask");I(n,B("library:ask"),this.input),this.input.addEventListener("input",()=>this.schedule()),this.input.addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this.run()):r.key==="Escape"&&(r.preventDefault(),this.host.close())});const a=z("button",{type:"button",class:"nc-btn nyx-lib-close","data-nyx-lib":"close"},"Close");I(a,B("library:close"),a),a.addEventListener("click",()=>this.host.close()),this.forLine=z("p",{class:"nc-note nyx-lib-for","data-nyx-lib":"for"}),this.status=z("p",{class:"nc-note nyx-lib-status","data-nyx-lib":"status","aria-live":"polite"}),this.list=z("ul",{class:"nyx-lib-results","data-nyx-lib":"results"}),this.kitBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"kit"},"Build kit"),I(this.kitBtn,B("library:kit"),this.kitBtn),this.kitBtn.addEventListener("click",()=>void this.buildKit()),this.creditsBtn=z("button",{type:"button",class:"nc-btn","data-nyx-lib":"credits","aria-expanded":"false"},"Credits"),I(this.creditsBtn,B("library:credits"),this.creditsBtn),this.creditsBtn.addEventListener("click",()=>{this.creditsOpen=!this.creditsOpen,this.render()}),this.creditsEl=z("div",{class:"nyx-lib-credits",id:"nyx-library-credits","data-nyx-lib":"credits-list"}),this.creditsBtn.setAttribute("aria-controls",this.creditsEl.id),this.sourcesEl=z("div",{class:"nyx-lib-sources",role:"group","aria-label":"Library source","data-nyx-lib":"sources"}),this.fileInput=z("input",{type:"file",hidden:"","data-nyx-lib":"folder-input","aria-label":"Open a local Library folder"}),this.fileInput.webkitdirectory=!0,this.fileInput.multiple=!0,this.fileInput.addEventListener("change",()=>{const r=this.fileInput.files;r?.length&&this.host.local?.openFiles(r),this.fileInput.value=""});const o=this.host.local;if(o){let r=o.state.status;o.onChange(()=>{const s=o.state.status;s==="ready"&&r!=="ready"&&(this.source="local"),s!=="ready"&&this.source!=="shelf"&&s!=="opening"&&(this.source="shelf"),r=s,this.isOpen?this.run():this.render()})}this.el=z("div",{class:"nyx-library",role:"region","aria-label":"Library","data-nyx-library":""},z("div",{class:"nyx-lib-ask"},n,this.input,a),this.sourcesEl,this.fileInput,this.forLine,this.list,this.status,z("div",{class:"nyx-lib-actions"},this.kitBtn,this.creditsBtn),this.creditsEl)}el;input;forLine;status;list;kitBtn;creditsBtn;creditsEl;sourcesEl;fileInput;source="shelf";lib=null;loading=null;failed=!1;query=null;hits=[];kit=[];playing=null;busy=null;creditsOpen=!1;message="";timer=null;isOpen=!1;open(e){this.isOpen=!0,e!==void 0&&(this.input.value=e),this.ensure().then(()=>this.run()),this.render()}closePanel(){this.isOpen=!1,this.host.stopPreview(),this.playing=null}focus(){this.input.focus()}get catalog(){const e=this.host.local?.lib??null;return e?is(Ot,this.lib,e):this.lib}catalogFor(e){return e==="local"?this.host.local?.lib??null:this.lib}active(){const e=this.host.local?.lib??null;return this.source==="local"?e:this.source==="all"?e||this.lib?is("All",this.lib,e):null:this.lib}choose(e){e!=="shelf"&&!this.host.local?.lib||(this.source=e,this.run())}openFolder(){const e=this.host.local;e&&(e.canRemember?e.pick():this.fileInput.click())}ensure(){return this.lib?Promise.resolve(this.lib):(this.loading??=this.host.catalog().then(e=>(this.lib=e,this.failed=!1,this.render(),e),()=>(this.failed=!0,this.loading=null,this.render(),null)),this.render(),this.loading)}schedule(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>this.run(),150)}run(){this.timer&&clearTimeout(this.timer),this.timer=null;const e=this.input.value;if(this.message="",!this.lib&&this.source!=="local"&&!this.failed&&(this.ensure().then(a=>a&&this.run()),this.source==="shelf"))return;const n=this.active();!n||!e.trim()?(this.query=null,this.hits=[],this.kit=[]):(this.query=Uo(e,n),this.kit=this.query.kit?cs(n,this.query):[],this.hits=this.query.kit?[]:sm(n,this.query,{limit:sc})),this.render()}get results(){return{kit:!!this.query?.kit,ids:this.query?.kit?this.kit.map(e=>e.sound.id):this.hits.map(e=>e.sound.id),unknown:this.query?.unknown??[]}}async play(e){if(this.playing===e.id){this.host.stopPreview(),this.playing=null,this.render();return}this.playing=e.id,this.render();try{await this.host.preview(e)}finally{this.playing===e.id&&(this.playing=null,this.render())}}async load(e){if(!this.busy){this.busy=e.id,this.render();try{await this.host.load(e,this.input.value)}finally{this.busy=null,this.render()}}}async chopSound(e){if(!(this.busy||!this.host.chop)){this.busy=e.id,this.render();try{await this.host.chop(e,this.input.value)}finally{this.busy=null}}}async buildKit(){if(this.busy)return;this.source!=="local"&&!this.lib&&await this.ensure();const e=this.active();if(!e)return;const n=this.input.value,a=Uo(n,e),o=cs(e,{...a,roles:[],kit:!0});if(!o.length){this.message="The Library has nothing for a kit yet.",this.render();return}this.busy="kit",this.render();try{await this.host.buildKit(o,n)}finally{this.busy=null,this.render()}}row(e,n){const a=this.playing===e.id,o=z("button",{type:"button",class:"nyx-lib-play","data-nyx-lib":"play","aria-label":`${a?"Stop":"Play"} ${e.title}`,"aria-pressed":String(a)},a?"■":"▶");I(o,B("library:play"),o),o.addEventListener("click",()=>void this.play(e));const r=this.busy===e.id,s=z("button",{type:"button",class:"nc-btn nyx-lib-load","data-nyx-lib":"load","aria-label":`Load ${e.title} onto ${this.host.target().title}`},r?"Loading…":"Load");this.busy&&(s.disabled=!0),I(s,B("library:load"),s),s.addEventListener("click",()=>void this.load(e));const l=on(e.licenseUrl,Sr(e.license,e.licenseStatus,e.permission),{class:"nyx-lib-badge","data-nyx-lib":"badge",title:e.origin==="local"?`${e.license}: ${ro(e)}`:e.license});I(l,B("library:badge"));const c=Eb[e.role]??e.role,d=n?n.slot.role===e.role?n.slot.label:`${n.slot.label} · ${c}`:c,u=z("span",{class:"nyx-lib-meta"},...e.origin==="local"?[z("span",{class:"nyx-lib-chip","data-nyx-lib":"local-chip"},"LOCAL")," "]:[],`${d} · ${Ab(e.measures.length)} · `,on(e.creatorLink,e.creator,{class:"nyx-lib-creator"})),p=z("span",{class:"nyx-lib-name",title:e.title},e.title),h=z("span",{class:"nyx-lib-main"},p,u);n?.note&&h.append(z("span",{class:"nyx-lib-meta nyx-lib-warn"},n.note)),hc(e)&&h.append(z("span",{class:"nyx-lib-meta","data-nyx-lib":"personal"},e.license==="unknown"?"Licence unknown: personal use":`${e.license}, ${ro(e)}`));const m=z("span",{class:"nyx-lib-wavebox"},$b(e.wave));I(m,B("library:wave"));const g=this.host.chop&&e.origin==="local"&&(e.kind==="loop"||Rr(e.title).kind==="loop")?z("button",{type:"button",class:"nc-btn nyx-lib-load nyx-lib-chop","data-nyx-lib":"chop","aria-label":`Chop ${e.title} to pads`},"Chop"):null;g&&(this.busy&&(g.disabled=!0),I(g,B("library:chop"),g),g.addEventListener("click",()=>void this.chopSound(e)));const w=z("li",{class:"nyx-lib-row","data-nyx-sound":e.id,"data-nyx-role":e.role},o,h,m,l,g?z("span",{class:"nyx-lib-loads"},s,g):s);return a&&(w.dataset.nyxPlaying=""),w}renderCredits(){if(this.creditsBtn.setAttribute("aria-expanded",String(this.creditsOpen)),this.creditsEl.hidden=!this.creditsOpen,!this.creditsOpen)return;const e=this.host.pads(),n=mc(e);if(!n.length){this.creditsEl.replaceChildren(z("p",{class:"nc-note"},"No Library sounds on the pads yet."));return}const a=hm(n),o=[];for(const r of a){const s=r.origin==="local";a.length>1&&o.push(z("p",{class:"nc-label","data-nyx-lib":`credits-${r.origin}`},s?"Your local Library":Ot));const l=z("ul",{class:"nyx-lib-credit-list","data-nyx-origin":r.origin});for(const c of r.credits){const d=`On pad${c.pads.length>1?"s":""} ${c.pads.join(", ")}`;l.append(z("li",{class:"nyx-lib-credit","data-nyx-credit":c.id},z("span",{class:"nyx-lib-name"},c.title),z("span",{class:"nyx-lib-meta"},"by ",on(c.creatorLink,c.creator)," · ",on(c.licenseUrl,c.license),...s?[` (${ro(c)})`]:[],...c.source?[" · ",on(c.source,"source")]:s?[]:[" · source"],s?` · from ${Cr}`:` · via ${c.curator}`),z("span",{class:"nyx-lib-meta"},d)))}o.push(l)}this.creditsEl.replaceChildren(...o)}forText(){const e=this.host.target();return this.source==="local"?`Load goes on ${e.title}. Your local Library: it plays here and is never uploaded.`:this.source==="all"?`Load goes on ${e.title}. musicmatter.art and your local Library together.`:`Load goes on ${e.title}. Curated: every sound checked by a person.`}renderSources(){const e=this.host.local;if(!e){this.sourcesEl.hidden=!0;return}this.sourcesEl.hidden=!1;const n=e.state,a=(s,l,c="")=>{const d=z("button",{type:"button",class:"nc-btn","data-nyx-lib":`source-${s}`,...c?{title:c}:{},"aria-pressed":String(this.source===s),"data-on":String(this.source===s)},l);return I(d,B(`library:source-${s}`),d),d.addEventListener("click",()=>this.choose(s)),d},o=(s,l,c)=>{const d=z("button",{type:"button",class:"nc-btn","data-nyx-lib":s},l);return I(d,B(`library:${s}`),d),d.addEventListener("click",c),d},r=[a("shelf",Ot)];if(n.status==="ready"&&r.push(a("local",ks,n.name),a("all","All")),n.status==="reconnect"){const s=o("reconnect",`Reconnect ${ks}`,()=>void e.reconnect());s.title=n.name,r.push(s)}else n.status!=="ready"&&r.push(o("open-folder",n.status==="opening"?"Opening…":"Open folder…",()=>this.openFolder()));(n.status==="ready"||n.status==="reconnect")&&r.push(o("forget","Forget",()=>void e.forget())),this.sourcesEl.replaceChildren(...r)}localStatus(){const e=this.host.local;if(!e)return null;const n=e.state;return n.status==="error"?{text:n.message,danger:!0}:this.source==="shelf"?null:n.status==="ready"&&!n.remembered&&!this.query?{text:`${n.lib.sounds.length} local sounds. This browser can't keep the folder: open it again next visit.`,danger:!1}:null}render(){this.renderSources(),this.forLine.textContent=this.forText();const e=[];if(this.query?.kit)for(const s of this.kit)e.push(this.row(s.sound,s));else for(const s of this.hits)e.push(this.row(s.sound));this.list.replaceChildren(...e);let n=this.message,a=!1;const o=this.active(),r=this.localStatus();!n&&r?(n=r.text,a=r.danger):!n&&this.source==="local"&&!o?n="Open your local Library: the folder the sample picker exported.":n||(this.failed&&!o?(n="The Library couldn't be reached. Check the connection, then ask again.",a=!0):o?this.busy==="kit"?n="Building the kit…":this.query?this.query.kit?n=this.kit.length?"A kit for pads 1–8: Build kit puts it on them and keeps the pattern.":"Nothing for a kit.":this.hits.length?n="":n="Nothing matches. Try a role (kick, snare, hat) and a word like dark or tight.":n=`${o.sounds.length} sounds. Try "punchy kick" or "funk kit".`:n="Opening the Library…",this.query?.unknown.length&&(n=`${n?`${n} `:""}Not in the Library's words: ${this.query.unknown.join(", ")}.`.trim())),this.status.textContent=n,this.status.hidden=!n,a?this.status.dataset.ncTone="danger":delete this.status.dataset.ncTone,this.kitBtn.textContent=this.busy==="kit"?"Building…":"Build kit",this.kitBtn.disabled=!!this.busy||!o,this.renderCredits()}refresh(){const e=this.host.target(),n=this.forText();if(this.forLine.textContent!==n){this.forLine.textContent=n;for(const a of this.list.querySelectorAll('[data-nyx-lib="load"]')){const o=a.closest("li")?.querySelector(".nyx-lib-name")?.textContent??"";a.setAttribute("aria-label",`Load ${o} onto ${e.title}`)}}this.creditsOpen&&this.renderCredits()}attach(e){if(!this.isOpen||!e){this.el.isConnected&&this.el.remove();return}if(e.nextElementSibling===this.el)return;const n=document.activeElement===this.input,{selectionStart:a,selectionEnd:o}=this.input;e.after(this.el),n&&(this.input.focus(),a!==null&&o!==null&&this.input.setSelectionRange(a,o))}}const ht="nyx-local-library.json";function io(t){return{name:t.name,async read(e){const n=e.split("/"),a=n.pop();let o=t;for(const r of n)o=await o.getDirectoryHandle(r);return(await o.getFileHandle(a)).getFile()}}}function Mb(t){const e=[...t].map(l=>({file:l,path:(l.webkitRelativePath||l.name).replace(/\\/g,"/")})),a=e.filter(l=>l.path===ht||l.path.endsWith(`/${ht}`)).sort((l,c)=>l.path.length-c.path.length)[0];if(!a)return null;const o=a.path.slice(0,a.path.length-ht.length),r=new Map;for(const l of e)l.path.startsWith(o)&&r.set(l.path.slice(o.length),l.file);return{name:o.replace(/\/$/,"").split("/").pop()||"Local Library",async read(l){const c=r.get(l);if(!c)throw new Error(`${l} isn't in the folder`);return c}}}function Lb(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"local"}async function Tb(t){let e;try{e=await(await t.read(ht)).text()}catch{throw new Error(`${t.name} has no ${ht}. Open the folder the sample picker exported.`)}let n;try{n=JSON.parse(e)}catch{throw new Error(`${ht} in ${t.name} isn't readable JSON.`)}if(n?.kind!=="nyx-local-library")throw new Error(`${t.name} isn't a NYX local Library.`);return uc(n,Lb(t.name))}async function Cb(t){const e=new Uint8Array(await crypto.subtle.digest("SHA-256",t));return Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}async function Nb(t,e){const n=pc(e.audio);if(e.origin!=="local"||!n)throw new Error("it isn't a local sound");let a;try{a=await t.read(n)}catch{throw new Error(`${n} isn't in ${t.name} any more`)}const o=await a.arrayBuffer();if(await Cb(o)!==e.sha256)throw new Error("the file isn't the one the local Library lists");return o}const Fb="nyx-local-library",Qo="handles",so="folder";function zb(){return new Promise((t,e)=>{const n=indexedDB.open(Fb,1);n.onupgradeneeded=()=>n.result.createObjectStore(Qo),n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function lo(t,e){return zb().then(n=>new Promise((a,o)=>{const r=e(n.transaction(Qo,t).objectStore(Qo));r.onsuccess=()=>a(r.result),r.onerror=()=>o(r.error)}).finally(()=>n.close()))}function Pb(){return typeof indexedDB>"u"?{get:async()=>null,set:async()=>{},clear:async()=>{}}:{get:()=>lo("readonly",t=>t.get(so)).then(t=>t??null),set:t=>lo("readwrite",e=>e.put(t,so)),clear:()=>lo("readwrite",t=>t.delete(so))}}function Db(){const t=globalThis;return typeof t.showDirectoryPicker=="function"?t.showDirectoryPicker.bind(globalThis):null}class Bb{st={status:"none"};folder=null;handle=null;picker;handles;listeners=[];constructor(e={}){this.picker=e.picker===void 0?Db():e.picker,this.handles=e.handles??Pb()}get state(){return this.st}get lib(){return this.st.status==="ready"?this.st.lib:null}get canRemember(){return!!this.picker}onChange(e){this.listeners.push(e)}set(e){this.st=e;for(const n of this.listeners)n()}async load(e,n){this.set({status:"opening",name:e.name});try{const a=await Tb(e);return this.folder=e,this.set({status:"ready",name:e.name,lib:a,remembered:n}),!0}catch(a){return this.folder=null,this.set({status:"error",message:a.message}),!1}}async restore(){if(!this.picker)return;let e=null;try{e=await this.handles.get()}catch{return}if(!e)return;this.handle=e,(await e.queryPermission?.({mode:"read"}).catch(()=>"prompt")??"granted")==="granted"?await this.load(io(e),!0):this.set({status:"reconnect",name:e.name})}async reconnect(){const e=this.handle;return e?(await e.requestPermission?.({mode:"read"}).catch(()=>"denied")??"granted")!=="granted"?(this.set({status:"reconnect",name:e.name}),!1):this.load(io(e),!0):this.pick()}async pick(){if(!this.picker)return!1;let e;try{e=await this.picker({mode:"read",id:"nyx-local-library"})}catch(a){return a.name==="AbortError"||this.set({status:"error",message:`The folder couldn't be opened: ${a.message}`}),!1}const n=await this.load(io(e),!0);return n&&(this.handle=e,await this.handles.set(e).catch(()=>{})),n}async openFiles(e){const n=Mb(e);return n?this.load(n,!1):(this.set({status:"error",message:`That folder has no ${ht}. Open the folder the sample picker exported.`}),!1)}async forget(){this.folder=null,this.handle=null,await this.handles.clear().catch(()=>{}),this.set({status:"none"})}bytes(e){return this.folder?Nb(this.folder,e):Promise.reject(new Error("its local Library folder isn't open. Open or reconnect it"))}}const Ob="nyx-limiter",Hr={knee:.6,ceiling:.944,range:4,points:8193};function qb(t,{knee:e,ceiling:n}=Hr){const a=Math.abs(t);if(a<=e)return t;const o=n-e;return Math.sign(t)*(e+o*Math.tanh((a-e)/o))}function Rb({range:t,points:e}=Hr){const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=qb((2*a/(e-1)-1)*t);return n}function Ib(t){const e=t.createGain();e.gain.value=1/Hr.range;const n=t.createWaveShaper();return n.curve=Rb(),n.oversample="none",e.connect(n),{input:e,output:n}}const As="nyx-picker-bridge",Es=1,jb=3e3,_b=64*1024*1024,Hb=new Set(["127.0.0.1","localhost","[::1]"]);function Wb(t){const e=new URLSearchParams(t).get("picker");if(!e)return null;let n;try{n=new URL(e)}catch{return null}return n.protocol!=="http:"||!Hb.has(n.hostname)||!n.port||n.username||n.password||e.replace(/\/$/,"")!==n.origin?null:n.origin}function Ub(t){const e=t&&typeof t=="object"&&!Array.isArray(t)?t:{};if(e.kind!=="nyx-picker-kit")throw new Error("not a picker kit");const n=Array.isArray(e.sounds)?e.sounds:[];if(!n.length)throw new Error("the kit is empty");if(n.length>V)throw new Error(`more than ${V} sounds`);const a=new Set,o=[];for(const l of n){const c=l&&typeof l=="object"?l:{},d=c.pad;if(typeof d!="number"||!Number.isInteger(d)||d<1||d>V||a.has(d))throw new Error("a sound has no pad of its own");const u=uc({sounds:[c]},"sample-picker").sounds[0];if(!u)throw new Error(`pad ${d}'s sound isn't complete`);a.add(d),o.push({pad:d-1,sound:u})}const r=typeof e.id=="string"?e.id.slice(0,80):"",s=typeof e.name=="string"&&e.name.trim()?e.name.trim().slice(0,80):"Sample picker";return{id:r,name:s,sounds:o}}function Gb(t,e,n){if(n==="replace"){const r=[];for(let s=0;s<V;s++)t[s]&&r.push(s);return{to:[...e],replaced:r,clear:!0}}const a=new Set;for(let r=0;r<V;r++)t[r]||a.add(r);const o=e.map(r=>a.delete(r)?r:-1);for(let r=0;r<o.length;r++){if(o[r]!==-1)continue;const s=[...a].sort((l,c)=>l-c)[0];if(s===void 0)break;a.delete(s),o[r]=s}return{to:o,replaced:[],clear:!1}}function Jo(t){const e=[...t].sort((n,a)=>n-a).map(n=>String(n+1));return e.length>1?`${e.slice(0,-1).join(", ")} and ${e[e.length-1]}`:e[0]??""}function Yb(t,e,n){const a=e.to.filter(d=>d>=0),o=e.to.length-a.length,r=a.length,s=`${r===1?"pad":"pads"} ${Jo(a)}`,l=[],c=e.clear&&e.replaced.length>0;if(c){l.push(`This clears all 16 pads in NYX and loads your picker kit onto ${s}; the other pads stay empty.`);const d=e.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Gone: pad${e.replaced.length===1?"":"s"} ${d}. Undo brings all 16 back as they were.`)}else if(l.push(`From the sample picker on this computer, onto ${s}.`),e.replaced.length){const d=e.replaced.map(u=>`${u+1} (${n(u)})`).join(", ");l.push(`Replaces pad${e.replaced.length===1?"":"s"} ${d}. Undo brings ${e.replaced.length===1?"it":"them"} back.`)}return o&&l.push(`${o} won't fit: no empty pads left.`),t.sounds.some(d=>d.sound.licenseStatus==="personal")&&l.push("Some are for personal use only."),l.push("The pattern stays."),{title:c?"Replace everything in NYX?":`Load ${r} sound${r===1?"":"s"} from the picker?`,body:l.join(" ")}}async function Kb(t){const e=new Uint8Array(await crypto.subtle.digest("SHA-256",t));return Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}async function Xb(t,e,n,a){const o=p=>({ok:!1,placed:[],left:[],message:p}),r=Gb(a.filled(),t.sounds.map(p=>p.pad),e),s=t.sounds.flatMap((p,h)=>{const m=r.to[h]??-1;return m>=0?[{k:p,to:m}]:[]}),l=t.sounds.flatMap((p,h)=>(r.to[h]??-1)<0?[p.pad+1]:[]);if(!s.length)return{...o("Nothing loaded: NYX has no empty pads."),left:l};if(!await a.ask(Yb(t,r,a.padName)))return{...o("Not loaded: cancelled in NYX."),left:l};const c=[];try{for(const{k:p,to:h}of s){const m=n.get(p.pad+1);if(!m)throw new Error(`pad ${p.pad+1}'s audio is missing`);if(await Kb(m)!==p.sound.sha256)throw new Error(`pad ${p.pad+1}'s audio isn't the file named`);const{data:g,rate:w}=await a.decode(p.sound,m);c.push({index:h,sound:p.sound,data:g,rate:w})}}catch(p){return{...o(`Not loaded: ${p.message}. NYX's pads are as they were.`),left:l}}await a.place(c,r.clear);const d=s.map(({k:p,to:h})=>({from:p.pad+1,to:h+1})),u=l.length?` ${l.length} didn't fit (no empty pads).`:"";return{ok:!0,placed:d,left:l,message:r.clear&&r.replaced.length?`Replaced everything in NYX: pad${d.length===1?"":"s"} ${Jo(s.map(p=>p.to))} loaded, the others empty.`:`Loaded onto NYX pad${d.length===1?"":"s"} ${Jo(s.map(p=>p.to))}.${u}`}}function Vb(t){return Object.prototype.toString.call(t)==="[object ArrayBuffer]"}function Hc(t,e){const n=Ub(t),a=e&&typeof e=="object"?e:{},o=new Map;for(const{pad:r}of n.sounds){const s=a[String(r+1)];if(!Vb(s)||s.byteLength>_b)throw new Error(`pad ${r+1}'s audio is missing or too big`);o.set(r+1,s instanceof ArrayBuffer?s:new Uint8Array(s).slice().buffer)}return{kit:n,audio:o}}class Qb{constructor(e){this.o=e}last="";busy=!1;start(){return this.o.self.addEventListener("message",e=>void this.onMessage(e)),this.o.self.setInterval(()=>this.update(!0),jb),this.update(!0),this}update(e=!1){const n=this.o.pads(),a=JSON.stringify(n);!e&&a===this.last||(this.last=a,this.post({type:"state",pads:n,busy:this.busy}))}post(e){try{this.o.picker.postMessage({nyx:As,v:Es,...e},this.o.origin)}catch{}}async onMessage(e){if(e.origin!==this.o.origin||e.source!==this.o.picker)return;const n=e.data;if(!n||typeof n!="object"||n.nyx!==As||n.v!==Es)return;if(n.type==="hello")return this.update(!0);if(n.type!=="kit")return;const a=typeof n.id=="string"?n.id.slice(0,80):"",o=c=>this.post({type:"result",id:a,...c});if(this.busy)return o({ok:!1,placed:[],left:[],message:"NYX is still loading the last kit."});let r,s;try{({kit:r,audio:s}=Hc(n.kit,n.audio))}catch(c){return o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}const l=n.mode==="fill"?"fill":"replace";this.busy=!0;try{o(await this.o.receive(r,l,s))}catch(c){o({ok:!1,placed:[],left:[],message:`Not loaded: ${c.message}.`})}finally{this.busy=!1,this.update(!0)}}}function Jb(t,e){const n=Wb(t.location.search),a=t.opener;return!n||!a||t.parent!==t?null:new Qb({self:t,picker:a,origin:n,...e}).start()}function Zb(t){let e=!1;return{pads:()=>t.pads(),async receive(n,a,o){const r=c=>({ok:!1,placed:[],left:[],message:c});if(e)return r("NYX is still loading the last kit.");let s,l;try{({kit:s,audio:l}=Hc(JSON.parse(JSON.stringify(n??null)),o))}catch(c){return r(`Not loaded: ${c.message}.`)}e=!0;try{return await t.receive(s,a==="fill"?"fill":"replace",l)}catch(c){return r(`Not loaded: ${c.message}.`)}finally{e=!1}}}}const ey="nyx",ty=1;function Wc(t){const e={nyx:1,...Pr(t)},n=mc(t.pads);if(n.length&&(e.credits=n),Array.isArray(t.slots)){const a=Array.from({length:Ht},(r,s)=>{const l=t.slots?.[s];return l?qm(l):null}),o=typeof t.active=="number"&&a[t.active]?t.active:null;Object.assign(e,{slots:a,active:o})}return e}function Uc(t){return Gc(t),ba(t)}function ny(t){Gc(t);const e=t;if(!Array.isArray(e.slots))return null;const n=e.slots,a=Array.from({length:Ht},(s,l)=>{const c=n[l];return c&&typeof c=="object"&&!Array.isArray(c)?ba(c):null}),o=e.active,r=typeof o=="number"&&Number.isInteger(o)&&o>=0&&o<Ht&&a[o]?o:null;return{slots:a,active:r}}function Gc(t){if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Not a NYX pattern.");const e=t.nyx;if(e!==1)throw new Error(`Not a NYX pattern${typeof e=="number"?` (version ${e})`:""}.`)}function Wr(){try{return globalThis.localStorage??null}catch{return null}}function ay(t,e,n=Wr()){let a;try{a=e?.storageKey?.(t)}catch{a=void 0}if(typeof a!="string"||!a||a===t)return t;try{if(e?.legacyCopy!==!1&&n&&n.getItem(a)===null){const o=n.getItem(t);o!==null&&n.setItem(a,o)}}catch{}return a}const oy="nyx.state",Yc="nyx.scene-samples",ry=/^[0-9a-f]{16,64}$/;function Kc(t){try{const e=JSON.parse(t?.getItem(Yc)??"[]");return Array.isArray(e)?e.filter(n=>typeof n=="string"&&ry.test(n)):[]}catch{return[]}}function iy(t,e=Wr()){if(!e)return;const n=new Set;for(const o of[t,...t.slots??[]])for(const r of o?.pads??[])r.sample&&n.add(r.sample);if(!n.size)return;const a=[...Kc(e).filter(o=>!n.has(o)),...n].slice(-2048);try{e.setItem(Yc,JSON.stringify(a))}catch{}}function sy(t,e=Wr()){const n=$n(t);if(!e)return n;try{for(let a=0;a<e.length;a++){const o=e.key(a);if(o?.startsWith(oy))try{for(const r of $n(xc(JSON.parse(e.getItem(o)??"null"))))n.add(r)}catch{}}}catch{return null}for(const a of Kc(e))n.add(a);return n}const ly="NYX Sampler",Gt="nyx",ge=za(),ee=ub(Gt,ge),Xc=ay(cb("nyx.state",ge),ee),Ur=.15,E=Rm(Xc),K=new Kg(ge>1?`nyx-${ge}`:"nyx"),Pa=()=>Im(Xc,E),ot=()=>{const t=sy(E);if(t)for(const e of fe?.before??[])e.pad.sample&&t.add(e.pad.sample);if(t)for(const e of Kr)t.add(e);t&&K.prune(t)};let pe=!1,et=0,he=null,Yt=!1,ut="",F="";const ya=new Map,Zo=new Map,cy=1600,dy=96,Wn=new Map;function Vc(t){ya.has(t.hash)||ya.set(t.hash,vs(t.data)),Zo.has(t.hash)||Zo.set(t.hash,vs(t.data,cy))}function uy(t){if(!t.sample)return;const e=Zo.get(t.sample);if(!e||t.start<=0&&t.end>=1)return ya.get(t.sample);const n=`${t.sample}:${t.start}:${t.end}`,a=Wn.get(n);if(a)return a;const o=e.length/2,r=Math.max(0,Math.min(o-1,Math.floor(t.start*o))),s=Math.max(r+1,Math.min(o,Math.ceil(t.end*o))),l=[],c=Math.min(dy,s-r);for(let d=0;d<c;d++){const u=r+Math.floor((s-r)*d/c),p=Math.max(u+1,r+Math.floor((s-r)*(d+1)/c));let h=0,m=0;for(let g=u;g<p;g++)h=Math.min(h,e[g*2]??0),m=Math.max(m,e[g*2+1]??0);l.push(h,m)}return Wn.size>256&&Wn.clear(),Wn.set(n,l),l}let Qc=[],Fn=new Map;const De=new Id({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let N=null,bn=null;const py=new Qd({...pb(),app:db(ly,ge),version:"0.1.0",clock:De,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const t=N?.state;return t==="running"?"running":t==="suspended"?"suspended":t?"none":"needs-gesture"},startGate:()=>bn?.whenSettled?.()??null}),Sn=t=>t+(bn?.offset??0),O=()=>De.transport,Kt=()=>O().isPlayingAt(ne()),Mn=()=>Kt()&&!pe;let co=null,W=null;const xe=bb(ee,t=>W?.port.postMessage(t)),wa=[];let va=!1,Me=null,gt=null,Ss=null;const Ms=new Set;function se(){return Ss??=(async()=>{ee?(N=ee.ctx,co=ee.output,bn=ee.mapper??new pi(ee.ctx)):(N=new AudioContext({latencyHint:"interactive"}),co=N.destination,bn=new pi(N)),bn.start();try{await N.audioWorklet.addModule($g),await N.audioWorklet.addModule(kg)}catch{return F="Audio could not start (the sampler's worklet did not load). Reload to try again.",T(),!1}W=new AudioWorkletNode(N,"nyx-sampler",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]}),W.port.onmessage=n=>hy(n.data),Me=Pu(N,{moduleUrl:hb()??Ou,bpm:O().bpm,slots:3,state:Xo(E.hacks)}),er=Xo(E.hacks),gt=new GainNode(N,{gain:E.master}),W.connect(Me.input);const t=new AudioWorkletNode(N,Ob,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),e=Ib(N);Me.output.connect(gt).connect(t).connect(e.input),e.output.connect(co),Bu(Me,De,{toAudioTime:Sn,now:ne});for(const n of $n(E))await wt(n);return vt(),xe?.resend(),va&&W.port.postMessage({type:"hitlog",on:!0}),Xt(),!0})(),Ss}async function wt(t){const e=await K.get(t);return e?(Vc(e),W&&!Ms.has(t)&&(Ms.add(t),W.port.postMessage({type:"sample",hash:t,channels:e.data.map(n=>n.slice()),rate:e.sampleRate})),e):null}function hy(t){if(t.type==="hitlog"&&t.hits&&va){for(const e of t.hits)wa.length<2e4&&wa.push(e);return}t.type!=="pos"||!t.voices||(Qc=t.voices,Fn=new Map(t.voices.map(([e,n,a,o])=>{const r=tb(o)?Be.cache.byId(o):void 0,s=r?K.info(r.job.sample):void 0;return r&&s?[e,(r.job.from+n/r.frames*(r.job.to-r.job.from))/s.frames]:[e,n/Math.max(1,a)]})))}let ta=null,fy=0;const cn=new Map,Jc=[],my=.25;function gy(){if(ta)return ta;const t=new Worker(new URL("/nyx/assets/stretch-worker-DVLOsvIo.js",import.meta.url),{type:"module"});return t.onmessage=e=>{const n=e.data;cn.get(n.id)?.(n),cn.delete(n.id)},t.onerror=e=>{console.error("NYX stretch worker",e.message);for(const n of cn.values())n({error:e.message||"worker failed"});cn.clear()},ta=t,t}async function Zc(t){const e=await K.get(t.sample);if(!e)return null;const n=Math.ceil(my*t.sampleRate),a=Math.max(0,t.from-n),o=Math.min(e.frames,t.to+n),r=e.data.map(c=>c.slice(a,o)),s=++fy,l=gy();return new Promise(c=>{cn.set(s,d=>{if(d.error||!d.channels){console.error("NYX stretch",d.error),c(null);return}typeof d.ms=="number"&&Jc.push(Math.round(d.ms)),c(d.channels)}),l.postMessage({id:s,channels:r,sampleRate:t.sampleRate,from:t.from-a,to:t.to-a,frames:t.frames,semitones:t.semitones},r.map(d=>d.buffer))})}const Be=new ab({run:Zc,deliver(t,e){W?.port.postMessage({type:"sample",hash:t.sample,channels:e,rate:t.job.sampleRate},e.map(n=>n.buffer))},drop(t){W?.port.postMessage({type:"drop",hash:t.sample})},changed(){Be.failed&&!F&&(F="Keep pitch couldn't start in this browser: fitted pads change speed and pitch instead."),vt(),T()}});function vt(){if(!W)return;const t=O().bpm,e=n=>K.info(n);Be.plan(E.pads,e,t),W.port.postMessage({type:"program",program:ng(E,e,t,n=>Be.stretchedFor(n))})}let Ls="";function Xt(t=!1){if(!W)return;const e=O(),n=Mn();let a=0,o=e.bpm;if(e.running||e.isPlayingAt(ne())){const s=Math.max(0,e.beatAt(ne())),l=e.timeAt(s);o=60/(e.timeAt(s+1)-l),a=Sn(l)-s*60/o}const r=JSON.stringify([n,Math.round(a*2e3),o,et]);!t&&r===Ls||(Ls=r,W.port.postMessage({type:"clock",clock:{playing:n,zero:a,bpm:o,join:et}}))}let er=null;function ed(){if(!Me)return;const t=Xo(E.hacks),e=fg(er,t);if(er=t,e.whole)Me.setState(t);else for(const[n,a,o]of e.params)Me.setParam(n,a,o)}let yn=null;function by(){if(yn){const e=yn;Q(()=>{E.lanes=e}),F="Pattern back.",T();return}const t=structuredClone(E.lanes);t.some(e=>e.steps.some(n=>n.on)||e.mute||e.solo||e.length!==te)&&(Q(()=>{E.lanes=E.lanes.map(()=>Fa())}),he=null,yn=t,F="Pattern cleared: press Undo to bring it back.",T())}function Q(t){yn=null;const e=Vr(!1);t(),e&&ot(),E.active!==null&&(Yt=!0),ut="",Pa(),vt(),ed(),T()}const D=t=>E.pads[t]??Ae(t),Fe=t=>E.lanes[t]??Fa(),td=()=>D(E.selected);function tt(t,e=E.selected){Q(()=>t(D(e)))}async function yy(t,e){const n=D(t);if(n.normalize){tt(o=>{o.normalize&&(o.normalize.on=e)},t);return}if(!n.sample)return;let a;if(n.provenance)a={on:e,gainDb:0};else{const o=K.held(n.sample)??await K.get(n.sample);if(!o)return;a={..._t(o.data,o.sampleRate),on:e}}tt(o=>{o.sample===n.sample&&(o.normalize=a)},t)}function xa(t,e,n){Q(()=>{const a=Fe(t).steps[e];a&&n(a)})}function $e(t,e=!0){E.selected=Math.max(0,Math.min(V-1,t)),he&&he.lane!==E.selected&&(he=null),Pa(),e&&Ye(E.selected),T()}async function Ye(t,e=null,n=!1){if(!await se()||!N||!W)return;N.state!=="running"&&await N.resume().catch(()=>{});const a=D(t),o=a.sample?Mc(a,K.info(a.sample),O().bpm,e,Be.stretchedFor(t)):null;o&&W.port.postMessage({type:"play",pad:t,hit:o,hold:n})}let na=lg();const bt=new Map;function Da(t){return t.kind?{kind:t.kind,bpm:t.bpm}:t.origin==="local"?Rr(t.title):{kind:"",bpm:0}}function Gr(t,e){bt.delete(t);const n=D(t),a=n.sample?K.info(n.sample):void 0;if(!na||!e||!n.sample||!a)return;const o=ig(a.frames/a.sampleRate,e,O().bpm,qr);o&&(bt.set(t,{sample:n.sample,fit:o,before:{fit:n.fit,keepPitch:n.keepPitch}}),n.fit=o.bars,n.keepPitch=!0)}function wy(t){const e=bt.get(t);zc(e,D(t))&&(bt.delete(t),tt(n=>dg(e,n),t),F=`Fit undone: ${nt(t)} plays as recorded.`,T())}async function xt(t,e,n,a,o=!0,r=null,s=null,l=null,c=0){const{sample:d,saved:u}=await K.put(e,n);await wt(d.hash),Q(()=>{const p=D(t);p.sample=d.hash,p.provenance=r,p.normalize=l?{...l}:null,p.offsetDb=c,p.name=a.slice(0,24)||`Pad ${t+1}`,p.start=0,p.end=1,p.slices=0,p.cuts=[],p.fit=0,p.keepPitch=!0,p.follow=null,p.note=0,Gr(t,s)}),F=u?"":"Kept until you reload: this browser has no file storage here.",ot(),o&&Ye(t)}async function Yr(t,e=E.selected){if(/\.json$/i.test(t.name)||t.type==="application/json"){await Oy(t);return}if(!await se()||!N)return;let n;try{n=await N.decodeAudioData(await t.arrayBuffer())}catch{F=`Couldn't read ${t.name}: not an audio file this browser can decode.`,T();return}const{data:a,trimmed:o}=Ic(n);await xt(e,a,n.sampleRate,t.name.replace(/\.[^.]+$/,""),!0,null,Rr(t.name),_t(a,n.sampleRate)),o&&(F=`${t.name} was cut to its first minute.`,T())}const Kr=new Set;let fe=null;function nt(t,e=D(t).name){const n=`Pad ${t+1}`;return e===n?n:`${n} (${e})`}async function Xr(t,e,n=""){return D(t).sample?lr({title:`Replace ${nt(t)}?`,body:e==="Grab"?"Grab replaces its sound, its slices and that lane's steps. Undo brings them back.":e==="Sent"?`${n} replaces its sound, its slices and that lane's steps. Undo brings them back.`:"The take replaces its sound, its slices and that lane's steps when it lands. Undo brings them back.",confirmLabel:"Replace",cancelLabel:"Cancel"}):!0}function Oe(t){const e=Fr(E,t);return e.pad.sample&&Kr.add(e.pad.sample),e}function rt(t,e,n){Vr();const a=Array.isArray(t)?t:[t],o=a[0],r=Nf({message:n??(o?.pad.sample?`${e}: replaced ${nt(o.index,o.pad.name)}.`:`${e} onto Pad ${(o?.index??0)+1}.`),actionLabel:"Undo",onAction:()=>void Qr(),onClose:()=>{fe&&(fe.toast=null)}}),s=r.el.querySelector("button");s instanceof HTMLElement&&I(s,B("grab-undo"),s),fe={before:a,what:e,toast:r};for(const l of a)l.pad.sample&&Kr.delete(l.pad.sample)}function Vr(t=!0){if(!fe)return!1;const e=fe;return fe=null,e.toast?.close(),t&&ot(),!0}async function Qr(){const t=fe;if(!t)return!1;fe=null,t.toast?.close();for(const n of t.before)n.pad.sample&&await wt(n.pad.sample);Q(()=>{for(const n of t.before)Nm(E,n)}),he&&t.before.some(n=>n.index===he?.lane)&&(he=null);const e=t.before[0];return F=t.before.length===1&&e?`Undone: ${nt(e.index)} is back as it was.`:`Undone: pads ${t.before.map(n=>n.index+1).join(", ")} are back as they were.`,ot(),T(),!0}let uo=null;function nd(){return uo??=fetch(Kf,{mode:"cors"}).then(t=>{if(!t.ok)throw new Error(`Library: HTTP ${t.status}`);return t.json()}).then(t=>Qf(t)).catch(t=>{throw uo=null,t}),uo}const Ba=new Bb;Ba.restore();const ad=t=>`${t.id}#${t.sha256}`,rn=new Map;function vy(t){const e=ad(t);let n=rn.get(e);return!n&&t.origin==="local"&&(n=Ba.bytes(t),n.catch(()=>rn.delete(e)),rn.set(e,n)),n||(n=(async()=>{const a=await fetch(t.audio,{mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.arrayBuffer(),r=new Uint8Array(await crypto.subtle.digest("SHA-256",o));if(Array.from(r,l=>l.toString(16).padStart(2,"0")).join("")!==t.sha256)throw new Error("the file isn't the one the Library lists");return o})(),n.catch(()=>rn.delete(e)),rn.set(e,n)),n}const po=new Map;async function od(t){if(!await se()||!N)throw new Error("NYX's audio didn't start");const e=N,n=ad(t);let a=po.get(n);return a||(a=vy(t).then(o=>e.decodeAudioData(o.slice(0))),a.catch(()=>po.delete(n)),po.set(n,a)),a}const rd=t=>10**(t/20);async function id(t){return sd(await od(t),t)}function sd(t,e){const{data:n}=Ic(t),a=rd(e.measures.gain);for(const o of n)for(let r=0;r<o.length;r++)o[r]=(o[r]??0)*a;return{data:n,rate:t.sampleRate}}let qt=null;function ld(){const t=qt;qt=null;try{t?.src.stop()}catch{}}async function cd(t){ld();let e;try{e=await od(t)}catch(r){Jr(`Couldn't play ${t.title}: ${r.message}.`);return}if(!N||!gt)return;N.state!=="running"&&await N.resume().catch(()=>{});const n=new AudioBufferSourceNode(N,{buffer:e}),a=new GainNode(N,{gain:rd(t.measures.gain)*Ae(0).level});n.connect(a).connect(gt);const o={src:n,id:t.id};qt=o,await new Promise(r=>{n.onended=()=>{a.disconnect(),qt===o&&(qt=null),r()},n.start()})}function Jr(t){F=t,T()}async function Oa(t,e,n=E.selected){let a;try{a=await id(t)}catch(r){return Jr(`Couldn't load ${t.title}: ${r.message}.`),!1}const o=Oe(n);return await xt(n,a.data,a.rate,Na(t.title),!0,Nr(t,e),Da(t),vm),F=`${t.title} on Pad ${n+1}: ${t.creator}, ${Sr(t.license,t.licenseStatus,t.permission)}${hc(t)?" (personal use)":""}.`,rt(o,"Library"),T(),!0}async function xy(t,e){if(!await se())return!1;const n=await Promise.all(t.map(l=>id(l.sound).then(c=>({ok:!0,...c}),c=>({ok:!1,error:`${l.sound.title}: ${c.message}`})))),a=n.flatMap(l=>l.ok?[]:[l.error]);if(a.length)return Jr(`The kit couldn't load (${a.join("; ")}). The pads are as they were.`),!1;const o=[];for(const l of n){if(!l.ok)continue;const c=await K.put(l.data,l.rate);await wt(c.sample.hash),o.push(c)}for(let l=0;l<t.length;l++)Oe(l);let r=[];Q(()=>{r=zr(E,t.map((l,c)=>({sample:o[c]?.sample.hash??"",name:Na(l.sound.title),provenance:Nr(l.sound,e),hat:l.slot.role==="hat"}))),t.forEach((l,c)=>Gr(c,Da(l.sound)))});const s=t.flatMap(l=>l.note?[l.note]:[]);return F=`Kit on pads 1–${t.length}${e.trim()?` for "${e.trim()}"`:""}; the pattern stays.${s.length?` ${s.join(" ")}`:""}${o.some(l=>!l.saved)?" Kept until you reload: this browser has no file storage here.":""}`,rt(r,"Build kit",`Build kit: pads 1–${t.length} replaced.`),ot(),T(),!0}async function ky(t,e){const n=[];for(const c of t){const d=await K.put(c.data,c.rate);await wt(d.sample.hash),n.push(d)}if(e)for(let c=0;c<V;c++)Oe(c);else for(const c of t)Oe(c.index);const a=t.map((c,d)=>({index:c.index,sample:n[d]?.sample.hash??"",name:Na(c.sound.title),provenance:Nr(c.sound,""),hat:!1}));let o=[];Q(()=>{o=e?Fm(E,a):zr(E,a);for(const c of t)Gr(c.index,Da(c.sound))});const r=t.map(c=>c.index+1).join(", "),s=e&&o.some(c=>c.pad.sample),l=n.some(c=>!c.saved)?" Kept until you reload: this browser has no file storage here.":"";F=s?`From the sample picker: everything replaced, pad${t.length===1?"":"s"} ${r} loaded; the pattern stays.${l}`:`From the sample picker: pad${t.length===1?"":"s"} ${r}; the pattern stays.${l}`,rt(o,"Sample picker",s?"Sample picker: replaced everything in NYX.":`Sample picker: pad${t.length===1?"":"s"} ${r} loaded.`),ot(),T()}const dd={pads:()=>E.pads.map((t,e)=>({pad:e+1,name:t.name,filled:!!t.sample})),receive:(t,e,n)=>Xb(t,e,n,{filled:()=>Array.from({length:V},(a,o)=>!!E.pads[o]?.sample),padName:a=>D(a).name,ask:a=>(ee?.reveal?.(),lr({...a,confirmLabel:"Load",cancelLabel:"Cancel"})),decode:async(a,o)=>{if(!await se()||!N)throw new Error("NYX's audio didn't start");return sd(await N.decodeAudioData(o),a)},place:ky})},$y=ee?null:Jb(window,dd),Ay=ee?.pickerTarget?.(Zb(dd))??null;function Zr(t){const e=D(t).provenance,n=e?ye.catalogFor(e.origin):null;if(!e||!n)return[];const a=new Set(E.pads.flatMap((o,r)=>r!==t&&o.provenance?[o.provenance.id]:[]));return pm(n,e,a).map(o=>o.sound)}const ye=new Sb({catalog:nd,target:()=>({index:E.selected,title:nt(E.selected)}),pads:()=>E.pads,preview:cd,stopPreview:ld,load:(t,e)=>Oa(t,e),chop:(t,e)=>Ty(t,e),buildKit:xy,close:()=>at(!1),local:Ba}),ei=new yb(typeof Worker>"u"?null:()=>new Worker(new URL("/nyx/assets/chop-worker-CbuieNQN.js",import.meta.url),{type:"module"})),qa=new Map;async function Ey(){const t=E.selected,e=D(t);if(!e.sample)return null;const n=await K.get(e.sample);if(!n)return null;const a=Math.floor(e.start*n.frames),o=Math.min(n.frames,Math.ceil(e.end*n.frames)),r=qa.get(t),s=r&&r.sample===e.sample?r:null;return{sample:e.sample,stem:jg(e.name),data:n.data,sampleRate:n.sampleRate,from:a,to:o,pad:t,tempo:Bg({seconds:(o-a)/n.sampleRate,fit:e.fit,given:s?.bpm??0,givenFrom:s?.from,name:e.name,studioBpm:O().bpm})}}async function Sy(t,e,n){if(!await se()||!N||!W)return;N.state!=="running"&&await N.resume().catch(()=>{}),await wt(t.sample);const o={...D(t.pad),start:0,end:1,slices:0,cuts:[],fit:0,tune:0,fine:0,dir:"fwd",mode:"oneshot"},r=Mc(o,K.info(t.sample),O().bpm,null);r&&W.port.postMessage({type:"play",pad:t.pad,hit:{...r,from:e,to:n}})}function My(t,e,n){const a=K.info(t.sample);if(!a)return;const o=Math.min(e.cuts.length-1,V-n.first);if(o<1)return;const r=Array.from({length:o},(d,u)=>Oe(n.first+u)),s=D(t.pad),l={provenance:s.provenance?structuredClone(s.provenance):null,normalize:s.normalize?{...s.normalize}:null,offsetDb:s.offsetDb,level:s.level,note:s.note},c=n.choke?_g(E.pads,n.first,o):0;Q(()=>{Hg(E,e,{sample:t.sample,frames:a.frames,sampleRate:t.sampleRate,first:n.first,stem:t.stem,source:l,choke:c,playBack:n.playBack?{bpm:n.bpm}:null});for(let d=0;d<o;d++)bt.delete(n.first+d),qa.delete(n.first+d)}),yt.close(),rt(r,"Chop",`Chopped ${t.stem} onto pads ${n.first+1}–${n.first+o}.`),$e(n.first,!1),T()}const yt=new vb({source:Ey,analysis:t=>ei.analysis(t.sample,t.data,t.sampleRate,t.from,t.to),pads:()=>E.pads,audition:(t,e,n)=>void Sy(t,e,n),apply:My,close:()=>{yt.close(),T()}});async function zn(){ye.isOpen&&at(!1),await yt.open()&&(T(),yt.el.scrollIntoView?.({block:"nearest",behavior:"smooth"}))}async function Ly(t){const e=E.selected,n=Oe(e);await bd(t);const a=D(e).sample;a&&(t.bpm>0&&qa.set(e,{sample:a,bpm:t.bpm,from:"from the take"}),rt(n,`LUCY take ${t.id}`),await zn())}async function Ty(t,e){const n=E.selected;if(!await Oa(t,e,n))return;const a=D(n).sample,o=Da(t);a&&o.bpm>0&&qa.set(n,{sample:a,bpm:o.bpm,from:"from My samples"}),at(!1),await zn()}function at(t=!ye.isOpen,e){t?ye.open(e):ye.closePanel(),T(),t?ye.focus():me.querySelector('[data-nc-section="pads"] [data-nc-id="library"]')?.focus()}const G={from:"master",bars:1,busy:!1};async function ti(){const t=Ze();if(!t||G.busy||!await se()||!N)return;const e=O();if(!e.running){F="Play first: Grab takes the bars that just played.",T();return}const n=G.bars,a=Math.floor(e.beatAt(ne())/4)*4,o=a-4*n;if(o<0){F=`Grab needs ${n} whole bar${n===1?"":"s"} played first.`,T();return}const r=N.sampleRate,{from:s,to:l}=ib({from:Math.round(Sn(e.timeAt(o))*r),to:Math.round(Sn(e.timeAt(a))*r)},_c(t,G.from)),c=E.selected;if(G.busy=!0,T(),!await Xr(c,"Grab")){G.busy=!1,T();return}const d=t.takeResult?await t.takeResult(G.from,s,l):{channels:await t.take(G.from,s,l)},u=d.channels;G.busy=!1;const p=t.sources().find(g=>g.id===G.from)?.name??G.from;if(!u){F="reason"in d&&d.reason==="gone"?`Those bars of ${p} are gone (the Studio keeps the last 20 seconds): Grab again.`:`${p} isn't kept that far back yet: let it play ${n} more bar${n===1?"":"s"}, then Grab again.`,T();return}let h=0;for(const g of u)for(const w of g)h=Math.max(h,Math.abs(w));if(h<1e-4){F=`${p} was silent for those ${n===1?"bar":"bars"}.`,T();return}const m=Oe(c);await xt(c,u,r,`${p} grab`,!0,null,null,null,-5),n===1?(Q(()=>{const g=D(c);g.fit=1,g.keepPitch=!0,g.slices=16,g.cuts=[],g.decay=4;const w=Fe(c);w.length=te;for(const f of w.steps)Object.assign(f,Nn(),{on:!0})}),F=`Grabbed a bar of ${p}: 16 slices, every step on. Move, mute or lock steps to remix it.`):(tt(g=>{g.fit=n,g.keepPitch=!0},c),await tr(8,"transients",c),F=`Grabbed ${n} bars of ${p}, fitted to ${n} bars and sliced at the hits.`),rt(m,`Grabbed ${n===1?"a bar":`${n} bars`}`),T()}const Ts=240,Cy=.25,M={phase:"idle",startBeat:0,pad:0,source:"master",rec:null,timer:0,lastBar:0,lastBarFrame:0,fromFrame:0,latency:0,bpm:120,warned:!1,label:""};function ni(t){const e=Math.floor(t/4)*4;return t-e<Cy?e:e+4}function Ny(t){const e=N?.sampleRate??48e3;return Math.round(Sn(O().timeAt(t))*e)}function ud(t){const e=N?.sampleRate??48e3;return M.fromFrame+Math.round((t-M.startBeat)*60/M.bpm*e)}function ka(t=M.source){return Ze()?.sources().find(e=>e.id===t)?.name??t}function ai(){M.phase==="idle"?Fy():M.phase==="armed"?(M.phase="idle",F="",T()):M.phase==="rec"&&oi()}async function Fy(){const t=Ze();if(!t?.record){F="Take needs the Studio (reload it to update).",T();return}if(!await se()||!N)return;const e=E.selected;if(await Xr(e,"Take")&&M.phase==="idle"){if(M.source=G.from,M.pad=e,t.listen(M.source),!O().running){M.phase="armed",F="Take armed: starts with the music.",T();return}pd()}}function pd(){const t=Ze();if(!t?.record||!N){M.phase="idle";return}const e=O();M.startBeat=Math.max(0,ni(e.beatAt(ne()))),M.fromFrame=Ny(M.startBeat),M.bpm=e.bpm,M.latency=_c(t,M.source);const n=t.record(M.source,M.fromFrame+M.latency);if(!n){M.phase="idle",F=`${ka()} can't be recorded.`,T();return}M.rec=n,M.phase="rec",M.warned=!1,M.lastBar=M.startBeat,M.lastBarFrame=M.fromFrame,F=`Taking ${ka()}: stop on any bar.`,window.clearInterval(M.timer),M.timer=window.setInterval(zy,200),T()}function zy(){if(M.phase!=="rec")return;const t=O();if(!t.running)return;const e=t.beatAt(ne()),n=Math.floor(e/4)*4;n>M.lastBar&&(M.lastBar=n,M.lastBarFrame=ud(n));const a=240/Math.max(1,t.bpm),o=(Math.max(M.startBeat+4,ni(e))-M.startBeat)*60/Math.max(1,t.bpm);if(o+a>Ts){oi();return}!M.warned&&o>Ts-30&&(M.warned=!0,F="Take stops at four minutes: about 30 seconds left.");const r=hd();r!==M.label&&(M.label=r,T())}function hd(){if(M.phase==="armed")return"Armed: waits for Play";if(M.phase==="saving")return"Saving take…";if(M.phase!=="rec")return"Take";const t=O().beatAt(ne());return t<M.startBeat?"Starts on the bar…":`Stop take · bar ${Math.floor((t-M.startBeat)/4)+1}`}async function oi(t=!1){const e=M.rec;if(M.phase!=="rec"||!e)return;window.clearInterval(M.timer);let n,a;t?(n=M.lastBar,a=M.lastBarFrame):(n=Math.max(M.startBeat+4,ni(O().beatAt(ne()))),a=ud(n));const o=Math.round((n-M.startBeat)/4);if(M.rec=null,o<1){e.cancel(),M.phase="idle",F="The music stopped before a whole bar was taken.",T();return}M.phase="saving",T();try{await Py(e,a,o,n)}finally{M.phase="idle",T()}}async function Py(t,e,n,a){let o=null;try{o=await t.stop(e+M.latency)}catch(l){console.error("NYX take",l)}const r=ka();if(!o?.[0]?.length){F=`The take from ${r} came back empty.`,T();return}let s=0;for(const l of o)for(const c of l)s=Math.max(s,Math.abs(c));if(s<1e-4){F=`${r} was silent for the whole take.`,T();return}try{await Dy(o,n,a,r)}catch(l){console.error("NYX take",l),F=`The take from ${r} couldn't be kept (${l instanceof Error?l.message:String(l)}).`,T()}}async function Dy(t,e,n,a){const o=M.pad,r=`${a} take`.slice(0,20),s=E.pads.filter(d=>d.name.startsWith(r)).length+1,l=Oe(o);await fd(o,t,N?.sampleRate??48e3,e,Math.round(M.startBeat/4),{name:`${r} ${s}`,endBeat:n,offsetDb:-5}),rt(l,`Took ${e===1?"a bar":`${e} bars`}`),F=e<=kn?`${e} bar${e===1?"":"s"} of ${a} on ${D(o).name}: it loops every ${e===1?"bar":`${e} bars`}. Tap the pad to play it any time.`:`${e} bars of ${a} on ${D(o).name}. Longer than ${kn} bars, so it plays from the pad (tap or hold it), not the grid.`,T()}async function fd(t,e,n,a,o,r){await xt(t,e,n,r.name,!1,null,null,r.normalize??null,r.offsetDb??0);const s=a<=kn;Q(()=>zm(E,t,a,o));const l=O(),c=r.endBeat;if(c!==void 0&&s&&l.running&&W&&N){const d=D(t),u=Fe(t).steps[0],p=u?Or(d,0,u,K.info(d.sample??""),l.bpm,!1,Be.stretchedFor(t)):null,m=l.beatAt(ne()+Ur)-c;if(p&&m>0&&m<4*a){const g=Math.round(m*60/l.bpm*n*p.rate);p.from+g<p.to-1&&W.port.postMessage({type:"play",pad:t,hit:{...p,from:p.from+g,attack:.005}})}}}let ho=!1;function md(){return E.pads.map((t,e)=>({id:String(e+1),name:nt(e),...t.sample?{filled:!0}:{}}))}async function gd(t,e){const n=Pm(e,E.pads.length);if(n<0)return{ok:!1,reason:"refused",message:`NYX has no pad ${e}.`};if(ho||M.phase!=="idle"&&M.pad===n)return{ok:!1,reason:"busy",message:`Pad ${n+1} is busy: try again in a moment.`};if(!await se()||!N)return{ok:!1,reason:"refused",message:"NYX's audio didn't start."};ho=!0;try{const a=`${t.fromName}'s ${t.name}`;if($e(n,!1),ee?.reveal?.(),T(),D(n).sample&&!await Xr(n,"Sent",a))return F=`Kept ${nt(n)}: ${a} was not placed.`,T(),{ok:!1,reason:"cancelled"};const o=t.channels.map(c=>new Float32Array(c)),r=t.bars,s=Oe(n),l=t.name.slice(0,24);return r!==void 0&&Number.isInteger(r)&&r>=1?(await fd(n,o,t.sampleRate,r,0,{name:l,normalize:_t(o,t.sampleRate)}),F=r<=kn?`${a} on Pad ${n+1}: fitted to ${r===1?"a bar":`${r} bars`}, it loops every ${r===1?"bar":`${r} bars`}.`:`${a} on Pad ${n+1}: ${r} bars, so it plays from the pad, not the grid.`):(await xt(n,o,t.sampleRate,l,!1,null,null,_t(o,t.sampleRate)),F=`${a} on Pad ${n+1}.`),rt(s,a),T(),{ok:!0,target:e,targetName:nt(n)}}finally{ho=!1}}async function bd(t){const e=await Xg(t);if(!e){F=`LUCY take ${t.id} could not be read.`,T();return}await xt(E.selected,e,t.sampleRate,`LUCY take ${t.id}`,!0,null,null,_t(e,t.sampleRate))}async function yd(){const t=E.selected,e=D(t);!e.sample||!await lr({title:`Clear ${e.name}?`,body:"Its sample and settings go; its steps stay.",confirmLabel:"Clear"})||(Q(()=>{E.pads[t]=Ae(t)}),ot())}async function tr(t,e,n=E.selected){const a=D(n);let o=[];if(t&&e==="transients"&&a.sample){const r=await K.get(a.sample);if(r){const s=Math.floor(a.start*r.frames),l=Math.min(r.frames,Math.ceil(a.end*r.frames));o=Dg(await ei.analysis(a.sample,r.data,r.sampleRate,s,l),t)}}tt(r=>{r.slices=t,r.cuts=o},n)}function wd(t,e){const n=bc[t]??String(t+1);if(Vr(),e==="store")E.slots[t]=Pr(E),E.active=t,Yt=!1,ut=`Stored in ${n}`;else if(e==="clear")E.slots[t]=null,E.active===t&&(E.active=null),ut=`Cleared ${n}`,ot();else{const a=E.slots[t];if(!a){ut=`${n} is empty: Shift-click or long-press to store`,T();return}vd(a),E.active=t,Yt=!1,ut=`Recalled ${n}`}Pa(),vt(),ed(),T()}function vd(t){const e=structuredClone(t);E.pads=e.pads,E.lanes=e.lanes,E.swing=e.swing,E.hacks=e.hacks,he=null;for(const n of $n(E))wt(n).then(()=>vt())}async function xd(){if(await se(),N&&N.state!=="running"&&await N.resume().catch(()=>{}),ee&&Kt()){if(pe=!pe,!pe){const t=O();et=t.nextBar(t.beatAt(ne()+Ur))}Xt(!0),T(),pe&&Ut()?.out?.(En(Gt,ge));return}Kt()?De.stop({at:ne()}):(pe=!1,et=0,ee&&Ut()?.claim(En(Gt,ge)),De.play({at:ne()}))}let Cs=O().running;De.onChange(()=>{O().running&&!Cs&&ee&&(pe=!fb(Gt,ge)),Cs=O().running,O().running&&M.phase==="armed"&&pd(),!O().running&&M.phase==="rec"&&oi(!0),O().running||(pe=!1,et=0),vt(),Xt(!0),T()});Ut()?.member?.(En(Gt,ge),()=>O().running&&!pe);Ut()?.onAll(()=>{if(pe){if(pe=!1,Kt()){const t=O();et=t.nextBar(t.beatAt(ne()+Ur))}Xt(!0),T()}});function By(){const t=Wc(E),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=`nyx${ge>1?`-${ge}`:""}-pattern-${new Date().toISOString().slice(0,10)}.json`,n.hidden=!0,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Oy(t){let e;try{e=JSON.parse(await t.text()),Uc(e)}catch{F=`Couldn't read ${t.name}: not a NYX pattern.`,T();return}await kd(e,`Loaded ${t.name}.`)}async function kd(t,e){const n=Uc(t),a=ny(t);Q(()=>{a&&(E.slots=a.slots,E.active=a.active),vd(n)}),a&&(Yt=E.active!==null&&JSON.stringify(Pr(E))!==JSON.stringify(E.slots[E.active])),ut="";const o=[],r=new Set;for(const l of E.pads)l.sample&&!await K.get(l.sample)&&o.push(l.name);for(const l of E.slots)for(const c of l?.pads??[])c.sample&&!E.pads.some(d=>d.sample===c.sample)&&r.add(c.sample);let s=0;for(const l of r)await K.get(l)||s++;F=o.length?`Loaded. ${o.length===1?"One pad needs its":`${o.length} pads need their`} sample again (${o.join(", ")}): samples stay in the browser they were loaded in.`:s?`${e} ${s===1?"One sample":`${s} samples`} in the slots ${s===1?"isn't":"aren't"} in this browser: samples stay in the browser they were loaded in.`:e,vt(),T()}function qy(){W?.port.postMessage({type:"stop"}),Kt()&&(ee?(pe=!0,Ut()?.out?.(En(Gt,ge))):De.stop({at:ne()})),Xt(!0),Me?.clear({fadeMs:20}),T()}function Ry(t){E.master=Math.min(1,Math.max(0,t)),Pa(),gt&&N&&gt.gain.setTargetAtTime(E.master,N.currentTime,.01),Ln.value=String(E.master),ri.textContent=`${Math.round(E.master*100)}%`}const Z=(t,e={},...n)=>{const a=document.createElement(t);for(const[o,r]of Object.entries(e))a.setAttribute(o,r);return a.append(...n),a},Ra=document.getElementById("app");Ra.classList.add("nc","nc-page");Pf();const $d=Z("header",{class:"nc-page-hd"},Z("div",{},Z("h1",{class:"nc-page-title",...yg("page:title")},Z("span",{style:"color: var(--nc-ui-instrument-nyx)"},"NYX")," ",Z("span",{class:"nc-page-sep"},"/")," SAMPLER ",Z("span",{class:"nc-page-sep"},"/")," ",Z("span",{class:"nc-mono"},String(ge).padStart(2,"0"))),Z("p",{class:"nc-page-sub"},"A NetComposer element."))),Ln=Z("input",{type:"range",class:"nc-range",id:"nyx-master",min:"0",max:"1",step:"0.01",value:String(E.master),"data-nc-id":"nyx-master"});Ln.addEventListener("input",()=>Ry(Number(Ln.value)));const ri=Z("span",{class:"nc-readout","data-nc-readout":""});ri.textContent=`${Math.round(E.master*100)}%`;const Ns="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.aif,.aiff,.webm",ft=Z("input",{type:"file"});ft.hidden=!0;let Fs="pad";ft.addEventListener("change",()=>{const t=ft.files?.[0];ft.value="",t&&Yr(t)});function ii(t){Fs=t,ft.accept=Fs==="pad"?Ns:`${Ns},.json,application/json`,ft.click()}const nr=(t,e)=>{const n=Z("button",{type:"button",class:"nc-page-action","data-nyx-action":t.toLowerCase()},t);return I(n,B(`page:${t.toLowerCase()}`),n),n.addEventListener("click",e),n},Ad=Z("label",{class:"nc-label",for:"nyx-master"},"Master");I(Ad,B("page:master"),Ln);const zs=Rf({panel:Z("div",{},Z("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},Ad,Ln,ri),nr("Save",By),nr("Load",()=>ii("any")))});$d.append(Z("div",{class:"nc-page-actions"},zs.panel,nr("Panic",qy),zs.button,ft));const me=Z("div",{class:"nc-stack","data-nc-layout":"adjacent"});Ra.append($d,Z("main",{class:"nc-page-body"},me));Ra.addEventListener("dragover",t=>{t.dataTransfer?.types.includes("Files")&&t.preventDefault()});Ra.addEventListener("drop",t=>{const e=t.dataTransfer?.files?.[0];e&&(t.preventDefault(),Yr(e))});function Ps(t){return Math.abs(t)<.01?"C":`${t<0?"L":"R"}${Math.round(Math.abs(t)*100)}`}function Ed(){return Kt()?pe?"Sitting out":O().beatAt(ne())<et?"Joining on the next bar":"Playing":E.pads.some(e=>e.sample)?"Stopped":"Load a sample to start"}function Iy(t){if(t==="always")return"Always";if(t==="fill")return"Only in Fill";if(t==="!fill")return"Not in Fill";if(t==="pre")return"If the last one played";if(t==="!pre")return"If the last one didn't";const[e,n]=t.split(":");return`Pass ${e} of every ${n}`}const Sd=[{mode:"repeat16",label:"1/16",title:"Repeat the last 16th while held"},{mode:"repeat8",label:"1/8",title:"Repeat the last 8th while held"},{mode:"reverse",label:"Rev",title:"Play what just happened backwards while held"},{mode:"half",label:"Half",title:"Half speed while held"},{mode:"stop",label:"Stop",title:"Slow to a halt like a tape machine while held"}],Tn={fill:!1,perform:null};function $a(t){Tn.fill!==t&&(Tn.fill=t,W?.port.postMessage({type:"fill",on:t}),T())}function ar(t){Tn.perform!==t&&(Tn.perform=t,W?.port.postMessage({type:"perform",mode:t}),T())}function jy(t){const e=o=>{const s=(o.target instanceof Element?o.target:null)?.closest('[data-nc-id="perform"] [data-nc-choice]'),l=s instanceof HTMLElement?s.dataset.ncChoice:void 0;return Sd.some(c=>c.mode===l)?l:null},n=o=>{se(),o==="fill"?$a(!0):ar(o)},a=()=>{$a(!1),ar(null)};t.addEventListener("pointerdown",o=>{const r=e(o);if(!r)return;o.preventDefault(),n(r);const s=()=>{a(),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s)};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s)}),t.addEventListener("keydown",o=>{if((o.key===" "||o.key==="Enter")&&!o.repeat){const r=e(o);if(!r)return;o.preventDefault(),n(r)}}),t.addEventListener("keyup",o=>{(o.key===" "||o.key==="Enter")&&e(o)&&a()}),window.addEventListener("blur",a)}function _y(){return{id:"transport",title:"Transport",status:ut,controls:[{type:"button",id:"play",label:Mn()?"Stop":"Play",on:Mn(),onPress:()=>void xd()},{type:"label",id:"perform-label",text:"Hold to play"},{type:"choice",id:"perform",label:"Hold",value:Tn.perform??"",options:Sd.map(t=>({value:t.mode,label:t.label})),onChange:()=>{}},{type:"slider",id:"tempo",label:"Tempo",min:40,max:240,step:1,value:Math.round(O().bpm),valueText:`${Math.round(O().bpm)} BPM`,onChange:t=>{De.setTempo({bpm:t}),T()}},{type:"group",id:"transport-more",title:"Swing",collapse:"phone",summary:Te(E.swing),controls:[{type:"slider",id:"swing",label:"Swing",min:.5,max:.75,step:.01,value:E.swing,valueText:Te(E.swing),onChange:t=>Q(()=>{E.swing=t})}]},{type:"readout",id:"status",label:"Status",value:Ed()},{type:"slotRow",id:"slots",morph:0,morphText:"",slots:bc.map((t,e)=>({label:t,filled:E.slots[e]!=null,active:E.active===e,edited:E.active===e&&Yt})),onMorph:()=>{},onSlot:(t,e)=>wd(t,e)}]}}function Md(){if(!Mn())return-1;const t=O().beatAt(ne());return t<0||t<et?-1:Math.floor(t/Jm)%te}function Hy(){const t=td(),e=Md();return{id:"pattern",title:"Pattern",lead:!0,summary:`${E.lanes.filter(n=>n.steps.some(a=>a.on)).length} lanes · ${t.name}`,sections:[{id:"grid",controls:[{type:"stepGrid",id:"grid",playhead:e,selectedRow:`pad-${E.selected}`,rows:E.lanes.map((n,a)=>({id:`pad-${a}`,label:D(a).name,length:n.length,lane:a%4+1,mute:n.mute,solo:n.solo,steps:n.steps.map(o=>({on:o.on,accent:o.accent,velocity:o.velocity,dim:!D(a).sample,...Em(o,n.length)}))})),onToggle:(n,a,o)=>xa(n,a,r=>{o?(r.accent=r.on?!r.accent:!0,r.on=!0):(r.on=!r.on,r.on||(r.accent=!1))}),onSet:(n,a,o,r)=>xa(n,a,s=>{o==="on"?(s.on=r,r||(s.accent=!1)):(s.accent=r,r&&(s.on=!0))}),onSelectRow:n=>$e(n),onLongPress:(n,a)=>{he={lane:n,step:a},$e(n,!1)},onMute:n=>Q(()=>{Fe(n).mute=!Fe(n).mute}),onSolo:n=>Q(()=>{Fe(n).solo=!Fe(n).solo}),onLength:(n,a)=>Q(()=>{Fe(n).length=Math.max(1,Math.min(te,a))}),transport:{playing:Mn(),onToggle:()=>void xd()},onFill:n=>$a(n),onClear:()=>by(),clearLabel:yn?"Undo":"Clear"},{type:"note",id:"grid-help",text:"Tap a name to hear it. Long-press a step for its locks."}]},{id:"pads",title:"Pad",controls:[{type:"padGrid",id:"pads",label:"Pads",columns:4,selected:E.selected,pads:E.pads.map((n,a)=>({label:n.name,empty:!n.sample,peaks:uy(n),lane:a%4+1,playing:Fn.has(a),badge:n.choke?Ea[n.choke-1]:void 0,badgeLabel:n.choke?`choke group ${Ea[n.choke-1]}`:void 0,hint:xe?.route()&&xn(n)?"tuned · CALLIOPE":void 0})),onDown:n=>Gy(n),onPress:n=>Yy(n),onFile:(n,a)=>{$e(n,!1),Yr(a,n)},onMove:(n,a,o)=>Ky(n,a,o),menu:n=>Vy(n),onMenu:(n,a)=>void Qy(n,a),onRename:(n,a)=>Xy(n,a)},{type:"button",id:"library",label:"Library",on:!1,onPress:()=>at()}]}]}}function Wy(t){if(!he||he.lane!==E.selected)return[];const{lane:e,step:n}=he,a=Fe(e).steps[n];if(!a)return[];const o=r=>xa(e,n,r);return[{type:"label",id:"lock-label",text:`Step ${n+1}`},{type:"slider",id:"lock-velocity",label:"Velocity",min:0,max:1,step:.01,value:a.velocity,valueText:Te(a.velocity),onChange:r=>o(s=>{s.velocity=r})},{type:"slider",id:"lock-chance",label:"Chance",min:0,max:1,step:.05,value:a.chance,valueText:Te(a.chance),onChange:r=>o(s=>{s.chance=r})},...t.slices?[{type:"select",id:"lock-slice",label:"Slice",value:a.slice===null?"auto":String(a.slice),options:[{value:"auto",label:`In order (${n%t.slices+1})`},...Array.from({length:t.slices},(r,s)=>({value:String(s),label:`Slice ${s+1}`}))],onChange:r=>o(s=>{s.slice=r==="auto"?null:Number(r)})}]:[],{type:"slider",id:"lock-pitch",label:"Pitch",min:-12,max:12,step:1,value:a.pitch,valueText:An(a.pitch," st"),onChange:r=>o(s=>{s.pitch=r})},{type:"select",id:"lock-cond",label:"Plays",value:a.cond,options:fa.map(r=>({value:r,label:Iy(r)})),onChange:r=>o(s=>{fa.includes(r)&&(s.cond=r)})},{type:"choice",id:"lock-reverse",label:"Direction",value:a.reverse?"rev":"pad",options:[{value:"pad",label:"As the pad"},{value:"rev",label:"Reversed"}],onChange:r=>o(s=>{s.reverse=r==="rev"})},{type:"button",id:"lock-done",label:"Done",on:!1,onPress:()=>{he=null,T()}}]}function Uy(){const t=Ze();if(!t)return[];const e=t.sources();return[{type:"label",id:"grab-label",text:t.record?"Grab or take":"Grab the bar"},{type:"select",id:"grab-from",label:"From",value:G.from,options:e.map(n=>({value:n.id,label:n.name})),onChange:n=>{G.from=n,t.listen(n),T()}},{type:"choice",id:"grab-bars",label:"Bars",value:String(G.bars),options:[1,2,4].map(n=>({value:String(n),label:String(n)})),onChange:n=>{G.bars=n==="4"?4:n==="2"?2:1,T()}},{type:"button",id:"grab",label:G.busy?"Grabbing…":G.bars===1?"Grab last bar":`Grab last ${G.bars} bars`,on:G.busy,onPress:()=>void ti()},...t.record?[{type:"button",id:"take",label:hd(),on:M.phase!=="idle",onPress:()=>ai()}]:[]]}let Aa=-1;function Gy(t){if(!D(t).sample)return;Aa=t,$e(t);const e=()=>{Aa=-1};window.addEventListener("pointerup",()=>setTimeout(e),{once:!0})}function Yy(t){if(Aa===t){Aa=-1;return}if(!D(t).sample){$e(t,!1),ii("pad");return}$e(t)}function Ky(t,e,n){Q(()=>{const a=structuredClone(D(t)),o=structuredClone(D(e));E.pads[e]=a,n||(E.pads[t]=o.sample?o:Ae(t))}),$e(e,!1)}const Ea=["A","B","C","D"];function Xy(t,e){tt(n=>{n.name=e.slice(0,24)},t)}function Vy(t){const e=!!D(t).sample,n=[{id:"load",label:e?"Replace…":"Load a file…"}],a=Vo().slice(-4).reverse();for(const s of a)n.push({id:`take-${s.id}`,label:`LUCY take ${s.id}`});const o=a[0];if(o&&n.push({id:`chop-take-${o.id}`,label:`Chop LUCY take ${o.id}…`}),Ze()&&n.push({id:"grab",label:G.bars===1?"Grab the last bar":`Grab the last ${G.bars} bars`}),Ze()?.record&&n.push({id:"record",label:M.phase==="rec"?"Stop the take":`Take from ${ka(G.from)}`}),n.push({id:"library",label:"Library…"}),D(t).provenance){const s=Zr(t);if(s.length)for(const l of s)n.push({id:`alt-${l.id}`,label:`Alternative: ${Na(l.title)}`});else ye.ensure().then(()=>T()),n.push({id:"alternatives",label:"Alternatives…"})}return e&&n.push({id:"chop",label:"Chop to pads…"}),e&&n.push({id:"rename",label:"Rename…"},{id:"clear",label:"Clear"}),n}async function Qy(t,e){if($e(t,!1),e==="load")ii("pad");else if(e==="grab")await ti();else if(e==="record")ai();else if(e==="clear")await yd();else if(e==="library")at(!0);else if(e==="chop")await zn();else if(e.startsWith("chop-take-")){const n=Vo().find(a=>`chop-take-${a.id}`===e);n&&await Ly(n)}else if(e==="alternatives"){const n=D(t).provenance;at(!0,n?n.query||n.role:void 0)}else if(e.startsWith("alt-")){const n=Zr(t).find(a=>`alt-${a.id}`===e);n&&await Oa(n,D(t).provenance?.query??"",t)}else if(e.startsWith("take-")){const n=Vo().find(a=>`take-${a.id}`===e);n&&await bd(n)}}const si=new xg;document.addEventListener("keydown",t=>{!fe||t.repeat||t.shiftKey||t.altKey||!(t.metaKey||t.ctrlKey)||t.key.toLowerCase()!=="z"||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]")||(t.preventDefault(),Qr())});const Ld=t=>W?.port.postMessage({type:"release",pad:t});document.addEventListener("keydown",t=>{if(t.repeat||t.metaKey||t.ctrlKey||t.altKey||(t.target instanceof HTMLElement?t.target:null)?.closest("input, select, textarea, [contenteditable]"))return;const n=Bc(t);n<0||!D(n).sample||(t.preventDefault(),!(si.press(t)<0)&&Ye(n,null,!0))});document.addEventListener("keyup",t=>{const e=si.release(t);e>=0&&Ld(e)});window.addEventListener("blur",()=>{for(const t of si.releaseAll())Ld(t)});function li(t){const e=B("kit:pad-key");t.querySelectorAll('[data-nc-id="pads"] .nc-padgrid-pad').forEach((n,a)=>{const o=vg[a];if(!o)return;let r=n.querySelector(":scope > .nyx-pad-key");r||(r=Z("span",{class:"nyx-pad-key","aria-hidden":"true"}),n.append(r)),r.textContent!==o&&(r.textContent=o),I(r,e)})}function Ds(t,e){const n=Br(t,e,O().bpm),a=Number(n.toFixed(2));return{speed:n,far:t.keepPitch&&(a<Wt[0]||a>Wt[1])}}function Td(t){const e=t.querySelector('[data-nc-id="fit-speed"]');if(!e)return;const n=td(),a=n.sample?K.info(n.sample):void 0,o=Number((a?Br(n,a,O().bpm):1).toFixed(2)),r=n.keepPitch&&(o<Wt[0]||o>Wt[1]);e.toggleAttribute("data-nyx-far",r)}const Bs=["C","C♯","D","E♭","E","F","F♯","G","A♭","A","B♭","B"];function Jy(t,e){const n=xe?.route();if(!n)return[];const a=xn(e),o=s=>tt(s),r=e.sample?e.fit>0?`Pad ${t+1} is fitted to bars: it keeps its pitch.`:a?`Pad ${t+1}'s hits play at the root of CALLIOPE's chord, from ${Bs[e.note]}. The pattern's own hits still play.`:`Pad ${t+1} keeps its own pitch. Follow tunes its hits to CALLIOPE's root.`:"Load a sound on this pad to tune it to CALLIOPE.";return[{type:"label",id:"notes-label",text:"Notes in"},{type:"note",id:"notes-by",text:`Played by ${n.name} · ${gb(n)}`},...e.sample&&e.fit===0?[{type:"toggle",id:"pad-follow",label:"Follow CALLIOPE",pressed:a,onPress:()=>o(s=>{s.follow=!xn(s)})},{type:"select",id:"pad-note",label:"Sample is",value:String(e.note),options:Bs.map((s,l)=>({value:String(l),label:s})),onChange:s=>o(l=>{l.note=Number(s)})}]:[],{type:"note",id:"notes-how",text:r},{type:"button",id:"notes-open",label:`Open ${n.name.split(" ")[0]}`,on:!1,onPress:()=>void xe?.open()},{type:"button",id:"notes-mine",label:"Play it myself",on:!1,onPress:()=>{xe?.takeBack()&&T()}}]}function Zy(){const t=E.selected,e=D(t),n=e.sample?K.info(e.sample):void 0,a=Dr(e).slice(1,-1),o=e.end-e.start,r=n?n.frames/n.sampleRate:0,s=!!e.sample,l=s&&!n,c=p=>tt(p),d=bt.get(t),u=s?[...e.provenance?[{type:"readout",id:"credit",label:"Credit",value:`${e.provenance.creator} · ${Sr(e.provenance.license,e.provenance.licenseStatus)}`}]:[],{type:"readout",id:"sample",label:"Length",value:l?e.provenance?.origin==="local"?"Local sound, not here: open its local Library":"Not in this browser: load it again":`${dt(r*o)} of ${dt(r)} · ${n?.channels===2?"stereo":"mono"}`},...zc(d,e)&&n?[{type:"note",id:"auto-fit-note",text:sg(d.fit)},...ms({...d.fit,...Ds(e,n)})?[{type:"note",id:"auto-fit-far",text:ms({...d.fit,...Ds(e,n)})}]:[],{type:"button",id:"auto-fit-undo",label:"Undo fit",on:!1,onPress:()=>wy(t)}]:[],{type:"choice",id:"mode",label:"Mode",value:e.mode,options:[{value:"oneshot",label:"One-shot"},{value:"gate",label:"Gate"},{value:"loop",label:"Loop"}],onChange:p=>c(h=>{h.mode=p})},{type:"choice",id:"dir",label:"Direction",value:e.dir,options:[{value:"fwd",label:"Forward"},{value:"rev",label:"Reverse"},{value:"pingpong",label:"Ping-pong"}],onChange:p=>c(h=>{(p==="fwd"||p==="rev"||p==="pingpong")&&(h.dir=p)})},{type:"slider",id:"start",label:"Start",min:0,max:1,step:.001,value:e.start,valueText:dt(e.start*r),onChange:p=>c(h=>{h.start=Math.min(p,h.end-.002)}),onCommit:()=>void Ye(t)},{type:"slider",id:"end",label:"End",min:0,max:1,step:.001,value:e.end,valueText:dt(e.end*r),onChange:p=>c(h=>{h.end=Math.max(p,h.start+.002)}),onCommit:()=>void Ye(t)},{type:"select",id:"slices",label:"Slices",value:String(e.slices),options:yc.map(p=>({value:String(p),label:p?`${p}`:"Off"})),onChange:p=>void tr(Number(p),e.cuts.length?"transients":"even")},...e.slices?[{type:"choice",id:"chop",label:"Chop",value:e.cuts.length?"transients":"even",options:[{value:"even",label:"Even"},{value:"transients",label:"At hits"}],onChange:p=>void tr(e.slices,p==="transients"?"transients":"even")}]:[],{type:"button",id:"chop-to-pads",label:"Chop to pads…",on:yt.isOpen,onPress:()=>void zn()},{type:"group",id:"tune-shape",title:"Tune & shape",summary:pg(e),controls:[{type:"label",id:"pitch-label",text:"Pitch"},{type:"slider",id:"tune",label:"Tune",min:-24,max:24,step:1,value:e.tune,valueText:An(e.tune," st"),onChange:p=>c(h=>{h.tune=p}),onCommit:()=>void Ye(t)},{type:"slider",id:"fine",label:"Fine",min:-100,max:100,step:1,value:e.fine,valueText:An(e.fine," ct"),onChange:p=>c(h=>{h.fine=p})},{type:"select",id:"fit",label:"Fit to bars",value:String(e.fit),options:[{value:"0",label:"Off"},...[1,2,4,8].map(p=>({value:String(p),label:`${p} bar${p===1?"":"s"}`}))],onChange:p=>{bt.delete(t),c(h=>{h.fit=Number(p)})}},...e.fit&&n?[{type:"choice",id:"keep-pitch",label:"Keep pitch",value:e.keepPitch?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>c(h=>{h.keepPitch=p==="on"})},{type:"readout",id:"fit-speed",label:"Speed",value:`${ug(Br(e,n,O().bpm))}${e.keepPitch&&Be.pending(t)&&!Be.failed?" · stretching…":""}`}]:[],{type:"choice",id:"auto-fit",label:"Auto-fit loops",value:na?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>{na=p==="on",cg(na),T()}},{type:"label",id:"shape-label",text:"Shape"},{type:"slider",id:"attack",label:"Attack",min:0,max:.1,step:.001,taper:"time",value:e.attack,valueText:dt(e.attack),onChange:p=>c(h=>{h.attack=p})},{type:"slider",id:"decay",label:"Decay",min:.01,max:4,step:.01,taper:"time",value:e.decay,valueText:Jn(e.decay),onChange:p=>c(h=>{h.decay=p}),onCommit:()=>void Ye(t)},{type:"slider",id:"cutoff",label:"Filter",min:-1,max:1,step:.01,value:e.cutoff,valueText:Qn(e.cutoff),onChange:p=>c(h=>{h.cutoff=Math.abs(p)<.02?0:p})},{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Te(e.resonance),onChange:p=>c(h=>{h.resonance=p})}]},{type:"label",id:"out-label",text:"Output"},{type:"slider",id:"level",label:"Level",min:0,max:1,step:.01,value:e.level,valueText:Te(e.level),onChange:p=>c(h=>{h.level=p})},...e.sample?[{type:"label",id:"normalize-label",text:"Normalize"},{type:"choice",id:"normalize",label:"Normalize",value:us(e)?"on":"off",options:[{value:"on",label:"On"},{value:"off",label:"Off"}],onChange:p=>void yy(t,p==="on")},{type:"readout",id:"normalize-gain",label:"Gain",value:us(e)?e.provenance?"Library level":Am(e.normalize?.gainDb??0):"As recorded"}]:[],{type:"group",id:"pad-more",title:"Pan & choke",collapse:"phone",summary:`Pan ${Ps(e.pan)} · Choke ${e.choke?Ea[e.choke-1]:"none"}`,controls:[{type:"slider",id:"pan",label:"Pan",min:-1,max:1,step:.01,value:e.pan,valueText:Ps(e.pan),onChange:p=>c(h=>{h.pan=Math.abs(p)<.02?0:p})},{type:"select",id:"choke",label:"Choke",value:String(e.choke),options:[{value:"0",label:"None"},...Ea.map((p,h)=>({value:String(h+1),label:`Group ${p}`}))],onChange:p=>c(h=>{h.choke=Number(p)})},{type:"button",id:"clear-pad",label:"Clear pad",on:!1,onPress:()=>void yd()}]}]:[];return{id:"params",title:"Params",summary:e.name,controls:[...s?[{type:"canvas",id:"wave",label:"Wave",paint:"waveform",peaks:e.sample?ya.get(e.sample)??[]:[],region:[e.start,e.end],markers:a.map(p=>e.start+p*o),position:Fn.get(t)??-1}]:[],...F?[{type:"note",id:"notice",text:F}]:[],...Jy(t,e),...Wy(e),...u,...Uy()]}}function or(t,e){Q(()=>e(E.hacks[t]))}function e0(t,e){const n=E.hacks[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,o=r=>or(t,s=>{s.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>o(Number(r))}:{type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,taper:Sp(e),value:n,valueText:Us(e,n,O().bpm),onChange:o}}const Un=(t,e)=>(qe(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>e0(t,n)),Os=new Map;function fo(t){let e=Os.get(t);if(e)return e;let n=0,a=null;const o={in:0,out:0},r=()=>{const s=zu(Me,t);if(s!==a){for(let l=0;l<n;l++)a?.close();a=s;for(let l=0;l<n;l++)a?.open()}};return e={open:()=>(r(),n++,a?.open(),!0),close:()=>{n!==0&&(r(),n--,a?.close())},read:()=>(r(),a?.read()??o)},Os.set(t,e),e}function t0(){const t=E.hacks,e=t.filter,n=e.mode==="lp"&&e.cutoff>=.999,a=r=>Q(()=>r(E.hacks.filter)),o=[Dc(e)?"":"Filter",t.drive.on?"Drive":"",t.compressor.on?"Comp":""].filter(Boolean);return{id:"hacks",title:"Hacks",summary:o.length?o.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.on,meter:fo(`${Ir(e).type}-1`),meterHelp:B("hack-meter"),onToggle:r=>a(s=>{s.on=r}),controls:[{type:"select",id:"filter-mode",label:"Mode",value:e.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:r=>a(s=>{(r==="lp"||r==="hp"||r==="bp")&&(s.mode=r)})},{type:"canvas",id:"filter-curve",label:"Curve",paint:"filter",mode:e.mode,cutoff:e.cutoff,resonance:e.mode==="lp"?0:e.resonance,...hg(e)},{type:"slider",id:"filter-cutoff",label:"Cutoff",min:0,max:1,step:.01,value:e.cutoff,valueText:n?"open":Ko(Pc(e.cutoff)),onChange:r=>a(s=>{s.cutoff=r})},...e.mode==="lp"?[]:[{type:"slider",id:"filter-resonance",label:"Resonance",min:0,max:1,step:.01,value:e.resonance,valueText:Te(e.resonance),onChange:r=>a(s=>{s.resonance=r})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",collapse:"phone",summary:`Drive ${t.drive.on?"on":"off"} · Compressor ${t.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:t.drive.on,meter:fo("drive-1"),meterHelp:B("hack-meter"),onToggle:r=>or("drive",s=>{s.on=r}),controls:Un("drive",!1),more:Un("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:t.compressor.on,meter:fo("compressor-1"),meterHelp:B("hack-meter"),onToggle:r=>or("compressor",s=>{s.on=r}),controls:Un("compressor",!1),more:Un("compressor",!0)}]}]}}const ci=[_y,Hy,Zy,t0].map(t=>({def:t,handle:Gf(t())}));Yf(me,ci.map(t=>t.handle),"adjacent");jy(me);li(me);jr(me);function Cd(){const t=me.querySelector('[data-nc-section="pads"] [data-nc-id="library"]');ye.attach(t),yt.attach(t)}function T(){$y?.update(),Ay?.changed();for(const t of ci)t.handle.update(t.def());Cd(),ye.isOpen&&ye.refresh(),li(me),Td(me),jr(me)}let qs="";function Nd(){Xt();const t=Fn.get(E.selected)??-1,e=JSON.stringify([Md(),Ed(),Math.round(t*400)]);if(e!==qs){qs=e;for(const n of ci.slice(0,3))n.handle.update(n.def());Cd(),li(me),Td(me),jr(me)}requestAnimationFrame(Nd)}requestAnimationFrame(Nd);xe?.onChange(t=>{t&&T()});xe?.route()&&T();globalThis.__NC_NOTES__={read:()=>({routes:xe?[...xe.follower.routes]:[],points:xe?xe.follower.points():[],follows:E.pads.map(t=>xn(t))}),log:{start(){wa.length=0,va=!0,W?.port.postMessage({type:"hitlog",on:!0})},take:()=>wa.splice(0),stop(){va=!1,W?.port.postMessage({type:"hitlog",on:!1})}}};py.start();Promise.all([...$n(E)].map(t=>K.get(t))).then(t=>{for(const e of t)e&&Vc(e);T()});if(ee)se(),ee.providePreset?.({format:ey,version:ty,get:()=>(iy(E),Wc(E)),set:async t=>{await kd(t,"Loaded the Scene's pattern.")}}),Ze()?.listen(G.from),ee.onAudio?.({label:"Pad",targets:md,receive:gd});else{const t=()=>{se()};document.addEventListener("pointerdown",t,{once:!0,capture:!0}),document.addEventListener("keydown",t,{once:!0,capture:!0})}window.__nyx={state:E,clock:De,store:K,stretcher:Be,stretchTimes:Jc,selectPad:t=>$e(t,!1),edit:t=>Q(()=>t(E)),runStretch:Zc,get stretchLoaded(){return ta!==null},get ctx(){return N},get masterOut(){return gt},chop:{open:zn,get panel(){return yt},get times(){return ei.times}},get fx(){return Me},get positions(){return Fn},get voices(){return Qc},ensureAudio:se,play:Ye,async setSample(t,e,n,a="test"){await se()&&await xt(t,e,n,a,!0,null,null,_t(e,n))},grab:G,grabBars:ti,get padUndo(){const t=fe?.before[0];return fe&&t?{index:t.index,sample:t.pad.sample,pads:fe.before.map(e=>e.index)}:null},undoPad:Qr,receiveAudio:gd,padTargets:md,take:M,pressTake:ai,get notice(){return F},setPerform:ar,setFill:$a,actSlot:wd,get edited(){return Yt},library:{get panel(){return ye},open:t=>at(!0,t),close:()=>at(!1),catalog:nd,local:Ba,load:Oa,buildKit:()=>ye.buildKit(),alternatives:t=>Zr(t).map(e=>e.id),preview:cd,get previewing(){return qt?.id??null}},toggleStep(t,e){xa(t,e,n=>{n.on=!n.on})}};
